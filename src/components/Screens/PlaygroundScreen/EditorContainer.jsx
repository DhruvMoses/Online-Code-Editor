import { editor } from "monaco-editor";
import "./EditorContainer.scss";
import { Editor } from "@monaco-editor/react";
import { useContext, useRef, useState, useEffect } from "react";
import { PlaygroundContext } from "../../Providers/PlaygroundProvider";
import { makeSubmission } from "./Service";

const editorOptions = {
  fontSize: 16,
  wordWrap: "off",
};

const fileExtensionMapping = {
  cpp: "cpp",
  java: "java",
  javascript: "js",
  python: "py",
};


export const EditorContainer = ({ fileId, folderId, runCode }) => {
  const { getDefaultCode, getLanguage, updateLanguage, saveCode, getFileTitle } =
    useContext(PlaygroundContext);

  const [code, setCode] = useState(() => {
    return getDefaultCode(fileId, folderId);
  });
  const [language, setLanguage] = useState(() => getLanguage(fileId, folderId));
  const [theme, setTheme] = useState("vs-dark");
  const [fileName, setFileName] = useState(() => getFileTitle(fileId, folderId));
  const codeRef = useRef(code);

  useEffect(() => {
    setLanguage(getLanguage(fileId, folderId));
    const latestCode = getDefaultCode(fileId, folderId);
    setCode(latestCode);
    codeRef.current = latestCode;
    setFileName(getFileTitle(fileId, folderId))
}, [fileId, folderId]);

  useEffect(() => {
    // Ensure editor updates when language changes
    setCode(getDefaultCode(fileId, folderId));
}, [language]); 

  const onChangeCode = (newCode) => {
    setCode(newCode);
    codeRef.current = newCode;
  };

  //isme hume event lenge as param aur phir hum jab target krenge toh files array ke 0th index
  // ka data uthayenge aur store krenge in 'file' phir hum uss file ka type check krenge
  // (eg file type-> text/css, image/jpeg etc) magar hume chahiye "text/abc" basically wo file
  // which includes "text"...uske baad if fileType is true then filereader read krega wo file aur phir
  // filereader usse load krega from the drive and event jo hai value wo occure krega aur phir jis
  // tera event mai target dekhte h same ussi tera value pe target pe jaakr result wali "value" uthayenge
  // aur uss value ko store krenge in "importCode" mai kyunki value mai wo hai jo file ke andr code
  // likha hai....phir set code waha editor m wo code import krdega successfully
  const onImportCode = (event) => {
    const file = event.target.files[0];

    if (!file) return; // If no file is selected, exit early

    const fileExtension = file.name.split(".").pop(); // Extract file extension
    const expectedExtension = fileExtensionMapping[language]; // Get expected extension

    // Check if file extension matches the expected language
    if (fileExtension !== expectedExtension) {
      alert(`Please choose a valid ${language} file (*.${expectedExtension})`);
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = function (value) {
      const importedCode = value.target.result;
      setCode(importedCode);

      codeRef.current = importedCode;
        saveCode(fileId, folderId, importedCode);
    };
  };

  const onExportCode = () => {
    const codeValue = codeRef.current?.trim(); //not to include blank spaces

    if (!codeValue) {
      alert("Add some code in the editor before exporting");
      return;
    }
    //Step-1. create a blob or instant code in the memory
    const codeBlob = new Blob([codeValue], { type: "text/plain" });

    //Step-2. Create object URL
    const downloadUrl = URL.createObjectURL(codeBlob);

    //Step-3. Create a clickable link to download the blob/file
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `code.${fileExtensionMapping[language]}`;
    link.click();
    codeRef.current = onImportCode;
  };

  const onLanguageChange = (e) => {

    updateLanguage(fileId, folderId, e.target.value);
    setCode(getDefaultCode(fileId, folderId));
    setLanguage(e.target.value);

    setCode(getDefaultCode(fileId, folderId)); 

    //Force a slight delay to ensure state updates before running code
    setTimeout(() => {
      codeRef.current = getDefaultCode(fileId, folderId); 
  }, 50);
  };

  const onThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const onSaveCode = () => {
    saveCode(fileId, folderId, codeRef.current);
    alert("Code saved successfully");
  };

  const onRunCode = () => {
    runCode({ code: codeRef.current, language: getLanguage(fileId, folderId) });
  };

  return (
    <div className="root-editor-container">
      <div className="editor-header">
        <div className="left-side">
          <b>{fileName}</b>
          <button onClick={onSaveCode}>Save Code</button>
        </div>
        <div className="right-side">
          <select onChange={onLanguageChange} value={language}>
            <option value="cpp">Cpp</option>
            <option value="java">Java</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
          </select>
          <select onChange={onThemeChange} value={theme}>
            <option value="vs-dark">vs-dark</option>
            <option value="vs-light">vs-light</option>
          </select>
        </div>
      </div>

      <div className="editor-body">
        <Editor
          height={"100%"}
          language={language}
          options={editorOptions}
          theme={theme}
          onChange={onChangeCode}
          value={code}
        />
      </div>

      <div className="editor-footer">
        <button className="btn">
          <span className="material-symbols-outlined">fullscreen</span>
          <span>Fullscreen</span>
        </button>
        <label htmlFor="importCode" className="btn">
          <span className="material-symbols-outlined">upload_file</span>
          <span>Import Code</span>
        </label>
        <input
          type="file"
          id="importCode"
          style={{ display: "none" }}
          onChange={onImportCode}
        />
        <button className="btn" onClick={onExportCode}>
          <span className="material-symbols-outlined">download</span>
          <span>Export Code</span>
        </button>
        <button className="run-btn" onClick={onRunCode}>
          <span className="material-symbols-outlined">play_arrow</span>
          <span>Run Code</span>
        </button>
      </div>
    </div>
  );
};
