// export function renderPokemon(item){
//     console.log(item);
// }

export function renderPokemon({name, height, weight, id, types, abilities, stats, sprites}){
    renderSprite(sprites.other["official-artwork"]["front_default"]);
    renderName(name);
    renderTypes(types);
    renderStats(stats);
    renderInfo(id,height,weight);
    renderAbilities(abilities)
}

function renderSprite(link){
    let box = document.querySelector("#pokemon-sprite"),
        a = document.createElement("img")
    a.setAttribute("src", link)

    box.innerHTML = ""
    box.appendChild(a);
}
function renderName(name){
    let box = document.querySelector("#pokemon-name"),
        text = document.createTextNode(name);
    
    box.innerHTML = ""
    box.appendChild(text);
}
function renderTypes(types){
    let box = document.querySelector("#pokemon-types");

    box.innerHTML = ""
    types.forEach(t => {
        let a = document.createElement("li"),
            aText = document.createTextNode(t.type.name);
        a.appendChild(aText);
        box.appendChild(a)
    })
}
function renderStats(stats) {
    let box = document.querySelector("#pokemon-stats");
    box.innerHTML = ""

    stats.forEach(({base_stat, stat}) => {
        let a = document.createElement("li"),
            aText = document.createTextNode(`${stat.name}: ${base_stat}`);
        a.appendChild(aText);
        box.appendChild(a)
    });
}
function renderAbilities(abilities){
    let box = document.querySelector("#pokemon-abilities");

    box.innerHTML = ""
    abilities.forEach(t => {
        let a = document.createElement("li"),
            aText = document.createTextNode(t.ability.name);
        a.appendChild(aText);
        box.appendChild(a)
    })
}
function renderInfo(id, height, weight){
    let box = document.querySelector("#pokemon-info"),
        data = [{tag: "id", data: id}, {tag: "height", data: height}, {tag: "weight", data: weight}]

    box.innerHTML = ""
    data.forEach(({tag, data}) => {
        let a = document.createElement("li"),
            aText = document.createTextNode(`${tag}: ${data}`);
        a.appendChild(aText);
        box.appendChild(a)
    })
}