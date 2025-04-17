import { useContext } from "react"
import { modalConstants, ModalContext } from "../ModalProvider"
import { CreatePlaygroundModal } from "./CreatePlaygroundModal"; 
import { CreateNewFolderModal } from "./CreateNewFolderModal";
import { UpdateFolderTitleModal } from "./UpdateFolderTitleModal";
import { UpdateFileTitleModal } from "./UpdateFileTitleModal";
import { CreateNewFileModal } from "./CreateNewFileModal";



//ye ek generic modal(popup) hai jo saare features jaise openModal, closeModal, activeModal ko consume krega
export const Modal = () => {
    const modalFeatures = useContext(ModalContext)

    // console.log(modalFeatures.activeModal);
    
    return (
        <>
        {/*agar modalFeatures mai active modal ki value "CREATE_PLAYGROUND" hui tabhi 
          "CreatePlaygroundModal" component invoke hoga */}
        {modalFeatures.activeModal === modalConstants.CREATE_PLAYGROUND && <CreatePlaygroundModal/>}
        {modalFeatures.activeModal === modalConstants.CREATE_NEW_FOLDER && <CreateNewFolderModal/>}
        {modalFeatures.activeModal === modalConstants.UPDATE_FOLDER_TITLE && <UpdateFolderTitleModal/>}
        {modalFeatures.activeModal === modalConstants.UPDATE_FILE_TITLE && <UpdateFileTitleModal/>}
        {modalFeatures.activeModal === modalConstants.CREATE_NEW_FILE && <CreateNewFileModal/>}
        </>
    )
}
