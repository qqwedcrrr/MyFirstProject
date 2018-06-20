import React, { Component } from 'react'




const nav2list = {
	first:[{
		id:1,
		text:'推荐'
		},{
		id:2,
		text:'排行榜'
		},{
		id:3,
		text:'歌单'
		},{
		id:4,
		text:'主播电台'
		},{
		id:5,
		text:'歌手'
		},{
		id:6,
		text:'新碟上架'
	}],
	second:[{
		id:1,
		text:'我的视频'
		},{
		id:2,
		text:'我创建的歌单'
		},{
		id:3,
		text:'收藏的歌单'
	}],
	third:[{
		id:1,
		text:'新朋友'
		},{
		id:2,
		text:'老朋友'
	}]
}


class Nav2item extends Component{
	render(){
		const {text} = this.props 
		return (
			<li className="nav2item"><a hidefocus="true" href="#" style={{color:'#fff', fontSize:'12px',}}><em>{text}</em></a></li> 
		)
	}
}

class NavBar2 extends Component {
	render(){
		const {chooseid} = this.props;
		let Id 
		if(chooseid == null)
			Id = "first";
		else
			Id = chooseid;
		return (
			<div className="nav2list">
				<div className="nav2main">
					<ul className="nav2ul">
						{
							nav2list[Id].map(todo =>(
								<Nav2item key={todo.id} {...todo} onClick={{javascript:void(0)}} />
							))
						}
					</ul>
				</div>
			</div>	
		)
	}
}




export default NavBar2