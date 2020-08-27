// File: onload.js
// Coding: utf-8
// The script should be operated on load,
// to set up default configurations.

// Setup default values
document.getElementById("ta_template").innerHTML =
  "`Name` 同学，您好：\n 感谢您对自动化研究所何晖光老师团队的关注。\n 请您于 `Date` 参加线上面试，面试软件为腾讯会议，会议 ID 为 `ID`。\n\n 此致\n";

// Parse template
parse_template();

// Generate output
generate_output();
