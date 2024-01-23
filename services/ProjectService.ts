import { uri } from "@/env";
import axios, { AxiosHeaders } from "axios";
import Cookies from "js-cookie";

class ProjectService {
    
    private headers:AxiosHeaders
    private cookie:any 

    constructor(){
        this.headers = new AxiosHeaders()
        this.cookie = Cookies.get("auth")
        this.headers.set("auth",this.cookie)
    } 

    public async getAll() {
        const result = await axios.get(uri+'/api/projects')
        .then(i=>i.data)
        .catch(e=> {throw e})
        
        return result;
    }

    public async delete(id:Number) {
        const result = await axios.delete(uri+"/api/projects?id=" + id,        {
            headers:this.headers
        })
        .then(i=>i.data)
        .catch(e=> {throw e})
        
        return result;
    }

    public async saveOrUpdate(data:any,images:any) {
        const result = await axios.post(uri+"/api/projects" ,{
            name: data.name,
            order: data.order,
            description: data.description,
            src: data.icon,
            images:images
        },
        {
            headers:this.headers
        })
        .then(i=>i.data)
        .catch(e=> {throw e})
        
        return result;
    }
}

export default ProjectService