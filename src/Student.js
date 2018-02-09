import React from 'react';

class Student extends React.Component {
    
    //To get total number of chapters
    getCount(){
        const{chapter}=this.props
        const members = this.props.chapter.filter(member => member.title)
        return members.length;
    }

    //To set total Max value of X co-ordinate 
    setX(){
        return (this.getCount()*100)+100;
    }

    //use as x co-ordinate value to draw circle and assign chapter name on line
    setCx(){
        return "" +this.setX() + "";
    }
    //To set Value of D attribute in PATH element of SVG
    setPathD(){
        return "M 0 350 l " + this.setX() +" 0";
    }

    //To draw circles on line
    drawCircles(){
        const arrCircle=[]
        for (var i=0; i<this.getCount(); i++){
            arrCircle.push(<circle  cx={(i+1)*100} cy="350" r="3" />)
        }
        return arrCircle;
    }

    //To set representing text for circles on line i.e. chapter name
    setText(){
        const{chapter}=this.props;
        const arrText=[]
        for (var i=0; i<this.getCount(); i++){
            arrText.push(<text x={(i+1)*100} y="350" dy="30">{this.props.chapter[i].title}</text>)
        }
        return arrText;
    }

    //To insert avatar of students according to their completed percentage
    setImgNPercentage(){
        const{studentprop}=this.props
        const smem=this.props.studentprop.filter(s=>s.name)
        const scount=smem.length
        const arrPic=[]
        for (var j=0; j<scount; j++){
            //To calculte percentage according to total numbers of subjects
            const ix=''+ this.props.studentprop[j].percentage*(this.setX()/100)+'';
            const picpath="'"+this.props.studentprop[j].avatar+"'";
            const p=picpath.replace(/^"(.*)"$/, '$1');//for dynamic image path ,want string surrounded with only single quotes
            
            //pic.push(<image x={ix} y="270" width="50px" height="50px" xlinkHref={require({p})}/>)
            arrPic.push(<image x={ix} y="290" width="50px" height="50px" xlinkHref={require('./images/Mickel.jpg')}/>,
                        <text x={ix} y="290" dy="5" font-family="cursive" font-style="bold" fill="blue" stroke="4" text-anchor="left">{this.props.studentprop[j].percentage}</text>)
            
        }
        return arrPic;
        
    }

    render(){
        const {studentprop,chapter}=this.props
    return(
        <div>
        <svg height="400" width={this.getCount()*200} >
            {/* <svg dangerouslySetInnerHTML={{__html: "<image x='219' y='450' width='200' height='200' xlink:href= {download} "}} /> */}

            {/* To draw line  */}
            <path id="lineAB" d={this.setPathD()} stroke="red" stroke-width="3" fill="none" />

            {/* To draw start and end circle on line */}
            <circle id="start" cx="0" cy="350" r="9" fill='black'/>
            <circle id="end" cx={this.setCx()} cy="350" r="9" fill='black'/>

            {/* To draw circles on line which represent chapters */}
            <g stroke="red" stroke-width="3" fill="red">
            {this.drawCircles()}
            </g>

            {/* To assign chapter name to circles */}
            <g font-size="15" font-family="sans-serif" fill="black" stroke="none" text-anchor="middle">
            {this.setText()}
            </g>

            {/* To place Images of students with percentage  */}
            {this.setImgNPercentage()}
        </svg>
        </div>
        );
    }

}
export default Student;