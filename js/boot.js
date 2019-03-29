var canvas = document.getElementById("canvas");
var draw = canvas.getContext("2d");
var action = 0;
var reload = 0;
//cấu hình thân thuyền
body = [
    {x: 150, y: 440},
    {x: 140, y: 450},
    {x: 150, y: 450},
    {x: 160, y: 450}
];

bullets = [
    {x: body[0].x, y: body[1].y - 20},
    {x: body[0].x, y: body[1].y - 160},
    {x: body[0].x, y: body[1].y - 300},
];


var army_1 = [
    {life: 3, start: {x: 10, y: 20}},
    {life: 3, start: {x: 40, y: 20}},
    {life: 3, start: {x: 70, y: 20}},
    {life: 3, start: {x: 100, y: 20}},
    {life: 3, start: {x: 130, y: 20}},
    {life: 3, start: {x: 160, y: 20}},
    {life: 3, start: {x: 190, y: 20}},
    {life: 3, start: {x: 220, y: 20}},
    {life: 3, start: {x: 250, y: 20}},
    {life: 3, start: {x: 280, y: 20}}
];
var army_2 = [
    {life: 3, start: {x: 10, y: 50}},
    {life: 3, start: {x: 40, y: 50}},
    {life: 3, start: {x: 70, y: 50}},
    {life: 3, start: {x: 100, y: 50}},
    {life: 3, start: {x: 130, y: 50}},
    {life: 3, start: {x: 160, y: 50}},
    {life: 3, start: {x: 190, y: 50}},
    {life: 3, start: {x: 220, y: 50}},
    {life: 3, start: {x: 250, y: 50}},
    {life: 3, start: {x: 280, y: 50}}
];
var army_3 = [
    {life: 3, start: {x: 10, y: 80}},
    {life: 3, start: {x: 40, y: 80}},
    {life: 3, start: {x: 70, y: 80}},
    {life: 3, start: {x: 100, y: 80}},
    {life: 3, start: {x: 130, y: 80}},
    {life: 3, start: {x: 160, y: 80}},
    {life: 3, start: {x: 190, y: 80}},
    {life: 3, start: {x: 220, y: 80}},
    {life: 3, start: {x: 250, y: 80}},
    {life: 3, start: {x: 280, y: 80}}
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
        bullets: bullets,
        color: "red",
        speed: 10
    },
    //vẽ phi thuyền
    drawSpaceship: function () {
        for (var i = 0; i < this.body.length; i++) {
            draw.fillStyle = this.color;
            draw.fillRect(this.body[i].x, this.body[i].y, 8, 8);
            //console.log("toa do phi thuyen " + i + " : " + this.spaceship.body[i].x + " : " + this.spaceship.body[i].y);
        }
        console.log("func drawSpaceship success");
    },
    move: function (move = "down") {
        if (move == "left") {
            for (let i = 0; i < this.body.length; i++) {
                body[i].x -= this.speed;
            }
        }
        else if (move == "right") {
            for (let i = 0; i < this.body.length; i++) {
                body[i].x += this.speed;
            }
        }
        else if (move == "up") {
            for (let i = 0; i < this.body.length; i++) {
                body[i].y -= this.speed;
            }
        }
        else {
            for (let i = 0; i < this.body.length; i++) {
                body[i].y += this.speed;
            }
        }
    },
    //vẽ đạn của phi thuyền
    drawBullet: function () {
        for (let i = 0; i < this.bullet.bullets.length; i++) {
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
    moveBullet: function (action = 0) {
        for (let i = 0; i < this.bullet.bullets.length; i++) {
            if (action != 0) {
                fly.push(i);
                //console.log(fly);
                //bullets.push({x: this.bullet.bullets[i].x , y : this.bullet.bullets[i].y });
            }
            ;
            this.bullet.bullets[i].y -= 10;
            if (fly[i] != i) this.bullet.bullets[i].x = this.body[0].x;
            //console.log(this.bullet.bullets[0].y);
            //console.log(i);
        }
        console.log("func moveBullet success");
    },
    //nạp đạn
    resetBullet: function () {
        for (let i = 0; i < this.bullet.bullets.length; i++) {
            if (this.bullet.bullets[i].y < 0 || reload == 35) {
                bullets.push({
                    x: body[0].x, y: body[1].y - 140 * i
                });
                bullets.splice(bullets, 1);
            }
        }
        console.log("func resetBullet success");
    }
};

var enemys = {
    army_1: army_1,
    army_2: army_2,
    army_3: army_3
};
// cấu hình kẻ địch
army = {
    enemys: enemys,
    color: {
        lv3: "#00FF00",
        lv2: "#FFFF33",
        lv1: "#FF0000"
    },
    drawArmy: function () {
        for (let j = 0; j < this.enemys.army_1.length; j++) {
            if (this.enemys.army_1[j].life == 3) {
                draw.fillStyle = this.color.lv3;
            }
            else if (this.enemys.army_1[j].life == 2) {
                draw.fillStyle = this.color.lv2;
            }
            else if(this.enemys.army_1[j].life == 1) {
                draw.fillStyle = this.color.lv1;
            }
            else draw.fillStyle = "white";
            draw.fillRect(this.enemys.army_1[j].start.x,this.enemys.army_1[j].start.y, 10, 10);
        }
        console.log("draw Army_1 success");
        for (let j = 0; j < this.enemys.army_2.length; j++) {
            if (this.enemys.army_2[j].life == 3) {
                draw.fillStyle = this.color.lv3;
            }
            else if (this.enemys.army_2[j].life == 2) {
                draw.fillStyle = this.color.lv2;
            }
            else if(this.enemys.army_1[j].life == 1) {
                draw.fillStyle = this.color.lv1;
            }
            else draw.fillStyle = "white";
            draw.fillRect(this.enemys.army_2[j].start.x,this.enemys.army_2[j].start.y, 10, 10);
        }
        console.log("draw Army_2 success");
        for (let j = 0; j < this.enemys.army_3.length; j++) {
            if (this.enemys.army_3[j].life == 3) {
                draw.fillStyle = this.color.lv3;
            }
            else if (this.enemys.army_3[j].life == 2) {
                draw.fillStyle = this.color.lv2;
            }
            else if(this.enemys.army_1[j].life == 1) {
                draw.fillStyle = this.color.lv1;
            }
            else draw.fillStyle = "white";
            draw.fillRect(this.enemys.army_3[j].start.x,this.enemys.army_3[j].start.y, 10, 10);
        }
        console.log("draw Army_3 success");
        console.log("func drawEnemy success");
    },
    attack: function () {
        for (let j = 0; j < enemys.army_1.length; j++) {
            for (let i=0;i<bullets.length;i++){
                if(enemys.army_1[j].life < 0) enemys.army_1.slice(j , 1);
                else if(bullets[i].x == enemys.army_1[j].start.x && bullets[i].y == enemys.army_1[j].start.y  ){
                    bullets.push({
                        x: body[0].x, y: body[1].y - 140 * i
                    });
                    bullets.splice(bullets, 1);
                    enemys.army_1[j].life--;
                }
            }
        }
        console.log("draw attack army_1 success");
        for (let j = 0; j < enemys.army_2.length; j++) {
            for (let i=0;i<bullets.length;i++){
                if(enemys.army_2[j].life < 0) enemys.army_2.slice(j , 1);
                else if(bullets[i].x == enemys.army_2[j].start.x && bullets[i].y == enemys.army_2[j].start.y  ){
                    bullets.push({
                        x: body[0].x, y: body[1].y - 140 * i
                    });
                    bullets.splice(bullets, 1);
                    enemys.army_2[j].life--;
                }
            }
        }
        console.log("draw attack army_2 success");
        for (let j = 0; j < enemys.army_3.length; j++) {
            for (let i=0;i<bullets.length;i++){
                if(enemys.army_3[j].life < 0) enemys.army_3.slice(j , 1);
                else if(bullets[i].x == enemys.army_3[j].start.x && bullets[i].y == enemys.army_3[j].start.y  ){
                    bullets.push({
                        x: body[0].x, y: body[1].y - 140 * i
                    });
                    bullets.splice(bullets, 1);
                    enemys.army_3[j].life--;
                }
            }
        }
        console.log("draw attack army_3 success");
    }
};

//vẽ game
function drawAll() {
    spaceship.clearAll();
    army.drawArmy();
    spaceship.drawSpaceship();
    spaceship.drawBullet(0);
}

//điều khiển
function control(e) {
    switch (e.keyCode) {
        case 37 : //left
            if (body[1].x == 0) {
                break;
            }
            action = 1;
            spaceship.move("left");
            break;
        case 38 : //up
            if (body[0].y == 400) {
                break;
            }
            action = 1;
            spaceship.move("up");
            break;
        case 39 : //right
            if (body[3].x == 290) {
                break;
            }
            action = 1;
            spaceship.move("right");
            break;
        case 40 : //down
            if (body[2].y == 490) {
                break;
            }
            action = 1;
            spaceship.move();
            break;
    }
}
document.addEventListener("keydown", control);

setInterval(function () {
    army.attack();
    spaceship.resetBullet();
    spaceship.moveBullet(action);
    action = 0;
    drawAll();
    // if (reload == 35) reload;
    // reload++;
}, 30);
