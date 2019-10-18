import React  from 'react';

const QueryTemplates = (props) => {
    if (Object.keys(props).length === 0) {
        return null;
    } else {
        return (
            <div id="queryTemplatesDiv" hidden={props.hidden === 'true'}>
                <select id="queryTemplates">
                    <option value="test">test</option>
                </select>
            </div>
        );
    }
};

export default QueryTemplates;