<script lang="ts">
	import { getKeyboardContext } from '#lib/keyboard.svelte.ts';
	const keyboard = getKeyboardContext();
</script>

<svelte:document onkeydown={(e) => keyboard.onkeydown(e)}></svelte:document>

<section>
	{#each keyboard.rows as row, index (row)}
		<div>
			{const keys = [...row]}

			{#if index == 2}
				<button onclick={() => keyboard.onsubmit()}>ENTER</button>
			{/if}

			{#each keys as key (key)}
				<button onclick={() => keyboard.oninput(key)}>{key}</button>
			{/each}

			{#if index == 2}
				<button onclick={() => keyboard.ondelete()}>⌫</button>
			{/if}
		</div>
	{/each}
</section>

<style>
	section {
		margin-block-start: 1.5rem;
	}

	div {
		display: flex;
		gap: 0.25rem;

		&:not(:first-child) {
			margin-block-start: 0.5rem;
		}
	}

	button {
		flex-grow: 1;
		height: 2rem;
		color: white;
		background-color: #515151;
		border-radius: 0.4rem;
		border: none;
		cursor: pointer;
		font-weight: 700;
		user-select: none;
	}
</style>
