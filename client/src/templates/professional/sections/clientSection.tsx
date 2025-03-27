import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'

export const PFClientSection = () => {
  return (
      <section className="px-4 md:px-[20%]">
        <div className="flex flex-col gap-4">
          <Avatar className="size-[80px]">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="font-semibold text-xl">
            Worked with <span className="text-green-600">50+</span> leading
            companies and associations
          </h1>
          <h3>Clients I&apos;ve worked with</h3>
        </div>

        <div>client images here</div>
      </section>
  )
}

