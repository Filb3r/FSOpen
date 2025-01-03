import { useNotificationValue } from "../NotificationContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const notification = useNotificationValue()
  
  console.log(notification)
  if (!notification) return null

  return (
    <div style={style}>
      <p>{notification}</p>
    </div>
  )
}

export default Notification
