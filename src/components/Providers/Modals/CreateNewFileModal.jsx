import { useContext } from 'react'
import './CreatePlaygroundModal.scss'
import { ModalContext } from '../ModalProvider'
import { defaultCodes, PlaygroundContext } from '../PlaygroundProvider'
import { v4 as uuidv4 } from 'uuid';

export const CreateNewFileModal = () =>{

    const {closeModal, modalPayload} = useContext(ModalContext)
    const playgroundFeatures = useContext(PlaygroundContext);

    const onSubmitModal = (e) => {
        e.preventDefault();
        const fileName = e.target.fileName.value
        const language = e.target.language.value

        const file = {
            id: uuidv4(),
            title: fileName,
            language: language,
            code: defaultCodes[language]
        }

        playgroundFeatures.createNewFile(modalPayload, file);
        closeModal()
    }

    return (
        <div className="modal-Container">
            <form className="modal-Body" onSubmit={onSubmitModal}>
                <span onClick={closeModal} className="material-symbols-outlined">close</span>
                <h1>Create New Playground</h1>
                <div className='item'>
                    <input type="text" name='fileName' placeholder='Enter file name' required/>
                </div>
                <div className='item'required>
                    <select name='language'>
                        <option value="cpp">CPP</option>
                        <option value="java">Java</option>
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                    </select>
                    <button type='submit'>Create</button>
                </div>
            </form>
        </div>
    )
}