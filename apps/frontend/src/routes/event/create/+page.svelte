<h1>Create Event</h1>

<form class="form">
	<label class="form-field form-field--medium"
		>Title*<input placeholder="Hackfest" type="text" required /></label
	>
	<label class="form-field"
		>Summary<textarea
			placeholder="Get ready for the first hackathon of the year!"
			maxlength="256"
			rows="3"
		/></label
	>
	<label class="form-field">Description<textarea placeholder="" maxlength="2048" rows="5" /></label>
	<fieldset>
		<legend>Date</legend>
		<label class="form-field form-field--short">Start Date*<input type="date" required /></label>
		<label class="form-field form-field--short">End Date*<input type="date" required /></label>
	</fieldset>
</form>

<style>
	fieldset > label {
		flex: 1 1 50%;
	}
</style>
