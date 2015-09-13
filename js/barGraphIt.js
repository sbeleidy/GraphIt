// Credits
// Bar Graph: mbostock from http://bl.ocks.org/mbostock/3885304
// Grids: arete from http://stackoverflow.com/questions/15580300/proper-way-to-draw-gridlines

/**
 * Generates a bargraph with the desired color styling from beleidyBarGraph.scss
 * @param  {string} dataPath  - the path to the data.csv file
 * @param  {JSON} vals - optional values for creating the bar graph
 * [	{int}		500				w = width in px
 * 		{int} 		500				h = height in px
 * 		{string}	"body"			where = tag .class or #id where the graph should appear (useful in case of overriding CSS for multiple graphs)
 * 		{boolean}	true			dataValuesLessThanOne = whether the y axis should display as % or the numbers provided
 * 		{array}		[20,20,20,40]	margins = top, right, bottom, left margins
 * 		{string}	"Values"		yLabel = the label for the y axis
 * 		{int}		10				tickCount = the number of ticks on the y axis and grid if specified (x axis is defined by the data)
 * 		{boolean}	true			createGrid = whether there shall be a horizontal grid on top of the graph
 * ]
 * @return {NaN}
 */
function barGraphIt(dataPath, vals){
	// Default values 
	var vals = typeof vals !== 'undefined' ? vals : {},
		w = typeof vals["w"] !== 'undefined' ? vals["w"] : 500,
		h = typeof vals["h"] !== 'undefined' ? vals["h"] : 500,
		where = typeof vals["where"] !== 'undefined' ? vals["where"] : "body",
		dataValuesLessThanOne = typeof vals["dataValuesLessThanOne"] !== 'undefined' ? vals["dataValuesLessThanOne"] : true,
		margins = typeof vals["margins"] !== 'undefined' ? vals["margins"] : [20,20,20,40],
		yLabel = typeof vals["yLabel"] !== 'undefined' ? vals["yLabel"] : "Values",
		tickCount = typeof vals["tickCount"] !== 'undefined' ? vals["tickCount"] : 10,
		createGrid = typeof vals["createGrid"] !== 'undefined' ? vals["createGrid"] : true;

	if (dataValuesLessThanOne){
		var yAxis = "%";
	} else{
		var yAxis = "1";
	}

	// Define margins
	var margin = {top: margins[0], right: margins[1], bottom: margins[2], left: margins[3]},
    width = w - margin.left - margin.right,
    height = h - margin.top - margin.bottom;

    // Define x bounds
	var x = d3.scale.ordinal()
	    .rangeRoundBands([0, width], .1);

	// Define y bounds
	var y = d3.scale.linear()
	    .range([height, 0]);

	// Define x axis and orientation
	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom");

	// Define y axis and orientation
	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left")
	    .ticks(tickCount, "%");

	// add the tooltip area to the webpage
		var tooltip = d3.select(where).append("div")
				.attr("class", "tooltip")
				.style("opacity", 0);

	// Select svg 
	var svg = d3.select(where).append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// Get the data and start using it
	d3.csv(dataPath, function(error, data) {
		if (error) throw error;

		var headerNames = d3.keys(data[0]);

		x.domain(data.map(function(d) { return d[headerNames[0]]; }));
		y.domain([0, d3.max(data, function(d) { return d[headerNames[1]]; })]);

		svg.append("g")
	    	.attr("class", "x axis")
	    	.attr("transform", "translate(0," + height + ")")
	    	.call(xAxis);

		svg.append("g")
	    		.attr("class", "y axis")
	    		.call(yAxis)
	    	.append("text")
	    		.attr("transform", "rotate(-90)")
	    		.attr("y", 5)
	    		.attr("dy", ".71em")
	    		.style("text-anchor", "end")
	    		.text(yLabel);

		// Add the bar graph
		svg.selectAll(".bar")
	    		.data(data)
	    	.enter().append("rect")
	    		.attr("class", "bar")
	    		.attr("x", function(d) { return x(d[headerNames[0]]); })
	    		.attr("width", x.rangeBand())
	    		.attr("y", function(d) { return y(d[headerNames[1]]); })
	    		.attr("height", function(d) { return height - y(d[headerNames[1]]); })
	    		.on("mouseover", function(d) {
						tooltip.transition()
								 .duration(200)
								 .style("opacity", .9);
						tooltip.html(d[headerNames[0]] + "<br/>" + d[headerNames[1]])
								 .style("left", (d3.event.pageX + 5) + "px")
								 .style("top", (d3.event.pageY - 28) + "px");
				})
				.on("mouseout", function(d) {
						tooltip.transition()
								 .duration(500)
								 .style("opacity", 0);
				});

		// Create a grid
		if (createGrid) {

				// svg.append("g")         
    //     			.attr("class", "grid")
			 //        .attr("transform", "translate(0," + height + ")")
			 //        .call(xAxis
			 //            .tickSize(-height, 0, 0)
			 //            .tickFormat("")
			 //        )

			    svg.append("g")         
			        .attr("class", "grid")
			        .call(yAxis
			            .tickSize(-width, 0, 0)
			            .tickFormat("")
			        )
							
			}
	});
}