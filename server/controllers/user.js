import User from "../models/User.js"

// Read 

export const getUser = async(req,res)=>{

try{

    const {id} = req.params
    const user = await User.findById(id)
    res.status(200).json(user)

}catch(err){
    res.status(404).json({message:err.message})
}

}

export const getUserFriend = async (req,res)=>{
    try{
    const {id}=req.params
    const user = await User.findById(id)

    const friends = await Promise.all(             //hitting multiple
        user.friends.map((id)=> User.findById(id))
    )

    const formattedFriends = friends.map(
        ({_id,firstname,lastname,location,occupation,picturePath}) =>{
        return {_id,firstname,lastname,location,occupation,picturePath}
        }
        
    )
    res.status(200).json(formattedFriends)
    
    }catch(err){
        res.status(404).json({message:err.message})
    }
}


// Update 

export const addRemoveFriend = async (req,res) => {

try{

    const {id, friendId} = req.params
    const user = await User.findById(id)
    const friend = await User.findById(friendId)

    if (user.friends.includes(friendId))            //for removing id
    {
        user.friends = user.friends.filter((id)=>id !== friendId)
        friend.friends = friend.friends.filter((id)=>id!==id)

    }else{
        user.friends.push(friendId)
        friend.friends.push(id)
    }

    await user.save()
    await friends.save()

}catch (err){
    res.status(404).json({message : err.message})
}

}