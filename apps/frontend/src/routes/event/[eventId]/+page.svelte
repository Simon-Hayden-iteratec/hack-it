<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: event = data.event;
	$: projects = event.projects ?? [];
</script>

<div class="page">
	<Hero src={event.imgSrc || 'https://picsum.photos/900/500'} />
	<div class="page__header">
		<div class="page__header-texts">
			<h1>{event.title}</h1>
			<p>{event.desc}</p>
		</div>
		<div class="page__meta">
			<h3 class="page__meta-info">Event Information</h3>
			<div class="page__meta-info">
				<p class="page__meta-info-heading">Start Date</p>
				<p>
					{event.start.day}.{event.start.month}.{event.start.year}
				</p>
			</div>
			<div class="page__meta-info">
				<p class="page__meta-info-heading">End Date</p>
				<p>
					{event.end.day}.{event.end.month}.{event.end.year}
				</p>
			</div>
			<div class="page__meta-info">
				<p class="page__meta-info-heading">Owners</p>
				{#each event.owners as owner}
					<p>
						{owner.name ? owner.name + ' (' : ''}{owner.email}{owner.name ? ')' : ''}
					</p>
				{/each}
			</div>
		</div>
	</div>
	<SectionHeader title="Projects">
		<Button kind="primary" href="project/create">Create a Project</Button>
	</SectionHeader>
	<div class="page__projects">
		{#each projects as project}
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

		&__header-texts {
			display: flex;
			flex-direction: column;
			gap: 4px;
			margin-bottom: 16px;
		}

		&__meta {
			background-color: var(--base-025);
			border: 1px solid var(--line);
			border-radius: var(--border-radius-medium);
			padding-block: 8px;

			&-info {
				display: flex;
				flex-direction: column;
				padding: 8px 16px;

				&-heading {
					color: var(--text-muted);
					font-size: 14px;
				}
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
				width: clamp(350px, 40%, 600px);
			}
		}
	}
</style>
