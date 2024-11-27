import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal"
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share"
import { Download, Share2 } from "lucide-react"
import { downloadQR } from "@/utils/downloadQr"
import { Button, buttonVariants } from "@/components/ui/button"
import { useRef } from "react"
import QRCode from "react-qr-code"

interface ShareOptionsProps {
  convertedUrl: string
}

export default function ShareOptions({ convertedUrl }: ShareOptionsProps) {
  const socials = [
    {
      icon: EmailIcon,
      text: "Email",
      element: (
        <EmailShareButton
          url={convertedUrl}
          className="flex items-center gap-2"
        >
          <EmailIcon size={32} round={true} /> Email
        </EmailShareButton>
      ),
    },
    {
      icon: FacebookIcon,
      text: "Facebook",
      element: (
        <FacebookShareButton
          url={convertedUrl}
          className="flex items-center gap-2"
        >
          <FacebookIcon size={32} round={true} /> Facebook
        </FacebookShareButton>
      ),
    },
    {
      icon: LinkedinIcon,
      text: "Linkedin",
      element: (
        <LinkedinShareButton
          url={convertedUrl}
          className="flex items-center gap-2"
        >
          <LinkedinIcon size={32} round={true} /> Linkedin
        </LinkedinShareButton>
      ),
    },
    {
      icon: TwitterIcon,
      text: "Twitter",
      element: (
        <TwitterShareButton
          url={convertedUrl}
          className="flex items-center gap-2"
        >
          <TwitterIcon size={32} round={true} /> Twitter
        </TwitterShareButton>
      ),
    },
    {
      icon: WhatsappIcon,
      text: "Whatsapp",
      element: (
        <WhatsappShareButton
          url={convertedUrl}
          className="flex items-center gap-2"
        >
          <WhatsappIcon size={32} round={true} /> Whatsapp
        </WhatsappShareButton>
      ),
    },
    {
      icon: TelegramIcon,
      text: "Telegram",
      element: (
        <TelegramShareButton
          url={convertedUrl}
          className="flex items-center gap-2"
        >
          <TelegramIcon size={32} round={true} /> Telegram
        </TelegramShareButton>
      ),
    },
  ]

  const qrRef = useRef<HTMLDivElement | null>(null)

  return (
    <Modal>
      <ModalTrigger>
        <Share2 />
      </ModalTrigger>
      <ModalBody>
        <ModalContent className="flex flex-col gap-4 items-center">
          <ul className="grid grid-cols-3 gap-2 my-8">
            {socials.map((rrss) => (
              <li key={rrss.text}>
                <a
                  className={buttonVariants({
                    variant: "outline",
                    className: "w-full",
                  })}
                >
                  {rrss.element}
                </a>
              </li>
            ))}
          </ul>
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
