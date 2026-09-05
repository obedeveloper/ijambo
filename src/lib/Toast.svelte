<script lang="ts">
	import { getNotificationsContext } from './notifications.svelte';

	const notifications = $derived(getNotificationsContext().value);
</script>

<div class="toast">
	{#each notifications as { id, title, color } (id)}
		<div style:--color={color}>{title}</div>
	{/each}
</div>

<style>
	.toast {
		width: min(85%, 400px);
		max-height: 35svh;
		position: fixed;
		top: 2rem;
		inset-inline: 50%;
		transform: translateX(-50%);
		overflow: auto;
		display: grid;
		gap: 0.5rem;

		div {
			color: white;
			padding: 0.5rem 0.75rem;
			border-radius: 0.5rem;
			background-color: oklch(from var(--color) 40% 50% h / 90%);
			backdrop-filter: blur(4px);
		}
	}
</style>
