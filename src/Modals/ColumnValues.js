import React from "react";

class ColumnValues extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="column-members-modal">

                <div id="columnMembersModalContent" className="column-members-modal-content">

                    <button type="button" className="column-members-modal-close-button"
                            // onClick="closeColumnMembers('cm-modal-${id}')"
                    >
                        X
                    </button>

                    <br/>

                    {/*<button type="button" id="cm-modal-${id}-add-subQuery" name="cm-modal-${id}-add-subQuery"*/}
                    {/*        className="column-members-modal-close-button"*/}
                    {/*        onClick="addSubQueryHTML('cm-modal-${id}-selectedMembers', 'cm-modal-${id}')"*/}
                    {/*>*/}
                    {/*    Add SubQuery*/}
                    {/*</button>*/}

                    {/*Search box area*/}
                    <div className="column-members-modal-search">
                        <label htmlFor="search">Search</label>
                        <input type="text" placeholder="ex: Cap%" autoFocus="autofocus"/>
                    </div>

                    {/*Limit and paging area*/}
                    <div className="column-members-modal-pagination">
                        <input type="text" hidden="hidden" value="0"/>

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
                    <div className="column-members-modal-members">
                        <div className="column-members-modal-available-members">
                            <label htmlFor="availableMembers">Available Column Members</label>
                            <select size="20" multiple="multiple">
                            </select>
                        </div>
                    </div>

                    <button type="button">
                        &#8594;
                    </button>
                </div>

                <div className="column-members-modal-selected-members">
                    <label htmlFor="selectedMembers">Selected Column Members</label>
                    <select size="20">
                    </select>
                </div>

                {/*Submission and Cancel button area*/}
                <div className="column-members-modal-submit">
                    <input type="button" value="OK"
                           onClick="setCriteriaFilterWithColumnMembers('cm-modal-${id}-selectedMembers', '${parentId}'); closeColumnMembers('cm-modal-${id}');"/>

                    <button type="button"
                            // onClick="closeColumnMembers('cm-modal-${id}')"
                    >
                        Cancel
                    </button>
                </div>
        );
    }

}

export default ColumnValues;
