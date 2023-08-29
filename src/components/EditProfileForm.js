import React, { useEffect, useState } from 'react'

const EditProfileForm = ({toggleShow, userInfo}) => {
  const [firstName,  setFirstName] = useState(userInfo.firstName);
  const [lastName,  setLastName] = useState(userInfo.lastName);
  const [location, setLocation] = useState(userInfo.profileInfo?.location?userInfo.profileInfo.location:'');
  const [dateOfBirth, setDateOfBirth] = useState(userInfo.profileInfo?.dateOfBirth?userInfo.profileInfo.dateOfBirth:'');
  const [occupation, setOccupation] = useState(userInfo.profileInfo?.occupation?userInfo.profileInfo.occupation:'');
  const [hobbies, setHobbies] = useState(userInfo.profileInfo?.hobbies?userInfo.profileInfo.hobbies:'');

  const [errors, setErrors] = useState(null);

  const hideFormWithPrompt = () => {
    if (window.confirm("Do you really want to close edit profile form?")) {
      toggleShow()
    }
  }

  const submitForm = async(e) => {
    try {

    } catch(err) {
      console.log('error');
    }
  }
  
  const setInitial = () => {
    setFirstName(userInfo.firstName);
    setLastName(userInfo.lastName);
    setLocation(userInfo.profileInfo?.location?userInfo.profileInfo.location:'');
    setDateOfBirth(userInfo.profileInfo?.dateOfBirth?userInfo.profileInfo.dateOfBirth:'');
    setOccupation(userInfo.profileInfo?.occupation?userInfo.profileInfo.occupation:'');
    setHobbies(userInfo.profileInfo?.hobbies?userInfo.profileInfo.hobbies:'');
  }

  useEffect(() => {
    
  }, [location])

  return (
    <div className='pop-up-container' onClick={hideFormWithPrompt}>
      <div onClick={(e) => {e.stopPropagation()}}>
      <h2>Edit Profile</h2>
      <form id='edit-profile-form' onSubmit={submitForm}>
        <label htmlFor="first-name">First Name (required): </label>
        <input type="text" id="first-name" value={firstName} onChange={(e) => {setFirstName(e.target.value)}} required/>
        <label htmlFor="last-name">Last Name (required): </label>
        <input type="text" id="last-name" value={lastName} onChange={(e) => {setLastName(e.target.value)}} required/>
        <label htmlFor="location">Location: </label>
        <input type="text" id="location" value={location} onChange={(e) => {setLocation(e.target.value)}} />
        <label htmlFor="dateOfBirth">Date of birth: </label>
        <input type="date" id="dateOfBirth" value={dateOfBirth} onChange={(e) => {setDateOfBirth(e.target.value)}} />
        <label htmlFor="occupation">Occupation: </label>
        <input type="text" id="occupation" value={occupation} onChange={(e) => {setOccupation(e.target.value)}} />
        <label htmlFor="hobbies">Hobbies: </label>
        <input type="text" id="hobbies" value={hobbies} onChange={(e) => {setHobbies(e.target.value)}} />
        {errors
          ?<div className="errors">
            {errors.map((err, i) => {
              return (
                <p key={i}>{err.msg}</p>
              )
            })}
          </div>
          :null
        }
        <div className='buttons-set'>
          <button type="button" onClick={toggleShow}>Cancel</button>
          <button type="reset" onClick={setInitial}>Reset</button>
          <button type="submit">Submit</button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default EditProfileForm