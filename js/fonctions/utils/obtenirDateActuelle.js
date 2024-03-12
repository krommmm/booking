const obtenirDateActuelle = () => {
	let date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth()+1;
	let numeroDay = date.getDate();
	return [numeroDay,month,year];
}
export default obtenirDateActuelle;