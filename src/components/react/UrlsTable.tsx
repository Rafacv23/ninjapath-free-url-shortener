// components/UrlsTable.tsx

import React from "react"
import useUrlStore from "@/lib/useUrlStore"
import type { Url } from "@/utils/definitions"

const UrlsTable: React.FC = () => {
  const urls = useUrlStore((state: any) => state.urls)

  const handleDelete = (originalUrl: string) => {
    useUrlStore.getState().removeUrl(originalUrl)
  }

  if (urls.length === 0) {
    return (
      <div>
        <h2>No URLs created yet.</h2>
      </div>
    )
  }

  return (
    <table className="striped">
      <thead data-theme="light">
        <tr>
          <th scope="col">Original URL</th>
          <th scope="col">Converted URL</th>
          <th scope="col">Date</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {urls.map((url: Url) => (
          <tr key={url.originalUrl}>
            <td>
              <a
                href={url.originalUrl}
                title={url.originalUrl}
                className="secondary"
              >
                {url.originalUrl}
              </a>
            </td>
            <td>
              <a
                href={url.convertedUrl}
                title={url.convertedUrl}
                className="secondary"
              >
                {url.convertedUrl}
              </a>
            </td>
            <td>{url.date}</td>
            <td>
              <button
                className="outline contrast"
                onClick={() => handleDelete(url.originalUrl)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default UrlsTable
