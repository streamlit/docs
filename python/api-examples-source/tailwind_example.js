/**
 * Minified by jsDelivr using Terser v5.39.0.
 * Original file: /npm/@tailwindcss/browser@4.1.16/dist/index.global.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
"use strict";
(() => {
  var e = 10;
  function t(t, a) {
    let i = a?.from ? { file: a.from, code: t } : null;
    "\ufeff" === t[0] && (t = " " + t.slice(1));
    let l,
      s = [],
      c = [],
      u = [],
      d = null,
      f = null,
      p = "",
      h = "",
      m = 0;
    for (let a = 0; a < t.length; a++) {
      let g = t.charCodeAt(a);
      if (13 !== g || ((l = t.charCodeAt(a + 1)), l !== e))
        if (92 === g) ("" === p && (m = a), (p += t.slice(a, a + 2)), (a += 1));
        else if (47 === g && 42 === t.charCodeAt(a + 1)) {
          let e = a;
          for (let e = a + 2; e < t.length; e++)
            if (((l = t.charCodeAt(e)), 92 === l)) e += 1;
            else if (42 === l && 47 === t.charCodeAt(e + 1)) {
              a = e + 1;
              break;
            }
          let r = t.slice(e, a + 1);
          if (33 === r.charCodeAt(2)) {
            let t = C(r.slice(2, -2));
            (c.push(t),
              i && ((t.src = [i, e, a + 1]), (t.dst = [i, e, a + 1])));
          }
        } else if (39 === g || 34 === g) {
          let e = o(t, a, g);
          ((p += t.slice(a, e + 1)), (a = e));
        } else {
          if (
            (32 === g || g === e || 9 === g) &&
            (l = t.charCodeAt(a + 1)) &&
            (32 === l ||
              l === e ||
              9 === l ||
              (13 === l && (l = t.charCodeAt(a + 2)) && l == e))
          )
            continue;
          if (g === e) {
            if (0 === p.length) continue;
            ((l = p.charCodeAt(p.length - 1)),
              32 !== l && l !== e && 9 !== l && (p += " "));
          } else if (45 === g && 45 === t.charCodeAt(a + 1) && 0 === p.length) {
            let e = "",
              r = a,
              c = -1;
            for (let n = a + 2; n < t.length; n++)
              if (((l = t.charCodeAt(n)), 92 === l)) n += 1;
              else if (39 === l || 34 === l) n = o(t, n, l);
              else if (47 === l && 42 === t.charCodeAt(n + 1)) {
                for (let e = n + 2; e < t.length; e++)
                  if (((l = t.charCodeAt(e)), 92 === l)) e += 1;
                  else if (42 === l && 47 === t.charCodeAt(e + 1)) {
                    n = e + 1;
                    break;
                  }
              } else if (-1 === c && 58 === l) c = p.length + n - r;
              else {
                if (59 === l && 0 === e.length) {
                  ((p += t.slice(r, n)), (a = n));
                  break;
                }
                if (40 === l) e += ")";
                else if (91 === l) e += "]";
                else if (123 === l) e += "}";
                else {
                  if ((125 === l || t.length - 1 === n) && 0 === e.length) {
                    ((a = n - 1), (p += t.slice(r, n)));
                    break;
                  }
                  (41 === l || 93 === l || 125 === l) &&
                    e.length > 0 &&
                    t[n] === e[e.length - 1] &&
                    (e = e.slice(0, -1));
                }
              }
            let u = n(p, c);
            if (!u)
              throw new Error("Invalid custom property, expected a value");
            (i && ((u.src = [i, r, a]), (u.dst = [i, r, a])),
              d ? d.nodes.push(u) : s.push(u),
              (p = ""));
          } else if (59 === g && 64 === p.charCodeAt(0))
            ((f = r(p)),
              i && ((f.src = [i, m, a]), (f.dst = [i, m, a])),
              d ? d.nodes.push(f) : s.push(f),
              (p = ""),
              (f = null));
          else if (59 === g && ")" !== h[h.length - 1]) {
            let e = n(p);
            if (!e) {
              if (0 === p.length) continue;
              throw new Error(`Invalid declaration: \`${p.trim()}\``);
            }
            (i && ((e.src = [i, m, a]), (e.dst = [i, m, a])),
              d ? d.nodes.push(e) : s.push(e),
              (p = ""));
          } else if (123 === g && ")" !== h[h.length - 1])
            ((h += "}"),
              (f = z(p.trim())),
              i && ((f.src = [i, m, a]), (f.dst = [i, m, a])),
              d && d.nodes.push(f),
              u.push(d),
              (d = f),
              (p = ""),
              (f = null));
          else if (125 === g && ")" !== h[h.length - 1]) {
            if ("" === h) throw new Error("Missing opening {");
            if (((h = h.slice(0, -1)), p.length > 0))
              if (64 === p.charCodeAt(0))
                ((f = r(p)),
                  i && ((f.src = [i, m, a]), (f.dst = [i, m, a])),
                  d ? d.nodes.push(f) : s.push(f),
                  (p = ""),
                  (f = null));
              else {
                let e = p.indexOf(":");
                if (d) {
                  let t = n(p, e);
                  if (!t)
                    throw new Error(`Invalid declaration: \`${p.trim()}\``);
                  (i && ((t.src = [i, m, a]), (t.dst = [i, m, a])),
                    d.nodes.push(t));
                }
              }
            let e = u.pop() ?? null;
            (null === e && d && s.push(d), (d = e), (p = ""), (f = null));
          } else if (40 === g) ((h += ")"), (p += "("));
          else if (41 === g) {
            if (")" !== h[h.length - 1]) throw new Error("Missing opening (");
            ((h = h.slice(0, -1)), (p += ")"));
          } else {
            if (0 === p.length && (32 === g || g === e || 9 === g)) continue;
            ("" === p && (m = a), (p += String.fromCharCode(g)));
          }
        }
    }
    if (64 === p.charCodeAt(0)) {
      let e = r(p);
      (i && ((e.src = [i, m, t.length]), (e.dst = [i, m, t.length])),
        s.push(e));
    }
    if (h.length > 0 && d) {
      if ("rule" === d.kind)
        throw new Error(`Missing closing } at ${d.selector}`);
      if ("at-rule" === d.kind)
        throw new Error(`Missing closing } at ${d.name} ${d.params}`);
    }
    return c.length > 0 ? c.concat(s) : s;
  }
  function r(e, t = []) {
    let r = e,
      n = "";
    for (let t = 5; t < e.length; t++) {
      let o = e.charCodeAt(t);
      if (32 === o || 9 === o || 40 === o) {
        ((r = e.slice(0, t)), (n = e.slice(t)));
        break;
      }
    }
    return A(r.trim(), n.trim(), t);
  }
  function n(e, t = e.indexOf(":")) {
    if (-1 === t) return null;
    let r = e.indexOf("!important", t + 1);
    return S(
      e.slice(0, t).trim(),
      e.slice(t + 1, -1 === r ? e.length : r).trim(),
      -1 !== r,
    );
  }
  function o(t, r, n) {
    let o;
    for (let a = r + 1; a < t.length; a++)
      if (((o = t.charCodeAt(a)), 92 === o)) a += 1;
      else {
        if (o === n) return a;
        if (
          59 === o &&
          (t.charCodeAt(a + 1) === e ||
            (13 === t.charCodeAt(a + 1) && t.charCodeAt(a + 2) === e))
        )
          throw new Error(
            `Unterminated string: ${t.slice(r, a + 1) + String.fromCharCode(n)}`,
          );
        if (o === e || (13 === o && t.charCodeAt(a + 1) === e))
          throw new Error(
            `Unterminated string: ${t.slice(r, a) + String.fromCharCode(n)}`,
          );
      }
    return r;
  }
  function a(e) {
    if (0 === arguments.length)
      throw new TypeError("`CSS.escape` requires an argument.");
    let t,
      r = String(e),
      n = r.length,
      o = -1,
      a = "",
      i = r.charCodeAt(0);
    if (1 === n && 45 === i) return "\\" + r;
    for (; ++o < n; )
      ((t = r.charCodeAt(o)),
        (a +=
          0 !== t
            ? (t >= 1 && t <= 31) ||
              127 === t ||
              (0 === o && t >= 48 && t <= 57) ||
              (1 === o && t >= 48 && t <= 57 && 45 === i)
              ? "\\" + t.toString(16) + " "
              : t >= 128 ||
                  45 === t ||
                  95 === t ||
                  (t >= 48 && t <= 57) ||
                  (t >= 65 && t <= 90) ||
                  (t >= 97 && t <= 122)
                ? r.charAt(o)
                : "\\" + r.charAt(o)
            : "�"));
    return a;
  }
  function i(e) {
    return e.replace(/\\([\dA-Fa-f]{1,6}[\t\n\f\r ]?|[\S\s])/g, (e) =>
      e.length > 2
        ? String.fromCodePoint(Number.parseInt(e.slice(1).trim(), 16))
        : e[1],
    );
  }
  var l = new Map([
    ["--font", ["--font-weight", "--font-size"]],
    ["--inset", ["--inset-shadow", "--inset-ring"]],
    [
      "--text",
      [
        "--text-color",
        "--text-decoration-color",
        "--text-decoration-thickness",
        "--text-indent",
        "--text-shadow",
        "--text-underline-offset",
      ],
    ],
    ["--grid-column", ["--grid-column-start", "--grid-column-end"]],
    ["--grid-row", ["--grid-row-start", "--grid-row-end"]],
  ]);
  function s(e, t) {
    return (l.get(t) ?? []).some((t) => e === t || e.startsWith(`${t}-`));
  }
  var c = class {
      constructor(e = new Map(), t = new Set([])) {
        ((this.values = e), (this.keyframes = t));
      }
      prefix = null;
      get size() {
        return this.values.size;
      }
      add(e, t, r = 0, n) {
        if (e.endsWith("-*")) {
          if ("initial" !== t)
            throw new Error(
              `Invalid theme value \`${t}\` for namespace \`${e}\``,
            );
          "--*" === e
            ? this.values.clear()
            : this.clearNamespace(e.slice(0, -2), 0);
        }
        if (4 & r) {
          let t = this.values.get(e);
          if (t && !(4 & t.options)) return;
        }
        "initial" === t
          ? this.values.delete(e)
          : this.values.set(e, { value: t, options: r, src: n });
      }
      keysInNamespaces(e) {
        let t = [];
        for (let r of e) {
          let e = `${r}-`;
          for (let n of this.values.keys())
            n.startsWith(e) &&
              -1 === n.indexOf("--", 2) &&
              (s(n, r) || t.push(n.slice(e.length)));
        }
        return t;
      }
      get(e) {
        for (let t of e) {
          let e = this.values.get(t);
          if (e) return e.value;
        }
        return null;
      }
      hasDefault(e) {
        return !(4 & ~this.getOptions(e));
      }
      getOptions(e) {
        return ((e = i(this.#e(e))), this.values.get(e)?.options ?? 0);
      }
      entries() {
        return this.prefix
          ? Array.from(this.values, (e) => ((e[0] = this.prefixKey(e[0])), e))
          : this.values.entries();
      }
      prefixKey(e) {
        return this.prefix ? `--${this.prefix}-${e.slice(2)}` : e;
      }
      #e(e) {
        return this.prefix ? `--${e.slice(3 + this.prefix.length)}` : e;
      }
      clearNamespace(e, t) {
        let r = l.get(e) ?? [];
        e: for (let n of this.values.keys())
          if (n.startsWith(e)) {
            if (0 !== t && (this.getOptions(n) & t) !== t) continue;
            for (let e of r) if (n.startsWith(e)) continue e;
            this.values.delete(n);
          }
      }
      #t(e, t) {
        for (let r of t) {
          let t = null !== e ? `${r}-${e}` : r;
          if (!this.values.has(t)) {
            if (null === e || !e.includes(".")) continue;
            if (((t = `${r}-${e.replaceAll(".", "_")}`), !this.values.has(t)))
              continue;
          }
          if (!s(t, r)) return t;
        }
        return null;
      }
      #r(e) {
        let t = this.values.get(e);
        if (!t) return null;
        let r = null;
        return (
          2 & t.options && (r = t.value),
          `var(${a(this.prefixKey(e))}${r ? `, ${r}` : ""})`
        );
      }
      markUsedVariable(e) {
        let t = i(this.#e(e)),
          r = this.values.get(t);
        if (!r) return !1;
        let n = 16 & r.options;
        return ((r.options |= 16), !n);
      }
      resolve(e, t, r = 0) {
        let n = this.#t(e, t);
        if (!n) return null;
        let o = this.values.get(n);
        return 1 & (r | o.options) ? o.value : this.#r(n);
      }
      resolveValue(e, t) {
        let r = this.#t(e, t);
        return r ? this.values.get(r).value : null;
      }
      resolveWith(e, t, r = []) {
        let n = this.#t(e, t);
        if (!n) return null;
        let o = {};
        for (let e of r) {
          let t = `${n}${e}`,
            r = this.values.get(t);
          r && (1 & r.options ? (o[e] = r.value) : (o[e] = this.#r(t)));
        }
        let a = this.values.get(n);
        return 1 & a.options ? [a.value, o] : [this.#r(n), o];
      }
      namespace(e) {
        let t = new Map(),
          r = `${e}-`;
        for (let [n, o] of this.values)
          n === e
            ? t.set(null, o.value)
            : n.startsWith(`${r}-`)
              ? t.set(n.slice(e.length), o.value)
              : n.startsWith(r) && t.set(n.slice(r.length), o.value);
        return t;
      }
      addKeyframes(e) {
        this.keyframes.add(e);
      }
      getKeyframes() {
        return Array.from(this.keyframes);
      }
    },
    u = class extends Map {
      constructor(e) {
        (super(), (this.factory = e));
      }
      get(e) {
        let t = super.get(e);
        return (
          void 0 === t && ((t = this.factory(e, this)), this.set(e, t)),
          t
        );
      }
    };
  function d(e) {
    return { kind: "word", value: e };
  }
  function f(e, t) {
    return { kind: "function", value: e, nodes: t };
  }
  function p(e) {
    return { kind: "separator", value: e };
  }
  function h(e) {
    let t = "";
    for (let r of e)
      switch (r.kind) {
        case "word":
        case "separator":
          t += r.value;
          break;
        case "function":
          t += r.value + "(" + h(r.nodes) + ")";
      }
    return t;
  }
  function m(e) {
    e = e.replaceAll("\r\n", "\n");
    let t,
      r = [],
      n = [],
      o = null,
      a = "";
    for (let i = 0; i < e.length; i++) {
      let l = e.charCodeAt(i);
      switch (l) {
        case 92:
          ((a += e[i] + e[i + 1]), i++);
          break;
        case 47: {
          if (a.length > 0) {
            let e = d(a);
            (o ? o.nodes.push(e) : r.push(e), (a = ""));
          }
          let t = d(e[i]);
          o ? o.nodes.push(t) : r.push(t);
          break;
        }
        case 58:
        case 44:
        case 61:
        case 62:
        case 60:
        case 10:
        case 32:
        case 9: {
          if (a.length > 0) {
            let e = d(a);
            (o ? o.nodes.push(e) : r.push(e), (a = ""));
          }
          let n = i,
            l = i + 1;
          for (
            ;
            l < e.length &&
            ((t = e.charCodeAt(l)),
            58 === t ||
              44 === t ||
              61 === t ||
              62 === t ||
              60 === t ||
              10 === t ||
              32 === t ||
              9 === t);
            l++
          );
          i = l - 1;
          let s = p(e.slice(n, l));
          o ? o.nodes.push(s) : r.push(s);
          break;
        }
        case 39:
        case 34: {
          let r = i;
          for (let r = i + 1; r < e.length; r++)
            if (((t = e.charCodeAt(r)), 92 === t)) r += 1;
            else if (t === l) {
              i = r;
              break;
            }
          a += e.slice(r, i + 1);
          break;
        }
        case 40: {
          let e = f(a, []);
          ((a = ""), o ? o.nodes.push(e) : r.push(e), n.push(e), (o = e));
          break;
        }
        case 41: {
          let e = n.pop();
          if (a.length > 0) {
            let t = d(a);
            (e?.nodes.push(t), (a = ""));
          }
          o = n.length > 0 ? n[n.length - 1] : null;
          break;
        }
        default:
          a += String.fromCharCode(l);
      }
    }
    return (a.length > 0 && r.push(d(a)), r);
  }
  var g,
    v =
      (((g = v || {})[(g.Continue = 0)] = "Continue"),
      (g[(g.Skip = 1)] = "Skip"),
      (g[(g.Stop = 2)] = "Stop"),
      (g[(g.Replace = 3)] = "Replace"),
      (g[(g.ReplaceSkip = 4)] = "ReplaceSkip"),
      (g[(g.ReplaceStop = 5)] = "ReplaceStop"),
      g),
    w = {
      Continue: { kind: 0 },
      Skip: { kind: 1 },
      Stop: { kind: 2 },
      Replace: (e) => ({ kind: 3, nodes: Array.isArray(e) ? e : [e] }),
      ReplaceSkip: (e) => ({ kind: 4, nodes: Array.isArray(e) ? e : [e] }),
      ReplaceStop: (e) => ({ kind: 5, nodes: Array.isArray(e) ? e : [e] }),
    };
  function k(e, t) {
    "function" == typeof t ? b(e, t) : b(e, t.enter, t.exit);
  }
  function b(e, t = () => w.Continue, r = () => w.Continue) {
    let n = [[e, 0, null]],
      o = {
        parent: null,
        depth: 0,
        path() {
          let e = [];
          for (let t = 1; t < n.length; t++) {
            let r = n[t][2];
            r && e.push(r);
          }
          return e;
        },
      };
    for (; n.length > 0; ) {
      let e = n.length - 1,
        a = n[e],
        i = a[0],
        l = a[1],
        s = a[2];
      if (l >= i.length) {
        n.pop();
        continue;
      }
      if (((o.parent = s), (o.depth = e), l >= 0)) {
        let e = i[l],
          r = t(e, o) ?? w.Continue;
        switch (r.kind) {
          case 0:
            (e.nodes && e.nodes.length > 0 && n.push([e.nodes, 0, e]),
              (a[1] = ~l));
            continue;
          case 2:
            return;
          case 1:
            a[1] = ~l;
            continue;
          case 3:
            i.splice(l, 1, ...r.nodes);
            continue;
          case 5:
            return void i.splice(l, 1, ...r.nodes);
          case 4:
            (i.splice(l, 1, ...r.nodes), (a[1] += r.nodes.length));
            continue;
          default:
            throw new Error(
              `Invalid \`WalkAction.${v[r.kind] ?? `Unknown(${r.kind})`}\` in enter.`,
            );
        }
      }
      let c = ~l,
        u = r(i[c], o) ?? w.Continue;
      switch (u.kind) {
        case 0:
          a[1] = c + 1;
          continue;
        case 2:
          return;
        case 3:
        case 4:
          (i.splice(c, 1, ...u.nodes), (a[1] = c + u.nodes.length));
          continue;
        case 5:
          return void i.splice(c, 1, ...u.nodes);
        default:
          throw new Error(
            `Invalid \`WalkAction.${v[u.kind] ?? `Unknown(${u.kind})`}\` in exit.`,
          );
      }
    }
  }
  function y(e) {
    let t = [];
    return (
      k(m(e), (e) => {
        if ("function" === e.kind && "var" === e.value)
          return (
            k(e.nodes, (e) => {
              "word" !== e.kind ||
                "-" !== e.value[0] ||
                "-" !== e.value[1] ||
                t.push(e.value);
            }),
            w.Skip
          );
      }),
      t
    );
  }
  var x = 64;
  function $(e, t = []) {
    return { kind: "rule", selector: e, nodes: t };
  }
  function A(e, t = "", r = []) {
    return { kind: "at-rule", name: e, params: t, nodes: r };
  }
  function z(e, t = []) {
    return e.charCodeAt(0) === x ? r(e, t) : $(e, t);
  }
  function S(e, t, r = !1) {
    return { kind: "declaration", property: e, value: t, important: r };
  }
  function C(e) {
    return { kind: "comment", value: e };
  }
  function j(e, t) {
    return { kind: "context", context: e, nodes: t };
  }
  function T(e) {
    return { kind: "at-root", nodes: e };
  }
  function V(e) {
    switch (e.kind) {
      case "rule":
        return {
          kind: e.kind,
          selector: e.selector,
          nodes: e.nodes.map(V),
          src: e.src,
          dst: e.dst,
        };
      case "at-rule":
        return {
          kind: e.kind,
          name: e.name,
          params: e.params,
          nodes: e.nodes.map(V),
          src: e.src,
          dst: e.dst,
        };
      case "at-root":
        return { kind: e.kind, nodes: e.nodes.map(V), src: e.src, dst: e.dst };
      case "context":
        return {
          kind: e.kind,
          context: { ...e.context },
          nodes: e.nodes.map(V),
          src: e.src,
          dst: e.dst,
        };
      case "declaration":
        return {
          kind: e.kind,
          property: e.property,
          value: e.value,
          important: e.important,
          src: e.src,
          dst: e.dst,
        };
      case "comment":
        return { kind: e.kind, value: e.value, src: e.src, dst: e.dst };
      default:
        throw new Error(`Unknown node kind: ${e.kind}`);
    }
  }
  function K(e) {
    return {
      depth: e.depth,
      get context() {
        let t = {};
        for (let r of e.path())
          "context" === r.kind && Object.assign(t, r.context);
        return (Object.defineProperty(this, "context", { value: t }), t);
      },
      get parent() {
        let e = this.path().pop() ?? null;
        return (Object.defineProperty(this, "parent", { value: e }), e);
      },
      path: () => e.path().filter((e) => "context" !== e.kind),
    };
  }
  function E(e, t, r = 3) {
    let n = [],
      o = new Set(),
      a = new u(() => new Set()),
      i = new u(() => new Set()),
      l = new Set(),
      s = new Set(),
      c = [],
      d = [],
      f = new u(() => new Set());
    function p(e, u, h = {}, m = 0) {
      if ("declaration" === e.kind) {
        if (
          "--tw-sort" === e.property ||
          void 0 === e.value ||
          null === e.value
        )
          return;
        if (h.theme && "-" === e.property[0] && "-" === e.property[1]) {
          if ("initial" === e.value) return void (e.value = void 0);
          h.keyframes || a.get(u).add(e);
        }
        if (e.value.includes("var("))
          if (h.theme && "-" === e.property[0] && "-" === e.property[1])
            for (let t of y(e.value)) f.get(t).add(e.property);
          else t.trackUsedVariables(e.value);
        if ("animation" === e.property) for (let t of U(e.value)) s.add(t);
        (2 & r && e.value.includes("color-mix(") && i.get(u).add(e), u.push(e));
      } else if ("rule" === e.kind) {
        let t = [];
        for (let r of e.nodes) p(r, t, h, m + 1);
        let r = {},
          n = new Set();
        for (let e of t) {
          if ("declaration" !== e.kind) continue;
          let t = `${e.property}:${e.value}:${e.important}`;
          ((r[t] ??= []), r[t].push(e));
        }
        for (let e in r)
          for (let t = 0; t < r[e].length - 1; ++t) n.add(r[e][t]);
        if ((n.size > 0 && (t = t.filter((e) => !n.has(e))), 0 === t.length))
          return;
        "&" === e.selector ? u.push(...t) : u.push({ ...e, nodes: t });
      } else if ("at-rule" === e.kind && "@property" === e.name && 0 === m) {
        if (o.has(e.params)) return;
        if (1 & r) {
          let t = e.params,
            r = null,
            n = !1;
          for (let t of e.nodes)
            "declaration" === t.kind &&
              ("initial-value" === t.property
                ? (r = t.value)
                : "inherits" === t.property && (n = "true" === t.value));
          let o = S(t, r ?? "initial");
          ((o.src = e.src), n ? c.push(o) : d.push(o));
        }
        o.add(e.params);
        let t = { ...e, nodes: [] };
        for (let r of e.nodes) p(r, t.nodes, h, m + 1);
        u.push(t);
      } else if ("at-rule" === e.kind) {
        "@keyframes" === e.name && (h = { ...h, keyframes: !0 });
        let t = { ...e, nodes: [] };
        for (let r of e.nodes) p(r, t.nodes, h, m + 1);
        ("@keyframes" === e.name && h.theme && l.add(t),
          (t.nodes.length > 0 ||
            "@layer" === t.name ||
            "@charset" === t.name ||
            "@custom-media" === t.name ||
            "@namespace" === t.name ||
            "@import" === t.name) &&
            u.push(t));
      } else if ("at-root" === e.kind)
        for (let t of e.nodes) {
          let e = [];
          p(t, e, h, 0);
          for (let t of e) n.push(t);
        }
      else if ("context" === e.kind) {
        if (e.context.reference) return;
        for (let t of e.nodes) p(t, u, { ...h, ...e.context }, m);
      } else "comment" === e.kind && u.push(e);
    }
    let g = [];
    for (let t of e) p(t, g, {}, 0);
    e: for (let [e, r] of a)
      for (let n of r) {
        if (F(n.property, t.theme, f)) {
          if (n.property.startsWith(t.theme.prefixKey("--animate-")))
            for (let e of U(n.value)) s.add(e);
          continue;
        }
        let r = e.indexOf(n);
        if ((e.splice(r, 1), 0 === e.length)) {
          let t = O(g, (t) => "rule" === t.kind && t.nodes === e);
          if (!t || 0 === t.length) continue e;
          for (t.unshift({ kind: "at-root", nodes: g }); ; ) {
            let e = t.pop();
            if (!e) break;
            let r = t[t.length - 1];
            if (!r || ("at-root" !== r.kind && "at-rule" !== r.kind)) break;
            let n = r.nodes.indexOf(e);
            if (-1 === n) break;
            r.nodes.splice(n, 1);
          }
          continue e;
        }
      }
    for (let e of l)
      if (!s.has(e.params)) {
        let t = n.indexOf(e);
        n.splice(t, 1);
      }
    if (((g = g.concat(n)), 2 & r))
      for (let [e, r] of i)
        for (let n of r) {
          let r = e.indexOf(n);
          if (-1 === r || null == n.value) continue;
          let o = m(n.value),
            a = !1;
          if (
            (k(o, (e) => {
              if ("function" !== e.kind || "color-mix" !== e.value) return;
              let r = !1,
                n = !1;
              if (
                (k(e.nodes, (e) => {
                  if (
                    "word" == e.kind &&
                    "currentcolor" === e.value.toLowerCase()
                  )
                    return ((n = !0), void (a = !0));
                  let o = e,
                    i = null,
                    l = new Set();
                  do {
                    if ("function" !== o.kind || "var" !== o.value) return;
                    let e = o.nodes[0];
                    if (!e || "word" !== e.kind) return;
                    let s = e.value;
                    if (l.has(s)) return void (r = !0);
                    if (
                      (l.add(s),
                      (a = !0),
                      (i = t.theme.resolveValue(null, [e.value])),
                      !i)
                    )
                      return void (r = !0);
                    if ("currentcolor" === i.toLowerCase())
                      return void (n = !0);
                    o = i.startsWith("var(") ? m(i)[0] : null;
                  } while (o);
                  return w.Replace({ kind: "word", value: i });
                }),
                r || n)
              ) {
                let t = e.nodes.findIndex(
                  (e) => "separator" === e.kind && e.value.trim().includes(","),
                );
                if (-1 === t) return;
                let r = e.nodes.length > t ? e.nodes[t + 1] : null;
                return r ? w.Replace(r) : void 0;
              }
              if (a) {
                let t = e.nodes[2];
                "word" === t.kind &&
                  ("oklab" === t.value ||
                    "oklch" === t.value ||
                    "lab" === t.value ||
                    "lch" === t.value) &&
                  (t.value = "srgb");
              }
            }),
            !a)
          )
            continue;
          let i = { ...n, value: h(o) },
            l = z("@supports (color: color-mix(in lab, red, red))", [n]);
          ((l.src = n.src), e.splice(r, 1, i, l));
        }
    if (1 & r) {
      let e = [];
      if (c.length > 0) {
        let t = z(":root, :host", c);
        ((t.src = c[0].src), e.push(t));
      }
      if (d.length > 0) {
        let t = z("*, ::before, ::after, ::backdrop", d);
        ((t.src = d[0].src), e.push(t));
      }
      if (e.length > 0) {
        let t = g.findIndex(
            (e) =>
              !(
                "comment" === e.kind ||
                ("at-rule" === e.kind &&
                  ("@charset" === e.name || "@import" === e.name))
              ),
          ),
          r = A("@layer", "properties", []);
        ((r.src = e[0].src), g.splice(t < 0 ? g.length : t, 0, r));
        let n = z("@layer properties", [
          A(
            "@supports",
            "((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b))))",
            e,
          ),
        ]);
        ((n.src = e[0].src), (n.nodes[0].src = e[0].src), g.push(n));
      }
    }
    return g;
  }
  function N(e, t) {
    let r = 0,
      n = { file: null, code: "" };
    function o(e, a = 0) {
      let i = "",
        l = "  ".repeat(a);
      if ("declaration" === e.kind) {
        if (
          ((i += `${l}${e.property}: ${e.value}${e.important ? " !important" : ""};\n`),
          t)
        ) {
          r += l.length;
          let t = r;
          ((r += e.property.length),
            (r += 2),
            (r += e.value?.length ?? 0),
            e.important && (r += 11));
          let o = r;
          ((r += 2), (e.dst = [n, t, o]));
        }
      } else if ("rule" === e.kind) {
        if (((i += `${l}${e.selector} {\n`), t)) {
          r += l.length;
          let t = r;
          ((r += e.selector.length), (r += 1));
          let o = r;
          ((e.dst = [n, t, o]), (r += 2));
        }
        for (let t of e.nodes) i += o(t, a + 1);
        ((i += `${l}}\n`), t && ((r += l.length), (r += 2)));
      } else if ("at-rule" === e.kind) {
        if (0 === e.nodes.length) {
          let o = `${l}${e.name} ${e.params};\n`;
          if (t) {
            r += l.length;
            let t = r;
            ((r += e.name.length), (r += 1), (r += e.params.length));
            let o = r;
            ((r += 2), (e.dst = [n, t, o]));
          }
          return o;
        }
        if (((i += `${l}${e.name}${e.params ? ` ${e.params} ` : " "}{\n`), t)) {
          r += l.length;
          let t = r;
          ((r += e.name.length),
            e.params && ((r += 1), (r += e.params.length)),
            (r += 1));
          let o = r;
          ((e.dst = [n, t, o]), (r += 2));
        }
        for (let t of e.nodes) i += o(t, a + 1);
        ((i += `${l}}\n`), t && ((r += l.length), (r += 2)));
      } else if ("comment" === e.kind) {
        if (((i += `${l}/*${e.value}*/\n`), t)) {
          r += l.length;
          let t = r;
          r += 2 + e.value.length + 2;
          let o = r;
          ((e.dst = [n, t, o]), (r += 1));
        }
      } else if ("context" === e.kind || "at-root" === e.kind) return "";
      return i;
    }
    let a = "";
    for (let t of e) a += o(t, 0);
    return ((n.code = a), a);
  }
  function O(e, t) {
    let r = [];
    return (
      k(e, (e, n) => {
        if (t(e)) return ((r = n.path()), r.push(e), w.Stop);
      }),
      r
    );
  }
  function F(e, t, r, n = new Set()) {
    if (n.has(e) || (n.add(e), 24 & t.getOptions(e))) return !0;
    {
      let o = r.get(e) ?? [];
      for (let e of o) if (F(e, t, r, n)) return !0;
    }
    return !1;
  }
  function U(e) {
    return e.split(/[\s,]+/);
  }
  var W = [
    "calc",
    "min",
    "max",
    "clamp",
    "mod",
    "rem",
    "sin",
    "cos",
    "tan",
    "asin",
    "acos",
    "atan",
    "atan2",
    "pow",
    "sqrt",
    "hypot",
    "log",
    "exp",
    "round",
  ];
  function R(e) {
    return -1 !== e.indexOf("(") && W.some((t) => e.includes(`${t}(`));
  }
  function D(e) {
    if (-1 === e.indexOf("(")) return _(e);
    let t = m(e);
    return (
      L(t),
      (e = (function (e) {
        if (!W.some((t) => e.includes(t))) return e;
        let t = "",
          r = [],
          n = null,
          o = null;
        for (let a = 0; a < e.length; a++) {
          let i = e.charCodeAt(a);
          if (
            ((i >= 48 && i <= 57) ||
            (null !== n &&
              (37 === i || (i >= 97 && i <= 122) || (i >= 65 && i <= 90)))
              ? (n = a)
              : ((o = n), (n = null)),
            40 !== i)
          )
            if (41 === i) ((t += e[a]), r.shift());
            else {
              if (44 === i && r[0]) {
                t += ", ";
                continue;
              }
              if (32 === i && r[0] && 32 === t.charCodeAt(t.length - 1))
                continue;
              if ((43 !== i && 42 !== i && 47 !== i && 45 !== i) || !r[0])
                t += e[a];
              else {
                let r = t.trimEnd(),
                  n = r.charCodeAt(r.length - 1),
                  i = r.charCodeAt(r.length - 2),
                  l = e.charCodeAt(a + 1);
                if ((101 === n || 69 === n) && i >= 48 && i <= 57) {
                  t += e[a];
                  continue;
                }
                if (43 === n || 42 === n || 47 === n || 45 === n) {
                  t += e[a];
                  continue;
                }
                if (40 === n || 44 === n) {
                  t += e[a];
                  continue;
                }
                32 === e.charCodeAt(a - 1)
                  ? (t += `${e[a]} `)
                  : (t +=
                      (n >= 48 && n <= 57) ||
                      (l >= 48 && l <= 57) ||
                      41 === n ||
                      40 === l ||
                      43 === l ||
                      42 === l ||
                      47 === l ||
                      45 === l ||
                      (null !== o && o === a - 1)
                        ? ` ${e[a]} `
                        : e[a]);
              }
            }
          else {
            t += e[a];
            let n = a;
            for (let t = a - 1; t >= 0; t--) {
              let r = e.charCodeAt(t);
              if (r >= 48 && r <= 57) n = t;
              else {
                if (!(r >= 97 && r <= 122)) break;
                n = t;
              }
            }
            let o = e.slice(n, a);
            if (W.includes(o)) {
              r.unshift(!0);
              continue;
            }
            if (r[0] && "" === o) {
              r.unshift(!0);
              continue;
            }
            r.unshift(!1);
          }
        }
        return t;
      })((e = h(t)))),
      e
    );
  }
  function _(e, t = !1) {
    let r = "";
    for (let n = 0; n < e.length; n++) {
      let o = e[n];
      "\\" === o && "_" === e[n + 1]
        ? ((r += "_"), (n += 1))
        : (r += "_" !== o || t ? o : " ");
    }
    return r;
  }
  function L(e) {
    for (let t of e)
      switch (t.kind) {
        case "function":
          if ("url" === t.value || t.value.endsWith("_url")) {
            t.value = _(t.value);
            break;
          }
          if (
            "var" === t.value ||
            t.value.endsWith("_var") ||
            "theme" === t.value ||
            t.value.endsWith("_theme")
          ) {
            t.value = _(t.value);
            for (let e = 0; e < t.nodes.length; e++)
              0 != e || "word" !== t.nodes[e].kind
                ? L([t.nodes[e]])
                : (t.nodes[e].value = _(t.nodes[e].value, !0));
            break;
          }
          ((t.value = _(t.value)), L(t.nodes));
          break;
        case "separator":
        case "word":
          t.value = _(t.value);
          break;
        default:
          M(t);
      }
  }
  function M(e) {
    throw new Error(`Unexpected value: ${e}`);
  }
  var B = new Uint8Array(256);
  function I(e) {
    let t = 0,
      r = e.length;
    for (let n = 0; n < r; n++) {
      let o = e.charCodeAt(n);
      switch (o) {
        case 92:
          n += 1;
          break;
        case 39:
        case 34:
          for (; ++n < r; ) {
            let t = e.charCodeAt(n);
            if (92 !== t) {
              if (t === o) break;
            } else n += 1;
          }
          break;
        case 40:
          ((B[t] = 41), t++);
          break;
        case 91:
          ((B[t] = 93), t++);
          break;
        case 123:
          break;
        case 93:
        case 125:
        case 41:
          if (0 === t) return !1;
          t > 0 && o === B[t - 1] && t--;
          break;
        case 59:
          if (0 === t) return !1;
      }
    }
    return !0;
  }
  var P = new Uint8Array(256);
  function q(e, t) {
    let r = 0,
      n = [],
      o = 0,
      a = e.length,
      i = t.charCodeAt(0);
    for (let t = 0; t < a; t++) {
      let l = e.charCodeAt(t);
      if (0 !== r || l !== i)
        switch (l) {
          case 92:
            t += 1;
            break;
          case 39:
          case 34:
            for (; ++t < a; ) {
              let r = e.charCodeAt(t);
              if (92 !== r) {
                if (r === l) break;
              } else t += 1;
            }
            break;
          case 40:
            ((P[r] = 41), r++);
            break;
          case 91:
            ((P[r] = 93), r++);
            break;
          case 123:
            ((P[r] = 125), r++);
            break;
          case 93:
          case 125:
          case 41:
            r > 0 && l === P[r - 1] && r--;
        }
      else (n.push(e.slice(o, t)), (o = t + 1));
    }
    return (n.push(e.slice(o)), n);
  }
  function H(e) {
    if ("[" === e[0] && "]" === e[e.length - 1]) {
      let t = D(e.slice(1, -1));
      return I(t) && 0 !== t.length && 0 !== t.trim().length
        ? { kind: "arbitrary", value: t }
        : null;
    }
    return "(" === e[0] && ")" === e[e.length - 1]
      ? "-" === (e = e.slice(1, -1))[0] && "-" === e[1] && I(e)
        ? { kind: "arbitrary", value: D((e = `var(${e})`)) }
        : null
      : { kind: "named", value: e };
  }
  function* Z(e, t) {
    t(e) && (yield [e, null]);
    let r = e.lastIndexOf("-");
    for (; r > 0; ) {
      let n = e.slice(0, r);
      if (t(n)) {
        let o = [n, e.slice(r + 1)];
        if ("" === o[1] || ("@" === o[0] && t("@") && "-" === e[r])) break;
        yield o;
      }
      r = e.lastIndexOf("-", r - 1);
    }
    "@" === e[0] && t("@") && (yield ["@", e.slice(1)]);
  }
  function Y(e) {
    if (null === e) return "";
    let t = re(e.value),
      r = t ? e.value.slice(4, -1) : e.value,
      [n, o] = t ? ["(", ")"] : ["[", "]"];
    return "arbitrary" === e.kind
      ? `/${n}${X(r)}${o}`
      : "named" === e.kind
        ? `/${e.value}`
        : "";
  }
  function G(e) {
    if ("static" === e.kind) return e.root;
    if ("arbitrary" === e.kind)
      return `[${X(
        (function (e) {
          return Q.get(e);
        })(e.selector),
      )}]`;
    let t = "";
    if ("functional" === e.kind) {
      t += e.root;
      let r = "@" !== e.root;
      if (e.value)
        if ("arbitrary" === e.value.kind) {
          let n = re(e.value.value),
            o = n ? e.value.value.slice(4, -1) : e.value.value,
            [a, i] = n ? ["(", ")"] : ["[", "]"];
          t += `${r ? "-" : ""}${a}${X(o)}${i}`;
        } else
          "named" === e.value.kind && (t += `${r ? "-" : ""}${e.value.value}`);
    }
    return (
      "compound" === e.kind && ((t += e.root), (t += "-"), (t += G(e.variant))),
      ("functional" === e.kind || "compound" === e.kind) &&
        (t += Y(e.modifier)),
      t
    );
  }
  var J = new u((e) => {
    let t = m(e),
      r = new Set();
    return (
      k(t, (e, n) => {
        let o = null === n.parent ? t : (n.parent.nodes ?? []);
        if (
          "word" !== e.kind ||
          ("+" !== e.value &&
            "-" !== e.value &&
            "*" !== e.value &&
            "/" !== e.value)
        )
          "separator" === e.kind && e.value.length > 0 && "" === e.value.trim()
            ? (o[0] === e || o[o.length - 1] === e) && r.add(e)
            : "separator" === e.kind &&
              "," === e.value.trim() &&
              (e.value = ",");
        else {
          let t = o.indexOf(e) ?? -1;
          if (-1 === t) return;
          let n = o[t - 1];
          if ("separator" !== n?.kind || " " !== n.value) return;
          let a = o[t + 1];
          if ("separator" !== a?.kind || " " !== a.value) return;
          (r.add(n), r.add(a));
        }
      }),
      r.size > 0 &&
        k(t, (e) => {
          if (r.has(e)) return (r.delete(e), w.ReplaceSkip([]));
        }),
      ee(t),
      h(t)
    );
  });
  function X(e) {
    return J.get(e);
  }
  var Q = new u((e) => {
    let t = m(e);
    return 3 === t.length &&
      "word" === t[0].kind &&
      "&" === t[0].value &&
      "separator" === t[1].kind &&
      ":" === t[1].value &&
      "function" === t[2].kind &&
      "is" === t[2].value
      ? h(t[2].nodes)
      : e;
  });
  function ee(e) {
    for (let t of e)
      switch (t.kind) {
        case "function":
          if ("url" === t.value || t.value.endsWith("_url")) {
            t.value = oe(t.value);
            break;
          }
          if (
            "var" === t.value ||
            t.value.endsWith("_var") ||
            "theme" === t.value ||
            t.value.endsWith("_theme")
          ) {
            t.value = oe(t.value);
            for (let e = 0; e < t.nodes.length; e++) ee([t.nodes[e]]);
            break;
          }
          ((t.value = oe(t.value)), ee(t.nodes));
          break;
        case "separator":
          t.value = oe(t.value);
          break;
        case "word":
          ("-" !== t.value[0] || "-" !== t.value[1]) && (t.value = oe(t.value));
          break;
        default:
          ne(t);
      }
  }
  var te = new u((e) => {
    let t = m(e);
    return 1 === t.length && "function" === t[0].kind && "var" === t[0].value;
  });
  function re(e) {
    return te.get(e);
  }
  function ne(e) {
    throw new Error(`Unexpected value: ${e}`);
  }
  function oe(e) {
    return e.replaceAll("_", String.raw`\_`).replaceAll(" ", "_");
  }
  function ae(e, t, r) {
    if (e === t) return 0;
    let n = e.indexOf("("),
      o = t.indexOf("("),
      a = -1 === n ? e.replace(/[\d.]+/g, "") : e.slice(0, n),
      i = -1 === o ? t.replace(/[\d.]+/g, "") : t.slice(0, o),
      l =
        (a === i ? 0 : a < i ? -1 : 1) ||
        ("asc" === r ? parseInt(e) - parseInt(t) : parseInt(t) - parseInt(e));
    return Number.isNaN(l) ? (e < t ? -1 : 1) : l;
  }
  var ie = new Set([
      "black",
      "silver",
      "gray",
      "white",
      "maroon",
      "red",
      "purple",
      "fuchsia",
      "green",
      "lime",
      "olive",
      "yellow",
      "navy",
      "blue",
      "teal",
      "aqua",
      "aliceblue",
      "antiquewhite",
      "aqua",
      "aquamarine",
      "azure",
      "beige",
      "bisque",
      "black",
      "blanchedalmond",
      "blue",
      "blueviolet",
      "brown",
      "burlywood",
      "cadetblue",
      "chartreuse",
      "chocolate",
      "coral",
      "cornflowerblue",
      "cornsilk",
      "crimson",
      "cyan",
      "darkblue",
      "darkcyan",
      "darkgoldenrod",
      "darkgray",
      "darkgreen",
      "darkgrey",
      "darkkhaki",
      "darkmagenta",
      "darkolivegreen",
      "darkorange",
      "darkorchid",
      "darkred",
      "darksalmon",
      "darkseagreen",
      "darkslateblue",
      "darkslategray",
      "darkslategrey",
      "darkturquoise",
      "darkviolet",
      "deeppink",
      "deepskyblue",
      "dimgray",
      "dimgrey",
      "dodgerblue",
      "firebrick",
      "floralwhite",
      "forestgreen",
      "fuchsia",
      "gainsboro",
      "ghostwhite",
      "gold",
      "goldenrod",
      "gray",
      "green",
      "greenyellow",
      "grey",
      "honeydew",
      "hotpink",
      "indianred",
      "indigo",
      "ivory",
      "khaki",
      "lavender",
      "lavenderblush",
      "lawngreen",
      "lemonchiffon",
      "lightblue",
      "lightcoral",
      "lightcyan",
      "lightgoldenrodyellow",
      "lightgray",
      "lightgreen",
      "lightgrey",
      "lightpink",
      "lightsalmon",
      "lightseagreen",
      "lightskyblue",
      "lightslategray",
      "lightslategrey",
      "lightsteelblue",
      "lightyellow",
      "lime",
      "limegreen",
      "linen",
      "magenta",
      "maroon",
      "mediumaquamarine",
      "mediumblue",
      "mediumorchid",
      "mediumpurple",
      "mediumseagreen",
      "mediumslateblue",
      "mediumspringgreen",
      "mediumturquoise",
      "mediumvioletred",
      "midnightblue",
      "mintcream",
      "mistyrose",
      "moccasin",
      "navajowhite",
      "navy",
      "oldlace",
      "olive",
      "olivedrab",
      "orange",
      "orangered",
      "orchid",
      "palegoldenrod",
      "palegreen",
      "paleturquoise",
      "palevioletred",
      "papayawhip",
      "peachpuff",
      "peru",
      "pink",
      "plum",
      "powderblue",
      "purple",
      "rebeccapurple",
      "red",
      "rosybrown",
      "royalblue",
      "saddlebrown",
      "salmon",
      "sandybrown",
      "seagreen",
      "seashell",
      "sienna",
      "silver",
      "skyblue",
      "slateblue",
      "slategray",
      "slategrey",
      "snow",
      "springgreen",
      "steelblue",
      "tan",
      "teal",
      "thistle",
      "tomato",
      "turquoise",
      "violet",
      "wheat",
      "white",
      "whitesmoke",
      "yellow",
      "yellowgreen",
      "transparent",
      "currentcolor",
      "canvas",
      "canvastext",
      "linktext",
      "visitedtext",
      "activetext",
      "buttonface",
      "buttontext",
      "buttonborder",
      "field",
      "fieldtext",
      "highlight",
      "highlighttext",
      "selecteditem",
      "selecteditemtext",
      "mark",
      "marktext",
      "graytext",
      "accentcolor",
      "accentcolortext",
    ]),
    le = /^(rgba?|hsla?|hwb|color|(ok)?(lab|lch)|light-dark|color-mix)\(/i;
  var se = {
    color: function (e) {
      return 35 === e.charCodeAt(0) || le.test(e) || ie.has(e.toLowerCase());
    },
    length: ye,
    percentage: we,
    ratio: function (e) {
      return ke.test(e) || R(e);
    },
    number: ge,
    integer: Ae,
    url: de,
    position: function (e) {
      let t = 0;
      for (let r of q(e, " "))
        if (
          "center" !== r &&
          "top" !== r &&
          "right" !== r &&
          "bottom" !== r &&
          "left" !== r
        ) {
          if (!r.startsWith("var(")) {
            if (ye(r) || we(r)) {
              t += 1;
              continue;
            }
            return !1;
          }
        } else t += 1;
      return t > 0;
    },
    "bg-size": function (e) {
      let t = 0;
      for (let r of q(e, ",")) {
        if ("cover" === r || "contain" === r) {
          t += 1;
          continue;
        }
        let e = q(r, " ");
        if (1 !== e.length && 2 !== e.length) return !1;
        e.every((e) => "auto" === e || ye(e) || we(e)) && (t += 1);
      }
      return t > 0;
    },
    "line-width": function (e) {
      return q(e, " ").every(
        (e) =>
          ye(e) || ge(e) || "thin" === e || "medium" === e || "thick" === e,
      );
    },
    image: function (e) {
      let t = 0;
      for (let r of q(e, ","))
        if (!r.startsWith("var(")) {
          if (de(r)) {
            t += 1;
            continue;
          }
          if (pe.test(r)) {
            t += 1;
            continue;
          }
          if (fe.test(r)) {
            t += 1;
            continue;
          }
          return !1;
        }
      return t > 0;
    },
    "family-name": function (e) {
      let t = 0;
      for (let r of q(e, ",")) {
        let e = r.charCodeAt(0);
        if (e >= 48 && e <= 57) return !1;
        r.startsWith("var(") || (t += 1);
      }
      return t > 0;
    },
    "generic-name": function (e) {
      return (
        "serif" === e ||
        "sans-serif" === e ||
        "monospace" === e ||
        "cursive" === e ||
        "fantasy" === e ||
        "system-ui" === e ||
        "ui-serif" === e ||
        "ui-sans-serif" === e ||
        "ui-monospace" === e ||
        "ui-rounded" === e ||
        "math" === e ||
        "emoji" === e ||
        "fangsong" === e
      );
    },
    "absolute-size": function (e) {
      return (
        "xx-small" === e ||
        "x-small" === e ||
        "small" === e ||
        "medium" === e ||
        "large" === e ||
        "x-large" === e ||
        "xx-large" === e ||
        "xxx-large" === e
      );
    },
    "relative-size": function (e) {
      return "larger" === e || "smaller" === e;
    },
    angle: function (e) {
      return xe.test(e);
    },
    vector: function (e) {
      return $e.test(e);
    },
  };
  function ce(e, t) {
    if (e.startsWith("var(")) return null;
    for (let r of t) if (se[r]?.(e)) return r;
    return null;
  }
  var ue = /^url\(.*\)$/;
  function de(e) {
    return ue.test(e);
  }
  var fe = /^(?:element|image|cross-fade|image-set)\(/,
    pe = /^(repeating-)?(conic|linear|radial)-gradient\(/;
  var he = /[+-]?\d*\.?\d+(?:[eE][+-]?\d+)?/,
    me = new RegExp(`^${he.source}$`);
  function ge(e) {
    return me.test(e) || R(e);
  }
  var ve = new RegExp(`^${he.source}%$`);
  function we(e) {
    return ve.test(e) || R(e);
  }
  var ke = new RegExp(`^${he.source}s*/s*${he.source}$`);
  var be = new RegExp(
    `^${he.source}(${["cm", "mm", "Q", "in", "pc", "pt", "px", "em", "ex", "ch", "rem", "lh", "rlh", "vw", "vh", "vmin", "vmax", "vb", "vi", "svw", "svh", "lvw", "lvh", "dvw", "dvh", "cqw", "cqh", "cqi", "cqb", "cqmin", "cqmax"].join("|")})$`,
  );
  function ye(e) {
    return be.test(e) || R(e);
  }
  var xe = new RegExp(
    `^${he.source}(${["deg", "rad", "grad", "turn"].join("|")})$`,
  );
  var $e = new RegExp(`^${he.source} +${he.source} +${he.source}$`);
  function Ae(e) {
    let t = Number(e);
    return Number.isInteger(t) && t >= 0 && String(t) === String(e);
  }
  function ze(e) {
    let t = Number(e);
    return Number.isInteger(t) && t > 0 && String(t) === String(e);
  }
  function Se(e) {
    return je(e, 0.25);
  }
  function Ce(e) {
    return je(e, 0.25);
  }
  function je(e, t) {
    let r = Number(e);
    return r >= 0 && r % t == 0 && String(r) === String(e);
  }
  var Te = new Set(["inset", "inherit", "initial", "revert", "unset"]),
    Ve = /^-?(\d+|\.\d+)(.*?)$/g;
  function Ke(e, t) {
    return q(e, ",")
      .map((e) => {
        let r = q((e = e.trim()), " ").filter((e) => "" !== e.trim()),
          n = null,
          o = null,
          a = null;
        for (let e of r)
          Te.has(e) ||
            (Ve.test(e)
              ? (null === o ? (o = e) : null === a && (a = e),
                (Ve.lastIndex = 0))
              : null === n && (n = e));
        if (null === o || null === a) return e;
        let i = t(n ?? "currentcolor");
        return null !== n ? e.replace(n, i) : `${e} ${i}`;
      })
      .join(", ");
  }
  var Ee = /^-?[a-z][a-zA-Z0-9/%._-]*$/,
    Ne = /^-?[a-z][a-zA-Z0-9/%._-]*-\*$/,
    Oe = [
      "0",
      "0.5",
      "1",
      "1.5",
      "2",
      "2.5",
      "3",
      "3.5",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "14",
      "16",
      "20",
      "24",
      "28",
      "32",
      "36",
      "40",
      "44",
      "48",
      "52",
      "56",
      "60",
      "64",
      "72",
      "80",
      "96",
    ],
    Fe = class {
      utilities = new u(() => []);
      completions = new Map();
      static(e, t) {
        this.utilities.get(e).push({ kind: "static", compileFn: t });
      }
      functional(e, t, r) {
        this.utilities
          .get(e)
          .push({ kind: "functional", compileFn: t, options: r });
      }
      has(e, t) {
        return (
          this.utilities.has(e) &&
          this.utilities.get(e).some((e) => e.kind === t)
        );
      }
      get(e) {
        return this.utilities.has(e) ? this.utilities.get(e) : [];
      }
      getCompletions(e) {
        return this.has(e, "static")
          ? (this.completions.get(e)?.() ?? [
              { supportsNegative: !1, values: [], modifiers: [] },
            ])
          : (this.completions.get(e)?.() ?? []);
      }
      suggest(e, t) {
        let r = this.completions.get(e);
        r
          ? this.completions.set(e, () => [...r?.(), ...t?.()])
          : this.completions.set(e, t);
      }
      keys(e) {
        let t = [];
        for (let [r, n] of this.utilities.entries())
          for (let o of n)
            if (o.kind === e) {
              t.push(r);
              break;
            }
        return t;
      }
    };
  function Ue(e, t, r) {
    return A("@property", e, [
      S("syntax", r ? `"${r}"` : '"*"'),
      S("inherits", "false"),
      ...(t ? [S("initial-value", t)] : []),
    ]);
  }
  function We(e, t) {
    if (null === t) return e;
    let r = Number(t);
    return (
      Number.isNaN(r) || (t = 100 * r + "%"),
      "100%" === t ? e : `color-mix(in oklab, ${e} ${t}, transparent)`
    );
  }
  function Re(e, t) {
    let r = Number(t);
    return (
      Number.isNaN(r) || (t = 100 * r + "%"),
      `oklab(from ${e} l a b / ${t})`
    );
  }
  function De(e, t, r) {
    if (!t) return e;
    if ("arbitrary" === t.kind) return We(e, t.value);
    let n = r.resolve(t.value, ["--opacity"]);
    return n ? We(e, n) : Ce(t.value) ? We(e, `${t.value}%`) : null;
  }
  function _e(e, t, r) {
    let n = null;
    switch (e.value.value) {
      case "inherit":
        n = "inherit";
        break;
      case "transparent":
        n = "transparent";
        break;
      case "current":
        n = "currentcolor";
        break;
      default:
        n = t.resolve(e.value.value, r);
    }
    return n ? De(n, e.modifier, t) : null;
  }
  var Le = /(\d+)_(\d+)/g;
  var Me = ["number", "integer", "ratio", "percentage"];
  function Be(e, t, r) {
    for (let n of t.nodes) {
      if (
        "named" === e.kind &&
        "word" === n.kind &&
        ("'" === n.value[0] || '"' === n.value[0]) &&
        n.value[n.value.length - 1] === n.value[0] &&
        n.value.slice(1, -1) === e.value
      )
        return { nodes: m(e.value) };
      if (
        "named" === e.kind &&
        "word" === n.kind &&
        "-" === n.value[0] &&
        "-" === n.value[1]
      ) {
        let t = n.value;
        if (t.endsWith("-*")) {
          t = t.slice(0, -2);
          let n = r.theme.resolve(e.value, [t]);
          if (n) return { nodes: m(n) };
        } else {
          let n = t.split("-*");
          if (n.length <= 1) continue;
          let o = [n.shift()],
            a = r.theme.resolveWith(e.value, o, n);
          if (a) {
            let [, e = {}] = a;
            {
              let t = e[n.pop()];
              if (t) return { nodes: m(t) };
            }
          }
        }
      } else {
        if ("named" === e.kind && "word" === n.kind) {
          if (!Me.includes(n.value)) continue;
          let t = "ratio" === n.value && "fraction" in e ? e.fraction : e.value;
          if (!t) continue;
          let r = ce(t, [n.value]);
          if (null === r) continue;
          if ("ratio" === r) {
            let [e, r] = q(t, "/");
            if (!Ae(e) || !Ae(r)) continue;
          } else {
            if ("number" === r && !Se(t)) continue;
            if ("percentage" === r && !Ae(t.slice(0, -1))) continue;
          }
          return { nodes: m(t), ratio: "ratio" === r };
        }
        if (
          "arbitrary" === e.kind &&
          "word" === n.kind &&
          "[" === n.value[0] &&
          "]" === n.value[n.value.length - 1]
        ) {
          let t = n.value.slice(1, -1);
          if ("*" === t) return { nodes: m(e.value) };
          if ("dataType" in e && e.dataType && e.dataType !== t) continue;
          if ("dataType" in e && e.dataType) return { nodes: m(e.value) };
          if (null !== ce(e.value, [t])) return { nodes: m(e.value) };
        }
      }
    }
  }
  function Ie(e, t, r, n, o = "") {
    let a = !1,
      i = Ke(t, (e) =>
        null == r
          ? n(e)
          : e.startsWith("current")
            ? n(We(e, r))
            : ((e.startsWith("var(") || r.startsWith("var(")) && (a = !0),
              n(Re(e, r))),
      );
    function l(e) {
      return o
        ? q(e, ",")
            .map((e) => o + e)
            .join(",")
        : e;
    }
    return a
      ? [
          S(e, l(Ke(t, n))),
          z("@supports (color: lab(from red l a b))", [S(e, l(i))]),
        ]
      : [S(e, l(i))];
  }
  function Pe(e, t, r, n, o = "") {
    let a = !1,
      i = q(t, ",")
        .map((e) =>
          Ke(e, (e) =>
            null == r
              ? n(e)
              : e.startsWith("current")
                ? n(We(e, r))
                : ((e.startsWith("var(") || r.startsWith("var(")) && (a = !0),
                  n(Re(e, r))),
          ),
        )
        .map((e) => `drop-shadow(${e})`)
        .join(" ");
    return a
      ? [
          S(
            e,
            o +
              q(t, ",")
                .map((e) => `drop-shadow(${Ke(e, n)})`)
                .join(" "),
          ),
          z("@supports (color: lab(from red l a b))", [S(e, o + i)]),
        ]
      : [S(e, o + i)];
  }
  var qe = {
    "--alpha": function (e, t, r, ...n) {
      let [o, a] = q(r, "/").map((e) => e.trim());
      if (!o || !a)
        throw new Error(
          `The --alpha(…) function requires a color and an alpha value, e.g.: \`--alpha(${o || "var(--my-color)"} / ${a || "50%"})\``,
        );
      if (n.length > 0)
        throw new Error(
          `The --alpha(…) function only accepts one argument, e.g.: \`--alpha(${o || "var(--my-color)"} / ${a || "50%"})\``,
        );
      return We(o, a);
    },
    "--spacing": function (e, t, r, ...n) {
      if (!r)
        throw new Error(
          "The --spacing(…) function requires an argument, but received none.",
        );
      if (n.length > 0)
        throw new Error(
          `The --spacing(…) function only accepts a single argument, but received ${n.length + 1}.`,
        );
      let o = e.theme.resolve(null, ["--spacing"]);
      if (!o)
        throw new Error(
          "The --spacing(…) function requires that the `--spacing` theme variable exists, but it was not found.",
        );
      return `calc(${o} * ${r})`;
    },
    "--theme": function (e, t, r, ...n) {
      if (!r.startsWith("--"))
        throw new Error(
          "The --theme(…) function can only be used with CSS variables from your theme.",
        );
      let o = !1;
      (r.endsWith(" inline") && ((o = !0), (r = r.slice(0, -7))),
        "at-rule" === t.kind && (o = !0));
      let a = e.resolveThemeValue(r, o);
      if (!a) {
        if (n.length > 0) return n.join(", ");
        throw new Error(
          `Could not resolve value for theme function: \`theme(${r})\`. Consider checking if the variable name is correct or provide a fallback value to silence this error.`,
        );
      }
      if (0 === n.length) return a;
      let i = n.join(", ");
      if ("initial" === i) return a;
      if ("initial" === a) return i;
      if (
        a.startsWith("var(") ||
        a.startsWith("theme(") ||
        a.startsWith("--theme(")
      ) {
        let e = m(a);
        return (
          (function (e, t) {
            k(e, (e) => {
              if (
                "function" === e.kind &&
                ("var" === e.value ||
                  "theme" === e.value ||
                  "--theme" === e.value)
              )
                if (1 === e.nodes.length)
                  e.nodes.push({ kind: "word", value: `, ${t}` });
                else {
                  let r = e.nodes[e.nodes.length - 1];
                  "word" === r.kind && "initial" === r.value && (r.value = t);
                }
            });
          })(e, i),
          h(e)
        );
      }
      return a;
    },
    theme: function (e, t, r, ...n) {
      r = (function (e) {
        if ("'" !== e[0] && '"' !== e[0]) return e;
        let t = "",
          r = e[0];
        for (let n = 1; n < e.length - 1; n++) {
          let o = e[n],
            a = e[n + 1];
          "\\" !== o || (a !== r && "\\" !== a) ? (t += o) : ((t += a), n++);
        }
        return t;
      })(r);
      let o = e.resolveThemeValue(r);
      if (!o && n.length > 0) return n.join(", ");
      if (!o)
        throw new Error(
          `Could not resolve value for theme function: \`theme(${r})\`. Consider checking if the path is correct or provide a fallback value to silence this error.`,
        );
      return o;
    },
  };
  var He = new RegExp(
    Object.keys(qe)
      .map((e) => `${e}\\(`)
      .join("|"),
  );
  function Ze(e, t) {
    let r = 0;
    return (
      k(e, (e) => {
        if ("declaration" === e.kind && e.value && He.test(e.value))
          return ((r |= 8), void (e.value = Ye(e.value, e, t)));
        "at-rule" === e.kind &&
          ("@media" === e.name ||
            "@custom-media" === e.name ||
            "@container" === e.name ||
            "@supports" === e.name) &&
          He.test(e.params) &&
          ((r |= 8), (e.params = Ye(e.params, e, t)));
      }),
      r
    );
  }
  function Ye(e, t, r) {
    let n = m(e);
    return (
      k(n, (e) => {
        if ("function" === e.kind && e.value in qe) {
          let n = q(h(e.nodes).trim(), ",").map((e) => e.trim()),
            o = qe[e.value](r, t, ...n);
          return w.Replace(m(o));
        }
      }),
      h(n)
    );
  }
  var Ge = /^@?[a-z0-9][a-zA-Z0-9_-]*(?<![_-])$/,
    Je = class {
      compareFns = new Map();
      variants = new Map();
      completions = new Map();
      groupOrder = null;
      lastOrder = 0;
      static(e, t, { compounds: r, order: n } = {}) {
        this.set(e, {
          kind: "static",
          applyFn: t,
          compoundsWith: 0,
          compounds: r ?? 2,
          order: n,
        });
      }
      fromAst(e, t, r) {
        let n = [],
          o = !1;
        (k(t, (e) => {
          "rule" === e.kind
            ? n.push(e.selector)
            : "at-rule" === e.kind && "@variant" === e.name
              ? (o = !0)
              : "at-rule" === e.kind &&
                "@slot" !== e.name &&
                n.push(`${e.name} ${e.params}`);
        }),
          this.static(
            e,
            (e) => {
              let n = t.map(V);
              (o && tt(n, r), et(n, e.nodes), (e.nodes = n));
            },
            { compounds: Xe(n) },
          ));
      }
      functional(e, t, { compounds: r, order: n } = {}) {
        this.set(e, {
          kind: "functional",
          applyFn: t,
          compoundsWith: 0,
          compounds: r ?? 2,
          order: n,
        });
      }
      compound(e, t, r, { compounds: n, order: o } = {}) {
        this.set(e, {
          kind: "compound",
          applyFn: r,
          compoundsWith: t,
          compounds: n ?? 2,
          order: o,
        });
      }
      group(e, t) {
        ((this.groupOrder = this.nextOrder()),
          t && this.compareFns.set(this.groupOrder, t),
          e(),
          (this.groupOrder = null));
      }
      has(e) {
        return this.variants.has(e);
      }
      get(e) {
        return this.variants.get(e);
      }
      kind(e) {
        return this.variants.get(e)?.kind;
      }
      compoundsWith(e, t) {
        let r = this.variants.get(e),
          n =
            "string" == typeof t
              ? this.variants.get(t)
              : "arbitrary" === t.kind
                ? { compounds: Xe([t.selector]) }
                : this.variants.get(t.root);
        return !!(
          r &&
          n &&
          "compound" === r.kind &&
          0 !== n.compounds &&
          0 !== r.compoundsWith &&
          r.compoundsWith & n.compounds
        );
      }
      suggest(e, t) {
        this.completions.set(e, t);
      }
      getCompletions(e) {
        return this.completions.get(e)?.() ?? [];
      }
      compare(e, t) {
        if (e === t) return 0;
        if (null === e) return -1;
        if (null === t) return 1;
        if ("arbitrary" === e.kind && "arbitrary" === t.kind)
          return e.selector < t.selector ? -1 : 1;
        if ("arbitrary" === e.kind) return 1;
        if ("arbitrary" === t.kind) return -1;
        let r = this.variants.get(e.root).order,
          n = r - this.variants.get(t.root).order;
        if (0 !== n) return n;
        if ("compound" === e.kind && "compound" === t.kind) {
          let r = this.compare(e.variant, t.variant);
          return 0 !== r
            ? r
            : e.modifier && t.modifier
              ? e.modifier.value < t.modifier.value
                ? -1
                : 1
              : e.modifier
                ? 1
                : t.modifier
                  ? -1
                  : 0;
        }
        let o = this.compareFns.get(r);
        if (void 0 !== o) return o(e, t);
        if (e.root !== t.root) return e.root < t.root ? -1 : 1;
        let a = e.value,
          i = t.value;
        return null === a
          ? -1
          : null === i || ("arbitrary" === a.kind && "arbitrary" !== i.kind)
            ? 1
            : ("arbitrary" !== a.kind && "arbitrary" === i.kind) ||
                a.value < i.value
              ? -1
              : 1;
      }
      keys() {
        return this.variants.keys();
      }
      entries() {
        return this.variants.entries();
      }
      set(
        e,
        { kind: t, applyFn: r, compounds: n, compoundsWith: o, order: a },
      ) {
        let i = this.variants.get(e);
        i
          ? Object.assign(i, { kind: t, applyFn: r, compounds: n })
          : (void 0 === a &&
              ((this.lastOrder = this.nextOrder()), (a = this.lastOrder)),
            this.variants.set(e, {
              kind: t,
              applyFn: r,
              order: a,
              compoundsWith: o,
              compounds: n,
            }));
      }
      nextOrder() {
        return this.groupOrder ?? this.lastOrder + 1;
      }
    };
  function Xe(e) {
    let t = 0;
    for (let r of e)
      if ("@" !== r[0]) {
        if (r.includes("::")) return 0;
        t |= 2;
      } else {
        if (
          !r.startsWith("@media") &&
          !r.startsWith("@supports") &&
          !r.startsWith("@container")
        )
          return 0;
        t |= 1;
      }
    return t;
  }
  function Qe(e) {
    if (e.includes("=")) {
      let [t, ...r] = q(e, "="),
        n = r.join("=").trim();
      if ("'" === n[0] || '"' === n[0]) return e;
      if (n.length > 1) {
        let e = n[n.length - 1];
        if (
          " " === n[n.length - 2] &&
          ("i" === e || "I" === e || "s" === e || "S" === e)
        )
          return `${t}="${n.slice(0, -2)}" ${e}`;
      }
      return `${t}="${n}"`;
    }
    return e;
  }
  function et(e, t) {
    k(e, (e) =>
      "at-rule" === e.kind && "@slot" === e.name
        ? w.Replace(t)
        : "at-rule" !== e.kind ||
            ("@keyframes" !== e.name && "@property" !== e.name)
          ? void 0
          : (Object.assign(e, T([A(e.name, e.params, e.nodes)])), w.Skip),
    );
  }
  function tt(e, t) {
    let r = 0;
    return (
      k(e, (e) => {
        if ("at-rule" !== e.kind || "@variant" !== e.name) return;
        let n = $("&", e.nodes),
          o = e.params,
          a = t.parseVariant(o);
        if (null === a)
          throw new Error(`Cannot use \`@variant\` with unknown variant: ${o}`);
        if (null === at(n, a, t.variants))
          throw new Error(`Cannot use \`@variant\` with variant: ${o}`);
        return ((r |= 32), w.Replace(n));
      }),
      r
    );
  }
  function rt(e) {
    let t = (function (e) {
        let t = new Fe();
        function r(r, n) {
          function* o(t) {
            for (let r of e.keysInNamespaces(t))
              yield r.replace(Le, (e, t, r) => `${t}.${r}`);
          }
          let a = [
            "1/2",
            "1/3",
            "2/3",
            "1/4",
            "2/4",
            "3/4",
            "1/5",
            "2/5",
            "3/5",
            "4/5",
            "1/6",
            "2/6",
            "3/6",
            "4/6",
            "5/6",
            "1/12",
            "2/12",
            "3/12",
            "4/12",
            "5/12",
            "6/12",
            "7/12",
            "8/12",
            "9/12",
            "10/12",
            "11/12",
          ];
          t.suggest(r, () => {
            let e = [];
            for (let t of n()) {
              if ("string" == typeof t) {
                e.push({ values: [t], modifiers: [] });
                continue;
              }
              let r = [...(t.values ?? []), ...o(t.valueThemeKeys ?? [])],
                n = [...(t.modifiers ?? []), ...o(t.modifierThemeKeys ?? [])];
              (t.supportsFractions && r.push(...a),
                t.hasDefaultValue && r.unshift(null),
                e.push({
                  supportsNegative: t.supportsNegative,
                  values: r,
                  modifiers: n,
                }));
            }
            return e;
          });
        }
        function n(e, r) {
          t.static(e, () =>
            r.map((e) => ("function" == typeof e ? e() : S(e[0], e[1]))),
          );
        }
        function o(n, o) {
          function a({ negative: t }) {
            return (r) => {
              let n = null,
                a = null;
              if (r.value)
                if ("arbitrary" === r.value.kind) {
                  if (r.modifier) return;
                  ((n = r.value.value), (a = r.value.dataType));
                } else {
                  if (
                    ((n = e.resolve(
                      r.value.fraction ?? r.value.value,
                      o.themeKeys ?? [],
                    )),
                    null === n && o.supportsFractions && r.value.fraction)
                  ) {
                    let [e, t] = q(r.value.fraction, "/");
                    if (!Ae(e) || !Ae(t)) return;
                    n = `calc(${r.value.fraction} * 100%)`;
                  }
                  if (null === n && t && o.handleNegativeBareValue) {
                    if (
                      ((n = o.handleNegativeBareValue(r.value)),
                      !n?.includes("/") && r.modifier)
                    )
                      return;
                    if (null !== n) return o.handle(n, null);
                  }
                  if (
                    null === n &&
                    o.handleBareValue &&
                    ((n = o.handleBareValue(r.value)),
                    !n?.includes("/") && r.modifier)
                  )
                    return;
                  if (null === n && !t && o.staticValues && !r.modifier) {
                    let e = o.staticValues[r.value.value];
                    if (e) return e.map(V);
                  }
                }
              else {
                if (r.modifier) return;
                n =
                  void 0 !== o.defaultValue
                    ? o.defaultValue
                    : e.resolve(null, o.themeKeys ?? []);
              }
              if (null !== n) return o.handle(t ? `calc(${n} * -1)` : n, a);
            };
          }
          if (
            (o.supportsNegative && t.functional(`-${n}`, a({ negative: !0 })),
            t.functional(n, a({ negative: !1 })),
            r(n, () => [
              {
                supportsNegative: o.supportsNegative,
                valueThemeKeys: o.themeKeys ?? [],
                hasDefaultValue:
                  void 0 !== o.defaultValue && null !== o.defaultValue,
                supportsFractions: o.supportsFractions,
              },
            ]),
            o.staticValues && Object.keys(o.staticValues).length > 0)
          ) {
            let e = Object.keys(o.staticValues);
            r(n, () => [{ values: e }]);
          }
        }
        function a(n, o) {
          (t.functional(n, (t) => {
            if (!t.value) return;
            let r = null;
            return (
              "arbitrary" === t.value.kind
                ? ((r = t.value.value), (r = De(r, t.modifier, e)))
                : (r = _e(t, e, o.themeKeys)),
              null !== r ? o.handle(r) : void 0
            );
          }),
            r(n, () => [
              {
                values: ["current", "inherit", "transparent"],
                valueThemeKeys: o.themeKeys,
                modifiers: Array.from({ length: 21 }, (e, t) => "" + 5 * t),
              },
            ]));
        }
        function i(
          n,
          a,
          i,
          {
            supportsNegative: l = !1,
            supportsFractions: s = !1,
            staticValues: c,
          } = {},
        ) {
          (l && t.static(`-${n}-px`, () => i("-1px")),
            t.static(`${n}-px`, () => i("1px")),
            o(n, {
              themeKeys: a,
              supportsFractions: s,
              supportsNegative: l,
              defaultValue: null,
              handleBareValue: ({ value: t }) => {
                let r = e.resolve(null, ["--spacing"]);
                return r && Se(t) ? `calc(${r} * ${t})` : null;
              },
              handleNegativeBareValue: ({ value: t }) => {
                let r = e.resolve(null, ["--spacing"]);
                return r && Se(t) ? `calc(${r} * -${t})` : null;
              },
              handle: i,
              staticValues: c,
            }),
            r(n, () => [
              {
                values: e.get(["--spacing"]) ? Oe : [],
                supportsNegative: l,
                supportsFractions: s,
                valueThemeKeys: a,
              },
            ]));
        }
        (n("sr-only", [
          ["position", "absolute"],
          ["width", "1px"],
          ["height", "1px"],
          ["padding", "0"],
          ["margin", "-1px"],
          ["overflow", "hidden"],
          ["clip-path", "inset(50%)"],
          ["white-space", "nowrap"],
          ["border-width", "0"],
        ]),
          n("not-sr-only", [
            ["position", "static"],
            ["width", "auto"],
            ["height", "auto"],
            ["padding", "0"],
            ["margin", "0"],
            ["overflow", "visible"],
            ["clip-path", "none"],
            ["white-space", "normal"],
          ]),
          n("pointer-events-none", [["pointer-events", "none"]]),
          n("pointer-events-auto", [["pointer-events", "auto"]]),
          n("visible", [["visibility", "visible"]]),
          n("invisible", [["visibility", "hidden"]]),
          n("collapse", [["visibility", "collapse"]]),
          n("static", [["position", "static"]]),
          n("fixed", [["position", "fixed"]]),
          n("absolute", [["position", "absolute"]]),
          n("relative", [["position", "relative"]]),
          n("sticky", [["position", "sticky"]]));
        for (let [e, t] of [
          ["inset", "inset"],
          ["inset-x", "inset-inline"],
          ["inset-y", "inset-block"],
          ["start", "inset-inline-start"],
          ["end", "inset-inline-end"],
          ["top", "top"],
          ["right", "right"],
          ["bottom", "bottom"],
          ["left", "left"],
        ])
          (n(`${e}-auto`, [[t, "auto"]]),
            n(`${e}-full`, [[t, "100%"]]),
            n(`-${e}-full`, [[t, "-100%"]]),
            i(e, ["--inset", "--spacing"], (e) => [S(t, e)], {
              supportsNegative: !0,
              supportsFractions: !0,
            }));
        (n("isolate", [["isolation", "isolate"]]),
          n("isolation-auto", [["isolation", "auto"]]),
          o("z", {
            supportsNegative: !0,
            handleBareValue: ({ value: e }) => (Ae(e) ? e : null),
            themeKeys: ["--z-index"],
            handle: (e) => [S("z-index", e)],
            staticValues: { auto: [S("z-index", "auto")] },
          }),
          r("z", () => [
            {
              supportsNegative: !0,
              values: ["0", "10", "20", "30", "40", "50"],
              valueThemeKeys: ["--z-index"],
            },
          ]),
          o("order", {
            supportsNegative: !0,
            handleBareValue: ({ value: e }) => (Ae(e) ? e : null),
            themeKeys: ["--order"],
            handle: (e) => [S("order", e)],
            staticValues: {
              first: [S("order", "-9999")],
              last: [S("order", "9999")],
            },
          }),
          r("order", () => [
            {
              supportsNegative: !0,
              values: Array.from({ length: 12 }, (e, t) => `${t + 1}`),
              valueThemeKeys: ["--order"],
            },
          ]),
          o("col", {
            supportsNegative: !0,
            handleBareValue: ({ value: e }) => (Ae(e) ? e : null),
            themeKeys: ["--grid-column"],
            handle: (e) => [S("grid-column", e)],
            staticValues: { auto: [S("grid-column", "auto")] },
          }),
          o("col-span", {
            handleBareValue: ({ value: e }) => (Ae(e) ? e : null),
            handle: (e) => [S("grid-column", `span ${e} / span ${e}`)],
            staticValues: { full: [S("grid-column", "1 / -1")] },
          }),
          o("col-start", {
            supportsNegative: !0,
            handleBareValue: ({ value: e }) => (Ae(e) ? e : null),
            themeKeys: ["--grid-column-start"],
            handle: (e) => [S("grid-column-start", e)],
            staticValues: { auto: [S("grid-column-start", "auto")] },
          }),
          o("col-end", {
            supportsNegative: !0,
            handleBareValue: ({ value: e }) => (Ae(e) ? e : null),
            themeKeys: ["--grid-column-end"],
            handle: (e) => [S("grid-column-end", e)],
            staticValues: { auto: [S("grid-column-end", "auto")] },
          }),
          r("col-span", () => [
            {
              values: Array.from({ length: 12 }, (e, t) => `${t + 1}`),
              valueThemeKeys: [],
            },
          ]),
          r("col-start", () => [
            {
              supportsNegative: !0,
              values: Array.from({ length: 13 }, (e, t) => `${t + 1}`),
              valueThemeKeys: ["--grid-column-start"],
            },
          ]),
          r("col-end", () => [
            {
              supportsNegative: !0,
              values: Array.from({ length: 13 }, (e, t) => `${t + 1}`),
              valueThemeKeys: ["--grid-column-end"],
            },
          ]),
          o("row", {
            supportsNegative: !0,
            handleBareValue: ({ value: e }) => (Ae(e) ? e : null),
            themeKeys: ["--grid-row"],
            handle: (e) => [S("grid-row", e)],
            staticValues: { auto: [S("grid-row", "auto")] },
          }),
          o("row-span", {
            themeKeys: [],
            handleBareValue: ({ value: e }) => (Ae(e) ? e : null),
            handle: (e) => [S("grid-row", `span ${e} / span ${e}`)],
            staticValues: { full: [S("grid-row", "1 / -1")] },
          }),
          o("row-start", {
            supportsNegative: !0,
            handleBareValue: ({ value: e }) => (Ae(e) ? e : null),
            themeKeys: ["--grid-row-start"],
            handle: (e) => [S("grid-row-start", e)],
            staticValues: { auto: [S("grid-row-start", "auto")] },
          }),
          o("row-end", {
            supportsNegative: !0,
            handleBareValue: ({ value: e }) => (Ae(e) ? e : null),
            themeKeys: ["--grid-row-end"],
            handle: (e) => [S("grid-row-end", e)],
            staticValues: { auto: [S("grid-row-end", "auto")] },
          }),
          r("row-span", () => [
            {
              values: Array.from({ length: 12 }, (e, t) => `${t + 1}`),
              valueThemeKeys: [],
            },
          ]),
          r("row-start", () => [
            {
              supportsNegative: !0,
              values: Array.from({ length: 13 }, (e, t) => `${t + 1}`),
              valueThemeKeys: ["--grid-row-start"],
            },
          ]),
          r("row-end", () => [
            {
              supportsNegative: !0,
              values: Array.from({ length: 13 }, (e, t) => `${t + 1}`),
              valueThemeKeys: ["--grid-row-end"],
            },
          ]),
          n("float-start", [["float", "inline-start"]]),
          n("float-end", [["float", "inline-end"]]),
          n("float-right", [["float", "right"]]),
          n("float-left", [["float", "left"]]),
          n("float-none", [["float", "none"]]),
          n("clear-start", [["clear", "inline-start"]]),
          n("clear-end", [["clear", "inline-end"]]),
          n("clear-right", [["clear", "right"]]),
          n("clear-left", [["clear", "left"]]),
          n("clear-both", [["clear", "both"]]),
          n("clear-none", [["clear", "none"]]));
        for (let [e, t] of [
          ["m", "margin"],
          ["mx", "margin-inline"],
          ["my", "margin-block"],
          ["ms", "margin-inline-start"],
          ["me", "margin-inline-end"],
          ["mt", "margin-top"],
          ["mr", "margin-right"],
          ["mb", "margin-bottom"],
          ["ml", "margin-left"],
        ])
          (n(`${e}-auto`, [[t, "auto"]]),
            i(e, ["--margin", "--spacing"], (e) => [S(t, e)], {
              supportsNegative: !0,
            }));
        (n("box-border", [["box-sizing", "border-box"]]),
          n("box-content", [["box-sizing", "content-box"]]),
          o("line-clamp", {
            themeKeys: ["--line-clamp"],
            handleBareValue: ({ value: e }) => (Ae(e) ? e : null),
            handle: (e) => [
              S("overflow", "hidden"),
              S("display", "-webkit-box"),
              S("-webkit-box-orient", "vertical"),
              S("-webkit-line-clamp", e),
            ],
            staticValues: {
              none: [
                S("overflow", "visible"),
                S("display", "block"),
                S("-webkit-box-orient", "horizontal"),
                S("-webkit-line-clamp", "unset"),
              ],
            },
          }),
          r("line-clamp", () => [
            {
              values: ["1", "2", "3", "4", "5", "6"],
              valueThemeKeys: ["--line-clamp"],
            },
          ]),
          n("block", [["display", "block"]]),
          n("inline-block", [["display", "inline-block"]]),
          n("inline", [["display", "inline"]]),
          n("hidden", [["display", "none"]]),
          n("inline-flex", [["display", "inline-flex"]]),
          n("table", [["display", "table"]]),
          n("inline-table", [["display", "inline-table"]]),
          n("table-caption", [["display", "table-caption"]]),
          n("table-cell", [["display", "table-cell"]]),
          n("table-column", [["display", "table-column"]]),
          n("table-column-group", [["display", "table-column-group"]]),
          n("table-footer-group", [["display", "table-footer-group"]]),
          n("table-header-group", [["display", "table-header-group"]]),
          n("table-row-group", [["display", "table-row-group"]]),
          n("table-row", [["display", "table-row"]]),
          n("flow-root", [["display", "flow-root"]]),
          n("flex", [["display", "flex"]]),
          n("grid", [["display", "grid"]]),
          n("inline-grid", [["display", "inline-grid"]]),
          n("contents", [["display", "contents"]]),
          n("list-item", [["display", "list-item"]]),
          n("field-sizing-content", [["field-sizing", "content"]]),
          n("field-sizing-fixed", [["field-sizing", "fixed"]]),
          o("aspect", {
            themeKeys: ["--aspect"],
            handleBareValue: ({ fraction: e }) => {
              if (null === e) return null;
              let [t, r] = q(e, "/");
              return Ae(t) && Ae(r) ? e : null;
            },
            handle: (e) => [S("aspect-ratio", e)],
            staticValues: {
              auto: [S("aspect-ratio", "auto")],
              square: [S("aspect-ratio", "1 / 1")],
            },
          }));
        for (let [e, t] of [
          ["full", "100%"],
          ["svw", "100svw"],
          ["lvw", "100lvw"],
          ["dvw", "100dvw"],
          ["svh", "100svh"],
          ["lvh", "100lvh"],
          ["dvh", "100dvh"],
          ["min", "min-content"],
          ["max", "max-content"],
          ["fit", "fit-content"],
        ])
          (n(`size-${e}`, [
            ["--tw-sort", "size"],
            ["width", t],
            ["height", t],
          ]),
            n(`w-${e}`, [["width", t]]),
            n(`h-${e}`, [["height", t]]),
            n(`min-w-${e}`, [["min-width", t]]),
            n(`min-h-${e}`, [["min-height", t]]),
            n(`max-w-${e}`, [["max-width", t]]),
            n(`max-h-${e}`, [["max-height", t]]));
        (n("size-auto", [
          ["--tw-sort", "size"],
          ["width", "auto"],
          ["height", "auto"],
        ]),
          n("w-auto", [["width", "auto"]]),
          n("h-auto", [["height", "auto"]]),
          n("min-w-auto", [["min-width", "auto"]]),
          n("min-h-auto", [["min-height", "auto"]]),
          n("h-lh", [["height", "1lh"]]),
          n("min-h-lh", [["min-height", "1lh"]]),
          n("max-h-lh", [["max-height", "1lh"]]),
          n("w-screen", [["width", "100vw"]]),
          n("min-w-screen", [["min-width", "100vw"]]),
          n("max-w-screen", [["max-width", "100vw"]]),
          n("h-screen", [["height", "100vh"]]),
          n("min-h-screen", [["min-height", "100vh"]]),
          n("max-h-screen", [["max-height", "100vh"]]),
          n("max-w-none", [["max-width", "none"]]),
          n("max-h-none", [["max-height", "none"]]),
          i(
            "size",
            ["--size", "--spacing"],
            (e) => [S("--tw-sort", "size"), S("width", e), S("height", e)],
            { supportsFractions: !0 },
          ));
        for (let [e, t, r] of [
          ["w", ["--width", "--spacing", "--container"], "width"],
          ["min-w", ["--min-width", "--spacing", "--container"], "min-width"],
          ["max-w", ["--max-width", "--spacing", "--container"], "max-width"],
          ["h", ["--height", "--spacing"], "height"],
          ["min-h", ["--min-height", "--height", "--spacing"], "min-height"],
          ["max-h", ["--max-height", "--height", "--spacing"], "max-height"],
        ])
          i(e, t, (e) => [S(r, e)], { supportsFractions: !0 });
        (t.static("container", () => {
          let t = [...e.namespace("--breakpoint").values()];
          t.sort((e, t) => ae(e, t, "asc"));
          let r = [
            S("--tw-sort", "--tw-container-component"),
            S("width", "100%"),
          ];
          for (let e of t)
            r.push(A("@media", `(width >= ${e})`, [S("max-width", e)]));
          return r;
        }),
          n("flex-auto", [["flex", "auto"]]),
          n("flex-initial", [["flex", "0 auto"]]),
          n("flex-none", [["flex", "none"]]),
          t.functional("flex", (e) => {
            if (e.value) {
              if ("arbitrary" === e.value.kind)
                return e.modifier ? void 0 : [S("flex", e.value.value)];
              if (e.value.fraction) {
                let [t, r] = q(e.value.fraction, "/");
                return Ae(t) && Ae(r)
                  ? [S("flex", `calc(${e.value.fraction} * 100%)`)]
                  : void 0;
              }
              if (Ae(e.value.value))
                return e.modifier ? void 0 : [S("flex", e.value.value)];
            }
          }),
          r("flex", () => [
            { supportsFractions: !0 },
            { values: Array.from({ length: 12 }, (e, t) => `${t + 1}`) },
          ]),
          o("shrink", {
            defaultValue: "1",
            handleBareValue: ({ value: e }) => (Ae(e) ? e : null),
            handle: (e) => [S("flex-shrink", e)],
          }),
          o("grow", {
            defaultValue: "1",
            handleBareValue: ({ value: e }) => (Ae(e) ? e : null),
            handle: (e) => [S("flex-grow", e)],
          }),
          r("shrink", () => [
            { values: ["0"], valueThemeKeys: [], hasDefaultValue: !0 },
          ]),
          r("grow", () => [
            { values: ["0"], valueThemeKeys: [], hasDefaultValue: !0 },
          ]),
          n("basis-auto", [["flex-basis", "auto"]]),
          n("basis-full", [["flex-basis", "100%"]]),
          i(
            "basis",
            ["--flex-basis", "--spacing", "--container"],
            (e) => [S("flex-basis", e)],
            { supportsFractions: !0 },
          ),
          n("table-auto", [["table-layout", "auto"]]),
          n("table-fixed", [["table-layout", "fixed"]]),
          n("caption-top", [["caption-side", "top"]]),
          n("caption-bottom", [["caption-side", "bottom"]]),
          n("border-collapse", [["border-collapse", "collapse"]]),
          n("border-separate", [["border-collapse", "separate"]]));
        let l = () =>
          T([
            Ue("--tw-border-spacing-x", "0", "<length>"),
            Ue("--tw-border-spacing-y", "0", "<length>"),
          ]);
        (i("border-spacing", ["--border-spacing", "--spacing"], (e) => [
          l(),
          S("--tw-border-spacing-x", e),
          S("--tw-border-spacing-y", e),
          S(
            "border-spacing",
            "var(--tw-border-spacing-x) var(--tw-border-spacing-y)",
          ),
        ]),
          i("border-spacing-x", ["--border-spacing", "--spacing"], (e) => [
            l(),
            S("--tw-border-spacing-x", e),
            S(
              "border-spacing",
              "var(--tw-border-spacing-x) var(--tw-border-spacing-y)",
            ),
          ]),
          i("border-spacing-y", ["--border-spacing", "--spacing"], (e) => [
            l(),
            S("--tw-border-spacing-y", e),
            S(
              "border-spacing",
              "var(--tw-border-spacing-x) var(--tw-border-spacing-y)",
            ),
          ]),
          o("origin", {
            themeKeys: ["--transform-origin"],
            handle: (e) => [S("transform-origin", e)],
            staticValues: {
              center: [S("transform-origin", "center")],
              top: [S("transform-origin", "top")],
              "top-right": [S("transform-origin", "100% 0")],
              right: [S("transform-origin", "100%")],
              "bottom-right": [S("transform-origin", "100% 100%")],
              bottom: [S("transform-origin", "bottom")],
              "bottom-left": [S("transform-origin", "0 100%")],
              left: [S("transform-origin", "0")],
              "top-left": [S("transform-origin", "0 0")],
            },
          }),
          o("perspective-origin", {
            themeKeys: ["--perspective-origin"],
            handle: (e) => [S("perspective-origin", e)],
            staticValues: {
              center: [S("perspective-origin", "center")],
              top: [S("perspective-origin", "top")],
              "top-right": [S("perspective-origin", "100% 0")],
              right: [S("perspective-origin", "100%")],
              "bottom-right": [S("perspective-origin", "100% 100%")],
              bottom: [S("perspective-origin", "bottom")],
              "bottom-left": [S("perspective-origin", "0 100%")],
              left: [S("perspective-origin", "0")],
              "top-left": [S("perspective-origin", "0 0")],
            },
          }),
          o("perspective", {
            themeKeys: ["--perspective"],
            handle: (e) => [S("perspective", e)],
            staticValues: { none: [S("perspective", "none")] },
          }));
        let s = () =>
          T([
            Ue("--tw-translate-x", "0"),
            Ue("--tw-translate-y", "0"),
            Ue("--tw-translate-z", "0"),
          ]);
        (n("translate-none", [["translate", "none"]]),
          n("-translate-full", [
            s,
            ["--tw-translate-x", "-100%"],
            ["--tw-translate-y", "-100%"],
            ["translate", "var(--tw-translate-x) var(--tw-translate-y)"],
          ]),
          n("translate-full", [
            s,
            ["--tw-translate-x", "100%"],
            ["--tw-translate-y", "100%"],
            ["translate", "var(--tw-translate-x) var(--tw-translate-y)"],
          ]),
          i(
            "translate",
            ["--translate", "--spacing"],
            (e) => [
              s(),
              S("--tw-translate-x", e),
              S("--tw-translate-y", e),
              S("translate", "var(--tw-translate-x) var(--tw-translate-y)"),
            ],
            { supportsNegative: !0, supportsFractions: !0 },
          ));
        for (let e of ["x", "y"])
          (n(`-translate-${e}-full`, [
            s,
            [`--tw-translate-${e}`, "-100%"],
            ["translate", "var(--tw-translate-x) var(--tw-translate-y)"],
          ]),
            n(`translate-${e}-full`, [
              s,
              [`--tw-translate-${e}`, "100%"],
              ["translate", "var(--tw-translate-x) var(--tw-translate-y)"],
            ]),
            i(
              `translate-${e}`,
              ["--translate", "--spacing"],
              (t) => [
                s(),
                S(`--tw-translate-${e}`, t),
                S("translate", "var(--tw-translate-x) var(--tw-translate-y)"),
              ],
              { supportsNegative: !0, supportsFractions: !0 },
            ));
        (i(
          "translate-z",
          ["--translate", "--spacing"],
          (e) => [
            s(),
            S("--tw-translate-z", e),
            S(
              "translate",
              "var(--tw-translate-x) var(--tw-translate-y) var(--tw-translate-z)",
            ),
          ],
          { supportsNegative: !0 },
        ),
          n("translate-3d", [
            s,
            [
              "translate",
              "var(--tw-translate-x) var(--tw-translate-y) var(--tw-translate-z)",
            ],
          ]));
        let c = () =>
          T([
            Ue("--tw-scale-x", "1"),
            Ue("--tw-scale-y", "1"),
            Ue("--tw-scale-z", "1"),
          ]);
        function u({ negative: t }) {
          return (r) => {
            if (!r.value || r.modifier) return;
            let n;
            return "arbitrary" === r.value.kind
              ? ((n = r.value.value),
                (n = t ? `calc(${n} * -1)` : n),
                [S("scale", n)])
              : ((n = e.resolve(r.value.value, ["--scale"])),
                !n && Ae(r.value.value) && (n = `${r.value.value}%`),
                n
                  ? ((n = t ? `calc(${n} * -1)` : n),
                    [
                      c(),
                      S("--tw-scale-x", n),
                      S("--tw-scale-y", n),
                      S("--tw-scale-z", n),
                      S("scale", "var(--tw-scale-x) var(--tw-scale-y)"),
                    ])
                  : void 0);
          };
        }
        (n("scale-none", [["scale", "none"]]),
          t.functional("-scale", u({ negative: !0 })),
          t.functional("scale", u({ negative: !1 })),
          r("scale", () => [
            {
              supportsNegative: !0,
              values: [
                "0",
                "50",
                "75",
                "90",
                "95",
                "100",
                "105",
                "110",
                "125",
                "150",
                "200",
              ],
              valueThemeKeys: ["--scale"],
            },
          ]));
        for (let e of ["x", "y", "z"])
          (o(`scale-${e}`, {
            supportsNegative: !0,
            themeKeys: ["--scale"],
            handleBareValue: ({ value: e }) => (Ae(e) ? `${e}%` : null),
            handle: (t) => [
              c(),
              S(`--tw-scale-${e}`, t),
              S(
                "scale",
                "var(--tw-scale-x) var(--tw-scale-y)" +
                  ("z" === e ? " var(--tw-scale-z)" : ""),
              ),
            ],
          }),
            r(`scale-${e}`, () => [
              {
                supportsNegative: !0,
                values: [
                  "0",
                  "50",
                  "75",
                  "90",
                  "95",
                  "100",
                  "105",
                  "110",
                  "125",
                  "150",
                  "200",
                ],
                valueThemeKeys: ["--scale"],
              },
            ]));
        function d({ negative: t }) {
          return (r) => {
            if (!r.value || r.modifier) return;
            let n;
            if ("arbitrary" === r.value.kind) {
              n = r.value.value;
              let e = r.value.dataType ?? ce(n, ["angle", "vector"]);
              if ("vector" === e) return [S("rotate", `${n} var(--tw-rotate)`)];
              if ("angle" !== e)
                return [S("rotate", t ? `calc(${n} * -1)` : n)];
            } else if (
              ((n = e.resolve(r.value.value, ["--rotate"])),
              !n && Ae(r.value.value) && (n = `${r.value.value}deg`),
              !n)
            )
              return;
            return [S("rotate", t ? `calc(${n} * -1)` : n)];
          };
        }
        (n("scale-3d", [
          c,
          ["scale", "var(--tw-scale-x) var(--tw-scale-y) var(--tw-scale-z)"],
        ]),
          n("rotate-none", [["rotate", "none"]]),
          t.functional("-rotate", d({ negative: !0 })),
          t.functional("rotate", d({ negative: !1 })),
          r("rotate", () => [
            {
              supportsNegative: !0,
              values: ["0", "1", "2", "3", "6", "12", "45", "90", "180"],
              valueThemeKeys: ["--rotate"],
            },
          ]));
        {
          let e = [
              "var(--tw-rotate-x,)",
              "var(--tw-rotate-y,)",
              "var(--tw-rotate-z,)",
              "var(--tw-skew-x,)",
              "var(--tw-skew-y,)",
            ].join(" "),
            a = () =>
              T([
                Ue("--tw-rotate-x"),
                Ue("--tw-rotate-y"),
                Ue("--tw-rotate-z"),
                Ue("--tw-skew-x"),
                Ue("--tw-skew-y"),
              ]);
          for (let t of ["x", "y", "z"])
            (o(`rotate-${t}`, {
              supportsNegative: !0,
              themeKeys: ["--rotate"],
              handleBareValue: ({ value: e }) => (Ae(e) ? `${e}deg` : null),
              handle: (r) => [
                a(),
                S(`--tw-rotate-${t}`, `rotate${t.toUpperCase()}(${r})`),
                S("transform", e),
              ],
            }),
              r(`rotate-${t}`, () => [
                {
                  supportsNegative: !0,
                  values: ["0", "1", "2", "3", "6", "12", "45", "90", "180"],
                  valueThemeKeys: ["--rotate"],
                },
              ]));
          (o("skew", {
            supportsNegative: !0,
            themeKeys: ["--skew"],
            handleBareValue: ({ value: e }) => (Ae(e) ? `${e}deg` : null),
            handle: (t) => [
              a(),
              S("--tw-skew-x", `skewX(${t})`),
              S("--tw-skew-y", `skewY(${t})`),
              S("transform", e),
            ],
          }),
            o("skew-x", {
              supportsNegative: !0,
              themeKeys: ["--skew"],
              handleBareValue: ({ value: e }) => (Ae(e) ? `${e}deg` : null),
              handle: (t) => [
                a(),
                S("--tw-skew-x", `skewX(${t})`),
                S("transform", e),
              ],
            }),
            o("skew-y", {
              supportsNegative: !0,
              themeKeys: ["--skew"],
              handleBareValue: ({ value: e }) => (Ae(e) ? `${e}deg` : null),
              handle: (t) => [
                a(),
                S("--tw-skew-y", `skewY(${t})`),
                S("transform", e),
              ],
            }),
            r("skew", () => [
              {
                supportsNegative: !0,
                values: ["0", "1", "2", "3", "6", "12"],
                valueThemeKeys: ["--skew"],
              },
            ]),
            r("skew-x", () => [
              {
                supportsNegative: !0,
                values: ["0", "1", "2", "3", "6", "12"],
                valueThemeKeys: ["--skew"],
              },
            ]),
            r("skew-y", () => [
              {
                supportsNegative: !0,
                values: ["0", "1", "2", "3", "6", "12"],
                valueThemeKeys: ["--skew"],
              },
            ]),
            t.functional("transform", (t) => {
              if (t.modifier) return;
              let r = null;
              return (
                t.value
                  ? "arbitrary" === t.value.kind && (r = t.value.value)
                  : (r = e),
                null !== r ? [a(), S("transform", r)] : void 0
              );
            }),
            r("transform", () => [{ hasDefaultValue: !0 }]),
            n("transform-cpu", [["transform", e]]),
            n("transform-gpu", [["transform", `translateZ(0) ${e}`]]),
            n("transform-none", [["transform", "none"]]));
        }
        (n("transform-flat", [["transform-style", "flat"]]),
          n("transform-3d", [["transform-style", "preserve-3d"]]),
          n("transform-content", [["transform-box", "content-box"]]),
          n("transform-border", [["transform-box", "border-box"]]),
          n("transform-fill", [["transform-box", "fill-box"]]),
          n("transform-stroke", [["transform-box", "stroke-box"]]),
          n("transform-view", [["transform-box", "view-box"]]),
          n("backface-visible", [["backface-visibility", "visible"]]),
          n("backface-hidden", [["backface-visibility", "hidden"]]));
        for (let e of [
          "auto",
          "default",
          "pointer",
          "wait",
          "text",
          "move",
          "help",
          "not-allowed",
          "none",
          "context-menu",
          "progress",
          "cell",
          "crosshair",
          "vertical-text",
          "alias",
          "copy",
          "no-drop",
          "grab",
          "grabbing",
          "all-scroll",
          "col-resize",
          "row-resize",
          "n-resize",
          "e-resize",
          "s-resize",
          "w-resize",
          "ne-resize",
          "nw-resize",
          "se-resize",
          "sw-resize",
          "ew-resize",
          "ns-resize",
          "nesw-resize",
          "nwse-resize",
          "zoom-in",
          "zoom-out",
        ])
          n(`cursor-${e}`, [["cursor", e]]);
        o("cursor", {
          themeKeys: ["--cursor"],
          handle: (e) => [S("cursor", e)],
        });
        for (let e of ["auto", "none", "manipulation"])
          n(`touch-${e}`, [["touch-action", e]]);
        let f = () =>
          T([Ue("--tw-pan-x"), Ue("--tw-pan-y"), Ue("--tw-pinch-zoom")]);
        for (let e of ["x", "left", "right"])
          n(`touch-pan-${e}`, [
            f,
            ["--tw-pan-x", `pan-${e}`],
            [
              "touch-action",
              "var(--tw-pan-x,) var(--tw-pan-y,) var(--tw-pinch-zoom,)",
            ],
          ]);
        for (let e of ["y", "up", "down"])
          n(`touch-pan-${e}`, [
            f,
            ["--tw-pan-y", `pan-${e}`],
            [
              "touch-action",
              "var(--tw-pan-x,) var(--tw-pan-y,) var(--tw-pinch-zoom,)",
            ],
          ]);
        n("touch-pinch-zoom", [
          f,
          ["--tw-pinch-zoom", "pinch-zoom"],
          [
            "touch-action",
            "var(--tw-pan-x,) var(--tw-pan-y,) var(--tw-pinch-zoom,)",
          ],
        ]);
        for (let e of ["none", "text", "all", "auto"])
          n(`select-${e}`, [
            ["-webkit-user-select", e],
            ["user-select", e],
          ]);
        (n("resize-none", [["resize", "none"]]),
          n("resize-x", [["resize", "horizontal"]]),
          n("resize-y", [["resize", "vertical"]]),
          n("resize", [["resize", "both"]]),
          n("snap-none", [["scroll-snap-type", "none"]]));
        let p = () => T([Ue("--tw-scroll-snap-strictness", "proximity", "*")]);
        for (let e of ["x", "y", "both"])
          n(`snap-${e}`, [
            p,
            ["scroll-snap-type", `${e} var(--tw-scroll-snap-strictness)`],
          ]);
        (n("snap-mandatory", [p, ["--tw-scroll-snap-strictness", "mandatory"]]),
          n("snap-proximity", [
            p,
            ["--tw-scroll-snap-strictness", "proximity"],
          ]),
          n("snap-align-none", [["scroll-snap-align", "none"]]),
          n("snap-start", [["scroll-snap-align", "start"]]),
          n("snap-end", [["scroll-snap-align", "end"]]),
          n("snap-center", [["scroll-snap-align", "center"]]),
          n("snap-normal", [["scroll-snap-stop", "normal"]]),
          n("snap-always", [["scroll-snap-stop", "always"]]));
        for (let [e, t] of [
          ["scroll-m", "scroll-margin"],
          ["scroll-mx", "scroll-margin-inline"],
          ["scroll-my", "scroll-margin-block"],
          ["scroll-ms", "scroll-margin-inline-start"],
          ["scroll-me", "scroll-margin-inline-end"],
          ["scroll-mt", "scroll-margin-top"],
          ["scroll-mr", "scroll-margin-right"],
          ["scroll-mb", "scroll-margin-bottom"],
          ["scroll-ml", "scroll-margin-left"],
        ])
          i(e, ["--scroll-margin", "--spacing"], (e) => [S(t, e)], {
            supportsNegative: !0,
          });
        for (let [e, t] of [
          ["scroll-p", "scroll-padding"],
          ["scroll-px", "scroll-padding-inline"],
          ["scroll-py", "scroll-padding-block"],
          ["scroll-ps", "scroll-padding-inline-start"],
          ["scroll-pe", "scroll-padding-inline-end"],
          ["scroll-pt", "scroll-padding-top"],
          ["scroll-pr", "scroll-padding-right"],
          ["scroll-pb", "scroll-padding-bottom"],
          ["scroll-pl", "scroll-padding-left"],
        ])
          i(e, ["--scroll-padding", "--spacing"], (e) => [S(t, e)]);
        (n("list-inside", [["list-style-position", "inside"]]),
          n("list-outside", [["list-style-position", "outside"]]),
          o("list", {
            themeKeys: ["--list-style-type"],
            handle: (e) => [S("list-style-type", e)],
            staticValues: {
              none: [S("list-style-type", "none")],
              disc: [S("list-style-type", "disc")],
              decimal: [S("list-style-type", "decimal")],
            },
          }),
          o("list-image", {
            themeKeys: ["--list-style-image"],
            handle: (e) => [S("list-style-image", e)],
            staticValues: { none: [S("list-style-image", "none")] },
          }),
          n("appearance-none", [["appearance", "none"]]),
          n("appearance-auto", [["appearance", "auto"]]),
          n("scheme-normal", [["color-scheme", "normal"]]),
          n("scheme-dark", [["color-scheme", "dark"]]),
          n("scheme-light", [["color-scheme", "light"]]),
          n("scheme-light-dark", [["color-scheme", "light dark"]]),
          n("scheme-only-dark", [["color-scheme", "only dark"]]),
          n("scheme-only-light", [["color-scheme", "only light"]]),
          o("columns", {
            themeKeys: ["--columns", "--container"],
            handleBareValue: ({ value: e }) => (Ae(e) ? e : null),
            handle: (e) => [S("columns", e)],
            staticValues: { auto: [S("columns", "auto")] },
          }),
          r("columns", () => [
            {
              values: Array.from({ length: 12 }, (e, t) => `${t + 1}`),
              valueThemeKeys: ["--columns", "--container"],
            },
          ]));
        for (let e of [
          "auto",
          "avoid",
          "all",
          "avoid-page",
          "page",
          "left",
          "right",
          "column",
        ])
          n(`break-before-${e}`, [["break-before", e]]);
        for (let e of ["auto", "avoid", "avoid-page", "avoid-column"])
          n(`break-inside-${e}`, [["break-inside", e]]);
        for (let e of [
          "auto",
          "avoid",
          "all",
          "avoid-page",
          "page",
          "left",
          "right",
          "column",
        ])
          n(`break-after-${e}`, [["break-after", e]]);
        (n("grid-flow-row", [["grid-auto-flow", "row"]]),
          n("grid-flow-col", [["grid-auto-flow", "column"]]),
          n("grid-flow-dense", [["grid-auto-flow", "dense"]]),
          n("grid-flow-row-dense", [["grid-auto-flow", "row dense"]]),
          n("grid-flow-col-dense", [["grid-auto-flow", "column dense"]]),
          o("auto-cols", {
            themeKeys: ["--grid-auto-columns"],
            handle: (e) => [S("grid-auto-columns", e)],
            staticValues: {
              auto: [S("grid-auto-columns", "auto")],
              min: [S("grid-auto-columns", "min-content")],
              max: [S("grid-auto-columns", "max-content")],
              fr: [S("grid-auto-columns", "minmax(0, 1fr)")],
            },
          }),
          o("auto-rows", {
            themeKeys: ["--grid-auto-rows"],
            handle: (e) => [S("grid-auto-rows", e)],
            staticValues: {
              auto: [S("grid-auto-rows", "auto")],
              min: [S("grid-auto-rows", "min-content")],
              max: [S("grid-auto-rows", "max-content")],
              fr: [S("grid-auto-rows", "minmax(0, 1fr)")],
            },
          }),
          o("grid-cols", {
            themeKeys: ["--grid-template-columns"],
            handleBareValue: ({ value: e }) =>
              ze(e) ? `repeat(${e}, minmax(0, 1fr))` : null,
            handle: (e) => [S("grid-template-columns", e)],
            staticValues: {
              none: [S("grid-template-columns", "none")],
              subgrid: [S("grid-template-columns", "subgrid")],
            },
          }),
          o("grid-rows", {
            themeKeys: ["--grid-template-rows"],
            handleBareValue: ({ value: e }) =>
              ze(e) ? `repeat(${e}, minmax(0, 1fr))` : null,
            handle: (e) => [S("grid-template-rows", e)],
            staticValues: {
              none: [S("grid-template-rows", "none")],
              subgrid: [S("grid-template-rows", "subgrid")],
            },
          }),
          r("grid-cols", () => [
            {
              values: Array.from({ length: 12 }, (e, t) => `${t + 1}`),
              valueThemeKeys: ["--grid-template-columns"],
            },
          ]),
          r("grid-rows", () => [
            {
              values: Array.from({ length: 12 }, (e, t) => `${t + 1}`),
              valueThemeKeys: ["--grid-template-rows"],
            },
          ]),
          n("flex-row", [["flex-direction", "row"]]),
          n("flex-row-reverse", [["flex-direction", "row-reverse"]]),
          n("flex-col", [["flex-direction", "column"]]),
          n("flex-col-reverse", [["flex-direction", "column-reverse"]]),
          n("flex-wrap", [["flex-wrap", "wrap"]]),
          n("flex-nowrap", [["flex-wrap", "nowrap"]]),
          n("flex-wrap-reverse", [["flex-wrap", "wrap-reverse"]]),
          n("place-content-center", [["place-content", "center"]]),
          n("place-content-start", [["place-content", "start"]]),
          n("place-content-end", [["place-content", "end"]]),
          n("place-content-center-safe", [["place-content", "safe center"]]),
          n("place-content-end-safe", [["place-content", "safe end"]]),
          n("place-content-between", [["place-content", "space-between"]]),
          n("place-content-around", [["place-content", "space-around"]]),
          n("place-content-evenly", [["place-content", "space-evenly"]]),
          n("place-content-baseline", [["place-content", "baseline"]]),
          n("place-content-stretch", [["place-content", "stretch"]]),
          n("place-items-center", [["place-items", "center"]]),
          n("place-items-start", [["place-items", "start"]]),
          n("place-items-end", [["place-items", "end"]]),
          n("place-items-center-safe", [["place-items", "safe center"]]),
          n("place-items-end-safe", [["place-items", "safe end"]]),
          n("place-items-baseline", [["place-items", "baseline"]]),
          n("place-items-stretch", [["place-items", "stretch"]]),
          n("content-normal", [["align-content", "normal"]]),
          n("content-center", [["align-content", "center"]]),
          n("content-start", [["align-content", "flex-start"]]),
          n("content-end", [["align-content", "flex-end"]]),
          n("content-center-safe", [["align-content", "safe center"]]),
          n("content-end-safe", [["align-content", "safe flex-end"]]),
          n("content-between", [["align-content", "space-between"]]),
          n("content-around", [["align-content", "space-around"]]),
          n("content-evenly", [["align-content", "space-evenly"]]),
          n("content-baseline", [["align-content", "baseline"]]),
          n("content-stretch", [["align-content", "stretch"]]),
          n("items-center", [["align-items", "center"]]),
          n("items-start", [["align-items", "flex-start"]]),
          n("items-end", [["align-items", "flex-end"]]),
          n("items-center-safe", [["align-items", "safe center"]]),
          n("items-end-safe", [["align-items", "safe flex-end"]]),
          n("items-baseline", [["align-items", "baseline"]]),
          n("items-baseline-last", [["align-items", "last baseline"]]),
          n("items-stretch", [["align-items", "stretch"]]),
          n("justify-normal", [["justify-content", "normal"]]),
          n("justify-center", [["justify-content", "center"]]),
          n("justify-start", [["justify-content", "flex-start"]]),
          n("justify-end", [["justify-content", "flex-end"]]),
          n("justify-center-safe", [["justify-content", "safe center"]]),
          n("justify-end-safe", [["justify-content", "safe flex-end"]]),
          n("justify-between", [["justify-content", "space-between"]]),
          n("justify-around", [["justify-content", "space-around"]]),
          n("justify-evenly", [["justify-content", "space-evenly"]]),
          n("justify-baseline", [["justify-content", "baseline"]]),
          n("justify-stretch", [["justify-content", "stretch"]]),
          n("justify-items-normal", [["justify-items", "normal"]]),
          n("justify-items-center", [["justify-items", "center"]]),
          n("justify-items-start", [["justify-items", "start"]]),
          n("justify-items-end", [["justify-items", "end"]]),
          n("justify-items-center-safe", [["justify-items", "safe center"]]),
          n("justify-items-end-safe", [["justify-items", "safe end"]]),
          n("justify-items-stretch", [["justify-items", "stretch"]]),
          i("gap", ["--gap", "--spacing"], (e) => [S("gap", e)]),
          i("gap-x", ["--gap", "--spacing"], (e) => [S("column-gap", e)]),
          i("gap-y", ["--gap", "--spacing"], (e) => [S("row-gap", e)]),
          i(
            "space-x",
            ["--space", "--spacing"],
            (e) => [
              T([Ue("--tw-space-x-reverse", "0")]),
              $(":where(& > :not(:last-child))", [
                S("--tw-sort", "row-gap"),
                S("--tw-space-x-reverse", "0"),
                S(
                  "margin-inline-start",
                  `calc(${e} * var(--tw-space-x-reverse))`,
                ),
                S(
                  "margin-inline-end",
                  `calc(${e} * calc(1 - var(--tw-space-x-reverse)))`,
                ),
              ]),
            ],
            { supportsNegative: !0 },
          ),
          i(
            "space-y",
            ["--space", "--spacing"],
            (e) => [
              T([Ue("--tw-space-y-reverse", "0")]),
              $(":where(& > :not(:last-child))", [
                S("--tw-sort", "column-gap"),
                S("--tw-space-y-reverse", "0"),
                S(
                  "margin-block-start",
                  `calc(${e} * var(--tw-space-y-reverse))`,
                ),
                S(
                  "margin-block-end",
                  `calc(${e} * calc(1 - var(--tw-space-y-reverse)))`,
                ),
              ]),
            ],
            { supportsNegative: !0 },
          ),
          n("space-x-reverse", [
            () => T([Ue("--tw-space-x-reverse", "0")]),
            () =>
              $(":where(& > :not(:last-child))", [
                S("--tw-sort", "row-gap"),
                S("--tw-space-x-reverse", "1"),
              ]),
          ]),
          n("space-y-reverse", [
            () => T([Ue("--tw-space-y-reverse", "0")]),
            () =>
              $(":where(& > :not(:last-child))", [
                S("--tw-sort", "column-gap"),
                S("--tw-space-y-reverse", "1"),
              ]),
          ]),
          n("accent-auto", [["accent-color", "auto"]]),
          a("accent", {
            themeKeys: ["--accent-color", "--color"],
            handle: (e) => [S("accent-color", e)],
          }),
          a("caret", {
            themeKeys: ["--caret-color", "--color"],
            handle: (e) => [S("caret-color", e)],
          }),
          a("divide", {
            themeKeys: ["--divide-color", "--border-color", "--color"],
            handle: (e) => [
              $(":where(& > :not(:last-child))", [
                S("--tw-sort", "divide-color"),
                S("border-color", e),
              ]),
            ],
          }),
          n("place-self-auto", [["place-self", "auto"]]),
          n("place-self-start", [["place-self", "start"]]),
          n("place-self-end", [["place-self", "end"]]),
          n("place-self-center", [["place-self", "center"]]),
          n("place-self-end-safe", [["place-self", "safe end"]]),
          n("place-self-center-safe", [["place-self", "safe center"]]),
          n("place-self-stretch", [["place-self", "stretch"]]),
          n("self-auto", [["align-self", "auto"]]),
          n("self-start", [["align-self", "flex-start"]]),
          n("self-end", [["align-self", "flex-end"]]),
          n("self-center", [["align-self", "center"]]),
          n("self-end-safe", [["align-self", "safe flex-end"]]),
          n("self-center-safe", [["align-self", "safe center"]]),
          n("self-stretch", [["align-self", "stretch"]]),
          n("self-baseline", [["align-self", "baseline"]]),
          n("self-baseline-last", [["align-self", "last baseline"]]),
          n("justify-self-auto", [["justify-self", "auto"]]),
          n("justify-self-start", [["justify-self", "flex-start"]]),
          n("justify-self-end", [["justify-self", "flex-end"]]),
          n("justify-self-center", [["justify-self", "center"]]),
          n("justify-self-end-safe", [["justify-self", "safe flex-end"]]),
          n("justify-self-center-safe", [["justify-self", "safe center"]]),
          n("justify-self-stretch", [["justify-self", "stretch"]]));
        for (let e of ["auto", "hidden", "clip", "visible", "scroll"])
          (n(`overflow-${e}`, [["overflow", e]]),
            n(`overflow-x-${e}`, [["overflow-x", e]]),
            n(`overflow-y-${e}`, [["overflow-y", e]]));
        for (let e of ["auto", "contain", "none"])
          (n(`overscroll-${e}`, [["overscroll-behavior", e]]),
            n(`overscroll-x-${e}`, [["overscroll-behavior-x", e]]),
            n(`overscroll-y-${e}`, [["overscroll-behavior-y", e]]));
        (n("scroll-auto", [["scroll-behavior", "auto"]]),
          n("scroll-smooth", [["scroll-behavior", "smooth"]]),
          n("truncate", [
            ["overflow", "hidden"],
            ["text-overflow", "ellipsis"],
            ["white-space", "nowrap"],
          ]),
          n("text-ellipsis", [["text-overflow", "ellipsis"]]),
          n("text-clip", [["text-overflow", "clip"]]),
          n("hyphens-none", [
            ["-webkit-hyphens", "none"],
            ["hyphens", "none"],
          ]),
          n("hyphens-manual", [
            ["-webkit-hyphens", "manual"],
            ["hyphens", "manual"],
          ]),
          n("hyphens-auto", [
            ["-webkit-hyphens", "auto"],
            ["hyphens", "auto"],
          ]),
          n("whitespace-normal", [["white-space", "normal"]]),
          n("whitespace-nowrap", [["white-space", "nowrap"]]),
          n("whitespace-pre", [["white-space", "pre"]]),
          n("whitespace-pre-line", [["white-space", "pre-line"]]),
          n("whitespace-pre-wrap", [["white-space", "pre-wrap"]]),
          n("whitespace-break-spaces", [["white-space", "break-spaces"]]),
          n("text-wrap", [["text-wrap", "wrap"]]),
          n("text-nowrap", [["text-wrap", "nowrap"]]),
          n("text-balance", [["text-wrap", "balance"]]),
          n("text-pretty", [["text-wrap", "pretty"]]),
          n("break-normal", [
            ["overflow-wrap", "normal"],
            ["word-break", "normal"],
          ]),
          n("break-all", [["word-break", "break-all"]]),
          n("break-keep", [["word-break", "keep-all"]]),
          n("wrap-anywhere", [["overflow-wrap", "anywhere"]]),
          n("wrap-break-word", [["overflow-wrap", "break-word"]]),
          n("wrap-normal", [["overflow-wrap", "normal"]]));
        for (let [e, t] of [
          ["rounded", ["border-radius"]],
          [
            "rounded-s",
            ["border-start-start-radius", "border-end-start-radius"],
          ],
          ["rounded-e", ["border-start-end-radius", "border-end-end-radius"]],
          ["rounded-t", ["border-top-left-radius", "border-top-right-radius"]],
          [
            "rounded-r",
            ["border-top-right-radius", "border-bottom-right-radius"],
          ],
          [
            "rounded-b",
            ["border-bottom-right-radius", "border-bottom-left-radius"],
          ],
          [
            "rounded-l",
            ["border-top-left-radius", "border-bottom-left-radius"],
          ],
          ["rounded-ss", ["border-start-start-radius"]],
          ["rounded-se", ["border-start-end-radius"]],
          ["rounded-ee", ["border-end-end-radius"]],
          ["rounded-es", ["border-end-start-radius"]],
          ["rounded-tl", ["border-top-left-radius"]],
          ["rounded-tr", ["border-top-right-radius"]],
          ["rounded-br", ["border-bottom-right-radius"]],
          ["rounded-bl", ["border-bottom-left-radius"]],
        ])
          o(e, {
            themeKeys: ["--radius"],
            handle: (e) => t.map((t) => S(t, e)),
            staticValues: {
              none: t.map((e) => S(e, "0")),
              full: t.map((e) => S(e, "calc(infinity * 1px)")),
            },
          });
        (n("border-solid", [
          ["--tw-border-style", "solid"],
          ["border-style", "solid"],
        ]),
          n("border-dashed", [
            ["--tw-border-style", "dashed"],
            ["border-style", "dashed"],
          ]),
          n("border-dotted", [
            ["--tw-border-style", "dotted"],
            ["border-style", "dotted"],
          ]),
          n("border-double", [
            ["--tw-border-style", "double"],
            ["border-style", "double"],
          ]),
          n("border-hidden", [
            ["--tw-border-style", "hidden"],
            ["border-style", "hidden"],
          ]),
          n("border-none", [
            ["--tw-border-style", "none"],
            ["border-style", "none"],
          ]));
        {
          let a = function (n, o) {
              (t.functional(n, (t) => {
                if (!t.value) {
                  if (t.modifier) return;
                  let r = e.get(["--default-border-width"]) ?? "1px",
                    n = o.width(r);
                  return n ? [i(), ...n] : void 0;
                }
                if ("arbitrary" === t.value.kind) {
                  let r = t.value.value;
                  switch (
                    t.value.dataType ??
                    ce(r, ["color", "line-width", "length"])
                  ) {
                    case "line-width":
                    case "length": {
                      if (t.modifier) return;
                      let e = o.width(r);
                      return e ? [i(), ...e] : void 0;
                    }
                    default:
                      return (
                        (r = De(r, t.modifier, e)),
                        null === r ? void 0 : o.color(r)
                      );
                  }
                }
                {
                  let r = _e(t, e, ["--border-color", "--color"]);
                  if (r) return o.color(r);
                }
                {
                  if (t.modifier) return;
                  let r = e.resolve(t.value.value, ["--border-width"]);
                  if (r) {
                    let e = o.width(r);
                    return e ? [i(), ...e] : void 0;
                  }
                  if (Ae(t.value.value)) {
                    let e = o.width(`${t.value.value}px`);
                    return e ? [i(), ...e] : void 0;
                  }
                }
              }),
                r(n, () => [
                  {
                    values: ["current", "inherit", "transparent"],
                    valueThemeKeys: ["--border-color", "--color"],
                    modifiers: Array.from({ length: 21 }, (e, t) => "" + 5 * t),
                    hasDefaultValue: !0,
                  },
                  {
                    values: ["0", "2", "4", "8"],
                    valueThemeKeys: ["--border-width"],
                  },
                ]));
            },
            i = () => T([Ue("--tw-border-style", "solid")]);
          (a("border", {
            width: (e) => [
              S("border-style", "var(--tw-border-style)"),
              S("border-width", e),
            ],
            color: (e) => [S("border-color", e)],
          }),
            a("border-x", {
              width: (e) => [
                S("border-inline-style", "var(--tw-border-style)"),
                S("border-inline-width", e),
              ],
              color: (e) => [S("border-inline-color", e)],
            }),
            a("border-y", {
              width: (e) => [
                S("border-block-style", "var(--tw-border-style)"),
                S("border-block-width", e),
              ],
              color: (e) => [S("border-block-color", e)],
            }),
            a("border-s", {
              width: (e) => [
                S("border-inline-start-style", "var(--tw-border-style)"),
                S("border-inline-start-width", e),
              ],
              color: (e) => [S("border-inline-start-color", e)],
            }),
            a("border-e", {
              width: (e) => [
                S("border-inline-end-style", "var(--tw-border-style)"),
                S("border-inline-end-width", e),
              ],
              color: (e) => [S("border-inline-end-color", e)],
            }),
            a("border-t", {
              width: (e) => [
                S("border-top-style", "var(--tw-border-style)"),
                S("border-top-width", e),
              ],
              color: (e) => [S("border-top-color", e)],
            }),
            a("border-r", {
              width: (e) => [
                S("border-right-style", "var(--tw-border-style)"),
                S("border-right-width", e),
              ],
              color: (e) => [S("border-right-color", e)],
            }),
            a("border-b", {
              width: (e) => [
                S("border-bottom-style", "var(--tw-border-style)"),
                S("border-bottom-width", e),
              ],
              color: (e) => [S("border-bottom-color", e)],
            }),
            a("border-l", {
              width: (e) => [
                S("border-left-style", "var(--tw-border-style)"),
                S("border-left-width", e),
              ],
              color: (e) => [S("border-left-color", e)],
            }),
            o("divide-x", {
              defaultValue: e.get(["--default-border-width"]) ?? "1px",
              themeKeys: ["--divide-width", "--border-width"],
              handleBareValue: ({ value: e }) => (Ae(e) ? `${e}px` : null),
              handle: (e) => [
                T([Ue("--tw-divide-x-reverse", "0")]),
                $(":where(& > :not(:last-child))", [
                  S("--tw-sort", "divide-x-width"),
                  i(),
                  S("--tw-divide-x-reverse", "0"),
                  S("border-inline-style", "var(--tw-border-style)"),
                  S(
                    "border-inline-start-width",
                    `calc(${e} * var(--tw-divide-x-reverse))`,
                  ),
                  S(
                    "border-inline-end-width",
                    `calc(${e} * calc(1 - var(--tw-divide-x-reverse)))`,
                  ),
                ]),
              ],
            }),
            o("divide-y", {
              defaultValue: e.get(["--default-border-width"]) ?? "1px",
              themeKeys: ["--divide-width", "--border-width"],
              handleBareValue: ({ value: e }) => (Ae(e) ? `${e}px` : null),
              handle: (e) => [
                T([Ue("--tw-divide-y-reverse", "0")]),
                $(":where(& > :not(:last-child))", [
                  S("--tw-sort", "divide-y-width"),
                  i(),
                  S("--tw-divide-y-reverse", "0"),
                  S("border-bottom-style", "var(--tw-border-style)"),
                  S("border-top-style", "var(--tw-border-style)"),
                  S(
                    "border-top-width",
                    `calc(${e} * var(--tw-divide-y-reverse))`,
                  ),
                  S(
                    "border-bottom-width",
                    `calc(${e} * calc(1 - var(--tw-divide-y-reverse)))`,
                  ),
                ]),
              ],
            }),
            r("divide-x", () => [
              {
                values: ["0", "2", "4", "8"],
                valueThemeKeys: ["--divide-width", "--border-width"],
                hasDefaultValue: !0,
              },
            ]),
            r("divide-y", () => [
              {
                values: ["0", "2", "4", "8"],
                valueThemeKeys: ["--divide-width", "--border-width"],
                hasDefaultValue: !0,
              },
            ]),
            n("divide-x-reverse", [
              () => T([Ue("--tw-divide-x-reverse", "0")]),
              () =>
                $(":where(& > :not(:last-child))", [
                  S("--tw-divide-x-reverse", "1"),
                ]),
            ]),
            n("divide-y-reverse", [
              () => T([Ue("--tw-divide-y-reverse", "0")]),
              () =>
                $(":where(& > :not(:last-child))", [
                  S("--tw-divide-y-reverse", "1"),
                ]),
            ]));
          for (let e of ["solid", "dashed", "dotted", "double", "none"])
            n(`divide-${e}`, [
              () =>
                $(":where(& > :not(:last-child))", [
                  S("--tw-sort", "divide-style"),
                  S("--tw-border-style", e),
                  S("border-style", e),
                ]),
            ]);
        }
        (n("bg-auto", [["background-size", "auto"]]),
          n("bg-cover", [["background-size", "cover"]]),
          n("bg-contain", [["background-size", "contain"]]),
          o("bg-size", {
            handle(e) {
              if (e) return [S("background-size", e)];
            },
          }),
          n("bg-fixed", [["background-attachment", "fixed"]]),
          n("bg-local", [["background-attachment", "local"]]),
          n("bg-scroll", [["background-attachment", "scroll"]]),
          n("bg-top", [["background-position", "top"]]),
          n("bg-top-left", [["background-position", "left top"]]),
          n("bg-top-right", [["background-position", "right top"]]),
          n("bg-bottom", [["background-position", "bottom"]]),
          n("bg-bottom-left", [["background-position", "left bottom"]]),
          n("bg-bottom-right", [["background-position", "right bottom"]]),
          n("bg-left", [["background-position", "left"]]),
          n("bg-right", [["background-position", "right"]]),
          n("bg-center", [["background-position", "center"]]),
          o("bg-position", {
            handle(e) {
              if (e) return [S("background-position", e)];
            },
          }),
          n("bg-repeat", [["background-repeat", "repeat"]]),
          n("bg-no-repeat", [["background-repeat", "no-repeat"]]),
          n("bg-repeat-x", [["background-repeat", "repeat-x"]]),
          n("bg-repeat-y", [["background-repeat", "repeat-y"]]),
          n("bg-repeat-round", [["background-repeat", "round"]]),
          n("bg-repeat-space", [["background-repeat", "space"]]),
          n("bg-none", [["background-image", "none"]]));
        {
          let e = function (e) {
              let t = "in oklab";
              if ("named" === e?.kind)
                switch (e.value) {
                  case "longer":
                  case "shorter":
                  case "increasing":
                  case "decreasing":
                    t = `in oklch ${e.value} hue`;
                    break;
                  default:
                    t = `in ${e.value}`;
                }
              else "arbitrary" === e?.kind && (t = e.value);
              return t;
            },
            n = function ({ negative: t }) {
              return (r) => {
                if (!r.value) return;
                if ("arbitrary" === r.value.kind) {
                  if (r.modifier) return;
                  let e = r.value.value;
                  return "angle" === (r.value.dataType ?? ce(e, ["angle"]))
                    ? ((e = t ? `calc(${e} * -1)` : `${e}`),
                      [
                        S("--tw-gradient-position", e),
                        S(
                          "background-image",
                          `linear-gradient(var(--tw-gradient-stops,${e}))`,
                        ),
                      ])
                    : t
                      ? void 0
                      : [
                          S("--tw-gradient-position", e),
                          S(
                            "background-image",
                            `linear-gradient(var(--tw-gradient-stops,${e}))`,
                          ),
                        ];
                }
                let n = r.value.value;
                if (!t && i.has(n)) n = i.get(n);
                else {
                  if (!Ae(n)) return;
                  n = t ? `calc(${n}deg * -1)` : `${n}deg`;
                }
                let o = e(r.modifier);
                return [
                  S("--tw-gradient-position", `${n}`),
                  z(
                    "@supports (background-image: linear-gradient(in lab, red, red))",
                    [S("--tw-gradient-position", `${n} ${o}`)],
                  ),
                  S(
                    "background-image",
                    "linear-gradient(var(--tw-gradient-stops))",
                  ),
                ];
              };
            },
            o = function ({ negative: t }) {
              return (r) => {
                if ("arbitrary" === r.value?.kind) {
                  if (r.modifier) return;
                  let e = r.value.value;
                  return [
                    S("--tw-gradient-position", e),
                    S(
                      "background-image",
                      `conic-gradient(var(--tw-gradient-stops,${e}))`,
                    ),
                  ];
                }
                let n = e(r.modifier);
                if (!r.value)
                  return [
                    S("--tw-gradient-position", n),
                    S(
                      "background-image",
                      "conic-gradient(var(--tw-gradient-stops))",
                    ),
                  ];
                let o = r.value.value;
                return Ae(o)
                  ? ((o = t ? `calc(${o}deg * -1)` : `${o}deg`),
                    [
                      S("--tw-gradient-position", `from ${o} ${n}`),
                      S(
                        "background-image",
                        "conic-gradient(var(--tw-gradient-stops))",
                      ),
                    ])
                  : void 0;
              };
            },
            a = [
              "oklab",
              "oklch",
              "srgb",
              "hsl",
              "longer",
              "shorter",
              "increasing",
              "decreasing",
            ],
            i = new Map([
              ["to-t", "to top"],
              ["to-tr", "to top right"],
              ["to-r", "to right"],
              ["to-br", "to bottom right"],
              ["to-b", "to bottom"],
              ["to-bl", "to bottom left"],
              ["to-l", "to left"],
              ["to-tl", "to top left"],
            ]);
          (t.functional("-bg-linear", n({ negative: !0 })),
            t.functional("bg-linear", n({ negative: !1 })),
            r("bg-linear", () => [
              { values: [...i.keys()], modifiers: a },
              {
                values: [
                  "0",
                  "30",
                  "60",
                  "90",
                  "120",
                  "150",
                  "180",
                  "210",
                  "240",
                  "270",
                  "300",
                  "330",
                ],
                supportsNegative: !0,
                modifiers: a,
              },
            ]),
            t.functional("-bg-conic", o({ negative: !0 })),
            t.functional("bg-conic", o({ negative: !1 })),
            r("bg-conic", () => [
              { hasDefaultValue: !0, modifiers: a },
              {
                values: [
                  "0",
                  "30",
                  "60",
                  "90",
                  "120",
                  "150",
                  "180",
                  "210",
                  "240",
                  "270",
                  "300",
                  "330",
                ],
                supportsNegative: !0,
                modifiers: a,
              },
            ]),
            t.functional("bg-radial", (t) => {
              if (!t.value)
                return [
                  S("--tw-gradient-position", e(t.modifier)),
                  S(
                    "background-image",
                    "radial-gradient(var(--tw-gradient-stops))",
                  ),
                ];
              if ("arbitrary" === t.value.kind) {
                if (t.modifier) return;
                let e = t.value.value;
                return [
                  S("--tw-gradient-position", e),
                  S(
                    "background-image",
                    `radial-gradient(var(--tw-gradient-stops,${e}))`,
                  ),
                ];
              }
            }),
            r("bg-radial", () => [{ hasDefaultValue: !0, modifiers: a }]));
        }
        (t.functional("bg", (t) => {
          if (t.value) {
            if ("arbitrary" === t.value.kind) {
              let r = t.value.value;
              switch (
                t.value.dataType ??
                ce(r, [
                  "image",
                  "color",
                  "percentage",
                  "position",
                  "bg-size",
                  "length",
                  "url",
                ])
              ) {
                case "percentage":
                case "position":
                  return t.modifier ? void 0 : [S("background-position", r)];
                case "bg-size":
                case "length":
                case "size":
                  return t.modifier ? void 0 : [S("background-size", r)];
                case "image":
                case "url":
                  return t.modifier ? void 0 : [S("background-image", r)];
                default:
                  return (
                    (r = De(r, t.modifier, e)),
                    null === r ? void 0 : [S("background-color", r)]
                  );
              }
            }
            {
              let r = _e(t, e, ["--background-color", "--color"]);
              if (r) return [S("background-color", r)];
            }
            {
              if (t.modifier) return;
              let r = e.resolve(t.value.value, ["--background-image"]);
              if (r) return [S("background-image", r)];
            }
          }
        }),
          r("bg", () => [
            {
              values: ["current", "inherit", "transparent"],
              valueThemeKeys: ["--background-color", "--color"],
              modifiers: Array.from({ length: 21 }, (e, t) => "" + 5 * t),
            },
            { values: [], valueThemeKeys: ["--background-image"] },
          ]));
        let h = () =>
          T([
            Ue("--tw-gradient-position"),
            Ue("--tw-gradient-from", "#0000", "<color>"),
            Ue("--tw-gradient-via", "#0000", "<color>"),
            Ue("--tw-gradient-to", "#0000", "<color>"),
            Ue("--tw-gradient-stops"),
            Ue("--tw-gradient-via-stops"),
            Ue("--tw-gradient-from-position", "0%", "<length-percentage>"),
            Ue("--tw-gradient-via-position", "50%", "<length-percentage>"),
            Ue("--tw-gradient-to-position", "100%", "<length-percentage>"),
          ]);
        function m(n, o) {
          (t.functional(n, (t) => {
            if (t.value) {
              if ("arbitrary" === t.value.kind) {
                let r = t.value.value;
                switch (
                  t.value.dataType ??
                  ce(r, ["color", "length", "percentage"])
                ) {
                  case "length":
                  case "percentage":
                    return t.modifier ? void 0 : o.position(r);
                  default:
                    return (
                      (r = De(r, t.modifier, e)),
                      null === r ? void 0 : o.color(r)
                    );
                }
              }
              {
                let r = _e(t, e, ["--background-color", "--color"]);
                if (r) return o.color(r);
              }
              {
                if (t.modifier) return;
                let r = e.resolve(t.value.value, [
                  "--gradient-color-stop-positions",
                ]);
                if (r) return o.position(r);
                if (
                  "%" === t.value.value[t.value.value.length - 1] &&
                  Ae(t.value.value.slice(0, -1))
                )
                  return o.position(t.value.value);
              }
            }
          }),
            r(n, () => [
              {
                values: ["current", "inherit", "transparent"],
                valueThemeKeys: ["--background-color", "--color"],
                modifiers: Array.from({ length: 21 }, (e, t) => "" + 5 * t),
              },
              {
                values: Array.from({ length: 21 }, (e, t) => 5 * t + "%"),
                valueThemeKeys: ["--gradient-color-stop-positions"],
              },
            ]));
        }
        (m("from", {
          color: (e) => [
            h(),
            S("--tw-sort", "--tw-gradient-from"),
            S("--tw-gradient-from", e),
            S(
              "--tw-gradient-stops",
              "var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))",
            ),
          ],
          position: (e) => [h(), S("--tw-gradient-from-position", e)],
        }),
          n("via-none", [["--tw-gradient-via-stops", "initial"]]),
          m("via", {
            color: (e) => [
              h(),
              S("--tw-sort", "--tw-gradient-via"),
              S("--tw-gradient-via", e),
              S(
                "--tw-gradient-via-stops",
                "var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position)",
              ),
              S("--tw-gradient-stops", "var(--tw-gradient-via-stops)"),
            ],
            position: (e) => [h(), S("--tw-gradient-via-position", e)],
          }),
          m("to", {
            color: (e) => [
              h(),
              S("--tw-sort", "--tw-gradient-to"),
              S("--tw-gradient-to", e),
              S(
                "--tw-gradient-stops",
                "var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))",
              ),
            ],
            position: (e) => [h(), S("--tw-gradient-to-position", e)],
          }),
          n("mask-none", [["mask-image", "none"]]),
          t.functional("mask", (e) => {
            if (!e.value || e.modifier || "arbitrary" !== e.value.kind) return;
            let t = e.value.value;
            switch (
              e.value.dataType ??
              ce(t, [
                "image",
                "percentage",
                "position",
                "bg-size",
                "length",
                "url",
              ])
            ) {
              case "percentage":
              case "position":
                return e.modifier ? void 0 : [S("mask-position", t)];
              case "bg-size":
              case "length":
              case "size":
                return [S("mask-size", t)];
              default:
                return [S("mask-image", t)];
            }
          }),
          n("mask-add", [["mask-composite", "add"]]),
          n("mask-subtract", [["mask-composite", "subtract"]]),
          n("mask-intersect", [["mask-composite", "intersect"]]),
          n("mask-exclude", [["mask-composite", "exclude"]]),
          n("mask-alpha", [["mask-mode", "alpha"]]),
          n("mask-luminance", [["mask-mode", "luminance"]]),
          n("mask-match", [["mask-mode", "match-source"]]),
          n("mask-type-alpha", [["mask-type", "alpha"]]),
          n("mask-type-luminance", [["mask-type", "luminance"]]),
          n("mask-auto", [["mask-size", "auto"]]),
          n("mask-cover", [["mask-size", "cover"]]),
          n("mask-contain", [["mask-size", "contain"]]),
          o("mask-size", {
            handle(e) {
              if (e) return [S("mask-size", e)];
            },
          }),
          n("mask-top", [["mask-position", "top"]]),
          n("mask-top-left", [["mask-position", "left top"]]),
          n("mask-top-right", [["mask-position", "right top"]]),
          n("mask-bottom", [["mask-position", "bottom"]]),
          n("mask-bottom-left", [["mask-position", "left bottom"]]),
          n("mask-bottom-right", [["mask-position", "right bottom"]]),
          n("mask-left", [["mask-position", "left"]]),
          n("mask-right", [["mask-position", "right"]]),
          n("mask-center", [["mask-position", "center"]]),
          o("mask-position", {
            handle(e) {
              if (e) return [S("mask-position", e)];
            },
          }),
          n("mask-repeat", [["mask-repeat", "repeat"]]),
          n("mask-no-repeat", [["mask-repeat", "no-repeat"]]),
          n("mask-repeat-x", [["mask-repeat", "repeat-x"]]),
          n("mask-repeat-y", [["mask-repeat", "repeat-y"]]),
          n("mask-repeat-round", [["mask-repeat", "round"]]),
          n("mask-repeat-space", [["mask-repeat", "space"]]),
          n("mask-clip-border", [["mask-clip", "border-box"]]),
          n("mask-clip-padding", [["mask-clip", "padding-box"]]),
          n("mask-clip-content", [["mask-clip", "content-box"]]),
          n("mask-clip-fill", [["mask-clip", "fill-box"]]),
          n("mask-clip-stroke", [["mask-clip", "stroke-box"]]),
          n("mask-clip-view", [["mask-clip", "view-box"]]),
          n("mask-no-clip", [["mask-clip", "no-clip"]]),
          n("mask-origin-border", [["mask-origin", "border-box"]]),
          n("mask-origin-padding", [["mask-origin", "padding-box"]]),
          n("mask-origin-content", [["mask-origin", "content-box"]]),
          n("mask-origin-fill", [["mask-origin", "fill-box"]]),
          n("mask-origin-stroke", [["mask-origin", "stroke-box"]]),
          n("mask-origin-view", [["mask-origin", "view-box"]]));
        let g = () =>
          T([
            Ue("--tw-mask-linear", "linear-gradient(#fff, #fff)"),
            Ue("--tw-mask-radial", "linear-gradient(#fff, #fff)"),
            Ue("--tw-mask-conic", "linear-gradient(#fff, #fff)"),
          ]);
        function v(n, o) {
          (t.functional(n, (t) => {
            if (t.value) {
              if ("arbitrary" === t.value.kind) {
                let r = t.value.value;
                switch (
                  t.value.dataType ??
                  ce(r, ["length", "percentage", "color"])
                ) {
                  case "color":
                    return (
                      (r = De(r, t.modifier, e)),
                      null === r ? void 0 : o.color(r)
                    );
                  case "percentage":
                    return t.modifier || !Ae(r.slice(0, -1))
                      ? void 0
                      : o.position(r);
                  default:
                    return t.modifier ? void 0 : o.position(r);
                }
              }
              {
                let r = _e(t, e, ["--background-color", "--color"]);
                if (r) return o.color(r);
              }
              {
                if (t.modifier) return;
                let r = ce(t.value.value, ["number", "percentage"]);
                if (!r) return;
                switch (r) {
                  case "number": {
                    let r = e.resolve(null, ["--spacing"]);
                    return r && Se(t.value.value)
                      ? o.position(`calc(${r} * ${t.value.value})`)
                      : void 0;
                  }
                  case "percentage":
                    return Ae(t.value.value.slice(0, -1))
                      ? o.position(t.value.value)
                      : void 0;
                  default:
                    return;
                }
              }
            }
          }),
            r(n, () => [
              {
                values: ["current", "inherit", "transparent"],
                valueThemeKeys: ["--background-color", "--color"],
                modifiers: Array.from({ length: 21 }, (e, t) => "" + 5 * t),
              },
              {
                values: Array.from({ length: 21 }, (e, t) => 5 * t + "%"),
                valueThemeKeys: ["--gradient-color-stop-positions"],
              },
            ]),
            r(n, () => [
              { values: Array.from({ length: 21 }, (e, t) => 5 * t + "%") },
              { values: e.get(["--spacing"]) ? Oe : [] },
              {
                values: ["current", "inherit", "transparent"],
                valueThemeKeys: ["--background-color", "--color"],
                modifiers: Array.from({ length: 21 }, (e, t) => "" + 5 * t),
              },
            ]));
        }
        let w = () =>
          T([
            Ue("--tw-mask-left", "linear-gradient(#fff, #fff)"),
            Ue("--tw-mask-right", "linear-gradient(#fff, #fff)"),
            Ue("--tw-mask-bottom", "linear-gradient(#fff, #fff)"),
            Ue("--tw-mask-top", "linear-gradient(#fff, #fff)"),
          ]);
        function k(e, t, r) {
          v(e, {
            color(e) {
              let n = [
                g(),
                w(),
                S(
                  "mask-image",
                  "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)",
                ),
                S("mask-composite", "intersect"),
                S(
                  "--tw-mask-linear",
                  "var(--tw-mask-left), var(--tw-mask-right), var(--tw-mask-bottom), var(--tw-mask-top)",
                ),
              ];
              for (let o of ["top", "right", "bottom", "left"])
                r[o] &&
                  (n.push(
                    S(
                      `--tw-mask-${o}`,
                      `linear-gradient(to ${o}, var(--tw-mask-${o}-from-color) var(--tw-mask-${o}-from-position), var(--tw-mask-${o}-to-color) var(--tw-mask-${o}-to-position))`,
                    ),
                  ),
                  n.push(
                    T([
                      Ue(`--tw-mask-${o}-from-position`, "0%"),
                      Ue(`--tw-mask-${o}-to-position`, "100%"),
                      Ue(`--tw-mask-${o}-from-color`, "black"),
                      Ue(`--tw-mask-${o}-to-color`, "transparent"),
                    ]),
                  ),
                  n.push(S(`--tw-mask-${o}-${t}-color`, e)));
              return n;
            },
            position(e) {
              let n = [
                g(),
                w(),
                S(
                  "mask-image",
                  "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)",
                ),
                S("mask-composite", "intersect"),
                S(
                  "--tw-mask-linear",
                  "var(--tw-mask-left), var(--tw-mask-right), var(--tw-mask-bottom), var(--tw-mask-top)",
                ),
              ];
              for (let o of ["top", "right", "bottom", "left"])
                r[o] &&
                  (n.push(
                    S(
                      `--tw-mask-${o}`,
                      `linear-gradient(to ${o}, var(--tw-mask-${o}-from-color) var(--tw-mask-${o}-from-position), var(--tw-mask-${o}-to-color) var(--tw-mask-${o}-to-position))`,
                    ),
                  ),
                  n.push(
                    T([
                      Ue(`--tw-mask-${o}-from-position`, "0%"),
                      Ue(`--tw-mask-${o}-to-position`, "100%"),
                      Ue(`--tw-mask-${o}-from-color`, "black"),
                      Ue(`--tw-mask-${o}-to-color`, "transparent"),
                    ]),
                  ),
                  n.push(S(`--tw-mask-${o}-${t}-position`, e)));
              return n;
            },
          });
        }
        (k("mask-x-from", "from", { top: !1, right: !0, bottom: !1, left: !0 }),
          k("mask-x-to", "to", { top: !1, right: !0, bottom: !1, left: !0 }),
          k("mask-y-from", "from", {
            top: !0,
            right: !1,
            bottom: !0,
            left: !1,
          }),
          k("mask-y-to", "to", { top: !0, right: !1, bottom: !0, left: !1 }),
          k("mask-t-from", "from", {
            top: !0,
            right: !1,
            bottom: !1,
            left: !1,
          }),
          k("mask-t-to", "to", { top: !0, right: !1, bottom: !1, left: !1 }),
          k("mask-r-from", "from", {
            top: !1,
            right: !0,
            bottom: !1,
            left: !1,
          }),
          k("mask-r-to", "to", { top: !1, right: !0, bottom: !1, left: !1 }),
          k("mask-b-from", "from", {
            top: !1,
            right: !1,
            bottom: !0,
            left: !1,
          }),
          k("mask-b-to", "to", { top: !1, right: !1, bottom: !0, left: !1 }),
          k("mask-l-from", "from", {
            top: !1,
            right: !1,
            bottom: !1,
            left: !0,
          }),
          k("mask-l-to", "to", { top: !1, right: !1, bottom: !1, left: !0 }));
        let b = () =>
          T([
            Ue("--tw-mask-linear-position", "0deg"),
            Ue("--tw-mask-linear-from-position", "0%"),
            Ue("--tw-mask-linear-to-position", "100%"),
            Ue("--tw-mask-linear-from-color", "black"),
            Ue("--tw-mask-linear-to-color", "transparent"),
          ]);
        (o("mask-linear", {
          defaultValue: null,
          supportsNegative: !0,
          supportsFractions: !1,
          handleBareValue: (e) =>
            Ae(e.value) ? `calc(1deg * ${e.value})` : null,
          handleNegativeBareValue: (e) =>
            Ae(e.value) ? `calc(1deg * -${e.value})` : null,
          handle: (e) => [
            g(),
            b(),
            S(
              "mask-image",
              "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)",
            ),
            S("mask-composite", "intersect"),
            S(
              "--tw-mask-linear",
              "linear-gradient(var(--tw-mask-linear-stops, var(--tw-mask-linear-position)))",
            ),
            S("--tw-mask-linear-position", e),
          ],
        }),
          r("mask-linear", () => [
            {
              supportsNegative: !0,
              values: ["0", "1", "2", "3", "6", "12", "45", "90", "180"],
            },
          ]),
          v("mask-linear-from", {
            color: (e) => [
              g(),
              b(),
              S(
                "mask-image",
                "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)",
              ),
              S("mask-composite", "intersect"),
              S(
                "--tw-mask-linear-stops",
                "var(--tw-mask-linear-position), var(--tw-mask-linear-from-color) var(--tw-mask-linear-from-position), var(--tw-mask-linear-to-color) var(--tw-mask-linear-to-position)",
              ),
              S(
                "--tw-mask-linear",
                "linear-gradient(var(--tw-mask-linear-stops))",
              ),
              S("--tw-mask-linear-from-color", e),
            ],
            position: (e) => [
              g(),
              b(),
              S(
                "mask-image",
                "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)",
              ),
              S("mask-composite", "intersect"),
              S(
                "--tw-mask-linear-stops",
                "var(--tw-mask-linear-position), var(--tw-mask-linear-from-color) var(--tw-mask-linear-from-position), var(--tw-mask-linear-to-color) var(--tw-mask-linear-to-position)",
              ),
              S(
                "--tw-mask-linear",
                "linear-gradient(var(--tw-mask-linear-stops))",
              ),
              S("--tw-mask-linear-from-position", e),
            ],
          }),
          v("mask-linear-to", {
            color: (e) => [
              g(),
              b(),
              S(
                "mask-image",
                "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)",
              ),
              S("mask-composite", "intersect"),
              S(
                "--tw-mask-linear-stops",
                "var(--tw-mask-linear-position), var(--tw-mask-linear-from-color) var(--tw-mask-linear-from-position), var(--tw-mask-linear-to-color) var(--tw-mask-linear-to-position)",
              ),
              S(
                "--tw-mask-linear",
                "linear-gradient(var(--tw-mask-linear-stops))",
              ),
              S("--tw-mask-linear-to-color", e),
            ],
            position: (e) => [
              g(),
              b(),
              S(
                "mask-image",
                "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)",
              ),
              S("mask-composite", "intersect"),
              S(
                "--tw-mask-linear-stops",
                "var(--tw-mask-linear-position), var(--tw-mask-linear-from-color) var(--tw-mask-linear-from-position), var(--tw-mask-linear-to-color) var(--tw-mask-linear-to-position)",
              ),
              S(
                "--tw-mask-linear",
                "linear-gradient(var(--tw-mask-linear-stops))",
              ),
              S("--tw-mask-linear-to-position", e),
            ],
          }));
        let y = () =>
          T([
            Ue("--tw-mask-radial-from-position", "0%"),
            Ue("--tw-mask-radial-to-position", "100%"),
            Ue("--tw-mask-radial-from-color", "black"),
            Ue("--tw-mask-radial-to-color", "transparent"),
            Ue("--tw-mask-radial-shape", "ellipse"),
            Ue("--tw-mask-radial-size", "farthest-corner"),
            Ue("--tw-mask-radial-position", "center"),
          ]);
        (n("mask-circle", [["--tw-mask-radial-shape", "circle"]]),
          n("mask-ellipse", [["--tw-mask-radial-shape", "ellipse"]]),
          n("mask-radial-closest-side", [
            ["--tw-mask-radial-size", "closest-side"],
          ]),
          n("mask-radial-farthest-side", [
            ["--tw-mask-radial-size", "farthest-side"],
          ]),
          n("mask-radial-closest-corner", [
            ["--tw-mask-radial-size", "closest-corner"],
          ]),
          n("mask-radial-farthest-corner", [
            ["--tw-mask-radial-size", "farthest-corner"],
          ]),
          n("mask-radial-at-top", [["--tw-mask-radial-position", "top"]]),
          n("mask-radial-at-top-left", [
            ["--tw-mask-radial-position", "top left"],
          ]),
          n("mask-radial-at-top-right", [
            ["--tw-mask-radial-position", "top right"],
          ]),
          n("mask-radial-at-bottom", [["--tw-mask-radial-position", "bottom"]]),
          n("mask-radial-at-bottom-left", [
            ["--tw-mask-radial-position", "bottom left"],
          ]),
          n("mask-radial-at-bottom-right", [
            ["--tw-mask-radial-position", "bottom right"],
          ]),
          n("mask-radial-at-left", [["--tw-mask-radial-position", "left"]]),
          n("mask-radial-at-right", [["--tw-mask-radial-position", "right"]]),
          n("mask-radial-at-center", [["--tw-mask-radial-position", "center"]]),
          o("mask-radial-at", {
            defaultValue: null,
            supportsNegative: !1,
            supportsFractions: !1,
            handle: (e) => [S("--tw-mask-radial-position", e)],
          }),
          o("mask-radial", {
            defaultValue: null,
            supportsNegative: !1,
            supportsFractions: !1,
            handle: (e) => [
              g(),
              y(),
              S(
                "mask-image",
                "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)",
              ),
              S("mask-composite", "intersect"),
              S(
                "--tw-mask-radial",
                "radial-gradient(var(--tw-mask-radial-stops, var(--tw-mask-radial-size)))",
              ),
              S("--tw-mask-radial-size", e),
            ],
          }),
          v("mask-radial-from", {
            color: (e) => [
              g(),
              y(),
              S(
                "mask-image",
                "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)",
              ),
              S("mask-composite", "intersect"),
              S(
                "--tw-mask-radial-stops",
                "var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), var(--tw-mask-radial-from-color) var(--tw-mask-radial-from-position), var(--tw-mask-radial-to-color) var(--tw-mask-radial-to-position)",
              ),
              S(
                "--tw-mask-radial",
                "radial-gradient(var(--tw-mask-radial-stops))",
              ),
              S("--tw-mask-radial-from-color", e),
            ],
            position: (e) => [
              g(),
              y(),
              S(
                "mask-image",
                "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)",
              ),
              S("mask-composite", "intersect"),
              S(
                "--tw-mask-radial-stops",
                "var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), var(--tw-mask-radial-from-color) var(--tw-mask-radial-from-position), var(--tw-mask-radial-to-color) var(--tw-mask-radial-to-position)",
              ),
              S(
                "--tw-mask-radial",
                "radial-gradient(var(--tw-mask-radial-stops))",
              ),
              S("--tw-mask-radial-from-position", e),
            ],
          }),
          v("mask-radial-to", {
            color: (e) => [
              g(),
              y(),
              S(
                "mask-image",
                "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)",
              ),
              S("mask-composite", "intersect"),
              S(
                "--tw-mask-radial-stops",
                "var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), var(--tw-mask-radial-from-color) var(--tw-mask-radial-from-position), var(--tw-mask-radial-to-color) var(--tw-mask-radial-to-position)",
              ),
              S(
                "--tw-mask-radial",
                "radial-gradient(var(--tw-mask-radial-stops))",
              ),
              S("--tw-mask-radial-to-color", e),
            ],
            position: (e) => [
              g(),
              y(),
              S(
                "mask-image",
                "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)",
              ),
              S("mask-composite", "intersect"),
              S(
                "--tw-mask-radial-stops",
                "var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), var(--tw-mask-radial-from-color) var(--tw-mask-radial-from-position), var(--tw-mask-radial-to-color) var(--tw-mask-radial-to-position)",
              ),
              S(
                "--tw-mask-radial",
                "radial-gradient(var(--tw-mask-radial-stops))",
              ),
              S("--tw-mask-radial-to-position", e),
            ],
          }));
        let x = () =>
          T([
            Ue("--tw-mask-conic-position", "0deg"),
            Ue("--tw-mask-conic-from-position", "0%"),
            Ue("--tw-mask-conic-to-position", "100%"),
            Ue("--tw-mask-conic-from-color", "black"),
            Ue("--tw-mask-conic-to-color", "transparent"),
          ]);
        (o("mask-conic", {
          defaultValue: null,
          supportsNegative: !0,
          supportsFractions: !1,
          handleBareValue: (e) =>
            Ae(e.value) ? `calc(1deg * ${e.value})` : null,
          handleNegativeBareValue: (e) =>
            Ae(e.value) ? `calc(1deg * -${e.value})` : null,
          handle: (e) => [
            g(),
            x(),
            S(
              "mask-image",
              "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)",
            ),
            S("mask-composite", "intersect"),
            S(
              "--tw-mask-conic",
              "conic-gradient(var(--tw-mask-conic-stops, var(--tw-mask-conic-position)))",
            ),
            S("--tw-mask-conic-position", e),
          ],
        }),
          r("mask-conic", () => [
            {
              supportsNegative: !0,
              values: ["0", "1", "2", "3", "6", "12", "45", "90", "180"],
            },
          ]),
          v("mask-conic-from", {
            color: (e) => [
              g(),
              x(),
              S(
                "mask-image",
                "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)",
              ),
              S("mask-composite", "intersect"),
              S(
                "--tw-mask-conic-stops",
                "from var(--tw-mask-conic-position), var(--tw-mask-conic-from-color) var(--tw-mask-conic-from-position), var(--tw-mask-conic-to-color) var(--tw-mask-conic-to-position)",
              ),
              S(
                "--tw-mask-conic",
                "conic-gradient(var(--tw-mask-conic-stops))",
              ),
              S("--tw-mask-conic-from-color", e),
            ],
            position: (e) => [
              g(),
              x(),
              S(
                "mask-image",
                "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)",
              ),
              S("mask-composite", "intersect"),
              S(
                "--tw-mask-conic-stops",
                "from var(--tw-mask-conic-position), var(--tw-mask-conic-from-color) var(--tw-mask-conic-from-position), var(--tw-mask-conic-to-color) var(--tw-mask-conic-to-position)",
              ),
              S(
                "--tw-mask-conic",
                "conic-gradient(var(--tw-mask-conic-stops))",
              ),
              S("--tw-mask-conic-from-position", e),
            ],
          }),
          v("mask-conic-to", {
            color: (e) => [
              g(),
              x(),
              S(
                "mask-image",
                "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)",
              ),
              S("mask-composite", "intersect"),
              S(
                "--tw-mask-conic-stops",
                "from var(--tw-mask-conic-position), var(--tw-mask-conic-from-color) var(--tw-mask-conic-from-position), var(--tw-mask-conic-to-color) var(--tw-mask-conic-to-position)",
              ),
              S(
                "--tw-mask-conic",
                "conic-gradient(var(--tw-mask-conic-stops))",
              ),
              S("--tw-mask-conic-to-color", e),
            ],
            position: (e) => [
              g(),
              x(),
              S(
                "mask-image",
                "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)",
              ),
              S("mask-composite", "intersect"),
              S(
                "--tw-mask-conic-stops",
                "from var(--tw-mask-conic-position), var(--tw-mask-conic-from-color) var(--tw-mask-conic-from-position), var(--tw-mask-conic-to-color) var(--tw-mask-conic-to-position)",
              ),
              S(
                "--tw-mask-conic",
                "conic-gradient(var(--tw-mask-conic-stops))",
              ),
              S("--tw-mask-conic-to-position", e),
            ],
          }),
          n("box-decoration-slice", [
            ["-webkit-box-decoration-break", "slice"],
            ["box-decoration-break", "slice"],
          ]),
          n("box-decoration-clone", [
            ["-webkit-box-decoration-break", "clone"],
            ["box-decoration-break", "clone"],
          ]),
          n("bg-clip-text", [["background-clip", "text"]]),
          n("bg-clip-border", [["background-clip", "border-box"]]),
          n("bg-clip-padding", [["background-clip", "padding-box"]]),
          n("bg-clip-content", [["background-clip", "content-box"]]),
          n("bg-origin-border", [["background-origin", "border-box"]]),
          n("bg-origin-padding", [["background-origin", "padding-box"]]),
          n("bg-origin-content", [["background-origin", "content-box"]]));
        for (let e of [
          "normal",
          "multiply",
          "screen",
          "overlay",
          "darken",
          "lighten",
          "color-dodge",
          "color-burn",
          "hard-light",
          "soft-light",
          "difference",
          "exclusion",
          "hue",
          "saturation",
          "color",
          "luminosity",
        ])
          (n(`bg-blend-${e}`, [["background-blend-mode", e]]),
            n(`mix-blend-${e}`, [["mix-blend-mode", e]]));
        (n("mix-blend-plus-darker", [["mix-blend-mode", "plus-darker"]]),
          n("mix-blend-plus-lighter", [["mix-blend-mode", "plus-lighter"]]),
          n("fill-none", [["fill", "none"]]),
          t.functional("fill", (t) => {
            if (!t.value) return;
            if ("arbitrary" === t.value.kind) {
              let r = De(t.value.value, t.modifier, e);
              return null === r ? void 0 : [S("fill", r)];
            }
            let r = _e(t, e, ["--fill", "--color"]);
            return r ? [S("fill", r)] : void 0;
          }),
          r("fill", () => [
            {
              values: ["current", "inherit", "transparent"],
              valueThemeKeys: ["--fill", "--color"],
              modifiers: Array.from({ length: 21 }, (e, t) => "" + 5 * t),
            },
          ]),
          n("stroke-none", [["stroke", "none"]]),
          t.functional("stroke", (t) => {
            if (t.value) {
              if ("arbitrary" === t.value.kind) {
                let r = t.value.value;
                switch (
                  t.value.dataType ??
                  ce(r, ["color", "number", "length", "percentage"])
                ) {
                  case "number":
                  case "length":
                  case "percentage":
                    return t.modifier ? void 0 : [S("stroke-width", r)];
                  default:
                    return (
                      (r = De(t.value.value, t.modifier, e)),
                      null === r ? void 0 : [S("stroke", r)]
                    );
                }
              }
              {
                let r = _e(t, e, ["--stroke", "--color"]);
                if (r) return [S("stroke", r)];
              }
              {
                let r = e.resolve(t.value.value, ["--stroke-width"]);
                if (r) return [S("stroke-width", r)];
                if (Ae(t.value.value))
                  return [S("stroke-width", t.value.value)];
              }
            }
          }),
          r("stroke", () => [
            {
              values: ["current", "inherit", "transparent"],
              valueThemeKeys: ["--stroke", "--color"],
              modifiers: Array.from({ length: 21 }, (e, t) => "" + 5 * t),
            },
            {
              values: ["0", "1", "2", "3"],
              valueThemeKeys: ["--stroke-width"],
            },
          ]),
          n("object-contain", [["object-fit", "contain"]]),
          n("object-cover", [["object-fit", "cover"]]),
          n("object-fill", [["object-fit", "fill"]]),
          n("object-none", [["object-fit", "none"]]),
          n("object-scale-down", [["object-fit", "scale-down"]]),
          o("object", {
            themeKeys: ["--object-position"],
            handle: (e) => [S("object-position", e)],
            staticValues: {
              top: [S("object-position", "top")],
              "top-left": [S("object-position", "left top")],
              "top-right": [S("object-position", "right top")],
              bottom: [S("object-position", "bottom")],
              "bottom-left": [S("object-position", "left bottom")],
              "bottom-right": [S("object-position", "right bottom")],
              left: [S("object-position", "left")],
              right: [S("object-position", "right")],
              center: [S("object-position", "center")],
            },
          }));
        for (let [e, t] of [
          ["p", "padding"],
          ["px", "padding-inline"],
          ["py", "padding-block"],
          ["ps", "padding-inline-start"],
          ["pe", "padding-inline-end"],
          ["pt", "padding-top"],
          ["pr", "padding-right"],
          ["pb", "padding-bottom"],
          ["pl", "padding-left"],
        ])
          i(e, ["--padding", "--spacing"], (e) => [S(t, e)]);
        (n("text-left", [["text-align", "left"]]),
          n("text-center", [["text-align", "center"]]),
          n("text-right", [["text-align", "right"]]),
          n("text-justify", [["text-align", "justify"]]),
          n("text-start", [["text-align", "start"]]),
          n("text-end", [["text-align", "end"]]),
          i(
            "indent",
            ["--text-indent", "--spacing"],
            (e) => [S("text-indent", e)],
            { supportsNegative: !0 },
          ),
          n("align-baseline", [["vertical-align", "baseline"]]),
          n("align-top", [["vertical-align", "top"]]),
          n("align-middle", [["vertical-align", "middle"]]),
          n("align-bottom", [["vertical-align", "bottom"]]),
          n("align-text-top", [["vertical-align", "text-top"]]),
          n("align-text-bottom", [["vertical-align", "text-bottom"]]),
          n("align-sub", [["vertical-align", "sub"]]),
          n("align-super", [["vertical-align", "super"]]),
          o("align", {
            themeKeys: [],
            handle: (e) => [S("vertical-align", e)],
          }),
          t.functional("font", (t) => {
            if (t.value && !t.modifier) {
              if ("arbitrary" === t.value.kind) {
                let e = t.value.value;
                switch (
                  t.value.dataType ??
                  ce(e, ["number", "generic-name", "family-name"])
                ) {
                  case "generic-name":
                  case "family-name":
                    return [S("font-family", e)];
                  default:
                    return [
                      T([Ue("--tw-font-weight")]),
                      S("--tw-font-weight", e),
                      S("font-weight", e),
                    ];
                }
              }
              {
                let r = e.resolveWith(
                  t.value.value,
                  ["--font"],
                  ["--font-feature-settings", "--font-variation-settings"],
                );
                if (r) {
                  let [e, t = {}] = r;
                  return [
                    S("font-family", e),
                    S("font-feature-settings", t["--font-feature-settings"]),
                    S(
                      "font-variation-settings",
                      t["--font-variation-settings"],
                    ),
                  ];
                }
              }
              {
                let r = e.resolve(t.value.value, ["--font-weight"]);
                if (r)
                  return [
                    T([Ue("--tw-font-weight")]),
                    S("--tw-font-weight", r),
                    S("font-weight", r),
                  ];
              }
            }
          }),
          r("font", () => [
            { values: [], valueThemeKeys: ["--font"] },
            { values: [], valueThemeKeys: ["--font-weight"] },
          ]),
          n("uppercase", [["text-transform", "uppercase"]]),
          n("lowercase", [["text-transform", "lowercase"]]),
          n("capitalize", [["text-transform", "capitalize"]]),
          n("normal-case", [["text-transform", "none"]]),
          n("italic", [["font-style", "italic"]]),
          n("not-italic", [["font-style", "normal"]]),
          n("underline", [["text-decoration-line", "underline"]]),
          n("overline", [["text-decoration-line", "overline"]]),
          n("line-through", [["text-decoration-line", "line-through"]]),
          n("no-underline", [["text-decoration-line", "none"]]),
          n("font-stretch-normal", [["font-stretch", "normal"]]),
          n("font-stretch-ultra-condensed", [
            ["font-stretch", "ultra-condensed"],
          ]),
          n("font-stretch-extra-condensed", [
            ["font-stretch", "extra-condensed"],
          ]),
          n("font-stretch-condensed", [["font-stretch", "condensed"]]),
          n("font-stretch-semi-condensed", [
            ["font-stretch", "semi-condensed"],
          ]),
          n("font-stretch-semi-expanded", [["font-stretch", "semi-expanded"]]),
          n("font-stretch-expanded", [["font-stretch", "expanded"]]),
          n("font-stretch-extra-expanded", [
            ["font-stretch", "extra-expanded"],
          ]),
          n("font-stretch-ultra-expanded", [
            ["font-stretch", "ultra-expanded"],
          ]),
          o("font-stretch", {
            handleBareValue: ({ value: e }) => {
              if (!e.endsWith("%")) return null;
              let t = Number(e.slice(0, -1));
              return !Ae(t) || Number.isNaN(t) || t < 50 || t > 200 ? null : e;
            },
            handle: (e) => [S("font-stretch", e)],
          }),
          r("font-stretch", () => [
            {
              values: [
                "50%",
                "75%",
                "90%",
                "95%",
                "100%",
                "105%",
                "110%",
                "125%",
                "150%",
                "200%",
              ],
            },
          ]),
          a("placeholder", {
            themeKeys: ["--background-color", "--color"],
            handle: (e) => [
              $("&::placeholder", [
                S("--tw-sort", "placeholder-color"),
                S("color", e),
              ]),
            ],
          }),
          n("decoration-solid", [["text-decoration-style", "solid"]]),
          n("decoration-double", [["text-decoration-style", "double"]]),
          n("decoration-dotted", [["text-decoration-style", "dotted"]]),
          n("decoration-dashed", [["text-decoration-style", "dashed"]]),
          n("decoration-wavy", [["text-decoration-style", "wavy"]]),
          n("decoration-auto", [["text-decoration-thickness", "auto"]]),
          n("decoration-from-font", [
            ["text-decoration-thickness", "from-font"],
          ]),
          t.functional("decoration", (t) => {
            if (t.value) {
              if ("arbitrary" === t.value.kind) {
                let r = t.value.value;
                switch (
                  t.value.dataType ??
                  ce(r, ["color", "length", "percentage"])
                ) {
                  case "length":
                  case "percentage":
                    return t.modifier
                      ? void 0
                      : [S("text-decoration-thickness", r)];
                  default:
                    return (
                      (r = De(r, t.modifier, e)),
                      null === r ? void 0 : [S("text-decoration-color", r)]
                    );
                }
              }
              {
                let r = e.resolve(t.value.value, [
                  "--text-decoration-thickness",
                ]);
                if (r)
                  return t.modifier
                    ? void 0
                    : [S("text-decoration-thickness", r)];
                if (Ae(t.value.value))
                  return t.modifier
                    ? void 0
                    : [S("text-decoration-thickness", `${t.value.value}px`)];
              }
              {
                let r = _e(t, e, ["--text-decoration-color", "--color"]);
                if (r) return [S("text-decoration-color", r)];
              }
            }
          }),
          r("decoration", () => [
            {
              values: ["current", "inherit", "transparent"],
              valueThemeKeys: ["--text-decoration-color", "--color"],
              modifiers: Array.from({ length: 21 }, (e, t) => "" + 5 * t),
            },
            {
              values: ["0", "1", "2"],
              valueThemeKeys: ["--text-decoration-thickness"],
            },
          ]),
          o("animate", {
            themeKeys: ["--animate"],
            handle: (e) => [S("animation", e)],
            staticValues: { none: [S("animation", "none")] },
          }));
        {
          let a = [
              "var(--tw-blur,)",
              "var(--tw-brightness,)",
              "var(--tw-contrast,)",
              "var(--tw-grayscale,)",
              "var(--tw-hue-rotate,)",
              "var(--tw-invert,)",
              "var(--tw-saturate,)",
              "var(--tw-sepia,)",
              "var(--tw-drop-shadow,)",
            ].join(" "),
            i = [
              "var(--tw-backdrop-blur,)",
              "var(--tw-backdrop-brightness,)",
              "var(--tw-backdrop-contrast,)",
              "var(--tw-backdrop-grayscale,)",
              "var(--tw-backdrop-hue-rotate,)",
              "var(--tw-backdrop-invert,)",
              "var(--tw-backdrop-opacity,)",
              "var(--tw-backdrop-saturate,)",
              "var(--tw-backdrop-sepia,)",
            ].join(" "),
            l = () =>
              T([
                Ue("--tw-blur"),
                Ue("--tw-brightness"),
                Ue("--tw-contrast"),
                Ue("--tw-grayscale"),
                Ue("--tw-hue-rotate"),
                Ue("--tw-invert"),
                Ue("--tw-opacity"),
                Ue("--tw-saturate"),
                Ue("--tw-sepia"),
                Ue("--tw-drop-shadow"),
                Ue("--tw-drop-shadow-color"),
                Ue("--tw-drop-shadow-alpha", "100%", "<percentage>"),
                Ue("--tw-drop-shadow-size"),
              ]),
            s = () =>
              T([
                Ue("--tw-backdrop-blur"),
                Ue("--tw-backdrop-brightness"),
                Ue("--tw-backdrop-contrast"),
                Ue("--tw-backdrop-grayscale"),
                Ue("--tw-backdrop-hue-rotate"),
                Ue("--tw-backdrop-invert"),
                Ue("--tw-backdrop-opacity"),
                Ue("--tw-backdrop-saturate"),
                Ue("--tw-backdrop-sepia"),
              ]);
          (t.functional("filter", (e) => {
            if (!e.modifier) {
              if (null === e.value) return [l(), S("filter", a)];
              if ("arbitrary" === e.value.kind)
                return [S("filter", e.value.value)];
              if ("none" === e.value.value) return [S("filter", "none")];
            }
          }),
            t.functional("backdrop-filter", (e) => {
              if (!e.modifier) {
                if (null === e.value)
                  return [
                    s(),
                    S("-webkit-backdrop-filter", i),
                    S("backdrop-filter", i),
                  ];
                if ("arbitrary" === e.value.kind)
                  return [
                    S("-webkit-backdrop-filter", e.value.value),
                    S("backdrop-filter", e.value.value),
                  ];
                if ("none" === e.value.value)
                  return [
                    S("-webkit-backdrop-filter", "none"),
                    S("backdrop-filter", "none"),
                  ];
              }
            }),
            o("blur", {
              themeKeys: ["--blur"],
              handle: (e) => [
                l(),
                S("--tw-blur", `blur(${e})`),
                S("filter", a),
              ],
              staticValues: {
                none: [l(), S("--tw-blur", " "), S("filter", a)],
              },
            }),
            o("backdrop-blur", {
              themeKeys: ["--backdrop-blur", "--blur"],
              handle: (e) => [
                s(),
                S("--tw-backdrop-blur", `blur(${e})`),
                S("-webkit-backdrop-filter", i),
                S("backdrop-filter", i),
              ],
              staticValues: {
                none: [
                  s(),
                  S("--tw-backdrop-blur", " "),
                  S("-webkit-backdrop-filter", i),
                  S("backdrop-filter", i),
                ],
              },
            }),
            o("brightness", {
              themeKeys: ["--brightness"],
              handleBareValue: ({ value: e }) => (Ae(e) ? `${e}%` : null),
              handle: (e) => [
                l(),
                S("--tw-brightness", `brightness(${e})`),
                S("filter", a),
              ],
            }),
            o("backdrop-brightness", {
              themeKeys: ["--backdrop-brightness", "--brightness"],
              handleBareValue: ({ value: e }) => (Ae(e) ? `${e}%` : null),
              handle: (e) => [
                s(),
                S("--tw-backdrop-brightness", `brightness(${e})`),
                S("-webkit-backdrop-filter", i),
                S("backdrop-filter", i),
              ],
            }),
            r("brightness", () => [
              {
                values: [
                  "0",
                  "50",
                  "75",
                  "90",
                  "95",
                  "100",
                  "105",
                  "110",
                  "125",
                  "150",
                  "200",
                ],
                valueThemeKeys: ["--brightness"],
              },
            ]),
            r("backdrop-brightness", () => [
              {
                values: [
                  "0",
                  "50",
                  "75",
                  "90",
                  "95",
                  "100",
                  "105",
                  "110",
                  "125",
                  "150",
                  "200",
                ],
                valueThemeKeys: ["--backdrop-brightness", "--brightness"],
              },
            ]),
            o("contrast", {
              themeKeys: ["--contrast"],
              handleBareValue: ({ value: e }) => (Ae(e) ? `${e}%` : null),
              handle: (e) => [
                l(),
                S("--tw-contrast", `contrast(${e})`),
                S("filter", a),
              ],
            }),
            o("backdrop-contrast", {
              themeKeys: ["--backdrop-contrast", "--contrast"],
              handleBareValue: ({ value: e }) => (Ae(e) ? `${e}%` : null),
              handle: (e) => [
                s(),
                S("--tw-backdrop-contrast", `contrast(${e})`),
                S("-webkit-backdrop-filter", i),
                S("backdrop-filter", i),
              ],
            }),
            r("contrast", () => [
              {
                values: ["0", "50", "75", "100", "125", "150", "200"],
                valueThemeKeys: ["--contrast"],
              },
            ]),
            r("backdrop-contrast", () => [
              {
                values: ["0", "50", "75", "100", "125", "150", "200"],
                valueThemeKeys: ["--backdrop-contrast", "--contrast"],
              },
            ]),
            o("grayscale", {
              themeKeys: ["--grayscale"],
              handleBareValue: ({ value: e }) => (Ae(e) ? `${e}%` : null),
              defaultValue: "100%",
              handle: (e) => [
                l(),
                S("--tw-grayscale", `grayscale(${e})`),
                S("filter", a),
              ],
            }),
            o("backdrop-grayscale", {
              themeKeys: ["--backdrop-grayscale", "--grayscale"],
              handleBareValue: ({ value: e }) => (Ae(e) ? `${e}%` : null),
              defaultValue: "100%",
              handle: (e) => [
                s(),
                S("--tw-backdrop-grayscale", `grayscale(${e})`),
                S("-webkit-backdrop-filter", i),
                S("backdrop-filter", i),
              ],
            }),
            r("grayscale", () => [
              {
                values: ["0", "25", "50", "75", "100"],
                valueThemeKeys: ["--grayscale"],
                hasDefaultValue: !0,
              },
            ]),
            r("backdrop-grayscale", () => [
              {
                values: ["0", "25", "50", "75", "100"],
                valueThemeKeys: ["--backdrop-grayscale", "--grayscale"],
                hasDefaultValue: !0,
              },
            ]),
            o("hue-rotate", {
              supportsNegative: !0,
              themeKeys: ["--hue-rotate"],
              handleBareValue: ({ value: e }) => (Ae(e) ? `${e}deg` : null),
              handle: (e) => [
                l(),
                S("--tw-hue-rotate", `hue-rotate(${e})`),
                S("filter", a),
              ],
            }),
            o("backdrop-hue-rotate", {
              supportsNegative: !0,
              themeKeys: ["--backdrop-hue-rotate", "--hue-rotate"],
              handleBareValue: ({ value: e }) => (Ae(e) ? `${e}deg` : null),
              handle: (e) => [
                s(),
                S("--tw-backdrop-hue-rotate", `hue-rotate(${e})`),
                S("-webkit-backdrop-filter", i),
                S("backdrop-filter", i),
              ],
            }),
            r("hue-rotate", () => [
              {
                values: ["0", "15", "30", "60", "90", "180"],
                valueThemeKeys: ["--hue-rotate"],
              },
            ]),
            r("backdrop-hue-rotate", () => [
              {
                values: ["0", "15", "30", "60", "90", "180"],
                valueThemeKeys: ["--backdrop-hue-rotate", "--hue-rotate"],
              },
            ]),
            o("invert", {
              themeKeys: ["--invert"],
              handleBareValue: ({ value: e }) => (Ae(e) ? `${e}%` : null),
              defaultValue: "100%",
              handle: (e) => [
                l(),
                S("--tw-invert", `invert(${e})`),
                S("filter", a),
              ],
            }),
            o("backdrop-invert", {
              themeKeys: ["--backdrop-invert", "--invert"],
              handleBareValue: ({ value: e }) => (Ae(e) ? `${e}%` : null),
              defaultValue: "100%",
              handle: (e) => [
                s(),
                S("--tw-backdrop-invert", `invert(${e})`),
                S("-webkit-backdrop-filter", i),
                S("backdrop-filter", i),
              ],
            }),
            r("invert", () => [
              {
                values: ["0", "25", "50", "75", "100"],
                valueThemeKeys: ["--invert"],
                hasDefaultValue: !0,
              },
            ]),
            r("backdrop-invert", () => [
              {
                values: ["0", "25", "50", "75", "100"],
                valueThemeKeys: ["--backdrop-invert", "--invert"],
                hasDefaultValue: !0,
              },
            ]),
            o("saturate", {
              themeKeys: ["--saturate"],
              handleBareValue: ({ value: e }) => (Ae(e) ? `${e}%` : null),
              handle: (e) => [
                l(),
                S("--tw-saturate", `saturate(${e})`),
                S("filter", a),
              ],
            }),
            o("backdrop-saturate", {
              themeKeys: ["--backdrop-saturate", "--saturate"],
              handleBareValue: ({ value: e }) => (Ae(e) ? `${e}%` : null),
              handle: (e) => [
                s(),
                S("--tw-backdrop-saturate", `saturate(${e})`),
                S("-webkit-backdrop-filter", i),
                S("backdrop-filter", i),
              ],
            }),
            r("saturate", () => [
              {
                values: ["0", "50", "100", "150", "200"],
                valueThemeKeys: ["--saturate"],
              },
            ]),
            r("backdrop-saturate", () => [
              {
                values: ["0", "50", "100", "150", "200"],
                valueThemeKeys: ["--backdrop-saturate", "--saturate"],
              },
            ]),
            o("sepia", {
              themeKeys: ["--sepia"],
              handleBareValue: ({ value: e }) => (Ae(e) ? `${e}%` : null),
              defaultValue: "100%",
              handle: (e) => [
                l(),
                S("--tw-sepia", `sepia(${e})`),
                S("filter", a),
              ],
            }),
            o("backdrop-sepia", {
              themeKeys: ["--backdrop-sepia", "--sepia"],
              handleBareValue: ({ value: e }) => (Ae(e) ? `${e}%` : null),
              defaultValue: "100%",
              handle: (e) => [
                s(),
                S("--tw-backdrop-sepia", `sepia(${e})`),
                S("-webkit-backdrop-filter", i),
                S("backdrop-filter", i),
              ],
            }),
            r("sepia", () => [
              {
                values: ["0", "50", "100"],
                valueThemeKeys: ["--sepia"],
                hasDefaultValue: !0,
              },
            ]),
            r("backdrop-sepia", () => [
              {
                values: ["0", "50", "100"],
                valueThemeKeys: ["--backdrop-sepia", "--sepia"],
                hasDefaultValue: !0,
              },
            ]),
            n("drop-shadow-none", [
              l,
              ["--tw-drop-shadow", " "],
              ["filter", a],
            ]),
            t.functional("drop-shadow", (t) => {
              let r;
              if (
                (t.modifier &&
                  ("arbitrary" === t.modifier.kind
                    ? (r = t.modifier.value)
                    : Ae(t.modifier.value) && (r = `${t.modifier.value}%`)),
                !t.value)
              ) {
                let t = e.get(["--drop-shadow"]),
                  n = e.resolve(null, ["--drop-shadow"]);
                return null === t || null === n
                  ? void 0
                  : [
                      l(),
                      S("--tw-drop-shadow-alpha", r),
                      ...Pe(
                        "--tw-drop-shadow-size",
                        t,
                        r,
                        (e) => `var(--tw-drop-shadow-color, ${e})`,
                      ),
                      S(
                        "--tw-drop-shadow",
                        q(n, ",")
                          .map((e) => `drop-shadow(${e})`)
                          .join(" "),
                      ),
                      S("filter", a),
                    ];
              }
              if ("arbitrary" === t.value.kind) {
                let n = t.value.value;
                return "color" === (t.value.dataType ?? ce(n, ["color"]))
                  ? ((n = De(n, t.modifier, e)),
                    null === n
                      ? void 0
                      : [
                          l(),
                          S(
                            "--tw-drop-shadow-color",
                            We(n, "var(--tw-drop-shadow-alpha)"),
                          ),
                          S("--tw-drop-shadow", "var(--tw-drop-shadow-size)"),
                        ])
                  : t.modifier && !r
                    ? void 0
                    : [
                        l(),
                        S("--tw-drop-shadow-alpha", r),
                        ...Pe(
                          "--tw-drop-shadow-size",
                          n,
                          r,
                          (e) => `var(--tw-drop-shadow-color, ${e})`,
                        ),
                        S("--tw-drop-shadow", "var(--tw-drop-shadow-size)"),
                        S("filter", a),
                      ];
              }
              {
                let n = e.get([`--drop-shadow-${t.value.value}`]),
                  o = e.resolve(t.value.value, ["--drop-shadow"]);
                if (n && o)
                  return t.modifier && !r
                    ? void 0
                    : r
                      ? [
                          l(),
                          S("--tw-drop-shadow-alpha", r),
                          ...Pe(
                            "--tw-drop-shadow-size",
                            n,
                            r,
                            (e) => `var(--tw-drop-shadow-color, ${e})`,
                          ),
                          S("--tw-drop-shadow", "var(--tw-drop-shadow-size)"),
                          S("filter", a),
                        ]
                      : [
                          l(),
                          S("--tw-drop-shadow-alpha", r),
                          ...Pe(
                            "--tw-drop-shadow-size",
                            n,
                            r,
                            (e) => `var(--tw-drop-shadow-color, ${e})`,
                          ),
                          S(
                            "--tw-drop-shadow",
                            q(o, ",")
                              .map((e) => `drop-shadow(${e})`)
                              .join(" "),
                          ),
                          S("filter", a),
                        ];
              }
              {
                let r = _e(t, e, ["--drop-shadow-color", "--color"]);
                if (r)
                  return "inherit" === r
                    ? [
                        l(),
                        S("--tw-drop-shadow-color", "inherit"),
                        S("--tw-drop-shadow", "var(--tw-drop-shadow-size)"),
                      ]
                    : [
                        l(),
                        S(
                          "--tw-drop-shadow-color",
                          We(r, "var(--tw-drop-shadow-alpha)"),
                        ),
                        S("--tw-drop-shadow", "var(--tw-drop-shadow-size)"),
                      ];
              }
            }),
            r("drop-shadow", () => [
              {
                values: ["current", "inherit", "transparent"],
                valueThemeKeys: ["--drop-shadow-color", "--color"],
                modifiers: Array.from({ length: 21 }, (e, t) => "" + 5 * t),
              },
              { valueThemeKeys: ["--drop-shadow"] },
            ]),
            o("backdrop-opacity", {
              themeKeys: ["--backdrop-opacity", "--opacity"],
              handleBareValue: ({ value: e }) => (Ce(e) ? `${e}%` : null),
              handle: (e) => [
                s(),
                S("--tw-backdrop-opacity", `opacity(${e})`),
                S("-webkit-backdrop-filter", i),
                S("backdrop-filter", i),
              ],
            }),
            r("backdrop-opacity", () => [
              {
                values: Array.from({ length: 21 }, (e, t) => "" + 5 * t),
                valueThemeKeys: ["--backdrop-opacity", "--opacity"],
              },
            ]));
        }
        {
          let a = `var(--tw-ease, ${e.resolve(null, ["--default-transition-timing-function"]) ?? "ease"})`,
            i = `var(--tw-duration, ${e.resolve(null, ["--default-transition-duration"]) ?? "0s"})`;
          (o("transition", {
            defaultValue:
              "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, transform, translate, scale, rotate, filter, -webkit-backdrop-filter, backdrop-filter, display, content-visibility, overlay, pointer-events",
            themeKeys: ["--transition-property"],
            handle: (e) => [
              S("transition-property", e),
              S("transition-timing-function", a),
              S("transition-duration", i),
            ],
            staticValues: {
              none: [S("transition-property", "none")],
              all: [
                S("transition-property", "all"),
                S("transition-timing-function", a),
                S("transition-duration", i),
              ],
              colors: [
                S(
                  "transition-property",
                  "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to",
                ),
                S("transition-timing-function", a),
                S("transition-duration", i),
              ],
              opacity: [
                S("transition-property", "opacity"),
                S("transition-timing-function", a),
                S("transition-duration", i),
              ],
              shadow: [
                S("transition-property", "box-shadow"),
                S("transition-timing-function", a),
                S("transition-duration", i),
              ],
              transform: [
                S("transition-property", "transform, translate, scale, rotate"),
                S("transition-timing-function", a),
                S("transition-duration", i),
              ],
            },
          }),
            n("transition-discrete", [
              ["transition-behavior", "allow-discrete"],
            ]),
            n("transition-normal", [["transition-behavior", "normal"]]),
            o("delay", {
              handleBareValue: ({ value: e }) => (Ae(e) ? `${e}ms` : null),
              themeKeys: ["--transition-delay"],
              handle: (e) => [S("transition-delay", e)],
            }));
          {
            let r = () => T([Ue("--tw-duration")]);
            (n("duration-initial", [r, ["--tw-duration", "initial"]]),
              t.functional("duration", (t) => {
                if (t.modifier || !t.value) return;
                let n = null;
                return (
                  "arbitrary" === t.value.kind
                    ? (n = t.value.value)
                    : ((n = e.resolve(t.value.fraction ?? t.value.value, [
                        "--transition-duration",
                      ])),
                      null === n &&
                        Ae(t.value.value) &&
                        (n = `${t.value.value}ms`)),
                  null !== n
                    ? [r(), S("--tw-duration", n), S("transition-duration", n)]
                    : void 0
                );
              }));
          }
          (r("delay", () => [
            {
              values: ["75", "100", "150", "200", "300", "500", "700", "1000"],
              valueThemeKeys: ["--transition-delay"],
            },
          ]),
            r("duration", () => [
              {
                values: [
                  "75",
                  "100",
                  "150",
                  "200",
                  "300",
                  "500",
                  "700",
                  "1000",
                ],
                valueThemeKeys: ["--transition-duration"],
              },
            ]));
        }
        {
          let e = () => T([Ue("--tw-ease")]);
          o("ease", {
            themeKeys: ["--ease"],
            handle: (t) => [
              e(),
              S("--tw-ease", t),
              S("transition-timing-function", t),
            ],
            staticValues: {
              initial: [e(), S("--tw-ease", "initial")],
              linear: [
                e(),
                S("--tw-ease", "linear"),
                S("transition-timing-function", "linear"),
              ],
            },
          });
        }
        (n("will-change-auto", [["will-change", "auto"]]),
          n("will-change-scroll", [["will-change", "scroll-position"]]),
          n("will-change-contents", [["will-change", "contents"]]),
          n("will-change-transform", [["will-change", "transform"]]),
          o("will-change", {
            themeKeys: [],
            handle: (e) => [S("will-change", e)],
          }),
          n("content-none", [
            ["--tw-content", "none"],
            ["content", "none"],
          ]),
          o("content", {
            themeKeys: [],
            handle: (e) => [
              T([Ue("--tw-content", '""')]),
              S("--tw-content", e),
              S("content", "var(--tw-content)"),
            ],
          }));
        {
          let e =
              "var(--tw-contain-size,) var(--tw-contain-layout,) var(--tw-contain-paint,) var(--tw-contain-style,)",
            t = () =>
              T([
                Ue("--tw-contain-size"),
                Ue("--tw-contain-layout"),
                Ue("--tw-contain-paint"),
                Ue("--tw-contain-style"),
              ]);
          (n("contain-none", [["contain", "none"]]),
            n("contain-content", [["contain", "content"]]),
            n("contain-strict", [["contain", "strict"]]),
            n("contain-size", [
              t,
              ["--tw-contain-size", "size"],
              ["contain", e],
            ]),
            n("contain-inline-size", [
              t,
              ["--tw-contain-size", "inline-size"],
              ["contain", e],
            ]),
            n("contain-layout", [
              t,
              ["--tw-contain-layout", "layout"],
              ["contain", e],
            ]),
            n("contain-paint", [
              t,
              ["--tw-contain-paint", "paint"],
              ["contain", e],
            ]),
            n("contain-style", [
              t,
              ["--tw-contain-style", "style"],
              ["contain", e],
            ]),
            o("contain", { themeKeys: [], handle: (e) => [S("contain", e)] }));
        }
        (n("forced-color-adjust-none", [["forced-color-adjust", "none"]]),
          n("forced-color-adjust-auto", [["forced-color-adjust", "auto"]]),
          i(
            "leading",
            ["--leading", "--spacing"],
            (e) => [
              T([Ue("--tw-leading")]),
              S("--tw-leading", e),
              S("line-height", e),
            ],
            {
              staticValues: {
                none: [
                  T([Ue("--tw-leading")]),
                  S("--tw-leading", "1"),
                  S("line-height", "1"),
                ],
              },
            },
          ),
          o("tracking", {
            supportsNegative: !0,
            themeKeys: ["--tracking"],
            handle: (e) => [
              T([Ue("--tw-tracking")]),
              S("--tw-tracking", e),
              S("letter-spacing", e),
            ],
          }),
          n("antialiased", [
            ["-webkit-font-smoothing", "antialiased"],
            ["-moz-osx-font-smoothing", "grayscale"],
          ]),
          n("subpixel-antialiased", [
            ["-webkit-font-smoothing", "auto"],
            ["-moz-osx-font-smoothing", "auto"],
          ]));
        {
          let e =
              "var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)",
            t = () =>
              T([
                Ue("--tw-ordinal"),
                Ue("--tw-slashed-zero"),
                Ue("--tw-numeric-figure"),
                Ue("--tw-numeric-spacing"),
                Ue("--tw-numeric-fraction"),
              ]);
          (n("normal-nums", [["font-variant-numeric", "normal"]]),
            n("ordinal", [
              t,
              ["--tw-ordinal", "ordinal"],
              ["font-variant-numeric", e],
            ]),
            n("slashed-zero", [
              t,
              ["--tw-slashed-zero", "slashed-zero"],
              ["font-variant-numeric", e],
            ]),
            n("lining-nums", [
              t,
              ["--tw-numeric-figure", "lining-nums"],
              ["font-variant-numeric", e],
            ]),
            n("oldstyle-nums", [
              t,
              ["--tw-numeric-figure", "oldstyle-nums"],
              ["font-variant-numeric", e],
            ]),
            n("proportional-nums", [
              t,
              ["--tw-numeric-spacing", "proportional-nums"],
              ["font-variant-numeric", e],
            ]),
            n("tabular-nums", [
              t,
              ["--tw-numeric-spacing", "tabular-nums"],
              ["font-variant-numeric", e],
            ]),
            n("diagonal-fractions", [
              t,
              ["--tw-numeric-fraction", "diagonal-fractions"],
              ["font-variant-numeric", e],
            ]),
            n("stacked-fractions", [
              t,
              ["--tw-numeric-fraction", "stacked-fractions"],
              ["font-variant-numeric", e],
            ]));
        }
        {
          let a = () => T([Ue("--tw-outline-style", "solid")]);
          (t.static("outline-hidden", () => [
            S("--tw-outline-style", "none"),
            S("outline-style", "none"),
            A("@media", "(forced-colors: active)", [
              S("outline", "2px solid transparent"),
              S("outline-offset", "2px"),
            ]),
          ]),
            n("outline-none", [
              ["--tw-outline-style", "none"],
              ["outline-style", "none"],
            ]),
            n("outline-solid", [
              ["--tw-outline-style", "solid"],
              ["outline-style", "solid"],
            ]),
            n("outline-dashed", [
              ["--tw-outline-style", "dashed"],
              ["outline-style", "dashed"],
            ]),
            n("outline-dotted", [
              ["--tw-outline-style", "dotted"],
              ["outline-style", "dotted"],
            ]),
            n("outline-double", [
              ["--tw-outline-style", "double"],
              ["outline-style", "double"],
            ]),
            t.functional("outline", (t) => {
              if (null === t.value) {
                if (t.modifier) return;
                let r = e.get(["--default-outline-width"]) ?? "1px";
                return [
                  a(),
                  S("outline-style", "var(--tw-outline-style)"),
                  S("outline-width", r),
                ];
              }
              if ("arbitrary" === t.value.kind) {
                let r = t.value.value;
                switch (
                  t.value.dataType ??
                  ce(r, ["color", "length", "number", "percentage"])
                ) {
                  case "length":
                  case "number":
                  case "percentage":
                    return t.modifier
                      ? void 0
                      : [
                          a(),
                          S("outline-style", "var(--tw-outline-style)"),
                          S("outline-width", r),
                        ];
                  default:
                    return (
                      (r = De(r, t.modifier, e)),
                      null === r ? void 0 : [S("outline-color", r)]
                    );
                }
              }
              {
                let r = _e(t, e, ["--outline-color", "--color"]);
                if (r) return [S("outline-color", r)];
              }
              {
                if (t.modifier) return;
                let r = e.resolve(t.value.value, ["--outline-width"]);
                if (r)
                  return [
                    a(),
                    S("outline-style", "var(--tw-outline-style)"),
                    S("outline-width", r),
                  ];
                if (Ae(t.value.value))
                  return [
                    a(),
                    S("outline-style", "var(--tw-outline-style)"),
                    S("outline-width", `${t.value.value}px`),
                  ];
              }
            }),
            r("outline", () => [
              {
                values: ["current", "inherit", "transparent"],
                valueThemeKeys: ["--outline-color", "--color"],
                modifiers: Array.from({ length: 21 }, (e, t) => "" + 5 * t),
                hasDefaultValue: !0,
              },
              {
                values: ["0", "1", "2", "4", "8"],
                valueThemeKeys: ["--outline-width"],
              },
            ]),
            o("outline-offset", {
              supportsNegative: !0,
              themeKeys: ["--outline-offset"],
              handleBareValue: ({ value: e }) => (Ae(e) ? `${e}px` : null),
              handle: (e) => [S("outline-offset", e)],
            }),
            r("outline-offset", () => [
              {
                supportsNegative: !0,
                values: ["0", "1", "2", "4", "8"],
                valueThemeKeys: ["--outline-offset"],
              },
            ]));
        }
        (o("opacity", {
          themeKeys: ["--opacity"],
          handleBareValue: ({ value: e }) => (Ce(e) ? `${e}%` : null),
          handle: (e) => [S("opacity", e)],
        }),
          r("opacity", () => [
            {
              values: Array.from({ length: 21 }, (e, t) => "" + 5 * t),
              valueThemeKeys: ["--opacity"],
            },
          ]),
          o("underline-offset", {
            supportsNegative: !0,
            themeKeys: ["--text-underline-offset"],
            handleBareValue: ({ value: e }) => (Ae(e) ? `${e}px` : null),
            handle: (e) => [S("text-underline-offset", e)],
            staticValues: { auto: [S("text-underline-offset", "auto")] },
          }),
          r("underline-offset", () => [
            {
              supportsNegative: !0,
              values: ["0", "1", "2", "4", "8"],
              valueThemeKeys: ["--text-underline-offset"],
            },
          ]),
          t.functional("text", (t) => {
            if (t.value) {
              if ("arbitrary" === t.value.kind) {
                let r = t.value.value;
                switch (
                  t.value.dataType ??
                  ce(r, [
                    "color",
                    "length",
                    "percentage",
                    "absolute-size",
                    "relative-size",
                  ])
                ) {
                  case "size":
                  case "length":
                  case "percentage":
                  case "absolute-size":
                  case "relative-size":
                    if (t.modifier) {
                      let n =
                        "arbitrary" === t.modifier.kind
                          ? t.modifier.value
                          : e.resolve(t.modifier.value, ["--leading"]);
                      if (!n && Se(t.modifier.value)) {
                        let r = e.resolve(null, ["--spacing"]);
                        if (!r) return null;
                        n = `calc(${r} * ${t.modifier.value})`;
                      }
                      return (
                        !n && "none" === t.modifier.value && (n = "1"),
                        n ? [S("font-size", r), S("line-height", n)] : null
                      );
                    }
                    return [S("font-size", r)];
                  default:
                    return (
                      (r = De(r, t.modifier, e)),
                      null === r ? void 0 : [S("color", r)]
                    );
                }
              }
              {
                let r = _e(t, e, ["--text-color", "--color"]);
                if (r) return [S("color", r)];
              }
              {
                let r = e.resolveWith(
                  t.value.value,
                  ["--text"],
                  ["--line-height", "--letter-spacing", "--font-weight"],
                );
                if (r) {
                  let [n, o = {}] = Array.isArray(r) ? r : [r];
                  if (t.modifier) {
                    let r =
                      "arbitrary" === t.modifier.kind
                        ? t.modifier.value
                        : e.resolve(t.modifier.value, ["--leading"]);
                    if (!r && Se(t.modifier.value)) {
                      let n = e.resolve(null, ["--spacing"]);
                      if (!n) return null;
                      r = `calc(${n} * ${t.modifier.value})`;
                    }
                    if ((!r && "none" === t.modifier.value && (r = "1"), !r))
                      return null;
                    let o = [S("font-size", n)];
                    return (r && o.push(S("line-height", r)), o);
                  }
                  return "string" == typeof o
                    ? [S("font-size", n), S("line-height", o)]
                    : [
                        S("font-size", n),
                        S(
                          "line-height",
                          o["--line-height"]
                            ? `var(--tw-leading, ${o["--line-height"]})`
                            : void 0,
                        ),
                        S(
                          "letter-spacing",
                          o["--letter-spacing"]
                            ? `var(--tw-tracking, ${o["--letter-spacing"]})`
                            : void 0,
                        ),
                        S(
                          "font-weight",
                          o["--font-weight"]
                            ? `var(--tw-font-weight, ${o["--font-weight"]})`
                            : void 0,
                        ),
                      ];
                }
              }
            }
          }),
          r("text", () => [
            {
              values: ["current", "inherit", "transparent"],
              valueThemeKeys: ["--text-color", "--color"],
              modifiers: Array.from({ length: 21 }, (e, t) => "" + 5 * t),
            },
            {
              values: [],
              valueThemeKeys: ["--text"],
              modifiers: [],
              modifierThemeKeys: ["--leading"],
            },
          ]));
        let C = () =>
          T([
            Ue("--tw-text-shadow-color"),
            Ue("--tw-text-shadow-alpha", "100%", "<percentage>"),
          ]);
        (n("text-shadow-initial", [C, ["--tw-text-shadow-color", "initial"]]),
          t.functional("text-shadow", (t) => {
            let r;
            if (
              (t.modifier &&
                ("arbitrary" === t.modifier.kind
                  ? (r = t.modifier.value)
                  : Ae(t.modifier.value) && (r = `${t.modifier.value}%`)),
              !t.value)
            ) {
              let t = e.get(["--text-shadow"]);
              return null === t
                ? void 0
                : [
                    C(),
                    S("--tw-text-shadow-alpha", r),
                    ...Ie(
                      "text-shadow",
                      t,
                      r,
                      (e) => `var(--tw-text-shadow-color, ${e})`,
                    ),
                  ];
            }
            if ("arbitrary" === t.value.kind) {
              let n = t.value.value;
              return "color" === (t.value.dataType ?? ce(n, ["color"]))
                ? ((n = De(n, t.modifier, e)),
                  null === n
                    ? void 0
                    : [
                        C(),
                        S(
                          "--tw-text-shadow-color",
                          We(n, "var(--tw-text-shadow-alpha)"),
                        ),
                      ])
                : [
                    C(),
                    S("--tw-text-shadow-alpha", r),
                    ...Ie(
                      "text-shadow",
                      n,
                      r,
                      (e) => `var(--tw-text-shadow-color, ${e})`,
                    ),
                  ];
            }
            switch (t.value.value) {
              case "none":
                return t.modifier ? void 0 : [C(), S("text-shadow", "none")];
              case "inherit":
                return t.modifier
                  ? void 0
                  : [C(), S("--tw-text-shadow-color", "inherit")];
            }
            {
              let n = e.get([`--text-shadow-${t.value.value}`]);
              if (n)
                return [
                  C(),
                  S("--tw-text-shadow-alpha", r),
                  ...Ie(
                    "text-shadow",
                    n,
                    r,
                    (e) => `var(--tw-text-shadow-color, ${e})`,
                  ),
                ];
            }
            {
              let r = _e(t, e, ["--text-shadow-color", "--color"]);
              if (r)
                return [
                  C(),
                  S(
                    "--tw-text-shadow-color",
                    We(r, "var(--tw-text-shadow-alpha)"),
                  ),
                ];
            }
          }),
          r("text-shadow", () => [
            {
              values: ["current", "inherit", "transparent"],
              valueThemeKeys: ["--text-shadow-color", "--color"],
              modifiers: Array.from({ length: 21 }, (e, t) => "" + 5 * t),
            },
            { values: ["none"] },
            {
              valueThemeKeys: ["--text-shadow"],
              modifiers: Array.from({ length: 21 }, (e, t) => "" + 5 * t),
              hasDefaultValue: null !== e.get(["--text-shadow"]),
            },
          ]));
        {
          let o = function (e) {
              return `var(--tw-ring-inset,) 0 0 0 calc(${e} + var(--tw-ring-offset-width)) var(--tw-ring-color, ${c})`;
            },
            a = function (e) {
              return `inset 0 0 0 ${e} var(--tw-inset-ring-color, currentcolor)`;
            },
            i = [
              "var(--tw-inset-shadow)",
              "var(--tw-inset-ring-shadow)",
              "var(--tw-ring-offset-shadow)",
              "var(--tw-ring-shadow)",
              "var(--tw-shadow)",
            ].join(", "),
            l = "0 0 #0000",
            s = () =>
              T([
                Ue("--tw-shadow", l),
                Ue("--tw-shadow-color"),
                Ue("--tw-shadow-alpha", "100%", "<percentage>"),
                Ue("--tw-inset-shadow", l),
                Ue("--tw-inset-shadow-color"),
                Ue("--tw-inset-shadow-alpha", "100%", "<percentage>"),
                Ue("--tw-ring-color"),
                Ue("--tw-ring-shadow", l),
                Ue("--tw-inset-ring-color"),
                Ue("--tw-inset-ring-shadow", l),
                Ue("--tw-ring-inset"),
                Ue("--tw-ring-offset-width", "0px", "<length>"),
                Ue("--tw-ring-offset-color", "#fff"),
                Ue("--tw-ring-offset-shadow", l),
              ]);
          (n("shadow-initial", [s, ["--tw-shadow-color", "initial"]]),
            t.functional("shadow", (t) => {
              let r;
              if (
                (t.modifier &&
                  ("arbitrary" === t.modifier.kind
                    ? (r = t.modifier.value)
                    : Ae(t.modifier.value) && (r = `${t.modifier.value}%`)),
                !t.value)
              ) {
                let t = e.get(["--shadow"]);
                return null === t
                  ? void 0
                  : [
                      s(),
                      S("--tw-shadow-alpha", r),
                      ...Ie(
                        "--tw-shadow",
                        t,
                        r,
                        (e) => `var(--tw-shadow-color, ${e})`,
                      ),
                      S("box-shadow", i),
                    ];
              }
              if ("arbitrary" === t.value.kind) {
                let n = t.value.value;
                return "color" === (t.value.dataType ?? ce(n, ["color"]))
                  ? ((n = De(n, t.modifier, e)),
                    null === n
                      ? void 0
                      : [
                          s(),
                          S(
                            "--tw-shadow-color",
                            We(n, "var(--tw-shadow-alpha)"),
                          ),
                        ])
                  : [
                      s(),
                      S("--tw-shadow-alpha", r),
                      ...Ie(
                        "--tw-shadow",
                        n,
                        r,
                        (e) => `var(--tw-shadow-color, ${e})`,
                      ),
                      S("box-shadow", i),
                    ];
              }
              switch (t.value.value) {
                case "none":
                  return t.modifier
                    ? void 0
                    : [s(), S("--tw-shadow", l), S("box-shadow", i)];
                case "inherit":
                  return t.modifier
                    ? void 0
                    : [s(), S("--tw-shadow-color", "inherit")];
              }
              {
                let n = e.get([`--shadow-${t.value.value}`]);
                if (n)
                  return [
                    s(),
                    S("--tw-shadow-alpha", r),
                    ...Ie(
                      "--tw-shadow",
                      n,
                      r,
                      (e) => `var(--tw-shadow-color, ${e})`,
                    ),
                    S("box-shadow", i),
                  ];
              }
              {
                let r = _e(t, e, ["--box-shadow-color", "--color"]);
                if (r)
                  return [
                    s(),
                    S("--tw-shadow-color", We(r, "var(--tw-shadow-alpha)")),
                  ];
              }
            }),
            r("shadow", () => [
              {
                values: ["current", "inherit", "transparent"],
                valueThemeKeys: ["--box-shadow-color", "--color"],
                modifiers: Array.from({ length: 21 }, (e, t) => "" + 5 * t),
              },
              { values: ["none"] },
              {
                valueThemeKeys: ["--shadow"],
                modifiers: Array.from({ length: 21 }, (e, t) => "" + 5 * t),
                hasDefaultValue: null !== e.get(["--shadow"]),
              },
            ]),
            n("inset-shadow-initial", [
              s,
              ["--tw-inset-shadow-color", "initial"],
            ]),
            t.functional("inset-shadow", (t) => {
              let r;
              if (
                (t.modifier &&
                  ("arbitrary" === t.modifier.kind
                    ? (r = t.modifier.value)
                    : Ae(t.modifier.value) && (r = `${t.modifier.value}%`)),
                !t.value)
              ) {
                let t = e.get(["--inset-shadow"]);
                return null === t
                  ? void 0
                  : [
                      s(),
                      S("--tw-inset-shadow-alpha", r),
                      ...Ie(
                        "--tw-inset-shadow",
                        t,
                        r,
                        (e) => `var(--tw-inset-shadow-color, ${e})`,
                      ),
                      S("box-shadow", i),
                    ];
              }
              if ("arbitrary" === t.value.kind) {
                let n = t.value.value;
                return "color" === (t.value.dataType ?? ce(n, ["color"]))
                  ? ((n = De(n, t.modifier, e)),
                    null === n
                      ? void 0
                      : [
                          s(),
                          S(
                            "--tw-inset-shadow-color",
                            We(n, "var(--tw-inset-shadow-alpha)"),
                          ),
                        ])
                  : [
                      s(),
                      S("--tw-inset-shadow-alpha", r),
                      ...Ie(
                        "--tw-inset-shadow",
                        n,
                        r,
                        (e) => `var(--tw-inset-shadow-color, ${e})`,
                        "inset ",
                      ),
                      S("box-shadow", i),
                    ];
              }
              switch (t.value.value) {
                case "none":
                  return t.modifier
                    ? void 0
                    : [s(), S("--tw-inset-shadow", l), S("box-shadow", i)];
                case "inherit":
                  return t.modifier
                    ? void 0
                    : [s(), S("--tw-inset-shadow-color", "inherit")];
              }
              {
                let n = e.get([`--inset-shadow-${t.value.value}`]);
                if (n)
                  return [
                    s(),
                    S("--tw-inset-shadow-alpha", r),
                    ...Ie(
                      "--tw-inset-shadow",
                      n,
                      r,
                      (e) => `var(--tw-inset-shadow-color, ${e})`,
                    ),
                    S("box-shadow", i),
                  ];
              }
              {
                let r = _e(t, e, ["--box-shadow-color", "--color"]);
                if (r)
                  return [
                    s(),
                    S(
                      "--tw-inset-shadow-color",
                      We(r, "var(--tw-inset-shadow-alpha)"),
                    ),
                  ];
              }
            }),
            r("inset-shadow", () => [
              {
                values: ["current", "inherit", "transparent"],
                valueThemeKeys: ["--box-shadow-color", "--color"],
                modifiers: Array.from({ length: 21 }, (e, t) => "" + 5 * t),
              },
              { values: ["none"] },
              {
                valueThemeKeys: ["--inset-shadow"],
                modifiers: Array.from({ length: 21 }, (e, t) => "" + 5 * t),
                hasDefaultValue: null !== e.get(["--inset-shadow"]),
              },
            ]),
            n("ring-inset", [s, ["--tw-ring-inset", "inset"]]));
          let c = e.get(["--default-ring-color"]) ?? "currentcolor";
          (t.functional("ring", (t) => {
            if (!t.value) {
              if (t.modifier) return;
              let r = e.get(["--default-ring-width"]) ?? "1px";
              return [s(), S("--tw-ring-shadow", o(r)), S("box-shadow", i)];
            }
            if ("arbitrary" === t.value.kind) {
              let r = t.value.value;
              return "length" ===
                (t.value.dataType ?? ce(r, ["color", "length"]))
                ? t.modifier
                  ? void 0
                  : [s(), S("--tw-ring-shadow", o(r)), S("box-shadow", i)]
                : ((r = De(r, t.modifier, e)),
                  null === r ? void 0 : [S("--tw-ring-color", r)]);
            }
            {
              let r = _e(t, e, ["--ring-color", "--color"]);
              if (r) return [S("--tw-ring-color", r)];
            }
            {
              if (t.modifier) return;
              let r = e.resolve(t.value.value, ["--ring-width"]);
              if (
                (null === r && Ae(t.value.value) && (r = `${t.value.value}px`),
                r)
              )
                return [s(), S("--tw-ring-shadow", o(r)), S("box-shadow", i)];
            }
          }),
            r("ring", () => [
              {
                values: ["current", "inherit", "transparent"],
                valueThemeKeys: ["--ring-color", "--color"],
                modifiers: Array.from({ length: 21 }, (e, t) => "" + 5 * t),
              },
              {
                values: ["0", "1", "2", "4", "8"],
                valueThemeKeys: ["--ring-width"],
                hasDefaultValue: !0,
              },
            ]),
            t.functional("inset-ring", (t) => {
              if (!t.value)
                return t.modifier
                  ? void 0
                  : [
                      s(),
                      S("--tw-inset-ring-shadow", a("1px")),
                      S("box-shadow", i),
                    ];
              if ("arbitrary" === t.value.kind) {
                let r = t.value.value;
                return "length" ===
                  (t.value.dataType ?? ce(r, ["color", "length"]))
                  ? t.modifier
                    ? void 0
                    : [
                        s(),
                        S("--tw-inset-ring-shadow", a(r)),
                        S("box-shadow", i),
                      ]
                  : ((r = De(r, t.modifier, e)),
                    null === r ? void 0 : [S("--tw-inset-ring-color", r)]);
              }
              {
                let r = _e(t, e, ["--ring-color", "--color"]);
                if (r) return [S("--tw-inset-ring-color", r)];
              }
              {
                if (t.modifier) return;
                let r = e.resolve(t.value.value, ["--ring-width"]);
                if (
                  (null === r &&
                    Ae(t.value.value) &&
                    (r = `${t.value.value}px`),
                  r)
                )
                  return [
                    s(),
                    S("--tw-inset-ring-shadow", a(r)),
                    S("box-shadow", i),
                  ];
              }
            }),
            r("inset-ring", () => [
              {
                values: ["current", "inherit", "transparent"],
                valueThemeKeys: ["--ring-color", "--color"],
                modifiers: Array.from({ length: 21 }, (e, t) => "" + 5 * t),
              },
              {
                values: ["0", "1", "2", "4", "8"],
                valueThemeKeys: ["--ring-width"],
                hasDefaultValue: !0,
              },
            ]));
          let u =
            "var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)";
          t.functional("ring-offset", (t) => {
            if (t.value) {
              if ("arbitrary" === t.value.kind) {
                let r = t.value.value;
                return "length" ===
                  (t.value.dataType ?? ce(r, ["color", "length"]))
                  ? t.modifier
                    ? void 0
                    : [
                        S("--tw-ring-offset-width", r),
                        S("--tw-ring-offset-shadow", u),
                      ]
                  : ((r = De(r, t.modifier, e)),
                    null === r ? void 0 : [S("--tw-ring-offset-color", r)]);
              }
              {
                let r = e.resolve(t.value.value, ["--ring-offset-width"]);
                if (r)
                  return t.modifier
                    ? void 0
                    : [
                        S("--tw-ring-offset-width", r),
                        S("--tw-ring-offset-shadow", u),
                      ];
                if (Ae(t.value.value))
                  return t.modifier
                    ? void 0
                    : [
                        S("--tw-ring-offset-width", `${t.value.value}px`),
                        S("--tw-ring-offset-shadow", u),
                      ];
              }
              {
                let r = _e(t, e, ["--ring-offset-color", "--color"]);
                if (r) return [S("--tw-ring-offset-color", r)];
              }
            }
          });
        }
        return (
          r("ring-offset", () => [
            {
              values: ["current", "inherit", "transparent"],
              valueThemeKeys: ["--ring-offset-color", "--color"],
              modifiers: Array.from({ length: 21 }, (e, t) => "" + 5 * t),
            },
            {
              values: ["0", "1", "2", "4", "8"],
              valueThemeKeys: ["--ring-offset-width"],
            },
          ]),
          t.functional("@container", (e) => {
            let t = null;
            if (
              (null === e.value
                ? (t = "inline-size")
                : "arbitrary" === e.value.kind
                  ? (t = e.value.value)
                  : "named" === e.value.kind &&
                    "normal" === e.value.value &&
                    (t = "normal"),
              null !== t)
            )
              return e.modifier
                ? [
                    S("container-type", t),
                    S("container-name", e.modifier.value),
                  ]
                : [S("container-type", t)];
          }),
          r("@container", () => [
            { values: ["normal"], valueThemeKeys: [], hasDefaultValue: !0 },
          ]),
          t
        );
      })(e),
      r = (function (e) {
        let t = new Je();
        function r(e, r, { compounds: n } = {}) {
          ((n = n ?? Xe(r)),
            t.static(
              e,
              (e) => {
                e.nodes = r.map((t) => z(t, e.nodes));
              },
              { compounds: n },
            ));
        }
        function n(e, t) {
          return t.map((t) => {
            let r = q((t = t.trim()), " ");
            return "not" === r[0]
              ? r.slice(1).join(" ")
              : "@container" === e
                ? "(" === r[0][0]
                  ? `not ${t}`
                  : "not" === r[1]
                    ? `${r[0]} ${r.slice(2).join(" ")}`
                    : `${r[0]} not ${r.slice(1).join(" ")}`
                : `not ${t}`;
          });
        }
        (r("*", [":is(& > *)"], { compounds: 0 }),
          r("**", [":is(& *)"], { compounds: 0 }));
        let o = ["@media", "@supports", "@container"];
        function a(e) {
          for (let t of o) {
            if (t !== e.name) continue;
            let r = q(e.params, ",");
            return r.length > 1
              ? null
              : ((r = n(e.name, r)), A(e.name, r.join(", ")));
          }
          return null;
        }
        function i(e) {
          return e.includes("::")
            ? null
            : `&:not(${q(e, ",")
                .map((e) => e.replaceAll("&", "*"))
                .join(", ")})`;
        }
        (t.compound("not", 3, (e, t) => {
          if (
            ("arbitrary" === t.variant.kind && t.variant.relative) ||
            t.modifier
          )
            return null;
          let r = !1;
          return (
            k([e], (t, n) => {
              if ("rule" !== t.kind && "at-rule" !== t.kind) return w.Continue;
              if (t.nodes.length > 0) return w.Continue;
              let o = [],
                l = [],
                s = n.path();
              s.push(t);
              for (let e of s)
                "at-rule" === e.kind
                  ? o.push(e)
                  : "rule" === e.kind && l.push(e);
              if (o.length > 1) return w.Stop;
              if (l.length > 1) return w.Stop;
              let c = [];
              for (let e of l) {
                let t = i(e.selector);
                if (!t) return ((r = !1), w.Stop);
                c.push($(t, []));
              }
              for (let e of o) {
                let t = a(e);
                if (!t) return ((r = !1), w.Stop);
                c.push(t);
              }
              return (Object.assign(e, $("&", c)), (r = !0), w.Skip);
            }),
            "rule" === e.kind &&
              "&" === e.selector &&
              1 === e.nodes.length &&
              Object.assign(e, e.nodes[0]),
            r ? void 0 : null
          );
        }),
          t.suggest("not", () =>
            Array.from(t.keys()).filter((e) => t.compoundsWith("not", e)),
          ),
          t.compound("group", 2, (t, r) => {
            if ("arbitrary" === r.variant.kind && r.variant.relative)
              return null;
            let n = r.modifier
                ? `:where(.${e.prefix ? `${e.prefix}\\:` : ""}group\\/${r.modifier.value})`
                : `:where(.${e.prefix ? `${e.prefix}\\:` : ""}group)`,
              o = !1;
            return (
              k([t], (e, t) => {
                if ("rule" !== e.kind) return w.Continue;
                for (let e of t.path())
                  if ("rule" === e.kind) return ((o = !1), w.Stop);
                let r = e.selector.replaceAll("&", n);
                (q(r, ",").length > 1 && (r = `:is(${r})`),
                  (e.selector = `&:is(${r} *)`),
                  (o = !0));
              }),
              o ? void 0 : null
            );
          }),
          t.suggest("group", () =>
            Array.from(t.keys()).filter((e) => t.compoundsWith("group", e)),
          ),
          t.compound("peer", 2, (t, r) => {
            if ("arbitrary" === r.variant.kind && r.variant.relative)
              return null;
            let n = r.modifier
                ? `:where(.${e.prefix ? `${e.prefix}\\:` : ""}peer\\/${r.modifier.value})`
                : `:where(.${e.prefix ? `${e.prefix}\\:` : ""}peer)`,
              o = !1;
            return (
              k([t], (e, t) => {
                if ("rule" !== e.kind) return w.Continue;
                for (let e of t.path())
                  if ("rule" === e.kind) return ((o = !1), w.Stop);
                let r = e.selector.replaceAll("&", n);
                (q(r, ",").length > 1 && (r = `:is(${r})`),
                  (e.selector = `&:is(${r} ~ *)`),
                  (o = !0));
              }),
              o ? void 0 : null
            );
          }),
          t.suggest("peer", () =>
            Array.from(t.keys()).filter((e) => t.compoundsWith("peer", e)),
          ),
          r("first-letter", ["&::first-letter"]),
          r("first-line", ["&::first-line"]),
          r("marker", [
            "& *::marker",
            "&::marker",
            "& *::-webkit-details-marker",
            "&::-webkit-details-marker",
          ]),
          r("selection", ["& *::selection", "&::selection"]),
          r("file", ["&::file-selector-button"]),
          r("placeholder", ["&::placeholder"]),
          r("backdrop", ["&::backdrop"]),
          r("details-content", ["&::details-content"]));
        {
          let e = function () {
            return T([
              A("@property", "--tw-content", [
                S("syntax", '"*"'),
                S("initial-value", '""'),
                S("inherits", "false"),
              ]),
            ]);
          };
          (t.static(
            "before",
            (t) => {
              t.nodes = [
                $("&::before", [
                  e(),
                  S("content", "var(--tw-content)"),
                  ...t.nodes,
                ]),
              ];
            },
            { compounds: 0 },
          ),
            t.static(
              "after",
              (t) => {
                t.nodes = [
                  $("&::after", [
                    e(),
                    S("content", "var(--tw-content)"),
                    ...t.nodes,
                  ]),
                ];
              },
              { compounds: 0 },
            ));
        }
        (r("first", ["&:first-child"]),
          r("last", ["&:last-child"]),
          r("only", ["&:only-child"]),
          r("odd", ["&:nth-child(odd)"]),
          r("even", ["&:nth-child(even)"]),
          r("first-of-type", ["&:first-of-type"]),
          r("last-of-type", ["&:last-of-type"]),
          r("only-of-type", ["&:only-of-type"]),
          r("visited", ["&:visited"]),
          r("target", ["&:target"]),
          r("open", ["&:is([open], :popover-open, :open)"]),
          r("default", ["&:default"]),
          r("checked", ["&:checked"]),
          r("indeterminate", ["&:indeterminate"]),
          r("placeholder-shown", ["&:placeholder-shown"]),
          r("autofill", ["&:autofill"]),
          r("optional", ["&:optional"]),
          r("required", ["&:required"]),
          r("valid", ["&:valid"]),
          r("invalid", ["&:invalid"]),
          r("user-valid", ["&:user-valid"]),
          r("user-invalid", ["&:user-invalid"]),
          r("in-range", ["&:in-range"]),
          r("out-of-range", ["&:out-of-range"]),
          r("read-only", ["&:read-only"]),
          r("empty", ["&:empty"]),
          r("focus-within", ["&:focus-within"]),
          t.static("hover", (e) => {
            e.nodes = [$("&:hover", [A("@media", "(hover: hover)", e.nodes)])];
          }),
          r("focus", ["&:focus"]),
          r("focus-visible", ["&:focus-visible"]),
          r("active", ["&:active"]),
          r("enabled", ["&:enabled"]),
          r("disabled", ["&:disabled"]),
          r("inert", ["&:is([inert], [inert] *)"]),
          t.compound("in", 2, (e, t) => {
            if (t.modifier) return null;
            let r = !1;
            return (
              k([e], (e, t) => {
                if ("rule" !== e.kind) return w.Continue;
                for (let e of t.path())
                  if ("rule" === e.kind) return ((r = !1), w.Stop);
                ((e.selector = `:where(${e.selector.replaceAll("&", "*")}) &`),
                  (r = !0));
              }),
              r ? void 0 : null
            );
          }),
          t.suggest("in", () =>
            Array.from(t.keys()).filter((e) => t.compoundsWith("in", e)),
          ),
          t.compound("has", 2, (e, t) => {
            if (t.modifier) return null;
            let r = !1;
            return (
              k([e], (e, t) => {
                if ("rule" !== e.kind) return w.Continue;
                for (let e of t.path())
                  if ("rule" === e.kind) return ((r = !1), w.Stop);
                ((e.selector = `&:has(${e.selector.replaceAll("&", "*")})`),
                  (r = !0));
              }),
              r ? void 0 : null
            );
          }),
          t.suggest("has", () =>
            Array.from(t.keys()).filter((e) => t.compoundsWith("has", e)),
          ),
          t.functional("aria", (e, t) => {
            if (!t.value || t.modifier) return null;
            "arbitrary" === t.value.kind
              ? (e.nodes = [$(`&[aria-${Qe(t.value.value)}]`, e.nodes)])
              : (e.nodes = [$(`&[aria-${t.value.value}="true"]`, e.nodes)]);
          }),
          t.suggest("aria", () => [
            "busy",
            "checked",
            "disabled",
            "expanded",
            "hidden",
            "pressed",
            "readonly",
            "required",
            "selected",
          ]),
          t.functional("data", (e, t) => {
            if (!t.value || t.modifier) return null;
            e.nodes = [$(`&[data-${Qe(t.value.value)}]`, e.nodes)];
          }),
          t.functional("nth", (e, t) => {
            if (
              !t.value ||
              t.modifier ||
              ("named" === t.value.kind && !Ae(t.value.value))
            )
              return null;
            e.nodes = [$(`&:nth-child(${t.value.value})`, e.nodes)];
          }),
          t.functional("nth-last", (e, t) => {
            if (
              !t.value ||
              t.modifier ||
              ("named" === t.value.kind && !Ae(t.value.value))
            )
              return null;
            e.nodes = [$(`&:nth-last-child(${t.value.value})`, e.nodes)];
          }),
          t.functional("nth-of-type", (e, t) => {
            if (
              !t.value ||
              t.modifier ||
              ("named" === t.value.kind && !Ae(t.value.value))
            )
              return null;
            e.nodes = [$(`&:nth-of-type(${t.value.value})`, e.nodes)];
          }),
          t.functional("nth-last-of-type", (e, t) => {
            if (
              !t.value ||
              t.modifier ||
              ("named" === t.value.kind && !Ae(t.value.value))
            )
              return null;
            e.nodes = [$(`&:nth-last-of-type(${t.value.value})`, e.nodes)];
          }),
          t.functional(
            "supports",
            (e, t) => {
              if (!t.value || t.modifier) return null;
              let r = t.value.value;
              if (null === r) return null;
              if (/^[\w-]*\s*\(/.test(r)) {
                let t = r.replace(/\b(and|or|not)\b/g, " $1 ");
                e.nodes = [A("@supports", t, e.nodes)];
              } else
                (r.includes(":") || (r = `${r}: var(--tw)`),
                  ("(" !== r[0] || ")" !== r[r.length - 1]) && (r = `(${r})`),
                  (e.nodes = [A("@supports", r, e.nodes)]));
            },
            { compounds: 1 },
          ),
          r("motion-safe", ["@media (prefers-reduced-motion: no-preference)"]),
          r("motion-reduce", ["@media (prefers-reduced-motion: reduce)"]),
          r("contrast-more", ["@media (prefers-contrast: more)"]),
          r("contrast-less", ["@media (prefers-contrast: less)"]));
        {
          let r = function (e, t, r, n) {
            if (e === t) return 0;
            let o = n.get(e);
            if (null === o) return "asc" === r ? -1 : 1;
            let a = n.get(t);
            return null === a ? ("asc" === r ? 1 : -1) : ae(o, a, r);
          };
          {
            let n = e.namespace("--breakpoint"),
              o = new u((t) => {
                switch (t.kind) {
                  case "static":
                    return e.resolveValue(t.root, ["--breakpoint"]) ?? null;
                  case "functional": {
                    if (!t.value || t.modifier) return null;
                    let r = null;
                    return (
                      "arbitrary" === t.value.kind
                        ? (r = t.value.value)
                        : "named" === t.value.kind &&
                          (r = e.resolveValue(t.value.value, ["--breakpoint"])),
                      !r || r.includes("var(") ? null : r
                    );
                  }
                  case "arbitrary":
                  case "compound":
                    return null;
                }
              });
            (t.group(
              () => {
                t.functional(
                  "max",
                  (e, t) => {
                    if (t.modifier) return null;
                    let r = o.get(t);
                    if (null === r) return null;
                    e.nodes = [A("@media", `(width < ${r})`, e.nodes)];
                  },
                  { compounds: 1 },
                );
              },
              (e, t) => r(e, t, "desc", o),
            ),
              t.suggest("max", () =>
                Array.from(n.keys()).filter((e) => null !== e),
              ),
              t.group(
                () => {
                  for (let [r, n] of e.namespace("--breakpoint"))
                    null !== r &&
                      t.static(
                        r,
                        (e) => {
                          e.nodes = [A("@media", `(width >= ${n})`, e.nodes)];
                        },
                        { compounds: 1 },
                      );
                  t.functional(
                    "min",
                    (e, t) => {
                      if (t.modifier) return null;
                      let r = o.get(t);
                      if (null === r) return null;
                      e.nodes = [A("@media", `(width >= ${r})`, e.nodes)];
                    },
                    { compounds: 1 },
                  );
                },
                (e, t) => r(e, t, "asc", o),
              ),
              t.suggest("min", () =>
                Array.from(n.keys()).filter((e) => null !== e),
              ));
          }
          {
            let n = e.namespace("--container"),
              o = new u((t) => {
                switch (t.kind) {
                  case "functional": {
                    if (null === t.value) return null;
                    let r = null;
                    return (
                      "arbitrary" === t.value.kind
                        ? (r = t.value.value)
                        : "named" === t.value.kind &&
                          (r = e.resolveValue(t.value.value, ["--container"])),
                      !r || r.includes("var(") ? null : r
                    );
                  }
                  case "static":
                  case "arbitrary":
                  case "compound":
                    return null;
                }
              });
            (t.group(
              () => {
                t.functional(
                  "@max",
                  (e, t) => {
                    let r = o.get(t);
                    if (null === r) return null;
                    e.nodes = [
                      A(
                        "@container",
                        t.modifier
                          ? `${t.modifier.value} (width < ${r})`
                          : `(width < ${r})`,
                        e.nodes,
                      ),
                    ];
                  },
                  { compounds: 1 },
                );
              },
              (e, t) => r(e, t, "desc", o),
            ),
              t.suggest("@max", () =>
                Array.from(n.keys()).filter((e) => null !== e),
              ),
              t.group(
                () => {
                  (t.functional(
                    "@",
                    (e, t) => {
                      let r = o.get(t);
                      if (null === r) return null;
                      e.nodes = [
                        A(
                          "@container",
                          t.modifier
                            ? `${t.modifier.value} (width >= ${r})`
                            : `(width >= ${r})`,
                          e.nodes,
                        ),
                      ];
                    },
                    { compounds: 1 },
                  ),
                    t.functional(
                      "@min",
                      (e, t) => {
                        let r = o.get(t);
                        if (null === r) return null;
                        e.nodes = [
                          A(
                            "@container",
                            t.modifier
                              ? `${t.modifier.value} (width >= ${r})`
                              : `(width >= ${r})`,
                            e.nodes,
                          ),
                        ];
                      },
                      { compounds: 1 },
                    ));
                },
                (e, t) => r(e, t, "asc", o),
              ),
              t.suggest("@min", () =>
                Array.from(n.keys()).filter((e) => null !== e),
              ),
              t.suggest("@", () =>
                Array.from(n.keys()).filter((e) => null !== e),
              ));
          }
        }
        return (
          r("portrait", ["@media (orientation: portrait)"]),
          r("landscape", ["@media (orientation: landscape)"]),
          r("ltr", ['&:where(:dir(ltr), [dir="ltr"], [dir="ltr"] *)']),
          r("rtl", ['&:where(:dir(rtl), [dir="rtl"], [dir="rtl"] *)']),
          r("dark", ["@media (prefers-color-scheme: dark)"]),
          r("starting", ["@starting-style"]),
          r("print", ["@media print"]),
          r("forced-colors", ["@media (forced-colors: active)"]),
          r("inverted-colors", ["@media (inverted-colors: inverted)"]),
          r("pointer-none", ["@media (pointer: none)"]),
          r("pointer-coarse", ["@media (pointer: coarse)"]),
          r("pointer-fine", ["@media (pointer: fine)"]),
          r("any-pointer-none", ["@media (any-pointer: none)"]),
          r("any-pointer-coarse", ["@media (any-pointer: coarse)"]),
          r("any-pointer-fine", ["@media (any-pointer: fine)"]),
          r("noscript", ["@media (scripting: none)"]),
          t
        );
      })(e),
      n = new u((e) =>
        (function (e, t) {
          if ("[" === e[0] && "]" === e[e.length - 1]) {
            if ("@" === e[1] && e.includes("&")) return null;
            let t = D(e.slice(1, -1));
            if (!I(t) || 0 === t.length || 0 === t.trim().length) return null;
            let r = ">" === t[0] || "+" === t[0] || "~" === t[0];
            return (
              !r && "@" !== t[0] && !t.includes("&") && (t = `&:is(${t})`),
              { kind: "arbitrary", selector: t, relative: r }
            );
          }
          {
            let [r, n = null, o] = q(e, "/");
            if (o) return null;
            let a = Z(r, (e) => t.variants.has(e));
            for (let [e, r] of a)
              switch (t.variants.kind(e)) {
                case "static":
                  return null !== r || null !== n
                    ? null
                    : { kind: "static", root: e };
                case "functional": {
                  let t = null === n ? null : H(n);
                  if (null !== n && null === t) return null;
                  if (null === r)
                    return {
                      kind: "functional",
                      root: e,
                      modifier: t,
                      value: null,
                    };
                  if ("]" === r[r.length - 1]) {
                    if ("[" !== r[0]) continue;
                    let n = D(r.slice(1, -1));
                    return I(n) && 0 !== n.length && 0 !== n.trim().length
                      ? {
                          kind: "functional",
                          root: e,
                          modifier: t,
                          value: { kind: "arbitrary", value: n },
                        }
                      : null;
                  }
                  if (")" === r[r.length - 1]) {
                    if ("(" !== r[0]) continue;
                    let n = D(r.slice(1, -1));
                    return I(n) &&
                      0 !== n.length &&
                      0 !== n.trim().length &&
                      "-" === n[0] &&
                      "-" === n[1]
                      ? {
                          kind: "functional",
                          root: e,
                          modifier: t,
                          value: { kind: "arbitrary", value: `var(${n})` },
                        }
                      : null;
                  }
                  return {
                    kind: "functional",
                    root: e,
                    modifier: t,
                    value: { kind: "named", value: r },
                  };
                }
                case "compound": {
                  if (null === r) return null;
                  n &&
                    ("not" === e || "has" === e || "in" === e) &&
                    ((r = `${r}/${n}`), (n = null));
                  let o = t.parseVariant(r);
                  if (null === o || !t.variants.compoundsWith(e, o))
                    return null;
                  let a = null === n ? null : H(n);
                  return null !== n && null === a
                    ? null
                    : { kind: "compound", root: e, modifier: a, variant: o };
                }
              }
          }
          return null;
        })(e, s),
      ),
      o = new u((e) =>
        Array.from(
          (function* (e, t) {
            let r = q(e, ":");
            if (t.theme.prefix) {
              if (1 === r.length || r[0] !== t.theme.prefix) return null;
              r.shift();
            }
            let n = r.pop(),
              o = [];
            for (let e = r.length - 1; e >= 0; --e) {
              let n = t.parseVariant(r[e]);
              if (null === n) return;
              o.push(n);
            }
            let a = !1;
            ("!" === n[n.length - 1]
              ? ((a = !0), (n = n.slice(0, -1)))
              : "!" === n[0] && ((a = !0), (n = n.slice(1))),
              t.utilities.has(n, "static") &&
                !n.includes("[") &&
                (yield {
                  kind: "static",
                  root: n,
                  variants: o,
                  important: a,
                  raw: e,
                }));
            let [i, l = null, s] = q(n, "/");
            if (s) return;
            let c,
              u = null === l ? null : H(l);
            if (null === l || null !== u)
              if ("[" !== i[0]) {
                if ("]" === i[i.length - 1]) {
                  let e = i.indexOf("-[");
                  if (-1 === e) return;
                  let r = i.slice(0, e);
                  if (!t.utilities.has(r, "functional")) return;
                  c = [[r, i.slice(e + 1)]];
                } else if (")" === i[i.length - 1]) {
                  let e = i.indexOf("-(");
                  if (-1 === e) return;
                  let r = i.slice(0, e);
                  if (!t.utilities.has(r, "functional")) return;
                  let n = i.slice(e + 2, -1),
                    o = q(n, ":"),
                    a = null;
                  if (
                    (2 === o.length && ((a = o[0]), (n = o[1])),
                    "-" !== n[0] || "-" !== n[1] || !I(n))
                  )
                    return;
                  c = [[r, null === a ? `[var(${n})]` : `[${a}:var(${n})]`]];
                } else c = Z(i, (e) => t.utilities.has(e, "functional"));
                for (let [t, r] of c) {
                  let n = {
                    kind: "functional",
                    root: t,
                    modifier: u,
                    value: null,
                    variants: o,
                    important: a,
                    raw: e,
                  };
                  if (null !== r) {
                    {
                      let e = r.indexOf("[");
                      if (-1 !== e) {
                        if ("]" !== r[r.length - 1]) return;
                        let t = D(r.slice(e + 1, -1));
                        if (!I(t)) continue;
                        let o = null;
                        for (let e = 0; e < t.length; e++) {
                          let r = t.charCodeAt(e);
                          if (58 === r) {
                            ((o = t.slice(0, e)), (t = t.slice(e + 1)));
                            break;
                          }
                          if (!(45 === r || (r >= 97 && r <= 122))) break;
                        }
                        if (0 === t.length || 0 === t.trim().length || "" === o)
                          continue;
                        n.value = {
                          kind: "arbitrary",
                          dataType: o || null,
                          value: t,
                        };
                      } else {
                        let e =
                          null === l || "arbitrary" === n.modifier?.kind
                            ? null
                            : `${r}/${l}`;
                        n.value = { kind: "named", value: r, fraction: e };
                      }
                    }
                    yield n;
                  } else yield n;
                }
              } else {
                if ("]" !== i[i.length - 1]) return;
                let t = i.charCodeAt(1);
                if (45 !== t && !(t >= 97 && t <= 122)) return;
                i = i.slice(1, -1);
                let r = i.indexOf(":");
                if (-1 === r || 0 === r || r === i.length - 1) return;
                let n = i.slice(0, r),
                  l = D(i.slice(r + 1));
                if (!I(l)) return;
                yield {
                  kind: "arbitrary",
                  property: n,
                  value: l,
                  modifier: u,
                  variants: o,
                  important: a,
                  raw: e,
                };
              }
          })(e, s),
        ),
      ),
      i = new u(
        (e) =>
          new u((t) => {
            let r = (function (e, t, r) {
              let n = (function (e, t) {
                if ("arbitrary" === e.kind) {
                  let r = e.value;
                  return (
                    e.modifier && (r = De(r, e.modifier, t.theme)),
                    null === r ? [] : [[S(e.property, r)]]
                  );
                }
                let r = t.utilities.get(e.root) ?? [],
                  n = [],
                  o = r.filter((e) => !it(e));
                for (let t of o) {
                  if (t.kind !== e.kind) continue;
                  let r = t.compileFn(e);
                  if (void 0 !== r) {
                    if (null === r) return n;
                    n.push(r);
                  }
                }
                if (n.length > 0) return n;
                let a = r.filter((e) => it(e));
                for (let t of a) {
                  if (t.kind !== e.kind) continue;
                  let r = t.compileFn(e);
                  if (void 0 !== r) {
                    if (null === r) return n;
                    n.push(r);
                  }
                }
                return n;
              })(e, t);
              if (0 === n.length) return [];
              let o = t.important && !!(1 & r),
                i = [],
                l = `.${a(e.raw)}`;
              for (let r of n) {
                let n = st(r);
                (e.important || o) && lt(r);
                let a = { kind: "rule", selector: l, nodes: r };
                for (let r of e.variants)
                  if (null === at(a, r, t.variants)) return [];
                i.push({ node: a, propertySort: n });
              }
              return i;
            })(t, s, e);
            try {
              Ze(
                r.map(({ node: e }) => e),
                s,
              );
            } catch {
              return [];
            }
            return r;
          }),
      ),
      l = new u((t) => {
        for (let r of y(t)) e.markUsedVariable(r);
      }),
      s = {
        theme: e,
        utilities: t,
        variants: r,
        invalidCandidates: new Set(),
        important: !1,
        candidatesToCss(e) {
          let t = [];
          for (let r of e) {
            let e = !1,
              { astNodes: n } = ot([r], this, {
                onInvalidCandidate() {
                  e = !0;
                },
              });
            ((n = E(n, s, 0)),
              0 === n.length || e ? t.push(null) : t.push(N(n)));
          }
          return t;
        },
        getClassOrder(e) {
          return (function (e, t) {
            let { astNodes: r, nodeSorting: n } = ot(Array.from(t), e),
              o = new Map(t.map((e) => [e, null])),
              a = 0n;
            for (let e of r) {
              let t = n.get(e)?.candidate;
              t && o.set(t, o.get(t) ?? a++);
            }
            return t.map((e) => [e, o.get(e) ?? null]);
          })(this, e);
        },
        getClassList: () => [],
        getVariants: () => [],
        parseCandidate: (e) => o.get(e),
        parseVariant: (e) => n.get(e),
        compileAstNodes: (e, t = 1) => i.get(t).get(e),
        printCandidate: (e) =>
          (function (e, t) {
            let r = [];
            for (let e of t.variants) r.unshift(G(e));
            e.theme.prefix && r.unshift(e.theme.prefix);
            let n = "";
            if (
              ("static" === t.kind && (n += t.root),
              "functional" === t.kind && ((n += t.root), t.value))
            )
              if ("arbitrary" === t.value.kind) {
                if (null !== t.value) {
                  let e = re(t.value.value),
                    r = e ? t.value.value.slice(4, -1) : t.value.value,
                    [o, a] = e ? ["(", ")"] : ["[", "]"];
                  t.value.dataType
                    ? (n += `-${o}${t.value.dataType}:${X(r)}${a}`)
                    : (n += `-${o}${X(r)}${a}`);
                }
              } else "named" === t.value.kind && (n += `-${t.value.value}`);
            return (
              "arbitrary" === t.kind && (n += `[${t.property}:${X(t.value)}]`),
              ("arbitrary" === t.kind || "functional" === t.kind) &&
                (n += Y(t.modifier)),
              t.important && (n += "!"),
              r.push(n),
              r.join(":")
            );
          })(s, e),
        printVariant: (e) => G(e),
        getVariantOrder() {
          let e = Array.from(n.values());
          e.sort((e, t) => this.variants.compare(e, t));
          let t,
            r = new Map(),
            o = 0;
          for (let n of e)
            null !== n &&
              (void 0 !== t && 0 !== this.variants.compare(t, n) && o++,
              r.set(n, o),
              (t = n));
          return r;
        },
        resolveThemeValue(t, r = !0) {
          let n = t.lastIndexOf("/"),
            o = null;
          -1 !== n && ((o = t.slice(n + 1).trim()), (t = t.slice(0, n).trim()));
          let a = e.resolve(null, [t], r ? 1 : 0) ?? void 0;
          return o && a ? We(a, o) : a;
        },
        trackUsedVariables(e) {
          l.get(e);
        },
        canonicalizeCandidates: (e, t) => [],
        storage: {},
      };
    return s;
  }
  var nt = [
    "container-type",
    "pointer-events",
    "visibility",
    "position",
    "inset",
    "inset-inline",
    "inset-block",
    "inset-inline-start",
    "inset-inline-end",
    "top",
    "right",
    "bottom",
    "left",
    "isolation",
    "z-index",
    "order",
    "grid-column",
    "grid-column-start",
    "grid-column-end",
    "grid-row",
    "grid-row-start",
    "grid-row-end",
    "float",
    "clear",
    "--tw-container-component",
    "margin",
    "margin-inline",
    "margin-block",
    "margin-inline-start",
    "margin-inline-end",
    "margin-top",
    "margin-right",
    "margin-bottom",
    "margin-left",
    "box-sizing",
    "display",
    "field-sizing",
    "aspect-ratio",
    "height",
    "max-height",
    "min-height",
    "width",
    "max-width",
    "min-width",
    "flex",
    "flex-shrink",
    "flex-grow",
    "flex-basis",
    "table-layout",
    "caption-side",
    "border-collapse",
    "border-spacing",
    "transform-origin",
    "translate",
    "--tw-translate-x",
    "--tw-translate-y",
    "--tw-translate-z",
    "scale",
    "--tw-scale-x",
    "--tw-scale-y",
    "--tw-scale-z",
    "rotate",
    "--tw-rotate-x",
    "--tw-rotate-y",
    "--tw-rotate-z",
    "--tw-skew-x",
    "--tw-skew-y",
    "transform",
    "animation",
    "cursor",
    "touch-action",
    "--tw-pan-x",
    "--tw-pan-y",
    "--tw-pinch-zoom",
    "resize",
    "scroll-snap-type",
    "--tw-scroll-snap-strictness",
    "scroll-snap-align",
    "scroll-snap-stop",
    "scroll-margin",
    "scroll-margin-inline",
    "scroll-margin-block",
    "scroll-margin-inline-start",
    "scroll-margin-inline-end",
    "scroll-margin-top",
    "scroll-margin-right",
    "scroll-margin-bottom",
    "scroll-margin-left",
    "scroll-padding",
    "scroll-padding-inline",
    "scroll-padding-block",
    "scroll-padding-inline-start",
    "scroll-padding-inline-end",
    "scroll-padding-top",
    "scroll-padding-right",
    "scroll-padding-bottom",
    "scroll-padding-left",
    "list-style-position",
    "list-style-type",
    "list-style-image",
    "appearance",
    "columns",
    "break-before",
    "break-inside",
    "break-after",
    "grid-auto-columns",
    "grid-auto-flow",
    "grid-auto-rows",
    "grid-template-columns",
    "grid-template-rows",
    "flex-direction",
    "flex-wrap",
    "place-content",
    "place-items",
    "align-content",
    "align-items",
    "justify-content",
    "justify-items",
    "gap",
    "column-gap",
    "row-gap",
    "--tw-space-x-reverse",
    "--tw-space-y-reverse",
    "divide-x-width",
    "divide-y-width",
    "--tw-divide-y-reverse",
    "divide-style",
    "divide-color",
    "place-self",
    "align-self",
    "justify-self",
    "overflow",
    "overflow-x",
    "overflow-y",
    "overscroll-behavior",
    "overscroll-behavior-x",
    "overscroll-behavior-y",
    "scroll-behavior",
    "border-radius",
    "border-start-radius",
    "border-end-radius",
    "border-top-radius",
    "border-right-radius",
    "border-bottom-radius",
    "border-left-radius",
    "border-start-start-radius",
    "border-start-end-radius",
    "border-end-end-radius",
    "border-end-start-radius",
    "border-top-left-radius",
    "border-top-right-radius",
    "border-bottom-right-radius",
    "border-bottom-left-radius",
    "border-width",
    "border-inline-width",
    "border-block-width",
    "border-inline-start-width",
    "border-inline-end-width",
    "border-top-width",
    "border-right-width",
    "border-bottom-width",
    "border-left-width",
    "border-style",
    "border-inline-style",
    "border-block-style",
    "border-inline-start-style",
    "border-inline-end-style",
    "border-top-style",
    "border-right-style",
    "border-bottom-style",
    "border-left-style",
    "border-color",
    "border-inline-color",
    "border-block-color",
    "border-inline-start-color",
    "border-inline-end-color",
    "border-top-color",
    "border-right-color",
    "border-bottom-color",
    "border-left-color",
    "background-color",
    "background-image",
    "--tw-gradient-position",
    "--tw-gradient-stops",
    "--tw-gradient-via-stops",
    "--tw-gradient-from",
    "--tw-gradient-from-position",
    "--tw-gradient-via",
    "--tw-gradient-via-position",
    "--tw-gradient-to",
    "--tw-gradient-to-position",
    "mask-image",
    "--tw-mask-top",
    "--tw-mask-top-from-color",
    "--tw-mask-top-from-position",
    "--tw-mask-top-to-color",
    "--tw-mask-top-to-position",
    "--tw-mask-right",
    "--tw-mask-right-from-color",
    "--tw-mask-right-from-position",
    "--tw-mask-right-to-color",
    "--tw-mask-right-to-position",
    "--tw-mask-bottom",
    "--tw-mask-bottom-from-color",
    "--tw-mask-bottom-from-position",
    "--tw-mask-bottom-to-color",
    "--tw-mask-bottom-to-position",
    "--tw-mask-left",
    "--tw-mask-left-from-color",
    "--tw-mask-left-from-position",
    "--tw-mask-left-to-color",
    "--tw-mask-left-to-position",
    "--tw-mask-linear",
    "--tw-mask-linear-position",
    "--tw-mask-linear-from-color",
    "--tw-mask-linear-from-position",
    "--tw-mask-linear-to-color",
    "--tw-mask-linear-to-position",
    "--tw-mask-radial",
    "--tw-mask-radial-shape",
    "--tw-mask-radial-size",
    "--tw-mask-radial-position",
    "--tw-mask-radial-from-color",
    "--tw-mask-radial-from-position",
    "--tw-mask-radial-to-color",
    "--tw-mask-radial-to-position",
    "--tw-mask-conic",
    "--tw-mask-conic-position",
    "--tw-mask-conic-from-color",
    "--tw-mask-conic-from-position",
    "--tw-mask-conic-to-color",
    "--tw-mask-conic-to-position",
    "box-decoration-break",
    "background-size",
    "background-attachment",
    "background-clip",
    "background-position",
    "background-repeat",
    "background-origin",
    "mask-composite",
    "mask-mode",
    "mask-type",
    "mask-size",
    "mask-clip",
    "mask-position",
    "mask-repeat",
    "mask-origin",
    "fill",
    "stroke",
    "stroke-width",
    "object-fit",
    "object-position",
    "padding",
    "padding-inline",
    "padding-block",
    "padding-inline-start",
    "padding-inline-end",
    "padding-top",
    "padding-right",
    "padding-bottom",
    "padding-left",
    "text-align",
    "text-indent",
    "vertical-align",
    "font-family",
    "font-size",
    "line-height",
    "font-weight",
    "letter-spacing",
    "text-wrap",
    "overflow-wrap",
    "word-break",
    "text-overflow",
    "hyphens",
    "white-space",
    "color",
    "text-transform",
    "font-style",
    "font-stretch",
    "font-variant-numeric",
    "text-decoration-line",
    "text-decoration-color",
    "text-decoration-style",
    "text-decoration-thickness",
    "text-underline-offset",
    "-webkit-font-smoothing",
    "placeholder-color",
    "caret-color",
    "accent-color",
    "color-scheme",
    "opacity",
    "background-blend-mode",
    "mix-blend-mode",
    "box-shadow",
    "--tw-shadow",
    "--tw-shadow-color",
    "--tw-ring-shadow",
    "--tw-ring-color",
    "--tw-inset-shadow",
    "--tw-inset-shadow-color",
    "--tw-inset-ring-shadow",
    "--tw-inset-ring-color",
    "--tw-ring-offset-width",
    "--tw-ring-offset-color",
    "outline",
    "outline-width",
    "outline-offset",
    "outline-color",
    "--tw-blur",
    "--tw-brightness",
    "--tw-contrast",
    "--tw-drop-shadow",
    "--tw-grayscale",
    "--tw-hue-rotate",
    "--tw-invert",
    "--tw-saturate",
    "--tw-sepia",
    "filter",
    "--tw-backdrop-blur",
    "--tw-backdrop-brightness",
    "--tw-backdrop-contrast",
    "--tw-backdrop-grayscale",
    "--tw-backdrop-hue-rotate",
    "--tw-backdrop-invert",
    "--tw-backdrop-opacity",
    "--tw-backdrop-saturate",
    "--tw-backdrop-sepia",
    "backdrop-filter",
    "transition-property",
    "transition-behavior",
    "transition-delay",
    "transition-duration",
    "transition-timing-function",
    "will-change",
    "contain",
    "content",
    "forced-color-adjust",
  ];
  function ot(e, t, { onInvalidCandidate: r, respectImportant: n } = {}) {
    let o = new Map(),
      a = [],
      i = new Map();
    for (let n of e) {
      if (t.invalidCandidates.has(n)) {
        r?.(n);
        continue;
      }
      let e = t.parseCandidate(n);
      0 !== e.length ? i.set(n, e) : r?.(n);
    }
    let l = 0;
    (n ?? 1) && (l |= 1);
    let s = t.getVariantOrder();
    for (let [e, n] of i) {
      let i = !1;
      for (let r of n) {
        let n = t.compileAstNodes(r, l);
        if (0 !== n.length) {
          i = !0;
          for (let { node: t, propertySort: i } of n) {
            let n = 0n;
            for (let e of r.variants) n |= 1n << BigInt(s.get(e));
            (o.set(t, { properties: i, variants: n, candidate: e }), a.push(t));
          }
        }
      }
      i || r?.(e);
    }
    return (
      a.sort((e, t) => {
        let r = o.get(e),
          n = o.get(t);
        if (r.variants - n.variants !== 0n)
          return Number(r.variants - n.variants);
        let a = 0;
        for (
          ;
          a < r.properties.order.length &&
          a < n.properties.order.length &&
          r.properties.order[a] === n.properties.order[a];

        )
          a += 1;
        return (
          (r.properties.order[a] ?? 1 / 0) - (n.properties.order[a] ?? 1 / 0) ||
          n.properties.count - r.properties.count ||
          (function (e, t) {
            let r = e.length,
              n = t.length,
              o = r < n ? r : n;
            for (let r = 0; r < o; r++) {
              let n = e.charCodeAt(r),
                o = t.charCodeAt(r);
              if (n >= 48 && n <= 57 && o >= 48 && o <= 57) {
                let a = r,
                  i = r + 1,
                  l = r,
                  s = r + 1;
                for (n = e.charCodeAt(i); n >= 48 && n <= 57; )
                  n = e.charCodeAt(++i);
                for (o = t.charCodeAt(s); o >= 48 && o <= 57; )
                  o = t.charCodeAt(++s);
                let c = e.slice(a, i),
                  u = t.slice(l, s),
                  d = Number(c) - Number(u);
                if (d) return d;
                if (c < u) return -1;
                if (c > u) return 1;
              } else if (n !== o) return n - o;
            }
            return e.length - t.length;
          })(r.candidate, n.candidate)
        );
      }),
      { astNodes: a, nodeSorting: o }
    );
  }
  function at(e, t, r, n = 0) {
    if ("arbitrary" === t.kind)
      return t.relative && 0 === n
        ? null
        : void (e.nodes = [z(t.selector, e.nodes)]);
    let { applyFn: o } = r.get(t.root);
    if ("compound" === t.kind) {
      let a = A("@slot");
      if (
        null === at(a, t.variant, r, n + 1) ||
        ("not" === t.root && a.nodes.length > 1)
      )
        return null;
      for (let e of a.nodes)
        if (("rule" !== e.kind && "at-rule" !== e.kind) || null === o(e, t))
          return null;
      return (
        k(a.nodes, (t) => {
          if (
            ("rule" === t.kind || "at-rule" === t.kind) &&
            t.nodes.length <= 0
          )
            return ((t.nodes = e.nodes), w.Skip);
        }),
        void (e.nodes = a.nodes)
      );
    }
    return null === o(e, t) ? null : void 0;
  }
  function it(e) {
    let t = e.options?.types ?? [];
    return t.length > 1 && t.includes("any");
  }
  function lt(e) {
    for (let t of e)
      "at-root" !== t.kind &&
        ("declaration" === t.kind
          ? (t.important = !0)
          : ("rule" === t.kind || "at-rule" === t.kind) && lt(t.nodes));
  }
  function st(e) {
    let t = new Set(),
      r = 0,
      n = e.slice(),
      o = !1;
    for (; n.length > 0; ) {
      let e = n.shift();
      if ("declaration" === e.kind) {
        if (void 0 === e.value || (r++, o)) continue;
        if ("--tw-sort" === e.property) {
          let r = nt.indexOf(e.value ?? "");
          if (-1 !== r) {
            (t.add(r), (o = !0));
            continue;
          }
        }
        let n = nt.indexOf(e.property);
        -1 !== n && t.add(n);
      } else if ("rule" === e.kind || "at-rule" === e.kind)
        for (let t of e.nodes) n.push(t);
    }
    return { order: Array.from(t).sort((e, t) => e - t), count: r };
  }
  function ct(e, t) {
    let r = 0,
      n = z("&", e),
      o = new Set(),
      a = new u(() => new Set()),
      i = new u(() => new Set());
    k([n], (e, n) => {
      if ("at-rule" === e.kind) {
        if ("@keyframes" === e.name)
          return (
            k(e.nodes, (e) => {
              if ("at-rule" === e.kind && "@apply" === e.name)
                throw new Error("You cannot use `@apply` inside `@keyframes`.");
            }),
            w.Skip
          );
        if ("@utility" === e.name) {
          let r = e.params.replace(/-\*$/, "");
          return (
            i.get(r).add(e),
            void k(e.nodes, (r) => {
              if ("at-rule" === r.kind && "@apply" === r.name) {
                o.add(e);
                for (let n of ut(r, t)) a.get(e).add(n);
              }
            })
          );
        }
        if ("@apply" === e.name) {
          if (null === n.parent) return;
          ((r |= 1), o.add(n.parent));
          for (let r of ut(e, t))
            for (let e of n.path()) o.has(e) && a.get(e).add(r);
        }
      }
    });
    let l = new Set(),
      s = [],
      c = new Set();
    function d(e, r = []) {
      if (!l.has(e)) {
        if (c.has(e)) {
          let n = r[(r.indexOf(e) + 1) % r.length];
          throw (
            "at-rule" === e.kind &&
              "@utility" === e.name &&
              "at-rule" === n.kind &&
              "@utility" === n.name &&
              k(e.nodes, (e) => {
                if ("at-rule" !== e.kind || "@apply" !== e.name) return;
                let r = e.params.split(/\s+/g);
                for (let e of r)
                  for (let r of t.parseCandidate(e))
                    switch (r.kind) {
                      case "arbitrary":
                        break;
                      case "static":
                      case "functional":
                        if (n.params.replace(/-\*$/, "") === r.root)
                          throw new Error(
                            `You cannot \`@apply\` the \`${e}\` utility here because it creates a circular dependency.`,
                          );
                    }
              }),
            new Error(
              `Circular dependency detected:\n\n${N([e])}\nRelies on:\n\n${N([n])}`,
            )
          );
        }
        c.add(e);
        for (let t of a.get(e))
          for (let n of i.get(t)) (r.push(e), d(n, r), r.pop());
        (l.add(e), c.delete(e), s.push(e));
      }
    }
    for (let e of o) d(e);
    for (let e of s)
      "nodes" in e &&
        k(e.nodes, (e) => {
          if ("at-rule" !== e.kind || "@apply" !== e.name) return;
          let r = e.params.split(/(\s+)/g),
            n = {},
            o = 0;
          for (let [e, t] of r.entries())
            (e % 2 == 0 && (n[t] = o), (o += t.length));
          {
            let r = ot(Object.keys(n), t, {
                respectImportant: !1,
                onInvalidCandidate: (e) => {
                  if (t.theme.prefix && !e.startsWith(t.theme.prefix))
                    throw new Error(
                      `Cannot apply unprefixed utility class \`${e}\`. Did you mean \`${t.theme.prefix}:${e}\`?`,
                    );
                  if (t.invalidCandidates.has(e))
                    throw new Error(
                      `Cannot apply utility class \`${e}\` because it has been explicitly disabled: https://tailwindcss.com/docs/detecting-classes-in-source-files#explicitly-excluding-classes`,
                    );
                  let r = q(e, ":");
                  if (r.length > 1) {
                    let n = r.pop();
                    if (t.candidatesToCss([n])[0]) {
                      let n = t.candidatesToCss(
                          r.map((e) => `${e}:[--tw-variant-check:1]`),
                        ),
                        o = r.filter((e, t) => null === n[t]);
                      if (o.length > 0) {
                        if (1 === o.length)
                          throw new Error(
                            `Cannot apply utility class \`${e}\` because the ${o.map((e) => `\`${e}\``)} variant does not exist.`,
                          );
                        {
                          let t = new Intl.ListFormat("en", {
                            style: "long",
                            type: "conjunction",
                          });
                          throw new Error(
                            `Cannot apply utility class \`${e}\` because the ${t.format(o.map((e) => `\`${e}\``))} variants do not exist.`,
                          );
                        }
                      }
                    }
                  }
                  throw 0 === t.theme.size
                    ? new Error(
                        `Cannot apply unknown utility class \`${e}\`. Are you using CSS modules or similar and missing \`@reference\`? https://tailwindcss.com/docs/functions-and-directives#reference-directive`,
                      )
                    : new Error(`Cannot apply unknown utility class \`${e}\``);
                },
              }),
              o = e.src,
              a = r.astNodes.map((e) => {
                let t = r.nodeSorting.get(e)?.candidate,
                  a = t ? n[t] : void 0;
                if (((e = V(e)), !o || !t || void 0 === a))
                  return (
                    k([e], (e) => {
                      e.src = o;
                    }),
                    e
                  );
                let i = [o[0], o[1], o[2]];
                return (
                  (i[1] += 7 + a),
                  (i[2] = i[1] + t.length),
                  k([e], (e) => {
                    e.src = i;
                  }),
                  e
                );
              }),
              i = [];
            for (let e of a)
              if ("rule" === e.kind) for (let t of e.nodes) i.push(t);
              else i.push(e);
            return w.Replace(i);
          }
        });
    return r;
  }
  function* ut(e, t) {
    for (let r of e.params.split(/\s+/g))
      for (let e of t.parseCandidate(r))
        switch (e.kind) {
          case "arbitrary":
            break;
          case "static":
          case "functional":
            yield e.root;
        }
  }
  async function dt(e, r, n, o = 0, a = !1) {
    let i = 0,
      l = [];
    return (
      k(e, (e) => {
        if (
          "at-rule" === e.kind &&
          ("@import" === e.name || "@reference" === e.name)
        ) {
          let s = (function (e) {
            let t,
              r = null,
              n = null,
              o = null;
            for (let a = 0; a < e.length; a++) {
              let i = e[a];
              if ("separator" !== i.kind) {
                if ("word" === i.kind && !t) {
                  if (!i.value || ('"' !== i.value[0] && "'" !== i.value[0]))
                    return null;
                  t = i.value.slice(1, -1);
                  continue;
                }
                if (
                  ("function" === i.kind && "url" === i.value.toLowerCase()) ||
                  !t
                )
                  return null;
                if (
                  ("word" === i.kind || "function" === i.kind) &&
                  "layer" === i.value.toLowerCase()
                ) {
                  if (r) return null;
                  if (o)
                    throw new Error(
                      "`layer(…)` in an `@import` should come before any other functions or conditions",
                    );
                  r = "nodes" in i ? h(i.nodes) : "";
                  continue;
                }
                if (
                  "function" === i.kind &&
                  "supports" === i.value.toLowerCase()
                ) {
                  if (o) return null;
                  o = h(i.nodes);
                  continue;
                }
                n = h(e.slice(a));
                break;
              }
            }
            return t ? { uri: t, layer: r, media: n, supports: o } : null;
          })(m(e.params));
          if (null === s) return;
          ("@reference" === e.name && (s.media = "reference"), (i |= 2));
          let { uri: c, layer: u, media: d, supports: f } = s;
          if (
            c.startsWith("data:") ||
            c.startsWith("http://") ||
            c.startsWith("https://")
          )
            return;
          let p = j({}, []);
          return (
            l.push(
              (async () => {
                if (o > 100)
                  throw new Error(
                    `Exceeded maximum recursion depth while resolving \`${c}\` in \`${r}\`)`,
                  );
                let i = await n(c, r),
                  l = t(i.content, { from: a ? i.path : void 0 });
                (await dt(l, i.base, n, o + 1, a),
                  (p.nodes = (function (e, t, r, n, o) {
                    let a = t;
                    if (null !== r) {
                      let t = A("@layer", r, a);
                      ((t.src = e.src), (a = [t]));
                    }
                    if (null !== n) {
                      let t = A("@media", n, a);
                      ((t.src = e.src), (a = [t]));
                    }
                    if (null !== o) {
                      let t = A("@supports", "(" === o[0] ? o : `(${o})`, a);
                      ((t.src = e.src), (a = [t]));
                    }
                    return a;
                  })(e, [j({ base: i.base }, l)], u, d, f)));
              })(),
            ),
            w.ReplaceSkip(p)
          );
        }
      }),
      l.length > 0 && (await Promise.all(l)),
      i
    );
  }
  function ft(e, t = null) {
    return Array.isArray(e) &&
      2 === e.length &&
      "object" == typeof e[1] &&
      null !== typeof e[1]
      ? t
        ? (e[1][t] ?? null)
        : e[0]
      : Array.isArray(e) && null === t
        ? e.join(", ")
        : "string" == typeof e && null === t
          ? e
          : null;
  }
  function pt(e, { theme: t }, r) {
    for (let t of r) {
      let r = mt([t]);
      r && e.theme.clearNamespace(`--${r}`, 4);
    }
    for (let [r, n] of (function (e) {
      let t = [];
      return (
        gt(e, [], (e, r) => {
          if (
            (function (e) {
              return "number" == typeof e || "string" == typeof e;
            })(e)
          )
            return (t.push([r, e]), 1);
          if (
            (function (e) {
              if (
                !Array.isArray(e) ||
                2 !== e.length ||
                ("string" != typeof e[0] && "number" != typeof e[0]) ||
                void 0 === e[1] ||
                null === e[1] ||
                "object" != typeof e[1]
              )
                return !1;
              for (let t of Reflect.ownKeys(e[1]))
                if (
                  "string" != typeof t ||
                  ("string" != typeof e[1][t] && "number" != typeof e[1][t])
                )
                  return !1;
              return !0;
            })(e)
          ) {
            t.push([r, e[0]]);
            for (let n of Reflect.ownKeys(e[1]))
              t.push([[...r, `-${n}`], e[1][n]]);
            return 1;
          }
          return Array.isArray(e) && e.every((e) => "string" == typeof e)
            ? ("fontSize" === r[0]
                ? (t.push([r, e[0]]),
                  e.length >= 2 && t.push([[...r, "-line-height"], e[1]]))
                : t.push([r, e.join(", ")]),
              1)
            : void 0;
        }),
        t
      );
    })(t)) {
      if ("string" != typeof n && "number" != typeof n) continue;
      if (
        ("string" == typeof n && (n = n.replace(/<alpha-value>/g, "1")),
        "opacity" === r[0] && ("number" == typeof n || "string" == typeof n))
      ) {
        let e = "string" == typeof n ? parseFloat(n) : n;
        e >= 0 && e <= 1 && (n = 100 * e + "%");
      }
      let t = mt(r);
      t && e.theme.add(`--${t}`, "" + n, 7);
    }
    if (Object.hasOwn(t, "fontFamily")) {
      let r = 5;
      {
        let n = ft(t.fontFamily.sans);
        n &&
          e.theme.hasDefault("--font-sans") &&
          (e.theme.add("--default-font-family", n, r),
          e.theme.add(
            "--default-font-feature-settings",
            ft(t.fontFamily.sans, "fontFeatureSettings") ?? "normal",
            r,
          ),
          e.theme.add(
            "--default-font-variation-settings",
            ft(t.fontFamily.sans, "fontVariationSettings") ?? "normal",
            r,
          ));
      }
      {
        let n = ft(t.fontFamily.mono);
        n &&
          e.theme.hasDefault("--font-mono") &&
          (e.theme.add("--default-mono-font-family", n, r),
          e.theme.add(
            "--default-mono-font-feature-settings",
            ft(t.fontFamily.mono, "fontFeatureSettings") ?? "normal",
            r,
          ),
          e.theme.add(
            "--default-mono-font-variation-settings",
            ft(t.fontFamily.mono, "fontVariationSettings") ?? "normal",
            r,
          ));
      }
    }
    return t;
  }
  var ht = /^[a-zA-Z0-9-_%/\.]+$/;
  function mt(e) {
    if ("container" === e[0]) return null;
    ("animation" === (e = e.slice())[0] && (e[0] = "animate"),
      "aspectRatio" === e[0] && (e[0] = "aspect"),
      "borderRadius" === e[0] && (e[0] = "radius"),
      "boxShadow" === e[0] && (e[0] = "shadow"),
      "colors" === e[0] && (e[0] = "color"),
      "containers" === e[0] && (e[0] = "container"),
      "fontFamily" === e[0] && (e[0] = "font"),
      "fontSize" === e[0] && (e[0] = "text"),
      "letterSpacing" === e[0] && (e[0] = "tracking"),
      "lineHeight" === e[0] && (e[0] = "leading"),
      "maxWidth" === e[0] && (e[0] = "container"),
      "screens" === e[0] && (e[0] = "breakpoint"),
      "transitionTimingFunction" === e[0] && (e[0] = "ease"));
    for (let t of e) if (!ht.test(t)) return null;
    return e
      .map((e, t, r) => ("1" === e && t !== r.length - 1 ? "" : e))
      .map((e) =>
        e
          .replaceAll(".", "_")
          .replace(/([a-z])([A-Z])/g, (e, t, r) => `${t}-${r.toLowerCase()}`),
      )
      .filter((t, r) => "DEFAULT" !== t || r !== e.length - 1)
      .join("-");
  }
  function gt(e, t = [], r) {
    for (let n of Reflect.ownKeys(e)) {
      let o = e[n];
      if (null == o) continue;
      let a = [...t, n],
        i = r(o, a) ?? 0;
      if (1 !== i) {
        if (2 === i) return 2;
        if ((Array.isArray(o) || "object" == typeof o) && 2 === gt(o, a, r))
          return 2;
      }
    }
  }
  function vt(e) {
    return { kind: "combinator", value: e };
  }
  function wt(e, t) {
    return { kind: "function", value: e, nodes: t };
  }
  function kt(e) {
    return { kind: "selector", value: e };
  }
  function bt(e) {
    return { kind: "separator", value: e };
  }
  function yt(e) {
    return { kind: "value", value: e };
  }
  function xt(e) {
    let t = "";
    for (let r of e)
      switch (r.kind) {
        case "combinator":
        case "selector":
        case "separator":
        case "value":
          t += r.value;
          break;
        case "function":
          t += r.value + "(" + xt(r.nodes) + ")";
      }
    return t;
  }
  function $t(e) {
    e = e.replaceAll("\r\n", "\n");
    let t,
      r = [],
      n = [],
      o = null,
      a = "";
    for (let i = 0; i < e.length; i++) {
      let l = e.charCodeAt(i);
      switch (l) {
        case 44:
        case 62:
        case 10:
        case 32:
        case 43:
        case 9:
        case 126: {
          if (a.length > 0) {
            let e = kt(a);
            (o ? o.nodes.push(e) : r.push(e), (a = ""));
          }
          let n = i,
            l = i + 1;
          for (
            ;
            l < e.length &&
            ((t = e.charCodeAt(l)),
            44 === t ||
              62 === t ||
              10 === t ||
              32 === t ||
              43 === t ||
              9 === t ||
              126 === t);
            l++
          );
          i = l - 1;
          let s = e.slice(n, l),
            c = "," === s.trim() ? bt(s) : vt(s);
          o ? o.nodes.push(c) : r.push(c);
          break;
        }
        case 40: {
          let l = wt(a, []);
          if (
            ((a = ""),
            ":not" !== l.value &&
              ":where" !== l.value &&
              ":has" !== l.value &&
              ":is" !== l.value)
          ) {
            let n = i + 1,
              s = 0;
            for (let r = i + 1; r < e.length; r++)
              if (((t = e.charCodeAt(r)), 40 !== t)) {
                if (41 === t) {
                  if (0 === s) {
                    i = r;
                    break;
                  }
                  s--;
                }
              } else s++;
            let c = i;
            (l.nodes.push(yt(e.slice(n, c))),
              (a = ""),
              (i = c),
              o ? o.nodes.push(l) : r.push(l));
            break;
          }
          (o ? o.nodes.push(l) : r.push(l), n.push(l), (o = l));
          break;
        }
        case 41: {
          let e = n.pop();
          if (a.length > 0) {
            let t = kt(a);
            (e.nodes.push(t), (a = ""));
          }
          o = n.length > 0 ? n[n.length - 1] : null;
          break;
        }
        case 46:
        case 58:
        case 35:
          if (a.length > 0) {
            let e = kt(a);
            o ? o.nodes.push(e) : r.push(e);
          }
          a = e[i];
          break;
        case 91: {
          if (a.length > 0) {
            let e = kt(a);
            o ? o.nodes.push(e) : r.push(e);
          }
          a = "";
          let n = i,
            l = 0;
          for (let r = i + 1; r < e.length; r++)
            if (((t = e.charCodeAt(r)), 91 !== t)) {
              if (93 === t) {
                if (0 === l) {
                  i = r;
                  break;
                }
                l--;
              }
            } else l++;
          a += e.slice(n, i + 1);
          break;
        }
        case 39:
        case 34: {
          let r = i;
          for (let r = i + 1; r < e.length; r++)
            if (((t = e.charCodeAt(r)), 92 === t)) r += 1;
            else if (t === l) {
              i = r;
              break;
            }
          a += e.slice(r, i + 1);
          break;
        }
        case 38:
        case 42:
          if (a.length > 0) {
            let e = kt(a);
            (o ? o.nodes.push(e) : r.push(e), (a = ""));
          }
          o ? o.nodes.push(kt(e[i])) : r.push(kt(e[i]));
          break;
        case 92:
          ((a += e[i] + e[i + 1]), (i += 1));
          break;
        default:
          a += e[i];
      }
    }
    return (a.length > 0 && r.push(kt(a)), r);
  }
  function At(e) {
    let t = [];
    for (let r of q(e, ".")) {
      if (!r.includes("[")) {
        t.push(r);
        continue;
      }
      let e = 0;
      for (;;) {
        let n = r.indexOf("[", e),
          o = r.indexOf("]", n);
        if (-1 === n || -1 === o) break;
        (n > e && t.push(r.slice(e, n)),
          t.push(r.slice(n + 1, o)),
          (e = o + 1));
      }
      e <= r.length - 1 && t.push(r.slice(e));
    }
    return t;
  }
  function zt(e) {
    if ("[object Object]" !== Object.prototype.toString.call(e)) return !1;
    let t = Object.getPrototypeOf(e);
    return null === t || null === Object.getPrototypeOf(t);
  }
  function St(e, t, r, n = []) {
    for (let o of t)
      if (null != o)
        for (let t of Reflect.ownKeys(o)) {
          n.push(t);
          let a = r(e[t], o[t], n);
          (void 0 !== a
            ? (e[t] = a)
            : zt(e[t]) && zt(o[t])
              ? (e[t] = St({}, [e[t], o[t]], r, n))
              : (e[t] = o[t]),
            n.pop());
        }
    return e;
  }
  function Ct(e, t, r) {
    return function (n, o) {
      let a = n.lastIndexOf("/"),
        l = null;
      -1 !== a && ((l = n.slice(a + 1).trim()), (n = n.slice(0, a).trim()));
      let s = (() => {
        let o = At(n),
          [a, l] = (function (e, t) {
            if (1 === t.length && t[0].startsWith("--"))
              return [e.get([t[0]]), e.getOptions(t[0])];
            let r = mt(t),
              n = new Map(),
              o = new u(() => new Map()),
              a = e.namespace(`--${r}`);
            if (0 === a.size) return [null, 0];
            let i = new Map();
            for (let [t, l] of a) {
              if (!t || !t.includes("--")) {
                (n.set(t, l),
                  i.set(t, e.getOptions(t ? `--${r}-${t}` : `--${r}`)));
                continue;
              }
              let a = t.indexOf("--"),
                s = t.slice(0, a),
                c = t.slice(a + 2);
              ((c = c.replace(/-([a-z])/g, (e, t) => t.toUpperCase())),
                o
                  .get("" === s ? null : s)
                  .set(c, [l, e.getOptions(`--${r}${t}`)]));
            }
            let l = e.getOptions(`--${r}`);
            for (let [e, t] of o) {
              let r = n.get(e);
              if ("string" != typeof r) continue;
              let o = {},
                a = {};
              for (let [e, [r, n]] of t) ((o[e] = r), (a[e] = n));
              (n.set(e, [r, o]), i.set(e, [l, a]));
            }
            let s = {},
              c = {};
            for (let [e, t] of n) Tt(s, [e ?? "DEFAULT"], t);
            for (let [e, t] of i) Tt(c, [e ?? "DEFAULT"], t);
            return "DEFAULT" === t[t.length - 1]
              ? [s?.DEFAULT ?? null, c.DEFAULT ?? 0]
              : "DEFAULT" in s && 1 === Object.keys(s).length
                ? [s.DEFAULT, c.DEFAULT ?? 0]
                : ((s.__CSS_VALUES__ = c), [s, c]);
          })(e.theme, o),
          s = r(jt(t() ?? {}, o) ?? null);
        if (
          ("string" == typeof s && (s = s.replace("<alpha-value>", "1")),
          "object" != typeof a)
        )
          return "object" != typeof l && 4 & l ? (s ?? a) : a;
        if (null !== s && "object" == typeof s && !Array.isArray(s)) {
          let e = St({}, [s], (e, t) => t);
          if (null === a && Object.hasOwn(s, "__CSS_VALUES__")) {
            let t = {};
            for (let r in s.__CSS_VALUES__) ((t[r] = s[r]), delete e[r]);
            a = t;
          }
          for (let t in a)
            "__CSS_VALUES__" !== t &&
              ((4 & s?.__CSS_VALUES__?.[t] && void 0 !== jt(e, t.split("-"))) ||
                (e[i(t)] = a[t]));
          return e;
        }
        if (Array.isArray(a) && Array.isArray(l) && Array.isArray(s)) {
          let e = a[0],
            t = a[1];
          4 & l[0] && (e = s[0] ?? e);
          for (let e of Object.keys(t)) 4 & l[1][e] && (t[e] = s[1][e] ?? t[e]);
          return [e, t];
        }
        return a ?? s;
      })();
      return (l && "string" == typeof s && (s = We(s, l)), s ?? o);
    };
  }
  function jt(e, t) {
    for (let r = 0; r < t.length; ++r) {
      let n = t[r];
      if (void 0 !== e?.[n]) {
        if ("string" == typeof e) return;
        e = e[n];
      } else {
        if (void 0 === t[r + 1]) return;
        t[r + 1] = `${n}-${t[r + 1]}`;
      }
    }
    return e;
  }
  function Tt(e, t, r) {
    for (let r of t.slice(0, -1)) (void 0 === e[r] && (e[r] = {}), (e = e[r]));
    e[t[t.length - 1]] = r;
  }
  var Vt = /^[a-z@][a-zA-Z0-9/%._-]*$/;
  function Kt({
    designSystem: e,
    ast: t,
    resolvedConfig: r,
    featuresRef: n,
    referenceMode: o,
    src: a,
  }) {
    let i = {
      addBase(r) {
        if (o) return;
        let i = Et(r);
        n.current |= Ze(i, e);
        let l = A("@layer", "base", i);
        (k([l], (e) => {
          e.src = a;
        }),
          t.push(l));
      },
      addVariant(t, r) {
        if (!Ge.test(t))
          throw new Error(
            `\`addVariant('${t}')\` defines an invalid variant name. Variants should only contain alphanumeric, dashes, or underscore characters and start with a lowercase letter or number.`,
          );
        if ("string" == typeof r) {
          if (r.includes(":merge(")) return;
        } else if (Array.isArray(r)) {
          if (r.some((e) => e.includes(":merge("))) return;
        } else if ("object" == typeof r) {
          let e = function (t, r) {
            return Object.entries(t).some(
              ([t, n]) => t.includes(r) || ("object" == typeof n && e(n, r)),
            );
          };
          if (e(r, ":merge(")) return;
        }
        "string" == typeof r || Array.isArray(r)
          ? e.variants.static(
              t,
              (e) => {
                e.nodes = Nt(r, e.nodes);
              },
              { compounds: Xe("string" == typeof r ? [r] : r) },
            )
          : "object" == typeof r && e.variants.fromAst(t, Et(r), e);
      },
      matchVariant(t, r, n) {
        function o(e, t, n) {
          return Nt(r(e, { modifier: t?.value ?? null }), n);
        }
        try {
          let e = r("a", { modifier: null });
          if ("string" == typeof e && e.includes(":merge(")) return;
          if (Array.isArray(e) && e.some((e) => e.includes(":merge("))) return;
        } catch {}
        let a = Object.keys(n?.values ?? {});
        (e.variants.group(
          () => {
            e.variants.functional(t, (e, t) => {
              if (!t.value)
                return n?.values && "DEFAULT" in n.values
                  ? void (e.nodes = o(n.values.DEFAULT, t.modifier, e.nodes))
                  : null;
              if ("arbitrary" === t.value.kind)
                e.nodes = o(t.value.value, t.modifier, e.nodes);
              else {
                if ("named" !== t.value.kind || !n?.values) return null;
                {
                  let r = n.values[t.value.value];
                  if ("string" != typeof r) return null;
                  e.nodes = o(r, t.modifier, e.nodes);
                }
              }
            });
          },
          (e, t) => {
            if ("functional" !== e.kind || "functional" !== t.kind) return 0;
            let r = e.value ? e.value.value : "DEFAULT",
              o = t.value ? t.value.value : "DEFAULT",
              i = n?.values?.[r] ?? r,
              l = n?.values?.[o] ?? o;
            if (n && "function" == typeof n.sort)
              return n.sort(
                { value: i, modifier: e.modifier?.value ?? null },
                { value: l, modifier: t.modifier?.value ?? null },
              );
            let s = a.indexOf(r),
              c = a.indexOf(o);
            return (
              (s = -1 === s ? a.length : s),
              (c = -1 === c ? a.length : c),
              s !== c ? s - c : i < l ? -1 : 1
            );
          },
        ),
          e.variants.suggest(t, () =>
            Object.keys(n?.values ?? {}).filter((e) => "DEFAULT" !== e),
          ));
      },
      addUtilities(r) {
        let i = (r = Array.isArray(r) ? r : [r]).flatMap((e) =>
          Object.entries(e),
        );
        i = i.flatMap(([e, t]) => q(e, ",").map((e) => [e.trim(), t]));
        let l = new u(() => []);
        for (let [e, r] of i) {
          if (e.startsWith("@keyframes ")) {
            if (!o) {
              let n = z(e, Et(r));
              (k([n], (e) => {
                e.src = a;
              }),
                t.push(n));
            }
            continue;
          }
          let n = $t(e),
            i = !1;
          if (
            (k(n, (e) => {
              if (
                "selector" === e.kind &&
                "." === e.value[0] &&
                Vt.test(e.value.slice(1))
              ) {
                let t = e.value;
                e.value = "&";
                let o = xt(n),
                  a = t.slice(1),
                  s = "&" === o ? Et(r) : [z(o, Et(r))];
                return (l.get(a).push(...s), (i = !0), void (e.value = t));
              }
              if ("function" === e.kind && ":not" === e.value) return w.Skip;
            }),
            !i)
          )
            throw new Error(
              `\`addUtilities({ '${e}' : … })\` defines an invalid utility selector. Utilities must be a single class name and start with a lowercase letter, eg. \`.scrollbar-none\`.`,
            );
        }
        for (let [t, r] of l)
          (e.theme.prefix &&
            k(r, (t) => {
              if ("rule" === t.kind) {
                let r = $t(t.selector);
                (k(r, (t) => {
                  "selector" === t.kind &&
                    "." === t.value[0] &&
                    (t.value = `.${e.theme.prefix}\\:${t.value.slice(1)}`);
                }),
                  (t.selector = xt(r)));
              }
            }),
            e.utilities.static(t, (o) => {
              let a = r.map(V);
              return (Ot(a, t, o.raw), (n.current |= ct(a, e)), a);
            }));
      },
      matchUtilities(t, r) {
        let o = r?.type
          ? Array.isArray(r?.type)
            ? r.type
            : [r.type]
          : ["any"];
        for (let [a, i] of Object.entries(t)) {
          let t = function ({ negative: t }) {
            return (l) => {
              if (
                "arbitrary" === l.value?.kind &&
                o.length > 0 &&
                !o.includes("any") &&
                ((l.value.dataType && !o.includes(l.value.dataType)) ||
                  (!l.value.dataType && !ce(l.value.value, o)))
              )
                return;
              let s,
                c = o.includes("color"),
                u = null,
                d = !1;
              {
                let e = r?.values ?? {};
                (c &&
                  (e = Object.assign(
                    {
                      inherit: "inherit",
                      transparent: "transparent",
                      current: "currentcolor",
                    },
                    e,
                  )),
                  l.value
                    ? "arbitrary" === l.value.kind
                      ? (u = l.value.value)
                      : l.value.fraction && e[l.value.fraction]
                        ? ((u = e[l.value.fraction]), (d = !0))
                        : e[l.value.value]
                          ? (u = e[l.value.value])
                          : e.__BARE_VALUE__ &&
                            ((u = e.__BARE_VALUE__(l.value) ?? null),
                            (d =
                              (null !== l.value.fraction && u?.includes("/")) ??
                              !1))
                    : (u = e.DEFAULT ?? null));
              }
              if (null === u) return;
              {
                let e = r?.modifiers ?? null;
                s = l.modifier
                  ? "any" === e || "arbitrary" === l.modifier.kind
                    ? l.modifier.value
                    : e?.[l.modifier.value]
                      ? e[l.modifier.value]
                      : c && !Number.isNaN(Number(l.modifier.value))
                        ? `${l.modifier.value}%`
                        : null
                  : null;
              }
              if (l.modifier && null === s && !d)
                return "arbitrary" === l.value?.kind ? null : void 0;
              (c && null !== s && (u = We(u, s)), t && (u = `calc(${u} * -1)`));
              let f = Et(i(u, { modifier: s }));
              return (Ot(f, a, l.raw), (n.current |= ct(f, e)), f);
            };
          };
          if (!Vt.test(a))
            throw new Error(
              `\`matchUtilities({ '${a}' : … })\` defines an invalid utility name. Utilities should be alphanumeric and start with a lowercase letter, eg. \`scrollbar\`.`,
            );
          (r?.supportsNegativeValues &&
            e.utilities.functional(`-${a}`, t({ negative: !0 }), { types: o }),
            e.utilities.functional(a, t({ negative: !1 }), { types: o }),
            e.utilities.suggest(a, () => {
              let e = r?.values ?? {},
                t = new Set(Object.keys(e));
              (t.delete("__BARE_VALUE__"),
                t.delete("__CSS_VALUES__"),
                t.has("DEFAULT") && (t.delete("DEFAULT"), t.add(null)));
              let n = r?.modifiers ?? {},
                o = "any" === n ? [] : Object.keys(n);
              return [
                {
                  supportsNegative: r?.supportsNegativeValues ?? !1,
                  values: Array.from(t),
                  modifiers: o,
                },
              ];
            }));
        }
      },
      addComponents(e, t) {
        this.addUtilities(e, t);
      },
      matchComponents(e, t) {
        this.matchUtilities(e, t);
      },
      theme: Ct(
        e,
        () => r.theme ?? {},
        (e) => e,
      ),
      prefix: (e) => e,
      config(e, t) {
        let n = r;
        if (!e) return n;
        let o = At(e);
        for (let e = 0; e < o.length; ++e) {
          let r = o[e];
          if (void 0 === n[r]) return t;
          n = n[r];
        }
        return n ?? t;
      },
    };
    return (
      (i.addComponents = i.addComponents.bind(i)),
      (i.matchComponents = i.matchComponents.bind(i)),
      i
    );
  }
  function Et(e) {
    let t = [],
      r = (e = Array.isArray(e) ? e : [e]).flatMap((e) => Object.entries(e));
    for (let [e, n] of r)
      if (null != n && !1 !== n)
        if ("object" != typeof n) {
          if (!e.startsWith("--")) {
            if ("@slot" === n) {
              t.push(z(e, [A("@slot")]));
              continue;
            }
            e = e.replace(/([A-Z])/g, "-$1").toLowerCase();
          }
          t.push(S(e, String(n)));
        } else if (Array.isArray(n))
          for (let r of n)
            "string" == typeof r ? t.push(S(e, r)) : t.push(z(e, Et(r)));
        else t.push(z(e, Et(n)));
    return t;
  }
  function Nt(e, r) {
    return ("string" == typeof e ? [e] : e).flatMap((e) => {
      if (e.trim().endsWith("}")) {
        let n = t(e.replace("}", "{@slot}}"));
        return (et(n, r), n);
      }
      return z(e, r);
    });
  }
  function Ot(e, t, r) {
    k(e, (e) => {
      if ("rule" === e.kind) {
        let n = $t(e.selector);
        (k(n, (e) => {
          "selector" === e.kind &&
            e.value === `.${t}` &&
            (e.value = `.${a(r)}`);
        }),
          (e.selector = xt(n)));
      }
    });
  }
  function Ft(e, t) {
    for (let r of (function (e) {
      let t = [];
      if ("keyframes" in e.theme)
        for (let [r, n] of Object.entries(e.theme.keyframes))
          t.push(A("@keyframes", r, Et(n)));
      return t;
    })(t))
      e.theme.addKeyframes(r);
  }
  var Ut = {
    inherit: "inherit",
    current: "currentcolor",
    transparent: "transparent",
    black: "#000",
    white: "#fff",
    slate: {
      50: "oklch(98.4% 0.003 247.858)",
      100: "oklch(96.8% 0.007 247.896)",
      200: "oklch(92.9% 0.013 255.508)",
      300: "oklch(86.9% 0.022 252.894)",
      400: "oklch(70.4% 0.04 256.788)",
      500: "oklch(55.4% 0.046 257.417)",
      600: "oklch(44.6% 0.043 257.281)",
      700: "oklch(37.2% 0.044 257.287)",
      800: "oklch(27.9% 0.041 260.031)",
      900: "oklch(20.8% 0.042 265.755)",
      950: "oklch(12.9% 0.042 264.695)",
    },
    gray: {
      50: "oklch(98.5% 0.002 247.839)",
      100: "oklch(96.7% 0.003 264.542)",
      200: "oklch(92.8% 0.006 264.531)",
      300: "oklch(87.2% 0.01 258.338)",
      400: "oklch(70.7% 0.022 261.325)",
      500: "oklch(55.1% 0.027 264.364)",
      600: "oklch(44.6% 0.03 256.802)",
      700: "oklch(37.3% 0.034 259.733)",
      800: "oklch(27.8% 0.033 256.848)",
      900: "oklch(21% 0.034 264.665)",
      950: "oklch(13% 0.028 261.692)",
    },
    zinc: {
      50: "oklch(98.5% 0 0)",
      100: "oklch(96.7% 0.001 286.375)",
      200: "oklch(92% 0.004 286.32)",
      300: "oklch(87.1% 0.006 286.286)",
      400: "oklch(70.5% 0.015 286.067)",
      500: "oklch(55.2% 0.016 285.938)",
      600: "oklch(44.2% 0.017 285.786)",
      700: "oklch(37% 0.013 285.805)",
      800: "oklch(27.4% 0.006 286.033)",
      900: "oklch(21% 0.006 285.885)",
      950: "oklch(14.1% 0.005 285.823)",
    },
    neutral: {
      50: "oklch(98.5% 0 0)",
      100: "oklch(97% 0 0)",
      200: "oklch(92.2% 0 0)",
      300: "oklch(87% 0 0)",
      400: "oklch(70.8% 0 0)",
      500: "oklch(55.6% 0 0)",
      600: "oklch(43.9% 0 0)",
      700: "oklch(37.1% 0 0)",
      800: "oklch(26.9% 0 0)",
      900: "oklch(20.5% 0 0)",
      950: "oklch(14.5% 0 0)",
    },
    stone: {
      50: "oklch(98.5% 0.001 106.423)",
      100: "oklch(97% 0.001 106.424)",
      200: "oklch(92.3% 0.003 48.717)",
      300: "oklch(86.9% 0.005 56.366)",
      400: "oklch(70.9% 0.01 56.259)",
      500: "oklch(55.3% 0.013 58.071)",
      600: "oklch(44.4% 0.011 73.639)",
      700: "oklch(37.4% 0.01 67.558)",
      800: "oklch(26.8% 0.007 34.298)",
      900: "oklch(21.6% 0.006 56.043)",
      950: "oklch(14.7% 0.004 49.25)",
    },
    red: {
      50: "oklch(97.1% 0.013 17.38)",
      100: "oklch(93.6% 0.032 17.717)",
      200: "oklch(88.5% 0.062 18.334)",
      300: "oklch(80.8% 0.114 19.571)",
      400: "oklch(70.4% 0.191 22.216)",
      500: "oklch(63.7% 0.237 25.331)",
      600: "oklch(57.7% 0.245 27.325)",
      700: "oklch(50.5% 0.213 27.518)",
      800: "oklch(44.4% 0.177 26.899)",
      900: "oklch(39.6% 0.141 25.723)",
      950: "oklch(25.8% 0.092 26.042)",
    },
    orange: {
      50: "oklch(98% 0.016 73.684)",
      100: "oklch(95.4% 0.038 75.164)",
      200: "oklch(90.1% 0.076 70.697)",
      300: "oklch(83.7% 0.128 66.29)",
      400: "oklch(75% 0.183 55.934)",
      500: "oklch(70.5% 0.213 47.604)",
      600: "oklch(64.6% 0.222 41.116)",
      700: "oklch(55.3% 0.195 38.402)",
      800: "oklch(47% 0.157 37.304)",
      900: "oklch(40.8% 0.123 38.172)",
      950: "oklch(26.6% 0.079 36.259)",
    },
    amber: {
      50: "oklch(98.7% 0.022 95.277)",
      100: "oklch(96.2% 0.059 95.617)",
      200: "oklch(92.4% 0.12 95.746)",
      300: "oklch(87.9% 0.169 91.605)",
      400: "oklch(82.8% 0.189 84.429)",
      500: "oklch(76.9% 0.188 70.08)",
      600: "oklch(66.6% 0.179 58.318)",
      700: "oklch(55.5% 0.163 48.998)",
      800: "oklch(47.3% 0.137 46.201)",
      900: "oklch(41.4% 0.112 45.904)",
      950: "oklch(27.9% 0.077 45.635)",
    },
    yellow: {
      50: "oklch(98.7% 0.026 102.212)",
      100: "oklch(97.3% 0.071 103.193)",
      200: "oklch(94.5% 0.129 101.54)",
      300: "oklch(90.5% 0.182 98.111)",
      400: "oklch(85.2% 0.199 91.936)",
      500: "oklch(79.5% 0.184 86.047)",
      600: "oklch(68.1% 0.162 75.834)",
      700: "oklch(55.4% 0.135 66.442)",
      800: "oklch(47.6% 0.114 61.907)",
      900: "oklch(42.1% 0.095 57.708)",
      950: "oklch(28.6% 0.066 53.813)",
    },
    lime: {
      50: "oklch(98.6% 0.031 120.757)",
      100: "oklch(96.7% 0.067 122.328)",
      200: "oklch(93.8% 0.127 124.321)",
      300: "oklch(89.7% 0.196 126.665)",
      400: "oklch(84.1% 0.238 128.85)",
      500: "oklch(76.8% 0.233 130.85)",
      600: "oklch(64.8% 0.2 131.684)",
      700: "oklch(53.2% 0.157 131.589)",
      800: "oklch(45.3% 0.124 130.933)",
      900: "oklch(40.5% 0.101 131.063)",
      950: "oklch(27.4% 0.072 132.109)",
    },
    green: {
      50: "oklch(98.2% 0.018 155.826)",
      100: "oklch(96.2% 0.044 156.743)",
      200: "oklch(92.5% 0.084 155.995)",
      300: "oklch(87.1% 0.15 154.449)",
      400: "oklch(79.2% 0.209 151.711)",
      500: "oklch(72.3% 0.219 149.579)",
      600: "oklch(62.7% 0.194 149.214)",
      700: "oklch(52.7% 0.154 150.069)",
      800: "oklch(44.8% 0.119 151.328)",
      900: "oklch(39.3% 0.095 152.535)",
      950: "oklch(26.6% 0.065 152.934)",
    },
    emerald: {
      50: "oklch(97.9% 0.021 166.113)",
      100: "oklch(95% 0.052 163.051)",
      200: "oklch(90.5% 0.093 164.15)",
      300: "oklch(84.5% 0.143 164.978)",
      400: "oklch(76.5% 0.177 163.223)",
      500: "oklch(69.6% 0.17 162.48)",
      600: "oklch(59.6% 0.145 163.225)",
      700: "oklch(50.8% 0.118 165.612)",
      800: "oklch(43.2% 0.095 166.913)",
      900: "oklch(37.8% 0.077 168.94)",
      950: "oklch(26.2% 0.051 172.552)",
    },
    teal: {
      50: "oklch(98.4% 0.014 180.72)",
      100: "oklch(95.3% 0.051 180.801)",
      200: "oklch(91% 0.096 180.426)",
      300: "oklch(85.5% 0.138 181.071)",
      400: "oklch(77.7% 0.152 181.912)",
      500: "oklch(70.4% 0.14 182.503)",
      600: "oklch(60% 0.118 184.704)",
      700: "oklch(51.1% 0.096 186.391)",
      800: "oklch(43.7% 0.078 188.216)",
      900: "oklch(38.6% 0.063 188.416)",
      950: "oklch(27.7% 0.046 192.524)",
    },
    cyan: {
      50: "oklch(98.4% 0.019 200.873)",
      100: "oklch(95.6% 0.045 203.388)",
      200: "oklch(91.7% 0.08 205.041)",
      300: "oklch(86.5% 0.127 207.078)",
      400: "oklch(78.9% 0.154 211.53)",
      500: "oklch(71.5% 0.143 215.221)",
      600: "oklch(60.9% 0.126 221.723)",
      700: "oklch(52% 0.105 223.128)",
      800: "oklch(45% 0.085 224.283)",
      900: "oklch(39.8% 0.07 227.392)",
      950: "oklch(30.2% 0.056 229.695)",
    },
    sky: {
      50: "oklch(97.7% 0.013 236.62)",
      100: "oklch(95.1% 0.026 236.824)",
      200: "oklch(90.1% 0.058 230.902)",
      300: "oklch(82.8% 0.111 230.318)",
      400: "oklch(74.6% 0.16 232.661)",
      500: "oklch(68.5% 0.169 237.323)",
      600: "oklch(58.8% 0.158 241.966)",
      700: "oklch(50% 0.134 242.749)",
      800: "oklch(44.3% 0.11 240.79)",
      900: "oklch(39.1% 0.09 240.876)",
      950: "oklch(29.3% 0.066 243.157)",
    },
    blue: {
      50: "oklch(97% 0.014 254.604)",
      100: "oklch(93.2% 0.032 255.585)",
      200: "oklch(88.2% 0.059 254.128)",
      300: "oklch(80.9% 0.105 251.813)",
      400: "oklch(70.7% 0.165 254.624)",
      500: "oklch(62.3% 0.214 259.815)",
      600: "oklch(54.6% 0.245 262.881)",
      700: "oklch(48.8% 0.243 264.376)",
      800: "oklch(42.4% 0.199 265.638)",
      900: "oklch(37.9% 0.146 265.522)",
      950: "oklch(28.2% 0.091 267.935)",
    },
    indigo: {
      50: "oklch(96.2% 0.018 272.314)",
      100: "oklch(93% 0.034 272.788)",
      200: "oklch(87% 0.065 274.039)",
      300: "oklch(78.5% 0.115 274.713)",
      400: "oklch(67.3% 0.182 276.935)",
      500: "oklch(58.5% 0.233 277.117)",
      600: "oklch(51.1% 0.262 276.966)",
      700: "oklch(45.7% 0.24 277.023)",
      800: "oklch(39.8% 0.195 277.366)",
      900: "oklch(35.9% 0.144 278.697)",
      950: "oklch(25.7% 0.09 281.288)",
    },
    violet: {
      50: "oklch(96.9% 0.016 293.756)",
      100: "oklch(94.3% 0.029 294.588)",
      200: "oklch(89.4% 0.057 293.283)",
      300: "oklch(81.1% 0.111 293.571)",
      400: "oklch(70.2% 0.183 293.541)",
      500: "oklch(60.6% 0.25 292.717)",
      600: "oklch(54.1% 0.281 293.009)",
      700: "oklch(49.1% 0.27 292.581)",
      800: "oklch(43.2% 0.232 292.759)",
      900: "oklch(38% 0.189 293.745)",
      950: "oklch(28.3% 0.141 291.089)",
    },
    purple: {
      50: "oklch(97.7% 0.014 308.299)",
      100: "oklch(94.6% 0.033 307.174)",
      200: "oklch(90.2% 0.063 306.703)",
      300: "oklch(82.7% 0.119 306.383)",
      400: "oklch(71.4% 0.203 305.504)",
      500: "oklch(62.7% 0.265 303.9)",
      600: "oklch(55.8% 0.288 302.321)",
      700: "oklch(49.6% 0.265 301.924)",
      800: "oklch(43.8% 0.218 303.724)",
      900: "oklch(38.1% 0.176 304.987)",
      950: "oklch(29.1% 0.149 302.717)",
    },
    fuchsia: {
      50: "oklch(97.7% 0.017 320.058)",
      100: "oklch(95.2% 0.037 318.852)",
      200: "oklch(90.3% 0.076 319.62)",
      300: "oklch(83.3% 0.145 321.434)",
      400: "oklch(74% 0.238 322.16)",
      500: "oklch(66.7% 0.295 322.15)",
      600: "oklch(59.1% 0.293 322.896)",
      700: "oklch(51.8% 0.253 323.949)",
      800: "oklch(45.2% 0.211 324.591)",
      900: "oklch(40.1% 0.17 325.612)",
      950: "oklch(29.3% 0.136 325.661)",
    },
    pink: {
      50: "oklch(97.1% 0.014 343.198)",
      100: "oklch(94.8% 0.028 342.258)",
      200: "oklch(89.9% 0.061 343.231)",
      300: "oklch(82.3% 0.12 346.018)",
      400: "oklch(71.8% 0.202 349.761)",
      500: "oklch(65.6% 0.241 354.308)",
      600: "oklch(59.2% 0.249 0.584)",
      700: "oklch(52.5% 0.223 3.958)",
      800: "oklch(45.9% 0.187 3.815)",
      900: "oklch(40.8% 0.153 2.432)",
      950: "oklch(28.4% 0.109 3.907)",
    },
    rose: {
      50: "oklch(96.9% 0.015 12.422)",
      100: "oklch(94.1% 0.03 12.58)",
      200: "oklch(89.2% 0.058 10.001)",
      300: "oklch(81% 0.117 11.638)",
      400: "oklch(71.2% 0.194 13.428)",
      500: "oklch(64.5% 0.246 16.439)",
      600: "oklch(58.6% 0.253 17.585)",
      700: "oklch(51.4% 0.222 16.935)",
      800: "oklch(45.5% 0.188 13.697)",
      900: "oklch(41% 0.159 10.272)",
      950: "oklch(27.1% 0.105 12.094)",
    },
  };
  function Wt(e) {
    return { __BARE_VALUE__: e };
  }
  var Rt = Wt((e) => {
      if (Ae(e.value)) return e.value;
    }),
    Dt = Wt((e) => {
      if (Ae(e.value)) return `${e.value}%`;
    }),
    _t = Wt((e) => {
      if (Ae(e.value)) return `${e.value}px`;
    }),
    Lt = Wt((e) => {
      if (Ae(e.value)) return `${e.value}ms`;
    }),
    Mt = Wt((e) => {
      if (Ae(e.value)) return `${e.value}deg`;
    }),
    Bt = Wt((e) => {
      if (null === e.fraction) return;
      let [t, r] = q(e.fraction, "/");
      return Ae(t) && Ae(r) ? e.fraction : void 0;
    }),
    It = Wt((e) => {
      if (Ae(Number(e.value))) return `repeat(${e.value}, minmax(0, 1fr))`;
    }),
    Pt = {
      accentColor: ({ theme: e }) => e("colors"),
      animation: {
        none: "none",
        spin: "spin 1s linear infinite",
        ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        bounce: "bounce 1s infinite",
      },
      aria: {
        busy: 'busy="true"',
        checked: 'checked="true"',
        disabled: 'disabled="true"',
        expanded: 'expanded="true"',
        hidden: 'hidden="true"',
        pressed: 'pressed="true"',
        readonly: 'readonly="true"',
        required: 'required="true"',
        selected: 'selected="true"',
      },
      aspectRatio: { auto: "auto", square: "1 / 1", video: "16 / 9", ...Bt },
      backdropBlur: ({ theme: e }) => e("blur"),
      backdropBrightness: ({ theme: e }) => ({ ...e("brightness"), ...Dt }),
      backdropContrast: ({ theme: e }) => ({ ...e("contrast"), ...Dt }),
      backdropGrayscale: ({ theme: e }) => ({ ...e("grayscale"), ...Dt }),
      backdropHueRotate: ({ theme: e }) => ({ ...e("hueRotate"), ...Mt }),
      backdropInvert: ({ theme: e }) => ({ ...e("invert"), ...Dt }),
      backdropOpacity: ({ theme: e }) => ({ ...e("opacity"), ...Dt }),
      backdropSaturate: ({ theme: e }) => ({ ...e("saturate"), ...Dt }),
      backdropSepia: ({ theme: e }) => ({ ...e("sepia"), ...Dt }),
      backgroundColor: ({ theme: e }) => e("colors"),
      backgroundImage: {
        none: "none",
        "gradient-to-t": "linear-gradient(to top, var(--tw-gradient-stops))",
        "gradient-to-tr":
          "linear-gradient(to top right, var(--tw-gradient-stops))",
        "gradient-to-r": "linear-gradient(to right, var(--tw-gradient-stops))",
        "gradient-to-br":
          "linear-gradient(to bottom right, var(--tw-gradient-stops))",
        "gradient-to-b": "linear-gradient(to bottom, var(--tw-gradient-stops))",
        "gradient-to-bl":
          "linear-gradient(to bottom left, var(--tw-gradient-stops))",
        "gradient-to-l": "linear-gradient(to left, var(--tw-gradient-stops))",
        "gradient-to-tl":
          "linear-gradient(to top left, var(--tw-gradient-stops))",
      },
      backgroundOpacity: ({ theme: e }) => e("opacity"),
      backgroundPosition: {
        bottom: "bottom",
        center: "center",
        left: "left",
        "left-bottom": "left bottom",
        "left-top": "left top",
        right: "right",
        "right-bottom": "right bottom",
        "right-top": "right top",
        top: "top",
      },
      backgroundSize: { auto: "auto", cover: "cover", contain: "contain" },
      blur: {
        0: "0",
        none: "",
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "40px",
        "3xl": "64px",
      },
      borderColor: ({ theme: e }) => ({
        DEFAULT: "currentcolor",
        ...e("colors"),
      }),
      borderOpacity: ({ theme: e }) => e("opacity"),
      borderRadius: {
        none: "0px",
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
      borderSpacing: ({ theme: e }) => e("spacing"),
      borderWidth: {
        DEFAULT: "1px",
        0: "0px",
        2: "2px",
        4: "4px",
        8: "8px",
        ..._t,
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        DEFAULT:
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        none: "none",
      },
      boxShadowColor: ({ theme: e }) => e("colors"),
      brightness: {
        0: "0",
        50: ".5",
        75: ".75",
        90: ".9",
        95: ".95",
        100: "1",
        105: "1.05",
        110: "1.1",
        125: "1.25",
        150: "1.5",
        200: "2",
        ...Dt,
      },
      caretColor: ({ theme: e }) => e("colors"),
      colors: () => ({ ...Ut }),
      columns: {
        auto: "auto",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        "3xs": "16rem",
        "2xs": "18rem",
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "80rem",
        ...Rt,
      },
      container: {},
      content: { none: "none" },
      contrast: {
        0: "0",
        50: ".5",
        75: ".75",
        100: "1",
        125: "1.25",
        150: "1.5",
        200: "2",
        ...Dt,
      },
      cursor: {
        auto: "auto",
        default: "default",
        pointer: "pointer",
        wait: "wait",
        text: "text",
        move: "move",
        help: "help",
        "not-allowed": "not-allowed",
        none: "none",
        "context-menu": "context-menu",
        progress: "progress",
        cell: "cell",
        crosshair: "crosshair",
        "vertical-text": "vertical-text",
        alias: "alias",
        copy: "copy",
        "no-drop": "no-drop",
        grab: "grab",
        grabbing: "grabbing",
        "all-scroll": "all-scroll",
        "col-resize": "col-resize",
        "row-resize": "row-resize",
        "n-resize": "n-resize",
        "e-resize": "e-resize",
        "s-resize": "s-resize",
        "w-resize": "w-resize",
        "ne-resize": "ne-resize",
        "nw-resize": "nw-resize",
        "se-resize": "se-resize",
        "sw-resize": "sw-resize",
        "ew-resize": "ew-resize",
        "ns-resize": "ns-resize",
        "nesw-resize": "nesw-resize",
        "nwse-resize": "nwse-resize",
        "zoom-in": "zoom-in",
        "zoom-out": "zoom-out",
      },
      divideColor: ({ theme: e }) => e("borderColor"),
      divideOpacity: ({ theme: e }) => e("borderOpacity"),
      divideWidth: ({ theme: e }) => ({ ...e("borderWidth"), ..._t }),
      dropShadow: {
        sm: "0 1px 1px rgb(0 0 0 / 0.05)",
        DEFAULT: ["0 1px 2px rgb(0 0 0 / 0.1)", "0 1px 1px rgb(0 0 0 / 0.06)"],
        md: ["0 4px 3px rgb(0 0 0 / 0.07)", "0 2px 2px rgb(0 0 0 / 0.06)"],
        lg: ["0 10px 8px rgb(0 0 0 / 0.04)", "0 4px 3px rgb(0 0 0 / 0.1)"],
        xl: ["0 20px 13px rgb(0 0 0 / 0.03)", "0 8px 5px rgb(0 0 0 / 0.08)"],
        "2xl": "0 25px 25px rgb(0 0 0 / 0.15)",
        none: "0 0 #0000",
      },
      fill: ({ theme: e }) => e("colors"),
      flex: {
        1: "1 1 0%",
        auto: "1 1 auto",
        initial: "0 1 auto",
        none: "none",
      },
      flexBasis: ({ theme: e }) => ({
        auto: "auto",
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "1/6": "16.666667%",
        "2/6": "33.333333%",
        "3/6": "50%",
        "4/6": "66.666667%",
        "5/6": "83.333333%",
        "1/12": "8.333333%",
        "2/12": "16.666667%",
        "3/12": "25%",
        "4/12": "33.333333%",
        "5/12": "41.666667%",
        "6/12": "50%",
        "7/12": "58.333333%",
        "8/12": "66.666667%",
        "9/12": "75%",
        "10/12": "83.333333%",
        "11/12": "91.666667%",
        full: "100%",
        ...e("spacing"),
      }),
      flexGrow: { 0: "0", DEFAULT: "1", ...Rt },
      flexShrink: { 0: "0", DEFAULT: "1", ...Rt },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        serif: [
          "ui-serif",
          "Georgia",
          "Cambria",
          '"Times New Roman"',
          "Times",
          "serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace",
        ],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["8rem", { lineHeight: "1" }],
      },
      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },
      gap: ({ theme: e }) => e("spacing"),
      gradientColorStops: ({ theme: e }) => e("colors"),
      gradientColorStopPositions: {
        "0%": "0%",
        "5%": "5%",
        "10%": "10%",
        "15%": "15%",
        "20%": "20%",
        "25%": "25%",
        "30%": "30%",
        "35%": "35%",
        "40%": "40%",
        "45%": "45%",
        "50%": "50%",
        "55%": "55%",
        "60%": "60%",
        "65%": "65%",
        "70%": "70%",
        "75%": "75%",
        "80%": "80%",
        "85%": "85%",
        "90%": "90%",
        "95%": "95%",
        "100%": "100%",
        ...Dt,
      },
      grayscale: { 0: "0", DEFAULT: "100%", ...Dt },
      gridAutoColumns: {
        auto: "auto",
        min: "min-content",
        max: "max-content",
        fr: "minmax(0, 1fr)",
      },
      gridAutoRows: {
        auto: "auto",
        min: "min-content",
        max: "max-content",
        fr: "minmax(0, 1fr)",
      },
      gridColumn: {
        auto: "auto",
        "span-1": "span 1 / span 1",
        "span-2": "span 2 / span 2",
        "span-3": "span 3 / span 3",
        "span-4": "span 4 / span 4",
        "span-5": "span 5 / span 5",
        "span-6": "span 6 / span 6",
        "span-7": "span 7 / span 7",
        "span-8": "span 8 / span 8",
        "span-9": "span 9 / span 9",
        "span-10": "span 10 / span 10",
        "span-11": "span 11 / span 11",
        "span-12": "span 12 / span 12",
        "span-full": "1 / -1",
      },
      gridColumnEnd: {
        auto: "auto",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13",
        ...Rt,
      },
      gridColumnStart: {
        auto: "auto",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13",
        ...Rt,
      },
      gridRow: {
        auto: "auto",
        "span-1": "span 1 / span 1",
        "span-2": "span 2 / span 2",
        "span-3": "span 3 / span 3",
        "span-4": "span 4 / span 4",
        "span-5": "span 5 / span 5",
        "span-6": "span 6 / span 6",
        "span-7": "span 7 / span 7",
        "span-8": "span 8 / span 8",
        "span-9": "span 9 / span 9",
        "span-10": "span 10 / span 10",
        "span-11": "span 11 / span 11",
        "span-12": "span 12 / span 12",
        "span-full": "1 / -1",
      },
      gridRowEnd: {
        auto: "auto",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13",
        ...Rt,
      },
      gridRowStart: {
        auto: "auto",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13",
        ...Rt,
      },
      gridTemplateColumns: {
        none: "none",
        subgrid: "subgrid",
        1: "repeat(1, minmax(0, 1fr))",
        2: "repeat(2, minmax(0, 1fr))",
        3: "repeat(3, minmax(0, 1fr))",
        4: "repeat(4, minmax(0, 1fr))",
        5: "repeat(5, minmax(0, 1fr))",
        6: "repeat(6, minmax(0, 1fr))",
        7: "repeat(7, minmax(0, 1fr))",
        8: "repeat(8, minmax(0, 1fr))",
        9: "repeat(9, minmax(0, 1fr))",
        10: "repeat(10, minmax(0, 1fr))",
        11: "repeat(11, minmax(0, 1fr))",
        12: "repeat(12, minmax(0, 1fr))",
        ...It,
      },
      gridTemplateRows: {
        none: "none",
        subgrid: "subgrid",
        1: "repeat(1, minmax(0, 1fr))",
        2: "repeat(2, minmax(0, 1fr))",
        3: "repeat(3, minmax(0, 1fr))",
        4: "repeat(4, minmax(0, 1fr))",
        5: "repeat(5, minmax(0, 1fr))",
        6: "repeat(6, minmax(0, 1fr))",
        7: "repeat(7, minmax(0, 1fr))",
        8: "repeat(8, minmax(0, 1fr))",
        9: "repeat(9, minmax(0, 1fr))",
        10: "repeat(10, minmax(0, 1fr))",
        11: "repeat(11, minmax(0, 1fr))",
        12: "repeat(12, minmax(0, 1fr))",
        ...It,
      },
      height: ({ theme: e }) => ({
        auto: "auto",
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "1/6": "16.666667%",
        "2/6": "33.333333%",
        "3/6": "50%",
        "4/6": "66.666667%",
        "5/6": "83.333333%",
        full: "100%",
        screen: "100vh",
        svh: "100svh",
        lvh: "100lvh",
        dvh: "100dvh",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
        ...e("spacing"),
      }),
      hueRotate: {
        0: "0deg",
        15: "15deg",
        30: "30deg",
        60: "60deg",
        90: "90deg",
        180: "180deg",
        ...Mt,
      },
      inset: ({ theme: e }) => ({
        auto: "auto",
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        full: "100%",
        ...e("spacing"),
      }),
      invert: { 0: "0", DEFAULT: "100%", ...Dt },
      keyframes: {
        spin: { to: { transform: "rotate(360deg)" } },
        ping: { "75%, 100%": { transform: "scale(2)", opacity: "0" } },
        pulse: { "50%": { opacity: ".5" } },
        bounce: {
          "0%, 100%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
          },
          "50%": {
            transform: "none",
            animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
          },
        },
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
      },
      lineHeight: {
        none: "1",
        tight: "1.25",
        snug: "1.375",
        normal: "1.5",
        relaxed: "1.625",
        loose: "2",
        3: ".75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        9: "2.25rem",
        10: "2.5rem",
      },
      listStyleType: { none: "none", disc: "disc", decimal: "decimal" },
      listStyleImage: { none: "none" },
      margin: ({ theme: e }) => ({ auto: "auto", ...e("spacing") }),
      lineClamp: { 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", ...Rt },
      maxHeight: ({ theme: e }) => ({
        none: "none",
        full: "100%",
        screen: "100vh",
        svh: "100svh",
        lvh: "100lvh",
        dvh: "100dvh",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
        ...e("spacing"),
      }),
      maxWidth: ({ theme: e }) => ({
        none: "none",
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "80rem",
        full: "100%",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
        prose: "65ch",
        ...e("spacing"),
      }),
      minHeight: ({ theme: e }) => ({
        full: "100%",
        screen: "100vh",
        svh: "100svh",
        lvh: "100lvh",
        dvh: "100dvh",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
        ...e("spacing"),
      }),
      minWidth: ({ theme: e }) => ({
        full: "100%",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
        ...e("spacing"),
      }),
      objectPosition: {
        bottom: "bottom",
        center: "center",
        left: "left",
        "left-bottom": "left bottom",
        "left-top": "left top",
        right: "right",
        "right-bottom": "right bottom",
        "right-top": "right top",
        top: "top",
      },
      opacity: {
        0: "0",
        5: "0.05",
        10: "0.1",
        15: "0.15",
        20: "0.2",
        25: "0.25",
        30: "0.3",
        35: "0.35",
        40: "0.4",
        45: "0.45",
        50: "0.5",
        55: "0.55",
        60: "0.6",
        65: "0.65",
        70: "0.7",
        75: "0.75",
        80: "0.8",
        85: "0.85",
        90: "0.9",
        95: "0.95",
        100: "1",
        ...Dt,
      },
      order: {
        first: "-9999",
        last: "9999",
        none: "0",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        ...Rt,
      },
      outlineColor: ({ theme: e }) => e("colors"),
      outlineOffset: {
        0: "0px",
        1: "1px",
        2: "2px",
        4: "4px",
        8: "8px",
        ..._t,
      },
      outlineWidth: { 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px", ..._t },
      padding: ({ theme: e }) => e("spacing"),
      placeholderColor: ({ theme: e }) => e("colors"),
      placeholderOpacity: ({ theme: e }) => e("opacity"),
      ringColor: ({ theme: e }) => ({
        DEFAULT: "currentcolor",
        ...e("colors"),
      }),
      ringOffsetColor: ({ theme: e }) => e("colors"),
      ringOffsetWidth: {
        0: "0px",
        1: "1px",
        2: "2px",
        4: "4px",
        8: "8px",
        ..._t,
      },
      ringOpacity: ({ theme: e }) => ({ DEFAULT: "0.5", ...e("opacity") }),
      ringWidth: {
        DEFAULT: "3px",
        0: "0px",
        1: "1px",
        2: "2px",
        4: "4px",
        8: "8px",
        ..._t,
      },
      rotate: {
        0: "0deg",
        1: "1deg",
        2: "2deg",
        3: "3deg",
        6: "6deg",
        12: "12deg",
        45: "45deg",
        90: "90deg",
        180: "180deg",
        ...Mt,
      },
      saturate: { 0: "0", 50: ".5", 100: "1", 150: "1.5", 200: "2", ...Dt },
      scale: {
        0: "0",
        50: ".5",
        75: ".75",
        90: ".9",
        95: ".95",
        100: "1",
        105: "1.05",
        110: "1.1",
        125: "1.25",
        150: "1.5",
        ...Dt,
      },
      screens: {
        sm: "40rem",
        md: "48rem",
        lg: "64rem",
        xl: "80rem",
        "2xl": "96rem",
      },
      scrollMargin: ({ theme: e }) => e("spacing"),
      scrollPadding: ({ theme: e }) => e("spacing"),
      sepia: { 0: "0", DEFAULT: "100%", ...Dt },
      skew: {
        0: "0deg",
        1: "1deg",
        2: "2deg",
        3: "3deg",
        6: "6deg",
        12: "12deg",
        ...Mt,
      },
      space: ({ theme: e }) => e("spacing"),
      spacing: {
        px: "1px",
        0: "0px",
        0.5: "0.125rem",
        1: "0.25rem",
        1.5: "0.375rem",
        2: "0.5rem",
        2.5: "0.625rem",
        3: "0.75rem",
        3.5: "0.875rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        9: "2.25rem",
        10: "2.5rem",
        11: "2.75rem",
        12: "3rem",
        14: "3.5rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        28: "7rem",
        32: "8rem",
        36: "9rem",
        40: "10rem",
        44: "11rem",
        48: "12rem",
        52: "13rem",
        56: "14rem",
        60: "15rem",
        64: "16rem",
        72: "18rem",
        80: "20rem",
        96: "24rem",
      },
      stroke: ({ theme: e }) => ({ none: "none", ...e("colors") }),
      strokeWidth: { 0: "0", 1: "1", 2: "2", ...Rt },
      supports: {},
      data: {},
      textColor: ({ theme: e }) => e("colors"),
      textDecorationColor: ({ theme: e }) => e("colors"),
      textDecorationThickness: {
        auto: "auto",
        "from-font": "from-font",
        0: "0px",
        1: "1px",
        2: "2px",
        4: "4px",
        8: "8px",
        ..._t,
      },
      textIndent: ({ theme: e }) => e("spacing"),
      textOpacity: ({ theme: e }) => e("opacity"),
      textUnderlineOffset: {
        auto: "auto",
        0: "0px",
        1: "1px",
        2: "2px",
        4: "4px",
        8: "8px",
        ..._t,
      },
      transformOrigin: {
        center: "center",
        top: "top",
        "top-right": "top right",
        right: "right",
        "bottom-right": "bottom right",
        bottom: "bottom",
        "bottom-left": "bottom left",
        left: "left",
        "top-left": "top left",
      },
      transitionDelay: {
        0: "0s",
        75: "75ms",
        100: "100ms",
        150: "150ms",
        200: "200ms",
        300: "300ms",
        500: "500ms",
        700: "700ms",
        1e3: "1000ms",
        ...Lt,
      },
      transitionDuration: {
        DEFAULT: "150ms",
        0: "0s",
        75: "75ms",
        100: "100ms",
        150: "150ms",
        200: "200ms",
        300: "300ms",
        500: "500ms",
        700: "700ms",
        1e3: "1000ms",
        ...Lt,
      },
      transitionProperty: {
        none: "none",
        all: "all",
        DEFAULT:
          "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
        colors:
          "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke",
        opacity: "opacity",
        shadow: "box-shadow",
        transform: "transform",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
        linear: "linear",
        in: "cubic-bezier(0.4, 0, 1, 1)",
        out: "cubic-bezier(0, 0, 0.2, 1)",
        "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      translate: ({ theme: e }) => ({
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        full: "100%",
        ...e("spacing"),
      }),
      size: ({ theme: e }) => ({
        auto: "auto",
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "1/6": "16.666667%",
        "2/6": "33.333333%",
        "3/6": "50%",
        "4/6": "66.666667%",
        "5/6": "83.333333%",
        "1/12": "8.333333%",
        "2/12": "16.666667%",
        "3/12": "25%",
        "4/12": "33.333333%",
        "5/12": "41.666667%",
        "6/12": "50%",
        "7/12": "58.333333%",
        "8/12": "66.666667%",
        "9/12": "75%",
        "10/12": "83.333333%",
        "11/12": "91.666667%",
        full: "100%",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
        ...e("spacing"),
      }),
      width: ({ theme: e }) => ({
        auto: "auto",
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "1/6": "16.666667%",
        "2/6": "33.333333%",
        "3/6": "50%",
        "4/6": "66.666667%",
        "5/6": "83.333333%",
        "1/12": "8.333333%",
        "2/12": "16.666667%",
        "3/12": "25%",
        "4/12": "33.333333%",
        "5/12": "41.666667%",
        "6/12": "50%",
        "7/12": "58.333333%",
        "8/12": "66.666667%",
        "9/12": "75%",
        "10/12": "83.333333%",
        "11/12": "91.666667%",
        full: "100%",
        screen: "100vw",
        svw: "100svw",
        lvw: "100lvw",
        dvw: "100dvw",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
        ...e("spacing"),
      }),
      willChange: {
        auto: "auto",
        scroll: "scroll-position",
        contents: "contents",
        transform: "transform",
      },
      zIndex: {
        auto: "auto",
        0: "0",
        10: "10",
        20: "20",
        30: "30",
        40: "40",
        50: "50",
        ...Rt,
      },
    };
  function qt(e) {
    return {
      theme: {
        ...Pt,
        colors: ({ theme: e }) => e("color", {}),
        extend: {
          fontSize: ({ theme: e }) => ({ ...e("text", {}) }),
          boxShadow: ({ theme: e }) => ({ ...e("shadow", {}) }),
          animation: ({ theme: e }) => ({ ...e("animate", {}) }),
          aspectRatio: ({ theme: e }) => ({ ...e("aspect", {}) }),
          borderRadius: ({ theme: e }) => ({ ...e("radius", {}) }),
          screens: ({ theme: e }) => ({ ...e("breakpoint", {}) }),
          letterSpacing: ({ theme: e }) => ({ ...e("tracking", {}) }),
          lineHeight: ({ theme: e }) => ({ ...e("leading", {}) }),
          transitionDuration: {
            DEFAULT: e.get(["--default-transition-duration"]) ?? null,
          },
          transitionTimingFunction: {
            DEFAULT: e.get(["--default-transition-timing-function"]) ?? null,
          },
          maxWidth: ({ theme: e }) => ({ ...e("container", {}) }),
        },
      },
    };
  }
  var Ht = {
    blocklist: [],
    future: {},
    prefix: "",
    important: !1,
    darkMode: null,
    theme: {},
    plugins: [],
    content: { files: [] },
  };
  function Zt(e, t) {
    let r = {
      design: e,
      configs: [],
      plugins: [],
      content: { files: [] },
      theme: {},
      extend: {},
      result: structuredClone(Ht),
    };
    for (let e of t) Gt(r, e);
    for (let e of r.configs)
      ("darkMode" in e &&
        void 0 !== e.darkMode &&
        (r.result.darkMode = e.darkMode ?? null),
        "prefix" in e &&
          void 0 !== e.prefix &&
          (r.result.prefix = e.prefix ?? ""),
        "blocklist" in e &&
          void 0 !== e.blocklist &&
          (r.result.blocklist = e.blocklist ?? []),
        "important" in e &&
          void 0 !== e.important &&
          (r.result.important = e.important ?? !1));
    let n = (function (e) {
      let t = new Set(),
        r = Ct(e.design, () => e.theme, o),
        n = Object.assign(r, { theme: r, colors: Ut });
      function o(e) {
        return "function" == typeof e ? (e(n) ?? null) : (e ?? null);
      }
      for (let r of e.configs) {
        let n = r.theme ?? {},
          o = n.extend ?? {};
        for (let e in n) "extend" !== e && t.add(e);
        Object.assign(e.theme, n);
        for (let t in o) ((e.extend[t] ??= []), e.extend[t].push(o[t]));
      }
      delete e.theme.extend;
      for (let t in e.extend) {
        let r = [e.theme[t], ...e.extend[t]];
        e.theme[t] = () => St({}, r.map(o), Yt);
      }
      for (let t in e.theme) e.theme[t] = o(e.theme[t]);
      if (e.theme.screens && "object" == typeof e.theme.screens)
        for (let t of Object.keys(e.theme.screens)) {
          let r = e.theme.screens[t];
          r &&
            "object" == typeof r &&
            ("raw" in r ||
              "max" in r ||
              ("min" in r && (e.theme.screens[t] = r.min)));
        }
      return t;
    })(r);
    return {
      resolvedConfig: {
        ...r.result,
        content: r.content,
        theme: r.theme,
        plugins: r.plugins,
      },
      replacedThemeKeys: n,
    };
  }
  function Yt(e, t) {
    return Array.isArray(e) && zt(e[0])
      ? e.concat(t)
      : Array.isArray(t) && zt(t[0]) && zt(e)
        ? [e, ...t]
        : Array.isArray(t)
          ? t
          : void 0;
  }
  function Gt(e, { config: t, base: r, path: n, reference: o, src: a }) {
    let i = [];
    for (let e of t.plugins ?? [])
      "__isOptionsFunction" in e
        ? i.push({ ...e(), reference: o, src: a })
        : "handler" in e
          ? i.push({ ...e, reference: o, src: a })
          : i.push({ handler: e, reference: o, src: a });
    if (Array.isArray(t.presets) && 0 === t.presets.length)
      throw new Error(
        "Error in the config file/plugin/preset. An empty preset (`preset: []`) is not currently supported.",
      );
    for (let i of t.presets ?? [])
      Gt(e, { path: n, base: r, config: i, reference: o, src: a });
    for (let t of i)
      (e.plugins.push(t),
        t.config &&
          Gt(e, {
            path: n,
            base: r,
            config: t.config,
            reference: !!t.reference,
            src: t.src ?? a,
          }));
    let l = t.content ?? [],
      s = Array.isArray(l) ? l : l.files;
    for (let t of s)
      e.content.files.push("object" == typeof t ? t : { base: r, pattern: t });
    e.configs.push(t);
  }
  function Jt(e, t) {
    let r = e.theme.container || {};
    if ("object" != typeof r || null === r) return;
    let n = (function ({ center: e, padding: t, screens: r }, n) {
      let o = [],
        a = null;
      if (
        (e && o.push(S("margin-inline", "auto")),
        ("string" == typeof t ||
          ("object" == typeof t && null !== t && "DEFAULT" in t)) &&
          o.push(S("padding-inline", "string" == typeof t ? t : t.DEFAULT)),
        "object" == typeof r && null !== r)
      ) {
        a = new Map();
        let e = Array.from(n.theme.namespace("--breakpoint").entries());
        if ((e.sort((e, t) => ae(e[1], t[1], "asc")), e.length > 0)) {
          let [t] = e[0];
          o.push(
            A("@media", `(width >= --theme(--breakpoint-${t}))`, [
              S("max-width", "none"),
            ]),
          );
        }
        for (let [e, t] of Object.entries(r)) {
          if ("object" == typeof t) {
            if (!("min" in t)) continue;
            t = t.min;
          }
          a.set(e, A("@media", `(width >= ${t})`, [S("max-width", t)]));
        }
      }
      if ("object" == typeof t && null !== t) {
        let e = Object.entries(t)
          .filter(([e]) => "DEFAULT" !== e)
          .map(([e, t]) => [e, n.theme.resolveValue(e, ["--breakpoint"]), t])
          .filter(Boolean);
        e.sort((e, t) => ae(e[1], t[1], "asc"));
        for (let [t, , r] of e)
          if (a && a.has(t)) a.get(t).nodes.push(S("padding-inline", r));
          else {
            if (a) continue;
            o.push(
              A("@media", `(width >= theme(--breakpoint-${t}))`, [
                S("padding-inline", r),
              ]),
            );
          }
      }
      if (a) for (let [, e] of a) o.push(e);
      return o;
    })(r, t);
    0 !== n.length && t.utilities.static("container", () => n.map(V));
  }
  function Xt({ addVariant: e, config: t }) {
    let r = t("darkMode", null),
      [n, o = ".dark"] = Array.isArray(r) ? r : [r];
    if ("variant" === n) {
      let e;
      if (
        (Array.isArray(o) || "function" == typeof o
          ? (e = o)
          : "string" == typeof o && (e = [o]),
        Array.isArray(e))
      )
        for (let t of e)
          ".dark" === t
            ? ((n = !1),
              console.warn(
                'When using `variant` for `darkMode`, you must provide a selector.\nExample: `darkMode: ["variant", ".your-selector &"]`',
              ))
            : t.includes("&") ||
              ((n = !1),
              console.warn(
                'When using `variant` for `darkMode`, your selector must contain `&`.\nExample `darkMode: ["variant", ".your-selector &"]`',
              ));
      o = e;
    }
    null === n ||
      ("selector" === n
        ? e("dark", `&:where(${o}, ${o} *)`)
        : "media" === n
          ? e("dark", "@media (prefers-color-scheme: dark)")
          : "variant" === n
            ? e("dark", o)
            : "class" === n && e("dark", `&:is(${o} *)`));
  }
  function Qt(e) {
    return (Array.isArray(e) ? e : [e])
      .map((e) =>
        "string" == typeof e
          ? { min: e }
          : e && "object" == typeof e
            ? e
            : null,
      )
      .map((e) => {
        if (null === e) return null;
        if ("raw" in e) return e.raw;
        let t = "";
        return (
          void 0 !== e.max && (t += `${e.max} >= `),
          (t += "width"),
          void 0 !== e.min && (t += ` >= ${e.min}`),
          `(${t})`
        );
      })
      .filter(Boolean)
      .join(", ");
  }
  var er = /^[a-z]+$/;
  async function tr({
    designSystem: e,
    base: t,
    ast: r,
    loadModule: n,
    sources: o,
  }) {
    let a = 0,
      i = [],
      l = [];
    (k(r, (e, t) => {
      if ("at-rule" !== e.kind) return;
      let r = K(t);
      if ("@plugin" === e.name) {
        if (null !== r.parent) throw new Error("`@plugin` cannot be nested.");
        let t = e.params.slice(1, -1);
        if (0 === t.length) throw new Error("`@plugin` must have a path.");
        let n = {};
        for (let t of e.nodes ?? []) {
          if ("declaration" !== t.kind)
            throw new Error(
              `Unexpected \`@plugin\` option:\n\n${N([t])}\n\n\`@plugin\` options must be a flat list of declarations.`,
            );
          if (void 0 === t.value) continue;
          let e = q(t.value, ",").map((e) => {
            if ("null" === (e = e.trim())) return null;
            if ("true" === e) return !0;
            if ("false" === e) return !1;
            if (!Number.isNaN(Number(e))) return Number(e);
            if (
              ('"' === e[0] && '"' === e[e.length - 1]) ||
              ("'" === e[0] && "'" === e[e.length - 1])
            )
              return e.slice(1, -1);
            if ("{" === e[0] && "}" === e[e.length - 1])
              throw new Error(
                `Unexpected \`@plugin\` option: Value of declaration \`${N([t]).trim()}\` is not supported.\n\nUsing an object as a plugin option is currently only supported in JavaScript configuration files.`,
              );
            return e;
          });
          n[t.property] = 1 === e.length ? e[0] : e;
        }
        return (
          i.push([
            {
              id: t,
              base: r.context.base,
              reference: !!r.context.reference,
              src: e.src,
            },
            Object.keys(n).length > 0 ? n : null,
          ]),
          (a |= 4),
          w.Replace([])
        );
      }
      if ("@config" === e.name) {
        if (e.nodes.length > 0)
          throw new Error("`@config` cannot have a body.");
        if (null !== r.parent) throw new Error("`@config` cannot be nested.");
        return (
          l.push({
            id: e.params.slice(1, -1),
            base: r.context.base,
            reference: !!r.context.reference,
            src: e.src,
          }),
          (a |= 4),
          w.Replace([])
        );
      }
    }),
      (function (e) {
        for (let [t, r] of [
          ["t", "top"],
          ["tr", "top right"],
          ["r", "right"],
          ["br", "bottom right"],
          ["b", "bottom"],
          ["bl", "bottom left"],
          ["l", "left"],
          ["tl", "top left"],
        ])
          (e.utilities.suggest(`bg-gradient-to-${t}`, () => []),
            e.utilities.static(`bg-gradient-to-${t}`, () => [
              S("--tw-gradient-position", `to ${r} in oklab`),
              S(
                "background-image",
                "linear-gradient(var(--tw-gradient-stops))",
              ),
            ]));
        (e.utilities.suggest("bg-left-top", () => []),
          e.utilities.static("bg-left-top", () => [
            S("background-position", "left top"),
          ]),
          e.utilities.suggest("bg-right-top", () => []),
          e.utilities.static("bg-right-top", () => [
            S("background-position", "right top"),
          ]),
          e.utilities.suggest("bg-left-bottom", () => []),
          e.utilities.static("bg-left-bottom", () => [
            S("background-position", "left bottom"),
          ]),
          e.utilities.suggest("bg-right-bottom", () => []),
          e.utilities.static("bg-right-bottom", () => [
            S("background-position", "right bottom"),
          ]),
          e.utilities.suggest("object-left-top", () => []),
          e.utilities.static("object-left-top", () => [
            S("object-position", "left top"),
          ]),
          e.utilities.suggest("object-right-top", () => []),
          e.utilities.static("object-right-top", () => [
            S("object-position", "right top"),
          ]),
          e.utilities.suggest("object-left-bottom", () => []),
          e.utilities.static("object-left-bottom", () => [
            S("object-position", "left bottom"),
          ]),
          e.utilities.suggest("object-right-bottom", () => []),
          e.utilities.static("object-right-bottom", () => [
            S("object-position", "right bottom"),
          ]),
          e.utilities.suggest("max-w-screen", () => []),
          e.utilities.functional("max-w-screen", (t) => {
            if (!t.value || "arbitrary" === t.value.kind) return;
            let r = e.theme.resolve(t.value.value, ["--breakpoint"]);
            return r ? [S("max-width", r)] : void 0;
          }),
          e.utilities.suggest("overflow-ellipsis", () => []),
          e.utilities.static("overflow-ellipsis", () => [
            S("text-overflow", "ellipsis"),
          ]),
          e.utilities.suggest("decoration-slice", () => []),
          e.utilities.static("decoration-slice", () => [
            S("-webkit-box-decoration-break", "slice"),
            S("box-decoration-break", "slice"),
          ]),
          e.utilities.suggest("decoration-clone", () => []),
          e.utilities.static("decoration-clone", () => [
            S("-webkit-box-decoration-break", "clone"),
            S("box-decoration-break", "clone"),
          ]),
          e.utilities.suggest("flex-shrink", () => []),
          e.utilities.functional("flex-shrink", (e) => {
            if (!e.modifier) {
              if (!e.value) return [S("flex-shrink", "1")];
              if ("arbitrary" === e.value.kind)
                return [S("flex-shrink", e.value.value)];
              if (Ae(e.value.value)) return [S("flex-shrink", e.value.value)];
            }
          }),
          e.utilities.suggest("flex-grow", () => []),
          e.utilities.functional("flex-grow", (e) => {
            if (!e.modifier) {
              if (!e.value) return [S("flex-grow", "1")];
              if ("arbitrary" === e.value.kind)
                return [S("flex-grow", e.value.value)];
              if (Ae(e.value.value)) return [S("flex-grow", e.value.value)];
            }
          }),
          e.utilities.suggest("order-none", () => []),
          e.utilities.static("order-none", () => [S("order", "0")]),
          e.utilities.suggest("break-words", () => []),
          e.utilities.static("break-words", () => [
            S("overflow-wrap", "break-word"),
          ]));
      })(e));
    let s = e.resolveThemeValue;
    if (
      ((e.resolveThemeValue = function (n, i) {
        return n.startsWith("--")
          ? s(n, i)
          : ((a |= rr({
              designSystem: e,
              base: t,
              ast: r,
              sources: o,
              configs: [],
              pluginDetails: [],
            })),
            e.resolveThemeValue(n, i));
      }),
      !i.length && !l.length)
    )
      return 0;
    let [c, u] = await Promise.all([
      Promise.all(
        l.map(async ({ id: e, base: t, reference: r, src: o }) => {
          let a = await n(e, t, "config");
          return {
            path: e,
            base: a.base,
            config: a.module,
            reference: r,
            src: o,
          };
        }),
      ),
      Promise.all(
        i.map(async ([{ id: e, base: t, reference: r, src: o }, a]) => {
          let i = await n(e, t, "plugin");
          return {
            path: e,
            base: i.base,
            plugin: i.module,
            options: a,
            reference: r,
            src: o,
          };
        }),
      ),
    ]);
    return (
      (a |= rr({
        designSystem: e,
        base: t,
        ast: r,
        sources: o,
        configs: c,
        pluginDetails: u,
      })),
      a
    );
  }
  function rr({
    designSystem: e,
    base: t,
    ast: r,
    sources: n,
    configs: o,
    pluginDetails: a,
  }) {
    let i = 0,
      l = [
        ...a.map((e) => {
          if (!e.options)
            return {
              config: { plugins: [e.plugin] },
              base: e.base,
              reference: e.reference,
              src: e.src,
            };
          if ("__isOptionsFunction" in e.plugin)
            return {
              config: { plugins: [e.plugin(e.options)] },
              base: e.base,
              reference: e.reference,
              src: e.src,
            };
          throw new Error(`The plugin "${e.path}" does not accept options`);
        }),
        ...o,
      ],
      { resolvedConfig: s } = Zt(e, [
        { config: qt(e.theme), base: t, reference: !0, src: void 0 },
        ...l,
        { config: { plugins: [Xt] }, base: t, reference: !0, src: void 0 },
      ]),
      { resolvedConfig: c, replacedThemeKeys: u } = Zt(e, l),
      d = {
        designSystem: e,
        ast: r,
        resolvedConfig: s,
        featuresRef: {
          set current(e) {
            i |= e;
          },
        },
      },
      f = Kt({ ...d, referenceMode: !1, src: void 0 }),
      p = e.resolveThemeValue;
    e.resolveThemeValue = function (e, t) {
      if ("-" === e[0] && "-" === e[1]) return p(e, t);
      let r = f.theme(e, void 0);
      return Array.isArray(r) && 2 === r.length
        ? r[0]
        : Array.isArray(r)
          ? r.join(", ")
          : "object" == typeof r && null !== r && "DEFAULT" in r
            ? r.DEFAULT
            : "string" == typeof r
              ? r
              : void 0;
    };
    for (let { handler: e, reference: t, src: r } of s.plugins) {
      e(Kt({ ...d, referenceMode: t ?? !1, src: r }));
    }
    if (
      (pt(e, c, u),
      Ft(e, c),
      (function (e, t) {
        let r = e.theme.aria || {},
          n = e.theme.supports || {},
          o = e.theme.data || {};
        if (Object.keys(r).length > 0) {
          let e = t.variants.get("aria"),
            n = e?.applyFn,
            o = e?.compounds;
          t.variants.functional(
            "aria",
            (e, t) => {
              let o = t.value;
              return o && "named" === o.kind && o.value in r
                ? n?.(e, {
                    ...t,
                    value: { kind: "arbitrary", value: r[o.value] },
                  })
                : n?.(e, t);
            },
            { compounds: o },
          );
        }
        if (Object.keys(n).length > 0) {
          let e = t.variants.get("supports"),
            r = e?.applyFn,
            o = e?.compounds;
          t.variants.functional(
            "supports",
            (e, t) => {
              let o = t.value;
              return o && "named" === o.kind && o.value in n
                ? r?.(e, {
                    ...t,
                    value: { kind: "arbitrary", value: n[o.value] },
                  })
                : r?.(e, t);
            },
            { compounds: o },
          );
        }
        if (Object.keys(o).length > 0) {
          let e = t.variants.get("data"),
            r = e?.applyFn,
            n = e?.compounds;
          t.variants.functional(
            "data",
            (e, t) => {
              let n = t.value;
              return n && "named" === n.kind && n.value in o
                ? r?.(e, {
                    ...t,
                    value: { kind: "arbitrary", value: o[n.value] },
                  })
                : r?.(e, t);
            },
            { compounds: n },
          );
        }
      })(c, e),
      (function (e, t) {
        let r = e.theme.screens || {},
          n = t.variants.get("min")?.order ?? 0,
          o = [];
        for (let [e, a] of Object.entries(r)) {
          let r = function (r) {
              t.variants.static(
                e,
                (e) => {
                  e.nodes = [A("@media", c, e.nodes)];
                },
                { order: r },
              );
            },
            i = t.variants.get(e),
            l = t.theme.resolveValue(e, ["--breakpoint"]);
          if (i && l && !t.theme.hasDefault(`--breakpoint-${e}`)) continue;
          let s = !0;
          "string" == typeof a && (s = !1);
          let c = Qt(a);
          s ? o.push(r) : r(n);
        }
        if (0 !== o.length) {
          for (let [, e] of t.variants.variants)
            e.order > n && (e.order += o.length);
          t.variants.compareFns = new Map(
            Array.from(t.variants.compareFns).map(
              ([e, t]) => (e > n && (e += o.length), [e, t]),
            ),
          );
          for (let [e, t] of o.entries()) t(n + e + 1);
        }
      })(c, e),
      Jt(c, e),
      !e.theme.prefix && s.prefix)
    ) {
      if (
        (s.prefix.endsWith("-") &&
          ((s.prefix = s.prefix.slice(0, -1)),
          console.warn(
            `The prefix "${s.prefix}" is invalid. Prefixes must be lowercase ASCII letters (a-z) only and is written as a variant before all utilities. We have fixed up the prefix for you. Remove the trailing \`-\` to silence this warning.`,
          )),
        !er.test(s.prefix))
      )
        throw new Error(
          `The prefix "${s.prefix}" is invalid. Prefixes must be lowercase ASCII letters (a-z) only.`,
        );
      e.theme.prefix = s.prefix;
    }
    if (
      (!e.important && !0 === s.important && (e.important = !0),
      "string" == typeof s.important)
    ) {
      let e = s.important;
      k(r, (t, r) => {
        if (
          "at-rule" !== t.kind ||
          "@tailwind" !== t.name ||
          "utilities" !== t.params
        )
          return;
        let n = K(r);
        return "rule" === n.parent?.kind && n.parent.selector === e
          ? w.Stop
          : w.ReplaceStop($(e, [t]));
      });
    }
    for (let t of s.blocklist) e.invalidCandidates.add(t);
    for (let e of s.content.files) {
      if ("raw" in e)
        throw new Error(
          `Error in the config file/plugin/preset. The \`content\` key contains a \`raw\` entry:\n\n${JSON.stringify(e, null, 2)}\n\nThis feature is not currently supported.`,
        );
      let t = !1;
      ("!" == e.pattern[0] && ((t = !0), (e.pattern = e.pattern.slice(1))),
        n.push({ ...e, negated: t }));
    }
    return i;
  }
  function nr({ ast: e }) {
    let t = new u((e) =>
        (function (e) {
          let t = [0];
          for (let r = 0; r < e.length; r++)
            10 === e.charCodeAt(r) && t.push(r + 1);
          return {
            find: function (e) {
              let r = 0,
                n = t.length;
              for (; n > 0; ) {
                let o = n >> 1,
                  a = r + o;
                t[a] <= e ? ((r = a + 1), (n = n - o - 1)) : (n = o);
              }
              return ((r -= 1), { line: r + 1, column: e - t[r] });
            },
            findOffset: function ({ line: e, column: r }) {
              ((e -= 1), (e = Math.min(Math.max(e, 0), t.length - 1)));
              let n = t[e],
                o = t[e + 1] ?? n;
              return Math.min(Math.max(n + r, 0), o);
            },
          };
        })(e.code),
      ),
      r = new u((e) => ({ url: e.file, content: e.code, ignore: !1 })),
      n = { file: null, sources: [], mappings: [] };
    k(e, (e) => {
      if (!e.src || !e.dst) return;
      let o = r.get(e.src[0]);
      if (!o.content) return;
      let a = t.get(e.src[0]),
        i = t.get(e.dst[0]),
        l = o.content.slice(e.src[1], e.src[2]),
        s = 0;
      for (let t of l.split("\n")) {
        if ("" !== t.trim()) {
          let t = a.find(e.src[1] + s),
            r = i.find(e.dst[1]);
          n.mappings.push({
            name: null,
            originalPosition: { source: o, ...t },
            generatedPosition: r,
          });
        }
        ((s += t.length), (s += 1));
      }
      let c = a.find(e.src[2]),
        u = i.find(e.dst[2]);
      n.mappings.push({
        name: null,
        originalPosition: { source: o, ...c },
        generatedPosition: u,
      });
    });
    for (let e of t.keys()) n.sources.push(r.get(e));
    return (
      n.mappings.sort(
        (e, t) =>
          e.generatedPosition.line - t.generatedPosition.line ||
          e.generatedPosition.column - t.generatedPosition.column ||
          (e.originalPosition?.line ?? 0) - (t.originalPosition?.line ?? 0) ||
          (e.originalPosition?.column ?? 0) - (t.originalPosition?.column ?? 0),
      ),
      n
    );
  }
  var or = /^(-?\d+)\.\.(-?\d+)(?:\.\.(-?\d+))?$/;
  function ar(e) {
    let t = e.indexOf("{");
    if (-1 === t) return [e];
    let r = [],
      n = e.slice(0, t),
      o = e.slice(t),
      a = 0,
      i = o.lastIndexOf("}");
    for (let e = 0; e < o.length; e++) {
      let t = o[e];
      if ("{" === t) a++;
      else if ("}" === t && (a--, 0 === a)) {
        i = e;
        break;
      }
    }
    if (-1 === i) throw new Error(`The pattern \`${e}\` is not balanced.`);
    let l,
      s = o.slice(1, i),
      c = o.slice(i + 1);
    ((l = (function (e) {
      return or.test(e);
    })(s)
      ? (function (e) {
          let t = e.match(or);
          if (!t) return [e];
          let [, r, n, o] = t,
            a = o ? parseInt(o, 10) : void 0,
            i = [];
          if (/^-?\d+$/.test(r) && /^-?\d+$/.test(n)) {
            let e = parseInt(r, 10),
              t = parseInt(n, 10);
            if ((void 0 === a && (a = e <= t ? 1 : -1), 0 === a))
              throw new Error("Step cannot be zero in sequence expansion.");
            let o = e < t;
            (o && a < 0 && (a = -a), !o && a > 0 && (a = -a));
            for (let r = e; o ? r <= t : r >= t; r += a) i.push(r.toString());
          }
          return i;
        })(s)
      : q(s, ",")),
      (l = l.flatMap((e) => ar(e))));
    let u = ar(c);
    for (let e of u) for (let t of l) r.push(n + t + e);
    return r;
  }
  var ir = /^[a-z]+$/;
  function lr() {
    throw new Error("No `loadModule` function provided to `compile`");
  }
  function sr() {
    throw new Error("No `loadStylesheet` function provided to `compile`");
  }
  async function cr(
    e,
    { base: t = "", from: r, loadModule: n = lr, loadStylesheet: o = sr } = {},
  ) {
    let l = 0;
    ((e = [j({ base: t }, e)]), (l |= await dt(e, t, o, 0, void 0 !== r)));
    let s = null,
      u = new c(),
      d = new Map(),
      f = new Map(),
      p = [],
      g = null,
      v = null,
      b = [],
      y = [],
      x = [],
      C = [],
      E = null;
    k(e, (e, t) => {
      if ("at-rule" !== e.kind) return;
      let r = K(t);
      if (
        "@tailwind" === e.name &&
        ("utilities" === e.params || e.params.startsWith("utilities"))
      ) {
        if (null !== v) return w.Replace([]);
        if (r.context.reference) return w.Replace([]);
        let t = q(e.params, " ");
        for (let e of t)
          if (e.startsWith("source(")) {
            let t = e.slice(7, -1);
            if ("none" === t) {
              E = t;
              continue;
            }
            if (
              ('"' === t[0] && '"' !== t[t.length - 1]) ||
              ("'" === t[0] && "'" !== t[t.length - 1]) ||
              ("'" !== t[0] && '"' !== t[0])
            )
              throw new Error("`source(…)` paths must be quoted.");
            E = {
              base: r.context.sourceBase ?? r.context.base,
              pattern: t.slice(1, -1),
            };
          }
        ((v = e), (l |= 16));
      }
      if ("@utility" === e.name) {
        if (null !== r.parent) throw new Error("`@utility` cannot be nested.");
        if (0 === e.nodes.length)
          throw new Error(
            `\`@utility ${e.params}\` is empty. Utilities should include at least one property.`,
          );
        let t = (function (e) {
          let t = e.params;
          return Ne.test(t)
            ? (r) => {
                let n = {
                  "--value": {
                    usedSpacingInteger: !1,
                    usedSpacingNumber: !1,
                    themeKeys: new Set(),
                    literals: new Set(),
                  },
                  "--modifier": {
                    usedSpacingInteger: !1,
                    usedSpacingNumber: !1,
                    themeKeys: new Set(),
                    literals: new Set(),
                  },
                };
                (k(e.nodes, (e) => {
                  if (
                    "declaration" !== e.kind ||
                    !e.value ||
                    (!e.value.includes("--value(") &&
                      !e.value.includes("--modifier("))
                  )
                    return;
                  let t = m(e.value);
                  (k(t, (e) => {
                    if ("function" !== e.kind) return;
                    if (
                      !(
                        "--spacing" !== e.value ||
                        (n["--modifier"].usedSpacingNumber &&
                          n["--value"].usedSpacingNumber)
                      )
                    )
                      return (
                        k(e.nodes, (e) => {
                          if (
                            "function" !== e.kind ||
                            ("--value" !== e.value && "--modifier" !== e.value)
                          )
                            return;
                          let t = e.value;
                          for (let r of e.nodes)
                            if ("word" === r.kind)
                              if ("integer" === r.value)
                                n[t].usedSpacingInteger ||= !0;
                              else if (
                                "number" === r.value &&
                                ((n[t].usedSpacingNumber ||= !0),
                                n["--modifier"].usedSpacingNumber &&
                                  n["--value"].usedSpacingNumber)
                              )
                                return w.Stop;
                        }),
                        w.Continue
                      );
                    if ("--value" !== e.value && "--modifier" !== e.value)
                      return;
                    let t = q(h(e.nodes), ",");
                    for (let [e, r] of t.entries())
                      ((r = r.replace(/\\\*/g, "*")),
                        (r = r.replace(/--(.*?)\s--(.*?)/g, "--$1-*--$2")),
                        (r = r.replace(/\s+/g, "")),
                        (r = r.replace(/(-\*){2,}/g, "-*")),
                        "-" === r[0] &&
                          "-" === r[1] &&
                          !r.includes("-*") &&
                          (r += "-*"),
                        (t[e] = r));
                    e.nodes = m(t.join(","));
                    for (let t of e.nodes)
                      if (
                        "word" !== t.kind ||
                        ('"' !== t.value[0] && "'" !== t.value[0]) ||
                        t.value[0] !== t.value[t.value.length - 1]
                      ) {
                        if (
                          "word" === t.kind &&
                          "-" === t.value[0] &&
                          "-" === t.value[1]
                        ) {
                          let r = t.value.replace(/-\*.*$/g, "");
                          n[e.value].themeKeys.add(r);
                        } else if (
                          "word" === t.kind &&
                          ("[" !== t.value[0] ||
                            "]" !== t.value[t.value.length - 1]) &&
                          !Me.includes(t.value)
                        ) {
                          console.warn(
                            `Unsupported bare value data type: "${t.value}".\nOnly valid data types are: ${Me.map((e) => `"${e}"`).join(", ")}.\n`,
                          );
                          let r = t.value,
                            n = structuredClone(e),
                            o = "¶";
                          k(n.nodes, (e) => {
                            if ("word" === e.kind && e.value === r)
                              return w.ReplaceSkip({ kind: "word", value: o });
                          });
                          let a = "^".repeat(h([t]).length),
                            i = h([n]).indexOf(o),
                            l = [
                              "```css",
                              h([e]),
                              " ".repeat(i) + a,
                              "```",
                            ].join("\n");
                          console.warn(l);
                        }
                      } else {
                        let r = t.value.slice(1, -1);
                        n[e.value].literals.add(r);
                      }
                  }),
                    (e.value = h(t)));
                }),
                  r.utilities.functional(t.slice(0, -2), (t) => {
                    let n = V(e),
                      o = t.value,
                      a = t.modifier;
                    if (null === o) return;
                    let i = !1,
                      l = !1,
                      s = !1,
                      c = !1,
                      u = new Map(),
                      d = !1;
                    if (
                      (k([n], (e, t) => {
                        let n = t.parent;
                        if (
                          ("rule" !== n?.kind && "at-rule" !== n?.kind) ||
                          "declaration" !== e.kind ||
                          !e.value
                        )
                          return;
                        let f = !1,
                          p = m(e.value);
                        if (
                          (k(p, (t) => {
                            if ("function" === t.kind) {
                              if ("--value" === t.value) {
                                i = !0;
                                let a = Be(o, t, r);
                                return a
                                  ? ((l = !0),
                                    a.ratio ? (d = !0) : u.set(e, n),
                                    w.ReplaceSkip(a.nodes))
                                  : ((i ||= !1), (f = !0), w.Stop);
                              }
                              if ("--modifier" === t.value) {
                                if (null === a) return ((f = !0), w.Stop);
                                s = !0;
                                let e = Be(a, t, r);
                                return e
                                  ? ((c = !0), w.ReplaceSkip(e.nodes))
                                  : ((s ||= !1), (f = !0), w.Stop);
                              }
                            }
                          }),
                          f)
                        )
                          return w.ReplaceSkip([]);
                        e.value = h(p);
                      }),
                      (i && !l) || (s && !c) || (d && c) || (a && !d && !c))
                    )
                      return null;
                    if (d)
                      for (let [e, t] of u) {
                        let r = t.nodes.indexOf(e);
                        -1 !== r && t.nodes.splice(r, 1);
                      }
                    return n.nodes;
                  }),
                  r.utilities.suggest(t.slice(0, -2), () => {
                    let e = [],
                      t = [];
                    for (let [
                      o,
                      {
                        literals: a,
                        usedSpacingNumber: i,
                        usedSpacingInteger: l,
                        themeKeys: s,
                      },
                    ] of [
                      [e, n["--value"]],
                      [t, n["--modifier"]],
                    ]) {
                      for (let e of a) o.push(e);
                      if (i) o.push(...Oe);
                      else if (l) for (let e of Oe) Ae(e) && o.push(e);
                      for (let e of r.theme.keysInNamespaces(s))
                        o.push(e.replace(Le, (e, t, r) => `${t}.${r}`));
                    }
                    return [{ values: e, modifiers: t }];
                  }));
              }
            : Ee.test(t)
              ? (r) => {
                  r.utilities.static(t, () => e.nodes.map(V));
                }
              : null;
        })(e);
        if (null === t) {
          if (!e.params.endsWith("-*")) {
            if (e.params.endsWith("*"))
              throw new Error(
                `\`@utility ${e.params}\` defines an invalid utility name. A functional utility must end in \`-*\`.`,
              );
            if (e.params.includes("*"))
              throw new Error(
                `\`@utility ${e.params}\` defines an invalid utility name. The dynamic portion marked by \`-*\` must appear once at the end.`,
              );
          }
          throw new Error(
            `\`@utility ${e.params}\` defines an invalid utility name. Utilities should be alphanumeric and start with a lowercase letter.`,
          );
        }
        p.push(t);
      }
      if ("@source" === e.name) {
        if (e.nodes.length > 0)
          throw new Error("`@source` cannot have a body.");
        if (null !== r.parent) throw new Error("`@source` cannot be nested.");
        let t = !1,
          n = !1,
          o = e.params;
        if (
          ("n" === o[0] && o.startsWith("not ") && ((t = !0), (o = o.slice(4))),
          "i" === o[0] &&
            o.startsWith("inline(") &&
            ((n = !0), (o = o.slice(7, -1))),
          ('"' === o[0] && '"' !== o[o.length - 1]) ||
            ("'" === o[0] && "'" !== o[o.length - 1]) ||
            ("'" !== o[0] && '"' !== o[0]))
        )
          throw new Error("`@source` paths must be quoted.");
        let a = o.slice(1, -1);
        if (n) {
          let e = t ? C : x,
            r = q(a, " ");
          for (let t of r) for (let r of ar(t)) e.push(r);
        } else y.push({ base: r.context.base, pattern: a, negated: t });
        return w.ReplaceSkip([]);
      }
      if (
        ("@variant" === e.name &&
          (null === r.parent
            ? 0 === e.nodes.length
              ? (e.name = "@custom-variant")
              : (k(e.nodes, (t) => {
                  if ("at-rule" === t.kind && "@slot" === t.name)
                    return ((e.name = "@custom-variant"), w.Stop);
                }),
                "@variant" === e.name && b.push(e))
            : b.push(e)),
        "@custom-variant" === e.name)
      ) {
        if (null !== r.parent)
          throw new Error("`@custom-variant` cannot be nested.");
        let [t, n] = q(e.params, " ");
        if (!Ge.test(t))
          throw new Error(
            `\`@custom-variant ${t}\` defines an invalid variant name. Variants should only contain alphanumeric, dashes, or underscore characters and start with a lowercase letter or number.`,
          );
        if (e.nodes.length > 0 && n)
          throw new Error(
            `\`@custom-variant ${t}\` cannot have both a selector and a body.`,
          );
        if (0 === e.nodes.length) {
          if (!n)
            throw new Error(
              `\`@custom-variant ${t}\` has no selector or body.`,
            );
          let e = q(n.slice(1, -1), ",");
          if (0 === e.length || e.some((e) => "" === e.trim()))
            throw new Error(
              `\`@custom-variant ${t} (${e.join(",")})\` selector is invalid.`,
            );
          let r = [],
            o = [];
          for (let t of e)
            ((t = t.trim()), "@" === t[0] ? r.push(t) : o.push(t));
          (d.set(t, (e) => {
            e.variants.static(
              t,
              (e) => {
                let t = [];
                o.length > 0 && t.push($(o.join(", "), e.nodes));
                for (let n of r) t.push(z(n, e.nodes));
                e.nodes = t;
              },
              { compounds: Xe([...o, ...r]) },
            );
          }),
            f.set(t, new Set()));
        } else {
          let r = new Set();
          (k(e.nodes, (e) => {
            "at-rule" === e.kind && "@variant" === e.name && r.add(e.params);
          }),
            d.set(t, (r) => {
              r.variants.fromAst(t, e.nodes, r);
            }),
            f.set(t, r));
        }
        return w.ReplaceSkip([]);
      }
      if ("@media" === e.name) {
        let t = q(e.params, " "),
          n = [];
        for (let o of t)
          if (o.startsWith("source(")) {
            let t = o.slice(7, -1);
            k(e.nodes, (e) => {
              if (
                "at-rule" === e.kind &&
                "@tailwind" === e.name &&
                "utilities" === e.params
              )
                return (
                  (e.params += ` source(${t})`),
                  w.ReplaceStop([j({ sourceBase: r.context.base }, [e])])
                );
            });
          } else if (o.startsWith("theme(")) {
            let t = o.slice(6, -1),
              r = t.includes("reference");
            k(e.nodes, (e) => {
              if ("context" !== e.kind) {
                if ("at-rule" !== e.kind) {
                  if (r)
                    throw new Error(
                      'Files imported with `@import "…" theme(reference)` must only contain `@theme` blocks.\nUse `@reference "…";` instead.',
                    );
                  return w.Continue;
                }
                if ("@theme" === e.name) return ((e.params += " " + t), w.Skip);
              }
            });
          } else if (o.startsWith("prefix(")) {
            let t = o.slice(7, -1);
            k(e.nodes, (e) => {
              if ("at-rule" === e.kind && "@theme" === e.name)
                return ((e.params += ` prefix(${t})`), w.Skip);
            });
          } else
            "important" === o
              ? (s = !0)
              : "reference" === o
                ? (e.nodes = [j({ reference: !0 }, e.nodes)])
                : n.push(o);
        if (n.length > 0) e.params = n.join(" ");
        else if (t.length > 0) return w.Replace(e.nodes);
        return w.Continue;
      }
      if ("@theme" === e.name) {
        let [t, n] = (function (e) {
          let t = 0,
            r = null;
          for (let n of q(e, " "))
            "reference" === n
              ? (t |= 2)
              : "inline" === n
                ? (t |= 1)
                : "default" === n
                  ? (t |= 4)
                  : "static" === n
                    ? (t |= 8)
                    : n.startsWith("prefix(") &&
                      n.endsWith(")") &&
                      (r = n.slice(7, -1));
          return [t, r];
        })(e.params);
        if (((l |= 64), r.context.reference && (t |= 2), n)) {
          if (!ir.test(n))
            throw new Error(
              `The prefix "${n}" is invalid. Prefixes must be lowercase ASCII letters (a-z) only.`,
            );
          u.prefix = n;
        }
        return (
          k(e.nodes, (r) => {
            if ("at-rule" === r.kind && "@keyframes" === r.name)
              return (u.addKeyframes(r), w.Skip);
            if ("comment" === r.kind) return;
            if ("declaration" === r.kind && r.property.startsWith("--"))
              return void u.add(i(r.property), r.value ?? "", t, r.src);
            let n = N([A(e.name, e.params, [r])])
              .split("\n")
              .map(
                (e, t, r) => `${0 === t || t >= r.length - 2 ? " " : ">"} ${e}`,
              )
              .join("\n");
            throw new Error(
              `\`@theme\` blocks must only contain custom properties or \`@keyframes\`.\n\n${n}`,
            );
          }),
          g
            ? w.ReplaceSkip([])
            : ((g = $(":root, :host", [])), (g.src = e.src), w.ReplaceSkip(g))
        );
      }
    });
    let O = rt(u);
    if ((s && (O.important = s), C.length > 0))
      for (let e of C) O.invalidCandidates.add(e);
    l |= await tr({
      designSystem: O,
      base: t,
      ast: e,
      loadModule: n,
      sources: y,
    });
    for (let e of d.keys()) O.variants.static(e, () => {});
    for (let e of (function (e, t) {
      let r = new Set(),
        n = new Set(),
        o = [];
      function a(i, l = []) {
        if (e.has(i) && !r.has(i)) {
          (n.has(i) && t.onCircularDependency?.(l, i), n.add(i));
          for (let t of e.get(i) ?? []) (l.push(i), a(t, l), l.pop());
          (r.add(i), n.delete(i), o.push(i));
        }
      }
      for (let t of e.keys()) a(t);
      return o;
    })(f, {
      onCircularDependency(e, t) {
        let r = N(
          e.map((r, n) =>
            A("@custom-variant", r, [A("@variant", e[n + 1] ?? t, [])]),
          ),
        )
          .replaceAll(";", " { … }")
          .replace(`@custom-variant ${t} {`, `@custom-variant ${t} { /* ← */`);
        throw new Error(
          `Circular dependency detected in custom variants:\n\n${r}`,
        );
      },
    }))
      d.get(e)?.(O);
    for (let e of p) e(O);
    if (g) {
      let t = [];
      for (let [e, r] of O.theme.entries()) {
        if (2 & r.options) continue;
        let n = S(a(e), r.value);
        ((n.src = r.src), t.push(n));
      }
      let r = O.theme.getKeyframes();
      for (let t of r) e.push(j({ theme: !0 }, [T([t])]));
      g.nodes = [j({ theme: !0 }, t)];
    }
    if (((l |= tt(e, O)), (l |= Ze(e, O)), (l |= ct(e, O)), v)) {
      let e = v;
      ((e.kind = "context"), (e.context = {}));
    }
    return (
      k(e, (e) => {
        if ("at-rule" === e.kind)
          return "@utility" === e.name ? w.Replace([]) : w.Skip;
      }),
      {
        designSystem: O,
        ast: e,
        sources: y,
        root: E,
        utilitiesNode: v,
        features: l,
        inlineCandidates: x,
      }
    );
  }
  async function ur(e, r = {}) {
    let n = t(e, { from: r.from }),
      o = await (async function (e, t = {}) {
        let {
          designSystem: r,
          ast: n,
          sources: o,
          root: a,
          utilitiesNode: i,
          features: l,
          inlineCandidates: s,
        } = await cr(e, t);
        function c(e) {
          r.invalidCandidates.add(e);
        }
        n.unshift(
          C("! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com "),
        );
        let u = new Set(),
          d = null,
          f = 0,
          p = !1;
        for (let e of s) r.invalidCandidates.has(e) || (u.add(e), (p = !0));
        return {
          sources: o,
          root: a,
          features: l,
          build(o) {
            if (0 === l) return e;
            if (!i) return ((d ??= E(n, r, t.polyfills)), d);
            let a = p,
              s = !1;
            p = !1;
            let h = u.size;
            for (let e of o)
              if (!r.invalidCandidates.has(e))
                if ("-" === e[0] && "-" === e[1]) {
                  let t = r.theme.markUsedVariable(e);
                  ((a ||= t), (s ||= t));
                } else (u.add(e), (a ||= u.size !== h));
            if (!a) return ((d ??= E(n, r, t.polyfills)), d);
            let m = ot(u, r, { onInvalidCandidate: c }).astNodes;
            return (
              t.from &&
                k(m, (e) => {
                  e.src ??= i.src;
                }),
              s || f !== m.length
                ? ((f = m.length), (i.nodes = m), (d = E(n, r, t.polyfills)), d)
                : ((d ??= E(n, r, t.polyfills)), d)
            );
          },
        };
      })(n, r),
      a = n,
      i = e;
    return {
      ...o,
      build(e) {
        let t = o.build(e);
        return (t === a || ((i = N(t, !!r.from)), (a = t)), i);
      },
      buildSourceMap: () => nr({ ast: a }),
    };
  }
  var dr,
    fr = {
      index:
        "@layer theme, base, components, utilities;\n\n@import './theme.css' layer(theme);\n@import './preflight.css' layer(base);\n@import './utilities.css' layer(utilities);\n",
      preflight:
        "/*\n  1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)\n  2. Remove default margins and padding\n  3. Reset all borders.\n*/\n\n*,\n::after,\n::before,\n::backdrop,\n::file-selector-button {\n  box-sizing: border-box; /* 1 */\n  margin: 0; /* 2 */\n  padding: 0; /* 2 */\n  border: 0 solid; /* 3 */\n}\n\n/*\n  1. Use a consistent sensible line-height in all browsers.\n  2. Prevent adjustments of font size after orientation changes in iOS.\n  3. Use a more readable tab size.\n  4. Use the user's configured `sans` font-family by default.\n  5. Use the user's configured `sans` font-feature-settings by default.\n  6. Use the user's configured `sans` font-variation-settings by default.\n  7. Disable tap highlights on iOS.\n*/\n\nhtml,\n:host {\n  line-height: 1.5; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n  tab-size: 4; /* 3 */\n  font-family: --theme(\n    --default-font-family,\n    ui-sans-serif,\n    system-ui,\n    sans-serif,\n    'Apple Color Emoji',\n    'Segoe UI Emoji',\n    'Segoe UI Symbol',\n    'Noto Color Emoji'\n  ); /* 4 */\n  font-feature-settings: --theme(--default-font-feature-settings, normal); /* 5 */\n  font-variation-settings: --theme(--default-font-variation-settings, normal); /* 6 */\n  -webkit-tap-highlight-color: transparent; /* 7 */\n}\n\n/*\n  1. Add the correct height in Firefox.\n  2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)\n  3. Reset the default border style to a 1px solid border.\n*/\n\nhr {\n  height: 0; /* 1 */\n  color: inherit; /* 2 */\n  border-top-width: 1px; /* 3 */\n}\n\n/*\n  Add the correct text decoration in Chrome, Edge, and Safari.\n*/\n\nabbr:where([title]) {\n  -webkit-text-decoration: underline dotted;\n  text-decoration: underline dotted;\n}\n\n/*\n  Remove the default font size and weight for headings.\n*/\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: inherit;\n  font-weight: inherit;\n}\n\n/*\n  Reset links to optimize for opt-in styling instead of opt-out.\n*/\n\na {\n  color: inherit;\n  -webkit-text-decoration: inherit;\n  text-decoration: inherit;\n}\n\n/*\n  Add the correct font weight in Edge and Safari.\n*/\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/*\n  1. Use the user's configured `mono` font-family by default.\n  2. Use the user's configured `mono` font-feature-settings by default.\n  3. Use the user's configured `mono` font-variation-settings by default.\n  4. Correct the odd `em` font sizing in all browsers.\n*/\n\ncode,\nkbd,\nsamp,\npre {\n  font-family: --theme(\n    --default-mono-font-family,\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    Monaco,\n    Consolas,\n    'Liberation Mono',\n    'Courier New',\n    monospace\n  ); /* 1 */\n  font-feature-settings: --theme(--default-mono-font-feature-settings, normal); /* 2 */\n  font-variation-settings: --theme(--default-mono-font-variation-settings, normal); /* 3 */\n  font-size: 1em; /* 4 */\n}\n\n/*\n  Add the correct font size in all browsers.\n*/\n\nsmall {\n  font-size: 80%;\n}\n\n/*\n  Prevent `sub` and `sup` elements from affecting the line height in all browsers.\n*/\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/*\n  1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)\n  2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)\n  3. Remove gaps between table borders by default.\n*/\n\ntable {\n  text-indent: 0; /* 1 */\n  border-color: inherit; /* 2 */\n  border-collapse: collapse; /* 3 */\n}\n\n/*\n  Use the modern Firefox focus style for all focusable elements.\n*/\n\n:-moz-focusring {\n  outline: auto;\n}\n\n/*\n  Add the correct vertical alignment in Chrome and Firefox.\n*/\n\nprogress {\n  vertical-align: baseline;\n}\n\n/*\n  Add the correct display in Chrome and Safari.\n*/\n\nsummary {\n  display: list-item;\n}\n\n/*\n  Make lists unstyled by default.\n*/\n\nol,\nul,\nmenu {\n  list-style: none;\n}\n\n/*\n  1. Make replaced elements `display: block` by default. (https://github.com/mozdevs/cssremedy/issues/14)\n  2. Add `vertical-align: middle` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)\n      This can trigger a poorly considered lint error in some tools but is included by design.\n*/\n\nimg,\nsvg,\nvideo,\ncanvas,\naudio,\niframe,\nembed,\nobject {\n  display: block; /* 1 */\n  vertical-align: middle; /* 2 */\n}\n\n/*\n  Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)\n*/\n\nimg,\nvideo {\n  max-width: 100%;\n  height: auto;\n}\n\n/*\n  1. Inherit font styles in all browsers.\n  2. Remove border radius in all browsers.\n  3. Remove background color in all browsers.\n  4. Ensure consistent opacity for disabled states in all browsers.\n*/\n\nbutton,\ninput,\nselect,\noptgroup,\ntextarea,\n::file-selector-button {\n  font: inherit; /* 1 */\n  font-feature-settings: inherit; /* 1 */\n  font-variation-settings: inherit; /* 1 */\n  letter-spacing: inherit; /* 1 */\n  color: inherit; /* 1 */\n  border-radius: 0; /* 2 */\n  background-color: transparent; /* 3 */\n  opacity: 1; /* 4 */\n}\n\n/*\n  Restore default font weight.\n*/\n\n:where(select:is([multiple], [size])) optgroup {\n  font-weight: bolder;\n}\n\n/*\n  Restore indentation.\n*/\n\n:where(select:is([multiple], [size])) optgroup option {\n  padding-inline-start: 20px;\n}\n\n/*\n  Restore space after button.\n*/\n\n::file-selector-button {\n  margin-inline-end: 4px;\n}\n\n/*\n  Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)\n*/\n\n::placeholder {\n  opacity: 1;\n}\n\n/*\n  Set the default placeholder color to a semi-transparent version of the current text color in browsers that do not\n  crash when using `color-mix(…)` with `currentcolor`. (https://github.com/tailwindlabs/tailwindcss/issues/17194)\n*/\n\n@supports (not (-webkit-appearance: -apple-pay-button)) /* Not Safari */ or\n  (contain-intrinsic-size: 1px) /* Safari 17+ */ {\n  ::placeholder {\n    color: color-mix(in oklab, currentcolor 50%, transparent);\n  }\n}\n\n/*\n  Prevent resizing textareas horizontally by default.\n*/\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n  Remove the inner padding in Chrome and Safari on macOS.\n*/\n\n::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/*\n  1. Ensure date/time inputs have the same height when empty in iOS Safari.\n  2. Ensure text alignment can be changed on date/time inputs in iOS Safari.\n*/\n\n::-webkit-date-and-time-value {\n  min-height: 1lh; /* 1 */\n  text-align: inherit; /* 2 */\n}\n\n/*\n  Prevent height from changing on date/time inputs in macOS Safari when the input is set to `display: block`.\n*/\n\n::-webkit-datetime-edit {\n  display: inline-flex;\n}\n\n/*\n  Remove excess padding from pseudo-elements in date/time inputs to ensure consistent height across browsers.\n*/\n\n::-webkit-datetime-edit-fields-wrapper {\n  padding: 0;\n}\n\n::-webkit-datetime-edit,\n::-webkit-datetime-edit-year-field,\n::-webkit-datetime-edit-month-field,\n::-webkit-datetime-edit-day-field,\n::-webkit-datetime-edit-hour-field,\n::-webkit-datetime-edit-minute-field,\n::-webkit-datetime-edit-second-field,\n::-webkit-datetime-edit-millisecond-field,\n::-webkit-datetime-edit-meridiem-field {\n  padding-block: 0;\n}\n\n/*\n  Center dropdown marker shown on inputs with paired `<datalist>`s in Chrome. (https://github.com/tailwindlabs/tailwindcss/issues/18499)\n*/\n\n::-webkit-calendar-picker-indicator {\n  line-height: 1;\n}\n\n/*\n  Remove the additional `:invalid` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)\n*/\n\n:-moz-ui-invalid {\n  box-shadow: none;\n}\n\n/*\n  Correct the inability to style the border radius in iOS Safari.\n*/\n\nbutton,\ninput:where([type='button'], [type='reset'], [type='submit']),\n::file-selector-button {\n  appearance: button;\n}\n\n/*\n  Correct the cursor style of increment and decrement buttons in Safari.\n*/\n\n::-webkit-inner-spin-button,\n::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/*\n  Make elements with the HTML hidden attribute stay hidden by default.\n*/\n\n[hidden]:where(:not([hidden='until-found'])) {\n  display: none !important;\n}\n",
      theme:
        "@theme default {\n  --font-sans:\n    ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',\n    'Noto Color Emoji';\n  --font-serif: ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif;\n  --font-mono:\n    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',\n    monospace;\n\n  --color-red-50: oklch(97.1% 0.013 17.38);\n  --color-red-100: oklch(93.6% 0.032 17.717);\n  --color-red-200: oklch(88.5% 0.062 18.334);\n  --color-red-300: oklch(80.8% 0.114 19.571);\n  --color-red-400: oklch(70.4% 0.191 22.216);\n  --color-red-500: oklch(63.7% 0.237 25.331);\n  --color-red-600: oklch(57.7% 0.245 27.325);\n  --color-red-700: oklch(50.5% 0.213 27.518);\n  --color-red-800: oklch(44.4% 0.177 26.899);\n  --color-red-900: oklch(39.6% 0.141 25.723);\n  --color-red-950: oklch(25.8% 0.092 26.042);\n\n  --color-orange-50: oklch(98% 0.016 73.684);\n  --color-orange-100: oklch(95.4% 0.038 75.164);\n  --color-orange-200: oklch(90.1% 0.076 70.697);\n  --color-orange-300: oklch(83.7% 0.128 66.29);\n  --color-orange-400: oklch(75% 0.183 55.934);\n  --color-orange-500: oklch(70.5% 0.213 47.604);\n  --color-orange-600: oklch(64.6% 0.222 41.116);\n  --color-orange-700: oklch(55.3% 0.195 38.402);\n  --color-orange-800: oklch(47% 0.157 37.304);\n  --color-orange-900: oklch(40.8% 0.123 38.172);\n  --color-orange-950: oklch(26.6% 0.079 36.259);\n\n  --color-amber-50: oklch(98.7% 0.022 95.277);\n  --color-amber-100: oklch(96.2% 0.059 95.617);\n  --color-amber-200: oklch(92.4% 0.12 95.746);\n  --color-amber-300: oklch(87.9% 0.169 91.605);\n  --color-amber-400: oklch(82.8% 0.189 84.429);\n  --color-amber-500: oklch(76.9% 0.188 70.08);\n  --color-amber-600: oklch(66.6% 0.179 58.318);\n  --color-amber-700: oklch(55.5% 0.163 48.998);\n  --color-amber-800: oklch(47.3% 0.137 46.201);\n  --color-amber-900: oklch(41.4% 0.112 45.904);\n  --color-amber-950: oklch(27.9% 0.077 45.635);\n\n  --color-yellow-50: oklch(98.7% 0.026 102.212);\n  --color-yellow-100: oklch(97.3% 0.071 103.193);\n  --color-yellow-200: oklch(94.5% 0.129 101.54);\n  --color-yellow-300: oklch(90.5% 0.182 98.111);\n  --color-yellow-400: oklch(85.2% 0.199 91.936);\n  --color-yellow-500: oklch(79.5% 0.184 86.047);\n  --color-yellow-600: oklch(68.1% 0.162 75.834);\n  --color-yellow-700: oklch(55.4% 0.135 66.442);\n  --color-yellow-800: oklch(47.6% 0.114 61.907);\n  --color-yellow-900: oklch(42.1% 0.095 57.708);\n  --color-yellow-950: oklch(28.6% 0.066 53.813);\n\n  --color-lime-50: oklch(98.6% 0.031 120.757);\n  --color-lime-100: oklch(96.7% 0.067 122.328);\n  --color-lime-200: oklch(93.8% 0.127 124.321);\n  --color-lime-300: oklch(89.7% 0.196 126.665);\n  --color-lime-400: oklch(84.1% 0.238 128.85);\n  --color-lime-500: oklch(76.8% 0.233 130.85);\n  --color-lime-600: oklch(64.8% 0.2 131.684);\n  --color-lime-700: oklch(53.2% 0.157 131.589);\n  --color-lime-800: oklch(45.3% 0.124 130.933);\n  --color-lime-900: oklch(40.5% 0.101 131.063);\n  --color-lime-950: oklch(27.4% 0.072 132.109);\n\n  --color-green-50: oklch(98.2% 0.018 155.826);\n  --color-green-100: oklch(96.2% 0.044 156.743);\n  --color-green-200: oklch(92.5% 0.084 155.995);\n  --color-green-300: oklch(87.1% 0.15 154.449);\n  --color-green-400: oklch(79.2% 0.209 151.711);\n  --color-green-500: oklch(72.3% 0.219 149.579);\n  --color-green-600: oklch(62.7% 0.194 149.214);\n  --color-green-700: oklch(52.7% 0.154 150.069);\n  --color-green-800: oklch(44.8% 0.119 151.328);\n  --color-green-900: oklch(39.3% 0.095 152.535);\n  --color-green-950: oklch(26.6% 0.065 152.934);\n\n  --color-emerald-50: oklch(97.9% 0.021 166.113);\n  --color-emerald-100: oklch(95% 0.052 163.051);\n  --color-emerald-200: oklch(90.5% 0.093 164.15);\n  --color-emerald-300: oklch(84.5% 0.143 164.978);\n  --color-emerald-400: oklch(76.5% 0.177 163.223);\n  --color-emerald-500: oklch(69.6% 0.17 162.48);\n  --color-emerald-600: oklch(59.6% 0.145 163.225);\n  --color-emerald-700: oklch(50.8% 0.118 165.612);\n  --color-emerald-800: oklch(43.2% 0.095 166.913);\n  --color-emerald-900: oklch(37.8% 0.077 168.94);\n  --color-emerald-950: oklch(26.2% 0.051 172.552);\n\n  --color-teal-50: oklch(98.4% 0.014 180.72);\n  --color-teal-100: oklch(95.3% 0.051 180.801);\n  --color-teal-200: oklch(91% 0.096 180.426);\n  --color-teal-300: oklch(85.5% 0.138 181.071);\n  --color-teal-400: oklch(77.7% 0.152 181.912);\n  --color-teal-500: oklch(70.4% 0.14 182.503);\n  --color-teal-600: oklch(60% 0.118 184.704);\n  --color-teal-700: oklch(51.1% 0.096 186.391);\n  --color-teal-800: oklch(43.7% 0.078 188.216);\n  --color-teal-900: oklch(38.6% 0.063 188.416);\n  --color-teal-950: oklch(27.7% 0.046 192.524);\n\n  --color-cyan-50: oklch(98.4% 0.019 200.873);\n  --color-cyan-100: oklch(95.6% 0.045 203.388);\n  --color-cyan-200: oklch(91.7% 0.08 205.041);\n  --color-cyan-300: oklch(86.5% 0.127 207.078);\n  --color-cyan-400: oklch(78.9% 0.154 211.53);\n  --color-cyan-500: oklch(71.5% 0.143 215.221);\n  --color-cyan-600: oklch(60.9% 0.126 221.723);\n  --color-cyan-700: oklch(52% 0.105 223.128);\n  --color-cyan-800: oklch(45% 0.085 224.283);\n  --color-cyan-900: oklch(39.8% 0.07 227.392);\n  --color-cyan-950: oklch(30.2% 0.056 229.695);\n\n  --color-sky-50: oklch(97.7% 0.013 236.62);\n  --color-sky-100: oklch(95.1% 0.026 236.824);\n  --color-sky-200: oklch(90.1% 0.058 230.902);\n  --color-sky-300: oklch(82.8% 0.111 230.318);\n  --color-sky-400: oklch(74.6% 0.16 232.661);\n  --color-sky-500: oklch(68.5% 0.169 237.323);\n  --color-sky-600: oklch(58.8% 0.158 241.966);\n  --color-sky-700: oklch(50% 0.134 242.749);\n  --color-sky-800: oklch(44.3% 0.11 240.79);\n  --color-sky-900: oklch(39.1% 0.09 240.876);\n  --color-sky-950: oklch(29.3% 0.066 243.157);\n\n  --color-blue-50: oklch(97% 0.014 254.604);\n  --color-blue-100: oklch(93.2% 0.032 255.585);\n  --color-blue-200: oklch(88.2% 0.059 254.128);\n  --color-blue-300: oklch(80.9% 0.105 251.813);\n  --color-blue-400: oklch(70.7% 0.165 254.624);\n  --color-blue-500: oklch(62.3% 0.214 259.815);\n  --color-blue-600: oklch(54.6% 0.245 262.881);\n  --color-blue-700: oklch(48.8% 0.243 264.376);\n  --color-blue-800: oklch(42.4% 0.199 265.638);\n  --color-blue-900: oklch(37.9% 0.146 265.522);\n  --color-blue-950: oklch(28.2% 0.091 267.935);\n\n  --color-indigo-50: oklch(96.2% 0.018 272.314);\n  --color-indigo-100: oklch(93% 0.034 272.788);\n  --color-indigo-200: oklch(87% 0.065 274.039);\n  --color-indigo-300: oklch(78.5% 0.115 274.713);\n  --color-indigo-400: oklch(67.3% 0.182 276.935);\n  --color-indigo-500: oklch(58.5% 0.233 277.117);\n  --color-indigo-600: oklch(51.1% 0.262 276.966);\n  --color-indigo-700: oklch(45.7% 0.24 277.023);\n  --color-indigo-800: oklch(39.8% 0.195 277.366);\n  --color-indigo-900: oklch(35.9% 0.144 278.697);\n  --color-indigo-950: oklch(25.7% 0.09 281.288);\n\n  --color-violet-50: oklch(96.9% 0.016 293.756);\n  --color-violet-100: oklch(94.3% 0.029 294.588);\n  --color-violet-200: oklch(89.4% 0.057 293.283);\n  --color-violet-300: oklch(81.1% 0.111 293.571);\n  --color-violet-400: oklch(70.2% 0.183 293.541);\n  --color-violet-500: oklch(60.6% 0.25 292.717);\n  --color-violet-600: oklch(54.1% 0.281 293.009);\n  --color-violet-700: oklch(49.1% 0.27 292.581);\n  --color-violet-800: oklch(43.2% 0.232 292.759);\n  --color-violet-900: oklch(38% 0.189 293.745);\n  --color-violet-950: oklch(28.3% 0.141 291.089);\n\n  --color-purple-50: oklch(97.7% 0.014 308.299);\n  --color-purple-100: oklch(94.6% 0.033 307.174);\n  --color-purple-200: oklch(90.2% 0.063 306.703);\n  --color-purple-300: oklch(82.7% 0.119 306.383);\n  --color-purple-400: oklch(71.4% 0.203 305.504);\n  --color-purple-500: oklch(62.7% 0.265 303.9);\n  --color-purple-600: oklch(55.8% 0.288 302.321);\n  --color-purple-700: oklch(49.6% 0.265 301.924);\n  --color-purple-800: oklch(43.8% 0.218 303.724);\n  --color-purple-900: oklch(38.1% 0.176 304.987);\n  --color-purple-950: oklch(29.1% 0.149 302.717);\n\n  --color-fuchsia-50: oklch(97.7% 0.017 320.058);\n  --color-fuchsia-100: oklch(95.2% 0.037 318.852);\n  --color-fuchsia-200: oklch(90.3% 0.076 319.62);\n  --color-fuchsia-300: oklch(83.3% 0.145 321.434);\n  --color-fuchsia-400: oklch(74% 0.238 322.16);\n  --color-fuchsia-500: oklch(66.7% 0.295 322.15);\n  --color-fuchsia-600: oklch(59.1% 0.293 322.896);\n  --color-fuchsia-700: oklch(51.8% 0.253 323.949);\n  --color-fuchsia-800: oklch(45.2% 0.211 324.591);\n  --color-fuchsia-900: oklch(40.1% 0.17 325.612);\n  --color-fuchsia-950: oklch(29.3% 0.136 325.661);\n\n  --color-pink-50: oklch(97.1% 0.014 343.198);\n  --color-pink-100: oklch(94.8% 0.028 342.258);\n  --color-pink-200: oklch(89.9% 0.061 343.231);\n  --color-pink-300: oklch(82.3% 0.12 346.018);\n  --color-pink-400: oklch(71.8% 0.202 349.761);\n  --color-pink-500: oklch(65.6% 0.241 354.308);\n  --color-pink-600: oklch(59.2% 0.249 0.584);\n  --color-pink-700: oklch(52.5% 0.223 3.958);\n  --color-pink-800: oklch(45.9% 0.187 3.815);\n  --color-pink-900: oklch(40.8% 0.153 2.432);\n  --color-pink-950: oklch(28.4% 0.109 3.907);\n\n  --color-rose-50: oklch(96.9% 0.015 12.422);\n  --color-rose-100: oklch(94.1% 0.03 12.58);\n  --color-rose-200: oklch(89.2% 0.058 10.001);\n  --color-rose-300: oklch(81% 0.117 11.638);\n  --color-rose-400: oklch(71.2% 0.194 13.428);\n  --color-rose-500: oklch(64.5% 0.246 16.439);\n  --color-rose-600: oklch(58.6% 0.253 17.585);\n  --color-rose-700: oklch(51.4% 0.222 16.935);\n  --color-rose-800: oklch(45.5% 0.188 13.697);\n  --color-rose-900: oklch(41% 0.159 10.272);\n  --color-rose-950: oklch(27.1% 0.105 12.094);\n\n  --color-slate-50: oklch(98.4% 0.003 247.858);\n  --color-slate-100: oklch(96.8% 0.007 247.896);\n  --color-slate-200: oklch(92.9% 0.013 255.508);\n  --color-slate-300: oklch(86.9% 0.022 252.894);\n  --color-slate-400: oklch(70.4% 0.04 256.788);\n  --color-slate-500: oklch(55.4% 0.046 257.417);\n  --color-slate-600: oklch(44.6% 0.043 257.281);\n  --color-slate-700: oklch(37.2% 0.044 257.287);\n  --color-slate-800: oklch(27.9% 0.041 260.031);\n  --color-slate-900: oklch(20.8% 0.042 265.755);\n  --color-slate-950: oklch(12.9% 0.042 264.695);\n\n  --color-gray-50: oklch(98.5% 0.002 247.839);\n  --color-gray-100: oklch(96.7% 0.003 264.542);\n  --color-gray-200: oklch(92.8% 0.006 264.531);\n  --color-gray-300: oklch(87.2% 0.01 258.338);\n  --color-gray-400: oklch(70.7% 0.022 261.325);\n  --color-gray-500: oklch(55.1% 0.027 264.364);\n  --color-gray-600: oklch(44.6% 0.03 256.802);\n  --color-gray-700: oklch(37.3% 0.034 259.733);\n  --color-gray-800: oklch(27.8% 0.033 256.848);\n  --color-gray-900: oklch(21% 0.034 264.665);\n  --color-gray-950: oklch(13% 0.028 261.692);\n\n  --color-zinc-50: oklch(98.5% 0 0);\n  --color-zinc-100: oklch(96.7% 0.001 286.375);\n  --color-zinc-200: oklch(92% 0.004 286.32);\n  --color-zinc-300: oklch(87.1% 0.006 286.286);\n  --color-zinc-400: oklch(70.5% 0.015 286.067);\n  --color-zinc-500: oklch(55.2% 0.016 285.938);\n  --color-zinc-600: oklch(44.2% 0.017 285.786);\n  --color-zinc-700: oklch(37% 0.013 285.805);\n  --color-zinc-800: oklch(27.4% 0.006 286.033);\n  --color-zinc-900: oklch(21% 0.006 285.885);\n  --color-zinc-950: oklch(14.1% 0.005 285.823);\n\n  --color-neutral-50: oklch(98.5% 0 0);\n  --color-neutral-100: oklch(97% 0 0);\n  --color-neutral-200: oklch(92.2% 0 0);\n  --color-neutral-300: oklch(87% 0 0);\n  --color-neutral-400: oklch(70.8% 0 0);\n  --color-neutral-500: oklch(55.6% 0 0);\n  --color-neutral-600: oklch(43.9% 0 0);\n  --color-neutral-700: oklch(37.1% 0 0);\n  --color-neutral-800: oklch(26.9% 0 0);\n  --color-neutral-900: oklch(20.5% 0 0);\n  --color-neutral-950: oklch(14.5% 0 0);\n\n  --color-stone-50: oklch(98.5% 0.001 106.423);\n  --color-stone-100: oklch(97% 0.001 106.424);\n  --color-stone-200: oklch(92.3% 0.003 48.717);\n  --color-stone-300: oklch(86.9% 0.005 56.366);\n  --color-stone-400: oklch(70.9% 0.01 56.259);\n  --color-stone-500: oklch(55.3% 0.013 58.071);\n  --color-stone-600: oklch(44.4% 0.011 73.639);\n  --color-stone-700: oklch(37.4% 0.01 67.558);\n  --color-stone-800: oklch(26.8% 0.007 34.298);\n  --color-stone-900: oklch(21.6% 0.006 56.043);\n  --color-stone-950: oklch(14.7% 0.004 49.25);\n\n  --color-black: #000;\n  --color-white: #fff;\n\n  --spacing: 0.25rem;\n\n  --breakpoint-sm: 40rem;\n  --breakpoint-md: 48rem;\n  --breakpoint-lg: 64rem;\n  --breakpoint-xl: 80rem;\n  --breakpoint-2xl: 96rem;\n\n  --container-3xs: 16rem;\n  --container-2xs: 18rem;\n  --container-xs: 20rem;\n  --container-sm: 24rem;\n  --container-md: 28rem;\n  --container-lg: 32rem;\n  --container-xl: 36rem;\n  --container-2xl: 42rem;\n  --container-3xl: 48rem;\n  --container-4xl: 56rem;\n  --container-5xl: 64rem;\n  --container-6xl: 72rem;\n  --container-7xl: 80rem;\n\n  --text-xs: 0.75rem;\n  --text-xs--line-height: calc(1 / 0.75);\n  --text-sm: 0.875rem;\n  --text-sm--line-height: calc(1.25 / 0.875);\n  --text-base: 1rem;\n  --text-base--line-height: calc(1.5 / 1);\n  --text-lg: 1.125rem;\n  --text-lg--line-height: calc(1.75 / 1.125);\n  --text-xl: 1.25rem;\n  --text-xl--line-height: calc(1.75 / 1.25);\n  --text-2xl: 1.5rem;\n  --text-2xl--line-height: calc(2 / 1.5);\n  --text-3xl: 1.875rem;\n  --text-3xl--line-height: calc(2.25 / 1.875);\n  --text-4xl: 2.25rem;\n  --text-4xl--line-height: calc(2.5 / 2.25);\n  --text-5xl: 3rem;\n  --text-5xl--line-height: 1;\n  --text-6xl: 3.75rem;\n  --text-6xl--line-height: 1;\n  --text-7xl: 4.5rem;\n  --text-7xl--line-height: 1;\n  --text-8xl: 6rem;\n  --text-8xl--line-height: 1;\n  --text-9xl: 8rem;\n  --text-9xl--line-height: 1;\n\n  --font-weight-thin: 100;\n  --font-weight-extralight: 200;\n  --font-weight-light: 300;\n  --font-weight-normal: 400;\n  --font-weight-medium: 500;\n  --font-weight-semibold: 600;\n  --font-weight-bold: 700;\n  --font-weight-extrabold: 800;\n  --font-weight-black: 900;\n\n  --tracking-tighter: -0.05em;\n  --tracking-tight: -0.025em;\n  --tracking-normal: 0em;\n  --tracking-wide: 0.025em;\n  --tracking-wider: 0.05em;\n  --tracking-widest: 0.1em;\n\n  --leading-tight: 1.25;\n  --leading-snug: 1.375;\n  --leading-normal: 1.5;\n  --leading-relaxed: 1.625;\n  --leading-loose: 2;\n\n  --radius-xs: 0.125rem;\n  --radius-sm: 0.25rem;\n  --radius-md: 0.375rem;\n  --radius-lg: 0.5rem;\n  --radius-xl: 0.75rem;\n  --radius-2xl: 1rem;\n  --radius-3xl: 1.5rem;\n  --radius-4xl: 2rem;\n\n  --shadow-2xs: 0 1px rgb(0 0 0 / 0.05);\n  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);\n  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);\n  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);\n  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);\n  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);\n\n  --inset-shadow-2xs: inset 0 1px rgb(0 0 0 / 0.05);\n  --inset-shadow-xs: inset 0 1px 1px rgb(0 0 0 / 0.05);\n  --inset-shadow-sm: inset 0 2px 4px rgb(0 0 0 / 0.05);\n\n  --drop-shadow-xs: 0 1px 1px rgb(0 0 0 / 0.05);\n  --drop-shadow-sm: 0 1px 2px rgb(0 0 0 / 0.15);\n  --drop-shadow-md: 0 3px 3px rgb(0 0 0 / 0.12);\n  --drop-shadow-lg: 0 4px 4px rgb(0 0 0 / 0.15);\n  --drop-shadow-xl: 0 9px 7px rgb(0 0 0 / 0.1);\n  --drop-shadow-2xl: 0 25px 25px rgb(0 0 0 / 0.15);\n\n  --text-shadow-2xs: 0px 1px 0px rgb(0 0 0 / 0.15);\n  --text-shadow-xs: 0px 1px 1px rgb(0 0 0 / 0.2);\n  --text-shadow-sm:\n    0px 1px 0px rgb(0 0 0 / 0.075), 0px 1px 1px rgb(0 0 0 / 0.075), 0px 2px 2px rgb(0 0 0 / 0.075);\n  --text-shadow-md:\n    0px 1px 1px rgb(0 0 0 / 0.1), 0px 1px 2px rgb(0 0 0 / 0.1), 0px 2px 4px rgb(0 0 0 / 0.1);\n  --text-shadow-lg:\n    0px 1px 2px rgb(0 0 0 / 0.1), 0px 3px 2px rgb(0 0 0 / 0.1), 0px 4px 8px rgb(0 0 0 / 0.1);\n\n  --ease-in: cubic-bezier(0.4, 0, 1, 1);\n  --ease-out: cubic-bezier(0, 0, 0.2, 1);\n  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);\n\n  --animate-spin: spin 1s linear infinite;\n  --animate-ping: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;\n  --animate-pulse: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;\n  --animate-bounce: bounce 1s infinite;\n\n  @keyframes spin {\n    to {\n      transform: rotate(360deg);\n    }\n  }\n\n  @keyframes ping {\n    75%,\n    100% {\n      transform: scale(2);\n      opacity: 0;\n    }\n  }\n\n  @keyframes pulse {\n    50% {\n      opacity: 0.5;\n    }\n  }\n\n  @keyframes bounce {\n    0%,\n    100% {\n      transform: translateY(-25%);\n      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);\n    }\n\n    50% {\n      transform: none;\n      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);\n    }\n  }\n\n  --blur-xs: 4px;\n  --blur-sm: 8px;\n  --blur-md: 12px;\n  --blur-lg: 16px;\n  --blur-xl: 24px;\n  --blur-2xl: 40px;\n  --blur-3xl: 64px;\n\n  --perspective-dramatic: 100px;\n  --perspective-near: 300px;\n  --perspective-normal: 500px;\n  --perspective-midrange: 800px;\n  --perspective-distant: 1200px;\n\n  --aspect-video: 16 / 9;\n\n  --default-transition-duration: 150ms;\n  --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  --default-font-family: --theme(--font-sans, initial);\n  --default-font-feature-settings: --theme(--font-sans--font-feature-settings, initial);\n  --default-font-variation-settings: --theme(--font-sans--font-variation-settings, initial);\n  --default-mono-font-family: --theme(--font-mono, initial);\n  --default-mono-font-feature-settings: --theme(--font-mono--font-feature-settings, initial);\n  --default-mono-font-variation-settings: --theme(--font-mono--font-variation-settings, initial);\n}\n\n/* Deprecated */\n@theme default inline reference {\n  --blur: 8px;\n  --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);\n  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);\n  --drop-shadow: 0 1px 2px rgb(0 0 0 / 0.1), 0 1px 1px rgb(0 0 0 / 0.06);\n  --radius: 0.25rem;\n  --max-width-prose: 65ch;\n}\n",
      utilities: "@tailwind utilities;\n",
    },
    pr = "text/tailwindcss",
    hr = new Set(),
    mr = "",
    gr = document.createElement("style"),
    vr = Promise.resolve(),
    wr = 1,
    kr = new (class {
      start(e) {
        performance.mark(`${e} (start)`);
      }
      end(e, t) {
        (performance.mark(`${e} (end)`),
          performance.measure(e, {
            start: `${e} (start)`,
            end: `${e} (end)`,
            detail: t,
          }));
      }
      hit(e, t) {
        performance.mark(e, { detail: t });
      }
      error(e) {
        throw (performance.mark("(error)", { detail: { error: `${e}` } }), e);
      }
    })();
  async function br(e, t) {
    try {
      let r = (function () {
        if ("tailwindcss" === e)
          return {
            path: "virtual:tailwindcss/index.css",
            base: t,
            content: fr.index,
          };
        if (
          "tailwindcss/preflight" === e ||
          "tailwindcss/preflight.css" === e ||
          "./preflight.css" === e
        )
          return {
            path: "virtual:tailwindcss/preflight.css",
            base: t,
            content: fr.preflight,
          };
        if (
          "tailwindcss/theme" === e ||
          "tailwindcss/theme.css" === e ||
          "./theme.css" === e
        )
          return {
            path: "virtual:tailwindcss/theme.css",
            base: t,
            content: fr.theme,
          };
        if (
          "tailwindcss/utilities" === e ||
          "tailwindcss/utilities.css" === e ||
          "./utilities.css" === e
        )
          return {
            path: "virtual:tailwindcss/utilities.css",
            base: t,
            content: fr.utilities,
          };
        throw new Error(
          `The browser build does not support @import for "${e}"`,
        );
      })();
      return (
        kr.hit("Loaded stylesheet", { id: e, base: t, size: r.content.length }),
        r
      );
    } catch (r) {
      throw (
        kr.hit("Failed to load stylesheet", {
          id: e,
          base: t,
          error: r.message ?? r,
        }),
        r
      );
    }
  }
  async function yr() {
    throw new Error(
      "The browser build does not support plugins or config files.",
    );
  }
  function xr(e) {
    vr = vr
      .then(async function () {
        if (!dr && "full" !== e) return;
        let t = wr++;
        (kr.start(`Build #${t} (${e})`),
          "full" === e &&
            (await (async function () {
              (kr.start("Create compiler"), kr.start("Reading Stylesheets"));
              let e = document.querySelectorAll(`style[type="${pr}"]`),
                t = "";
              for (let r of e) (Ar(r), (t += r.textContent + "\n"));
              if (
                (t.includes("@import") || (t = `@import "tailwindcss";${t}`),
                kr.end("Reading Stylesheets", {
                  size: t.length,
                  changed: mr !== t,
                }),
                mr !== t)
              ) {
                ((mr = t), kr.start("Compile CSS"));
                try {
                  dr = await ur(t, {
                    base: "/",
                    loadStylesheet: br,
                    loadModule: yr,
                  });
                } finally {
                  (kr.end("Compile CSS"), kr.end("Create compiler"));
                }
                hr.clear();
              }
            })()),
          kr.start("Build"),
          await (async function (e) {
            if (!dr) return;
            let t = new Set();
            kr.start("Collect classes");
            for (let e of document.querySelectorAll("[class]"))
              for (let r of e.classList) hr.has(r) || (hr.add(r), t.add(r));
            (kr.end("Collect classes", { count: t.size }),
              (0 !== t.size || "incremental" !== e) &&
                (kr.start("Build utilities"),
                (gr.textContent = dr.build(Array.from(t))),
                kr.end("Build utilities")));
          })(e),
          kr.end("Build"),
          kr.end(`Build #${t} (${e})`));
      })
      .catch((e) => kr.error(e));
  }
  var $r = new MutationObserver(() => xr("full"));
  function Ar(e) {
    $r.observe(e, {
      attributes: !0,
      attributeFilter: ["type"],
      characterData: !0,
      subtree: !0,
      childList: !0,
    });
  }
  (new MutationObserver((e) => {
    let t = 0,
      r = 0;
    for (let n of e) {
      for (let e of n.addedNodes)
        e.nodeType === Node.ELEMENT_NODE &&
          "STYLE" === e.tagName &&
          e.getAttribute("type") === pr &&
          (Ar(e), t++);
      for (let e of n.addedNodes) 1 === e.nodeType && e !== gr && r++;
      "attributes" === n.type && r++;
    }
    return t > 0 ? xr("full") : r > 0 ? xr("incremental") : void 0;
  }).observe(document.documentElement, {
    attributes: !0,
    attributeFilter: ["class"],
    childList: !0,
    subtree: !0,
  }),
    xr("full"),
    document.head.append(gr));
})();
//# sourceMappingURL=/sm/11ef6279fcf113adbb9194a3b30794e470ab2079bf22658274e2d2bbee2d8b81.map
