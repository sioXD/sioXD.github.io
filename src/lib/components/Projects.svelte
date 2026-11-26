<script lang="ts">
	import type { ProjectItem } from '#lib/data/profile.js';

	interface Props {
		projects: ProjectItem[];
	}

	let { projects }: Props = $props();

	let selectedLanguage = $state('ALL');
	let expandedId = $state<string | null>(null);

	let languages = $derived([
		'ALL',
		...Array.from(new Set(projects.map((project) => project.language)))
	]);

	let visibleProjects = $derived(
		selectedLanguage === 'ALL'
			? projects
			: projects.filter((project) => project.language === selectedLanguage)
	);

	function toggleExpand(id: string) {
		expandedId = expandedId === id ? null : id;
	}
</script>

<section id="projects" class="projects" aria-labelledby="projects-heading">
	<div class="projects__header">
		<div class="projects__header-inner">
			<div>
				<p class="projects__kicker">01 // ARCHIVE</p>
				<h2 id="projects-heading" class="projects__heading">Selected Works</h2>
			</div>

			<div class="filter-rail" role="tablist" aria-label="Projekte nach Sprache filtern">
				{#each languages as lang (lang)}
					<button
						type="button"
						role="tab"
						aria-selected={selectedLanguage === lang}
						class={['filter-btn', selectedLanguage === lang && 'is-active']}
						onclick={() => {
							selectedLanguage = lang;
							expandedId = null;
						}}
					>
						{lang.toUpperCase()}
						{#if lang === 'ALL'}
							[{String(projects.length).padStart(2, '0')}]
						{/if}
					</button>
				{/each}
			</div>
		</div>
	</div>

	<div class="projects__columns" aria-hidden="true">
		<div class="projects__columns-inner">
			<span>NO.</span>
			<span>PROJECT / DESCRIPTION</span>
			<span>DISCIPLINE</span>
			<span>STACK</span>
			<span class="align-right">SOURCE</span>
		</div>
	</div>

	<div class="ledger">
		{#each visibleProjects as project (project.id)}
			{@const isOpen = expandedId === project.id}
			<article class={['ledger-row', isOpen && 'is-open']}>
				<div class="ledger-row__main">
					<button
						type="button"
						class="ledger-row__trigger"
						aria-expanded={isOpen}
						onclick={() => toggleExpand(project.id)}
					>
						<span class="ledger-row__index">{project.index}</span>

						<span class="ledger-row__identity">
							<span class="ledger-row__title">{project.title}</span>
							<span class="ledger-row__desc">{project.description}</span>
						</span>

						<span class="ledger-row__meta">
							<span class="ledger-row__cat">{project.category}</span>
							<span class="ledger-row__year">{project.year}</span>
						</span>

						<span class="ledger-row__lang">{project.language}</span>
					</button>

					<div class="ledger-row__actions">
						<button
							type="button"
							class="action-toggle"
							aria-expanded={isOpen}
							aria-label={isOpen ? 'Details schließen' : 'Details öffnen'}
							onclick={() => toggleExpand(project.id)}
						>
							{isOpen ? '−' : '+'}
						</button>

						<a class="repo-link" href={project.repoUrl} target="_blank" rel="external noreferrer">
							REPO ↗
						</a>
					</div>
				</div>

				{#if isOpen}
					<div class="ledger-row__drawer">
						<div class="ledger-row__drawer-inner">
							<div class="drawer-block">
								<p class="drawer-label">ARCHITECTURE & FOCUS</p>
								<p class="drawer-text">{project.architectureNote}</p>
							</div>

							<div class="drawer-block">
								<p class="drawer-label">TECHNOLOGIES</p>
								<ul class="stack-list">
									{#each project.techStack as tech (tech)}
										<li>{tech}</li>
									{/each}
								</ul>
							</div>

							<div class="drawer-block drawer-block--links">
								<p class="drawer-label">DIRECT ACCESS</p>
								<div class="drawer-links">
									<a
										class="drawer-link"
										href={project.repoUrl}
										target="_blank"
										rel="external noreferrer"
									>
										OPEN GITHUB REPOSITORY ↗
									</a>
									{#if project.liveUrl}
										<a
											class="drawer-link"
											href={project.liveUrl}
											target="_blank"
											rel="external noreferrer"
										>
											OPEN LIVE BUILD ↗
										</a>
									{/if}
								</div>
							</div>
						</div>
					</div>
				{/if}
			</article>
		{/each}
	</div>
</section>

<style lang="scss">
	@use 'variables' as *;
	@use 'mixins' as *;

	.projects {
		padding-top: 4rem;

		@include respond-to(md) {
			padding-top: 5.5rem;
		}
	}

	.projects__header {
		border-bottom: $hairline solid var(--line);
		padding-bottom: 2rem;
	}

	.projects__header-inner {
		@include container;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		justify-content: space-between;

		@include respond-to(md) {
			flex-direction: row;
			align-items: flex-end;
		}
	}

	.projects__kicker {
		@include mono-label;
		color: var(--fg-muted);
		margin-bottom: 0.5rem;
	}

	.projects__heading {
		font-family: $font-serif;
		font-style: italic;
		font-weight: 400;
		font-size: clamp(2.4rem, 5vw, 4rem);
		line-height: 0.98;
		letter-spacing: -0.02em;
	}

	.filter-rail {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
	}

	.filter-btn {
		@include mono-label;
		@include focus-ring;
		padding: 0.42rem 0.72rem;
		border: $hairline solid var(--line);
		color: var(--fg-muted);
		transition:
			background-color $transition-fast,
			color $transition-fast,
			border-color $transition-fast;

		&:hover {
			border-color: var(--fg);
			color: var(--fg);
		}
	}

	.filter-btn.is-active {
		background: var(--invert-bg);
		color: var(--invert-fg);
		border-color: var(--invert-bg);
	}

	.projects__columns {
		display: none;
		border-bottom: $hairline solid var(--line);

		@include respond-to(md) {
			display: block;
		}
	}

	.projects__columns-inner {
		@include container;
		@include mono-label;
		color: var(--fg-subtle);
		display: grid;
		grid-template-columns: 3.75rem 1fr 11rem 7.5rem 7.5rem;
		gap: 1.25rem;
		padding-block: 0.75rem;
	}

	.align-right {
		text-align: right;
	}

	.ledger-row {
		border-bottom: $hairline solid var(--line);
		transition:
			background-color $transition-fast,
			color $transition-fast;

		&:hover {
			background: var(--invert-bg);
			color: var(--invert-fg);

			.ledger-row__title {
				font-family: $font-serif;
				font-style: italic;
				font-weight: 400;
				transform: translateX(6px);
			}

			.ledger-row__desc,
			.ledger-row__index,
			.ledger-row__year,
			.ledger-row__cat {
				color: var(--invert-fg);
				opacity: 0.82;
			}

			.ledger-row__lang,
			.action-toggle,
			.repo-link {
				border-color: var(--invert-fg);
				color: var(--invert-fg);
			}

			.ledger-row__drawer {
				border-top-color: rgba(128, 128, 128, 0.35);
			}

			.drawer-label,
			.drawer-text {
				color: var(--invert-fg);
			}

			.stack-list li,
			.drawer-link {
				border-color: var(--invert-fg);
				color: var(--invert-fg);
			}
		}
	}

	.ledger-row.is-open {
		background: var(--bg-elevated);
	}

	.ledger-row__main {
		@include container;
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		gap: 1rem;
		padding-block: 1.4rem;

		@include respond-to(md) {
			gap: 1.25rem;
			padding-block: 1.65rem;
		}
	}

	.ledger-row__trigger {
		@include focus-ring;
		text-align: left;
		display: grid;
		grid-template-columns: 2.5rem 1fr;
		gap: 0.65rem 1rem;
		align-items: baseline;

		@include respond-to(md) {
			grid-template-columns: 3.75rem 1fr 11rem 7.5rem;
			gap: 1.25rem;
			align-items: center;
		}
	}

	.ledger-row__index {
		@include mono-label;
		color: var(--fg-muted);
		font-size: 0.8rem;
	}

	.ledger-row__identity {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.ledger-row__title {
		font-size: clamp(1.2rem, 2.2vw, 1.65rem);
		font-weight: 600;
		letter-spacing: -0.02em;
		line-height: 1.15;
		word-break: break-word;
		transition: transform $transition-base;
	}

	.ledger-row__desc {
		font-size: 0.9rem;
		color: var(--fg-muted);
		max-width: 58ch;
	}

	.ledger-row__meta {
		grid-column: 2;
		display: flex;
		align-items: center;
		gap: 0.75rem;

		@include respond-to(md) {
			grid-column: auto;
			flex-direction: column;
			align-items: flex-start;
			gap: 0.2rem;
		}
	}

	.ledger-row__cat {
		@include mono-label;
		color: var(--fg);
	}

	.ledger-row__year {
		@include mono-label;
		color: var(--fg-subtle);
	}

	.ledger-row__lang {
		@include mono-label;
		grid-column: 2;
		justify-self: start;
		padding: 0.24rem 0.55rem;
		border: $hairline solid var(--line);

		@include respond-to(md) {
			grid-column: auto;
		}
	}

	.ledger-row__actions {
		display: flex;
		align-items: center;
		gap: 0.45rem;
		justify-self: end;
	}

	.action-toggle {
		@include mono-label;
		@include focus-ring;
		width: 2.15rem;
		height: 2.15rem;
		display: inline-grid;
		place-items: center;
		border: $hairline solid var(--line);
		font-size: 0.95rem;
	}

	.repo-link {
		@include mono-label;
		@include focus-ring;
		padding: 0.52rem 0.78rem;
		border: $hairline solid var(--line);
		white-space: nowrap;
	}

	.ledger-row__drawer {
		border-top: $hairline dashed var(--line);
	}

	.ledger-row__drawer-inner {
		@include container;
		display: grid;
		gap: 1.5rem;
		padding-block: 1.5rem 1.85rem;

		@include respond-to(md) {
			grid-template-columns: 1.35fr 1fr auto;
			padding-left: calc(2.5rem + 5rem);
			gap: 2.25rem;
		}
	}

	.drawer-label {
		@include mono-label;
		color: var(--fg-subtle);
		margin-bottom: 0.55rem;
	}

	.drawer-text {
		font-size: 0.92rem;
		color: var(--fg-muted);
		max-width: 52ch;
	}

	.stack-list {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;

		li {
			@include mono-label;
			padding: 0.25rem 0.55rem;
			border: $hairline solid var(--line);
		}
	}

	.drawer-links {
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
		align-items: flex-start;
	}

	.drawer-link {
		@include mono-label;
		@include focus-ring;
		padding: 0.5rem 0.85rem;
		border: $hairline solid var(--line-strong);
		white-space: nowrap;
	}
</style>
