import { db } from '#lib/server/db/index.ts';
import { session } from '#lib/server/db/schema.ts';
import words from '#lib/server/word-list.txt?raw';

// In future try to replace async/await with .then()

export const load = async ({ cookies }) => {
	if (cookies.get('session_id')) return;

	const solution = getRandomWord();
	const sessionIds = await db.insert(session).values({ solution }).returning({ id: session.id });

	cookies.set('session_id', sessionIds[0].id.toString(), {});
};

function getRandomWord() {
	const wordsArray = words.split('\n');
	const size = wordsArray.length;
	const index = Math.floor(Math.random() * size);

	return wordsArray[index];
}
