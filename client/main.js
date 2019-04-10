var Axios = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000

});

const app = new Vue({
  el: '#app',
  data: {
    currentPage: 'homepage',
    isLogin: false,
    usernameRegister: '',
    passwordRegister: '',
    emailRegister: '',
    usernameLogin: '',
    passwordLogin: "",
    articleTitle: "",
    articleBody: "",
    searchBox: "",
    posts: []
  },
  created() {
    // if (localStorage.getItem('token')) {
    //   this.isLogin = true
    //   currentPage = 'hompage'
    // }

    if (localStorage.getItem('token')) {
      this.verify()
    }
  },
  computed: {
    filterByAnything() {
      return this.posts.filter(post => {
        return post.title.match(this.searchBox)
      })
    }
  },
  components: {
    wysiwyg: vueWysiwyg.default.component,
  },
  mounted () {

  },
  methods: {
    verify() {
      let token = localStorage.getItem('token')
      Axios.post(`/user/verify`, {
          token
        }, {
          headers: {
            'token': localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          this.isLogin = true
          localStorage.setItem('token', data.token)
          localStorage.setItem('userId', data._id)
          localStorage.setItem('username', data.username)
        })
        .catch((err) => {
          swal({
            text: 'Unauthorized Visit. Please re-login',
            icon: "warning",
            button: "Understood",
          })
          localStorage.removeItem('token')
          localStorage.removeItem('userId')
          localStorage.removeItem('username')
        })
    },
    register() {
      Axios.post(`/user`, {
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

          this.showLogin()
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

    login() {
      Axios.post(`/signin/local`, {
          username: this.usernameLogin,
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
          this.isLogin = true
          this.showRead()
        })
        .catch(function (err, textStatus) {
          swal({
            text: 'Please check your credentials',
            icon: "warning",
            button: "Understood",
          });
        })
    },

    signOut() {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('username')
      this.isLogin = false
      this.currentPage = 'homepage'
      let timerInterval;
      Swal.fire({
          title: 'Signed Out!',
          timer: 500,
          onBeforeOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
              Swal.getContent().querySelector('strong')
                .textContent = Swal.getTimerLeft()
            }, 100)
          },
          onClose: () => {
            clearInterval(timerInterval)
          }
        })
        .then((result) => {
          if (
            result.dismiss === Swal.DismissReason.timer
          ) {}
        })
    },

    postArticle() {
      Axios.post(`/article`, {
          title: this.articleTitle,
          content: this.articleBody,
          createdAt: new Date(),
        }, {
          headers: {
            'token': localStorage.getItem('token')
          }
        })
        .then(response => {
          let {
            data
          } = response
          this.posts.push(data)

          Swal.fire(
            'Entry Posted!',
            'View it on your dashboard',
            'success'
          )
          this.articleBody = ''
          this.articleTitle = ''
        })
        .catch(function (err, textStatus) {
          swal({
            text: 'Something is wrong',
            icon: "warning",
            button: "Understood",
          });
        })
    },

    deletePost(id) {
      console.log(id, ',dapet')
      Axios.delete(`/article/${id}`, {
          headers: {
            'token': localStorage.getItem('token')
          }
        })
        .then((response) => {
          Swal.fire(
            'Entry Deleted!',
            'Dashboard updated',
            'success'
          )
          this.showRead()
          this.currentPage = 'readPage'
        })
        .catch((err, textStatus) => {
          swal({
            text: 'Something is wrong',
            icon: "warning",
            button: "Understood",
          })
        })
    },

    showRead() {
      this.currentPage = 'readPage'
      Axios.get(`/article`, {
          headers: {
            'token': localStorage.getItem('token')
          }
        })
        .then((response) => {
          let {
            data
          } = response
          this.posts = data
          this.currentPage = 'readPage'
        })
        .catch(function (err, textStatus) {
          console.log(err.respose, '=====');
          swal({
            text: 'Something is wrong',
            icon: "warning",
            button: "Understood",
          });
        })
    },

    showWrite() {
      this.currentPage = 'writePage'
    },

    showLogin() {
      this.currentPage = "loginPage"
    },

    showRegistration() {
      this.currentPage = 'registrationPage'
    }
  }
});

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  var id_token = googleUser.getAuthResponse().id_token;

  Axios.post(`${baseURL}/signin/google`, {id_token})
  .then((response) => {
    localStorage.setItem('token', response.token)
    localStorage.setItem('userId', response.id)
    localStorage.setItem('username', response.username)
  
    app.showRead()

  })
  .catch((err, textStatus) => {
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
    });
  })

}