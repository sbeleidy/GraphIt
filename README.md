# GraphIt

Purpose: Allow anyone working on a project with SCSS to easily integrate a bar graph into their project. 

## How does this work?

```
barGraphIt("data.csv");
```

This will generate a simple bar graph with the default values at the body tag. The following are optional values that can be passed to the barGraphIt() function in a JSON variable as the second parameter. 

Ex: `barGraphIt("data.csv", {"where": "#myChart"});`

|Key|Type|Default| What it represents |
|---|----|-------|-------------------|
|w|Integer|500|Width in px |
|h|Integer|500|Height in px |
|where|String|"body"|HTML tag .class or #id where the graph should appear |
|dataValuesLessThanOne|Boolean|True|Whether the y axis should display as % or the numbers provided |
|margins|Array|[20,20,20,40]|Top, right, bottom, left margins |
|yLabel|String|"Values"|The label for the y axis |
|tickCount|Integer|10|The number of ticks on the y axis and grid if specified |
|createGrid|Boolean|True|Whether there shall be a horizontal grid on top of the graph |
|gridColor|String|"grey"|The color of the grid lines if they are to appear |

You can check out the [index.html](index.html) file for a running example.

## How do I set this up on my project?

You can use this by copying and importing the barGraph.scss and barGraph.js files into your relevant directories. You can then run the barGraphIt() function in a script tag on the page that will display the graph.


For ex:
 * SCSS
 	* Copy barGraph.scss into your scss directory
 	* Import barGraph into your main scss file
 	* Compile your scss 
 * JS
 	* Copy barGraph.js into your js directory
 	* Add the script tag in index.html linking to barGraph.js and d3.js: `<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js" charset="utf-8"></script>`
 	* Add the `barGraphIt(dataPath)` function in a script tag in index.html

See [index.html](index.html) file for an example.

## What SCSS variables are there?

####Colors
|Variable Name|Default| What it affects |
|-------------|-------|-----------------|
|$barcolor| #0288D1|The bars of the graph|
|$barHoverColor|#FF5722|The bars when hovered over|
|$textColor|#FFFFFF|The text of the graph|
|$axisColor|#212121|The axes' lines|
|$axisTextColor|#212121|The axes' text color|

#### Axis Labels
|Variable Name|Default| What it affects |
|-------------|-------|-----------------|
|$axisFont|$labelFont|The axis label fonts|
|$axisFontSize|1rem|The axis label font sizes|



