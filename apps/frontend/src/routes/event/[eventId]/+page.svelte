<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: event = data.event;
</script>

<div class="page">
	<img class="page__hero" src="https://picsum.photos/900/500" alt="" />
	<SectionHeader title="Projects">
		<Button type="primary" href="project/create">Create Project</Button>
	</SectionHeader>
	<div class="page__projects">
		{#each event.projects ?? [] as project}
			<a href="project/{project.id}">
				<ProjectCard {project} />
			</a>
		{/each}
	</div>
</div>

<style lang="scss">
	.page {
		display: flex;
		flex-direction: column;
		gap: 16px;

		&__hero {
			aspect-ratio: 21 / 9;
			background-color: var(--bg-muted);
			border: solid 1px var(--line);
			border-radius: var(--border-radius-medium);
			object-fit: contain;
		}

		&__projects {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
			gap: 16px;
		}
	}
</style>
