import getUrl from "../fonctions/utils/getUrl";
import afficherLogementFocus from "../fonctions/components/afficherLogementFocus";

const focus = (startTime,endTime,logements) => {
	let id = getUrl();
	let objectDate = JSON.parse(localStorage.getItem('date'));
	startTime = objectDate.start;
	endTime = objectDate.end;
	afficherLogementFocus(logements, id, startTime, endTime);
	document.addEventListener('click', (event) => {
		if (event.target.id === 'btn-louer') {
			if (JSON.stringify(startTime) === JSON.stringify([0, 0, 0])) {
				alert('choisir une date de départ');
				return;
			}
			if (JSON.stringify(endTime) == JSON.stringify([32, 13, 3000])) {
				alert("Choisir une date d'arrivée");
				return;
			}
			let localStorageLogements = JSON.parse(
				localStorage.getItem('logements')
			);
			for (let i = 0; i < localStorageLogements.length; i++) {
				if (localStorageLogements[i].id === id) {
					localStorageLogements[i].reservation.push({
						arrivee: [
							{
								date: startTime[0],
								month: startTime[1],
								year: startTime[2],
							},
						],
						depart: [
							{
								date: endTime[0],
								month: endTime[1],
								year: endTime[2],
							},
						],
					});
					startTime = [0, 0, 0];
					endTime = [32, 13, 3000];
					window.location.href = '../index.html';
				}
			}
			localStorage.setItem(
				'logements',
				JSON.stringify(localStorageLogements)
			);
		}
	});
};
export default focus;
