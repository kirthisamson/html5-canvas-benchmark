//get a reference to the canvas
/*var ctx = $('#canvas')[0].getContext("2d");
 
//draw a circle
ctx.fillStyle = "#00A308";
ctx.beginPath();
ctx.arc(75, 75, 10, 0, Math.PI*2, true); 
ctx.closePath();
ctx.fill();*/



//BEGIN LIBRARY CODE
var x = 150;
var y = 150;
var dx = -2;
var dy = 4;
var WIDTH;
var HEIGHT;
var ctx;
var colors = ["#FF1C0A", "#FFFD0A", "#00A308", "#0008DB", "#EB0093"];
var balls = [];
var stats;
var ballCount;
var fps;
var fps_on = 1;
var iteration = 0;

function init() {
fps = 0;
balls = [];
ballCount = 0;
fps_on = 1;


		//container = document.createElement( 'div' );
		//document.body.appendChild( container );
		//alert("init");
		ctx = $('#canvas')[0].getContext("2d");
		WIDTH = $("#canvas").width();
		HEIGHT = $("#canvas").height();

/*var number = 0;
while(number<500){
		newBall();
		number++
	}*/

	//balls.push(new ball(x,y,10,dx,dy,colors[2]));
	//balls.push(new ball(x+10,y+10,10,dx,dy,colors[0]));
	//balls.push(new ball(x+20,y,20,dx,dy,colors[3]));
	//balls.push(new ball(x+40,y+40,10,dx,dy,colors[4]));

	console.log(balls.length);

	stats = new Stats();
	stats.setMode( 0);
	document.getElementById('st').appendChild( stats.domElement );
	//document.getElementById('stats').addClass('center');
	//document.body.appendChild( stats.domElement );

	//return setInterval(draw, 10);

}

function newBall(){
	balls.push(new ball(Math.floor((Math.random() * 150) + 1),Math.floor((Math.random() * 150) + 1),10,Math.floor((Math.random() * 10) + 1),Math.floor((Math.random() * 10) + 1),colors[Math.floor((Math.random() * 5))]));
}


function circle(x,y,r,color) {
	console.log("circle "+ x,y,r,color);
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
}

function rect(x,y,w,h) {
	ctx.beginPath();
	ctx.rect(x,y,w,h);
	ctx.closePath();
	ctx.fill();
}

function clear() {
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

//END LIBRARY CODE

function draw() {

fps = getFPS();


if(fps_on){
	clear();
	//while(ballCount<800){
		newBall();
		ballCount = ballCount+1;
		updateBallCount();
	//}


	$('#fps_number').text(fps);

	//var c = colors[Math.floor(Math.random() * colors.length)];
	//circle(x, y, 10, c);
	stats.begin();
	for (i=0; i<balls.length; i++)
	{
		//console.log("draw for loop");
		//alert("ball at "+ i + " is "+balls);
		var thisball = balls[i];
		if (thisball.x + thisball.dx > WIDTH || thisball.x + thisball.dx < 0)
			//alert("1");
		thisball.dx = -thisball.dx;
		if (thisball.y + thisball.dy > HEIGHT || thisball.y + thisball.dy < 0)
			//alert("2");
		thisball.dy = -thisball.dy;

		thisball.x += thisball.dx;
		//x += dx;
		thisball.y += thisball.dy;
		//alert("");
		circle(thisball.x,thisball.y,10,thisball.color);
		
		//y += dy;
	}
	stats.end();
	if(fps < 31){
		fps_on = 0;
		//createAndInsertRowInTable();
	}
}
}

function updateBallCount(){
	$('#ballcount').text(ballCount);
}

function getFPS(){
	//alert($('#fps').text());

	var fpsText = $('#fps').text()
	var fpsTextArray = fpsText.split(" ");
	return fpsTextArray[0];
	}

	function createAndInsertRowInTable(){
		alert("");
		var table = $('#resultsTable');
		
		iteration = iteration+1;
		if(iteration == 1)
			table.removeClass('invisible');	
		var tr = "<tr><td> "+iteration +"</td><td> "+ballCount+ "</td></tr>";
		table.append(tr);
	}

/*function Ball(x, y, vx, vy, color) {
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.color = color;
	this.origX = x;
	this.origY = y;
	this.radius = 10;
}*/

function ball(x, y, r,dx,dy, color) {
	//console.log("Ball");
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.color = color;
	this.origX = x;
	this.origY = y;
	this.radius = r;
}
$( "#start" ).click(function() {
	//if(iteration==0){
  init();
  $('#start').addClass('invisible');
/*}
else{
	fps = 0;
balls = [];
ballCount = 0;
fps_on = 1;
}*/
  setInterval(draw, 10);
});
