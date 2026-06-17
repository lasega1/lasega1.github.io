import "./css/RoutineCard.css";

function RoutineCard({ routine, onClick }) {
  function getLastTrainedText() {
    let latestDate = null;

    (routine.exercises || []).forEach((ex) => {
      (ex.logs || []).forEach((log) => {
        const logDate = new Date(log.date);

        if (!latestDate || logDate > latestDate) {
          latestDate = logDate;
        }
      });
    });

    if (!latestDate) return "Never trained";

    const now = new Date();
    const diffHours = (now - latestDate) / (1000 * 60 * 60);

    if (diffHours < 72) {
      return "Recovering";
    }

    const diffDays = Math.floor(diffHours / 24);

    return `Last trained: ${diffDays} days ago`;
  }

  return (
    <div className="routine-card" onClick={onClick}>

      <div className="routine-name">
        {routine.name}
      </div>

      <div className="routine-meta">
        {routine.exercises?.length || 0} exercises
      </div>

      <div className="routine-meta">
        {getLastTrainedText()}
      </div>

    </div>
  );
}

export default RoutineCard;