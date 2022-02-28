const audio = [
    new Audio('assets/1.mp3')
    , new Audio('assets/2.mp3')
    , new Audio('assets/3.mp3')
    , new Audio('assets/4.mp3')
];
const audioError = new Audio('assets/error.mp3');

let order = [];
let clickedOrder = [];
let score = 0;
let record = localStorage.getItem('record');

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul
const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

const playButton = document.querySelector('#play');
const resetRecord = document.querySelector('#reset');

//cria ordem aletoria de cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1, order[i]);
    }
}

//acende a proxima cor
let lightColor = (elementColor, number, color) => {
    number = number * 600;
    setTimeout(() => {
        audio[color].play();
        elementColor.classList.add('selected');
    }, number - 400);
    setTimeout(() => {
        elementColor.classList.remove('selected');
    }, number);
}

//checa se os botoes clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length) {
        alert(`Pontuação atual: ${score}\nVocê acertou! Iniciando próximo nível!`);
        updateRecord();
        nextLevel();
    }
}

//funcao para o clique do usuario
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');
    audio[color].play();

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    },250);
}

let control = (control) => {
    switch (control) {
        case 'play':
            playGame();
            break;
        case 'reset':
            localStorage.clear();
            updateRecord();
            break;
        default:
            alert('Um erro ocorreu, o game será recarregado!');
            location.reload(true);
    }
}

//funcao que retorna a cor
let createColorElement = (color) => {
    switch (color) {
        case 0: return green;
        case 1: return red;
        case 2: return yellow;
        case 3: return blue;
        default: 
            alert('Um erro ocorreu, o game será recarregado!');
            location.reload(true);
            return;
    }
}

//funcao para proximo nivel do jogo
let nextLevel = () => {
    score++;
    shuffleOrder();
}

//funcao para game over
let gameOver = () => {
    audioError.play();
    alert(`Você perdeu o jogo!
            \nPontuação: ${score}!
            \nSeu Recorde: ${record}!
            \nClique em OK para iniciar um novo jogo.`
    );
}

//funcao de inicio do jogo
let playGame = () => {
    alert('Bem vindo ao Gênesis! Iniciando novo jogo!');
    order = [];
    clickedOrder = [];
    score = 0;
    nextLevel();
}

//atualizar o Recorde
let updateRecord = () => {
    if(score > record) localStorage.setItem('record', score);
    document.getElementById('record').innerHTML = (record) ? record : 0;
}

//eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);
playButton.onclick = () => control('play');
resetRecord.onclick = () => control('reset');

//Evento ao carregar a página
updateRecord();