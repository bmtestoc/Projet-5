var sessionStorageAdresse = sessionStorage.getItem("adresse");

if (sessionStorageAdresse === null) {
    sessionStorageAdresse = "";
    var adresseTabl = [];
} else {
    var adresseTabl = sessionStorageAdresse.split(',');
}

var montantTotal = 0;
adresseTabl.forEach(function (item) {
    var monProduit = JSON.parse(sessionStorage.getItem(item));
    var montantProduit = monProduit.quantite * monProduit.price;
    var modele = "<div id='panierRecapInfos' class='col s12'> <img src=" + monProduit.photo + "> <p>" + monProduit.name + "</p> <p>" + 'Quantit\u00e9 : ' + monProduit.quantite + "</p> <p>" + 'Prix unitaire : ' + convertPrice(Number.parseInt(monProduit.price)) + " \u20AC" + "</p> <p>" + 'Prix total : ' + convertPrice(montantProduit) + " \u20AC" + "</p> <p>" + '<input + type="button" + onClick="supprPanier(\'' + monProduit.id + '\')" + value="Supprimer du panier" + >' + "</p> </div>";
    document.querySelector('#panierRecap').innerHTML += modele;
    montantTotal = montantTotal + montantProduit;
});
var total = "<div> <h5>" + "Montant des produits : " + convertPrice(montantTotal) + " \u20AC" + "</h5> </div>";
if(document.querySelector('#quantite') !== null) {
    document.querySelector('#quantite').innerHTML = total;
}

var quantiteTotale = 0;
var totalAvecLivraison = 0;
adresseTabl.forEach(function (item) {
    var quantites = JSON.parse(sessionStorage.getItem(item));
    quantiteTotale = quantiteTotale + quantites.quantite;
    if (quantiteTotale === 1) {
        fraisLivraison = 800;
    } else if (quantiteTotale === 2) {
        fraisLivraison = 1200;
    } else if (quantiteTotale > 2) {
        fraisLivraison = 1500;
    }
});

var fraisLivraison;
var affichageFraisLivraison = "<div> <h6>" + "Montant des frais de livraison : " + convertPrice(fraisLivraison) + " \u20AC" + "</h6> </div>";
if(document.querySelector('#affichageLivraison') !== null) {
    document.querySelector('#affichageLivraison').innerHTML = affichageFraisLivraison;
}
var totalAvecLivraison = montantTotal + fraisLivraison;

var totalFinal = "<div> <h5>" + "Montant total de la commande : " + convertPrice(totalAvecLivraison) + " \u20AC" + "</h5> </div>";
if(document.querySelector('#montantTotal') !== null) {
    document.querySelector('#montantTotal').innerHTML = totalFinal;
}

// Supprime un produit du panier
function supprPanier(id) {
    sessionStorage.removeItem(id);
    let adresse = sessionStorage.getItem("adresse");
    if (adresse === null) {
        adresse = "";
        var tablAdresse = [];
    } else {
        var tablAdresse = adresse.split(',');
    }
    var index = tablAdresse.indexOf(id);

    tablAdresse.splice(index, 1);
    if (tablAdresse.length >= 1) {
        sessionStorage.setItem("adresse", tablAdresse.toString());
    } else {
        sessionStorage.removeItem("adresse");
    }
    document.location.reload(true);
}
;
// Vérifie que tous les champs du formulaire sont remplis
function validationFormulairePanier() {
    if (document.forms["formulairePanier"].elements["name"].value === "" || document.forms["formulairePanier"].elements["surname"].value === "" || document.forms["formulairePanier"].elements["address"].value === "" || document.forms["formulairePanier"].elements["city"].value === "" || document.forms["formulairePanier"].elements["mail"].value === "") {
        openModal("Vous devez remplir tous les champs du formulaire");
    } else {
        saveOrder();
    }
}
// Stocke les informations du panier et du formulaire dans le sessionStorage
function saveOrder() {
    var sessionStorageAdresse = sessionStorage.getItem("adresse");
    if (sessionStorageAdresse === null) {
        openModal("Votre panier est vide");
        return false;
    } else {
        var adresseTabl = sessionStorageAdresse.split(',');
    }
    var monObjet = {
        "contact":
                {"firstName": document.forms["formulairePanier"].elements["name"].value,
                    "lastName": document.forms["formulairePanier"].elements["surname"].value,
                    "address": document.forms["formulairePanier"].elements["address"].value,
                    "city": document.forms["formulairePanier"].elements["city"].value,
                    "email": document.forms["formulairePanier"].elements["mail"].value},
        "products": adresseTabl
    };

    monObjet = JSON.stringify(monObjet);
    sessionStorage.setItem("formContact", monObjet);
    sessionStorage.setItem("totalAvecLivraison", totalAvecLivraison);
    return true;
}
