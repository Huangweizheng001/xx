! function a(b, c, d) {
	function e(g, h) {
		if(!c[g]) {
			if(!b[g]) {
				var i = "function" == typeof require && require;
				if(!h && i) return i(g, !0);
				if(f) return f(g, !0);
				var j = new Error("Cannot find module '" + g + "'");
				throw j.code = "MODULE_NOT_FOUND", j
			}
			var k = c[g] = {
				exports: {}
			};
			b[g][0].call(k.exports, function(a) {
				var c = b[g][1][a];
				return e(c || a)
			}, k, k.exports, a, b, c, d)
		}
		return c[g].exports
	}
	for(var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
	return e
}({
	1: [function(a, b, c) {
		! function(a) {
			"use strict";

			function b(a) {
				var b = a.charCodeAt(0);
				return b === f ? 62 : b === g ? 63 : b < h ? -1 : b < h + 10 ? b - h + 26 + 26 : b < j + 26 ? b - j : b < i + 26 ? b - i + 26 : void 0
			}

			function c(a) {
				function c(a) {
					j[l++] = a
				}
				var d, f, g, h, i, j;
				if(a.length % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
				var k = a.length;
				i = "=" === a.charAt(k - 2) ? 2 : "=" === a.charAt(k - 1) ? 1 : 0, j = new e(3 * a.length / 4 - i), g = i > 0 ? a.length - 4 : a.length;
				var l = 0;
				for(d = 0, f = 0; d < g; d += 4, f += 3) h = b(a.charAt(d)) << 18 | b(a.charAt(d + 1)) << 12 | b(a.charAt(d + 2)) << 6 | b(a.charAt(d + 3)), c((16711680 & h) >> 16), c((65280 & h) >> 8), c(255 & h);
				return 2 === i ? (h = b(a.charAt(d)) << 2 | b(a.charAt(d + 1)) >> 4, c(255 & h)) : 1 === i && (h = b(a.charAt(d)) << 10 | b(a.charAt(d + 1)) << 4 | b(a.charAt(d + 2)) >> 2, c(h >> 8 & 255), c(255 & h)), j
			}

			function d(a) {
				function b(a) {
					return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(a)
				}

				function c(a) {
					return b(a >> 18 & 63) + b(a >> 12 & 63) + b(a >> 6 & 63) + b(63 & a)
				}
				var d, e, f, g = a.length % 3,
					h = "";
				for(d = 0, f = a.length - g; d < f; d += 3) e = (a[d] << 16) + (a[d + 1] << 8) + a[d + 2], h += c(e);
				switch(g) {
					case 1:
						e = a[a.length - 1], h += b(e >> 2), h += b(e << 4 & 63), h += "==";
						break;
					case 2:
						e = (a[a.length - 2] << 8) + a[a.length - 1], h += b(e >> 10), h += b(e >> 4 & 63), h += b(e << 2 & 63), h += "="
				}
				return h
			}
			var e = "undefined" != typeof Uint8Array ? Uint8Array : Array,
				f = "+".charCodeAt(0),
				g = "/".charCodeAt(0),
				h = "0".charCodeAt(0),
				i = "a".charCodeAt(0),
				j = "A".charCodeAt(0);
			a.toByteArray = c, a.fromByteArray = d
		}(void 0 === c ? this.base64js = {} : c)
	}, {}],
	2: [function(a, b, c) {
		function d(a, b, c) {
			if(!(this instanceof d)) return new d(a, b, c);
			var e, f = typeof a;
			if("number" === f) e = a > 0 ? a >>> 0 : 0;
			else if("string" === f) "base64" === b && (a = x(a)), e = d.byteLength(a, b);
			else {
				if("object" !== f || null === a) throw new TypeError("must start with number, buffer, array or string");
				"Buffer" === a.type && J(a.data) && (a = a.data), e = +a.length > 0 ? Math.floor(+a.length) : 0
			}
			if(this.length > K) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K.toString(16) + " bytes");
			var g;
			d.TYPED_ARRAY_SUPPORT ? g = d._augment(new Uint8Array(e)) : (g = this, g.length = e, g._isBuffer = !0);
			var h;
			if(d.TYPED_ARRAY_SUPPORT && "number" == typeof a.byteLength) g._set(a);
			else if(z(a))
				if(d.isBuffer(a))
					for(h = 0; h < e; h++) g[h] = a.readUInt8(h);
				else
					for(h = 0; h < e; h++) g[h] = (a[h] % 256 + 256) % 256;
			else if("string" === f) g.write(a, 0, b);
			else if("number" === f && !d.TYPED_ARRAY_SUPPORT && !c)
				for(h = 0; h < e; h++) g[h] = 0;
			return g
		}

		function e(a, b, c, d) {
			c = Number(c) || 0;
			var e = a.length - c;
			d ? (d = Number(d)) > e && (d = e) : d = e;
			var f = b.length;
			if(f % 2 != 0) throw new Error("Invalid hex string");
			d > f / 2 && (d = f / 2);
			for(var g = 0; g < d; g++) {
				var h = parseInt(b.substr(2 * g, 2), 16);
				if(isNaN(h)) throw new Error("Invalid hex string");
				a[c + g] = h
			}
			return g
		}

		function f(a, b, c, d) {
			return F(B(b), a, c, d)
		}

		function g(a, b, c, d) {
			return F(C(b), a, c, d)
		}

		function h(a, b, c, d) {
			return g(a, b, c, d)
		}

		function i(a, b, c, d) {
			return F(E(b), a, c, d)
		}

		function j(a, b, c, d) {
			return F(D(b), a, c, d, 2)
		}

		function k(a, b, c) {
			return 0 === b && c === a.length ? H.fromByteArray(a) : H.fromByteArray(a.slice(b, c))
		}

		function l(a, b, c) {
			var d = "",
				e = "";
			c = Math.min(a.length, c);
			for(var f = b; f < c; f++) a[f] <= 127 ? (d += G(e) + String.fromCharCode(a[f]), e = "") : e += "%" + a[f].toString(16);
			return d + G(e)
		}

		function m(a, b, c) {
			var d = "";
			c = Math.min(a.length, c);
			for(var e = b; e < c; e++) d += String.fromCharCode(a[e]);
			return d
		}

		function n(a, b, c) {
			return m(a, b, c)
		}

		function o(a, b, c) {
			var d = a.length;
			(!b || b < 0) && (b = 0), (!c || c < 0 || c > d) && (c = d);
			for(var e = "", f = b; f < c; f++) e += A(a[f]);
			return e
		}

		function p(a, b, c) {
			for(var d = a.slice(b, c), e = "", f = 0; f < d.length; f += 2) e += String.fromCharCode(d[f] + 256 * d[f + 1]);
			return e
		}

		function q(a, b, c) {
			if(a % 1 != 0 || a < 0) throw new RangeError("offset is not uint");
			if(a + b > c) throw new RangeError("Trying to access beyond buffer length")
		}

		function r(a, b, c, e, f, g) {
			if(!d.isBuffer(a)) throw new TypeError("buffer must be a Buffer instance");
			if(b > f || b < g) throw new TypeError("value is out of bounds");
			if(c + e > a.length) throw new TypeError("index out of range")
		}

		function s(a, b, c, d) {
			b < 0 && (b = 65535 + b + 1);
			for(var e = 0, f = Math.min(a.length - c, 2); e < f; e++) a[c + e] = (b & 255 << 8 * (d ? e : 1 - e)) >>> 8 * (d ? e : 1 - e)
		}

		function t(a, b, c, d) {
			b < 0 && (b = 4294967295 + b + 1);
			for(var e = 0, f = Math.min(a.length - c, 4); e < f; e++) a[c + e] = b >>> 8 * (d ? e : 3 - e) & 255
		}

		function u(a, b, c, d, e, f) {
			if(b > e || b < f) throw new TypeError("value is out of bounds");
			if(c + d > a.length) throw new TypeError("index out of range")
		}

		function v(a, b, c, d, e) {
			return e || u(a, b, c, 4, 3.4028234663852886e38, -3.4028234663852886e38), I.write(a, b, c, d, 23, 4), c + 4
		}

		function w(a, b, c, d, e) {
			return e || u(a, b, c, 8, 1.7976931348623157e308, -1.7976931348623157e308), I.write(a, b, c, d, 52, 8), c + 8
		}

		function x(a) {
			for(a = y(a).replace(M, ""); a.length % 4 != 0;) a += "=";
			return a
		}

		function y(a) {
			return a.trim ? a.trim() : a.replace(/^\s+|\s+$/g, "")
		}

		function z(a) {
			return J(a) || d.isBuffer(a) || a && "object" == typeof a && "number" == typeof a.length
		}

		function A(a) {
			return a < 16 ? "0" + a.toString(16) : a.toString(16)
		}

		function B(a) {
			for(var b = [], c = 0; c < a.length; c++) {
				var d = a.charCodeAt(c);
				if(d <= 127) b.push(d);
				else {
					var e = c;
					d >= 55296 && d <= 57343 && c++;
					for(var f = encodeURIComponent(a.slice(e, c + 1)).substr(1).split("%"), g = 0; g < f.length; g++) b.push(parseInt(f[g], 16))
				}
			}
			return b
		}

		function C(a) {
			for(var b = [], c = 0; c < a.length; c++) b.push(255 & a.charCodeAt(c));
			return b
		}

		function D(a) {
			for(var b, c, d, e = [], f = 0; f < a.length; f++) b = a.charCodeAt(f), c = b >> 8, d = b % 256, e.push(d), e.push(c);
			return e
		}

		function E(a) {
			return H.toByteArray(a)
		}

		function F(a, b, c, d, e) {
			e && (d -= d % e);
			for(var f = 0; f < d && !(f + c >= b.length || f >= a.length); f++) b[f + c] = a[f];
			return f
		}

		function G(a) {
			try {
				return decodeURIComponent(a)
			} catch(a) {
				return String.fromCharCode(65533)
			}
		}
		var H = a("base64-js"),
			I = a("ieee754"),
			J = a("is-array");
		c.Buffer = d, c.SlowBuffer = d, c.INSPECT_MAX_BYTES = 50, d.poolSize = 8192;
		var K = 1073741823;
		d.TYPED_ARRAY_SUPPORT = function() {
			try {
				var a = new ArrayBuffer(0),
					b = new Uint8Array(a);
				return b.foo = function() {
					return 42
				}, 42 === b.foo() && "function" == typeof b.subarray && 0 === new Uint8Array(1).subarray(1, 1).byteLength
			} catch(a) {
				return !1
			}
		}(), d.isBuffer = function(a) {
			return !(null == a || !a._isBuffer)
		}, d.compare = function(a, b) {
			if(!d.isBuffer(a) || !d.isBuffer(b)) throw new TypeError("Arguments must be Buffers");
			for(var c = a.length, e = b.length, f = 0, g = Math.min(c, e); f < g && a[f] === b[f]; f++);
			return f !== g && (c = a[f], e = b[f]), c < e ? -1 : e < c ? 1 : 0
		}, d.isEncoding = function(a) {
			switch(String(a).toLowerCase()) {
				case "hex":
				case "utf8":
				case "utf-8":
				case "ascii":
				case "binary":
				case "base64":
				case "raw":
				case "ucs2":
				case "ucs-2":
				case "utf16le":
				case "utf-16le":
					return !0;
				default:
					return !1
			}
		}, d.concat = function(a, b) {
			if(!J(a)) throw new TypeError("Usage: Buffer.concat(list[, length])");
			if(0 === a.length) return new d(0);
			if(1 === a.length) return a[0];
			var c;
			if(void 0 === b)
				for(b = 0, c = 0; c < a.length; c++) b += a[c].length;
			var e = new d(b),
				f = 0;
			for(c = 0; c < a.length; c++) {
				var g = a[c];
				g.copy(e, f), f += g.length
			}
			return e
		}, d.byteLength = function(a, b) {
			var c;
			switch(a += "", b || "utf8") {
				case "ascii":
				case "binary":
				case "raw":
					c = a.length;
					break;
				case "ucs2":
				case "ucs-2":
				case "utf16le":
				case "utf-16le":
					c = 2 * a.length;
					break;
				case "hex":
					c = a.length >>> 1;
					break;
				case "utf8":
				case "utf-8":
					c = B(a).length;
					break;
				case "base64":
					c = E(a).length;
					break;
				default:
					c = a.length
			}
			return c
		}, d.prototype.length = void 0, d.prototype.parent = void 0, d.prototype.toString = function(a, b, c) {
			var d = !1;
			if(b >>>= 0, c = void 0 === c || c === 1 / 0 ? this.length : c >>> 0, a || (a = "utf8"), b < 0 && (b = 0), c > this.length && (c = this.length), c <= b) return "";
			for(;;) switch(a) {
				case "hex":
					return o(this, b, c);
				case "utf8":
				case "utf-8":
					return l(this, b, c);
				case "ascii":
					return m(this, b, c);
				case "binary":
					return n(this, b, c);
				case "base64":
					return k(this, b, c);
				case "ucs2":
				case "ucs-2":
				case "utf16le":
				case "utf-16le":
					return p(this, b, c);
				default:
					if(d) throw new TypeError("Unknown encoding: " + a);
					a = (a + "").toLowerCase(), d = !0
			}
		}, d.prototype.equals = function(a) {
			if(!d.isBuffer(a)) throw new TypeError("Argument must be a Buffer");
			return 0 === d.compare(this, a)
		}, d.prototype.inspect = function() {
			var a = "",
				b = c.INSPECT_MAX_BYTES;
			return this.length > 0 && (a = this.toString("hex", 0, b).match(/.{2}/g).join(" "), this.length > b && (a += " ... ")), "<Buffer " + a + ">"
		}, d.prototype.compare = function(a) {
			if(!d.isBuffer(a)) throw new TypeError("Argument must be a Buffer");
			return d.compare(this, a)
		}, d.prototype.get = function(a) {
			return console.log(".get() is deprecated. Access using array indexes instead."), this.readUInt8(a)
		}, d.prototype.set = function(a, b) {
			return console.log(".set() is deprecated. Access using array indexes instead."), this.writeUInt8(a, b)
		}, d.prototype.write = function(a, b, c, d) {
			if(isFinite(b)) isFinite(c) || (d = c, c = void 0);
			else {
				var k = d;
				d = b, b = c, c = k
			}
			b = Number(b) || 0;
			var l = this.length - b;
			c ? (c = Number(c)) > l && (c = l) : c = l, d = String(d || "utf8").toLowerCase();
			var m;
			switch(d) {
				case "hex":
					m = e(this, a, b, c);
					break;
				case "utf8":
				case "utf-8":
					m = f(this, a, b, c);
					break;
				case "ascii":
					m = g(this, a, b, c);
					break;
				case "binary":
					m = h(this, a, b, c);
					break;
				case "base64":
					m = i(this, a, b, c);
					break;
				case "ucs2":
				case "ucs-2":
				case "utf16le":
				case "utf-16le":
					m = j(this, a, b, c);
					break;
				default:
					throw new TypeError("Unknown encoding: " + d)
			}
			return m
		}, d.prototype.toJSON = function() {
			return {
				type: "Buffer",
				data: Array.prototype.slice.call(this._arr || this, 0)
			}
		}, d.prototype.slice = function(a, b) {
			var c = this.length;
			if(a = ~~a, b = void 0 === b ? c : ~~b, a < 0 ? (a += c) < 0 && (a = 0) : a > c && (a = c), b < 0 ? (b += c) < 0 && (b = 0) : b > c && (b = c), b < a && (b = a), d.TYPED_ARRAY_SUPPORT) return d._augment(this.subarray(a, b));
			for(var e = b - a, f = new d(e, void 0, !0), g = 0; g < e; g++) f[g] = this[g + a];
			return f
		}, d.prototype.readUInt8 = function(a, b) {
			return b || q(a, 1, this.length), this[a]
		}, d.prototype.readUInt16LE = function(a, b) {
			return b || q(a, 2, this.length), this[a] | this[a + 1] << 8
		}, d.prototype.readUInt16BE = function(a, b) {
			return b || q(a, 2, this.length), this[a] << 8 | this[a + 1]
		}, d.prototype.readUInt32LE = function(a, b) {
			return b || q(a, 4, this.length), (this[a] | this[a + 1] << 8 | this[a + 2] << 16) + 16777216 * this[a + 3]
		}, d.prototype.readUInt32BE = function(a, b) {
			return b || q(a, 4, this.length), 16777216 * this[a] + (this[a + 1] << 16 | this[a + 2] << 8 | this[a + 3])
		}, d.prototype.readInt8 = function(a, b) {
			return b || q(a, 1, this.length), 128 & this[a] ? -1 * (255 - this[a] + 1) : this[a]
		}, d.prototype.readInt16LE = function(a, b) {
			b || q(a, 2, this.length);
			var c = this[a] | this[a + 1] << 8;
			return 32768 & c ? 4294901760 | c : c
		}, d.prototype.readInt16BE = function(a, b) {
			b || q(a, 2, this.length);
			var c = this[a + 1] | this[a] << 8;
			return 32768 & c ? 4294901760 | c : c
		}, d.prototype.readInt32LE = function(a, b) {
			return b || q(a, 4, this.length), this[a] | this[a + 1] << 8 | this[a + 2] << 16 | this[a + 3] << 24
		}, d.prototype.readInt32BE = function(a, b) {
			return b || q(a, 4, this.length), this[a] << 24 | this[a + 1] << 16 | this[a + 2] << 8 | this[a + 3]
		}, d.prototype.readFloatLE = function(a, b) {
			return b || q(a, 4, this.length), I.read(this, a, !0, 23, 4)
		}, d.prototype.readFloatBE = function(a, b) {
			return b || q(a, 4, this.length), I.read(this, a, !1, 23, 4)
		}, d.prototype.readDoubleLE = function(a, b) {
			return b || q(a, 8, this.length), I.read(this, a, !0, 52, 8)
		}, d.prototype.readDoubleBE = function(a, b) {
			return b || q(a, 8, this.length), I.read(this, a, !1, 52, 8)
		}, d.prototype.writeUInt8 = function(a, b, c) {
			return a = +a, b >>>= 0, c || r(this, a, b, 1, 255, 0), d.TYPED_ARRAY_SUPPORT || (a = Math.floor(a)), this[b] = a, b + 1
		}, d.prototype.writeUInt16LE = function(a, b, c) {
			return a = +a, b >>>= 0, c || r(this, a, b, 2, 65535, 0), d.TYPED_ARRAY_SUPPORT ? (this[b] = a, this[b + 1] = a >>> 8) : s(this, a, b, !0), b + 2
		}, d.prototype.writeUInt16BE = function(a, b, c) {
			return a = +a, b >>>= 0, c || r(this, a, b, 2, 65535, 0), d.TYPED_ARRAY_SUPPORT ? (this[b] = a >>> 8, this[b + 1] = a) : s(this, a, b, !1), b + 2
		}, d.prototype.writeUInt32LE = function(a, b, c) {
			return a = +a, b >>>= 0, c || r(this, a, b, 4, 4294967295, 0), d.TYPED_ARRAY_SUPPORT ? (this[b + 3] = a >>> 24, this[b + 2] = a >>> 16, this[b + 1] = a >>> 8, this[b] = a) : t(this, a, b, !0), b + 4
		}, d.prototype.writeUInt32BE = function(a, b, c) {
			return a = +a, b >>>= 0, c || r(this, a, b, 4, 4294967295, 0), d.TYPED_ARRAY_SUPPORT ? (this[b] = a >>> 24, this[b + 1] = a >>> 16, this[b + 2] = a >>> 8, this[b + 3] = a) : t(this, a, b, !1), b + 4
		}, d.prototype.writeInt8 = function(a, b, c) {
			return a = +a, b >>>= 0, c || r(this, a, b, 1, 127, -128), d.TYPED_ARRAY_SUPPORT || (a = Math.floor(a)), a < 0 && (a = 255 + a + 1), this[b] = a, b + 1
		}, d.prototype.writeInt16LE = function(a, b, c) {
			return a = +a, b >>>= 0, c || r(this, a, b, 2, 32767, -32768), d.TYPED_ARRAY_SUPPORT ? (this[b] = a, this[b + 1] = a >>> 8) : s(this, a, b, !0), b + 2
		}, d.prototype.writeInt16BE = function(a, b, c) {
			return a = +a, b >>>= 0, c || r(this, a, b, 2, 32767, -32768), d.TYPED_ARRAY_SUPPORT ? (this[b] = a >>> 8, this[b + 1] = a) : s(this, a, b, !1), b + 2
		}, d.prototype.writeInt32LE = function(a, b, c) {
			return a = +a, b >>>= 0, c || r(this, a, b, 4, 2147483647, -2147483648), d.TYPED_ARRAY_SUPPORT ? (this[b] = a, this[b + 1] = a >>> 8, this[b + 2] = a >>> 16, this[b + 3] = a >>> 24) : t(this, a, b, !0), b + 4
		}, d.prototype.writeInt32BE = function(a, b, c) {
			return a = +a, b >>>= 0, c || r(this, a, b, 4, 2147483647, -2147483648), a < 0 && (a = 4294967295 + a + 1), d.TYPED_ARRAY_SUPPORT ? (this[b] = a >>> 24, this[b + 1] = a >>> 16, this[b + 2] = a >>> 8, this[b + 3] = a) : t(this, a, b, !1), b + 4
		}, d.prototype.writeFloatLE = function(a, b, c) {
			return v(this, a, b, !0, c)
		}, d.prototype.writeFloatBE = function(a, b, c) {
			return v(this, a, b, !1, c)
		}, d.prototype.writeDoubleLE = function(a, b, c) {
			return w(this, a, b, !0, c)
		}, d.prototype.writeDoubleBE = function(a, b, c) {
			return w(this, a, b, !1, c)
		}, d.prototype.copy = function(a, b, c, e) {
			var f = this;
			if(c || (c = 0), e || 0 === e || (e = this.length), b || (b = 0), e !== c && 0 !== a.length && 0 !== f.length) {
				if(e < c) throw new TypeError("sourceEnd < sourceStart");
				if(b < 0 || b >= a.length) throw new TypeError("targetStart out of bounds");
				if(c < 0 || c >= f.length) throw new TypeError("sourceStart out of bounds");
				if(e < 0 || e > f.length) throw new TypeError("sourceEnd out of bounds");
				e > this.length && (e = this.length), a.length - b < e - c && (e = a.length - b + c);
				var g = e - c;
				if(g < 1e3 || !d.TYPED_ARRAY_SUPPORT)
					for(var h = 0; h < g; h++) a[h + b] = this[h + c];
				else a._set(this.subarray(c, c + g), b)
			}
		}, d.prototype.fill = function(a, b, c) {
			if(a || (a = 0), b || (b = 0), c || (c = this.length), c < b) throw new TypeError("end < start");
			if(c !== b && 0 !== this.length) {
				if(b < 0 || b >= this.length) throw new TypeError("start out of bounds");
				if(c < 0 || c > this.length) throw new TypeError("end out of bounds");
				var d;
				if("number" == typeof a)
					for(d = b; d < c; d++) this[d] = a;
				else {
					var e = B(a.toString()),
						f = e.length;
					for(d = b; d < c; d++) this[d] = e[d % f]
				}
				return this
			}
		}, d.prototype.toArrayBuffer = function() {
			if("undefined" != typeof Uint8Array) {
				if(d.TYPED_ARRAY_SUPPORT) return new d(this).buffer;
				for(var a = new Uint8Array(this.length), b = 0, c = a.length; b < c; b += 1) a[b] = this[b];
				return a.buffer
			}
			throw new TypeError("Buffer.toArrayBuffer not supported in this browser")
		};
		var L = d.prototype;
		d._augment = function(a) {
			return a.constructor = d, a._isBuffer = !0, a._get = a.get, a._set = a.set, a.get = L.get, a.set = L.set, a.write = L.write, a.toString = L.toString, a.toLocaleString = L.toString, a.toJSON = L.toJSON, a.equals = L.equals, a.compare = L.compare, a.copy = L.copy, a.slice = L.slice, a.readUInt8 = L.readUInt8, a.readUInt16LE = L.readUInt16LE, a.readUInt16BE = L.readUInt16BE, a.readUInt32LE = L.readUInt32LE, a.readUInt32BE = L.readUInt32BE, a.readInt8 = L.readInt8, a.readInt16LE = L.readInt16LE, a.readInt16BE = L.readInt16BE, a.readInt32LE = L.readInt32LE, a.readInt32BE = L.readInt32BE, a.readFloatLE = L.readFloatLE, a.readFloatBE = L.readFloatBE, a.readDoubleLE = L.readDoubleLE, a.readDoubleBE = L.readDoubleBE, a.writeUInt8 = L.writeUInt8, a.writeUInt16LE = L.writeUInt16LE, a.writeUInt16BE = L.writeUInt16BE, a.writeUInt32LE = L.writeUInt32LE, a.writeUInt32BE = L.writeUInt32BE, a.writeInt8 = L.writeInt8, a.writeInt16LE = L.writeInt16LE, a.writeInt16BE = L.writeInt16BE, a.writeInt32LE = L.writeInt32LE, a.writeInt32BE = L.writeInt32BE, a.writeFloatLE = L.writeFloatLE, a.writeFloatBE = L.writeFloatBE, a.writeDoubleLE = L.writeDoubleLE, a.writeDoubleBE = L.writeDoubleBE, a.fill = L.fill, a.inspect = L.inspect, a.toArrayBuffer = L.toArrayBuffer, a
		};
		var M = /[^+\/0-9A-z]/g
	}, {
		"base64-js": 1,
		ieee754: 37,
		"is-array": 38
	}],
	3: [function(a, b, c) {
		! function(d, e, f) {
			"object" == typeof c ? b.exports = c = e(a("./core"), a("./enc-base64"), a("./md5"), a("./evpkdf"), a("./cipher-core")) : "function" == typeof define && define.amd ? define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], e) : e(d.CryptoJS)
		}(this, function(a) {
			return function() {
				var b = a,
					c = b.lib,
					d = c.BlockCipher,
					e = b.algo,
					f = [],
					g = [],
					h = [],
					i = [],
					j = [],
					k = [],
					l = [],
					m = [],
					n = [],
					o = [];
				! function() {
					for(var a = [], b = 0; b < 256; b++) a[b] = b < 128 ? b << 1 : b << 1 ^ 283;
					for(var c = 0, d = 0, b = 0; b < 256; b++) {
						var e = d ^ d << 1 ^ d << 2 ^ d << 3 ^ d << 4;
						e = e >>> 8 ^ 255 & e ^ 99, f[c] = e, g[e] = c;
						var p = a[c],
							q = a[p],
							r = a[q],
							s = 257 * a[e] ^ 16843008 * e;
						h[c] = s << 24 | s >>> 8, i[c] = s << 16 | s >>> 16, j[c] = s << 8 | s >>> 24, k[c] = s;
						var s = 16843009 * r ^ 65537 * q ^ 257 * p ^ 16843008 * c;
						l[e] = s << 24 | s >>> 8, m[e] = s << 16 | s >>> 16, n[e] = s << 8 | s >>> 24, o[e] = s, c ? (c = p ^ a[a[a[r ^ p]]], d ^= a[a[d]]) : c = d = 1
					}
				}();
				var p = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
					q = e.AES = d.extend({
						_doReset: function() {
							if(!this._nRounds || this._keyPriorReset !== this._key) {
								for(var a = this._keyPriorReset = this._key, b = a.words, c = a.sigBytes / 4, d = this._nRounds = c + 6, e = 4 * (d + 1), g = this._keySchedule = [], h = 0; h < e; h++)
									if(h < c) g[h] = b[h];
									else {
										var i = g[h - 1];
										h % c ? c > 6 && h % c == 4 && (i = f[i >>> 24] << 24 | f[i >>> 16 & 255] << 16 | f[i >>> 8 & 255] << 8 | f[255 & i]) : (i = i << 8 | i >>> 24, i = f[i >>> 24] << 24 | f[i >>> 16 & 255] << 16 | f[i >>> 8 & 255] << 8 | f[255 & i], i ^= p[h / c | 0] << 24), g[h] = g[h - c] ^ i
									}
								for(var j = this._invKeySchedule = [], k = 0; k < e; k++) {
									var h = e - k;
									if(k % 4) var i = g[h];
									else var i = g[h - 4];
									j[k] = k < 4 || h <= 4 ? i : l[f[i >>> 24]] ^ m[f[i >>> 16 & 255]] ^ n[f[i >>> 8 & 255]] ^ o[f[255 & i]]
								}
							}
						},
						encryptBlock: function(a, b) {
							this._doCryptBlock(a, b, this._keySchedule, h, i, j, k, f)
						},
						decryptBlock: function(a, b) {
							var c = a[b + 1];
							a[b + 1] = a[b + 3], a[b + 3] = c, this._doCryptBlock(a, b, this._invKeySchedule, l, m, n, o, g);
							var c = a[b + 1];
							a[b + 1] = a[b + 3], a[b + 3] = c
						},
						_doCryptBlock: function(a, b, c, d, e, f, g, h) {
							for(var i = this._nRounds, j = a[b] ^ c[0], k = a[b + 1] ^ c[1], l = a[b + 2] ^ c[2], m = a[b + 3] ^ c[3], n = 4, o = 1; o < i; o++) {
								var p = d[j >>> 24] ^ e[k >>> 16 & 255] ^ f[l >>> 8 & 255] ^ g[255 & m] ^ c[n++],
									q = d[k >>> 24] ^ e[l >>> 16 & 255] ^ f[m >>> 8 & 255] ^ g[255 & j] ^ c[n++],
									r = d[l >>> 24] ^ e[m >>> 16 & 255] ^ f[j >>> 8 & 255] ^ g[255 & k] ^ c[n++],
									s = d[m >>> 24] ^ e[j >>> 16 & 255] ^ f[k >>> 8 & 255] ^ g[255 & l] ^ c[n++];
								j = p, k = q, l = r, m = s
							}
							var p = (h[j >>> 24] << 24 | h[k >>> 16 & 255] << 16 | h[l >>> 8 & 255] << 8 | h[255 & m]) ^ c[n++],
								q = (h[k >>> 24] << 24 | h[l >>> 16 & 255] << 16 | h[m >>> 8 & 255] << 8 | h[255 & j]) ^ c[n++],
								r = (h[l >>> 24] << 24 | h[m >>> 16 & 255] << 16 | h[j >>> 8 & 255] << 8 | h[255 & k]) ^ c[n++],
								s = (h[m >>> 24] << 24 | h[j >>> 16 & 255] << 16 | h[k >>> 8 & 255] << 8 | h[255 & l]) ^ c[n++];
							a[b] = p, a[b + 1] = q, a[b + 2] = r, a[b + 3] = s
						},
						keySize: 8
					});
				b.AES = d._createHelper(q)
			}(), a.AES
		})
	}, {
		"./cipher-core": 4,
		"./core": 5,
		"./enc-base64": 6,
		"./evpkdf": 8,
		"./md5": 13
	}],
	4: [function(a, b, c) {
		! function(d, e, f) {
			"object" == typeof c ? b.exports = c = e(a("./core"), a("./evpkdf")) : "function" == typeof define && define.amd ? define(["./core", "./evpkdf"], e) : e(d.CryptoJS)
		}(this, function(a) {
			a.lib.Cipher || function(b) {
				var c = a,
					d = c.lib,
					e = d.Base,
					f = d.WordArray,
					g = d.BufferedBlockAlgorithm,
					h = c.enc,
					i = (h.Utf8, h.Base64),
					j = c.algo,
					k = j.EvpKDF,
					l = d.Cipher = g.extend({
						cfg: e.extend(),
						createEncryptor: function(a, b) {
							return this.create(this._ENC_XFORM_MODE, a, b)
						},
						createDecryptor: function(a, b) {
							return this.create(this._DEC_XFORM_MODE, a, b)
						},
						init: function(a, b, c) {
							this.cfg = this.cfg.extend(c), this._xformMode = a, this._key = b, this.reset()
						},
						reset: function() {
							g.reset.call(this), this._doReset()
						},
						process: function(a) {
							return this._append(a), this._process()
						},
						finalize: function(a) {
							return a && this._append(a), this._doFinalize()
						},
						keySize: 4,
						ivSize: 4,
						_ENC_XFORM_MODE: 1,
						_DEC_XFORM_MODE: 2,
						_createHelper: function() {
							function a(a) {
								return "string" == typeof a ? x : u
							}
							return function(b) {
								return {
									encrypt: function(c, d, e) {
										return a(d).encrypt(b, c, d, e)
									},
									decrypt: function(c, d, e) {
										return a(d).decrypt(b, c, d, e)
									}
								}
							}
						}()
					}),
					m = (d.StreamCipher = l.extend({
						_doFinalize: function() {
							return this._process(!0)
						},
						blockSize: 1
					}), c.mode = {}),
					n = d.BlockCipherMode = e.extend({
						createEncryptor: function(a, b) {
							return this.Encryptor.create(a, b)
						},
						createDecryptor: function(a, b) {
							return this.Decryptor.create(a, b)
						},
						init: function(a, b) {
							this._cipher = a, this._iv = b
						}
					}),
					o = m.CBC = function() {
						function a(a, c, d) {
							var e = this._iv;
							if(e) {
								var f = e;
								this._iv = b
							} else var f = this._prevBlock;
							for(var g = 0; g < d; g++) a[c + g] ^= f[g]
						}
						var c = n.extend();
						return c.Encryptor = c.extend({
							processBlock: function(b, c) {
								var d = this._cipher,
									e = d.blockSize;
								a.call(this, b, c, e), d.encryptBlock(b, c), this._prevBlock = b.slice(c, c + e)
							}
						}), c.Decryptor = c.extend({
							processBlock: function(b, c) {
								var d = this._cipher,
									e = d.blockSize,
									f = b.slice(c, c + e);
								d.decryptBlock(b, c), a.call(this, b, c, e), this._prevBlock = f
							}
						}), c
					}(),
					p = c.pad = {},
					q = p.Pkcs7 = {
						pad: function(a, b) {
							for(var c = 4 * b, d = c - a.sigBytes % c, e = d << 24 | d << 16 | d << 8 | d, g = [], h = 0; h < d; h += 4) g.push(e);
							var i = f.create(g, d);
							a.concat(i)
						},
						unpad: function(a) {
							var b = 255 & a.words[a.sigBytes - 1 >>> 2];
							a.sigBytes -= b
						}
					},
					r = (d.BlockCipher = l.extend({
						cfg: l.cfg.extend({
							mode: o,
							padding: q
						}),
						reset: function() {
							l.reset.call(this);
							var a = this.cfg,
								b = a.iv,
								c = a.mode;
							if(this._xformMode == this._ENC_XFORM_MODE) var d = c.createEncryptor;
							else {
								var d = c.createDecryptor;
								this._minBufferSize = 1
							}
							this._mode && this._mode.__creator == d ? this._mode.init(this, b && b.words) : (this._mode = d.call(c, this, b && b.words), this._mode.__creator = d)
						},
						_doProcessBlock: function(a, b) {
							this._mode.processBlock(a, b)
						},
						_doFinalize: function() {
							var a = this.cfg.padding;
							if(this._xformMode == this._ENC_XFORM_MODE) {
								a.pad(this._data, this.blockSize);
								var b = this._process(!0)
							} else {
								var b = this._process(!0);
								a.unpad(b)
							}
							return b
						},
						blockSize: 4
					}), d.CipherParams = e.extend({
						init: function(a) {
							this.mixIn(a)
						},
						toString: function(a) {
							return(a || this.formatter).stringify(this)
						}
					})),
					s = c.format = {},
					t = s.OpenSSL = {
						stringify: function(a) {
							var b = a.ciphertext,
								c = a.salt;
							if(c) var d = f.create([1398893684, 1701076831]).concat(c).concat(b);
							else var d = b;
							return d.toString(i)
						},
						parse: function(a) {
							var b = i.parse(a),
								c = b.words;
							if(1398893684 == c[0] && 1701076831 == c[1]) {
								var d = f.create(c.slice(2, 4));
								c.splice(0, 4), b.sigBytes -= 16
							}
							return r.create({
								ciphertext: b,
								salt: d
							})
						}
					},
					u = d.SerializableCipher = e.extend({
						cfg: e.extend({
							format: t
						}),
						encrypt: function(a, b, c, d) {
							d = this.cfg.extend(d);
							var e = a.createEncryptor(c, d),
								f = e.finalize(b),
								g = e.cfg;
							return r.create({
								ciphertext: f,
								key: c,
								iv: g.iv,
								algorithm: a,
								mode: g.mode,
								padding: g.padding,
								blockSize: a.blockSize,
								formatter: d.format
							})
						},
						decrypt: function(a, b, c, d) {
							return d = this.cfg.extend(d), b = this._parse(b, d.format), a.createDecryptor(c, d).finalize(b.ciphertext)
						},
						_parse: function(a, b) {
							return "string" == typeof a ? b.parse(a, this) : a
						}
					}),
					v = c.kdf = {},
					w = v.OpenSSL = {
						execute: function(a, b, c, d) {
							d || (d = f.random(8));
							var e = k.create({
									keySize: b + c
								}).compute(a, d),
								g = f.create(e.words.slice(b), 4 * c);
							return e.sigBytes = 4 * b, r.create({
								key: e,
								iv: g,
								salt: d
							})
						}
					},
					x = d.PasswordBasedCipher = u.extend({
						cfg: u.cfg.extend({
							kdf: w
						}),
						encrypt: function(a, b, c, d) {
							d = this.cfg.extend(d);
							var e = d.kdf.execute(c, a.keySize, a.ivSize);
							d.iv = e.iv;
							var f = u.encrypt.call(this, a, b, e.key, d);
							return f.mixIn(e), f
						},
						decrypt: function(a, b, c, d) {
							d = this.cfg.extend(d), b = this._parse(b, d.format);
							var e = d.kdf.execute(c, a.keySize, a.ivSize, b.salt);
							return d.iv = e.iv, u.decrypt.call(this, a, b, e.key, d)
						}
					})
			}()
		})
	}, {
		"./core": 5,
		"./evpkdf": 8
	}],
	5: [function(a, b, c) {
		! function(a, d) {
			"object" == typeof c ? b.exports = c = d() : "function" == typeof define && define.amd ? define([], d) : a.CryptoJS = d()
		}(this, function() {
			var a = a || function(a, b) {
				var c = Object.create || function() {
						function a() {}
						return function(b) {
							var c;
							return a.prototype = b, c = new a, a.prototype = null, c
						}
					}(),
					d = {},
					e = d.lib = {},
					f = e.Base = function() {
						return {
							extend: function(a) {
								var b = c(this);
								return a && b.mixIn(a), b.hasOwnProperty("init") && this.init !== b.init || (b.init = function() {
									b.$super.init.apply(this, arguments)
								}), b.init.prototype = b, b.$super = this, b
							},
							create: function() {
								var a = this.extend();
								return a.init.apply(a, arguments), a
							},
							init: function() {},
							mixIn: function(a) {
								for(var b in a) a.hasOwnProperty(b) && (this[b] = a[b]);
								a.hasOwnProperty("toString") && (this.toString = a.toString)
							},
							clone: function() {
								return this.init.prototype.extend(this)
							}
						}
					}(),
					g = e.WordArray = f.extend({
						init: function(a, c) {
							a = this.words = a || [], this.sigBytes = c != b ? c : 4 * a.length
						},
						toString: function(a) {
							return(a || i).stringify(this)
						},
						concat: function(a) {
							var b = this.words,
								c = a.words,
								d = this.sigBytes,
								e = a.sigBytes;
							if(this.clamp(), d % 4)
								for(var f = 0; f < e; f++) {
									var g = c[f >>> 2] >>> 24 - f % 4 * 8 & 255;
									b[d + f >>> 2] |= g << 24 - (d + f) % 4 * 8
								} else
									for(var f = 0; f < e; f += 4) b[d + f >>> 2] = c[f >>> 2];
							return this.sigBytes += e, this
						},
						clamp: function() {
							var b = this.words,
								c = this.sigBytes;
							b[c >>> 2] &= 4294967295 << 32 - c % 4 * 8, b.length = a.ceil(c / 4)
						},
						clone: function() {
							var a = f.clone.call(this);
							return a.words = this.words.slice(0), a
						},
						random: function(b) {
							for(var c, d = [], e = function(b) {
									var b = b,
										c = 987654321,
										d = 4294967295;
									return function() {
										c = 36969 * (65535 & c) + (c >> 16) & d, b = 18e3 * (65535 & b) + (b >> 16) & d;
										var e = (c << 16) + b & d;
										return e /= 4294967296, (e += .5) * (a.random() > .5 ? 1 : -1)
									}
								}, f = 0; f < b; f += 4) {
								var h = e(4294967296 * (c || a.random()));
								c = 987654071 * h(), d.push(4294967296 * h() | 0)
							}
							return new g.init(d, b)
						}
					}),
					h = d.enc = {},
					i = h.Hex = {
						stringify: function(a) {
							for(var b = a.words, c = a.sigBytes, d = [], e = 0; e < c; e++) {
								var f = b[e >>> 2] >>> 24 - e % 4 * 8 & 255;
								d.push((f >>> 4).toString(16)), d.push((15 & f).toString(16))
							}
							return d.join("")
						},
						parse: function(a) {
							for(var b = a.length, c = [], d = 0; d < b; d += 2) c[d >>> 3] |= parseInt(a.substr(d, 2), 16) << 24 - d % 8 * 4;
							return new g.init(c, b / 2)
						}
					},
					j = h.Latin1 = {
						stringify: function(a) {
							for(var b = a.words, c = a.sigBytes, d = [], e = 0; e < c; e++) {
								var f = b[e >>> 2] >>> 24 - e % 4 * 8 & 255;
								d.push(String.fromCharCode(f))
							}
							return d.join("")
						},
						parse: function(a) {
							for(var b = a.length, c = [], d = 0; d < b; d++) c[d >>> 2] |= (255 & a.charCodeAt(d)) << 24 - d % 4 * 8;
							return new g.init(c, b)
						}
					},
					k = h.Utf8 = {
						stringify: function(a) {
							try {
								return decodeURIComponent(escape(j.stringify(a)))
							} catch(a) {
								throw new Error("Malformed UTF-8 data")
							}
						},
						parse: function(a) {
							return j.parse(unescape(encodeURIComponent(a)))
						}
					},
					l = e.BufferedBlockAlgorithm = f.extend({
						reset: function() {
							this._data = new g.init, this._nDataBytes = 0
						},
						_append: function(a) {
							"string" == typeof a && (a = k.parse(a)), this._data.concat(a), this._nDataBytes += a.sigBytes
						},
						_process: function(b) {
							var c = this._data,
								d = c.words,
								e = c.sigBytes,
								f = this.blockSize,
								h = 4 * f,
								i = e / h;
							i = b ? a.ceil(i) : a.max((0 | i) - this._minBufferSize, 0);
							var j = i * f,
								k = a.min(4 * j, e);
							if(j) {
								for(var l = 0; l < j; l += f) this._doProcessBlock(d, l);
								var m = d.splice(0, j);
								c.sigBytes -= k
							}
							return new g.init(m, k)
						},
						clone: function() {
							var a = f.clone.call(this);
							return a._data = this._data.clone(), a
						},
						_minBufferSize: 0
					}),
					m = (e.Hasher = l.extend({
						cfg: f.extend(),
						init: function(a) {
							this.cfg = this.cfg.extend(a), this.reset()
						},
						reset: function() {
							l.reset.call(this), this._doReset()
						},
						update: function(a) {
							return this._append(a), this._process(), this
						},
						finalize: function(a) {
							return a && this._append(a), this._doFinalize()
						},
						blockSize: 16,
						_createHelper: function(a) {
							return function(b, c) {
								return new a.init(c).finalize(b)
							}
						},
						_createHmacHelper: function(a) {
							return function(b, c) {
								return new m.HMAC.init(a, c).finalize(b)
							}
						}
					}), d.algo = {});
				return d
			}(Math);
			return a
		})
	}, {}],
	6: [function(a, b, c) {
		! function(d, e) {
			"object" == typeof c ? b.exports = c = e(a("./core")) : "function" == typeof define && define.amd ? define(["./core"], e) : e(d.CryptoJS)
		}(this, function(a) {
			return function() {
				function b(a, b, c) {
					for(var d = [], f = 0, g = 0; g < b; g++)
						if(g % 4) {
							var h = c[a.charCodeAt(g - 1)] << g % 4 * 2,
								i = c[a.charCodeAt(g)] >>> 6 - g % 4 * 2;
							d[f >>> 2] |= (h | i) << 24 - f % 4 * 8, f++
						}
					return e.create(d, f)
				}
				var c = a,
					d = c.lib,
					e = d.WordArray,
					f = c.enc;
				f.Base64 = {
					stringify: function(a) {
						var b = a.words,
							c = a.sigBytes,
							d = this._map;
						a.clamp();
						for(var e = [], f = 0; f < c; f += 3)
							for(var g = b[f >>> 2] >>> 24 - f % 4 * 8 & 255, h = b[f + 1 >>> 2] >>> 24 - (f + 1) % 4 * 8 & 255, i = b[f + 2 >>> 2] >>> 24 - (f + 2) % 4 * 8 & 255, j = g << 16 | h << 8 | i, k = 0; k < 4 && f + .75 * k < c; k++) e.push(d.charAt(j >>> 6 * (3 - k) & 63));
						var l = d.charAt(64);
						if(l)
							for(; e.length % 4;) e.push(l);
						return e.join("")
					},
					parse: function(a) {
						var c = a.length,
							d = this._map,
							e = this._reverseMap;
						if(!e) {
							e = this._reverseMap = [];
							for(var f = 0; f < d.length; f++) e[d.charCodeAt(f)] = f
						}
						var g = d.charAt(64);
						if(g) {
							var h = a.indexOf(g); - 1 !== h && (c = h)
						}
						return b(a, c, e)
					},
					_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
				}
			}(), a.enc.Base64
		})
	}, {
		"./core": 5
	}],
	7: [function(a, b, c) {
		! function(d, e) {
			"object" == typeof c ? b.exports = c = e(a("./core")) : "function" == typeof define && define.amd ? define(["./core"], e) : e(d.CryptoJS)
		}(this, function(a) {
			return function() {
				function b(a) {
					return a << 8 & 4278255360 | a >>> 8 & 16711935
				}
				var c = a,
					d = c.lib,
					e = d.WordArray,
					f = c.enc;
				f.Utf16 = f.Utf16BE = {
					stringify: function(a) {
						for(var b = a.words, c = a.sigBytes, d = [], e = 0; e < c; e += 2) {
							var f = b[e >>> 2] >>> 16 - e % 4 * 8 & 65535;
							d.push(String.fromCharCode(f))
						}
						return d.join("")
					},
					parse: function(a) {
						for(var b = a.length, c = [], d = 0; d < b; d++) c[d >>> 1] |= a.charCodeAt(d) << 16 - d % 2 * 16;
						return e.create(c, 2 * b)
					}
				};
				f.Utf16LE = {
					stringify: function(a) {
						for(var c = a.words, d = a.sigBytes, e = [], f = 0; f < d; f += 2) {
							var g = b(c[f >>> 2] >>> 16 - f % 4 * 8 & 65535);
							e.push(String.fromCharCode(g))
						}
						return e.join("")
					},
					parse: function(a) {
						for(var c = a.length, d = [], f = 0; f < c; f++) d[f >>> 1] |= b(a.charCodeAt(f) << 16 - f % 2 * 16);
						return e.create(d, 2 * c)
					}
				}
			}(), a.enc.Utf16
		})
	}, {
		"./core": 5
	}],
	8: [function(a, b, c) {
		! function(d, e, f) {
			"object" == typeof c ? b.exports = c = e(a("./core"), a("./sha1"), a("./hmac")) : "function" == typeof define && define.amd ? define(["./core", "./sha1", "./hmac"], e) : e(d.CryptoJS)
		}(this, function(a) {
			return function() {
				var b = a,
					c = b.lib,
					d = c.Base,
					e = c.WordArray,
					f = b.algo,
					g = f.MD5,
					h = f.EvpKDF = d.extend({
						cfg: d.extend({
							keySize: 4,
							hasher: g,
							iterations: 1
						}),
						init: function(a) {
							this.cfg = this.cfg.extend(a)
						},
						compute: function(a, b) {
							for(var c = this.cfg, d = c.hasher.create(), f = e.create(), g = f.words, h = c.keySize, i = c.iterations; g.length < h;) {
								j && d.update(j);
								var j = d.update(a).finalize(b);
								d.reset();
								for(var k = 1; k < i; k++) j = d.finalize(j), d.reset();
								f.concat(j)
							}
							return f.sigBytes = 4 * h, f
						}
					});
				b.EvpKDF = function(a, b, c) {
					return h.create(c).compute(a, b)
				}
			}(), a.EvpKDF
		})
	}, {
		"./core": 5,
		"./hmac": 10,
		"./sha1": 29
	}],
	9: [function(a, b, c) {
		! function(d, e, f) {
			"object" == typeof c ? b.exports = c = e(a("./core"), a("./cipher-core")) : "function" == typeof define && define.amd ? define(["./core", "./cipher-core"], e) : e(d.CryptoJS)
		}(this, function(a) {
			return function(b) {
				var c = a,
					d = c.lib,
					e = d.CipherParams,
					f = c.enc,
					g = f.Hex,
					h = c.format;
				h.Hex = {
					stringify: function(a) {
						return a.ciphertext.toString(g)
					},
					parse: function(a) {
						var b = g.parse(a);
						return e.create({
							ciphertext: b
						})
					}
				}
			}(), a.format.Hex
		})
	}, {
		"./cipher-core": 4,
		"./core": 5
	}],
	10: [function(a, b, c) {
		! function(d, e) {
			"object" == typeof c ? b.exports = c = e(a("./core")) : "function" == typeof define && define.amd ? define(["./core"], e) : e(d.CryptoJS)
		}(this, function(a) {
			! function() {
				var b = a,
					c = b.lib,
					d = c.Base,
					e = b.enc,
					f = e.Utf8,
					g = b.algo;
				g.HMAC = d.extend({
					init: function(a, b) {
						a = this._hasher = new a.init, "string" == typeof b && (b = f.parse(b));
						var c = a.blockSize,
							d = 4 * c;
						b.sigBytes > d && (b = a.finalize(b)), b.clamp();
						for(var e = this._oKey = b.clone(), g = this._iKey = b.clone(), h = e.words, i = g.words, j = 0; j < c; j++) h[j] ^= 1549556828, i[j] ^= 909522486;
						e.sigBytes = g.sigBytes = d, this.reset()
					},
					reset: function() {
						var a = this._hasher;
						a.reset(), a.update(this._iKey)
					},
					update: function(a) {
						return this._hasher.update(a), this
					},
					finalize: function(a) {
						var b = this._hasher,
							c = b.finalize(a);
						return b.reset(), b.finalize(this._oKey.clone().concat(c))
					}
				})
			}()
		})
	}, {
		"./core": 5
	}],
	11: [function(a, b, c) {
		! function(d, e, f) {
			"object" == typeof c ? b.exports = c = e(a("./core"), a("./x64-core"), a("./lib-typedarrays"), a("./enc-utf16"), a("./enc-base64"), a("./md5"), a("./sha1"), a("./sha256"), a("./sha224"), a("./sha512"), a("./sha384"), a("./sha3"), a("./ripemd160"), a("./hmac"), a("./pbkdf2"), a("./evpkdf"), a("./cipher-core"), a("./mode-cfb"), a("./mode-ctr"), a("./mode-ctr-gladman"), a("./mode-ofb"), a("./mode-ecb"), a("./pad-ansix923"), a("./pad-iso10126"), a("./pad-iso97971"), a("./pad-zeropadding"), a("./pad-nopadding"), a("./format-hex"), a("./aes"), a("./tripledes"), a("./rc4"), a("./rabbit"), a("./rabbit-legacy")) : "function" == typeof define && define.amd ? define(["./core", "./x64-core", "./lib-typedarrays", "./enc-utf16", "./enc-base64", "./md5", "./sha1", "./sha256", "./sha224", "./sha512", "./sha384", "./sha3", "./ripemd160", "./hmac", "./pbkdf2", "./evpkdf", "./cipher-core", "./mode-cfb", "./mode-ctr", "./mode-ctr-gladman", "./mode-ofb", "./mode-ecb", "./pad-ansix923", "./pad-iso10126", "./pad-iso97971", "./pad-zeropadding", "./pad-nopadding", "./format-hex", "./aes", "./tripledes", "./rc4", "./rabbit", "./rabbit-legacy"], e) : d.CryptoJS = e(d.CryptoJS)
		}(this, function(a) {
			return a
		})
	}, {
		"./aes": 3,
		"./cipher-core": 4,
		"./core": 5,
		"./enc-base64": 6,
		"./enc-utf16": 7,
		"./evpkdf": 8,
		"./format-hex": 9,
		"./hmac": 10,
		"./lib-typedarrays": 12,
		"./md5": 13,
		"./mode-cfb": 14,
		"./mode-ctr": 16,
		"./mode-ctr-gladman": 15,
		"./mode-ecb": 17,
		"./mode-ofb": 18,
		"./pad-ansix923": 19,
		"./pad-iso10126": 20,
		"./pad-iso97971": 21,
		"./pad-nopadding": 22,
		"./pad-zeropadding": 23,
		"./pbkdf2": 24,
		"./rabbit": 26,
		"./rabbit-legacy": 25,
		"./rc4": 27,
		"./ripemd160": 28,
		"./sha1": 29,
		"./sha224": 30,
		"./sha256": 31,
		"./sha3": 32,
		"./sha384": 33,
		"./sha512": 34,
		"./tripledes": 35,
		"./x64-core": 36
	}],
	12: [function(a, b, c) {
		! function(d, e) {
			"object" == typeof c ? b.exports = c = e(a("./core")) : "function" == typeof define && define.amd ? define(["./core"], e) : e(d.CryptoJS)
		}(this, function(a) {
			return function() {
				if("function" == typeof ArrayBuffer) {
					var b = a,
						c = b.lib,
						d = c.WordArray,
						e = d.init;
					(d.init = function(a) {
						if(a instanceof ArrayBuffer && (a = new Uint8Array(a)),
							(a instanceof Int8Array || "undefined" != typeof Uint8ClampedArray && a instanceof Uint8ClampedArray || a instanceof Int16Array || a instanceof Uint16Array || a instanceof Int32Array || a instanceof Uint32Array || a instanceof Float32Array || a instanceof Float64Array) && (a = new Uint8Array(a.buffer, a.byteOffset, a.byteLength)), a instanceof Uint8Array) {
							for(var b = a.byteLength, c = [], d = 0; d < b; d++) c[d >>> 2] |= a[d] << 24 - d % 4 * 8;
							e.call(this, c, b)
						} else e.apply(this, arguments)
					}).prototype = d
				}
			}(), a.lib.WordArray
		})
	}, {
		"./core": 5
	}],
	13: [function(a, b, c) {
		! function(d, e) {
			"object" == typeof c ? b.exports = c = e(a("./core")) : "function" == typeof define && define.amd ? define(["./core"], e) : e(d.CryptoJS)
		}(this, function(a) {
			return function(b) {
				function c(a, b, c, d, e, f, g) {
					var h = a + (b & c | ~b & d) + e + g;
					return(h << f | h >>> 32 - f) + b
				}

				function d(a, b, c, d, e, f, g) {
					var h = a + (b & d | c & ~d) + e + g;
					return(h << f | h >>> 32 - f) + b
				}

				function e(a, b, c, d, e, f, g) {
					var h = a + (b ^ c ^ d) + e + g;
					return(h << f | h >>> 32 - f) + b
				}

				function f(a, b, c, d, e, f, g) {
					var h = a + (c ^ (b | ~d)) + e + g;
					return(h << f | h >>> 32 - f) + b
				}
				var g = a,
					h = g.lib,
					i = h.WordArray,
					j = h.Hasher,
					k = g.algo,
					l = [];
				! function() {
					for(var a = 0; a < 64; a++) l[a] = 4294967296 * b.abs(b.sin(a + 1)) | 0
				}();
				var m = k.MD5 = j.extend({
					_doReset: function() {
						this._hash = new i.init([1732584193, 4023233417, 2562383102, 271733878])
					},
					_doProcessBlock: function(a, b) {
						for(var g = 0; g < 16; g++) {
							var h = b + g,
								i = a[h];
							a[h] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8)
						}
						var j = this._hash.words,
							k = a[b + 0],
							m = a[b + 1],
							n = a[b + 2],
							o = a[b + 3],
							p = a[b + 4],
							q = a[b + 5],
							r = a[b + 6],
							s = a[b + 7],
							t = a[b + 8],
							u = a[b + 9],
							v = a[b + 10],
							w = a[b + 11],
							x = a[b + 12],
							y = a[b + 13],
							z = a[b + 14],
							A = a[b + 15],
							B = j[0],
							C = j[1],
							D = j[2],
							E = j[3];
						B = c(B, C, D, E, k, 7, l[0]), E = c(E, B, C, D, m, 12, l[1]), D = c(D, E, B, C, n, 17, l[2]), C = c(C, D, E, B, o, 22, l[3]), B = c(B, C, D, E, p, 7, l[4]), E = c(E, B, C, D, q, 12, l[5]), D = c(D, E, B, C, r, 17, l[6]), C = c(C, D, E, B, s, 22, l[7]), B = c(B, C, D, E, t, 7, l[8]), E = c(E, B, C, D, u, 12, l[9]), D = c(D, E, B, C, v, 17, l[10]), C = c(C, D, E, B, w, 22, l[11]), B = c(B, C, D, E, x, 7, l[12]), E = c(E, B, C, D, y, 12, l[13]), D = c(D, E, B, C, z, 17, l[14]), C = c(C, D, E, B, A, 22, l[15]), B = d(B, C, D, E, m, 5, l[16]), E = d(E, B, C, D, r, 9, l[17]), D = d(D, E, B, C, w, 14, l[18]), C = d(C, D, E, B, k, 20, l[19]), B = d(B, C, D, E, q, 5, l[20]), E = d(E, B, C, D, v, 9, l[21]), D = d(D, E, B, C, A, 14, l[22]), C = d(C, D, E, B, p, 20, l[23]), B = d(B, C, D, E, u, 5, l[24]), E = d(E, B, C, D, z, 9, l[25]), D = d(D, E, B, C, o, 14, l[26]), C = d(C, D, E, B, t, 20, l[27]), B = d(B, C, D, E, y, 5, l[28]), E = d(E, B, C, D, n, 9, l[29]), D = d(D, E, B, C, s, 14, l[30]), C = d(C, D, E, B, x, 20, l[31]), B = e(B, C, D, E, q, 4, l[32]), E = e(E, B, C, D, t, 11, l[33]), D = e(D, E, B, C, w, 16, l[34]), C = e(C, D, E, B, z, 23, l[35]), B = e(B, C, D, E, m, 4, l[36]), E = e(E, B, C, D, p, 11, l[37]), D = e(D, E, B, C, s, 16, l[38]), C = e(C, D, E, B, v, 23, l[39]), B = e(B, C, D, E, y, 4, l[40]), E = e(E, B, C, D, k, 11, l[41]), D = e(D, E, B, C, o, 16, l[42]), C = e(C, D, E, B, r, 23, l[43]), B = e(B, C, D, E, u, 4, l[44]), E = e(E, B, C, D, x, 11, l[45]), D = e(D, E, B, C, A, 16, l[46]), C = e(C, D, E, B, n, 23, l[47]), B = f(B, C, D, E, k, 6, l[48]), E = f(E, B, C, D, s, 10, l[49]), D = f(D, E, B, C, z, 15, l[50]), C = f(C, D, E, B, q, 21, l[51]), B = f(B, C, D, E, x, 6, l[52]), E = f(E, B, C, D, o, 10, l[53]), D = f(D, E, B, C, v, 15, l[54]), C = f(C, D, E, B, m, 21, l[55]), B = f(B, C, D, E, t, 6, l[56]), E = f(E, B, C, D, A, 10, l[57]), D = f(D, E, B, C, r, 15, l[58]), C = f(C, D, E, B, y, 21, l[59]), B = f(B, C, D, E, p, 6, l[60]), E = f(E, B, C, D, w, 10, l[61]), D = f(D, E, B, C, n, 15, l[62]), C = f(C, D, E, B, u, 21, l[63]), j[0] = j[0] + B | 0, j[1] = j[1] + C | 0, j[2] = j[2] + D | 0, j[3] = j[3] + E | 0
					},
					_doFinalize: function() {
						var a = this._data,
							c = a.words,
							d = 8 * this._nDataBytes,
							e = 8 * a.sigBytes;
						c[e >>> 5] |= 128 << 24 - e % 32;
						var f = b.floor(d / 4294967296),
							g = d;
						c[15 + (e + 64 >>> 9 << 4)] = 16711935 & (f << 8 | f >>> 24) | 4278255360 & (f << 24 | f >>> 8), c[14 + (e + 64 >>> 9 << 4)] = 16711935 & (g << 8 | g >>> 24) | 4278255360 & (g << 24 | g >>> 8), a.sigBytes = 4 * (c.length + 1), this._process();
						for(var h = this._hash, i = h.words, j = 0; j < 4; j++) {
							var k = i[j];
							i[j] = 16711935 & (k << 8 | k >>> 24) | 4278255360 & (k << 24 | k >>> 8)
						}
						return h
					},
					clone: function() {
						var a = j.clone.call(this);
						return a._hash = this._hash.clone(), a
					}
				});
				g.MD5 = j._createHelper(m), g.HmacMD5 = j._createHmacHelper(m)
			}(Math), a.MD5
		})
	}, {
		"./core": 5
	}],
	14: [function(a, b, c) {
		! function(d, e, f) {
			"object" == typeof c ? b.exports = c = e(a("./core"), a("./cipher-core")) : "function" == typeof define && define.amd ? define(["./core", "./cipher-core"], e) : e(d.CryptoJS)
		}(this, function(a) {
			return a.mode.CFB = function() {
				function b(a, b, c, d) {
					var e = this._iv;
					if(e) {
						var f = e.slice(0);
						this._iv = void 0
					} else var f = this._prevBlock;
					d.encryptBlock(f, 0);
					for(var g = 0; g < c; g++) a[b + g] ^= f[g]
				}
				var c = a.lib.BlockCipherMode.extend();
				return c.Encryptor = c.extend({
					processBlock: function(a, c) {
						var d = this._cipher,
							e = d.blockSize;
						b.call(this, a, c, e, d), this._prevBlock = a.slice(c, c + e)
					}
				}), c.Decryptor = c.extend({
					processBlock: function(a, c) {
						var d = this._cipher,
							e = d.blockSize,
							f = a.slice(c, c + e);
						b.call(this, a, c, e, d), this._prevBlock = f
					}
				}), c
			}(), a.mode.CFB
		})
	}, {
		"./cipher-core": 4,
		"./core": 5
	}],
	15: [function(a, b, c) {
		! function(d, e, f) {
			"object" == typeof c ? b.exports = c = e(a("./core"), a("./cipher-core")) : "function" == typeof define && define.amd ? define(["./core", "./cipher-core"], e) : e(d.CryptoJS)
		}(this, function(a) {
			return a.mode.CTRGladman = function() {
				function b(a) {
					if(255 == (a >> 24 & 255)) {
						var b = a >> 16 & 255,
							c = a >> 8 & 255,
							d = 255 & a;
						255 === b ? (b = 0, 255 === c ? (c = 0, 255 === d ? d = 0 : ++d) : ++c) : ++b, a = 0, a += b << 16, a += c << 8, a += d
					} else a += 1 << 24;
					return a
				}

				function c(a) {
					return 0 === (a[0] = b(a[0])) && (a[1] = b(a[1])), a
				}
				var d = a.lib.BlockCipherMode.extend(),
					e = d.Encryptor = d.extend({
						processBlock: function(a, b) {
							var d = this._cipher,
								e = d.blockSize,
								f = this._iv,
								g = this._counter;
							f && (g = this._counter = f.slice(0), this._iv = void 0), c(g);
							var h = g.slice(0);
							d.encryptBlock(h, 0);
							for(var i = 0; i < e; i++) a[b + i] ^= h[i]
						}
					});
				return d.Decryptor = e, d
			}(), a.mode.CTRGladman
		})
	}, {
		"./cipher-core": 4,
		"./core": 5
	}],
	16: [function(a, b, c) {
		! function(d, e, f) {
			"object" == typeof c ? b.exports = c = e(a("./core"), a("./cipher-core")) : "function" == typeof define && define.amd ? define(["./core", "./cipher-core"], e) : e(d.CryptoJS)
		}(this, function(a) {
			return a.mode.CTR = function() {
				var b = a.lib.BlockCipherMode.extend(),
					c = b.Encryptor = b.extend({
						processBlock: function(a, b) {
							var c = this._cipher,
								d = c.blockSize,
								e = this._iv,
								f = this._counter;
							e && (f = this._counter = e.slice(0), this._iv = void 0);
							var g = f.slice(0);
							c.encryptBlock(g, 0), f[d - 1] = f[d - 1] + 1 | 0;
							for(var h = 0; h < d; h++) a[b + h] ^= g[h]
						}
					});
				return b.Decryptor = c, b
			}(), a.mode.CTR
		})
	}, {
		"./cipher-core": 4,
		"./core": 5
	}],
	17: [function(a, b, c) {
		! function(d, e, f) {
			"object" == typeof c ? b.exports = c = e(a("./core"), a("./cipher-core")) : "function" == typeof define && define.amd ? define(["./core", "./cipher-core"], e) : e(d.CryptoJS)
		}(this, function(a) {
			return a.mode.ECB = function() {
				var b = a.lib.BlockCipherMode.extend();
				return b.Encryptor = b.extend({
					processBlock: function(a, b) {
						this._cipher.encryptBlock(a, b)
					}
				}), b.Decryptor = b.extend({
					processBlock: function(a, b) {
						this._cipher.decryptBlock(a, b)
					}
				}), b
			}(), a.mode.ECB
		})
	}, {
		"./cipher-core": 4,
		"./core": 5
	}],
	18: [function(a, b, c) {
		! function(d, e, f) {
			"object" == typeof c ? b.exports = c = e(a("./core"), a("./cipher-core")) : "function" == typeof define && define.amd ? define(["./core", "./cipher-core"], e) : e(d.CryptoJS)
		}(this, function(a) {
			return a.mode.OFB = function() {
				var b = a.lib.BlockCipherMode.extend(),
					c = b.Encryptor = b.extend({
						processBlock: function(a, b) {
							var c = this._cipher,
								d = c.blockSize,
								e = this._iv,
								f = this._keystream;
							e && (f = this._keystream = e.slice(0), this._iv = void 0), c.encryptBlock(f, 0);
							for(var g = 0; g < d; g++) a[b + g] ^= f[g]
						}
					});
				return b.Decryptor = c, b
			}(), a.mode.OFB
		})
	}, {
		"./cipher-core": 4,
		"./core": 5
	}],
	19: [function(a, b, c) {
		! function(d, e, f) {
			"object" == typeof c ? b.exports = c = e(a("./core"), a("./cipher-core")) : "function" == typeof define && define.amd ? define(["./core", "./cipher-core"], e) : e(d.CryptoJS)
		}(this, function(a) {
			return a.pad.AnsiX923 = {
				pad: function(a, b) {
					var c = a.sigBytes,
						d = 4 * b,
						e = d - c % d,
						f = c + e - 1;
					a.clamp(), a.words[f >>> 2] |= e << 24 - f % 4 * 8, a.sigBytes += e
				},
				unpad: function(a) {
					var b = 255 & a.words[a.sigBytes - 1 >>> 2];
					a.sigBytes -= b
				}
			}, a.pad.Ansix923
		})
	}, {
		"./cipher-core": 4,
		"./core": 5
	}],
	20: [function(a, b, c) {
		! function(d, e, f) {
			"object" == typeof c ? b.exports = c = e(a("./core"), a("./cipher-core")) : "function" == typeof define && define.amd ? define(["./core", "./cipher-core"], e) : e(d.CryptoJS)
		}(this, function(a) {
			return a.pad.Iso10126 = {
				pad: function(b, c) {
					var d = 4 * c,
						e = d - b.sigBytes % d;
					b.concat(a.lib.WordArray.random(e - 1)).concat(a.lib.WordArray.create([e << 24], 1))
				},
				unpad: function(a) {
					var b = 255 & a.words[a.sigBytes - 1 >>> 2];
					a.sigBytes -= b
				}
			}, a.pad.Iso10126
		})
	}, {
		"./cipher-core": 4,
		"./core": 5
	}],
	21: [function(a, b, c) {
		! function(d, e, f) {
			"object" == typeof c ? b.exports = c = e(a("./core"), a("./cipher-core")) : "function" == typeof define && define.amd ? define(["./core", "./cipher-core"], e) : e(d.CryptoJS)
		}(this, function(a) {
			return a.pad.Iso97971 = {
				pad: function(b, c) {
					b.concat(a.lib.WordArray.create([2147483648], 1)), a.pad.ZeroPadding.pad(b, c)
				},
				unpad: function(b) {
					a.pad.ZeroPadding.unpad(b), b.sigBytes--
				}
			}, a.pad.Iso97971
		})
	}, {
		"./cipher-core": 4,
		"./core": 5
	}],
	22: [function(a, b, c) {
		! function(d, e, f) {
			"object" == typeof c ? b.exports = c = e(a("./core"), a("./cipher-core")) : "function" == typeof define && define.amd ? define(["./core", "./cipher-core"], e) : e(d.CryptoJS)
		}(this, function(a) {
			return a.pad.NoPadding = {
				pad: function() {},
				unpad: function() {}
			}, a.pad.NoPadding
		})
	}, {
		"./cipher-core": 4,
		"./core": 5
	}],
	23: [function(a, b, c) {
		! function(d, e, f) {
			"object" == typeof c ? b.exports = c = e(a("./core"), a("./cipher-core")) : "function" == typeof define && define.amd ? define(["./core", "./cipher-core"], e) : e(d.CryptoJS)
		}(this, function(a) {
			return a.pad.ZeroPadding = {
				pad: function(a, b) {
					var c = 4 * b;
					a.clamp(), a.sigBytes += c - (a.sigBytes % c || c)
				},
				unpad: function(a) {
					for(var b = a.words, c = a.sigBytes - 1; !(b[c >>> 2] >>> 24 - c % 4 * 8 & 255);) c--;
					a.sigBytes = c + 1
				}
			}, a.pad.ZeroPadding
		})
	}, {
		"./cipher-core": 4,
		"./core": 5
	}],
	24: [function(a, b, c) {
		! function(d, e, f) {
			"object" == typeof c ? b.exports = c = e(a("./core"), a("./sha1"), a("./hmac")) : "function" == typeof define && define.amd ? define(["./core", "./sha1", "./hmac"], e) : e(d.CryptoJS)
		}(this, function(a) {
			return function() {
				var b = a,
					c = b.lib,
					d = c.Base,
					e = c.WordArray,
					f = b.algo,
					g = f.SHA1,
					h = f.HMAC,
					i = f.PBKDF2 = d.extend({
						cfg: d.extend({
							keySize: 4,
							hasher: g,
							iterations: 1
						}),
						init: function(a) {
							this.cfg = this.cfg.extend(a)
						},
						compute: function(a, b) {
							for(var c = this.cfg, d = h.create(c.hasher, a), f = e.create(), g = e.create([1]), i = f.words, j = g.words, k = c.keySize, l = c.iterations; i.length < k;) {
								var m = d.update(b).finalize(g);
								d.reset();
								for(var n = m.words, o = n.length, p = m, q = 1; q < l; q++) {
									p = d.finalize(p), d.reset();
									for(var r = p.words, s = 0; s < o; s++) n[s] ^= r[s]
								}
								f.concat(m), j[0]++
							}
							return f.sigBytes = 4 * k, f
						}
					});
				b.PBKDF2 = function(a, b, c) {
					return i.create(c).compute(a, b)
				}
			}(), a.PBKDF2
		})
	}, {
		"./core": 5,
		"./hmac": 10,
		"./sha1": 29
	}],
	25: [function(a, b, c) {
		! function(d, e, f) {
			"object" == typeof c ? b.exports = c = e(a("./core"), a("./enc-base64"), a("./md5"), a("./evpkdf"), a("./cipher-core")) : "function" == typeof define && define.amd ? define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], e) : e(d.CryptoJS)
		}(this, function(a) {
			return function() {
				function b() {
					for(var a = this._X, b = this._C, c = 0; c < 8; c++) h[c] = b[c];
					b[0] = b[0] + 1295307597 + this._b | 0, b[1] = b[1] + 3545052371 + (b[0] >>> 0 < h[0] >>> 0 ? 1 : 0) | 0, b[2] = b[2] + 886263092 + (b[1] >>> 0 < h[1] >>> 0 ? 1 : 0) | 0, b[3] = b[3] + 1295307597 + (b[2] >>> 0 < h[2] >>> 0 ? 1 : 0) | 0, b[4] = b[4] + 3545052371 + (b[3] >>> 0 < h[3] >>> 0 ? 1 : 0) | 0, b[5] = b[5] + 886263092 + (b[4] >>> 0 < h[4] >>> 0 ? 1 : 0) | 0, b[6] = b[6] + 1295307597 + (b[5] >>> 0 < h[5] >>> 0 ? 1 : 0) | 0, b[7] = b[7] + 3545052371 + (b[6] >>> 0 < h[6] >>> 0 ? 1 : 0) | 0, this._b = b[7] >>> 0 < h[7] >>> 0 ? 1 : 0;
					for(var c = 0; c < 8; c++) {
						var d = a[c] + b[c],
							e = 65535 & d,
							f = d >>> 16,
							g = ((e * e >>> 17) + e * f >>> 15) + f * f,
							j = ((4294901760 & d) * d | 0) + ((65535 & d) * d | 0);
						i[c] = g ^ j
					}
					a[0] = i[0] + (i[7] << 16 | i[7] >>> 16) + (i[6] << 16 | i[6] >>> 16) | 0, a[1] = i[1] + (i[0] << 8 | i[0] >>> 24) + i[7] | 0, a[2] = i[2] + (i[1] << 16 | i[1] >>> 16) + (i[0] << 16 | i[0] >>> 16) | 0, a[3] = i[3] + (i[2] << 8 | i[2] >>> 24) + i[1] | 0, a[4] = i[4] + (i[3] << 16 | i[3] >>> 16) + (i[2] << 16 | i[2] >>> 16) | 0, a[5] = i[5] + (i[4] << 8 | i[4] >>> 24) + i[3] | 0, a[6] = i[6] + (i[5] << 16 | i[5] >>> 16) + (i[4] << 16 | i[4] >>> 16) | 0, a[7] = i[7] + (i[6] << 8 | i[6] >>> 24) + i[5] | 0
				}
				var c = a,
					d = c.lib,
					e = d.StreamCipher,
					f = c.algo,
					g = [],
					h = [],
					i = [],
					j = f.RabbitLegacy = e.extend({
						_doReset: function() {
							var a = this._key.words,
								c = this.cfg.iv,
								d = this._X = [a[0], a[3] << 16 | a[2] >>> 16, a[1], a[0] << 16 | a[3] >>> 16, a[2], a[1] << 16 | a[0] >>> 16, a[3], a[2] << 16 | a[1] >>> 16],
								e = this._C = [a[2] << 16 | a[2] >>> 16, 4294901760 & a[0] | 65535 & a[1], a[3] << 16 | a[3] >>> 16, 4294901760 & a[1] | 65535 & a[2], a[0] << 16 | a[0] >>> 16, 4294901760 & a[2] | 65535 & a[3], a[1] << 16 | a[1] >>> 16, 4294901760 & a[3] | 65535 & a[0]];
							this._b = 0;
							for(var f = 0; f < 4; f++) b.call(this);
							for(var f = 0; f < 8; f++) e[f] ^= d[f + 4 & 7];
							if(c) {
								var g = c.words,
									h = g[0],
									i = g[1],
									j = 16711935 & (h << 8 | h >>> 24) | 4278255360 & (h << 24 | h >>> 8),
									k = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8),
									l = j >>> 16 | 4294901760 & k,
									m = k << 16 | 65535 & j;
								e[0] ^= j, e[1] ^= l, e[2] ^= k, e[3] ^= m, e[4] ^= j, e[5] ^= l, e[6] ^= k, e[7] ^= m;
								for(var f = 0; f < 4; f++) b.call(this)
							}
						},
						_doProcessBlock: function(a, c) {
							var d = this._X;
							b.call(this), g[0] = d[0] ^ d[5] >>> 16 ^ d[3] << 16, g[1] = d[2] ^ d[7] >>> 16 ^ d[5] << 16, g[2] = d[4] ^ d[1] >>> 16 ^ d[7] << 16, g[3] = d[6] ^ d[3] >>> 16 ^ d[1] << 16;
							for(var e = 0; e < 4; e++) g[e] = 16711935 & (g[e] << 8 | g[e] >>> 24) | 4278255360 & (g[e] << 24 | g[e] >>> 8), a[c + e] ^= g[e]
						},
						blockSize: 4,
						ivSize: 2
					});
				c.RabbitLegacy = e._createHelper(j)
			}(), a.RabbitLegacy
		})
	}, {
		"./cipher-core": 4,
		"./core": 5,
		"./enc-base64": 6,
		"./evpkdf": 8,
		"./md5": 13
	}],
	26: [function(a, b, c) {
		! function(d, e, f) {
			"object" == typeof c ? b.exports = c = e(a("./core"), a("./enc-base64"), a("./md5"), a("./evpkdf"), a("./cipher-core")) : "function" == typeof define && define.amd ? define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], e) : e(d.CryptoJS)
		}(this, function(a) {
			return function() {
				function b() {
					for(var a = this._X, b = this._C, c = 0; c < 8; c++) h[c] = b[c];
					b[0] = b[0] + 1295307597 + this._b | 0, b[1] = b[1] + 3545052371 + (b[0] >>> 0 < h[0] >>> 0 ? 1 : 0) | 0, b[2] = b[2] + 886263092 + (b[1] >>> 0 < h[1] >>> 0 ? 1 : 0) | 0, b[3] = b[3] + 1295307597 + (b[2] >>> 0 < h[2] >>> 0 ? 1 : 0) | 0, b[4] = b[4] + 3545052371 + (b[3] >>> 0 < h[3] >>> 0 ? 1 : 0) | 0, b[5] = b[5] + 886263092 + (b[4] >>> 0 < h[4] >>> 0 ? 1 : 0) | 0, b[6] = b[6] + 1295307597 + (b[5] >>> 0 < h[5] >>> 0 ? 1 : 0) | 0, b[7] = b[7] + 3545052371 + (b[6] >>> 0 < h[6] >>> 0 ? 1 : 0) | 0, this._b = b[7] >>> 0 < h[7] >>> 0 ? 1 : 0;
					for(var c = 0; c < 8; c++) {
						var d = a[c] + b[c],
							e = 65535 & d,
							f = d >>> 16,
							g = ((e * e >>> 17) + e * f >>> 15) + f * f,
							j = ((4294901760 & d) * d | 0) + ((65535 & d) * d | 0);
						i[c] = g ^ j
					}
					a[0] = i[0] + (i[7] << 16 | i[7] >>> 16) + (i[6] << 16 | i[6] >>> 16) | 0, a[1] = i[1] + (i[0] << 8 | i[0] >>> 24) + i[7] | 0, a[2] = i[2] + (i[1] << 16 | i[1] >>> 16) + (i[0] << 16 | i[0] >>> 16) | 0, a[3] = i[3] + (i[2] << 8 | i[2] >>> 24) + i[1] | 0, a[4] = i[4] + (i[3] << 16 | i[3] >>> 16) + (i[2] << 16 | i[2] >>> 16) | 0, a[5] = i[5] + (i[4] << 8 | i[4] >>> 24) + i[3] | 0, a[6] = i[6] + (i[5] << 16 | i[5] >>> 16) + (i[4] << 16 | i[4] >>> 16) | 0, a[7] = i[7] + (i[6] << 8 | i[6] >>> 24) + i[5] | 0
				}
				var c = a,
					d = c.lib,
					e = d.StreamCipher,
					f = c.algo,
					g = [],
					h = [],
					i = [],
					j = f.Rabbit = e.extend({
						_doReset: function() {
							for(var a = this._key.words, c = this.cfg.iv, d = 0; d < 4; d++) a[d] = 16711935 & (a[d] << 8 | a[d] >>> 24) | 4278255360 & (a[d] << 24 | a[d] >>> 8);
							var e = this._X = [a[0], a[3] << 16 | a[2] >>> 16, a[1], a[0] << 16 | a[3] >>> 16, a[2], a[1] << 16 | a[0] >>> 16, a[3], a[2] << 16 | a[1] >>> 16],
								f = this._C = [a[2] << 16 | a[2] >>> 16, 4294901760 & a[0] | 65535 & a[1], a[3] << 16 | a[3] >>> 16, 4294901760 & a[1] | 65535 & a[2], a[0] << 16 | a[0] >>> 16, 4294901760 & a[2] | 65535 & a[3], a[1] << 16 | a[1] >>> 16, 4294901760 & a[3] | 65535 & a[0]];
							this._b = 0;
							for(var d = 0; d < 4; d++) b.call(this);
							for(var d = 0; d < 8; d++) f[d] ^= e[d + 4 & 7];
							if(c) {
								var g = c.words,
									h = g[0],
									i = g[1],
									j = 16711935 & (h << 8 | h >>> 24) | 4278255360 & (h << 24 | h >>> 8),
									k = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8),
									l = j >>> 16 | 4294901760 & k,
									m = k << 16 | 65535 & j;
								f[0] ^= j, f[1] ^= l, f[2] ^= k, f[3] ^= m, f[4] ^= j, f[5] ^= l, f[6] ^= k, f[7] ^= m;
								for(var d = 0; d < 4; d++) b.call(this)
							}
						},
						_doProcessBlock: function(a, c) {
							var d = this._X;
							b.call(this), g[0] = d[0] ^ d[5] >>> 16 ^ d[3] << 16, g[1] = d[2] ^ d[7] >>> 16 ^ d[5] << 16, g[2] = d[4] ^ d[1] >>> 16 ^ d[7] << 16, g[3] = d[6] ^ d[3] >>> 16 ^ d[1] << 16;
							for(var e = 0; e < 4; e++) g[e] = 16711935 & (g[e] << 8 | g[e] >>> 24) | 4278255360 & (g[e] << 24 | g[e] >>> 8), a[c + e] ^= g[e]
						},
						blockSize: 4,
						ivSize: 2
					});
				c.Rabbit = e._createHelper(j)
			}(), a.Rabbit
		})
	}, {
		"./cipher-core": 4,
		"./core": 5,
		"./enc-base64": 6,
		"./evpkdf": 8,
		"./md5": 13
	}],
	27: [function(a, b, c) {
		! function(d, e, f) {
			"object" == typeof c ? b.exports = c = e(a("./core"), a("./enc-base64"), a("./md5"), a("./evpkdf"), a("./cipher-core")) : "function" == typeof define && define.amd ? define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], e) : e(d.CryptoJS)
		}(this, function(a) {
			return function() {
				function b() {
					for(var a = this._S, b = this._i, c = this._j, d = 0, e = 0; e < 4; e++) {
						b = (b + 1) % 256, c = (c + a[b]) % 256;
						var f = a[b];
						a[b] = a[c], a[c] = f, d |= a[(a[b] + a[c]) % 256] << 24 - 8 * e
					}
					return this._i = b, this._j = c, d
				}
				var c = a,
					d = c.lib,
					e = d.StreamCipher,
					f = c.algo,
					g = f.RC4 = e.extend({
						_doReset: function() {
							for(var a = this._key, b = a.words, c = a.sigBytes, d = this._S = [], e = 0; e < 256; e++) d[e] = e;
							for(var e = 0, f = 0; e < 256; e++) {
								var g = e % c,
									h = b[g >>> 2] >>> 24 - g % 4 * 8 & 255;
								f = (f + d[e] + h) % 256;
								var i = d[e];
								d[e] = d[f], d[f] = i
							}
							this._i = this._j = 0
						},
						_doProcessBlock: function(a, c) {
							a[c] ^= b.call(this)
						},
						keySize: 8,
						ivSize: 0
					});
				c.RC4 = e._createHelper(g);
				var h = f.RC4Drop = g.extend({
					cfg: g.cfg.extend({
						drop: 192
					}),
					_doReset: function() {
						g._doReset.call(this);
						for(var a = this.cfg.drop; a > 0; a--) b.call(this)
					}
				});
				c.RC4Drop = e._createHelper(h)
			}(), a.RC4
		})
	}, {
		"./cipher-core": 4,
		"./core": 5,
		"./enc-base64": 6,
		"./evpkdf": 8,
		"./md5": 13
	}],
	28: [function(a, b, c) {
		! function(d, e) {
			"object" == typeof c ? b.exports = c = e(a("./core")) : "function" == typeof define && define.amd ? define(["./core"], e) : e(d.CryptoJS)
		}(this, function(a) {
			return function(b) {
				function c(a, b, c) {
					return a ^ b ^ c
				}

				function d(a, b, c) {
					return a & b | ~a & c
				}

				function e(a, b, c) {
					return(a | ~b) ^ c
				}

				function f(a, b, c) {
					return a & c | b & ~c
				}

				function g(a, b, c) {
					return a ^ (b | ~c)
				}

				function h(a, b) {
					return a << b | a >>> 32 - b
				}
				var i = a,
					j = i.lib,
					k = j.WordArray,
					l = j.Hasher,
					m = i.algo,
					n = k.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]),
					o = k.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]),
					p = k.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]),
					q = k.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]),
					r = k.create([0, 1518500249, 1859775393, 2400959708, 2840853838]),
					s = k.create([1352829926, 1548603684, 1836072691, 2053994217, 0]),
					t = m.RIPEMD160 = l.extend({
						_doReset: function() {
							this._hash = k.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
						},
						_doProcessBlock: function(a, b) {
							for(var i = 0; i < 16; i++) {
								var j = b + i,
									k = a[j];
								a[j] = 16711935 & (k << 8 | k >>> 24) | 4278255360 & (k << 24 | k >>> 8)
							}
							var l, m, t, u, v, w, x, y, z, A, B = this._hash.words,
								C = r.words,
								D = s.words,
								E = n.words,
								F = o.words,
								G = p.words,
								H = q.words;
							w = l = B[0], x = m = B[1], y = t = B[2], z = u = B[3], A = v = B[4];
							for(var I, i = 0; i < 80; i += 1) I = l + a[b + E[i]] | 0, I += i < 16 ? c(m, t, u) + C[0] : i < 32 ? d(m, t, u) + C[1] : i < 48 ? e(m, t, u) + C[2] : i < 64 ? f(m, t, u) + C[3] : g(m, t, u) + C[4], I |= 0, I = h(I, G[i]), I = I + v | 0, l = v, v = u, u = h(t, 10), t = m, m = I, I = w + a[b + F[i]] | 0, I += i < 16 ? g(x, y, z) + D[0] : i < 32 ? f(x, y, z) + D[1] : i < 48 ? e(x, y, z) + D[2] : i < 64 ? d(x, y, z) + D[3] : c(x, y, z) + D[4], I |= 0, I = h(I, H[i]), I = I + A | 0, w = A, A = z, z = h(y, 10), y = x, x = I;
							I = B[1] + t + z | 0, B[1] = B[2] + u + A | 0, B[2] = B[3] + v + w | 0, B[3] = B[4] + l + x | 0, B[4] = B[0] + m + y | 0, B[0] = I
						},
						_doFinalize: function() {
							var a = this._data,
								b = a.words,
								c = 8 * this._nDataBytes,
								d = 8 * a.sigBytes;
							b[d >>> 5] |= 128 << 24 - d % 32, b[14 + (d + 64 >>> 9 << 4)] = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8), a.sigBytes = 4 * (b.length + 1), this._process();
							for(var e = this._hash, f = e.words, g = 0; g < 5; g++) {
								var h = f[g];
								f[g] = 16711935 & (h << 8 | h >>> 24) | 4278255360 & (h << 24 | h >>> 8)
							}
							return e
						},
						clone: function() {
							var a = l.clone.call(this);
							return a._hash = this._hash.clone(), a
						}
					});
				i.RIPEMD160 = l._createHelper(t), i.HmacRIPEMD160 = l._createHmacHelper(t)
			}(Math), a.RIPEMD160
		})
	}, {
		"./core": 5
	}],
	29: [function(a, b, c) {
		! function(d, e) {
			"object" == typeof c ? b.exports = c = e(a("./core")) : "function" == typeof define && define.amd ? define(["./core"], e) : e(d.CryptoJS)
		}(this, function(a) {
			return function() {
				var b = a,
					c = b.lib,
					d = c.WordArray,
					e = c.Hasher,
					f = b.algo,
					g = [],
					h = f.SHA1 = e.extend({
						_doReset: function() {
							this._hash = new d.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
						},
						_doProcessBlock: function(a, b) {
							for(var c = this._hash.words, d = c[0], e = c[1], f = c[2], h = c[3], i = c[4], j = 0; j < 80; j++) {
								if(j < 16) g[j] = 0 | a[b + j];
								else {
									var k = g[j - 3] ^ g[j - 8] ^ g[j - 14] ^ g[j - 16];
									g[j] = k << 1 | k >>> 31
								}
								var l = (d << 5 | d >>> 27) + i + g[j];
								l += j < 20 ? 1518500249 + (e & f | ~e & h) : j < 40 ? 1859775393 + (e ^ f ^ h) : j < 60 ? (e & f | e & h | f & h) - 1894007588 : (e ^ f ^ h) - 899497514, i = h, h = f, f = e << 30 | e >>> 2, e = d, d = l
							}
							c[0] = c[0] + d | 0, c[1] = c[1] + e | 0, c[2] = c[2] + f | 0, c[3] = c[3] + h | 0, c[4] = c[4] + i | 0
						},
						_doFinalize: function() {
							var a = this._data,
								b = a.words,
								c = 8 * this._nDataBytes,
								d = 8 * a.sigBytes;
							return b[d >>> 5] |= 128 << 24 - d % 32, b[14 + (d + 64 >>> 9 << 4)] = Math.floor(c / 4294967296), b[15 + (d + 64 >>> 9 << 4)] = c, a.sigBytes = 4 * b.length, this._process(), this._hash
						},
						clone: function() {
							var a = e.clone.call(this);
							return a._hash = this._hash.clone(), a
						}
					});
				b.SHA1 = e._createHelper(h), b.HmacSHA1 = e._createHmacHelper(h)
			}(), a.SHA1
		})
	}, {
		"./core": 5
	}],
	30: [function(a, b, c) {
		! function(d, e, f) {
			"object" == typeof c ? b.exports = c = e(a("./core"), a("./sha256")) : "function" == typeof define && define.amd ? define(["./core", "./sha256"], e) : e(d.CryptoJS)
		}(this, function(a) {
			return function() {
				var b = a,
					c = b.lib,
					d = c.WordArray,
					e = b.algo,
					f = e.SHA256,
					g = e.SHA224 = f.extend({
						_doReset: function() {
							this._hash = new d.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428])
						},
						_doFinalize: function() {
							var a = f._doFinalize.call(this);
							return a.sigBytes -= 4, a
						}
					});
				b.SHA224 = f._createHelper(g), b.HmacSHA224 = f._createHmacHelper(g)
			}(), a.SHA224
		})
	}, {
		"./core": 5,
		"./sha256": 31
	}],
	31: [function(a, b, c) {
		! function(d, e) {
			"object" == typeof c ? b.exports = c = e(a("./core")) : "function" == typeof define && define.amd ? define(["./core"], e) : e(d.CryptoJS)
		}(this, function(a) {
			return function(b) {
				var c = a,
					d = c.lib,
					e = d.WordArray,
					f = d.Hasher,
					g = c.algo,
					h = [],
					i = [];
				! function() {
					function a(a) {
						for(var c = b.sqrt(a), d = 2; d <= c; d++)
							if(!(a % d)) return !1;
						return !0
					}

					function c(a) {
						return 4294967296 * (a - (0 | a)) | 0
					}
					for(var d = 2, e = 0; e < 64;) a(d) && (e < 8 && (h[e] = c(b.pow(d, .5))), i[e] = c(b.pow(d, 1 / 3)), e++), d++
				}();
				var j = [],
					k = g.SHA256 = f.extend({
						_doReset: function() {
							this._hash = new e.init(h.slice(0))
						},
						_doProcessBlock: function(a, b) {
							for(var c = this._hash.words, d = c[0], e = c[1], f = c[2], g = c[3], h = c[4], k = c[5], l = c[6], m = c[7], n = 0; n < 64; n++) {
								if(n < 16) j[n] = 0 | a[b + n];
								else {
									var o = j[n - 15],
										p = (o << 25 | o >>> 7) ^ (o << 14 | o >>> 18) ^ o >>> 3,
										q = j[n - 2],
										r = (q << 15 | q >>> 17) ^ (q << 13 | q >>> 19) ^ q >>> 10;
									j[n] = p + j[n - 7] + r + j[n - 16]
								}
								var s = h & k ^ ~h & l,
									t = d & e ^ d & f ^ e & f,
									u = (d << 30 | d >>> 2) ^ (d << 19 | d >>> 13) ^ (d << 10 | d >>> 22),
									v = (h << 26 | h >>> 6) ^ (h << 21 | h >>> 11) ^ (h << 7 | h >>> 25),
									w = m + v + s + i[n] + j[n],
									x = u + t;
								m = l, l = k, k = h, h = g + w | 0, g = f, f = e, e = d, d = w + x | 0
							}
							c[0] = c[0] + d | 0, c[1] = c[1] + e | 0, c[2] = c[2] + f | 0, c[3] = c[3] + g | 0, c[4] = c[4] + h | 0, c[5] = c[5] + k | 0, c[6] = c[6] + l | 0, c[7] = c[7] + m | 0
						},
						_doFinalize: function() {
							var a = this._data,
								c = a.words,
								d = 8 * this._nDataBytes,
								e = 8 * a.sigBytes;
							return c[e >>> 5] |= 128 << 24 - e % 32, c[14 + (e + 64 >>> 9 << 4)] = b.floor(d / 4294967296), c[15 + (e + 64 >>> 9 << 4)] = d, a.sigBytes = 4 * c.length, this._process(), this._hash
						},
						clone: function() {
							var a = f.clone.call(this);
							return a._hash = this._hash.clone(), a
						}
					});
				c.SHA256 = f._createHelper(k), c.HmacSHA256 = f._createHmacHelper(k)
			}(Math), a.SHA256
		})
	}, {
		"./core": 5
	}],
	32: [function(a, b, c) {
		! function(d, e, f) {
			"object" == typeof c ? b.exports = c = e(a("./core"), a("./x64-core")) : "function" == typeof define && define.amd ? define(["./core", "./x64-core"], e) : e(d.CryptoJS)
		}(this, function(a) {
			return function(b) {
				var c = a,
					d = c.lib,
					e = d.WordArray,
					f = d.Hasher,
					g = c.x64,
					h = g.Word,
					i = c.algo,
					j = [],
					k = [],
					l = [];
				! function() {
					for(var a = 1, b = 0, c = 0; c < 24; c++) {
						j[a + 5 * b] = (c + 1) * (c + 2) / 2 % 64;
						var d = b % 5,
							e = (2 * a + 3 * b) % 5;
						a = d, b = e
					}
					for(var a = 0; a < 5; a++)
						for(var b = 0; b < 5; b++) k[a + 5 * b] = b + (2 * a + 3 * b) % 5 * 5;
					for(var f = 1, g = 0; g < 24; g++) {
						for(var i = 0, m = 0, n = 0; n < 7; n++) {
							if(1 & f) {
								var o = (1 << n) - 1;
								o < 32 ? m ^= 1 << o : i ^= 1 << o - 32
							}
							128 & f ? f = f << 1 ^ 113 : f <<= 1
						}
						l[g] = h.create(i, m)
					}
				}();
				var m = [];
				! function() {
					for(var a = 0; a < 25; a++) m[a] = h.create()
				}();
				var n = i.SHA3 = f.extend({
					cfg: f.cfg.extend({
						outputLength: 512
					}),
					_doReset: function() {
						for(var a = this._state = [], b = 0; b < 25; b++) a[b] = new h.init;
						this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32
					},
					_doProcessBlock: function(a, b) {
						for(var c = this._state, d = this.blockSize / 2, e = 0; e < d; e++) {
							var f = a[b + 2 * e],
								g = a[b + 2 * e + 1];
							f = 16711935 & (f << 8 | f >>> 24) | 4278255360 & (f << 24 | f >>> 8), g = 16711935 & (g << 8 | g >>> 24) | 4278255360 & (g << 24 | g >>> 8);
							var h = c[e];
							h.high ^= g, h.low ^= f
						}
						for(var i = 0; i < 24; i++) {
							for(var n = 0; n < 5; n++) {
								for(var o = 0, p = 0, q = 0; q < 5; q++) {
									var h = c[n + 5 * q];
									o ^= h.high, p ^= h.low
								}
								var r = m[n];
								r.high = o, r.low = p
							}
							for(var n = 0; n < 5; n++)
								for(var s = m[(n + 4) % 5], t = m[(n + 1) % 5], u = t.high, v = t.low, o = s.high ^ (u << 1 | v >>> 31), p = s.low ^ (v << 1 | u >>> 31), q = 0; q < 5; q++) {
									var h = c[n + 5 * q];
									h.high ^= o, h.low ^= p
								}
							for(var w = 1; w < 25; w++) {
								var h = c[w],
									x = h.high,
									y = h.low,
									z = j[w];
								if(z < 32) var o = x << z | y >>> 32 - z,
									p = y << z | x >>> 32 - z;
								else var o = y << z - 32 | x >>> 64 - z,
									p = x << z - 32 | y >>> 64 - z;
								var A = m[k[w]];
								A.high = o, A.low = p
							}
							var B = m[0],
								C = c[0];
							B.high = C.high, B.low = C.low;
							for(var n = 0; n < 5; n++)
								for(var q = 0; q < 5; q++) {
									var w = n + 5 * q,
										h = c[w],
										D = m[w],
										E = m[(n + 1) % 5 + 5 * q],
										F = m[(n + 2) % 5 + 5 * q];
									h.high = D.high ^ ~E.high & F.high, h.low = D.low ^ ~E.low & F.low
								}
							var h = c[0],
								G = l[i];
							h.high ^= G.high, h.low ^= G.low
						}
					},
					_doFinalize: function() {
						var a = this._data,
							c = a.words,
							d = (this._nDataBytes, 8 * a.sigBytes),
							f = 32 * this.blockSize;
						c[d >>> 5] |= 1 << 24 - d % 32, c[(b.ceil((d + 1) / f) * f >>> 5) - 1] |= 128, a.sigBytes = 4 * c.length, this._process();
						for(var g = this._state, h = this.cfg.outputLength / 8, i = h / 8, j = [], k = 0; k < i; k++) {
							var l = g[k],
								m = l.high,
								n = l.low;
							m = 16711935 & (m << 8 | m >>> 24) | 4278255360 & (m << 24 | m >>> 8), n = 16711935 & (n << 8 | n >>> 24) | 4278255360 & (n << 24 | n >>> 8), j.push(n), j.push(m)
						}
						return new e.init(j, h)
					},
					clone: function() {
						for(var a = f.clone.call(this), b = a._state = this._state.slice(0), c = 0; c < 25; c++) b[c] = b[c].clone();
						return a
					}
				});
				c.SHA3 = f._createHelper(n), c.HmacSHA3 = f._createHmacHelper(n)
			}(Math), a.SHA3
		})
	}, {
		"./core": 5,
		"./x64-core": 36
	}],
	33: [function(a, b, c) {
		! function(d, e, f) {
			"object" == typeof c ? b.exports = c = e(a("./core"), a("./x64-core"), a("./sha512")) : "function" == typeof define && define.amd ? define(["./core", "./x64-core", "./sha512"], e) : e(d.CryptoJS)
		}(this, function(a) {
			return function() {
				var b = a,
					c = b.x64,
					d = c.Word,
					e = c.WordArray,
					f = b.algo,
					g = f.SHA512,
					h = f.SHA384 = g.extend({
						_doReset: function() {
							this._hash = new e.init([new d.init(3418070365, 3238371032), new d.init(1654270250, 914150663), new d.init(2438529370, 812702999), new d.init(355462360, 4144912697), new d.init(1731405415, 4290775857), new d.init(2394180231, 1750603025), new d.init(3675008525, 1694076839), new d.init(1203062813, 3204075428)])
						},
						_doFinalize: function() {
							var a = g._doFinalize.call(this);
							return a.sigBytes -= 16, a
						}
					});
				b.SHA384 = g._createHelper(h), b.HmacSHA384 = g._createHmacHelper(h)
			}(), a.SHA384
		})
	}, {
		"./core": 5,
		"./sha512": 34,
		"./x64-core": 36
	}],
	34: [function(a, b, c) {
		! function(d, e, f) {
			"object" == typeof c ? b.exports = c = e(a("./core"), a("./x64-core")) : "function" == typeof define && define.amd ? define(["./core", "./x64-core"], e) : e(d.CryptoJS)
		}(this, function(a) {
			return function() {
				function b() {
					return g.create.apply(g, arguments)
				}
				var c = a,
					d = c.lib,
					e = d.Hasher,
					f = c.x64,
					g = f.Word,
					h = f.WordArray,
					i = c.algo,
					j = [b(1116352408, 3609767458), b(1899447441, 602891725), b(3049323471, 3964484399), b(3921009573, 2173295548), b(961987163, 4081628472), b(1508970993, 3053834265), b(2453635748, 2937671579), b(2870763221, 3664609560), b(3624381080, 2734883394), b(310598401, 1164996542), b(607225278, 1323610764), b(1426881987, 3590304994), b(1925078388, 4068182383), b(2162078206, 991336113), b(2614888103, 633803317), b(3248222580, 3479774868), b(3835390401, 2666613458), b(4022224774, 944711139), b(264347078, 2341262773), b(604807628, 2007800933), b(770255983, 1495990901), b(1249150122, 1856431235), b(1555081692, 3175218132), b(1996064986, 2198950837), b(2554220882, 3999719339), b(2821834349, 766784016), b(2952996808, 2566594879), b(3210313671, 3203337956), b(3336571891, 1034457026), b(3584528711, 2466948901), b(113926993, 3758326383), b(338241895, 168717936), b(666307205, 1188179964), b(773529912, 1546045734), b(1294757372, 1522805485), b(1396182291, 2643833823), b(1695183700, 2343527390), b(1986661051, 1014477480), b(2177026350, 1206759142), b(2456956037, 344077627), b(2730485921, 1290863460), b(2820302411, 3158454273), b(3259730800, 3505952657), b(3345764771, 106217008), b(3516065817, 3606008344), b(3600352804, 1432725776), b(4094571909, 1467031594), b(275423344, 851169720), b(430227734, 3100823752), b(506948616, 1363258195), b(659060556, 3750685593), b(883997877, 3785050280), b(958139571, 3318307427), b(1322822218, 3812723403), b(1537002063, 2003034995), b(1747873779, 3602036899), b(1955562222, 1575990012), b(2024104815, 1125592928), b(2227730452, 2716904306), b(2361852424, 442776044), b(2428436474, 593698344), b(2756734187, 3733110249), b(3204031479, 2999351573), b(3329325298, 3815920427), b(3391569614, 3928383900), b(3515267271, 566280711), b(3940187606, 3454069534), b(4118630271, 4000239992), b(116418474, 1914138554), b(174292421, 2731055270), b(289380356, 3203993006), b(460393269, 320620315), b(685471733, 587496836), b(852142971, 1086792851), b(1017036298, 365543100), b(1126000580, 2618297676), b(1288033470, 3409855158), b(1501505948, 4234509866), b(1607167915, 987167468), b(1816402316, 1246189591)],
					k = [];
				! function() {
					for(var a = 0; a < 80; a++) k[a] = b()
				}();
				var l = i.SHA512 = e.extend({
					_doReset: function() {
						this._hash = new h.init([new g.init(1779033703, 4089235720), new g.init(3144134277, 2227873595), new g.init(1013904242, 4271175723), new g.init(2773480762, 1595750129), new g.init(1359893119, 2917565137), new g.init(2600822924, 725511199), new g.init(528734635, 4215389547), new g.init(1541459225, 327033209)])
					},
					_doProcessBlock: function(a, b) {
						for(var c = this._hash.words, d = c[0], e = c[1], f = c[2], g = c[3], h = c[4], i = c[5], l = c[6], m = c[7], n = d.high, o = d.low, p = e.high, q = e.low, r = f.high, s = f.low, t = g.high, u = g.low, v = h.high, w = h.low, x = i.high, y = i.low, z = l.high, A = l.low, B = m.high, C = m.low, D = n, E = o, F = p, G = q, H = r, I = s, J = t, K = u, L = v, M = w, N = x, O = y, P = z, Q = A, R = B, S = C, T = 0; T < 80; T++) {
							var U = k[T];
							if(T < 16) var V = U.high = 0 | a[b + 2 * T],
								W = U.low = 0 | a[b + 2 * T + 1];
							else {
								var X = k[T - 15],
									Y = X.high,
									Z = X.low,
									$ = (Y >>> 1 | Z << 31) ^ (Y >>> 8 | Z << 24) ^ Y >>> 7,
									_ = (Z >>> 1 | Y << 31) ^ (Z >>> 8 | Y << 24) ^ (Z >>> 7 | Y << 25),
									aa = k[T - 2],
									ba = aa.high,
									ca = aa.low,
									da = (ba >>> 19 | ca << 13) ^ (ba << 3 | ca >>> 29) ^ ba >>> 6,
									ea = (ca >>> 19 | ba << 13) ^ (ca << 3 | ba >>> 29) ^ (ca >>> 6 | ba << 26),
									fa = k[T - 7],
									ga = fa.high,
									ha = fa.low,
									ia = k[T - 16],
									ja = ia.high,
									ka = ia.low,
									W = _ + ha,
									V = $ + ga + (W >>> 0 < _ >>> 0 ? 1 : 0),
									W = W + ea,
									V = V + da + (W >>> 0 < ea >>> 0 ? 1 : 0),
									W = W + ka,
									V = V + ja + (W >>> 0 < ka >>> 0 ? 1 : 0);
								U.high = V, U.low = W
							}
							var la = L & N ^ ~L & P,
								ma = M & O ^ ~M & Q,
								na = D & F ^ D & H ^ F & H,
								oa = E & G ^ E & I ^ G & I,
								pa = (D >>> 28 | E << 4) ^ (D << 30 | E >>> 2) ^ (D << 25 | E >>> 7),
								qa = (E >>> 28 | D << 4) ^ (E << 30 | D >>> 2) ^ (E << 25 | D >>> 7),
								ra = (L >>> 14 | M << 18) ^ (L >>> 18 | M << 14) ^ (L << 23 | M >>> 9),
								sa = (M >>> 14 | L << 18) ^ (M >>> 18 | L << 14) ^ (M << 23 | L >>> 9),
								ta = j[T],
								ua = ta.high,
								va = ta.low,
								wa = S + sa,
								xa = R + ra + (wa >>> 0 < S >>> 0 ? 1 : 0),
								wa = wa + ma,
								xa = xa + la + (wa >>> 0 < ma >>> 0 ? 1 : 0),
								wa = wa + va,
								xa = xa + ua + (wa >>> 0 < va >>> 0 ? 1 : 0),
								wa = wa + W,
								xa = xa + V + (wa >>> 0 < W >>> 0 ? 1 : 0),
								ya = qa + oa,
								za = pa + na + (ya >>> 0 < qa >>> 0 ? 1 : 0);
							R = P, S = Q, P = N, Q = O, N = L, O = M, M = K + wa | 0, L = J + xa + (M >>> 0 < K >>> 0 ? 1 : 0) | 0, J = H, K = I, H = F, I = G, F = D, G = E, E = wa + ya | 0, D = xa + za + (E >>> 0 < wa >>> 0 ? 1 : 0) | 0
						}
						o = d.low = o + E, d.high = n + D + (o >>> 0 < E >>> 0 ? 1 : 0), q = e.low = q + G, e.high = p + F + (q >>> 0 < G >>> 0 ? 1 : 0), s = f.low = s + I, f.high = r + H + (s >>> 0 < I >>> 0 ? 1 : 0), u = g.low = u + K, g.high = t + J + (u >>> 0 < K >>> 0 ? 1 : 0), w = h.low = w + M, h.high = v + L + (w >>> 0 < M >>> 0 ? 1 : 0), y = i.low = y + O, i.high = x + N + (y >>> 0 < O >>> 0 ? 1 : 0), A = l.low = A + Q, l.high = z + P + (A >>> 0 < Q >>> 0 ? 1 : 0), C = m.low = C + S, m.high = B + R + (C >>> 0 < S >>> 0 ? 1 : 0)
					},
					_doFinalize: function() {
						var a = this._data,
							b = a.words,
							c = 8 * this._nDataBytes,
							d = 8 * a.sigBytes;
						return b[d >>> 5] |= 128 << 24 - d % 32, b[30 + (d + 128 >>> 10 << 5)] = Math.floor(c / 4294967296), b[31 + (d + 128 >>> 10 << 5)] = c, a.sigBytes = 4 * b.length, this._process(), this._hash.toX32()
					},
					clone: function() {
						var a = e.clone.call(this);
						return a._hash = this._hash.clone(), a
					},
					blockSize: 32
				});
				c.SHA512 = e._createHelper(l), c.HmacSHA512 = e._createHmacHelper(l)
			}(), a.SHA512
		})
	}, {
		"./core": 5,
		"./x64-core": 36
	}],
	35: [function(a, b, c) {
		! function(d, e, f) {
			"object" == typeof c ? b.exports = c = e(a("./core"), a("./enc-base64"), a("./md5"), a("./evpkdf"), a("./cipher-core")) : "function" == typeof define && define.amd ? define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], e) : e(d.CryptoJS)
		}(this, function(a) {
			return function() {
				function b(a, b) {
					var c = (this._lBlock >>> a ^ this._rBlock) & b;
					this._rBlock ^= c, this._lBlock ^= c << a
				}

				function c(a, b) {
					var c = (this._rBlock >>> a ^ this._lBlock) & b;
					this._lBlock ^= c, this._rBlock ^= c << a
				}
				var d = a,
					e = d.lib,
					f = e.WordArray,
					g = e.BlockCipher,
					h = d.algo,
					i = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4],
					j = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32],
					k = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28],
					l = [{
						0: 8421888,
						268435456: 32768,
						536870912: 8421378,
						805306368: 2,
						1073741824: 512,
						1342177280: 8421890,
						1610612736: 8389122,
						1879048192: 8388608,
						2147483648: 514,
						2415919104: 8389120,
						2684354560: 33280,
						2952790016: 8421376,
						3221225472: 32770,
						3489660928: 8388610,
						3758096384: 0,
						4026531840: 33282,
						134217728: 0,
						402653184: 8421890,
						671088640: 33282,
						939524096: 32768,
						1207959552: 8421888,
						1476395008: 512,
						1744830464: 8421378,
						2013265920: 2,
						2281701376: 8389120,
						2550136832: 33280,
						2818572288: 8421376,
						3087007744: 8389122,
						3355443200: 8388610,
						3623878656: 32770,
						3892314112: 514,
						4160749568: 8388608,
						1: 32768,
						268435457: 2,
						536870913: 8421888,
						805306369: 8388608,
						1073741825: 8421378,
						1342177281: 33280,
						1610612737: 512,
						1879048193: 8389122,
						2147483649: 8421890,
						2415919105: 8421376,
						2684354561: 8388610,
						2952790017: 33282,
						3221225473: 514,
						3489660929: 8389120,
						3758096385: 32770,
						4026531841: 0,
						134217729: 8421890,
						402653185: 8421376,
						671088641: 8388608,
						939524097: 512,
						1207959553: 32768,
						1476395009: 8388610,
						1744830465: 2,
						2013265921: 33282,
						2281701377: 32770,
						2550136833: 8389122,
						2818572289: 514,
						3087007745: 8421888,
						3355443201: 8389120,
						3623878657: 0,
						3892314113: 33280,
						4160749569: 8421378
					}, {
						0: 1074282512,
						16777216: 16384,
						33554432: 524288,
						50331648: 1074266128,
						67108864: 1073741840,
						83886080: 1074282496,
						100663296: 1073758208,
						117440512: 16,
						134217728: 540672,
						150994944: 1073758224,
						167772160: 1073741824,
						184549376: 540688,
						201326592: 524304,
						218103808: 0,
						234881024: 16400,
						251658240: 1074266112,
						8388608: 1073758208,
						25165824: 540688,
						41943040: 16,
						58720256: 1073758224,
						75497472: 1074282512,
						92274688: 1073741824,
						109051904: 524288,
						125829120: 1074266128,
						142606336: 524304,
						159383552: 0,
						176160768: 16384,
						192937984: 1074266112,
						209715200: 1073741840,
						226492416: 540672,
						243269632: 1074282496,
						260046848: 16400,
						268435456: 0,
						285212672: 1074266128,
						301989888: 1073758224,
						318767104: 1074282496,
						335544320: 1074266112,
						352321536: 16,
						369098752: 540688,
						385875968: 16384,
						402653184: 16400,
						419430400: 524288,
						436207616: 524304,
						452984832: 1073741840,
						469762048: 540672,
						486539264: 1073758208,
						503316480: 1073741824,
						520093696: 1074282512,
						276824064: 540688,
						293601280: 524288,
						310378496: 1074266112,
						327155712: 16384,
						343932928: 1073758208,
						360710144: 1074282512,
						377487360: 16,
						394264576: 1073741824,
						411041792: 1074282496,
						427819008: 1073741840,
						444596224: 1073758224,
						461373440: 524304,
						478150656: 0,
						494927872: 16400,
						511705088: 1074266128,
						528482304: 540672
					}, {
						0: 260,
						1048576: 0,
						2097152: 67109120,
						3145728: 65796,
						4194304: 65540,
						5242880: 67108868,
						6291456: 67174660,
						7340032: 67174400,
						8388608: 67108864,
						9437184: 67174656,
						10485760: 65792,
						11534336: 67174404,
						12582912: 67109124,
						13631488: 65536,
						14680064: 4,
						15728640: 256,
						524288: 67174656,
						1572864: 67174404,
						2621440: 0,
						3670016: 67109120,
						4718592: 67108868,
						5767168: 65536,
						6815744: 65540,
						7864320: 260,
						8912896: 4,
						9961472: 256,
						11010048: 67174400,
						12058624: 65796,
						13107200: 65792,
						14155776: 67109124,
						15204352: 67174660,
						16252928: 67108864,
						16777216: 67174656,
						17825792: 65540,
						18874368: 65536,
						19922944: 67109120,
						20971520: 256,
						22020096: 67174660,
						23068672: 67108868,
						24117248: 0,
						25165824: 67109124,
						26214400: 67108864,
						27262976: 4,
						28311552: 65792,
						29360128: 67174400,
						30408704: 260,
						31457280: 65796,
						32505856: 67174404,
						17301504: 67108864,
						18350080: 260,
						19398656: 67174656,
						20447232: 0,
						21495808: 65540,
						22544384: 67109120,
						23592960: 256,
						24641536: 67174404,
						25690112: 65536,
						26738688: 67174660,
						27787264: 65796,
						28835840: 67108868,
						29884416: 67109124,
						30932992: 67174400,
						31981568: 4,
						33030144: 65792
					}, {
						0: 2151682048,
						65536: 2147487808,
						131072: 4198464,
						196608: 2151677952,
						262144: 0,
						327680: 4198400,
						393216: 2147483712,
						458752: 4194368,
						524288: 2147483648,
						589824: 4194304,
						655360: 64,
						720896: 2147487744,
						786432: 2151678016,
						851968: 4160,
						917504: 4096,
						983040: 2151682112,
						32768: 2147487808,
						98304: 64,
						163840: 2151678016,
						229376: 2147487744,
						294912: 4198400,
						360448: 2151682112,
						425984: 0,
						491520: 2151677952,
						557056: 4096,
						622592: 2151682048,
						688128: 4194304,
						753664: 4160,
						819200: 2147483648,
						884736: 4194368,
						950272: 4198464,
						1015808: 2147483712,
						1048576: 4194368,
						1114112: 4198400,
						1179648: 2147483712,
						1245184: 0,
						1310720: 4160,
						1376256: 2151678016,
						1441792: 2151682048,
						1507328: 2147487808,
						1572864: 2151682112,
						1638400: 2147483648,
						1703936: 2151677952,
						1769472: 4198464,
						1835008: 2147487744,
						1900544: 4194304,
						1966080: 64,
						2031616: 4096,
						1081344: 2151677952,
						1146880: 2151682112,
						1212416: 0,
						1277952: 4198400,
						1343488: 4194368,
						1409024: 2147483648,
						1474560: 2147487808,
						1540096: 64,
						1605632: 2147483712,
						1671168: 4096,
						1736704: 2147487744,
						1802240: 2151678016,
						1867776: 4160,
						1933312: 2151682048,
						1998848: 4194304,
						2064384: 4198464
					}, {
						0: 128,
						4096: 17039360,
						8192: 262144,
						12288: 536870912,
						16384: 537133184,
						20480: 16777344,
						24576: 553648256,
						28672: 262272,
						32768: 16777216,
						36864: 537133056,
						40960: 536871040,
						45056: 553910400,
						49152: 553910272,
						53248: 0,
						57344: 17039488,
						61440: 553648128,
						2048: 17039488,
						6144: 553648256,
						10240: 128,
						14336: 17039360,
						18432: 262144,
						22528: 537133184,
						26624: 553910272,
						30720: 536870912,
						34816: 537133056,
						38912: 0,
						43008: 553910400,
						47104: 16777344,
						51200: 536871040,
						55296: 553648128,
						59392: 16777216,
						63488: 262272,
						65536: 262144,
						69632: 128,
						73728: 536870912,
						77824: 553648256,
						81920: 16777344,
						86016: 553910272,
						90112: 537133184,
						94208: 16777216,
						98304: 553910400,
						102400: 553648128,
						106496: 17039360,
						110592: 537133056,
						114688: 262272,
						118784: 536871040,
						122880: 0,
						126976: 17039488,
						67584: 553648256,
						71680: 16777216,
						75776: 17039360,
						79872: 537133184,
						83968: 536870912,
						88064: 17039488,
						92160: 128,
						96256: 553910272,
						100352: 262272,
						104448: 553910400,
						108544: 0,
						112640: 553648128,
						116736: 16777344,
						120832: 262144,
						124928: 537133056,
						129024: 536871040
					}, {
						0: 268435464,
						256: 8192,
						512: 270532608,
						768: 270540808,
						1024: 268443648,
						1280: 2097152,
						1536: 2097160,
						1792: 268435456,
						2048: 0,
						2304: 268443656,
						2560: 2105344,
						2816: 8,
						3072: 270532616,
						3328: 2105352,
						3584: 8200,
						3840: 270540800,
						128: 270532608,
						384: 270540808,
						640: 8,
						896: 2097152,
						1152: 2105352,
						1408: 268435464,
						1664: 268443648,
						1920: 8200,
						2176: 2097160,
						2432: 8192,
						2688: 268443656,
						2944: 270532616,
						3200: 0,
						3456: 270540800,
						3712: 2105344,
						3968: 268435456,
						4096: 268443648,
						4352: 270532616,
						4608: 270540808,
						4864: 8200,
						5120: 2097152,
						5376: 268435456,
						5632: 268435464,
						5888: 2105344,
						6144: 2105352,
						6400: 0,
						6656: 8,
						6912: 270532608,
						7168: 8192,
						7424: 268443656,
						7680: 270540800,
						7936: 2097160,
						4224: 8,
						4480: 2105344,
						4736: 2097152,
						4992: 268435464,
						5248: 268443648,
						5504: 8200,
						5760: 270540808,
						6016: 270532608,
						6272: 270540800,
						6528: 270532616,
						6784: 8192,
						7040: 2105352,
						7296: 2097160,
						7552: 0,
						7808: 268435456,
						8064: 268443656
					}, {
						0: 1048576,
						16: 33555457,
						32: 1024,
						48: 1049601,
						64: 34604033,
						80: 0,
						96: 1,
						112: 34603009,
						128: 33555456,
						144: 1048577,
						160: 33554433,
						176: 34604032,
						192: 34603008,
						208: 1025,
						224: 1049600,
						240: 33554432,
						8: 34603009,
						24: 0,
						40: 33555457,
						56: 34604032,
						72: 1048576,
						88: 33554433,
						104: 33554432,
						120: 1025,
						136: 1049601,
						152: 33555456,
						168: 34603008,
						184: 1048577,
						200: 1024,
						216: 34604033,
						232: 1,
						248: 1049600,
						256: 33554432,
						272: 1048576,
						288: 33555457,
						304: 34603009,
						320: 1048577,
						336: 33555456,
						352: 34604032,
						368: 1049601,
						384: 1025,
						400: 34604033,
						416: 1049600,
						432: 1,
						448: 0,
						464: 34603008,
						480: 33554433,
						496: 1024,
						264: 1049600,
						280: 33555457,
						296: 34603009,
						312: 1,
						328: 33554432,
						344: 1048576,
						360: 1025,
						376: 34604032,
						392: 33554433,
						408: 34603008,
						424: 0,
						440: 34604033,
						456: 1049601,
						472: 1024,
						488: 33555456,
						504: 1048577
					}, {
						0: 134219808,
						1: 131072,
						2: 134217728,
						3: 32,
						4: 131104,
						5: 134350880,
						6: 134350848,
						7: 2048,
						8: 134348800,
						9: 134219776,
						10: 133120,
						11: 134348832,
						12: 2080,
						13: 0,
						14: 134217760,
						15: 133152,
						2147483648: 2048,
						2147483649: 134350880,
						2147483650: 134219808,
						2147483651: 134217728,
						2147483652: 134348800,
						2147483653: 133120,
						2147483654: 133152,
						2147483655: 32,
						2147483656: 134217760,
						2147483657: 2080,
						2147483658: 131104,
						2147483659: 134350848,
						2147483660: 0,
						2147483661: 134348832,
						2147483662: 134219776,
						2147483663: 131072,
						16: 133152,
						17: 134350848,
						18: 32,
						19: 2048,
						20: 134219776,
						21: 134217760,
						22: 134348832,
						23: 131072,
						24: 0,
						25: 131104,
						26: 134348800,
						27: 134219808,
						28: 134350880,
						29: 133120,
						30: 2080,
						31: 134217728,
						2147483664: 131072,
						2147483665: 2048,
						2147483666: 134348832,
						2147483667: 133152,
						2147483668: 32,
						2147483669: 134348800,
						2147483670: 134217728,
						2147483671: 134219808,
						2147483672: 134350880,
						2147483673: 134217760,
						2147483674: 134219776,
						2147483675: 0,
						2147483676: 133120,
						2147483677: 2080,
						2147483678: 131104,
						2147483679: 134350848
					}],
					m = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679],
					n = h.DES = g.extend({
						_doReset: function() {
							for(var a = this._key, b = a.words, c = [], d = 0; d < 56; d++) {
								var e = i[d] - 1;
								c[d] = b[e >>> 5] >>> 31 - e % 32 & 1
							}
							for(var f = this._subKeys = [], g = 0; g < 16; g++) {
								for(var h = f[g] = [], l = k[g], d = 0; d < 24; d++) h[d / 6 | 0] |= c[(j[d] - 1 + l) % 28] << 31 - d % 6, h[4 + (d / 6 | 0)] |= c[28 + (j[d + 24] - 1 + l) % 28] << 31 - d % 6;
								h[0] = h[0] << 1 | h[0] >>> 31;
								for(var d = 1; d < 7; d++) h[d] = h[d] >>> 4 * (d - 1) + 3;
								h[7] = h[7] << 5 | h[7] >>> 27
							}
							for(var m = this._invSubKeys = [], d = 0; d < 16; d++) m[d] = f[15 - d]
						},
						encryptBlock: function(a, b) {
							this._doCryptBlock(a, b, this._subKeys)
						},
						decryptBlock: function(a, b) {
							this._doCryptBlock(a, b, this._invSubKeys)
						},
						_doCryptBlock: function(a, d, e) {
							this._lBlock = a[d], this._rBlock = a[d + 1], b.call(this, 4, 252645135), b.call(this, 16, 65535), c.call(this, 2, 858993459), c.call(this, 8, 16711935), b.call(this, 1, 1431655765);
							for(var f = 0; f < 16; f++) {
								for(var g = e[f], h = this._lBlock, i = this._rBlock, j = 0, k = 0; k < 8; k++) j |= l[k][((i ^ g[k]) & m[k]) >>> 0];
								this._lBlock = i, this._rBlock = h ^ j
							}
							var n = this._lBlock;
							this._lBlock = this._rBlock, this._rBlock = n, b.call(this, 1, 1431655765), c.call(this, 8, 16711935), c.call(this, 2, 858993459), b.call(this, 16, 65535), b.call(this, 4, 252645135), a[d] = this._lBlock, a[d + 1] = this._rBlock
						},
						keySize: 2,
						ivSize: 2,
						blockSize: 2
					});
				d.DES = g._createHelper(n);
				var o = h.TripleDES = g.extend({
					_doReset: function() {
						var a = this._key,
							b = a.words;
						this._des1 = n.createEncryptor(f.create(b.slice(0, 2))), this._des2 = n.createEncryptor(f.create(b.slice(2, 4))), this._des3 = n.createEncryptor(f.create(b.slice(4, 6)))
					},
					encryptBlock: function(a, b) {
						this._des1.encryptBlock(a, b), this._des2.decryptBlock(a, b), this._des3.encryptBlock(a, b)
					},
					decryptBlock: function(a, b) {
						this._des3.decryptBlock(a, b), this._des2.encryptBlock(a, b), this._des1.decryptBlock(a, b)
					},
					keySize: 6,
					ivSize: 2,
					blockSize: 2
				});
				d.TripleDES = g._createHelper(o)
			}(), a.TripleDES
		})
	}, {
		"./cipher-core": 4,
		"./core": 5,
		"./enc-base64": 6,
		"./evpkdf": 8,
		"./md5": 13
	}],
	36: [function(a, b, c) {
		! function(d, e) {
			"object" == typeof c ? b.exports = c = e(a("./core")) : "function" == typeof define && define.amd ? define(["./core"], e) : e(d.CryptoJS)
		}(this, function(a) {
			return function(b) {
				var c = a,
					d = c.lib,
					e = d.Base,
					f = d.WordArray,
					g = c.x64 = {};
				g.Word = e.extend({
					init: function(a, b) {
						this.high = a, this.low = b
					}
				}), g.WordArray = e.extend({
					init: function(a, c) {
						a = this.words = a || [], this.sigBytes = c != b ? c : 8 * a.length
					},
					toX32: function() {
						for(var a = this.words, b = a.length, c = [], d = 0; d < b; d++) {
							var e = a[d];
							c.push(e.high), c.push(e.low)
						}
						return f.create(c, this.sigBytes)
					},
					clone: function() {
						for(var a = e.clone.call(this), b = a.words = this.words.slice(0), c = b.length, d = 0; d < c; d++) b[d] = b[d].clone();
						return a
					}
				})
			}(), a
		})
	}, {
		"./core": 5
	}],
	37: [function(a, b, c) {
		c.read = function(a, b, c, d, e) {
			var f, g, h = 8 * e - d - 1,
				i = (1 << h) - 1,
				j = i >> 1,
				k = -7,
				l = c ? e - 1 : 0,
				m = c ? -1 : 1,
				n = a[b + l];
			for(l += m, f = n & (1 << -k) - 1, n >>= -k, k += h; k > 0; f = 256 * f + a[b + l], l += m, k -= 8);
			for(g = f & (1 << -k) - 1, f >>= -k, k += d; k > 0; g = 256 * g + a[b + l], l += m, k -= 8);
			if(0 === f) f = 1 - j;
			else {
				if(f === i) return g ? NaN : 1 / 0 * (n ? -1 : 1);
				g += Math.pow(2, d), f -= j
			}
			return(n ? -1 : 1) * g * Math.pow(2, f - d)
		}, c.write = function(a, b, c, d, e, f) {
			var g, h, i, j = 8 * f - e - 1,
				k = (1 << j) - 1,
				l = k >> 1,
				m = 23 === e ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
				n = d ? 0 : f - 1,
				o = d ? 1 : -1,
				p = b < 0 || 0 === b && 1 / b < 0 ? 1 : 0;
			for(b = Math.abs(b), isNaN(b) || b === 1 / 0 ? (h = isNaN(b) ? 1 : 0, g = k) : (g = Math.floor(Math.log(b) / Math.LN2), b * (i = Math.pow(2, -g)) < 1 && (g--, i *= 2), b += g + l >= 1 ? m / i : m * Math.pow(2, 1 - l), b * i >= 2 && (g++, i /= 2), g + l >= k ? (h = 0, g = k) : g + l >= 1 ? (h = (b * i - 1) * Math.pow(2, e), g += l) : (h = b * Math.pow(2, l - 1) * Math.pow(2, e), g = 0)); e >= 8; a[c + n] = 255 & h, n += o, h /= 256, e -= 8);
			for(g = g << e | h, j += e; j > 0; a[c + n] = 255 & g, n += o, g /= 256, j -= 8);
			a[c + n - o] |= 128 * p
		}
	}, {}],
	38: [function(a, b, c) {
		var d = Array.isArray,
			e = Object.prototype.toString;
		b.exports = d || function(a) {
			return !!a && "[object Array]" == e.call(a)
		}
	}, {}],
	39: [function(a, b, c) {
		(function(a) {
			function b(a) {
				var b, c, d = "";
				for(b = 0; b + 3 <= a.length; b += 3) c = parseInt(a.substring(b, b + 3), 16), d += Vc.charAt(c >> 6) + Vc.charAt(63 & c);
				if(b + 1 == a.length ? (c = parseInt(a.substring(b, b + 1), 16), d += Vc.charAt(c << 2)) : b + 2 == a.length && (c = parseInt(a.substring(b, b + 2), 16), d += Vc.charAt(c >> 2) + Vc.charAt((3 & c) << 4)), Wc)
					for(;
						(3 & d.length) > 0;) d += Wc;
				return d
			}

			function d(a) {
				var b, c, d, e = "",
					f = 0;
				for(b = 0; b < a.length && a.charAt(b) != Wc; ++b)(d = Vc.indexOf(a.charAt(b))) < 0 || (0 == f ? (e += k(d >> 2), c = 3 & d, f = 1) : 1 == f ? (e += k(c << 2 | d >> 4), c = 15 & d, f = 2) : 2 == f ? (e += k(c), e += k(d >> 2), c = 3 & d, f = 3) : (e += k(c << 2 | d >> 4), e += k(15 & d), f = 0));
				return 1 == f && (e += k(c << 2)), e
			}

			function e(a) {
				var b, c = d(a),
					e = new Array;
				for(b = 0; 2 * b < c.length; ++b) e[b] = parseInt(c.substring(2 * b, 2 * b + 2), 16);
				return e
			}

			function f(a, b, c) {
				null != a && ("number" == typeof a ? this.fromNumber(a, b, c) : null == b && "string" != typeof a ? this.fromString(a, 256) : this.fromString(a, b))
			}

			function g() {
				return new f(null)
			}

			function h(a, b, c, d, e, f) {
				for(; --f >= 0;) {
					var g = b * this[a++] + c[d] + e;
					e = Math.floor(g / 67108864), c[d++] = 67108863 & g
				}
				return e
			}

			function i(a, b, c, d, e, f) {
				for(var g = 32767 & b, h = b >> 15; --f >= 0;) {
					var i = 32767 & this[a],
						j = this[a++] >> 15,
						k = h * i + j * g;
					i = g * i + ((32767 & k) << 15) + c[d] + (1073741823 & e), e = (i >>> 30) + (k >>> 15) + h * j + (e >>> 30), c[d++] = 1073741823 & i
				}
				return e
			}

			function j(a, b, c, d, e, f) {
				for(var g = 16383 & b, h = b >> 14; --f >= 0;) {
					var i = 16383 & this[a],
						j = this[a++] >> 14,
						k = h * i + j * g;
					i = g * i + ((16383 & k) << 14) + c[d] + e, e = (i >> 28) + (k >> 14) + h * j, c[d++] = 268435455 & i
				}
				return e
			}

			function k(a) {
				return ad.charAt(a)
			}

			function l(a, b) {
				var c = bd[a.charCodeAt(b)];
				return null == c ? -1 : c
			}

			function m(a) {
				for(var b = this.t - 1; b >= 0; --b) a[b] = this[b];
				a.t = this.t, a.s = this.s
			}

			function n(a) {
				this.t = 1, this.s = a < 0 ? -1 : 0, a > 0 ? this[0] = a : a < -1 ? this[0] = a + this.DV : this.t = 0
			}

			function o(a) {
				var b = g();
				return b.fromInt(a), b
			}

			function p(a, b) {
				var c;
				if(16 == b) c = 4;
				else if(8 == b) c = 3;
				else if(256 == b) c = 8;
				else if(2 == b) c = 1;
				else if(32 == b) c = 5;
				else {
					if(4 != b) return void this.fromRadix(a, b);
					c = 2
				}
				this.t = 0, this.s = 0;
				for(var d = a.length, e = !1, g = 0; --d >= 0;) {
					var h = 8 == c ? 255 & a[d] : l(a, d);
					h < 0 ? "-" == a.charAt(d) && (e = !0) : (e = !1, 0 == g ? this[this.t++] = h : g + c > this.DB ? (this[this.t - 1] |= (h & (1 << this.DB - g) - 1) << g, this[this.t++] = h >> this.DB - g) : this[this.t - 1] |= h << g, (g += c) >= this.DB && (g -= this.DB))
				}
				8 == c && 0 != (128 & a[0]) && (this.s = -1, g > 0 && (this[this.t - 1] |= (1 << this.DB - g) - 1 << g)), this.clamp(), e && f.ZERO.subTo(this, this)
			}

			function q() {
				for(var a = this.s & this.DM; this.t > 0 && this[this.t - 1] == a;) --this.t
			}

			function r(a) {
				if(this.s < 0) return "-" + this.negate().toString(a);
				var b;
				if(16 == a) b = 4;
				else if(8 == a) b = 3;
				else if(2 == a) b = 1;
				else if(32 == a) b = 5;
				else {
					if(4 != a) return this.toRadix(a);
					b = 2
				}
				var c, d = (1 << b) - 1,
					e = !1,
					f = "",
					g = this.t,
					h = this.DB - g * this.DB % b;
				if(g-- > 0)
					for(h < this.DB && (c = this[g] >> h) > 0 && (e = !0, f = k(c)); g >= 0;) h < b ? (c = (this[g] & (1 << h) - 1) << b - h, c |= this[--g] >> (h += this.DB - b)) : (c = this[g] >> (h -= b) & d, h <= 0 && (h += this.DB, --g)), c > 0 && (e = !0), e && (f += k(c));
				return e ? f : "0"
			}

			function s() {
				var a = g();
				return f.ZERO.subTo(this, a), a
			}

			function t() {
				return this.s < 0 ? this.negate() : this
			}

			function u(a) {
				var b = this.s - a.s;
				if(0 != b) return b;
				var c = this.t;
				if(0 != (b = c - a.t)) return this.s < 0 ? -b : b;
				for(; --c >= 0;)
					if(0 != (b = this[c] - a[c])) return b;
				return 0
			}

			function v(a) {
				var b, c = 1;
				return 0 != (b = a >>> 16) && (a = b, c += 16), 0 != (b = a >> 8) && (a = b, c += 8), 0 != (b = a >> 4) && (a = b, c += 4), 0 != (b = a >> 2) && (a = b, c += 2), 0 != (b = a >> 1) && (a = b, c += 1), c
			}

			function w() {
				return this.t <= 0 ? 0 : this.DB * (this.t - 1) + v(this[this.t - 1] ^ this.s & this.DM)
			}

			function x(a, b) {
				var c;
				for(c = this.t - 1; c >= 0; --c) b[c + a] = this[c];
				for(c = a - 1; c >= 0; --c) b[c] = 0;
				b.t = this.t + a, b.s = this.s
			}

			function y(a, b) {
				for(var c = a; c < this.t; ++c) b[c - a] = this[c];
				b.t = Math.max(this.t - a, 0), b.s = this.s
			}

			function z(a, b) {
				var c, d = a % this.DB,
					e = this.DB - d,
					f = (1 << e) - 1,
					g = Math.floor(a / this.DB),
					h = this.s << d & this.DM;
				for(c = this.t - 1; c >= 0; --c) b[c + g + 1] = this[c] >> e | h, h = (this[c] & f) << d;
				for(c = g - 1; c >= 0; --c) b[c] = 0;
				b[g] = h, b.t = this.t + g + 1, b.s = this.s, b.clamp()
			}

			function A(a, b) {
				b.s = this.s;
				var c = Math.floor(a / this.DB);
				if(c >= this.t) return void(b.t = 0);
				var d = a % this.DB,
					e = this.DB - d,
					f = (1 << d) - 1;
				b[0] = this[c] >> d;
				for(var g = c + 1; g < this.t; ++g) b[g - c - 1] |= (this[g] & f) << e, b[g - c] = this[g] >> d;
				d > 0 && (b[this.t - c - 1] |= (this.s & f) << e), b.t = this.t - c, b.clamp()
			}

			function B(a, b) {
				for(var c = 0, d = 0, e = Math.min(a.t, this.t); c < e;) d += this[c] - a[c], b[c++] = d & this.DM, d >>= this.DB;
				if(a.t < this.t) {
					for(d -= a.s; c < this.t;) d += this[c], b[c++] = d & this.DM, d >>= this.DB;
					d += this.s
				} else {
					for(d += this.s; c < a.t;) d -= a[c], b[c++] = d & this.DM, d >>= this.DB;
					d -= a.s
				}
				b.s = d < 0 ? -1 : 0, d < -1 ? b[c++] = this.DV + d : d > 0 && (b[c++] = d), b.t = c, b.clamp()
			}

			function C(a, b) {
				var c = this.abs(),
					d = a.abs(),
					e = c.t;
				for(b.t = e + d.t; --e >= 0;) b[e] = 0;
				for(e = 0; e < d.t; ++e) b[e + c.t] = c.am(0, d[e], b, e, 0, c.t);
				b.s = 0, b.clamp(), this.s != a.s && f.ZERO.subTo(b, b)
			}

			function D(a) {
				for(var b = this.abs(), c = a.t = 2 * b.t; --c >= 0;) a[c] = 0;
				for(c = 0; c < b.t - 1; ++c) {
					var d = b.am(c, b[c], a, 2 * c, 0, 1);
					(a[c + b.t] += b.am(c + 1, 2 * b[c], a, 2 * c + 1, d, b.t - c - 1)) >= b.DV && (a[c + b.t] -= b.DV, a[c + b.t + 1] = 1)
				}
				a.t > 0 && (a[a.t - 1] += b.am(c, b[c], a, 2 * c, 0, 1)), a.s = 0, a.clamp()
			}

			function E(a, b, c) {
				var d = a.abs();
				if(!(d.t <= 0)) {
					var e = this.abs();
					if(e.t < d.t) return null != b && b.fromInt(0), void(null != c && this.copyTo(c));
					null == c && (c = g());
					var h = g(),
						i = this.s,
						j = a.s,
						k = this.DB - v(d[d.t - 1]);
					k > 0 ? (d.lShiftTo(k, h), e.lShiftTo(k, c)) : (d.copyTo(h), e.copyTo(c));
					var l = h.t,
						m = h[l - 1];
					if(0 != m) {
						var n = m * (1 << this.F1) + (l > 1 ? h[l - 2] >> this.F2 : 0),
							o = this.FV / n,
							p = (1 << this.F1) / n,
							q = 1 << this.F2,
							r = c.t,
							s = r - l,
							t = null == b ? g() : b;
						for(h.dlShiftTo(s, t), c.compareTo(t) >= 0 && (c[c.t++] = 1, c.subTo(t, c)), f.ONE.dlShiftTo(l, t), t.subTo(h, h); h.t < l;) h[h.t++] = 0;
						for(; --s >= 0;) {
							var u = c[--r] == m ? this.DM : Math.floor(c[r] * o + (c[r - 1] + q) * p);
							if((c[r] += h.am(0, u, c, s, 0, l)) < u)
								for(h.dlShiftTo(s, t), c.subTo(t, c); c[r] < --u;) c.subTo(t, c)
						}
						null != b && (c.drShiftTo(l, b), i != j && f.ZERO.subTo(b, b)), c.t = l, c.clamp(), k > 0 && c.rShiftTo(k, c), i < 0 && f.ZERO.subTo(c, c)
					}
				}
			}

			function F(a) {
				var b = g();
				return this.abs().divRemTo(a, null, b), this.s < 0 && b.compareTo(f.ZERO) > 0 && a.subTo(b, b), b
			}

			function G(a) {
				this.m = a
			}

			function H(a) {
				return a.s < 0 || a.compareTo(this.m) >= 0 ? a.mod(this.m) : a
			}

			function I(a) {
				return a
			}

			function J(a) {
				a.divRemTo(this.m, null, a)
			}

			function K(a, b, c) {
				a.multiplyTo(b, c), this.reduce(c)
			}

			function L(a, b) {
				a.squareTo(b), this.reduce(b)
			}

			function M() {
				if(this.t < 1) return 0;
				var a = this[0];
				if(0 == (1 & a)) return 0;
				var b = 3 & a;
				return b = b * (2 - (15 & a) * b) & 15, b = b * (2 - (255 & a) * b) & 255, b = b * (2 - ((65535 & a) * b & 65535)) & 65535, b = b * (2 - a * b % this.DV) % this.DV, b > 0 ? this.DV - b : -b
			}

			function N(a) {
				this.m = a, this.mp = a.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, this.um = (1 << a.DB - 15) - 1, this.mt2 = 2 * a.t
			}

			function O(a) {
				var b = g();
				return a.abs().dlShiftTo(this.m.t, b), b.divRemTo(this.m, null, b), a.s < 0 && b.compareTo(f.ZERO) > 0 && this.m.subTo(b, b), b
			}

			function P(a) {
				var b = g();
				return a.copyTo(b), this.reduce(b), b
			}

			function Q(a) {
				for(; a.t <= this.mt2;) a[a.t++] = 0;
				for(var b = 0; b < this.m.t; ++b) {
					var c = 32767 & a[b],
						d = c * this.mpl + ((c * this.mph + (a[b] >> 15) * this.mpl & this.um) << 15) & a.DM;
					for(c = b + this.m.t, a[c] += this.m.am(0, d, a, b, 0, this.m.t); a[c] >= a.DV;) a[c] -= a.DV, a[++c]++
				}
				a.clamp(), a.drShiftTo(this.m.t, a), a.compareTo(this.m) >= 0 && a.subTo(this.m, a)
			}

			function R(a, b) {
				a.squareTo(b), this.reduce(b)
			}

			function S(a, b, c) {
				a.multiplyTo(b, c), this.reduce(c)
			}

			function T() {
				return 0 == (this.t > 0 ? 1 & this[0] : this.s)
			}

			function U(a, b) {
				if(a > 4294967295 || a < 1) return f.ONE;
				var c = g(),
					d = g(),
					e = b.convert(this),
					h = v(a) - 1;
				for(e.copyTo(c); --h >= 0;)
					if(b.sqrTo(c, d), (a & 1 << h) > 0) b.mulTo(d, e, c);
					else {
						var i = c;
						c = d, d = i
					}
				return b.revert(c)
			}

			function V(a, b) {
				var c;
				return c = a < 256 || b.isEven() ? new G(b) : new N(b), this.exp(a, c)
			}

			function W() {
				var a = g();
				return this.copyTo(a), a
			}

			function X() {
				if(this.s < 0) {
					if(1 == this.t) return this[0] - this.DV;
					if(0 == this.t) return -1
				} else {
					if(1 == this.t) return this[0];
					if(0 == this.t) return 0
				}
				return(this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
			}

			function Y() {
				return 0 == this.t ? this.s : this[0] << 24 >> 24
			}

			function Z() {
				return 0 == this.t ? this.s : this[0] << 16 >> 16
			}

			function $(a) {
				return Math.floor(Math.LN2 * this.DB / Math.log(a))
			}

			function _() {
				return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
			}

			function aa(a) {
				if(null == a && (a = 10), 0 == this.signum() || a < 2 || a > 36) return "0";
				var b = this.chunkSize(a),
					c = Math.pow(a, b),
					d = o(c),
					e = g(),
					f = g(),
					h = "";
				for(this.divRemTo(d, e, f); e.signum() > 0;) h = (c + f.intValue()).toString(a).substr(1) + h, e.divRemTo(d, e, f);
				return f.intValue().toString(a) + h
			}

			function ba(a, b) {
				this.fromInt(0), null == b && (b = 10);
				for(var c = this.chunkSize(b), d = Math.pow(b, c), e = !1, g = 0, h = 0, i = 0; i < a.length; ++i) {
					var j = l(a, i);
					j < 0 ? "-" == a.charAt(i) && 0 == this.signum() && (e = !0) : (h = b * h + j, ++g >= c && (this.dMultiply(d), this.dAddOffset(h, 0), g = 0, h = 0))
				}
				g > 0 && (this.dMultiply(Math.pow(b, g)), this.dAddOffset(h, 0)), e && f.ZERO.subTo(this, this)
			}

			function ca(a, b, c) {
				if("number" == typeof b)
					if(a < 2) this.fromInt(1);
					else
						for(this.fromNumber(a, c), this.testBit(a - 1) || this.bitwiseTo(f.ONE.shiftLeft(a - 1), ka, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(b);) this.dAddOffset(2, 0), this.bitLength() > a && this.subTo(f.ONE.shiftLeft(a - 1), this);
				else {
					var d = new Array,
						e = 7 & a;
					d.length = 1 + (a >> 3), b.nextBytes(d), e > 0 ? d[0] &= (1 << e) - 1 : d[0] = 0, this.fromString(d, 256)
				}
			}

			function da() {
				var a = this.t,
					b = new Array;
				b[0] = this.s;
				var c, d = this.DB - a * this.DB % 8,
					e = 0;
				if(a-- > 0)
					for(d < this.DB && (c = this[a] >> d) != (this.s & this.DM) >> d && (b[e++] = c | this.s << this.DB - d); a >= 0;) d < 8 ? (c = (this[a] & (1 << d) - 1) << 8 - d, c |= this[--a] >> (d += this.DB - 8)) : (c = this[a] >> (d -= 8) & 255, d <= 0 && (d += this.DB, --a)), 0 != (128 & c) && (c |= -256), 0 == e && (128 & this.s) != (128 & c) && ++e, (e > 0 || c != this.s) && (b[e++] = c);
				return b
			}

			function ea(a) {
				return 0 == this.compareTo(a)
			}

			function fa(a) {
				return this.compareTo(a) < 0 ? this : a
			}

			function ga(a) {
				return this.compareTo(a) > 0 ? this : a
			}

			function ha(a, b, c) {
				var d, e, f = Math.min(a.t, this.t);
				for(d = 0; d < f; ++d) c[d] = b(this[d], a[d]);
				if(a.t < this.t) {
					for(e = a.s & this.DM, d = f; d < this.t; ++d) c[d] = b(this[d], e);
					c.t = this.t
				} else {
					for(e = this.s & this.DM, d = f; d < a.t; ++d) c[d] = b(e, a[d]);
					c.t = a.t
				}
				c.s = b(this.s, a.s), c.clamp()
			}

			function ia(a, b) {
				return a & b
			}

			function ja(a) {
				var b = g();
				return this.bitwiseTo(a, ia, b), b
			}

			function ka(a, b) {
				return a | b
			}

			function la(a) {
				var b = g();
				return this.bitwiseTo(a, ka, b), b
			}

			function ma(a, b) {
				return a ^ b
			}

			function na(a) {
				var b = g();
				return this.bitwiseTo(a, ma, b), b
			}

			function oa(a, b) {
				return a & ~b
			}

			function pa(a) {
				var b = g();
				return this.bitwiseTo(a, oa, b), b
			}

			function qa() {
				for(var a = g(), b = 0; b < this.t; ++b) a[b] = this.DM & ~this[b];
				return a.t = this.t, a.s = ~this.s, a
			}

			function ra(a) {
				var b = g();
				return a < 0 ? this.rShiftTo(-a, b) : this.lShiftTo(a, b), b
			}

			function sa(a) {
				var b = g();
				return a < 0 ? this.lShiftTo(-a, b) : this.rShiftTo(a, b), b
			}

			function ta(a) {
				if(0 == a) return -1;
				var b = 0;
				return 0 == (65535 & a) && (a >>= 16, b += 16), 0 == (255 & a) && (a >>= 8, b += 8), 0 == (15 & a) && (a >>= 4, b += 4), 0 == (3 & a) && (a >>= 2, b += 2), 0 == (1 & a) && ++b, b
			}

			function ua() {
				for(var a = 0; a < this.t; ++a)
					if(0 != this[a]) return a * this.DB + ta(this[a]);
				return this.s < 0 ? this.t * this.DB : -1
			}

			function va(a) {
				for(var b = 0; 0 != a;) a &= a - 1, ++b;
				return b
			}

			function wa() {
				for(var a = 0, b = this.s & this.DM, c = 0; c < this.t; ++c) a += va(this[c] ^ b);
				return a
			}

			function xa(a) {
				var b = Math.floor(a / this.DB);
				return b >= this.t ? 0 != this.s : 0 != (this[b] & 1 << a % this.DB)
			}

			function ya(a, b) {
				var c = f.ONE.shiftLeft(a);
				return this.bitwiseTo(c, b, c), c
			}

			function za(a) {
				return this.changeBit(a, ka)
			}

			function Aa(a) {
				return this.changeBit(a, oa)
			}

			function Ba(a) {
				return this.changeBit(a, ma)
			}

			function Ca(a, b) {
				for(var c = 0, d = 0, e = Math.min(a.t, this.t); c < e;) d += this[c] + a[c], b[c++] = d & this.DM, d >>= this.DB;
				if(a.t < this.t) {
					for(d += a.s; c < this.t;) d += this[c], b[c++] = d & this.DM, d >>= this.DB;
					d += this.s
				} else {
					for(d += this.s; c < a.t;) d += a[c], b[c++] = d & this.DM, d >>= this.DB;
					d += a.s
				}
				b.s = d < 0 ? -1 : 0, d > 0 ? b[c++] = d : d < -1 && (b[c++] = this.DV + d), b.t = c, b.clamp()
			}

			function Da(a) {
				var b = g();
				return this.addTo(a, b), b
			}

			function Ea(a) {
				var b = g();
				return this.subTo(a, b), b
			}

			function Fa(a) {
				var b = g();
				return this.multiplyTo(a, b), b
			}

			function Ga() {
				var a = g();
				return this.squareTo(a), a
			}

			function Ha(a) {
				var b = g();
				return this.divRemTo(a, b, null), b
			}

			function Ia(a) {
				var b = g();
				return this.divRemTo(a, null, b), b
			}

			function Ja(a) {
				var b = g(),
					c = g();
				return this.divRemTo(a, b, c), new Array(b, c)
			}

			function Ka(a) {
				this[this.t] = this.am(0, a - 1, this, 0, 0, this.t), ++this.t, this.clamp()
			}

			function La(a, b) {
				if(0 != a) {
					for(; this.t <= b;) this[this.t++] = 0;
					for(this[b] += a; this[b] >= this.DV;) this[b] -= this.DV, ++b >= this.t && (this[this.t++] = 0), ++this[b]
				}
			}

			function Ma() {}

			function Na(a) {
				return a
			}

			function Oa(a, b, c) {
				a.multiplyTo(b, c)
			}

			function Pa(a, b) {
				a.squareTo(b)
			}

			function Qa(a) {
				return this.exp(a, new Ma)
			}

			function Ra(a, b, c) {
				var d = Math.min(this.t + a.t, b);
				for(c.s = 0, c.t = d; d > 0;) c[--d] = 0;
				var e;
				for(e = c.t - this.t; d < e; ++d) c[d + this.t] = this.am(0, a[d], c, d, 0, this.t);
				for(e = Math.min(a.t, b); d < e; ++d) this.am(0, a[d], c, d, 0, b - d);
				c.clamp()
			}

			function Sa(a, b, c) {
				--b;
				var d = c.t = this.t + a.t - b;
				for(c.s = 0; --d >= 0;) c[d] = 0;
				for(d = Math.max(b - this.t, 0); d < a.t; ++d) c[this.t + d - b] = this.am(b - d, a[d], c, 0, 0, this.t + d - b);
				c.clamp(), c.drShiftTo(1, c)
			}

			function Ta(a) {
				this.r2 = g(), this.q3 = g(), f.ONE.dlShiftTo(2 * a.t, this.r2), this.mu = this.r2.divide(a), this.m = a
			}

			function Ua(a) {
				if(a.s < 0 || a.t > 2 * this.m.t) return a.mod(this.m);
				if(a.compareTo(this.m) < 0) return a;
				var b = g();
				return a.copyTo(b), this.reduce(b), b
			}

			function Va(a) {
				return a
			}

			function Wa(a) {
				for(a.drShiftTo(this.m.t - 1, this.r2), a.t > this.m.t + 1 && (a.t = this.m.t + 1, a.clamp()), this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3), this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); a.compareTo(this.r2) < 0;) a.dAddOffset(1, this.m.t + 1);
				for(a.subTo(this.r2, a); a.compareTo(this.m) >= 0;) a.subTo(this.m, a)
			}

			function Xa(a, b) {
				a.squareTo(b), this.reduce(b)
			}

			function Ya(a, b, c) {
				a.multiplyTo(b, c), this.reduce(c)
			}

			function Za(a, b) {
				var c, d, e = a.bitLength(),
					f = o(1);
				if(e <= 0) return f;
				c = e < 18 ? 1 : e < 48 ? 3 : e < 144 ? 4 : e < 768 ? 5 : 6, d = e < 8 ? new G(b) : b.isEven() ? new Ta(b) : new N(b);
				var h = new Array,
					i = 3,
					j = c - 1,
					k = (1 << c) - 1;
				if(h[1] = d.convert(this), c > 1) {
					var l = g();
					for(d.sqrTo(h[1], l); i <= k;) h[i] = g(), d.mulTo(l, h[i - 2], h[i]), i += 2
				}
				var m, n, p = a.t - 1,
					q = !0,
					r = g();
				for(e = v(a[p]) - 1; p >= 0;) {
					for(e >= j ? m = a[p] >> e - j & k : (m = (a[p] & (1 << e + 1) - 1) << j - e, p > 0 && (m |= a[p - 1] >> this.DB + e - j)), i = c; 0 == (1 & m);) m >>= 1, --i;
					if((e -= i) < 0 && (e += this.DB, --p), q) h[m].copyTo(f), q = !1;
					else {
						for(; i > 1;) d.sqrTo(f, r), d.sqrTo(r, f), i -= 2;
						i > 0 ? d.sqrTo(f, r) : (n = f, f = r, r = n), d.mulTo(r, h[m], f)
					}
					for(; p >= 0 && 0 == (a[p] & 1 << e);) d.sqrTo(f, r), n = f, f = r, r = n, --e < 0 && (e = this.DB - 1, --p)
				}
				return d.revert(f)
			}

			function $a(a) {
				var b = this.s < 0 ? this.negate() : this.clone(),
					c = a.s < 0 ? a.negate() : a.clone();
				if(b.compareTo(c) < 0) {
					var d = b;
					b = c, c = d
				}
				var e = b.getLowestSetBit(),
					f = c.getLowestSetBit();
				if(f < 0) return b;
				for(e < f && (f = e), f > 0 && (b.rShiftTo(f, b), c.rShiftTo(f, c)); b.signum() > 0;)(e = b.getLowestSetBit()) > 0 && b.rShiftTo(e, b), (e = c.getLowestSetBit()) > 0 && c.rShiftTo(e, c), b.compareTo(c) >= 0 ? (b.subTo(c, b), b.rShiftTo(1, b)) : (c.subTo(b, c), c.rShiftTo(1, c));
				return f > 0 && c.lShiftTo(f, c), c
			}

			function _a(a) {
				if(a <= 0) return 0;
				var b = this.DV % a,
					c = this.s < 0 ? a - 1 : 0;
				if(this.t > 0)
					if(0 == b) c = this[0] % a;
					else
						for(var d = this.t - 1; d >= 0; --d) c = (b * c + this[d]) % a;
				return c
			}

			function ab(a) {
				var b = a.isEven();
				if(this.isEven() && b || 0 == a.signum()) return f.ZERO;
				for(var c = a.clone(), d = this.clone(), e = o(1), g = o(0), h = o(0), i = o(1); 0 != c.signum();) {
					for(; c.isEven();) c.rShiftTo(1, c), b ? (e.isEven() && g.isEven() || (e.addTo(this, e), g.subTo(a, g)), e.rShiftTo(1, e)) : g.isEven() || g.subTo(a, g), g.rShiftTo(1, g);
					for(; d.isEven();) d.rShiftTo(1, d), b ? (h.isEven() && i.isEven() || (h.addTo(this, h), i.subTo(a, i)), h.rShiftTo(1, h)) : i.isEven() || i.subTo(a, i), i.rShiftTo(1, i);
					c.compareTo(d) >= 0 ? (c.subTo(d, c), b && e.subTo(h, e), g.subTo(i, g)) : (d.subTo(c, d), b && h.subTo(e, h), i.subTo(g, i))
				}
				return 0 != d.compareTo(f.ONE) ? f.ZERO : i.compareTo(a) >= 0 ? i.subtract(a) : i.signum() < 0 ? (i.addTo(a, i), i.signum() < 0 ? i.add(a) : i) : i
			}

			function bb(a) {
				var b, c = this.abs();
				if(1 == c.t && c[0] <= cd[cd.length - 1]) {
					for(b = 0; b < cd.length; ++b)
						if(c[0] == cd[b]) return !0;
					return !1
				}
				if(c.isEven()) return !1;
				for(b = 1; b < cd.length;) {
					for(var d = cd[b], e = b + 1; e < cd.length && d < dd;) d *= cd[e++];
					for(d = c.modInt(d); b < e;)
						if(d % cd[b++] == 0) return !1
				}
				return c.millerRabin(a)
			}

			function cb(a) {
				var b = this.subtract(f.ONE),
					c = b.getLowestSetBit();
				if(c <= 0) return !1;
				var d = b.shiftRight(c);
				(a = a + 1 >> 1) > cd.length && (a = cd.length);
				for(var e = g(), h = 0; h < a; ++h) {
					e.fromInt(cd[Math.floor(Math.random() * cd.length)]);
					var i = e.modPow(d, this);
					if(0 != i.compareTo(f.ONE) && 0 != i.compareTo(b)) {
						for(var j = 1; j++ < c && 0 != i.compareTo(b);)
							if(i = i.modPowInt(2, this), 0 == i.compareTo(f.ONE)) return !1;
						if(0 != i.compareTo(b)) return !1
					}
				}
				return !0
			}

			function db() {
				this.i = 0, this.j = 0, this.S = new Array
			}

			function eb(a) {
				var b, c, d;
				for(b = 0; b < 256; ++b) this.S[b] = b;
				for(c = 0, b = 0; b < 256; ++b) c = c + this.S[b] + a[b % a.length] & 255, d = this.S[b], this.S[b] = this.S[c], this.S[c] = d;
				this.i = 0, this.j = 0
			}

			function fb() {
				var a;
				return this.i = this.i + 1 & 255, this.j = this.j + this.S[this.i] & 255, a = this.S[this.i], this.S[this.i] = this.S[this.j], this.S[this.j] = a, this.S[a + this.S[this.i] & 255]
			}

			function gb() {
				return new db
			}

			function hb(a) {
				fd[gd++] ^= 255 & a, fd[gd++] ^= a >> 8 & 255, fd[gd++] ^= a >> 16 & 255, fd[gd++] ^= a >> 24 & 255, gd >= hd && (gd -= hd)
			}

			function ib() {
				hb((new Date).getTime())
			}

			function jb() {
				if(null == ed) {
					for(ib(), ed = gb(), ed.init(fd), gd = 0; gd < fd.length; ++gd) fd[gd] = 0;
					gd = 0
				}
				return ed.next()
			}

			function kb(a) {
				var b;
				for(b = 0; b < a.length; ++b) a[b] = jb()
			}

			function lb() {}

			function mb(a, b) {
				return new f(a, b)
			}

			function nb(a, b) {
				if(b < a.length + 11) return alert("Message too long for RSA"), null;
				for(var c = new Array, d = a.length - 1; d >= 0 && b > 0;) {
					var e = a.charCodeAt(d--);
					e < 128 ? c[--b] = e : e > 127 && e < 2048 ? (c[--b] = 63 & e | 128, c[--b] = e >> 6 | 192) : (c[--b] = 63 & e | 128, c[--b] = e >> 6 & 63 | 128, c[--b] = e >> 12 | 224)
				}
				c[--b] = 0;
				for(var g = new lb, h = new Array; b > 2;) {
					for(h[0] = 0; 0 == h[0];) g.nextBytes(h);
					c[--b] = h[0]
				}
				return c[--b] = 2, c[--b] = 0, new f(c)
			}

			function ob(a, b, c) {
				for(var d = "", e = 0; d.length < b;) d += c(String.fromCharCode.apply(String, a.concat([(4278190080 & e) >> 24, (16711680 & e) >> 16, (65280 & e) >> 8, 255 & e]))), e += 1;
				return d
			}

			function pb(a, b, c, d) {
				var e = od.crypto.MessageDigest,
					g = od.crypto.Util,
					h = null;
				if(c || (c = "sha1"), "string" == typeof c && (h = e.getCanonicalAlgName(c), d = e.getHashLength(h), c = function(a) {
						return sc(g.hashString(a, h))
					}), a.length + 2 * d + 2 > b) throw "Message too long for RSA";
				var i, j = "";
				for(i = 0; i < b - a.length - 2 * d - 2; i += 1) j += "\0";
				var k = c("") + j + "" + a,
					l = new Array(d);
				(new lb).nextBytes(l);
				var m = ob(l, k.length, c),
					n = [];
				for(i = 0; i < k.length; i += 1) n[i] = k.charCodeAt(i) ^ m.charCodeAt(i);
				var o = ob(n, l.length, c),
					p = [0];
				for(i = 0; i < l.length; i += 1) p[i + 1] = l[i] ^ o.charCodeAt(i);
				return new f(p.concat(n))
			}

			function qb() {
				this.n = null, this.e = 0, this.d = null, this.p = null, this.q = null, this.dmp1 = null, this.dmq1 = null, this.coeff = null
			}

			function rb(a, b) {
				if(this.isPublic = !0, this.isPrivate = !1, "string" != typeof a) this.n = a, this.e = b;
				else {
					if(!(null != a && null != b && a.length > 0 && b.length > 0)) throw "Invalid RSA public key";
					this.n = mb(a, 16), this.e = parseInt(b, 16)
				}
			}

			function sb(a) {
				return a.modPowInt(this.e, this.n)
			}

			function tb(a) {
				var b = nb(a, this.n.bitLength() + 7 >> 3);
				if(null == b) return null;
				var c = this.doPublic(b);
				if(null == c) return null;
				var d = c.toString(16);
				return 0 == (1 & d.length) ? d : "0" + d
			}

			function ub(a, b, c) {
				var d = pb(a, this.n.bitLength() + 7 >> 3, b, c);
				if(null == d) return null;
				var e = this.doPublic(d);
				if(null == e) return null;
				var f = e.toString(16);
				return 0 == (1 & f.length) ? f : "0" + f
			}

			function vb(a, b) {
				for(var c = a.toByteArray(), d = 0; d < c.length && 0 == c[d];) ++d;
				if(c.length - d != b - 1 || 2 != c[d]) return null;
				for(++d; 0 != c[d];)
					if(++d >= c.length) return null;
				for(var e = ""; ++d < c.length;) {
					var f = 255 & c[d];
					f < 128 ? e += String.fromCharCode(f) : f > 191 && f < 224 ? (e += String.fromCharCode((31 & f) << 6 | 63 & c[d + 1]), ++d) : (e += String.fromCharCode((15 & f) << 12 | (63 & c[d + 1]) << 6 | 63 & c[d + 2]), d += 2)
				}
				return e
			}

			function wb(a, b, c) {
				for(var d = "", e = 0; d.length < b;) d += c(a + String.fromCharCode.apply(String, [(4278190080 & e) >> 24, (16711680 & e) >> 16, (65280 & e) >> 8, 255 & e])), e += 1;
				return d
			}

			function xb(a, b, c, d) {
				var e = od.crypto.MessageDigest,
					f = od.crypto.Util,
					g = null;
				c || (c = "sha1"), "string" == typeof c && (g = e.getCanonicalAlgName(c), d = e.getHashLength(g), c = function(a) {
					return sc(f.hashString(a, g))
				}), a = a.toByteArray();
				var h;
				for(h = 0; h < a.length; h += 1) a[h] &= 255;
				for(; a.length < b;) a.unshift(0);
				if(a = String.fromCharCode.apply(String, a), a.length < 2 * d + 2) throw "Cipher too short";
				var h, i = a.substr(1, d),
					j = a.substr(d + 1),
					k = wb(j, d, c),
					l = [];
				for(h = 0; h < i.length; h += 1) l[h] = i.charCodeAt(h) ^ k.charCodeAt(h);
				var m = wb(String.fromCharCode.apply(String, l), a.length - d, c),
					n = [];
				for(h = 0; h < j.length; h += 1) n[h] = j.charCodeAt(h) ^ m.charCodeAt(h);
				if(n = String.fromCharCode.apply(String, n), n.substr(0, d) !== c("")) throw "Hash mismatch";
				n = n.substr(d);
				var o = n.indexOf("");
				if((-1 != o ? n.substr(0, o).lastIndexOf("\0") : -1) + 1 != o) throw "Malformed data";
				return n.substr(o + 1)
			}

			function yb(a, b, c) {
				this.isPrivate = !0, "string" != typeof a ? (this.n = a, this.e = b, this.d = c) : null != a && null != b && a.length > 0 && b.length > 0 ? (this.n = mb(a, 16), this.e = parseInt(b, 16), this.d = mb(c, 16)) : alert("Invalid RSA private key")
			}

			function zb(a, b, c, d, e, f, g, h) {
				if(this.isPrivate = !0, this.isPublic = !1, null == a) throw "RSASetPrivateEx N == null";
				if(null == b) throw "RSASetPrivateEx E == null";
				if(0 == a.length) throw "RSASetPrivateEx N.length == 0";
				if(0 == b.length) throw "RSASetPrivateEx E.length == 0";
				null != a && null != b && a.length > 0 && b.length > 0 ? (this.n = mb(a, 16), this.e = parseInt(b, 16), this.d = mb(c, 16), this.p = mb(d, 16), this.q = mb(e, 16), this.dmp1 = mb(f, 16), this.dmq1 = mb(g, 16), this.coeff = mb(h, 16)) : alert("Invalid RSA private key in RSASetPrivateEx")
			}

			function Ab(a, b) {
				var c = new lb,
					d = a >> 1;
				this.e = parseInt(b, 16);
				for(var e = new f(b, 16);;) {
					for(; this.p = new f(a - d, 1, c), 0 != this.p.subtract(f.ONE).gcd(e).compareTo(f.ONE) || !this.p.isProbablePrime(10););
					for(; this.q = new f(d, 1, c), 0 != this.q.subtract(f.ONE).gcd(e).compareTo(f.ONE) || !this.q.isProbablePrime(10););
					if(this.p.compareTo(this.q) <= 0) {
						var g = this.p;
						this.p = this.q, this.q = g
					}
					var h = this.p.subtract(f.ONE),
						i = this.q.subtract(f.ONE),
						j = h.multiply(i);
					if(0 == j.gcd(e).compareTo(f.ONE)) {
						this.n = this.p.multiply(this.q), this.d = e.modInverse(j), this.dmp1 = this.d.mod(h), this.dmq1 = this.d.mod(i), this.coeff = this.q.modInverse(this.p);
						break
					}
				}
				this.isPrivate = !0
			}

			function Bb(a) {
				if(null == this.p || null == this.q) return a.modPow(this.d, this.n);
				for(var b = a.mod(this.p).modPow(this.dmp1, this.p), c = a.mod(this.q).modPow(this.dmq1, this.q); b.compareTo(c) < 0;) b = b.add(this.p);
				return b.subtract(c).multiply(this.coeff).mod(this.p).multiply(this.q).add(c)
			}

			function Cb(a) {
				var b = mb(a, 16),
					c = this.doPrivate(b);
				return null == c ? null : vb(c, this.n.bitLength() + 7 >> 3)
			}

			function Db(a, b, c) {
				var d = mb(a, 16),
					e = this.doPrivate(d);
				return null == e ? null : xb(e, this.n.bitLength() + 7 >> 3, b, c)
			}

			function Eb(a, b) {
				this.x = b, this.q = a
			}

			function Fb(a) {
				return a == this || this.q.equals(a.q) && this.x.equals(a.x)
			}

			function Gb() {
				return this.x
			}

			function Hb() {
				return new Eb(this.q, this.x.negate().mod(this.q))
			}

			function Ib(a) {
				return new Eb(this.q, this.x.add(a.toBigInteger()).mod(this.q))
			}

			function Jb(a) {
				return new Eb(this.q, this.x.subtract(a.toBigInteger()).mod(this.q))
			}

			function Kb(a) {
				return new Eb(this.q, this.x.multiply(a.toBigInteger()).mod(this.q))
			}

			function Lb() {
				return new Eb(this.q, this.x.square().mod(this.q))
			}

			function Mb(a) {
				return new Eb(this.q, this.x.multiply(a.toBigInteger().modInverse(this.q)).mod(this.q))
			}

			function Nb(a, b, c, d) {
				this.curve = a, this.x = b, this.y = c, this.z = null == d ? f.ONE : d, this.zinv = null
			}

			function Ob() {
				return null == this.zinv && (this.zinv = this.z.modInverse(this.curve.q)), this.curve.fromBigInteger(this.x.toBigInteger().multiply(this.zinv).mod(this.curve.q))
			}

			function Pb() {
				return null == this.zinv && (this.zinv = this.z.modInverse(this.curve.q)), this.curve.fromBigInteger(this.y.toBigInteger().multiply(this.zinv).mod(this.curve.q))
			}

			function Qb(a) {
				if(a == this) return !0;
				if(this.isInfinity()) return a.isInfinity();
				if(a.isInfinity()) return this.isInfinity();
				var b, c;
				return b = a.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(a.z)).mod(this.curve.q), !!b.equals(f.ZERO) && (c = a.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(a.z)).mod(this.curve.q), c.equals(f.ZERO))
			}

			function Rb() {
				return null == this.x && null == this.y || this.z.equals(f.ZERO) && !this.y.toBigInteger().equals(f.ZERO)
			}

			function Sb() {
				return new Nb(this.curve, this.x, this.y.negate(), this.z)
			}

			function Tb(a) {
				if(this.isInfinity()) return a;
				if(a.isInfinity()) return this;
				var b = a.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(a.z)).mod(this.curve.q),
					c = a.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(a.z)).mod(this.curve.q);
				if(f.ZERO.equals(c)) return f.ZERO.equals(b) ? this.twice() : this.curve.getInfinity();
				var d = new f("3"),
					e = this.x.toBigInteger(),
					g = this.y.toBigInteger(),
					h = (a.x.toBigInteger(), a.y.toBigInteger(), c.square()),
					i = h.multiply(c),
					j = e.multiply(h),
					k = b.square().multiply(this.z),
					l = k.subtract(j.shiftLeft(1)).multiply(a.z).subtract(i).multiply(c).mod(this.curve.q),
					m = j.multiply(d).multiply(b).subtract(g.multiply(i)).subtract(k.multiply(b)).multiply(a.z).add(b.multiply(i)).mod(this.curve.q),
					n = i.multiply(this.z).multiply(a.z).mod(this.curve.q);
				return new Nb(this.curve, this.curve.fromBigInteger(l), this.curve.fromBigInteger(m), n)
			}

			function Ub() {
				if(this.isInfinity()) return this;
				if(0 == this.y.toBigInteger().signum()) return this.curve.getInfinity();
				var a = new f("3"),
					b = this.x.toBigInteger(),
					c = this.y.toBigInteger(),
					d = c.multiply(this.z),
					e = d.multiply(c).mod(this.curve.q),
					g = this.curve.a.toBigInteger(),
					h = b.square().multiply(a);
				f.ZERO.equals(g) || (h = h.add(this.z.square().multiply(g))), h = h.mod(this.curve.q);
				var i = h.square().subtract(b.shiftLeft(3).multiply(e)).shiftLeft(1).multiply(d).mod(this.curve.q),
					j = h.multiply(a).multiply(b).subtract(e.shiftLeft(1)).shiftLeft(2).multiply(e).subtract(h.square().multiply(h)).mod(this.curve.q),
					k = d.square().multiply(d).shiftLeft(3).mod(this.curve.q);
				return new Nb(this.curve, this.curve.fromBigInteger(i), this.curve.fromBigInteger(j), k)
			}

			function Vb(a) {
				if(this.isInfinity()) return this;
				if(0 == a.signum()) return this.curve.getInfinity();
				var b, c = a,
					d = c.multiply(new f("3")),
					e = this.negate(),
					g = this;
				for(b = d.bitLength() - 2; b > 0; --b) {
					g = g.twice();
					var h = d.testBit(b);
					h != c.testBit(b) && (g = g.add(h ? this : e))
				}
				return g
			}

			function Wb(a, b, c) {
				var d;
				d = a.bitLength() > c.bitLength() ? a.bitLength() - 1 : c.bitLength() - 1;
				for(var e = this.curve.getInfinity(), f = this.add(b); d >= 0;) e = e.twice(), a.testBit(d) ? e = c.testBit(d) ? e.add(f) : e.add(this) : c.testBit(d) && (e = e.add(b)), --d;
				return e
			}

			function Xb(a, b, c) {
				this.q = a, this.a = this.fromBigInteger(b), this.b = this.fromBigInteger(c), this.infinity = new Nb(this, null, null)
			}

			function Yb() {
				return this.q
			}

			function Zb() {
				return this.a
			}

			function $b() {
				return this.b
			}

			function _b(a) {
				return a == this || this.q.equals(a.q) && this.a.equals(a.a) && this.b.equals(a.b)
			}

			function ac() {
				return this.infinity
			}

			function bc(a) {
				return new Eb(this.q, a)
			}

			function cc(a) {
				switch(parseInt(a.substr(0, 2), 16)) {
					case 0:
						return this.infinity;
					case 2:
					case 3:
						return null;
					case 4:
					case 6:
					case 7:
						var b = (a.length - 2) / 2,
							c = a.substr(2, b),
							d = a.substr(b + 2, b);
						return new Nb(this, this.fromBigInteger(new f(c, 16)), this.fromBigInteger(new f(d, 16)));
					default:
						return null
				}
			}

			function dc(a) {
				for(var b = new Array, c = 0; c < a.length; c++) b[c] = a.charCodeAt(c);
				return b
			}

			function ec(a) {
				for(var b = "", c = 0; c < a.length; c++) b += String.fromCharCode(a[c]);
				return b
			}

			function fc(a) {
				for(var b = "", c = 0; c < a.length; c++) {
					var d = a[c].toString(16);
					1 == d.length && (d = "0" + d), b += d
				}
				return b
			}

			function gc(a) {
				return fc(dc(a))
			}

			function hc(a) {
				return b(gc(a))
			}

			function ic(a) {
				return kc(b(gc(a)))
			}

			function jc(a) {
				return ec(e(lc(a)))
			}

			function kc(a) {
				return a = a.replace(/\=/g, ""), a = a.replace(/\+/g, "-"), a = a.replace(/\//g, "_")
			}

			function lc(a) {
				return a.length % 4 == 2 ? a += "==" : a.length % 4 == 3 && (a += "="), a = a.replace(/-/g, "+"), a = a.replace(/_/g, "/")
			}

			function mc(a) {
				return a.length % 2 == 1 && (a = "0" + a), kc(b(a))
			}

			function nc(a) {
				return d(lc(a))
			}

			function oc(a) {
				return b(Fc(Hc(a)))
			}

			function pc(a) {
				return decodeURIComponent(Gc(d(a)))
			}

			function qc(a) {
				return Fc(Hc(a))
			}

			function rc(a) {
				return decodeURIComponent(Gc(a))
			}

			function sc(a) {
				for(var b = "", c = 0; c < a.length - 1; c += 2) b += String.fromCharCode(parseInt(a.substr(c, 2), 16));
				return b
			}

			function tc(a) {
				for(var b = "", c = 0; c < a.length; c++) b += ("0" + a.charCodeAt(c).toString(16)).slice(-2);
				return b
			}

			function uc(a) {
				return b(a)
			}

			function vc(a) {
				var b = uc(a),
					c = b.replace(/(.{64})/g, "$1\r\n");
				return c = c.replace(/\r\n$/, "")
			}

			function wc(a) {
				return d(a.replace(/[^0-9A-Za-z\/+=]*/g, ""))
			}

			function xc(a, b) {
				return "-----BEGIN " + b + "-----\r\n" + vc(a) + "\r\n-----END " + b + "-----\r\n"
			}

			function yc(a, b) {
				if(-1 == a.indexOf("-----BEGIN ")) throw "can't find PEM header: " + b;
				return void 0 !== b ? (a = a.replace("-----BEGIN " + b + "-----", ""), a = a.replace("-----END " + b + "-----", "")) : (a = a.replace(/-----BEGIN [^-]+-----/, ""), a = a.replace(/-----END [^-]+-----/, "")), wc(a)
			}

			function zc(a) {
				if(a.length % 2 != 0) throw "input is not even length";
				if(null == a.match(/^[0-9A-Fa-f]+$/)) throw "input is not hexadecimal";
				for(var b = new ArrayBuffer(a.length / 2), c = new DataView(b), d = 0; d < a.length / 2; d++) c.setUint8(d, parseInt(a.substr(2 * d, 2), 16));
				return b
			}

			function Ac(a) {
				for(var b = "", c = new DataView(a), d = 0; d < a.byteLength; d++) b += ("00" + c.getUint8(d).toString(16)).slice(-2);
				return b
			}

			function Bc(a) {
				var b, c, d, e, f, g, h, i, j, k, l;
				if(l = a.match(/^(\d{2}|\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)(|\.\d+)Z$/)) return i = l[1], b = parseInt(i), 2 === i.length && (50 <= b && b < 100 ? b = 1900 + b : 0 <= b && b < 50 && (b = 2e3 + b)), c = parseInt(l[2]) - 1, d = parseInt(l[3]), e = parseInt(l[4]), f = parseInt(l[5]), g = parseInt(l[6]), h = 0, j = l[7], "" !== j && (k = (j.substr(1) + "00").substr(0, 3), h = parseInt(k)), Date.UTC(b, c, d, e, f, g, h);
				throw "unsupported zulu format: " + a
			}

			function Cc(a) {
				return ~~(Bc(a) / 1e3)
			}

			function Dc(a) {
				return new Date(Bc(a))
			}

			function Ec(a, b, c) {
				var d, e = a.getUTCFullYear();
				if(b) {
					if(e < 1950 || 2049 < e) throw "not proper year for UTCTime: " + e;
					d = ("" + e).slice(-2)
				} else d = ("000" + e).slice(-4);
				if(d += ("0" + (a.getUTCMonth() + 1)).slice(-2), d += ("0" + a.getUTCDate()).slice(-2), d += ("0" + a.getUTCHours()).slice(-2), d += ("0" + a.getUTCMinutes()).slice(-2), d += ("0" + a.getUTCSeconds()).slice(-2), c) {
					var f = a.getUTCMilliseconds();
					0 !== f && (f = ("00" + f).slice(-3), f = f.replace(/0+$/g, ""), d += "." + f)
				}
				return d += "Z"
			}

			function Fc(a) {
				return a.replace(/%/g, "")
			}

			function Gc(a) {
				return a.replace(/(..)/g, "%$1")
			}

			function Hc(a) {
				for(var b = encodeURIComponent(a), c = "", d = 0; d < b.length; d++) "%" == b[d] ? (c += b.substr(d, 3), d += 2) : c = c + "%" + gc(b[d]);
				return c
			}

			function Ic(a) {
				return a = a.replace(/\r\n/gm, "\n")
			}

			function Jc(a) {
				return a = a.replace(/\r\n/gm, "\n"), a = a.replace(/\n/gm, "\r\n")
			}

			function Kc(a) {
				return a.length % 2 == 1 ? "0" + a : a.substr(0, 1) > "7" ? "00" + a : a
			}

			function Lc(a) {
				a = a.replace(/^\s*\[\s*/, ""), a = a.replace(/\s*\]\s*$/, ""), a = a.replace(/\s*/g, "");
				try {
					return a.split(/,/).map(function(a, b, c) {
						var d = parseInt(a);
						if(d < 0 || 255 < d) throw "integer not in range 0-255";
						return("00" + d.toString(16)).slice(-2)
					}).join("")
				} catch(a) {
					throw "malformed integer array string: " + a
				}
			}

			function Mc(a, b) {
				for(var c = "", d = b / 4 - a.length, e = 0; e < d; e++) c += "0";
				return c + a
			}

			function Nc(a, b, c) {
				for(var d = "", e = 0; d.length < b;) d += sc(c(tc(a + String.fromCharCode.apply(String, [(4278190080 & e) >> 24, (16711680 & e) >> 16, (65280 & e) >> 8, 255 & e])))), e += 1;
				return d
			}

			function Oc(a) {
				for(var b in od.crypto.Util.DIGESTINFOHEAD) {
					var c = od.crypto.Util.DIGESTINFOHEAD[b],
						d = c.length;
					if(a.substring(0, d) == c) {
						return [b, a.substring(d)]
					}
				}
				return []
			}

			function Pc() {
				var a = nd,
					b = a.getChildIdx,
					c = a.getV,
					d = a.getTLV,
					e = a.getVbyList,
					f = a.getTLVbyList,
					g = a.getIdxbyList,
					h = a.getVidx,
					i = a.oidname,
					j = Pc,
					k = yc;
				this.hex = null, this.version = 0, this.foffset = 0, this.aExtInfo = null, this.getVersion = function() {
					return null === this.hex || 0 !== this.version ? this.version : "a003020102" !== f(this.hex, 0, [0, 0]) ? (this.version = 1, this.foffset = -1, 1) : (this.version = 3, 3)
				}, this.getSerialNumberHex = function() {
					return e(this.hex, 0, [0, 1 + this.foffset], "02")
				}, this.getSignatureAlgorithmField = function() {
					return i(e(this.hex, 0, [0, 2 + this.foffset, 0], "06"))
				}, this.getIssuerHex = function() {
					return f(this.hex, 0, [0, 3 + this.foffset], "30")
				}, this.getIssuerString = function() {
					return j.hex2dn(this.getIssuerHex())
				}, this.getSubjectHex = function() {
					return f(this.hex, 0, [0, 5 + this.foffset], "30")
				}, this.getSubjectString = function() {
					return j.hex2dn(this.getSubjectHex())
				}, this.getNotBefore = function() {
					var a = e(this.hex, 0, [0, 4 + this.foffset, 0]);
					return a = a.replace(/(..)/g, "%$1"), a = decodeURIComponent(a)
				}, this.getNotAfter = function() {
					var a = e(this.hex, 0, [0, 4 + this.foffset, 1]);
					return a = a.replace(/(..)/g, "%$1"), a = decodeURIComponent(a)
				}, this.getPublicKeyHex = function() {
					return a.getTLVbyList(this.hex, 0, [0, 6 + this.foffset], "30")
				}, this.getPublicKeyIdx = function() {
					return g(this.hex, 0, [0, 6 + this.foffset], "30")
				}, this.getPublicKeyContentIdx = function() {
					var a = this.getPublicKeyIdx();
					return g(this.hex, a, [1, 0], "30")
				}, this.getPublicKey = function() {
					return sd.getKey(this.getPublicKeyHex(), null, "pkcs8pub")
				}, this.getSignatureAlgorithmName = function() {
					return i(e(this.hex, 0, [1, 0], "06"))
				}, this.getSignatureValueHex = function() {
					return e(this.hex, 0, [2], "03", !0)
				}, this.verifySignature = function(a) {
					var b = this.getSignatureAlgorithmName(),
						c = this.getSignatureValueHex(),
						d = f(this.hex, 0, [0], "30"),
						e = new od.crypto.Signature({
							alg: b
						});
					return e.init(a), e.updateHex(d), e.verify(c)
				}, this.parseExt = function() {
					if(3 !== this.version) return -1;
					var c = g(this.hex, 0, [0, 7, 0], "30"),
						d = b(this.hex, c);
					this.aExtInfo = new Array;
					for(var f = 0; f < d.length; f++) {
						var i = {};
						i.critical = !1;
						var j = b(this.hex, d[f]),
							k = 0;
						3 === j.length && (i.critical = !0, k = 1), i.oid = a.hextooidstr(e(this.hex, d[f], [0], "06"));
						var l = g(this.hex, d[f], [1 + k]);
						i.vidx = h(this.hex, l), this.aExtInfo.push(i)
					}
				}, this.getExtInfo = function(a) {
					var b = this.aExtInfo,
						c = a;
					if(a.match(/^[0-9.]+$/) || (c = od.asn1.x509.OID.name2oid(a)), "" !== c)
						for(var d = 0; d < b.length; d++)
							if(b[d].oid === c) return b[d]
				}, this.getExtBasicConstraints = function() {
					var a = this.getExtInfo("basicConstraints");
					if(void 0 === a) return a;
					var b = c(this.hex, a.vidx);
					if("" === b) return {};
					if("0101ff" === b) return {
						cA: !0
					};
					if("0101ff02" === b.substr(0, 8)) {
						var d = c(b, 6);
						return {
							cA: !0,
							pathLen: parseInt(d, 16)
						}
					}
					throw "basicConstraints parse error"
				}, this.getExtKeyUsageBin = function() {
					var a = this.getExtInfo("keyUsage");
					if(void 0 === a) return "";
					var b = c(this.hex, a.vidx);
					if(b.length % 2 != 0 || b.length <= 2) throw "malformed key usage value";
					var d = parseInt(b.substr(0, 2)),
						e = parseInt(b.substr(2), 16).toString(2);
					return e.substr(0, e.length - d)
				}, this.getExtKeyUsageString = function() {
					for(var a = this.getExtKeyUsageBin(), b = new Array, c = 0; c < a.length; c++) "1" == a.substr(c, 1) && b.push(Pc.KEYUSAGE_NAME[c]);
					return b.join(",")
				}, this.getExtSubjectKeyIdentifier = function() {
					var a = this.getExtInfo("subjectKeyIdentifier");
					return void 0 === a ? a : c(this.hex, a.vidx)
				}, this.getExtAuthorityKeyIdentifier = function() {
					var a = this.getExtInfo("authorityKeyIdentifier");
					if(void 0 === a) return a;
					for(var e = {}, f = d(this.hex, a.vidx), g = b(f, 0), h = 0; h < g.length; h++) "80" === f.substr(g[h], 2) && (e.kid = c(f, g[h]));
					return e
				}, this.getExtExtKeyUsageName = function() {
					var a = this.getExtInfo("extKeyUsage");
					if(void 0 === a) return a;
					var e = new Array,
						f = d(this.hex, a.vidx);
					if("" === f) return e;
					for(var g = b(f, 0), h = 0; h < g.length; h++) e.push(i(c(f, g[h])));
					return e
				}, this.getExtSubjectAltName = function() {
					for(var a = this.getExtSubjectAltName2(), b = new Array, c = 0; c < a.length; c++) "DNS" === a[c][0] && b.push(a[c][1]);
					return b
				}, this.getExtSubjectAltName2 = function() {
					var a, e, f, g = this.getExtInfo("subjectAltName");
					if(void 0 === g) return g;
					for(var h = new Array, i = d(this.hex, g.vidx), j = b(i, 0), k = 0; k < j.length; k++)
						if(f = i.substr(j[k], 2), a = c(i, j[k]), "81" === f && (e = rc(a), h.push(["MAIL", e])), "82" === f && (e = rc(a), h.push(["DNS", e])), "84" === f && (e = Pc.hex2dn(a, 0), h.push(["DN", e])), "86" === f && (e = rc(a), h.push(["URI", e])), "87" === f) try {
							e = parseInt(e.substr(0, 2), 16) + "." + parseInt(e.substr(2, 2), 16) + "." + parseInt(e.substr(4, 2), 16) + "." + parseInt(e.substr(6, 2), 16), h.push(["IP", e])
						} catch(a) {}
					return h
				}, this.getExtCRLDistributionPointsURI = function() {
					var a = this.getExtInfo("cRLDistributionPoints");
					if(void 0 === a) return a;
					for(var c = new Array, d = b(this.hex, a.vidx), f = 0; f < d.length; f++) try {
						var g = e(this.hex, d[f], [0, 0, 0], "86"),
							h = rc(g);
						c.push(h)
					} catch(a) {}
					return c
				}, this.getExtAIAInfo = function() {
					var a = this.getExtInfo("authorityInfoAccess");
					if(void 0 === a) return a;
					for(var c = {
							ocsp: [],
							caissuer: []
						}, d = b(this.hex, a.vidx), f = 0; f < d.length; f++) {
						var g = e(this.hex, d[f], [0], "06"),
							h = e(this.hex, d[f], [1], "86");
						"2b06010505073001" === g && c.ocsp.push(rc(h)), "2b06010505073002" === g && c.caissuer.push(rc(h))
					}
					return c
				}, this.getExtCertificatePolicies = function() {
					var a = this.getExtInfo("certificatePolicies");
					if(void 0 === a) return a;
					for(var f = d(this.hex, a.vidx), g = [], h = b(f, 0), j = 0; j < h.length; j++) {
						var k = {},
							l = b(f, h[j]);
						if(k.id = i(c(f, l[0])), 2 === l.length)
							for(var m = b(f, l[1]), n = 0; n < m.length; n++) {
								var o = e(f, m[n], [0], "06");
								"2b06010505070201" === o ? k.cps = rc(e(f, m[n], [1])) : "2b06010505070202" === o && (k.unotice = rc(e(f, m[n], [1, 0])))
							}
						g.push(k)
					}
					return g
				}, this.readCertPEM = function(a) {
					this.readCertHex(k(a))
				}, this.readCertHex = function(a) {
					this.hex = a, this.getVersion();
					try {
						g(this.hex, 0, [0, 7], "a3"), this.parseExt()
					} catch(a) {}
				}, this.getInfo = function() {
					var a, b, c;
					a = "Basic Fields\n", a += "  serial number: " + this.getSerialNumberHex() + "\n", a += "  signature algorithm: " + this.getSignatureAlgorithmField() + "\n", a += "  issuer: " + this.getIssuerString() + "\n", a += "  notBefore: " + this.getNotBefore() + "\n", a += "  notAfter: " + this.getNotAfter() + "\n", a += "  subject: " + this.getSubjectString() + "\n", a += "  subject public key info: \n", b = this.getPublicKey(), a += "    key algorithm: " + b.type + "\n", "RSA" === b.type && (a += "    n=" + Kc(b.n.toString(16)).substr(0, 16) + "...\n", a += "    e=" + Kc(b.e.toString(16)) + "\n"), a += "X509v3 Extensions:\n", c = this.aExtInfo;
					for(var d = 0; d < c.length; d++) {
						var e = c[d],
							f = od.asn1.x509.OID.oid2name(e.oid);
						"" === f && (f = e.oid);
						var g = "";
						if(!0 === e.critical && (g = "CRITICAL"), a += "  " + f + " " + g + ":\n", "basicConstraints" === f) {
							var h = this.getExtBasicConstraints();
							void 0 === h.cA ? a += "    {}\n" : (a += "    cA=true", void 0 !== h.pathLen && (a += ", pathLen=" + h.pathLen), a += "\n")
						} else if("keyUsage" === f) a += "    " + this.getExtKeyUsageString() + "\n";
						else if("subjectKeyIdentifier" === f) a += "    " + this.getExtSubjectKeyIdentifier() + "\n";
						else if("authorityKeyIdentifier" === f) {
							var i = this.getExtAuthorityKeyIdentifier();
							void 0 !== i.kid && (a += "    kid=" + i.kid + "\n")
						} else if("extKeyUsage" === f) {
							var j = this.getExtExtKeyUsageName();
							a += "    " + j.join(", ") + "\n"
						} else if("subjectAltName" === f) {
							var k = this.getExtSubjectAltName2();
							a += "    " + k + "\n"
						} else if("cRLDistributionPoints" === f) {
							var l = this.getExtCRLDistributionPointsURI();
							a += "    " + l + "\n"
						} else if("authorityInfoAccess" === f) {
							var m = this.getExtAIAInfo();
							void 0 !== m.ocsp && (a += "    ocsp: " + m.ocsp.join(",") + "\n"), void 0 !== m.caissuer && (a += "    caissuer: " + m.caissuer.join(",") + "\n")
						} else if("certificatePolicies" === f)
							for(var n = this.getExtCertificatePolicies(), o = 0; o < n.length; o++) void 0 !== n[o].id && (a += "    policy oid: " + n[o].id + "\n"), void 0 !== n[o].cps && (a += "    cps: " + n[o].cps + "\n")
					}
					return a += "signature algorithm: " + this.getSignatureAlgorithmName() + "\n", a += "signature: " + this.getSignatureValueHex().substr(0, 16) + "...\n"
				}
			}
			var Qc = {};
			Qc.userAgent = !1;
			var Rc = {};
			if(void 0 === Sc) var Sc = {};
			Sc.lang = {
				extend: function(a, b, c) {
					if(!b || !a) throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");
					var d = function() {};
					if(d.prototype = b.prototype, a.prototype = new d, a.prototype.constructor = a, a.superclass = b.prototype, b.prototype.constructor == Object.prototype.constructor && (b.prototype.constructor = b), c) {
						var e;
						for(e in c) a.prototype[e] = c[e];
						var f = function() {},
							g = ["toString", "valueOf"];
						try {
							/MSIE/.test(Qc.userAgent) && (f = function(a, b) {
								for(e = 0; e < g.length; e += 1) {
									var c = g[e],
										d = b[c];
									"function" == typeof d && d != Object.prototype[c] && (a[c] = d)
								}
							})
						} catch(a) {}
						f(a.prototype, c)
					}
				}
			};
			var Tc = Tc || function(a, b) {
				var c = {},
					d = c.lib = {},
					e = d.Base = function() {
						function a() {}
						return {
							extend: function(b) {
								a.prototype = this;
								var c = new a;
								return b && c.mixIn(b), c.hasOwnProperty("init") || (c.init = function() {
									c.$super.init.apply(this, arguments)
								}), c.init.prototype = c, c.$super = this, c
							},
							create: function() {
								var a = this.extend();
								return a.init.apply(a, arguments), a
							},
							init: function() {},
							mixIn: function(a) {
								for(var b in a) a.hasOwnProperty(b) && (this[b] = a[b]);
								a.hasOwnProperty("toString") && (this.toString = a.toString)
							},
							clone: function() {
								return this.init.prototype.extend(this)
							}
						}
					}(),
					f = d.WordArray = e.extend({
						init: function(a, c) {
							a = this.words = a || [], this.sigBytes = c != b ? c : 4 * a.length
						},
						toString: function(a) {
							return(a || h).stringify(this)
						},
						concat: function(a) {
							var b = this.words,
								c = a.words,
								d = this.sigBytes,
								e = a.sigBytes;
							if(this.clamp(), d % 4)
								for(var f = 0; f < e; f++) {
									var g = c[f >>> 2] >>> 24 - f % 4 * 8 & 255;
									b[d + f >>> 2] |= g << 24 - (d + f) % 4 * 8
								} else
									for(var f = 0; f < e; f += 4) b[d + f >>> 2] = c[f >>> 2];
							return this.sigBytes += e, this
						},
						clamp: function() {
							var b = this.words,
								c = this.sigBytes;
							b[c >>> 2] &= 4294967295 << 32 - c % 4 * 8, b.length = a.ceil(c / 4)
						},
						clone: function() {
							var a = e.clone.call(this);
							return a.words = this.words.slice(0), a
						},
						random: function(b) {
							for(var c = [], d = 0; d < b; d += 4) c.push(4294967296 * a.random() | 0);
							return new f.init(c, b)
						}
					}),
					g = c.enc = {},
					h = g.Hex = {
						stringify: function(a) {
							for(var b = a.words, c = a.sigBytes, d = [], e = 0; e < c; e++) {
								var f = b[e >>> 2] >>> 24 - e % 4 * 8 & 255;
								d.push((f >>> 4).toString(16)), d.push((15 & f).toString(16))
							}
							return d.join("")
						},
						parse: function(a) {
							for(var b = a.length, c = [], d = 0; d < b; d += 2) c[d >>> 3] |= parseInt(a.substr(d, 2), 16) << 24 - d % 8 * 4;
							return new f.init(c, b / 2)
						}
					},
					i = g.Latin1 = {
						stringify: function(a) {
							for(var b = a.words, c = a.sigBytes, d = [], e = 0; e < c; e++) {
								var f = b[e >>> 2] >>> 24 - e % 4 * 8 & 255;
								d.push(String.fromCharCode(f))
							}
							return d.join("")
						},
						parse: function(a) {
							for(var b = a.length, c = [], d = 0; d < b; d++) c[d >>> 2] |= (255 & a.charCodeAt(d)) << 24 - d % 4 * 8;
							return new f.init(c, b)
						}
					},
					j = g.Utf8 = {
						stringify: function(a) {
							try {
								return decodeURIComponent(escape(i.stringify(a)))
							} catch(a) {
								throw new Error("Malformed UTF-8 data")
							}
						},
						parse: function(a) {
							return i.parse(unescape(encodeURIComponent(a)))
						}
					},
					k = d.BufferedBlockAlgorithm = e.extend({
						reset: function() {
							this._data = new f.init, this._nDataBytes = 0
						},
						_append: function(a) {
							"string" == typeof a && (a = j.parse(a)), this._data.concat(a), this._nDataBytes += a.sigBytes
						},
						_process: function(b) {
							var c = this._data,
								d = c.words,
								e = c.sigBytes,
								g = this.blockSize,
								h = 4 * g,
								i = e / h;
							i = b ? a.ceil(i) : a.max((0 | i) - this._minBufferSize, 0);
							var j = i * g,
								k = a.min(4 * j, e);
							if(j) {
								for(var l = 0; l < j; l += g) this._doProcessBlock(d, l);
								var m = d.splice(0, j);
								c.sigBytes -= k
							}
							return new f.init(m, k)
						},
						clone: function() {
							var a = e.clone.call(this);
							return a._data = this._data.clone(), a
						},
						_minBufferSize: 0
					}),
					l = (d.Hasher = k.extend({
						cfg: e.extend(),
						init: function(a) {
							this.cfg = this.cfg.extend(a), this.reset()
						},
						reset: function() {
							k.reset.call(this), this._doReset()
						},
						update: function(a) {
							return this._append(a), this._process(), this
						},
						finalize: function(a) {
							return a && this._append(a), this._doFinalize()
						},
						blockSize: 16,
						_createHelper: function(a) {
							return function(b, c) {
								return new a.init(c).finalize(b)
							}
						},
						_createHmacHelper: function(a) {
							return function(b, c) {
								return new l.HMAC.init(a, c).finalize(b)
							}
						}
					}), c.algo = {});
				return c
			}(Math);
			! function(a) {
				var b = Tc,
					c = b.lib,
					d = c.Base,
					e = c.WordArray,
					b = b.x64 = {};
				b.Word = d.extend({
					init: function(a, b) {
						this.high = a, this.low = b
					}
				}), b.WordArray = d.extend({
					init: function(b, c) {
						b = this.words = b || [], this.sigBytes = c != a ? c : 8 * b.length
					},
					toX32: function() {
						for(var a = this.words, b = a.length, c = [], d = 0; d < b; d++) {
							var f = a[d];
							c.push(f.high), c.push(f.low)
						}
						return e.create(c, this.sigBytes)
					},
					clone: function() {
						for(var a = d.clone.call(this), b = a.words = this.words.slice(0), c = b.length, e = 0; e < c; e++) b[e] = b[e].clone();
						return a
					}
				})
			}(), Tc.lib.Cipher || function(a) {
					var b = Tc,
						c = b.lib,
						d = c.Base,
						e = c.WordArray,
						f = c.BufferedBlockAlgorithm,
						g = b.enc.Base64,
						h = b.algo.EvpKDF,
						i = c.Cipher = f.extend({
							cfg: d.extend(),
							createEncryptor: function(a, b) {
								return this.create(this._ENC_XFORM_MODE, a, b)
							},
							createDecryptor: function(a, b) {
								return this.create(this._DEC_XFORM_MODE, a, b)
							},
							init: function(a, b, c) {
								this.cfg = this.cfg.extend(c), this._xformMode = a, this._key = b, this.reset()
							},
							reset: function() {
								f.reset.call(this), this._doReset()
							},
							process: function(a) {
								return this._append(a), this._process()
							},
							finalize: function(a) {
								return a && this._append(a), this._doFinalize()
							},
							keySize: 4,
							ivSize: 4,
							_ENC_XFORM_MODE: 1,
							_DEC_XFORM_MODE: 2,
							_createHelper: function(a) {
								return {
									encrypt: function(b, c, d) {
										return("string" == typeof c ? o : n).encrypt(a, b, c, d)
									},
									decrypt: function(b, c, d) {
										return("string" == typeof c ? o : n).decrypt(a, b, c, d)
									}
								}
							}
						});
					c.StreamCipher = i.extend({
						_doFinalize: function() {
							return this._process(!0)
						},
						blockSize: 1
					});
					var j = b.mode = {},
						k = function(b, c, d) {
							var e = this._iv;
							e ? this._iv = a : e = this._prevBlock;
							for(var f = 0; f < d; f++) b[c + f] ^= e[f]
						},
						l = (c.BlockCipherMode = d.extend({
							createEncryptor: function(a, b) {
								return this.Encryptor.create(a, b)
							},
							createDecryptor: function(a, b) {
								return this.Decryptor.create(a, b)
							},
							init: function(a, b) {
								this._cipher = a, this._iv = b
							}
						})).extend();
					l.Encryptor = l.extend({
						processBlock: function(a, b) {
							var c = this._cipher,
								d = c.blockSize;
							k.call(this, a, b, d), c.encryptBlock(a, b), this._prevBlock = a.slice(b, b + d)
						}
					}), l.Decryptor = l.extend({
						processBlock: function(a, b) {
							var c = this._cipher,
								d = c.blockSize,
								e = a.slice(b, b + d);
							c.decryptBlock(a, b), k.call(this, a, b, d), this._prevBlock = e
						}
					}), j = j.CBC = l, l = (b.pad = {}).Pkcs7 = {
						pad: function(a, b) {
							for(var c = 4 * b, c = c - a.sigBytes % c, d = c << 24 | c << 16 | c << 8 | c, f = [], g = 0; g < c; g += 4) f.push(d);
							c = e.create(f, c), a.concat(c)
						},
						unpad: function(a) {
							a.sigBytes -= 255 & a.words[a.sigBytes - 1 >>> 2]
						}
					}, c.BlockCipher = i.extend({
						cfg: i.cfg.extend({
							mode: j,
							padding: l
						}),
						reset: function() {
							i.reset.call(this);
							var a = this.cfg,
								b = a.iv,
								a = a.mode;
							if(this._xformMode == this._ENC_XFORM_MODE) var c = a.createEncryptor;
							else c = a.createDecryptor, this._minBufferSize = 1;
							this._mode = c.call(a, this, b && b.words)
						},
						_doProcessBlock: function(a, b) {
							this._mode.processBlock(a, b)
						},
						_doFinalize: function() {
							var a = this.cfg.padding;
							if(this._xformMode == this._ENC_XFORM_MODE) {
								a.pad(this._data, this.blockSize);
								var b = this._process(!0)
							} else b = this._process(!0), a.unpad(b);
							return b
						},
						blockSize: 4
					});
					var m = c.CipherParams = d.extend({
							init: function(a) {
								this.mixIn(a)
							},
							toString: function(a) {
								return(a || this.formatter).stringify(this)
							}
						}),
						j = (b.format = {}).OpenSSL = {
							stringify: function(a) {
								var b = a.ciphertext;
								return a = a.salt, (a ? e.create([1398893684, 1701076831]).concat(a).concat(b) : b).toString(g)
							},
							parse: function(a) {
								a = g.parse(a);
								var b = a.words;
								if(1398893684 == b[0] && 1701076831 == b[1]) {
									var c = e.create(b.slice(2, 4));
									b.splice(0, 4), a.sigBytes -= 16
								}
								return m.create({
									ciphertext: a,
									salt: c
								})
							}
						},
						n = c.SerializableCipher = d.extend({
							cfg: d.extend({
								format: j
							}),
							encrypt: function(a, b, c, d) {
								d = this.cfg.extend(d);
								var e = a.createEncryptor(c, d);
								return b = e.finalize(b), e = e.cfg, m.create({
									ciphertext: b,
									key: c,
									iv: e.iv,
									algorithm: a,
									mode: e.mode,
									padding: e.padding,
									blockSize: a.blockSize,
									formatter: d.format
								})
							},
							decrypt: function(a, b, c, d) {
								return d = this.cfg.extend(d), b = this._parse(b, d.format), a.createDecryptor(c, d).finalize(b.ciphertext)
							},
							_parse: function(a, b) {
								return "string" == typeof a ? b.parse(a, this) : a
							}
						}),
						b = (b.kdf = {}).OpenSSL = {
							execute: function(a, b, c, d) {
								return d || (d = e.random(8)), a = h.create({
									keySize: b + c
								}).compute(a, d), c = e.create(a.words.slice(b), 4 * c), a.sigBytes = 4 * b, m.create({
									key: a,
									iv: c,
									salt: d
								})
							}
						},
						o = c.PasswordBasedCipher = n.extend({
							cfg: n.cfg.extend({
								kdf: b
							}),
							encrypt: function(a, b, c, d) {
								return d = this.cfg.extend(d), c = d.kdf.execute(c, a.keySize, a.ivSize), d.iv = c.iv, a = n.encrypt.call(this, a, b, c.key, d), a.mixIn(c), a
							},
							decrypt: function(a, b, c, d) {
								return d = this.cfg.extend(d), b = this._parse(b, d.format), c = d.kdf.execute(c, a.keySize, a.ivSize, b.salt), d.iv = c.iv, n.decrypt.call(this, a, b, c.key, d)
							}
						})
				}(),
				function() {
					for(var a = Tc, b = a.lib.BlockCipher, c = a.algo, d = [], e = [], f = [], g = [], h = [], i = [], j = [], k = [], l = [], m = [], n = [], o = 0; 256 > o; o++) n[o] = 128 > o ? o << 1 : o << 1 ^ 283;
					for(var p = 0, q = 0, o = 0; 256 > o; o++) {
						var r = q ^ q << 1 ^ q << 2 ^ q << 3 ^ q << 4,
							r = r >>> 8 ^ 255 & r ^ 99;
						d[p] = r, e[r] = p;
						var s = n[p],
							t = n[s],
							u = n[t],
							v = 257 * n[r] ^ 16843008 * r;
						f[p] = v << 24 | v >>> 8, g[p] = v << 16 | v >>> 16, h[p] = v << 8 | v >>> 24, i[p] = v, v = 16843009 * u ^ 65537 * t ^ 257 * s ^ 16843008 * p, j[r] = v << 24 | v >>> 8, k[r] = v << 16 | v >>> 16, l[r] = v << 8 | v >>> 24, m[r] = v, p ? (p = s ^ n[n[n[u ^ s]]], q ^= n[n[q]]) : p = q = 1
					}
					var w = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
						c = c.AES = b.extend({
							_doReset: function() {
								for(var a = this._key, b = a.words, c = a.sigBytes / 4, a = 4 * ((this._nRounds = c + 6) + 1), e = this._keySchedule = [], f = 0; f < a; f++)
									if(f < c) e[f] = b[f];
									else {
										var g = e[f - 1];
										f % c ? 6 < c && 4 == f % c && (g = d[g >>> 24] << 24 | d[g >>> 16 & 255] << 16 | d[g >>> 8 & 255] << 8 | d[255 & g]) : (g = g << 8 | g >>> 24, g = d[g >>> 24] << 24 | d[g >>> 16 & 255] << 16 | d[g >>> 8 & 255] << 8 | d[255 & g], g ^= w[f / c | 0] << 24), e[f] = e[f - c] ^ g
									}
								for(b = this._invKeySchedule = [], c = 0; c < a; c++) f = a - c, g = c % 4 ? e[f] : e[f - 4], b[c] = 4 > c || 4 >= f ? g : j[d[g >>> 24]] ^ k[d[g >>> 16 & 255]] ^ l[d[g >>> 8 & 255]] ^ m[d[255 & g]]
							},
							encryptBlock: function(a, b) {
								this._doCryptBlock(a, b, this._keySchedule, f, g, h, i, d)
							},
							decryptBlock: function(a, b) {
								var c = a[b + 1];
								a[b + 1] = a[b + 3], a[b + 3] = c, this._doCryptBlock(a, b, this._invKeySchedule, j, k, l, m, e), c = a[b + 1], a[b + 1] = a[b + 3], a[b + 3] = c
							},
							_doCryptBlock: function(a, b, c, d, e, f, g, h) {
								for(var i = this._nRounds, j = a[b] ^ c[0], k = a[b + 1] ^ c[1], l = a[b + 2] ^ c[2], m = a[b + 3] ^ c[3], n = 4, o = 1; o < i; o++) var p = d[j >>> 24] ^ e[k >>> 16 & 255] ^ f[l >>> 8 & 255] ^ g[255 & m] ^ c[n++],
									q = d[k >>> 24] ^ e[l >>> 16 & 255] ^ f[m >>> 8 & 255] ^ g[255 & j] ^ c[n++],
									r = d[l >>> 24] ^ e[m >>> 16 & 255] ^ f[j >>> 8 & 255] ^ g[255 & k] ^ c[n++],
									m = d[m >>> 24] ^ e[j >>> 16 & 255] ^ f[k >>> 8 & 255] ^ g[255 & l] ^ c[n++],
									j = p,
									k = q,
									l = r;
								p = (h[j >>> 24] << 24 | h[k >>> 16 & 255] << 16 | h[l >>> 8 & 255] << 8 | h[255 & m]) ^ c[n++], q = (h[k >>> 24] << 24 | h[l >>> 16 & 255] << 16 | h[m >>> 8 & 255] << 8 | h[255 & j]) ^ c[n++], r = (h[l >>> 24] << 24 | h[m >>> 16 & 255] << 16 | h[j >>> 8 & 255] << 8 | h[255 & k]) ^ c[n++], m = (h[m >>> 24] << 24 | h[j >>> 16 & 255] << 16 | h[k >>> 8 & 255] << 8 | h[255 & l]) ^ c[n++], a[b] = p, a[b + 1] = q, a[b + 2] = r, a[b + 3] = m
							},
							keySize: 8
						});
					a.AES = b._createHelper(c)
				}(),
				function() {
					function a(a, b) {
						var c = (this._lBlock >>> a ^ this._rBlock) & b;
						this._rBlock ^= c, this._lBlock ^= c << a
					}

					function b(a, b) {
						var c = (this._rBlock >>> a ^ this._lBlock) & b;
						this._lBlock ^= c, this._rBlock ^= c << a
					}
					var c = Tc,
						d = c.lib,
						e = d.WordArray,
						d = d.BlockCipher,
						f = c.algo,
						g = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4],
						h = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32],
						i = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28],
						j = [{
							0: 8421888,
							268435456: 32768,
							536870912: 8421378,
							805306368: 2,
							1073741824: 512,
							1342177280: 8421890,
							1610612736: 8389122,
							1879048192: 8388608,
							2147483648: 514,
							2415919104: 8389120,
							2684354560: 33280,
							2952790016: 8421376,
							3221225472: 32770,
							3489660928: 8388610,
							3758096384: 0,
							4026531840: 33282,
							134217728: 0,
							402653184: 8421890,
							671088640: 33282,
							939524096: 32768,
							1207959552: 8421888,
							1476395008: 512,
							1744830464: 8421378,
							2013265920: 2,
							2281701376: 8389120,
							2550136832: 33280,
							2818572288: 8421376,
							3087007744: 8389122,
							3355443200: 8388610,
							3623878656: 32770,
							3892314112: 514,
							4160749568: 8388608,
							1: 32768,
							268435457: 2,
							536870913: 8421888,
							805306369: 8388608,
							1073741825: 8421378,
							1342177281: 33280,
							1610612737: 512,
							1879048193: 8389122,
							2147483649: 8421890,
							2415919105: 8421376,
							2684354561: 8388610,
							2952790017: 33282,
							3221225473: 514,
							3489660929: 8389120,
							3758096385: 32770,
							4026531841: 0,
							134217729: 8421890,
							402653185: 8421376,
							671088641: 8388608,
							939524097: 512,
							1207959553: 32768,
							1476395009: 8388610,
							1744830465: 2,
							2013265921: 33282,
							2281701377: 32770,
							2550136833: 8389122,
							2818572289: 514,
							3087007745: 8421888,
							3355443201: 8389120,
							3623878657: 0,
							3892314113: 33280,
							4160749569: 8421378
						}, {
							0: 1074282512,
							16777216: 16384,
							33554432: 524288,
							50331648: 1074266128,
							67108864: 1073741840,
							83886080: 1074282496,
							100663296: 1073758208,
							117440512: 16,
							134217728: 540672,
							150994944: 1073758224,
							167772160: 1073741824,
							184549376: 540688,
							201326592: 524304,
							218103808: 0,
							234881024: 16400,
							251658240: 1074266112,
							8388608: 1073758208,
							25165824: 540688,
							41943040: 16,
							58720256: 1073758224,
							75497472: 1074282512,
							92274688: 1073741824,
							109051904: 524288,
							125829120: 1074266128,
							142606336: 524304,
							159383552: 0,
							176160768: 16384,
							192937984: 1074266112,
							209715200: 1073741840,
							226492416: 540672,
							243269632: 1074282496,
							260046848: 16400,
							268435456: 0,
							285212672: 1074266128,
							301989888: 1073758224,
							318767104: 1074282496,
							335544320: 1074266112,
							352321536: 16,
							369098752: 540688,
							385875968: 16384,
							402653184: 16400,
							419430400: 524288,
							436207616: 524304,
							452984832: 1073741840,
							469762048: 540672,
							486539264: 1073758208,
							503316480: 1073741824,
							520093696: 1074282512,
							276824064: 540688,
							293601280: 524288,
							310378496: 1074266112,
							327155712: 16384,
							343932928: 1073758208,
							360710144: 1074282512,
							377487360: 16,
							394264576: 1073741824,
							411041792: 1074282496,
							427819008: 1073741840,
							444596224: 1073758224,
							461373440: 524304,
							478150656: 0,
							494927872: 16400,
							511705088: 1074266128,
							528482304: 540672
						}, {
							0: 260,
							1048576: 0,
							2097152: 67109120,
							3145728: 65796,
							4194304: 65540,
							5242880: 67108868,
							6291456: 67174660,
							7340032: 67174400,
							8388608: 67108864,
							9437184: 67174656,
							10485760: 65792,
							11534336: 67174404,
							12582912: 67109124,
							13631488: 65536,
							14680064: 4,
							15728640: 256,
							524288: 67174656,
							1572864: 67174404,
							2621440: 0,
							3670016: 67109120,
							4718592: 67108868,
							5767168: 65536,
							6815744: 65540,
							7864320: 260,
							8912896: 4,
							9961472: 256,
							11010048: 67174400,
							12058624: 65796,
							13107200: 65792,
							14155776: 67109124,
							15204352: 67174660,
							16252928: 67108864,
							16777216: 67174656,
							17825792: 65540,
							18874368: 65536,
							19922944: 67109120,
							20971520: 256,
							22020096: 67174660,
							23068672: 67108868,
							24117248: 0,
							25165824: 67109124,
							26214400: 67108864,
							27262976: 4,
							28311552: 65792,
							29360128: 67174400,
							30408704: 260,
							31457280: 65796,
							32505856: 67174404,
							17301504: 67108864,
							18350080: 260,
							19398656: 67174656,
							20447232: 0,
							21495808: 65540,
							22544384: 67109120,
							23592960: 256,
							24641536: 67174404,
							25690112: 65536,
							26738688: 67174660,
							27787264: 65796,
							28835840: 67108868,
							29884416: 67109124,
							30932992: 67174400,
							31981568: 4,
							33030144: 65792
						}, {
							0: 2151682048,
							65536: 2147487808,
							131072: 4198464,
							196608: 2151677952,
							262144: 0,
							327680: 4198400,
							393216: 2147483712,
							458752: 4194368,
							524288: 2147483648,
							589824: 4194304,
							655360: 64,
							720896: 2147487744,
							786432: 2151678016,
							851968: 4160,
							917504: 4096,
							983040: 2151682112,
							32768: 2147487808,
							98304: 64,
							163840: 2151678016,
							229376: 2147487744,
							294912: 4198400,
							360448: 2151682112,
							425984: 0,
							491520: 2151677952,
							557056: 4096,
							622592: 2151682048,
							688128: 4194304,
							753664: 4160,
							819200: 2147483648,
							884736: 4194368,
							950272: 4198464,
							1015808: 2147483712,
							1048576: 4194368,
							1114112: 4198400,
							1179648: 2147483712,
							1245184: 0,
							1310720: 4160,
							1376256: 2151678016,
							1441792: 2151682048,
							1507328: 2147487808,
							1572864: 2151682112,
							1638400: 2147483648,
							1703936: 2151677952,
							1769472: 4198464,
							1835008: 2147487744,
							1900544: 4194304,
							1966080: 64,
							2031616: 4096,
							1081344: 2151677952,
							1146880: 2151682112,
							1212416: 0,
							1277952: 4198400,
							1343488: 4194368,
							1409024: 2147483648,
							1474560: 2147487808,
							1540096: 64,
							1605632: 2147483712,
							1671168: 4096,
							1736704: 2147487744,
							1802240: 2151678016,
							1867776: 4160,
							1933312: 2151682048,
							1998848: 4194304,
							2064384: 4198464
						}, {
							0: 128,
							4096: 17039360,
							8192: 262144,
							12288: 536870912,
							16384: 537133184,
							20480: 16777344,
							24576: 553648256,
							28672: 262272,
							32768: 16777216,
							36864: 537133056,
							40960: 536871040,
							45056: 553910400,
							49152: 553910272,
							53248: 0,
							57344: 17039488,
							61440: 553648128,
							2048: 17039488,
							6144: 553648256,
							10240: 128,
							14336: 17039360,
							18432: 262144,
							22528: 537133184,
							26624: 553910272,
							30720: 536870912,
							34816: 537133056,
							38912: 0,
							43008: 553910400,
							47104: 16777344,
							51200: 536871040,
							55296: 553648128,
							59392: 16777216,
							63488: 262272,
							65536: 262144,
							69632: 128,
							73728: 536870912,
							77824: 553648256,
							81920: 16777344,
							86016: 553910272,
							90112: 537133184,
							94208: 16777216,
							98304: 553910400,
							102400: 553648128,
							106496: 17039360,
							110592: 537133056,
							114688: 262272,
							118784: 536871040,
							122880: 0,
							126976: 17039488,
							67584: 553648256,
							71680: 16777216,
							75776: 17039360,
							79872: 537133184,
							83968: 536870912,
							88064: 17039488,
							92160: 128,
							96256: 553910272,
							100352: 262272,
							104448: 553910400,
							108544: 0,
							112640: 553648128,
							116736: 16777344,
							120832: 262144,
							124928: 537133056,
							129024: 536871040
						}, {
							0: 268435464,
							256: 8192,
							512: 270532608,
							768: 270540808,
							1024: 268443648,
							1280: 2097152,
							1536: 2097160,
							1792: 268435456,
							2048: 0,
							2304: 268443656,
							2560: 2105344,
							2816: 8,
							3072: 270532616,
							3328: 2105352,
							3584: 8200,
							3840: 270540800,
							128: 270532608,
							384: 270540808,
							640: 8,
							896: 2097152,
							1152: 2105352,
							1408: 268435464,
							1664: 268443648,
							1920: 8200,
							2176: 2097160,
							2432: 8192,
							2688: 268443656,
							2944: 270532616,
							3200: 0,
							3456: 270540800,
							3712: 2105344,
							3968: 268435456,
							4096: 268443648,
							4352: 270532616,
							4608: 270540808,
							4864: 8200,
							5120: 2097152,
							5376: 268435456,
							5632: 268435464,
							5888: 2105344,
							6144: 2105352,
							6400: 0,
							6656: 8,
							6912: 270532608,
							7168: 8192,
							7424: 268443656,
							7680: 270540800,
							7936: 2097160,
							4224: 8,
							4480: 2105344,
							4736: 2097152,
							4992: 268435464,
							5248: 268443648,
							5504: 8200,
							5760: 270540808,
							6016: 270532608,
							6272: 270540800,
							6528: 270532616,
							6784: 8192,
							7040: 2105352,
							7296: 2097160,
							7552: 0,
							7808: 268435456,
							8064: 268443656
						}, {
							0: 1048576,
							16: 33555457,
							32: 1024,
							48: 1049601,
							64: 34604033,
							80: 0,
							96: 1,
							112: 34603009,
							128: 33555456,
							144: 1048577,
							160: 33554433,
							176: 34604032,
							192: 34603008,
							208: 1025,
							224: 1049600,
							240: 33554432,
							8: 34603009,
							24: 0,
							40: 33555457,
							56: 34604032,
							72: 1048576,
							88: 33554433,
							104: 33554432,
							120: 1025,
							136: 1049601,
							152: 33555456,
							168: 34603008,
							184: 1048577,
							200: 1024,
							216: 34604033,
							232: 1,
							248: 1049600,
							256: 33554432,
							272: 1048576,
							288: 33555457,
							304: 34603009,
							320: 1048577,
							336: 33555456,
							352: 34604032,
							368: 1049601,
							384: 1025,
							400: 34604033,
							416: 1049600,
							432: 1,
							448: 0,
							464: 34603008,
							480: 33554433,
							496: 1024,
							264: 1049600,
							280: 33555457,
							296: 34603009,
							312: 1,
							328: 33554432,
							344: 1048576,
							360: 1025,
							376: 34604032,
							392: 33554433,
							408: 34603008,
							424: 0,
							440: 34604033,
							456: 1049601,
							472: 1024,
							488: 33555456,
							504: 1048577
						}, {
							0: 134219808,
							1: 131072,
							2: 134217728,
							3: 32,
							4: 131104,
							5: 134350880,
							6: 134350848,
							7: 2048,
							8: 134348800,
							9: 134219776,
							10: 133120,
							11: 134348832,
							12: 2080,
							13: 0,
							14: 134217760,
							15: 133152,
							2147483648: 2048,
							2147483649: 134350880,
							2147483650: 134219808,
							2147483651: 134217728,
							2147483652: 134348800,
							2147483653: 133120,
							2147483654: 133152,
							2147483655: 32,
							2147483656: 134217760,
							2147483657: 2080,
							2147483658: 131104,
							2147483659: 134350848,
							2147483660: 0,
							2147483661: 134348832,
							2147483662: 134219776,
							2147483663: 131072,
							16: 133152,
							17: 134350848,
							18: 32,
							19: 2048,
							20: 134219776,
							21: 134217760,
							22: 134348832,
							23: 131072,
							24: 0,
							25: 131104,
							26: 134348800,
							27: 134219808,
							28: 134350880,
							29: 133120,
							30: 2080,
							31: 134217728,
							2147483664: 131072,
							2147483665: 2048,
							2147483666: 134348832,
							2147483667: 133152,
							2147483668: 32,
							2147483669: 134348800,
							2147483670: 134217728,
							2147483671: 134219808,
							2147483672: 134350880,
							2147483673: 134217760,
							2147483674: 134219776,
							2147483675: 0,
							2147483676: 133120,
							2147483677: 2080,
							2147483678: 131104,
							2147483679: 134350848
						}],
						k = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679],
						l = f.DES = d.extend({
							_doReset: function() {
								for(var a = this._key.words, b = [], c = 0; 56 > c; c++) {
									var d = g[c] - 1;
									b[c] = a[d >>> 5] >>> 31 - d % 32 & 1
								}
								for(a = this._subKeys = [], d = 0; 16 > d; d++) {
									for(var e = a[d] = [], f = i[d], c = 0; 24 > c; c++) e[c / 6 | 0] |= b[(h[c] - 1 + f) % 28] << 31 - c % 6, e[4 + (c / 6 | 0)] |= b[28 + (h[c + 24] - 1 + f) % 28] << 31 - c % 6;
									for(e[0] = e[0] << 1 | e[0] >>> 31, c = 1; 7 > c; c++) e[c] >>>= 4 * (c - 1) + 3;
									e[7] = e[7] << 5 | e[7] >>> 27
								}
								for(b = this._invSubKeys = [], c = 0; 16 > c; c++) b[c] = a[15 - c]
							},
							encryptBlock: function(a, b) {
								this._doCryptBlock(a, b, this._subKeys)
							},
							decryptBlock: function(a, b) {
								this._doCryptBlock(a, b, this._invSubKeys)
							},
							_doCryptBlock: function(c, d, e) {
								this._lBlock = c[d], this._rBlock = c[d + 1], a.call(this, 4, 252645135), a.call(this, 16, 65535), b.call(this, 2, 858993459), b.call(this, 8, 16711935), a.call(this, 1, 1431655765);
								for(var f = 0; 16 > f; f++) {
									for(var g = e[f], h = this._lBlock, i = this._rBlock, l = 0, m = 0; 8 > m; m++) l |= j[m][((i ^ g[m]) & k[m]) >>> 0];
									this._lBlock = i, this._rBlock = h ^ l
								}
								e = this._lBlock, this._lBlock = this._rBlock, this._rBlock = e, a.call(this, 1, 1431655765), b.call(this, 8, 16711935), b.call(this, 2, 858993459), a.call(this, 16, 65535), a.call(this, 4, 252645135), c[d] = this._lBlock, c[d + 1] = this._rBlock
							},
							keySize: 2,
							ivSize: 2,
							blockSize: 2
						});
					c.DES = d._createHelper(l), f = f.TripleDES = d.extend({
						_doReset: function() {
							var a = this._key.words;
							this._des1 = l.createEncryptor(e.create(a.slice(0, 2))), this._des2 = l.createEncryptor(e.create(a.slice(2, 4))), this._des3 = l.createEncryptor(e.create(a.slice(4, 6)))
						},
						encryptBlock: function(a, b) {
							this._des1.encryptBlock(a, b), this._des2.decryptBlock(a, b), this._des3.encryptBlock(a, b)
						},
						decryptBlock: function(a, b) {
							this._des3.decryptBlock(a, b), this._des2.encryptBlock(a, b), this._des1.decryptBlock(a, b)
						},
						keySize: 6,
						ivSize: 2,
						blockSize: 2
					}), c.TripleDES = d._createHelper(f)
				}(),
				function() {
					var a = Tc,
						b = a.lib.WordArray;
					a.enc.Base64 = {
						stringify: function(a) {
							var b = a.words,
								c = a.sigBytes,
								d = this._map;
							a.clamp(), a = [];
							for(var e = 0; e < c; e += 3)
								for(var f = (b[e >>> 2] >>> 24 - e % 4 * 8 & 255) << 16 | (b[e + 1 >>> 2] >>> 24 - (e + 1) % 4 * 8 & 255) << 8 | b[e + 2 >>> 2] >>> 24 - (e + 2) % 4 * 8 & 255, g = 0; 4 > g && e + .75 * g < c; g++) a.push(d.charAt(f >>> 6 * (3 - g) & 63));
							if(b = d.charAt(64))
								for(; a.length % 4;) a.push(b);
							return a.join("")
						},
						parse: function(a) {
							var c = a.length,
								d = this._map,
								e = d.charAt(64);
							e && -1 != (e = a.indexOf(e)) && (c = e);
							for(var e = [], f = 0, g = 0; g < c; g++)
								if(g % 4) {
									var h = d.indexOf(a.charAt(g - 1)) << g % 4 * 2,
										i = d.indexOf(a.charAt(g)) >>> 6 - g % 4 * 2;
									e[f >>> 2] |= (h | i) << 24 - f % 4 * 8, f++
								}
							return b.create(e, f)
						},
						_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
					}
				}(),
				function(a) {
					function b(a, b, c, d, e, f, g) {
						return((a = a + (b & c | ~b & d) + e + g) << f | a >>> 32 - f) + b
					}

					function c(a, b, c, d, e, f, g) {
						return((a = a + (b & d | c & ~d) + e + g) << f | a >>> 32 - f) + b
					}

					function d(a, b, c, d, e, f, g) {
						return((a = a + (b ^ c ^ d) + e + g) << f | a >>> 32 - f) + b
					}

					function e(a, b, c, d, e, f, g) {
						return((a = a + (c ^ (b | ~d)) + e + g) << f | a >>> 32 - f) + b
					}
					for(var f = Tc, g = f.lib, h = g.WordArray, i = g.Hasher, g = f.algo, j = [], k = 0; 64 > k; k++) j[k] = 4294967296 * a.abs(a.sin(k + 1)) | 0;
					g = g.MD5 = i.extend({
						_doReset: function() {
							this._hash = new h.init([1732584193, 4023233417, 2562383102, 271733878])
						},
						_doProcessBlock: function(a, f) {
							for(var g = 0; 16 > g; g++) {
								var h = f + g,
									i = a[h];
								a[h] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8)
							}
							var g = this._hash.words,
								h = a[f + 0],
								i = a[f + 1],
								k = a[f + 2],
								l = a[f + 3],
								m = a[f + 4],
								n = a[f + 5],
								o = a[f + 6],
								p = a[f + 7],
								q = a[f + 8],
								r = a[f + 9],
								s = a[f + 10],
								t = a[f + 11],
								u = a[f + 12],
								v = a[f + 13],
								w = a[f + 14],
								x = a[f + 15],
								y = g[0],
								z = g[1],
								A = g[2],
								B = g[3],
								y = b(y, z, A, B, h, 7, j[0]),
								B = b(B, y, z, A, i, 12, j[1]),
								A = b(A, B, y, z, k, 17, j[2]),
								z = b(z, A, B, y, l, 22, j[3]),
								y = b(y, z, A, B, m, 7, j[4]),
								B = b(B, y, z, A, n, 12, j[5]),
								A = b(A, B, y, z, o, 17, j[6]),
								z = b(z, A, B, y, p, 22, j[7]),
								y = b(y, z, A, B, q, 7, j[8]),
								B = b(B, y, z, A, r, 12, j[9]),
								A = b(A, B, y, z, s, 17, j[10]),
								z = b(z, A, B, y, t, 22, j[11]),
								y = b(y, z, A, B, u, 7, j[12]),
								B = b(B, y, z, A, v, 12, j[13]),
								A = b(A, B, y, z, w, 17, j[14]),
								z = b(z, A, B, y, x, 22, j[15]),
								y = c(y, z, A, B, i, 5, j[16]),
								B = c(B, y, z, A, o, 9, j[17]),
								A = c(A, B, y, z, t, 14, j[18]),
								z = c(z, A, B, y, h, 20, j[19]),
								y = c(y, z, A, B, n, 5, j[20]),
								B = c(B, y, z, A, s, 9, j[21]),
								A = c(A, B, y, z, x, 14, j[22]),
								z = c(z, A, B, y, m, 20, j[23]),
								y = c(y, z, A, B, r, 5, j[24]),
								B = c(B, y, z, A, w, 9, j[25]),
								A = c(A, B, y, z, l, 14, j[26]),
								z = c(z, A, B, y, q, 20, j[27]),
								y = c(y, z, A, B, v, 5, j[28]),
								B = c(B, y, z, A, k, 9, j[29]),
								A = c(A, B, y, z, p, 14, j[30]),
								z = c(z, A, B, y, u, 20, j[31]),
								y = d(y, z, A, B, n, 4, j[32]),
								B = d(B, y, z, A, q, 11, j[33]),
								A = d(A, B, y, z, t, 16, j[34]),
								z = d(z, A, B, y, w, 23, j[35]),
								y = d(y, z, A, B, i, 4, j[36]),
								B = d(B, y, z, A, m, 11, j[37]),
								A = d(A, B, y, z, p, 16, j[38]),
								z = d(z, A, B, y, s, 23, j[39]),
								y = d(y, z, A, B, v, 4, j[40]),
								B = d(B, y, z, A, h, 11, j[41]),
								A = d(A, B, y, z, l, 16, j[42]),
								z = d(z, A, B, y, o, 23, j[43]),
								y = d(y, z, A, B, r, 4, j[44]),
								B = d(B, y, z, A, u, 11, j[45]),
								A = d(A, B, y, z, x, 16, j[46]),
								z = d(z, A, B, y, k, 23, j[47]),
								y = e(y, z, A, B, h, 6, j[48]),
								B = e(B, y, z, A, p, 10, j[49]),
								A = e(A, B, y, z, w, 15, j[50]),
								z = e(z, A, B, y, n, 21, j[51]),
								y = e(y, z, A, B, u, 6, j[52]),
								B = e(B, y, z, A, l, 10, j[53]),
								A = e(A, B, y, z, s, 15, j[54]),
								z = e(z, A, B, y, i, 21, j[55]),
								y = e(y, z, A, B, q, 6, j[56]),
								B = e(B, y, z, A, x, 10, j[57]),
								A = e(A, B, y, z, o, 15, j[58]),
								z = e(z, A, B, y, v, 21, j[59]),
								y = e(y, z, A, B, m, 6, j[60]),
								B = e(B, y, z, A, t, 10, j[61]),
								A = e(A, B, y, z, k, 15, j[62]),
								z = e(z, A, B, y, r, 21, j[63]);
							g[0] = g[0] + y | 0, g[1] = g[1] + z | 0, g[2] = g[2] + A | 0, g[3] = g[3] + B | 0
						},
						_doFinalize: function() {
							var b = this._data,
								c = b.words,
								d = 8 * this._nDataBytes,
								e = 8 * b.sigBytes;
							c[e >>> 5] |= 128 << 24 - e % 32;
							var f = a.floor(d / 4294967296);
							for(c[15 + (e + 64 >>> 9 << 4)] = 16711935 & (f << 8 | f >>> 24) | 4278255360 & (f << 24 | f >>> 8), c[14 + (e + 64 >>> 9 << 4)] = 16711935 & (d << 8 | d >>> 24) | 4278255360 & (d << 24 | d >>> 8), b.sigBytes = 4 * (c.length + 1), this._process(), b = this._hash, c = b.words, d = 0; 4 > d; d++) e = c[d], c[d] = 16711935 & (e << 8 | e >>> 24) | 4278255360 & (e << 24 | e >>> 8);
							return b
						},
						clone: function() {
							var a = i.clone.call(this);
							return a._hash = this._hash.clone(), a
						}
					}), f.MD5 = i._createHelper(g), f.HmacMD5 = i._createHmacHelper(g)
				}(Math),
				function() {
					var a = Tc,
						b = a.lib,
						c = b.WordArray,
						d = b.Hasher,
						e = [],
						b = a.algo.SHA1 = d.extend({
							_doReset: function() {
								this._hash = new c.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
							},
							_doProcessBlock: function(a, b) {
								for(var c = this._hash.words, d = c[0], f = c[1], g = c[2], h = c[3], i = c[4], j = 0; 80 > j; j++) {
									if(16 > j) e[j] = 0 | a[b + j];
									else {
										var k = e[j - 3] ^ e[j - 8] ^ e[j - 14] ^ e[j - 16];
										e[j] = k << 1 | k >>> 31
									}
									k = (d << 5 | d >>> 27) + i + e[j], k = 20 > j ? k + (1518500249 + (f & g | ~f & h)) : 40 > j ? k + (1859775393 + (f ^ g ^ h)) : 60 > j ? k + ((f & g | f & h | g & h) - 1894007588) : k + ((f ^ g ^ h) - 899497514), i = h, h = g, g = f << 30 | f >>> 2, f = d, d = k
								}
								c[0] = c[0] + d | 0, c[1] = c[1] + f | 0, c[2] = c[2] + g | 0, c[3] = c[3] + h | 0, c[4] = c[4] + i | 0
							},
							_doFinalize: function() {
								var a = this._data,
									b = a.words,
									c = 8 * this._nDataBytes,
									d = 8 * a.sigBytes;
								return b[d >>> 5] |= 128 << 24 - d % 32, b[14 + (d + 64 >>> 9 << 4)] = Math.floor(c / 4294967296), b[15 + (d + 64 >>> 9 << 4)] = c, a.sigBytes = 4 * b.length, this._process(), this._hash
							},
							clone: function() {
								var a = d.clone.call(this);
								return a._hash = this._hash.clone(), a
							}
						});
					a.SHA1 = d._createHelper(b), a.HmacSHA1 = d._createHmacHelper(b)
				}(),
				function(a) {
					for(var b = Tc, c = b.lib, d = c.WordArray, e = c.Hasher, c = b.algo, f = [], g = [], h = function(a) {
							return 4294967296 * (a - (0 | a)) | 0
						}, i = 2, j = 0; 64 > j;) {
						var k;
						a: {
							k = i;
							for(var l = a.sqrt(k), m = 2; m <= l; m++)
								if(!(k % m)) {
									k = !1;
									break a
								}
							k = !0
						}
						k && (8 > j && (f[j] = h(a.pow(i, .5))), g[j] = h(a.pow(i, 1 / 3)), j++), i++
					}
					var n = [],
						c = c.SHA256 = e.extend({
							_doReset: function() {
								this._hash = new d.init(f.slice(0))
							},
							_doProcessBlock: function(a, b) {
								for(var c = this._hash.words, d = c[0], e = c[1], f = c[2], h = c[3], i = c[4], j = c[5], k = c[6], l = c[7], m = 0; 64 > m; m++) {
									if(16 > m) n[m] = 0 | a[b + m];
									else {
										var o = n[m - 15],
											p = n[m - 2];
										n[m] = ((o << 25 | o >>> 7) ^ (o << 14 | o >>> 18) ^ o >>> 3) + n[m - 7] + ((p << 15 | p >>> 17) ^ (p << 13 | p >>> 19) ^ p >>> 10) + n[m - 16]
									}
									o = l + ((i << 26 | i >>> 6) ^ (i << 21 | i >>> 11) ^ (i << 7 | i >>> 25)) + (i & j ^ ~i & k) + g[m] + n[m], p = ((d << 30 | d >>> 2) ^ (d << 19 | d >>> 13) ^ (d << 10 | d >>> 22)) + (d & e ^ d & f ^ e & f), l = k, k = j, j = i, i = h + o | 0, h = f, f = e, e = d, d = o + p | 0
								}
								c[0] = c[0] + d | 0, c[1] = c[1] + e | 0, c[2] = c[2] + f | 0, c[3] = c[3] + h | 0, c[4] = c[4] + i | 0, c[5] = c[5] + j | 0, c[6] = c[6] + k | 0, c[7] = c[7] + l | 0
							},
							_doFinalize: function() {
								var b = this._data,
									c = b.words,
									d = 8 * this._nDataBytes,
									e = 8 * b.sigBytes;
								return c[e >>> 5] |= 128 << 24 - e % 32, c[14 + (e + 64 >>> 9 << 4)] = a.floor(d / 4294967296), c[15 + (e + 64 >>> 9 << 4)] = d, b.sigBytes = 4 * c.length, this._process(), this._hash
							},
							clone: function() {
								var a = e.clone.call(this);
								return a._hash = this._hash.clone(), a
							}
						});
					b.SHA256 = e._createHelper(c), b.HmacSHA256 = e._createHmacHelper(c)
				}(Math),
				function() {
					var a = Tc,
						b = a.lib.WordArray,
						c = a.algo,
						d = c.SHA256,
						c = c.SHA224 = d.extend({
							_doReset: function() {
								this._hash = new b.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428])
							},
							_doFinalize: function() {
								var a = d._doFinalize.call(this);
								return a.sigBytes -= 4, a
							}
						});
					a.SHA224 = d._createHelper(c), a.HmacSHA224 = d._createHmacHelper(c)
				}(),
				function() {
					function a() {
						return e.create.apply(e, arguments)
					}
					for(var b = Tc, c = b.lib.Hasher, d = b.x64, e = d.Word, f = d.WordArray, d = b.algo, g = [a(1116352408, 3609767458), a(1899447441, 602891725), a(3049323471, 3964484399), a(3921009573, 2173295548), a(961987163, 4081628472), a(1508970993, 3053834265), a(2453635748, 2937671579), a(2870763221, 3664609560), a(3624381080, 2734883394), a(310598401, 1164996542), a(607225278, 1323610764), a(1426881987, 3590304994), a(1925078388, 4068182383), a(2162078206, 991336113), a(2614888103, 633803317), a(3248222580, 3479774868), a(3835390401, 2666613458), a(4022224774, 944711139), a(264347078, 2341262773), a(604807628, 2007800933), a(770255983, 1495990901), a(1249150122, 1856431235), a(1555081692, 3175218132), a(1996064986, 2198950837), a(2554220882, 3999719339), a(2821834349, 766784016), a(2952996808, 2566594879), a(3210313671, 3203337956), a(3336571891, 1034457026), a(3584528711, 2466948901), a(113926993, 3758326383), a(338241895, 168717936), a(666307205, 1188179964), a(773529912, 1546045734), a(1294757372, 1522805485), a(1396182291, 2643833823), a(1695183700, 2343527390), a(1986661051, 1014477480), a(2177026350, 1206759142), a(2456956037, 344077627), a(2730485921, 1290863460), a(2820302411, 3158454273), a(3259730800, 3505952657), a(3345764771, 106217008), a(3516065817, 3606008344), a(3600352804, 1432725776), a(4094571909, 1467031594), a(275423344, 851169720), a(430227734, 3100823752), a(506948616, 1363258195), a(659060556, 3750685593), a(883997877, 3785050280), a(958139571, 3318307427), a(1322822218, 3812723403), a(1537002063, 2003034995), a(1747873779, 3602036899), a(1955562222, 1575990012), a(2024104815, 1125592928), a(2227730452, 2716904306), a(2361852424, 442776044), a(2428436474, 593698344), a(2756734187, 3733110249), a(3204031479, 2999351573), a(3329325298, 3815920427), a(3391569614, 3928383900), a(3515267271, 566280711), a(3940187606, 3454069534), a(4118630271, 4000239992), a(116418474, 1914138554), a(174292421, 2731055270), a(289380356, 3203993006), a(460393269, 320620315), a(685471733, 587496836), a(852142971, 1086792851), a(1017036298, 365543100), a(1126000580, 2618297676), a(1288033470, 3409855158), a(1501505948, 4234509866), a(1607167915, 987167468), a(1816402316, 1246189591)], h = [], i = 0; 80 > i; i++) h[i] = a();
					d = d.SHA512 = c.extend({
						_doReset: function() {
							this._hash = new f.init([new e.init(1779033703, 4089235720), new e.init(3144134277, 2227873595), new e.init(1013904242, 4271175723), new e.init(2773480762, 1595750129), new e.init(1359893119, 2917565137), new e.init(2600822924, 725511199), new e.init(528734635, 4215389547), new e.init(1541459225, 327033209)])
						},
						_doProcessBlock: function(a, b) {
							for(var c = this._hash.words, d = c[0], e = c[1], f = c[2], i = c[3], j = c[4], k = c[5], l = c[6], c = c[7], m = d.high, n = d.low, o = e.high, p = e.low, q = f.high, r = f.low, s = i.high, t = i.low, u = j.high, v = j.low, w = k.high, x = k.low, y = l.high, z = l.low, A = c.high, B = c.low, C = m, D = n, E = o, F = p, G = q, H = r, I = s, J = t, K = u, L = v, M = w, N = x, O = y, P = z, Q = A, R = B, S = 0; 80 > S; S++) {
								var T = h[S];
								if(16 > S) var U = T.high = 0 | a[b + 2 * S],
									V = T.low = 0 | a[b + 2 * S + 1];
								else {
									var U = h[S - 15],
										V = U.high,
										W = U.low,
										U = (V >>> 1 | W << 31) ^ (V >>> 8 | W << 24) ^ V >>> 7,
										W = (W >>> 1 | V << 31) ^ (W >>> 8 | V << 24) ^ (W >>> 7 | V << 25),
										X = h[S - 2],
										V = X.high,
										Y = X.low,
										X = (V >>> 19 | Y << 13) ^ (V << 3 | Y >>> 29) ^ V >>> 6,
										Y = (Y >>> 19 | V << 13) ^ (Y << 3 | V >>> 29) ^ (Y >>> 6 | V << 26),
										V = h[S - 7],
										Z = V.high,
										$ = h[S - 16],
										_ = $.high,
										$ = $.low,
										V = W + V.low,
										U = U + Z + (V >>> 0 < W >>> 0 ? 1 : 0),
										V = V + Y,
										U = U + X + (V >>> 0 < Y >>> 0 ? 1 : 0),
										V = V + $,
										U = U + _ + (V >>> 0 < $ >>> 0 ? 1 : 0);
									T.high = U, T.low = V
								}
								var Z = K & M ^ ~K & O,
									$ = L & N ^ ~L & P,
									T = C & E ^ C & G ^ E & G,
									aa = D & F ^ D & H ^ F & H,
									W = (C >>> 28 | D << 4) ^ (C << 30 | D >>> 2) ^ (C << 25 | D >>> 7),
									X = (D >>> 28 | C << 4) ^ (D << 30 | C >>> 2) ^ (D << 25 | C >>> 7),
									Y = g[S],
									ba = Y.high,
									ca = Y.low,
									Y = R + ((L >>> 14 | K << 18) ^ (L >>> 18 | K << 14) ^ (L << 23 | K >>> 9)),
									_ = Q + ((K >>> 14 | L << 18) ^ (K >>> 18 | L << 14) ^ (K << 23 | L >>> 9)) + (Y >>> 0 < R >>> 0 ? 1 : 0),
									Y = Y + $,
									_ = _ + Z + (Y >>> 0 < $ >>> 0 ? 1 : 0),
									Y = Y + ca,
									_ = _ + ba + (Y >>> 0 < ca >>> 0 ? 1 : 0),
									Y = Y + V,
									_ = _ + U + (Y >>> 0 < V >>> 0 ? 1 : 0),
									V = X + aa,
									T = W + T + (V >>> 0 < X >>> 0 ? 1 : 0),
									Q = O,
									R = P,
									O = M,
									P = N,
									M = K,
									N = L,
									L = J + Y | 0,
									K = I + _ + (L >>> 0 < J >>> 0 ? 1 : 0) | 0,
									I = G,
									J = H,
									G = E,
									H = F,
									E = C,
									F = D,
									D = Y + V | 0,
									C = _ + T + (D >>> 0 < Y >>> 0 ? 1 : 0) | 0
							}
							n = d.low = n + D, d.high = m + C + (n >>> 0 < D >>> 0 ? 1 : 0), p = e.low = p + F, e.high = o + E + (p >>> 0 < F >>> 0 ? 1 : 0), r = f.low = r + H, f.high = q + G + (r >>> 0 < H >>> 0 ? 1 : 0), t = i.low = t + J, i.high = s + I + (t >>> 0 < J >>> 0 ? 1 : 0), v = j.low = v + L, j.high = u + K + (v >>> 0 < L >>> 0 ? 1 : 0), x = k.low = x + N, k.high = w + M + (x >>> 0 < N >>> 0 ? 1 : 0), z = l.low = z + P, l.high = y + O + (z >>> 0 < P >>> 0 ? 1 : 0), B = c.low = B + R, c.high = A + Q + (B >>> 0 < R >>> 0 ? 1 : 0)
						},
						_doFinalize: function() {
							var a = this._data,
								b = a.words,
								c = 8 * this._nDataBytes,
								d = 8 * a.sigBytes;
							return b[d >>> 5] |= 128 << 24 - d % 32, b[30 + (d + 128 >>> 10 << 5)] = Math.floor(c / 4294967296), b[31 + (d + 128 >>> 10 << 5)] = c, a.sigBytes = 4 * b.length, this._process(), this._hash.toX32()
						},
						clone: function() {
							var a = c.clone.call(this);
							return a._hash = this._hash.clone(), a
						},
						blockSize: 32
					}), b.SHA512 = c._createHelper(d), b.HmacSHA512 = c._createHmacHelper(d)
				}(),
				function() {
					var a = Tc,
						b = a.x64,
						c = b.Word,
						d = b.WordArray,
						b = a.algo,
						e = b.SHA512,
						b = b.SHA384 = e.extend({
							_doReset: function() {
								this._hash = new d.init([new c.init(3418070365, 3238371032), new c.init(1654270250, 914150663), new c.init(2438529370, 812702999), new c.init(355462360, 4144912697), new c.init(1731405415, 4290775857), new c.init(2394180231, 1750603025), new c.init(3675008525, 1694076839), new c.init(1203062813, 3204075428)])
							},
							_doFinalize: function() {
								var a = e._doFinalize.call(this);
								return a.sigBytes -= 16, a
							}
						});
					a.SHA384 = e._createHelper(b), a.HmacSHA384 = e._createHmacHelper(b)
				}(),
				function() {
					var a = Tc,
						b = a.lib,
						c = b.WordArray,
						d = b.Hasher,
						b = a.algo,
						e = c.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]),
						f = c.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]),
						g = c.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]),
						h = c.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]),
						i = c.create([0, 1518500249, 1859775393, 2400959708, 2840853838]),
						j = c.create([1352829926, 1548603684, 1836072691, 2053994217, 0]),
						b = b.RIPEMD160 = d.extend({
							_doReset: function() {
								this._hash = c.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
							},
							_doProcessBlock: function(a, b) {
								for(var c = 0; 16 > c; c++) {
									var d = b + c,
										k = a[d];
									a[d] = 16711935 & (k << 8 | k >>> 24) | 4278255360 & (k << 24 | k >>> 8)
								}
								var l, m, n, o, p, q, r, s, t, u, d = this._hash.words,
									k = i.words,
									v = j.words,
									w = e.words,
									x = f.words,
									y = g.words,
									z = h.words;
								q = l = d[0], r = m = d[1], s = n = d[2], t = o = d[3], u = p = d[4];
								for(var A, c = 0; 80 > c; c += 1) A = l + a[b + w[c]] | 0, A = 16 > c ? A + ((m ^ n ^ o) + k[0]) : 32 > c ? A + ((m & n | ~m & o) + k[1]) : 48 > c ? A + (((m | ~n) ^ o) + k[2]) : 64 > c ? A + ((m & o | n & ~o) + k[3]) : A + ((m ^ (n | ~o)) + k[4]), A |= 0, A = A << y[c] | A >>> 32 - y[c], A = A + p | 0, l = p, p = o, o = n << 10 | n >>> 22, n = m, m = A, A = q + a[b + x[c]] | 0, A = 16 > c ? A + ((r ^ (s | ~t)) + v[0]) : 32 > c ? A + ((r & t | s & ~t) + v[1]) : 48 > c ? A + (((r | ~s) ^ t) + v[2]) : 64 > c ? A + ((r & s | ~r & t) + v[3]) : A + ((r ^ s ^ t) + v[4]), A |= 0, A = A << z[c] | A >>> 32 - z[c], A = A + u | 0, q = u, u = t, t = s << 10 | s >>> 22, s = r, r = A;
								A = d[1] + n + t | 0, d[1] = d[2] + o + u | 0, d[2] = d[3] + p + q | 0, d[3] = d[4] + l + r | 0, d[4] = d[0] + m + s | 0, d[0] = A
							},
							_doFinalize: function() {
								var a = this._data,
									b = a.words,
									c = 8 * this._nDataBytes,
									d = 8 * a.sigBytes;
								for(b[d >>> 5] |= 128 << 24 - d % 32, b[14 + (d + 64 >>> 9 << 4)] = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8), a.sigBytes = 4 * (b.length + 1), this._process(), a = this._hash, b = a.words, c = 0; 5 > c; c++) d = b[c], b[c] = 16711935 & (d << 8 | d >>> 24) | 4278255360 & (d << 24 | d >>> 8);
								return a
							},
							clone: function() {
								var a = d.clone.call(this);
								return a._hash = this._hash.clone(), a
							}
						});
					a.RIPEMD160 = d._createHelper(b), a.HmacRIPEMD160 = d._createHmacHelper(b)
				}(Math),
				function() {
					var a = Tc,
						b = a.enc.Utf8;
					a.algo.HMAC = a.lib.Base.extend({
						init: function(a, c) {
							a = this._hasher = new a.init, "string" == typeof c && (c = b.parse(c));
							var d = a.blockSize,
								e = 4 * d;
							c.sigBytes > e && (c = a.finalize(c)), c.clamp();
							for(var f = this._oKey = c.clone(), g = this._iKey = c.clone(), h = f.words, i = g.words, j = 0; j < d; j++) h[j] ^= 1549556828, i[j] ^= 909522486;
							f.sigBytes = g.sigBytes = e, this.reset()
						},
						reset: function() {
							var a = this._hasher;
							a.reset(), a.update(this._iKey)
						},
						update: function(a) {
							return this._hasher.update(a), this
						},
						finalize: function(a) {
							var b = this._hasher;
							return a = b.finalize(a), b.reset(), b.finalize(this._oKey.clone().concat(a))
						}
					})
				}(),
				function() {
					var a = Tc,
						b = a.lib,
						c = b.Base,
						d = b.WordArray,
						b = a.algo,
						e = b.HMAC,
						f = b.PBKDF2 = c.extend({
							cfg: c.extend({
								keySize: 4,
								hasher: b.SHA1,
								iterations: 1
							}),
							init: function(a) {
								this.cfg = this.cfg.extend(a)
							},
							compute: function(a, b) {
								for(var c = this.cfg, f = e.create(c.hasher, a), g = d.create(), h = d.create([1]), i = g.words, j = h.words, k = c.keySize, c = c.iterations; i.length < k;) {
									var l = f.update(b).finalize(h);
									f.reset();
									for(var m = l.words, n = m.length, o = l, p = 1; p < c; p++) {
										o = f.finalize(o), f.reset();
										for(var q = o.words, r = 0; r < n; r++) m[r] ^= q[r]
									}
									g.concat(l), j[0]++
								}
								return g.sigBytes = 4 * k, g
							}
						});
					a.PBKDF2 = function(a, b, c) {
						return f.create(c).compute(a, b)
					}
				}();
			var Uc, Vc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
				Wc = "=",
				Xc = 0xdeadbeefcafe,
				Yc = 15715070 == (16777215 & Xc);
			Yc && "Microsoft Internet Explorer" == Qc.appName ? (f.prototype.am = i, Uc = 30) : Yc && "Netscape" != Qc.appName ? (f.prototype.am = h, Uc = 26) : (f.prototype.am = j, Uc = 28), f.prototype.DB = Uc, f.prototype.DM = (1 << Uc) - 1, f.prototype.DV = 1 << Uc;
			var Zc = 52;
			f.prototype.FV = Math.pow(2, Zc), f.prototype.F1 = Zc - Uc, f.prototype.F2 = 2 * Uc - Zc;
			var $c, _c, ad = "0123456789abcdefghijklmnopqrstuvwxyz",
				bd = new Array;
			for($c = "0".charCodeAt(0), _c = 0; _c <= 9; ++_c) bd[$c++] = _c;
			for($c = "a".charCodeAt(0), _c = 10; _c < 36; ++_c) bd[$c++] = _c;
			for($c = "A".charCodeAt(0), _c = 10; _c < 36; ++_c) bd[$c++] = _c;
			G.prototype.convert = H, G.prototype.revert = I, G.prototype.reduce = J, G.prototype.mulTo = K, G.prototype.sqrTo = L, N.prototype.convert = O, N.prototype.revert = P, N.prototype.reduce = Q, N.prototype.mulTo = S, N.prototype.sqrTo = R, f.prototype.copyTo = m, f.prototype.fromInt = n, f.prototype.fromString = p, f.prototype.clamp = q, f.prototype.dlShiftTo = x, f.prototype.drShiftTo = y, f.prototype.lShiftTo = z, f.prototype.rShiftTo = A, f.prototype.subTo = B, f.prototype.multiplyTo = C, f.prototype.squareTo = D, f.prototype.divRemTo = E, f.prototype.invDigit = M, f.prototype.isEven = T, f.prototype.exp = U, f.prototype.toString = r, f.prototype.negate = s, f.prototype.abs = t, f.prototype.compareTo = u, f.prototype.bitLength = w, f.prototype.mod = F, f.prototype.modPowInt = V, f.ZERO = o(0), f.ONE = o(1), Ma.prototype.convert = Na, Ma.prototype.revert = Na, Ma.prototype.mulTo = Oa, Ma.prototype.sqrTo = Pa, Ta.prototype.convert = Ua, Ta.prototype.revert = Va, Ta.prototype.reduce = Wa, Ta.prototype.mulTo = Ya, Ta.prototype.sqrTo = Xa;
			var cd = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997],
				dd = (1 << 26) / cd[cd.length - 1];
			f.prototype.chunkSize = $, f.prototype.toRadix = aa, f.prototype.fromRadix = ba, f.prototype.fromNumber = ca, f.prototype.bitwiseTo = ha, f.prototype.changeBit = ya, f.prototype.addTo = Ca, f.prototype.dMultiply = Ka, f.prototype.dAddOffset = La, f.prototype.multiplyLowerTo = Ra, f.prototype.multiplyUpperTo = Sa, f.prototype.modInt = _a, f.prototype.millerRabin = cb, f.prototype.clone = W, f.prototype.intValue = X, f.prototype.byteValue = Y, f.prototype.shortValue = Z, f.prototype.signum = _, f.prototype.toByteArray = da, f.prototype.equals = ea, f.prototype.min = fa, f.prototype.max = ga, f.prototype.and = ja, f.prototype.or = la, f.prototype.xor = na, f.prototype.andNot = pa, f.prototype.not = qa, f.prototype.shiftLeft = ra, f.prototype.shiftRight = sa, f.prototype.getLowestSetBit = ua, f.prototype.bitCount = wa, f.prototype.testBit = xa, f.prototype.setBit = za, f.prototype.clearBit = Aa, f.prototype.flipBit = Ba, f.prototype.add = Da, f.prototype.subtract = Ea, f.prototype.multiply = Fa, f.prototype.divide = Ha, f.prototype.remainder = Ia, f.prototype.divideAndRemainder = Ja, f.prototype.modPow = Za, f.prototype.modInverse = ab, f.prototype.pow = Qa, f.prototype.gcd = $a, f.prototype.isProbablePrime = bb, f.prototype.square = Ga, db.prototype.init = eb, db.prototype.next = fb;
			var ed, fd, gd, hd = 256;
			if(null == fd) {
				fd = new Array, gd = 0;
				var id;
				if(void 0 !== Rc && (void 0 !== Rc.crypto || void 0 !== Rc.msCrypto)) {
					var jd = Rc.crypto || Rc.msCrypto;
					if(jd.getRandomValues) {
						var kd = new Uint8Array(32);
						for(jd.getRandomValues(kd), id = 0; id < 32; ++id) fd[gd++] = kd[id]
					} else if("Netscape" == Qc.appName && Qc.appVersion < "5") {
						var ld = Rc.crypto.random(32);
						for(id = 0; id < ld.length; ++id) fd[gd++] = 255 & ld.charCodeAt(id)
					}
				}
				for(; gd < hd;) id = Math.floor(65536 * Math.random()), fd[gd++] = id >>> 8, fd[gd++] = 255 & id;
				gd = 0, ib()
			}
			lb.prototype.nextBytes = kb, qb.prototype.doPublic = sb, qb.prototype.setPublic = rb, qb.prototype.encrypt = tb, qb.prototype.encryptOAEP = ub, qb.prototype.type = "RSA", qb.prototype.doPrivate = Bb, qb.prototype.setPrivate = yb, qb.prototype.setPrivateEx = zb, qb.prototype.generate = Ab, qb.prototype.decrypt = Cb, qb.prototype.decryptOAEP = Db, Eb.prototype.equals = Fb, Eb.prototype.toBigInteger = Gb, Eb.prototype.negate = Hb, Eb.prototype.add = Ib, Eb.prototype.subtract = Jb, Eb.prototype.multiply = Kb, Eb.prototype.square = Lb, Eb.prototype.divide = Mb, Nb.prototype.getX = Ob, Nb.prototype.getY = Pb, Nb.prototype.equals = Qb, Nb.prototype.isInfinity = Rb, Nb.prototype.negate = Sb, Nb.prototype.add = Tb, Nb.prototype.twice = Ub, Nb.prototype.multiply = Vb, Nb.prototype.multiplyTwo = Wb, Xb.prototype.getQ = Yb, Xb.prototype.getA = Zb, Xb.prototype.getB = $b, Xb.prototype.equals = _b, Xb.prototype.getInfinity = ac, Xb.prototype.fromBigInteger = bc, Xb.prototype.decodePointHex = cc, Eb.prototype.getByteLength = function() {
				return Math.floor((this.toBigInteger().bitLength() + 7) / 8)
			}, Nb.prototype.getEncoded = function(a) {
				var b = function(a, b) {
						var c = a.toByteArrayUnsigned();
						if(b < c.length) c = c.slice(c.length - b);
						else
							for(; b > c.length;) c.unshift(0);
						return c
					},
					c = this.getX().toBigInteger(),
					d = this.getY().toBigInteger(),
					e = b(c, 32);
				return a ? d.isEven() ? e.unshift(2) : e.unshift(3) : (e.unshift(4), e = e.concat(b(d, 32))), e
			}, Nb.decodeFrom = function(a, b) {
				var c = (b[0], b.length - 1),
					d = b.slice(1, 1 + c / 2),
					e = b.slice(1 + c / 2, 1 + c);
				d.unshift(0), e.unshift(0);
				var g = new f(d),
					h = new f(e);
				return new Nb(a, a.fromBigInteger(g), a.fromBigInteger(h))
			}, Nb.decodeFromHex = function(a, b) {
				var c = (b.substr(0, 2), b.length - 2),
					d = b.substr(2, c / 2),
					e = b.substr(2 + c / 2, c / 2),
					g = new f(d, 16),
					h = new f(e, 16);
				return new Nb(a, a.fromBigInteger(g), a.fromBigInteger(h))
			}, Nb.prototype.add2D = function(a) {
				if(this.isInfinity()) return a;
				if(a.isInfinity()) return this;
				if(this.x.equals(a.x)) return this.y.equals(a.y) ? this.twice() : this.curve.getInfinity();
				var b = a.x.subtract(this.x),
					c = a.y.subtract(this.y),
					d = c.divide(b),
					e = d.square().subtract(this.x).subtract(a.x),
					f = d.multiply(this.x.subtract(e)).subtract(this.y);
				return new Nb(this.curve, e, f)
			}, Nb.prototype.twice2D = function() {
				if(this.isInfinity()) return this;
				if(0 == this.y.toBigInteger().signum()) return this.curve.getInfinity();
				var a = this.curve.fromBigInteger(f.valueOf(2)),
					b = this.curve.fromBigInteger(f.valueOf(3)),
					c = this.x.square().multiply(b).add(this.curve.a).divide(this.y.multiply(a)),
					d = c.square().subtract(this.x.multiply(a)),
					e = c.multiply(this.x.subtract(d)).subtract(this.y);
				return new Nb(this.curve, d, e)
			}, Nb.prototype.multiply2D = function(a) {
				if(this.isInfinity()) return this;
				if(0 == a.signum()) return this.curve.getInfinity();
				var b, c = a,
					d = c.multiply(new f("3")),
					e = this.negate(),
					g = this;
				for(b = d.bitLength() - 2; b > 0; --b) {
					g = g.twice();
					var h = d.testBit(b);
					h != c.testBit(b) && (g = g.add2D(h ? this : e))
				}
				return g
			}, Nb.prototype.isOnCurve = function() {
				var a = this.getX().toBigInteger(),
					b = this.getY().toBigInteger(),
					c = this.curve.getA().toBigInteger(),
					d = this.curve.getB().toBigInteger(),
					e = this.curve.getQ(),
					f = b.multiply(b).mod(e),
					g = a.multiply(a).multiply(a).add(c.multiply(a)).add(d).mod(e);
				return f.equals(g)
			}, Nb.prototype.toString = function() {
				return "(" + this.getX().toBigInteger().toString() + "," + this.getY().toBigInteger().toString() + ")"
			}, Nb.prototype.validate = function() {
				var a = this.curve.getQ();
				if(this.isInfinity()) throw new Error("Point is at infinity.");
				var b = this.getX().toBigInteger(),
					c = this.getY().toBigInteger();
				if(b.compareTo(f.ONE) < 0 || b.compareTo(a.subtract(f.ONE)) > 0) throw new Error("x coordinate out of bounds");
				if(c.compareTo(f.ONE) < 0 || c.compareTo(a.subtract(f.ONE)) > 0) throw new Error("y coordinate out of bounds");
				if(!this.isOnCurve()) throw new Error("Point is not on the curve.");
				if(this.multiply(a).isInfinity()) throw new Error("Point is not a scalar multiple of G.");
				return !0
			};
			var md = function() {
				function a(a, b, c) {
					return b ? g[b] : String.fromCharCode(parseInt(c, 16))
				}
				var b = "(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)",
					c = '(?:[^\\0-\\x08\\x0a-\\x1f"\\\\]|\\\\(?:["/\\\\bfnrt]|u[0-9A-Fa-f]{4}))',
					d = '(?:"' + c + '*")',
					e = new RegExp("(?:false|true|null|[\\{\\}\\[\\]]|" + b + "|" + d + ")", "g"),
					f = new RegExp("\\\\(?:([^u])|u(.{4}))", "g"),
					g = {
						'"': '"',
						"/": "/",
						"\\": "\\",
						b: "\b",
						f: "\f",
						n: "\n",
						r: "\r",
						t: "\t"
					},
					h = new String(""),
					i = (Object, Array, Object.hasOwnProperty);
				return function(b, c) {
					var d, g = b.match(e),
						j = g[0],
						k = !1;
					"{" === j ? d = {} : "[" === j ? d = [] : (d = [], k = !0);
					for(var l, m = [d], n = 1 - k, o = g.length; n < o; ++n) {
						j = g[n];
						var p;
						switch(j.charCodeAt(0)) {
							default: p = m[0],
							p[l || p.length] = +j,
							l = void 0;
							break;
							case 34:
									if(j = j.substring(1, j.length - 1), -1 !== j.indexOf("\\") && (j = j.replace(f, a)), p = m[0], !l) {
									if(!(p instanceof Array)) {
										l = j || h;
										break
									}
									l = p.length
								}p[l] = j,
								l = void 0;
								break;
							case 91:
									p = m[0],
								m.unshift(p[l || p.length] = []),
								l = void 0;
								break;
							case 93:
									m.shift();
								break;
							case 102:
									p = m[0],
								p[l || p.length] = !1,
								l = void 0;
								break;
							case 110:
									p = m[0],
								p[l || p.length] = null,
								l = void 0;
								break;
							case 116:
									p = m[0],
								p[l || p.length] = !0,
								l = void 0;
								break;
							case 123:
									p = m[0],
								m.unshift(p[l || p.length] = {}),
								l = void 0;
								break;
							case 125:
									m.shift()
						}
					}
					if(k) {
						if(1 !== m.length) throw new Error;
						d = d[0]
					} else if(m.length) throw new Error;
					if(c) {
						var q = function(a, b) {
							var d = a[b];
							if(d && "object" == typeof d) {
								var e = null;
								for(var f in d)
									if(i.call(d, f) && d !== a) {
										var g = q(d, f);
										void 0 !== g ? d[f] = g : (e || (e = []), e.push(f))
									}
								if(e)
									for(var h = e.length; --h >= 0;) delete d[e[h]]
							}
							return c.call(a, b, d)
						};
						d = q({
							"": d
						}, "")
					}
					return d
				}
			}();
			void 0 !== od && od || (od = {}), void 0 !== od.asn1 && od.asn1 || (od.asn1 = {}), od.asn1.ASN1Util = new function() {
				this.integerToByteHex = function(a) {
					var b = a.toString(16);
					return b.length % 2 == 1 && (b = "0" + b), b
				}, this.bigIntToMinTwosComplementsHex = function(a) {
					var b = a.toString(16);
					if("-" != b.substr(0, 1)) b.length % 2 == 1 ? b = "0" + b : b.match(/^[0-7]/) || (b = "00" + b);
					else {
						var c = b.substr(1),
							d = c.length;
						d % 2 == 1 ? d += 1 : b.match(/^[0-7]/) || (d += 2);
						for(var e = "", g = 0; g < d; g++) e += "f";
						b = new f(e, 16).xor(a).add(f.ONE).toString(16).replace(/^-/, "")
					}
					return b
				}, this.getPEMStringFromHex = function(a, b) {
					return xc(a, b)
				}, this.newObject = function(a) {
					var b = od,
						c = b.asn1,
						d = c.DERBoolean,
						e = c.DERInteger,
						f = c.DERBitString,
						g = c.DEROctetString,
						h = c.DERNull,
						i = c.DERObjectIdentifier,
						j = c.DEREnumerated,
						k = c.DERUTF8String,
						l = c.DERNumericString,
						m = c.DERPrintableString,
						n = c.DERTeletexString,
						o = c.DERIA5String,
						p = c.DERUTCTime,
						q = c.DERGeneralizedTime,
						r = c.DERSequence,
						s = c.DERSet,
						t = c.DERTaggedObject,
						u = c.ASN1Util.newObject,
						v = Object.keys(a);
					if(1 != v.length) throw "key of param shall be only one.";
					var w = v[0];
					if(-1 == ":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + w + ":")) throw "undefined key: " + w;
					if("bool" == w) return new d(a[w]);
					if("int" == w) return new e(a[w]);
					if("bitstr" == w) return new f(a[w]);
					if("octstr" == w) return new g(a[w]);
					if("null" == w) return new h(a[w]);
					if("oid" == w) return new i(a[w]);
					if("enum" == w) return new j(a[w]);
					if("utf8str" == w) return new k(a[w]);
					if("numstr" == w) return new l(a[w]);
					if("prnstr" == w) return new m(a[w]);
					if("telstr" == w) return new n(a[w]);
					if("ia5str" == w) return new o(a[w]);
					if("utctime" == w) return new p(a[w]);
					if("gentime" == w) return new q(a[w]);
					if("seq" == w) {
						for(var x = a[w], y = [], z = 0; z < x.length; z++) {
							var A = u(x[z]);
							y.push(A)
						}
						return new r({
							array: y
						})
					}
					if("set" == w) {
						for(var x = a[w], y = [], z = 0; z < x.length; z++) {
							var A = u(x[z]);
							y.push(A)
						}
						return new s({
							array: y
						})
					}
					if("tag" == w) {
						var B = a[w];
						if("[object Array]" === Object.prototype.toString.call(B) && 3 == B.length) {
							var C = u(B[2]);
							return new t({
								tag: B[0],
								explicit: B[1],
								obj: C
							})
						}
						var D = {};
						if(void 0 !== B.explicit && (D.explicit = B.explicit), void 0 !== B.tag && (D.tag = B.tag), void 0 === B.obj) throw "obj shall be specified for 'tag'.";
						return D.obj = u(B.obj), new t(D)
					}
				}, this.jsonToASN1HEX = function(a) {
					return this.newObject(a).getEncodedHex()
				}
			}, od.asn1.ASN1Util.oidHexToInt = function(a) {
				for(var b = "", c = parseInt(a.substr(0, 2), 16), d = Math.floor(c / 40), e = c % 40, b = d + "." + e, g = "", h = 2; h < a.length; h += 2) {
					var i = parseInt(a.substr(h, 2), 16),
						j = ("00000000" + i.toString(2)).slice(-8);
					if(g += j.substr(1, 7), "0" == j.substr(0, 1)) {
						b = b + "." + new f(g, 2).toString(10), g = ""
					}
				}
				return b
			}, od.asn1.ASN1Util.oidIntToHex = function(a) {
				var b = function(a) {
						var b = a.toString(16);
						return 1 == b.length && (b = "0" + b), b
					},
					c = function(a) {
						var c = "",
							d = new f(a, 10),
							e = d.toString(2),
							g = 7 - e.length % 7;
						7 == g && (g = 0);
						for(var h = "", i = 0; i < g; i++) h += "0";
						e = h + e;
						for(var i = 0; i < e.length - 1; i += 7) {
							var j = e.substr(i, 7);
							i != e.length - 7 && (j = "1" + j), c += b(parseInt(j, 2))
						}
						return c
					};
				if(!a.match(/^[0-9.]+$/)) throw "malformed oid string: " + a;
				var d = "",
					e = a.split("."),
					g = 40 * parseInt(e[0]) + parseInt(e[1]);
				d += b(g), e.splice(0, 2);
				for(var h = 0; h < e.length; h++) d += c(e[h]);
				return d
			}, od.asn1.ASN1Object = function() {
				this.getLengthHexFromValue = function() {
					if(void 0 === this.hV || null == this.hV) throw "this.hV is null or undefined.";
					if(this.hV.length % 2 == 1) throw "value hex must be even length: n=" + "".length + ",v=" + this.hV;
					var a = this.hV.length / 2,
						b = a.toString(16);
					if(b.length % 2 == 1 && (b = "0" + b), a < 128) return b;
					var c = b.length / 2;
					if(c > 15) throw "ASN.1 length too long to represent by 8x: n = " + a.toString(16);
					return(128 + c).toString(16) + b
				}, this.getEncodedHex = function() {
					return(null == this.hTLV || this.isModified) && (this.hV = this.getFreshValueHex(), this.hL = this.getLengthHexFromValue(), this.hTLV = this.hT + this.hL + this.hV, this.isModified = !1), this.hTLV
				}, this.getValueHex = function() {
					return this.getEncodedHex(), this.hV
				}, this.getFreshValueHex = function() {
					return ""
				}
			}, od.asn1.DERAbstractString = function(a) {
				od.asn1.DERAbstractString.superclass.constructor.call(this);
				this.getString = function() {
					return this.s
				}, this.setString = function(a) {
					this.hTLV = null, this.isModified = !0, this.s = a, this.hV = gc(this.s)
				}, this.setStringHex = function(a) {
					this.hTLV = null, this.isModified = !0, this.s = null, this.hV = a
				}, this.getFreshValueHex = function() {
					return this.hV
				}, void 0 !== a && ("string" == typeof a ? this.setString(a) : void 0 !== a.str ? this.setString(a.str) : void 0 !== a.hex && this.setStringHex(a.hex))
			}, Sc.lang.extend(od.asn1.DERAbstractString, od.asn1.ASN1Object), od.asn1.DERAbstractTime = function(a) {
				od.asn1.DERAbstractTime.superclass.constructor.call(this);
				this.localDateToUTC = function(a) {
					return utc = a.getTime() + 6e4 * a.getTimezoneOffset(), new Date(utc)
				}, this.formatDate = function(a, b, c) {
					var d = this.zeroPadding,
						e = this.localDateToUTC(a),
						f = String(e.getFullYear());
					"utc" == b && (f = f.substr(2, 2));
					var g = d(String(e.getMonth() + 1), 2),
						h = d(String(e.getDate()), 2),
						i = d(String(e.getHours()), 2),
						j = d(String(e.getMinutes()), 2),
						k = d(String(e.getSeconds()), 2),
						l = f + g + h + i + j + k;
					if(!0 === c) {
						var m = e.getMilliseconds();
						if(0 != m) {
							var n = d(String(m), 3);
							n = n.replace(/[0]+$/, ""), l = l + "." + n
						}
					}
					return l + "Z"
				}, this.zeroPadding = function(a, b) {
					return a.length >= b ? a : new Array(b - a.length + 1).join("0") + a
				}, this.getString = function() {
					return this.s
				}, this.setString = function(a) {
					this.hTLV = null, this.isModified = !0, this.s = a, this.hV = gc(a)
				}, this.setByDateValue = function(a, b, c, d, e, f) {
					var g = new Date(Date.UTC(a, b - 1, c, d, e, f, 0));
					this.setByDate(g)
				}, this.getFreshValueHex = function() {
					return this.hV
				}
			}, Sc.lang.extend(od.asn1.DERAbstractTime, od.asn1.ASN1Object), od.asn1.DERAbstractStructured = function(a) {
				od.asn1.DERAbstractString.superclass.constructor.call(this);
				this.setByASN1ObjectArray = function(a) {
					this.hTLV = null, this.isModified = !0, this.asn1Array = a
				}, this.appendASN1Object = function(a) {
					this.hTLV = null, this.isModified = !0, this.asn1Array.push(a)
				}, this.asn1Array = new Array, void 0 !== a && void 0 !== a.array && (this.asn1Array = a.array)
			}, Sc.lang.extend(od.asn1.DERAbstractStructured, od.asn1.ASN1Object), od.asn1.DERBoolean = function() {
				od.asn1.DERBoolean.superclass.constructor.call(this), this.hT = "01", this.hTLV = "0101ff"
			}, Sc.lang.extend(od.asn1.DERBoolean, od.asn1.ASN1Object), od.asn1.DERInteger = function(a) {
				od.asn1.DERInteger.superclass.constructor.call(this), this.hT = "02", this.setByBigInteger = function(a) {
					this.hTLV = null, this.isModified = !0, this.hV = od.asn1.ASN1Util.bigIntToMinTwosComplementsHex(a)
				}, this.setByInteger = function(a) {
					var b = new f(String(a), 10);
					this.setByBigInteger(b)
				}, this.setValueHex = function(a) {
					this.hV = a
				}, this.getFreshValueHex = function() {
					return this.hV
				}, void 0 !== a && (void 0 !== a.bigint ? this.setByBigInteger(a.bigint) : void 0 !== a.int ? this.setByInteger(a.int) : "number" == typeof a ? this.setByInteger(a) : void 0 !== a.hex && this.setValueHex(a.hex))
			}, Sc.lang.extend(od.asn1.DERInteger, od.asn1.ASN1Object), od.asn1.DERBitString = function(a) {
				if(void 0 !== a && void 0 !== a.obj) {
					var b = od.asn1.ASN1Util.newObject(a.obj);
					a.hex = "00" + b.getEncodedHex()
				}
				od.asn1.DERBitString.superclass.constructor.call(this), this.hT = "03", this.setHexValueIncludingUnusedBits = function(a) {
					this.hTLV = null, this.isModified = !0, this.hV = a
				}, this.setUnusedBitsAndHexValue = function(a, b) {
					if(a < 0 || 7 < a) throw "unused bits shall be from 0 to 7: u = " + a;
					var c = "0" + a;
					this.hTLV = null, this.isModified = !0, this.hV = c + b
				}, this.setByBinaryString = function(a) {
					a = a.replace(/0+$/, "");
					var b = 8 - a.length % 8;
					8 == b && (b = 0);
					for(var c = 0; c <= b; c++) a += "0";
					for(var d = "", c = 0; c < a.length - 1; c += 8) {
						var e = a.substr(c, 8),
							f = parseInt(e, 2).toString(16);
						1 == f.length && (f = "0" + f), d += f
					}
					this.hTLV = null, this.isModified = !0, this.hV = "0" + b + d
				}, this.setByBooleanArray = function(a) {
					for(var b = "", c = 0; c < a.length; c++) 1 == a[c] ? b += "1" : b += "0";
					this.setByBinaryString(b)
				}, this.newFalseArray = function(a) {
					for(var b = new Array(a), c = 0; c < a; c++) b[c] = !1;
					return b
				}, this.getFreshValueHex = function() {
					return this.hV
				}, void 0 !== a && ("string" == typeof a && a.toLowerCase().match(/^[0-9a-f]+$/) ? this.setHexValueIncludingUnusedBits(a) : void 0 !== a.hex ? this.setHexValueIncludingUnusedBits(a.hex) : void 0 !== a.bin ? this.setByBinaryString(a.bin) : void 0 !== a.array && this.setByBooleanArray(a.array))
			}, Sc.lang.extend(od.asn1.DERBitString, od.asn1.ASN1Object), od.asn1.DEROctetString = function(a) {
				if(void 0 !== a && void 0 !== a.obj) {
					var b = od.asn1.ASN1Util.newObject(a.obj);
					a.hex = b.getEncodedHex()
				}
				od.asn1.DEROctetString.superclass.constructor.call(this, a), this.hT = "04"
			}, Sc.lang.extend(od.asn1.DEROctetString, od.asn1.DERAbstractString), od.asn1.DERNull = function() {
				od.asn1.DERNull.superclass.constructor.call(this), this.hT = "05", this.hTLV = "0500"
			}, Sc.lang.extend(od.asn1.DERNull, od.asn1.ASN1Object), od.asn1.DERObjectIdentifier = function(a) {
				var b = function(a) {
						var b = a.toString(16);
						return 1 == b.length && (b = "0" + b), b
					},
					c = function(a) {
						var c = "",
							d = new f(a, 10),
							e = d.toString(2),
							g = 7 - e.length % 7;
						7 == g && (g = 0);
						for(var h = "", i = 0; i < g; i++) h += "0";
						e = h + e;
						for(var i = 0; i < e.length - 1; i += 7) {
							var j = e.substr(i, 7);
							i != e.length - 7 && (j = "1" + j), c += b(parseInt(j, 2))
						}
						return c
					};
				od.asn1.DERObjectIdentifier.superclass.constructor.call(this), this.hT = "06", this.setValueHex = function(a) {
					this.hTLV = null, this.isModified = !0, this.s = null, this.hV = a
				}, this.setValueOidString = function(a) {
					if(!a.match(/^[0-9.]+$/)) throw "malformed oid string: " + a;
					var d = "",
						e = a.split("."),
						f = 40 * parseInt(e[0]) + parseInt(e[1]);
					d += b(f), e.splice(0, 2);
					for(var g = 0; g < e.length; g++) d += c(e[g]);
					this.hTLV = null, this.isModified = !0, this.s = null, this.hV = d
				}, this.setValueName = function(a) {
					var b = od.asn1.x509.OID.name2oid(a);
					if("" === b) throw "DERObjectIdentifier oidName undefined: " + a;
					this.setValueOidString(b)
				}, this.getFreshValueHex = function() {
					return this.hV
				}, void 0 !== a && ("string" == typeof a ? a.match(/^[0-2].[0-9.]+$/) ? this.setValueOidString(a) : this.setValueName(a) : void 0 !== a.oid ? this.setValueOidString(a.oid) : void 0 !== a.hex ? this.setValueHex(a.hex) : void 0 !== a.name && this.setValueName(a.name))
			}, Sc.lang.extend(od.asn1.DERObjectIdentifier, od.asn1.ASN1Object), od.asn1.DEREnumerated = function(a) {
				od.asn1.DEREnumerated.superclass.constructor.call(this), this.hT = "0a", this.setByBigInteger = function(a) {
					this.hTLV = null, this.isModified = !0, this.hV = od.asn1.ASN1Util.bigIntToMinTwosComplementsHex(a)
				}, this.setByInteger = function(a) {
					var b = new f(String(a), 10);
					this.setByBigInteger(b)
				}, this.setValueHex = function(a) {
					this.hV = a
				}, this.getFreshValueHex = function() {
					return this.hV
				}, void 0 !== a && (void 0 !== a.int ? this.setByInteger(a.int) : "number" == typeof a ? this.setByInteger(a) : void 0 !== a.hex && this.setValueHex(a.hex))
			}, Sc.lang.extend(od.asn1.DEREnumerated, od.asn1.ASN1Object), od.asn1.DERUTF8String = function(a) {
				od.asn1.DERUTF8String.superclass.constructor.call(this, a), this.hT = "0c"
			}, Sc.lang.extend(od.asn1.DERUTF8String, od.asn1.DERAbstractString), od.asn1.DERNumericString = function(a) {
				od.asn1.DERNumericString.superclass.constructor.call(this, a), this.hT = "12"
			}, Sc.lang.extend(od.asn1.DERNumericString, od.asn1.DERAbstractString), od.asn1.DERPrintableString = function(a) {
				od.asn1.DERPrintableString.superclass.constructor.call(this, a), this.hT = "13"
			}, Sc.lang.extend(od.asn1.DERPrintableString, od.asn1.DERAbstractString), od.asn1.DERTeletexString = function(a) {
				od.asn1.DERTeletexString.superclass.constructor.call(this, a), this.hT = "14"
			}, Sc.lang.extend(od.asn1.DERTeletexString, od.asn1.DERAbstractString), od.asn1.DERIA5String = function(a) {
				od.asn1.DERIA5String.superclass.constructor.call(this, a), this.hT = "16"
			}, Sc.lang.extend(od.asn1.DERIA5String, od.asn1.DERAbstractString), od.asn1.DERUTCTime = function(a) {
				od.asn1.DERUTCTime.superclass.constructor.call(this, a), this.hT = "17", this.setByDate = function(a) {
					this.hTLV = null, this.isModified = !0, this.date = a, this.s = this.formatDate(this.date, "utc"), this.hV = gc(this.s)
				}, this.getFreshValueHex = function() {
					return void 0 === this.date && void 0 === this.s && (this.date = new Date, this.s = this.formatDate(this.date, "utc"), this.hV = gc(this.s)), this.hV
				}, void 0 !== a && (void 0 !== a.str ? this.setString(a.str) : "string" == typeof a && a.match(/^[0-9]{12}Z$/) ? this.setString(a) : void 0 !== a.hex ? this.setStringHex(a.hex) : void 0 !== a.date && this.setByDate(a.date))
			}, Sc.lang.extend(od.asn1.DERUTCTime, od.asn1.DERAbstractTime), od.asn1.DERGeneralizedTime = function(a) {
				od.asn1.DERGeneralizedTime.superclass.constructor.call(this, a), this.hT = "18", this.withMillis = !1, this.setByDate = function(a) {
					this.hTLV = null, this.isModified = !0, this.date = a, this.s = this.formatDate(this.date, "gen", this.withMillis), this.hV = gc(this.s)
				}, this.getFreshValueHex = function() {
					return void 0 === this.date && void 0 === this.s && (this.date = new Date, this.s = this.formatDate(this.date, "gen", this.withMillis), this.hV = gc(this.s)), this.hV
				}, void 0 !== a && (void 0 !== a.str ? this.setString(a.str) : "string" == typeof a && a.match(/^[0-9]{14}Z$/) ? this.setString(a) : void 0 !== a.hex ? this.setStringHex(a.hex) : void 0 !== a.date && this.setByDate(a.date), !0 === a.millis && (this.withMillis = !0))
			}, Sc.lang.extend(od.asn1.DERGeneralizedTime, od.asn1.DERAbstractTime), od.asn1.DERSequence = function(a) {
				od.asn1.DERSequence.superclass.constructor.call(this, a), this.hT = "30", this.getFreshValueHex = function() {
					for(var a = "", b = 0; b < this.asn1Array.length; b++) {
						a += this.asn1Array[b].getEncodedHex()
					}
					return this.hV = a, this.hV
				}
			}, Sc.lang.extend(od.asn1.DERSequence, od.asn1.DERAbstractStructured), od.asn1.DERSet = function(a) {
				od.asn1.DERSet.superclass.constructor.call(this, a), this.hT = "31", this.sortFlag = !0, this.getFreshValueHex = function() {
					for(var a = new Array, b = 0; b < this.asn1Array.length; b++) {
						var c = this.asn1Array[b];
						a.push(c.getEncodedHex())
					}
					return 1 == this.sortFlag && a.sort(), this.hV = a.join(""), this.hV
				}, void 0 !== a && void 0 !== a.sortflag && 0 == a.sortflag && (this.sortFlag = !1)
			}, Sc.lang.extend(od.asn1.DERSet, od.asn1.DERAbstractStructured), od.asn1.DERTaggedObject = function(a) {
				od.asn1.DERTaggedObject.superclass.constructor.call(this), this.hT = "a0", this.hV = "", this.isExplicit = !0, this.asn1Object = null, this.setASN1Object = function(a, b, c) {
					this.hT = b, this.isExplicit = a, this.asn1Object = c, this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(), this.hTLV = null, this.isModified = !0) : (this.hV = null, this.hTLV = c.getEncodedHex(), this.hTLV = this.hTLV.replace(/^../, b), this.isModified = !1)
				}, this.getFreshValueHex = function() {
					return this.hV
				}, void 0 !== a && (void 0 !== a.tag && (this.hT = a.tag), void 0 !== a.explicit && (this.isExplicit = a.explicit), void 0 !== a.obj && (this.asn1Object = a.obj, this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)))
			}, Sc.lang.extend(od.asn1.DERTaggedObject, od.asn1.ASN1Object);
			var nd = new function() {};
			nd.getLblen = function(a, b) {
				if("8" != a.substr(b + 2, 1)) return 1;
				var c = parseInt(a.substr(b + 3, 1));
				return 0 == c ? -1 : 0 < c && c < 10 ? c + 1 : -2
			}, nd.getL = function(a, b) {
				var c = nd.getLblen(a, b);
				return c < 1 ? "" : a.substr(b + 2, 2 * c)
			}, nd.getVblen = function(a, b) {
				var c, d;
				return "" == (c = nd.getL(a, b)) ? -1 : (d = "8" === c.substr(0, 1) ? new f(c.substr(2), 16) : new f(c, 16), d.intValue())
			}, nd.getVidx = function(a, b) {
				var c = nd.getLblen(a, b);
				return c < 0 ? c : b + 2 * (c + 1)
			}, nd.getV = function(a, b) {
				var c = nd.getVidx(a, b),
					d = nd.getVblen(a, b);
				return a.substr(c, 2 * d)
			}, nd.getTLV = function(a, b) {
				return a.substr(b, 2) + nd.getL(a, b) + nd.getV(a, b)
			}, nd.getNextSiblingIdx = function(a, b) {
				return nd.getVidx(a, b) + 2 * nd.getVblen(a, b)
			}, nd.getChildIdx = function(a, b) {
				var c = nd,
					d = new Array,
					e = c.getVidx(a, b);
				"03" == a.substr(b, 2) ? d.push(e + 2) : d.push(e);
				for(var f = c.getVblen(a, b), g = e, h = 0;;) {
					var i = c.getNextSiblingIdx(a, g);
					if(null == i || i - e >= 2 * f) break;
					if(h >= 200) break;
					d.push(i), g = i, h++
				}
				return d
			}, nd.getNthChildIdx = function(a, b, c) {
				return nd.getChildIdx(a, b)[c]
			}, nd.getIdxbyList = function(a, b, c, d) {
				var e, f, g = nd;
				if(0 == c.length) {
					if(void 0 !== d && a.substr(b, 2) !== d) throw "checking tag doesn't match: " + a.substr(b, 2) + "!=" + d;
					return b
				}
				return e = c.shift(), f = g.getChildIdx(a, b), g.getIdxbyList(a, f[e], c, d)
			}, nd.getTLVbyList = function(a, b, c, d) {
				var e = nd,
					f = e.getIdxbyList(a, b, c);
				if(void 0 === f) throw "can't find nthList object";
				if(void 0 !== d && a.substr(f, 2) != d) throw "checking tag doesn't match: " + a.substr(f, 2) + "!=" + d;
				return e.getTLV(a, f)
			}, nd.getVbyList = function(a, b, c, d, e) {
				var f, g, h = nd;
				if(void 0 === (f = h.getIdxbyList(a, b, c, d))) throw "can't find nthList object";
				return g = h.getV(a, f), !0 === e && (g = g.substr(2)), g
			}, nd.hextooidstr = function(a) {
				var b = function(a, b) {
						return a.length >= b ? a : new Array(b - a.length + 1).join("0") + a
					},
					c = [],
					d = a.substr(0, 2),
					e = parseInt(d, 16);
				c[0] = new String(Math.floor(e / 40)), c[1] = new String(e % 40);
				for(var f = a.substr(2), g = [], h = 0; h < f.length / 2; h++) g.push(parseInt(f.substr(2 * h, 2), 16));
				for(var i = [], j = "", h = 0; h < g.length; h++) 128 & g[h] ? j += b((127 & g[h]).toString(2), 7) : (j += b((127 & g[h]).toString(2), 7), i.push(new String(parseInt(j, 2))), j = "");
				var k = c.join(".");
				return i.length > 0 && (k = k + "." + i.join(".")), k
			}, nd.dump = function(a, b, c, d) {
				var e = nd,
					f = e.getV,
					g = e.dump,
					h = e.getChildIdx,
					i = a;
				a instanceof od.asn1.ASN1Object && (i = a.getEncodedHex());
				var j = function(a, b) {
					return a.length <= 2 * b ? a : a.substr(0, b) + "..(total " + a.length / 2 + "bytes).." + a.substr(a.length - b, b)
				};
				void 0 === b && (b = {
					ommit_long_octet: 32
				}), void 0 === c && (c = 0), void 0 === d && (d = "");
				var k = b.ommit_long_octet;
				if("01" == i.substr(c, 2)) {
					var l = f(i, c);
					return "00" == l ? d + "BOOLEAN FALSE\n" : d + "BOOLEAN TRUE\n"
				}
				if("02" == i.substr(c, 2)) {
					var l = f(i, c);
					return d + "INTEGER " + j(l, k) + "\n"
				}
				if("03" == i.substr(c, 2)) {
					var l = f(i, c);
					return d + "BITSTRING " + j(l, k) + "\n"
				}
				if("04" == i.substr(c, 2)) {
					var l = f(i, c);
					if(e.isASN1HEX(l)) {
						var m = d + "OCTETSTRING, encapsulates\n";
						return m += g(l, b, 0, d + "  ")
					}
					return d + "OCTETSTRING " + j(l, k) + "\n"
				}
				if("05" == i.substr(c, 2)) return d + "NULL\n";
				if("06" == i.substr(c, 2)) {
					var n = f(i, c),
						o = od.asn1.ASN1Util.oidHexToInt(n),
						p = od.asn1.x509.OID.oid2name(o),
						q = o.replace(/\./g, " ");
					return "" != p ? d + "ObjectIdentifier " + p + " (" + q + ")\n" : d + "ObjectIdentifier (" + q + ")\n"
				}
				if("0c" == i.substr(c, 2)) return d + "UTF8String '" + rc(f(i, c)) + "'\n";
				if("13" == i.substr(c, 2)) return d + "PrintableString '" + rc(f(i, c)) + "'\n";
				if("14" == i.substr(c, 2)) return d + "TeletexString '" + rc(f(i, c)) + "'\n";
				if("16" == i.substr(c, 2)) return d + "IA5String '" + rc(f(i, c)) + "'\n";
				if("17" == i.substr(c, 2)) return d + "UTCTime " + rc(f(i, c)) + "\n";
				if("18" == i.substr(c, 2)) return d + "GeneralizedTime " + rc(f(i, c)) + "\n";
				if("30" == i.substr(c, 2)) {
					if("3000" == i.substr(c, 4)) return d + "SEQUENCE {}\n";
					var m = d + "SEQUENCE\n",
						r = h(i, c),
						s = b;
					if((2 == r.length || 3 == r.length) && "06" == i.substr(r[0], 2) && "04" == i.substr(r[r.length - 1], 2)) {
						var p = e.oidname(f(i, r[0])),
							t = JSON.parse(JSON.stringify(b));
						t.x509ExtName = p, s = t
					}
					for(var u = 0; u < r.length; u++) m += g(i, s, r[u], d + "  ");
					return m
				}
				if("31" == i.substr(c, 2)) {
					for(var m = d + "SET\n", r = h(i, c), u = 0; u < r.length; u++) m += g(i, b, r[u], d + "  ");
					return m
				}
				var v = parseInt(i.substr(c, 2), 16);
				if(0 != (128 & v)) {
					var w = 31 & v;
					if(0 != (32 & v)) {
						for(var m = d + "[" + w + "]\n", r = h(i, c), u = 0; u < r.length; u++) m += g(i, b, r[u], d + "  ");
						return m
					}
					var l = f(i, c);
					"68747470" == l.substr(0, 8) && (l = rc(l)), "subjectAltName" === b.x509ExtName && 2 == w && (l = rc(l));
					var m = d + "[" + w + "] " + l + "\n";
					return m
				}
				return d + "UNKNOWN(" + i.substr(c, 2) + ") " + f(i, c) + "\n"
			}, nd.isASN1HEX = function(a) {
				var b = nd;
				if(a.length % 2 == 1) return !1;
				var c = b.getVblen(a, 0),
					d = a.substr(0, 2),
					e = b.getL(a, 0);
				return a.length - d.length - e.length == 2 * c
			}, nd.oidname = function(a) {
				var b = od.asn1;
				od.lang.String.isHex(a) && (a = b.ASN1Util.oidHexToInt(a));
				var c = b.x509.OID.oid2name(a);
				return "" === c && (c = a), c
			}, void 0 !== od && od || (od = {}), void 0 !== od.asn1 && od.asn1 || (od.asn1 = {}), void 0 !== od.asn1.x509 && od.asn1.x509 || (od.asn1.x509 = {}), od.asn1.x509.Certificate = function(a) {
				od.asn1.x509.Certificate.superclass.constructor.call(this);
				var b = od,
					c = (b.crypto, b.asn1),
					d = c.DERSequence,
					e = c.DERBitString;
				this.sign = function() {
					this.asn1SignatureAlg = this.asn1TBSCert.asn1SignatureAlg;
					var a = new od.crypto.Signature({
						alg: this.asn1SignatureAlg.nameAlg
					});
					a.init(this.prvKey), a.updateHex(this.asn1TBSCert.getEncodedHex()), this.hexSig = a.sign(), this.asn1Sig = new e({
						hex: "00" + this.hexSig
					});
					var b = new d({
						array: [this.asn1TBSCert, this.asn1SignatureAlg, this.asn1Sig]
					});
					this.hTLV = b.getEncodedHex(), this.isModified = !1
				}, this.setSignatureHex = function(a) {
					this.asn1SignatureAlg = this.asn1TBSCert.asn1SignatureAlg, this.hexSig = a, this.asn1Sig = new e({
						hex: "00" + this.hexSig
					});
					var b = new d({
						array: [this.asn1TBSCert, this.asn1SignatureAlg, this.asn1Sig]
					});
					this.hTLV = b.getEncodedHex(), this.isModified = !1
				}, this.getEncodedHex = function() {
					if(0 == this.isModified && null != this.hTLV) return this.hTLV;
					throw "not signed yet"
				}, this.getPEMString = function() {
					return "-----BEGIN CERTIFICATE-----\r\n" + vc(this.getEncodedHex()) + "\r\n-----END CERTIFICATE-----\r\n"
				}, void 0 !== a && (void 0 !== a.tbscertobj && (this.asn1TBSCert = a.tbscertobj), void 0 !== a.prvkeyobj && (this.prvKey = a.prvkeyobj))
			}, Sc.lang.extend(od.asn1.x509.Certificate, od.asn1.ASN1Object), od.asn1.x509.TBSCertificate = function(a) {
				od.asn1.x509.TBSCertificate.superclass.constructor.call(this);
				var b = od,
					c = b.asn1,
					d = c.DERSequence,
					e = c.DERInteger,
					f = c.DERTaggedObject,
					g = c.x509,
					h = g.Time,
					i = g.X500Name,
					j = g.SubjectPublicKeyInfo;
				this._initialize = function() {
					this.asn1Array = new Array, this.asn1Version = new f({
						obj: new e({
							int: 2
						})
					}), this.asn1SerialNumber = null, this.asn1SignatureAlg = null, this.asn1Issuer = null, this.asn1NotBefore = null, this.asn1NotAfter = null, this.asn1Subject = null, this.asn1SubjPKey = null, this.extensionsArray = new Array
				}, this.setSerialNumberByParam = function(a) {
					this.asn1SerialNumber = new e(a)
				}, this.setSignatureAlgByParam = function(a) {
					this.asn1SignatureAlg = new g.AlgorithmIdentifier(a)
				}, this.setIssuerByParam = function(a) {
					this.asn1Issuer = new i(a)
				}, this.setNotBeforeByParam = function(a) {
					this.asn1NotBefore = new h(a)
				}, this.setNotAfterByParam = function(a) {
					this.asn1NotAfter = new h(a)
				}, this.setSubjectByParam = function(a) {
					this.asn1Subject = new i(a)
				}, this.setSubjectPublicKey = function(a) {
					this.asn1SubjPKey = new j(a)
				}, this.setSubjectPublicKeyByGetKey = function(a) {
					var b = sd.getKey(a);
					this.asn1SubjPKey = new j(b)
				}, this.appendExtension = function(a) {
					this.extensionsArray.push(a)
				}, this.appendExtensionByName = function(a, b) {
					od.asn1.x509.Extension.appendByNameToArray(a, b, this.extensionsArray)
				}, this.getEncodedHex = function() {
					if(null == this.asn1NotBefore || null == this.asn1NotAfter) throw "notBefore and/or notAfter not set";
					var a = new d({
						array: [this.asn1NotBefore, this.asn1NotAfter]
					});
					if(this.asn1Array = new Array, this.asn1Array.push(this.asn1Version), this.asn1Array.push(this.asn1SerialNumber), this.asn1Array.push(this.asn1SignatureAlg), this.asn1Array.push(this.asn1Issuer), this.asn1Array.push(a), this.asn1Array.push(this.asn1Subject), this.asn1Array.push(this.asn1SubjPKey), this.extensionsArray.length > 0) {
						var b = new d({
								array: this.extensionsArray
							}),
							c = new f({
								explicit: !0,
								tag: "a3",
								obj: b
							});
						this.asn1Array.push(c)
					}
					var e = new d({
						array: this.asn1Array
					});
					return this.hTLV = e.getEncodedHex(), this.isModified = !1, this.hTLV
				}, this._initialize()
			}, Sc.lang.extend(od.asn1.x509.TBSCertificate, od.asn1.ASN1Object), od.asn1.x509.Extension = function(a) {
				od.asn1.x509.Extension.superclass.constructor.call(this);
				var b = od,
					c = b.asn1,
					d = c.DERObjectIdentifier,
					e = c.DEROctetString,
					f = (c.DERBitString, c.DERBoolean),
					g = c.DERSequence;
				this.getEncodedHex = function() {
					var a = new d({
							oid: this.oid
						}),
						b = new e({
							hex: this.getExtnValueHex()
						}),
						c = new Array;
					return c.push(a), this.critical && c.push(new f), c.push(b), new g({
						array: c
					}).getEncodedHex()
				}, this.critical = !1, void 0 !== a && void 0 !== a.critical && (this.critical = a.critical)
			}, Sc.lang.extend(od.asn1.x509.Extension, od.asn1.ASN1Object), od.asn1.x509.Extension.appendByNameToArray = function(a, b, c) {
				var d = a.toLowerCase(),
					e = od.asn1.x509;
				if("basicconstraints" == d) {
					var f = new e.BasicConstraints(b);
					c.push(f)
				} else if("keyusage" == d) {
					var f = new e.KeyUsage(b);
					c.push(f)
				} else if("crldistributionpoints" == d) {
					var f = new e.CRLDistributionPoints(b);
					c.push(f)
				} else if("extkeyusage" == d) {
					var f = new e.ExtKeyUsage(b);
					c.push(f)
				} else if("authoritykeyidentifier" == d) {
					var f = new e.AuthorityKeyIdentifier(b);
					c.push(f)
				} else if("authorityinfoaccess" == d) {
					var f = new e.AuthorityInfoAccess(b);
					c.push(f)
				} else if("subjectaltname" == d) {
					var f = new e.SubjectAltName(b);
					c.push(f)
				} else {
					if("issueraltname" != d) throw "unsupported extension name: " + a;
					var f = new e.IssuerAltName(b);
					c.push(f)
				}
			}, od.asn1.x509.KeyUsage = function(a) {
				od.asn1.x509.KeyUsage.superclass.constructor.call(this, a), this.getExtnValueHex = function() {
					return this.asn1ExtnValue.getEncodedHex()
				}, this.oid = "2.5.29.15", void 0 !== a && void 0 !== a.bin && (this.asn1ExtnValue = new od.asn1.DERBitString(a))
			}, Sc.lang.extend(od.asn1.x509.KeyUsage, od.asn1.x509.Extension), od.asn1.x509.BasicConstraints = function(a) {
				od.asn1.x509.BasicConstraints.superclass.constructor.call(this, a);
				this.getExtnValueHex = function() {
					var a = new Array;
					this.cA && a.push(new od.asn1.DERBoolean), this.pathLen > -1 && a.push(new od.asn1.DERInteger({
						int: this.pathLen
					}));
					var b = new od.asn1.DERSequence({
						array: a
					});
					return this.asn1ExtnValue = b, this.asn1ExtnValue.getEncodedHex()
				}, this.oid = "2.5.29.19", this.cA = !1, this.pathLen = -1, void 0 !== a && (void 0 !== a.cA && (this.cA = a.cA), void 0 !== a.pathLen && (this.pathLen = a.pathLen))
			}, Sc.lang.extend(od.asn1.x509.BasicConstraints, od.asn1.x509.Extension), od.asn1.x509.CRLDistributionPoints = function(a) {
				od.asn1.x509.CRLDistributionPoints.superclass.constructor.call(this, a);
				var b = od,
					c = b.asn1,
					d = c.x509;
				this.getExtnValueHex = function() {
					return this.asn1ExtnValue.getEncodedHex()
				}, this.setByDPArray = function(a) {
					this.asn1ExtnValue = new c.DERSequence({
						array: a
					})
				}, this.setByOneURI = function(a) {
					var b = new d.GeneralNames([{
							uri: a
						}]),
						c = new d.DistributionPointName(b),
						e = new d.DistributionPoint({
							dpobj: c
						});
					this.setByDPArray([e])
				}, this.oid = "2.5.29.31", void 0 !== a && (void 0 !== a.array ? this.setByDPArray(a.array) : void 0 !== a.uri && this.setByOneURI(a.uri))
			}, Sc.lang.extend(od.asn1.x509.CRLDistributionPoints, od.asn1.x509.Extension), od.asn1.x509.ExtKeyUsage = function(a) {
				od.asn1.x509.ExtKeyUsage.superclass.constructor.call(this, a);
				var b = od,
					c = b.asn1;
				this.setPurposeArray = function(a) {
					this.asn1ExtnValue = new c.DERSequence;
					for(var b = 0; b < a.length; b++) {
						var d = new c.DERObjectIdentifier(a[b]);
						this.asn1ExtnValue.appendASN1Object(d)
					}
				}, this.getExtnValueHex = function() {
					return this.asn1ExtnValue.getEncodedHex()
				}, this.oid = "2.5.29.37", void 0 !== a && void 0 !== a.array && this.setPurposeArray(a.array)
			}, Sc.lang.extend(od.asn1.x509.ExtKeyUsage, od.asn1.x509.Extension), od.asn1.x509.AuthorityKeyIdentifier = function(a) {
				od.asn1.x509.AuthorityKeyIdentifier.superclass.constructor.call(this, a);
				var b = od,
					c = b.asn1,
					d = c.DERTaggedObject;
				this.asn1KID = null, this.asn1CertIssuer = null, this.asn1CertSN = null, this.getExtnValueHex = function() {
					var a = new Array;
					this.asn1KID && a.push(new d({
						explicit: !1,
						tag: "80",
						obj: this.asn1KID
					})), this.asn1CertIssuer && a.push(new d({
						explicit: !1,
						tag: "a1",
						obj: this.asn1CertIssuer
					})), this.asn1CertSN && a.push(new d({
						explicit: !1,
						tag: "82",
						obj: this.asn1CertSN
					}));
					var b = new c.DERSequence({
						array: a
					});
					return this.asn1ExtnValue = b, this.asn1ExtnValue.getEncodedHex()
				}, this.setKIDByParam = function(a) {
					this.asn1KID = new od.asn1.DEROctetString(a)
				}, this.setCertIssuerByParam = function(a) {
					this.asn1CertIssuer = new od.asn1.x509.X500Name(a)
				}, this.setCertSNByParam = function(a) {
					this.asn1CertSN = new od.asn1.DERInteger(a)
				}, this.oid = "2.5.29.35", void 0 !== a && (void 0 !== a.kid && this.setKIDByParam(a.kid), void 0 !== a.issuer && this.setCertIssuerByParam(a.issuer), void 0 !== a.sn && this.setCertSNByParam(a.sn))
			}, Sc.lang.extend(od.asn1.x509.AuthorityKeyIdentifier, od.asn1.x509.Extension), od.asn1.x509.AuthorityInfoAccess = function(a) {
				od.asn1.x509.AuthorityInfoAccess.superclass.constructor.call(this, a), this.setAccessDescriptionArray = function(a) {
					for(var b = new Array, c = od, d = c.asn1, e = d.DERSequence, f = 0; f < a.length; f++) {
						var g = new d.DERObjectIdentifier(a[f].accessMethod),
							h = new d.x509.GeneralName(a[f].accessLocation),
							i = new e({
								array: [g, h]
							});
						b.push(i)
					}
					this.asn1ExtnValue = new e({
						array: b
					})
				}, this.getExtnValueHex = function() {
					return this.asn1ExtnValue.getEncodedHex()
				}, this.oid = "1.3.6.1.5.5.7.1.1", void 0 !== a && void 0 !== a.array && this.setAccessDescriptionArray(a.array)
			}, Sc.lang.extend(od.asn1.x509.AuthorityInfoAccess, od.asn1.x509.Extension), od.asn1.x509.SubjectAltName = function(a) {
				od.asn1.x509.SubjectAltName.superclass.constructor.call(this, a), this.setNameArray = function(a) {
					this.asn1ExtnValue = new od.asn1.x509.GeneralNames(a)
				}, this.getExtnValueHex = function() {
					return this.asn1ExtnValue.getEncodedHex()
				}, this.oid = "2.5.29.17", void 0 !== a && void 0 !== a.array && this.setNameArray(a.array)
			}, Sc.lang.extend(od.asn1.x509.SubjectAltName, od.asn1.x509.Extension), od.asn1.x509.IssuerAltName = function(a) {
				od.asn1.x509.IssuerAltName.superclass.constructor.call(this, a), this.setNameArray = function(a) {
					this.asn1ExtnValue = new od.asn1.x509.GeneralNames(a)
				}, this.getExtnValueHex = function() {
					return this.asn1ExtnValue.getEncodedHex()
				}, this.oid = "2.5.29.18", void 0 !== a && void 0 !== a.array && this.setNameArray(a.array)
			}, Sc.lang.extend(od.asn1.x509.IssuerAltName, od.asn1.x509.Extension), od.asn1.x509.CRL = function(a) {
				od.asn1.x509.CRL.superclass.constructor.call(this);
				this.sign = function() {
					this.asn1SignatureAlg = this.asn1TBSCertList.asn1SignatureAlg, sig = new od.crypto.Signature({
						alg: "SHA1withRSA",
						prov: "cryptojs/jsrsa"
					}), sig.initSign(this.prvKey), sig.updateHex(this.asn1TBSCertList.getEncodedHex()), this.hexSig = sig.sign(), this.asn1Sig = new od.asn1.DERBitString({
						hex: "00" + this.hexSig
					});
					var a = new od.asn1.DERSequence({
						array: [this.asn1TBSCertList, this.asn1SignatureAlg, this.asn1Sig]
					});
					this.hTLV = a.getEncodedHex(), this.isModified = !1
				}, this.getEncodedHex = function() {
					if(0 == this.isModified && null != this.hTLV) return this.hTLV;
					throw "not signed yet"
				}, this.getPEMString = function() {
					return "-----BEGIN X509 CRL-----\r\n" + vc(this.getEncodedHex()) + "\r\n-----END X509 CRL-----\r\n"
				}, void 0 !== a && (void 0 !== a.tbsobj && (this.asn1TBSCertList = a.tbsobj), void 0 !== a.prvkeyobj && (this.prvKey = a.prvkeyobj))
			}, Sc.lang.extend(od.asn1.x509.CRL, od.asn1.ASN1Object), od.asn1.x509.TBSCertList = function(a) {
				od.asn1.x509.TBSCertList.superclass.constructor.call(this);
				var b = od,
					c = b.asn1,
					d = c.DERSequence,
					e = c.x509,
					f = e.Time;
				this.setSignatureAlgByParam = function(a) {
					this.asn1SignatureAlg = new e.AlgorithmIdentifier(a)
				}, this.setIssuerByParam = function(a) {
					this.asn1Issuer = new e.X500Name(a)
				}, this.setThisUpdateByParam = function(a) {
					this.asn1ThisUpdate = new f(a)
				}, this.setNextUpdateByParam = function(a) {
					this.asn1NextUpdate = new f(a)
				}, this.addRevokedCert = function(a, b) {
					var c = {};
					void 0 != a && null != a && (c.sn = a), void 0 != b && null != b && (c.time = b);
					var d = new e.CRLEntry(c);
					this.aRevokedCert.push(d)
				}, this.getEncodedHex = function() {
					if(this.asn1Array = new Array, null != this.asn1Version && this.asn1Array.push(this.asn1Version), this.asn1Array.push(this.asn1SignatureAlg), this.asn1Array.push(this.asn1Issuer), this.asn1Array.push(this.asn1ThisUpdate), null != this.asn1NextUpdate && this.asn1Array.push(this.asn1NextUpdate), this.aRevokedCert.length > 0) {
						var a = new d({
							array: this.aRevokedCert
						});
						this.asn1Array.push(a)
					}
					var b = new d({
						array: this.asn1Array
					});
					return this.hTLV = b.getEncodedHex(), this.isModified = !1, this.hTLV
				}, this._initialize = function() {
					this.asn1Version = null, this.asn1SignatureAlg = null, this.asn1Issuer = null, this.asn1ThisUpdate = null, this.asn1NextUpdate = null, this.aRevokedCert = new Array
				}, this._initialize()
			}, Sc.lang.extend(od.asn1.x509.TBSCertList, od.asn1.ASN1Object), od.asn1.x509.CRLEntry = function(a) {
				od.asn1.x509.CRLEntry.superclass.constructor.call(this);
				var b = od,
					c = b.asn1;
				this.setCertSerial = function(a) {
					this.sn = new c.DERInteger(a)
				}, this.setRevocationDate = function(a) {
					this.time = new c.x509.Time(a)
				}, this.getEncodedHex = function() {
					var a = new c.DERSequence({
						array: [this.sn, this.time]
					});
					return this.TLV = a.getEncodedHex(), this.TLV
				}, void 0 !== a && (void 0 !== a.time && this.setRevocationDate(a.time), void 0 !== a.sn && this.setCertSerial(a.sn))
			}, Sc.lang.extend(od.asn1.x509.CRLEntry, od.asn1.ASN1Object), od.asn1.x509.X500Name = function(a) {
				od.asn1.x509.X500Name.superclass.constructor.call(this), this.asn1Array = new Array;
				var b = od,
					c = b.asn1,
					d = c.x509,
					e = yc;
				if(this.setByString = function(a) {
						var b = a.split("/");
						b.shift();
						for(var c = 0; c < b.length; c++) this.asn1Array.push(new d.RDN({
							str: b[c]
						}))
					}, this.setByLdapString = function(a) {
						var b = d.X500Name.ldapToOneline(a);
						this.setByString(b)
					}, this.setByObject = function(a) {
						for(var b in a)
							if(a.hasOwnProperty(b)) {
								var c = new od.asn1.x509.RDN({
									str: b + "=" + a[b]
								});
								this.asn1Array ? this.asn1Array.push(c) : this.asn1Array = [c]
							}
					}, this.getEncodedHex = function() {
						if("string" == typeof this.hTLV) return this.hTLV;
						var a = new c.DERSequence({
							array: this.asn1Array
						});
						return this.hTLV = a.getEncodedHex(), this.hTLV
					}, void 0 !== a) {
					if(void 0 !== a.str ? this.setByString(a.str) : void 0 !== a.ldapstr ? this.setByLdapString(a.ldapstr) : "object" == typeof a && this.setByObject(a), void 0 !== a.certissuer) {
						var f = new Pc;
						f.hex = e(a.certissuer), this.hTLV = f.getIssuerHex()
					}
					if(void 0 !== a.certsubject) {
						var f = new Pc;
						f.hex = e(a.certsubject), this.hTLV = f.getSubjectHex()
					}
				}
			}, Sc.lang.extend(od.asn1.x509.X500Name, od.asn1.ASN1Object), od.asn1.x509.X500Name.onelineToLDAP = function(a) {
				if("/" !== a.substr(0, 1)) throw "malformed input";
				a = a.substr(1);
				var b = a.split("/");
				return b.reverse(), b = b.map(function(a) {
					return a.replace(/,/, "\\,")
				}), b.join(",")
			}, od.asn1.x509.X500Name.ldapToOneline = function(a) {
				for(var b = a.split(","), c = !1, d = [], e = 0; b.length > 0; e++) {
					var f = b.shift();
					if(!0 === c) {
						var g = d.pop(),
							h = (g + "," + f).replace(/\\,/g, ",");
						d.push(h), c = !1
					} else d.push(f);
					"\\" === f.substr(-1, 1) && (c = !0)
				}
				return d = d.map(function(a) {
					return a.replace("/", "\\/")
				}), d.reverse(), "/" + d.join("/")
			}, od.asn1.x509.RDN = function(a) {
				od.asn1.x509.RDN.superclass.constructor.call(this), this.asn1Array = new Array, this.addByString = function(a) {
					this.asn1Array.push(new od.asn1.x509.AttributeTypeAndValue({
						str: a
					}))
				}, this.addByMultiValuedString = function(a) {
					for(var b = od.asn1.x509.RDN.parseString(a), c = 0; c < b.length; c++) this.addByString(b[c])
				}, this.getEncodedHex = function() {
					var a = new od.asn1.DERSet({
						array: this.asn1Array
					});
					return this.TLV = a.getEncodedHex(), this.TLV
				}, void 0 !== a && void 0 !== a.str && this.addByMultiValuedString(a.str)
			}, Sc.lang.extend(od.asn1.x509.RDN, od.asn1.ASN1Object), od.asn1.x509.RDN.parseString = function(a) {
				for(var b = a.split(/\+/), c = !1, d = [], e = 0; b.length > 0; e++) {
					var f = b.shift();
					if(!0 === c) {
						var g = d.pop(),
							h = (g + "+" + f).replace(/\\\+/g, "+");
						d.push(h), c = !1
					} else d.push(f);
					"\\" === f.substr(-1, 1) && (c = !0)
				}
				for(var i = !1, j = [], e = 0; d.length > 0; e++) {
					var f = d.shift();
					if(!0 === i) {
						var k = j.pop();
						if(f.match(/"$/)) {
							var h = (k + "+" + f).replace(/^([^=]+)="(.*)"$/, "$1=$2");
							j.push(h), i = !1
						} else j.push(k + "+" + f)
					} else j.push(f);
					f.match(/^[^=]+="/) && (i = !0)
				}
				return j
			}, od.asn1.x509.AttributeTypeAndValue = function(a) {
				od.asn1.x509.AttributeTypeAndValue.superclass.constructor.call(this);
				var b = od,
					c = b.asn1;
				this.setByString = function(a) {
					var b = a.match(/^([^=]+)=(.+)$/);
					if(!b) throw "malformed attrTypeAndValueStr: " + a;
					this.setByAttrTypeAndValueStr(b[1], b[2])
				}, this.setByAttrTypeAndValueStr = function(a, b) {
					this.typeObj = od.asn1.x509.OID.atype2obj(a);
					var c = "utf8";
					"C" == a && (c = "prn"), this.valueObj = this.getValueObj(c, b)
				}, this.getValueObj = function(a, b) {
					if("utf8" == a) return new c.DERUTF8String({
						str: b
					});
					if("prn" == a) return new c.DERPrintableString({
						str: b
					});
					if("tel" == a) return new c.DERTeletexString({
						str: b
					});
					if("ia5" == a) return new c.DERIA5String({
						str: b
					});
					throw "unsupported directory string type: type=" + a + " value=" + b
				}, this.getEncodedHex = function() {
					var a = new c.DERSequence({
						array: [this.typeObj, this.valueObj]
					});
					return this.TLV = a.getEncodedHex(), this.TLV
				}, void 0 !== a && void 0 !== a.str && this.setByString(a.str)
			}, Sc.lang.extend(od.asn1.x509.AttributeTypeAndValue, od.asn1.ASN1Object), od.asn1.x509.SubjectPublicKeyInfo = function(a) {
				od.asn1.x509.SubjectPublicKeyInfo.superclass.constructor.call(this);
				var b = od,
					c = b.asn1,
					d = c.DERInteger,
					e = c.DERBitString,
					f = c.DERObjectIdentifier,
					g = c.DERSequence,
					h = c.ASN1Util.newObject,
					i = c.x509,
					j = i.AlgorithmIdentifier,
					k = b.crypto;
				k.ECDSA, k.DSA;
				this.getASN1Object = function() {
					if(null == this.asn1AlgId || null == this.asn1SubjPKey) throw "algId and/or subjPubKey not set";
					return new g({
						array: [this.asn1AlgId, this.asn1SubjPKey]
					})
				}, this.getEncodedHex = function() {
					var a = this.getASN1Object();
					return this.hTLV = a.getEncodedHex(), this.hTLV
				}, this.setPubKey = function(a) {
					try {
						if(a instanceof qb) {
							var b = h({
									seq: [{
										int: {
											bigint: a.n
										}
									}, {
										int: {
											int: a.e
										}
									}]
								}),
								c = b.getEncodedHex();
							this.asn1AlgId = new j({
								name: "rsaEncryption"
							}), this.asn1SubjPKey = new e({
								hex: "00" + c
							})
						}
					} catch(a) {}
					try {
						if(a instanceof od.crypto.ECDSA) {
							var g = new f({
								name: a.curveName
							});
							this.asn1AlgId = new j({
								name: "ecPublicKey",
								asn1params: g
							}), this.asn1SubjPKey = new e({
								hex: "00" + a.pubKeyHex
							})
						}
					} catch(a) {}
					try {
						if(a instanceof od.crypto.DSA) {
							var g = new h({
								seq: [{
									int: {
										bigint: a.p
									}
								}, {
									int: {
										bigint: a.q
									}
								}, {
									int: {
										bigint: a.g
									}
								}]
							});
							this.asn1AlgId = new j({
								name: "dsa",
								asn1params: g
							});
							var i = new d({
								bigint: a.y
							});
							this.asn1SubjPKey = new e({
								hex: "00" + i.getEncodedHex()
							})
						}
					} catch(a) {}
				}, void 0 !== a && this.setPubKey(a)
			}, Sc.lang.extend(od.asn1.x509.SubjectPublicKeyInfo, od.asn1.ASN1Object), od.asn1.x509.Time = function(a) {
				od.asn1.x509.Time.superclass.constructor.call(this);
				var b = od,
					c = b.asn1,
					d = c.DERUTCTime,
					e = c.DERGeneralizedTime;
				this.setTimeParams = function(a) {
					this.timeParams = a
				}, this.getEncodedHex = function() {
					var a = null;
					return a = null != this.timeParams ? "utc" == this.type ? new d(this.timeParams) : new e(this.timeParams) : "utc" == this.type ? new d : new e, this.TLV = a.getEncodedHex(), this.TLV
				}, this.type = "utc", void 0 !== a && (void 0 !== a.type ? this.type = a.type : void 0 !== a.str && (a.str.match(/^[0-9]{12}Z$/) && (this.type = "utc"), a.str.match(/^[0-9]{14}Z$/) && (this.type = "gen")), this.timeParams = a)
			}, Sc.lang.extend(od.asn1.x509.Time, od.asn1.ASN1Object), od.asn1.x509.AlgorithmIdentifier = function(a) {
				od.asn1.x509.AlgorithmIdentifier.superclass.constructor.call(this), this.nameAlg = null, this.asn1Alg = null, this.asn1Params = null, this.paramEmpty = !1;
				var b = od,
					c = b.asn1;
				if(this.getEncodedHex = function() {
						if(null === this.nameAlg && null === this.asn1Alg) throw "algorithm not specified";
						null !== this.nameAlg && null === this.asn1Alg && (this.asn1Alg = c.x509.OID.name2obj(this.nameAlg));
						var a = [this.asn1Alg];
						null !== this.asn1Params && a.push(this.asn1Params);
						var b = new c.DERSequence({
							array: a
						});
						return this.hTLV = b.getEncodedHex(), this.hTLV
					}, void 0 !== a && (void 0 !== a.name && (this.nameAlg = a.name), void 0 !== a.asn1params && (this.asn1Params = a.asn1params), void 0 !== a.paramempty && (this.paramEmpty = a.paramempty)), null === this.asn1Params && !1 === this.paramEmpty && null !== this.nameAlg) {
					var d = this.nameAlg.toLowerCase();
					"withdsa" !== d.substr(-7, 7) && "withecdsa" !== d.substr(-9, 9) && (this.asn1Params = new c.DERNull)
				}
			}, Sc.lang.extend(od.asn1.x509.AlgorithmIdentifier, od.asn1.ASN1Object), od.asn1.x509.GeneralName = function(a) {
				od.asn1.x509.GeneralName.superclass.constructor.call(this);
				var b = {
						rfc822: "81",
						dns: "82",
						dn: "a4",
						uri: "86"
					},
					c = od,
					d = c.asn1,
					e = d.DERIA5String,
					f = d.DERTaggedObject,
					g = d.ASN1Object,
					h = d.x509.X500Name,
					i = yc;
				this.explicit = !1, this.setByParam = function(a) {
					var c = null;
					if(void 0 !== a) {
						if(void 0 !== a.rfc822 && (this.type = "rfc822", c = new e({
								str: a[this.type]
							})), void 0 !== a.dns && (this.type = "dns", c = new e({
								str: a[this.type]
							})), void 0 !== a.uri && (this.type = "uri", c = new e({
								str: a[this.type]
							})), void 0 !== a.dn && (this.type = "dn", c = new h({
								str: a.dn
							})), void 0 !== a.ldapdn && (this.type = "dn", c = new h({
								ldapstr: a.ldapdn
							})), void 0 !== a.certissuer) {
							this.type = "dn", this.explicit = !0;
							var d = a.certissuer,
								j = null;
							if(d.match(/^[0-9A-Fa-f]+$/), -1 != d.indexOf("-----BEGIN ") && (j = i(d)), null == j) throw "certissuer param not cert";
							var k = new Pc;
							k.hex = j;
							var l = k.getIssuerHex();
							c = new g, c.hTLV = l
						}
						if(void 0 !== a.certsubj) {
							this.type = "dn", this.explicit = !0;
							var d = a.certsubj,
								j = null;
							if(d.match(/^[0-9A-Fa-f]+$/), -1 != d.indexOf("-----BEGIN ") && (j = i(d)), null == j) throw "certsubj param not cert";
							var k = new Pc;
							k.hex = j;
							var l = k.getSubjectHex();
							c = new g, c.hTLV = l
						}
						if(null == this.type) throw "unsupported type in params=" + a;
						this.asn1Obj = new f({
							explicit: this.explicit,
							tag: b[this.type],
							obj: c
						})
					}
				}, this.getEncodedHex = function() {
					return this.asn1Obj.getEncodedHex()
				}, void 0 !== a && this.setByParam(a)
			}, Sc.lang.extend(od.asn1.x509.GeneralName, od.asn1.ASN1Object), od.asn1.x509.GeneralNames = function(a) {
				od.asn1.x509.GeneralNames.superclass.constructor.call(this);
				var b = od,
					c = b.asn1;
				this.setByParamArray = function(a) {
					for(var b = 0; b < a.length; b++) {
						var d = new c.x509.GeneralName(a[b]);
						this.asn1Array.push(d)
					}
				}, this.getEncodedHex = function() {
					return new c.DERSequence({
						array: this.asn1Array
					}).getEncodedHex()
				}, this.asn1Array = new Array, void 0 !== a && this.setByParamArray(a)
			}, Sc.lang.extend(od.asn1.x509.GeneralNames, od.asn1.ASN1Object), od.asn1.x509.DistributionPointName = function(a) {
				od.asn1.x509.DistributionPointName.superclass.constructor.call(this);
				var b = od,
					c = b.asn1,
					d = c.DERTaggedObject;
				if(this.getEncodedHex = function() {
						if("full" != this.type) throw "currently type shall be 'full': " + this.type;
						return this.asn1Obj = new d({
							explicit: !1,
							tag: this.tag,
							obj: this.asn1V
						}), this.hTLV = this.asn1Obj.getEncodedHex(), this.hTLV
					}, void 0 !== a) {
					if(!c.x509.GeneralNames.prototype.isPrototypeOf(a)) throw "This class supports GeneralNames only as argument";
					this.type = "full", this.tag = "a0", this.asn1V = a
				}
			}, Sc.lang.extend(od.asn1.x509.DistributionPointName, od.asn1.ASN1Object), od.asn1.x509.DistributionPoint = function(a) {
				od.asn1.x509.DistributionPoint.superclass.constructor.call(this);
				var b = od,
					c = b.asn1;
				this.getEncodedHex = function() {
					var a = new c.DERSequence;
					if(null != this.asn1DP) {
						var b = new c.DERTaggedObject({
							explicit: !0,
							tag: "a0",
							obj: this.asn1DP
						});
						a.appendASN1Object(b)
					}
					return this.hTLV = a.getEncodedHex(), this.hTLV
				}, void 0 !== a && void 0 !== a.dpobj && (this.asn1DP = a.dpobj)
			}, Sc.lang.extend(od.asn1.x509.DistributionPoint, od.asn1.ASN1Object), od.asn1.x509.OID = new function(a) {
				this.atype2oidList = {
					CN: "2.5.4.3",
					L: "2.5.4.7",
					ST: "2.5.4.8",
					O: "2.5.4.10",
					OU: "2.5.4.11",
					C: "2.5.4.6",
					STREET: "2.5.4.9",
					DC: "0.9.2342.19200300.100.1.25",
					UID: "0.9.2342.19200300.100.1.1",
					SN: "2.5.4.4",
					DN: "2.5.4.49",
					E: "1.2.840.113549.1.9.1",
					businessCategory: "2.5.4.15",
					postalCode: "2.5.4.17",
					serialNumber: "2.5.4.5",
					jurisdictionOfIncorporationL: "1.3.6.1.4.1.311.60.2.1.1",
					jurisdictionOfIncorporationSP: "1.3.6.1.4.1.311.60.2.1.2",
					jurisdictionOfIncorporationC: "1.3.6.1.4.1.311.60.2.1.3"
				}, this.name2oidList = {
					sha1: "1.3.14.3.2.26",
					sha256: "2.16.840.1.101.3.4.2.1",
					sha384: "2.16.840.1.101.3.4.2.2",
					sha512: "2.16.840.1.101.3.4.2.3",
					sha224: "2.16.840.1.101.3.4.2.4",
					md5: "1.2.840.113549.2.5",
					md2: "1.3.14.7.2.2.1",
					ripemd160: "1.3.36.3.2.1",
					MD2withRSA: "1.2.840.113549.1.1.2",
					MD4withRSA: "1.2.840.113549.1.1.3",
					MD5withRSA: "1.2.840.113549.1.1.4",
					SHA1withRSA: "1.2.840.113549.1.1.5",
					SHA224withRSA: "1.2.840.113549.1.1.14",
					SHA256withRSA: "1.2.840.113549.1.1.11",
					SHA384withRSA: "1.2.840.113549.1.1.12",
					SHA512withRSA: "1.2.840.113549.1.1.13",
					SHA1withECDSA: "1.2.840.10045.4.1",
					SHA224withECDSA: "1.2.840.10045.4.3.1",
					SHA256withECDSA: "1.2.840.10045.4.3.2",
					SHA384withECDSA: "1.2.840.10045.4.3.3",
					SHA512withECDSA: "1.2.840.10045.4.3.4",
					dsa: "1.2.840.10040.4.1",
					SHA1withDSA: "1.2.840.10040.4.3",
					SHA224withDSA: "2.16.840.1.101.3.4.3.1",
					SHA256withDSA: "2.16.840.1.101.3.4.3.2",
					rsaEncryption: "1.2.840.113549.1.1.1",
					commonName: "2.5.4.3",
					localityName: "2.5.4.7",
					stateOrProvinceName: "2.5.4.8",
					organizationName: "2.5.4.10",
					organizationalUnitName: "2.5.4.11",
					countryName: "2.5.4.6",
					streetAddress: "2.5.4.9",
					domainComponent: "0.9.2342.19200300.100.1.25",
					userId: "0.9.2342.19200300.100.1.1",
					surname: "2.5.4.4",
					distinguishedName: "2.5.4.49",
					emailAddress: "1.2.840.113549.1.9.1",
					businessCategory: "2.5.4.15",
					postalCode: "2.5.4.17",
					jurisdictionOfIncorporationL: "1.3.6.1.4.1.311.60.2.1.1",
					jurisdictionOfIncorporationSP: "1.3.6.1.4.1.311.60.2.1.2",
					jurisdictionOfIncorporationC: "1.3.6.1.4.1.311.60.2.1.3",
					subjectKeyIdentifier: "2.5.29.14",
					keyUsage: "2.5.29.15",
					subjectAltName: "2.5.29.17",
					issuerAltName: "2.5.29.18",
					basicConstraints: "2.5.29.19",
					nameConstraints: "2.5.29.30",
					cRLDistributionPoints: "2.5.29.31",
					certificatePolicies: "2.5.29.32",
					authorityKeyIdentifier: "2.5.29.35",
					policyConstraints: "2.5.29.36",
					extKeyUsage: "2.5.29.37",
					authorityInfoAccess: "1.3.6.1.5.5.7.1.1",
					ocsp: "1.3.6.1.5.5.7.48.1",
					caIssuers: "1.3.6.1.5.5.7.48.2",
					anyExtendedKeyUsage: "2.5.29.37.0",
					serverAuth: "1.3.6.1.5.5.7.3.1",
					clientAuth: "1.3.6.1.5.5.7.3.2",
					codeSigning: "1.3.6.1.5.5.7.3.3",
					emailProtection: "1.3.6.1.5.5.7.3.4",
					timeStamping: "1.3.6.1.5.5.7.3.8",
					ocspSigning: "1.3.6.1.5.5.7.3.9",
					ecPublicKey: "1.2.840.10045.2.1",
					secp256r1: "1.2.840.10045.3.1.7",
					secp256k1: "1.3.132.0.10",
					secp384r1: "1.3.132.0.34",
					pkcs5PBES2: "1.2.840.113549.1.5.13",
					pkcs5PBKDF2: "1.2.840.113549.1.5.12",
					"des-EDE3-CBC": "1.2.840.113549.3.7",
					data: "1.2.840.113549.1.7.1",
					"signed-data": "1.2.840.113549.1.7.2",
					"enveloped-data": "1.2.840.113549.1.7.3",
					"digested-data": "1.2.840.113549.1.7.5",
					"encrypted-data": "1.2.840.113549.1.7.6",
					"authenticated-data": "1.2.840.113549.1.9.16.1.2",
					tstinfo: "1.2.840.113549.1.9.16.1.4",
					extensionRequest: "1.2.840.113549.1.9.14"
				}, this.objCache = {}, this.name2obj = function(a) {
					if(void 0 !== this.objCache[a]) return this.objCache[a];
					if(void 0 === this.name2oidList[a]) throw "Name of ObjectIdentifier not defined: " + a;
					var b = this.name2oidList[a],
						c = new od.asn1.DERObjectIdentifier({
							oid: b
						});
					return this.objCache[a] = c, c
				}, this.atype2obj = function(a) {
					if(void 0 !== this.objCache[a]) return this.objCache[a];
					if(void 0 === this.atype2oidList[a]) throw "AttributeType name undefined: " + a;
					var b = this.atype2oidList[a],
						c = new od.asn1.DERObjectIdentifier({
							oid: b
						});
					return this.objCache[a] = c, c
				}
			}, od.asn1.x509.OID.oid2name = function(a) {
				var b = od.asn1.x509.OID.name2oidList;
				for(var c in b)
					if(b[c] == a) return c;
				return ""
			}, od.asn1.x509.OID.oid2atype = function(a) {
				var b = od.asn1.x509.OID.atype2oidList;
				for(var c in b)
					if(b[c] == a) return c;
				return a
			}, od.asn1.x509.OID.name2oid = function(a) {
				var b = od.asn1.x509.OID.name2oidList;
				return void 0 === b[a] ? "" : b[a]
			}, od.asn1.x509.X509Util = {}, od.asn1.x509.X509Util.newCertPEM = function(a) {
				var b = od.asn1.x509,
					c = b.TBSCertificate,
					d = b.Certificate,
					e = new c;
				if(void 0 === a.serial) throw "serial number undefined.";
				if(e.setSerialNumberByParam(a.serial), "string" != typeof a.sigalg.name) throw "unproper signature algorithm name";
				if(e.setSignatureAlgByParam(a.sigalg), void 0 === a.issuer) throw "issuer name undefined.";
				if(e.setIssuerByParam(a.issuer), void 0 === a.notbefore) throw "notbefore undefined.";
				if(e.setNotBeforeByParam(a.notbefore), void 0 === a.notafter) throw "notafter undefined.";
				if(e.setNotAfterByParam(a.notafter), void 0 === a.subject) throw "subject name undefined.";
				if(e.setSubjectByParam(a.subject), void 0 === a.sbjpubkey) throw "subject public key undefined.";
				if(e.setSubjectPublicKeyByGetKey(a.sbjpubkey), void 0 !== a.ext && void 0 !== a.ext.length)
					for(var f = 0; f < a.ext.length; f++)
						for(key in a.ext[f]) e.appendExtensionByName(key, a.ext[f][key]);
				if(void 0 === a.cakey && void 0 === a.sighex) throw "param cakey and sighex undefined.";
				var g = null,
					h = null;
				return a.cakey && (g = !0 === a.cakey.isPrivate ? a.cakey : sd.getKey.apply(null, a.cakey), h = new d({
					tbscertobj: e,
					prvkeyobj: g
				}), h.sign()), a.sighex && (h = new d({
					tbscertobj: e
				}), h.setSignatureHex(a.sighex)), h.getPEMString()
			}, void 0 !== od && od || (od = {}), void 0 !== od.asn1 && od.asn1 || (od.asn1 = {}), void 0 !== od.asn1.cms && od.asn1.cms || (od.asn1.cms = {}), od.asn1.cms.Attribute = function(a) {
				var b = od,
					c = b.asn1;
				c.cms.Attribute.superclass.constructor.call(this), this.getEncodedHex = function() {
					var a, b, d;
					a = new c.DERObjectIdentifier({
						oid: this.attrTypeOid
					}), b = new c.DERSet({
						array: this.valueList
					});
					try {
						b.getEncodedHex()
					} catch(a) {
						throw "fail valueSet.getEncodedHex in Attribute(1)/" + a
					}
					d = new c.DERSequence({
						array: [a, b]
					});
					try {
						this.hTLV = d.getEncodedHex()
					} catch(a) {
						throw "failed seq.getEncodedHex in Attribute(2)/" + a
					}
					return this.hTLV
				}
			}, Sc.lang.extend(od.asn1.cms.Attribute, od.asn1.ASN1Object), od.asn1.cms.ContentType = function(a) {
				var b = od,
					c = b.asn1;
				(c.cms.ContentType.superclass.constructor.call(this), this.attrTypeOid = "1.2.840.113549.1.9.3", void 0 !== a) && (new c.DERObjectIdentifier(a), this.valueList = [null])
			}, Sc.lang.extend(od.asn1.cms.ContentType, od.asn1.cms.Attribute), od.asn1.cms.MessageDigest = function(a) {
				var b = od,
					c = b.asn1,
					d = c.DEROctetString,
					e = c.cms;
				if(e.MessageDigest.superclass.constructor.call(this), this.attrTypeOid = "1.2.840.113549.1.9.4", void 0 !== a)
					if(a.eciObj instanceof e.EncapsulatedContentInfo && "string" == typeof a.hashAlg) {
						var f = a.eciObj.eContentValueHex,
							g = a.hashAlg,
							h = b.crypto.Util.hashHex(f, g),
							i = new d({
								hex: h
							});
						i.getEncodedHex(), this.valueList = [i]
					} else {
						var i = new d(a);
						i.getEncodedHex(), this.valueList = [i]
					}
			}, Sc.lang.extend(od.asn1.cms.MessageDigest, od.asn1.cms.Attribute), od.asn1.cms.SigningTime = function(a) {
				var b = od,
					c = b.asn1;
				if(c.cms.SigningTime.superclass.constructor.call(this), this.attrTypeOid = "1.2.840.113549.1.9.5", void 0 !== a) {
					var d = new c.x509.Time(a);
					try {
						d.getEncodedHex()
					} catch(a) {
						throw "SigningTime.getEncodedHex() failed/" + a
					}
					this.valueList = [d]
				}
			}, Sc.lang.extend(od.asn1.cms.SigningTime, od.asn1.cms.Attribute), od.asn1.cms.SigningCertificate = function(a) {
				var b = od,
					c = b.asn1,
					d = c.DERSequence,
					e = c.cms;
				b.crypto;
				e.SigningCertificate.superclass.constructor.call(this), this.attrTypeOid = "1.2.840.113549.1.9.16.2.12", this.setCerts = function(a) {
					for(var f = [], g = 0; g < a.length; g++) {
						var h = yc(a[g]),
							i = b.crypto.Util.hashHex(h, "sha1"),
							j = new c.DEROctetString({
								hex: i
							});
						j.getEncodedHex();
						var k = new e.IssuerAndSerialNumber({
							cert: a[g]
						});
						k.getEncodedHex();
						var l = new d({
							array: [j, k]
						});
						l.getEncodedHex(), f.push(l)
					}
					var m = new d({
						array: f
					});
					m.getEncodedHex(), this.valueList = [m]
				}, void 0 !== a && "object" == typeof a.array && this.setCerts(a.array)
			}, Sc.lang.extend(od.asn1.cms.SigningCertificate, od.asn1.cms.Attribute), od.asn1.cms.SigningCertificateV2 = function(a) {
				var b = od,
					c = b.asn1,
					d = c.DERSequence,
					e = c.x509,
					f = c.cms,
					g = b.crypto;
				if(f.SigningCertificateV2.superclass.constructor.call(this), this.attrTypeOid = "1.2.840.113549.1.9.16.2.47", this.setCerts = function(a, b) {
						for(var h = [], i = 0; i < a.length; i++) {
							var j = yc(a[i]),
								k = [];
							"sha256" !== b && k.push(new e.AlgorithmIdentifier({
								name: b
							}));
							var l = g.Util.hashHex(j, b),
								m = new c.DEROctetString({
									hex: l
								});
							m.getEncodedHex(), k.push(m);
							var n = new f.IssuerAndSerialNumber({
								cert: a[i]
							});
							n.getEncodedHex(), k.push(n);
							var o = new d({
								array: k
							});
							o.getEncodedHex(), h.push(o)
						}
						var p = new d({
							array: h
						});
						p.getEncodedHex(), this.valueList = [p]
					}, void 0 !== a && "object" == typeof a.array) {
					var h = "sha256";
					"string" == typeof a.hashAlg && (h = a.hashAlg), this.setCerts(a.array, h)
				}
			}, Sc.lang.extend(od.asn1.cms.SigningCertificateV2, od.asn1.cms.Attribute), od.asn1.cms.IssuerAndSerialNumber = function(a) {
				var b = od,
					c = b.asn1,
					d = c.DERInteger,
					e = c.cms,
					f = c.x509,
					g = f.X500Name,
					h = Pc;
				e.IssuerAndSerialNumber.superclass.constructor.call(this);
				this.setByCertPEM = function(a) {
					var b = yc(a),
						c = new h;
					c.hex = b;
					var e = c.getIssuerHex();
					this.dIssuer = new g, this.dIssuer.hTLV = e;
					var f = c.getSerialNumberHex();
					this.dSerial = new d({
						hex: f
					})
				}, this.getEncodedHex = function() {
					var a = new c.DERSequence({
						array: [this.dIssuer, this.dSerial]
					});
					return this.hTLV = a.getEncodedHex(), this.hTLV
				}, void 0 !== a && ("string" == typeof a && -1 != a.indexOf("-----BEGIN ") && this.setByCertPEM(a), a.issuer && a.serial && (a.issuer instanceof g ? this.dIssuer = a.issuer : this.dIssuer = new g(a.issuer), a.serial instanceof d ? this.dSerial = a.serial : this.dSerial = new d(a.serial)), "string" == typeof a.cert && this.setByCertPEM(a.cert))
			}, Sc.lang.extend(od.asn1.cms.IssuerAndSerialNumber, od.asn1.ASN1Object), od.asn1.cms.AttributeList = function(a) {
				var b = od,
					c = b.asn1,
					d = c.cms;
				d.AttributeList.superclass.constructor.call(this), this.list = new Array, this.sortFlag = !0, this.add = function(a) {
					a instanceof d.Attribute && this.list.push(a)
				}, this.length = function() {
					return this.list.length
				}, this.clear = function() {
					this.list = new Array, this.hTLV = null, this.hV = null
				}, this.getEncodedHex = function() {
					if("string" == typeof this.hTLV) return this.hTLV;
					var a = new c.DERSet({
						array: this.list,
						sortflag: this.sortFlag
					});
					return this.hTLV = a.getEncodedHex(), this.hTLV
				}, void 0 !== a && void 0 !== a.sortflag && 0 == a.sortflag && (this.sortFlag = !1)
			}, Sc.lang.extend(od.asn1.cms.AttributeList, od.asn1.ASN1Object), od.asn1.cms.SignerInfo = function(a) {
				var b = od,
					c = b.asn1,
					d = c.DERTaggedObject,
					e = c.cms,
					f = e.AttributeList,
					g = e.ContentType,
					h = e.EncapsulatedContentInfo,
					i = e.MessageDigest,
					j = e.SignedData,
					k = c.x509,
					l = k.AlgorithmIdentifier,
					m = b.crypto,
					n = sd;
				e.SignerInfo.superclass.constructor.call(this), this.dCMSVersion = new c.DERInteger({
					int: 1
				}), this.dSignerIdentifier = null, this.dDigestAlgorithm = null, this.dSignedAttrs = new f, this.dSigAlg = null, this.dSig = null, this.dUnsignedAttrs = new f, this.setSignerIdentifier = function(a) {
					if("string" == typeof a && -1 != a.indexOf("CERTIFICATE") && -1 != a.indexOf("BEGIN") && -1 != a.indexOf("END")) {
						this.dSignerIdentifier = new e.IssuerAndSerialNumber({
							cert: a
						})
					}
				}, this.setForContentAndHash = function(a) {
					void 0 !== a && (a.eciObj instanceof h && (this.dSignedAttrs.add(new g({
						oid: "1.2.840.113549.1.7.1"
					})), this.dSignedAttrs.add(new i({
						eciObj: a.eciObj,
						hashAlg: a.hashAlg
					}))), void 0 !== a.sdObj && a.sdObj instanceof j && -1 == a.sdObj.digestAlgNameList.join(":").indexOf(a.hashAlg) && a.sdObj.digestAlgNameList.push(a.hashAlg), "string" == typeof a.hashAlg && (this.dDigestAlgorithm = new l({
						name: a.hashAlg
					})))
				}, this.sign = function(a, b) {
					this.dSigAlg = new l({
						name: b
					});
					var d = this.dSignedAttrs.getEncodedHex(),
						e = n.getKey(a),
						f = new m.Signature({
							alg: b
						});
					f.init(e), f.updateHex(d);
					var g = f.sign();
					this.dSig = new c.DEROctetString({
						hex: g
					})
				}, this.addUnsigned = function(a) {
					this.hTLV = null, this.dUnsignedAttrs.hTLV = null, this.dUnsignedAttrs.add(a)
				}, this.getEncodedHex = function() {
					if(this.dSignedAttrs instanceof f && 0 == this.dSignedAttrs.length()) throw "SignedAttrs length = 0 (empty)";
					var a = new d({
							obj: this.dSignedAttrs,
							tag: "a0",
							explicit: !1
						}),
						b = null;
					this.dUnsignedAttrs.length() > 0 && (b = new d({
						obj: this.dUnsignedAttrs,
						tag: "a1",
						explicit: !1
					}));
					var e = [this.dCMSVersion, this.dSignerIdentifier, this.dDigestAlgorithm, a, this.dSigAlg, this.dSig];
					null != b && e.push(b);
					var g = new c.DERSequence({
						array: e
					});
					return this.hTLV = g.getEncodedHex(), this.hTLV
				}
			}, Sc.lang.extend(od.asn1.cms.SignerInfo, od.asn1.ASN1Object), od.asn1.cms.EncapsulatedContentInfo = function(a) {
				var b = od,
					c = b.asn1,
					d = c.DERTaggedObject,
					e = c.DERSequence,
					f = c.DERObjectIdentifier,
					g = c.DEROctetString;
				c.cms.EncapsulatedContentInfo.superclass.constructor.call(this), this.dEContentType = new f({
					name: "data"
				}), this.dEContent = null, this.isDetached = !1, this.eContentValueHex = null, this.setContentType = function(a) {
					a.match(/^[0-2][.][0-9.]+$/) ? this.dEContentType = new f({
						oid: a
					}) : this.dEContentType = new f({
						name: a
					})
				}, this.setContentValue = function(a) {
					void 0 !== a && ("string" == typeof a.hex ? this.eContentValueHex = a.hex : "string" == typeof a.str && (this.eContentValueHex = qc(a.str)))
				}, this.setContentValueHex = function(a) {
					this.eContentValueHex = a
				}, this.setContentValueStr = function(a) {
					this.eContentValueHex = qc(a)
				}, this.getEncodedHex = function() {
					if("string" != typeof this.eContentValueHex) throw "eContentValue not yet set";
					var a = new g({
						hex: this.eContentValueHex
					});
					this.dEContent = new d({
						obj: a,
						tag: "a0",
						explicit: !0
					});
					var b = [this.dEContentType];
					this.isDetached || b.push(this.dEContent);
					var c = new e({
						array: b
					});
					return this.hTLV = c.getEncodedHex(), this.hTLV
				}
			}, Sc.lang.extend(od.asn1.cms.EncapsulatedContentInfo, od.asn1.ASN1Object), od.asn1.cms.ContentInfo = function(a) {
				var b = od,
					c = b.asn1,
					d = c.DERTaggedObject,
					e = c.DERSequence,
					f = c.x509;
				od.asn1.cms.ContentInfo.superclass.constructor.call(this), this.dContentType = null, this.dContent = null, this.setContentType = function(a) {
					"string" == typeof a && (this.dContentType = f.OID.name2obj(a))
				}, this.getEncodedHex = function() {
					var a = new d({
							obj: this.dContent,
							tag: "a0",
							explicit: !0
						}),
						b = new e({
							array: [this.dContentType, a]
						});
					return this.hTLV = b.getEncodedHex(), this.hTLV
				}, void 0 !== a && (a.type && this.setContentType(a.type), a.obj && a.obj instanceof c.ASN1Object && (this.dContent = a.obj))
			}, Sc.lang.extend(od.asn1.cms.ContentInfo, od.asn1.ASN1Object), od.asn1.cms.SignedData = function(a) {
				var b = od,
					c = b.asn1,
					d = c.ASN1Object,
					e = c.DERInteger,
					f = c.DERSet,
					g = c.DERSequence,
					h = c.DERTaggedObject,
					i = c.cms,
					j = i.EncapsulatedContentInfo,
					k = i.SignerInfo,
					l = i.ContentInfo,
					m = c.x509,
					n = m.AlgorithmIdentifier;
				od.asn1.cms.SignedData.superclass.constructor.call(this), this.dCMSVersion = new e({
					int: 1
				}), this.dDigestAlgs = null, this.digestAlgNameList = [], this.dEncapContentInfo = new j, this.dCerts = null, this.certificateList = [], this.crlList = [], this.signerInfoList = [new k], this.addCertificatesByPEM = function(a) {
					var b = yc(a),
						c = new d;
					c.hTLV = b, this.certificateList.push(c)
				}, this.getEncodedHex = function() {
					if("string" == typeof this.hTLV) return this.hTLV;
					if(null == this.dDigestAlgs) {
						for(var a = [], b = 0; b < this.digestAlgNameList.length; b++) {
							var c = this.digestAlgNameList[b],
								d = new n({
									name: c
								});
							a.push(d)
						}
						this.dDigestAlgs = new f({
							array: a
						})
					}
					var e = [this.dCMSVersion, this.dDigestAlgs, this.dEncapContentInfo];
					if(null == this.dCerts && this.certificateList.length > 0) {
						var i = new f({
							array: this.certificateList
						});
						this.dCerts = new h({
							obj: i,
							tag: "a0",
							explicit: !1
						})
					}
					null != this.dCerts && e.push(this.dCerts);
					var j = new f({
						array: this.signerInfoList
					});
					e.push(j);
					var k = new g({
						array: e
					});
					return this.hTLV = k.getEncodedHex(), this.hTLV
				}, this.getContentInfo = function() {
					return this.getEncodedHex(), new l({
						type: "signed-data",
						obj: this
					})
				}, this.getContentInfoEncodedHex = function() {
					return this.getContentInfo().getEncodedHex()
				}, this.getPEM = function() {
					return xc(this.getContentInfoEncodedHex(), "CMS")
				}
			}, Sc.lang.extend(od.asn1.cms.SignedData, od.asn1.ASN1Object), od.asn1.cms.CMSUtil = new function() {}, od.asn1.cms.CMSUtil.newSignedData = function(a) {
				var b = od,
					c = b.asn1,
					d = c.cms,
					e = d.SignerInfo,
					f = d.SignedData,
					g = d.SigningTime,
					h = d.SigningCertificate,
					i = d.SigningCertificateV2,
					j = c.cades,
					k = j.SignaturePolicyIdentifier,
					l = new f;
				if(l.dEncapContentInfo.setContentValue(a.content), "object" == typeof a.certs)
					for(var m = 0; m < a.certs.length; m++) l.addCertificatesByPEM(a.certs[m]);
				l.signerInfoList = [];
				for(var m = 0; m < a.signerInfos.length; m++) {
					var n = a.signerInfos[m],
						o = new e;
					o.setSignerIdentifier(n.signerCert), o.setForContentAndHash({
						sdObj: l,
						eciObj: l.dEncapContentInfo,
						hashAlg: n.hashAlg
					});
					for(attrName in n.sAttr) {
						var p = n.sAttr[attrName];
						if("SigningTime" == attrName) {
							var q = new g(p);
							o.dSignedAttrs.add(q)
						}
						if("SigningCertificate" == attrName) {
							var q = new h(p);
							o.dSignedAttrs.add(q)
						}
						if("SigningCertificateV2" == attrName) {
							var q = new i(p);
							o.dSignedAttrs.add(q)
						}
						if("SignaturePolicyIdentifier" == attrName) {
							var q = new k(p);
							o.dSignedAttrs.add(q)
						}
					}
					o.sign(n.signerPrvKey, n.sigAlg), l.signerInfoList.push(o)
				}
				return l
			}, void 0 !== od && od || (od = {}), void 0 !== od.asn1 && od.asn1 || (od.asn1 = {}), void 0 !== od.asn1.tsp && od.asn1.tsp || (od.asn1.tsp = {}), od.asn1.tsp.Accuracy = function(a) {
				var b = od,
					c = b.asn1,
					d = c.DERInteger,
					e = c.DERSequence,
					f = c.DERTaggedObject;
				c.tsp.Accuracy.superclass.constructor.call(this), this.seconds = null, this.millis = null, this.micros = null, this.getEncodedHex = function() {
					var a = null,
						b = null,
						c = null,
						g = [];
					if(null != this.seconds && (a = new d({
							int: this.seconds
						}), g.push(a)), null != this.millis) {
						var h = new d({
							int: this.millis
						});
						b = new f({
							obj: h,
							tag: "80",
							explicit: !1
						}), g.push(b)
					}
					if(null != this.micros) {
						var i = new d({
							int: this.micros
						});
						c = new f({
							obj: i,
							tag: "81",
							explicit: !1
						}), g.push(c)
					}
					var j = new e({
						array: g
					});
					return this.hTLV = j.getEncodedHex(), this.hTLV
				}, void 0 !== a && ("number" == typeof a.seconds && (this.seconds = a.seconds), "number" == typeof a.millis && (this.millis = a.millis), "number" == typeof a.micros && (this.micros = a.micros))
			}, Sc.lang.extend(od.asn1.tsp.Accuracy, od.asn1.ASN1Object), od.asn1.tsp.MessageImprint = function(a) {
				var b = od,
					c = b.asn1,
					d = c.DERSequence,
					e = c.DEROctetString,
					f = c.x509,
					g = f.AlgorithmIdentifier;
				c.tsp.MessageImprint.superclass.constructor.call(this), this.dHashAlg = null, this.dHashValue = null, this.getEncodedHex = function() {
					return "string" == typeof this.hTLV ? this.hTLV : new d({
						array: [this.dHashAlg, this.dHashValue]
					}).getEncodedHex()
				}, void 0 !== a && ("string" == typeof a.hashAlg && (this.dHashAlg = new g({
					name: a.hashAlg
				})), "string" == typeof a.hashValue && (this.dHashValue = new e({
					hex: a.hashValue
				})))
			}, Sc.lang.extend(od.asn1.tsp.MessageImprint, od.asn1.ASN1Object), od.asn1.tsp.TimeStampReq = function(a) {
				var b = od,
					c = b.asn1,
					d = c.DERSequence,
					e = c.DERInteger,
					f = c.DERBoolean,
					g = c.DERObjectIdentifier,
					h = c.tsp,
					i = h.MessageImprint;
				h.TimeStampReq.superclass.constructor.call(this), this.dVersion = new e({
					int: 1
				}), this.dMessageImprint = null, this.dPolicy = null, this.dNonce = null, this.certReq = !0, this.setMessageImprint = function(a) {
					if(a instanceof i) return void(this.dMessageImprint = a);
					"object" == typeof a && (this.dMessageImprint = new i(a))
				}, this.getEncodedHex = function() {
					if(null == this.dMessageImprint) throw "messageImprint shall be specified";
					var a = [this.dVersion, this.dMessageImprint];
					null != this.dPolicy && a.push(this.dPolicy), null != this.dNonce && a.push(this.dNonce), this.certReq && a.push(new f);
					var b = new d({
						array: a
					});
					return this.hTLV = b.getEncodedHex(), this.hTLV
				}, void 0 !== a && ("object" == typeof a.mi && this.setMessageImprint(a.mi), "object" == typeof a.policy && (this.dPolicy = new g(a.policy)), "object" == typeof a.nonce && (this.dNonce = new e(a.nonce)), "boolean" == typeof a.certreq && (this.certReq = a.certreq))
			}, Sc.lang.extend(od.asn1.tsp.TimeStampReq, od.asn1.ASN1Object), od.asn1.tsp.TSTInfo = function(a) {
				var b = od,
					c = b.asn1,
					d = c.DERSequence,
					e = c.DERInteger,
					f = c.DERBoolean,
					g = c.DERGeneralizedTime,
					h = c.DERObjectIdentifier,
					i = c.tsp,
					j = i.MessageImprint,
					k = i.Accuracy,
					l = c.x509.X500Name;
				if(i.TSTInfo.superclass.constructor.call(this), this.dVersion = new e({
						int: 1
					}), this.dPolicy = null, this.dMessageImprint = null, this.dSerialNumber = null, this.dGenTime = null, this.dAccuracy = null, this.dOrdering = null, this.dNonce = null, this.dTsa = null, this.getEncodedHex = function() {
						var a = [this.dVersion];
						if(null == this.dPolicy) throw "policy shall be specified.";
						if(a.push(this.dPolicy), null == this.dMessageImprint) throw "messageImprint shall be specified.";
						if(a.push(this.dMessageImprint), null == this.dSerialNumber) throw "serialNumber shall be specified.";
						if(a.push(this.dSerialNumber), null == this.dGenTime) throw "genTime shall be specified.";
						a.push(this.dGenTime), null != this.dAccuracy && a.push(this.dAccuracy), null != this.dOrdering && a.push(this.dOrdering), null != this.dNonce && a.push(this.dNonce), null != this.dTsa && a.push(this.dTsa);
						var b = new d({
							array: a
						});
						return this.hTLV = b.getEncodedHex(), this.hTLV
					}, void 0 !== a) {
					if("string" == typeof a.policy) {
						if(!a.policy.match(/^[0-9.]+$/)) throw "policy shall be oid like 0.1.4.134";
						this.dPolicy = new h({
							oid: a.policy
						})
					}
					void 0 !== a.messageImprint && (this.dMessageImprint = new j(a.messageImprint)), void 0 !== a.serialNumber && (this.dSerialNumber = new e(a.serialNumber)), void 0 !== a.genTime && (this.dGenTime = new g(a.genTime)), void 0 !== a.accuracy && (this.dAccuracy = new k(a.accuracy)), void 0 !== a.ordering && 1 == a.ordering && (this.dOrdering = new f), void 0 !== a.nonce && (this.dNonce = new e(a.nonce)), void 0 !== a.tsa && (this.dTsa = new l(a.tsa))
				}
			}, Sc.lang.extend(od.asn1.tsp.TSTInfo, od.asn1.ASN1Object), od.asn1.tsp.TimeStampResp = function(a) {
				var b = od,
					c = b.asn1,
					d = c.DERSequence,
					e = c.ASN1Object,
					f = c.tsp,
					g = f.PKIStatusInfo;
				f.TimeStampResp.superclass.constructor.call(this), this.dStatus = null, this.dTST = null, this.getEncodedHex = function() {
					if(null == this.dStatus) throw "status shall be specified";
					var a = [this.dStatus];
					null != this.dTST && a.push(this.dTST);
					var b = new d({
						array: a
					});
					return this.hTLV = b.getEncodedHex(), this.hTLV
				}, void 0 !== a && ("object" == typeof a.status && (this.dStatus = new g(a.status)), void 0 !== a.tst && a.tst instanceof e && (this.dTST = a.tst.getContentInfo()))
			}, Sc.lang.extend(od.asn1.tsp.TimeStampResp, od.asn1.ASN1Object), od.asn1.tsp.PKIStatusInfo = function(a) {
				var b = od,
					c = b.asn1,
					d = c.DERSequence,
					e = c.tsp,
					f = e.PKIStatus,
					g = e.PKIFreeText,
					h = e.PKIFailureInfo;
				e.PKIStatusInfo.superclass.constructor.call(this), this.dStatus = null, this.dStatusString = null, this.dFailureInfo = null, this.getEncodedHex = function() {
					if(null == this.dStatus) throw "status shall be specified";
					var a = [this.dStatus];
					null != this.dStatusString && a.push(this.dStatusString), null != this.dFailureInfo && a.push(this.dFailureInfo);
					var b = new d({
						array: a
					});
					return this.hTLV = b.getEncodedHex(), this.hTLV
				}, void 0 !== a && ("object" == typeof a.status && (this.dStatus = new f(a.status)), "object" == typeof a.statstr && (this.dStatusString = new g({
					array: a.statstr
				})), "object" == typeof a.failinfo && (this.dFailureInfo = new h(a.failinfo)))
			}, Sc.lang.extend(od.asn1.tsp.PKIStatusInfo, od.asn1.ASN1Object), od.asn1.tsp.PKIStatus = function(a) {
				var b = od,
					c = b.asn1,
					d = c.DERInteger,
					e = c.tsp,
					f = e.PKIStatus;
				e.PKIStatus.superclass.constructor.call(this);
				if(this.getEncodedHex = function() {
						return this.hTLV = this.dStatus.getEncodedHex(), this.hTLV
					}, void 0 !== a)
					if(void 0 !== a.name) {
						var g = f.valueList;
						if(void 0 === g[a.name]) throw "name undefined: " + a.name;
						this.dStatus = new d({
							int: g[a.name]
						})
					} else this.dStatus = new d(a)
			}, Sc.lang.extend(od.asn1.tsp.PKIStatus, od.asn1.ASN1Object), od.asn1.tsp.PKIStatus.valueList = {
				granted: 0,
				grantedWithMods: 1,
				rejection: 2,
				waiting: 3,
				revocationWarning: 4,
				revocationNotification: 5
			}, od.asn1.tsp.PKIFreeText = function(a) {
				var b = od,
					c = b.asn1,
					d = c.DERSequence,
					e = c.DERUTF8String;
				c.tsp.PKIFreeText.superclass.constructor.call(this), this.textList = [], this.getEncodedHex = function() {
					for(var a = [], b = 0; b < this.textList.length; b++) a.push(new e({
						str: this.textList[b]
					}));
					var c = new d({
						array: a
					});
					return this.hTLV = c.getEncodedHex(), this.hTLV
				}, void 0 !== a && "object" == typeof a.array && (this.textList = a.array)
			}, Sc.lang.extend(od.asn1.tsp.PKIFreeText, od.asn1.ASN1Object), od.asn1.tsp.PKIFailureInfo = function(a) {
				var b = od,
					c = b.asn1,
					d = c.DERBitString,
					e = c.tsp,
					f = e.PKIFailureInfo;
				if(f.superclass.constructor.call(this), this.value = null, this.getEncodedHex = function() {
						if(null == this.value) throw "value shall be specified";
						var a = new Number(this.value).toString(2),
							b = new d;
						return b.setByBinaryString(a), this.hTLV = b.getEncodedHex(), this.hTLV
					}, void 0 !== a)
					if("string" == typeof a.name) {
						var g = f.valueList;
						if(void 0 === g[a.name]) throw "name undefined: " + a.name;
						this.value = g[a.name]
					} else "number" == typeof a.int && (this.value = a.int)
			}, Sc.lang.extend(od.asn1.tsp.PKIFailureInfo, od.asn1.ASN1Object), od.asn1.tsp.PKIFailureInfo.valueList = {
				badAlg: 0,
				badRequest: 2,
				badDataFormat: 5,
				timeNotAvailable: 14,
				unacceptedPolicy: 15,
				unacceptedExtension: 16,
				addInfoNotAvailable: 17,
				systemFailure: 25
			}, od.asn1.tsp.AbstractTSAAdapter = function(a) {
				this.getTSTHex = function(a, b) {
					throw "not implemented yet"
				}
			}, od.asn1.tsp.SimpleTSAAdapter = function(a) {
				var b = od,
					c = b.asn1,
					d = c.tsp,
					e = b.crypto.Util.hashHex;
				d.SimpleTSAAdapter.superclass.constructor.call(this), this.params = null, this.serial = 0, this.getTSTHex = function(a, b) {
					var c = e(a, b);
					this.params.tstInfo.messageImprint = {
						hashAlg: b,
						hashValue: c
					}, this.params.tstInfo.serialNumber = {
						int: this.serial++
					};
					var f = Math.floor(1e9 * Math.random());
					return this.params.tstInfo.nonce = {
						int: f
					}, d.TSPUtil.newTimeStampToken(this.params).getContentInfoEncodedHex()
				}, void 0 !== a && (this.params = a)
			}, Sc.lang.extend(od.asn1.tsp.SimpleTSAAdapter, od.asn1.tsp.AbstractTSAAdapter), od.asn1.tsp.FixedTSAAdapter = function(a) {
				var b = od,
					c = b.asn1,
					d = c.tsp,
					e = b.crypto.Util.hashHex;
				d.FixedTSAAdapter.superclass.constructor.call(this), this.params = null, this.getTSTHex = function(a, b) {
					var c = e(a, b);
					return this.params.tstInfo.messageImprint = {
						hashAlg: b,
						hashValue: c
					}, d.TSPUtil.newTimeStampToken(this.params).getContentInfoEncodedHex()
				}, void 0 !== a && (this.params = a)
			}, Sc.lang.extend(od.asn1.tsp.FixedTSAAdapter, od.asn1.tsp.AbstractTSAAdapter), od.asn1.tsp.TSPUtil = new function() {}, od.asn1.tsp.TSPUtil.newTimeStampToken = function(a) {
				var b = od,
					c = b.asn1,
					d = c.cms,
					e = (c.tsp, c.tsp.TSTInfo),
					f = new d.SignedData,
					g = new e(a.tstInfo),
					h = g.getEncodedHex();
				if(f.dEncapContentInfo.setContentValue({
						hex: h
					}), f.dEncapContentInfo.setContentType("tstinfo"), "object" == typeof a.certs)
					for(var i = 0; i < a.certs.length; i++) f.addCertificatesByPEM(a.certs[i]);
				var j = f.signerInfoList[0];
				j.setSignerIdentifier(a.signerCert), j.setForContentAndHash({
					sdObj: f,
					eciObj: f.dEncapContentInfo,
					hashAlg: a.hashAlg
				});
				var k = new d.SigningCertificate({
					array: [a.signerCert]
				});
				return j.dSignedAttrs.add(k), j.sign(a.signerPrvKey, a.sigAlg), f
			}, od.asn1.tsp.TSPUtil.parseTimeStampReq = function(a) {
				var b = nd,
					c = b.getChildIdx,
					d = b.getV,
					e = b.getTLV,
					f = {};
				f.certreq = !1;
				var g = c(a, 0);
				if(g.length < 2) throw "TimeStampReq must have at least 2 items";
				var h = e(a, g[1]);
				f.mi = od.asn1.tsp.TSPUtil.parseMessageImprint(h);
				for(var i = 2; i < g.length; i++) {
					var j = g[i],
						k = a.substr(j, 2);
					if("06" == k) {
						var l = d(a, j);
						f.policy = b.hextooidstr(l)
					}
					"02" == k && (f.nonce = d(a, j)), "01" == k && (f.certreq = !0)
				}
				return f
			}, od.asn1.tsp.TSPUtil.parseMessageImprint = function(a) {
				var b = nd,
					c = b.getChildIdx,
					d = b.getV,
					e = b.getIdxbyList,
					f = {};
				if("30" != a.substr(0, 2)) throw "head of messageImprint hex shall be '30'";
				var g = (c(a, 0), e(a, 0, [0, 0])),
					h = d(a, g),
					i = b.hextooidstr(h),
					j = od.asn1.x509.OID.oid2name(i);
				if("" == j) throw "hashAlg name undefined: " + i;
				var k = j,
					l = e(a, 0, [1]);
				return f.hashAlg = k, f.hashValue = d(a, l), f
			}, void 0 !== od && od || (od = {}), void 0 !== od.asn1 && od.asn1 || (od.asn1 = {}), void 0 !== od.asn1.cades && od.asn1.cades || (od.asn1.cades = {}), od.asn1.cades.SignaturePolicyIdentifier = function(a) {
				var b = od,
					c = b.asn1,
					d = c.DERObjectIdentifier,
					e = c.DERSequence,
					f = c.cades,
					g = f.OtherHashAlgAndValue;
				if(f.SignaturePolicyIdentifier.superclass.constructor.call(this), this.attrTypeOid = "1.2.840.113549.1.9.16.2.15", void 0 !== a && "string" == typeof a.oid && "object" == typeof a.hash) {
					var h = new d({
							oid: a.oid
						}),
						i = new g(a.hash),
						j = new e({
							array: [h, i]
						});
					this.valueList = [j]
				}
			}, Sc.lang.extend(od.asn1.cades.SignaturePolicyIdentifier, od.asn1.cms.Attribute), od.asn1.cades.OtherHashAlgAndValue = function(a) {
				var b = od,
					c = b.asn1,
					d = c.DERSequence,
					e = c.DEROctetString,
					f = c.x509,
					g = f.AlgorithmIdentifier;
				c.cades.OtherHashAlgAndValue.superclass.constructor.call(this), this.dAlg = null, this.dHash = null, this.getEncodedHex = function() {
					var a = new d({
						array: [this.dAlg, this.dHash]
					});
					return this.hTLV = a.getEncodedHex(), this.hTLV
				}, void 0 !== a && "string" == typeof a.alg && "string" == typeof a.hash && (this.dAlg = new g({
					name: a.alg
				}), this.dHash = new e({
					hex: a.hash
				}))
			}, Sc.lang.extend(od.asn1.cades.OtherHashAlgAndValue, od.asn1.ASN1Object), od.asn1.cades.SignatureTimeStamp = function(a) {
				var b = od,
					c = b.asn1,
					d = c.ASN1Object;
				c.x509;
				if(c.cades.SignatureTimeStamp.superclass.constructor.call(this), this.attrTypeOid = "1.2.840.113549.1.9.16.2.14", this.tstHex = null, void 0 !== a) {
					if(void 0 !== a.res)
						if("string" == typeof a.res && a.res.match(/^[0-9A-Fa-f]+$/));
						else if(!(a.res instanceof d)) throw "res param shall be ASN1Object or hex string";
					if(void 0 !== a.tst)
						if("string" == typeof a.tst && a.tst.match(/^[0-9A-Fa-f]+$/)) {
							var e = new d;
							this.tstHex = a.tst, e.hTLV = this.tstHex, e.getEncodedHex(), this.valueList = [e]
						} else if(!(a.tst instanceof d)) throw "tst param shall be ASN1Object or hex string"
				}
			}, Sc.lang.extend(od.asn1.cades.SignatureTimeStamp, od.asn1.cms.Attribute), od.asn1.cades.CompleteCertificateRefs = function(a) {
				var b = od,
					c = b.asn1,
					d = c.cades;
				d.CompleteCertificateRefs.superclass.constructor.call(this), this.attrTypeOid = "1.2.840.113549.1.9.16.2.21", this.setByArray = function(a) {
					this.valueList = [];
					for(var b = 0; b < a.length; b++) {
						var c = new d.OtherCertID(a[b]);
						this.valueList.push(c)
					}
				}, void 0 !== a && "object" == typeof a && "number" == typeof a.length && this.setByArray(a)
			}, Sc.lang.extend(od.asn1.cades.CompleteCertificateRefs, od.asn1.cms.Attribute), od.asn1.cades.OtherCertID = function(a) {
				var b = od,
					c = b.asn1,
					d = c.cms,
					e = c.cades;
				e.OtherCertID.superclass.constructor.call(this), this.hasIssuerSerial = !0, this.dOtherCertHash = null, this.dIssuerSerial = null, this.setByCertPEM = function(a) {
					this.dOtherCertHash = new e.OtherHash(a), this.hasIssuerSerial && (this.dIssuerSerial = new d.IssuerAndSerialNumber(a))
				}, this.getEncodedHex = function() {
					if(null != this.hTLV) return this.hTLV;
					if(null == this.dOtherCertHash) throw "otherCertHash not set";
					var a = [this.dOtherCertHash];
					null != this.dIssuerSerial && a.push(this.dIssuerSerial);
					var b = new c.DERSequence({
						array: a
					});
					return this.hTLV = b.getEncodedHex(), this.hTLV
				}, void 0 !== a && ("string" == typeof a && -1 != a.indexOf("-----BEGIN ") && this.setByCertPEM(a), "object" == typeof a && (!1 === a.hasis && (this.hasIssuerSerial = !1), "string" == typeof a.cert && this.setByCertPEM(a.cert)))
			}, Sc.lang.extend(od.asn1.cades.OtherCertID, od.asn1.ASN1Object), od.asn1.cades.OtherHash = function(a) {
				var b = od,
					c = b.asn1,
					d = (c.cms, c.cades),
					e = d.OtherHashAlgAndValue,
					f = b.crypto.Util.hashHex;
				if(d.OtherHash.superclass.constructor.call(this), this.alg = "sha256", this.dOtherHash = null, this.setByCertPEM = function(a) {
						if(-1 == a.indexOf("-----BEGIN ")) throw "certPEM not to seem PEM format";
						var b = yc(a),
							c = f(b, this.alg);
						this.dOtherHash = new e({
							alg: this.alg,
							hash: c
						})
					}, this.getEncodedHex = function() {
						if(null == this.dOtherHash) throw "OtherHash not set";
						return this.dOtherHash.getEncodedHex()
					}, void 0 !== a)
					if("string" == typeof a)
						if(-1 != a.indexOf("-----BEGIN ")) this.setByCertPEM(a);
						else {
							if(!a.match(/^[0-9A-Fa-f]+$/)) throw "unsupported string value for params";
							this.dOtherHash = new c.DEROctetString({
								hex: a
							})
						}
				else "object" == typeof a && ("string" == typeof a.cert ? ("string" == typeof a.alg && (this.alg = a.alg), this.setByCertPEM(a.cert)) : this.dOtherHash = new e(a))
			}, Sc.lang.extend(od.asn1.cades.OtherHash, od.asn1.ASN1Object), od.asn1.cades.CAdESUtil = new function() {}, od.asn1.cades.CAdESUtil.addSigTS = function(a, b, c) {}, od.asn1.cades.CAdESUtil.parseSignedDataForAddingUnsigned = function(a) {
				var b = nd,
					c = b.getChildIdx,
					d = b.getTLV,
					e = b.getTLVbyList,
					f = b.getIdxbyList,
					g = od,
					h = g.asn1,
					i = h.ASN1Object,
					j = h.cms,
					k = j.SignedData,
					l = h.cades,
					m = l.CAdESUtil,
					n = {};
				if("06092a864886f70d010702" != e(a, 0, [0])) throw "hex is not CMS SignedData";
				var o = f(a, 0, [1, 0]),
					p = c(a, o);
				if(p.length < 4) throw "num of SignedData elem shall be 4 at least";
				var q = p.shift();
				n.version = d(a, q);
				var r = p.shift();
				n.algs = d(a, r);
				var s = p.shift();
				n.encapcontent = d(a, s), n.certs = null, n.revs = null, n.si = [];
				var t = p.shift();
				"a0" == a.substr(t, 2) && (n.certs = d(a, t), t = p.shift()), "a1" == a.substr(t, 2) && (n.revs = d(a, t), t = p.shift());
				var u = t;
				if("31" != a.substr(u, 2)) throw "Can't find signerInfos";
				for(var v = c(a, u), w = 0; w < v.length; w++) {
					var x = v[w],
						y = m.parseSignerInfoForAddingUnsigned(a, x, w);
					n.si[w] = y
				}
				var z = null;
				n.obj = new k, z = new i, z.hTLV = n.version, n.obj.dCMSVersion = z, z = new i, z.hTLV = n.algs, n.obj.dDigestAlgs = z, z = new i, z.hTLV = n.encapcontent, n.obj.dEncapContentInfo = z, z = new i, z.hTLV = n.certs, n.obj.dCerts = z, n.obj.signerInfoList = [];
				for(var w = 0; w < n.si.length; w++) n.obj.signerInfoList.push(n.si[w].obj);
				return n
			}, od.asn1.cades.CAdESUtil.parseSignerInfoForAddingUnsigned = function(a, b, c) {
				var d = nd,
					e = d.getChildIdx,
					f = d.getTLV,
					g = d.getV,
					h = od,
					i = h.asn1,
					j = i.ASN1Object,
					k = i.cms,
					l = k.AttributeList,
					m = k.SignerInfo,
					n = {},
					o = e(a, b);
				if(6 != o.length) throw "not supported items for SignerInfo (!=6)";
				var p = o.shift();
				n.version = f(a, p);
				var q = o.shift();
				n.si = f(a, q);
				var r = o.shift();
				n.digalg = f(a, r);
				var s = o.shift();
				n.sattrs = f(a, s);
				var t = o.shift();
				n.sigalg = f(a, t);
				var u = o.shift();
				n.sig = f(a, u), n.sigval = g(a, u);
				var v = null;
				return n.obj = new m, v = new j, v.hTLV = n.version, n.obj.dCMSVersion = v, v = new j, v.hTLV = n.si, n.obj.dSignerIdentifier = v, v = new j, v.hTLV = n.digalg, n.obj.dDigestAlgorithm = v, v = new j, v.hTLV = n.sattrs, n.obj.dSignedAttrs = v, v = new j, v.hTLV = n.sigalg, n.obj.dSigAlg = v, v = new j, v.hTLV = n.sig, n.obj.dSig = v, n.obj.dUnsignedAttrs = new l, n
			}, void 0 !== od.asn1.csr && od.asn1.csr || (od.asn1.csr = {}), od.asn1.csr.CertificationRequest = function(a) {
				var b = od,
					c = b.asn1,
					d = c.DERBitString,
					e = c.DERSequence,
					f = c.csr,
					g = c.x509;
				f.CertificationRequest.superclass.constructor.call(this);
				this.sign = function(a, c) {
					null == this.prvKey && (this.prvKey = c), this.asn1SignatureAlg = new g.AlgorithmIdentifier({
						name: a
					}), sig = new b.crypto.Signature({
						alg: a
					}), sig.initSign(this.prvKey), sig.updateHex(this.asn1CSRInfo.getEncodedHex()), this.hexSig = sig.sign(), this.asn1Sig = new d({
						hex: "00" + this.hexSig
					});
					var f = new e({
						array: [this.asn1CSRInfo, this.asn1SignatureAlg, this.asn1Sig]
					});
					this.hTLV = f.getEncodedHex(), this.isModified = !1
				}, this.getPEMString = function() {
					return xc(this.getEncodedHex(), "CERTIFICATE REQUEST")
				}, this.getEncodedHex = function() {
					if(0 == this.isModified && null != this.hTLV) return this.hTLV;
					throw "not signed yet"
				}, void 0 !== a && void 0 !== a.csrinfo && (this.asn1CSRInfo = a.csrinfo)
			}, Sc.lang.extend(od.asn1.csr.CertificationRequest, od.asn1.ASN1Object), od.asn1.csr.CertificationRequestInfo = function(a) {
				var b = od,
					c = b.asn1,
					d = c.DERInteger,
					e = c.DERSequence,
					f = c.DERSet,
					g = c.DERNull,
					h = c.DERTaggedObject,
					i = c.DERObjectIdentifier,
					j = c.csr,
					k = c.x509,
					l = k.X500Name,
					m = k.Extension,
					n = sd;
				j.CertificationRequestInfo.superclass.constructor.call(this), this._initialize = function() {
					this.asn1Array = new Array, this.asn1Version = new d({
						int: 0
					}), this.asn1Subject = null, this.asn1SubjPKey = null, this.extensionsArray = new Array
				}, this.setSubjectByParam = function(a) {
					this.asn1Subject = new l(a)
				}, this.setSubjectPublicKeyByGetKey = function(a) {
					var b = n.getKey(a);
					this.asn1SubjPKey = new k.SubjectPublicKeyInfo(b)
				}, this.appendExtensionByName = function(a, b) {
					m.appendByNameToArray(a, b, this.extensionsArray)
				}, this.getEncodedHex = function() {
					if(this.asn1Array = new Array, this.asn1Array.push(this.asn1Version), this.asn1Array.push(this.asn1Subject), this.asn1Array.push(this.asn1SubjPKey), this.extensionsArray.length > 0) {
						var a = new e({
								array: this.extensionsArray
							}),
							b = new f({
								array: [a]
							}),
							c = new e({
								array: [new i({
									oid: "1.2.840.113549.1.9.14"
								}), b]
							}),
							d = new h({
								explicit: !0,
								tag: "a0",
								obj: c
							});
						this.asn1Array.push(d)
					} else {
						var d = new h({
							explicit: !1,
							tag: "a0",
							obj: new g
						});
						this.asn1Array.push(d)
					}
					var j = new e({
						array: this.asn1Array
					});
					return this.hTLV = j.getEncodedHex(), this.isModified = !1, this.hTLV
				}, this._initialize()
			}, Sc.lang.extend(od.asn1.csr.CertificationRequestInfo, od.asn1.ASN1Object), od.asn1.csr.CSRUtil = new function() {}, od.asn1.csr.CSRUtil.newCSRPEM = function(a) {
				var b = sd,
					c = od.asn1.csr;
				if(void 0 === a.subject) throw "parameter subject undefined";
				if(void 0 === a.sbjpubkey) throw "parameter sbjpubkey undefined";
				if(void 0 === a.sigalg) throw "parameter sigalg undefined";
				if(void 0 === a.sbjprvkey) throw "parameter sbjpubkey undefined";
				var d = new c.CertificationRequestInfo;
				if(d.setSubjectByParam(a.subject), d.setSubjectPublicKeyByGetKey(a.sbjpubkey), void 0 !== a.ext && void 0 !== a.ext.length)
					for(var e = 0; e < a.ext.length; e++)
						for(key in a.ext[e]) d.appendExtensionByName(key, a.ext[e][key]);
				var f = new c.CertificationRequest({
						csrinfo: d
					}),
					g = b.getKey(a.sbjprvkey);
				return f.sign(a.sigalg, g), f.getPEMString()
			}, od.asn1.csr.CSRUtil.getInfo = function(a) {
				var b = nd,
					c = b.getTLVbyList,
					d = {};
				if(d.subject = {}, d.pubkey = {}, -1 == a.indexOf("-----BEGIN CERTIFICATE REQUEST")) throw "argument is not PEM file";
				var e = yc(a, "CERTIFICATE REQUEST");
				return d.subject.hex = c(e, 0, [0, 1]), d.subject.name = Pc.hex2dn(d.subject.hex), d.pubkey.hex = c(e, 0, [0, 2]), d.pubkey.obj = sd.getKey(d.pubkey.hex, null, "pkcs8pub"), d
			}, void 0 !== od && od || (od = {}), void 0 !== od.asn1 && od.asn1 || (od.asn1 = {}), void 0 !== od.asn1.ocsp && od.asn1.ocsp || (od.asn1.ocsp = {}), od.asn1.ocsp.DEFAULT_HASH = "sha1", od.asn1.ocsp.CertID = function(a) {
				var b = od,
					c = b.asn1,
					d = c.DEROctetString,
					e = c.DERInteger,
					f = c.DERSequence,
					g = c.x509,
					h = g.AlgorithmIdentifier,
					i = c.ocsp,
					j = i.DEFAULT_HASH,
					k = b.crypto,
					l = k.Util.hashHex,
					m = Pc,
					n = nd;
				if(i.CertID.superclass.constructor.call(this), this.dHashAlg = null, this.dIssuerNameHash = null, this.dIssuerKeyHash = null, this.dSerialNumber = null, this.setByValue = function(a, b, c, f) {
						void 0 === f && (f = j), this.dHashAlg = new h({
							name: f
						}), this.dIssuerNameHash = new d({
							hex: a
						}), this.dIssuerKeyHash = new d({
							hex: b
						}), this.dSerialNumber = new e({
							hex: c
						})
					}, this.setByCert = function(a, b, c) {
						void 0 === c && (c = j);
						var d = new m;
						d.readCertPEM(b);
						var e = new m;
						e.readCertPEM(a);
						var f = e.getPublicKeyHex(),
							g = n.getTLVbyList(f, 0, [1, 0], "30"),
							h = d.getSerialNumberHex(),
							i = l(e.getSubjectHex(), c),
							k = l(g, c);
						this.setByValue(i, k, h, c), this.hoge = d.getSerialNumberHex()
					}, this.getEncodedHex = function() {
						if(null === this.dHashAlg && null === this.dIssuerNameHash && null === this.dIssuerKeyHash && null === this.dSerialNumber) throw "not yet set values";
						var a = [this.dHashAlg, this.dIssuerNameHash, this.dIssuerKeyHash, this.dSerialNumber],
							b = new f({
								array: a
							});
						return this.hTLV = b.getEncodedHex(), this.hTLV
					}, void 0 !== a) {
					var o = a;
					if(void 0 !== o.issuerCert && void 0 !== o.subjectCert) {
						var p = j;
						void 0 === o.alg && (p = void 0), this.setByCert(o.issuerCert, o.subjectCert, p)
					} else {
						if(void 0 === o.namehash || void 0 === o.keyhash || void 0 === o.serial) throw "invalid constructor arguments";
						var p = j;
						void 0 === o.alg && (p = void 0), this.setByValue(o.namehash, o.keyhash, o.serial, p)
					}
				}
			}, Sc.lang.extend(od.asn1.ocsp.CertID, od.asn1.ASN1Object), od.asn1.ocsp.Request = function(a) {
				var b = od,
					c = b.asn1,
					d = c.DERSequence,
					e = c.ocsp;
				if(e.Request.superclass.constructor.call(this), this.dReqCert = null, this.dExt = null, this.getEncodedHex = function() {
						var a = [];
						if(null === this.dReqCert) throw "reqCert not set";
						a.push(this.dReqCert);
						var b = new d({
							array: a
						});
						return this.hTLV = b.getEncodedHex(), this.hTLV
					}, void 0 !== a) {
					var f = new e.CertID(a);
					this.dReqCert = f
				}
			}, Sc.lang.extend(od.asn1.ocsp.Request, od.asn1.ASN1Object), od.asn1.ocsp.TBSRequest = function(a) {
				var b = od,
					c = b.asn1,
					d = c.DERSequence,
					e = c.ocsp;
				e.TBSRequest.superclass.constructor.call(this), this.version = 0, this.dRequestorName = null, this.dRequestList = [], this.dRequestExt = null, this.setRequestListByParam = function(a) {
					for(var b = [], c = 0; c < a.length; c++) {
						var d = new e.Request(a[0]);
						b.push(d)
					}
					this.dRequestList = b
				}, this.getEncodedHex = function() {
					var a = [];
					if(0 !== this.version) throw "not supported version: " + this.version;
					if(null !== this.dRequestorName) throw "requestorName not supported";
					var b = new d({
						array: this.dRequestList
					});
					if(a.push(b), null !== this.dRequestExt) throw "requestExtensions not supported";
					var c = new d({
						array: a
					});
					return this.hTLV = c.getEncodedHex(), this.hTLV
				}, void 0 !== a && void 0 !== a.reqList && this.setRequestListByParam(a.reqList)
			}, Sc.lang.extend(od.asn1.ocsp.TBSRequest, od.asn1.ASN1Object), od.asn1.ocsp.OCSPRequest = function(a) {
				var b = od,
					c = b.asn1,
					d = c.DERSequence,
					e = c.ocsp;
				if(e.OCSPRequest.superclass.constructor.call(this), this.dTbsRequest = null, this.dOptionalSignature = null, this.getEncodedHex = function() {
						var a = [];
						if(null === this.dTbsRequest) throw "tbsRequest not set";
						if(a.push(this.dTbsRequest), null !== this.dOptionalSignature) throw "optionalSignature not supported";
						var b = new d({
							array: a
						});
						return this.hTLV = b.getEncodedHex(), this.hTLV
					}, void 0 !== a && void 0 !== a.reqList) {
					var f = new e.TBSRequest(a);
					this.dTbsRequest = f
				}
			}, Sc.lang.extend(od.asn1.ocsp.OCSPRequest, od.asn1.ASN1Object), od.asn1.ocsp.OCSPUtil = {}, od.asn1.ocsp.OCSPUtil.getRequestHex = function(a, b, c) {
				var d = od,
					e = d.asn1,
					f = e.ocsp;
				void 0 === c && (c = f.DEFAULT_HASH);
				var g = {
					alg: c,
					issuerCert: a,
					subjectCert: b
				};
				return new f.OCSPRequest({
					reqList: [g]
				}).getEncodedHex()
			}, od.asn1.ocsp.OCSPUtil.getOCSPResponseInfo = function(a) {
				var b = nd,
					c = b.getVbyList,
					d = b.getIdxbyList,
					c = b.getVbyList,
					e = b.getV,
					f = {};
				try {
					var g = c(a, 0, [0], "0a");
					f.responseStatus = parseInt(g, 16)
				} catch(a) {}
				if(0 !== f.responseStatus) return f;
				try {
					var h = d(a, 0, [1, 0, 1, 0, 0, 2, 0, 1]);
					"80" === a.substr(h, 2) ? f.certStatus = "good" : "a1" === a.substr(h, 2) ? (f.certStatus = "revoked", f.revocationTime = rc(c(a, h, [0]))) : "82" === a.substr(h, 2) && (f.certStatus = "unknown")
				} catch(a) {}
				try {
					var i = d(a, 0, [1, 0, 1, 0, 0, 2, 0, 2]);
					f.thisUpdate = rc(e(a, i))
				} catch(a) {}
				try {
					var j = d(a, 0, [1, 0, 1, 0, 0, 2, 0, 3]);
					"a0" === a.substr(j, 2) && (f.nextUpdate = rc(c(a, j, [0])))
				} catch(a) {}
				return f
			};
			var od;
			void 0 !== od && od || (od = {}), void 0 !== od.lang && od.lang || (od.lang = {}), od.lang.String = function() {};
			var pd, qd;
			"function" == typeof a ? (pd = function(b) {
				return kc(new a(b, "utf8").toString("base64"))
			}, qd = function(b) {
				return new a(lc(b), "base64").toString("utf8")
			}) : (pd = function(a) {
				return mc(Fc(Hc(a)))
			}, qd = function(a) {
				return decodeURIComponent(Gc(nc(a)))
			}), od.lang.String.isInteger = function(a) {
				return !!a.match(/^[0-9]+$/) || !!a.match(/^-[0-9]+$/)
			}, od.lang.String.isHex = function(a) {
				return !(a.length % 2 != 0 || !a.match(/^[0-9a-f]+$/) && !a.match(/^[0-9A-F]+$/))
			}, od.lang.String.isBase64 = function(a) {
				return a = a.replace(/\s+/g, ""), !(!a.match(/^[0-9A-Za-z+\/]+={0,3}$/) || a.length % 4 != 0)
			}, od.lang.String.isBase64URL = function(a) {
				return !a.match(/[+\/=]/) && (a = lc(a), od.lang.String.isBase64(a))
			}, od.lang.String.isIntegerArray = function(a) {
				return a = a.replace(/\s+/g, ""), !!a.match(/^\[[0-9,]+\]$/)
			};
			var rd = function(a, b) {
				var c = a.length;
				a.length > b.length && (c = b.length);
				for(var d = 0; d < c; d++)
					if(a.charCodeAt(d) != b.charCodeAt(d)) return d;
				return a.length != b.length ? c : -1
			};
			void 0 !== od && od || (od = {}), void 0 !== od.crypto && od.crypto || (od.crypto = {}), od.crypto.Util = new function() {
				this.DIGESTINFOHEAD = {
					sha1: "3021300906052b0e03021a05000414",
					sha224: "302d300d06096086480165030402040500041c",
					sha256: "3031300d060960864801650304020105000420",
					sha384: "3041300d060960864801650304020205000430",
					sha512: "3051300d060960864801650304020305000440",
					md2: "3020300c06082a864886f70d020205000410",
					md5: "3020300c06082a864886f70d020505000410",
					ripemd160: "3021300906052b2403020105000414"
				}, this.DEFAULTPROVIDER = {
					md5: "cryptojs",
					sha1: "cryptojs",
					sha224: "cryptojs",
					sha256: "cryptojs",
					sha384: "cryptojs",
					sha512: "cryptojs",
					ripemd160: "cryptojs",
					hmacmd5: "cryptojs",
					hmacsha1: "cryptojs",
					hmacsha224: "cryptojs",
					hmacsha256: "cryptojs",
					hmacsha384: "cryptojs",
					hmacsha512: "cryptojs",
					hmacripemd160: "cryptojs",
					MD5withRSA: "cryptojs/jsrsa",
					SHA1withRSA: "cryptojs/jsrsa",
					SHA224withRSA: "cryptojs/jsrsa",
					SHA256withRSA: "cryptojs/jsrsa",
					SHA384withRSA: "cryptojs/jsrsa",
					SHA512withRSA: "cryptojs/jsrsa",
					RIPEMD160withRSA: "cryptojs/jsrsa",
					MD5withECDSA: "cryptojs/jsrsa",
					SHA1withECDSA: "cryptojs/jsrsa",
					SHA224withECDSA: "cryptojs/jsrsa",
					SHA256withECDSA: "cryptojs/jsrsa",
					SHA384withECDSA: "cryptojs/jsrsa",
					SHA512withECDSA: "cryptojs/jsrsa",
					RIPEMD160withECDSA: "cryptojs/jsrsa",
					SHA1withDSA: "cryptojs/jsrsa",
					SHA224withDSA: "cryptojs/jsrsa",
					SHA256withDSA: "cryptojs/jsrsa",
					MD5withRSAandMGF1: "cryptojs/jsrsa",
					SHA1withRSAandMGF1: "cryptojs/jsrsa",
					SHA224withRSAandMGF1: "cryptojs/jsrsa",
					SHA256withRSAandMGF1: "cryptojs/jsrsa",
					SHA384withRSAandMGF1: "cryptojs/jsrsa",
					SHA512withRSAandMGF1: "cryptojs/jsrsa",
					RIPEMD160withRSAandMGF1: "cryptojs/jsrsa"
				}, this.CRYPTOJSMESSAGEDIGESTNAME = {
					md5: Tc.algo.MD5,
					sha1: Tc.algo.SHA1,
					sha224: Tc.algo.SHA224,
					sha256: Tc.algo.SHA256,
					sha384: Tc.algo.SHA384,
					sha512: Tc.algo.SHA512,
					ripemd160: Tc.algo.RIPEMD160
				}, this.getDigestInfoHex = function(a, b) {
					if(void 0 === this.DIGESTINFOHEAD[b]) throw "alg not supported in Util.DIGESTINFOHEAD: " + b;
					return this.DIGESTINFOHEAD[b] + a
				}, this.getPaddedDigestInfoHex = function(a, b, c) {
					var d = this.getDigestInfoHex(a, b),
						e = c / 4;
					if(d.length + 22 > e) throw "key is too short for SigAlg: keylen=" + c + "," + b;
					for(var f = "0001", g = "00" + d, h = "", i = e - f.length - g.length, j = 0; j < i; j += 2) h += "ff";
					return f + h + g
				}, this.hashString = function(a, b) {
					return new od.crypto.MessageDigest({
						alg: b
					}).digestString(a)
				}, this.hashHex = function(a, b) {
					return new od.crypto.MessageDigest({
						alg: b
					}).digestHex(a)
				}, this.sha1 = function(a) {
					return new od.crypto.MessageDigest({
						alg: "sha1",
						prov: "cryptojs"
					}).digestString(a)
				}, this.sha256 = function(a) {
					return new od.crypto.MessageDigest({
						alg: "sha256",
						prov: "cryptojs"
					}).digestString(a)
				}, this.sha256Hex = function(a) {
					return new od.crypto.MessageDigest({
						alg: "sha256",
						prov: "cryptojs"
					}).digestHex(a)
				}, this.sha512 = function(a) {
					return new od.crypto.MessageDigest({
						alg: "sha512",
						prov: "cryptojs"
					}).digestString(a)
				}, this.sha512Hex = function(a) {
					return new od.crypto.MessageDigest({
						alg: "sha512",
						prov: "cryptojs"
					}).digestHex(a)
				}
			}, od.crypto.Util.md5 = function(a) {
				return new od.crypto.MessageDigest({
					alg: "md5",
					prov: "cryptojs"
				}).digestString(a)
			}, od.crypto.Util.ripemd160 = function(a) {
				return new od.crypto.MessageDigest({
					alg: "ripemd160",
					prov: "cryptojs"
				}).digestString(a)
			}, od.crypto.Util.SECURERANDOMGEN = new lb, od.crypto.Util.getRandomHexOfNbytes = function(a) {
				var b = new Array(a);
				return od.crypto.Util.SECURERANDOMGEN.nextBytes(b), fc(b)
			}, od.crypto.Util.getRandomBigIntegerOfNbytes = function(a) {
				return new f(od.crypto.Util.getRandomHexOfNbytes(a), 16)
			}, od.crypto.Util.getRandomHexOfNbits = function(a) {
				var b = a % 8,
					c = (a - b) / 8,
					d = new Array(c + 1);
				return od.crypto.Util.SECURERANDOMGEN.nextBytes(d), d[0] = (255 << b & 255 ^ 255) & d[0], fc(d)
			}, od.crypto.Util.getRandomBigIntegerOfNbits = function(a) {
				return new f(od.crypto.Util.getRandomHexOfNbits(a), 16)
			}, od.crypto.Util.getRandomBigIntegerZeroToMax = function(a) {
				for(var b = a.bitLength();;) {
					var c = od.crypto.Util.getRandomBigIntegerOfNbits(b);
					if(-1 != a.compareTo(c)) return c
				}
			}, od.crypto.Util.getRandomBigIntegerMinToMax = function(a, b) {
				var c = a.compareTo(b);
				if(1 == c) throw "biMin is greater than biMax";
				if(0 == c) return a;
				var d = b.subtract(a);
				return od.crypto.Util.getRandomBigIntegerZeroToMax(d).add(a)
			}, od.crypto.MessageDigest = function(a) {
				this.setAlgAndProvider = function(a, b) {
					if(a = od.crypto.MessageDigest.getCanonicalAlgName(a), null !== a && void 0 === b && (b = od.crypto.Util.DEFAULTPROVIDER[a]), -1 != ":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(a) && "cryptojs" == b) {
						try {
							this.md = od.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[a].create()
						} catch(b) {
							throw "setAlgAndProvider hash alg set fail alg=" + a + "/" + b
						}
						this.updateString = function(a) {
							this.md.update(a)
						}, this.updateHex = function(a) {
							var b = Tc.enc.Hex.parse(a);
							this.md.update(b)
						}, this.digest = function() {
							return this.md.finalize().toString(Tc.enc.Hex)
						}, this.digestString = function(a) {
							return this.updateString(a), this.digest()
						}, this.digestHex = function(a) {
							return this.updateHex(a), this.digest()
						}
					}
					if(-1 != ":sha256:".indexOf(a) && "sjcl" == b) {
						try {
							this.md = new sjcl.hash.sha256
						} catch(b) {
							throw "setAlgAndProvider hash alg set fail alg=" + a + "/" + b
						}
						this.updateString = function(a) {
							this.md.update(a)
						}, this.updateHex = function(a) {
							var b = sjcl.codec.hex.toBits(a);
							this.md.update(b)
						}, this.digest = function() {
							var a = this.md.finalize();
							return sjcl.codec.hex.fromBits(a)
						}, this.digestString = function(a) {
							return this.updateString(a), this.digest()
						}, this.digestHex = function(a) {
							return this.updateHex(a), this.digest()
						}
					}
				}, this.updateString = function(a) {
					throw "updateString(str) not supported for this alg/prov: " + this.algName + "/" + this.provName
				}, this.updateHex = function(a) {
					throw "updateHex(hex) not supported for this alg/prov: " + this.algName + "/" + this.provName
				}, this.digest = function() {
					throw "digest() not supported for this alg/prov: " + this.algName + "/" + this.provName
				}, this.digestString = function(a) {
					throw "digestString(str) not supported for this alg/prov: " + this.algName + "/" + this.provName
				}, this.digestHex = function(a) {
					throw "digestHex(hex) not supported for this alg/prov: " + this.algName + "/" + this.provName
				}, void 0 !== a && void 0 !== a.alg && (this.algName = a.alg, void 0 === a.prov && (this.provName = od.crypto.Util.DEFAULTPROVIDER[this.algName]), this.setAlgAndProvider(this.algName, this.provName))
			}, od.crypto.MessageDigest.getCanonicalAlgName = function(a) {
				return "string" == typeof a && (a = a.toLowerCase(), a = a.replace(/-/, "")), a
			}, od.crypto.MessageDigest.getHashLength = function(a) {
				var b = od.crypto.MessageDigest,
					c = b.getCanonicalAlgName(a);
				if(void 0 === b.HASHLENGTH[c]) throw "not supported algorithm: " + a;
				return b.HASHLENGTH[c]
			}, od.crypto.MessageDigest.HASHLENGTH = {
				md5: 16,
				sha1: 20,
				sha224: 28,
				sha256: 32,
				sha384: 48,
				sha512: 64,
				ripemd160: 20
			}, od.crypto.Mac = function(a) {
				this.setAlgAndProvider = function(a, b) {
					if(a = a.toLowerCase(), null == a && (a = "hmacsha1"), a = a.toLowerCase(), "hmac" != a.substr(0, 4)) throw "setAlgAndProvider unsupported HMAC alg: " + a;
					void 0 === b && (b = od.crypto.Util.DEFAULTPROVIDER[a]), this.algProv = a + "/" + b;
					var c = a.substr(4);
					if(-1 != ":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(c) && "cryptojs" == b) {
						try {
							var d = od.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[c];
							this.mac = Tc.algo.HMAC.create(d, this.pass)
						} catch(a) {
							throw "setAlgAndProvider hash alg set fail hashAlg=" + c + "/" + a
						}
						this.updateString = function(a) {
							this.mac.update(a)
						}, this.updateHex = function(a) {
							var b = Tc.enc.Hex.parse(a);
							this.mac.update(b)
						}, this.doFinal = function() {
							return this.mac.finalize().toString(Tc.enc.Hex)
						}, this.doFinalString = function(a) {
							return this.updateString(a), this.doFinal()
						}, this.doFinalHex = function(a) {
							return this.updateHex(a), this.doFinal()
						}
					}
				}, this.updateString = function(a) {
					throw "updateString(str) not supported for this alg/prov: " + this.algProv
				}, this.updateHex = function(a) {
					throw "updateHex(hex) not supported for this alg/prov: " + this.algProv
				}, this.doFinal = function() {
					throw "digest() not supported for this alg/prov: " + this.algProv
				}, this.doFinalString = function(a) {
					throw "digestString(str) not supported for this alg/prov: " + this.algProv
				}, this.doFinalHex = function(a) {
					throw "digestHex(hex) not supported for this alg/prov: " + this.algProv
				}, this.setPassword = function(a) {
					if("string" == typeof a) {
						var b = a;
						return a.length % 2 != 1 && a.match(/^[0-9A-Fa-f]+$/) || (b = tc(a)), void(this.pass = Tc.enc.Hex.parse(b))
					}
					if("object" != typeof a) throw "KJUR.crypto.Mac unsupported password type: " + a;
					var b = null;
					if(void 0 !== a.hex) {
						if(a.hex.length % 2 != 0 || !a.hex.match(/^[0-9A-Fa-f]+$/)) throw "Mac: wrong hex password: " + a.hex;
						b = a.hex
					}
					if(void 0 !== a.utf8 && (b = qc(a.utf8)), void 0 !== a.rstr && (b = tc(a.rstr)), void 0 !== a.b64 && (b = d(a.b64)), void 0 !== a.b64u && (b = nc(a.b64u)), null == b) throw "KJUR.crypto.Mac unsupported password type: " + a;
					this.pass = Tc.enc.Hex.parse(b)
				}, void 0 !== a && (void 0 !== a.pass && this.setPassword(a.pass), void 0 !== a.alg && (this.algName = a.alg, void 0 === a.prov && (this.provName = od.crypto.Util.DEFAULTPROVIDER[this.algName]), this.setAlgAndProvider(this.algName, this.provName)))
			}, od.crypto.Signature = function(a) {
				if(this._setAlgNames = function() {
						var a = this.algName.match(/^(.+)with(.+)$/);
						a && (this.mdAlgName = a[1].toLowerCase(), this.pubkeyAlgName = a[2].toLowerCase())
					}, this._zeroPaddingOfSignature = function(a, b) {
						for(var c = "", d = b / 4 - a.length, e = 0; e < d; e++) c += "0";
						return c + a
					}, this.setAlgAndProvider = function(a, b) {
						if(this._setAlgNames(), "cryptojs/jsrsa" != b) throw "provider not supported: " + b;
						if(-1 != ":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(this.mdAlgName)) {
							try {
								this.md = new od.crypto.MessageDigest({
									alg: this.mdAlgName
								})
							} catch(a) {
								throw "setAlgAndProvider hash alg set fail alg=" + this.mdAlgName + "/" + a
							}
							this.init = function(a, b) {
								var c = null;
								try {
									c = void 0 === b ? sd.getKey(a) : sd.getKey(a, b)
								} catch(a) {
									throw "init failed:" + a
								}
								if(!0 === c.isPrivate) this.prvKey = c, this.state = "SIGN";
								else {
									if(!0 !== c.isPublic) throw "init failed.:" + c;
									this.pubKey = c, this.state = "VERIFY"
								}
							}, this.updateString = function(a) {
								this.md.updateString(a)
							}, this.updateHex = function(a) {
								this.md.updateHex(a)
							}, this.sign = function() {
								if(this.sHashHex = this.md.digest(), void 0 !== this.ecprvhex && void 0 !== this.eccurvename) {
									var a = new od.crypto.ECDSA({
										curve: this.eccurvename
									});
									this.hSign = a.signHex(this.sHashHex, this.ecprvhex)
								} else if(this.prvKey instanceof qb && "rsaandmgf1" == this.pubkeyAlgName) this.hSign = this.prvKey.signWithMessageHashPSS(this.sHashHex, this.mdAlgName, this.pssSaltLen);
								else if(this.prvKey instanceof qb && "rsa" == this.pubkeyAlgName) this.hSign = this.prvKey.signWithMessageHash(this.sHashHex, this.mdAlgName);
								else if(this.prvKey instanceof od.crypto.ECDSA) this.hSign = this.prvKey.signWithMessageHash(this.sHashHex);
								else {
									if(!(this.prvKey instanceof od.crypto.DSA)) throw "Signature: unsupported public key alg: " + this.pubkeyAlgName;
									this.hSign = this.prvKey.signWithMessageHash(this.sHashHex)
								}
								return this.hSign
							}, this.signString = function(a) {
								return this.updateString(a), this.sign()
							}, this.signHex = function(a) {
								return this.updateHex(a), this.sign()
							}, this.verify = function(a) {
								if(this.sHashHex = this.md.digest(), void 0 !== this.ecpubhex && void 0 !== this.eccurvename) return new od.crypto.ECDSA({
									curve: this.eccurvename
								}).verifyHex(this.sHashHex, a, this.ecpubhex);
								if(this.pubKey instanceof qb && "rsaandmgf1" == this.pubkeyAlgName) return this.pubKey.verifyWithMessageHashPSS(this.sHashHex, a, this.mdAlgName, this.pssSaltLen);
								if(this.pubKey instanceof qb && "rsa" === this.pubkeyAlgName) return this.pubKey.verifyWithMessageHash(this.sHashHex, a);
								if(void 0 !== od.crypto.ECDSA && this.pubKey instanceof od.crypto.ECDSA) return this.pubKey.verifyWithMessageHash(this.sHashHex, a);
								if(void 0 !== od.crypto.DSA && this.pubKey instanceof od.crypto.DSA) return this.pubKey.verifyWithMessageHash(this.sHashHex, a);
								throw "Signature: unsupported public key alg: " + this.pubkeyAlgName
							}
						}
					}, this.init = function(a, b) {
						throw "init(key, pass) not supported for this alg:prov=" + this.algProvName
					}, this.updateString = function(a) {
						throw "updateString(str) not supported for this alg:prov=" + this.algProvName
					}, this.updateHex = function(a) {
						throw "updateHex(hex) not supported for this alg:prov=" + this.algProvName
					}, this.sign = function() {
						throw "sign() not supported for this alg:prov=" + this.algProvName
					}, this.signString = function(a) {
						throw "digestString(str) not supported for this alg:prov=" + this.algProvName
					}, this.signHex = function(a) {
						throw "digestHex(hex) not supported for this alg:prov=" + this.algProvName
					}, this.verify = function(a) {
						throw "verify(hSigVal) not supported for this alg:prov=" + this.algProvName
					}, this.initParams = a, void 0 !== a && (void 0 !== a.alg && (this.algName = a.alg, void 0 === a.prov ? this.provName = od.crypto.Util.DEFAULTPROVIDER[this.algName] : this.provName = a.prov, this.algProvName = this.algName + ":" + this.provName, this.setAlgAndProvider(this.algName, this.provName), this._setAlgNames()), void 0 !== a.psssaltlen && (this.pssSaltLen = a.psssaltlen), void 0 !== a.prvkeypem)) {
					if(void 0 !== a.prvkeypas) throw "both prvkeypem and prvkeypas parameters not supported";
					try {
						sd.getKey(a.prvkeypem), this.init(null)
					} catch(a) {
						throw "fatal error to load pem private key: " + a
					}
				}
			}, od.crypto.Cipher = function(a) {}, od.crypto.Cipher.encrypt = function(a, b, c) {
				if(b instanceof qb && b.isPublic) {
					var d = od.crypto.Cipher.getAlgByKeyAndName(b, c);
					if("RSA" === d) return b.encrypt(a);
					if("RSAOAEP" === d) return b.encryptOAEP(a, "sha1");
					var e = d.match(/^RSAOAEP(\d+)$/);
					if(null !== e) return b.encryptOAEP(a, "sha" + e[1]);
					throw "Cipher.encrypt: unsupported algorithm for RSAKey: " + c
				}
				throw "Cipher.encrypt: unsupported key or algorithm"
			}, od.crypto.Cipher.decrypt = function(a, b, c) {
				if(b instanceof qb && b.isPrivate) {
					var d = od.crypto.Cipher.getAlgByKeyAndName(b, c);
					if("RSA" === d) return b.decrypt(a);
					if("RSAOAEP" === d) return b.decryptOAEP(a, "sha1");
					var e = d.match(/^RSAOAEP(\d+)$/);
					if(null !== e) return b.decryptOAEP(a, "sha" + e[1]);
					throw "Cipher.decrypt: unsupported algorithm for RSAKey: " + c
				}
				throw "Cipher.decrypt: unsupported key or algorithm"
			}, od.crypto.Cipher.getAlgByKeyAndName = function(a, b) {
				if(a instanceof qb) {
					if(-1 != ":RSA:RSAOAEP:RSAOAEP224:RSAOAEP256:RSAOAEP384:RSAOAEP512:".indexOf(b)) return b;
					if(null === b || void 0 === b) return "RSA";
					throw "getAlgByKeyAndName: not supported algorithm name for RSAKey: " + b
				}
				throw "getAlgByKeyAndName: not supported algorithm name: " + b
			}, od.crypto.OID = new function() {
				this.oidhex2name = {
					"2a864886f70d010101": "rsaEncryption",
					"2a8648ce3d0201": "ecPublicKey",
					"2a8648ce380401": "dsa",
					"2a8648ce3d030107": "secp256r1",
					"2b8104001f": "secp192k1",
					"2b81040021": "secp224r1",
					"2b8104000a": "secp256k1",
					"2b81040023": "secp521r1",
					"2b81040022": "secp384r1",
					"2a8648ce380403": "SHA1withDSA",
					"608648016503040301": "SHA224withDSA",
					"608648016503040302": "SHA256withDSA"
				}
			}, void 0 !== od && od || (od = {}), void 0 !== od.crypto && od.crypto || (od.crypto = {}), od.crypto.ECDSA = function(a) {
				var b = new lb;
				this.type = "EC", this.isPrivate = !1, this.isPublic = !1, this.getBigRandom = function(a) {
					return new f(a.bitLength(), b).mod(a.subtract(f.ONE)).add(f.ONE)
				}, this.setNamedCurve = function(a) {
					this.ecparams = od.crypto.ECParameterDB.getByName(a), this.prvKeyHex = null, this.pubKeyHex = null, this.curveName = a
				}, this.setPrivateKeyHex = function(a) {
					this.isPrivate = !0, this.prvKeyHex = a
				}, this.setPublicKeyHex = function(a) {
					this.isPublic = !0, this.pubKeyHex = a
				}, this.getPublicKeyXYHex = function() {
					var a = this.pubKeyHex;
					if("04" !== a.substr(0, 2)) throw "this method supports uncompressed format(04) only";
					var b = this.ecparams.keylen / 4;
					if(a.length !== 2 + 2 * b) throw "malformed public key hex length";
					var c = {};
					return c.x = a.substr(2, b), c.y = a.substr(2 + b), c
				}, this.getShortNISTPCurveName = function() {
					var a = this.curveName;
					return "secp256r1" === a || "NIST P-256" === a || "P-256" === a || "prime256v1" === a ? "P-256" : "secp384r1" === a || "NIST P-384" === a || "P-384" === a ? "P-384" : null
				}, this.generateKeyPairHex = function() {
					var a = this.ecparams.n,
						b = this.getBigRandom(a),
						c = this.ecparams.G.multiply(b),
						d = c.getX().toBigInteger(),
						e = c.getY().toBigInteger(),
						f = this.ecparams.keylen / 4,
						g = ("0000000000" + b.toString(16)).slice(-f),
						h = ("0000000000" + d.toString(16)).slice(-f),
						i = ("0000000000" + e.toString(16)).slice(-f),
						j = "04" + h + i;
					return this.setPrivateKeyHex(g), this.setPublicKeyHex(j), {
						ecprvhex: g,
						ecpubhex: j
					}
				}, this.signWithMessageHash = function(a) {
					return this.signHex(a, this.prvKeyHex)
				}, this.signHex = function(a, b) {
					var c = new f(b, 16),
						d = this.ecparams.n,
						e = new f(a, 16);
					do {
						var g = this.getBigRandom(d),
							h = this.ecparams.G,
							i = h.multiply(g),
							j = i.getX().toBigInteger().mod(d)
					} while (j.compareTo(f.ZERO) <= 0);
					var k = g.modInverse(d).multiply(e.add(c.multiply(j))).mod(d);
					return od.crypto.ECDSA.biRSSigToASN1Sig(j, k)
				}, this.sign = function(a, b) {
					var c = b,
						d = this.ecparams.n,
						e = f.fromByteArrayUnsigned(a);
					do {
						var g = this.getBigRandom(d),
							h = this.ecparams.G,
							i = h.multiply(g),
							j = i.getX().toBigInteger().mod(d)
					} while (j.compareTo(f.ZERO) <= 0);
					var k = g.modInverse(d).multiply(e.add(c.multiply(j))).mod(d);
					return this.serializeSig(j, k)
				}, this.verifyWithMessageHash = function(a, b) {
					return this.verifyHex(a, b, this.pubKeyHex)
				}, this.verifyHex = function(a, b, c) {
					var d, e, g = od.crypto.ECDSA.parseSigHex(b);
					d = g.r, e = g.s;
					var h;
					h = Nb.decodeFromHex(this.ecparams.curve, c);
					var i = new f(a, 16);
					return this.verifyRaw(i, d, e, h)
				}, this.verify = function(a, b, c) {
					var d, e;
					if(Bitcoin.Util.isArray(b)) {
						var g = this.parseSig(b);
						d = g.r, e = g.s
					} else {
						if("object" != typeof b || !b.r || !b.s) throw "Invalid value for signature";
						d = b.r, e = b.s
					}
					var h;
					if(c instanceof Nb) h = c;
					else {
						if(!Bitcoin.Util.isArray(c)) throw "Invalid format for pubkey value, must be byte array or ECPointFp";
						h = Nb.decodeFrom(this.ecparams.curve, c)
					}
					var i = f.fromByteArrayUnsigned(a);
					return this.verifyRaw(i, d, e, h)
				}, this.verifyRaw = function(a, b, c, d) {
					var e = this.ecparams.n,
						g = this.ecparams.G;
					if(b.compareTo(f.ONE) < 0 || b.compareTo(e) >= 0) return !1;
					if(c.compareTo(f.ONE) < 0 || c.compareTo(e) >= 0) return !1;
					var h = c.modInverse(e),
						i = a.multiply(h).mod(e),
						j = b.multiply(h).mod(e);
					return g.multiply(i).add(d.multiply(j)).getX().toBigInteger().mod(e).equals(b)
				}, this.serializeSig = function(a, b) {
					var c = a.toByteArraySigned(),
						d = b.toByteArraySigned(),
						e = [];
					return e.push(2), e.push(c.length), e = e.concat(c), e.push(2), e.push(d.length), e = e.concat(d), e.unshift(e.length), e.unshift(48), e
				}, this.parseSig = function(a) {
					var b;
					if(48 != a[0]) throw new Error("Signature not a valid DERSequence");
					if(b = 2, 2 != a[b]) throw new Error("First element in signature must be a DERInteger");
					var c = a.slice(b + 2, b + 2 + a[b + 1]);
					if(b += 2 + a[b + 1], 2 != a[b]) throw new Error("Second element in signature must be a DERInteger");
					var d = a.slice(b + 2, b + 2 + a[b + 1]);
					return b += 2 + a[b + 1], {
						r: f.fromByteArrayUnsigned(c),
						s: f.fromByteArrayUnsigned(d)
					}
				}, this.parseSigCompact = function(a) {
					if(65 !== a.length) throw "Signature has the wrong length";
					var b = a[0] - 27;
					if(b < 0 || b > 7) throw "Invalid signature type";
					var c = this.ecparams.n;
					return {
						r: f.fromByteArrayUnsigned(a.slice(1, 33)).mod(c),
						s: f.fromByteArrayUnsigned(a.slice(33, 65)).mod(c),
						i: b
					}
				}, this.readPKCS5PrvKeyHex = function(a) {
					var b = nd,
						c = od.crypto.ECDSA.getName,
						d = b.getVbyList;
					if(!1 === b.isASN1HEX(a)) throw "not ASN.1 hex string";
					var e, f, g;
					try {
						e = d(a, 0, [2, 0], "06"), f = d(a, 0, [1], "04");
						try {
							g = d(a, 0, [3, 0], "03").substr(2)
						} catch(a) {}
					} catch(a) {
						throw "malformed PKCS#1/5 plain ECC private key"
					}
					if(this.curveName = c(e), void 0 === this.curveName) throw "unsupported curve name";
					this.setNamedCurve(this.curveName), this.setPublicKeyHex(g), this.setPrivateKeyHex(f), this.isPublic = !1
				}, this.readPKCS8PrvKeyHex = function(a) {
					var b = nd,
						c = od.crypto.ECDSA.getName,
						d = b.getVbyList;
					if(!1 === b.isASN1HEX(a)) throw "not ASN.1 hex string";
					var e, f, g;
					try {
						d(a, 0, [1, 0], "06"), e = d(a, 0, [1, 1], "06"), f = d(a, 0, [2, 0, 1], "04");
						try {
							g = d(a, 0, [2, 0, 2, 0], "03").substr(2)
						} catch(a) {}
					} catch(a) {
						throw "malformed PKCS#8 plain ECC private key"
					}
					if(this.curveName = c(e), void 0 === this.curveName) throw "unsupported curve name";
					this.setNamedCurve(this.curveName), this.setPublicKeyHex(g), this.setPrivateKeyHex(f), this.isPublic = !1
				}, this.readPKCS8PubKeyHex = function(a) {
					var b = nd,
						c = od.crypto.ECDSA.getName,
						d = b.getVbyList;
					if(!1 === b.isASN1HEX(a)) throw "not ASN.1 hex string";
					var e, f;
					try {
						d(a, 0, [0, 0], "06"), e = d(a, 0, [0, 1], "06"), f = d(a, 0, [1], "03").substr(2)
					} catch(a) {
						throw "malformed PKCS#8 ECC public key"
					}
					if(this.curveName = c(e), null === this.curveName) throw "unsupported curve name";
					this.setNamedCurve(this.curveName), this.setPublicKeyHex(f)
				}, this.readCertPubKeyHex = function(a, b) {
					5 !== b && (b = 6);
					var c = nd,
						d = od.crypto.ECDSA.getName,
						e = c.getVbyList;
					if(!1 === c.isASN1HEX(a)) throw "not ASN.1 hex string";
					var f, g;
					try {
						f = e(a, 0, [0, b, 0, 1], "06"), g = e(a, 0, [0, b, 1], "03").substr(2)
					} catch(a) {
						throw "malformed X.509 certificate ECC public key"
					}
					if(this.curveName = d(f), null === this.curveName) throw "unsupported curve name";
					this.setNamedCurve(this.curveName), this.setPublicKeyHex(g)
				}, void 0 !== a && void 0 !== a.curve && (this.curveName = a.curve), void 0 === this.curveName && (this.curveName = "secp256r1"), this.setNamedCurve(this.curveName), void 0 !== a && (void 0 !== a.prv && this.setPrivateKeyHex(a.prv), void 0 !== a.pub && this.setPublicKeyHex(a.pub))
			}, od.crypto.ECDSA.parseSigHex = function(a) {
				var b = od.crypto.ECDSA.parseSigHexInHexRS(a);
				return {
					r: new f(b.r, 16),
					s: new f(b.s, 16)
				}
			}, od.crypto.ECDSA.parseSigHexInHexRS = function(a) {
				var b = nd,
					c = b.getChildIdx,
					d = b.getV;
				if("30" != a.substr(0, 2)) throw "signature is not a ASN.1 sequence";
				var e = c(a, 0);
				if(2 != e.length) throw "number of signature ASN.1 sequence elements seem wrong";
				var f = e[0],
					g = e[1];
				if("02" != a.substr(f, 2)) throw "1st item of sequene of signature is not ASN.1 integer";
				if("02" != a.substr(g, 2)) throw "2nd item of sequene of signature is not ASN.1 integer";
				return {
					r: d(a, f),
					s: d(a, g)
				}
			}, od.crypto.ECDSA.asn1SigToConcatSig = function(a) {
				var b = od.crypto.ECDSA.parseSigHexInHexRS(a),
					c = b.r,
					d = b.s;
				if("00" == c.substr(0, 2) && c.length / 2 * 8 % 128 == 8 && (c = c.substr(2)), "00" == d.substr(0, 2) && d.length / 2 * 8 % 128 == 8 && (d = d.substr(2)), c.length / 2 * 8 % 128 != 0) throw "unknown ECDSA sig r length error";
				if(d.length / 2 * 8 % 128 != 0) throw "unknown ECDSA sig s length error";
				return c + d
			}, od.crypto.ECDSA.concatSigToASN1Sig = function(a) {
				if(a.length / 2 * 8 % 128 != 0) throw "unknown ECDSA concatinated r-s sig  length error";
				var b = a.substr(0, a.length / 2),
					c = a.substr(a.length / 2);
				return od.crypto.ECDSA.hexRSSigToASN1Sig(b, c)
			}, od.crypto.ECDSA.hexRSSigToASN1Sig = function(a, b) {
				var c = new f(a, 16),
					d = new f(b, 16);
				return od.crypto.ECDSA.biRSSigToASN1Sig(c, d)
			}, od.crypto.ECDSA.biRSSigToASN1Sig = function(a, b) {
				var c = od.asn1,
					d = new c.DERInteger({
						bigint: a
					}),
					e = new c.DERInteger({
						bigint: b
					});
				return new c.DERSequence({
					array: [d, e]
				}).getEncodedHex()
			}, od.crypto.ECDSA.getName = function(a) {
				return "2a8648ce3d030107" === a ? "secp256r1" : "2b8104000a" === a ? "secp256k1" : "2b81040022" === a ? "secp384r1" : -1 !== "|secp256r1|NIST P-256|P-256|prime256v1|".indexOf(a) ? "secp256r1" : -1 !== "|secp256k1|".indexOf(a) ? "secp256k1" : -1 !== "|secp384r1|NIST P-384|P-384|".indexOf(a) ? "secp384r1" : null
			}, void 0 !== od && od || (od = {}), void 0 !== od.crypto && od.crypto || (od.crypto = {}), od.crypto.ECParameterDB = new function() {
				function a(a) {
					return new f(a, 16)
				}
				var b = {},
					c = {};
				this.getByName = function(a) {
					var d = a;
					if(void 0 !== c[d] && (d = c[a]), void 0 !== b[d]) return b[d];
					throw "unregistered EC curve name: " + d
				}, this.regist = function(d, e, f, g, h, i, j, k, l, m, n, o) {
					b[d] = {};
					var p = a(f),
						q = a(g),
						r = a(h),
						s = a(i),
						t = a(j),
						u = new Xb(p, q, r),
						v = u.decodePointHex("04" + k + l);
					b[d].name = d, b[d].keylen = e, b[d].curve = u, b[d].G = v, b[d].n = s, b[d].h = t, b[d].oid = n, b[d].info = o;
					for(var w = 0; w < m.length; w++) c[m[w]] = d
				}
			}, od.crypto.ECParameterDB.regist("secp128r1", 128, "FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFF", "FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFC", "E87579C11079F43DD824993C2CEE5ED3", "FFFFFFFE0000000075A30D1B9038A115", "1", "161FF7528B899B2D0C28607CA52C5B86", "CF5AC8395BAFEB13C02DA292DDED7A83", [], "", "secp128r1 : SECG curve over a 128 bit prime field"), od.crypto.ECParameterDB.regist("secp160k1", 160, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFAC73", "0", "7", "0100000000000000000001B8FA16DFAB9ACA16B6B3", "1", "3B4C382CE37AA192A4019E763036F4F5DD4D7EBB", "938CF935318FDCED6BC28286531733C3F03C4FEE", [], "", "secp160k1 : SECG curve over a 160 bit prime field"), od.crypto.ECParameterDB.regist("secp160r1", 160, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFC", "1C97BEFC54BD7A8B65ACF89F81D4D4ADC565FA45", "0100000000000000000001F4C8F927AED3CA752257", "1", "4A96B5688EF573284664698968C38BB913CBFC82", "23A628553168947D59DCC912042351377AC5FB32", [], "", "secp160r1 : SECG curve over a 160 bit prime field"), od.crypto.ECParameterDB.regist("secp192k1", 192, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFEE37", "0", "3", "FFFFFFFFFFFFFFFFFFFFFFFE26F2FC170F69466A74DEFD8D", "1", "DB4FF10EC057E9AE26B07D0280B7F4341DA5D1B1EAE06C7D", "9B2F2F6D9C5628A7844163D015BE86344082AA88D95E2F9D", []), od.crypto.ECParameterDB.regist("secp192r1", 192, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFC", "64210519E59C80E70FA7E9AB72243049FEB8DEECC146B9B1", "FFFFFFFFFFFFFFFFFFFFFFFF99DEF836146BC9B1B4D22831", "1", "188DA80EB03090F67CBF20EB43A18800F4FF0AFD82FF1012", "07192B95FFC8DA78631011ED6B24CDD573F977A11E794811", []), od.crypto.ECParameterDB.regist("secp224r1", 224, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF000000000000000000000001", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFE", "B4050A850C04B3ABF54132565044B0B7D7BFD8BA270B39432355FFB4", "FFFFFFFFFFFFFFFFFFFFFFFFFFFF16A2E0B8F03E13DD29455C5C2A3D", "1", "B70E0CBD6BB4BF7F321390B94A03C1D356C21122343280D6115C1D21", "BD376388B5F723FB4C22DFE6CD4375A05A07476444D5819985007E34", []), od.crypto.ECParameterDB.regist("secp256k1", 256, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F", "0", "7", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141", "1", "79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798", "483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8", []), od.crypto.ECParameterDB.regist("secp256r1", 256, "FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFF", "FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFC", "5AC635D8AA3A93E7B3EBBD55769886BC651D06B0CC53B0F63BCE3C3E27D2604B", "FFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551", "1", "6B17D1F2E12C4247F8BCE6E563A440F277037D812DEB33A0F4A13945D898C296", "4FE342E2FE1A7F9B8EE7EB4A7C0F9E162BCE33576B315ECECBB6406837BF51F5", ["NIST P-256", "P-256", "prime256v1"]), od.crypto.ECParameterDB.regist("secp384r1", 384, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFF0000000000000000FFFFFFFF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFF0000000000000000FFFFFFFC", "B3312FA7E23EE7E4988E056BE3F82D19181D9C6EFE8141120314088F5013875AC656398D8A2ED19D2A85C8EDD3EC2AEF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC7634D81F4372DDF581A0DB248B0A77AECEC196ACCC52973", "1", "AA87CA22BE8B05378EB1C71EF320AD746E1D3B628BA79B9859F741E082542A385502F25DBF55296C3A545E3872760AB7", "3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f", ["NIST P-384", "P-384"]), od.crypto.ECParameterDB.regist("secp521r1", 521, "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC", "051953EB9618E1C9A1F929A21A0B68540EEA2DA725B99B315F3B8B489918EF109E156193951EC7E937B1652C0BD3BB1BF073573DF883D2C34F1EF451FD46B503F00", "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFA51868783BF2F966B7FCC0148F709A5D03BB5C9B8899C47AEBB6FB71E91386409", "1", "C6858E06B70404E9CD9E3ECB662395B4429C648139053FB521F828AF606B4D3DBAA14B5E77EFE75928FE1DC127A2FFA8DE3348B3C1856A429BF97E7E31C2E5BD66", "011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650", ["NIST P-521", "P-521"]), void 0 !== od && od || (od = {}), void 0 !== od.crypto && od.crypto || (od.crypto = {}), od.crypto.DSA = function() {
				this.p = null, this.q = null, this.g = null, this.y = null, this.x = null, this.type = "DSA", this.isPrivate = !1, this.isPublic = !1, this.setPrivate = function(a, b, c, d, e) {
					this.isPrivate = !0, this.p = a, this.q = b, this.g = c, this.y = d, this.x = e
				}, this.setPrivateHex = function(a, b, c, d, e) {
					var g, h, i, j, k;
					g = new f(a, 16), h = new f(b, 16), i = new f(c, 16), j = "string" == typeof d && d.length > 1 ? new f(d, 16) : null, k = new f(e, 16), this.setPrivate(g, h, i, j, k)
				}, this.setPublic = function(a, b, c, d) {
					this.isPublic = !0, this.p = a, this.q = b, this.g = c, this.y = d, this.x = null
				}, this.setPublicHex = function(a, b, c, d) {
					var e, g, h, i;
					e = new f(a, 16), g = new f(b, 16), h = new f(c, 16), i = new f(d, 16), this.setPublic(e, g, h, i)
				}, this.signWithMessageHash = function(a) {
					var b = this.p,
						c = this.q,
						d = this.g,
						e = (this.y, this.x),
						g = od.crypto.Util.getRandomBigIntegerMinToMax(f.ONE.add(f.ONE), c.subtract(f.ONE)),
						h = a.substr(0, c.bitLength() / 4),
						i = new f(h, 16),
						j = d.modPow(g, b).mod(c),
						k = g.modInverse(c).multiply(i.add(e.multiply(j))).mod(c);
					return od.asn1.ASN1Util.jsonToASN1HEX({
						seq: [{
							int: {
								bigint: j
							}
						}, {
							int: {
								bigint: k
							}
						}]
					})
				}, this.verifyWithMessageHash = function(a, b) {
					var c = this.p,
						d = this.q,
						e = this.g,
						g = this.y,
						h = this.parseASN1Signature(b),
						i = h[0],
						j = h[1],
						k = a.substr(0, d.bitLength() / 4),
						l = new f(k, 16);
					if(f.ZERO.compareTo(i) > 0 || i.compareTo(d) > 0) throw "invalid DSA signature";
					if(f.ZERO.compareTo(j) >= 0 || j.compareTo(d) > 0) throw "invalid DSA signature";
					var m = j.modInverse(d),
						n = l.multiply(m).mod(d),
						o = i.multiply(m).mod(d);
					return 0 == e.modPow(n, c).multiply(g.modPow(o, c)).mod(c).mod(d).compareTo(i)
				}, this.parseASN1Signature = function(a) {
					try {
						return [new f(nd.getVbyList(a, 0, [0], "02"), 16), new f(nd.getVbyList(a, 0, [1], "02"), 16)]
					} catch(a) {
						throw "malformed ASN.1 DSA signature"
					}
				}, this.readPKCS5PrvKeyHex = function(a) {
					var b, c, d, e, f, g = nd,
						h = g.getVbyList;
					if(!1 === g.isASN1HEX(a)) throw "not ASN.1 hex string";
					try {
						b = h(a, 0, [1], "02"), c = h(a, 0, [2], "02"), d = h(a, 0, [3], "02"), e = h(a, 0, [4], "02"), f = h(a, 0, [5], "02")
					} catch(a) {
						throw console.log("EXCEPTION:" + a), "malformed PKCS#1/5 plain DSA private key"
					}
					this.setPrivateHex(b, c, d, e, f)
				}, this.readPKCS8PrvKeyHex = function(a) {
					var b, c, d, e, f = nd,
						g = f.getVbyList;
					if(!1 === f.isASN1HEX(a)) throw "not ASN.1 hex string";
					try {
						b = g(a, 0, [1, 1, 0], "02"), c = g(a, 0, [1, 1, 1], "02"), d = g(a, 0, [1, 1, 2], "02"), e = g(a, 0, [2, 0], "02")
					} catch(a) {
						throw console.log("EXCEPTION:" + a), "malformed PKCS#8 plain DSA private key"
					}
					this.setPrivateHex(b, c, d, null, e)
				}, this.readPKCS8PubKeyHex = function(a) {
					var b, c, d, e, f = nd,
						g = f.getVbyList;
					if(!1 === f.isASN1HEX(a)) throw "not ASN.1 hex string";
					try {
						b = g(a, 0, [0, 1, 0], "02"), c = g(a, 0, [0, 1, 1], "02"), d = g(a, 0, [0, 1, 2], "02"), e = g(a, 0, [1, 0], "02")
					} catch(a) {
						throw console.log("EXCEPTION:" + a), "malformed PKCS#8 DSA public key"
					}
					this.setPublicHex(b, c, d, e)
				}, this.readCertPubKeyHex = function(a, b) {
					5 !== b && (b = 6);
					var c, d, e, f, g = nd,
						h = g.getVbyList;
					if(!1 === g.isASN1HEX(a)) throw "not ASN.1 hex string";
					try {
						c = h(a, 0, [0, b, 0, 1, 0], "02"), d = h(a, 0, [0, b, 0, 1, 1], "02"), e = h(a, 0, [0, b, 0, 1, 2], "02"), f = h(a, 0, [0, b, 1, 0], "02")
					} catch(a) {
						throw console.log("EXCEPTION:" + a), "malformed X.509 certificate DSA public key"
					}
					this.setPublicHex(c, d, e, f)
				}
			};
			var sd = function() {
				var a = function(a, b, c) {
						return d(Tc.AES, a, b, c)
					},
					b = function(a, b, c) {
						return d(Tc.TripleDES, a, b, c)
					},
					c = function(a, b, c) {
						return d(Tc.DES, a, b, c)
					},
					d = function(a, b, c, d) {
						var e = Tc.enc.Hex.parse(b),
							f = Tc.enc.Hex.parse(c),
							g = Tc.enc.Hex.parse(d),
							h = {};
						h.key = f, h.iv = g, h.ciphertext = e;
						var i = a.decrypt(h, f, {
							iv: g
						});
						return Tc.enc.Hex.stringify(i)
					},
					e = function(a, b, c) {
						return h(Tc.AES, a, b, c)
					},
					f = function(a, b, c) {
						return h(Tc.TripleDES, a, b, c)
					},
					g = function(a, b, c) {
						return h(Tc.DES, a, b, c)
					},
					h = function(a, b, c, d) {
						var e = Tc.enc.Hex.parse(b),
							f = Tc.enc.Hex.parse(c),
							g = Tc.enc.Hex.parse(d),
							h = a.encrypt(e, f, {
								iv: g
							}),
							i = Tc.enc.Hex.parse(h.toString());
						return Tc.enc.Base64.stringify(i)
					},
					i = {
						"AES-256-CBC": {
							proc: a,
							eproc: e,
							keylen: 32,
							ivlen: 16
						},
						"AES-192-CBC": {
							proc: a,
							eproc: e,
							keylen: 24,
							ivlen: 16
						},
						"AES-128-CBC": {
							proc: a,
							eproc: e,
							keylen: 16,
							ivlen: 16
						},
						"DES-EDE3-CBC": {
							proc: b,
							eproc: f,
							keylen: 24,
							ivlen: 8
						},
						"DES-CBC": {
							proc: c,
							eproc: g,
							keylen: 8,
							ivlen: 8
						}
					},
					j = function(a) {
						var b = Tc.lib.WordArray.random(a);
						return Tc.enc.Hex.stringify(b)
					},
					k = function(a) {
						var b = {},
							c = a.match(new RegExp("DEK-Info: ([^,]+),([0-9A-Fa-f]+)", "m"));
						c && (b.cipher = c[1], b.ivsalt = c[2]);
						var d = a.match(new RegExp("-----BEGIN ([A-Z]+) PRIVATE KEY-----"));
						d && (b.type = d[1]);
						var e = -1,
							f = 0; - 1 != a.indexOf("\r\n\r\n") && (e = a.indexOf("\r\n\r\n"), f = 2), -1 != a.indexOf("\n\n") && (e = a.indexOf("\n\n"), f = 1);
						var g = a.indexOf("-----END");
						if(-1 != e && -1 != g) {
							var h = a.substring(e + 2 * f, g - f);
							h = h.replace(/\s+/g, ""), b.data = h
						}
						return b
					},
					l = function(a, b, c) {
						for(var d = c.substring(0, 16), e = Tc.enc.Hex.parse(d), f = Tc.enc.Utf8.parse(b), g = i[a].keylen + i[a].ivlen, h = "", j = null;;) {
							var k = Tc.algo.MD5.create();
							if(null != j && k.update(j), k.update(f), k.update(e), j = k.finalize(), h += Tc.enc.Hex.stringify(j), h.length >= 2 * g) break
						}
						var l = {};
						return l.keyhex = h.substr(0, 2 * i[a].keylen), l.ivhex = h.substr(2 * i[a].keylen, 2 * i[a].ivlen), l
					},
					m = function(a, b, c, d) {
						var e = Tc.enc.Base64.parse(a),
							f = Tc.enc.Hex.stringify(e);
						return(0, i[b].proc)(f, c, d)
					},
					n = function(a, b, c, d) {
						return(0, i[b].eproc)(a, c, d)
					};
				return {
					version: "1.0.0",
					parsePKCS5PEM: function(a) {
						return k(a)
					},
					getKeyAndUnusedIvByPasscodeAndIvsalt: function(a, b, c) {
						return l(a, b, c)
					},
					decryptKeyB64: function(a, b, c, d) {
						return m(a, b, c, d)
					},
					getDecryptedKeyHex: function(a, b) {
						var c = k(a),
							d = (c.type, c.cipher),
							e = c.ivsalt,
							f = c.data,
							g = l(d, b, e),
							h = g.keyhex;
						return m(f, d, h, e)
					},
					getEncryptedPKCS5PEMFromPrvKeyHex: function(a, b, c, d, e) {
						var f = "";
						if(void 0 !== d && null != d || (d = "AES-256-CBC"), void 0 === i[d]) throw "KEYUTIL unsupported algorithm: " + d;
						if(void 0 === e || null == e) {
							var g = i[d].ivlen;
							e = j(g).toUpperCase()
						}
						var h = l(d, c, e),
							k = h.keyhex,
							m = n(b, d, k, e),
							o = m.replace(/(.{64})/g, "$1\r\n"),
							f = "-----BEGIN " + a + " PRIVATE KEY-----\r\n";
						return f += "Proc-Type: 4,ENCRYPTED\r\n", f += "DEK-Info: " + d + "," + e + "\r\n", f += "\r\n", f += o, f += "\r\n-----END " + a + " PRIVATE KEY-----\r\n"
					},
					parseHexOfEncryptedPKCS8: function(a) {
						var b = nd,
							c = b.getChildIdx,
							d = b.getV,
							e = {},
							f = c(a, 0);
						if(2 != f.length) throw "malformed format: SEQUENCE(0).items != 2: " + f.length;
						e.ciphertext = d(a, f[1]);
						var g = c(a, f[0]);
						if(2 != g.length) throw "malformed format: SEQUENCE(0.0).items != 2: " + g.length;
						if("2a864886f70d01050d" != d(a, g[0])) throw "this only supports pkcs5PBES2";
						var h = c(a, g[1]);
						if(2 != g.length) throw "malformed format: SEQUENCE(0.0.1).items != 2: " + h.length;
						var i = c(a, h[1]);
						if(2 != i.length) throw "malformed format: SEQUENCE(0.0.1.1).items != 2: " + i.length;
						if("2a864886f70d0307" != d(a, i[0])) throw "this only supports TripleDES";
						e.encryptionSchemeAlg = "TripleDES", e.encryptionSchemeIV = d(a, i[1]);
						var j = c(a, h[0]);
						if(2 != j.length) throw "malformed format: SEQUENCE(0.0.1.0).items != 2: " + j.length;
						if("2a864886f70d01050c" != d(a, j[0])) throw "this only supports pkcs5PBKDF2";
						var k = c(a, j[1]);
						if(k.length < 2) throw "malformed format: SEQUENCE(0.0.1.0.1).items < 2: " + k.length;
						e.pbkdf2Salt = d(a, k[0]);
						var l = d(a, k[1]);
						try {
							e.pbkdf2Iter = parseInt(l, 16)
						} catch(a) {
							throw "malformed format pbkdf2Iter: " + l
						}
						return e
					},
					getPBKDF2KeyHexFromParam: function(a, b) {
						var c = Tc.enc.Hex.parse(a.pbkdf2Salt),
							d = a.pbkdf2Iter,
							e = Tc.PBKDF2(b, c, {
								keySize: 6,
								iterations: d
							});
						return Tc.enc.Hex.stringify(e)
					},
					_getPlainPKCS8HexFromEncryptedPKCS8PEM: function(a, b) {
						var c = yc(a, "ENCRYPTED PRIVATE KEY"),
							d = this.parseHexOfEncryptedPKCS8(c),
							e = sd.getPBKDF2KeyHexFromParam(d, b),
							f = {};
						f.ciphertext = Tc.enc.Hex.parse(d.ciphertext);
						var g = Tc.enc.Hex.parse(e),
							h = Tc.enc.Hex.parse(d.encryptionSchemeIV),
							i = Tc.TripleDES.decrypt(f, g, {
								iv: h
							});
						return Tc.enc.Hex.stringify(i)
					},
					getKeyFromEncryptedPKCS8PEM: function(a, b) {
						var c = this._getPlainPKCS8HexFromEncryptedPKCS8PEM(a, b);
						return this.getKeyFromPlainPrivatePKCS8Hex(c)
					},
					parsePlainPrivatePKCS8Hex: function(a) {
						var b = nd,
							c = b.getChildIdx,
							d = b.getV,
							e = {};
						if(e.algparam = null, "30" != a.substr(0, 2)) throw "malformed plain PKCS8 private key(code:001)";
						var f = c(a, 0);
						if(3 != f.length) throw "malformed plain PKCS8 private key(code:002)";
						if("30" != a.substr(f[1], 2)) throw "malformed PKCS8 private key(code:003)";
						var g = c(a, f[1]);
						if(2 != g.length) throw "malformed PKCS8 private key(code:004)";
						if("06" != a.substr(g[0], 2)) throw "malformed PKCS8 private key(code:005)";
						if(e.algoid = d(a, g[0]), "06" == a.substr(g[1], 2) && (e.algparam = d(a, g[1])), "04" != a.substr(f[2], 2)) throw "malformed PKCS8 private key(code:006)";
						return e.keyidx = b.getVidx(a, f[2]), e
					},
					getKeyFromPlainPrivatePKCS8PEM: function(a) {
						var b = yc(a, "PRIVATE KEY");
						return this.getKeyFromPlainPrivatePKCS8Hex(b)
					},
					getKeyFromPlainPrivatePKCS8Hex: function(a) {
						var b, c = this.parsePlainPrivatePKCS8Hex(a);
						if("2a864886f70d010101" == c.algoid) b = new qb;
						else if("2a8648ce380401" == c.algoid) b = new od.crypto.DSA;
						else {
							if("2a8648ce3d0201" != c.algoid) throw "unsupported private key algorithm";
							b = new od.crypto.ECDSA
						}
						return b.readPKCS8PrvKeyHex(a), b
					},
					_getKeyFromPublicPKCS8Hex: function(a) {
						var b, c = nd.getVbyList(a, 0, [0, 0], "06");
						if("2a864886f70d010101" === c) b = new qb;
						else if("2a8648ce380401" === c) b = new od.crypto.DSA;
						else {
							if("2a8648ce3d0201" !== c) throw "unsupported PKCS#8 public key hex";
							b = new od.crypto.ECDSA
						}
						return b.readPKCS8PubKeyHex(a), b
					},
					parsePublicRawRSAKeyHex: function(a) {
						var b = nd,
							c = b.getChildIdx,
							d = b.getV,
							e = {};
						if("30" != a.substr(0, 2)) throw "malformed RSA key(code:001)";
						var f = c(a, 0);
						if(2 != f.length) throw "malformed RSA key(code:002)";
						if("02" != a.substr(f[0], 2)) throw "malformed RSA key(code:003)";
						if(e.n = d(a, f[0]), "02" != a.substr(f[1], 2)) throw "malformed RSA key(code:004)";
						return e.e = d(a, f[1]), e
					},
					parsePublicPKCS8Hex: function(a) {
						var b = nd,
							c = b.getChildIdx,
							d = b.getV,
							e = {};
						e.algparam = null;
						var f = c(a, 0);
						if(2 != f.length) throw "outer DERSequence shall have 2 elements: " + f.length;
						var g = f[0];
						if("30" != a.substr(g, 2)) throw "malformed PKCS8 public key(code:001)";
						var h = c(a, g);
						if(2 != h.length) throw "malformed PKCS8 public key(code:002)";
						if("06" != a.substr(h[0], 2)) throw "malformed PKCS8 public key(code:003)";
						if(e.algoid = d(a, h[0]), "06" == a.substr(h[1], 2) ? e.algparam = d(a, h[1]) : "30" == a.substr(h[1], 2) && (e.algparam = {}, e.algparam.p = b.getVbyList(a, h[1], [0], "02"), e.algparam.q = b.getVbyList(a, h[1], [1], "02"), e.algparam.g = b.getVbyList(a, h[1], [2], "02")), "03" != a.substr(f[1], 2)) throw "malformed PKCS8 public key(code:004)";
						return e.key = d(a, f[1]).substr(2), e
					}
				}
			}();
			sd.getKey = function(a, b, c) {
				var d = nd,
					e = d.getChildIdx,
					g = (d.getV, d.getVbyList),
					h = od.crypto,
					i = h.ECDSA,
					j = h.DSA,
					k = qb,
					l = yc,
					m = sd;
				if(void 0 !== k && a instanceof k) return a;
				if(void 0 !== i && a instanceof i) return a;
				if(void 0 !== j && a instanceof j) return a;
				if(void 0 !== a.curve && void 0 !== a.xy && void 0 === a.d) return new i({
					pub: a.xy,
					curve: a.curve
				});
				if(void 0 !== a.curve && void 0 !== a.d) return new i({
					prv: a.d,
					curve: a.curve
				});
				if(void 0 === a.kty && void 0 !== a.n && void 0 !== a.e && void 0 === a.d) {
					var n = new k;
					return n.setPublic(a.n, a.e), n
				}
				if(void 0 === a.kty && void 0 !== a.n && void 0 !== a.e && void 0 !== a.d && void 0 !== a.p && void 0 !== a.q && void 0 !== a.dp && void 0 !== a.dq && void 0 !== a.co && void 0 === a.qi) {
					var n = new k;
					return n.setPrivateEx(a.n, a.e, a.d, a.p, a.q, a.dp, a.dq, a.co), n
				}
				if(void 0 === a.kty && void 0 !== a.n && void 0 !== a.e && void 0 !== a.d && void 0 === a.p) {
					var n = new k;
					return n.setPrivate(a.n, a.e, a.d), n
				}
				if(void 0 !== a.p && void 0 !== a.q && void 0 !== a.g && void 0 !== a.y && void 0 === a.x) {
					var n = new j;
					return n.setPublic(a.p, a.q, a.g, a.y), n
				}
				if(void 0 !== a.p && void 0 !== a.q && void 0 !== a.g && void 0 !== a.y && void 0 !== a.x) {
					var n = new j;
					return n.setPrivate(a.p, a.q, a.g, a.y, a.x), n
				}
				if("RSA" === a.kty && void 0 !== a.n && void 0 !== a.e && void 0 === a.d) {
					var n = new k;
					return n.setPublic(nc(a.n), nc(a.e)), n
				}
				if("RSA" === a.kty && void 0 !== a.n && void 0 !== a.e && void 0 !== a.d && void 0 !== a.p && void 0 !== a.q && void 0 !== a.dp && void 0 !== a.dq && void 0 !== a.qi) {
					var n = new k;
					return n.setPrivateEx(nc(a.n), nc(a.e), nc(a.d), nc(a.p), nc(a.q), nc(a.dp), nc(a.dq), nc(a.qi)), n
				}
				if("RSA" === a.kty && void 0 !== a.n && void 0 !== a.e && void 0 !== a.d) {
					var n = new k;
					return n.setPrivate(nc(a.n), nc(a.e), nc(a.d)), n
				}
				if("EC" === a.kty && void 0 !== a.crv && void 0 !== a.x && void 0 !== a.y && void 0 === a.d) {
					var o = new i({
							curve: a.crv
						}),
						p = o.ecparams.keylen / 4,
						q = ("0000000000" + nc(a.x)).slice(-p),
						r = ("0000000000" + nc(a.y)).slice(-p),
						s = "04" + q + r;
					return o.setPublicKeyHex(s), o
				}
				if("EC" === a.kty && void 0 !== a.crv && void 0 !== a.x && void 0 !== a.y && void 0 !== a.d) {
					var o = new i({
							curve: a.crv
						}),
						p = o.ecparams.keylen / 4,
						q = ("0000000000" + nc(a.x)).slice(-p),
						r = ("0000000000" + nc(a.y)).slice(-p),
						s = "04" + q + r,
						t = ("0000000000" + nc(a.d)).slice(-p);
					return o.setPublicKeyHex(s), o.setPrivateKeyHex(t), o
				}
				if("pkcs5prv" === c) {
					var u, n, v = a,
						d = nd;
					if(u = e(v, 0), 9 === u.length) n = new k, n.readPKCS5PrvKeyHex(v);
					else if(6 === u.length) n = new j, n.readPKCS5PrvKeyHex(v);
					else {
						if(!(u.length > 2 && "04" === v.substr(u[1], 2))) throw "unsupported PKCS#1/5 hexadecimal key";
						n = new i, n.readPKCS5PrvKeyHex(v)
					}
					return n
				}
				if("pkcs8prv" === c) {
					var n = m.getKeyFromPlainPrivatePKCS8Hex(a);
					return n
				}
				if("pkcs8pub" === c) return m._getKeyFromPublicPKCS8Hex(a);
				if("x509pub" === c) return Pc.getPublicKeyFromCertHex(a);
				if(-1 != a.indexOf("-END CERTIFICATE-", 0) || -1 != a.indexOf("-END X509 CERTIFICATE-", 0) || -1 != a.indexOf("-END TRUSTED CERTIFICATE-", 0)) return Pc.getPublicKeyFromCertPEM(a);
				if(-1 != a.indexOf("-END PUBLIC KEY-")) {
					var w = yc(a, "PUBLIC KEY");
					return m._getKeyFromPublicPKCS8Hex(w)
				}
				if(-1 != a.indexOf("-END RSA PRIVATE KEY-") && -1 == a.indexOf("4,ENCRYPTED")) {
					var x = l(a, "RSA PRIVATE KEY");
					return m.getKey(x, null, "pkcs5prv")
				}
				if(-1 != a.indexOf("-END DSA PRIVATE KEY-") && -1 == a.indexOf("4,ENCRYPTED")) {
					var y = l(a, "DSA PRIVATE KEY"),
						z = g(y, 0, [1], "02"),
						A = g(y, 0, [2], "02"),
						B = g(y, 0, [3], "02"),
						C = g(y, 0, [4], "02"),
						D = g(y, 0, [5], "02"),
						n = new j;
					return n.setPrivate(new f(z, 16), new f(A, 16), new f(B, 16), new f(C, 16), new f(D, 16)), n
				}
				if(-1 != a.indexOf("-END PRIVATE KEY-")) return m.getKeyFromPlainPrivatePKCS8PEM(a);
				if(-1 != a.indexOf("-END RSA PRIVATE KEY-") && -1 != a.indexOf("4,ENCRYPTED")) {
					var E = m.getDecryptedKeyHex(a, b),
						F = new qb;
					return F.readPKCS5PrvKeyHex(E), F
				}
				if(-1 != a.indexOf("-END EC PRIVATE KEY-") && -1 != a.indexOf("4,ENCRYPTED")) {
					var y = m.getDecryptedKeyHex(a, b),
						n = g(y, 0, [1], "04"),
						G = g(y, 0, [2, 0], "06"),
						H = g(y, 0, [3, 0], "03").substr(2),
						I = "";
					if(void 0 === od.crypto.OID.oidhex2name[G]) throw "undefined OID(hex) in KJUR.crypto.OID: " + G;
					I = od.crypto.OID.oidhex2name[G];
					var o = new i({
						curve: I
					});
					return o.setPublicKeyHex(H), o.setPrivateKeyHex(n), o.isPublic = !1, o
				}
				if(-1 != a.indexOf("-END DSA PRIVATE KEY-") && -1 != a.indexOf("4,ENCRYPTED")) {
					var y = m.getDecryptedKeyHex(a, b),
						z = g(y, 0, [1], "02"),
						A = g(y, 0, [2], "02"),
						B = g(y, 0, [3], "02"),
						C = g(y, 0, [4], "02"),
						D = g(y, 0, [5], "02"),
						n = new j;
					return n.setPrivate(new f(z, 16), new f(A, 16), new f(B, 16), new f(C, 16), new f(D, 16)), n
				}
				if(-1 != a.indexOf("-END ENCRYPTED PRIVATE KEY-")) return m.getKeyFromEncryptedPKCS8PEM(a, b);
				throw "not supported argument"
			}, sd.generateKeypair = function(a, b) {
				if("RSA" == a) {
					var c = b,
						d = new qb;
					d.generate(c, "10001"), d.isPrivate = !0, d.isPublic = !0;
					var e = new qb,
						f = d.n.toString(16),
						g = d.e.toString(16);
					e.setPublic(f, g), e.isPrivate = !1, e.isPublic = !0;
					var h = {};
					return h.prvKeyObj = d, h.pubKeyObj = e, h
				}
				if("EC" == a) {
					var i = b,
						j = new od.crypto.ECDSA({
							curve: i
						}),
						k = j.generateKeyPairHex(),
						d = new od.crypto.ECDSA({
							curve: i
						});
					d.setPublicKeyHex(k.ecpubhex), d.setPrivateKeyHex(k.ecprvhex), d.isPrivate = !0, d.isPublic = !1;
					var e = new od.crypto.ECDSA({
						curve: i
					});
					e.setPublicKeyHex(k.ecpubhex), e.isPrivate = !1, e.isPublic = !0;
					var h = {};
					return h.prvKeyObj = d, h.pubKeyObj = e, h
				}
				throw "unknown algorithm: " + a
			}, sd.getPEM = function(a, b, c, d, e, f) {
				function g(a) {
					return n({
						seq: [{
							int: 0
						}, {
							int: {
								bigint: a.n
							}
						}, {
							int: a.e
						}, {
							int: {
								bigint: a.d
							}
						}, {
							int: {
								bigint: a.p
							}
						}, {
							int: {
								bigint: a.q
							}
						}, {
							int: {
								bigint: a.dmp1
							}
						}, {
							int: {
								bigint: a.dmq1
							}
						}, {
							int: {
								bigint: a.coeff
							}
						}]
					})
				}

				function h(a) {
					return n({
						seq: [{
							int: 1
						}, {
							octstr: {
								hex: a.prvKeyHex
							}
						}, {
							tag: ["a0", !0, {
								oid: {
									name: a.curveName
								}
							}]
						}, {
							tag: ["a1", !0, {
								bitstr: {
									hex: "00" + a.pubKeyHex
								}
							}]
						}]
					})
				}

				function i(a) {
					return n({
						seq: [{
							int: 0
						}, {
							int: {
								bigint: a.p
							}
						}, {
							int: {
								bigint: a.q
							}
						}, {
							int: {
								bigint: a.g
							}
						}, {
							int: {
								bigint: a.y
							}
						}, {
							int: {
								bigint: a.x
							}
						}]
					})
				}
				var j = od,
					k = j.asn1,
					l = k.DERObjectIdentifier,
					m = k.DERInteger,
					n = k.ASN1Util.newObject,
					o = k.x509,
					p = o.SubjectPublicKeyInfo,
					q = j.crypto,
					r = q.DSA,
					s = q.ECDSA,
					t = qb;
				if((void 0 !== t && a instanceof t || void 0 !== r && a instanceof r || void 0 !== s && a instanceof s) && 1 == a.isPublic && (void 0 === b || "PKCS8PUB" == b)) {
					var u = new p(a),
						v = u.getEncodedHex();
					return xc(v, "PUBLIC KEY")
				}
				if("PKCS1PRV" == b && void 0 !== t && a instanceof t && (void 0 === c || null == c) && 1 == a.isPrivate) {
					var u = g(a),
						v = u.getEncodedHex();
					return xc(v, "RSA PRIVATE KEY")
				}
				if("PKCS1PRV" == b && void 0 !== s && a instanceof s && (void 0 === c || null == c) && 1 == a.isPrivate) {
					var w = new l({
							name: a.curveName
						}),
						x = w.getEncodedHex(),
						y = h(a),
						z = y.getEncodedHex(),
						A = "";
					return A += xc(x, "EC PARAMETERS"), A += xc(z, "EC PRIVATE KEY")
				}
				if("PKCS1PRV" == b && void 0 !== r && a instanceof r && (void 0 === c || null == c) && 1 == a.isPrivate) {
					var u = i(a),
						v = u.getEncodedHex();
					return xc(v, "DSA PRIVATE KEY")
				}
				if("PKCS5PRV" == b && void 0 !== t && a instanceof t && void 0 !== c && null != c && 1 == a.isPrivate) {
					var u = g(a),
						v = u.getEncodedHex();
					return void 0 === d && (d = "DES-EDE3-CBC"), this.getEncryptedPKCS5PEMFromPrvKeyHex("RSA", v, c, d, f)
				}
				if("PKCS5PRV" == b && void 0 !== s && a instanceof s && void 0 !== c && null != c && 1 == a.isPrivate) {
					var u = h(a),
						v = u.getEncodedHex();
					return void 0 === d && (d = "DES-EDE3-CBC"), this.getEncryptedPKCS5PEMFromPrvKeyHex("EC", v, c, d, f)
				}
				if("PKCS5PRV" == b && void 0 !== r && a instanceof r && void 0 !== c && null != c && 1 == a.isPrivate) {
					var u = i(a),
						v = u.getEncodedHex();
					return void 0 === d && (d = "DES-EDE3-CBC"), this.getEncryptedPKCS5PEMFromPrvKeyHex("DSA", v, c, d, f)
				}
				var B = function(a, b) {
						var c = C(a, b);
						return new n({
							seq: [{
								seq: [{
									oid: {
										name: "pkcs5PBES2"
									}
								}, {
									seq: [{
										seq: [{
											oid: {
												name: "pkcs5PBKDF2"
											}
										}, {
											seq: [{
												octstr: {
													hex: c.pbkdf2Salt
												}
											}, {
												int: c.pbkdf2Iter
											}]
										}]
									}, {
										seq: [{
											oid: {
												name: "des-EDE3-CBC"
											}
										}, {
											octstr: {
												hex: c.encryptionSchemeIV
											}
										}]
									}]
								}]
							}, {
								octstr: {
									hex: c.ciphertext
								}
							}]
						}).getEncodedHex()
					},
					C = function(a, b) {
						var c = 100,
							d = Tc.lib.WordArray.random(8),
							e = Tc.lib.WordArray.random(8),
							f = Tc.PBKDF2(b, d, {
								keySize: 6,
								iterations: c
							}),
							g = Tc.enc.Hex.parse(a),
							h = Tc.TripleDES.encrypt(g, f, {
								iv: e
							}) + "",
							i = {};
						return i.ciphertext = h, i.pbkdf2Salt = Tc.enc.Hex.stringify(d), i.pbkdf2Iter = c, i.encryptionSchemeAlg = "DES-EDE3-CBC", i.encryptionSchemeIV = Tc.enc.Hex.stringify(e), i
					};
				if("PKCS8PRV" == b && void 0 != t && a instanceof t && 1 == a.isPrivate) {
					var D = g(a),
						E = D.getEncodedHex(),
						u = n({
							seq: [{
								int: 0
							}, {
								seq: [{
									oid: {
										name: "rsaEncryption"
									}
								}, {
									null: !0
								}]
							}, {
								octstr: {
									hex: E
								}
							}]
						}),
						v = u.getEncodedHex();
					if(void 0 === c || null == c) return xc(v, "PRIVATE KEY");
					var z = B(v, c);
					return xc(z, "ENCRYPTED PRIVATE KEY")
				}
				if("PKCS8PRV" == b && void 0 !== s && a instanceof s && 1 == a.isPrivate) {
					var D = new n({
							seq: [{
								int: 1
							}, {
								octstr: {
									hex: a.prvKeyHex
								}
							}, {
								tag: ["a1", !0, {
									bitstr: {
										hex: "00" + a.pubKeyHex
									}
								}]
							}]
						}),
						E = D.getEncodedHex(),
						u = n({
							seq: [{
								int: 0
							}, {
								seq: [{
									oid: {
										name: "ecPublicKey"
									}
								}, {
									oid: {
										name: a.curveName
									}
								}]
							}, {
								octstr: {
									hex: E
								}
							}]
						}),
						v = u.getEncodedHex();
					if(void 0 === c || null == c) return xc(v, "PRIVATE KEY");
					var z = B(v, c);
					return xc(z, "ENCRYPTED PRIVATE KEY")
				}
				if("PKCS8PRV" == b && void 0 !== r && a instanceof r && 1 == a.isPrivate) {
					var D = new m({
							bigint: a.x
						}),
						E = D.getEncodedHex(),
						u = n({
							seq: [{
								int: 0
							}, {
								seq: [{
									oid: {
										name: "dsa"
									}
								}, {
									seq: [{
										int: {
											bigint: a.p
										}
									}, {
										int: {
											bigint: a.q
										}
									}, {
										int: {
											bigint: a.g
										}
									}]
								}]
							}, {
								octstr: {
									hex: E
								}
							}]
						}),
						v = u.getEncodedHex();
					if(void 0 === c || null == c) return xc(v, "PRIVATE KEY");
					var z = B(v, c);
					return xc(z, "ENCRYPTED PRIVATE KEY")
				}
				throw "unsupported object nor format"
			}, sd.getKeyFromCSRPEM = function(a) {
				var b = yc(a, "CERTIFICATE REQUEST");
				return sd.getKeyFromCSRHex(b)
			}, sd.getKeyFromCSRHex = function(a) {
				var b = sd.parseCSRHex(a);
				return sd.getKey(b.p8pubkeyhex, null, "pkcs8pub")
			}, sd.parseCSRHex = function(a) {
				var b = nd,
					c = b.getChildIdx,
					d = b.getTLV,
					e = {},
					f = a;
				if("30" != f.substr(0, 2)) throw "malformed CSR(code:001)";
				var g = c(f, 0);
				if(g.length < 1) throw "malformed CSR(code:002)";
				if("30" != f.substr(g[0], 2)) throw "malformed CSR(code:003)";
				var h = c(f, g[0]);
				if(h.length < 3) throw "malformed CSR(code:004)";
				return e.p8pubkeyhex = d(f, h[2]), e
			}, sd.getJWKFromKey = function(a) {
				var b = {};
				if(a instanceof qb && a.isPrivate) return b.kty = "RSA", b.n = mc(a.n.toString(16)), b.e = mc(a.e.toString(16)), b.d = mc(a.d.toString(16)), b.p = mc(a.p.toString(16)), b.q = mc(a.q.toString(16)), b.dp = mc(a.dmp1.toString(16)), b.dq = mc(a.dmq1.toString(16)), b.qi = mc(a.coeff.toString(16)), b;
				if(a instanceof qb && a.isPublic) return b.kty = "RSA", b.n = mc(a.n.toString(16)), b.e = mc(a.e.toString(16)), b;
				if(a instanceof od.crypto.ECDSA && a.isPrivate) {
					var c = a.getShortNISTPCurveName();
					if("P-256" !== c && "P-384" !== c) throw "unsupported curve name for JWT: " + c;
					var d = a.getPublicKeyXYHex();
					return b.kty = "EC", b.crv = c, b.x = mc(d.x), b.y = mc(d.y), b.d = mc(a.prvKeyHex), b
				}
				if(a instanceof od.crypto.ECDSA && a.isPublic) {
					var c = a.getShortNISTPCurveName();
					if("P-256" !== c && "P-384" !== c) throw "unsupported curve name for JWT: " + c;
					var d = a.getPublicKeyXYHex();
					return b.kty = "EC", b.crv = c, b.x = mc(d.x), b.y = mc(d.y), b
				}
				throw "not supported key object"
			}, qb.getPosArrayOfChildrenFromHex = function(a) {
				return nd.getChildIdx(a, 0)
			}, qb.getHexValueArrayOfChildrenFromHex = function(a) {
				var b = nd,
					c = b.getV,
					d = qb.getPosArrayOfChildrenFromHex(a),
					e = c(a, d[0]),
					f = c(a, d[1]),
					g = c(a, d[2]),
					h = c(a, d[3]),
					i = c(a, d[4]),
					j = c(a, d[5]),
					k = c(a, d[6]),
					l = c(a, d[7]),
					m = c(a, d[8]),
					d = new Array;
				return d.push(e, f, g, h, i, j, k, l, m), d
			}, qb.prototype.readPrivateKeyFromPEMString = function(a) {
				var b = yc(a),
					c = qb.getHexValueArrayOfChildrenFromHex(b);
				this.setPrivateEx(c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8])
			}, qb.prototype.readPKCS5PrvKeyHex = function(a) {
				var b = qb.getHexValueArrayOfChildrenFromHex(a);
				this.setPrivateEx(b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8])
			}, qb.prototype.readPKCS8PrvKeyHex = function(a) {
				var b, c, d, e, f, g, h, i, j = nd,
					k = j.getVbyList;
				if(!1 === j.isASN1HEX(a)) throw "not ASN.1 hex string";
				try {
					b = k(a, 0, [2, 0, 1], "02"), c = k(a, 0, [2, 0, 2], "02"), d = k(a, 0, [2, 0, 3], "02"), e = k(a, 0, [2, 0, 4], "02"), f = k(a, 0, [2, 0, 5], "02"), g = k(a, 0, [2, 0, 6], "02"), h = k(a, 0, [2, 0, 7], "02"), i = k(a, 0, [2, 0, 8], "02")
				} catch(a) {
					throw "malformed PKCS#8 plain RSA private key"
				}
				this.setPrivateEx(b, c, d, e, f, g, h, i)
			}, qb.prototype.readPKCS5PubKeyHex = function(a) {
				var b = nd,
					c = b.getV;
				if(!1 === b.isASN1HEX(a)) throw "keyHex is not ASN.1 hex string";
				var d = b.getChildIdx(a, 0);
				if(2 !== d.length || "02" !== a.substr(d[0], 2) || "02" !== a.substr(d[1], 2)) throw "wrong hex for PKCS#5 public key";
				var e = c(a, d[0]),
					f = c(a, d[1]);
				this.setPublic(e, f)
			}, qb.prototype.readPKCS8PubKeyHex = function(a) {
				var b = nd;
				if(!1 === b.isASN1HEX(a)) throw "not ASN.1 hex string";
				if("06092a864886f70d010101" !== b.getTLVbyList(a, 0, [0, 0])) throw "not PKCS8 RSA public key";
				var c = b.getTLVbyList(a, 0, [1, 0]);
				this.readPKCS5PubKeyHex(c)
			}, qb.prototype.readCertPubKeyHex = function(a, b) {
				var c, d;
				c = new Pc, c.readCertHex(a), d = c.getPublicKeyHex(), this.readPKCS8PubKeyHex(d)
			};
			var td = new RegExp("");
			td.compile("[^0-9a-f]", "gi"), qb.prototype.sign = function(a, b) {
					var c = function(a) {
							return od.crypto.Util.hashString(a, b)
						},
						d = c(a);
					return this.signWithMessageHash(d, b)
				}, qb.prototype.signWithMessageHash = function(a, b) {
					var c = od.crypto.Util.getPaddedDigestInfoHex(a, b, this.n.bitLength()),
						d = mb(c, 16);
					return Mc(this.doPrivate(d).toString(16), this.n.bitLength())
				}, qb.prototype.signPSS = function(a, b, c) {
					var d = function(a) {
							return od.crypto.Util.hashHex(a, b)
						},
						e = d(tc(a));
					return void 0 === c && (c = -1), this.signWithMessageHashPSS(e, b, c)
				}, qb.prototype.signWithMessageHashPSS = function(a, b, c) {
					var d, e = sc(a),
						g = e.length,
						h = this.n.bitLength() - 1,
						i = Math.ceil(h / 8),
						j = function(a) {
							return od.crypto.Util.hashHex(a, b)
						};
					if(-1 === c || void 0 === c) c = g;
					else if(-2 === c) c = i - g - 2;
					else if(c < -2) throw "invalid salt length";
					if(i < g + c + 2) throw "data too long";
					var k = "";
					c > 0 && (k = new Array(c), (new lb).nextBytes(k), k = String.fromCharCode.apply(String, k));
					var l = sc(j(tc("\0\0\0\0\0\0\0\0" + e + k))),
						m = [];
					for(d = 0; d < i - c - g - 2; d += 1) m[d] = 0;
					var n = String.fromCharCode.apply(String, m) + "" + k,
						o = Nc(l, n.length, j),
						p = [];
					for(d = 0; d < n.length; d += 1) p[d] = n.charCodeAt(d) ^ o.charCodeAt(d);
					var q = 65280 >> 8 * i - h & 255;
					for(p[0] &= ~q, d = 0; d < g; d++) p.push(l.charCodeAt(d));
					return p.push(188), Mc(this.doPrivate(new f(p)).toString(16), this.n.bitLength())
				}, qb.prototype.verify = function(a, b) {
					b = b.replace(td, ""), b = b.replace(/[ \n]+/g, "");
					var c = mb(b, 16);
					if(c.bitLength() > this.n.bitLength()) return 0;
					var d = this.doPublic(c),
						e = d.toString(16).replace(/^1f+00/, ""),
						f = Oc(e);
					if(0 == f.length) return !1;
					var g = f[0];
					return f[1] == function(a) {
						return od.crypto.Util.hashString(a, g)
					}(a)
				}, qb.prototype.verifyWithMessageHash = function(a, b) {
					b = b.replace(td, ""), b = b.replace(/[ \n]+/g, "");
					var c = mb(b, 16);
					if(c.bitLength() > this.n.bitLength()) return 0;
					var d = this.doPublic(c),
						e = d.toString(16).replace(/^1f+00/, ""),
						f = Oc(e);
					if(0 == f.length) return !1;
					f[0];
					return f[1] == a
				},
				qb.prototype.verifyPSS = function(a, b, c, d) {
					var e = function(a) {
							return od.crypto.Util.hashHex(a, c)
						},
						f = e(tc(a));
					return void 0 === d && (d = -1), this.verifyWithMessageHashPSS(f, b, c, d)
				}, qb.prototype.verifyWithMessageHashPSS = function(a, b, c, d) {
					var e = new f(b, 16);
					if(e.bitLength() > this.n.bitLength()) return !1;
					var g, h = function(a) {
							return od.crypto.Util.hashHex(a, c)
						},
						i = sc(a),
						j = i.length,
						k = this.n.bitLength() - 1,
						l = Math.ceil(k / 8);
					if(-1 === d || void 0 === d) d = j;
					else if(-2 === d) d = l - j - 2;
					else if(d < -2) throw "invalid salt length";
					if(l < j + d + 2) throw "data too long";
					var m = this.doPublic(e).toByteArray();
					for(g = 0; g < m.length; g += 1) m[g] &= 255;
					for(; m.length < l;) m.unshift(0);
					if(188 !== m[l - 1]) throw "encoded message does not end in 0xbc";
					m = String.fromCharCode.apply(String, m);
					var n = m.substr(0, l - j - 1),
						o = m.substr(n.length, j),
						p = 65280 >> 8 * l - k & 255;
					if(0 != (n.charCodeAt(0) & p)) throw "bits beyond keysize not zero";
					var q = Nc(o, n.length, h),
						r = [];
					for(g = 0; g < n.length; g += 1) r[g] = n.charCodeAt(g) ^ q.charCodeAt(g);
					r[0] &= ~p;
					var s = l - j - d - 2;
					for(g = 0; g < s; g += 1)
						if(0 !== r[g]) throw "leftmost octets not zero";
					if(1 !== r[s]) throw "0x01 marker not found";
					return o === sc(h(tc("\0\0\0\0\0\0\0\0" + i + String.fromCharCode.apply(String, r.slice(-d)))))
				}, qb.SALT_LEN_HLEN = -1, qb.SALT_LEN_MAX = -2, qb.SALT_LEN_RECOVER = -2, Pc.hex2dn = function(a, b) {
					if(void 0 === b && (b = 0), "30" !== a.substr(b, 2)) throw "malformed DN";
					for(var c = new Array, d = nd.getChildIdx(a, b), e = 0; e < d.length; e++) c.push(Pc.hex2rdn(a, d[e]));
					return c = c.map(function(a) {
						return a.replace("/", "\\/")
					}), "/" + c.join("/")
				}, Pc.hex2rdn = function(a, b) {
					if(void 0 === b && (b = 0), "31" !== a.substr(b, 2)) throw "malformed RDN";
					for(var c = new Array, d = nd.getChildIdx(a, b), e = 0; e < d.length; e++) c.push(Pc.hex2attrTypeValue(a, d[e]));
					return c = c.map(function(a) {
						return a.replace("+", "\\+")
					}), c.join("+")
				}, Pc.hex2attrTypeValue = function(a, b) {
					var c = nd,
						d = c.getV;
					if(void 0 === b && (b = 0), "30" !== a.substr(b, 2)) throw "malformed attribute type and value";
					var e = c.getChildIdx(a, b);
					2 !== e.length || a.substr(e[0], 2);
					var f = d(a, e[0]),
						g = od.asn1.ASN1Util.oidHexToInt(f);
					return od.asn1.x509.OID.oid2atype(g) + "=" + sc(d(a, e[1]))
				}, Pc.getPublicKeyFromCertHex = function(a) {
					var b = new Pc;
					return b.readCertHex(a), b.getPublicKey()
				}, Pc.getPublicKeyFromCertPEM = function(a) {
					var b = new Pc;
					return b.readCertPEM(a), b.getPublicKey()
				}, Pc.getPublicKeyInfoPropOfCertPEM = function(a) {
					var b, c, d = nd,
						e = d.getVbyList,
						f = {};
					return f.algparam = null, b = new Pc, b.readCertPEM(a), c = b.getPublicKeyHex(), f.keyhex = e(c, 0, [1], "03").substr(2), f.algoid = e(c, 0, [0, 0], "06"), "2a8648ce3d0201" === f.algoid && (f.algparam = e(c, 0, [0, 1], "06")), f
				}, Pc.KEYUSAGE_NAME = ["digitalSignature", "nonRepudiation", "keyEncipherment", "dataEncipherment", "keyAgreement", "keyCertSign", "cRLSign", "encipherOnly", "decipherOnly"], void 0 !== od && od || (od = {}), void 0 !== od.jws && od.jws || (od.jws = {}), od.jws.JWS = function() {
					var a = od,
						b = a.jws.JWS,
						c = b.isSafeJSONString;
					this.parseJWS = function(a, b) {
						if(void 0 === this.parsedJWS || !b && void 0 === this.parsedJWS.sigvalH) {
							var d = a.match(/^([^.]+)\.([^.]+)\.([^.]+)$/);
							if(null == d) throw "JWS signature is not a form of 'Head.Payload.SigValue'.";
							var e = d[1],
								f = d[2],
								g = d[3],
								h = e + "." + f;
							if(this.parsedJWS = {}, this.parsedJWS.headB64U = e, this.parsedJWS.payloadB64U = f, this.parsedJWS.sigvalB64U = g, this.parsedJWS.si = h, !b) {
								var i = nc(g),
									j = mb(i, 16);
								this.parsedJWS.sigvalH = i, this.parsedJWS.sigvalBI = j
							}
							var k = qd(e),
								l = qd(f);
							if(this.parsedJWS.headS = k, this.parsedJWS.payloadS = l, !c(k, this.parsedJWS, "headP")) throw "malformed JSON string for JWS Head: " + k
						}
					}
				}, od.jws.JWS.sign = function(a, b, c, d, e) {
					var f, g, h, i = od,
						j = i.jws,
						k = j.JWS,
						l = k.readSafeJSONString,
						m = k.isSafeJSONString,
						n = i.crypto,
						o = (n.ECDSA, n.Mac),
						p = n.Signature,
						q = JSON;
					if("string" != typeof b && "object" != typeof b) throw "spHeader must be JSON string or object: " + b;
					if("object" == typeof b && (g = b, f = q.stringify(g)), "string" == typeof b) {
						if(f = b, !m(f)) throw "JWS Head is not safe JSON string: " + f;
						g = l(f)
					}
					if(h = c, "object" == typeof c && (h = q.stringify(c)), "" != a && null != a || void 0 === g.alg || (a = g.alg), "" != a && null != a && void 0 === g.alg && (g.alg = a, f = q.stringify(g)), a !== g.alg) throw "alg and sHeader.alg doesn't match: " + a + "!=" + g.alg;
					var r = null;
					if(void 0 === k.jwsalg2sigalg[a]) throw "unsupported alg name: " + a;
					r = k.jwsalg2sigalg[a];
					var s = pd(f),
						t = pd(h),
						u = s + "." + t,
						v = "";
					if("Hmac" == r.substr(0, 4)) {
						if(void 0 === d) throw "mac key shall be specified for HS* alg";
						var w = new o({
							alg: r,
							prov: "cryptojs",
							pass: d
						});
						w.updateString(u), v = w.doFinal()
					} else if(-1 != r.indexOf("withECDSA")) {
						var x = new p({
							alg: r
						});
						x.init(d, e), x.updateString(u), hASN1Sig = x.sign(), v = od.crypto.ECDSA.asn1SigToConcatSig(hASN1Sig)
					} else if("none" != r) {
						var x = new p({
							alg: r
						});
						x.init(d, e), x.updateString(u), v = x.sign()
					}
					return u + "." + mc(v)
				}, od.jws.JWS.verify = function(a, b, c) {
					var d, e = od,
						f = e.jws,
						g = f.JWS,
						h = g.readSafeJSONString,
						i = e.crypto,
						j = i.ECDSA,
						k = i.Mac,
						l = i.Signature;
					void 0 !== typeof qb && (d = qb);
					var m = a.split("."),
						n = m[0],
						o = m[1],
						p = n + "." + o,
						q = nc(m[2]),
						r = h(qd(m[0])),
						s = null,
						t = null;
					if(void 0 === r.alg) throw "algorithm not specified in header";
					if(s = r.alg, t = s.substr(0, 2), null != c && "[object Array]" === Object.prototype.toString.call(c) && c.length > 0) {
						if(-1 == (":" + c.join(":") + ":").indexOf(":" + s + ":")) throw "algorithm '" + s + "' not accepted in the list"
					}
					if("none" != s && null === b) throw "key shall be specified to verify.";
					if("string" == typeof b && -1 != b.indexOf("-----BEGIN ") && (b = sd.getKey(b)), !("RS" != t && "PS" != t || b instanceof d)) throw "key shall be a RSAKey obj for RS* and PS* algs";
					if("ES" == t && !(b instanceof j)) throw "key shall be a ECDSA obj for ES* algs";
					var u = null;
					if(void 0 === g.jwsalg2sigalg[r.alg]) throw "unsupported alg name: " + s;
					if("none" == (u = g.jwsalg2sigalg[s])) throw "not supported";
					if("Hmac" == u.substr(0, 4)) {
						var v = null;
						if(void 0 === b) throw "hexadecimal key shall be specified for HMAC";
						var w = new k({
							alg: u,
							pass: b
						});
						return w.updateString(p), v = w.doFinal(), q == v
					}
					if(-1 != u.indexOf("withECDSA")) {
						var x = null;
						try {
							x = j.concatSigToASN1Sig(q)
						} catch(a) {
							return !1
						}
						var y = new l({
							alg: u
						});
						return y.init(b), y.updateString(p), y.verify(x)
					}
					var y = new l({
						alg: u
					});
					return y.init(b), y.updateString(p), y.verify(q)
				}, od.jws.JWS.parse = function(a) {
					var b, c, d, e = a.split("."),
						f = {};
					if(2 != e.length && 3 != e.length) throw "malformed sJWS: wrong number of '.' splitted elements";
					return b = e[0], c = e[1], 3 == e.length && (d = e[2]), f.headerObj = od.jws.JWS.readSafeJSONString(qd(b)), f.payloadObj = od.jws.JWS.readSafeJSONString(qd(c)), f.headerPP = JSON.stringify(f.headerObj, null, "  "), null == f.payloadObj ? f.payloadPP = qd(c) : f.payloadPP = JSON.stringify(f.payloadObj, null, "  "), void 0 !== d && (f.sigHex = nc(d)), f
				}, od.jws.JWS.verifyJWT = function(a, b, c) {
					var d = od,
						e = d.jws,
						f = e.JWS,
						g = f.readSafeJSONString,
						h = f.inArray,
						i = f.includedArray,
						j = a.split("."),
						k = j[0],
						l = j[1],
						m = (nc(j[2]), g(qd(k))),
						n = g(qd(l));
					if(void 0 === m.alg) return !1;
					if(void 0 === c.alg) throw "acceptField.alg shall be specified";
					if(!h(m.alg, c.alg)) return !1;
					if(void 0 !== n.iss && "object" == typeof c.iss && !h(n.iss, c.iss)) return !1;
					if(void 0 !== n.sub && "object" == typeof c.sub && !h(n.sub, c.sub)) return !1;
					if(void 0 !== n.aud && "object" == typeof c.aud)
						if("string" == typeof n.aud) {
							if(!h(n.aud, c.aud)) return !1
						} else if("object" == typeof n.aud && !i(n.aud, c.aud)) return !1;
					var o = e.IntDate.getNow();
					return void 0 !== c.verifyAt && "number" == typeof c.verifyAt && (o = c.verifyAt), void 0 !== c.gracePeriod && "number" == typeof c.gracePeriod || (c.gracePeriod = 0), !(void 0 !== n.exp && "number" == typeof n.exp && n.exp + c.gracePeriod < o) && (!(void 0 !== n.nbf && "number" == typeof n.nbf && o < n.nbf - c.gracePeriod) && (!(void 0 !== n.iat && "number" == typeof n.iat && o < n.iat - c.gracePeriod) && ((void 0 === n.jti || void 0 === c.jti || n.jti === c.jti) && !!f.verify(a, b, c.alg))))
				}, od.jws.JWS.includedArray = function(a, b) {
					var c = od.jws.JWS.inArray;
					if(null === a) return !1;
					if("object" != typeof a) return !1;
					if("number" != typeof a.length) return !1;
					for(var d = 0; d < a.length; d++)
						if(!c(a[d], b)) return !1;
					return !0
				}, od.jws.JWS.inArray = function(a, b) {
					if(null === b) return !1;
					if("object" != typeof b) return !1;
					if("number" != typeof b.length) return !1;
					for(var c = 0; c < b.length; c++)
						if(b[c] == a) return !0;
					return !1
				}, od.jws.JWS.jwsalg2sigalg = {
					HS256: "HmacSHA256",
					HS384: "HmacSHA384",
					HS512: "HmacSHA512",
					RS256: "SHA256withRSA",
					RS384: "SHA384withRSA",
					RS512: "SHA512withRSA",
					ES256: "SHA256withECDSA",
					ES384: "SHA384withECDSA",
					PS256: "SHA256withRSAandMGF1",
					PS384: "SHA384withRSAandMGF1",
					PS512: "SHA512withRSAandMGF1",
					none: "none"
				}, od.jws.JWS.isSafeJSONString = function(a, b, c) {
					var d = null;
					try {
						return "object" != typeof(d = md(a)) ? 0 : d.constructor === Array ? 0 : (b && (b[c] = d), 1)
					} catch(a) {
						return 0
					}
				}, od.jws.JWS.readSafeJSONString = function(a) {
					var b = null;
					try {
						return b = md(a), "object" != typeof b ? null : b.constructor === Array ? null : b
					} catch(a) {
						return null
					}
				}, od.jws.JWS.getEncodedSignatureValueFromJWS = function(a) {
					var b = a.match(/^[^.]+\.[^.]+\.([^.]+)$/);
					if(null == b) throw "JWS signature is not a form of 'Head.Payload.SigValue'.";
					return b[1]
				}, od.jws.JWS.getJWKthumbprint = function(a) {
					if("RSA" !== a.kty && "EC" !== a.kty && "oct" !== a.kty) throw "unsupported algorithm for JWK Thumprint";
					var b = "{";
					if("RSA" === a.kty) {
						if("string" != typeof a.n || "string" != typeof a.e) throw "wrong n and e value for RSA key";
						b += '"e":"' + a.e + '",', b += '"kty":"' + a.kty + '",', b += '"n":"' + a.n + '"}'
					} else if("EC" === a.kty) {
						if("string" != typeof a.crv || "string" != typeof a.x || "string" != typeof a.y) throw "wrong crv, x and y value for EC key";
						b += '"crv":"' + a.crv + '",', b += '"kty":"' + a.kty + '",', b += '"x":"' + a.x + '",', b += '"y":"' + a.y + '"}'
					} else if("oct" === a.kty) {
						if("string" != typeof a.k) throw "wrong k value for oct(symmetric) key";
						b += '"kty":"' + a.kty + '",', b += '"k":"' + a.k + '"}'
					}
					var c = tc(b);
					return mc(od.crypto.Util.hashHex(c, "sha256"))
				}, od.jws.IntDate = {}, od.jws.IntDate.get = function(a) {
					var b = od.jws.IntDate,
						c = b.getNow,
						d = b.getZulu;
					if("now" == a) return c();
					if("now + 1hour" == a) return c() + 3600;
					if("now + 1day" == a) return c() + 86400;
					if("now + 1month" == a) return c() + 2592e3;
					if("now + 1year" == a) return c() + 31536e3;
					if(a.match(/Z$/)) return d(a);
					if(a.match(/^[0-9]+$/)) return parseInt(a);
					throw "unsupported format: " + a
				}, od.jws.IntDate.getZulu = function(a) {
					return Cc(a)
				}, od.jws.IntDate.getNow = function() {
					return ~~(new Date / 1e3)
				}, od.jws.IntDate.intDate2UTCString = function(a) {
					return new Date(1e3 * a).toUTCString()
				}, od.jws.IntDate.intDate2Zulu = function(a) {
					var b = new Date(1e3 * a);
					return("0000" + b.getUTCFullYear()).slice(-4) + ("00" + (b.getUTCMonth() + 1)).slice(-2) + ("00" + b.getUTCDate()).slice(-2) + ("00" + b.getUTCHours()).slice(-2) + ("00" + b.getUTCMinutes()).slice(-2) + ("00" + b.getUTCSeconds()).slice(-2) + "Z"
				}, void 0 !== od && od || (od = {}), void 0 !== od.jws && od.jws || (od.jws = {}), od.jws.JWSJS = function() {
					var a = od,
						b = a.jws,
						c = b.JWS,
						d = c.readSafeJSONString;
					this.aHeader = [], this.sPayload = "", this.aSignature = [], this.init = function() {
						this.aHeader = [], this.sPayload = void 0, this.aSignature = []
					}, this.initWithJWS = function(a) {
						this.init();
						var b = a.split(".");
						if(3 != b.length) throw "malformed input JWS";
						this.aHeader.push(b[0]), this.sPayload = b[1], this.aSignature.push(b[2])
					}, this.addSignature = function(a, b, c, d) {
						if(void 0 === this.sPayload || null === this.sPayload) throw "there's no JSON-JS signature to add.";
						var e = this.aHeader.length;
						if(this.aHeader.length != this.aSignature.length) throw "aHeader.length != aSignature.length";
						try {
							var f = od.jws.JWS.sign(a, b, this.sPayload, c, d),
								g = f.split(".");
							g[0], g[2];
							this.aHeader.push(g[0]), this.aSignature.push(g[2])
						} catch(a) {
							throw this.aHeader.length > e && this.aHeader.pop(), this.aSignature.length > e && this.aSignature.pop(), "addSignature failed: " + a
						}
					}, this.verifyAll = function(a) {
						if(this.aHeader.length !== a.length || this.aSignature.length !== a.length) return !1;
						for(var b = 0; b < a.length; b++) {
							var c = a[b];
							if(2 !== c.length) return !1;
							if(!1 === this.verifyNth(b, c[0], c[1])) return !1
						}
						return !0
					}, this.verifyNth = function(a, b, d) {
						if(this.aHeader.length <= a || this.aSignature.length <= a) return !1;
						var e = this.aHeader[a],
							f = this.aSignature[a],
							g = e + "." + this.sPayload + "." + f,
							h = !1;
						try {
							h = c.verify(g, b, d)
						} catch(a) {
							return !1
						}
						return h
					}, this.readJWSJS = function(a) {
						if("string" == typeof a) {
							var b = d(a);
							if(null == b) throw "argument is not safe JSON object string";
							this.aHeader = b.headers, this.sPayload = b.payload, this.aSignature = b.signatures
						} else try {
							if(!(a.headers.length > 0)) throw "malformed header";
							if(this.aHeader = a.headers, "string" != typeof a.payload) throw "malformed signatures";
							if(this.sPayload = a.payload, !(a.signatures.length > 0)) throw "malformed signatures";
							this.signatures = a.signatures
						} catch(a) {
							throw "malformed JWS-JS JSON object: " + a
						}
					}, this.getJSON = function() {
						return {
							headers: this.aHeader,
							payload: this.sPayload,
							signatures: this.aSignature
						}
					}, this.isEmpty = function() {
						return 0 == this.aHeader.length ? 1 : 0
					}
				}, c.SecureRandom = lb, c.rng_seed_time = ib, c.BigInteger = f, c.RSAKey = qb, c.ECDSA = od.crypto.ECDSA, c.DSA = od.crypto.DSA, c.Signature = od.crypto.Signature, c.MessageDigest = od.crypto.MessageDigest, c.Mac = od.crypto.Mac, c.Cipher = od.crypto.Cipher, c.KEYUTIL = sd, c.ASN1HEX = nd, c.X509 = Pc, c.CryptoJS = Tc, c.b64tohex = d, c.b64toBA = e, c.stoBA = dc, c.BAtos = ec, c.BAtohex = fc, c.stohex = gc, c.stob64 = hc, c.stob64u = ic, c.b64utos = jc, c.b64tob64u = kc, c.b64utob64 = lc, c.hex2b64 = b, c.hextob64u = mc, c.b64utohex = nc, c.utf8tob64u = pd, c.b64utoutf8 = qd, c.utf8tob64 = oc, c.b64toutf8 = pc, c.utf8tohex = qc, c.hextoutf8 = rc, c.hextorstr = sc, c.rstrtohex = tc, c.hextob64 = uc, c.hextob64nl = vc, c.b64nltohex = wc, c.hextopem = xc, c.pemtohex = yc, c.hextoArrayBuffer = zc, c.ArrayBuffertohex = Ac, c.zulutomsec = Bc, c.zulutosec = Cc, c.zulutodate = Dc, c.datetozulu = Ec, c.uricmptohex = Fc, c.hextouricmp = Gc, c.encodeURIComponentAll = Hc, c.newline_toUnix = Ic, c.newline_toDos = Jc, c.hextoposhex = Kc, c.intarystrtohex = Lc, c.strdiffidx = rd, c.KJUR = od, c.crypto = od.crypto, c.asn1 = od.asn1, c.jws = od.jws, c.lang = od.lang
		}).call(this, a("buffer").Buffer)
	}, {
		buffer: 2
	}],
	40: [function(a, b, c) {
		b.exports = {
			domain: "g.alicdn.com",
			flashVersion: "1.5.7",
			h5Version: "1.9.9",
			logReportTo: "https://videocloud.cn-hangzhou.log.aliyuncs.com/logstores/newplayer/track"
		}
	}, {}],
	41: [function(a, b, c) {
		var d = a("./player/player"),
			e = a("./player/flashplayer"),
			f = a("./lib/dom"),
			g = a("./lib/ua"),
			h = a("./lib/object"),
			i = a("./config"),
			j = function(a) {
				var b, c = a.id;
				if("string" == typeof c) {
					if(0 === c.indexOf("#") && (c = c.slice(1)), j.players[c]) return j.players[c];
					b = f.el(c)
				} else b = c;
				if(!b || !b.nodeName) throw new TypeError("没有为播放器指定容器");
				var i = h.merge(h.copy(j.defaultOpt), a);
				(g.IS_H5 || i.useH5Prism) && a.isLive && (i.skinLayout = [{
					name: "bigPlayButton",
					align: "blabs",
					x: 30,
					y: 80
				}, {
					name: "controlBar",
					align: "blabs",
					x: 0,
					y: 0,
					children: [{
						name: "liveDisplay",
						align: "tlabs",
						x: 15,
						y: 25
					}, {
						name: "fullScreenButton",
						align: "tr",
						x: 20,
						y: 25
					}, {
						name: "volume",
						align: "tr",
						x: 20,
						y: 25
					}]
				}]);
				for(var k = i.skinLayout.length, l = !1, m = 0; m < k; m++) "errorDisplay" == i.skinLayout[m].name && (l = !0);
				if(0 == l && i.skinLayout.push({
						name: "errorDisplay",
						align: "tl",
						x: 0,
						y: 0
					}), g.IS_IOS)
					for(var m = 0; m < i.skinLayout.length; m++)
						if("controlBar" == i.skinLayout[m].name)
							for(var n = i.skinLayout[m], o = 0; o < n.children.length; o++)
								if("volume" == n.children[o].name) {
									n.children.splice(o, 1);
									break
								}
				if(i.width && (b.style.width = i.width), i.height) {
					if(i.height.indexOf("%") > 0) {
						var p = window.screen.height,
							q = i.height.replace("%", "");
						if(isNaN(q)) b.style.height = i.height;
						else {
							var r = 9 * p * parseInt(q) / 1e3;
							b.style.height = String(r % 2 ? r + 1 : r) + "px"
						}
					} else b.style.height = i.height
				}
				return a.userH5Prism || a.useH5Prism ? b.player || new d(b, i) : a.useFlashPrism ? b.player || new e(b, i) : b.player || (g.IS_H5 ? new d(b, i) : new e(b, i))
			},
			k = window.prismplayer = j;
		j.players = {}, j.defaultOpt = {
			preload: !1,
			autoplay: !0,
			useNativeControls: !1,
			width: "100%",
			height: "300px",
			cover: "",
			from: "",
			trackLog: !0,
			waterMark: "",
			isLive: !1,
			showBarTime: 5e3,
			loadDataTimeout: 30,
			controlBarForOver: !1,
			controlBarVisibility: "click",
			rePlay: !1,
			skinRes: "//" + i.domain + "/de/prismplayer-flash/" + i.flashVersion + "/atlas/defaultSkin",
			skinLayout: [{
				name: "bigPlayButton",
				align: "blabs",
				x: 30,
				y: 80
			}, {
				name: "H5Loading",
				align: "cc"
			}, {
				name: "controlBar",
				align: "blabs",
				x: 0,
				y: 0,
				children: [{
					name: "progress",
					align: "tlabs",
					x: 0,
					y: 0
				}, {
					name: "playButton",
					align: "tl",
					x: 15,
					y: 26
				}, {
					name: "nextButton",
					align: "tl",
					x: 10,
					y: 26
				}, {
					name: "timeDisplay",
					align: "tl",
					x: 10,
					y: 24
				}, {
					name: "fullScreenButton",
					align: "tr",
					x: 10,
					y: 25
				}, {
					name: "streamButton",
					align: "tr",
					x: 10,
					y: 23
				}, {
					name: "volume",
					align: "tr",
					x: 10,
					y: 25
				}]
			}, {
				name: "fullControlBar",
				align: "tlabs",
				x: 0,
				y: 0,
				children: [{
					name: "fullTitle",
					align: "tl",
					x: 25,
					y: 6
				}, {
					name: "fullNormalScreenButton",
					align: "tr",
					x: 24,
					y: 13
				}, {
					name: "fullTimeDisplay",
					align: "tr",
					x: 10,
					y: 12
				}, {
					name: "fullZoom",
					align: "cc"
				}]
			}]
		}, "function" == typeof define && define.amd ? define([], function() {
			return k
		}) : "object" == typeof c && "object" == typeof b && (b.exports = k)
	}, {
		"./config": 40,
		"./lib/dom": 45,
		"./lib/object": 50,
		"./lib/ua": 52,
		"./player/flashplayer": 56,
		"./player/player": 57
	}],
	42: [function(a, b, c) {
		b.exports.LOAD_START = "loadstart", b.exports.LOADED_METADATA = "loadedmetadata", b.exports.LOADED_DATA = "loadeddata", b.exports.PROGRESS = "progress", b.exports.CAN_PLAY = "canplay", b.exports.CAN_PLYA_THROUGH = "canplaythrough", b.exports.PLAY = "play", b.exports.PAUSE = "pause", b.exports.ENDED = "ended", b.exports.PLAYING = "playing", b.exports.WAITING = "waiting", b.exports.ERROR = "error", b.exports.SUSPEND = "suspend", b.exports.STALLED = "stalled", b.exports.AuthKeyExpiredEvent = "authkeyexpired", b.exports.ErrorCode = {
			InvalidParameter: 4001,
			AuthKeyExpired: 4002,
			InvalidSourceURL: 4003,
			NotFoundSourceURL: 4004,
			StartLoadData: 4005,
			LoadedMetadata: 4006,
			PlayingError: 4007,
			LoadingTimeout: 4008,
			RequestDataError: 4009,
			EncrptyVideoNotSupport: 4010,
			FormatNotSupport: 4011,
			PlayauthDecode: 4012,
			PlayDataDecode: 4013,
			NetworkUnavaiable: 4014,
			UserAbort: 4015,
			NetworkError: 4016,
			URLsIsEmpty: 4017,
			OtherError: 4400,
			ServerAPIError: 4500
		}, b.exports.AuthKeyExpired = 1800, b.exports.AuthKeyRefreshExpired = 1600, b.exports.VideoErrorCodeText = {
			1: "获取数据过程被中止",
			2: "网络错误加载数据失败",
			3: "解码错误",
			4: "服务器、网络错误或格式不支持"
		}, b.exports.VideoErrorCode = {
			1: 4015,
			2: 4016,
			3: 4013,
			4: 4400
		}, b.exports.VideoLevels = {
			0: "原画",
			640: "流畅",
			960: "标清",
			1280: "高清",
			1920: "超清",
			2580: "2K",
			3840: "4K"
		}
	}, {}],
	43: [function(a, b, c) {
		b.exports.get = function(a) {
			for(var b = a + "", c = document.cookie.split(";"), d = 0; d < c.length; d++) {
				var e = c[d].trim();
				if(0 == e.indexOf(b)) return unescape(e.substring(b.length + 1, e.length))
			}
			return ""
		}, b.exports.set = function(a, b, c) {
			var d = new Date;
			d.setTime(d.getTime() + 24 * c * 60 * 60 * 1e3);
			var e = "expires=" + d.toGMTString();
			document.cookie = a + "=" + escape(b) + "; " + e
		}
	}, {}],
	44: [function(a, b, c) {
		var d = a("./object");
		b.exports.cache = {}, b.exports.guid = function(a, b) {
			var c, d = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),
				e = [];
			if(b = b || d.length, a)
				for(c = 0; c < a; c++) e[c] = d[0 | Math.random() * b];
			else {
				var f;
				for(e[8] = e[13] = e[18] = e[23] = "-", e[14] = "4", c = 0; c < 36; c++) e[c] || (f = 0 | 16 * Math.random(), e[c] = d[19 == c ? 3 & f | 8 : f])
			}
			return e.join("")
		}, b.exports.expando = "vdata" + (new Date).getTime(), b.exports.getData = function(a) {
			var c = a[b.exports.expando];
			return c || (c = a[b.exports.expando] = b.exports.guid(), b.exports.cache[c] = {}), b.exports.cache[c]
		}, b.exports.hasData = function(a) {
			var c = a[b.exports.expando];
			return !(!c || d.isEmpty(b.exports.cache[c]))
		}, b.exports.removeData = function(a) {
			var c = a[b.exports.expando];
			if(c) {
				delete b.exports.cache[c];
				try {
					delete a[b.exports.expando]
				} catch(c) {
					a.removeAttribute ? a.removeAttribute(b.exports.expando) : a[b.exports.expando] = null
				}
			}
		}
	}, {
		"./object": 50
	}],
	45: [function(a, b, c) {
		var d = a("./object");
		b.exports.el = function(a) {
			return document.getElementById(a)
		}, b.exports.createEl = function(a, b) {
			var c;
			return a = a || "div", b = b || {}, c = document.createElement(a), d.each(b, function(a, b) {
				-1 !== a.indexOf("aria-") || "role" == a ? c.setAttribute(a, b) : c[a] = b
			}), c
		}, b.exports.addClass = function(a, b) {
			-1 == (" " + a.className + " ").indexOf(" " + b + " ") && (a.className = "" === a.className ? b : a.className + " " + b)
		}, b.exports.removeClass = function(a, b) {
			var c, d;
			if(-1 != a.className.indexOf(b)) {
				for(c = a.className.split(" "), d = c.length - 1; d >= 0; d--) c[d] === b && c.splice(d, 1);
				a.className = c.join(" ")
			}
		}, b.exports.getElementAttributes = function(a) {
			var b, c, d, e, f;
			if(b = {}, c = ",autoplay,controls,loop,muted,default,", a && a.attributes && a.attributes.length > 0) {
				d = a.attributes;
				for(var g = d.length - 1; g >= 0; g--) e = d[g].name, f = d[g].value, "boolean" != typeof a[e] && -1 === c.indexOf("," + e + ",") || (f = null !== f), b[e] = f
			}
			return b
		}, b.exports.insertFirst = function(a, b) {
			b.firstChild ? b.insertBefore(a, b.firstChild) : b.appendChild(a)
		}, b.exports.blockTextSelection = function() {
			document.body.focus(), document.onselectstart = function() {
				return !1
			}
		}, b.exports.unblockTextSelection = function() {
			document.onselectstart = function() {
				return !0
			}
		}, b.exports.css = function(a, b, c) {
			return !!a.style && (b && c ? (a.style[b] = c, !0) : c || "string" != typeof b ? !c && "object" == typeof b && (d.each(b, function(b, c) {
				a.style[b] = c
			}), !0) : a.style[b])
		}
	}, {
		"./object": 50
	}],
	46: [function(a, b, c) {
		function d(a, b, c, d) {
			e.each(c, function(c) {
				a(b, c, d)
			})
		}
		var e = a("./object"),
			f = a("./data");
		b.exports.on = function(a, c, g) {
			if(e.isArray(c)) return d(b.exports.on, a, c, g);
			var h = f.getData(a);
			h.handlers || (h.handlers = {}), h.handlers[c] || (h.handlers[c] = []), g.guid || (g.guid = f.guid()), h.handlers[c].push(g), h.dispatcher || (h.disabled = !1, h.dispatcher = function(c) {
				if(!h.disabled) {
					c = b.exports.fixEvent(c);
					var d = h.handlers[c.type];
					if(d)
						for(var e = d.slice(0), f = 0, g = e.length; f < g && !c.isImmediatePropagationStopped(); f++) e[f].call(a, c)
				}
			}), 1 == h.handlers[c].length && (a.addEventListener ? a.addEventListener(c, h.dispatcher, !1) : a.attachEvent && a.attachEvent("on" + c, h.dispatcher))
		}, b.exports.off = function(a, c, g) {
			if(f.hasData(a)) {
				var h = f.getData(a);
				if(h.handlers) {
					if(e.isArray(c)) return d(b.exports.off, a, c, g);
					var i = function(c) {
						h.handlers[c] = [], b.exports.cleanUpEvents(a, c)
					};
					if(c) {
						var j = h.handlers[c];
						if(j) {
							if(!g) return void i(c);
							if(g.guid)
								for(var k = 0; k < j.length; k++) j[k].guid === g.guid && j.splice(k--, 1);
							b.exports.cleanUpEvents(a, c)
						}
					} else
						for(var l in h.handlers) i(l)
				}
			}
		}, b.exports.cleanUpEvents = function(a, b) {
			var c = f.getData(a);
			0 === c.handlers[b].length && (delete c.handlers[b], a.removeEventListener ? a.removeEventListener(b, c.dispatcher, !1) : a.detachEvent && a.detachEvent("on" + b, c.dispatcher)), e.isEmpty(c.handlers) && (delete c.handlers, delete c.dispatcher, delete c.disabled), e.isEmpty(c) && f.removeData(a)
		}, b.exports.fixEvent = function(a) {
			function b() {
				return !0
			}

			function c() {
				return !1
			}
			if(!a || !a.isPropagationStopped) {
				var d = a || window.event;
				a = {};
				for(var e in d) "layerX" !== e && "layerY" !== e && "keyboardEvent.keyLocation" !== e && ("returnValue" == e && d.preventDefault || (a[e] = d[e]));
				if(a.target || (a.target = a.target || document), a.relatedTarget = a.fromElement === a.target ? a.toElement : a.fromElement, a.preventDefault = function() {
						d.preventDefault && d.preventDefault(), a.returnValue = !1, a.isDefaultPrevented = b, a.defaultPrevented = !0
					}, a.isDefaultPrevented = c, a.defaultPrevented = !1, a.stopPropagation = function() {
						d.stopPropagation && d.stopPropagation(), a.cancelBubble = !0, a.isPropagationStopped = b
					}, a.isPropagationStopped = c, a.stopImmediatePropagation = function() {
						d.stopImmediatePropagation && d.stopImmediatePropagation(), a.isImmediatePropagationStopped = b, a.stopPropagation()
					}, a.isImmediatePropagationStopped = c, null != a.clientX) {
					var f = document.documentElement,
						g = document.body;
					a.pageX = a.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = a.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)
				}
				a.which = a.charCode || a.keyCode, null != a.button && (a.button = 1 & a.button ? 0 : 4 & a.button ? 1 : 2 & a.button ? 2 : 0)
			}
			return a
		}, b.exports.trigger = function(a, c) {
			var d = f.hasData(a) ? f.getData(a) : {},
				e = a.parentNode || a.ownerDocument;
			if("string" == typeof c) {
				var g = null;
				a.paramData && (g = a.paramData, a.paramData = null, a.removeAttribute(g)), c = {
					type: c,
					target: a,
					paramData: g
				}
			}
			if(c = b.exports.fixEvent(c), d.dispatcher && d.dispatcher.call(a, c), e && !c.isPropagationStopped() && !1 !== c.bubbles) b.exports.trigger(e, c);
			else if(!e && !c.defaultPrevented) {
				var h = f.getData(c.target);
				c.target[c.type] && (h.disabled = !0, "function" == typeof c.target[c.type] && c.target[c.type](), h.disabled = !1)
			}
			return !c.defaultPrevented
		}, b.exports.one = function(a, c, g) {
			if(e.isArray(c)) return d(b.exports.one, a, c, g);
			var h = function() {
				b.exports.off(a, c, h), g.apply(this, arguments)
			};
			h.guid = g.guid = g.guid || f.guid(), b.exports.on(a, c, h)
		}
	}, {
		"./data": 44,
		"./object": 50
	}],
	47: [function(a, b, c) {
		var d = a("./data");
		b.exports.bind = function(a, b, c) {
			b.guid || (b.guid = d.guid());
			var e = function() {
				return b.apply(a, arguments)
			};
			return e.guid = c ? c + "_" + b.guid : b.guid, e
		}
	}, {
		"./data": 44
	}],
	48: [function(a, b, c) {
		var d = a("./url");
		b.exports.get = function(a, b, c, e) {
			var f, g, h, i, j;
			c = c || function() {}, "undefined" == typeof XMLHttpRequest && (window.XMLHttpRequest = function() {
				try {
					return new window.ActiveXObject("Msxml2.XMLHTTP.6.0")
				} catch(a) {}
				try {
					return new window.ActiveXObject("Msxml2.XMLHTTP.3.0")
				} catch(a) {}
				try {
					return new window.ActiveXObject("Msxml2.XMLHTTP")
				} catch(a) {}
				throw new Error("This browser does not support XMLHttpRequest.")
			}), g = new XMLHttpRequest, h = d.parseUrl(a), i = window.location, j = h.protocol + h.host !== i.protocol + i.host, !j || !window.XDomainRequest || "withCredentials" in g ? (f = "file:" == h.protocol || "file:" == i.protocol, g.onreadystatechange = function() {
				4 === g.readyState && (200 === g.status || f && 0 === g.status ? b(g.responseText) : c(g.responseText))
			}) : (g = new window.XDomainRequest, g.onload = function() {
				b(g.responseText)
			}, g.onerror = c, g.onprogress = function() {}, g.ontimeout = c);
			try {
				g.open("GET", a, !0), e && (g.withCredentials = !0)
			} catch(a) {
				return void c(a)
			}
			try {
				g.send()
			} catch(a) {
				c(a)
			}
		}, b.exports.jsonp = function(a, b, c) {
			var d = "jsonp_callback_" + Math.round(1e5 * Math.random()),
				e = document.createElement("script");
			e.src = a + (a.indexOf("?") >= 0 ? "&" : "?") + "callback=" + d + "&cb=" + d, e.onerror = function() {
				delete window[d], document.body.removeChild(e), c()
			}, e.onload = function() {
				setTimeout(function() {
					window[d] && (delete window[d], document.body.removeChild(e))
				}, 0)
			}, window[d] = function(a) {
				delete window[d], document.body.removeChild(e), b(a)
			}, document.body.appendChild(e)
		}
	}, {
		"./url": 53
	}],
	49: [function(a, b, c) {
		var d = a("./dom");
		b.exports.render = function(a, b) {
			var c = b.align ? b.align : "tl",
				e = b.x ? b.x : 0,
				f = b.y ? b.y : 0;
			"tl" === c ? d.css(a, {
				float: "left",
				"margin-left": e + "px",
				"margin-top": f + "px"
			}) : "tr" === c ? d.css(a, {
				float: "right",
				"margin-right": e + "px",
				"margin-top": f + "px"
			}) : "tlabs" === c ? d.css(a, {
				position: "absolute",
				left: e + "px",
				top: f + "px"
			}) : "trabs" === c ? d.css(a, {
				position: "absolute",
				right: e + "px",
				top: f + "px"
			}) : "blabs" === c ? d.css(a, {
				position: "absolute",
				left: e + "px",
				bottom: f + "px"
			}) : "brabs" === c ? d.css(a, {
				position: "absolute",
				right: e + "px",
				bottom: f + "px"
			}) : "cc" === c && d.css(a, {
				position: "absolute",
				left: "50%",
				top: "50%",
				"margin-top": a.offsetHeight / -2 + "px",
				"margin-left": a.offsetWidth / -2 + "px"
			})
		}
	}, {
		"./dom": 45
	}],
	50: [function(a, b, c) {
		var d = Object.prototype.hasOwnProperty;
		b.exports.create = Object.create || function(a) {
			function b() {}
			return b.prototype = a, new b
		}, b.exports.isArray = function(a) {
			return "[object Array]" === Object.prototype.toString.call(arg)
		}, b.exports.isEmpty = function(a) {
			for(var b in a)
				if(null !== a[b]) return !1;
			return !0
		}, b.exports.each = function(a, c, e) {
			if(b.exports.isArray(a))
				for(var f = 0, g = a.length; f < g && !1 !== c.call(e || this, a[f], f); ++f);
			else
				for(var h in a)
					if(d.call(a, h) && !1 === c.call(e || this, h, a[h])) break;
			return a
		}, b.exports.merge = function(a, b) {
			if(!b) return a;
			for(var c in b) d.call(b, c) && (a[c] = b[c]);
			return a
		}, b.exports.deepMerge = function(a, c) {
			var e, f, g;
			a = b.exports.copy(a);
			for(e in c) d.call(c, e) && (f = a[e], g = c[e], b.exports.isPlain(f) && b.exports.isPlain(g) ? a[e] = b.exports.deepMerge(f, g) : a[e] = c[e]);
			return a
		}, b.exports.copy = function(a) {
			return b.exports.merge({}, a)
		}, b.exports.isPlain = function(a) {
			return !!a && "object" == typeof a && "[object Object]" === a.toString() && a.constructor === Object
		}, b.exports.isArray = Array.isArray || function(a) {
			return "[object Array]" === Object.prototype.toString.call(a)
		}, b.exports.unescape = function(a) {
			return a.replace(/&([^;]+);/g, function(a, b) {
				return {
					amp: "&",
					lt: "<",
					gt: ">",
					quot: '"',
					"#x27": "'",
					"#x60": "`"
				}[b.toLowerCase()] || a
			})
		}
	}, {}],
	51: [function(a, b, c) {
		var d = a("./object"),
			e = function() {},
			e = function() {};
		e.extend = function(a) {
			var b, c;
			a = a || {}, b = a.init || a.init || this.prototype.init || this.prototype.init || function() {}, c = function() {
				b.apply(this, arguments)
			}, c.prototype = d.create(this.prototype), c.prototype.constructor = c, c.extend = e.extend, c.create = e.create;
			for(var f in a) a.hasOwnProperty(f) && (c.prototype[f] = a[f]);
			return c
		}, e.create = function() {
			var a = d.create(this.prototype);
			return this.apply(a, arguments), a
		}, b.exports = e
	}, {
		"./object": 50
	}],
	52: [function(a, b, c) {
		if(b.exports.USER_AGENT = navigator.userAgent, b.exports.IS_IPHONE = /iPhone/i.test(b.exports.USER_AGENT), b.exports.IS_IPAD = /iPad/i.test(b.exports.USER_AGENT), b.exports.IS_IPOD = /iPod/i.test(b.exports.USER_AGENT), b.exports.IS_MAC = /mac/i.test(b.exports.USER_AGENT), b.exports.IS_SAFARI = /Safari/i.test(b.exports.USER_AGENT), b.exports.IS_CHROME = /Chrome/i.test(b.exports.USER_AGENT), b.exports.IS_FIREFOX = /Firefox/i.test(b.exports.USER_AGENT), document.all) try {
			var d = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			b.exports.HAS_FLASH = !!d
		} catch(a) {
			b.exports.HAS_FLASH = !1
		} else if(navigator.plugins && navigator.plugins.length > 0) {
			var d = navigator.plugins["Shockwave Flash"];
			b.exports.HAS_FLASH = !!d
		} else b.exports.HAS_FLASH = !1;
		b.exports.IS_MAC_SAFARI = b.exports.IS_MAC && b.exports.IS_SAFARI && !b.exports.IS_CHROME && !b.exports.HAS_FLASH, b.exports.IS_IOS = b.exports.IS_IPHONE || b.exports.IS_IPAD || b.exports.IS_IPOD || b.exports.IS_MAC_SAFARI, b.exports.IOS_VERSION = function() {
			var a = b.exports.USER_AGENT.match(/OS (\d+)_/i);
			if(a && a[1]) return a[1]
		}(), b.exports.IS_ANDROID = /Android/i.test(b.exports.USER_AGENT), b.exports.ANDROID_VERSION = function() {
			var a, c, d = b.exports.USER_AGENT.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);
			return d ? (a = d[1] && parseFloat(d[1]), c = d[2] && parseFloat(d[2]), a && c ? parseFloat(d[1] + "." + d[2]) : a || null) : null
		}(), b.exports.IS_OLD_ANDROID = b.exports.IS_ANDROID && /webkit/i.test(b.exports.USER_AGENT) && b.exports.ANDROID_VERSION < 2.3, b.exports.TOUCH_ENABLED = !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch), b.exports.IS_MOBILE = b.exports.IS_IOS || b.exports.IS_ANDROID, b.exports.IS_H5 = b.exports.IS_MOBILE || !b.exports.HAS_FLASH, b.exports.IS_PC = !b.exports.IS_H5
	}, {}],
	53: [function(a, b, c) {
		var d = a("./dom");
		b.exports.getAbsoluteURL = function(a) {
			return a.match(/^https?:\/\//) || (a = d.createEl("div", {
				innerHTML: '<a href="' + a + '">x</a>'
			}).firstChild.href), a
		}, b.exports.parseUrl = function(a) {
			var b, c, e, f, g;
			f = ["protocol", "hostname", "port", "pathname", "search", "hash", "host"], c = d.createEl("a", {
				href: a
			}), e = "" === c.host && "file:" !== c.protocol, e && (b = d.createEl("div"), b.innerHTML = '<a href="' + a + '"></a>', c = b.firstChild, b.setAttribute("style", "display:none; position:absolute;"), document.body.appendChild(b)), g = {};
			for(var h = 0; h < f.length; h++) g[f[h]] = c[f[h]];
			return e && document.body.removeChild(b), g
		}
	}, {
		"./dom": 45
	}],
	54: [function(a, b, c) {
		b.exports.formatTime = function(a) {
			var b, c, d, e = Math.round(a);
			return b = Math.floor(e / 3600), e %= 3600, c = Math.floor(e / 60), d = e % 60, !(b === 1 / 0 || isNaN(b) || c === 1 / 0 || isNaN(c) || d === 1 / 0 || isNaN(d)) && (b = b >= 10 ? b : "0" + b, c = c >= 10 ? c : "0" + c, d = d >= 10 ? d : "0" + d, ("00" === b ? "" : b + ":") + c + ":" + d)
		}, b.exports.parseTime = function(a) {
			var b = a.split(":"),
				c = 0,
				d = 0,
				e = 0;
			return 3 === b.length ? (c = b[0], d = b[1], e = b[2]) : 2 === b.length ? (d = b[0], e = b[1]) : 1 === b.length && (e = b[0]), c = parseInt(c, 10), d = parseInt(d, 10), e = Math.ceil(parseFloat(e)), 3600 * c + 60 * d + e
		}, b.exports.formatDate = function(a, b) {
			var c = {
				"M+": a.getMonth() + 1,
				"d+": a.getDate(),
				"H+": a.getHours(),
				"m+": a.getMinutes(),
				"s+": a.getSeconds(),
				"q+": Math.floor((a.getMonth() + 3) / 3),
				S: a.getMilliseconds()
			};
			/(y+)/.test(b) && (b = b.replace(RegExp.$1, (a.getFullYear() + "").substr(4 - RegExp.$1.length)));
			for(var d in c) new RegExp("(" + d + ")").test(b) && (b = b.replace(RegExp.$1, 1 == RegExp.$1.length ? c[d] : ("00" + c[d]).substr(("" + c[d]).length)));
			return b
		}
	}, {}],
	55: [function(a, b, c) {
		var d, e, f = a("../lib/oo"),
			g = a("../lib/object"),
			h = a("../lib/cookie"),
			i = a("../lib/data"),
			j = a("../lib/io"),
			k = a("../lib/ua"),
			l = a("../config"),
			m = 0,
			n = {
				INIT: 1001,
				CLOSE: 1002,
				STARTFETCHDATA: 1003,
				COMPLETEFETCHDATA: 1004,
				PLAY: 2001,
				STOP: 2002,
				PAUSE: 2003,
				SEEK: 2004,
				FULLSREEM: 2005,
				QUITFULLSCREEM: 2006,
				RESOLUTION: 2007,
				RESOLUTION_DONE: 2009,
				RECOVER: 2010,
				SEEK_END: 2011,
				LOADSTART: 2015,
				LOADEDMETADATA: 2016,
				LOADEDDATA: 2017,
				CANPLAY: 2018,
				CANPLAYTHROUGH: 2019,
				FETCHEDIP: 2020,
				CDNDETECT: 2021,
				DETECT: 2022,
				UNDERLOAD: 3002,
				LOADED: 3001,
				HEARTBEAT: 9001,
				ERROR: 4001
			},
			o = f.extend({
				init: function(a, b, c) {
					void 0 === c && (c = !1), this.isDebug = c, this.player = a, this.requestId = "", this.sessionId = i.guid(), this.playId = 0;
					var d = this.player.getOptions(),
						e = b.from ? b.from : "",
						f = (d.isLive, d.isLive ? "pusher" : "player"),
						g = d.isLive ? "live" : "vod",
						h = "pc";
					k.IS_IPAD ? h = "pad" : k.IS_IPHONE ? h = "iphone" : k.IS_ANDROID && (h = "andorid");
					var m = k.IS_PC ? "pc_h5" : "h5",
						n = l.h5Version,
						o = this._getUuid(),
						p = d.source ? encodeURIComponent(d.source) : "",
						q = "0",
						r = this.sessionId,
						s = "0",
						t = "0",
						u = "custom",
						v = "0.0.0.0",
						w = "0.0.0.0",
						x = (new Date).getTime();
					this._userNetInfo = {
						cdnIp: "",
						localIp: ""
					};
					var y = this;
					try {
						var z = function(a) {
							y._log("FETCHEDIP", {
								error: a || "获取IP出错"
							})
						};
						(function(a) {
							return j.jsonp("https://cdn.dns-detect.alicdn.com/api/cdnDetectHttps?method=createDetectHttps", function(b) {
								return j.jsonp(b.content, a, z)
							}, z)
						})(function(a) {
							v = y._userNetInfo.cdnIp = a.content.ldns,
								w = y._userNetInfo.localIp = a.content.localIp, y._log("FETCHEDIP", {
									cdn_ip: v,
									local_ip: w
								})
						})
					} catch(a) {
						console.log(a)
					}
					this.opt = {
						APIVersion: "0.6.0",
						t: x,
						ll: "info",
						lv: "1.0",
						pd: f,
						md: "saas_player",
						hn: "0.0.0.0",
						bi: e,
						ri: r,
						e: s,
						args: t,
						vt: g,
						tt: h,
						dm: m,
						av: n,
						uuid: o,
						vu: p,
						ua: q,
						dn: u,
						cdn_ip: v,
						r: ""
					}, this.bindEvent()
				},
				updateVideoInfo: function(a) {
					var b = this.player.getOptions(),
						c = a.from ? a.from : "",
						d = (b.isLive, "player"),
						e = b.isLive ? "live" : "vod",
						f = "pc";
					k.IS_IPAD ? f = "pad" : k.IS_IPHONE ? f = "iphone" : k.IS_ANDROID && (f = "andorid");
					var g = k.IS_PC ? "pc_h5" : "h5",
						h = l.h5Version,
						i = this._getUuid(),
						j = b.source ? encodeURIComponent(b.source) : "",
						m = this.sessionId,
						n = (new Date).getTime();
					this.opt = {
						APIVersion: "0.6.0",
						t: n,
						ll: "info",
						lv: "1.0",
						pd: d,
						md: "saas_player",
						hn: "0.0.0.0",
						bi: c,
						ri: m,
						e: "0",
						args: "0",
						vt: e,
						tt: f,
						dm: g,
						av: h,
						uuid: i,
						vu: j,
						ua: "0",
						dn: "custom",
						cdn_ip: "0.0.0.0",
						r: ""
					}
				},
				bindEvent: function() {
					var a = this;
					this.player.on("init", function() {
						a._onPlayerInit()
					}), window.addEventListener("beforeunload", function() {
						a._onPlayerClose()
					}), this.player.on("loadstart", function() {
						a._onPlayerloadstart()
					}), this.player.on("loadedmetadata", function() {
						a._onPlayerLoadMetadata()
					}), this.player.on("loadeddata", function() {
						a._onPlayerLoaddata()
					}), this.player.on("play", function() {
						a._onPlayerPlay()
					}), this.player.on("ready", function() {
						a._onPlayerReady()
					}), this.player.on("ended", function() {
						a._onPlayerFinish()
					}), this.player.on("play", function() {
						a._onPlayerPlay()
					}), this.player.on("pause", function() {
						a._onPlayerPause()
					}), this.player.on("seekStart", function(b) {
						a._onPlayerSeekStart(b)
					}), this.player.on("seekEnd", function(b) {
						a._onPlayerSeekEnd(b)
					}), this.player.on("waiting", function() {
						a._onPlayerLoaded()
					}), this.player.on("canplaythrough", function() {
						a._onPlayerUnderload()
					}), this.player.on("canplay", function() {
						a._onPlayerCanplay()
					}), this.player.on("error", function() {
						a._onPlayerError()
					}), d = setInterval(function() {
						2 === a.player.readyState() || 3 === a.player.readyState() ? a._onPlayerLoaded() : 4 === a.player.readyState() && a._onPlayerUnderload()
					}, 100), e = setInterval(function() {
						if(a.player.getCurrentTime()) {
							var b = Math.floor(1e3 * a.player.getCurrentTime());
							a.player.paused() || ++m >= 30 && (a._log("HEARTBEAT", {
								vt: b,
								interval: 1e3 * m
							}), m = 0)
						}
					}, 1e3)
				},
				removeEvent: function() {
					this.player.off("init"), this.player.off("ready"), this.player.off("ended"), this.player.off("play"), this.player.off("pause"), this.player.off("seekStart"), this.player.off("seekEnd"), this.player.off("canplaythrough"), this.player.off("error"), clearInterval(d)
				},
				_onPlayerloadstart: function() {
					this.playId = i.guid(), this._log("LOADSTART", {
						pt: (new Date).getTime()
					})
				},
				_onPlayerLoadMetadata: function() {
					this._log("LOADEDMETADATA", {
						pt: (new Date).getTime()
					})
				},
				_onPlayerLoaddata: function() {
					this._log("LOADEDDATA", {
						pt: (new Date).getTime()
					})
				},
				_onPlayerCanplay: function() {
					this._log("CANPLAY", {
						pt: (new Date).getTime()
					})
				},
				_onPlayerInit: function() {
					this._log("INIT", {
						pt: (new Date).getTime()
					}), this.buffer_flag = 0, this.pause_flag = 0
				},
				_onPlayerClose: function() {
					this._log("CLOSE", {
						vt: Math.floor(1e3 * this.player.getCurrentTime())
					})
				},
				_onPlayerReady: function() {
					this.startTimePlay = (new Date).getTime()
				},
				_onPlayerFinish: function() {
					this._log("STOP", {
						vt: Math.floor(1e3 * this.player.getCurrentTime())
					}), this.playId = 0
				},
				_onPlayerPlay: function() {
					if(0 == this.playId && (this.playId = i.guid()), !this.buffer_flag && this.player._options.autoplay) return this.first_play_time = (new Date).getTime(), this._log("PLAY", {
						dsm: "fix",
						vt: 0,
						start_cost: this.first_play_time - this.player.getReadyTime()
					}), void(this.buffer_flag = 1);
					this.buffer_flag && this.pause_flag && (this.pause_flag = 0, this.pauseEndTime = (new Date).getTime(), this._log("RECOVER", {
						vt: Math.floor(1e3 * this.player.getCurrentTime()),
						cost: this.pauseEndTime - this.pauseTime
					}))
				},
				_onPlayerPause: function() {
					this.buffer_flag && this.startTimePlay && (this.seeking || (this.pause_flag = 1, this.pauseTime = (new Date).getTime(), this._log("PAUSE", {
						vt: Math.floor(1e3 * this.player.getCurrentTime())
					})))
				},
				_onPlayerSeekStart: function(a) {
					this.seekStartTime = a.paramData.fromTime, this.seeking = !0, this.seekStartStamp = (new Date).getTime()
				},
				_onPlayerSeekEnd: function(a) {
					this.seekEndStamp = (new Date).getTime(), this._log("SEEK", {
						drag_from_timestamp: Math.floor(1e3 * this.seekStartTime),
						drag_to_timestamp: Math.floor(1e3 * a.paramData.toTime)
					}), this._log("SEEK_END", {
						vt: Math.floor(1e3 * this.player.getCurrentTime()),
						cost: this.seekEndStamp - this.seekStartStamp
					}), this.seeking = !1
				},
				_onPlayerLoaded: function() {
					this.buffer_flag && this.startTimePlay && (this.stucking || this.seeking || (this.stuckStartTime = (new Date).getTime(), this.stuckStartTime - this.startTimePlay <= 1e3 || (this.stucking = !0, this._log("UNDERLOAD", {
						vt: Math.floor(1e3 * this.player.getCurrentTime())
					}), this.stuckStartTime = (new Date).getTime())))
				},
				_onPlayerUnderload: function() {
					if(!this.buffer_flag && !this.player._options.autoplay) return this.first_play_time = (new Date).getTime(), this._log("PLAY", {
						play_mode: "fix",
						vt: 0,
						start_cost: this.first_play_time - this.player.getReadyTime()
					}), void(this.buffer_flag = 1);
					if((this.buffer_flag || !this.player._options.autoplay) && this.stucking && !this.seeking) {
						var a = Math.floor(1e3 * this.player.getCurrentTime()),
							b = this.stuckStartTime || (new Date).getTime(),
							c = Math.floor((new Date).getTime() - b);
						c < 0 && (c = 0), this._log("LOADED", {
							vt: a,
							cost: c
						}), this.stucking = !1
					}
				},
				_onPlayerHeartBeat: function() {
					if(!this.seeking) {
						var a = Math.floor(1e3 * this.player.getCurrentTime()),
							b = this;
						this.timer || (this.timer = setTimeout(function() {
							!b.seeking && b._log("HEARTBEAT", {
								progress: a
							}), clearTimeout(b.timer), b.timer = null
						}, 6e4)), console.log("timeupdate")
					}
				},
				_onPlayerError: function() {
					this.playId = 0
				},
				_log: function(a, b) {
					var c = g.copy(this.opt);
					if(this.requestId = i.guid(), "ERROR" == a && "FETCHEDIP" != a && "CDNDETECT" != a) {
						var d = this;
						j.jsonp("https://cdn.dns-detect.alicdn.com/api/cdnDetectHttps?method=createDetectHttps", function(a) {
							d._log("CDNDETECT", {
								flag: 0,
								error: "",
								eri: d.requestId
							})
						}, function(a) {
							d._log("CDNDETECT", {
								flag: 1,
								error: a || "访问CDN错误",
								eri: d.requestId
							})
						})
					}
					var e = l.logReportTo;
					c.e = n[a], c.ri = this.requestId, c.t = (new Date).getTime(), c.cdn_ip = this._userNetInfo.cdnIp, c.hn = this._userNetInfo.localIp, c.r = document.referrer ? document.referrer : "", c.s = this.playId;
					var f = [];
					g.each(b, function(a, b) {
						f.push(a + "=" + b)
					}), f.push("sri=" + this.player.getServerRequestId()), f.push("ua=" + k.USER_AGENT), f.push("sid=" + this.sessionId);
					var h = "",
						m = this.player.getOptions();
					m && m.vid && (h = m.vid), f.push("vid=" + h), f = f.join("&"), "" == f && (f = "0"), c.args = encodeURIComponent(f);
					var o = [];
					g.each(c, function(a, b) {
						o.push(a + "=" + b)
					}), o = o.join("&"), this.isDebug || j.jsonp(e + "?" + o, function() {}, function() {})
				},
				_getUuid: function() {
					var a = h.get("p_h5_u");
					return a || (a = i.guid(), h.set("p_h5_u", a, 7)), a
				}
			});
		b.exports = o
	}, {
		"../config": 40,
		"../lib/cookie": 43,
		"../lib/data": 44,
		"../lib/io": 48,
		"../lib/object": 50,
		"../lib/oo": 51,
		"../lib/ua": 52
	}],
	56: [function(a, b, c) {
		var d = a("../ui/component"),
			e = a("../lib/data"),
			f = a("../lib/object"),
			g = a("../config"),
			h = d.extend({
				init: function(a, b) {
					d.call(this, this, b), this._id = this.id = "prism-player-" + e.guid(), this.tag = a, this._el = this.tag, window[this.id] = this;
					var c = "100%",
						f = "100%",
						h = "//" + g.domain + "/de/prismplayer-flash/" + g.flashVersion + "/PrismPlayer.swf",
						i = this._comboFlashVars(),
						j = this._options.wmode ? this._options.wmode : "opaque";
					a.innerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0" width="' + c + '" height="' + f + '" id="' + this.id + '"><param name=movie value="' + h + '"><param name=quality value=High><param name="FlashVars" value="' + i + '"><param name="WMode" value="' + j + '"><param name="AllowScriptAccess" value="always"><param name="AllowFullScreen" value="true"><param name="AllowFullScreenInteractive" value="true"><embed name="' + this.id + '" src="' + h + '" quality=high pluginspage="//www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="' + c + '" height="' + f + '" AllowScriptAccess="always" AllowFullScreen="true" AllowFullScreenInteractive="true" WMode="' + j + '" FlashVars="' + i + '"></embed></object>'
				},
				_getPlayer: function(a) {
					return -1 != navigator.appName.indexOf("Microsoft") ? document.getElementById(a) : document[a]
				},
				_comboFlashVars: function() {
					var a = this._options,
						b = {
							autoPlay: a.autoplay ? 1 : 0,
							isInner: 0,
							actRequest: 1,
							vid: a.vid,
							domain: a.domain ? a.domain : "//tv.taobao.com",
							statisticService: a.statisticService ? a.statisticService : g.logReportTo,
							videoInfoService: a.videoInfoService ? a.videoInfoService : "/player/json/getBaseVideoInfo.do",
							disablePing: a.trackLog ? 0 : 1,
							namespace: this.id,
							barMode: 0 != a.barMode ? 1 : 0,
							isLive: a.isLive ? 1 : 0,
							waterMark: a.waterMark,
							environment: a.environment,
							vurl: a.source ? encodeURIComponent(a.source) : "",
							plugins: a.plugins ? a.plugins : "",
							snapShotShow: a.snapshot ? 1 : 0,
							accessId: a.accId ? a.accId : "",
							accessKey: a.accSecret ? a.accSecret : "",
							apiKey: a.apiKey ? a.apiKey : "",
							flashApiKey: a.flashApiKey ? a.flashApiKey : "",
							disableSeek: a.disableSeek ? 1 : 0,
							disableFullScreen: a.disableFullScreen ? 1 : 0,
							stsToken: a.stsToken ? a.stsToken : "",
							domainRegion: a.domainRegion ? a.domainRegion : "",
							authInfo: a.authInfo ? encodeURIComponent(a.authInfo) : "",
							playDomain: a.playDomain ? a.playDomain : "",
							stretcherZoomType: a.stretcherZoomType ? a.stretcherZoomType : "",
							playauth: a.playauth ? a.playauth.replace(/\+/g, "%2B") : "",
							prismType: a.prismType ? a.prismType : 0,
							formats: a.formats ? a.formats : "",
							notShowTips: a.notShowTips ? 1 : 0,
							showBarTime: a.showBarTime ? a.showBarTime : 0,
							showBuffer: 0 == a.showBuffer ? 0 : 1,
							rePlay: a.rePlay ? 1 : 0,
							encryp: a.encryp ? a.encryp : "",
							secret: a.secret ? a.secret : ""
						},
						c = [];
					return a.cover && (b.cover = a.cover), a.extraInfo && (b.extraInfo = encodeURIComponent(JSON.stringify(a.extraInfo))), f.each(b, function(a, b) {
						c.push(a + "=" + b)
					}), c.join("&")
				},
				flashReady: function() {
					this.flashPlayer = this._getPlayer(this.id), this._isReady = !0;
					var a, b = this._options.skinRes,
						c = this._options.skinLayout;
					if(!1 !== c && !f.isArray(c)) throw new Error("PrismPlayer Error: skinLayout should be false or type of array!");
					if("string" != typeof b) throw new Error("PrismPlayer Error: skinRes should be string!");
					a = 0 != c && 0 !== c.length && {
						skinRes: b,
						skinLayout: c
					}, this.flashPlayer.setPlayerSkin(a), this.trigger("ready");
					var d = this;
					window.addEventListener("beforeunload", function() {
						try {
							d.flashPlayer.setPlayerCloseStatus()
						} catch(a) {}
					})
				},
				jsReady: function() {
					return !0
				},
				uiReady: function() {
					this.trigger("uiReady")
				},
				loadedmetadata: function() {
					this.trigger("loadedmetadata")
				},
				onPlay: function() {
					this.trigger("play")
				},
				onEnded: function() {
					this.trigger("ended")
				},
				onPause: function() {
					this.trigger("pause")
				},
				onBulletScreenReady: function() {
					this.trigger("bSReady")
				},
				onBulletScreenMsgSend: function(a) {
					this.trigger("bSSendMsg", a)
				},
				onVideoRender: function(a) {
					this.trigger("videoRender"), this.trigger("canplay", {
						loadtime: a
					})
				},
				onVideoError: function(a) {
					this.trigger("error", {
						errortype: a
					})
				},
				onM3u8Retry: function() {
					this.trigger("m3u8Retry")
				},
				hideBar: function() {
					this.trigger("hideBar")
				},
				showBar: function() {
					this.trigger("showBar")
				},
				liveStreamStop: function() {
					this.trigger("liveStreamStop")
				},
				stsTokenExpired: function() {
					this.trigger("stsTokenExpired")
				},
				onVideoBuffer: function() {
					this.trigger("waiting")
				},
				_invoke: function() {
					var a = arguments[0],
						b = arguments;
					if(Array.prototype.shift.call(b), !this.flashPlayer) throw new Error("PrismPlayer Error: flash player is not ready!");
					if("function" != typeof this.flashPlayer[a]) throw new Error("PrismPlayer Error: function " + a + " is not found!");
					return this.flashPlayer[a].apply(this.flashPlayer, b)
				},
				play: function() {
					this._invoke("playVideo")
				},
				replay: function() {
					this._invoke("replayVideo")
				},
				pause: function() {
					this._invoke("pauseVideo")
				},
				stop: function() {
					this._invoke("stopVideo")
				},
				seek: function(a) {
					this._invoke("seekVideo", a)
				},
				getCurrentTime: function() {
					return this._invoke("getCurrentTime")
				},
				getDuration: function() {
					return this._invoke("getDuration")
				},
				mute: function() {
					this.setVolume(0)
				},
				unMute: function() {
					this.setVolume(.5)
				},
				getVolume: function() {
					return this._invoke("getVolume")
				},
				setVolume: function(a) {
					this._invoke("setVolume", a)
				},
				loadByVid: function(a) {
					this._invoke("loadByVid", a, !1)
				},
				loadByUrl: function(a, b) {
					this._invoke("loadByUrl", a, b)
				},
				dispose: function() {
					this._invoke("pauseVideo")
				},
				showBSMsg: function(a) {
					this._invoke("showBSMsg", a)
				},
				setToastEnabled: function(a) {
					this._invoke("setToastEnabled", a)
				},
				setLoadingInvisible: function() {
					this._invoke("setLoadingInvisible")
				},
				setPlayerSize: function(a, b) {
					if(this._el.style.width = a, b.indexOf("%") > 0) {
						var c = window.screen.height,
							d = b.replace("%", "");
						if(isNaN(d)) this._el.style.height = b;
						else {
							var e = 9 * c * parseInt(d) / 1e3;
							this._el.style.height = String(e % 2 ? e + 1 : e) + "px"
						}
					} else this._el.style.height = b;
					console.log(a + b)
				}
			});
		b.exports = h
	}, {
		"../config": 40,
		"../lib/data": 44,
		"../lib/object": 50,
		"../ui/component": 62
	}],
	57: [function(require, module, exports) {
		function sleep(a) {
			for(var b = Date.now(); Date.now() - b <= a;);
		}

		function mtsError_message(a, b, c) {
			var d = a,
				e = b.Code ? b.Code : "OTHER_ERR_CODE",
				f = b.Message ? b.Message : "OTHER_ERR_MSG",
				g = constants.ErrorCode.ServerAPIError;
			"InvalidParameter.Rand" == b.Code && (g = constants.ErrorCode.EncrptyVideoNotSupport, display_msg = "h5不支持加密视频的播放");
			var h = d._options.vid ? d._options.vid : "0",
				i = (d._options.from && d._options.from, {
					statusValue: g,
					mediaId: h,
					error_code: e,
					error_msg: e + "||" + f,
					display_msg: "获取地址出错啦，请尝试退出重试或刷新"
				});
			d.logError(i), d.trigger("error", i), console.log("PrismPlayer Error: " + c + "! error_msg :" + f + ";")
		}
		var Component = require("../ui/component"),
			_ = require("../lib/object"),
			Dom = require("../lib/dom"),
			Event = require("../lib/event"),
			io = require("../lib/io"),
			UI = require("../ui/exports"),
			ErrorDisplay = require("../ui/component/error-display"),
			Monitor = require("../monitor/monitor"),
			UA = require("../lib/ua"),
			vod = require("./saas/vod"),
			signature = require("./saas/signature"),
			constants = require("../lib/constants.js"),
			AuthKeyExpiredHandle = require("./saas/authkeyexpiredhandle.js"),
			CryptoJS = require("crypto-js"),
			debug_flag = 0,
			Player = Component.extend({
				init: function(tag, options) {
					if(this.tag = tag, this.loaded = !1, this.played = !1, this.waiting = !1, this._urls = [], this._currentPlayIndex = 0, this._retrySwitchUrlCount = 0, this._serverRequestId = "", this._isError = !1, this._authKeyExpiredHandle = new AuthKeyExpiredHandle(this), Component.call(this, this, options), options.plugins && _.each(options.plugins, function(a, b) {
							this[a](b)
						}, this), this.UI = {}, options.useNativeControls ? this.tag.setAttribute("controls", "controls") : this.UI = UI, this.UI.errorDisplay = ErrorDisplay, this.initChildren(), this.bindVideoEvent(), this._monitor = new Monitor(this, {
							video_id: 0,
							album_id: 0,
							from: this._options.from
						}, this._options.trackLog), this.checkOnline()) {
						if(this._options.source) this.initPlay();
						else if(this._options.vid) switch(this._options.prismType) {
							case 1:
								this.loadVideoInfo();
								break;
							case 2:
							case 3:
								this.reloadNewVideoInfo();
								break;
							default:
								this.userPlayInfoAndVidRequestMts()
						}
						if(this._options.extraInfo) {
							var dict = eval(this._options.extraInfo);
							dict.liveRetry && (this._options.liveRetry = dict.liveRetry)
						}
						this.on("readyState", function() {
							this.trigger("ready"), debug_flag && console.log("ready")
						})
					}
				}
			});
		Player.prototype.initPlay = function(a) {
			void 0 === a && (a = !1), this._checkSupportVideoType() || (this._options.autoplay || this.trigger("play_btn_show"), this.loaded || this.trigger("init"), (this._options.autoplay || this._options.preload || a) && (this.getMetaData(), this.tag.setAttribute("src", this._options.source), this.readyTime = (new Date).getTime(), this.loaded = !0))
		}, Player.prototype.initChildren = function() {
			var a = this.options(),
				b = a.skinLayout;
			if(!1 !== b && !_.isArray(b)) throw new Error("PrismPlayer Error: skinLayout should be false or type of array!");
			!1 !== b && 0 !== b.length && (this.options({
				children: b
			}), Component.prototype.initChildren.call(this)), this.trigger("uiH5Ready"), debug_flag && console.log("uiH5ready")
		}, Player.prototype.createEl = function() {
			"VIDEO" !== this.tag.tagName && (this._el = this.tag, this.tag = Component.prototype.createEl.call(this, "video"), this._options.playsinline && (this.tag.setAttribute("webkit-playsinline", ""), this.tag.setAttribute("playsinline", ""), this.tag.setAttribute("x-webkit-airplay", "")));
			var a = this._el,
				b = this.tag;
			b.addEventListener ? b.addEventListener("contextmenu", function(a) {
				a.preventDefault()
			}, !1) : b.attachEvent("oncontextmenu", function() {
				window.event.returnValue = !1
			}), b.player = this;
			var c = Dom.getElementAttributes(b);
			return _.each(c, function(b) {
				a.setAttribute(b, c[b])
			}), this.setVideoAttrs(), b.parentNode && b.parentNode.insertBefore(a, b), Dom.insertFirst(b, a), this.cover = Dom.createEl("div"), Dom.addClass(this.cover, "prism-cover"), a.appendChild(this.cover), this.options().cover && (this.cover.style.backgroundImage = "url(" + this.options().cover + ")"), UA.IS_IOS && Dom.css(b, "display", "none"), a
		}, Player.prototype.setVideoAttrs = function() {
			var a = this._options.preload,
				b = this._options.autoplay;
			this.tag.style.width = "100%", this.tag.style.height = "100%", a && this.tag.setAttribute("preload", "preload"), b && this.tag.setAttribute("autoplay", "autoplay")
		}, Player.prototype.checkOnline = function() {
			if(0 == navigator.onLine) {
				var a = {
					statusValue: 4001,
					mediaId: this._options.vid ? this._options.vid : "",
					error_code: constants.ErrorCode.NetworkUnavaiable,
					error_msg: "网络不可用",
					display_msg: "网络不可用，请确定"
				};
				return this.logError(a), this.trigger("error", a), !1
			}
			return !0
		}, Player.prototype.id = function() {
			return this.el().id
		}, Player.prototype.renderUI = function() {}, Player.prototype.switchUrl = function() {
			if(0 != this._urls.length) {
				this._currentPlayIndex = this._currentPlayIndex + 1, this._urls.length <= this._currentPlayIndex && (this._currentPlayIndex = 0, this._retrySwitchUrlCount++);
				this.getCurrentTime();
				this._options.source = this._urls[this._currentPlayIndex].Url, this.tag.setAttribute("src", this._options.source), this.tag.play()
			}
		}, Player.prototype.userPramaRequestMts = function(a) {
			this.log("STARTFETCHDATA", {
				pt: (new Date).getTime()
			});
			var b = this;
			this._urls = [], this.currentPlayIndex = 0, this._retrySwitchUrlCount = 0, a || (a = {
				vid: this._options.vid,
				accessId: this._options.accId,
				accessSecret: this._options.accSecret,
				stsToken: this._options.stsToken,
				domainRegion: this._options.domainRegion,
				authInfo: this._options.authInfo,
				playDomain: this._options.domainRegion
			}), this._authKeyExpiredHandle.clearTick(), vod.getDataByAuthInfo(a, function(a) {
				if(b._serverRequestId = a.requestId, b.log("COMPLETEFETCHDATA", {
						pt: (new Date).getTime()
					}), 0 == a.urls.length) return void mtsError_message(b, {
					Code: constants.ErrorCode.URLsIsEmpty,
					Message: "获取播放地址为空"
				}, "");
				b._urls = a.urls;
				var c = a.urls[b.currentPlayIndex],
					d = c.Url;
				b._options.source = d, b._authKeyExpiredHandle.tick(constants.AuthKeyRefreshExpired), b.trigger("sourceloaded", c), b.initPlay()
			}, function(a) {
				b.log("COMPLETEFETCHDATA", {
					pt: (new Date).getTime()
				}), mtsError_message(b, a, "")
			})
		}, Player.prototype.userPlayInfoAndVidRequestMts = function() {
			try {
				var a = signature.encPlayAuth(this._options.playauth)
			} catch(a) {
				var b = {
					Code: constants.ErrorCode.PlayauthDecode,
					Message: "playauth decoded failed.",
					displayMessage: "playauth解析错误"
				};
				return void mtsError_message(this, b, this._options.playauth)
			}
			this._options.from = a.CustomerId ? a.CustomerId : "";
			var c = a.VideoMeta.CoverURL;
			this.cover && c && !this._options.cover && (this.cover.style.backgroundImage = "url(" + c + ")");
			var d = {
				vid: this._options.vid,
				accessId: a.AccessKeyId,
				accessSecret: a.AccessKeySecret,
				stsToken: a.SecurityToken,
				domainRegion: a.Region,
				authInfo: a.AuthInfo,
				playDomain: a.PlayDomain
			};
			this.userPramaRequestMts(d)
		}, Player.prototype.replayByVidAndPlayAuth = function(a, b) {
			this.trigger("error_hide"), this._options.source = "", this._options.vid = a, this._options.playauth = b, this.userPlayInfoAndVidRequestMts()
		}, Player.prototype.updateSourcesByVidAndPlayAuth = function(a, b) {
			if(a != this._options.vid) return void console.log("不能更新地址，vid和播放中的不一致");
			this._options.vid = a, this._options.playauth = b;
			try {
				var c = signature.encPlayAuth(this._options.playauth)
			} catch(a) {
				return void console.log("playauth解析错误")
			}
			var d = {
				vid: a,
				accessId: c.AccessKeyId,
				accessSecret: c.AccessKeySecret,
				stsToken: c.SecurityToken,
				domainRegion: c.Region,
				authInfo: c.AuthInfo,
				playDomain: c.PlayDomain
			};
			this._authKeyExpiredHandle.clearTick();
			var e = this;
			vod.getDataByAuthInfo(d, function(a) {
				e._serverRequestId = a.requestId, 0 != a.urls.length && (e._urls = a.urls), e._authKeyExpiredHandle.tick(constants.AuthKeyRefreshExpired)
			}, function(a) {
				console.log(a)
			})
		}, Player.prototype.reloaduserPlayInfoAndVidRequestMts = function(a, b) {
			this.replayByVidAndPlayAuth(a, b)
		}, Player.prototype.reloadNewVideoInfo = function(a, b, c, d, e, f, g) {
			this.trigger("error_hide"), this._options.source = "", a && (this._options.vid = a, this._options.accId = b, this._options.accessSecret = c, this._options.stsToken = e, this._options.domainRegion = g, this._options.authInfo = f), this.userPramaRequestMts()
		}, Player.prototype.loadVideoInfo = function() {
			this.trigger("error_hide");
			var a = this._options.vid,
				b = this;
			if(!a) throw new Error("PrismPlayer Error: vid should not be null!");
			io.jsonp("//tv.taobao.com/player/json/getBaseVideoInfo.do?vid=" + a + "&playerType=3", function(c) {
				if(1 !== c.status || !c.data.source) throw new Error("PrismPlayer Error: #vid:" + a + " cannot find video resource!");
				var d, e = -1;
				_.each(c.data.source, function(a, b) {
					var c = +a.substring(1);
					c > e && (e = c)
				}), d = c.data.source["v" + e], d = _.unescape(d), b._options.source = d, b.initPlay()
			}, function() {
				throw new Error("PrismPlayer Error: network error!")
			})
		}, Player.prototype.setControls = function() {
			var a = this.options();
			if(a.useNativeControls) this.tag.setAttribute("controls", "controls");
			else if("object" == typeof a.controls) {
				var b = this._initControlBar(a.controls);
				this.addChild(b)
			}
		}, Player.prototype._initControlBar = function(a) {
			return new ControlBar(this, a)
		}, Player.prototype.getMetaData = function() {
			var a = this,
				b = null,
				c = this.tag;
			b = window.setInterval(function(d) {
				if(!a.tag) return void clearInterval(b);
				if(c.readyState > 0) {
					var e = Math.round(c.duration);
					a.tag.duration = e, a.trigger("readyState"), debug_flag && console.log("readystate"), clearInterval(b)
				}
			}, 100)
		}, Player.prototype.getReadyTime = function() {
			return this.readyTime
		}, Player.prototype.readyState = function() {
			return this.tag.readyState
		}, Player.prototype.getError = function() {
			return this.tag.error
		}, Player.prototype.getServerRequestId = function() {
			return this._serverRequestId
		}, Player.prototype.getRecentOccuredEvent = function() {
			return this._eventState
		}, Player.prototype.getSourceUrl = function() {
			return this._options ? this._options.source : ""
		}, Player.prototype.getMonitorInfo = function() {
			return this._monitor ? this._monitor.opt : {}
		}, Player.prototype.play = function() {
			var a = this;
			return this._options.preload || this.loaded || (this.getMetaData(), this.tag.setAttribute("src", this._options.source), this.readyTime = (new Date).getTime(), this.loaded = !0), a.cover && !a._options.autoplay && (Dom.css(a.cover, "display", "none"), delete a.cover), this.tag.play(), this
		}, Player.prototype.replay = function() {
			return this.seek(0), this.tag.play(), this
		}, Player.prototype.pause = function() {
			return this.tag.pause(), this
		}, Player.prototype.stop = function() {
			return this.tag.setAttribute("src", null), this
		}, Player.prototype.paused = function() {
			return !1 !== this.tag.paused
		}, Player.prototype.getDuration = function() {
			var a = 0;
			return this.tag && (a = this.tag.duration), a
		}, Player.prototype.getCurrentTime = function() {
			return this.tag ? this.tag.currentTime : 0
		}, Player.prototype.seek = function(a) {
			a === this.tag.duration && a--;
			try {
				this.tag.currentTime = a
			} catch(a) {
				console.log(a)
			}
			return this
		}, Player.prototype.loadByVid = function(a) {
			this._options.vid = a;
			var b = this;
			if(!a) throw new Error("PrismPlayer Error: vid should not be null!");
			io.jsonp("//tv.taobao.com/player/json/getBaseVideoInfo.do?vid=" + a + "&playerType=3", function(c) {
				if(1 !== c.status || !c.data.source) throw new Error("PrismPlayer Error: #vid:" + a + " cannot find video resource!");
				var d, e = -1;
				_.each(c.data.source, function(a, b) {
					var c = +a.substring(1);
					c > e && (e = c)
				}), d = c.data.source["v" + e], d = _.unescape(d), b._options.source = d, b._monitor && b._monitor.updateVideoInfo({
					video_id: a,
					album_id: c.data.baseInfo.aid,
					from: b._options.from
				}), b._options.autoplay = !0, b.initPlay(), b.cover && b._options.autoplay && (Dom.css(b.cover, "display", "none"), delete b.cover), b.tag.play()
			}, function() {
				throw new Error("PrismPlayer Error: network error!")
			})
		}, Player.prototype.firstNewUrlloadByUrl = function(a, b) {
			this._options.vid = 0, this._options.source = a, this._monitor && this._monitor.updateVideoInfo({
				video_id: 0,
				album_id: 0,
				from: this._options.from
			}), this.initPlay(), this.cover && (this._options.preload || this._options.autoplay) && (Dom.css(this.cover, "display", "none"), delete this.cover), this._options.autoplay ? this.trigger("play") : this.trigger("pause"), b && !isNaN(b) && this.seek(b)
		}, Player.prototype.loadByUrl = function(a, b) {
			this.trigger("error_hide"), this._options.vid = 0, this._options.source = a, this._monitor && this._monitor.updateVideoInfo({
				video_id: 0,
				album_id: 0,
				from: this._options.from
			}), this.initPlay(!0), this.cover && (this._options.preload || this._options.autoplay) && (Dom.css(this.cover, "display", "none"), delete this.cover), this._options.autoplay ? this.trigger("play") : this.trigger("pause");
			var c = this;
			Event.one(this.tag, "canplay", function(a) {
				b && !isNaN(b) && c.seek(b)
			})
		}, Player.prototype.dispose = function() {
			this.tag.pause();
			var a = this.tag;
			Event.off(a, "timeupdate"), Event.off(a, "play"), Event.off(a, "pause"), Event.off(a, "canplay"), Event.off(a, "waiting"), Event.off(a, "playing"), Event.off(a, "ended"), Event.off(a, "error"), Event.off(a, "suspend"), Event.off(a, "stalled"), Event.off(a, "loadstart"), Event.off(a, "durationchange"), Event.off(a, "loadedmetadata"), Event.off(a, "loadeddata"), Event.off(a, "progress"), Event.off(a, "canplaythrough"), Event.off(a, "contextmenu"), Event.off(a, "webkitfullscreenchange"), this.off("timeupdate"), this.off("durationchange"), this.off("play_btn_show"), this.off("init"), this.off("ready"), this.off("uiH5Ready"), this.off("error_hide"), this.off("error_show"), this.off("h5_loading_show"), this.off("h5_loading_hide"), this.off("hideProgress"), this.off("cancelHideProgress"), this.off("requestFullScreen"), this.off("cancelFullScreen"), this.off("play"), this.off("pause"), this.off("click"), this.off("mouseover"), this.off("mouseout"), this.off("hideBar"), this.off("showBar"), this.off("readyState"), this.off("sourceloaded"), this.tag = null, this._options = null, this._monitor && (this._monitor.removeEvent(), this._monitor = null)
		}, Player.prototype.mute = function() {
			return this.tag.muted = !0, this
		}, Player.prototype.unMute = function() {
			return this.tag.muted = !1, this
		}, Player.prototype.muted = function() {
			return this.tag.muted
		}, Player.prototype.getVolume = function() {
			return this.tag.volume
		}, Player.prototype.getOptions = function() {
			return this._options
		}, Player.prototype.setVolume = function(a) {
			this.tag.volume = a
		}, Player.prototype.hideProgress = function() {
			this.trigger("hideProgress")
		}, Player.prototype.cancelHideProgress = function() {
			this.trigger("cancelHideProgress")
		}, Player.prototype.setPlayerSize = function(a, b) {
			if(this._el.style.width = a, b) {
				if(b.indexOf("%") > 0) {
					var c = window.screen.height,
						d = b.replace("%", "");
					if(isNaN(d)) this._el.style.height = b;
					else {
						var e = 9 * c * parseInt(d) / 1e3;
						this._el.style.height = String(e % 2 ? e + 1 : e) + "px"
					}
				} else this._el.style.height = b
			}
		};
		var __supportFullscreen = function() {
			var a;
			Dom.createEl("div"), a = {};
			var b = [
				["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror", "fullScreen"],
				["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror", "webkitfullScreen"],
				["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror", "webkitIsFullScreen"],
				["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror", "mozfullScreen"],
				["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError", "MSFullScreen"]
			];
			if(UA.IS_IOS) a.requestFn = "webkitEnterFullscreen", a.cancelFn = "webkitExitFullscreen", a.eventName = "webkitfullscreenchange", a.isFullScreen = "webkitDisplayingFullscreen";
			else {
				for(var c = 5, d = 0; d < c; d++)
					if(b[d][1] in document) {
						a.requestFn = b[d][0], a.cancelFn = b[d][1], a.eventName = b[d][4], a.isFullScreen = b[d][6];
						break
					}
				"requestFullscreen" in document ? a.requestFn = "requestFullscreen" : "webkitRequestFullscreen" in document ? a.requestFn = "webkitRequestFullscreen" : "webkitRequestFullScreen" in document ? a.requestFn = "webkitRequestFullScreen" : "webkitEnterFullscreen" in document ? a.requestFn = "webkitEnterFullscreen" : "mozRequestFullScreen" in document ? a.requestFn = "mozRequestFullScreen" : "msRequestFullscreen" in document && (a.requestFn = "msRequestFullscreen"), "fullscreenchange" in document ? a.eventName = "fullscreenchange" : "webkitfullscreenchange" in document ? a.eventName = "webkitfullscreenchange" : "webkitfullscreenchange" in document ? a.eventName = "webkitfullscreenchange" : "webkitfullscreenchange" in document ? a.eventName = "webkitfullscreenchange" : "mozfullscreenchange" in document ? a.eventName = "mozfullscreenchange" : "MSFullscreenChange" in document && (a.eventName = "MSFullscreenChange"), "fullScreen" in document ? a.isFullScreen = "fullScreen" : "webkitfullScreen" in document ? a.isFullScreen = "webkitfullScreen" : "webkitIsFullScreen" in document ? a.isFullScreen = "webkitIsFullScreen" : "webkitDisplayingFullscreen" in document ? a.isFullScreen = "webkitDisplayingFullscreen" : "mozfullScreen" in document ? a.isFullScreen = "mozfullScreen" : "MSFullScreen" in document && (a.isFullScreen = "MSFullScreen")
			}
			return a.requestFn ? a : null
		}();
		Player.prototype._enterFullWindow = function() {
			this.isFullWindow = !0, this.docOrigOverflow = document.documentElement.style.overflow, document.documentElement.style.overflow = "hidden", Dom.addClass(document.getElementsByTagName("body")[0], "prism-full-window")
		}, Player.prototype._exitFullWindow = function() {
			this.isFullWindow = !1, document.documentElement.style.overflow = this.docOrigOverflow, Dom.removeClass(document.getElementsByTagName("body")[0], "prism-full-window")
		}, Player.prototype.requestFullScreen = function() {
			var a = __supportFullscreen,
				b = this.el(),
				c = this;
			if(UA.IS_IOS) return b = this.tag, b[a.requestFn](), this;
			this.isFullScreen = !0, this.isFullScreenChanged = !1, this._requestFullScreenTimer = null, this._cancelFullScreenTimer || clearTimeout(this._cancelFullScreenTimer);
			var c = this;
			return a ? (b[a.requestFn](), this._requestFullScreenTimer = setTimeout(function() {
				c.isFullScreenChanged || (c._enterFullWindow(), c.trigger("requestFullScreen")), c._requestFullScreenTimer = null
			}, 500)) : (this._enterFullWindow(), this.trigger("requestFullScreen")), this
		}, Player.prototype.cancelFullScreen = function() {
			var a = __supportFullscreen,
				b = this;
			this.isFullScreen = !1, this.isFullScreenChanged = !1, this._cancelFullScreenTimer = null, this._requestFullScreenTimer || clearTimeout(this._requestFullScreenTimer);
			var b = this;
			return a ? (document[a.cancelFn](), b._cancelFullScreenTimer = setTimeout(function() {
				b.isFullScreenChanged || (b._exitFullWindow(), b.trigger("cancelFullScreen")), b._cancelFullScreenTimer = null
			}, 500), this.trigger("play")) : (this._exitFullWindow(), this.trigger("cancelFullScreen"), this.trigger("play")), this
		}, Player.prototype.getIsFullScreen = function() {
			return this.isFullScreen
		}, Player.prototype.getBuffered = function() {
			return this.tag.buffered
		}, Player.prototype.setToastEnabled = function(a) {}, Player.prototype.setLoadingInvisible = function() {}, Player.prototype.bindVideoEvent = function() {
			var a = this.tag,
				b = this;
			Event.on(a, "loadstart", function(a) {
				b.trigger("loadstart"), debug_flag && console.log("loadstart")
			}), Event.on(a, "durationchange", function(a) {
				b.trigger("durationchange"), debug_flag && console.log("durationchange")
			}), Event.on(a, "loadedmetadata", function(a) {
				b.trigger("loadedmetadata"), debug_flag && console.log("loadedmetadata")
			}), Event.on(a, "loadeddata", function(a) {
				b.trigger("loadeddata"), debug_flag && console.log("loadeddata")
			}), Event.on(a, "progress", function(a) {
				b.trigger("progress"), debug_flag && console.log("progress")
			}), Event.on(a, "canplay", function(a) {
				var c = (new Date).getTime() - b.readyTime;
				b.trigger("canplay", {
					loadtime: c
				}), debug_flag && console.log("canplay")
			}), Event.on(a, "canplaythrough", function(c) {
				b.cover && b._options.autoplay && (Dom.css(b.cover, "display", "none"), delete b.cover), "none" === a.style.display && UA.IS_IOS && setTimeout(function() {
					Dom.css(a, "display", "block")
				}, 100), b.trigger("canplaythrough"), debug_flag && console.log("canplaythrough")
			}), Event.on(a, "play", function(a) {
				b.trigger("play"), b.trigger("error_hide");
				var c = document.querySelector(".prism-cover");
				Dom.css(c, "display", "none"), b.waiting = !1, debug_flag && console.log("play")
			}), Event.on(a, "play", function(a) {
				b.trigger("videoRender"), debug_flag && console.log("videoRender"), b.waiting = !0
			}), Event.on(a, "pause", function(a) {
				b.trigger("pause"), b.waiting = !1,
					debug_flag && console.log("pause")
			}), Event.on(a, "ended", function(a) {
				b.waiting = !1, b._options.rePlay && (b.seek(0), b.tag.play()), b.trigger("ended"), debug_flag && console.log("ended")
			}), Event.on(a, "stalled", function(a) {
				b.trigger("stalled"), debug_flag && console.log("stalled")
			}), Event.on(a, "waiting", function(a) {
				b.trigger("waiting"), b.trigger("h5_loading_show"), b.waiting = !0, b._checkTimeoutHandle = setTimeout(function() {
					if(b.waiting) {
						var a = {
							statusValue: "4001",
							mediaId: b._options.vid || "",
							error_code: constants.ErrorCode.LoadingTimeout,
							error_msg: "缓冲数据超时，请尝试退出重试或刷新"
						};
						b.logError(a), b.trigger("error", a)
					}
				}, 1e3 * b._options.loadDataTimeout), debug_flag && console.log("waiting")
			}), Event.on(a, "playing", function(a) {
				b.trigger("playing"), b.trigger("h5_loading_hide"), b.waiting = !1, b._checkTimeoutHandle && clearTimeout(b._checkTimeoutHandle), debug_flag && console.log("playing")
			}), Event.on(a, "error", function(a) {
				var c = document.querySelector(".prism-cover");
				Dom.css(c, "display", "none"), b.waiting = !1;
				var d, e = "",
					f = a.target.error.message,
					e = "OTHER_ERR_MSG";
				if(a.target.error.code && (d = a.target.error.code, e = constants.VideoErrorCode[a.target.error.code]), f = e + " || " + f, b._options.isLive) {
					if(b._options.liveRetry) sleep(2e3), b.tag.load(b._options.source), b.tag.play();
					else {
						var g = {
							statusValue: "4004",
							mediaId: "ISLIVE",
							error_code: e,
							error_msg: "浏览器不支持此视频播放／其他直播操作"
						};
						b.logError(g), b.trigger("error", g)
					}
					b.trigger("liveStreamStop")
				} else {
					var h = "视频播放失败!",
						i = !1,
						j = !1;
					d < 4 ? (h = constants.VideoErrorCodeText[d], i = !0) : b._eventState == constants.SUSPEND ? (h = "请求视频数据终止", e = constants.ErrorCode.RequestDataError, i = !0) : b._eventState == constants.LOAD_START ? (h = "加载视频数据错误", b._options.source.indexOf("auth_key") > 0 && (h += "，可能鉴权过期、域名不在白名单或请求被拦截"), e = constants.ErrorCode.StartLoadData, i = !0) : b._eventState == constants.LOADED_METADATA && (h = "播放出错啦", e = constants.ErrorCode.PlayingError, i = !0), h += "，请尝试退出重试或刷新", b._options.source && (b._options.source.indexOf("flv") > 0 || b._options.source.indexOf("m3u8") > 0) && !UA.IS_MOBILE ? (h = "h5不支持此格式，请使用flash播放器", e = constants.ErrorCode.FormatNotSupport) : i && b._urls.length > 1 && b._retrySwitchUrlCount < 3 && (b.switchUrl(), j = !0);
					var g = {
						statusValue: "4001",
						mediaId: b._options.vid ? b._options.vid : "",
						error_code: e,
						error_msg: f,
						display_msg: h
					};
					b.logError(g), j || b.trigger("error", g)
				}
			}), Event.on(a, "onM3u8Retry", function(a) {
				b.trigger("m3u8Retry"), debug_flag && console.log("m3u8Retry")
			}), Event.on(a, "liveStreamStop", function(a) {
				b.trigger("liveStreamStop"), debug_flag && console.log("liveStreamStop")
			}), Event.on(a, "seeking", function(a) {
				b.trigger("seeking"), debug_flag && console.log("seeking")
			}), Event.on(a, "seeked", function(a) {
				b.trigger("seeked"), debug_flag && console.log("seeked")
			}), Event.on(a, "ratechange", function(a) {
				b.trigger("ratechange"), debug_flag && console.log("ratechange")
			}), Event.on(a, "timeupdate", function(a) {
				b.trigger("timeupdate"), debug_flag && console.log("timeupdate")
			}), Event.on(a, "webkitfullscreenchange", function(a) {
				b.trigger("fullscreenchange"), debug_flag && console.log("fullscreenchange")
			}), this.on("requestFullScreen", function() {
				Dom.addClass(b.el(), "prism-fullscreen"), debug_flag && console.log("request-fullscreen")
			}), this.on("cancelFullScreen", function() {
				Dom.removeClass(b.el(), "prism-fullscreen"), debug_flag && console.log("cancel-fullscreen")
			}), Event.on(a, "suspend", function(a) {
				b.trigger("suspend"), debug_flag && console.log("sudpend")
			}), Event.on(a, "abort", function(a) {
				b.trigger("abort"), debug_flag && console.log("abort")
			}), Event.on(a, "volumechange", function(a) {
				b.trigger("volumechange"), debug_flag && console.log("volumechange")
			}), Event.on(a, "drag", function(a) {
				b.trigger("drag"), debug_flag && console.log("drag")
			}), Event.on(a, "dragstart", function(a) {
				b.trigger("dragstart"), debug_flag && console.log("dragstart")
			}), Event.on(a, "dragover", function(a) {
				b.trigger("dragover"), debug_flag && console.log("dragover")
			}), Event.on(a, "dragenter", function(a) {
				b.trigger("dragenter"), debug_flag && console.log("dragenter")
			}), Event.on(a, "dragleave", function(a) {
				b.trigger("dragleave"), debug_flag && console.log("dragleave")
			}), Event.on(a, "ondrag", function(a) {
				b.trigger("ondrag"), debug_flag && console.log("ondrag")
			}), Event.on(a, "ondragstart", function(a) {
				b.trigger("ondragstart"), debug_flag && console.log("ondragstart")
			}), Event.on(a, "ondragover", function(a) {
				b.trigger("ondragover"), debug_flag && console.log("ondragover")
			}), Event.on(a, "ondragenter", function(a) {
				b.trigger("ondragenter"), debug_flag && console.log("ondragenter")
			}), Event.on(a, "ondragleave", function(a) {
				b.trigger("ondragleave"), debug_flag && console.log("ondragleave")
			}), Event.on(a, "drop", function(a) {
				b.trigger("drop"), debug_flag && console.log("drop")
			}), Event.on(a, "dragend", function(a) {
				b.trigger("dragend"), debug_flag && console.log("dragend")
			}), Event.on(a, "onscroll", function(a) {
				b.trigger("onscroll"), debug_flag && console.log("onscroll")
			}), this.on("error", function(a) {
				var c = a.paramData,
					d = document.querySelector("div.prism-loading");
				d && Dom.css(d, "display", "none");
				var e = document.querySelector("div.prism-progress-cursor");
				e && Dom.css(e, "display", "none"), c = c || {}, b._monitor && (c.uuid = b._monitor._getUuid(), c.requestId = b._monitor.requestId, c.cdnIp = b._monitor._userNetInfo.cdnIp, c.localIp = b._monitor._userNetInfo.localIp), b._isError = !0, b.trigger("error_show", c)
			});
			var c = __supportFullscreen;
			c && Event.on(document, c.eventName, function(a) {
				b.isFullScreen = document[c.isFullScreen], b.isFullScreenChanged = !0, !0 === b.isFullScreen ? b.trigger("requestFullScreen") : b.trigger("cancelFullScreen")
			})
		}, Player.prototype._checkSupportVideoType = function() {
			if(!this.tag.canPlayType || !this._options.source || !UA.IS_MOBILE) return "";
			var a = this._options.source,
				b = "";
			if(a.indexOf("m3u8") > 0 ? "" == this.tag.canPlayType("application/x-mpegURL") && (b = "浏览器不支持m3u8视频播放") : a.indexOf("mp4") > 0 && "" == this.tag.canPlayType("video/mp4") && (b = "浏览器不支持mp4视频播放"), b) {
				var c = {
					statusValue: 4001,
					mediaId: this._options.vid ? this._options.vid : "",
					error_code: constants.ErrorCode.FormatNotSupport,
					error_msg: b,
					display_msg: b
				};
				this.logError(c), this.trigger("error", c)
			}
			return b
		}, Player.prototype.logError = function(a) {
			a || (a = {}), a.vt = Math.floor(1e3 * this.getCurrentTime()), a.roe = this._eventState, this.log("ERROR", a)
		}, Player.prototype.log = function(a, b) {
			var c = 0,
				d = 0;
			this._monitor && (this._options && (c = this._options.vid || "0", d = this._options.from || "0"), this._monitor.updateVideoInfo({
				video_id: c,
				album_id: 0,
				from: d
			}), this._monitor._log(a, b))
		}, module.exports = Player
	}, {
		"../lib/constants.js": 42,
		"../lib/dom": 45,
		"../lib/event": 46,
		"../lib/io": 48,
		"../lib/object": 50,
		"../lib/ua": 52,
		"../monitor/monitor": 55,
		"../ui/component": 62,
		"../ui/component/error-display": 65,
		"../ui/exports": 74,
		"./saas/authkeyexpiredhandle.js": 58,
		"./saas/signature": 59,
		"./saas/vod": 61,
		"crypto-js": 11
	}],
	58: [function(a, b, c) {
		var d = a("../../lib/constants"),
			e = a("../../lib/oo"),
			f = e.extend({
				init: function(a) {
					this.player = a, this.tickhandle = null
				}
			});
		f.prototype.tick = function(a, b) {
			var c = this;
			this.tickhandle = setTimeout(function() {
				c.player && c.player.trigger(d.AuthKeyExpiredEvent), b && b()
			}, 1e3 * a)
		}, f.prototype.clearTick = function(a) {
			this.tickhandle && clearTimeout(this.tickhandle)
		}, b.exports = f
	}, {
		"../../lib/constants": 42,
		"../../lib/oo": 51
	}],
	59: [function(a, b, c) {
		var d = a("crypto-js");
		a("jsrsasign");
		b.exports.randomUUID = function() {
			for(var a = [], b = "0123456789abcdef", c = 0; c < 36; c++) a[c] = b.substr(Math.floor(16 * Math.random()), 1);
			return a[14] = "4", a[19] = b.substr(3 & a[19] | 8, 1), a[8] = a[13] = a[18] = a[23] = "-", a.join("")
		}, b.exports.returnUTCDate = function() {
			var a = new Date,
				b = a.getUTCFullYear(),
				c = a.getUTCMonth(),
				d = a.getUTCDate(),
				e = a.getUTCHours(),
				f = a.getUTCMinutes(),
				g = a.getUTCSeconds(),
				h = a.getUTCMilliseconds();
			return Date.UTC(b, c, d, e, f, g, h)
		}, b.exports.AliyunEncodeURI = function(a) {
			var b = encodeURIComponent(a);
			return b = b.replace("+", "%2B"), b = b.replace("*", "%2A"), b = b.replace("%7E", "~")
		}, b.exports.makesort = function(a, b, c) {
			if(!a) throw new Error("PrismPlayer Error: vid should not be null!");
			var d = Object.keys(a).sort(),
				e = "";
			for(var f in d) "" == e ? e = d[f] + b + a[d[f]] : e += c + d[f] + b + a[d[f]];
			return e
		}, b.exports.makeUTF8sort = function(a, c, d) {
			if(!a) throw new Error("PrismPlayer Error: vid should not be null!");
			var e = Object.keys(a).sort(),
				f = "";
			for(var g in e) {
				var h = b.exports.AliyunEncodeURI(e[g]),
					i = b.exports.AliyunEncodeURI(a[e[g]]);
				"" == f ? f = h + c + i : f += d + h + c + i
			}
			return f
		}, b.exports.makeChangeSiga = function(a, c) {
			if(!a) throw new Error("PrismPlayer Error: vid should not be null!");
			return d.HmacSHA1("GET&" + b.exports.AliyunEncodeURI("/") + "&" + b.exports.AliyunEncodeURI(b.exports.makeUTF8sort(a, "=", "&")), c + "&").toString(d.enc.Base64)
		}, b.exports.ISODateString = function(a) {
			function b(a) {
				return a < 10 ? "0" + a : a
			}
			return a.getUTCFullYear() + "-" + b(a.getUTCMonth() + 1) + "-" + b(a.getUTCDate()) + "T" + b(a.getUTCHours()) + ":" + b(a.getUTCMinutes()) + ":" + b(a.getUTCSeconds()) + "Z"
		}, b.exports.encPlayAuth = function(a) {
			var a = d.enc.Utf8.stringify(d.enc.Base64.parse(a));
			if(!a) throw new Error("playuth参数解析为空");
			return JSON.parse(a)
		}, b.exports.encRsa = function() {}
	}, {
		"crypto-js": 11,
		jsrsasign: 39
	}],
	60: [function(a, b, c) {
		b.exports.createError = function(a, b) {
			return {
				requestId: "",
				code: b || "",
				message: a
			}
		}
	}, {}],
	61: [function(a, b, c) {
		function d(a, b, c) {
			var d = (h.returnUTCDate(), h.randomUUID()),
				j = h.randomUUID(),
				k = "HMAC-SHA1",
				l = {
					AccessKeyId: a.accessId,
					Action: "PlayInfo",
					MediaId: a.vid,
					Formats: "mp4",
					AuthInfo: a.authInfo,
					AuthTimeout: g.AuthKeyExpired,
					Rand: d,
					SecurityToken: a.stsToken,
					PlayDomain: a.playDomain,
					Format: "JSON",
					Version: "2014-06-18",
					SignatureMethod: k,
					SignatureVersion: "1.0",
					SignatureNonce: j
				},
				m = h.makeUTF8sort(l, "=", "&") + "&Signature=" + h.AliyunEncodeURI(h.makeChangeSiga(l, a.accessSecret)),
				n = "https://mts." + a.domainRegion + ".aliyuncs.com/?" + m;
			f.get(n, function(a) {
				if(a) {
					var d = JSON.parse(a),
						f = d.PlayInfoList.PlayInfo;
					urls = e(f), b && b({
						requestId: d.RequestId,
						urls: urls
					})
				} else c && c(i.createError("MST获取取数失败"))
			}, function(a) {
				if(c) {
					var b = JSON.parse(a);
					c(b)
				}
			})
		}

		function e(a) {
			for(var b = [], c = [], d = -1, e = a.length - 1; e >= 0; e--) {
				var f = a[e];
				f.width = 1 * f.width, f.height = 1 * f.height, f.width <= f.height && (f.width = f.height), "mp4" == f.format ? c.push(f) : b.push(f)
			}
			if(c.length > 0) {
				c.sort(function(a, b) {
					var c = parseInt(a.width),
						d = parseInt(b.width);
					return c < d ? -1 : c > d ? 1 : void 0
				});
				for(var h = c.length, e = 0; e < h; e++) {
					var i = c[e],
						j = g.VideoLevels[i.width];
					void 0 === i.width ? j = "未知" : void 0 === j ? j = i.width : d == i.width && (j += i.width), i.desc = j, d = i.width
				}
				return c
			}
			return b.sort(function(a, b) {
				var c = parseInt(a.width),
					d = parseInt(b.width);
				return c < d ? -1 : c > d ? 1 : void 0
			}), b
		}
		var f = a("../../lib/io"),
			g = a("../../lib/constants"),
			h = a("./signature"),
			i = a("./util");
		a("crypto-js");
		b.exports.getDataByAuthInfo = d
	}, {
		"../../lib/constants": 42,
		"../../lib/io": 48,
		"./signature": 59,
		"./util": 60,
		"crypto-js": 11
	}],
	62: [function(a, b, c) {
		var d = a("../lib/oo"),
			e = a("../lib/data"),
			f = a("../lib/object"),
			g = a("../lib/dom"),
			h = a("../lib/event"),
			i = a("../lib/function"),
			j = a("../lib/layout"),
			k = d.extend({
				init: function(a, b) {
					var c = this;
					this._player = a, this._eventState = "", this._options = f.copy(b), this._el = this.createEl(), this._id = a.id() + "_component_" + e.guid(), this._children = [], this._childIndex = {}, this._player.on("uiH5Ready", function() {
						c.renderUI(), c.syncUI(), c.bindEvent()
					})
				}
			});
		k.prototype.renderUI = function() {
			j.render(this.el(), this.options()), this.el().id = this.id()
		}, k.prototype.syncUI = function() {}, k.prototype.bindEvent = function() {}, k.prototype.createEl = function(a, b) {
			return g.createEl(a, b)
		}, k.prototype.options = function(a) {
			return void 0 === a ? this._options : this._options = f.merge(this._options, a)
		}, k.prototype.el = function() {
			return this._el
		}, k.prototype._contentEl, k.prototype.player = function() {
			return this._player
		}, k.prototype.contentEl = function() {
			return this._contentEl || this._el
		}, k.prototype._id, k.prototype.id = function() {
			return this._id
		}, k.prototype.addChild = function(a, b) {
			var c;
			if("string" == typeof a) {
				if(!this._player.UI[a]) return;
				c = new this._player.UI[a](this._player, b)
			} else c = a;
			if(this._children.push(c), "function" == typeof c.id && (this._childIndex[c.id()] = c), "function" == typeof c.el && c.el()) {
				var d = c.el();
				d.id = c.id(), this.contentEl().appendChild(d)
			}
			return c
		}, k.prototype.removeChild = function(a) {
			if(a && this._children) {
				for(var b = !1, c = this._children.length - 1; c >= 0; c--)
					if(this._children[c] === a) {
						b = !0, this._children.splice(c, 1);
						break
					}
				if(b) {
					this._childIndex[a.id] = null;
					var d = a.el();
					d && d.parentNode === this.contentEl() && this.contentEl().removeChild(a.el())
				}
			}
		}, k.prototype.initChildren = function() {
			var a, b, c, d, e;
			if(a = this, b = this.options().children)
				if(f.isArray(b))
					for(var g = 0; g < b.length; g++) c = b[g], "string" == typeof c ? (d = c, e = {}) : (d = c.name, e = c), a.addChild(d, e);
				else f.each(b, function(b, c) {
					!1 !== c && a.addChild(b, c)
				})
		}, k.prototype.on = function(a, b) {
			return h.on(this._el, a, i.bind(this, b)), this
		}, k.prototype.off = function(a, b) {
			return h.off(this._el, a, b), this
		}, k.prototype.one = function(a, b) {
			return h.one(this._el, a, i.bind(this, b)), this
		}, k.prototype.trigger = function(a, b) {
			return b && (this._el.paramData = b), this._eventState = a, h.trigger(this._el, a), this
		}, k.prototype.off = function(a) {
			return h.off(this._el, a), this
		}, k.prototype.addClass = function(a) {
			return g.addClass(this._el, a), this
		}, k.prototype.removeClass = function(a) {
			return g.removeClass(this._el, a), this
		}, k.prototype.show = function() {
			return this._el.style.display = "block", this
		}, k.prototype.hide = function() {
			return this._el.style.display = "none", this
		}, k.prototype.destroy = function() {
			if(this.trigger({
					type: "destroy",
					bubbles: !1
				}), this._children)
				for(var a = this._children.length - 1; a >= 0; a--) this._children[a].destroy && this._children[a].destroy();
			this.children_ = null, this.childIndex_ = null, this.off(), this._el.parentNode && this._el.parentNode.removeChild(this._el), e.removeData(this._el), this._el = null
		}, b.exports = k
	}, {
		"../lib/data": 44,
		"../lib/dom": 45,
		"../lib/event": 46,
		"../lib/function": 47,
		"../lib/layout": 49,
		"../lib/object": 50,
		"../lib/oo": 51
	}],
	63: [function(a, b, c) {
		var d = a("../component"),
			e = a("../../lib/dom"),
			f = d.extend({
				init: function(a, b) {
					d.call(this, a, b), this.addClass(b.className || "prism-big-play-btn")
				},
				bindEvent: function() {
					var a = this;
					this._player.on("play", function() {
						a.addClass("playing"), e.css(a.el(), "display", "none")
					}), this._player.on("pause", function() {
						a.removeClass("playing"), e.css(a.el(), "display", "block")
					}), this.on("click", function() {
						a._player.paused() && (a._player.play(), e.css(a.el(), "display", "none"))
					}), this._player.on("play_btn_show", function() {
						a.removeClass("playing"), e.css(a.el(), "display", "block")
					})
				}
			});
		b.exports = f
	}, {
		"../../lib/dom": 45,
		"../component": 62
	}],
	64: [function(a, b, c) {
		var d = a("../component"),
			e = d.extend({
				init: function(a, b) {
					d.call(this, a, b), this.addClass(b.className || "prism-controlbar"), this.initChildren(), this.onEvent()
				},
				createEl: function() {
					var a = d.prototype.createEl.call(this);
					return a.innerHTML = '<div class="prism-controlbar-bg"></div>', a
				},
				onEvent: function() {
					var a = this.player(),
						b = a.options(),
						c = this;
					this.timer = null;
					var d = b.controlBarVisibility;
					1 == b.controlBarForOver && (d = "hover"), "hover" == d ? (c.hide(), a.on("mouseover", function() {
						c._show()
					}), a.on("mouseout", function() {
						c.hide(), a.trigger("hideBar")
					})) : "click" == d ? (a.on("click", function(b) {
						a._isError || (b.preventDefault(), b.stopPropagation(), c._show(), c._hide())
					}), a.on("ready", function() {
						c._hide()
					}), this.on("touchstart", function() {
						c._show()
					}), this.on("touchmove", function() {
						c._show()
					}), this.on("touchend", function() {
						c._hide()
					})) : c._show()
				},
				_show: function() {
					this.show(), this._player.trigger("showBar"), this.timer && (clearTimeout(this.timer), this.timer = null)
				},
				_hide: function() {
					var a = this,
						b = this.player(),
						c = b.options(),
						d = c.showBarTime;
					this.timer = setTimeout(function() {
						a.hide(), a._player.trigger("hideBar")
					}, d)
				}
			});
		b.exports = e
	}, {
		"../component": 62
	}],
	65: [function(a, b, c) {
		var d = a("../component"),
			e = a("../../lib/util"),
			f = a("../../lib/dom"),
			g = a("../../lib/event"),
			h = a("../../lib/ua"),
			i = d.extend({
				init: function(a, b) {
					d.call(this, a, b), this.className = b.className ? b.className : "prism-ErrorMessage", this.addClass(this.className)
				},
				createEl: function() {
					var a = d.prototype.createEl.call(this, "div");
					return a.innerHTML = "<div class='prism-error-content'><p></p></div><div class='prism-error-operation'><a class='prism-button-refresh' type='button' value='刷新'></a><a class='prism-button prism-button-orange'  target='_blank'>诊断</a></div><div class='prism-detect-info prism-center'><p class='errorCode'><span class='info-label'>code：</span><span class='info-content'></span></p><p class='vid'><span class='info-label'>vid：</span><span class='info-content'></span></p><p class='uuid'><span class='info-label'>uuid：</span><span class='info-content'></span></p><p class='requestId'><span class='info-label'>requestId：</span><span class='info-content'></span></p><p class='dateTime'><span class='info-label'>播放时间：</span><span class='info-content'></span></p></div>", a
				},
				bindEvent: function() {
					var a = this;
					a._player.on("error_show", function(b) {
						var c = a._player.getMonitorInfo();
						a._show(b, c)
					}), a._player.on("error_hide", a._hide);
					var b = document.querySelector(".prism-ErrorMessage .prism-error-operation .prism-button-refresh");
					if(g.on(b, "click", function() {
							location.reload(!0)
						}), h.IS_MOBILE) {
						var b = document.querySelector(".prism-ErrorMessage .prism-detect-info");
						f.addClass(b, "prism-width90")
					}
				},
				_show: function(a, b) {
					var c = a.paramData,
						d = "",
						g = "";
					c.mediaId && (d = c.mediaId), b.vu && (g = decodeURIComponent(b.vu));
					var h = document.querySelector(".prism-ErrorMessage .prism-error-operation .prism-button-orange"),
						i = "http://player.alicdn.com/detection.html?vid=" + d + "&source=" + g + "&pd=" + b.pd + "&vt=" + b.vt + "&tt=" + b.tt + "&uuid=" + b.uuid + "&av=" + b.av + "&bi=" + b.bi + "&md=" + b.md + "&vu=" + g;
					h.href = i;
					var j = c.display_msg || c.error_msg;
					document.querySelector(".prism-ErrorMessage .prism-error-content p").innerText = j, document.querySelector(".prism-ErrorMessage .prism-detect-info .errorCode .info-content").innerText = c.error_code, document.querySelector(".prism-ErrorMessage .prism-detect-info .vid .info-content").innerText = c.mediaId, document.querySelector(".prism-ErrorMessage .prism-detect-info .uuid .info-content").innerText = c.uuid, document.querySelector(".prism-ErrorMessage .prism-detect-info .requestId .info-content").innerText = c.requestId, document.querySelector(".prism-ErrorMessage .prism-detect-info .dateTime .info-content").innerText = e.formatDate(new Date, "yyyy-MM-dd HH:mm:ss");
					var k = document.querySelector(".prism-ErrorMessage");
					f.css(k, "display", "block")
				},
				_hide: function() {
					var a = document.querySelector(".prism-ErrorMessage");
					f.css(a, "display", "none")
				}
			});
		b.exports = i
	}, {
		"../../lib/dom": 45,
		"../../lib/event": 46,
		"../../lib/ua": 52,
		"../../lib/util": 54,
		"../component": 62
	}],
	66: [function(a, b, c) {
		var d = a("../component"),
			e = d.extend({
				init: function(a, b) {
					d.call(this, a, b), this.addClass(b.className || "prism-fullscreen-btn")
				},
				bindEvent: function() {
					var a = this;
					this._player.on("requestFullScreen", function() {
						a.addClass("fullscreen")
					}), this._player.on("cancelFullScreen", function() {
						a.removeClass("fullscreen")
					}), this.on("click", function() {
						this._player.getIsFullScreen() ? this._player.cancelFullScreen() : this._player.requestFullScreen()
					})
				}
			});
		b.exports = e
	}, {
		"../component": 62
	}],
	67: [function(a, b, c) {
		"use strict";
		var d = a("../component"),
			e = (a("../../lib/dom"), d.extend({
				init: function(a, b) {
					d.call(this, a, b), this.addClass(b.className || "prism-hide")
				},
				createEl: function() {
					var a = d.prototype.createEl.call(this, "div");
					return a.innerHTML = '<div class="circle"></div> <div class="circle1"></div>', a
				},
				_loading_hide: function(a) {
					var b = this,
						c = document.querySelector("#" + b.id() + " .prism-loading");
					c && (c.className = "prism-hide")
				},
				_loading_show: function(a) {
					var b = this,
						c = document.querySelector("#" + b.id() + " .prism-hide");
					c && (c.className = "prism-loading")
				},
				bindEvent: function() {
					var a = this;
					a._player.on("h5_loading_show", a._loading_show), a._player.on("h5_loading_hide", a._loading_hide)
				}
			}));
		b.exports = e
	}, {
		"../../lib/dom": 45,
		"../component": 62
	}],
	68: [function(a, b, c) {
		var d = a("../component"),
			e = (a("../../lib/util"), d.extend({
				init: function(a, b) {
					d.call(this, a, b), this.className = b.className ? b.className : "prism-live-display", this.addClass(this.className)
				}
			}));
		b.exports = e
	}, {
		"../../lib/util": 54,
		"../component": 62
	}],
	69: [function(a, b, c) {
		var d = a("../component"),
			e = d.extend({
				init: function(a, b) {
					d.call(this, a, b), this.addClass(b.className || "prism-play-btn")
				},
				bindEvent: function() {
					var a = this;
					this._player.on("play", function() {
						a.addClass("playing")
					}), this._player.on("pause", function() {
						a.removeClass("playing")
					}), this.on("click", function() {
						a._player.paused() ? (a._player.play(), a.addClass("playing")) : (a._player.pause(), a.removeClass("playing"))
					})
				}
			});
		b.exports = e
	}, {
		"../component": 62
	}],
	70: [function(a, b, c) {
		var d = a("../component"),
			e = a("../../lib/dom"),
			f = a("../../lib/event"),
			g = a("../../lib/ua"),
			h = a("../../lib/function"),
			i = d.extend({
				init: function(a, b) {
					d.call(this, a, b), this.className = b.className ? b.className : "prism-progress", this.addClass(this.className)
				},
				createEl: function() {
					var a = d.prototype.createEl.call(this);
					return a.innerHTML = '<div class="prism-progress-loaded"></div><div class="prism-progress-played"></div><div class="prism-progress-cursor"></div>', a
				},
				bindEvent: function() {
					var a = this;
					this.loadedNode = document.querySelector("#" + this.id() + " .prism-progress-loaded"), this.playedNode = document.querySelector("#" + this.id() + " .prism-progress-played"), this.cursorNode = document.querySelector("#" + this.id() + " .prism-progress-cursor"), this.controlNode = document.getElementsByClassName("prism-controlbar")[0], f.on(this.cursorNode, "mousedown", function(b) {
						a._onMouseDown(b)
					}), f.on(this.cursorNode, "touchstart", function(b) {
						a._onMouseDown(b)
					}), f.on(this._el, "click", function(b) {
						a._onMouseClick(b)
					}), this._player.on("hideProgress", function(b) {
						a._hideProgress(b)
					}), this._player.on("cancelHideProgress", function(b) {
						a._cancelHideProgress(b)
					}), this.bindTimeupdate = h.bind(this, this._onTimeupdate), this._player.on("timeupdate", this.bindTimeupdate), g.IS_IPAD ? this.interval = setInterval(function() {
						a._onProgress()
					}, 500) : this._player.on("progress", function() {
						a._onProgress()
					})
				},
				_hideProgress: function(a) {
					f.off(this.cursorNode, "mousedown"), f.off(this.cursorNode, "touchstart")
				},
				_cancelHideProgress: function(a) {
					var b = this;
					f.on(this.cursorNode, "mousedown", function(a) {
						b._onMouseDown(a)
					}), f.on(this.cursorNode, "touchstart", function(a) {
						b._onMouseDown(a)
					})
				},
				_onMouseClick: function(a) {
					for(var b = this.el().offsetLeft, c = this.el(); c = c.offsetParent;) b += c.offsetLeft;
					var d = a.touches ? a.touches[0].pageX : a.pageX,
						e = d - b,
						f = this.el().offsetWidth,
						g = this._player.getDuration() ? e / f * this._player.getDuration() : 0;
					g < 0 && (g = 0), g > this._player.getDuration() && (g = this._player.getDuration()), this._player.trigger("seekStart", {
						fromTime: this._player.getCurrentTime()
					}), this._player.seek(g), this._player.play(), this._player.trigger("seekEnd", {
						toTime: this._player.getCurrentTime()
					})
				},
				_onMouseDown: function(a) {
					var b = this;
					a.preventDefault(), this._player.pause(), this._player.trigger("seekStart", {
						fromTime: this._player.getCurrentTime()
					}), f.on(this.controlNode, "mousemove", function(a) {
						b._onMouseMove(a)
					}), f.on(this.controlNode, "touchmove", function(a) {
						b._onMouseMove(a)
					}), f.on(this._player.tag, "mouseup", function(a) {
						b._onPlayerMouseUp(a)
					}), f.on(this._player.tag, "touchend", function(a) {
						b._onPlayerMouseUp(a)
					}), f.on(this.controlNode, "mouseup", function(a) {
						b._onControlBarMouseUp(a)
					}), f.on(this.controlNode, "touchend", function(a) {
						b._onControlBarMouseUp(a)
					})
				},
				_onMouseUp: function(a) {
					a.preventDefault(), f.off(this.controlNode, "mousemove"), f.off(this.controlNode, "touchmove"), f.off(this._player.tag, "mouseup"), f.off(this._player.tag, "touchend"), f.off(this.controlNode, "mouseup"), f.off(this.controlNode, "touchend");
					var b = this.playedNode.offsetWidth / this.el().offsetWidth * this._player.getDuration();
					this._player.getDuration();
					this._player.seek(b), this._player.play(), this._player.trigger("seekEnd", {
						toTime: this._player.getCurrentTime()
					})
				},
				_onControlBarMouseUp: function(a) {
					a.preventDefault(), f.off(this.controlNode, "mousemove"), f.off(this.controlNode, "touchmove"), f.off(this._player.tag, "mouseup"), f.off(this._player.tag, "touchend"), f.off(this.controlNode, "mouseup"), f.off(this.controlNode, "touchend");
					var b = this.playedNode.offsetWidth / this.el().offsetWidth * this._player.getDuration();
					this._player.getDuration();
					this._player.seek(b), this._player.play(), this._player.trigger("seekEnd", {
						toTime: this._player.getCurrentTime()
					})
				},
				_onPlayerMouseUp: function(a) {
					a.preventDefault(), f.off(this.controlNode, "mousemove"), f.off(this.controlNode, "touchmove"), f.off(this._player.tag, "mouseup"), f.off(this._player.tag, "touchend"), f.off(this.controlNode, "mouseup"), f.off(this.controlNode, "touchend");
					var b = this.playedNode.offsetWidth / this.el().offsetWidth * this._player.getDuration();
					this._player.getDuration();
					isNaN(b) || (this._player.seek(b), this._player.play()), this._player.trigger("seekEnd", {
						toTime: this._player.getCurrentTime()
					})
				},
				_onMouseMove: function(a) {
					a.preventDefault();
					for(var b = this.el().offsetLeft, c = this.el(); c = c.offsetParent;) b += c.offsetLeft;
					var d = a.touches ? a.touches[0].pageX : a.pageX,
						e = d - b,
						f = this.el().offsetWidth,
						g = this._player.getDuration() ? e / f * this._player.getDuration() : 0;
					g < 0 && (g = 0), g > this._player.getDuration() && (g = this._player.getDuration()), this._player.seek(g), this._player.play(), this._updateProgressBar(this.playedNode, g), this._updateCursorPosition(g)
				},
				_onTimeupdate: function(a) {
					this._updateProgressBar(this.playedNode, this._player.getCurrentTime()), this._updateCursorPosition(this._player.getCurrentTime()), this._player.trigger("updateProgressBar", {
						time: this._player.getCurrentTime()
					})
				},
				_onProgress: function(a) {
					this._player.getDuration() && this._player.getBuffered().length >= 1 && this._updateProgressBar(this.loadedNode, this._player.getBuffered().end(this._player.getBuffered().length - 1))
				},
				_updateProgressBar: function(a, b) {
					if(1 != this._player._switchSourcing) {
						var c = this._player.getDuration() ? b / this._player.getDuration() : 0;
						a && e.css(a, "width", 100 * c + "%")
					}
				},
				_updateCursorPosition: function(a) {
					if(1 != this._player._switchSourcing) {
						var b = this._player.getDuration() ? a / this._player.getDuration() : 0;
						this.cursorNode && e.css(this.cursorNode, "left", 100 * b + "%")
					}
				}
			});
		b.exports = i
	}, {
		"../../lib/dom": 45,
		"../../lib/event": 46,
		"../../lib/function": 47,
		"../../lib/ua": 52,
		"../component": 62
	}],
	71: [function(a, b, c) {
		var d = a("../component"),
			e = a("../../lib/object"),
			f = (a("../../lib/util"), a("../../lib/dom")),
			g = a("../../lib/event"),
			h = (a("../../lib/constants"), d.extend({
				init: function(a, b) {
					this._hasGeneratedList = !1, this._previousSelection = null, this._isShown = !1, d.call(this, a, b), this.className = b.className ? b.className : "prism-stream-selector", this.addClass(this.className)
				},
				createEl: function() {
					var a = d.prototype.createEl.call(this, "div");
					return a.innerHTML = '<div class="current-stream-selector">标清</div><ul class="stream-selector-list"></ul><p class="stream-selector-tip"></p>', a
				},
				bindEvent: function() {
					var a = this,
						b = document.querySelector("#" + a.id() + " .current-stream-selector"),
						c = document.querySelector("#" + a.id() + " .stream-selector-list");
					g.on(c, "mouseleave", function() {
						f.css(c, "display", "none"), a._isShown = !1
					}), this._player.on("sourceloaded", function(b) {
						var c = b.paramData.desc,
							d = document.querySelector("#" + a.id() + " .current-stream-selector");
						d.innerText = c, f.css(d, "display", "block")
					}), g.on(b, "click", function() {
						if(a._hasGeneratedList) f.css(c, "display", 0 == a._isShown ? "block" : "none"), a._isShown = !a._isShown;
						else {
							var b = a._player._urls;
							b.length > 0 && e.each(b, function(b, d) {
								var e = f.createEl.call(a, "li", {
									url: b.Url,
									index: d,
									text: b.desc
								});
								a._player._currentPlayIndex == d && (f.addClass(e, "current"), a._previousSelection = e);
								var g = f.createEl.call(a, "span", {
									url: b.Url,
									index: d,
									text: b.desc
								});
								g.innerText = b.desc, e.appendChild(g), c.appendChild(e), a._hasGeneratedList = !0, f.css(c, "display", "block")
							})
						}
					}), g.on(c, "click", function(b) {
						var d = b.srcElement ? b.srcElement : b.target;
						f.getElementAttributes(d);
						var e = d.url,
							g = d.index,
							h = d.text;
						if(void 0 !== h) {
							a._player._switchSourcing = !0, a._previousSelection && f.removeClass(a._previousSelection, "current"), a._previousSelection = d, f.addClass(d, "current"), a._player._currentPlayIndex = g, a._player._urls.length > g && (e = a._player._urls[g].Url);
							document.querySelector("#" + a.id() + " .current-stream-selector").innerText = h, a._player.loadByUrl(e, a._player.getCurrentTime()), f.css(c, "display", "none"), a._isShown = !1;
							var i = document.querySelector("#" + a.id() + " .stream-selector-tip");
							i.innerText = "切换为" + h, f.css(i, "display", "block"), setTimeout(function() {
								f.css(i, "display", "none")
							}, 2e3), setTimeout(function() {
								a._player._switchSourcing = !1
							})
						}
					})
				}
			}));
		b.exports = h
	}, {
		"../../lib/constants": 42,
		"../../lib/dom": 45,
		"../../lib/event": 46,
		"../../lib/object": 50,
		"../../lib/util": 54,
		"../component": 62
	}],
	72: [function(a, b, c) {
		var d = a("../component"),
			e = a("../../lib/util"),
			f = d.extend({
				init: function(a, b) {
					d.call(this, a, b), this.className = b.className ? b.className : "prism-time-display", this.addClass(this.className)
				},
				createEl: function() {
					var a = d.prototype.createEl.call(this, "div");
					return a.innerHTML = '<span class="current-time">00:00</span> <span class="time-bound">/</span> <span class="duration">00:00</span>', a
				},
				bindEvent: function() {
					var a = this;
					this._player.on("durationchange", function() {
						var b = e.formatTime(a._player.getDuration());
						b ? (document.querySelector("#" + a.id() + " .time-bound").style.display = "inline", document.querySelector("#" + a.id() + " .duration").style.display = "inline", document.querySelector("#" + a.id() + " .duration").innerText = b) : (document.querySelector("#" + a.id() + " .duration").style.display = "none", document.querySelector("#" + a.id() + " .time-bound").style.display = "none")
					}), this._player.on("timeupdate", function() {
						var b = e.formatTime(a._player.getCurrentTime());
						document.querySelector("#" + a.id() + " .current-time") && (b ? (document.querySelector("#" + a.id() + " .current-time").style.display = "inline", document.querySelector("#" + a.id() + " .current-time").innerText = b) : document.querySelector("#" + a.id() + " .current-time").style.display = "none")
					})
				}
			});
		b.exports = f
	}, {
		"../../lib/util": 54,
		"../component": 62
	}],
	73: [function(a, b, c) {
		var d = a("../component"),
			e = d.extend({
				init: function(a, b) {
					d.call(this, a, b), this.addClass(b.className || "prism-volume")
				},
				bindEvent: function() {
					var a = this;
					this.on("click", function() {
						a._player.muted() ? (a._player.unMute(), a.removeClass("mute")) : (a._player.mute(), a.addClass("mute"))
					})
				}
			});
		b.exports = e
	}, {
		"../component": 62
	}],
	74: [function(a, b, c) {
		b.exports = {
			H5Loading: a("./component/h5-loading"),
			bigPlayButton: a("./component/big-play-button"),
			controlBar: a("./component/controlbar"),
			progress: a("./component/progress"),
			playButton: a("./component/play-button"),
			liveDisplay: a("./component/live-display"),
			timeDisplay: a("./component/time-display"),
			fullScreenButton: a("./component/fullscreen-button"),
			volume: a("./component/volume"),
			streamButton: a("./component/stream-selector")
		}
	}, {
		"./component/big-play-button": 63,
		"./component/controlbar": 64,
		"./component/fullscreen-button": 66,
		"./component/h5-loading": 67,
		"./component/live-display": 68,
		"./component/play-button": 69,
		"./component/progress": 70,
		"./component/stream-selector": 71,
		"./component/time-display": 72,
		"./component/volume": 73
	}]
}, {}, [41]);