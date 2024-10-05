/**
 * App component for the Weather Dashboard.
 * This component manages the state for current weather, forecast, dark mode, loading, and error messages.
 * It handles fetching weather data based on user search input and toggling dark mode.
 */

import { useState } from "react";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import "./App.css";

function App() {
  // State management for weather and forecast data, dark mode, loading, and error messages
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [darkMode, setDarkMode] = useState(false);  // Manages dark mode state
  const [loading, setLoading] = useState(false);    // Indicates loading state
  const [error, setError] = useState(null);         // Manages error messages

  /**
   * Handles the search change event by fetching weather and forecast data based on the selected city's latitude and longitude.
   * @param {object} searchData - Selected city data containing latitude and longitude coordinates.
   */
  const handleOnSearchChange = async (searchData) => {
    const [lat, lon] = searchData.value.split(" "); // Split the lat/lon value from searchData
    setLoading(true);  // Set loading state to true while data is being fetched
    setError(null);    // Reset error state

    try {
      // Fetch current weather and forecast data using the OpenWeather API
      const currentWeatherFetch = await fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const forecastFetch = await fetch(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );

      // Check if API requests were successful, if not, throw an error
      if (!currentWeatherFetch.ok || !forecastFetch.ok) {
        throw new Error("Failed to fetch weather data");
      }

      // Parse API responses
      const weatherResponse = await currentWeatherFetch.json();
      const forecastResponse = await forecastFetch.json();

      // Update state with fetched weather and forecast data
      setCurrentWeather({ city: searchData.label, ...weatherResponse });
      setForecast({ city: searchData.label, ...forecastResponse });
    } catch (error) {
      // Handle any errors that occur during the fetch
      console.error("Error fetching weather data:", error);
      setError("Error fetching weather data. Please try again.");
    } finally {
      setLoading(false);  // Set loading state back to false after data is fetched
    }
  };

  return (
    <div className={`container ${darkMode ? "dark" : ""}`}>
      {/* Dark mode toggle button */}
      <button className="toggle-button" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>

      {/* Dashboard Title */}
      <h1 className="dashboard-title">Weather Dashboard</h1>

      {/* Search component */}
      <Search onSearchChange={handleOnSearchChange} />

      {/* Display loading spinner or error message if applicable */}
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

      {/* Render current weather and forecast if data is available */}
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
