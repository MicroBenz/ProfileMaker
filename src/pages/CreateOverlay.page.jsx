import React from 'react';
// import { withRouter } from 'react-router-dom';
// export default () => (<h1>Create Overlay</h1>);

// @withRouter
export default class CreateOverlay extends React.Component{
    render(){
        console.log('create overlay is running');
        return(
            <div>
                <h1>Create Overlay</h1>
                <div>
                    <input type="text" placeholder="title"/>
                    <textarea rows="3"></textarea>
                    <input type="file" />
                    <button>save</button>
                </div>
            </div>
        );
    }
}