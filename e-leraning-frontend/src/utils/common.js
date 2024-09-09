export function Slicer(name, n) {
  if (name.length <= n) {
    return name;
  } else {
    return name.slice(0, n) + "...";
  }
}

export function hexToRgba(hexColor) {
  // Remove '#' if present
  if (hexColor.startsWith("#")) {
    hexColor = hexColor.slice(1);
  }

  // Convert hex to rgba
  var r = parseInt(hexColor.substring(0, 2), 16);
  var g = parseInt(hexColor.substring(2, 4), 16);
  var b = parseInt(hexColor.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, 0.25)`;
}

export const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === "production";

export const handleScriptLoad = () => {
  const scriptSrc = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${process.env.NEXT_PUBLIC_ADSENSE_ID}`;
  const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);

  console.log(
    "handleScriptLoad handleScriptLoad handleScriptLoad",
    existingScript
  );

  try {
    if (window.adsbygoogle) {
      console.log("pushing ads");
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } else {
      console.log("Waiting for adsense to load");
    }
  } catch (error) {
    console.log("error from function", error);
  }
};

export const makeFooterSticky = (data) => {
  const footer = document.querySelector(".main-footer-container");

  if (data?.length) {
    footer.style.position = "relative";
    footer.style.bottom = "unset";
  } else {
    footer.style.position = "fixed";
    footer.style.bottom = 0;
    footer.style.width = "100%";
  }
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);

  // Options for formatting the date
  const options = { day: "numeric", month: "short", year: "numeric" };

  // Format the date using toLocaleDateString
  return date.toLocaleDateString("en-GB", options);
};

export const formatDateForBlogDeatail = (dateString) => {
  if (dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options)?.format(date);
  }
};

export const formatReadingTime = (minutes) => {
  if (minutes > 60) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hour${hours > 1 ? "s" : ""}${
      remainingMinutes ? ` and ${remainingMinutes} min` : ""
    } read`;
  }
  return `${minutes}`;
};
export function convertHTML(html) {
  // 1. Convert <p> tags with H1-H6 classes to <h1> to <h6>, and ensure they start on a new line
  html = html.replace(/<p class="H1"[^>]*>(.*?)<\/p>/gi, "\n<h1>$1</h1>\n");
  html = html.replace(/<p class="H2"[^>]*>(.*?)<\/p>/gi, "\n<h2>$1</h2>\n");
  html = html.replace(/<p class="H3"[^>]*>(.*?)<\/p>/gi, "\n<h3>$1</h3>\n");
  html = html.replace(/<p class="H4"[^>]*>(.*?)<\/p>/gi, "\n<h4>$1</h4>\n");
  html = html.replace(/<p class="H5"[^>]*>(.*?)<\/p>/gi, "\n<h5>$1</h5>\n");
  html = html.replace(/<p class="H6"[^>]*>(.*?)<\/p>/gi, "\n<h6>$1</h6>\n");

  // 2. Remove all classes after converting H1-H6
  html = html.replace(/ class="[^"]*"/gi, "");

  // 3. Remove <a> tags with the name attribute but preserve inner content
  html = html.replace(/<a[^>]*name="[^"]*"[^>]*>(.*?)<\/a>/gi, "$1");

  // Add target="_blank" to remaining <a> tags
  html = html.replace(
    /<a(?!.*target="_blank")([^>]*>)/gi,
    '<a target="_blank"$1'
  );

  // 4. Remove style attributes, including in <a> tags
  html = html.replace(/ style="[^"]*"/gi, "");

  // 5. Remove <span> tags but preserve inner content
  html = html.replace(/<\/?span[^>]*>/gi, "");

  // 6. Adjust <table> related tags
  // Remove <table>, <tbody>, <tr>, <td> tags but preserve text content inside the table
  // Add "------Add Topic Box-------" before the original position of the table
  html = html.replace(/<table[^>]*>/gi, "\n------Add Topic Box-------\n"); // Add the topic box
  html = html.replace(/<\/table>/gi, ""); // Remove closing </table> tags
  html = html.replace(/<\/?tbody[^>]*>/gi, ""); // Remove tbody tags
  html = html.replace(/<\/?tr[^>]*>/gi, ""); // Remove tr tags
  html = html.replace(/<\/?td[^>]*>/gi, ""); // Remove td tags

  // Ensure <ul> and <li> structure is properly handled inside <table>
  // Add indentation and new lines for <ul> and <li> tags to make the code cleaner
  html = html.replace(/<ul>/gi, "\n<ul>\n");
  html = html.replace(/<\/ul>/gi, "\n</ul>\n");
  html = html.replace(/<li>/gi, "\t<li>"); // Add tab indentation to <li>
  html = html.replace(/<\/li>/gi, "</li>\n"); // Ensure <li> ends with a newline

  // 7. Replace <b> with <strong>
  html = html.replace(/<b>(.*?)<\/b>/gi, "<strong>$1</strong>");

  // 8. Remove &nbsp;
  html = html.replace(/&nbsp;/g, " ");

  // 9. Remove spaces within <p> tags
  html = html.replace(/<p>(\s*.*?)\s*<\/p>/gi, "<p>$1</p>");

  // 10. Remove empty tags (tags with no content)
  html = html.replace(/<[^\/>][^>]*><\/[^>]+>/gi, "");

  // 11. Remove rows without any code (blank lines)
  html = html.replace(/^\s*$(?:\r\n?|\n)/gm, "");

  // 12. Preserve image and video placeholders (no action needed for now)
  html = html.replace(/<img[^>]*>/gi, "");

  // 13. Ensure elements (<h>, <p>, <ol>, <ul>) start on new lines
  html = html.replace(/<(h[1-6]|p|ol|ul)[^>]*>/gi, "\n<$1>"); // Ensure opening tags start on new lines
  html = html.replace(/<\/(h[1-6]|p|ol|ul)>/gi, "</$1>\n"); // Ensure closing tags end with new lines

  return html;
}
