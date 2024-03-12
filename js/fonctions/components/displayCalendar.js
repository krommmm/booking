const displayCalendar = (year, mois, date, day, newYear) => {
	const joursSemaine = [
		'Lun.',
		'Mar.',
		'Mer.',
		'Jeu.',
		'Ven.',
		'Sam.',
		'Dim.',
	];

	const joursDansLeMois = newYear.donnée[0].month[0][mois];

	const premierJourDuMois = day; // 2 soit mercredi
	const nbLignes = 6;
	let cpt = 0;
	let cpt2 = 1;

	let container = document.createElement('div');
	container.className = 'container';


	let divPara = document.createElement('div');
	divPara.className = 'divPara';
	let para = document.createElement('p');
	let para2 = document.createElement('p');

	para.className = 'paraMonth';
	para2.className = 'paraYear';
	let paraNode = document.createTextNode(`${mois}`);
	let paraNode2 = document.createTextNode(` ${year}`);
	para.appendChild(paraNode);
	para2.appendChild(paraNode2);
	divPara.appendChild(para);
	divPara.appendChild(para2);
	container.appendChild(divPara);

	let table = document.createElement('table');
	let thead = document.createElement('thead');
	let tr = document.createElement('tr');
	for (let i = 0; i < joursSemaine.length; i++) {
		let th = document.createElement('th');
		let thNode = document.createTextNode(`${joursSemaine[i]}`);
		th.appendChild(thNode);
		tr.appendChild(th);
	}

	thead.appendChild(tr);
	table.appendChild(thead);

	for (let i = 0; i < nbLignes; i++) {
		let tr = document.createElement('tr');
		for (let j = 0; j < joursSemaine.length; j++) {
			let td = document.createElement('td');

			let tdNode;
			if (cpt < premierJourDuMois || cpt2 > joursDansLeMois) {
				tdNode = document.createTextNode(``);
			} else {
				tdNode = document.createTextNode(`${cpt2}`);
				td.className = 'joursSemaine';
				cpt2++;
			}
			cpt++;

			td.appendChild(tdNode);
			tr.appendChild(td);
		}

		table.appendChild(tr);
		container.appendChild(table);
	}
	return container;
};
export default displayCalendar;
