import React, { Component } from 'react'
import './componetsCss/163content.css'
import { connect } from 'react-redux'
import { mapcurrentTime,store } from '../store/store'
import { processdrop,volumedrag,songclick,songlistclose,songlistopen } from './../action/action'


//const url = 'https://alexthrone.top:3389';
const url = 'http://localhost:3001'
let nowadate = new Date();
nowadate = nowadate.getTime();
let i = 0;
let banner = [];
let maxlength = 0;

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

async function fetchPicture(newurl){
	try{
		let res = await fetch(`${url}${newurl}`,{withCredentials: true});
		return res.json()
	}catch(e){
		console.log(`err in fetch ${newurl}`)
	}
}

class Viewpage extends Component{
	constructor(props){
		super(props);
		this.state = {
			viewpageimg:'',
			bgcolor:'',
			fadeInOut:fadeOver,
			flag:2,
			dir:1
		};
		this.handlePointClick = this.handlePointClick.bind(this);
		this.handleLeftClick = this.handleLeftClick.bind(this);
		this.handleRightClick = this.handleRightClick.bind(this)
	};

	componentWillMount() {
		let viewPage = fetchPicture('/banner').then(res =>{
			banner = res.banners;
			maxlength = res.banners.length-1;
			for(let i = 0; i< maxlength+1;i++){
				viewPage[i] = new Image();
				viewPage[i].src = banner[i].picUrl
			}
			this.setState({
				fadeInOut:fadeIn,
				viewpageimg:banner[i].picUrl ? banner[i].picUrl : banner[0].picUrl,
				bgcolor:banner[i].backgroundUrl ? banner[i].backgroundUrl : banner[0].backgroundUrl,
				url:banner[i].url ? banner[i].url : banner[0].url,
				flag:1
			})
		});
	}

	handlePointClick(id){
		i = id;
		this.setState({
			fadeInOut:fadeIn,
			viewpageimg:banner[i].picUrl,
			bgcolor:banner[i].backgroundUrl,
			url:banner[i].url,
			flag:3
		})
	}

	handleRightClick(){
		clearInterval()
		this.setState({
			flag:2
		},()=>{
		this.showfade()
		})

	}

	handleLeftClick(){
		clearInterval(this.timeId)
		this.setState({
			dir:-1,
			flag:2
		},()=>{
		this.showfade()
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
  		clearInterval(this.timeId)
  		switch(this.state.flag){
			case 1:
	    		this.fadein().then(
						this.timeId = setTimeout(()=>{
							this.showfade()
						}, 1000)
	    		);		
	    		break;
	    	case 2:
	    		this.fadeout().then(
						this.timeId = setTimeout(()=>{
							this.showfade()
						}, 1000)
	    		);  
	    		break;
	    	case 3:
	    		this.tick().then(
						this.timeId = setTimeout(()=>{
							this.showfade()
						}, 3000)
	    		);
	    		break;
	    	default: 
	    		console.log("err")
	    		break;
		}
  	}
	fadein() {
		return new Promise((resolve,reject)=>{
			this.setState({
			fadeInOut:fadeIn,
			viewpageimg:banner[i].picUrl,
			bgcolor:banner[i].backgroundUrl,
			url:banner[i].url,
			flag:3
			})
		})
	}

	fadeout(){
		if(this.state.dir>0){
    		i === maxlength ? i=0 : i++
    		return new Promise((resolve,reject)=>{
				this.setState({
					fadeInOut:fadeOut,
					flag:1
				})
			})
    	}else{
    		i === 0 ? i = maxlength : i--
    		return new Promise((resolve,reject)=>{
				this.setState({
					fadeInOut:fadeOut,
					flag:1,
					dir:1
				})
			})
    	}
		
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
						<a className="logoAtag" hidefocus="true" href={this.state.url} >
						<img src={this.state.viewpageimg} style={this.state.fadeInOut} width="731" height="336" alt="" />
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
	<a hidefocus="true" href="javascript:void(0)" className="viewpagePoint" onClick={onClick} style={{ backgroundPosition: dataIndex === pointid ? '-16px -343px' : '3px -343px'}}></a>
)

class Lcontent extends Component{	
	constructor(props){
		super(props)
		this.state = {
			content:[],
			singer:[]

		}
	};

	componentWillMount(){
		fetchPicture(`/top/playlist?limit=8&order=hot?timestamp=${nowadate}`).then(res =>{
			let playlist = res.playlists;
			let content = [];
			for(let i = 0;i<res.playlists.length;i++){
				content[i]  = new Image();
				content[i].src  = playlist[i].coverImgUrl
				content[i].name = playlist[i].name
				content[i].hot = playlist[i].trackCount
				this.setState({
					content:content
				})
			}
		})	
	}

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
						<ul className="LCcontent">
							{
								this.state.content.map((item,index) =>(
									<LCcontentItem key={index} item={item} />
								))
							}
						</ul>
					</div>
				</div>
			</div>
		)	
	}
}

const LCNaviTab = ({onClick, item}) => (
	<div style={{display:'inline'}}>
		<a hidefocus="true" href="javascript:void(0)" className="LCNavioption" onClick={onClick}>{item.text}</a>
		<span className="line" style={{display:item.id === 5 ? 'none': 'inline'}}>|</span>
	</div>
)

const LCcontentItem = ({item}) =>(

	<li className="LContentli">
		<div className="LContentitem">
			<img src={item.src} width="140" height="140" alt=""/>
			<a title={item.name} className="itemClick"></a>
			<div className="LCIbottom">
				<a className="bottomIcon"></a>
				<span className="icon-headset"></span>
				<span className="ns">{item.hot}万</span>
			</div>
		</div>
		<p className="LCname"><a>{item.name}</a></p>
	</li>
)

const RCloginConfirm = () => (
	<div className="RCloginconf">
		<div style={{margin:'20px 20px'}}>
			<p style={{width:'205px', lineHeight:'22px',color:'#666'}}>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
		</div>
		<a className="lgcf-btn">用户登录</a>
	</div>

)

const Rcontent = () =>(
	<div className="RCcontent">
		<RCloginConfirm />
		<RCsinger />
		<Applyformusician />
	</div>
)


const Maincontent = () => (
	<div id="maincontent" style={{ width:'100%', backgroundColor:'#f5f5f5', position:'absolute',marginTop:'440px'}}>
		<div className="maincontent" >
			<div style={{float:'left',width:'100%',marginRight:'-250px', position:'relative'}}>
				<Lcontent />
				<NewAlbum />
				<Songlist />
			</div>
			<div className="RCborder">
				<Rcontent />
			</div>
		</div>
	</div>
)

class RCsinger extends Component{
	constructor(props){
		super(props);
		this.state={
			singer:[]
		}
	};

