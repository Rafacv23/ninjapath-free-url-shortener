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

export default function ShareRRSS({ convertedUrl }: { convertedUrl: string }) {
  return (
    <details className="marker:text-transparent">
      <summary className="cursor-pointer bg-violet-500 text-violet-50 shadow hover:bg-violet-800 h-9 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
        <Share2 />
      </summary>
      <ul className="flex flex-col gap-2 mt-4">
        <li>
          <a>
            <EmailShareButton url={convertedUrl}>
              <EmailIcon size={32} round={true} /> Email
            </EmailShareButton>
          </a>
        </li>
        <li>
          <a>
            <FacebookShareButton url={convertedUrl}>
              <FacebookIcon size={32} round={true} /> Facebook
            </FacebookShareButton>
          </a>
        </li>
        <li>
          <a>
            <LinkedinShareButton url={convertedUrl}>
              <LinkedinIcon size={32} round={true} /> Linkedin
            </LinkedinShareButton>
          </a>
        </li>
        <li>
          <a>
            <TwitterShareButton url={convertedUrl}>
              <TwitterIcon size={32} round={true} /> Twitter
            </TwitterShareButton>
          </a>
        </li>
        <li>
          <a>
            <WhatsappShareButton url={convertedUrl}>
              <WhatsappIcon size={32} round={true} /> Whatsapp
            </WhatsappShareButton>
          </a>
        </li>
        <li>
          <a>
            <TelegramShareButton url={convertedUrl}>
              <TelegramIcon size={32} round={true} /> Telegram
            </TelegramShareButton>
          </a>
        </li>
      </ul>
    </details>
  )
}
