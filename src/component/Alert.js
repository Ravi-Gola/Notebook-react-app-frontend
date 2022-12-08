import React, { useContext} from 'react'
import noteContext from '../context/note/noteContext'
const Alert = () => {
    const {display,alertmsg,alerttype}=useContext(noteContext)
  return (
    <div className="container">
      <div className={`alert alert-${alerttype}`} role="alert" style={{display:display}}>
      <strong>{(alerttype==="danger")?"Error":"Success"}! </strong>{alertmsg}
</div>
    </div>
  )
}

export default Alert
