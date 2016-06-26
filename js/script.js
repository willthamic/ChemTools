var elementlist = "shaner";
var set = "";

// Detect enter keypress
document.onkeydown = checkKey;
function checkKey(e) {
	e = e || window.event;
	if (e.keyCode == '13') {
		parseInput($( "#textInput" ).val());
		$( "#textInput" ).val("");
	}
}

// Figure out what the input means
function parseInput (input) {
	console.log("Input: " + input);
	var inputArray = input.split(" ");
	console.log("Input Array: " + inputArray);
	if (input.toLowerCase() == "use list shaner") {
		elementlist = "shaner";
		output("List set to Shaner", "" , "");
	} else if (input.toLowerCase() == "use list accurate") {
		elementlist = "accurate";
		output("List set to Accurate", "" , "");
	} else {
		getA(inputArray);
	}
}

// .splice(arr.indexOf(removeItem ), 1);

// Processes the input
function getA (input) {
	var filtered = filter(input);
	console.log("Filtered: " + filtered);
	var splitted = seperate(filtered);
	console.log("Splitted: " + splitted);
	var multiplier = getMulti(splitted);
	console.log("Multiplier: " + multiplier);
	var stitched = stitch(splitted);
	console.log("Stitched: " + stitched);
	var outArray = stitched.slice(0);
	for (var i = 0; i < outArray.length; i++) {
		if (getStringType(outArray[i]) == "letter") {
			if (elementlist == "shaner") {
				outArray[i] = getAofEShaner(outArray[i]);
			} else if (elementlist == "accurate") {
				outArray[i] = getAofEAccurate(outArray[i]);
			}
		}
	}
	var formatted = stitched.join("");
	if (multiplier != 1) {
		formatted = multiplier + "*[" + formatted + "]"
	}
	var out = multiplier * eval(outArray.join(""));
	output("AW: " + input, formatted, out.toFixed(2) + "g/mol");
}

// Removes spaces and other characters that cause problems with the processing
// Changes brackets and braces to parenthesis
function filter (string) {
	var array = string.toString().split("");
	for(var i = array.length - 1; i >= 0; i--) {
		if(array[i] == " " || array[i] == "." || array[i] == "·") {
			array.splice(i, 1);
		} else if (array[i] == "[" || array[i] == "{") {
			array[i] = "(";
		} else if (array[i] == "]" || array[i] == "}") {
			array[i] = ")";
		} else if (getCharType(array[i]) == "null") {
			array.splice(i, 1);
		}
	}
	string = array.join("");
	return string;
}

// Splits the input into readable parts
function seperate (input) {
	var inputArray = input.split("");
	var pieces = [];
	pieces.push(inputArray[0]);
	for (var i = 1; i < inputArray.length; i++) {
		if ((getCharType(inputArray[i]) == getCharType(inputArray[i-1]) && getCharType(inputArray[i]) != "upper") || (getCharType(inputArray[i-1]) == "upper" && getCharType(inputArray[i]) == "lower")) {
			pieces[pieces.length-1] = pieces[pieces.length-1] + inputArray[i];
		} else {
			pieces.push(inputArray[i])
		}
	}
	return pieces;
}

// Gets multiplier of array
function getMulti (array) {
	if (getCharType(array[0]) == "number") {
		return Number(array[0]);
	} else {
		return 1;
	}
}

// Stitches the array pieces together with mathematical operators
function stitch (array) {
	if (getCharType(array[0]) == "number") {
		array.splice(0, 1);
	}
	var length = array.length-1;
	for (var i = length; i > 0; i--) {
		if        (getStringType(array[i-1]) == "letter" && getStringType(array[i]) == "letter") {
			array.splice(i, 0, "+");
		} else if (getStringType(array[i-1]) == "letter" && getStringType(array[i]) == "number") {
			array.splice(i, 0, "*");
		} else if (getStringType(array[i-1]) == "letter" && getStringType(array[i]) == "("     ) {
			array.splice(i, 0, "+");
		} else if (getStringType(array[i-1]) == "number" && getStringType(array[i]) == "letter") {
			array.splice(i, 0, "+");
		} else if (getStringType(array[i-1]) == "number" && getStringType(array[i]) == "("     ) {
			array.splice(i, 0, "+");
		} else if (getStringType(array[i-1]) == ")"      && getStringType(array[i]) == "letter") {
			array.splice(i, 0, "+");
		} else if (getStringType(array[i-1]) == ")"      && getStringType(array[i]) == "number") {
			array.splice(i, 0, "*");
		} else if (getStringType(array[i-1]) == ")"      && getStringType(array[i]) == "("     ) {
			array.splice(i, 0, "+");
		}
	}
	return array;
}

