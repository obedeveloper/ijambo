import { getRequestEvent } from '$app/server';
import { count as countFn, eq } from 'drizzle-orm';
import { db } from './db';
import { guess, session } from './db/schema';
import words from '#lib/server/word-list.txt?raw';

const COOKIE_KEY = 'session_id';

export async function countGuesses() {
	const sessionId = await getSessionId();
	const [{ count }] = await db
		.select({ count: countFn() })
		.from(guess)
		.where(eq(guess.sessionId, sessionId));

	return count;
}

export async function getSessionId() {
	let sessionId = getRequestEvent().cookies.get(COOKIE_KEY);

	if (!sessionId) {
		sessionId = await setSessionId();
	}

	return sessionId;
}

async function setSessionId() {
	const solution = getRandomWord();
	const [{ id }] = await db.insert(session).values({ solution }).returning({ id: session.id });

	getRequestEvent().cookies.set(COOKIE_KEY, id, {});
	return id;
}

function getRandomWord() {
	const wordsArray = words.split('\n');
	const size = wordsArray.length;
	const index = Math.floor(Math.random() * size);

	return wordsArray[index];
}
