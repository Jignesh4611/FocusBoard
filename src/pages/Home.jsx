import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#f5f7fa", minHeight: "100vh" }}>
      
      {/* Hero Section */}
      <header
        style={{
          textAlign: "center",
          padding: "4rem 1rem",
          background: "linear-gradient(135deg, #6EE7B7, #3B82F6)",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>
          🌟 Welcome to Your Productivity Hub
        </h1>
        <p style={{ fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto" }}>
          Stay organized, track your progress, and achieve your goals — all in one place.
        </p>
      </header>

      {/* Feature Highlights */}
      <section style={{ maxWidth: "1000px", margin: "3rem auto", padding: "0 1rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
          
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <h2>📅 Plan Your Day</h2>
            <p style={{ color: "#666" }}>
              Organize your daily tasks effortlessly and boost your productivity.
            </p>
          </div>

          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <h2>🔥 Keep Your Streak</h2>
            <p style={{ color: "#666" }}>
              Motivate yourself by maintaining a consistent streak of progress.
            </p>
          </div>

          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <h2>📊 Track Your Growth</h2>
            <p style={{ color: "#666" }}>
              Visualize your improvement over time with insightful statistics.
            </p>
          </div>

        </div>
      </section>

      {/* Call to Action */}
      <section style={{ textAlign: "center", margin: "3rem 0" }}>
        <Link
          to="/tasks"
          style={{
            background: "#3B82F6",
            color: "white",
            padding: "0.8rem 2rem",
            border: "none",
            borderRadius: "8px",
            fontSize: "1.1rem",
            cursor: "pointer",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          🚀 Get Started
        </Link>
      </section>
    </div>
  );
};

export default Home;
