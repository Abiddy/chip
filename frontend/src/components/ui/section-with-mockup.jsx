import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SectionWithMockup({
  title,
  description,
  primaryImageSrc,
  secondaryImageSrc,
  reverseLayout = false,
  children,
  className,
  label,
}) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const layoutClasses = reverseLayout
    ? "md:grid-cols-2 md:grid-flow-col-dense"
    : "md:grid-cols-2";

  const textOrderClass = reverseLayout ? "md:col-start-2" : "";
  const imageOrderClass = reverseLayout ? "md:col-start-1" : "";

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="relative z-10 mx-auto w-full max-w-[1220px] px-6 md:px-10">
        <motion.div
          className={cn(
            "grid w-full grid-cols-1 items-center gap-16 md:gap-12",
            layoutClasses
          )}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className={cn(
              "mx-auto flex max-w-[546px] flex-col items-start gap-6 md:mx-0",
              textOrderClass
            )}
            variants={itemVariants}
          >
            {label && (
              <span className="mono text-[10px] text-teal-600">{label}</span>
            )}
            <div className="space-y-2">
              <h2 className="serif text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                {title}
              </h2>
            </div>
            {description && (
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {description}
              </p>
            )}
            {children}
          </motion.div>

          <motion.div
            className={cn(
              "relative mx-auto mt-10 w-full max-w-[300px] md:mt-0 md:max-w-[471px]",
              imageOrderClass
            )}
            variants={itemVariants}
          >
            <motion.div
              className="absolute z-0 h-[317px] w-[300px] overflow-hidden rounded-[32px] bg-slate-100 md:h-[500px] md:w-[472px]"
              style={{
                top: reverseLayout ? "auto" : "10%",
                bottom: reverseLayout ? "10%" : "auto",
                left: reverseLayout ? "auto" : "-20%",
                right: reverseLayout ? "-20%" : "auto",
                transform: reverseLayout ? "translate(0, 0)" : "translateY(10%)",
                filter: "blur(1px)",
              }}
              initial={{ y: 0 }}
              whileInView={{ y: reverseLayout ? -20 : -30 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <div
                className="relative h-full w-full rounded-[32px] bg-cover bg-center opacity-60"
                style={{ backgroundImage: `url(${secondaryImageSrc})` }}
              />
            </motion.div>

            <motion.div
              className="relative z-10 h-[405px] w-full overflow-hidden rounded-[32px] border border-border/60 bg-white/80 shadow-2xl backdrop-blur-[15px] md:h-[637px]"
              initial={{ y: 0 }}
              whileInView={{ y: reverseLayout ? 20 : 30 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <div
                className="h-full w-full bg-cover bg-top"
                style={{ backgroundImage: `url(${primaryImageSrc})` }}
                role="img"
                aria-label="ACE Design Workspace interface"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div
        className="absolute bottom-0 left-0 z-0 h-px w-full"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(15,23,42,0.08) 0%, rgba(15,23,42,0) 100%)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
