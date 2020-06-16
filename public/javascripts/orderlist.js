function takeOrder (id) {
	$.ajax({
        url: '/arduino/kantin/order/take?id=' + id,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
			$('div[id^=' + id + ']').hide();
        },
    });
}