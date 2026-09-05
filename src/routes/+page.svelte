<script lang="ts">
	import { getKeyboardContext } from '#lib/keyboard.svelte.js';
	import { DESC, TITLE } from '#lib/site-config.ts';
	import { invalidate } from '$app/navigation';
	import Keyboard from './Keyboard.svelte';
	import Tiles from './Tiles.svelte';
	import { getAnotherWord, getAnswer } from './word.remote.js';

	const { data } = $props();
	const guesses = $derived(data.guesses);
	const playAgain = $derived(
		guesses.find(({ tileColors }) => {
			return tileColors.split('-').every((color) => color == 'blue');
		})
	);

	const keyboard = getKeyboardContext();
	const asnwer = $derived(await getAnswer());
</script>

<svelte:head>
	<title>{TITLE}</title>
	<meta name="description" content={DESC} />
</svelte:head>

<div class="wrapper">
	<div>
		<Tiles {guesses}></Tiles>
		{#if asnwer}
			<p>Ijambo ry'ukuri ni: <span>{asnwer}</span></p>
		{/if}

		{#if playAgain || asnwer}
			<button
				onclick={async () => {
					await getAnotherWord();
					keyboard.readyToPlayAgain = false;

					invalidate('data:guesses');
					getAnswer().refresh();
				}}
			>
				Ongera ukine
			</button>
		{/if}
	</div>

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

	p {
		text-align: center;
		margin-block: 1rem 0.65rem;

		span {
			text-decoration: underline;
			font-weight: 500;
			text-transform: uppercase;
		}
	}

	button {
		--bg-color: oklch(29.803% 0.09196 256.819);
		display: block;
		margin-inline: auto;
		margin-block-start: 1.35rem;
		padding: 0.5rem 0.75rem;
		cursor: pointer;
		border: none;
		font-size: 1.2rem;
		font-weight: 500;
		background-color: var(--bg-color);
		color: white;
		border-radius: 0.35rem;

		p + & {
			margin-block-start: 0;
		}

		@media (hover: hover) {
			&:hover {
				background-color: oklch(from var(--bg-color) calc(l * 1.3) c h);
			}
		}
	}
</style>
