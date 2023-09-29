<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import '../styles.scss';
</script>

<Navbar />
<div class="container">
	<slot />
</div>
