//Pseudocode for Raider Trivia Game

//Display questions with a timer

// display options

//capture results

//evaluate result for correct or incorrect

// update counter for right and wrong answer

// dispaly results

// repeat the above till all questions run out

// display final result

// options to restart game

// varibales i need

// hold the questions

$.fn.trivia = function() { //$ binds a function to the document.ready event.

    var ThisThing = this; //identifies the choice selected
    
    ThisThing.userPick = null; // capturs the select answer
    
    ThisThing.answers = { //keeps track of the result
    
    correct: 0,
    
    incorrect: 0
    
    };
    
    ThisThing.images = null; //
    
    ThisThing.count = 30; // timer for answer countdown
    
    ThisThing.current = 0; // start array for the question
    
    ThisThing.questions = [ {
    
    question: "Who is the Raiders all-time scoring leader ? ",
    
    choices: ["Sebastian Janikowski", "George Blanda", "Tim Brown", "Jerry Rice"],
    
    correct: 0
    
    }, { // object for questions - target 8 questions ..
    
    question: "Which Raider won the Heisman, Super Bowl MVP and NFL MVP? ",
    
    choices: ["Marcus Allen", "Dave Casper", "Kenny Stabler", "Tim Brown"],
    
    correct: 0
    
    },
    
    {
    
    question: "Which Raider QB has won the most Super Bowls?",
    
    choices: ["Rich Gannon", "Kenny Stabler", "Jim Plunkett", "Rusty Hilger"],
    
    correct: 2
    
    },
    
    {
    
    question: "Which Raider WR is the all-time receptions leader?",
    
    choices: ["Jerry Rice", "Cliff Branch", "Fred Biletnikoff", "Warren Wells "],
    
    correct: 2
    
    },
    
    {
    
    question: "What was the original name of the Raiders?",
    
    choices: ["Senors", "Invaders", "Gladiators", "Regulators"],
    
    correct: 0
    
    },
    
    {
    
    question: "Raider head coach with multiple Super Bowl Wins?",
    
    choices: ["John Madden", "Al Davis", "Jon Gruden", "Tom Flores"],
    
    correct: 3
    
    },
    
    {
    
    question: "Only Raider to be on all 3 Super Bowl winning teams?",
    
    choices: ["Lester Hayes", "Cliff Branch", "Howie Long", "Jack Tatum"],
    
    correct: 1
    
    },
    
    {
    
    question: "Which player went on to lead the NFLPA? " ,
    
    choices: ["Gene Upshaw", "Matt Millen", "Ted Hendricks", "John Matusak"],
    
    correct: 0
    
    },
    
    ];
    
    ThisThing.ask = function() {
    
    if (ThisThing.questions[ThisThing.current]) { //
    
    $("#timer").html("Time remaining: " + "00:" + ThisThing.count + " secs");
    
    $("#question_div").html(ThisThing.questions[ThisThing.current].question);
    
    var choicesArr = ThisThing.questions[ThisThing.current].choices;
    
    var buttonsArr = [];
    
    for (var i = 0; i < choicesArr.length; i++) {
    
    var button = $('<button>');
    
    button.text(choicesArr[i]);
    
    button.attr('data-id', i);
    
    $('#choices_div').append(button);
    
    }
    
    window.triviaCounter = setInterval(ThisThing.timer, 1000); // countdown in one sec intervals
    
    } else {
    
    $('.card-body').append($('<div />', {
    
    text: 'Unanswered: ' + (
    
    ThisThing.questions.length - (ThisThing.answers.correct + ThisThing.answers.incorrect)),
    
    class: 'result'
    
    }));
    
    $('#start_button').text('Restart').appendTo('.card-body').show();
    
    }
    
    };
    
    ThisThing.timer = function() { //
    
    ThisThing.count--; // countdown from 20 seconds
    
    if (ThisThing.count <= 0) {
    
    setTimeout(function() { // Display an alert box after ThisThing.next + 1000 (in ThisThing.next func) :
    
    ThisThing.nextQ();
    
    });
    
    } else {
    
    $("#timer").html("Time remaining: " + "00:" + ThisThing.count + " secs");
    
    }
    
    };
    
    ThisThing.nextQ = function() {
    
    ThisThing.current++;
    
    clearInterval(window.triviaCounter); //stops the timer
    
    ThisThing.count = 30;
    
    $('#timer').html("");
    
    setTimeout(function() {
    
    ThisThing.cleanUp();
    
    ThisThing.ask();
    
    }, 3000)
    
    };
    
    ThisThing.cleanUp = function() {
    
    $('div[id]').each(function(item) {
    
    $(this).html('');
    
    });
    
    $('.correct').html('Correct answers: ' + ThisThing.answers.correct);
    
    $('.incorrect').html('Incorrect answers: ' + ThisThing.answers.incorrect);
    
    };
    
    ThisThing.answer = function(correct) {
    
    var string = correct ? 'correct' : 'incorrect';
    
    ThisThing.answers[string]++;
    
    $('.' + string).html(string + ' answers: ' + ThisThing.answers[string]);
    
    };
    
    return ThisThing;
    
    };
    
    // Trivia Function ends
    
    var Trivia;
    $(document).ready(function(){
    $("#start_button").click(function() {
    
    $(this).hide();
    
    $('.result').remove();
    
    Trivia = new $(window).trivia();
    
    Trivia.ask();
    
    });
    
    $('#choices_div').on('click', 'button', function(e) {
    
    var userPick = $(this).data("id"),
    
    ThisThing = Trivia || $(window).trivia(),
    
    index = ThisThing.questions[ThisThing.current].correct,
    
    correct = ThisThing.questions[ThisThing.current].choices[index];
    
    if (userPick !== index) {
    
    $('#choices_div').text("Wrong Answer! The correct answer was: " + correct);
    
    ThisThing.answer(false);
    
    } else {
    
    $('#choices_div').text("Correct!!! The correct answer was: " + correct);
    
    ThisThing.answer(true);
    
    }
    
    ThisThing.nextQ();
    
    });});