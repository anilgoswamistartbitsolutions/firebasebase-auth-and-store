export const metadata = {
  title: "Mbit - Portfolio Admin",
  description: "Portfolio Management Dashboard",
};
import "./layout.css";

export default function AuthLayout({ children }) {
  return (
    <div className="signup-container">
      <div className="info-section">
        <h2>Portfolio Admin</h2>
        <p>
          Welcome to your portfolio management dashboard. Access your creative workspace and manage your professional presence.
        </p>
        <ul>
          <li>Manage portfolio projects</li>
          <li>Update skills & experience</li>
          <li>Track visitor analytics</li>
          <li>Customize portfolio theme</li>
        </ul>
        <p>
          Secure admin access for portfolio management and content updates.
        </p>
      </div>
      <div className="form-section">
        <div className="signup-form">
          <div className="brand-logo-nn w-100 text-center">Mbit Admin</div>
          {children}
        </div>
      </div>
    </div>
  );
}
