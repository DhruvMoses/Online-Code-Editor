import { useParams } from "react-router-dom";
import "./index.scss"
import { EditorContainer } from "./EditorContainer";
import { useCallback, useState } from "react";
import { makeSubmission } from "./Service";

export const PlaygroundScreen = () => {

const [input,setInput] = useState("")
const [output,setOutput] = useState("")
const [showLoader,setShowLoader] = useState(false) 

const params = useParams();
const {fileId, folderId} = params;

const importInput = (e) => {
  const file = e.target.files[0]
  const fileType = file.type.includes("text");        
    if (fileType) {
      const fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = (e) => {
        setInput(e.target.result);
      };
    }else{
    alert("Please choose a valid file type");
  }
}

const exportOutput = () => {
    const outputValue = output.trim()
    if(!outputValue){
      alert("Output is empty")
      return
    }
    const blob = new Blob([outputValue],{type: "text/plain"})
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a')
    link.href = url
    link.download = `output.txt`
    link.click()
}
  
const callback = ({ apiStatus, data, message }) => {
  if (apiStatus === "loading") {
      setShowLoader(true);
      setOutput("");
  } else if (apiStatus === "error") {
      setShowLoader(false);
      setOutput(`Error: ${message || "Unknown error occurred"}`);

  } else {
      setShowLoader(false);
      const decodedOutput = data.stdout
        ? atob(data.stdout)
        : data.stderr
        ? atob(data.stderr)
        : "No output";
      setOutput(decodedOutput);
  }
};


const runCode = useCallback(({code,language}) => {
    makeSubmission({code, language, stdin: input, callback})
},[input])

  return (
    <div className="playground-container">

      <div className="content-container">

        {/* Editor Section */}
        <div className="editor-container">
          <EditorContainer fileId = {fileId} folderId = {folderId} runCode={runCode}/>
        </div>

        {/* Input Section */}
        <div className="input-output-container">
        <div className="input-output-header">
            <b>Input:</b>
            <label htmlFor="input" className="icon-container">
              <b className="material-symbols-outlined">upload</b>
              <b>Import Input</b>
            </label>
            <input type="file" id="input" style={{display:"none"}} onChange={importInput}/>
          </div>
          <textarea value={input} onChange={(e)=>{setInput(e.target.value)}}></textarea>
        </div>
        
        {/* Output section */}
        <div className="input-output-container">
          <div className="input-output-header">
            <b>Output:</b>
            <button className="icon-container" onClick={exportOutput}> 
              <b className="material-symbols-outlined">download</b>
              <b>Export Output</b>
            </button>
          </div>
          <textarea readOnly value={output} onChange={(e)=>{setOutput(e.target.value)}}></textarea>
        </div>

      </div>

      {showLoader && 
        <div className='fullpage-loader'>
          <div className="loader">

          </div>
        </div>
      }
      
    </div>
  );
};

  