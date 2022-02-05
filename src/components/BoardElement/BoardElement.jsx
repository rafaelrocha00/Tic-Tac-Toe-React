import React, { Component } from 'react';
import './boardElement.css';

class BoardElement extends Component{

    constructor(probs){
        super(probs);
    }

    render(){
        return(
            <>
                <div className={this.props.style} onClick={this.props.markPlayerFunction}><div className='mark'>{this.props.value}</div></div>
            </>
        )
    }

}
export default BoardElement;