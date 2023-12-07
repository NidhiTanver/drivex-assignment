import React from "react";

const ItemCard = ({ item, handleClick }) => (
  <div className="button-wrapper">
    <button
      className="btn btn-outline-dark item-button"
      onClick={() => handleClick(item.schemeCode)}
    >
      {item.schemeName} - {item.schemeCode}
    </button>
  </div>
);

export default ItemCard;
