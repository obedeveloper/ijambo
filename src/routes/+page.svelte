<script lang="ts">
	import { DESC, TITLE } from '#lib/site.ts';
	import Keyboard from './Keyboard.svelte';
</script>

<svelte:head>
	<title>{TITLE}</title>
	<meta name="description" content={DESC} />
</svelte:head>

<div class="wrapper">
	<section>
		{#each { length: 30 }}
			<div></div>
		{/each}
	</section>
	<Keyboard></Keyboard>
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
		}
	}
</style>
