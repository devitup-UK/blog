import axios from 'axios';

import Category from '@/models/Category.js';
import User from '@/models/User.js';
import Media from '@/models/Media';
import Post from "@/models/Post";

let WPAPI = require('wpapi/superagent');
let wordPressEndpoint = process.env.VUE_APP_API_ENDPOINT + '/wp-json';
let $api = new WPAPI({ 
    endpoint: wordPressEndpoint
});
$api.team = $api.registerRoute( 'devitup/v1', '/users/(?P<id>\\d+)');

$api.getSiteInfo = async() => {
    return await axios.get(wordPressEndpoint + '/devitup/v1/site').then(response => {
        return response.data;
    })
}

$api.menu = async (slug) => {
    if (typeof slug == "undefined") {

        const getAllNavigations = () => axios.get(wordPressEndpoint + '/menus/v1/menus');
        const getDefaultNavigation = slug => axios.get(wordPressEndpoint + '/menus/v1/menus/' + slug);

        return getAllNavigations()
            .then(navigations => navigations.data[0].slug)
            .then(getDefaultNavigation)
            .then(response => {
                return response.data;
            })

    } else {
        return axios.get(wordPressEndpoint + '/menus/v1/menus/' + slug)
            .then((response) => {
                return response.data;
            });
    }
}

$api.getCategoryByID = async (id) => {
    return await $api.categories().id(id).then(response => {
        return new Category(response);
    })
}

$api.getCategoryBySlug = async (slug) => {
    return await $api
        .categories()
        .slug(slug.match(/[A-Z][a-z]+/g).join('-').toLowerCase())
        .then(response => {
            return response;
        });

}

$api.getUserByID = async (id) => {
    return await $api.team().id(id).then(response => {
        return new User(response);
    })
}

$api.getUserBySlug = async (slug) => {
    return await axios.get(wordPressEndpoint + '/devitup/v1/users/slug/' + slug).then(response => {
        return response.data;
    })
}

$api.getMediaByID = async (id) => {
    return await $api.media().id(id).then(response => {
        return new Media(response);
    })
}

$api.getPostByID = async (id) => {
    return await $api.posts().id(id).then(response => {
        return new Post(response);
    })
}

$api.getPostBySlug = async (slug) => {
    return await $api.posts().slug(slug).then(response => {
        return new Post(response[0]);
    })
}

export { $api }