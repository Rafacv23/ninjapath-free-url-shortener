import React from "react"
import useUrlStore from "@/lib/useUrlStore"
import type { Url } from "@/utils/definitions"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const UrlsTable: React.FC = () => {
  const urls = useUrlStore((state: any) => state.urls)

  if (urls.length === 0) {
    return (
      <div>
        <h2>No URLs created yet.</h2>
      </div>
    )
  }

  return (
    <Table>
      <TableCaption>URLs</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Original URL</TableHead>
          <TableHead>Converted URL</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead>Clicks</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {urls.map((url: Url) => (
          <TableRow key={url.originalUrl}>
            <TableCell>{url.originalUrl}</TableCell>
            <TableCell>{url.convertedUrl}</TableCell>
            <TableCell>{url.date}</TableCell>
            <TableCell>Number of clicks</TableCell>
            <TableCell className="text-right">
              <Button variant="destructive">Remove</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default UrlsTable
