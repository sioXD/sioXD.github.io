<script lang="ts">
	import type { ProfileData } from '#lib/data/profile.js';
	import { createDynamicFavicon } from '#lib/dynamicFavicon.svelte.js';
	import { KineticTypeController } from '#lib/kineticFonts.svelte.js';

	interface Props {
		profile: ProfileData;
		theme: 'dark' | 'light';
		onToggleTheme: () => void;
	}

	let { profile, theme, onToggleTheme }: Props = $props();

	let firstChars = $derived(Array.from(profile.firstName));
	let lastChars = $derived(Array.from(profile.lastName));
	let kinetic = $derived(new KineticTypeController(firstChars.length + lastChars.length));

	const syncFavicon = createDynamicFavicon(() => ({
		firstChar: firstChars[0] ?? 'S',
		secondChar: lastChars[0] ?? 'Z',
		firstFontId: kinetic.getSpecimen(0).id,
		secondFontId: kinetic.getSpecimen(firstChars.length).id,
		theme
	}));
</script>

<header class="hero" {@attach kinetic.ticker} {@attach syncFavicon}>
	<div class="hero__topbar">
		<div class="hero__topbar-inner">
			<div class="hero__id">
				<span>00 // {profile.githubHandle.toUpperCase()}</span>
			</div>

			<span class="hero__loc">{profile.location}</span>

			<div class="hero__controls" role="group" aria-label="Typografie- und Darstellungssteuerung">
				<button type="button" class="ctrl-btn" onclick={() => kinetic.toggleMode()}>
					{kinetic.mode === 'glyph' ? 'MODE: GLYPH' : 'MODE: UNISON'}
				</button>
				<button type="button" class="ctrl-btn" onclick={() => kinetic.togglePlay()}>
					{kinetic.isPlaying ? 'PAUSE' : 'PLAY'}
				</button>
				<button type="button" class="ctrl-btn" onclick={() => kinetic.shuffleAll()}>SHUFFLE</button>
				<button type="button" class="ctrl-btn ctrl-btn--invert" onclick={onToggleTheme}>
					{theme === 'dark' ? 'LIGHT' : 'DARK'}
				</button>
			</div>
		</div>
	</div>

	<div class="hero__stage">
		<div class="hero__stage-inner">
			<p class="hero__eyebrow">
				<span>TYPE SPECIMEN // {kinetic.lastSpecimenLabel.toUpperCase()}</span>
				<span class="hero__hint">HOVER LETTERS TO SHIFT</span>
			</p>

			<h1 class="wordmark" aria-label={profile.name}>
				<span class="wordmark__line" aria-hidden="true">
					{#each firstChars as char, idx (`first-${idx}`)}
						{@const spec = kinetic.getSpecimen(idx)}
						<button
							type="button"
							class={['glyph', `glyph--${spec.id}`]}
							onpointerenter={() => kinetic.morphGlyph(idx)}
							onclick={() => kinetic.morphGlyph(idx)}
							tabindex="-1"
						>
							{char}
						</button>
					{/each}
				</span>

				<span class="wordmark__line wordmark__line--offset" aria-hidden="true">
					{#each lastChars as char, idx (`last-${idx}`)}
						{@const globalIdx = firstChars.length + idx}
						{@const spec = kinetic.getSpecimen(globalIdx)}
						<button
							type="button"
							class={['glyph', `glyph--${spec.id}`]}
							onpointerenter={() => kinetic.morphGlyph(globalIdx)}
							onclick={() => kinetic.morphGlyph(globalIdx)}
							tabindex="-1"
						>
							{char}
						</button>
					{/each}
				</span>
			</h1>
		</div>
	</div>

	<div class="hero__bottom">
		<div class="hero__bottom-inner">
			<div class="hero__meta-block">
				<p class="hero__role">{profile.role}</p>
				<p class="hero__statement">{profile.statement}</p>
			</div>

			<div class="hero__links">
				<a class="hero__link hero__link--primary" href="#projects">
					PROJECTS [{String(profile.projects.length).padStart(2, '0')}] ↓
				</a>
				<a class="hero__link" href={profile.githubUrl} target="_blank" rel="external noreferrer">
					GITHUB ↗
				</a>
				<a class="hero__link" href={profile.codebergUrl} target="_blank" rel="external noreferrer">
					CODEBERG ↗
				</a>
				<a class="hero__link" href={profile.linkedinUrl} target="_blank" rel="external noreferrer">
					LINKEDIN ↗
				</a>
				<a class="hero__link" href="mailto:{profile.email}">EMAIL ↗</a>
			</div>
		</div>
	</div>
</header>

<style lang="scss">
	@use 'variables' as *;
	@use 'mixins' as *;

	.hero {
		min-height: 100svh;
		display: grid;
		grid-template-rows: auto 1fr auto;
		border-bottom: $hairline solid var(--line);
		overflow-x: clip;
	}

	.hero__topbar {
		border-bottom: $hairline solid var(--line);
		background: var(--bg);
	}

	.hero__topbar-inner {
		@include container;
		min-height: 3.5rem;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding-block: 0.65rem;
	}

	.hero__id {
		@include mono-label;
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
	}

	.hero__loc {
		@include mono-label;
		color: var(--fg-muted);
		display: none;

		@include respond-to(md) {
			display: inline;
		}
	}

	.hero__controls {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.35rem;
	}

	.ctrl-btn {
		@include mono-label;
		@include focus-ring;
		padding: 0.32rem 0.6rem;
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

	.ctrl-btn--invert {
		background: var(--invert-bg);
		color: var(--invert-fg);
		border-color: var(--invert-bg);

		&:hover {
			opacity: 0.86;
			color: var(--invert-fg);
		}
	}

	.hero__stage {
		display: flex;
		align-items: center;
		padding-block: 3.5rem;
	}

	.hero__stage-inner {
		@include container;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.hero__eyebrow {
		@include mono-label;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		color: var(--fg-muted);
		padding-bottom: 0.85rem;
		border-bottom: $hairline solid var(--line);
		white-space: nowrap;
		overflow: hidden;
	}

	.hero__hint {
		color: var(--fg-subtle);
		display: none;

		@include respond-to(sm) {
			display: inline;
		}
	}

	.wordmark {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.1em;
		font-size: clamp(2.85rem, 11.8vw, 9.75rem);
		height: 2.7em;
		line-height: 1;
		font-weight: 400;
		user-select: none;
		contain: layout;
	}

	.wordmark__line {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		gap: 0.04em;
	}

	.wordmark__line--offset {
		@include respond-to(md) {
			padding-left: clamp(2rem, 10vw, 9rem);
		}
	}

	.glyph {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 1.08em;
		min-width: 0.68em;
		padding-inline: 0.03em;
		color: var(--fg);
		cursor: crosshair;
		transition:
			color $transition-fast,
			background-color $transition-fast;

		&:hover {
			background: var(--invert-bg);
			color: var(--invert-fg);
		}
	}

	.glyph--space {
		font-family: $font-sans;
		font-weight: 700;
		letter-spacing: -0.05em;
	}

	.glyph--serif {
		font-family: $font-serif;
		font-style: italic;
		font-weight: 400;
		font-size: 1.16em;
	}

	.glyph--syne {
		font-family: $font-syne;
		font-weight: 800;
		font-size: 0.94em;
	}

	.glyph--pixel {
		font-family: $font-pixel;
		font-weight: 400;
		font-size: 0.76em;
	}

	.glyph--anton {
		font-family: $font-anton;
		font-weight: 400;
		font-size: 1.04em;
		letter-spacing: 0.01em;
	}

	.glyph--major {
		font-family: $font-major;
		font-weight: 400;
		font-size: 0.84em;
	}

	.glyph--shade {
		font-family: $font-shade;
		font-weight: 400;
		font-size: 0.78em;
	}

	.glyph--dot {
		font-family: $font-dot;
		font-weight: 400;
		font-size: 0.96em;
	}

	.glyph--playfair {
		font-family: $font-playfair;
		font-style: italic;
		font-weight: 900;
		font-size: 0.95em;
	}

	.glyph--monoton {
		font-family: $font-monoton;
		font-weight: 400;
		font-size: 0.86em;
	}

	.glyph--chakra {
		font-family: $font-chakra;
		font-style: italic;
		font-weight: 700;
		font-size: 0.92em;
	}

	.glyph--cinzel {
		font-family: $font-cinzel;
		font-weight: 700;
		font-size: 0.94em;
	}

	.glyph--rubik {
		font-family: $font-rubik;
		font-weight: 400;
		font-size: 0.72em;
	}

	.glyph--michroma {
		font-family: $font-michroma;
		font-weight: 400;
		font-size: 0.76em;
	}

	.glyph--bangers {
		font-family: $font-bangers;
		font-weight: 400;
		font-size: 1.12em;
		letter-spacing: 0.03em;
	}

	.glyph--marker {
		font-family: $font-marker;
		font-weight: 400;
		font-size: 0.9em;
	}

	.glyph--caveat {
		font-family: $font-caveat;
		font-weight: 400;
		font-size: 1.08em;
	}

	.glyph--shantell {
		font-family: $font-shantell;
		font-style: italic;
		font-weight: 700;
		font-size: 0.92em;
	}

	.glyph--boogaloo {
		font-family: $font-boogaloo;
		font-weight: 400;
		font-size: 1.08em;
	}

	.glyph--luckiest {
		font-family: $font-luckiest;
		font-weight: 400;
		font-size: 0.92em;
	}

	.glyph--tilt {
		font-family: $font-tilt;
		font-weight: 400;
		font-size: 0.94em;
	}

	.hero__bottom {
		border-top: $hairline solid var(--line);
	}

	.hero__bottom-inner {
		@include container;
		display: grid;
		gap: 1.5rem;
		padding-block: 1.65rem;
		align-items: end;

		@include respond-to(md) {
			grid-template-columns: 1.3fr auto;
			gap: 2.5rem;
		}
	}

	.hero__role {
		@include mono-label;
		color: var(--fg);
		margin-bottom: 0.5rem;
	}

	.hero__statement {
		font-size: clamp(0.95rem, 1.35vw, 1.08rem);
		color: var(--fg-muted);
		max-width: 58ch;
	}

	.hero__links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.hero__link {
		@include mono-label;
		@include focus-ring;
		padding: 0.65rem 1rem;
		border: $hairline solid var(--line);
		transition:
			background-color $transition-fast,
			color $transition-fast,
			border-color $transition-fast;

		&:hover {
			background: var(--invert-bg);
			color: var(--invert-fg);
			border-color: var(--invert-bg);
		}
	}

	.hero__link--primary {
		background: var(--invert-bg);
		color: var(--invert-fg);
		border-color: var(--invert-bg);

		&:hover {
			background: transparent;
			color: var(--fg);
			border-color: var(--fg);
		}
	}
</style>
