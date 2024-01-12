import axios from "axios";

class ProjectService {
    
    public async getAll() {

        console.log("call")
        const result = await axios.get('/api/projects')
        .then(i=>i.data)
        .catch(e=> {throw e})
        
        return result;
    }

    public async delete(id:Number) {
        
        console.log("call")
        const result = await axios.delete("/api/projects?id=" + id)
        .then(i=>i.data)
        .catch(e=> {throw e})
        
        return result;
    }

    public async saveOrUpdate(data:any,images:any) {
        
        console.log("call")
        const result = await axios.post("/api/projects" ,{
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