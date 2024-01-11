import mongoose from "mongoose";

const projectSchema = new mongoose.Schema( 
  {
    name: {
      type: String,
      required: true
    },    
    src: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    },
  },
  { 
    collection: 'projects'
  }
);

const Project =  mongoose.models.Profile || mongoose.model('project', projectSchema);

export default Project 


