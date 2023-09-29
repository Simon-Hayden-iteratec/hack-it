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
	<div class="page__header">
		<div class="page__header-texts">
			<h1>{event.title}</h1>
			<p>{event.desc}</p>
		</div>
		<div class="page__meta">
			<p class="page__meta-info">
				Starts at: {event.start.day}.{event.start.month}.{event.start.year}
			</p>
			<p class="page__meta-info">Ends at: {event.end.day}.{event.end.month}.{event.end.year}</p>
		</div>
	</div>
	<SectionHeader title="Projects">
		<Button type="primary" href="project/create">Create a Project</Button>
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
		container-type: inline-size;
		display: flex;
		flex-direction: column;
		gap: 16px;

		&__hero {
			aspect-ratio: 21 / 9;
			background-color: var(--bg-muted);
			border: 1px solid var(--line);
			border-radius: var(--border-radius-medium);
			object-fit: contain;
		}

		&__header-texts {
			display: flex;
			flex-direction: column;
			gap: 4px;
			margin-bottom: 16px;
		}

		&__meta {
			border: 1px solid var(--line);
			border-radius: var(--border-radius-medium);
			padding-block: 8px;

			&-info {
				padding: 8px 16px;
			}
		}

		&__projects {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
			gap: 16px;
		}

		@container (width > 700px) {
			&__header {
				display: flex;
				justify-content: space-between;

				&-texts {
					flex-grow: 2;
				}
			}

			&__meta {
				flex-grow: 1;
			}
		}
	}
</style>
