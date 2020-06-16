var geprekSubtotal = 0;
var nasgorSubtotal = 0;
var migorSubtotal = 0;
var kwegorSubtotal = 0;
var estehSubtotal = 0;
var tehSubtotal = 0;
var esnutriSubtotal = 0;
var esgooddaySubtotal = 0;
var kopiSubtotal = 0;
var airSubtotal = 0;

var geprekPorsi = 0;
var nasgorPorsi = 0;
var migorPorsi = 0;
var kwegorPorsi = 0;
var estehPorsi = 0;
var tehPorsi = 0;
var esnutriPorsi = 0;
var esgooddayPorsi = 0;
var kopiPorsi = 0;
var airPorsi = 0;

var total = 0;

function porsiChange (option, menu) {
	let jumlahPorsi = $(option).val()
	let harga = 0;
	switch (menu) {
		case 'geprek': 
			harga = 15000;
			geprekPorsi = jumlahPorsi;
			geprekSubtotal = harga * jumlahPorsi;
			$('#geprekSubtotal').text('Rp. ' + formatCurrency(geprekSubtotal));
			break;
		case 'nasgor': 
			harga = 12000;
			nasgorPorsi = jumlahPorsi;
			nasgorSubtotal = harga * jumlahPorsi;
			$('#nasgorSubtotal').text('Rp. ' + formatCurrency(nasgorSubtotal));
			break;
		case 'migor': 
			harga = 12000;
			migorPorsi = jumlahPorsi;
			migorSubtotal = harga * jumlahPorsi;
			$('#migorSubtotal').text('Rp. ' + formatCurrency(migorSubtotal));
			break;
		case 'kwegor': 
			harga = 12000;
			kwegorPorsi = jumlahPorsi;
			kwegorSubtotal = harga * jumlahPorsi;
			$('#kwegorSubtotal').text('Rp. ' + formatCurrency(kwegorSubtotal));
			break;
		case 'esteh': 
			harga = 4000;
			estehPorsi = jumlahPorsi;
			estehSubtotal = harga * jumlahPorsi;
			$('#estehSubtotal').text('Rp. ' + formatCurrency(estehSubtotal));
			break;
		case 'teh': 
			harga = 3000;
			tehPorsi = jumlahPorsi;
			tehSubtotal = harga * jumlahPorsi;
			$('#tehSubtotal').text('Rp. ' + formatCurrency(tehSubtotal));
			break;
		case 'esnutri': 
			harga = 4000;
			esnutriPorsi = jumlahPorsi;
			esnutriSubtotal = harga * jumlahPorsi;
			$('#esnutriSubtotal').text('Rp. ' + formatCurrency(esnutriSubtotal));
			break;
		case 'esgoodday': 
			harga = 5000;
			esgooddayPorsi = jumlahPorsi;
			esgooddaySubtotal = harga * jumlahPorsi;
			$('#esgooddaySubtotal').text('Rp. ' + formatCurrency(esgooddaySubtotal));
			break;
		case 'kopi': 
			harga = 4000;
			kopiPorsi = jumlahPorsi;
			kopiSubtotal = harga * jumlahPorsi;
			$('#kopiSubtotal').text('Rp. ' + formatCurrency(kopiSubtotal));
			break;
		case 'air': 
			harga = 3500;
			airPorsi = jumlahPorsi;
			airSubtotal = harga * jumlahPorsi;
			$('#airSubtotal').text('Rp. ' + formatCurrency(airSubtotal));
			break;
		default:
			console.log('default');
			break;
	}

	total = (geprekSubtotal + nasgorSubtotal + migorSubtotal 
		+ kwegorSubtotal + estehSubtotal + tehSubtotal + esnutriSubtotal 
		+ esgooddaySubtotal + kopiSubtotal + airSubtotal);
	$('#total').text('Total Biaya: ' + formatCurrency(total))
}

function formatCurrency (number) {
	return ((parseInt(number)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))
}

function submitOrder () {
	var url_string = window.location.href;
	var url = new URL(url_string);
	var id = url.searchParams.get('id');
	var orderSummary = {
		order: {
			id_kartu: id,
			order: {
				geprek: geprekPorsi,
				nasgor: nasgorPorsi,
				migor: migorPorsi,
				kwegor: kwegorPorsi,
				esteh: estehPorsi,
				teh: tehPorsi,
				esnutri: esnutriPorsi,
				esgoodday: esgooddayPorsi,
				kopi: kopiPorsi,
				air: airPorsi
			}
		}
	}
	$.ajax({
        url: '/arduino/kantin/order',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
        	console.log(data)
        	// window.location = '/arduino/kantin/menu?id=' + id;
        },
        data: JSON.stringify(orderSummary)
    });
}