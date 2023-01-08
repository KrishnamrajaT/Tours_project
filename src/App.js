import "./styles.css";
import { List } from "./list";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [dep, setDep] = useState(false);
  useEffect(() => {
    setLoading(!loading);
  }, [dep]);
  if (loading) {
    return (
      <>
        <center>
          <h1>No Tours Lefts</h1>
          <Button variant="outlined" color="primary">
            Refresh
          </Button>
        </center>
      </>
    );
  }
  return (
    <div className="App">
      <List setLoading={setLoading} setDep={setDep} dep={dep} />
    </div>
  );
}
