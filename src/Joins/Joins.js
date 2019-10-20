import React, { Component } from 'react';
import './Joins.css'
import './Join/Join'
import Join from "./Join/Join";
import fullOuterJoin from '../Images/full_outer_join.png';
import fullOuterJoinExcluding from '../Images/full_outer_join_excluding.png';
import innerJoin from '../Images/inner_join.png';
import leftJoin from '../Images/left_join.png';
import leftJoinExcluding from '../Images/left_join_excluding.png';
import rightJoin from '../Images/right_join.png';
import rightJoinExcluding from '../Images/right_join_excluding.png';


class Joins extends Component {

    state = {
        joins: [] // An array of the join objects.
    };

    joinImageUrls = [
        {'name': 'LEFT_EXCLUDING',         'image': leftJoinExcluding},
        {'name': 'LEFT',                   'image': leftJoin},
        {'name': 'INNER',                  'image': innerJoin},
        {'name': 'RIGHT',                  'image': rightJoin},
        {'name': 'RIGHT_EXCLUDING',        'image': rightJoinExcluding},
        {'name': 'FULL_OUTER',             'image': fullOuterJoin},
        {'name': 'FULL_OUTER_EXCLUDING',   'image': fullOuterJoinExcluding}
    ];

    onAddJoinClickHandler = () => {
        let newState = Object.assign({}, this.state);
        newState.joins.push({
            'key': newState.joins.length,
            'id': newState.joins.length,
            'joinType': this.joinImageUrls[0].name,
            'joinImageUrl': this.joinImageUrls[0].image
        });
        this.setState(newState);
    };

    onDeleteJoinHandler = (joinId) => {
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

    // Changes the joinType and joinImageUrl of a join.
    onJoinImageClickHandler = (joinId) => {
        // Get next join image based on currentJoinType
        joinId = parseInt(joinId);
        let currentJoinType = this.state.joins.filter(join => join.id === joinId)[0].joinType;

        let currentJoinTypeIndex;
        for (let i=0; i<this.joinImageUrls.length; i++) {
            let join = this.joinImageUrls[i];
            if (join.name === currentJoinType) {
                currentJoinTypeIndex = i;
                break;
            }
        }

        let nextJoinType = this.joinImageUrls[0].name; // Default to first item in case of exception
        let nextJoinImageUrl = this.joinImageUrls[0].image; // Default to first item in case of exception
        try {
            nextJoinType = this.joinImageUrls[currentJoinTypeIndex + 1].name;
            nextJoinImageUrl = this.joinImageUrls[currentJoinTypeIndex + 1].image;
        } catch (e) {}

        // Copy state
        let newState = Object.assign({}, this.state);
        newState.joins.forEach(join => {
            if (join.id === joinId) {
                join.joinType = nextJoinType;
                join.joinImageUrl = nextJoinImageUrl;
            }
        });

        this.setState(newState);
    };

    render() {
        // Wrapper method so that onDeleteJoinHandler can be passed to child component.
        const onDeleteJoinHandlerWrapper = (joinId) => {
            this.onDeleteJoinHandler(joinId);
        };

        // Wrapper method so that onJoinImageClickHandler can be passed to child component.
        const onJoinImageClickHandler = (joinId) => {
            this.onJoinImageClickHandler(joinId);
        };

        let joinsJsx = this.state.joins.map(function(join) {
            return <Join key={join.id}
                         id={join.id}
                         joinType={join.joinType}
                         joinImageUrl={join.joinImageUrl}
                         parentOnDeleteClickHandler={onDeleteJoinHandlerWrapper}
                         parentOnJoinImageClickHandler={onJoinImageClickHandler}/>
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