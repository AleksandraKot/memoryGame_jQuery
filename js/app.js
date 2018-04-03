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

        console.log(multipliedArrayOfCards);
        return multipliedArrayOfCards;

    }
    // Reaordering elements of array

    function shuffle(array) {
        var arrayOfCardsInRandomOrder = array.sort(function (a, b) {
            return 0.5 - Math.random();
        });

        return arrayOfCardsInRandomOrder;
    }
    reorderedCardsArray = shuffle(createArrayOfCardsPair(arrayOfImages));
    console.log(reorderedCardsArray);

    // Creating gameboard of reversed cards

    function createGameBoardOfFlippedCards(array) {
        for (var i = 0; i < array.length; i++) {
            var card =  $("<div>");
            card.addClass('card');
            card.data('image', array[i]);
            console.log(card.data());
            card.addClass('covered');
            gameContainer.append(card);
        }
    }
    createGameBoardOfFlippedCards(reorderedCardsArray);

    // Turning cards to front on click

    function turnCardsToFront(elements) {


            elements.on('click', function(e) {

                var alreadyFlipedCards = $('.flipping-animation');

                if (alreadyFlipedCards.length < 2) {
                    $(this).toggleClass("flipping-animation");
                    $(this).toggleClass("covered");
                    $(this).addClass($(this).data('image'));
                }

                alreadyFlipedCards = $('.flipping-animation');
                if (alreadyFlipedCards.length === 2) {
                    hideIfTheSamePicture(alreadyFlipedCards);
                    // continueIfDifferent(alreadyFlipedCards);
                }
            });
        }
        function hideIfTheSamePicture(elements) {
            if (elements.first().data('image') === elements.last().data('image')) {
                var timeout1 = setTimeout(function () {
                    elements.first().addClass("hidden");
                    elements.last().addClass("hidden");
                    elements.first().removeClass("flipping-animation");
                    elements.last().removeClass("flipping-animation");
                }, 500);
            }
        }
    
    turnCardsToFront( $('.covered'));











});