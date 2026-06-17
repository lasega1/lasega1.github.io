import RoutineCard from "./RoutineCard";

function Dashboard({ routines, onAddRoutine, onOpenRoutine }) {
  return (
    <div>
      <h1>Gym Tracker</h1>

      <button onClick={onAddRoutine}>
        + Add Routine
      </button>

      {routines.map((r) => (
        <RoutineCard
          key={r.id}
          routine={r}
          onClick={() => onOpenRoutine(r)}
        />
      ))}
    </div>
  );
}

export default Dashboard;