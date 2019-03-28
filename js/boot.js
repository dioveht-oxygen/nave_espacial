var canvas = document.getElementById("canvas");
var draw = canvas.getContext("2d");
var action = 0;
//cấu hình thân thuyền
body = [
    {x: 150, y: 440},
    {x: 140, y: 450},
    {x: 150, y: 450},
    {x: 160, y: 450}
];


bullets = [
    {x: body[0].x, y: body[1].y - 20},
];

var fly = [];
spaceship = {
    //thân thuyền
    body: body,
    //màu phi thuyền
    color: "#66FFFF",
    //tốc độ di chuyển của thuyền
    speed: 10,
    //đạn
    bullet: {
        bullets: bullets ,
        color: "red",
        speed: 10
    },
    //vẽ phi thuyền
    drawSpaceship: function () {
        for (var i = 0; i < this.body.length; i++) {
            draw.fillStyle = this.color;
            draw.fillRect(this.body[i].x, this.body[i].y, 10, 10);
            //console.log("toa do phi thuyen " + i + " : " + this.spaceship.body[i].x + " : " + this.spaceship.body[i].y);
        }
        console.log("func drawSpaceship success");
    },
    move: function (move = "down") {
        if (move == "left"){
            for (let i = 0; i < this.body.length ; i++){
                body[i].x -= this.speed;
            }
        }
        else if(move == "right"){
            for (let i = 0; i < this.body.length ; i++){
                body[i].x += this.speed;
            }
        }
        else if(move == "up"){
            for (let i = 0; i < this.body.length ; i++){
                body[i].y -= this.speed;
            }
        }
        else{
            for (let i = 0; i < this.body.length ; i++){
                body[i].y += this.speed;
            }
        }
    },
    //vẽ đạn của phi thuyền
    drawBullet: function () {
        for(let i= 0 ;i < this.bullet.bullets.length ; i++){
            draw.fillStyle = this.bullet.color;
            draw.fillRect(this.bullet.bullets[i].x, this.bullet.bullets[i].y, 10, 10);
        }
        console.log("func drawBullet success");
    },
    //xóa toàn bộ
    clearAll: function () {
        draw.clearRect(0, 0, 300, 500);
        console.log("func clearAll success");
    },
    //đạn bay đi
    moveBullet: function(action = 0) {
        for (let i= 0 ;i < this.bullet.bullets.length ; i++){
            if (action != 0){
                fly.push(i);
                bullets.push({x: this.bullet.bullets[i].x , y : this.bullet.bullets[i].y });
            };
            this.bullet.bullets[i].y -= 20;
            if(fly[i] != i) this.bullet.bullets[i].x = this.body[0].x;
            //console.log(this.bullet.bullets[0].y);
            //console.log(i);
        }
        console.log("func moveBullet success");
    },
    //nạp đạn
    resetBullet : function () {
        for (let i= 0 ;i < this.bullet.bullets.length ; i++){
            if(this.bullet.bullets[i].y < 0){
                bullets.push({
                    x: body[0].x, y: body[1].y - 20
                });
                bullets.splice(bullets,1);
            }
        }
        console.log("func resetBullet success");
    },

};

//vẽ game
function drawAll() {
    spaceship.clearAll();
    spaceship.drawSpaceship();
    spaceship.drawBullet(0);
}

//điều khiển
function control(e) {
    switch (e.keyCode) {
        case 37 : //left
            action = 1;
            spaceship.move("left");
                break;
        case 38 : //up
            action = 1;
            spaceship.move("up");
                break;
        case 39 : //right
            action = 1;
            spaceship.move("right");
                break;
        case 40 : //down
            action = 1;
            spaceship.move();
                break;
    }
}
document.addEventListener("keydown",control);

setInterval(function () {
    spaceship.resetBullet();
    spaceship.moveBullet(action);
    action = 0;
    drawAll();
},50);
