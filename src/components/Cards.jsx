import React, { useState } from "react";
import Card from "./Card";

const shuffle = (arr) =>
  arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

const imgList = shuffle([
  "add",
  "adiff",
  "area",
  "arisum",
  "binom",
  "choose",
  "circarea",
  "circle",
  "cos",
  "cosrule",
  "cossqr",
  "diffsqr",
  "disc",
  "ediff",
  "infseries",
  "int",
  "len",
  "log",
  "loginv",
  "normal",
  "perm",
  "perp",
  "prime",
  "pythag",
  "shift",
  "sin",
  "sinsqr",
  "stretch",
  "tan",
  "tangent",
  "tree",
]);

const initialCards = [];

for (let i = 1; i < 9; i++) {
  initialCards.push({ id: i, img: `/img/${imgList[i]}1.png` });
  initialCards.push({ id: i, img: `/img/${imgList[i]}2.png` });
}

function Cards() {
  const [items, setItems] = useState(shuffle(initialCards));
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
      {items.length > 0 ? (
        items.map((item, index) => (
          <Card key={index} item={item} id={index} handleClick={handleClick} />
        ))
      ) : (
        <p>hello</p>
      )}
    </div>
  );
}

export default Cards;
