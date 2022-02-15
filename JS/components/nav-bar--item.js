Vue.component('navbar-item-text',{
    props:['section'],
    template: //html
    `
    <li  class="nav-bar__item nav-bar__item--text"> 
        <a class="nav-bar__link" :href=section.reference> {{section.title}} </a>
    </li>
    `,
    computed:{
    }
})
// :class="{'nav-bar__item--active' : section.active}"