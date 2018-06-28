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

const url = 'http://localhost:3001'

const lcnaviTab = [
	{
		id:1,
		text:'华语',
		href:''
	},
	{
		id:2,
		text:'流行',
		href:''
	},
	{
		id:3,
		text:'摇滚',
		href:''
	},
	{
		id:4,
		text:'华语',
		href:''
	},
	{
		id:5,
		text:'华语',
		href:''
	},
]

	var i = 0;
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
	let banner = [];
	let maxlength = 0;

class Viewpage extends Component{
	constructor(props){
		super(props);
		this.state = {
			viewpageimg:viewPage[0].src,
			bgcolor:viewPage[0].bgcolor,
			fadeInOut:fadeOver,
			flag:3
		};
		this.handlePointClick = this.handlePointClick.bind(this);
		this.handleLeftClick = this.handleLeftClick.bind(this);
		this.handleRightClick = this.handleRightClick.bind(this)
	};

	componentWillMount() {
		let phone = '15656000329';
		let password = '493105923';
		let nowadate = new Date();
		nowadate = nowadate.getTime();
		// fetch(`${url}/login/cellphone?phone=${phone}&password=${password}&timestamp=${nowadate}`).then(data =>{
		// 	console.log(data.json())
		// },()=>{
		// 	console.log('err')
		// }).then(
			fetch(`${url}/banner`).then(res =>{
				return res.json()
				//maxlength = data.banners.length
			},()=>{
				console.log('err1')
			}).then(json =>{
				banner = json.banners;
				maxlength = json.banners.length-1;
			})
		// )
	}
	
	handlePointClick(id){
		i = id;
		this.setState({
			fadeInOut:fadeIn,
			viewpageimg:banner[i].picUrl,
			bgcolor:banner[i].backgroundUrl,
			flag:3
		})
		console.log(i)
	}

	handleRightClick(){
		if(i == maxlength)
			i=0;
		else{
			i+=1;
		}
		this.setState({
			fadeInOut:fadeIn,
			viewpageimg:banner[i].picUrl,
			bgcolor:banner[i].backgroundUrl,
			flag:3
		})

	}

	handleLeftClick(){

		if(i == 0){
			i = maxlength;
		}
		else
			i-=1;
		this.setState({
			fadeInOut:fadeIn,
			viewpageimg:banner[i].picUrl,
			bgcolor:banner[i].backgroundUrl,
			flag:3
		})

	}

	

	componentDidMount() {
		this.timeId = setInterval(
		i=>this.showfade(), 1000)
	
  	}
    componentWillUnmount() {
    	clearInterval(this.timeId)
  	}
  	showfade(){
  		console.log(i);	
  		switch(this.state.flag){
			case 1:
	    		this.fadein();  		
	    		break;
	    	case 2:
	    		this.fadeout();
	    		break;
	    	case 3:
	    		this.tick().then(
	    			clearInterval(this.timeId)).then(
						setTimeout(()=>{
							this.timeId = setInterval(
							i=>this.showfade(), 1000)
						}, 3000)
	    		);
	    		break;
		}
  	}
	fadein() {
		return new Promise((resolve,reject)=>{
			this.setState({
			fadeInOut:fadeIn,
			viewpageimg:banner[i].picUrl,
			bgcolor:banner[i].backgroundUrl,
			flag:3
			})
		}).then(()=>{
				i == maxlength ? i=0 : i++;
		})
	}

	fadeout(){
		this.setState({
			fadeInOut:fadeOut,
			flag:1
		})
	}

    tick() {
		return new Promise((resolve,reject)=>{
			this.setState({
			fadeInOut:fadeOver,
			flag:2
			})
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
						<a hidefocus="true" href="javascript:void(0)" className="viewPageL" onClick={e=>{this.handleLeftClick()}}>&lt;</a>	
						<a hidefocus="true" href="javascript:void(0)" className="viewPageR" onClick={e=>{this.handleRightClick()}}>&gt;</a>
						<div className="viewpagePointlist">
						{
							banner.map((item,index)=>(
								<ViewpagePoint key={index} pointid={i} dataIndex={index} onClick={e=>{this.handlePointClick(index)}}  />
							))
						}
						</div>	
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

const ViewpagePoint = ({onClick, pointid, dataIndex}) => (
	<a hidefocus="true" href="javascript:void(0)" className="viewpagePoint" onClick={onClick} style={{ backgroundPosition: dataIndex == pointid ? '-16px -343px' : '3px -343px'}}></a>
)

class Lcontent extends Component{	
	constructor(props){
		super(props)
	};
	render(){
		return (
			<div className="LConMain">
				<div>
					<div>
						<div className="LConNavi">
							<a href="#" className="LCNaviTitle">热门推荐</a>
							<div className="LCNaviTab">
								{
									lcnaviTab.map(item =>(
										<LCNaviTab key={item.id} item={item} />
									))
								}						
							</div>
							<span className="more" >
									<a hidefocus="true" href="javascript:void(0)" className="LCNavioption">更多</a>	
									<i className="moregt">&nbsp;</i>
							</span>	
						</div>	
						<div>
							
						</div>
					</div>
				</div>
			</div>
		)	
	}
}

const LCNaviTab = ({onClick, item}) => (
	<div style={{display:'inline'}}>
	<a hidefocus="true" href="javascript:void(0)" className="LCNavioption" onClick={onClick}>{item.text}</a>
	<span className="line" style={{display:item.id == 5 ? 'none': 'inline'}}>|</span>
	</div>
)

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
	<div style={{ width:'100%', backgroundColor:'#fff', position:'absolute',marginTop:'440px'}}>
		<div style={{border:'1px solid #d3d3d3', borderWidth:'0 1px', width:'980px',minHeight:'700px', margin:'0 auto'}}>
			<div style={{float:'left',width:'100%',marginRight:'-250px'}}>
			<Lcontent />
			<Rcontent />
			</div>
		</div>
	</div>
)



const Viewpagecontent = () => (
  <div style={{position:'absolute',marginTop:'105px',width:"100%"}}>
  	<Viewpage />
  </div>
)

export {Viewpagecontent,Maincontent}