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
        
        // Convert country code to full country name
        const countryNames = {
            'AU': 'Australia',
            'US': 'United States',
            'UK': 'United Kingdom',
            'GB': 'United Kingdom',
            'CA': 'Canada',
            'DE': 'Germany',
            'FR': 'France',
            'IT': 'Italy',
            'ES': 'Spain',
            'JP': 'Japan',
            'CN': 'China',
            'IN': 'India',
            'BR': 'Brazil',
            'MX': 'Mexico',
            'RU': 'Russia',
            'KR': 'South Korea',
            'NL': 'Netherlands',
            'SE': 'Sweden',
            'NO': 'Norway',
            'DK': 'Denmark',
            'FI': 'Finland',
            'CH': 'Switzerland',
            'AT': 'Austria',
            'BE': 'Belgium',
            'PL': 'Poland',
            'CZ': 'Czech Republic',
            'HU': 'Hungary',
            'RO': 'Romania',
            'BG': 'Bulgaria',
            'HR': 'Croatia',
            'SI': 'Slovenia',
            'SK': 'Slovakia',
            'LT': 'Lithuania',
            'LV': 'Latvia',
            'EE': 'Estonia',
            'IE': 'Ireland',
            'PT': 'Portugal',
            'GR': 'Greece',
            'TR': 'Turkey',
            'IL': 'Israel',
            'SA': 'Saudi Arabia',
            'AE': 'United Arab Emirates',
            'EG': 'Egypt',
            'ZA': 'South Africa',
            'NG': 'Nigeria',
            'KE': 'Kenya',
            'MA': 'Morocco',
            'TN': 'Tunisia',
            'DZ': 'Algeria',
            'LY': 'Libya',
            'SD': 'Sudan',
            'ET': 'Ethiopia',
            'GH': 'Ghana',
            'CI': 'Ivory Coast',
            'SN': 'Senegal',
            'ML': 'Mali',
            'BF': 'Burkina Faso',
            'NE': 'Niger',
            'TD': 'Chad',
            'CM': 'Cameroon',
            'CF': 'Central African Republic',
            'CD': 'Democratic Republic of Congo',
            'CG': 'Republic of Congo',
            'GA': 'Gabon',
            'GQ': 'Equatorial Guinea',
            'ST': 'São Tomé and Príncipe',
            'AO': 'Angola',
            'ZM': 'Zambia',
            'ZW': 'Zimbabwe',
            'BW': 'Botswana',
            'NA': 'Namibia',
            'SZ': 'Eswatini',
            'LS': 'Lesotho',
            'MG': 'Madagascar',
            'MU': 'Mauritius',
            'SC': 'Seychelles',
            'KM': 'Comoros',
            'DJ': 'Djibouti',
            'SO': 'Somalia',
            'ER': 'Eritrea',
            'SS': 'South Sudan',
            'UG': 'Uganda',
            'RW': 'Rwanda',
            'BI': 'Burundi',
            'TZ': 'Tanzania',
            'MW': 'Malawi',
            'MZ': 'Mozambique'
        };
        
        const countryName = countryNames[countryCode] || countryCode;
        
        // Format location string - always show city and country name
        const locationText = `${cityName}, ${countryName}`;
        
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

// Get user's current location with GPS
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
                // Fallback to manual input if GPS fails
                getLocationFromInput();
            },
            {
                enableHighAccuracy: true,    // Use GPS + network for best accuracy
                timeout: 30000,              // 30 seconds timeout (longer for better GPS)
                maximumAge: 60000           // 1 minute cache (fresher location)
            }
        );
    } else {
        console.log('Geolocation not supported, using manual input');
        getLocationFromInput();
    }
}

// Manual location input fallback
function getLocationFromInput() {
    const locationInput = prompt('Enter your city name (e.g., "London", "New York", "Tokyo"):');
    if (locationInput) {
        getWeatherByCity(locationInput);
    } else {
        // Fallback to Brisbane if no input
        getWeatherByCoords(-27.4698, 153.0251);
    }
}

