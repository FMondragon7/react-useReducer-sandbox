/** @jsxImportSource @emotion/react */
import React, { useReducer, useState } from "react";
import { Global, css } from "@emotion/react";
import { FaTrash, FaStar } from "react-icons/fa";

import { Button, Input, Card, Container } from "./ui";

const globalStyles = css`
  * {
    padding: 0;
    margin: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(
      90deg,
      hsla(64, 41%, 92%, 1) 0%,
      hsla(196, 83%, 84%, 1) 50%,
      hsla(305, 75%, 83%, 1) 100%
    );
  }
`;

function configReducer(state, { type, payload }) {
  switch (type) {
    case "text":
      return { ...state, text: [payload] };
    case "priority":
      return { ...state, priority: !state.priority };
    case "setTask":
      return { text: "", priority: false, tasks: payload };
    case "toggle":
      return { ...state, tasks: payload };
    case "remove":
      return { ...state, tasks: payload };
    default:
      throw new Error("Invalid action");
  }
}

export default function App() {
  const initValues = {
    text: "",
    priority: false,
    tasks: [{ text: "This is an example task", priority: false }],
  };

  const [state, dispatch] = useReducer(configReducer, initValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.text === "") return;
    const newArray = [...state.tasks];
    const newData = { text: state.text[0], priority: state.priority };
    newArray.push(newData);
    dispatch({ type: "setTask", payload: newArray });
  };

  const handleRemove = (index) => {
    const newTasks = [...state.tasks];
    newTasks.splice(index, 1);
    dispatch({ type: "remove", payload: newTasks });
  };

  const togglePriority = (index) => {
    console.log(index);
    const newTasks = state.tasks.map((task, i) => {
      if (i === index) {
        task.priority = !task.priority;
      }
      return task;
    });
    dispatch({ type: "toggle", payload: newTasks });
  };

  return (
    <>
      <Global styles={globalStyles} />
      <Container>
        <h1>Tasks List</h1>
        <form
          onSubmit={handleSubmit}
          css={css`
            display: flex;
            gap: 8px;
          `}
        >
          <Input
            name="text"
            onChange={({ target: { value } }) =>
              dispatch({ type: "text", payload: value })
            }
            value={state.text}
          />
          <Input
            id="priority"
            name="priority"
            type="checkbox"
            checked={state.priority}
            hidden={true}
            onChange={() => dispatch({ type: "priority" })}
          />
          <Card>
            <label htmlFor="priority">
              <FaStar
                css={css`
                  color: ${state.priority ? "orange" : "lightgrey"};
                  cursor: pointer;
                  user-select: none;
                `}
              />
            </label>
          </Card>
          <Button type="submit">Add</Button>
        </form>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
          `}
        >
          {state.tasks.map((task, index) => (
            <Card key={index}>
              <FaStar
                css={css`
                  color: ${task.priority ? "orange" : "lightgrey"};
                  cursor: pointer;
                `}
                onClick={() => togglePriority(index)}
              />
              {task.text}
              <FaTrash onClick={() => handleRemove(index)} />
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
}