// Returns lower, upper, number, (, ) or null  depending on character
function getCharType (character) {
	var type = "null";
	if (typeof character == "string") {
		if (character != character.toUpperCase()) {
			type = "lower";
		} else if (character != character.toLowerCase()) {
			type = "upper";
		}
	}
	if (!isNaN(character)) {
		type = "number";
	} else if (character == "(") {
		type = "(";
	} else if (character == ")") {
		type = ")";
	}
	return type;
}

// Returns letter, number, (, ) or null depending of string
function getStringType (string) {
	var type = "null";
	if (string.match(/[a-z]/i)) {
		type = "letter";
	} else if (!isNaN(string)) {
		type = "number";
	} else if (string == "(") {
		type = "(";
	} else if (string == ")") {
		type = ")";
	}
	return type;
}

// Outputs formatted div to main container based on input
function output (leftRaw, leftFormatted, right) {
	$("#outputContainer").append("<div class='output'><div class='output-left'><p>" + leftRaw + "</p><p>" + leftFormatted + "</p></div><div class='output-right'><p>" + right + "</p></div></div>");
}

//Sets page color based on input "color"
function setColor (color) {
	localStorage.setItem('color', color)			// Sets localStorage item color to input
	$("body").removeClass().addClass(color, 1000);	// Replaces all classes from body with input color
}

//Checks for color and sets it to it
function loadColor() {
	var  color = "blue-grey"; //Default load color is grey-blue
	if (localStorage.getItem('color') == "null" || localStorage.getItem('color') == null) {
		localStorage.setItem('color', color);
	}
	color = localStorage.getItem('color');
	setColor(color);
}

