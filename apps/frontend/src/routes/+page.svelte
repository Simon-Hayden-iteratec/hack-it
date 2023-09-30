<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import EventCard from '$lib/components/EventCard.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: events = data.events;
</script>

<div class="page">
	<SectionHeader title="Events">
		<Button href="event/create" kind="primary">Create an Event</Button>
	</SectionHeader>
	<div class="events">
		{#each events as event}
			<a href="event/{event.id}">
				<EventCard {event} />
			</a>
		{/each}
	</div>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.events {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
</style>
