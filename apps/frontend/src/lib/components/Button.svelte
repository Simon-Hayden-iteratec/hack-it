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
		background-color: var(--bg);
		border: none;
		border-radius: var(--border-radius-small);
		color: var(--text);
		cursor: pointer;
		font-size: 1rem;
		line-height: 32px;
		padding: 4px 24px;
		outline-offset: 2px;

		&--primary {
			--bg: var(--primary);
			--text: var(--base-000);
			--focus-visible: var(--focus-visible-primary);
		}

		&--secondary {
			--bg: var(--base-200);
		}
	}
</style>
