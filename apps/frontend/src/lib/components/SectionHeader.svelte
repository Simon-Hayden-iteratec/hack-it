<script lang="ts">
	export let title: string = 'Title';
</script>

<div class="top-bar">
	<h2>{title}</h2>
	<div class="top-bar__actions">
		<slot />
	</div>
</div>

<style lang="scss">
	.top-bar {
		align-items: center;
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		&__actions {
			display: flex;
			justify-content: flex-end;
		}
	}
</style>
