<script>
	import Button from '$lib/components/Button.svelte';
	import EventCard from '$lib/components/EventCard.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
</script>

<div class="page">
	<SectionHeader title="Events">
		<Button href="event/create" type="primary">Create Event</Button>
	</SectionHeader>
	<div class="events">
		<a href="event/1">
			<EventCard id="id" />
		</a>
		<a href="event/2">
			<EventCard id="id" />
		</a>
		<a href="event/3">
			<EventCard id="id" />
		</a>
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
