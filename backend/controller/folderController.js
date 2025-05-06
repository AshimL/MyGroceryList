import { Folder } from "../models/folderModel.js";
import mongoose from "mongoose";

export const createFolder = async (req, res) => {

  try {
    const { name } = req.body;
    const userId = req.user.id

    const newFolder = new Folder({ name, userId })
    newFolder.save();

    res.status(201).json({ success: true, data: newFolder });


  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create folder" });
  }
};


export const getUserFolder = async (req, res) => {

  try {
    const userId = req.user.id;

    const folders = await Folder.find({ userId })

    res.status(200).json({ success: true, data: folders });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to get folders" });
  }
}


export const renameFolder = async (req, res) => {

  const folderId = req.params.id;
  const userId = req.user.id;
  const name = req.body;

  if (!mongoose.Types.ObjectId.isValid(folderId)) {
    return res.status(404).json({
      success: false,
      message: "Invalid item Id"
    })
  }

  try {
    const updatedName = await Folder.findOneAndUpdate(
      { _id: folderId, userId },
      name,
      { new: true })

    res.status(200).json({ success: true, data: updatedName });

  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to rename folder" });
  }

}


export const deleteFolder = async (req, res) => {

  const folderId = req.params.id;
  const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(folderId)) {
    return res.status(404).json({
      success: false,
      message: "Invalid item Id"
    })
  }


  try {
    await Folder.findOneAndDelete({ _id: folderId, userId });
    res.status(200).json({
      success: true,
      message: "Item Deleted"
    })

  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete folder" });
  }
}