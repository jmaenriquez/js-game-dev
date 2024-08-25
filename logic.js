// console.log("Hello World");


//variables
let board;
let score = 0;
let rows = 4;
let col = 4;
let is2048exist = false;
let is4096exist = false;
let is8192exist = false;


// Function

// Start
function setGame(){
	board =[
		[0,0,0,0,],
		[0,0,0,0,],
		[0,0,0,0,],
		[0,0,0,0,]
	];

	//Gameboard on HTML
	// x = row, y = col

	for(let x = 0; x < rows; x++){
		for (let y = 0; y < col; y++){
			// console.log(`[x${x} - y${y}]`)

			//this is the tile
			let tile = document.createElement("div");

			//Set ID on tiles base on coordinates
			tile.id = x.toString() + "-" + y.toString();

			//get num from board
			let num = board[x][y];

			updateTile(tile, num);

			//Place tile inside board
			document.getElementById('board').append(tile);
		}
	}

	setTwo();
	setTwo();
}

// setGame();
//end of setGame


//Update Tile function
function updateTile(tile, num){

	//clear tile text
	tile.innerText = "";

	//clear classList
	tile.classList.value = "";

	//add class
	tile.classList.add("tile");

	//check current num
	if(num > 0){
		tile.innerText = num.toString();

		if(num <= 4096){
			tile.classList.add("x" + num.toString());
		}
	}
}
//end of updateTile()


//start window.onload

//event happens when event finishes loading
window.onload = function(){
	setGame();
}
//end window.onload


//start of handleSlide

//"e" is an event object
function handleSlide(e){
	console.log(e.code);

	if(["ArrowLeft", "ArrowRight","ArrowUp", "ArrowDown"].includes(e.code)){


		e.preventDefault();

		if(e.code == "ArrowLeft"){
			slideLeft();
			setTwo();
		}
		else if (e.code == "ArrowRight") {
			slideRight();
			setTwo();
		}
		else if (e.code == "ArrowUp") {
			slideUp();
			setTwo();
		}
		else if (e.code == "ArrowDown") {
			slideDown();
			setTwo();
		}

		document.getElementById("score").innerText = score;

		setTimeout(()=>{

		//Logical Error sa if pero sa else wala
				if(lost()){
					alert("Game Over!");
					restartGame();
					alert("Press any key to restart");
				}
				else{
					checkWin();
				}
			}, 100)

	}

}
document.addEventListener("keydown", handleSlide);
//end of slide


//filterZero function
function filterZero(tiles){

	return tiles.filter(num => num != 0);
}


//slide() function
function slide(tiles){

	tiles = filterZero(tiles);

	for (let i = 0; i < tiles.length; i++){

		if(tiles [i] == tiles [i+1]){

			tiles[i] *= 2;
			tiles[i+1] = 0; 

			score += tiles[i];
		}
	}


	tiles = filterZero(tiles);

	while(tiles.length < 4){
		tiles.push(0);
	}

	return tiles;
}

//slideLeft Function
function slideLeft(){
	for(let x=0; x<rows; x++){

		let row = board[x]; 

		let originalRow = row.slice();

		row = slide(row);

		board[x] = row;

		for(let y=0; y<col; y++){
			let tile = document.getElementById(x.toString() + "-" + y.toString());
            let num = board[x][y];

            if (originalRow[y] !== num && num!== 0){

            	tile.style.animation = "slide-from-right 0.3s";

            	setTimeout(() => {
            		tile.style.animation ="";
            	}, 300);
            }


            updateTile(tile, num);
		}
	}
}


//slideRight function
function slideRight(){
	for(let x=0; x<rows; x++){

		let row = board[x];

		let originalRow = row.slice();
 

		row.reverse();

		row = slide(row);

		row.reverse();

		board[x] = row;

		for(let y=0; y<col; y++){
			let tile = document.getElementById(x.toString() + "-" + y.toString());
            let num = board[x][y];

            if (originalRow[y] !== num && num !== 0){

            	tile.style.animation = "slide-from-left 0.3s";

            	setTimeout(() => {
            		tile.style.animation ="";
            	}, 300);
            }

            updateTile(tile, num);
		}
	}
}


