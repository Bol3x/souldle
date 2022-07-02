# Souldle

Created by: <br>
Jan Carlo Roleda <br>
Shane Owen Uy <br>
John Paul Pangan <br>
<br>
**Souldle** is a wordle-inspired browser guessing game where you are given only one chance to successfully repel a boss’ attack sequence using a perfect sequence of predefined actions. However, you are not alone, as players who have challenged it before you but have failed will leave a trail of actions as clues that will help you devise a flawless strategy to defeat the boss and earn souls used to customize your account.
<br><br>

## GAMEPLAY
In order to defeat/survive the boss, the player must choose **5 moves** done in a **particular sequence**. There are **5 possible actions** to choose for each move. If the player provides a correct sequence, they will be awarded souls which can be used to purchase cosmetics for their avatar and profile. Failure to provide the correct sequence does not affect the number of souls you hold.

To aid the players in guessing the correct combination, the moves of previous players that have failed to guess the sequence but were correct to a certain amount will be sent to the challenger. The server will select a previous player’s move that failed, and the correct moves of that player will be granted as a message to the current player, while the remaining nodes will be for the current player to guess correctly. These moves will be given a weight according to the number of correct choices, and the message provided by the server will never be the correct answer.

The boss refreshes **every hour**, and when it refreshes the correct sequence of moves is rerolled. All players who played in the previous period will be able to attempt to guess the correct sequence again.

**Souls** can be used to trade for in-game items. These items are cosmetics which can be used on a user’s avatar. This customized avatar is reflected onto the game avatar when it is being played in the game screen. 

Users who are not registered to the server can still play Souldle, but will not obtain any souls on completion of their attempt.

## Running the app Locally
- Make sure **Node.js** and **MongoDB** are installed in the working computer
	- MongoDB: https://www.mongodb.com/try/download/community
	- Node.js: https://nodejs.org/en/download/
- Execute `node database/itemimport.js` first to apply all the existing items into the game.
- Then, execute the command `node index.js` on your CLI to start the server.

## Contents
- [`controller`](/controller) handles all client requests, segregated by each file's respective feature.
- [`database`](/database) contains all database models and import script for items.
- [`public`](/public) contains all assets, css stylesheets, and client-side scripts.
- [`views`](/views) stores all the Embedded JavaScript (EJS) files and partials to be used by the server API for rendering webpages.
- [`route.js`](/route.js) handles the server response for each client request based on the specific path requested.
- [`index.js`](/index.js) is the main server application
- [`.env`](/.env) handles the environment variables for where the server is to run on.

## Features
- ### Game
	- The main feature of Souldle. Users may select a sequence of actions, guided by the first row of guesses taken from a random previous user.
		- Correct answers are shown with a blue border, And are guaranteed to be correct for that hour.
		- A help button is provided to familiarize new players with the gameplay.
	![image](https://user-images.githubusercontent.com/59347516/176991126-e859eae7-05e1-40ed-bbae-e52304c950f2.png)
	
	- The server will reset at every minute 0 of an hour (ie. Hourly refresh), refreshing the correct sequence as well as clearing the database of the previous hour's answers. To ensure a guess is given to the first player, 3 random sequences will be generated alongside the current hour's key.



- ### Accounts and Sessions
	- Upon visiting Souldle, the visitor will be given two options of either playing straight as a guest, or log-in and/or register as a new user.
	- When unregistered visitors choose to play the game, they are not rewarded any souls and can only access the game page, as they have no account registered in the database. Users will register with a unique name which does not yet exist in the user database.
	![image](https://user-images.githubusercontent.com/59347516/176990928-6419d5ca-02ba-4f8e-97a7-4a8bb642dd3b.png)
	
	- Registered users will be able to store their gameplay data, souls, and unlock customization features on their avatar.
	![image](https://user-images.githubusercontent.com/59347516/176990978-60f48a06-997d-4380-a349-dba5eda9b5c1.png)
	
	- Registered users can change their password, or delete their account in the account settings page.
	![image](https://user-images.githubusercontent.com/59347516/176991597-ec24388b-7245-4fc7-92e0-07fd186e6887.png)
	
	- Registered Users can also search for one another using their username to view their statistics and avatar.
	![image](https://user-images.githubusercontent.com/59347516/176992352-f58a629f-8372-4fe2-bd2e-b2c339452acf.png)
	![image](https://user-images.githubusercontent.com/59347516/176992270-e8049290-982f-4bce-acda-07f07b9ab460.png)
	
	- Finally, registered users can update their password, log-out, as well as delete their account
	![image](https://user-images.githubusercontent.com/59347516/176992310-7800f9f3-42b3-425c-a588-0032a8964692.png)
	![image](https://user-images.githubusercontent.com/59347516/176992322-a2fec8e4-2ea7-4fce-bf99-3996bd7380bf.png)
	


- ### Customization
	- Users can customize their avatar, which will be shown in their profile, homepage, and game.
	![image](https://user-images.githubusercontent.com/59347516/176991515-b722af8a-e56b-4e7e-b185-6a1866a61e2b.png)
	
	- These items can be purchased in the shop, which uses souls obtained from playing the game as currency.
	![image](https://user-images.githubusercontent.com/59347516/176991481-676baa19-d8ac-4966-ad88-ea5c0df3acd3.png)

