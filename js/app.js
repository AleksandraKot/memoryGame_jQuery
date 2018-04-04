$(document).ready(function () {

    var gameContainer = $('.game-container').first();
    var arrayOfImages = ["blue", "green", "pink", "purple", "purplelight"];
    var reorderedCardsArray;
    var coveredCards;

    // Multiplying elements in array in order to get pair of cards

    function createArrayOfCardsPair(array) {

        var multipliedArrayOfCards = [];

        $.each(arrayOfImages, function (index, value) {
            for (var i = 0; i < 2; i++) {
                multipliedArrayOfCards.push(value);
            }
        });

        return multipliedArrayOfCards;
    }
    // Reaordering elements of array

    function shuffle(array) {
        var arrayOfCardsInRandomOrder = array.sort(function (a, b) {
            return 0.5 - Math.random();
        });

        return arrayOfCardsInRandomOrder;
    }

    // Creating gameboard of reversed cards

    function createGameBoardOfFlippedCards(array) {
        for (var i = 0; i < array.length; i++) {
            var card = $("<div>");
            card.addClass('size');
            card.data('image', array[i]);
            card.addClass('covered');
            gameContainer.append(card);
        }
    }


    // Turning cards to front on click

    function turnCardsToFront(elements) {

        elements.on('click', function (e) {

            var alreadyFlipedCards = $('.flipping-animation');

            if (alreadyFlipedCards.length < 2) {
                $(this).toggleClass("flipping-animation");
                $(this).toggleClass("covered");
                $(this).addClass($(this).data('image'));
            }

            alreadyFlipedCards = $('.flipping-animation');
            if (alreadyFlipedCards.length === 2) {
                hideIfTheSamePicture(alreadyFlipedCards);
                continueIfDifferent(alreadyFlipedCards);
            }
        });
    }

    function hideIfTheSamePicture(elements) {
        if (elements.eq(0).data('image') === elements.eq(1).data('image')) {
            var timeout1 = setTimeout(function () {
                elements.eq(0).addClass("hidden");
                elements.eq(1).addClass("hidden");
                elements.eq(0).removeClass("flipping-animation");
                elements.eq(1).removeClass("flipping-animation");
                addRestartButtonIfFinished();
            }, 500);
        }
    }

    function continueIfDifferent(elements) {
        if (elements.eq(0).data('image') !== elements.eq(1).data('image')) {

            var timeout1 = setTimeout(function () {
                elements.eq(0).toggleClass("flipping-animation");
                elements.eq(0).addClass("covered");
                elements.eq(1).toggleClass("flipping-animation");
                elements.eq(1).addClass("covered");
                elements.eq(0).removeClass("flipping-animation");
                elements.eq(1).removeClass("flipping-animation");
            }, 500);
        }
    }

    function addRestartButtonIfFinished() {
        var hiddenCards = gameContainer.find(".hidden");

        if (hiddenCards.length === 10) {
            var restartButton =  $('<div class="restart-button">Graj jeszcze raz</div>');
            gameContainer.append(restartButton);
            restartGame();
        }
    }

    function restartGame() {
        var restartButton = $(".restart-button");

        restartButton.on("click", function (e) {
            restartButton.attr('style', 'display: none;');
            gameContainer.empty();
            startGame();
        });
    }

    function startGame() {
        reorderedCardsArray = shuffle(createArrayOfCardsPair(arrayOfImages));
        createGameBoardOfFlippedCards(reorderedCardsArray);
        coveredCards = $('.covered');
        turnCardsToFront(coveredCards);
    }

    startGame();

});