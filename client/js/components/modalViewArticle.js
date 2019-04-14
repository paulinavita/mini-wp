Vue.component('modal-view-article', {
    props : ['viewedArticleTitle', "viewedArticleBody", "imageurl"],
    template : `<div id="view" class="modal">
    <div class="modal-content">
        <center><img style:max-width v-bind:src="imageurl"></center><br>
        <h4>{{ viewedArticleTitle }}</h4>
        <p>{{ viewedArticleBody }}</p>
    </div>
    <div class="modal-footer">
        <a class="modal-close waves-effect waves-black btn-flat">Close</a>
    </div>
</div>`
})