<template>
  <v-form @submit.prevent="submit">
    <v-text-field
      v-model="form.email"
      :error-messages="emailErrors"
      v-bind="email.props"
      @input="$v.form.email.$touch()"
      @blur="$v.form.email.$touch()"
    ></v-text-field>

    <v-text-field
      v-model.trim="form.password"
      v-bind="password.props"
      :error-messages="passwordErrors"
      :append-icon="show1 ? 'visibility' : 'visibility_off'"
      :type="show1 ? 'text' : 'password'"
      style="ime-mode:disable"
      @input="$v.form.password.$touch()"
      @blur="$v.form.password.$touch()"
      @click:append="show1 = !show1"
    ></v-text-field>

    <v-text-field
      v-model.trim="form.passwordConfirm"
      v-bind="passwordConfirm.props"
      :error-messages="passwordConfirmErrors"
      :append-icon="show2 ? 'visibility' : 'visibility_off'"
      :type="show2 ? 'text' : 'password'"
      @input="$v.form.passwordConfirm.$touch()"
      @blur="$v.form.passwordConfirm.$touch()"
      @click:append="show2 = !show2"
    ></v-text-field>

    <v-checkbox
      v-model="form.checkbox"
      :error-messages="checkboxErrors"
      label="Do you agree?"
      required
      @change="$v.checkbox.$touch()"
      @blur="$v.checkbox.$touch()"
    ></v-checkbox>

    <v-btn :disabled="submitStatus === 'PENDING'" @click="submit">{{
      $t('btn.submit')
    }}</v-btn>
    <v-btn @click="clear">{{ $t('btn.clear') }}</v-btn>
    <p v-if="submitStatus === 'OK'" class="typo__p">
      Thanks for your submission!
    </p>
    <p v-if="submitStatus === 'ERROR'" class="typo__p">
      Please fill the form correctly.
    </p>
    <p v-if="submitStatus === 'PENDING'" class="typo__p">Sending...</p>
  </v-form>
</template>

<script>
import {
  required,
  maxLength,
  email,
  minLength,
  sameAs
} from 'vuelidate/lib/validators'
export default {
  validations: {
    form: {
      email: { required, email },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(30),
        alpha: password => {
          return /[a-zA-Z]/.test(password)
        },
        number: password => {
          return /[0-9]/.test(password)
        },
        specialCharacters: password => {
          return /[!@#$%^&*]/.test(password)
        }
      },
      passwordConfirm: {
        sameAsPassword: sameAs('password'),
        required
      },
      checkbox: {
        checked(val) {
          return val
        }
      }
    }
  },
  data: scope => ({
    submitStatus: null,
    show1: false,
    show2: false,
    form: {
      email: 'rb7480@naver.com',
      password: 'a123!@#',
      passwordConfirm: 'a123!@#',
      checkbox: true
    },
    email: {
      props: {
        name: 'email',
        label: scope.$t('email.label'),
        placeholder: scope.$t('email.placeholder'),
        required: true
      }
    },
    password: {
      props: {
        name: 'password',
        counter: 0,
        hint: scope.$t('password.hint'),
        label: scope.$t('password.label'),
        placeholder: scope.$t('password.placeholder'),
        required: true
      }
    },
    passwordConfirm: {
      props: {
        name: 'passwordConfirm',
        counter: 0,
        hint: scope.$t('passwordConfirm.hint'),
        label: scope.$t('passwordConfirm.label'),
        placeholder: scope.$t('passwordConfirm.placeholder'),
        required: true
      }
    }
  }),
  computed: {
    checkboxErrors() {
      const errors = []
      if (!this.$v.form.checkbox.$dirty) return errors
      !this.$v.form.checkbox.checked &&
        errors.push('You must agree to continue!')
      return errors
    },
    selectErrors() {
      const errors = []
      if (!this.$v.select.$dirty) return errors
      !this.$v.select.required && errors.push('Item is required')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.form.password.$dirty) return errors
      !this.$v.form.password.maxLength &&
        errors.push(this.$t('password.error.maxLength'))
      !this.$v.form.password.minLength &&
        errors.push(this.$t('password.error.minLength'))
      !this.$v.form.password.required &&
        errors.push(this.$t('password.error.required'))
      !this.$v.form.password.alpha &&
        errors.push(this.$t('password.error.alpha'))
      !this.$v.form.password.number &&
        errors.push(this.$t('password.error.number'))
      !this.$v.form.password.specialCharacters &&
        errors.push(this.$t('password.error.specialCharacters'))
      return errors
    },
    passwordConfirmErrors() {
      const errors = []
      if (!this.$v.form.passwordConfirm.$dirty) return errors
      !this.$v.form.passwordConfirm.sameAsPassword &&
        errors.push(this.$t('passwordConfirm.error.valid'))
      !this.$v.form.passwordConfirm.required &&
        errors.push(this.$t('passwordConfirm.error.required'))
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.form.email.$dirty) return errors
      !this.$v.form.email.email && errors.push(this.$t('email.error.valid'))
      !this.$v.form.email.required &&
        errors.push(this.$t('email.error.required'))
      return errors
    }
  },
  methods: {
    submit() {
      // console.log('submit!', this.$data.form, this.$store)
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING'
        this.$store.dispatch('user/join', this.$data.form)
        setTimeout(() => {
          this.submitStatus = 'OK'
        }, 500)
      }
      console.log(this.submitStatus)
    },
    clear() {
      this.$v.$reset()
      this.form.email = ''
      this.form.password = ''
      this.form.passwordConfirm = ''
      this.checkbox = false
    }
  }
}
</script>
