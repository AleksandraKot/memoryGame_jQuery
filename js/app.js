
document.addEventListener("DOMContentLoaded", function () {
    var gameContainer = document.querySelector(".game-container");
    var arrayOfCategories =  ["blue", "green", "pink", "purple", "purplelight"];
    var shuffledArray;
    var coveredCards;

    // Multiplying elements in array in order to get pair of cards

    function createArrayOfCardsPair(array) {
        var gameArrayOfPairsOfCard = [];

        for (var i = 0; i < 2; i++) {
            for (var category in array) {
                gameArrayOfPairsOfCard.push(array[category]);
            }
        }
        return gameArrayOfPairsOfCard;
    }

    // Reaordering array elements

    function shuffle(array) {
        var arrayOfCardsInRandomOrder = array.sort(function (a, b) {
            return 0.5 - Math.random();
        });

        return arrayOfCardsInRandomOrder;
    }

    // Creating divs in gameboard. For now - reversed

    function createGameBoardOfFlippedCards(array) {
        for (var i = 0; i < array.length; i++) {
            var card = document.createElement("div");
            card.classList.add("card");
            card.dataset.category = array[i];
            card.classList.add("covered");
            gameContainer.appendChild(card);
        }
    }

    // Turning cards to front on click and show the picture

    function turnCardsToFront(array) {
        var counter = 0;

        for (var i = 0; i < array.length; i++) {

            array[i].addEventListener("click", function (e) {

                var alreadyFlipedCards = document.querySelectorAll(".flip-in-hor-bottom");

                if (alreadyFlipedCards.length < 2) {
                    this.classList.toggle("flip-in-hor-bottom");
                    this.classList.toggle("covered");
                    this.classList.add(this.dataset.category);
                }

                alreadyFlipedCards = document.querySelectorAll(".flip-in-hor-bottom");
                if (alreadyFlipedCards.length === 2) {
                    hideIfTheSamePicture(alreadyFlipedCards);
                    continueIfDifferent(alreadyFlipedCards);
                }
            });
        }
    }

    function hideIfTheSamePicture(array) {
        if (array[0].dataset.category === array[1].dataset.category) {
            var timeout1 = setTimeout(function () {
                array[0].classList.add("hidden");
                array[1].classList.add("hidden");
                array[0].classList.remove("flip-in-hor-bottom");
                array[1].classList.remove("flip-in-hor-bottom");
                addRestartButtonIfFinished();
            }, 500);
        }
    }

    function continueIfDifferent(array) {
        for (var i = 0; i < array.length; i++) {
            if (array[0].dataset.category !== array[1].dataset.category) {

                var timeout1 = setTimeout(function() {
                    array[0].classList.toggle("flip-in-hor-bottom");
                    array[0].classList.add("covered");
                    array[1].classList.toggle("flip-in-hor-bottom");
                    array[1].classList.add("covered");
                    array[0].classList.remove("flip-in-hor-bottom");
                    array[1].classList.remove("flip-in-hor-bottom");
                }, 500);
            }
        }
    }
    function addRestartButtonIfFinished() {
        var hiddenCards = gameContainer.getElementsByClassName("hidden");

        if (hiddenCards.length === 10) {
            var restartButton = document.createElement("div");
            restartButton.className = "restart-button";
            restartButton.innerHTML = "Graj jeszcze raz";
            gameContainer.appendChild(restartButton);
            restartGame();
        }
    }

    function restartGame() {
        var restartButton = document.querySelector(".restart-button");

        restartButton.addEventListener("click", function(e) {
            restartButton.style.display = "none";
            gameContainer.innerHTML = "";
            startGame();
        });
    }

    function startGame() {
        shuffledArray = shuffle(createArrayOfCardsPair(arrayOfCategories));
        createGameBoardOfFlippedCards(shuffledArray);
        coveredCards = document.querySelectorAll(".covered");
        turnCardsToFront(coveredCards);
    }

    startGame();

});