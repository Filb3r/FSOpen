const Notification = ({ verifyMessage, errorMessage }) => {
  if(verifyMessage) {
    return(
      <div className="verify">
        {verifyMessage}
      </div>
    )
  } else if (errorMessage){
    return(
      <div className="error">
        {errorMessage}
      </div>
    )
  } else {
    return (
      null
    )
  }
}

export default Notification