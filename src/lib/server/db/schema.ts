import { index, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const session = sqliteTable('session', {
	id: text('id')
		.primaryKey()
		.$default(() => crypto.randomUUID()),
	solution: text('solution').notNull()
});

export const guess = sqliteTable(
	'guess',
	{
		id: text('id')
			.primaryKey()
			.$default(() => crypto.randomUUID()),
		value: text('value').notNull(),
		tileColors: text('tile_colors').notNull(),
		sessionId: text('session_id')
			.notNull()
			.references(() => session.id, { onDelete: 'cascade' })
	},
	(guess) => [index('guess_sessionId_idx').on(guess.sessionId)]
);
