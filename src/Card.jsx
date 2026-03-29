import { useState } from "react";

export default function Card({
  name,
  type,
  hp,
  attack,
  id,
  liked,
  onToggleLike,
}) {
  return (
    <div>
      <div
        className={`card ${type.toLowerCase()}`} // assigning it class card and class type for coloring each color by its type in CSS
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <h2>{name}</h2>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} /* if you want to add a variable to a string in JS, you have to put the string in backticks instead of " ". ${} means add this variable/JS value to a string */
          alt={`${name} photo`}
        />
        <p>Type: {type}</p>
        <p>HP: {hp}</p>
        <p>Attack: {attack}</p>
        <button onClick={onToggleLike}>{liked ? "❤️" : "🤍"}</button>
      </div>
    </div>
  );
}
