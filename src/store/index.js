import Vue from 'vue';
import Vuex from 'vuex';

import { $api } from '../services/wordpress.service';
import { transformRawNavigationItemToVueNavigationItem } from '../transformers/navigation.transformer';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        title: "DevItUp: Blog",
        description: null,
        navigation: [],
        isLoading: true,
        error: {
            status: false,
            code: null,
            detail: null
        },
    },
    mutations: {
        updateLoadingStatus(state, status) {
            state.isLoading = status;
        },
        loadPosts(state, posts) {
            state.posts = posts;
        },
        loadCategories(state, categories) {
            state.categories = categories;
        },
        addNavigationItem(state, item) {
            state.navigation.push(item);
        },
        triggerError(state, error) {
            state.error.status = true;
            state.error.code = error.code;
            state.error.detail = error.detail;
        },
        setTitle(state, title) {
            state.title = title;
        },
        setDescription(state, description) {
            state.description = description;
        }
    }
});

// Load up the navigation.
$api.menu().then((returnedNavigation) => {
    returnedNavigation.items.forEach((item) => {
        store.commit('addNavigationItem', transformRawNavigationItemToVueNavigationItem(item));
        store.commit('updateLoadingStatus', false);
    });

}).catch((error) => {
    store.commit('triggerError', { code: 100, detail: error });
});

export default store;