function obterMedia(n1, n2, n3) {

    var n1 = parseInt(document.getElementById("n1").value);
    var n2 = parseInt(document.getElementById("n2").value);
    var n3 = parseInt(document.getElementById("n3").value);

    var media = (n1 + n2 + n3) / 3;

    document.getElementById("resultado").innerHTML = "Resultado" +
        media;

    var d = windown.document.getElementById('h1')[0]
    d.style.color = 'blue'


}