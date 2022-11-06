<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card class="container">
        <v-card-title class="headline justify-center">
          Characters List
        </v-card-title>
        <v-card-text>
          <filterTable @filters="filtersTable" @limit="limitTable" />
          <hr class="my-3">
          <characters v-if="!loading" :list="listCharacters" />
          <div v-else class="loading justify-center">
            <v-progress-circular
              indeterminate
              color="red"
              size="64"
            />
          </div>
          <hr class="my-3">
          <span>Page: {{ page }} / Page items: {{ pagination.limit }}</span>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-pagination
            v-model="page"
            class="mx-4"
            color="red"
            :length="pagination.total"
            light
          />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import MD5 from 'crypto-js/md5'
import FilterTable from '@/components/FilterTable'
import Characters from '@/components/Characters'
export default {
  name: 'IndexPage',
  components: {
    filterTable: FilterTable,
    characters: Characters
  },
  data () {
    return {
      listCharacters: [],
      listApi: [],
      filters: {
        name: null
      },
      pagination: {
        limit: 20,
        offset: 0,
        total: 1
      },
      page: 1,
      favList: [],
      loading: true
    }
  },
  watch: {
    page: {
      handler (p) {
        this.pagination.offset = (p - 1) * this.pagination.limit
        this.getListCharacters()
      },
      deep: true
    }
  },
  mounted () {
    this.getListCharacters()
  },
  methods: {
    async getListCharacters () {
      this.loading = true
      const timestamp = this.$store.state.access.timestamp
      const pub = this.$store.state.access.pub
      const priv = this.$store.state.access.priv
      const url = 'https://gateway.marvel.com/v1/public/characters'
      const params = {
        ts: timestamp,
        apikey: pub,
        hash: MD5(`${timestamp}${priv}${pub}`).toString(),
        limit: this.pagination.limit,
        offset: this.pagination.offset,
        nameStartsWith: this.filters.name || null
      }
      await this.$axios.get(url, { params })
        .then((res) => {
          this.pagination.total = parseInt(res.data.data.total / this.pagination.limit) + 1
          this.listCharacters = res.data.data.results
          const [...list] = res.data.data.results
          const favList = this.$store.state.favorites.favList
          list.forEach((char) => {
            favList.filter((fav) => {
              if (char.id === fav.id) {
                char.favorite = true
              }
              return fav
            })
            return char
          })
          this.$store.commit('list/STORE_CHAR_LIST', list)
          this.loading = false
        })
        .catch(() => {
          this.listCharacters = []
          this.loading = false
        })
    },
    reloadListCharacters () {
      const favList = this.$store.state.favorites.favList
      this.listCharacters = this.listCharacters.forEach((char) => {
        const stt = favList.find((fav) => {
          return !!(char.id === fav.id)
        })
        char.favorite = !!stt
      })
    },
    filtersTable (filter) {
      this.filters = filter
      this.getListCharacters()
      this.page = 1
    },
    limitTable (limit) {
      this.pagination.limit = limit
      this.getListCharacters()
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
