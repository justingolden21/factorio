//links
//https://www.reddit.com/r/factorio/comments/3fq3cc/count_perfect_n_to_m_belt_balancers/
//https://factorioprints.com/
//https://factoriocheatsheet.com/
//https://wiki.factorio.com/Balancer_mechanics

//todo
//1-5-express img
//rest of data
//make toast when copied blueprint
//about section for blueprints
//modal for blueprint book of all balancers
//links to wiki and others

window.onload = function() {

	$('#blueprintInput').on('click', function() {
		$(this).select();
	});

	$('#copyBlueprintButton').mouseup(function() {
		$('#blueprintInput').focus();
    	document.getElementById('blueprintInput').setSelectionRange(0, $('#blueprintInput').val().length);
    	document.execCommand('copy');
	});

	$('#blueprintInput').on('click', function() {
    	$(this).setSelectionRange(0, $('#blueprintInput').val().length);
	});

	
	$('select').on('input', function() {
		update();
	});

	$('input[type=number]').on('input', function () {
		update();
	});

	$('#inputNum').select();

	load();
}

function load() {
	let balancer = window.location.href.split("?balancer=")[1];

	let split = balancer.split("-");

	let input = split[0];
	let output = split[1];
	let type = split[2];

	$('#inputNum').val(input);
	$('#outputNum').val(output);
	$('#colorSelect').val(type);
	
	try {
		if ($('#balancerImg').prop('src') != './data/pics/' + type + '/' + input + '-/' + output +  '.png') {
			$('#notFound').show();
			$('#blueprintInput').val('Balancer not found');
			$('#balancerImg').attr('src', '');	
	
			$.getJSON('./data/json/' + input + '.json', function(data) {
				let blueprint = data[output][type];
			
				let image = './data/pics/' + type + '/' + input + '-/' + output +  '.png';

				$('#notFound').hide();

				$('#balancerImg').attr('src', image);
				$('#blueprintInput').val(blueprint);
			});
		}
	} catch {

	}
}

function update() {
	let input = $('#inputNum').val();
	let output = $('#outputNum').val();
	let type = $('#colorSelect').val();

	console.log(input + ' ' + output + ' ' + type);

	let balancerURL = input + '-' + output + "-" + type;

	window.location.href = '?balancer=' + balancerURL;
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
