function checkForm()
{
    var user = $("#user").val();
    var pass = $("#pass").val();
    var confirmPass = $("#confirmPass").val();	

    var valid = false;		
    var all_fields = true;

    if (user == "")
    {
        all_fields = false;
        $("#user").css("borderColor", "red");
    }
    else
        $("#user").css("borderColor", "black");

    if (pass == "")
    {
        all_fields = false;
        $("#pass").css("borderColor", "red");
    }
    else
        $("#pass").css("borderColor", "black");

    if (confirmPass == "")
    {
        all_fields = false;
        $("#confirmPass").css("borderColor", "red");
    }
    else
        $("#confirmPass").css("borderColor", "black");

    if (all_fields == true)
    {
        if (pass == confirmPass)
        {	
            valid = true;
        }
        else
        {
            $("#pass").css("borderColor", "red");
            $("#confirmPass").css("borderColor", "red");
        }
    }
    
    return valid;
}