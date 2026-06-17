import "./css/Dashboard.css";
import RoutineCard from "./RoutineCard";

function Dashboard({ routines, onAddRoutine, onOpenRoutine }) {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="routine-grid">
        {routines.map((r) => (
          <RoutineCard
            key={r.id}
            routine={r}
            onClick={() => onOpenRoutine(r)}
          />
        ))}

        <div className="add-card" onClick={onAddRoutine}>
          + Add Routine
        </div>
      </div>
    </div>
  );
}

export default Dashboard;