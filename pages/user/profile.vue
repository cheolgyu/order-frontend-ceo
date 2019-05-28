<template>
<v-expansion-panel popout>
 <v-expansion-panel-content >
   <template v-slot:header>
          <div>사용자 프로필</div>
      </template>
      <v-card>
    <v-card-text>
      <v-text-field
          v-bind="prod.id"
        :value="auth.user.account_id"
        />
      <v-text-field
          v-bind="prod.name"
        :value="auth.user.name"
        /><v-text-field
          v-bind="prod.email"
        :value="auth.user.email"
        />
    </v-card-text> 
  </v-card>
 </v-expansion-panel-content>
<v-expansion-panel-content >
  <template v-slot:actions>
          <v-icon color="teal">done</v-icon>
        </template>
   <template v-slot:header>
          <div>이메일 인증</div>
      </template>
      <v-card>
    <v-card-text>
      <v-text-field
          v-bind="prod.id"
        :value="auth.user.account_id"
        />
      <v-text-field
          v-bind="prod.name"
        :value="auth.user.name"
        /><v-text-field
          v-bind="prod.email"
        :value="auth.user.email"
        />
    </v-card-text> 
  </v-card>
 </v-expansion-panel-content>
  <v-expansion-panel-content >
   <template v-slot:header>
          <div>핸드폰 인증</div>
      </template>
      <v-card>
    <v-card-text>
      <v-text-field
          v-bind="prod.id"
        :value="auth.user.account_id"
        />
      <v-text-field
          v-bind="prod.name"
        :value="auth.user.name"
        /><v-text-field
          v-bind="prod.email"
        :value="auth.user.email"
        />
    </v-card-text> 
  </v-card>
 </v-expansion-panel-content>
<v-expansion-panel-content >
   <template v-slot:actions>
          <v-icon color="error">error</v-icon>
        </template>
   <template v-slot:header>
          <div>계좌 인증</div>
      </template>
      <v-card>
    <v-card-text>
      <v-text-field
          v-bind="prod.id"
        :value="auth.user.account_id"
        />
      <v-text-field
          v-bind="prod.name"
        :value="auth.user.name"
        /><v-text-field
          v-bind="prod.email"
        :value="auth.user.email"
        />
    </v-card-text> 
  </v-card>
 </v-expansion-panel-content>
</v-expansion-panel>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: scope => ({
    submitStatus: null,
    show_pwd: false,
    btn_sumit: scope.$t("btn.submit"),
    show_password_comfirm: false,
    form: {
      login: { id: null, password: null },
      password_comfirm: null,
      email: null,
      name: null
    },
    prod: {
      id: {
        label: "아이디",
        disabled:true
      },
      name: {
        label: "이름",
        disabled:true
      },
      email: {
        label: "이메일 주소",
        disabled:true
      }
    }
  }),
  computed: {
    ...mapState({
      auth: state => state.user.auth
    })
  },
  methods: {
  
  }
};
</script>
