import React from "react";

const StaticBars = ({ list }) => {
  return list.map(item => (
    <div
      style={{
        borderRadius: 30,
        width: item.value,
        height: 45,
        color: "#FFF",
        boxShadow: "1px 1px 1px rgb(30, 30, 30)",
        marginTop: 10,
        fontSize: 18,
        fontFamily: "'Baloo 2', cursive",
        textShadow: "2px 2px 3px black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className={item.class}
    >
      <h6>{item.name}</h6>
    </div>
  ));
};

export default StaticBars;
