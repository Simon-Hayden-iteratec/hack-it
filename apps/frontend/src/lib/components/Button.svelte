<script lang="ts">
	export let type: 'primary' | 'secondary' = 'secondary';
</script>

<button class="button button--{type}">
	<slot />
</button>

<style lang="scss">
	.button {
		border: none;
		border-radius: var(--border-radius-small);
		font-size: 1rem;
		line-height: 36px;
		padding: 8px 32px;

		&--primary {
			background-color: var(--accent);
			color: var(--on-accent);
		}

		&--secondary {
			background-color: var(--secondary);
		}
	}
</style>
