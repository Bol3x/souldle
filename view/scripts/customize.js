$(document).ready(function () {
	name = $('.weapon').attr('alt');
	$("button[name='" + name + "']").addClass('selected');
	
	$('#weaponbox').on('click', '.item', function () {
		type = $(this).attr('id');
		img_src = $(this).children("img").attr("src");

		$('.weaponslot').removeClass('selected');
		$(this).addClass('selected');
		$('.weapon').attr('id', type);
		$('.weapon').attr('src', img_src);
	});

	$('#hatbox').on('click', '.item', function () {
		type = $(this).attr('id');
		img_src = $(this).children("img").attr("src");

		$('.headslot').removeClass('selected');
        $(this).addClass('selected');
		if ($(this).attr('id') === 'unequip_hat'){
			$('.head').removeAttr('src');
			$('.head').removeAttr('id');
		}
		else{
			$('.head').attr('id', type);
			$('.head').attr('src', img_src);
		}
	});
});