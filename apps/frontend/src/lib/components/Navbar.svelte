<script land="ts">
	import darkLogo from '$lib/assets/logo-dark.png';
	import lightLogo from '$lib/assets/logo-light.png';
</script>

<nav class="nav">
	<a class="nav__link" href="/">
		<picture class="nav__picture">
			<source srcset={lightLogo} media="(prefers-color-scheme: dark)" />
			<img src={darkLogo} alt="" />
		</picture>
	</a>
</nav>

<style lang="scss">
	.nav {
		align-items: flex-end;
		border-bottom: 1px solid var(--line);
		display: flex;
		height: 48px;
		justify-content: center;
		padding: 16px;

		&__link {
			height: 100%;
		}

		&__picture {
			display: inline-flex;
			height: 100%;
			justify-content: center;
		}
	}
</style>
