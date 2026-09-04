import { evaluateGuess } from '#lib/server/algorithm.ts';
import { db } from '#lib/server/db/index.ts';
import { guess, session } from '#lib/server/db/schema.ts';
import { command, getRequestEvent, query } from '$app/server';
import { eq } from 'drizzle-orm';
import * as v from 'valibot';
import { count } from 'drizzle-orm';

export const getGuesses = query(async () => {
	const sessionId = getSessionId();
	if (!sessionId) return;

	const { value, tileColors } = guess;
	const guesses = await db
		.select({ value, tileColors })
		.from(guess)
		.where(eq(guess.sessionId, +sessionId));

	return guesses;
});

export const submit = command(v.string(), async (value) => {
	const sessionId = getSessionId();
	if (!sessionId) return;
	if ((await countGuesses(+sessionId)) >= 6) return;

	const answers = await db
		.select({ answer: session.solution })
		.from(session)
		.where(eq(session.id, +sessionId));

	const tileColors = evaluateGuess({ answer: answers[0].answer, guess: value }).join('-');
	await db.insert(guess).values({ sessionId: +sessionId, tileColors, value });

	getGuesses().refresh();
});

async function countGuesses(sessionId: number) {
	const counts = await db
		.select({ count: count() })
		.from(guess)
		.where(eq(guess.sessionId, sessionId));

	return counts[0].count;
}

function getSessionId() {
	return getRequestEvent().cookies.get('session_id');
}
