import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (input) => input.trim() === "";
const is5Chars = (input) => input.trim().length === 5;

const Checkout = (props) => {
  const [validFrom, setValidForm] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });

  const nameInputRef = useRef();
  const postalCodeInputRef = useRef();
  const streetInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const name = nameInputRef.current.value;
    const street = streetInputRef.current.value;
    const postalCode = postalCodeInputRef.current.value;
    const city = cityInputRef.current.value;

    const validName = !isEmpty(name);
    const validStreet = !isEmpty(street);
    const validCity = !isEmpty(city);
    const validPostalCode = is5Chars(postalCode);

    setValidForm({
      name: validName,
      street: validStreet,
      postalCode: validPostalCode,
      city: validCity,
    });

    const validForm = validName && validPostalCode && validStreet && validCity;

    if (!validForm) {
      return;
    }

    props.sendForm({
        name,
        street,
        postalCode,
        city
    });

  };

  const nameClass = `${classes.control} ${!validFrom.name ? classes.invalid:''}`;
  const streetClass = `${classes.control} ${!validFrom.street ? classes.invalid:''}`;
  const postalCodeClass = `${classes.control} ${!validFrom.postalCode ? classes.invalid:''}`;
  const cityClass = `${classes.control} ${!validFrom.city ? classes.invalid:''}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClass}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!validFrom.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetClass}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!validFrom.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeClass}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!validFrom.postalCode && <p>Please enter a valid postal code!</p>}
      </div>
      <div className={cityClass}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!validFrom.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
