// Each validator returns an object of { fieldName: 'message' }.
// An empty object means the form is valid.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+\d][\d\s-]{6,}$/

export function validateCheckout(values) {
  const errors = {}

  if (!values.fullName.trim()) errors.fullName = 'Full name is required'
  else if (values.fullName.trim().length < 2) errors.fullName = 'Full name is too short'

  if (!values.email.trim()) errors.email = 'Email is required'
  else if (!EMAIL_RE.test(values.email)) errors.email = 'Enter a valid email address'

  if (!values.phone.trim()) errors.phone = 'Phone number is required'
  else if (!PHONE_RE.test(values.phone)) errors.phone = 'Enter a valid phone number'

  if (!values.address.trim()) errors.address = 'Delivery address is required'
  else if (values.address.trim().length < 5) errors.address = 'Address is too short'

  return errors
}

export function validateSignup(values) {
  const errors = {}

  if (!values.name.trim()) errors.name = 'Full name is required'
  else if (values.name.trim().length < 2) errors.name = 'Full name is too short'

  if (!values.email.trim()) errors.email = 'Email is required'
  else if (!EMAIL_RE.test(values.email)) errors.email = 'Enter a valid email address'

  if (!values.phone.trim()) errors.phone = 'Phone number is required'
  else if (!PHONE_RE.test(values.phone)) errors.phone = 'Enter a valid phone number'

  if (!values.password) errors.password = 'Password is required'
  else if (values.password.length < 6) errors.password = 'Use at least 6 characters'

  return errors
}
