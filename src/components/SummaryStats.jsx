const SummaryStats = ({ dogs }) => {
  const total = dogs.length;

  const avgWeight = () => {
    const weights = dogs
      .map((d) => parseInt(d.weight.imperial?.split(" - ")[0]))
      .filter((n) => !isNaN(n));
    const avg = weights.reduce((a, b) => a + b, 0) / weights.length;
    return Math.round(avg);
  };

  const mostCommonGroup = () => {
    const groups = dogs.map((d) => d.breed_group).filter(Boolean);
    const counts = {};
    groups.forEach((g) => counts[g] = (counts[g] || 0) + 1);
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <p>Total Breeds: {total}</p>
      <p>Average Min Weight: {avgWeight()} lbs</p>
      <p>Most Common Group: {mostCommonGroup()}</p>
    </div>
  );
};

export default SummaryStats;
