const Status = (props) => {
  const { filterState, setFilterState } = props;

  const handleFilterState = (state) => {
    setFilterState(state);
  };

  return (
    <div className="Status">
      <button
        onClick={() => handleFilterState("ALL")}
        className="sort"
        style={{
          backgroundColor: filterState === "ALL" ? "#007bff" : "",
          color: filterState === "ALL" ? "white" : "",
        }}
      >
        ALL
      </button>
      <button
        onClick={() => handleFilterState("Active")}
        className="sort"
        style={{
          backgroundColor: filterState === "Active" ? "#007bff" : "",
          color: filterState === "Active" ? "white" : "",
        }}
      >
        Active
      </button>
      <button
        onClick={() => handleFilterState("Completed")}
        className="sort"
        style={{
          backgroundColor: filterState === "Completed" ? "#007bff" : "",
          color: filterState === "Completed" ? "white" : "",
        }}
      >
        Completed
      </button>
    </div>
  );
};

export default Status;
