import { useState } from "react";
import "./css/RoutinePage.css";

function RoutinePage({
  routine,
  onBack,
  routines,
  setRoutines,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeExercise, setActiveExercise] = useState(null);
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");

  const [editing, setEditing] = useState(false);
  const [newExercise, setNewExercise] = useState("");

  const today = new Date().toISOString().split("T")[0];

  // -------------------------
  // SAVE LOG
  // -------------------------
  function saveLog() {
    const updated = routines.map((r) => {
      if (r.id !== routine.id) return r;

      return {
        ...r,
        exercises: r.exercises.map((ex) => {
          if (ex.name !== activeExercise) return ex;

          const logs = ex.logs || [];
          const alreadyToday = logs.some((l) => l.date === today);

          return {
            ...ex,
            logs: alreadyToday
              ? logs
              : [
                  ...logs,
                  {
                    date: today,
                    weight: Number(weight),
                    reps: Number(reps),
                  },
                ],
          };
        }),
      };
    });

    setRoutines(updated);
    setModalOpen(false);
    setWeight("");
    setReps("");
  }

  // -------------------------
  // ADD EXERCISE
  // -------------------------
  function addExercise() {
    if (!newExercise.trim()) return;

    const updated = routines.map((r) => {
      if (r.id !== routine.id) return r;

      return {
        ...r,
        exercises: [
          ...r.exercises,
          { name: newExercise.trim(), logs: [] },
        ],
      };
    });

    setRoutines(updated);
    setNewExercise("");
  }

  // -------------------------
  // DELETE EXERCISE
  // -------------------------
  function deleteExercise(name) {
    const updated = routines.map((r) => {
      if (r.id !== routine.id) return r;

      return {
        ...r,
        exercises: r.exercises.filter((ex) => ex.name !== name),
      };
    });

    setRoutines(updated);
  }

  // -------------------------
  // OPEN MODAL
  // -------------------------
  function openLog(name) {
    setActiveExercise(name);
    setModalOpen(true);
  }

  // -------------------------
  // RENDER
  // -------------------------
  return (
    <div className="routine-page">

      {/* HEADER */}
      <div className="routine-header">
        <button onClick={onBack}>←</button>

        <h1>{routine.name}</h1>

        <button onClick={() => setEditing(!editing)}>
          {editing ? "Done" : "Edit"}
        </button>
      </div>

      {/* COLUMN HEADERS */}
      <div className="exercise-header-row">
        <div>Exercise</div>
        <div>To Beat</div>
        <div>Today</div>
      </div>

      {/* TABLE */}
      <div className="exercise-table">

        {(routine.exercises || []).map((ex) => {
          const logs = ex.logs || [];

          const todayLog = logs.find((l) => l.date === today);
          const lastLog = [...logs]
            .reverse()
            .find((l) => l.date !== today);

          return (
            <div className="exercise-row" key={ex.name}>

              {/* EXERCISE NAME */}
              <div className="col name">
                {ex.name}

                {editing && (
                  <button
                    className="delete-btn"
                    onClick={() => deleteExercise(ex.name)}
                  >
                    🗑
                  </button>
                )}
              </div>

              {/* TO BEAT */}
              <div className="col tobeat">
                {lastLog
                  ? `${lastLog.weight}kg × ${lastLog.reps}`
                  : "-"}
              </div>

              {/* TODAY */}
              <div className="col today">
                {!todayLog ? (
                  <button
                    className="plus-btn"
                    onClick={() => openLog(ex.name)}
                  >
                    +
                  </button>
                ) : (
                  `${todayLog.weight}kg × ${todayLog.reps}`
                )}
              </div>

            </div>
          );
        })}

      </div>

      {/* ADD EXERCISE (EDIT MODE) */}
      {editing && (
        <div className="add-exercise">
          <input
            placeholder="New exercise"
            value={newExercise}
            onChange={(e) => setNewExercise(e.target.value)}
          />
          <button onClick={addExercise}>Add</button>
        </div>
      )}

      {/* MODAL */}
{modalOpen && (
  <div className="modal-overlay">
    <div className="modal">

      {/* HEADER */}
      <div className="modal-header">
        <button
          className="modal-close"
          onClick={() => setModalOpen(false)}
          type="button"
        >
          ×
        </button>

        <h3 className="modal-title">
          {activeExercise}
        </h3>
      </div>

      {/* INPUTS */}
      <input
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />

      <input
        placeholder="Reps"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />

      <button onClick={saveLog}>
        Save
      </button>

    </div>
  </div>
)}

    </div>
  );
}

export default RoutinePage;