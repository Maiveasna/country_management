import { CountryTpe } from "../types/CountryTypeApi"
import API from "./API"

type ParamsType = {
  fields?: string[]
  codes?: string[]
}
export const CountryApi = {
  list: async ({
    fields = ["name", "flags" ,"cca2", "cca3" , "altSpellings" , "idd"],
    //codes = ["cca2", "cca3"],
  }: ParamsType) => {
    const qParams = []
    fields?.length > 0 &&
      qParams.push(`fields=${fields?.map((q) => q).join(",")}`)
    //codes?.length > 0 && qParams.push(`codes=${codes?.map((q) => q).join(",")}`)
    return await API.get<{data: CountryTpe[]}>(
      `https://restcountries.com/v3.1/all?${qParams.join("&")}`
    )
      .then((response) => response)
      .then((data) => data)
  },
}
