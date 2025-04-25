import { useContext } from "react"
import { ModalContext } from "../ModalProvider"
import { PlaygroundContext } from "../PlaygroundProvider"



export const CreateNewFolderModal = () => {
    const modalFeatures = useContext(ModalContext)

    const {createNewFolder} = useContext(PlaygroundContext)

    const closeModal = () => {
        modalFeatures.closeModal();
    }

    const onSubmitModal = (e) => {
        e.preventDefault();
        const folderName = e.target.folderName.value;
        createNewFolder(folderName)
        closeModal();
    }

    return(
        <div className="modal-Container">
            <form className="modal-Body" onSubmit={onSubmitModal}>
                <span onClick={closeModal} className="material-symbols-outlined">close</span>
                <h1>Create New Folder</h1>
                <div style={CreateFolderStyles.inputContainer}>
                <input name="folderName" style={CreateFolderStyles.inputBox} placeholder="Enter Folder Name" required/>
                <button style={CreateFolderStyles.button} type="submit">Create Folder</button>
                </div>
            </form>
        </div>
    )
}
export const CreateFolderStyles = {
    inputContainer: {
        display:"flex",
        gap: "10px",
    },
    inputBox: {
        flexGrow: 3,
        padding: 10,
        borderRadius: 10,
    },
    button: {
        borderRadius: 10,
        border: "none",
        backgroundColor: "#55b6fb",
        padding: "0px 10px",
    }
}    