Vue.component('register-form', {
    data () {
        return {
            usernameRegister: '',
            passwordRegister: '',
            emailRegister: '',
        }
    },
    methods: {
        register() {
            Axios.post(`/users`, {
                username: this.usernameRegister,
                email: this.emailRegister,
                password: this.passwordRegister
              })
              .then(created => {
                Swal.fire(
                  'Registered',
                  'You may login now',
                  'success'
                )
                this.$emit('success-register')
              })
              .catch(err => {
                let errors = ''
                for (let keys in err.responseJSON.err.errors) {
                  if (err.responseJSON.err.errors[keys].message) {
                    errors += `${err.responseJSON.err.errors[keys].message} \n`
                  }
                }
                swal({
                  text: errors,
                  icon: "warning",
                  button: "Understood",
                })
              })
          },
      
    },
    props : ['registration'],
    template : `
    <div class="container">
            <div id='reg' class="container">
                <div class="col s12">
                    <div class="row">
                        <form class="col s12">
                            <div class="row">
                                <h4 class="text center">Start living life of a Writer</h4>
                                <div class="input-field col s12">
                                    <input v-model="usernameRegister" id="icon_prefix" type="text" class="validate">
                                    <label for="icon_prefix">Username</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <input v-model="passwordRegister" type="password" class="validate">
                                    <label for="password">Password</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <input v-model="emailRegister" type="email" class="validate">
                                    <label for="email">Email</label>
                                </div>
                            </div>
                        </form>
                        <div class="center" id="login-button">
                            <button v-on:click.prevent="register" class="btn waves-effect waves-light black"
                                type="submit" name="action">Register
                                <i class="material-icons right">send</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
})