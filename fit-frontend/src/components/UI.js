import React from "react";

export const Card = ({ title, children, actions }) => (
  <div className="card">
    {title && <h3>{title}</h3>}
    <div>{children}</div>
    {actions && <div style={{ marginTop: 12 }}>{actions}</div>}
  </div>
);

export const Stat = ({ label, value }) => (
  <div className="card">
    <div className="helper">{label}</div>
    <h2>{value}</h2>
  </div>
);