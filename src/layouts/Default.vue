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
          @click="goToTentang()"
          aria-label="Tentang">
          <q-icon name="eva-question-mark-circle-outline" />
          <q-badge floating color="grey-9">{{kunjungan}}</q-badge>
        </q-btn>

        <q-btn
          flat
          dense
          round
          @click="showDialogPict = !showDialogPict"
          aria-label="Profile">
          <q-avatar size="24px" v-if="user.hasAvatar">
            <img :src="user.urlAvatar" />
          </q-avatar>

          <q-icon name="eva-person-outline" v-else />
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

    <q-dialog v-model="showDialogPict" persistent>
      <q-card>
        <q-bar>
          <q-icon name="eva-save" />
            <div>Ganti Profile Picture</div>

            <q-space />

            <q-btn dense flat icon="eva-close-outline" @click="showDialogPict = !showDialogPict">
              <q-tooltip>Tutup</q-tooltip>
            </q-btn>
        </q-bar>

        <q-card-section>
          <q-uploader :factory="factoryFn" auto-upload dark />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'Default',
  data () {
    return {
      storageRef: null,
      showDialogPict: false,
      user: {
        id: '',
        hasAvatar: false,
        urlAvatar: ''
      }
    }
  },
  created() {
    this.$firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user.id = user.uid
        this.getAvatar()
      }
    })
    this.storageRef = this.$firebase.storage().ref()
  },
  methods: {
    async cobaKeluar() {
      try {
        await this.$firebase.auth().signOut()
        this.$router.push('/masuk')
      } catch (err) {
        console.log(err.message)
      }
    },
    async factoryFn(file) {
      const pictRef = this.storageRef.child(`smk/${this.user.id}`)
      const pict = file[0]

      try {
        await pictRef.put(pict)
        this.getAvatar()

        return {
          url: 'data:image/png;base64,',
          method: 'GET'
        }
      }
      catch (err) {
        console.log(err.message)
        this.user.hasAvatar = false

        return {
          url: '',
          method: 'GET'
        }
      }
    },
    async getAvatar() {
      try {
        this.user.urlAvatar = await this.storageRef.child(`smk/${this.user.id}`).getDownloadURL()

        if (this.user.urlAvatar) this.user.hasAvatar = true
      } catch (err) {
        console.log(err.message)
        this.user.hasAvatar = false
      }
    },
    goToTentang() {
      if(this.$route.path != '/tentang') this.$store.commit('counter/counterMutation')
      this.$router.push('/tentang')
    }
  },
  computed: {
    kunjungan: function() {
      return this.$store.getters['counter/counterGetter']
    }
  }
}
</script>

<style>
</style>
