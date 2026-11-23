"use client";

import { useEffect, useState } from "react";
import Card from "./Card";

// WMO weather codes → label + emoji (Open-Meteo uses these)
function describe(code) {
  if (code === 0) return ["Clear", "☀️"];
  if (code <= 2) return ["Partly cloudy", "⛅"];
  if (code === 3) return ["Overcast", "☁️"];
  if (code <= 48) return ["Fog", "🌫️"];
  if (code <= 57) return ["Drizzle", "🌦️"];
  if (code <= 67) return ["Rain", "🌧️"];
  if (code <= 77) return ["Snow", "🌨️"];
  if (code <= 82) return ["Showers", "🌧️"];
  if (code <= 86) return ["Snow showers", "🌨️"];
  return ["Thunderstorm", "⛈️"];
}

export default function Weather({ location }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}` +
      `&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,relative_humidity_2m` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`;
    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setData)
      .catch(() => setError(true));
  }, [location.latitude, location.longitude]);

  return (
    <Card title={`Weather · ${location.label}`}>
      {error && <p className="text-sm text-bad">Couldn&apos;t load the weather.</p>}
      {!data && !error && <p className="text-sm text-muted">Loading…</p>}
      {data && (
        <>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{describe(data.current.weather_code)[1]}</span>
            <div>
              <p className="text-4xl font-semibold">{Math.round(data.current.temperature_2m)}°</p>
              <p className="text-sm text-muted">
                {describe(data.current.weather_code)[0]} · feels {Math.round(data.current.apparent_temperature)}°
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted">
            Humidity {data.current.relative_humidity_2m}% · Wind {Math.round(data.current.wind_speed_10m)} km/h
          </p>
          <div className="mt-4 grid grid-cols-5 gap-1 border-t border-line pt-4 text-center text-xs">
            {data.daily.time.map((day, i) => (
              <div key={day}>
                <p className="text-muted">
                  {i === 0 ? "Today" : new Date(day + "T00:00").toLocaleDateString(undefined, { weekday: "short" })}
                </p>
                <p className="my-1 text-lg">{describe(data.daily.weather_code[i])[1]}</p>
                <p>
                  {Math.round(data.daily.temperature_2m_max[i])}°{" "}
                  <span className="text-muted">{Math.round(data.daily.temperature_2m_min[i])}°</span>
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  );
}
