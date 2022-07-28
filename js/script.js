let cy;
let EDGE_SPAWN_RATIO = 0.15;
let NODE_COUNT = 10;
let layout;


function get_JSON(pathname){
    fetch(pathname).then((res) => {
        return res.json()
    })
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
        "selector": "node[color][border_color]",
        "style": {
            "background-color": "data(color)",
            "border-color": "data(border_color)"
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
                            target: dest_id
                        }
                    })
                    edge_counter++;
                }
            }
        }
    }

    layout = cy.layout({
        name: 'cose',
        animate: false
    });

    layout.run();
}

function set_active(node){
    node.classes("active");
}

function set_unvisited(node){
    node.classes("unvisited");
}

function set_visited(node){
    node.classes("visited");
}

function set_explored(node){
    node.classes("explored");
}

function reset_edge(edge){
    edge.classes("edge");
}

function reset_nodes(){
    cy.nodes().classes("unvisited");
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