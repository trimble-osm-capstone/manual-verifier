import React, { Component } from 'react';
import {HotKeys} from 'react-hotkeys';

import styled, { injectGlobal } from 'styled-components';
injectGlobal`
  body{
    width:100%;
    height:100%;
    position:absolute;
    margin:0;
    display:flex;
    align-items:center;
    justify-content:center;
    font-family:sans-serif;
  }
`

const Container = styled.div`
  display:flex;
  align-items:center;

  img{
    margin:20px;
  }
`

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      cursor : 0,
      tiles : []
    }
  }
  componentWillMount(){
    fetch('http://34.214.185.174/api/unverified').then(res => res.json()).then(json => {
      console.log(json.length);
      this.setState({tiles : json})
    })
  }
  saveValue(tile, val){
    console.log(tile, val);
    fetch(`http://34.214.185.174/api/verify/${tile[0]}/${tile[1]}/${val}`)
  }
  inc(){
    this.setState({cursor : this.state.cursor+1});
  }
  dec(){
    if(this.state.cursor) this.setState({cursor : this.state.cursor-1});
  }
  render() {
    const tile = this.state.tiles[this.state.cursor];
    console.log(tile);
    return (
      <HotKeys 
        keyMap={{
          'building' : 'right',
          'no_building' : 'left',
          'back' : 'up'
        }}
        handlers={{
          'building' : () => {
            this.saveValue(this.state.tiles[this.state.cursor], true);
            this.inc();
          },
          'no_building' : () => {
            this.saveValue(this.state.tiles[this.state.cursor], false);
            this.inc();
          },
          'back' : () => this.dec()
        }}
      >
        <Container>
          {'none <-'}
          <div>
          {tile && <img width='600' style={{imageRendering : 'pixelated'}} src={`http://34.214.185.174/api/t/${tile[0]}/${tile[1]}`}/>}
          <div>{this.state.tiles.length-this.state.cursor} left</div>
          </div>
          -> building
        </Container>
      </HotKeys>
    );
  }
}

export default App;
