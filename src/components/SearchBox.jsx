import React from "react";

export default class SearchBox extends React.Component {
    render() {
        return (
            <div className="search-box">
                <input onKeyUp={this.props.search} className="form-control" type="text" placeholder="cari note"/>
            </div>
        )
    }
}