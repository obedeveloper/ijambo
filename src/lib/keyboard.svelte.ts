import { invalidate } from '$app/navigation';
import { createContext } from 'svelte';
import { submit } from '../routes/word.remote';

export class Keyboard {
	readonly rows = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];
	userInput = $state('');
	private size = $derived(this.userInput.length);

	onkeydown(e: KeyboardEvent) {
		const key = e.key.toLocaleUpperCase();

		if (key == 'BACKSPACE') return this.ondelete();
		if (key == 'ENTER') return this.onsubmit();
		if (!this.rows.join().includes(key)) return;

		this.oninput(key);
	}

	oninput(key: string) {
		if (this.size >= 5) return;
		this.userInput += key;
	}

	ondelete() {
		const inputArr = [...this.userInput];
		inputArr.splice(this.size - 1, 1);
		this.userInput = inputArr.join('');
	}

	async onsubmit() {
		const result = await submit(this.userInput);

		if (result?.status !== 'Failed') {
			this.userInput = '';
		}

		invalidate('data:guesses');
	}
}

export const [getKeyboardContext, setKeyboardContext] = createContext<Keyboard>();
