/*function dijkstra(source){
    reset_graph();

    let nodes = ct.nodes();

    source.data().distance = 0;

    let closest;

    while((closest = find_closer(nodes)) != Infinity){

    }


}

function relax(mid, dest, weight){
    if(dest.data().distance > mid.data().distance + weight){
        dest.data().distance = mid.data().distance + weight;
    }
}

function find_closer(nodes){
    let min = nodes[0];
    for(let i = 0; i < nodes; i++){
        if(nodes[i].data().distance < min.data().distance){
            min = nodes[i];
        }
    }
    return min;
}*/