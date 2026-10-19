// Label + input + inline error message.
export default function Field({ label, id, error, className = 'login-page-form-group', ...inputProps }) {
  return (
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} aria-invalid={error ? 'true' : undefined} {...inputProps} />
      {error && <p className="field-error" role="alert">{error}</p>}
    </div>
  )
}
