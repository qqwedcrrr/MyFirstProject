import React, { Component } from 'react'

class LContent extends Component{	
	constructor(props){
		super(props)
	};
	render(){
		
	}

}

class RContent extends Component {

}



const mainContent = () => (
  <div style={{border:'1px solid #d3d3d3'}}>
    <LContent />
	<RContent />
  </div>
)

export default mainContent