

toi = (i) ->
    parseInt(i)

class Direct
    bit = 1
    @LEFT = bit << 0
    @RIGHT = bit << 1
    @UP = bit << 2
    @DOWN = bit << 3

class Point
    constructor:(@x, @y) ->

    length: () ->
        Math.sqrt(@x*@x+@y*@y)

class Util

    @includedAngle: (vec1, vec2) ->
        tmp = 1
        if (vec1.y * vec2.x - vec1.x * vec2.y ) < 0
            tmp *= -1
        dot = (vec1.x * vec2.x + vec1.y * vec2.y)
        len1 = Math.sqrt(vec1.x * vec1.x + vec1.y * vec1.y)
        len2 = Math.sqrt(vec2.x * vec2.x + vec2.y * vec2.y)
        tmp * Math.acos(dot/(len1*len2))


    @toDeg: (r) ->
        r * 180.0 / (Math.atan(1.0) * 4.0)

    @toRad: (deg) ->
        deg * Math.PI / 180

    @toCartesianCoordinates: (r, rad) ->
        return new Point(r * Math.cos(rad), r * Math.sin(rad))


class Stack

    constructor: (@maxSize) ->
        @s = []

    push: (item) ->
        @s.push item if @maxSize >= @s.length

    pop: () ->
        @s.pop() if @s.length > 0

    size: () ->
        @s.length
