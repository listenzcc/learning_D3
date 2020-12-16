// * Require flower.js
console.log(d3.version)

let width = 800
let height = 800
let padding = 100
let svg = d3.select('#canvas').append('svg')
let defs = svg.append('defs');
// let colors = ['LightPink', 'Peru', 'HotPink', 'DeepPink', 'RosyBrown'];
// let colors = cssColors
let colors = []
for (let c in cssColors) {
    colors.push(c)
}

/**
 * * Immediate Function
 * * Add radialGradient of shadow
 * @param defs is the defs section of the svg
 */
(function (defs) {
    let grad = defs.append('radialGradient')
        .attr('id', 'radialGradient-shadow')

    grad.append('stop')
        .attr('offset', '30%')
        .attr('stop-color', 'DarkSlateGray')
        .attr('stop-opacity', 0.5)

    grad.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', 'DarkSlateGray')
        .attr('stop-opacity', 0)
})(defs)

/**
 * * Add color into radialGradient
 * @param {dom} defs 
 * @param {string} color 
 */
let addColor = function (defs, color) {
    let id = 'radialGradient-crown-' + color
    if (document.getElementById(id) === null) {
        let grad = defs.append('radialGradient')
            .attr('id', id)

        grad.append('stop')
            .attr('offset', '10%')
            .attr('stop-color', color)
            .attr('stop-opacity', 0)

        grad.append('stop')
            .attr('offset', '80%')
            .attr('stop-color', color)
            .attr('stop-opacity', 0.8)

        grad.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', color)
            .attr('stop-opacity', 0.5)
    }
    return 'url(#' + id + ')'
}

/**
 * * Generate transform randomly,
 * * the generated transform is on the range between (0, 0) and (width, height) with padding
 */
let randomTransform = function () {
    let context =
        'translate('
        + d3.randomInt(padding, width - padding)()
        + ', '
        + d3.randomInt(padding, height - padding)()
        + ')'
    return context
}

for (let i = 0; i < 7; i++) {
    let color = colors[d3.randomInt(colors.length)()]
    let n_petals = d3.randomInt(4, 8)()
    flower = generate_flower(n_petals, 100, 0.5, 0.2, 0.2, color)

    // let transform =
    let g = svg.append('g').attr('class', 'flower')
        .attr('transform', randomTransform())

    g.append('g')
        .append('text')
        .text(color + ', ' + n_petals)

    g.append('g')
        .append('path')
        .attr('d', bezier(flower))
        .attr('fill', 'url(#radialGradient-shadow)')
        .attr('class', 'shadow')

    g.append('g')
        .selectAll('path')
        .data(flower)
        .enter()
        .append('path')
        .attr('d', function (d) {
            let xy = ang_rad_2_xy(d[0], d[1])
            return 'M0 0 ' + xy[0] + ' ' + xy[1]
        })
        .attr('stroke', function (d, i) {
            if (i % 2 === 0) {
                return undefined
            }
            return 'gray'
        })
        .attr('class', 'lines')
        .attr('opacity', 0.5)

    let fillUrl = addColor(defs, flower.color)
    g.append('g')
        .selectAll('path')
        .data([flower])
        .enter()
        .append('path')
        .attr('d', area)
        .attr('fill', fillUrl)
        .attr('class', 'crown')
        .attr('id', 'a#b')

}