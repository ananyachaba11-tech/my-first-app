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

const allTypes = pokemons.map((value) => {
  return value.type;
});

// For every value in the dataset pokemons, give an array of the variable "type". This will include duplicates.
// Remember: Map transforms every time. Map calls a function on each element of the array. At each iteration, the function returns a new value. All the new values make the final new array.
// Remember that the dataset pokemons is an array of objects, with each element having multiple properties / key value pairs.
// The most standard way to access pnroperties in a single object is dot notation datasetname.propertyname followed by bracket notation datasetname["propertyname"]
// For an array with multiple objects, how would you get the name of the third entry in this dataset? -> pokemons[2].name (try it in terminal in node.js)

const uniqueTypes = new Set(allTypes);

// Set is always used with new, never alone. It is used to extract unique values.
// new Set(["a", "a", "b", "c"]) will give Set(3) OR {"a", "b", "c"}. This is called a Set (not an object). If it was an object, it would be { a: a, b: b, c: c }. Set is a completely different data structure.

const types = [...uniqueTypes];

// the spread operation [...] converts a set back into an array which is needed to use in .map later on.
// you could have also done const types = [...new Set(allTypes)].

// note that outside/before you define function App, you write notes with // but after, as you enter JSX, you switch to {/* */}

const App = () => {
  {
    /* setting the initial type selected as All: */
  }

  const [selectedType, setSelectedType] = useState("All");

  {
    /* creating an empty array called 'favourites': */
  }

  const [favourites, setFavourites] = useState([]);

  /* the below function is used when we click the heart button to add new IDs of pokemons into favourite list */
  /* if favourites includes the variable id (which could have been x), you change favourites array but filtering out all enteries where the chosen value is
  equal to the variable id. otherwise, you add that id to favourites array */

  function toggleFavourite(value) {
    if (favourites.includes(value)) {
      setFavourites(favourites.filter((v) => v !== value));
    } else {
      setFavourites([...favourites, value]);
    }
  }

  /* 
  - your favourites array currently is [25,4]
  - you click <3 a pikachu with ID = 25.
  - toggleFavourite(25) runs.
  - favourites.includes(25) will be true.
  - favourites.filter((value) => value !== 25), so keep everything except 25. favourites array becomes [4].
  - note that this function identifies id as we pass id to card below.We can change it to identifier, but then we'll also have to change it below.
  */

  /* A card is produced for each value in filtered pokemons. Filtered pokemons is all pokemons when selectedtype is 
  All. Otherwise, it is a subset of the selected type. */

  let filteredPokemons;
  if (selectedType === "All") {
    filteredPokemons = pokemons;
  } else if (selectedType === "Favourites") {
    filteredPokemons = pokemons.filter((p) => favourites.includes(p.id));
  } else {
    filteredPokemons = pokemons.filter(
      (p) => p.type.toLowerCase() === selectedType.toLowerCase(),
    );
  }

  /*
  "Fire.toLowerCase() gives "fire"
  this is helpful when people write things in the input box in lower case. it takes both lower case and upper case values now.
  */

  return (
    <div>
      <h1>Pokemon Explorer</h1>

      <input
        className="inputbox"
        placeholder="Enter a type name..."
        value={selectedType}
        onChange={(e) => {
          setSelectedType(e.target.value);
        }}
        style={{ marginTop: 12 }}
      />

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
          All
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
          justifyContent: "center",
        }}
      >
        {/* at this point, depending on the selected state/button pressed, the filtered pokemons will either have all pokemon data, specific type of pokemon data, or only liked pokemon data. using this data, we render cards. */}
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

/*
the flow of favourite/liking is:
- we pass the function ontogglelike to card. this function activates when the button in the card is clicked.
- on this function activation, togglefavourite gets activated for the specific id and checks if the id needs to be removed or added to the favourite list.
- immediately after, the variable liked takes value true or false depending on whether that specific id is there in the list or not.
- immediately after, the button turns red or white depending on the value of liked.
- why did we not define toggleFavourite and consequently ontogglelike in card.jsx?
---- Core rule: state (a dynamic thing, such as the favourites list) should live in the closest common parent that needs it.
---- Favourites affect multiple cards, so it must live in App.jsx, not in EACH card.
---- If you'd used usestate in card.jsx, each card will have it's own state (liked or no liked), but there will be no shared list, so you cannot filter favourites/show only favourites.
---- App.jsx is the parent keeping a notebook of favourites, card is the child just information please add/remove this one, child only sends requests.
*/
