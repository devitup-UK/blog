export default class User {
    userSupplied = false;

    constructor(user) {
        this.userSupplied = typeof(user) != "undefined";

        this.id = this.userSupplied ? user.id : null;
        this.name = this.getFullName(user);
        this.slug = this.userSupplied ? user.slug : null;
        this.title = this.userSupplied ? user.title : null;
        this.avatar = this.userSupplied ? user.avatar : null;
        this.image = this.userSupplied ? user.image : null;
    }

    getFullName(user) {
        if(this.userSupplied) {
            let name = user.name;
            
            if(user.first_name != "") {
                name = user.first_name;
                if(user.last_name != "") {
                    name += " " + user.last_name;
                }
            }

            return name;
        }else{
            return null;
        }
    }

    getInitials() {
        if(this.userSupplied) {
            let initials = "";
            let names = this.name.split(' ');
            if(names.length > 1) {
                names.forEach(name => {
                    initials += name[0];
                });
            }else{
                initials += names[0][0];
            }

            return initials;
        }else{
            return null;
        }
    }
}