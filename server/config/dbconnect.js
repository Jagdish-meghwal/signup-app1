import mongoose from 'mongoose'
import config from 'config'

const dbconnect = async() => {
    try{
        await mongoose.connect(
            config.get('mongoUrl'),
            {
                useCreateIndex:true,
                useFindAndModify:true,
                useUnifiedTopology:true,
                useNewUrlParser:true,
                
            }
        )

    }catch(error){
        console.log(error);
    }
}

export default dbconnect
