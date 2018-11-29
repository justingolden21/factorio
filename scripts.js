//todo
//https://www.reddit.com/r/factorio/comments/3fq3cc/count_perfect_n_to_m_belt_balancers/
//https://factorioprints.com/
//https://factoriocheatsheet.com/


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

	$('#copyBlueprintButton').on('click', function() {

	});

}