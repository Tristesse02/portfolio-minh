"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      // Root MUST have height context and align center
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    {/* Track MUST have explicit height and be relative so Range can anchor */}
    <SliderPrimitive.Track className="relative h-1 w-full rounded-full bg-white/30">
      <SliderPrimitive.Range className="absolute h-full rounded-full bg-white" />
    </SliderPrimitive.Track>

    {/* Thumb MUST have size to be visible & focusable */}
    <SliderPrimitive.Thumb
      className="block h-3 w-3 rounded-full bg-white shadow outline-none
                 focus-visible:ring focus-visible:ring-white/70"
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export default Slider;
