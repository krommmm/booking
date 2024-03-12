import comparaisonDate from '../utils/comparaisonDate';

// On reçoit les startTime et endTime précédent + la date(date/month/year) du event.target
const reglageAgenda = (
	isDepart,
	event,
	startTime,
	endTime,
	classDepart,
	classArrivee,
	date,
	month,
	year
) => {
	let ancienneDate;
	if (isDepart) {
		ancienneDate = startTime; // au cas où il y ai une erreur
		// la date cliqué remplace la variable startTime
		startTime = [date, month, year];
	} else {
		ancienneDate = endTime; // au cas où il y ai une erreur
		endTime = [date, month, year];
	}

	// Comparaison des 2 dates
	let isDepartBeforeArrivee = false;

	isDepartBeforeArrivee = comparaisonDate(startTime, endTime);
	if (!isDepartBeforeArrivee && isDepart) {
		startTime = ancienneDate;
	}
	if (!isDepartBeforeArrivee && !isDepart) {
		endTime = ancienneDate;
	}
	if (isDepartBeforeArrivee) {
		document.querySelectorAll('td').forEach((td) => {
			td.classList.remove(classDepart);
		});
		event.target.classList.add(classDepart);
	}

	//Affiche rechercher en vert si l'utilisateur a finit de choisir
	let tds = document.getElementsByTagName('td');
	if (
		Array.from(tds).some((td) => td.classList.contains(classArrivee)) &&
		Array.from(tds).some((td) => td.classList.contains(classDepart))
	) {
		document.querySelector('.search').style.backgroundColor = 'green';
	} else {
		document.querySelector('.search').style.backgroundColor =
			'rgb(9, 1, 109)';
	}
	if (isDepart) {
		return startTime;
	} else {
		return endTime;
	}
};

export default reglageAgenda;
