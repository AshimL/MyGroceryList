import React, { useState } from 'react'

const CreateFolder = () => {

  const [clicked, setClicked] = useState(false)
  const [folderName, setFolderName] = useState("")


  const handleSave = () =>{
    setFolderName("")
    setClicked(false)
    
  }

  console.log(folderName)

  return (

    <div>

      {!clicked && <button onClick={() => setClicked(true)}>Create Folder</button>}

      {clicked && (
        <div>
          <input 
          name='name'
          value= {folderName}
          onChange={(e) => setFolderName(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      )}
      
    </div>
  )
}

export default CreateFolder