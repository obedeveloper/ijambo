import { invalidate } from '$app/navigation';
import { createContext } from 'svelte';
import { submit } from '../routes/word.remote';
import { Notifications } from './notifications.svelte';

export class Keyboard {
	readonly rows = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];
	userInput = $state('');
	private size = $derived(this.userInput.length);
	private notifications: Notifications;
	readyToPlayAgain = $state(false);

	constructor(notifications: Notifications) {
		this.notifications = notifications;
	}

	onkeydown(e: KeyboardEvent) {
		const key = e.key.toLocaleUpperCase();

		if (key == 'BACKSPACE') return this.ondelete();
		if (key == 'ENTER') return this.onsubmit();
		if (!this.rows.join().includes(key)) return;

		this.oninput(key);
	}

	oninput(key: string) {
		if (this.size >= 5 || this.readyToPlayAgain) return;
		this.userInput += key;
	}

	ondelete() {
		const inputArr = [...this.userInput];
		inputArr.splice(this.size - 1, 1);
		this.userInput = inputArr.join('');
	}

	async onsubmit() {
		const result = await submit(this.userInput);

		if (result?.status == 'Failed') {
			this.notifications.push({ title: result.reason, color: 'orange' });
			return;
		}

		if (result?.status == 'Not found' || result?.status == 'Success') {
			this.readyToPlayAgain = true;
		}

		if (result?.status == 'Success') {
			this.notifications.push({ title: 'Yegoooo!', color: 'blue' });
		}

		this.userInput = '';
		invalidate('data:guesses');
	}
}

export const [getKeyboardContext, setKeyboardContext] = createContext<Keyboard>();
