import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function BillPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/orders/${id}`)
      .then(res => res.json())
      .then(data => setOrder(data));
  }, [id]);

  if (!order)
    return <p style={{ paddingTop: 100, padding: 20 }}>Loading bill...</p>;

  const styles = {
    wrapper: {
      paddingTop: 100,
      minHeight: "100vh",
      background: "#f5f6fa",
      display: "flex",
      justifyContent: "center",
    },
    card: {
      background: "#fff",
      width: "100%",
      maxWidth: 600,
      padding: 25,
      borderRadius: 10,
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    },
    title: {
      textAlign: "center",
      marginBottom: 20,
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 8,
      fontSize: 14,
    },
    divider: {
      margin: "15px 0",
      borderTop: "1px dashed #ccc",
    },
    itemRow: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 6,
      fontSize: 14,
    },
    total: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 10,
    },
    status: {
      marginTop: 10,
      fontWeight: "bold",
      color: order.paymentStatus === "PAID" ? "green" : "orange",
    },
    actions: {
      marginTop: 20,
      display: "flex",
      justifyContent: "space-between",
    },
    btn: {
      padding: "8px 16px",
      borderRadius: 6,
      border: "none",
      cursor: "pointer",
      background: "#ff7a18",
      color: "#fff",
      textDecoration: "none",
      fontSize: 14,
    },
    printBtn: {
      background: "#222",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>🧾 EatoEase Bill</h2>

        <div style={styles.row}>
          <span><b>Order No:</b></span>
          <span>{order.orderNumber}</span>
        </div>

        <div style={styles.row}>
          <span><b>Customer:</b></span>
          <span>{order.customerName}</span>
        </div>

        <div style={styles.divider}></div>

        {order.items.map((item, i) => (
          <div key={i} style={styles.itemRow}>
            <span>
              {item.menuItem?.name} × {item.quantity}
            </span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}

        <div style={styles.divider}></div>

        <div style={styles.total}>
          <span>Total</span>
          <span>₹{order.totalAmount}</span>
        </div>

        <div style={styles.status}>
          Status: {order.paymentStatus}
        </div>

        <div style={styles.actions}>
          <button
            style={{ ...styles.btn, ...styles.printBtn }}
            onClick={() => window.print()}
          >
            Print Bill
          </button>

          <Link to="/orders" style={styles.btn}>
            View All Orders
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BillPage;
