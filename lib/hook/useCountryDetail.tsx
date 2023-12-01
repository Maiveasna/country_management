"use client";

import { useEffect, useState } from "react";



import { getCountryDetail } from "../fetch/fetch-country-detail"
import { CountryTpe } from "../types/CountryTypeApi"

export const useCountryDetail = ({ code }: { code: string }) => {
  const [data, setData] = useState<CountryTpe | undefined>()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    getCountryDetail({ code }).then(async (res) => {
      if (res) {
        setData(await res[0])
        setLoading(false)
      }
    })
  }, [code])

  return {
    data: data as CountryTpe,
    loading,
  }
}