//slideUp Function
function slideUp() {
    for (let y = 0; y < col; y++) {

        let column = [board[0][y], board[1][y], board[2][y], board[3][y]];

        let originalCol = column.slice();

        column = slide(column);

        for (let x = 0; x < rows; x++) {
            board[x][y] = column[x];
            let tile = document.getElementById(x.toString() + "-" + y.toString());
            let num = board[x][y];

            if (originalCol[x] !== num && num !== 0){

            	tile.style.animation = "slide-from-bottom 0.3s";

            	setTimeout(() => {
            		tile.style.animation = "";
            	}, 300);
            }


            updateTile(tile, num);
        }
    }
}


function slideDown() {
    for (let y = 0; y < col; y++) {

        let column = [board[0][y], board[1][y], board[2][y], board[3][y]];

        let originalCol = column.slice();
        
        column.reverse();
        column = slide(column);
        column.reverse();

        for (let x = 0; x < rows; x++) {
            board[x][y] = column[x];
            let tile = document.getElementById(x.toString() + "-" + y.toString());
            let num = board[x][y];

            if (originalCol[x] !== num && num !== 0){

            	tile.style.animation = "slide-from-top 0.3s";

            	setTimeout(() => {
            		tile.style.animation = "";
            	}, 300);
            }

            updateTile(tile, num);
        }
    }
}


function mtTile(){
	for(let x = 0; x < rows; x++){
		for(let y = 0; y < col; y++){
			if (board[x][y] == 0){
				return true;
			}
		}
	}

	return false;
}


function setTwo(){
	if (!mtTile()){
		return;
	}

	let found = false;

	while(!found) {

		let x = Math.floor(Math.random() * rows);
		let y = Math.floor(Math.random() * col);

		if(board[x][y] == 0){
			board[x][y] = 2;
			let tile = document.getElementById(x.toString() + "-" + y.toString());
			tile.innerText = "2";
			tile.classList.add("x2");

			found = true;
		}
	}
}




//Checkwin start
function checkWin(){
	for(let x=0; x<rows; x++){
		for(let y=0; y<col; y++){
			// check if the current tile is a winning tile
			// once 2048 already exist the alert message will only pop once.
			if(board[x][y] == 2048 && is2048exist == false){
				alert("Congrats! You got 2048.");
				is2048exist = true; 
			}
			else if(board[x][y] == 4096 && is4096exist == false){
				alert("Congrats! You got 4096.");
				is4096exist = true;
			}
			else if(board[x][y] == 8192 && is8192exist == false){
				alert("Congrats! You got 8192.");
				is8192exist = true;
			}
		}
	}
}
//checkwin end

//function lost() start
function lost(){
	for(let x = 0; x < rows; x++){
		for(let y = 0; y < col; y++){

			if(board[x][y] == 0){
				return false;
			}

			const currentTile = board[x][y];

			if(
				x > 0 && board[x - 1][y] == currentTile ||
                x < rows - 1 && board[x + 1][y] == currentTile ||
                y > 0 && board[x][y - 1] == currentTile ||
                y < col - 1 && board[x][y + 1] == currentTile 

			){
				
				return false;

			}
		}
	}

	return true;
}


function restartGame(){
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    
    setTwo();
	score = 0;
}


//For Mobile

let startX = 0;
let startY = 0;

document.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;

})


document.addEventListener("touchmove", (e) => {
    if (!e.target.className.includes("tile")) {
        return
    }

    e.preventDefault();
}, {passive: false});


document.addEventListener("touchend", (e) => {

    if(!e.target.className.includes("tile")){
        return
    }

    
    let diffX = startX - e.changedTouches[0].clientX;
    let diffY = startY - e.changedTouches[0].clientY;

    console.log(diffY);
    console.log(diffX);

    if(Math.abs(diffX) > Math.abs(diffY)){
    	if(diffX > 0){
    		slideLeft();
    		setTwo();
    	}
    	else{
    		slideRight();
    		setTwo();
    		
    	}

    }

    else{
    	if (diffY > 0){
    		slideUp();
    		setTwo();
    	}
    	else{
    		slideDown();
    		setTwo();
    	}
    }

    document.getElementById("score").innerText = score;


    setTimeout(()=>{

    //Logical Error sa if pero sa else wala
    		if(lost()){
    			alert("Game Over!");
    			restartGame();
    			alert("Press any key to restart");
    		}
    		else{
    			checkWin();
    		}
    	}, 100)
})