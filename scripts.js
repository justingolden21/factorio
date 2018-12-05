//todo
//https://www.reddit.com/r/factorio/comments/3fq3cc/count_perfect_n_to_m_belt_balancers/
//https://factorioprints.com/
//https://factoriocheatsheet.com/
//https://wiki.factorio.com/Balancer_mechanics

//1-5-express img

window.onload = function() {

	$('#blueprintInput').on('click', function() {
		$(this).select();
	});

	$('#copyBlueprintButton').mouseup(function() {
		$('#blueprintInput').focus();
    	document.getElementById('blueprintInput').setSelectionRange(0, $('#blueprintInput').val().length);
    	document.execCommand('copy');
	});

	// select on click
	$('#blueprintInput').on('click', function() {
    	document.getElementById('blueprintInput').setSelectionRange(0, $('#blueprintInput').val().length);
	});

	$(document).keyup(function() {
		update();
	});

	$(document).mouseup(function() {
		update();
	});

	update();

	$('#inputNum').select();
}

function update() {
	let input = $('#inputNum').val();
	let output = $('#outputNum').val();
	let type = $('#colorSelect').val();

	console.log(input + ' ' + output + ' ' + type);

	$('#notFound').show();
	$('#blueprintInput').val('balancer not found');
	$('#balancerImg').attr('src', '');

	$.getJSON('./data/json/' + input + '.json', function(data) {
		let blueprint = data[output][type];
		let image = './data/pics/' + type + '/' + input + '-/' + output +  '.png';

		$('#notFound').hide();

		$('#balancerImg').attr('src', image);
		$('#blueprintInput').val(blueprint);
	});
}

function download() {
	let input = $('#inputNum').val();
	let output = $('#outputNum').val();
	let type = $('#colorSelect').val();

	let link = document.createElement('a');
	link.href = './data/pics/' + type + '/' + input + '-/' + output +  '.png';
	link.download = 'download.png';

	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}