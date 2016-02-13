function numToWords(number){
    var values1 = {
        0: "",
        1: "one",
        2: "two",
        3: "three",
        4: "four",
        5: "five",
        6: "six",
        7: "seven",
        8: "eight",
        9: "nine",
        10: "ten",
        11: "eleven",
        12: "twelve",
        13: "thirteen",
        14: "fourteen",
        15: "fifteen",
        16: "sixteen",
        17: "seventeen",
        18: "eighteen",
        19: "nineteen"

    };

    var values2 = {
        2: "twenty",
        3: "thirty",
        4: "forty",
        5: "fifty",
        6: "sixty",
        7: "seventy",
        8: "eighty",
        9: "ninety"
    }
    var numberString = number.toString();
	var digitCount = numberString.length;
    var index1 = digitCount;
	var index2 = digitCount - 3;
	var substringArray = [];
	var word = "";
	if(digitCount%3!=0){
		for(var i = 0; i< digitCount-3; i+=3){
			var substring = numberString.slice(index2, index1);
			substringArray.push(substring);
			index1 = index2;
			index2 = index1 - 3;
		}
			substringArray.push(numberString.slice(0, digitCount%3));
	}

	else{
		for(var i = 0; i< digitCount; i+=3){
			var substring = numberString.slice(index2, index1);
			substringArray.push(substring);
			index1 = index2;
			index2 = index1 - 3;
		}
	}

    var output = "";
    for(var i = substringArray.length; i > 0; i--){
        if(i == 3){
            var word = "";
            var hundred = Math.floor(substringArray[i-1]/100);
            if(hundred>0){
                word+=values1[hundred] + " hundred "
            }

            var temp = substringArray[i-1]%100;
            if(temp<20){
                tens = temp;
                word+=values1[tens] + " "
            }
            else{
                tens = Math.floor((substringArray[i-1]%100)/10);
                word+=values2[tens] + " "
                var ones = Math.floor((substringArray[i-1]%100)%10);
                word+=values1[ones] + " "
            }
            output += word + " million ";
        }

        if(i == 2){
            var word = "";
            var hundred = Math.floor(substringArray[i-1]/100);
            if(hundred>0){
                word+=values1[hundred] + " hundred "
            }

            var temp = substringArray[i-1]%100;
            if(temp<20){
                tens = temp;
                word+=values1[tens] + " "
            }
            else{
                tens = Math.floor((substringArray[i-1]%100)/10);
                word+=values2[tens] + " "
                var ones = Math.floor((substringArray[i-1]%100)%10);
                word+=values1[ones] + " "
            }
            if(substringArray[i-1] != 0){
                output += word + " thousand "
            }

        }

        if(i == 1){
            var word = "";
            var hundred = Math.floor(substringArray[i-1]/100);
            if(hundred>0){
                word+=values1[hundred] + " hundred "
            }

            var temp = substringArray[i-1]%100;
            if(temp<20){
                tens = temp;
                word+=values1[tens] + " "
            }
            else{
                tens = Math.floor((substringArray[i-1]%100)/10);
                word+=values2[tens] + " "
                var ones = Math.floor((substringArray[i-1]%100)%10);
                word+=values1[ones] + " "
            }
            output += word
        }

    }
    return(output);
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
