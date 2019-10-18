import React, { Component } from 'react';
import './Joins.css'
import './Join/Join'
import Join from "./Join/Join";

class Joins extends Component {

    state = {
        joins: [] // An array of the join objects.
    };

    onAddJoinClickHandler = () => {
        let newState = Object.assign({}, this.state);
        newState.joins.push({
            'key': newState.joins.length,
            'id': newState.joins.length,
            'joinType': 'left',
            'joinImageUrl': 'www.test.com'
        });
        this.setState(newState);
    };

    deleteJoinHandler = (joinId) => {
        joinId = parseInt(joinId);

        // Create new array of joins that excludes the id being deleted.
        let newState = Object.assign({}, this.state);
        newState.joins = newState.joins.filter(join => join.id !== joinId);

        // Renumber join ids.
        for (let i=0; i<newState.joins.length; i++) {
            newState.joins[i].id = i;
        }

        this.setState(newState);
    };

    render() {
        // let handler = this.deleteJoinHandler;
        const handler = (joinId) => {
            this.deleteJoinHandler(joinId);
        };

        let joinsJsx = this.state.joins.map(function(join) {
            return <Join key={join.id} id={join.id} joinType={join.joinType} joinImageUrl={join.joinImageUrl} parentOnDeleteClickHandler={handler}/>
        });

        return (
            <div id="joinsDiv" className="joins-div" hidden={this.props.hidden === 'true'}>
                <button id="addJoin" name="addJoin" type="button" onClick={this.onAddJoinClickHandler}>Add Join</button>
                <div>
                    {joinsJsx}
                </div>
            </div>
        );
    }
}



export default Joins;