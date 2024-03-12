const turnRight = (cpt,nombreDeMois) => {
	cpt++;
	if(cpt===(nombreDeMois/2)){
		return cpt-1;
	}

	let largeur = -800;
	document.getElementById('diapo_container').style.transform = `translateX(${
		largeur * cpt
	}px)`;

	return cpt;
};
export default turnRight;