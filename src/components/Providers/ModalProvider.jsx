import { createContext, useState } from "react"

//ye ek "GLOBAL MODAL HAI" isme se hi mostly different type ke pop ups jaise delete,edit,create-new
//  pops trigger honge

//ye refrence create krega
export const ModalContext = createContext();

export const modalConstants = {
    CREATE_PLAYGROUND: "CREATE_PLAYGROUND",
    CREATE_NEW_FOLDER: "CREATE_NEW_FOLDER",
    UPDATE_FOLDER_TITLE: "UPDATE_FOLDER_TITLE",
    UPDATE_FILE_TITLE: "UPDATE_FILE_TITLE",
    CREATE_NEW_FILE: "CREATE_NEW_FILE"
}

//this is the main provider that other components of modals will consume the data from
const ModalProvider = ({children}) => {

    //->is state mai popup(modal) type set honge
    // iski default value is "null" taaki koi bhi modal defaultly khula na hoye
    //-> aur ye modal type hai Create Playground,Edit icons, delete icons etc inko
    //  set krta hai
    const [modalType, setModalType] = useState(null)
    const [modalPayload, setModalPayload] = useState(null)

    const closeModal = () => {
        setModalType(null)
        setModalPayload(null)
    }
    // console.log({modalType});

    //ye jo object hai "Popup(Modal)Features" jo hao jab khulega
    // jabusme khulega toh usme open krna hai, close krna hai, khula(acive) hua h 
    const modalFeatures = {
        openModal: setModalType,  //this opens the popup (modal) on clicking and uses setModalType value
        closeModal,   //this closes the popup (modal) on clicking th close (cross) button
        activeModal: modalType,  //this tells the popup (modal) is openend(active) and uses ModalType value
        modalPayload,
        setModalPayload
    }

    return (
        <>
        <ModalContext.Provider  value={modalFeatures}>
            {children}
        </ModalContext.Provider>
        </>
    )
}

export default ModalProvider


