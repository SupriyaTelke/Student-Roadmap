import React from 'react';
import PropTypes from 'prop-types';

class VerticalRoadmap extends React.Component {
    constructor(props){
        super(props);
       this.arrLine=[ ];
       this.arrText=[ ];
    }
    //To get total number of chapters
    getCount(){
        const members = this.props.chapter.filter(member => member.title)
        return members.length;
    }
//To draw circles,lines and arcs
draw(){
    const arrCircle=[]
    var cnt=150;
    var valX;
    var xCord=50;
    var yCord=150;
    var d;
    for (var i=0; i<this.getCount(); i++){
        if (i > 0 && (i % 3 === 0)){
            valX=xCord;
            // This line is for first 3 chapters circle 
            if (i > 3){
                d="M 100 "  + yCord +" l 300 0";
            }
            else {
                d="M 50 "  + yCord +" l 350 0";
            }
            this.arrLine.push(<path id="lineAB" d={d} stroke="red" strokeWidth="3" fill="none" />)
           // This Draws arc at right side
            if (xCord === 150){
                d="M100," + yCord + " A300,150 0 0,0 100," + (yCord+150) +""
            }
            // This Draws arc at left side
            else {
                d="M400," + yCord + " A300,150 0 0,1 400," + (yCord+150) +""
            }
            this.arrLine.push(<path d={d} stroke="red" strokeWidth="3" fill="none" />)
            yCord=yCord+150;
            //<path id="lineAB" d="M 300 500 l 0 0" stroke="red" stroke-width="3" fill="none" />
            // This is the  first circle for next line 
            arrCircle.push(<circle  cx={valX} cy={yCord} r="3" />)
            // Assigns text for circle
            this.arrText.push(<text x={valX} y={yCord} dy="30">{this.props.chapter[i].title}</text>)
            cnt=valX
            // To draw ending and begining line for arc with 50 px 
            if (i === (this.getCount()-1) && cnt === 150){
                d="M 100 "  + yCord +" l " + (xCord-100) +" 0";
                this.arrLine.push(<path id="lineAB" d={d} stroke="red" strokeWidth="3" fill="none" />)
            }
            else {
                d="M "+ xCord +" " + yCord +" l " + ((cnt-xCord)+50) +" 0";
                this.arrLine.push(<path id="lineAB" d={d} stroke="red" strokeWidth="3" fill="none" />)
            }
        }
        //If the chapters strat from left to right
        else if(cnt === 150){
            xCord = xCord + 100;
            arrCircle.push(<circle  cx={xCord} cy={yCord} r="3" />)
            this.arrText.push(<text x={xCord} y={yCord} dy="30">{this.props.chapter[i].title}</text>)
            if (i === (this.getCount()-1) && i < 3){// To check end of chapters
                d="M 50 "  + yCord +" l " + (xCord-50) +" 0";
                this.arrLine.push(<path id="lineAB" d={d} stroke="red" strokeWidth="3" fill="none" />)
            }
            else if (i === (this.getCount()-1)) {
                d="M 100 "  + yCord +" l " + (xCord-100) +" 0";
                this.arrLine.push(<path id="lineAB" d={d} stroke="red" strokeWidth="3" fill="none" />)
            }
           
        }
        //If the chapters strat from right to left
        else if(cnt === 350){
            xCord = xCord - 100;
            arrCircle.push(<circle  cx={xCord} cy={yCord} r="3" />)
            this.arrText.push(<text x={xCord} y={yCord} dy="30">{this.props.chapter[i].title}</text>)
            if (i === (this.getCount()-1)){// To check end of chapters
                d="M "+ xCord +" " + yCord +" l " + (cnt-xCord) +" 0";
                this.arrLine.push(<path id="lineAB" d={d} stroke="red" strokeWidth="3" fill="none" />)
            }
        }
    }

    return arrCircle;
}
//To insert avatar of students according to their completed percentage
setImgNPercentage(){
    const smem=this.props.studentprop.filter(s=>s.name)
    const scount=smem.length
    var dist;
    var x,y,arcDist,temp,div3;
    const arrPic=[]
   // const arrPicPath=[]
    for (var j=0; j<scount; j++){
        //To calculte percentage according to total numbers of subjects
       // const ix=''+ (this.props.studentprop[j].percentage*(this.setX()/100))-25+'';
       dist =this.props.studentprop[j].percentage*this.getCount();
       temp = ~~(dist / 100)// To get the first part of division without decmal point for arc
       var tempDiv3=~~(dist / 300) + 1
        if (dist <= 300){// if the distance belongs to first line 
            x = (dist + 50) - 25
            y = 90
            arrPic.push(<image x={x} y={y} width="50px" height="50px" xlinkHref={require(`${this.props.studentprop[j].avatar}`)}/>,
                    <text x={x} y={y} dy="5" fontFamily="cursive" fill="blue" stroke="4" textAnchor="left">{this.props.studentprop[j].percentage}</text>)
        }
        else if(((dist / 300) % 1 > 0.33) && (dist < (300 * tempDiv3)) && (tempDiv3 % 2 ===0)){
            x = ((300 * tempDiv3) - dist + 150) - 25
            y = 150 * tempDiv3 - 60 
            arrPic.push(<image x={x} y={y} width="50px" height="50px" xlinkHref={require(`${this.props.studentprop[j].avatar}`)}/>,
                    <text x={x} y={y} dy="5" fontFamily="cursive" fill="blue" stroke="4" textAnchor="left">{this.props.studentprop[j].percentage}</text>)
        }
        else if(((dist / 300) % 1 > 0.33) && (dist < (300 * tempDiv3)) && (tempDiv3 % 2 !==0)){
            x = (350 -((300 * tempDiv3) - dist)) - 25
            y = 150 * tempDiv3 - 60 
            arrPic.push(<image x={x} y={y} width="50px" height="50px" xlinkHref={require(`${this.props.studentprop[j].avatar}`)}/>,
                    <text x={x} y={y} dy="5" fontFamily="cursive" fill="blue" stroke="4" textAnchor="left">{this.props.studentprop[j].percentage}</text>)
        }
        // else if (dist >= 400 && dist < 600){//if the distance belongs to second line 
        //     x = ((600 - dist) + 150) - 25
        //     y = 240
            
        // }
        // else if (dist >= 700 && dist < 900){//if the distance belongs to third line 
        //     x = ((900 - dist) + 150) - 25
        //     y = 390
        //     arrPic.push(<image x={x} y={y} width="50px" height="50px" xlinkHref={require(`${this.props.studentprop[j].avatar}`)}/>,
        //             <text x={x} y={y} dy="5" fontFamily="cursive" fill="blue" stroke="4" textAnchor="left">{this.props.studentprop[j].percentage}</text>)
        // }
        //The arc is divided into 3 parts,first part is line of 100 px,then arc of 150px and then last part of 100px line 
        //so the total arc distance is 350
        else if( temp % 2 === 0){//if the distance belongs to left arc
            div3 = temp / 3
            arcDist = ((dist -(temp * 100)) / 100) * 250;// to calculate distance percentage for 350 px
            if ( arcDist <= 50){//if the distance is on first line 
                x = 150 - arcDist - 25
                y = (150 * div3) - 60
                arrPic.push(<image x={x} y={y} width="50px" height="50px" xlinkHref={require(`${this.props.studentprop[j].avatar}`)}/>,
                    <text x={x} y={y} dy="5" fontFamily="cursive" fill="blue" stroke="4" textAnchor="left">{this.props.studentprop[j].percentage}</text>)
            }
            else if( arcDist >= 200){//if the distance is on last line 
                div3 = div3 + 1
                x = (150 - (250 - arcDist)) - 25
                y = (150 * div3) - 60
                arrPic.push(<image x={x} y={y} width="50px" height="50px" xlinkHref={require(`${this.props.studentprop[j].avatar}`)}/>,
                <text x={x} y={y} dy="5" fontFamily="cursive" fill="blue" stroke="4" textAnchor="left">{this.props.studentprop[j].percentage}</text>)
            }
            else if ( arcDist > 50 && arcDist < 200){//if the distance is on arc 
                x = 5
                y = ((150 * div3) + (arcDist - 50)) - 25
                arrPic.push(<image x={x} y={y} width="50px" height="50px" xlinkHref={require(`${this.props.studentprop[j].avatar}`)}/>,
                <text x={x} y={y} dy="5" fontFamily="cursive" fill="blue" stroke="4" textAnchor="left">{this.props.studentprop[j].percentage}</text>)
            }
        }
        else if ( temp % 2 !== 0)//if the distance belongs to right arc
        {
            div3 = temp / 3
            arcDist = ((dist -(temp * 100)) / 100) * 250;
            if ( arcDist <= 50){//if the distance is on first line 
                x = 350 + arcDist - 25
                y = (150 * div3) - 60
                arrPic.push(<image x={x} y={y} width="50px" height="50px" xlinkHref={require(`${this.props.studentprop[j].avatar}`)}/>,
                    <text x={x} y={y} dy="5" fontFamily="cursive" fill="blue" stroke="4" textAnchor="left">{this.props.studentprop[j].percentage}</text>)
            }
            else if( arcDist >= 200){//if the distance is on last line 
                div3 = div3 + 1
                x = (350 + (250 - arcDist)) - 25
                y = (150 * div3) - 60
                arrPic.push(<image x={x} y={y} width="50px" height="50px" xlinkHref={require(`${this.props.studentprop[j].avatar}`)}/>,
                <text x={x} y={y} dy="5" fontFamily="cursive" fill="blue" stroke="4" textAnchor="left">{this.props.studentprop[j].percentage}</text>)
            }
            else if ( arcDist > 50 && arcDist < 200){////if the distance is on arc 
                x = 435
                y = ((150 * div3) + (arcDist - 50)) - 25
                arrPic.push(<image x={x} y={y} width="50px" height="50px" xlinkHref={require(`${this.props.studentprop[j].avatar}`)}/>,
                <text x={x} y={y} dy="5" fontFamily="cursive" fill="blue" stroke="4" textAnchor="left">{this.props.studentprop[j].percentage}</text>)
            }
        }
    }
    return arrPic;
    
}

render(){
    return(
    <div>
    <svg viewBox="0 0 1000 800" height="100%" width="100%" >
        {/* <svg dangerouslySetInnerHTML={{__html: "<image x='219' y='450' width='200' height='200' xlink:href= {download} "}} /> */}

        {/* To place Images of students with percentage  */}
        {this.setImgNPercentage()}
        {/* To draw lines,circles,arcs on line which represent chapters */}
        <g stroke="red" strokeWidth="3" fill="red">
        {this.draw()}
        </g>
        {this.arrLine}
        <circle id="start" cx="50" cy="150" r="9" fill='black'/>
        
        {/* To assign chapter name to circles */}
        <g fontSize="15" fontFamily="sans-serif" fill="black" stroke="none" textAnchor="middle" >
        {/* {this.setText()} */}
        {this.arrText}
        </g>
       
    </svg>
    </div>
    );
}
}
VerticalRoadmap.propTypes = {
    studentprop: PropTypes.array.isRequired,
    chapter: PropTypes.array.isRequired,
}

export default VerticalRoadmap;