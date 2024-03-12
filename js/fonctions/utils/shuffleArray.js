const shuffleArray = (array) => {
	const newArray = [...array];
	for (let i = newArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		let tempo = newArray[i];
		newArray[i] = newArray[j];
		newArray[j] = tempo;
		// ou en destructuring :  // [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
	}
	return newArray;
};
export default shuffleArray;