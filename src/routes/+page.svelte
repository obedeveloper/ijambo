<script lang="ts">
	import { DESC, TITLE } from '#lib/site-config.ts';
	import Keyboard from './Keyboard.svelte';
	import { setKeyboardContext, Keyboard as KeyboardClass } from '#lib/keyboard.svelte.ts';

	setKeyboardContext(new KeyboardClass());

	const { data } = $props();
	const guesses = $derived(data.guesses);
</script>

<svelte:head>
	<title>{TITLE}</title>
	<meta name="description" content={DESC} />
</svelte:head>

<div class="wrapper">
	<section>
		{#each { length: 6 }, i}
			{#each { length: 5 }, j}
				<div>{guesses[i]?.value[j]}</div>
			{/each}
		{/each}
	</section>
	<Keyboard></Keyboard>
</div>

<style>
	.wrapper {
		max-width: 40rem;
		margin-inline: auto;
		padding-inline: 1rem;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
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
