//Card Variables
var brands = ['Hearts', 'Clubs', 'Diamonds', 'Spades'],
  faces = ['Ace', 'King', 'Queen', 'Jack', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
//DOM Variables
var newgame = document.getElementById('new-game'),
  hit = document.getElementById('hit'),
  stay = document.getElementById('stay'),
  heading = document.getElementById('heading'),
  text = document.getElementById('text');
//Game Variables
var gameStart = false,
  gameEnd = false,
  playerWon = false,
  dealerCards = [],
  playerCards = [],
  playerScore = 0,
  dealerScore = 0,
  deck = [],
  tie = false,
  pblackjack = false,
  dblackjack = false;
hit.style.display = 'none';
stay.style.display = 'none';
//function for making the Deck
function deckMaker() {
  for (let i = 0; i < brands.length; i++) {
    for (let j = 0; j < faces.length; j++) {
      let card = {
        brand: brands[i],
        face: faces[j],
      };
      deck.push(card);
    }
  }

  return deck;
}
//function for cards
function makeCard(card) {
  return card.face + ' of ' + card.brand;
}
//function for next card
function nxtCard() {
  return deck.shift();
}
//function to shuffle deck
function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let a = Math.trunc(Math.random() * deck.length);
    let temp = deck[a];
    deck[a] = deck[i];
    deck[i] = temp;
  }

  return deck;
}
//new game button
newgame.addEventListener('click', function () {
  gameStart = true;
  gameEnd = false;
  playerWon = false;
  pblackjack = false;
  dblackjack = false;
  tie = false;
  newgame.style.display = 'none';
  hit.style.display = 'inline';
  stay.style.display = 'inline';
  deck = deckMaker();
  deck = shuffleDeck();
  dealerCards = [nxtCard(), nxtCard()],
    playerCards = [nxtCard(), nxtCard()];
  showStatus();
});

hit.addEventListener('click', function () {

  playerCards.push(nxtCard());
  gameCheck();
  showStatus();
});

stay.addEventListener('click', function () {
  gameEnd = true;
  gameCheck();
  showStatus();
});

function gameCheck() {
  updateScore();
  while (dealerScore < playerScore && dealerScore <= 21 && playerScore <= 21) {
    dealerCards.push(nxtCard());
    updateScore();
  }

  if (dealerScore > 21 && playerScore != 21) {
    playerWon = true;
    gameEnd = true;
    tie = false;
    pblackjack = false;
    dblackjack = false;
  } else if (playerScore > 21 && dealerScore != 21) {
    playerWon = false;
    gameEnd = true;
    tie = false;
    pblackjack = false;
    dblackjack = false;
  } else if (playerScore === 21) {
    pblackjack = true;
    gameEnd = true;
    playerWon = false;
    tie = false;
    dblackjack = false;
  } else if (dealerScore === 21) {
    dblackjack = true;
    gameEnd = true;
    playerWon = false;
    tie = false;
    pblackjack = false;
  } else if (playerScore === dealerScore) {
    tie = true;
    playerWon = false;
    pblackjack = false;
    dblacjack = false;
  } else if (gameEnd) {
    if (playerScore > dealerScore) {
      playerWon = true;
      dblackjack = false;
      tie = false;
      pblackjack = false;
    }
  }
}
//function to update score
function updateScore() {
  playerScore = calcScore(playerCards);
  dealerScore = calcScore(dealerCards);
}
//function to get the card value
function cardValue(card) {
  switch (card.face) {
    case 'Ace':
      return 1;
    case 'Two':
      return 2;
    case 'Three':
      return 3;
    case 'Four':
      return 4;
    case 'Five':
      return 5;
    case 'Six':
      return 6;
    case 'Seven':
      return 7;
    case 'Eight':
      return 8;
    case 'Nine':
      return 9;
    default:
      return 10;
  }
}
//function to calculate scores
function calcScore(cards) {
  let ace = false;
  let score = 0;
  for (i = 0; i < cards.length; i++) {
    let card = cards[i];
    score += cardValue(card);
    if (card.face === 'Ace') {
      ace = true;
    }
  }

  if (ace && score + 10 <= 21) {
    return score + 10;
  }

  return score;
}

function pCards() {
  var pCards = [];
  for (let i = 0; i < playerCards.length; i++) {
    pCards += makeCard(playerCards[i]) + '\n';
  }

  return pCards;
}

function dCards() {
  var dCards = [];
  for (let i = 0; i < dealerCards.length; i++) {
    dCards += makeCard(dealerCards[i]) + '\n';
  }

  return dCards;
}
//main game function
function showStatus() {
  if (!gameStart) {
    text.innerText = 'Cool, lets begin.';
    return;
  }

  updateScore();
  text.innerText = '\nDealer Cards:\n' + dCards() +
    'Score=' + dealerScore + '\n\n' +
    '\n Player Cards:\n' + pCards() + 'Score=' + playerScore;
  if (playerScore == 21) {

    pblackjack = true;
    gameEnd = true;
  }

  if (dealerScore == 21) {
    dblackjack = true;
    gameEnd = true;

  }

  if (gameEnd === true) {
    if (pblackjack === true) {
      text.innerText += '\n' + 'BLACKJACK!!!! You WON!';
    } else if (dblackjack === true) {
      text.innerText += '\n' + 'BLACKJACK!!!! You LOST!';
    } else if (playerWon === true) {
      text.innerText += '\n' + 'You Won!';
    } else if (tie === true) {
      text.innerText += '\n' + 'Its a tie';
    } else {
      text.innerText += '\n' + 'Dealer Won!';
    }

    newgame.style.display = 'block';
    hit.style.display = 'none';
    stay.style.display = 'none';
  }

}