function getAofEAccurate (element) {
	var wt = "-1";
	element = element.toLowerCase();
	if      (element ==   'h' || element ==	     'hydrogen') {wt =   '1.0079'}
	else if (element ==  'he' || element ==	       'helium') {wt =   '4.0026'}
	else if (element ==  'li' || element ==	      'lithium') {wt =    '6.941'}
	else if (element ==  'be' || element ==	    'beryllium') {wt =   '9.0122'}
	else if (element ==   'b' || element ==	        'boron') {wt =   '10.811'}
	else if (element ==   'c' || element ==	       'carbon') {wt =  '12.0107'}
	else if (element ==   'n' || element ==	     'nitrogen') {wt =  '14.0067'}
	else if (element ==   'o' || element ==	       'oxygen') {wt =  '15.9994'}
	else if (element ==   'f' || element ==	     'fluorine') {wt =  '18.9984'}
	else if (element ==  'ne' || element ==	         'neon') {wt =  '20.1797'}
	else if (element ==  'na' || element ==	       'sodium') {wt =  '22.9897'}
	else if (element ==  'mg' || element ==	    'magnesium') {wt =   '24.305'}
	else if (element ==  'al' || element ==	     'aluminum') {wt =  '26.9815'}
	else if (element ==  'si' || element ==	      'silicon') {wt =  '28.0855'}
	else if (element ==   'p' || element ==	   'phosphorus') {wt =  '30.9738'}
	else if (element ==   's' || element ==	       'sulfur') {wt =   '32.065'}
	else if (element ==  'cl' || element ==	     'chlorine') {wt =   '35.453'}
	else if (element ==  'ar' || element ==	        'argon') {wt =   '39.948'}
	else if (element ==   'k' || element ==	    'potassium') {wt =  '39.0983'}
	else if (element ==  'ca' || element ==	      'calcium') {wt =   '40.078'}
	else if (element ==  'sc' || element ==	     'scandium') {wt =  '44.9559'}
	else if (element ==  'ti' || element ==	     'titanium') {wt =   '47.867'}
	else if (element ==   'v' || element ==	     'vanadium') {wt =  '50.9415'}
	else if (element ==  'cr' || element ==	     'chromium') {wt =  '51.9961'}
	else if (element ==  'mn' || element ==	    'manganese') {wt =   '54.938'}
	else if (element ==  'fe' || element ==	         'iron') {wt =   '55.845'}
	else if (element ==  'co' || element ==	       'cobalt') {wt =  '58.9332'}
	else if (element ==  'ni' || element ==	       'nickel') {wt =  '58.6934'}
	else if (element ==  'cu' || element ==	       'copper') {wt =   '63.546'}
	else if (element ==  'zn' || element ==	         'zinc') {wt =    '65.39'}
	else if (element ==  'ga' || element ==	      'gallium') {wt =   '69.723'}
	else if (element ==  'ge' || element ==	    'germanium') {wt =    '72.64'}
	else if (element ==  'as' || element ==	      'arsenic') {wt =  '74.9216'}
	else if (element ==  'se' || element ==	     'selenium') {wt =    '78.96'}
	else if (element ==  'br' || element ==	      'bromine') {wt =   '79.904'}
	else if (element ==  'kr' || element ==	      'krypton') {wt =     '83.8'}
	else if (element ==  'rb' || element ==	     'rubidium') {wt =  '85.4678'}
	else if (element ==  'sr' || element ==	    'strontium') {wt =    '87.62'}
	else if (element ==   'y' || element ==	      'yttrium') {wt =  '88.9059'}
	else if (element ==  'zr' || element ==	    'zirconium') {wt =   '91.224'}
	else if (element ==  'nb' || element ==	      'niobium') {wt =  '92.9064'}
	else if (element ==  'mo' || element ==	   'molybdenum') {wt =    '95.94'}
	else if (element ==  'tc' || element ==	   'technetium') {wt =       '98'}
	else if (element ==  'ru' || element ==	    'ruthenium') {wt =   '101.07'}
	else if (element ==  'rh' || element ==	      'rhodium') {wt = '102.9055'}
	else if (element ==  'pd' || element ==	    'palladium') {wt =   '106.42'}
	else if (element ==  'ag' || element ==	       'silver') {wt = '107.8682'}
	else if (element ==  'cd' || element ==	      'cadmium') {wt =  '112.411'}
	else if (element ==  'in' || element ==	       'indium') {wt =  '114.818'}
	else if (element ==  'sn' || element ==	          'tin') {wt =   '118.71'}
	else if (element ==  'sb' || element ==	     'antimony') {wt =   '121.76'}
	else if (element ==  'te' || element ==	    'tellurium') {wt =    '127.6'}
	else if (element ==   'i' || element ==	       'iodine') {wt = '126.9045'}
	else if (element ==  'xe' || element ==	        'xenon') {wt =  '131.293'}
	else if (element ==  'cs' || element ==	       'cesium') {wt = '132.9055'}
	else if (element ==  'ba' || element ==	       'barium') {wt =  '137.327'}
	else if (element ==  'la' || element ==	    'lanthanum') {wt = '138.9055'}
	else if (element ==  'ce' || element ==	       'cerium') {wt =  '140.116'}
	else if (element ==  'pr' || element ==	 'praseodymium') {wt = '140.9077'}
	else if (element ==  'nd' || element ==	    'neodymium') {wt =   '144.24'}
	else if (element ==  'pm' || element ==	   'promethium') {wt =      '145'}
	else if (element ==  'sm' || element ==	     'samarium') {wt =   '150.36'}
	else if (element ==  'eu' || element ==	     'europium') {wt =  '151.964'}
	else if (element ==  'gd' || element ==	   'gadolinium') {wt =   '157.25'}
	else if (element ==  'tb' || element ==	      'terbium') {wt = '158.9253'}
	else if (element ==  'dy' || element ==	   'dysprosium') {wt =    '162.5'}
	else if (element ==  'ho' || element ==	      'holmium') {wt = '164.9303'}
	else if (element ==  'er' || element ==	       'erbium') {wt =  '167.259'}
	else if (element ==  'tm' || element ==	      'thulium') {wt = '168.9342'}
	else if (element ==  'yb' || element ==	    'ytterbium') {wt =   '173.04'}
	else if (element ==  'lu' || element ==	     'lutetium') {wt =  '174.967'}
	else if (element ==  'hf' || element ==	      'hafnium') {wt =   '178.49'}
	else if (element ==  'ta' || element ==	     'tantalum') {wt = '180.9479'}
	else if (element ==   'w' || element ==	     'tungsten') {wt =   '183.84'}
	else if (element ==  're' || element ==	      'rhenium') {wt =  '186.207'}
	else if (element ==  'os' || element ==	       'osmium') {wt =   '190.23'}
	else if (element ==  'ir' || element ==	      'iridium') {wt =  '192.217'}
	else if (element ==  'pt' || element ==	     'platinum') {wt =  '195.078'}
	else if (element ==  'au' || element ==	         'gold') {wt = '196.9665'}
	else if (element ==  'hg' || element ==	      'mercury') {wt =   '200.59'}
	else if (element ==  'tl' || element ==	     'thallium') {wt = '204.3833'}
	else if (element ==  'pb' || element ==	         'lead') {wt =    '207.2'}
	else if (element ==  'bi' || element ==	      'bismuth') {wt = '208.9804'}
	else if (element ==  'po' || element ==	     'polonium') {wt =      '209'}
	else if (element ==  'at' || element ==	     'astatine') {wt =      '210'}
	else if (element ==  'rn' || element ==	        'radon') {wt =      '222'}
	else if (element ==  'fr' || element ==	     'francium') {wt =      '223'}
	else if (element ==  'ra' || element ==	       'radium') {wt =      '226'}
	else if (element ==  'ac' || element ==	     'actinium') {wt =      '227'}
	else if (element ==  'th' || element ==	      'thorium') {wt = '232.0381'}
	else if (element ==  'pa' || element ==	 'protactinium') {wt = '231.0359'}
	else if (element ==   'u' || element ==	      'uranium') {wt = '238.0289'}
	else if (element ==  'np' || element ==	    'neptunium') {wt =      '237'}
	else if (element ==  'pu' || element ==	    'plutonium') {wt =      '244'}
	else if (element ==  'am' || element ==	    'americium') {wt =      '243'}
	else if (element ==  'cm' || element ==	       'curium') {wt =      '247'}
	else if (element ==  'bk' || element ==	    'berkelium') {wt =      '247'}
	else if (element ==  'cf' || element ==	  'californium') {wt =      '251'}
	else if (element ==  'es' || element ==	  'einsteinium') {wt =      '252'}
	else if (element ==  'fm' || element ==	      'fermium') {wt =      '257'}
	else if (element ==  'md' || element ==	  'mendelevium') {wt =      '258'}
	else if (element ==  'no' || element ==	     'nobelium') {wt =      '259'}
	else if (element ==  'lr' || element ==	   'lawrencium') {wt =      '266'}
	else if (element ==  'rf' || element ==	'rutherfordium') {wt =      '267'}
	else if (element ==  'db' || element ==	      'dubnium') {wt =      '268'}
	else if (element ==  'sg' || element ==	   'seaborgium') {wt =      '269'}
	else if (element ==  'bh' || element ==	      'bohrium') {wt =      '270'}
	else if (element ==  'hs' || element ==	      'hassium') {wt =      '269'}
	else if (element ==  'mt' || element ==	   'meitnerium') {wt =      '278'}
	else if (element ==  'ds' || element ==	 'darmstadtium') {wt =      '281'}
	else if (element ==  'rg' || element ==	  'roentgenium') {wt =      '282'}
	else if (element ==  'cn' || element ==	  'copernicium') {wt =      '285'}
	else if (element == 'uut' || element ==	    'ununtrium') {wt =      '286'}
	else if (element ==  'fl' || element ==	    'flerovium') {wt =      '289'}
	else if (element == 'uup' || element ==	  'ununpentium') {wt =      '289'}
	else if (element ==  'lv' || element ==	  'livermorium') {wt =      '293'}
	else if (element == 'uus' || element ==	  'ununseptium') {wt =      '294'}
	else if (element == 'uuo' || element ==	   'ununoctium') {wt =      '294'}
	return wt;
}

