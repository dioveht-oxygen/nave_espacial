var main = {
    toado: {
        x: 200,
        y: 450
    },
    images:{
        mid: '../image/actor/spaceship/fly_mid.png',
        left: '../image/actor/spaceship/slide_left.png',
        right: '../image/actor/spaceship/slide_right.png',
    },
    speed: 5,
}

var weapon = {
    bullet : {
        x:main.toado.x - 50,
        y:main.toado.y + 50,
        speed: 2,
        image: "../image/actor/spaceship/bullet.png"
    }

}

function boot(id , screen ) {
    var canvas = document.getElementById(id);
    var draw = canvas.getContext('2d');
    drawMain(main , draw , main.images.mid);
    drawBullet(weapon ,draw, weapon.bullet.image);
    control(main , draw);
}

function drawMain(main , draw , src) {
    base_image = new Image();
    base_image.src = src;
    base_image.onload = function(){
        draw.drawImage(base_image, main.toado.x, main.toado.y);
    }
}

function drawBullet(weapon , draw , src) {
    base_image = new Image();
    base_image.src = src;
    base_image.onload = function(){
        draw.drawImage(base_image, weapon.x, weapon.y);
    }
}
function actionBullet(weapon , screen) {
    countBullet = (screen.h - weapon.bullet.y) / weapon.bullet.speed;
    console.log("dan : " + countBullet);
    for(var i=1;i<countBullet ; i++){

    }
}
function control(main , draw){
    document.addEventListener('keydown', move);
    document.addEventListener('keyup', function () {
        draw.clearRect( main.toado.x, main.toado.y , 50 , 50);
        drawMain(main , draw , main.images.mid);
    });
    function move(e) {
        var x = e.keyCode;
        switch (x) {
            case 37:
                //move left
                draw.clearRect( main.toado.x, main.toado.y , 50 , 50);
                main.toado.x -= main.speed;
                drawMain(main , draw , main.images.left);
                drawBullet(weapon ,draw, weapon.bullet.image);
                break;

            case 39:
                //move right
                draw.clearRect( main.toado.x, main.toado.y , 50 , 50);
                main.toado.x += main.speed;
                drawMain(main , draw , main.images.right);
                drawBullet(weapon ,draw, weapon.bullet.image);
                break;
            case 38:
                dir = 'up';
                break;

            case 40:
                dir = 'down';
                break;
        }
        console.log(x);
    }
}