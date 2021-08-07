import * as React from "react";

import "./App.scss";

const App = () => {
  const [count, setCount] = React.useState(0);

  return (
    <section className="wrapper">
      <h2>Let's use the counter!</h2>
      <h2 className="count">{count}</h2>
      <section className="inner-wrapper">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="button"
        >
          Increase
        </button>
        <button
          onClick={() => setCount((count) => count - 1)}
          className="button"
        >
          Decrease
        </button>
      </section>
    </section>
  );
};

export default App;
