<script lang="ts">
	import { Colophon, KineticHero, Projects, profile } from '#lib';

	let theme = $state<'dark' | 'light'>('dark');

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		document.documentElement.dataset.theme = theme;
	}
</script>

<svelte:head>
	<title>{profile.name} — {profile.githubHandle}</title>
	<meta name="description" content="{profile.name}: {profile.statement}" />
</svelte:head>

<KineticHero {profile} {theme} onToggleTheme={toggleTheme} />

<main>
	<Projects projects={profile.projects} />
</main>

<Colophon {profile} />
