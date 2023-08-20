import React, { useState } from "react";
import Card from "./Card";

function Cards() {
  const [items, setItems] = useState(
    [
      { id: 1, img: "/img/circle1.png", stat: "" },
      { id: 1, img: "/img/circle2.png", stat: "" },
      { id: 2, img: "/img/cosrule1.png", stat: "" },
      { id: 2, img: "/img/cosrule2.png", stat: "" },
      { id: 3, img: "/img/ediff1.png", stat: "" },
      { id: 3, img: "/img/ediff2.png", stat: "" },
      { id: 4, img: "/img/infseries1.png", stat: "" },
      { id: 4, img: "/img/infseries2.png", stat: "" },
      { id: 5, img: "/img/int1.png", stat: "" },
      { id: 5, img: "/img/int2.png", stat: "" },
      { id: 6, img: "/img/pythag1.png", stat: "" },
      { id: 6, img: "/img/pythag2.png", stat: "" },
      { id: 7, img: "/img/sin1.png", stat: "" },
      { id: 7, img: "/img/sin2.png", stat: "" },
      { id: 8, img: "/img/tan1.png", stat: "" },
      { id: 8, img: "/img/tan2.png", stat: "" },
    ].sort(() => Math.random() - 0.5)
  );

  const [prev, setPrev] = useState(-1);
  const [locked, setLocked] = useState(false);

  function check(current) {
    if (
      locked ||
      items[current].stat == "correct" ||
      items[prev].stat == "correct"
    )
      return;
    if (items[current].id == items[prev].id) {
      items[current].stat = "correct";
      items[prev].stat = "correct";
      setItems([...items]);
      setPrev(-1);
      setLocked(false);
    } else {
      items[current].stat = "wrong";
      items[prev].stat = "wrong";
      setItems([...items]);
      setTimeout(() => {
        items[current].stat = "";
        items[prev].stat = "";
        setItems([...items]);
        setPrev(-1);
        setLocked(false);
      }, 1000);
    }
  }

  function handleClick(id) {
    if (locked || items[id].stat == "correct") return;
    if (prev === -1) {
      items[id].stat = "active";
      setItems([...items]);
      setPrev(id);
    } else {
      if (id == prev) return;
      setLocked(true);
      check(id);
    }
  }

  return (
    <div className="container">
      {items.map((item, index) => (
        <Card key={index} item={item} id={index} handleClick={handleClick} />
      ))}
    </div>
  );
}

export default Cards;
