import { useNavigate } from "react-router-dom";

function Cart({ cartItems, setCartItems }) {
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    if (!cartItems || cartItems.length === 0) {
      alert("Cart empty hai");
      return;
    }

    // 🔴 schema ke EXACT format me data
    const orderData = {
      orderNumber: "ORD-" + Date.now(),
      customerName: "Walk-in Customer",
      tableNumber: 1,

      items: cartItems.map(item => ({
        // ✅ MenuItem ka ObjectId (MUST)
        menuItem: item._id,
        quantity: item.quantity,
        price: item.price,
      })),

      totalAmount,
      paymentStatus: "PAID",
    };

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const savedOrder = await res.json();

      // cart clear
      setCartItems([]);

      // bill page
      navigate(`/bill/${savedOrder._id}`);
    } catch (err) {
      alert("Order place nahi hua");
    }
  };

  return (
    <div style={{ paddingTop: 100, padding: 20 }}>
      <h2>🛒 Cart</h2>

      {cartItems.map((item, i) => (
        <p key={i}>
          {item.name} × {item.quantity} = ₹
          {item.price * item.quantity}
        </p>
      ))}

      <h3>Total: ₹{totalAmount}</h3>

      <button onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
}

export default Cart;
