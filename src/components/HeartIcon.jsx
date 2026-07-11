// Inline heart glyph for wishlist controls; inherits currentColor so it
// picks up whatever ink/accent token the surrounding element uses.
export default function HeartIcon({ filled = false, size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M19.84 4.61a5.5 5.5 0 0 0-7.78 0L12 4.67l-.06-.06a5.5 5.5 0 1 0-7.78 7.78l.06.06L12 20.23l7.78-7.78.06-.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
