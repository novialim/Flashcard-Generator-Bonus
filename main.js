"use strict";
(function(){
    var Basic = require("./Basic");
    var Cloze = require("./Cloze");
    var inquirer = require('inquirer');

    var cardPack = [];
    var cardPackCloze = [];
    var cardNo = 0;
    var clozeCardNo = 0;

    console.log("Welcome to Flashcard Generator!");
    console.log("---------------------------------------------");

    function mainscreen(){
        inquirer.prompt([
        {
            type: 'list',
            name: 'userChoice',
            message: 'What would you like to do?',
            choices: [
                "Make a Basic Flashcard",
                "Make a Cloze Flashcard",
                "Select a Basic Flashcard",
                "Select a Cloze Flashcard",
                "Exit program"
            ]
        }
        ]).then(function(selection){
            switch (selection.userChoice){
                case "Make a Basic Flashcard":
                    createBasicFlashcard();
                break;

                case "Make a Cloze Flashcard":
                    createClozeFlashcard();
                break;

                case "Select a Basic Flashcard":
                    selectBasicFlashcard();
                break;

                case "Select a Cloze Flashcard":
                    selectClozeFlashcard();
                break;

                case "Exit program":
                    console.log("Good Bye");
            }
        })
    }

    //Function to create basic flashcard

    function createBasicFlashcard() {
        inquirer.prompt([
        {
            name:"front",
            message:"Please write question for the front of your card. (E.g. \"Who was the first president of the United States?\")\n"
        },{
            name:"back",
            message:"Please write answer for the back of your card. (E.g. \"George Washington\")\n" 
        }
        ]).then(function(answers){
            var newBasicCard = new Basic(answers.front, answers.back);
            cardPack.push(newBasicCard);
            console.log("Your basic flashcard is created and saved.");

            continueFlashcard();
        });
    }

        //Function to create cloze flashcard

    function createClozeFlashcard() {
        inquirer.prompt([
        {
            name:"fulltext",
            message:"Please write question for the front of your card. (E.g. \"George Washington was the first president of the United States\")\n"
        },{
            name:"cloze",
            message:"Please enter cloze text to be excluded from the full text. (E.g. \"George Washington\")\n" 
        }
        ]).then(function(answers){
            var newClozeCard = new Cloze(answers.fulltext, answers.cloze);
            newClozeCard.partial();

            if(!newClozeCard.clozeErr){
                cardPackCloze.push(newClozeCard);
                console.log("Your cloze flashcard is created and saved.");
            }

            continueFlashcard();
        });
    }


    function continueFlashcard(){
        inquirer.prompt([
            {
                type: "list",
                message: "Do you wish to continue?",
                choices:["Yes","No"],
                name:"callMainScreen"
            }
            ]).then(function(selection){
                if(selection.callMainScreen == "Yes"){
                    mainscreen();
                }
                else
                    console.log("Good Bye");
            })
    }

    function getBasicFlashcard(card){
        var flashcard = new Basic(card.front, card.back);
        return flashcard.front;
    }

    function getClozeFlashcard(card){
        var flashcard = new Cloze(card.fulltext, card.cloze);
        return flashcard.partial();
    }

    function selectBasicFlashcard() {

        if(cardNo<cardPack.length){
            var cardFront = getBasicFlashcard(cardPack[cardNo]);
            var deckFront = "\n-------------------------------\n"+cardFront+"\n-------------------------------";

            inquirer.prompt([
            {
                type:"input",
                message:deckFront+"\n",
                name:"question"
            }
            ]).then(function(answer){
                if(answer.question.toLowerCase() == cardPack[cardNo].back.toLowerCase()){
                    console.log("You are correct!");
                    cardPack[cardNo].printCard();
                    cardNo++;
                    selectBasicFlashcard();
                }
                else{
                    console.log("Meh, that was incorrect.");
                    cardPack[cardNo].printBack();
                    cardNo++;
                    selectBasicFlashcard();
                }
            })
        }
        else if(cardPack.length==0){
            console.log("There are no basic flashcards. Come on go make some!");
            continueFlashcard();
        }
        else{
            continueFlashcard();
        }
    }

    function selectClozeFlashcard() {

        if(clozeCardNo<cardPackCloze.length){
            var cardFront = getClozeFlashcard(cardPackCloze[clozeCardNo]);
            var deckFront = "\n-------------------------------\n"+cardFront+"\n-------------------------------";

            inquirer.prompt([
            {
                type:"input",
                message:deckFront+"\n",
                name:"question"
            }
            ]).then(function(answer){
                if(answer.question.toLowerCase() == cardPackCloze[clozeCardNo].cloze.toLowerCase()){
                    console.log("You are correct!");
                    cardPackCloze[clozeCardNo].printCard();
                    clozeCardNo++;
                    selectClozeFlashcard();
                }
                else{
                    console.log("Meh, that was incorrect.");
                    cardPackCloze[clozeCardNo].printCard();
                    clozeCardNo++;
                    selectClozeFlashcard();
                }
            })
        }
        else if(cardPackCloze.length==0){
            console.log("There are no cloze flashcards. Come on go make some!");
            continueFlashcard();
        }
        else{
            continueFlashcard();
        }
    }

mainscreen();

})();
    