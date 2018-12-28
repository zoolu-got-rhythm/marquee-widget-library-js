
// marquee widget class


/**
 * Represents a marquee widget.
 * @constructor
 * @param {number} maxWidth - width of text container must be smaller than width of contained text.
 * @param {string} title - text string you want to display in the widget.
 * @param {number} delayInMs - speed in millasecs that text is moved to left by x pixels (pixelJump).
 * @param {string} fontSettingsString - font settings: e.g: "bold 28px arial".
 * @param {number} pixelJump - number of pixels to move to the left by each step, (default value is 1px).
 */
function MarqueeWidget(maxWidth, title, delayInMs, fontSettingsString, pixelJump){
    this.maxWidth = maxWidth;
    this.title = title;
    this.delayInMs = delayInMs;
    this.pixelJump = pixelJump || 1;

    this.paddingLeftPosition = 0;

    this.rootElement = document.createElement("div");
    this.rootElement.classList.add("marqueeWidget");
    this.rootElement.style.position = "relative";
    this.rootElement.style.padding = "5px";
    this.rootElement.style.height = getTextHeight(this.title, fontSettingsString) + "px";
    this.rootElement.style.overflow = "hidden";
    this.rootElement.style.width = this.maxWidth + "px";
    this.rootElement.style.border = "5px solid black"; // default colour for widget is black

    this.textNodeElement = document.createTextNode(this.title);

    this.childElement = document.createElement("div");
    this.childElement.style.position = "absolute";
    this.childElement.appendChild(this.textNodeElement);

    this.childElement.style.font = fontSettingsString;
    // this.childElement.style.color = "deeppink";

    var calculatedTextWidth = getTextWidth(this.title, fontSettingsString);
    this.childElement.style.width = calculatedTextWidth + "px";

    this.paddingLeftPositionOffset = calculatedTextWidth - this.maxWidth;

    this.rootElement.appendChild(this.childElement);
}

MarqueeWidget.prototype._sleep = async function(delayInMs){
    return new Promise(resolve => setTimeout(resolve, delayInMs));
};

MarqueeWidget.prototype.getDomElement = function(){
    return this.rootElement;
};

MarqueeWidget.prototype.setDomIdOnParent = function(idName){
    this.rootElement.id = idName;
};

MarqueeWidget.prototype.setColour = function(colour){
    this.rootElement.style.border = `5px solid ${colour}`;
    this.childElement.style.color = colour;
};

MarqueeWidget.prototype.play = async function () {
    var self = this;

    await this._sleep(1500);
    console.log("waiting 1 done");

    await (async function runStep(){

        var timer = window.setInterval(function(){
            console.log(self.paddingLeftPositionOffset);
            console.log(self.paddingLeftPosition);
            self.paddingLeftPosition+=self.pixelJump;
            if(self.paddingLeftPositionOffset >= self.paddingLeftPosition){
                self.childElement.style.left = 5 + (-self.paddingLeftPosition) + "px";
            }else{
                window.clearInterval(timer);
            }
        }, self.delayInMs);

        await self._sleep((self.paddingLeftPositionOffset * self.delayInMs) / self.pixelJump);

    })();
    console.log("waiting 2 done");

    await this._sleep(1500);
    console.log("waiting 3 done");
    this.paddingLeftPosition = 0;
    this.childElement.style.left = 5 + "px";

    // recursive call to self, will this cause problems on call stack?
    this.play();
};

// util functions for getting text width and height without appending to DOM first
function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}

function getTextHeight(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextHeight.canvas || (getTextHeight.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    return parseInt(context.font.match(/\d+/), 10);
}





