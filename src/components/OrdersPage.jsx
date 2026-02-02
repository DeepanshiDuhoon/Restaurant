import { useEffect, useState } from "react";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 🔵 Loading state
  if (loading) {
    return (
      <div
        style={{
          paddingTop: 120,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontWeight: "bold", fontSize: 24 }}>
          📦 Fetching Your Orders
        </h2>
        <p style={{ color: "#666" }}>
          Please wait, we are preparing your order details…
        </p>
      </div>
    );
  }

  // 🟢 Order Successful state (No Orders Found removed)
  if (orders.length === 0) {
    return (
      <div
        style={{
          paddingTop: 120,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            background: "#e8f5e9",
            padding: "30px 40px",
            borderRadius: 12,
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ color: "#2e7d32", marginBottom: 10 }}>
            ✅ Order Successful
          </h2>

          <p style={{ color: "#444", fontSize: 15 }}>
            Your order has been placed successfully.
          </p>

          <p style={{ color: "#666", fontSize: 14, marginTop: 5 }}>
            It will appear here once it is processed.
          </p>
        </div>
      </div>
    );
  }

  // 🟣 Orders list
  return (
    <div
      style={{
        paddingTop: 100,
        padding: 20,
        background: "#f5f6fa",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>
        📦 Your Orders
      </h2>

      {orders.map(order => (
        <div
          key={order._id}
          style={{
            background: "#fff",
            maxWidth: 600,
            margin: "15px auto",
            padding: 20,
            borderRadius: 10,
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          }}
        >
          <p><b>Order No:</b> {order.orderNumber}</p>

          <hr />

          {order.items.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              <span>
                {item.menuItem?.name} × {item.quantity}
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}

          <hr />

          <p style={{ fontWeight: "bold", fontSize: 16 }}>
            Total: ₹{order.totalAmount}
          </p>

          <p style={{ color: "green", fontWeight: "bold" }}>
            Status: {order.paymentStatus}
          </p>
        </div>
      ))}
    </div>
  );
}

export default OrdersPage;
