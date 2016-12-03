A jQuery plugin for creating pretty, dynamic quizzes.


## Demo And Usage

See `index.html` for demo and suggested HTML structure (the element class names are the important part).

See `js/slickQuiz-config.js` to set up your quiz copy and questions.

To initialize your quiz:

    $(function () {
        $('#slickQuiz').slickQuiz({
            // options
        });
    });


## Available Options

**`json`** (JSON Object) - your quiz JSON, pass this instead of setting quizJSON outside of the plugin (see js/slickQuiz-config.js)


#### Text Options

**`checkAnswerText`** (String) *Default: 'Check My Answer!';* - the text to use on the check answer button

**`nextQuestionText`** (String) *Default: 'Next &raquo;';* - the text to use on the next question button

**`completeQuizText`** (String) *Default: '';* - the text to use for the last button the user will click before getting results; if left null / blank (default) - <code>nextQuestionText</code> will be used. Example: "Get Your Results!"

**`backButtonText`** (String) *Default: '';* - the text to use on the back button; if left null / blank (default) - no back button will be displayed

**`tryAgainText`** (String) *Default: '';* - the text to use on the try again button; if left null / blank - no try again button will be displayed

**`preventUnansweredText`** (String) *Defaut: 'You must select at least one answer.';* - the text to display if a user submits a blank answer while <code>preventUnanswered</code> is enabled

**`questionCountText`** (String) *Defaut: 'Question %current of %total';* - if <code>displayQuestionCount</code> is enabled, this will format that text using the string provided. <code>%current</code> and <code>%total</code> are placeholders that will output the appropriate values. Note: <code>displayQuestionCount</code> may eventually be deprecated in favor of this option

**`questionTemplateText`** (String) *Defaut:  '%count. %text';* - if <code>displayQuestionNumber</code> is enabled, this will format that question number and question using the string provided. <code>%count</code> and <code>%text</code> are placeholders that will output the appropriate values. Note: <code>displayQuestionNumber</code> may eventually be deprecated in favor of this option

**`scoreTemplateText`** (String) *Defaut: '%score / %total';* - the format of the final score text. <code>%score</code> and <code>%total</code> are placeholders that will output the appropriate values

**`nameTemplateText`** (String) *Defaut:  '&lt;span&gt;Quiz: &lt;/span&gt;%name';* - the format of the quiz name; <code>%name</code> is a placeholder that will output the quiz name. Note: the "Quiz" span in the default value is used to enhance accessibility, it will not display on the screen.


#### Functionality Options

**`skipStartButton`** (Boolean) *Default: false;* - whether or not to skip the quiz "start" button

**`numberOfQuestions`** (Integer) *Default: null;* - the number of questions to load from the question set in the JSON object, defaults to null (all questions); Note: If you set this to an integer, you'll probably also want to set <code>randomSortQuestions</code> to **true** to ensure that you get a mixed set of questions each page load.

**`randomSortQuestions`** (Boolean) *Default: false;* - whether or not to randomly sort questions ONLY

**`randomSortAnswers`** (Boolean) *Default: false;* - whether or not to randomly sort answers ONLY

**`preventUnanswered`** (Boolean) *Default: false;* - prevents submitting a question with zero answers

**`perQuestionResponseMessaging`** (Boolean) *Default: true;* - Displays correct / incorrect response messages after each question is submitted.

**`perQuestionResponseAnswers`** (Boolean) *Default: false;* - Keeps the answer options in display after the question is submitted. Note: this should be used in tandem with <code>perQuestionResponseMessaging</code>

**`completionResponseMessaging`** (Boolean) *Default: false;* - Displays all questions and answers with correct or incorrect response messages when the quiz is completed.

**`displayQuestionCount`** (Boolean) *Default: true;* - whether or not to display the number of questions and which question the user is on, for example "Question 3 of 10". Note: this may eventually be deprecated in favor of <code>questionCountText</code>

**`displayQuestionNumber`** (Boolean) *Default: true;* - whether or not to display the number of the question along side the question itself, for example, the "1." in "1. What is the first letter of the alphabet?" Note: this may eventually be deprecated in favor of <code>questionTemplateText</code>

