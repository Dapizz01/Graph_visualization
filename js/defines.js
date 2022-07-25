const WHITE = 255;
const GREY = 128;
const BLACK = 0;
const ACTIVE_1 = "#1fc6d1";
const ACTIVE_2 = "#eab676";

class Vertex{
    value = "";
    adj = Array();
    x;
    y;
    color;

    constructor(value, x, y, color){
        this.value = value;
        this.x = x;
        this.y = y;
        this.color = color;
    }

    addAdj(vertex){
        this.adj.push(vertex);
    }

    changeColor(color){
        this.color = color;
    }
}

class Edge{
    weight = 0;
    to;

    constructor(vertex, weight){
        this.to = vertex;
        this.weight = weight;
    }

    setWeight(weight){
        this.weight = weight;
    }
}

class Graph{
    vertexes;

    constructor(){
        this.vertexes = Array();
    }

    addVertex(vertex){
        this.vertexes.push(vertex);
    }
}

function sleep(milliseconds){
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}