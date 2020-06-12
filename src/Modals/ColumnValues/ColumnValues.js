import React from "react";
import './ColumnValues.css';

class ColumnValues extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div hidden={this.props.hidden === 'true'} className="column-members-modal">

                <div id="columnMembersModalContent" className="column-members-modal-content">

                    <button type="button" className="column-members-modal-close-button"
                        // onClick="closeColumnMembers('cm-modal-${id}')"
                    >
                        X
                    </button>

                    <br/>

                    {/*Search box area*/}
                    <div className="column-members-modal-search">
                        <label htmlFor="search">Search</label>
                        <input type="text" placeholder="ex: Cap%" autoFocus="autofocus"/>
                    </div>

                    {/*Limit and paging area*/}
                    <div className="column-members-modal-pagination">
                        <input type="text" hidden="hidden" defaultValue="0"/>

                        <label htmlFor="columnMembersLimit">Limit</label>
                        <select>
                            <option value="2">2</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>

                        <label htmlFor="columnMembersAscending">Ordering</label>
                        <select>
                            <option value="true">A-Z,1-9</option>
                            <option value="false">Z-A,9-1</option>
                        </select>

                        <br/>
                        <br/>

                        <button type="button" disabled
                            // onClick="getPageMembers('cm-modal-${id}', true)"
                        >
                            Prior Page
                        </button>

                        <button type="button"
                            // onClick="getPageMembers('cm-modal-${id}', false)"
                        >
                            Next Page
                        </button>
                    </div>

                    {/*Member selection area*/}
                    <div className='column-members-selection'>

                        <div className="column-members-modal-available-members">
                            <label htmlFor="availableMembers">Available Column Members</label>
                            <select multiple="" size="20"></select>
                        </div>

                        <div className="column-members-selection-button-div">
                            <button type="button" className="column-members-selection-button">→</button>
                        </div>

                        <div className="column-members-modal-selected-members">
                            <label htmlFor="selectedMembers">Selected Column Members</label>
                            <select size="20"></select>
                        </div>

                    </div>

                    {/*Submission and Cancel button area*/}
                    <div className="column-members-modal-submit">
                        <input type="button" value="OK" />
                        {/*onClick="setCriteriaFilterWithColumnMembers('cm-modal-${id}-selectedMembers', '${parentId}'); closeColumnMembers('cm-modal-${id}');"/>*/}

                        <button type="button"
                            // onClick="closeColumnMembers('cm-modal-${id}')"
                        >
                            Cancel
                        </button>
                    </div>

                </div>

            </div>
        );
    }

}

export default ColumnValues;
