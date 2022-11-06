<template>
  <v-dialog
    v-model="modal"
    scrollable
    persistent
    width="70vw"
    height="90vh"
  >
    <v-card v-if="!loading">
      <v-card-title v-if="charDetail" class="text-h5 red">
        {{ charDetail.name || 'Detalhes do Personagem' }}
        <v-btn
          class="btn-position"
          icon
          color="white"
          @click="getClose()"
        >
          <v-icon dark>
            mdi-close-thick
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text v-if="charDetail">
        <v-row class="pt-5">
          <v-col cols="12" md="4" class="d-flex justify-center align-start">
            <img
              v-if="charDetail.thumbnail"
              :src="`${charDetail.thumbnail.path}.${charDetail.thumbnail.extension}`"
              class="detail-img"
            >
            </img>
          </v-col>
          <v-col cols="12" sm="8">
            <p v-if="charDetail.modified">
              <strong class="red--text">Update at:</strong>
              {{ $date(charDetail.modified) }}
            </p>
            <p v-if="charDetail.description">
              <strong class="red--text">Description:</strong>
              {{ charDetail.description }}
            </p>
            <p v-if="charDetail.comics">
              <strong class="red--text">Comics:</strong>
              <ul v-if="charDetail.comics.items.length > 0">
                <li v-for="item, idx in charDetail.comics.items" :key="idx">
                  {{ item.name }}
                </li>
              </ul>
              <span v-else>No results</span>
            </p>
            <p v-if="charDetail.events">
              <strong class="red--text">Events:</strong>
              <ul v-if="charDetail.events.items.length > 0">
                <li v-for="item, idx in charDetail.events.items" :key="idx">
                  {{ item.name }}
                </li>
              </ul>
              <span v-else>No results</span>
            </p>
            <p v-if="charDetail.series">
              <strong class="red--text">Series:</strong>
              <ul v-if="charDetail.series.items.length > 0">
                <li v-for="item, idx in charDetail.series.items" :key="idx">
                  {{ item.name }}
                </li>
              </ul>
              <span v-else>No results</span>
            </p>
            <p v-if="charDetail.stories">
              <strong class="red--text">Stories:</strong>
              <ul v-if="charDetail.stories.items.length > 0">
                <li v-for="item, idx in charDetail.stories.items" :key="idx">
                  {{ item.name }}
                </li>
              </ul>
              <span v-else>No results</span>
            </p>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text v-else>
        <v-row>
          <v-col cols="12">
            Not found data!
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />
      <v-card-actions v-if="charDetail">
        <div v-for="item, idx in charDetail.urls" :key="idx">
          <a class="red--text ma-3" :href="item.url" target="_blank">{{ item.type }}</a>
        </div>
        <v-spacer />
        <v-btn
          color="red"
          text
          @click="getClose()"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-else>
      <v-card-text>
        <div class="loading justify-center">
          <v-progress-circular
            indeterminate
            color="red"
            size="64"
          />
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ModalDetails',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    load: {
      type: Boolean,
      default: false
    },
    details: {
      type: String,
      default: ''
    }
  },
  computed: {
    charDetail: {
      get () {
        const item = this.details ? JSON.parse(this.details) : {}
        return item
      }
    },
    modal: {
      get () {
        return this.value
      }
    },
    loading: {
      get () {
        return this.load
      }
    }
  },
  methods: {
    getClose () {
      this.$emit('close')
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
  p {
    strong {
      display: block;
    }
  }
</style>
