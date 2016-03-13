/**
 * Created by Bérenger on 12/03/2016.
 */

/* Name :  Simple Silence Tool Box
 * Version : 1.0
 * Description : SimpleSilence ToolBox is a pure javascript library that enable some commonly used function when developping a javascript front end application.
 * Required : This library require Jquery library  */


// --- INDEX --- //
// 1 - SERVERS COMMUNICATION TOOLS



/* --- [1] SERVER COMMUNICATION TOOLS --- */

// Parse parameters contains in url into an JS object. Warning : doesn't work with anchor link

var _ssParseUrlParams = function(){
    //Return an object with all parameters url contains

    var params = {};

    var urlParams = window.location.search.substring(1);
    var splittedParams = urlParams.split('&');

    for (var i=0;i<splittedParams.length;i++) {
        var pair = splittedParams[i].split("=");
        // If first entry with this name
        if (typeof params[pair[0]] === "undefined") {
            params[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof params[pair[0]] === "string") {
            params[pair[0]] = [ params[pair[0]],decodeURIComponent(pair[1]) ];
            // If third or later entry with this name
        } else {
            params[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }


    return params;

};

// Send a GET request. If callback function is set, launch callback function with the result as a parameter. If callback is not set : return result.
// URL should not include the "?" and params should be a rought object

function _ssGet(url, params,callback){

    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var finalUrl = url + "?" + $.param(params);
    xhr.open('GET', finalUrl,true);

    xhr.send();


    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;

            if(callback !=''){
                callback(result);
            }
            else{
                return result;
            }
        }
    };
}


/* --- [2] COOKING COOKIES --- */

// Get a cookie by name

function _ssGetCookieByName(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}