import { createContext } from 'svelte';

interface SingleNotification {
	id: string;
	title: string;
	color: string;
}

export class Notifications {
	readonly value: SingleNotification[] = $state([]);
	private size = $derived(this.value.length);

	push(notification: { title: string; color: string }) {
		this.value.push({
			...notification,
			id: crypto.randomUUID(),
			color: notification.color ?? 'black'
		});

		setTimeout(() => {
			this.value.splice(this.size - 1, 1);
		}, 3e3);
	}
}

export const [getNotificationsContext, setNotificationsContext] = createContext<Notifications>();
