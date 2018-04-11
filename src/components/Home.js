import React , { Component } from 'react'

function daysBetween(DateOne,DateTwo){ 
	    var OneMonth = DateOne.substring(5,DateOne.lastIndexOf ('/'));  
	    var OneDay = DateOne.substring(DateOne.length,DateOne.lastIndexOf ('/')+1);  
	    var OneYear = DateOne.substring(0,DateOne.indexOf ('/'));  
	  
	    var TwoMonth = DateTwo.substring(5,DateTwo.lastIndexOf ('/'));  
	    var TwoDay = DateTwo.substring(DateTwo.length,DateTwo.lastIndexOf ('/')+1);  
	    var TwoYear = DateTwo.substring(0,DateTwo.indexOf ('/'));  
	  
	    var cha=((Date.parse(OneMonth+'/'+OneDay+'/'+OneYear)- Date.parse(TwoMonth+'/'+TwoDay+'/'+TwoYear))/86400000);   
	    return Math.abs(cha);  
	}

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

var nowDay = new Date();
	var creatDay ='2017/5/17';
	var pastDay = daysBetween(creatDay,nowDay.toLocaleDateString());
	var realDay = pastDay+1775;
	var days = <p>相恋了{realDay}天</p>

const Home = () => (
  <div>
					<div>
						{days}
					</div>
				  <div>
				    <h1>Welcome to the Tornadoes Website!</h1>
				  </div>
				</div>
)

export default Home