	componentWillMount(){
		let singer =[]
		fetchPicture('/artist/list?cat=5001&limit=5').then(res =>{	
			for(let i = 0;i<res.artists.length;i++){
				let info = {
					nickname:res.artists[i].name,
					iconUrl:res.artists[i].img1v1Url
				}
				singer.push(info)
			}
			this.setState({
				singer:singer
			})
		})
	}
	
	render() {
		return (
			<div className="Rsg-navi">
				<h3 className="Rsg-navict">
					<span style={{float:'left', fontWeight:'bold'}}>入驻歌手</span>
					<a className="Rsg-sm">查看全部 &gt;</a>
				</h3>
				<ul className="Rsg-list">
					{
						this.state.singer.map((item,index) =>(
							<Getsinger key={item.nickname} {...item} />
						)) 
					} 
				</ul>	
			</div>
		);
	}
}

const Getsinger = item =>(
	<li>
		<a className="sg-item" href="#">
			<div className="sg-icon">
				<img className="sg-icon" src={item.iconUrl} width="" height="" alt="" />
			</div>
			<div className="sg-info">
				<h4>
					<span className="sg-id">{item.nickname}</span>
				</h4>
				<p className="sg-name">音乐人</p>
			</div>
		</a>
	</li>
)

const Applyformusician = () =>(
	<div>
		<a hidefocus="true" className="apply-button"><i>申请成为网易音乐人</i></a>
	</div>
)





const NewAlbum = () =>(
	<div className="LConMain">
		<div>
			<div>
				<div className="LConNavi">
					<a href="#" className="LCNaviTitle">新碟上架</a>
					<span className="more" >
							<a hidefocus="true" href="javascript:void(0)" className="LCNavioption">更多</a>	
							<i className="moregt">&nbsp;</i>
					</span>	
				</div>	
			</div>
			<div className="newalbum">
				<div className="NAinner">
					<Albumlist />
				</div>
			</div>
		</div>
	</div>
)

class Albumlist extends Component{
	constructor(props){
		super(props)
		this.state={
			Album:[],
			coord:-645,
			disabled:'false',
			dir:'',
			display:'visible'
		}

		this.handleLeftClick = this.handleLeftClick.bind(this)
		this.handleRightClick = this.handleRightClick.bind(this)
		this.onTransitionEnd = this.onTransitionEnd.bind(this)
	};

	componentWillMount(){
		let Album =[]
		let imgs = []
		fetchPicture('/top/album?offset=0&limit=10').then(res =>{	
			for(let i = 0;i<res.albums.length;i++){
				let info = {
					singername:res.albums[i].artist.name,
					alumname:res.albums[i].name,
					iconUrl:res.albums[i].picUrl
				}
				let img = new Image();
				img.src = info.iconUrl;
				Album.push(info)
			}
			Album.push(Album[0],Album[1],Album[2],Album[3],Album[4])
			this.setState({
				Album:Album
			})
		})
	}

	componentDidMount(){
		setTimeout(this.setState({
			display:'hidden'
		}), 2000)
	}

