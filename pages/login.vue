<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-form @submit.prevent>
        <v-text-field v-model="form.id" v-bind="prod.id" />
        <v-text-field
          v-model="form.password"
          v-bind="prod.pwd"
          :type="show_pwd ? 'text' : 'password'"
          :append-icon="show_pwd ? 'visibility' : 'visibility_off'"
          @click:append="show_pwd = !show_pwd"
        />
        <v-btn
          type="submit"
          :disabled="submitStatus === 'PENDING'"
          @click="submit"
        >{{ $t('word.login') }}</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: "pub",
  data: scope => ({
    submitStatus: null,
    show_pwd: false,
    form: {
      id: null,
      password: null
    },
    prod: {
      id: {
        name: "id",
        label: scope.$t("word.id")
      },
      pwd: {
        name: "password",
        label: scope.$t("word.password")
      }
    },

    rules: {
      required: value => !!value || "Required.",
      counter: value => value.length <= 20 || "Max 20 characters",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      }
    }
  }),
  methods: {
    submit() {
      this.$store.dispatch("user/login", this.$data.form).then(res => {
        if (res.status == 200) {
          if (localStorage.getItem("redirect") == null) {
            this.$router.push("/user");
          } else {
            this.$router.push(localStorage.getItem("redirect"));
          }
        } else {
          alert(this.$t("resp.err"));
        }
      });
    }
  }
};
</script>
<style></style>
