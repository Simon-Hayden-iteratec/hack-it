<script lang="ts">
	function onSubmit(e: any) {
		const formData = new FormData(e.target);

		// TODO
		console.log('submit', formData);
	}
</script>

<h1>Create Event</h1>

<form class="form" method="POST" action="?/create" on:submit|preventDefault={onSubmit}>
	<label class="form-field form-field--medium">
		<span>Title<span class="text-muted">*</span></span>
		<input name="title" placeholder="Hackfest" type="text" required /></label
	>
	<label class="form-field"
		>Summary<textarea
			name="shortDesc"
			placeholder="Get ready for the first hackathon of the year!"
			maxlength="256"
			rows="3"
		/></label
	>
	<label class="form-field"
		>Description<textarea name="desc" placeholder="" maxlength="2048" rows="5" /></label
	>
	<fieldset>
		<legend>Date</legend>
		<label class="form-field form-field--short">
			<span>Start Date<span class="text-muted">*</span></span>
			<input name="start" type="date" required /></label
		>
		<label class="form-field form-field--short">
			<span>End Date<span class="text-muted">*</span></span>
			<input name="end" type="date" required /></label
		>
	</fieldset>

	<input type="submit" value="Create Event" />
</form>

<style>
	h1 {
		margin-bottom: 3rem;
	}

	fieldset > label {
		flex: 1 1 50%;
	}
</style>
