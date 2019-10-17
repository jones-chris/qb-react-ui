import React from 'react';
import './Joins.css'
import './Join/Join'

const Joins = (props) => {
    return (
        <div id="joinsDiv" className="joins-div" hidden={props.hidden === 'true'}>
            <button id="addJoin" name="addJoin" type="button">Add Join</button>
        </div>
    );
};

export default Joins;