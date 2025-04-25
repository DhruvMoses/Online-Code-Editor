import { useContext } from "react"
import "./CreatePlaygroundModal.scss"
import { ModalContext } from "../ModalProvider"
import { CreateFolderStyles } from "./CreateNewFolderModal";
import { PlaygroundContext } from "../PlaygroundProvider";

export const UpdateFileTitleModal = () => {
    const {closeModal, modalPayload} = useContext(ModalContext);
    const {editFileTitle} = useContext(PlaygroundContext)

    const onSubmitModal = (e) => {
        e.preventDefault();
        const fileName = e.target.fileName.value
        editFileTitle(fileName, modalPayload.folderId, modalPayload.fileId)
        closeModal()
    }
    
    return(
        <div className="modal-Container">
            <form className="modal-Body" onSubmit={onSubmitModal}>
                <span onClick={closeModal} className="material-symbols-outlined">close</span>
                <h1>Update Card Title</h1>
                <div style={CreateFolderStyles.inputContainer}>
                    <input name="fileName" style={CreateFolderStyles.inputBox} 
                    placeholder="Enter Folder Name" required/>
                    <button style={CreateFolderStyles.button} type="submit">Create File</button>
                </div>
            </form>
        </div>
    )
}