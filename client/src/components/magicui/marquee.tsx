import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, useState } from "react";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Optional CSS class name to apply custom styles
   */
  className?: string;
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean;
  /**
   * Whether to pause the animation on hover
   * @default false
   */
  pauseOnHover?: boolean;
  /**
   * Whether to pause the animation on click
   * @default false
   */
  onClickPause?: boolean;
  /**
   * Content to be displayed in the marquee
   */
  children: React.ReactNode;
  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean;
  /**
   * Number of times to repeat the content
   * @default 4
   */
  repeat?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  onClickPause = true,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  const [isPaused, setIsPaused] = useState(false);

  const handleClick = () => {
    if (onClickPause) {
      setIsPaused(!isPaused);
    }
  };

  return (
    <div
      {...props}
      onClick={handleClick}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
          "cursor-pointer": onClickPause,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
              "[animation-play-state:paused]": isPaused,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
