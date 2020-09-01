// File: reuseable.js
// Aim: Re-use-able tools in JavaScript

function mk_url(url) {
  // Make sure [url] is a valid URL

  if (url.startsWith("https://")) {
    // It seems all right
    return url;
  }

  if (url.startsWith("http://")) {
    // Hope you know what you are doing
    return url;
  }

  // Try to correct it
  return "https://" + url;
}

function int(n) {
  // Convert [n] in to Integer
  return n - (n % 1);
}
