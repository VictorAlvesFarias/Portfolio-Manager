import { uri } from "@/env";
import axios from "axios";

class LoginService {

    public async signin(password:any) {
        const result = await axios.post(uri+"/api/login" ,{
            "password":  password.password
        })
        .then(i=>i.data)
        .catch(e=> {throw e})
        
        return result;
    }

    public async validate(accessKey:any) {
        const result = await axios.post(uri+"/api/authorize" ,{
            accessKey: accessKey
        })
        .then(i=>i.data)
        .catch(e=> {throw e})
        
        return result;
    }
}


export default LoginService