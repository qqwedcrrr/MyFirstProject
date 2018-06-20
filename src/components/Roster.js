import React, { Component } from 'react'
import usericon from './../resource/usericon.jpg'
import './componetsCss/Roster.css'
import NavBar2 from './common'
import { connect } from 'react-redux'
import {mapStateToProps,mapDispatchToProps} from '../store/store'
import Maincontent from './163content'

const navBar = {
	position:'absolute',
	left:'0',
	width:'100%',
	zIndex:'99',
	clear:'both'
}

const top = {
	position:'relative',
	zIndex:'1000',
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
	constructor(props) {
    	super(props);
	}
	render(){
		const {navClick, chooseid, id} = this.props
		return(
			<div>
				<div style={navBar}>
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
								<a><img src={usericon} width="30" height="30" />
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
				<Maincontent />
			</div>
		)
	}
}

class Navitem extends Component{
	render(){
		const {text, onClick, id,chooseid} = this.props;
		let chooseitem = null;	
		if(chooseid.id == id){
			chooseitem = {
				display:true
			}
		}
		else
			chooseitem = {
				display:false
			}
		if(chooseid.chooseid == null && id == 1)
			chooseitem = {
				display:true
			}
		return (
			<li style={{backgroundColor: chooseitem.display ? '#000' : '#242424'}}><span><a onClick={onClick}>{text}</a><sub style={{display: chooseitem.display ? "block" : "none"}} className="cor">&nbsp;</sub></span></li>
		)
	}
}

Roster = connect(
	mapStateToProps,
	mapDispatchToProps
	)(Roster)


export default Roster