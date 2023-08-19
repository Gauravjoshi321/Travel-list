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

  function handleDeleteList() {
    const confirm = window.confirm("Are you sure you want to delete all the items");

    if (!confirm) return;

    setItems([]);
  }

  return <div className="app">
    <Logo />
    <Form onAddItem={handleAddItems} />
    <PackingList
      items={items}
      onDeleteItems={handleDeleteItems}
      onToggleCheckBox={handleToggleCheckBox}
      handleDeleteList={handleDeleteList}
    />
    <Stats items={items} />
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

function PackingList({ items, onDeleteItems, onToggleCheckBox, handleDeleteList }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description") sortedItems = items.slice()
    .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed") sortedItems = items.slice()
    .sort((a, b) => Number(a.packed) + Number(b.packed));

  return <div className="list">
    <ul>
      {sortedItems.map((item) => (<Item
        item={item}
        key={item.id}
        onDeleteItems={onDeleteItems}
        onToggleCheckBox={onToggleCheckBox}
      />))}
    </ul>

    <div className='actions'>
      <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
        <option value="input">Sort by Input order</option>
        <option value="description">Sort By Description</option>
        <option value="packed">Sort by Packed Status</option>
      </select>
      <button onClick={handleDeleteList}>Clear list</button>
    </div>
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

function Stats({ items }) {
  if (items.length === 0)
    return <footer className="stats">
      <em>
        Make your list and fly...✈️
      </em>
    </footer>

  const numsItems = items.length;
  const numPacked = items.filter(item => item.packed).length;
  const percentage = Math.round(numPacked / numsItems * 100);

  return <footer className="stats">
    <em>{
      percentage === 100
        ? `you are all ready to board ✈️`
        : `You have ${numsItems} items on your list, and you already packed ${numPacked} (${percentage}%).`
    }
    </em>
  </footer>
}