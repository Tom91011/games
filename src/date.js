import dateComponent from './date-component'
export default function getNow(now) {

  if (arguments[0] === "getDate") {

      const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }
      const today  = new Date();
      const date = today.toLocaleDateString("en-US", options)
      return date

  } else if (arguments[0] === "getTime") {

      const today = new Date();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      return time
  }

}

const populateDate = () => {
  const dateEl = document.getElementById("date")
  dateEl.innerHTML = getNow("getDate")
}

const populateTime = () => {
  const timeEl = document.getElementById("time")
  timeEl.innerHTML = getNow("getTime")
}

populateDate()
populateTime()

setInterval(function () {
  populateTime()
},1000)
