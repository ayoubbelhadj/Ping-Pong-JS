
const cvs = document.getElementById("pong");

cvs.width = 1000;
let nis = cvs.width / 1000;



let dem = {
    ball : 15 * nis,
    bar_y : 150 * nis,
    bar_x: 15  * nis,
    win_x : 1000  * nis,
    win_y : 600  * nis
}

cvs.height = dem.win_y;

const user1 = {
    w : 15 * nis,
    h : 150,
    x : 5,
    y : cvs.height / 2 -  150 /2,
    score: 0,
    dv : 0,
    speed: 10,
    color : "#C322FF"
}

const user2 = {
    w : 15,
    h : 150,
    x : cvs.width - 15 - 5,
    y : cvs.height / 2 -  cvs.height /2,
    score: 0,
    dv : 0,
    speed: 30,
    color : "#0AC9FC"
}


const ball = {
    r : 15 * nis,
    x : cvs.width / 2,
    y : cvs.height / 2 ,
    speed: 5 * nis,
    speed_X : 2,
    speed_Y : 2,
    color : "WHITE"
}

const ctx = cvs.getContext("2d");

//draw rect function
function drawRect(x,y,w,h,color){
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);
}

//draw Circle
function drawCircle(x,y,r, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}

//draw TEXT
çç


function render () {
    drawRect(0, 0, dem.win_x, dem.win_y, "BLACK");
    drawRect(cvs.width / 2, 0, 1 * nis, cvs.height, "WHITE");
    // drawText(200 * nis, 100*nis, 10 , "WHITE");
    drawRect(user1.x, user1.y, user1.w, user1.h, user1.color);
    drawRect(user2.x, user2.y, user2.w, user2.h, user2.color);
    drawCircle(ball.x, ball.y, ball.r, ball.color);  
}

function collision(b, p){
    // b.top = b.y - b.r;
    // b.bottom = b.y + b.r;
    // b.left = b.x - b.r;
    // b.right = b.x + b.r;

    // p.top = p.y;
    // p.bottom = p.y + p.height;
    // p.left = p.x;
    // p.right = p.x + p.width
    
    return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top  < p.bottom;
}

function resetBall(){
    ball.x = cvs.width / 2;
    ball.y = cvs.height / 2 ;
}

function update(){
    ball.x += ball.velocityX; 
    ball.y += ball.velocityY;
    if (ball.y + ball.r > cvs.height || ball.y - ball.r < 0){
        ball.velocityY*= -1;
    }
    let player;
    if (ball.x < cvs.width / 2)
        player = user1;
    else
        player = user2;
    // if (collision(ball, player)){
       
    // }
    // if (ball.x + ball.r > cvs.width || ball.x - ball.r < 0)
    //     resetBall();

    user1.y += user1.dv;
    user2.y += user2.dv;
    if (user1.y < 0 )
        user1.y = 0;
    else if (user1.y + user1.h > cvs.height)
        user1.y = cvs.height - user1.h;

}


function handleKeyDown(event) {
    
    if (event.key === 'w' || event.key === 'W') {
        user1.dv = -user1.speed;
    } else if (event.key === 's' || event.key === 'S') {
        user1.dv = user1.speed;
    }
}

function handleKeyUp(event) {
    if (event.key === 'w' || event.key === 'W' || event.key === 's' || event.key === 'S') {
        user1.dv = 0;
    }
}

function game() {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    update();
    render()
}
setInterval(game, 1000 / 50)