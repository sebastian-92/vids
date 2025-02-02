let params = new URLSearchParams(window.location.search);
let movid = params.get("id");
const streamurl = "";
if (movid) {
  fetch("https://vidapi.cbass92.org/vidsrc/" + movid)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const validsources = [];
      data.sources.forEach((source) => {
        console.log(source);
        if (source.m3u8) {
          validsources.push(source);
        }
        if (validsources.length > 0) {
          streamurl = validsources[0].url;
          const embed = document.createElement("embed");
          embed.frameborder = "0";
          embed.src = "player/index.html#" + streamurl;
          document.body.appendChild(embed);
        } else {
          console.log("No valid sources found. :(");
          document.write("No valid sources found. :(");
        }
      });
    });
} else {
  document.write("No movie ID .'-'.");
}
