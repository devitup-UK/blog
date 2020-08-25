import Category from './Category.js';
import User from './User';
import moment from 'moment';
import 'moment/locale/en-gb';
moment.locale('en-gb');
import { $api } from '@/services/wordpress.service.js';
import Media from './Media.js';

export default class Post {
    constructor(post) {

        let postSupplied = typeof(post) == "object";

        this.id = postSupplied ? post.id : null;
        this.excerpt = postSupplied ? post.excerpt.rendered : '';
        this.title = postSupplied ? post.title.rendered : '';
        this.date = postSupplied ? post.date : (new Date());
        this.slug = postSupplied? post.slug : null;
        this.author = new User();
        this.author.id = postSupplied ? post.author : null;
        this.category = new Category();
        this.category.id = postSupplied ? post.categories[0] : null;
        this.media = new Media();
        this.media.id = postSupplied ? post.featured_media : '';
        this.views = postSupplied ? parseInt(post.views) : 0;
        this.content = postSupplied ? post.content.rendered : null;
    }

    getCategory() {
        return $api.getCategoryByID(this.category.id).then(category => { return category; });
    }

    getDate() {
        return moment(this.date).format('dddd Do MMMM YYYY');
    }

    getAuthor() {
        return $api.getUserByID(this.author.id).then(author => { return author; });
    }

    getThumbnail() {
        return $api.getMediaByID(this.media.id).then(media => { return media; });
    }
}