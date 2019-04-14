var Axios = axios.create({
  baseURL: 'http://localhost:3000'
});

const app = new Vue({
  el: '#app',
  data: {
    username: '',
    currentArticle: '',
    currentPage: 'homepage',
    isLogin: false,
    articleTitle: "",
    articleBody: "",
    searchBox: "",
    viewedArticleTitle: '',
    viewedArticleBody: '',
    posts: [],
    imageurl : null,
    image : null,
    loc : '',
    quotes : ''

  },
  created() {
    this.username = localStorage.getItem('username')
    if (localStorage.getItem('token')) {
      this.currentPage = 'homepage'
      this.isLogin = true
      this.getLocation()
      this.getQuotes()
    }

    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems);
      });

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
  mounted() {

  },
  methods: {
    verify() {
      let token = localStorage.getItem('token')
      Axios.post(`/users/verify`, {
          token
        }, {
          headers: {
            'token': localStorage.getItem('token')
          }
        })
        .then(({ data}) => {
          this.isLogin = true
        })
        .catch((err) => {
          console.log(err)
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
    getImage(event) {
      this.image = event.target.files[0]
      console.log('disini', this.image, '//////////');
      
    },
    showRegister() {
      this.currentPage = 'registrationPage'
    },
    showLogin() {
      this.currentPage = "loginPage"
    },
    showHome() {
      this.currentPage = 'homepage'
    },
    userSignIn() {
      console.log('masuk sini gak ya??')
      this.showUserArticle()
      this.isLogin = true
    },
    showUserArticle() {
      this.currentPage = 'userArticlesPage'
      console.log('masuk')
      Axios.get(`/articles`, {
          headers: {
            'token': localStorage.getItem('token')
          }
        })
        .then((response) => {
          let { data } = response
          this.posts = data
        })
        .catch(function (err, textStatus) {
          console.log(err.response, '=====');
          swal({
            text: 'Something is wrong',
            icon: "warning",
            button: "Understood",
          });
        })

    },
    showAllUserArticles() {
      this.currentPage = 'allArticlesPage'
      Axios.get(`/articles/all`)
        .then((response) => {
          let { data } = response
          console.log(data, '///')
          this.posts = data
        })
        .catch((err, textStatus) => {
          console.log(err)
          swal({
            text: 'Something is wrong',
            icon: "warning",
            button: "Understood",
          })
        })
    },
    showWritePage() {
      console.log('masuk di wysiyg');
      this.articleTitle = ''
      this.articleBody = ''
      this.currentPage = 'writePage'
    },
    showEditPage() {
      this.currentPage = 'editPage'
      this.userArticlesPage = false
    },
    removeArticle(data) {
      this.showUserArticle()
      return this.posts.filter(e => {return e._id !== data._id})
    },
    signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
      console.log('User signed out.');
     });
      this.isLogin = false
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      this.currentPage = "homepage"
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
      this.showHome()
    },
    getPost(id) {
      Axios.get(`/articles/${id}`, {
          headers: {
            'token': localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          console.log(data, 'ini loh data')
          this.viewedArticleTitle = data.title
          this.viewedArticleBody = data.content
          this.imageurl = data.image
        })
        .catch(err => {
          swal({
            text: 'Please check your credentials',
            icon: "warning",
            button: "Understood",
          });
        })
    },
    postArticle() {
      let formData = new FormData()
      formData.append('title', this.articleTitle)
      formData.append('content', this.articleBody)
      formData.append('createdAt', new Date())
      formData.append('image', this.image)
      console.log(formData, 'ini form data')
      Axios.post(`/articles`, formData, {
          headers: {
            'token': localStorage.getItem('token'),
            "Content-Type": "multipart/form-data",
          }
        })
        .then(response => {
          let { data } = response
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
    getEditPost(id) {
      console.log(id, 'ini drmana');
      this.showEditPage()
      
      console.log('hello mau edit');
      Axios.get(`/articles/${id}`, {
          headers: {
            'token': localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          this.showEditPage()
          this.currentArticle = id
          this.articleTitle = data.title
          this.articleBody = data.content
          this.imageurl = data.image

        })
        .catch(err => {
          swal({
            text: 'Something is wrong',
            icon: "warning",
            button: "Understood",
          })
        })
    },
    patchArticle(id) {
      let formData = new FormData()
      formData.append('title', this.articleTitle)
      formData.append('content', this.articleBody)
      formData.append('createdAt', new Date())
      formData.append('image', this.image)
      console.log(formData, 'ini form data')
  
      Axios.patch(`/articles/${this.currentArticle}`,formData, {
        headers: {
          'token': localStorage.getItem('token'),
          "Content-Type": "multipart/form-data",
          }
        })
        .then(response => {
          Swal.fire(
            'Entry Updated!',
            'Dashboard updated',
            'success'
          )
          this.showUserArticle()
          this.currentPage = 'userArticlesPage'
        })
        .catch(err => {
          // console.log((err, 'apa error patchnya'));  
          swal({
            text: 'Cannot have any empty fields',
            icon: "warning",
            button: "Understood",
          })
        })
      },
      getLocation() {
        Axios.get(`users/location`, {
          headers : { 'token': localStorage.getItem('token') }
        })
        .then(({data}) => {
          this.loc = `Writing from +${data.country_code} || ${data.name}`
          console.log(data);
        })
        .catch(err => {
          swal({
            text: 'Oops, something is wrong.',
            icon: "warning",
            button: "Understood",
          })
        })
      },
      getQuotes() {
        Axios.get(`users/randomquotes`, {
          headers : { 'token': localStorage.getItem('token') }
        })
        .then(({data}) => {
          console.log(data[0].content, 'isinya apa dpt ga');
          
          this.quotes = data[0].content
        })
        .catch(err => {
          swal({
            text: 'Oops, something is wrong.',
            icon: "warning",
            button: "Understood",
          })
        })
      }
    }
});


let serverURL = 'http://localhost:3000'

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  var id_token = googleUser.getAuthResponse().id_token;

  Axios.post(`${serverURL}/signin/google`, {
      id_token
    })
    .then((response) => {
      let { data } = response
      console.log(response, '///')
      localStorage.setItem('token', data.token)
      localStorage.setItem('userId', data.id)
      localStorage.setItem('username', data.username)

      app.isLogin = true
      app.currentPage = 'homepage'

    })
    .catch((err, textStatus) => {
      swal({
        text: 'Something is wrong',
        icon: "warning",
        button: "Understood",
      });
    })
}