<!-- This is readme file. -->

# D3 Data-Driven Document

## What is D3

D3.js is a JavaScript library for manipulating documents based on data.

* Github: <https://github.com/d3/d3>
* API: <https://github.com/d3/d3/blob/master/API.md>
* Link: `<script src="https://d3js.org/d3.v5.min.js"></script>`  

***

## Introduction

D3 allows you to bind arbitrary data to a Document Object Model (**DOM**), and then apply data-driven transformations to the document.  

><img src="resources/1200px-DOM-model.svg.png" align="left" hspace="10" vspace="6" height="180">
> The Document Object Model (DOM) is a cross-platform and language-independent interface that treats an XML or HTML document as a tree structure wherein each node is an object representing a part of the document. The DOM represents a document with a logical tree. Each branch of the tree ends in a node, and each node contains objects. DOM methods allow programmatic access to the tree; with them one can change the structure, style or content of a document. Nodes can have event handlers attached to them. Once an event is triggered, the event handlers get executed.

`w3.org` has said something about [W3C stuffs: like DOM, CSS, ...](http://w3.org/TR/?tag=dom).

For example, you can **use D3 to generate an HTML table from an array of numbers** (See [Create_HTML_table_example](./Create_HTML_table_using_d3js_and_JSONCreate_HTML_Table/index.html). You may have to run it by node since it calls local json file).  

Or, use the same data to create an **interactive SVG bar chart with smooth transitions and interaction** (See [Interactive_SVG_bar_example](./Interactive_SVG_bar_chart/using_d3/index.html)).

***

## SVG

> <img src="resources/svg.png" align="left" hspace="10">
> **Scalable Vector Graphics (SVG)** is an XML-based markup language for describing two dimensional based  vector graphics. SVG is essentially to graphics what HTML is to text.  
> SVG is a text-based open Web standard. It is explicitly designed to work with other web standards such as CSS, DOM, and SMIL.  
> SVG images and their related behaviors are defined in XML text files which means they can be searched, indexed, scripted and compressed. Additionally this means they can be created and edited with any text editor and with drawing software.  
> SVG is an open standard developed by the World Wide Web Consortium (W3C) since 1999.  
> Documents can be found in <https://developer.mozilla.org/en-US/docs/Web/SVG>
