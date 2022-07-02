# Souldle

<br><br>
Created by: <br>
Jan Carlo Roleda <br>
Shane Owen Uy <br>
John Paul Pangan <br>
<br>
**Souldle** is a wordle-inspired browser guessing game where you are given only one chance to successfully survive a boss’s attack sequence using a perfect sequence of predefined actions. However, you are not alone, as players who have challenged it before you but have failed will leave a trail of actions as clues that will help you devise a flawless strategy to defeat the boss and earn souls used to customize your account.
<br><br>

## GAMEPLAY
In order to defeat/survive the boss, the player must choose **5 moves** done in a **particular sequence**. There are **5 possible actions** to choose for each move. If the player provides a correct sequence, they will be awarded souls which can be used to purchase cosmetics for their avatar and profile. Failure to provide the correct sequence does not affect the number of souls you hold.

To aid the players in guessing the correct combination, the moves of previous players that have failed to guess the sequence but were correct to a certain amount will be sent to the challenger. The server will select a previous player’s move that failed, and the correct moves of that player will be granted as a message to the current player, while the remaining nodes will be for the current player to guess correctly. These moves will be given a weight according to the number of correct choices, and the message provided by the server will never be the correct answer.

The boss refreshes **every hour**, and when it refreshes the correct sequence of moves is rerolled. All players who played in the previous period will be able to attempt to guess the correct sequence again.

**Souls** can be used to trade for in-game items. These items are cosmetics which can be used on a user’s avatar. This customized avatar is reflected onto the game avatar when it is being played in the game screen. 

Users who are not registered to the server can still play Souldle, but will not obtain any souls on completion of their attempt.

## Running Souldle Locally
- Make sure **Node.js** and **MongoDB** are installed in the working computer
	- MongoDB: https://www.mongodb.com/try/download/community
	- Node.js: https://nodejs.org/en/download/
- Once installed, update the [`.env`](/.env) file to change the **hostname, port number, and database URL** appropriately
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

