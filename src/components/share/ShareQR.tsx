import React, { useRef } from "react"
import QRCode from "react-qr-code"
import { downloadQR } from "../../utils/downloadQr"
import { Download, QrCode } from "lucide-react"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../ui/animated-modal"

export default function ShareQR({ convertedUrl }: { convertedUrl: string }) {
  const qrRef = useRef<HTMLDivElement | null>(null)

  return (
    <Modal>
      <ModalTrigger>
        <QrCode />
      </ModalTrigger>
      <ModalBody>
        <ModalContent className="flex flex-col gap-4 items-center">
          <div ref={qrRef}>
            <QRCode
              size={256}
              viewBox={`0 0 256 256`}
              style={{
                height: "auto",
                maxWidth: "256px",
                width: "100%",
                maxHeight: "256px",
              }}
              value={convertedUrl}
            />
          </div>
        </ModalContent>
        <ModalFooter>
          <button
            className="bg-violet-500 text-violet-50 shadow hover:bg-violet-800 h-9 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
            onClick={() => downloadQR({ convertedUrl, qrRef })}
          >
            <Download /> Download
          </button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  )
}
