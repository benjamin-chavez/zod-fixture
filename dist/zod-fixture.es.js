import Wt from "randexp";
const Kt = () => Math.floor(Math.random() * Math.pow(10, 13)), X = 0, N = 3, pe = Number.MIN_SAFE_INTEGER, _e = Number.MAX_SAFE_INTEGER, qt = {
  array: {
    min: N,
    max: N
  },
  map: {
    min: N,
    max: N
  },
  set: {
    min: N,
    max: N
  },
  int: {
    min: -100,
    max: 100
  },
  float: {
    min: -100,
    max: 100
  },
  bigint: {
    min: -100n,
    max: 100n
  },
  date: {
    min: Date.UTC(2020, 0, 1),
    max: Date.UTC(2030, 11, 31)
  },
  string: {
    min: 15,
    max: 15,
    characterSet: "abcdefghijklmnopqrstuvwxyz-"
  },
  recursion: {
    min: 2,
    max: 2
  }
}, Xt = {
  array: {
    min: X,
    max: N
  },
  map: {
    min: X,
    max: N
  },
  set: {
    min: X,
    max: N
  },
  int: {
    min: pe,
    max: _e
  },
  float: {
    min: pe,
    max: _e
  },
  bigint: {
    min: BigInt(pe),
    max: BigInt(_e)
  },
  date: {
    min: Date.UTC(2020, 0, 1),
    max: Date.UTC(2030, 11, 31)
  },
  string: {
    min: 0,
    max: 100,
    characterSet: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.,/\\!@#$%^&*()_+=-{}[]|:;?<>~`'\""
  },
  recursion: {
    min: X,
    max: N
  }
};
function a(e, t, n) {
  function r(u, c) {
    if (u._zod || Object.defineProperty(u, "_zod", {
      value: {
        def: c,
        constr: s,
        traits: /* @__PURE__ */ new Set()
      },
      enumerable: !1
    }), u._zod.traits.has(e))
      return;
    u._zod.traits.add(e), t(u, c);
    const l = s.prototype, f = Object.keys(l);
    for (let d = 0; d < f.length; d++) {
      const m = f[d];
      m in u || (u[m] = l[m].bind(u));
    }
  }
  const o = n?.Parent ?? Object;
  class i extends o {
  }
  Object.defineProperty(i, "name", { value: e });
  function s(u) {
    var c;
    const l = n?.Parent ? new i() : this;
    r(l, u), (c = l._zod).deferred ?? (c.deferred = []);
    for (const f of l._zod.deferred)
      f();
    return l;
  }
  return Object.defineProperty(s, "init", { value: r }), Object.defineProperty(s, Symbol.hasInstance, {
    value: (u) => n?.Parent && u instanceof n.Parent ? !0 : u?._zod?.traits?.has(e)
  }), Object.defineProperty(s, "name", { value: e }), s;
}
class U extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}
class rt extends Error {
  constructor(t) {
    super(`Encountered unidirectional transform during encode: ${t}`), this.name = "ZodEncodeError";
  }
}
const ot = {};
function x(e) {
  return ot;
}
function it(e) {
  const t = Object.values(e).filter((r) => typeof r == "number");
  return Object.entries(e).filter(([r, o]) => t.indexOf(+r) === -1).map(([r, o]) => o);
}
function ge(e, t) {
  return typeof t == "bigint" ? t.toString() : t;
}
function ue(e) {
  return {
    get value() {
      {
        const t = e();
        return Object.defineProperty(this, "value", { value: t }), t;
      }
    }
  };
}
function G(e) {
  return e == null;
}
function ke(e) {
  const t = e.startsWith("^") ? 1 : 0, n = e.endsWith("$") ? e.length - 1 : e.length;
  return e.slice(t, n);
}
function Ht(e, t) {
  const n = (e.toString().split(".")[1] || "").length, r = t.toString();
  let o = (r.split(".")[1] || "").length;
  if (o === 0 && /\d?e-\d?/.test(r)) {
    const c = r.match(/\d?e-(\d?)/);
    c?.[1] && (o = Number.parseInt(c[1]));
  }
  const i = n > o ? n : o, s = Number.parseInt(e.toFixed(i).replace(".", "")), u = Number.parseInt(t.toFixed(i).replace(".", ""));
  return s % u / 10 ** i;
}
const Ee = Symbol("evaluating");
function g(e, t, n) {
  let r;
  Object.defineProperty(e, t, {
    get() {
      if (r !== Ee)
        return r === void 0 && (r = Ee, r = n()), r;
    },
    set(o) {
      Object.defineProperty(e, t, {
        value: o
        // configurable: true,
      });
    },
    configurable: !0
  });
}
function D(e, t, n) {
  Object.defineProperty(e, t, {
    value: n,
    writable: !0,
    enumerable: !0,
    configurable: !0
  });
}
function C(...e) {
  const t = {};
  for (const n of e) {
    const r = Object.getOwnPropertyDescriptors(n);
    Object.assign(t, r);
  }
  return Object.defineProperties({}, t);
}
function Oe(e) {
  return JSON.stringify(e);
}
function Yt(e) {
  return e.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
const st = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {
};
function K(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
const Qt = ue(() => {
  if (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))
    return !1;
  try {
    const e = Function;
    return new e(""), !0;
  } catch {
    return !1;
  }
});
function F(e) {
  if (K(e) === !1)
    return !1;
  const t = e.constructor;
  if (t === void 0 || typeof t != "function")
    return !0;
  const n = t.prototype;
  return !(K(n) === !1 || Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") === !1);
}
function ut(e) {
  return F(e) ? { ...e } : Array.isArray(e) ? [...e] : e;
}
const ve = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function J(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function P(e, t, n) {
  const r = new e._zod.constr(t ?? e._zod.def);
  return (!t || n?.parent) && (r._zod.parent = e), r;
}
function h(e) {
  const t = e;
  if (!t)
    return {};
  if (typeof t == "string")
    return { error: () => t };
  if (t?.message !== void 0) {
    if (t?.error !== void 0)
      throw new Error("Cannot specify both `message` and `error` params");
    t.error = t.message;
  }
  return delete t.message, typeof t.error == "string" ? { ...t, error: () => t.error } : t;
}
function en(e) {
  return Object.keys(e).filter((t) => e[t]._zod.optin === "optional" && e[t]._zod.optout === "optional");
}
const tn = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function nn(e, t) {
  const n = e._zod.def, r = C(e._zod.def, {
    get shape() {
      const o = {};
      for (const i in t) {
        if (!(i in n.shape))
          throw new Error(`Unrecognized key: "${i}"`);
        t[i] && (o[i] = n.shape[i]);
      }
      return D(this, "shape", o), o;
    },
    checks: []
  });
  return P(e, r);
}
function rn(e, t) {
  const n = e._zod.def, r = C(e._zod.def, {
    get shape() {
      const o = { ...e._zod.def.shape };
      for (const i in t) {
        if (!(i in n.shape))
          throw new Error(`Unrecognized key: "${i}"`);
        t[i] && delete o[i];
      }
      return D(this, "shape", o), o;
    },
    checks: []
  });
  return P(e, r);
}
function on(e, t) {
  if (!F(t))
    throw new Error("Invalid input to extend: expected a plain object");
  const n = e._zod.def.checks;
  if (n && n.length > 0)
    throw new Error("Object schemas containing refinements cannot be extended. Use `.safeExtend()` instead.");
  const o = C(e._zod.def, {
    get shape() {
      const i = { ...e._zod.def.shape, ...t };
      return D(this, "shape", i), i;
    },
    checks: []
  });
  return P(e, o);
}
function sn(e, t) {
  if (!F(t))
    throw new Error("Invalid input to safeExtend: expected a plain object");
  const n = {
    ...e._zod.def,
    get shape() {
      const r = { ...e._zod.def.shape, ...t };
      return D(this, "shape", r), r;
    },
    checks: e._zod.def.checks
  };
  return P(e, n);
}
function un(e, t) {
  const n = C(e._zod.def, {
    get shape() {
      const r = { ...e._zod.def.shape, ...t._zod.def.shape };
      return D(this, "shape", r), r;
    },
    get catchall() {
      return t._zod.def.catchall;
    },
    checks: []
    // delete existing checks
  });
  return P(e, n);
}
function cn(e, t, n) {
  const r = C(t._zod.def, {
    get shape() {
      const o = t._zod.def.shape, i = { ...o };
      if (n)
        for (const s in n) {
          if (!(s in o))
            throw new Error(`Unrecognized key: "${s}"`);
          n[s] && (i[s] = e ? new e({
            type: "optional",
            innerType: o[s]
          }) : o[s]);
        }
      else
        for (const s in o)
          i[s] = e ? new e({
            type: "optional",
            innerType: o[s]
          }) : o[s];
      return D(this, "shape", i), i;
    },
    checks: []
  });
  return P(t, r);
}
function an(e, t, n) {
  const r = C(t._zod.def, {
    get shape() {
      const o = t._zod.def.shape, i = { ...o };
      if (n)
        for (const s in n) {
          if (!(s in i))
            throw new Error(`Unrecognized key: "${s}"`);
          n[s] && (i[s] = new e({
            type: "nonoptional",
            innerType: o[s]
          }));
        }
      else
        for (const s in o)
          i[s] = new e({
            type: "nonoptional",
            innerType: o[s]
          });
      return D(this, "shape", i), i;
    },
    checks: []
  });
  return P(t, r);
}
function M(e, t = 0) {
  if (e.aborted === !0)
    return !0;
  for (let n = t; n < e.issues.length; n++)
    if (e.issues[n]?.continue !== !0)
      return !0;
  return !1;
}
function T(e, t) {
  return t.map((n) => {
    var r;
    return (r = n).path ?? (r.path = []), n.path.unshift(e), n;
  });
}
function H(e) {
  return typeof e == "string" ? e : e?.message;
}
function I(e, t, n) {
  const r = { ...e, path: e.path ?? [] };
  if (!e.message) {
    const o = H(e.inst?._zod.def?.error?.(e)) ?? H(t?.error?.(e)) ?? H(n.customError?.(e)) ?? H(n.localeError?.(e)) ?? "Invalid input";
    r.message = o;
  }
  return delete r.inst, delete r.continue, t?.reportInput || delete r.input, r;
}
function ye(e) {
  return e instanceof Set ? "set" : e instanceof Map ? "map" : e instanceof File ? "file" : "unknown";
}
function Se(e) {
  return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function q(...e) {
  const [t, n, r] = e;
  return typeof t == "string" ? {
    message: t,
    code: "custom",
    input: n,
    inst: r
  } : { ...t };
}
const ct = (e, t) => {
  e.name = "$ZodError", Object.defineProperty(e, "_zod", {
    value: e._zod,
    enumerable: !1
  }), Object.defineProperty(e, "issues", {
    value: t,
    enumerable: !1
  }), e.message = JSON.stringify(t, ge, 2), Object.defineProperty(e, "toString", {
    value: () => e.message,
    enumerable: !1
  });
}, at = a("$ZodError", ct), ce = a("$ZodError", ct, { Parent: Error });
function ln(e, t = (n) => n.message) {
  const n = {}, r = [];
  for (const o of e.issues)
    o.path.length > 0 ? (n[o.path[0]] = n[o.path[0]] || [], n[o.path[0]].push(t(o))) : r.push(t(o));
  return { formErrors: r, fieldErrors: n };
}
function fn(e, t = (n) => n.message) {
  const n = { _errors: [] }, r = (o) => {
    for (const i of o.issues)
      if (i.code === "invalid_union" && i.errors.length)
        i.errors.map((s) => r({ issues: s }));
      else if (i.code === "invalid_key")
        r({ issues: i.issues });
      else if (i.code === "invalid_element")
        r({ issues: i.issues });
      else if (i.path.length === 0)
        n._errors.push(t(i));
      else {
        let s = n, u = 0;
        for (; u < i.path.length; ) {
          const c = i.path[u];
          u === i.path.length - 1 ? (s[c] = s[c] || { _errors: [] }, s[c]._errors.push(t(i))) : s[c] = s[c] || { _errors: [] }, s = s[c], u++;
        }
      }
  };
  return r(e), n;
}
const ae = (e) => (t, n, r, o) => {
  const i = r ? Object.assign(r, { async: !1 }) : { async: !1 }, s = t._zod.run({ value: n, issues: [] }, i);
  if (s instanceof Promise)
    throw new U();
  if (s.issues.length) {
    const u = new (o?.Err ?? e)(s.issues.map((c) => I(c, i, x())));
    throw st(u, o?.callee), u;
  }
  return s.value;
}, Te = /* @__PURE__ */ ae(ce), le = (e) => async (t, n, r, o) => {
  const i = r ? Object.assign(r, { async: !0 }) : { async: !0 };
  let s = t._zod.run({ value: n, issues: [] }, i);
  if (s instanceof Promise && (s = await s), s.issues.length) {
    const u = new (o?.Err ?? e)(s.issues.map((c) => I(c, i, x())));
    throw st(u, o?.callee), u;
  }
  return s.value;
}, Pe = /* @__PURE__ */ le(ce), fe = (e) => (t, n, r) => {
  const o = r ? { ...r, async: !1 } : { async: !1 }, i = t._zod.run({ value: n, issues: [] }, o);
  if (i instanceof Promise)
    throw new U();
  return i.issues.length ? {
    success: !1,
    error: new (e ?? at)(i.issues.map((s) => I(s, o, x())))
  } : { success: !0, data: i.value };
}, dn = /* @__PURE__ */ fe(ce), de = (e) => async (t, n, r) => {
  const o = r ? Object.assign(r, { async: !0 }) : { async: !0 };
  let i = t._zod.run({ value: n, issues: [] }, o);
  return i instanceof Promise && (i = await i), i.issues.length ? {
    success: !1,
    error: new e(i.issues.map((s) => I(s, o, x())))
  } : { success: !0, data: i.value };
}, hn = /* @__PURE__ */ de(ce), mn = (e) => (t, n, r) => {
  const o = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return ae(e)(t, n, o);
}, pn = (e) => (t, n, r) => ae(e)(t, n, r), _n = (e) => async (t, n, r) => {
  const o = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return le(e)(t, n, o);
}, gn = (e) => async (t, n, r) => le(e)(t, n, r), vn = (e) => (t, n, r) => {
  const o = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return fe(e)(t, n, o);
}, zn = (e) => (t, n, r) => fe(e)(t, n, r), bn = (e) => async (t, n, r) => {
  const o = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return de(e)(t, n, o);
}, wn = (e) => async (t, n, r) => de(e)(t, n, r), kn = /^[cC][^\s-]{8,}$/, yn = /^[0-9a-z]+$/, Sn = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, Zn = /^[0-9a-vA-V]{20}$/, $n = /^[A-Za-z0-9]{27}$/, Nn = /^[a-zA-Z0-9_-]{21}$/, xn = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, In = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, Ae = (e) => e ? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, En = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, On = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function Tn() {
  return new RegExp(On, "u");
}
const Pn = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, An = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, jn = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, Dn = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Cn = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, lt = /^[A-Za-z0-9_-]*$/, Rn = /^\+(?:[0-9]){6,14}[0-9]$/, ft = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", Mn = /* @__PURE__ */ new RegExp(`^${ft}$`);
function dt(e) {
  const t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function Un(e) {
  return new RegExp(`^${dt(e)}$`);
}
function Fn(e) {
  const t = dt({ precision: e.precision }), n = ["Z"];
  e.local && n.push(""), e.offset && n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  const r = `${t}(?:${n.join("|")})`;
  return new RegExp(`^${ft}T(?:${r})$`);
}
const Jn = (e) => {
  const t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
  return new RegExp(`^${t}$`);
}, Gn = /^-?\d+n?$/, Ln = /^-?\d+$/, Vn = /^-?\d+(?:\.\d+)?/, Bn = /^(?:true|false)$/i, Wn = /^null$/i, Kn = /^undefined$/i, qn = /^[^A-Z]*$/, Xn = /^[^a-z]*$/, k = /* @__PURE__ */ a("$ZodCheck", (e, t) => {
  var n;
  e._zod ?? (e._zod = {}), e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), ht = {
  number: "number",
  bigint: "bigint",
  object: "date"
}, mt = /* @__PURE__ */ a("$ZodCheckLessThan", (e, t) => {
  k.init(e, t);
  const n = ht[typeof t.value];
  e._zod.onattach.push((r) => {
    const o = r._zod.bag, i = (t.inclusive ? o.maximum : o.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    t.value < i && (t.inclusive ? o.maximum = t.value : o.exclusiveMaximum = t.value);
  }), e._zod.check = (r) => {
    (t.inclusive ? r.value <= t.value : r.value < t.value) || r.issues.push({
      origin: n,
      code: "too_big",
      maximum: t.value,
      input: r.value,
      inclusive: t.inclusive,
      inst: e,
      continue: !t.abort
    });
  };
}), pt = /* @__PURE__ */ a("$ZodCheckGreaterThan", (e, t) => {
  k.init(e, t);
  const n = ht[typeof t.value];
  e._zod.onattach.push((r) => {
    const o = r._zod.bag, i = (t.inclusive ? o.minimum : o.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    t.value > i && (t.inclusive ? o.minimum = t.value : o.exclusiveMinimum = t.value);
  }), e._zod.check = (r) => {
    (t.inclusive ? r.value >= t.value : r.value > t.value) || r.issues.push({
      origin: n,
      code: "too_small",
      minimum: t.value,
      input: r.value,
      inclusive: t.inclusive,
      inst: e,
      continue: !t.abort
    });
  };
}), Hn = /* @__PURE__ */ a("$ZodCheckMultipleOf", (e, t) => {
  k.init(e, t), e._zod.onattach.push((n) => {
    var r;
    (r = n._zod.bag).multipleOf ?? (r.multipleOf = t.value);
  }), e._zod.check = (n) => {
    if (typeof n.value != typeof t.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    (typeof n.value == "bigint" ? n.value % t.value === BigInt(0) : Ht(n.value, t.value) === 0) || n.issues.push({
      origin: typeof n.value,
      code: "not_multiple_of",
      divisor: t.value,
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), Yn = /* @__PURE__ */ a("$ZodCheckNumberFormat", (e, t) => {
  k.init(e, t), t.format = t.format || "float64";
  const n = t.format?.includes("int"), r = n ? "int" : "number", [o, i] = tn[t.format];
  e._zod.onattach.push((s) => {
    const u = s._zod.bag;
    u.format = t.format, u.minimum = o, u.maximum = i, n && (u.pattern = Ln);
  }), e._zod.check = (s) => {
    const u = s.value;
    if (n) {
      if (!Number.isInteger(u)) {
        s.issues.push({
          expected: r,
          format: t.format,
          code: "invalid_type",
          continue: !1,
          input: u,
          inst: e
        });
        return;
      }
      if (!Number.isSafeInteger(u)) {
        u > 0 ? s.issues.push({
          input: u,
          code: "too_big",
          maximum: Number.MAX_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: e,
          origin: r,
          continue: !t.abort
        }) : s.issues.push({
          input: u,
          code: "too_small",
          minimum: Number.MIN_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: e,
          origin: r,
          continue: !t.abort
        });
        return;
      }
    }
    u < o && s.issues.push({
      origin: "number",
      input: u,
      code: "too_small",
      minimum: o,
      inclusive: !0,
      inst: e,
      continue: !t.abort
    }), u > i && s.issues.push({
      origin: "number",
      input: u,
      code: "too_big",
      maximum: i,
      inst: e
    });
  };
}), Qn = /* @__PURE__ */ a("$ZodCheckMaxSize", (e, t) => {
  var n;
  k.init(e, t), (n = e._zod.def).when ?? (n.when = (r) => {
    const o = r.value;
    return !G(o) && o.size !== void 0;
  }), e._zod.onattach.push((r) => {
    const o = r._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    t.maximum < o && (r._zod.bag.maximum = t.maximum);
  }), e._zod.check = (r) => {
    const o = r.value;
    o.size <= t.maximum || r.issues.push({
      origin: ye(o),
      code: "too_big",
      maximum: t.maximum,
      inclusive: !0,
      input: o,
      inst: e,
      continue: !t.abort
    });
  };
}), er = /* @__PURE__ */ a("$ZodCheckMinSize", (e, t) => {
  var n;
  k.init(e, t), (n = e._zod.def).when ?? (n.when = (r) => {
    const o = r.value;
    return !G(o) && o.size !== void 0;
  }), e._zod.onattach.push((r) => {
    const o = r._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    t.minimum > o && (r._zod.bag.minimum = t.minimum);
  }), e._zod.check = (r) => {
    const o = r.value;
    o.size >= t.minimum || r.issues.push({
      origin: ye(o),
      code: "too_small",
      minimum: t.minimum,
      inclusive: !0,
      input: o,
      inst: e,
      continue: !t.abort
    });
  };
}), tr = /* @__PURE__ */ a("$ZodCheckSizeEquals", (e, t) => {
  var n;
  k.init(e, t), (n = e._zod.def).when ?? (n.when = (r) => {
    const o = r.value;
    return !G(o) && o.size !== void 0;
  }), e._zod.onattach.push((r) => {
    const o = r._zod.bag;
    o.minimum = t.size, o.maximum = t.size, o.size = t.size;
  }), e._zod.check = (r) => {
    const o = r.value, i = o.size;
    if (i === t.size)
      return;
    const s = i > t.size;
    r.issues.push({
      origin: ye(o),
      ...s ? { code: "too_big", maximum: t.size } : { code: "too_small", minimum: t.size },
      inclusive: !0,
      exact: !0,
      input: r.value,
      inst: e,
      continue: !t.abort
    });
  };
}), nr = /* @__PURE__ */ a("$ZodCheckMaxLength", (e, t) => {
  var n;
  k.init(e, t), (n = e._zod.def).when ?? (n.when = (r) => {
    const o = r.value;
    return !G(o) && o.length !== void 0;
  }), e._zod.onattach.push((r) => {
    const o = r._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    t.maximum < o && (r._zod.bag.maximum = t.maximum);
  }), e._zod.check = (r) => {
    const o = r.value;
    if (o.length <= t.maximum)
      return;
    const s = Se(o);
    r.issues.push({
      origin: s,
      code: "too_big",
      maximum: t.maximum,
      inclusive: !0,
      input: o,
      inst: e,
      continue: !t.abort
    });
  };
}), rr = /* @__PURE__ */ a("$ZodCheckMinLength", (e, t) => {
  var n;
  k.init(e, t), (n = e._zod.def).when ?? (n.when = (r) => {
    const o = r.value;
    return !G(o) && o.length !== void 0;
  }), e._zod.onattach.push((r) => {
    const o = r._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    t.minimum > o && (r._zod.bag.minimum = t.minimum);
  }), e._zod.check = (r) => {
    const o = r.value;
    if (o.length >= t.minimum)
      return;
    const s = Se(o);
    r.issues.push({
      origin: s,
      code: "too_small",
      minimum: t.minimum,
      inclusive: !0,
      input: o,
      inst: e,
      continue: !t.abort
    });
  };
}), or = /* @__PURE__ */ a("$ZodCheckLengthEquals", (e, t) => {
  var n;
  k.init(e, t), (n = e._zod.def).when ?? (n.when = (r) => {
    const o = r.value;
    return !G(o) && o.length !== void 0;
  }), e._zod.onattach.push((r) => {
    const o = r._zod.bag;
    o.minimum = t.length, o.maximum = t.length, o.length = t.length;
  }), e._zod.check = (r) => {
    const o = r.value, i = o.length;
    if (i === t.length)
      return;
    const s = Se(o), u = i > t.length;
    r.issues.push({
      origin: s,
      ...u ? { code: "too_big", maximum: t.length } : { code: "too_small", minimum: t.length },
      inclusive: !0,
      exact: !0,
      input: r.value,
      inst: e,
      continue: !t.abort
    });
  };
}), he = /* @__PURE__ */ a("$ZodCheckStringFormat", (e, t) => {
  var n, r;
  k.init(e, t), e._zod.onattach.push((o) => {
    const i = o._zod.bag;
    i.format = t.format, t.pattern && (i.patterns ?? (i.patterns = /* @__PURE__ */ new Set()), i.patterns.add(t.pattern));
  }), t.pattern ? (n = e._zod).check ?? (n.check = (o) => {
    t.pattern.lastIndex = 0, !t.pattern.test(o.value) && o.issues.push({
      origin: "string",
      code: "invalid_format",
      format: t.format,
      input: o.value,
      ...t.pattern ? { pattern: t.pattern.toString() } : {},
      inst: e,
      continue: !t.abort
    });
  }) : (r = e._zod).check ?? (r.check = () => {
  });
}), ir = /* @__PURE__ */ a("$ZodCheckRegex", (e, t) => {
  he.init(e, t), e._zod.check = (n) => {
    t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "regex",
      input: n.value,
      pattern: t.pattern.toString(),
      inst: e,
      continue: !t.abort
    });
  };
}), sr = /* @__PURE__ */ a("$ZodCheckLowerCase", (e, t) => {
  t.pattern ?? (t.pattern = qn), he.init(e, t);
}), ur = /* @__PURE__ */ a("$ZodCheckUpperCase", (e, t) => {
  t.pattern ?? (t.pattern = Xn), he.init(e, t);
}), cr = /* @__PURE__ */ a("$ZodCheckIncludes", (e, t) => {
  k.init(e, t);
  const n = J(t.includes), r = new RegExp(typeof t.position == "number" ? `^.{${t.position}}${n}` : n);
  t.pattern = r, e._zod.onattach.push((o) => {
    const i = o._zod.bag;
    i.patterns ?? (i.patterns = /* @__PURE__ */ new Set()), i.patterns.add(r);
  }), e._zod.check = (o) => {
    o.value.includes(t.includes, t.position) || o.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "includes",
      includes: t.includes,
      input: o.value,
      inst: e,
      continue: !t.abort
    });
  };
}), ar = /* @__PURE__ */ a("$ZodCheckStartsWith", (e, t) => {
  k.init(e, t);
  const n = new RegExp(`^${J(t.prefix)}.*`);
  t.pattern ?? (t.pattern = n), e._zod.onattach.push((r) => {
    const o = r._zod.bag;
    o.patterns ?? (o.patterns = /* @__PURE__ */ new Set()), o.patterns.add(n);
  }), e._zod.check = (r) => {
    r.value.startsWith(t.prefix) || r.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "starts_with",
      prefix: t.prefix,
      input: r.value,
      inst: e,
      continue: !t.abort
    });
  };
}), lr = /* @__PURE__ */ a("$ZodCheckEndsWith", (e, t) => {
  k.init(e, t);
  const n = new RegExp(`.*${J(t.suffix)}$`);
  t.pattern ?? (t.pattern = n), e._zod.onattach.push((r) => {
    const o = r._zod.bag;
    o.patterns ?? (o.patterns = /* @__PURE__ */ new Set()), o.patterns.add(n);
  }), e._zod.check = (r) => {
    r.value.endsWith(t.suffix) || r.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "ends_with",
      suffix: t.suffix,
      input: r.value,
      inst: e,
      continue: !t.abort
    });
  };
}), fr = /* @__PURE__ */ a("$ZodCheckOverwrite", (e, t) => {
  k.init(e, t), e._zod.check = (n) => {
    n.value = t.tx(n.value);
  };
});
class dr {
  constructor(t = []) {
    this.content = [], this.indent = 0, this && (this.args = t);
  }
  indented(t) {
    this.indent += 1, t(this), this.indent -= 1;
  }
  write(t) {
    if (typeof t == "function") {
      t(this, { execution: "sync" }), t(this, { execution: "async" });
      return;
    }
    const r = t.split(`
`).filter((s) => s), o = Math.min(...r.map((s) => s.length - s.trimStart().length)), i = r.map((s) => s.slice(o)).map((s) => " ".repeat(this.indent * 2) + s);
    for (const s of i)
      this.content.push(s);
  }
  compile() {
    const t = Function, n = this?.args, o = [...(this?.content ?? [""]).map((i) => `  ${i}`)];
    return new t(...n, o.join(`
`));
  }
}
const hr = {
  major: 4,
  minor: 2,
  patch: 1
}, p = /* @__PURE__ */ a("$ZodType", (e, t) => {
  var n;
  e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = hr;
  const r = [...e._zod.def.checks ?? []];
  e._zod.traits.has("$ZodCheck") && r.unshift(e);
  for (const o of r)
    for (const i of o._zod.onattach)
      i(e);
  if (r.length === 0)
    (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
      e._zod.run = e._zod.parse;
    });
  else {
    const o = (s, u, c) => {
      let l = M(s), f;
      for (const d of u) {
        if (d._zod.def.when) {
          if (!d._zod.def.when(s))
            continue;
        } else if (l)
          continue;
        const m = s.issues.length, v = d._zod.check(s);
        if (v instanceof Promise && c?.async === !1)
          throw new U();
        if (f || v instanceof Promise)
          f = (f ?? Promise.resolve()).then(async () => {
            await v, s.issues.length !== m && (l || (l = M(s, m)));
          });
        else {
          if (s.issues.length === m)
            continue;
          l || (l = M(s, m));
        }
      }
      return f ? f.then(() => s) : s;
    }, i = (s, u, c) => {
      if (M(s))
        return s.aborted = !0, s;
      const l = o(u, r, c);
      if (l instanceof Promise) {
        if (c.async === !1)
          throw new U();
        return l.then((f) => e._zod.parse(f, c));
      }
      return e._zod.parse(l, c);
    };
    e._zod.run = (s, u) => {
      if (u.skipChecks)
        return e._zod.parse(s, u);
      if (u.direction === "backward") {
        const l = e._zod.parse({ value: s.value, issues: [] }, { ...u, skipChecks: !0 });
        return l instanceof Promise ? l.then((f) => i(f, s, u)) : i(l, s, u);
      }
      const c = e._zod.parse(s, u);
      if (c instanceof Promise) {
        if (u.async === !1)
          throw new U();
        return c.then((l) => o(l, r, u));
      }
      return o(c, r, u);
    };
  }
  e["~standard"] = {
    validate: (o) => {
      try {
        const i = dn(e, o);
        return i.success ? { value: i.data } : { issues: i.error?.issues };
      } catch {
        return hn(e, o).then((s) => s.success ? { value: s.data } : { issues: s.error?.issues });
      }
    },
    vendor: "zod",
    version: 1
  };
}), Ze = /* @__PURE__ */ a("$ZodString", (e, t) => {
  p.init(e, t), e._zod.pattern = [...e?._zod.bag?.patterns ?? []].pop() ?? Jn(e._zod.bag), e._zod.parse = (n, r) => {
    if (t.coerce)
      try {
        n.value = String(n.value);
      } catch {
      }
    return typeof n.value == "string" || n.issues.push({
      expected: "string",
      code: "invalid_type",
      input: n.value,
      inst: e
    }), n;
  };
}), z = /* @__PURE__ */ a("$ZodStringFormat", (e, t) => {
  he.init(e, t), Ze.init(e, t);
}), mr = /* @__PURE__ */ a("$ZodGUID", (e, t) => {
  t.pattern ?? (t.pattern = In), z.init(e, t);
}), pr = /* @__PURE__ */ a("$ZodUUID", (e, t) => {
  if (t.version) {
    const r = {
      v1: 1,
      v2: 2,
      v3: 3,
      v4: 4,
      v5: 5,
      v6: 6,
      v7: 7,
      v8: 8
    }[t.version];
    if (r === void 0)
      throw new Error(`Invalid UUID version: "${t.version}"`);
    t.pattern ?? (t.pattern = Ae(r));
  } else
    t.pattern ?? (t.pattern = Ae());
  z.init(e, t);
}), _r = /* @__PURE__ */ a("$ZodEmail", (e, t) => {
  t.pattern ?? (t.pattern = En), z.init(e, t);
}), gr = /* @__PURE__ */ a("$ZodURL", (e, t) => {
  z.init(e, t), e._zod.check = (n) => {
    try {
      const r = n.value.trim(), o = new URL(r);
      t.hostname && (t.hostname.lastIndex = 0, t.hostname.test(o.hostname) || n.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid hostname",
        pattern: t.hostname.source,
        input: n.value,
        inst: e,
        continue: !t.abort
      })), t.protocol && (t.protocol.lastIndex = 0, t.protocol.test(o.protocol.endsWith(":") ? o.protocol.slice(0, -1) : o.protocol) || n.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid protocol",
        pattern: t.protocol.source,
        input: n.value,
        inst: e,
        continue: !t.abort
      })), t.normalize ? n.value = o.href : n.value = r;
      return;
    } catch {
      n.issues.push({
        code: "invalid_format",
        format: "url",
        input: n.value,
        inst: e,
        continue: !t.abort
      });
    }
  };
}), vr = /* @__PURE__ */ a("$ZodEmoji", (e, t) => {
  t.pattern ?? (t.pattern = Tn()), z.init(e, t);
}), zr = /* @__PURE__ */ a("$ZodNanoID", (e, t) => {
  t.pattern ?? (t.pattern = Nn), z.init(e, t);
}), br = /* @__PURE__ */ a("$ZodCUID", (e, t) => {
  t.pattern ?? (t.pattern = kn), z.init(e, t);
}), wr = /* @__PURE__ */ a("$ZodCUID2", (e, t) => {
  t.pattern ?? (t.pattern = yn), z.init(e, t);
}), kr = /* @__PURE__ */ a("$ZodULID", (e, t) => {
  t.pattern ?? (t.pattern = Sn), z.init(e, t);
}), yr = /* @__PURE__ */ a("$ZodXID", (e, t) => {
  t.pattern ?? (t.pattern = Zn), z.init(e, t);
}), Sr = /* @__PURE__ */ a("$ZodKSUID", (e, t) => {
  t.pattern ?? (t.pattern = $n), z.init(e, t);
}), Zr = /* @__PURE__ */ a("$ZodISODateTime", (e, t) => {
  t.pattern ?? (t.pattern = Fn(t)), z.init(e, t);
}), $r = /* @__PURE__ */ a("$ZodISODate", (e, t) => {
  t.pattern ?? (t.pattern = Mn), z.init(e, t);
}), Nr = /* @__PURE__ */ a("$ZodISOTime", (e, t) => {
  t.pattern ?? (t.pattern = Un(t)), z.init(e, t);
}), xr = /* @__PURE__ */ a("$ZodISODuration", (e, t) => {
  t.pattern ?? (t.pattern = xn), z.init(e, t);
}), Ir = /* @__PURE__ */ a("$ZodIPv4", (e, t) => {
  t.pattern ?? (t.pattern = Pn), z.init(e, t), e._zod.bag.format = "ipv4";
}), Er = /* @__PURE__ */ a("$ZodIPv6", (e, t) => {
  t.pattern ?? (t.pattern = An), z.init(e, t), e._zod.bag.format = "ipv6", e._zod.check = (n) => {
    try {
      new URL(`http://[${n.value}]`);
    } catch {
      n.issues.push({
        code: "invalid_format",
        format: "ipv6",
        input: n.value,
        inst: e,
        continue: !t.abort
      });
    }
  };
}), Or = /* @__PURE__ */ a("$ZodCIDRv4", (e, t) => {
  t.pattern ?? (t.pattern = jn), z.init(e, t);
}), Tr = /* @__PURE__ */ a("$ZodCIDRv6", (e, t) => {
  t.pattern ?? (t.pattern = Dn), z.init(e, t), e._zod.check = (n) => {
    const r = n.value.split("/");
    try {
      if (r.length !== 2)
        throw new Error();
      const [o, i] = r;
      if (!i)
        throw new Error();
      const s = Number(i);
      if (`${s}` !== i)
        throw new Error();
      if (s < 0 || s > 128)
        throw new Error();
      new URL(`http://[${o}]`);
    } catch {
      n.issues.push({
        code: "invalid_format",
        format: "cidrv6",
        input: n.value,
        inst: e,
        continue: !t.abort
      });
    }
  };
});
function _t(e) {
  if (e === "")
    return !0;
  if (e.length % 4 !== 0)
    return !1;
  try {
    return atob(e), !0;
  } catch {
    return !1;
  }
}
const Pr = /* @__PURE__ */ a("$ZodBase64", (e, t) => {
  t.pattern ?? (t.pattern = Cn), z.init(e, t), e._zod.bag.contentEncoding = "base64", e._zod.check = (n) => {
    _t(n.value) || n.issues.push({
      code: "invalid_format",
      format: "base64",
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
});
function Ar(e) {
  if (!lt.test(e))
    return !1;
  const t = e.replace(/[-_]/g, (r) => r === "-" ? "+" : "/"), n = t.padEnd(Math.ceil(t.length / 4) * 4, "=");
  return _t(n);
}
const jr = /* @__PURE__ */ a("$ZodBase64URL", (e, t) => {
  t.pattern ?? (t.pattern = lt), z.init(e, t), e._zod.bag.contentEncoding = "base64url", e._zod.check = (n) => {
    Ar(n.value) || n.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), Dr = /* @__PURE__ */ a("$ZodE164", (e, t) => {
  t.pattern ?? (t.pattern = Rn), z.init(e, t);
});
function Cr(e, t = null) {
  try {
    const n = e.split(".");
    if (n.length !== 3)
      return !1;
    const [r] = n;
    if (!r)
      return !1;
    const o = JSON.parse(atob(r));
    return !("typ" in o && o?.typ !== "JWT" || !o.alg || t && (!("alg" in o) || o.alg !== t));
  } catch {
    return !1;
  }
}
const Rr = /* @__PURE__ */ a("$ZodJWT", (e, t) => {
  z.init(e, t), e._zod.check = (n) => {
    Cr(n.value, t.alg) || n.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), gt = /* @__PURE__ */ a("$ZodNumber", (e, t) => {
  p.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? Vn, e._zod.parse = (n, r) => {
    if (t.coerce)
      try {
        n.value = Number(n.value);
      } catch {
      }
    const o = n.value;
    if (typeof o == "number" && !Number.isNaN(o) && Number.isFinite(o))
      return n;
    const i = typeof o == "number" ? Number.isNaN(o) ? "NaN" : Number.isFinite(o) ? void 0 : "Infinity" : void 0;
    return n.issues.push({
      expected: "number",
      code: "invalid_type",
      input: o,
      inst: e,
      ...i ? { received: i } : {}
    }), n;
  };
}), Mr = /* @__PURE__ */ a("$ZodNumberFormat", (e, t) => {
  Yn.init(e, t), gt.init(e, t);
}), Ur = /* @__PURE__ */ a("$ZodBoolean", (e, t) => {
  p.init(e, t), e._zod.pattern = Bn, e._zod.parse = (n, r) => {
    if (t.coerce)
      try {
        n.value = !!n.value;
      } catch {
      }
    const o = n.value;
    return typeof o == "boolean" || n.issues.push({
      expected: "boolean",
      code: "invalid_type",
      input: o,
      inst: e
    }), n;
  };
}), Fr = /* @__PURE__ */ a("$ZodBigInt", (e, t) => {
  p.init(e, t), e._zod.pattern = Gn, e._zod.parse = (n, r) => {
    if (t.coerce)
      try {
        n.value = BigInt(n.value);
      } catch {
      }
    return typeof n.value == "bigint" || n.issues.push({
      expected: "bigint",
      code: "invalid_type",
      input: n.value,
      inst: e
    }), n;
  };
}), Jr = /* @__PURE__ */ a("$ZodSymbol", (e, t) => {
  p.init(e, t), e._zod.parse = (n, r) => {
    const o = n.value;
    return typeof o == "symbol" || n.issues.push({
      expected: "symbol",
      code: "invalid_type",
      input: o,
      inst: e
    }), n;
  };
}), Gr = /* @__PURE__ */ a("$ZodUndefined", (e, t) => {
  p.init(e, t), e._zod.pattern = Kn, e._zod.values = /* @__PURE__ */ new Set([void 0]), e._zod.optin = "optional", e._zod.optout = "optional", e._zod.parse = (n, r) => {
    const o = n.value;
    return typeof o > "u" || n.issues.push({
      expected: "undefined",
      code: "invalid_type",
      input: o,
      inst: e
    }), n;
  };
}), Lr = /* @__PURE__ */ a("$ZodNull", (e, t) => {
  p.init(e, t), e._zod.pattern = Wn, e._zod.values = /* @__PURE__ */ new Set([null]), e._zod.parse = (n, r) => {
    const o = n.value;
    return o === null || n.issues.push({
      expected: "null",
      code: "invalid_type",
      input: o,
      inst: e
    }), n;
  };
}), Vr = /* @__PURE__ */ a("$ZodAny", (e, t) => {
  p.init(e, t), e._zod.parse = (n) => n;
}), Br = /* @__PURE__ */ a("$ZodUnknown", (e, t) => {
  p.init(e, t), e._zod.parse = (n) => n;
}), Wr = /* @__PURE__ */ a("$ZodNever", (e, t) => {
  p.init(e, t), e._zod.parse = (n, r) => (n.issues.push({
    expected: "never",
    code: "invalid_type",
    input: n.value,
    inst: e
  }), n);
}), Kr = /* @__PURE__ */ a("$ZodVoid", (e, t) => {
  p.init(e, t), e._zod.parse = (n, r) => {
    const o = n.value;
    return typeof o > "u" || n.issues.push({
      expected: "void",
      code: "invalid_type",
      input: o,
      inst: e
    }), n;
  };
}), qr = /* @__PURE__ */ a("$ZodDate", (e, t) => {
  p.init(e, t), e._zod.parse = (n, r) => {
    if (t.coerce)
      try {
        n.value = new Date(n.value);
      } catch {
      }
    const o = n.value, i = o instanceof Date;
    return i && !Number.isNaN(o.getTime()) || n.issues.push({
      expected: "date",
      code: "invalid_type",
      input: o,
      ...i ? { received: "Invalid Date" } : {},
      inst: e
    }), n;
  };
});
function je(e, t, n) {
  e.issues.length && t.issues.push(...T(n, e.issues)), t.value[n] = e.value;
}
const Xr = /* @__PURE__ */ a("$ZodArray", (e, t) => {
  p.init(e, t), e._zod.parse = (n, r) => {
    const o = n.value;
    if (!Array.isArray(o))
      return n.issues.push({
        expected: "array",
        code: "invalid_type",
        input: o,
        inst: e
      }), n;
    n.value = Array(o.length);
    const i = [];
    for (let s = 0; s < o.length; s++) {
      const u = o[s], c = t.element._zod.run({
        value: u,
        issues: []
      }, r);
      c instanceof Promise ? i.push(c.then((l) => je(l, n, s))) : je(c, n, s);
    }
    return i.length ? Promise.all(i).then(() => n) : n;
  };
});
function te(e, t, n, r) {
  e.issues.length && t.issues.push(...T(n, e.issues)), e.value === void 0 ? n in r && (t.value[n] = void 0) : t.value[n] = e.value;
}
function vt(e) {
  const t = Object.keys(e.shape);
  for (const r of t)
    if (!e.shape?.[r]?._zod?.traits?.has("$ZodType"))
      throw new Error(`Invalid element at key "${r}": expected a Zod schema`);
  const n = en(e.shape);
  return {
    ...e,
    keys: t,
    keySet: new Set(t),
    numKeys: t.length,
    optionalKeys: new Set(n)
  };
}
function zt(e, t, n, r, o, i) {
  const s = [], u = o.keySet, c = o.catchall._zod, l = c.def.type;
  for (const f in t) {
    if (u.has(f))
      continue;
    if (l === "never") {
      s.push(f);
      continue;
    }
    const d = c.run({ value: t[f], issues: [] }, r);
    d instanceof Promise ? e.push(d.then((m) => te(m, n, f, t))) : te(d, n, f, t);
  }
  return s.length && n.issues.push({
    code: "unrecognized_keys",
    keys: s,
    input: t,
    inst: i
  }), e.length ? Promise.all(e).then(() => n) : n;
}
const Hr = /* @__PURE__ */ a("$ZodObject", (e, t) => {
  if (p.init(e, t), !Object.getOwnPropertyDescriptor(t, "shape")?.get) {
    const u = t.shape;
    Object.defineProperty(t, "shape", {
      get: () => {
        const c = { ...u };
        return Object.defineProperty(t, "shape", {
          value: c
        }), c;
      }
    });
  }
  const r = ue(() => vt(t));
  g(e._zod, "propValues", () => {
    const u = t.shape, c = {};
    for (const l in u) {
      const f = u[l]._zod;
      if (f.values) {
        c[l] ?? (c[l] = /* @__PURE__ */ new Set());
        for (const d of f.values)
          c[l].add(d);
      }
    }
    return c;
  });
  const o = K, i = t.catchall;
  let s;
  e._zod.parse = (u, c) => {
    s ?? (s = r.value);
    const l = u.value;
    if (!o(l))
      return u.issues.push({
        expected: "object",
        code: "invalid_type",
        input: l,
        inst: e
      }), u;
    u.value = {};
    const f = [], d = s.shape;
    for (const m of s.keys) {
      const S = d[m]._zod.run({ value: l[m], issues: [] }, c);
      S instanceof Promise ? f.push(S.then((me) => te(me, u, m, l))) : te(S, u, m, l);
    }
    return i ? zt(f, l, u, c, r.value, e) : f.length ? Promise.all(f).then(() => u) : u;
  };
}), Yr = /* @__PURE__ */ a("$ZodObjectJIT", (e, t) => {
  Hr.init(e, t);
  const n = e._zod.parse, r = ue(() => vt(t)), o = (m) => {
    const v = new dr(["shape", "payload", "ctx"]), S = r.value, me = (E) => {
      const $ = Oe(E);
      return `shape[${$}]._zod.run({ value: input[${$}], issues: [] }, ctx)`;
    };
    v.write("const input = payload.value;");
    const Ie = /* @__PURE__ */ Object.create(null);
    let Vt = 0;
    for (const E of S.keys)
      Ie[E] = `key_${Vt++}`;
    v.write("const newResult = {};");
    for (const E of S.keys) {
      const $ = Ie[E], V = Oe(E);
      v.write(`const ${$} = ${me(E)};`), v.write(`
        if (${$}.issues.length) {
          payload.issues = payload.issues.concat(${$}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${V}, ...iss.path] : [${V}]
          })));
        }
        
        
        if (${$}.value === undefined) {
          if (${V} in input) {
            newResult[${V}] = undefined;
          }
        } else {
          newResult[${V}] = ${$}.value;
        }
        
      `);
    }
    v.write("payload.value = newResult;"), v.write("return payload;");
    const Bt = v.compile();
    return (E, $) => Bt(m, E, $);
  };
  let i;
  const s = K, u = !ot.jitless, l = u && Qt.value, f = t.catchall;
  let d;
  e._zod.parse = (m, v) => {
    d ?? (d = r.value);
    const S = m.value;
    return s(S) ? u && l && v?.async === !1 && v.jitless !== !0 ? (i || (i = o(t.shape)), m = i(m, v), f ? zt([], S, m, v, d, e) : m) : n(m, v) : (m.issues.push({
      expected: "object",
      code: "invalid_type",
      input: S,
      inst: e
    }), m);
  };
});
function De(e, t, n, r) {
  for (const i of e)
    if (i.issues.length === 0)
      return t.value = i.value, t;
  const o = e.filter((i) => !M(i));
  return o.length === 1 ? (t.value = o[0].value, o[0]) : (t.issues.push({
    code: "invalid_union",
    input: t.value,
    inst: n,
    errors: e.map((i) => i.issues.map((s) => I(s, r, x())))
  }), t);
}
const bt = /* @__PURE__ */ a("$ZodUnion", (e, t) => {
  p.init(e, t), g(e._zod, "optin", () => t.options.some((o) => o._zod.optin === "optional") ? "optional" : void 0), g(e._zod, "optout", () => t.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0), g(e._zod, "values", () => {
    if (t.options.every((o) => o._zod.values))
      return new Set(t.options.flatMap((o) => Array.from(o._zod.values)));
  }), g(e._zod, "pattern", () => {
    if (t.options.every((o) => o._zod.pattern)) {
      const o = t.options.map((i) => i._zod.pattern);
      return new RegExp(`^(${o.map((i) => ke(i.source)).join("|")})$`);
    }
  });
  const n = t.options.length === 1, r = t.options[0]._zod.run;
  e._zod.parse = (o, i) => {
    if (n)
      return r(o, i);
    let s = !1;
    const u = [];
    for (const c of t.options) {
      const l = c._zod.run({
        value: o.value,
        issues: []
      }, i);
      if (l instanceof Promise)
        u.push(l), s = !0;
      else {
        if (l.issues.length === 0)
          return l;
        u.push(l);
      }
    }
    return s ? Promise.all(u).then((c) => De(c, o, e, i)) : De(u, o, e, i);
  };
}), Qr = /* @__PURE__ */ a("$ZodDiscriminatedUnion", (e, t) => {
  t.inclusive = !1, bt.init(e, t);
  const n = e._zod.parse;
  g(e._zod, "propValues", () => {
    const o = {};
    for (const i of t.options) {
      const s = i._zod.propValues;
      if (!s || Object.keys(s).length === 0)
        throw new Error(`Invalid discriminated union option at index "${t.options.indexOf(i)}"`);
      for (const [u, c] of Object.entries(s)) {
        o[u] || (o[u] = /* @__PURE__ */ new Set());
        for (const l of c)
          o[u].add(l);
      }
    }
    return o;
  });
  const r = ue(() => {
    const o = t.options, i = /* @__PURE__ */ new Map();
    for (const s of o) {
      const u = s._zod.propValues?.[t.discriminator];
      if (!u || u.size === 0)
        throw new Error(`Invalid discriminated union option at index "${t.options.indexOf(s)}"`);
      for (const c of u) {
        if (i.has(c))
          throw new Error(`Duplicate discriminator value "${String(c)}"`);
        i.set(c, s);
      }
    }
    return i;
  });
  e._zod.parse = (o, i) => {
    const s = o.value;
    if (!K(s))
      return o.issues.push({
        code: "invalid_type",
        expected: "object",
        input: s,
        inst: e
      }), o;
    const u = r.value.get(s?.[t.discriminator]);
    return u ? u._zod.run(o, i) : t.unionFallback ? n(o, i) : (o.issues.push({
      code: "invalid_union",
      errors: [],
      note: "No matching discriminator",
      discriminator: t.discriminator,
      input: s,
      path: [t.discriminator],
      inst: e
    }), o);
  };
}), eo = /* @__PURE__ */ a("$ZodIntersection", (e, t) => {
  p.init(e, t), e._zod.parse = (n, r) => {
    const o = n.value, i = t.left._zod.run({ value: o, issues: [] }, r), s = t.right._zod.run({ value: o, issues: [] }, r);
    return i instanceof Promise || s instanceof Promise ? Promise.all([i, s]).then(([c, l]) => Ce(n, c, l)) : Ce(n, i, s);
  };
});
function ze(e, t) {
  if (e === t)
    return { valid: !0, data: e };
  if (e instanceof Date && t instanceof Date && +e == +t)
    return { valid: !0, data: e };
  if (F(e) && F(t)) {
    const n = Object.keys(t), r = Object.keys(e).filter((i) => n.indexOf(i) !== -1), o = { ...e, ...t };
    for (const i of r) {
      const s = ze(e[i], t[i]);
      if (!s.valid)
        return {
          valid: !1,
          mergeErrorPath: [i, ...s.mergeErrorPath]
        };
      o[i] = s.data;
    }
    return { valid: !0, data: o };
  }
  if (Array.isArray(e) && Array.isArray(t)) {
    if (e.length !== t.length)
      return { valid: !1, mergeErrorPath: [] };
    const n = [];
    for (let r = 0; r < e.length; r++) {
      const o = e[r], i = t[r], s = ze(o, i);
      if (!s.valid)
        return {
          valid: !1,
          mergeErrorPath: [r, ...s.mergeErrorPath]
        };
      n.push(s.data);
    }
    return { valid: !0, data: n };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function Ce(e, t, n) {
  if (t.issues.length && e.issues.push(...t.issues), n.issues.length && e.issues.push(...n.issues), M(e))
    return e;
  const r = ze(t.value, n.value);
  if (!r.valid)
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(r.mergeErrorPath)}`);
  return e.value = r.data, e;
}
const wt = /* @__PURE__ */ a("$ZodTuple", (e, t) => {
  p.init(e, t);
  const n = t.items;
  e._zod.parse = (r, o) => {
    const i = r.value;
    if (!Array.isArray(i))
      return r.issues.push({
        input: i,
        inst: e,
        expected: "tuple",
        code: "invalid_type"
      }), r;
    r.value = [];
    const s = [], u = [...n].reverse().findIndex((f) => f._zod.optin !== "optional"), c = u === -1 ? 0 : n.length - u;
    if (!t.rest) {
      const f = i.length > n.length, d = i.length < c - 1;
      if (f || d)
        return r.issues.push({
          ...f ? { code: "too_big", maximum: n.length } : { code: "too_small", minimum: n.length },
          input: i,
          inst: e,
          origin: "array"
        }), r;
    }
    let l = -1;
    for (const f of n) {
      if (l++, l >= i.length && l >= c)
        continue;
      const d = f._zod.run({
        value: i[l],
        issues: []
      }, o);
      d instanceof Promise ? s.push(d.then((m) => Y(m, r, l))) : Y(d, r, l);
    }
    if (t.rest) {
      const f = i.slice(n.length);
      for (const d of f) {
        l++;
        const m = t.rest._zod.run({
          value: d,
          issues: []
        }, o);
        m instanceof Promise ? s.push(m.then((v) => Y(v, r, l))) : Y(m, r, l);
      }
    }
    return s.length ? Promise.all(s).then(() => r) : r;
  };
});
function Y(e, t, n) {
  e.issues.length && t.issues.push(...T(n, e.issues)), t.value[n] = e.value;
}
const to = /* @__PURE__ */ a("$ZodRecord", (e, t) => {
  p.init(e, t), e._zod.parse = (n, r) => {
    const o = n.value;
    if (!F(o))
      return n.issues.push({
        expected: "record",
        code: "invalid_type",
        input: o,
        inst: e
      }), n;
    const i = [], s = t.keyType._zod.values;
    if (s) {
      n.value = {};
      const u = /* @__PURE__ */ new Set();
      for (const l of s)
        if (typeof l == "string" || typeof l == "number" || typeof l == "symbol") {
          u.add(typeof l == "number" ? l.toString() : l);
          const f = t.valueType._zod.run({ value: o[l], issues: [] }, r);
          f instanceof Promise ? i.push(f.then((d) => {
            d.issues.length && n.issues.push(...T(l, d.issues)), n.value[l] = d.value;
          })) : (f.issues.length && n.issues.push(...T(l, f.issues)), n.value[l] = f.value);
        }
      let c;
      for (const l in o)
        u.has(l) || (c = c ?? [], c.push(l));
      c && c.length > 0 && n.issues.push({
        code: "unrecognized_keys",
        input: o,
        inst: e,
        keys: c
      });
    } else {
      n.value = {};
      for (const u of Reflect.ownKeys(o)) {
        if (u === "__proto__")
          continue;
        const c = t.keyType._zod.run({ value: u, issues: [] }, r);
        if (c instanceof Promise)
          throw new Error("Async schemas not supported in object keys currently");
        if (c.issues.length) {
          t.mode === "loose" ? n.value[u] = o[u] : n.issues.push({
            code: "invalid_key",
            origin: "record",
            issues: c.issues.map((f) => I(f, r, x())),
            input: u,
            path: [u],
            inst: e
          });
          continue;
        }
        const l = t.valueType._zod.run({ value: o[u], issues: [] }, r);
        l instanceof Promise ? i.push(l.then((f) => {
          f.issues.length && n.issues.push(...T(u, f.issues)), n.value[c.value] = f.value;
        })) : (l.issues.length && n.issues.push(...T(u, l.issues)), n.value[c.value] = l.value);
      }
    }
    return i.length ? Promise.all(i).then(() => n) : n;
  };
}), no = /* @__PURE__ */ a("$ZodMap", (e, t) => {
  p.init(e, t), e._zod.parse = (n, r) => {
    const o = n.value;
    if (!(o instanceof Map))
      return n.issues.push({
        expected: "map",
        code: "invalid_type",
        input: o,
        inst: e
      }), n;
    const i = [];
    n.value = /* @__PURE__ */ new Map();
    for (const [s, u] of o) {
      const c = t.keyType._zod.run({ value: s, issues: [] }, r), l = t.valueType._zod.run({ value: u, issues: [] }, r);
      c instanceof Promise || l instanceof Promise ? i.push(Promise.all([c, l]).then(([f, d]) => {
        Re(f, d, n, s, o, e, r);
      })) : Re(c, l, n, s, o, e, r);
    }
    return i.length ? Promise.all(i).then(() => n) : n;
  };
});
function Re(e, t, n, r, o, i, s) {
  e.issues.length && (ve.has(typeof r) ? n.issues.push(...T(r, e.issues)) : n.issues.push({
    code: "invalid_key",
    origin: "map",
    input: o,
    inst: i,
    issues: e.issues.map((u) => I(u, s, x()))
  })), t.issues.length && (ve.has(typeof r) ? n.issues.push(...T(r, t.issues)) : n.issues.push({
    origin: "map",
    code: "invalid_element",
    input: o,
    inst: i,
    key: r,
    issues: t.issues.map((u) => I(u, s, x()))
  })), n.value.set(e.value, t.value);
}
const ro = /* @__PURE__ */ a("$ZodSet", (e, t) => {
  p.init(e, t), e._zod.parse = (n, r) => {
    const o = n.value;
    if (!(o instanceof Set))
      return n.issues.push({
        input: o,
        inst: e,
        expected: "set",
        code: "invalid_type"
      }), n;
    const i = [];
    n.value = /* @__PURE__ */ new Set();
    for (const s of o) {
      const u = t.valueType._zod.run({ value: s, issues: [] }, r);
      u instanceof Promise ? i.push(u.then((c) => Me(c, n))) : Me(u, n);
    }
    return i.length ? Promise.all(i).then(() => n) : n;
  };
});
function Me(e, t) {
  e.issues.length && t.issues.push(...e.issues), t.value.add(e.value);
}
const oo = /* @__PURE__ */ a("$ZodEnum", (e, t) => {
  p.init(e, t);
  const n = it(t.entries), r = new Set(n);
  e._zod.values = r, e._zod.pattern = new RegExp(`^(${n.filter((o) => ve.has(typeof o)).map((o) => typeof o == "string" ? J(o) : o.toString()).join("|")})$`), e._zod.parse = (o, i) => {
    const s = o.value;
    return r.has(s) || o.issues.push({
      code: "invalid_value",
      values: n,
      input: s,
      inst: e
    }), o;
  };
}), io = /* @__PURE__ */ a("$ZodLiteral", (e, t) => {
  if (p.init(e, t), t.values.length === 0)
    throw new Error("Cannot create literal schema with no valid values");
  const n = new Set(t.values);
  e._zod.values = n, e._zod.pattern = new RegExp(`^(${t.values.map((r) => typeof r == "string" ? J(r) : r ? J(r.toString()) : String(r)).join("|")})$`), e._zod.parse = (r, o) => {
    const i = r.value;
    return n.has(i) || r.issues.push({
      code: "invalid_value",
      values: t.values,
      input: i,
      inst: e
    }), r;
  };
}), so = /* @__PURE__ */ a("$ZodTransform", (e, t) => {
  p.init(e, t), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      throw new rt(e.constructor.name);
    const o = t.transform(n.value, n);
    if (r.async)
      return (o instanceof Promise ? o : Promise.resolve(o)).then((s) => (n.value = s, n));
    if (o instanceof Promise)
      throw new U();
    return n.value = o, n;
  };
});
function Ue(e, t) {
  return e.issues.length && t === void 0 ? { issues: [], value: void 0 } : e;
}
const uo = /* @__PURE__ */ a("$ZodOptional", (e, t) => {
  p.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", g(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, void 0]) : void 0), g(e._zod, "pattern", () => {
    const n = t.innerType._zod.pattern;
    return n ? new RegExp(`^(${ke(n.source)})?$`) : void 0;
  }), e._zod.parse = (n, r) => {
    if (t.innerType._zod.optin === "optional") {
      const o = t.innerType._zod.run(n, r);
      return o instanceof Promise ? o.then((i) => Ue(i, n.value)) : Ue(o, n.value);
    }
    return n.value === void 0 ? n : t.innerType._zod.run(n, r);
  };
}), co = /* @__PURE__ */ a("$ZodNullable", (e, t) => {
  p.init(e, t), g(e._zod, "optin", () => t.innerType._zod.optin), g(e._zod, "optout", () => t.innerType._zod.optout), g(e._zod, "pattern", () => {
    const n = t.innerType._zod.pattern;
    return n ? new RegExp(`^(${ke(n.source)}|null)$`) : void 0;
  }), g(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, null]) : void 0), e._zod.parse = (n, r) => n.value === null ? n : t.innerType._zod.run(n, r);
}), ao = /* @__PURE__ */ a("$ZodDefault", (e, t) => {
  p.init(e, t), e._zod.optin = "optional", g(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      return t.innerType._zod.run(n, r);
    if (n.value === void 0)
      return n.value = t.defaultValue, n;
    const o = t.innerType._zod.run(n, r);
    return o instanceof Promise ? o.then((i) => Fe(i, t)) : Fe(o, t);
  };
});
function Fe(e, t) {
  return e.value === void 0 && (e.value = t.defaultValue), e;
}
const lo = /* @__PURE__ */ a("$ZodPrefault", (e, t) => {
  p.init(e, t), e._zod.optin = "optional", g(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (n, r) => (r.direction === "backward" || n.value === void 0 && (n.value = t.defaultValue), t.innerType._zod.run(n, r));
}), fo = /* @__PURE__ */ a("$ZodNonOptional", (e, t) => {
  p.init(e, t), g(e._zod, "values", () => {
    const n = t.innerType._zod.values;
    return n ? new Set([...n].filter((r) => r !== void 0)) : void 0;
  }), e._zod.parse = (n, r) => {
    const o = t.innerType._zod.run(n, r);
    return o instanceof Promise ? o.then((i) => Je(i, e)) : Je(o, e);
  };
});
function Je(e, t) {
  return !e.issues.length && e.value === void 0 && e.issues.push({
    code: "invalid_type",
    expected: "nonoptional",
    input: e.value,
    inst: t
  }), e;
}
const ho = /* @__PURE__ */ a("$ZodCatch", (e, t) => {
  p.init(e, t), g(e._zod, "optin", () => t.innerType._zod.optin), g(e._zod, "optout", () => t.innerType._zod.optout), g(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      return t.innerType._zod.run(n, r);
    const o = t.innerType._zod.run(n, r);
    return o instanceof Promise ? o.then((i) => (n.value = i.value, i.issues.length && (n.value = t.catchValue({
      ...n,
      error: {
        issues: i.issues.map((s) => I(s, r, x()))
      },
      input: n.value
    }), n.issues = []), n)) : (n.value = o.value, o.issues.length && (n.value = t.catchValue({
      ...n,
      error: {
        issues: o.issues.map((i) => I(i, r, x()))
      },
      input: n.value
    }), n.issues = []), n);
  };
}), mo = /* @__PURE__ */ a("$ZodNaN", (e, t) => {
  p.init(e, t), e._zod.parse = (n, r) => ((typeof n.value != "number" || !Number.isNaN(n.value)) && n.issues.push({
    input: n.value,
    inst: e,
    expected: "nan",
    code: "invalid_type"
  }), n);
}), po = /* @__PURE__ */ a("$ZodPipe", (e, t) => {
  p.init(e, t), g(e._zod, "values", () => t.in._zod.values), g(e._zod, "optin", () => t.in._zod.optin), g(e._zod, "optout", () => t.out._zod.optout), g(e._zod, "propValues", () => t.in._zod.propValues), e._zod.parse = (n, r) => {
    if (r.direction === "backward") {
      const i = t.out._zod.run(n, r);
      return i instanceof Promise ? i.then((s) => Q(s, t.in, r)) : Q(i, t.in, r);
    }
    const o = t.in._zod.run(n, r);
    return o instanceof Promise ? o.then((i) => Q(i, t.out, r)) : Q(o, t.out, r);
  };
});
function Q(e, t, n) {
  return e.issues.length ? (e.aborted = !0, e) : t._zod.run({ value: e.value, issues: e.issues }, n);
}
const _o = /* @__PURE__ */ a("$ZodReadonly", (e, t) => {
  p.init(e, t), g(e._zod, "propValues", () => t.innerType._zod.propValues), g(e._zod, "values", () => t.innerType._zod.values), g(e._zod, "optin", () => t.innerType?._zod?.optin), g(e._zod, "optout", () => t.innerType?._zod?.optout), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      return t.innerType._zod.run(n, r);
    const o = t.innerType._zod.run(n, r);
    return o instanceof Promise ? o.then(Ge) : Ge(o);
  };
});
function Ge(e) {
  return e.value = Object.freeze(e.value), e;
}
const go = /* @__PURE__ */ a("$ZodFunction", (e, t) => (p.init(e, t), e._def = t, e._zod.def = t, e.implement = (n) => {
  if (typeof n != "function")
    throw new Error("implement() must be called with a function");
  return function(...r) {
    const o = e._def.input ? Te(e._def.input, r) : r, i = Reflect.apply(n, this, o);
    return e._def.output ? Te(e._def.output, i) : i;
  };
}, e.implementAsync = (n) => {
  if (typeof n != "function")
    throw new Error("implementAsync() must be called with a function");
  return async function(...r) {
    const o = e._def.input ? await Pe(e._def.input, r) : r, i = await Reflect.apply(n, this, o);
    return e._def.output ? await Pe(e._def.output, i) : i;
  };
}, e._zod.parse = (n, r) => typeof n.value != "function" ? (n.issues.push({
  code: "invalid_type",
  expected: "function",
  input: n.value,
  inst: e
}), n) : (e._def.output && e._def.output._zod.def.type === "promise" ? n.value = e.implementAsync(n.value) : n.value = e.implement(n.value), n), e.input = (...n) => {
  const r = e.constructor;
  return Array.isArray(n[0]) ? new r({
    type: "function",
    input: new wt({
      type: "tuple",
      items: n[0],
      rest: n[1]
    }),
    output: e._def.output
  }) : new r({
    type: "function",
    input: n[0],
    output: e._def.output
  });
}, e.output = (n) => {
  const r = e.constructor;
  return new r({
    type: "function",
    input: e._def.input,
    output: n
  });
}, e)), vo = /* @__PURE__ */ a("$ZodPromise", (e, t) => {
  p.init(e, t), e._zod.parse = (n, r) => Promise.resolve(n.value).then((o) => t.innerType._zod.run({ value: o, issues: [] }, r));
}), zo = /* @__PURE__ */ a("$ZodLazy", (e, t) => {
  p.init(e, t), g(e._zod, "innerType", () => t.getter()), g(e._zod, "pattern", () => e._zod.innerType?._zod?.pattern), g(e._zod, "propValues", () => e._zod.innerType?._zod?.propValues), g(e._zod, "optin", () => e._zod.innerType?._zod?.optin ?? void 0), g(e._zod, "optout", () => e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (n, r) => e._zod.innerType._zod.run(n, r);
}), bo = /* @__PURE__ */ a("$ZodCustom", (e, t) => {
  k.init(e, t), p.init(e, t), e._zod.parse = (n, r) => n, e._zod.check = (n) => {
    const r = n.value, o = t.fn(r);
    if (o instanceof Promise)
      return o.then((i) => Le(i, n, r, e));
    Le(o, n, r, e);
  };
});
function Le(e, t, n, r) {
  if (!e) {
    const o = {
      code: "custom",
      input: n,
      inst: r,
      // incorporates params.error into issue reporting
      path: [...r._zod.def.path ?? []],
      // incorporates params.error into issue reporting
      continue: !r._zod.def.abort
      // params: inst._zod.def.params,
    };
    r._zod.def.params && (o.params = r._zod.def.params), t.issues.push(q(o));
  }
}
var Ve;
class wo {
  constructor() {
    this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
  }
  add(t, ...n) {
    const r = n[0];
    if (this._map.set(t, r), r && typeof r == "object" && "id" in r) {
      if (this._idmap.has(r.id))
        throw new Error(`ID ${r.id} already exists in the registry`);
      this._idmap.set(r.id, t);
    }
    return this;
  }
  clear() {
    return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
  }
  remove(t) {
    const n = this._map.get(t);
    return n && typeof n == "object" && "id" in n && this._idmap.delete(n.id), this._map.delete(t), this;
  }
  get(t) {
    const n = t._zod.parent;
    if (n) {
      const r = { ...this.get(n) ?? {} };
      delete r.id;
      const o = { ...r, ...this._map.get(t) };
      return Object.keys(o).length ? o : void 0;
    }
    return this._map.get(t);
  }
  has(t) {
    return this._map.has(t);
  }
}
function ko() {
  return new wo();
}
(Ve = globalThis).__zod_globalRegistry ?? (Ve.__zod_globalRegistry = ko());
const B = globalThis.__zod_globalRegistry;
function yo(e, t) {
  return new e({
    type: "string",
    format: "email",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
function Be(e, t) {
  return new e({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
function So(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
function Zo(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v4",
    ...h(t)
  });
}
function $o(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v6",
    ...h(t)
  });
}
function No(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v7",
    ...h(t)
  });
}
function xo(e, t) {
  return new e({
    type: "string",
    format: "url",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
function Io(e, t) {
  return new e({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
function Eo(e, t) {
  return new e({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
function Oo(e, t) {
  return new e({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
function To(e, t) {
  return new e({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
function Po(e, t) {
  return new e({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
function Ao(e, t) {
  return new e({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
function jo(e, t) {
  return new e({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
function Do(e, t) {
  return new e({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
function Co(e, t) {
  return new e({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
function Ro(e, t) {
  return new e({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
function Mo(e, t) {
  return new e({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
function Uo(e, t) {
  return new e({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
function Fo(e, t) {
  return new e({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
function Jo(e, t) {
  return new e({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
function Go(e, t) {
  return new e({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
function Lo(e, t) {
  return new e({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: !1,
    local: !1,
    precision: null,
    ...h(t)
  });
}
function Vo(e, t) {
  return new e({
    type: "string",
    format: "date",
    check: "string_format",
    ...h(t)
  });
}
function Bo(e, t) {
  return new e({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...h(t)
  });
}
function Wo(e, t) {
  return new e({
    type: "string",
    format: "duration",
    check: "string_format",
    ...h(t)
  });
}
function Ko(e, t) {
  return new e({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "safeint",
    ...h(t)
  });
}
function qo(e) {
  return new e({
    type: "any"
  });
}
function Xo(e) {
  return new e({
    type: "unknown"
  });
}
function Ho(e, t) {
  return new e({
    type: "never",
    ...h(t)
  });
}
function ne(e, t) {
  return new mt({
    check: "less_than",
    ...h(t),
    value: e,
    inclusive: !1
  });
}
function j(e, t) {
  return new mt({
    check: "less_than",
    ...h(t),
    value: e,
    inclusive: !0
  });
}
function re(e, t) {
  return new pt({
    check: "greater_than",
    ...h(t),
    value: e,
    inclusive: !1
  });
}
function O(e, t) {
  return new pt({
    check: "greater_than",
    ...h(t),
    value: e,
    inclusive: !0
  });
}
function be(e, t) {
  return new Hn({
    check: "multiple_of",
    ...h(t),
    value: e
  });
}
function Yo(e, t) {
  return new Qn({
    check: "max_size",
    ...h(t),
    maximum: e
  });
}
function We(e, t) {
  return new er({
    check: "min_size",
    ...h(t),
    minimum: e
  });
}
function Qo(e, t) {
  return new tr({
    check: "size_equals",
    ...h(t),
    size: e
  });
}
function kt(e, t) {
  return new nr({
    check: "max_length",
    ...h(t),
    maximum: e
  });
}
function oe(e, t) {
  return new rr({
    check: "min_length",
    ...h(t),
    minimum: e
  });
}
function yt(e, t) {
  return new or({
    check: "length_equals",
    ...h(t),
    length: e
  });
}
function ei(e, t) {
  return new ir({
    check: "string_format",
    format: "regex",
    ...h(t),
    pattern: e
  });
}
function ti(e) {
  return new sr({
    check: "string_format",
    format: "lowercase",
    ...h(e)
  });
}
function ni(e) {
  return new ur({
    check: "string_format",
    format: "uppercase",
    ...h(e)
  });
}
function ri(e, t) {
  return new cr({
    check: "string_format",
    format: "includes",
    ...h(t),
    includes: e
  });
}
function oi(e, t) {
  return new ar({
    check: "string_format",
    format: "starts_with",
    ...h(t),
    prefix: e
  });
}
function ii(e, t) {
  return new lr({
    check: "string_format",
    format: "ends_with",
    ...h(t),
    suffix: e
  });
}
function L(e) {
  return new fr({
    check: "overwrite",
    tx: e
  });
}
function si(e) {
  return L((t) => t.normalize(e));
}
function ui() {
  return L((e) => e.trim());
}
function ci() {
  return L((e) => e.toLowerCase());
}
function ai() {
  return L((e) => e.toUpperCase());
}
function li() {
  return L((e) => Yt(e));
}
function fi(e, t, n) {
  return new e({
    type: "array",
    element: t,
    // get element() {
    //   return element;
    // },
    ...h(n)
  });
}
function di(e, t, n) {
  return new e({
    type: "custom",
    check: "custom",
    fn: t,
    ...h(n)
  });
}
function hi(e) {
  const t = mi((n) => (n.addIssue = (r) => {
    if (typeof r == "string")
      n.issues.push(q(r, n.value, t._zod.def));
    else {
      const o = r;
      o.fatal && (o.continue = !1), o.code ?? (o.code = "custom"), o.input ?? (o.input = n.value), o.inst ?? (o.inst = t), o.continue ?? (o.continue = !t._zod.def.abort), n.issues.push(q(o));
    }
  }, e(n.value, n)));
  return t;
}
function mi(e, t) {
  const n = new k({
    check: "custom",
    ...h(t)
  });
  return n._zod.check = e, n;
}
function St(e) {
  let t = e?.target ?? "draft-2020-12";
  return t === "draft-4" && (t = "draft-04"), t === "draft-7" && (t = "draft-07"), {
    processors: e.processors ?? {},
    metadataRegistry: e?.metadata ?? B,
    target: t,
    unrepresentable: e?.unrepresentable ?? "throw",
    override: e?.override ?? (() => {
    }),
    io: e?.io ?? "output",
    counter: 0,
    seen: /* @__PURE__ */ new Map(),
    cycles: e?.cycles ?? "ref",
    reused: e?.reused ?? "inline",
    external: e?.external ?? void 0
  };
}
function b(e, t, n = { path: [], schemaPath: [] }) {
  var r;
  const o = e._zod.def, i = t.seen.get(e);
  if (i)
    return i.count++, n.schemaPath.includes(e) && (i.cycle = n.path), i.schema;
  const s = { schema: {}, count: 1, cycle: void 0, path: n.path };
  t.seen.set(e, s);
  const u = e._zod.toJSONSchema?.();
  if (u)
    s.schema = u;
  else {
    const f = {
      ...n,
      schemaPath: [...n.schemaPath, e],
      path: n.path
    }, d = e._zod.parent;
    if (d)
      s.ref = d, b(d, t, f), t.seen.get(d).isParent = !0;
    else if (e._zod.processJSONSchema)
      e._zod.processJSONSchema(t, s.schema, f);
    else {
      const m = s.schema, v = t.processors[o.type];
      if (!v)
        throw new Error(`[toJSONSchema]: Non-representable type encountered: ${o.type}`);
      v(e, t, m, f);
    }
  }
  const c = t.metadataRegistry.get(e);
  return c && Object.assign(s.schema, c), t.io === "input" && y(e) && (delete s.schema.examples, delete s.schema.default), t.io === "input" && s.schema._prefault && ((r = s.schema).default ?? (r.default = s.schema._prefault)), delete s.schema._prefault, t.seen.get(e).schema;
}
function Zt(e, t) {
  const n = e.seen.get(t);
  if (!n)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const r = (i) => {
    const s = e.target === "draft-2020-12" ? "$defs" : "definitions";
    if (e.external) {
      const f = e.external.registry.get(i[0])?.id, d = e.external.uri ?? ((v) => v);
      if (f)
        return { ref: d(f) };
      const m = i[1].defId ?? i[1].schema.id ?? `schema${e.counter++}`;
      return i[1].defId = m, { defId: m, ref: `${d("__shared")}#/${s}/${m}` };
    }
    if (i[1] === n)
      return { ref: "#" };
    const c = `#/${s}/`, l = i[1].schema.id ?? `__schema${e.counter++}`;
    return { defId: l, ref: c + l };
  }, o = (i) => {
    if (i[1].schema.$ref)
      return;
    const s = i[1], { ref: u, defId: c } = r(i);
    s.def = { ...s.schema }, c && (s.defId = c);
    const l = s.schema;
    for (const f in l)
      delete l[f];
    l.$ref = u;
  };
  if (e.cycles === "throw")
    for (const i of e.seen.entries()) {
      const s = i[1];
      if (s.cycle)
        throw new Error(`Cycle detected: #/${s.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
    }
  for (const i of e.seen.entries()) {
    const s = i[1];
    if (t === i[0]) {
      o(i);
      continue;
    }
    if (e.external) {
      const c = e.external.registry.get(i[0])?.id;
      if (t !== i[0] && c) {
        o(i);
        continue;
      }
    }
    if (e.metadataRegistry.get(i[0])?.id) {
      o(i);
      continue;
    }
    if (s.cycle) {
      o(i);
      continue;
    }
    if (s.count > 1 && e.reused === "ref") {
      o(i);
      continue;
    }
  }
}
function $t(e, t) {
  const n = e.seen.get(t);
  if (!n)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const r = (s) => {
    const u = e.seen.get(s), c = u.def ?? u.schema, l = { ...c };
    if (u.ref === null)
      return;
    const f = u.ref;
    if (u.ref = null, f) {
      r(f);
      const d = e.seen.get(f).schema;
      d.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0") ? (c.allOf = c.allOf ?? [], c.allOf.push(d)) : (Object.assign(c, d), Object.assign(c, l));
    }
    u.isParent || e.override({
      zodSchema: s,
      jsonSchema: c,
      path: u.path ?? []
    });
  };
  for (const s of [...e.seen.entries()].reverse())
    r(s[0]);
  const o = {};
  if (e.target === "draft-2020-12" ? o.$schema = "https://json-schema.org/draft/2020-12/schema" : e.target === "draft-07" ? o.$schema = "http://json-schema.org/draft-07/schema#" : e.target === "draft-04" ? o.$schema = "http://json-schema.org/draft-04/schema#" : e.target, e.external?.uri) {
    const s = e.external.registry.get(t)?.id;
    if (!s)
      throw new Error("Schema is missing an `id` property");
    o.$id = e.external.uri(s);
  }
  Object.assign(o, n.def ?? n.schema);
  const i = e.external?.defs ?? {};
  for (const s of e.seen.entries()) {
    const u = s[1];
    u.def && u.defId && (i[u.defId] = u.def);
  }
  e.external || Object.keys(i).length > 0 && (e.target === "draft-2020-12" ? o.$defs = i : o.definitions = i);
  try {
    const s = JSON.parse(JSON.stringify(o));
    return Object.defineProperty(s, "~standard", {
      value: {
        ...t["~standard"],
        jsonSchema: {
          input: ie(t, "input"),
          output: ie(t, "output")
        }
      },
      enumerable: !1,
      writable: !1
    }), s;
  } catch {
    throw new Error("Error converting schema to JSON.");
  }
}
function y(e, t) {
  const n = t ?? { seen: /* @__PURE__ */ new Set() };
  if (n.seen.has(e))
    return !1;
  n.seen.add(e);
  const r = e._zod.def;
  if (r.type === "transform")
    return !0;
  if (r.type === "array")
    return y(r.element, n);
  if (r.type === "set")
    return y(r.valueType, n);
  if (r.type === "lazy")
    return y(r.getter(), n);
  if (r.type === "promise" || r.type === "optional" || r.type === "nonoptional" || r.type === "nullable" || r.type === "readonly" || r.type === "default" || r.type === "prefault")
    return y(r.innerType, n);
  if (r.type === "intersection")
    return y(r.left, n) || y(r.right, n);
  if (r.type === "record" || r.type === "map")
    return y(r.keyType, n) || y(r.valueType, n);
  if (r.type === "pipe")
    return y(r.in, n) || y(r.out, n);
  if (r.type === "object") {
    for (const o in r.shape)
      if (y(r.shape[o], n))
        return !0;
    return !1;
  }
  if (r.type === "union") {
    for (const o of r.options)
      if (y(o, n))
        return !0;
    return !1;
  }
  if (r.type === "tuple") {
    for (const o of r.items)
      if (y(o, n))
        return !0;
    return !!(r.rest && y(r.rest, n));
  }
  return !1;
}
const pi = (e, t = {}) => (n) => {
  const r = St({ ...n, processors: t });
  return b(e, r), Zt(r, e), $t(r, e);
}, ie = (e, t) => (n) => {
  const { libraryOptions: r, target: o } = n ?? {}, i = St({ ...r ?? {}, target: o, io: t, processors: {} });
  return b(e, i), Zt(i, e), $t(i, e);
}, _i = {
  guid: "uuid",
  url: "uri",
  datetime: "date-time",
  json_string: "json-string",
  regex: ""
  // do not set
}, gi = (e, t, n, r) => {
  const o = n;
  o.type = "string";
  const { minimum: i, maximum: s, format: u, patterns: c, contentEncoding: l } = e._zod.bag;
  if (typeof i == "number" && (o.minLength = i), typeof s == "number" && (o.maxLength = s), u && (o.format = _i[u] ?? u, o.format === "" && delete o.format), l && (o.contentEncoding = l), c && c.size > 0) {
    const f = [...c];
    f.length === 1 ? o.pattern = f[0].source : f.length > 1 && (o.allOf = [
      ...f.map((d) => ({
        ...t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0" ? { type: "string" } : {},
        pattern: d.source
      }))
    ]);
  }
}, vi = (e, t, n, r) => {
  const o = n, { minimum: i, maximum: s, format: u, multipleOf: c, exclusiveMaximum: l, exclusiveMinimum: f } = e._zod.bag;
  typeof u == "string" && u.includes("int") ? o.type = "integer" : o.type = "number", typeof f == "number" && (t.target === "draft-04" || t.target === "openapi-3.0" ? (o.minimum = f, o.exclusiveMinimum = !0) : o.exclusiveMinimum = f), typeof i == "number" && (o.minimum = i, typeof f == "number" && t.target !== "draft-04" && (f >= i ? delete o.minimum : delete o.exclusiveMinimum)), typeof l == "number" && (t.target === "draft-04" || t.target === "openapi-3.0" ? (o.maximum = l, o.exclusiveMaximum = !0) : o.exclusiveMaximum = l), typeof s == "number" && (o.maximum = s, typeof l == "number" && t.target !== "draft-04" && (l <= s ? delete o.maximum : delete o.exclusiveMaximum)), typeof c == "number" && (o.multipleOf = c);
}, zi = (e, t, n, r) => {
  n.type = "boolean";
}, bi = (e, t, n, r) => {
  if (t.unrepresentable === "throw")
    throw new Error("BigInt cannot be represented in JSON Schema");
}, wi = (e, t, n, r) => {
  if (t.unrepresentable === "throw")
    throw new Error("Symbols cannot be represented in JSON Schema");
}, ki = (e, t, n, r) => {
  t.target === "openapi-3.0" ? (n.type = "string", n.nullable = !0, n.enum = [null]) : n.type = "null";
}, yi = (e, t, n, r) => {
  if (t.unrepresentable === "throw")
    throw new Error("Undefined cannot be represented in JSON Schema");
}, Si = (e, t, n, r) => {
  if (t.unrepresentable === "throw")
    throw new Error("Void cannot be represented in JSON Schema");
}, Zi = (e, t, n, r) => {
  n.not = {};
}, $i = (e, t, n, r) => {
}, Ni = (e, t, n, r) => {
}, xi = (e, t, n, r) => {
  if (t.unrepresentable === "throw")
    throw new Error("Date cannot be represented in JSON Schema");
}, Ii = (e, t, n, r) => {
  const o = e._zod.def, i = it(o.entries);
  i.every((s) => typeof s == "number") && (n.type = "number"), i.every((s) => typeof s == "string") && (n.type = "string"), n.enum = i;
}, Ei = (e, t, n, r) => {
  const o = e._zod.def, i = [];
  for (const s of o.values)
    if (s === void 0) {
      if (t.unrepresentable === "throw")
        throw new Error("Literal `undefined` cannot be represented in JSON Schema");
    } else if (typeof s == "bigint") {
      if (t.unrepresentable === "throw")
        throw new Error("BigInt literals cannot be represented in JSON Schema");
      i.push(Number(s));
    } else
      i.push(s);
  if (i.length !== 0) if (i.length === 1) {
    const s = i[0];
    n.type = s === null ? "null" : typeof s, t.target === "draft-04" || t.target === "openapi-3.0" ? n.enum = [s] : n.const = s;
  } else
    i.every((s) => typeof s == "number") && (n.type = "number"), i.every((s) => typeof s == "string") && (n.type = "string"), i.every((s) => typeof s == "boolean") && (n.type = "boolean"), i.every((s) => s === null) && (n.type = "null"), n.enum = i;
}, Oi = (e, t, n, r) => {
  if (t.unrepresentable === "throw")
    throw new Error("NaN cannot be represented in JSON Schema");
}, Ti = (e, t, n, r) => {
  if (t.unrepresentable === "throw")
    throw new Error("Custom types cannot be represented in JSON Schema");
}, Pi = (e, t, n, r) => {
  if (t.unrepresentable === "throw")
    throw new Error("Function types cannot be represented in JSON Schema");
}, Ai = (e, t, n, r) => {
  if (t.unrepresentable === "throw")
    throw new Error("Transforms cannot be represented in JSON Schema");
}, ji = (e, t, n, r) => {
  if (t.unrepresentable === "throw")
    throw new Error("Map cannot be represented in JSON Schema");
}, Di = (e, t, n, r) => {
  if (t.unrepresentable === "throw")
    throw new Error("Set cannot be represented in JSON Schema");
}, Ci = (e, t, n, r) => {
  const o = n, i = e._zod.def, { minimum: s, maximum: u } = e._zod.bag;
  typeof s == "number" && (o.minItems = s), typeof u == "number" && (o.maxItems = u), o.type = "array", o.items = b(i.element, t, { ...r, path: [...r.path, "items"] });
}, Ri = (e, t, n, r) => {
  const o = n, i = e._zod.def;
  o.type = "object", o.properties = {};
  const s = i.shape;
  for (const l in s)
    o.properties[l] = b(s[l], t, {
      ...r,
      path: [...r.path, "properties", l]
    });
  const u = new Set(Object.keys(s)), c = new Set([...u].filter((l) => {
    const f = i.shape[l]._zod;
    return t.io === "input" ? f.optin === void 0 : f.optout === void 0;
  }));
  c.size > 0 && (o.required = Array.from(c)), i.catchall?._zod.def.type === "never" ? o.additionalProperties = !1 : i.catchall ? i.catchall && (o.additionalProperties = b(i.catchall, t, {
    ...r,
    path: [...r.path, "additionalProperties"]
  })) : t.io === "output" && (o.additionalProperties = !1);
}, Mi = (e, t, n, r) => {
  const o = e._zod.def, i = o.inclusive === !1, s = o.options.map((u, c) => b(u, t, {
    ...r,
    path: [...r.path, i ? "oneOf" : "anyOf", c]
  }));
  i ? n.oneOf = s : n.anyOf = s;
}, Ui = (e, t, n, r) => {
  const o = e._zod.def, i = b(o.left, t, {
    ...r,
    path: [...r.path, "allOf", 0]
  }), s = b(o.right, t, {
    ...r,
    path: [...r.path, "allOf", 1]
  }), u = (l) => "allOf" in l && Object.keys(l).length === 1, c = [
    ...u(i) ? i.allOf : [i],
    ...u(s) ? s.allOf : [s]
  ];
  n.allOf = c;
}, Fi = (e, t, n, r) => {
  const o = n, i = e._zod.def;
  o.type = "array";
  const s = t.target === "draft-2020-12" ? "prefixItems" : "items", u = t.target === "draft-2020-12" || t.target === "openapi-3.0" ? "items" : "additionalItems", c = i.items.map((m, v) => b(m, t, {
    ...r,
    path: [...r.path, s, v]
  })), l = i.rest ? b(i.rest, t, {
    ...r,
    path: [...r.path, u, ...t.target === "openapi-3.0" ? [i.items.length] : []]
  }) : null;
  t.target === "draft-2020-12" ? (o.prefixItems = c, l && (o.items = l)) : t.target === "openapi-3.0" ? (o.items = {
    anyOf: c
  }, l && o.items.anyOf.push(l), o.minItems = c.length, l || (o.maxItems = c.length)) : (o.items = c, l && (o.additionalItems = l));
  const { minimum: f, maximum: d } = e._zod.bag;
  typeof f == "number" && (o.minItems = f), typeof d == "number" && (o.maxItems = d);
}, Ji = (e, t, n, r) => {
  const o = n, i = e._zod.def;
  o.type = "object", (t.target === "draft-07" || t.target === "draft-2020-12") && (o.propertyNames = b(i.keyType, t, {
    ...r,
    path: [...r.path, "propertyNames"]
  })), o.additionalProperties = b(i.valueType, t, {
    ...r,
    path: [...r.path, "additionalProperties"]
  });
}, Gi = (e, t, n, r) => {
  const o = e._zod.def, i = b(o.innerType, t, r), s = t.seen.get(e);
  t.target === "openapi-3.0" ? (s.ref = o.innerType, n.nullable = !0) : n.anyOf = [i, { type: "null" }];
}, Li = (e, t, n, r) => {
  const o = e._zod.def;
  b(o.innerType, t, r);
  const i = t.seen.get(e);
  i.ref = o.innerType;
}, Vi = (e, t, n, r) => {
  const o = e._zod.def;
  b(o.innerType, t, r);
  const i = t.seen.get(e);
  i.ref = o.innerType, n.default = JSON.parse(JSON.stringify(o.defaultValue));
}, Bi = (e, t, n, r) => {
  const o = e._zod.def;
  b(o.innerType, t, r);
  const i = t.seen.get(e);
  i.ref = o.innerType, t.io === "input" && (n._prefault = JSON.parse(JSON.stringify(o.defaultValue)));
}, Wi = (e, t, n, r) => {
  const o = e._zod.def;
  b(o.innerType, t, r);
  const i = t.seen.get(e);
  i.ref = o.innerType;
  let s;
  try {
    s = o.catchValue(void 0);
  } catch {
    throw new Error("Dynamic catch values are not supported in JSON Schema");
  }
  n.default = s;
}, Ki = (e, t, n, r) => {
  const o = e._zod.def, i = t.io === "input" ? o.in._zod.def.type === "transform" ? o.out : o.in : o.out;
  b(i, t, r);
  const s = t.seen.get(e);
  s.ref = i;
}, qi = (e, t, n, r) => {
  const o = e._zod.def;
  b(o.innerType, t, r);
  const i = t.seen.get(e);
  i.ref = o.innerType, n.readOnly = !0;
}, Xi = (e, t, n, r) => {
  const o = e._zod.def;
  b(o.innerType, t, r);
  const i = t.seen.get(e);
  i.ref = o.innerType;
}, Hi = (e, t, n, r) => {
  const o = e._zod.def;
  b(o.innerType, t, r);
  const i = t.seen.get(e);
  i.ref = o.innerType;
}, Yi = (e, t, n, r) => {
  const o = e._zod.innerType;
  b(o, t, r);
  const i = t.seen.get(e);
  i.ref = o;
}, Qi = /* @__PURE__ */ a("ZodISODateTime", (e, t) => {
  Zr.init(e, t), w.init(e, t);
});
function es(e) {
  return Lo(Qi, e);
}
const ts = /* @__PURE__ */ a("ZodISODate", (e, t) => {
  $r.init(e, t), w.init(e, t);
});
function ns(e) {
  return Vo(ts, e);
}
const rs = /* @__PURE__ */ a("ZodISOTime", (e, t) => {
  Nr.init(e, t), w.init(e, t);
});
function os(e) {
  return Bo(rs, e);
}
const is = /* @__PURE__ */ a("ZodISODuration", (e, t) => {
  xr.init(e, t), w.init(e, t);
});
function ss(e) {
  return Wo(is, e);
}
const us = (e, t) => {
  at.init(e, t), e.name = "ZodError", Object.defineProperties(e, {
    format: {
      value: (n) => fn(e, n)
      // enumerable: false,
    },
    flatten: {
      value: (n) => ln(e, n)
      // enumerable: false,
    },
    addIssue: {
      value: (n) => {
        e.issues.push(n), e.message = JSON.stringify(e.issues, ge, 2);
      }
      // enumerable: false,
    },
    addIssues: {
      value: (n) => {
        e.issues.push(...n), e.message = JSON.stringify(e.issues, ge, 2);
      }
      // enumerable: false,
    },
    isEmpty: {
      get() {
        return e.issues.length === 0;
      }
      // enumerable: false,
    }
  });
}, Z = a("ZodError", us, {
  Parent: Error
}), cs = /* @__PURE__ */ ae(Z), as = /* @__PURE__ */ le(Z), ls = /* @__PURE__ */ fe(Z), fs = /* @__PURE__ */ de(Z), ds = /* @__PURE__ */ mn(Z), hs = /* @__PURE__ */ pn(Z), ms = /* @__PURE__ */ _n(Z), ps = /* @__PURE__ */ gn(Z), _s = /* @__PURE__ */ vn(Z), gs = /* @__PURE__ */ zn(Z), vs = /* @__PURE__ */ bn(Z), zs = /* @__PURE__ */ wn(Z), _ = /* @__PURE__ */ a("ZodType", (e, t) => (p.init(e, t), Object.assign(e["~standard"], {
  jsonSchema: {
    input: ie(e, "input"),
    output: ie(e, "output")
  }
}), e.toJSONSchema = pi(e, {}), e.def = t, e.type = t.type, Object.defineProperty(e, "_def", { value: t }), e.check = (...n) => e.clone(C(t, {
  checks: [
    ...t.checks ?? [],
    ...n.map((r) => typeof r == "function" ? { _zod: { check: r, def: { check: "custom" }, onattach: [] } } : r)
  ]
})), e.clone = (n, r) => P(e, n, r), e.brand = () => e, e.register = (n, r) => (n.add(e, r), e), e.parse = (n, r) => cs(e, n, r, { callee: e.parse }), e.safeParse = (n, r) => ls(e, n, r), e.parseAsync = async (n, r) => as(e, n, r, { callee: e.parseAsync }), e.safeParseAsync = async (n, r) => fs(e, n, r), e.spa = e.safeParseAsync, e.encode = (n, r) => ds(e, n, r), e.decode = (n, r) => hs(e, n, r), e.encodeAsync = async (n, r) => ms(e, n, r), e.decodeAsync = async (n, r) => ps(e, n, r), e.safeEncode = (n, r) => _s(e, n, r), e.safeDecode = (n, r) => gs(e, n, r), e.safeEncodeAsync = async (n, r) => vs(e, n, r), e.safeDecodeAsync = async (n, r) => zs(e, n, r), e.refine = (n, r) => e.check(gu(n, r)), e.superRefine = (n) => e.check(vu(n)), e.overwrite = (n) => e.check(L(n)), e.optional = () => He(e), e.nullable = () => Ye(e), e.nullish = () => He(Ye(e)), e.nonoptional = (n) => cu(e, n), e.array = () => Bs(e), e.or = (n) => Ks([e, n]), e.and = (n) => Xs(e, n), e.transform = (n) => Qe(e, ou(n)), e.default = (n) => iu(e, n), e.prefault = (n) => uu(e, n), e.catch = (n) => lu(e, n), e.pipe = (n) => Qe(e, n), e.readonly = () => hu(e), e.describe = (n) => {
  const r = e.clone();
  return B.add(r, { description: n }), r;
}, Object.defineProperty(e, "description", {
  get() {
    return B.get(e)?.description;
  },
  configurable: !0
}), e.meta = (...n) => {
  if (n.length === 0)
    return B.get(e);
  const r = e.clone();
  return B.add(r, n[0]), r;
}, e.isOptional = () => e.safeParse(void 0).success, e.isNullable = () => e.safeParse(null).success, e)), Nt = /* @__PURE__ */ a("_ZodString", (e, t) => {
  Ze.init(e, t), _.init(e, t), e._zod.processJSONSchema = (r, o, i) => gi(e, r, o);
  const n = e._zod.bag;
  e.format = n.format ?? null, e.minLength = n.minimum ?? null, e.maxLength = n.maximum ?? null, e.regex = (...r) => e.check(ei(...r)), e.includes = (...r) => e.check(ri(...r)), e.startsWith = (...r) => e.check(oi(...r)), e.endsWith = (...r) => e.check(ii(...r)), e.min = (...r) => e.check(oe(...r)), e.max = (...r) => e.check(kt(...r)), e.length = (...r) => e.check(yt(...r)), e.nonempty = (...r) => e.check(oe(1, ...r)), e.lowercase = (r) => e.check(ti(r)), e.uppercase = (r) => e.check(ni(r)), e.trim = () => e.check(ui()), e.normalize = (...r) => e.check(si(...r)), e.toLowerCase = () => e.check(ci()), e.toUpperCase = () => e.check(ai()), e.slugify = () => e.check(li());
}), xt = /* @__PURE__ */ a("ZodString", (e, t) => {
  Ze.init(e, t), Nt.init(e, t), e.email = (n) => e.check(yo(bs, n)), e.url = (n) => e.check(xo(ws, n)), e.jwt = (n) => e.check(Go(Ds, n)), e.emoji = (n) => e.check(Io(ks, n)), e.guid = (n) => e.check(Be(Ke, n)), e.uuid = (n) => e.check(So(ee, n)), e.uuidv4 = (n) => e.check(Zo(ee, n)), e.uuidv6 = (n) => e.check($o(ee, n)), e.uuidv7 = (n) => e.check(No(ee, n)), e.nanoid = (n) => e.check(Eo(ys, n)), e.guid = (n) => e.check(Be(Ke, n)), e.cuid = (n) => e.check(Oo(Ss, n)), e.cuid2 = (n) => e.check(To(Zs, n)), e.ulid = (n) => e.check(Po($s, n)), e.base64 = (n) => e.check(Uo(Ps, n)), e.base64url = (n) => e.check(Fo(As, n)), e.xid = (n) => e.check(Ao(Ns, n)), e.ksuid = (n) => e.check(jo(xs, n)), e.ipv4 = (n) => e.check(Do(Is, n)), e.ipv6 = (n) => e.check(Co(Es, n)), e.cidrv4 = (n) => e.check(Ro(Os, n)), e.cidrv6 = (n) => e.check(Mo(Ts, n)), e.e164 = (n) => e.check(Jo(js, n)), e.datetime = (n) => e.check(es(n)), e.date = (n) => e.check(ns(n)), e.time = (n) => e.check(os(n)), e.duration = (n) => e.check(ss(n));
}), w = /* @__PURE__ */ a("ZodStringFormat", (e, t) => {
  z.init(e, t), Nt.init(e, t);
}), bs = /* @__PURE__ */ a("ZodEmail", (e, t) => {
  _r.init(e, t), w.init(e, t);
}), Ke = /* @__PURE__ */ a("ZodGUID", (e, t) => {
  mr.init(e, t), w.init(e, t);
}), ee = /* @__PURE__ */ a("ZodUUID", (e, t) => {
  pr.init(e, t), w.init(e, t);
}), ws = /* @__PURE__ */ a("ZodURL", (e, t) => {
  gr.init(e, t), w.init(e, t);
}), ks = /* @__PURE__ */ a("ZodEmoji", (e, t) => {
  vr.init(e, t), w.init(e, t);
}), ys = /* @__PURE__ */ a("ZodNanoID", (e, t) => {
  zr.init(e, t), w.init(e, t);
}), Ss = /* @__PURE__ */ a("ZodCUID", (e, t) => {
  br.init(e, t), w.init(e, t);
}), Zs = /* @__PURE__ */ a("ZodCUID2", (e, t) => {
  wr.init(e, t), w.init(e, t);
}), $s = /* @__PURE__ */ a("ZodULID", (e, t) => {
  kr.init(e, t), w.init(e, t);
}), Ns = /* @__PURE__ */ a("ZodXID", (e, t) => {
  yr.init(e, t), w.init(e, t);
}), xs = /* @__PURE__ */ a("ZodKSUID", (e, t) => {
  Sr.init(e, t), w.init(e, t);
}), Is = /* @__PURE__ */ a("ZodIPv4", (e, t) => {
  Ir.init(e, t), w.init(e, t);
}), Es = /* @__PURE__ */ a("ZodIPv6", (e, t) => {
  Er.init(e, t), w.init(e, t);
}), Os = /* @__PURE__ */ a("ZodCIDRv4", (e, t) => {
  Or.init(e, t), w.init(e, t);
}), Ts = /* @__PURE__ */ a("ZodCIDRv6", (e, t) => {
  Tr.init(e, t), w.init(e, t);
}), Ps = /* @__PURE__ */ a("ZodBase64", (e, t) => {
  Pr.init(e, t), w.init(e, t);
}), As = /* @__PURE__ */ a("ZodBase64URL", (e, t) => {
  jr.init(e, t), w.init(e, t);
}), js = /* @__PURE__ */ a("ZodE164", (e, t) => {
  Dr.init(e, t), w.init(e, t);
}), Ds = /* @__PURE__ */ a("ZodJWT", (e, t) => {
  Rr.init(e, t), w.init(e, t);
}), It = /* @__PURE__ */ a("ZodNumber", (e, t) => {
  gt.init(e, t), _.init(e, t), e._zod.processJSONSchema = (r, o, i) => vi(e, r, o), e.gt = (r, o) => e.check(re(r, o)), e.gte = (r, o) => e.check(O(r, o)), e.min = (r, o) => e.check(O(r, o)), e.lt = (r, o) => e.check(ne(r, o)), e.lte = (r, o) => e.check(j(r, o)), e.max = (r, o) => e.check(j(r, o)), e.int = (r) => e.check(qe(r)), e.safe = (r) => e.check(qe(r)), e.positive = (r) => e.check(re(0, r)), e.nonnegative = (r) => e.check(O(0, r)), e.negative = (r) => e.check(ne(0, r)), e.nonpositive = (r) => e.check(j(0, r)), e.multipleOf = (r, o) => e.check(be(r, o)), e.step = (r, o) => e.check(be(r, o)), e.finite = () => e;
  const n = e._zod.bag;
  e.minValue = Math.max(n.minimum ?? Number.NEGATIVE_INFINITY, n.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null, e.maxValue = Math.min(n.maximum ?? Number.POSITIVE_INFINITY, n.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null, e.isInt = (n.format ?? "").includes("int") || Number.isSafeInteger(n.multipleOf ?? 0.5), e.isFinite = !0, e.format = n.format ?? null;
}), Cs = /* @__PURE__ */ a("ZodNumberFormat", (e, t) => {
  Mr.init(e, t), It.init(e, t);
});
function qe(e) {
  return Ko(Cs, e);
}
const Rs = /* @__PURE__ */ a("ZodBoolean", (e, t) => {
  Ur.init(e, t), _.init(e, t), e._zod.processJSONSchema = (n, r, o) => zi(e, n, r);
}), Et = /* @__PURE__ */ a("ZodBigInt", (e, t) => {
  Fr.init(e, t), _.init(e, t), e._zod.processJSONSchema = (r, o, i) => bi(e, r), e.gte = (r, o) => e.check(O(r, o)), e.min = (r, o) => e.check(O(r, o)), e.gt = (r, o) => e.check(re(r, o)), e.gte = (r, o) => e.check(O(r, o)), e.min = (r, o) => e.check(O(r, o)), e.lt = (r, o) => e.check(ne(r, o)), e.lte = (r, o) => e.check(j(r, o)), e.max = (r, o) => e.check(j(r, o)), e.positive = (r) => e.check(re(BigInt(0), r)), e.negative = (r) => e.check(ne(BigInt(0), r)), e.nonpositive = (r) => e.check(j(BigInt(0), r)), e.nonnegative = (r) => e.check(O(BigInt(0), r)), e.multipleOf = (r, o) => e.check(be(r, o));
  const n = e._zod.bag;
  e.minValue = n.minimum ?? null, e.maxValue = n.maximum ?? null, e.format = n.format ?? null;
}), Ms = /* @__PURE__ */ a("ZodSymbol", (e, t) => {
  Jr.init(e, t), _.init(e, t), e._zod.processJSONSchema = (n, r, o) => wi(e, n);
}), Us = /* @__PURE__ */ a("ZodUndefined", (e, t) => {
  Gr.init(e, t), _.init(e, t), e._zod.processJSONSchema = (n, r, o) => yi(e, n);
}), Fs = /* @__PURE__ */ a("ZodNull", (e, t) => {
  Lr.init(e, t), _.init(e, t), e._zod.processJSONSchema = (n, r, o) => ki(e, n, r);
}), Ot = /* @__PURE__ */ a("ZodAny", (e, t) => {
  Vr.init(e, t), _.init(e, t), e._zod.processJSONSchema = (n, r, o) => $i();
});
function Js() {
  return qo(Ot);
}
const Tt = /* @__PURE__ */ a("ZodUnknown", (e, t) => {
  Br.init(e, t), _.init(e, t), e._zod.processJSONSchema = (n, r, o) => Ni();
});
function Xe() {
  return Xo(Tt);
}
const Pt = /* @__PURE__ */ a("ZodNever", (e, t) => {
  Wr.init(e, t), _.init(e, t), e._zod.processJSONSchema = (n, r, o) => Zi(e, n, r);
});
function Gs(e) {
  return Ho(Pt, e);
}
const Ls = /* @__PURE__ */ a("ZodVoid", (e, t) => {
  Kr.init(e, t), _.init(e, t), e._zod.processJSONSchema = (n, r, o) => Si(e, n);
}), Vs = /* @__PURE__ */ a("ZodDate", (e, t) => {
  qr.init(e, t), _.init(e, t), e._zod.processJSONSchema = (r, o, i) => xi(e, r), e.min = (r, o) => e.check(O(r, o)), e.max = (r, o) => e.check(j(r, o));
  const n = e._zod.bag;
  e.minDate = n.minimum ? new Date(n.minimum) : null, e.maxDate = n.maximum ? new Date(n.maximum) : null;
}), At = /* @__PURE__ */ a("ZodArray", (e, t) => {
  Xr.init(e, t), _.init(e, t), e._zod.processJSONSchema = (n, r, o) => Ci(e, n, r, o), e.element = t.element, e.min = (n, r) => e.check(oe(n, r)), e.nonempty = (n) => e.check(oe(1, n)), e.max = (n, r) => e.check(kt(n, r)), e.length = (n, r) => e.check(yt(n, r)), e.unwrap = () => e.element;
});
function Bs(e, t) {
  return fi(At, e, t);
}
const Ws = /* @__PURE__ */ a("ZodObject", (e, t) => {
  Yr.init(e, t), _.init(e, t), e._zod.processJSONSchema = (n, r, o) => Ri(e, n, r, o), g(e, "shape", () => t.shape), e.keyof = () => tu(Object.keys(e._zod.def.shape)), e.catchall = (n) => e.clone({ ...e._zod.def, catchall: n }), e.passthrough = () => e.clone({ ...e._zod.def, catchall: Xe() }), e.loose = () => e.clone({ ...e._zod.def, catchall: Xe() }), e.strict = () => e.clone({ ...e._zod.def, catchall: Gs() }), e.strip = () => e.clone({ ...e._zod.def, catchall: void 0 }), e.extend = (n) => on(e, n), e.safeExtend = (n) => sn(e, n), e.merge = (n) => un(e, n), e.pick = (n) => nn(e, n), e.omit = (n) => rn(e, n), e.partial = (...n) => cn(Ne, e, n[0]), e.required = (...n) => an(Rt, e, n[0]);
}), $e = /* @__PURE__ */ a("ZodUnion", (e, t) => {
  bt.init(e, t), _.init(e, t), e._zod.processJSONSchema = (n, r, o) => Mi(e, n, r, o), e.options = t.options;
});
function Ks(e, t) {
  return new $e({
    type: "union",
    options: e,
    ...h(t)
  });
}
const qs = /* @__PURE__ */ a("ZodDiscriminatedUnion", (e, t) => {
  $e.init(e, t), Qr.init(e, t);
}), jt = /* @__PURE__ */ a("ZodIntersection", (e, t) => {
  eo.init(e, t), _.init(e, t), e._zod.processJSONSchema = (n, r, o) => Ui(e, n, r, o);
});
function Xs(e, t) {
  return new jt({
    type: "intersection",
    left: e,
    right: t
  });
}
const Hs = /* @__PURE__ */ a("ZodTuple", (e, t) => {
  wt.init(e, t), _.init(e, t), e._zod.processJSONSchema = (n, r, o) => Fi(e, n, r, o), e.rest = (n) => e.clone({
    ...e._zod.def,
    rest: n
  });
}), Ys = /* @__PURE__ */ a("ZodRecord", (e, t) => {
  to.init(e, t), _.init(e, t), e._zod.processJSONSchema = (n, r, o) => Ji(e, n, r, o), e.keyType = t.keyType, e.valueType = t.valueType;
}), Qs = /* @__PURE__ */ a("ZodMap", (e, t) => {
  no.init(e, t), _.init(e, t), e._zod.processJSONSchema = (n, r, o) => ji(e, n), e.keyType = t.keyType, e.valueType = t.valueType;
}), eu = /* @__PURE__ */ a("ZodSet", (e, t) => {
  ro.init(e, t), _.init(e, t), e._zod.processJSONSchema = (n, r, o) => Di(e, n), e.min = (...n) => e.check(We(...n)), e.nonempty = (n) => e.check(We(1, n)), e.max = (...n) => e.check(Yo(...n)), e.size = (...n) => e.check(Qo(...n));
}), se = /* @__PURE__ */ a("ZodEnum", (e, t) => {
  oo.init(e, t), _.init(e, t), e._zod.processJSONSchema = (r, o, i) => Ii(e, r, o), e.enum = t.entries, e.options = Object.values(t.entries);
  const n = new Set(Object.keys(t.entries));
  e.extract = (r, o) => {
    const i = {};
    for (const s of r)
      if (n.has(s))
        i[s] = t.entries[s];
      else
        throw new Error(`Key ${s} not found in enum`);
    return new se({
      ...t,
      checks: [],
      ...h(o),
      entries: i
    });
  }, e.exclude = (r, o) => {
    const i = { ...t.entries };
    for (const s of r)
      if (n.has(s))
        delete i[s];
      else
        throw new Error(`Key ${s} not found in enum`);
    return new se({
      ...t,
      checks: [],
      ...h(o),
      entries: i
    });
  };
});
function tu(e, t) {
  const n = Array.isArray(e) ? Object.fromEntries(e.map((r) => [r, r])) : e;
  return new se({
    type: "enum",
    entries: n,
    ...h(t)
  });
}
const nu = /* @__PURE__ */ a("ZodLiteral", (e, t) => {
  io.init(e, t), _.init(e, t), e._zod.processJSONSchema = (n, r, o) => Ei(e, n, r), e.values = new Set(t.values), Object.defineProperty(e, "value", {
    get() {
      if (t.values.length > 1)
        throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
      return t.values[0];
    }
  });
}), ru = /* @__PURE__ */ a("ZodTransform", (e, t) => {
  so.init(e, t), _.init(e, t), e._zod.processJSONSchema = (n, r, o) => Ai(e, n), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      throw new rt(e.constructor.name);
    n.addIssue = (i) => {
      if (typeof i == "string")
        n.issues.push(q(i, n.value, t));
      else {
        const s = i;
        s.fatal && (s.continue = !1), s.code ?? (s.code = "custom"), s.input ?? (s.input = n.value), s.inst ?? (s.inst = e), n.issues.push(q(s));
      }
    };
    const o = t.transform(n.value, n);
    return o instanceof Promise ? o.then((i) => (n.value = i, n)) : (n.value = o, n);
  };
});
function ou(e) {
  return new ru({
    type: "transform",
    transform: e
  });
}
const Ne = /* @__PURE__ */ a("ZodOptional", (e, t) => {
  uo.init(e, t), _.init(e, t), e._zod.processJSONSchema = (n, r, o) => Hi(e, n, r, o), e.unwrap = () => e._zod.def.innerType;
});
function He(e) {
  return new Ne({
    type: "optional",
    innerType: e
  });
}
const Dt = /* @__PURE__ */ a("ZodNullable", (e, t) => {
  co.init(e, t), _.init(e, t), e._zod.processJSONSchema = (n, r, o) => Gi(e, n, r, o), e.unwrap = () => e._zod.def.innerType;
});
function Ye(e) {
  return new Dt({
    type: "nullable",
    innerType: e
  });
}
const Ct = /* @__PURE__ */ a("ZodDefault", (e, t) => {
  ao.init(e, t), _.init(e, t), e._zod.processJSONSchema = (n, r, o) => Vi(e, n, r, o), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
});
function iu(e, t) {
  return new Ct({
    type: "default",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : ut(t);
    }
  });
}
const su = /* @__PURE__ */ a("ZodPrefault", (e, t) => {
  lo.init(e, t), _.init(e, t), e._zod.processJSONSchema = (n, r, o) => Bi(e, n, r, o), e.unwrap = () => e._zod.def.innerType;
});
function uu(e, t) {
  return new su({
    type: "prefault",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : ut(t);
    }
  });
}
const Rt = /* @__PURE__ */ a("ZodNonOptional", (e, t) => {
  fo.init(e, t), _.init(e, t), e._zod.processJSONSchema = (n, r, o) => Li(e, n, r, o), e.unwrap = () => e._zod.def.innerType;
});
function cu(e, t) {
  return new Rt({
    type: "nonoptional",
    innerType: e,
    ...h(t)
  });
}
const au = /* @__PURE__ */ a("ZodCatch", (e, t) => {
  ho.init(e, t), _.init(e, t), e._zod.processJSONSchema = (n, r, o) => Wi(e, n, r, o), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
});
function lu(e, t) {
  return new au({
    type: "catch",
    innerType: e,
    catchValue: typeof t == "function" ? t : () => t
  });
}
const fu = /* @__PURE__ */ a("ZodNaN", (e, t) => {
  mo.init(e, t), _.init(e, t), e._zod.processJSONSchema = (n, r, o) => Oi(e, n);
}), du = /* @__PURE__ */ a("ZodPipe", (e, t) => {
  po.init(e, t), _.init(e, t), e._zod.processJSONSchema = (n, r, o) => Ki(e, n, r, o), e.in = t.in, e.out = t.out;
});
function Qe(e, t) {
  return new du({
    type: "pipe",
    in: e,
    out: t
    // ...util.normalizeParams(params),
  });
}
const Mt = /* @__PURE__ */ a("ZodReadonly", (e, t) => {
  _o.init(e, t), _.init(e, t), e._zod.processJSONSchema = (n, r, o) => qi(e, n, r, o), e.unwrap = () => e._zod.def.innerType;
});
function hu(e) {
  return new Mt({
    type: "readonly",
    innerType: e
  });
}
const Ut = /* @__PURE__ */ a("ZodLazy", (e, t) => {
  zo.init(e, t), _.init(e, t), e._zod.processJSONSchema = (n, r, o) => Yi(e, n, r, o), e.unwrap = () => e._zod.def.getter();
}), mu = /* @__PURE__ */ a("ZodPromise", (e, t) => {
  vo.init(e, t), _.init(e, t), e._zod.processJSONSchema = (n, r, o) => Xi(e, n, r, o), e.unwrap = () => e._zod.def.innerType;
}), pu = /* @__PURE__ */ a("ZodFunction", (e, t) => {
  go.init(e, t), _.init(e, t), e._zod.processJSONSchema = (n, r, o) => Pi(e, n);
}), _u = /* @__PURE__ */ a("ZodCustom", (e, t) => {
  bo.init(e, t), _.init(e, t), e._zod.processJSONSchema = (n, r, o) => Ti(e, n);
});
function gu(e, t = {}) {
  return di(_u, e, t);
}
function vu(e) {
  return hi(e);
}
var A = /* @__PURE__ */ ((e) => (e.function = "function", e.number = "number", e.string = "string", e.nan = "nan", e.integer = "integer", e.float = "float", e.boolean = "boolean", e.date = "date", e.bigint = "bigint", e.symbol = "symbol", e.undefined = "undefined", e.null = "null", e.array = "array", e.object = "object", e.unknown = "unknown", e.promise = "promise", e.void = "void", e.never = "never", e.map = "map", e.set = "set", e))(A || {});
const et = (e) => {
  const t = typeof e;
  switch (t) {
    case "undefined":
    case "string":
    case "boolean":
    case "function":
    case "bigint":
    case "symbol":
      return t;
    case "number":
      return isNaN(e) ? "nan" : "number";
    case "object":
      return Array.isArray(e) ? "array" : e === null ? "null" : e.then && typeof e.then == "function" && e.catch && typeof e.catch == "function" ? "promise" : typeof Map < "u" && e instanceof Map ? "map" : typeof Set < "u" && e instanceof Set ? "set" : typeof Date < "u" && e instanceof Date ? "date" : "object";
    default:
      return "unknown";
  }
}, tt = {
  objectKeys: typeof Object.keys == "function" ? (e) => Object.keys(e) : (e) => {
    const t = [];
    for (const n in e)
      Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
    return t;
  }
};
function zu(e) {
  return typeof e == "function";
}
function Zc(e) {
  return e;
}
class bu {
  constructor(t) {
    this.checks = t;
  }
  find(t) {
    return this.checks.find((n) => n._zod.def.check === t);
  }
  has(t) {
    return this.find(t) !== void 0;
  }
}
class wu {
  /* Period parameters */
  N = 624;
  M = 397;
  MATRIX_A = 2567483615;
  // constant vector a
  UPPER_MASK = 2147483648;
  // most significant w-r bits
  LOWER_MASK = 2147483647;
  // least significant r bits
  mt = new Array(this.N);
  // the array for the state vector
  mti = this.N + 1;
  // mti==N + 1 means mt[N] is not initialized
  constructor(t) {
    t === void 0 && (t = Math.floor(Math.random() * Math.pow(10, 13))), this.init_genrand(t);
  }
  /* initializes mt[N] with a seed */
  init_genrand(t) {
    for (this.mt[0] = t >>> 0, this.mti = 1; this.mti < this.N; this.mti++)
      t = this.mt[this.mti - 1] ^ this.mt[this.mti - 1] >>> 30, this.mt[this.mti] = (((t & 4294901760) >>> 16) * 1812433253 << 16) + (t & 65535) * 1812433253 + this.mti, this.mt[this.mti] >>>= 0;
  }
  /* initialize by an array with array-length */
  /* init_key is the array for initializing keys */
  /* key_length is its length */
  /* slight change for C++, 2004/2/26 */
  init_by_array(t, n) {
    let r = 1, o = 0, i, s;
    for (this.init_genrand(19650218), i = this.N > n ? this.N : n; i; i--)
      s = this.mt[r - 1] ^ this.mt[r - 1] >>> 30, this.mt[r] = (this.mt[r] ^ (((s & 4294901760) >>> 16) * 1664525 << 16) + (s & 65535) * 1664525) + // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      t[o] + o, this.mt[r] >>>= 0, r++, o++, r >= this.N && (this.mt[0] = this.mt[this.N - 1], r = 1), o >= n && (o = 0);
    for (i = this.N - 1; i; i--)
      s = this.mt[r - 1] ^ this.mt[r - 1] >>> 30, this.mt[r] = (this.mt[r] ^ (((s & 4294901760) >>> 16) * 1566083941 << 16) + (s & 65535) * 1566083941) - r, this.mt[r] >>>= 0, r++, r >= this.N && (this.mt[0] = this.mt[this.N - 1], r = 1);
    this.mt[0] = 2147483648;
  }
  /* generates a random number on [0,0xffffffff]-interval */
  genrand_int32() {
    let t;
    const n = [0, this.MATRIX_A];
    if (this.mti >= this.N) {
      let r;
      for (this.mti === this.N + 1 && this.init_genrand(5489), r = 0; r < this.N - this.M; r++)
        t = this.mt[r] & this.UPPER_MASK | this.mt[r + 1] & this.LOWER_MASK, this.mt[r] = this.mt[r + this.M] ^ t >>> 1 ^ n[t & 1];
      for (; r < this.N - 1; r++)
        t = this.mt[r] & this.UPPER_MASK | this.mt[r + 1] & this.LOWER_MASK, this.mt[r] = // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.mt[r + (this.M - this.N)] ^ t >>> 1 ^ n[t & 1];
      t = this.mt[this.N - 1] & this.UPPER_MASK | this.mt[0] & this.LOWER_MASK, this.mt[this.N - 1] = this.mt[this.M - 1] ^ t >>> 1 ^ n[t & 1], this.mti = 0;
    }
    return t = this.mt[this.mti++], t ^= t >>> 11, t ^= t << 7 & 2636928640, t ^= t << 15 & 4022730752, t ^= t >>> 18, t >>> 0;
  }
  /* generates a random number on [0,0x7fffffff]-interval */
  genrand_int31() {
    return this.genrand_int32() >>> 1;
  }
  /* generates a random number on [0,1]-real-interval */
  genrand_real1() {
    return this.genrand_int32() * (1 / 4294967295);
  }
  /* generates a random number on [0,1)-real-interval */
  random() {
    return this.genrand_int32() * (1 / 4294967296);
  }
  /* generates a random number on (0,1)-real-interval */
  genrand_real3() {
    return (this.genrand_int32() + 0.5) * (1 / 4294967296);
  }
  /* generates a random number on [0,1) with 53-bit resolution*/
  genrand_res53() {
    const t = this.genrand_int32() >>> 5, n = this.genrand_int32() >>> 6;
    return (t * 67108864 + n) * (1 / 9007199254740992);
  }
}
class ku {
  regex = /* @__PURE__ */ new WeakMap();
  string = /* @__PURE__ */ new Map();
  has(t) {
    return typeof t == "string" ? this.string.has(t) : this.regex.has(t);
  }
  set(t, n) {
    return typeof t == "string" ? this.string.set(t, n) : this.regex.set(t, n);
  }
  get(t, n) {
    let r = typeof t == "string" ? this.string.get(t) : this.regex.get(t);
    if (!r && n)
      r = n(new Wt(t)), this.set(t, r);
    else
      throw new Error(`No value for ${t} and no fallback available.`);
    return r;
  }
}
const xe = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", yu = [xe], Su = xe.replace(/\. /g, `.
`).split(`
`), Zu = xe.toLowerCase().replace(/[,.]/, "").split(" ");
class $u {
  constructor(t) {
    this.defaults = t, this.mt = new wu(t.seed), this.regExRandInt = function(n, r) {
      return this.int({ min: n, max: r });
    }.bind(this);
  }
  mt;
  regExCache = new ku();
  regExRandInt;
  uuid() {
    let t = "";
    const n = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    let r = 0, o = this.unitInterval() * 4294967295 | 0;
    for (; r++ < 36; ) {
      const i = n[r - 1], s = o & 15, u = i == "x" ? s : s & 3 | 8;
      t += i == "-" || i == "4" ? i : u.toString(16), o = r % 8 == 0 ? this.unitInterval() * 4294967295 | 0 : o >> 4;
    }
    return t;
  }
  uuidv7() {
    const n = Date.now().toString(16).padStart(12, "0"), r = (i) => {
      let s = "";
      for (let u = 0; u < i; u++)
        s += Math.floor(this.unitInterval() * 16).toString(16);
      return s;
    }, o = ["8", "9", "a", "b"][Math.floor(this.unitInterval() * 4)];
    return n.slice(0, 8) + "-" + n.slice(8, 12) + "-7" + r(3) + "-" + o + r(3) + "-" + r(12);
  }
  uuidv1() {
    const n = Date.now().toString(16).padStart(12, "0"), r = (i) => {
      let s = "";
      for (let u = 0; u < i; u++)
        s += Math.floor(this.unitInterval() * 16).toString(16);
      return s;
    }, o = ["8", "9", "a", "b"][Math.floor(this.unitInterval() * 4)];
    return n.slice(0, 8) + "-" + n.slice(8, 12) + "-1" + r(3) + "-" + o + r(3) + "-" + r(12);
  }
  uuidv6() {
    const n = Date.now().toString(16).padStart(12, "0"), r = (i) => {
      let s = "";
      for (let u = 0; u < i; u++)
        s += Math.floor(this.unitInterval() * 16).toString(16);
      return s;
    }, o = ["8", "9", "a", "b"][Math.floor(this.unitInterval() * 4)];
    return n.slice(0, 8) + "-" + n.slice(8, 12) + "-6" + r(3) + "-" + o + r(3) + "-" + r(12);
  }
  // https://en.wikipedia.org/wiki/Unit_interval
  unitInterval() {
    return this.mt.random();
  }
  from(t) {
    const n = t instanceof Set ? [...t] : t, r = 0, o = Math.max(r, n.length - 1), i = this.int({ min: r, max: o });
    return n[i];
  }
  shuffle(t) {
    const n = [...t];
    for (let r = n.length - 1; r > 0; r--) {
      const o = this.int({ min: 0, max: r }), i = n[r];
      n[r] = n[o], n[o] = i;
    }
    return n;
  }
  emoji() {
    const t = this.int({ min: 128513, max: 128591 });
    return String.fromCodePoint(t);
  }
  string(t) {
    let n = t.min ?? this.defaults.string.min, r = t.max ?? this.defaults.string.max;
    if (n < 0)
      throw new Error(
        `Minimum length of a string can't be less than 0: ${n}`
      );
    t.min && !t.max && (r = t.min), t.max && !t.min && (n = t.max);
    const o = this.int({ min: n, max: r });
    let i = "";
    for (let s = 0; s < o; s++)
      i += this.from(this.defaults.string.characterSet);
    return i;
  }
  float(t) {
    const n = t?.min ?? this.defaults.float.min, r = t?.max ?? this.defaults.float.max;
    if (n > r)
      throw new Error(`min ${n} can't be greater than max ${r}`);
    return this.unitInterval() * (r - n) + n;
  }
  int(t) {
    const n = t?.min ?? this.defaults.int.min, r = t?.max ?? this.defaults.int.max;
    if (n > r)
      throw new Error(`min ${n} can't be greater than max ${r}`);
    return Math.floor(this.unitInterval() * (r - n + 1)) + n;
  }
  bigInt(t) {
    const n = t?.min ?? this.defaults.bigint.min, r = t?.max ?? this.defaults.bigint.max;
    if (n >= r)
      throw new Error(`min ${n} can't be greater than max ${r}`);
    const o = r - n, i = o.toString().length;
    let s = "";
    for (; s.length < i; )
      s += this.unitInterval().toString().split(".")[1];
    s = s.slice(0, i);
    const u = "1" + "0".repeat(i), c = o * BigInt(s) / BigInt(u);
    return n + c;
  }
  lorem(t, n = "word") {
    const r = n === "word" ? Zu : n === "sentence" ? Su : yu;
    return Array.from({ length: t }, () => this.from(r)).join(" ");
  }
  boolean() {
    return this.unitInterval() < 0.5;
  }
  date(t) {
    const n = t?.min ?? this.defaults.date.min, r = t?.max ?? this.defaults.date.max;
    if (n > r)
      throw new Error(`min ${n} can't be greater than max ${r}`);
    return new Date(this.int({ min: n, max: r }));
  }
  cuid() {
    return this.regexp(/^[c][a-z0-9]{8}0000[a-z]{4}[a-z0-9]{8}$/);
  }
  cuid2() {
    return this.regexp(/^[a-z][a-z0-9]{23}$/);
  }
  ulid() {
    return this.regexp(/01[0-9A-HJKMNP-TV-Z]{24}/);
  }
  regexp(t) {
    return this.regExCache.get(t, (n) => (n.randInt = this.regExRandInt, n)).gen();
  }
}
class Nu {
  constructor(t) {
    this.runner = t, this.random = new $u(t.defaults);
  }
  recursion = /* @__PURE__ */ new WeakMap();
  random;
  resolveValue(t) {
    const { initial: n, fallback: r } = t;
    if (n != null) return n;
    if ("conflict" in t) {
      const { conflict: o, resolve: i } = t;
      return o != null ? i({ fallback: r, conflict: o }) : r;
    } else
      return r;
  }
  n(t, n = this.runner.defaults.array) {
    const r = typeof n == "number" ? n : this.random.int(n);
    return Array.from({ length: r }, (o, i) => t(i));
  }
  ifNotNever(t, n) {
    !t || t.constructor.name === "ZodNever" || n(t);
  }
  recursionCheck(t, n) {
    if (this.isType(Ut, t)) {
      const r = this.recursion.get(t._def.getter) ?? 0, o = this.random.int(this.runner.defaults.recursion);
      if (r >= o) return;
    }
    n(t);
  }
  isType(t, n) {
    return zu(t) ? n.constructor.name === t.name : (
      // If our generator was created with an instance, make sure it matches
      // the schema we're trying to generate.
      // This is particularly important for z.custom schemas.
      n === t
    );
  }
  // checks<TChecks extends { kind: string }[]>(checks: TChecks) {
  // 	return new Checks(checks);
  // }
  checks(t) {
    return new bu(t);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  noop() {
  }
}
class xu {
  constructor(t, n) {
    this.transformer = t, this.defaults = {
      ...t.transformerDefaults,
      ...t.instanceDefaults,
      ...n
    }, this.utils = new Nu(this);
  }
  defaults;
  utils;
  fromSchema(t, n = { path: [] }) {
    const r = this, o = t._def, i = this.transformer.generators.find((s) => !(s.schema && !r.utils.isType(s.schema, t) || s.filter && !s.filter({ schema: t, def: o, transform: r, context: n })));
    return this.shouldHaveMatch(t, i), i.output({ schema: t, def: o, transform: r, context: n });
  }
  shouldHaveMatch(t, n) {
    if (!n) throw this.transformer.missingGeneratorError(t);
  }
}
class Ft {
  constructor(t) {
    this.instanceDefaults = t, this.instanceDefaults = { seed: Kt(), ...t };
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extend(t) {
    const n = Array.isArray(t) ? t : [t];
    return this.generators = n.concat(this.generators), this;
  }
  fromSchema(t, n) {
    return new xu(this, n).fromSchema(t);
  }
  missingGeneratorError(t) {
    return new Error(`No generator found for ${t.constructor.name}.`);
  }
}
class Iu extends Ft {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  generators = [];
  transformerDefaults = qt;
}
class Eu extends Ft {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  generators = [];
  transformerDefaults = Xt;
}
const Ou = {
  schema: Ot,
  // @TODO: implement a more robust any generator.
  output: () => "ZodAny"
}, Tu = {
  schema: At,
  output: ({ def: e, transform: t, context: n }) => {
    const r = t.utils.checks(e.checks ?? []), o = r.find("min_length")?._zod.def.minimum, i = r.find("max_length")?._zod.def.maximum, s = r.find("length_equals")?._zod.def.length, u = o ?? s, c = i ?? s, l = t.utils.resolveValue({
      initial: u,
      fallback: t.defaults.array.min,
      conflict: c,
      resolve: (m) => Math.min(m.fallback, m.conflict)
    }), f = t.utils.resolveValue({
      initial: c,
      fallback: t.defaults.array.max,
      conflict: u,
      resolve: (m) => Math.max(m.fallback, m.conflict)
    }), d = [];
    return t.utils.ifNotNever(e.element, (m) => {
      t.utils.recursionCheck(m, () => {
        t.utils.n(
          (v) => d.push(
            t.fromSchema(m, {
              ...n,
              path: [...n.path, v]
            })
          ),
          { min: l, max: f }
        );
      });
    }), d;
  }
}, Pu = {
  schema: Et,
  filter: ({ def: e, transform: t }) => !t.utils.checks(e.checks ?? []).has("multiple_of"),
  output: ({ def: e, transform: t }) => {
    const n = t.utils.checks(e.checks ?? []), r = n.find("greater_than")?._zod.def.value, o = n.find("less_than")?._zod.def.value;
    return t.utils.random.bigInt({ min: r, max: o });
  }
}, Au = {
  schema: Et,
  filter: ({ def: e, transform: t }) => t.utils.checks(e.checks ?? []).has("multiple_of"),
  output: ({ def: e, transform: t }) => {
    const n = t.utils.checks(e.checks ?? []), r = n.find("greater_than")?._zod.def.value, o = n.find("less_than")?._zod.def.value, i = n.find("multiple_of")?._zod.def.value, s = r !== void 0 ? BigInt(r) : t.defaults.bigint.min, u = o !== void 0 ? BigInt(o) : t.defaults.bigint.max, c = i !== void 0 ? BigInt(i) : 1n, l = s / c, f = u / c;
    return t.utils.random.bigInt({ min: l, max: f }) * c;
  }
}, ju = {
  schema: Rs,
  output: ({ transform: e }) => e.utils.random.boolean()
}, Du = {
  schema: Vs,
  output: ({ def: e, transform: t }) => {
    const n = t.utils.checks(e.checks ?? []), r = n.find("greater_than")?._zod.def.value, o = n.find("less_than")?._zod.def.value;
    let i = t.defaults.date.min, s = t.defaults.date.max;
    return r instanceof Date && (i = r.getTime()), o instanceof Date && (s = o.getTime()), r && !o && i > s && (s = i + 1e3 * 60 * 60 * 24 * 365 * 10), o && !r && s < i && (i = s - 1e3 * 60 * 60 * 24 * 365 * 10), new Date(t.utils.random.int({ min: i, max: s }));
  }
}, Cu = {
  schema: Ct,
  output: ({ def: e }) => {
    const t = e.defaultValue;
    return typeof t == "function" ? t() : t;
  }
}, Ru = {
  filter: ({ schema: e }) => e.constructor.name === "ZodPrefault",
  output: ({ def: e }) => {
    const t = e.defaultValue;
    return typeof t == "function" ? t() : t;
  }
}, Mu = {
  filter: ({ schema: e }) => e.constructor.name === "ZodPipe",
  output: ({ def: e, transform: t, context: n }) => {
    const r = e.in, o = e.out;
    if (r.constructor.name === "ZodTransform")
      return t.fromSchema(o, n);
    if (o.constructor.name === "ZodTransform") {
      const i = t.fromSchema(r, n), s = o._def?.transform ?? o.def?.transform;
      return typeof s == "function" ? s(i, {
        addIssue: t.utils.noop,
        path: []
      }) : i;
    }
    return t.fromSchema(r, n);
  }
}, Uu = {
  schema: se,
  output: ({ def: e, transform: t }) => {
    const n = e.entries ?? {}, r = Object.keys(n).filter((o) => Number.isNaN(Number(o))).map((o) => n[o]);
    return t.utils.random.from(r);
  }
}, Fu = {
  schema: pu,
  output: ({ transform: e }) => e.utils.noop
}, Ju = {
  schema: jt,
  output: ({ def: e, transform: t, context: n }) => {
    const r = t.fromSchema(e.left, n), o = t.fromSchema(e.right, n), i = we(r, o);
    if (!i.valid) throw new Error("Intersection is not valid.");
    return i.data;
  }
};
function we(e, t) {
  const n = et(e), r = et(t);
  if (e === t)
    return { valid: !0, data: e };
  if (n === A.object && r === A.object) {
    const o = tt.objectKeys(t), i = tt.objectKeys(e).filter((u) => o.indexOf(u) !== -1), s = { ...e, ...t };
    for (const u of i) {
      const c = we(e[u], t[u]);
      if (!c.valid)
        return { valid: !1 };
      s[u] = c.data;
    }
    return { valid: !0, data: s };
  } else if (n === A.array && r === A.array) {
    if (e.length !== t.length)
      return { valid: !1 };
    const o = [];
    for (let i = 0; i < e.length; i++) {
      const s = e[i], u = t[i], c = we(s, u);
      if (!c.valid)
        return { valid: !1 };
      o.push(c.data);
    }
    return { valid: !0, data: o };
  } else return n === A.date && r === A.date && +e == +t ? { valid: !0, data: e } : { valid: !1 };
}
const Gu = {
  schema: Ut,
  output: ({ def: e, transform: t, context: n }) => {
    const r = t.utils.recursion.get(e.getter) ?? 0;
    return t.utils.recursion.set(e.getter, r + 1), t.fromSchema(e.getter(), n);
  }
}, Lu = {
  schema: nu,
  output: ({ def: e }) => e.values[0]
}, Vu = {
  schema: Qs,
  output: ({ def: e, transform: t, context: n }) => {
    const r = e.keyType, o = e.valueType, i = /* @__PURE__ */ new Map();
    return t.utils.ifNotNever(r, (s) => {
      t.utils.ifNotNever(o, (u) => {
        t.utils.recursionCheck(u, () => {
          t.utils.n(() => {
            const c = t.fromSchema(s, n), l = t.fromSchema(u, {
              ...n,
              path: [...n.path, c]
            });
            i.set(c, l);
          }, t.defaults.map);
        });
      });
    }), i;
  }
}, Bu = {
  schema: fu,
  output: () => NaN
}, Wu = {
  schema: Pt,
  output: () => {
    throw new Error(
      "Never is a sanity check by Zod to ensure fields don't exist. If we've reached this point, something went wrong during fixture generation."
    );
  }
}, Ku = {
  schema: Fs,
  output: () => null
}, qu = {
  schema: Dt,
  output: ({ def: e, transform: t, context: n }) => {
    let r = null;
    return t.utils.random.boolean() && t.utils.recursionCheck(e.innerType, () => {
      r = t.fromSchema(e.innerType, n);
    }), r;
  }
}, Xu = {
  schema: It,
  output: ({ def: e, transform: t }) => {
    const n = t.utils.checks(e.checks ?? []), r = n.find("greater_than")?._zod.def ?? {
      value: t.defaults.float.min,
      inclusive: !0
    }, o = n.find("less_than")?._zod.def ?? {
      value: t.defaults.float.max,
      inclusive: !0
    }, i = r.inclusive ? r.value : r.value + 1, s = o.inclusive ? o.value : o.value - 1, u = n.find("multiple_of")?._zod.def.value;
    let f = n.find("number_format")?._zod.def?.format === "safeint" ? t.utils.random.int({ min: i, max: s }) : t.utils.random.float({ min: i, max: s });
    if (u !== void 0 && (f = Math.round(f / u) * u, f < i && (f += u), f > s && (f -= u), u % 1 !== 0)) {
      const d = u.toString().split(".")[1]?.length;
      f = Number(f.toFixed(d));
    }
    return f;
  }
}, Hu = {
  filter: ({ schema: e }) => e.constructor.name === "ZodNumberFormat",
  output: ({ def: e, transform: t }) => {
    const n = t.utils.checks(e.checks ?? []), o = e.format === "safeint", i = n.find("greater_than")?._zod.def ?? {
      value: o ? t.defaults.int.min : t.defaults.float.min,
      inclusive: !0
    }, s = n.find("less_than")?._zod.def ?? {
      value: o ? t.defaults.int.max : t.defaults.float.max,
      inclusive: !0
    }, u = i.inclusive ? i.value : i.value + 1, c = s.inclusive ? s.value : s.value - 1, l = n.find("multiple_of")?._zod.def.value;
    let f = o ? t.utils.random.int({ min: u, max: c }) : t.utils.random.float({ min: u, max: c });
    if (l !== void 0 && (f = Math.round(f / l) * l, f < u && (f += l), f > c && (f -= l), l % 1 !== 0)) {
      const d = l.toString().split(".")[1]?.length;
      f = Number(f.toFixed(d));
    }
    return f;
  }
}, Yu = {
  schema: Ws,
  output: ({ def: e, transform: t, context: n }) => {
    const r = e.shape, o = {};
    for (const u in r)
      t.utils.ifNotNever(r[u], (c) => {
        t.utils.recursionCheck(c, () => {
          o[u] = t.fromSchema(c, {
            ...n,
            path: [...n.path, u]
          });
        });
      });
    const i = e.catchall;
    if (i && i.constructor.name !== "ZodNever") {
      const u = t.utils.random.lorem(1, "word"), c = i.constructor.name === "ZodUnknown" ? Js() : i;
      o[u] = t.fromSchema(c, {
        ...n,
        path: [...n.path, u]
      });
    }
    return o;
  }
}, Qu = {
  schema: Ys,
  output: ({ def: e, transform: t, context: n }) => {
    const r = {};
    return t.utils.ifNotNever(e.keyType, (o) => {
      t.utils.ifNotNever(e.valueType, (i) => {
        t.utils.recursionCheck(i, () => {
          t.utils.n(() => {
            const s = t.fromSchema(o, n), u = t.fromSchema(i, {
              ...n,
              path: [...n.path, s]
            });
            r[s] = u;
          });
        });
      });
    }), r;
  }
}, ec = {
  schema: Ne,
  output: ({ def: e, transform: t, context: n }) => {
    let r;
    return t.utils.random.boolean() && t.utils.recursionCheck(e.innerType, () => {
      r = t.fromSchema(e.innerType, n);
    }), r;
  }
}, tc = {
  schema: mu,
  output: ({ def: e, transform: t, context: n }) => {
    let r;
    const o = e.innerType;
    return t.utils.recursionCheck(o, () => {
      r = t.fromSchema(o, n);
    }), Promise.resolve(r);
  }
}, nc = {
  schema: Mt,
  output: ({ transform: e, def: t }) => {
    const n = e.fromSchema(t.innerType);
    return Object.freeze(n);
  }
}, rc = {
  schema: eu,
  output: ({ def: e, transform: t, context: n }) => {
    const r = t.utils.checks(e.checks ?? []), o = r.find("size_equals")?._zod.def.size, i = o ?? r.find("min_size")?._zod.def.minimum, s = o ?? r.find("max_size")?._zod.def.maximum, u = t.utils.resolveValue({
      initial: i,
      fallback: t.defaults.set.min,
      conflict: s,
      resolve: (f) => Math.min(f.fallback, f.conflict)
    }), c = t.utils.resolveValue({
      initial: s,
      fallback: t.defaults.set.max,
      conflict: i,
      resolve: (f) => Math.max(f.fallback, f.conflict)
    }), l = /* @__PURE__ */ new Set();
    return t.utils.ifNotNever(e.valueType, (f) => {
      t.utils.recursionCheck(f, () => {
        t.utils.n(
          () => {
            l.add(
              t.fromSchema(f, {
                ...n,
                path: [...n.path, l.size]
              })
            );
          },
          { min: u, max: c }
        );
      });
    }), l;
  }
}, nt = (e) => `^.{${e.length}}`, oc = (e) => `.{${e.length}}$`;
function W(e, t) {
  return (e.checks ?? []).find(
    (r) => r._zod?.def?.check === "string_format" && r._zod?.def?.format === t
  );
}
function Jt(e, t) {
  return W(e, t) !== void 0;
}
function R(e, t, n) {
  const r = e.utils.checks(t.checks ?? []);
  let o = r.find("max_length")?._zod.def.maximum, i = r.find("min_length")?._zod.def.minimum ?? 0;
  const s = r.find("length_equals")?._zod.def.length, u = W(r, "includes")?._zod.def.includes, c = W(r, "starts_with")?._zod.def.prefix, l = W(r, "ends_with")?._zod.def.suffix, f = Jt(r, "emoji");
  if (s && (i = s, o = s), i != null && n.length < i) {
    const d = i - n.length;
    n += e.utils.random.string({ min: d, max: d });
  }
  if (o != null && (n = n.slice(0, o)), u) {
    const d = c ? nt(c) : "";
    n = n.replace(
      new RegExp(`(${d}).{${u.length}}`),
      (m, v) => v + u
    );
  }
  c && (n = n.replace(new RegExp(nt(c)), c)), l && (n = n.replace(new RegExp(oc(l)), l)), f && (n = n.replace(/./g, () => e.utils.random.emoji()));
  for (const d of t.checks ?? [])
    d._zod?.def?.check === "overwrite" && typeof d._zod.def.tx == "function" && (n = d._zod.def.tx(n));
  return o ? n.slice(0, o) : n;
}
const ic = {
  schema: xt,
  output: ({ def: e, transform: t }) => {
    const n = t.utils.checks(e.checks ?? []);
    let r = n.find("min_length")?._zod.def.minimum, o = n.find("max_length")?._zod.def.maximum;
    const i = n.find("length_equals")?._zod.def.length;
    return i && (r = i, o = i), R(
      t,
      e,
      t.utils.random.string({ min: r, max: o })
    );
  }
}, sc = {
  filter: ({ schema: e }) => e.constructor.name === "ZodULID",
  output: ({ def: e, transform: t }) => R(t, e, t.utils.random.ulid())
}, uc = {
  filter: ({ schema: e }) => e.constructor.name === "ZodURL",
  output: ({ def: e, transform: t }) => R(
    t,
    e,
    `https://${t.utils.random.lorem(1)}.com`
  )
}, cc = {
  filter: ({ schema: e }) => e.constructor.name === "ZodUUID",
  output: ({ def: e, transform: t }) => {
    const n = e.version;
    switch (n) {
      case "v7":
        return t.utils.random.uuidv7();
      case "v1":
        return t.utils.random.uuidv1();
      case "v6":
        return t.utils.random.uuidv6();
      case "v4":
      default:
        return n && e.pattern ? t.utils.random.regexp(e.pattern) : t.utils.random.uuid();
    }
  }
}, ac = {
  filter: ({ schema: e }) => e.constructor.name === "ZodEmail",
  output: ({ def: e, transform: t }) => R(t, e, "rando@email.com")
}, lc = {
  filter: ({ schema: e }) => e.constructor.name === "ZodCUID",
  output: ({ def: e, transform: t }) => R(t, e, t.utils.random.cuid())
}, fc = {
  filter: ({ schema: e }) => e.constructor.name === "ZodCUID2",
  output: ({ def: e, transform: t }) => R(t, e, t.utils.random.cuid2())
}, dc = {
  filter: ({ schema: e }) => e.constructor.name === "ZodISODateTime",
  output: ({ transform: e }) => e.utils.random.date().toISOString()
}, hc = {
  schema: xt,
  filter: ({ def: e, transform: t }) => Jt(t.utils.checks(e.checks ?? []), "regex"),
  output: ({ def: e, transform: t }) => {
    const n = W(
      t.utils.checks(e.checks ?? []),
      "regex"
    )?._zod.def.pattern;
    if (!n)
      throw new Error("RegexGenerator: regex pattern not found");
    return R(t, e, t.utils.random.regexp(n));
  }
}, mc = {
  filter: ({ schema: e }) => e.constructor.name === "ZodIPv4" || e.constructor.name === "ZodIPv6",
  output: ({ schema: e, transform: t }) => e.constructor.name === "ZodIPv4" ? t.utils.n(() => t.utils.random.int({ min: 1, max: 255 }), 4).join(".") : t.utils.n(
    () => t.utils.random.int({ min: 0, max: 65535 }).toString(16),
    8
  ).join(":")
}, pc = {
  filter: ({ schema: e }) => e.constructor.name === "ZodEmoji",
  output: ({ transform: e }) => e.utils.random.emoji()
}, _c = {
  schema: Ms,
  output: ({ transform: e }) => Symbol.for(e.utils.random.lorem(1, "word"))
}, gc = {
  schema: Hs,
  output: ({ def: e, transform: t, context: n }) => {
    const r = [];
    e.items.forEach((i, s) => {
      t.utils.ifNotNever(i, (u) => {
        t.utils.recursionCheck(u, () => {
          r.push(
            t.fromSchema(u, {
              ...n,
              path: [...n.path, s]
            })
          );
        });
      });
    });
    const o = [];
    return t.utils.ifNotNever(e.rest, (i) => {
      t.utils.recursionCheck(i, () => {
        t.utils.n(
          (s) => o.push(
            t.fromSchema(i, {
              ...n,
              path: [...n.path, r.length + s]
            })
          ),
          1
        );
      });
    }), [...r, ...o];
  }
}, vc = {
  schema: Us,
  output: () => {
  }
}, zc = {
  schema: Ls,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  output: () => {
  }
}, bc = {
  schema: $e,
  output: ({ def: e, transform: t, context: n }) => {
    const r = t.utils.random.from(e.options);
    return t.fromSchema(r, n);
  }
}, wc = {
  schema: qs,
  output: ({ def: e, transform: t, context: n }) => {
    const r = t.utils.random.from(e.options);
    return t.fromSchema(r, n);
  }
}, kc = {
  schema: Tt,
  // @TODO: implement a more robust unknown generator.
  output: () => "ZodUnknown"
}, Gt = [
  Ou,
  kc,
  ec,
  mc,
  sc,
  Tu,
  Pu,
  Au,
  ju,
  Du,
  Uu,
  Fu,
  Ju,
  Lu,
  Vu,
  Bu,
  Ku,
  Xu,
  Hu,
  Yu,
  Qu,
  rc,
  cc,
  lc,
  fc,
  ac,
  pc,
  uc,
  dc,
  hc,
  qu,
  gc,
  vc,
  bc,
  wc,
  Mu,
  tc,
  _c,
  Gu,
  // BrandedGenerator,
  zc,
  Wu,
  ic,
  Cu,
  Ru,
  nc
];
function Lt(e) {
  const t = [
    `No generator found for ${e.constructor.name}.`,
    "",
    "For z.custom, refer to the documentation https://github.com/timdeschryver/zod-fixture.",
    "If you still believe this is an error, please open an issue at https://github.com/timdeschryver/zod-fixture/issues/new.",
    ""
  ].join(`
`);
  return new Error(t);
}
class yc extends Iu {
  generators = Gt;
  missingGeneratorError = Lt;
}
class $c extends Eu {
  generators = Gt;
  missingGeneratorError = Lt;
}
function Nc(e, t) {
  return new yc(t).fromSchema(e);
}
export {
  Ou as AnyGenerator,
  Tu as ArrayGenerator,
  Pu as BigIntGenerator,
  Au as BigIntMultipleOfGenerator,
  ju as BooleanGenerator,
  yc as ConstrainedFixture,
  Iu as ConstrainedTransformer,
  fc as Cuid2Generator,
  lc as CuidGenerator,
  Gt as DEFAULT_FIXTURE_GENERATORS,
  Du as DateGenerator,
  dc as DateTimeGenerator,
  Cu as DefaultGenerator,
  wc as DiscriminatedUnionGenerator,
  ac as EmailGenerator,
  pc as EmojiGenerator,
  Uu as EnumGenerator,
  yc as Fixture,
  Fu as FunctionGenerator,
  Zc as Generator,
  Ju as IntersectionGenerator,
  mc as IpGenerator,
  Gu as LazyGenerator,
  Lu as LiteralGenerator,
  Vu as MapGenerator,
  Bu as NanGenerator,
  Wu as NeverGenerator,
  Ku as NullGenerator,
  qu as NullableGenerator,
  Hu as NumberFormatGenerator,
  Xu as NumberGenerator,
  Yu as ObjectGenerator,
  ec as OptionalGenerator,
  Mu as PipeGenerator,
  Ru as PrefaultGenerator,
  tc as PromiseGenerator,
  nc as ReadonlyGenerator,
  Qu as RecordGenerator,
  hc as RegexGenerator,
  rc as SetGenerator,
  ic as StringGenerator,
  _c as SymbolGenerator,
  Ft as Transformer,
  gc as TupleGenerator,
  sc as UlidGenerator,
  $c as UnconstrainedFixture,
  Eu as UnconstrainedTransformer,
  vc as UndefinedGenerator,
  bc as UnionGenerator,
  kc as UnknownGenerator,
  uc as UrlGenerator,
  cc as UuidGenerator,
  zc as VoidGenerator,
  Nc as createFixture
};
