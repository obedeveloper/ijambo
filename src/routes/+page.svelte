<script lang="ts">
	import { DESC, TITLE } from '#lib/site.ts';
	import Keyboard from './Keyboard.svelte';

	const inputs: string[] = $state(Array.from({ length: 6 }, () => ''));
	const currentIndex = $state(0);
</script>

<svelte:head>
	<title>{TITLE}</title>
	<meta name="description" content={DESC} />
</svelte:head>

<div class="wrapper">
	<section>
		{#each { length: 6 }, i}
			{#each { length: 5 }, j}
				<div>{inputs[i][j]}</div>
			{/each}
		{/each}
	</section>
	<Keyboard bind:userInput={inputs[currentIndex]}></Keyboard>
</div>

<style>
	.wrapper {
		max-width: 40rem;
		margin-inline: auto;
		padding-inline: 1rem;
	}

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
		}
	}
</style>