// Get weather by city name
async function getWeatherByCity(cityName) {
    try {
        console.log(`Fetching weather for city: ${cityName}`);
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&units=${UNITS}&appid=${API_KEY}`
        );
        const data = await response.json();
        console.log("Weather data:", data);
        
        if (data.cod === 200) {
            // Update the DOM elements
            updateTime();
            document.getElementById('temperature').textContent = 
                `${Math.round(data.main.temp)}°${UNITS === 'metric' ? 'C' : 'F'}`;
            
            // Update weather icon and description
            const weatherIcon = document.querySelector('.fas:not(.fa-temperature-half):not(.fa-map-pin)');
            const weatherMain = data.weather[0].main.toLowerCase();
            
            weatherIcon.className = 'fas';
            
            switch(weatherMain) {
                case 'clear':
                    weatherIcon.classList.add('fa-sun');
                    weatherIcon.style.color = '#FFD700';
                    break;
                case 'clouds':
                    weatherIcon.classList.add('fa-cloud');
                    weatherIcon.style.color = '#A9A9A9';
                    break;
                case 'rain':
                case 'drizzle':
                    weatherIcon.classList.add('fa-cloud-rain');
                    weatherIcon.style.color = '#4682B4';
                    break;
                case 'thunderstorm':
                    weatherIcon.classList.add('fa-bolt');
                    weatherIcon.style.color = '#FFD700';
                    break;
                case 'snow':
                    weatherIcon.classList.add('fa-snowflake');
                    weatherIcon.style.color = '#FFFFFF';
                    break;
                case 'mist':
                case 'fog':
                case 'haze':
                    weatherIcon.classList.add('fa-smog');
                    weatherIcon.style.color = '#B8B8B8';
                    break;
                default:
                    weatherIcon.classList.add('fa-cloud');
                    weatherIcon.style.color = '#FFFFFF';
            }
            
            document.getElementById('weather-description').textContent = 
                data.weather[0].description;
                
            const cityName = data.name
                .replace(/\b[Cc]ity\b/g, '')
                .replace(/\b[Tt]own\b/g, '')
                .trim();
            
            // Convert country code to full country name
            const countryCode = data.sys.country;
            const countryNames = {
                'AU': 'Australia',
                'US': 'United States',
                'UK': 'United Kingdom',
                'GB': 'United Kingdom',
                'CA': 'Canada',
                'DE': 'Germany',
                'FR': 'France',
                'IT': 'Italy',
                'ES': 'Spain',
                'JP': 'Japan',
                'CN': 'China',
                'IN': 'India',
                'BR': 'Brazil',
                'MX': 'Mexico',
                'RU': 'Russia',
                'KR': 'South Korea',
                'NL': 'Netherlands',
                'SE': 'Sweden',
                'NO': 'Norway',
                'DK': 'Denmark',
                'FI': 'Finland',
                'CH': 'Switzerland',
                'AT': 'Austria',
                'BE': 'Belgium',
                'PL': 'Poland',
                'CZ': 'Czech Republic',
                'HU': 'Hungary',
                'RO': 'Romania',
                'BG': 'Bulgaria',
                'HR': 'Croatia',
                'SI': 'Slovenia',
                'SK': 'Slovakia',
                'LT': 'Lithuania',
                'LV': 'Latvia',
                'EE': 'Estonia',
                'IE': 'Ireland',
                'PT': 'Portugal',
                'GR': 'Greece',
                'TR': 'Turkey',
                'IL': 'Israel',
                'SA': 'Saudi Arabia',
                'AE': 'United Arab Emirates',
                'EG': 'Egypt',
                'ZA': 'South Africa',
                'NG': 'Nigeria',
                'KE': 'Kenya',
                'MA': 'Morocco',
                'TN': 'Tunisia',
                'DZ': 'Algeria',
                'LY': 'Libya',
                'SD': 'Sudan',
                'ET': 'Ethiopia',
                'GH': 'Ghana',
                'CI': 'Ivory Coast',
                'SN': 'Senegal',
                'ML': 'Mali',
                'BF': 'Burkina Faso',
                'NE': 'Niger',
                'TD': 'Chad',
                'CM': 'Cameroon',
                'CF': 'Central African Republic',
                'CD': 'Democratic Republic of Congo',
                'CG': 'Republic of Congo',
                'GA': 'Gabon',
                'GQ': 'Equatorial Guinea',
                'ST': 'São Tomé and Príncipe',
                'AO': 'Angola',
                'ZM': 'Zambia',
                'ZW': 'Zimbabwe',
                'BW': 'Botswana',
                'NA': 'Namibia',
                'SZ': 'Eswatini',
                'LS': 'Lesotho',
                'MG': 'Madagascar',
                'MU': 'Mauritius',
                'SC': 'Seychelles',
                'KM': 'Comoros',
                'DJ': 'Djibouti',
                'SO': 'Somalia',
                'ER': 'Eritrea',
                'SS': 'South Sudan',
                'UG': 'Uganda',
                'RW': 'Rwanda',
                'BI': 'Burundi',
                'TZ': 'Tanzania',
                'MW': 'Malawi',
                'MZ': 'Mozambique',
                'ZM': 'Zambia',
                'ZW': 'Zimbabwe',
                'BW': 'Botswana',
                'NA': 'Namibia',
                'SZ': 'Eswatini',
                'LS': 'Lesotho',
                'MG': 'Madagascar',
                'MU': 'Mauritius',
                'SC': 'Seychelles',
                'KM': 'Comoros',
                'DJ': 'Djibouti',
                'SO': 'Somalia',
                'ER': 'Eritrea',
                'SS': 'South Sudan',
                'UG': 'Uganda',
                'RW': 'Rwanda',
                'BI': 'Burundi',
                'TZ': 'Tanzania',
                'MW': 'Malawi',
                'MZ': 'Mozambique'
            };
            
            const countryName = countryNames[countryCode] || countryCode;
            const locationText = `${cityName}, ${countryName}`;
            document.getElementById('location').textContent = locationText;
        } else {
            console.error('City not found:', data.message);
            getWeatherByCoords(-27.4698, 153.0251);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        getWeatherByCoords(-27.4698, 153.0251);
    }
}

// Get weather for current location with improved GPS
getCurrentLocation();

// Update weather every 5 minutes
setInterval(() => getCurrentLocation(), 5 * 60 * 1000); 
