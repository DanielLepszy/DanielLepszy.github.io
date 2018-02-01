var beginGame = document.getElementById('start');
var allQuestions;
var isAidUsedInThatRound = false;
var boxOfQuestions = [];
var boxOfAnswers = [];
var clearAnswer = document.getElementById('allAnswers');
var currentQuestion;

function loadJSON() {
    var value = $.ajax({
        url: 'https://raw.githubusercontent.com/DanielLepszy/Best-Employee/master/questions_and_answers.json',
        async: false // 
    }).responseText;
    return JSON.parse(value);
}
beginGame.addEventListener("click", function () {
    allQuestions = loadJSON()
    onStartGame()

});
function subscribeOnCorectAnswerSelected() {
    $('#allAnswers').one('click', onCorrectAnswerSelected);
        setTimeout(function () {
            $("#getAid img").removeClass('blockUsingAid')
        }, 25000);
}

// function unblockUseLifLinesDuringAnswers() {
//     setTimeout(function () {
//         $("#getAid img").removeClass('usedAidStyle');
//         $("#getAid img").addClass('notUsedAidStyle');
//     }, 24000);
// }
function onStartGame() {
    fetchQuestions()
    currentQuestion = boxOfQuestions.pop()
    playAudio('Sounds/Begin.mp3', function () {
        playQuestionFocusMusic();
        showCurrentAnswers(currentQuestion)
    });
};
function subscribeForLifelines() {
    subscribeForFiftyFiftyLifeline()
    subscribeForPhoneAFriendLifeline()
    subscribeAskAAudienceLifeline()
}
function fetchQuestions() {
    boxOfQuestions = allQuestions.Questions
};
function openCV() {
    window.open('https://drive.google.com/file/d/1dLn9U6Xq-_HsvsphC_xVNGfZtIYxro7a/view?usp=sharing');
}