// Takes element name or symbol as input and returns atomic weight as string to two decimals
function getAofEShaner (element) {
	var wt = -1;
	element = element.toLowerCase();
	if      (element == "h"  || element == "hydrogen")  {wt = 1.01;}
	else if (element == "he" || element == "helium")    {wt = 4.00;}
	else if (element == "li" || element == "lithium")   {wt = 6.94;}
	else if (element == "be" || element == "beryllium") {wt = 9.01;}
	else if (element == "b"  || element == "boron")     {wt = 10.81;}
	else if (element == "c"  || element == "carbon")    {wt = 12.01;}
	else if (element == "n"  || element == "nitrogen")  {wt = 14.01;}
	else if (element == "o"  || element == "oxygen")    {wt = 16.00;}
	else if (element == "f"  || element == "fluorine")  {wt = 19.00;}
	else if (element == "ne" || element == "neon")      {wt = 20.18;}
	else if (element == "na" || element == "sodium")    {wt = 22.99;}
	else if (element == "mg" || element == "magnesium") {wt = 24.31;}
	else if (element == "al" || element == "aluminum")  {wt = 26.98;}
	else if (element == "si" || element == "silicon")   {wt = 28.09;}
	else if (element == "p"  || element == "phosphorus"){wt = 30.97;}
	else if (element == "s"  || element == "sulfur")    {wt = 32.06;}
	else if (element == "cl" || element == "chlorine")  {wt = 35.45;}
	else if (element == "ar" || element == "argon")     {wt = 39.95;}
	else if (element == "k"  || element == "potassium") {wt = 39.10;}
	else if (element == "ca" || element == "calcium")   {wt = 40.08;}
	else if (element == "sc" || element == "scandium")  {wt = 44.96;}
	else if (element == "ti" || element == "titanium")  {wt = 47.88;}
	else if (element == "v"  || element == "vanadium")  {wt = 50.94;}
	else if (element == "cr" || element == "chromium")  {wt = 52.00;}
	else if (element == "mn" || element == "manganese") {wt = 54.94;}
	else if (element == "fe" || element == "iron") {wt = 55.85;}
	else if (element == "co" || element == "cobalt") {wt = 58.93;}
	else if (element == "ni" || element == "nickel") {wt = 58.69;}
	else if (element == "cu" || element == "copper") {wt = 63.55;}
	else if (element == "zn" || element == "zinc") {wt = 65.39;}
	else if (element == "ga" || element == "gallium") {wt = 69.72;}
	else if (element == "ge" || element == "germanium") {wt = 72.64;}
	else if (element == "as" || element == "arsenic") {wt = 74.92;}
	else if (element == "se" || element == "selenium") {wt = 78.96;}
	else if (element == "br" || element == "bromine") {wt = 79.9;}
	else if (element == "kr" || element == "krypton") {wt = 83.79;}
	else if (element == "rb" || element == "rubidium") {wt = 85.47;}
	else if (element == "sr" || element == "strontium") {wt = 87.62;}
	else if (element == "y"  || element == "yttrium") {wt = 88.91;}
	else if (element == "zr" || element == "zirconium") {wt = 91.22;}
	else if (element == "nb" || element == "niobium") {wt = 92.91;}
	else if (element == "mo" || element == "molybdenum") {wt = 95.94;}
	else if (element == "tc" || element == "technetium") {wt = 98;}
	else if (element == "ru" || element == "ruthenium") {wt = 101.1;}
	else if (element == "rh" || element == "rhodium") {wt = 102.9;}
	else if (element == "pd" || element == "palladium") {wt = 106.4;}
	else if (element == "ag" || element == "silver") {wt = 107.9;}
	else if (element == "cd" || element == "cadmium") {wt = 112.4;}
	else if (element == "in" || element == "indium") {wt = 114.8;}
	else if (element == "sn" || element == "tin") {wt = 118.7;}
	else if (element == "sb" || element == "antimony") {wt = 121.8;}
	else if (element == "te" || element == "tellurium") {wt = 127.6;}
	else if (element == "i"  || element == "iodine") {wt = 126.9;}
	else if (element == "xe" || element == "xenon") {wt = 131.3;}
	else if (element == "cs" || element == "cesium") {wt = 132.9;}
	else if (element == "ba" || element == "barium") {wt = 137.3;}
	else if (element == "la" || element == "lanthanum") {wt = 138.9;}
	else if (element == "ce" || element == "cerium") {wt = 140.1;}
	else if (element == "pr" || element == "praseodymium") {wt = 140.9;}
	else if (element == "nd" || element == "neodymium") {wt = 144.2;}
	else if (element == "pm" || element == "promethium") {wt = 145;}
	else if (element == "sm" || element == "samarium") {wt = 150.4;}
	else if (element == "eu" || element == "europium") {wt = 152;}
	else if (element == "gd" || element == "gadolinium") {wt = 157.2;}
	else if (element == "tb" || element == "terbium") {wt = 158.9;}
	else if (element == "dy" || element == "dysprosium") {wt = 162.5;}
	else if (element == "ho" || element == "holmium") {wt = 164.9;}
	else if (element == "er" || element == "erbium") {wt = 167.3;}
	else if (element == "tm" || element == "thulium") {wt = 168.9;}
	else if (element == "yb" || element == "ytterbium") {wt = 173;}
	else if (element == "lu" || element == "lutetium") {wt = 175;}
	else if (element == "hf" || element == "hafnium") {wt = 178.5;}
	else if (element == "ta" || element == "tantalum") {wt = 180.9;}
	else if (element == "w"  || element == "tungsten") {wt = 183.9;}
	else if (element == "re" || element == "rhenium") {wt = 186.2;}
	else if (element == "os" || element == "osmium") {wt = 190.2;}
	else if (element == "ir" || element == "iridium") {wt = 192.2;}
	else if (element == "pt" || element == "platinum") {wt = 195.1;}
	else if (element == "au" || element == "gold") {wt = 197;}
	else if (element == "hg" || element == "mercury") {wt = 200.5;}
	else if (element == "tl" || element == "thallium") {wt = 204.4;}
	else if (element == "pb" || element == "lead") {wt = 207.2;}
	else if (element == "bi" || element == "bismuth") {wt = 209;}
	else if (element == "po" || element == "polonium") {wt = 209;}
	else if (element == "at" || element == "astatine") {wt = 210;}
	else if (element == "rn" || element == "radon") {wt = 222;}
	else if (element == "fr" || element == "francium") {wt = 223;}
	else if (element == "ra" || element == "radium") {wt = 226;}
	else if (element == "ac" || element == "actinium") {wt = 227;}
	else if (element == "th" || element == "thorium") {wt = 232;}
	else if (element == "pa" || element == "protactinium") {wt = 231;}
	else if (element == "u"  || element == "uranium") {wt = 238;}
	else if (element == "np" || element == "neptunium") {wt = 237;}
	else if (element == "pu" || element == "plutonium") {wt = 242;}
	else if (element == "am" || element == "americium") {wt = 243;}
	else if (element == "cm" || element == "curium") {wt = 247;}
	else if (element == "bk" || element == "berkelium") {wt = 247;}
	else if (element == "cf" || element == "californium") {wt = 251;}
	else if (element == "es" || element == "einsteinium") {wt = 252;}
	else if (element == "fm" || element == "fermium") {wt = 257;}
	else if (element == "md" || element == "mendelevium") {wt = 258;}
	else if (element == "no" || element == "nobelium") {wt = 259;}
	else if (element == "lr" || element == "lawrencium") {wt = 262;}
	else if (element == "rf" || element == "rutherfordium") {wt = 265;}
	else if (element == "db" || element == "dubnium") {wt = 268;}
	else if (element == "sg" || element == "seaborgium") {wt = 271;}
	else if (element == "bh" || element == "bohrium") {wt = 270;}
	else if (element == "hs" || element == "hassium") {wt = 277;}
	else if (element == "mt" || element == "meitnerium") {wt = 276;}
	else if (element == "ds" || element == "darmstadtium") {wt = 281;}
	else if (element == "rg" || element == "roentgentium") {wt = 280;}
	else if (element == "cn" || element == "copernicum") {wt = 285;}
	else if (element == "uut"|| element == "ununtrium") {wt = 285;}
	else if (element == "fl" || element == "flerovium") {wt = 289;}
	else if (element == "uup"|| element == "ununpentium") {wt = 288;}
	else if (element == "lv" || element == "livermorium") {wt = 293;}
	else if (element == "uus"|| element == "ununseptium") {wt = 294;}
	else if (element == "uuo"|| element == "ununoctium") {wt = 294;}
	return wt;
}