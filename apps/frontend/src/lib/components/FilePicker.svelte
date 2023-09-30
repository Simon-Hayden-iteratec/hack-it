<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let name: string | undefined = undefined;
	export let accept = 'image/*';
	export let label = '';

	const dispatch = createEventDispatcher<{
		change: File | undefined;
	}>();

	let input: HTMLInputElement;
	let fileName: string;
	let file: File | undefined;

	function handleEvent() {
		file = input.files?.item(0) ?? undefined;
		dispatch('change', file);
	}
</script>

<label class="form-field">
	{label}
	<input
		type="file"
		{name}
		{accept}
		hidden
		bind:this={input}
		bind:value={fileName}
		on:change={handleEvent}
	/>

	<div class="file-picker">
		<!--
		  Fake a button. A <button> would not bubble the event correctly (in case of
		  SSR).
		-->
		<div class="button"><slot /></div>
		{file?.name ?? 'or drag and drop one here'}
	</div></label
>

<style lang="scss">
	.file-picker {
		align-items: center;
		background: var(--bg);
		border: dashed 1px var(--line-highlighted);
		border-radius: var(--border-radius-small);
		display: flex;
		flex-direction: column;
		gap: 16px;
		justify-content: flex-start;
		padding: 24px 8px;
		cursor: pointer;

		& .button {
			background-color: var(--button);
			border: none;
			border-radius: var(--border-radius-small);
			color: var(--text);
			font-size: 1rem;
			line-height: 36px;
			padding: 8px 32px;
			outline-offset: 2px;
		}

		@media (min-width: 900px) {
			flex-direction: row;
			padding: 8px;
		}
	}
</style>
