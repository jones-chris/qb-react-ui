import React, { Component } from 'react';

class QueryState extends Component {

    constructor(props) {
        super(props);

        this.state = {
            availableSchemas: [],
            selectedSchemas: []
        };
    }

    updateAvailableSchemas(newAvailableSchemas) {

    }

    render() {
        return (
            <p hidden={true}></p>
        );
    }

}

export default QueryState;
