import { useState } from 'react';

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: true },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
// ];

export default function App() {
  let [items, setItems] = useState([]);

  function handleItems(item) {
    setItems(items => [...items, item])
  }

  return <div className="app">
    <Logo />
    <Form onAddItem={handleItems} />
    <PackingList items={items} />
    <Stats />
  </div>
}

function Logo() {
  return <h1>🏖️ Far Away 💼</h1>
}

function Form({ onAddItem }) {
  let [quantity, setQuantity] = useState(1);
  let [description, setDescription] = useState("");



  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now()
    };

    onAddItem(newItem);

    setQuantity(1)
    setDescription("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😊 trip ?</h3>
      <select
        value={quantity}
        onChange={e => {
          setQuantity(Number(e.target.value))
        }}
      >
        {Array.from
          ({ length: 20 }, (_, i) => i + 1)
          .map(num => (
            <option value={num} key={num}>
              {num}
            </option>
          ))
        }
      </select>
      <input type="text"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Item..." />
      <button>Add</button>
    </form>
  )
}

function PackingList({ items }) {
  return <div className="list">
    <ul>
      {items.map((item) => (<Item item={item} key={item.id} />))}
    </ul>
  </div>
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  )
}

function Stats() {
  return <footer className="stats">
    <em>
      You have X items on your list, and you already packed X.
    </em>
  </footer>
}