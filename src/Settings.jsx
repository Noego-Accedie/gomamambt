export default function Settings({ onOpenNotifications }) {
  const items = [
    { id: "saved", label: "My saved places", icon: "📍" },
    { id: "messages", label: "Messages", icon: "💬" },
    { id: "orders", label: "Orders", icon: "🧾" },
    { id: "wallets", label: "Wallets", icon: "👛" },
    { id: "promotions", label: "Promotions", icon: "🏷️" },
    { id: "help", label: "Help", icon: "⚽" }, // just mimicking the screenshot icon
    { id: "notifications", label: "Notifications", icon: "🔔", clickable: true },
    { id: "sessions", label: "Sessions", icon: "☰" },
    { id: "favorites", label: "Favorites", icon: "♡" },
    { id: "language", label: "English", icon: "🌐" },
    { id: "logout", label: "Logout", icon: "⏏" },
  ];

  return (
    <section>
      <h1>Settings</h1>
      <p className="lead">
        Manage your account, notifications, and preferences for GoMamam.
      </p>

      <ul className="settings-list">
        {items.map((item) => {
          const isNotifications = item.id === "notifications";
          return (
            <li
              key={item.id}
              className={
                "settings-item" +
                (isNotifications ? " settings-item-clickable" : "")
              }
              onClick={() => {
                if (isNotifications && onOpenNotifications) {
                  onOpenNotifications();
                }
              }}
            >
              <div className="settings-left">
                <span className="settings-icon">{item.icon}</span>
                <span className="settings-label">{item.label}</span>
              </div>

              {/* Right arrow only for Notifications to show it goes somewhere */}
              {isNotifications && <span className="settings-arrow">›</span>}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
