import mongoose from "mongoose";

const languageSchema = new mongoose.Schema( 
  {
    name: {
      type: String,
      required: true
    },
    src:{
      type: String,
      require:true
    },
    order:{
      type: Number,
      required: true
    },
  },
  { 
    collection: 'languages'
  }
);

const Language =  mongoose.models.Profile || mongoose.model('language', languageSchema);

export default Language 


