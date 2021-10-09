import UserModel from '../models/User.js';

const UserController ={
    async register(req,res){
        try {
            const user = await UserModel.create(req.body);
            res.status(201).send(user)

        } catch (error) {
            res.status(400).send(error)

        }

    },
    async login(req,res) {
        try {
            const user = await UserModel.findOne({ email:req.body.email });
            if (!user) {
                return res.status(400).send({ 
                    message: 'Wrong Credentials' 
                });
            }
            const token = user.generateAuthToken();
            user.tokens = token;
            res.send(user);
        } catch (error) {
            res.status(400).send(error)
        }
    },
    async getUsers (req,res){
        try {
            const users = await UserModel.find()
            res.status(201).send({users});
        } catch (error) {
            res.status(500).send({
                error,
                message: 'There was a problem trying to view the appointments'
            })
        }
    },

    async logout(req,res) {
        try {
            const find = await UserModel.findOneAndUpdate (
                {email:req.params.email}, 
                {tokens:""}, 
                {new:true, useFindAndModify:false}
                );
            if(!find){return res.status(400).send({
                message: 'User is not login'
            })}
            res.status(200).send({
                message: 'Logout is OK'
            });
       } catch (error) {
           console.error(error);
           res.status(500).send({
               error,
               message: 'There was a problem trying to logout the client'
           })            
       }
    },
    
    async delete (req, res){
        try {
            await UserModel.findByIdAndDelete({
                _id:req.params._id
            });
            res.status(201).send({
                message: `Usuario borrado`
            });         
        } catch (error) {
            console.error(error);
            res.status(500).send({
                error,
                message: 'There was a problem trying to deleted the appointment'
            })
        }
    },
}

export default UserController;