	handleLeftClick(){
		let coord = this.state.coord;
		let disabled = this.state.disabled
		if(disabled !== 'disabled'){
			coord+=645
			const moveLeft = 'left 1s ease-out 0s'
			this.setState({
				move:moveLeft,
				coord:coord,
				dir:'Left',
				disabled:'disabled'
			})
		}

	}	
	
	handleRightClick(){
		let coord = this.state.coord;
		let disabled = this.state.disabled
		if(disabled !== 'disabled'){
			coord-=645
			const moveLeft = 'left 1s ease-out 0s'
			this.setState({
				move:moveLeft,
				coord:coord,
				dir:'right',
				disabled:'disabled'
			})
		}
	}

	onTransitionEnd(){
		const nomove = 'none'
		let coord = this.state.coord;
		let list = this.state.Album;	
		if(this.state.dir === "right"){
			coord+=645
			list.splice(list.length,0,list[5],list[6],list[7],list[8],list[9])
			list.splice(0,5)
		}else{
			coord-=645
			list.splice(0,0,list[5],list[6],list[7],list[8],list[9])
			list.splice(10,5)
		}
			this.setState({
				Album:list,	
				coord:coord,
				move:nomove,
				disabled:'false'
		})	
	}

	render(){
		if(this.state.Album === []){
			return <div></div>
		}
		else
		return (
			<div>				
				<div className="albcontainer" style={{overflow:this.state.display}}>
					<ul style={{transition:`${this.state.move}`,left:`${this.state.coord}px`,transform: 'translateZ(0)'}} onTransitionEnd={this.onTransitionEnd} ref="albumlist" className="alb-list">
						{
							this.state.Album.map((data,index)=>(
								<Albumitem key={index} {...data} />
							))	
						}
					</ul>
				</div>
				<a onClick={this.handleLeftClick}  hidefocus="true" className="Albumleft"></a>
				<a onClick={this.handleRightClick} hidefocus="true" className="Albumright"></a>
			</div>
		)
	}
}

const Albumitem = data => (
	<li className="albumitem"> 
		<div className="itembgimg">
			<img src={data.iconUrl} width="100" height="100" alt=""/>
			<a hidefocus="true" className="ablock">{data.singername}</a>
		</div>
		<p className='albumname'>{data.alumname}</p>
	</li>
)

const Songlist = () =>(
	<div className="LConMain">
		<div>
			<div>
				<div className="LConNavi">
					<a href="#" className="LCNaviTitle">榜单</a>
					<span className="more" >
							<a hidefocus="true" href="javascript:void(0)" className="LCNavioption">更多</a>	
							<i className="moregt">&nbsp;</i>
					</span>	
				</div>	
			</div>
			<div className="song-list">
				<Getsonglist />
			</div>
		</div>
	</div>
)

class Getsonglist extends Component{
	constructor(props){
		super(props)
		this.state={
			list1:[],
			list2:[],
			list3:[]
		}
	};

	componentWillMount(){
		let list1 = []
		let list2 = []
		let list3 = []
		Promise.all([fetchPicture('/top/list?idx=3'),fetchPicture('/top/list?idx=2'),fetchPicture('/top/list?idx=0')])
		.then( value =>{
			list1 = this.getlist(value[0],list1)
			list2 = this.getlist(value[1],list2)
			list3 = this.getlist(value[2],list3)
			this.setState({
				list1:list1,
				list2:list2,
				list3:list3
			})
		})
	}

	getlist(res,list){
		let firstinfo = {
			img:res.playlist.coverImgUrl+'?param=100y100',
			name:res.playlist.name
		}
		list.push(firstinfo)
		list[1] = []
		for(let i = 1;i<11;i++){
			let info = {
				singername:res.playlist.tracks[i].name,
				id:res.playlist.tracks[i].id,
			}
			list[1].push(info)
		}
		return list
	}

