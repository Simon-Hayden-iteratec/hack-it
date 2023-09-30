<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import FilePicker from '$lib/components/FilePicker.svelte';
	import type { CreateEventDto, DayDto } from '@hack-it/dtos';
	import type { EventHandler } from 'svelte/elements';

	const onSubmit: EventHandler<SubmitEvent, HTMLFormElement> = async (e) => {
		const form = e.currentTarget;
		const isValid = form.reportValidity();
		if (!isValid) {
			return;
		}
		const formData = new FormData(form);

		const title = formData.get('title')?.toString(),
			shortDesc = formData.get('shortDesc')?.toString(),
			desc = formData.get('desc')?.toString(),
			owners = formData.getAll('owners').map((val) => val.toString()),
			startStr = formData.get('start')?.toString(),
			endStr = formData.get('end')?.toString(),
			imgFile = formData.get('imgFile')?.valueOf();

		if (!title || !startStr || !endStr) {
			return;
		}

		const startDate = new Date(startStr);
		const endDate = new Date(endStr);
		const start: DayDto = {
			year: startDate.getUTCFullYear(),
			month: startDate.getUTCMonth(),
			day: startDate.getUTCDate()
		};
		const end: DayDto = {
			year: endDate.getUTCFullYear(),
			month: endDate.getUTCMonth(),
			day: endDate.getUTCDate()
		};

		let imgSrc: string | undefined = undefined;
		if (imgFile && imgFile instanceof File) {
			const body = new FormData();
			body.append('file', imgFile);
			const response = await fetch('/api/files', {
				method: 'POST',
				body
			});

			if (!response.ok) {
				await response.body?.cancel();
				return;
			}

			const ids = (await response.json()) as string[];
			imgSrc = `/api/files/${ids[0]}`;
		}

		const dto: CreateEventDto = {
			title,
			desc,
			shortDesc,
			start,
			end,
			imgSrc,
			owners
		};

		const response = await fetch('/api/events', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(dto)
		});

		if (!response.ok) {
			await response.body?.cancel();
			return;
		}

		const details = (await response.json()) as { id: string };
		goto(`/event/${details.id}`);
	};

	let owners = [''];

	function addOwner() {
		owners.push('');
		owners = owners;
	}

	function removeOwner(index: number) {
		owners.splice(index, 1);
		owners = owners;
	}
</script>

<svelte:head>
	<title>Create an Event</title>
</svelte:head>

<h1>Create an Event</h1>

<form
	class="form"
	method="POST"
	action="?/create"
	on:submit|preventDefault={onSubmit}
	enctype="multipart/form-data"
>
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

	<fieldset class="form-group">
		<legend>Owners<span class="text-muted">*</span></legend>

		<div class="owners">
			{#each owners as owner, i (i)}
				<div class="owner">
					<label class="form-field">
						<span hidden>Owner</span>
						<input
							name="owners"
							type="text"
							required
							placeholder="awesome@comp.com"
							bind:value={owner}
						/>
					</label>
				</div>

				{#if owners.length !== 1}
					<Button kind="secondary" title="Remove owner" on:click={() => removeOwner(i)}>-</Button>
				{/if}
			{/each}

			<Button kind="secondary" title="Add owner" class="add-button" on:click={addOwner}>+</Button>
		</div>
	</fieldset>

	<FilePicker name="imgFile" label="Image">Choose a file</FilePicker>

	<input type="submit" value="Create Event" />
</form>

<style lang="scss">
	h1 {
		margin-bottom: 3rem;
	}

	fieldset > label {
		flex: 1 1 50%;
	}

	.owner {
		display: flex;
		width: 100%;
		gap: 4px;

		label {
			flex-grow: 1;
		}
	}

	.owners {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 8px;

		:global(button) {
			padding: 0;
			height: 40px;
			width: 40px;
			font-size: 24px;
			place-self: center;
		}

		:global(button.add-button) {
			grid-column: -2 / -1;
		}
	}
</style>
