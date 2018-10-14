
const errorMessage = async (error, badRequestString) => {
    const exception = error.toString()
    if (exception.contains('400')) {
        return badRequestString;
    } else if (exception.contains('404')) {
        return 'notfound'
    } else if (exception.contains('403')) {
        return 'not for u'
    } else {
        return servershat
    }
  }
  export default { errorMessage }