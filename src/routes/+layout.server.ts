import { requireSessionId } from '#lib/server/utilities.ts';
import { guess } from '#lib/server/db/schema.ts';
import { db } from '#lib/server/db/index.ts';
import { eq } from 'drizzle-orm';

export const load = async ({ depends }) => {
	depends('data:guesses');
	const sessionId = await requireSessionId();

	const { value, tileColors } = guess;
	const guesses = await db
		.select({ value, tileColors })
		.from(guess)
		.where(eq(guess.sessionId, sessionId));

	return { guesses };
};
