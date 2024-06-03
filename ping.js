const cvs = document.getElementById("pong");
const ctx = cvs.getContext("2d");
const cadr = document.getElementById("cadre");
// cvs.style.backgroundColor = "BLACK";
const hitSound = new Audio('./pong.ogg');
const ScoreSound = new Audio('./score.ogg')
var scoreTime = Date.now();
var currentTime;
var nis = cadr.offsetWidth / 1000;
cvs.width = cadr.offsetWidth;
cvs.height = 600 * nis;
console.log(cadr.offsetWidth);
var win_w = 1000;
var win_h = 600;
var scored = 1;
const ball = {
	r : 15,
	x : 1000 / 2,
	y : 600 / 2,
	w : 30 ,
	color : "WHITE",
	get top() {
		return this.y - this.r;
	},
	get bottom(){
		return this.y + this.r;
	},
	get left(){
		return this.x - this.r;
	},
	get right(){
		return this.x + this.r;
	},
	speed_X : -5,
    speed_Y : 0,
	speed: 5,
	max_speed: 23,
	step: 0.5
}

const user1 = {
	w : 15,
    h : 150,
    x : 5,
    y : 600 / 2 -  150 /2,
    score: 0,
    dv : 0,
    speed: 10,
    color : "#C322FF",
	get top(){
		return this.y;
	},
	get left(){
		return this.x;
	},
	get right(){
		return this.x + this.w;
	},
	get bottom(){
		return this.y + this.h;
	},
}

const user2 = {
    w : 15,
    h : 150,
    x : 1000 - 15 - 5,
    y : 600 / 2 -  150 /2,
    score: 0,
    dv : 0,
    speed: 10,
    color : "#0AC9FC",
	get top(){
		return this.y;
	},
	get left(){
		return this.x;
	},
	get right(){
		return this.x + this.w;
	},
	get bottom(){
		return this.y + this.h;
	},
}

//draw rect function
function drawPlayer(obj){
    ctx.fillStyle = obj.color;
    ctx.fillRect(obj.x * nis,obj.y*nis,obj.w *nis,obj.h *nis);
}

