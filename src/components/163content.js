import React, { Component } from 'react'
import './componetsCss/163content.css'


//const url = 'http://47.97.214.91:3389';
const url = 'http://localhost:3001'
let nowadate = new Date();
nowadate = nowadate.getTime();

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
	
	let clock
	let banner = [];
	let maxlength = 0;


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
		let phone = '15656000329';
		let password = '493105923';
		let viewPage = this.fetchPicture('/banner').then(res =>{
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

	async fetchPicture(newurl){
		try{
			let res = await fetch(`${url}${newurl}?timestamp=${nowadate}`,{withCredentials: true});
			return res.json()
		}catch(e){
			console.log(`err in fetch ${newurl}`)
		}
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
		// if(i == maxlength)
		// 	i=0;
		// else{
		// 	i+=1;
		// }
		// this.setState({
		// 	fadeInOut:fadeIn,
		// 	viewpageimg:banner[i].picUrl,
		// 	bgcolor:banner[i].backgroundUrl,
		// 	url:banner[i].url,
		// 	flag:1
		// })
		clearInterval(clock)
		this.setState({
			flag:2
		},()=>{
		this.showfade()
		})

	}

	handleLeftClick(){
		clearInterval(clock)
		this.setState({
			dir:-1,
			flag:2
		},()=>{
		this.showfade()
		})
	}

	

	componentDidMount() {
		clock = setInterval(
		i=>this.showfade(), 1000)
  	}


    componentWillUnmount() {
    	clearInterval(clock)
  	}
  	showfade(){
  		clearInterval(clock)
  		switch(this.state.flag){
			case 1:
	    		this.fadein().then(
						clock = setTimeout(()=>{
							this.showfade()
						}, 1000)
	    		);		
	    		break;
	    	case 2:
	    		this.fadeout().then(
						clock = setTimeout(()=>{
							this.showfade()
						}, 1000)
	    		);  
	    		break;
	    	case 3:
	    		this.tick().then(
						clock = setTimeout(()=>{
							this.showfade()
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
			url:banner[i].url,
			flag:3
			})
		})
	}

	fadeout(){
		if(this.state.dir>0){
    		i == maxlength ? i=0 : i++
    		return new Promise((resolve,reject)=>{
				this.setState({
					fadeInOut:fadeOut,
					flag:1
				})
			})
    	}else{
    		i == 0 ? i = maxlength : i--
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
		this.state = {
			content:[],
			singer:[]

		}
	};

	componentWillMount(){
		let contentitem = this.fetchPicture(`/top/playlist?limit=8&order=hot?timestamp=${nowadate}`).then(res =>{
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

	async fetchPicture(newurl){
		try{
			let res = await fetch(`${url}${newurl}`,{withCredentials: true});
			return res.json()
		}catch(e){
			console.log(`err in fetch ${newurl}`)
		}
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
		<span className="line" style={{display:item.id == 5 ? 'none': 'inline'}}>|</span>
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
	</div>
)


const Maincontent = () => (
	<div style={{ width:'100%', backgroundColor:'#fff', position:'absolute',marginTop:'440px'}}>
		<div className="maincontent" >
			<div style={{float:'left',width:'100%',marginRight:'-250px', position:'relative'}}>
				<Lcontent />
				<NewAlbum />
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
		let singeritem = this.fetchPicture('/artist/list?cat=5001&limit=5').then(res =>{	
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

	async fetchPicture(newurl){
		try{
			let res = await fetch(`${url}${newurl}`,{withCredentials: true});
			return res.json()
		}catch(e){
			console.log(`err in fetch ${newurl}`)
		}
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
				<img className="sg-icon" src={item.iconUrl} />
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
			Album:[]
		}
	};

	componentWillMount(){
		let Album =[]
		let Albumitem = this.fetchPicture('/top/album?offset=0&limit=20').then(res =>{	
			for(let i = 0;i<res.albums.length;i++){
				let info = {
					singername:res.albums[i].artist.name,
					alumname:res.albums[i].name,
					iconUrl:res.albums[i].picUrl
				}
				Album.push(info)
			}
			this.setState({
				Album:Album
			})
		})
	}

	async fetchPicture(newurl){
		try{
			let res = await fetch(`${url}${newurl}`,{withCredentials: true});
			return res.json()
		}catch(e){
			console.log(`err in fetch ${newurl}`)
		}
	}	

	render(){
		if(this.state.Album == []){
			return <div></div>
		}
		else
		return (
			<div>
				<a hidefocus="true" className="Albumleft"></a>
					<ul style={{margin:'30px 10px 0 10px',height:'150px',overflow:'hidden'}}>
						{
							this.state.Album.map((data,index)=>(
								<Albumitem key={index} {...data} />
							))	
						}
					</ul>
				<a hidefocus="true" className="Albumright"></a>
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


const Viewpagecontent = () => (
  <div style={{position:'absolute',marginTop:'105px',width:"100%"}}>
  	<Viewpage />
  </div>
)

export {Viewpagecontent,Maincontent}