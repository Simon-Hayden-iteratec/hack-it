<script>
	import Button from '$lib/components/Button.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
</script>

<div class="page">
	<img
		class="page__hero"
		src="https://images.unsplash.com/photo-1695575161610-7aeb03933996?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3572&q=80"
		alt=""
	/>
	<SectionHeader title="Projects">
		<Button type="primary" href="project/create">Create Project</Button>
	</SectionHeader>
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

		&__hero {
			aspect-ratio: 21 / 9;
			background-color: var(--bg-muted);
			border: solid 1px var(--line);
			border-radius: var(--border-radius-medium);
			object-fit: contain;
		}

		&__projects {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
			gap: 16px;
		}
	}
</style>
