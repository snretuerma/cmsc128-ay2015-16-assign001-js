function numToWords(number){
	var count = number.length;
	window.alert(count);
}

function wordsToNum(words){

}

function wordsToCurrency(currency){

}

function numberDelimited(number, delimiter, jumps){
	var string = number.toString();
	var length = string.length;
	var symbol = delimiter;
	var ind1 = length;
	var ind2 = ind1-jumps;
	var word = "";
	if(length%jumps!=0){
		for(var i = 0; i <length-jumps; i+=jumps){
			var substring = string.slice(ind2, ind1);
			word = word.concat(symbol,substring);
			ind1 = ind2;
			ind2 = ind1-jumps;
		}
		word = string.slice(0, length%jumps).concat("", word)
	}
	else{
		for(var i = 0; i <length-jumps; i+=jumps){
			var substring = string.slice(ind2, ind1);
			word = word.concat(symbol,substring);
			ind1 = ind2;
			ind2 = ind1-jumps;
		}
		word = string.slice(0, jumps).concat("", word)
	}
}
