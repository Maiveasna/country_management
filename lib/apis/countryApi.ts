import _ from "lodash";



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
  countryDetail: async ({ code }: { code: string }) => {
    if (!code) return
    let URL = `/v3.1/alpha?codes=${code}` // codes
    return await API.get(URL).then((response) => response.data)
  },
  navigateUsingGoogleMap: (
    to: string | { lat?: string; lng?: string },
    waypoints: { longitude: any; latitude: any }[] = []
  ) => {
    let url = "https://www.google.com/maps/dir/?api=1&dir_action=navigate" //&travelmode=driving
    const destination = _.isString(to)
      ? to
      : _.isObject(to)
      ? `${to.lat},${to.lng}`
      : ""
    url += `&destination=${destination}`

    if (waypoints && waypoints.length > 0) {
      const waypointParams = waypoints
        .map(({ latitude, longitude }) => {
          return `${latitude},${longitude}`
        })
        .join("|")

      url += `&waypoints=${waypointParams}`
    }
    return url
  },
}