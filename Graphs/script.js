function generatePie() {
    var data = [{
        "name": "Statistics",
        "children": [
            {
                "name": "Years",
                "children": [
                    {
                        "name": "Placements for 2002",
                        "children": [
                            { "name": "CHAMPION - Brazil"},
                            { "name": "RUNNER UP - Germany "},
                            { "name": "THIRD PLACE - Turkey"},
                            { "name": "Goals scored total on competition - 161"},
                            { "name": "AVG GOALS PER GAME - 2.5"}
                        ]
                    },
                    {
                        "name": "Placements for 2006",
                        "children": [
                            { "name": "CHAMPION - Italy"},
                            { "name": "RUNNER UP - France "},
                            { "name": "THIRD PLACE - Germany"},
                            { "name": "Goals scored total on competition - 147"},
                            { "name": "AVG GOALS PER GAME - 2.3"}
                        ]
                    },
                    {
                        "name": "Placements for 2010",
                        "children": [
                            { "name": "CHAMPION - Spain"},
                            { "name": "RUNNER UP - Netherlands "},
                            { "name": "THIRD PLACE - Germany"},
                            { "name": "Goals scored total on competition - 145"},
                            { "name": "AVG GOALS PER GAME - 2.3"}
                        ]
                    },
                    {
                        "name": "Placements for 2014",
                        "children": [
                            { "name": "CHAMPION - Germany"},
                            { "name": "RUNNER UP - Argentina "},
                            { "name": "THIRD PLACE - Netherlands"},
                            { "name": "Goals scored total on competition - 171"},
                            { "name": "AVG GOALS PER GAME - 2.7"}
                        ]
                    },
                    {
                        "name": "Placements for 2018",
                        "children": [
                            { "name": "CHAMPION - France"},
                            { "name": "RUNNER UP - Croatia"},
                            { "name": "THIRD PLACE - Belgium"},
                            { "name": "Goals scored total on competition - 169"},
                            { "name": "AVG GOALS PER GAME - 2.6"}
                        ]
                    }
                ]
            }
        ]
        
    }];

    var margin = { top: 0, right: 200, bottom: 20, left: 500 };
    var width = 750, height = 750;

    var i = 0, duration = 800;

    var tree = d3.layout.tree()
        .size([height, width]);

    var diagonal = d3.svg.diagonal()
        .projection(function (d) { return [d.y, d.x]; });

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var root = data[0];
    root.x0 = height / 2;
    root.y0 = 0;

    function collapse(d) {
        if (d.children) {
            d._children = d.children;
            d._children.forEach(collapse);
            d.children = null;
        }
    }

    root.children.forEach(collapse);
    update(root);

    d3.select(self.frameElement).style("height", "800px");

    function update(source) {

        var nodes = tree.nodes(root).reverse(),
            links = tree.links(nodes);


        nodes.forEach(function (d) { d.y = d.depth * 180; });
        var node = svg.selectAll("g.node")
            .data(nodes, function (d) { return d.id || (d.id = ++i); });
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function (d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
            .on("click", click);

        nodeEnter.append("circle")
            .attr("r", 1e-6)
            .style("fill", function (d) { return d._children ? "blue" : "#1fea18"; });

        nodeEnter.append("text")
            .attr("x", function (d) { return d.children || d._children ? -10 : 10; })
            .attr("dy", ".35em")
            .attr("text-anchor", function (d) { return d.children || d._children ? "end" : "start"; })
            .text(function (d) { return d.name; })
            .style("fill-opacity", 1e-6);


        var nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; });

        nodeUpdate.select("circle")
            .attr("r", 4.5)
            .style("fill", function (d) { return d._children ? "blue" : "#1fea18"; });

        nodeUpdate.select("text")
            .style("fill-opacity", 1);


        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function (d) { return "translate(" + source.y + "," + source.x + ")"; })
            .remove();

        nodeExit.select("circle")
            .attr("r", 1e-6);

        nodeExit.select("text")
            .style("fill-opacity", 1e-6);


        var link = svg.selectAll("path.link")
            .data(links, function (d) { return d.target.id; });


        link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", function (d) {
                var o = { x: source.x0, y: source.y0 };
                return diagonal({ source: o, target: o });
            });


        link.transition()
            .duration(duration)
            .attr("d", diagonal);


        link.exit().transition()
            .duration(duration)
            .attr("d", function (d) {
                var o = { x: source.x, y: source.y };
                return diagonal({ source: o, target: o });
            })
            .remove();


        nodes.forEach(function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

    function click(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        update(d)
    }

}