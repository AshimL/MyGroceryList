import React, { useState } from 'react'
import { useFolderStore } from '../store/folders'
import { useAuthStore } from '../store/userInfo'

const CreateFolder = () => {

  const [clicked, setClicked] = useState(false)
  const [folderName, setFolderName] = useState("")
  const {token} =  useAuthStore();

  const {createFolder} =  useFolderStore();


  const handleSave = async (e) =>{
    e.preventDefault();
    const {success, message} = await createFolder(folderName, token)
    setFolderName("")
    setClicked(false)
  }

  const handleKeyDown = (e) =>{

    if(e.key === "Enter"){
      e.preventDefault();
      handleSave(e)
    }
  }

  return (
    <div>
      {!clicked && <button onClick={() => setClicked(true)}>Create Folder</button>}

      {clicked && (
        <div>
          <input 
          name='name'
          value= {folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="Folder name"
          onKeyDown={handleKeyDown}
          autoFocus
          />
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  )
}

export default CreateFolder