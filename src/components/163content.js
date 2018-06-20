import React, { Component } from 'react'
import './componetsCss/163content.css'
import viewpage1 from './../resource/viewpage1.jpg'
import viewpage2 from './../resource/viewpage2.jpg'
import viewpage3 from './../resource/viewpage3.jpg'
import viewpage4 from './../resource/viewpage4.jpg'



const viewPage = [
	{
		id:1,
		src:viewpage1
	},{
		id:2,
		src:viewpage2
	},{
		id:3,
		src:viewpage3
	},{
		id:4,
		src:viewpage4
	},
]


class Viewpage extends Component{
	constructor(props){
		super(props)
	};
	render(){
		var viewpageimg = viewPage[0].src
		console.log(viewpageimg)
		for(let i = 0; i<viewPage.length;i++){
			setTimeout(()=>{
				console.log(viewpageimg)
				viewpageimg = viewPage[i].src

			},4000)
		}
		return(
			<div className="viewpageBG">
				<div className="wrap">
					<div className="VPleft">
						<a className="logoAtag" hidefocus="true" href="/#">
						<img src={viewpageimg} width="730" height="336" />
						</a>	
					</div>
					<div className="wrap">
						<p> shit is shit</p>
					</div>
				</div>
			</div>
		)
	}
}

class Lcontent extends Component{	
	constructor(props){
		super(props)
	};
	render(){
		return (
			<div>
			</div>

		)
		
	}

}

class Rcontent extends Component {
	constructor(props){
		super(props)
	};
	render(){
		return (
			<div>
			</div>

		)
		
	}
}



const Maincontent = () => (
  <div style={{position:'absolute',marginTop:'105px',width:"100%"}}>
  	<Viewpage />
  </div>
)

export default Maincontent