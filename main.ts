input.onButtonPressed(Button.A, function () {
    CheckCard()
    DrawCard()
})
function CheckCard () {
    card_result = false
    while (card_result == false) {
        c_num += 1
        if (c_num > 23) {
            c_num = 0
        }
        if (card[c_num] != "0") {
            card_result = true
        }
    }
}
input.onButtonPressed(Button.AB, function () {
    control.reset()
})
function DrawCard () {
    basic.clearScreen()
    for (let card_num = 0; card_num <= 23; card_num++) {
        if (card[card_num] != "0") {
            led.plotBrightness(card_num % 5, Math.trunc(card_num / 5), 15)
        }
    }
    led.plotBrightness(c_num % 5, Math.trunc(c_num / 5), 255)
}
input.onButtonPressed(Button.B, function () {
    es_card_num = c_num
    if (s_card_num != es_card_num) {
        basic.showString("" + (card[es_card_num]))
        basic.pause(500)
        if (s_card_num == -1) {
            s_card_num = es_card_num
            CheckCard()
        } else {
            handling += 1
            if (card[s_card_num] == card[es_card_num]) {
                basic.showIcon(IconNames.Happy)
                clear_count += 1
                if (clear_count == 12) {
                    while (true) {
                        basic.clearScreen()
                        basic.showString("Score:")
                        basic.showNumber(handling)
                    }
                }
                card[s_card_num] = "0"
                card[es_card_num] = "0"
                CheckCard()
            } else {
                basic.showIcon(IconNames.No)
            }
            s_card_num = -1
            basic.pause(500)
        }
        DrawCard()
    }
    es_card_num = -1
})
let card_result = false
let es_card_num = 0
let s_card_num = 0
let c_num = 0
let clear_count = 0
let handling = 0
let taihituka = ""
let f_count = 0
let s_num = 0
let card: string[] = []
let card_g = "A23456789JQK"
for (let counter = 0; counter <= 11; counter++) {
    card.push(card_g.charAt(counter))
    card.push(card_g.charAt(counter))
}
for (let index = 0; index < 100; index++) {
    s_num = Math.randomRange(0, 23)
    f_count = Math.randomRange(0, 23)
    taihituka = card[f_count]
    card[f_count] = card[s_num]
    card[s_num] = taihituka
}
handling = 0
clear_count = 0
c_num = 0
s_card_num = -1
es_card_num = -1
DrawCard()
basic.forever(function () {
    if (s_card_num != -1 && es_card_num == -1) {
        led.toggle(s_card_num % 5, Math.trunc(s_card_num / 5))
    }
})
