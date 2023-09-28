<script land="ts">
	import darkLogo from '$lib/assets/logo-dark.png';
	import lightLogo from '$lib/assets/logo-light.png';
</script>

<nav class="nav">
	<picture class="picture">
		<source srcset={lightLogo} media="(prefers-color-scheme: dark)" />
		<img src={darkLogo} alt="" />
	</picture>
</nav>

<style>
	.nav {
		align-items: flex-end;
		border-bottom: 1px solid var(--secondary);
		display: flex;
		height: 40px;
		padding: 8px;
	}

	.picture {
		display: inline-flex;
		height: 100%;
	}
</style>
