### This app is developed in React. You will need node.js and NPM to run it
### How to install and deploy the application
1.	Open folder you want to clone project to.
2.	Open cmd or git bash in that folder
3.	Type in “git init”
4.	"git clone git@github.com:sehic-ademir/github-webapp.git”
5.	“cd github-webapp”
6.	When you open github-webapp folder, type in npm install and then npm start
7.	The application is ready to go
### How to install and deploy backend
1.	Open folder you want to clone project to.
2.	Open cmd or git bash in that folder
3.	Type in “git init”
2.	"git clone git@github.com:sehic-ademir/github-webapp-backend.git"
3.	“cd github-webapp-backend”
4.	When you open github-webapp-backend folder, type in npm install and then npm start
5.	The application is ready to go
### Why React.js and Express.js
	React was not my first option. I planned to use plain JavaScript, but as the project was growing it became too large to manipulate code easily. I chose React since I have more experience in it than any other framework and it is quite popular today. 
	Express.js was the best option since I only had to write few lines of code to store json data in json file
### Why GitHub REST API
	Upon research of REST API’s suggested in e-mail, I have found out Facebook is switching to GraphQL API and as I already had experience with Twitter and Instagram API’s I knew they ask for request to be sent for receiving token for API. Github offers API for repositories and users and I had more to work with than Office 365.
###  Web Application Walkthrough
# Github does not allow a lot of requests to be sent without token, so the best say is to click on follow on any user and insert token or go to /insert/token route and insert it there
•	Created components and container folders to easily navigate between routes and reusable code

•	Installed router with “npm install --save react-router-dom”

•	Installed bootstrap with “npm install react-bootstrap bootstrap”

# Component hierarchy
### Users
•	User
### Repositories
•	Repo
### UserRepo
•	Repo
### UserContainer
•	Repo
•	User
### Home 
•	UserContainer
### Following & Followers
•	User


# Containers
## App.js 
### 1.	Components

•	BrowserRouter

### 2.	Routes

•	exact path ="/" component={Home}

•	exact path="/user/:id" component={UserContainer}

•	exact path="/users/:id/:page" component={Users}

•	exact path="/repository/:id/:page" component={Repositories}

•	exact path="/users/repo/:id/:page" component={UserRepo}

•	exact path="/users/followers/:id/:page" component={Followers}

•	exact path="/users/following/:id/:page" component={Following}
## Repositories
1.	componentDidMount() takes id from params and calls this.callRepos(query)
2.	async callRepos(query) fetches repositories by keyword(s) from input and sets state for repos, response and total_count
3.	If total_count is 0, it will return HTML with 'No results found'
4.	If total_count is more than 0, it will return map with class Repo which will present data dynamically with all repositories containing keyword, 10 per page, with paging component in bottom
5.	If total_count is undefined, it will return Loader component
6.	componentDidUpdate(prevProps, prevState) will call this.callRepos(query) in case props have been changed


## Users
1.	componentDidMount() will call this.callUsers()
2.	async callUsers() fetches users by keyword(s) from input and sets state for users, response and total_count
3.	If total_count is 0, it will return HTML with 'No results found'
4.	If total_count is more than 0, it will return map with class User which will present data dynamically with all users containing keyword, 10 per page, with paging component in bottom
5.	If total_count is undefined, it will return Loader component
6.	componentDidUpdate(prevProps, prevState) will call this.callUsers() in case props have been changed
## Following & Followers
		Both classes are same except for REST API call
1.	componentDidMount() will call this.callUsers()
2.	async callUsers() fetches users' followers/following with 10 per page and sets state for users and response and calls this.callPages() since this api route does not have total_count
3.	async callPages() calls users again but without query params and sets state for total_count
4.	If total_count is 0, it will return HTML with 'No results found'
5.	If total_count is more than 0, it will return map with class User which will present data dynamically with all users from state.users, 10 per page, with paging component in bottom
6.	If total_count is undefined, it will return Loader component
7.	componentDidUpdate(prevProps, prevState) will call this.callUsers() in case props have been changed
## UserRepo
1.	componentDidMount()calls this.callRepos()
2.	async callRepos() fetches repositories by params provided and sets state for repos, response and calls this.callPages() since this api route does not have total_count
3.	async callPages() calls repositories again but without query params and sets state for total_count
4.	If total_count is 0, it will return HTML with 'No results found'
5.	If total_count is more than 0, it will return map with class Repo which will present data dynamically with all repositories from state.repos, 10 per page, with paging component in bottom
6.	If total_count is undefined, it will return Loader component
7.	componentDidUpdate(prevProps, prevState) will call this.callRepos() in case props have been changed
## UserContainer
1.	componentDidMount() checks if UserContainer is loaded with props or params and calls this.callRepos(id) and this.callUser(id) accordingly
2.	async callUser(id) fetches user by id and sets state to user
3.	async callRepos(id) fetches all repositories from user and sets state to repository
## Home 
1.	returns <UserContainer /> with my github account id as props :)

# Components
## Repo
1.	Takes props and presents data
2.	Onclick copies github repository ssh and saves changes to json file
## User
1.	async callUser() fetches user with id from props and presents it in HTML
2.	async checkIfFollowing() sends requests to check if user with token is following searched user
3.	async callFollow() & async callUnfollow() follows and unfollows user respectively and calls this.saveChanges(changes)
4.	async saveChanges(changes) sends data to backend and its saved in json format
## Searchbox 
1.	Takes input values from form and navigates through routes with Link from router
## TokenInput
1.	Takes token from form and saves it in localStorage
## Paging
2.	Takes props and presents paging in bottom of page



### NPM README

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
