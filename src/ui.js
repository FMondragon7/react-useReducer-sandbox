import styled from "@emotion/styled";

const Button = styled.button`
  padding: 4px 8px;
  background-color: white;
  border: 2px solid black;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-radius: 8px;
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.25);
  gap: 16px;
  background-color: white;
  width: fit-content;
  & > svg {
    cursor: pointer;
    font-size: 16px;
    user-select: none;
  }
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 8px;
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.25);
  border: none;
  &:focus {
    outline: none;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  margin: 32px;
`;

export { Button, Card, Input, Container };
