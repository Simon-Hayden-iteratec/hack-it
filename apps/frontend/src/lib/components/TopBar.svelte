<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	export let title: string = 'Title';
</script>

<div class="top-bar">
	<div class="top-bar__button">
		<Button type="primary">Create Event</Button>
	</div>
	<h1>{title}</h1>
</div>

<style lang="scss">
	.top-bar {
		display: flex;
		flex-direction: column;
		height: 160px;
		justify-content: space-between;

		&__button {
			align-self: flex-end;
		}
	}
</style>
