import React from "react";

function Services() {
  return (
    <div>
      <h2 className="tab-title">Explora los Servicios de Transporte</h2>
      <div className="flex-container">
        <div className="flex-item">
          <h4>servicio 1</h4>
          <button className="detail-button">Ver</button>
        </div>
        <div className="flex-item">
          <h4>servicio 2</h4>
          <button className="detail-button">Ver</button>
        </div>
        <div className="flex-item">
          <h4>servicio 3</h4>
          <button className="detail-button">Ver</button>
        </div>
        <div className="flex-item">
          <h4>servicio 4</h4>
          <button className="detail-button">Ver</button>
        </div>
        <div className="flex-item">
          <h4>servicio 5</h4>
          <button className="detail-button">Ver</button>
        </div>
        <button className="add-button flex-item">+</button>
      </div>
    </div>
  );
}

export default Services;
