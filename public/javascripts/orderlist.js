function takeOrder (id) {
	var divToHide = $('div#' + id + '')
	$.ajax({
        url: '/arduino/kantin/order/take?id=' + id,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
        	divToHide.hide();
        },
    });
}