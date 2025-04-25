import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export const PlaygroundContext = createContext()

// Ye hai wo format jisme bascially humne local storage mai store krega aur
//   ye kuch data already homescreen pe dikhta rahega jab bhi koi user visit krega website
const initialData = [
    {
        id: uuidv4(),
        title: "DSA",
        files: [
            {
                id: uuidv4(),
                title: "program_1",
                language: "cpp",
                code: `#include<iostream>
                        using namespace std;
                        int main(){
                            cout<<"Hello World"
                            return 0,
                }`,
            },
        ]
    },
]
export const defaultCodes = {
    "cpp": `#include<iostream>
            using namespace std;
            int main(){
                cout << "Hello World";  
                return 0;               
            }`,

    "javascript": `console.log("Hello World")`,

    "java": `public class Main {
             public static void main (String args[]){
             System.out.println("Hello World");
                }
             }`,
             
    "python": `print("Hello World")`,
}

export const PlaygroundProvider = ({children}) => {

//1.ye state hai ki folders bane new toh unki heirarchy yaa format kya rahega i.e intialData wala type format
//2. humne banaya  ek variable "localData" jisme store kr rahe hai 'data'localstorage m jo key h uski value
//  agar wo data hai tabhi parse hoga into "object" yaani "data" ki value banega aur agar nahi hua toh 
//  inital data hi dikhega
    const [folders,setFolders] = useState(()=>{
            const localData = localStorage.getItem('data');
            return localData ? JSON.parse(localData) : initialData;
    });

    //isme hum new playground banyenge...aur ye tab invoke hoga jab
    //  user click krega "Create Playground" aur phir click krega "create" pe
    const createPlayground = (newPlayground) => {
        const {folderName, fileName, language} = newPlayground
        const newFolders = [...folders]
        newFolders.push({
            id: uuidv4(),
            title: folderName,
            files: [
            {
                id: uuidv4(),
                title: fileName,
                language: language,
                code: defaultCodes[language],
            }
        ]
        })
        localStorage.setItem('data', JSON.stringify(newFolders))
        setFolders(newFolders)
    }

    const createNewFolder = (folderName) => {
        const newFolder = {
            id: uuidv4(),
            title: folderName,
            files: [],
        }

        const allFolders = [...folders, newFolder]
        localStorage.setItem('data', JSON.stringify(allFolders))
        setFolders(allFolders)
    }

    const deleteFolder = (id) => {
        const updatedFoldersList = folders.filter((folderItem) => {
            return folderItem.id !== id;
        })

        localStorage.setItem('data', JSON.stringify(updatedFoldersList))
        setFolders(updatedFoldersList)
    }

    const editFolderTitle = (newFolderName, id) => {
        const updatedFoldersList = folders.map((folderItem) => {
            if(folderItem.id === id){
                folderItem.title = newFolderName
            }
            return folderItem
        })
        localStorage.setItem('data',JSON.stringify(updatedFoldersList))
        setFolders(updatedFoldersList);
    }

    const editFileTitle = (newFileName, folderId, fileId) => {
        //humne folders ke data ko "foldersCopies" mai daala just for good practice
        const foldersCopies = [...folders]
        for(let i = 0; i<foldersCopies.length; i++){
        //phele check krega ki folderId match kri desired folder ke folderId se
           if(folderId === foldersCopies[i].id){  
        //agar match kr jati h phir uss folders m jitni files h wo "files" variable m store krenge
            const files = foldersCopies[i].files  
        //ab agar for eg uss folder m 3 files thi toh "files.length = 3" h   
            for(let j=0; j<files.length; j++){
        //ab check krenge jis fileId ke naam ko edit krna h wo desired fileId se match krgyi
                if(files[j].id === fileId){
        //ab agar dono match hogyi aur desired file mil gyi toh uska title change hojayega to "newFileName"
                    files[j].title = newFileName
                    break;
                }
            }
            break;
        }
    }
    localStorage.setItem('data', JSON.stringify(foldersCopies))
    setFolders(foldersCopies)
    }

    const deleteFile = (folderId,fileId) => {
        const copiedFolders = [...folders]
        for(let i=0; i<copiedFolders.length; i++){
            if(copiedFolders[i].id === folderId){
                const files = [...copiedFolders[i].files]
                copiedFolders[i].files = files.filter((file) => {
                    return file.id != fileId
                })
                break
            }
        }
        localStorage.setItem('data', JSON.stringify(copiedFolders))
        setFolders(copiedFolders)
    }

    const createNewFile = (folderId,file) => {
        const copiedFolders = [...folders]
        for(let i = 0; i<copiedFolders.length; i++){
            if(copiedFolders[i].id === folderId){
                copiedFolders[i].files.push(file);
            }
        }
    localStorage.setItem('data', JSON.stringify(copiedFolders));
    setFolders(copiedFolders); 
    }

    const getDefaultCode = (fileId,folderId) => {
        for(let i = 0; i<folders.length; i++){
            if(folders[i].id === folderId){
                for(let j = 0; j<folders[i].files.length; j++){
                    const currentFile = folders[i].files[j];
                    if(fileId === currentFile.id){
                        return currentFile.code
                    }
                }
            }
        }
    }

    const getLanguage = (fileId,folderId) => {
        for(let i = 0; i<folders.length; i++){
            if(folders[i].id === folderId){
                for(let j = 0; j<folders[i].files.length; j++){
                    const currentFile = folders[i].files[j];
                    if(fileId === currentFile.id){
                        return currentFile.language
                    }
                }
            }
        }
    }

    //this function is created taaki jab bhi user drop down se new language select kre toh 
    //  wo editor pe ussi language ka code aaye
    const updateLanguage = (fileId,folderId, newLanguage) => {
        const newFolders = [...folders]
        for(let i = 0; i<newFolders.length; i++){
            if(newFolders[i].id === folderId){
                for(let j = 0; j<newFolders[i].files.length; j++){
                    const currentFile = newFolders[i].files[j];
                    if(fileId === currentFile.id){
                        newFolders[i].files[j].code = defaultCodes[newLanguage]
                        newFolders[i].files[j].language = newLanguage;
                    }
                }
            }
        }
        localStorage.setItem('data', JSON.stringify(newFolders))
        setFolders(newFolders)
    }

    const saveCode = (fileId , folderId , newCode) => {
        const newFolders = [...folders]
        for(let i = 0; i<newFolders.length; i++){
            if(newFolders[i].id === folderId){
                for(let j = 0; j<newFolders[i].files.length; j++){
                    const currentFile = newFolders[i].files[j];
                    if(fileId === currentFile.id){
                        newFolders[i].files[j].code = newCode
                    }
                }
            }
        }
        localStorage.setItem('data', JSON.stringify(newFolders))
        setFolders(newFolders)
    }

    const getFileTitle = (fileId, folderId) => {
        for(let i = 0; i < folders.length; i++) {
            if(folders[i].id === folderId) {
                for(let j = 0; j < folders[i].files.length; j++) {
                    const currentFile = folders[i].files[j];
                    if(fileId === currentFile.id) {
                        return currentFile.title;
                    }
                }
            }
        }
        return "Untitled"; // Default if not found
    }
//1.ye useEffect() isliye use hua h ki jab bhi playgroundProvider first time render hoga taaki local storage
// mai jaaake ek format m store hue aur jab bhi koi component mount hoga ye useEffect() invoke hoyega

//2. hum local storage mai key, value pairs daalte h toh humari key is "data" and the
//  value is "folders" jisme initalData ka format h toh basically wahi "STRING MAI BADALKE VALUE BANN JAYEGA"
//  tabhi humne "JSON.stringify" use kiya h to convert into "STRING"
    useEffect(() => { 
        if(!localStorage.getItem('data')){
            localStorage.setItem('data', JSON.stringify(folders))
            setFolders(folders)
        }
    }, [folders])

    const playgroundFeatures = {
        folders,
        createPlayground,
        createNewFolder,
        deleteFolder,
        editFolderTitle,
        editFileTitle, 
        deleteFile,
        createNewFile,
        getDefaultCode,
        getLanguage,
        updateLanguage,
        saveCode,
        getFileTitle,
    }
    return(
        <>
        <PlaygroundContext.Provider value={playgroundFeatures}>
            {children}
        </PlaygroundContext.Provider>
        </>
    ); 
}

