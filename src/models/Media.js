export default class Media {
    constructor(media) {
        let mediaSupplied = typeof(media) == "object";

        this.id = mediaSupplied ? media.id : null;
        this.src = mediaSupplied ? media.guid.rendered : null;
    }
}