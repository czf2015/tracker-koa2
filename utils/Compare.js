export function compareTime(a, b) {
    return Math.sign(new Date(a).getTime() - new Date(b).getTime())
}