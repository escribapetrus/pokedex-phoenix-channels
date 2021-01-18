export function renderPokemon({name, height, weight, id, types, abilities, stats, sprites}){
    resetPokedex();
    let light = document.querySelector("#pokedex-light");
    light.style.backgroundColor = "rgb(100, 200, 0)";
    renderSprite(sprites.other["official-artwork"]["front_default"]);
    renderName(name);
    renderTypes(types);
    renderStats(stats);
    renderInfo(id,height,weight);
    renderAbilities(abilities)
}
export function renderEvolutions(chain){
    let box = document.querySelector("#pokemon-evolutions"),
        el = document.createElement("ul");
    box.innerHTML = ""
    evolutionEl(chain, el)
    box.appendChild(el);
}
export function handleError(reason){
    let light = document.querySelector("#pokedex-light"),
        head = document.querySelector("#pokemon-name"),
        headText = document.createTextNode(reason.message)
    resetPokedex();
    light.style.backgroundColor = "red"
    head.appendChild(headText);
}
export function clearPokedex(){
    resetPokedex()
}

function renderSprite(link){
    let box = document.querySelector("#pokemon-sprite"),
        a = document.createElement("img")
    a.setAttribute("src", link)
    box.appendChild(a);
}
function renderName(name){
    let box = document.querySelector("#pokemon-name"),
        text = document.createTextNode(name);
    box.appendChild(text);
}
function renderTypes(types){
    let box = document.querySelector("#pokemon-types");
    types.forEach(t => {
        let a = document.createElement("li"),
            aText = document.createTextNode(t.type.name);
        a.appendChild(aText);
        box.appendChild(a)
    })
}
function renderStats(stats) {
    let box = document.querySelector("#pokemon-stats");
    stats.forEach(({base_stat, stat}) => {
        let a = document.createElement("li"),
            aText = document.createTextNode(`${stat.name}: ${base_stat}`);
        a.appendChild(aText);
        box.appendChild(a)
    });
}
function renderAbilities(abilities){
    let box = document.querySelector("#pokemon-abilities");
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
    data.forEach(({tag, data}) => {
        let a = document.createElement("li"),
            aText = document.createTextNode(`${tag}: ${data}`);
        a.appendChild(aText);
        box.appendChild(a)
    })
}

function resetPokedex(){
    let light = document.querySelector("#pokedex-light"),
        data = [
            document.querySelector("#pokemon-name"),
            document.querySelector("#pokemon-types"),
            document.querySelector("#pokemon-sprite"),
            document.querySelector("#pokemon-stats"),
            document.querySelector("#pokemon-info"),
            document.querySelector("#pokemon-abilities"),
            document.querySelector("#pokemon-evolutions"),
        ];
    data.forEach(d => {d.innerHTML = ""})
    light.style.backgroundColor = "cornflowerblue"
}
function evolutionEl(chain, el) {
    if (chain.evolves_to.length == 0) {
        let pk = document.createElement("li"),
            pkText = document.createTextNode(chain.species.name);
        pk.appendChild(pkText);
        el.appendChild(pk);
        return el
    }
    else {
        let pk = document.createElement("li"),
            pkText = document.createTextNode(chain.species.name);
        pk.appendChild(pkText);
        el.appendChild(pk);
        chain.evolves_to.forEach(c => {
            evolutionEl(c, el)
        })
    }
}