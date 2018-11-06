import React, { useState } from "react";
import ReactDOM from "react-dom";

function A() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

ReactDOM.render(document.querySelector("body"), <A />);
