import React from 'react';
import './Join.css'

const Join = (props) => {
    let id = props.id;
    let joinType = props.joinType;
    let joinImageUrl = props.joinImageUrl;

    return (
        <div id={`join-row${id}`} className="join-row">
            <button id={`joins${id}.deleteButton`} className="delete-join-button" type="button">
                X
            </button>
            <input id={`joins${id}.joinType`} hidden="true" value={joinType}/>
                <select id={`joins${id}.parentTable`}>
                    <option value="null"></option>
                </select>
            <img id={`joins${id}.image`} src={joinImageUrl} width="100" height="80"/>
                <select id={`joins${id}.targetTable`}>
                    <option value="null"></option>
                </select>
            <div>
                <select id={`joins${id}.parentJoinColumns`}></select>
                <b> = </b>
                <select id={`joins${id}.targetJoinColumns`}></select>
                <button id={`joins${id}.addParentAndTargetColumn`} type="button">
                    +
                </button>
            </div>
        </div>
    );
};

export default Join;