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
            card.addClass('covered');
            gameContainer.append(card);
        }
    }
    createGameBoardOfFlippedCards(reorderedCardsArray);














});