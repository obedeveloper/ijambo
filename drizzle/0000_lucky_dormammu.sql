CREATE TABLE `guess` (
	`id` integer PRIMARY KEY NOT NULL,
	`value` text NOT NULL,
	`tile_colors` text NOT NULL,
	`session_id` integer NOT NULL,
	FOREIGN KEY (`session_id`) REFERENCES `session`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `guess_sessionId_idx` ON `guess` (`session_id`);--> statement-breakpoint
CREATE TABLE `session` (
	`id` integer PRIMARY KEY NOT NULL,
	`solution` text NOT NULL
);
