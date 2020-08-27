// File: reuseable.js
// Coding: utf-8
// Re-useable functions

function toggle(obj) {
  // Switch display visibility of the [obj]
  // Return the visibility of the [obj]
  var display = true;
  if (obj.style.display != "none") {
    obj.style.display = "none";
    display = false;
  } else {
    obj.style.display = "block";
    display = true;
  }
  return display;
}

function replaceAll(str, src, des) {
  // Replace all [src] to [des] in [str]
  while (str.indexOf(src) != -1) {
    str = str.replace(src, des);
  }
  return str;
}

function find(str, wrapper) {
  // Find wrapped content in [str]
  // wrapper: Wrapper of target content
  // Return a set of foundings
  var set = new Set();
  var safe_j = 0;
  while (str.indexOf(wrapper) != -1) {
    str = str.substring(str.indexOf(wrapper) + 1);
    set.add(str.substring(0, str.indexOf(wrapper)));
    str = str.substring(str.indexOf(wrapper) + 1);

    // Safe loop
    safe_j += 1;
    if (safe_j > 100) {
      break;
    }
  }
  return set;
}

function stamp(str) {
  // Stamp on str
  var date = new Date();
  str = date.toLocaleString() + "\n\n" + str;
  return str;
}

function set2list(set) {
  // Convert [set] into array list
  // Return list
  var list = [];
  set.forEach((e) => {
    list[list.length] = e;
  });
  return list;
}
