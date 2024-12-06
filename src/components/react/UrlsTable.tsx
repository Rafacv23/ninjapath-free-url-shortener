import React from "react"
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
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { t } from "i18next"

interface UrlsTableProps {
  data: Url[] // Expecting an array of Url objects as props
}

const UrlsTable: React.FC<UrlsTableProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>{t("archive.table-title")}</CardTitle>
          <CardDescription>{t("archive.no-urls")}</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Table className="mb-4">
      <TableCaption>{t("archive.table-title")}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">
            {t("archive.original-url")}
          </TableHead>
          <TableHead>{t("archive.converted-url")}</TableHead>
          <TableHead className="w-[100px]">{t("archive.created")}</TableHead>
          <TableHead className="w-[100px]">{t("archive.clicks")}</TableHead>
          <TableHead className="text-right">{t("archive.delete")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((url: Url) => (
          <TableRow key={url.id}>
            <TableCell>{url.large_url}</TableCell>
            <TableCell>{url.short_url}</TableCell>
            <TableCell>
              {format(new Date(url.created_at), "MM/dd/yyyy 'at' HH:mm")}
            </TableCell>
            <TableCell>{url.clicks || "0"}</TableCell>
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
