import React from 'react';
import './Join.css'

const Join = (props) => {
    let id = props.id;
    let joinType = props.joinType;
    let joinImageUrl = props.joinImageUrl;
    let parentOnDeleteClickHandler = props.parentOnDeleteClickHandler;

    // Wrapper method to execute the parent handler.
    function handleClick(event) {
        let splitId = event.target.id.split('-');
        let id = splitId[splitId.length - 1];
        parentOnDeleteClickHandler(id);
    }

    return (
        <div id={`join-row${id}`} className="join-row">
            <button id={`joins-deleteButton-${id}`} className="delete-join-button" type="button"
                    onClick={handleClick}>
                X
            </button>
            <input id={`joins${id}.joinType`} hidden defaultValue={joinType}/>
                <select id={`joins${id}.parentTable`}>
                    <option value="null"></option>
                </select>
            <img id={`joins${id}.image`} src={joinImageUrl}/>
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