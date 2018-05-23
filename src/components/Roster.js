import React, { Component } from 'react'
import usericon from './../resource/usericon.jpg'
import './componetsCss/Roster.css'
import NavBar2 from './common'

const navBar = {
	position:'absolute',
	left:'0',
	width:'100%',
	zIndex:'99'
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




class Roster extends Component {
	constructor(props) {
    	super(props);
	}
	render(){
		return(
			<div style={navBar}>
				<div style={top}>
					<div style={headerBar}>
						<h1 className="logo">
							<a className="logoAtag" hidefocus="true" href="/#">网易云音乐</a>
						</h1>
						<ul className="navlist">
							<li><span><a>发现音乐</a><sub className="cor">&nbsp;</sub></span></li>
							<li><span><a>我的音乐</a><sub className="cor">&nbsp;</sub></span></li>
							<li><span><a>朋友</a><sub className="cor">&nbsp;</sub></span></li>
							<li><span><a>商城</a><sub className="cor">&nbsp;</sub></span></li>
							<li><span><a>音乐人</a><sub className="cor">&nbsp;</sub></span></li>
							<li><span><a>下载客户端</a><sub className="cor">&nbsp;</sub></span><sub className="hot">&nbsp;</sub></li>
						</ul>
						<div className="navuser">
							<img src={usericon} width="30" height="30" />
							<a></a>
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
					<NavBar2 />
				</div>
			</div>
		)
	}
}


export default Roster