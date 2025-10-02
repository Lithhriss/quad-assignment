import React, { useEffect, useState } from "react";
import './CategorySelector.css';

function CategorySelector({ onSelect, setQuestionData, setFeedback }) {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    fetch("/cat")
      .then((res) => res.json())
      .then((data) => {
		const sorted = data.trivia_categories.sort((a, b) => a.name.localeCompare(b.name));
        setCategories(sorted || []);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    onSelect(value); 
	setQuestionData(null);
	setFeedback("");
  };

  return (
  	    <div className="category-selector">
  	      <label className="category-dropdown">Choose a category:</label>
  	      <select
  	        value={selected}
  	        onChange={handleChange}
  	        className="dropdown"
  	      >
  	        <option value="">All categories</option>
  	        {categories.map((cat) => (
  	          <option key={cat.id} value={cat.id}>
  	            {cat.name}
  	          </option>
  	        ))}
  	      </select>
  	    </div>
  	  );
}

export default CategorySelector;