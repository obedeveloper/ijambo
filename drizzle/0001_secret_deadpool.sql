PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_guess` (
	`id` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL,
	`tile_colors` text NOT NULL,
	`session_id` text NOT NULL,
	FOREIGN KEY (`session_id`) REFERENCES `session`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_guess`("id", "value", "tile_colors", "session_id") SELECT "id", "value", "tile_colors", "session_id" FROM `guess`;--> statement-breakpoint
DROP TABLE `guess`;--> statement-breakpoint
ALTER TABLE `__new_guess` RENAME TO `guess`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `guess_sessionId_idx` ON `guess` (`session_id`);--> statement-breakpoint
CREATE TABLE `__new_session` (
	`id` text PRIMARY KEY NOT NULL,
	`solution` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_session`("id", "solution") SELECT "id", "solution" FROM `session`;--> statement-breakpoint
DROP TABLE `session`;--> statement-breakpoint
ALTER TABLE `__new_session` RENAME TO `session`;