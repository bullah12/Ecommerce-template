// Stand-in for product photography, kept at a consistent 4:5 ratio
// so real images can drop in later without layout shifts.
export default function PlaceholderImage({ label = 'Image coming soon' }) {
  return (
    <div className="placeholder" role="img" aria-label={label}>
      <span className="placeholder__label">{label}</span>
    </div>
  );
}
