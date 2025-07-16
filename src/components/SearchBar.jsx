const SearchBar = ({ setSearchQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search breed..."
      onChange={(e) => setSearchQuery(e.target.value)}
      style={{ marginBottom: "1rem", padding: "0.5rem" }}
    />
  );
};

export default SearchBar;
