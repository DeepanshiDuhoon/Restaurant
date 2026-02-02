import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* 🔥 FULL MENU ITEMS */
const fullMenuItems = [
  { _id: "m1", name: "Veg Burger", price: 120 },
  { _id: "m2", name: "Cheese Burger", price: 150 },
  { _id: "m3", name: "French Fries", price: 100 },
  { _id: "m4", name: "Peri Peri Fries", price: 130 },
  { _id: "m5", name: "Veg Cutlet", price: 90 },
  { _id: "m6", name: "Aloo Tikki", price: 80 },
  { _id: "m7", name: "Hara Bhara Kabab", price: 160 },
  { _id: "m8", name: "Spring Roll", price: 150 },
  { _id: "m9", name: "Veg Hakka Noodles", price: 180 },
  { _id: "m10", name: "Veg Fried Rice", price: 170 },
  { _id: "m11", name: "Paneer Chilli", price: 220 },
  { _id: "m12", name: "Gobi Manchurian", price: 190 },
  { _id: "m13", name: "Chicken Manchurian", price: 260 },
  { _id: "m14", name: "Chicken Noodles", price: 240 },
  { _id: "m15", name: "Margherita Pizza", price: 250 },
  { _id: "m16", name: "Farmhouse Pizza", price: 320 },
  { _id: "m17", name: "Paneer Pizza", price: 340 },
  { _id: "m18", name: "Cheese Burst Pizza", price: 380 },
  { _id: "m19", name: "Veg Biryani", price: 210 },
  { _id: "m20", name: "Paneer Tikka", price: 220 },
  { _id: "m21", name: "Paneer Butter Masala", price: 290 },
  { _id: "m22", name: "Dal Makhani", price: 240 },
  { _id: "m23", name: "Mix Veg", price: 200 },
  { _id: "m24", name: "Rajma Masala", price: 210 },
  { _id: "m25", name: "Chole Bhature", price: 180 },
  { _id: "m26", name: "Chicken Biryani", price: 260 },
  { _id: "m27", name: "Butter Chicken", price: 320 },
  { _id: "m28", name: "Chicken Curry", price: 280 },
  { _id: "m29", name: "Chicken Tikka", price: 320 },
  { _id: "m30", name: "Mutton Curry", price: 420 },
  { _id: "m31", name: "Fish Fry", price: 350 },
  { _id: "m32", name: "Tandoori Roti", price: 25 },
  { _id: "m33", name: "Butter Roti", price: 30 },
  { _id: "m34", name: "Plain Naan", price: 40 },
  { _id: "m35", name: "Butter Naan", price: 50 },
  { _id: "m36", name: "Cold Drink", price: 40 },
  { _id: "m37", name: "Fresh Lime Soda", price: 60 },
  { _id: "m38", name: "Cold Coffee", price: 90 },
  { _id: "m39", name: "Mango Shake", price: 90 },
  { _id: "m40", name: "Chocolate Shake", price: 110 },
  { _id: "m41", name: "Gulab Jamun", price: 80 },
  { _id: "m42", name: "Ice Cream", price: 70 },
  { _id: "m43", name: "Brownie", price: 120 },
  { _id: "m44", name: "Rasgulla", price: 80 },
  { _id: "m45", name: "Falooda", price: 120 },
];

function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/menu")
      .then(res => res.json())
      .then(data => setMenu([...data, ...fullMenuItems]))
      .catch(() => setMenu(fullMenuItems));
  }, []);

  const getQty = (id) =>
    cart.find(i => i._id === id)?.qty || 0;

  const addItem = (item) => {
    setCart(prev => {
      const found = prev.find(i => i._id === item._id);
      if (found) {
        return prev.map(i =>
          i._id === item._id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeItem = (id) => {
    setCart(prev =>
      prev
        .map(i =>
          i._id === id ? { ...i, qty: i.qty - 1 } : i
        )
        .filter(i => i.qty > 0)
    );
  };

  const total = cart.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  const payNow = async () => {
    if (cart.length === 0) return;

    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: "Customer",
        tableNumber: 1,
        items: cart.map(i => ({
          menuItem: i._id,
          quantity: i.qty,
          price: i.price,
        })),
        totalAmount: total,
        paymentStatus: "PAID",
      }),
    });

    const data = await res.json();
    if (data?._id) navigate(`/bill/${data._id}`);
  };

  const filteredMenu = menu.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <div style={styles.menu}>
        <h2>🍽 Menu</h2>

        <input
          placeholder="Search food item..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={styles.search}
        />

        {filteredMenu.length === 0 ? (
          <div style={styles.noData}>
           Looks like there are no items available right now.
          Please check back later.
          </div>
        ) : (
          filteredMenu.map(item => {
            const qty = getQty(item._id);
            return (
              <div key={item._id} style={styles.menuItem}>
                <div>
                  <strong>{item.name}</strong>
                  <div style={{ fontSize: 13 }}>₹{item.price}</div>
                </div>

                <div style={styles.controls}>
                  <button
                    onClick={() => removeItem(item._id)}
                    disabled={qty === 0}
                    style={{
                      ...styles.removeBtn,
                      opacity: qty === 0 ? 0.4 : 1,
                    }}
                  >
                    Remove
                  </button>

                  <span style={styles.qty}>{qty}</span>

                  <button
                    onClick={() => addItem(item)}
                    style={styles.addBtn}
                  >
                    Add
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div style={styles.cart}>
        <h3>🧾 Bill</h3>

        {cart.length === 0 ? (
          <p style={{ color: "#888" }}>No items selected</p>
        ) : (
          <>
            {cart.map(i => (
              <div key={i._id} style={styles.cartItem}>
                <span>{i.name}</span>
                <span>{i.qty} × ₹{i.price}</span>
              </div>
            ))}
            <hr />
            <h3>Total: ₹{total}</h3>
            <button style={styles.payBtn} onClick={payNow}>
              Pay Now
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default MenuPage;

const styles = {
  page: { display: "flex", gap: 30, padding: 25, background: "#f4f4f4" },
  menu: { flex: 2, background: "#fff", padding: 20, borderRadius: 10 },
  search: { width: "100%", padding: 10, marginBottom: 15 },
  menuItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: 12,
    borderBottom: "1px solid #eee",
  },
  controls: { display: "flex", alignItems: "center", gap: 8 },
  addBtn: {
    background: "#ff7a18",
    color: "#fff",
    border: "none",
    padding: "5px 12px",
    borderRadius: 4,
  },
  removeBtn: {
    background: "#eee",
    border: "1px solid #ccc",
    padding: "5px 10px",
    borderRadius: 4,
  },
  qty: { minWidth: 20, textAlign: "center", fontWeight: "bold" },
  cart: { flex: 1, background: "#fff", padding: 20, borderRadius: 10 },
  cartItem: { display: "flex", justifyContent: "space-between", marginBottom: 8 },
  payBtn: {
    marginTop: 15,
    width: "100%",
    padding: 12,
    background: "#ff7a18",
    color: "#fff",
    border: "none",
    borderRadius: 6,
  },
  noData: {
    textAlign: "center",
    padding: "40px 0",
    color: "#777",
    fontSize: 16,
  },
};
