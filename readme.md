# manual-verifier

### Installation/Setup
 - install a recentish version of [node](https://nodejs.org/en/download/) >= 8
 - `sudo npm install -g yarn` install yarn
 - `yarn` will install all deps
 - `yarn start` will run development server at localhost:3000
 
### Usage
 - if prompted for password enter the password in the cred.json file
 - if no image appears then there are no unverified tiles
 - click on the image if it appears to start verifying
   - left arrow confirms that the image has no building
   - right arrow says it has a building
   - up arrow will undo and go to previous building
