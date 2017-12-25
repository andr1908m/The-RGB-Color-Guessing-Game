var squares = document.querySelectorAll(".square");

var correctValue;
var correctSquare;

var hard = false;



function reset(hard){
	document.querySelector("body").style.backgroundColor = "yellow";
	
	if(hard)
		document.querySelector(".currentdiff").textContent = "Hard Mode";
	else
		document.querySelector(".currentdiff").textContent = "Easy Mode";

	function tryAgain(){
		document.querySelector("#modetext").textContent = "Try Again";
		this.style.backgroundColor = "rgb(255, 255, 0)";
	}

	function rand255(){
    	return Math.round(Math.random()*256)
    }
	
	function correctSquare(){
		return Math.round(Math.random()*5);	
	}

	function randRgbEasy() {

    	var randArr = [rand255(), rand255(), rand255()];
    	for (var i = 0; i < randArr.length; i++) {
    		if(randArr[i]<50)
    			randArr[i]+=50;
    	}

    	var rgbString = 'rgb(' + randArr[0] + ', ' + randArr[1] + ', ' + randArr[2] + ')';
		return rgbString
	}

	function randRgbHard(randomZero){
		if(randomZero>0.66){
    		return 'rgb(' + rand255() + ', ' + rand255() + ', ' + 0 + ')';
		}
		else if(randomZero>0.33)
			return 'rgb(' + rand255() + ', ' + 0 + ', ' + rand255() + ')';
		else if(randomZero<=0.33)
			return 'rgb(' + 0 + ', ' + rand255() + ', ' + rand255() + ')';
	}

	// for correct square
	if(hard)
		correctValue = randRgbHard(Math.random());
	else
		correctValue = randRgbEasy();

	correctSquare = correctSquare();

	squares[correctSquare].style.backgroundColor = correctValue;

	//display string in title
	document.querySelector('#headtext').textContent = correctValue;

	//squator color populator
	randomZero = Math.random();
	for(var i=0; i<squares.length; i++){
		if(i != correctSquare){
			if (hard) 
				squares[i].style.backgroundColor = randRgbHard(randomZero);
			else
				squares[i].style.backgroundColor = randRgbEasy();
		}
	}

	//event listener populator
	for (var l = 0; l < squares.length; l++) {
		if(squares[l].style.backgroundColor == correctValue){
				//for true square
			squares[l].addEventListener("click", function(){
				document.querySelector("#modetext").textContent = "Nice!";

				for(var k = 0; k < squares.length; k++) {
					//change each color to match given color
					squares[k].style.background = correctValue;
					squares[k].removeEventListener("click", tryAgain);
				} 
			})
		}

		else{
			squares[l].addEventListener("click", tryAgain);
		}
	}

	

}





document.querySelector("#new").addEventListener("click", function(){reset(hard);});
document.querySelector("#easy").addEventListener("click", function(){hard = false; reset(hard);});
document.querySelector("#hard").addEventListener("click", function(){hard = true; reset(hard);});

reset(false);
