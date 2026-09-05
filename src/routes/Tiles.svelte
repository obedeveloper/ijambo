<script lang="ts">
	import { getKeyboardContext } from '#lib/keyboard.svelte.ts';

	interface Props {
		guesses: {
			value: string;
			tileColors: string;
		}[];
	}

	const { guesses }: Props = $props();
	const size = $derived(guesses.length);
	const input = $derived(getKeyboardContext().userInput);
</script>

<section>
	{#each { length: size }, i}
		{#each { length: 5 }, j}
			{const { value, tileColors } = guesses[i]}
			{const color = tileColors.split('-')[j]}

			<div style:--color={color}>{value[j]}</div>
		{/each}
	{/each}

	{#if size < 6}
		{#each { length: 5 }, j}
			<div>{input[j]}</div>
		{/each}
	{/if}

	{#each { length: 6 - size - 1 }}
		{#each { length: 5 }}
			<div></div>
		{/each}
	{/each}
</section>

<style>
	section {
		display: grid;
		grid-template-columns: repeat(5, 3.5rem);
		justify-content: center;
		gap: 0.25rem;

		div {
			border: 1.5px solid black;
			aspect-ratio: 1;
			font-size: 2.5rem;
			display: grid;
			place-content: center;
			font-weight: 600;
			background-color: oklch(from var(--color) 60% 70% h / 60%);
		}
	}
</style>
