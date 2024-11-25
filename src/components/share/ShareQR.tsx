import React, { useRef } from "react"
import QRCode from "react-qr-code"
import { downloadQR } from "../../utils/downloadQr"
import { Download, QrCode } from "lucide-react"

export default function ShareQR({ convertedUrl }: { convertedUrl: string }) {
  const qrRef = useRef<HTMLDivElement | null>(null)

  return (
    <details>
      <summary role="button">
        <QrCode />
      </summary>
      <ul>
        <div ref={qrRef} className="qr">
          <QRCode
            size={256}
            viewBox={`0 0 256 256`}
            style={{ height: "auto", maxWidth: "256px", width: "100%" }}
            value={convertedUrl}
          />
          <button onClick={() => downloadQR({ convertedUrl, qrRef })}>
            <Download />
          </button>
        </div>
      </ul>
    </details>
  )
}
