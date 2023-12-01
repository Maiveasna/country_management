import _ from "lodash"

import { CountryTpe } from "../types/CountryTypeApi"
import API from "./API"

type ParamsType = {
  fields?: string[]
  search?: string
}
export const CountryApi = {
  list: async ({
    search,
    fields = ["name", "flags", "cca2", "cca3", "altSpellings", "idd"],
  }: ParamsType) => {
    const qParams = []
    fields?.length > 0 &&
      qParams.push(`fields=${fields?.map((q) => q).join(",")}`)

    let URL = `/v3.1/all?${qParams.join("&")}`
    if (!_.isEmpty(search)) {
      URL = URL.replace("all", `name/${search}`)
    }
    return await API.get(URL)
      .then((response) => response)
      .then((data) => data)
  },
}
