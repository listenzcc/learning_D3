window.onload=function(){
    console.log('draw_svg.js starts.')
    
    // Wrong useage of d3.json, since d3.json is asynchronous.
    // const sample = d3.json("sample.json")
    // console.log(sample)

    d3.json("sample.json").then(function(sample) {
        console.log('d3.json starts.')
        draw_sample(sample)
    })
    
    function draw_sample(sample) {
        // Draw sample function
        console.log('--')
        console.log(sample)
        console.log('--')
        // Add svg in #container div
        const svg= d3.select('#container').append('svg');
        console.log(svg)
        
        // Four direction margin
        const margin = 80;
        // Size of chart
        const width = 1000 - 2 * margin;
        const height = 600 - 2 * margin;
        // Chart position
        const chart = svg.append('g')
        .attr('transform', `translate(${margin}, ${margin})`);
        // X ticks follow language names
        const xScale = d3.scaleBand()
        .range([0, width])
        .domain(sample.map((s) => s.language))
        .padding(.4) // Bar padding is 0.4, means it will cover 1 - 0.4 range between languages scale

        // Y ticks are linear seperated
        // Mapping is reversed, since the coordinates of y axis is bottom-up for web user.
        const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 100]);
        
        // Vertical grid lines generator
        // const makeXLines = () => d3.axisBottom()
        //   .scale(xScale)
        
        // Horizon grid lines generator
        // Function axisLeft() creates left vertical axis.
        // On usage, set large tickSize to simulate grid lines.
        const makeYLines = () => d3.axisLeft()
        .scale(yScale)
        
        // Draw x axis
        chart.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));
        // Draw y axis
        chart.append('g')
        .call(d3.axisLeft(yScale));

        // vertical grid lines
        // chart.append('g')
        //   .attr('class', 'grid')
        //   .attr('transform', `translate(0, ${height})`)
        //   .call(makeXLines()
        //     .tickSize(-height, 0, 0)
        //     .tickFormat('')
        //   )
        
        // Horizon grid lines
        chart.append('g')
        .attr('class', 'grid')
        .call(makeYLines()
        .tickSize(-width, 0, 0) // Set tick size, negative means tick is on right-hand of y axis.
        .tickFormat('') // Set tick legend format
        )

        // Adding barGroups group and bound it with sample data
        // SelectAll with no input returns an empty child-set of chart, ready for add the new barGroups
        const barGroups = chart.selectAll()
        .data(sample)
        .enter()
        .append('g')
        
        // Add rects into barGroups to generate bar graph
        barGroups
        .append('rect')
        // .attr('class', 'bar')
        .attr('fill', (g) => g.color)
        .attr('x', (g) => xScale(g.language))
        .attr('y', (g) => yScale(g.value)) // Drawing starts on top of the bar
        .attr('height', (g) => height - yScale(g.value)) // Output of yScale(g.value) = height - scaled true value, positive value means the bar is drawn downward
        .attr('width', xScale.bandwidth())

        // Add mouse enter event handler
        .on('mouseenter', function (actual, i) {
            console.log(actual)
            // Stop display .value
            d3.selectAll('.value')
            .attr('opacity', 0)
            
            // Animination on this bar
            d3.select(this)
            .transition() // Start animation
            .duration(300) // 300 ms
            .attr('opacity', 0.6) // Vanish to opacity 0.6
            .attr('x', (a) => xScale(a.language) - 5) // Transit x position for fitting width expand
            .attr('width', xScale.bandwidth() + 10) // Width expand
            
            const y = yScale(actual.value)
            
            // Add up limit line
            line = chart.append('line')
            .attr('id', 'limit')
            .attr('x1', 0)
            .attr('y1', y)
            .attr('x2', width)
            .attr('y2', y)
            
            // Add divergence on each other bar
            barGroups.append('text')
            .attr('class', 'divergence')
            .attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
            .attr('y', (a) => yScale(a.value) - 10) // text location
            .attr('fill', 'white') // text fill color
            .attr('text-anchor', 'middle') // text anchor
            .text((a, idx) => {
                // Compute divergence
                const divergence = (a.value - actual.value).toFixed(1)
                
                // Formate of text is +/-xx.x%
                let text = ''
                if (divergence > 0) text += '+' // Add + for positive divergence
                text += `${divergence}%`
                
                // Only print on other bars
                return idx !== i ? text : '';
            })
            
        })
        
        // Add mouse leave event handler
        .on('mouseleave', function () {
            // Restore display .value
            d3.selectAll('.value')
            .attr('opacity', 1)
            
            // Restore every bar
            d3.select(this)
            .transition()
            .duration(300)
            .attr('opacity', 1)
            .attr('x', (a) => xScale(a.language))
            .attr('width', xScale.bandwidth())
            
            // Remove up limit and divergence
            chart.selectAll('#limit').remove()
            chart.selectAll('.divergence').remove()
        })

        // Add values on top of every bar
        barGroups 
        .append('text')
        .attr('class', 'value')
        .attr('pointer-events', 'none') // Set text not interact with mouse events
        .attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
        .attr('y', (a) => yScale(a.value) - 10)
        .attr('text-anchor', 'middle')
        .text((a) => `${a.value}%`)
        
        // Add x axis name
        svg
        .append('text')
        .attr('class', 'label')
        .attr('x', -(height / 2) - margin)
        .attr('y', margin / 2.4)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text('Love meter (%)')
        
        // Add y axis name
        svg.append('text')
        .attr('class', 'label')
        .attr('x', width / 2 + margin)
        .attr('y', height + margin * 1.7)
        .attr('text-anchor', 'middle')
        .text('Languages')
        
        // Add chart title
        svg.append('text')
        .attr('class', 'title')
        .attr('x', width / 2 + margin)
        .attr('y', 40)
        .attr('text-anchor', 'middle')
        .text('Most loved programming languages in 2018')
        
        // Add footnote
        svg.append('text')
        .attr('class', 'source')
        .attr('x', width - margin / 2)
        .attr('y', height + margin * 1.7)
        .attr('text-anchor', 'start')
        .text('Source: Stack Overflow, 2018')
    }
    
}