# This project is no longer actively maintained.

# Please see [jewlofthelotus/SlickQuiz](https://github.com/jewlofthelotus/SlickQuiz) for updates.

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

**`tryAgainText`** (String) - the text to use on the try again button, if left null / blank (default) - no try again button will be displayed

**`skipStartButton`** (Boolean) - whether or not to skip the quiz "start" button, defaults to false

**`numberOfQuestions`** (Integer) - the number of questions to load from the question set in the JSON object, defaults to null (all questions); Note: If you set this to an integer, you'll probably also want to set <code>randomSortQuestions</code> or <code>randomSort</code> to **true** to ensure that you get a mixed set of questions each page load.

**`randomSortQuestions`** (Boolean) - whether or not to randomly sort questions ONLY, defaults to false

**`randomSortAnswers`** (Boolean) - whether or not to randomly sort answers ONLY, defaults to false

**`randomSort`** (Boolean) - whether or not to randomly sort questions AND their answers (overrides <code>randomSortQuestions</code> and <code>randomSortAnswers</code>), defaults to false. NOTE: this will be deprecated in a future release.

**`preventUnanswered`** (Boolean) - prevents submitting a question with zero answers, defaults to false

**`completionResponseMessaging`** (Boolean) - Hides all correct / incorrect response messages until the quiz is completed (nextQuestion button replaces checkAnswer button), defaults to false

**`disableResponseMessaging`** (Boolean) - Hides all correct / incorrect response messages (nextQuestion button replaces checkAnswer button), defaults to false

#### Deprecated Options

**`disableNext`** (Boolean) - prevents submitting a question with zero answers, defaults to false. You should now use <code>preventUnanswered</code> instead.


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
                "select_any": false, // optional, see below
                "correct": "The Correct Response Message",
                "incorrect": "The Incorrect Response Message"
            }
        ]
    }

Note: `select_any` is used if there is more than one true answer and when submitting any single true answer is considered correct.  (Select ANY that apply vs. Select ALL that apply)

Created by [Julie Cameron](http://juliecameron.com) - Software Engineer at [Quicken Loans](http://quickenloans.com), Detroit, MI
