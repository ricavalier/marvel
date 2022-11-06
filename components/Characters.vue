<template>
  <v-row>
    <v-col v-if="$store.state.list.charList.length > 0" cols="12" class="items-charactes">
      <figure
        v-for="item, idx in $store.state.list.charList"
        :key="idx"
        :style="`background-image: url(${item.thumbnail.path}.${item.thumbnail.extension})`"
      >
        <figcaption>
          <v-btn
            class="ma-1"
            icon
            small
            color="red"
            @click="addFavorite(item)"
          >
            <v-icon dark>
              {{ item.favorite ? 'mdi-star' : 'mdi-star-outline' }}
            </v-icon>
          </v-btn>
          <v-btn
            class="ma-1"
            icon
            small
            color="red"
            @click="getDetails(item.id)"
          >
            <v-icon dark>
              mdi-dock-window
            </v-icon>
          </v-btn>
          <p> {{ item.name }} </p>
        </figcaption>
      </figure>
      <modal v-model="modal" :details="charDetail" :load="loading" @close="getClose" />
    </v-col>
    <v-col v-else cols="12" class="flex justify-center">
      <p>Not found items</p>
    </v-col>
  </v-row>
</template>
<script>
import MD5 from 'crypto-js/md5'
import Modal from '@/components/Modal'
export default {
  name: 'ItemCharacters',
  components: {
    modal: Modal
  },
  data: () => ({
    modal: false,
    loading: false,
    charDetail: ''
  }),
  methods: {
    addFavorite (i) {
      const item = i
      const [...listFavorites] = this.$store.state.favorites.favList
      const [...listCharacters] = this.$store.state.list.charList
      const chkFav = listFavorites.find((obj) => {
        return obj.id === item.id
      })
      if (!chkFav) {
        item.favorite = true
        listFavorites.push(item)
        this.$store.commit('favorites/STORE_FAV_LIST', listFavorites)
        const list = listCharacters
        list.filter((char) => {
          if (char.id === item.id) {
            char.favorite = true
          }
          return char
        })
        this.$store.commit('list/STORE_CHAR_LIST', list)
      } else {
        const list = listCharacters
        if (JSON.stringify(listCharacters) !== JSON.stringify(listFavorites)) {
          list.filter((char) => {
            if (char.id === item.id) {
              char.favorite = false
            }
            return char
          })
        }
        const listFav = listFavorites.filter((fav) => {
          return fav.id !== item.id
        })
        this.$store.commit('favorites/STORE_FAV_LIST', listFav)
        this.$store.commit('list/STORE_CHAR_LIST', list)
      }
      this.$emit('reload')
    },
    async getDetails (id) {
      this.modal = true
      this.loading = true
      const timestamp = this.$store.state.access.timestamp
      const pub = this.$store.state.access.pub
      const priv = this.$store.state.access.priv
      const url = `https://gateway.marvel.com/v1/public/characters/${id}`
      const params = {
        ts: timestamp,
        apikey: pub,
        hash: MD5(`${timestamp}${priv}${pub}`).toString()
      }
      await this.$axios.get(url, { params })
        .then((res) => {
          this.charDetail = JSON.stringify(res.data.data.results[0])
          this.loading = false
        })
        .catch(() => {
          this.charDetail = ''
          this.loading = false
        })
    },
    getClose () {
      this.modal = false
      this.charDetail = ''
    }
  }
}
</script>
<style scoped lang="scss">
  $break-xl: 1536px;
  $break-lg: 1200px;
  $break-md: 900px;
  $break-sm: 600px;

  .items-charactes {
    text-align: center;

    figure {
      position: relative;
      display: inline-block;
      width: 100%;
      max-width: calc((100% / 5) - 30px);
      height: 40vh;
      margin: 10px;
      overflow: hidden;
      vertical-align: top;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      transition: .5s;
      backdrop-filter: grayscale(100%);

      @media screen and (max-width: $break-lg) {
        max-width: calc((100% / 3) - 30px);
      }
      @media screen and (max-width: $break-md) {
        max-width: calc((100% / 2) - 30px);
        height: 60vh;
      }
      @media screen and (max-width: $break-sm) {
        max-width: calc((100% / 1) - 30px);
        height: 80vh;
      }

      figcaption {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        text-align: right;
        transition: .5s;

        p {
          position: absolute;
          display: block;
          width: 100%;
          height: auto;
          left: 0;
          bottom: 5%;
          margin-bottom: 0;
          background-color: rgba(255,255,255,.75);
          color: black;
          font-size: 1.5em;
          text-align: center;
          transition: .5s;
        }
      }

      .v-btn {
        opacity: 0;
        transition: .5s;
      }
      &:hover {
        .v-btn {
          opacity: 1;
          transition: .5s;
        }

        figcaption {
          backdrop-filter: grayscale(100%);
          transition: .5s;

          p {
            background-color: rgba(255,0,0,.75);
            color: #FFF;
            transition: .5s;
          }
        }
      }
    }
  }
  .loading {
    position: relative;
    display: flex;
    width: 100%;
    height: 60vh;
    justify-content: center;
    align-items: center;
  }
  .btn-position {
    position: absolute;
    right: 0;
    top: 0;
  }
  .detail {
    &-img {
      width: 100%;
      height: auto;
    }
  }
  a {
    text-decoration: none;
    text-transform: uppercase;
  }
</style>
