import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Category from "./views/Category.vue";
import CategoryContent from "./views/CategoryContent.vue";
import Post from "./views/Posts.vue";
import PostView from "./views/Post.vue";
import User from "./views/User.vue";
import { $api } from "./services/wordpress.service";

Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { 
      path: "/", 
      redirect: "/home"
    },
    {
      path: "/home",
      component: Home,
      children: [
        {
          path: "",
          name: "home",
          component: Post
        },
        {
          path: "page/:page?",
          name: "home.page",
          component: Post
        }
      ]
    },
    {
      path: "/user",
      component: User,
      children: [
        {
          path: ":slug",
          name: "user",
          component: Post,
        },
        {
          path: ":slug/page/:page?",
          name: "user.page",
          component: Post
        }
      ]
    },
    {
      path: "/post/:slug",
      component: PostView,
      name: "post"
    }
  ]
});




$api.menu().then((navigation) => {
  let route = {
    path: "/category",
    component: Category,
    children: []
  };

  navigation.items.forEach((item) => {

    if(item.title != "Home") {
      let categoryChild = 
          {
            path: (item.url.replace(process.env.VUE_APP_API_ENDPOINT, "/")).replace("//", "/").replace('category', '').replace("//", "/").slice(0, -1).substr(1),
            props: { title: item.title, id: item.ID },
            component: CategoryContent,
            children: [
              {
                path: "",
                name: "category." + item.title.toLowerCase(),
                component: Post,
                props: {
                  category: item.title
                }
              },
                  {
                    path: "page/:page?",
                    name: "category." + item.title.toLowerCase() + ".page",
                    component: Post,
                    props: {
                      category: item.title
                    }
                  }
                ]
          };

      route.children.push(categoryChild);

      }

  });

  router.addRoutes([route]);
});


export default router;