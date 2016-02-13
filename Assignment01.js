/* CMSC 128: Introduction to Software Engineering
** Assign 001: Programming a Number Library
** Author: Shannon Francis N. Retuerma
*/

// function for conveting number in digits to words
function numToWords(number){
    var values1 = {			// mapping of values in a single variable for 0 to 19
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

    var values2 = {				// for values 20 to 90
        2: "twenty",
        3: "thirty",
        4: "forty",
        5: "fifty",
        6: "sixty",
        7: "seventy",
        8: "eighty",
        9: "ninety"
    }
    var numberString = number.toString();	// convert the input to string
	var digitCount = numberString.length;	// get the count of the digits
    var index1 = digitCount;				// variables that will be used as reference in for accessing the array
	var index2 = digitCount - 3;
	var substringArray = [];				// initialize an array for the substrings
	var word = "";
	if(digitCount%3!=0){					// grouping the digits to 3, this case is for the digits that are not divisible by 3
		for(var i = 0; i< digitCount-3; i+=3){
			var substring = numberString.slice(index2, index1);
			substringArray.push(substring);
			index1 = index2;
			index2 = index1 - 3;
		}
			substringArray.push(numberString.slice(0, digitCount%3));
	}

	else{										// if the digit count is divisible by 3
		for(var i = 0; i< digitCount; i+=3){
			var substring = numberString.slice(index2, index1);
			substringArray.push(substring);
			index1 = index2;
			index2 = index1 - 3;
		}
	}

    var output = "";
    for(var i = substringArray.length; i > 0; i--){		// use the substrings from the previous step and convert it to words
        if(i == 3){
            var word = "";								// this gets the millons part of the input
            var hundred = Math.floor(substringArray[i-1]/100);
            if(hundred>0){
                word+=values1[hundred] + " hundred "
            }

            var temp = substringArray[i-1]%100;
            if(temp<20){								// case for numbers that are less than 20
                tens = temp;
                word+=values1[tens] + " "
            }
            else{										// case for numbers that are greater than 20
                tens = Math.floor((substringArray[i-1]%100)/10);
                word+=values2[tens] + " "
                var ones = Math.floor((substringArray[i-1]%100)%10);
                word+=values1[ones] + " "
            }
            output += word + " million ";
        }

        if(i == 2){										// repeat the steps done for the thousandths and hundredths place if it exists
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
            if(substringArray[i-1] != 0){				// catches the case for 000 in the thousandths place
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
    return(output);										// returns the output to the calling function
}

// function for changing word representation of a number to digits
function wordsToNum(words){
	var valueMap = {									// map of values
			"one": 1,
			"two": 2,
			"three": 3,
			"four": 4,
			"five": 5,
			"six": 6,
			"seven": 7,
			"eight": 8,
			"nine": 9,
			"ten": 10,
			"eleven": 11,
			"twelve": 12,
			"thirteen": 13,
			"fourteen": 14,
			"fifteen": 15,
			"sixteen": 16,
			"seventeen": 17,
			"eighteen": 18,
			"nineteen": 19,
			"twenty": 20,
			"thirty": 30,
			"forty": 40,
			"fifty": 50,
			"sixty": 60,
			"seventy": 70,
			"eighty": 80,
			"ninety": 90,
			"hundred": 100,
			"thousand": 1000,
			"million": 1000000
	}
	var splitresult = " ";
	output = 0;
	splitresult = words.split(" ");						// split the input by space
	var numberValue = 0;								// variable declaration
	var oldValue = 0;
	var temp = 0;
	var answer = 0;
	for(var i = 0; i < (splitresult.length); i++){
		numberValue = valueMap[splitresult[i]];			// get the numerical value of the word from the map
		if(oldValue == 0){
			oldValue = numberValue						//if the old value is 0
		}

		else if(oldValue > numberValue){				// check if the old value is bigger than the current value
			oldValue = oldValue + numberValue;			// add the current value to the old value
		}

		else{
			oldValue = oldValue * numberValue;			// if it is bigger, multiply it, this signifies the change of place value (it is multiplied to a place value, 100, 1000 1000000)
		}
		if(oldValue>=1000){								// if the value is not a hundredths place, add it to the total
			answer = answer + oldValue;
			oldValue = 0;								// reset the value of the old value variable to mark a change of place value
		}
	}
	answer = answer+oldValue;							// add the last 3 places in the answer
	return(answer);										// return the resulting number to the calling function
}

// function for getting the numerical representation of words to its digit with a currency appended to it depending on the passed currency
function wordsToCurrency(words,currency){
	var valid = ["JPY", "PHP", "USD"];			// array for the checker of the currency inpur is valid
	var value = wordsToNum(words);				// use the wordsToNum function to
	var check = valid.indexOf(currency)			// checks if the input currency is in the list of valid currencies
	if(check!=-1){
		output = currency+value;				// append the currency to the output of wordsToNum function
		return (output);						// return the currency to the calling function
	}

}

// function for separating a number by a number of jumps depending on user input. the delimiter is provided by the user
function numberDelimited(number, delimiter, jumps){
	var string = number.toString();
	var length = string.length;
	var symbol = delimiter;
	var ind1 = length;								// for the manipulation of input
	var ind2 = ind1-jumps;
	var word = "";
	if(length%jumps!=0){							// if the number can't be divided exactly by the number of jumps
		for(var i = 0; i <length-jumps; i+=jumps){		// divide the string from the right to left
			var substring = string.slice(ind2, ind1);	// slice the substring by the jumps using 2 variables for index reference
			word = word.concat(symbol,substring);		// concatenate the symbol to the substring formed
			ind1 = ind2;								// update the indices
			ind2 = ind1-jumps;
		}
		word = string.slice(0, length%jumps).concat("", word)	// for the the excess substring
	}
	else{										// if the string can be divided exactly by the jumps
		for(var i = 0; i <length-jumps; i+=jumps){
			var substring = string.slice(ind2, ind1);
			word = word.concat(symbol,substring);
			ind1 = ind2;
			ind2 = ind1-jumps;
		}
		word = string.slice(0, jumps).concat("", word)
	}
    return(word); // return the output to the calling function
}

/*
** References used:
** http://blog.cordiner.net/2010/01/02/parsing-english-numbers-with-perl/
*/
