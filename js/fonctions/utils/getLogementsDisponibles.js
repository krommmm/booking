const getLogementsDisponibles = (logements, start, end) => {
	let logementsDisponibles = [];

	function checkConflict(reservation, start, end) {
		for (const slot of reservation) {
			const arriveeDate = new Date(
				slot.arrivee[0].year,
				slot.arrivee[0].month - 1,
				slot.arrivee[0].date
			);
			const departDate = new Date(
				slot.depart[0].year,
				slot.depart[0].month - 1,
				slot.depart[0].date
			);

			const startDate = new Date(start[2], start[1] - 1, start[0]);
			const endDate = new Date(end[2], end[1] - 1, end[0]);

			if (!(departDate <= startDate || arriveeDate >= endDate)) {
				return true; // Conflict found
			}
		}
		return false; // No conflict
	}

	for (let i = 0; i < logements.length; i++) {
		let isConflit = checkConflict(logements[i].reservation, start, end);
		if (!isConflit) {
			logementsDisponibles.push(logements[i]);
		}
	}

    return logementsDisponibles;
};
export default getLogementsDisponibles;
