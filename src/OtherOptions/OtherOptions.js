import React from 'react';
import './OtherOptions.css'
import { Subscribe } from 'unstated';
import QueryStateContainer from "../StateContainer/QueryStateContainer";

const OtherOptions = (props) => {
    return (
        <div id="otherOptionsDiv" className="other-options-div" hidden={props.hidden === 'true'}>
            <table className="other-options-table">
                <tbody>
                    <tr>
                        <td>Distinct / Unique Records Only</td>
                        <td>

                            <Subscribe to={[QueryStateContainer]}>
                                {queryStateContainer => (
                                    <input id="distinct"
                                           type="checkbox"
                                           onClick={(event) => queryStateContainer.setDistinct(event.target.checked)}/>
                                )}
                            </Subscribe>

                        </td>
                    </tr>
                    <tr>
                        <td>Suppress Null Records</td>
                        <td>

                            <Subscribe to={[QueryStateContainer]}>
                                {queryStateContainer => (
                                    <input id="suppressNulls"
                                           type="checkbox"
                                           onClick={(event) => queryStateContainer.setSuppressNulls(event.target.checked)}
                                    />
                                )}
                            </Subscribe>

                        </td>
                    </tr>
                    <tr>
                        <td>Limit Returned Records</td>
                        <td>

                            <Subscribe to={[QueryStateContainer]}>
                                {queryStateContainer => (
                                    <select id="limit"
                                            onChange={(event) => queryStateContainer.setLimit(event.target.value)}>
                                        <option value="">No Limit</option>
                                        <option value="10">10</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                        <option value="500">500</option>
                                    </select>
                                )}
                            </Subscribe>

                        </td>
                    </tr>
                    <tr>
                        <td>Offset Returned Records</td>
                        <td>

                            <Subscribe to={[QueryStateContainer]}>
                                {queryStateContainer => (
                                    <select id="offset"
                                            onChange={(event) => queryStateContainer.setOffset(event.target.value)}>
                                        <option value="">No Offset</option>
                                        <option value="10">10</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                        <option value="500">500</option>
                                    </select>
                                )}
                            </Subscribe>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default OtherOptions;