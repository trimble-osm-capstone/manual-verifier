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

class Classification extends Component {
  constructor(props){
    super(props);
    this.state = {
      cursor : 0,
      tiles : [],
      password : '',
      authed : false
    }
  }
  componentWillMount(){
    var pass = localStorage.getItem('pass');
    if(pass || process.env.NODE_ENV === 'development') this.connect(pass);
  }
  connect(pass){
    let headers = new Headers();
    this.setState({authed : true})
    headers.append('Authorization', 'Basic ' + btoa("test:" + pass||this.state.password));
    fetch('http://localhost:5000/unverified', {headers}).then(res => res.json()).then(json => {
     if(json){
        this.setState({tiles : json, authed : true});
        localStorage.setItem('pass', pass);
     }
    }).catch(e => {})
  }
  saveValue(tile, val){
    if(!tile) return;
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa("test:" + this.state.password));
    fetch(`http://localhost:5000/verify/${tile[0]}/${tile[1]}/${val}`, {headers})
  }
  inc(){
    this.setState({cursor : this.state.cursor+1});
  }
  dec(){
    if(this.state.cursor) this.setState({cursor : this.state.cursor-1});
  }
  render() {
    const tile = this.state.tiles[this.state.cursor];

    return this.state.authed ? (
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
          {tile && <img width='600' style={{imageRendering : 'pixelated'}} src={`http://localhost:5000/t/${tile[0]}/${tile[1]}`}/>}
          <div>{this.state.tiles.length-this.state.cursor} left</div>
          </div>
          -> building
        </Container>
      </HotKeys>
    ):(
      <Container>
        <input type='password' value={this.state.password} onChange={(e) => this.setState({password : e.target.value})}/>
        <div onClick={() => this.connect(this.state.password)}>
          OK
        </div>
      </Container>
    )
  }
}

export default Classification;
