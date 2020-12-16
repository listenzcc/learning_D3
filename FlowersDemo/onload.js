console.log(d3.version)

/**
 * * Generate flower parameters,
 * * recommended useful is: generate_flower(5, 100, 0.5, 0.2, 0.2, 'HotPink')
 * @param n_petals is the number of petals
 * @param radius is the radius / size of the flower
 * @param radius_ratio is the proportion of radius between core(inner) and petals(outer)
 * @param std_angle_ratio is the std. of variance of the angles of petals as the proportion
 * @param std_radius_ratio is the std. of variance of the radius of each petals as the proportion
 * @param color is the color of the flower.
 */
function generate_flower(n_petals, radius, radius_ratio, std_angle_ratio, std_radius_ratio, color) {
    // Prepare parameters
    let n = n_petals + n_petals - 1 + 1
    let seg = 360 / n
    let R = radius
    let r = R * radius_ratio
    let rnd_ang = d3.randomNormal(0, seg * std_angle_ratio)
    let rnd_rad = d3.randomNormal(0, radius * std_radius_ratio)

    // Generate nodes array
    let nodes = []
    nodes['keys'] = []

    // Add nodes for angle and radius
    for (let i = 0; i < n; i++) {
        let _r = r
        if (i % 2 === 0) {
            _r = R
        }

        let ang = seg * i + rnd_ang()
        ang = (ang / 180) * Math.PI
        let rad = _r + rnd_rad()
        nodes[i] = [ang, rad]
    }

    // Add color to nodes
    nodes['color'] = color

    // Return generated nodes
    return nodes
}

/**
 * * Convert rad, ang into x, y coordinates,
 * @param ang is the angle value
 * @param rad is the radius value,
 */
function ang_rad_2_xy(ang, rad) {
    let x = rad * Math.cos(ang)
    let y = rad * Math.sin(ang)
    return [x, y]
}

let svg = d3.select('#canvas').append('svg')
let width = 800
let height = 800
let padding = 100
let color = 'LightPink'

let defines = function (svg) {
    let defs = svg.append('defs')
    let grad

    grad = defs.append('radialGradient')
        .attr('id', 'radialGradient-crown')

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

    grad = defs.append('radialGradient')
        .attr('id', 'radialGradient-shadow')

    grad.append('stop')
        .attr('offset', '30%')
        .attr('stop-color', 'DarkSlateGray')
        .attr('stop-opacity', 0.5)

    grad.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', 'DarkSlateGray')
        .attr('stop-opacity', 0)
}

defines(svg)

let area = d3
    .areaRadial()
    .angle((d) => d[0])
    .innerRadius(0)
    .outerRadius((d) => d[1])
    .curve(d3.curveBasisClosed)
// .curve(d3.curveCatmullRomClosed)
// .curve(d3.curveCardinalClosed)


let bezier = function (d) {
    console.log(d)
    let path = d3.path()
    for (let i = 0; i < d.length - 1; i++) {
        let xy0 = ang_rad_2_xy(d[i][0], d[i][1])
        let xy1 = ang_rad_2_xy(d[i + 1][0], d[i + 1][1])
        let r = 0.3
        if (i === 0) {
            path.moveTo(xy0[0], xy0[1])
        }
        path.bezierCurveTo(
            xy0[0] + xy1[0] * r, xy0[1] + xy1[1] * r,
            xy1[0] + xy0[0] * r, xy1[1] + xy0[1] * r,
            xy1[0], xy1[1])
    }
    return path.toString()
}

for (let i = 0; i < 5; i++) {
    flower = generate_flower(5, 100, 0.5, 0.2, 0.2, 'HotPink')
    console.log(flower)

    let g = svg.append('g').attr('class', 'flower')
    let transform =
        'translate('
        + d3.randomInt(padding, width - padding)()
        + ', '
        + d3.randomInt(padding, width - padding)()
        + ')'

    g.append('g')
        .attr('transform', transform)
        .append('path')
        .attr('d', bezier(flower))
        // .attr('opacity', 0.5)
        .attr('fill', 'url(#radialGradient-shadow)')
        .attr('class', 'shadow')

    g.append('g')
        .attr('transform', transform)
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

    g.append('g')
        .attr('transform', transform)
        .selectAll('path')
        .data([flower])
        .enter()
        .append('path')
        .attr('d', area)
        .attr('fill', 'url(#radialGradient-crown)')
        .attr('class', 'crown')
        .attr('id', 'a#b')
}