<script lang="ts">
	import { Colophon, KineticHero, Projects, ThemeController, profile } from '#lib';

	const theme = new ThemeController();
</script>

<svelte:head>
	<title>{profile.name} — {profile.githubHandle}</title>
	<meta name="description" content="{profile.name}: {profile.statement}" />
</svelte:head>

<KineticHero {profile} theme={theme.current} onToggleTheme={() => theme.toggle()} />

<main {@attach theme.sync}>
	<Projects projects={profile.projects} />
</main>

<Colophon {profile} />
