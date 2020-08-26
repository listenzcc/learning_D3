// File: tools.js
// Coding: utf-8

function toggle(obj) {
    let display = true;
    if (obj.style.display != 'none') {
        obj.style.display = 'none';
        display = false;
    } else {
        obj.style.display = 'block';
        display = true;
    }
    return display
}

function template_onclick(obj) {
    let ta_temp = document.getElementById("ta_template");
    console.log(ta_temp);
    if (!toggle(ta_temp)) {
        obj.innerHTML = obj.innerHTML.replace("[-]", "[+]");
    } else {
        obj.innerHTML = obj.innerHTML.replace("[+]", "[-]");
    }
}

function auto_replace() {
    function get_replace() {
        var dict = [];
        let divs = document.getElementsByClassName("Keys");
        for (var i = 0; i < divs.length; i++) {
            k = divs[i].getElementsByTagName("p")[0].innerHTML;
            v = divs[i].getElementsByTagName("input")[0].value;
            dict[k] = v;
        }
        console.log(dict);
        return dict;
    }

    function replace(dict) {
        let ta_temp = document.getElementById("ta_template");
        let ta_outp = document.getElementById("ta_output");
        let string = ta_temp.value;
        Object.keys(dict).forEach(function(key) {
            string = string.replaceAll('{' + key + '}', dict[key]);
        })
        ta_outp.value = string;
    }

    let dict = get_replace();
    replace(dict)
}