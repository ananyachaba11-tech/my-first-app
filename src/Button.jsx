export default function Button({ type, onClick }) {
  return (
    <div>
      <button onClick={onClick}> {type} </button>
    </div>
  );
}
