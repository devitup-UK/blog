export default class Category {
    constructor(category) {
        let categorySupplied = typeof(category) != "undefined";

        this.id = categorySupplied ? category.id : null;
        this.link = categorySupplied ? category.link : '';
        this.name = categorySupplied ? category.name : '';
        this.slug = categorySupplied ? category.slug : '';
        this.image = categorySupplied ? (category.acf['header-image'] ? category.acf['header-image'].sizes['2048x2048'] : null) : null;
    }

    getTagName() {
        return '#' + this.name.toLowerCase();
    }
}