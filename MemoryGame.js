$(document).ready(function() {

    /*VARIABLES*/
    let moves = 0; /*checks the number of times a card was chosen*/
    let FirstCard = null /*first card chosen*/
    let SecondCard = null /*second card chosen*/
    let pair = 0 /*pairs of cards*/
    const stopWatch = document.getElementById("timer");
    let startTimer = null;
    let [minutes, seconds] = [0, 0];

    //FUNCTIONS

    /*SHUFFLES THE POSITION OF EACH CARD*/
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    /*MATCHING CARDS*/
    function CardsMatch(FirstCard, SecondCard) {
        FirstCard.addClass("wobble-hor-bottom")
        SecondCard.addClass("wobble-hor-bottom")
        pair += 1
        if (pair === 6){
            RestartGame()
        }
    }

    /*UNMATCHED CARDS*/
    function CardsUnmatched(FirstCard, SecondCard) {
        FirstCard.addClass("shake-bottom")
        SecondCard.addClass("shake-bottom")
        CloseCards(FirstCard, SecondCard)
    }

    /*CLOSES CARDS IF UNMATCHED*/
    function CloseCards(FirstCard, SecondCard) {
        setTimeout(function () {
            FirstCard.removeClass("selected shake-bottom")
            FirstCard.children().eq(0).css("visibility", "hidden")
            FirstCard.children().eq(1).css("visibility", "visible")
            FirstCard.css("background-image", "linear-gradient(to top, #cd9cf2 0%, #f6f3ff 100%)")

            SecondCard.removeClass("selected shake-bottom")
            SecondCard.children().eq(0).css("visibility", "hidden")
            SecondCard.children().eq(1).css("visibility", "visible")
            SecondCard.css("background-image", "linear-gradient(to top, #cd9cf2 0%, #f6f3ff 100%)")
        }, 1200)

    }

    //RESETS THE GAME
    function RestartGame() {
        setTimeout(function () {
            $(".card").addClass("heartbeat")
        },0)
        $(".fa-star").css({"color":"yellow"}).addClass("blink-1")
        clearInterval(startTimer);

    }

    //SHOWS CARDS FOR A FEW SECONDS BEFORE STARTING THE GAME
    function DisplayCards(){
        setTimeout(function () {
            $(".card").css("background-image", "none")
            $(".image").css("visibility", "visible")
            $(".bg").css("visibility", "hidden")
        },1000)
    }

    //HIDES THE CARDS
    function HideCards(){
        setTimeout(function () {
            $(".card").css("background-image", "linear-gradient(to top, #cd9cf2 0%, #f6f3ff 100%)")
            $(".image").css("visibility", "hidden")
            $(".bg").css("visibility", "visible")
        },4000)
    }

    //GAME'S TIMER
    function displayTime() {
        seconds++;

        if (seconds >= 60) {
            minutes++;
            seconds = 0;
        }

        let m = minutes < 10 ? "0" + minutes : minutes;
        let s = seconds < 10 ? "0" + seconds : seconds;
        stopWatch.innerHTML = `${m} : ${s}`;
    }



    const arr = ["IMG00", "IMG01", "IMG02", "IMG03",
        "IMG04", "IMG05", "IMG00", "IMG01",
        "IMG02", "IMG03", "IMG04", "IMG05"]

    shuffleArray(arr)

    for (let i = 0; i < 12; i++) {
        $("#img" + i).attr("src", "images/" + eval("arr[i]") + ".webp")
    } /*assigning each icon to its tag randomly*/

    DisplayCards()
    HideCards()


    $(".card").click(function () {

        if ($(this).hasClass('selected')) {
            return;
        }

        if (startTimer !== null) {
            clearInterval(startTimer);
        }

        startTimer = setInterval(displayTime, 1000);

        if (moves === 0) {

            $(this).addClass("selected").css("background-image", "none")
            $(this).children().eq(0).css("visibility", "visible")
            $(this).children().eq(1).css("visibility", "hidden")
            FirstCard = $(this)
            moves += 1
        } else if (moves === 1) {
            $(this).addClass("selected")
            $(this).css("background-image", "none")
            $(this).children().eq(0).css("visibility", "visible")
            $(this).children().eq(1).css("visibility", "hidden")
            SecondCard = $(this)
            moves += 1
        }

        if (moves === 2) {

            if (FirstCard.find("img").attr("src") === SecondCard.find("img").attr("src")) {
                CardsMatch(FirstCard, SecondCard)

            } else {
                CardsUnmatched(FirstCard, SecondCard)
            }
            moves = 0
        }

    })

    $("#restart").click(function () {

        clearInterval(startTimer);
        [minutes, seconds] = [0, 0];
        stopWatch.innerHTML = "00 : 00";

        $(".card").removeClass("selected shake-bottom wobble-hor-bottom heartbeat tracking-in-contract").css("background-image", "linear-gradient(to top, #cd9cf2 0%, #f6f3ff 100%)")
        $(".image").css("visibility", "hidden").attr("src","")
        $(".bg").css("visibility", "visible")
        $(".fa-star").css({"color": "#40277c","text-shadow": "2px 1px 0 rgba(171, 75, 255, 0.6)"})



        shuffleArray(arr)
        for (let i = 0; i < 12; i++) {
            $("#img" + i).attr("src", "images/" + eval("arr[i]") + ".webp")
        }

        DisplayCards()
        HideCards()

        moves=0
    })

})
