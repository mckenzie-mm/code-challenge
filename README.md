# My Solution

<kbd>![alt text](https://github.com/mckenzie-mm/code-challenge/blob/main/screenshots/app-photo.png)<kbd>

This repo contains my solution to the CloudWave challenge.

I have tested the logic manually.

When a user connects, he/she are assigned a randomly generated name and color and stored in a dynamic state on the server.

Time did not permit the logic to be implemented for saving the state, when the application closes.

The home page contains a list of all other users. When a user disconnects, they are removed from the list.

To communicate with another user, click on a user in the list, and the chat page is opened for both.

Clicking on the return icon, will close the chat for both users.

When there are multiple users, the chat window will only open for the two users that are messaging. 

The styling is based on a template I found online, which used Bootstrap. Therefore I replaced the Antd with Bootstrap.

The original template is at: 

https://bootsnipp.com/snippets/nNg98

I use Context for preserving the state between pages, but State management, such as Redux is an alternative.

Basic unit tests were written for verifying the DOM and user interactions. Time did not permit more extensive tests. I had trouble installing and using "jest-dom" (which was using a require import) and so I used "happy-dom" instead.

The pages can be refactored into separate components (but time did not permit this).



# CloudWave Full Stack Code Challenge ~ Wave Chat
CloudWave have provided scaffolding for both the front and back end of the challenge, to save you time.

## Front-end

### Configuration
This application uses Vite, ReactJS, Typescript and vitest for testing. `tsconfig.json` has been pre-configured for the environment and hot reloading has been set up for you.

⚠️ **Some files may throw typescript errors due to empty placeholder files or commented out code.**

&nbsp;
### Linting
There's `stylelint` for linting SCSS files and `eslint` for linting code. You can lint the application with the `lint` and `lint:styles` commands in `package.json`.

⚠️ **Some files may throw linting warnings due to commented out scaffolding code.**

&nbsp;
### UI & Components
We've added `ant design` for you to use, which comes with a selection of UI React components and style classes out of the box.

Read more [here](https://ant.design/).

Not comfortable with Ant design? Feel free to use native HTML elements or another component library, such as `material-ui` or `react-bootstrap`.

&nbsp;
### Routing
This challenge uses `react-router` for routing.

&nbsp;
### Socket IO
Read more [here](https://socket.io/). The examples on the home page should be enough for you to complete the challenge.

&nbsp;
## Back-end

### Configuration
This application uses typescript and jest. `tsconfig.json` has been pre-configured for the environment.

&nbsp;
### Socket IO
The HTTP server with socket.io are already connected. The socket server will automatically run by default on port 3001.

&nbsp;
### Hot Reload
The backend server supports hot reload using `nodemon`. Any changes you make to files will automatically be updated if the server is started with the `start:dev` command.
