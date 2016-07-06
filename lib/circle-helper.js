var page, list, listHelper = [], snapList = [], i, len;

function circle_helper_loadSetting(e) {
  list = document.querySelectorAll(".ui-listview");
  if (list) {
    len = list.length;
    for (i = 0; i < len; i++) {
      listHelper[i] = tau.helper.SnapListStyle.create(list[i]);
    }
    len = listHelper.length;
    if (len) {
      for (i = 0; i < len; i++) {
        snapList[i] = listHelper[i].getSnapList();
      }
    }
  }
}
function circle_helper_unloadSett(e) {
  len = listHelper.length;
  if (len) {
    for (i = 0; i < len; i++) {
      listHelper[i].destroy();
    }
    listHelper = [];
  }
}

function circle_helper(tau) {
  document.addEventListener("pagebeforeshow", circle_helper_loadSetting );
  document.addEventListener("pagebeforehide", circle_helper_unloadSett );
  circle_helper_loadSetting("");
}
