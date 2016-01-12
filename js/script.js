
document.onkeydown = checkKey;
function checkKey(e) {
	e = e || window.event;											
	if (e.keyCode == '13') {
		var input  = $( "#textInput" ).val();
		input = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
		if (input == "Clear") {
			$("#outputContainer").empty();
		} else if (input == ""){
		} else {
			var out = getA(input);
			if (out == "-1.00") {
				out = "Not Found";
			}
			output(input, out);
		}
		$( "#textInput" ).val("");
	}
}

function setColor (color) {
	localStorage.setItem('color', color)
	$("body").removeClass().addClass(color, 1000);
}

function loadColor() {
	var  color = "deep-orange";
	if (localStorage.getItem('color') == "null" || localStorage.getItem('color') == null) {
		localStorage.setItem('color', color);
	}
	color = localStorage.getItem('color');
	setColor(color);
}

function output (left, right) {
	$("#outputContainer").append("<div class='output'><div class='output-left'><p>" + left + "</p></div><div class='output-right'><p>" + right + "</p></div></div>");
}

function getA (input) {
	var wt = -1;
	input = input.toLowerCase();
	if      (input == "h"  || input == "hydrogen")  {wt = 1.01;}
	else if (input == "he" || input == "helium")    {wt = 4;}
	else if (input == "li" || input == "lithium")   {wt = 6.94;}
	else if (input == "be" || input == "beryllium") {wt = 9.01;}
	else if (input == "b"  || input == "boron")     {wt = 10.81;}
	else if (input == "c"  || input == "carbon")    {wt = 12.01;}
	else if (input == "n"  || input == "nitrogen")  {wt = 14.01;}
	else if (input == "o"  || input == "oxygen")    {wt = 16;}
	else if (input == "f"  || input == "fluorine")  {wt = 19;}
	else if (input == "ne" || input == "neon")      {wt = 20.18;}
	else if (input == "na" || input == "sodium")    {wt = 22.99;}
	else if (input == "mg" || input == "magnesium") {wt = 24.31;}
	else if (input == "al" || input == "aluminum")  {wt = 26.98;}
	else if (input == "si" || input == "silicon")   {wt = 28.09;}
	else if (input == "p"  || input == "phosphorus") {wt = 30.97;}
	else if (input == "s"  || input == "sulfur") {wt = 32.06;}
	else if (input == "cl" || input == "chlorine") {wt = 35.45;}
	else if (input == "ar" || input == "argon") {wt = 39.95;}
	else if (input == "k"  || input == "potassium") {wt = 39.1;}
	else if (input == "ca" || input == "calcium") {wt = 40.08;}
	else if (input == "sc" || input == "scandium") {wt = 44.96;}
	else if (input == "ti" || input == "titanium") {wt = 47.88;}
	else if (input == "v"  || input == "vanadium") {wt = 50.94;}
	else if (input == "cr" || input == "chromium") {wt = 52;}
	else if (input == "mn" || input == "manganese") {wt = 54.94;}
	else if (input == "fe" || input == "iron") {wt = 55.85;}
	else if (input == "co" || input == "cobalt") {wt = 58.93;}
	else if (input == "ni" || input == "nickel") {wt = 58.69;}
	else if (input == "cu" || input == "copper") {wt = 63.55;}
	else if (input == "zn" || input == "zinc") {wt = 65.39;}
	else if (input == "ga" || input == "gallium") {wt = 69.72;}
	else if (input == "ge" || input == "germanium") {wt = 72.64;}
	else if (input == "as" || input == "arsenic") {wt = 74.92;}
	else if (input == "se" || input == "selenium") {wt = 78.96;}
	else if (input == "br" || input == "bromine") {wt = 79.9;}
	else if (input == "kr" || input == "krypton") {wt = 83.79;}
	else if (input == "rb" || input == "rubidium") {wt = 85.47;}
	else if (input == "sr" || input == "strontium") {wt = 87.62;}
	else if (input == "y"  || input == "yttrium") {wt = 88.91;}
	else if (input == "zr" || input == "zirconium") {wt = 91.22;}
	else if (input == "nb" || input == "niobium") {wt = 92.91;}
	else if (input == "mo" || input == "molybdenum") {wt = 95.94;}
	else if (input == "tc" || input == "technetium") {wt = 98;}
	else if (input == "ru" || input == "ruthenium") {wt = 101.1;}
	else if (input == "rh" || input == "rhodium") {wt = 102.9;}
	else if (input == "pd" || input == "palladium") {wt = 106.4;}
	else if (input == "ag" || input == "silver") {wt = 107.9;}
	else if (input == "cd" || input == "cadmium") {wt = 112.4;}
	else if (input == "in" || input == "indium") {wt = 114.8;}
	else if (input == "sn" || input == "tin") {wt = 118.7;}
	else if (input == "sb" || input == "antimony") {wt = 121.8;}
	else if (input == "te" || input == "tellurium") {wt = 127.6;}
	else if (input == "i"  || input == "iodine") {wt = 126.9;}
	else if (input == "xe" || input == "xenon") {wt = 131.3;}
	else if (input == "cs" || input == "cesium") {wt = 132.9;}
	else if (input == "ba" || input == "barium") {wt = 137.3;}
	else if (input == "la" || input == "lanthanum") {wt = 138.9;}
	else if (input == "ce" || input == "cerium") {wt = 140.1;}
	else if (input == "pr" || input == "praseodymium") {wt = 140.9;}
	else if (input == "nd" || input == "neodymium") {wt = 144.2;}
	else if (input == "pm" || input == "promethium") {wt = 145;}
	else if (input == "sm" || input == "samarium") {wt = 150.4;}
	else if (input == "eu" || input == "europium") {wt = 152;}
	else if (input == "gd" || input == "gadolinium") {wt = 157.2;}
	else if (input == "tb" || input == "terbium") {wt = 158.9;}
	else if (input == "dy" || input == "dysprosium") {wt = 162.5;}
	else if (input == "ho" || input == "holmium") {wt = 164.9;}
	else if (input == "er" || input == "erbium") {wt = 167.3;}
	else if (input == "tm" || input == "thulium") {wt = 168.9;}
	else if (input == "yb" || input == "ytterbium") {wt = 173;}
	else if (input == "lu" || input == "lutetium") {wt = 175;}
	else if (input == "hf" || input == "hafnium") {wt = 178.5;}
	else if (input == "ta" || input == "tantalum") {wt = 180.9;}
	else if (input == "w"  || input == "tungsten") {wt = 183.9;}
	else if (input == "re" || input == "rhenium") {wt = 186.2;}
	else if (input == "os" || input == "osmium") {wt = 190.2;}
	else if (input == "ir" || input == "iridium") {wt = 192.2;}
	else if (input == "pt" || input == "platinum") {wt = 195.1;}
	else if (input == "au" || input == "gold") {wt = 197;}
	else if (input == "hg" || input == "mercury") {wt = 200.5;}
	else if (input == "tl" || input == "thallium") {wt = 204.4;}
	else if (input == "pb" || input == "lead") {wt = 207.2;}
	else if (input == "bi" || input == "bismuth") {wt = 209;}
	else if (input == "po" || input == "polonium") {wt = 209;}
	else if (input == "at" || input == "astatine") {wt = 210;}
	else if (input == "rn" || input == "radon") {wt = 222;}
	else if (input == "fr" || input == "francium") {wt = 223;}
	else if (input == "ra" || input == "radium") {wt = 226;}
	else if (input == "ac" || input == "actinium") {wt = 227;}
	else if (input == "th" || input == "thorium") {wt = 232;}
	else if (input == "pa" || input == "protactinium") {wt = 231;}
	else if (input == "u"  || input == "uranium") {wt = 238;}
	else if (input == "np" || input == "neptunium") {wt = 237;}
	else if (input == "pu" || input == "plutonium") {wt = 242;}
	else if (input == "am" || input == "americium") {wt = 243;}
	else if (input == "cm" || input == "curium") {wt = 247;}
	else if (input == "bk" || input == "berkelium") {wt = 247;}
	else if (input == "cf" || input == "californium") {wt = 251;}
	else if (input == "es" || input == "einsteinium") {wt = 252;}
	else if (input == "fm" || input == "fermium") {wt = 257;}
	else if (input == "md" || input == "mendelevium") {wt = 258;}
	else if (input == "no" || input == "nobelium") {wt = 259;}
	else if (input == "lr" || input == "lawrencium") {wt = 262;}
	else if (input == "rf" || input == "rutherfordium") {wt = 265;}
	else if (input == "db" || input == "dubnium") {wt = 268;}
	else if (input == "sg" || input == "seaborgium") {wt = 271;}
	else if (input == "bh" || input == "bohrium") {wt = 270;}
	else if (input == "hs" || input == "hassium") {wt = 277;}
	else if (input == "mt" || input == "meitnerium") {wt = 276;}
	else if (input == "ds" || input == "darmstadtium") {wt = 281;}
	else if (input == "rg" || input == "roentgentium") {wt = 280;}
	else if (input == "cn" || input == "copernicum") {wt = 285;}
	else if (input == "uut"|| input == "ununtrium") {wt = 285;}
	else if (input == "fl" || input == "flerovium") {wt = 289;}
	else if (input == "uup"|| input == "ununpentium") {wt = 288;}
	else if (input == "lv" || input == "livermorium") {wt = 293;}
	else if (input == "uus"|| input == "ununseptium") {wt = 294;}
	else if (input == "uuo"|| input == "ununoctium") {wt = 294;}
	return wt.toFixed(2);
}