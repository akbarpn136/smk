<template>
  <q-page class="flex flex-center">
    <q-card style="width: 350px">
      <q-bar>
        <q-icon name="eva-lock-outline" />
        <div>Otentikasi Pengguna</div>
      </q-bar>

      <q-card-section>
        <q-input outlined
          ref="email"
          v-model="email"
          label="Email"
          type="email"
          placeholder=""
          hint=""
          :rules="[
            val => !!val || 'Email diperlukan',
            val => this.validateEmail(val) || 'Format email keliru'
          ]" />
      </q-card-section>

      <q-card-section>
        <q-input outlined
          ref="password"
          v-model="password"
          label="Password"
          type="password"
          placeholder=""
          hint=""
          :rules="[val => !!val || 'Password diperlukan']" />
      </q-card-section>

      <q-card-section>
        <q-btn 
          push
          color="primary"
          label="MASUK"
          class="full-width"
          size="lg"
          @click="cobaMasuk" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import isEmail from 'validator/lib/isEmail'

export default {
  name: 'PageMasuk',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    validateEmail(value) {
      return isEmail(value)
    },
    cobaMasuk() {
      const emailSelector = this.$refs.email
      const passwordSelector = this.$refs.password

      emailSelector.validate()
      passwordSelector.validate()

      if (emailSelector.hasError || passwordSelector.hasError) return 
      else {
        let data = {
          email: this.email,
          password: this.password
        }
        this.cobaAuth(data)
      }
    },
    async cobaAuth(payload) {
      try {
        // firebase authentication
        await this.$firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        this.$router.push('/')
      } catch (err) {
        this.$q.notify({
          message: err.message,
          color: 'negative',
          icon: 'eva-alert-circle-outline',
          position: 'top'
        })
      }
    }
  }
}
</script>

<style>
</style>
