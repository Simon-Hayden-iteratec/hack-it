<script lang="ts">
	export let accept = 'image/*';
	export let label = '';
	export let onchange: (e: any) => void;

	let input: HTMLInputElement;
	let fileName: string;
</script>

<label class="form-field">
	{label}
	<input type="file" {accept} hidden bind:this={input} bind:value={fileName} on:change={onchange} />

	<div class="file-picker">
		<button
			on:click={(e) => {
				input.click();
				e.preventDefault();
			}}
			><slot />
		</button>
		{fileName || 'or drag and drop one here'}
	</div></label
>

<style>
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

		& button {
			background-color: var(--button);
			border: none;
			border-radius: var(--border-radius-small);
			color: var(--text);
			cursor: pointer;
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
