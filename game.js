let canvas = document.querySelector("#game");
let ctx = canvas.getContext("2d");

let getTime = new Date();
let startTime = getTime.getSeconds();

window.addEventListener("deviceorientation", handleOrientation, true);
let d = [];

d["x"] = 0;
d["y"] = 0;


function handleOrientation(e) {
    // console.log(e.alpha, e.beta, e.gamma);
    let x=0;
    let y=0;
    
    y = e.beta;
    x = -e.gamma;
    // if (x >  90) x =  90;
    // if (x < -90) x = -90;


    d["x"] = x;
    d["y"] = y;

}



let ball = new Ball();
let hole = new Hole('#000', false);
let winHole = new Hole('#ff0', true);

let maxX = canvas.width;
let maxY = canvas.height;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw();
    hole.draw();
    winHole.draw()
    
    ball.update();

    if(checkCollisions(ball, hole)) {
        let getTime = new Date();
        let endTime = getTime.getSeconds();
        let playTime = endTime - startTime;

        alert("Przegrałeś! twój czas: "+ playTime); 
 
        ball.x = canvas.width/2;
        ball.y = canvas.height/2;
    }

    if(checkCollisions(ball, winHole)) {
        let getTime = new Date();
        let endTime = getTime.getSeconds();
        let playTime = endTime - startTime;

        alert("Wygrałeś! twój czas: "+ playTime); 

        ball.x = canvas.width/2;
        ball.y = canvas.height/2;
    }
    
    console.log("d x "+d["x"]+ "  d y "+ d["y"]);
    
}



function checkCollisions(ball, hole) {
    let dx = hole.x - ball.x;
    let dy = hole.y - ball.y;

    let rad = ball.Radius + hole.Radius;

    if((dx * dx) + (dy * dy)  < rad * rad) return true; else return false;  
}

//let interval = 
setInterval(draw, 10);



function Ball() {
    this.Radius = 10;
    this.x = canvas.width/2;
    this.y = canvas.height/2;
    this.color = "#0095DD";
    this.speedX = 0;
    this.speedY = 0;


    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.Radius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        console.log("ball x "+ this.x+ "  y "+this.y);
    }

    this.update = function() {

            if (d["x"] > 0)  {
                this.speedX = -1;
                // this.speedY = 0;
            } else
            if (d["x"] < 0) {
                this.speedX = 1;
                // this.speedY = 0;
            } else
            if (d["y"] > 0) {
                // this.speedX = 0;
                this.speedY = 1;
            } else
            if (d["y"] < 0) {
                // this.speedX = 0;
                this.speedY = -1;    
            } else
            if(d["x"] === 0){
                // this.speedX = 0;
                this.speedY = 0; 
            } else
            if(d["y"] === 0){
                this.speedX = 0;
                this.speedY = 0; 
            }
        
        

        if(this.x + this.Radius > canvas.width || this.x  - this.Radius < 0) {
            this.speedX = 0;
        }
        if(this.y + this.Radius > canvas.height || this.y - this.Radius < 0) {
            this.speedY = 0;
        }
    
        this.x += this.speedX;
        this.y += this.speedY;
        
        // console.log("speed x "+ this.speedX+ " speed y "+ this.speedY);
    }

}

function Hole(color,ifWinningHole) { // possibility to create more objects of this type
    this.Radius = 15;
    this.x = Math.floor((Math.random() * canvas.width-this.Radius))+ this.Radius;
    this.y = Math.floor((Math.random() * canvas.height-this.Radius))+ this.Radius;
    this.color = color;
    this.ifWinningHole = ifWinningHole;

    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.Radius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}
