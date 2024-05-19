let currentImg = document.getElementById("img");
currentImg.style.display = "block"

const nextImg = function () {
    document.getElementById("slideLeft").disabled = false;
    if (currentImg.nextElementSibling != null) {
        currentImg.style.display = "none";
        currentImg = currentImg.nextElementSibling;
        currentImg.style.display = "block";
    }
    if (currentImg.nextElementSibling == null) {
        document.getElementById("slideRight").disabled = true;

    }
}

const prevImg = function () {
    document.getElementById("slideRight").disabled = false;
    if (currentImg.previousElementSibling != null) {
        currentImg.style.display = "none";
        currentImg = currentImg.previousElementSibling;
        currentImg.style.display = "block";
    }
    if (currentImg.previousElementSibling == null) {
        document.getElementById("slideLeft").disabled = true;

    }
}
