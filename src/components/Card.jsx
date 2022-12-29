import React from "react";
import { showFormattedDate } from "../utils";

export default class Card extends React.Component {


    constructor(props) {
        super(props)

        this.actionButtonHandler = this.actionButtonHandler.bind(this)
    }

    actionButtonHandler(event) {
        this.props.action(
            {
                action: event.target.dataset.action,
                id: event.target.dataset.id
            }
        )
    }
    


    render() {
        
        const { data } = this.props

        return (
            <div className="card">
                <div className="card-body">
                <h2 className="title">{ data.title }</h2>
                    <div style={{color: "teal"}}>Dibuat: { showFormattedDate(data.createdAt )}</div>

                    <p className="text-body">{ data.body }</p>
                </div>
                <div className="card-footer">
                    <button onClick={this.actionButtonHandler} data-id={data.id} data-action="archive" style={data.archived ? {backgroundColor: "teal"} : {backgroundColor: "orange"}} className="button">{data.archived ? "Aktifkan" : "Arsipkan"}</button>
                    <button onClick={this.actionButtonHandler} data-id={data.id} data-action="delete" style={{backgroundColor:"red"}} className="button">Delete</button>    
                </div>
            </div>
        )
    }
}