export interface Weather {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  current_weather: CurrentWeather
  hourly_units: HourlyUnits
  hourly: Hourly
  daily_units: DailyUnits
  daily: Daily
}

export interface CurrentWeather {
  temperature: number
  windspeed: number
  winddirection: number
  weathercode: number
  is_day: number
  time: string
}

export interface HourlyUnits {
  time: string
  temperature_2m: string
  relativehumidity_2m: string
  dewpoint_2m: string
  apparent_temperature: string
  pressure_msl: string
  surface_pressure: string
  cloudcover: string
  cloudcover_low: string
  cloudcover_mid: string
  cloudcover_high: string
  windspeed_10m: string
  windspeed_80m: string
  windspeed_120m: string
  windspeed_180m: string
  winddirection_10m: string
  winddirection_80m: string
  winddirection_120m: string
  winddirection_180m: string
  windgusts_10m: string
  shortwave_radiation: string
  direct_radiation: string
  direct_normal_irradiance: string
  diffuse_radiation: string
  vapor_pressure_deficit: string
  cape: string
  evapotranspiration: string
  et0_fao_evapotranspiration: string
  precipitation: string
  snowfall: string
  precipitation_probability: string
  rain: string
  showers: string
  weathercode: string
  snow_depth: string
  freezinglevel_height: string
  visibility: string
  soil_temperature_0cm: string
  soil_temperature_6cm: string
  soil_temperature_18cm: string
  soil_temperature_54cm: string
  soil_moisture_0_1cm: string
  soil_moisture_1_3cm: string
  soil_moisture_3_9cm: string
  soil_moisture_9_27cm: string
  soil_moisture_27_81cm: string
  is_day: string
}

export interface Hourly {
  time: string[]
  temperature_2m: number[]
  relativehumidity_2m: number[]
  dewpoint_2m: number[]
  apparent_temperature: number[]
  pressure_msl: number[]
  surface_pressure: number[]
  cloudcover: number[]
  cloudcover_low: number[]
  cloudcover_mid: number[]
  cloudcover_high: number[]
  windspeed_10m: number[]
  windspeed_80m: number[]
  windspeed_120m: number[]
  windspeed_180m: number[]
  winddirection_10m: number[]
  winddirection_80m: number[]
  winddirection_120m: number[]
  winddirection_180m: number[]
  windgusts_10m: number[]
  shortwave_radiation: number[]
  direct_radiation: number[]
  direct_normal_irradiance: number[]
  diffuse_radiation: number[]
  vapor_pressure_deficit: number[]
  cape: number[]
  evapotranspiration: number[]
  et0_fao_evapotranspiration: number[]
  precipitation: number[]
  snowfall: number[]
  precipitation_probability: number[]
  rain: number[]
  showers: number[]
  weathercode: number[]
  snow_depth: number[]
  freezinglevel_height: number[]
  visibility: number[]
  soil_temperature_0cm: number[]
  soil_temperature_6cm: number[]
  soil_temperature_18cm: number[]
  soil_temperature_54cm: number[]
  soil_moisture_0_1cm: number[]
  soil_moisture_1_3cm: number[]
  soil_moisture_3_9cm: number[]
  soil_moisture_9_27cm: number[]
  soil_moisture_27_81cm: number[]
  is_day: number[]
}

export interface DailyUnits {
  time: string
  temperature_2m_max: string
  temperature_2m_min: string
  apparent_temperature_max: string
  apparent_temperature_min: string
  precipitation_sum: string
  rain_sum: string
  showers_sum: string
  snowfall_sum: string
  precipitation_hours: string
  precipitation_probability_max: string
  precipitation_probability_min: string
  precipitation_probability_mean: string
  weathercode: string
  sunrise: string
  sunset: string
  windspeed_10m_max: string
  windgusts_10m_max: string
  winddirection_10m_dominant: string
  shortwave_radiation_sum: string
  et0_fao_evapotranspiration: string
  uv_index_max: string
  uv_index_clear_sky_max: string
}

export interface Daily {
  time: string[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  apparent_temperature_max: number[]
  apparent_temperature_min: number[]
  precipitation_sum: number[]
  rain_sum: number[]
  showers_sum: number[]
  snowfall_sum: number[]
  precipitation_hours: number[]
  precipitation_probability_max: number[]
  precipitation_probability_min: number[]
  precipitation_probability_mean: number[]
  weathercode: number[]
  sunrise: string[]
  sunset: string[]
  windspeed_10m_max: number[]
  windgusts_10m_max: number[]
  winddirection_10m_dominant: number[]
  shortwave_radiation_sum: number[]
  et0_fao_evapotranspiration: number[]
  uv_index_max: number[]
  uv_index_clear_sky_max: number[]
}
