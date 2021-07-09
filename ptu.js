// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: magic;
//Script for getting PTU Status from robertspaceindustries.com
let live,ptu
let url = "https://robertsspaceindustries.com/roadmap/progress-tracker/teams"
let view = new WebView()
await view.loadURL(url)
sleep(5000)
let html = await view.getHTML()

//console.log(html.length)
//console.log(html)
let regex_live = /Live Version\: (.*?) /
let regex_ptu = /PTU Version\: (.*?)\</
let version_live = html.match(regex_live)
live = version_live[1]
let version_ptu = html.match(regex_ptu)
ptu = version_ptu[1]

console.log(live)
console.log(ptu)



let widget = createWidget();
if (!config.runsInWidget) {
  await widget.presentSmall()
}
Script.setWidget(widget);
Script.complete();

function createWidget() {
    const w = new ListWidget()
	let row = w.addStack()

	// Ueberschrift
	let texti = row.addText("SC Version")
    texti.font = Font.mediumSystemFont(10)
    texti.centerAlignText()
    w.addSpacer(3)
    row = w.addStack()
    texti = row.addText("Live:")
    row.addSpacer()
    texti = row.addText(live)
    texti.rightAlignText()
    
    row = w.addStack()
    texti = row.addText("PTU:")
    row.addSpacer()
    texti = row.addText(ptu)
    texti.rightAlignText()
    
    return w
}

function sleep(milliseconds) {
    var startTime = new Date().getTime()
    while (new Date().getTime() < startTime + milliseconds)
    {}
}

// <p>Live Version: 3.13.1 (<a href="https://robertsspaceindustries.com/comm-link/transmission/18021-Alpha-313-Underground-Infamy" target="_blank">more info</a>)
// ▪ Latest Roadmap Roundup: 06/30/2021 (<a href="https://robertsspaceindustries.com/comm-link?series=roadmap-roundup" target="_blank">more info</a>) 
// ▪ PTU Version: 3.14.0</p></div></div></div></header>