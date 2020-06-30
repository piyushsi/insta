var input = document.getElementById("example");
var card = document.querySelector(".card");
input.addEventListener("keyup", (e) => {
  getInfo(e);
});

function getInfo(e) {
  if (e.keyCode == 13) {
    card.innerHTML = `
    <div class="load"><svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="circle" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg></load>
  `;
    fetch(`https://www.instagram.com/${input.value}/`)
      .then((res) => {
        return res.text();
      })
      .then((res) => {
        if (res.includes("profile_pic_url_hd")) {
          var url = res
            .split("profile_pic_url_hd")[1]
            .split("requested_by_viewer")[0]
            .split('"')[2]
            .split("\\");

          var hd_image_url =
            url[0] +
            "&" +
            url[1].substr(5) +
            "&" +
            url[2].substr(5) +
            "&" +
            url[3].substr(5);

          var title = res.split("<title>")[1].split("</title>")[0];
          var name = title.split("(")[0].substr(1);
          var meta = res
            .split("<meta content=")[1]
            .split(' name="description"')[0];
          var followers = meta.split("Followers")[0].substr(1);
          var following = meta.split("Following")[0].split(" ")[2];
          var posts = meta.split("Posts")[0].split(" ")[4];
          var bio = res.split('"biography":"')[1].split('","blocked_')[0];
          card.innerHTML = `<h2 class="transition">${name}<br><small>Followers-${followers}<br>Following-${following}<br>Posts-${posts}</small></h2>
        <div class="cta-container transition"><a download href=${hd_image_url} class="cta" >Open full size DP</a></div>
        `;
          var circle = document.createElement("div");
          circle.className = "card_circle transition";
          circle.style.background = `url(${hd_image_url}) no-repeat center center`;
          card.append(circle);
          document.querySelector('.insta_link').href=`https://www.instagram.com/${input.value}/`
        } else {
          card.innerHTML = `<div class="cta-container transition"><a href=''class="cta" >user not found</a></div><div class="card_circle transition"></div>`;
        }
      });
  }
}
