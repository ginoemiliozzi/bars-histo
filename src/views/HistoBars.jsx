import React, { useState, useEffect } from "react";
import { useInterval } from "../hooks/useInterval";
import _ from "lodash";
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
import AnimatedBars from "../components/AnimatedBars";
import StaticBars from "../components/StaticBars";

const HistoBars = () => {
  const location = useLocation();

  const entries = Object.entries(location.state.data);
  const totalPeriods = entries.length;
  const initialValues = entries[0][1];
  const initialList = _.orderBy(initialValues, ["value"], "desc");

  const [list, setlist] = useState(initialList);
  const [currentPeriod, setCurrentPeriod] = useState(0);
  const [playing, setPlaying] = useState(true);

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
        {playing ? <AnimatedBars list={list} /> : <StaticBars list={list} />}
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
