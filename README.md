<!-- This is readme file. -->

# D3 Data-Driven Document

# What is D3

D3.js is a JavaScript library for manipulating documents based on data.

* Github: [https://github.com/d3/d3](https://github.com/d3/d3)  
* API: [https://github.com/d3/d3/blob/master/API.md](https://github.com/d3/d3/blob/master/API.md)
* Link: `<script src="https://d3js.org/d3.v5.min.js"></script>`  

# Introduction

D3 allows you to bind arbitrary data to a Document Object Model (**DOM**), and then apply data-driven transformations to the document.  

><img src="resources/1200px-DOM-model.svg.png" align="left" hspace="10" vspace="6" height="180">
> The Document Object Model (DOM) is a cross-platform and language-independent interface that treats an XML or HTML document as a tree structure wherein each node is an object representing a part of the document. The DOM represents a document with a logical tree. Each branch of the tree ends in a node, and each node contains objects. DOM methods allow programmatic access to the tree; with them one can change the structure, style or content of a document. Nodes can have event handlers attached to them. Once an event is triggered, the event handlers get executed.

`w3.org` has said something about [W3C stuffs: like DOM, CSS, ...](http://w3.org/TR/?tag=dom).

For example, you can `use D3 to generate an HTML table from an array of numbers` (See [this example](./Create_HTML_table_using_d3js_and_JSONCreate_HTML_Table/index.html) You may have to run it by node since it calls local json file).  
Or, use the same data to create an interactive SVG bar chart with smooth transitions and interaction.