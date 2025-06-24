import Image from 'next/image';
import { WeatherProps } from "./types";
import { useState } from "react";
import moment from "moment-timezone";

export const Weather = ({ weatherData, onUnitChange, location }: WeatherProps) => {
  const [isImperial, setIsImperial] = useState(true);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <div className="text-center">
        <h1 className="text-base lg:text-xl font-medium">
          { location ? `Weather - ${location}` : 'My Weather' }
        </h1>
      </div>
      <div className="flex justify-between w-full p-[15px]">
        <div className="flex items-center">
          <div className="flex flex-col justify-center gap-1">
            {weatherData.date && (
              <p>
                {/* Day Name and number */}
                {moment(weatherData.date).format("dddd D")}
              </p>
            )}
            <div className="flex gap-1">
              {/* <Image
                src={`${process.env.WEATHER_ICON_URL}/${weatherData.weather[0].icon}.png`}
                width={60}
                height={60}
                alt="Weather Icon"
              /> */}
              <h3 className="text-4xl">{weatherData.temperature?.afternoon}</h3>
              <button
                className={`text-sm pb-8 ${
                  isImperial ? "text-[#454545]" : "text-gray-300"
                }`}
                onClick={() => {
                  setIsImperial(true);
                  onUnitChange("imperial");
                }}
              >
                ºF
              </button>
              <p className="pb-8 text-gray-300">|</p>
              <button
                className={`text-sm pb-8 ${
                  isImperial ? "text-gray-300" : "text-[#454545]"
                }`}
                onClick={() => {
                  setIsImperial(false);
                  onUnitChange("metric");
                }}
              >
                ºC
              </button>
            </div>
          </div>
        </div>
        <div className="text-sm font-normal pt-6">
          {weatherData.precipitation && (
            <p>Precipitation: {weatherData.precipitation.total}mm</p>
          )}
          {weatherData.humidity && (
            <p>Humidity: {weatherData.humidity?.afternoon}% </p>
          )}
          {weatherData.wind && (
            <p className="mt-1">
              Wind:{" "}
              {isImperial
                ? `${weatherData.wind?.max?.speed}mph`
                : `${weatherData.wind?.max?.speed}ms`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
