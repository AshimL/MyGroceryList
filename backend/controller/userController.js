import { UserList } from "../models/userListModel.js"


export const createList = async (req,res) =>{
  try {
    const {title} = req.body
    const userId = req.user.id

    const newList = new UserList({
      title,
      userId
    })

    await newList.save();

    res.status(201).json({success:true, data: newList})
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}


export const getUserLists = async (req,res) =>{

  try {
    const userId = req.user.id;

    const lists = await UserList.find({userId})
    res.status(200).json({ success: true, data: lists });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }

}



