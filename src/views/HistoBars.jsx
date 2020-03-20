import React, { useState, useEffect } from "react";
import { useInterval } from "../hooks/useInterval";
import _ from "lodash";
import { useTransition, animated } from "react-spring";
import { useLocation } from "react-router-dom";
import {
  Box,
  Text,
  Slider,
  SliderFilledTrack,
  SliderTrack,
  SliderThumb,
  Icon,
} from "@chakra-ui/core";
import Header from "../components/Header";

const HistoBars = () => {
  const location = useLocation();

  const entries = Object.entries(location.state.data);
  const totalPeriods = entries.length;
  const initialValues = entries[0][1];
  const initialList = _.orderBy(initialValues, ["value"], "desc");

  const [list, setlist] = useState(initialList);
  const [currentPeriod, setCurrentPeriod] = useState(0);
  const [playing, setPlaying] = useState(true);

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
      console.log("from interval period: " + currentPeriod);
      if (currentPeriod + 1 < totalPeriods) {
        setlist(_.orderBy(entries[currentPeriod + 1][1], ["value"], "desc"));
        setCurrentPeriod(currentPeriod + 1);
      }
    },
    1000,
    totalPeriods,
    () => {
      setPlaying(false);
      setCurrentPeriod(0);
    }
  );

  useEffect(() => {
    if (!playing)
      setlist(_.orderBy(entries[currentPeriod][1], ["value"], "desc"));
  }, [currentPeriod]);

  return (
    <>
      <Header />
      <Text>Period {entries[currentPeriod][0]}</Text>
      <Box h={500}>
        {playing
          ? transitions.map(({ item, props: { y, ...rest }, key }) => (
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
            ))
          : list.map(item => (
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
            ))}
      </Box>
      <Slider
        color="green"
        min={0}
        max={totalPeriods - 1}
        value={currentPeriod}
        onChange={n => {
          console.log("current period from Onchange ", n);
          !playing && setCurrentPeriod(n);
        }}
      >
        <SliderTrack />
        <SliderFilledTrack />
        <SliderThumb size={8}>
          <Icon color="green.400" name="time" />
        </SliderThumb>
      </Slider>
    </>
  );
};

export default HistoBars;
