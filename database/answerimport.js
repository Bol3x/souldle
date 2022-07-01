const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/souldletestdb")

const Answer = require('./models/Answer')

async function run(){
    try{
	var date = new Date();
	
    //create Answer
    const answer = await Answer.create({
		answer: "BBBBB",
        from: "Kami",
        date: date.toDateString(),
		hour: date.getHours()
    })
    console.log(answer)
	
	//create Answer
    const guess = await Answer.create({
		answer: "AAAAA",
        from: "Kamo",
        date: date.toDateString(),
		hour: date.getHours()
    })
    console.log(guess)
	
	const check = await Answer.create({
		answer: "BBABB",
        from: "GreenPLDN",
        date: date.toDateString(),
		hour: date.getHours()
    })
    console.log(check)
	//create guess
    } catch (e) {
        console.log(e.message)
    }
}
run()