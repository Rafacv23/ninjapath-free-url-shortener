import React, { useEffect } from "react"

export default function Redirect({ url }: { url: string }) {
  if (url) {
    useEffect(() => {
      window.location.href = url
    }, [url])
  } else {
    return (
      <article>
        <h1>URL not found</h1>
        <a href="/" title="Go home">
          Try with another one
        </a>
      </article>
    )
  }
}
