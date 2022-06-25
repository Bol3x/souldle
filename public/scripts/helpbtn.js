//help button script
$(document).ready(function () {
	$("#help1").hide();
	$("#help2").hide();
	$("#help3").hide();
	checkHelpNo(helpNo);
});

//open help
var helpNo;
$(".helpbtn").click(function () {
	$(".help-modal").removeClass("hidden");
	$(".help-modal").addClass("visible");
	$("#help1").show();
	$("#help2").hide();
	$("#help3").hide();
	helpNo = 1;
	checkHelpNo(helpNo);
});

$("#closebtn").click(function () { 
	$(".help-modal").removeClass("visible");
	$(".help-modal").addClass("hidden");
});

$("#backbtn").click(function () {
	$("#help"+helpNo).hide();
	helpNo = helpNo - 1;
	checkHelpNo(helpNo);
	$("#help"+helpNo).show();
});

$("#nextbtn").click(function () {
	$("#help"+helpNo).hide();
	helpNo = helpNo + 1;
	checkHelpNo(helpNo);
	$("#help"+helpNo).show();
});

checkHelpNo = (num)  => {
	if (num == 3){
		$("#nextbtn").prop('disabled', true);
		$("#backbtn").prop('disabled', false);
	}
	else if (num == 1){
		$("#backbtn").prop('disabled', true);
		$("#nextbtn").prop('disabled', false);

	}
	else{
		$("#nextbtn").prop('disabled', false);
		$("#backbtn").prop('disabled', false);
	}
}