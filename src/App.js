/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
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

export default function App() {
  const [data, setData] = useState({ text: "", priority: false });
  const [tasks, setTasks] = useState([
    { text: "This is an example task", priority: false }
  ]);

  const handleChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.text === "") return;
    setTasks([...tasks, data]);
    setData({ text: "", priority: false });
  };

  const handleRemove = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const togglePriority = (index) => {
    const newTasks = tasks.map((task, i) => {
      if (i === index) {
        task.priority = !task.priority;
      }
      return task;
    });
    setTasks(newTasks);
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
            onChange={({ target: { name, value } }) =>
              handleChange(name, value)
            }
            value={data.text}
          />
          <Input
            id="priority"
            name="priority"
            type="checkbox"
            checked={data.priority}
            hidden={true}
            onChange={({ target: { name, checked } }) =>
              handleChange(name, checked)
            }
          />
          <Card>
            <label htmlFor="priority">
              <FaStar
                css={css`
                  color: ${data.priority ? "orange" : "lightgrey"};
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
          {tasks.map((task, index) => (
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
