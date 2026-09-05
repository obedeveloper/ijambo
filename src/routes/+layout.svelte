<script lang="ts">
	import '../app.css';
	import favicon from '#lib/assets/favicon.svg';
	import { TITLE, DESC } from '#lib/site-config.ts';
	import Toast from '#lib/Toast.svelte';
	import { Notifications, setNotificationsContext } from '#lib/notifications.svelte.ts';
	import { setKeyboardContext, Keyboard } from '#lib/keyboard.svelte.ts';

	const { children } = $props();
	const notifications = setNotificationsContext(new Notifications());
	setKeyboardContext(new Keyboard(notifications));
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div>
	<header>
		<h1>{TITLE}</h1>
	</header>

	<main>
		{@render children()}
	</main>

	<footer>
		&copy; {new Date().getFullYear()}
		{TITLE} - {DESC}
	</footer>
</div>

<Toast></Toast>

<style>
	div {
		min-height: 100svh;
		display: grid;
		grid-template-rows: auto 1fr auto;
	}

	header {
		border-block-end: 1px solid black;
		position: sticky;
		top: 0;
		background-color: oklch(from white l c h / 85%);
		backdrop-filter: blur(2px);
		margin-block-end: 1rem;
	}

	h1,
	footer {
		text-align: center;
		margin-block: 0.25lh;
	}

	footer {
		border-block-start: 1px solid black;
		margin-block: 1rem;
		padding-block-start: 0.5rem;
	}
</style>
