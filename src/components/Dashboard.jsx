import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [list, setList] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");

  useEffect(() => {
    const fetchAllDogData = async () => {
      const response = await fetch("https://api.thedogapi.com/v1/breeds", {
        headers: {
          "x-api-key": import.meta.env.VITE_DOG_API_KEY,
        },
      });
      const data = await response.json();
      setList(data);
    };

    fetchAllDogData().catch(console.error);
  }, []);

  return (
    <div>
      <h1>🐶 Dog Dashboard 🐶</h1>

      {list && (
        <div style={{ marginBottom: "20px" }}>
          {/* Summary Stats */}
          <h3>📊 Summary Statistics</h3>
          <p>🐕 Total Breeds: {list.length}</p>
          <p>
            🐾 Working Group Breeds:{" "}
            {list.filter((dog) => dog.breed_group === "Working").length}
          </p>
          <p>
            🧁 Average Lifespan:{" "}
            {(
              list.reduce((sum, dog) => {
                const match = dog.life_span?.match(/(\d+)\s*-\s*(\d+)/);
                if (match) {
                  const avg = (+match[1] + +match[2]) / 2;
                  return sum + avg;
                }
                return sum;
              }, 0) / list.length
            ).toFixed(1)}{" "}
            years
          </p>

          {/* Filter UI */}
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Search breeds..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={{ padding: "6px", marginRight: "10px" }}
            />

            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              style={{ padding: "6px" }}
            >
              <option value="">All Groups</option>
              {[...new Set(list.map((dog) => dog.breed_group).filter(Boolean))].map(
                (group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
      )}

      {/* Dog List */}
      <ul>
        {list &&
          list
            .filter((dog) =>
              dog.name.toLowerCase().includes(searchInput.toLowerCase())
            )
            .filter((dog) =>
              selectedGroup ? dog.breed_group === selectedGroup : true
            )
            .map((dog) => (
              <li key={dog.id}>
                <strong>{dog.name}</strong> — {dog.breed_group || "No group"}
              </li>
            ))}
      </ul>
    </div>
  );
};

export default Dashboard;
