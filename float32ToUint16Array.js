
// Convert javascript number array (64bit double) to 2xUint16 (representing an IEEE-754 32bit float)
var _float32ToUint16Array = function(number) {
    if (typeof(number) === 'number') {
        number = [number];
    }
    var buffer = new ArrayBuffer(4*number.length);
    var f32Arr = new Float32Array(buffer);
    number.forEach(function(f32, i) {
        f32Arr[i] = f32;
    });
    return Array.from(new Uint16Array(buffer));
};

// Convert 2xUint16 array (representing an IEEE-754 32bit float) to javascript number (64bit double)
var _uint16ArrayToFloat32 = function(arr) {
    var buffer = new ArrayBuffer(4);
    var view = new DataView(buffer);
    // set bytes
    var arr16 = new Uint16Array(arr);
    var arr32 = new Uint32Array(arr16.buffer);
    var result = Array.prototype.map.call(arr32, function (ui32) {
        view.setUint32(0, ui32);
        return view.getFloat32(0, false);
    });
    return result;
};

module.exports = function(RED) {
    function Float32ToUint16ArrayNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', function(msg) {
            msg.payload = _float32ToUint16Array(msg.payload);
            node.send(msg);
        });
    }
    RED.nodes.registerType("float32ToUint16Array", Float32ToUint16ArrayNode);

    function Uint16ArrayToFloat32Node(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', function(msg) {
            msg.payload = _uint16ArrayToFloat32(msg.payload);
            node.send(msg);
        });
    }
    RED.nodes.registerType("uint16ArrayToFloat32", Uint16ArrayToFloat32Node);
}
