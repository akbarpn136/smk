<template>
  <q-page padding>
    <q-list bordered separator class="rounded-borders">
      
      <div class="w3-bar w3-black">
      <q-btn class="w3-bar-item w3-button" @click="openLayanan('Aerodinamika')">Aerodinamika</q-btn>
      <q-btn class="w3-bar-item w3-button" @click="openLayanan('Aeroelastika')">Aeroelastika</q-btn>
      <q-btn class="w3-bar-item w3-button" @click="openLayanan('Aeroakustika')">Aeroakustika</q-btn>
      </div>

      <div class="q-pa-md">
      <div class="q-gutter-y-md column">
      <q-toolbar class="bg-grey-3 shadow-2 rounded-borders">
        <q-btn-dropdown outline color="grey" label="Kategori" class="q-ml-sm">
            <q-item
              clickable 
              v-close-popup 
              @click="onItemClick(kat)" 
              v-for="kat in daftarKategori" 
              :key="kat">
              <q-item-section>
                <q-item-label>{{kat}}</q-item-label>
              </q-item-section>
            </q-item>
        </q-btn-dropdown>

        <q-space />

        <q-item-label header>
            <q-list>
                  Tambah Aset
                <q-btn 
                  flat
                  round
                  dense
                  @click="showForm()"
                  icon="eva-plus-circle-outline"
                />
            </q-list>
        </q-item-label>

        <q-input
            v-model="cari"
            filled
            placeholder="Search"
            @keyup.enter="onSearchClick(cari)"
          >
            <template v-slot:append>
              <q-icon 
              clickable
              name="search" 
              @click="onSearchClick(cari)"
              />
            </template>
        </q-input>


      </q-toolbar>
      </div>
      </div>

      <q-item v-for="brg in barang" :key="brg.id">
        <q-item-section avatar middle>
          <q-avatar size="190px" >
            <img :src="brg.data.foto" v-if="brg.data.foto">
            <img src="http://aerobox.bbta3.bppt.go.id/index.php/s/xa2k8Iink4LwxuH/download" v-else>
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label v-if="brg.data.nama !== '-'">
            <b>{{brg.data.nama}}</b>
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label v-if="brg.data.nomor !== '-'">
            Nomor Serial:
            {{brg.data.nomor}}
          </q-item-label>
          <q-item-label v-if="brg.data.type !== '-'">
            Type:
            {{brg.data.type}}
          </q-item-label>
          <q-item-label v-if="brg.data.merk !== '-'">
            Merk:
            {{brg.data.merk}}
          </q-item-label>
          
        </q-item-section>

        <q-item-section>
          <q-item-label v-if="brg.data.kategori !== '-'">
            Kategori:
            {{brg.data.kategori}}
          </q-item-label>
          <q-item-label v-if="brg.data.bmn !== '-'">
            Nomor BMN:
            {{brg.data.bmn}}
          </q-item-label>
          <q-item-label v-if="brg.data.tglbeli !== '-'">
            Tanggal Pembelian:
            {{brg.data.tglbeli}}
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label v-if="brg.data.lokasi !== '-'">
            Lokasi:
            {{brg.data.lokasi}}
          </q-item-label>
          <q-item-label v-if="brg.data.layanan !== '-'">
            Bidang:
            {{brg.data.layanan}}
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label v-if="brg.data.tglkalibrasi !== '-'">
            Terkalibrasi:
            {{brg.data.tglkalibrasi}}
          </q-item-label>
          <q-item-label v-if="brg.data.tglkaliblanjut !== '-'">
            Sampai:
            {{brg.data.tglkaliblanjut}}
          </q-item-label>
          <q-item-label v-if="brg.data.keterangan !== '-'">
            Keterangan:
            {{brg.data.keterangan}}
          </q-item-label>
        </q-item-section>

        <q-item-section >
          <q-btn 
          v-if="brg.data.link !== '-'"
          color="blue-5" class="link" @click.native="onClick(brg.data.link)">
            Baca Dokumen
          </q-btn>
          <br>
          <q-btn 
          v-if="brg.data.log !== '-'"
          color="blue-5" class="link" @click.native="onClick(brg.data.log)">
            Log Peralatan
          </q-btn>
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
          <div>Tambah Aset Laboratorium</div>

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
            hint=""/>
        </q-card-section>

        <q-card-section>
          <q-input outlined
            ref="type"
            v-model="form.type"
            label="Type"
            placeholder="Type Barang"
            hint=""/>
        </q-card-section>

        <q-card-section>
          <q-input outlined
            ref="merk"
            v-model="form.merk"
            label="Merk"
            placeholder="Merk Barang"
            hint=""/>
        </q-card-section>

        <q-card-section>
          <q-select outlined 
            ref="kategori"
            v-model="form.kategori" 
            :options="daftarKategori" 
            label="Kategori"
            :rules="[val => !!val || 'Kategori diperlukan']" />
        </q-card-section>

        <q-card-section>
          <q-input outlined
            ref="bmn"
            v-model="form.bmn"
            label="Nomor BMN"
            placeholder="Nomor BMN Barang"
            hint=""/>
        </q-card-section>

        <q-card-section >
          <q-input outlined
            ref="tglbeli"
            v-model="form.tglbeli"
            label="Tanggal Pembelian"
            placeholder="Format DD/MM/YY"
            hint=""
            >
            <template v-slot:append>
              <q-icon name="event" />
            </template>
          </q-input>
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
          <q-select outlined 
            ref="layanan"
            v-model="form.layanan" 
            :options="daftarLayanan" 
            label="Bidang"
            :rules="[val => !!val || 'Bidang diperlukan']" />
        </q-card-section>

        <q-card-section >
          <q-input outlined
            ref="tglkalibrasi"
            v-model="form.tglkalibrasi"
            label="Tanggal Kalibrasi"
            placeholder="Format DD/MM/YY"
            hint=""
            >
            <template v-slot:append>
              <q-icon name="event" />
            </template>
          </q-input>
        </q-card-section>

        <q-card-section >
          <q-input outlined
            ref="tglkaliblanjut"
            v-model="form.tglkaliblanjut"
            label="Tanggal Kalibrasi Selanjutnya"
            placeholder="Format DD/MM/YY"
            hint=""
            >
            <template v-slot:append>
              <q-icon name="event" />
            </template>
          </q-input>
        </q-card-section>

        <q-card-section >
          <q-input outlined
            ref="keterangan"
            v-model="form.keterangan"
            label="Keterangan"
            placeholder="Keterangan Barang"
            hint=""/>
        </q-card-section>

        <q-card-section>
          <q-input outlined
            ref="link"
            v-model="form.link"
            label="Link Dokumen"
            placeholder="Link Dokumen Barang"
            hint="" />
        </q-card-section>

          <q-card-section>
          <q-input outlined
            ref="log"
            v-model="form.log"
            label="Log Peralatan"
            placeholder="Link Log Peralatan"
            hint="" />
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
import { openURL } from 'quasar'

