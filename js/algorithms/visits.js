async function DFS(graph){
    graph.vertexes.forEach(vertex => {
        vertex.color = WHITE;
    });

    for(let i = 0; i < graph.vertexes.length; i++){
        let vertex = graph.vertexes[i];
        if(vertex.color == WHITE)
            await dfs_visit(vertex);
    }

    await sleep(500);

    graph.vertexes.forEach(vertex => {
        vertex.color = WHITE;
    });
}

async function dfs_visit(source){
    source.color = ACTIVE_1;

    await sleep(500);

    for(let i = 0; i < source.adj.length; i++){
        let vertex = source.adj[i];
        await sleep(500);
        if(vertex.color == WHITE){
            vertex.color = ACTIVE_2;
            await sleep(500);
            source.color = GREY;
            await sleep(500);
            await dfs_visit(vertex);
            source.color = ACTIVE_1;
        }
    }

    await sleep(500);

    source.color = BLACK;
}

async function BFS(graph){
    graph.vertexes.forEach(vertex => {
        vertex.color = WHITE;
    });

    for(let i = 0; i < graph.vertexes.length; i++){
        let vertex = graph.vertexes[i];
        if(vertex.color == WHITE)
            await bfs_visit(vertex);
    }

    await sleep(500);

    graph.vertexes.forEach(vertex => {
        vertex.color = WHITE;
    });
}

async function bfs_visit(source){
    let queue = Array();

    queue.push(source);

    while(queue.length != 0){
        let vertex = queue[0];
        vertex.color = ACTIVE_1;
        await sleep(500);

        for(let i = 0; i < vertex.adj.length; i++){
            let adj = vertex.adj[i];

            if(adj.color == WHITE){
                adj.color = ACTIVE_2;
                await sleep(500);
                queue.push(adj);
            }
        }

        let head = queue.shift();
        head.color = BLACK;
    }
}