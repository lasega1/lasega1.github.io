import { useState } from "react";
import "./css/AddRoutine.css";

function AddRoutine({ onSave, onCancel }) {
  const [name, setName] = useState("");
  const [exerciseInput, setExerciseInput] = useState("");
  const [exercises, setExercises] = useState([]);

  function addExercise() {
    if (!exerciseInput.trim()) return;

    setExercises((prev) => [
      ...prev,
      {
        name: exerciseInput.trim(),
        logs: [],
      },
    ]);

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

      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={onCancel}>←</button>
        <button onClick={handleSave}>Done</button>
      </div>

      {/* ROUTINE NAME */}
      <input
        className="routine-name-input"
        placeholder="Routine name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* SECTION TITLE */}
      <div className="exercise-title">
        Exercises
      </div>

      {/* INPUT ROW */}
      <div className="exercise-input-row">
        <input
          placeholder="Exercise Name"
          value={exerciseInput}
          onChange={(e) => setExerciseInput(e.target.value)}
        />

        <button onClick={addExercise}>
          Add
        </button>
      </div>

      {/* LIST (NO BULLETS) */}
      <div className="exercise-list">
  {exercises.map((ex, i) => (
    <div key={i} className="exercise-item">

      <span>{ex.name}</span>

      <button
        className="delete-btn"
        onClick={() =>
          setExercises((prev) =>
            prev.filter((_, index) => index !== i)
          )
        }
      >
        🗑
      </button>

    </div>
  ))}
</div>

    </div>
  );
}

export default AddRoutine;