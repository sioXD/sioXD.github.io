<script lang="ts">
	import type { ProfileData } from '#lib/data/profile.js';

	interface Props {
		profile: ProfileData;
	}

	let { profile }: Props = $props();
	let copied = $state(false);

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(profile.email);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch {
			copied = false;
		}
	}
</script>

<footer id="contact" class="colophon">
	<div class="colophon__inner">
		<div class="colophon__cell">
			<p class="colophon__label">02 // CONTACT</p>
			<a class="colophon__email" href="mailto:{profile.email}">{profile.email}</a>
			<div class="colophon__actions">
				<button type="button" class="colophon__btn" onclick={copyEmail}>
					{copied ? '[COPIED]' : '[COPY EMAIL]'}
				</button>
			</div>
		</div>

		<div class="colophon__cell">
			<p class="colophon__label">03 // NETWORK</p>
			<div class="colophon__links">
				<a href={profile.githubUrl} target="_blank" rel="external noreferrer">
					GITHUB / {profile.githubHandle.toUpperCase()} ↗
				</a>
				<a href={profile.linkedinUrl} target="_blank" rel="external noreferrer">LINKEDIN ↗</a>
			</div>
		</div>

		<div class="colophon__cell">
			<p class="colophon__label">04 // STATUS</p>
			<p class="colophon__text">{profile.status}</p>
			<p class="colophon__meta">
				© {new Date().getFullYear()}
				{profile.name} · {profile.location}
			</p>
		</div>
	</div>
</footer>

<style lang="scss">
	@use 'variables' as *;
	@use 'mixins' as *;

	.colophon {
		margin-top: 4.5rem;
		border-top: $hairline solid var(--line);
	}

	.colophon__inner {
		@include container;
		display: grid;
		grid-template-columns: 1fr;

		@include respond-to(md) {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.colophon__cell {
		padding-block: 2rem;
		border-bottom: $hairline solid var(--line);
		display: flex;
		flex-direction: column;
		gap: 0.75rem;

		@include respond-to(md) {
			padding: 2.5rem 2rem 2.75rem 0;
			border-bottom: none;
			border-right: $hairline solid var(--line);

			&:not(:first-child) {
				padding-left: 2rem;
			}

			&:last-child {
				border-right: none;
				padding-right: 0;
			}
		}
	}

	.colophon__label {
		@include mono-label;
		color: var(--fg-subtle);
	}

	.colophon__email {
		@include focus-ring;
		font-family: $font-serif;
		font-style: italic;
		font-size: clamp(1.35rem, 2.2vw, 1.75rem);
		line-height: 1.2;
		word-break: break-word;

		&:hover {
			text-decoration: underline;
			text-underline-offset: 4px;
		}
	}

	.colophon__actions {
		margin-top: 0.25rem;
	}

	.colophon__btn {
		@include mono-label;
		@include focus-ring;
		color: var(--fg-muted);
		padding: 0.25rem 0;

		&:hover {
			color: var(--fg);
		}
	}

	.colophon__links {
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
		align-items: flex-start;

		a {
			@include mono-label;
			@include focus-ring;

			&:hover {
				text-decoration: underline;
				text-underline-offset: 4px;
			}
		}
	}

	.colophon__text {
		font-size: 0.92rem;
		color: var(--fg);
	}

	.colophon__meta {
		@include mono-label;
		color: var(--fg-muted);
		margin-top: auto;
	}
</style>
