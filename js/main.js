var keyItems = [];

window.onload = function () {
    Redraw();
}

function Clear() {
    var nodes = document.getElementById("Tokens").innerHTML="";
}

function calc(key, keytime) {
    var time = ("0000000000000000" + keytime.toString(16)).slice(-16)
    var hmac = (new jsSHA(time,"HEX")).getHMAC(key, "HEX", "SHA-1", "HEX");

    var offset = parseInt(hmac.substring(hmac.length - 1),16);
    var otp = (parseInt(hmac.substr(offset * 2, 8),16) & parseInt("7fffffff",16)).toString();

    return otp.slice(-6);
};

function Update() {
    var tokenList = document.getElementById("Tokens");
    var remainTime = document.getElementById("remainTime");

    var currentTime = Math.round(new Date().getTime() / 1000.0);
    var calc_time = Math.floor(currentTime / 30);
    var nextTime = 30 - (currentTime % 30);

    remainTime.innerHTML = nextTime + REMAIN;

    for(i=0; i<keyItems.length; i++){
        var item = keyItems[i];
        var token = calc(item.key,calc_time );
        var item_id = "item_"+i;
        var newelm = MakeLiItem(item_id, token,item.service, item.id);

        var oldelm =  document.getElementById(item_id);
        if(oldelm){
            tokenList.replaceChild(newelm,oldelm);
        } else {
            tokenList.appendChild(newelm);
        }
    }
}

function MakeLiItem (elem_id , token , service, id){
    var li = document.createElement("li");
    li.setAttribute("class","li-has-multiline");
    li.setAttribute("id", elem_id);
    li.innerHTML = token;

    var span = document.createElement("span");
    span.setAttribute("class","ui-li-sub-text li-text-sub");
    span.innerHTML = "[ " + service + " ] " + id;

    li.appendChild(span);

    return li;
}

function base32tohex (str) {
    var base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

    var bits = "";
    for(var i = 0; i < str.length; i++) {
        var val = base32chars.indexOf(str[i]);
        bits += ("00000" + val.toString(2)).slice(-5);
    }

    var hex = "";
    for(var i = 0; i + 4 <= bits.length; i+=4) {
        var chunk = bits.substr(i, 4);
        hex += parseInt(chunk, 2).toString(16) ;
    }
    return hex;
};


function ReadItems (){
    keyItems=[];

    var keys = document.getElementsByClassName("key");
    for(i=0;i<keys.length;i++){
        var key = keys[i];
        var splited = key.innerHTML.split(":");

        var keyItem = {};
        keyItem.service = splited[0];
        keyItem.id = splited[1];
        keyItem.key = base32tohex(splited[2].toUpperCase());
        keyItems.push(keyItem);
    }
}

function Redraw() {
    Clear();
    ReadItems();
    document.getElementById("Title").innerHTML=TITLE;
    window.setInterval(Update,1000);
}
