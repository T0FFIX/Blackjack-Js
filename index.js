// array of playing cards
var cardValues = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
// deck of 52 cards
let playingDeck = cardValues.concat(cardValues,cardValues,cardValues)
// shuffled deck of 52 cards
let playingDeckReady = shuffleArray(playingDeck)
// array of player cards
let playerCards = []
// array of dealer cards
let dealerCards = []

function gameStart()
{
    // dealing cards for player and dealer
    playerCards.push(getOneCard())
    dealerCards.push(getOneCard())
    playerCards.push(getOneCard())
    dealerCards.push(getOneCard())

    // show what cards did the player get
    document.getElementById("player-field-cards").textContent = showCards(playerCards)

    // show total points for the player
    document.getElementById("player-field-cards-sum").textContent = checkSumOfCards(playerCards)

    // show to player the second card from the dealer
    document.getElementById("dealer-field-cards").textContent = ["? " + dealerCards[1]]
}

// get first item for the shuffled deck
function getOneCard()
{
    let oneCard = playingDeckReady[0]
    playingDeckReady = playingDeckReady.slice(1,-1)
    return oneCard
}

// get one card form deck for player
function takeCard()
{
    playerCards.push(getOneCard())
    document.getElementById("player-field-cards").textContent = showCards(playerCards)
    document.getElementById("player-field-cards-sum").textContent = checkSumOfCards(playerCards)
    // simple check if the player got more than 21 and automatically lost
    if(checkSumOfCards(playerCards) > 21)
    {
        // start dealer turn to make a decision
        enough()
    }
}

function showCards(arr)
{
    let showCards = []
    for (let i = 0; i < arr.length; i++)
    {
        showCards += arr[i] +" "
    }
    return showCards
}

// dealer function that makes decisions automatically
function enough()
{
    while (checkSumOfCards(dealerCards) < 17)
    {
        dealerCards.push(getOneCard())
    }
    document.getElementById("dealer-field-cards").textContent = dealerCards
    document.getElementById("dealer-field-cards-sum").textContent = checkSumOfCards(dealerCards)
    // check function for who won the round
    whoWon()
}

function whoWon()
{
    if(checkSumOfCards(playerCards) > 21 && checkSumOfCards(dealerCards) > 21)
    {

        document.getElementById("game-outcome").textContent = "Its a draw"
    }
    else if(checkSumOfCards(playerCards) <= 21 && checkSumOfCards(dealerCards) > 21)
    {
        document.getElementById("game-outcome").textContent = "Player wins!"
    }
    else if(checkSumOfCards(playerCards) > 21 && checkSumOfCards(dealerCards) <= 21)
    {
        document.getElementById("game-outcome").textContent = "Players lose!"
    }
    else if(checkSumOfCards(playerCards) <= 21 && checkSumOfCards(dealerCards) <= 21)
    {
        if(checkSumOfCards(dealerCards) > checkSumOfCards(playerCards))
        {
            document.getElementById("game-outcome").textContent = "Players lose!"
        }
        else if(checkSumOfCards(dealerCards) === checkSumOfCards(playerCards))
        {
            document.getElementById("game-outcome").textContent = "Its a draw"
        }
        else
        {
            document.getElementById("game-outcome").textContent = "Players wins!"
        }
    }
}

// check the sum of points of the array that has been given
function checkSumOfCards(arr)
{
    // check for aces
    let sumOfCards = 0
    let countAces = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].match(/[a-z]/i))
        {
            if (arr[i] === "A")
            {
                countAces = countAces + 1
            }
            else if (arr[i] === "J")
            {
                sumOfCards = sumOfCards + 2
            }
            else if (arr[i] === "Q")
            {
                sumOfCards = sumOfCards + 3
            }
            else if (arr[i] === "K")
            {
                sumOfCards = sumOfCards + 4
            }
        }
        else
        {
            sumOfCards += parseInt(arr[i])
        }
    }

    // count aces them accordingly to the rules of Blackjack
    if (sumOfCards === 0 && countAces === 2)
    {
        sumOfCards = 21
    }
    else if (sumOfCards > 0 && countAces > 0)
    {
        if (sumOfCards > 10)
        {
            sumOfCards = sumOfCards + countAces
        }
        else if (sumOfCards + countAces < 11)
        {
            sumOfCards = sumOfCards + 11 + (countAces - 1)
        }
    }

    return sumOfCards
}

// shuffle an given array
function shuffleArray(array)
{
    for (let i = array.length - 1; i > 0; i--)
    {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}