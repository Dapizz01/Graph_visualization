const RADIUS = 80;
const EDGE_SPAWN_RATE = 0.5;

let width = document.getElementById("canvasContainer").clientWidth
let height = 400;
let graph;

function setup() {
    createCanvas(width, height);

    graph = new Graph();

    // Controllo che effettivamente possano esistere tutti i vertici con i pixel a disposizione?

    // Creazione nuovi vertici (con controllo di sovrapposizione)
    for(let i = 0; i < 8;){
        let x = Math.floor(Math.random() * (width - RADIUS)) + RADIUS;
        let y = Math.floor(Math.random() * (height - RADIUS)) + RADIUS;

        if(!isVertexColliding(graph, x, y)){
            graph.addVertex(new Vertex(i, x, y, WHITE));
            i++;
        }
    }

    // Creazione degli archi
    graph.vertexes.forEach(source => {
        graph.vertexes.forEach(dest => {
            if(source != dest && !dest.adj.includes(source)){
                let collides = false;

                graph.vertexes.forEach(middle => {
                    if(middle != source && middle != dest)
                        if(collideLineCircle(source.x, source.y, dest.x, dest.y, middle.x, middle.y, RADIUS * 2))
                            collides = true;
                })

                if(!collides)
                    if(Math.random() < EDGE_SPAWN_RATE){
                        source.addAdj(dest);
                        dest.addAdj(source);
                    }
            }
        })
    })
}

function draw() {

    strokeWeight(2);
    fill(WHITE);
    textAlign(CENTER);
    smooth();

    graph.vertexes.forEach(source => {
        source.adj.forEach(dest => {
            line(source.x, source.y, dest.x, dest.y);
        })
    })

    graph.vertexes.forEach(vertex => {
        fill(vertex.color);
        ellipse(vertex.x, vertex.y, RADIUS);
        fill(BLACK);
        text(vertex.value, vertex.x, vertex.y);
    })

}

function windowResized(){
    resizeCanvas(width, height, false);
}

function pointsDistance(x1, y1, x2, y2){
    // sqrt((x1 - x2)^2 + (y1 - y2)^2)
    return Math.floor(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)));
}

function isVertexColliding(graph, x, y){
    let result = false;

    graph.vertexes.forEach(vertex => {
        if(pointsDistance(vertex.x, vertex.y, x, y) <= RADIUS * 2)
            result = true;
    });

    return result;
}