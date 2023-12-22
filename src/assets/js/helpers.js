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
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_";
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");

  return (
    string
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, "-and-") // Replace & with 'and'
      // .replace(/[^\w-]+/g, "") // Remove all non-word characters
      .replace(/--+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, "")
  ); // Trim - from end of text
}

export function categoryByName(name) {
  var Categories = {
    tech: 1,
    film: 2,
    music: 3,
    literature: 4,
    memes: 5,
    personal: 6,
  };

  return Categories[name];
}

export function decodeURL(string) {
  return string.toString().replaceAll("-", " ");
}

export function decodeTitle(string) {
  let decoded = {
    id: /[^-]*$/.exec(string)[0],
    title: string.substring(0, string.lastIndexOf("-")),
  };
  return decoded;
}

export function buildFilter(filterData) {
  let filter = {
    id: filterData.id ? filterData.id : 0,
    keyword: filterData.keyword ? filterData.keyword : null,
    category: filterData.category ? filterData.category : 0,
    author: filterData.author ? filterData.author : null,
    page: filterData.page ?? 1,
    sortby: filterData.sortby ?? "desc",
    ismedia: filterData.ismedia ? JSON.parse(filterData.ismedia) : false,
    isadvanced: filterData.isadvanced
      ? JSON.parse(filterData.isadvanced)
      : false,
  };
  return filter;
}

export function buildFilterURL(params) {
  let url = "";
  if (params) {
    url += params.page ? `?page=${params.page}` : "?page=1";
    url += params.keyword ? `&keyword=${params.keyword}` : "&keyword=";
    url += params.category ? `&category=${params.category}` : "&category=";
    url += params.author ? `&author=${params.author}` : "&author=";
    url += params.sortby ? `&sortby=${params.sortby}` : "&sortby=";
    url += params.ismedia ? `&ismedia=${params.ismedia}` : "&ismedia=";
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
    result = body.replaceAll(
      selection,
      `<a aria-label="${selection}" href="${selection}">link</a>`
    );
  }
  if (method === "image") {
    result = body.replaceAll(selection, `<img src="${selection}"/>`);
  }
  if (method === "video") {
    result = body.replaceAll(
      selection,
      `<video controls><source src="${selection}" type="video/mp4"></video>`
    );
  }
  return result;
}

export function buildLink(body, url, text) {
  body += `<a aria-label="${text}" href="${url}">${text}</a>`;
  return body;
}

export function buildMedia(mode, body, url) {
  //0 image 1 video
  if (mode) {
    body += `<video controls><source src="${url}" type="video/mp4"></video>`;
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
