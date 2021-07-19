import React, {useState} from "react"; 
// firebase
import {db} from './firebase';
import "./Reg.css";

function Reg() {
  const[email, setEmail]= useState(null);
  const[emailError, setEmailError]= useState(null);
  const[phoneError, setPhoneError]= useState(null);
  const[name, setName]= useState(null);
  const[phone, setPhone]= useState(null);
  const[reason, setReason]= useState(null);
  const[date, setDate]= useState(null);
  const[address, setAddress]= useState(null);
  
// Email validation function
  function emailValidation(e) {
    const tempEmail = e;
    const re = /\S+@\S+\.\S+/;
    // re is regex  
    const isValidEmail = re.test(String(tempEmail).toLowerCase());
    console.log(isValidEmail)
    if(isValidEmail===false){
      setEmailError("Please Enter valid email address")
    }else{
      setEmailError(null)
    }
    return isValidEmail
  }

  // Phone Validation function
  function phoneValidation(e) {
    const tempPhone = e;
    const re = /^(?:(?:\\+|0{0,2})91(\s*[\\-]\s*)?|[0]?)?[789]\d{9}$/;
    const isValidPhone = re.test(String(tempPhone).toLowerCase());
    console.log(isValidPhone);

    if(isValidPhone === false){
      setPhoneError("Please Enter valid  Number")
    }else{
      setPhoneError(null)
    }
    return isValidPhone
  }

 
    const [Error, setError] = useState("");
//   adding data to firebase
    function addToFirestore(e) {
    e.preventDefault();
    if(!name || name===" " || !email || email === " " || !phone || phone === " "|| !reason || reason === " "){
     console.log("no valid entry")
     setError("please enter all valid details ");
    return
   }

    // email validation fuction retunring false  if not valid then we should add ! to make if true because we need to terminate function
    if(emailValidation(email)===false){
      return
    }
    //console.log(emailError, "emailerror");
    if(phoneValidation(phone)===false){
      return
    }

    db.collection("users")
      .add({
        name: name,
        email: email,
        reason: reason,
        phone: phone,
      })
      .then(async function (docRef) {
        //emailVerification();
        console.log("added the data to firestore ");
        const {id} = docRef ;
        console.log(docRef.id);
        console.log(id);
      })
      .catch(  function (error) {
        console.log("this is my error ", error);
      });

      clear();
  }

  function clear() {
    setName("");
    setEmail(""); 
    setReason("");
    setPhone("");
    setAddress("");
    setDate("");
    setError("Form has been submitted. Thank you for opting our services");
  }


  return (
    <>
      {/* form section */} 

      {/* {isDelivered ? <h1>your reason has been send to the admin </h1> : */}
      <form>
                <h2>Form</h2>
                
                <div>
                  <input
                placeholder="Name"
                type="text"
                name="firstname"
                required
                onChange={e=>setName(e.target.value)}
                value={name}

              />
              </div>

              {/* email */}
              <div>
              <input
                placeholder="Email"
                type="email"
                name="firstname"
                required
                onChange= {e=>setEmail(e.target.value)}
                value={email}
              />
              <p>{emailError}</p>
              </div>

                {/* Phone number */}
                <div>
                <input
                placeholder="Phone Number"
                type="number"
                name="firstname"
                required
                onChange={e=>setPhone(e.target.value)}
                value={phone}
              />
              <p>{phoneError}</p>
              </div>

                {/* reason */}
              <div>
                <textarea
                placeholder="reason"
                name="description"
                rows="4" cols="20"
                required
                onChange={e=>setReason(e.target.value)}
                value={reason}
                ></textarea>
              <p>{Error}</p>

              </div>  

              <div>
                  <input
                placeholder="DD-MM-YYYY"
                type="text"
                name="date"
                required
                onChange={e=>setDate(e.target.value)}
                value={date}

              />
              </div>  
              <br/>

            {/* reason */}
            <div>
                <textarea
                placeholder="address"
                name="description"
                rows="4" cols="20"
                required
                onChange={e=>setAddress(e.target.value)}
                value={address}
                ></textarea>
              <p>{Error}</p>

              </div>  


            <div>
            <button
            className=""
            type="submit"
            onClick={addToFirestore}
            // onClick={() => history.push("/")}
          >
            Submit
          </button>
          </div>

      </form>
 
              
    </>
  )
}
export default Reg;