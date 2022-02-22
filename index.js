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
// One color of 13 cards eg. Hearts
let oneColor = shuffleArray(cardValues)
//Deck of 52 cards
let playingDeck = oneColor.concat(oneColor,oneColor,oneColor)
let playingDeckReady = shuffleArray(playingDeck)
let playerCards = []
let botCards = []

function gameStart()
{
    playerCards.push(getOneCard())
    botCards.push(getOneCard())

    playerCards.push(getOneCard())
    document.getElementById("player-field-cards").textContent = showCards(playerCards)
    botCards.push(getOneCard())

    document.getElementById("player-field-cards-sum").textContent = checkSumOfCards(playerCards)
    document.getElementById("dealer-field-cards").textContent = ["? " + botCards[1]]

}

function getOneCard()
{
    let oneCard = playingDeckReady[0]
    playingDeckReady = playingDeckReady.slice(1,-1)
    return oneCard
}

function takeCard()
{
    playerCards.push(getOneCard())
    document.getElementById("player-field-cards").textContent = showCards(playerCards)
    document.getElementById("player-field-cards-sum").textContent = checkSumOfCards(playerCards)
    if(checkSumOfCards(playerCards) > 21)
    {
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

function enough()
{
    while (checkSumOfCards(botCards) < 17)
    {
        botCards.push(getOneCard())
    }
    document.getElementById("dealer-field-cards").textContent = botCards
    document.getElementById("dealer-field-cards-sum").textContent = checkSumOfCards(botCards)
    whoWon()
}

function whoWon()
{
    if(checkSumOfCards(playerCards) > 21 && checkSumOfCards(botCards) > 21)
    {
        document.getElementById("game-outcome").textContent = "Its a draw"
    }
    else if(checkSumOfCards(playerCards) <= 21 && checkSumOfCards(botCards) > 21)
    {
        document.getElementById("game-outcome").textContent = "Player wins!"
    }
    else if(checkSumOfCards(playerCards) > 21 && checkSumOfCards(botCards) <= 21)
    {
        document.getElementById("game-outcome").textContent = "Players lose!"
    }
    else if(checkSumOfCards(playerCards) <= 21 && checkSumOfCards(botCards) <= 21)
    {
        if(checkSumOfCards(botCards) > checkSumOfCards(playerCards))
        {
            document.getElementById("game-outcome").textContent = "Players lose!"
        }
        else if(checkSumOfCards(botCards) === checkSumOfCards(playerCards))
        {
            document.getElementById("game-outcome").textContent = "Its a draw"
        }
        else
        {
            document.getElementById("game-outcome").textContent = "Players wins!"
        }
    }
}

function checkSumOfCards(arr)
{
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