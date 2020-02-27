import React, { useReducer } from "react";
import "./styles.css";

const counterReducer = (state, action) => {
  switch (action.type) {
    case "INC":
      return state + 1;
    case "DEC":
      return state > 0 ? state - 1 : 0;
    default:
      return state;
  }
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "NUMBER":
      const numReg = /[^0-9]/g;
      if (numReg.test(+action.target.value)) return state;
      return {
        ...state,
        [action.target.name]: +action.target.value
      };
    default:
      return {
        ...state,
        [action.target.name]: action.target.value
      };
  }
};

export default function App() {
  const [count, dispatch] = useReducer(counterReducer, 0);
  const [state, formDispatch] = useReducer(formReducer, {
    name: "",
    email: "",
    number: ""
  });
  const { name, email, number } = state;
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch({ type: "INC" })}>INC</button>
      <button onClick={() => dispatch({ type: "DEC" })}>DEC</button>
      <hr />
      <hr />
      <h1>
        이름: {name}, 이메일: {email}, 숫자: {number}
      </h1>
      <input
        placeholder="이름"
        name="name"
        value={name}
        onChange={e => formDispatch({ target: e.target })}
      />
      <input
        placeholder="이메일"
        name="email"
        value={email}
        onChange={e => formDispatch({ target: e.target })}
      />
      <input
        placeholder="숫자"
        name="number"
        value={number}
        onChange={e => formDispatch({ type: "NUMBER", target: e.target })}
      />
    </div>
  );
}
