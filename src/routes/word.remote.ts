import { evaluateGuess } from '#lib/server/algorithm.ts';
import { db } from '#lib/server/db/index.ts';
import { guess, session } from '#lib/server/db/schema.ts';
import { countGuesses, getRandomWord, requireSessionId, wordList } from '#lib/server/utilities.ts';
import { command } from '$app/server';
import { eq } from 'drizzle-orm';
import * as v from 'valibot';

export const submit = command(v.pipe(v.string(), v.length(5)), async (value) => {
	const sessionId = await requireSessionId();
	if ((await countGuesses()) >= 6) return;
	if (!wordList.includes(value.toLowerCase())) {
		return { status: 'Failed', reason: 'Ntabwo riri mu magambo dufite!' } as const;
	}

	const [{ answer }] = await db
		.select({ answer: session.solution })
		.from(session)
		.where(eq(session.id, sessionId));

	const tileColors = evaluateGuess({ answer, guess: value }).join('-');
	await db.insert(guess).values({ sessionId, tileColors, value: value.toLowerCase() });

	if (tileColors.split('-').every((color) => color == 'blue')) {
		return { status: 'Success' } as const;
	}
});

export const getAnotherWord = command(async () => {
	const sessionId = await requireSessionId();

	await db.update(session).set({ solution: getRandomWord() }).where(eq(session.id, sessionId));
	await db.delete(guess).where(eq(guess.sessionId, sessionId));
});
