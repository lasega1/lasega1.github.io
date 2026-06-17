import { useEffect, useState } from "react";

import AddRoutine from "./components/AddRoutine";
import Dashboard from "./components/Dashboard";
import RoutinePage from "./components/RoutinePage";

function App() {
  const [screen, setScreen] = useState("dashboard");

  const [selectedRoutineId, setSelectedRoutineId] = useState(null);

  const [routines, setRoutines] = useState(() => {
    const saved = localStorage.getItem("routines");
    return saved ? JSON.parse(saved) : [];
  });

  const [editing, setEditing] = useState(false);

  // save to localStorage
  useEffect(() => {
    localStorage.setItem("routines", JSON.stringify(routines));
  }, [routines]);

  function addRoutine(routine) {
    setRoutines((prev) => [...prev, routine]);
    setScreen("dashboard");
  }

  function openRoutine(routine) {
    setSelectedRoutineId(routine.id);
    setScreen("routine");
    setEditing(false);
  }

  // IMPORTANT: derive latest routine from state
  const selectedRoutine = routines.find(
    (r) => r.id === selectedRoutineId
  );

  return (
    <div>
      {screen === "dashboard" && (
        <Dashboard
          routines={routines}
          onAddRoutine={() => setScreen("addRoutine")}
          onOpenRoutine={openRoutine}
        />
      )}

      {screen === "addRoutine" && (
        <AddRoutine
          onSave={addRoutine}
          onCancel={() => setScreen("dashboard")}
        />
      )}

      {screen === "routine" && selectedRoutine && (
        <RoutinePage
          routine={selectedRoutine}
          onBack={() => setScreen("dashboard")}
          editing={editing}
          setEditing={setEditing}
          setRoutines={setRoutines}
          routines={routines}
        />
      )}
    </div>
  );
}

export default App;