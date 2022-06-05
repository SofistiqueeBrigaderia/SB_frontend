import SectionTitle from "components/SectionTitle";
import SquaredButton from "components/SquaredButton";
import { Dialog, DialogActions, Divider } from "@material-ui/core";
import { useState } from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { cartActions } from "store/CartSlice";

const CustomDialog = ({ open, handleClose, currentProps, onButtonClick }) => {
  const [count, setCount] = useState(5);
  const dispatch = useDispatch();

  const addToCart = () => {
    currentProps[0].quantidadePedida = count;
    currentProps[0].valorTotal =
      currentProps[0].preco * currentProps[0].quantidadePedida;

    dispatch(
      cartActions.addPostItem({
        id: currentProps[0].id,
        nome: currentProps[0].nome,
        foto: currentProps[0].foto,
        descricao: currentProps[0].descricao,
        preco: currentProps[0].preco,
        qtd_minima: currentProps[0].qtd_minima,
      })
    );

    dispatch(
      cartActions.addItem({
        id: currentProps[0].id,
        nome: currentProps[0].nome,
        foto: currentProps[0].foto,
        descricao: currentProps[0].descricao,
        preco: currentProps[0].preco,
        qtd_minima: currentProps[0].qtd_minima,
        quantidadePedida: currentProps[0].quantidadePedida,
        valorTotal: currentProps[0].valorTotal,
      })
    );
  };

  const decrementCount = () => {
    if (count > 0) setCount(count - 1);
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    addToCart();
  };

  return (
    <>
      {currentProps && (
        <Dialog
          open={open}
          maxWidth="md"
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modalContainer"
        >
          <div className="modalContentContainer">
            <div style={{ gridColumn: 2, gridRow: 1 }} className="modalHeader">
              <i
                style={{ color: "#5b352c" }}
                onClick={handleClose}
                className="fas fa-times close-btn"
              ></i>
            </div>

            <div
              style={{ gridColumn: 1, gridRow: 2 }}
              className="modalContentImage"
            >
              <img src={currentProps[0].foto} alt={currentProps[0].nome} />
            </div>
            <form
              style={{ gridColumn: 2, gridRow: 2 }}
              className="modalContentInfo"
              onSubmit={submitHandler}
            >
              <SectionTitle margin={false} title={currentProps[0].nome} />

              <Divider />
              <p className="modalContentDescription">
                {currentProps[0].descricao}
              </p>
              <p className="modalContentPrice">
                {currentProps[0].preco &&
                  currentProps[0].preco.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
              </p>
              <div className="modalLabelContainer">
                <label className="modalContentLabel" htmlFor="quantity">
                  Selecione a quantidade
                </label>

                <div className="modalInputContainer">
                  <input
                    type="number"
                    value={count}
                    minLength={currentProps[0].qtd_minima}
                    min={currentProps[0].qtd_minima}
                    onChange={(event) => {
                      const value = Number(event.target.value);
                      setCount(value);
                    }}
                    className="modalInput"
                  />
                  <button
                    type="button"
                    onClick={decrementCount}
                    className="modalInputButtons"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={incrementCount}
                    className="modalInputButtons"
                  >
                    +
                  </button>
                </div>
              </div>

              <DialogActions>
                <SquaredButton
                  onClick={handleClose}
                  title="Comprar"
                  location="/"
                  type="submit"
                />
              </DialogActions>
            </form>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default CustomDialog;
