<script lang="ts">
	function onSubmit(e: any) {
		const formData = new FormData(e.target);

		// TODO
		console.log('submit', formData);
	}
</script>

<h1>Create Project</h1>

<form class="form" method="POST" action="?/create" on:submit|preventDefault={onSubmit}>
	<label class="form-field form-field--medium">
		<span>Title<span class="text-muted">*</span></span>
		<input name="title" placeholder="Tinder for Hackathon Projects" type="text" required /></label
	>
	<label class="form-field"
		>Summary<textarea
			name="shortDesc"
			placeholder="Imagine you could simply swipe on project ideas to find your perfect match..."
			maxlength="256"
			rows="3"
		/></label
	>
	<label class="form-field"
		>Description<textarea name="desc" placeholder="" maxlength="2048" rows="5" /></label
	>

	<input type="submit" value="Create Project" />
</form>

<style>
	h1 {
		margin-bottom: 3rem;
	}
</style>
