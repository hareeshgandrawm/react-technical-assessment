import React from "react";
import { useCart } from "../context/CartContext";

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (cart.length === 0) return <p>Your cart is empty</p>;

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.map((item) => (
        <div
          key={item.product.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <span>{item.product.name}</span>
          <span>${item.product.price}</span>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) =>
              updateQuantity(item.product.id, parseInt(e.target.value))
            }
            style={{ width: 60 }}
          />
          <button onClick={() => removeFromCart(item.product.id)}>Remove</button>
        </div>
      ))}
      <h3>Total: ${total.toFixed(2)}</h3>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};
