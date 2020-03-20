import React from "react";
import { useTransition, animated } from "react-spring";

const AnimatedBars = ({ list }) => {
  const transitions = useTransition(
    list.map((data, i) => ({ ...data, y: i * 65, width: data.value })),
    d => d.name,
    {
      from: item => {
        return { position: "absolute", opacity: 0, width: item.value };
      },
      leave: { height: 0, opacity: 0 },
      enter: ({ y }) => ({ y, opacity: 1 }),
      update: ({ y, width }) => ({ y, width }),
    }
  );

  return transitions.map(({ item, props: { y, ...rest }, key }) => (
    <animated.div
      key={key}
      style={{
        transform: y.interpolate(y => `translate3d(0,${y}px,0)`),
        ...rest,
      }}
    >
      <div
        style={{
          borderRadius: 30,
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
    </animated.div>
  ));
};

export default AnimatedBars;
