import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	DATABASE_URL: { description: 'The database connection string.' },
	DATABASE_AUTH_TOKEN: {
		description: 'Auth token for the [Turso](https://turso.tech) database.'
	}
});
