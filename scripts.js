/**
 * Created by Bérenger on 26/02/2016.
 */

/* Variable Declaration */

var chickenList = [];
var htmlOutput = "";
var chickenPool = [];
var chickenWinner = "";
var music = new Audio('/sound/anoospool-ost.mp3');


/* HORIZONTAL LAYOUT ENGINE AND ANIMATION */

/* assigning width to screen on load an resize */

$(window).load(function() {
    var vWidth = $(window).width();
    var vHeight = $(window).height();
    $('.viewer').css('width', vWidth).css('height', vHeight);
    $('.screen').css('width', vWidth).css('height', vHeight);
    $('#animation-wrap').css('left', vWidth);

    /*  Affichage modale */
    //$('#modal').animate({opacity: "1"},400); /* fermeture à la fin du script*/
});

$(window).resize(function() {
    var vWidth = $(window).width();
    var vHeight = $(window).height();
    $('.viewer').css('width', vWidth*2).css('height', vHeight);
    $('.screen').css('width', vWidth).css('height', vHeight);
    $('#animation-wrap').css('left', vWidth);
});

/* RECORD CHICKEN INTO AN ARRAY*/

/* Record value in the Chicken List when we press the add button, update chicken list display and erase value in inputs */

function addChickenInArray(chickenList) {
    var chickenBlaz = document.getElementById('chickenblaz').value;
    var chickenTip = parseInt(document.getElementById('chickentip').value);
    var chicken = {chickenBlaz: chickenBlaz, chickenTip: chickenTip};

    chickenList.push(chicken);
    displayChickenList();
    clearInputs();
}

function clearInputs(){
    document.getElementById('chickenblaz').value = '';
    document.getElementById('chickentip').value = '';
}

/* KICK CHICKEN FROM ARRAY */

function degageDeLa(chickenId){

    chickenId = parseInt(chickenId);
    chickenList.splice(chickenId,1);

    displayChickenList();

}

/* DISPLAY THE CHICKEN LIST */


function displayChickenList() {

    htmlOutput = "";
    updateChickenList();
    htmlOutput += '<div class="button" class="right" id="tirDePoulet" onclick="drawTheChicken()"><img src="/img/rocket.png"></div>';
    document.getElementById('chickenlist').innerHTML = htmlOutput;

}

function updateChickenList(){
    htmlOutput += "";

    for(var i=0; i<chickenList.length; i++){
        htmlOutput += '<div class="chicken-row">' +
            '<img src="/img/arrow.png"><span class="chicken-sep"></span> ' +
            '<p>' + chickenList[i].chickenBlaz + '</p><span class="chicken-sep"></span><p id="chicken-tip">' + chickenList[i].chickenTip + '</p>' +
            '<span class="chicken-sep"></span><img src="img/delete.png" class="delete-chicken" onclick="degageDeLa(' + i + ')"></div>';
    }

    htmlOutput += "";
}


displayChickenList();

/* RADOMLY CHOOSE A CHICKEN REGARDING HIS TIPS AMOUNTS */

/* adding method to randomise chicken pool */

chickenPool.shuffle = function (){
    var chickens = this;

    for(var k = chickens.length - 1; k > 0; k--){
        var randomIndex = Math.floor(Math.random() * ( k + 1 ));
        var chickenAtIndex = chickens[randomIndex];

        chickens[randomIndex] = chickens[k];
        chickens[k] = chickenAtIndex;
    }

    return chickens;
};

function drawTheChicken(){

    createChickenPool();
    chickenPool.shuffle();

    var chickenNumber = chickenPool.length;
    var randomChickenID = Math.floor(Math.random()*chickenNumber);
    chickenWinner = chickenPool[randomChickenID];

    /*Focusing the scene*/
    
    var vWidth = $(window).width();
    $('#pool-screen').css('overflow',"hidden");
    $('#animation-wrap').animate({left:"0px"},1000);
    $('#pool-screen').animate({left:-vWidth},1000);
    vWidth = $(window).width();
    $('#animation-wrap').css('width',vWidth);


    /*Launching Animation*/
    finalAnimation();

}


