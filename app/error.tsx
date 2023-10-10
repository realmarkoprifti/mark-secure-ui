'use client' // Error components must be Client Components 


import { BiSolidError } from "react-icons/bi"
import { Button } from "@nextui-org/react"
import Link from "next/link"

export default function Error({error}: {error: Error}) {

  return (
    <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center gap-3">
      <span className="text-[200px] text-red-500">
        <BiSolidError />
      </span>
      <span className="text-xl text-slate-300">
        {error.message}
      </span>
      <Button as={Link} href="/" color="success">
        Go back
      </Button>
    </div>
  )
}