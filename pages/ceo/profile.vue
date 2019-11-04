<template>
  <v-card class="mx-auto" max-width="500" tile>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>사용자</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card>
            <v-card-text>
              <v-text-field v-bind="prod.id" :value="user.account_id" />
              <v-text-field v-bind="prod.name" :value="user.name" />
              <v-text-field v-bind="prod.email" :value="user.email" />
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel id="open">
        <v-expansion-panel-header>가게</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card>
            <v-card-text v-if="shop != null">
              <v-form>
                <v-text-field v-model="form_shop.name" v-bind="prod.shop" />
                <v-btn
                  :disabled="submitStatus.shop === 'PENDING'"
                  @click="click_shop"
                  v-text="btn_update"
                />
              </v-form>
            </v-card-text>
            <v-card-text v-if="shop == null">
              <v-form>
                <v-text-field v-model="form_shop.name" v-bind="prod.shop" />
                <v-btn
                  :disabled="submitStatus.shop === 'PENDING'"
                  @click="click_shop"
                  v-text="btn_submit"
                />
              </v-form>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>인증</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-expansion-panels>
            <v-expansion-panel popout>
              <v-expansion-panel-header>이메일 인증</v-expansion-panel-header>
              <v-expansion-panel-content>
                <template v-slot:actions>
                  <template v-if="user.valid_email">
                    <v-icon color="teal">done</v-icon>
                  </template>
                  <template v-else>
                    <v-icon color="error">error</v-icon>
                  </template>
                </template>
                <v-card>
                  <v-card-text>
                    <v-form>
                      <v-text-field v-bind="prod.email" v-model="form_email.kind_value" />
                      <v-btn
                        :disabled="submitStatus.email === 'PENDING'"
                        @click="valid_email"
                        v-text="btn_auth"
                      />
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>핸드폰 인증</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card>
                  <v-card-text>
                    <v-text-field v-bind="prod.id" :value="user.account_id" />
                    <v-text-field v-bind="prod.name" :value="user.name" />
                    <v-text-field v-bind="prod.email" :value="user.email" />
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>계좌 인증</v-expansion-panel-header>
              <v-expansion-panel-content>
                <template v-slot:actions>
                  <v-icon color="error">error</v-icon>
                </template>
                <v-card>
                  <v-card-text>
                    <v-text-field v-bind="prod.id" :value="user.account_id" />
                    <v-text-field v-bind="prod.name" :value="user.name" />
                    <v-text-field v-bind="prod.email" :value="user.email" />
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: scope => ({
    submitStatus: {
      email: false,
      shop: false
    },
    show_pwd: false,
    btn_update: scope.$t("btn.update"),
    btn_auth: scope.$t("btn.auth"),
    btn_submit: scope.$t("btn.submit"),
    show_password_comfirm: false,
    form: {
      login: { id: null, password: null },
      password_comfirm: null,
      email: null,
      name: null
    },
    form_shop: {
      name: null
    },
    form_email: {
      kind_value: null,
      kind: "",
      user_id: null
    },
    prod: {
      id: {
        label: "아이디",
        disabled: true
      },
      name: {
        label: "이름",
        disabled: true
      },
      email: {
        label: "이메일 주소",
        name: "email",
        disabled: true
      },
      shop: {
        label: "가게명",
        name: "name"
      }
    }
  }),
  computed: {
    ...mapState({
      auth: state => state.user.auth,
      user: state => state.user.user,
      shop: state => state.shop.shop
    })
  },
  mounted: function() {
    this.form_shop.name = this.shop == null ? null : this.shop.name;
    this.form_email.user_id = this.user.id;
    this.form_email.kind_value = this.user.email;
    if (this.shop == null) {
      this.step_shop_name();
    }
  },
  methods: {
    step_shop_name() {
      let setshop = document
        .getElementById("open")
        .getElementsByClassName("v-expansion-panel-header")[0];

      setshop.click();
    },
    valid_email() {
      this.$data.form_email.kind = "email";
      this.$store
        .dispatch("auth/valid_email", this.$data.form_email)
        .then(res => {
          if (res.status == 200) {
            alert("메일이 발송됬습니다.");
          } else if (res.status === 400) {
            alert(res.data);
          } else {
            alert("다시 시도하세요.");
          }
        });
    },
    click_shop() {
      this.$store.dispatch("shop/add", this.$data.form_shop).then(res => {
        if (res == 200) {
          alert("등록됬습니다.");
        } else if (res === 400) {
          alert(res.data);
        } else {
          alert("다시 시도하세요.");
        }
      });
    }
  }
};
</script>
