import { store } from "../index";

export const addCriterion = (parentId) => {
        // Copy the state's criteria to a new array.
        let newCriteria = [...store.getState().query.criteria];

        // Current query state for read only reference.
        let currentQueryState = store.getState().query;

        // Determine the id of the new criterion.  Assume we are adding a root criterion (id of 0).  Another way of thinking
        // about it is if parentId is null, then the new criterion id will be 0 (the top-most root).
        let id = 0;
        if (parentId !== null) {
            id = parentId + 1;
        }

        // Renumber all criterions' id and parentId that are greater than parentId.
        newCriteria.forEach(criterion => {
            if (criterion.id >= id) {
                criterion.id += 1;

                if (criterion.parentId !== null && criterion.parentId >= id) {
                    criterion.parentId += 1;
                }
            }
        });

        // Get the new criterion's level.  This will be the parent criterion's level plus 1.
        let level = 0;
        if (parentId !== null) {
            let parentCriterion = newCriteria.find(criterion => criterion.id === parentId);
            level = parentCriterion.metadata.level + 1;
        }

        // Determine the criterion's column.
        let column = null;
        if (currentQueryState.availableColumns.length > 0) {
            column = currentQueryState.availableColumns[0].tableName + '.' + currentQueryState.availableColumns[0].columnName;  // todo:  change this once qb4j accepts a column object.
        }

        // Instantiate a new criterion model with the id and parent id.
        let criterion = {
            id: id,
            parentId: parentId,
            conjunction: 'And',
            column: column,
            operator: 'equalTo',
            filter: '',
            metadata: {
                level: level
            }
        };

        // Add the new criterion to the criteria array.
        // todo:  add new criterion to certain index in array.
        newCriteria.splice(id, 0, criterion);

        return { type: 'ADD_CRITERIA', payload: { newCriteria: newCriteria } };
};
