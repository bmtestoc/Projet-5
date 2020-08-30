/* 
 * Convertit le prix fourni en euros + centimes
 * @param {int} price
 * @returns string
 */
function convertPrice(price) {
    if (Number.isInteger(price)) {
        var prix = price.toString();
        var centimes = prix.slice(-2);
        prix = prix.substr(0, prix.length - 2);
        var convertedPrice = prix + "," + centimes;
        return convertedPrice;
    }
    return 0;
}

/* 
 * Fermeture des fenêtres d'information 
 */
function closeModal() {
    if (document.getElementById("containerModal") === null) {
        return false;
    }
    document.getElementById("containerModal").style.display = "none";
    return true;
}
/* 
 * Ouverture et affichage de texte des fenêtres d'information 
 */
function openModal(texte) {
    if (document.getElementById("containerModal") === null) {
        return false;
    }
    document.getElementById("texteModal").innerHTML = texte;
    document.getElementById("containerModal").style.display = "block";
    return true;
}
