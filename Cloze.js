/**
 * Cloze Flashcard
 */

"use strict";

function ClozeCard (fulltext, cloze){

	if(!(this instanceof ClozeCard)) {
		return new ClozeCard(fulltext, cloze);
	}

	this.fulltext = fulltext;
	this.cloze = cloze;
	this.partial = function(){
		if(this.fulltext.toLowerCase().includes(this.cloze.toLowerCase())){
			this.clozeErr = false;
			return this.fulltext.toLowerCase().replace(this.cloze.toLowerCase(),"...");
		}
		else{
			console.log("Error: "+this.cloze+" does not exists.");
			this.clozeErr = true;
		}
	}
}

ClozeCard.prototype.printCard = function(){
	console.log("-------------------------------");
	console.log("The full text is: " + this.fulltext);	
	console.log("-------------------------------");

}

module.exports = ClozeCard;