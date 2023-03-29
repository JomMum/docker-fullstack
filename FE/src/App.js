import React, { useState, useEffect } from 'react';
import logo from './logo192.png';
import './App.css';
import axios from "axios";

function App() {
  const [lists, setLists] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    axios.get('/api/values')
      .then(response => {
        console.log("response: ", response);
        setLists(response.data);
      })
  })

  const changeHandler = (event) => {
    setValue(event.currentTarget.value)
  }

  const submitHandler = (event) => {
    event.preventDefault();
    axios.post("/api/value", { value: value })
      .then(response => {
        if(response.data.success) {
          console.log("response: ", response);
          setLists([...lists, response.data])
        }
        else {
          alert("데이터를 저장하는 데 실패하였습니다.")
        }
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          {lists && lists.map((list, index) => (
            <li key={index}>{list.value}</li>
          ))}

          <form className="example" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="입력해주세요..."
              onChange={changeHandler}
              value={value}
            />
            <button type="submit">확인</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
