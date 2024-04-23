import React, { useEffect } from "react"

export default function Redirect({ url }) {
  if (url) {
    useEffect(() => {
      window.location.href = url
    }, [url])
  } else {
    return <h1>No hay url</h1>
  }
}
