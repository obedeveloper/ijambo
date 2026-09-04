import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const session = sqliteTable('session', {
	id: integer('id').primaryKey(),
	solution: text('solution').notNull()
});

export const guess = sqliteTable(
	'guess',
	{
		id: integer('id').primaryKey(),
		value: text('value').notNull(),
		tileColors: text('tile_colors').notNull(),
		sessionId: integer('session_id')
			.notNull()
			.references(() => session.id, { onDelete: 'cascade' })
	},
	(guess) => [index('guess_sessionId_idx').on(guess.sessionId)]
);
