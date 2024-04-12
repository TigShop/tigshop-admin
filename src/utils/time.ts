import dayjs from "dayjs"
export function formatTimestamp(timestamp:any) {
  var date = new Date(timestamp * 1000);

  var year = date.getFullYear();
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  var day = ('0' + date.getDate()).slice(-2);

  var hours = ('0' + date.getHours()).slice(-2);
  var minutes = ('0' + date.getMinutes()).slice(-2);
  var seconds = ('0' + date.getSeconds()).slice(-2);

  var formattedDate = year + '-' + month + '-' + day;
  var formattedTime = hours + ':' + minutes + ':' + seconds;

  return formattedDate + ' ' + formattedTime;
}

export function formattedDate(date:any, type?:string) {
  return dayjs(date).format(type || 'YYYY-MM-DD HH:mm:ss')
}