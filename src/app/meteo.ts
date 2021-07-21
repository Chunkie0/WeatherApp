export interface MeteoGeometry {
    type: string;
    coordinates: [number, number, number];
}

export interface MeteoMetaUnits {
    air_pressure_at_sea_level: string;
    air_temperature: string;
    cloud_area_fraction: string;
    precipitation_amount: string;
    relative_humidity: string;
    wind_from_direction: string;
    wind_speed: string;
}

export interface MeteoMeta {
    updated_at: string;
    units: MeteoMetaUnits;
}

export interface MeteoInstantData {
    details: MeteoInstantDataDetails;
}

export interface MeteoInstantDataDetails {
    air_pressure_at_sea_level: number;
    air_temperature: number;
    cloud_area_fraction: number;
    relative_humidity: number;
    wind_from_direction: number;
    wind_speed: number;
}

export interface MeteoTimeSeriesSummary {
    symbol_code: string;
}

export interface MeteoTimeSeriesDetails {
    symbol_code: string;
}

export interface MeteoTimeSeries {
    time: string;
    data: {
        instant: MeteoInstantData;
        next_12_hours: {
            summary: MeteoTimeSeriesSummary
        };
        next_1_hours: {
            summary: MeteoTimeSeriesSummary;
            details: MeteoTimeSeriesDetails
        };
        next_6_hours: {
            summary: MeteoTimeSeriesSummary;
            details: MeteoTimeSeriesDetails
        }
    };
}

export interface MeteoProperties {
    meta: MeteoMeta;
    timeseries: MeteoTimeSeries[];
}

export interface Meteo {
    type: string;
    geometry: MeteoGeometry;
    properties: MeteoProperties;
}

export interface currentLocationWeather {
    currentLocation: string;
    longitude: number;
    temperature: number;
    latitude: number;
    wind: number;
    windDirection: number;
    windLocation: string;
}