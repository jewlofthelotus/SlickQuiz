(function($){
    // Setup Sexy Quiz
    $.slickQuiz = function(element, options) {
        var $element = $(element),
             element = element;

        var plugin = this;

        plugin.config = $.extend( {
            checkAnswerText:  'Check My Answer!',
            nextQuestionText: 'Next &raquo;',
            backButtonText: '',
            randomSort: false
        }, options);

        var selector = $(element).attr('id');

        var triggers = {
            starter:         '#' + selector + ' .startQuiz',
            checker:         '#' + selector + ' .checkAnswer',
            next:            '#' + selector + ' .nextQuestion',
            back:            '#' + selector + ' .backToQuestion'
        }

        var targets = {
            quizName:        '#' + selector + ' .quizName',
            quizArea:        '#' + selector + ' .quizArea',
            quizResults:     '#' + selector + ' .quizResults',
            quizResultsCopy: '#' + selector + ' .quizResultsCopy',
            quizHeader:      '#' + selector + ' .quizHeader',
            quizScore:       '#' + selector + ' .quizScore',
            quizLevel:       '#' + selector + ' .quizLevel'
        }

        // Set via json option or quizJSON variable (see slickQuiz-config.js)
        var quizValues = (plugin.config.json ? plugin.config.json : typeof quizJSON != 'undefined' ? quizJSON : null);

        var questions = plugin.config.randomSort ?
                        quizValues.questions.sort(function() { return (Math.round(Math.random())-0.5); }) :
                        quizValues.questions;

        var levels = {
            1: quizValues.info.level1, // 80-100%
            2: quizValues.info.level2, // 60-79%
            3: quizValues.info.level3, // 40-59%
            4: quizValues.info.level4, // 20-39%
            5: quizValues.info.level5  // 0-19%
        }

        // Count the number of questions
        var questionCount = questions.length;

        plugin.method = {
            // Sets up the questions and answers based on above array
            setupQuiz: function() {
                $(targets.quizName).hide().html(quizValues.info.name).fadeIn(1000);
                $(targets.quizHeader).hide().prepend(quizValues.info.main).fadeIn(1000);
                $(targets.quizResultsCopy).append(quizValues.info.results);

                // Setup questions
                quiz  = $('<ol class="questions"></ol>');
                count = 1;

                // Loop through questions object
                for (i in questions) {
                    question = questions[i];

                    questionHTML = $('<li class="question" id="question' + (count - 1) + '"></li>');
                    questionHTML.append('<div class="questionCount">Question <span class="current">' + count + '</span> of <span class="total">' + questionCount + '</span></div>');
                    questionHTML.append('<h3>' + count + '. ' + question.q + '</h3>');

                    // Count the number of true values
                    truths = 0;
                    for (i in question.a) {
                        answer = question.a[i];
                        if (answer.correct) {
                            truths++;
                        }
                    };

                    // prepare a name for the answer inputs based on the question
                    inputName  = question.q.replace(/ /g,'');

                    // Now let's append the answers with checkboxes or radios depending on truth count
                    answerHTML = $('<ul class="answers"></ul>');

                    answers = plugin.config.randomSort ?
                        question.a.sort(function() { return (Math.round(Math.random())-0.5); }) :
                        question.a;

                    for (i in answers) {
                        answer = answers[i];
                        optionId = inputName + i.toString();

                        // If question has >1 true answers, use checkboxes; otherwise, radios
                        var input = '<input id="' + optionId + '" name="' + inputName 
                            + '" type="' + (truths > 1 ? 'checkbox' : 'radio') + '"></input>';
    

                        var inlineBlock = '';
                        if ($.browser.msie && parseInt($.browser.version, 10) < 8)
                        {
                            // IE versions before IE 8 don't support inline-block:
                            inlineBlock = 'display: inline; zoom:1;';
                        }
                        else
                        {
                            inlineBlock = 'display: inline-block;';
                        }
                        var optionLabel = '<label style="min-width: 100px;' + inlineBlock + '" for="' + optionId + '"><span>' + answer.option + '</span></label>';

                        var answerContent = $('<li></li>')
                            .append(input)
                            .append(optionLabel);
                        answerHTML.append(answerContent)
                    };

                    // Append answers to question
                    questionHTML.append(answerHTML);

                    // Now let's append the correct / incorrect response messages
                    responseHTML = $('<ul class="responses"></ul>');
                    responseHTML.append('<li class="correct">' + question.correct + '</li>');
                    responseHTML.append('<li class="incorrect">' + question.incorrect + '</li>');

                    // Append responses to question
                    questionHTML.append(responseHTML);

                    // Appends check answer / back / next question buttons
                    if (plugin.config.backButtonText && plugin.config.backButtonText != '') {
                        questionHTML.append('<a href="" class="button backToQuestion">' + plugin.config.backButtonText + '</a>');
                    }
                    questionHTML.append('<a href="" class="button nextQuestion">' + plugin.config.nextQuestionText + '</a>');
                    questionHTML.append('<a href="" class="button checkAnswer">' + plugin.config.checkAnswerText + '</a>');

                    // Append question & answers to quiz
                    quiz.append(questionHTML);

                    count++;
                };

                // Add the quiz content to the page
                $(targets.quizArea).append(quiz);

                // Toggle the start button
                $(triggers.starter).fadeIn(500);
            },

            // Starts the quiz (hides start button and displays first question)
            startQuiz: function(startButton) {
                $(startButton).fadeOut(300, function(){
                    firstQuestion = $('#' + selector + ' .questions li').first();
                    if (firstQuestion.length) {
                        firstQuestion.fadeIn(500);
                    }
                });
            },

            // Validates the response selection(s), displays explanations & next question button
            checkAnswer: function(checkButton) {
                questionLI   = $(checkButton).parent();
                answerInputs = questionLI.find('input:checked');
                answers      = questions[parseInt(questionLI.attr('id').replace(/(question)/, ''))].a;

                // Collect the true answers needed for a correct response
                trueAnswers = [];
                for (i in answers) {
                    answer = answers[i];

                    if (answer.correct) {
                        trueAnswers.push(answer.option);
                    }
                }

                // Collect the answers submitted
                selectedAnswers = []
                answerInputs.each( function() {
                    inputValue = $(this).parent().find("label span").html();
                    selectedAnswers.push(inputValue);
                });

                // Verify all true answers (and no false ones) were submitted
                correctResponse = plugin.method.compareAnswers(trueAnswers, selectedAnswers);

                // Toggle responses based on submission
                questionLI.find('.answers').hide();
                questionLI.find('.responses').show();

                if (correctResponse) {
                    questionLI.find('.correct').fadeIn(300);
                    questionLI.addClass('correctResponse');
                } else {
                    questionLI.find('.incorrect').fadeIn(300);
                }

                $(checkButton).hide();
                questionLI.find('.nextQuestion').fadeIn(300);
                questionLI.find('.backToQuestion').fadeIn(300);
            },

            // Moves to the next question OR completes the quiz if on last question
            nextQuestion: function(nextButton) {
                nextQuestion = $(nextButton).parent().next('.question');

                if (nextQuestion.length) {
                    $(nextButton).parent().fadeOut(300, function(){
                        nextQuestion.find('.backToQuestion').show().end().fadeIn(500);
                    });
                } else {
                    plugin.method.completeQuiz();
                }
            },

            // Go back to the last question
            backToQuestion: function(backButton) {
                questionLI = $(backButton).parent();
                answers    = questionLI.find('.answers');

                // Back to previous question
                if (answers.css('display') === 'block' ) {
                    prevQuestion = questionLI.prev('.question');

                    questionLI.fadeOut(300, function() {
                        prevQuestion.removeClass('correctResponse');
                        prevQuestion.find('.responses, .responses li').hide()
                        prevQuestion.find('.answers').show();
                        prevQuestion.find('.checkAnswer').show();
                        prevQuestion.find('.nextQuestion').hide();

                        if (prevQuestion.attr('id') != 'question0') {
                            prevQuestion.find('.backToQuestion').show();
                        } else {
                            prevQuestion.find('.backToQuestion').hide();
                        }

                        prevQuestion.fadeIn(500);
                    });

                // Back to question from responses
                } else {
                    questionLI.find('.responses').fadeOut(300, function(){
                        questionLI.removeClass('correctResponse');
                        questionLI.find('.responses li').hide();
                        answers.fadeIn(500);
                        questionLI.find('.checkAnswer').fadeIn(500);
                        questionLI.find('.nextQuestion').hide();

                        // if question is first, don't show back button on question
                        if (questionLI.attr('id') != 'question0') {
                            questionLI.find('.backToQuestion').show();
                        } else {
                            questionLI.find('.backToQuestion').hide();
                        }
                    });
                }
            },

            // Hides all questions, displays the final score and some conclusive information
            completeQuiz: function() {
                score = $('#' + selector + ' .correctResponse').length;
                level = levels[plugin.method.calculateLevel(score)];

                $(targets.quizScore + ' span').html(score + ' / ' + questionCount);
                $(targets.quizLevel + ' span').html(level);

                $(targets.quizArea).fadeOut(300, function() {
                    $(targets.quizResults).fadeIn(500);
                });
            },

            // Compares selected responses with true answers, returns true if they match exactly
            compareAnswers: function(trueAnswers, selectedAnswers) {
                if (trueAnswers.length != selectedAnswers.length) {
                    return false;
                }

                trueAnswers = trueAnswers.sort();
                selectedAnswers = selectedAnswers.sort();

                for (var i = 0, l = trueAnswers.length; i < l; i++) {
                    if (trueAnswers[i] !== selectedAnswers[i]) {
                        return false;
                    }
                }

                return true;
            },

            // Calculates knowledge level based on number of correct answers
            calculateLevel: function(correctAnswers) {
                percent = correctAnswers / questionCount;

                if (plugin.method.inRange(0, 0.20, percent)) {
                    level = 5;
                } else if (plugin.method.inRange(0.21, 0.40, percent)) {
                    level = 4;
                } else if (plugin.method.inRange(0.41, 0.60, percent)) {
                    level = 3;
                } else if (plugin.method.inRange(0.61, 0.80, percent)) {
                    level = 2;
                } else if (plugin.method.inRange(0.81, 1.00, percent)) {
                    level = 1;
                }

                return level;
            },

            // Determines if percentage of correct values is within a level range
            inRange: function(start, end, value) {
                if (value >= start && value <= end) {
                    return true;
                }
                return false;
            }
        }

        plugin.init = function() {
            // Setup quiz
            plugin.method.setupQuiz();

            // Bind "start" button
            $(triggers.starter).bind('click', function(e) {
                e.preventDefault();
                plugin.method.startQuiz(this);
            });

            // Using 'live' instead of 'bind' since these triggers are generated
            // on the fly in setupQuiz and thus won't be available on page load

            // Bind "submit answer" button
            $(triggers.checker).live('click', function(e) {
                e.preventDefault();
                plugin.method.checkAnswer(this);
            });

            // Bind "back" button
            $(triggers.back).live('click', function(e) {
                e.preventDefault();
                plugin.method.backToQuestion(this);
            });

            // Bind "next question" button
            $(triggers.next).live('click', function(e) {
                e.preventDefault();
                plugin.method.nextQuestion(this);
            });
        }

        plugin.init();
    }

    $.fn.slickQuiz = function(options) {
        return this.each(function() {
            if (undefined == $(this).data('slickQuiz')) {
                var plugin = new $.slickQuiz(this, options);
                $(this).data('slickQuiz', plugin);
            }
        });
    }
})(jQuery);
