export function getJdbcSqlType(jdbcSqlTypeInt) {
    if (jdbcSqlTypeInt === 2003) { return 'array' }
    else if (jdbcSqlTypeInt === -5) { return 'big int' }
    else if (jdbcSqlTypeInt === -2) { return 'binary' }
    else if (jdbcSqlTypeInt === -7) { return 'bit' }
    else if (jdbcSqlTypeInt === 2004) { return 'blob' }
    else if (jdbcSqlTypeInt === 16) { return 'boolean' }
    else if (jdbcSqlTypeInt === 1) { return 'char' }
    else if (jdbcSqlTypeInt === 2005) { return 'clob' }
    else if (jdbcSqlTypeInt === 70) { return 'data link' }
    else if (jdbcSqlTypeInt === 91) { return 'date' }
    else if (jdbcSqlTypeInt === 3) { return 'decimal' }
    else if (jdbcSqlTypeInt === 2001) { return 'distinct' }
    else if (jdbcSqlTypeInt === 8) { return 'double' }
    else if (jdbcSqlTypeInt === 6) { return 'float' }
    else if (jdbcSqlTypeInt === 4) { return 'integer' }
    else if (jdbcSqlTypeInt === -16) { return 'longnvarchar' }
    else if (jdbcSqlTypeInt === -1) { return 'longvarchar' }
    else if (jdbcSqlTypeInt === -15) { return 'nchar' }
    else if (jdbcSqlTypeInt === 2) { return 'numeric' }
    else if (jdbcSqlTypeInt === -9) { return 'nvarchar' }
    else if (jdbcSqlTypeInt === 5) { return 'small int' }
    else if (jdbcSqlTypeInt === 92) { return 'time' }
    else if (jdbcSqlTypeInt === 2013) { return 'time with timezone' }
    else if (jdbcSqlTypeInt === 93) { return 'timestamp' }
    else if (jdbcSqlTypeInt === 2014) { return 'timestamp with timezone' }
    else if (jdbcSqlTypeInt === -6) { return 'tiny int' }
    else if (jdbcSqlTypeInt === 12) { return 'varchar' }
    else if (jdbcSqlTypeInt === -15) { return 'nchar' }
    else if (jdbcSqlTypeInt === -15) { return 'nchar' }
    else if (jdbcSqlTypeInt === -15) { return 'nchar' }
    else if (jdbcSqlTypeInt === -15) { return 'nchar' }
    else { console.log('Did not recognize sql type') }
}

export function getSelectedOptions(selectElement) {
    const options = selectElement.options;

    let selectedOptions = [];
    for (let i=0; i<options.length; i++) {
        let option = options[i];
        if (option.selected) {
            selectedOptions.push(option.value);
        }
    }

    return selectedOptions;
}
