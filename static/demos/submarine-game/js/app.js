var scrollFunctions = {

	parallaxSeaweed: function(st) {
		var $layers = $('.parallax__layer'),
			offsetIndex = 1;

		$layers.each(function(){
			var $layer = $(this),
				num = (st / 20) / offsetIndex,
				offset = num + "px";
			// Move each layer of seaweed at different speeds to other layers
			$layer.css('bottom', offset);
			offsetIndex++;
		});

	},
	moveSub: function(percent) {
		var $sub = $('.submarine');
		$sub.css('left', percent);
	}

}



// QUIZ ===================================================================================
function Quiz(questions) {
	this.score = 0;
	this.questions = questions;     
	this.currentQuestionIndex = 0;
	this.isGameOver = false;
}

Quiz.prototype.guess = function(guess, button) {
	// Ask the question object if the guess is correct
	if(this.getCurrentQuestion().isCorrectAnswer(guess)) {
		this.score++;
		// Turn the button green for correct guess
		button.css('border', 'rgb(50, 200, 80) 3px solid')
		button.css('background', 'rgba(50, 200, 80, .7)')
	} else {
		// Turn the button red for incorrect guess
		button.css('border', 'rgb(200, 50, 80) 3px solid')
		button.css('background', 'rgba(200, 50, 80, .7)')
	}
	this.currentQuestionIndex++;
};

Quiz.prototype.getCurrentQuestion = function() {
	return this.questions[this.currentQuestionIndex]; 
};


Quiz.prototype.hasEnded = function() {
	return this.currentRoundIndex >= this.questions.length;
};


// QUESTION ===================================================================================
function Question(text, choices, answer) {
	this.text = text;
	this.choices = choices;
	this.answer = answer;
}
//Question should be the only object which determines if an answer is correct or not
Question.prototype.isCorrectAnswer = function (choice) {
	return this.answer === choice;
};



// User Interface ===================================================================================
var quizUI = {
    displayNext: function () {
        this.displayQuestion();
        this.displayChoices();
    },
    displayQuestion: function() {
        this.populateIdWithHTML("#question", quiz.getCurrentQuestion().text);
    },
    displayChoices: function() {
        var choices = quiz.getCurrentQuestion().choices;

        for(var i = 0; i < choices.length; i++) {
        	var $button = $('<button class="quiz__choice">')
        		.text(choices[i])
        		.attr('id', "guess" + i)
        		.appendTo($('.quiz__choices'));

            this.guessHandler("#guess" + i, choices[i]);
        }
        // Show the quiz panel
        this.showQuizPanel();
    },
    displayScore: function() {

    	// Validation: if HTML hasn't been generated already
    	if (!quiz.isGameOver) {

    		// Clear the last question
    		$('.quiz__question').text('');
    		// Generate html for game over display
	        var $h1 = $('<h1>')
	        	.text('You found your way to the bottom!')
	        	.appendTo($('.quiz__panel')),
	        	$h2 = $('<h2>')
	        	.text('Your score is: ' + quiz.score)
	        	.appendTo($('.quiz__panel'));
	        // Show the quiz panel
	        this.showQuizPanel();

	        // Prepare a new game
	        this.activateNewGame();

	        // Stop function from repeating
	        quiz.isGameOver = true;
    	}
    	
    },
    activateNewGame: function() {
    	// Make the button available to viewer
    	var $button = $('<button class="quiz__choice retry">')
    		.text('Play again')
    		.appendTo($('.quiz__panel'))
    		.click(function(){
    			quizUI.hideQuizPanel();
	    		// Write over the previous quiz with a new one GLOBAL VARIABLES
	    		quiz = new Quiz(questions);
	    		// Take user back to the top
	    		$(window).scrollTop(0);
	    		// All animals back to start positions
	    		$('.creature').each(function(){
	    			$(this).removeClass('past');
	    		});

	    		// Remove end titles/retry button
	    		$('.quiz__panel h1, .quiz__panel h2').remove();
	    		$(this).remove(); 

	    		// Allow score to show for new game
		        quiz.isGameOver = false;
	    	});

    },
    showQuizPanel: function() {
    	$('.quiz__panel').css('opacity', '1');
    },
    hideQuizPanel: function() {
    	$('.quiz__panel').css('opacity', '0');
    },
    suspendScrolling: function () {
        $('body').css('overflow-y', 'hidden');
    },
    iosScrollDisable: function () {
        // disable touch scroll For IOS devices
        $('body').on('touchmove', function (e) {
            e.preventDefault()
        });
    },
    iosAllowScroll: function () {
        // Unbind disabled touch scroll
        $('body').off('touchmove');
    },
    populateIdWithHTML: function(id, text) {
        $(id).text(text);
    },
    guessHandler: function(id, guess) {
        var button = $(id);
        button.click(function(){
        	quiz.guess(guess, $(this));
            
            // After 2 seconds
            setTimeout(function(){
            	// Remove the buttons from previous questions
            	$('.quiz__choice').each(function(){
	            	$(this).remove();
	            });

	            // Hide the quiz panel
	            quizUI.hideQuizPanel();

            	// Allow scrolling again
            	$('body').css('overflow-y', 'auto');
                quizUI.iosAllowScroll();
            	$('.quiz__arrow').addClass('visible');
	            
            },2000);
            
            
        }); 
    },
   
};



