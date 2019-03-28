<template>
  <q-page padding>
    <q-list bordered separator class="rounded-borders">
      <q-item-label header>
        Daftar Siswa
        <q-btn 
          flat
          round
          dense
          @click="showDialog = !showDialog"
          icon="eva-plus-circle-outline"
        />
      </q-item-label>

      <q-item v-for="sis in siswa" :key="sis.id">
        <q-item-section>
          <q-item-label>
            {{sis.nama}}
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label>
            {{sis.nis}}
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label>
            {{sis.email}}
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label>
            {{sis.jurusan}}
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label>
            {{sis.alamat}}
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn 
            dense
            round
            flat
            icon="eva-edit-outline"
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
      form: {
        nama: '',
        nis: '',
        email: '',
        jurusan: '',
        alamat: ''
      },
      siswa: [
        {id: uid(), nama: 'Fulan Dulan', nis: 123456, email: 'fulan.dulan@gmail.com', jurusan: 'RPL', alamat: 'jl. disini dulu aja'},
        {id: uid(), nama: 'Fulan Dulan 2', nis: 123456, email: 'fulan.dulan@gmail.com', jurusan: 'RPL', alamat: 'jl. disini dulu aja'},
      ]
    }
  },
  methods: {
    validateEmail(value) {
      return isEmail(value)
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
      
      this.showDialog = false
      this.addSiswa()
      this.clearForm()
    },
    clearForm() {
      this.form.nama = ''
      this.form.nis = ''
      this.form.email = ''
      this.form.jurusan = ''
      this.form.alamat = ''
    },
    addSiswa() {
      this.siswa.push({
        id: uid(),
        nama: this.form.nama,
        nis: this.form.nis,
        email: this.form.email,
        jurusan: this.form.jurusan,
        alamat: this.form.alamat
      })
    }
  }
}
</script>