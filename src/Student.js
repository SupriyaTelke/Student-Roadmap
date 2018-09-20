import React from 'react';
import PropTypes from 'prop-types';
import HorizontalRoadmap from './HorizontalRoadmap.js';
import VerticalRoadmap from './VerticalRoadmap.js';

class Student extends React.Component {
    render(){
        if (this.props.orientation === 'vertical'){
        return(
            <div>
                <VerticalRoadmap studentprop={this.props.studentprop}  chapter={this.props.chapter}/>
            </div>
        );
    }
    else if (this.props.orientation === 'horizontal'){
        return(
            <div>
                <HorizontalRoadmap studentprop={this.props.studentprop}  chapter={this.props.chapter}/>
            </div>
        );
    }
    }
}

Student.propTypes = {
    studentprop: PropTypes.array.isRequired,
    chapter: PropTypes.array.isRequired,
    orientation: PropTypes.string.isRequired
}

export default Student;