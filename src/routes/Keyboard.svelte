<script lang="ts">
	let { userInput = $bindable() }: { userInput: string } = $props();

	const rows = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];
	const len = $derived(userInput.length);

	function onkeydown(e: KeyboardEvent) {
		const key = e.key.toLocaleUpperCase();

		if (key == 'BACKSPACE') return ondelete();
		if (key == 'ENTER') return onsubmit();
		if (!rows.join().includes(key)) return;

		oninput(key);
	}

	function oninput(key: string) {
		if (len >= 5) return;
		userInput += key;
	}

	function ondelete() {
		const inputArr = [...userInput];
		inputArr.splice(len - 1, 1);
		userInput = inputArr.join('');
	}

	function onsubmit() {}
</script>

<svelte:document {onkeydown}></svelte:document>

<section>
	{#each rows as row, index (row)}
		<div>
			{const keys = [...row]}

			{#if index == 2}
				<button onclick={onsubmit}>ENTER</button>
			{/if}

			{#each keys as key (key)}
				<button onclick={() => oninput(key)}>{key}</button>
			{/each}

			{#if index == 2}
				<button onclick={ondelete}>⌫</button>
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
	}
</style>
