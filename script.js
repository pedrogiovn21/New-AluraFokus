const html = document.querySelector('html')
const iniciarBt = document.querySelector('.app__card-primary-button')
const focoBt = document.querySelector('.app__card-button--foco')  
const curtoBt = document.querySelector('.app__card-button--curto')  
const longoBt = document.querySelector('.app__card-button--longo')  
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const StartPauseBt = document.querySelector('#start-pause')
const botoes = document.querySelectorAll('.app__card-button')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const musicaFocoIput = document.querySelector('#alternar-musica')
const musica = new Audio ('./sons/luna-rise-part-one.mp3')
const playSom = new Audio ('./sons/play.wav')
const pauseSom = new Audio ('./sons/pause.mp3')
const alertSom = new Audio ('./sons/beep.mp3')
const iniciarOuPausarBtIcone = document.querySelector('.app__card-primary-butto-icon')
const TempoNaTela = document.querySelector('#timer')

musica.loop = true

let TempoEmSegundos = 1500
let IntervaloId = null

musicaFocoIput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
    
})

focoBt.addEventListener('click', () => {
    TempoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    TempoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    TempoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(TempoEmSegundos <= 0) {       
        alertSom.play()
        alert('tempo finalizado!!')
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo) {
            const pedro = new CustomEvent ('focoFinalizado')
            document.dispatchEvent(pedro)
        }
        zerar()
        return
    }
    TempoEmSegundos -= 1
    mostrarTempo()
}

StartPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar () {
    if(IntervaloId){
        zerar()
        pauseSom.play()
        return
    }
    playSom.play()
    IntervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    iniciarOuPausarBtIcone.setAttribute('src', './imagens/pause.png')
}

function zerar () {
    clearInterval(IntervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    iniciarOuPausarBtIcone.setAttribute('src', './imagens/play_arrow.png')
    IntervaloId = null
}

function mostrarTempo() {
    const tempo = new Date (TempoEmSegundos * 1000)
    tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    TempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()