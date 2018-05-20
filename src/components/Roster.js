import React, { Component } from 'react'
import './componetsCss/Roster.css'

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
	borderBottom:'1px solid #000'
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
							<li><span><a>发现音乐</a></span></li>
							<li><span><a>我的音乐</a></span></li>
							<li><span><a>朋友</a></span></li>
							<li><span><a>商城</a></span></li>
							<li><span><a>音乐人</a></span></li>
							<li><span><a>下载客户端</a></span></li>
						</ul>
					</div>
				</div>
			</div>
		)
	}
}


export default Roster