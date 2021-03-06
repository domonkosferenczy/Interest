import React from 'react'
import Grid from './Grid'
import {convertToString} from './Number'

class Graph extends React.Component {

    render(){
        
        // Is there other options than variables?
        let points = [], circles = []
        if (this.props.data !== undefined){

            // It shouldn't be here...?
            this.length = this.props.data.length;
            this.maxY = Math.max(this.props.data[this.length -1].total)
            this.minY = Math.max(this.props.data[0].total) + 50
            this.distY = Math.round((this.maxY + this.minY) / 9)
            this.distX = 900 / this.length;

            circles = this.props.data.map((_, index) => {
                points.push(
                    index * this.distX +75 + ", " +
                    (this.props.data[index].total / this.distY * 50 +25)
                )

                return (
                <circle
                    key={"P"+index}
                    cx={index * this.distX +75}
                    cy={this.props.data[index].total / this.distY * 50 +25}
                    r="1"
                    stroke="#00496a"
                    strokeWidth="3"
                />)
              })
              points.push(
                (this.length -1) * this.distX +75 + ", " + (25),
                75 + "," + 25
              )
        return (
            <div className="frame">
                <svg className="chart" viewBox="0 0 1000 500" style={{"transform": "rotateX(180deg)"}}>
                    <Grid maxY={this.maxY} minY={this.minY} numbers={this.length} distX={this.distX}></Grid>
                    <polygon points={points} style={{fill: "rgba(0, 73, 106, 0.4)",strokeWidth: 1,stroke: "rgb(0, 73, 106)"}} />
                    {circles}
                    <line 
                        x1={(this.length -1) * this.distX +75}
                        y1={this.props.data[this.length -1].total / this.distY * 50 +25}
                        x2={75}
                        y2={this.props.data[this.length -1].total / this.distY * 50 +25}
                        style={{stroke:"#252525",strokeDasharray:"4"}}
                    />
                    <text
                        key="endpoint" x={500}
                        y={(-1* this.props.data[this.length -1].total / this.distY * 50 - 5) -25}
                        fontSize="16"
                        style={{transform: "rotateX(0)!important",stroke:"#00496a",fill:"#00496a",fontSize:"18px"}}>
                        {convertToString(this.props.data[this.length -1].total)}
                    </text>
                </svg>
            </div>
        )
    } else {
        return ""
    }
}
}


export default Graph