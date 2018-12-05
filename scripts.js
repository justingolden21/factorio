//todo
//https://www.reddit.com/r/factorio/comments/3fq3cc/count_perfect_n_to_m_belt_balancers/
//https://factorioprints.com/
//https://factoriocheatsheet.com/
//https://wiki.factorio.com/Balancer_mechanics

window.onload = function() {
	$('#inputNum').select();

	$('#blueprintInput').on('click', function() {
		$(this).select();
	});

	$('#copyBlueprintButton').on('click', function() {
		$('#blueprintInput').focus();
    	document.getElementById('blueprintInput').setSelectionRange(0, $('#blueprintInput').val().length);
    	document.execCommand('copy');
	});

	$(document).keyup(function() {
		update();
	});

	$(document).mouseup(function() {
		update();
	});

	update();
}

function update() {
	var input = $('#inputNum').val();
	var output = $('#outputNum').val();
	var type = $('#colorSelect').val();

	console.log(input + " " + output + " " + type);

	$("#notFound").show();
	$("#blueprintInput").val("balancer not found");
	$("#balancerImg").attr("src", "");

	$.getJSON("./data/json/" + input + ".json", function(data) {
		var blueprint = data[output][type];
		var image = "./data/pics/" + type + "/" + input + "-/" + output +  ".png";

		$("#notFound").hide();

		$("#balancerImg").attr("src", image);
		$("#blueprintInput").val(blueprint);
	});
}

function download() {
	var input = $('#inputNum').val();
	var output = $('#outputNum').val();
	var type = $('#colorSelect').val();

	var link = document.createElement('a');
	link.href = "./data/pics/" + type + "/" + input + "-/" + output +  ".png";
	link.download = 'download.png';

	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}