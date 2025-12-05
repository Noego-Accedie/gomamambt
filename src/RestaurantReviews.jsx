// src/RestaurantReviews.jsx
import { useState } from "react";

// Mock reviews per restaurant id
const REVIEWS = {
  1: {
    food: [
      { rating: 5, text: "Chicken was crispy and fresh, good portion size." },
      { rating: 3, text: "Fries were a bit soggy, but still okay." },
    ],
    delivery: [
      { rating: 5, text: "Rider arrived earlier than expected, very friendly." },
      { rating: 4, text: "Packaging was secure, drink didn’t spill." },
    ],
  },
  2: {
    food: [
      { rating: 5, text: "Sambal is 🔥, really worth the price." },
      { rating: 4, text: "Rice sometimes a bit dry but chicken is great." },
    ],
    delivery: [
      { rating: 4, text: "Arrived warm, rider called when nearby." },
      { rating: 3, text: "Slightly late on a busy night, but acceptable." },
    ],
  },
  3: {
    food: [
      { rating: 5, text: "Bibimbap is flavourful and not too oily." },
      { rating: 4, text: "Good balance of veggies and meat." },
    ],
    delivery: [{ rating: 5, text: "Still hot when it arrived, well packed." }],
  },
  4: {
    food: [
      { rating: 4, text: "Curry is rich, naan is soft and buttery." },
      { rating: 4, text: "Big portions, good for sharing." },
    ],
    delivery: [{ rating: 3, text: "A bit of curry spilled but overall okay." }],
  },
  5: {
    food: [
      { rating: 4, text: "Milk tea is not too sweet, pearls are chewy." },
      { rating: 5, text: "Love the brown sugar series!" },
    ],
    delivery: [{ rating: 5, text: "Drinks arrived cold with ice still intact." }],
  },
  6: {
    food: [
      { rating: 4, text: "Burgers are juicy, fries nice and crispy." },
      { rating: 3, text: "Portion could be slightly bigger for the price." },
    ],
    delivery: [{ rating: 4, text: "Delivered fast, food still warm." }],
  },
};

export default function RestaurantReviews({ restaurant, onBack }) {
  const [tab, setTab] = useState("food");

  const reviewsForRestaurant = REVIEWS[restaurant.id] || { food: [], delivery: [] };
  const foodReviews = reviewsForRestaurant.food;
  const deliveryReviews = reviewsForRestaurant.delivery;
  const activeReviews = tab === "food" ? foodReviews : deliveryReviews;

  return (
    <section>
      <button className="back-button" onClick={onBack}>
        ← Back
      </button>

      <h1>{restaurant.name} reviews</h1>
      <p className="lead">
        Food and delivery reviews are separated to make feedback clearer for both
        customers and restaurants.
      </p>

      <div className="card detail-section">
        <div className="detail-tabs">
          <button
            className={tab === "food" ? "detail-tab active" : "detail-tab"}
            onClick={() => setTab("food")}
          >
            Food Reviews
          </button>
          <button
            className={tab === "delivery" ? "detail-tab active" : "detail-tab"}
            onClick={() => setTab("delivery")}
          >
            Delivery Reviews
          </button>
        </div>

        {activeReviews.length === 0 ? (
          <p className="detail-text">No reviews yet in this category.</p>
        ) : (
          <div className="review-list">
            {activeReviews.map((rev, idx) => (
              <div key={idx} className="review-card">
                <div className="review-rating">{rev.rating.toFixed(1)} ★</div>
                <p className="review-text">{rev.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
