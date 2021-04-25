class Project
{
    buttons: NodeListOf<HTMLInputElement> | undefined;
    inputsData: number[] = [];

    constructor()
    {
        this.init();
    }

    init()
    {
        this.assignData();
        this.assignEvents();
    }

    assignData()
    {
        this.buttons = document.getElementById("inputs-container")?.querySelectorAll("input");

    }

    assignEvents()
    {
        if(this.buttons != undefined) {
            this.buttons.forEach((button: HTMLInputElement) => {
                button.addEventListener("input", (e: any) => {
                    this.updateInputsData();
                    this.updateData();
                });
            });
        }
    }

    updateInputsData()
    {
        let inputsData: number[] = [];

        if(this.buttons != undefined) {
            this.buttons.forEach((button: HTMLInputElement) => {
                if(this.isNumber(button.value))
                    inputsData.push(Number(button.value));
            });
        }

        this.inputsData = inputsData;
    }

    countMin()
    {
        return Math.min.apply(Math, this.inputsData);
    }

    countMax()
    {
        return Math.max.apply(Math, this.inputsData);
    }

    countAvg()
    {
        return this.countSum() / this.inputsData.length;
    }

    countSum()
    {
        let sum = 0;
        this.inputsData.forEach(val => {
            sum += val;
        });

        return sum;
    }

    updateData()
    {
        let inpSum: HTMLInputElement | null = document.querySelector("#sum");
        let inpAvg: HTMLInputElement | null = document.querySelector("#avg");
        let inpMin: HTMLInputElement | null = document.querySelector("#min");
        let inpMax: HTMLInputElement | null = document.querySelector("#max");

        if(inpSum != null) {
            inpSum.value = String(this.countSum());
        }
        if(inpAvg != null) {
            inpAvg.value = String(this.countAvg());
        }
        if(inpMin != null) {
            inpMin.value = String(this.countMin());
        }
        if(inpMax != null) {
            inpMax.value = String(this.countMax());
        }
    }

    isNumber(value: string | number): boolean
    {
        return ((value != null) &&(value !== '') && !isNaN(Number(value.toString())));
    }
}

let project = new Project();