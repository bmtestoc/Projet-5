var request = new XMLHttpRequest();
request.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        var response = JSON.parse(this.responseText);
        response.forEach(function (item, key) {
            var prix = convertPrice(item.price);
            const modele = "<div class='produit'> <a href = \"produit.html?id=" + item._id + "\"> <img src='" + item.imageUrl + "'> </a> <h5>" + item.name + "</h5> <h6>" + prix + " \u20AC" + "</h6> </div>";
            document.querySelector('#liste_produits').innerHTML += modele;
        });
    }
};
request.open("GET", "http://localhost:3000/api/cameras");
request.send();
