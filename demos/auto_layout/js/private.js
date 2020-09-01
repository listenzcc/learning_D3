// File: private.js
// Aim: Private toolbox

function refresh(obj) {
  // Refresh the iframe behind [obj]
  console.log("Refresh -------------------");
  console.log(obj);

  // Get value as URL
  obj.value = mk_url(obj.value);
  var url = obj.value;

  // Refresh the iframe behind
  let column = obj.parentElement;
  let iframe = column.getElementsByTagName("iframe")[0];
  iframe.src = mk_url(url);
}

function resize_columns(columns, n) {
  // Resize [columns] as there [n] columns
  console.log("Resize columns ---------------");
  console.log(columns);

  var width = String(int(99 / n)) + "%";
  for (var i = 0; i < columns.length; i++) {
    columns[i].style.width = width;
  }

  return width;
}

function new_column(obj) {
  // Append new column
  console.log("New column ------------------------");
  console.log(obj);

  // Get value as URL
  obj.value = mk_url(obj.value);
  var url = obj.value;

  // Re-size current columns
  let columns = document.getElementsByClassName("Column");
  var n = columns.length;
  var width = resize_columns(columns, n + 1);

  // Append new column
  let div = d3.select("div.Layout");
  let column = div
    .append("div")
    .attr("class", "Column")
    .attr("style", "width: " + width);

  // Append <input> into column
  let input = column
    .append("input")
    .attr("type", "text")
    .attr("class", "URL")
    .attr("value", url)
    .attr("onchange", "refresh(this)");

  // Append <button> into column
  column.append("button").text("X").attr("onclick", "close_column(this)");

  // Append <iframe> into column
  column.append("iframe").attr("class", "Inner");

  // Refresh the column
  refresh(input._groups[0][0]);
}

function close_column(obj) {
  // Close the column
  console.log("Close --------------------");
  console.log(obj);

  let column = obj.parentElement;
  column.remove();

  // Re-size current columns
  let columns = document.getElementsByClassName("Column");
  var n = columns.length;
  resize_columns(columns, n);
}
