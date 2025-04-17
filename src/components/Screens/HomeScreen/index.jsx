import { useContext } from 'react';
import { Modal } from '../../Providers/Modals/Modal';
import './index.scss'
import { RightComponent } from './RightComponent';
import { modalConstants, ModalContext } from '../../Providers/ModalProvider';

//In this we are making the left side of the home screen and
//  importing right side of the home screen

export const HomeScreen = () => {

  const modalFeatures = useContext(ModalContext)

  const openCreatePlaygroundModal = () => {
    modalFeatures.openModal(modalConstants.CREATE_PLAYGROUND)
  }

    return (
      <div className='home-container'>

        {/* Left side of the home screen */}
        <div className='left-container'>
            <div className='items-container'>
                <img src="logo.png" alt="" />
                <h1>CodeCanvas</h1>
                <h2>Code.Compile.Debug</h2>
                <button onClick={openCreatePlaygroundModal}>
                    <span className="material-symbols-outlined">add</span>
                    <span>Create Playground</span>
                </button>
            </div>
            <Modal/>   {/* idhr consume krliya "Modal" component  */}
        </div>

        {/* Right side of the home screen */}
        <div className='right-container'>
            <RightComponent />   {/* idhr consume krliya "RightComponent"  */}
        </div>
      </div>
    );
  };
  
  