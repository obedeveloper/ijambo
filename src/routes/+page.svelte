<script lang="ts">
	import { DESC, TITLE } from '#lib/site-config.ts';
	import Keyboard from './Keyboard.svelte';
	import { setKeyboardContext, Keyboard as KeyboardClass } from '#lib/keyboard.svelte.ts';
	import Tiles from './Tiles.svelte';

	setKeyboardContext(new KeyboardClass());

	const { data } = $props();
	const guesses = $derived(data.guesses);
</script>

<svelte:head>
	<title>{TITLE}</title>
	<meta name="description" content={DESC} />
</svelte:head>

<div>
	<Tiles {guesses}></Tiles>
	<Keyboard></Keyboard>
</div>

<style>
	div {
		max-width: 40rem;
		margin-inline: auto;
		padding-inline: 1rem;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
</style>
