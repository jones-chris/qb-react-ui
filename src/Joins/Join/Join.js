import React from 'react';
import './Join.css'

const Join = (props) => {
    let id = props.id;
    let joinType = props.joinType;
    let joinImageUrl = props.joinImageUrl;
    let parentOnDeleteClickHandler = props.parentOnDeleteClickHandler;
    let parentOnJoinImageClickHandler = props.parentOnJoinImageClickHandler;

    // Wrapper method to execute the parent handler.
    function onJoinDeleteClickHandler(event) {
        // let splitId = event.target.id.split('-');
        // let id = splitId[splitId.length - 1];
        let id = _getJoinId(event.target.id);
        parentOnDeleteClickHandler(id);
    }

    // Wrapper method to execute the parent handler.
    function onJoinImageClickHandler(event) {
        // let splitId = event.target.id.split('-');
        // let id = splitId[splitId.length - 1];
        let id = _getJoinId(event.target.id);
        parentOnJoinImageClickHandler(id);
    }

    function _getJoinId(joinHtmlElementId) {
        let splitId = joinHtmlElementId.split('-');
        return splitId[splitId.length - 1];
    }

    return (
        <div id={`join-row${id}`} className="join-row">
            <button id={`joins-deleteButton-${id}`} className="delete-join-button" type="button"
                    onClick={onJoinDeleteClickHandler}>
                X
            </button>

            <input id={`joins${id}.joinType`} hidden defaultValue={joinType}/>

            <select id={`joins${id}.parentTable`}>
                <option value="null"></option>
            </select>

            <img id={`joins-image-${id}`}
                 className="join-image"
                 src={joinImageUrl}
                 onClick={onJoinImageClickHandler}/>

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