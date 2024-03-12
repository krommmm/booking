const comparaisonDate = (start, end) => {
	// start/end = [date/month/year]

	if (start[2] == end[2]) {
		if (start[1] < end[1]) {
			return true;
		}

		if (start[1] == end[1]) {
			if (start[0] < end[0]) {
				return true;
			}else{
				console.log("erreur");
			}
		}
	} else if (start[2] < end[2]) {
		return true;
	}else{
		console.log("error");
	}
};
export default comparaisonDate;
