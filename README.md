# SlickQuiz jQuery Plugin v1.0
* * *

## Overview

A jQuery plugin for creating pretty, dynamic quizzes.


## Demo And Usage

See index.html for demo and suggested HTML structure (the element class names are the important part).

See js/slickQuiz-config.js to set up your quiz copy and questions.

To initialize your quiz:

    $(function () {
        $('#slickQuiz').slickQuiz();
    });


### Available Options

**`json`** (JSON Object) - your quiz JSON, pass this instead of setting quizJSON outside of the plugin (see js/slickQuiz-config.js)

**`checkAnswerText`** (String) - the text to use on the check answer button

**`nextQuestionText`** (String) - the text to use on the next question button

**`backButtonText`** (String) - the text to use on the back button, if left null / blank (default) - no back button will be displayed

**`randomSortQuestions`** (Boolean) - whether or not to randomly sort questions ONLY, defaults to false

**`randomSortAnswers`** (Boolean) - whether or not to randomly sort answers ONLY, defaults to false

**`randomSort`** (Boolean) - whether or not to randomly sort questions AND their answers (overrides `randomSortQuestions` and `randomSortAnswers`), defaults to false. NOTE: this will be deprecated in a future release.

**`preventUnanswered`** (Boolean) - prevents submitting a question with zero answers, defaults to false

**`completionResponseMessaging`** (Boolean) - Hides all correct / incorrect response messages until the quiz is completed (nextQuestion button replaces checkAnswer button), defaults to false

**`disableResponseMessaging`** (Boolean) - Hides all correct / incorrect response messages (nextQuestion button replaces checkAnswer button), defaults to false

#### Deprecated Options

**`disableNext`** (Boolean) - prevents submitting a question with zero answers, defaults to false. You should now use `preventUnanswered` instead.


## Advanced Usage

Want to manage your quizzes in a content management system?

Simply translate your CMS quiz data into a JSON object formatted like "quizJSON" in js/slickQuiz-config.js.
Then assign it as the quizJSON variable instead of loading js/slickQuiz-config.js.

Alternatively, you can pass the JSON right into the plugin using the "json" option (useful if you are placing multiple quizzes on a page):

    $(function () {
        $('#slickQuiz').slickQuiz({json: {YOUR_JSON_HERE}});
    });


## Base HTML Structure

The slickQuiz ID and class names are what are important here:

    <body id="slickQuiz">
        <h1 class="quizName"></h1>
        <div class="quizArea">
            <div class="quizHeader">
                <a class="startQuiz" href="">Get Started!</a>
            </div>
        </div>
        <div class="quizResults">
            <h3 class="quizScore">You Scored: <span></span></h3>
            <h3 class="quizLevel"><strong>Ranking:</strong> <span></span></h3>
            <div class="quizResultsCopy"></div>
        </div>
    </body>


## Base Config Options

See js/slickQuiz-config.js

    var quizJSON = {
        "info": {
            "name":    "The Quiz Header",
            "main":    "The Quiz Description Text",
            "results": "The Quiz Results Copy",
            "level1":  "The highest ranking",
            "level2":  "The almost highest ranking",
            "level3":  "The middle ranking",
            "level4":  "The almost lowest ranking",
            "level5":  "The lowest ranking"
        },
        "questions": [
            {
                "q": "The Question?",
                "a": [
                    {"option": "an incorrect answer",       "correct": false},
                    {"option": "a correct answer",          "correct": true},
                    {"option": "another correct answer",    "correct": true}
                ],
                "correct": "The Correct Response Message",
                "incorrect": "The Incorrect Response Message"
            }
        ]
    }


Created by [Julie Bellinson](http://jewlofthelotus.com) - Software Engineer at [Quicken Loans](http://quickenloans.com), Detroit, MI
