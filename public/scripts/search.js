$(document).ready(function () {
    $('#searchbar').submit(function(e){
        name = $('#username-entry').val();
        var request = $.get('checkuser', {name: name});

        request.done(function (jqXHR){
            location.href = '/profile?name='+name;
        });

        request.fail(function(jqXHR){
            if (jqXHR.status == 404)
                $('#error').text("User does not exist!");
        });
        e.preventDefault();
    })
});