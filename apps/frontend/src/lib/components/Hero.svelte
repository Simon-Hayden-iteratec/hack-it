<script lang="ts">
	export let src: string;
	export let alt: string = '';
</script>

<img class="hero" {src} {alt} />

<style>
	.hero {
		aspect-ratio: 21 / 9;
		background-color: var(--bg-muted);
		border: 1px solid var(--line);
		border-radius: var(--border-radius-medium);
		object-fit: contain;
	}
</style>
