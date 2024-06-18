import React from "react"
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share"

export default function ShareRRSS({ convertedUrl }: { convertedUrl: string }) {
  return (
    <details className="dropdown">
      <summary role="button" className="contrast">
        Share
      </summary>
      <ul>
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
      </ul>
    </details>
  )
}
