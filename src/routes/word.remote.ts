import words from '#lib/server/word-list.txt?raw';
import { query } from '$app/server';

const wordsArray = words.split('\n');

export const getRandomWord = query(() => {
	const size = wordsArray.length;
	const index = Math.floor(Math.random() * size);

	return wordsArray[index];
});
