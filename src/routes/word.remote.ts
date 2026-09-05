import { evaluateGuess } from '#lib/server/algorithm.ts';
import { db } from '#lib/server/db/index.ts';
import { guess, session } from '#lib/server/db/schema.ts';
import { countGuesses, getSessionId } from '#lib/server/utilities.ts';
import { command, query } from '$app/server';
import { eq } from 'drizzle-orm';
import * as v from 'valibot';

export const getGuesses = query(async () => {
	const sessionId = getSessionId();

	const { value, tileColors } = guess;
	const guesses = await db
		.select({ value, tileColors })
		.from(guess)
		.where(eq(guess.sessionId, +sessionId));

	return guesses;
});

export const submit = command(v.string(), async (value) => {
	const sessionId = getSessionId();
	if ((await countGuesses()) >= 6) return;

	const [{ answer }] = await db
		.select({ answer: session.solution })
		.from(session)
		.where(eq(session.id, +sessionId));

	const tileColors = evaluateGuess({ answer, guess: value }).join('-');
	await db.insert(guess).values({ sessionId: +sessionId, tileColors, value });

	getGuesses().refresh();
});
