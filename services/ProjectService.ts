import { uri } from "@/env";
import axios from "axios";

class ProjectService {
    
    public async getAll() {

        const result = await axios.get(uri+'/api/projects')
        .then(i=>i.data)
        .catch(e=> {throw e})
        
        return result;
    }

    public async delete(id:Number) {
        
        const result = await axios.delete(uri+"/api/projects?id=" + id)
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
        })
        .then(i=>i.data)
        .catch(e=> {throw e})
        
        return result;
    }
}

export default ProjectService