import React, { Component } from 'react'



const Schedule = () => (
  <div>
    <ul>
      <li>6/5 @ Evergreens</li>
      <li>6/8 vs Kickers</li>
      <li>6/14 @ United</li>
    </ul>
  </div>
)

class MouseTracking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 100,
      y: 100
    }
    this.handleMouseMove = this.handleMouseMove.bind(this)
  }

  handleMouseMove(e) {
    this.setState({
      x: e.clientX,
      y: e.clientY
    })
  }

  render() {
    let { x, y } = { x: this.state.x, y: this.state.y }
    return (
      <div onMouseMove={this.handleMouseMove}
        style={{
          background: '#aa0000', width: '200px', height: '200px',
          position: 'absolute', left: x - 100, top: y - 100
        }}
      >{this.props.render(this.state)}
      </div>
    )
  }
}

const CatMouse = mouse => (
  <div style={{
    background: '#ddd000', width: '200px', height: '200px',
    position: 'absolute', left: mouse.x, top: mouse.y
  }}></div>
)

const Cat = () => {
  return (
    <div>
      <MouseTracking render={mouse => (
        <CatMouse mouse={mouse} />)} />
    </div>
  )
}


export default Cat