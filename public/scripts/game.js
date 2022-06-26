const answer = ["","","","",""];
function wait() {
	console.log("");
}
function checkfull(arr){
	for(var i =0; i <arr.length;i++)
	{
		if (arr[i] == "")
		{
			console.log("answer not full");
			//maybe add a popup here
			return false;
		}
	}
	return true;
}
function insert(action,arr){
	for(var i =0; i <arr.length;i++)
	{
		if (arr[i] == "")
		{
			arr[i] = action;
			return i;
		}
	}
}
function updateIcon(lmnt,icon){
	lmnt.className = 'iconbox';
	if (icon == "A")
		lmnt.addClass("A");
	if (icon == "B")
		lmnt.addClass("B");
	if (icon == "C")
		lmnt.addClass("C");
	if (icon == "D")
		lmnt.addClass("D");
	if (icon == "E")
		lmnt.addClass("E");
}
function updateMessage(msgarray,arr,corr){
	for(var i =0; i <arr.length;i++)
	{
		updateIcon(msgarray[i],arr[i]);
		if (arr[i] == corr[i])
		{
			msgarray[i].addClass("correct");
		}
		else
		{
			msgarray[i].addClass("wrong");
		}
	}
}
$(document).ready(function() {
	//get the divs that will be graphically updated via getElement or $()
	const m1 = $("#msg1");
	const m2 = $("#msg2");
	const m3 = $("#msg3");
	const m4 = $("#msg4");
	const m5 = $("#msg5");
	const ch1 = $("#c1");
	const ch2 = $("#c2");
	const ch3 = $("#c3");
	const ch4 = $("#c4");
	const ch5 = $("#c5");
	//maybe place the divs in an array, that might be helpful
	const msgarray = [m1,m2,m3,m4,m5];
	const charry = [ch1,ch2,ch3,ch4,ch5];
	
	//declare the local varibles
	var correctstring;
	var guess;
	guess = "ABADE";
	correctstring = "ACABA";
	
	//obtain correct answer from data base
	
	//obtain guess from database
	
	//initialize message
	updateMessage(msgarray,guess,correctstring);
	
	//make an onclick function for each action button
	$("#c1").click(function(){
	answer[0] = "";
	$("#c1").prop('class','iconbox');
	console.log(answer);
	});
	$("#c2").click(function(){
	answer[1] = "";
	$("#c2").prop('class','iconbox');
	console.log(answer);
	});
	$("#c3").click(function(){
	answer[2] = "";
	$("#c3").prop('class','iconbox');
	console.log(answer);
	});
	$("#c4").click(function(){
	answer[3] = "";
	$("#c4").prop('class','iconbox');
	console.log(answer);
	});
	$("#c5").click(function(){
	answer[4] = "";
	$("#c5").prop('class','iconbox');
	console.log(answer);
	});

	$("#a").click(function(){
	var ps = insert("A",answer);
	charry[ps].addClass("A");
	console.log(answer);
	});
	$("#b").click(function(){
	var ps = insert("B",answer);
	charry[ps].addClass("B");
	console.log(answer);
	});
	$("#c").click(function(){
	var ps = insert("C",answer);
	charry[ps].addClass("C");
	console.log(answer);
	});
	$("#d").click(function(){
	var ps = insert("D",answer);
	charry[ps].addClass("D");
	console.log(answer);
	});
	$("#e").click(function(){
	var ps = insert("E",answer);
	charry[ps].addClass("E");
	console.log(answer);
	});
	
	//submit button event
	$("#base").click(function (){
		console.log("test");
		var souladd = 0;
		if (checkfull(answer)) //checks if answer is complete
		{
			for (var i = 0;i<answer.length;i++)
			{
				if (answer[i] == correctstring[i])
				{
					charry[i].addClass("correct");
					setTimeout(wait, 100);
					souladd += 1;
				}
				else
				{
					charry[i].addClass("wrong");
					setTimeout(wait, 100);
				}
			}
		if(souladd == 5)
		{
			$.post('/game/win', function (data, textStatus, jqXHR) {
					var screen = document.createElement("div");
					var message = document.createElement("div");
					var stats = document.createElement("div");
					var wst = document.createElement("div");
					var max = document.createElement("div");
					var nwin = document.createElement("div");
					var ngame = document.createElement("div");
					var souls = document.createElement("div");
					message.text(data.message);
					stats.text("Statistics");
					wst.text("Win Streak: " + data.winst);
					max.text("Max Streak: " + data.max);
					nwin.text("Number of Wins: " + data.wins);
					ngame.text("Number of Games: " + data.ngms);
					souls.text("Soul Count: " + data.souls);
					screen.appendChild(message);
					stats.appendChild(wst);
					stats.appendChild(max);
					stats.appendChild(nwin);
					stats.appendChild(ngame);
					screen.appendChild(stats);
					screen.appendChild(souls);
					$("#Bossbox").replaceWith(screen); //turn boss screen to win screen
            });
		}
		else
		{
			$.post('/game/loss');
		}
		//we could place a pop up here saying if they won today or not, but it will also notify them how many souls they got today.
		}
		//goes through the local answer string (for loop)
		
	});
});