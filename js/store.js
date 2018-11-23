function ReadError(next){
    var keyItems=[];

    var keyItem = {};
    keyItem.service = "EXAMPLE";
    keyItem.id = "";
    keyItem.key = base32tohex("JBSWY3DPEHPK3PXP");
    keyItems.push(keyItem);

    keyItem = {};
    keyItem.service = "EXAMPLE";
    keyItem.id = "";
    keyItem.key = base32tohex("OFKLYERJNLGOIPTA");
    keyItems.push(keyItem);

    keyItems.example = true;
    next(keyItems);
}

function moveAuthFile(folders, srcnames, next ){
    var folder = folders.pop();
    var srcname = srcnames.pop();
    tizen.filesystem.resolve(folder + "/" + srcname,
        function(file){
            tizen.filesystem.resolve(folder,
            function(path) {
                path.moveTo(file.fullPath, "documents/auth_keyinfo.txt", true, next, next);
            }, next, "rw");
        },
    function(){
        if(folders.length>0){
            moveAuthFile(folders,srcnames, next);
        } else {
            next();
        }
    });
}

function ReadItems(next){
    moveAuthFile(
        ["downloads","music"], ["auth_keyinfo.txt","auth_keyinfo.mp3"],
        function() {
            tizen.filesystem.resolve( "documents/auth_keyinfo.txt", 
                function(file) {
                    file.readAsText(function(data) {
                        var keyItems=[];
                        var keys = data.split(/\r\n|\r|\n/);
                        for(var i=0;i<keys.length;i++){
                            var key = keys[i];
                            var splited = key.split(":");
                            if(splited.length >= 3){
                                var keyItem = {};
                                keyItem.service = splited[0];
                                keyItem.id = splited[1];
                                keyItem.key = base32tohex(splited[2].toUpperCase());
                                if(splited.length === 4){
                                    keyItem.digits = splited[3];
                                } else {
                                    keyItem.digits = 6;
                                }
                                keyItems.push(keyItem);
                            }
                        }
                        next(keyItems);
                    }, function() {ReadError(next);});
                }, function() { ReadError(next);});
        }
    );
}

function base32tohex (str) {
    var base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

    var bits = "";
    for(var i = 0; i < str.length; i++) {
        if (str[i] === " ") {
            continue;
        } else if (str[i] === "="){
            bits += "00000";
        } else {
            var val = base32chars.indexOf(str[i]);
            bits += ("00000" + val.toString(2)).slice(-5);
        }
    }

    var hex = "";
    for( i = 0; i + 4 <= bits.length; i+=4) {
        var chunk = bits.substr(i, 4);
        hex += parseInt(chunk, 2).toString(16) ;
    }
    if (hex.length % 2 !== 0){
        hex += "0";
    }
    return hex;
}
