import React  from 'react';

const QueryTemplates = (props) => {
    if (Object.keys(props).length === 0) {
        return null;
    } else {
        let hiddenAsBoolean = (props.hidden === 'true');
        return (
            <div id="queryTemplatesDiv" hidden={hiddenAsBoolean}>
                <select id="queryTemplates">
                    <option value="test">test</option>
                </select>
            </div>
        );
    }
};

export default QueryTemplates;