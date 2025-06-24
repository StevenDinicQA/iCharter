export type WeatherProps = {
    weatherData?: any | undefined;
    location?: string;
    onUnitChange: (value: string) => void;
}