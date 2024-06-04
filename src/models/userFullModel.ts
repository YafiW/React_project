
export default class UsersFullModel {
    id!: number;
    name!: string;
    username!: string;
    email!: string;
    address!: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone!:string;
    website!:string;
    company!:{
        name:string;
        catchPhrase:string;
        bs:string
    }

    constructor(id: number, aname: string, username: string, email: string, street: string, suite: string, city: string, zipcode: string, lat: string, lng: string,phone:string,website:string,name:string,catchPhrase:string,bs:string) {
        this.id = id;
        this.name = aname;
        this.username = username;
        this.email = email;
        this.address={street,suite,city,zipcode,geo:{lat,lng}};
        this.phone=phone;
        this.website=website;
        this.company={name,catchPhrase,bs};
    };
}


