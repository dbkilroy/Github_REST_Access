# Github_REST_Access
The data I chose to model for this assignment was to create a scatter plot to view the number of repos someone owns and the number of followers they have to see if there is any correlation between the two.

## **Technologies and Tools**
- Backend 
In order to interrogate the Github API, I created a Javascript program using primarily the Node.js and Express.js to make a GET request to Github for a specific user and then store the user in a MongoDB database.

- Frontend
To display the data onto a webpage, I mainly used d3.js along with basic HTML and CSS scripts to create a local server to display the user data after it was received from the database. Browserify was required to use Node.js imports in-browser.

## **Requires**
- Requires MongoDB to be downloaded and a database with users gotten through the Github API
- Running npm install in the main folder should download all dependencies for the Node scripts

```
npm install
``` 


### Image of Repo Number vs. Followers Graph
![alt text](https://github.com/kilroyda/Github_REST_Access/blob/master/views/sweng1.PNG)

While the frontend is quite basic and minimal, the backend is far more impressive (I hope)! :ok_hand: :eyes: :sweat_drops:

## **Execution**
I was unable to create a single application to easily run all the scripts so in order to run the application, I had to: 
- Open a MongoD server using the 'mongod' command in the terminal
- Run another script to connect to the Mongo server and serve as a routing end point for the desired GET request using the 'nodemon' command
- Simultaneously run the 'client.js' script to run the HTML and JS required to display the webpage
- Use the browser to view the visualization through the local web app at localhost:3001
