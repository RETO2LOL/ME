import { useState } from "react";
import CalculatorHolder from "./components/CalculatorHolder";
import CalButtons from "./components/CalButtons";
function App() {
  return (
    <div>
      <CalculatorHolder></CalculatorHolder>
      <CalButtons></CalButtons>
    </div>
  );
}

export default App;
