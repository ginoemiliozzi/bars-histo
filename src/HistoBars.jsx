import React, { useState } from "react";
import { useInterval } from "./hooks/useInterval";
import _ from "lodash";
import { useTransition, animated } from "react-spring";
import { useLocation } from "react-router-dom";

const HistoBars = () => {
  const location = useLocation();
  console.log(location.state.data);
  const entries = Object.entries(location.state.data);

  const initialValues = entries[0][1];
  const initialList = _.orderBy(initialValues, ["value"], "desc");
  const [list, setlist] = useState(initialList);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  useInterval(
    () => {
      if (currentIndex + 1 !== entries.length) {
        setCurrentIndex(currentIndex + 1);
        setlist(_.orderBy(entries[currentIndex + 1][1], ["value"], "desc"));
      }
    },
    1000,
    entries.length
  );

  return (
    <>
      <h2>Tiempo {entries[currentIndex][0]}</h2>
      {transitions.map(({ item, props: { y, ...rest }, key }, index) => (
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
      ))}
    </>
  );
};

export default HistoBars;