**`disableScore`** (Boolean) *Default: false;* - Removes the score from the final results display. Eliminates the need for an element with class <code>quizScore</code> in the markup.

**`disableRanking`** (Boolean) *Default: false;* - Removes the ranking leve from the final results display. Eliminates the need for an element with class <code>quizLevel</code> in the markup, as well as the need for JSON values for <code>level1</code> through <code>level5</code>.

**`scoreAsPercentage`** (Boolean) *Default: false;* - Returns the score as a percentage rather than the number of correct responses. If enabled, you'll also want to adjust <code>scoreTemplateText</code> to something like *'%score'*


#### Question Options

*See "Base Config Options" below for examples*

**`select_any`** (Boolean) *Optional*  - Use if there is more than one true answer and when submitting any single true answer should be considered correct.  (Select ANY that apply vs. Select ALL that apply)

**`force_checkbox`** (Boolean) *Optional* - Set this to `true` if you want to render checkboxes instead of radios even if the question only has one true answer.


#### Event Options

**`events.onStartQuiz`** (function) *Default: empty;* - a function to be executed once the quiz has started.

**`events.onCompleteQuiz`** (function) *Default: empty;* - a function to be executed the quiz has completed; the function will be passed two arguments in an object: <code>options.questionCount</code>, <code>options.score</code>


#### Animation Callback Options

**`animationCallbacks.setupQuiz`** (function) *Default: empty;* - a function to be executed once all jQuery animations have completed in the <code>setupQuiz</code> method

**`animationCallbacks.startQuiz`** (function) *Default: empty;* - a function to be executed once all jQuery animations have completed in the <code>startQuiz</code> method; note that <code>events.onStartQuiz()</code> would execute before this callback method due to durations of jQuery animations

**`animationCallbacks.resetQuiz`** (function) *Default: empty;* - a function to be executed once all jQuery animations have completed in the <code>resetQuiz</code> method

**`animationCallbacks.checkAnswer`** (function) *Default: empty;* - a function to be executed once all jQuery animations have completed in the <code>checkAnswer</code> method

**`animationCallbacks.nextQuestion`** (function) *Default: empty;* - a function to be executed once all jQuery animations have completed in the <code>nextQuestion</code> method

**`animationCallbacks.backToQuestion`** (function) *Default: empty;* - a function to be executed once all jQuery animations have completed in the <code>backToQuestion</code> method

**`animationCallbacks.completeQuiz`** (function) *Default: empty;* - a function to be executed once all jQuery animations have completed in the <code>completeQuiz</code> method; note that <code>events.onCompleteQuiz()</code> would execute before this callback method due to durations of jQuery animations


#### Deprecated Options

**`disableNext`** - Prevents submitting a question with zero answers. You should now use <code>preventUnanswered</code> instead.

**`disableResponseMessaging`** - Hides all correct / incorrect response messages. You should now use <code>perQuestionResponseMessaging</code> and <code>completionResponseMessaging</code> instead.

**`randomSort`** - Randomly sort all questions AND their answers. You should now use <code>randomSortQuestions</code> and <code>randomSortAnswers</code> instead.


## Advanced Usage

Want to manage your quizzes in a content management system?

Simply translate your CMS quiz data into a JSON object formatted like `quizJSON` in `js/slickQuiz-config.js`.
Then assign it as the `quizJSON` variable instead of loading `js/slickQuiz-config.js`.

Alternatively, you can pass the JSON right into the plugin using the `json` option (useful if you are placing multiple quizzes on a page):

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

See `js/slickQuiz-config.js`

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
                "incorrect": "The Incorrect Response Message",
                "select_any": false, // optional, see "Question Options" above
                "force_checkbox": false // optional, see "Question Options" above
            }
        ]
    }


## Adding HTML to Questions and Answers

Standard HTML elements like images, videos embeds, headers, paragraphs, etc., can be used within text values like `q` and `a` options.

    "q": "The Question? <img src='path/to/image.png' />",
    "a": [
        {"option": "an <b>incorrect</b> answer", "correct": false},
        {"option": "a <b>correct</b> answer",    "correct": true},
    ]


Created by [Julie Cameron](http://juliecameron.com) while previously employed at [Quicken Loans](http://quickenloans.com), Detroit, MI
