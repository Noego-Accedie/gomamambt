// src/NotificationsSettings.jsx
import "./notifications.css"; // make sure this file exists

export default function NotificationsSettings({ onBack }) {
  return (
    <section>
      <button className="back-button" onClick={onBack}>
        ← Back to settings
      </button>

      <h1>Notifications</h1>
      <p className="lead">
        Manage how GoMamam sends you order updates and promotional messages.
      </p>

      {/* ORDER UPDATES */}
      <div className="card detail-section">
        <h2>Order updates</h2>
        <p className="detail-text">
          These notifications ensure you stay informed about your current order.
        </p>

        <ul className="settings-toggle-list">

          {/* REQUIRED: Always ON, disabled */}
          <li className="settings-toggle-row">
            <span>Order status (required)</span>
            <label className="toggle-wrapper">
              <input type="checkbox" checked disabled />
              <span className="toggle-slider disabled-toggle" />
            </label>
          </li>

          <li className="settings-toggle-row">
            <span>Rider is arriving</span>
            <label className="toggle-wrapper">
              <input type="checkbox" defaultChecked />
              <span className="toggle-slider" />
            </label>
          </li>

          <li className="settings-toggle-row">
            <span>Delivery completed</span>
            <label className="toggle-wrapper">
              <input type="checkbox" defaultChecked />
              <span className="toggle-slider" />
            </label>
          </li>
        </ul>
      </div>

      {/* MARKETING */}
      <div className="card detail-section">
        <h2>Promotions & marketing</h2>
        <p className="detail-text">
          Control which promotional messages you receive.
        </p>

        <ul className="settings-toggle-list">
          <li className="settings-toggle-row">
            <span>Restaurant promos</span>
            <label className="toggle-wrapper">
              <input type="checkbox" />
              <span className="toggle-slider" />
            </label>
          </li>

          <li className="settings-toggle-row">
            <span>Platform campaigns</span>
            <label className="toggle-wrapper">
              <input type="checkbox" />
              <span className="toggle-slider" />
            </label>
          </li>
        </ul>
      </div>
    </section>
  );
}
