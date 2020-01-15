<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="lite-navbar">
      <b-container>
        <b-navbar-toggle target="nav-collapse" />
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav v-if="$auth.loggedIn">
            <b-nav-item to="/" active-class="active" exact>
              Dashboard
            </b-nav-item>
            <b-nav-item :active="subscribersActive" to="/subscribers" active-class="active">
              Subscribers
            </b-nav-item>
            <b-nav-item to="/tokens" active-class="active">
              Developer settings
            </b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <template v-if="!$auth.loggedIn">
              <b-nav-item to="/auth/login" active-class="active">
                Login
              </b-nav-item>
              <b-nav-item to="/auth/register" active-class="active">
                Sign Up
              </b-nav-item>
            </template>
            <b-nav-item-dropdown v-else :text="$auth.user.name" right>
              <b-dropdown-item @click="logout">
                Sign Out
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'LiteNavbar',
  computed: {
    subscribersActive () {
      const match = ['/subscribers', '/fields'].filter(el => this.$route.path.startsWith(el))
      return !!match.length
    }
  },
  methods: {
    logout () {
      this.$auth.logout().then(() => {
        this.$toast.success('You are not logged out...').goAway(5000)
        // this.$router.push('/')
      })
    }
  }
}
</script>
