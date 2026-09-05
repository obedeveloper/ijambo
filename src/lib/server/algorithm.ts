type TileColor = 'blue' | 'yellow' | 'red';

interface Params {
	answer: string;
	guess: string;
}

export function evaluateGuess({ answer, guess }: Params): TileColor[] {
	const result: TileColor[] = Array(5).fill('red');
	const remainingAnswer = answer.toUpperCase().split('');
	const normalizedGuess = guess.toUpperCase();

	for (let i = 0; i < 5; i++) {
		if (normalizedGuess[i] === remainingAnswer[i]) {
			result[i] = 'blue';
			remainingAnswer[i] = '';
		}
	}

	for (let i = 0; i < 5; i++) {
		if (result[i] === 'blue') {
			continue;
		}

		const letter = normalizedGuess[i];
		const index = remainingAnswer.indexOf(letter);

		if (index !== -1) {
			result[i] = 'yellow';
			remainingAnswer[index] = '';
		}
	}

	return result;
}
