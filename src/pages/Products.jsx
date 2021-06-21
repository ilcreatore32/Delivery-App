import React from "react";

function Products() {
  return (
    <div>
      <h2 className="tab-title">Explora Envíos</h2>
      <div className="flex-container">
        <div className="flex-item">
          <h4>producto 1</h4>
          <button className="detail-button">Ver</button>
        </div>
        <div className="flex-item">
          <h4>producto 2</h4>
          <button className="detail-button">Ver</button>
        </div>
        <div className="flex-item">
          <h4>producto 3</h4>
          <button className="detail-button">Ver</button>
        </div>
        <div className="flex-item">
          <h4>producto 4</h4>
          <button className="detail-button">Ver</button>
        </div>
        <div className="flex-item">
          <h4>producto 5</h4>
          <button className="detail-button">Ver</button>
        </div>
        <button className="add-button flex-item">+</button>
      </div>
    </div>
  );
}

export default Products;
