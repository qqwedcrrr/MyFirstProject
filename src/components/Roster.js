import React, { Component } from 'react'
import usericon from './../resource/usericon.jpg'
import './componetsCss/Roster.css'
import NavBar2 from './common'
import { connect } from 'react-redux'
import {mapStateToProps,mapDispatchToProps,mapLoginPopOut} from '../store/store'
import { Viewpagecontent, Maincontent, MusicBarContain} from './163content'

const top = {
	position:'relative',
	zIndex:'25',
	boxSizing:'border-box',
	backgroundColor:'#242424',
}

const headerBar = {
	width:'1100px',
	margin:'0 auto',
	height:'70px'
}

const navlist = [
		{
		id:1,
		text:'发现音乐'
		},{
		id:2,
		text:'我的音乐'
		},{
		id:3,
		text:'朋友'
		},{
		id:4,
		text:'商城'
		},{
		id:5,
		text:'音乐人'
		}
]
	
class Roster extends Component {
		constructor(props){
		super(props)
		this.state={
			top:94
		}
		this.handleWheel = this.handleWheel.bind(this)
	}

	handleWheel(e){
		document.onwheel = e =>{
			let screenheight = window.innerHeight
			if(e.deltaY>0){
				this.setState({
					top:this.state.top-80 <= (screenheight-1950) ? (screenheight-1950) : this.state.top-80
				})
			}else{
				this.setState({
					top:this.state.top+80 >= 94 ? 94 : this.state.top+80
				})
			}
		}
		document.onmouseout = e =>{		
			document.onwheel = null;
		}
	}

	render(){
		const {navClick, chooseid} = this.props
		return(
			<div>
				<div onMouseOver={this.handleWheel} style={{left:'0',position:'absolute',top:this.state.top,width:'100%'}} >
					<div  style={{zIndex:'99',clear:'both',left:'0',position:'absolute',width:'100%'}}>
						<div style={top}>
						<div style={headerBar}>
							<h1 className="logo">
								<a className="logoAtag" hidefocus="true" href="/#">网易云音乐</a>
							</h1>
							<ul className="navlist">
							{
								navlist.map(item =>(
									<Navitem key={item.id} {...item} {...this.props} onClick={e =>{navClick(item.id)}} />
								))
							}
								<li><span><a>下载客户端</a><sub className="cor">&nbsp;</sub></span><sub className="hot">&nbsp;</sub></li>
							</ul>
							<div className="navuser">
								<a><img src={usericon} width="30" height="30" alt="" />
								</a>
								<i className="navusermsg">3</i>
							</div>
							<a className="navideo">视频投稿</a>
							<div className="navseach">
								<div className="navsch">
									<span className="schparent">
										<input type="text" className="schinput" />
										<label className="schtext">音乐/视频/电台/用户</label>
									</span>
								</div>
							</div>
						</div>
						<NavBar2 {...chooseid} />
						</div>
					</div>
					<div  style={{overflow:'auto', minHeight:'1700px'}}>
						<Viewpagecontent />		
						<Maincontent />			
					</div>
					
				</div>	
				<MusicBarContain />	
				<LoginForm />
			</div>				
		)
	}
}

const fadeIn = {
	transition:'opacity 0.8s ease-in 0s',
	opacity:'1',
	visibility:'visible'
}
const fadeOut = {
	transition:'opacity 0.8s ease-out 0s',
	opacity:'0.2',
	visibility:'hidden'
}
const fadeOver = {
	transition:'none',
	opacity:'1'
}

let LoginForm = ({login}) => (
	<div className="login-bg" style={login ? fadeIn : fadeOut}>
		<div className="login-container">
			<div style={{display:'table-cell',textAlign:'center'}}>
				<form style={{width:'250px', display:'inline-block'}}>
					<div className="login-input marginTop50">
						<label htmlFor="username">用户名</label>
						<input type="text"/>
					</div>
					<div className="login-input">
						<label htmlFor="password">密码</label>
						<input type="password"/>
					</div>
					<div  className="login-input">
						<button type="submit" className="login-btn">登录</button>
					</div>
				</form>
			</div>	
		</div>
	</div>
)

LoginForm = connect(mapLoginPopOut)(LoginForm)

// class App extends Component{
// 	constructor(props){
// 		super(props)
// 		this.state={
// 			top:0
// 		}
// 		this.handleWheel = this.handleWheel.bind(this)
// 	}

// 	handleWheel(e){
// 		document.onwheel = e =>{
// 			let screenheight = window.innerHeight
// 			if(e.deltaY>0){
// 				this.setState({
// 					top:this.state.top-80 <= (screenheight-2034) ? (screenheight-2034) : this.state.top-80
// 				})
// 			}else{
// 				this.setState({
// 					top:this.state.top+80 >= 0 ? 0 : this.state.top+80
// 				})
// 			}
// 		}
// 		document.onmouseout = e =>{		
// 			document.onwheel = null;
// 		}
// 	}

// 	render(){
// 		return(
// 			<div ref="mainbody" onMouseOver={this.handleWheel} style={{position:'absolute',top:this.state.top,width:'100%'}}>
//    				<Header />
//     			<Main style={{clear:'both'}} />
//   			</div>
// 		)
// 	}
// }

class Navitem extends Component{

	render(){
		const {text, onClick, id,chooseid} = this.props;
		let chooseitem = null;	
		if(chooseid.id === id){
			chooseitem = {
				display:true
			}
		}
		else
			chooseitem = {
				display:false
			}
		if(chooseid.chooseid === null && id === 1)
			chooseitem = {
				display:true
			}
		return (
			<li style={{backgroundColor: chooseitem.display ? '#000' : '#242424'}}><span><a className="navclick" onClick={onClick}>{text}</a><sub style={{display: chooseitem.display ? "block" : "none"}} className="cor">&nbsp;</sub></span></li>
		)
	}
}

Roster = connect(
	mapStateToProps,
	mapDispatchToProps
	)(Roster)


export default Roster