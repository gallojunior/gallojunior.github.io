const palavras = ["javascript", "bootstrap", "engenharia", "marcio", "papa", "emeritus"];
let tentativasUsadas = 0;
let botoes = document.getElementById('botoes');
let letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let palavraSecreta, palavraOculta;
let jogando;

iniciarJogo();

function iniciarJogo() {
    botoes.innerHTML = '';
    letras.forEach((value, index) => {
        botoes.innerHTML += `<button id='btn-${value}' class="btn btn-light me-1 mb-1" onclick='checarLetra("${value}")'>${value}</button>`;
    });

    jogando = true;
    tentativasUsadas = 0;
    palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];
    palavraOculta = '';
    for (let i = 0; i < palavraSecreta.length; i++) {
        palavraOculta += '_ ';
    }
    document.querySelector('h2').innerHTML = palavraOculta;
    desenharForca(tentativasUsadas);
    document.getElementById('btnReiniciar').classList.add('d-none');
    //console.log(palavraSecreta, " ", palavraOculta);
}

function checarLetra(letra) {
    if (!jogando) return;
    let btn = document.getElementById('btn-' + letra);
    let achou = false;
    for (let i = 0; i < palavraSecreta.length; i++) {
        if (palavraSecreta[i] == letra.toLowerCase()) {
            achou = true;
            palavraOculta = trocaLetra(palavraOculta, letra, i);
        }
    }
    document.querySelector('h2').innerHTML = palavraOculta;
    btn.classList.remove('btn-light');
    btn.classList.add(achou ? 'btn-primary' : 'btn-danger');
    if (!achou) {
        tentativasUsadas++;
        desenharForca(tentativasUsadas);
    }
    checarJogo();
}

function checarJogo(){
    if (tentativasUsadas == 6) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Você perdeu!!!!!'
        });
        jogando = false;
        document.getElementById('btnReiniciar').classList.remove('d-none');
    }
    let listaTexto = palavraOculta.split(" ");
    let novaPalavra = listaTexto.join("");
    if (palavraSecreta == novaPalavra.toLowerCase()) {
        Swal.fire({
            icon: 'success',
            title: 'Aeeeeee',
            text: 'Você ganhou!!!!!'
        });
        jogando = false;
        document.getElementById('btnReiniciar').classList.remove('d-none');
    }
}

function trocaLetra(textoOriginal, letra, posicao) {
    let listaTexto = textoOriginal.split(" ");
    listaTexto[posicao] = letra;
    let novoTexto = listaTexto.join(" ");
    return novoTexto;
}

function desenharForca(tentativasErradas) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 6;

    // Base da forca
    ctx.beginPath();
    ctx.strokeStyle = '#006700';
    ctx.moveTo(20, canvas.height - 10);
    ctx.lineTo(180, canvas.height - 10);
    ctx.stroke();

    // Poste Vertical
    ctx.beginPath();
    ctx.strokeStyle = '#4e2708';
    ctx.moveTo(60, canvas.height - 10);
    ctx.lineTo(60, 20);
    ctx.stroke();

    // Trave horizontal
    ctx.beginPath();
    ctx.strokeStyle = '#4e2708';
    ctx.moveTo(60, 20);
    ctx.lineTo(120, 20);
    ctx.stroke();

    // Corda
    ctx.beginPath();
    ctx.strokeStyle = '#4e2708';
    ctx.moveTo(120, 20);
    ctx.lineTo(120, 30);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = '#4e2708';
    ctx.moveTo(80, 20);
    ctx.lineTo(60, 40);
    ctx.stroke();

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;

    // Cabeça
    if (tentativasErradas >= 1) {
        ctx.beginPath();
        ctx.arc(120, 45, 15, 0, Math.PI * 2);
        ctx.stroke();   
    }
    // Corpo
    if (tentativasErradas >= 2) {
        ctx.beginPath();
        ctx.moveTo(120, 60);
        ctx.lineTo(120, 120);
        ctx.stroke();   
    }
    // Braço esquerdo
    if (tentativasErradas >= 3) {
        ctx.beginPath();
        ctx.moveTo(120, 70);
        ctx.lineTo(100, 100);
        ctx.stroke();   
    }
    // Braço direito
    if (tentativasErradas >= 4) {
        ctx.beginPath();
        ctx.moveTo(120, 70);
        ctx.lineTo(140, 100);
        ctx.stroke();   
    }
    // Perna esquerda
    if (tentativasErradas >= 5) {
        ctx.beginPath();
        ctx.moveTo(120, 120);
        ctx.lineTo(100, 150);
        ctx.stroke();   
    }
    // Perna direita
    if (tentativasErradas >= 6) {
        ctx.beginPath();
        ctx.moveTo(120, 120);
        ctx.lineTo(140, 150);
        ctx.stroke();   
    }

}