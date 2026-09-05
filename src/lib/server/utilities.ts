import { getRequestEvent } from '$app/server';
import { count, eq } from 'drizzle-orm';
import { db } from './db';
import { guess, session } from './db/schema';
import words from '#lib/server/word-list.txt?raw';

const COOKIE_KEY = 'session_id';

export async function countGuesses() {
	const sessionId = getSessionId();
	if (!sessionId) return;

	const counts = await db
		.select({ count: count() })
		.from(guess)
		.where(eq(guess.sessionId, +sessionId));

	return counts[0].count;
}

export async function setSessionId() {
	if (getSessionId()) return;

	const solution = getRandomWord();
	const sessionIds = await db.insert(session).values({ solution }).returning({ id: session.id });

	getRequestEvent().cookies.set(COOKIE_KEY, sessionIds[0].id.toString(), {});
}

export function getSessionId() {
	return getRequestEvent().cookies.get(COOKIE_KEY);
}

function getRandomWord() {
	const wordsArray = words.split('\n');
	const size = wordsArray.length;
	const index = Math.floor(Math.random() * size);

	return wordsArray[index];
}
