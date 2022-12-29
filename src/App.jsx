import React from "react";
import Card from "./components/Card";
import CardAlert from "./components/CardAlert";
import Editor from "./components/Editor";
import SearchBox from "./components/SearchBox";
import { getInitialData } from "./utils";

export default class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            data: [],
            query: ""

        }

        this.onButtonHandler = this.onButtonHandler.bind(this)
        this.onActionHandler = this.onActionHandler.bind(this)
        this.onSearchHandler = this.onSearchHandler.bind(this)

    }

    onSearchHandler(event) {
        this.setState((state) => {
            return {
                query: event.target.value
            }
        })
    }

    onActionHandler(datas) {

        switch (datas.action) {
            case 'delete':
                this.setState((state) => {
                    return {
                        data: state.data.filter((item) => item.id != datas.id)
                    }
                })

                break;

            case 'archive':
                this.setState((state) => {
                    return {
                        data: state.data.map((item) => {

                            if (item.id == datas.id) {
                                item.archived = !item.archived
                            }
                            return item
                        })
                    }
                })
                break;

            default:
                throw new Error("Error action not defined")
        }


    }

    onButtonHandler(datas) {

        if(datas.title == "" || datas.body == "") {
            alert("Judul atau kontent harus diisi")
        } else {
            const ids = this.state.data.map(object => {
                return object.id;
            });
            const lastIds = Math.max(...ids);
            const newData = { ...datas, id: lastIds + 1 }
    
            this.setState((state) => {
                return {
                    data: [newData, ...state.data]
                }
            })
        }

    

    }


    componentDidMount() {
        this.setState((prevstate) => {
            return {
                data: getInitialData()
            }
        })
    }


    notesData(archived) {
        return this.state.data
            .filter((item) => item.title.toLowerCase().includes(this.state.query.toLowerCase()))
            .filter((note) => note.archived === archived)
    }

    render() {

        return (
            <div className="container">
                <h1>Note App</h1>
                <Editor button={this.onButtonHandler} />

                <SearchBox search={this.onSearchHandler}/>

                <div className="box">
                    <h1>Note Aktif</h1>
                    <div className="notes-box">
                        {this.notesData(false).length !== 0 ?
                            this.notesData(false).map((note) => <Card key={note.id} action={this.onActionHandler} data={note} />) : <CardAlert data="Note aktif kosong" />}
                    </div>
                </div>


                <div className="box">
                    <h1>Note diarsipkan</h1>
                    <div className="notes-box">
                        {this.notesData(true).length !== 0 ? this.notesData(true).map((note) => <Card key={note.id} action={this.onActionHandler} data={note} />) : <CardAlert data="Note diarsipkan kosong" />}
                    </div>
                </div>
            </div>
        )
    }
}