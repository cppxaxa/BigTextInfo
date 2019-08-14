class BigInfoText {
    constructor (displayTimeout = 3000, containerId = "BigInfoText")
    {
        this.visibleCount = 0;
        this.visible = false;
        this.displayTimeout = displayTimeout;
        this.containerId = containerId;
        this.text = "";

        this.quickInterval = 300;
        this.normalInterval = 700;

        this.timeoutThread = null;
    }

    __showTextAnimation() {
        $("#" + this.containerId).fadeIn(this.normalInterval);
    }

    __quickShowTextAnimation() {
        $("#" + this.containerId).fadeIn(this.quickInterval);
    }

    __hideTextAnimation() {
        $("#" + this.containerId).fadeOut(this.normalInterval);
    }

    __quickHideTextAnimation() {
        $("#" + this.containerId).fadeOut(this.quickInterval);
    }

    __disableMessage(obj) {
        // console.log(obj.visibleCount);

        if (--obj.visibleCount == 0){
            obj.visible = false;
            $("#" + obj.containerId).fadeOut(this.normalInterval);
            obj.timeoutThread = null;
        }
    }

    setText(text) {
        this.visibleCount++;

        this.text = text;
        this.__quickHideTextAnimation();

        this.timeoutThread = setTimeout(function(obj) {
            $("#" + obj.containerId).text(text);
            obj.__quickShowTextAnimation();

            obj.timeoutThread = setTimeout(function(obj) {
                obj.timeoutThread = setTimeout(obj.__disableMessage, obj.displayTimeout + obj.normalInterval, obj);

                obj.timeoutThread = null;
            }, obj.normalInterval, obj);
        }, this.quickInterval, this);
    }

    toggle () {
        if (!this.visible) {
            this.visibleCount++;
            this.visible = true;
            $("#" + this.containerId).fadeIn(this.normalInterval);

            this.timeoutThread = setTimeout(this.__disableMessage, this.displayTimeout + this.normalInterval, this);
        }
        else {
            // Get next text
        }
    }
}