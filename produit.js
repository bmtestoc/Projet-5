/*
 * Extraction des paramètres de l'URL. Retourne un tableau.
 */
function extractUrlParams() {
    var t = location.search.substring(1).split('&');
    var f = [];
    for (var i = 0; i < t.length; i++) {
        var x = t[ i ].split('=');
        f[x[0]] = x[1];
    }
    return f;
}
/*
 * Affichage du produit correspondant à l'ID récupéré dans l'URL
 */
var parametresUrl = extractUrlParams();
var produitID = parametresUrl.id;
var request = new XMLHttpRequest();
request.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        var produitRetour = JSON.parse(this.responseText);
        /*
         * Insertion des informations correspondantes au produit
         */
        var prix = convertPrice(produitRetour.price);
        var modele = "<div id='produitInfos' class='col s12' data-id='" + produitRetour._id + "' data-name='" + produitRetour.name + "' data-price='" + produitRetour.price + "' data-photo='" + produitRetour.imageUrl + "'> <img src='" + produitRetour.imageUrl + "'> <h5>" + produitRetour.name + "</h5> <h6>" + prix + " \u20AC" + "</h6> <p>" + produitRetour.description + "</p> </div>";
        document.querySelector('#produit').innerHTML += modele;
        /*
         * Création de la liste déroulante pour le choix de la lentille
         */
        var htmlLentilles = "";
        for (var i = 0; i < produitRetour.lenses.length; i++) {
            htmlLentilles += "<option value='" + produitRetour.lenses[i] + "'>" + produitRetour.lenses[i] + "</option>";
        }
        var listeDeroulante = "<select class='browser-default'>" + htmlLentilles + "</select>";
        document.querySelector('#produit').innerHTML += '<p>Choix de la lentille : </p>' + listeDeroulante;
    }
    ;
};
request.open("GET", "http://localhost:3000/api/cameras/" + produitID);
request.send();
/*
 * Initialisation et création de "quantité"
 */
var quantite = 0;
if (document.querySelector('#quantite') !== null) {
    document.querySelector('#quantite').innerHTML = quantite;
}
/*
 * Ajoute 1 à la quantité à chaque clic sur le logo +
 */
function ajoutPanier() {
    quantite += 1;
    document.querySelector('#quantite').innerHTML = quantite;
}
/*
 * Retire 1 à la quantité à chaque clic sur le logo -
 */
function retraitPanier() {
    if (quantite > 0) {
        quantite -= 1;
        document.querySelector('#quantite').innerHTML = quantite;
    }
}
/*
 * Sauvegarde du panier dans le sessionStorage
 */
function savePanier() {
    let infosPanier = {
        "id": document.querySelector('#produitInfos').dataset.id,
        "name": document.querySelector('#produitInfos').dataset.name,
        "price": document.querySelector('#produitInfos').dataset.price,
        "photo": document.querySelector('#produitInfos').dataset.photo,
        "quantite": quantite
    };
    if (quantite === 0) {
        openModal("Veuillez s\351lectionner une quantit\351");
    } else {
        openModal("Produit ajout\351 \340 votre panier");
        sessionStorage.setItem(document.querySelector('#produitInfos').dataset.id, JSON.stringify(infosPanier));
        var adresse = sessionStorage.getItem("adresse");
        if (adresse === null) {
            adresse = "";
            var tablAdresse = [];
        } else {
            var tablAdresse = adresse.split(',');
        }
        if (tablAdresse.indexOf(document.querySelector('#produitInfos').dataset.id) === -1) {
            tablAdresse.push(document.querySelector('#produitInfos').dataset.id);
            sessionStorage.setItem("adresse", tablAdresse.toString());
        }
    }
}
