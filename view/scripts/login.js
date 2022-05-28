function checkForm()
{
    var user = $("#user").val();
    var pass = $("#pass").val();

    var valid = false;		
    var all_fields = true;

    if (user == "")
    {
        all_fields = false;
        $("#user").css("borderColor", "red");
    }
    else
        $("#user").css("borderColor", "white");

    if (pass == "")
    {
        all_fields = false;
        $("#pass").css("borderColor", "red");
    }
    else
        $("#pass").css("borderColor", "white");

    if (all_fields == true)
    {
        valid = true;
    }
    
    return valid;
        
}