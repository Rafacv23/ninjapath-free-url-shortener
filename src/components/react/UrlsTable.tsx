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
import { format } from "date-fns"
import { Trash2 } from "lucide-react"

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
          <TableHead className="w-[100px]">Original URL</TableHead>
          <TableHead>Converted URL</TableHead>
          <TableHead className="w-[100px]">Created</TableHead>
          <TableHead className="w-[100px]">Clicks</TableHead>
          <TableHead className="text-right">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {urls.map((url: Url) => (
          <TableRow key={url.originalUrl}>
            <TableCell>{url.originalUrl}</TableCell>
            <TableCell>{url.convertedUrl}</TableCell>
            <TableCell>
              {format(new Date(url.date), "MM/dd/yyyy 'at' HH:mm")}
            </TableCell>
            <TableCell>10</TableCell>
            <TableCell className="text-right">
              <Button variant="destructive">
                <Trash2 className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default UrlsTable
