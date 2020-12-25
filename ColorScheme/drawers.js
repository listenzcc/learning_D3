function new_colorScheme_rect_hue_view(canvasName, offset, size, count) {
  let width = size[0];
  let height = size[1];
  let interpolate = d3.interpolateHslLong(
    d3.hsl(0, 1, 0.5),
    d3.hsl(360, 1, 0.5)
  );

  // Get svg
  let svg = d3.select(canvasName);
  if (svg._groups[0][0] == null) {
    console.log(
      "Failed on find the canvas of",
      canvasName,
      '"new_colorScheme_rect_hue_view" is doing nothing'
    );
    return;
  }

  // Init the layer
  svg
    .selectAll("#rect-hue-view")
    .data(["translate(" + offset[0] + "," + offset[1] + ")"])
    .enter()
    .append("g")
    .attr("id", "rect-hue-view")
    .attr("transform", (d) => d);

  let layer = svg.select("#rect-hue-view");

  let scale = d3.scaleLinear().domain([0, count]).range([0, height]);
  let scale_r = d3.scaleLinear().domain([0, height]).range([0, count]);

  let getColor = function (i) {
    let scale = d3.scaleLinear().domain([0, count]).range([0, 1]);
    return interpolate(scale(i));
  };

  // Setup color dataset
  let gratings = [];
  let _height = height / count;
  for (let i = 0; i < count; i++) {
    let table = {
      id: i,
      color: getColor(i),
      y: scale(i),
      height: _height,
    };
    gratings.push(table);
  }

  // Add gratings
  layer
    .append("g")
    .selectAll("rect")
    .data(gratings)
    .enter()
    .append("rect")
    .attr("fill", (d) => d.color)
    .attr("stroke", (d) => d.color)
    .attr("height", (d) => d.height)
    .attr("width", width)
    .attr("x", 0)
    .attr("y", (d) => d.y)
    .on("mouseover", function (event) {
      d3.select(this)
        .transition(10)
        .attr("width", width * 2);
      document.getElementById("input-2").value = scale_r(
        event.offsetY - offset[1]
      );
      input_onchange();
    })
    .on("mouseleave", function (event) {
      d3.select(this).transition(10).attr("width", width);
    });

  // Add arrow
  layer
    .append("g")
    .append("rect")
    .attr("id", "hue-position")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("height", 10)
    .attr("width", width)
    .attr("x", 0)
    .attr("y", 0 - 5);

  return gratings;
}

/**
 * * Refresh colorScheme of saturation(s) and lightness(l),
 * * in a rect view of HSL color space.
 * @params canvasName: The name of the canvas to draw;
 * @params offset: The offset of the rect in [x, y] pixels;
 * @params size: The size of the rect in [width, height] pixels;
 * @params color: The color with the full hue(h) value,
 *                which will be drawn on the right-top corner of the rect (full saturation and lightness);
 * @params count: The rect will be filled in 2-D linear-gradient manner,
 *                count is the number of the vertical narrow gratings,
 *                the bottom of the rect is colored with black (zero lightness),
 *                and the left-top corner will be colored with white (zero saturation and full lightness).
 */
function new_colorScheme_rect_sl_view(canvasName, offset, size, color, count) {
  let hue = d3.hsl(color).h;

  // Parse args
  let width = size[0];
  let height = size[1];

  // Get svg
  let svg = d3.select(canvasName);
  if (svg._groups[0][0] == null) {
    console.log(
      "Failed on find the canvas of",
      canvasName,
      '"new_colorScheme_rect_sl_view" is doing nothing'
    );
    return;
  }

  // Init the layer
  svg
    .selectAll("#rect-sl-view")
    .data(["translate(" + offset[0] + "," + offset[1] + ")"])
    .enter()
    .append("g")
    .attr("id", "rect-sl-view")
    .attr("transform", (d) => d);

  let layer = svg.select("#rect-sl-view");

  // Init the defs
  layer.selectAll("defs").data([undefined]).enter().append("defs");

  layer.selectAll("g").remove();
  layer.select("defs").selectAll("linearGradient").remove();

  // Draw rect on the layer
  layer
    .append("g")
    .append("rect")
    .attr("fill", "black")
    .attr("height", height)
    .attr("width", width);

  // Scale of gratings in horizontal(x-axis) direction
  let scale = d3.scaleLinear().domain([0, count]).range([0, width]);

  // Interpolate of color in vertical(y-axis) direction
  // let interpolate = d3.interpolateHsl("white", color);
  let interpolate1 = d3.interpolateHslLong(
    d3.hsl(hue, 0, 0),
    d3.hsl(hue, 0, 1)
  );
  let interpolate2 = d3.interpolateHslLong(
    d3.hsl(hue, 1, 0),
    d3.hsl(hue, 1, 1)
  );
  let getColor = function (i) {
    let scale = d3.scaleLinear().domain([0, count]).range([0, 1]);
    return [interpolate1(scale(i)), interpolate2(scale(i))];
  };

  // Setup color dataset
  let gratings = [];
  let _width = width / count;
  for (let i = 0; i < count; i++) {
    let table = {
      id: i,
      color: getColor(i),
      uniqueGradientId: "sl-view-linear-" + i,
      x: scale(i),
      width: _width,
    };
    gratings.push(table);
  }

  // Add linearGradient gratings
  layer
    .select("defs")
    .selectAll("linearGradient")
    .data(gratings)
    .enter()
    .append("linearGradient")
    .attr("id", (d) => d.uniqueGradientId)
    .attr("x1", "0.0")
    .attr("x2", "0.0")
    .attr("y1", "1.0")
    .attr("y2", "0.0")
    .selectAll("stop")
    .data((d) => [
      { color: d.color[0].toString(), offset: "0" },
      { color: d.color[1].toString(), offset: "1" },
    ])
    .enter()
    .append("stop")
    .attr("offset", (d) => d.offset)
    .attr("stop-color", (d) => d.color);

  // Add gratings
  layer
    .append("g")
    .selectAll("rect")
    .data(gratings)
    .enter()
    .append("rect")
    .attr("fill", (d) => "url(#" + d.uniqueGradientId + ")")
    .attr("stroke", (d) => "url(#" + d.uniqueGradientId + ")")
    .attr("width", (d) => d.width)
    .attr("height", height)
    .attr("x", (d) => d.x)
    .attr("y", 0)
    .exit()
    .remove();

  return gratings;
}
