// File: private.js
// Coding: utf-8
// Private functions of the project,
// bounding to ../index.html

function template_onclick(obj) {
  // Switch visibility of template div
  // obj: The <p> tag of the template div
  let ta_temp = document.getElementById("ta_template");
  console.log(ta_temp);
  if (!toggle(ta_temp)) {
    obj.innerHTML = obj.innerHTML.replace("[-]", "[+]");
  } else {
    obj.innerHTML = obj.innerHTML.replace("[+]", "[-]");
  }
}

function get_replace() {
  // Get replacements with the inputs,
  // replace replacements dictionary
  var dict = [];
  let divs = document.getElementsByClassName("Keys");
  for (var i = 0; i < divs.length; i++) {
    k = divs[i].getElementsByTagName("p")[0].innerHTML;
    v = divs[i].getElementsByTagName("input")[0].value;
    dict[k] = v;
  }
  return dict;
}

function generate_output() {
  // Generate output text,
  // by replace the template with the inputs

  function replace(dict) {
    // Replace the template with the inputs,
    // write the replaced template to the output
    let ta_temp = document.getElementById("ta_template");
    let ta_outp = document.getElementById("ta_output");
    let string = ta_temp.value;
    Object.keys(dict).forEach(function (key) {
      string = replaceAll(string, "`" + key + "`", dict[key]);
    });
    ta_outp.value = string;
  }

  var dict = get_replace();
  console.log("Replacements: ");
  console.log(dict);
  replace(dict);
}

function parse_template() {
  // Parse content from template string
  let ta_temp = document.getElementById("ta_template");
  var replaces = set2list(find(ta_temp.value, "`"));
  console.log(replaces);

  // Clear existing keys
  let tmps = document.getElementsByClassName("Keys");
  for (var i = tmps.length - 1; i > -1; i--) {
    tmps[i].remove();
  }

  // Append new keys
  // Append divs
  let divs = d3
    .select("#keys_container")
    .selectAll("div")
    .data(replaces)
    .enter()
    .append("div")
    .attr("class", "Keys");

  // Append <p> for each div
  divs
    .data(replaces)
    .append("p")
    .text(function (d) {
      return d;
    });

  // Append <input> for each div
  divs.data(replaces).append("input").attr("onkeyup", "generate_output()");

  generate_output();
}

function log_output() {
  // Write output into history div
  let ta_outp = document.getElementById("ta_output");
  var data = [stamp(ta_outp.value)];
  d3.select("#history")
    .select("ol")
    .data(data)
    .append("li")
    .append("textarea")
    .attr("class", "History")
    .text(function (d) {
      return d;
    });
}
