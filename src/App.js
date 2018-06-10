import React, { Component } from 'react';
import './static/App.css';
import {read} from './actions/mainActions';

class App extends Component {
    render() {
        console.group('Instructions');
            console.log("Welcome to my twitter emulator");
            console.log("To get started upload your 2 file");
            console.log("A sample of these files can be found in src/test/");
            console.log("Please ensure the files are named as follows:");
            console.log("Users file must contain the word user");
            console.log("Tweet file must contain the word tweet");
            console.log("Files can not contain both words \"user\" and \"tweet\"");
        console.groupEnd();
        return (
            <div className="App">
            <header className="App-header">
                <h1 className="App-title">Welcome to My Twitter Feed</h1>
            </header>
            <p className="App-intro">Check out the console for information</p>
            <form>
                <div className="inputField"><input type="file" id="fileOne" size="50"/></div>
                <div className="inputField"><input type="file" id="fileTwo" size="50" /></div>
                <div className="inputField"><button type="button" onClick={this._render}>Upload</button></div>
            </form>
            <p id="warningMessage"></p>
            </div>
        );
    }
    _render(e){
        var params = [document.getElementById("fileOne").files[0],
                      document.getElementById("fileTwo").files[0]];
        if(!params[0] || !params[1]){
            err("Missing 1 required file");
        }
        else{
            read(params);
        }

        function err(message){
            document.getElementById("warningMessage").innerHTML = message;
        }
    }
}

export default App;
