// loader config
export const animationSpeed = 5000
export const circularLoaderConfig = {
  radius: 50, // Circle radius
  strokeWidth: 6, // Contour thickness
}

// page animation config
export const pageAnimationConfig = {
  initial: { x: '300px', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '-300px', opacity: 0 },
  transition: { duration: 0.3, ease: 'easeOut' },
}

// bubble select config
export const bubbleRowConfig = {
  topRow: 3,
  bottomRow: 2,
}
