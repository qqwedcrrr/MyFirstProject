import React,{Component}  from 'react'
import './componetsCss/Home.css'

// function daysBetween(DateOne,DateTwo){ 
// 	    var OneMonth = DateOne.substring(5,DateOne.lastIndexOf ('/'));  
// 	    var OneDay = DateOne.substring(DateOne.length,DateOne.lastIndexOf ('/')+1);  
// 	    var OneYear = DateOne.substring(0,DateOne.indexOf ('/'));  
	  
// 	    var TwoMonth = DateTwo.substring(5,DateTwo.lastIndexOf ('/'));  
// 	    var TwoDay = DateTwo.substring(DateTwo.length,DateTwo.lastIndexOf ('/')+1);  
// 	    var TwoYear = DateTwo.substring(0,DateTwo.indexOf ('/'));  
	  
// 	    var cha=((Date.parse(OneMonth+'/'+OneDay+'/'+OneYear)- Date.parse(TwoMonth+'/'+TwoDay+'/'+TwoYear))/86400000);   
// 	    return Math.abs(cha);  
// }

// class Home extends Component{
// 	render() {
// 	var nowDay = new Date();
// 	var creatDay ='2017/5/17';
// 	var pastDay = daysBetween(creatDay,nowDay.toLocaleDateString());
// 	var realDay = pastDay+1775;
// 	var days = <p>相恋了{realDay}天</p>
// 		return
// 			(
				
// 			);
// 	}
// }

// var nowDay = new Date();
// 	var creatDay ='2017/5/17';
// 	var pastDay = daysBetween(creatDay,nowDay.toLocaleDateString());
// 	var realDay = pastDay+1775;
// 	var days = <p>相恋了{realDay}天</p>

const Home = () => (
	<div>
		<div>
			<h1 style={{fontSize:'30px'}}>Welcome to the Zitao Personal Website!</h1>
		</div>
		<div style={{marginTop:'30px'}}>
			<HomeLogo />
		</div>
	</div>
)

// const r = {
// 	color: white;
// 	width: 100px;
// 	height: 60px;
// 	font-weight: bold;
// 	font-size: 60px;
// 	visibility: hidden;
// 	position: absolute;
// 	left: 0;
// 	top: 0;
// }

const Zcoord = [
	{
		x:0,
		y:0
	},
	{
		x:160,
		y:0
	},
	{
		x:0,
		y:240
	},
	{
		x:160,
		y:240
	}
]

const Icoord = [
	{
		x:0,
		y:0
	},
	{
		x:0,
		y:30
	},
	{
		x:0,
		y:60,
		m:true
	},
	{
		x:0,
		y:240
	}
]

const Tcoord = [
	{
		x:0,
		y:80
	},
	{
		x:70,
		y:80
	},
	{
		x:35,
		y:0,
		m:true
	},
	{
		x:35,
		y:240,
	},
	{
		x:65,
		y:240,
	}
]

const Acoord = [
	{
		x:20,
		y:30
	},
	{
		c:'bezierCurveTo',
		x:70,
		y:80,

	},
	{
		x:35,
		y:0,
		m:true
	},
	{
		x:35,
		y:240,
	},
	{
		x:65,
		y:240,
	}
]

class HomeLogo extends Component{
	constructor(props){
		super(props)
	}

	componentDidMount(){
		this.drawBackground();
	}

	drawBackground(){
		let canvas1 = this.refs.canvas1;
		let ctx = canvas1.getContext('2d')
		let offscreenCanvas = document.createElement('canvas')
		let offCtx = offscreenCanvas.getContext('2d')
		if(offscreenCanvas.width  < window.innerWidth){
            canvas1.width = window.innerWidth;
            offscreenCanvas.width  = window.innerWidth;
        }
        if(offscreenCanvas.height < window.innerHeight){
            canvas1.height = window.innerHeight
            offscreenCanvas.height = window.innerHeight;
        }
		// offCtx.beginPath();
		offCtx.lineJoin="round"
		offCtx.lineWidth="20"
		var gradient=offCtx.createLinearGradient(0,0,offscreenCanvas.width,offscreenCanvas.height);
		gradient.addColorStop("0","white");
		gradient.addColorStop("0.5","blue");
		gradient.addColorStop("1.0","black");
		offCtx.strokeStyle=gradient;
		this.drawLetter(Zcoord,offCtx,40,10);
		this.drawLetter(Icoord,offCtx,260,20);
		this.drawLetter(Tcoord,offCtx,300,10)

		
		// offCtx.font="80px Georgia";
		// offCtx.fillText("Zitao",100,250);
		

		ctx.drawImage(offscreenCanvas,0,0,offscreenCanvas.width,offscreenCanvas.height)
	}

	drawLetter(coord,ctx,baseX,baseY){
		try{
			ctx.beginPath();
			console.log(coord)
			ctx.moveTo(coord[0].x+baseX,coord[0].y+baseY);
			for(let i = 1; i<coord.length; i++){
				if(!coord[i].hasOwnProperty('m'))
					ctx.lineTo(coord[i].x+baseX,coord[i].y+baseY);
				if(coord[i].hasOwnProperty('c')){
					swich(coord[i].c){
						case 
					}
				}
				else{
					ctx.moveTo(coord[i].x+baseX,coord[i].y+baseY)
				}
			}
			ctx.stroke()
		}catch(e){
			console.log('err in drawLetter')
		}
	}

	render(){
		return(
			<div style={{position:'relative'}}>
				<canvas ref="canvas1" style={{width:'100%',height:'600px',zIndex:1}}></canvas>
				<canvas ref="canvas2" style={{width:'100%',height:'600px',position:'absolute',left:'0px',top:'0px',zIndex:2}}></canvas>
			</div>
		)
	}
}

export default Home