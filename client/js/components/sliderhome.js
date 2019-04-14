Vue.component('slider-home', {
    props: ['homepage'],
    mounted() {
        const slider = document.querySelectorAll('.slider')
        M.Slider.init(slider, {
            indicators: false,
            height: 655
        })
    },
    template: `
    <div>
        <div class="slider">
            <ul class="slides">
                <li>
                    <img src="https://images.unsplash.com/photo-1461773518188-b3e86f98242f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                        alt=""> 
                    <div class="caption center-align">
                        <h3>TYPRO</h3>
                        <h5 class="light grey-text text-lighten-3">Embodying the stateless mind</h5>
                    </div>
                </li>
                <li>
                    <img src="https://images.unsplash.com/photo-1441034281545-78296c3a6934?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                        alt="">
                    <div class="caption center-align">
                        <h3>Written things are meant to last</h3>
                        <h5 class="light grey-text text-lighten-3">Share them with us</h5>
                    </div>
                </li>
                <li>
                    <img src="https://images.unsplash.com/photo-1503040309319-516b4cf9320d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                        alt="">
                    <div class="caption center-align">
                        <h3>Proctecting things you treasure</h3>
                        <h5 class="light grey-text text-lighten-3">Contemplating past for the present</h5>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    `
})