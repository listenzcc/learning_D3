<!-- This is readme file. -->

# D3 Data-Driven Document

# What is D3

D3.js is a JavaScript library for manipulating documents based on data.  

* Github: [https://github.com/d3/d3](https://github.com/d3/d3)  
* Link: `<script src="https://d3js.org/d3.v5.min.js"></script>`  
* Download: [Download url](https://github.com/d3/d3/zipball/master)

# Introduction

D3 allows you to bind arbitrary data to a Document Object Model (DOM), and then apply data-driven transformations to the document.  

> ![DOM](/resources/1200px-DOM-model.svg.png "DOM")  
 The Document Object Model (DOM) is a cross-platform and language-independent interface that treats an XML or HTML document as a tree structure wherein each node is an object representing a part of the document. The DOM represents a document with a logical tree. Each branch of the tree ends in a node, and each node contains objects. DOM methods allow programmatic access to the tree; with them one can change the structure, style or content of a document. Nodes can have event handlers attached to them. Once an event is triggered, the event handlers get executed.

`w3.org` has everything you need to know about [DOM](http://w3.org/TR/?tag=dom).

For example, you can use D3 to generate an HTML table from an array of numbers.  
Or, use the same data to create an interactive SVG bar chart with smooth transitions and interaction.