import { useState } from "react";

function RoutinePage({
  routine,
  onBack,
  editing,
  setEditing,
  setRoutines,
  routines,
}) {
  const [newExercise, setNewExercise] = useState("");

  function deleteExercise(index) {
    const updated = routines.map((r) => {
      if (r.id === routine.id) {
        return {
          ...r,
          exercises: r.exercises.filter((_, i) => i !== index),
        };
      }
      return r;
    });

    setRoutines(updated);
  }

  function addExercise() {
    if (!newExercise.trim()) return;

    const updated = routines.map((r) => {
      if (r.id === routine.id) {
        return {
          ...r,
          exercises: [...r.exercises, newExercise.trim()],
        };
      }
      return r;
    });

    setRoutines(updated);
    setNewExercise("");
  }

  function deleteRoutine() {
    const updated = routines.filter((r) => r.id !== routine.id);
    setRoutines(updated);
    onBack();
  }

  return (
    <div>
      <button onClick={onBack}>← Back</button>

      <h1>{routine.name}</h1>

      {/* EDIT TOGGLE */}
      <button onClick={() => setEditing(!editing)}>
        {editing ? "Done Editing" : "Edit Routine"}
      </button>

      {/* DELETE ROUTINE */}
      {editing && (
        <button onClick={deleteRoutine} style={{ color: "red" }}>
          Delete Routine
        </button>
      )}

      <h3>Exercises</h3>

      {/* ADD EXERCISE */}
      {editing && (
        <div>
          <input
            placeholder="New exercise"
            value={newExercise}
            onChange={(e) => setNewExercise(e.target.value)}
          />
          <button onClick={addExercise}>Add</button>
        </div>
      )}

      {/* LIST */}
      <ul>
        {routine.exercises.map((ex, i) => (
          <li key={i}>
            {ex}

            {editing && (
              <button
                onClick={() => deleteExercise(i)}
                style={{ marginLeft: "10px", color: "red" }}
              >
                delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoutinePage;