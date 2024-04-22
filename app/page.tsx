import SendUrlForm from "@/app/components/sendUrlForm"
import { getData } from "@/app/utils/getData"

export default async function Home() {
  await getData()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <SendUrlForm />
      </div>
    </main>
  )
}
