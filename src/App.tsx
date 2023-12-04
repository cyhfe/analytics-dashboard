import { useEffect, useState } from "react";
import img from "./assets/img.png";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(count);
  }, [count]);
  return (
    <div>
      app
      <img src={img} width={300} alt="img" />
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
    </div>
  );
}

export default App;
