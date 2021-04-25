var Project = /** @class */ (function () {
    function Project() {
        this.inputsData = [];
        this.init();
    }
    Project.prototype.init = function () {
        this.assignData();
        this.assignEvents();
    };
    Project.prototype.assignData = function () {
        var _a;
        this.buttons = (_a = document.getElementById("inputs-container")) === null || _a === void 0 ? void 0 : _a.querySelectorAll("input");
    };
    Project.prototype.assignEvents = function () {
        var _this = this;
        if (this.buttons != undefined) {
            this.buttons.forEach(function (button) {
                button.addEventListener("input", function (e) {
                    _this.updateInputsData();
                    _this.updateData();
                });
            });
        }
    };
    Project.prototype.updateInputsData = function () {
        var _this = this;
        var inputsData = [];
        if (this.buttons != undefined) {
            this.buttons.forEach(function (button) {
                if (_this.isNumber(button.value))
                    inputsData.push(Number(button.value));
            });
        }
        this.inputsData = inputsData;
    };
    Project.prototype.countMin = function () {
        return Math.min.apply(Math, this.inputsData);
    };
    Project.prototype.countMax = function () {
        return Math.max.apply(Math, this.inputsData);
    };
    Project.prototype.countAvg = function () {
        return this.countSum() / this.inputsData.length;
    };
    Project.prototype.countSum = function () {
        var sum = 0;
        this.inputsData.forEach(function (val) {
            sum += val;
        });
        return sum;
    };
    Project.prototype.updateData = function () {
        var inpSum = document.querySelector("#sum");
        var inpAvg = document.querySelector("#avg");
        var inpMin = document.querySelector("#min");
        var inpMax = document.querySelector("#max");
        if (inpSum != null) {
            inpSum.value = String(this.countSum());
        }
        if (inpAvg != null) {
            inpAvg.value = String(this.countAvg());
        }
        if (inpMin != null) {
            inpMin.value = String(this.countMin());
        }
        if (inpMax != null) {
            inpMax.value = String(this.countMax());
        }
    };
    Project.prototype.isNumber = function (value) {
        return ((value != null) && (value !== '') && !isNaN(Number(value.toString())));
    };
    return Project;
}());
var project = new Project();
