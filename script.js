async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return alert("Enter city name");

  const apiKey = "enter your api key";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      document.getElementById("weatherResult").innerHTML = "City not found ";
      return;
    }

    
    const temp = Math.round(data.main.temp);
    const feels = Math.round(data.main.feels_like);

    document.getElementById("weatherResult").innerHTML = `
      <h2>${data.name}</h2>
      <p>${data.weather[0].description}</p>
      <h3>${temp}°C</h3>
    `;

    document.getElementById("feels").textContent = feels;
    document.getElementById("humidity").textContent = data.main.humidity;
    document.getElementById("wind").textContent = data.wind.speed;
    document.getElementById("pressure").textContent = data.main.pressure;
    document.getElementById("visibility").textContent =
      (data.visibility / 1000).toFixed(1);

    document.getElementById("sunrise").textContent =
      formatTime(data.sys.sunrise, data.timezone);
    document.getElementById("sunset").textContent =
      formatTime(data.sys.sunset, data.timezone);

    changeBackgroundByTemp(temp);

  } catch (err) {
    console.error(err);
  }
}

function formatTime(unix, timezone) {
  return new Date((unix + timezone) * 1000)
    .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function changeBackgroundByTemp(temp) {
  let bg;

  if (temp <= -5) bg = "bg/freezing.jpg";
  else if (temp <= 10) bg = "bg/cold.jpg";
  else if (temp <= 20) bg = "bg/mild.jpg";
  else if (temp <= 30) bg = "bg/warm.jpg";
  else bg = "bg/hot.jpg";

  document.body.style.backgroundImage = `url('${bg}')`;
}
