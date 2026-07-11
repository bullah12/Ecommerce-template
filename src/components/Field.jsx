// Labeled form control with inline validation message.
// Renders an <input> by default, a <select> when `select` is set,
// or a <textarea> when `textarea` is set.
export default function Field({
  id,
  label,
  error,
  select = false,
  textarea = false,
  children,
  ...props
}) {
  const controlClass = `input${error ? ' input--invalid' : ''}`;

  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      {select ? (
        <select id={id} className={controlClass} aria-invalid={!!error} {...props}>
          {children}
        </select>
      ) : textarea ? (
        <textarea id={id} className={controlClass} aria-invalid={!!error} {...props} />
      ) : (
        <input id={id} className={controlClass} aria-invalid={!!error} {...props} />
      )}
      {error && (
        <p className="field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