/* Creating the chicken pool list */

function createChickenPool(){

    for(var i = 0; i < chickenList.length ; i++){
        for(var j = 0; j < chickenList[i].chickenTip; j++){
            chickenPool.push(chickenList[i].chickenBlaz);
        }

    }
}

/* !!!!!!!!!!!!! BEGINNING OF FINAL ANIMATION !!!!!!!!!!!!! */

function finalAnimation(){
    var scene = document.getElementById('animation-wrap');
    /*Launch Music*/
    music.play();

    /*Launching First Scene*/
    warningScene();

    /*Launching Second Scene with a 6 seconds delay*/
    setTimeout(function(){
        countDownScene();
    }, 6050);

    /*Launching third Scene with a 13 seconds delay*/
    setTimeout(function(){
        winnerScene();
    }, 13050);

    function warningScene(){
        var htmlOutput = '';
        htmlOutput +='<div class="red-alert" id="red-alert">' +
                        '<div class="warning-block"><h1>Warning!</h1><p>POULETS EN COURS DE TIR <br>MERCI DE BIEN VOULOIR SECURISER LE Périmètre : c\'est JEAN MICHEL QUI TIRE. COMMENT!</p></div></div>';
        scene.innerHTML = htmlOutput;

    }

    function countDownScene(){
        var htmlOutput = '';
        scene.innerHTML = htmlOutput;

        htmlOutput +='<div class="countdown" id="countdown">' +
            '<img src="/img/cdwn.png">' +
            '<h2>Poulet Prêt. Lancement dans :</h2>' +
            '<p id="cdwnumber"></p></div>';
        scene.innerHTML += htmlOutput;

        var time = 5;

        var theTimer = setInterval(function(){
            if(time >= 0){
                var element = document.getElementById('cdwnumber');
                element.innerHTML = time;
                time--;
            }
            else{
                clearInterval(theTimer);
            }
        },1000);

    }

    function winnerScene() {
        var htmlOutput = '';

        scene.innerHTML = htmlOutput;

        htmlOutput += '<div id="shocker"><div class="winnerwrap" id="winnerwrap">' +
            '<img src="/img/poulet.png" width="80px"><h1 id="winnername"></h1></div></div>';
        scene.innerHTML += htmlOutput;

        var blazElement = document.getElementById('winnername');

        var winnerBlazLgt = chickenWinner.length;

        function generateFakeWinner(length)
        {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for( var i=0; i < length; i++ ) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            blazElement.innerHTML = text;
        }

        var time2 = 0;
        var randomBlaz = setInterval(function(){
            if(time2 < 3950) {
                generateFakeWinner(winnerBlazLgt);
                time2 = time2 + 50;
            }
            else{
                clearInterval(randomBlaz);
                blazElement.innerHTML = chickenWinner;
            }
        },50);
    }
}

/*
function closeModal(){
    $('#modal').animate({opacity: "0"},400);
    setTimeout(function(){
        $('#modal').css('display','none');
    },400);
}*/

function demoList(){
    var demoList;
    demoList = [{chickenBlaz: "BeeHaniwro", chickenTip: "5"}, {chickenBlaz: "Anoss", chickenTip: "8"}, {
        chickenBlaz: "Psychotrope",
        chickenTip: "200"
    }, {chickenBlaz: "Petit_PiedSC2", chickenTip: "2"}, {chickenBlaz: "Moobot", chickenTip: "18"}, {
        chickenBlaz: "Jean-Michel",
        chickenTip: "50"
    }, {chickenBlaz: "Kerrigan", chickenTip: "22"}, {chickenBlaz: "Artanis", chickenTip: "6"}];

    chickenList = demoList;
    displayChickenList();
}