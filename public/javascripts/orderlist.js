function takeOrder (id) {
    console.log('takeOrder')
    console.log(id)
	var divToHide = $('div#' + id + '')
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