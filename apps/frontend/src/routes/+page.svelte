<script>
	import EventCard from '$lib/components/EventCard.svelte';
	import TopBar from '$lib/components/TopBar.svelte';
</script>

<div class="page">
	<TopBar />
	<div class="events">
		<EventCard />
		<EventCard />
		<EventCard />
		<EventCard />
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
