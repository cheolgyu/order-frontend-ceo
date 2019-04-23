<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-form>
        <v-text-field
          v-model="value"
          label="E-mail"
          :rules="[rules.required, rules.email]"
        ></v-text-field>
        <v-text-field
          name="name"
          label="Enter your password"
          hint="At least 8 characters"
          min="8"
          :append-icon="value ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (value = !value)"
          value="Password"
          :rules="[() => 'The email and password you entered don\'t match']"
          error
          :type="value ? 'password' : 'text'"
        ></v-text-field>
        <v-text-field
          name="name"
          label="Enter your password"
          hint="At least 8 characters"
          min="8"
          :append-icon="value ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (value = !value)"
          value="Password"
          :rules="[() => 'The email and password you entered don\'t match']"
          error
          :type="value ? 'password' : 'text'"
        ></v-text-field>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      title: 'Preliminary report',
      email: '',
      rules: {
        required: value => !!value || 'Required.',
        counter: value => value.length <= 20 || 'Max 20 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      }
    }
  }
}
</script>
<style></style>
