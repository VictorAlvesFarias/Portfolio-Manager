import { uri } from "@/env";
import axios from "axios";
import Cookies from "js-cookie";


class LoginService {

    public async signin(password:any) {
        const result = await fetch(uri+"/api/login", 
        {
            method: 'POST',
            body: JSON.stringify({
                password : password.password
            }),
            redirect: 'follow'  
        })
        .then(response => response.json())
        .then(result => {
            return result  
        })
        .catch(error => console.log('error', error));

        return result;
    }

    public async validate(accessKey:any) {
        const result = await fetch(uri+"/api/authorize", 
        {
            method: 'POST',
            body: JSON.stringify({
                accessKey: accessKey
            }),
            redirect: 'follow'  
        })
        .then(response => response.json())
        .then(result => {
            return result  
        })
        .catch(error => console.log('error', error));


        return result;
    }
}


export default LoginService