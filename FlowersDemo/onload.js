console.log(d3.version);

/**
 * * Generate flower parameters,
 * * recommended useful is: generate_flower(5, 100, 0.5, 0.2, 0.2, 'HotPink')
 * @param n_petals is the number of petals;
 * @param radius is the radius / size of the flower;
 * @param radius_ratio is the proportion of radius between core(inner) and petals(outer);
 * @param std_angle_ratio is the std. of variance of the angles of petals as the proportion;
 * @param std_radius_ratio is the std. of variance of the radius of each petals as the proportion;
 * @param color is the color of the flower.
 */
function generate_flower(n_petals, radius, radius_ratio, std_angle_ratio, std_radius_ratio, color) {
    // Prepare parameters
    let n = n_petals + n_petals - 1;
    let seg = 360 / n;
    let R = radius;
    let r = R * radius_ratio;
    let rnd_ang = d3.randomNormal(0, seg * std_angle_ratio);
    let rnd_rad = d3.randomNormal(0, radius * std_radius_ratio);

    // Generate nodes array
    let nodes = [];
    nodes['keys'] = [];

    // Add nodes for angle and radius
    for (let i = 0; i < n; i++) {
        let _r = r;
        if (i % 2 === 0) {
            _r = R;
        }

        let ang = seg * i + rnd_ang();
        ang = (ang / 180) * Math.PI;
        let rad = _r + rnd_rad();
        nodes[i] = [ang, rad];
    }

    // Add color to nodes
    nodes['color'] = color;

    // Return generated nodes
    return nodes;
}

/** Convert rad, ang into x, y coordinates,
 * @param rad is the radius value,
 * @param ang is the angle value
 */
function rad_ang_2_xy(rad, ang) {
    let x = rad * Math.cos(ang);
    let y = rad * Math.sin(ang);
    return [x, y];
}

let svg = d3.select('#canvas').append('svg');
let width = 800;
let height = 800;
let padding = 100;

let area = d3
    .areaRadial()
    .angle((d) => d[0])
    .innerRadius(0)
    .outerRadius((d) => d[1])
    .curve(d3.curveBasisClosed);

flower = generate_flower(5, 100, 0.5, 0.2, 0.2, 'HotPink');
console.log(flower);

let g = svg.append('g').attr('class', 'flower');
let transform =
    'translate(' + d3.randomInt(padding, width - padding)() + ', ' + d3.randomInt(padding, width - padding)() + ')';

g.append('g')
    .attr('transform', transform)
    .selectAll('path')
    .data([flower])
    .enter()
    .append('path')
    .attr('d', area)
    .attr('stroke', 'gray')
    .attr('fill', (d) => d.color);

g.append('g')
    .attr('transform', transform)
    .selectAll('path')
    .data(flower)
    .enter()
    .append('path')
    .attr('d', function (d) {
        let xy = rad_ang_2_xy(d[1], d[0]);
        return 'M0 0 ' + xy[0] + ' ' + xy[1];
    })
    .attr('stroke', function (d, i) {
        if (i % 2 === 0) {
            return 'black';
        }
        return 'gray';
    });
