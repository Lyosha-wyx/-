//点击开始游戏  动态生成100个小格 ==》 100个div
//leftclick  没有雷 ==》 显示数字
//           有雷==》 game over
//扩散：当前周围8个格没有雷
//rightclick  标记 ==》 有标记，就取消；没标记，进行标记
//已经有数字==》点击无效

var startBtn = document.querySelector('#btn');
var box = document.querySelector('#box');
var flagBox = document.querySelector('#flagBox');
var alertBox = document.querySelector('#alertBox');
var alertBox = document.querySelector('#alertBox');
var alertImg = document.querySelector('#alertImg');
var closeBtn = document.querySelector('#close');
var score = document.querySelector('#score');
var minesNum;
var mineOver;
var block;
var mineMap = [];
var knock = true;


bindEvent();
function bindEvent(){
    startBtn.onclick = function(){
        if(knock){
            box.style.display = 'block';
            flagBox.style.display = 'block';
            
            init();
            knock = false;
        }

        
    }
    box.oncontextmenu = function(){
        return false;
    }
    box.onmousedown = function(e){
        var event = e.target;
        if(e.which == 1){
            leftClick(event);
        }else if(e.which == 3){
            rightClick(event);
        }
    }
    closeBtn.onclick = function(){
        alertBox.style.display = 'none';
        flagBox.style.display = 'none';
        box.style.display = 'none';
        box.innerHTML = '';
    }
}

//生成100个小格
function init(){
    
    minesNum = 10;
    mineOver = 10;
    score.innerHTML = mineOver;
    for(var i = 0; i < 10; i++){
        for(var j = 0; j < 10; j++){
            var con = document.createElement('div');
            con.classList.add('block');
            con.setAttribute('id', i + '-' + j);
            box.appendChild(con);
            mineMap.push({mine:0});
        }
    }
    block = document.getElementsByClassName('block');
    while(minesNum){
        var mineIndex = Math.floor(Math.random()*100);
        if(mineMap[mineIndex].mine === 0){
            mineMap[mineIndex].mine = 1;
            block[mineIndex].classList.add('isLei');
            minesNum --;
        }
    }

    
}

function leftClick(dom){
    if(dom.classList.contains('flag')){
        return;
    }
    var isLei = document.getElementsByClassName('isLei');
    if(dom && dom.classList.contains('isLei')){
        knock = true;
        console.log('gameover');
        for(var i = 0; i < isLei.length; i++){
            isLei[i].classList.add('show');
            setTimeout(function(){
                alertBox.style.display = 'block';
                alertImg.style.backgroundImage = 'url("img/over.jpg")';
            },1000)
        }
    }else{
        var n = 0;
        var posArr = dom && dom.getAttribute('id').split('-');
        var posX = posArr && +posArr[0];
        var posY = posArr && +posArr[1];
        dom && dom.classList.add('num');

        for(var i = posX -1; i<= posX +1; i++){
            for(var j = posY -1; j <= posY +1; j++){
                var aroundBox = document.getElementById(i + '-' + j);
                if(aroundBox && aroundBox.classList.contains('isLei')){
                    n++
                }
            }
        }
        dom && (dom.innerHTML = n);
        if( n == 0 ){
            for(var i = posX -1; i<= posX +1; i++){
                for(var j = posY -1; j <= posY +1; j++)
                {
                    var nearBox = document.getElementById(i + '-' + j);
                    if(nearBox && nearBox.length !=0){
                        if(!nearBox.classList.contains('check')){
                            nearBox.classList.add('check');
                            leftClick(nearBox);
                        }
                        
                    }
                }
            }
        }
    }
    
}

function rightClick(dom){
    if(dom.classList.contains('num')){
        return;
    }
    dom.classList.toggle('flag');
    if(dom.classList.contains('isLei') && dom.classList.contains('flag')){
        mineOver --; 
    }
    if(dom.classList.contains('isLei') && !dom.classList.contains('flag')){
        mineOver ++; 
    }
    score.innerHTML = mineOver;
    if(mineOverneOver == 0){
        alertBox.style.display = 'block';
        alertImg.style.backgroundImage = 'url("img/success.png")';
    }
    
}