let cy;
let EDGE_SPAWN_RATIO = 0.15;
let NODE_COUNT = 10;
let layout;

const NODE_BLACK = "node-black";
const NODE_WHITE = "node-white";
const NODE_GREY = "node-light_grey";
const NODE_ACTIVE1 = "node-lilla";
const NODE_ACTIVE2 = "node-light_lilla";
const EDGE_STANDARD = "edge-standard";
const EDGE_ACTIVE = "edge-active";

const UNVISITED = 0;
const VISITED = 1;
const EXPLORED = 2;
const MAX_WEIGHT = 10;

function get_JSON(pathname){
    fetch(pathname).then((res) => {
        return res.json()
    })
}

function color_palette(color){
    let palette = {
        "node-black": {
            "background-color": "#6b7db3",
            "color": "#ffffff",
            "border-color": "#455687"
        },
        "node-white": {
            "background-color": "#ffffff",
            "color": "#6b7db3",
            "border-color": "#6b7db3"
        },
        "node-light_grey": {
            "background-color": "#e6ecff",
            "color": "#6b7db3",
            "border-color": "#6b7db3"
        },
        "node-lilla": {
            "background-color": "#9999ff",
            "color": "#e6ecff",
            "border-color": "#6b7db3"
        },
        "node-light_lilla": {
            "background-color": "#ccd9ff",
            "color": "#6b7db3",
            "border-color": "#6b7db3"
        },
        "edge-standard": {
            "line-color": "#455687",
            "target-arrow-color": "#455687"
        },
        "edge-active": {
            "line-color": "#9999ff",
            "target-arrow-color": "#9999ff"
        }
    };

    return palette[color];
}

// DA TOGLIERE, il cors rompe le balle
function get_graph_style(){
    // return get_JSON(graph.json)
    return [{
        "selector": "node",
        "style": {
            "text-valign": "center",
            "text-halign": "center",
            "width": 26,
            "height": 26,
            "background-color": "white",
            "border-color": "black",
            "border-width": "2",
        }
    }, {
        "selector": "node.unvisited",
        "style": {
            "background-color": "white",
            "border-color": "black",
            "color": "black"
        }
    }, {
        "selector": "node.visited",
        "style": {
            "background-color": "grey",
            "border-color": "black",
            "color": "black"
        }
    }, {
        "selector": "node.explored",
        "style": {
            "background-color": "black",
            "border-color": "black",
            "color": "white"
        }
    }, {
        "selector": "node.active",
        "style": {
            "background-color": "#f55951",
            "border-color": "black",
            "color": "black"
        }
    }, {
        "selector": "node[background_color][color][border_color]",
        "style": {
            "background-color": "data(color)",
            "border-color": "data(border_color)",
            "color": "data(color)"
        }
    }, {
        "selector": "node[label]",
        "style": {
            "label": "data(label)",
            "font-size": "12"
        }
    }, {
        "selector": "edge",
        "style": {
            "curve-style": "bezier",
            "target-arrow-shape": "triangle"
        }
    }, {
        "selector": "edge[label]",
        "style": {
            "label": "data(label)",
            "font-size": "10",
            "color": "#ffffff",
            "text-outline-color": "#6b7db3",
            "text-outline-width": "1"
        }
    }, {
        "selector": "edge.active",
        "style": {
            "line-color": "#f55951",
            "target-arrow-color": "#f55951"
        }
    }];
}

function generate_random_graph(){

    let edge_counter = 0;

    cy = new cytoscape({
        container: document.getElementById('cy'),
        style: get_graph_style()
    });

    for(let i = 0; i < NODE_COUNT; i++){
        cy.add({
            group: "nodes",
            data: {
                id: "n" + i,
                label: "n" + i,
                visited: false,
                explored: false
            }
        })
    }

    reset_nodes()

    for(let i = 0; i < NODE_COUNT; i++){
        for(let j = 0; j < NODE_COUNT; j++){
            if(i != j){
                let source_id = "n" + i;
                let dest_id = "n" + j;
                if(Math.random() <= EDGE_SPAWN_RATIO){
                    cy.add({
                        group: "edges",
                        data: {
                            id: "e" + edge_counter,
                            source: source_id,
                            target: dest_id,
                            label: Math.floor(Math.random() * MAX_WEIGHT) + 1
                        }
                    })
                    edge_counter++;
                }
            }
        }
    }

    reset_edges()

    layout = cy.layout({
        name: 'cose',
        animate: false
    });

    layout.run();
}

function style_node(node, color){
    let palette = color_palette(color);
    node.style("background-color", palette["background-color"]);
    node.style("color", palette["color"]);
    node.style("border-color", palette["border-color"]);
}

function style_edge(edge, color){
    let palette = color_palette(color);
    edge.style("line-color", palette["line-color"]);
    edge.style("target-arrow-color", palette["target-arrow-color"]);
}

function reset_nodes(){
    let nodes = cy.nodes();
    for(let i = 0; i < nodes.length; i++){
        nodes[i].data().explored = false;
        nodes[i].data().visited = false;
        style_node(nodes[i], NODE_WHITE);
    }
}

function reset_edges(){
    let edges = cy.edges();
    for(let i = 0; i < edges.length; i++){
        edges[i].data().active = false;
        style_edge(edges[i], EDGE_STANDARD);
    }
}

function reset_graph(){
    reset_nodes();
    reset_edges();
}

function get_neighborhood(source){
    return source.outgoers().nodes();
}

function get_edge(source, target){
    return cy.elements("edge[source = \"" + source.id() + "\"][target = \"" + target.id() + "\"]")
}

function sleep(milliseconds){
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

generate_random_graph();