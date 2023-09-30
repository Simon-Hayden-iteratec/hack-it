<script lang="ts" context="module">
	export type ButtonKind = 'primary' | 'secondary';
</script>

<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	export let kind: ButtonKind = 'secondary';
	export let href: string | undefined = undefined;

	interface $$Props extends HTMLButtonAttributes {
		kind?: ButtonKind;
		href?: string;
	}

	$: fixedClass = `button button--${kind} ${$$restProps.class ?? ''}`;

	$: fixedProps = { ...$$restProps, class: fixedClass, type: $$restProps.type ?? 'button' };
</script>

{#if href}
	<a class="{fixedProps.class}" {href} on:click>
		<slot />
	</a>
{:else}
	<button {...fixedProps} on:click>
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
			--bg: var(--button);
		}
	}
</style>
