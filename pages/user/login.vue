<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-form>
        <v-text-field label="id" name="id" value="rb7480"></v-text-field>
        <v-text-field name="password" value="dlacjfrb123!@#"></v-text-field>
        <v-btn :disabled="submitStatus === 'PENDING'" @click="submit">{{
          $t('btn.submit')
        }}</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: scope => ({
    submitStatus: null,
    form: {
      id: 'rb7480',
      password: 'dlacjfrb123!@#'
    },

    rules: {
      required: value => !!value || 'Required.',
      counter: value => value.length <= 20 || 'Max 20 characters',
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      }
    }
  }),
  methods: {
    submit() {
      console.log(this.$store)
      this.$store.dispatch('user/login', this.$data.form)
    }
  }
}
</script>
<style></style>
