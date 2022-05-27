import SectionTitle from 'components/SectionTitle';
import SquaredButton from 'components/SquaredButton';
import { Divider, Modal } from '@material-ui/core';
import { useState } from 'react';
import './style.css';

const CustomModal = ({ open, handleClose, currentProps }) => {
  const [count, setCount] = useState(1);

  const decrementCount = () => {
    if (count > 0) setCount(count - 1);
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="modalContainer"
    >
      <div className="modalContentContainer">
        <div style={{ gridColumn: 2, gridRow: 1 }} className="modalHeader">
          <i onClick={handleClose} className="fas fa-times close-btn"></i>
        </div>

        <div style={{ gridColumn: 1, gridRow: 2 }} className="modalContentImage">
          <img src={currentProps[0].img} alt={currentProps[0].title} />
        </div>
        <form
          style={{ gridColumn: 2, gridRow: 2 }}
          className="modalContentInfo"
          onSubmit={submitHandler}
        >
          <SectionTitle margin={false} title={currentProps[0].title} />

          <Divider />
          <p className="modalContentDescription">{currentProps[0].description}</p>
          <p className="modalContentParcels">2x de R${currentProps[0].price / 2},00</p>
          <p className="modalContentPrice">R${currentProps[0].price},00</p>
          <div className="modalLabelContainer">
            <label className="modalContentLabel" htmlFor="quantity">
              Selecione a quantidade
            </label>

            <div className="modalInputContainer">
              <input
                type="number"
                value={count}
                onChange={(event) => {
                  const value = Number(event.target.value);
                  setCount(value);
                }}
                className="modalInput"
              />
              <button type="button" onClick={decrementCount} className="modalInputButtons">
                -
              </button>
              <button type="button" onClick={incrementCount} className="modalInputButtons">
                +
              </button>
            </div>
          </div>
          <SquaredButton title="Comprar" location="/" type="submit" />
        </form>
        {console.log(currentProps)}
      </div>
    </Modal>
  );
};

export default CustomModal;
