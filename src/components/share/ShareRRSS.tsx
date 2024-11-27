import { Share2 } from "lucide-react"
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
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/ui/animated-modal"
import { buttonVariants } from "../ui/button"

export default function ShareRRSS({ convertedUrl }: { convertedUrl: string }) {
  const socials = [
    {
      icon: EmailIcon,
      text: "Email",
      element: (
        <EmailShareButton
          url={convertedUrl}
          className={buttonVariants({ variant: "default" })}
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
          className={buttonVariants({ variant: "default" })}
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
          className={buttonVariants({ variant: "default" })}
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
          className={buttonVariants({ variant: "default" })}
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
          className={buttonVariants({ variant: "default" })}
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
          className={buttonVariants({ variant: "default" })}
        >
          <TelegramIcon size={32} round={true} /> Telegram
        </TelegramShareButton>
      ),
    },
  ]

  return (
    <Modal>
      <ModalTrigger>
        <Share2 />
      </ModalTrigger>
      <ModalBody>
        <ModalContent>
          <ul className="grid grid-cols-3 gap-2 mt-4">
            {socials.map((rrss) => (
              <li key={rrss.text}>
                <a>{rrss.element}</a>
              </li>
            ))}
          </ul>
        </ModalContent>
      </ModalBody>
    </Modal>
  )
}
