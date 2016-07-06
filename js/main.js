var keyItems = [];

var UpdateRemainTime;
var remainTime;
var progressBarWidget;

var tokenList = document.getElementById("Tokens");

window.onload = Redraw();

function calc(key, keytime) {
  var time = ("0000000000000000" + keytime.toString(16)).slice(-16);
  var hmac = (new jsSHA(time,"HEX")).getHMAC(key, "HEX", "SHA-1", "HEX");

  var offset = parseInt(hmac.substring(hmac.length - 1),16);
  var otp = (parseInt(hmac.substr(offset * 2, 8),16) & parseInt("7fffffff",16)).toString();

  return otp.slice(-6);
}

function UpdateRemainTimeRectangle(nextTime){
  remainTime.innerHTML = nextTime + REMAIN;
}
function UpdateRemainTimeCircle(nextTime){
  progressBarWidget.value(nextTime);
}


function Update() {

  var currentTime = Math.round(new Date().getTime() / 1000.0);
  var calc_time = Math.floor(currentTime / 30);
  var nextTime = 30 - (currentTime % 30);
  UpdateRemainTime(nextTime);

  for(var i=0; i<keyItems.length; i++){
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

function init(result) {
  keyItems = result;

  var footer = document.getElementById("footer");
  var progress = document.getElementById("progress");
  
  if (tau.support.shape.circle) {
    footer.style.display="none";
    progressBarWidget = new tau.widget.CircleProgressBar(progress, {size: "full"});
    UpdateRemainTime = UpdateRemainTimeCircle;
    Update();
    circle_helper(tau);
  } else {
    progress.style.display="none";
    remainTime = document.getElementById("remainTime");
    UpdateRemainTime = UpdateRemainTimeRectangle;
    Update();
  }

  window.setInterval(Update,1000);
}

function Redraw() {
  tokenList.innerHTML = "";
  document.getElementById("Title").innerHTML=TITLE;
  ReadItems(init);
}
