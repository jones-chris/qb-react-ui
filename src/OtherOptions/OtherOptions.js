import React from 'react';
import './OtherOptions.css'

const OtherOptions = (props) => {
    return (
        <div id="otherOptionsDiv" className="other-options-div" hidden={props.hidden === 'true'}>
            <table className="other-options-table">
                <tbody>
                    <tr>
                        <td>Distinct / Unique Records Only</td>
                        <td>
                            <input id="distinct" type="checkbox"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Suppress Null Records</td>
                        <td>
                            <input id="suppressNulls" type="checkbox"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Limit Returned Records</td>
                        <td>
                            <select id="limit">
                                <option value="">No Limit</option>
                                <option value="10">10</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="500">500</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Offset Returned Records</td>
                        <td>
                            <select id="offset">
                                <option value="">No Offset</option>
                                <option value="10">10</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="500">500</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default OtherOptions;