import mongoose from "mongoose"
import { UserList } from "../models/userListModel.js"


export const createItem = async (req, res) => {
  try {
    const { item, folderId } = req.body
    const userId = req.user.id

    const newList = new UserList({
      item,
      userId,
      folderId: folderId || null
    })

    await newList.save();

    res.status(201).json({ success: true, data: newList })

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}


export const getUserItems = async (req, res) => {

  try {
    const userId = req.user.id;

    const lists = await UserList.find({ userId })
    res.status(200).json({ success: true, data: lists });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }

}


export const updateItem = async (req, res) => {

  const itemId = req.params.id
  const userId = req.user.id;
  const newItem = req.body;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(404).json({
      success: false,
      message: "Invalid item Id"
    })
  }

  try {
    const updatedList = await UserList.findOneAndUpdate(
      {_id:itemId,userId:userId},
      newItem,
      {new:true}
    );

    if(!updatedList){
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    return res.status(200).json({
      success:true,
      data: updatedList
    })
    
  } catch (error) {
    return res.status(500).json({
      success:false,
      message: "Server Error"
    })
    
  }

}

export const deleteItem = async (req,res) =>{
  const  itemId = req.params.id;
  const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(404).json({
      success: false,
      message: "Invalid item Id"
    })
  }

  try {

    await UserList.findOneAndDelete({_id:itemId, userId});
    res.status(200).json({
      success:true,
      message: "Item Deleted"
    })
    
  } catch (error) {
    console.log("error in deleting item: ", error.message);
    res.status(500).json({
      success:false,
      message: "Server error"
    })
    
  }
}



