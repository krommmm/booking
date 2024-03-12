// IMPORTATIONS
import afficherLogements from './fonctions/components/afficherLogements';
import obtenirDateActuelle from './fonctions/utils/obtenirDateActuelle';
import Year from './class/year';
import displayCalendar from './fonctions/components/displayCalendar';
import convertMoisEnLettre from './fonctions/utils/convertMoisEnLettre';
import turnLeft from './fonctions/components/turnLeft';
import turnRight from './fonctions/components/turnRight';
import convertMoisLettreEnInt from './fonctions/utils/convertMoisLettreEnInt';
import reglageAgenda from './fonctions/components/reglageAgenda';

import logements from './data/logements';
import getLogementsDisponibles from './fonctions/utils/getLogementsDisponibles';
import getPageName from '../js/fonctions/utils/getPageName';
import accueil from './pages/accueil';
import focus from './pages/focus';

// VARIABLES GLOBALES
let isSearched = false;
//Transfert des logements dans le localStorage si le localStorage est vide
let localStorageLogements = JSON.parse(localStorage.getItem('logements'));
if (localStorageLogements === undefined || localStorageLogements === null) {
	localStorage.setItem('logements', JSON.stringify(logements));
}
let depart = true;
let arrivee = false;
let startTime = [0, 0, 0]; // date-month-year
let endTime = [32, 13, 3000];

// ROUTAGE
let pageName = getPageName();
switch (pageName) {
	case 'index':
		accueil();
		break;
	case '':
		accueil();
		break;
	case 'focus':
		focus(startTime, endTime, logements);
		break;
	default:
		console.error('Page introuvable');
}

// OBTENTION DE LA DATE
let dateActuelle = obtenirDateActuelle();
let year = dateActuelle[2]; //int
let month = dateActuelle[1]; //int
let date = dateActuelle[0]; //int

// CREATION NOUVELLE ANNEE
let newYear = new Year(year, month, date);
let annéeDuDébut = year;

// CREATION DU CONTAINER POUR METTRE TOUS LES DIAPOS DEDANS
let diapoContainer = document.createElement('div');
diapoContainer.id = 'diapo_container';

// CREATION DU CALENDRIER
let total = '';
for (let i = annéeDuDébut; i < annéeDuDébut + 3; i++) {
	let newYear = new Year(i, month, date);

	let isBisextil = newYear.isThisYearBisextil();
	newYear.donnée[0].month[0].fevrier = isBisextil ? 29 : 28;

	for (let j = month; j < 13; j++) {
		let moisEnLettre = convertMoisEnLettre(newYear, j);
		let premierJourDuMois = newYear.getDay(newYear.donnée[0].year, j, 1); // 0 = lundi
		let containerTable = displayCalendar(
			newYear.donnée[0].year,
			moisEnLettre,
			date,
			premierJourDuMois,
			newYear
		);
		total += containerTable;
		let div1 = document.createElement('div');
		div1.className = 'mois';
		div1.appendChild(containerTable);
		diapoContainer.appendChild(div1);
	}
	month = 1;
}
document.querySelector('.modal_content').appendChild(diapoContainer);

/*---------- GESTION DES CLICKS-------------*/
// AFFICHER OU CACHER LE CALENDRIER
document.addEventListener('click', (event) => {
	if (event.target.id === 'btn-calendar') {
		let modal = document.querySelector('.modal');
		document.querySelector('.calendar').classList.add('bottom');
		modal.classList[1] === 'hidden'
			? modal.classList.remove('hidden')
			: modal.classList.add('hidden');
	}
});

let cpt = 0;
let nombreDeMois = diapoContainer.childElementCount;
// TOURNER A GAUCHE
document.addEventListener('click', (event) => {
	if (event.target.classList.contains('fa-angles-left')) {
		cpt = turnLeft(cpt);
	}
});

// TOURNER A DROITE
document.addEventListener('click', (event) => {
	if (event.target.classList.contains('fa-angles-right')) {
		cpt = turnRight(cpt, nombreDeMois);
	}
});

// RECHERCHE DANS LE CALENDRIER SELON PLAGE
document.addEventListener('click', (event) => {
	if (event.target.classList.contains('joursSemaine')) {
		let container = event.target.closest('table').parentElement;
		let date = parseInt(event.target.textContent); // ex : 1 2 3
		let year = parseInt(container.querySelector('.paraYear').textContent);
		let month = container.querySelector('.paraMonth').textContent;
		month = convertMoisLettreEnInt(newYear, month);

		if (depart) {
			let classDepart = 'choosenOneDepart';
			let classArrivee = 'choosenOneArrivee';
			let isDepart = true;
			startTime = reglageAgenda(
				isDepart,
				event,
				startTime,
				endTime,
				classDepart,
				classArrivee,
				date,
				month,
				year
			);
		}
		if (arrivee) {
			let classDepart = 'choosenOneDepart';
			let classArrivee = 'choosenOneArrivee';
			let isDepart = false;
			endTime = reglageAgenda(
				isDepart,
				event,
				startTime,
				endTime,
				classArrivee,
				classDepart,
				date,
				month,
				year
			);
		}
	}
});

// RECHERCHE DEPART
document.addEventListener('click', (event) => {
	if (event.target.classList.contains('start')) {
		depart = !depart;
		arrivee = false;

		document.querySelector('.end').style.backgroundColor = 'rgb(9, 1, 109)';
		let btnStart = document.querySelector('.start');
		depart
			? (btnStart.style.backgroundColor = 'green')
			: (btnStart.style.backgroundColor = 'rgb(9, 1, 109);');
	}
});

// RECHERCHE ARRIVEE
document.addEventListener('click', (event) => {
	if (event.target.classList.contains('end')) {
		arrivee = true;
		depart = false;
		document.querySelector('.start').style.backgroundColor =
			'rgb(9, 1, 109)';

		let btnEnd = document.querySelector('.end');
		arrivee
			? (btnEnd.style.backgroundColor = 'purple')
			: (btnEnd.style.backgroundColor = 'rgb(9, 1, 109)');
	}
});

// RECHERCHE
document.addEventListener('click', (event) => {
	if (event.target.classList.contains('search')) {
		if (JSON.stringify(startTime) === JSON.stringify([0, 0, 0])) {
			alert('choisir une date de départ');
			return;
		}
		if (JSON.stringify(endTime) == JSON.stringify([32, 13, 3000])) {
			alert("Choisir une date d'arrivée");
			return;
		}
		let date = { start: startTime, end: endTime };
		localStorage.setItem('date', JSON.stringify(date));

		isSearched = true;
		let storageContent = JSON.parse(localStorage.getItem('logements'));
		let logementsDisponibles = getLogementsDisponibles(
			storageContent,
			startTime,
			endTime
		);

		// chercher les logements qui sont disponibles
		afficherLogements(logementsDisponibles, isSearched);
		document.querySelector('.modal').classList.add('hidden');
	}
});

document.addEventListener('click', (event) => {
	if (event.target.classList.contains('close-calendar')) {
		document.querySelector('.modal').classList.add('hidden');
	}
});
