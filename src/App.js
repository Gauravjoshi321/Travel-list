import { useState } from 'react';

export default function App() {
  let [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems(items => [...items, item])
  }

  function handleDeleteItems(id) {
    setItems(items => items.filter(item => item.id !== id));
  }

  function handleToggleCheckBox(id) {
    setItems(items => items.map(item => item.id === id
      ? { ...item, packed: !item.packed } : item));
  }

  return <div className="app">
    <Logo />
    <Form onAddItem={handleAddItems} />
    <PackingList
      items={items}
      onDeleteItems={handleDeleteItems}
      onToggleCheckBox={handleToggleCheckBox}
    />
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

function PackingList({ items, onDeleteItems, onToggleCheckBox }) {
  return <div className="list">
    <ul>
      {items.map((item) => (<Item
        item={item}
        key={item.id}
        onDeleteItems={onDeleteItems}
        onToggleCheckBox={onToggleCheckBox}
      />))}
    </ul>
  </div>
}

function Item({ item, onDeleteItems, onToggleCheckBox }) {
  return (
    <li>
      <input
        type='checkbox'
        value={item.packed}
        onClick={() => { onToggleCheckBox(item.id) }} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
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