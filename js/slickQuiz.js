(function($){
    // Setup Sexy Quiz
    $.slickQuiz = function(element, options) {
        var $element = $(element),
             element = element;

        var plugin = this;
        plugin.config = {}
        plugin.config = $.extend({}, options);

        var triggers = {
            starter:        '.startQuiz',
            checker:        '.checkAnswer',
            next:           '.nextQuestion'
        }

        var targets = {
            quizName:        '.quizName',
            quizArea:        '.quizArea',
            quizResults:     '.quizResults',
            quizResultsCopy: '.quizResultsCopy',
            quizHeader:      '.quizHeader',
            quizScore:       '.quizScore',
            quizLevel:       '.quizLevel'
        }

        // Set via json option or quizJSON variable (see slickQuiz-config.js)
        var quizValues = (plugin.config.json ? plugin.config.json : typeof quizJSON != 'undefined' ? quizJSON : null);

        var questions = quizValues.questions;

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
                    for (i in question.a) {
                        answer = question.a[i];

                        // If question has >1 true answers, use checkboxes; otherwise, radios
                        input = '<input type="' + (truths > 1 ? 'checkbox' : 'radio') + '" name="' + inputName + '" /> ';

                        answerHTML.append('<li>' + input + '<span>' + answer.option + '</span></li>')
                    };

                    // Append answers to question
                    questionHTML.append(answerHTML);

                    // Now let's append the correct / incorrect response messages
                    responseHTML = $('<ul class="responses"></ul>');
                    responseHTML.append('<li class="correct">' + question.correct + '</li>');
                    responseHTML.append('<li class="incorrect">' + question.incorrect + '</li>');

                    // Append responses to question
                    questionHTML.append(responseHTML);

                    // Appends check answer / next question buttons
                    questionHTML.append('<a href="" class="button checkAnswer">Check My Answer!</a>');
                    questionHTML.append('<a href="" class="button nextQuestion">Next &raquo;</a>');

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
                    firstQuestion = $('.questions li').first();
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
                    inputValue = $(this).next('span').html();
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
                $(checkButton).next('.nextQuestion').fadeIn(300);
            },

            // Moves to the next question OR completes the quiz if on last question
            nextQuestion: function(nextButton) {
                nextQuestion = $(nextButton).parent().next('.question');

                if (nextQuestion.length) {
                    $(nextButton).parent().fadeOut(300, function(){
                        nextQuestion.fadeIn(500);
                    });
                } else {
                    plugin.method.completeQuiz();
                }
            },

            // Hides all questions, displays the final score and some conclusive information
            completeQuiz: function() {
                score = $('.correctResponse').length;
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