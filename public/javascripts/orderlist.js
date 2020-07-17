function takeOrder (btnOrder) {
    let btnId = $(btnOrder).attr('id')
	var divToHide = $('div#' + btnId + '')
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