export default {
  name: 'PageIndex',
  data() {
    return {
      cari: '',
      showDialog: false,
      confirmDelete: false,
      daftarKategori: ['', 'Alat Ukur', 'Sensor', 'Technical Document', 'Fasilitas Uji','Tools', 'Lain-lain'],
      daftarLokasi: ['', 'VIENTA', 'LSWT', 'Hemi Anechoic','LIWET','ILST'],
      daftarLayanan: ['', 'Aerodinamika', 'Aeroelastika', 'Aeroakustika'],
      form: {
        nama: '',
        nomor: '',
        type: '',
        merk: '',
        kategori: '',
        bmn: '',
        tglbeli: '',
        lokasi: '',
        layanan: '',
        tglkalibrasi: '',
        tglkaliblanjut: '',
        keterangan: '',
        link: '',
        log: '',
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
    this.fetchLayanan()
    this.fetchNama()
  },
  methods: {
    openLayanan(layanan) {
      this.fetchLayanan(layanan)
    },
    onClick: function (link) {
      openURL(link)
    },
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
      const typeSelector = this.$refs.type
      const merkSelector = this.$refs.merk
      const kategoriSelector = this.$refs.kategori
      const bmnSelector = this.$refs.bmn
      const tglbeliSelector = this.$refs.tglbeli
      const lokasiSelector = this.$refs.lokasi
      const layananSelector = this.$refs.layanan
      const tglkalibrasiSelector = this.$refs.tglkalibrasi
      const tglkaliblanjutSelector = this.$refs.tglkaliblanjut
      const keteranganSelector = this.$refs.keterangan
      const linkSelector = this.$refs.link
      const logSelector = this.$refs.log

      namaSelector.validate()
      nomorSelector.validate()
      typeSelector.validate()
      merkSelector.validate()
      kategoriSelector.validate()
      bmnSelector.validate()
      tglbeliSelector.validate()
      lokasiSelector.validate()
      layananSelector.validate()
      tglkalibrasiSelector.validate()
      tglkaliblanjutSelector.validate()
      keteranganSelector.validate()
      linkSelector.validate()
      logSelector.validate()

      if (namaSelector.hasError || 
        nomorSelector.hasError || 
        typeSelector.hasError ||
        merkSelector.hasError ||
        kategoriSelector.hasError ||
        bmnSelector.hasError ||
        tglbeliSelector.hasError ||
        lokasiSelector.hasError ||
        layananSelector.hasError ||
        tglkalibrasiSelector.hasError ||
        tglkaliblanjutSelector.hasError ||
        keteranganSelector.hasError || 
        logSelector.hasError ||
        linkSelector.hasError) console.log("Gagal simpan data barang")
      else {
        this.addBarang(this.gid)
        this.clearForm()
      }
    },
    clearForm() {
      this.form.nama = ''
      this.form.nomor = ''
      this.form.type = ''
      this.form.merk = ''
      this.form.kategori = ''
      this.form.bmn = ''
      this.form.tglbeli = ''
      this.form.lokasi = ''
      this.form.layanan = ''
      this.form.tglkalibrasi = ''
      this.form.tglkaliblanjut = ''
      this.form.keterangan = ''
      this.form.link = ''
      this.form.log = ''
      this.showDialog = false
    },
    async addBarang(id) {
      this.$q.loadingBar.start()
      if (id == '') id = uid()

      try {
        const doc = await this.$firebase.firestore().collection('barang').doc(id).set({
          nama: this.form.nama,
          nomor: this.form.nomor,
          type: this.form.type,
          merk: this.form.merk,
          kategori: this.form.kategori,
          bmn: this.form.bmn,
          tglbeli: this.form.tglbeli,
          pemilik: this.user,
          lokasi: this.form.lokasi,
          layanan: this.form.layanan,
          tglkalibrasi: this.form.tglkalibrasi,
          tglkaliblanjut: this.form.tglkaliblanjut,
          keterangan: this.form.keterangan,
          link: this.form.link,
          log: this.form.log,
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
    async fetchBarang(kategori='') {
      this.$q.loadingBar.start()
      const barangRef = this.$firebase.firestore().collection('barang').orderBy('dibuat', 'desc')
      let kondisi = kategori != '' ? 
        barangRef.where("kategori", "==", kategori) :
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
    
    async fetchNama(nama='') {
      this.$q.loadingBar.start()
      const barangRef = this.$firebase.firestore().collection('barang').orderBy('nama', 'asc')
      let kondisi = nama != '' ? 
        barangRef.where("nama", "==", nama) :
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
    async fetchLayanan(layanan='') {
      this.$q.loadingBar.start()
      const barangRef = this.$firebase.firestore().collection('barang').orderBy('nama', 'asc')
      let kondisi = layanan != '' ? 
        barangRef.where("layanan", "==", layanan) :
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

        this.form.nama = barang.nama ? barang.nama : ""
        this.form.nomor = barang.nomor ? barang.nomor : ""
        this.form.type = barang.type ? barang.type : ""
        this.form.merk = barang.merk ? barang.merk : ""
        this.form.kategori = barang.kategori ? barang.kategori : ""
        this.form.bmn = barang.bmn ? barang.bmn : ""
        this.form.tglbeli = barang.tglbeli ? barang.tglbeli : ""
        this.form.lokasi = barang.lokasi ? barang.lokasi : ""
        this.form.layanan = barang.layanan ? barang.layanan : ""
        this.form.tglkalibrasi = barang.tglkalibrasi ? barang.tglkalibrasi : ""
        this.form.tglkaliblanjut = barang.tglkaliblanjut ? barang.tglkaliblanjut : ""
        this.form.keterangan = barang.keterangan ? barang.keterangan : ""
        this.form.link = barang.link ? barang.link : ""
        this.form.log = barang.log ? barang.log : ""
        this.form.foto = barang.foto ? barang.foto : ""
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
    },
    onSearchClick(value) {
      this.fetchNama(value)
    }
  }
}
</script>