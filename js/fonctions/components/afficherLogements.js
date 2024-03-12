const afficherLogements = (array, isSearched) => {
	let logements = [...array];
	let total = '';

	if (!isSearched) {
		for (let i = 0; i < logements.length; i++) {
			total += `
     
    	<article>
		<img class="logements_img blur" src="../images/${logements[i].imageUrl}.jpg" alt="" />
		<p class="titre">${logements[i].name}</p>
		<p class="type">${logements[i].type}</p>
		<p class="prix"><span class="gras">${logements[i].prix} €</span>&nbsp;par nuit</p>
		</article>
	
        `;
		}
		document.querySelector('.photo_zone').innerHTML = total;
	} else {
		for (let i = 0; i < logements.length; i++) {
			total += `
			<a href="../html/focus.html?id=${logements[i].id}">
    	<article>
		<img class="logements_img" src="../images/${logements[i].imageUrl}.jpg" alt="" />
		<p class="titre">${logements[i].name}</p>
		<p class="type">${logements[i].type}</p>
		<p class="prix"><span class="gras">${logements[i].prix} €</span>&nbsp;par nuit</p>
		</article>
		</a>
        `;
		}
		document.querySelector('.photo_zone').innerHTML = total;
	}
};

export default afficherLogements;
