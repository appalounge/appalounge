
var query = getQueryVars();
document.cookie = "key=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
location.href = (query.path || '/');