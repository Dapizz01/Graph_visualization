async function DFS(graph){
    graph.vertexes.forEach(vertex => {
        vertex.color = WHITE;
    });

    for(let i = 0; i < graph.vertexes.length; i++){
        let vertex = graph.vertexes[i];
        if(vertex.color == WHITE)
            await dfs_visit(vertex);
    }

    /*graph.vertexes.forEach(vertex => {
        if(vertex.color == WHITE)
            dfs_visit(vertex);
    })*/
}

async function dfs_visit(source){
    source.color = GREY;

    await sleep(500);

    for(let i = 0; i < source.adj.length; i++){
        await sleep(500);
        let vertex = source.adj[i];
        if(vertex.color != BLACK && vertex.color != GREY)
            dfs_visit(vertex);
    }

    await sleep(500);

    source.color = BLACK;
}