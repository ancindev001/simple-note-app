import React from "react";

export default class Editor extends React.Component {
    constructor(props) {
        super(props)

        this.maxChar = 50

        this.state = {
            currChar: 50,
            note: {
                id: 0,
                title: "",
                body: "",
                createdAt: null,
                archived: false
            }
        }

        this.onTitlechangeHandler = this.onTitlechangeHandler.bind(this)
        this.onContentChangeHandler = this.onContentChangeHandler.bind(this)
        this.onButtonClickHandler = this.onButtonClickHandler.bind(this)
    }


    onTitlechangeHandler(event) {
        this.setState((state) => {
            const sisa = this.maxChar - event.target.value.length
            if(sisa === -1) {
                alert("maksimal karakter judul tercapai")
                return 
            }
            return {
                currChar: sisa,
                note: {
                    ...state.note,
                    title: event.target.value,
                    createdAt: +new Date()
                }
            }
        })
    }
    onContentChangeHandler(event) {
        this.setState((state) => {
            return {
                note: {
                    ...state.note,
                    body: event.target.value
                }
            }
        })
    }

    onButtonClickHandler(event) {

        this.props.button(this.state.note)
        this.setState((state) => {
            return {
                note: {
                    title: "",
                    body: "",
                    ...state
                }
            }
        })
    }



    render() {

        return (
            <div className="editor-box">
      
                    <div className="form-group">
                        <span style={{color: "red", textAlign: "right"}}>Sisa karakter: {this.state.currChar}</span>
                        <input value={this.state.note.title} onChange={this.onTitlechangeHandler} className="form-control" placeholder="masukkan judul catatan" type="text" />
                        
                    </div>

                    <div className="form-group">
                        <textarea value={this.state.note.body} onChange={this.onContentChangeHandler} className="form-control" placeholder="masukkan isi catatan" rows="10" />
                    </div>

                    <button onClick={this.onButtonClickHandler} className="button">Simpan</button>
                
            </div>
        )
    }
}