const turnLeft = (cpt) => {
	if(cpt<=0){
		return cpt;
	}
	cpt--;

		let largeur = -800;
		document.getElementById(
			'diapo_container'
		).style.transform = `translateX(${largeur * cpt}px)`;
	
	return cpt;
};
export default turnLeft;