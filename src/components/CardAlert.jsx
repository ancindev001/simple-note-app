import React from "react";

export default class CardAlert extends React.Component {


    render() {
        
        const { data } = this.props

        return (
            <div className="card">
                <div className="card-body" style={{color: "red"}}>
                    { data }
                </div>
            </div>
        )
    }
}