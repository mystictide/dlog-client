export function setExpirationDate(days) {
  var date = new Date(Date.now());
  date.setDate(date.getDate() + days);
  return date;
}

export function storeWithDate(key, value, days) {
  const item = {
    value: value,
    expiry: setExpirationDate(days),
  };
  localStorage.setItem(key, JSON.stringify(item));
}

export function getWithDate(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}

export function formatDate(date) {
  var options = {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  let date2 = new Date(date);
  return date2.toLocaleTimeString("en-GB", options);
}

export function formatPrettyURL(string) {
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with 'and'
    // .replace(/[^\w-]+/g, "") // Remove all non-word characters
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export function decodeURL(string) {
  return string.toString().replaceAll("-", " ");
}

export function buildFilterURL(reqData) {
  let url = "?Keyword=" + reqData.keyword;
  if (reqData.page > 1) {
    url += "&page=" + reqData.page;
  } else {
    url += "&page=1";
  }
  if (reqData.filterModel) {
    if (reqData.filterModel.categories) {
      let mapped = reqData.filterModel.categories.map((item) => item.ID);
      let ids = mapped.join(",");
      url += "&categories=" + ids;
    }
    if (reqData.filterModel.country) {
      url += "&country=" + reqData.filterModel.country;
    }
    if (reqData.filterModel.author) {
      url += "&author=" + reqData.filterModel.author;
    }
  }
  return url;
}

export function buildHTMLText(method, selection, body) {
  let result = "";
  if (method === "boldify") {
    result = body.replaceAll(selection, `<b>${selection}</b>`);
  }
  if (method === "italify") {
    result = body.replaceAll(selection, `<i>${selection}</i>`);
  }
  if (method === "underscore") {
    result = body.replaceAll(selection, `<u>${selection}</u>`);
  }
  if (method === "headify") {
    result = body.replaceAll(selection, `<h3>${selection}</h3>`);
  }
  if (method === "tinify") {
    result = body.replaceAll(selection, `<small>${selection}</small>`);
  }
  if (method === "linkify") {
    result = body.replaceAll(selection, `<a href="${selection}">link</a>`);
  }
  return result;
}

export function buildLink(body, url, text) {
  body += `<a href="${url}">${text}</a>`;
  return body;
}

export function buildMedia(mode, body, url) {
  //0 image 1 video
  if (mode) {
    body += `<iframe src="${url}"/>`;
    return body;
  } else {
    body += `<img src="${url}"/>`;
    return body;
  }
}

export function readCookie(cookieStore, name) {
  const cookie = cookieStore.get(name) ? cookieStore.get(name).value : null;
  const res = cookie ? JSON.parse(cookie) : null;
  return res;
}
