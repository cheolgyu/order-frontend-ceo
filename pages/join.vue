<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-form>
        <v-text-field
          v-model="form.login.id"
          v-bind="prod.id"
          :error-messages="idErrors"
          @input="$v.form.login.id.$touch()"
          @blur="$v.form.login.id.$touch()"
        />
        <v-text-field
          v-model="form.login.password"
          v-bind="prod.password"
          :type="show_pwd ? 'text' : 'password'"
          :append-icon="show_pwd ? 'visibility' : 'visibility_off'"
          style="ime-mode:disable"
          :error-messages="passwordErrors"
          @click:append="show_pwd = !show_pwd"
          @input="$v.form.login.password.$touch()"
          @blur="$v.form.login.password.$touch()"
        />
        <v-text-field
          v-model="form.password_comfirm"
          v-bind="prod.password_comfirm"
          :type="show_password_comfirm ? 'text' : 'password'"
          :append-icon="show_password_comfirm ? 'visibility' : 'visibility_off'"
          :error-messages="password_comfirmErrors"
          @click:append="show_password_comfirm = !show_password_comfirm"
          @input="$v.form.password_comfirm.$touch()"
          @blur="$v.form.password_comfirm.$touch()"
        />
        <v-text-field
          v-model="form.email"
          v-bind="prod.email"
          :error-messages="emailErrors"
          @input="$v.form.email.$touch()"
          @blur="$v.form.email.$touch()"
        />
        <v-text-field
          v-model="form.name"
          v-bind="prod.name"
          :error-messages="nameErrors"
          @input="$v.form.name.$touch()"
          @blur="$v.form.name.$touch()"
        />
        <v-btn :disabled="submitStatus === 'PENDING'" @click="submit" v-text="btn_sumit" />
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import {
  required,
  maxLength,
  email,
  minLength,
  sameAs,
  alphaNum
} from "vuelidate/lib/validators";

export default {
  layout: "pub",
  validations: {
    form: {
      login: {
        id: {
          required,
          minLength: minLength(6),
          maxLength: maxLength(30),
          alphaNum
        },
        password: {
          required,
          minLength: minLength(6),
          maxLength: maxLength(30),
          alpha: password => {
            return /[a-zA-Z]/.test(password);
          },
          number: password => {
            return /[0-9]/.test(password);
          },
          specialCharacters: password => {
            return /[!@#$%^&*]/.test(password);
          }
        }
      },
      email: { required, email },
      password_comfirm: {
        sameAsPassword: sameAs(function() {
          return this.form.login.password;
        }),
        required
      },
      name: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(30)
      }
    }
  },
  data: scope => ({
    submitStatus: null,
    show_pwd: false,
    btn_sumit: scope.$t("str.submit"),
    show_password_comfirm: false,
    form: {
      login: { id: null, password: null },
      password_comfirm: null,
      email: null,
      name: null
    },
    prod: {
      id: {
        name: "id",
        label: scope.$t("str.id"),
        autocomplete: "id"
      },
      password: {
        name: "password",
        label: scope.$t("str.password"),
        autocomplete: "new-password"
      },
      password_comfirm: {
        name: "password_comfirm",
        label: scope.$t("str.password_confirm"),
        autocomplete: "password_confirm"
      },
      email: {
        label: scope.$t("str.email"),
        autocomplete: "email"
      },
      name: {
        label: scope.$t("str.name"),
        autocomplete: "name"
      }
    }
  }),
  computed: {
    idErrors() {
      const errors = [];
      if (!this.$v.form.login.id.$dirty) return errors;
      !this.$v.form.login.id.required && errors.push(this.$t("str.required"));
      !this.$v.form.login.id.minLength && errors.push(this.$t("str.minLength"));
      !this.$v.form.login.id.maxLength && errors.push(this.$t("str.maxLength"));
      !this.$v.form.login.id.alphaNum && errors.push(this.$t("str.alpha_num"));

      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.form.login.password.$dirty) return errors;
      !this.$v.form.login.password.maxLength &&
        errors.push(this.$t("str.maxLength"));
      !this.$v.form.login.password.minLength &&
        errors.push(this.$t("str.minLength"));
      !this.$v.form.login.password.required &&
        errors.push(this.$t("str.required"));
      !this.$v.form.login.password.alpha && errors.push(this.$t("str.alpha"));
      !this.$v.form.login.password.number && errors.push(this.$t("str.number"));
      !this.$v.form.login.password.specialCharacters &&
        errors.push(this.$t("str.specialCharacters"));
      return errors;
    },
    password_comfirmErrors() {
      const errors = [];
      if (!this.$v.form.password_comfirm.$dirty) return errors;
      !this.$v.form.password_comfirm.sameAsPassword &&
        errors.push(this.$t("form.password_confirm.error.valid"));
      !this.$v.form.password_comfirm.required &&
        errors.push(this.$t("form.password_confirm.error.required"));
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.form.email.$dirty) return errors;
      !this.$v.form.email.email && errors.push(this.$t("email.error.valid"));
      !this.$v.form.email.required &&
        errors.push(this.$t("email.error.required"));
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      !this.$v.form.name.required &&
        errors.push(this.$t("form.name.error.required"));
      return errors;
    }
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.dispatch("user/join", this.$data.form).then(res => {
          if (res.status == 200) {
            alert(this.$t("resp.signup.ok"));
            this.$router.push("/");
          } else if (res.status === 400) {
            alert(this.$t(res.data));
          } else {
            alert(this.$t("resp.signup.err"));
          }
        });
      }
    }
  }
};
</script>