	render(){
		if(typeof(this.state.list1[0]) !== 'undefined')
		return(
			<div>
				<div className="songlist-part slpartpadding">
					<div className="songlist-header">
						<div className="listiocn">
							<img src={this.state.list1[0].img} width="80" height="80" alt=""/>
							<a hidefocus="true" className="listiocn-click" title={this.state.list1[0].name}></a>
						</div>
						<div className="list-text">
							<h3 className="list-name">{this.state.list1[0].name}</h3>
							<a hidefocus="true" className="listen-button"></a>
							<a hidefocus="true" className="add-button"></a>
						</div>
					</div>
					<ul>
						{
							this.state.list1[1].map((item,index) =>(
								<Songitem key={index} item={item} index={index+1} />
							))
						}
						<li className="item-findmore">
							<a hidefocus="true" className="findmore">查看更多&gt;</a>
						</li>
					</ul>
				</div>
				<div className="songlist-part slpartpadding1">
					<div className="songlist-header">
						<div className="listiocn">
							<img src={this.state.list2[0].img} width="80" height="80" alt=""/>
							<a hidefocus="true" className="listiocn-click" title={this.state.list2[0].name}></a>
						</div>
						<div className="list-text">
							<h3 className="list-name">{this.state.list2[0].name}</h3>
							<a hidefocus="true" className="listen-button"></a>
							<a hidefocus="true" className="add-button"></a>
						</div>
					</div>
					<ul>
						{
							this.state.list2[1].map((item,index) =>(
								<Songitem key={index} item={item} index={index+1} />
							))
						}
						<li className="item-findmore">
							<a hidefocus="true" className="findmore">查看更多&gt;</a>
						</li>
					</ul>
				</div>
				<div className="songlist-part slpartpadding1">
					<div className="songlist-header">
						<div className="listiocn">
							<img src={this.state.list3[0].img} width="80" height="80" alt=""/>
							<a hidefocus="true" className="listiocn-click" title={this.state.list3[0].name}></a>
						</div>
						<div className="list-text">
							<h3 className="list-name">{this.state.list3[0].name}</h3>
							<a hidefocus="true" className="listen-button"></a>
							<a hidefocus="true" className="add-button"></a>
						</div>
					</div>
					<ul>
						{
							this.state.list3[1].map((item,index) =>(
								<Songitem key={index} item={item} index={index+1} />
							))
						}
						<li className="item-findmore">
							<a hidefocus="true" className="findmore">查看更多&gt;</a>
						</li>
					</ul>
				</div>
			</div>
		)
		return(
			<div></div>
		)
	}
}

const Songitem = ({index,item}) => (
	<li className="single-item">
		<span className="item-num" style={{color: index >3 ? '#666' : '#c10d0c'}}>{index}</span>
		<a hidefocus="true" className="item-name" href={`${url}${item.id}`}>{item.singername}</a>
		<div className="item-icon">
			<a hidefocus="true" className="item play" href={`${url}${item.id}`}></a>
			<a hidefocus="true" className="item add" ></a>
			<a hidefocus="true" className="item like" ></a>
		</div>
	</li>
)


const Viewpagecontent = () => (
  <div style={{position:'absolute',marginTop:'105px',width:"100%"}}>
  	<Viewpage />
  </div>
)

class MusicBarContain extends Component{
	constructor(props){
		super(props)
		this.state={
			bottom:0,
			lock:'on',
			className:'MB-lockclick'
		}
		
		this.handleLockClick = this.handleLockClick.bind(this)
		this.handleonMouseOver = this.handleonMouseOver.bind(this)
		this.handleonMouseOut = this.handleonMouseOut.bind(this)
	};

	componentWillUnmount(){

	}

	handleonMouseOut(){
		if(this.state.lock !== 'on')
		this.setState({
			bottom:-45
		})
	}

	handleonMouseOver(){
		this.setState({
			bottom:0
		})
	}

	handleLockClick(){
		if(this.state.lock === 'off')
			this.setState({
				lock:'on',
				className:'MB-lockclick'
			})
		else
			this.setState({
				lock:'off',
				className:'MB-unlockclick'
			})
	}

	render(){
		return(
			<div onMouseOver={this.handleonMouseOver} onMouseOut={this.handleonMouseOut} style={{bottom:this.state.bottom}} className="MB-container">
				<div className="MB-maincontain">
					<div className="MB-touchbar"></div>
					<div className="MB-main">
						<MusicBarMaintain  />
					</div>
					<div className="MB-lockbutton"> 
						<a hidefocus="true" style={{backgroundPosition:this.state.bgposition}} onClick={this.handleLockClick} className={this.state.className} ></a>
					</div>
				</div>
			</div>
		)
	}
}

class MusicBarMaintain extends Component{
	constructor(props){
		super(props)
		this.state={
			iteminfo:[{
					name:'',
					singername:'',
					url:'',
					iconUrl:''
				}],
			status:'pause',
			playways:'ordinal',
			waysinfo:'循环',
			display:'none',
			listvisible:'hidden',
			Voldisplay:'none',
			id:0,
			currentTime:0,
			bufferedTime:0,
			targetTime:1,
			passedtime:{
				min:this.numfix(0,2),
				sec:this.numfix(0,2)
			},
			endtime:{
				min:this.numfix(0,2),
				sec:this.numfix(0,2)
			}
		}

		this.handlePlayClick = this.handlePlayClick.bind(this)
		this.handlePastClick = this.handlePastClick.bind(this)
		this.handleNextClick = this.handleNextClick.bind(this)
		this.handleEnded = this.handleEnded.bind(this)
		this.handleDirClick = this.handleDirClick.bind(this)
		this.handleVolClick = this.handleVolClick.bind(this)
		this.handleListButtonClick = this.handleListButtonClick.bind(this)
	};

