function ReadItems (next){
  var keyItems=[];

  var keys = document.getElementsByClassName("key");
  for(var i=0;i<keys.length;i++){
    var key = keys[i];
    var splited = key.innerHTML.split(":");

    var keyItem = {};
    keyItem.service = splited[0];
    keyItem.id = splited[1];
    keyItem.key = base32tohex(splited[2].toUpperCase());
    keyItems.push(keyItem);
  }
  next(keyItems);
}

function base32tohex (str) {
  var base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

  var bits = "";
  for(var i = 0; i < str.length; i++) {
    var val = base32chars.indexOf(str[i]);
    bits += ("00000" + val.toString(2)).slice(-5);
  }

  var hex = "";
  for( i = 0; i + 4 <= bits.length; i+=4) {
    var chunk = bits.substr(i, 4);
    hex += parseInt(chunk, 2).toString(16) ;
  }
  return hex;
}
