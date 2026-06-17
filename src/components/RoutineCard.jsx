function RoutineCard({ routine, onClick }) {
  function getLastTrainedText() {
    let latestDate = null;

    routine.exercises.forEach((ex) => {
      ex.logs.forEach((log) => {
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
    <button onClick={onClick} style={{ margin: "10px 0" }}>
      <h2>{routine.name}</h2>

      <p>{routine.exercises.length} exercises</p>

      <small>{getLastTrainedText()}</small>
    </button>
  );
}

export default RoutineCard;