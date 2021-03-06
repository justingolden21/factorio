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

//modal for blueprint book of all balancers
//big balancers?
//edit more modal
//get and use icons from cheatsheet


window.onload = function() {

	$('#blueprintInput').on('click', function() {
		$(this).select();
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

var foundBalancer;

function loadData() {
	let input = $('#inputNum').val();
	let output = $('#outputNum').val();
	let type = $('#colorSelect').val();
	
	try {
		if($('#balancerImg').prop('src') != './data/pics/' + type + '/' + input + '-/' + output +  '.png') { //if not already current one
			foundBalancer = false;
	
			$('#icon').addClass('animated');

			$.getJSON('./data/json/' + input + '.json', function(data) {
				let blueprint = data[output][type];
				let image = './data/pics/' + type + '/' + input + '-/' + output +  '.png';

				$('#notFound').hide();

				$('#balancerImg').attr('src', image);
				$('#blueprintInput').val(blueprint);

				if(imageExists() ) foundBalancer = true;

			});

			setTimeout(function () {
				if(!foundBalancer) {
					$('#notFound').show();
					$('#blueprintInput').val('Balancer not found');
					$('#balancerImg').attr('src', '');
				}
				$('#icon').removeClass('animated');
			}, 300);
			

			updateURL();
		}
	} catch(e) {
		console.log(e);
	}
}

// check if the image exists for that balancer via a http request, returns true if it exists, false if not
function imageExists()
{
	let input = $('#inputNum').val();
	let output = $('#outputNum').val();
	let type = $('#colorSelect').val();
	
	let image = './data/pics/' + type + '/' + input + '-/' + output +  '.png';

    let http = new XMLHttpRequest();
    http.open('HEAD', image, false);
    http.send();
    return http.status != 404;
}

//clamps an int
function clamp(value, min, max) {
	if(value < min) return min;
	if(value > max) return max;
	return value;
}

//update the url with current inputs
function updateURL() {
	let input = clamp(parseInt($('#inputNum').val()), 1, 8);
	let output = clamp(parseInt($('#outputNum').val()), 1, 8);
	let type = $('#colorSelect').val();

	$('#inputNum').val(input);
	$('#outputNum').val(output);

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
	showSnackbar('Url copied to clipboard');
}

function copyBlueprint() {
	$('#blueprintInput').focus();
	document.getElementById('blueprintInput').setSelectionRange(0, $('#blueprintInput').val().length);
	document.execCommand('copy');
	showSnackbar('Blueprint code copied to clipboard');
}

function showSnackbar(message) {
	$('#snackbar').addClass('show');
	$('#snackbar').html(message);
	// $('#snackbar').css('animation', 'fadein 0.5s, fadeout 0.5s 2.5s');
	setTimeout(function(){ $('#snackbar').removeClass('show') }, 3000);
}
