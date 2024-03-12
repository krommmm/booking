const afficherLogementFocus = (logements, id,startTime,endTime) => {
	let array = [...logements];

const calculNbJoursEntre2Dates = (startTime,endTime) => {
    let date1 = new Date(startTime[2],startTime[1]-1,startTime[0]);  //année, mois, jour
    let date2 = new Date(endTime[2],endTime[1]-1,endTime[0]);

    let nbJours = date2-date1;
    nbJours = nbJours/(1000 * 60 * 60 * 24);
    return nbJours;
}

let nbJours = calculNbJoursEntre2Dates(startTime,endTime);


    //calcul du nombre de jours

	let logement = array.filter((item) => item.id === id);
    let total = Math.floor(logement[0].prix)*Math.floor(nbJours)
    let totalTaxed = total + 10;
	let rendu = `
  <div class="container_principal">
  <p class="title">${logement[0].name}</p>
  <img src="../images/${logement[0].imageUrl}.jpg" alt="" />
  <p class="description_title">Description:</p>
  <p class="description">${logement[0].description}</p>
  <p class="nbVoyageurs">${logement[0].voyageurs} voyageurs max</p>
</div>
<div class="fiche_focus">
  <div class="title">
      <p>
          <span class="prix">${logement[0].prix}</span>&nbsp;<span class="money"
              >€</span
          >
          par nuit
      </p>
  </div>
  <div class="carré">
      <div class="carré_when">
          <div class="arrivee">
              <p>Arrivée</p>
              <p>${startTime[0]}/${startTime[1]}/${startTime[2]}</p>
          </div>
          <div class="depart">
              <p>Départ</p>
              <p>${endTime[0]}/${endTime[1]}/${endTime[2]}</p>
          </div>
      </div>
      <div class="voyageurs">
          <p>Voyageurs</p>
          <p>1 voyageur</p>
      </div>
  </div>
  <button id="btn-louer" class="btn">Louer</button>
  <div class="calculs">
      <div class="nuits">
          <p>${Math.floor(logement[0].prix)} x ${Math.floor(nbJours)} nuits:</p>
          <p>&nbsp;${Math.floor(logement[0].prix)*Math.floor(nbJours)} €</p>
      </div>
      <div class="frais">
          <div class="frais_booking">
              <p>Frais de service booking</p>
              <p>10 €</p>
          </div>
      </div>
      <div class="total">
          <p>Total: </p>
          <p>&nbsp; ${totalTaxed} €</p>
      </div>
  </div>
</div>
  `;

	document.querySelector('.focus').innerHTML = rendu;
	// iteration sur l'array pour afficher les keys
};
export default afficherLogementFocus;
