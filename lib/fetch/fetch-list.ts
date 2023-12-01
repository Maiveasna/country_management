import { CountryApi } from "../apis/countryApi"

export const getCountryList = async () => {
  const data = await (await CountryApi.list({}))?.data
  return data
}
