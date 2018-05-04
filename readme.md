# manual-verifier

### Installation/Setup
 - install a recentish version of [node](https://nodejs.org/en/download/) >= 8
 - `sudo npm install -g yarn` install yarn
 - `yarn` will install all deps
 - `yarn start` will run development server at localhost:3000
 
### Usage
 - if verifying classifier data, click "goto classifier"
  - if no image appears then there are no unverified tiles
  - click on the image if it appears to start verifying
    - left arrow confirms that the image has no building
    - right arrow says it has a building
    - up arrow will undo and go to previous tile
 - if verifying segmentation data click "goto segmentation"
   - you will see a image tile with a black and white mask overlay semi transparent on top of it.
   - if the mask is mis-aligned you can drag it to re-position it
   - if the mask is missing buildings press the left arrow key to reject it
   - otherwise, once the mask is properly aligned press the right arrow key to accept the tile and move to the next one
   - up arrow will undo and go to previous tile
