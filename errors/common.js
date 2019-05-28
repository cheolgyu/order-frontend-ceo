// ./customValidators/passwordComplexity.js
export default {
  checkboxErrors(v) {
    const errors = []
    if (!v.checkbox.$dirty) return errors
    !v.checkbox.checked && errors.push('You must agree to continue!')
    return errors
  },
  selectErrors(v) {
    const errors = []
    if (!v.select.$dirty) return errors
    !v.select.required && errors.push('Item is required')
    return errors
  },
  passwordErrors(v) {
    const errors = []
    if (!v.form.password.$dirty) return errors
    !v.form.password.maxLength && errors.push(this.$t('password.error.maxLength'))
    !v.form.password.minLength && errors.push(this.$t('password.error.minLength'))
    !v.form.password.required && errors.push(this.$t('password.error.required'))
    !v.form.password.alpha && errors.push(this.$t('password.error.alpha'))
    !v.form.password.number && errors.push(this.$t('password.error.number'))
    !v.form.password.specialCharacters && errors.push(this.$t('password.error.specialCharacters'))
    return errors
  },
  passwordConfirmErrors(v) {
    const errors = []
    if (!v.form.passwordConfirm.$dirty) return errors
    !v.form.passwordConfirm.sameAsPassword && errors.push(this.$t('passwordConfirm.error.valid'))
    !v.form.passwordConfirm.required && errors.push(this.$t('passwordConfirm.error.required'))
    return errors
  },
  emailErrors(v) {
    const errors = []
    if (!v.form.email.$dirty) return errors
    !v.form.email.email && errors.push(this.$t('email.error.valid'))
    !v.form.email.required && errors.push(this.$t('email.error.required'))
    return errors
  }
}
