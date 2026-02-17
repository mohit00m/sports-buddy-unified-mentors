export function validateText(value, fieldName) {
  if (!value || value.trim().length < 2) {
    alert(fieldName + " must be at least 2 characters.");
    return false;
  }
  return true;
}
