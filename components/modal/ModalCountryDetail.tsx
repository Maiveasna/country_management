"use client"

import Link from "next/link"

import { CountryApi } from "@/lib/apis/countryApi"
import { useCountryDetail } from "@/lib/hook/useCountryDetail"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

type Props = {
  open?: boolean
  onClose?: () => void
  data?: any
}
const ModalCountryDetail = ({ open, data: detail, onClose }: Props) => {
  const { data, loading } = useCountryDetail({ code: detail?.cca2 })

  return (
    <Dialog onOpenChange={onClose} open={open}>
      {loading ? (
        <DialogContent className="sm:max-w-[600px]">
          <div className=" w-full h-80  flex flex-col justify-center items-center  text-gray-500 animate-pulse">
            Loging...
          </div>
        </DialogContent>
      ) : (
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{data?.name?.common}</DialogTitle>
            <DialogDescription>
              {data?.altSpellings?.join(" ")}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col w-full space-y-4 overflow-y-scroll">
            <div className=" w-full flex overflow-hidden rounded-md h-64">
              <img
                className=" object-cover w-full h-full"
                alt={data?.flags?.alt}
                src={data?.flags?.png}
              />
            </div>
            <div className=" grid grid-cols-2 gap-4 border rounded-lg p-4">
              <Label className="mt-2">
                Continents: {data?.continents?.join(", ")}
              </Label>
              <Label className="mt-2">Region: {data?.region} </Label>
              <Label className="mt-2">Area: {data?.area}</Label>
              <Label className="mt-2">
                Street Map:{" "}
                <Link
                  className="text-blue-500"
                  target="_blank"
                  href={data?.maps?.openStreetMaps || ""}
                >
                  View
                </Link>
              </Label>
              <Label className="mt-2">
                Lat-Lng: {data?.latlng?.join(", ")}
                {data?.latlng?.length > 0 && (
                  <Link
                    className="text-blue-500 ml-2"
                    target="_blank"
                    href={CountryApi?.navigateUsingGoogleMap({
                      lat: String(data?.latlng[0]),
                      lng: String(data?.latlng[1]),
                    })}
                  >
                    View
                  </Link>
                )}
              </Label>
              <Label className="mt-2">Sub-Region: {data?.subregion}</Label>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  )
}

export default ModalCountryDetail
