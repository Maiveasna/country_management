import { CountryApi } from "../apis/countryApi"

export const getCountryList = async ({ search }: { search?: string }) => {
  const data = await CountryApi.list({ search: search })
    .then((res) => res.data)
    .catch((e) => {
      return []
    })

  return data
}
