import { setSessionId } from '#lib/server/utilities.js';

// In future try to replace async/await with .then()

export const load = async () => {
	await setSessionId();
};
