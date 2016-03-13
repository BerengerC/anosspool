/**
 * Created by Bérenger on 10/03/2016.
 */

/*A BEAUTIFUL LOADER & Date Picker*/

var beautifulLoader = "<div class='loader-wrap'>" +
    "<div class='loader-slice'></div>" +
    "<div class='loader-slice'></div>" +
    "<div class='loader-slice'></div>" +
    "<div class='loader-slice'></div>" +
    "<div class='loader-slice'></div>" +
    "<div class='loader-slice'></div>" +
    "</div>";


/* SENDING USER TO /AUTHORIZE and make him come back to twitch connect modal*/

function authorizeTwitchAlerts(){

    /* Request params */
    var requestParams = {
        'response_type' : 'code',
        'client_id' : '6elDGyK8eaYhwqZM1rt57zKDmM7L47sMa5rhBIgK',
        'redirect_uri' : 'http://anosspool.simplesilence.fr/twitchconnect.php',
        'scope' : 'donations.read'
    };

    var authorizeQuery ="https://twitchalerts.com/api/v1.0/authorize?" + $.param(requestParams);

    /*Redirect user to twich log and authorize screen*/
    window.location.assign(authorizeQuery);
}

/* DISPLAYING THE TWITCH MODAL WHEN WE RECEIVE ACCESS TOKEN */

$(window).load(function() {
    var modalDiv = document.getElementById('twitchmodal');
    var modalContent = document.getElementById('twitchmodalcontent');

    var accessToken = _ssGetCookieByName('access_token');

    /* Open modal if "code" is set in parameters and get access and refresh token*/
    if (accessToken != ''){
        modalDiv.style.display = "block";
        modalContent.innerHTML = beautifulLoader;

        var chickenRequest = {
            'access_token' : accessToken,
            'limit' : 10,
            'currency' : 'EUR'
        };

        _ssGet('https://www.twitchalerts.com/api/v1.0/donations', chickenRequest,parseChickenAnswer);

    }
});

function parseChickenAnswer(answer){

    //creating the date for filtering donations
    var date = new Date(Date.now());
    console.log(date);
    date.setHours(17);
    date.setMinutes(0);
    date.setSeconds(0);
    var dateSec = Date.parse(date) / 1000;
    console.log('la date de cut est ' + dateSec);


    //on parse le json
    var ta100Chicken = JSON.parse(answer);
    var jsonLength = ta100Chicken.data.length;
    console.log('longueur json ' + ta100Chicken.data.length);



    //on ajoute tout ce qui est après al date du jour à 17h dans la chikenlist
    for(var i = 0; i < jsonLength; i++) {
        console.log('i est egal à ' + i);
        var donationDate = parseInt(ta100Chicken.data[i].created_at);
        console.log('action N° ' + i + ' date de cut : ' + dateSec + ' Date de creation : ' + donationDate);

        if (donationDate > dateSec) {
            console.log('Jajoute');
            var Blaz = ta100Chicken.data[i].name;
            var Tip = Math.round(parseInt(ta100Chicken.data[i].amount));
            var chicken = {chickenBlaz: Blaz, chickenTip: Tip};
            chickenList.push(chicken);
        }
    }

    // On affiche la chickenList updatée
    displayChickenList();

    //on ferme gentiment la popup
    var modalDiv = document.getElementById('twitchmodal');

    modalDiv.style.opacity = 0;
    setTimeout(function(){
        modalDiv.style.display = "none";
    },1000);


}

