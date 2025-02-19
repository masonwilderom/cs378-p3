import React, { useState } from 'react';
import './style.css';

const menuItems = [
  {
    id: 1,
    title: 'Whataburger',
    price: '$4.75',
    description: 'Classic 100% pure beef patty, fresh veggies, and our signature bun.',
    image: 'https://dynl.mktgcdn.com/p/wbvASP0FodJxR5yVpOCKTl1DWi0hgnqfTupzOjp7_nc/1900x1266.jpg',
  },
  {
    id: 2,
    title: 'Double Meat Whataburger',
    price: '$5.95',
    description: 'Double the beef, double the flavor, with all the fresh toppings.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSR6FyNKGde7ljIASIrsxLLxzQIR-Zn_w4_Q&s',
  },
  {
    id: 3,
    title: 'Avocado Bacon Burger',
    price: '$6.75',
    description: 'Fresh avocado, smoky bacon, cheese, and a juicy beef patty.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6TtRecF-XY2qPyIktcHHg6-T3XpJiBH__uQ&s',
  },
  {
    id: 4,
    title: 'Honey BBQ Chicken Strip',
    price: '$5.99',
    description: 'Crispy chicken strips, tangy BBQ sauce, and melted cheese.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCDdCmwFG5uhrztebs9HDTmpkp3szkMhdKbQ&s',
  },
  {
    id: 5,
    title: 'French Fries',
    price: '$2.49',
    description: 'Golden and crisp, the perfect side for your burger.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7bsRai9-4WFWkOWz77oHhnYq1tAVHMAWFXA&s',
  }
];

const Header = () => (
  <header className="text-center p-3 bg-light">
    <img
      src="https://1000logos.net/wp-content/uploads/2023/04/Whataburger-Logo.jpg"
      alt="Whataburger Logo"
      className="logo mb-2"
    />
    <p className="tagline fst-italic text-secondary mb-1">
      Taste the Tradition of Texas!
    </p>
    <h1 className="fs-3 text-dark fw-bold">Our Signature Menu</h1>
  </header>
);

const MenuItem = ({ item, count, onIncrement, onDecrement }) => (
  <div className="row align-items-center border-bottom py-3">
    <div className="col-auto">
      <a href={item.image} target="_blank" rel="noopener noreferrer">
        <img
          src={item.image}
          alt={item.title}
          className="img-fluid rounded item-image"
        />
      </a>
    </div>
    <div className="col">
      <h2 className="h5 mb-1">{item.title}</h2>
      <p className="mb-1 text-muted">{item.description}</p>
      <p className="mb-0 fw-bold">{item.price}</p>
    </div>
    <div className="col-auto">
      <button
        onClick={() => onDecrement(item.id)}
        className="btn btn-outline-secondary me-2"
      >
        -
      </button>
      <span>{count}</span>
      <button
        onClick={() => onIncrement(item.id)}
        className="btn btn-outline-primary ms-2"
      >
        +
      </button>
    </div>
  </div>
);

const App = () => {
  // Initialize cart state with a count of 0 for each menu item.
  const initialCart = menuItems.reduce((acc, item) => {
    acc[item.id] = 0;
    return acc;
  }, {});

  const [cart, setCart] = useState(initialCart);

  const handleIncrement = (id) => {
    setCart((prevCart) => ({
      ...prevCart,
      [id]: prevCart[id] + 1,
    }));
  };

  const handleDecrement = (id) => {
    setCart((prevCart) => ({
      ...prevCart,
      [id]: Math.max(prevCart[id] - 1, 0),
    }));
  };

  const handleClear = () => {
    // Reset all counts to zero.
    const clearedCart = Object.keys(cart).reduce((acc, key) => {
      acc[key] = 0;
      return acc;
    }, {});
    setCart(clearedCart);
  };

  // Calculate subtotal based on the counts and prices.
  const subtotal = menuItems.reduce((total, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    const count = cart[item.id] || 0;
    return total + price * count;
  }, 0);

  const handleOrder = () => {
    // Filter items that have been added to the cart.
    const orderedItems = menuItems.filter(item => cart[item.id] > 0);
    if (orderedItems.length === 0) {
      alert("No items in cart");
      return;
    }

    let message = "Order placed:\n";
    orderedItems.forEach(item => {
      message += `${item.title}: ${cart[item.id]}\n`;
    });
    message += `\nSubtotal: $${subtotal.toFixed(2)}`;
    alert(message);
  };

  return (
    <>
      <Header />
      <main className="container my-4">
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            count={cart[item.id]}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        ))}
        <div className="cart-summary mt-4 p-3 border">
          <h2 className="h5">Cart Summary</h2>
          <p className="mb-2">Subtotal: ${subtotal.toFixed(2)}</p>
          <button onClick={handleOrder} className="btn btn-success me-2">
            Order
          </button>
          <button onClick={handleClear} className="btn btn-danger">
            Clear all
          </button>
        </div>
      </main>
    </>
  );
};

export default App;
