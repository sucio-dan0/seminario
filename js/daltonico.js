function aplicarModo() {
    document.body.classList.remove("protanopia", "deuteranopia", "tritanopia");

    const modo = localStorage.getItem("modoDaltonico");

    if (modo) {
        document.body.classList.add(modo);
    }
}

document.addEventListener("DOMContentLoaded", function () {

    aplicarModo();

    const btnProtanopia = document.getElementById("btnProtanopia");
    const btnDeuteranopia = document.getElementById("btnDeuteranopia");
    const btnTritanopia = document.getElementById("btnTritanopia");
    const btnNormal = document.getElementById("btnNormal");

    if (btnProtanopia) {
        btnProtanopia.addEventListener("click", function () {
            localStorage.setItem("modoDaltonico", "protanopia");
            aplicarModo();
        });
    }

    if (btnDeuteranopia) {
        btnDeuteranopia.addEventListener("click", function () {
            localStorage.setItem("modoDaltonico", "deuteranopia");
            aplicarModo();
        });
    }

    if (btnTritanopia) {
        btnTritanopia.addEventListener("click", function () {
            localStorage.setItem("modoDaltonico", "tritanopia");
            aplicarModo();
        });
    }

    if (btnNormal) {
        btnNormal.addEventListener("click", function () {
            localStorage.removeItem("modoDaltonico");
            aplicarModo();
        });
    }

});