	componentWillMount(){
		let iteminfo = []
		fetchPicture('/playlist/detail?id=84593826').then(res =>{
			let musiclist = res.playlist.tracks
			for(let i = 0;i<musiclist.length;i++){
				let time = Math.floor(musiclist[i].dt/1000)
				let item = {
					name:musiclist[i].name,
					singername:musiclist[i].ar[0].name,
					id:i,
					url:'http://music.163.com/song/media/outer/url?id='+ musiclist[i].id +'.mp3',
					iconUrl:musiclist[i].al.picUrl,
					min:this.numfix(parseInt(parseInt(time)/60),2),
					sec:this.numfix(parseInt(time)%60,2)
				}
				iteminfo.push(item)
			}
			this.setState({
				iteminfo:iteminfo
			})
		})
	}

	handlePlayClick(){
		let audio = this.refs.audio;
		if(this.state.status === 'play'){
			audio.pause();
			clearInterval(this.timeId)
			this.setState({
				status:'pause'
			})
		}
			
		else{
			audio.play();
			this.timeId = setInterval(
				()=>{this.musicBarLength()},300
			)
			this.setState({
				status:'play'
			})
		}
	}

	handlePastClick(){
		let audio = this.refs.audio;
		let status = this.state.status
		audio.pause();
		if(this.state.id === 0){
			this.setState({
				id:this.state.iteminfo.length-1
			},()=>{
				this.musicBarLength()
				status === 'play' ? audio.play() : 0;
			})
		}else
			this.setState({
				id:this.state.id-1
			},()=>{
				this.musicBarLength()
				status === 'play' ? audio.play() : 0;
			})
	}

	handleNextClick(){
		let audio = this.refs.audio;
		let status = this.state.status
		audio.pause();
		if(this.state.id === this.state.iteminfo.length-1){
			this.setState({
				id:0
			},()=>{
				this.musicBarLength()
				status === 'play' ? audio.play() : 0;
			})
		}else
			this.setState({
				id:this.state.id+1
			},()=>{
				this.musicBarLength()
				status === 'play' ? audio.play() : 0;
			})
	}

	handleDirClick(){
		if(this.state.display === 'block'){
			let promise = new Promise((res,rej) =>{
				clearInterval(this.timeId)
			}).then(
				this.timeId = setTimeout(()=>{
					this.setState({
						display:'none'
					})
				},2000)
			)
		}else{
			let promise = new Promise((res,rej) =>{
				this.setState({
					display:'block'
				})
			}).then(
				this.timeId = setTimeout(()=>{
					this.setState({
						display:'none'
					})
				},2000)
			);
		}
		switch(this.state.playways){
			case 'ordinal':
				this.setState({
					playways:'random',
					waysinfo:'随机'
				})
				break;
			case 'random':
				this.setState({
					playways:'singleloop',
					waysinfo:'单曲循环'
				})
				break;
			case 'singleloop':
				this.setState({
					playways:'ordinal',
					waysinfo:'循环'
				})
				break;
			default:
				console.log('err')
		}
	}

	handleVolClick(e){
		if(this.state.Voldisplay === 'none'){
			this.setState({
				Voldisplay:'block'
			})
			document.getElementById('maincontent')
			.addEventListener('click',this.handleVolhidden);
		}	
		else
			this.handleVolhidden();
	}

	handleVolhidden = (e) => {
		this.setState({
			Voldisplay:'none'
		})
	}

	handleListhidden = (e) =>{
		let dispatch = this.props.dispatch;
		dispatch(songlistclose())
	}

	handleListButtonClick(e){
		let dispatch = this.props.dispatch;
		if(this.state.listvisible === 'hidden'){
			dispatch(songlistopen())
			document.getElementById('maincontent')
			.addEventListener('click',this.handleListhidden)
		}
		else
			dispatch(songlistclose())
	}

	componentDidMount(){
		let audio = this.refs.audio
		audio.volume = 0.5;
		
	}

	componentWillUnmount(){
		clearInterval(this.timeId)
		document.getElementById('maincontent')
		.removeEventListener('click',this.handleListhidden);
		document.getElementById('maincontent')
		.removeEventListener('click',this.handleVolhidden)
	}

	musicBarLength(){
		let audio = this.refs.audio;
		let targetTime = audio.buffered.length===0 ? 0 : parseInt(audio.buffered.end(0))
		let duration =  isNaN(parseInt(audio.duration)) ? 0 : parseInt(audio.duration)
		this.setState({
			currentTime:audio.currentTime,
			bufferedTime:targetTime,
			targetTime:duration,
			passedtime:{
				min:this.numfix(parseInt(parseInt(audio.currentTime)/60),2),
				sec:this.numfix(parseInt(audio.currentTime)%60,2)
			},
			endtime:{
				min:this.numfix(parseInt(parseInt(audio.duration)/60),2),
				sec:this.numfix(parseInt(audio.duration)%60,2)
			}

		})
	}

	numfix(num, length) {
		if(isNaN(num))
			num = 0
		return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
	}	

