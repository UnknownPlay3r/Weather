const API_KEY = '69ff4d838456d90ba2e7a46b03a451aa';
const UNITS = 'metric'; // Use 'imperial' for Fahrenheit

async function getWeatherByCoords(lat, lon) {
    try {
        console.log(`Fetching weather for coordinates: ${lat}, ${lon}`); // Debug log
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat.toFixed(6)}&lon=${lon.toFixed(6)}&units=${UNITS}&appid=${API_KEY}`
        );
        const data = await response.json();
        console.log("Weather data:", data); // Debug log
        
        // Update the DOM elements
        updateTime();  // Update time immediately when weather updates
        document.getElementById('temperature').textContent = 
            `${Math.round(data.main.temp)}°${UNITS === 'metric' ? 'C' : 'F'}`;
        
        // Update weather icon and description based on condition
        const weatherIcon = document.querySelector('.fas:not(.fa-temperature-half):not(.fa-map-pin)');
        const weatherMain = data.weather[0].main.toLowerCase();
        
        // Remove all previous weather classes except 'fas'
        weatherIcon.className = 'fas';
        
        // Set icon and color based on weather
        switch(weatherMain) {
            case 'clear':
                weatherIcon.classList.add('fa-sun');
                weatherIcon.style.color = '#FFD700'; // Gold
                break;
            case 'clouds':
                weatherIcon.classList.add('fa-cloud');
                weatherIcon.style.color = '#A9A9A9'; // Gray
                break;
            case 'rain':
            case 'drizzle':
                weatherIcon.classList.add('fa-cloud-rain');
                weatherIcon.style.color = '#4682B4'; // Steel Blue
                break;
            case 'thunderstorm':
                weatherIcon.classList.add('fa-bolt');
                weatherIcon.style.color = '#FFD700'; // Gold
                break;
            case 'snow':
                weatherIcon.classList.add('fa-snowflake');
                weatherIcon.style.color = '#FFFFFF'; // White
                break;
            case 'mist':
            case 'fog':
            case 'haze':
                weatherIcon.classList.add('fa-smog');
                weatherIcon.style.color = '#B8B8B8'; // Light Gray
                break;
            default:
                weatherIcon.classList.add('fa-cloud');
                weatherIcon.style.color = '#FFFFFF'; // White
        }
        
        document.getElementById('weather-description').textContent = 
            data.weather[0].description;
            
        // Update location display with city and country
        const cityName = data.name
            .replace(/\b[Cc]ity\b/g, '')  // Remove 'City' or 'city'
            .replace(/\b[Tt]own\b/g, '')  // Remove 'Town' or 'town'
            .trim();  // Remove any extra spaces
        const countryCode = data.sys.country;
        
        // Format location string - always show city and country code
        const locationText = `${cityName}, ${countryCode}`;
        
        document.getElementById('location').textContent = locationText;

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function updateTime() {
    const now = new Date();
    
    // Format date separately
    const dateString = now.toLocaleDateString('en-US', { 
        month: 'short',    // Jan
        day: 'numeric',    // 8
    });
    
    // Format time with AM/PM
    const timeString = now.toLocaleString('en-US', { 
        hour: 'numeric',
        minute: '2-digit',
        hour12: true 
    });
    
    const timeElement = document.getElementById('local-time');
    timeElement.textContent = `${dateString} ${timeString}`;
}

// Update time every second
setInterval(updateTime, 1000);

// Initial update
updateTime();

// Get user's current location
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                console.log(`Current location: ${lat}, ${lon}`);
                getWeatherByCoords(lat, lon);
            },
            (error) => {
                console.error('Error getting location:', error);
                // Fallback to Brisbane if location fails
                getWeatherByCoords(-27.4698, 153.0251);
            }
        );
    } else {
        console.log('Geolocation not supported, using Brisbane');
        getWeatherByCoords(-27.4698, 153.0251);
    }
}

// Get weather for current location
getCurrentLocation();

// Update weather every 5 minutes
setInterval(() => getCurrentLocation(), 5 * 60 * 1000); 