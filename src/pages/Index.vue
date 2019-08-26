<template>
  <q-page padding>
    <q-list bordered separator class="rounded-borders">
      <q-item-label header>
        Daftar Barang
        <q-btn 
          flat
          round
          dense
          @click="showForm()"
          icon="eva-plus-circle-outline"
        />

        <q-btn-dropdown outline color="grey" label="Lokasi" class="q-ml-sm">
          <q-list>
            <q-item 
              clickable 
              v-close-popup 
              @click="onItemClick(lok)" 
              v-for="lok in daftarLokasi" 
              :key="lok">
              <q-item-section>
                <q-item-label>{{lok}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-item-label>

      <q-item v-for="brg in barang" :key="brg.id">
        <q-item-section avatar middle>
          <q-avatar rounded>
            <img :src="brg.data.foto" v-if="brg.data.foto">
            <img src="http://via.placeholder.com/640x360" v-else>
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>
            {{brg.data.nama}}
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label>
            {{brg.data.nomor}}
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label>
            {{brg.data.kategori}}
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label>
            {{brg.data.lokasi}}
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label>
            {{brg.data.pemilik}}
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn 
            dense
            round
            flat
            icon="eva-trash-2-outline" 
            @click="showConfirmDelete(brg.id)"
          />
          <q-btn 
            dense
            round
            flat
            icon="eva-edit-outline" 
            @click="showForm(brg.id)"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <q-dialog v-model="showDialog" persistent>
      <q-card style="width: 350px">
        <q-bar>
          <q-icon name="eva-save" />
          <div>Olah Data Barang</div>

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
            placeholder="Nama lengkap barang"
            hint=""
            :rules="[val => !!val || 'Nama diperlukan']" />
        </q-card-section>

        <q-card-section>
          <q-input outlined
            ref="nomor"
            v-model="form.nomor"
            label="Nomor seri"
            placeholder="Nomor Seri Barang"
            hint=""
            :rules="[val => !!val || 'Nomor diperlukan']" />
        </q-card-section>

        <q-card-section>
          <q-input outlined
            ref="kategori"
            v-model="form.kategori"
            label="Kategori"
            placeholder="Kategori barang"
            hint=""
            :rules="[val => !!val || 'Kategori diperlukan']" />
        </q-card-section>

        <q-card-section>
          <q-select outlined 
            ref="lokasi"
            v-model="form.lokasi" 
            :options="daftarLokasi" 
            label="Lokasi"
            :rules="[val => !!val || 'Lokasi diperlukan']" />
        </q-card-section>

        <q-card-section>
          <q-input outlined
            ref="foto"
            v-model="form.foto"
            label="Foto URL"
            placeholder="Foto URL barang"
            hint="" />
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
          <q-btn flat label="Ya, Hapus" color="negative" @click="deleteBarang" />
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
      daftarLokasi: ['', 'LSWT', 'Hemi Anechoic', 'VIENTA'],
      form: {
        nama: '',
        nomor: '',
        kategori: '',
        lokasi: '',
        foto: ''
      },
      barang: [],
      gid: null,
      user: ''
    }
  },
  created() {
    this.getUser()
    this.fetchBarang()
  },
  methods: {
    getUser() {
      this.$firebase.auth().onAuthStateChanged(user => {
        if (user) {
          const email = user.email

          this.user = email.substring(0, email.lastIndexOf("@"))
        } else {
          console.log('Already logged out.')
        }
      })
    },
    showForm(id='') {
      this.showDialog = true

      if (id != '') {
        this.fetchBarangById(id)
        this.gid = id
      } else this.gid = ''
    },
    showConfirmDelete(id) {
      this.confirmDelete = true
      this.gid = id
    },
    simpan() {
      const namaSelector = this.$refs.nama
      const nomorSelector = this.$refs.nomor
      const kategoriSelector = this.$refs.kategori
      const lokasiSelector = this.$refs.lokasi

      namaSelector.validate()
      nomorSelector.validate()
      kategoriSelector.validate()
      lokasiSelector.validate()

      if (namaSelector.hasError || 
        nomorSelector.hasError || 
        kategoriSelector.hasError || 
        lokasiSelector.hasError) console.log("Gagal simpan data barang")
      else {
        this.addBarang(this.gid)
        this.clearForm()
      }
    },
    clearForm() {
      this.form.nama = ''
      this.form.nomor = ''
      this.form.kategori = ''
      this.showDialog = false
    },
    async addBarang(id) {
      this.$q.loadingBar.start()
      if (id == '') id = uid()

      try {
        const doc = await this.$firebase.firestore().collection('barang').doc(id).set({
          nama: this.form.nama,
          nomor: this.form.nomor,
          kategori: this.form.kategori,
          pemilik: this.user,
          lokasi: this.form.lokasi,
          foto: this.form.foto,
          dibuat: Date.now()
        })

        this.$q.notify({
          message: 'Data barang berhasil disimpan',
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
    async fetchBarang(lokasi='') {
      this.$q.loadingBar.start()
      const barangRef = this.$firebase.firestore().collection('barang').orderBy('dibuat', 'desc')
      let kondisi = lokasi != '' ? 
        barangRef.where("lokasi", "==", lokasi) :
        barangRef

      try {
        await kondisi.onSnapshot(ref => {
          this.barang = []
          ref.forEach(doc => {
            this.barang.push({id: doc.id, data: doc.data()})
          })
        })
        this.$q.loadingBar.stop()
      } catch (err) {
        console.log(err.message)
        this.$q.loadingBar.stop()
      }
    },
    async fetchBarangById(id) {
      try {
        const doc = await this.$firebase.firestore().collection('barang').doc(id).get()
        const barang = doc.data()

        this.form.nama = barang.nama
        this.form.nomor = barang.nomor
        this.form.kategori = barang.kategori
        this.form.lokasi = barang.lokasi
        this.form.foto = barang.foto
      } catch (err) {
        console.log(err.message)
      }
    },
    async deleteBarang() {
      try {
        this.confirmDelete = false
        await this.$firebase.firestore().collection('barang').doc(this.gid).delete()
      } catch (error) {
        console.log(error.message)
      }
    },
    onItemClick(value) {
      this.fetchBarang(value)
    }
  }
}
</script>