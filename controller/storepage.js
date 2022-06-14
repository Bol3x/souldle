let name;
$(document).ready(function () {
$('.gridbox').on('click', '.item', function() {
    img_src = $(this).children('img').attr('src');
    name = $(this).data('name');
    item_cost = parseInt($(this).data('cost'));

    $('.modal').removeClass('hidden');
    $('.modal').addClass('visible');
   $('#purchase').attr('src', img_src);

    $('#name').text(name);
    $('#cost').text('Cost: ' + item_cost + ' souls');
});

$('#closebtn').click(() =>{
    $('.modal').removeClass('visible');
    $('.modal').addClass('hidden');
    name = null;
});

$('#buy').click(() =>{
    $.post("/shop/purchase", {item_name: name},
        function (data, textStatus, jqXHR) {
            console.log(textStatus);
        },
    );
})
});