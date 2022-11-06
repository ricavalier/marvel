<template>
  <v-row>
    <v-col cols="12" class="pb-0">
      <h3>Filters:</h3>
    </v-col>
    <v-col cols="12" sm="6" class="pt-0">
      <v-text-field
        v-model="filters.name"
        label="Character Name"
        placeholder="Name starts with"
        color="red"
        prepend-inner-icon="mdi-magnify"
        @keyup="waitTyping()"
      />
    </v-col>
    <v-col cols="12" sm="6" class="pt-0">
      <v-select
        v-model="limit"
        :items="items"
        color="red"
        item-color="red"
        label="Page Items"
      />
    </v-col>
  </v-row>
</template>
<script>
import { Debounce } from '@/plugins/Debounce'
export default {
  name: 'FilterTable',
  data: () => ({
    filters: {
      name: null
    },
    limit: 20,
    items: [10, 20, 50, 100],
    debounce: null
  }),
  watch: {
    filters: {
      handler (f) {
        this.waitTyping()
      },
      deep: true
    },
    limit: {
      handler (f) {
        this.$emit('limit', this.limit)
      },
      deep: true
    }
  },
  methods: {
    waitTyping () {
      this.debounce = Debounce.execute(
        this.debounce,
        () => {
          this.$emit('filters', this.filters)
        },
        500
      )
    }
  }
}
</script>
