let title1 = new MarqueeWidget(115, "Welcome To The...", 100, "bold 26px arial");
title1.setColour("lime");
document.body.appendChild(title1.getDomElement());
title1.play();

let title2 = new MarqueeWidget(220, "national software academy".toUpperCase(), 20, "bold 42px arial", 5);
title2.setColour("pink");
document.body.appendChild(title2.getDomElement());
title2.play();

let title3 = new MarqueeWidget(82, "Information Station, Newport".toUpperCase(), 50, "bold 12px arial", 5);
title3.setColour("lightblue");
document.body.appendChild(title3.getDomElement());
title3.play();

let title4 = new MarqueeWidget(120, "cardiff university".toUpperCase(), 100, "bold 28px arial", 5);
title4.setDomIdOnParent("advert");
document.body.appendChild(title4.getDomElement());
title4.play();
