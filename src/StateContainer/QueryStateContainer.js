import {Container} from "unstated";

class QueryStateContainer extends Container {
    state = {
        name: '',
        columns: [],
        // schema: '',
        table: '',
        availableColumns: [],
        criteria: [],
        joins: [],
        distinct: false,
        groupBy: false,
        orderBy: false,
        limit: '',
        ascending: false,
        offset: '',
        suppressNulls: false,
        criteriaParameters: []
    };

    setName = (newName) => {
        const newState = Object.assign({}, this.state);
        newState.name = newName;
        return this.setState(newState);
    };

    setDistinct = (newDistinct) => {
        const newState = Object.assign({}, this.state);
        newState.distinct = newDistinct;
        return this.setState(newState);
    };

    setSuppressNulls = (newSuppressNulls) => {
        const newState = Object.assign({}, this.state);
        newState.suppressNulls = newSuppressNulls;
        return this.setState(newState);
    };

    setLimit = (newLimit) => {
        const newState = Object.assign({}, this.state);
        newState.limit = newLimit;
        return this.setState(newState);
    };

    setOffset = (newOffset) => {
        const newState = Object.assign({}, this.state);
        newState.offset = newOffset;
        return this.setState(newState);
    }

}

export default QueryStateContainer;
