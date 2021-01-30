// Setup your quiz text and questions here

// NOTE: pay attention to commas, IE struggles with those bad boys

var quizJSON = {
    "info": {
        "name":    "Are you ready to 'laissez les bons temps rouler'?",
        "main":    "<p>Think you know everything there is to know about Festival International de Louisiane? Find out with this quiz!</p>",
        "results": "<h5>Interested in learning more?</h5><p>The best way to find out about this celebrated annual festival is to show up for the weekend and have fun with the rest of the people attending from all over the world!</p>",
        "level1":  "Do you run Festival yourself? You seem to know everything!",
        "level2":  "Grab your dancing pants before heading out the door! You're a Festival regular!",
        "level3":  "You know some things, but you'd be better off attending Festival to learn more.",
        "level4":  "You definitely need to attend a few more years of Festival to study up!",
        "level5":  "Find yourself a seasoned Festival buddy and get the facts! You just need a decade or so of attendance under your belt." // no comma here
    },
    "questions": [
        { // Question 1 - Multiple Choice, Single True Answer
            "q": "In what year was Festival International first held?",
            "a": [
                {"option": "1999",      "correct": false},
                {"option": "1994",      "correct": false},
                {"option": "1978",     "correct": false},
                {"option": "1987",      "correct": true},
                {"option": "1971",     "correct": false} // no comma here
            ],
            "correct": "<p><span>That's right!</span> It's a celebrated annual tradition now, but its very first year was in 1987!</p>",
            "incorrect": "<p><span>Nope!</span> The actual first year it took place was 1987!</p>" // no comma here
        },
        { // Question 2 - Multiple Choice, Multiple True Answers, Select Any
            "q": "Which of the following is NOT part of the mission of Festival International?",
            "a": [
                {"option": "Enrich the community with a celebration of its native cultures through performing arts.",               "correct": false},
                {"option": "Develop culture and tourism, as well as enhance economic development by expanding Louisiana’s reputation as an arts center and a destination for artistic events.",   "correct": false},
                {"option": "Educate the public of the historical achievements and artistic expressions of related global cultures while developing an appreciation for the arts.",               "correct": false},
                {"option": "All of the above", "correct": true} // no comma here
            ],
            "correct": "<p><span>Yes!</span> All of these are part of the celebrated mission of Festival International.</p>",
            "incorrect": "<p><span>Hmmm.</span> You're not wrong. But actually, all three answers are correct!</p>" // no comma here
        },
        { // Question 3 - Multiple Choice, Multiple True Answers, Select All
            "q": "During which month does Festival typically occur?",
            "a": [
                {"option": "September",           "correct": false},
                {"option": "April",                  "correct": true},
                {"option": "March",     "correct": false},
                {"option": "October",          "correct": false} // no comma here
            ],
            "correct": "<p><span>Absolutely correct!</span> You really do pay attention!</p>",
            "incorrect": "<p><span>Not quite.</span></p>" // no comma here
        },
        { // Question 4
            "q": "How many people typically make the pilgrammage to Lafayette in time for Festival?",
            "a": [
                {"option": "35,000",    "correct": false},
                {"option": "350",     "correct": false},
                {"option": "350,000",      "correct": true},
                {"option": "3.5 million",   "correct": false} // no comma here
            ],
            "correct": "<p><span>Holy beignets!</span> I didn't actually expect you to know that! Correct!</p>",
            "incorrect": "<p><span>Not exactly.</span> According to tourism data from the area, roughly 350,000 people make the journey to Festival each year.</p>" // no comma here
        },
        { // Question 5
            "q": "Which of the following is NOT a reason people love attending Festival each year?",
            "a": [
                {"option": "Eating the delicious food!",    "correct": false},
                {"option": "Listening to amazing music!",     "correct": false},
                {"option": "Looking at fantastic works of art!",    "correct": false},
                {"option": "Having a great time with other people!",     "correct": false},
                {"option": "Because attendance for the entire weekend is free!", "correct": false},
                {"option": "None of the above",    "correct": true}// no comma here
            ],
            "correct": "<p><span>Yes!</span> ALL of these are frequently cited reasons people look forward to Festival every year!</p>",
            "incorrect": "<p><span>Well...</span> People actually do attend for that reason. And all of the others, too!</p>" // no comma here
        } // no comma here
    ]
};