// Provide the questions, choices and answers
var questions = [
  new Question("I am a sea-horse, I prefer to live in the seagrass. There are 54 different types of sea horse. Am I a good swimmer?", ["Yes", "No"], "No"),
  new Question("We are called turtles. We have a protective shell. Where do you reckon I lay my eggs?", ["Beach", "Underwater", "Forest"], "Beach"),
  new Question("We're called clown fish. We have 30 species. What's my maximum size?", ["60cm", "18cm", "100cm"], "18cm"),
  new Question("I am a humpback whale, I sing a different song to the whales in the next ocean. Which ocean is my home?", ["Indian and Atlantic", "Pacific and Southern", "All of these"], "All of these"),
  new Question("Welcome to the depths, friend. Us frilled sharks live at the bottom. Do you know my favourite food?", ["Squid", "Humans!", "Turtles"], "Squid")
];

var quiz = new Quiz(questions);




var docHt = $(document).height(),
	winHt = $(window).height(),

	lastSt = 0;

	$seaContainer = $('.sea__container');

$(document).scroll(function(){
	
	// Scroll positions top and bottom
	var	st = $(this).scrollTop(),
		sb = st + winHt,

		scrollMax = docHt - winHt,
		scrollPcent, 
		scrollCss;


	// Detect upscroll/downscroll
	if (st > lastSt) {
		// Downscroll, hide down-pointing guide arrow
		$('.quiz__arrow').removeClass('visible');
	} else {
		// Upscroll, show down-pointing guide arrow
		$('.quiz__arrow').addClass('visible');
	}
	lastSt = st;
	

	// Parallax effect on the seaweed
	scrollFunctions.parallaxSeaweed(st);

	// Get scroll level as a percentage
	scrollPcent = (st / scrollMax) * 100;

	// Slide the submarine according to scroll position
	scrollCss = scrollPcent + '%';
	scrollFunctions.moveSub(scrollCss);


	// Check the user scroll against position of creatures
	$('.creature').each(function(){

		var $this = $(this),
			isscrolledPast = sb >= $this.offset().top + 400,
			isAlreadyScrolled = $this.hasClass('past');

		// If user scrolled past a creature not already scrolled past
		if (isscrolledPast && !isAlreadyScrolled) {
			// Suspend user scroll and make the creature scrolled
			quizUI.suspendScrolling();
			quizUI.iosScrollDisable();
			$this.addClass('past');

			// Show the next question
			quizUI.displayNext();

		}
		
	});
	
	// If the user reaches beyond 90% scroll	
	if (scrollPcent >= 90) {
		quizUI.displayScore();
	}
});
//# sourceMappingURL=app.js.map
