let canvas = document.querySelector("#game");
let ctx = canvas.getContext("2d");

window.addEventListener("deviceorientation", this.handleOrientation);
let d = [];


function handleOrientation(e) {
    // console.log(e.alpha, e.beta, e.gamma);
    let x = e.beta;
    if (x >  90) x =  90;
    if (x < -90) x = -90;

    let y = e.gamma;

    x += 90;
    y += 90;


    d["x"] = x;
    d["y"] = y;


    console.log(d["x"] , d["y"] );

    return d;
}



let ball = new Ball();
let hole = new Hole();

let maxX = canvas.width;
let maxY = canvas.height;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw();
    hole.draw();
    
    // ball.update();
    // checkCollisions();
    
    console.log("d x "+d["x"]+ "  d y "+ d["y"]);
    
}



function checkCollisions() {

}

//let interval = 
setInterval(draw, 10);



function Ball() {
    this.Radius = 10;
    this.x = canvas.width/2;
    this.y = canvas.height/2;
    this.color = "#0095DD";
    this.speedX = 1;
    this.speedY = 1;


    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.Radius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        console.log("ball x "+ this.x+ "  y "+this.y);
    }

    this.update = function() {
        this.speedX = canvas.width  *d["x"]/180;
        this.speedY = canvas.height *d["y"]/180;

        if(this.x + d["x"] > canvas.width-this.Radius || this.x + d["x"] < this.Radius) {
            console.log("bum x");
        }
        if(this.y + d["y"] > canvas.height-this.Radius || this.y + d["y"] < this.Radius) {
            console.log("bum y");
        }
    
        this.x = this.speedX;
        this.y = this.speedY; 
    }

}

function Hole() { // possibility to create more objects of this type
    this.Radius = 15;
    this.x = Math.floor((Math.random() * canvas.width-this.Radius))+ this.Radius;
    this.y = Math.floor((Math.random() * canvas.height-this.Radius))+ this.Radius;
    this.color = "#000";
    this.ifWinningHole = false;

    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.Radius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}
