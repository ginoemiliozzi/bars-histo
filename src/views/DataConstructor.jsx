import React, { useState } from "react";
import { withRouter } from "react-router";
import {
  Input,
  Box,
  IconButton,
  Flex,
  List,
  ListItem,
  ListIcon,
  Text,
  Button,
  Heading,
  NumberInputField,
  NumberInput,
  Tag,
  TagIcon,
  TagLabel,
} from "@chakra-ui/core";
import _ from "lodash";
import Header from "../components/Header";

const range = (start, end) => {
  if (!start || !end) return [];
  if (start == end) return [start];
  else return [start, ...range(start + 1, end)];
};

const DataConstructor = ({ history }) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [periods, setPeriods] = useState(0);
  const classesAvailable = [
    "bblue",
    "bgreen",
    "bred",
    "borange",
    "byellow",
    "bpurple",
    "bpink",
    "bblack",
  ];
  const [tempData, setTempData] = useState({});

  const handleAddCategory = () => {
    if (
      categoryList.includes(categoryName) ||
      categoryName === "" ||
      categoryName.includes("--")
    )
      return;
    setCategoryList(categoryList.concat(categoryName));
    setCategoryName("");
  };

  const handleDeleteCategory = category => {
    setCategoryList(categoryList.filter(c => c !== category));
  };

  const buildFinalData = (data, classesAvailable) => {
    const entries = Object.entries(data);
    let finalData = {};

    const allCategories = [...new Set(entries.map(e => e[0].split("--")[0]))];
    const classPerCat = _.zip(allCategories, classesAvailable);
    console.log(classPerCat);

    entries.forEach(e => {
      const categoryAndPeriod = e[0].split("--");
      const category = categoryAndPeriod[0];
      const period = categoryAndPeriod[1];
      const value = e[1];

      if (!finalData[period]) {
        finalData = {
          ...finalData,
          [period]: [
            {
              name: category,
              value: parseInt(value),
              class: classPerCat.find(pair => pair[0] === category)[1],
            },
          ],
        };
      } else {
        finalData[period].push({
          name: category,
          value: parseInt(value),
          class: classPerCat.find(pair => pair[0] === category)[1],
        });
      }
    });
    history.push({
      pathname: "/histobars",
      state: { data: finalData },
    });
  };

  return (
    <>
      <Header />
      <Box mb={3} p={5} shadow="md" borderWidth="1px" flex="1" rounded="md">
        <Heading fontSize="xl">Use your own data!</Heading>
        <Text mt={4}>
          In this section you can fill in your own data to create a dynamic
          historical bar graph.
        </Text>
      </Box>
      <Flex mb={10}>
        <Input
          mr={3}
          placeholder="Add a category"
          size="md"
          focusBorderColor="green.400"
          variant="flushed"
          value={categoryName}
          onChange={e => setCategoryName(e.target.value)}
        />
        <IconButton
          aria-label="Add category"
          icon="add"
          onClick={handleAddCategory}
        />
      </Flex>
      <List mb={3} spacing={3}>
        {categoryList.map(c => (
          <ListItem key={c}>
            <Flex alignItems={"center"}>
              <ListIcon icon="chevron-right" color="green.500" />
              <Text mr={3}>{c}</Text>
              <IconButton
                aria-label="Delete category"
                icon="delete"
                onClick={() => handleDeleteCategory(c)}
              />
            </Flex>
          </ListItem>
        ))}
      </List>
      <Box mb={3} p={5}>
        <Text>How many periods of time do you want to represent?</Text>
        <NumberInput mb={5} min={1} max={100}>
          <NumberInputField
            onChange={e => setPeriods(e.target.value)}
            value={periods}
          />
        </NumberInput>
        {range(1, periods).map(p => {
          return (
            <Box key={p}>
              <Tag mb={3} size="md" variantColor="cyan">
                <TagIcon icon="calendar" size="12px" />
                <TagLabel>Period {p}</TagLabel>
              </Tag>
              {categoryList.map((category, idx) => (
                <Flex key={category}>
                  <Text mr={3}>{category} value for this period</Text>
                  <NumberInput>
                    <NumberInputField
                      value={tempData[`${category}--${p}`] || 0}
                      onChange={e => {
                        setTempData({
                          ...tempData,
                          [`${category}--${p}`]: e.target.value,
                        });
                      }}
                    />
                  </NumberInput>
                </Flex>
              ))}
            </Box>
          );
        })}
      </Box>
      <Box>
        <Button onClick={() => buildFinalData(tempData, classesAvailable)}>
          Generate animation
        </Button>
      </Box>
    </>
  );
};

export default withRouter(DataConstructor);
