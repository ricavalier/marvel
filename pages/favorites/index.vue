<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card class="container">
        <v-card-title class="headline justify-center">
          {{ title }}
        </v-card-title>
        <v-card-text>
          <hr class="my-3">
          <characters v-if="!loading" @reload="getListCharacters" />
          <div v-else class="loading justify-center">
            <v-progress-circular
              indeterminate
              color="red"
              size="64"
            />
          </div>
          <hr class="my-3">
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Characters from '@/components/Characters'
export default {
  name: 'IndexPage',
  components: {
    characters: Characters
  },
  data () {
    return {
      title: 'Favorites List',
      loading: true
    }
  },
  mounted () {
    this.chkFavorites()
    this.getListCharacters()
  },
  methods: {
    chkFavorites () {
      const list = localStorage.getItem('x-fav')
      if (list) {
        this.$store.commit('favorites/STORE_FAV_LIST', JSON.parse(window.atob(list)))
      }
    },
    getListCharacters () {
      this.loading = true
      const list = this.$store.state.favorites.favList
      this.$store.commit('list/STORE_CHAR_LIST', list)
      this.loading = false
    }
  }
}
</script>
<style scoped lang="scss">
  .loading {
    position: relative;
    display: flex;
    width: 100%;
    height: 60vh;
    justify-content: center;
    align-items: center;
  }
</style>
