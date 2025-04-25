//This componet is for the right side of the home screen
import { useContext } from 'react';
import './index.scss'
import { PlaygroundContext } from '../../../Providers/PlaygroundProvider';
import { modalConstants, ModalContext } from '../../../Providers/ModalProvider';
import { useNavigate } from 'react-router-dom';


//This will take folderTitles and list of cards
const Folder = ({folderTitle, cards,folderId }) => {

    const {deleteFolder , deleteFile} = useContext(PlaygroundContext)
    const {openModal, setModalPayload} = useContext(ModalContext)
    const navigate = useNavigate();


    const onDeleteFolder = () => {
        deleteFolder(folderId)
    }

    const onEditFolderTitle = () => {
        setModalPayload(folderId);
        openModal(modalConstants.UPDATE_FOLDER_TITLE)
    }

    const onCreateNewFile = () => {
        setModalPayload(folderId);
        openModal(modalConstants.CREATE_NEW_FILE)
    }

    return ( 
        //idhr humarae folder aayega jisme cards honge hover effects ke saath 
    <div className='folder-container'>

        <div className='folder-header'>
            <div className='folder-header-items'>
                <span className="material-symbols-outlined" style={{color: "green"}}>folder_open</span>
                <span><b><h2>{folderTitle}</h2></b></span>
            </div>
            <div className='folder-header-items'>
                <span className="material-symbols-outlined" onClick={onDeleteFolder}>delete</span>
                <span className="material-symbols-outlined"onClick={onEditFolderTitle}>border_color</span>
                <button onClick={onCreateNewFile}>
                    <span className="material-symbols-outlined">add</span>
                    <span>New File</span>
                </button>
            </div>
        </div>

        {/* idhr saare cards aayenge mtlb humare folder ke andr jo sub cheezein h */}
        <div className='cards-container'>
            {
                cards?.map((file, index) => {

                    const onEditFile = () => {
                        setModalPayload({fileId: file.id, folderId: folderId})
                        openModal(modalConstants.UPDATE_FILE_TITLE)
                    }

                    const onDeleteFile = () => {
                        deleteFile(folderId , file.id)
                    }

                    const navigateToPlaygroundScreen = () => {
                        navigate(`/playground/${file.id}/${folderId}`)
                    }

                    return (
                    <div className='card' key={index} onClick={navigateToPlaygroundScreen}>
                        <img src="logo_1.jpg"/>
                        <div className='card-description'>
                            <b><span>{file?.title}</span></b>
                            <span>Language:{file?.language}</span>
                        </div>
                        <div className="card-icons" style={{display: 'flex', gap: "10px"}}>
                        <span 
                            className="material-symbols-outlined"
                            onClick={(e) => {
                                e.stopPropagation();   // Prevents file opening
                                deleteFile(folderId, file.id);
                            }}
                        >
                            delete
                        </span>
                            <span 
                                className="material-symbols-outlined" 
                                onClick={(e) => {
                                e.stopPropagation();   // Prevents file opening
                                setModalPayload({fileId: file.id, folderId: folderId});
                                openModal(modalConstants.UPDATE_FILE_TITLE);
                                 }}
                            >
                             border_color
                            </span>
                        </div>
                    </div>
                    );
                })
            }
        </div>
    </div>
)}
export const RightComponent = () => {

    const {folders} = useContext(PlaygroundContext)
    const modalFeatures = useContext(ModalContext)

    const openCreateNewFolderModal = () => {
        modalFeatures.openModal(modalConstants.CREATE_NEW_FOLDER)
    }
       
    
    
    return (
        // iddhr humara right side of home screen hai
        <div className="right-container">

            {/* uppr ka part jidhr title "My Playground likha hai" */}
            <div className='header'>
                <div className='title'><h3><span>My</span> Playground</h3></div>
                <button className='new-folder' onClick={openCreateNewFolderModal}>
                    <span className="material-symbols-outlined">add</span>
                    <span>New Folder</span>
                </button>
            </div>
            
            {
                // ye folders mai dekhega kya folders mai folder aur index h agar hai
                //  toh return krega folder uske "title" aur "cards" ke saath
                folders?.map((folder, index) => {
                    return <Folder folderTitle={folder?.title} cards={folder?.files} folderId={folder.id} key={index}/>
                    //isme "?" isliye hai kyunki wo check krega ki jo folder aaya hai
                    // kya usme title hai? kya usme files hai?
                })
            }

        </div>
    );
}