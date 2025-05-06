import mongoose from "mongoose";

const userListSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true
  },

  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  folderId:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    required: false,
    default: null
  }
}, {
  timestamps: true
})


export const UserList  = mongoose.model('UserList', userListSchema);