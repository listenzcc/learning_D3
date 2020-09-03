// File: private.js
// Aim: Private toolbox

function parent(obj) {
  // Get the parent element
  return obj.parentElement;
}

function refresh_column(obj) {
  // Refresh the iframe behind [obj]
  console.log("Refresh -------------------");
  console.log(obj);

  // It should be a div.Column
  let column = parent(obj);
  let input = column.getElementsByTagName("input")[0];
  let iframe = column.getElementsByTagName("iframe")[0];

  // Get value as URL
  input.value = mk_url(input.value);
  var url = input.value;

  // Refresh the iframe behind
  iframe.src = "about:blank";
  iframe.src = mk_url(url);
}

function close_column(obj) {
  // Close the column
  console.log("Close --------------------");
  console.log(obj);

  let column = parent(obj);
  column.remove();

  // Re-size current columns
  let columns = document.getElementsByClassName("Column");
  resize_columns(columns, -1);
}

function new_column(obj) {
  // Append new column
  console.log("New column ------------------------");
  console.log(obj);

  // Get value as URL
  obj.value = mk_url(obj.value);
  var url = obj.value;

  // Append new column
  let div = d3.select("div.Layout");
  let column = div.append("div").attr("class", "Column");
  // .attr("style", "width: " + width);

  // Append <input> into column
  let input = column
    .append("input")
    .attr("type", "text")
    .attr("class", "URL")
    .attr("value", url)
    .attr("onchange", "refresh_column(this)");

  // Append <button> into column
  // Refresh button
  column.append("button").text("R").attr("onclick", "refresh_column(this)");
  // Close button
  column.append("button").text("X").attr("onclick", "close_column(this)");

  // Append <iframe> into column
  column.append("iframe").attr("class", "Inner");

  // Refresh the column
  refresh_column(input._groups[0][0]);

  // Resize columns
  let columns = document.getElementsByClassName("Column");
  resize_columns(columns, -1);
}

function resize_columns(columns, n) {
  // Resize [columns] as there [n] columns
  // n == -1 means auto compute column counts
  console.log("Resize columns ---------------");
  console.log(columns);

  if (n == -1) {
    n = columns.length;
  }

  var width = String(99 / n) + "%";
  for (var i = 0; i < columns.length; i++) {
    columns[i].style.width = width;
    columns[i].getElementsByTagName("iframe")[0].style.height =
      String(window.innerHeight - 120 - 40) + "px";
  }

  return width;
}
