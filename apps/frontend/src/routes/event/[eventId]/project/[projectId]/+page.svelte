<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: project = data.project;
	$: owners = project.owners ?? [];
	$: participants = project.participants ?? [];
</script>

<div class="page">
	<Hero src="https://picsum.photos/900/500" />
	<div class="page__header">
		<div class="page__header-texts">
			<h1>{project.title}</h1>
			<p>{project.desc}</p>
		</div>
		<div class="page__users">
			<h3 class="page__users-header">Owners</h3>
			<div class="page__users-badges">
				{#each owners as owner}
					<span class="page__user">{owner.name}</span>
				{/each}
			</div>
		</div>
		<div class="page__users">
			<h3 class="page__users-header">Participants</h3>
			<div class="page__users-badges">
				{#each participants as participant}
					<span class="page__user">{participant.name}</span>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.page {
		container-type: inline-size;
		display: flex;
		flex-direction: column;
		gap: 16px;

		&__header {
			display: flex;
			flex-direction: column;
			gap: 16px;
		}

		&__users {
			display: flex;
			flex-direction: column;
			gap: 4px;

			&-badges {
				display: flex;
				flex-wrap: wrap;
				gap: 8px;
			}
		}

		&__user {
			background-color: var(--base-025);
			border: 1px solid var(--line);
			border-radius: var(--border-radius-full);
			display: inline-block;
			padding: 8px 12px;
		}
	}
</style>
