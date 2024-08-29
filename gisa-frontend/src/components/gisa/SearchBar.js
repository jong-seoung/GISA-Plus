import React from "react";
import { InputGroup, FormControl, ListGroup } from "react-bootstrap";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  showSuggestions,
  setShowSuggestions,
  origCategoryList,
  handleClick,
  handleSubmit,
}) => (
  <div style={{ position: "relative", width: "20%" }}>
    <form onSubmit={handleSubmit}>
      <InputGroup>
        <FormControl
          placeholder="자격증 검색"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSuggestions(true);
          }}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
        />
        {/* 검색어 미리보기 */}
        {showSuggestions && searchTerm && (
          <ListGroup
            className="position-absolute w-100"
            style={{
              zIndex: 1000,
              top: "100%",
              maxHeight: "150px",
              overflowY: "auto",
            }}
          >
            {origCategoryList
              .filter((category) =>
                category.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .slice(0, 5)
              .map((category, index) => (
                <ListGroup.Item
                  key={index}
                  onClick={() => handleClick(category.name)}
                  style={{ cursor: "pointer" }}
                >
                  {category.name}
                </ListGroup.Item>
              ))}
          </ListGroup>
        )}
      </InputGroup>
    </form>
  </div>
);

export default SearchBar;
