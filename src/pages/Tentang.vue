<template>
  <q-page padding>
    <q-card>
      <q-bar>
        <q-icon name="eva-bulb" />
        <div>Tentang Aplikasi Siswa SMK</div>
      </q-bar>

      <q-card-section>
        Aplikasi siswa SMK ini dikembangkan menggunakan <i>Quasar Framework</i> dengan lisensi <b>Open Source</b>.
        Dibuat dengan sepenuh <q-icon name="eva-heart" color="red" /> oleh coder.
      </q-card-section>

      <q-card-section>
        <q-btn 
          push 
          rounded 
          color="primary" 
          label="KEMBALI" 
          size="md"
          @click="$router.push('/')"
          icon="eva-undo-outline" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PageTentang',
}
</script>

<style>
</style>
