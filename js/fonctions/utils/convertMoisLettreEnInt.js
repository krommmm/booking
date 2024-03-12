const convertMoisLettreEnInt = (newYear, month) => {
    let monthTab = Object.keys(newYear.donnée[0].month[0]);

    for (let i = 0; i < monthTab.length; i++) {
        if (monthTab[i] === month) {
            return i + 1;
        }
    }
};
export default convertMoisLettreEnInt;