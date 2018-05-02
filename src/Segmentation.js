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

`

const Tile = styled.img`
  image-rendering : pixelated;
  position:absolute;
`

const TileContainer = styled.div`
  position:relative;
  width:600px;
  height:600px;
`

class Segmentation extends Component {
  constructor(props){
    super(props);
    this.state = {
      cursor : 0,
      tiles : [],
      password : '',
      authed : false,
      offsetX : 0,
      offsetY : 0,
      originX : 0,
      originY : 0,
      moving : false
    }
  }
  componentWillMount(){
    var pass = localStorage.getItem('pass');
    if(pass || process.env.NODE_ENV === 'development') this.connect(pass);
  }
  connect(pass){
    let headers = new Headers();
    this.setState({authed : true});
    headers.append('Authorization', 'Basic ' + btoa("test:" + pass||this.state.password));
    fetch('http://localhost:5000/segmentation/unverified', {headers}).then(res => res.json()).then(json => {
     if(json){
        this.setState({tiles : json, authed : true});
        localStorage.setItem('pass', pass);
     }
    }).catch(e => {})
  }
  saveValue(tile, val){
    console.log(tile, val)
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa("test:" + this.state.password));
    fetch(`http://localhost:5000/segmentation_verify/${tile[0]}/${tile[1]}/${val}/${this.state.offsetX}/${this.state.offsetY}`, {headers})
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
        <Container
          onMouseDown={(e) => {
            console.log(e.screenX, e.screenY, 'mousedown')
            this.setState({
              originX : e.screenX,
              originY : e.screenY,
              moving : true
            })
          }}
          onMouseUp={() => {
            this.setState({
              moving : false
            })
          }}
          onMouseMove={(e) => {
            e.preventDefault();
            if(this.state.moving){
              const dy = e.screenY-this.state.originY,
                    dx = e.screenX-this.state.originX
              console.log(dx, dy)
              this.setState({
                offsetX : dx,
                offsetY : dy
              })
            }
          }}
        >
          {'NO <-'}
          <div>
            <TileContainer>
            {tile && <Tile width='600' src={`http://localhost:5000/t/${tile[0]}/${tile[1]}`}/>}
            {tile && 
              <Tile 
                style={{
                  opacity:0.3,
                  marginTop : this.state.offsetY,
                  marginLeft : this.state.offsetX
                }} 
                width='600' 
                src={`http://localhost:5000/mt/${tile[0]}/${tile[1]}`}
              />
            }
            </TileContainer>
          <div>{this.state.tiles.length-this.state.cursor} left</div>
          </div>
          -> YES
        </Container>
        {tile && tile[0]+','+tile[1]}
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

export default Segmentation;
