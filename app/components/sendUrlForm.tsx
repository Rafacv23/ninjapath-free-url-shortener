import { Input } from "@nextui-org/input"
import { Button } from "@nextui-org/button"
import { sendUrl } from "@/app/utils/sendUrl"
export default function SendUrlForm() {
  return (
    <form action={sendUrl}>
      <Input
        name="url"
        placeholder="https://url.com"
        label="URL"
        isRequired
        isClearable
        variant="bordered"
        color="primary"
      />
      <Button type="submit" color="primary">
        Enviar
      </Button>
    </form>
  )
}
