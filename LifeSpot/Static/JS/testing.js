let elements = document.getElementsByTagName('*');
alert(`На данной странице ${elements.length} HTML элементов.`);

function textHandler() {
    let currentInput = document.getElementsByTagName('input')[0].value;

    alert('Последний ввод: ' + this.lastInput + '\n' + 'Текущий ввод: ' + currentInput);

    this.lastInput = currentInput;
}
