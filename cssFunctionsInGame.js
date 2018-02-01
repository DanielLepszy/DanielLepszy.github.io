var beginGame = document.getElementById('start');
var award = document.getElementById('awards');
var aboutGame = document.getElementById('about');

beginGame.addEventListener("click", function () { startGame() });
award.addEventListener("click", function () { gameAward() });
aboutGame.addEventListener("click", function () { gameInformation() });


function gameInformation() {
    $('#mainLogo img:nth-child(2)').remove();
    $('.firstOptions').remove();
    $('.icon').attr('src', 'Images/backarrow.png');
    $('.website').attr('href', '');

    $('#startGame').html('Prosta aplikacja webowa bazująca na słynnej grze "Milionerzy".<br> ' +
        'Zasady gry są proste: grasz dopóki nie wygrasz :).<br>Można korzystać tylko z jednego koła ratunkowego podczas danego pytania.<br>' +
        'Pamiętaj, że pytania z pozoru wydają się łatwe.<br><br> Powodzenia ! <br><br>Prawa autorskie:<br>'+ 
        '- Pliki MP3 (http://www.kakofonia.pl/PLtele.php)<br>'+
        '- Pliki PNG (s)');

    $('#startGame').addClass('gameInformationsStyles');
}

function gameAward() {
    $('#mainLogo img:nth-child(2)').remove();
    $('.firstOptions').remove();
    $('.icon').attr('src', 'Images/backarrow.png');
    $('.website').attr('href', '');

    $('#startGame').addClass('gameAwardsStyles');
}
//Code after begin game//
function startGame() {
    $('#allContents').remove();

    $('body').html(
        '<div id="toWin"></div><div id="getAid"> </div><div id="mainQuestion"></div>' +
        '<div id="allAnswers"><div id="answerA"></div> <div id="answerB"></div>' +
        '<div id="answerC"></div> <div id="answerD"></div></div>'
    );

    $('#getAid').html(
        '<img id="publicAid" src="Images/publicznosc.png">' +
        '<img id="fifty-fifty" src="Images/polnapol.png">' +
        '<img id="friendcAid" src="Images/telefondoprzyjaciela.png">'
    );

    $('#mainQuestion').html('<p></p>');

    $('#answerA').html('<p class="firstRowAnswer">A:</p>');
    $('#answerB').html('<p class="firstRowAnswer">B:</p>');
    $('#answerC').html('<p class="firstRowAnswer">C:</p>');
    $('#answerD').html('<p class="firstRowAnswer">D:</p>');

    $('body').addClass('imageBackground');

    $('#getAid').addClass('positionsOfThreeAids');

    $('#getAid img').css({
        'padding': '12px',
    });
    $("#getAid").delegate('img', 'mouseover mouseleave', function (e) {
        if (e.type == 'mouseover') {
            $(this).css({
                'cursor': 'hand',
                'transform': 'scale(1.2)',
                'transition': 'all 0.5s ease-in-out',
            });
        } else {
            $(this).css({
                'transform': 'scale(1.1)',
                'transition': 'all 0.6s ease-in-out'
            });
        }
    });
    $('#mainQuestion').addClass('positionOfMainQuestion');

    $('#mainQuestion p').addClass('positionOfContentQuestion');

    $('#allAnswers').addClass('positionOfAnswers');

    $('#allAnswers div').addClass('positionOfContentAnswers');

    $('#allAnswers p:nth-child(1) ').addClass('styleOfFirstContentAnswers');

    $('#allAnswers p:nth-child(2) ').addClass('styleOfSecondContentAnswers');

}