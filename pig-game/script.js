'use strict';

// Selecionando elementos do DOM
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Variáveis de estado
let scores, currentScore, activePlayer, playing;
activePlayer = 0;
// Função de inicialização do jogo
const init = function () {
  // Remove status de vencedor e define jogador ativo inicial
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');

  // Inicializa variáveis
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Zera os placares
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // Oculta o dado na tela
  diceEl.classList.add('hidden');

  // Define o jogador 0 como ativo
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

// Inicia o jogo ao carregar
init();

// Função para alternar entre os jogadores
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Evento: Clicar para rolar o dado
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Gera número aleatório entre 1 e 6
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Exibe imagem do dado correspondente
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // Se o número for diferente de 1, adiciona ao placar atual
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Se for 1, troca de jogador
      switchPlayer();
    }
  }
});

// Evento: Clicar para segurar a pontuação
btnHold.addEventListener('click', function () {
  if (playing) {
    // Adiciona a pontuação atual ao placar total do jogador ativo
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Verifica se o jogador venceu (meta de 20 pontos)
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');

      // Marca o jogador como vencedor
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Se não venceu, passa a vez
      switchPlayer();
    }
  }
});

// Evento: Reiniciar o jogo
btnNew.addEventListener('click', init);
