export default function BillSkeleton() {
  return (
    <div style={{ padding: 20 }}>
      <h2>🧾 Generating Bill...</h2>

      <p>Order Number: ----</p>
      <p>Customer: Loading...</p>

      <hr />

      {[1, 2, 3].map(i => (
        <p key={i} style={{ color: "#aaa" }}>
          Item loading... × -- = ₹--
        </p>
      ))}

      <hr />
      <h3>Total: ₹----</h3>
      <p>Payment Status: Processing...</p>
    </div>
  );
}
