// Delete prob.
var cardValues = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
];

// var cardValues = [
//     "A",
//     2,
//     3,
//     4,
//     5,
//     6,
//     7,
//     8,
//     9,
//     10,
//     "J",
//     "Q",
//     "K"
// ];

// var cardValues = [
//     ["A", 11],
//     ["2", 2],
//     ["3", 3],
//     ["4", 4],
//     ["5", 5],
//     ["6", 6],
//     ["7", 7 ],
//     ["8", 8],
//     ["9", 9],
//     ["10", 10],
//     ["J", 2],
//     ["Q", 3],
//     ["K", 4]
// ];
// One color of 13 cards eg. Hearts
let oneColor = shuffleArray(cardValues)
//Deck of 52 cards
let playingDeck = oneColor.concat(oneColor,oneColor,oneColor)
let playingDeckReady = shuffleArray(playingDeck)
let playerCards = []

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

function gameStart() {
    getOneCard()
    getOneCard()
    checkSumOfCards()

}

function getOneCard() {
    let oneCard = playingDeckReady[0]
    playingDeckReady = playingDeckReady.slice(1,-1)
    playerCards.push(oneCard)
    showPlayerCards()
    checkSumOfCards()
}

function showPlayerCards() {
    let showCarts = []
    for (let i = 0; i < playerCards.length; i++) {
        showCarts += playerCards[i] +"\n"
    }
    let where = document.getElementById("playing-field")
    where.textContent = showCarts
}

function checkSumOfCards() {
    let sumOfCards = 0
    for(let i = 0; i<playerCards.length; i++){
        if(playerCards[i].match(/[a-z]/i))
        {
            if(playerCards[i] === "A"){
                if(playerCards[i-1] === "A")
                {
                    sumOfCards = 21
                    //end your turn starts bots turn
                }
                else if(sumOfCards < 11) {
                    sumOfCards += 11
                }
                else {
                    sumOfCards += 1
                }
            }
            else if(playerCards[i] === "J"){
                sumOfCards += 2
            }
            else if(playerCards[i] === "Q"){
                sumOfCards += 3
            }
            else if(playerCards[i] === "K"){
                sumOfCards += 4
            }
        }
        else {
            sumOfCards +=parseInt(playerCards[i])
        }
    }
    console.log(sumOfCards)
}

