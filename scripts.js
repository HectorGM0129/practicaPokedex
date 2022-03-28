const fetchPokemon = (pokeName) => {
  pokeName = pokeName.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
  fetch(url)
    .then((res) => {
      if (res.status != "200") {
        console.log(res);
        pokeImage("https://c.tenor.com/WUEKqaYhVsUAAAAd/pokemon-sad.gif");
        pokeData({
          name: "No existe",
          id: "No encontrado",
          weight: "No econtrado",
          height: "No encontrado",
          stats: [],
          types: [],
        });
      } else {
        return res.json();
      }
    })
    .then((data) => {
      if (data) {
        console.log(data);

        let pokeImg = data.sprites.front_default;
        pokeImage(pokeImg);
        pokeData(data);
        console.log(pokeImg);
      }
    });
};

const pokeImage = (url) => {
  const pokePhoto = document.getElementById("pokeImg");

  pokePhoto.src = url;
};

const pokeData = (data) => {
  const { name, id, weight, height, stats, types } = data;
  document.getElementById("nombrePoke").innerText = name;
  document.getElementById("altura").innerText = height;
  document.getElementById("peso").innerText = weight;

  if (types.length == 2) {
    document.getElementById("tipo1").innerText = types[0].type.name;
    document.getElementById("tipo2").innerText = types[1].type.name;
  } else {
    document.getElementById("tipo1").innerText = types[0].type.name;
    document.getElementById("tipo2").innerText = "";
  }

  console.log(stats);
  document.getElementById("hp").innerText = stats[0].base_stat;
  document.getElementById("atk").innerText = stats[1].base_stat;
  document.getElementById("def").innerText = stats[2].base_stat;
  document.getElementById("atkSp").innerText = stats[3].base_stat;
  document.getElementById("defSp").innerText = stats[4].base_stat;
  document.getElementById("sp").innerText = stats[5].base_stat;
  document.getElementById("numberPoke").innerText = id;
};

document.getElementById("pokeName").addEventListener("keypress", (e) => {
  if (e.keyCode == 13) {
    fetchPokemon(document.getElementById("pokeName").value);
  }
});

document.getElementById("arriba").addEventListener("click", () => {
  let id = Number(document.getElementById("numberPoke").innerText);
  id += 1;
  fetchPokemon(id.toString());
  document.getElementById("pokeName").value = "";
});

document.getElementById("abajo").addEventListener("click", () => {
  let id = Number(document.getElementById("numberPoke").innerText);
  id -= 1;
  if (id > 0) {
    fetchPokemon(id.toString());
    document.getElementById("pokeName").value = "";
  }
});

document.getElementById("derecha").addEventListener("click", () => {
  let id = Number(document.getElementById("numberPoke").innerText);
  id += 1;
  fetchPokemon(id.toString());
  document.getElementById("pokeName").value = "";
});

document.getElementById("izquierda").addEventListener("click", () => {
  let id = Number(document.getElementById("numberPoke").innerText);
  id -= 1;
  if (id > 0) {
    fetchPokemon(id.toString());
    document.getElementById("pokeName").value = "";
  }
});
fetchPokemon("1");
