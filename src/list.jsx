import { useState } from "react";
import { tourData } from "./data";
import Button from "@mui/material/Button";
export const List = ({ setLoading, setDep, dep }) => {
  const [data, setData] = useState(tourData);
  const [toggle, setToggle] = useState(true);
  const [readMore, setReadMore] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const [selected, setselected] = useState([]);
  const notInterested = (id) => {
    let currentItems = data.filter((val) => val.id !== id);
    setData(currentItems);
    if (data.length === 1) {
      setToggle(false);
    }
  };
  const refresh = () => {
    setData(tourData);
    setToggle(true);
    setNoMore(false);
  };
  const select = (place, id) => {
    let currentItems = data.filter((val) => val.id !== id);
    setData(currentItems);
    setselected((pre) => {
      return [...pre, place];
    });
    console.log(selected);
  };
  const unSelect = (place) => {
    let val = selected.filter((itr) => itr !== place);
    setselected(val);
    if (selected.length === 1 && data.length === 1) {
      setNoMore(true);
    }
  };
  if (noMore) {
    return (
      <center>
        <h1>No Tours Lefts</h1>
        <Button
          style={{ width: "150%" }}
          onClick={() => refresh()}
          variant="outlined"
          color="primary"
        >
          Refresh
        </Button>
      </center>
    );
  }
  return (
    <>
      {selected?.map((item, id) => (
        <>
          <center>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => unSelect(item)}
            >
              Un Select {item}
            </Button>
          </center>
          <br />
        </>
      ))}
      {toggle ? (
        data.map((ite, ind) => (
          <>
            <br />
            <div className="info">
              <p key={ite.id} style={{ textAlign: "center" }}>
                {ite.city}
              </p>
              <div>
                <p className="price">{ite.price} INR</p>
                <img src={ite.img} width="100%" />
                <p>{readMore ? ite.info : `${ite.info.substring(0, 100)}`}</p>
                <small
                  className="read"
                  onClick={() => setReadMore(ite.id ? !readMore : "")}
                >
                  {readMore ? "Read Less" : "Read More"}
                </small>
              </div>
              <Button
                variant="outlined"
                color="error"
                onClick={() => notInterested(ite.id)}
              >
                Not Interested
              </Button>
              <Button
                className="select"
                variant="outlined"
                color="primary"
                onClick={() => select(ite.city, ite.id)}
              >
                Select
              </Button>
            </div>{" "}
            <br />
          </>
        ))
      ) : (
        <center>
          <h1>No Tours Left</h1>
          <Button onClick={() => refresh()} variant="outlined" color="primary">
            Refresh
          </Button>
        </center>
      )}
    </>
  );
};
