function turnLeft () {
    keyboard.sendSimultaneousKeys("" + keyboard.modifiers(keyboard._Modifier.shift) + keyboard.keys(keyboard._Key.right), false)
}
function goBack () {
    keyboard.sendString(keyboard.keys(keyboard._Key.down))
}
// determine keys to send based on input text parameter
function makeMove (text: string) {
    // if param is gF, send sh-up
    // else turn hold off and call appropriate move to send keys
    if (text == "gF") {
        tm = text
        if (lm != tm) {
            keyboard.sendSimultaneousKeys("" + keyboard.keys(keyboard._Key.up), true)
        }
        lm = tm
    } else {
        keyboard.releaseKeys()
        if (text == "gB") {
            goBack()
        } else if (text == "gU") {
            goUp()
        } else if (text == "gD") {
            goDown()
        } else if (text == "gR") {
            goRight()
        } else if (text == "tR") {
            turnRight()
        } else if (text == "gL") {
            goLeft()
        } else if (text == "tL") {
            turnLeft()
        } else if (text == "lU") {
            lookUp()
        } else if (text == "lD") {
            lookDown()
        }
        lm = text
    }
}
// For unit test of a single move
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    loadKML()
})
function goForward () {
    keyboard.sendString(keyboard.keys(keyboard._Key.up))
}
function test3 () {
    // PgDown USB hex 4E
    keyboard.sendString(keyboard.rawScancode(78))
}
// using current pitch set leds and make move based on thresholds
function doPitch () {
    if (p > 0 - t1 && p < t1) {
        // hover, no move
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            `)
        makeMove("")
    } else if (p < 0 - t2) {
        // goDown
        basic.showLeds(`
            . . # . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
        makeMove("gD")
    } else if (p < 0 - t1) {
        // goForward
        basic.showLeds(`
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            . . . . .
            `)
        makeMove("gF")
    } else if (p > t2) {
        // goUp
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . # . .
            `)
        makeMove("gU")
    } else if (p > t1) {
        // goUp
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            `)
        makeMove("gU")
    } else {
        makeMove("")
    }
}
function test1 () {
    // result
    // kd shift
    // kd downarrow
    // ku shift
    // ky downarrow
    keyboard.sendSimultaneousKeys("" + keyboard.modifiers(keyboard._Modifier.shift) + keyboard.rawScancode(81), true)
}
// For debugging keystrokes
// Pess B to repeat key
// Press A for next key
function waitA (move: string) {
    while (!(input.buttonIsPressed(Button.A))) {
        if (input.buttonIsPressed(Button.B)) {
            keyboard.releaseKeys()
            makeMove(move)
        }
        continue;
    }
}
function test4 () {
    // PgDown USB hex 4E
    keyboard.sendString(keyboard.rawScancode(75))
}
function loadKML () {
    keyboard.sendSimultaneousKeys("" + keyboard.modifiers(keyboard._Modifier.control) + "i", false)
}
// kd backxpace
// ku backspace
// kd down arrow
// ky down arrow
function test2 () {
    // shift
    keyboard.sendString(keyboard.rawScancode(42))
    // PgDown PS/2
    keyboard.sendString(keyboard.rawScancode(81))
}
function lookUp () {
    keyboard.sendSimultaneousKeys("" + keyboard.modifiers(keyboard._Modifier.shift) + keyboard.keys(keyboard._Key.down), false)
}
function goRight () {
    keyboard.sendString(keyboard.keys(keyboard._Key.right))
}
// pitch takes priority else update leds and make move based on thresholds
function doRoll () {
    if (r > 0 - t1 && r < t1) {
        // no roll, do doPitch
        doPitch()
    } else if (r < 0 - t2) {
        // turnLeft
        basic.showLeds(`
            . . . . .
            . . . . .
            # . . . .
            . . . . .
            . . . . .
            `)
        makeMove("tL")
    } else if (r < 0 - t1) {
        // goLeft
        basic.showLeds(`
            . . . . .
            . . . . .
            . # . . .
            . . . . .
            . . . . .
            `)
        makeMove("gL")
    } else if (r > t2) {
        // turnRight
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . #
            . . . . .
            . . . . .
            `)
        makeMove("tR")
    } else {
        // goRight
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . # .
            . . . . .
            . . . . .
            `)
        makeMove("gR")
    }
}
function goLeft () {
    keyboard.sendString(keyboard.keys(keyboard._Key.left))
}
function turnRight () {
    keyboard.sendSimultaneousKeys("" + keyboard.modifiers(keyboard._Modifier.shift) + keyboard.keys(keyboard._Key.left), false)
}
function lookDown () {
    keyboard.sendSimultaneousKeys("" + keyboard.modifiers(keyboard._Modifier.shift) + keyboard.keys(keyboard._Key.up), false)
}
function goDown () {
    // 0x4B in USB HID standard
    keyboard.sendString(keyboard.rawScancode(75))
}
// For debugging keystrokes
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showString("gF")
    waitA("gF")
    basic.showString("gB")
    waitA("gB")
    basic.showString("gU")
    waitA("gU")
    basic.showString("gD")
    waitA("gD")
    basic.showString("gL")
    waitA("gL")
    basic.showString("tL")
    waitA("tL")
    basic.showString("gR")
    waitA("gR")
    basic.showString("tR")
    waitA("tR")
    basic.showString("lU")
    waitA("lU")
    basic.showString("lD")
    waitA("lD")
})
function goUp () {
    // 0x4E in USB HID standard
    // shows as Ox51 PageDown in KbKeyInfo
    keyboard.sendString(keyboard.rawScancode(78))
}
// - Executes when mbit powered on.
// - t1 & t2 are thresholds in degrees for both pitch and roll
// - keyboard service starts with 1 key/sec
let r = 0
let p = 0
let lm = ""
let tm = ""
let t2 = 0
let t1 = 0
t1 = 20
t2 = 40
keyboard.startKeyboardService()
keyboard.setEventsPerSecond(1)
basic.pause(3000)
loadKML()
// main loop. set vars r and p, call doRoll
basic.forever(function () {
    r = input.rotation(Rotation.Roll)
    p = input.rotation(Rotation.Pitch)
    doRoll()
})
