Vue.component('sidenav', {
    props : ["isLogin", "username", 'show-read', 'show-write', 'sign-out', 'loc', 'quotes'],
    template: `<ul id="slide-out" class="side-nav">
    <li>
        <div class="userView">
            <div class="background">
            </div>
            
            <a href="#">
                <h1 class="grey-text">TYPRO</h1>
            </a>
            <a href=""><span class="black-text name">How was your day {{ username }}?</span></a>
            <a href=""><span class="black-text email">Read. Write. Enrich yourself today</span></a>
            <a href=""><b><span class="black-text loc">{{ loc }}</span></b></a>
        </div>
    </li>
    <li><a @click.prevent="showRead"><i class="material-icons right">view_module</i>Read</a>
    </li>
    <li><a @click.prevent="showWrite"><i class="material-icons right">view_module</i>Write an
            Entry</a></li>
    </li>
    <li>
        <div class="divider"></div>
    </li>
    <li><a class="subheader">Actions</a></li>
    <li><a @click.prevent="signOut" v-if="isLogin"><i class="waves-effect material-icons right">view_module</i>Sign out</a></li>
    <i><div style="margin-left:20px; font-size:12px" v-html="quotes"></div></i>
    </ul>`
})

$('.button-collapse').sideNav({
    menuWidth: 300,
    edge: 'left',
    closeOnClick: true,
    draggable: true
});