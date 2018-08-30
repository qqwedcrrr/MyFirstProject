import React,{Component} from 'react'



// const Schedule = () => (
//   <div>
//     <ul>
//       <li>6/5 @ Evergreens</li>
//       <li>6/8 vs Kickers</li>
//       <li>6/14 @ United</li>
//     </ul>
//   </div>
// )

class Schedule extends Component{
	constructor(props){
		super(props)
		this.state={
			name:'',
			singername:'bbb'
		}
		this.handleOnClick = this.handleOnClick.bind(this)
	}

	handleOnClick(e){
		document.onclick = e =>{
			console.log(this.state.singername)
			this.setState({
				singername:'123123'
			})
			console.log(this.state.singername)
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
			<div onMouseDown={this.handleOnClick} className="MB-songinfo">
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

export default Schedule