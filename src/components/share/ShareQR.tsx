import React, { useRef } from "react"
import QRCode from "react-qr-code"
import { downloadQR } from "@/utils/downloadQr"
import { Download, QrCode } from "lucide-react"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal"
import { Button } from "@/components/ui/button"

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
          <Button onClick={() => downloadQR({ convertedUrl, qrRef })}>
            <Download /> Download
          </Button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  )
}
