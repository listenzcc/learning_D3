
d3.json('data.json').then(function(data, error) {

    function tabulate(data, columns) {
        console.log(data)
        console.log(columns);

        var table = d3.select('body').append('table')
        var thead = table.append('thead')
        var tbody = table.append('tbody');
        
        // append the header row
        thead.append('tr')
        .selectAll('th')
        .data(columns)
        .enter()
        .append('th')
        .text(function (column) { return column; });
        
        // create a row for each object in the data
        console.log(tbody) // Parent is [html.gr__localhost]
        console.log(tbody.selectAll('tr'))  // Parent is [tbody]
        var rows = tbody.selectAll('tr') // Select all 'tr' from tbody. It can return empty but empty here is necessary.
        .data(data) // Bound data on rows
        .enter()
        .append('tr');

        // create a cell in each row for each column
        var cells = rows.selectAll('td')
        .data(function (row) {
            console.log(row)
            // Does this mean dict must be mapped ?
            return columns.map(function (column) {
                console.log('    ' + column + row[column])
                // Return a dict object
                return {column: column, value: row[column]};
            });
        })
        .enter()
        .append('td')
        .text(function (d) { return d.value; });  // Only print value column
        
        return table;
    }

    // render the table(s)
    tabulate(data, ['date', 'close']); // 2 column table
    
});
