import { useContext } from "react"
import "./CreatePlaygroundModal.scss"
import { ModalContext } from "../ModalProvider"
import { PlaygroundContext } from "../PlaygroundProvider"
import { CreateFolderStyles } from "./CreateNewFolderModal"

export const UpdateFolderTitleModal = () => {

    const {closeModal, modalPayload} = useContext(ModalContext)
    const {editFolderTitle} = useContext(PlaygroundContext)

    const onSubmitModal = (e) => {
        e.preventDefault();
        const folderName = e.target.folderName.value
        editFolderTitle(folderName, modalPayload)
        closeModal()
    }

    return(
        <div className="modal-Container">
            <form className="modal-Body" onSubmit={onSubmitModal}>
                <span onClick={closeModal} className="material-symbols-outlined">close</span>
                <h1>Update Folder Title</h1>
                <div style={CreateFolderStyles.inputContainer}>
                    <input name="folderName" style={CreateFolderStyles.inputBox} 
                    placeholder="Enter Folder Name" required/>
                    <button style={CreateFolderStyles.button} type="submit">Create Folder</button>
                </div>
            </form>
        </div>
    )
}
