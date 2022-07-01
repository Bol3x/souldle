const answer = ["","","","",""];
const thingy = ["",""]
function becomeString(arr){
	var string = "";
	for(var i=0; i<arr.length;i++)
	{
		string += arr[i]
	}
	return string;
}
function setzero(s,msgarray){
	thingy[0] = s;
	if (thingy[1] != "")
		updateMessage(msgarray,thingy[0],thingy[1]);
}
function setOne(s,msgarray){
	thingy[1] = s;
	if (thingy[0] != "")
		updateMessage(msgarray,thingy[0],thingy[1]);
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
function random(){
	var i, r, string;
	string = "";
	for (i=0; i<5; i++)
	{
		r = Math.floor(Math.random()*5) + 1;
		switch(r){
			case 1: string += "A";break;
			case 2: string += "B";break;
			case 3: string += "C";break;
			case 4: string += "D";break;
			case 5: string += "E";break;
		}		
	}
	return string;
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
	for(var i=0; i <arr.length;i++)
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
	
	//TODO: check if player has played already
	$.get('game/played?',function(result)
	{
		if (result == "BAD")
		{
			alert("You have played for this hour, try again later");
			$('#base').css("pointer-events","none");
			$('#base').css("opacity","0.4");
			$.get('game/leave');
		}
	});
	
		//if yes, show popup saying that they played already and cannot play again
			//disable all things that would allow them to make another submission
		//else
			//enable all things that would allow them to make another submission
	//console.log(random()); //random test
	var datetoday = new Date();
	var currentHour = datetoday.getHours();
	var guess, correctstring;
	console.log(currentHour);
	
	//obtain guess and correctanswer from database
	$.get('game/guess', {from: {$ne:'Kami'}, hour : currentHour},
	function (thing){setzero(thing.message, msgarray);});
	$.get('game/answer', {from: 'Kami', hour : currentHour},
	function(thing){setOne(thing.message, msgarray);});
	
	
	//initialize message
	
	//make an onclick function for each action button
	$("#c1").click(function(){
		answer[0] = "";
		$("#c1").prop('class','iconbox');
	});
	$("#c2").click(function(){
		answer[1] = "";
		$("#c2").prop('class','iconbox');
	});
	$("#c3").click(function(){
		answer[2] = "";
		$("#c3").prop('class','iconbox');
	});
	$("#c4").click(function(){
		answer[3] = "";
		$("#c4").prop('class','iconbox');
	});
	$("#c5").click(function(){
		answer[4] = "";
		$("#c5").prop('class','iconbox');
	});

	$("#a").click(function(){
		if (!(checkfull(answer)))
		{
			$('#errormsg').text("");
			var ps = insert("A",answer);
			charry[ps].addClass("A");
		}
		else
		{
			$('#errormsg').text("Answer is full");
		}
	});
	$("#b").click(function(){
		if (!(checkfull(answer)))
		{
			$('#errormsg').text("");
			var ps = insert("B",answer);
			charry[ps].addClass("B");
		}
		else
		{
			$('#errormsg').text("Answer is full");
		}
	});
	$("#c").click(function(){
		if (!(checkfull(answer)))
		{
			$('#errormsg').text("");
			var ps = insert("C",answer);
			charry[ps].addClass("C");
		}
		else
		{
			$('#errormsg').text("Answer is full");
		}
	});
	$("#d").click(function(){
		if (!(checkfull(answer)))
		{
			$('#errormsg').text("");
			var ps = insert("D",answer);
			charry[ps].addClass("D");
		}
		else
		{
			$('#errormsg').text("Answer is full");
		}
	});
	$("#e").click(function(){
		if (!(checkfull(answer)))
		{
			$('#errormsg').text("");
			var ps = insert("E",answer);
			charry[ps].addClass("E");
		}
		else
		{
			$('#errormsg').text("Answer is full");
		}
	});
	
	//submit button event
	$("#base").click(function (){
		var souladd = 0;
		if (checkfull(answer)) //checks if answer is complete
		{
			for (var i = 0;i<answer.length;i++)
			{
				if (answer[i] == thingy[1][i])
				{
					charry[i].addClass("correct");
					souladd += 1;
				}
				else
				{
					charry[i].addClass("wrong");
				}
			}
			if(souladd == 5)
			{
				alert("You win! you gained 5 souls");
				var ans = becomeString(answer);
				$.post('game/upload', {answer: ans});
				$.post('game/win');
				$('#base').css("pointer-events","none");
				$('#base').css("opacity","0.4");
			}
			else
			{
				alert("You lose... you gained " + souladd + " souls");
				var ans = becomeString(answer);
				$.post('game/upload', {answer: ans});
				$.post('game/lose', {sgain: souladd});
				$('#base').css("pointer-events","none");
				$('#base').css("opacity","0.4");
			}
		//we could place a pop up here saying if they won today or not, but it will also notify them how many souls they got today.
		}
		else
		{
			
		}
	});
});
