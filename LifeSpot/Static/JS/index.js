let checker = function (newVisit) {
    if (window.sessionStorage.getItem("userAge") >= 18) {
        if (newVisit) {
            alert("Приветствуем на LifeSpot! " + '\n' + "Текущее время: " + new Date().toLocaleString());
        }
    }
    else {
        alert("Наши трансляции не предназначены для лиц моложе 18 лет. Вы будете перенаправлены");
        window.location.href = "http://www.google.com"
    }
}

function handleSession(logger, checker) {

    if (window.sessionStorage.getItem("startDate") == null) {
        window.sessionStorage.setItem("startDate", new Date().toLocaleString())
    }

    if (window.sessionStorage.getItem("userAgent") == null) {
        window.sessionStorage.setItem("userAgent", window.navigator.userAgent)
    }

    if (window.sessionStorage.getItem("userAge") == null) {
        let input = prompt("Пожалуйста, введите ваш возраст");
        window.sessionStorage.setItem("userAge", input)

        checker(true)
    } else {

        checker(false)
    }

    logger()
}

let logger = function () {
    console.log('Начало сессии: ' + window.sessionStorage.getItem("startDate"))
    console.log('Даныне клиента: ' + window.sessionStorage.getItem("userAgent"))
    console.log('Возраст пользователя: ' + window.sessionStorage.getItem("userAge"))
}

const userInput = function () {
    return document.getElementsByTagName('input')[0].value.toLowerCase()
}

function filter() {
    let elements = document.getElementsByClassName('video-container');
    for (let i = 0; i < elements.length; i++) {
        let elementText = elements[i].getElementsByTagName('h3')[0].innerText.toLowerCase();
        if (elementText.includes(userInput())) {
            elements[i].style.display = 'inline-block';
        }
        else {
            elements[i].style.display = 'none';
        }
    }
}