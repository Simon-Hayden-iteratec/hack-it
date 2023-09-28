<script lang="ts">
	export let title: string = 'Title';
</script>

<div class="top-bar">
	<div class="top-bar__actions">
		<slot />
	</div>
	<h1>{title}</h1>
</div>

<style lang="scss">
	.top-bar {
		display: flex;
		flex-direction: column;
		height: 160px;
		justify-content: space-between;

		&__actions {
			display: flex;
			justify-content: flex-end;
		}
	}
</style>
