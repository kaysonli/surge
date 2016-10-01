// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueTouch from 'vue-touch'

Vue.use(VueTouch);

const Foo = {
    template: '<div>foo</div>'
}
const Bar = {
    template: '<div>bar</div>'
}


const routes = [{
    path: '/foo',
    component: Foo
}, {
    path: '/bar',
    component: Bar
}]

const router = new VueRouter({
    routes // short for routes: routes
})

const app = new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
