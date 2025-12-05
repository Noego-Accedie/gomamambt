import { useState } from "react";

import Browse from "./Browse.jsx";
import RestaurantDetail from "./RestaurantDetail.jsx";
import RestaurantReviews from "./RestaurantReviews.jsx";
import Settings from "./Settings.jsx";
import NotificationsSettings from "./NotificationsSettings.jsx";

import kfcImg from "./assets/zinger.jpg";
import katokImg from "./assets/katok.jpg";
import seoulImg from "./assets/beef.jpg";
import aichaImg from "./assets/brown.jpg";
import theforkImg from "./assets/forkburg.jpg";
import gomamamImg from "./assets/gomamam.jpg";

const RECOMMENDATIONS = [
  {
    id: 1,
    restaurant: "KFC",
    dish: "Zinger Burger Combo",
    price: "$7.50",
    reason: "you often order spicy chicken meals",
    image: kfcImg,
  },
  {
    id: 2,
    restaurant: "Super Nasi Katok",
    dish: "Nasi Katok Cheese",
    price: "$1.50",
    reason: "you like budget-friendly late-night orders",
    image: katokImg,
  },
  {
    id: 3,
    restaurant: "Seoul Garden",
    dish: "Beef Bibimbap",
    price: "$7.90",
    reason: "you rated Korean food highly last week",
    image: seoulImg,
  },
  {
    id: 4,
    restaurant: "Ai Cha Serusop",
    dish: "Brown Sugar Boba Milk",
    price: "$3.80",
    reason: "you frequently order sweet drinks in the evening",
    image: aichaImg,
  },
  {
    id: 5,
    restaurant: "The Fork",
    dish: "The Fork Burger",
    price: "$7.90",
    reason: "you like Western sets under $8",
    image: theforkImg,
  },
];


const CRAVING_CUISINES = [
  { label: "Fast food", value: "Fast Food", emoji: "🍔" },
  { label: "Korean", value: "Korean", emoji: "🇰🇷" },
  { label: "Indian", value: "Indian", emoji: "🍛" },
  { label: "Local", value: "Local", emoji: "🍚" },
  { label: "Western", value: "Western", emoji: "🥩" },
];


const VIEWS = {
  HOME: "home",
  BROWSE: "browse",
  SETTINGS: "settings",
  RESTAURANT: "restaurant",
  REVIEWS: "reviews",
  NOTIFICATIONS: "notifications",
};

