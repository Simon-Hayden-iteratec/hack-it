<a class="anchor" href="/event">
	<article class="event">
		<h4>Event Card</h4>
		<p class="event__description">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
			voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
			non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>
	</article>
</a>

<style lang="scss">
	.anchor {
		border-radius: var(--border-radius-medium);
		color: var(--text);
		text-decoration: none;
	}

	.event {
		background-color: var(--secondary);
		border-radius: var(--border-radius-medium);
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 24px;

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
