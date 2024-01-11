import React from 'react'

function FileInput({name,className,children,change}:any) {

  function handleFile(image:any) {
    
    const file = image.target.files[0];

    const reader = new FileReader();  
  
    reader.readAsDataURL(file);
    
    reader.onload = function(event:any) {
        change(event.target.result)
    };
  }

  return (
    <div>
        <input accept="image/*" type="file" id={name} style={{ display: 'none' }} onChange={(event:any)=>handleFile(event)} />
        <label className={'p-2 gap-3 rounded cursor-pointer flex items-center justify-center '+className} htmlFor={name}>
            <p>{children}</p>
        </label>
    </div>
  )
}

export default FileInput