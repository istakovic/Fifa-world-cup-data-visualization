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
                            { "name": "1. BRAZIL" },
                            { "name": "2. GERMANY " },
                            { "name": "3. TURKEY" },
                            { "name": "GOALS SCORED TOTAL ON COMPETITION - 161" },
                            { "name": "AVG GOALS PER GAME - 2.5" }
                        ]
                    },
                    {
                        "name": "Placements for 2006",
                        "children": [
                            { "name": "1. ITALY" },
                            { "name": "2. FRANCE " },
                            { "name": "3. GERMANY" },
                            { "name": "GOALS SCORED TOTAL ON COMPETITION - 147" },
                            { "name": "AVG GOALS PER GAME - 2.3" }
                        ]
                    },
                    {
                        "name": "Placements for 2010",
                        "children": [
                            { "name": "1. SPAIN" },
                            { "name": "2. NETHERLANDS" },
                            { "name": "3. GERMANY" },
                            { "name": "GOALS SCORED TOTAL ON COMPETITION - 145" },
                            { "name": "AVG GOALS PER GAME - 2.3" }
                        ]
                    },
                    {
                        "name": "Placements for 2014",
                        "children": [
                            { "name": "1. GERMANY" },
                            { "name": "2. ARGENTINA " },
                            { "name": "3. NETHERLANDS" },
                            { "name": "GOALS SCORED TOTAL ON COMPETITION - 171" },
                            { "name": "AVG GOALS PER GAME - 2.7" }
                        ]
                    },
                    {
                        "name": "Placements for 2018",
                        "children": [
                            { "name": "1. FRANCE" },
                            { "name": "2. CROATIA" },
                            { "name": "3. BELGIUM" },
                            { "name": "Goals scored total on competition - 169" },
                            { "name": "AVG GOALS PER GAME - 2.6" }
                        ]
                    }
                ]
            }
        ]

    }];

    var margin = { top: 0, right: 200, bottom: 20, left: 500 };
    var width = 750, height = 750;

    var i = 0, duration = 500;

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

function donut(){  
    // Default settings
    var $el = d3.select("body")
    //var data = {};
    // var showTitle = true;
    var width = 1600,
        height = 800,
        radius = Math.min(width, height) / 2;
  
    var currentVal;
    var color = d3.scale.category20();
    var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.value; });
  
    var svg, g, arc; 
  
  
    var object = {};
  
    // Method for render/refresh graph
    object.render = function(){
      if(!svg){
        arc = d3.svg.arc()
        .outerRadius(radius)
        .innerRadius(radius - (radius/2.5));
  
        svg = $el.append("svg")
          .attr("width", width)
          .attr("height", height)
        .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  
        g = svg.selectAll(".arc")
          .data(pie(d3.entries(data)))
        .enter().append("g")
        .attr("class", "arc");
  
        g.append("path")
          // Attach current value to g so that we can use it for animation
          .each(function(d) { this._current = d; })
          .attr("d", arc)
          .style("fill", function(d) { return color(d.data.key); });
        g.append("text")
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .style("text-anchor", "middle");
        g.select("text").text(function(d) { return d.data.key; });
  
        svg.append("text")
            .datum(data)
            .attr("x", 0 )
            .attr("y", 0 + radius/10 )
            .attr("class", "text-tooltip")        
            .style("text-anchor", "middle")
            .attr("font-weight", "bold")
            .style("font-size", radius/2.5+"px");
  
        g.on("mouseover", function(obj){
          console.log(obj)
          svg.select("text.text-tooltip")
          .attr("fill", function(d) { return color(obj.data.key); })
          .text(function(d){
            return d[obj.data.key];
          });
        });
  
        g.on("mouseout", function(obj){
          svg.select("text.text-tooltip").text("");
        });
  
      }else{
        g.data(pie(d3.entries(data))).exit().remove();
  
        g.select("path")
        .transition().duration(200)
        .attrTween("d", function(a){
          var i = d3.interpolate(this._current, a);
          this._current = i(0);
          return function(t) {
              return arc(i(t));
          };
        })
  
        g.select("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; });
  
        svg.select("text.text-tooltip").datum(data);
      }      
      return object;
    };
  
    // Getter and setter methods
    object.data = function(value){
      if (!arguments.length) return data;
      data = value;
      return object;
    };
  
    object.$el = function(value){
      if (!arguments.length) return $el;
      $el = value;
      return object;
    };
  
    object.width = function(value){
      if (!arguments.length) return width;
      width = value;
      radius = Math.min(width, height) / 2;
      return object;
    };
  
    object.height = function(value){
      if (!arguments.length) return height;
      height = value;
      radius = Math.min(width, height) / 2;
      return object;
    };
  
    return object;
  };