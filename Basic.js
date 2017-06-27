/**
 * Basic Flashcard
 */
"use strict";

function BasicCard(front, back) {

	if(!(this instanceof BasicCard)){
		return new BasicCard(front,back);
	}
	
    this.front = front;
    this.back = back;
}

BasicCard.prototype.printCard = function(){
	console.log("-------------------------------");
	console.log("Card Front: " + this.front + "\nCard Back: "+this.back);	
	console.log("-------------------------------");

}

BasicCard.prototype.printFront = function(){
	console.log("-------------------------------");
	console.log("Card Front: " + this.front);	
	console.log("-------------------------------");
}

BasicCard.prototype.printBack = function(){
	console.log("-------------------------------");
	console.log("The answer is: "+this.back);	
	console.log("-------------------------------");
}

module.exports = BasicCard;