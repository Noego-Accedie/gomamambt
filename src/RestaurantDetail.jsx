import React from "react";

const MENUS = {
  1: [
    { name: "2-Piece Chicken Set", desc: "With fries & soft drink.", price: "$6.90" },
    { name: "Family Bucket", desc: "8 pcs chicken, 3 sides, 4 drinks.", price: "$24.90" },
    { name: "Zinger Burger Combo", desc: "Spicy burger with fries & drink.", price: "$7.50" },
  ],
  2: [
    { name: "Nasi Katok Original", desc: "Fried chicken, rice, sambal.", price: "$1.00" },
    { name: "Nasi Katok Cheese", desc: "Cheese chicken + extra sambal.", price: "$1.50" },
    { name: "Ayam Kicap Set", desc: "Soy sauce chicken with rice.", price: "$3.50" },
  ],
  3: [
    { name: "Beef Bibimbap", desc: "Mixed rice with veggies & egg.", price: "$7.90" },
    { name: "Kimchi Fried Rice", desc: "Spicy kimchi rice with chicken.", price: "$6.50" },
    { name: "Tteokbokki Snack", desc: "Chewy rice cakes in spicy sauce.", price: "$4.20" },
  ],
  4: [
    { name: "Butter Chicken", desc: "Creamy tomato curry with naan.", price: "$8.50" },
    { name: "Lamb Curry", desc: "Slow cooked lamb with spices.", price: "$9.90" },
    { name: "Garlic Naan", desc: "Fresh naan with garlic & butter.", price: "$2.20" },
  ],
  5: [
    { name: "Brown Sugar Boba Milk", desc: "Signature drink with pearls.", price: "$3.80" },
    { name: "Matcha Latte Boba", desc: "Matcha milk tea with pearls.", price: "$3.90" },
    { name: "Taro Milk Tea", desc: "Purple taro drink with pearls.", price: "$3.50" },
  ],
  6: [
    { name: "The Fork Burger", desc: "Beef patty, cheese, house sauce.", price: "$7.90" },
    { name: "Chicken Chop", desc: "Grilled chicken with fries & salad.", price: "$8.50" },
    { name: "Student Combo", desc: "Mini burger, fries & drink.", price: "$4.90" },
  ],
};

export default function RestaurantDetail({ restaurant, onBack, onOpenReviews }) {
  const menuItems = MENUS[restaurant.id] || [];

  return (
    <section>
      <button className="back-button" onClick={onBack}>
        ← Back to browse
      </button>

      <div className="detail-hero">
        <img src={restaurant.image} alt={restaurant.name} className="detail-img" />
        <div className="detail-hero-info">
          <h1 className="detail-name">{restaurant.name}</h1>

          <div className="detail-meta">
            <span>{restaurant.cuisine}</span>
            <span>•</span>
            <span>{restaurant.priceLevel}</span>
          </div>

          <div className="detail-meta">
            <span>{restaurant.deliveryTime} min</span>
            <span>•</span>
            <span>{restaurant.distanceKm.toFixed(1)} km away</span>
          </div>

          <div className="detail-chip-row">
            <button
              type="button"
              className="rating-badge rating-link rating-clickable"
              onClick={() => onOpenReviews && onOpenReviews(restaurant)}
            >
              {restaurant.rating.toFixed(1)} ★ View reviews
            </button>

            {restaurant.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag-chip">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {restaurant.promo && (
        <div className="detail-promo">
          <strong>Promo:</strong> {restaurant.promo}
        </div>
      )}

      {/* Food menu only */}
      <div className="card detail-section">
        <h2>Food options</h2>
        {menuItems.length === 0 ? (
          <p className="detail-text">Menu information not available yet.</p>
        ) : (
          <ul className="menu-list">
            {menuItems.map((item) => (
              <li key={item.name} className="menu-item">
                <div className="menu-item-main">
                  <span className="menu-item-name">{item.name}</span>
                  <span className="menu-item-price">{item.price}</span>
                </div>
                <p className="menu-item-desc">{item.desc}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
