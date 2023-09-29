<script lang="ts">
	import type { SimpleEventDto } from '@hack-it/dtos';

	export let event: SimpleEventDto;

	let formattedStart = `${event.start.day}.${event.start.month}.${event.start.year}`;
	let formattedEnd = `${event.start.day}.${event.start.month}.${event.start.year}`;
</script>

<article class="event">
	<div class="event__card">
		<div class="event__content">
			<h4>{event.title}</h4>
			<p class="event__description">
				{event.shortDesc}
			</p>
		</div>
		<div class="event__meta">
			<div>Starts at: {formattedStart}</div>
			<div>Ends at: {formattedEnd}</div>
		</div>
	</div>
</article>

<style lang="scss">
	.event {
		background-color: var(--bg);
		border: solid 1px var(--line);
		border-radius: var(--border-radius-medium);
		container-type: inline-size;
		transition: var(--card-transition);

		&:hover {
			--bg: var(--bg-highlighted);
			--line: var(--line-highlighted);
		}

		&__card {
			display: flex;
			gap: 8px;
			justify-content: space-between;
			padding: 8px;
		}

		&__content {
			display: flex;
			flex-direction: column;
			gap: 8px;
			padding: 16px;
		}

		&__description {
			-moz-box-orient: vertical;
			-webkit-box-orient: vertical;
			display: -moz-box;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			line-clamp: 1;
			overflow: hidden;
		}

		&__meta {
			background-color: var(--base-050);
			border-radius: var(--border-radius-small);
			color: var(--text-muted);
			padding: 16px;
			width: 200px;
		}

		@container (max-width: 600px) {
			&__card {
				flex-direction: column;
				gap: 0;
			}

			&__meta {
				width: auto;
			}
		}
	}
</style>
