const http = require('http');
var request = require('request');
var d3 = require('d3');
var margin = {top: 80, right: 20, bottom: 30, left: 160},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// setup x
var xValue = function(d) { return d.followers;}, // data -> value
    xMap = d3.scaleLinear().range([0, width]), // value -> display
    xAxis = d3.axisBottom(xMap);

// setup y
var yValue = function(d) { return d.repo_count;}, // data -> value
    yMap = d3.scaleLog().range([height, 0]),//.tickFormat(4,d3.format(",d")(d)), // value -> display
    yAxis = d3.axisLeft(yMap);

// setup fill color
var cValue = function(d) { return d.Manufacturer;},
    color = d3.scaleOrdinal(d3.schemeCatagory10);

var username = function(d) { return d.login;};
// add the graph canvas to the body of the webpage
var svg = d3.select("body")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(20,20)");

// add the tooltip area to the webpage
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// load data

var options = {
  url: 'http://localhost:3000/api/users',
  headers: {
    'Access-Control-Allow-Origin': '*', //Allow GET Requests to all domains
    'Access-Control-Allow-Methods': 'GET'
  }
};

request(options, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred

  var jsonData = JSON.parse(body);
  for (var i = 0; i < jsonData.length; i++) {
      var counter = jsonData[i];
  }
          var mostFollowers = d3.max(jsonData.map((item) => {
               //console.log("\n" + JSON.stringify(item));
              return item.followers;
          }));
          var leastFollowers = d3.min(jsonData.map((item) => {
              return item.followers;
          }));

          xMap.domain([leastFollowers, mostFollowers]);
          yMap.domain([1, d3.max(jsonData, (d) => {
              return d.repo_count;
          })  + 1]);

          // x-axis
          svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis)
            .append("text")
              .attr("class", "label")
              .attr("x", width)
              .attr("y", -6)
              .style("text-anchor", "end")
              .text("Followers");

          // y-axis
          svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)
            .append("text")
              .attr("class", "label")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Number of Repos");

var engineer = svg.selectAll(".dot")
          .data(jsonData)
        .enter().append("g")
          .attr("class", "dot")
          .attr("x", (d) => { return xMap(d.followers); })
          .attr("y", (d) => { return yMap(d.repo_count); });

      engineer.append("circle")
          .attr("cx", (d) => { return xMap(d.followers); })
          .attr("cy", (d) => { return yMap(d.repo_count); })
          .attr("r", 3.5)
          //call the functions
          .on("mouseover", function(d) {
              tooltip.transition()
                   .duration(200)
                   .style("opacity", .9);
              tooltip.html(username(d) + "<br/> (" + xValue(d)
    	        + ", " + yValue(d) + ")")
                   .style("left", (d3.event.pageX + 5) + "px")
                   .style("top", (d3.event.pageY - 28) + "px");
          })
          .on("mouseout", function(d) {
              tooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
          });

  // draw legend
  var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  // draw legend colored rectangles
  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  // draw legend text
  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d;})
// });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
