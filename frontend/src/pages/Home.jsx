import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const categories = [
    { name: "Biryani", emoji: "🍛" },
    { name: "Pizza", emoji: "🍕" },
    { name: "Burger", emoji: "🍔" },
    { name: "Parotta", emoji: "🫓" },
    { name: "Desserts", emoji: "🍰" },
    { name: "Drinks", emoji: "🥤" },
  ];

  return (
    <div className="home-page">

      {/* Navbar */}
      <nav className="home-navbar">
        <Link to="/" className="home-logo">
          🍽️ FoodieHub
        </Link>

        <div className="home-nav-links">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/cart">🛒 Cart</Link>
          <Link to="/login" className="login-link">
            Login
          </Link>
          <Link to="/register" className="register-link">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-tag">
            ✨ Delicious food, delivered fresh
          </span>

          <h1>
            Order your
            <br />
            <span>favourite food</span>
            <br />
            anytime!
          </h1>

          <p>
            From your favourite biryani to delicious burgers,
            discover amazing food and get it delivered to your door.
          </p>

          <Link to="/menu" className="order-btn">
            Explore Menu <span>→</span>
          </Link>

          <div className="hero-features">
            <div>
              <strong>🚀 Fast</strong>
              <small>Quick delivery</small>
            </div>

            <div>
              <strong>🍽️ Fresh</strong>
              <small>Quality food</small>
            </div>

            <div>
              <strong>❤️ Tasty</strong>
              <small>Made with love</small>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <div className="food-circle">
            <img
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=85"
              alt="Delicious food"
            />
          </div>

          <div className="floating-card delivery-card">
            <span>🛵</span>
            <div>
              <strong>Fast Delivery</strong>
              <small>Food at your door</small>
            </div>
          </div>

          <div className="floating-card rating-card">
            ⭐ 4.8 <small>Food lovers</small>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="category-section">
        <div className="section-heading">
          <div>
            <span className="section-label">WHAT'S ON YOUR MIND?</span>
            <h2>Explore Categories</h2>
          </div>

          <Link to="/menu" className="view-menu">
            View all →
          </Link>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <Link
              to="/menu"
              className="category-card"
              key={category.name}
            >
              <div className="category-emoji">
                {category.emoji}
              </div>

              <h3>{category.name}</h3>
              <span>Explore →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom Banner */}
      <section className="bottom-banner">
        <div>
          <span>YOUR NEXT FAVOURITE MEAL IS WAITING</span>
          <h2>Good food. Good mood. ❤️</h2>
          <p>Order something delicious today!</p>
        </div>

        <Link to="/menu" className="banner-btn">
          Order Now →
        </Link>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <h3>🍽️ FoodieHub</h3>
        <p>Good food delivered with love.</p>
        <span>© 2026 FoodieHub. All rights reserved.</span>
      </footer>

    </div>
  );
}

export default Home;