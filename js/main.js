var keyItems = [];

var UpdateRemainTimeInner;
var remainTime;
var progressBarWidget;
var snapListComponent;

var tokenList = document.getElementById("Tokens");

window.onload = Redraw();

function calc(key, keytime) {
  try{
    var time = ("0000000000000000" + keytime.toString(16)).slice(-16);
    var hmac = (new jsSHA(time,"HEX")).getHMAC(key, "HEX", "SHA-1", "HEX");

    var offset = parseInt(hmac.substring(hmac.length - 1),16);
    var otp = (parseInt(hmac.substr(offset * 2, 8),16) & parseInt("7fffffff",16)).toString();

    return otp.slice(-6);
  }catch(err){
    return "000000";
  }
}


function UpdateRemainTime(nextTime){
  var currentTime = Math.round(new Date().getTime() / 1000.0);
  var calc_time = Math.floor(currentTime / 30);
  var nextTime = 30 - (currentTime % 30);
  UpdateRemainTimeInner(nextTime);
  return calc_time;
}
function UpdateRemainTimeRectangle(nextTime){
  remainTime.innerHTML = nextTime + REMAIN;
}
function UpdateRemainTimeCircle(nextTime){
  progressBarWidget.value(nextTime);
}


function InitList() {
  var calc_time = UpdateRemainTime();
  for(var i=0; i<keyItems.length; i++){
    var item = keyItems[i];
    var token = calc(item.key,calc_time );
    var item_id = "item_"+i;
    var newelm = MakeLiItem(item_id, token,item.service, item.id);
    tokenList.appendChild(newelm);
  }
}

function Update() {
  var calc_time = UpdateRemainTime();
  for(var i=0; i<keyItems.length; i++){
    var item = keyItems[i];
    var token = calc(item.key,calc_time );
    var item_id = "item_"+i;

    var oldelm =  document.getElementById(item_id);
    oldelm.childNodes[0].textContent = token;
  }
}

function MakeLiItem (elem_id , token , service, id){
  var li = document.createElement("li");
  li.setAttribute("class","li-has-multiline");
  li.setAttribute("style","text-align:center;");
  li.setAttribute("id", elem_id);
  li.innerHTML = token;

  var span = document.createElement("div");
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
    UpdateRemainTimeInner = UpdateRemainTimeCircle;
    if (result.example) {
      var li= document.createElement("li");
      var msg = document.createElement("div");
      msg.setAttribute("class","ui-marquee ui-marquee-gradient");
      msg.innerHTML = "auth_keyinfo.txt not found. You need create and put auth_keyinfo.txt to documents folder";
      li.appendChild(msg);
      tokenList.appendChild(li);
      tau.helper.SnapListMarqueeStyle.create(tokenList, { marqueeDelay: 1000, marqueeStyle: "endToEnd" });
    }
    InitList();
    snapListComponent = tau.widget.SnapListview(tokenList);
    circle_helper(tau);
  } else {
    progress.style.display="none";
    remainTime = document.getElementById("remainTime");
    UpdateRemainTimeInner = UpdateRemainTimeRectangle;
    if (result.example) {
      var li= document.createElement("li");
      li.setAttribute("class","li-has-multiline li-has-2line-sub");
      li.innerHTML = "auth_keyinfo.txt not found";
      var msg1 = document.createElement("span");
      msg1.setAttribute("class","ui-li-sub-text li-text-sub");
      msg1.innerHTML = "You need create auth_keyinfo.txt"
      var msg2 = document.createElement("span");
      msg2.setAttribute("class","ui-li-sub-text li-text-sub");
      msg2.innerHTML = "and put to documents folder";
      li.appendChild(msg1);
      li.appendChild(msg2);
      tokenList.appendChild(li);
    }
    InitList();
  }

  window.setInterval(Update,1000);
}

function Redraw() {
  tokenList.innerHTML = "";
  document.getElementById("Title").innerHTML=TITLE;
  ReadItems(init);
}
