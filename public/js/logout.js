
var query = getQueryVars();
alert(document.cookie);
document.cookie = "key=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
alert(document.cookie);
location.href = (query.path || '/');