import * as React from 'react'
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react'
import { cn } from '../../lib/cn'

type CarouselProps = React.HTMLAttributes<HTMLDivElement> & {
  opts?: Parameters<typeof useEmblaCarousel>[0]
}

const CarouselContext = React.createContext<UseEmblaCarouselType | null>(null)

export function Carousel({ className, opts, children, ...props }: CarouselProps) {
  const embla = useEmblaCarousel(opts)
  return (
    <CarouselContext.Provider value={embla}>
      <div className={cn('relative', className)} {...props}>
        <div className="overflow-hidden" ref={embla[0]}>
          <div className="-ml-4 flex touch-pan-y" ref={embla[1] as any}>
            {children}
          </div>
        </div>
      </div>
    </CarouselContext.Provider>
  )
}

export function CarouselContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('ml-4 flex', className)} {...props} />
}

export function CarouselItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('min-w-0 shrink-0 grow-0 basis-full pr-4', className)} {...props} />
}

function useCarouselApi() {
  const ctx = React.useContext(CarouselContext)
  if (!ctx) throw new Error('Carousel components must be used within <Carousel>')
  return ctx[1]
}

export function CarouselPrevious({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const api = useCarouselApi()
  return (
    <button
      type="button"
      onClick={() => api?.scrollPrev()}
      className={cn('absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-md border bg-background/80 px-2 py-1 text-sm shadow', className)}
      {...props}
    />
  )
}

export function CarouselNext({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const api = useCarouselApi()
  return (
    <button
      type="button"
      onClick={() => api?.scrollNext()}
      className={cn('absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-md border bg-background/80 px-2 py-1 text-sm shadow', className)}
      {...props}
    />
  )
}

