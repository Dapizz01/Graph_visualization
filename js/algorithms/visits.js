async function DFS(){

    reset_graph()

    for(let i = 0; i < NODE_COUNT; i++){
        let node = cy.nodes()[i];
        if(is_node_unvisited(node)){
            await dfs_visit(node);
            await sleep(1000);
        }
    }

    // reset_graph();
}

async function dfs_visit(node){
    style_node(node, NODE_ACTIVE1);
    set_node(node, VISITED);

    await sleep(1000);

    let neighbors = get_neighborhood(node);

    for(let i = 0; i < neighbors.length; i++){
        await sleep(500);

        let edge = get_edge(node, neighbors[i])
        style_edge(edge, EDGE_ACTIVE);

        if(is_node_unvisited(neighbors[i])){
            set_node(neighbors[i], VISITED);
            style_node(neighbors[i], NODE_ACTIVE2);
            style_node(node, NODE_GREY);
            await sleep(500);

            await dfs_visit(neighbors[i]);

            await sleep(500);
            style_node(node, NODE_ACTIVE1);
        }
        else{
            await sleep(500);
            style_edge(edge, EDGE_STANDARD);
        }
    }

    await sleep(1000);

    set_node(node, EXPLORED);
    style_node(node, NODE_BLACK);
}

async function BFS(){

    reset_graph();

    for(let i = 0; i < NODE_COUNT; i++){
        let node = cy.nodes()[i];
        if(is_node_unvisited(node)){
            await bfs_visit(node);
            await sleep(1000);
        }
    }

    // reset_graph();
}

async function bfs_visit(start_node){
    let queue = Array();

    queue.push(start_node);

    while(queue.length != 0){
        let current = queue[0];
        style_node(current, NODE_ACTIVE1);
        await sleep(500);

        let neighbors = get_neighborhood(current);

        for(let i = 0; i < neighbors.length; i++){
            let current_edge = get_edge(current, neighbors[i]);
            style_edge(current_edge, EDGE_ACTIVE);

            await sleep(500)

            if(is_node_unvisited(neighbors[i])){
                queue.push(neighbors[i]);
                set_node(neighbors[i], VISITED);
                style_node(neighbors[i], NODE_ACTIVE2);
                await sleep(500);
            }
            else{
                await sleep(500);
                style_edge(current_edge, EDGE_STANDARD);
            }
        }

        set_node(current, EXPLORED);
        style_node(queue.shift(), NODE_BLACK);
    }
}

function is_node_unvisited(node){
    return !(node.data().visited || node.data().explored);
}

function set_node(node, mode){
    switch(mode){
        case UNVISITED:
            node.data().visited = false;
            node.data().explored = false;
            break;
        case VISITED:
            node.data().visited = true;
            node.data().explored = false;
            break;
        case EXPLORED:
            node.data().visited = true;
            node.data().explored = true;
            break;
        default:
            node.data().visited = false;
            node.data().explored = false;
    }
}

/*function set_edge_standard(edge){
    edge.data().active = false;
    recolor_edge(edge, EDGE_STANDARD);
}

function set_edge_active(edge){
    edge.data().active = true;
    recolor_edge(edge, EDGE_ACTIVE);
}

function recolor_edge(edge){
    if(edge.data().active){
        style_edge(node, EDGE_ACTIVE);
    }
    else{
        style_edge(node, EDGE_STANDARD);
    }
}*/
