<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-form
        v-model="form.valid"
        lazy-validation
        @submit.prevent="validate() && submit()"
      >
        <v-container grid-list-sm fluid>
          <v-layout v-bind="responsive">
            <v-flex xs12 sm6>
              <v-text-field
                v-model="form.email"
                v-validate="email.rules"
                v-bind="email.props"
                :error-messages="errors.collect(email.props.name)"
              />
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field
                v-model="form.password"
                v-validate="password.primary.rules"
                v-bind="password.primary.props"
                :error-messages="errors.collect(password.primary.props.name)"
              />
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field
                v-model="form.passconf"
                v-validate="password.confirm.rules"
                v-bind="password.confirm.props"
                :error-messages="errors.collect(password.confirm.props.name)"
              />
            </v-flex>
          </v-layout>
        </v-container>
        <v-container grid-list-lg fluid>
          <v-layout v-bind="responsive">
            <v-flex xs6>
              <v-btn
                v-bind="button.props"
                type="submit"
                v-text="button.accept"
              />
            </v-flex>
            <v-flex xs6>
              <v-btn
                v-bind="button.props"
                type="reset"
                @click="clear(), $validator.reset()"
                v-text="button.reject"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
// https://codepen.io/lighth7015/pen/BrXbgG?editors=1111
const dictionary = {
  ko: {
    custom: {
      email: {
        required: '이메일을 입력해주세요.!'
      },
      password: {
        required: 'Account Password is required'
      },
      passconf: {
        required: 'Account Password is required',
        confirmed: 'Password confirmation does not match Account Password'
      },

      question: {
        required: 'Please select an account recovery question'
      },

      response: {
        required: 'Please enter the answer to the above question'
      }
    }
  }
}
export default {
  data: scope => ({
    form: {
      id: null,
      password: null,
      passconf: null,
      recovery: {
        question: null,
        response: null
      }
    },
    email: {
      props: {
        name: '이메일',
        label: '계정 이메일',
        placeholder: '이메일을 입력하세요.',
        required: true
      },

      rules: {
        required: () => 'Hi.'
      }
    },

    password: {
      primary: {
        props: {
          name: 'password',
          label: 'Account Password',

          placeholder: 'Account Password',
          required: true
        },

        rules: {
          required: () => 'Hi.'
        }
      },

      confirm: {
        props: {
          name: 'passconf',
          label: 'Confirm Password',

          placeholder: 'Password confirmation',
          required: true
        },
        rules: {
          required: true,
          confirmed: 'password'
        }
      }
    },

    recovery: {
      question: {
        props: {
          name: 'question',
          label: 'Account Recovery Question',

          placeholder: 'Account Recovery Question',
          required: true,

          items: ['Item 1', 'Item 2', 'Item 3', 'Item 4']
        },

        rules: {
          required: true
        }
      }
    },

    button: {
      props: {
        block: true
      },

      accept: 'Submit',
      reject: 'Clear'
    }
  }),

  computed: {
    responsive: ({ $vuetify: { breakpoint } }) => {
      const layout = breakpoint.smAndUp ? 'row' : 'column'

      return { [layout]: true }
    },

    response() {
      const {
        form: { recovery }
      } = this

      return {
        props: {
          name: 'response',
          label: 'Account Recovery Answer',

          placeholder: 'Account Recovery Answer'
        },

        rules: {
          required: !!recovery.question
        }
      }
    }
  },

  mounted() {
    const { $validator } = this
    $validator.localize(dictionary)
  },
  methods: {
    submit() {},

    validate() {
      const { $validator } = this
      let result = true

      $validator.validateAll().then(valid => (result = valid))

      return result
    },

    clear() {
      this.form = {
        id: null,
        password: null,
        passconf: null,
        recovery: {
          question: null,
          response: null
        }
      }
    }
  }
}
</script>
<style></style>
