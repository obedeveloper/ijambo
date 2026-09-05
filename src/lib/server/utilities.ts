import { getRequestEvent } from '$app/server';
import { count as countFn, eq } from 'drizzle-orm';
import { db } from './db';
import { guess, session } from './db/schema';
import words from '#lib/server/word-list.txt?raw';

const COOKIE_KEY = 'session_id';
export const wordList = words.split('\n');

export async function countGuesses() {
	const sessionId = await requireSessionId();
	const [{ count }] = await db
		.select({ count: countFn() })
		.from(guess)
		.where(eq(guess.sessionId, sessionId));

	return count;
}

export async function requireSessionId() {
	const localId = getRequestEvent().cookies.get(COOKIE_KEY);

	if (!localId) {
		return await setSessionId();
	}

	try {
		const [{ id }] = await db
			.select({ id: session.id })
			.from(session)
			.where(eq(session.id, localId));

		return id;
	} catch {
		return await setSessionId();
	}
}

async function setSessionId() {
	const solution = getRandomWord();
	const [{ id }] = await db.insert(session).values({ solution }).returning({ id: session.id });

	getRequestEvent().cookies.set(COOKIE_KEY, id, { path: '/', maxAge: 60 * 60 * 24 * 7 });
	return id;
}

export function getRandomWord() {
	const size = wordList.length;
	const index = Math.floor(Math.random() * size);

	return wordList[index];
}
