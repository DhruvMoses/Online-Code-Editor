import { useContext } from 'react'
import './CreatePlaygroundModal.scss'
import { ModalContext } from '../ModalProvider'
import { PlaygroundContext } from '../PlaygroundProvider'


export const CreatePlaygroundModal = () => {

    const modalFeatures = useContext(ModalContext)
    const playgroundFeatures = useContext(PlaygroundContext)

    const closeModal = () => {
        modalFeatures.closeModal()
    }

    const onSubmitModal = (e) => {
        e.preventDefault()
        const folderName = e.target.folderName.value;
        const fileName = e.target.fileName.value;
        const language = e.target.language.value;

        playgroundFeatures.createPlayground({
            folderName,
            fileName,
            language
        })
        closeModal();
    }

    return (
        <div className='modal-Container'>
            <div>
                <form className='modal-Body' onSubmit={onSubmitModal}>
                <span onClick={closeModal} className="material-symbols-outlined">close</span>
                    <h1>Create New Playground</h1>
                    <div className='item'>
                        <p>Enter folder name </p>
                        <input type="text" name='folderName' required/>
                    </div>
                    <div className='item'>
                        <p>Enter file name </p>
                        <input type="text" name='fileName' required/>
                    </div>
                    <div className='item'required>
                        <select name='language'>
                            <option value="cpp">CPP</option>
                            <option value="java">Java</option>
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                        </select>
                        <button type='submit'>
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>  
    )
}