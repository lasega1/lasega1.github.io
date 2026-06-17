function RoutineCard({ routine, onClick }) {
  return (
    <button
      onClick={() => {
        console.log("CLICKED ROUTINE:", routine.name);
        onClick();
      }}
      style={{
        display: "block",
        width: "100%",
        margin: "10px 0",
        padding: "12px",
        textAlign: "left",
        cursor: "pointer",
      }}
    >
      <h2 style={{ margin: 0 }}>{routine.name}</h2>

      <p style={{ margin: "5px 0" }}>
        {routine.exercises.length} exercises
      </p>

      <small>Last trained: Never</small>
    </button>
  );
}

export default RoutineCard;