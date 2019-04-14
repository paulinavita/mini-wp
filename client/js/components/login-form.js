Vue.component('login-form', {
    data() {
        return {
            emailLogin: '',
            passwordLogin: "",
        }
    },
    props: ['loginPage', 'isLogin', 'on-sign-in'],
    methods: {
        
        login() {
            Axios.post(`/signin/local`, {
                    email: this.emailLogin,
                    password: this.passwordLogin
                })
                .then(response => {
                    let {
                        data
                    } = response
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('userId', data._id)
                    localStorage.setItem('username', data.username)

                    Swal.fire(
                        'Good day!',
                        'success'
                    )
                    // this.isLogin = true
                    this.$emit('sign-in')
                })
                .catch(function (err, textStatus) {
                    swal({
                        text: 'Please check your credentials',
                        icon: "warning",
                        button: "Understood",
                    });
                })
        },
    },
    template: ` <div class = "container">
    <div class="col s12">
        <div class="container">
            <h4 class="text center"> Write yourself some stories </h4>
            <h6 class="text center">In case the Google Sign-in Button haven't appeared, please refresh few times.</h6>
            <div class="row">
                <form class="col s12">
                        <div class="row">
                                <div class="input-field col s12">
                                    <input v-model="emailLogin" type="email" class="validate">
                                    <label for="email">Email</label>
                                </div>
                            </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input v-model="passwordLogin" type="password" class="validate">
                            <label for="password">Password</label>
                        </div>
                    </div>
                    <div class="center" id="login-button">
                        <button @click.prevent="login" class="btn waves-effect waves-light black"
                            type="submit" name="action">Login
                            <i class="material-icons right">send</i>
                        </button>
                        </div>
                        </form>
                        <div>
                    </div>
                 </div>            
            </div>
        </div>
    </div>`
})