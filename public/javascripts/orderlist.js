function takeOrder (btnOrder) {
    console.log('takeOrder')
    let btnId = $(btnOrder).attr('id')
    console.log(btnId)
	var divToHide = $('div#' + btnId + '')
    console.log(divToHide)
	// $.ajax({
 //        url: '/arduino/kantin/order/take?id=' + id,
 //        type: 'get',
 //        dataType: 'json',
 //        contentType: 'application/json',
 //        success: function (data) {
 //        	divToHide.hide();
 //        },
 //    });
}