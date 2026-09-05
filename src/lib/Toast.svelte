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
			font-size: 1.1rem;
			font-weight: 500;
			padding: 0.5rem 0.75rem;
			border-radius: 0.35rem;
			background-color: white;
			min-height: 50px;
			border: 2.5px solid oklch(from var(--color) 40% 50% h);
			border-inline-start-width: 7.5px;
		}
	}
</style>
