import Vue from 'vue'
import Router from 'vue-router'
import PageLoad from './PageLoad.vue'
Vue.use(Router)

export default new Router({
  routes: [
      {
          path: '/',
          component: PageLoad
      },
      {
          path: '/:page',
          component: PageLoad
      },
      {
          path: '/:page/:page1',
          component: PageLoad
      },
      {
          path: '/:page/:page1/:page2',
          component: PageLoad
      },
      {
          path: '/:page/:page1/:page2/:page3',
          component: PageLoad
      },
      {
          path: '/:page/:page1/:page2/:page3/:page4',
          component: PageLoad
      },
      {
          path: '/:page/:page1/:page2/:page3/:page4/:page5',
          component: PageLoad
      },
      {
          path: '/:page/:page1/:page2/:page3/:page4/:page5/:page6',
          component: PageLoad
      }
  ]
})
