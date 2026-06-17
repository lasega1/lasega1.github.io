import { useMemo, useState } from "react";

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

  const today = new Date().toISOString().split("T")[0];

  // 🔥 update single exercise log
  function saveLog() {
    const updated = routines.map((r) => {
      if (r.id !== routine.id) return r;

      return {
        ...r,
        exercises: r.exercises.map((ex) => {
          if (ex.name !== activeExercise) return ex;

          const alreadyToday = ex.logs.some((l) => l.date === today);

          return {
            ...ex,
            logs: alreadyToday
              ? ex.logs
              : [
                  ...ex.logs,
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

  function openLog(name) {
    setActiveExercise(name);
    setModalOpen(true);
  }

  const viewData = useMemo(() => {
    const toBeat = [];
    const todayList = [];

    routine.exercises.forEach((ex) => {
      const todayLog = ex.logs.find((l) => l.date === today);
      const lastLog = [...ex.logs]
        .reverse()
        .find((l) => l.date !== today);

      if (todayLog) {
        todayList.push({ ...ex, todayLog });
      } else {
        todayList.push({ ...ex, todayLog: null });
      }

      if (lastLog) {
        toBeat.push({ ...ex, lastLog });
      }
    });

    return { toBeat, todayList };
  }, [routine, today]);

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={onBack}>← Back</button>

      <h1>{routine.name}</h1>

      <div style={{ display: "flex", gap: "50px" }}>
        {/* TO BEAT */}
        <div>
          <h2>To Beat</h2>

          {viewData.toBeat.map((ex) => (
            <div key={ex.name} style={{ marginBottom: "10px" }}>
              <b>{ex.name}</b>

              <div>
                {ex.lastLog.weight}kg x {ex.lastLog.reps}
              </div>
            </div>
          ))}
        </div>

        {/* TODAY */}
        <div>
          <h2>Today</h2>

          {viewData.todayList.map((ex) => (
            <div key={ex.name} style={{ marginBottom: "10px" }}>
              <b>{ex.name}</b>

              {!ex.todayLog ? (
                <button onClick={() => openLog(ex.name)}>
                  +
                </button>
              ) : (
                <div>
                  {ex.todayLog.weight}kg x {ex.todayLog.reps}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "300px",
            }}
          >
            <h3>{activeExercise}</h3>

            <button onClick={() => setModalOpen(false)}>
              Back
            </button>

            <div style={{ marginTop: "10px" }}>
              <input
                placeholder="Weight (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            <div style={{ marginTop: "10px" }}>
              <input
                placeholder="Reps"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
              />
            </div>

            <button
              onClick={saveLog}
              style={{ marginTop: "10px" }}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoutinePage;