import { useState } from "react";

function AddRoutine({ onSave, onCancel }) {
  const [name, setName] = useState("");
  const [exerciseInput, setExerciseInput] = useState("");
  const [exercises, setExercises] = useState([]);

  function addExercise() {
    if (!exerciseInput.trim()) return;

    setExercises((prev) => [...prev, exerciseInput.trim()]);
    setExerciseInput("");
  }

  function handleSave() {
    if (!name.trim()) return;

    const newRoutine = {
      id: Date.now(),
      name: name.trim(),
      exercises,
    };

    onSave(newRoutine);
  }

  return (
    <div className="add-routine">
      <h1>Create Routine</h1>

      <button onClick={onCancel}>← Back</button>

      <div>
        <input
          placeholder="Routine name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <h3>Exercises</h3>

      <div className="exercise-input">
        <input
          placeholder="e.g. Bench Press"
          value={exerciseInput}
          onChange={(e) => setExerciseInput(e.target.value)}
        />

        <button onClick={addExercise}>Add</button>
      </div>

      <ul>
        {exercises.map((ex, i) => (
          <li key={i}>{ex}</li>
        ))}
      </ul>

      <button onClick={handleSave}>
        Done
      </button>
    </div>
  );
}

export default AddRoutine;