import React from 'react';
import PropTypes from 'prop-types';

class HorizontalRoadmap extends React.Component {
    
    //To get total number of chapters
    getCount(){
        const members = this.props.chapter.filter(member => member.title)
        return members.length;
    }

    //To set total Max value of X co-ordinate 
    setX(){
        return ((this.getCount()*100));
    }

    //To set Value of D attribute in PATH element of SVG
    setPathD(){
        return "M 50 350 l " + this.setX() +" 0";
    }

    //To draw circles on line
    drawCircles(){
        const arrCircle=[]
        for (var i=0; i<this.getCount(); i++){
            arrCircle.push(<circle  cx={((i+1)*100) + 50} cy="350" r="3" />)
        }
        return arrCircle;
    }

    //To set representing text for circles on line i.e. chapter name
    setText(){
        const arrText=[]
        for (var i=0; i<this.getCount(); i++){
            arrText.push(<text x={((i+1)*100) + 50} y="350" dy="30">{this.props.chapter[i].title}</text>)
        }
        return arrText;
    }

    //To insert avatar of students according to their completed percentage
    setImgNPercentage(){
        const smem=this.props.studentprop.filter(s=>s.name)
        const scount=smem.length
        const arrPic=[]
       // const arrPicPath=[]
        for (var j=0; j<scount; j++){
            //To calculte percentage according to total numbers of subjects
            const ix=''+ (this.props.studentprop[j].percentage*(this.setX()/100) + 25)+'';
            //const picpath="'"+this.props.studentprop[j].avatar+"'";
            //arrPicPath.push=(this.props.studentprop[j].avatar.replace(/^"(.*)"$/, '$1'));
            //var p=arrPicPath[j].text;
            //const str=p.replace(/^"(.*)"$/, '$1');
            //const p=picpath.replace(/^"(.*)"$/, '$1');//for dynamic image path ,want string surrounded with only single quotes
            
            //pic.push(<image x={ix} y="270" width="50px" height="50px" xlinkHref={require({p})}/>)
            arrPic.push(<image x={ix} y="290" width="50px" height="50px" xlinkHref={require(`${this.props.studentprop[j].avatar}`)}/>,
                        <text x={ix} y="290" dy="5" font-family="cursive" fill="blue" stroke="4" text-anchor="left">{this.props.studentprop[j].percentage}</text>)
            
        }
        return arrPic;
        
    }

    render(){
        return(
        <div>
        <svg viewBox="0 0 1500 400" height="auto" width="auto" >
            {/* <svg dangerouslySetInnerHTML={{__html: "<image x='219' y='450' width='200' height='200' xlink:href= {download} "}} /> */}

            {/* To draw line  */}
            <path id="lineAB" d={this.setPathD()} stroke="red" stroke-width="3" fill="none" />

            {/* To draw start and end circle on line */}
            <circle id="start" cx="50" cy="350" r="9" fill='black'/>
            {/* <circle id="end" cx={this.setX()} cy="350" r="9" fill='black'/> */}

            {/* To draw circles on line which represent chapters */}
            <g stroke="red" stroke-width="3" fill="red">
            {this.drawCircles()}
            </g>

            {/* To assign chapter name to circles */}
            <g font-size="15" font-family="sans-serif" fill="black" stroke="none" text-anchor="middle" >
            {this.setText()}
            </g>

            {/* To place Images of students with percentage  */}
            {this.setImgNPercentage()}
        </svg>
        </div>
        );
    }

}

HorizontalRoadmap.propTypes = {
    studentprop: PropTypes.array.isRequired,
    chapter: PropTypes.array.isRequired,
}
export default HorizontalRoadmap;