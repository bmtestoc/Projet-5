var monObjet = (sessionStorage.getItem("formContact"));
var totalAvecLivraison = sessionStorage.getItem("totalAvecLivraison");

var req = new XMLHttpRequest();
    req.open("POST", "http://localhost:3000/api/cameras/order");
    req.setRequestHeader("Content-Type", "application/json");
    req.send(monObjet);
    req.onload = function () {
        var retourApi = req.response;
        retourApi = JSON.parse(retourApi);
        var maCommande = {
            prenom: retourApi.contact.lastName,
            id: retourApi.orderId,
            montantTotal: totalAvecLivraison,
            mail: retourApi.contact.email
        };
        var prenom = "<div> <p>" + "Merci pour votre commande " + maCommande.prenom + "</p> </div>";
document.querySelector('#affichagePrenom').innerHTML += prenom;

var idMontant = "<div> <p>" + "Votre commande r\u00e9f\u00e9rence " + maCommande.id + " d'un montant de " + convertPrice(Number.parseInt(maCommande.montantTotal)) + " \u20AC" + " est enregistr\u00e9e par nos services" + "</p> <p>" + "Vous serez inform\u00e9(e) de son avancement \340 l'adresse " + maCommande.mail + "</p> </div>";
document.querySelector('#affichageIdMontant').innerHTML += idMontant;
sessionStorage.clear();
        };
        

