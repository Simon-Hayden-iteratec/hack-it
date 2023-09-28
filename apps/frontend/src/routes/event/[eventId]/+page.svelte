<script>
	import Button from '$lib/components/Button.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import TopBar from '$lib/components/TopBar.svelte';
</script>

<div class="page">
	<TopBar title="Projects">
		<Button type="primary" href="project/create">Create Project</Button>
	</TopBar>
	<div class="page__projects">
		<a href="project/1/">
			<ProjectCard id="id" />
		</a>
		<a href="project/2/">
			<ProjectCard id="id" />
		</a>
		<a href="project/3/">
			<ProjectCard id="id" />
		</a>
		<a href="project/4/">
			<ProjectCard id="id" />
		</a>
	</div>
</div>

<style lang="scss">
	.page {
		display: flex;
		flex-direction: column;
		gap: 16px;

		&__projects {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
			gap: 16px;
		}
	}
</style>
