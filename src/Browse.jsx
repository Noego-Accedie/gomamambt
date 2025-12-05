// src/Browse.jsx
import { useState } from "react";

// local images
import kfcImg from "./assets/kfc.jpg";
import katokImg from "./assets/katok.jpg";
import seoulImg from "./assets/seoul.jpg";
import serikandiImg from "./assets/serikandi.jpg";
import aichaImg from "./assets/aicha.jpg";
import theforkImg from "./assets/thefork.jpg";

// Mock restaurant data (front-end only)
const RESTAURANTS = [
  {
    id: 1,
    name: "KFC",
    cuisine: "Fast Food",
    priceLevel: "$$",
    rating: 4.3,
    deliveryTime: 25,
    distanceKm: 3.2,
    tags: ["fried chicken", "student", "combo"],
    promo: "Free drink with 2-piece set",
    recommendedScore: 90,
    image: kfcImg,
  },
  {
    id: 2,
    name: "Super Nasi Katok",
    cuisine: "Local",
    priceLevel: "$",
    rating: 4.6,
    deliveryTime: 18,
    distanceKm: 1.5,
    tags: ["nasi katok", "spicy", "cheap"],
    promo: "Popular late-night choice",
    recommendedScore: 88,
    image: katokImg,
  },
  {
    id: 3,
    name: "Seoul Garden",
    cuisine: "Korean",
    priceLevel: "$$$",
    rating: 4.7,
    deliveryTime: 30,
    distanceKm: 4.1,
    tags: ["bibimbap", "korean", "healthy"],
    promo: "10% off tonight",
    recommendedScore: 93,
    image: seoulImg,
  },
  {
    id: 4,
    name: "Serikandi",
    cuisine: "Indian",
    priceLevel: "$$",
    rating: 4.4,
    deliveryTime: 35,
    distanceKm: 5.3,
    tags: ["curry", "naan", "spicy"],
    promo: null,
    recommendedScore: 85,
    image: serikandiImg,
  },
  {
    id: 5,
    name: "Ai Cha Serusop",
    cuisine: "Bubble Tea",
    priceLevel: "$",
    rating: 4.2,
    deliveryTime: 20,
    distanceKm: 2.0,
    tags: ["boba", "milk tea", "dessert"],
    promo: "Buy 2 drinks, 5% off",
    recommendedScore: 80,
    image: aichaImg,
  },
  {
    id: 6,
    name: "The Fork",
    cuisine: "Western",
    priceLevel: "$$",
    rating: 4.0,
    deliveryTime: 28,
    distanceKm: 0.9,
    tags: ["burger", "fries", "student"],
    promo: "Student combo from $5",
    recommendedScore: 82,
    image: theforkImg,
  },
];

export default function Browse({
  onSelectRestaurant,
  onOpenReviews,
  initialCuisine = "all",
}) {
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState(initialCuisine);
  const [price, setPrice] = useState("all");
  const [minRating, setMinRating] = useState("0");
  const [sortBy, setSortBy] = useState("recommended");

  const cuisines = [
    "all",
    "Fast Food",
    "Local",
    "Korean",
    "Indian",
    "Bubble Tea",
    "Western",
  ];

  const filteredAndSorted = [...RESTAURANTS]
    .filter((r) => {
      const term = search.trim().toLowerCase();
      if (term) {
        const combinedText = (r.name + " " + r.tags.join(" ")).toLowerCase();
        if (!combinedText.includes(term)) return false;
      }

      if (cuisine !== "all" && r.cuisine !== cuisine) return false;
      if (price !== "all" && r.priceLevel !== price) return false;
      if (parseFloat(minRating) > 0 && r.rating < parseFloat(minRating))
        return false;

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "priceLowHigh": {
          const val = (p) => (p === "$" ? 1 : p === "$$" ? 2 : 3);
          return val(a.priceLevel) - val(b.priceLevel);
        }
        case "ratingHighLow":
          return b.rating - a.rating;
        case "deliveryFast":
          return a.deliveryTime - b.deliveryTime;
        case "recommended":
        default:
          return b.recommendedScore - a.recommendedScore;
      }
    });

  return (
    <section>
      <h1>Browse Restaurants</h1>
      <p className="lead">
        Find the perfect dish for takeout.
      </p>

      {/* Filters */}
      <div className="filters">
        <div className="filters-row">
          <div className="filter-group">
            <label className="filter-label">Search</label>
            <input
              type="text"
              className="filter-input"
              placeholder="Search by name or keyword…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="filters-row">
          <div className="filter-group">
            <label className="filter-label">Cuisine</label>
            <select
              className="filter-select"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
            >
              {cuisines.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "All cuisines" : c}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Price</label>
            <select
              className="filter-select"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            >
              <option value="all">Any</option>
              <option value="$">$</option>
              <option value="$$">$$</option>
              <option value="$$$">$$$</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Min rating</label>
            <select
              className="filter-select"
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
            >
              <option value="0">Any</option>
              <option value="3.5">3.5+</option>
              <option value="4.0">4.0+</option>
              <option value="4.5">4.5+</option>
            </select>
          </div>
        </div>

        <div className="filters-row">
          <span className="filter-label">Sort by</span>
          <div className="pill-row">
            <button
              className={sortBy === "recommended" ? "pill active" : "pill"}
              onClick={() => setSortBy("recommended")}
            >
              Picked for you
            </button>
            <button
              className={sortBy === "priceLowHigh" ? "pill active" : "pill"}
              onClick={() => setSortBy("priceLowHigh")}
            >
              Price (Low → High)
            </button>
            <button
              className={sortBy === "ratingHighLow" ? "pill active" : "pill"}
              onClick={() => setSortBy("ratingHighLow")}
            >
              Rating
            </button>
            <button
              className={sortBy === "deliveryFast" ? "pill active" : "pill"}
              onClick={() => setSortBy("deliveryFast")}
            >
              Fastest delivery
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="browse-summary">
        Showing {filteredAndSorted.length} of {RESTAURANTS.length} restaurants
      </div>

      <div className="restaurant-list">
        {filteredAndSorted.map((r) => (
          <article
            key={r.id}
            className="restaurant-card clickable"
            onClick={() => onSelectRestaurant && onSelectRestaurant(r)}
          >
            <div className="restaurant-main">
              {/* image left */}
              <img src={r.image} alt={r.name} className="restaurant-img" />

              {/* text middle */}
              <div className="restaurant-info">
                <h2 className="restaurant-name">{r.name}</h2>

                <div className="restaurant-meta">
                  <span>{r.cuisine}</span>
                  <span>•</span>
                  <span>{r.priceLevel}</span>
                </div>

                <div className="restaurant-tags">
                  {r.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className="rating-review-link-small"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenReviews && onOpenReviews(r);
                }}
              >
                <span className="rrl-small-score">{r.rating.toFixed(1)} ★</span>
              </div>
            </div>

            <div className="restaurant-footer">
              <span>{r.deliveryTime} min</span>
              <span>•</span>
              <span>{r.distanceKm.toFixed(1)} km away</span>

              {r.promo && <span className="promo-pill">Promo</span>}
            </div>

            {r.promo && <div className="restaurant-promo-text">{r.promo}</div>}
          </article>
        ))}

        {filteredAndSorted.length === 0 && (
          <div className="empty-state">
            No restaurants match your filters. Try clearing some options.
          </div>
        )}
      </div>
    </section>
  );
}
