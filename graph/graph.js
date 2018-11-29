var d3 = require("d3");

(function() {
var margin = {top: 60, left: 60, bottom: 60, right: 90}
var width = 700;
var height = 480;

//var ft = d3.time.format("%M:%S");

// var dataset =
// [
//     [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
//     [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
// ];

var x = d3.scale.linear()
        .range([ 0, width ]);

var y = d3.scale.linear()
        .range([ 0, height ]);

var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")

var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

var svg = d3.select ("#github-stats")
             .append ("svg")
             .attr   ("width", width + margin.left + margin.right)
             .attr   ("height", height + margin.top + margin.bottom)
             .attr   ('class', 'chart')

svg.append("rect")
    .attr   ("width", width + margin.left + margin.right)
    .attr   ("height", height + margin.top + margin.bottom)
    .attr   ("x", 0)
    .attr   ("y", 0)
    .attr   ("fill", "white")
    .attr   ("fill-opacity", 0.8);


//g is reference point for axes of the graph
svg = svg.append("g")
        .attr("transform", "translate( " + margin.left + "," + margin.top + ")");


    d3.json(url, (error, data) -> {
        if (error) {
            throw new Error("d3.json error");
        }
        else {
            var maximum = d3.min(data.map((item) -> {
                return ft.parse(item.Time);
            }));
            var minimum = d3.max(data.map((item) -> {
                return ft.parse(item.Time);
            }));


            //Set up the domain for the x and y axis
            x.domain([minimum, maximum]);
            y.domain([1, d3.max(data, (d) -> {
                return d.Place;
            }) + 1]);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0 " + height + ")")
                .call(xAxis)
                .append("text")
                .attr("transform", "translate(0 " + width + ", -30)")
                .attr("dy", "1.8em")
                .attr("text-anchor", "end")
                .text("Number of Followers");

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("dy", "-0.8em")
                .attr("text-anchor", "end")
                .text("Number of Commits");

            var engineer = svg.selectAll(".engineer")
                            .data(data)
                            .enter().append("g")
                            .attr("class", "engineer")
                            .attr("x", (d) => {
                                return x(d.Time);
                            })
                            .attr("y", (d) => {
                                return y(d.Place);
                            })
            //Draw the circles representing each engineer
            engineer.append("circle")
                .attr("cx", (d) => {
                    return x(d.Time);
                })
                .attr("cy", (d) => {
                    return y(d.Place);
                })
                .attr("r", 5)
                .attr("fill", #3A3A3A);
                //.on("mousehover", showTooltip)
                //.on("mouseout", hideTooltip)
                //.on("mouseclick", openEntry)


        } //End of else
    });

}());
