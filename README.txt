SlickQuiz jQuery Plugin v1.0
----------------------------


Overview
----------------------------
A jQuery plugin for creating pretty, dynamic quizzes.


Demo And Usage
----------------------------
See index.html for demo and suggested HTML structure.

See js/slickQuiz-config.js to set up your quiz copy and questions.

To initialize your quiz:

$(function () {
    $('#slickQuiz').slickQuiz();
});


Advanced Usage
----------------------------
Want to manage your quizzes in a content management system?

Simply translate your CMS quiz data into a JSON object formatted like "quizJSON" in js/slickQuiz-config.js.
Then assign it as the quizJSON variable instead of loading js/slickQuiz-config.js.


Base HTML Structure
----------------------------
<body id="slickQuiz">
    <h1 class="quizName"></h1>
    <div class="quizArea">
        <div class="quizHeader">
            <div class="startQuiz">Get Started!</div>
        </div>
    </div>
    <div class="quizResults">
        <h3 class="quizScore">You Scored: <span></span></h3>
        <h3 class="quizLevel"><strong>Ranking:</strong> <span></span></h3>
        <div class="quizResultsCopy"></div>
    </div>
</body>


Base Config Options
----------------------------
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
