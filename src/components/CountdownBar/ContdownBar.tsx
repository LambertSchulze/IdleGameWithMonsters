import { type FC, useState, useRef, useEffect } from 'react'

interface Props {
  durationInMS: number
  onComplete: () => void
  className?: string
}

export const CountdownBar: FC<Props> = ({ durationInMS, onComplete, className }) => {
  const [value, setValue] = useState(100)
  const startRef = useRef<number | null>(null)
  const nextRef = useRef<number | null>(null)

  useEffect(() => {
    setValue(100)
    startRef.current = null

    const updateFrame = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp
      const elapsed = timestamp - startRef.current
      const progress = Math.min(elapsed / durationInMS, 1)
      const newValue = Math.round(100 * (1 - progress))
      setValue(newValue)

      if (progress < 1) {
        nextRef.current = requestAnimationFrame(updateFrame)
      } else {
        onComplete()
      }
    }

    nextRef.current = requestAnimationFrame(updateFrame)

    return () => cancelAnimationFrame(nextRef.current!)
  }, [durationInMS, onComplete])

  return <progress max="100" value={value} className={className} />
}
