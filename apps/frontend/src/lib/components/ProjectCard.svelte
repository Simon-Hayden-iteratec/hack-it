<script lang="ts">
	import type { SimpleProjectDto } from '@hack-it/dtos';

	export let project: SimpleProjectDto;
</script>

<article class="project">
	<h4>{project.title}</h4>
	<p class="project__description">
		{project.shortDesc}
	</p>
</article>

<style lang="scss">
	.project {
		background-color: var(--bg);
		border: solid 1px var(--line);
		border-radius: var(--border-radius-medium);
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 24px;
		transition: var(--card-transition);

		&:hover {
			--bg: var(--bg-highlighted);
			--line: var(--line-highlighted);
		}

		&__description {
			-moz-box-orient: vertical;
			-webkit-box-orient: vertical;
			display: -moz-box;
			display: -webkit-box;
			-webkit-line-clamp: 4;
			line-clamp: 4;
			overflow: hidden;
		}
	}
</style>
