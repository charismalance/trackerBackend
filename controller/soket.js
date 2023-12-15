const User = require("../models").User;
const UserRole = require("../models").UserRole;
const Role = require("../models").Role;
const message = require("../models").message;
const Room = require("../models").Room ;
exports.insertNewMessage = async function(data){
    const sender = await User.findOne({
        where: {
            userName : senderUserName
        }
    });
    const reciver = await User.findOne({
        where: {
            userName : reciverUserName
        }
    });
    const group = await Room.findOne({
        where :{
            title : data.room
        }
    })
    if(user){
        await message.create({message : data.data , senderId:sender.id , reciverId:reciver.id, roomId:group.id})
    }
 

}
exports.chatOfRoom = async(req,res)=>{
    try {
        let roms = await Room.findOne({where:{title :req.body.room}})
        if(roms){
        let chats = await message.findAll({
            where : {
                roomId : roms.id
            }
        })
        return res.send(chats)
    }
    return res.send({error:"room not find"})
    } catch (error) {
        return res.send({error:error.message})
    }

}