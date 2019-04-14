Vue.component('topNavbar', {
    props : ['isLogin', 'searchBox'],
    
    methods : {
        
    },
    template :  `<nav>
    <div class="nav-wrapper blue-grey lighten-4">
        <ul class="left">
            <li><a @click="$emit('show-home')" href=""><i class="fas fa-text-height"></i></a></li>
            <li><a v-if="isLogin" @click="$emit('show-user-article-page')"><i class="material-icons right">view_module</i>Dashboard</a></li>
            <li><a v-if="isLogin" @click="$emit('show-write-page')"><i class="material-icons right">create</i>Write an Entry</a></li>
            <li>
            <li><a v-if="isLogin"  @click="$emit('show-all-user-articles')"><i
                        class="material-icons right">collections_bookmark</i>Read</a></li>
            <li>
                <form v-if="isLogin">
                    <slot></slot>
                    
                </form>
            </li>
        </ul>
        <ul class="right hide-on-med-and-down">
            <li><a v-if="!isLogin" @click="$emit('show-login')"><i
                        class="material-icons right">view_module</i>Login</a>
            </li>
            <li><a v-if="!isLogin" @click="$emit('show-register')"><i
                        class="material-icons right">view_module</i>Register</a></li>
            <li><a @click="$emit('sign-out')" v-if="isLogin"><i
                        class="material-icons right">view_module</i>Sign out</a></li>
            <li><a v-if="isLogin" href=""><i class="fas fa-user-circle"></i></a></li>
            <li><a v-if="isLogin" href=""><i class="material-icons right button-collapse"
                data-activates="slide-out">blur_on</i></a></li>
        </ul>
    </div>
</nav>`
})