	handleEnded(){
		let audio = this.refs.audio;
		let status = this.state.status;
		audio.pause();
		switch(this.state.playways){
			case 'ordinal':
				this.setState({
					id:this.state.id+1
				},()=>{
					this.musicBarLength()
					status === 'play' ? audio.play() : 0;
				})
				break;
			case 'random':
				this.setState({
					id:Math.floor(Math.random()*this.state.iteminfo.length+1)
				},()=>{
					this.musicBarLength()
					status === 'play' ? audio.play() : 0;
				})
				break;
			case 'singleloop':
				this.setState({
					id:this.state.id
				},()=>{
					this.musicBarLength()
					status === 'play' ? audio.play() : 0;
				})
				break;
			default:
				console.log('err')
		}
		
		
	}

	componentWillReceiveProps(nextProps){
		let audio = this.refs.audio;
		if(this.props.position !==nextProps.position){
			audio.currentTime = audio.duration*nextProps.position/490
			this.musicBarLength()
		}
		
		if(this.props.volume !==nextProps.volume){
			audio.volume = (88-nextProps.volume)/88
		}

		if(this.props.songid !==nextProps.songid){
			this.setState({
				id:nextProps.songid,
				status:'pause'
			}, ()=>{
				this.handlePlayClick()
			})
		}
		if(this.state.listvisible !== nextProps.songliststatus)
			this.setState({
				listvisible:nextProps.songliststatus
			})
	}

	render(){
		return(
			<div className="MB-mbcontainer">
				<div className="MB-btns">
					<a hidefocus="true" className="MB-btn MB-before" onClick={this.handlePastClick}></a>
					<a hidefocus="true" className={this.state.status === 'play' ? "MB-btn MB-pause" : "MB-btn MB-play"} onClick={this.handlePlayClick} ></a>
					<a hidefocus="true" className="MB-btn MB-next" onClick={this.handleNextClick}></a>
					<MusicBarListContainer songinfo={this.state.iteminfo}  visibility={this.state.listvisible} />
				</div>
				<div className="MB-icon">
					<img src={this.state.iteminfo[this.state.id] ? this.state.iteminfo[this.state.id].iconUrl: ''} alt="" width="34" height="35"/>
					<a hidefocus="true" className="MB-iconclick"></a>
				</div>
				<div style={{position:'relative', marginTop:'10px',float:'left',width:'498px'}}>
					
					<MusicBarControl info={this.state.iteminfo[this.state.id]} />
					<MusicBar currentTime={this.state.currentTime} bufferedTime={this.state.bufferedTime} targetTime={this.state.targetTime} />
				</div>
				<audio onEnded={this.handleEnded} src={this.state.iteminfo[this.state.id].url}  ref="audio">
					</audio>
				<div style={{position:'relative', marginTop:'30px',float:'left',minWidth:'80px'}}>
					<span className="MB-passedtime">
						<em style={{minWidth:'31px',display:'inline-block'}}>{`${this.state.passedtime.min}:${this.state.passedtime.sec}`}</em> / <em style={{minWidth:'31px',display:'inline-block'}}>{`${this.state.endtime.min}:${this.state.endtime.sec}`}</em>
					</span>
				</div>
							<div style={{position:'relative', margin:'16px 0 0 35px',float:'left'}}>
					<a hidefocus="true" className="MB-addtolist"></a>
					<a hidefocus="true" className="MB-share" ></a>
					<div className="MB-controlbuttons">
						<div style={{display:this.state.display}} className="MB-direminder">{this.state.waysinfo}</div>				
						<a hidefocus="true" onClick={this.handleVolClick} className="MB-volumeicon" ></a>
						<a hidefocus="true" onClick={this.handleDirClick} className={'MB-playdir MB-'+this.state.playways} ></a>
						<span className="MB-lists">
							<span></span>
							<a hidefocus="true" onClick={this.handleListButtonClick} className="MB-listbutton" >{this.state.iteminfo.length}</a>
						</span>
						<VolumeBar visible={this.state.Voldisplay} />
				</div>
				</div>
			</div>
		)
	}
}

MusicBarMaintain = connect(mapcurrentTime)(MusicBarMaintain)

class MusicBarListContainer extends Component{
	constructor(props){
		super(props)
		this.state={
			songinfo:[],
			visibility:'hidden'
		}
	}

	componentWillReceiveProps(nextProps){
		if(this.props.songinfo !== nextProps.songinfo)
			this.setState({
				songinfo:nextProps.songinfo
			})
		if(this.props.visibility !== nextProps.visibility)
			this.setState({
				visibility:nextProps.visibility
			})
	}

	shouldComponentUpdate(nextState){
		if(this.state.visibility ==='hidden' && nextState.visibility === 'hidden')
			return false
		else
			return true
	}


