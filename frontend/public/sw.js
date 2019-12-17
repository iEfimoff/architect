const urlB64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

const saveSubscription = async subscription => {
  console.log(subscription)
  const response = await fetch('/push/save', {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(subscription)
  })
  return response.json()
}

self.addEventListener("install", async () => {
  try {
    const responsePubKey = await fetch('/push/public/key')
    const publicKey = await responsePubKey.text()
    const applicationServerKey = urlB64ToUint8Array(publicKey)
    const options = { applicationServerKey, userVisibleOnly: true }
    const subscription = await self.registration.pushManager.subscribe(options)
    const response = await saveSubscription(subscription)
    console.log(response)
  } catch (err) {
    console.log("Error", err)
  }
})

self.addEventListener('push', function (event) {
  if (event.data) {
    const { title, message } = event.data.json()
    console.log('Push event:', title, ':', message)
    showLocalNotification(title, message, self.registration)
  } else {
    console.log('Push event but no data')
  }
})
const showLocalNotification = (title, body, swRegistration) => {
  const options = {
    body,
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  }
  swRegistration.showNotification(title, options)
}