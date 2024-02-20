import React from 'react'
import './quantityInputWrapper.scss'

const quantityInput = ({el,index,increment,decrement,disable}) => {
    function setInputValue(input, value) {
        let newInput = input.cloneNode(true);
        const parentBox = input.parentElement.getBoundingClientRect();
    
        input.id = "";
    
        newInput.value = value;
    
        if (value > input.value) {
            // right to left
            input.parentElement.appendChild(newInput);
            input.style.marginLeft = -parentBox.width + "px";
        } else if (value < input.value) {
            // left to right
            newInput.style.marginLeft = -parentBox.width + "px";
            input.parentElement.prepend(newInput);
            window.setTimeout(function () {
                newInput.style.marginLeft = 0
            }, 20);
        }
    
        window.setTimeout(function () {
            input.parentElement.removeChild(input);
        }, 250);
    }
    function handleNumberInput() {
        setInputButtonState();
      }
    function handleNumberInputBlur(event) {
            const value = event.target.value;
    
            if (event.target.hasAttribute("min") && value < parseFloat(event.target.min))
                event.target.value = event.target.min;
    
            if (event.target.hasAttribute("max") && value > parseFloat(event.target.max))
                event.target.value = event.target.max;
      }
    
    function setInputButtonState() {
        const inputs = document.getElementsByClassName("number-input-text-box");
    
        for (let input of inputs) {
            if (input.id.length > 0) { // during value transition the old input won't have an id
                const value = input.value;
                const parent = input.parentElement.parentElement;
    
                if (parent.children[0] && input.hasAttribute("min"))
                    parent.children[0].disabled = value <= parseFloat(input.min);
    
                if (parent.children[2] && input.hasAttribute("max"))
                    parent.children[2].disabled = value >= parseFloat(input.max);
            }
        }
      }
    function setNumber(event) {
        let button = event.target;
        let input = document.getElementById(button.dataset.inputId);
    
        if (input) {
            let value = parseFloat(input.value);
            let step = parseFloat(input.dataset.step);
    
            if (button.dataset.operation === "decrement") {
                value -= isNaN(step) ? 1 : step;
                decrement(index)
            } else if (button.dataset.operation === "increment") {
                value += isNaN(step) ? 1 : step;
                increment(index)
            }
    
            if (input.hasAttribute("min") && value < parseFloat(input.min)) {
                value = input.min;
            }
    
            if (input.hasAttribute("max") && value > parseFloat(input.max)) {
                value = input.max;
            }
    
            if (input.value !== value) {
                setInputValue(input, value);
                setInputButtonState();
            }
        }
      }
  return (
    <div>
        <div>
            <div>
                <div>
                </div>
                <div className="number-input-container">
                    <button
                        type="button"
                        className="button-decrement"
                        onClick={setNumber}
                        data-input-id={index}
                        data-operation="decrement"
                        disabled={disable}
                    ></button>
                    <div className="number-input">
                        <input
                            type="number"
                            id={index}
                            name={index}
                            className="number-input-text-box"
                            value={el.quantity}
                            min="1"
                            max="99"
                            onInput={handleNumberInput}
                            onBlur={handleNumberInputBlur}
                            data-step="1"
                            disabled={disable}
                        />
                    </div>
                    <button
                        type="button"
                        className="button-increment"
                        onClick={setNumber}
                        data-input-id={index}
                        data-operation="increment"
                        disabled={disable}
                    ></button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default quantityInput