! function(t, e) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.dayjs = e()
}(this, function() {
	"use strict";
	var t = "millisecond",
		e = "second",
		n = "minute",
		r = "hour",
		i = "day",
		s = "week",
		u = "month",
		o = "quarter",
		a = "year",
		h = /^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,
		f = /\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
		c = function(t, e, n) {
			var r = String(t);
			return !r || r.length >= e ? t : "" + Array(e + 1 - r.length).join(n) + t
		},
		d = {
			s: c,
			z: function(t) {
				var e = -t.utcOffset(),
					n = Math.abs(e),
					r = Math.floor(n / 60),
					i = n % 60;
				return (e <= 0 ? "+" : "-") + c(r, 2, "0") + ":" + c(i, 2, "0")
			},
			m: function(t, e) {
				var n = 12 * (e.year() - t.year()) + (e.month() - t.month()),
					r = t.clone().add(n, u),
					i = e - r < 0,
					s = t.clone().add(n + (i ? -1 : 1), u);
				return Number(-(n + (e - r) / (i ? r - s : s - r)) || 0)
			},
			a: function(t) {
				return t < 0 ? Math.ceil(t) || 0 : Math.floor(t)
			},
			p: function(h) {
				return {
					M: u,
					y: a,
					w: s,
					d: i,
					D: "date",
					h: r,
					m: n,
					s: e,
					ms: t,
					Q: o
				} [h] || String(h || "").toLowerCase().replace(/s$/, "")
			},
			u: function(t) {
				return void 0 === t
			}
		},
		$ = {
			name: "en",
			weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
			months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_")
		},
		l = "en",
		m = {};
	m[l] = $;
	var y = function(t) {
			return t instanceof v
		},
		M = function(t, e, n) {
			var r;
			if (!t) return l;
			if ("string" == typeof t) m[t] && (r = t), e && (m[t] = e, r = t);
			else {
				var i = t.name;
				m[i] = t, r = i
			}
			return !n && r && (l = r), r || !n && l
		},
		g = function(t, e) {
			if (y(t)) return t.clone();
			var n = "object" == typeof e ? e : {};
			return n.date = t, n.args = arguments, new v(n)
		},
		D = d;
	D.l = M, D.i = y, D.w = function(t, e) {
		return g(t, {
			locale: e.$L,
			utc: e.$u,
			$offset: e.$offset
		})
	};
	var v = function() {
		function c(t) {
			this.$L = this.$L || M(t.locale, null, !0), this.parse(t)
		}
		var d = c.prototype;
		return d.parse = function(t) {
			this.$d = function(t) {
				var e = t.date,
					n = t.utc;
				if (null === e) return new Date(NaN);
				if (D.u(e)) return new Date;
				if (e instanceof Date) return new Date(e);
				if ("string" == typeof e && !/Z$/i.test(e)) {
					var r = e.match(h);
					if (r) return n ? new Date(Date.UTC(r[1], r[2] - 1, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, r[7] || 0)) : new Date(r[1], r[2] - 1, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, r[7] || 0)
				}
				return new Date(e)
			}(t), this.init()
		}, d.init = function() {
			var t = this.$d;
			this.$y = t.getFullYear(), this.$M = t.getMonth(), this.$D = t.getDate(), this.$W = t.getDay(), this.$H = t.getHours(), this.$m = t.getMinutes(), this.$s = t.getSeconds(), this.$ms = t.getMilliseconds()
		}, d.$utils = function() {
			return D
		}, d.isValid = function() {
			return !("Invalid Date" === this.$d.toString())
		}, d.isSame = function(t, e) {
			var n = g(t);
			return this.startOf(e) <= n && n <= this.endOf(e)
		}, d.isAfter = function(t, e) {
			return g(t) < this.startOf(e)
		}, d.isBefore = function(t, e) {
			return this.endOf(e) < g(t)
		}, d.$g = function(t, e, n) {
			return D.u(t) ? this[e] : this.set(n, t)
		}, d.year = function(t) {
			return this.$g(t, "$y", a)
		}, d.month = function(t) {
			return this.$g(t, "$M", u)
		}, d.day = function(t) {
			return this.$g(t, "$W", i)
		}, d.date = function(t) {
			return this.$g(t, "$D", "date")
		}, d.hour = function(t) {
			return this.$g(t, "$H", r)
		}, d.minute = function(t) {
			return this.$g(t, "$m", n)
		}, d.second = function(t) {
			return this.$g(t, "$s", e)
		}, d.millisecond = function(e) {
			return this.$g(e, "$ms", t)
		}, d.unix = function() {
			return Math.floor(this.valueOf() / 1e3)
		}, d.valueOf = function() {
			return this.$d.getTime()
		}, d.startOf = function(t, o) {
			var h = this,
				f = !!D.u(o) || o,
				c = D.p(t),
				d = function(t, e) {
					var n = D.w(h.$u ? Date.UTC(h.$y, e, t) : new Date(h.$y, e, t), h);
					return f ? n : n.endOf(i)
				},
				$ = function(t, e) {
					return D.w(h.toDate()[t].apply(h.toDate("s"), (f ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e)), h)
				},
				l = this.$W,
				m = this.$M,
				y = this.$D,
				M = "set" + (this.$u ? "UTC" : "");
			switch (c) {
				case a:
					return f ? d(1, 0) : d(31, 11);
				case u:
					return f ? d(1, m) : d(0, m + 1);
				case s:
					var g = this.$locale().weekStart || 0,
						v = (l < g ? l + 7 : l) - g;
					return d(f ? y - v : y + (6 - v), m);
				case i:
				case "date":
					return $(M + "Hours", 0);
				case r:
					return $(M + "Minutes", 1);
				case n:
					return $(M + "Seconds", 2);
				case e:
					return $(M + "Milliseconds", 3);
				default:
					return this.clone()
			}
		}, d.endOf = function(t) {
			return this.startOf(t, !1)
		}, d.$set = function(s, o) {
			var h, f = D.p(s),
				c = "set" + (this.$u ? "UTC" : ""),
				d = (h = {}, h[i] = c + "Date", h.date = c + "Date", h[u] = c + "Month", h[a] = c + "FullYear", h[r] = c + "Hours", h[n] = c + "Minutes", h[e] = c + "Seconds", h[t] = c + "Milliseconds", h)[f],
				$ = f === i ? this.$D + (o - this.$W) : o;
			if (f === u || f === a) {
				var l = this.clone().set("date", 1);
				l.$d[d]($), l.init(), this.$d = l.set("date", Math.min(this.$D, l.daysInMonth())).toDate()
			}
			else d && this.$d[d]($);
			return this.init(), this
		}, d.set = function(t, e) {
			return this.clone().$set(t, e)
		}, d.get = function(t) {
			return this[D.p(t)]()
		}, d.add = function(t, o) {
			var h, f = this;
			t = Number(t);
			var c = D.p(o),
				d = function(e) {
					var n = g(f);
					return D.w(n.date(n.date() + Math.round(e * t)), f)
				};
			if (c === u) return this.set(u, this.$M + t);
			if (c === a) return this.set(a, this.$y + t);
			if (c === i) return d(1);
			if (c === s) return d(7);
			var $ = (h = {}, h[n] = 6e4, h[r] = 36e5, h[e] = 1e3, h)[c] || 1,
				l = this.$d.getTime() + t * $;
			return D.w(l, this)
		}, d.subtract = function(t, e) {
			return this.add(-1 * t, e)
		}, d.format = function(t) {
			var e = this;
			if (!this.isValid()) return "Invalid Date";
			var n = t || "YYYY-MM-DDTHH:mm:ssZ",
				r = D.z(this),
				i = this.$locale(),
				s = this.$H,
				u = this.$m,
				o = this.$M,
				a = i.weekdays,
				h = i.months,
				c = function(t, r, i, s) {
					return t && (t[r] || t(e, n)) || i[r].substr(0, s)
				},
				d = function(t) {
					return D.s(s % 12 || 12, t, "0")
				},
				$ = i.meridiem || function(t, e, n) {
					var r = t < 12 ? "AM" : "PM";
					return n ? r.toLowerCase() : r
				},
				l = {
					YY: String(this.$y).slice(-2),
					YYYY: this.$y,
					M: o + 1,
					MM: D.s(o + 1, 2, "0"),
					MMM: c(i.monthsShort, o, h, 3),
					MMMM: c(h, o),
					D: this.$D,
					DD: D.s(this.$D, 2, "0"),
					d: String(this.$W),
					dd: c(i.weekdaysMin, this.$W, a, 2),
					ddd: c(i.weekdaysShort, this.$W, a, 3),
					dddd: a[this.$W],
					H: String(s),
					HH: D.s(s, 2, "0"),
					h: d(1),
					hh: d(2),
					a: $(s, u, !0),
					A: $(s, u, !1),
					m: String(u),
					mm: D.s(u, 2, "0"),
					s: String(this.$s),
					ss: D.s(this.$s, 2, "0"),
					SSS: D.s(this.$ms, 3, "0"),
					Z: r
				};
			return n.replace(f, function(t, e) {
				return e || l[t] || r.replace(":", "")
			})
		}, d.utcOffset = function() {
			return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
		}, d.diff = function(t, h, f) {
			var c, d = D.p(h),
				$ = g(t),
				l = 6e4 * ($.utcOffset() - this.utcOffset()),
				m = this - $,
				y = D.m(this, $);
			return y = (c = {}, c[a] = y / 12, c[u] = y, c[o] = y / 3, c[s] = (m - l) / 6048e5, c[i] = (m - l) / 864e5, c[r] = m / 36e5, c[n] = m / 6e4, c[e] = m / 1e3, c)[d] || m, f ? y : D.a(y)
		}, d.daysInMonth = function() {
			return this.endOf(u).$D
		}, d.$locale = function() {
			return m[this.$L]
		}, d.locale = function(t, e) {
			if (!t) return this.$L;
			var n = this.clone(),
				r = M(t, e, !0);
			return r && (n.$L = r), n
		}, d.clone = function() {
			return D.w(this.$d, this)
		}, d.toDate = function() {
			return new Date(this.valueOf())
		}, d.toJSON = function() {
			return this.isValid() ? this.toISOString() : null
		}, d.toISOString = function() {
			return this.$d.toISOString()
		}, d.toString = function() {
			return this.$d.toUTCString()
		}, c
	}();
	return g.prototype = v.prototype, g.extend = function(t, e) {
		return t(e, v, g), g
	}, g.locale = M, g.isDayjs = y, g.unix = function(t) {
		return g(1e3 * t)
	}, g.en = m[l], g.Ls = m, g
});