const DataList = ({ dogs }) => {
  return (
    <ul>
      {dogs.map((dog) => (
        <li key={dog.id} style={{ borderBottom: "1px solid #ccc", padding: "1rem" }}>
          <strong>{dog.name}</strong><br />
          Weight: {dog.weight.imperial} lbs<br />
          Height: {dog.height.imperial} in<br />
          Group: {dog.breed_group || "Unknown"}
        </li>
      ))}
    </ul>
  );
};

export default DataList;
