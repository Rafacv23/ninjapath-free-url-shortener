import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/utils"

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT"

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  primaryColor = "#FF5700", // Default primary color
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType
    containerClassName?: string
    className?: string
    duration?: number
    clockwise?: boolean
    primaryColor?: string
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState<boolean>(false)
  const [direction, setDirection] = useState<Direction>("TOP")

  const rotateDirection = (currentDirection: Direction): Direction => {
    const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"]
    const currentIndex = directions.indexOf(currentDirection)
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length
    return directions[nextIndex]
  }

  const movingMap: Record<Direction, string> = {
    TOP: `radial-gradient(20.7% 50% at 50% 0%, ${primaryColor} 0%, rgba(255, 255, 255, 0) 100%)`,
    LEFT: `radial-gradient(16.6% 43.1% at 0% 50%, ${primaryColor} 0%, rgba(255, 255, 255, 0) 100%)`,
    BOTTOM: `radial-gradient(20.7% 50% at 50% 100%, ${primaryColor} 0%, rgba(255, 255, 255, 0) 100%)`,
    RIGHT: `radial-gradient(16.2% 41.2% at 100% 50%, ${primaryColor} 0%, rgba(255, 255, 255, 0) 100%)`,
  }

  const highlight = `radial-gradient(75% 181.2% at 50% 50%, ${primaryColor} 0%, rgba(255, 255, 255, 0) 100%)`

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState))
      }, duration * 1000)
      return () => clearInterval(interval)
    }
  }, [hovered, duration, clockwise])

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex items-center justify-center p-[2px] rounded-md overflow-hidden w-full",
        containerClassName
      )}
      {...props}
    >
      {/* Contenedor del contenido */}
      <div
        className={cn(
          "relative z-10 w-full text-center bg-black text-white px-4 py-2 rounded-md",
          className
        )}
      >
        {children}
      </div>

      {/* Animación de gradiente */}
      <motion.div
        className="absolute inset-0 z-0 rounded-md"
        style={{
          filter: "blur(2px)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration }}
      />
      {/* Fondo interno */}
      <div className="absolute inset-[2px] z-1 bg-black rounded-md" />
    </Tag>
  )
}
