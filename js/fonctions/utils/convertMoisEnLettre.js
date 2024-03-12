const convertMoisEnLettre = (newYear,month) => {
	let lesMoisObject = newYear.donnée[0].month[0]; // [janvier : 31]
	let lesMoisArray = Object.keys(lesMoisObject);
	return lesMoisArray[month - 1];
};
export default convertMoisEnLettre;