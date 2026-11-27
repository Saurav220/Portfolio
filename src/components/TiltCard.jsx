import { forwardRef, useEffect, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

const TiltCard = forwardRef(function TiltCard(
  {
    children,
    className = "",
    as = "div",
    maxTilt = 8,
    floatDistance = 8,
    glare = true,
    style,
    initial,
    animate,
    transition,
    ...rest
  },
  ref
) {
  const prefersReducedMotion = useReducedMotion();
  const [canTilt, setCanTilt] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const isHovering = useMotionValue(0);

  const springConfig = { stiffness: 210, damping: 18, mass: 0.7 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const smoothHover = useSpring(isHovering, { stiffness: 220, damping: 20, mass: 0.7 });

  const rotateX = useTransform(smoothY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [0, 1], [-maxTilt, maxTilt]);
  const hoverY = useTransform(smoothHover, [0, 1], [0, -floatDistance]);
  const hoverScale = useTransform(smoothHover, [0, 1], [1, 1.012]);
  const glareX = useTransform(smoothX, [0, 1], [0, 100]);
  const glareY = useTransform(smoothY, [0, 1], [0, 100]);
  const glareBackground = useMotionTemplate`radial-gradient(300px circle at ${glareX}% ${glareY}%, var(--tilt-glare-color), transparent 72%)`;

  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion) {
      setCanTilt(false);
      return;
    }
    const media = window.matchMedia("(pointer: fine)");
    const update = () => setCanTilt(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, [prefersReducedMotion]);

  const handlePointerMove = (e) => {
    if (!canTilt) return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const px = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const py = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
    mouseX.set(px);
    mouseY.set(py);
    isHovering.set(1);
  };

  const handlePointerLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    isHovering.set(0);
  };

  const MotionTag = as === "article" ? motion.article : motion.div;

  return (
    <motion.div
      ref={ref}
      className="[perspective:1000px]"
      initial={initial}
      animate={animate}
      transition={transition}
    >
      <MotionTag
        className={`relative ${className}`}
        style={{
          transformStyle: "preserve-3d",
          ...(canTilt
            ? {
                rotateX,
                rotateY,
                y: hoverY,
                scale: hoverScale,
              }
            : {}),
          ...style,
        }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        {...rest}
      >
        {glare && canTilt && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
            style={{
              background: glareBackground,
              opacity: smoothHover,
            }}
          />
        )}
        <div className="relative z-10 flex h-full w-full flex-col">{children}</div>
      </MotionTag>
    </motion.div>
  );
});

export default TiltCard;