	render() {
		return (
			<div style={{visibility:this.state.visibility}}>
				<MusicBarList songinfo={this.state.songinfo} />
			</div>
		);
	}
}

class MusicBarControl extends Component{
	constructor(props){
		super(props)
		this.state={
			name:'',
			singername:''
		}
	}
	
	componentWillReceiveProps(nextProps){	
		if(this.props.info.name !== nextProps.info.name || this.props.info.singername !== nextProps.info.singername){
			this.setState({
				name:nextProps.info.name,
				singername:nextProps.info.singername
			})
		}
			
	}

	render(){
		return(
			<div className="MB-songinfo">
				<a hidefocus="true" className="MB-songname">{this.state.name}</a>
				<a hidefocus="true" className="MB-songmv"></a>
				<span className="MB-restinfo">
					<a hidefocus="true" className="MB-singername">{this.state.singername}</a>
					<a hidefocus="true" className="MB-recommand"></a>
				</span>
			</div>
		)
	}
}

class MusicBar extends Component{
	constructor(props){
		super(props)
		this.state={
			current:0,
			buffered:0,
			onhold:0
		}
		this.handleMouseDown = this.handleMouseDown.bind(this)
		this.handleBarClick = this.handleBarClick.bind(this)
	}

	componentWillReceiveProps(nextProps){
		if(this.state.onhold !== 1){
			let current = 490*nextProps.currentTime/nextProps.targetTime;
			let buffered = 490*nextProps.bufferedTime/nextProps.targetTime
			this.setState({
				current:isNaN(current) ? 0 : current,
				buffered: isNaN(buffered) ? 0 : buffered
			})
		}
	}


	handleBarClick(e){
		let X = e.clientX;
		let musicbar = this.refs.musicbar
		let baseX = musicbar.getBoundingClientRect().left
		store.dispatch(processdrop(X-baseX))
		this.setState({
			current:X-baseX
		})
	}

	handleMouseDown(e){
		this.setState({
			onhold:1
		})
		let musicbar = this.refs.musicbar
		let baseX = musicbar.getBoundingClientRect().left
		document.onmousemove = e =>{
			let X = e.clientX;
			this.setState({
				current:X-baseX
			})
		}
		document.onmouseup = e =>{
			let X = e.clientX;
			store.dispatch(processdrop(X-baseX))
			this.setState({
				onhold:0
			},()=>{
				document.onmousemove = null;
				document.onmouseup = null;
			})

		}
	}


	render(){
		return(
			<div onClick={this.handleBarClick} ref="musicbar" className="MB-musicbar">
				<div style={{width:this.state.current}} className="MB-mbpassed">	
				</div>
					<div className="MB-mbuttoncontainer">
					<span onMouseDown={this.handleMouseDown} className="MB-mbutton"><i className="MB-mbuttonloading"></i></span>
				</div>
				<div style={{width:this.state.buffered}} className="MB-mbdownloaded">					
				</div>
			</div>			
		)
	}
}

class VolumeBar extends Component{
	constructor(props){
		super(props)
		this.state={
			volume:44
		}

		this.handleMouseDown = this.handleMouseDown.bind(this)
	}

	handleMouseDown(e){
		let volumebar = this.refs.volumebar
		let baseY = volumebar.getBoundingClientRect().top
		document.onmousemove = e =>{
			e=e||window.event;
			let Y = e.clientY;
			let volume = Y-baseY-12
			volume = volume > 88 ? 88 : volume;
			volume = volume < 0 ? 0 : volume;
			this.setState({
				volume: volume
			})
			store.dispatch(volumedrag(volume))
		}
		document.onmouseup = e =>{		
			document.onmousemove = null;
			document.onmouseup = null;
		}
	}

	render() {
		return (
			<div style={{display:this.props.visible}} ref="volumebar" className="MB-VolBar">
				<span onMouseDown={this.handleMouseDown} style={{marginTop:5+this.state.volume+'px'}} className="MB-Vbutton"></span>
				<div  style={{height:88-this.state.volume+'px'}} className="MB-Volume">
				</div>			
			</div>	
		);
	}
}

const MusicBarList = songinfo => (
	<div className="MB-listcontainer">
		<MBListHeader {...songinfo} />
		<MBListBody  {...songinfo} />
	</div>
)


class MBListHeader extends Component{
	constructor(props){
		super(props)
	}

	render() {
		return (
			<div className="MB-listheader">
					<div style={{position:'relative',height:'41px'}}>
						<div className="MB-headerpart1">
							<h4 className="MB-part1">播放列表({this.props.songinfo.length !== 1 ? this.props.songinfo.length:0})</h4>	
						</div>
						<a hidefocus="true" className="MB-part2">
						<span className="MB-part2icon"></span>
						收藏全部
						</a>
						<span className="MB-line"></span>
						<a hidefocus="true" className="MB-part3">
						<span className="MB-part3icon"></span>
						清除
						</a>
						<p className="MB-part4">asdqadads</p>
						<span onClick={e =>{store.dispatch(songlistclose())}} className="MB-part4icon"></span>
					</div>
			</div>
		);
	}
}

class MBListBody extends Component{
	constructor(props){
		super(props)
		this.state={
			scroll:0,
			scrollbarheight:260,
			scrollbar1scroll:0
		}
		this.handleScroll = this.handleScroll.bind(this);
 		this.handleOnMouseDown = this.handleOnMouseDown.bind(this)
	}

