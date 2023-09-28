<script lang="ts">
	export let type: 'primary' | 'secondary' = 'secondary';
	export let href: string;
</script>

{#if href}
	<a class="button button--{type}" {href}>
		<slot />
	</a>
{:else}
	<button class="button button--{type}">
		<slot />
	</button>
{/if}

<style lang="scss">
	.button {
		border: none;
		border-radius: var(--border-radius-small);
		cursor: pointer;
		font-size: 1rem;
		line-height: 36px;
		padding: 8px 32px;

		&--primary {
			background-color: var(--accent);
			color: var(--on-accent);
		}

		&--secondary {
			background-color: var(--secondary);
			color: var(--on-secondary);
		}
	}
</style>