function App() {
  const [activeView, setActiveView] = useState(VIEWS.HOME);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // cuisine the Browse screen should start with
  const [browseCuisine, setBrowseCuisine] = useState("all");

  // ===== Browse / restaurant navigation =====
  const handleSelectRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setActiveView(VIEWS.RESTAURANT);
  };

  const handleOpenReviews = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setActiveView(VIEWS.REVIEWS);
  };

  const handleBackToBrowse = () => {
    setActiveView(VIEWS.BROWSE);
  };

  const handleBackFromReviews = () => {
    setActiveView(VIEWS.BROWSE);
  };

  // Open Browse with a pre-selected cuisine (from Home)
  const openBrowseWithCuisine = (cuisineValue) => {
    setBrowseCuisine(cuisineValue);
    setActiveView(VIEWS.BROWSE);
  };

  // ===== Settings / notifications navigation =====
  const openSettings = () => setActiveView(VIEWS.SETTINGS);

  const openNotificationSettings = () => {
    setActiveView(VIEWS.NOTIFICATIONS);
  };

  const backFromNotificationSettings = () => {
    setActiveView(VIEWS.SETTINGS);
  };

  return (
    <div className="app">
      {/* Top header */}
      <header className="app-header">
        <button
          className="logo-button"
          onClick={() => setActiveView(VIEWS.HOME)}
        >
          <img src={gomamamImg} alt="GoMamam logo" className="logo-image" />
        </button>
      </header>

      {/* Main content area */}
      <main className="app-main">
        {activeView === VIEWS.HOME && (
          <HomeScreen
            recommendations={RECOMMENDATIONS}
            onSelectCuisine={openBrowseWithCuisine}
          />
        )}

        {activeView === VIEWS.BROWSE && (
          <Browse
            onSelectRestaurant={handleSelectRestaurant}
            onOpenReviews={handleOpenReviews}
            initialCuisine={browseCuisine}
          />
        )}

        {activeView === VIEWS.RESTAURANT && selectedRestaurant && (
          <RestaurantDetail
            restaurant={selectedRestaurant}
            onBack={handleBackToBrowse}
            onOpenReviews={handleOpenReviews}
          />
        )}

        {activeView === VIEWS.REVIEWS && selectedRestaurant && (
          <RestaurantReviews
            restaurant={selectedRestaurant}
            onBack={handleBackFromReviews}
          />
        )}

        {activeView === VIEWS.SETTINGS && (
          <Settings onOpenNotifications={openNotificationSettings} />
        )}

        {activeView === VIEWS.NOTIFICATIONS && (
          <NotificationsSettings onBack={backFromNotificationSettings} />
        )}
      </main>

      {/* Bottom nav – Settings stays active for both Settings + Notifications */}
      <nav className="bottom-nav">
        <button
          className={activeView === VIEWS.HOME ? "nav-btn active" : "nav-btn"}
          onClick={() => setActiveView(VIEWS.HOME)}
        >
          Home
        </button>

        <button
          className={
            activeView === VIEWS.BROWSE ||
            activeView === VIEWS.RESTAURANT ||
            activeView === VIEWS.REVIEWS
              ? "nav-btn active"
              : "nav-btn"
          }
          onClick={() => {
            setBrowseCuisine("all");
            setActiveView(VIEWS.BROWSE);
          }}
        >
          Browse
        </button>

        <button
          className={
            activeView === VIEWS.SETTINGS || activeView === VIEWS.NOTIFICATIONS
              ? "nav-btn active"
              : "nav-btn"
          }
          onClick={openSettings}
        >
          Settings
        </button>
      </nav>
    </div>
  );
}

/* =====================
   HOME SCREEN with AI recommendations
===================== */

function HomeScreen({ recommendations, onSelectCuisine }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = recommendations.length;
  const current = recommendations[activeIndex];

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  return (
    <section>
      <h1>Welcome back 👋</h1>
      <p className="ai-recs-subtitle">
        Instantly order a dish that you might like here.
      </p>

      {/* AI Recommendations concept */}
      <div className="ai-recs">
        <div className="ai-recs-card">
          {/* Big central image with fixed size */}
          <div className="ai-recs-image-area">
            <img
              src={current.image}
              alt={current.dish}
              className="ai-recs-image"
            />
          </div>

          {/* Text info below image */}
          <div className="ai-recs-text">
            <div className="ai-recs-restaurant">{current.restaurant}</div>
            <div className="ai-recs-dish">{current.dish}</div>
            <div className="ai-recs-price">{current.price}</div>

            <p className="ai-recs-reason">Because {current.reason}.</p>
          </div>

          {/* Arrows */}
          <div className="ai-recs-footer">
            <button
              type="button"
              className="ai-recs-arrow"
              onClick={goPrev}
              aria-label="Previous recommendation"
            >
              ←
            </button>
            <span className="ai-recs-counter">
              {activeIndex + 1} / {total}
            </span>
            <button
              type="button"
              className="ai-recs-arrow"
              onClick={goNext}
              aria-label="Next recommendation"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Satisfy your cravings */}
      <div className="cravings-section">
        <h2>Satisfy your cravings</h2>
        <p className="cravings-subtitle">
          Jump straight into the cuisine you&apos;re in the mood for.
        </p>

        <div className="cravings-grid">
          {CRAVING_CUISINES.map((cuisine) => (
            <button
              key={cuisine.value}
              type="button"
              className="craving-card"
              onClick={() => onSelectCuisine && onSelectCuisine(cuisine.value)}
            >
              <span className="craving-emoji">{cuisine.emoji}</span>
              <span className="craving-label">{cuisine.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default App;