	handleScroll(e){	
		document.onwheel = e =>{
			let songlist = this.refs.songlist;
			let scrollbar1 = this.refs.scrollbar1;
			let scrolldistance = 10;
			let scrollbardistance = scrolldistance*(260-scrollbar1.offsetHeight)/(songlist.offsetHeight-260)
			if(e.deltaY>0){
			this.setState({
				scroll:this.state.scroll-scrolldistance+(songlist.offsetHeight-260)<= 0 ? (260-songlist.offsetHeight) : this.state.scroll-scrolldistance,
				scrollbar1scroll:this.state.scrollbar1scroll+scrollbardistance >= (260-scrollbar1.offsetHeight) ? (260-scrollbar1.offsetHeight) : this.state.scrollbar1scroll+scrollbardistance
			})
			}else{
			this.setState({
				scroll:this.state.scroll+scrolldistance >=0 ? 0 : this.state.scroll+scrolldistance,
				scrollbar1scroll:this.state.scrollbar1scroll-scrollbardistance <=0 ? 0 : this.state.scrollbar1scroll-scrollbardistance
			})
			}
		}
		document.onmouseout = e =>{		
			document.onwheel = null;
		}
	}

	handleOnMouseDown(e){
		
	}

	//visible area height is 260px
	componentWillReceiveProps(nextProps){
		if(this.props.songinfo.length !==nextProps.songinfo.length){
			let scrollbarheight = 260*260/(nextProps.songinfo.length*28);
			this.setState({
				scrollbarheight:scrollbarheight
			})
		}
	}

	render() {
		return (
			<div className="MB-listbody">
				<img src="//music.163.com/api/img/blur/7783442814172824" alt="" className="MB-listbgimg" width="980" height="980"/>
				<div className="MB-listpart1bg"></div>
				<div className="MB-listpart1body">
					<ul onMouseOver={this.handleScroll} ref="songlist" style={{color:"#ccc",overflow:"hidden",position:"absolute",top:this.state.scroll}}>
						{
							this.props.songinfo.map((item,index) =>(
								<MBListItem key={index} name={item.name} singername={item.singername} id={item.id} min={item.min} sec={item.sec} />
							))
						}
					</ul>
				</div>
				<div className="MB-listscrollbar1">
					<span className="MB-scrollbar1button" onMouseDown={this.handleOnMouseDown} ref="scrollbar1" style={{height:this.state.scrollbarheight,top:this.state.scrollbar1scroll}}></span>
				</div>
				<div className="MB-listpart2bg"></div>
				<MBLyrics />
				<div className="MB-listscrollbar2">
					<span className="MB-scrollbar2button"></span>
				</div>
			</div>
		);
	}
}

const MBListItem = ({name,singername,id,min,sec}) => (
	<li className="MB-listitem">
		<div className="MB-itempart1">
			<div className="MB-itempart1icon"></div>
		</div>
		<div className="MB-itempart2" onClick={e =>{
			store.dispatch(songclick(id))
		}}>{name}</div>
		<div className="MB-itempart3">
			<div className="MB-itempart3icons">
				<i className="MB-itempart3icon icn-del">删除</i>
				<i className="MB-itempart3icon icn-dl">下载</i>
				<i className="MB-itempart3icon icn-share">分享</i>
				<i className="MB-itempart3icon icn-add">收藏</i>
			</div>
		</div>
		<div className="MB-itempart4">
			<span style={{whiteSpace:'nowrap',color:'#ccc',lineHeight:'28px'}}>
				<a hidefocus="true" className="MB-part4info">{singername}</a>
				/<span style={{whiteSpace:'nowrap',color:'#ccc'}}>asdd</span>
			</span>
		</div>
		<div className="MB-itempart5">{min}:{sec}</div>
		<div className="MB-itempart6">
			<a hidefocus="true" className="MB-part6icon"></a>
		</div>
	</li>
)

class MBLyrics extends Component{
	constructor(props){
		super(props)
	}

	render() {
		return (
			<div>
				<div className="MB-ask">
					<a hidefocus="true" className="MB-askicon"></a>
				</div>
				<div className="MB-raiserror">
					<a hidefocus="true" className="">报错</a>
				</div>
				<div className="MB-lyrics">
					<Lyricsitem />
				</div>
			</div>
		);
	}
}

const Lyricsitem = () => (
	<p className="MB-lyricsitem">asdadaa</p>
)


export {Viewpagecontent,Maincontent ,MusicBarContain}