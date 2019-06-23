<template>
  <q-page padding>
    <q-list bordered separator class="rounded-borders">
      <q-item-label header>
        Daftar Siswa
        <q-btn 
          flat
          round
          dense
          @click="showForm()"
          icon="eva-plus-circle-outline"
        />
      </q-item-label>

      <q-item v-for="sis in siswa" :key="sis.id">
        <q-item-section>
          <q-item-label>
            {{sis.data.nama}}
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label>
            {{sis.data.nis}}
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label>
            {{sis.data.email}}
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label>
            {{sis.data.jurusan}}
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label>
            {{sis.data.alamat}}
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn 
            dense
            round
            flat
            icon="eva-trash-2-outline" 
            @click="showConfirmDelete(sis.id)"
          />
          <q-btn 
            dense
            round
            flat
            icon="eva-edit-outline" 
            @click="showForm(sis.id)"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <q-dialog v-model="showDialog" persistent>
      <q-card style="width: 350px">
        <q-bar>
          <q-icon name="eva-save" />
          <div>Kelola Data Siswa</div>

          <q-space />

          <q-btn 
            dense
            flat
            icon="eva-close-outline"
            @click="showDialog = !showDialog">

            <q-tooltip>Tutup</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <q-input outlined
            ref="nama"
            v-model="form.nama"
            label="Nama"
            placeholder="Nama lengkap siswa"
            hint=""
            :rules="[val => !!val || 'Nama diperlukan']" />
        </q-card-section>

        <q-card-section>
          <q-input outlined
            ref="nis"
            v-model="form.nis"
            label="NIS"
            type="number"
            placeholder="Nomor induk siswa"
            hint=""
            :rules="[val => !!val || 'NIS diperlukan']" />
        </q-card-section>

        <q-card-section>
          <q-input outlined
            ref="email"
            v-model="form.email"
            label="Email"
            type="email"
            placeholder="Email siswa"
            hint=""
            :rules="[
              val => !!val || 'Email diperlukan',
              val => this.validateEmail(val) || 'Format email keliru'
            ]" />
        </q-card-section>

        <q-card-section>
          <q-input outlined
            ref="jurusan"
            v-model="form.jurusan"
            label="Jurusan"
            placeholder="Jurusan siswa"
            hint=""
            :rules="[val => !!val || 'Jurusan diperlukan']" />
        </q-card-section>

        <q-card-section>
          <q-input outlined
            ref="alamat"
            v-model="form.alamat"
            label="Alamat"
            placeholder="Alamat siswa"
            hint=""
            :rules="[val => !!val || 'Alamat diperlukan']" />
        </q-card-section>

        <q-card-section>
          <q-btn 
            push
            color="primary"
            label="SIMPAN"
            class="full-width"
            size="lg"
            @click="simpan" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirmDelete" persistent>
      <q-card>
        <q-card-section>
          <span class="q-ml-sm">Data akan dihapus, yakin?</span>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn flat label="BATAL" color="grey" @click="confirmDelete = !confirmDelete" />
          <q-btn flat label="Ya, Hapus" color="negative" @click="deleteSiswa" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<style>
</style>

<script>
import { uid } from 'quasar'
import isEmail from 'validator/lib/isEmail'

export default {
  name: 'PageIndex',
  data() {
    return {
      showDialog: false,
      confirmDelete: false,
      form: {
        nama: '',
        nis: '',
        email: '',
        jurusan: '',
        alamat: ''
      },
      siswa: [],
      gid: null
    }
  },
  created() {
    this.fetchSiswa()
  },
  methods: {
    validateEmail(value) {
      return isEmail(value)
    },
    showForm(id='') {
      this.showDialog = true

      if (id != '') {
        this.fetchSiswaById(id)
        this.gid = id
      } else this.gid = ''
    },
    showConfirmDelete(id) {
      this.confirmDelete = true
      this.gid = id
    },
    simpan() {
      const namaSelector = this.$refs.nama
      const nisSelector = this.$refs.nis
      const emailSelector = this.$refs.email
      const jurusanSelector = this.$refs.jurusan
      const alamatSelector = this.$refs.alamat

      namaSelector.validate()
      nisSelector.validate()
      emailSelector.validate()
      jurusanSelector.validate()
      alamatSelector.validate()

      if (namaSelector.hasError || nisSelector.hasError || emailSelector.hasError || jurusanSelector.hasError || alamatSelector.hasError) console.log("Gagal simpan data siswa")
      else {
        this.addSiswa(this.gid)
        this.clearForm()
      }
    },
    clearForm() {
      this.form.nama = ''
      this.form.nis = ''
      this.form.email = ''
      this.form.jurusan = ''
      this.form.alamat = ''
      this.showDialog = false
    },
    async addSiswa(id) {
      this.$q.loadingBar.start()
      if (id == '') id = uid()

      try {
        const doc = await this.$firebase.firestore().collection('siswa').doc(id).set({
          nama: this.form.nama,
          nis: this.form.nis,
          email: this.form.email,
          jurusan: this.form.jurusan,
          alamat: this.form.alamat,
          dibuat: Date.now()
        })

        this.$q.notify({
          message: 'Data siswa berhasil disimpan',
          position: 'top',
          icon: 'eva-checkmark-circle-2-outline',
          color: 'positive'
        })

        this.$q.loadingBar.stop()
      } catch (err) {
        console.log(err.message)
        this.$q.loadingBar.stop()
      }
    },
    async fetchSiswa() {
      this.$q.loadingBar.start()

      try {
        await this.$firebase.firestore().collection('siswa').orderBy('dibuat', 'desc').onSnapshot(ref => {
          this.siswa = []
          ref.forEach(doc => {
            this.siswa.push({id: doc.id, data: doc.data()})
          })
        })
        this.$q.loadingBar.stop()
      } catch (err) {
        console.log(err.message)
        this.$q.loadingBar.stop()
      }
    },
    async fetchSiswaById(id) {
      try {
        const doc = await this.$firebase.firestore().collection('siswa').doc(id).get()
        const siswa = doc.data()

        this.form.nama = siswa.nama
        this.form.nis = siswa.nis
        this.form.email = siswa.email
        this.form.jurusan = siswa.jurusan
        this.form.alamat = siswa.alamat
      } catch (err) {
        console.log(err.message)
      }
    },
    async deleteSiswa() {
      try {
        this.confirmDelete = false
        await this.$firebase.firestore().collection('siswa').doc(this.gid).delete()
      } catch (error) {
        console.log(error.message)
      }
    }
  }
}
</script>