//links
//https://www.reddit.com/r/factorio/comments/3fq3cc/count_perfect_n_to_m_belt_balancers/
//https://factorioprints.com/
//https://factoriocheatsheet.com/
//https://wiki.factorio.com/Balancer_mechanics
//https://gist.github.com/Bilka2/aeec4ff7123ff5544cb9a80cf1046a06

//todo

//data:
//1-5-express img
//rest of data

//make toast when copied blueprint
//about section for blueprints
//modal for blueprint book of all balancers

//styles:
//change <a> css?
//style close modal button better
//add animations for buttons?
//animate gear wheel when loading new print?

window.onload = function() {

	$('#blueprintInput').on('click', function() {
		$(this).select();
	});

	$('#blueprintInput').on('click', function() {
    	$(this).setSelectionRange(0, $('#blueprintInput').val().length);
	});

	//load correct data when input is changed
	$('select').on('input', function() {
		loadData();
	});
	$('input[type=number]').on('input', function () {
		loadData();
	});

	$('#inputNum').select();

	loadFromURL();
}

function loadFromURL() {
	let balancer = window.location.href.split('?balancer=')[1];

	let input, output, type;

	if(balancer) {
		let split = balancer.split('-');

		input = split[0];
		output = split[1];
		type = split[2];

		//force valid url
		if(isNaN(parseInt(input) ) || parseInt(input) < 1 || parseInt(input) > 8) {
			input = '1';
		}
		if(isNaN(parseInt(output) ) || parseInt(output) < 1 || parseInt(output) > 8) {
			output = '1';
		}
		if('normal fast express'.split(' ').indexOf(type) == -1) {
			type = 'normal';
		}
	} else {
		input = '1';
		output = '1';
		type = 'normal';
	}

	$('#inputNum').val(input);
	$('#outputNum').val(output);
	$('#colorSelect').val(type);

	loadData();
	updateURL();
}

function loadData() {
	let input = $('#inputNum').val();
	let output = $('#outputNum').val();
	let type = $('#colorSelect').val();
	
	try {
		if ($('#balancerImg').prop('src') != './data/pics/' + type + '/' + input + '-/' + output +  '.png') { //if not already current one
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

			updateURL();
		}
	} catch(e) {
		console.log(e);
	}
}

//update the url with current inputs
function updateURL() {
	let input = $('#inputNum').val();
	let output = $('#outputNum').val();
	let type = $('#colorSelect').val();

	//verify input
	if(parseInt(input) < 1) {
		input = '1';
		$('#inputNum').val(input);
	} else if(parseInt(input) > 8) {
		input = '8';
		$('#inputNum').val(input);
	}
	if(parseInt(output) < 1) {
		output = '1';
		$('#outputNum').val(output);
	} else if(parseInt(output) > 8) {
		output = '8';
		$('#outputNum').val(output);
	}

	let balancerURL = input + '-' + output + '-' + type;
	console.log(balancerURL);
	history.replaceState({}, '', '?balancer=' + balancerURL);
}

function downloadImg() {
	let input = $('#inputNum').val();
	let output = $('#outputNum').val();
	let type = $('#colorSelect').val();

	let link = document.createElement('a');
	link.href = './data/pics/' + type + '/' + input + '-/' + output +  '.png';
	link.download = input + '-' + output + '-' + type + '.png';

	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

function copyUrl() {
	let tmp = $('<input type="text">').appendTo(document.body);
	tmp.val(window.location.href);
	tmp.select();
	document.execCommand('copy');
	tmp.remove();
}

function copyBlueprint() {
	$('#blueprintInput').focus();
	document.getElementById('blueprintInput').setSelectionRange(0, $('#blueprintInput').val().length);
	document.execCommand('copy');
}