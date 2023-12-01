import { CountryApi } from "../apis/countryApi"

export const getCountryDetail = async ({ code }: { code: string }) => {
  const data = await CountryApi.countryDetail({ code: code })
    .then((res) => res)
    .catch((e) => {
      return []
    })

  return data
}
