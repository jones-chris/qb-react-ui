import React  from 'react';

const QueryTemplates = (props) => {
    // if (Object.keys(props).length === 0) {
    //     return null;
    // } else {
        return (
            <div id="queryTemplatesDiv" hidden={props.hidden === 'true'}>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>

                <select id="queryTemplates">
                    <option value="test">test</option>
                </select>
            </div>
        );
    // }
};

export default QueryTemplates;
