function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
};

const first = "eviljoel";
const second = Math.pow(2,6);
const third = String.fromCharCode(second);
const fourth = "linux.com";
const fifth = first + String.fromCharCode(second) + fourth;

// id eContactM

document.getElementById("eContactM").innerHTML = `: <a href="mailto:${first}${third}${fourth}" class="footerLink">${first}${third}${fourth}</a>`;
