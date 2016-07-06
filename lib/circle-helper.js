/*global tau */
/*jslint unparam: true */
(function(tau) {
	var page,
		list,
		listHelper = [],
		snapList = [],
		i, len;

	if (tau.support.shape.circle) {
		document.addEventListener("pagebeforeshow", function (e) {
			page = e.target;
			list = page.querySelectorAll(".ui-listview");
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
		});

		document.addEventListener("pagebeforehide", function (e) {
			len = listHelper.length;
			if (len) {
				for (i = 0; i < len; i++) {
					listHelper[i].destroy();
				}
				listHelper = [];
			}
		});
	}
}(tau));
