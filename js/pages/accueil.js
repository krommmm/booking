import afficherLogements from "../fonctions/components/afficherLogements";
import logements from "../data/logements";

const accueil = () => {
	let isSearched = false;

	let localStorageLogements = JSON.parse(localStorage.getItem('logements'));
	if (localStorageLogements === undefined || localStorageLogements === null) {
		localStorage.setItem('logements', JSON.stringify(logements));
	}

    afficherLogements(logements, isSearched);
};
export default accueil;
