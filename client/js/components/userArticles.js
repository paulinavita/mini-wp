
Vue.component('myArticle', {
    props : ['currentPage', 'searchBox', 'imageurl', 'posts', 'filter-by-anything', 'get-post', 'get-edit-post'],
    methods: { 
        deletePost(id) {
        console.log(id, ',dapet')
        Axios.delete(`/articles/${id}`, {
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
            M.toast({html: 'Deleted one article'})
            this.$emit('remove', response)
  
          })
          .catch((err, textStatus) => {
            swal({
              text: 'Something is wrong',
              icon: "warning",
              button: "Understood",
            })
          })
      },
    },
    template :
    `<div class="container">
    <div>
        <div v-if="posts.length == 0">
            <center>
                <h1>You haven't written anything yet ):</h1>
            </center>
        </div>
        <div class="row" v-else>
            <div data-aos="zoom-in-down" class="col s6" v-for="(post, index) in filterByAnything" :key="index">
                <div class="card horizontal">
                    <div class="card-image">
                        <img class="materialboxed" v-bind:src="post.image">
                    </div>
                    <div class="card-stacked">
                        <div class="card-content">
                            <u>
                                <h6>{{post.title}}</h6>
                            </u>
                            <div>
                            <div v-if="currentPage == 'allArticlesPage'">
                            <i><p><b>Author</b> :{{post.userId.username}}</p></i>
                            <p v-html="post.content">.....</p>
                            </div>
                            <div v-else-if="currentPage == 'userArticlesPage'">
                            <p v-html="post.content">.....</p>
                            </div>
                            </div>
                        </div>
                        <div class="card-action">
                            <p>Written At : {{post.createdAt.toString().split('T')[0]}}</p>
                            <a class="modal-trigger" @click.prevent="getPost(post._id)"
                                href="#view">View</a>
                                
                            <a v-if="currentPage == 'userArticlesPage'"
                                @click.prevent="deletePost(post._id)">Delete</a>
                            <a v-if="currentPage == 'userArticlesPage'"
                                @click.prevent="getEditPost(post._id)">Edit</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`
})