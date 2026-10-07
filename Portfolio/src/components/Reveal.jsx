import { motion, useReducedMotion } from 'framer-motion';

/**
 * Wraps children in a fade + slide-up reveal that triggers once, as the
 * element scrolls into view. Honors prefers-reduced-motion automatically.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = 'div',
  ...rest
}) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as] || motion.div;

  if (reduceMotion) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </Component>
  );
}
