$(document).ready(function () {
	weap_equip = $('.weapon').data('name');
	$("button[name='" + weap_equip + "']").addClass('selected');

	head_equip = $('.head').data('name');
	$("button[name='" + head_equip + "']").addClass('selected');

	//weapon customize UI
	$('#weaponbox').on('click', '.item', function () {
		//weapon data
		type = $(this).attr('id');
		img_src = $(this).children("img").attr("src");
		item_name = $(this).attr('name');
		//console.log(item_name);

		//show selected weapon
		$('.weaponslot').removeClass('selected');
		$(this).addClass('selected');

		//append attributes of chosen weapon
		$('.weapon').attr('id', type);
		$('.weapon').attr('src', img_src);
		$('.weapon').data('name', item_name);

		//remove text in responsebox if exists
		$('#response').text('');
	});

	//head customize UI
	$('#hatbox').on('click', '.item', function () {
		//hat data
		type = $(this).attr('id');
		img_src = $(this).children("img").attr("src");
		item_name = $(this).attr('name');
		//console.log(item_name);

		//show selected head
		$('.headslot').removeClass('selected');
        $(this).addClass('selected');

		//append attributes of chosen head
		if ($(this).attr('id') === 'unequip_hat'){
			$('.head').removeAttr('src');
			$('.head').removeAttr('id');
			$('.head').data('name', null);
		}
		else{
			$('.head').attr('id', type);
			$('.head').attr('src', img_src);
			$('.head').data('name', item_name);
		}

		//remove text in responsebox if exists
		$('#response').text('');
	});

	$('#save').click(function (){
		$.post("/customize/save", saveChanges(),
			function (data, textStatus, jqXHR) {
				console.log(data);
				console.log(textStatus);
				$('#response').text('Successfully Saved.');
			}
		).fail(function(){
			$('#response').text('Successfully Saved.');
			$('#response').css('color', 'red');
		});
	});

});

//returns a JSON file containing the name of the items to be saved
saveChanges = () => {
	return ({weapon: $('.weapon').data('name'), head: $('.head').data('name')});
}