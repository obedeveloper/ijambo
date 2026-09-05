import { evaluateGuess } from '#lib/server/algorithm.ts';
import { db } from '#lib/server/db/index.ts';
import { guess, session } from '#lib/server/db/schema.ts';
import {
	countGuesses,
	deleteSessionId,
	requireSessionId,
	wordList
} from '#lib/server/utilities.ts';
import { command } from '$app/server';
import { eq } from 'drizzle-orm';
import * as v from 'valibot';

export const submit = command(v.pipe(v.string(), v.length(5)), async (value) => {
	const sessionId = await requireSessionId();
	if ((await countGuesses()) >= 6) return;
	if (!wordList.includes(value.toLowerCase())) return;

	try {
		const [{ answer }] = await db
			.select({ answer: session.solution })
			.from(session)
			.where(eq(session.id, sessionId));

		const tileColors = evaluateGuess({ answer, guess: value }).join('-');
		await db.insert(guess).values({ sessionId, tileColors, value: value.toLowerCase() });
	} catch {
		deleteSessionId();
	}
});