function finishGame() {
    if (boxOfQuestions.length == 0) {
        $('#mainQuestion').remove();
        $('#allAnswers div').remove();
        $('#getAid').remove();
        $('#toWin').remove();
        $('#allAnswers').html('<a><img id="myCV" src="Images/pobrane.png"></a>');
        $('#allAnswers').addClass('rewardsDiv');
        $('#allAnswers img').addClass('imageCV');
        $("#allAnswers").click(openCV);
        $("#allAnswers").delegate('img', 'mouseover mouseleave', function (e) {
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
    };
}
function showCurrentAnswers(question) {
    var questionAnswers = question.answers
    var questionContent = question.QuestionTitle
    $('#mainQuestion').html('<p>' + questionContent + '</p>');
    setTimeout(function () {
        $('#answerA .firstRowAnswer').after('<p>' + questionAnswers[0].answerTitle + '</p>')
    }, 2000);
    setTimeout(function () {
        $('#answerB .firstRowAnswer').after('<p>' + questionAnswers[1].answerTitle + '</p>')
    }, 4000);
    setTimeout(function () {
        $('#answerC .firstRowAnswer').after('<p>' + questionAnswers[2].answerTitle + '</p>')
    }, 6000);
    setTimeout(function () {
        $('#answerD .firstRowAnswer').after('<p>' + questionAnswers[3].answerTitle + '</p>')
        subscribeOnCorectAnswerSelected()
        subscribeForLifelines()
    }, 8000);
}
function onCorrectAnswerSelected() {
    $("#getAid img").addClass('blockUsingAid');
    animateCorrectAnswerSelection(function () {
        if (boxOfQuestions.length > 0) {
            currentQuestion = boxOfQuestions.pop();
            if (boxOfQuestions == 0) {
                playLastQuestionFocusMusic()
            }
            increaseVolumeQuestionFocusMusic();
            showCurrentAnswers(currentQuestion);
        }
    })
}
function aidAudio() {
    descreaseVolumeQuestionFocusMusic();
    playAudio('Sounds/Aid.mp3', function () {
        increaseVolumeQuestionFocusMusic();
    })
};
function animateCorrectAnswerSelection(onAnimationCompleted) { // Parametr przekazywany dalej
    var correctAnswerId = currentQuestion.correctAnswerId;
    var currentAnswerArray = currentQuestion.answers;
    var answer = currentAnswerArray.find(element => element.id === correctAnswerId)
    $('#toWin').empty();
    $("#answer" + answer.id).delay(100).animate({
        'backgroundColor': '#FFCF40',
        'opacity': 1,
        'color': '000000',
    }, 400);
    descreaseVolumeQuestionFocusMusic();
    playAudio('Sounds/zgroza.mp3', function () {
        $("#answer" + answer.id).animate({
            'backgroundColor': '#23E047',
        }, 300);
        playAudio('Sounds/dobraodpowiedz.mp3', function () {
            afterCorectAnswerSelectedAnimation(answer, onAnimationCompleted);
        })
    });
};
function afterCorectAnswerSelectedAnimation(answer, onAnimationCompleted) {
    $("#answer" + answer.id).animate({
        'backgroundColor': '#000000',
        'color': '#ffffff'
    }, 0);
    clearAnswersFields();
    if (boxOfQuestions.length === 0) {
        playAudio('Sounds/lastAnswer.mp3')
        finishGame()
    } else {
        playAudio('Sounds/nowepytanie.mp3', function () {
            onAnimationCompleted();
        });
    }
};
function clearAnswersFields() {
    isAidUsedInThatRound = false;
    $('.alertAboutAmountofAid').remove();
    $('#mainQuestion p').empty();
    $('#answerA p:nth-child(2)').remove();
    $('#answerB p:nth-child(2)').remove();
    $('#answerC p:nth-child(2)').remove();
    $('#answerD p:nth-child(2)').remove();
}

function onFiftyFiftyPressed() {
    if (isAidUsedInThatRound) {
        return showAlertAboutAmountOfAidOnRound()
    }
    aidAudio();
    setTimeout(function () {
        isAidUsedInThatRound = true;
        var correctAnswerId = currentQuestion.correctAnswerId;
        var currentAnswerArray = currentQuestion.answers;
        currentAnswerArray.forEach(answer => {
            if (answer.id !== correctAnswerId) {
                $("#answer" + answer.id + " p:nth-child(2)").empty();
            }
        });
        $("#getAid img:nth-child(2)").addClass('usedAidStyle');
    }, 4000)
};
function subscribeForFiftyFiftyLifeline() {
    $("#getAid img:nth-child(2)").one('click', onFiftyFiftyPressed)
}
function onFriendAidPhonePressed() {
    if (isAidUsedInThatRound) {
        return showAlertAboutAmountOfAidOnRound()
    }
    aidAudio();
    setTimeout(function () {
        isAidUsedInThatRound = true;
        $('#toWin').html('<p>Przyjaciel mówi:</p><p>To z pewnością Daniel Lepszy !</p>');
        $('#toWin').addClass('phoneStyles');
        $('#toWin p').addClass('phoheNumberStyles');
        $("#getAid img:nth-child(3)").addClass('usedAidStyle');
    }, 4000)
}
function subscribeForPhoneAFriendLifeline() {
    $("#getAid img:nth-child(3)").one('click', onFriendAidPhonePressed);
};
function showPublicVoteChart() {
    $('#toWin').html('<div class="rowsChart">' +
        '<p>A:</p><div class="percentageOfVoters" id="properA"></div></div>' +
        '<div class="rowsChart">' +
        '<p >B:</p><div class="percentageOfVoters" id="properB"></div></div>' +
        '<div class="rowsChart">' +
        '<p >C:</p><div class="percentageOfVoters" id="properC"></div></div>' +
        '<div class="rowsChart">' +
        '<p >D:</p><div class="percentageOfVoters" id="properD"></div></div>'
    );

    $('#toWin').addClass('publicVotes');
    $('#toWin .rowsChart').addClass('publicVoteChart');
    $('.rowsChart').addClass('publicVoteRowChart');
    $('.rowsChart p').addClass('publicVoteAnswers');
    $('.rowsChart .percentageOfVoters').addClass('publicVoteProperAnswer');
}

function hideQuestionAndAnswers() {
    $('#allAnswers').hide();
    $('#mainQuestion').hide();
}
function animatePublicVoteInChart() {
    var correctAnswerId = currentQuestion.correctAnswerId;
    var currentAnswerArray = currentQuestion.answers;
    currentAnswerArray.forEach(answer => {
        if (answer.id === correctAnswerId) {
            setTimeout(function () {
                $("#proper" + answer.id).addClass('properChart');
                $("#proper" + answer.id).append('<p>100%</p>');
                $("#proper" + answer.id + " p").addClass('publicVoteAnswersPercentage');
            }, 4000)
        }
    });
    $("#getAid img:nth-child(1)").addClass('usedAidStyle');
}
function showQuestionAndAnswers() {
    setTimeout(function () {

        $('#toWin').removeClass('publicVotes');
        $('#toWin .rowsChart').removeClass('publicVoteChart');
        $('#toWin').empty();
        $('#allAnswers').show();
        $('#mainQuestion').show();
    }, 9000)
}
function showAlertAboutAmountOfAidOnRound() {
    $('body').append('<div class="alertAboutAmountofAid"> <p>' +
        'Sorry, ale użyłeś już jednego koła ratunkowego w tym pytaniu</p></div>');
    $('.alertAboutAmountofAid').addClass('alertAboutAidInRound');
    $('.alertAboutAmountofAid p').addClass('alertAidContent');
}
function onPublicVotePressed() {
    if (isAidUsedInThatRound) {
        return showAlertAboutAmountOfAidOnRound()
    }
    aidAudio();
    isAidUsedInThatRound = true;
    hideQuestionAndAnswers();
    showPublicVoteChart();
    animatePublicVoteInChart();
    showQuestionAndAnswers();
}
function subscribeAskAAudienceLifeline() {
    $("#getAid img:nth-child(1)").one('click', onPublicVotePressed);
}
