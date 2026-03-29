import Card from "./Card";
import { useState } from "react";
import "./App.css";

const pokemons = [
  { id: 1, name: "Bulbasaur", type: "Grass", hp: 45, attack: 49 },
  { id: 4, name: "Charmander", type: "Fire", hp: 39, attack: 52 },
  { id: 7, name: "Squirtle", type: "Water", hp: 44, attack: 48 },
  { id: 25, name: "Pikachu", type: "Electric", hp: 35, attack: 55 },
  { id: 6, name: "Charizard", type: "Fire", hp: 78, attack: 84 },
  { id: 9, name: "Blastoise", type: "Water", hp: 79, attack: 83 },
  { id: 3, name: "Venusaur", type: "Grass", hp: 80, attack: 82 },
  { id: 150, name: "Mewtwo", type: "Psychic", hp: 106, attack: 110 },
  { id: 39, name: "Jigglypuff", type: "Normal", hp: 115, attack: 45 },
  { id: 143, name: "Snorlax", type: "Normal", hp: 160, attack: 110 },
  { id: 94, name: "Gengar", type: "Ghost", hp: 60, attack: 65 },
  { id: 131, name: "Lapras", type: "Water", hp: 130, attack: 85 },
  { id: 133, name: "Eevee", type: "Normal", hp: 55, attack: 55 },
  { id: 149, name: "Dragonite", type: "Dragon", hp: 91, attack: 134 },
  { id: 59, name: "Arcanine", type: "Fire", hp: 90, attack: 110 },
  { id: 65, name: "Alakazam", type: "Psychic", hp: 55, attack: 50 },
  { id: 68, name: "Machamp", type: "Fighting", hp: 90, attack: 130 },
  { id: 76, name: "Golem", type: "Rock", hp: 80, attack: 120 },
  { id: 130, name: "Gyarados", type: "Water", hp: 95, attack: 125 },
  { id: 148, name: "Dragonair", type: "Dragon", hp: 61, attack: 84 },
];

// extracting unique types for buttons

const allTypes = pokemons.map((p) => p.type); // extract all types using map, this will include duplicates
const uniqueTypes = new Set(allTypes); // keep only unique values to give Set { "Grass", "Fire", "Water" }. Set is always used with new, not alone. Set keeps unique values, new creates a new instance of this thing.
const types = [...uniqueTypes]; // the spread operation [...] converts a set back into an array which is needed to use in .map later on

const App = () => {
  const [selectedType, setSelectedType] = useState("All");

  {
    /* creating an empty array called 'favourites' */
  }

  const [favourites, setFavourites] = useState([]);

  /* the below function is used when we click the heart button to add new IDs of pokemons into favourite list */

  function toggleFavourite(id) {
    if (favourites.includes(id)) {
      setFavourites(favourites.filter((value) => value !== id));
    } else {
      setFavourites([...favourites, id]);
    }
  }

  /* A card is produced for each value in filtered pokemons. Filtered pokemons is all pokemons when selectedtype is 
  All. Otherwise, it is a subset of the selected type. */

  let filteredPokemons;
  if (selectedType === "All") {
    filteredPokemons = pokemons;
  } else if (selectedType === "Favourites") {
    filteredPokemons = pokemons.filter((p) => favourites.includes(p.id));
  } else {
    filteredPokemons = pokemons.filter((p) => p.type === selectedType);
  }

  return (
    <div>
      <h1>Pokemon Explorer</h1>

      {/*Adding buttons in a flex container */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "24px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* Adding the all button, which sets the selected type to All on click*/}

        <button className="button" onClick={() => setSelectedType("All")}>
          {" "}
          All{" "}
        </button>

        {/* Adding buttons for each type, which sets the selected type to that particular type on click*/}

        {types.map((d, i) => (
          <button className="button" key={i} onClick={() => setSelectedType(d)}>
            {d}
          </button>
        ))}

        <button
          className="button"
          onClick={() => setSelectedType("Favourites")}
        >
          Favourites
        </button>
      </div>

      {/*Adding cards */}
      <div
        style={{
          display: "grid",
          gap: "8px 24px",
          gridTemplateColumns: "repeat(auto-fit, 220px)",
          padding: "35px",
          justifyContent: "start",
        }}
      >
        {filteredPokemons.map((d) => (
          <Card
            key={d.id}
            id={d.id}
            name={d.name}
            type={d.type}
            hp={d.hp}
            attack={d.attack}
            liked={favourites.includes(d.id)}
            onToggleLike={() => toggleFavourite(d.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
