import { Link } from "react-router-dom";

function Register() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0b6b57, #149474)",
      fontFamily: "'Segoe UI', Arial, sans-serif"
    }}>
      <div style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "40px",
        width: "100%",
        maxWidth: "400px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
        textAlign: "center"
      }}>
        <h1 style={{ color: "#172033", marginBottom: "16px" }}>Register Page</h1>
        <p style={{ color: "#718096", marginBottom: "24px" }}>Register page is under development. Another team member will be handling this.</p>
        <Link to="/" style={{
          display: "inline-block",
          padding: "10px 18px",
          background: "#0b6b57",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "8px",
          fontWeight: "700",
          marginRight: "8px"
        }}>Back to Home</Link>
        <Link to="/login" style={{
          display: "inline-block",
          padding: "10px 18px",
          border: "1px solid #dfe4eb",
          color: "#263247",
          textDecoration: "none",
          borderRadius: "8px",
          fontWeight: "700"
        }}>Go to Login</Link>
      </div>
    </div>
  );
}

export default Register;
