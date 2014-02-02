/*!
 * SlickQuiz jQuery Plugin
 * http://github.com/jewlofthelotus/SlickQuiz
 *
 * @updated February 2, 2014
 * @version 1.5.13
 *
 * @author Julie Cameron - http://www.juliecameron.com
 * @copyright (c) 2013 Quicken Loans - http://www.quickenloans.com
 * @license MIT
 */

(function($){
    $.slickQuiz = function(element, options) {
        var plugin   = this,
            $element = $(element),
            _element = '#' + $element.attr('id'),

            defaults = {
                checkAnswerText:  'Check My Answer!',
                nextQuestionText: 'Next &raquo;',
                backButtonText: '',
                tryAgainText: '',
                skipStartButton: false,
                numberOfQuestions: null,
                randomSortQuestions: false,
                randomSortAnswers: false,
                preventUnanswered: false,
                perQuestionResponseMessaging: true,
                completionResponseMessaging: false
            },

            // Class Name Strings (Used for building quiz and for selectors)
            questionCountClass     = 'questionCount',
            questionGroupClass     = 'questions',
            questionClass          = 'question',
            answersClass           = 'answers',
            responsesClass         = 'responses',
            correctClass           = 'correctResponse',
            correctResponseClass   = 'correct',
            incorrectResponseClass = 'incorrect',
            checkAnswerClass       = 'checkAnswer',
            nextQuestionClass      = 'nextQuestion',
            backToQuestionClass    = 'backToQuestion',
            tryAgainClass          = 'tryAgain',

            // Sub-Quiz / Sub-Question Class Selectors
            _questionCount         = '.' + questionCountClass,
            _questions             = '.' + questionGroupClass,
            _question              = '.' + questionClass,
            _answers               = '.' + answersClass,
            _responses             = '.' + responsesClass,
            _correct               = '.' + correctClass,
            _correctResponse       = '.' + correctResponseClass,
            _incorrectResponse     = '.' + incorrectResponseClass,
            _checkAnswerBtn        = '.' + checkAnswerClass,
            _nextQuestionBtn       = '.' + nextQuestionClass,
            _prevQuestionBtn       = '.' + backToQuestionClass,
            _tryAgainBtn           = '.' + tryAgainClass,

            // Top Level Quiz Element Class Selectors
            _quizStarter           = _element + ' .startQuiz',
            _quizName              = _element + ' .quizName',
            _quizArea              = _element + ' .quizArea',
            _quizResults           = _element + ' .quizResults',
            _quizResultsCopy       = _element + ' .quizResultsCopy',
            _quizHeader            = _element + ' .quizHeader',
            _quizScore             = _element + ' .quizScore',
            _quizLevel             = _element + ' .quizLevel',

            // Top Level Quiz Element Objects
            $quizStarter           = $(_quizStarter),
            $quizName              = $(_quizName),
            $quizArea              = $(_quizArea),
            $quizResults           = $(_quizResults),
            $quizResultsCopy       = $(_quizResultsCopy),
            $quizHeader            = $(_quizHeader),
            $quizScore             = $(_quizScore),
            $quizLevel             = $(_quizLevel)
        ;


        // Reassign user-submitted deprecated options
        var depMsg = '';

        if (options && typeof options.disableNext != 'undefined') {
            if (typeof options.preventUnanswered == 'undefined') {
                options.preventUnanswered = options.disableNext;
            }
            depMsg += 'The \'disableNext\' option has been deprecated, please use \'preventUnanswered\' in it\'s place.\n\n';
        }

        if (options && typeof options.disableResponseMessaging != 'undefined') {
            if (typeof options.preventUnanswered == 'undefined') {
                options.perQuestionResponseMessaging = options.disableResponseMessaging;
            }
            depMsg += 'The \'disableResponseMessaging\' option has been deprecated, please use' +
                      ' \'perQuestionResponseMessaging\' and \'completionResponseMessaging\' in it\'s place.\n\n';
        }

        if (options && typeof options.randomSort != 'undefined') {
            if (typeof options.randomSortQuestions == 'undefined') {
                options.randomSortQuestions = options.randomSort;
            }
            if (typeof options.randomSortAnswers == 'undefined') {
                options.randomSortAnswers = options.randomSort;
            }
            depMsg += 'The \'randomSort\' option has been deprecated, please use' +
                      ' \'randomSortQuestions\' and \'randomSortAnswers\' in it\'s place.\n\n';
        }

        if (depMsg !== '') {
            if (typeof console != 'undefined') {
                console.warn(depMsg);
            } else {
                alert(depMsg);
            }
        }
        // End of deprecation reassignment


        plugin.config = $.extend(defaults, options);

        // Set via json option or quizJSON variable (see slickQuiz-config.js)
        var quizValues = (plugin.config.json ? plugin.config.json : typeof quizJSON != 'undefined' ? quizJSON : null);

        // Get questions, possibly sorted randomly
        var questions = plugin.config.randomSortQuestions ?
                        quizValues.questions.sort(function() { return (Math.round(Math.random())-0.5); }) :
                        quizValues.questions;

        // Count the number of questions
        var questionCount = questions.length;

        // Select X number of questions to load if options is set
        if (plugin.config.numberOfQuestions && questionCount >= plugin.config.numberOfQuestions) {
            questions = questions.slice(0, plugin.config.numberOfQuestions);
            questionCount = questions.length;
        }

        plugin.method = {
            // Sets up the questions and answers based on above array
            setupQuiz: function() {
                $quizName.hide().html(quizValues.info.name).fadeIn(1000);
                $quizHeader.hide().prepend(quizValues.info.main).fadeIn(1000);
                $quizResultsCopy.append(quizValues.info.results);

                // add retry button to results view, if enabled
                if (plugin.config.tryAgainText && plugin.config.tryAgainText !== '') {
                    $quizResultsCopy.append('<p><a class="button ' + tryAgainClass + '" href="#">' + plugin.config.tryAgainText + '</a></p>');
                }

                // Setup questions
                var quiz  = $('<ol class="' + questionGroupClass + '"></ol>'),
                    count = 1;

                // Loop through questions object
                for (i in questions) {
                    if (questions.hasOwnProperty(i)) {
                        var question = questions[i];

                        var questionHTML = $('<li class="' + questionClass +'" id="question' + (count - 1) + '"></li>');
                        questionHTML.append('<div class="' + questionCountClass + '">Question <span class="current">' + count + '</span> of <span class="total">' + questionCount + '</span></div>');
                        questionHTML.append('<h3>' + count + '. ' + question.q + '</h3>');

                        // Count the number of true values
                        var truths = 0;
                        for (i in question.a) {
                            if (question.a.hasOwnProperty(i)) {
                                answer = question.a[i];
                                if (answer.correct) {
                                    truths++;
                                }
                            }
                        }

                        // Now let's append the answers with checkboxes or radios depending on truth count
                        var answerHTML = $('<ul class="' + answersClass + '"></ul>');

                        // Get the answers
                        var answers = plugin.config.randomSortAnswers ?
                            question.a.sort(function() { return (Math.round(Math.random())-0.5); }) :
                            question.a;

                        // prepare a name for the answer inputs based on the question
                        var selectAny  = question.select_any ? question.select_any : false,
                            inputName  = 'question' + (count - 1),
                            inputType  = (truths > 1 && !selectAny ? 'checkbox' : 'radio');

                        for (i in answers) {
                            if (answers.hasOwnProperty(i)) {
                                answer   = answers[i],
                                optionId = inputName + '_' + i.toString();

                                // If question has >1 true answers and is not a select any, use checkboxes; otherwise, radios
                                var input = '<input id="' + optionId + '" name="' + inputName +
                                            '" type="' + inputType + '" /> ';

                                var optionLabel = '<label for="' + optionId + '">' + answer.option + '</label>';

                                var answerContent = $('<li></li>')
                                    .append(input)
                                    .append(optionLabel);
                                answerHTML.append(answerContent);
                            }
                        }

                        // Append answers to question
                        questionHTML.append(answerHTML);

                        // If response messaging is NOT disabled, add it
                        if (plugin.config.perQuestionResponseMessaging || plugin.config.completionResponseMessaging) {
                            // Now let's append the correct / incorrect response messages
                            var responseHTML = $('<ul class="' + responsesClass + '"></ul>');
                            responseHTML.append('<li class="' + correctResponseClass + '">' + question.correct + '</li>');
                            responseHTML.append('<li class="' + incorrectResponseClass + '">' + question.incorrect + '</li>');

                            // Append responses to question
                            questionHTML.append(responseHTML);
                        }

                        // Appends check answer / back / next question buttons
                        if (plugin.config.backButtonText && plugin.config.backButtonText !== '') {
                            questionHTML.append('<a href="#" class="button ' + backToQuestionClass + '">' + plugin.config.backButtonText + '</a>');
                        }

                        // If we're not showing responses per question, show next question button and make it check the answer too
                        if (!plugin.config.perQuestionResponseMessaging) {
                            questionHTML.append('<a href="#" class="button ' + nextQuestionClass + ' ' + checkAnswerClass + '">' + plugin.config.nextQuestionText + '</a>');
                        } else {
                            questionHTML.append('<a href="#" class="button ' + nextQuestionClass + '">' + plugin.config.nextQuestionText + '</a>');
                            questionHTML.append('<a href="#" class="button ' + checkAnswerClass + '">' + plugin.config.checkAnswerText + '</a>');
                        }

                        // Append question & answers to quiz
                        quiz.append(questionHTML);

                        count++;
                    }
                }

                // Add the quiz content to the page
                $quizArea.append(quiz);

                // Toggle the start button OR start the quiz if start button is disabled
                if (plugin.config.skipStartButton || $quizStarter.length == 0) {
                    $quizStarter.hide();
                    plugin.method.startQuiz(this);
                } else {
                    $quizStarter.fadeIn(500);
                }
            },

            // Starts the quiz (hides start button and displays first question)
            startQuiz: function() {
                function start() {
                    var firstQuestion = $(_element + ' ' + _questions + ' li').first();
                    if (firstQuestion.length) {
                        firstQuestion.fadeIn(500);
                    }
                }

                if (plugin.config.skipStartButton || $quizStarter.length == 0) {
                    start();
                } else {
                    $quizStarter.fadeOut(300, function(){
                        start();
                    });
                }
            },

            // Resets (restarts) the quiz (hides results, resets inputs, and displays first question)
            resetQuiz: function(startButton) {
                $quizResults.fadeOut(300, function() {
                    $(_element + ' input').prop('checked', false).prop('disabled', false);

                    $quizLevel.attr('class', 'quizLevel');
                    $(_element + ' ' + _correct).removeClass(correctClass);

                    $(_element + ' ' + _question          + ',' +
                      _element + ' ' + _responses         + ',' +
                      _element + ' ' + _correctResponse   + ',' +
                      _element + ' ' + _incorrectResponse + ',' +
                      _element + ' ' + _nextQuestionBtn   + ',' +
                      _element + ' ' + _prevQuestionBtn
                    ).hide();

                    $(_element + ' ' + _questionCount + ',' +
                      _element + ' ' + _answers + ',' +
                      _element + ' ' + _checkAnswerBtn
                    ).show();

                    $quizArea.append($(_element + ' ' + _questions)).show();

                    plugin.method.startQuiz($quizResults);
                });
            },

            // Validates the response selection(s), displays explanations & next question button
            checkAnswer: function(checkButton) {
                var questionLI    = $($(checkButton).parents(_question)[0]),
                    answerInputs  = questionLI.find('input:checked'),
                    questionIndex = parseInt(questionLI.attr('id').replace(/(question)/, ''), 10),
                    answers       = questions[questionIndex].a,
                    selectAny     = questions[questionIndex].select_any ? questions[questionIndex].select_any : false;

                // Collect the true answers needed for a correct response
                var trueAnswers = [];
                for (i in answers) {
                    if (answers.hasOwnProperty(i)) {
                        var answer = answers[i];

                        if (answer.correct) {
                            trueAnswers.push($('<div />').html(answer.option).text());
                        }
                    }
                }

                // NOTE: Collecting .text() for comparison aims to ensure that HTML entities
                // and HTML elements that may be modified by the browser match up

                // Collect the answers submitted
                var selectedAnswers = [];
                answerInputs.each( function() {
                    var inputValue = $(this).next('label').text();
                    selectedAnswers.push(inputValue);
                });

                if (plugin.config.preventUnanswered && selectedAnswers.length === 0) {
                    alert('You must select at least one answer.');
                    return false;
                }

                // Verify all/any true answers (and no false ones) were submitted
                var correctResponse = plugin.method.compareAnswers(trueAnswers, selectedAnswers, selectAny);

                if (correctResponse) {
                    questionLI.addClass(correctClass);
                }

                // Toggle appropriate response (either for display now and / or on completion)
                questionLI.find(correctResponse ? _correctResponse : _incorrectResponse).show();

                // If perQuestionResponseMessaging is enabled, toggle response and navigation now
                if (plugin.config.perQuestionResponseMessaging) {
                    $(checkButton).hide();
                    questionLI.find(_answers).hide();
                    questionLI.find(_responses).show();
                    questionLI.find(_nextQuestionBtn).fadeIn(300);
                    questionLI.find(_prevQuestionBtn).fadeIn(300);
                }
            },

            // Moves to the next question OR completes the quiz if on last question
            nextQuestion: function(nextButton) {
                var currentQuestion = $($(nextButton).parents(_question)[0]),
                    nextQuestion    = currentQuestion.next(_question),
                    answerInputs    = currentQuestion.find('input:checked');

                // If response messaging has been disabled or moved to completion,
                // make sure we have an answer if we require it, let checkAnswer handle the alert messaging
                if (plugin.config.preventUnanswered && answerInputs.length === 0) {
                    return false;
                }

                if (nextQuestion.length) {
                    currentQuestion.fadeOut(300, function(){
                        nextQuestion.find(_prevQuestionBtn).show().end().fadeIn(500);
                    });
                } else {
                    plugin.method.completeQuiz();
                }
            },

            // Go back to the last question
            backToQuestion: function(backButton) {
                var questionLI = $($(backButton).parents(_question)[0]),
                    answers    = questionLI.find(_answers);

                // Back to previous question
                if (answers.css('display') === 'block' ) {
                    var prevQuestion = questionLI.prev(_question);

                    questionLI.fadeOut(300, function() {
                        prevQuestion.removeClass(correctClass);
                        prevQuestion.find(_responses + ', ' + _responses + ' li').hide();
                        prevQuestion.find(_answers).show();
                        prevQuestion.find(_checkAnswerBtn).show();

                        if (prevQuestion.attr('id') != 'question0') {
                            prevQuestion.find(_prevQuestionBtn).show();
                        } else {
                            prevQuestion.find(_prevQuestionBtn).hide();
                        }

                        prevQuestion.fadeIn(500);
                    });

                // Back to question from responses
                } else {
                    questionLI.find(_responses).fadeOut(300, function(){
                        questionLI.removeClass(correctClass);
                        questionLI.find(_responses + ' li').hide();
                        answers.fadeIn(500);
                        questionLI.find(_checkAnswerBtn).fadeIn(500);
                        questionLI.find(_nextQuestionBtn).hide();

                        // if question is first, don't show back button on question
                        if (questionLI.attr('id') != 'question0') {
                            questionLI.find(_prevQuestionBtn).show();
                        } else {
                            questionLI.find(_prevQuestionBtn).hide();
                        }
                    });
                }
            },

            // Hides all questions, displays the final score and some conclusive information
            completeQuiz: function() {
                var levels    = [
                                    quizValues.info.level1, // 80-100%
                                    quizValues.info.level2, // 60-79%
                                    quizValues.info.level3, // 40-59%
                                    quizValues.info.level4, // 20-39%
                                    quizValues.info.level5  // 0-19%
                                ],
                    score     = $(_element + ' ' + _correct).length,
                    levelRank = plugin.method.calculateLevel(score),
                    levelText = $.isNumeric(levelRank) ? levels[levelRank] : '';

                $(_quizScore + ' span').html(score + ' / ' + questionCount);
                $(_quizLevel + ' span').html(levelText);
                $(_quizLevel).addClass('level' + levelRank);

                $quizArea.fadeOut(300, function() {
                    // If response messaging is set to show upon quiz completion, show it now
                    if (plugin.config.completionResponseMessaging) {
                        $(_element + ' input').prop('disabled', true);
                        $(_element + ' .button:not(' + _tryAgainBtn + '), ' + _element + ' ' + _questionCount).hide();
                        $(_element + ' ' + _question + ', ' + _element + ' ' + _answers + ', ' + _element + ' ' + _responses).show();
                        $quizResults.append($(_element + ' ' + _questions)).fadeIn(500);
                    } else {
                        $quizResults.fadeIn(500);
                    }
                });
            },

            // Compares selected responses with true answers, returns true if they match exactly
            compareAnswers: function(trueAnswers, selectedAnswers, selectAny) {
                if ( selectAny ) {
                    return $.inArray(selectedAnswers[0], trueAnswers) > -1;
                } else {
                    // crafty array comparison (http://stackoverflow.com/a/7726509)
                    return ($(trueAnswers).not(selectedAnswers).length === 0 && $(selectedAnswers).not(trueAnswers).length === 0);
                }
            },

            // Calculates knowledge level based on number of correct answers
            calculateLevel: function(correctAnswers) {
                var percent = (correctAnswers / questionCount).toFixed(2),
                    level   = null;

                if (plugin.method.inRange(0, 0.20, percent)) {
                    level = 4;
                } else if (plugin.method.inRange(0.21, 0.40, percent)) {
                    level = 3;
                } else if (plugin.method.inRange(0.41, 0.60, percent)) {
                    level = 2;
                } else if (plugin.method.inRange(0.61, 0.80, percent)) {
                    level = 1;
                } else if (plugin.method.inRange(0.81, 1.00, percent)) {
                    level = 0;
                }

                return level;
            },

            // Determines if percentage of correct values is within a level range
            inRange: function(start, end, value) {
                return (value >= start && value <= end);
            }
        };

        plugin.init = function() {
            // Setup quiz
            plugin.method.setupQuiz();

            // Bind "start" button
            $quizStarter.on('click', function(e) {
                e.preventDefault();

                if (!this.disabled && !$(this).hasClass('disabled')) {
                    plugin.method.startQuiz();
                }
            });

            // Bind "try again" button
            $(_element + ' ' + _tryAgainBtn).on('click', function(e) {
                e.preventDefault();
                plugin.method.resetQuiz(this);
            });

            // Bind "check answer" buttons
            $(_element + ' ' + _checkAnswerBtn).on('click', function(e) {
                e.preventDefault();
                plugin.method.checkAnswer(this);
            });

            // Bind "back" buttons
            $(_element + ' ' + _prevQuestionBtn).on('click', function(e) {
                e.preventDefault();
                plugin.method.backToQuestion(this);
            });

            // Bind "next" buttons
            $(_element + ' ' + _nextQuestionBtn).on('click', function(e) {
                e.preventDefault();
                plugin.method.nextQuestion(this);
            });
        };

        plugin.init();
    };

    $.fn.slickQuiz = function(options) {
        return this.each(function() {
            if (undefined === $(this).data('slickQuiz')) {
                var plugin = new $.slickQuiz(this, options);
                $(this).data('slickQuiz', plugin);
            }
        });
    };
})(jQuery);
