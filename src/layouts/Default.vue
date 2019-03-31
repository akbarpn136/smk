<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-gradient-primary">
      <q-toolbar>
        <q-toolbar-title>
          Aplikasi Siswa SMK
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          @click="$router.push('/tentang')"
          aria-label="Tentang">
          <q-icon name="eva-question-mark-circle-outline" />
        </q-btn>

        <q-btn
          flat
          dense
          round
          @click="cobaKeluar"
          aria-label="Keluar">
          <q-icon name="eva-log-out-outline" />
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'Default',
  data () {
    return {}
  },
  methods: {
    async cobaKeluar() {
      try {
        await this.$firebase.auth().signOut()
        this.$router.push('/masuk')
      } catch (err) {
        console.log(err.message)
      }
    }
  }
}
</script>

<style>
</style>
