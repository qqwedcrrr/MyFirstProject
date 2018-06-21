import React, { Component } from 'react'
import './componetsCss/163content.css'
import viewpage1 from './../resource/viewpage1.jpg'
import viewpage2 from './../resource/viewpage2.jpg'
import viewpage3 from './../resource/viewpage3.jpg'
import viewpage4 from './../resource/viewpage4.jpg'
import bgcolor1 from './../resource/bgcolor1.jpg'
import bgcolor2 from './../resource/bgcolor2.jpg'
import bgcolor3 from './../resource/bgcolor3.jpg'
import bgcolor4 from './../resource/bgcolor4.jpg'


const viewPage = [
	{
		id:1,
		src:viewpage1,
		bgcolor:bgcolor1
	},{
		id:2,
		src:viewpage2,
		bgcolor:bgcolor2
	},{
		id:3,
		src:viewpage3,
		bgcolor:bgcolor3
	},{
		id:4,
		src:viewpage4,
		bgcolor:bgcolor4
	},
]

	var i = 1;
	const fadeIn = {
		transition:'opacity 1s ease-in 0s',
		opacity:'1'
	}
	const fadeOut = {
		transition:'opacity 1s ease-out 0s',
		opacity:'0.2'
	}
	const fadeOver = {
		transition:'none',
		opacity:'1'
	}
class Viewpage extends Component{
	constructor(props){
		super(props);
		this.state = {
			viewpageimg:viewPage[0].src,
			bgcolor:viewPage[0].bgcolor,
			fadeInOut:fadeOver,
			flag:3
		}
	};
	componentDidMount() {
			this.timeId = setInterval(
			i=>this.showfade(), 1000)

  	}
    componentWillUnmount() {
    	clearInterval(this.timeId)
  	}
  	showfade(){
  		i = i == 4 ? 0 : i;
  		switch(this.state.flag){
			case 1:
	    		this.fadein();  		
	    		break;
	    	case 2:
	    		this.fadeout();
	    		break;
	    	case 3:
	    		this.tick()
	    		break;
		}
  	}
	fadein() {
		this.setState({
			fadeInOut:fadeIn,
			viewpageimg:viewPage[i].src,
			bgcolor:viewPage[i++].bgcolor,
			flag:3
		})
	}

	fadeout(){
		this.setState({
			fadeInOut:fadeOut,
			flag:1
		})
	}

    tick() {
		this.setState({
			fadeInOut:fadeOver,
			flag:2
		})
    }

	render(){
		return(
			<div className="viewpageBG" style={{backgroundImage:"url('"+this.state.bgcolor+"')"}}>
				<div className="wrap">
					<div className="VPleft">
						<a className="logoAtag" hidefocus="true" href="/#">
						<img src={this.state.viewpageimg} style={this.state.fadeInOut} width="730" height="336" />
						</a>	
					</div>
					<div className="VPright">
						<a className="downloadtag" hidefocus="true" href="/#">
							<p>下载客户端</p>
						</a>
						<p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>	
						<span className="shadowl"></span>
						<span className="shadowr"></span>
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