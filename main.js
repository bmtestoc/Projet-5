/* 
 * Convertit le prix fourni en euros + centimes
 * @param {int} price
 * @returns string
 */
function convertPrice(price) {
    if(Number.isInteger(price)) {
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
    if(document.getElementById("containerModal") === null) {
        return false;
    }
    document.getElementById("containerModal").style.display = "none";
    return true;
}
///* 
// * Ouverture et affichage de texte des fenêtres d'information 
// */
function openModal(texte) {
    
    if(document.getElementById("containerModal") === null) {
        return false;
    }
    
    document.getElementById("texteModal").innerHTML = texte;
    document.getElementById("containerModal").style.display = "block";
    return true;
}

///**
// * Convertit un integer en chaine de caractères 
// * et ajoute une virgule avant les deux derniers caractères
// * @param {int} price
// * @returns string
// * @author BMO 20200821 
// */
//function convertPrice(price) {
//    if(Number.isInteger(price)) {
//        var prix = price.toString();
//        if(prix.length < 3) {
//            //si la chaine fait moins de 3 caractères, on ajoute des zéros devant (ou derrière?)
//            //prix = prix.padStart(3, '0');     //si 1 => 0,01
//            prix = prix.padEnd(3, '0');         //si 1 => 1,00
//        }
//        var centimes = prix.slice(-2);
//        prix = prix.substr(0, prix.length - 2);
//        var convertedPrice = prix + "," + centimes;
//        return convertedPrice;
//    }
//    return 0;
//}
//
///**
// * Cache le div id containerModal
// * S'il n'existe pas, renvoie false
// * S'il existe, on le cache et on renvoie true
// * @returns bool
// * @author BMO 20200821
// */
//function closeModal() {
//    //si le containerModal n'existe pas
//    if(document.getElementById("containerModal") === null) {
//        //on renvoie false
//        return false;
//    }
//    document.getElementById("containerModal").style.display = "none";
//    return true;
//}
//
///**
// * Affiche le div id containerModal
// * et le texte passé en paramètre dans le div enfant texteModal
// * @param {string} texte 
// * @returns bool
// * @author BMO 20200821
// */
//function openModal(texte) {
//    //si le containerModal n'existe pas
//    if(document.getElementById("containerModal") === null) {
//        //on renvoie false
//        return false;
//    }
//
//    //si texte est null ou si c'est une chaine vide
//    texte = texte.trim(); //supprime les espaces à gauche et à droite, permet de tester si texte = ' ' par exemple
//    if(texte === null || texte === '') {
//        //on renvoie false, car pas besoin d'ouvrir la modale
//        return false;
//    }
//    document.getElementById("texteModal").innerHTML = texte;
//    document.getElementById("containerModal").style.display = "block";
//    return true;
//}