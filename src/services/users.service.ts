import axios from'axios'
import usersModel from '../models/userModel';
export default new class UsersService {
    
    BASE_URL="https://jsonplaceholder.typicode.com";
   
    getListUsers(){
        return axios.get(`${this.BASE_URL}/users`);
    }

    getFullUserDetailes(id:any){
        return axios.get(`${this.BASE_URL}/users/${id.id}`);
    }

    getUserPosts(){
        return axios.get(`${this.BASE_URL}/posts`);
    }

    inserNewUser(api:any){
        return axios.post(`${this.BASE_URL}/users`,api)
    }

    deleteUser(userId:any){
        return axios.delete(`${this.BASE_URL}/users/${userId}`)
    }


}
