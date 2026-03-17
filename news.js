const container = document.getElementById("news-container");

const news = [
{
title:"Request for Startups: Kill Hollywood",
url:"https://www.paulgraham.com/hollywood.html"
},
{
title:"Google Safe Browsing can kill a startup",
url:"https://news.ycombinator.com/item?id=16425747"
},
{
title:"The architecture behind a one-person tech startup",
url:"https://medium.com/"
},
{
title:"NDA expired, let's spill the beans on a weird startup",
url:"https://news.ycombinator.com/"
},
{
title:"Scammed By A Silicon Valley Startup",
url:"https://medium.com/"
},
{
title:"Startup idea checklist",
url:"https://www.paulgraham.com/startupideas.html"
},
{
title:"I started a one-man biz that's beating VC-backed startups",
url:"https://www.indiehackers.com/"
},
{
title:"Startup Playbook",
url:"https://playbook.samaltman.com/"
},
{
title:"Amazon met with startups about investing, then launched competing products",
url:"https://www.wsj.com/"
},
{
title:"My startup failed, and this is what it feels like",
url:"https://medium.com/"
},
{
title:"Frighteningly Ambitious Startup Ideas",
url:"https://blog.samaltman.com/"
},
{
title:"A startup's Firebase bill suddenly increased from $25 to $1750 per month",
url:"https://news.ycombinator.com/"
},
{
title:"How to Get Startup Ideas",
url:"https://www.paulgraham.com/startupideas.html"
}
];

news.forEach(item => {

const div = document.createElement("div");
div.className="news";

div.innerHTML = `
<h3>${item.title}</h3>
<a href="${item.url}" target="_blank">Read</a>
`;

container.appendChild(div);

});