//draw Circle
function drawBall(obj){
    ctx.fillStyle = obj.color;
    ctx.beginPath();
    ctx.arc(obj.x *nis,obj.y *nis,obj.r*nis,0,Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}

//draw nit
function drawNit(){
	ctx.fillStyle = "WHITE";
    ctx.fillRect(win_w *nis  / 2, 0 , 1 * nis, win_h *nis);
}

function drawText(x, y, text, color){
    ctx.fillStyle = color;
    ctx.font = nis * 50 +"px Arial";
    ctx.fillText(text, x * nis, y * nis);
}

// function collision(ball, player){
// 	return ball.righ < player.left;
// }

function collision(b, p){
    return b.right > p.left && b.bottom > p.top
		&& b.left < p.right && b.top  < p.bottom;
}

function playHitSound() {
	hitSound.currentTime = 0; // Rewind to the start
	hitSound.play();
}

function ballAnimation(){
	ball.x+=ball.speed_X;
	ball.y+=ball.speed_Y;
	if (ball.top <= 0){
		ball.y = ball.r;
		ball.speed_Y *= -1;
	}
	else if (ball.bottom >= win_h){
		ball.y = win_h - ball.r
		ball.speed_Y *= -1;
	}

	if (ball.left <= 0){
		scoreTime = Date.now();
		ScoreSound.play();
		user2.score++;
	}
	if (ball.right >= win_w){
		ScoreSound.play();
		scoreTime = Date.now();
		user1.score++;
	}

	let player;
	if (ball.x > win_w / 2)
		player = user2;
	else
		player = user1;
	console.log(ball.speed);
	if (collision(ball, player)){
		playHitSound();
		if ((Math.abs(ball.right - player.left) < ball.w && ball.speed_X > 0)
			|| (Math.abs(ball.left - player.right) < ball.w && ball.speed_X < 0))
		{
			let collidePoint = ball.y - (player.y + player.h / 2)
			collidePoint = collidePoint / (player.h / 2);
			let angleRad = collidePoint * Math.PI/4 ;
		
			let dir ;
			let dir2 ;
			if (ball.left > win_w / 2){
				dir2 = -1;
				dir = -1;
			}
			else{
				dir2 = 1;
				dir = 1;
			}
			ball.speed_X = dir * ball.speed * Math.cos(angleRad);
			ball.speed_Y = dir * ball.speed * Math.sin(angleRad) * dir2;
			if (ball.speed < ball.max_speed)
				ball.speed += ball.step;
		}
		else if (Math.abs(ball.bottom - player.top) < ball.w && ball.speed_Y > 0){
				ball.speed_Y *= -1;
		}
		else if (Math.abs(ball.top - player.bottom) < ball.w && ball.speed_Y < 0)
				ball.speed_Y *= -1;
	}
}


function handleKeyDown(event) {
    
    if (event.key === 'w' || event.key === 'W') {
        user1.dv = -user1.speed;
    } else if (event.key === 's' || event.key === 'S') {
        user1.dv = user1.speed;
    }
    if (event.key === 'ArrowUp' || event.key === 'Up') {
        user2.dv = -user2.speed;
    } else if (event.key === 'ArrowDown' || event.key === 'Down') {
        user2.dv = user2.speed;
    }
}

function handleKeyUp(event) {
    if (event.key === 'w' || event.key === 'W' || event.key === 's' || event.key === 'S') {
        user1.dv = 0;
    }
    if (event.key === 'ArrowUp' || event.key === 'Up' || event.key === 'ArrowDown' || event.key === 'Down') {
        user2.dv = 0;
    }
}

function eventCheck(){
	document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
}

function playersAnimation(){
	user1.y += user1.dv;
	if (user1.top <= 0)
		user1.y = 0;
	else if(user1.bottom >= win_h)
		user1.y = win_h - user1.h;
	user2.y += user2.dv;
	if (user2.top <= 0)
		user2.y = 0;
	else if(user2.bottom >= win_h)
		user2.y = win_h - user2.h;
}

function RandomDir() {
    return Math.random() < 0.5 ? -1 : 1;
}

function ballRestart(){
	let elapsed = currentTime - scoreTime;
	ball.x = 1000 / 2;
	ball.y = 600 / 2;

	if (elapsed < 1000)
		drawText(win_w / 2 - 15, win_h / 2 + 60 ,"3", "RED");
	else if (elapsed < 2000)
		drawText(win_w / 2 - 15, win_h / 2 + 60 ,"2", "RED");
	else if (elapsed < 3000)
		drawText(win_w / 2 - 15, win_h / 2 + 60 ,"1", "RED");
	if (elapsed < 3000){
		ball.speed_X = 0;
		ball.speed_Y = 0;
	}
	else {
		ball.speed = 5;
		ball.speed_X = ball.speed * RandomDir();
		ball.speed_Y = 0;
		scoreTime = 0;
	}
}

function drawBackGround(){
	ctx.fillStyle = "BLACK";
    ctx.fillRect(0,0,win_w * nis,win_h *nis);
}



function game(){
	nis = cadr.offsetWidth / 1000;
	cvs.width = cadr.offsetWidth;
	cvs.height = 600 * nis;
	currentTime = Date.now();
	eventCheck();
	ctx.clearRect(0, 0, win_w, win_h);
	drawBackGround()
	drawNit();
	drawPlayer(user1);
	drawPlayer(user2);
	drawText(win_w / 2 - 55, 50, user1.score, "WHITE");
	drawText(win_w / 2 + 30, 50, user2.score, "WHITE");
	if (scoreTime)
		ballRestart()
	drawBall(ball);
	ballAnimation();
	playersAnimation();
}

setInterval(game, 1000/ 60);