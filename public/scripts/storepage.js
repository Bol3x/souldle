let name;
$(document).ready(function () {
    $('.gridbox').on('click', '.item', function() {
        img_src = $(this).children('img').attr('src');
        name = $(this).attr('id');
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

        //reset buy button
        setTimeout(() => {
            $('#buy').attr('disabled', false);
            $('#buy').css('color', 'white').css('border-color', 'darkgray').css('background-color', 'gray');
            $('#buy').text('Purchase');
        }, 100);
    });

    $('#buy').click(() =>{
        $.post("/shop/purchase", {item_name: name},
            function (data, textStatus, jqXHR) {
                $('#buy').text(data.message);
                $('#buy').attr('disabled', true);
                $('#buy').css('color', 'green').css('border-color', 'green').css('background-color', 'rgb(46, 46, 46)').text("Item Purchased");

                $('#soulcount').text("Souls: " + data.souls);
                $('#'+name).remove();
            }
        ).fail(() => {
            $('#buy').css('color', 'red').css('border-color', 'red')
            .css('background-color', 'rgb(46, 46, 46)').attr('disabled', true)
            .text("Insufficient Souls");
        });
    });


});