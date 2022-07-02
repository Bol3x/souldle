const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/souldletestdb")

const Answer = require('./models/Answer')

async function run(){
    try{
	var date = new Date();
	
    //create Answer
    const answer = await Answer.create({
		answer: "BBBBB",
        from: "Kami",
		hour: date.getHours()
    })
    console.log(answer)
	
	//create Answer
    const guess = await Answer.create({
		answer: "AAAAA",
        from: "Kamo",
		hour: date.getHours()
    })
    console.log(guess)
	
	const check = await Answer.create({
		answer: "BBABB",
        from: "GreenPLDN",
		hour: date.getHours()
    })
    console.log(check)
	//create guess
    } catch (e) {
        console.log(e.message)
    }
}
run()
