<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <img src="@/static/Marvel_Logo.svg" style="height: 50px;" class="mr-4"></img>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-main class="bg-marvel">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }} | <small> Ricardo Cavalier </small></span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-account-multiple',
          title: 'Characters',
          to: '/'
        },
        {
          icon: 'mdi-star',
          title: 'Favorites',
          to: '/favorites'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Characters Marvels'
    }
  },
  mounted () {
    this.chkFavorites()
  },
  methods: {
    chkFavorites () {
      const list = localStorage.getItem('x-fav')
      if (list) {
        this.$store.commit('favorites/STORE_FAV_LIST', JSON.parse(window.atob(list)))
      }
    }
  }
}
</script>
<style lang="scss">
  .bg-marvel {
    & > div {
      background-image: url('@/static/bgMarvel.jpg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      background-attachment: fixed
    }
  }
</style>
