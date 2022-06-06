$(document).ready(function () {
	weap_equip = $('.weapon').attr('alt');
	$("button[name='" + weap_equip + "']").addClass('selected');

	head_equip = $('.head').attr('alt');
	$("button[name='" + head_equip + "']").addClass('selected');

	//weapon customize UI
	$('#weaponbox').on('click', '.item', function () {
		//weapon data
		type = $(this).attr('id');
		img_src = $(this).children("img").attr("src");
		item_name = $(this).attr('name');

		//show selected weapon
		$('.weaponslot').removeClass('selected');
		$(this).addClass('selected');

		//append attributes of chosen weapon
		$('.weapon').attr('id', type);
		$('.weapon').attr('src', img_src);
		$('.weapon').attr('alt', item_name);
	});

	//head customize UI
	$('#hatbox').on('click', '.item', function () {
		//hat data
		type = $(this).attr('id');
		img_src = $(this).children("img").attr("src");
		item_name = $(this).attr('name');

		//show selected head
		$('.headslot').removeClass('selected');
        $(this).addClass('selected');

		//append attributes of chosen head
		if ($(this).attr('id') === 'unequip_hat'){
			$('.head').removeAttr('src');
			$('.head').removeAttr('id');
			$('.head').removeAttr('alt');
		}
		else{
			$('.head').attr('id', type);
			$('.head').attr('src', img_src);
			$('.head').attr('alt', item_name);
		}
	});

	$('#save').click(function (){
		$.post("/customize/save", saveChanges(),
			function (data, textStatus, jqXHR) {
				console.log(data);
				$('#response').text('Successfully Saved.');
			}
		);
	})

});

//returns a JSON file containing the name of the items to be saved
saveChanges = () => {
	let weaponName = $('.weapon').attr('alt');
	let hatName = $('.head').attr('alt');
	if (hatName === undefined)
		return ({weapon: weaponName, head: null});
	else
		return ({weapon: weaponName, head: hatName});
}