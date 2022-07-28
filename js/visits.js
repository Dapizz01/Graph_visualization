async function DFS(){
    for(let i = 0; i < NODE_COUNT; i++){
        let node = cy.nodes()[i];
        if(node.hasClass("unvisited")){
            await dfs_visit(node);
            await sleep(1000);
        }
    }

    reset_nodes();
}

async function dfs_visit(node){
    set_active(node);

    await sleep(1000);

    let neighbors = get_neighborhood(node);

    for(let i = 0; i < neighbors.length; i++){
        await sleep(500);

        let edge = get_edge(node, neighbors[i])
        set_active(edge);

        if(neighbors[i].hasClass("unvisited")){
            set_visited(node);
            await sleep(500);

            await dfs_visit(neighbors[i]);

            await sleep(500);
            set_active(node);
        }

        await sleep(500);
        reset_edge(edge);
    }

    await sleep(1000);

    set_explored(node);
}