import React from 'react';
import ReactDOM from 'react-dom';
import Classification from './Classification';
import Segmentation from './Segmentation';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const App = () => (
  <Router>
  	<div>
  		<div style={{
  			position : 'absolute',
  			top : 0,
  			left : 0,
  			width : '100%',
  			display : 'flex',
  			justifyContent : 'space-between'
  		}}>
	  		<Link to='/segmentation'>Goto Segmentation</Link>
	  		<Link to='/classification'>Goto Classification</Link>
  		</div>
	    <Route exact path="/" component={Classification}/>
	    <Route path="/segmentation" component={Segmentation}/>
	    <Route path="/classification" component={Classification}/>
    </div>
  </Router>
)

ReactDOM.render(<App />, document.getElementById('root'));
