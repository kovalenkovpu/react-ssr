import * as React from "react";

const Home: React.FC<{ count?: number }> = ({ count: initialCount } = { count: 0 }) => {
  const [count, setCount] = React.useState(Number(initialCount));

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

export { Home };
