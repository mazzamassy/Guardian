(() => {
  "use strict";
  var e,
    t,
    n,
    r,
    o = {
      4875: (e, t, n) => {
        n.d(t, {
          px: () => N,
          eZ: () => L,
          om: () => F,
          Ar: () => B,
          PH: () => O,
          Hn: () => x,
          Ru: () => k,
          eu: () => M,
          iB: () => P,
          fj: () => T,
        });
        var r = n(31481),
          o = n(61182),
          s = n(9705),
          a = n(14487),
          i = n(14235),
          d = n(37836),
          c = n(82393);
        const u = 150,
          l = 5e3,
          f = new Set(["destroy"]);
        let h;
        const m = new Map(),
          p = new Map();
        let g = [];
        const y = {
          chats: {},
          users: {},
          documents: {},
          stickerSets: {},
          photos: {},
          webDocuments: {},
          commonBoxState: {},
          channelPtsById: {},
        };
        let b = !0;
        (0, a.wr)((e) => {
          b = e;
        });
        const v = c.bs ? new BroadcastChannel(r.rLF) : void 0,
          w = (0, d.Fe)(() => {
            const e = g;
            (g = []), h?.postMessage({ payloads: e });
          });
        function I(e) {
          g.push(e), w();
        }
        let A,
          C = [],
          S = [],
          E = !1;
        function k(e, t) {
          return (
            (A = e),
            b
              ? (h ||
                  (r.Oig && console.log(">>> START LOAD WORKER"),
                  (h = new Worker(new URL(n.p + n.u(3559), n.b))),
                  (function (e) {
                    h?.addEventListener("message", (t) => {
                      let { data: n } = t;
                      n?.payloads.forEach((t) => {
                        if ("updates" === t.type) {
                          let n;
                          if (
                            (r.Oig && (n = performance.now()),
                            t.updates.forEach(e),
                            r.Oig)
                          ) {
                            const e = performance.now() - n;
                            e > 5 &&
                              console.warn(
                                `[API] Slow updates processing: ${t.updates.length} updates in ${e} ms`
                              );
                          }
                        } else if ("methodResponse" === t.type) x(t);
                        else if ("methodCallback" === t.type) O(t);
                        else {
                          if ("unhandledError" === t.type) {
                            const e = t.error?.message;
                            if (e && r.LWg.has(e)) return;
                            throw new Error(e);
                          }
                          "sendBeacon" === t.type
                            ? navigator.sendBeacon(t.url, t.data)
                            : "debugLog" === t.type &&
                              (0, o.bO)(t.level, ...t.args);
                        }
                      });
                    });
                  })(e),
                  "iOS" === t.platform &&
                    window.addEventListener("focus", () => {
                      U(), setTimeout(() => U(), 1e3);
                    })),
                R({ type: "initApi", args: [t, y] }).then(() => {
                  (E = !0),
                    S.forEach((e) => {
                      N(e.fnName, ...e.args)
                        .then(e.deferred.resolve)
                        .catch(e.deferred.reject);
                    }),
                    (S = []),
                    C.forEach((e) => {
                      L(e.fnName, ...e.args)
                        .then(e.deferred.resolve)
                        .catch(e.deferred.reject);
                    }),
                    (C = []);
                }))
              : ((function (e) {
                  v &&
                    v.postMessage({
                      type: "initApi",
                      token: (0, a.g0)(),
                      initialArgs: e,
                    });
                })(t),
                Promise.resolve())
          );
        }
        function T(e, t, n) {
          y[e][t] = n;
        }
        function P(e) {
          Object.assign(y, e);
        }
        function M(e) {
          return R({ type: "toggleDebugMode", isEnabled: e });
        }
        function L(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1;
            o < t;
            o++
          )
            n[o - 1] = arguments[o];
          if (!E) {
            if (f.has(e)) return Promise.resolve(void 0);
            const t = new s.A();
            return C.push({ fnName: e, args: n, deferred: t }), t.promise;
          }
          const a = R({ type: "callMethod", name: e, args: n });
          return (
            r.Oig &&
              (async () => {
                try {
                  await a;
                } catch (e) {}
              })(),
            a
          );
        }
        function N(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1;
            o < t;
            o++
          )
            n[o - 1] = arguments[o];
          if (!E && b) {
            if (f.has(e)) return Promise.resolve(void 0);
            const t = new s.A();
            return S.push({ fnName: e, args: n, deferred: t }), t.promise;
          }
          const d = b
            ? R({ type: "callMethod", name: e, args: n })
            : (function (e) {
                const t = (0, i.A)(),
                  n = { messageId: t, ...e },
                  r = { messageId: t },
                  o = new Promise((e, t) => {
                    Object.assign(r, { resolve: e, reject: t });
                  });
                if (
                  "args" in n &&
                  "name" in n &&
                  "function" == typeof n.args[1]
                ) {
                  n.withCallback = !0;
                  const e = n.args.pop();
                  (r.callback = e), p.set(e, r);
                }
                return (
                  m.set(t, r),
                  o
                    .catch(() => {})
                    .finally(() => {
                      m.delete(t), r.callback && p.delete(r.callback);
                    }),
                  (function (e) {
                    v &&
                      v.postMessage({
                        type: "callApi",
                        token: (0, a.g0)(),
                        ...e,
                      });
                  })(n),
                  o
                );
              })({ name: e, args: n });
          return (
            r.Oig &&
              (async () => {
                try {
                  await d;
                } catch (e) {}
              })(),
            d
          );
        }
        function F(e) {
          e.isCanceled = !0;
          const { messageId: t } = p.get(e) || {};
          if (t)
            if (b) B(t);
            else {
              if (!v) return;
              v.postMessage({
                type: "cancelApiProgress",
                token: (0, a.g0)(),
                messageId: t,
              });
            }
        }
        function B(e) {
          I({ type: "cancelProgress", messageId: e });
        }
        function x(e) {
          const t = m.get(e.messageId);
          t && (e.error ? t.reject(e.error) : t.resolve(e.response));
        }
        function O(e) {
          m.get(e.messageId)?.callback?.(...e.callbackArgs);
        }
        function R(e) {
          const t = (0, i.A)(),
            n = { messageId: t, ...e },
            r = { messageId: t },
            o = new Promise((e, t) => {
              Object.assign(r, { resolve: e, reject: t });
            });
          if ("args" in n && "name" in n && "function" == typeof n.args[1]) {
            n.withCallback = !0;
            const e = n.args.pop();
            (r.callback = e), p.set(e, r);
          }
          return (
            (r.DEBUG_payload = n),
            m.set(t, r),
            o
              .catch(() => {})
              .finally(() => {
                m.delete(t), r.callback && p.delete(r.callback);
              }),
            I(n),
            o
          );
        }
        const D = Date.now();
        async function U() {
          let e = !1;
          try {
            await Promise.race([
              R({ type: "ping" }),
              (0, d.v7)(u).then(() =>
                e ? void 0 : Promise.reject(new Error("HEALTH_CHECK_TIMEOUT"))
              ),
            ]);
          } catch (e) {
            console.error(e),
              Date.now() - D >= l &&
                (h?.terminate(),
                (h = void 0),
                A({ "@type": "requestReconnectApi" }));
          } finally {
            e = !0;
          }
        }
      },
      23174: (e, t, n) => {
        n.d(t, {
          C7: () => r.C7,
          K1: () => r.K1,
          l3: () => r.l3,
          qZ: () => o.q,
        });
        var r = n(84448),
          o = n(35710);
      },
      35710: (e, t, n) => {
        n.d(t, { q: () => r });
        let r = (function (e) {
          return (
            (e[(e.BlobUrl = 0)] = "BlobUrl"),
            (e[(e.Progressive = 1)] = "Progressive"),
            (e[(e.DownloadUrl = 2)] = "DownloadUrl"),
            (e[(e.Text = 3)] = "Text"),
            e
          );
        })({});
      },
      84448: (e, t, n) => {
        n.d(t, { C7: () => r, K1: () => s, l3: () => o });
        let r = (function (e) {
          return (
            (e.Bold = "MessageEntityBold"),
            (e.Blockquote = "MessageEntityBlockquote"),
            (e.BotCommand = "MessageEntityBotCommand"),
            (e.Cashtag = "MessageEntityCashtag"),
            (e.Code = "MessageEntityCode"),
            (e.Email = "MessageEntityEmail"),
            (e.Hashtag = "MessageEntityHashtag"),
            (e.Italic = "MessageEntityItalic"),
            (e.MentionName = "MessageEntityMentionName"),
            (e.Mention = "MessageEntityMention"),
            (e.Phone = "MessageEntityPhone"),
            (e.Pre = "MessageEntityPre"),
            (e.Strike = "MessageEntityStrike"),
            (e.TextUrl = "MessageEntityTextUrl"),
            (e.Url = "MessageEntityUrl"),
            (e.Underline = "MessageEntityUnderline"),
            (e.Spoiler = "MessageEntitySpoiler"),
            (e.CustomEmoji = "MessageEntityCustomEmoji"),
            (e.Unknown = "MessageEntityUnknown"),
            e
          );
        })({});
        const o = -1,
          s = "MESSAGE_DELETED";
      },
      4438: (e, t, n) => {
        n.d(t, { A: () => l });
        var r = n(84051),
          o = n(87357),
          s = n(37661),
          a = n(17712),
          i = n(83057),
          d = n(18104);
        function c() {
          return (
            (c = Object.assign
              ? Object.assign.bind()
              : function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n)
                      Object.prototype.hasOwnProperty.call(n, r) &&
                        (e[r] = n[r]);
                  }
                  return e;
                }),
            c.apply(this, arguments)
          );
        }
        const u = 150,
          l = (0, r.ph)(function (e) {
            const {
                size: t = u,
                play: n = !0,
                noLoop: l = !0,
                className: f,
                noTransition: h,
                nonInteractive: m,
                onLoad: p,
                onClick: g,
                ...y
              } = e,
              [b, v] = (0, s.A)(!1),
              w = (0, i.A)(h || b),
              I = (0, a.A)(() => {
                v(), p?.();
              }),
              [A, C] = (0, r.J0)(String(Math.random())),
              S = (0, a.A)(() => {
                !0 === n && C(String(Math.random())), g?.();
              });
            return r.Ay.createElement(
              d.A,
              c(
                {
                  className: (0, o.A)(f, w),
                  size: t,
                  play: !0 === n ? A : n,
                  noLoop: l,
                  onClick: m ? void 0 : S,
                  onLoad: I,
                },
                y
              )
            );
          });
      },
      18104: (e, t, n) => {
        n.d(t, { A: () => C });
        var r = n(84051),
          o = n(66644),
          s = n(88458),
          a = n(87357),
          i = n(95807),
          d = n(14235),
          c = n(71322),
          u = n(82393),
          l = n(28021),
          f = n(82117),
          h = n(37661),
          m = n(84080),
          p = n(17712),
          g = n(34780),
          y = n(46637),
          b = n(41257),
          v = n(35297),
          w = n(672),
          I = n(14745),
          A = n(61157);
        const C = (0, r.ph)((e) => {
          let {
              ref: t,
              renderId: n,
              className: C,
              style: E,
              tgsUrl: k,
              play: T,
              playSegment: P,
              speed: M,
              noLoop: L,
              size: N,
              quality: F,
              isLowPriority: B,
              color: x,
              forceAlways: O,
              forceOnHeavyAnimation: R,
              sharedCanvas: D,
              sharedCanvasCoords: U,
              onClick: _,
              onLoad: $,
              onEnded: j,
              onLoop: H,
            } = e,
            V = (0, r.li)(null);
          t && (V = t);
          const z = (0, I.A)(),
            [W, J] = (0, r.J0)(),
            K = (0, r.li)(),
            q = (0, r.li)(!0),
            G = !D && x,
            X = (0, l.A)(G ? x : void 0),
            Y = T || (!1 !== T && P),
            Q = (0, b.i)(T),
            Z = (0, b.i)(P),
            ee = (0, r.li)(),
            te = O || R,
            [ne, re, oe] = (0, h.A)(!(0, r.OV)() || te);
          (0, m.Ay)(oe, re, te),
            (0, r.vJ)(() => {
              te && re();
            }, [te]),
            (0, v.A)(() => {
              if (x && !G) {
                const { r: e, g: t, b: n } = (0, c.E2)(x);
                ee.current = [e, t, n];
              } else ee.current = void 0;
            }, [x, G]);
          const se = (0, r.li)(!1);
          (0, r._W)(() => {
            se.current = !0;
          });
          const ae = (0, p.A)(() => {
            if (
              K.current ||
              se.current ||
              !k ||
              (D && (!U || !D.offsetWidth || !D.offsetHeight)) ||
              ((0, r.OV)() && !te)
            )
              return;
            const e = V.current || D;
            if (!e) return;
            const t = (0, s.o)().init(
              k,
              e,
              n || (0, d.A)(),
              { size: N, noLoop: L, quality: F, isLowPriority: B, coords: U },
              z,
              ee.current,
              $,
              j,
              H
            );
            M && t.setSpeed(M), J(t), (K.current = t);
          });
          (0, r.vJ)(() => {
            ne && ((0, s.o)() ? ae() : (0, s.Y)().then(ae));
          }, [ae, k, D, U, ne]);
          const ie = (0, w.A)(ae, [ae], 150);
          (0, y.A)(D, ie),
            (0, r.vJ)(() => {
              W && W.setColor(ee.current);
            }, [x, W]),
            (0, r._W)(() => {
              K.current?.removeView(z);
            });
          const de = (0, p.A)(function () {
              let e =
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
              W &&
                (Q.current || Z.current) &&
                !S(O) &&
                (Z.current ? W.playSegment(Z.current, e, z) : W.play(e, z));
            }),
            ce = (0, p.A)(() => {
              (0, o.YS)(de);
            }),
            ue = (0, p.A)(() => {
              W?.isPlaying() && W.pause(z);
            });
          if (
            ((0, f.A)(
              (e) => {
                let [t] = e;
                void 0 !== t && L !== t && W?.setNoLoop(L);
              },
              [L, W]
            ),
            (0, f.A)(
              (e) => {
                let [t] = e;
                void 0 !== t && U !== t && W?.setSharedCanvasCoords(z, U);
              },
              [U, z, W]
            ),
            (0, r.vJ)(() => {
              W && (Y ? S(O, R) || de(L) : ue());
            }, [W, Y, L, de, ue, O, R]),
            (0, r.vJ)(() => {
              W &&
                (q.current ? (q.current = !1) : k && (W.changeData(k), de()));
            }, [de, W, k]),
            (0, m.Ay)(ue, de, !Y || te),
            (0, g.Ay)(ue, de, !Y || O),
            (0, A.A)(ue, ce, !Y || O),
            !D)
          )
            return r.Ay.createElement("div", {
              ref: V,
              className: (0, a.A)("AnimatedSticker", C),
              style: (0, i.A)(
                void 0 !== N && `width: ${N}px; height: ${N}px;`,
                _ && !u.cp && "cursor: pointer",
                X,
                E
              ),
              onClick: _,
            });
        });
        function S() {
          return (
            !(
              arguments.length > 0 &&
              void 0 !== arguments[0] &&
              arguments[0]
            ) &&
            ((!(
              arguments.length > 1 &&
              void 0 !== arguments[1] &&
              arguments[1]
            ) &&
              (0, r.OV)()) ||
              (0, g.c_)() ||
              (0, A.g)())
          );
        }
      },
      87412: (e, t, n) => {
        n.d(t, { A: () => p });
        var r = n(84051),
          o = n(13439),
          s = n(23174),
          a = n(29807),
          i = n(87357),
          d = n(41733),
          c = n(86974),
          u = n(17712),
          l = n(47483),
          f = n(82855);
        var h = n(61911);
        const m = 20,
          p = (0, r.ph)((e) => {
            let {
                ref: t,
                documentId: n,
                className: p,
                style: g,
                size: y = m,
                isBig: b,
                noPlay: v,
                noVideoOnMobile: w,
                loopLimit: I,
                isSelectable: A,
                withSharedAnimation: C,
                sharedCanvasRef: S,
                sharedCanvasHqRef: E,
                withTranslucentThumb: k,
                shouldPreloadPreview: T,
                forceAlways: P,
                forceOnHeavyAnimation: M,
                observeIntersectionForLoading: L,
                observeIntersectionForPlaying: N,
                onClick: F,
                onAnimationEnd: B,
              } = e,
              x = (0, r.li)(null);
            t && (x = t);
            const { customEmoji: O, canPlay: R } = (0, l.A)(n),
              D = (0, r.li)(0),
              [U, _] = (0, r.J0)(!0),
              $ = O?.shouldUseTextColor,
              j = (0, c.A)(x, !$),
              H = (0, u.A)((e) => {
                I &&
                  ((D.current += 1),
                  D.current >= I
                    ? (_(!1), (e.currentTarget.currentTime = 0))
                    : (0, d.A)(e.currentTarget));
              }),
              V = (0, u.A)(() => {
                I && ((D.current += 1), D.current >= I && _(!1));
              }),
              z =
                O?.stickerSetInfo && (0, a.CzR)((0, o.mS)(), O.stickerSetInfo);
            return r.Ay.createElement(
              "div",
              {
                ref: x,
                className: (0, i.A)("CEFe1FhH", p, "custom-emoji", "emoji"),
                onClick: F,
                onAnimationEnd: B,
                "data-entity-type": s.C7.CustomEmoji,
                "data-document-id": n,
                "data-alt": O?.emoji,
                style: g,
              },
              A &&
                r.Ay.createElement("img", {
                  className: "a8dMNkh3",
                  src: h,
                  alt: O?.emoji,
                  "data-entity-type": s.C7.CustomEmoji,
                  "data-document-id": n,
                  draggable: !1,
                }),
              O
                ? r.Ay.createElement(f.A, {
                    containerRef: x,
                    sticker: O,
                    isSmall: !b,
                    size: y,
                    noPlay: v || !(U && R),
                    noVideoOnMobile: w,
                    thumbClassName: "O_TaDxWg",
                    fullMediaClassName: "wqju02hR",
                    shouldLoop: !0,
                    loopLimit: I,
                    shouldPreloadPreview: T || v || !R,
                    forceOnHeavyAnimation: M,
                    forceAlways: P,
                    observeIntersectionForLoading: L,
                    observeIntersectionForPlaying: N,
                    withSharedAnimation: C,
                    sharedCanvasRef: z ? E : S,
                    withTranslucentThumb: k,
                    onVideoEnded: H,
                    onAnimatedStickerLoop: V,
                    customColor: j,
                  })
                : r.Ay.createElement("div", {
                    className: (0, i.A)("DKi1177s"),
                    draggable: !1,
                  })
            );
          });
      },
      18653: (e, t, n) => {
        n.d(t, { A: () => l });
        var r = n(84051),
          o = n(23174),
          s = n(90709),
          a = n(3544),
          i = n(58849),
          d = n(4961),
          c = n(59030),
          u = n(74936);
        const l = (0, r.ph)(function (e) {
          let {
            message: t,
            translatedText: n,
            noEmoji: l = !1,
            highlight: f,
            truncateLength: h = a.vs,
            withTranslucentThumbs: m = !1,
            inChatList: p = !1,
            emojiSize: g,
            observeIntersectionForLoading: y,
            observeIntersectionForPlaying: b,
          } = e;
          const v = (0, c.A)(),
            { text: w, entities: I } = (0, s.Sb)(t, p) || {},
            A = I?.some((e) => e.type === o.C7.Spoiler),
            C = I?.some((e) => e.type === o.C7.CustomEmoji),
            S = Boolean((0, s.ZZ)(t));
          if (!((w && (A || C)) || S)) {
            const e = n?.text || (0, a.dS)(v, t, l, h),
              o = (0, i.A)(e, h);
            return r.Ay.createElement(
              "span",
              null,
              f
                ? (0, d.A)(o, ["emoji", "highlight"], { highlight: f })
                : (0, d.A)(o)
            );
          }
          const E = !l && (0, a.Su)(t);
          return r.Ay.createElement(
            r.Ay.Fragment,
            null,
            [
              E ? (0, d.A)(`${E} `) : void 0,
              (0, a.oL)(
                v,
                t,
                r.Ay.createElement(u.A, {
                  messageOrStory: t,
                  translatedText: n,
                  highlight: f,
                  isSimple: !0,
                  observeIntersectionForLoading: y,
                  observeIntersectionForPlaying: b,
                  withTranslucentThumbs: m,
                  truncateLength: h,
                  inChatList: p,
                  emojiSize: g,
                })
              ),
            ]
              .flat()
              .filter(Boolean)
          );
        });
      },
      74936: (e, t, n) => {
        n.d(t, { A: () => l });
        var r = n(84051),
          o = n(23174),
          s = n(31481),
          a = n(90709),
          i = n(58849),
          d = n(18501),
          c = n(35297),
          u = n(14745);
        const l = (0, r.ph)(function (e) {
          let {
            messageOrStory: t,
            translatedText: n,
            isForAnimation: l,
            emojiSize: f,
            highlight: h,
            isSimple: m,
            truncateLength: p,
            isProtected: g,
            observeIntersectionForLoading: y,
            observeIntersectionForPlaying: b,
            withTranslucentThumbs: v,
            shouldRenderAsHtml: w,
            inChatList: I,
            forcePlayback: A,
            focusedQuote: C,
            isInSelectMode: S,
            canBeEmpty: E,
          } = e;
          const k = (0, r.li)(null),
            T = (0, r.li)(null),
            P = (0, r.li)(0),
            M = n || (0, a.Sb)(t, I),
            L = l && M ? (0, a.m4)(M) : M,
            { text: N, entities: F } = L || {},
            B = (0, u.A)();
          (0, c.A)(() => {
            P.current += 1;
          }, [N, F]);
          const x =
            (0, r.Kr)(() => {
              const e = F?.some((e) => e.type === o.C7.Spoiler);
              return (
                !e &&
                (F?.filter((e) => e.type === o.C7.CustomEmoji).length || 0) >= 3
              );
            }, [F]) || 0;
          return N || E
            ? r.Ay.createElement(
                r.Ay.Fragment,
                null,
                [
                  x &&
                    r.Ay.createElement("canvas", {
                      ref: k,
                      className: "shared-canvas",
                    }),
                  x &&
                    r.Ay.createElement("canvas", {
                      ref: T,
                      className: "shared-canvas",
                    }),
                  (0, d.f)({
                    text: (0, i.A)(N, p),
                    entities: F,
                    highlight: h,
                    emojiSize: f,
                    shouldRenderAsHtml: w,
                    containerId: B,
                    isSimple: m,
                    isProtected: g,
                    observeIntersectionForLoading: y,
                    observeIntersectionForPlaying: b,
                    withTranslucentThumbs: v,
                    sharedCanvasRef: k,
                    sharedCanvasHqRef: T,
                    cacheBuster: P.current.toString(),
                    forcePlayback: A,
                    focusedQuote: C,
                    isInSelectMode: S,
                  }),
                ]
                  .flat()
                  .filter(Boolean)
              )
            : r.Ay.createElement(
                "span",
                { className: "content-unsupported" },
                s.bVP
              );
        });
      },
      56440: (e, t, n) => {
        n.d(t, { A: () => w });
        var r = n(84051),
          o = n(13439),
          s = n(23174),
          a = n(31481);
        const i = (e) => {
            const t = [];
            let n = 0;
            const r = e.length;
            let o;
            for (; n < r; ) {
              if (((o = e[n++]), 55296 == (63488 & o)))
                throw new RangeError("UTF-16(encode): Illegal UTF-16 value");
              o > 65535 &&
                ((o -= 65536),
                t.push(String.fromCharCode(((o >>> 10) & 1023) | 55296)),
                (o = 56320 | (1023 & o))),
                t.push(String.fromCharCode(o));
            }
            return t.join("");
          },
          d = 36,
          c = 700,
          u = 1,
          l = 26,
          f = 38,
          h = 2147483647;
        function m(e, t, n) {
          let r;
          for (
            e = n ? Math.floor(e / c) : e >> 1, e += Math.floor(e / t), r = 0;
            e > ((d - u) * l) >> 1;
            r += d
          )
            e = Math.floor(e / (d - u));
          return Math.floor(r + ((d - u + 1) * e) / (e + f));
        }
        function p(e, t) {
          const n = [],
            r = [],
            o = e.length;
          let s, a, c, f, p, g, y, b, v, w, I, A, C;
          for (
            s = 128,
              c = 0,
              f = 72,
              p = e.lastIndexOf("-"),
              p < 0 && (p = 0),
              g = 0;
            g < p;
            ++g
          ) {
            if (
              (t && (r[n.length] = e.charCodeAt(g) - 65 < 26),
              e.charCodeAt(g) >= 128)
            )
              throw new RangeError("Illegal input >= 0x80");
            n.push(e.charCodeAt(g));
          }
          for (y = p > 0 ? p + 1 : 0; y < o; ) {
            for (b = c, v = 1, w = d; ; w += d) {
              if (y >= o) throw RangeError("punycode_bad_input(1)");
              if (
                ((I =
                  (S = e.charCodeAt(y++)) - 48 < 10
                    ? S - 22
                    : S - 65 < 26
                    ? S - 65
                    : S - 97 < 26
                    ? S - 97
                    : d),
                I >= d)
              )
                throw RangeError("punycode_bad_input(2)");
              if (I > Math.floor((h - c) / v))
                throw RangeError("punycode_overflow(1)");
              if (
                ((c += I * v), (A = w <= f ? u : w >= f + l ? l : w - f), I < A)
              )
                break;
              if (v > Math.floor(h / (d - A)))
                throw RangeError("punycode_overflow(2)");
              v *= d - A;
            }
            if (
              ((a = n.length + 1),
              (f = m(c - b, a, 0 === b)),
              Math.floor(c / a) > h - s)
            )
              throw RangeError("punycode_overflow(3)");
            (s += Math.floor(c / a)),
              (c %= a),
              t && r.splice(c, 0, e.charCodeAt(y - 1) - 65 < 26),
              n.splice(c, 0, s),
              c++;
          }
          var S;
          if (t)
            for (c = 0, C = n.length; c < C; c++)
              r[c] &&
                (n[c] = String.fromCharCode(n[c]).toUpperCase().charCodeAt(0));
          return i(n);
        }
        var g = n(87357),
          y = n(62076),
          b = n(17712);
        function v(e) {
          if (!e) return;
          const t = (0, y.T)(e);
          if (t)
            try {
              const e = new URL(t),
                n = (function (e) {
                  const t = e.split("."),
                    n = [];
                  for (let e = 0; e < t.length; ++e) {
                    const r = t[e];
                    n.push(r.match(/^xn--/) ? p(r.slice(4)) : r);
                  }
                  return n.join(".");
                })(e.hostname);
              try {
                return decodeURI(e.toString()).replace(e.hostname, n);
              } catch (t) {
                return e.toString().replace(e.hostname, n);
              }
            } catch (t) {
              a.Oig && console.warn("SafeLink.getDecodedUrl error ", e, t);
            }
        }
        const w = (e) => {
          let {
            url: t,
            text: n,
            className: a,
            children: i,
            withNormalWordBreak: d,
            isRtl: c,
          } = e;
          const { openUrl: u } = (0, o.ko)(),
            l = i || n,
            f = t === n,
            h = (0, b.A)(
              (e) =>
                !t ||
                (e.preventDefault(), u({ url: t, shouldSkipModal: f }), !1)
            );
          if (!t) return;
          const m = (0, g.A)(a || "text-entity-link", !d && "word-break-all");
          return r.Ay.createElement(
            "a",
            {
              href: (0, y.T)(t),
              title: v(t),
              target: "_blank",
              rel: "noopener noreferrer",
              className: m,
              onClick: h,
              dir: c ? "rtl" : "auto",
              "data-entity-type": s.C7.Url,
            },
            l
          );
        };
      },
      82855: (e, t, n) => {
        n.d(t, { A: () => E });
        var r = n(84051),
          o = n(13439),
          s = n(90709),
          a = n(29807),
          i = n(87357),
          d = n(58554),
          c = n(82393),
          u = n(28021),
          l = n(94519),
          f = n(37661),
          h = n(5912),
          m = n(62587),
          p = n(37960),
          g = n(19129),
          y = n(22867),
          b = n(14745),
          v = n(38691),
          w = n(65843),
          I = n(18104);
        const A = "AvU_FtMd",
          C = "RrEzFxte",
          S = 24,
          E = (0, r.ph)((e) => {
            let {
              containerRef: t,
              sticker: n,
              thumbClassName: E,
              fullMediaHash: k,
              fullMediaClassName: T,
              isSmall: P,
              size: M = S,
              customColor: L,
              loopLimit: N,
              shouldLoop: F = !1,
              shouldPreloadPreview: B,
              forceAlways: x,
              forceOnHeavyAnimation: O,
              observeIntersectionForLoading: R,
              observeIntersectionForPlaying: D,
              noLoad: U,
              noPlay: _,
              noVideoOnMobile: $,
              withSharedAnimation: j,
              withTranslucentThumb: H,
              sharedCanvasRef: V,
              onVideoEnded: z,
              onAnimatedStickerLoop: W,
            } = e;
            const { id: J, isLottie: K, stickerSetInfo: q, emoji: G } = n,
              [X, Y] = (0, f.A)(),
              Q = n.isVideo && (!c.OF || ($ && (c.pz || c.Ni))),
              Z = n.isVideo,
              ee = !K && !Z,
              te = (0, s.Mw)(n, "preview"),
              ne = (0, v.A)(),
              re = (0, u.A)(L),
              oe = (0, h.Vz)(t, R),
              se = oe && !U,
              ae = (0, h.Vz)(t, D) && oe,
              ie = ae && !_,
              de = (0, r.li)(ae);
            !de.current && ae && (de.current = !0);
            const ce = d.Ih(te),
              ue = (function (e) {
                const [t, n] = (0, r.Ul)(!1),
                  o = r.OV;
                return (
                  (0, r.vJ)(() => {
                    o() || n(!0);
                  }, [o, n]),
                  (0, g.A)(() => t() && e, [t, e])
                );
              })(de.current),
              le = Q || (ee ? P : _),
              fe = !L && !ce && (!ue || le),
              he = (0, m.A)(te, !fe),
              me = fe || ce,
              pe = Boolean(le || (k === te && (ce || he))),
              ge = (0, m.A)(k || `sticker${J}`, !se || pe),
              ye = ue && !pe && ge && !X,
              [be, ve] = (0, f.A)(),
              we = ye && (ee || be),
              Ie = (0, y.A)(n),
              Ae = ce || he || Ie,
              Ce = V && !H,
              Se = Boolean(K && me),
              Ee = (0, p.A)(Ae && !we, { noCloseTransition: Se }),
              ke = (0, p.A)(we, { noOpenTransition: Se }),
              Te = (0, l.A)(t, V);
            (0, m.A)(te, !se || !B);
            const Pe = (0, b.A)(),
              Me = (0, r.Kr)(
                () =>
                  [j ? "shared" : Pe, J, M, j ? L : void 0, ne]
                    .filter(Boolean)
                    .join("_"),
                [L, ne, J, Pe, M, j]
              );
            return r.Ay.createElement(
              r.Ay.Fragment,
              null,
              r.Ay.createElement("img", {
                ref: Ee,
                src: Ae,
                className: (0, i.A)(
                  "gYSfUe37",
                  Se && A,
                  Ce && "vbcXDDxa",
                  E,
                  "sticker-media"
                ),
                alt: "",
                draggable: !1,
              }),
              ye &&
                (K
                  ? r.Ay.createElement(I.A, {
                      ref: ke,
                      key: Me,
                      renderId: Me,
                      size: M,
                      className: (0, i.A)(C, (Se || Ce) && A, T),
                      tgsUrl: ge,
                      play: ie,
                      noLoop: !F,
                      forceOnHeavyAnimation: x || O,
                      forceAlways: x,
                      isLowPriority: P && !(0, a.CzR)((0, o.mS)(), q),
                      sharedCanvas: V?.current || void 0,
                      sharedCanvasCoords: Te,
                      onLoad: ve,
                      onLoop: W,
                      onEnded: W,
                      color: L,
                    })
                  : Z
                  ? r.Ay.createElement(w.A, {
                      ref: ke,
                      canPlay: ie,
                      className: (0, i.A)(C, T, "sticker-media"),
                      src: ge,
                      playsInline: !0,
                      muted: !0,
                      loop: F && !N,
                      isPriority: x,
                      disablePictureInPicture: !0,
                      onReady: ve,
                      onBroken: Y,
                      onEnded: z,
                      style: re,
                    })
                  : r.Ay.createElement("img", {
                      ref: ke,
                      className: (0, i.A)(C, T, "sticker-media"),
                      src: ge,
                      alt: G,
                      style: re,
                      draggable: !1,
                    }))
            );
          });
      },
      76471: (e, t, n) => {
        n.d(t, { A: () => u });
        var r = n(84051),
          o = n(31481),
          s = n(87357),
          a = n(90603),
          i = n(14242),
          d = n(4961);
        const c = "A72KeAmh",
          u = (0, r.ph)((e) => {
            let {
              className: t,
              letterClassName: n,
              topicId: u,
              iconColor: l,
              title: f,
              onClick: h,
            } = e;
            const m = (0, a.GR)(l);
            return u === o.HxB
              ? r.Ay.createElement("i", {
                  className: (0, s.A)(
                    c,
                    t,
                    "icon",
                    "icon-hashtag",
                    "general-forum-icon"
                  ),
                  onClick: h,
                })
              : r.Ay.createElement(
                  "div",
                  { className: (0, s.A)(c, t), onClick: h },
                  r.Ay.createElement("img", {
                    className: "eLEPgwPj",
                    src: m,
                    alt: "",
                    draggable: !1,
                  }),
                  r.Ay.createElement(
                    "div",
                    { className: (0, s.A)("ZQJO2BKn", n, "topic-icon-letter") },
                    (0, d.A)((0, i.Qh)(f, 1))
                  )
                );
          });
      },
      42186: (e, t, n) => {
        n.d(t, { w: () => T });
        const r = n.p + "QrPlane.a921709f266564f65b7e.tgs",
          o = n.p + "CameraFlip.1a9fe44cf01fcb22347d.tgs",
          s = n.p + "HandFilled.f87939d160f1dc288586.tgs",
          a = n.p + "HandOutline.f9831751ba60df30c484.tgs",
          i = n.p + "Speaker.04bb3743412b41ff83c5.tgs",
          d = n.p + "VoiceAllowTalk.a9cc7c39ec438973ddc9.tgs",
          c = n.p + "VoiceMini.bf00ffdf69625c579569.tgs",
          u = n.p + "VoiceMuted.a4b4ec6bfd7c6c5fb275.tgs",
          l = n.p + "VoiceOutlined.91b394ab3562cdfad6bc.tgs",
          f = n.p + "Flame.d1a2dae178cb492c75ea.tgs",
          h = n.p + "Fragment.b1bf3a076c00ef525901.tgs",
          m = n.p + "Mention.810d50783976689ed870.tgs",
          p = n.p + "PartyPopper.287e4290662b3d2b269c.tgs",
          g = n.p + "Invite.4502ec3aa4249d6e6723.tgs",
          y = n.p + "Requests.af9f19772695a8898810.tgs",
          b = n.p + "LastSeen.b16ff3c97561138c2406.tgs",
          v = n.p + "TwoFactorSetupMonkeyClose.604c4c833d322b7e6c3e.tgs",
          w = n.p + "TwoFactorSetupMonkeyIdle.dea4a492c144df84ddab.tgs",
          I = n.p + "TwoFactorSetupMonkeyPeek.1905436b042520363d7e.tgs",
          A = n.p + "TwoFactorSetupMonkeyTracking.eb5a7a6f166fb7589c12.tgs",
          C = n.p + "ReadTime.015d6e6f73f768f1e9fe.tgs",
          S = n.p + "Congratulations.b6623b8efc6fedec9d33.tgs",
          E = n.p + "DiscussionGroupsDucks.9ea453d1be9d1b0ee77a.tgs",
          k = n.p + "Experimental.43d62096368bf5a00ae3.tgs",
          T = {
            MonkeyIdle: w,
            MonkeyTracking: A,
            MonkeyClose: v,
            MonkeyPeek: I,
            FoldersAll: n.p + "FoldersAll.3f9f9e243d19f0fbf9aa.tgs",
            FoldersNew: n.p + "FoldersNew.9a40d71c0c8be70f5bd1.tgs",
            FoldersShare: n.p + "FoldersShare.3356f97ced75bf97121c.tgs",
            DiscussionGroups: E,
            Lock: n.p + "Lock.12547a0228d4fa544e53.tgs",
            CameraFlip: o,
            HandFilled: s,
            HandOutline: a,
            Speaker: i,
            VoiceAllowTalk: d,
            VoiceMini: c,
            VoiceMuted: u,
            VoiceOutlined: l,
            JoinRequest: y,
            Invite: g,
            QrPlane: r,
            Congratulations: S,
            Experimental: k,
            PartyPopper: p,
            Flame: f,
            ReadTime: C,
            Unlock: n.p + "Unlock.15931385f7a95ab1a000.tgs",
            LastSeen: b,
            Mention: m,
            Fragment: h,
          };
      },
      91525: (e, t, n) => {
        n.d(t, {
          ON: () => c,
          QC: () => i,
          fE: () => d,
          rK: () => a,
          zV: () => s,
        });
        const r = 1073741824,
          o = 1048576;
        function s(e) {
          return e > r / 2
            ? `${(e / r).toFixed(1)} GB`
            : e > o / 2
            ? `${(e / o).toFixed(1)} MB`
            : `${(e / 1024).toFixed(1)} KB`;
        }
        function a(e) {
          const { fileName: t, mimeType: n } = e;
          return i(t, n);
        }
        function i(e, t) {
          return e && -1 !== e.indexOf(".")
            ? e.split(".").pop()
            : t.split("/").pop();
        }
        function d(e) {
          switch (e) {
            case "apk":
            case "xls":
            case "xlsx":
            case "ods":
              return "green";
            case "zip":
            case "rar":
            case "7z":
            case "tar":
            case "gz":
            case "bz2":
            case "liz":
            case "lz4":
            case "lz5":
            case "xz":
            case "zst":
            case "wim":
            case "ppt":
            case "pptx":
            case "odp":
              return "orange";
            case "pdf":
            case "xps":
              return "red";
            default:
              return "default";
          }
        }
        function c(e) {
          return Boolean(e.previewBlobUrl || e.thumbnail);
        }
      },
      76023: (e, t, n) => {
        n.d(t, {
          $: () => d,
          $w: () => S,
          AC: () => h,
          Wd: () => c,
          _e: () => f,
          bu: () => L,
          cf: () => l,
          ck: () => E,
          kn: () => C,
          ky: () => F,
          mr: () => P,
          rO: () => k,
          ri: () => T,
          sk: () => N,
          tP: () => M,
          w4: () => A,
          wy: () => i,
        });
        var r = n(31481),
          o = n(90709),
          s = n(82393),
          a = n(43503);
        const i = "(max-height: 640px)",
          d = parseInt(getComputedStyle(document.documentElement).fontSize, 10),
          c = 240,
          u = 300,
          l = { width: 640, height: 640 },
          f = { width: 800, height: 800 },
          h = "4986041492570112461",
          m = { width: 100, height: 100 },
          p = 4.5,
          g = 7,
          y = 29,
          b = 30;
        let v, w, I;
        function A(e, t, n, r, o) {
          const s = t && n ? 2.25 : t || n ? 1.625 : 0,
            i =
              (function (e, t, n) {
                if (!n) return e ? b : y;
                const { width: r } = a.A.get();
                return (
                  v || (v = Math.min(b, r / d - p)),
                  w || (w = Math.min(y, r / d - g)),
                  I || (I = Math.min(y, r / d - p)),
                  e ? v : t ? I : w
                );
              })(e, r, o) - s;
          return i * d;
        }
        function C(e) {
          let {
            width: t,
            height: n,
            fromOwnMessage: r,
            asForwarded: o,
            isWebPageMedia: s,
            isGif: a,
            noAvatars: i,
            isMobile: c,
          } = e;
          const l = n / t,
            f = A(r, o, s, i, c),
            h = (function (e, t) {
              return e && t && t >= 0.75 && t <= 1.25 ? 20 * d : 27 * d;
            })(a, l),
            m = a ? Math.max(u, t) : t;
          return F(f, h, m, a ? n * (m / t) : n);
        }
        function S(e, t) {
          const n = window.matchMedia(i),
            { width: r, height: o } = a.A.get();
          let c = t && n.matches ? 10 : 8.25;
          return (
            e && !s.TF && (c = n.matches ? 10 : 12.5),
            { width: r, height: o - c * d }
          );
        }
        function E(e, t, n, r, s, a) {
          const { width: i, height: d } = (0, o.xi)(e) || m;
          return C({
            width: i,
            height: d,
            fromOwnMessage: t,
            asForwarded: n,
            isWebPageMedia: r,
            noAvatars: s,
            isMobile: a,
          });
        }
        function k(e, t, n, r, s, a) {
          const { width: i, height: d } = (0, o.NZ)(e) || m;
          return C({
            width: i,
            height: d,
            fromOwnMessage: t,
            asForwarded: n,
            isWebPageMedia: r,
            isGif: e.isGif,
            noAvatars: s,
            isMobile: a,
          });
        }
        function T(e, t, n, r, o, s) {
          const { width: a = m.width, height: i = m.height } = e;
          return C({
            width: a,
            height: i,
            fromOwnMessage: t,
            asForwarded: n,
            isWebPageMedia: r,
            noAvatars: o,
            isMobile: s,
          });
        }
        function P() {
          return { width: 2 * d, height: 2 * d };
        }
        function M(e) {
          return e
            ? { width: 3 * d, height: 3 * d }
            : { width: 3.375 * d, height: 3.375 * d };
        }
        function L(e, t) {
          const { width: n } = e;
          let { height: o } = e;
          e.id === h && (o = n);
          const s = o && n && o / n,
            a = d * (t ? r.naf : r.H4O),
            i = s ? a * s : a;
          return s && i > a
            ? { width: Math.round(a / s), height: a }
            : { width: a, height: i };
        }
        function N(e, t) {
          let { width: n, height: r } = e,
            o = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
          const { width: s, height: a } = S(t, o);
          return F(s, a, n, r);
        }
        function F(e, t, n, r) {
          const o = r / n,
            s = Math.min(n, e);
          return Math.round(s * o) > t
            ? { width: Math.round(t / o), height: t }
            : { width: s, height: Math.round(s * o) };
        }
      },
      59776: (e, t, n) => {
        n.d(t, { V: () => A });
        var r = n(84051),
          o = n(31481),
          s = n(90709),
          a = n(3544),
          i = n(17142),
          d = n(58849),
          c = n(4961),
          u = n(13439),
          l = n(87357),
          f = n(96530);
        const h = (0, r.ph)((e) => {
          let { className: t, chatId: n, children: o } = e;
          const { openChat: s } = (0, u.ko)(),
            a = (0, r.hb)(() => {
              n && s({ id: n });
            }, [n, s]);
          return n
            ? r.Ay.createElement(
                f.A,
                { className: (0, l.A)("ChatLink", t), onClick: a },
                o
              )
            : o;
        });
        var m = n(87412);
        const p = (e) => {
            let { className: t, groupCall: n, children: o } = e;
            const { requestMasterAndJoinGroupCall: s } = (0, u.ko)(),
              a = (0, r.hb)(() => {
                n && s({ id: n.id, accessHash: n.accessHash });
              }, [n, s]);
            return n
              ? r.Ay.createElement(
                  f.A,
                  { className: (0, l.A)("GroupCallLink", t), onClick: a },
                  o
                )
              : o;
          },
          g = (e) => {
            let { className: t, message: n, children: o } = e;
            const { focusMessage: s } = (0, u.ko)(),
              a = (0, r.hb)(() => {
                n && s({ chatId: n.chatId, messageId: n.id });
              }, [s, n]);
            return n
              ? r.Ay.createElement(
                  f.A,
                  { className: (0, l.A)("MessageLink", t), onClick: a },
                  o
                )
              : o;
          };
        var y = n(18653),
          b = n(76471);
        const v = (e) => {
            let { className: t, sender: n, children: o } = e;
            const { openChat: s } = (0, u.ko)(),
              a = (0, r.hb)(() => {
                n && s({ id: n.id });
              }, [n, s]);
            return n
              ? r.Ay.createElement(
                  f.A,
                  { className: (0, l.A)("UserLink", t), onClick: a },
                  o
                )
              : o;
          },
          w = 32,
          I = " ";
        function A(e, t, n, u, l, f, v, A) {
          let E =
              arguments.length > 8 && void 0 !== arguments[8]
                ? arguments[8]
                : {},
            k = arguments.length > 9 ? arguments[9] : void 0,
            T = arguments.length > 10 ? arguments[10] : void 0;
          if ((0, s.r$)(t)) return (0, s.Po)(e, t);
          if (!t.content.action) return [];
          const {
              text: P,
              translationValues: M,
              amount: L,
              currency: N,
              call: F,
              score: B,
              topicEmojiIconId: x,
              giftCryptoInfo: O,
              pluralValue: R,
            } = t.content.action,
            D = [],
            U = E.asPlainText || E.isEmbedded,
            _ =
              "Chat.Service.Group.UpdatedPinnedMessage1" !== P || f
                ? P
                : "Message.PinnedGenericMessage";
          let $,
            j = e(_, M?.length ? M : void 0, void 0, R);
          if (
            (_.includes("ScoredInGame") &&
              (j = j
                .replace("un1", "%action_origin%")
                .replace("un2", "%message%")),
            "ActionGiftOutbound" === _ &&
              (j = j
                .replace("un2", "%gift_payment_amount%")
                .replace(/\*\*/g, "")),
            "ActionGiftInbound" === _ &&
              (j = j
                .replace("un1", "%action_origin%")
                .replace("un2", "%gift_payment_amount%")
                .replace(/\*\*/g, "")),
            "ActionRefunded" === _ &&
              (j = j
                .replace("un1", "%action_origin%")
                .replace("%1$s", "%gift_payment_amount%")),
            "ActionRequestedPeer" === _ &&
              (j = j
                .replace("un1", "%star_target_user%")
                .replace("un2", "%action_origin%")
                .replace(/\*\*/g, "")),
            "BoostingReceivedPrizeFrom" === _ &&
              (j = j.replace("**%s**", "%target_chat%").replace(/\*\*/g, "")),
            j.includes("%star_target_user%") &&
              (($ = S(
                j,
                "%star_target_user%",
                l ? l.map((e) => C(e, U)).filter(Boolean) : "User"
              )),
              (j = $.pop()),
              D.push(...$)),
            ($ = S(
              j,
              "%action_origin%",
              n
                ? n.id === o.zv8
                  ? e("StarsTransactionUnknown")
                  : C(n, U) || I
                : u
                ? (function (e, t, n) {
                    const o = (0, d.A)((0, s.Js)(e, t), w);
                    return n
                      ? (0, c.A)(o)
                      : r.Ay.createElement(
                          h,
                          { className: "action-link", chatId: t.id },
                          t && (0, c.A)(o)
                        );
                  })(e, u, U) || I
                : "User",
              ""
            )),
            (j = $.pop()),
            D.push(...$),
            j.includes("%payment_amount%") &&
              (($ = S(j, "%payment_amount%", (0, i.A)(L, N, e.code))),
              (j = $.pop()),
              D.push(...$)),
            j.includes("%action_topic%") &&
              (($ = S(
                j,
                "%action_topic%",
                [
                  A?.iconEmojiId
                    ? r.Ay.createElement(m.A, {
                        documentId: A.iconEmojiId,
                        isSelectable: !0,
                      })
                    : "",
                  A ? `${A.title}` : "a topic",
                ],
                ""
              )),
              (j = $.pop()),
              D.push(...$)),
            j.includes("%action_topic_icon%"))
          ) {
            const e = x || A?.iconEmojiId;
            ($ = S(
              j,
              "%action_topic_icon%",
              e && "0" !== e
                ? r.Ay.createElement(m.A, { documentId: e, isSelectable: !0 })
                : A
                ? r.Ay.createElement(b.A, { topicId: A.id, title: A.title })
                : "..."
            )),
              (j = $.pop()),
              D.push(...$);
          }
          if (j.includes("%gift_payment_amount%")) {
            const t = (0, i.A)(L, N, e.code);
            let n = t;
            O && (n = `${(0, i.A)(O.amount, O.currency, e.code)} (${t})`),
              ($ = S(j, "%gift_payment_amount%", n)),
              (j = $.pop()),
              D.push(...$);
          }
          return (
            j.includes("%amount%") &&
              (($ = S(j, "%amount%", L)), (j = $.pop()), D.push(...$)),
            j.includes("%score%") &&
              (($ = S(j, "%score%", B.toString())),
              (j = $.pop()),
              D.push(...$)),
            ($ = S(
              j,
              "%target_user%",
              l ? l.map((e) => C(e, U)).filter(Boolean) : "User",
              ""
            )),
            (j = $.pop()),
            D.push(...$),
            ($ = S(
              j,
              "%message%",
              f
                ? (function (e, t) {
                    let n =
                        arguments.length > 2 && void 0 !== arguments[2]
                          ? arguments[2]
                          : {},
                      o = arguments.length > 3 ? arguments[3] : void 0,
                      s = arguments.length > 4 ? arguments[4] : void 0;
                    const { asPlainText: i, isEmbedded: d } = n;
                    if (i) return (0, a.dS)(e, t, void 0, w);
                    const c = r.Ay.createElement(y.A, {
                      message: t,
                      truncateLength: w,
                      observeIntersectionForLoading: o,
                      observeIntersectionForPlaying: s,
                      withTranslucentThumbs: !0,
                    });
                    return d
                      ? c
                      : r.Ay.createElement(
                          g,
                          { className: "action-link", message: t },
                          c
                        );
                  })(e, f, E, k, T)
                : "a message"
            )),
            (j = $.pop()),
            D.push(...$),
            ($ = S(
              j,
              "%product%",
              f
                ? (function (e) {
                    return e.content && e.content.invoice
                      ? e.content.invoice.title
                      : "a product";
                  })(f)
                : "a product"
            )),
            (j = $.pop()),
            D.push(...$),
            ($ = S(
              j,
              "%target_chat%",
              v
                ? (function (e, t) {
                    const n = "another chat";
                    return t
                      ? n
                      : r.Ay.createElement(
                          h,
                          {
                            className: "action-link underlined-link",
                            chatId: e,
                          },
                          n
                        );
                  })(v, U)
                : "another chat",
              ""
            )),
            $.forEach((e) => {
              D.push(...(0, c.A)(e));
            }),
            E.asPlainText
              ? D.join("").trim()
              : F
              ? (function (e, t) {
                  return r.Ay.createElement(p, { groupCall: e }, t);
                })(F, D)
              : D
          );
        }
        function C(e, t) {
          const n = (0, d.A)((0, s.Yg)(e), w);
          return t
            ? (0, c.A)(n)
            : r.Ay.createElement(
                v,
                { className: "action-link", sender: e },
                e && (0, c.A)(n)
              );
        }
        function S(e, t, n) {
          let r =
            arguments.length > 3 && void 0 !== arguments[3]
              ? arguments[3]
              : ",";
          const o = e.indexOf(t);
          if (o < 0 || !n) return [e];
          const s = [];
          return (
            s.push(e.substring(0, o)),
            Array.isArray(n)
              ? n.forEach((e, t) => {
                  s.push(e), t + 1 < n.length && s.push(`${r} `);
                })
              : s.push(n),
            s.push(e.substring(o + t.length)),
            s.flat()
          );
        }
      },
      4961: (e, t, n) => {
        n.d(t, { A: () => p, o: () => A });
        var r = n(84051),
          o = n(31481),
          s = n(98221),
          a = n(87357),
          i = n(46275),
          d = n(52491),
          c = n(24282),
          u = n(87894),
          l = n(82393),
          f = n(56362),
          h = n(56440);
        const m = /(\*\*|__).+?\1/g;
        function p(e) {
          let t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : ["emoji"],
            n = arguments.length > 2 ? arguments[2] : void 0;
          return "string" != typeof e
            ? [e]
            : (0, u.oE)(
                t.reduce(
                  (e, t) => {
                    switch (t) {
                      case "escape_html":
                        return (function (e) {
                          const t = document.createElement("div");
                          return e.reduce(
                            (e, n) =>
                              "string" != typeof n
                                ? (e.push(n), e)
                                : ((t.innerText = n), e.push(t.innerHTML), e),
                            []
                          );
                        })(e);
                      case "hq_emoji":
                        return (s.A.lastIndex = 0), g(e, "big", "jsx");
                      case "emoji":
                        return (s.A.lastIndex = 0), g(e, "small", "jsx");
                      case "emoji_html":
                        return (s.A.lastIndex = 0), g(e, "small", "html");
                      case "br":
                        return y(e, "jsx");
                      case "br_html":
                        return y(e, "html");
                      case "highlight":
                        return b(e, n.highlight);
                      case "quote":
                        return b(e, n.quote, !0);
                      case "links":
                        return w(e);
                      case "tg_links":
                        return w(e, !0);
                      case "simple_markdown":
                        return I(e, "jsx", n?.markdownPostProcessor);
                      case "simple_markdown_html":
                        return I(e, "html");
                    }
                    return e;
                  },
                  [e]
                )
              );
        }
        function g(e, t, n) {
          return l.TL
            ? e
            : e.reduce((e, i) => {
                if ("string" != typeof i) return e.push(i), e;
                const u = (i = (0, c.A)(i)).split(s.A),
                  l = i.match(s.A) || [];
                return (
                  e.push(u[0]),
                  l.reduce((e, s, i) => {
                    const c = (0, d.mS)(s);
                    if (c) {
                      const i = `${o.jht ? o.C1b : "."}/img-apple-${
                          "big" === t ? "160" : "64"
                        }/${c}.png`,
                        u = (0, a.A)("emoji", "small" === t && "emoji-small");
                      if ("jsx" === n) {
                        const t = d.On.has(i);
                        e.push(
                          r.Ay.createElement("img", {
                            src: i,
                            className: `${u}${
                              t ? "" : " opacity-transition slow shown"
                            }`,
                            alt: s,
                            "data-path": i,
                            draggable: !1,
                            onLoad: t ? void 0 : d.P_,
                          })
                        );
                      }
                      "html" === n &&
                        e.push(
                          `<img            draggable="false"            class="${u}"            src="${i}"            alt="${s}"          />`
                        );
                    } else e.push(s);
                    const l = 2 * i + 2;
                    return u[l] && e.push(u[l]), e;
                  }, e)
                );
              }, []);
        }
        function y(e, t) {
          return e.reduce((e, n) => {
            if ("string" != typeof n) return e.push(n), e;
            const o = n.split(/\r\n|\r|\n/g).reduce((e, n, o, s) => {
              const a = n.trimLeft(),
                i = n.length - a.length;
              return (
                e.push(String.fromCharCode(160).repeat(i) + a),
                o !== s.length - 1 &&
                  e.push(
                    "jsx" === t ? r.Ay.createElement("br", null) : "<br />"
                  ),
                e
              );
            }, []);
            return [...e, ...o];
          }, []);
        }
        function b(e, t, n) {
          return e.reduce((e, o) => {
            if ("string" != typeof o || !t) return e.push(o), e;
            const s = o.toLowerCase().indexOf(t.toLowerCase());
            if (s < 0) return e.push(o), e;
            const i = [];
            return (
              i.push(o.substring(0, s)),
              i.push(
                r.Ay.createElement(
                  "span",
                  {
                    className: (0, a.A)(
                      "matching-text-highlight",
                      n && "is-quote"
                    ),
                  },
                  o.substring(s, s + t.length)
                )
              ),
              i.push(o.substring(s + t.length)),
              [...e, ...i]
            );
          }, []);
        }
        const v = new RegExp(`${o.kNZ}|${o.sXR}`, "ig");
        function w(e, t) {
          return e.reduce((e, n) => {
            if ("string" != typeof n) return e.push(n), e;
            const o = n.match(v);
            if (!o || !o.length) return e.push(n), e;
            const s = [];
            let a = o.shift(),
              d = 0;
            for (; a; ) {
              const e = n.indexOf(a, d);
              s.push(n.substring(d, e)),
                a.startsWith("@")
                  ? s.push(r.Ay.createElement(f.A, { username: a }, a))
                  : (a.endsWith("?") && (a = a.slice(0, a.length - 1)),
                    !t || (0, i.z)(a)
                      ? s.push(r.Ay.createElement(h.A, { text: a, url: a }))
                      : s.push(a)),
                (d = e + a.length),
                (a = o.shift());
            }
            return s.push(n.substring(d)), [...e, ...s];
          }, []);
        }
        function I(e, t, n) {
          const o = n || ((e) => e);
          return e.reduce((e, n) => {
            if ("string" != typeof n) return e.push(n), e;
            const s = n.split(m),
              a = n.match(m) || [];
            return (
              e.push(o(s[0])),
              a.reduce((e, n, a) => {
                "jsx" === t
                  ? e.push(
                      n.startsWith("**")
                        ? r.Ay.createElement(
                            "b",
                            null,
                            o(n.replace(/\*\*/g, ""))
                          )
                        : r.Ay.createElement("i", null, o(n.replace(/__/g, "")))
                    )
                  : e.push(
                      n.startsWith("**")
                        ? `<b>${n.replace(/\*\*/g, "")}</b>`
                        : `<i>${n.replace(/__/g, "")}</i>`
                    );
                const i = 2 * a + 2;
                return s[i] && e.push(o(s[i])), e;
              }, e)
            );
          }, []);
        }
        function A(e, t) {
          const n = (e.trim().match(/\n/g) || "").length + 1,
            { lineHeight: r } = getComputedStyle(t),
            o = parseFloat(r.split("px")[0]);
          return t.clientHeight >= (n + 1) * o;
        }
      },
      18501: (e, t, n) => {
        n.d(t, { Q: () => L, f: () => M });
        var r = n(84051),
          o = n(13439),
          s = n(23174),
          a = n(87357),
          i = n(85982),
          d = n(47985),
          c = n(58734),
          u = n(4961),
          l = n(56362),
          f = n(57675),
          h = n(17712),
          m = n(18276);
        const p = (e) => {
            let { canBeCollapsible: t, isToggleDisabled: n, children: o } = e;
            const i = (0, r.li)(null),
              {
                isCollapsed: d,
                isCollapsible: c,
                setIsCollapsed: u,
              } = (0, f.A)(i, 4, void 0, !t),
              l = !n && d,
              p = (0, h.A)(() => {
                u(!1);
              }),
              g = (0, h.A)(() => {
                u((e) => !e);
              });
            return r.Ay.createElement(
              "span",
              { className: "KU67Uur0", onClick: l ? p : void 0 },
              r.Ay.createElement(
                "blockquote",
                { ref: i, "data-entity-type": s.C7.Blockquote },
                r.Ay.createElement(
                  "div",
                  { className: (0, a.A)("JNVT2DU9", d && "y_uRZXtA") },
                  o
                ),
                c &&
                  r.Ay.createElement(
                    "div",
                    {
                      className: (0, a.A)("pyX4NpPB", !n && "RmvXwV0W"),
                      onClick: n ? void 0 : g,
                      "aria-hidden": !0,
                    },
                    r.Ay.createElement(m.A, { name: d ? "down" : "up" })
                  )
              )
            );
          },
          g = {
            js: "JavaScript",
            javascript: "JavaScript",
            ts: "TypeScript",
            typescript: "TypeScript",
            python: "Python",
            py: "Python",
            go: "Go",
            rust: "Rust",
            func: "FunC",
            c: "C",
            "c++": "C++",
            cpp: "C++",
            fortran: "Fortran",
            f90: "Fortran",
            f: "Fortran",
            java: "Java",
            sql: "SQL",
            swift: "Swift",
            "objective-c": "Objective-C",
            kotlin: "Kotlin",
            ruby: "Ruby",
            rb: "Ruby",
            php: "PHP",
            perl: "Perl",
            bash: "Bash",
            sh: "Shell",
            markdown: "Markdown",
            "c#": "C#",
            cs: "C#",
            json: "JSON",
            yaml: "YAML",
            yml: "YAML",
            solidity: "Solidity",
            sol: "Solidity",
            tl: "TL",
          };
        var y = n(56863),
          b = n(59030),
          v = n(39751);
        const w = (0, r.ph)((e) => {
            let { text: t, className: n, noCopy: s, onWordWrapToggle: d } = e;
            const { showNotification: c } = (0, o.ko)(),
              l = (0, r.li)(null),
              f = (0, v.A)(),
              h = (0, b.A)(),
              [m, p] = (0, r.J0)(!0),
              [g, y] = (0, r.J0)(!1),
              w = (0, r.hb)(() => {
                const e = (0, u.o)(t, l.current.parentElement);
                y(e);
              }, [t]);
            (0, r.vJ)(() => {
              m && w();
            }, [w, m, t, f]);
            const I = (0, r.hb)(() => {
                (0, i.eM)(t), c({ message: h("TextCopied") });
              }, [h, c, t]),
              A = (0, r.hb)(() => {
                p(!m), d?.(!m);
              }, [m, d]),
              C = (0, a.A)("L95Dh7wN", !g && s && "zctwFUQ8"),
              S = (0, a.A)("pMUccFN9", n),
              E = (0, a.A)("a44ZN3hD", m && "jq1KLfVD");
            return r.Ay.createElement(
              "div",
              { className: S, ref: l },
              r.Ay.createElement(
                "div",
                { className: C },
                g &&
                  r.Ay.createElement(
                    "div",
                    { className: E, onClick: A, title: "Word Wrap" },
                    r.Ay.createElement("i", {
                      className: "icon icon-word-wrap",
                    })
                  ),
                !s &&
                  r.Ay.createElement(
                    "div",
                    { className: "auCNtLQ4", onClick: I, title: h("Copy") },
                    r.Ay.createElement("i", { className: "icon icon-copy" })
                  )
              )
            );
          }),
          I = (0, r.ph)((e) => {
            let { text: t, language: o, noCopy: i } = e;
            const [d, c] = (0, r.J0)(!0),
              { result: u } = (0, y.A)(
                () =>
                  o
                    ? Promise.all([n.e(2118), n.e(3325)])
                        .then(n.bind(n, 73325))
                        .then((e) => e.default(t, o))
                    : Promise.resolve(void 0),
                [o, t]
              ),
              l = (0, r.hb)((e) => {
                c(e);
              }, []),
              f = (0, a.A)("code-block", !d && "no-word-wrap");
            return r.Ay.createElement(
              "div",
              { className: "CodeBlock" },
              o &&
                r.Ay.createElement(
                  "p",
                  { className: "code-title" },
                  g[(h = o).toLowerCase()] ?? h
                ),
              r.Ay.createElement(
                "pre",
                {
                  className: f,
                  "data-entity-type": s.C7.Pre,
                  "data-language": o,
                },
                u ?? t,
                r.Ay.createElement(w, {
                  text: t,
                  className: "code-overlay",
                  onWordWrapToggle: l,
                  noCopy: i,
                })
              )
            );
            var h;
          });
        var A = n(87412),
          C = n(56440),
          S = n(37661);
        const E = new Map(),
          k = (0, a.x)("Spoiler"),
          T = (0, r.ph)((e) => {
            let { children: t, containerId: n } = e;
            const o = (0, r.li)(null),
              [a, i] = (0, S.A)(),
              d = (0, h.A)((e) => {
                n &&
                  (e.preventDefault(),
                  e.stopPropagation(),
                  E.get(n)?.forEach((e) => e()));
              });
            return (
              (0, r.vJ)(() => {
                if (n)
                  return (
                    E.has(n) ? E.get(n).push(i) : E.set(n, [i]),
                    () => {
                      E.delete(n);
                    }
                  );
              }, [n]),
              r.Ay.createElement(
                "span",
                {
                  className: k(
                    "&",
                    !a && "concealed",
                    !a && Boolean(n) && "animated"
                  ),
                  onClick: n && !a ? d : void 0,
                  "data-entity-type": s.C7.Spoiler,
                },
                r.Ay.createElement(
                  "span",
                  { className: k("content"), ref: o },
                  t
                )
              )
            );
          }),
          P = 64;
        function M(e) {
          let {
            text: t,
            entities: n,
            highlight: o,
            emojiSize: i,
            shouldRenderAsHtml: d,
            containerId: f,
            isSimple: h,
            isProtected: m,
            noLineBreaks: g,
            observeIntersectionForLoading: y,
            observeIntersectionForPlaying: b,
            withTranslucentThumbs: v,
            sharedCanvasRef: w,
            sharedCanvasHqRef: S,
            cacheBuster: E,
            forcePlayback: k,
            focusedQuote: P,
            isInSelectMode: M,
          } = e;
          if (!n?.length)
            return N({
              content: t,
              highlight: o,
              focusedQuote: P,
              emojiSize: i,
              shouldRenderAsHtml: d,
              isSimple: h,
              noLineBreaks: g,
            });
          const L = [];
          let D = !1;
          const U = (function (e) {
            const t = new Set(),
              n = [];
            return (
              e.forEach((r, o) => {
                if (t.has(o)) return;
                const s = F(r, o, e, t);
                s &&
                  (s.organizedIndexes.forEach((e) => {
                    t.add(e);
                  }),
                  n.push(s));
              }),
              n
            );
          })(n);
          function _(e, n, L, F) {
            const U = [],
              { entity: $, nestedEntities: j } = L,
              { offset: H, length: V, type: z } = $;
            let W = t.substring(e, H);
            const J = W.length;
            W &&
              (D &&
                W.length > 0 &&
                "\n" === W[0] &&
                ((W = W.substr(1)), (D = !1)),
              W &&
                U.push(
                  ...N({
                    content: W,
                    highlight: o,
                    focusedQuote: P,
                    emojiSize: i,
                    shouldRenderAsHtml: d,
                    isSimple: h,
                    noLineBreaks: g,
                  })
                ));
            const K = e + J,
              q = K + V;
            let G = t.substring(H, H + V);
            const X = [];
            if (
              (D &&
                G.length > 0 &&
                "\n" === G[0] &&
                ((G = G.substr(1)), (D = !1)),
              z === s.C7.Pre && (D = !0),
              j.length)
            ) {
              let e = K;
              j.forEach((t, n) => {
                const { renderResult: r, entityEndIndex: o } = _(
                  e,
                  q,
                  t,
                  n === j.length - 1
                );
                X.push(...r), (e = o);
              });
            }
            const Y = d
              ? (function (e, t, n) {
                  const r = "string" == typeof t ? t : void 0,
                    o = e.type === s.C7.Pre ? t.trimEnd() : t,
                    a = n.length
                      ? n.join("")
                      : (0, u.A)(o, [
                          "escape_html",
                          "emoji_html",
                          "br_html",
                        ]).join("");
                  if (!r) return a;
                  switch (e.type) {
                    case s.C7.Bold:
                      return `<b>${a}</b>`;
                    case s.C7.Italic:
                      return `<i>${a}</i>`;
                    case s.C7.Underline:
                      return `<u>${a}</u>`;
                    case s.C7.Code:
                      return `<code class="text-entity-code">${a}</code>`;
                    case s.C7.Pre:
                      return `\`\`\`${(0, u.A)(e.language || "", [
                        "escape_html",
                      ])}<br/>${a}<br/>\`\`\`<br/>`;
                    case s.C7.Strike:
                      return `<del>${a}</del>`;
                    case s.C7.MentionName:
                      return `<a\n        class="text-entity-link"\n        data-entity-type="${s.C7.MentionName}"\n        data-user-id="${e.userId}"\n        contenteditable="false"\n        dir="auto"\n      >${a}</a>`;
                    case s.C7.Url:
                    case s.C7.TextUrl:
                      return `<a\n        class="text-entity-link"\n        href=${B(
                        r,
                        e
                      )}\n        data-entity-type="${
                        e.type
                      }"\n        dir="auto"\n      >${a}</a>`;
                    case s.C7.Spoiler:
                      return `<span\n        class="spoiler"\n        data-entity-type="${s.C7.Spoiler}"\n        >${a}</span>`;
                    case s.C7.CustomEmoji:
                      return (0, c.Y5)(r, e);
                    case s.C7.Blockquote:
                      return `<blockquote\n        class="blockquote"\n        data-entity-type="${s.C7.Blockquote}"\n        >${a}</blockquote>`;
                    default:
                      return a;
                  }
                })($, G, X)
              : (function (e) {
                  let {
                    entity: t,
                    entityContent: n,
                    nestedEntityContent: o,
                    highlight: i,
                    focusedQuote: d,
                    containerId: c,
                    isSimple: u,
                    noLineBreaks: f,
                    isProtected: h,
                    observeIntersectionForLoading: m,
                    observeIntersectionForPlaying: g,
                    withTranslucentThumbs: y,
                    emojiSize: b,
                    sharedCanvasRef: v,
                    sharedCanvasHqRef: w,
                    cacheBuster: S,
                    forcePlayback: E,
                    isInSelectMode: k,
                  } = e;
                  const P = "string" == typeof n && n,
                    M = o.length ? o : n;
                  function L() {
                    return N({
                      content: M,
                      highlight: i,
                      focusedQuote: d,
                      emojiSize: b,
                      isSimple: u,
                      noLineBreaks: f,
                    });
                  }
                  if (!P) return L();
                  if (u) {
                    const e = L();
                    return t.type === s.C7.Spoiler
                      ? r.Ay.createElement(T, null, e)
                      : t.type === s.C7.CustomEmoji
                      ? r.Ay.createElement(A.A, {
                          key: S ? `${S}-${t.offset}` : void 0,
                          documentId: t.documentId,
                          size: b,
                          isSelectable: !0,
                          withSharedAnimation: !0,
                          sharedCanvasRef: v,
                          sharedCanvasHqRef: w,
                          observeIntersectionForLoading: m,
                          observeIntersectionForPlaying: g,
                          withTranslucentThumb: y,
                          forceAlways: E,
                        })
                      : e;
                  }
                  switch (t.type) {
                    case s.C7.Bold:
                      return r.Ay.createElement(
                        "strong",
                        { "data-entity-type": t.type },
                        L()
                      );
                    case s.C7.Blockquote:
                      return r.Ay.createElement(
                        p,
                        {
                          canBeCollapsible: t.canCollapse,
                          isToggleDisabled: k,
                        },
                        L()
                      );
                    case s.C7.BotCommand:
                      return r.Ay.createElement(
                        "a",
                        {
                          onClick: x,
                          className: "text-entity-link",
                          dir: "auto",
                          "data-entity-type": t.type,
                        },
                        L()
                      );
                    case s.C7.Hashtag:
                    case s.C7.Cashtag:
                      return r.Ay.createElement(
                        "a",
                        {
                          onClick: O,
                          className: "text-entity-link",
                          dir: "auto",
                          "data-entity-type": t.type,
                        },
                        L()
                      );
                    case s.C7.Code:
                      return r.Ay.createElement(
                        "code",
                        {
                          className: (0, a.A)(
                            "text-entity-code",
                            !h && "clickable"
                          ),
                          onClick: h ? void 0 : R,
                          role: "textbox",
                          tabIndex: 0,
                          "data-entity-type": t.type,
                        },
                        L()
                      );
                    case s.C7.Email:
                      return r.Ay.createElement(
                        "a",
                        {
                          href: `mailto:${P}`,
                          target: "_blank",
                          rel: "noopener noreferrer",
                          className: "text-entity-link",
                          dir: "auto",
                          "data-entity-type": t.type,
                        },
                        L()
                      );
                    case s.C7.Italic:
                      return r.Ay.createElement(
                        "em",
                        { "data-entity-type": t.type },
                        L()
                      );
                    case s.C7.MentionName:
                      return r.Ay.createElement(l.A, { userId: t.userId }, L());
                    case s.C7.Mention:
                      return r.Ay.createElement(l.A, { username: P }, L());
                    case s.C7.Phone:
                      return r.Ay.createElement(
                        "a",
                        {
                          href: `tel:${P}`,
                          className: "text-entity-link",
                          dir: "auto",
                          "data-entity-type": t.type,
                        },
                        L()
                      );
                    case s.C7.Pre:
                      return r.Ay.createElement(I, {
                        text: P,
                        language: t.language,
                        noCopy: h,
                      });
                    case s.C7.Strike:
                      return r.Ay.createElement(
                        "del",
                        { "data-entity-type": t.type },
                        L()
                      );
                    case s.C7.TextUrl:
                    case s.C7.Url:
                      return r.Ay.createElement(
                        C.A,
                        { url: B(P, t), text: P, withNormalWordBreak: !0 },
                        L()
                      );
                    case s.C7.Underline:
                      return r.Ay.createElement(
                        "ins",
                        { "data-entity-type": t.type },
                        L()
                      );
                    case s.C7.Spoiler:
                      return r.Ay.createElement(T, { containerId: c }, L());
                    case s.C7.CustomEmoji:
                      return r.Ay.createElement(A.A, {
                        key: S ? `${S}-${t.offset}` : void 0,
                        documentId: t.documentId,
                        size: b,
                        isSelectable: !0,
                        withSharedAnimation: !0,
                        sharedCanvasRef: v,
                        sharedCanvasHqRef: w,
                        observeIntersectionForLoading: m,
                        observeIntersectionForPlaying: g,
                        withTranslucentThumb: y,
                        forceAlways: E,
                      });
                    default:
                      return L();
                  }
                })({
                  entity: $,
                  entityContent: G,
                  nestedEntityContent: X,
                  highlight: o,
                  focusedQuote: P,
                  containerId: f,
                  isSimple: h,
                  noLineBreaks: g,
                  isProtected: m,
                  observeIntersectionForLoading: y,
                  observeIntersectionForPlaying: b,
                  withTranslucentThumbs: v,
                  emojiSize: i,
                  sharedCanvasRef: w,
                  sharedCanvasHqRef: S,
                  cacheBuster: E,
                  forcePlayback: k,
                  isInSelectMode: M,
                });
            if ((Array.isArray(Y) ? U.push(...Y) : U.push(Y), F && q < n)) {
              let e = t.substring(q, n);
              D && e.length > 0 && "\n" === e[0] && (e = e.substring(1)),
                e &&
                  U.push(
                    ...N({
                      content: e,
                      highlight: o,
                      focusedQuote: P,
                      emojiSize: i,
                      shouldRenderAsHtml: d,
                      isSimple: h,
                      noLineBreaks: g,
                    })
                  );
            }
            return { renderResult: U, entityEndIndex: q };
          }
          let $ = 0;
          return (
            U.forEach((e, n) => {
              const { renderResult: r, entityEndIndex: o } = _(
                $,
                t.length,
                e,
                n === U.length - 1
              );
              L.push(...r), ($ = o);
            }),
            L
          );
        }
        function L(e) {
          const { text: t, entities: n } = e || {};
          if (!t) return "";
          const r = M({ text: t, entities: n, shouldRenderAsHtml: !0 });
          return Array.isArray(r) ? r.join("") : r;
        }
        function N(e) {
          let {
            content: t,
            highlight: n,
            focusedQuote: r,
            emojiSize: o,
            shouldRenderAsHtml: s,
            isSimple: a,
            noLineBreaks: i,
          } = e;
          if (Array.isArray(t)) {
            const e = [];
            return (
              t.forEach((t) => {
                e.push(
                  ...N({
                    content: t,
                    highlight: n,
                    focusedQuote: r,
                    emojiSize: o,
                    shouldRenderAsHtml: s,
                    isSimple: a,
                    noLineBreaks: i,
                  })
                );
              }),
              e
            );
          }
          if (s) return (0, u.A)(t, ["escape_html", "emoji_html", "br_html"]);
          const d = [o && o > P ? "hq_emoji" : "emoji"],
            c = {};
          return (
            a || i || d.push("br"),
            n && (d.push("highlight"), (c.highlight = n)),
            r && (d.push("quote"), (c.quote = r)),
            (0, u.A)(t, d, c)
          );
        }
        function F(e, t, n, r) {
          const { offset: o, length: s } = e,
            a = new Set([t]);
          if (r.has(t)) return;
          const i = [];
          return (
            n
              .filter((e, n) => n > t && e.offset >= o && e.offset < o + s)
              .map((e) => F(e, n.indexOf(e), n, r))
              .filter(Boolean)
              .forEach((e) => {
                let t = !1;
                e.organizedIndexes.forEach((e) => {
                  t || a.has(e) || (t = !0), a.add(e);
                }),
                  t && i.push(e);
              }),
            { entity: e, organizedIndexes: a, nestedEntities: i }
          );
        }
        function B(e, t) {
          const { type: n } = t;
          return n === s.C7.TextUrl && t.url ? t.url : e;
        }
        function x(e) {
          (0, o.ko)().sendBotCommand({ command: e.currentTarget.innerText });
        }
        function O(e) {
          (0, o.ko)().searchHashtag({ hashtag: e.currentTarget.innerText });
        }
        function R(e) {
          (0, i.eM)(e.currentTarget.innerText),
            (0, o.ko)().showNotification({ message: (0, d.yE)("TextCopied") });
        }
      },
      47483: (e, t, n) => {
        n.d(t, { A: () => m });
        var r = n(84051),
          o = n(13439),
          s = n(29807),
          a = n(60261),
          i = n(37836);
        let d = new Set();
        const c = new Set(),
          u = (0, i.nF)(
            () => {
              const e = [...d],
                t = e.slice(0, 100),
                n = e.slice(101);
              (0, o.ko)().loadCustomEmojis({ ids: t }),
                (d = new Set(n)),
                d.size && u();
            },
            200,
            !1
          ),
          l = (0, i.nF)(
            () => {
              (0, o.ko)().updateLastRenderedCustomEmojis({
                ids: [...c].reverse(),
              }),
                c.clear();
            },
            200,
            !1
          );
        function f(e) {
          c.add(e), l();
        }
        (0, a.K3)(f);
        var h = n(17712);
        function m(e) {
          const [t, n] = (0, r.J0)(
              e ? (0, o.mS)().customEmojis.byId[e] : void 0
            ),
            [i, c] = (0, r.J0)((0, s.BWX)((0, o.mS)()));
          var l;
          (l = e) &&
            (f(l), (0, o.mS)().customEmojis.byId[l] || (d.add(l), u()));
          const m = (0, h.A)((t) => {
            if (!e) return;
            const r = (0, o.mS)();
            n((t ?? r.customEmojis).byId[e]), c((0, s.BWX)(r));
          });
          return (
            (0, r.vJ)(m, [e, m]),
            (0, r.vJ)(() => {
              if (e)
                return (
                  (0, a.Il)(m, e),
                  () => {
                    (0, a.LQ)(m);
                  }
                );
            }, [t, e, m]),
            { customEmoji: t, canPlay: i }
          );
        }
      },
      18276: (e, t, n) => {
        n.d(t, { A: () => s });
        var r = n(84051),
          o = n(87357);
        const s = (e) => {
          let {
            name: t,
            className: n,
            style: s,
            role: a,
            ariaLabel: i,
            onClick: d,
          } = e;
          return r.Ay.createElement("i", {
            className: (0, o.A)(`icon icon-${t}`, n),
            style: s,
            "aria-hidden": !i,
            "aria-label": i,
            role: a,
            onClick: d,
          });
        };
      },
      9267: (e, t, n) => {
        n.d(t, { A: () => f });
        var r = n(84051),
          o = n(87357),
          s = n(14745);
        const a = {
            root: "qEhgJEpm",
            middle: "GjxPnwZR",
            big: "HRLrnZvQ",
            adaptive: "ebO2WJkv",
            svg: "lbK6aMGA",
            clickable: "hqg1cKl7",
          },
          i =
            "M6.63869 12.1902L3.50621 14.1092C3.18049 14.3087 2.75468 14.2064 2.55515 13.8807C2.45769 13.7216 2.42864 13.5299 2.47457 13.3491L2.95948 11.4405C3.13452 10.7515 3.60599 10.1756 4.24682 9.86791L7.6642 8.22716C7.82352 8.15067 7.89067 7.95951 7.81418 7.80019C7.75223 7.67116 7.61214 7.59896 7.47111 7.62338L3.66713 8.28194C2.89387 8.41581 2.1009 8.20228 1.49941 7.69823L0.297703 6.69116C0.00493565 6.44581 -0.0335059 6.00958 0.211842 5.71682C0.33117 5.57442 0.502766 5.48602 0.687982 5.47153L4.35956 5.18419C4.61895 5.16389 4.845 4.99974 4.94458 4.75937L6.36101 1.3402C6.5072 0.987302 6.91179 0.819734 7.26469 0.965925C7.43413 1.03612 7.56876 1.17075 7.63896 1.3402L9.05539 4.75937C9.15496 4.99974 9.38101 5.16389 9.6404 5.18419L13.3322 5.47311C13.713 5.50291 13.9975 5.83578 13.9677 6.2166C13.9534 6.39979 13.8667 6.56975 13.7269 6.68896L10.9114 9.08928C10.7131 9.25826 10.6267 9.52425 10.6876 9.77748L11.5532 13.3733C11.6426 13.7447 11.414 14.1182 11.0427 14.2076C10.8642 14.2506 10.676 14.2208 10.5195 14.1249L7.36128 12.1902C7.13956 12.0544 6.8604 12.0544 6.63869 12.1902Z",
          d =
            "M10.5197 16.2049L6.46899 18.6864C6.04779 18.9444 5.49716 18.8121 5.23913 18.3909C5.11311 18.1852 5.07554 17.9373 5.13494 17.7035L5.762 15.2354C5.98835 14.3444 6.59803 13.5997 7.42671 13.2018L11.8459 11.0801C12.0519 10.9812 12.1387 10.734 12.0398 10.528C11.9597 10.3611 11.7786 10.2677 11.5962 10.2993L6.67709 11.1509C5.67715 11.324 4.65172 11.0479 3.87392 10.3961L2.31994 9.09382C1.94135 8.77655 1.89164 8.21245 2.20891 7.83386C2.36321 7.64972 2.58511 7.53541 2.82462 7.51667L7.5725 7.1451C7.90793 7.11885 8.20025 6.90658 8.32901 6.59574L10.1607 2.17427C10.3497 1.71792 10.8729 1.50123 11.3292 1.69028C11.5484 1.78105 11.7225 1.95514 11.8132 2.17427L13.6449 6.59574C13.7736 6.90658 14.066 7.11885 14.4014 7.1451L19.1754 7.51871C19.6678 7.55725 20.0358 7.9877 19.9972 8.48015C19.9787 8.71704 19.8666 8.93682 19.6858 9.09098L16.0449 12.1949C15.7886 12.4134 15.6768 12.7574 15.7556 13.0849L16.8749 17.7348C16.9905 18.215 16.6949 18.698 16.2147 18.8137C15.9839 18.8692 15.7406 18.8307 15.5382 18.7068L11.4541 16.2049C11.1674 16.0292 10.8064 16.0292 10.5197 16.2049Z";
        function c(e) {
          let { randomId: t } = e;
          const n = `${t}-fill`,
            o = `${t}-stroke1`,
            s = `${t}-stroke2`;
          return r.Ay.createElement(
            "svg",
            {
              className: a.svg,
              width: "21",
              height: "20",
              viewBox: "0 0 21 20",
              fill: "none",
            },
            r.Ay.createElement(
              "defs",
              null,
              r.Ay.createElement(
                "linearGradient",
                {
                  id: n,
                  x1: "0.434893",
                  y1: "22.5796",
                  x2: "34.2364",
                  y2: "-15.5089",
                  gradientUnits: "userSpaceOnUse",
                },
                r.Ay.createElement("stop", { "stop-color": "#FDEB32" }),
                r.Ay.createElement("stop", {
                  offset: "0.439058",
                  "stop-color": "#FEBD04",
                }),
                r.Ay.createElement("stop", {
                  offset: "1",
                  "stop-color": "#D75902",
                })
              ),
              r.Ay.createElement(
                "linearGradient",
                {
                  id: o,
                  x1: "22.5",
                  y1: "2.5",
                  x2: "8",
                  y2: "12.5",
                  gradientUnits: "userSpaceOnUse",
                },
                r.Ay.createElement("stop", { "stop-color": "#DB5A00" }),
                r.Ay.createElement("stop", {
                  offset: "1",
                  "stop-color": "#FF9145",
                })
              ),
              r.Ay.createElement(
                "linearGradient",
                {
                  id: s,
                  x1: "24.5",
                  y1: "2",
                  x2: "11",
                  y2: "10.2302",
                  gradientUnits: "userSpaceOnUse",
                },
                r.Ay.createElement("stop", {
                  "stop-color": "white",
                  "stop-opacity": "0",
                }),
                r.Ay.createElement("stop", {
                  offset: "0.395833",
                  "stop-color": "white",
                  "stop-opacity": "0.85",
                }),
                r.Ay.createElement("stop", {
                  offset: "0.520833",
                  "stop-color": "white",
                }),
                r.Ay.createElement("stop", {
                  offset: "0.645833",
                  "stop-color": "white",
                  "stop-opacity": "0.85",
                }),
                r.Ay.createElement("stop", {
                  offset: "1",
                  "stop-color": "white",
                  "stop-opacity": "0",
                })
              )
            ),
            r.Ay.createElement("path", {
              "fill-rule": "evenodd",
              "clip-rule": "evenodd",
              d,
              fill: `url(#${n})`,
              stroke: `url(#${o})`,
            }),
            r.Ay.createElement("path", {
              "fill-rule": "evenodd",
              "clip-rule": "evenodd",
              d,
              stroke: `url(#${s})`,
              "stroke-width": "2",
              style: "mix-blend-mode:soft-light",
            })
          );
        }
        function u(e) {
          let { randomId: t } = e;
          return r.Ay.createElement(
            "svg",
            {
              className: a.svg,
              width: "14",
              height: "15",
              viewBox: "0 0 14 15",
              fill: "none",
            },
            r.Ay.createElement(
              "defs",
              null,
              r.Ay.createElement(
                "linearGradient",
                {
                  id: t,
                  x1: "3",
                  y1: "63.5001",
                  x2: "84.1475",
                  y2: "-1.32262",
                  gradientUnits: "userSpaceOnUse",
                },
                r.Ay.createElement("stop", { "stop-color": "#6B93FF" }),
                r.Ay.createElement("stop", {
                  offset: "0.439058",
                  "stop-color": "#976FFF",
                }),
                r.Ay.createElement("stop", {
                  offset: "1",
                  "stop-color": "#E46ACE",
                })
              )
            ),
            r.Ay.createElement("path", {
              "fill-rule": "evenodd",
              "clip-rule": "evenodd",
              d: i,
              fill: `url(#${t})`,
            })
          );
        }
        function l() {
          return r.Ay.createElement(
            "svg",
            {
              className: a.svg,
              width: "14",
              height: "15",
              viewBox: "0 0 14 15",
              fill: "none",
            },
            r.Ay.createElement("path", {
              "fill-rule": "evenodd",
              "clip-rule": "evenodd",
              d: i,
              fill: "var(--color-fill)",
            })
          );
        }
        const f = (0, r.ph)((e) => {
          let {
            type: t = "regular",
            size: n = "small",
            className: i,
            onClick: d,
          } = e;
          const f = `svg-${(0, s.A)()}`;
          return r.Ay.createElement(
            "i",
            {
              onClick: d,
              className: (0, o.A)(
                "StarIcon",
                a.root,
                i,
                d && a.clickable,
                a[n]
              ),
            },
            "gold" === t
              ? r.Ay.createElement(c, { randomId: f })
              : "premium" === t
              ? r.Ay.createElement(u, { randomId: f })
              : r.Ay.createElement(l, null)
          );
        });
      },
      58734: (e, t, n) => {
        n.d(t, { Rr: () => f, Y5: () => l, _p: () => c, hB: () => u });
        var r = n(13439),
          o = n(23174),
          s = n(31481),
          a = n(87357),
          i = n(60261),
          d = n(76023);
        const c = "img[data-document-id]";
        function u(e) {
          const [t, n, r] = (0, i.Qy)(e);
          return `<img\n    class="${(0, a.A)(
            "custom-emoji",
            "emoji",
            "emoji-small",
            t && "placeholder",
            e.shouldUseTextColor && "colorable"
          )}"\n    draggable="false"\n    alt="${
            e.emoji
          }"\n    data-document-id="${e.id}"\n    ${
            r ? `data-unique-id="${r}"` : ""
          }\n    data-entity-type="${o.C7.CustomEmoji}"\n    src="${n}"\n  />`;
        }
        function l(e, t) {
          const n = (0, r.mS)().customEmojis.byId[t.documentId],
            [s, d, c] = (0, i.Qy)(n);
          return `<img\n    class="${(0, a.A)(
            "custom-emoji",
            "emoji",
            "emoji-small",
            s && "placeholder",
            n?.shouldUseTextColor && "colorable"
          )}"\n    draggable="false"\n    alt="${e}"\n    data-document-id="${
            t.documentId
          }"\n    ${c ? `data-unique-id="${c}"` : ""}\n    data-entity-type="${
            o.C7.CustomEmoji
          }"\n    src="${d}"\n  />`;
        }
        function f(e) {
          if (e)
            return e > s.Apc
              ? 2.25 * d.$
              : 1 === e
              ? 7 * d.$
              : Math.min(7.5 - 0.75 * e, 5.625) * d.$;
        }
      },
      54464: (e, t, n) => {
        n.d(t, { l: () => s, u: () => a });
        var r = n(31481),
          o = n(82393);
        function s(e) {
          let t =
            arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          o.pz ||
            !document.activeElement ||
            document.activeElement.id !== r.CfG ||
            (!t && e.target !== e.currentTarget) ||
            e.preventDefault();
        }
        function a(e) {
          s(e, !0);
        }
      },
      56362: (e, t, n) => {
        n.d(t, { A: () => d });
        var r = n(84051),
          o = n(13439),
          s = n(23174),
          a = n(29807),
          i = n(43874);
        const d = (0, o.EK)((e, t) => {
          let { userId: n } = t;
          return { userOrChat: n ? (0, a.mBe)(e, n) : void 0 };
        })((e) => {
          let { userId: t, username: n, userOrChat: a, children: d } = e;
          const {
              openChat: c,
              openChatByUsername: u,
              closeStoryViewer: l,
              setShouldCloseRightColumn: f,
            } = (0, o.ko)(),
            { isMobile: h } = (0, i.Ay)();
          return r.Ay.createElement(
            "a",
            {
              onClick: () => {
                h && f({ value: !0 }),
                  a
                    ? c({ id: a.id })
                    : n && (l(), u({ username: n.substring(1) }));
              },
              className: "text-entity-link",
              dir: "auto",
              "data-entity-type": t ? s.C7.MentionName : s.C7.Mention,
            },
            d
          );
        });
      },
      64493: (e, t, n) => {
        n.d(t, { A: () => u });
        var r = n(84051),
          o = n(87357),
          s = n(95807),
          a = n(82393),
          i = n(17712),
          d = n(42452),
          c = n(57474);
        const u = (e) => {
          let {
              ref: t,
              type: n = "button",
              id: u,
              onClick: l,
              onContextMenu: f,
              onMouseDown: h,
              onMouseUp: m,
              onMouseEnter: p,
              onMouseLeave: g,
              onFocus: y,
              children: b,
              size: v = "default",
              color: w = "primary",
              backgroundImage: I,
              className: A,
              round: C,
              pill: S,
              fluid: E,
              isText: k,
              isLoading: T,
              isShiny: P,
              withPremiumGradient: M,
              onTransitionEnd: L,
              ariaLabel: N,
              ariaControls: F,
              hasPopup: B,
              href: x,
              download: O,
              disabled: R,
              nonInteractive: D,
              allowDisabledClick: U,
              noFastClick: _ = "danger" === w,
              ripple: $,
              faded: j,
              tabIndex: H,
              isRtl: V,
              isRectangular: z,
              noPreventDefault: W,
              shouldStopPropagation: J,
              noForcedUpperCase: K,
              style: q,
            } = e,
            G = (0, r.li)(null);
          t && (G = t);
          const [X, Y] = (0, r.J0)(!1),
            Q = R || D,
            Z = (0, o.A)(
              "Button",
              A,
              v,
              w,
              C && "round",
              S && "pill",
              E && "fluid",
              Q && "disabled",
              D && "non-interactive",
              U && "click-allowed",
              k && "text",
              T && "loading",
              $ && "has-ripple",
              j && "faded",
              X && "clicked",
              I && "with-image",
              P && "shiny",
              M && "premium",
              z && "rectangular",
              K && "no-upper-case"
            ),
            ee = (0, i.A)((e) => {
              (!U && Q) || !l || l(e),
                J && e.stopPropagation(),
                Y(!0),
                setTimeout(() => {
                  Y(!1);
                }, 400);
            }),
            te = (0, i.A)((e) => {
              W || e.preventDefault(),
                (!U && Q) || !h || h(e),
                a.TF || e.button !== a.w3.Main || _ || ee(e);
            });
          return x
            ? r.Ay.createElement(
                "a",
                {
                  ref: G,
                  id: u,
                  className: Z,
                  href: x,
                  title: N,
                  download: O,
                  tabIndex: H,
                  dir: V ? "rtl" : void 0,
                  "aria-label": N,
                  "aria-controls": F,
                  style: q,
                  onTransitionEnd: L,
                  target: "_blank",
                  rel: "noreferrer",
                },
                b,
                !Q && $ && r.Ay.createElement(d.A, null)
              )
            : r.Ay.createElement(
                "button",
                {
                  ref: G,
                  id: u,
                  type: n,
                  className: Z,
                  onClick: a.TF || _ ? ee : void 0,
                  onContextMenu: f,
                  onMouseDown: te,
                  onMouseUp: m,
                  onMouseEnter: p && !Q ? p : void 0,
                  onMouseLeave: g && !Q ? g : void 0,
                  onTransitionEnd: L,
                  onFocus: y && !Q ? y : void 0,
                  "aria-label": N,
                  "aria-controls": F,
                  "aria-haspopup": B,
                  title: N,
                  tabIndex: H,
                  dir: V ? "rtl" : void 0,
                  style:
                    (0, s.A)(q, I && `background-image: url(${I})`) || void 0,
                },
                T
                  ? r.Ay.createElement(
                      "div",
                      null,
                      r.Ay.createElement(
                        "span",
                        { dir: V ? "auto" : void 0 },
                        "Please wait..."
                      ),
                      r.Ay.createElement(c.A, { color: k ? "blue" : "white" })
                    )
                  : b,
                !Q && $ && r.Ay.createElement(d.A, null)
              );
        };
      },
      19806: (e, t, n) => {
        n.d(t, { A: () => h });
        var r = n(84051),
          o = n(87357),
          s = n(4961),
          a = n(17712),
          i = n(59030),
          d = n(18276),
          c = n(64493),
          u = n(57474);
        function l() {
          return (
            (l = Object.assign
              ? Object.assign.bind()
              : function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n)
                      Object.prototype.hasOwnProperty.call(n, r) &&
                        (e[r] = n[r]);
                  }
                  return e;
                }),
            l.apply(this, arguments)
          );
        }
        const f = (e) => {
            let {
              id: t,
              name: n,
              value: h,
              label: m,
              labelText: p,
              subLabel: g,
              checked: y,
              tabIndex: b,
              disabled: v,
              withIcon: w,
              blocking: I,
              permissionGroup: A,
              isLoading: C,
              className: S,
              rightIcon: E,
              onlyInput: k,
              isRound: T,
              nestedCheckbox: P,
              nestedCheckboxCount: M,
              nestedOptionList: L,
              leftElement: N,
              values: F = [],
              onChange: B,
              onCheck: x,
              onClickLabel: O,
            } = e;
            const R = (0, i.A)(),
              D = (0, r.li)(null),
              [U, _] = (0, r.J0)(!1),
              $ = (0, a.A)((e) => {
                v || (B && B(e, L), x && x(e.currentTarget.checked));
              }),
              j = (0, a.A)(() => {
                _(!U);
              }),
              H = (0, o.A)(
                "Checkbox",
                v && "disabled",
                w && "withIcon",
                C && "loading",
                I && "blocking",
                P && "nested",
                g && "withSubLabel",
                A && "permission-group",
                Boolean(N) && "avatar",
                k && "onlyInput",
                T && "round",
                S
              );
            return r.Ay.createElement(
              r.Ay.Fragment,
              null,
              r.Ay.createElement(
                "label",
                {
                  className: H,
                  dir: R.isRtl ? "rtl" : void 0,
                  onClick: O
                    ? function (e) {
                        e.target !== D.current && O?.(e, h);
                      }
                    : void 0,
                  ref: D,
                },
                r.Ay.createElement("input", {
                  type: "checkbox",
                  id: t,
                  name: n,
                  value: h,
                  checked: y,
                  disabled: v,
                  tabIndex: b,
                  onChange: $,
                  onClick: O
                    ? function (e) {
                        e.stopPropagation();
                      }
                    : void 0,
                }),
                r.Ay.createElement(
                  "div",
                  {
                    className: (0, o.A)(
                      "Checkbox-main",
                      Boolean(N) && "Nested-avatar-list"
                    ),
                  },
                  r.Ay.createElement(
                    "span",
                    { className: "label", dir: "auto" },
                    N,
                    "string" == typeof m ? (0, s.A)(m) : m,
                    p &&
                      r.Ay.createElement(
                        "span",
                        { className: "ml-1" },
                        (0, s.A)(p)
                      ),
                    E &&
                      r.Ay.createElement("i", {
                        className: `icon icon-${E} right-icon`,
                      })
                  ),
                  g &&
                    r.Ay.createElement(
                      "span",
                      { className: "subLabel", dir: "auto" },
                      (0, s.A)(g)
                    )
                ),
                P &&
                  r.Ay.createElement(
                    "span",
                    { className: "nestedButton", dir: "auto" },
                    r.Ay.createElement(
                      c.A,
                      {
                        className: "button",
                        color: "translucent",
                        size: "smaller",
                        onClick: j,
                      },
                      r.Ay.createElement(d.A, {
                        name: "group-filled",
                        className: "group-icon",
                      }),
                      M,
                      r.Ay.createElement(d.A, { name: U ? "up" : "down" })
                    )
                  ),
                C && r.Ay.createElement(u.A, null)
              ),
              P &&
                r.Ay.createElement(
                  "div",
                  {
                    className: (0, o.A)(
                      "nested-checkbox-group",
                      U && "nested-checkbox-group-open"
                    ),
                  },
                  L?.nestedOptions?.map((e) =>
                    r.Ay.createElement(
                      f,
                      l(
                        {
                          key: e.value,
                          leftElement: N,
                          onChange: $,
                          checked: -1 !== F.indexOf(e.value),
                          values: F,
                        },
                        e
                      )
                    )
                  )
                )
            );
          },
          h = (0, r.ph)(f);
      },
      22699: (e, t, n) => {
        n.d(t, { A: () => a });
        var r = n(84051),
          o = n(64493),
          s = n(71429);
        const a = (e) => {
          let {
            trigger: t,
            className: n,
            children: a,
            transformOriginX: i,
            transformOriginY: d,
            positionX: c = "left",
            positionY: u = "top",
            footer: l,
            forceOpen: f,
            onOpen: h,
            onClose: m,
            onTransitionEnd: p,
            onMouseEnterBackdrop: g,
            onHide: y,
          } = e;
          const b = (0, r.li)(null),
            [v, w] = (0, r.J0)(!1),
            I = (0, r.hb)(() => {
              w(!1), m?.();
            }, [m]),
            A = (0, r.Kr)(
              () =>
                t ||
                ((e) => {
                  let { onTrigger: t, isOpen: n } = e;
                  return r.Ay.createElement(
                    o.A,
                    {
                      round: !0,
                      size: "smaller",
                      color: "translucent",
                      className: n ? "active" : "",
                      onClick: t,
                      ariaLabel: "More actions",
                    },
                    r.Ay.createElement("i", { className: "icon icon-more" })
                  );
                }),
              [t]
            );
          return r.Ay.createElement(
            "div",
            {
              className: `DropdownMenu ${n || ""}`,
              onKeyDown: (e) => {
                const t = b.current;
                if (!v || 40 !== e.keyCode || !t) return;
                const n = document.activeElement,
                  r = Array.from(t.children);
                (n && -1 !== r.indexOf(n)) || r[0].focus();
              },
              onTransitionEnd: p,
            },
            A({
              onTrigger: () => {
                w(!v), v ? m?.() : h?.();
              },
              isOpen: v,
            }),
            r.Ay.createElement(
              s.A,
              {
                ref: b,
                isOpen: v || Boolean(f),
                className: n || "",
                transformOriginX: i,
                transformOriginY: d,
                positionX: c,
                positionY: u,
                footer: l,
                autoClose: !0,
                onClose: I,
                onCloseAnimationEnd: y,
                onMouseEnterBackdrop: g,
              },
              a
            )
          );
        };
      },
      40664: (e, t, n) => {
        n.d(t, { A: () => a });
        var r = n(84051),
          o = n(87357),
          s = n(59030);
        const a = (0, r.ph)((e) => {
          let {
            ref: t,
            id: n,
            className: a,
            value: i,
            label: d,
            error: c,
            success: u,
            disabled: l,
            readOnly: f,
            placeholder: h,
            autoComplete: m,
            inputMode: p,
            maxLength: g,
            tabIndex: y,
            teactExperimentControlled: b,
            onChange: v,
            onInput: w,
            onKeyPress: I,
            onKeyDown: A,
            onBlur: C,
            onPaste: S,
          } = e;
          const E = (0, s.A)(),
            k = c || u || d,
            T = (0, o.A)(
              "input-group",
              i && "touched",
              c ? "error" : u && "success",
              l && "disabled",
              f && "disabled",
              k && "with-label",
              a
            );
          return r.Ay.createElement(
            "div",
            { className: T, dir: E.isRtl ? "rtl" : void 0 },
            r.Ay.createElement("input", {
              ref: t,
              className: "form-control",
              type: "text",
              id: n,
              dir: "auto",
              value: i || "",
              tabIndex: y,
              placeholder: h,
              maxLength: g,
              autoComplete: m,
              inputMode: p,
              disabled: l,
              readOnly: f,
              onChange: v,
              onInput: w,
              onKeyPress: I,
              onKeyDown: A,
              onBlur: C,
              onPaste: S,
              "aria-label": k,
              teactExperimentControlled: b,
            }),
            k && r.Ay.createElement("label", { htmlFor: n }, k)
          );
        });
      },
      96530: (e, t, n) => {
        n.d(t, { A: () => a });
        var r = n(84051),
          o = n(87357),
          s = n(17712);
        const a = (e) => {
          let {
            children: t,
            isPrimary: n,
            className: a,
            isRtl: i,
            onClick: d,
          } = e;
          const c = (0, s.A)((e) => {
            e.preventDefault(), d(e);
          });
          return r.Ay.createElement(
            "a",
            {
              href: "#",
              className: (0, o.A)("Link", "swBnOk1h", a, n && "Jz1SC8nz"),
              dir: i ? "rtl" : "auto",
              onClick: d ? c : void 0,
            },
            t
          );
        };
      },
      52745: (e, t, n) => {
        n.d(t, { A: () => a });
        var r = n(84051),
          o = n(87357),
          s = n(57474);
        const a = (0, r.ph)((e) => {
          let {
            color: t = "blue",
            backgroundColor: n,
            className: a,
            onClick: i,
          } = e;
          return r.Ay.createElement(
            "div",
            {
              className: (0, o.A)("Loading", i && "interactive", a),
              onClick: i,
            },
            r.Ay.createElement(s.A, { color: t, backgroundColor: n })
          );
        });
      },
      71429: (e, t, n) => {
        n.d(t, { A: () => I });
        var r = n(84051),
          o = n(87357),
          s = n(11778),
          a = n(82393),
          i = n(54464),
          d = n(43874),
          c = n(82117),
          u = n(26072),
          l = n(10328),
          f = n(17712),
          h = n(61433),
          m = n(66644),
          p = n(41257);
        const g = { width: 0, left: 0, height: 0, top: 0 };
        function y(e, t, n) {
          let {
            positionX: r = "left",
            positionY: o = "top",
            transformOriginX: s,
            transformOriginY: a,
            style: i,
            bubbleStyle: d,
          } = n;
          const c = e.current,
            u = t.current;
          i && (c.style.cssText = i),
            d && (u.style.cssText = d),
            r && (0, h.YM)(u, r),
            o && (0, h.YM)(u, o),
            (0, h.Tv)(u, {
              transformOrigin: [s ? `${s}px` : r, a ? `${a}px` : o].join(" "),
            });
        }
        var b = n(21511),
          v = n(22802),
          w = n(3325);
        const I = (0, r.ph)((e) => {
          let {
            ref: t,
            shouldCloseFast: n,
            isOpen: h,
            id: I,
            className: A,
            bubbleClassName: C,
            ariaLabelledBy: S,
            children: E,
            autoClose: k = !1,
            footer: T,
            noCloseOnBackdrop: P = !1,
            backdropExcludedSelector: M,
            noCompact: L,
            onCloseAnimationEnd: N,
            onClose: F,
            onMouseEnter: B,
            onMouseLeave: x,
            withPortal: O,
            onMouseEnterBackdrop: R,
            ...D
          } = e;
          const { isTouchScreen: U } = (0, d.Ay)(),
            _ = (0, r.li)(null),
            { ref: $ } = (0, b.A)({
              isOpen: h,
              ref: t,
              onCloseAnimationEnd: N,
            });
          (function (e, t, n, o) {
            const s = (0, p.i)(o);
            (0, r.Nf)(() => {
              if (!e) return;
              const r = s.current;
              "getTriggerElement" in r
                ? (0, m.gm)(() => {
                    const e = (function (e, t, n) {
                      let {
                        anchor: r,
                        getRootElement: o,
                        getMenuElement: s,
                        getTriggerElement: a,
                        getLayout: i,
                        withMaxHeight: d,
                      } = n;
                      const c = a();
                      let { x: u, y: l } = r;
                      const f = u,
                        h = l,
                        m = s(),
                        p = o(),
                        {
                          extraPaddingX: y = 0,
                          extraTopPadding: b = 0,
                          extraMarginTop: v = 0,
                          topShiftY: w = 0,
                          menuElMinWidth: I = 0,
                          deltaX: A = 0,
                          shouldAvoidNegativePosition: C = !1,
                          withPortal: S = !1,
                          isDense: E = !1,
                        } = i?.() || {},
                        k = m
                          ? parseInt(getComputedStyle(m).marginTop, 10) + v
                          : void 0,
                        { offsetWidth: T, offsetHeight: P } = m || {
                          offsetWidth: 0,
                          offsetHeight: 0,
                        },
                        M = m ? { width: Math.max(T, I), height: P + k } : g,
                        L = p ? p.getBoundingClientRect() : g;
                      let N, F;
                      E || u + M.width + y < L.width + L.left
                        ? ((u += 3), (N = "left"))
                        : u - M.width - L.left > 0
                        ? ((N = "right"), (u -= 3))
                        : ((N = "left"), (u = 16)),
                        (u += A);
                      const B = l + w;
                      E || B + M.height < L.height + L.top
                        ? ((F = "top"), (l = B))
                        : ((F = "bottom"),
                          l - M.height < L.top + b && (l = L.top + L.height));
                      const x = c.getBoundingClientRect(),
                        O = S ? x.top : 0,
                        R = S ? x.left : 0,
                        D = Math.min(u - x.left, L.width - M.width - 16);
                      let U =
                          ("left" === N
                            ? S || C
                              ? Math.max(16, D)
                              : D
                            : u - x.left) + R,
                        _ = l - x.top + O;
                      E &&
                        ((U = Math.min(U, L.width - M.width - 16)),
                        (_ = Math.min(_, L.height - M.height - 16)));
                      const $ = I ? Math.max(0, (I - T) / 2) : 0;
                      U - $ < 0 && C && (U = $ + 16);
                      const j = f + R - x.left - U,
                        H = h + O - x.top - _ - (k || 0),
                        V = "left" === N ? j : M.width + j,
                        z = "bottom" === F ? M.height + H : H,
                        W = `left: ${U}px; top: ${_}px`;
                      let J;
                      return (
                        d && (J = `max-height: ${L.height - 12 - (k || 0)}px;`),
                        {
                          positionX: N,
                          positionY: F,
                          transformOriginX: V,
                          transformOriginY: z,
                          style: W,
                          bubbleStyle: J,
                        }
                      );
                    })(0, 0, r);
                    return () => {
                      y(t, n, e);
                    };
                  })
                : y(t, n, r);
            }, [e, t, n, s]);
          })(h, _, $, D),
            (0, r.vJ)(() => (h ? (0, s.A)(F) : void 0), [h, F]),
            (0, u.A)({ isActive: h, onBack: F, shouldBeReplaced: !0 }),
            (0, c.A)(
              (e) => {
                let [t] = e;
                (h || (!h && !0 === t)) && (0, r.VK)(200);
              },
              [h]
            );
          const j = (0, l.A)($, h, k ? F : void 0, void 0, !0);
          (0, v.A)(h, _, P ? void 0 : F, void 0, M);
          const H = (0, o.A)(
              "bubble menu-container custom-scroll",
              T && "with-footer",
              C,
              n && "close-fast"
            ),
            V = (0, f.A)((e) => {
              e.stopPropagation(), k && F();
            }),
            z = r.Ay.createElement(
              "div",
              {
                ref: _,
                id: I,
                className: (0, o.A)(
                  "Menu",
                  !L && !U && "compact",
                  !a.Fy && "no-blur",
                  O && "in-portal",
                  A
                ),
                "aria-labelledby": S,
                role: S ? "menu" : void 0,
                onKeyDown: h ? j : void 0,
                onMouseEnter: B,
                onMouseLeave: h ? x : void 0,
              },
              h &&
                r.Ay.createElement("div", {
                  className: "backdrop",
                  onMouseDown: i.u,
                  onMouseEnter: R,
                }),
              r.Ay.createElement(
                "div",
                { role: "presentation", ref: $, className: H, onClick: V },
                E,
                T && r.Ay.createElement("div", { className: "footer" }, T)
              )
            );
          return O ? r.Ay.createElement(w.A, null, z) : z;
        });
      },
      24433: (e, t, n) => {
        n.d(t, { A: () => c });
        var r = n(84051),
          o = n(31481),
          s = n(87357),
          a = n(43874),
          i = n(17712),
          d = n(59030);
        const c = (e) => {
          const {
              icon: t,
              isCharIcon: n,
              customIcon: c,
              className: u,
              children: l,
              onClick: f,
              href: h,
              download: m,
              disabled: p,
              destructive: g,
              ariaLabel: y,
              withWrap: b,
              onContextMenu: v,
              clickArg: w,
              withPreventDefaultOnMouseDown: I,
            } = e,
            A = (0, d.A)(),
            { isTouchScreen: C } = (0, a.Ay)(),
            S = (0, i.A)((e) => {
              !p && f ? f(e, w) : e.preventDefault();
            }),
            E = (0, i.A)((e) => {
              (13 !== e.keyCode && 32 !== e.keyCode) ||
                (!p && f ? f(e, w) : e.preventDefault());
            }),
            k = (0, i.A)((e) => {
              I && e.preventDefault();
            }),
            T = (0, s.A)(
              "MenuItem",
              u,
              p && "disabled",
              g && "destructive",
              !C && "compact",
              b && "wrap"
            ),
            P = r.Ay.createElement(
              r.Ay.Fragment,
              null,
              !c &&
                t &&
                r.Ay.createElement("i", {
                  className: n ? "icon icon-char" : `icon icon-${t}`,
                  "data-char": n ? t : void 0,
                }),
              c,
              l
            );
          return h
            ? r.Ay.createElement(
                "a",
                {
                  tabIndex: 0,
                  className: T,
                  href: h,
                  download: m,
                  "aria-label": y,
                  title: y,
                  target:
                    h.startsWith(window.location.origin) || o.W75
                      ? "_self"
                      : "_blank",
                  rel: "noopener noreferrer",
                  dir: A.isRtl ? "rtl" : void 0,
                  onClick: f,
                  onMouseDown: k,
                },
                P
              )
            : r.Ay.createElement(
                "div",
                {
                  role: "menuitem",
                  tabIndex: 0,
                  className: T,
                  onClick: S,
                  onKeyDown: E,
                  onMouseDown: k,
                  onContextMenu: v,
                  "aria-label": y,
                  title: y,
                  dir: A.isRtl ? "rtl" : void 0,
                },
                P
              );
        };
      },
      65843: (e, t, n) => {
        n.d(t, { A: () => m });
        var r = n(84051),
          o = n(71533),
          s = n(17712),
          a = n(35297),
          i = n(73622),
          d = n(66644),
          c = n(84080),
          u = n(34780),
          l = n(61157);
        function f() {
          return (0, r.OV)() || (0, u.c_)() || (0, l.g)();
        }
        function h() {
          return (
            (h = Object.assign
              ? Object.assign.bind()
              : function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n)
                      Object.prototype.hasOwnProperty.call(n, r) &&
                        (e[r] = n[r]);
                  }
                  return e;
                }),
            h.apply(this, arguments)
          );
        }
        const m = (0, r.ph)(function (e) {
          let {
            ref: t,
            isPriority: n,
            canPlay: m,
            children: p,
            onReady: g,
            onBroken: y,
            onTimeUpdate: b,
            ...v
          } = e;
          const w = (0, r.li)(null);
          t || (t = w);
          const { handlePlaying: I } = (function (e, t, n) {
              const o = (0, r.li)();
              o.current = t;
              const { play: a, pause: i } = (function (e) {
                  const t = (0, r.li)(!1),
                    n = (0, r.li)(!1);
                  return {
                    play: (0, s.A)(() => {
                      (t.current = !1),
                        e.current &&
                          !n.current &&
                          document.body.contains(e.current) &&
                          ((n.current = !0),
                          e.current
                            .play()
                            .then(() => {
                              (n.current = !1),
                                t.current &&
                                  (e.current?.pause(), (t.current = !1));
                            })
                            .catch((e) => {
                              console.warn(e);
                            }));
                    }),
                    pause: (0, s.A)(() => {
                      n.current ? (t.current = !0) : e.current?.pause();
                    }),
                  };
                })(e),
                h = (0, s.A)(() => {
                  !o.current || (!n && f()) || a();
                }),
                m = (0, s.A)(() => {
                  (0, d.YS)(h);
                });
              (0, l.A)(i, m, !t || n),
                (0, c.Ay)(i, h, !t || n),
                (0, u.Ay)(i, h, !t || n);
              const p = (0, s.A)(() => {
                (!o.current || (!n && f())) && i();
              });
              return (
                (0, r.vJ)(() => {
                  t ? (!n && f()) || a() : i();
                }, [t, a, i, n]),
                { handlePlaying: p }
              );
            })(t, m, n),
            A = (0, r.li)(!1),
            C = (0, s.A)(() => {
              A.current || (g?.(), (A.current = !0));
            }),
            { isBuffered: S, bufferingHandlers: E } = (0, o.A)(!0, b, y),
            { onPlaying: k, ...T } = E;
          (0, a.A)(
            (e) => {
              let [t] = e;
              void 0 !== t && C();
            },
            [S, C]
          );
          const P = (0, s.A)((e) => {
              I(), k(e), C(), v.onPlaying?.(e);
            }),
            M = (0, r.Kr)(() => {
              const e = {};
              return (
                Object.keys(T).forEach((t) => {
                  const n = t;
                  e[n] = (e) => {
                    v[n]?.(e), T[n]?.(e);
                  };
                }),
                e
              );
            }, [T, v]);
          return (
            (0, i.A)(t, M),
            r.Ay.createElement(
              "video",
              h({ ref: t, autoPlay: !0 }, v, M, { onPlaying: P }),
              p
            )
          );
        });
      },
      3325: (e, t, n) => {
        n.d(t, { A: () => s });
        var r = n(84051),
          o = n(61433);
        const s = (e) => {
          let { containerId: t, className: n, children: s } = e;
          const a = (0, r.li)();
          return (
            a.current || (a.current = document.createElement("div")),
            (0, r.Nf)(() => {
              const e = document.querySelector(t || "#portals");
              if (!e) return;
              const r = a.current;
              return (
                n && r.classList.add(n),
                e.appendChild(r),
                () => {
                  o.Ay.render(void 0, r), e.removeChild(r);
                }
              );
            }, [n, t]),
            o.Ay.render(s, a.current)
          );
        };
      },
      42452: (e, t, n) => {
        n.d(t, { A: () => a });
        var r = n(84051),
          o = n(37836),
          s = n(17712);
        const a = (0, r.ph)(() => {
          const [e, t] = (0, r.J0)([]),
            n = (0, r.Kr)(
              () =>
                (0, o.sg)(
                  () => {
                    t([]);
                  },
                  700,
                  !1
                ),
              []
            ),
            a = (0, s.A)((r) => {
              if (0 !== r.button) return;
              const o = r.currentTarget,
                s = o.getBoundingClientRect(),
                a = o.offsetWidth / 2;
              t([
                ...e,
                {
                  x: r.clientX - s.x - a / 2,
                  y: r.clientY - s.y - a / 2,
                  size: a,
                },
              ]),
                n();
            });
          return r.Ay.createElement(
            "div",
            { className: "ripple-container", onMouseDown: a },
            e.map((e) => {
              let { x: t, y: n, size: o } = e;
              return r.Ay.createElement("div", {
                className: "ripple-wave",
                style: `left: ${t}px; top: ${n}px; width: ${o}px; height: ${o}px;`,
              });
            })
          );
        });
      },
      57474: (e, t, n) => {
        n.d(t, { A: () => s });
        var r = n(84051),
          o = n(87357);
        const s = (e) => {
          let { color: t = "blue", backgroundColor: n, className: s } = e;
          return r.Ay.createElement(
            "div",
            {
              className: (0, o.A)(
                "Spinner",
                s,
                t,
                n && "with-background",
                n && `bg-${n}`
              ),
            },
            r.Ay.createElement("div", { className: "Spinner__inner" })
          );
        };
      },
      41036: (e, t, n) => {
        n.d(t, { Ay: () => C, VY: () => I, uo: () => w });
        var r = n(84051),
          o = n(61433),
          s = n(13439),
          a = n(66644),
          i = n(29807),
          d = n(87357),
          c = n(25903),
          u = n(41402),
          l = n(87894),
          f = n(55994),
          h = n(30857),
          m = n(73767);
        const p = "Transition_slide",
          g = "Transition_slide-active",
          y = "Transition_slide-from",
          b = "Transition_slide-to",
          v = "Transition_slide-inactive",
          w = g,
          I = b,
          A = new Set([
            "slide",
            "slideRtl",
            "slideFade",
            "zoomFade",
            "slideLayers",
            "pushSlide",
            "reveal",
            "slideOptimized",
            "slideOptimizedRtl",
            "slideVertical",
            "slideVerticalFade",
          ]),
          C = function (e) {
            let {
              ref: t,
              activeKey: n,
              nextKey: w,
              name: I,
              direction: C = "auto",
              renderCount: S,
              shouldRestoreHeight: E,
              shouldCleanup: k,
              cleanupExceptionKey: T,
              cleanupOnlyKey: P,
              shouldWrap: M,
              wrapExceptionKey: L,
              id: N,
              className: F,
              slideClassName: B,
              withSwipeControl: x,
              isBlockingAnimation: O,
              onStart: R,
              onStop: D,
              children: U,
            } = e;
            const _ = (0, r.li)(),
              $ = A.has(I) && !(0, i.PKK)((0, s.mS)());
            let j = (0, r.li)(null);
            t && (j = t);
            const H = (0, r.li)({}),
              V = (0, m.A)(n),
              z = (0, h.A)(),
              W = (0, r.li)(!1),
              J = (0, r.li)(!1),
              K = void 0 !== V && n !== V;
            !S && K && (H.current = { [V]: H.current[V] }),
              (H.current[n] = U),
              w && (H.current[w] = U);
            const q =
              -1 === C || ("auto" === C && V > n) || ("inverse" === C && V < n);
            (0, r.Nf)(() => {
              function e() {
                k &&
                  ((H.current =
                    void 0 !== T
                      ? { [T]: H.current[T] }
                      : void 0 !== P
                      ? (0, l.cJ)(H.current, [P])
                      : {}),
                  z());
              }
              const t = "slideOptimized" === I || "slideOptimizedRtl" === I,
                s = j.current,
                i = Object.keys(H.current).map(Number),
                d = S ? V : i.indexOf(V),
                h = S ? n : i.indexOf(n),
                m = Array.from(s.childNodes);
              if (!m.length) return;
              const w = Array.from(s.children);
              if (
                (w.forEach((e) => {
                  (0, o.YM)(e, p),
                    B &&
                      B.split(/\s+/).forEach((t) => {
                        (0, o.YM)(e, t);
                      });
                }),
                !K)
              ) {
                if (W.current) return;
                return void w.forEach((e) => {
                  e === m[h]
                    ? ((0, o.YM)(e, g),
                      t &&
                        (0, o.Tv)(e, {
                          transition: "none",
                          transform: "translate3d(0, 0, 0)",
                        }))
                    : t || (0, o.YM)(e, v);
                });
              }
              if (((_.current = n), t)) {
                if (!m[h]) return;
                return void (function (
                  e,
                  t,
                  n,
                  s,
                  i,
                  d,
                  l,
                  f,
                  h,
                  m,
                  p,
                  y,
                  b,
                  v
                ) {
                  if (e)
                    return (
                      (0, o.dH)(f, `Transition-${t}`, !n),
                      (0, o.dH)(f, `Transition-${t}Backwards`, n),
                      m instanceof HTMLElement &&
                        ((0, o.HW)(m, g),
                        (0, o.Tv)(m, { transition: "none", transform: "" })),
                      h instanceof HTMLElement &&
                        ((0, o.YM)(h, g),
                        (0, o.Tv)(h, {
                          transition: "none",
                          transform: "translate3d(0, 0, 0)",
                        })),
                      void s()
                    );
                  "slideOptimizedRtl" === t && (n = !n), (l.current = !0);
                  const w = (0, r.VK)(void 0, y);
                  b?.(),
                    (0, o.dH)(f, `Transition-${t}`, !n),
                    (0, o.dH)(f, `Transition-${t}Backwards`, n),
                    m instanceof HTMLElement &&
                      (0, o.Tv)(m, {
                        transition: "none",
                        transform: "translate3d(0, 0, 0)",
                      }),
                    h instanceof HTMLElement &&
                      (0, o.Tv)(h, {
                        transition: "none",
                        transform: `translate3d(${n ? "-" : ""}100%, 0, 0)`,
                      }),
                    (0, a.gm)(
                      () => (
                        h instanceof HTMLElement && (0, u.A)(h),
                        () => {
                          m instanceof HTMLElement &&
                            ((0, o.HW)(m, g),
                            (0, o.Tv)(m, {
                              transition: "",
                              transform: `translate3d(${
                                n ? "" : "-"
                              }100%, 0, 0)`,
                            })),
                            h instanceof HTMLElement &&
                              ((0, o.YM)(h, g),
                              (0, o.Tv)(h, {
                                transition: "",
                                transform: "translate3d(0, 0, 0)",
                              }));
                        }
                      )
                    ),
                    (0, c.j)(h, () => {
                      const e =
                        h instanceof HTMLElement ? h.clientHeight : void 0;
                      (0, a.RK)(() => {
                        i === d.current
                          ? (m instanceof HTMLElement &&
                              (0, o.Tv)(m, {
                                transition: "none",
                                transform: "",
                              }),
                            p &&
                              e &&
                              h instanceof HTMLElement &&
                              ((0, o.Tv)(h, { height: "auto" }),
                              (0, o.Tv)(f, { height: `${e}px` })),
                            v?.(),
                            w(),
                            (l.current = !1),
                            s())
                          : w();
                      });
                    });
                })($, I, q, e, n, _, W, s, m[h], m[d], E, O, R, D);
              }
              if ("none" === I || $ || J.current)
                return (
                  J.current && (J.current = !1),
                  m.forEach((e, t) => {
                    e instanceof HTMLElement &&
                      ((0, o.HW)(e, y),
                      (0, o.HW)(e, b),
                      (0, o.dH)(e, g, t === h),
                      (0, o.dH)(e, v, t !== h));
                  }),
                  void e()
                );
              m.forEach((e, t) => {
                e instanceof HTMLElement &&
                  ((0, o.HW)(e, g),
                  (0, o.dH)(e, y, t === d),
                  (0, o.dH)(e, b, t === h),
                  (0, o.dH)(e, v, t !== d && t !== h));
              }),
                (W.current = !0);
              const A = (0, r.VK)(void 0, O);
              function C() {
                const t = s.querySelector(`.${g}`),
                  { clientHeight: r } = t || {};
                (0, a.RK)(() => {
                  n === _.current
                    ? ((0, o.HW)(s, `Transition-${I}`),
                      (0, o.HW)(s, `Transition-${I}Backwards`),
                      m.forEach((e, t) => {
                        e instanceof HTMLElement &&
                          ((0, o.HW)(e, y),
                          (0, o.HW)(e, b),
                          (0, o.dH)(e, g, t === h),
                          (0, o.dH)(e, v, t !== h));
                      }),
                      E &&
                        t &&
                        ((0, o.Tv)(t, { height: "auto" }),
                        (0, o.Tv)(s, { height: `${r}px` })),
                      D?.(),
                      A(),
                      (W.current = !1),
                      e())
                    : A();
                });
              }
              R?.(),
                (0, o.dH)(s, `Transition-${I}`, !q),
                (0, o.dH)(s, `Transition-${I}Backwards`, q);
              const M =
                ("reveal" !== I && "slideFadeAndroid" !== I) || !q
                  ? m[h]
                  : m[d];
              if (M)
                if (x && m[d]) {
                  const e = (0, c.e)(M, C);
                  (0, f.R)(m[d], m[h], () => {
                    e(), (J.current = !0), D?.(), A(), (W.current = !1);
                  });
                } else (0, c.e)(M, C, void 0, 1e3);
              else C();
            }, [n, w, V, K, q, I, R, D, S, E, k, B, T, $, z, x, O, P]),
              (0, r.vJ)(() => {
                if (!E) return;
                const e = j.current,
                  t = e.querySelector(`.${g}`) || e.querySelector(`.${y}`);
                if (!t) return;
                const { clientHeight: n } = t || {};
                n &&
                  (0, a.RK)(() => {
                    (0, o.Tv)(t, { height: "auto" }),
                      (0, o.Tv)(e, { height: `${n}px`, flexBasis: `${n}px` });
                  });
              }, [E, U]);
            const G = !S,
              X = H.current,
              Y = Object.keys(S ? new Array(S).fill(void 0) : X)
                .map(Number)
                .map((e) => {
                  const t = X[e];
                  if (!t) return;
                  const o =
                    "function" == typeof t ? t(e === n, e === V, e, n) : t;
                  return (M && e !== L) || G
                    ? r.Ay.createElement("div", { key: e, teactOrderKey: e }, o)
                    : o;
                });
            return r.Ay.createElement(
              "div",
              {
                ref: j,
                id: N,
                className: (0, d.A)("Transition", F),
                teactFastList: G,
              },
              Y
            );
          };
      },
      31481: (e, t, n) => {
        n.d(t, {
          $4F: () => ue,
          $d8: () => An,
          $gx: () => _,
          $nk: () => yt,
          AGC: () => z,
          Apc: () => kt,
          BYH: () => vt,
          C$_: () => ie,
          C1b: () => c,
          C39: () => o,
          C7Y: () => Mn,
          CH0: () => Kn,
          CQG: () => Ln,
          CV: () => U,
          CVm: () => be,
          CVv: () => P,
          CfG: () => Fe,
          Ckz: () => fn,
          Cmz: () => f,
          Cyx: () => je,
          D$I: () => Vn,
          D3G: () => Ue,
          DRJ: () => de,
          DSF: () => pn,
          EPW: () => Pt,
          FHx: () => w,
          FZw: () => vn,
          G38: () => sn,
          G3A: () => Tt,
          GW0: () => N,
          GhT: () => gt,
          H4O: () => st,
          H6l: () => it,
          HGU: () => G,
          H_r: () => en,
          HxB: () => Pn,
          Hz7: () => ge,
          IH3: () => Jt,
          IRc: () => J,
          Iye: () => ze,
          Iz7: () => x,
          J$1: () => Et,
          KFG: () => $e,
          K_A: () => dn,
          Ka6: () => Cn,
          Kp3: () => Nt,
          LWg: () => Jn,
          LaL: () => A,
          M$8: () => Zn,
          M8B: () => ve,
          MEw: () => Ke,
          MVx: () => p,
          MkD: () => $n,
          Msx: () => Vt,
          MyF: () => xt,
          N89: () => Gt,
          NFE: () => S,
          NjX: () => on,
          NkL: () => wn,
          O2i: () => Yn,
          O4t: () => Ge,
          OFc: () => Zt,
          OMf: () => Ct,
          OUy: () => He,
          OVC: () => $t,
          Oig: () => m,
          OzO: () => tt,
          P3f: () => ye,
          PGI: () => Rn,
          Pje: () => Tn,
          PqE: () => Un,
          Q$7: () => L,
          QkL: () => hn,
          RCH: () => ft,
          Rqe: () => pt,
          SKD: () => et,
          T7t: () => Y,
          TBj: () => ht,
          UAx: () => Wn,
          Um: () => Z,
          UuV: () => k,
          UyP: () => dt,
          Uyp: () => wt,
          ViI: () => M,
          Vz3: () => jt,
          W75: () => l,
          WG3: () => se,
          WZ$: () => xn,
          XLD: () => Dn,
          XQO: () => le,
          Xab: () => Qe,
          Xrp: () => Le,
          Y3M: () => rn,
          YVZ: () => xe,
          ZhW: () => ae,
          _Bb: () => On,
          _E9: () => gn,
          a9l: () => j,
          aFH: () => nn,
          bVP: () => qt,
          be8: () => _n,
          bkT: () => ct,
          bnE: () => Qt,
          bpX: () => Rt,
          bxS: () => mn,
          c2m: () => qe,
          cK8: () => r,
          cLl: () => R,
          cOD: () => s,
          cUY: () => Dt,
          cgU: () => Nn,
          cqp: () => Me,
          dK5: () => zn,
          dR$: () => Gn,
          dnp: () => we,
          dqH: () => Te,
          dxe: () => Xn,
          e0F: () => Be,
          eKB: () => Bt,
          eqO: () => K,
          es: () => ot,
          f51: () => ln,
          f84: () => Xe,
          fNs: () => Wt,
          fRl: () => Ye,
          fSF: () => Ee,
          fng: () => u,
          frj: () => ce,
          fwn: () => It,
          g0Q: () => ut,
          g0p: () => Hn,
          gQx: () => We,
          gXr: () => te,
          gex: () => zt,
          hfH: () => Ft,
          i11: () => Ce,
          iIc: () => he,
          iKt: () => De,
          iRY: () => qn,
          ikg: () => Ht,
          irO: () => pe,
          j0M: () => I,
          j41: () => mt,
          j7z: () => Je,
          jhT: () => Qn,
          jhd: () => _t,
          jht: () => h,
          jsp: () => tn,
          kNZ: () => Xt,
          lFE: () => g,
          laV: () => ee,
          ltn: () => Ve,
          m$5: () => Oe,
          mD0: () => At,
          mFn: () => a,
          mH$: () => re,
          mPG: () => Pe,
          mxD: () => Kt,
          naf: () => at,
          nfi: () => D,
          nnT: () => oe,
          npx: () => Ne,
          nxZ: () => nt,
          oBq: () => E,
          ozB: () => F,
          pX9: () => yn,
          pZc: () => ke,
          pge: () => T,
          pk8: () => Se,
          pkx: () => kn,
          qGQ: () => b,
          qJR: () => d,
          qKY: () => C,
          qbC: () => Fn,
          qj6: () => me,
          r2x: () => bt,
          r9K: () => En,
          rBM: () => fe,
          rLF: () => $,
          rkj: () => y,
          s8T: () => rt,
          sR2: () => Mt,
          sXR: () => Yt,
          tNZ: () => cn,
          tP8: () => jn,
          tRH: () => Lt,
          uCr: () => Q,
          ukY: () => Sn,
          uyj: () => v,
          vVF: () => Ut,
          vjm: () => In,
          wAs: () => ne,
          wEk: () => an,
          wVm: () => Re,
          x6_: () => lt,
          xB5: () => Ze,
          xJs: () => B,
          xMZ: () => St,
          xw7: () => X,
          y67: () => Bn,
          yhD: () => H,
          ynd: () => bn,
          yo2: () => W,
          yq1: () => q,
          yq6: () => i,
          zHL: () => Ie,
          zNY: () => Ot,
          zP3: () => Ae,
          zPk: () => _e,
          zrf: () => O,
          zv8: () => un,
        });
        const r = "A",
          o = `Telegram Web ${r}`,
          s = 1727694829581,
          a = "web.telegram.org",
          i = "https://web.telegram.org/a",
          d = "https://web.telegram.org/",
          c = "https://web.telegram.org/a",
          u = !1,
          l = !1,
          f = !1,
          h = !1,
          m = !1,
          p = !1,
          g = "tt-log.json",
          y = m,
          b = "https://telegra.ph/WebA-Beta-03-20",
          v = "https://telegram-a-host",
          w =
            "Shoot!\nSomething went wrong, please see the error details in Dev Tools Console.",
          I = "Telegram",
          A = "[Inactive]",
          C = !1,
          S = "user_auth",
          E = "tt-passcode",
          k = !1,
          T = "tt-global-state",
          P = 500,
          M = 200,
          L = 10,
          N = 150,
          F = "tt-is-screen-locked",
          B = !1,
          x = "tt-media",
          O = "tt-media-avatars",
          R = "tt-media-progressive",
          D = "tt-custom-bg",
          U = "tt-lang-packs-v42",
          _ = [1, 5, 10, 50, 100, 500],
          $ = "tt-global",
          j = "tt-establish",
          H = "tt-multitab",
          V = "undefined" != typeof window && window.innerHeight >= 900,
          z = 1,
          W = V ? 60 : 40,
          J = 2 * W,
          K = 36,
          q = 72,
          G = 65,
          X = 56,
          Y = V ? 30 : 25,
          Q = 100,
          Z = 42,
          ee = 42,
          te = 42,
          ne = 20,
          re = 5,
          oe = 30,
          se = 200,
          ae = 500,
          ie = 600,
          de = 50,
          ce = 15,
          ue = 10,
          le = 20,
          fe = "global",
          he = 20,
          me = 500,
          pe = 20,
          ge = 1,
          ye = 1,
          be = 1200,
          ve = -1,
          we = 0,
          Ie = 1,
          Ae = 2,
          Ce = Ae,
          Se = 16,
          Ee = 17,
          ke = 15,
          Te = 3,
          Pe = 1e4,
          Me = 3e3,
          Le = 1e7,
          Ne = 36e5,
          Fe = "editable-message-text",
          Be = "editable-message-text-modal",
          xe = "editable-story-input-text",
          Oe = `.messages-layout .Transition_slide-active #${Fe}, .messages-layout .Transition > .Transition_slide-to #${Fe}`,
          Re = `#${Be}`,
          De = `#${xe}`,
          Ue = "data-has-custom-appendix",
          _e = "message-content",
          $e = ".message-content",
          je = "⭐",
          He = "XTR",
          Ve = 1440,
          ze = 1150,
          We = 1275,
          Je = 925,
          Ke = 1340,
          qe = 600,
          Ge = 950,
          Xe = 450,
          Ye = 2 ** 31 - 1,
          Qe = "0",
          Ze = 100,
          et = 300,
          tt = 600,
          nt = 800,
          rt = 300,
          ot =
            (Math.round((et + tt) / 2),
            new Set([
              "newMessage",
              "newScheduledMessage",
              "deleteMessages",
              "deleteScheduledMessages",
              "deleteHistory",
            ]),
            200),
          st = 13,
          at = 11,
          it = 160,
          dt = 120,
          ct = 72,
          ut = 36,
          lt = 32,
          ft = 48,
          ht = 32,
          mt = 20,
          pt = 72,
          gt = 72,
          yt = 36,
          bt = 160,
          vt = 160,
          wt = 140,
          It = 100,
          At = 100,
          Ct = 140,
          St = 140,
          Et = 2,
          kt = 7,
          Tt = "top",
          Pt = "popular",
          Mt = "recent",
          Lt = "favorite",
          Nt = "effectStickers",
          Ft = "effectEmojis",
          Bt = "chatStickers",
          xt = "topic-default-icon",
          Ot = "status-default-icon",
          Rt = /<img[^>]+alt="([^"]+)"(?![^>]*data-document-id)[^>]*>/gm,
          Dt = "en",
          Ut = 200,
          _t = 450,
          $t = "FestiveFontEmoji",
          jt = "image/gif",
          Ht = "application/x-tgsticker",
          Vt = "video/webm",
          zt = new Set(["image/png", "image/jpeg", jt]),
          Wt = new Set(["video/mp4", "video/quicktime"]),
          Jt = new Set([
            "audio/mp3",
            "audio/ogg",
            "audio/wav",
            "audio/mpeg",
            "audio/flac",
            "audio/aac",
            "audio/m4a",
            "audio/mp4",
            "audio/x-m4a",
          ]),
          Kt = new Set([...zt, ...Wt]),
          qt = "The message is not supported on this version of Telegram.",
          Gt = [
            "en",
            "ar",
            "be",
            "ca",
            "zh",
            "nl",
            "fr",
            "de",
            "id",
            "it",
            "ja",
            "ko",
            "pl",
            "pt",
            "ru",
            "es",
            "uk",
            "af",
            "sq",
            "am",
            "hy",
            "az",
            "eu",
            "bn",
            "bs",
            "bg",
            "ceb",
            "zh-CN",
            "zh-TW",
            "co",
            "hr",
            "cs",
            "da",
            "eo",
            "et",
            "fi",
            "fy",
            "gl",
            "ka",
            "el",
            "gu",
            "ht",
            "ha",
            "haw",
            "he",
            "iw",
            "hi",
            "hmn",
            "hu",
            "is",
            "ig",
            "ga",
            "jv",
            "kn",
            "kk",
            "km",
            "rw",
            "ku",
            "ky",
            "lo",
            "la",
            "lv",
            "lt",
            "lb",
            "mk",
            "mg",
            "ms",
            "ml",
            "mt",
            "mi",
            "mr",
            "mn",
            "my",
            "ne",
            "no",
            "ny",
            "or",
            "ps",
            "fa",
            "pa",
            "ro",
            "sm",
            "gd",
            "sr",
            "st",
            "sn",
            "sd",
            "si",
            "sk",
            "sl",
            "so",
            "su",
            "sw",
            "sv",
            "tl",
            "tg",
            "ta",
            "tt",
            "te",
            "th",
            "tr",
            "tk",
            "ur",
            "ug",
            "uz",
            "vi",
            "cy",
            "xh",
            "yi",
            "yo",
            "zu",
          ],
          Xt =
            "((ftp|https?):\\/\\/)?((www\\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z][-a-zA-Z0-9]{1,62})\\b([-a-zA-Z0-9()@:%_+.,~#?&/=]*)",
          Yt = "(@[\\w\\d_-]+)",
          Qt = /^tg:(\/\/)?/i,
          Zt = /^(https?:\/\/)?([-a-zA-Z0-9@:%_+~#=]{1,32}\.)?t\.me/i,
          en = /^(https?:\/\/)?telegram\.org\//i,
          tn = "https://t.me/",
          nn = "botfather",
          rn = "USERNAME_PURCHASE_AVAILABLE",
          on = "auction",
          sn =
            (new Set([rn, "USERNAME_INVALID"]),
            new Set(["t.me", "web.t.me", "a.t.me", "k.t.me", "z.t.me"])),
          an = new Set([
            "AU",
            "BD",
            "CA",
            "CO",
            "EG",
            "HN",
            "IE",
            "IN",
            "JO",
            "MX",
            "MY",
            "NI",
            "NZ",
            "PH",
            "PK",
            "SA",
            "SV",
            "US",
          ]),
          dn = ["bots", "channels", "chats", "users"],
          cn = { emoticon: "❤" },
          un = "777000",
          ln = "1271266957",
          fn = "2666000",
          hn = "7173162320003080",
          mn = 14,
          pn = 0,
          gn = 1,
          yn = -1,
          bn = 10,
          vn = 5,
          wn = 2147483646,
          In = "en",
          An = "android",
          Cn = ["android", "ios", "tdesktop", "macos"],
          Sn = "https://bugs.telegram.org/?tag_ids=41&sort=time",
          En = "https://telegram.org/faq",
          kn = "https://telegram.org/privacy",
          Tn = "https://telegram.org/tos/mini-apps",
          Pn = 1,
          Mn = 86400,
          Ln = 4,
          Nn = 10,
          Fn = 10,
          Bn = 10,
          xn = 3,
          On = "888",
          Rn = 11,
          Dn = "#99BA92",
          Un = "#0F0F0F",
          _n = "#4A8E3A8C",
          $n = "#0A0A0A8C",
          jn = "1a",
          Hn = "2b",
          Vn = 5,
          zn = 524288,
          Wn = 11,
          Jn = new Set(["USER_CANCELED"]),
          Kn = 100,
          qn = 100 * Kn,
          Gn = {
            uploadMaxFileparts: [4e3, 8e3],
            stickersFaved: [5, 10],
            savedGifs: [200, 400],
            dialogFiltersChats: [100, 200],
            dialogFilters: [10, 20],
            dialogFolderPinned: [5, 10],
            captionLength: [1024, 2048],
            channels: [500, 1e3],
            channelsPublic: [10, 20],
            aboutLength: [70, 140],
            chatlistInvites: [3, 100],
            chatlistJoined: [2, 20],
            recommendedChannels: [10, 100],
            savedDialogsPinned: [5, 100],
          },
          Xn = 2147483647,
          Yn = [
            "stories",
            "double_limits",
            "more_upload",
            "faster_download",
            "voice_to_text",
            "no_ads",
            "infinite_reactions",
            "premium_stickers",
            "animated_emoji",
            "advanced_chat_management",
            "profile_badge",
            "animated_userpics",
            "emoji_status",
            "translations",
            "saved_tags",
            "last_seen",
            "message_privacy",
            "effects",
          ],
          Qn = [
            "faster_download",
            "voice_to_text",
            "advanced_chat_management",
            "infinite_reactions",
            "profile_badge",
            "animated_userpics",
            "emoji_status",
            "translations",
            "saved_tags",
            "last_seen",
            "message_privacy",
            "effects",
          ],
          Zn = [
            "channels",
            "dialogFolderPinned",
            "channelsPublic",
            "savedGifs",
            "stickersFaved",
            "aboutLength",
            "captionLength",
            "dialogFilters",
            "dialogFiltersChats",
            "recommendedChannels",
          ];
      },
      48544: (e, t, n) => {
        var r = n(89925),
          o = n(31481),
          s = n(26120),
          a = n(70758),
          i = n(74824),
          d = n(14487),
          c = n(97312),
          u = n(70934),
          l = n(66414),
          f = n(37836),
          h = n(57751),
          m = n(84553),
          p = n(82393),
          g = n(4875),
          y = n(42385),
          b = n(13439),
          v = n(2909);
        (0, b.aJ)("initApi", (e, t) => {
          const n = (0, l.f4)();
          (0, g.Ru)(t.apiUpdate, {
            userAgent: navigator.userAgent,
            platform: p.Aw,
            sessionData: (0, h.CX)(),
            isTest:
              window.location.search.includes("test") ||
              "1" === n?.tgWebAuthTest,
            isWebmSupported: p.OF,
            maxBufferSize: p.kn,
            webAuthToken: n?.tgWebAuthToken,
            dcId: n?.tgWebAuthDcId ? Number(n?.tgWebAuthDcId) : void 0,
            mockScenario: n?.mockScenario,
            shouldAllowHttpTransport: e.settings.byKey.shouldAllowHttpTransport,
            shouldForceHttpTransport: e.settings.byKey.shouldForceHttpTransport,
            shouldDebugExportedSenders:
              e.settings.byKey.shouldDebugExportedSenders,
            langCode: e.settings.byKey.language,
          }),
            (0, g.eu)(Boolean(e.settings.byKey.shouldCollectDebugLogs));
        }),
          (0, b.aJ)("setAuthPhoneNumber", (e, t, n) => {
            const { phoneNumber: r } = n;
            return (
              (0, g.px)("provideAuthPhoneNumber", r.replace(/[^\d]/g, "")),
              { ...e, authIsLoading: !0, authError: void 0 }
            );
          }),
          (0, b.aJ)("setAuthCode", (e, t, n) => {
            const { code: r } = n;
            return (
              (0, g.px)("provideAuthCode", r),
              { ...e, authIsLoading: !0, authError: void 0 }
            );
          }),
          (0, b.aJ)("setAuthPassword", (e, t, n) => {
            const { password: r } = n;
            return (
              (0, g.px)("provideAuthPassword", r),
              { ...e, authIsLoading: !0, authError: void 0 }
            );
          }),
          (0, b.aJ)("uploadProfilePhoto", async (e, t, n) => {
            const {
              file: o,
              isFallback: s,
              isVideo: a,
              videoTs: i,
              bot: c,
              tabId: u = (0, d.g0)(),
            } = n;
            (e = (0, v.nH)(e, r.TD.InProgress, u)),
              (0, b.UF)(e),
              (await (0, g.px)("uploadProfilePhoto", o, s, a, i, c)) &&
                ((e = (0, b.mS)()),
                (e = (0, v.nH)(e, r.TD.Complete, u)),
                (0, b.UF)(e),
                t.loadFullUser({ userId: e.currentUserId }));
          }),
          (0, b.aJ)("signUp", (e, t, n) => {
            const { firstName: r, lastName: o } = n;
            return (
              (0, g.px)("provideAuthRegistration", {
                firstName: r,
                lastName: o,
              }),
              { ...e, authIsLoading: !0, authError: void 0 }
            );
          }),
          (0, b.aJ)(
            "returnToAuthPhoneNumber",
            (e) => ((0, g.px)("restartAuth"), { ...e, authError: void 0 })
          ),
          (0, b.aJ)(
            "goToAuthQrCode",
            (e) => (
              (0, g.px)("restartAuthWithQr"),
              { ...e, authIsLoadingQrCode: !0, authError: void 0 }
            )
          ),
          (0, b.aJ)("saveSession", (e, t, n) => {
            if (e.passcode.isScreenLocked) return;
            const { sessionData: r } = n;
            r ? (0, h.AA)(r, e.currentUserId) : (0, h.rE)();
          }),
          (0, b.aJ)("signOut", async (e, t, n) => {
            "hangUp" in t && t.hangUp({ tabId: (0, d.g0)() }),
              "leaveGroupCall" in t && t.leaveGroupCall({ tabId: (0, d.g0)() });
            try {
              (0, l.lD)(),
                (0, l.vO)(),
                await (0, c.al)(),
                await Promise.race([(0, g.px)("destroy"), (0, f.v7)(3e3)]),
                await (0, m.nv)(!1);
            } catch (e) {}
            t.reset(), n?.forceInitApi && t.initApi();
          }),
          (0, b.aJ)("requestChannelDifference", (e, t, n) => {
            const { chatId: r } = n;
            (0, g.px)("requestChannelDifference", r);
          }),
          (0, b.aJ)("reset", (e, t) => {
            (0, h.rE)(),
              (0, u.WN)(),
              i.clear(o.Iz7),
              i.clear(o.zrf),
              i.clear(o.cLl),
              i.clear(o.nfi),
              a.q.clear(),
              a.B.clear();
            const n = o.CV.replace(/\d+$/, ""),
              r = Number((o.CV.match(/\d+$/) || ["0"])[0]);
            for (let e = 0; e < r; e++) i.clear(`${n}${0 === e ? "" : e}`);
            (0, s.q)(0),
              t.initShared({ force: !0 }),
              Object.values(e.byTabId).forEach((e) => {
                let { id: n, isMasterTab: r } = e;
                t.init({ tabId: n, isMasterTab: r });
              });
          }),
          (0, b.aJ)("disconnect", () => {
            (0, g.eZ)("disconnect");
          }),
          (0, b.aJ)("destroyConnection", () => {
            (0, g.eZ)("destroy", !0, !0);
          }),
          (0, b.aJ)("loadNearestCountry", async (e) => {
            if ("connectionStateReady" !== e.connectionState) return;
            const t = await (0, g.px)("fetchNearestCountry");
            (e = (0, b.mS)()),
              (e = { ...e, authNearestCountry: t }),
              (0, b.UF)(e);
          }),
          (0, b.aJ)("setDeviceToken", (e, t, n) => ({
            ...e,
            push: { deviceToken: n, subscribedAt: Date.now() },
          })),
          (0, b.aJ)("deleteDeviceToken", (e) => ({ ...e, push: void 0 })),
          (0, b.aJ)("lockScreen", async (e) => {
            const t = JSON.stringify({
                ...(0, h.CX)(),
                userId: e.currentUserId,
              }),
              n = await (0, y.Mm)(e);
            await (0, u.yp)(t, n),
              (0, u.m)(),
              (0, h.rE)(),
              (0, s.q)(0),
              (e = (0, b.mS)()),
              (e = (0, v.Vg)(e, {
                isScreenLocked: !0,
                invalidAttemptsCount: 0,
                timeoutUntil: void 0,
              })),
              (0, b.UF)(e),
              setTimeout(() => {
                (e = (0, b.mS)()), (e = (0, v.nY)(e)), (0, b.UF)(e);
              }, o.es);
            try {
              await (0, c.al)(), await (0, g.px)("destroy", !0);
            } catch (e) {}
          });
      },
      26943: (e, t, n) => {
        var r = n(89925),
          o = n(31481),
          s = n(14487),
          a = n(87894),
          i = n(97312),
          d = n(47985),
          c = n(33204),
          u = n(80140),
          l = n(4875),
          f = n(90709),
          h = n(13439),
          m = n(2909),
          p = n(32989),
          g = n(29807);
        (0, h.aJ)("updateProfile", async (e, t, n) => {
          const {
              photo: o,
              firstName: a,
              lastName: i,
              bio: d,
              username: c,
              tabId: u = (0, s.g0)(),
            } = n,
            { currentUserId: f } = e;
          if (f) {
            if (
              ((e = (0, p.w)(
                e,
                { profileEdit: { progress: r.DV.InProgress } },
                u
              )),
              (0, h.UF)(e),
              o && (await (0, l.px)("uploadProfilePhoto", o)),
              (a || i || d) &&
                (await (0, l.px)("updateProfile", {
                  firstName: a,
                  lastName: i,
                  about: d,
                })))
            ) {
              e = (0, h.mS)();
              const t = f && (0, g.mBe)(e, f);
              t &&
                ((e = (0, m.TK)(e, t.id, { firstName: a, lastName: i })),
                (e = (0, m.we)(e, t.id, { bio: d })),
                (0, h.UF)(e));
            }
            if (void 0 !== c) {
              const t = await (0, l.px)("updateUsername", c);
              e = (0, h.mS)();
              const n = f && (0, g.mBe)(e, f);
              if (t && n) {
                const t = n.usernames?.find((e) => e.isEditable),
                  r = t
                    ? n.usernames?.map((e) =>
                        e.isEditable ? { ...e, username: c } : e
                      )
                    : [
                        { username: c, isEditable: !0, isActive: !0 },
                        ...(n.usernames || []),
                      ];
                (e = (0, m.TK)(e, f, { usernames: r })), (0, h.UF)(e);
              }
            }
            (e = (0, h.mS)()),
              (e = (0, p.w)(
                e,
                { profileEdit: { progress: r.DV.Complete } },
                u
              )),
              (0, h.UF)(e),
              o && t.loadFullUser({ userId: f, withPhotos: !0 });
          }
        }),
          (0, h.aJ)("updateProfilePhoto", async (e, t, n) => {
            const { photo: r, isFallback: o } = n,
              { currentUserId: s } = e;
            s &&
              (0, g.mBe)(e, s) &&
              ((e = (0, m.TK)(e, s, { avatarPhotoId: void 0 })),
              (e = (0, m.we)(e, s, { profilePhoto: void 0 })),
              (0, h.UF)(e),
              (await (0, l.px)("updateProfilePhoto", r, o)) &&
                t.loadFullUser({ userId: s, withPhotos: !0 }));
          }),
          (0, h.aJ)("deleteProfilePhoto", async (e, t, n) => {
            const { photo: r } = n,
              { currentUserId: o } = e;
            o &&
              (await (0, l.px)("deleteProfilePhotos", [r])) &&
              ((e = (0, h.mS)()),
              (e = (0, m.so)(e, o, r.id)),
              (0, h.UF)(e),
              t.loadFullUser({ userId: o, withPhotos: !0 }));
          }),
          (0, h.aJ)("checkUsername", async (e, t, n) => {
            const { username: o, tabId: a = (0, s.g0)() } = n;
            let i = (0, g.nTw)(e, a);
            if (i.profileEdit && i.profileEdit.progress === r.DV.InProgress)
              return;
            (e = (0, p.w)(
              e,
              {
                profileEdit: {
                  progress: i.profileEdit ? i.profileEdit.progress : r.DV.Idle,
                  checkedUsername: void 0,
                  isUsernameAvailable: void 0,
                  error: void 0,
                },
              },
              a
            )),
              (0, h.UF)(e);
            const { result: d, error: c } = await (0, l.px)("checkUsername", o);
            (e = (0, h.mS)()),
              (i = (0, g.nTw)(e, a)),
              (e = (0, p.w)(
                e,
                {
                  profileEdit: {
                    ...i.profileEdit,
                    checkedUsername: o,
                    isUsernameAvailable: !0 === d,
                    error: c,
                  },
                },
                a
              )),
              (0, h.UF)(e);
          }),
          (0, h.aJ)("loadWallpapers", async (e) => {
            const t = await (0, l.px)("fetchWallpapers");
            t &&
              ((e = (0, h.mS)()),
              (e = {
                ...e,
                settings: { ...e.settings, loadedWallpapers: t.wallpapers },
              }),
              (0, h.UF)(e));
          }),
          (0, h.aJ)("uploadWallpaper", async (e, t, n) => {
            const o = n,
              s = URL.createObjectURL(o);
            (e = {
              ...e,
              settings: {
                ...e.settings,
                loadedWallpapers: [
                  {
                    slug: r.Vw,
                    document: {
                      mediaType: "document",
                      fileName: "",
                      size: o.size,
                      mimeType: o.type,
                      previewBlobUrl: s,
                    },
                  },
                  ...(e.settings.loadedWallpapers || []),
                ],
              },
            }),
              (0, h.UF)(e);
            const a = await (0, l.px)("uploadWallpaper", o);
            if (!a) return;
            const { wallpaper: i } = a;
            if (!(e = (0, h.mS)()).settings.loadedWallpapers) return;
            const d = e.settings.loadedWallpapers[0];
            if (!d || d.slug !== r.Vw) return;
            const c = { ...i, document: { ...i.document, previewBlobUrl: s } };
            (e = {
              ...e,
              settings: {
                ...e.settings,
                loadedWallpapers: [c, ...e.settings.loadedWallpapers.slice(1)],
              },
            }),
              (0, h.UF)(e);
          }),
          (0, h.aJ)("loadBlockedUsers", async (e) => {
            const t = await (0, l.px)("fetchBlockedUsers", {});
            t &&
              ((e = (0, h.mS)()),
              (e = {
                ...e,
                blocked: { ids: t.blockedIds, totalCount: t.totalCount },
              }),
              (0, h.UF)(e));
          }),
          (0, h.aJ)("blockUser", async (e, t, n) => {
            const { userId: r, isOnlyStories: o } = n,
              s = (0, g.mBe)(e, r);
            s &&
              (await (0, l.px)("blockUser", {
                user: s,
                isOnlyStories: o || void 0,
              })) &&
              ((e = (0, h.mS)()), (e = (0, m.P6)(e, r)), (0, h.UF)(e));
          }),
          (0, h.aJ)("unblockUser", async (e, t, n) => {
            const { userId: r, isOnlyStories: o } = n,
              s = (0, g.mBe)(e, r);
            s &&
              (await (0, l.px)("unblockUser", {
                user: s,
                isOnlyStories: o || void 0,
              })) &&
              ((e = (0, h.mS)()), (e = (0, m.OW)(e, r)), (0, h.UF)(e));
          }),
          (0, h.aJ)("loadNotificationExceptions", async (e) => {
            const t = await (0, l.px)("fetchNotificationExceptions");
            t && ((e = (0, h.mS)()), (e = (0, m.De)(e, t)), (0, h.UF)(e));
          }),
          (0, h.aJ)("loadNotificationSettings", async (e) => {
            const t = await (0, l.px)("fetchNotificationSettings");
            t && ((e = (0, h.mS)()), (e = (0, m.qp)(e, t)), (0, h.UF)(e));
          }),
          (0, h.aJ)("updateNotificationSettings", async (e, t, n) => {
            const { peerType: r, isSilent: o, shouldShowPreviews: s } = n;
            (await (0, l.px)("updateNotificationSettings", r, {
              isSilent: o,
              shouldShowPreviews: s,
            })) &&
              ((e = (0, h.mS)()), (e = (0, m.i0)(e, r, o, s)), (0, h.UF)(e));
          }),
          (0, h.aJ)("updateWebNotificationSettings", async (e, t, n) => {
            const r = e.settings.byKey;
            (e = (0, m.qp)(e, n)), (0, h.UF)(e);
            const { hasWebNotifications: o, hasPushNotifications: s } =
              e.settings.byKey;
            !r.hasPushNotifications && s && (await (0, i.B1)()),
              r.hasPushNotifications && !s && (await (0, i.al)()),
              !r.hasWebNotifications &&
                o &&
                ((await (0, i.xe)()) ||
                  ((e = (0, h.mS)()),
                  (e = (0, m.qp)(e, { hasWebNotifications: !1 })),
                  (0, h.UF)(e)));
          }),
          (0, h.aJ)("updateContactSignUpNotification", async (e, t, n) => {
            const { isSilent: r } = n;
            (await (0, l.px)("updateContactSignUpNotification", r)) &&
              ((e = (0, h.mS)()),
              (e = (0, m.qp)(e, { hasContactJoinedNotifications: !r })),
              (0, h.UF)(e));
          }),
          (0, h.aJ)("loadLanguages", async (e) => {
            const t = await (0, l.px)("fetchLanguages");
            t &&
              ((e = (0, h.mS)()),
              (e = (0, m.qp)(e, { languages: t })),
              (0, h.UF)(e));
          }),
          (0, h.aJ)("loadPrivacySettings", async (e) => {
            const t = await Promise.all([
              (0, l.px)("fetchPrivacySettings", "phoneNumber"),
              (0, l.px)("fetchPrivacySettings", "addByPhone"),
              (0, l.px)("fetchPrivacySettings", "lastSeen"),
              (0, l.px)("fetchPrivacySettings", "profilePhoto"),
              (0, l.px)("fetchPrivacySettings", "forwards"),
              (0, l.px)("fetchPrivacySettings", "chatInvite"),
              (0, l.px)("fetchPrivacySettings", "phoneCall"),
              (0, l.px)("fetchPrivacySettings", "phoneP2P"),
              (0, l.px)("fetchPrivacySettings", "voiceMessages"),
              (0, l.px)("fetchPrivacySettings", "bio"),
              (0, l.px)("fetchPrivacySettings", "birthday"),
            ]);
            if (t.some((e) => void 0 === e)) return;
            const [n, r, o, s, a, i, d, c, u, f, m] = t;
            (e = (0, h.mS)()),
              (e = {
                ...e,
                settings: {
                  ...e.settings,
                  privacy: {
                    ...e.settings.privacy,
                    phoneNumber: n.rules,
                    addByPhone: r.rules,
                    lastSeen: o.rules,
                    profilePhoto: s.rules,
                    forwards: a.rules,
                    chatInvite: i.rules,
                    phoneCall: d.rules,
                    phoneP2P: c.rules,
                    voiceMessages: u.rules,
                    bio: f.rules,
                    birthday: m.rules,
                  },
                },
              }),
              (0, h.UF)(e);
          }),
          (0, h.aJ)("setPrivacyVisibility", async (e, t, n) => {
            const { privacyKey: r, visibility: o, onSuccess: s } = n;
            if (!e.settings.privacy[r]) {
              const t = await (0, l.px)("fetchPrivacySettings", r);
              if (!t) return;
              (e = (0, h.mS)()),
                (e = {
                  ...e,
                  settings: {
                    ...e.settings,
                    privacy: { ...e.settings.privacy, [r]: t.rules },
                  },
                }),
                (0, h.UF)(e);
            }
            const {
              privacy: { [r]: a },
            } = e.settings;
            if (!a) return;
            const i = (0, f.wT)(e, {
                visibility: o,
                allowedIds: [...a.allowUserIds, ...a.allowChatIds],
                blockedIds: [...a.blockUserIds, ...a.blockChatIds],
              }),
              d = await (0, l.px)("setPrivacySettings", r, i);
            d &&
              (s?.(),
              (e = (0, h.mS)()),
              (e = {
                ...e,
                settings: {
                  ...e.settings,
                  privacy: { ...e.settings.privacy, [r]: d.rules },
                },
              }),
              (0, h.UF)(e));
          }),
          (0, h.aJ)("setPrivacySettings", async (e, t, n) => {
            const {
                privacyKey: r,
                isAllowList: o,
                updatedIds: s,
                isPremiumAllowed: a,
              } = n,
              {
                privacy: { [r]: i },
              } = e.settings;
            if (!i) return;
            const d = (0, f.wT)(e, {
                visibility: i.visibility,
                isUnspecified: i.isUnspecified,
                shouldAllowPremium: a,
                allowedIds: o ? s : [...i.allowUserIds, ...i.allowChatIds],
                blockedIds: o ? [...i.blockUserIds, ...i.blockChatIds] : s,
              }),
              c = await (0, l.px)("setPrivacySettings", r, d);
            c &&
              ((e = (0, h.mS)()),
              (e = {
                ...e,
                settings: {
                  ...e.settings,
                  privacy: { ...e.settings.privacy, [r]: c.rules },
                },
              }),
              (0, h.UF)(e));
          }),
          (0, h.aJ)("updateIsOnline", (e, t, n) => {
            "connectionStateReady" === e.connectionState &&
              (0, l.px)("updateIsOnline", n);
          }),
          (0, h.aJ)("loadContentSettings", async (e) => {
            const t = await (0, l.px)("fetchContentSettings");
            t && ((e = (0, h.mS)()), (e = (0, m.qp)(e, t)), (0, h.UF)(e));
          }),
          (0, h.aJ)("updateContentSettings", async (e, t, n) => {
            (e = (0, m.qp)(e, { isSensitiveEnabled: n })),
              (0, h.UF)(e),
              (await (0, l.px)("updateContentSettings", n)) ||
                ((e = (0, h.mS)()),
                (e = (0, m.qp)(e, { isSensitiveEnabled: !n })),
                (0, h.UF)(e));
          }),
          (0, h.aJ)("loadCountryList", async (e, t, n) => {
            let { langCode: r } = n;
            r || (r = e.settings.byKey.language);
            const o = await (0, l.px)("fetchCountryList", { langCode: r });
            o &&
              ((e = (0, h.mS)()), (e = { ...e, countryList: o }), (0, h.UF)(e));
          }),
          (0, h.aJ)("ensureTimeFormat", async (e, t, n) => {
            const { tabId: r = (0, s.g0)() } = n || {};
            if (e.authNearestCountry) {
              const n = o.wEk.has(e.authNearestCountry.toUpperCase())
                ? "12h"
                : "24h";
              t.setSettingOption({ timeFormat: n, tabId: r }), (0, d.bV)(n);
            }
            if (e.settings.byKey.wasTimeFormatSetManually) return;
            const a = await (0, l.px)("fetchNearestCountry");
            if (a) {
              const e = o.wEk.has(a.toUpperCase()) ? "12h" : "24h";
              t.setSettingOption({ timeFormat: e, tabId: r }), (0, d.bV)(e);
            }
          }),
          (0, h.aJ)("loadAppConfig", async (e, t, n) => {
            const r = n?.hash,
              s = await (0, l.px)("fetchAppConfig", r);
            s &&
              ((0, c.A)(
                { action: "loadAppConfig", payload: { hash: s.hash } },
                o.Xrp
              ),
              (e = (0, h.mS)()),
              (e = { ...e, appConfig: s }),
              (0, h.UF)(e));
          }),
          (0, h.aJ)("loadConfig", async (e) => {
            const t = await (0, l.px)("fetchConfig");
            if (!t) return;
            e = (0, h.mS)();
            const n = t.expiresAt - (0, u.Fm)();
            (0, c.A)({ action: "loadConfig", payload: void 0 }, 1e3 * n),
              (e = { ...e, config: t }),
              (0, h.UF)(e);
          }),
          (0, h.aJ)("loadPeerColors", async (e) => {
            const t = e.peerColors?.generalHash,
              n = await (0, l.px)("fetchPeerColors", t);
            n &&
              ((e = (0, h.mS)()),
              (e = {
                ...e,
                peerColors: {
                  ...e.peerColors,
                  general: n.colors,
                  generalHash: n.hash,
                },
              }),
              (0, h.UF)(e));
          }),
          (0, h.aJ)("loadTimezones", async (e) => {
            const t = e.timezones?.hash,
              n = await (0, l.px)("fetchTimezones", t);
            n &&
              ((e = (0, h.mS)()),
              (e = {
                ...e,
                timezones: { byId: (0, a.dU)(n.timezones, "id"), hash: n.hash },
              }),
              (0, h.UF)(e));
          }),
          (0, h.aJ)("loadGlobalPrivacySettings", async (e) => {
            const t = await (0, l.px)("fetchGlobalPrivacySettings");
            t &&
              ((e = (0, h.mS)()), (e = (0, m.qp)(e, { ...t })), (0, h.UF)(e));
          }),
          (0, h.aJ)("updateGlobalPrivacySettings", async (e, t, n) => {
            const r =
                n.shouldArchiveAndMuteNewNonContact ??
                Boolean(e.settings.byKey.shouldArchiveAndMuteNewNonContact),
              o =
                n.shouldHideReadMarks ??
                Boolean(e.settings.byKey.shouldHideReadMarks),
              s =
                n.shouldNewNonContactPeersRequirePremium ??
                Boolean(
                  e.settings.byKey.shouldNewNonContactPeersRequirePremium
                );
            (e = (0, m.qp)(e, {
              shouldArchiveAndMuteNewNonContact: r,
              shouldHideReadMarks: o,
            })),
              (0, h.UF)(e);
            const a = await (0, l.px)("updateGlobalPrivacySettings", {
              shouldArchiveAndMuteNewNonContact: r,
              shouldHideReadMarks: o,
              shouldNewNonContactPeersRequirePremium: s,
            });
            (e = (0, h.mS)()),
              (e = (0, m.qp)(e, {
                shouldArchiveAndMuteNewNonContact: a
                  ? a.shouldArchiveAndMuteNewNonContact
                  : !r,
                shouldHideReadMarks: a ? a.shouldHideReadMarks : !o,
                shouldNewNonContactPeersRequirePremium: a
                  ? a.shouldNewNonContactPeersRequirePremium
                  : !s,
              })),
              (0, h.UF)(e);
          }),
          (0, h.aJ)("toggleUsername", async (e, t, n) => {
            const { username: r, isActive: o } = n,
              { currentUserId: s } = e;
            if (!s) return;
            const a = (0, g.mBe)(e, s);
            if (!a?.usernames) return;
            const i = a.usernames.map((e) =>
              e.username !== r ? e : { ...e, isActive: o || void 0 }
            );
            (e = (0, m.TK)(e, s, { usernames: i })),
              (0, h.UF)(e),
              (await (0, l.px)("toggleUsername", {
                username: r,
                isActive: o,
              })) || t.loadFullUser({ userId: s });
          }),
          (0, h.aJ)("toggleChatUsername", async (e, t, n) => {
            const { chatId: r, username: o, isActive: s } = n,
              a = (0, g.hds)(e, r);
            if (!a?.usernames) return;
            const i = a.usernames.map((e) =>
              e.username !== o ? e : { ...e, isActive: s || void 0 }
            );
            (e = (0, m.wi)(e, r, { usernames: i })),
              (0, h.UF)(e),
              (await (0, l.px)("toggleUsername", {
                chatId: a.id,
                accessHash: a.accessHash,
                username: o,
                isActive: s,
              })) || t.loadFullChat({ chatId: r });
          }),
          (0, h.aJ)("sortUsernames", async (e, t, n) => {
            const { usernames: r } = n,
              { currentUserId: o } = e;
            o &&
              ((await (0, l.px)("reorderUsernames", { usernames: r })) ||
                t.loadUser({ userId: o }));
          }),
          (0, h.aJ)("sortChatUsernames", async (e, t, n) => {
            const { chatId: r, usernames: o } = n,
              s = (0, g.hds)(e, r);
            if (!s) return;
            const a = [...s.usernames],
              i = s.usernames.reduce(
                (e, t) => ((e[o.findIndex((e) => e === t.username)] = t), e),
                []
              );
            (e = (0, m.wi)(e, r, { usernames: i })),
              (0, h.UF)(e),
              (await (0, l.px)("reorderUsernames", {
                chatId: s.id,
                accessHash: s.accessHash,
                usernames: o,
              })) ||
                ((e = (0, h.mS)()),
                (e = (0, m.wi)(e, r, { usernames: a })),
                (0, h.UF)(e));
          });
      },
      4990: (e, t, n) => {
        var r = n(31481),
          o = n(14487),
          s = n(99375),
          a = n(87894),
          i = n(47985),
          d = n(66414),
          c = n(80140),
          u = n(84553),
          l = n(90709),
          f = n(13439),
          h = n(2909),
          m = n(32989),
          p = n(29807);
        function g(e, t, n) {
          const { connectionState: r } = n;
          e = (0, f.mS)();
          const s = (0, p.nTw)(e, (0, o.g0)());
          if (
            ("connectionStateReady" === r &&
              s.isMasterTab &&
              s.multitabNextAction &&
              (t[s.multitabNextAction.action](s.multitabNextAction.payload),
              t.clearMultitabNextAction({ tabId: s.id })),
            r !== e.connectionState)
          ) {
            if (
              ((e = { ...e, connectionState: r }), (0, f.UF)(e), e.isSynced)
            ) {
              const n = Object.values(e.byTabId)
                .flatMap((e) => e.messageLists)
                .map((e) => e.chatId)
                .filter((t) => {
                  const n = e.chats.byId[t];
                  return n && ((0, l.WX)(n) || (0, l.Vs)(n));
                });
              "connectionStateReady" === r &&
                n.length &&
                (0, a.Am)(n).forEach((e) => {
                  t.requestChannelDifference({ chatId: e });
                });
            }
            "connectionStateBroken" === r && t.signOut({ forceInitApi: !0 });
          }
        }
        (0, f.aJ)("apiUpdate", (e, t, n) => {
          switch (n["@type"]) {
            case "updateApiReady":
              !(function (e) {
                (0, i.wT)(e.settings.byKey.language);
              })(e);
              break;
            case "updateAuthorizationState":
              !(function (e, t) {
                const n =
                    "authorizationStateReady" === (e = (0, f.mS)()).authState,
                  r = t.authorizationState;
                switch (
                  ((e = { ...e, authState: r, authIsLoading: !1 }),
                  (0, f.UF)(e),
                  (e = (0, f.mS)()),
                  r)
                ) {
                  case "authorizationStateLoggingOut":
                    (0, u.nv)(!1),
                      (e = { ...e, isLoggingOut: !0 }),
                      (0, f.UF)(e);
                    break;
                  case "authorizationStateWaitCode":
                    (e = { ...e, authIsCodeViaApp: t.isCodeViaApp }),
                      (0, f.UF)(e);
                    break;
                  case "authorizationStateWaitPassword":
                    (e = { ...e, authHint: t.hint }),
                      t.noReset &&
                        (e = { ...e, hasWebAuthTokenPasswordRequired: !0 }),
                      (0, f.UF)(e);
                    break;
                  case "authorizationStateWaitQrCode":
                    (e = {
                      ...e,
                      authIsLoadingQrCode: !1,
                      authQrCode: t.qrCode,
                    }),
                      (0, f.UF)(e);
                    break;
                  case "authorizationStateReady":
                    if (n) break;
                    (0, u.nv)(!0),
                      (e = { ...e, isLoggingOut: !1 }),
                      Object.values(e.byTabId).forEach((t) => {
                        let { id: n } = t;
                        e = (0, m.w)(e, { isInactive: !1 }, n);
                      }),
                      (0, f.UF)(e);
                }
              })(e, n);
              break;
            case "updateAuthorizationError":
              !(function (e, t) {
                (e = (0, f.mS)()),
                  (e = { ...e, authError: t.message }),
                  (0, f.UF)(e);
              })(e, n);
              break;
            case "updateWebAuthTokenFailed":
              !(function (e) {
                (0, d.fY)(),
                  (e = (0, f.mS)()),
                  (e = { ...e, hasWebAuthTokenFailed: !0 }),
                  (0, f.UF)(e);
              })(e);
              break;
            case "updateConnectionState":
              g(e, t, n);
              break;
            case "updateSession":
              !(function (e, t, n) {
                const { sessionData: r } = n;
                e = (0, f.mS)();
                const { authRememberMe: o, authState: s } = e,
                  a = !r || !r.mainDcId;
                o &&
                  "authorizationStateReady" === s &&
                  !a &&
                  t.saveSession({ sessionData: r });
              })(e, t, n);
              break;
            case "updateServerTimeOffset":
              !(function (e) {
                (0, c.SH)(e.serverTimeOffset);
              })(n);
              break;
            case "updateCurrentUser":
              !(function (e, t) {
                const { currentUser: n, currentUserFullInfo: o } = t;
                (e = { ...(0, h.TK)(e, n.id, n), currentUserId: n.id }),
                  (e = (0, h.we)(e, n.id, o)),
                  (0, f.UF)(e),
                  (function (e) {
                    const t = localStorage.getItem(r.NFE);
                    if (!t) return;
                    const n = JSON.parse(t);
                    (n.id = e), localStorage.setItem(r.NFE, JSON.stringify(n));
                  })(n.id);
              })(e, n);
              break;
            case "requestReconnectApi":
              (e = { ...e, isSynced: !1 }),
                (0, f.UF)(e),
                g(e, t, {
                  "@type": "updateConnectionState",
                  connectionState: "connectionStateConnecting",
                }),
                t.initApi();
              break;
            case "requestSync":
              t.sync();
              break;
            case "updateFetchingDifference":
              (e = { ...e, isFetchingDifference: n.isFetching }), (0, f.UF)(e);
              break;
            case "error":
              Object.values(e.byTabId).forEach((e) => {
                let { id: r } = e;
                const o = (0, s.zr)(n.error);
                o
                  ? t.addPaymentError({ error: o, tabId: r })
                  : (0, s.Dd)(n.error)
                  ? t.closePaymentModal({ tabId: r })
                  : t.showDialog && t.showDialog({ data: n.error, tabId: r });
              });
          }
        });
      },
      88742: (e, t, n) => {
        var r = n(37932),
          o = n(66644),
          s = n(14487),
          a = n(97312),
          i = n(47985),
          d = n(70934),
          c = n(21687),
          u = n(57751),
          l = n(71322),
          f = n(84382),
          h = n(84553),
          m = n(82393),
          p = n(4875),
          g = n(42385),
          y = n(13439),
          b = n(2909),
          v = n(32989),
          w = n(29807);
        (0, f.S)((e) => {
          let t = (0, y.mS)();
          t.isInited &&
            t.settings.byKey.shouldUseSystemTheme &&
            ((t = (0, b.qp)(t, { theme: e })), (0, y.UF)(t));
        }),
          (0, y.aJ)("switchMultitabRole", async (e, t, n) => {
            const { isMasterTab: r, tabId: o = (0, s.g0)() } = n;
            if (r !== (0, w.nTw)(e, o).isMasterTab)
              if (
                ((e = (0, v.w)(e, { isMasterTab: r }, o)),
                (0, y.UF)(e, { forceSyncOnIOs: !0 }),
                r)
              ) {
                if (e.passcode.hasPasscode && !e.passcode.isScreenLocked) {
                  const { sessionJson: e } = await (0, d.ug)(),
                    t = JSON.parse(e);
                  (0, u.AA)(t, t.userId);
                }
                (0, u.wr)() && (0, g.ZJ)(),
                  ((e = (0, y.mS)()).passcode.hasPasscode &&
                    e.passcode.isScreenLocked) ||
                    ("connectionStateReady" === e.connectionState &&
                      ((e = {
                        ...e,
                        connectionState: "connectionStateConnecting",
                      }),
                      (0, y.UF)(e)),
                    t.initApi()),
                  (0, h.ii)();
              } else
                (0, a.al)(),
                  t.destroyConnection(),
                  (0, h.KX)(),
                  (0, g.z0)(),
                  t.onSomeTabSwitchedMultitabRole();
            else (0, p.px)("broadcastLocalDbUpdateFull");
          }),
          (0, y.aJ)("onSomeTabSwitchedMultitabRole", async (e) => {
            if (e.passcode.hasPasscode && !e.passcode.isScreenLocked) {
              const { sessionJson: e } = await (0, d.ug)(),
                t = JSON.parse(e);
              (0, u.AA)(t, t.userId);
            }
            (0, p.px)("broadcastLocalDbUpdateFull");
          }),
          (0, y.aJ)("initShared", () => {
            (0, h.ii)();
          }),
          (0, y.aJ)("initMain", (e) => {
            const { hasWebNotifications: t, hasPushNotifications: n } = (0,
            w.$5S)(e);
            if (t && n) {
              const e = ["click", "keypress"],
                t = () => {
                  (0, a.B1)(),
                    e.forEach((e) => {
                      document.removeEventListener(e, t);
                    });
                };
              e.forEach((e) => {
                document.addEventListener(e, t, { once: !0 });
              });
            }
          }),
          (0, r.DW)((e) => {
            let t = !1;
            const n = (0, w.nTw)(e, (0, s.g0)());
            if (!n?.shouldInit) return;
            (e = (0, y.mS)()), (e = (0, v.w)(e, { shouldInit: !1 }, n.id));
            const { messageTextSize: r, language: a } = e.settings.byKey,
              d = (0, w.SJA)(e),
              u = (0, f.V)(),
              p = e.settings.byKey.shouldUseSystemTheme ? u : d,
              g = (0, w.Cw0)(e);
            (0, i.wT)(a, void 0, !0),
              (0, o.RK)(() => {
                document.documentElement.style.setProperty(
                  "--composer-text-size",
                  `${Math.max(r, m.pz ? 16 : 15)}px`
                ),
                  document.documentElement.style.setProperty(
                    "--message-meta-height",
                    `${Math.floor(1.3125 * r)}px`
                  ),
                  document.documentElement.style.setProperty(
                    "--message-text-size",
                    `${r}px`
                  ),
                  document.documentElement.setAttribute(
                    "data-message-text-size",
                    r.toString()
                  ),
                  document.body.classList.add("initial"),
                  document.body.classList.add(
                    m.TF ? "is-touch-env" : "is-pointer-env"
                  ),
                  (0, c.u)(g),
                  m.pz
                    ? document.body.classList.add("is-ios")
                    : m.Ni
                    ? document.body.classList.add("is-android")
                    : m.MP
                    ? document.body.classList.add("is-macos")
                    : m.H8
                    ? document.body.classList.add("is-windows")
                    : m.ig && document.body.classList.add("is-linux"),
                  m.Yw && document.body.classList.add("is-safari"),
                  m.cp && document.body.classList.add("is-electron");
              });
            const I = (0, w.PKK)(e);
            (0, l.Ay)(p, I),
              (e = (0, b.qp)(e, { theme: p })),
              (0, h.ii)(),
              (t = !0),
              (0, y.UF)(e);
          }),
          (0, y.aJ)("setInstallPrompt", (e, t, n) => {
            const { canInstall: r, tabId: o = (0, s.g0)() } = n;
            return (0, v.w)(e, { canInstall: r }, o);
          }),
          (0, y.aJ)("setIsUiReady", (e, t, n) => {
            const { uiReadyState: r, tabId: a = (0, s.g0)() } = n;
            return (
              2 === r &&
                (0, o.RK)(() => {
                  document.body.classList.remove("initial");
                }),
              (0, v.w)(e, { uiReadyState: r }, a)
            );
          }),
          (0, y.aJ)("setAuthPhoneNumber", (e, t, n) => {
            const { phoneNumber: r } = n;
            return { ...e, authPhoneNumber: r };
          }),
          (0, y.aJ)("setAuthRememberMe", (e, t, n) => ({
            ...e,
            authRememberMe: Boolean(n),
          })),
          (0, y.aJ)("clearAuthError", (e) => ({ ...e, authError: void 0 })),
          (0, y.aJ)("disableHistoryAnimations", (e, t, n) => {
            const { tabId: r = (0, s.g0)() } = n || {};
            setTimeout(() => {
              (e = (0, y.mS)()),
                (e = (0, v.w)(e, { shouldSkipHistoryAnimations: !1 }, r)),
                (0, y.UF)(e),
                (0, o.RK)(() => {
                  document.body.classList.remove("no-animate");
                });
            }, 450),
              (e = (0, v.w)(e, { shouldSkipHistoryAnimations: !0 }, r)),
              (0, y.UF)(e, { forceSyncOnIOs: !0 });
          });
      },
      11117: (e, t, n) => {
        var r = n(37932),
          o = n(89925),
          s = n(66644),
          a = n(61182),
          i = n(14487),
          d = n(47985),
          c = n(21687),
          u = n(71322),
          l = n(74065),
          f = n(82393),
          h = n(4875),
          m = n(13439),
          p = n(2909),
          g = n(32989),
          y = n(29807);
        let b;
        (0, r.DW)((e) => {
          const {
              updatePageTitle: t,
              updateShouldDebugExportedSenders: n,
              updateShouldEnableDebugLog: r,
            } = (0, m.ko)(),
            o = b;
          if (((b = e), !o)) return;
          const a = e.settings.byKey,
            i = o.settings.byKey,
            p = e.settings.performance,
            g = o.settings.performance,
            v = e.peerColors,
            w = o.peerColors;
          if (
            (v && v !== w && (0, l.E)(v.general),
            p !== g &&
              (0, s.RK)(() => {
                (0, c.u)(p);
              }),
            a.theme !== i.theme)
          ) {
            const t = !!document.hasFocus() && (0, y.PKK)(e);
            (0, u.Ay)(a.theme, t);
          }
          a.language !== i.language && (0, d.wT)(a.language),
            a.timeFormat !== i.timeFormat && (0, d.bV)(a.timeFormat),
            a.messageTextSize !== i.messageTextSize &&
              (document.documentElement.style.setProperty(
                "--composer-text-size",
                `${Math.max(a.messageTextSize, f.pz ? 16 : 15)}px`
              ),
              document.documentElement.style.setProperty(
                "--message-meta-height",
                `${Math.floor(1.3125 * a.messageTextSize)}px`
              ),
              document.documentElement.style.setProperty(
                "--message-text-size",
                `${a.messageTextSize}px`
              ),
              document.documentElement.setAttribute(
                "data-message-text-size",
                a.messageTextSize.toString()
              )),
            a.canDisplayChatInTitle !== i.canDisplayChatInTitle && t(),
            a.shouldForceHttpTransport !== i.shouldForceHttpTransport &&
              (0, h.px)(
                "setForceHttpTransport",
                Boolean(a.shouldForceHttpTransport)
              ),
            a.shouldAllowHttpTransport !== i.shouldAllowHttpTransport &&
              ((0, h.px)(
                "setAllowHttpTransport",
                Boolean(a.shouldAllowHttpTransport)
              ),
              !a.shouldAllowHttpTransport &&
                a.shouldForceHttpTransport &&
                ((e = (0, m.mS)()),
                (e = {
                  ...e,
                  settings: {
                    ...e.settings,
                    byKey: {
                      ...e.settings.byKey,
                      shouldForceHttpTransport: !1,
                    },
                  },
                }),
                (0, m.UF)(e))),
            a.shouldDebugExportedSenders !== i.shouldDebugExportedSenders &&
              n(),
            a.shouldCollectDebugLogs !== i.shouldCollectDebugLogs && r();
        }),
          (0, m.aJ)("updateShouldEnableDebugLog", (e) => {
            const { settings: t } = e;
            t.byKey.shouldCollectDebugLogs
              ? ((0, h.eu)(!0), (0, a.fw)())
              : ((0, h.eu)(!1), (0, a.pF)());
          }),
          (0, m.aJ)("updateShouldDebugExportedSenders", (e) => {
            const { settings: t } = e;
            (0, h.px)(
              "setShouldDebugExportedSenders",
              Boolean(t.byKey.shouldDebugExportedSenders)
            );
          }),
          (0, m.aJ)("setSettingOption", (e, t, n) => (0, p.qp)(e, n)),
          (0, m.aJ)("updatePerformanceSettings", (e, t, n) => ({
            ...e,
            settings: {
              ...e.settings,
              performance: { ...e.settings.performance, ...n },
            },
          })),
          (0, m.aJ)("setThemeSettings", (e, t, n) => {
            const { theme: r, ...o } = n;
            return (0, p.R0)(e, r, o);
          }),
          (0, m.aJ)("requestNextSettingsScreen", (e, t, n) => {
            const { screen: r, foldersAction: o, tabId: s = (0, i.g0)() } = n;
            return (0, g.w)(
              e,
              { nextSettingsScreen: r, nextFoldersAction: o },
              s
            );
          }),
          (0, m.aJ)("openEditChatFolder", (e, t, n) => {
            const { folderId: r, isOnlyInvites: s, tabId: a = (0, i.g0)() } = n,
              d = (0, y.$aQ)(e, r);
            d &&
              t.requestNextSettingsScreen({
                screen: s
                  ? o.VS.FoldersEditFolderInvites
                  : o.VS.FoldersEditFolderFromChatList,
                foldersAction: { type: "editFolder", payload: d },
                tabId: a,
              });
          }),
          (0, m.aJ)("openShareChatFolderModal", (e, t, n) => {
            const {
                folderId: r,
                url: s,
                noRequestNextScreen: a,
                tabId: d = (0, i.g0)(),
              } = n,
              c = (0, y.$aQ)(e, r),
              u = c?.isChatList;
            if (!u || a)
              return (
                a ||
                  t.requestNextSettingsScreen({
                    screen: o.VS.FoldersShare,
                    tabId: d,
                  }),
                (0, g.w)(
                  e,
                  {
                    shareFolderScreen: {
                      folderId: r,
                      isFromSettings: Boolean(a),
                      url: s,
                    },
                  },
                  d
                )
              );
            t.openEditChatFolder({ folderId: r, isOnlyInvites: !0, tabId: d });
          }),
          (0, m.aJ)("closeShareChatFolderModal", (e, t, n) => {
            const { tabId: r = (0, i.g0)() } = n || {};
            return (
              t.requestNextSettingsScreen({ screen: void 0, tabId: r }),
              (0, g.w)(e, { shareFolderScreen: void 0 }, r)
            );
          });
      },
      42385: (e, t, n) => {
        n.d(t, {
          Bo: () => F,
          Lj: () => T,
          Mm: () => x,
          ZJ: () => P,
          e: () => L,
          r2: () => k,
          z0: () => M,
        });
        var r = n(84051),
          o = n(37932),
          s = n(23174),
          a = n(31481),
          i = n(70758),
          d = n(49763),
          c = n(87894),
          u = n(70934),
          l = n(37836),
          f = n(57751),
          h = n(90709),
          m = n(13439),
          p = n(20714),
          g = n(2909),
          y = n(29807),
          b = n(43874);
        const v = (0, l.nF)(() => (0, r.qF)(() => N()), 5e3, !1),
          w = () => N(!0);
        let I,
          A = !1,
          C = !1;
        function S(e) {
          return i.q.set(a.pge, e);
        }
        function E(e) {
          e?.passcode?.isScreenLocked && localStorage.setItem(a.ozB, "true");
        }
        function k() {
          a.UuV ||
            ((0, m.aJ)("saveSession", () => {
              A || (P(), w());
            }),
            (0, m.aJ)("reset", () => {
              (C = !0),
                i.q.del(a.pge).finally(() => {
                  localStorage.removeItem(a.ozB), (C = !1), A && M();
                });
            }));
        }
        async function T(e) {
          if (a.UuV) return;
          const t = await (async function (e) {
            a.Oig && console.time("global-state-cache-read");
            const t = localStorage.getItem(a.pge),
              n = t ? JSON.parse(t) : void 0;
            n && localStorage.removeItem(a.pge);
            const r = n || (await i.q.get(a.pge));
            a.Oig && console.timeEnd("global-state-cache-read"), r && L(r, e);
            return { ...e, ...r };
          })(e);
          return t.passcode.hasPasscode || (0, f.wr)() ? (P(), t) : void M();
        }
        function P() {
          (A = !0),
            (I = (0, l.yu)(w, !0)),
            window.addEventListener("blur", w),
            (0, o.DW)(v);
        }
        function M() {
          (A = !1),
            (0, o.Cn)(v),
            window.removeEventListener("blur", w),
            I && I();
        }
        function L(e, t) {
          try {
            !(function (e, t) {
              const n = e;
              (e.settings.byKey = { ...t.settings.byKey, ...e.settings.byKey }),
                (e.settings.themes = {
                  ...t.settings.themes,
                  ...e.settings.themes,
                }),
                (e.chatFolders = { ...t.chatFolders, ...e.chatFolders }),
                e.settings.performance ||
                  (e.settings.byKey.animationLevel === a.dnp
                    ? (e.settings.performance = p.PI)
                    : e.settings.byKey.animationLevel === a.zHL
                    ? (e.settings.performance = p.PX)
                    : (e.settings.performance = t.settings.performance)),
                (e.settings.performance = {
                  ...t.settings.performance,
                  ...e.settings.performance,
                }),
                e.appConfig &&
                  !e.appConfig.limits &&
                  (e.appConfig.limits = a.dR$),
                e.chats.similarChannelsById ||
                  (e.chats.similarChannelsById = t.chats.similarChannelsById),
                e.chats.lastMessageIds ||
                  (e.chats.lastMessageIds = t.chats.lastMessageIds),
                n?.appConfig?.peerColors &&
                  ((n.appConfig.peerColors = void 0),
                  (n.appConfig.darkPeerColors = void 0)),
                e.fileUploads.byMessageKey || (e.fileUploads.byMessageKey = {}),
                e.reactions || (e.reactions = t.reactions),
                e.quickReplies || (e.quickReplies = t.quickReplies),
                e.users.previewMediaByBotId ||
                  (e.users.previewMediaByBotId = t.users.previewMediaByBotId),
                e.chats.loadingParameters ||
                  (e.chats.loadingParameters = t.chats.loadingParameters),
                e.topBotApps || (e.topBotApps = t.topBotApps),
                e.users.commonChatsById ||
                  (e.users.commonChatsById = t.users.commonChatsById),
                e.chats.topicsInfoById ||
                  (e.chats.topicsInfoById = t.chats.topicsInfoById);
            })(e, t);
          } catch (e) {
            console.error(e);
          }
        }
        function N(e) {
          const t = (0, m.mS)();
          C || !A || t.isLoggingOut || (!e && (0, r.OV)()) || F();
        }
        function F() {
          let e =
            arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
          const t = (0, m.mS)(),
            { hasPasscode: n, isScreenLocked: r } = t.passcode;
          if (n) {
            if (!r && !e) {
              const e = x(t);
              (0, u.yp)(void 0, e);
            }
            return E(t), void S((0, g.nY)(t, !1));
          }
          E(t), S(B(t));
        }
        function B(e) {
          var t;
          return {
            ...p.HB,
            ...(0, c.Up)(e, [
              "appConfig",
              "authState",
              "authPhoneNumber",
              "authRememberMe",
              "authNearestCountry",
              "attachMenu",
              "currentUserId",
              "contactList",
              "topPeers",
              "topInlineBots",
              "topBotApps",
              "recentEmojis",
              "recentCustomEmojis",
              "push",
              "serviceNotifications",
              "attachmentSettings",
              "leftColumnWidth",
              "archiveSettings",
              "mediaViewer",
              "audioPlayer",
              "shouldShowContextMenuHint",
              "trustedBotIds",
              "recentlyFoundChatIds",
              "peerColors",
              "savedReactionTags",
              "timezones",
              "availableEffectById",
            ]),
            lastIsChatInfoShown: (0, b.Ny)() ? void 0 : e.lastIsChatInfoShown,
            customEmojis: O(e),
            users: R(e),
            chats: D(e),
            messages: U(e),
            settings: _(e),
            chatFolders: $(e),
            groupCalls: j(e),
            reactions: {
              ...(0, c.Up)(e.reactions, [
                "defaultTags",
                "recentReactions",
                "topReactions",
                "effectReactions",
                "hash",
              ]),
              availableReactions:
                ((t = e.reactions.availableReactions),
                t?.map((e) =>
                  (0, c.Up)(e, [
                    "reaction",
                    "staticIcon",
                    "title",
                    "isInactive",
                  ])
                )),
            },
            passcode: (0, c.Up)(e.passcode, [
              "isScreenLocked",
              "hasPasscode",
              "invalidAttemptsCount",
              "timeoutUntil",
            ]),
          };
        }
        function x(e) {
          return JSON.stringify(B(e));
        }
        function O(e) {
          const { lastRendered: t, byId: n } = e.customEmojis,
            r = t.slice(0, a.GW0);
          return {
            byId: (0, c.Up)(n, r),
            lastRendered: r,
            forEmoji: {},
            added: {},
            statusRecent: {},
          };
        }
        function R(e) {
          const {
              users: { byId: t, statusesById: n, fullInfoById: r },
              currentUserId: o,
            } = e,
            s = (0, c.oE)(
              Object.values(e.byTabId).map((t) => {
                let { id: n } = t;
                return (0, y.Xf0)(e, n);
              })
            )
              .map((e) => {
                let { chatId: t } = e;
                return t;
              })
              .filter((e) => (0, h.L8)(e)),
            i = (0, c.Am)(
              (0, c.oE)(
                Object.values(e.byTabId).flatMap((t) => {
                  let { id: n } = t;
                  return (0, y.NHc)(e, n)?.map((e) => e.id) || [];
                })
              )
            ),
            u = s
              .flatMap((t) => Object.values((0, y.zeq)(e, t) || {}))
              .map(
                (e) =>
                  e.content.storyData?.peerId ||
                  e.content.webPage?.story?.peerId
              )
              .filter((e) => Boolean(e) && (0, h.L8)(e)),
            l = Object.keys(e.attachMenu?.bots || {}),
            f = (0, c.Am)([
              ...(o ? [o] : []),
              ...s,
              ...u,
              ...(i || []),
              ...l,
              ...(e.topPeers.userIds || []),
              ...(e.recentlyFoundChatIds?.filter(h.L8) || []),
              ...((0, d.YA)(a._E9)?.slice(0, a.Q$7).filter(h.L8) || []),
              ...((0, d.YA)(a.DSF)?.filter(h.L8) || []),
              ...(e.contactList?.userIds || []),
              ...Object.keys(t),
            ]).slice(0, a.CVv);
          return {
            ...p.HB.users,
            byId: (0, c._E)(t, f),
            statusesById: (0, c._E)(n, f),
            fullInfoById: (0, c._E)(r, f),
          };
        }
        function D(e) {
          const {
              chats: { byId: t },
              currentUserId: n,
            } = e,
            r = (0, c.oE)(
              Object.values(e.byTabId).map((t) => {
                let { id: n } = t;
                return (0, y.Xf0)(e, n);
              })
            ).map((e) => {
              let { chatId: t } = e;
              return t;
            }),
            o = (0, c.oE)(
              Object.values(e.byTabId).flatMap((t) => {
                let { id: n } = t;
                const r = (0, y.Xf0)(e, n);
                if (!r) return;
                const o = (0, y.zeq)(e, r.chatId),
                  s = (0, y.rA3)(e, r.chatId, r.threadId, n);
                return s?.map((e) => {
                  const t = o[e];
                  if (!t) return;
                  const n = t.content,
                    r =
                      "message" === t.replyInfo?.type &&
                      t.replyInfo.replyToPeerId;
                  return n.storyData?.peerId || n.webPage?.story?.peerId || r;
                });
              })
            ),
            s = (0, c.Am)([
              ...(n ? [n] : []),
              ...r,
              ...o,
              ...((0, d.YA)(a._E9)?.slice(0, a.Q$7) || []),
              ...((0, d.YA)(a.DSF) || []),
              ...((0, d.YA)(a.pX9) || []),
              ...(e.recentlyFoundChatIds || []),
              ...Object.keys(t),
            ]).slice(0, a.ViI);
          return {
            ...e.chats,
            similarChannelsById: {},
            isFullyLoaded: {},
            loadingParameters: p.HB.chats.loadingParameters,
            byId: (0, c._E)(e.chats.byId, s),
            fullInfoById: (0, c._E)(e.chats.fullInfoById, s),
            lastMessageIds: {
              all: (0, c._E)(e.chats.lastMessageIds.all || {}, s),
              saved: e.chats.lastMessageIds.saved,
            },
            topicsInfoById: (0, c._E)(e.chats.topicsInfoById, r),
          };
        }
        function U(e) {
          const { currentUserId: t } = e,
            n = {},
            r = (0, c.oE)(
              Object.values(e.byTabId).map((t) => {
                let { id: n } = t;
                return (0, y.Xf0)(e, n);
              })
            ).map((e) => {
              let { chatId: t } = e;
              return t;
            }),
            o = (0, c.oE)(
              Object.values(e.byTabId).map((e) => {
                let { forumPanelChatId: t } = e;
                return t;
              })
            ),
            i = (0, c.Am)([
              ...r,
              ...(t ? [t] : []),
              ...o,
              ...((0, d.YA)(a.DSF) || []),
              ...((0, d.YA)(a._E9)?.slice(0, a.Q$7) || []),
            ]),
            u = Object.values(e.byTabId).reduce((t, n) => {
              let { id: r } = n;
              const { chatId: o, threadId: a } = (0, y.Xf0)(e, r) || {};
              if (!o || !a || a === s.l3) return t;
              const i = t[o] || new Set();
              return i.add(a), (t[o] = i), t;
            }, {});
          return (
            i.forEach((r) => {
              const a = e.messages.byChatId[r];
              if (!a) return;
              const i = (0, y.ZZX)(e, r),
                d = Array.from(u[r] || []),
                l = Object.values(e.messages.byChatId[r].threadsById || {})
                  .map((e) => {
                    let { threadInfo: t } = e;
                    return t?.isCommentsInfo ? t?.originMessageId : void 0;
                  })
                  .filter(Boolean),
                f = (0, c.Am)(d.concat(l)),
                h = (0, c._E)(a.threadsById, [s.l3, ...f]),
                m = (0, c.Am)(
                  Object.values(h).flatMap((e) => e.lastViewportIds || [])
                ),
                p = (0, y.pSx)(e, r),
                g =
                  p && o.includes(r)
                    ? Object.values(p).map((e) => {
                        let { lastMessageId: t } = e;
                        return t;
                      })
                    : [],
                b =
                  r === t && e.chats.lastMessageIds.saved
                    ? Object.values(e.chats.lastMessageIds.saved)
                    : [],
                v = [i].concat(g).concat(b).filter(Boolean),
                w = (0, c.Up)(a.byId, m.concat(v)),
                I = Object.keys(h).reduce((e, t) => {
                  const n = h[Number(t)];
                  return (
                    (e[Number(t)] = {
                      ...n,
                      listedIds: n.lastViewportIds,
                      pinnedIds: void 0,
                      typingStatus: void 0,
                    }),
                    e
                  );
                }, {}),
                A = Object.values(w).reduce((e, t) => {
                  if (!t) return e;
                  const n = (function (e) {
                    const {
                      photo: t,
                      video: n,
                      document: r,
                      sticker: o,
                    } = e.content;
                    return {
                      ...e,
                      content: {
                        ...e.content,
                        photo: t && { ...t, blobUrl: void 0 },
                        video: n && {
                          ...n,
                          blobUrl: void 0,
                          previewBlobUrl: void 0,
                        },
                        document: r && { ...r, previewBlobUrl: void 0 },
                        sticker: o && { ...o, isPreloadedGlobally: void 0 },
                      },
                      previousLocalId: void 0,
                    };
                  })(t);
                  return (e[t.id] = n), e;
                }, {});
              n[r] = { byId: A, threadsById: I };
            }),
            { byChatId: n, sponsoredByChatId: {} }
          );
        }
        function _(e) {
          const { byKey: t, themes: n, performance: r } = e.settings;
          return {
            byKey: t,
            themes: n,
            performance: r,
            privacy: {},
            notifyExceptions: {},
          };
        }
        function $(e) {
          return { ...e.chatFolders };
        }
        function j(e) {
          return { ...e.groupCalls, byId: {}, activeGroupCallId: void 0 };
        }
      },
      20179: (e, t, n) => {
        function r(e) {
          return `photo${e.id}?size=x`;
        }
        function o(e) {
          return "channels" === e
            ? "channels"
            : "chats" === e || "groups" === e
            ? "chats"
            : "users" === e
            ? "users"
            : "bots" === e
            ? "bots"
            : void 0;
        }
        function s(e) {
          return e.requestUrl
            ? e.requestUrl
            : e.appName
            ? `${e.botId}?appName=${e.appName}`
            : e.botId;
        }
        n.d(t, { Fi: () => r, Xj: () => o, rp: () => s });
      },
      62214: (e, t, n) => {
        n.d(t, {
          A5: () => U,
          CO: () => H,
          Du: () => l,
          Gg: () => I,
          IC: () => D,
          Js: () => C,
          L7: () => S,
          L8: () => u,
          PX: () => W,
          Q5: () => _,
          QE: () => h,
          QK: () => f,
          Q_: () => N,
          Qe: () => w,
          SJ: () => k,
          Sq: () => M,
          St: () => R,
          TJ: () => x,
          VN: () => b,
          Vs: () => g,
          W1: () => O,
          WX: () => y,
          YE: () => m,
          Zg: () => z,
          _C: () => $,
          __: () => L,
          cG: () => J,
          cP: () => E,
          e7: () => A,
          gA: () => j,
          gU: () => F,
          kE: () => v,
          l1: () => P,
          rz: () => V,
          sT: () => K,
          ub: () => T,
          yn: () => p,
          zc: () => B,
        });
        var r = n(23174),
          o = n(31481),
          s = n(17663),
          a = n(529),
          i = n(13439),
          d = n(79089);
        const c = Date.now() / 1e3 + 31622400;
        function u(e) {
          return !e.startsWith("-");
        }
        function l(e) {
          return "title" in e;
        }
        function f(e) {
          return !l(e);
        }
        function h(e) {
          return `-1${e.padStart(o.bxS - 2, "0")}`;
        }
        function m(e) {
          return p(e) || g(e);
        }
        function p(e) {
          return "chatTypeBasicGroup" === e.type;
        }
        function g(e) {
          return "chatTypeSuperGroup" === e.type;
        }
        function y(e) {
          return "chatTypeChannel" === e.type;
        }
        function b(e) {
          return (
            "chatTypePrivate" === e.type || "chatTypeBasicGroup" === e.type
          );
        }
        function v(e) {
          return e === o.f51;
        }
        function w(e) {
          return e === o.Ckz;
        }
        function I(e) {
          switch (e.type) {
            case "chatTypePrivate":
              return "PrivateChat";
            case "chatTypeBasicGroup":
            case "chatTypeSuperGroup":
              return "AccDescrGroup";
            case "chatTypeChannel":
              return "AccDescrChannel";
            default:
              return "Chat";
          }
        }
        function A(e) {
          if ("chatTypePrivate" === e.type || "chatTypeSecret" === e.type)
            return e.id;
        }
        function C(e, t) {
          return arguments.length > 2 && void 0 !== arguments[2] && arguments[2]
            ? e("SavedMessages")
            : t.title || e("HiddenName");
        }
        function S(e) {
          const t = (0, d.Kl)(e);
          return t ? `${o.jsp}${t}` : void 0;
        }
        function E(e) {
          let t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : "normal",
            n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : e.avatarPhotoId;
          if (n)
            return "big" === t ? `profile${e.id}?${n}` : `avatar${e.id}?${n}`;
        }
        function k(e) {
          return Boolean(e.adminRights || e.isCreator);
        }
        function T(e, t) {
          return e.adminRights?.[t] || !1;
        }
        function P(e, t) {
          return t.id === o.HxB
            ? e.isCreator
            : e.isCreator || T(e, "manageTopics") || t.isOwner;
        }
        function M(e, t, n) {
          const r =
            n?.boostsToUnrestrict &&
            (n.boostsApplied || 0) >= n.boostsToUnrestrict;
          return Boolean(
            e.currentUserBannedRights?.[t] || (e.defaultBannedRights?.[t] && !r)
          );
        }
        function L(e, t, n, r) {
          if (t && e.isForum) {
            if (e.isNotJoined) return !1;
            if (t?.isClosed && !t.isOwner && !T(e, "manageTopics")) return !1;
          }
          return (
            !(
              e.isRestricted ||
              e.isForbidden ||
              e.migratedTo ||
              (!n && e.isNotJoined) ||
              v(e.id) ||
              w(e.id)
            ) &&
            (!!e.isCreator ||
              !!u(e.id) ||
              (y(e) ? T(e, "postMessages") : k(e) || !M(e, "sendMessages", r)))
          );
        }
        function N(e, t) {
          let n =
              arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
          if (!e)
            return {
              canAttachMedia: !1,
              canAttachPolls: !1,
              canSendStickers: !1,
              canSendGifs: !1,
              canAttachEmbedLinks: !1,
              canSendPhotos: !1,
              canSendVideos: !1,
              canSendRoundVideos: !1,
              canSendAudios: !1,
              canSendVoices: !1,
              canSendPlainText: !1,
              canSendDocuments: !1,
            };
          const o = k(e);
          return {
            canAttachMedia: o || r || !M(e, "sendMedia", t),
            canAttachPolls:
              !r && (o || !M(e, "sendPolls", t)) && (!u(e.id) || n),
            canSendStickers: o || r || !M(e, "sendStickers", t),
            canSendGifs: o || r || !M(e, "sendGifs", t),
            canAttachEmbedLinks: !r && (o || !M(e, "embedLinks", t)),
            canSendPhotos: o || r || !M(e, "sendPhotos", t),
            canSendVideos: o || r || !M(e, "sendVideos", t),
            canSendRoundVideos: o || r || !M(e, "sendRoundvideos", t),
            canSendAudios: o || r || !M(e, "sendAudios", t),
            canSendVoices: o || r || !M(e, "sendVoices", t),
            canSendPlainText: o || r || !M(e, "sendPlain", t),
            canSendDocuments: o || r || !M(e, "sendDocs", t),
          };
        }
        function F(e, t, n) {
          if (t?.sendMessages) {
            const { untilDate: n } = t;
            return n && n < c
              ? e(
                  "Channel.Persmission.Denied.SendMessages.Until",
                  e("formatDateAtTime", [
                    (0, s.A)(new Date(1e3 * n), e.code),
                    (0, s.fU)(e, 1e3 * n),
                  ])
                )
              : e("Channel.Persmission.Denied.SendMessages.Forever");
          }
          if (n?.sendMessages)
            return e(
              "Channel.Persmission.Denied.SendMessages.DefaultRestrictedText"
            );
        }
        function B(e, t) {
          let n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : r.l3,
            s = arguments.length > 3 ? arguments[3] : void 0,
            a = arguments.length > 4 ? arguments[4] : void 0;
          if (!t?.isForum) return;
          if (n === r.l3) {
            if (a || (s && !s[o.HxB]?.isClosed)) return;
            return e("lng_forum_replies_only");
          }
          const i = s?.[Number(n)];
          return i
            ? !i.isClosed || i.isOwner || T(t, "manageTopics")
              ? void 0
              : e("TopicClosedByAdmin")
            : void 0;
        }
        function x(e) {
          return e.folderId === o._E9;
        }
        function O(e, t) {
          let n =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          return n[e.id] && void 0 !== n[e.id].isMuted
            ? n[e.id].isMuted
            : e.isMuted ||
                (u(e.id) && !t.hasPrivateChatsNotifications) ||
                (y(e) && !t.hasBroadcastNotifications) ||
                (m(e) && !t.hasGroupNotifications);
        }
        function R(e, t) {
          let n =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          const {
            hasPrivateChatsMessagePreview: r = !0,
            hasBroadcastMessagePreview: o = !0,
            hasGroupMessagePreview: s = !0,
          } = t;
          return n[e.id] && void 0 !== n[e.id].shouldShowPreviews
            ? n[e.id].shouldShowPreviews
            : (u(e.id) && r) || (y(e) && o) || (m(e) && s);
        }
        function D(e) {
          return p(e) || ((g(e) || y(e)) && e.isCreator);
        }
        function U(e, t, n) {
          const {
              excludedChatIds: r,
              includedChatIds: o,
              bots: s,
              groups: a,
              contacts: i,
              nonContacts: d,
              channels: c,
            } = t,
            u = [s, a, i, d, c];
          return void 0 !== n &&
            (Object.values(u).filter(Boolean).length > 1 ||
              r?.length ||
              o?.length)
            ? e("Chats", n)
            : s
            ? e("FilterBots")
            : a
            ? e("FilterGroups")
            : c
            ? e("FilterChannels")
            : i
            ? e("FilterContacts")
            : d
            ? e("FilterNonContacts")
            : void 0;
        }
        function _(e, t, n) {
          if (n && !u(t)) {
            if (l(n)) {
              if (t === n.id) return;
              return n.title;
            }
            return n.isSelf ? e("FromYou") : (0, d.u0)(n);
          }
        }
        function $(e, t, n, r, o) {
          if (!r) return t;
          const s = (0, a.l)(r);
          return t.filter((t) => {
            const r = n[t];
            if (!r) return !1;
            const a = t === o,
              i = C(e, r, a);
            return a
              ? s(i) || s(r.title)
              : s(i) ||
                  Boolean(
                    r.usernames?.find((e) => {
                      let { username: t } = e;
                      return s(t);
                    })
                  );
          });
        }
        function j(e) {
          return e.usernames?.some((e) => {
            let { isActive: t } = e;
            return t;
          });
        }
        function H(e, t) {
          if (arguments.length > 2 && void 0 !== arguments[2] && arguments[2])
            return e.sort((e, t) => t.lastMessageId - e.lastMessageId);
          {
            const n = e.filter((e) => e.isPinned),
              r = e
                .filter((e) => !e.isPinned && !e.isHidden)
                .sort((e, t) => t.lastMessageId - e.lastMessageId),
              o = e
                .filter((e) => !e.isPinned && e.isHidden)
                .sort((e, t) => t.lastMessageId - e.lastMessageId);
            return [
              ...(t
                ? t.map((e) => n.find((t) => t.id === e)).filter(Boolean)
                : n),
              ...r,
              ...o,
            ];
          }
        }
        function V(e) {
          return (t = e).length === o.bxS && t.startsWith("-1")
            ? e.replace(/^-10+/, "")
            : e.replace("-", "");
          var t;
        }
        function z(e) {
          return e?.color?.color
            ? e.color.color
            : e
            ? ((t = e.id), Math.abs(Number(V(t))) % 7)
            : 0;
          var t;
        }
        function W(e) {
          const t = z(e);
          return (0, i.mS)().peerColors?.general[t].colors?.length || 1;
        }
        function J(e, t, n) {
          return e === n && t !== r.l3;
        }
        function K(e, t) {
          const n = e(I(t)),
            { membersCount: r } = t;
          return t.isRestricted
            ? "Channel" === n
              ? "channel is inaccessible"
              : "group is inaccessible"
            : r
            ? e("Channel" === n ? "Subscribers" : "Members", r, "i")
            : n;
        }
      },
      90709: (e, t, n) => {
        n.d(t, {
          G: () => u,
          wT: () => C,
          Wi: () => i.W,
          rt: () => a.rt,
          eh: () => a.eh,
          A3: () => h,
          pU: () => c,
          Xj: () => b.Xj,
          Sb: () => s.Sb,
          _C: () => o._C,
          Z$: () => r.Z$,
          Q_: () => o.Q_,
          ES: () => s.ES,
          AB: () => a.AB,
          Fi: () => b.Fi,
          Gh: () => r.Gh,
          IC: () => o.IC,
          l1: () => o.l1,
          __: () => o.__,
          cP: () => o.cP,
          L7: () => o.L7,
          Wm: () => a.Wm,
          Js: () => o.Js,
          Gg: () => o.Gg,
          mr: () => a.mr,
          Po: () => s.Po,
          ZD: () => s.ZD,
          A5: () => o.A5,
          zc: () => o.zc,
          zb: () => a.zb,
          ih: () => a.ih,
          sT: () => o.sT,
          ub: () => o.ub,
          $r: () => a.$r,
          cG: () => o.cG,
          Kl: () => r.Kl,
          Fk: () => a.Fk,
          si: () => a.si,
          sd: () => a.sd,
          Cz: () => a.Cz,
          VO: () => a.VO,
          VD: () => a.VD,
          LK: () => a.LK,
          mK: () => a.mK,
          wp: () => a.wp,
          x1: () => a.Qm,
          r_: () => a.r_,
          lH: () => a.lH,
          aN: () => s.aN,
          zC: () => a.zC,
          ed: () => a.ed,
          GZ: () => s.GZ,
          NO: () => a.NO,
          y2: () => a.y2,
          yt: () => s.yt,
          fB: () => a.fB,
          EO: () => a.EO,
          CI: () => a.CI,
          sj: () => s.sj,
          qG: () => a.qG,
          yl: () => a.yl,
          ZZ: () => a.ZZ,
          cU: () => d,
          lk: () => a.lk,
          Q5: () => o.Q5,
          gU: () => o.gU,
          Jw: () => s.Jw,
          rK: () => s.rK,
          wb: () => s.wb,
          fP: () => a.fP,
          P5: () => s.P5,
          zX: () => a.zX,
          gB: () => a.gB,
          T_: () => a.T_,
          Rp: () => a.Rp,
          dc: () => a.dc,
          QC: () => a.QC,
          CO: () => o.CO,
          PX: () => o.PX,
          Zg: () => o.Zg,
          kR: () => r.kR,
          Xn: () => a.Xn,
          xi: () => a.xi,
          rI: () => a.rI,
          e7: () => o.e7,
          mU: () => a.mU,
          Jj: () => l,
          qg: () => s.qg,
          _I: () => s._I,
          aL: () => I.aL,
          Mw: () => a.Mw,
          $_: () => w,
          EN: () => v,
          u0: () => r.u0,
          Yg: () => r.Yg,
          uC: () => p,
          CD: () => r.CD,
          NZ: () => a.NZ,
          sC: () => a.sC,
          Ct: () => a.Ct,
          Pg: () => a.Pg,
          cy: () => a.cy,
          KG: () => a.KG,
          mR: () => a.mR,
          XR: () => s.XR,
          G5: () => s.G5,
          rO: () => a.rO,
          _P: () => s._P,
          Qe: () => o.Qe,
          zP: () => s.zP,
          SJ: () => o.SJ,
          TJ: () => o.TJ,
          yn: () => o.yn,
          WX: () => o.WX,
          YE: () => o.YE,
          gA: () => o.gA,
          Vs: () => o.Vs,
          kE: () => o.kE,
          VN: () => o.VN,
          PL: () => r.PL,
          Ml: () => a.Ml,
          hr: () => a.hr,
          r$: () => s.r$,
          Ak: () => s.Ak,
          vz: () => s.vz,
          X_: () => s.X_,
          CV: () => s.CV,
          iZ: () => a.iZ,
          Ax: () => a.Ax,
          HN: () => s.HN,
          Nb: () => s.Nb,
          ZR: () => s.ZR,
          Ie: () => s.Ie,
          Du: () => o.Du,
          QK: () => o.QK,
          eu: () => g,
          Tv: () => s.Tv,
          a0: () => f,
          u7: () => s.u7,
          NK: () => s.NK,
          tv: () => r.tv,
          L8: () => o.L8,
          PF: () => r.PF,
          Sq: () => o.Sq,
          cR: () => s.cR,
          Ld: () => s.Ld,
          vp: () => s.vp,
          W1: () => o.W1,
          St: () => o.St,
          fu: () => m,
          UB: () => r.UB,
          m4: () => I.m4,
          QE: () => o.QE,
          AK: () => y,
        });
        var r = n(79089),
          o = n(62214),
          s = n(86525),
          a = n(77312),
          i = n(24896);
        function d(e) {
          return e.isOutgoing ? e.reactions?.recentReactions?.[0] : void 0;
        }
        function c(e, t) {
          const { currentUserId: n } = e;
          return t?.recentReactions?.some((e) => {
            let { isUnread: t, isOwn: r, peerId: o } = e;
            return t && !r && n !== o;
          });
        }
        function u(e) {
          return !e.results.some((e) => {
            let { count: t } = e;
            return t > 0;
          });
        }
        function l(e) {
          return "emoticon" in e
            ? `emoji-${e.emoticon}`
            : `document-${e.documentId}`;
        }
        function f(e, t) {
          return e === t || (!(!e || !t) && l(e) === l(t));
        }
        function h(e, t) {
          return "all" === t.type
            ? "emoticon" in e || t.areCustomAllowed
            : "some" === t.type && t.allowed.some((t) => f(t, e));
        }
        function m(e, t) {
          return e.slice().sort((e, n) => {
            const r = e ? ("reaction" in e ? e.reaction : e) : void 0,
              o = n ? ("reaction" in n ? n.reaction : n) : void 0,
              s = t?.findIndex((e) => f(e, r)) || 0,
              a = t?.findIndex((e) => f(e, o)) || 0;
            return (s > -1 ? s : 1 / 0) - (a > -1 ? a : 1 / 0);
          });
        }
        function p(e) {
          return (
            e.reactions?.results
              ?.filter((e) => g(e))
              .sort((e, t) => e.chosenOrder - t.chosenOrder)
              .map((e) => e.reaction) || []
          );
        }
        function g(e) {
          return void 0 !== e.chosenOrder;
        }
        function y(e, t) {
          const n = e
            .map((e) =>
              g(e) ? { ...e, chosenOrder: void 0, count: e.count - 1 } : e
            )
            .filter((e) => {
              let { count: t } = e;
              return t > 0;
            });
          return (
            t.forEach((e, t) => {
              const r = n.findIndex((t) => f(t.reaction, e));
              r > -1
                ? (n[r] = { ...n[r], chosenOrder: t, count: n[r].count + 1 })
                : n.push({ reaction: e, chosenOrder: t, count: 1 });
            }),
            n
          );
        }
        var b = n(20179);
        function v(e) {
          let t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : "preview",
            n = arguments.length > 2 ? arguments[2] : void 0;
          if (Boolean(e.content.video)) {
            if (n && !e.content.altVideo) return;
            const r = n ? e.content.altVideo : e.content.video;
            return (0, a.sC)(r, t);
          }
          return (0, a.rI)(e.content.photo, t);
        }
        function w(e, t) {
          return `story${e}-${t}`;
        }
        var I = n(78396),
          A = n(87894);
        function C(e, t) {
          let {
            visibility: n,
            isUnspecified: r,
            allowedIds: s,
            blockedIds: a,
            shouldAllowPremium: i,
          } = t;
          const {
              users: { byId: d },
              chats: { byId: c },
            } = e,
            [u, l] = (0, A.jB)(s, o.L8),
            [f, h] = (0, A.jB)(a, o.L8);
          return {
            visibility: n,
            isUnspecified: r,
            allowedUsers: u.map((e) => d[e]).filter(Boolean),
            allowedChats: l.map((e) => c[e]).filter(Boolean),
            blockedUsers: f.map((e) => d[e]).filter(Boolean),
            blockedChats: h.map((e) => c[e]).filter(Boolean),
            shouldAllowPremium: i,
          };
        }
      },
      77312: (e, t, n) => {
        n.d(t, {
          $r: () => ue,
          AB: () => X,
          Ax: () => w,
          CI: () => N,
          Ct: () => $,
          Cz: () => Y,
          EO: () => O,
          Fk: () => ae,
          KG: () => Z,
          LK: () => oe,
          Ml: () => b,
          Mw: () => W,
          NO: () => C,
          NZ: () => re,
          Pg: () => U,
          QC: () => P,
          Qm: () => I,
          Rp: () => M,
          T_: () => E,
          VD: () => F,
          VO: () => J,
          Wm: () => ee,
          Xn: () => te,
          ZZ: () => A,
          cy: () => z,
          dc: () => T,
          ed: () => L,
          eh: () => ie,
          fB: () => S,
          fP: () => g,
          gB: () => p,
          hr: () => v,
          iZ: () => de,
          ih: () => q,
          lH: () => se,
          lk: () => f,
          mK: () => h,
          mR: () => d,
          mU: () => D,
          mr: () => j,
          qG: () => k,
          rI: () => R,
          rO: () => c,
          r_: () => i,
          rt: () => x,
          sC: () => _,
          sd: () => ce,
          si: () => Q,
          wp: () => m,
          xi: () => ne,
          y2: () => B,
          yl: () => u,
          zC: () => y,
          zX: () => l,
          zb: () => K,
        });
        var r = n(23174),
          o = n(82393),
          s = n(91525),
          a = n(86525);
        function i(e) {
          return e.content;
        }
        function d(e) {
          return Boolean(
            u(e) || l(e) || y(e) || g(e) || I(e) || A(e) || h(e) || m(e) || p(e)
          );
        }
        function c(e) {
          const t = l(e);
          return Boolean(u(e) || (t && !t?.isRound) || y(e) || g(e) || m(e));
        }
        function u(e) {
          return e.content.photo;
        }
        function l(e) {
          return e.content.video;
        }
        function f(e) {
          const { video: t } = e.content;
          return t?.isRound ? t : void 0;
        }
        function h(e) {
          return e.content.action;
        }
        function m(e) {
          return e.content.audio;
        }
        function p(e) {
          return e.content.voice;
        }
        function g(e) {
          return e.content.sticker;
        }
        function y(e) {
          return e.content.document;
        }
        function b(e) {
          return "photo" === e.innerMediaType;
        }
        function v(e) {
          return "video" === e.innerMediaType;
        }
        function w(e) {
          const t = y(e);
          return t ? "image/webp" === t.mimeType : void 0;
        }
        function I(e) {
          return e.content.contact;
        }
        function A(e) {
          return e.content.poll;
        }
        function C(e) {
          return e.content.invoice;
        }
        function S(e) {
          return e.content.location;
        }
        function E(e) {
          return e.content.webPage;
        }
        function k(e) {
          return e.content.paidMedia;
        }
        function T(e) {
          return E(e)?.photo;
        }
        function P(e) {
          return E(e)?.video;
        }
        function M(e) {
          return E(e)?.audio;
        }
        function L(e) {
          return (
            u(e) || l(e) || y(e) || g(e) || m(e) || p(e) || T(e) || P(e) || M(e)
          );
        }
        function N(e) {
          return (function (e) {
            const t =
              u(e) ||
              l(e) ||
              y(e) ||
              g(e) ||
              T(e) ||
              P(e) ||
              C(e)?.extendedMedia;
            if (t) return t.thumbnail;
          })(e)?.dataUri;
        }
        function F(e) {
          return e.thumbnail?.dataUri;
        }
        function B(e) {
          const t = u(e) || l(e),
            n = C(e)?.extendedMedia;
          return Boolean(n || t?.isSpoiler);
        }
        function x(e, t, n, r, o) {
          const { long: s, lat: a, accessHash: i, accuracyRadius: d } = e;
          return `staticMap:${i}?lat=${a}&long=${s}&w=${t}&h=${n}&zoom=${r}&scale=${o}&accuracyRadius=${d}`;
        }
        function O(e, t) {
          const {
              video: n,
              sticker: r,
              audio: o,
              voice: s,
              document: a,
            } = e.content,
            i = u(e) || T(e),
            d = (function (e) {
              return "suggestProfilePhoto" === e.content.action?.type
                ? e.content.action.photo
                : void 0;
            })(e),
            c = n || P(e),
            l =
              a ||
              (function (e) {
                return E(e)?.document;
              })(e),
            f = o || M(e);
          return c
            ? _(c, t)
            : i || d
            ? R(i || d, t, Boolean(d))
            : l
            ? j(l, t)
            : r
            ? W(r, t)
            : f
            ? H(f, t)
            : s
            ? V(s, t)
            : void 0;
        }
        function R(e, t, n) {
          const r = `photo${e.id}`,
            o = "photo" === e.mediaType && e.isVideo;
          switch (t) {
            case "micro":
            case "pictogram":
              return `${r}?size=${n ? "a" : "m"}`;
            case "inline":
              return Z(e) ? void 0 : `${r}?size=${n ? "b" : "x"}`;
            case "preview":
              return `${r}?size=${n ? "b" : "x"}`;
            case "download":
              return o ? U(e) : r;
            default:
              return r;
          }
        }
        function D(e) {
          return `photo${e.id}?size=c`;
        }
        function U(e) {
          if (e.isVideo) return `photo${e.id}?size=u`;
        }
        function _(e, t) {
          const n = `document${e.id}`;
          switch (t) {
            case "micro":
            case "pictogram":
              return `${n}?size=m`;
            case "inline":
              return Z(e) ? void 0 : G(e, n);
            case "preview":
              return `${n}?size=x`;
            case "download":
              return `${n}?download`;
            default:
              return G(e, n);
          }
        }
        function $(e) {
          return e.hasVideoPreview ? `document${e.id}?size=v` : void 0;
        }
        function j(e, t) {
          const n = `document${e.id}`;
          switch (t) {
            case "micro":
            case "pictogram":
            case "inline":
            case "preview":
              if (!(0, s.ON)(e) || Z(e)) return;
              return `${n}?size=m`;
            default:
              return n;
          }
        }
        function H(e, t) {
          const n = `document${e.id}`;
          switch (t) {
            case "micro":
            case "pictogram":
              return X(e) ? `${n}?size=m` : void 0;
            case "inline":
              return G(e, n);
            case "download":
              return `${n}?download`;
            default:
              return n;
          }
        }
        function V(e, t) {
          const n = `document${e.id}`;
          switch (t) {
            case "micro":
            case "pictogram":
              return;
            case "download":
              return `${n}?download`;
            default:
              return n;
          }
        }
        function z(e) {
          if (e) return `webDocument:${e.url}`;
        }
        function W(e, t) {
          const n = `document${e.id}`;
          switch (t) {
            case "micro":
            case "pictogram":
              return `${n}?size=s`;
            case "preview":
              return `${n}?size=m`;
            case "download":
              return `${n}?download`;
            default:
              return n;
          }
        }
        function J(e, t) {
          switch (e.mediaType) {
            case "photo":
              return R(e, t);
            case "video":
              return _(e, t);
            case "document":
              return j(e, t);
            case "audio":
              return H(e, t);
            case "voice":
              return V(e, t);
            case "sticker":
              return W(e, t);
            case "webDocument":
              return z(e);
            default:
              return;
          }
        }
        function K(e) {
          const { photo: t } = e;
          if (t) return `photo${t.id}?size=x`;
        }
        function q(e) {
          const { document: t } = e;
          if (t) return `document${t.id}`;
        }
        function G(e, t) {
          return o.Uz && o.Yw
            ? `${t}?fileSize=${e.size}&mimeType=${e.mimeType}`
            : t;
        }
        function X(e) {
          return e.thumbnailSizes && e.thumbnailSizes.length > 0;
        }
        function Y(e, t) {
          const n = "document" === e.mediaType && "video" === e.innerMediaType,
            s = "video" === e.mediaType || n,
            a = "audio" === e.mediaType,
            i = "voice" === e.mediaType,
            d = Q(e) || 0;
          return "download" === t
            ? o.Uz && d > o.kn && !o.l5
              ? r.qZ.DownloadUrl
              : r.qZ.BlobUrl
            : s && o.Uz && ("full" === t || "inline" === t)
            ? r.qZ.Progressive
            : a || i
            ? i && !o.Oo
              ? r.qZ.BlobUrl
              : r.qZ.Progressive
            : r.qZ.BlobUrl;
        }
        function Q(e) {
          return "size" in e ? e.size : void 0;
        }
        function Z(e) {
          return "blobUrl" in e
            ? Boolean(e.blobUrl)
            : "previewBlobUrl" in e && Boolean(e.previewBlobUrl);
        }
        function ee(e, t) {
          return se(
            e,
            t,
            arguments.length > 2 && void 0 !== arguments[2] && arguments[2]
              ? "media"
              : "inlineMedia"
          );
        }
        function te(e) {
          return (
            e.sizes.find((e) => "w" === e.type) ||
            e.sizes.find((e) => "y" === e.type) ||
            ne(e)
          );
        }
        function ne(e) {
          return (
            e.sizes.find((e) => "x" === e.type) ||
            e.sizes.find((e) => "m" === e.type) ||
            e.sizes.find((e) => "s" === e.type) ||
            e.thumbnail
          );
        }
        function re(e) {
          if (e.width && e.height) return e;
        }
        function oe(e) {
          let t =
            arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
          return {
            isUploading: t,
            isTransferring:
              t ||
              (arguments.length > 1 && void 0 !== arguments[1] && arguments[1]),
            transferProgress: Number(e),
          };
        }
        function se(e, t, n) {
          let r;
          switch (n) {
            case "media":
              r = (e) => {
                const t = l(e);
                return u(e) || (t && !t.isRound && !t.isGif);
              };
              break;
            case "documents":
              r = y;
              break;
            case "links":
              r = (e) => E(e) || (0, a.xH)(e);
              break;
            case "audio":
              r = m;
              break;
            case "voice":
              r = (e) => {
                const t = l(e);
                return p(e) || (t && t.isRound);
              };
              break;
            case "inlineMedia":
              r = (e) => {
                const t = l(e),
                  n = y(e);
                return (
                  u(e) ||
                  (t && !t.isRound && !t.isGif) ||
                  (n && b(n)) ||
                  (n && v(n))
                );
              };
              break;
            default:
              return [];
          }
          return t.reduce((t, n) => (e[n] && r(e[n]) && t.push(n), t), []);
        }
        function ae(e) {
          const { audio: t, voice: n, video: r } = i(e),
            o = t || n || r || P(e) || M(e);
          if (o) return o.duration;
        }
        function ie(e, t) {
          const n = Boolean(u(e) || T(e) || Boolean(l(e) || P(e))),
            r = Boolean(m(e) || p(e) || y(e)),
            o = (0, a.ES)(t);
          return (
            (n && ("photo" === o || "video" === o)) ||
            (r && ("audio" === o || "file" === o))
          );
        }
        function de(e) {
          return !(
            !e.content ||
            (!e.content.photo &&
              (!e.content.video ||
                e.content.video.isRound ||
                e.content.video.isGif))
          );
        }
        function ce(e) {
          if ("fileName" in e && e.fileName) return e.fileName;
          if ("sticker" === e.mediaType) {
            const t = e.isLottie ? "tgs" : e.isVideo ? "webm" : "webp";
            return `${e.id}.${t}`;
          }
          return "photo" === e.mediaType
            ? `${e.id}.${e.isVideo ? "mp4" : "jpg"}`
            : "voice" === e.mediaType
            ? `${e.id}.${o.Oo ? "ogg" : "wav"}`
            : "id" in e && e.id
            ? e.id
            : `${e.mediaType}-${Math.random().toString(36).slice(4)}`;
        }
        function ue(e, t) {
          const n = J(t, "download");
          return !!n && Boolean(e[n]);
        }
      },
      3544: (e, t, n) => {
        n.d(t, {
          GG: () => p,
          Gn: () => h,
          Su: () => m,
          dS: () => f,
          oL: () => g,
          vs: () => l,
        });
        var r = n(23174),
          o = n(31481),
          s = n(58849),
          a = n(18501),
          i = n(13439),
          d = n(86525),
          c = n(79089);
        const u = ["⠺", "⠵", "⠞", "⠟"],
          l = 80;
        function f(e, t) {
          let n =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : l,
            r = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
          const o =
            !(
              arguments.length > 2 &&
              void 0 !== arguments[2] &&
              arguments[2]
            ) && m(t);
          return `${o ? `${o} ` : ""}${g(e, t, (0, s.A)(h(t), n), r)}`;
        }
        function h(e) {
          const t = (0, d.WD)(e),
            n = (0, d.P5)(e);
          if (!n) return t;
          const { entities: o } = e.content.text || {};
          if (!o?.length) return t ? `${t}\n${n}` : n;
          const s = o.reduce((e, t) => {
            let { type: n, offset: o, length: s } = t;
            if (n !== r.C7.Spoiler) return e;
            const a = (function (e) {
              return new Array(e)
                .fill(void 0)
                .map(() => u[Math.floor(Math.random() * u.length)])
                .join("");
            })(s);
            return `${e.substr(0, o)}${a}${e.substr(o + s, e.length)}`;
          }, n);
          return t ? `${t}\n${s}` : s;
        }
        function m(e) {
          const {
            photo: t,
            video: n,
            audio: r,
            voice: o,
            document: s,
            sticker: a,
            poll: i,
            paidMedia: d,
          } = e.content;
          return e.groupedId || t || d
            ? "🖼"
            : n
            ? "📹"
            : a
            ? a.emoji
            : r
            ? "🎧"
            : o
            ? "🎤"
            : s
            ? "📎"
            : i
            ? "📊"
            : void 0;
        }
        function p(e, t) {
          return y(e, t);
        }
        function g(e, t, n) {
          let r =
            arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
          return y(e, t.content, t, n, r);
        }
        function y(e, t, n, r) {
          let s =
            arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
          const {
            text: u,
            photo: l,
            video: f,
            audio: h,
            voice: m,
            document: p,
            sticker: g,
            contact: y,
            poll: b,
            invoice: v,
            location: w,
            game: I,
            storyData: A,
            giveaway: C,
            giveawayResults: S,
            paidMedia: E,
          } = t;
          let k,
            T = !1;
          const P = E?.isBought && E.extendedMedia,
            M = E && !E.isBought ? E.extendedMedia : void 0,
            L = E && E.extendedMedia.length > 1,
            N = !L && (P?.[0].video || M?.[0].duration),
            F = !L && !N;
          if (
            ((n?.groupedId || L) &&
              ((T = !0), (k = r || e("lng_in_dlg_album"))),
            (l || F) && ((T = !0), (k = r || e("AttachPhoto"))),
            (f || N) &&
              ((T = !0), (k = r || e(f?.isGif ? "AttachGif" : "AttachVideo"))),
            g && (k = e("AttachSticker").trim()),
            h &&
              (k =
                (function (e) {
                  const { audio: t, text: n } = e;
                  return (
                    (t && [t.title, t.performer].filter(Boolean).join(" — ")) ||
                    n?.text
                  );
                })(t) || e("AttachMusic")),
            m && ((T = !0), (k = r || e("AttachAudio"))),
            p && ((T = !s), (k = s ? p.fileName : r || p.fileName)),
            y && (k = e("AttachContact")),
            b &&
              (k = (0, a.f)({
                text: b.summary.question.text,
                entities: b.summary.question.entities,
                noLineBreaks: !0,
              })),
            v &&
              (k = v.extendedMedia
                ? v.title
                : `${e("PaymentInvoice")}: ${v.text}`),
            u && (s && k && !T ? (k += `\n${r}`) : (k = r)),
            ("geo" !== w?.mediaType && "venue" !== w?.mediaType) ||
              (k = e("Message.Location")),
            "geoLive" === w?.mediaType && (k = e("Message.LiveLocation")),
            I && (k = `🎮 ${I.title}`),
            C && (k = e("BoostingGiveawayChannelStarted")),
            S && (k = e("Message.GiveawayEndedWinners", S.winnersCount)),
            A)
          )
            if (n && A.isMention) {
              const t = (0, i.mS)(),
                r = (0, c.u0)(t.users.byId[n.chatId]);
              k = n.isOutgoing
                ? e("Chat.Service.StoryMentioned.You", r)
                : e("Chat.Service.StoryMentioned", r);
            } else k = e(n ? "ForwardedStory" : "Chat.ReplyStory");
          if ((0, d.Sv)(t)) {
            const n = (0, d.Qm)(e, t);
            n && (k = n);
          }
          return k || o.bVP;
        }
      },
      86525: (e, t, n) => {
        n.d(t, {
          Ak: () => S,
          CV: () => W,
          ES: () => J,
          G5: () => z,
          GZ: () => f,
          HN: () => N,
          Ie: () => A,
          Jw: () => v,
          Ld: () => R,
          NK: () => K,
          Nb: () => L,
          P5: () => g,
          Po: () => $,
          Qm: () => j,
          Sb: () => _,
          Sv: () => V,
          Tv: () => C,
          WD: () => m,
          XR: () => p,
          X_: () => F,
          ZD: () => w,
          ZR: () => x,
          _I: () => M,
          _P: () => E,
          aN: () => y,
          cR: () => U,
          qg: () => P,
          r$: () => H,
          rK: () => O,
          sj: () => h,
          u7: () => k,
          vp: () => D,
          vz: () => B,
          wb: () => b,
          xH: () => I,
          yt: () => q,
          zP: () => T,
        });
        var r = n(23174),
          o = n(31481),
          s = n(87894),
          a = n(60343),
          i = n(80140),
          d = n(13439),
          c = n(62214),
          u = n(79089);
        const l = new RegExp(o.kNZ, "i");
        function f(e, t) {
          return ["message", e.toString().replace(".", "-"), t]
            .filter(Boolean)
            .join("-");
        }
        function h(e) {
          return e.previousLocalId || e.id;
        }
        function m(e) {
          const { transcriptionId: t } = e,
            n = (0, d.mS)();
          return t && n.transcriptions[t]?.text;
        }
        function p(e) {
          const {
            text: t,
            sticker: n,
            photo: r,
            video: o,
            audio: s,
            voice: a,
            document: i,
            poll: d,
            webPage: c,
            contact: u,
            invoice: l,
            location: f,
            game: h,
            action: m,
            storyData: p,
            giveaway: g,
            giveawayResults: y,
            isExpiredVoice: b,
            paidMedia: v,
          } = e.content;
          return (
            Boolean(t) ||
            !(
              n ||
              r ||
              o ||
              s ||
              a ||
              i ||
              u ||
              d ||
              c ||
              l ||
              f ||
              h ||
              m?.phoneCall ||
              p ||
              g ||
              y ||
              b ||
              v
            )
          );
        }
        function g(e) {
          return p(e) ? e.content.text?.text || o.bVP : void 0;
        }
        function y(e) {
          const {
            text: t,
            sticker: n,
            photo: o,
            video: s,
            audio: a,
            voice: i,
            document: d,
            poll: c,
            webPage: u,
            contact: l,
            action: f,
            game: h,
            invoice: m,
            location: p,
            storyData: g,
          } = e.content;
          if (n || s?.isRound) return !0;
          if (
            !t ||
            o ||
            s ||
            a ||
            i ||
            d ||
            c ||
            u ||
            l ||
            f ||
            h ||
            m ||
            p ||
            g
          )
            return !1;
          const y = t?.entities?.some((e) => e.type !== r.C7.CustomEmoji);
          return Boolean(e.emojiOnlyCount && !y);
        }
        function b(e) {
          const { text: t } = e.content;
          if (!t?.entities?.length && 1 === e.emojiOnlyCount) return t.text;
        }
        function v(e) {
          const { text: t } = e.content;
          if (
            1 === t?.entities?.length &&
            t.entities[0].type === r.C7.CustomEmoji &&
            1 === e.emojiOnlyCount
          )
            return t.entities[0].documentId;
        }
        function w(e) {
          const { text: t } = e.content;
          let n;
          if (t?.entities) {
            const e = t.entities.find((e) => e.type === r.C7.TextUrl);
            if ((e && (n = e.url.match(l)), !n)) {
              const e = t.entities.find((e) => e.type === r.C7.Url);
              if (e) {
                const { offset: r, length: o } = e;
                n = t.text.substring(r, r + o).match(l);
              }
            }
          }
          if ((!n && t && (n = t.text.match(l)), n))
            return { url: n[0], domain: n[3] };
        }
        function I(e) {
          const { text: t } = e.content,
            n = t && t.text.match(l);
          if (n) return { url: n[0], domain: n[3] };
        }
        function A(e) {
          return e.isOutgoing;
        }
        function C(e) {
          return Boolean("message" === e.replyInfo?.type);
        }
        function S(e) {
          return Boolean(e.forwardInfo || e.content.storyData);
        }
        function E(e) {
          return Boolean(e.content.action) || H(e);
        }
        function k(e) {
          return e.chatId === o.zv8 && Math.round(e.id) !== e.id;
        }
        function T(e) {
          return Boolean(e.senderId) && !(0, c.L8)(e.senderId) && A(e);
        }
        function P(e, t) {
          return (0, c.QK)(t) ? (0, u.Yg)(t) : (0, c.Js)(e, t);
        }
        function M(e) {
          return e.sendingState
            ? "messageSendingStateFailed" === e.sendingState
              ? "failed"
              : "pending"
            : "succeeded";
        }
        function L(e) {
          return (0, a.iL)(e.id);
        }
        function N(e) {
          return "messageSendingStateFailed" === e.sendingState;
        }
        function F(e) {
          return e.content.action && "historyClear" === e.content.action.type;
        }
        function B(e) {
          const { location: t } = e.content;
          return (
            "geoLive" === t?.mediaType &&
            (0, i.Fm)() - (e.date || 0) >= t.period
          );
        }
        function x(e, t) {
          const { text: n, game: r } = e.content,
            o = L(e),
            s = k(e),
            a = E(e);
          return Boolean(
            n?.text.length &&
              !e.emojiOnlyCount &&
              !r &&
              (t || !e.isOutgoing) &&
              !o &&
              !s &&
              !a &&
              !e.isScheduled
          );
        }
        function O(e) {
          return (
            1 === e.inlineButtons?.length &&
            1 === e.inlineButtons[0].length &&
            e.inlineButtons[0][0]
          );
        }
        function R(e) {
          return e.sort((e, t) => e - t);
        }
        function D(e) {
          return e.sort((e, t) => t - e);
        }
        function U(e, t) {
          let n = !1,
            r = e.length
              ? e.map((e) =>
                  (0, s.h8)(e, t) && !n
                    ? ((n = !0), R((0, s.Am)(e.concat(t))))
                    : e
                )
              : [t];
          n || (r = r.concat([t])), r.sort((e, t) => e[0] - t[0]);
          let o = r.length;
          for (let e = 0; e < o; e++) {
            const t = r[e],
              n = r[e - 1];
            n &&
              (n.includes(t[0]) || n.includes(t[0] - 1)) &&
              ((r[e - 1] = R((0, s.Am)(t.concat(n)))),
              r.splice(e, 1),
              o--,
              e--);
          }
          return r;
        }
        function _(e) {
          let t =
            arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          const n = e.content.text;
          if (!n) return;
          const { text: s } = n;
          let { entities: a } = n;
          if (
            s &&
            t &&
            "chatId" in e &&
            e.chatId === o.zv8 &&
            !(0, d.mS)().settings.byKey.shouldShowLoginCodeInChatList
          ) {
            const e = s.match(/^\D*([\d-]{5,7})\D/)?.[1];
            e &&
              ((a = [
                ...(a || []),
                { type: r.C7.Spoiler, offset: s.indexOf(e), length: e.length },
              ]),
              a.sort((e, t) => (e.offset > t.offset ? 1 : -1)));
          }
          return { text: s, entities: a };
        }
        function $(e, t) {
          return j(e, t.content);
        }
        function j(e, t) {
          const { isExpiredVoice: n, isExpiredRoundVideo: r } = t;
          return n
            ? e("Message.VoiceMessageExpired")
            : r
            ? e("Message.VideoMessageExpired")
            : void 0;
        }
        function H(e) {
          return V(e.content);
        }
        function V(e) {
          const { isExpiredVoice: t, isExpiredRoundVideo: n } = e ?? {};
          return Boolean(t || n);
        }
        function z(e) {
          return void 0 !== e.content?.ttlSeconds;
        }
        function W(e) {
          return e.content.action && "joinedChannel" === e.content.action.type;
        }
        function J(e) {
          return o.IH3.has(e.mimeType)
            ? "audio"
            : e.shouldSendAsFile
            ? "file"
            : o.gex.has(e.mimeType)
            ? "photo"
            : o.fNs.has(e.mimeType)
            ? "video"
            : "file";
        }
        function K(e) {
          return e
            ? "image/webp" === e.mimeType ||
                e.mimeType === o.ikg ||
                e.mimeType === o.Msx
            : void 0;
        }
        function q(e, t, n) {
          const s = (0, u.Kl)(e),
            a = (0, c.rz)(e.id),
            i = s || `c/${a}`,
            d = t && t !== r.l3 ? `/${t}` : "",
            l = n ? `/${n}` : "";
          return `${o.jsp}${i}${d}${l}`;
        }
      },
      24896: (e, t, n) => {
        function r(e, t) {
          return `${e}_${t}`;
        }
        n.d(t, { W: () => r });
      },
      26129: (e, t, n) => {
        function r(e) {
          const { replyInfo: t } = e;
          if (t && "message" === t.type) return t;
        }
        function o(e) {
          const { replyInfo: t } = e;
          if (t && "story" === t.type) return t;
        }
        n.d(t, { Q: () => r, W: () => o });
      },
      78396: (e, t, n) => {
        n.d(t, { T8: () => s, aL: () => o, m4: () => a });
        var r = n(23174);
        function o(e, t) {
          const n = `sticker${e}`;
          return t ? `${n}?size=m` : n;
        }
        function s(e) {
          return e.entities?.some((e) => e.type === r.C7.CustomEmoji);
        }
        function a(e) {
          if (!e.entities) return e;
          const t = e.entities.filter((e) => e.type !== r.C7.CustomEmoji);
          return { ...e, entities: t };
        }
      },
      79089: (e, t, n) => {
        n.d(t, {
          CD: () => l,
          Gh: () => p,
          Kl: () => b,
          PF: () => f,
          PL: () => h,
          UB: () => g,
          Yg: () => u,
          Z$: () => y,
          kR: () => v,
          tv: () => m,
          u0: () => c,
        });
        var r = n(31481),
          o = n(17663),
          s = n(87894),
          a = n(64713),
          i = n(529),
          d = n(80140);
        function c(e) {
          if (e)
            switch (e.type) {
              case "userTypeBot":
                return e.firstName;
              case "userTypeRegular":
                return e.firstName || e.lastName;
              case "userTypeDeleted":
              case "userTypeUnknown":
                return "Deleted";
              default:
                return;
            }
        }
        function u(e) {
          if (e) {
            if (h(e)) return "Deleted Account";
            switch (e.type) {
              case "userTypeBot":
              case "userTypeRegular":
                if (e.firstName && e.lastName)
                  return `${e.firstName} ${e.lastName}`;
                if (e.firstName) return e.firstName;
                if (e.lastName) return e.lastName;
                if (e.phoneNumber) return `+${(0, a.n4)(e.phoneNumber)}`;
            }
          }
        }
        function l(e, t, n) {
          if (t.id === r.zv8) return e("ServiceNotifications").toLowerCase();
          if (t.isSupport) return e("SupportStatus");
          if (t.type && "userTypeBot" === t.type)
            return t.botActiveUsers
              ? e("BotUsers", t.botActiveUsers, "i")
              : e("Bot");
          if (!n) return "";
          switch (n.type) {
            case "userStatusEmpty":
              return e("ALongTimeAgo");
            case "userStatusLastMonth":
              return e("WithinAMonth");
            case "userStatusLastWeek":
              return e("WithinAWeek");
            case "userStatusOffline": {
              const { wasOnline: t } = n;
              if (!t) return e("LastSeen.Offline");
              const r = (0, d.SF)(),
                s = new Date(Date.now() + 1e3 * r),
                a = new Date(1e3 * t);
              if (a >= s) return e("LastSeen.JustNow");
              const i = new Date(s.getTime() - a.getTime());
              if (i.getTime() / 1e3 < 60) return e("LastSeen.JustNow");
              if (i.getTime() / 1e3 < 3600)
                return e(
                  "LastSeen.MinutesAgo",
                  Math.floor(i.getTime() / 1e3 / 60)
                );
              const c = new Date();
              if ((c.setHours(0, 0, 0, 0), a > new Date(c.getTime() + 1e3 * r)))
                return i.getTime() / 1e3 < 21600
                  ? e(
                      "LastSeen.HoursAgo",
                      Math.floor(i.getTime() / 1e3 / 60 / 60)
                    )
                  : e("LastSeen.TodayAt", (0, o.fU)(e, a));
              const u = new Date();
              return (
                u.setDate(s.getDate() - 1),
                u.setHours(0, 0, 0, 0),
                a > new Date(u.getTime() + 1e3 * r)
                  ? e("LastSeen.YesterdayAt", (0, o.fU)(e, a))
                  : e("LastSeen.AtDate", (0, o.Lu)(e, a))
              );
            }
            case "userStatusOnline":
              return e("Online");
            case "userStatusRecently":
              return e("Lately");
            default:
              return;
          }
        }
        function f(e, t) {
          let n =
            arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
          const { id: o, type: s } = e;
          return !(
            !t ||
            o === r.zv8 ||
            (e.isSelf && !n) ||
            "userStatusOnline" !== t.type ||
            "userTypeBot" === s
          );
        }
        function h(e) {
          return (
            ("userTypeDeleted" === e.type || "userTypeUnknown" === e.type) &&
            e.id !== r.zv8
          );
        }
        function m(e) {
          return "userTypeBot" === e.type;
        }
        function p(e) {
          return !e.isSelf && !e.isContact && !m(e) && e.id !== r.Ckz;
        }
        function g(e, t, n, r) {
          return (0, s.My)(
            e,
            (e) => {
              const o = (0, d.Fm)();
              if (r && r.includes(e))
                return o + 172800 - (r.length - r.indexOf(e));
              const s = t[e],
                a = n[e];
              if (!s || !a) return 0;
              if ("userStatusOnline" === a.type) return a.expires;
              if ("userStatusOffline" === a.type && a.wasOnline)
                return a.wasOnline;
              switch (a.type) {
                case "userStatusRecently":
                  return o - 86400;
                case "userStatusLastWeek":
                  return o - 604800;
                case "userStatusLastMonth":
                  return o - 18144e3;
                default:
                  return 0;
              }
            },
            "desc"
          );
        }
        function y(e, t, n, r, o) {
          if (!n) return e;
          const s = (0, i.l)(n);
          return e.filter((e) => {
            const n = t[e];
            if (!n) return !1;
            const a = e === r ? o : u(n);
            return (
              (a && s(a)) ||
              Boolean(
                n.usernames?.find((e) => {
                  let { username: t } = e;
                  return s(t);
                })
              )
            );
          });
        }
        function b(e) {
          return e.usernames?.find((e) => e.isActive)?.username;
        }
        function v(e) {
          return `peer-story${e}`;
        }
      },
      13439: (e, t, n) => {
        n.d(t, {
          EK: () => d,
          UF: () => s,
          aJ: () => i,
          ko: () => a,
          mS: () => o,
        });
        const r = (0, n(37932).cl)(),
          o = r.getGlobal,
          s = r.setGlobal,
          a = r.getActions,
          i = r.addActionHandler,
          d = r.withGlobal;
      },
      20714: (e, t, n) => {
        n.d(t, {
          HB: () => c,
          Je: () => u,
          LH: () => a,
          PI: () => d,
          PX: () => i,
        });
        var r = n(89925),
          o = n(31481),
          s = n(82393);
        const a = {
            animatedEmoji: !0,
            autoplayGifs: !0,
            autoplayVideos: !0,
            contextMenuAnimations: !0,
            contextMenuBlur: !0,
            loopAnimatedStickers: !0,
            mediaViewerAnimations: !0,
            messageComposerAnimations: !0,
            messageSendingAnimations: !0,
            pageTransitions: !0,
            reactionEffects: !0,
            rightColumnAnimations: !0,
            stickerEffects: !0,
            storyRibbonAnimations: !0,
          },
          i = {
            animatedEmoji: !0,
            autoplayGifs: !0,
            autoplayVideos: !0,
            contextMenuAnimations: !0,
            contextMenuBlur: !0,
            loopAnimatedStickers: !0,
            mediaViewerAnimations: !0,
            messageComposerAnimations: !0,
            messageSendingAnimations: !0,
            pageTransitions: !0,
            reactionEffects: !0,
            rightColumnAnimations: !1,
            stickerEffects: !1,
            storyRibbonAnimations: !1,
          },
          d = {
            animatedEmoji: !1,
            autoplayGifs: !1,
            autoplayVideos: !1,
            contextMenuAnimations: !1,
            contextMenuBlur: !1,
            loopAnimatedStickers: !1,
            mediaViewerAnimations: !1,
            messageComposerAnimations: !1,
            messageSendingAnimations: !1,
            pageTransitions: !1,
            reactionEffects: !1,
            rightColumnAnimations: !1,
            stickerEffects: !1,
            storyRibbonAnimations: !1,
          },
          c = {
            isInited: !0,
            attachMenu: { bots: {} },
            passcode: {},
            twoFaSettings: {},
            isAppUpdateAvailable: !1,
            isElectronUpdateAvailable: !1,
            shouldShowContextMenuHint: !0,
            audioPlayer: { lastPlaybackRate: o.P3f },
            mediaViewer: { lastPlaybackRate: o.P3f },
            authRememberMe: !0,
            countryList: { phoneCodes: [], general: [] },
            blocked: { ids: [], totalCount: 0 },
            users: {
              byId: {},
              statusesById: {},
              fullInfoById: {},
              previewMediaByBotId: {},
              commonChatsById: {},
            },
            chats: {
              listIds: {},
              isFullyLoaded: {},
              orderedPinnedIds: {},
              totalCount: {},
              lastMessageIds: {},
              byId: {},
              fullInfoById: {},
              similarChannelsById: {},
              topicsInfoById: {},
              loadingParameters: { active: {}, archived: {}, saved: {} },
            },
            messages: { byChatId: {}, sponsoredByChatId: {} },
            stories: {
              byPeerId: {},
              orderedPeerIds: { archived: [], active: [] },
              hasNext: !0,
              hasNextInArchive: !0,
              stealthMode: {},
            },
            groupCalls: { byId: {} },
            attachmentSettings: {
              shouldCompress: !0,
              shouldSendGrouped: !0,
              isInvertedMedia: void 0,
            },
            scheduledMessages: { byChatId: {} },
            quickReplies: { byId: {}, messagesById: {} },
            chatFolders: { byId: {}, invites: {} },
            fileUploads: { byMessageKey: {} },
            recentEmojis: [
              "grinning",
              "kissing_heart",
              "christmas_tree",
              "brain",
              "trophy",
              "duck",
              "cherries",
            ],
            recentCustomEmojis: ["5377305978079288312"],
            reactions: {
              defaultTags: [],
              topReactions: [],
              recentReactions: [],
              effectReactions: [],
              hash: {},
            },
            availableEffectById: {},
            stickers: {
              setsById: {},
              added: {},
              recent: { stickers: [] },
              favorite: { stickers: [] },
              greeting: { stickers: [] },
              premium: { stickers: [] },
              featured: { setIds: [] },
              effect: { stickers: [], emojis: [] },
              forEmoji: {},
            },
            customEmojis: {
              lastRendered: [],
              byId: {},
              added: {},
              forEmoji: {},
              statusRecent: {},
            },
            emojiKeywords: {},
            gifs: { saved: {} },
            topPeers: {},
            topInlineBots: {},
            topBotApps: {},
            activeSessions: { byHash: {}, orderedHashes: [] },
            activeWebSessions: { byHash: {}, orderedHashes: [] },
            settings: {
              byKey: {
                theme: "light",
                shouldUseSystemTheme: !0,
                messageTextSize: s.pz ? o.fSF : s.MP ? o.pZc : o.pk8,
                animationLevel: o.i11,
                messageSendKeyCombo: "enter",
                canAutoLoadPhotoFromContacts: !0,
                canAutoLoadPhotoInPrivateChats: !0,
                canAutoLoadPhotoInGroups: !0,
                canAutoLoadPhotoInChannels: !0,
                canAutoLoadVideoFromContacts: !0,
                canAutoLoadVideoInPrivateChats: !0,
                canAutoLoadVideoInGroups: !0,
                canAutoLoadVideoInChannels: !0,
                canAutoLoadFileFromContacts: !1,
                canAutoLoadFileInPrivateChats: !1,
                canAutoLoadFileInGroups: !1,
                canAutoLoadFileInChannels: !1,
                autoLoadFileMaxSizeMb: 10,
                hasWebNotifications: !0,
                hasPushNotifications: !0,
                notificationSoundVolume: 5,
                shouldSuggestStickers: !0,
                shouldSuggestCustomEmoji: !0,
                shouldUpdateStickerSetOrder: !0,
                language: "en",
                timeFormat: "24h",
                wasTimeFormatSetManually: !1,
                isConnectionStatusMinimized: !0,
                shouldArchiveAndMuteNewNonContact: !1,
                shouldNewNonContactPeersRequirePremium: !1,
                shouldHideReadMarks: !1,
                canTranslate: !1,
                canTranslateChats: !0,
                doNotTranslate: [],
                canDisplayChatInTitle: !0,
                shouldAllowHttpTransport: !0,
                shouldWarnAboutSvg: !0,
              },
              themes: {
                light: { isBlurred: !0, patternColor: o.be8 },
                dark: { isBlurred: !0, patternColor: o.MkD },
              },
              performance: a,
              privacy: {},
              notifyExceptions: {},
            },
            serviceNotifications: [],
            trustedBotIds: [],
            transcriptions: {},
            translations: { byChatId: {} },
            byTabId: {},
            archiveSettings: { isMinimized: !1, isHidden: !1 },
            profilePhotosById: {},
            monetizationInfo: {},
          },
          u = {
            id: 0,
            isMasterTab: !1,
            isLeftColumnShown: !0,
            isChatInfoShown: !1,
            newChatMembersProgress: r.D7.Closed,
            uiReadyState: 0,
            shouldInit: !0,
            gifSearch: {},
            stickerSearch: {},
            messageLists: [],
            activeChatFolder: 0,
            tabThreads: {},
            inlineBots: { isLoading: !1, byUsername: {} },
            webApps: {
              openedWebApps: {},
              openedOrderedKeys: [],
              sessionKeys: [],
              modalState: "maximized",
              isModalOpen: !1,
            },
            globalSearch: {},
            userSearch: {},
            middleSearch: { byChatThreadKey: {} },
            sharedMediaSearch: { byChatThreadKey: {} },
            chatMediaSearch: { byChatThreadKey: {} },
            management: { byChatId: {} },
            storyViewer: { isMuted: !0, isRibbonShown: !1 },
            mediaViewer: { volume: o.Hz7, playbackRate: o.P3f, isMuted: !1 },
            audioPlayer: { volume: o.Hz7, playbackRate: o.P3f, isMuted: !1 },
            isShareMessageModalShown: !1,
            forwardMessages: {},
            replyingMessage: {},
            pollResults: {},
            payment: {},
            notifications: [],
            dialogs: [],
            activeReactions: {},
            activeDownloads: {},
            statistics: { byChatId: {} },
            pollModal: { isOpen: !1 },
            requestedTranslations: { byChatId: {} },
          };
      },
      16350: (e, t, n) => {
        n.d(t, {
          CX: () => S,
          Cb: () => P,
          Kr: () => A,
          NO: () => T,
          Nl: () => w,
          SJ: () => E,
          We: () => m,
          XU: () => l,
          h7: () => v,
          hO: () => d,
          iW: () => b,
          lt: () => y,
          pW: () => p,
          qw: () => C,
          tP: () => c,
          t_: () => k,
          wi: () => g,
          wx: () => f,
          yK: () => u,
        });
        var r = n(31481),
          o = n(22986),
          s = n(87894),
          a = n(29807);
        const i = ["active", "archived"];
        function d(e, t, n) {
          return {
            ...e,
            chats: { ...e.chats, listIds: { ...e.chats.listIds, [t]: n } },
          };
        }
        function c(e, t, n, r, o) {
          return {
            ...e,
            chats: {
              ...e.chats,
              loadingParameters: {
                ...e.chats.loadingParameters,
                [t]: {
                  nextOffsetId: n,
                  nextOffsetPeerId: r,
                  nextOffsetDate: o,
                },
              },
            },
          };
        }
        function u(e, t, n, r) {
          const o = "saved" === r ? "saved" : "all";
          return {
            ...e,
            chats: {
              ...e.chats,
              lastMessageIds: {
                ...e.chats.lastMessageIds,
                [o]: { ...e.chats.lastMessageIds[o], [t]: n },
              },
            },
          };
        }
        function l(e, t, n) {
          const r = "saved" === n ? "saved" : "all";
          return {
            ...e,
            chats: {
              ...e.chats,
              lastMessageIds: {
                ...e.chats.lastMessageIds,
                [r]: { ...e.chats.lastMessageIds[r], ...t },
              },
            },
          };
        }
        function f(e, t, n) {
          const { [t]: r } = e.chats.listIds,
            o = r?.length ? n.filter((e) => !r.includes(e)) : n;
          return r && !o.length ? e : d(e, t, [...(r || []), ...o]);
        }
        function h(e, t) {
          return { ...e, chats: { ...e.chats, byId: t } };
        }
        function m(e, t, n, r) {
          let o =
            arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
          const a = n.unreadMentions || [],
            i = (0, s.Am)([...a, ...r]).sort((e, t) => t - e);
          return (
            (e = g(e, t, { unreadMentions: i })),
            o &&
              (e = g(e, t, {
                unreadMentionsCount:
                  (n.unreadMentionsCount || 0) +
                  Math.max(0, i.length - a.length),
              })),
            e
          );
        }
        function p(e, t, n, r) {
          let o =
            arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
          const s = n.unreadMentions || [],
            a = s?.filter((e) => !r.includes(e));
          if (
            ((e = g(e, t, { unreadMentions: a })), o && n.unreadMentionsCount)
          ) {
            const r = s.length - a.length;
            e = g(e, t, {
              unreadMentionsCount:
                Math.max(n.unreadMentionsCount - r, 0) || void 0,
            });
          }
          return e;
        }
        function g(e, t, n) {
          let r =
              arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
            a = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
          const { byId: i } = e.chats,
            d = i[t];
          if (a && d) {
            const t = Object.keys(n);
            if ((0, o.T)((0, s.Up)(d, t), n)) return e;
          }
          const c = I(e, t, n, r);
          return c ? h(e, { ...i, [t]: c }) : e;
        }
        function y(e, t, n) {
          const r = (0, a.AWZ)(e, t),
            s = { ...r, ...n };
          return (0, o.T)(r, s)
            ? e
            : {
                ...e,
                chats: {
                  ...e.chats,
                  fullInfoById: { ...e.chats.fullInfoById, [t]: s },
                },
              };
        }
        function b(e, t, n) {
          const r = (0, a.AWZ)(e, t);
          return (0, o.T)(r, n)
            ? e
            : {
                ...e,
                chats: {
                  ...e.chats,
                  fullInfoById: { ...e.chats.fullInfoById, [t]: n },
                },
              };
        }
        function v(e, t) {
          const n = Object.keys(t).reduce((n, r) => {
            const o = I(e, r, t[r]);
            return o && (n[r] = o), n;
          }, {});
          return (e = h(e, { ...e.chats.byId, ...n }));
        }
        function w(e, t) {
          const { byId: n } = e.chats;
          let r = !1;
          const o = Object.keys(t).reduce((o, s) => {
            const a = n[s],
              i = t[s],
              d = !a?.membersCount && i.membersCount;
            if (
              a &&
              !a.isMin &&
              !d &&
              (i.isMin || a.accessHash === i.accessHash)
            )
              return o;
            const c = I(e, s, i);
            return c && ((o[s] = c), r || (r = !0)), o;
          }, {});
          return r ? (e = h(e, { ...n, ...o })) : e;
        }
        function I(e, t, n) {
          let r =
            arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
          const { byId: a } = e.chats,
            i = a[t],
            d = [];
          if (n.isMin && i && !i.isMin) return;
          r || d.push("unreadReactionsCount"),
            (0, o.T)(i?.usernames, n.usernames) && d.push("usernames");
          const c = { ...i, ...(0, s.cJ)(n, d) };
          return c.id && c.type ? c : void 0;
        }
        function A(e, t, n) {
          const o = n === r._E9 ? "archived" : "active";
          let s = e.chats.listIds;
          return (
            Object.keys(s).forEach((e) => {
              const n = s[e] || [];
              e !== o || n.includes(t)
                ? e !== o &&
                  n.includes(t) &&
                  (s = { ...s, [e]: n.filter((e) => e !== t) })
                : (s = { ...s, [e]: [...n, t] });
            }),
            g((e = { ...e, chats: { ...e.chats, listIds: s } }), t, {
              folderId: n || void 0,
            })
          );
        }
        function C(e, t, n) {
          const r = "active" === t ? "all" : t;
          return {
            ...e,
            chats: {
              ...e.chats,
              ...(n.orderedPinnedIds && {
                orderedPinnedIds: {
                  ...e.chats.orderedPinnedIds,
                  [t]: n.orderedPinnedIds,
                },
              }),
              totalCount: { ...e.chats.totalCount, [r]: n.totalChatCount },
              isFullyLoaded: { ...e.chats.isFullyLoaded, [t]: !1 },
            },
          };
        }
        function S(e, t) {
          return g((e = E(e, t)), t, { isNotJoined: !0 });
        }
        function E(e, t) {
          let n =
            arguments.length > 2 && void 0 !== arguments[2]
              ? arguments[2]
              : "all";
          return (
            ("all" === n ? i : [n]).forEach((n) => {
              e = d(
                e,
                n,
                e.chats.listIds[n]?.filter((e) => e !== t)
              );
            }),
            e
          );
        }
        function k(e, t, n) {
          const r = (0, a.AWZ)(e, t.id)?.members,
            o = new Set(n.map((e) => e.userId)),
            i = [
              ...(r?.filter((e) => {
                let { userId: t } = e;
                return !o.has(t);
              }) || []),
              ...n,
            ],
            d =
              r?.map((e) => {
                let { userId: t } = e;
                return t;
              }) || [],
            c = i.map((e) => {
              let { userId: t } = e;
              return t;
            });
          if ((0, s.k)(d, c)) return e;
          const u = i.filter((e) => {
            let { isAdmin: t, isOwner: n } = e;
            return t || n;
          });
          return y(e, t.id, {
            members: i,
            adminMembersById: (0, s.dU)(u, "userId"),
          });
        }
        function T(e, t, n, r) {
          let o =
            !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4];
          return {
            ...e,
            chats: {
              ...e.chats,
              similarChannelsById: {
                ...e.chats.similarChannelsById,
                [t]: {
                  similarChannelIds: n,
                  count: r || n.length,
                  shouldShowInChat: o,
                },
              },
            },
          };
        }
        function P(e, t) {
          const n = e.chats.similarChannelsById[t];
          return {
            ...e,
            chats: {
              ...e.chats,
              similarChannelsById: {
                ...e.chats.similarChannelsById,
                [t]: { ...n, shouldShowInChat: !n.shouldShowInChat },
              },
            },
          };
        }
      },
      2909: (e, t, n) => {
        n.d(t, {
          iR: () => o.iR,
          P6: () => X,
          t_: () => r.t_,
          o4: () => o.o4,
          Nl: () => r.Nl,
          Kc: () => o.Kc,
          m1: () => q,
          De: () => K,
          NO: () => r.NO,
          Ni: () => Fe,
          K4: () => Be,
          We: () => r.We,
          d2: () => x,
          g1: () => E,
          fg: () => o.fg,
          Ps: () => ge,
          Iw: () => o.Iw,
          nY: () => ne,
          gt: () => qe.gt,
          XQ: () => te,
          GS: () => he,
          cY: () => me,
          _5: () => H._5,
          BO: () => O,
          AH: () => o.AH,
          XA: () => o.XA,
          MO: () => T,
          so: () => Ne,
          hj: () => o.hj,
          v: () => o.v,
          It: () => o.It,
          do: () => et,
          l3: () => o.l3,
          T4: () => o.T4,
          tX: () => H.tX,
          CX: () => r.CX,
          ol: () => H.ol,
          Me: () => be,
          V5: () => ye,
          Pc: () => b,
          OW: () => Y,
          SJ: () => r.SJ,
          qK: () => o.qK,
          ON: () => $e,
          xG: () => qe.xG,
          pW: () => r.pW,
          $n: () => m,
          iW: () => r.iW,
          hO: () => r.hO,
          tP: () => r.tP,
          Kh: () => Me,
          mP: () => tt,
          qp: () => W,
          n4: () => o.n4,
          R0: () => J,
          ew: () => o.ew,
          wW: () => N,
          zd: () => H.zd,
          gz: () => o.gz,
          s3: () => o.s3,
          lw: () => H.lw,
          _t: () => le,
          Qk: () => ie,
          HX: () => ue,
          ET: () => ae,
          lE: () => fe,
          bb: () => se,
          M: () => ce,
          yQ: () => de,
          yr: () => o.yr,
          Cb: () => r.Cb,
          $r: () => Ce,
          wi: () => r.wi,
          lt: () => r.lt,
          yK: () => r.yK,
          wx: () => r.wx,
          qw: () => r.qw,
          Kr: () => r.Kr,
          PK: () => H.PK,
          Qb: () => H.Qb,
          r3: () => o.r3,
          h7: () => r.h7,
          XU: () => r.XU,
          MN: () => o.MN,
          G4: () => g,
          E2: () => l,
          Xb: () => o.Xb,
          kV: () => o.kV,
          tT: () => h,
          b8: () => U,
          GQ: () => _,
          Rg: () => j,
          Hy: () => $,
          Ah: () => Oe,
          SY: () => Re,
          d4: () => o.d4,
          Y4: () => Ye,
          H6: () => z,
          nH: () => V,
          gJ: () => we,
          oe: () => qe.oe,
          rm: () => qe.rm,
          $R: () => H.$R,
          Vm: () => H.Vm,
          hQ: () => R,
          p0: () => Ge,
          i0: () => G,
          E0: () => o.E0,
          Vg: () => ee,
          _$: () => re,
          kT: () => ke,
          zT: () => Te,
          LZ: () => Le,
          Tq: () => Pe,
          Kp: () => ze,
          XS: () => xe,
          VW: () => We,
          Xz: () => He,
          ZC: () => Ve,
          Gz: () => De,
          xA: () => o.xA,
          QN: () => o.QN,
          tM: () => o.tM,
          T3: () => y,
          lc: () => qe.lc,
          _B: () => qe._B,
          Eg: () => o.Eg,
          Ff: () => o.Ff,
          k3: () => je,
          jU: () => H.jU,
          Tu: () => H.Tu,
          oF: () => oe,
          EK: () => o.EK,
          L_: () => pe,
          n8: () => ve,
          Ro: () => Ae,
          qs: () => Ke,
          bG: () => c,
          v9: () => f,
          Mk: () => u,
          f_: () => p,
          KX: () => Ie,
          X5: () => Ue,
          dx: () => _e,
          e4: () => o.e4,
          eA: () => o.eA,
          Ng: () => o.Ng,
          Ww: () => o.Ww,
          Tw: () => Ze,
          mI: () => Qe,
          ke: () => Q,
          mR: () => o.mR,
          TK: () => C,
          lW: () => B,
          we: () => F,
          BF: () => P,
          Z0: () => M,
          CK: () => S,
        });
        var r = n(16350),
          o = n(26149),
          s = n(14487),
          a = n(87894),
          i = n(29807),
          d = n(32989);
        function c(e, t, n) {
          for (
            var r = arguments.length, o = new Array(r > 3 ? r - 3 : 0), a = 3;
            a < r;
            a++
          )
            o[a - 3] = arguments[a];
          let [c = (0, s.g0)()] = o;
          return (0, d.w)(
            e,
            {
              stickerSearch: {
                ...(0, i.nTw)(e, c).stickerSearch,
                hash: t,
                resultIds: n,
              },
            },
            c
          );
        }
        function u(e, t, n, r) {
          const o = r.map((t) => {
              const n = e.stickers.setsById[t.id];
              return n ? { ...n, ...t } : t;
            }),
            s = r.map((e) => e.id);
          return "search" === t
            ? {
                ...e,
                stickers: {
                  ...e.stickers,
                  setsById: { ...e.stickers.setsById, ...(0, a.dU)(o, "id") },
                },
              }
            : {
                ...e,
                stickers: {
                  ...e.stickers,
                  setsById: { ...e.stickers.setsById, ...(0, a.dU)(o, "id") },
                  [t]: {
                    ...e.stickers[t],
                    hash: n,
                    setIds: [...(e.stickers[t].setIds || []), ...s],
                  },
                },
              };
        }
        function l(e, t, n) {
          const r = n.map((t) => {
              const n = e.stickers.setsById[t.id];
              return n ? { ...n, ...t } : t;
            }),
            o = n
              .map((e) => e.stickers)
              .flat()
              .filter(Boolean),
            s = n.map((e) => e.id);
          return {
            ...e,
            stickers: {
              ...e.stickers,
              setsById: { ...e.stickers.setsById, ...(0, a.dU)(r, "id") },
            },
            customEmojis: {
              ...e.customEmojis,
              added: {
                ...e.customEmojis.added,
                hash: t,
                setIds: [...(e.customEmojis.added.setIds || []), ...s],
              },
              byId: { ...e.customEmojis.byId, ...(0, a.dU)(o, "id") },
            },
          };
        }
        function f(e, t, n) {
          const r = e.stickers.setsById[t] || {},
            o = n.isEmoji || r.isEmoji,
            s =
              (o ? e.customEmojis.added.setIds : e.stickers.added.setIds) || [];
          let i = s;
          n.installedDate &&
            !n.isArchived &&
            s &&
            !s.includes(t) &&
            (i = [t, ...i]),
            !n.installedDate &&
              s?.includes(t) &&
              (i = i.filter((e) => e !== t));
          const d = o && n.stickers && (0, a.dU)(n.stickers, "id");
          return {
            ...e,
            stickers: {
              ...e.stickers,
              added: { ...e.stickers.added, ...(!o && { setIds: i }) },
              setsById: { ...e.stickers.setsById, [t]: { ...r, ...n } },
            },
            customEmojis: {
              ...e.customEmojis,
              byId: { ...e.customEmojis.byId, ...d },
              added: { ...e.customEmojis.added, ...(o && { setIds: i }) },
            },
          };
        }
        function h(e, t, n, r) {
          for (
            var o = arguments.length, a = new Array(o > 4 ? o - 4 : 0), c = 4;
            c < o;
            c++
          )
            a[c - 4] = arguments[c];
          let [u = (0, s.g0)()] = a;
          const { results: l } = (0, i.nTw)(e, u).gifSearch;
          let f;
          if (t || !l) f = n;
          else {
            const e = new Set(l.map((e) => e.id));
            f = [...l, ...n.filter((t) => !e.has(t.id))];
          }
          return (0, d.w)(
            e,
            {
              gifSearch: {
                ...(0, i.nTw)(e, u).gifSearch,
                offset: r,
                results: f,
              },
            },
            u
          );
        }
        function m(e, t) {
          return { ...e, animatedEmojis: t };
        }
        function p(e, t, n, r) {
          const o = [...(0, i.wg6)(e, t), ...(n || [])],
            s = (0, a.Am)(
              o.map((e) => {
                let { id: t } = e;
                return t;
              })
            ),
            d = (0, a.dU)(o, "id"),
            c = s.map((e) => d[e]);
          return {
            ...e,
            stickers: {
              ...e.stickers,
              forEmoji: { emoji: t, stickers: c, hash: r },
            },
          };
        }
        function g(e, t) {
          const n = (0, i.r8w)(e, t),
            r = (0, a.Am)(
              n.map((e) => {
                let { id: t } = e;
                return t;
              })
            ),
            o = (0, a.dU)(n, "id"),
            s = r.map((e) => o[e]);
          return {
            ...e,
            customEmojis: {
              ...e.customEmojis,
              forEmoji: { emoji: t, stickers: s },
            },
          };
        }
        function y(e, t, n) {
          return {
            ...e,
            customEmojis: {
              ...e.customEmojis,
              statusRecent: {
                ...e.customEmojis.statusRecent,
                hash: t,
                emojis: n,
              },
            },
          };
        }
        function b(e) {
          if (e.stickers.forEmoji) {
            const { emoji: t, stickers: n, hash: r } = e.stickers.forEmoji;
            return t ? p(e, t, n, r) : e;
          }
          if (e.customEmojis.forEmoji) {
            const { emoji: t } = e.customEmojis.forEmoji;
            return t ? g(e, t) : e;
          }
          return e;
        }
        var v = n(22986),
          w = n(79824);
        function I(e, t) {
          return { ...e, users: { ...e.users, byId: t } };
        }
        function A(e, t) {
          const { userIds: n } = e.contactList || {};
          if (!n) return e;
          const r = t.filter((e) => e?.isContact).map((e) => e.id);
          return 0 === r.length
            ? e
            : { ...e, contactList: { userIds: (0, a.Am)([...r, ...n]) } };
        }
        function C(e, t, n) {
          const { byId: r } = e.users,
            o = k(e, t, n);
          return o ? I((e = A(e, [o])), { ...r, [t]: o }) : e;
        }
        function S(e, t) {
          const n = Object.keys(t).reduce((n, r) => {
            const o = k(e, r, t[r]);
            return o && (n[r] = o), n;
          }, {});
          return (e = A(
            (e = I(e, { ...e.users.byId, ...n })),
            Object.values(n)
          ));
        }
        function E(e, t) {
          const { byId: n } = e.users;
          let r = !1;
          const o = Object.keys(t).reduce((o, s) => {
            const a = n[s],
              i = t[s];
            if (a && !a.isMin && (i.isMin || a.accessHash === i.accessHash))
              return o;
            const d = k(e, s, i);
            return d && ((o[s] = d), r || (r = !0)), o;
          }, {});
          return r ? (e = A((e = I(e, { ...n, ...o })), Object.values(o))) : e;
        }
        function k(e, t, n) {
          const { byId: r } = e.users,
            o = r[t],
            s = [];
          if (n.isMin && o && !o.isMin) return;
          (0, v.T)(o?.usernames, n.usernames) && s.push("usernames");
          const i = { ...o, ...(0, a.cJ)(n, s) };
          return i.id && i.type ? i : void 0;
        }
        function T(e, t) {
          const { byId: n } = e.users,
            { userIds: o } = e.contactList || {};
          return (
            (e = I(
              (e = {
                ...e,
                contactList: { userIds: o ? o.filter((e) => e !== t) : w.p },
              }),
              { ...n, [t]: { ...n[t], isContact: void 0 } }
            )),
            (e = {
              ...e,
              stories: {
                ...e.stories,
                orderedPeerIds: {
                  active: e.stories.orderedPeerIds.active.filter(
                    (e) => e !== t
                  ),
                  archived: e.stories.orderedPeerIds.archived.filter(
                    (e) => e !== t
                  ),
                },
              },
            }),
            (0, r.wi)(e, t, { settings: void 0 })
          );
        }
        function P(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), o = 2;
            o < n;
            o++
          )
            r[o - 2] = arguments[o];
          let [a = (0, s.g0)()] = r;
          return (0, d.w)(
            e,
            { userSearch: { ...(0, i.nTw)(e, a).userSearch, ...t } },
            a
          );
        }
        function M(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), o = 2;
            o < n;
            o++
          )
            r[o - 2] = arguments[o];
          let [a = (0, s.g0)()] = r;
          return P(e, { fetchingStatus: t }, a);
        }
        function L(e, t, n) {
          const { fullInfoById: r } = e.users;
          return r[t] ? F(e, t, { isBlocked: n }) : e;
        }
        function N(e, t) {
          return { ...e, users: { ...e.users, statusesById: t } };
        }
        function F(e, t, n) {
          const r = e.users.fullInfoById[t];
          return {
            ...e,
            users: {
              ...e.users,
              fullInfoById: { ...e.users.fullInfoById, [t]: { ...r, ...n } },
            },
          };
        }
        function B(e, t, n) {
          return {
            ...e,
            users: {
              ...e.users,
              commonChatsById: { ...e.users.commonChatsById, [t]: n },
            },
          };
        }
        function x(e, t) {
          const { statusesById: n } = e.users;
          return N(e, { ...n, ...t });
        }
        function O(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
            r < t;
            r++
          )
            n[r - 1] = arguments[r];
          let [o = (0, s.g0)()] = n;
          return (0, d.w)(e, { newContact: void 0 }, o);
        }
        function R(e, t, n) {
          for (
            var r = arguments.length, o = new Array(r > 3 ? r - 3 : 0), a = 3;
            a < r;
            a++
          )
            o[a - 3] = arguments[a];
          let [i = (0, s.g0)()] = o;
          return n.length
            ? (0, d.w)(
                e,
                { inviteViaLinkModal: { missingUsers: n, chatId: t } },
                i
              )
            : (0, d.w)(e, { inviteViaLinkModal: void 0 }, i);
        }
        var D = n(57309);
        function U(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), o = 2;
            o < n;
            o++
          )
            r[o - 2] = arguments[o];
          let [a = (0, s.g0)()] = r;
          return (0, d.w)(
            e,
            { globalSearch: { ...(0, i.nTw)(e, a).globalSearch, ...t } },
            a
          );
        }
        function _(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), o = 2;
            o < n;
            o++
          )
            r[o - 2] = arguments[o];
          let [a = (0, s.g0)()] = r;
          return U(e, { currentContent: t }, a);
        }
        function $(e, t, n, r, o, d, c) {
          for (
            var u = arguments.length, l = new Array(u > 7 ? u - 7 : 0), f = 7;
            f < u;
            f++
          )
            l[f - 7] = arguments[f];
          let [h = (0, s.g0)()] = l;
          const { resultsByType: m } = (0, i.nTw)(e, h).globalSearch || {},
            p = t.reduce((e, t) => ((e[(0, D.D)(t)] = t), e), {}),
            g = m?.[r]?.foundIds;
          if (
            void 0 !== g &&
            Object.keys(p).every((e) => g.includes((0, D.D)(p[e])))
          )
            return U(
              (e = j(e, { messages: !1 }, h)),
              {
                resultsByType: {
                  ...((0, i.nTw)(e, h).globalSearch || {}).resultsByType,
                  [r]: {
                    totalCount: n,
                    nextOffsetId: d,
                    nextOffsetRate: o,
                    nextOffsetPeerId: c,
                  },
                },
              },
              h
            );
          const y = g || [],
            b = t.map((e) => (0, D.D)(e)).filter((e) => !y.includes(e)),
            v = Array.prototype.concat(y, b),
            w = (0, a.k)(y, v) ? y : v;
          return U(
            (e = j(e, { messages: !1 }, h)),
            {
              resultsByType: {
                ...((0, i.nTw)(e, h).globalSearch || {}).resultsByType,
                [r]: {
                  totalCount: n,
                  nextOffsetId: d,
                  nextOffsetRate: o,
                  nextOffsetPeerId: c,
                  foundIds: w,
                },
              },
            },
            h
          );
        }
        function j(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), o = 2;
            o < n;
            o++
          )
            r[o - 2] = arguments[o];
          let [a = (0, s.g0)()] = r;
          return U(
            e,
            {
              fetchingStatus: {
                ...(0, i.nTw)(e, a).globalSearch.fetchingStatus,
                ...t,
              },
            },
            a
          );
        }
        var H = n(68344);
        function V(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), o = 2;
            o < n;
            o++
          )
            r[o - 2] = arguments[o];
          let [a = (0, s.g0)()] = r;
          return (0, d.w)(
            e,
            { management: { ...(0, i.nTw)(e, a).management, progress: t } },
            a
          );
        }
        function z(e, t, n) {
          for (
            var r = arguments.length, o = new Array(r > 3 ? r - 3 : 0), a = 3;
            a < r;
            a++
          )
            o[a - 3] = arguments[a];
          let [c = (0, s.g0)()] = o;
          const { management: u } = (0, i.nTw)(e, c);
          return (0, d.w)(
            e,
            {
              management: {
                ...u,
                byChatId: {
                  ...u.byChatId,
                  [t]: { ...(u.byChatId[t] || {}), ...n },
                },
              },
            },
            c
          );
        }
        function W(e, t) {
          return {
            ...e,
            settings: { ...e.settings, byKey: { ...e.settings.byKey, ...t } },
          };
        }
        function J(e, t, n) {
          return {
            ...e,
            settings: {
              ...e.settings,
              themes: {
                ...e.settings.themes,
                [t]: { ...(e.settings.themes[t] || {}), ...n },
              },
            },
          };
        }
        function K(e, t) {
          return (
            t.forEach((t) => {
              const { chatId: n, ...r } = t;
              e = q(e, n, r);
            }),
            e
          );
        }
        function q(e, t, n) {
          return {
            ...e,
            settings: {
              ...e.settings,
              notifyExceptions: { ...e.settings.notifyExceptions, [t]: n },
            },
          };
        }
        function G(e, t, n, r) {
          switch (t) {
            case "contact":
              return W(e, {
                ...(void 0 !== n && { hasPrivateChatsNotifications: !n }),
                ...(void 0 !== r && { hasPrivateChatsMessagePreview: r }),
              });
            case "group":
              return W(e, {
                ...(void 0 !== n && { hasGroupNotifications: !n }),
                ...(void 0 !== r && { hasGroupMessagePreview: r }),
              });
            case "broadcast":
              return W(e, {
                ...(void 0 !== n && { hasBroadcastNotifications: !n }),
                ...(void 0 !== r && { hasBroadcastMessagePreview: r }),
              });
          }
        }
        function X(e, t) {
          return (
            (e = L(e, t, !0)),
            {
              ...e,
              blocked: {
                ...e.blocked,
                ids: [t, ...e.blocked.ids],
                totalCount: e.blocked.totalCount + 1,
              },
            }
          );
        }
        function Y(e, t) {
          return (
            (e = L(e, t, !1)),
            {
              ...e,
              blocked: {
                ...e.blocked,
                ids: e.blocked.ids.filter((e) => e !== t),
                totalCount: e.blocked.totalCount - 1,
              },
            }
          );
        }
        function Q(e, t) {
          return { ...e, twoFaSettings: { ...e.twoFaSettings, ...t } };
        }
        var Z = n(20714);
        function ee(e, t) {
          return { ...e, passcode: { ...e.passcode, ...t } };
        }
        function te(e) {
          return { ...e, passcode: {} };
        }
        function ne(e) {
          let t =
            !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
          const {
            theme: n,
            shouldUseSystemTheme: r,
            animationLevel: o,
            language: s,
          } = e.settings.byKey;
          return {
            ...Z.HB,
            passcode: e.passcode,
            settings: {
              ...Z.HB.settings,
              byKey: {
                ...Z.HB.settings.byKey,
                theme: n,
                shouldUseSystemTheme: r,
                animationLevel: o,
                language: s,
              },
            },
            ...(t && {
              byTabId: Object.values(e.byTabId).reduce((e, t) => {
                let { id: n, isMasterTab: r } = t;
                return (e[n] = { ...Z.Je, isMasterTab: r, id: n }), e;
              }, {}),
            }),
          };
        }
        function re(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), o = 2;
            o < n;
            o++
          )
            r[o - 2] = arguments[o];
          let [a = (0, s.g0)()] = r;
          return (0, d.w)(
            e,
            { payment: { ...(0, i.nTw)(e, a).payment, ...t } },
            a
          );
        }
        function oe(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), o = 2;
            o < n;
            o++
          )
            r[o - 2] = arguments[o];
          let [a = (0, s.g0)()] = r;
          return re(e, { shippingOptions: t }, a);
        }
        function se(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), o = 2;
            o < n;
            o++
          )
            r[o - 2] = arguments[o];
          let [a = (0, s.g0)()] = r;
          return re(e, { requestId: t }, a);
        }
        function ae(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), o = 2;
            o < n;
            o++
          )
            r[o - 2] = arguments[o];
          let [a = (0, s.g0)()] = r;
          return re(e, { step: t }, a);
        }
        function ie(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), o = 2;
            o < n;
            o++
          )
            r[o - 2] = arguments[o];
          let [a = (0, s.g0)()] = r;
          const {
            title: i,
            text: d,
            amount: c,
            currency: u,
            isTest: l,
            photo: f,
            isRecurring: h,
            termsUrl: m,
            maxTipAmount: p,
            suggestedTipAmounts: g,
          } = t;
          return re(
            e,
            {
              invoice: {
                mediaType: "invoice",
                title: i,
                text: d,
                photo: f,
                amount: c,
                currency: u,
                isTest: l,
                isRecurring: h,
                termsUrl: m,
                maxTipAmount: p,
                suggestedTipAmounts: g,
              },
            },
            a
          );
        }
        function de(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), o = 2;
            o < n;
            o++
          )
            r[o - 2] = arguments[o];
          let [a = (0, s.g0)()] = r;
          return re(e, { stripeCredentials: { ...t } }, a);
        }
        function ce(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), o = 2;
            o < n;
            o++
          )
            r[o - 2] = arguments[o];
          let [a = (0, s.g0)()] = r;
          return re(e, { smartGlocalCredentials: { ...t } }, a);
        }
        function ue(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), o = 2;
            o < n;
            o++
          )
            r[o - 2] = arguments[o];
          let [a = (0, s.g0)()] = r;
          return re(e, { ...t }, a);
        }
        function le(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), o = 2;
            o < n;
            o++
          )
            r[o - 2] = arguments[o];
          let [a = (0, s.g0)()] = r;
          return re(e, { confirmPaymentUrl: t }, a);
        }
        function fe(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), o = 2;
            o < n;
            o++
          )
            r[o - 2] = arguments[o];
          let [a = (0, s.g0)()] = r;
          return re(e, t ? { receipt: t } : { receipt: void 0 }, a);
        }
        function he(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
            r < t;
            r++
          )
            n[r - 1] = arguments[r];
          let [o = (0, s.g0)()] = n;
          return (0, d.w)(
            e,
            { payment: {}, isStarPaymentModalOpen: void 0 },
            o
          );
        }
        function me(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
            r < t;
            r++
          )
            n[r - 1] = arguments[r];
          let [o = (0, s.g0)()] = n;
          return (
            (e = re(
              e,
              { isPaymentModalOpen: void 0, isExtendedMedia: void 0 },
              o
            )),
            (0, d.w)(e, { isStarPaymentModalOpen: void 0 }, o)
          );
        }
        function pe(e, t) {
          return { ...e, stars: { ...e.stars, balance: t } };
        }
        function ge(e, t, n, r) {
          const o = e.stars?.history;
          if (!o) return e;
          const s = {
            transactions: (o[t]?.transactions || []).concat(n),
            nextOffset: r,
          };
          return { ...e, stars: { ...e.stars, history: { ...o, [t]: s } } };
        }
        function ye(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), o = 2;
            o < n;
            o++
          )
            r[o - 2] = arguments[o];
          let [a = (0, s.g0)()] = r;
          return (0, d.w)(e, { starsTransactionModal: { transaction: t } }, a);
        }
        function be(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), o = 2;
            o < n;
            o++
          )
            r[o - 2] = arguments[o];
          let [a = (0, s.g0)()] = r;
          return ye(
            e,
            {
              id: t.transactionId,
              peer: t.peer,
              stars: t.totalAmount,
              date: t.date,
              title: t.title,
              description: t.text,
              photo: t.photo,
              extendedMedia: t.media,
              messageId: t.messageId,
            },
            a
          );
        }
        function ve(e, t, n) {
          for (
            var r = arguments.length, o = new Array(r > 3 ? r - 3 : 0), a = 3;
            a < r;
            a++
          )
            o[a - 3] = arguments[a];
          let [c = (0, s.g0)()] = o;
          return (0, d.w)(
            e,
            {
              statistics: {
                byChatId: { ...(0, i.nTw)(e, c).statistics.byChatId, [t]: n },
              },
            },
            c
          );
        }
        function we(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), o = 2;
            o < n;
            o++
          )
            r[o - 2] = arguments[o];
          let [a = (0, s.g0)()] = r;
          return (0, d.w)(
            e,
            {
              statistics: {
                ...(0, i.nTw)(e, a).statistics,
                currentMessage: t,
                currentStory: void 0,
              },
            },
            a
          );
        }
        function Ie(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), o = 2;
            o < n;
            o++
          )
            r[o - 2] = arguments[o];
          let [a = (0, s.g0)()] = r;
          return (0, d.w)(
            e,
            {
              statistics: {
                ...(0, i.nTw)(e, a).statistics,
                currentStory: t,
                currentMessage: void 0,
              },
            },
            a
          );
        }
        function Ae(e, t, n, r) {
          for (
            var o = arguments.length, a = new Array(o > 4 ? o - 4 : 0), c = 4;
            c < o;
            c++
          )
            a[c - 4] = arguments[c];
          let [u = (0, s.g0)()] = a;
          const { statistics: l } = (0, i.nTw)(e, u);
          return (0, d.w)(
            e,
            {
              statistics: {
                ...l,
                byChatId: {
                  ...l.byChatId,
                  [t]: { ...(l.byChatId[t] || {}), [n]: r },
                },
              },
            },
            u
          );
        }
        function Ce(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), o = 2;
            o < n;
            o++
          )
            r[o - 2] = arguments[o];
          let [a = (0, s.g0)()] = r;
          return (0, d.w)(
            e,
            { statistics: { ...(0, i.nTw)(e, a).statistics, monetization: t } },
            a
          );
        }
        var Se = n(80140),
          Ee = n(90709);
        function ke(e, t, n) {
          return (0, Ee.L8)(t) ? C(e, t, n) : (0, r.wi)(e, t, n);
        }
        function Te(e, t, n) {
          return (0, Ee.L8)(t) ? F(e, t, n) : (0, r.lt)(e, t, n);
        }
        function Pe(e, t, n) {
          const r = (0, i.IVq)(e, t);
          return r ? Me(e, t, { ...r, isLoading: n }) : e;
        }
        function Me(e, t, n) {
          return n
            ? { ...e, profilePhotosById: { ...e.profilePhotosById, [t]: n } }
            : { ...e, profilePhotosById: (0, a.cJ)(e.profilePhotosById, [t]) };
        }
        function Le(e, t, n) {
          const r = (0, i.IVq)(e, t),
            {
              newPhotos: o,
              count: s,
              nextOffset: d,
              fullInfo: c,
              shouldInvalidateCache: u,
            } = n,
            l = r,
            f = c.profilePhoto,
            h = "fallbackPhoto" in c ? c.fallbackPhoto : void 0,
            m = "personalPhoto" in c ? c.personalPhoto : void 0;
          if (!l || u)
            return (
              f && f.id !== o[0]?.id && o.unshift(f),
              m && m.id !== o[0]?.id && o.unshift(m),
              h && o.push(h),
              Me(e, t, {
                fallbackPhoto: h,
                personalPhoto: m,
                photos: o,
                count: s,
                nextOffset: d,
                isLoading: !1,
              })
            );
          const p =
              l.photos[l.photos.length - 1].id === h?.id
                ? l.photos.slice(0, -1)
                : l.photos,
            g = (0, a.Xd)([...p, ...o, h].filter(Boolean), "id");
          return Me(e, t, {
            fallbackPhoto: h,
            personalPhoto: m,
            photos: g,
            count: s,
            nextOffset: d,
            isLoading: !1,
          });
        }
        function Ne(e, t, n, o) {
          const s = (0, i.PVB)(e, t),
            a = (0, i.IVq)(e, t);
          if (!s || !a) return e;
          const d = "title" in s && (0, Ee.WX)(s),
            c = (0, i.vGo)(e, t),
            u = (0, i.AWZ)(e, t),
            l = s.avatarPhotoId === n && (!d || o),
            f = l ? a.photos[1] : void 0;
          if (
            (c &&
              (e = F(e, t, {
                fallbackPhoto:
                  c.fallbackPhoto?.id === n ? void 0 : c.fallbackPhoto,
                personalPhoto:
                  c.personalPhoto?.id === n ? void 0 : c.personalPhoto,
                profilePhoto: c.profilePhoto?.id === n ? f : c.profilePhoto,
              })),
            u)
          ) {
            const o = u.profilePhoto?.id === n ? f : u.profilePhoto;
            e = (0, r.lt)(e, t, { profilePhoto: o });
          }
          const h = l ? f?.id : s.avatarPhotoId,
            m =
              l && "title" in s && (0, Ee.WX)(s)
                ? a.photos.filter((e) => e.id !== n)
                : a.photos.slice();
          return Me(
            (e = ke(e, t, { avatarPhotoId: h })),
            t,
            h ? { ...a, photos: m, count: a.count - 1 } : void 0
          );
        }
        function Fe(e, t) {
          const n = Object.entries(t).reduce((e, t) => {
            let [n, r] = t;
            return (
              e[n]
                ? ((e[n].byId = { ...e[n].byId, ...r.byId }),
                  (e[n].orderedIds = (0, a.Am)(
                    r.orderedIds.concat(e[n].orderedIds)
                  )),
                  (e[n].profileIds = (0, a.Am)(
                    r.profileIds.concat(e[n].profileIds)
                  ).sort((e, t) => t - e)),
                  (e[n].lastUpdatedAt = r.lastUpdatedAt),
                  (e[n].lastReadId = r.lastReadId))
                : (e[n] = r),
              e
            );
          }, e.stories.byPeerId);
          return Je(
            (e = { ...e, stories: { ...e.stories, byPeerId: n } }),
            Object.keys(t)
          );
        }
        function Be(e, t, n, r, o) {
          const {
              byId: s,
              orderedIds: d,
              profileIds: c,
              archiveIds: u,
              pinnedIds: l,
            } = e.stories.byPeerId[t] || {},
            f = Object.keys(n)
              .filter((e) => "isDeleted" in n[Number(e)])
              .map(Number),
            h = { ...s, ...n };
          let m = [...(d || [])],
            p = [...(u || [])];
          const g = (0, a.Am)(
            [...(c || [])].concat(
              Object.values(n).reduce(
                (e, t) => (
                  "isInProfile" in t && t.isInProfile && e.push(t.id), e
                ),
                []
              )
            )
          )
            .sort((e, t) => t - e)
            .filter((e) => !f.includes(e));
          return (
            (m = (0, a.Am)(
              Object.entries(n).reduce((e, t) => {
                let [n, r] = t;
                return (
                  "expireDate" in r &&
                    r.expireDate &&
                    r.expireDate > (0, Se.Fm)() &&
                    e.push(Number(n)),
                  e
                );
              }, m)
            ).filter((e) => !f.includes(e))),
            o &&
              (0, i.nZ4)(e, t) &&
              (p = (0, a.Am)(p.concat(Object.keys(n).map(Number)))
                .sort((e, t) => t - e)
                .filter((e) => !f.includes(e))),
            (e = {
              ...e,
              stories: {
                ...e.stories,
                byPeerId: {
                  ...e.stories.byPeerId,
                  [t]: {
                    ...e.stories.byPeerId[t],
                    byId: h,
                    orderedIds: m,
                    profileIds: g,
                    pinnedIds: l || r,
                    ...(o && { archiveIds: p }),
                  },
                },
              },
            }),
            ((0, i.nZ4)(e, t) ||
              (0, i.mBe)(e, t)?.isContact ||
              t === e.appConfig?.storyChangelogUserId) &&
              ((e = (function (e, t) {
                const n = e.stories.byPeerId[t],
                  r = n.orderedIds.reduce((e, t) => {
                    const { date: r } = n.byId[t] || {};
                    return r && (!e || e < r) && (e = r), e;
                  }, void 0);
                return {
                  ...e,
                  stories: {
                    ...e.stories,
                    byPeerId: {
                      ...e.stories.byPeerId,
                      [t]: { ...n, lastUpdatedAt: r },
                    },
                  },
                };
              })(e, t)),
              (e = Je(e, [t]))),
            e
          );
        }
        function xe(e, t, n, r) {
          return {
            ...e,
            stories: {
              ...e.stories,
              byPeerId: {
                ...e.stories.byPeerId,
                [t]: {
                  ...e.stories.byPeerId[t],
                  [r ? "isArchiveFullyLoaded" : "isFullyLoaded"]: n,
                },
              },
            },
          };
        }
        function Oe(e, t, n) {
          const { orderedIds: r } = (0, i._bp)(e, t) || {};
          return r
            ? (n >= r[r.length - 1] && (e = ke(e, t, { hasUnreadStories: !1 })),
              {
                ...e,
                stories: {
                  ...e.stories,
                  byPeerId: {
                    ...e.stories.byPeerId,
                    [t]: { ...e.stories.byPeerId[t], lastReadId: n },
                  },
                },
              })
            : e;
        }
        function Re(e, t, n) {
          for (
            var r = arguments.length, o = new Array(r > 3 ? r - 3 : 0), a = 3;
            a < r;
            a++
          )
            o[a - 3] = arguments[a];
          let [c = (0, s.g0)()] = o;
          const { orderedIds: u } = (0, i._bp)(e, t) || {};
          if (!u || !u.includes(n)) return e;
          const { storyViewer: l } = (0, i.nTw)(e, c);
          return (0, d.w)(
            e,
            {
              storyViewer: {
                ...l,
                lastViewedByPeerIds: { ...l.lastViewedByPeerIds, [t]: n },
              },
            },
            c
          );
        }
        function De(e, t) {
          return (
            Object.entries(t).forEach((t) => {
              let [n, { lastReadId: r, orderedIds: o }] = t;
              const s = (0, i.PVB)(e, n);
              s &&
                (e = ke(e, n, {
                  hasStories: !0,
                  hasUnreadStories:
                    !r || Boolean(r && r < (s.maxStoryId || o[o.length - 1])),
                }));
            }),
            e
          );
        }
        function Ue(e, t, n, r) {
          for (
            var o = arguments.length, a = new Array(o > 4 ? o - 4 : 0), c = 4;
            c < o;
            c++
          )
            a[c - 4] = arguments[c];
          let [u = (0, s.g0)()] = a;
          const l = (0, i.nTw)(e, u),
            { viewModal: f } = l.storyViewer,
            h = f?.storyId === t && f.views ? [...f.views, ...n] : n;
          return (
            (e = _e(e, !1, u)),
            (0, d.w)(
              e,
              {
                storyViewer: {
                  ...l.storyViewer,
                  viewModal: {
                    ...f,
                    storyId: t,
                    views: h,
                    nextOffset: r,
                    isLoading: !1,
                  },
                },
              },
              u
            )
          );
        }
        function _e(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), o = 2;
            o < n;
            o++
          )
            r[o - 2] = arguments[o];
          let [a = (0, s.g0)()] = r;
          const c = (0, i.nTw)(e, a),
            { viewModal: u } = c.storyViewer;
          return u
            ? (0, d.w)(
                e,
                {
                  storyViewer: {
                    ...c.storyViewer,
                    viewModal: { ...u, isLoading: t },
                  },
                },
                a
              )
            : e;
        }
        function $e(e, t, n) {
          const {
              orderedIds: r,
              profileIds: o,
              lastReadId: s,
              byId: a,
            } = (0, i._bp)(e, t) || { orderedIds: [], profileIds: [] },
            d = r.filter((e) => e !== n),
            c = o.filter((e) => e !== n),
            u = d.length ? r[r.length - 1] : void 0,
            l = r[r.indexOf(n) - 1],
            f = s === n ? l : s,
            h = { ...a, [n]: { id: n, peerId: t, isDeleted: !0 } },
            m = u ? h[u]?.date : void 0,
            p = Boolean(d.length);
          return (
            (e = (function (e, t, n) {
              return {
                ...e,
                stories: {
                  ...e.stories,
                  byPeerId: { ...e.stories.byPeerId, [t]: n },
                },
              };
            })(
              (e = ke(e, t, {
                hasStories: p,
                hasUnreadStories: Boolean(p && s && u && s < u),
              })),
              t,
              {
                byId: h,
                orderedIds: d,
                profileIds: c,
                lastUpdatedAt: m,
                lastReadId: f,
              }
            )),
            Object.values(e.byTabId).forEach((r) => {
              r.storyViewer.lastViewedByPeerIds?.[t] === n &&
                (e = Re(e, t, l, r.id));
            }),
            p ||
              (e = {
                ...e,
                stories: {
                  ...e.stories,
                  orderedPeerIds: {
                    active: e.stories.orderedPeerIds.active.filter(
                      (e) => e !== t
                    ),
                    archived: e.stories.orderedPeerIds.archived.filter(
                      (e) => e !== t
                    ),
                  },
                },
              }),
            e
          );
        }
        function je(e, t, n, r) {
          const o = (0, i.Msb)(e, t, n);
          if (!o || !("content" in o)) return e;
          const { views: s } = o,
            a = s?.reactionsCount || 0,
            d = s?.reactions?.some((e) => void 0 !== e.chosenOrder),
            c = (0, Ee.AK)(s?.reactions || [], [r].filter(Boolean)),
            u = a + (r ? (d ? 0 : 1) : -1);
          return He(e, t, n, {
            sentReaction: r,
            views: { ...s, reactionsCount: u, reactions: c },
          });
        }
        function He(e, t, n, r) {
          const o = (0, i._bp)(e, t) || {
            byId: {},
            orderedIds: [],
            profileIds: [],
            archiveIds: [],
          };
          return {
            ...e,
            stories: {
              ...e.stories,
              byPeerId: {
                ...e.stories.byPeerId,
                [t]: { ...o, byId: { ...o.byId, [n]: { ...o.byId[n], ...r } } },
              },
            },
          };
        }
        function Ve(e, t, n, r) {
          const o = (0, i.Msb)(e, t, n);
          if (!o || !("content" in o)) return e;
          const { views: s } = o;
          return He(e, t, n, { views: { ...s, ...r } });
        }
        function ze(e, t, n, r) {
          const o = (0, i._bp)(e, t) || {
              byId: {},
              orderedIds: [],
              profileIds: [],
              archiveIds: [],
            },
            s = r
              ? (0, a.Am)(o.profileIds.concat(n)).sort((e, t) => t - e)
              : o.profileIds.filter((e) => n !== e);
          return {
            ...e,
            stories: {
              ...e.stories,
              byPeerId: { ...e.stories.byPeerId, [t]: { ...o, profileIds: s } },
            },
          };
        }
        function We(e, t, n) {
          const r = (0, i.PVB)(e, t);
          return r
            ? r.areStoriesHidden === n
              ? e
              : Je((e = ke(e, t, { areStoriesHidden: n })), [t])
            : e;
        }
        function Je(e, t) {
          const {
              currentUserId: n,
              stories: { byPeerId: r, orderedPeerIds: o },
            } = e,
            s = o.active
              .concat(o.archived)
              .concat(t)
              .reduce(
                (t, n) => {
                  if (!r[n]?.orderedIds?.length) return t;
                  const o = (0, i.PVB)(e, n);
                  return (
                    o?.areStoriesHidden ? t.archived.push(n) : t.active.push(n),
                    t
                  );
                },
                { active: [], archived: [] }
              );
          function d(t, o) {
            const s = (0, i.PVB)(e, t),
              d = (0, i.PVB)(e, o),
              c = (0, a.zV)(n === t, n === o);
            if (c) return c;
            const {
                lastUpdatedAt: u = 0,
                orderedIds: l,
                lastReadId: f = 0,
              } = r[t] || {},
              h = f < l?.[l.length - 1],
              {
                lastUpdatedAt: m = 0,
                orderedIds: p,
                lastReadId: g = 0,
              } = r[o] || {},
              y = g < p?.[p.length - 1],
              b = (0, a.zV)(h, y);
            if (b) return b;
            const v = (0, a.zV)("isPremium" in s, "isPremium" in d);
            if (v) return v;
            return (0, a.zV)((0, Ee.L8)(t), (0, Ee.L8)(o)) || (0, a.zV)(u, m);
          }
          return (
            (s.archived = (0, a.Am)(s.archived)
              .filter((e) => r[e]?.orderedIds?.length)
              .sort(d)),
            (s.active = (0, a.Am)(s.active)
              .filter((e) => r[e]?.orderedIds?.length)
              .sort(d)),
            { ...e, stories: { ...e.stories, orderedPeerIds: s } }
          );
        }
        function Ke(e, t) {
          return { ...e, stories: { ...e.stories, stealthMode: t } };
        }
        var qe = n(95753);
        function Ge(e, t) {
          return { ...e, monetizationInfo: { ...e.monetizationInfo, ...t } };
        }
        function Xe(e, t, n) {
          const r = e.chats.topicsInfoById[t] || {};
          return {
            ...e,
            chats: {
              ...e.chats,
              topicsInfoById: {
                ...e.chats.topicsInfoById,
                [t]: { ...r, ...n },
              },
            },
          };
        }
        function Ye(e, t, n) {
          const r = (0, i.xyP)(e, t)?.listedTopicIds || [];
          return Xe(e, t, { listedTopicIds: (0, a.Am)([...r, ...n]) });
        }
        function Qe(e, t, n, r) {
          const s = (0, i.pSx)(e, t),
            d = (0, a.dU)(r, "id");
          return (
            (e = Xe(e, t, { topicsById: { ...s, ...d }, totalCount: n })),
            r.forEach((n) => {
              (e = (0, o.e4)(e, t, n.id, { firstMessageId: n.id })),
                (e = (0, o.eA)(e, t, n.id, {
                  lastMessageId: n.lastMessageId,
                  threadId: n.id,
                  chatId: t,
                }));
            }),
            e
          );
        }
        function Ze(e, t, n, r) {
          if (!(0, i.hds)(e, t)) return e;
          const s = (0, i.S0q)(e, t, n),
            a = (0, i.pSx)(e, t),
            d = { ...s, ...r };
          return d.id
            ? ((e = Xe(e, t, { topicsById: { ...a, [n]: d } })),
              (e = (0, o.e4)(e, t, d.id, { firstMessageId: d.id })),
              (e = (0, o.eA)(e, t, d.id, {
                lastMessageId: d.lastMessageId,
                threadId: d.id,
                chatId: t,
              })))
            : e;
        }
        function et(e, t, n) {
          const r = (0, i.pSx)(e, t);
          return r ? (e = Xe(e, t, { topicsById: (0, a.cJ)(r, [n]) })) : e;
        }
        function tt(e, t, n) {
          return Xe(e, t, { orderedPinnedTopicIds: n });
        }
      },
      26149: (e, t, n) => {
        n.d(t, {
          AH: () => k,
          E0: () => L,
          EK: () => _,
          Eg: () => C,
          Ff: () => R,
          It: () => $,
          Iw: () => K,
          Kc: () => w,
          MN: () => m,
          Ng: () => O,
          QN: () => S,
          T4: () => z,
          Ww: () => W,
          XA: () => T,
          Xb: () => j,
          d4: () => P,
          e4: () => g,
          eA: () => x,
          ew: () => v,
          fg: () => N,
          gz: () => B,
          hj: () => X,
          iR: () => J,
          kV: () => U,
          l3: () => H,
          mR: () => q,
          n4: () => b,
          o4: () => I,
          qK: () => M,
          r3: () => A,
          s3: () => F,
          tM: () => D,
          v: () => E,
          xA: () => G,
          yr: () => V,
        });
        var r = n(23174),
          o = n(31481),
          s = n(22986),
          a = n(14487),
          i = n(87894),
          d = n(60343),
          c = n(90709),
          u = n(29807),
          l = n(68344),
          f = n(32989),
          h = n(95753);
        function m(e, t) {
          let n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : r.l3,
            s =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : "thread",
            i = arguments.length > 4 ? arguments[4] : void 0,
            d = arguments.length > 5 ? arguments[5] : void 0;
          for (
            var c = arguments.length, l = new Array(c > 6 ? c - 6 : 0), h = 6;
            h < c;
            h++
          )
            l[h - 6] = arguments[h];
          let [m = (0, a.g0)()] = l;
          const { messageLists: p } = (0, u.nTw)(e, m);
          let g = p;
          if (i || (o.W75 && !o.fng))
            g = t ? [{ chatId: t, threadId: n, type: s }] : [];
          else if (t) {
            const r = p[p.length - 1];
            if (r?.chatId === t && r.threadId === n && r.type === s) return e;
            if (r && (r.chatId === o.Xab || d))
              g = [...p.slice(0, -1), { chatId: t, threadId: n, type: s }];
            else {
              const e = p[p.length - 2];
              g =
                e?.chatId === t && e.threadId === n && e.type === s
                  ? p.slice(0, -1)
                  : [...p, { chatId: t, threadId: n, type: s }];
            }
          } else g = p.slice(0, -1);
          return (0, f.w)(e, { messageLists: g }, m);
        }
        function p(e, t, n) {
          return y(e, t, { byId: n });
        }
        function g(e, t, n, r) {
          if (!r)
            return y(e, t, {
              threadsById: (0, i.cJ)(e.messages.byChatId[t]?.threadsById, [n]),
            });
          const o = e.messages.byChatId[t];
          return y(e, t, {
            threadsById: {
              ...o?.threadsById,
              [n]: { ...o?.threadsById[n], ...r },
            },
          });
        }
        function y(e, t, n) {
          const r = e.messages.byChatId[t] || { byId: {}, threadsById: {} };
          return {
            ...e,
            messages: {
              ...e.messages,
              byChatId: { ...e.messages.byChatId, [t]: { ...r, ...n } },
            },
          };
        }
        function b(e, t, n, r, o) {
          for (
            var s = arguments.length, i = new Array(s > 5 ? s - 5 : 0), d = 5;
            d < s;
            d++
          )
            i[d - 5] = arguments[d];
          let [c = (0, a.g0)()] = i;
          return (
            "viewportIds" === r && (e = v(e, t, n, "lastViewportIds", o)),
            (function (e, t, n, r) {
              for (
                var o = arguments.length,
                  s = new Array(o > 4 ? o - 4 : 0),
                  i = 4;
                i < o;
                i++
              )
                s[i - 4] = arguments[i];
              let [d = (0, a.g0)()] = s;
              const c = (0, u.nTw)(e, d),
                l = c.tabThreads[t]?.[n] || {};
              return (0, f.w)(
                e,
                {
                  tabThreads: {
                    ...c.tabThreads,
                    [t]: { ...c.tabThreads[t], [n]: { ...l, ...r } },
                  },
                },
                d
              );
            })(e, t, n, { [r]: o }, c)
          );
        }
        function v(e, t, n, r, o) {
          return g(e, t, n, { [r]: o });
        }
        function w(e, t) {
          const n = t.reduce(
            (e, t) => (
              e[t.chatId] || (e[t.chatId] = {}), (e[t.chatId][t.id] = t), e
            ),
            {}
          );
          return (
            Object.keys(n).forEach((t) => {
              e = I(e, t, n[t]);
            }),
            e
          );
        }
        function I(e, t, n) {
          const r = (0, u.zeq)(e, t);
          return r && Object.keys(n).every((e) => Boolean(r[Number(e)]))
            ? e
            : p(e, t, { ...n, ...r });
        }
        function A(e, t, n, r) {
          let o =
            arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
          const a = (0, u.zeq)(e, t) || {},
            d = a[n];
          if (o && d) {
            const t = Object.keys(r);
            if ((0, s.T)((0, i.Up)(d, t), r)) return e;
          }
          d &&
            !1 === r.isMediaUnread &&
            (0, c.G5)(d) &&
            (d.content.voice
              ? (r.content = {
                  ...r.content,
                  voice: void 0,
                  isExpiredVoice: !0,
                })
              : d.content.video?.isRound &&
                (r.content = {
                  ...r.content,
                  video: void 0,
                  isExpiredRoundVideo: !0,
                }));
          const l = { ...d, ...r };
          return l.id ? p(e, t, { ...a, [n]: l }) : e;
        }
        function C(e, t, n, r) {
          const o = { ...(0, u.Jl6)(e, t, n), ...r };
          return o.id ? R(e, t, { [n]: o }) : e;
        }
        function S(e, t, n) {
          const r = { ...(0, u.N1i)(e, t), ...n };
          return r.id ? D(e, { [t]: r }) : e;
        }
        function E(e, t) {
          const n = e.quickReplies.messagesById,
            r = (0, i.cJ)(n, t);
          return { ...e, quickReplies: { ...e.quickReplies, messagesById: r } };
        }
        function k(e, t, n) {
          const o = (0, u.zeq)(e, t);
          if (!o) return e;
          (0, c.Ld)(n);
          const s = new Map();
          s.set(r.l3, n);
          const a = [];
          n.forEach((n) => {
            const i = o[n];
            if (!i) return;
            (0, c.iZ)(i) && a.push(n);
            const d = (0, u.L_2)(e, i);
            if (!d || d === r.l3) return;
            const l = s.get(d) || [];
            l.push(n), s.set(d, l), (e = (0, h.gt)(e, t, n));
          });
          const f = Object.values((0, i._E)(o, n)).filter((e) => {
            let { forwardInfo: t } = e;
            return t?.isLinkedChannelPost;
          });
          s.forEach((r, o) => {
            const s = (0, u.Vw0)(e, t, o);
            let f = (0, u.gCU)(e, t, o),
              h = (0, u.fcC)(e, t, o),
              m = (0, u.JiE)(e, t, o),
              p = s?.messagesCount;
            f && (f = (0, i.lK)(f, r)),
              m && (m = m.map((e) => (0, i.lK)(e, r))),
              h && (h = (0, i.lK)(h, (0, c.vp)(r)));
            const g = r.filter((e) => !(0, d.iL)(e)).length;
            void 0 !== p && (p -= g),
              Object.values(e.byTabId).forEach((r) => {
                let { id: s } = r;
                const d = (0, u.nTw)(e, s);
                Object.entries(d.activeDownloads)
                  .filter((e) => {
                    let [, { originChatId: n, originMessageId: r }] = e;
                    return n === t && r;
                  })
                  .forEach((t) => {
                    let [r, o] = t;
                    n.includes(o.originMessageId) && (e = K(e, [r], s));
                  }),
                  a.forEach((n) => {
                    e = (0, l.cs)(e, t, o, n, s);
                  });
                const c = (0, u.rA3)(e, t, o, s);
                if (!c) return;
                const f = (0, i.lK)(c, n);
                e = b(e, t, o, "viewportIds", 0 === f.length ? void 0 : f, s);
              }),
              (e = v(e, t, o, "listedIds", f)),
              (e = v(e, t, o, "outlyingLists", m)),
              (e = v(e, t, o, "pinnedIds", h)),
              s && void 0 !== p && (e = x(e, t, o, { messagesCount: p }));
          }),
            f.length &&
              Object.values(e.byTabId).forEach((n) => {
                let { id: r } = n;
                const o = (0, u.Xf0)(e, r),
                  s = o && o.chatId === t && "thread" === o.type,
                  a = o?.threadId;
                f.forEach((n) => {
                  const { fromChatId: o, fromMessageId: i } = n.forwardInfo,
                    d = (0, u.O5q)(e, o, i);
                  s &&
                    a === n.id &&
                    (e = m(e, t, void 0, void 0, void 0, void 0, r)),
                    d && (e = g(e, o, i, void 0));
                });
              });
          const y = (0, i.cJ)(o, n);
          return (e = p(e, t, y));
        }
        function T(e, t, n) {
          const o = (0, u.yFI)(e, t);
          if (!o) return e;
          const s = (0, i.cJ)(o, n);
          let a = (0, u.K3w)(e, t, r.l3);
          return (
            a &&
              (n.forEach((e) => {
                a.includes(e) && (a = a.filter((t) => t !== e));
              }),
              (e = v(e, t, r.l3, "scheduledIds", a)),
              Object.entries(e.messages.byChatId[t].threadsById).forEach(
                (r) => {
                  let [o, s] = r;
                  if (s.scheduledIds) {
                    const r = s.scheduledIds.filter((e) => !n.includes(e));
                    e = v(e, t, Number(o), "scheduledIds", r);
                  }
                }
              )),
            (e = {
              ...e,
              scheduledMessages: {
                byChatId: { ...e.scheduledMessages.byChatId, [t]: { byId: s } },
              },
            })
          );
        }
        function P(e, t, n, r) {
          const o = (0, u.gCU)(e, t, n),
            s = o?.length ? r.filter((e) => !o.includes(e)) : r;
          return o && !s.length
            ? e
            : v(e, t, n, "listedIds", (0, c.Ld)([...(o || []), ...s]));
        }
        function M(e, t, n, r) {
          const o = (0, u.JiE)(e, t, n);
          return o
            ? v(
                e,
                t,
                n,
                "outlyingLists",
                o.filter((e) => e !== r)
              )
            : e;
        }
        function L(e, t, n, r) {
          if (!r.length) return e;
          const o = (0, u.JiE)(e, t, n);
          return v(e, t, n, "outlyingLists", (0, c.cR)(o || [], r));
        }
        function N(e, t, n, r) {
          for (
            var s = arguments.length, i = new Array(s > 4 ? s - 4 : 0), d = 4;
            d < s;
            d++
          )
            i[d - 4] = arguments[d];
          let [l = (0, a.g0)()] = i;
          const f = (0, u.rA3)(e, t, n, l) || [];
          return f.includes(r)
            ? e
            : b(
                e,
                t,
                n,
                "viewportIds",
                (0, c.Ld)([...(f.length < o.IRc ? f : f.slice(-o.yo2 / 2)), r]),
                l
              );
        }
        function F(e, t, n, r) {
          for (
            var o = arguments.length, s = new Array(o > 4 ? o - 4 : 0), d = 4;
            d < o;
            d++
          )
            s[d - 4] = arguments[d];
          let [l = (0, a.g0)()] = s;
          const f = (0, u.rA3)(e, t, n, l) || [],
            h = (0, c.Ld)(r);
          return b(e, t, n, "viewportIds", (0, i.k)(f, h) ? f : h, l);
        }
        function B(e, t, n, r) {
          const o = (0, u.fcC)(e, t, n) || [],
            s = (0, c.vp)(r);
          return v(e, t, n, "pinnedIds", (0, i.k)(o, s) ? o : s);
        }
        function x(e, t, n, r, o) {
          const s = { ...(0, u.Vw0)(e, t, n), ...r };
          if (!o && !s.isCommentsInfo) {
            const t = (0, i.Up)(s, [
              "messagesCount",
              "lastMessageId",
              "lastReadInboxMessageId",
            ]);
            s.fromChannelId &&
              s.fromMessageId &&
              (e = x(e, s.fromChannelId, s.fromMessageId, t, !0));
          }
          return v(e, t, n, "threadInfo", s);
        }
        function O(e, t) {
          return (
            t.forEach((t) => {
              e = x(
                e,
                t.isCommentsInfo ? t.originChannelId : t.chatId,
                t.isCommentsInfo ? t.originMessageId : t.threadId,
                t
              );
            }),
            e
          );
        }
        function R(e, t, n) {
          const r = e.scheduledMessages.byChatId[t] || { byId: {}, hash: 0 };
          return {
            ...e,
            scheduledMessages: {
              byChatId: {
                ...e.scheduledMessages.byChatId,
                [t]: { ...r, byId: { ...r.byId, ...n } },
              },
            },
          };
        }
        function D(e, t) {
          return {
            ...e,
            quickReplies: {
              ...e.quickReplies,
              messagesById: { ...e.quickReplies.messagesById, ...t },
            },
          };
        }
        function U(e) {
          let {
            global: t,
            chatId: n,
            messageId: o,
            threadId: s = r.l3,
            noHighlight: i = !1,
            isResizingContainer: d = !1,
            quote: c,
            scrollTargetPosition: l,
          } = e;
          for (
            var h = arguments.length, m = new Array(h > 1 ? h - 1 : 0), p = 1;
            p < h;
            p++
          )
            m[p - 1] = arguments[p];
          let [g = (0, a.g0)()] = m;
          return (0, f.w)(
            t,
            {
              focusedMessage: {
                ...(0, u.nTw)(t, g).focusedMessage,
                chatId: n,
                threadId: s,
                messageId: o,
                noHighlight: i,
                isResizingContainer: d,
                quote: c,
                scrollTargetPosition: l,
              },
            },
            g
          );
        }
        function _(e, t, n) {
          return {
            ...e,
            messages: {
              ...e.messages,
              sponsoredByChatId: { ...e.messages.sponsoredByChatId, [t]: n },
            },
          };
        }
        function $(e, t) {
          const n = e.messages.sponsoredByChatId;
          return n[t]
            ? {
                ...e,
                messages: {
                  ...e.messages,
                  sponsoredByChatId: (0, i.cJ)(n, [t]),
                },
              }
            : e;
        }
        function j(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), o = 2;
            o < n;
            o++
          )
            r[o - 2] = arguments[o];
          let [s = (0, a.g0)()] = r;
          return (0, f.w)(
            e,
            {
              focusedMessage: {
                ...(0, u.nTw)(e, s).focusedMessage,
                direction: t,
              },
            },
            s
          );
        }
        function H(e, t, n) {
          for (
            var r = arguments.length, o = new Array(r > 3 ? r - 3 : 0), s = 3;
            s < r;
            s++
          )
            o[s - 3] = arguments[s];
          let [i = (0, a.g0)()] = o;
          const d = n ? Array.prototype.concat([], n) : [];
          return (0, f.w)(
            e,
            { selectedMessages: { chatId: t, messageIds: d } },
            i
          );
        }
        function V(e, t, n, r, o, s, d) {
          let c =
            arguments.length > 7 && void 0 !== arguments[7] && arguments[7];
          for (
            var l = arguments.length, h = new Array(l > 8 ? l - 8 : 0), m = 8;
            m < l;
            m++
          )
            h[m - 8] = arguments[m];
          let [p = (0, a.g0)()] = h;
          const { selectedMessages: g } = (0, u.nTw)(e, p);
          s && (d = (0, u.D_S)(e, t, s));
          const y = d || [o];
          if (!g) return H(e, t, y, p);
          const { messageIds: b } = g;
          let v;
          const w = y.filter((e) => !b.includes(e));
          if (w && !w.length) v = b.filter((e) => !y.includes(e));
          else if (c && b.length) {
            const s = (0, u.vRX)(e, t, n, r, p),
              a = s.indexOf(b[b.length - 1]),
              d = s.indexOf(o),
              c = Math.min(a, d),
              l = Math.max(a, d),
              f = s.slice(c, l + 1);
            v = (0, i.Am)([...b, ...f]);
          } else v = [...b, ...w];
          return v.length
            ? (0, f.w)(e, { selectedMessages: { ...g, messageIds: v } }, p)
            : z(e, p);
        }
        function z(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
            r < t;
            r++
          )
            n[r - 1] = arguments[r];
          let [o = (0, a.g0)()] = n;
          return (0, f.w)(e, { selectedMessages: void 0 }, o);
        }
        function W(e, t, n, r, o) {
          const { channelPostId: s, fromChatId: a } = t.forwardInfo || {};
          if (s && a) {
            const t = (0, u.Vw0)(e, n, s);
            t &&
              (e = v(e, n, s, "threadInfo", {
                ...t,
                lastMessageId: r,
                messagesCount: (t.messagesCount || 0) + (o ? -1 : 1),
              }));
          }
          return e;
        }
        function J(e, t, n) {
          for (
            var r = arguments.length, o = new Array(r > 3 ? r - 3 : 0), s = 3;
            s < r;
            s++
          )
            o[s - 3] = arguments[s];
          let [i = (0, a.g0)()] = o;
          const d = (0, u.nTw)(e, i);
          return (0, f.w)(
            e,
            { activeDownloads: { ...d.activeDownloads, [t]: n } },
            i
          );
        }
        function K(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), o = 2;
            o < n;
            o++
          )
            r[o - 2] = arguments[o];
          let [s = (0, a.g0)()] = r;
          const d = (0, u.nTw)(e, s),
            c = (0, i.cJ)(d.activeDownloads, t);
          return (0, f.w)(e, { activeDownloads: c }, s);
        }
        function q(e, t, n) {
          return {
            ...e,
            fileUploads: {
              byMessageKey:
                void 0 !== n
                  ? { ...e.fileUploads.byMessageKey, [t]: { progress: n } }
                  : (0, i.cJ)(e.fileUploads.byMessageKey, [t]),
            },
          };
        }
        function G(e, t) {
          return {
            ...e,
            quickReplies: {
              ...e.quickReplies,
              byId: { ...e.quickReplies.byId, ...t },
            },
          };
        }
        function X(e, t) {
          return {
            ...e,
            quickReplies: {
              ...e.quickReplies,
              byId: (0, i.cJ)(e.quickReplies.byId, [t]),
            },
          };
        }
      },
      68344: (e, t, n) => {
        n.d(t, {
          $R: () => u,
          PK: () => A,
          Qb: () => v,
          Tu: () => g,
          Vm: () => h,
          _5: () => m,
          cs: () => I,
          jU: () => y,
          lw: () => S,
          ol: () => b,
          tX: () => C,
          zd: () => l,
        });
        var r = n(14487),
          o = n(87894),
          s = n(90709),
          a = n(29807),
          i = n(94137),
          d = n(32989);
        function c(e, t, n) {
          for (
            var s = arguments.length, i = new Array(s > 3 ? s - 3 : 0), c = 3;
            c < s;
            c++
          )
            i[c - 3] = arguments[c];
          let [u = (0, r.g0)()] = i;
          const l = (0, a.nTw)(e, u).middleSearch.byChatThreadKey;
          if (!n)
            return (0, d.w)(
              e,
              { middleSearch: { byChatThreadKey: (0, o.cJ)(l, [t]) } },
              u
            );
          const { type: f = "chat", ...h } = n;
          return (0, d.w)(
            e,
            {
              middleSearch: {
                byChatThreadKey: {
                  ...(0, a.nTw)(e, u).middleSearch.byChatThreadKey,
                  [t]: { type: f, ...h },
                },
              },
            },
            u
          );
        }
        function u(e, t, n, o) {
          for (
            var i = arguments.length, d = new Array(i > 4 ? i - 4 : 0), u = 4;
            u < i;
            u++
          )
            d[u - 4] = arguments[u];
          let [l = (0, r.g0)()] = d;
          const f = (0, s.Wi)(t, n),
            h = (0, a.nTw)(e, l).middleSearch.byChatThreadKey[f],
            m = { type: "chat", ...h, ...o };
          return (
            m.isHashtag || (m.type = "chat"),
            !h ||
              (h.type === m.type && h.savedTag === m.savedTag) ||
              (m.results = void 0),
            c(e, f, m, l)
          );
        }
        function l(e, t, n) {
          for (
            var o = arguments.length, a = new Array(o > 3 ? o - 3 : 0), i = 3;
            i < o;
            i++
          )
            a[i - 3] = arguments[i];
          let [d = (0, r.g0)()] = a;
          return c(e, (0, s.Wi)(t, n), { type: "chat" }, d);
        }
        function f(e, t, n, o) {
          for (
            var s = arguments.length, a = new Array(s > 4 ? s - 4 : 0), i = 4;
            i < s;
            i++
          )
            a[i - 4] = arguments[i];
          let [d = (0, r.g0)()] = a;
          return u(e, t, n, { results: o, fetchingQuery: void 0 }, d);
        }
        function h(e, t, n, i) {
          for (
            var d = arguments.length, c = new Array(d > 4 ? d - 4 : 0), u = 4;
            u < d;
            u++
          )
            c[u - 4] = arguments[u];
          let [l = (0, r.g0)()] = c;
          const h = (0, s.Wi)(t, n),
            { results: m } =
              (0, a.nTw)(e, l).middleSearch.byChatThreadKey[h] || {},
            p = m?.query || "";
          if (i.query !== p) return f(e, t, n, i, l);
          const g = m?.foundIds || [],
            {
              query: y,
              foundIds: b,
              totalCount: v,
              nextOffsetId: w,
              nextOffsetPeerId: I,
              nextOffsetRate: A,
            } = i,
            C = (0, o.Am)(Array.prototype.concat(g, b));
          return f(
            e,
            t,
            n,
            {
              query: y,
              foundIds: (0, o.k)(g, C) ? g : C,
              totalCount: v,
              nextOffsetId: w,
              nextOffsetRate: A,
              nextOffsetPeerId: I,
            },
            l
          );
        }
        function m(e, t, n) {
          for (
            var o = arguments.length, a = new Array(o > 3 ? o - 3 : 0), i = 3;
            i < o;
            i++
          )
            a[i - 3] = arguments[i];
          let [d = (0, r.g0)()] = a;
          return c(e, (0, s.Wi)(t, n), void 0, d);
        }
        function p(e, t, n, o) {
          for (
            var i = arguments.length, c = new Array(i > 4 ? i - 4 : 0), u = 4;
            u < i;
            u++
          )
            c[u - 4] = arguments[u];
          let [l = (0, r.g0)()] = c;
          const f = (0, s.Wi)(t, n);
          return (0, d.w)(
            e,
            {
              sharedMediaSearch: {
                byChatThreadKey: {
                  ...(0, a.nTw)(e, l).sharedMediaSearch.byChatThreadKey,
                  [f]: o,
                },
              },
            },
            l
          );
        }
        function g(e, t, n, o) {
          for (
            var i = arguments.length, d = new Array(i > 4 ? i - 4 : 0), c = 4;
            c < i;
            c++
          )
            d[c - 4] = arguments[c];
          let [u = (0, r.g0)()] = d;
          const l = (0, s.Wi)(t, n);
          return p(
            e,
            t,
            n,
            {
              ...(0, a.nTw)(e, u).sharedMediaSearch.byChatThreadKey[l],
              currentType: o,
            },
            u
          );
        }
        function y(e, t, n, i, d, c, u) {
          for (
            var l = arguments.length, f = new Array(l > 7 ? l - 7 : 0), h = 7;
            h < l;
            h++
          )
            f[h - 7] = arguments[h];
          let [m = (0, r.g0)()] = f;
          const g = (0, s.Wi)(t, n),
            { resultsByType: y } =
              (0, a.nTw)(e, m).sharedMediaSearch.byChatThreadKey[g] || {},
            b = y?.[i] ? y[i].foundIds : [],
            v = (0, o.Am)(Array.prototype.concat(b, d)).sort((e, t) => t - e);
          return (function (e, t, n, o, i, d, c) {
            for (
              var u = arguments.length, l = new Array(u > 7 ? u - 7 : 0), f = 7;
              f < u;
              f++
            )
              l[f - 7] = arguments[f];
            let [h = (0, r.g0)()] = l;
            const m = (0, s.Wi)(t, n);
            return p(
              e,
              t,
              n,
              {
                ...(0, a.nTw)(e, h).sharedMediaSearch.byChatThreadKey[m],
                resultsByType: {
                  ...(
                    (0, a.nTw)(e, h).sharedMediaSearch.byChatThreadKey[m] || {}
                  ).resultsByType,
                  [o]: { foundIds: i, totalCount: d, nextOffsetId: c },
                },
              },
              h
            );
          })(e, t, n, i, (0, o.k)(b, v) ? b : v, c, u, m);
        }
        function b(e, t, n) {
          if (!n) return { foundIds: e, loadingState: t };
          const r = (0, o.Am)(Array.prototype.concat(n.foundIds, e)).sort(
            (e, t) => e - t
          );
          (0, o.k)(n.foundIds, e) || (n.foundIds = r);
          const s = {
            areAllItemsLoadedForwards:
              t.areAllItemsLoadedForwards ||
              n.loadingState.areAllItemsLoadedForwards,
            areAllItemsLoadedBackwards:
              t.areAllItemsLoadedBackwards ||
              n.loadingState.areAllItemsLoadedBackwards,
          };
          return (n.loadingState = s), n;
        }
        function v(e, t, n, i, d) {
          for (
            var c = arguments.length, u = new Array(c > 5 ? c - 5 : 0), l = 5;
            l < c;
            l++
          )
            u[l - 5] = arguments[l];
          let [f = (0, r.g0)()] = u;
          const h = (function (e, t) {
            return t.reduce(
              (t, n) => (
                (0, o.h8)(n.foundIds, e.foundIds)
                  ? (e = b(e.foundIds, e.loadingState, n))
                  : t.push(n),
                t
              ),
              []
            );
          })(i, d.segments);
          return (function (e, t, n, o, i) {
            for (
              var d = arguments.length, c = new Array(d > 5 ? d - 5 : 0), u = 5;
              u < d;
              u++
            )
              c[u - 5] = arguments[u];
            let [l = (0, r.g0)()] = c;
            const f = (0, s.Wi)(t, n);
            return E(
              e,
              t,
              n,
              {
                ...(0, a.nTw)(e, l).chatMediaSearch.byChatThreadKey[f],
                currentSegment: o,
                segments: i,
              },
              l
            );
          })(e, t, n, i, h, f);
        }
        function w(e, t) {
          const n = t.foundIds.filter((t) => t !== e);
          return { ...t, foundIds: n };
        }
        function I(e, t, n, o) {
          for (
            var s = arguments.length, a = new Array(s > 4 ? s - 4 : 0), d = 4;
            d < s;
            d++
          )
            a[d - 4] = arguments[d];
          let [c = (0, r.g0)()] = a;
          const u = (0, i.f5)(e, t, n, c);
          if (!u) return e;
          const l = (function (e, t) {
            const n = w(e, t.currentSegment),
              r = t.segments.map((t) => w(e, t));
            return { ...t, currentSegment: n, segments: r };
          })(o, u);
          return E(e, t, n, l, c);
        }
        function A(e, t, n, o) {
          for (
            var a = arguments.length, d = new Array(a > 4 ? a - 4 : 0), c = 4;
            c < a;
            c++
          )
            d[c - 4] = arguments[c];
          let [u = (0, r.g0)()] = d;
          if (!(0, s.iZ)(t)) return e;
          const l = (0, i.f5)(e, n, o, u);
          return l
            ? ((function (e) {
                (e.currentSegment.loadingState.areAllItemsLoadedForwards = !1),
                  e.segments.forEach((e) => {
                    e.loadingState.areAllItemsLoadedForwards = !1;
                  });
              })(l),
              E(e, n, o, l, u))
            : e;
        }
        function C(e, t, n) {
          for (
            var o = arguments.length, s = new Array(o > 3 ? o - 3 : 0), a = 3;
            a < o;
            a++
          )
            s[a - 3] = arguments[a];
          let [i = (0, r.g0)()] = s;
          return E(
            e,
            t,
            n,
            {
              currentSegment: {
                foundIds: [],
                loadingState: {
                  areAllItemsLoadedForwards: !1,
                  areAllItemsLoadedBackwards: !1,
                },
              },
              segments: [],
              isLoading: !1,
            },
            i
          );
        }
        function S(e, t, n, o) {
          for (
            var i = arguments.length, d = new Array(i > 4 ? i - 4 : 0), c = 4;
            c < i;
            c++
          )
            d[c - 4] = arguments[c];
          let [u = (0, r.g0)()] = d;
          const l = (0, s.Wi)(t, n),
            f = (0, a.nTw)(e, u).chatMediaSearch.byChatThreadKey[l];
          return f ? E(e, t, n, { ...f, isLoading: o }, u) : e;
        }
        function E(e, t, n, o) {
          for (
            var i = arguments.length, c = new Array(i > 4 ? i - 4 : 0), u = 4;
            u < i;
            u++
          )
            c[u - 4] = arguments[u];
          let [l = (0, r.g0)()] = c;
          const f = (0, s.Wi)(t, n);
          return (0, d.w)(
            e,
            {
              chatMediaSearch: {
                byChatThreadKey: {
                  ...(0, a.nTw)(e, l).chatMediaSearch.byChatThreadKey,
                  [f]: o,
                },
              },
            },
            l
          );
        }
      },
      32989: (e, t, n) => {
        n.d(t, { w: () => o });
        var r = n(14487);
        function o(e, t) {
          for (
            var n = arguments.length, o = new Array(n > 2 ? n - 2 : 0), s = 2;
            s < n;
            s++
          )
            o[s - 2] = arguments[s];
          let [a = (0, r.g0)()] = o;
          return {
            ...e,
            byTabId: { ...e.byTabId, [a]: { ...e.byTabId[a], ...t } },
          };
        }
      },
      95753: (e, t, n) => {
        n.d(t, {
          _B: () => l,
          gt: () => d,
          lc: () => u,
          oe: () => i,
          rm: () => c,
          xG: () => f,
        });
        var r = n(14487),
          o = n(87894),
          s = n(29807),
          a = n(32989);
        function i(e, t, n, r, o) {
          const a = (0, s.a_$)(e, t, r);
          return {
            ...e,
            translations: {
              ...e.translations,
              byChatId: {
                ...e.translations.byChatId,
                [t]: {
                  ...e.translations.byChatId[t],
                  byLangCode: {
                    ...e.translations.byChatId[t]?.byLangCode,
                    [r]: { ...a, [n]: { ...a[n], ...o } },
                  },
                },
              },
            },
          };
        }
        function d(e, t, n) {
          const r = e.translations.byChatId[t];
          if (!r) return e;
          const { byLangCode: s } = r,
            a = Object.keys(s).reduce((e, t) => {
              const r = (0, o.cJ)(s[t], [n]);
              return Object.keys(r).length && (e[t] = r), e;
            }, {});
          return {
            ...e,
            translations: {
              ...e.translations,
              byChatId: {
                ...e.translations.byChatId,
                [t]: { ...r, byLangCode: a },
              },
            },
          };
        }
        function c(e, t, n, r, o) {
          return (
            n.forEach((n, s) => {
              e = i(e, t, n, r, { text: o[s], isPending: !1 });
            }),
            e
          );
        }
        function u(e, t, n) {
          for (
            var o = arguments.length, i = new Array(o > 3 ? o - 3 : 0), d = 3;
            d < o;
            d++
          )
            i[d - 3] = arguments[d];
          let [c = (0, r.g0)()] = i;
          const u = (0, s.nTw)(e, c);
          return (0, a.w)(
            e,
            {
              requestedTranslations: {
                ...u.requestedTranslations,
                byChatId: {
                  ...u.requestedTranslations.byChatId,
                  [t]: { toLanguage: n },
                },
              },
            },
            c
          );
        }
        function l(e, t, n, o) {
          for (
            var i = arguments.length, d = new Array(i > 4 ? i - 4 : 0), c = 4;
            c < i;
            c++
          )
            d[c - 4] = arguments[c];
          let [u = (0, r.g0)()] = d;
          const l = (0, s.nTw)(e, u);
          return (0, a.w)(
            e,
            {
              requestedTranslations: {
                ...l.requestedTranslations,
                byChatId: {
                  ...l.requestedTranslations.byChatId,
                  [t]: {
                    ...l.requestedTranslations.byChatId[t],
                    manualMessages: {
                      ...l.requestedTranslations.byChatId[t]?.manualMessages,
                      [n]: o,
                    },
                  },
                },
              },
            },
            u
          );
        }
        function f(e, t, n) {
          for (
            var i = arguments.length, d = new Array(i > 3 ? i - 3 : 0), c = 3;
            c < i;
            c++
          )
            d[c - 3] = arguments[c];
          let [u = (0, r.g0)()] = d;
          const l = (0, s.nTw)(e, u),
            f = l.requestedTranslations.byChatId[t]?.manualMessages;
          if (!f) return e;
          const h = (0, o.cJ)(f, [n]);
          return (0, a.w)(
            e,
            {
              requestedTranslations: {
                ...l.requestedTranslations,
                byChatId: {
                  ...l.requestedTranslations.byChatId,
                  [t]: {
                    ...l.requestedTranslations.byChatId[t],
                    manualMessages: h,
                  },
                },
              },
            },
            u
          );
        }
      },
      21133: (e, t, n) => {
        n.d(t, {
          $: () => C,
          $T: () => f,
          AL: () => m,
          AW: () => l,
          D3: () => S,
          I_: () => v,
          LR: () => B,
          P4: () => A,
          To: () => g,
          VF: () => T,
          ZZ: () => D,
          bE: () => w,
          df: () => b,
          dg: () => R,
          dq: () => k,
          hX: () => N,
          hd: () => u,
          jG: () => x,
          ke: () => p,
          mJ: () => I,
          nT: () => y,
          nZ: () => h,
          p6: () => M,
          qZ: () => O,
          qn: () => E,
          s: () => P,
          w5: () => F,
          yH: () => U,
          yM: () => L,
        });
        var r = n(23174),
          o = n(31481),
          s = n(14487),
          a = n(82393),
          i = n(90709),
          d = n(5056),
          c = n(19926);
        function u(e, t) {
          return e.chats.byId[t];
        }
        function l(e, t) {
          return e.chats.fullInfoById[t];
        }
        function f(e, t) {
          return e.chats.loadingParameters[t];
        }
        function h(e, t) {
          return t === e.currentUserId;
        }
        function m(e, t) {
          const n = (function (e, t) {
            const n = (0, i.e7)(t);
            return !!n && (0, c.mB)(e, n);
          })(e, t);
          return n && (0, i.tv)(n);
        }
        function p(e) {
          return Object.values(e.chats.byId).find((e) => {
            let { isSupport: t } = e;
            return t;
          });
        }
        function g(e, t) {
          const n = l(e, t.id);
          if (!(0, i.L8)(t.id) && !(0, i.WX)(t) && n)
            return n.members && n.members.length !== o.WG3
              ? n.members.reduce((t, n) => {
                  let { userId: r } = n;
                  return !h(e, r) &&
                    e.users.byId[r] &&
                    (0, i.PF)(e.users.byId[r], e.users.statusesById[r])
                    ? t + 1
                    : t;
                }, 0)
              : n.onlineCount;
        }
        function y(e, t) {
          return e.trustedBotIds.includes(t);
        }
        function b(e, t) {
          if ((0, c.yp)(e, t)) return "bots";
          if ((0, c.mB)(e, t)) return "users";
          const n = u(e, t);
          return n ? ((0, i.WX)(n) ? "channels" : "chats") : void 0;
        }
        function v(e, t) {
          const n = u(e, t),
            o = (0, c.yp)(e, t);
          if (!n || !o) return !1;
          const s = U(e, t);
          if (s && (0, i.X_)(s)) return !0;
          const a = e.messages.byChatId[t];
          if (!a) return !1;
          const { listedIds: d } = a.threadsById[r.l3] || {};
          return d && !d.length;
        }
        function w(e) {
          return Boolean(e.chats.listIds.active);
        }
        function I(e, t, n) {
          const { listIds: r } = e.chats;
          if (n) {
            const e = r[n];
            return Boolean(e && e.includes(t));
          }
          return Object.values(r).some((e) => e && e.includes(t));
        }
        function A(e, t) {
          const n = u(e, t);
          if (n && I(e, t)) return n.folderId === o._E9 ? "archived" : "active";
        }
        function C(e, t) {
          return e.chatFolders.byId[t];
        }
        function S(e, t) {
          let n =
            arguments.length > 2 && void 0 !== arguments[2]
              ? arguments[2]
              : o.DSF;
          const { active: r, archived: s, saved: a } = e.chats.orderedPinnedIds;
          if (n === o.DSF) return Boolean(r?.includes(t));
          if (n === o._E9) return Boolean(s?.includes(t));
          if (n === o.pX9) return Boolean(a?.includes(t));
          const { byId: i } = e.chatFolders,
            { pinnedChatIds: d } = i[n] || {};
          return Boolean(d?.includes(t));
        }
        function E(e, t) {
          const n = t.toLowerCase();
          return Object.values(e.chats.byId).find((e) =>
            e.usernames?.some((e) => e.username.toLowerCase() === n)
          );
        }
        function k(e) {
          return Boolean(u(e, o.zv8));
        }
        function T(e, t) {
          if (!u(e, t)) return;
          const n = l(e, t)?.sendAsId;
          return n ? (0, c.mB)(e, n) || u(e, n) : void 0;
        }
        function P(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), o = 2;
            o < n;
            o++
          )
            r[o - 2] = arguments[o];
          let [a = (0, s.g0)()] = r;
          const { requestedDraft: i } = (0, d.n)(e, a);
          if (i?.chatId === t && !i.files?.length) return i.text;
        }
        function M(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), o = 2;
            o < n;
            o++
          )
            r[o - 2] = arguments[o];
          let [a = (0, s.g0)()] = r;
          const { requestedDraft: i } = (0, d.n)(e, a);
          if (i?.chatId === t) return i.files;
        }
        function L(e, t, n) {
          return t.filter((t) => {
            const r = b(e, t);
            return !!r && n.includes(r);
          });
        }
        function N(e, t) {
          const n = u(e, t);
          return (
            !!n &&
            !n.migratedTo &&
            Boolean(
              !(0, i.L8)(t) &&
                ((0, i.WX)(n) || (0, i.Vs)(n)
                  ? n.isCreator ||
                    (0, i.ub)(n, "inviteUsers") ||
                    (n.usernames?.length && !n.isJoinRequest)
                  : n.isCreator || (0, i.ub)(n, "inviteUsers"))
            )
          );
        }
        function F(e, t) {
          const n = C(e, t);
          if (!n) return !1;
          const {
            bots: r,
            groups: o,
            channels: s,
            contacts: a,
            nonContacts: i,
            includedChatIds: d,
            pinnedChatIds: c,
            excludeArchived: u,
            excludeMuted: l,
            excludeRead: f,
            excludedChatIds: h,
          } = n;
          return (
            !r &&
            !o &&
            !s &&
            !a &&
            !i &&
            !u &&
            !l &&
            !f &&
            !h?.length &&
            (c?.length || d.length) &&
            n.includedChatIds.concat(n.pinnedChatIds || []).some((t) => N(e, t))
          );
        }
        function B(e, t) {
          if (!u(e, t)) return !1;
          const { canTranslateChats: n } = e.settings.byKey,
            r = (0, c.g2)(e),
            o = h(e, t);
          return a.CM && n && r && !o;
        }
        function x(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), o = 2;
            o < n;
            o++
          )
            r[o - 2] = arguments[o];
          let [a = (0, s.g0)()] = r;
          const i = u(e, t);
          if (!i) return !1;
          if (O(e, t, a)) return !0;
          const d = B(e, t),
            c = i.detectedLanguage,
            { doNotTranslate: l } = e.settings.byKey;
          return Boolean(d && c && !l.includes(c));
        }
        function O(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), o = 2;
            o < n;
            o++
          )
            r[o - 2] = arguments[o];
          let [a = (0, s.g0)()] = r;
          const { requestedTranslations: i } = (0, d.n)(e, a);
          return i.byChatId[t]?.toLanguage;
        }
        function R(e, t) {
          return e.chats.similarChannelsById[t];
        }
        function D(e, t) {
          let n =
            arguments.length > 2 && void 0 !== arguments[2]
              ? arguments[2]
              : "all";
          return e.chats.lastMessageIds[n]?.[t];
        }
        function U(e, t) {
          let n =
            arguments.length > 2 && void 0 !== arguments[2]
              ? arguments[2]
              : "all";
          const r = D(e, t, n);
          if (!r) return;
          const o = "saved" === n ? e.currentUserId : t;
          return e.messages.byChatId[o]?.byId[r];
        }
      },
      29807: (e, t, n) => {
        n.d(t, {
          yMZ: () => i.yM,
          SpN: () => d.Sp,
          yuw: () => d.yu,
          WAX: () => d.WA,
          oei: () => F.oe,
          Nr8: () => F.Nr,
          tKM: () => F.tK,
          bE$: () => i.bE,
          yps: () => u.yp,
          PKK: () => T,
          wwb: () => d.ww,
          OEt: () => S,
          jyG: () => d.jy,
          DBV: () => d.DB,
          ori: () => d.or,
          Y8y: () => d.Y8,
          hXb: () => i.hX,
          e5V: () => h,
          BWX: () => k,
          tOf: () => d.tO,
          mDG: () => d.mD,
          RBq: () => d.RB,
          Ntz: () => V,
          w5O: () => i.w5,
          jGY: () => i.jG,
          S86: () => d.S8,
          hds: () => i.hd,
          qn$: () => i.qn,
          $aQ: () => i.$,
          AWZ: () => i.AW,
          yHC: () => i.yH,
          ZZX: () => i.ZZ,
          $TA: () => i.$T,
          P4G: () => i.P4,
          O5q: () => d.O5,
          zg4: () => d.zg,
          zeq: () => d.ze,
          ToO: () => i.To,
          yFI: () => d.yF,
          RnX: () => d.Rn,
          dfQ: () => i.df,
          Egn: () => d.Eg,
          meB: () => d.me,
          CuV: () => N.Cu,
          Wy7: () => F.Wy,
          xT4: () => L,
          vn8: () => f,
          vRX: () => d.vR,
          Xf0: () => d.Xf,
          TCk: () => N.TC,
          BU_: () => N.BU,
          BmE: () => F.Bm,
          V9I: () => K.V9,
          r8w: () => F.r8,
          oZ0: () => F.oZ,
          nTJ: () => d.nT,
          GA4: () => d.GA,
          U0A: () => d.U0,
          Ys6: () => d.Ys,
          KLw: () => d.KL,
          dkp: () => d.dk,
          VlN: () => d.Vl,
          dU3: () => d.dU,
          RjD: () => d.Rj,
          kdX: () => d.kd,
          VC8: () => d.VC,
          Szq: () => d.Sz,
          DI: () => d.DI,
          lC: () => d.lC,
          t0O: () => F.t0,
          WLj: () => F.WL,
          o45: () => d.o4,
          CzR: () => F.Cz,
          I_m: () => i.I_,
          mJZ: () => i.mJ,
          D3D: () => i.D3,
          ryq: () => d.ry,
          ALW: () => i.AL,
          nZ4: () => i.nZ,
          cwE: () => P,
          g29: () => u.g2,
          SLS: () => d.SL,
          sRo: () => w,
          clw: () => v,
          p5z: () => d.p5,
          hc: () => u.hc,
          rTV: () => d.rT,
          F4N: () => p,
          nJv: () => d.nJ,
          fo$: () => d.fo,
          ynf: () => d.yn,
          H1_: () => d.H1,
          Jbz: () => d.Jb,
          n_C: () => u.n_,
          Ani: () => I,
          gjV: () => y,
          dqr: () => i.dq,
          Q31: () => F.Q3,
          gd2: () => K.gd,
          nIz: () => M,
          nTL: () => i.nT,
          apd: () => u.ap,
          haw: () => d.h,
          wmb: () => H,
          rKQ: () => d.rK,
          xzS: () => d.xz,
          gCU: () => d.gC,
          YK: () => l,
          cO5: () => d.cO,
          S1W: () => d.S1,
          D_S: () => d.D_,
          OEv: () => d.OE,
          a_$: () => d.a_,
          BSN: () => W,
          tVS: () => d.tV,
          rQx: () => d.rQ,
          GrP: () => j,
          $5S: () => $,
          Tl2: () => d.Tl,
          Lzh: () => d.Lz,
          JiE: () => d.Ji,
          _5q: () => x,
          aF2: () => B,
          PGw: () => O,
          PVB: () => q.P,
          dNJ: () => K.dN,
          _$$: () => K._$,
          IVq: () => q.I,
          _bp: () => K._b,
          Msb: () => K.Ms,
          Cw0: () => A,
          xYJ: () => C,
          fcC: () => d.fc,
          gVx: () => K.gV,
          Kt9: () => D,
          EGt: () => R,
          N1i: () => d.N1,
          EHH: () => d.EH,
          Vz3: () => d.Vz,
          jp_: () => d.jp,
          qZq: () => i.qZ,
          sam: () => i.s,
          p6T: () => i.p6,
          Rny: () => d.iL,
          t75: () => g,
          QP5: () => d.QP,
          K3w: () => d.K3,
          Jl6: () => d.Jl,
          j_4: () => d.j_,
          ZZ2: () => d.ZZ,
          VF$: () => i.VF,
          Y7C: () => d.Y7,
          HdA: () => d.Hd,
          LM$: () => d.LM,
          LRV: () => i.LR,
          KIM: () => J,
          ML4: () => E,
          PIP: () => d.PI,
          dg4: () => i.dg,
          G4m: () => _,
          v8U: () => d.v8,
          gqw: () => m,
          ycM: () => F.yc,
          wg6: () => F.wg,
          R3Q: () => K.R3,
          e7$: () => U,
          ke9: () => i.ke,
          nTw: () => c.n,
          SJA: () => b,
          $jd: () => d.$j,
          Tac: () => d.T,
          L_2: () => d.L_,
          Vw0: () => d.Vw,
          QbG: () => d.Qb,
          C5H: () => d.C5,
          S0q: () => G.S0,
          nkm: () => d.nk,
          sZk: () => d.sZ,
          pSx: () => G.pS,
          xyP: () => G.xy,
          Qq_: () => z,
          ldX: () => d.ld,
          mBe: () => u.mB,
          gTO: () => u.gT,
          Ua4: () => u.U,
          vGo: () => u.vG,
          K0y: () => u.K0,
          rA3: () => d.rA,
          NHc: () => d.NH,
        });
        var r = n(89925),
          o = n(14487),
          s = n(77312),
          a = n(90709),
          i = n(21133),
          d = n(19408),
          c = n(5056),
          u = n(19926);
        function l(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), s = 2;
            s < n;
            s++
          )
            r[s - 2] = arguments[s];
          let [a = (0, o.g0)()] = r;
          return (0, c.n)(e, a).management.byChatId[t];
        }
        function f(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
            r < t;
            r++
          )
            n[r - 1] = arguments[r];
          let [s = (0, o.g0)()] = n;
          const { chatId: c, threadId: l } = (0, d.Xf)(e, s) || {};
          if (!c || !l) return;
          if ((0, u.yp)(e, c)) return "bot";
          if ((0, a.L8)(c)) return "user";
          const f = (0, i.hd)(e, c);
          return f ? ((0, a.YE)(f) ? "group" : "channel") : void 0;
        }
        function h(e, t) {
          const n = (0, i.hd)(e, t);
          if (!n || n.isRestricted) return !1;
          const r = (0, a.L8)(n.id) ? (0, u.mB)(e, t) : void 0,
            o = r && (0, a.Gh)(r),
            s = r && (0, a.tv)(r);
          return Boolean(
            !o &&
              n &&
              !(0, i.nZ)(e, n.id) &&
              !(0, a.Qe)(n.id) &&
              ((0, a.L8)(n.id) ||
                (((0, a.SJ)(n) || n.isCreator) && !n.isNotJoined)) &&
              !s
          );
        }
        function m(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), s = 2;
            s < n;
            s++
          )
            r[s - 2] = arguments[s];
          let [a = (0, o.g0)()] = r;
          return (0, c.n)(e, a).statistics.byChatId[t];
        }
        function p(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
            r < t;
            r++
          )
            n[r - 1] = arguments[r];
          let [s = (0, o.g0)()] = n;
          const {
            mediaViewer: {
              chatId: a,
              messageId: i,
              isAvatarView: d,
              standaloneMedia: u,
              isSponsoredMessage: l,
            },
          } = (0, c.n)(e, s);
          return Boolean(u || (a && (d || i || l)));
        }
        function g(e, t) {
          for (
            var n = arguments.length, s = new Array(n > 2 ? n - 2 : 0), a = 2;
            a < n;
            a++
          )
            s[a - 2] = arguments[a];
          let [u = (0, o.g0)()] = s;
          const l = (0, c.n)(e, u);
          return l.editTopicPanel
            ? r.Ul.EditTopic
            : l.createTopicPanel
            ? r.Ul.CreateTopic
            : l.pollResults.messageId
            ? r.Ul.PollResults
            : (function (e) {
                for (
                  var t = arguments.length,
                    n = new Array(t > 1 ? t - 1 : 0),
                    r = 1;
                  r < t;
                  r++
                )
                  n[r - 1] = arguments[r];
                let [s = (0, o.g0)()] = n;
                const { chatId: a, threadId: i } = (0, d.Xf)(e, s) || {};
                if (!a || !i) return;
                const u = (0, c.n)(e, s).management.byChatId[a];
                return u?.isActive ? u : void 0;
              })(e, u)
            ? r.Ul.Management
            : l.isStatisticsShown && l.statistics.currentMessageId
            ? r.Ul.MessageStatistics
            : l.isStatisticsShown && l.statistics.currentStoryId
            ? r.Ul.StoryStatistics
            : (function (e) {
                for (
                  var t = arguments.length,
                    n = new Array(t > 1 ? t - 1 : 0),
                    r = 1;
                  r < t;
                  r++
                )
                  n[r - 1] = arguments[r];
                let [s = (0, o.g0)()] = n;
                if (!(0, c.n)(e, s).isStatisticsShown) return !1;
                const { chatId: a } = (0, d.Xf)(e, s) || {};
                return a ? (0, i.AW)(e, a)?.canViewStatistics : void 0;
              })(e, u)
            ? r.Ul.Statistics
            : l.boostStatistics
            ? r.Ul.BoostStatistics
            : l.monetizationStatistics
            ? r.Ul.MonetizationStatistics
            : void 0 !== l.stickerSearch.query
            ? r.Ul.StickerSearch
            : void 0 !== l.gifSearch.query
            ? r.Ul.GifSearch
            : l.newChatMembersProgress !== r.D7.Closed
            ? r.Ul.AddingMembers
            : l.isChatInfoShown && l.messageLists.length
            ? r.Ul.ChatInfo
            : void 0;
        }
        function y(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), s = 2;
            s < n;
            s++
          )
            r[s - 2] = arguments[s];
          let [a = (0, o.g0)()] = r;
          return void 0 !== g(e, t, a);
        }
        function b(e) {
          const { theme: t } = e.settings.byKey;
          return t;
        }
        function v(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
            r < t;
            r++
          )
            n[r - 1] = arguments[r];
          let [s = (0, o.g0)()] = n;
          const a = (0, c.n)(e, s);
          return (
            Boolean(a.forumPanelChatId) &&
            (void 0 === a.globalSearch.query ||
              Boolean(a.globalSearch.isClosing))
          );
        }
        function w(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
            r < t;
            r++
          )
            n[r - 1] = arguments[r];
          let [s = (0, o.g0)()] = n;
          return !v(e, s);
        }
        function I(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
            r < t;
            r++
          )
            n[r - 1] = arguments[r];
          let [s = (0, o.g0)()] = n;
          const { reactionPicker: a } = (0, c.n)(e, s);
          return Boolean(a?.position);
        }
        function A(e) {
          return e.settings.performance;
        }
        function C(e, t) {
          return e.settings.performance[t];
        }
        function S(e, t) {
          const n = (0, s.zX)(t) || (0, s.QC)(t);
          if (!n) return;
          const r = C(e, "autoplayVideos"),
            o = C(e, "autoplayGifs"),
            a = n.isGif || n.isRound;
          return (r && !a) || (o && a);
        }
        function E(e) {
          return C(e, "loopAnimatedStickers");
        }
        function k(e) {
          return C(e, "animatedEmoji");
        }
        function T(e) {
          return C(e, "pageTransitions");
        }
        function P(e) {
          return C(e, "contextMenuBlur");
        }
        function M(e) {
          return e.isSynced;
        }
        function L(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
            r < t;
            r++
          )
            n[r - 1] = arguments[r];
          let [s = (0, o.g0)()] = n;
          return (0, c.n)(e, s).globalSearch.query;
        }
        var N = n(94137),
          F = n(30163);
        function B(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
            r < t;
            r++
          )
            n[r - 1] = arguments[r];
          let [s = (0, o.g0)()] = n;
          return (0, c.n)(e, s).payment.inputInvoice;
        }
        function x(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
            r < t;
            r++
          )
            n[r - 1] = arguments[r];
          let [s = (0, o.g0)()] = n;
          return (0, c.n)(e, s).payment.formId;
        }
        function O(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
            r < t;
            r++
          )
            n[r - 1] = arguments[r];
          let [s = (0, o.g0)()] = n;
          return (0, c.n)(e, s).payment.requestId;
        }
        function R(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
            r < t;
            r++
          )
            n[r - 1] = arguments[r];
          let [s = (0, o.g0)()] = n;
          return (0, c.n)(e, s).payment.nativeParams?.publishableKey;
        }
        function D(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
            r < t;
            r++
          )
            n[r - 1] = arguments[r];
          let [s = (0, o.g0)()] = n;
          return (0, c.n)(e, s).payment.nativeParams?.publicToken;
        }
        function U(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
            r < t;
            r++
          )
            n[r - 1] = arguments[r];
          let [s = (0, o.g0)()] = n;
          return (0, c.n)(e, s).payment.stripeCredentials;
        }
        function _(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
            r < t;
            r++
          )
            n[r - 1] = arguments[r];
          let [s = (0, o.g0)()] = n;
          return (0, c.n)(e, s).payment.smartGlocalCredentials;
        }
        function $(e) {
          return e.settings.byKey;
        }
        function j(e) {
          return e.settings.notifyExceptions;
        }
        function H(e) {
          return e.settings.byKey.language.replace("-raw", "");
        }
        function V(e) {
          return e.authRememberMe && e.isCacheApiSupported;
        }
        function z(e) {
          return e.settings.byKey.translationLanguage || H(e);
        }
        function W(e) {
          return e.settings.byKey.shouldNewNonContactPeersRequirePremium;
        }
        function J(e) {
          return e.settings.byKey.shouldHideReadMarks;
        }
        var K = n(1903),
          q = n(46211),
          G = n(88368);
      },
      19408: (e, t, n) => {
        n.d(t, {
          $j: () => T,
          C5: () => k,
          DB: () => fe,
          DI: () => Qe,
          D_: () => Me,
          EH: () => Ae,
          Eg: () => Ee,
          GA: () => j,
          H1: () => Te,
          Hd: () => de,
          Jb: () => re,
          Ji: () => L,
          Jl: () => Y,
          K3: () => x,
          KL: () => Z,
          LM: () => ie,
          L_: () => me,
          Lz: () => M,
          N1: () => Q,
          NH: () => Ve,
          O5: () => X,
          OE: () => tt,
          PI: () => ze,
          QP: () => he,
          Qb: () => J,
          RB: () => We,
          Rj: () => Ce,
          Rn: () => qe,
          S1: () => Je,
          S8: () => Ze,
          SL: () => Le,
          Sp: () => ae,
          Sz: () => ce,
          T: () => K,
          Tl: () => oe,
          U0: () => U,
          VC: () => Pe,
          Vl: () => _,
          Vw: () => V,
          Vz: () => Ye,
          WA: () => ge,
          Xf: () => I,
          Y7: () => se,
          Y8: () => _e,
          Ys: () => D,
          ZZ: () => Ne,
          a_: () => Ge,
          cO: () => He,
          dU: () => z,
          dk: () => $,
          fc: () => B,
          fo: () => q,
          gC: () => P,
          h: () => G,
          iL: () => Xe,
          j_: () => O,
          jp: () => W,
          jy: () => ye,
          kd: () => te,
          lC: () => Ke,
          ld: () => Ie,
          mD: () => be,
          me: () => A,
          nJ: () => ne,
          nT: () => je,
          nk: () => ue,
          o4: () => Ue,
          or: () => ve,
          p5: () => Se,
          rA: () => F,
          rK: () => R,
          rQ: () => H,
          rT: () => ke,
          ry: () => De,
          sZ: () => et,
          tO: () => pe,
          tV: () => Fe,
          v8: () => $e,
          vR: () => N,
          ww: () => Be,
          xz: () => Oe,
          yF: () => S,
          yn: () => Re,
          yu: () => we,
          ze: () => C,
          zg: () => ee,
        });
        var r = n(23174),
          o = n(31481),
          s = n(14487),
          a = n(87894),
          i = n(60343),
          d = n(79824),
          c = n(80140),
          u = n(82393),
          l = n(90709),
          f = n(26129),
          h = n(21133),
          m = n(46211),
          p = n(1903),
          g = n(30163),
          y = n(5056),
          b = n(88368),
          v = n(19926);
        const w = 172800;
        function I(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
            r < t;
            r++
          )
            n[r - 1] = arguments[r];
          let [o = (0, s.g0)()] = n;
          const { messageLists: a } = (0, y.n)(e, o);
          if (a.length) return a[a.length - 1];
        }
        function A(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
            r < t;
            r++
          )
            n[r - 1] = arguments[r];
          let [o = (0, s.g0)()] = n;
          const { chatId: a } = I(e, o) || {};
          return a ? (0, h.hd)(e, a) : void 0;
        }
        function C(e, t) {
          return e.messages.byChatId[t]?.byId;
        }
        function S(e, t) {
          return e.scheduledMessages.byChatId[t]?.byId;
        }
        function E(e, t, n, r) {
          for (
            var o = arguments.length, a = new Array(o > 4 ? o - 4 : 0), i = 4;
            i < o;
            i++
          )
            a[i - 4] = arguments[i];
          let [d = (0, s.g0)()] = a;
          return (0, y.n)(e, d).tabThreads[t]?.[n]?.[r];
        }
        function k(e, t, n, r) {
          return T(e, t, n)?.[r];
        }
        function T(e, t, n) {
          const r = e.messages.byChatId[t];
          if (!r) return;
          return r.threadsById[n] || void 0;
        }
        function P(e, t, n) {
          return k(e, t, n, "listedIds");
        }
        function M(e, t, n, r) {
          const o = L(e, t, n);
          if (o) return o.find((e) => e[0] <= r && e[e.length - 1] >= r);
        }
        function L(e, t, n) {
          return k(e, t, n, "outlyingLists");
        }
        function N(e, t, n, r) {
          for (
            var o = arguments.length, a = new Array(o > 4 ? o - 4 : 0), i = 4;
            i < o;
            i++
          )
            a[i - 4] = arguments[i];
          let [d = (0, s.g0)()] = a;
          switch (r) {
            case "thread":
              return F(e, t, n, d);
            case "pinned":
              return B(e, t, n);
            case "scheduled":
              return x(e, t, n);
          }
        }
        function F(e, t, n) {
          for (
            var r = arguments.length, o = new Array(r > 3 ? r - 3 : 0), a = 3;
            a < r;
            a++
          )
            o[a - 3] = arguments[a];
          let [i = (0, s.g0)()] = o;
          return E(e, t, n, "viewportIds", i);
        }
        function B(e, t, n) {
          return k(e, t, n, "pinnedIds");
        }
        function x(e, t, n) {
          return k(e, t, n, "scheduledIds");
        }
        function O(e, t, n) {
          for (
            var r = arguments.length, o = new Array(r > 3 ? r - 3 : 0), a = 3;
            a < r;
            a++
          )
            o[a - 3] = arguments[a];
          let [i = (0, s.g0)()] = o;
          return E(e, t, n, "scrollOffset", i);
        }
        function R(e, t, n) {
          return k(e, t, n, "lastScrollOffset");
        }
        function D(e, t, n) {
          return k(e, t, n, "editingId");
        }
        function U(e, t, n) {
          return k(e, t, n, "editingDraft");
        }
        function _(e, t) {
          return k(e, t, r.l3, "editingScheduledId");
        }
        function $(e, t) {
          return k(e, t, r.l3, "editingScheduledDraft");
        }
        function j(e, t, n) {
          return k(e, t, n, "draft");
        }
        function H(e, t, n) {
          return k(e, t, n, "noWebPage");
        }
        function V(e, t, n) {
          return k(e, t, n, "threadInfo");
        }
        function z(e, t, n) {
          return k(e, t, n, "firstMessageId");
        }
        function W(e, t, n) {
          for (
            var r = arguments.length, o = new Array(r > 3 ? r - 3 : 0), a = 3;
            a < r;
            a++
          )
            o[a - 3] = arguments[a];
          let [i = (0, s.g0)()] = o;
          return E(e, t, n, "replyStack", i);
        }
        function J(e, t, n) {
          const r = (0, h.hd)(e, t),
            s = V(e, t, n);
          if (r && s && void 0 !== s.messagesCount)
            return r.isForum && n !== o.HxB
              ? s.messagesCount - 1
              : s.messagesCount;
        }
        function K(e, t) {
          const n = me(e, t);
          if (n && n !== r.l3)
            return e.messages.byChatId[t.chatId].threadsById[n];
        }
        function q(e, t, n) {
          for (
            var o = arguments.length, a = new Array(o > 3 ? o - 3 : 0), i = 3;
            i < o;
            i++
          )
            a[i - 3] = arguments[i];
          let [d = (0, s.g0)()] = a;
          const c = I(e, d);
          if (!c) return !1;
          const { threadInfo: u } = K(e, n) || {};
          return (
            t === c.chatId &&
            (c.threadId === r.l3 || (u && c.threadId === u.threadId))
          );
        }
        function G(e, t, n) {
          for (
            var o = arguments.length, a = new Array(o > 3 ? o - 3 : 0), d = 3;
            d < o;
            d++
          )
            a[d - 3] = arguments[d];
          let [c = (0, s.g0)()] = a;
          const u = F(e, t, n, c);
          if (!u || !u.length) return !0;
          const f = (0, l.cG)(t, n, e.currentUserId);
          let m;
          if (n === r.l3) {
            const n = (0, h.ZZ)(e, t);
            if (!n) return !0;
            m = n;
          } else if (f) {
            const t = (0, h.ZZ)(e, String(n), "saved");
            if (!t) return !0;
            m = t;
          } else {
            const r = V(e, t, n);
            if (r && r.lastMessageId) m = r.lastMessageId;
            else {
              if (!r?.threadId) return;
              m = Number(r?.threadId);
            }
          }
          return !(!(0, i.iL)(m) || X(e, t, m)) || u[u.length - 1] >= m;
        }
        function X(e, t, n) {
          const r = C(e, t);
          return r ? r[n] : void 0;
        }
        function Y(e, t, n) {
          const r = S(e, t);
          return r ? r[n] : void 0;
        }
        function Q(e, t) {
          return e.quickReplies.messagesById[t];
        }
        function Z(e, t, n, r) {
          if ("scheduled" === r) {
            const n = _(e, t);
            return n ? Y(e, t, n) : void 0;
          }
          {
            const r = D(e, t, n);
            return r ? X(e, t, r) : void 0;
          }
        }
        function ee(e, t) {
          let n;
          for (const r of Object.values(e.messages.byChatId)) {
            const { byId: e } = r;
            if (
              ((n = Object.values(e).find(
                (e) => e.content.poll && e.content.poll.id === t
              )),
              n)
            )
              break;
          }
          return n;
        }
        function te(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), o = 2;
            o < n;
            o++
          )
            r[o - 2] = arguments[o];
          let [a = (0, s.g0)()] = r;
          const { chatId: i, messageId: d } =
            (0, y.n)(e, a).focusedMessage || {};
          return i === t ? d : void 0;
        }
        function ne(e, t, n) {
          for (
            var r = arguments.length, o = new Array(r > 3 ? r - 3 : 0), a = 3;
            a < r;
            a++
          )
            o[a - 3] = arguments[a];
          let [i = (0, s.g0)()] = o;
          const d = te(e, t.chatId, i),
            c = (0, y.n)(e, i).focusedMessage?.threadId;
          return n === c && !!d && (d === t.id || d === t.previousLocalId);
        }
        function re(e, t) {
          const { lastReadOutboxMessageId: n } = (0, h.hd)(e, t.chatId) || {};
          return (0, l.Nb)(t) || !n || n < t.id;
        }
        function oe(e, t) {
          let n =
            arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
          return re(e, t) || n ? (0, l._I)(t) : "read";
        }
        function se(e, t) {
          const { senderId: n } = t,
            r = (0, h.hd)(e, t.chatId);
          return n
            ? r && (0, l.WX)(r) && !r.areProfilesShown
              ? r
              : (0, m.P)(e, n)
            : r;
        }
        function ae(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), o = 2;
            o < n;
            o++
          )
            r[o - 2] = arguments[o];
          let [a = (0, s.g0)()] = r;
          const { messageIds: i } = (0, y.n)(e, a).selectedMessages || {};
          if (t?.id && i)
            return i.map((n) => {
              const r = X(e, t.id, n);
              return r && se(e, r);
            });
        }
        function ie(e, t, n) {
          const r = X(e, t, n);
          return r && se(e, r);
        }
        function de(e, t) {
          const { fromId: n } = t;
          if (n) return (0, m.P)(e, n);
        }
        function ce(e, t) {
          if (Boolean(t.content.storyData)) {
            const n = t.content.storyData.peerId;
            return (0, m.P)(e, n);
          }
          const { forwardInfo: n } = t;
          if (n)
            return n.isChannelPost && n.fromChatId
              ? (0, h.hd)(e, n.fromChatId)
              : n.fromId
              ? (0, m.P)(e, n.fromId)
              : n.savedFromPeerId
              ? (0, m.P)(e, n.savedFromPeerId)
              : void 0;
        }
        function ue(e, t) {
          const { chatId: n } = t,
            r = (0, h.hd)(e, n);
          if (!r?.isForum) return;
          const o = me(e, t);
          return (0, b.S0)(e, n, o);
        }
        const le = 10;
        function fe(e, t, n) {
          const r = (0, h.hd)(e, t);
          return (
            !!r &&
            n !== o.HxB &&
            (r.isCreator ||
              (0, l.ub)(r, "deleteMessages") ||
              (r.isForum &&
                (function (e, t, n) {
                  const r = (0, b.S0)(e, t, n);
                  if (r && !r.isOwner) return !1;
                  const o = T(e, t, n);
                  if (!o) return !1;
                  const { listedIds: s } = o;
                  return !(
                    !s ||
                    s.length + 1 >= le ||
                    s.some((n) => {
                      const r = X(e, t, n);
                      return !r || !r.isOutgoing;
                    })
                  );
                })(e, r.id, n)))
          );
        }
        function he(e, t) {
          const { chatId: n, senderId: r, forwardInfo: s, savedPeerId: a } = t;
          return (
            a ||
            (n === e.currentUserId
              ? s?.savedFromPeerId
                ? s.savedFromPeerId
                : s?.fromId
                ? s.fromId
                : s?.hiddenUserName
                ? o.Ckz
                : r
              : void 0)
          );
        }
        function me(e, t) {
          const n = he(e, t);
          if (n) return n;
          const s = (0, h.hd)(e, t.chatId),
            { content: a } = t,
            {
              replyToMsgId: i,
              replyToTopId: d,
              isForumTopic: c,
            } = (0, f.Q)(t) || {};
          return "action" in a && "topicCreate" === a.action?.type
            ? t.id
            : s?.isForum
            ? (c && (d || i)) || o.HxB
            : s && (0, l.yn)(s)
            ? r.l3
            : (s && (0, l.Vs)(s) && (d || i)) || r.l3;
        }
        function pe(e, t, n) {
          const r = (0, h.hd)(e, t.chatId);
          if (!r || r.isRestricted || r.isForbidden) return !1;
          const o = (0, l.Nb)(t),
            s = (0, l.u7)(t);
          if (o || s) return !1;
          const a = V(e, t.chatId, n),
            i = Boolean(!a?.isCommentsInfo && a?.fromChannelId),
            d = (0, h.AW)(e, r.id),
            c = (0, b.S0)(e, r.id, n);
          if (!(0, l.__)(r, c, i, d)) return !1;
          const u = ue(e, t);
          return !u || !u.isClosed || u.isOwner || (0, l.ub)(r, "manageTopics");
        }
        function ge(e, t, n) {
          const r = (0, h.hd)(e, t.chatId);
          if (!r || r.isRestricted) return {};
          const o = (0, l.L8)(r.id),
            s = (0, h.nZ)(e, t.chatId),
            a = (0, l.yn)(r),
            i = (0, l.Vs)(r),
            d = (0, l.WX)(r),
            u = Boolean((0, v.yp)(e, r.id)),
            f = (0, l.Nb)(t),
            m = (0, l.HN)(t),
            y = (0, l.u7)(t),
            b = (0, l.Ie)(t),
            I = (0, l.Ak)(t),
            A = (0, l._P)(t),
            C = (0, l.G5)(t),
            { content: S } = t,
            E = (0, l.Ax)(t),
            k = "chatBoost" === t.content.action?.type,
            T =
              (s ||
                (i && (0, l.ub)(r, "pinMessages")) ||
                (d && (0, l.ub)(r, "editMessages")) ||
                (0, c.Fm)() - t.date < w) &&
              !(
                S.sticker ||
                S.contact ||
                S.poll ||
                S.action ||
                S.video?.isRound ||
                S.location ||
                S.invoice ||
                S.giveaway ||
                S.giveawayResults ||
                E
              ) &&
              !I &&
              !t.viaBotId &&
              !r.isForbidden,
            P = (0, l.cG)(r.id, n, e.currentUserId),
            M = pe(e, t, n),
            L = M || (!P && !f && !y && (i || a || (0, l.WX)(r))),
            N =
              o ||
              r.isCreator ||
              (!d && !(0, l.Sq)(r, "pinMessages")) ||
              (0, l.ub)(r, "pinMessages");
          let F = !f && !y && !A && N && !P,
            x = !1;
          const O = B(e, r.id, n);
          F && ((x = Boolean(O && O.includes(t.id))), (F = !x));
          const R = k && b && !r.isCreator && !(0, l.ub)(r, "deleteMessages"),
            D =
              (!f || m) &&
              !y &&
              !R &&
              (o || b || a || r.isCreator || (0, l.ub)(r, "deleteMessages")),
            U = !o && !b,
            _ =
              D &&
              !r.isForbidden &&
              ((o && !s && !u) ||
                (a && (b || (0, l.ub)(r, "deleteMessages") || r.isCreator))),
            $ = b || (d && (r.isCreator || (0, l.ub)(r, "editMessages"))),
            j = !f && !A && T && $,
            H = S.storyData
              ? (0, p.Ms)(e, S.storyData.peerId, S.storyData.id)
              : S.webPage?.story
              ? (0, p.Ms)(e, S.webPage.story.peerId, S.webPage.story.id)
              : void 0,
            V = De(e, t.chatId),
            z = H && ("isDeleted" in H || ("noForwards" in H && H.noForwards)),
            W = !f && !A && !V && !z && (t.isForwardingAllowed || y) && !C,
            J = Boolean(t.content.sticker),
            K = J && (0, g.Ij)(e, t.content.sticker),
            q = !A && J && !K,
            G = !A && K,
            X = !A,
            Y = !f && !A && (d || i),
            Q = !f && !A,
            Z =
              Boolean(
                S.webPage?.document ||
                  S.webPage?.video ||
                  S.webPage?.photo ||
                  S.audio ||
                  S.voice ||
                  S.photo ||
                  S.video ||
                  S.document ||
                  S.sticker
              ) && !C,
            ee = t.content.video?.isGif,
            te = S.poll,
            ne =
              !te?.summary.closed &&
              !te?.summary.quiz &&
              te?.results.results?.some((e) => e.isChosen),
            re = $ && te && !te.summary.closed && !I;
          return {
            noOptions: [
              M,
              L,
              j,
              F,
              x,
              U,
              D,
              _,
              W,
              q,
              G,
              X,
              Y,
              Q,
              Z,
              ee,
              ne,
              re,
            ].every((e) => !e),
            canReply: M,
            canReplyGlobally: L,
            canEdit: j,
            canPin: F,
            canUnpin: x,
            canReport: U,
            canDelete: D,
            canDeleteForAll: _,
            canForward: W,
            canFaveSticker: q,
            canUnfaveSticker: G,
            canCopy: X,
            canCopyLink: Y,
            canSelect: Q,
            canDownload: Z,
            canSaveGif: ee,
            canRevote: ne,
            canClosePoll: re,
          };
        }
        function ye(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
            r < t;
            r++
          )
            n[r - 1] = arguments[r];
          let [o = (0, s.g0)()] = n;
          const { messageIds: a } = (0, y.n)(e, o).selectedMessages || {},
            { chatId: i, threadId: d } = I(e, o) || {},
            c = i && C(e, i);
          if (!c || !a || !d) return {};
          const u = a.map((t) => c[t] && ge(e, c[t], d)).filter(Boolean);
          return {
            canDelete: u.every((e) => e.canDelete),
            canDeleteForAll: u.every((e) => e.canDeleteForAll),
          };
        }
        function be(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
            r < t;
            r++
          )
            n[r - 1] = arguments[r];
          let [o = (0, s.g0)()] = n;
          const { messageIds: a } = (0, y.n)(e, o).selectedMessages || {},
            { chatId: i, threadId: d } = I(e, o) || {},
            c = i && C(e, i);
          return (
            !!(c && a && d) &&
            a
              .map((t) => c[t] && ge(e, c[t], d))
              .filter(Boolean)
              .every((e) => e.canReport)
          );
        }
        function ve(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
            r < t;
            r++
          )
            n[r - 1] = arguments[r];
          let [o = (0, s.g0)()] = n;
          const { messageIds: a } = (0, y.n)(e, o).selectedMessages || {},
            { chatId: i, threadId: d } = I(e, o) || {},
            c = i && C(e, i);
          return (
            !!(c && a && d) &&
            a
              .map((t) => c[t] && ge(e, c[t], d))
              .filter(Boolean)
              .some((e) => e.canDownload)
          );
        }
        function we(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
            r < t;
            r++
          )
            n[r - 1] = arguments[r];
          let [o = (0, s.g0)()] = n;
          return (0, y.n)(e, o).activeDownloads;
        }
        function Ie(e, t) {
          return e.fileUploads.byMessageKey[(0, i.bj)(t)]?.progress;
        }
        function Ae(e, t, n) {
          if (n === r.l3) {
            const n = (0, h.hd)(e, t);
            if (!n) return;
            if (!n.lastReadInboxMessageId) return;
            const r = (0, h.ZZ)(e, t);
            return !r || n.unreadCount ? n.lastReadInboxMessageId : r;
          }
          {
            const r = V(e, t, n);
            if (!r) return;
            return r.lastReadInboxMessageId
              ? Math.min(r.lastReadInboxMessageId, r.lastMessageId || 1 / 0)
              : Number(r.threadId);
          }
        }
        function Ce(e, t, n) {
          const s = (0, h.hd)(e, t);
          if (n === r.l3) {
            if (!s) return;
          } else {
            const r = V(e, t, n);
            if (
              !r ||
              (void 0 !== r.lastMessageId &&
                r.lastMessageId === r.lastReadInboxMessageId)
            )
              return;
          }
          const a = L(e, t, n),
            i = P(e, t, n),
            d = C(e, t);
          if (!d || (!a?.length && !i)) return;
          const c = Ae(e, t, n);
          if (!c && s && s.isNotJoined) return;
          const u =
            t === o.zv8
              ? e.serviceNotifications.reduce(
                  (e, t) => (!t.isUnread && t.id > e ? t.id : e),
                  -1
                )
              : -1;
          function l(e) {
            return e.find(
              (e) =>
                (!c || e > c) &&
                d[e] &&
                (!d[e].isOutgoing ||
                  d[e].content.action?.isTopicAction ||
                  d[e].isFromScheduled) &&
                e > u
            );
          }
          if (a?.length) {
            const e = a.map((e) => l(e)).filter(Boolean)[0];
            if (e) return e;
          }
          if (i) {
            const e = l(i);
            if (e) return e;
          }
        }
        function Se(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
            r < t;
            r++
          )
            n[r - 1] = arguments[r];
          let [o = (0, s.g0)()] = n;
          const { isShareMessageModalShown: a } = (0, y.n)(e, o);
          return Boolean(a);
        }
        function Ee(e, t) {
          const n = Object.values(e.chats.byId).find(
            (n) => (0, l.VN)(n) && (0, h.ZZ)(e, n.id) === t
          );
          if (n) return n.id;
          const { byChatId: r } = e.messages;
          return Object.keys(r).find((n) => {
            const o = (0, h.hd)(e, n);
            return o && (0, l.VN)(o) && r[o.id].byId[t];
          });
        }
        function ke(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
            r < t;
            r++
          )
            n[r - 1] = arguments[r];
          let [o = (0, s.g0)()] = n;
          const { selectedMessages: a } = (0, y.n)(e, o);
          return Boolean(a);
        }
        function Te(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), o = 2;
            o < n;
            o++
          )
            r[o - 2] = arguments[o];
          let [a = (0, s.g0)()] = r;
          const { messageIds: i } = (0, y.n)(e, a).selectedMessages || {};
          return !!i && i.includes(t);
        }
        function Pe(e, t, n) {
          const r = C(e, t);
          if (r)
            return Object.values(r)
              .filter((e) => e.groupedId === n && e.forwardInfo)
              .map((e) => {
                let { forwardInfo: t } = e;
                return t.fromMessageId;
              });
        }
        function Me(e, t, n) {
          const r = C(e, t);
          if (r)
            return Object.keys(r)
              .map(Number)
              .filter((e) => r[e].groupedId === n);
        }
        function Le(e, t, n) {
          for (
            var r = arguments.length, o = new Array(r > 3 ? r - 3 : 0), a = 3;
            a < r;
            a++
          )
            o[a - 3] = arguments[a];
          let [i = (0, s.g0)()] = o;
          const { messageIds: d } = (0, y.n)(e, i).selectedMessages || {};
          if (!d) return !1;
          const c = Me(e, t, n);
          return c && c.every((e) => d.includes(e));
        }
        function Ne(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
            r < t;
            r++
          )
            n[r - 1] = arguments[r];
          let [o = (0, s.g0)()] = n;
          const { messageIds: a } = (0, y.n)(e, o).selectedMessages || {};
          return a ? a.length : 0;
        }
        function Fe(e, t) {
          let n =
            arguments.length > 2 && void 0 !== arguments[2]
              ? arguments[2]
              : r.l3;
          for (
            var o = arguments.length, i = new Array(o > 3 ? o - 3 : 0), d = 3;
            d < o;
            d++
          )
            i[d - 3] = arguments[d];
          let [c = (0, s.g0)()] = i;
          if (!(0, h.hd)(e, t)) return;
          const u = C(e, t),
            l = F(e, t, n, c);
          if (!u || !l) return;
          const m = (0, a.Uk)(l, (t) => {
              const n = u[t];
              return (
                n &&
                (function (e, t) {
                  const {
                    keyboardButtons: n,
                    shouldHideKeyboardButtons: r,
                    isKeyboardSelective: o,
                    isMentioned: s,
                  } = t;
                  if (!n || r) return !1;
                  const a = (0, f.Q)(t)?.replyToMsgId;
                  if (o) {
                    if (s) return !0;
                    if (!a) return !1;
                    const n = X(e, t.chatId, a);
                    return Boolean(n?.senderId === e.currentUserId);
                  }
                  return !0;
                })(e, n)
              );
            }),
            p = (0, a.Uk)(l, (t) => {
              const n = u[t];
              return (
                n &&
                (function (e, t) {
                  const {
                    shouldHideKeyboardButtons: n,
                    isHideKeyboardSelective: r,
                    isMentioned: o,
                  } = t;
                  if (!n) return !1;
                  const s = (0, f.Q)(t)?.replyToMsgId;
                  if (r) {
                    if (o) return !0;
                    if (!s) return !1;
                    const n = X(e, t.chatId, s);
                    return Boolean(n?.senderId === e.currentUserId);
                  }
                  return !0;
                })(e, n)
              );
            });
          return m && p && p > m ? void 0 : m ? u[m] : void 0;
        }
        function Be(e, t) {
          const n = (0, h.hd)(e, t.chatId);
          if (!n) return;
          const r = "id" in t ? se(e, t) : void 0,
            o = Boolean((0, l.yl)(t) || (0, l.dc)(t)),
            s = Boolean((0, l.zX)(t) || (0, l.QC)(t)),
            a = Boolean((0, l.wp)(t) || (0, l.gB)(t) || (0, l.zC)(t)),
            {
              canAutoLoadPhotoFromContacts: i,
              canAutoLoadPhotoInPrivateChats: d,
              canAutoLoadPhotoInGroups: c,
              canAutoLoadPhotoInChannels: u,
              canAutoLoadVideoFromContacts: f,
              canAutoLoadVideoInPrivateChats: m,
              canAutoLoadVideoInGroups: p,
              canAutoLoadVideoInChannels: g,
              canAutoLoadFileFromContacts: y,
              canAutoLoadFileInPrivateChats: b,
              canAutoLoadFileInGroups: v,
              canAutoLoadFileInChannels: w,
            } = e.settings.byKey;
          return o
            ? xe({
                global: e,
                chat: n,
                sender: r,
                canAutoLoadMediaFromContacts: i,
                canAutoLoadMediaInPrivateChats: d,
                canAutoLoadMediaInGroups: c,
                canAutoLoadMediaInChannels: u,
              })
            : s
            ? xe({
                global: e,
                chat: n,
                sender: r,
                canAutoLoadMediaFromContacts: f,
                canAutoLoadMediaInPrivateChats: m,
                canAutoLoadMediaInGroups: p,
                canAutoLoadMediaInChannels: g,
              })
            : !a ||
              xe({
                global: e,
                chat: n,
                sender: r,
                canAutoLoadMediaFromContacts: y,
                canAutoLoadMediaInPrivateChats: b,
                canAutoLoadMediaInGroups: v,
                canAutoLoadMediaInChannels: w,
              });
        }
        function xe(e) {
          let {
            global: t,
            chat: n,
            sender: r,
            canAutoLoadMediaFromContacts: o,
            canAutoLoadMediaInPrivateChats: s,
            canAutoLoadMediaInGroups: a,
            canAutoLoadMediaInChannels: i,
          } = e;
          const d = Boolean(
            r && ((0, h.nZ)(t, r.id) || (0, v.mB)(t, r.id)?.isContact)
          );
          return Boolean(
            (d && o) ||
              (!d && s && (0, l.L8)(n.id)) ||
              (a && (0, l.YE)(n)) ||
              (i && (0, l.WX)(n))
          );
        }
        function Oe(e) {
          const { serviceNotifications: t } = e,
            n = Math.max(
              ...t.map((e) => {
                let { id: t } = e;
                return t;
              })
            );
          return t.find((e) => {
            let { id: t, isDeleted: r } = e;
            return !r && t === n;
          });
        }
        function Re(e, t) {
          return Boolean(
            t &&
              (t.isProtected || De(e, t.chatId) || (0, l.G5)(t) || (0, l.qG)(t))
          );
        }
        function De(e, t) {
          return (0, h.hd)(e, t)?.isProtected || !1;
        }
        function Ue(e, t, n) {
          if ((0, h.hd)(e, t)?.isProtected) return !0;
          if (!n) return !1;
          const r = C(e, t);
          return n.some((e) => r[e]?.isProtected);
        }
        function _e(e, t, n) {
          if ((0, h.hd)(e, t)?.isProtected) return !1;
          if (!n) return !1;
          const r = C(e, t);
          return n
            .map((e) => r[e])
            .every(
              (e) =>
                e && !(0, l.G5)(e) && (e.isForwardingAllowed || (0, l.u7)(e))
            );
        }
        function $e(e, t) {
          const n = (0, h.hd)(e, t),
            r = n && (0, l.WX)(n) ? e.messages.sponsoredByChatId[t] : void 0;
          return r && r.expiresAt >= Math.round(Date.now() / 1e3) ? r : void 0;
        }
        function je(e, t) {
          if (t === o.zv8) return;
          const n = (0, l.L8)(t),
            r = e.config?.defaultReaction;
          if (!r) return;
          if (n) return r;
          const s = (0, h.AW)(e, t)?.enabledReactions;
          return s && (0, l.A3)(r, s) ? r : void 0;
        }
        function He(e) {
          const t = (0, v.g2)(e),
            { maxUserReactionsPremium: n = 3, maxUserReactionsDefault: r = 1 } =
              e.appConfig || {};
          return t ? n : r;
        }
        function Ve(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
            r < t;
            r++
          )
            n[r - 1] = arguments[r];
          let [o = (0, s.g0)()] = n;
          const { chatId: a, threadId: i } = I(e, o) || {};
          if (!a || !i) return;
          const d = E(e, a, i, "viewportIds", o);
          return d
            ? d
                .map((t) => {
                  const { senderId: n } = X(e, a, t) || {};
                  return n ? (0, v.mB)(e, n) : void 0;
                })
                .filter(Boolean)
            : void 0;
        }
        function ze(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
            r < t;
            r++
          )
            n[r - 1] = arguments[r];
          let [o = (0, s.g0)()] = n;
          return "scheduled" === I(e, o)?.type;
        }
        function We(e, t) {
          const n = (0, h.nZ)(e, t),
            r = t === o.f51 && (0, v.yp)(e, t);
          return Boolean(
            !n && !r && (0, l.L8)(t) && (0, v.K0)(e, t)?.wasOnline
          );
        }
        function Je(e, t) {
          const n = (function (e) {
            const t = e.content.text?.entities;
            return t?.filter((e) => e.type === r.C7.CustomEmoji);
          })(t);
          if (!n) return d.p;
          const o = n.map((t) => e.customEmojis.byId[t.documentId]);
          return o.every(Boolean)
            ? o
                .map((e) => e.stickerSetInfo)
                .reduce(
                  (e, t) => (
                    ("shortName" in t &&
                      e.some(
                        (e) => "shortName" in e && e.shortName === t.shortName
                      )) ||
                      ("id" in t &&
                        e.some((e) => "id" in e && e.id === t.id)) ||
                      e.push(t),
                    e
                  ),
                  []
                )
            : void 0;
        }
        function Ke(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
            r < t;
            r++
          )
            n[r - 1] = arguments[r];
          let [o = (0, s.g0)()] = n;
          const { messageIds: a, fromChatId: i } = (0, y.n)(
            e,
            o
          ).forwardMessages;
          if (!a) return !1;
          const d = C(e, i);
          return a.some((e) => {
            const t = d[e];
            return (
              Boolean(t.content.voice) || Boolean(t.content.video?.isRound)
            );
          });
        }
        function qe(e, t) {
          return e.translations.byChatId[t];
        }
        function Ge(e, t, n) {
          return qe(e, t)?.byLangCode[n] || {};
        }
        function Xe(e, t, n) {
          for (
            var r = arguments.length, o = new Array(r > 3 ? r - 3 : 0), a = 3;
            a < r;
            a++
          )
            o[a - 3] = arguments[a];
          let [i = (0, s.g0)()] = o;
          const d = (0, y.n)(e, i).requestedTranslations.byChatId[t];
          return d?.toLanguage || d?.manualMessages?.[n];
        }
        function Ye(e, t, n, r) {
          if (!r.replyToMsgId) return !1;
          const o = r?.replyToPeerId ?? n;
          if (t === o) return !0;
          const s = C(e, o)[r.replyToMsgId];
          return !(0, l.r$)(s);
        }
        function Qe(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), o = 2;
            o < n;
            o++
          )
            r[o - 2] = arguments[o];
          let [a = (0, s.g0)()] = r;
          const {
              messageIds: i,
              storyId: d,
              fromChatId: c,
            } = (0, y.n)(e, a).forwardMessages,
            u = (0, h.hd)(e, t);
          if ((!i && !d) || !u) return !1;
          if (d) return !0;
          const f = (0, h.AW)(e, t),
            m = C(e, c),
            p = (0, l.Q_)(u, f);
          return !i.some((e) =>
            (function (e, t) {
              const n = e.content.voice,
                r = e.content.video?.isRound,
                o = e.content.photo,
                s = e.content.video?.isGif,
                a = e.content.video && !r && !s,
                i = e.content.audio,
                d = e.content.document,
                c = e.content.sticker,
                u =
                  e.content.text &&
                  !n &&
                  !r &&
                  !c &&
                  !d &&
                  !i &&
                  !a &&
                  !o &&
                  !s;
              return (
                (n && !t.canSendVoices) ||
                (r && !t.canSendRoundVideos) ||
                (c && !t.canSendStickers) ||
                (d && !t.canSendDocuments) ||
                (i && !t.canSendAudios) ||
                (a && !t.canSendVideos) ||
                (o && !t.canSendPhotos) ||
                (s && !t.canSendGifs) ||
                (u && !t.canSendPlainText)
              );
            })(m[e], p)
          );
        }
        function Ze(e, t, n) {
          for (
            var r = arguments.length, o = new Array(r > 3 ? r - 3 : 0), a = 3;
            a < r;
            a++
          )
            o[a - 3] = arguments[a];
          let [i = (0, s.g0)()] = o;
          const { canTranslate: d, doNotTranslate: c } = e.settings.byKey,
            f = !n || !c.includes(n),
            m = (0, l.ZR)(t),
            p = (0, h.qZ)(e, t.chatId, i);
          return u.CM && d && f && m && !p;
        }
        function et(e, t, n) {
          const r = (0, h.hd)(e, t);
          if (r && r?.isForum) return (0, l.yt)(r, n);
        }
        function tt(e, t, n, o) {
          if (!(0, h.hd)(e, t)) return;
          const s = n === r.l3;
          return o || !s
            ? {
                type: "message",
                ...o,
                replyToMsgId: o?.replyToMsgId || Number(n),
                replyToTopId: o?.replyToTopId || (s ? void 0 : Number(n)),
              }
            : void 0;
        }
      },
      94137: (e, t, n) => {
        n.d(t, { BU: () => d, Cu: () => c, TC: () => i, f5: () => u });
        var r = n(14487),
          o = n(24896),
          s = n(19408),
          a = n(5056);
        function i(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1;
            i < t;
            i++
          )
            n[i - 1] = arguments[i];
          let [d = (0, r.g0)()] = n;
          const { chatId: c, threadId: u } = (0, s.Xf)(e, d) || {};
          if (!c || !u) return;
          const l = (0, o.W)(c, u);
          return (0, a.n)(e, d).middleSearch.byChatThreadKey[l];
        }
        function d(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1;
            i < t;
            i++
          )
            n[i - 1] = arguments[i];
          let [d = (0, r.g0)()] = n;
          const { chatId: c, threadId: u } = (0, s.Xf)(e, d) || {};
          if (!c || !u) return;
          const l = (0, o.W)(c, u);
          return (0, a.n)(e, d).sharedMediaSearch.byChatThreadKey[l];
        }
        function c(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1;
            i < t;
            i++
          )
            n[i - 1] = arguments[i];
          let [d = (0, r.g0)()] = n;
          const { chatId: c, threadId: u } = (0, s.Xf)(e, d) || {};
          if (!c || !u) return;
          const l = (0, o.W)(c, u);
          return (0, a.n)(e, d).chatMediaSearch.byChatThreadKey[l];
        }
        function u(e, t, n) {
          for (
            var s = arguments.length, i = new Array(s > 3 ? s - 3 : 0), d = 3;
            d < s;
            d++
          )
            i[d - 3] = arguments[d];
          let [c = (0, r.g0)()] = i;
          if (!t || !n) return;
          const u = (0, o.W)(t, n);
          return (0, a.n)(e, c).chatMediaSearch.byChatThreadKey[u];
        }
      },
      46211: (e, t, n) => {
        n.d(t, { I: () => a, P: () => s });
        var r = n(21133),
          o = n(19926);
        function s(e, t) {
          return (0, o.mB)(e, t) || (0, r.hd)(e, t);
        }
        function a(e, t) {
          return e.profilePhotosById[t];
        }
      },
      1903: (e, t, n) => {
        n.d(t, {
          Ms: () => c,
          R3: () => h,
          V9: () => a,
          _$: () => l,
          _b: () => d,
          dN: () => f,
          gV: () => u,
          gd: () => i,
        });
        var r = n(14487),
          o = n(46211),
          s = n(5056);
        function a(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1;
            o < t;
            o++
          )
            n[o - 1] = arguments[o];
          let [a = (0, r.g0)()] = n;
          const {
            storyViewer: { peerId: i, storyId: d },
          } = (0, s.n)(e, a);
          return { peerId: i, storyId: d };
        }
        function i(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1;
            o < t;
            o++
          )
            n[o - 1] = arguments[o];
          let [s = (0, r.g0)()] = n;
          const { peerId: i, storyId: d } = a(e, s);
          return Boolean(i) && Boolean(d);
        }
        function d(e, t) {
          return e.stories.byPeerId[t];
        }
        function c(e, t, n) {
          return d(e, t)?.byId[n];
        }
        function u(e, t) {
          const n = d(e, t);
          if (n?.pinnedIds?.length)
            return n.pinnedIds
              .map((e) => n.byId[e])
              .filter((e) => e && "isInProfile" in e && e.isInProfile);
        }
        function l(e, t) {
          const n = d(e, t);
          if (!n) return;
          if (!n.lastReadId) return n.orderedIds?.[0];
          const r = n.orderedIds.findIndex((e) => e === n.lastReadId);
          return n.orderedIds?.[r + 1];
        }
        function f(e, t) {
          return d(e, t)?.orderedIds?.[0];
        }
        function h(e, t, n, r, s, a, i) {
          const d = n || l(e, t) || f(e, t);
          if (!d) return;
          if (r) return { peerIds: [t], storyIdsByPeerId: { [t]: [d] } };
          const u = (0, o.P)(e, t),
            h = c(e, t, d);
          if (!u || !h) return;
          const p = (e.stories.byPeerId[t].lastReadId || 0) < h.id;
          if (s) {
            const n = m(e, t, p, i, a);
            return n?.length
              ? { peerIds: [t], storyIdsByPeerId: { [t]: n } }
              : void 0;
          }
          const {
              orderedPeerIds: { active: g, archived: y },
            } = e.stories,
            b = (u.areStoriesHidden ? y : g) ?? [],
            v = [],
            w = {};
          for (const t of b) {
            const n = m(e, t, p, i, a);
            n?.length && (v.push(t), (w[t] = n));
          }
          return v.length ? { peerIds: v, storyIdsByPeerId: w } : void 0;
        }
        function m(e, t, n, r, o) {
          const s = d(e, t),
            a = r ? "archiveIds" : o ? "profileIds" : "orderedIds",
            i = s?.[a];
          if (!s || !i?.length) return;
          if (!s.lastReadId || !n) return i.slice();
          const c = i.indexOf(s.lastReadId);
          return i.length > c + 1 ? i.slice(c + 1) : void 0;
        }
      },
      30163: (e, t, n) => {
        n.d(t, {
          Bm: () => u,
          Cz: () => I,
          Ij: () => c,
          Nr: () => v,
          Q3: () => g,
          WL: () => C,
          Wy: () => l,
          oZ: () => p,
          oe: () => b,
          r8: () => m,
          t0: () => A,
          tK: () => w,
          wg: () => h,
          yc: () => f,
        });
        var r = n(31481),
          o = n(14487),
          s = n(5056),
          a = n(19926);
        const i = { 1: "1️⃣", 3: "2️⃣", 6: "3️⃣", 12: "4️⃣", 24: "5️⃣" },
          d = { 1e3: "2️⃣", 2500: "3️⃣", 5e3: "4️⃣" };
        function c(e, t) {
          const { stickers: n } = e.stickers.favorite;
          return (
            n &&
            n.some((e) => {
              let { id: n } = e;
              return n === t.id;
            })
          );
        }
        function u(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
            r < t;
            r++
          )
            n[r - 1] = arguments[r];
          let [a = (0, o.g0)()] = n;
          return (0, s.n)(e, a).stickerSearch;
        }
        function l(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
            r < t;
            r++
          )
            n[r - 1] = arguments[r];
          let [a = (0, o.g0)()] = n;
          return (0, s.n)(e, a).gifSearch;
        }
        function f(e, t) {
          return "string" == typeof t
            ? e.stickers.setsById[t]
            : "id" in t
            ? e.stickers.setsById[t.id]
            : "isMissing" in t
            ? void 0
            : Object.values(e.stickers.setsById).find((e) => {
                let { shortName: n } = e;
                return n.toLowerCase() === t.shortName.toLowerCase();
              });
        }
        function h(e, t) {
          const n = e.stickers.added.setIds;
          let r = [];
          return (
            e.stickers.favorite.stickers.forEach((e) => {
              e.emoji === t && r.push(e);
            }),
            n?.forEach((n) => {
              const o = e.stickers.setsById[n].packs;
              o && (r = r.concat(o[t] || [], o[y(t)] || []));
            }),
            r
          );
        }
        function m(e, t) {
          const n = (0, a.g2)(e),
            r = e.customEmojis.added.setIds;
          let o = [];
          return (
            r?.forEach((n) => {
              const r = e.stickers.setsById[n].packs;
              r && (o = o.concat(r[t] || [], r[y(t)] || []));
            }),
            n
              ? o
              : o.filter((e) => {
                  let { isFree: t } = e;
                  return t;
                })
          );
        }
        function p(e, t) {
          const n = (0, a.g2)(e),
            r = e.customEmojis.added.setIds;
          let o = [];
          return (
            r?.forEach((n) => {
              const r = e.stickers.setsById[n].packs;
              if (!r) return;
              const s = Object.entries(r)
                .filter((e) => {
                  let [n] = e;
                  return t.includes(n) || t.includes(y(n));
                })
                .flatMap((e) => {
                  let [, t] = e;
                  return t;
                });
              o = o.concat(s);
            }),
            n
              ? o
              : o.filter((e) => {
                  let { isFree: t } = e;
                  return t;
                })
          );
        }
        function g(e) {
          return e.isEmoji && e.stickers?.some((e) => !e.isFree);
        }
        function y(e) {
          return e.replace("️", "");
        }
        function b(e, t) {
          const { animatedEmojis: n } = e;
          if (!n || !n.stickers) return;
          const r = y(t);
          return n.stickers.find((e) => e.emoji === t || e.emoji === r);
        }
        function v(e, t) {
          const { animatedEmojiEffects: n } = e;
          if (!n || !n.stickers) return;
          const r = y(t);
          return n.stickers.find((e) => e.emoji === t || e.emoji === r);
        }
        function w(e, t) {
          return e?.appConfig?.emojiSounds[y(t)];
        }
        function I(e, t) {
          return (
            "id" in t &&
            (t.id === e.appConfig?.defaultEmojiStatusesStickerSetId ||
              t.id === r.QkL)
          );
        }
        function A(e) {
          let t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
          const n = e.premiumGifts?.stickers;
          if (!n) return;
          const r = i[t];
          return n.find((e) => e.emoji === r) || n[0];
        }
        function C(e, t) {
          const n = e.premiumGifts?.stickers;
          if (!n || !t) return;
          let r;
          return (
            (r = t <= 1e3 ? d[1e3] : t < 2500 ? d[2500] : d[5e3]),
            n.find((e) => e.emoji === r) || n[0]
          );
        }
      },
      5056: (e, t, n) => {
        n.d(t, { n: () => o });
        var r = n(14487);
        function o(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1;
            o < t;
            o++
          )
            n[o - 1] = arguments[o];
          let [s = (0, r.g0)()] = n;
          return e.byTabId[s];
        }
      },
      88368: (e, t, n) => {
        function r(e, t) {
          return e.chats.topicsInfoById[t];
        }
        function o(e, t) {
          return r(e, t)?.topicsById;
        }
        function s(e, t, n) {
          return r(e, t)?.topicsById?.[n];
        }
        n.d(t, { S0: () => s, pS: () => o, xy: () => r });
      },
      19926: (e, t, n) => {
        n.d(t, {
          K0: () => s,
          U: () => i,
          ap: () => d,
          g2: () => c,
          gT: () => f,
          hc: () => l,
          mB: () => o,
          n_: () => u,
          vG: () => a,
          yp: () => h,
        });
        var r = n(90709);
        function o(e, t) {
          return e.users.byId[t];
        }
        function s(e, t) {
          return e.users.statusesById[t];
        }
        function a(e, t) {
          return e.users.fullInfoById[t];
        }
        function i(e, t) {
          return e.users.commonChatsById[t];
        }
        function d(e, t) {
          return a(e, t)?.isBlocked;
        }
        function c(e) {
          return (
            !!e.currentUserId &&
            Boolean(e.users.byId[e.currentUserId].isPremium)
          );
        }
        function u(e) {
          return e.appConfig?.isPremiumPurchaseBlocked ?? !0;
        }
        function l(e) {
          return e.appConfig?.isGiveawayGiftsPurchaseAvailable ?? !0;
        }
        function f(e, t) {
          const n = t.replace(/[^0-9]/g, "");
          return Object.values(e.users.byId).find((e) => e?.phoneNumber === n);
        }
        function h(e, t) {
          const n = o(e, t);
          if (n && (0, r.tv)(n)) return n;
        }
      },
      63527: (e, t, n) => {
        n.d(t, { A: () => s });
        var r = n(19129),
          o = n(98255);
        function s(e) {
          const t = (0, o.A)(e);
          return (0, r.A)(t);
        }
      },
      98255: (e, t, n) => {
        n.d(t, { A: () => d });
        var r = n(37932),
          o = n(13439),
          s = n(22237),
          a = n(35297);
        const i = new Map();
        (0, r.DW)((e) => {
          for (const [t, { setter: n }] of i) n(t(e));
        });
        const d = function (e) {
          let t = i.get(e);
          if (!t) {
            const [n, r] = (0, s.n5)(e((0, o.mS)()));
            (t = { clientsCount: 0, getter: n, setter: r }), i.set(e, t);
          }
          return (
            (0, a.A)(() => {
              const t = i.get(e);
              return (
                t.clientsCount++,
                () => {
                  t.clientsCount--, t.clientsCount || i.delete(e);
                }
              );
            }, [e]),
            t.getter
          );
        };
      },
      57675: (e, t, n) => {
        n.d(t, { A: () => u });
        var r = n(84051),
          o = n(66644),
          s = n(91800),
          a = n(16581),
          i = n(17712),
          d = n(39751);
        const c = 200;
        function u(e, t, n, u) {
          const l = (0, r.li)(!0),
            f = (0, r.li)(),
            [h, m] = (0, r.J0)(!u),
            [p, g] = (0, r.J0)(h);
          (0, r.Nf)(() => {
            const t = (n || e).current;
            !u &&
              t &&
              (0, o.RK)(() => {
                t.style.maxHeight = p ? `${f.current}px` : "";
              });
          }, [n, p, u, e]);
          const y = (0, i.A)(() => {
              if (u || !e.current) return;
              const n = e.current,
                { lineHeight: r, totalLines: o } = (0, s.A)(n);
              o > t ? ((f.current = r * t), m(!0)) : (m(!1), g(!1));
            }),
            b = (0, a.A)(() => (0, o.YS)(y), [y], c);
          (0, r.Nf)(() => {
            !u &&
              l.current &&
              (0, o.gm)(
                () => (
                  y(),
                  () => {
                    l.current = !1;
                    const t = (n || e).current;
                    t &&
                      (t.style.maxHeight = f.current ? `${f.current}px` : "");
                  }
                )
              );
          }, [n, u, y, e]);
          const { width: v } = (0, d.A)();
          return (
            (0, r.vJ)(() => {
              if (u) m(!1), g(!1);
              else {
                if (l.current) return;
                b();
              }
            }, [b, u, v]),
            { isCollapsed: p, isCollapsible: h, setIsCollapsed: g }
          );
        }
      },
      28021: (e, t, n) => {
        n.d(t, { A: () => c });
        var r = n(84051),
          o = n(71322);
        function s(e, t, n) {
          var r;
          return (
            (t =
              "symbol" ==
              typeof (r = (function (e, t) {
                if ("object" != typeof e || !e) return e;
                var n = e[Symbol.toPrimitive];
                if (void 0 !== n) {
                  var r = n.call(e, "string");
                  if ("object" != typeof r) return r;
                  throw new TypeError(
                    "@@toPrimitive must return a primitive value."
                  );
                }
                return String(e);
              })(t))
                ? r
                : r + "") in e
              ? Object.defineProperty(e, t, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = n),
            e
          );
        }
        const a = "http://www.w3.org/2000/svg",
          i = new Map();
        class d {
          constructor(e) {
            (this.color = e),
              s(this, "filterId", void 0),
              s(this, "element", void 0),
              s(this, "referenceCount", 0),
              (this.filterId = `color-filter-${e.slice(1)}`),
              (this.element = document.createElementNS(a, "svg")),
              (this.element.width.baseVal.valueAsString = "0px"),
              (this.element.height.baseVal.valueAsString = "0px");
            const t = document.createElementNS(a, "defs");
            this.element.appendChild(t);
            const n = document.createElementNS(a, "filter");
            (n.id = this.filterId),
              n.setAttribute("color-interpolation-filters", "sRGB"),
              t.appendChild(n);
            const r = document.createElementNS(a, "feColorMatrix");
            r.setAttribute("type", "matrix");
            const i = (0, o.E2)(e);
            r.setAttribute(
              "values",
              `0 0 0 0 ${i.r / 255} 0 0 0 0 ${i.g / 255} 0 0 0 0 ${
                i.b / 255
              } 0 0 0 1 0`
            ),
              n.appendChild(r),
              document.body.appendChild(this.element);
          }
          getFilterId() {
            return (this.referenceCount += 1), this.filterId;
          }
          removeReference() {
            (this.referenceCount -= 1),
              0 === this.referenceCount && this.element.remove();
          }
          isUsed() {
            return this.referenceCount > 0;
          }
        }
        function c(e, t) {
          if (
            ((0, r.vJ)(() => {
              if (e)
                return () => {
                  const t = i.get(e);
                  t && (t.removeReference(), t.isUsed() || i.delete(t.color));
                };
            }, [e]),
            !e)
          )
            return;
          if (i.has(e)) return u(i.get(e).getFilterId(), t);
          const n = new d(e);
          return i.set(e, n), u(n.getFilterId(), t);
        }
        function u(e, t) {
          return t ? `url(#${e})` : `filter: url(#${e});`;
        }
      },
      86974: (e, t, n) => {
        n.d(t, { A: () => c });
        var r = n(84051),
          o = n(59852),
          s = n(17712),
          a = n(93545);
        const i = "color",
          d = `50ms ${i} linear`;
        function c(e, t) {
          const [n, c] = (0, r.J0)(),
            u = (0, s.A)(() => {
              if (!e.current || t) return void c(void 0);
              const n = (0, o.eH)(getComputedStyle(e.current), i);
              c(n);
            });
          return (
            (0, a.A)(e, u, t),
            (0, r.Nf)(() => {
              const n = e.current;
              if (n && !t)
                return (
                  n.style.setProperty("transition", d, "important"),
                  () => {
                    n.style.removeProperty("transition");
                  }
                );
            }, [t, e]),
            (0, r.vJ)(() => {
              const n = e.current;
              if (n && (u(), !t))
                return (
                  n.addEventListener("transitionend", r),
                  () => {
                    n.removeEventListener("transitionend", r);
                  }
                );
              function r(e) {
                e.propertyName === i && u();
              }
            }, [t, e, u]),
            n
          );
        }
      },
      43874: (e, t, n) => {
        n.d(t, { Ay: () => b, Bb: () => g, Ny: () => p });
        var r = n(84051),
          o = n(31481),
          s = n(46536),
          a = n(82393),
          i = n(43503),
          d = n(30857);
        const c = new Map(),
          u = (0, s.h)();
        let l, f, h, m;
        function p() {
          return l;
        }
        function g() {
          return f;
        }
        function y() {
          (l = c.get("mobile")?.matches || !1),
            (f = !l && (c.get("tablet")?.matches || !1)),
            (h = c.get("landscape")?.matches || !1),
            (m = c.get("touch")?.matches || !1),
            (0, i.u)(),
            u.runCallbacks();
        }
        function b() {
          const e = (0, d.A)();
          return (
            (0, r.vJ)(() => u.addCallback(e), [e]),
            {
              isMobile: l,
              isTablet: f,
              isLandscape: h,
              isDesktop: !l && !f,
              isTouchScreen: m,
            }
          );
        }
        !(function () {
          const e = window.matchMedia(
            `(max-width: ${o.c2m}px),   (max-width: ${o.O4t}px and max-height: ${o.f84}px)`
          );
          c.set("mobile", e), e.addEventListener("change", y);
          const t = window.matchMedia(`(max-width: ${o.j7z}px)`);
          c.set("tablet", t), t.addEventListener("change", y);
          const n = window.matchMedia(
            a.pz
              ? "(orientation: landscape)"
              : "screen and (min-device-aspect-ratio: 1/1) and (orientation: landscape)"
          );
          c.set("landscape", n), n.addEventListener("change", y);
          const r = window.matchMedia("(pointer: coarse)");
          c.set("touch", r), r.addEventListener("change", y);
        })(),
          y();
      },
      56863: (e, t, n) => {
        n.d(t, { A: () => o });
        var r = n(84051);
        const o = (e, t, n) => {
          const [o, s] = (0, r.J0)(!1),
            [a, i] = (0, r.J0)(),
            [d, c] = (0, r.J0)(n);
          return (
            (0, r.vJ)(() => {
              s(!0);
              let t = !1;
              return (
                e().then(
                  (e) => {
                    t || (s(!1), c(e));
                  },
                  (e) => {
                    t || (s(!1), i(e));
                  }
                ),
                () => {
                  t = !0;
                }
              );
            }, t),
            { isLoading: o, error: a, result: d }
          );
        };
      },
      71533: (e, t, n) => {
        n.d(t, { A: () => d });
        var r = n(84051),
          o = n(22986),
          s = n(80853),
          a = n(37836),
          i = n(17712);
        const d = function () {
          let e =
              arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
            t = arguments.length > 1 ? arguments[1] : void 0,
            n = arguments.length > 2 ? arguments[2] : void 0;
          const [d, c] = (0, r.J0)(!e),
            [u, l] = (0, r.J0)(!1),
            [f, h] = (0, r.J0)(0),
            [m, p] = (0, r.J0)([]),
            g = (0, r.Kr)(() => (0, a.sg)(c, 200, !1, !0), []),
            y = (0, i.A)((e) => {
              const r = e.currentTarget;
              if (r.duration < 0.1) n?.();
              else if (("timeupdate" === e.type && t?.(e), !(0, s.f)(r))) {
                if (r.buffered.length) {
                  const e = (function (e, t) {
                      const n = [];
                      for (let r = 0; r < e.length; r++)
                        n.push({ start: e.start(r) / t, end: e.end(r) / t });
                      return n;
                    })(r.buffered, r.duration),
                    t = e.reduce((e, t) => {
                      let { start: n, end: r } = t;
                      return e + r - n;
                    }, 0);
                  h(t / r.duration), p((t) => ((0, o.T)(t, e) ? t : e));
                }
                g(r.readyState >= 3 || r.currentTime > 0),
                  l((e) => e || r.readyState > 3);
              }
            });
          return {
            isReady: u,
            isBuffered: d,
            bufferedProgress: f,
            bufferedRanges: m,
            bufferingHandlers: {
              onPLay: y,
              onLoadedData: y,
              onPlaying: y,
              onLoadStart: y,
              onPause: y,
              onTimeUpdate: y,
              onProgress: y,
            },
            checkBuffering(e) {
              g(e.readyState >= 3);
            },
          };
        };
      },
      94519: (e, t, n) => {
        n.d(t, { A: () => u });
        var r = n(84051),
          o = n(43336),
          s = n(17712),
          a = n(93545),
          i = n(46637),
          d = n(672);
        const c = 150;
        function u(e, t) {
          const [n, u] = (0, r.J0)(),
            [l, f] = (0, r.J0)(),
            h = (0, s.A)(() => {
              const n = e.current,
                r = t?.current;
              if (!n || !r) return;
              if (!r.offsetWidth || !r.offsetHeight) return;
              const s =
                n.classList.contains("sticker-set-cover") ||
                n.classList.contains("sticker-reaction")
                  ? n
                  : n.querySelector("img");
              if (!s) return;
              const a = s.getBoundingClientRect(),
                i = r.getBoundingClientRect();
              u((0, o.LI)((a.left - i.left) / i.width, 4) || 0),
                f((0, o.LI)((a.top - i.top) / i.height, 4) || 0);
            });
          (0, r.vJ)(h, [h]);
          const m = (0, d.A)(h, [h], c);
          return (
            (0, a.A)(t, m),
            (0, i.A)(t, m),
            (0, r.Kr)(
              () => (void 0 !== n && void 0 !== l ? { x: n, y: l } : void 0),
              [n, l]
            )
          );
        }
      },
      14: (e, t, n) => {
        n.d(t, { A: () => o });
        var r = n(73767);
        function o(e) {
          let t =
              arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
          const o = (0, r.A)(e, t);
          return n || null != e ? e : o;
        }
      },
      16581: (e, t, n) => {
        n.d(t, { A: () => s });
        var r = n(84051),
          o = n(37836);
        function s(e, t, n) {
          let s =
              arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
            a = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
          const i = (0, r.hb)(e, t);
          return (0, r.Kr)(() => (0, o.sg)(i, n, !s, !a), [i, n, s, a]);
        }
      },
      83414: (e, t, n) => {
        n.d(t, { A: () => i });
        var r = n(84051),
          o = n(5718),
          s = n(41257),
          a = n(35297);
        const i = function (e, t) {
          let n =
            arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
          const i = t ? e : () => e;
          t ?? (t = [e]);
          const [d, c] = (0, r.Ul)(),
            u = (0, s.i)(i);
          function l() {
            const e = u.current;
            n ? e(c) : c(e());
          }
          return (0, a.A)(l, t), (0, o.R)(l, t), d;
        };
      },
      19129: (e, t, n) => {
        n.d(t, { A: () => d });
        var r = n(84051),
          o = n(30857),
          s = n(5718),
          a = n(41257),
          i = n(35297);
        const d = function (e, t) {
          let n =
            arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
          const d = t ? e : () => e();
          t ?? (t = [e]);
          const c = (0, r.li)(),
            u = (0, o.A)(),
            l = (0, a.i)(d);
          function f() {
            let e =
              arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            const t = l.current;
            if (n)
              t((e) => {
                c.current !== e && ((c.current = e), u());
              });
            else {
              const n = t();
              c.current !== n && ((c.current = n), e || u());
            }
          }
          return (
            (0, i.A)(() => {
              f(!0);
            }, t),
            (0, s.R)(f, t),
            c.current
          );
        };
      },
      15283: (e, t, n) => {
        n.d(t, { A: () => o });
        var r = n(84051);
        const o = function (e) {
          (0, r.vJ)(e, []);
        };
      },
      82117: (e, t, n) => {
        n.d(t, { A: () => o });
        var r = n(84051);
        const o = (e, t, n) => {
          const o = (0, r.li)();
          return (0, r.vJ)(
            () => {
              const n = o.current;
              return (o.current = t), e(n || []);
            },
            t,
            n
          );
        };
      },
      77523: (e, t, n) => {
        n.d(t, { A: () => s });
        var r = n(84051),
          o = n(82393);
        const s = (e) => {
          const t = (0, r.li)(!1),
            n = (0, r.li)(window.screenX),
            s = (0, r.li)(window.screenY),
            a = (0, r.li)(0);
          (0, r.vJ)(() => {
            const r = e.current;
            if (!r || !o.cp || !o.MP) return;
            const i = (e) => {
                (a.current = 0),
                  t.current &&
                    (e.preventDefault(), e.stopPropagation(), (t.current = !1));
              },
              d = (e) => {
                t.current && (e.preventDefault(), e.stopPropagation());
              },
              c = (e) => {
                1 === e.buttons &&
                  ((a.current += Math.sqrt(
                    (n.current - window.screenX) ** 2 +
                      (s.current - window.screenY) ** 2
                  )),
                  (n.current = window.screenX),
                  (s.current = window.screenY),
                  !t.current && a.current > 5 && (t.current = !0));
              },
              u = (e) => {
                e.currentTarget === e.target &&
                  window.electron?.handleDoubleClick();
              };
            return (
              r.addEventListener("click", i),
              r.addEventListener("mousedown", d),
              r.addEventListener("mousemove", c),
              r.addEventListener("dblclick", u),
              () => {
                r.removeEventListener("click", i),
                  r.removeEventListener("mouseup", d),
                  r.removeEventListener("mousemove", c),
                  r.removeEventListener("dblclick", u);
              }
            );
          }, [e]);
        };
      },
      37661: (e, t, n) => {
        n.d(t, { A: () => o });
        var r = n(84051);
        const o = function () {
          let e =
              arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
            t = arguments.length > 1 ? arguments[1] : void 0;
          const [n, o] = (0, r.J0)(e, t);
          return [
            n,
            (0, r.hb)(() => {
              o(!0);
            }, []),
            (0, r.hb)(() => {
              o(!1);
            }, []),
          ];
        };
      },
      30857: (e, t, n) => {
        n.d(t, { A: () => o });
        var r = n(84051);
        const o = () => {
          const [, e] = (0, r.J0)(!1);
          return (0, r.hb)(() => {
            e((e) => !e);
          }, []);
        };
      },
      84080: (e, t, n) => {
        n.d(t, { Ay: () => d, KE: () => c });
        var r = n(84051),
          o = n(46536),
          s = n(17712);
        const a = (0, o.h)(),
          i = (0, o.h)();
        function d(e, t) {
          let n =
            arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
          const o = (0, s.A)(e),
            d = (0, s.A)(t);
          (0, r.vJ)(() => {
            if (!n)
              return (
                (0, r.OV)() && o(),
                a.addCallback(o),
                i.addCallback(d),
                () => {
                  i.removeCallback(d), a.removeCallback(o);
                }
              );
          }, [n, d, o]);
        }
        function c(e, t) {
          const n = (0, r.hb)(e, t),
            o = (0, r.li)(!1);
          return (0, r.Kr)(
            () =>
              function () {
                for (
                  var e = arguments.length, t = new Array(e), s = 0;
                  s < e;
                  s++
                )
                  t[s] = arguments[s];
                if (!o.current) {
                  if (!(0, r.OV)()) return void n(...t);
                  o.current = !0;
                  const e = i.addCallback(() => {
                    n(...t), e(), (o.current = !1);
                  });
                }
              },
            [n]
          );
        }
        r.OV.subscribe(() => {
          (0, r.OV)() ? a.runCallbacks() : i.runCallbacks();
        });
      },
      26072: (e, t, n) => {
        n.d(t, { A: () => k });
        var r = n(84051),
          o = n(37932),
          s = n(31481),
          a = n(66644),
          i = n(82393),
          d = n(15283),
          c = n(17712),
          u = n(35297);
        const l = `${window.location.pathname}${window.location.search}`,
          f = Number(new Date());
        let h,
          m,
          p = !1,
          g = [],
          y = [],
          b = !1;
        function v() {
          b &&
            setTimeout(() => {
              b = !1;
            }, 350);
        }
        function w() {
          const e = g.filter((e) => "go" === e.type),
            t = g.filter((e) => "go" !== e.type),
            n = e.reduce((e, t) => e + t.delta, 0);
          (g = []), n && (window.history.go(n), t.length) ? y.push(...t) : I(t);
        }
        function I(e) {
          e.forEach((e) => window.history[e.type](e.data, "", e.hash));
        }
        function A(e) {
          g.length || (0, a.YS)(w), g.push(e);
        }
        function C() {
          (m = 0),
            (h = [{ index: 0, onBack: () => window.history.back() }]),
            window.history.replaceState(
              { index: 0, historyUniqueSessionId: f },
              "",
              l
            );
        }
        function S() {
          let e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
          for (let t = m - 1; t > 0 && h[t].isClosed; t--) e++;
          return e && ((p = !0), A({ type: "go", delta: -e })), e;
        }
        function E() {
          let e = !1;
          for (let t = h.length - 1; t > 0; t--)
            h[t].isClosed ||
              (!e && b && ((0, o.ko)().disableHistoryAnimations(), (e = !0)),
              h[t].onBack?.());
          C();
        }
        function k(e) {
          let {
            isActive: t,
            shouldBeReplaced: n,
            shouldResetUrlHash: o,
            hash: s,
            onBack: a,
          } = e;
          const i = (0, c.A)(a),
            l = (0, r.li)(),
            p = (0, r.li)(!1),
            g = (0, r.li)(!0),
            y = (0, r.hb)(
              function () {
                const e =
                  (arguments.length > 0 &&
                    void 0 !== arguments[0] &&
                    arguments[0]) ||
                  h[m].shouldBeReplaced;
                (l.current = e ? m : ++m), (m = l.current);
                const t = h[l.current];
                t && !t.isClosed && t.markReplaced?.(),
                  (h[l.current] = {
                    index: l.current,
                    onBack: i,
                    shouldBeReplaced: n,
                    markReplaced: () => {
                      p.current = !0;
                    },
                  }),
                  A({
                    type: e ? "replaceState" : "pushState",
                    data: { index: l.current, historyUniqueSessionId: f },
                    hash: s ? `#${s}` : o ? " " : void 0,
                  });
              },
              [s, n, o]
            ),
            b = (0, r.hb)(() => {
              l.current &&
                h[l.current] &&
                !p.current &&
                ((h[l.current].isClosed = !0),
                (p.current = !0),
                l.current !== m || n || (m -= S()));
            }, [n]);
          (0, d.A)(
            () => (
              (g.current = !1),
              () => {
                t && !p.current && b();
              }
            )
          ),
            (0, u.A)(
              (e) => {
                let [n] = e;
                n !== t && ((g.current && !t) || (t ? y() : b()));
              },
              [t, b, y]
            );
        }
        s.W75 &&
          ((window.TEST_getHistoryState = () => h),
          (window.TEST_getHistoryCursor = () => m)),
          i.pz &&
            (window.addEventListener("touchstart", function (e) {
              const t = e.touches[0].pageX;
              (t <= 300 || t >= window.innerWidth - 300) && (b = !0);
            }),
            window.addEventListener("touchend", v),
            window.addEventListener("popstate", v)),
          C(),
          window.addEventListener("popstate", (e) => {
            let { state: t } = e;
            if (p) return (p = !1), void (y.length && (I(y), (y = [])));
            if (!t) return E(), void window.location.hash;
            const { index: n, historyUniqueSessionId: r } = t;
            if (r === f) {
              if (n !== m)
                if (n < m) {
                  let e = 0,
                    t = !1;
                  for (let r = m; r > n - e; r--)
                    h[r].isClosed
                      ? e++
                      : (!t &&
                          b &&
                          ((0, o.ko)().disableHistoryAnimations(), (t = !0)),
                        h[r].onBack?.());
                  const r = S(e);
                  (m += n - m - r), m < 0 && (m = 0);
                } else n > m && ((p = !0), A({ type: "go", delta: -(n - m) }));
            } else E();
          });
      },
      5912: (e, t, n) => {
        n.d(t, { BL: () => d, Vz: () => u, mv: () => c });
        var r = n(84051),
          o = n(46536),
          s = n(37836),
          a = n(84080),
          i = n(17712);
        function d(e, t) {
          let {
            rootRef: n,
            throttleMs: d,
            throttleScheduler: c,
            debounceMs: u,
            shouldSkipFirst: l,
            margin: f,
            threshold: h,
            isDisabled: m,
          } = e;
          const p = (0, r.li)(),
            g = (0, r.li)(),
            y = (0, r.li)(0),
            b = (0, r.li)();
          g.current = t;
          const v = (0, i.A)(() => {
              y.current++;
            }),
            w = (0, i.A)(() => {
              y.current &&
                (y.current--,
                !y.current && b.current && (b.current(), (b.current = void 0)));
            });
          return (
            (0, a.Ay)(v, w),
            (0, r.vJ)(() => {
              if (!m)
                return () => {
                  p.current &&
                    (p.current.observer.disconnect(),
                    p.current.destroy(),
                    (p.current = void 0));
                };
            }, [m]),
            {
              observe: (0, i.A)((e, t) => {
                p.current ||
                  (function () {
                    const e = new Map(),
                      t = new Map();
                    let r;
                    function a() {
                      if (y.current) return void (b.current = r);
                      const n = Array.from(t.values());
                      n.forEach((t) => {
                        const n = e.get(t.target);
                        n?.runCallbacks(t);
                      }),
                        g.current && g.current(n),
                        t.clear();
                    }
                    r =
                      "function" == typeof c
                        ? (0, s.nb)(c, a)
                        : d
                        ? (0, s.nF)(a, d, !l)
                        : u
                        ? (0, s.sg)(a, u, !l)
                        : a;
                    const i = new IntersectionObserver(
                      (e) => {
                        e.forEach((e) => {
                          t.set(e.target, e);
                        }),
                          y.current ? (b.current = r) : r();
                      },
                      {
                        root: n.current,
                        rootMargin: f ? `${f}px` : void 0,
                        threshold: h,
                      }
                    );
                    p.current = {
                      observer: i,
                      addCallback: function (t, n) {
                        e.get(t) || e.set(t, (0, o.h)()),
                          e.get(t).addCallback(n);
                      },
                      removeCallback: function (t, n) {
                        const r = e.get(t);
                        r &&
                          (r.removeCallback(n),
                          r.hasCallbacks() || e.delete(t));
                      },
                      destroy: function () {
                        e.clear(), i.disconnect();
                      },
                    };
                  })();
                const r = p.current;
                return (
                  r.observer.observe(e),
                  t && r.addCallback(e, t),
                  () => {
                    t && r.removeCallback(e, t), r.observer.unobserve(e);
                  }
                );
              }),
              freeze: v,
              unfreeze: w,
            }
          );
        }
        function c(e, t, n) {
          const o = (0, i.A)(n);
          (0, r.vJ)(() => (t ? t(e.current, o) : void 0), [o, t, e]);
        }
        function u(e, t, n) {
          const [o, s] = (0, r.J0)(!t);
          return (
            c(e, t, (e) => {
              s(e.isIntersecting), n && n(e);
            }),
            o
          );
        }
      },
      10328: (e, t, n) => {
        n.d(t, { A: () => a });
        var r = n(84051),
          o = n(66644),
          s = n(17712);
        const a = (e, t, n, a, i) => {
          const [d, c] = (0, r.J0)(-1);
          return (
            (0, r.vJ)(() => {
              c(-1);
              const n = e.current;
              t &&
                n &&
                !i &&
                ((0, o.RK)(() => {
                  n.tabIndex = -1;
                }),
                (0, o.YS)(() => n.focus()));
            }, [e, t, i]),
            (0, s.A)((t) => {
              const r = e.current;
              if (!r) return;
              if (13 === t.keyCode && n) return void n(d);
              if (38 !== t.keyCode && 40 !== t.keyCode) return;
              const o = document.activeElement,
                s = Array.from(a ? r.querySelectorAll(a) : r.children);
              let i = (o && s.indexOf(o)) || d;
              if (38 === t.keyCode && i > 0) i--;
              else if (40 === t.keyCode && i < s.length - 1) i++;
              else {
                if (1 !== s.length) return;
                i = 0;
              }
              const u = s[i];
              u && (c(i), u.focus());
            })
          );
        };
      },
      17712: (e, t, n) => {
        n.d(t, { A: () => s });
        var r = n(84051),
          o = n(41257);
        function s(e) {
          const t = (0, o.i)(e);
          return (0, r.hb)(function () {
            for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++)
              n[r] = arguments[r];
            return t.current?.(...n);
          }, []);
        }
      },
      62587: (e, t, n) => {
        n.d(t, { A: () => c });
        var r = n(84051),
          o = n(23174),
          s = n(29807),
          a = n(58554),
          i = n(63527),
          d = n(30857);
        const c = function (e) {
          let t =
              arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : o.qZ.BlobUrl,
            c = arguments.length > 3 ? arguments[3] : void 0;
          const u = e ? a.Ih(e) : void 0,
            l = (0, d.A)(),
            f = (0, i.A)(s.nIz);
          return (
            (0, r.vJ)(() => {
              if (!t && e && !u) {
                const t = Date.now();
                a.hd(e, n).then(() => {
                  const e = Date.now() - t;
                  !c || e >= c ? l() : setTimeout(l, c - e);
                });
              }
            }, [t, e, u, n, c, f]),
            u
          );
        };
      },
      37960: (e, t, n) => {
        n.d(t, { A: () => o });
        var r = n(21511);
        function o(e, t) {
          const n = Boolean(e),
            { ref: o } = (0, r.A)({
              isOpen: n,
              noMountTransition: n,
              className: "slow",
              ...t,
            });
          return o;
        }
      },
      83057: (e, t, n) => {
        n.d(t, { A: () => o });
        var r = n(50680);
        function o(e) {
          const t = Boolean(e),
            { transitionClassNames: n } = (0, r.A)(t, void 0, t, "slow");
          return n;
        }
      },
      80464: (e, t, n) => {
        n.d(t, { A: () => a });
        var r = n(84051),
          o = n(80089),
          s = n(30857);
        const a = function (e, t) {
          let n =
              arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            a = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
          const i = (0, o.gt)(e, t),
            d = (0, s.A)();
          return (
            (0, r.vJ)(() => {
              if (a) return (0, o.If)(d);
            }, [a, d]),
            (0, r.vJ)(() => {
              n || i || (0, o.Vw)(e).then(d);
            }, [e, d, i, t, n]),
            i
          );
        };
      },
      59030: (e, t, n) => {
        n.d(t, { A: () => a });
        var r = n(47985),
          o = n(15283),
          s = n(30857);
        const a = () => {
          const e = (0, s.A)();
          return (0, o.A)(() => r.DW(e)), r.Yw();
        };
      },
      73767: (e, t, n) => {
        n.d(t, { A: () => o });
        var r = n(84051);
        const o = function (e, t) {
          const n = (0, r.li)(),
            { current: o } = n;
          return (t && void 0 === e) || (n.current = e), o;
        };
      },
      34780: (e, t, n) => {
        n.d(t, { Ay: () => f, c_: () => u, w4: () => l });
        var r = n(84051),
          o = n(46536),
          s = n(17712);
        const a = (0, o.h)(),
          i = (0, o.h)();
        let d,
          c = !1;
        function u() {
          return c;
        }
        function l() {
          return (
            c || ((c = !0), a.runCallbacks()),
            d && (clearTimeout(d), (d = void 0)),
            function () {
              d && (clearTimeout(d), (d = void 0)), (c = !1), i.runCallbacks();
            }
          );
        }
        const f = function (e, t) {
          let n =
            arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
          const o = (0, s.A)(e),
            d = (0, s.A)(t);
          (0, r.vJ)(() => {
            if (!n)
              return (
                c && o(),
                a.addCallback(o),
                i.addCallback(d),
                () => {
                  i.removeCallback(d), a.removeCallback(o);
                }
              );
          }, [n, o, d]);
        };
      },
      93545: (e, t, n) => {
        n.d(t, { A: () => i });
        var r = n(84051),
          o = n(46536),
          s = n(41257);
        const a = new Map();
        function i(e, t) {
          let n =
            arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
          const i = (0, s.i)(t);
          (0, r.vJ)(() => {
            const t = e?.current;
            if (!t || n) return;
            const r = (e) => {
              let [t] = e;
              (0 === t.contentRect.width && 0 === t.contentRect.height) ||
                i.current(t);
            };
            let [s, d] = a.get(t) || [void 0, void 0];
            return (
              s ||
                ((d = (0, o.h)()),
                (s = new ResizeObserver(d.runCallbacks)),
                a.set(t, [s, d]),
                s.observe(t)),
              d.addCallback(r),
              () => {
                d.removeCallback(r),
                  d.hasCallbacks() ||
                    (s.unobserve(t), s.disconnect(), a.delete(t));
              }
            );
          }, [n, i, e]);
        }
      },
      46637: (e, t, n) => {
        n.d(t, { A: () => d });
        var r = n(84051),
          o = n(66644),
          s = n(46536),
          a = n(17712);
        const i = new Map();
        function d(e, t) {
          let n =
            arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
          const d = (0, a.A)(t);
          (0, r.vJ)(() => {
            const t = e && "current" in e ? e.current : e;
            if (!t || n) return;
            const a = new Map();
            function c() {
              for (const e of a.values()) e.target.offsetParent && d(e);
              a.clear();
            }
            const u = (e) => {
              let [t] = e;
              a.set(t.target, t),
                (0, r.OV)()
                  ? r.OV.once(() => {
                      (0, o.YS)(c);
                    })
                  : c();
            };
            let [l, f] = i.get(t) || [void 0, void 0];
            return (
              l ||
                ((f = (0, s.h)()),
                (l = new IntersectionObserver(f.runCallbacks)),
                i.set(t, [l, f]),
                l.observe(t)),
              f.addCallback(u),
              () => {
                f.removeCallback(u),
                  f.hasCallbacks() ||
                    (l.unobserve(t), l.disconnect(), i.delete(t));
              }
            );
          }, [n, e]);
        }
      },
      21511: (e, t, n) => {
        n.d(t, { A: () => h });
        var r = n(84051),
          o = n(61433),
          s = n(66644),
          a = n(83414),
          i = n(19129),
          d = n(17712),
          c = n(41257),
          u = n(35297);
        const l = (e, t) => {
            const n = (0, r.li)();
            return (0, u.A)(() => {
              const r = n.current;
              return (n.current = t), e(r || []);
            }, t);
          },
          f = 350;
        function h(e) {
          const {
              isOpen: t,
              noMountTransition: n = !1,
              noOpenTransition: h = !1,
              noCloseTransition: m = !1,
              closeDuration: p = f,
              className: g = "fast",
              prefix: y = "",
              onCloseAnimationEnd: b,
            } = e,
            v = (0, r.li)(null),
            w = e.ref || v,
            I = (0, r.li)(),
            [A, C] = (0, r.Ul)(),
            S = (0, c.i)({
              closeDuration: p,
              noMountTransition: n,
              noOpenTransition: h,
              noCloseTransition: m,
            }),
            E = (0, d.A)(b);
          l(
            (e) => {
              let [n] = e;
              const r = S.current;
              t
                ? (I.current && (clearTimeout(I.current), (I.current = void 0)),
                  r.noOpenTransition || (void 0 === n && r.noMountTransition)
                    ? C("open")
                    : (C("scheduled-open"),
                      (0, s.YS)(() => {
                        C("open");
                      })))
                : void 0 === n || r.noCloseTransition
                ? C("closed")
                : (C("closing"),
                  (I.current = window.setTimeout(() => {
                    C("closed"), E();
                  }, r.closeDuration)));
            },
            [t]
          );
          const k = (0, d.A)(() => {
            const e = w.current;
            if (!e) return;
            !1 !== g && ((0, o.YM)(e, "opacity-transition"), (0, o.YM)(e, g));
            const t = A(),
              n = "closed" !== t,
              r = "open" === t,
              s = "closing" === t;
            (0, o.dH)(e, `${y}shown`, n),
              (0, o.dH)(e, `${y}not-shown`, !n),
              (0, o.dH)(e, `${y}open`, r),
              (0, o.dH)(e, `${y}not-open`, !r),
              (0, o.dH)(e, `${y}closing`, s);
          });
          (0, u.A)(() => {
            w.onChange = () => {
              (w.onChange = void 0), k();
            };
          }, [k, w]),
            (0, r.Nf)(k, [k, A]);
          const T = "withShouldRender" in e && e.withShouldRender,
            P = (0, i.A)(() => T && "closed" !== A(), [T, A]),
            M = (0, a.A)(() => "closing" === A(), [A]);
          return T
            ? { ref: w, shouldRender: P, getIsClosing: M }
            : { ref: w, getIsClosing: M };
        }
      },
      50680: (e, t, n) => {
        n.d(t, { A: () => s });
        var r = n(84051),
          o = n(87357);
        const s = function () {
          let e =
              arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
            t = arguments.length > 1 ? arguments[1] : void 0,
            n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            s =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : "fast",
            a = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
            i =
              arguments.length > 5 && void 0 !== arguments[5]
                ? arguments[5]
                : 350,
            d = arguments.length > 6 && void 0 !== arguments[6] && arguments[6];
          const [c, u] = (0, r.J0)(!e),
            l = (0, r.li)(),
            [f, h] = (0, r.J0)(e && n);
          if (e)
            u(!1),
              h(!0),
              l.current &&
                (window.clearTimeout(l.current), (l.current = void 0));
          else if ((h(!1), !c && !l.current)) {
            const e = () => {
              u(!0), t && t(), (l.current = void 0);
            };
            a ? e() : (l.current = window.setTimeout(e, i));
          }
          const m = (f && !(a && !e)) || (d && e),
            p = Boolean(l.current),
            g = e || p;
          return {
            shouldRender: g,
            transitionClassNames: (0, o.A)(
              s && "opacity-transition",
              s,
              m && "open",
              !m && "not-open",
              g && "shown",
              !g && "not-shown",
              p && "closing"
            ),
            hasShownClass: g,
            hasOpenClass: m,
            isClosing: p,
          };
        };
      },
      5718: (e, t, n) => {
        n.d(t, { R: () => s });
        var r = n(84051),
          o = n(22237);
        function s(e, t) {
          const n = (0, r.li)(!0);
          n.current &&
            ((n.current = !1),
            t?.forEach((t) => {
              (0, o.Hp)(t) && t.subscribe(e);
            })),
            (0, r._W)(() => {
              (0, o.cO)(e);
            });
        }
      },
      41257: (e, t, n) => {
        n.d(t, { i: () => o });
        var r = n(84051);
        function o(e) {
          const t = (0, r.li)(e);
          return (t.current = e), t;
        }
      },
      35297: (e, t, n) => {
        n.d(t, { A: () => s });
        var r = n(84051),
          o = n(73767);
        function s(e, t) {
          const n = (0, o.A)(t),
            s = (0, r.li)();
          (n && !t.some((e, t) => e !== n[t])) ||
            (s.current?.(), (s.current = e(n || []) ?? void 0)),
            (0, r._W)(() => {
              s.current?.();
            });
        }
      },
      672: (e, t, n) => {
        n.d(t, { A: () => s });
        var r = n(84051),
          o = n(37836);
        function s(e, t, n) {
          let s =
            arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
          const a = (0, r.hb)(e, t);
          return (0, r.Kr)(
            () =>
              "number" == typeof n ? (0, o.nF)(a, n, !s) : (0, o.nb)(n, a),
            [a, n, s]
          );
        }
      },
      22867: (e, t, n) => {
        n.d(t, { A: () => i });
        var r = n(84051),
          o = n(13439),
          s = n(90709),
          a = n(29807);
        function i(e) {
          const t = e && "content" in e ? (0, s.CI)(e) : e?.thumbnail?.dataUri,
            n = (0, a.SJA)((0, o.mS)());
          return (0, r.Kr)(() => {
            const e = t;
            return e && "dark" === n
              ? e.replace("<svg", '<svg fill="white"')
              : e;
          }, [t, n]);
        }
      },
      14745: (e, t, n) => {
        n.d(t, { A: () => s });
        var r = n(84051),
          o = n(14235);
        function s() {
          const e = (0, r.li)();
          return e.current || (e.current = (0, o.A)()), e.current;
        }
      },
      73622: (e, t, n) => {
        n.d(t, { A: () => i });
        var r = n(9935),
          o = n(84051),
          s = n(39761),
          a = n(41257);
        function i(e, t) {
          const n = (0, a.i)(t);
          (0, o.Nf)(() => {
            const t = e.current;
            if (t)
              return () => {
                const e = n.current;
                e &&
                  Object.entries(e).forEach((e) => {
                    let [n, o] = e;
                    t.removeEventListener((0, r.xE)(n, t), o, !1);
                  }),
                  (0, o.qF)(() => {
                    (0, s.A)(t);
                  });
              };
          }, [n, e]);
        }
      },
      22802: (e, t, n) => {
        n.d(t, { A: () => s });
        var r = n(84051);
        const o = "backdrop";
        function s(e, t, n, s, a) {
          (0, r.vJ)(() => {
            if (!e || !n) return;
            const r = (e) => {
              const r = t.current,
                i = e.target;
              !r ||
                !i ||
                (s && 2 === e.button) ||
                (r.contains(e.target) && !i.classList.contains(o)) ||
                (a && (i.matches(a) || i.closest(a))) ||
                (e.preventDefault(), e.stopPropagation(), n?.());
            };
            return (
              document.addEventListener("mousedown", r),
              () => {
                document.removeEventListener("mousedown", r);
              }
            );
          }, [a, s, e, t, n]);
        }
      },
      61157: (e, t, n) => {
        n.d(t, { A: () => c, g: () => u });
        var r = n(84051),
          o = n(46536),
          s = n(17712);
        const a = (0, o.h)(),
          i = (0, o.h)();
        let d = document.hasFocus();
        function c(e, t) {
          let n =
            arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
          const o = (0, s.A)(e),
            c = (0, s.A)(t);
          (0, r.vJ)(() => {
            if (!n)
              return (
                d || o(),
                a.addCallback(o),
                i.addCallback(c),
                () => {
                  i.removeCallback(c), a.removeCallback(o);
                }
              );
          }, [n, o, c]);
        }
        function u() {
          return !d;
        }
        window.addEventListener("blur", () => {
          d && ((d = !1), a.runCallbacks());
        }),
          window.addEventListener("focus", () => {
            (d = !0), i.runCallbacks();
          });
      },
      38691: (e, t, n) => {
        n.d(t, { A: () => d });
        var r = n(84051),
          o = n(46536),
          s = n(15283);
        const a = (0, o.h)();
        function i() {
          window
            .matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)
            .addEventListener("change", a.runCallbacks, { once: !0 });
        }
        function d() {
          const [e, t] = (0, r.J0)(window.devicePixelRatio);
          return (
            (0, s.A)(() =>
              a.addCallback(() => {
                t(window.devicePixelRatio);
              })
            ),
            e
          );
        }
        i(), a.addCallback(i);
      },
      39751: (e, t, n) => {
        n.d(t, { A: () => d });
        var r = n(84051),
          o = n(37836),
          s = n(43503),
          a = n(16581);
        const i = 250;
        function d() {
          const { width: e, height: t } = s.A.get(),
            [n, d] = (0, r.J0)(e),
            [c, u] = (0, r.J0)(t),
            [l, f] = (0, r.J0)(!1),
            h = (0, a.A)(f, [f], i, !0);
          return (
            (0, r.vJ)(() => {
              const e = (0, o.nF)(
                  () => {
                    f(!0);
                  },
                  i,
                  !0
                ),
                t = (0, o.nF)(
                  () => {
                    const { width: e, height: t } = s.A.get();
                    d(e), u(t), h(!1);
                  },
                  i,
                  !1
                ),
                n = () => {
                  e(), t();
                };
              return (
                window.addEventListener("resize", n),
                () => {
                  window.removeEventListener("resize", n);
                }
              );
            }, [h]),
            (0, r.Kr)(() => ({ width: n, height: c, isResizing: l }), [c, l, n])
          );
        }
      },
      66644: (e, t, n) => {
        n.d(t, {
          RK: () => f,
          Uj: () => s.Uj,
          Uz: () => h,
          YS: () => l,
          Z3: () => s.Z3,
          dL: () => s.dL,
          gm: () => m,
        });
        var r = n(50110),
          o = n(37836),
          s = n(75357);
        let a = [],
          i = [],
          d = [];
        const c =
          ((u = () => {
            const e = a;
            (a = []),
              e.forEach((e) => {
                (0, r.A)(e);
              }),
              Promise.resolve()
                .then(() => {
                  (0, s.A)("mutate");
                  const e = i;
                  (i = []),
                    e.forEach((e) => {
                      (0, r.A)(e);
                    });
                })
                .then(() => {
                  (0, s.A)("measure");
                  const e = [];
                  for (const t of d)
                    (0, r.A)(() => {
                      const n = t();
                      n && e.push(n);
                    });
                  return (d = []), e;
                })
                .then((e) => {
                  (0, s.A)("mutate");
                  for (const t of e) (0, r.A)(t);
                })
                .then(() => {
                  (0, s.A)("measure");
                });
          }),
          (0, o.nb)((e) => {
            (0, o.IJ)(e, !0);
          }, u));
        var u;
        function l(e) {
          a.push(e), c();
        }
        function f(e) {
          i.push(e), c();
        }
        function h(e) {
          l(() => {
            f(e);
          });
        }
        function m(e) {
          d.push(e), c();
        }
      },
      75357: (e, t, n) => {
        n.d(t, {
          oA: () => l,
          Z3: () => u,
          Uj: () => f,
          dL: () => m,
          A: () => c,
        });
        const r = {
          Element: {
            props: [
              "clientLeft",
              "clientTop",
              "clientWidth",
              "clientHeight",
              "scrollWidth",
              "scrollHeight",
              "scrollLeft",
              "scrollTop",
            ],
            methods: [
              "getClientRects",
              "getBoundingClientRect",
              "scrollBy",
              "scrollTo",
              "scrollIntoView",
              "scrollIntoViewIfNeeded",
            ],
          },
          HTMLElement: {
            props: [
              "offsetLeft",
              "offsetTop",
              "offsetWidth",
              "offsetHeight",
              "offsetParent",
              "innerText",
            ],
            methods: ["focus"],
          },
          window: {
            props: ["scrollX", "scrollY", "innerHeight", "innerWidth"],
            methods: ["getComputedStyle"],
          },
          VisualViewport: {
            props: ["height", "width", "offsetTop", "offsetLeft"],
          },
          Document: {
            props: ["scrollingElement"],
            methods: ["elementFromPoint"],
          },
          HTMLInputElement: { methods: ["select"] },
          MouseEvent: { props: ["layerX", "layerY", "offsetX", "offsetY"] },
          Range: { methods: ["getClientRects", "getBoundingClientRect"] },
        };
        let o = console.error;
        const s = new Map();
        let a,
          i = "measure",
          d = !1;
        function c(e) {
          i = e;
        }
        function u() {
          d ||
            ((d = !0),
            Object.entries(r).forEach((e) => {
              let [t, n] = e;
              const r = window[t];
              if (!r) return;
              const o = "object" == typeof r ? r : r.prototype;
              "props" in n &&
                n.props.forEach((e) => {
                  const n = Object.getOwnPropertyDescriptor(o, e)?.get;
                  n &&
                    (s.set(`${t}#${e}`, n),
                    Object.defineProperty(o, e, {
                      get() {
                        return p(e), n.call(this);
                      },
                    }));
                }),
                "methods" in n &&
                  n.methods.forEach((e) => {
                    const n = o[e];
                    s.set(`${t}#${e}`, n),
                      (o[e] = function () {
                        p(e);
                        for (
                          var t = arguments.length, r = new Array(t), o = 0;
                          o < t;
                          o++
                        )
                          r[o] = arguments[o];
                        return n.apply(this, r);
                      });
                  });
            }),
            (a = new MutationObserver((e) => {
              "mutate" !== i &&
                e.forEach((e) => {
                  let { target: t, type: n, attributeName: r } = e;
                  document.contains(t) &&
                    (h.has(t) ||
                      ("childList" === n &&
                        t instanceof HTMLElement &&
                        t.contentEditable) ||
                      r?.startsWith("data-") ||
                      o(
                        new Error(
                          `Unexpected mutation detected: \`${
                            "attributes" === n ? r : n
                          }\``
                        )
                      ));
                }),
                h.clear();
            })),
            a.observe(document.body, {
              childList: !0,
              attributes: !0,
              subtree: !0,
              characterData: !1,
            }));
        }
        function l() {
          d &&
            (a?.disconnect(),
            (a = void 0),
            Object.entries(r).forEach((e) => {
              let [t, n] = e;
              const r = window[t];
              if (!r) return;
              const o = "object" == typeof r ? r : r.prototype;
              "props" in n &&
                n.props.forEach((e) => {
                  const n = s.get(`${t}#${e}`);
                  n && Object.defineProperty(o, e, { get: n });
                }),
                "methods" in n &&
                  n.methods.forEach((e) => {
                    o[e] = s.get(`${t}#${e}`);
                  });
            }),
            s.clear(),
            (d = !1));
        }
        function f(e) {
          if ("mutate" !== i) throw new Error("The current phase is 'measure'");
          i = "measure";
          const t = e();
          return (i = "mutate"), t;
        }
        const h = new Set();
        function m(e, t) {
          if ("measure" !== i) throw new Error("The current phase is 'mutate'");
          return (
            d &&
              (Array.isArray(t)
                ? t.forEach((e) => {
                    h.add(e);
                  })
                : h.add(t)),
            e()
          );
        }
        function p(e) {
          "measure" !== i &&
            o(new Error(`Unexpected measurement detected: \`${e}\``));
        }
      },
      88458: (e, t, n) => {
        let r, o;
        async function s() {
          return (
            r ||
              ((r = n
                .e(6708)
                .then(n.bind(n, 66708))
                .then((e) => e.default)),
              (o = await r)),
            r
          );
        }
        function a() {
          return o;
        }
        n.d(t, { Y: () => s, o: () => a }), setTimeout(s, 3e3);
      },
      9935: (e, t, n) => {
        n.d(t, { f: () => c, iB: () => h, q2: () => d, xE: () => u });
        var r = n(31481);
        const o = new Set(["scroll", "mouseenter", "mouseleave", "load"]),
          s = {},
          a = {},
          i = new Map();
        function d(e, t, n) {
          let r =
            arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
          const o = u(t, e);
          l(o, e, r)
            ? (function (e, t, n) {
                s[e] || ((s[e] = 0), document.addEventListener(e, m)),
                  (function (e) {
                    return a[e] || (a[e] = new Map()), a[e];
                  })(e).set(t, n),
                  (function (e) {
                    const t = i.get(e);
                    if (t) return t;
                    const n = new Set();
                    return i.set(e, n), n;
                  })(t).add(e),
                  s[e]++;
              })(o, e, n)
            : e.addEventListener(o, n, r);
        }
        function c(e, t, n) {
          let r =
            arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
          const o = u(t, e);
          l(o, e, r) ? f(o, e) : e.removeEventListener(o, n, r);
        }
        function u(e, t) {
          const n = e
            .replace(/^on/, "")
            .replace(/Capture$/, "")
            .toLowerCase();
          return "change" === n && "SELECT" !== t.tagName
            ? "input"
            : "doubleclick" === n
            ? "dblclick"
            : "focus" === n
            ? "focusin"
            : "blur" === n
            ? "focusout"
            : n;
        }
        function l(e, t, n) {
          return (
            !n && !o.has(e) && "VIDEO" !== t.tagName && "IFRAME" !== t.tagName
          );
        }
        function f(e, t) {
          s[e]--,
            s[e] || document.removeEventListener(e, m),
            a[e].delete(t),
            i.get(t).delete(e);
        }
        function h(e) {
          const t = i.get(e);
          t && (t.forEach((t) => f(t, e)), i.delete(e));
        }
        function m(e) {
          const t = a[e.type];
          if (t) {
            let n = !1,
              r = e.target;
            const o = () => {
                n = !0;
              },
              s = () => {
                e.preventDefault();
              },
              a = new Proxy(e, {
                get: (e, t) =>
                  "currentTarget" === t
                    ? r
                    : "stopPropagation" === t ||
                      "stopImmediatePropagation" === t
                    ? o
                    : "preventDefault" === t
                    ? s
                    : Reflect.get(e, t),
              });
            for (; r && r !== document.body; ) {
              const e = t.get(r);
              if (e && (e(a), n)) return;
              r = r.parentNode;
            }
          }
        }
        r.Oig &&
          document.addEventListener("dblclick", () => {
            const e = Object.keys(s).length,
              t = Object.values(s).reduce((e, t) => e + t, 0),
              n = Object.keys(a).length,
              r = Object.values(a).reduce((e, t) => e + t.size, 0),
              o = i.size,
              d = Array.from(i.values()).reduce((e, t) => e + t.size, 0);
            console.warn("DELEGATED EVENTS STATS", {
              delegatedHandlersCount1: t,
              delegatedHandlersCount2: r,
              delegatedEventTypesCount: d,
              delegationRegistriesCount: n,
              delegationElementsCount: o,
              documentListenersCount: e,
            });
          });
      },
      8718: (e, t, n) => {
        n.d(t, {
          By: () => g,
          Mb: () => l,
          OV: () => h,
          VK: () => m,
          qF: () => p,
        });
        var r = n(37836),
          o = n(22237),
          s = n(66644);
        const a = 1e3;
        let i = 0,
          d = 0;
        const [c, u] = (0, o.n5)(!1),
          [l, f] = (0, o.n5)(!1),
          h = c;
        function m() {
          let e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : a,
            t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          i++, 1 === i && u(!0), t && (d++, 1 === d && f(!0));
          const n = window.setTimeout(o, e);
          let r = !1;
          function o() {
            r ||
              ((r = !0),
              clearTimeout(n),
              i--,
              0 === i && u(!1),
              t && (d--, 0 === d && f(!1)));
          }
          return o;
        }
        function p(e) {
          (0, r.kI)(() => {
            c()
              ? (0, s.YS)(() => {
                  p(e);
                })
              : e();
          });
        }
        function g(e) {
          return (0, r.nb)(p, e);
        }
      },
      61433: (e, t, n) => {
        n.d(t, {
          Ay: () => D,
          HW: () => B,
          Tv: () => O,
          YM: () => F,
          dH: () => x,
        });
        var r = n(31481),
          o = n(87894),
          s = n(9935),
          a = n(84051);
        const i = new Set(["key", "ref", "teactFastList", "teactOrderKey"]),
          d = new Set(["dir", "role", "form"]),
          c = ["INPUT", "TEXTAREA", "SELECT"],
          u = { autoPlay: "autoplay", autoComplete: "autocomplete" },
          l = "__indexKey#",
          f = new WeakMap(),
          h = new WeakMap(),
          m = new WeakMap();
        function p(e, t, n, o, s, i) {
          let d =
            arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : {};
          const { skipComponentUpdate: c, fragment: u } = d;
          let { nextSibling: l, isSvg: f } = d;
          const h = t?.type === a.wr.Component,
            m = n?.type === a.wr.Component,
            p = n,
            I = !h && t?.type === a.wr.Fragment,
            E = !m && n?.type === a.wr.Fragment;
          if (
            (f || n?.type !== a.wr.Tag || "svg" !== n.tag || (f = !0),
            !c &&
              h &&
              m &&
              !(0, a.rO)(t, n) &&
              (n = (function (e, t) {
                return (
                  (e.componentInstance.props = t.componentInstance.props),
                  (0, a.Cc)(e.componentInstance)
                );
              })(t, n)),
            !c &&
              m &&
              n.componentInstance.mountState === a.pT.Mounted &&
              y(e, n, o, s, i),
            t === n)
          )
            return n;
          if (r.Oig && n) {
            const e = "target" in n && n.target;
            if (e && (!t || ("target" in t && e !== t.target)))
              throw new Error(
                "[Teact] Cached virtual element was moved within tree"
              );
          }
          if (!t && n)
            if (m || E)
              m && (s = (n = g(e, n, o, s, i)).componentInstance.context ?? s),
                b(e, n, s, { nextSibling: l, fragment: u, isSvg: f });
            else if (
              u ||
              l ||
              p.type !== a.wr.Text ||
              1 !== o.children.length ||
              e.firstChild
            ) {
              const t = v(p, s, f);
              (p.target = t), A(u || e, t, l), p.type === a.wr.Tag && k(p, t);
            } else (e.textContent = p.value), (p.target = e.firstChild);
          else if (t && !n) w(e, t, s, void 0);
          else if (t && n)
            if ((0, a.rO)(t, n))
              if ((l || (l = C(t)), m || E))
                m &&
                  (s = (n = g(e, n, o, s, i)).componentInstance.context ?? s),
                  w(e, t, s, void 0),
                  b(e, n, s, { nextSibling: l, fragment: u, isSvg: f });
              else {
                const n = v(p, s, f);
                (p.target = n),
                  w(e, t, s, n, l),
                  p.type === a.wr.Tag && k(p, n);
              }
            else if ((h && m) || (I && E)) S(t, n, s, e, l, d.forceMoveToEnd);
            else {
              const r = t,
                o = r.target;
              if (((p.target = o), (r.target = void 0), t.type === a.wr.Tag)) {
                const r = n;
                k(t, void 0),
                  k(r, o),
                  (l || d.forceMoveToEnd) && A(e, o, l),
                  (function (e, t, n, r) {
                    T(n.tagName, t.props);
                    const o = Object.entries(e.props),
                      s = Object.entries(t.props);
                    for (const [e, r] of o) {
                      const o = t.props[e];
                      void 0 !== r &&
                        (void 0 === o || (r !== o && e.startsWith("on"))) &&
                        M(n, e, r);
                    }
                    for (const [t, o] of s) {
                      const s = e.props[t];
                      void 0 !== o && o !== s && P(n, t, o, r);
                    }
                  })(t, r, o, f),
                  S(t, r, s, o, void 0, void 0, f);
              }
            }
          return n;
        }
        function g(e, t, n, r, o) {
          const { componentInstance: s } = t;
          return (
            (t.componentInstance.context = r),
            s.mountState === a.pT.New && y(e, (t = (0, a.bF)(s)), n, r, o),
            t
          );
        }
        function y(e, t, n, r, o) {
          const { componentInstance: s } = t;
          s.onUpdate = () => {
            n.children[o] = p(e, n.children[o], s.$element, n, r, o, {
              skipComponentUpdate: !0,
            });
          };
        }
        function b(e, t, n, r) {
          const { children: o } = t;
          for (let s = 0, a = o.length; s < a; s++) {
            const a = o[s],
              i = p(e, void 0, a, t, n, s, r);
            i !== a && (o[s] = i);
          }
        }
        function v(e, t, n) {
          if (e.type === a.wr.Empty) return document.createTextNode("");
          if (e.type === a.wr.Text) return document.createTextNode(e.value);
          const { tag: r, props: o, children: s } = e,
            i = n
              ? document.createElementNS("http://www.w3.org/2000/svg", r)
              : document.createElement(r);
          T(r, o);
          for (const e in o)
            o.hasOwnProperty(e) && void 0 !== o[e] && P(i, e, o[e], n);
          !(function (e, t) {
            c.includes(e.tagName) &&
              (t.defaultValue && P(e, "value", t.defaultValue),
              t.defaultChecked && P(e, "checked", t.defaultChecked));
          })(i, o);
          for (let r = 0, o = s.length; r < o; r++) {
            const o = s[r],
              a = p(i, void 0, o, e, t, r, { isSvg: n });
            a !== o && (s[r] = a);
          }
          return i;
        }
        function w(e, t, n, r, o) {
          const s = t.type === a.wr.Component,
            i = !s && t.type === a.wr.Fragment;
          s || i
            ? (s && (0, a.s4)(t.componentInstance),
              (function (e, t, n) {
                for (const r of t.children) p(e, r, void 0, t, n, -1);
              })(e, t, n),
              r && A(e, r, o))
            : (r ? e.replaceChild(r, t.target) : e.removeChild(t.target), I(t));
        }
        function I(e) {
          if (e.type === a.wr.Component) (0, a.s4)(e.componentInstance);
          else if (
            e.type !== a.wr.Fragment &&
            (e.type === a.wr.Tag &&
              (h.delete(e.target), k(e, void 0), (0, s.iB)(e.target)),
            (e.target = void 0),
            e.type !== a.wr.Tag)
          )
            return;
          for (const t of e.children) I(t);
        }
        function A(e, t, n) {
          n ? e.insertBefore(t, n) : e.appendChild(t);
        }
        function C(e) {
          return e.type === a.wr.Component || e.type === a.wr.Fragment
            ? C(e.children[e.children.length - 1])
            : e.target.nextSibling || void 0;
        }
        function S(e, t, n, s, i) {
          let d =
              arguments.length > 5 && void 0 !== arguments[5] && arguments[5],
            c = arguments.length > 6 ? arguments[6] : void 0;
          if (
            (r.Oig &&
              (function (e) {
                const t = e[0];
                if (t && "props" in t && void 0 !== t.props.key) {
                  const t = e.reduce(
                    (e, t) => (
                      "props" in t && t.props.key && e.push(t.props.key), e
                    ),
                    []
                  );
                  if (t.length !== (0, o.Am)(t).length)
                    throw (
                      (console.warn(
                        "[Teact] Duplicated keys:",
                        t.filter((e, t, n) => n.indexOf(e) !== t),
                        e
                      ),
                      new Error("[Teact] Children keys are not unique"))
                    );
                }
              })(t.children),
            "props" in t && t.props.teactFastList)
          )
            return void (function (e, t, n, o) {
              const s = e.children,
                i = t.children,
                d = new Set();
              for (const e of i) {
                const t = "props" in e ? e.props.key : void 0;
                if (
                  r.Oig &&
                  (0, a.jo)(e) &&
                  (null == t &&
                    console.warn("Missing `key` in `teactFastList`"),
                  e.type === a.wr.Fragment)
                )
                  throw new Error(
                    "[Teact] Fragment can not be child of container with `teactFastList`"
                  );
                d.add(t);
              }
              let c = 0;
              const u = {};
              for (let e = 0, r = s.length; e < r; e++) {
                const r = s[e];
                let a = "props" in r ? r.props.key : void 0;
                const f = null != a;
                if (!f || d.has(a)) {
                  if (!f) {
                    const s = i[e],
                      d = s && "props" in s ? s.props.key : void 0;
                    if (!s || d) {
                      p(o, r, void 0, t, n, -1);
                      continue;
                    }
                    a = `${l}${e}`;
                  }
                  u[a] = {
                    $element: r,
                    index: c++,
                    orderKey: "props" in r ? r.props.teactOrderKey : void 0,
                  };
                } else p(o, r, void 0, t, n, -1);
              }
              let f,
                h,
                m = 0;
              for (let e = 0, r = i.length; e < r; e++) {
                const r = i[e],
                  s = u["props" in r ? r.props.key : `${l}${e}`];
                if (!s) {
                  void 0 === h && ((f = e), (h = 0)), h++;
                  continue;
                }
                h && (E(f, h, o, t, n), (h = void 0), (f = void 0));
                const a = "props" in r ? r.props.teactOrderKey : void 0,
                  d = s.index !== m && (!a || s.orderKey !== a),
                  c = d && m > s.index;
                (d && !c) || m++;
                const g = o.childNodes[c ? e + 1 : e],
                  y = d
                    ? g
                      ? { nextSibling: g }
                      : { forceMoveToEnd: !0 }
                    : void 0,
                  b = p(o, s.$element, r, t, n, e, y);
                b !== r && (i[e] = b);
              }
              h && E(f, h, o, t, n);
            })(e, t, n, s);
          const u = e.children,
            f = t.children,
            h = u.length,
            m = f.length,
            g = Math.max(h, m),
            y = m > h ? document.createDocumentFragment() : void 0,
            b = e.children[h - 1],
            v = y && (i || (b ? C(b) : void 0));
          for (let e = 0; e < g; e++) {
            const r = p(
              s,
              u[e],
              f[e],
              t,
              n,
              e,
              e >= h
                ? { fragment: y, isSvg: c }
                : { nextSibling: i, forceMoveToEnd: d, isSvg: c }
            );
            r && r !== f[e] && (f[e] = r);
          }
          y && A(s, y, v);
        }
        function E(e, t, n, r, o) {
          const s = n.childNodes[e];
          if (1 === t) {
            const t = r.children[e],
              a = p(n, void 0, t, r, o, e, { nextSibling: s });
            return void (a !== t && (r.children[e] = a));
          }
          const a = document.createDocumentFragment();
          for (let s = e; s < e + t; s++) {
            const e = r.children[s],
              t = p(n, void 0, e, r, o, s, { fragment: a });
            t !== e && (r.children[s] = t);
          }
          A(n, a, s);
        }
        function k(e, t) {
          const { ref: n } = e.props;
          "object" == typeof n
            ? ((n.current = t), n.onChange?.())
            : "function" == typeof n && n(t);
        }
        function T(e, t) {
          if (!t.teactExperimentControlled) return;
          const n = void 0 !== t.value,
            r = void 0 !== t.checked;
          if ((!n && !r) || !c.includes(e.toUpperCase())) return;
          const { value: o, checked: s, onInput: a, onChange: i } = t;
          (t.onChange = void 0),
            (t.onInput = (e) => {
              if (
                (a?.(e), i?.(e), void 0 !== o && o !== e.currentTarget.value)
              ) {
                const { selectionStart: t, selectionEnd: n } = e.currentTarget,
                  r = t === n && n === e.currentTarget.value.length;
                if (
                  ((e.currentTarget.value = o),
                  "number" == typeof t && "number" == typeof n)
                ) {
                  e.currentTarget.setSelectionRange(t, n);
                  const o = {
                    selectionStart: t,
                    selectionEnd: n,
                    isCaretAtEnd: r,
                  };
                  e.currentTarget.dataset.__teactSelectionState =
                    JSON.stringify(o);
                }
              }
              void 0 !== s && (e.currentTarget.checked = s);
            });
        }
        function P(e, t, n, r) {
          if ("className" === t) L(e, n, r);
          else if ("value" === t) {
            const t = e;
            if (t.value !== n) {
              t.value = n;
              const e = t.dataset.__teactSelectionState;
              if (e) {
                const {
                  selectionStart: n,
                  selectionEnd: r,
                  isCaretAtEnd: o,
                } = JSON.parse(e);
                if (o) {
                  const e = t.value.length;
                  t.setSelectionRange(e, e);
                } else
                  "number" == typeof n &&
                    "number" == typeof r &&
                    t.setSelectionRange(n, r);
              }
            }
          } else
            "style" === t
              ? N(e, n)
              : "dangerouslySetInnerHTML" === t
              ? (e.innerHTML = n.__html)
              : t.startsWith("on")
              ? (0, s.q2)(e, t, n, t.endsWith("Capture"))
              : r || t.startsWith("data-") || t.startsWith("aria-") || d.has(t)
              ? e.setAttribute(t, n)
              : i.has(t) || (e[u[t] || t] = n);
        }
        function M(e, t, n) {
          "className" === t
            ? L(e, "")
            : "value" === t
            ? (e.value = "")
            : "style" === t
            ? N(e, "")
            : "dangerouslySetInnerHTML" === t
            ? (e.innerHTML = "")
            : t.startsWith("on")
            ? (0, s.f)(e, t, n, t.endsWith("Capture"))
            : i.has(t) || e.removeAttribute(t);
        }
        function L(e, t, n) {
          if (n) return void e.setAttribute("class", t);
          const r = e,
            o = h.get(e);
          if (!o) return void (r.className = t);
          const s = Array.from(o);
          t && s.push(t), (r.className = s.join(" "));
        }
        function N(e, t) {
          (e.style.cssText = t), m.get(e) && R(e);
        }
        function F(e, t) {
          e.classList.add(t);
          const n = h.get(e);
          n ? n.add(t) : h.set(e, new Set([t]));
        }
        function B(e, t) {
          e.classList.remove(t);
          const n = h.get(e);
          n && (n.delete(t), n.size || h.delete(e));
        }
        function x(e, t, n) {
          !0 === n ? F(e, t) : !1 === n || h.get(e)?.has(t) ? B(e, t) : F(e, t);
        }
        function O(e, t) {
          m.set(e, t), R(e);
        }
        function R(e) {
          const t = Object.entries(m.get(e)).reduce((t, n) => {
            let [r, o] = n;
            return (
              r.startsWith("--") ? e.style.setProperty(r, o) : (t[r] = o), t
            );
          }, {});
          Object.assign(e.style, t);
        }
        const D = {
          render: function (e, t) {
            f.has(t) || f.set(t, { children: [] });
            const n = (0, a.ek)(),
              r = f.get(t),
              o = p(t, r.children[0], e, r, {}, 0);
            n?.(), (r.children = o ? [o] : []);
          },
        };
      },
      84051: (e, t, n) => {
        n.d(t, {
          $Z: () => oe,
          pT: () => y,
          wr: () => g,
          VK: () => p.VK,
          ek: () => j,
          Ay: () => se,
          OV: () => p.OV,
          rO: () => z,
          jo: () => S,
          ph: () => re,
          bF: () => W,
          qF: () => p.qF,
          Cc: () => V,
          s4: () => J,
          hb: () => ee,
          vJ: () => X,
          Nf: () => Y,
          Kr: () => Z,
          li: () => te,
          Ul: () => ne,
          J0: () => q,
          _W: () => Q,
        });
        var r = n(31481),
          o = n(5930),
          s = n(37836);
        const a = new Set([
          "TeactMemoWrapper renders",
          "TeactNContainer renders",
          "Button renders",
        ]);
        let i = {};
        const d = (0, s.nF)(
          function () {
            c ||
              (function () {
                (c = document.createElement("div")),
                  (c.style.cssText =
                    "position: absolute; left: 0; bottom: 25px; z-index: 9998; width: 260px; height: 200px; border: 1px solid #555; background: rgba(255, 255, 255, 0.9); overflow: auto; font-size: 10px;"),
                  document.body.appendChild(c);
                const e = document.createElement("a");
                (e.style.cssText =
                  "position: absolute; left: 222px; bottom: 198px; z-index: 9999; font-size: 20px; cursor: pointer;"),
                  (e.innerText = "🔄"),
                  e.addEventListener("click", () => {
                    (i = {}), d();
                  }),
                  document.body.appendChild(e);
              })();
            const e = Date.now() - 500,
              [t, n] = Object.entries(i).reduce(
                (e, t) => {
                  let [n, { value: r }] = t;
                  return (
                    a.has(n) ||
                      (n.includes("renders") && r > e[0] && (e[0] = r),
                      n.includes("duration") && r > e[1] && (e[1] = r)),
                    e
                  );
                },
                [0, 0]
              );
            c.innerHTML = Object.entries(i)
              .filter((e) => {
                let [t, { value: n }] = e;
                return (
                  !a.has(t) &&
                  ((t.includes("renders") && n > 5) ||
                    (t.includes("duration") && n > 2))
                );
              })
              .sort((e, t) => t[1].lastUpdateAt - e[1].lastUpdateAt)
              .map((r) => {
                let [o, { value: s, lastUpdateAt: a }] = r;
                return [
                  `<div style="background: #ff0000${
                    ((i = s / (o.includes("renders") ? t : n)),
                    Math.round(255 * i)
                      .toString(16)
                      .padStart(2, "0"))
                  }">`,
                  `  <span${
                    a > e ? ' style="background: lightgreen"' : ""
                  }>${o}: ${Math.round(s)}</span>`,
                  "</div>",
                ].join("\n");
                var i;
              })
              .join("\n");
          },
          500,
          !1
        );
        let c;
        function u(e) {
          let t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
          const n = Date.now();
          i[e]
            ? ((i[e].value += t), (i[e].lastUpdateAt = n))
            : (i[e] = { value: t, lastUpdateAt: n }),
            d();
        }
        var l = n(87894),
          f = n(50110),
          h = n(22237),
          m = n(66644),
          p = n(8718);
        let g = (function (e) {
            return (
              (e[(e.Empty = 0)] = "Empty"),
              (e[(e.Text = 1)] = "Text"),
              (e[(e.Tag = 2)] = "Tag"),
              (e[(e.Component = 3)] = "Component"),
              (e[(e.Fragment = 4)] = "Fragment"),
              e
            );
          })({}),
          y = (function (e) {
            return (
              (e[(e.New = 0)] = "New"),
              (e[(e.Mounted = 1)] = "Mounted"),
              (e[(e.Unmounted = 2)] = "Unmounted"),
              e
            );
          })({});
        const b = Symbol("Fragment"),
          v = 7,
          w = 7,
          I = new Set([
            "TeactMemoWrapper",
            "TeactNContainer",
            "Button",
            "ListItem",
            "MenuItem",
          ]);
        let A,
          C = 0;
        function S(e) {
          return (
            e.type === g.Tag || e.type === g.Component || e.type === g.Fragment
          );
        }
        function E(e, t) {
          for (
            var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), o = 2;
            o < n;
            o++
          )
            r[o - 2] = arguments[o];
          return e === b
            ? (function (e) {
                return { type: g.Fragment, children: T(e, !0) };
              })(r)
            : "function" == typeof e
            ? (function (e, t, n) {
                n?.length && (t.children = 1 === n.length ? n[0] : n);
                const r = {
                  id: -1,
                  $element: void 0,
                  Component: e,
                  name: e.name,
                  props: t,
                  mountState: y.New,
                };
                return (r.$element = k(r)), r.$element;
              })(e, t || {}, r)
            : (function (e, t, n) {
                return { type: g.Tag, tag: e, props: t, children: T(n) };
              })(e, t || {}, r);
        }
        function k(e, t) {
          return {
            type: g.Component,
            componentInstance: e,
            props: e.props,
            children: t ? T(t, !0) : [],
          };
        }
        function T(e) {
          let t =
            arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          const n = (function (e) {
              let t =
                  arguments.length > 1 &&
                  void 0 !== arguments[1] &&
                  arguments[1],
                n = e.length - 1;
              for (; n >= 0 && P(e[n]); n--);
              return n === e.length - 1
                ? e
                : -1 === n && t
                ? e.slice(0, 1)
                : e.slice(0, n + 1);
            })(e, t),
            r = [];
          for (let e = 0, o = n.length; e < o; e++) {
            const o = n[e];
            Array.isArray(o) ? r.push(...T(o, t)) : r.push(M(o));
          }
          return r;
        }
        function P(e) {
          return !e && 0 !== e;
        }
        function M(e) {
          return P(e)
            ? { type: g.Empty }
            : S(e)
            ? e
            : { type: g.Text, value: String(e) };
        }
        const L = { TOTAL: { name: "TOTAL", renders: 0 } },
          N = {},
          F = 20;
        document.addEventListener("dblclick", () => {
          console.warn(
            "COMPONENTS",
            (0, l.My)(
              Object.values(L).map((e) => {
                let { avgRenderTime: t, ...n } = e;
                return {
                  ...n,
                  ...(void 0 !== t && { avgRenderTime: Number(t.toFixed(2)) }),
                };
              }),
              "renders",
              "desc"
            )
          ),
            console.warn(
              "MEMOS",
              (0, l.My)(
                Object.values(N)
                  .filter((e) => {
                    let { calls: t } = e;
                    return t >= F;
                  })
                  .map((e) => ({
                    ...e,
                    hitRate: Number(e.hitRate.toFixed(2)),
                  })),
                "hitRate",
                "asc"
              )
            );
        });
        let B = new Set(),
          x = new Set(),
          O = new Map(),
          R = new Map(),
          D = new Map(),
          U = new Map(),
          _ = !1;
        const $ = (0, s.nb)(m.YS, () => {
          if ((0, p.Mb)()) return void p.Mb.once($);
          const e = j();
          x = new Set();
          const t = Array.from(B).sort((e, t) => e.id - t.id);
          B = new Set();
          const n = R;
          (R = new Map()), n.forEach((e) => e());
          const r = O;
          (O = new Map()),
            r.forEach((e) => e()),
            (0, m.RK)(() => {
              t.forEach(K),
                t.forEach((e) => {
                  x.has(e.id) ||
                    (function (e) {
                      if (e.mountState !== y.Mounted || !e.onUpdate) return;
                      const t = e.$element;
                      V(e), e.$element !== t && e.onUpdate();
                    })(e);
                }),
                e?.();
            });
        });
        function j() {
          if (!_) return (_ = !0), H;
        }
        function H() {
          const e = U;
          (U = new Map()), e.forEach((e) => e());
          const t = D;
          (D = new Map()), t.forEach((e) => e()), (_ = !1);
        }
        function V(e) {
          x.add(e.id);
          const { Component: t, props: n } = e;
          let o;
          if (
            ((0, f.A)(
              () => {
                let s;
                if (
                  ((A = e),
                  e.hooks &&
                    (e.hooks.state && (e.hooks.state.cursor = 0),
                    e.hooks.effects && (e.hooks.effects.cursor = 0),
                    e.hooks.memos && (e.hooks.memos.cursor = 0),
                    e.hooks.refs && (e.hooks.refs.cursor = 0)),
                  r.Oig)
                ) {
                  const e = oe(t);
                  L[e] || (L[e] = { name: e, renders: 0, avgRenderTime: 0 }),
                    r.MVx && (I.has(e) || console.log(`[Teact] Render ${e}`)),
                    (s = performance.now());
                }
                if (((o = t(n)), r.Oig)) {
                  const e = performance.now() - s,
                    n = oe(t);
                  e > v &&
                    console.warn(
                      `[Teact] Slow component render: ${n}, ${Math.round(e)} ms`
                    );
                  const { renders: o, avgRenderTime: a } = L[n];
                  (L[n].avgRenderTime = (a * o + e) / (o + 1)),
                    L[n].renders++,
                    L.TOTAL.renders++,
                    r.MVx && (u(`${n} renders`), u(`${n} duration`, e));
                }
              },
              () => {
                console.error(
                  `[Teact] Error while rendering component ${e.name}`,
                  e
                ),
                  (o = e.renderedValue);
              }
            ),
            e.mountState === y.Mounted && o === e.renderedValue)
          )
            return e.$element;
          e.renderedValue = o;
          const s = Array.isArray(o) ? o : [o];
          return (
            e.mountState === y.New
              ? (e.$element.children = T(s, !0))
              : (e.$element = k(e, s)),
            e.$element
          );
        }
        function z(e, t) {
          return (
            typeof e != typeof t ||
            e.type !== t.type ||
            (e.type === g.Text && t.type === g.Text
              ? e.value !== t.value
              : e.type === g.Tag && t.type === g.Tag
              ? e.tag !== t.tag || e.props.key !== t.props.key
              : e.type === g.Component &&
                t.type === g.Component &&
                (e.componentInstance.Component !==
                  t.componentInstance.Component ||
                  e.props.key !== t.props.key))
          );
        }
        function W(e) {
          return (e.id = ++C), V(e), (e.mountState = y.Mounted), e.$element;
        }
        function J(e) {
          if (e.mountState === y.Mounted) {
            if ((x.add(e.id), e.hooks?.effects))
              for (const t of e.hooks.effects.byCursor)
                t.cleanup && (0, f.A)(t.cleanup),
                  (t.cleanup = void 0),
                  t.releaseSignals?.();
            (e.mountState = y.Unmounted),
              (function (e) {
                const {
                  effects: t,
                  state: n,
                  memos: r,
                  refs: o,
                } = e.hooks || {};
                if (t)
                  for (const e of t.byCursor)
                    (e.schedule = void 0),
                      (e.cleanup = void 0),
                      (e.releaseSignals = void 0),
                      (e.dependencies = void 0);
                if (n)
                  for (const e of n.byCursor)
                    (e.value = void 0),
                      (e.nextValue = void 0),
                      (e.setter = void 0);
                if (r)
                  for (const e of r.byCursor)
                    (e.value = void 0), (e.dependencies = void 0);
                if (o)
                  for (const e of o.byCursor)
                    (e.current = void 0), (e.onChange = void 0);
                (e.hooks = void 0),
                  (e.$element = void 0),
                  (e.renderedValue = void 0),
                  (e.Component = void 0),
                  (e.props = void 0),
                  (e.onUpdate = void 0);
              })(e);
          }
        }
        function K(e) {
          if (e.mountState === y.Mounted && e.hooks?.state)
            for (const t of e.hooks.state.byCursor) t.value = t.nextValue;
        }
        function q(e, t) {
          A.hooks || (A.hooks = {}),
            A.hooks.state || (A.hooks.state = { cursor: 0, byCursor: [] });
          const { cursor: n, byCursor: o } = A.hooks.state,
            s = A;
          return (
            void 0 === o[n] &&
              (o[n] = {
                value: e,
                nextValue: e,
                setter: (e) => {
                  s.mountState !== y.Unmounted &&
                    ("function" == typeof e && (e = e(o[n].nextValue)),
                    o[n].nextValue !== e &&
                      ((o[n].nextValue = e),
                      B.add(s),
                      $(),
                      r.MVx &&
                        console.log(
                          "[Teact.useState]",
                          oe(s.Component),
                          `State update at cursor #${n}${
                            t ? ` (${t})` : ""
                          }, next value: `,
                          o[n].nextValue
                        )));
                },
              }),
            A.hooks.state.cursor++,
            [o[n].value, o[n].setter]
          );
        }
        function G(e, t, n, o) {
          A.hooks || (A.hooks = {}),
            A.hooks.effects || (A.hooks.effects = { cursor: 0, byCursor: [] });
          const { cursor: s, byCursor: a } = A.hooks.effects,
            i = a[s],
            d = A;
          function c() {
            !(function (e, t, n, o) {
              const { byCursor: s } = e.hooks.effects,
                a = s[t]?.cleanup,
                i = o ? U : R,
                d = o ? D : O,
                c = `${e.id}_${t}`;
              if (a) {
                const n = () =>
                  (0, f.A)(
                    () => {
                      let n;
                      if ((r.Oig && (n = performance.now()), a(), r.Oig)) {
                        const r = performance.now() - n,
                          o = oe(e.Component);
                        r > w &&
                          console.warn(
                            `[Teact] Slow cleanup at effect cursor #${t}: ${o}, ${Math.round(
                              r
                            )} ms`
                          );
                      }
                    },
                    () => {
                      console.error(
                        `[Teact] Error in effect cleanup at cursor #${t} in ${e.name}`,
                        e
                      );
                    },
                    () => {
                      s[t].cleanup = void 0;
                    }
                  );
                i.set(c, n);
              }
              d.set(c, () =>
                (0, f.A)(
                  () => {
                    if (e.mountState === y.Unmounted) return;
                    let o;
                    r.Oig && (o = performance.now());
                    const a = n();
                    if (("function" == typeof a && (s[t].cleanup = a), r.Oig)) {
                      const n = performance.now() - o,
                        r = oe(e.Component);
                      n > w &&
                        console.warn(
                          `[Teact] Slow effect at cursor #${t}: ${r}, ${Math.round(
                            n
                          )} ms`
                        );
                    }
                  },
                  () => {
                    console.error(
                      `[Teact] Error in effect at cursor #${t} in ${e.name}`,
                      e
                    );
                  }
                )
              ),
                $();
            })(d, s, t, e);
          }
          if (n && i?.dependencies) {
            if (n.some((e, t) => e !== i.dependencies[t])) {
              if (r.Oig && o) {
                const e = n.reduce((e, t, n) => {
                  const r = i.dependencies[n];
                  return t !== r && e.push(`${n}: ${r} => ${t}`), e;
                }, []);
                console.log(
                  `[Teact] Effect "${o}" caused by dependencies.`,
                  e.join(", ")
                );
              }
              c();
            }
          } else
            o &&
              console.log(
                `[Teact] Effect "${o}" caused by missing dependencies.`
              ),
              c();
          (a[s] = { ...i, dependencies: n, schedule: c }),
            i ||
              (a[s].releaseSignals = (function () {
                const e = n?.filter(h.Hp).map((e, t) =>
                  e.subscribe(() => {
                    o &&
                      console.log(
                        `[Teact] Effect "${o}" caused by signal #${t} new value:`,
                        e()
                      ),
                      a[s].schedule();
                  })
                );
                if (e?.length)
                  return () => {
                    for (const t of e) t();
                  };
              })()),
            A.hooks.effects.cursor++;
        }
        function X(e, t, n) {
          return G(!1, e, t, n);
        }
        function Y(e, t, n) {
          return G(!0, e, t, n);
        }
        function Q(e) {
          A.hooks || (A.hooks = {}),
            A.hooks.effects || (A.hooks.effects = { cursor: 0, byCursor: [] });
          const { cursor: t, byCursor: n } = A.hooks.effects;
          n[t] || (n[t] = { cleanup: e }), A.hooks.effects.cursor++;
        }
        function Z(e, t, n, s) {
          A.hooks || (A.hooks = {}),
            A.hooks.memos || (A.hooks.memos = { cursor: 0, byCursor: [] });
          const { cursor: a, byCursor: i } = A.hooks.memos;
          let d,
            { value: c } = i[a] || {};
          if (r.Oig && s) {
            const e = `${s}#${A.id}`;
            (d = N[e]),
              d ||
                ((d = { key: e, calls: 0, misses: 0, hitRate: 0 }), (N[e] = d)),
              d.calls++,
              (d.hitRate = (d.calls - d.misses) / d.calls);
          }
          if (
            void 0 === i[a] ||
            t.length !== i[a].dependencies.length ||
            t.some((e, t) => e !== i[a].dependencies[t])
          ) {
            if (r.Oig) {
              if (n) {
                const e = `[Teact.useMemo] ${A.name} (${n}): Update is caused by:`;
                i[a]
                  ? (0, o.q)(i[a].dependencies, t, e, n)
                  : console.log(`${e} [first render]`);
              }
              d &&
                (d.misses++,
                (d.hitRate = (d.calls - d.misses) / d.calls),
                d.calls % 10 == 0 &&
                  d.calls >= F &&
                  d.hitRate < 0.25 &&
                  console.warn(
                    `[Teact] ${d.key}: Hit rate is ${d.hitRate.toFixed(
                      2
                    )} for ${d.calls} calls`
                  ));
            }
            c = e();
          }
          return (
            (i[a] = { value: c, dependencies: t }), A.hooks.memos.cursor++, c
          );
        }
        function ee(e, t, n) {
          return Z(() => e, t, n);
        }
        function te(e) {
          A.hooks || (A.hooks = {}),
            A.hooks.refs || (A.hooks.refs = { cursor: 0, byCursor: [] });
          const { cursor: t, byCursor: n } = A.hooks.refs;
          return n[t] || (n[t] = { current: e }), A.hooks.refs.cursor++, n[t];
        }
        function ne(e) {
          const t = te();
          return t.current ?? (t.current = (0, h.n5)(e)), t.current;
        }
        function re(e, t) {
          function n(n) {
            return Z(
              () => E(e, n),
              Object.values(n),
              t,
              r.MVx ? oe(A.Component) : void 0
            );
          }
          return (n.DEBUG_contentComponentName = oe(e)), n;
        }
        function oe(e) {
          const { name: t, DEBUG_contentComponentName: n } = e;
          return "TeactNContainer" === t
            ? `container>${n}`
            : "TeactMemoWrapper" === t
            ? `memo>${n}`
            : "TeactContextProvider" === t
            ? `context>id${n}`
            : t + (n ? `>${n}` : "");
        }
        const se = { createElement: E, Fragment: b };
      },
      37932: (e, t, n) => {
        n.d(t, {
          Cn: () => P,
          DW: () => T,
          cl: () => N,
          ko: () => S,
          mS: () => C,
        });
        var r = n(31481),
          o = n(5930),
          s = n(2188),
          a = n(87894),
          i = n(37836),
          d = n(84051),
          c = n(30857),
          u = n(14745);
        function l() {
          return (
            (l = Object.assign
              ? Object.assign.bind()
              : function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n)
                      Object.prototype.hasOwnProperty.call(n, r) &&
                        (e[r] = n[r]);
                  }
                  return e;
                }),
            l.apply(this, arguments)
          );
        }
        let f,
          h = { isInited: !1 };
        const m = (0, i.Fe)(() => {
            f = void 0;
          }),
          p = {},
          g = [
            function () {
              let e;
              r.Oig && (e = performance.now());
              for (const e of b.values()) {
                const {
                  mapStateToProps: t,
                  ownProps: n,
                  mappedProps: a,
                  forceUpdate: i,
                } = e;
                if (!L(e, h, n)) continue;
                let d;
                try {
                  d = t(h, n);
                } catch (e) {
                  return void (0, s.H)(e);
                }
                r.Oig &&
                  Object.values(d).some(Number.isNaN) &&
                  console.warn(
                    `[TeactN] Some of \`${e.DEBUG_componentName}\` mappers contain NaN values. This may cause redundant updates because of incorrect equality check.`
                  ),
                  Object.keys(d).length &&
                    !(0, o.A)(a, d) &&
                    (r.MVx &&
                      (0, o.q)(
                        a,
                        d,
                        `[TeactN] Will update ${e.DEBUG_componentName} caused by:`
                      ),
                    (e.mappedProps = d),
                    e.DEBUG_updates++,
                    i());
              }
              if (r.Oig) {
                const t = performance.now() - e;
                t > 7 &&
                  console.warn(
                    `[TeactN] Slow containers update: ${Math.round(t)} ms`
                  );
              }
            },
          ],
          y = {},
          b = new Map(),
          v = (0, i.Fe)(I);
        let w = !0;
        function I() {
          if (w) w = !1;
          else if ((0, d.OV)()) return void d.OV.once(v);
          g.forEach((e) => e(h));
        }
        function A(e, t) {
          if ("object" == typeof e && e !== h) {
            if (r.Oig) {
              if (
                !t?.forceOutdated &&
                e.DEBUG_capturedId &&
                e.DEBUG_capturedId !== f
              )
                throw new Error(
                  "[TeactN.setGlobal] Attempt to set an outdated global"
                );
              f = void 0;
            }
            (h = e),
              r.Oig && (f = Math.random()),
              t?.forceSyncOnIOs
                ? ((w = !0), I())
                : (t?.forceOnHeavyAnimation && (w = !0), v());
          }
        }
        function C() {
          return r.Oig && ((h = { ...h, DEBUG_capturedId: f }), m()), h;
        }
        function S() {
          return y;
        }
        let E = [];
        function k(e, t) {
          p[e] ||
            ((p[e] = []),
            (y[e] = (t, n) => {
              !(function (e, t, n) {
                if (
                  (E.push(() => {
                    p[e]?.forEach((e) => {
                      const o = e(r.Oig ? C() : h, y, t);
                      o && "function" != typeof o.then && A(o, n);
                    });
                  }),
                  1 === E.length)
                )
                  try {
                    for (; E.length; ) E[0](), E.shift();
                  } finally {
                    E = [];
                  }
              })(e, t, n);
            })),
            p[e].push(t);
        }
        function T(e) {
          g.push(e);
        }
        function P(e) {
          const t = g.indexOf(e);
          -1 !== t && g.splice(t, 1);
        }
        function M() {
          let e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : () => ({}),
            t = arguments.length > 1 ? arguments[1] : void 0;
          return (n) => {
            function r(r) {
              const a = (0, u.A)(),
                i = (0, c.A)();
              (0, d._W)(() => {
                b.delete(a);
              });
              let f = b.get(a);
              if (
                (f ||
                  ((f = {
                    mapStateToProps: e,
                    activationFn: t,
                    ownProps: r,
                    forceUpdate: i,
                    DEBUG_updates: 0,
                    DEBUG_componentName: n.name,
                  }),
                  b.set(a, f)),
                !f.mappedProps || (!(0, o.A)(f.ownProps, r) && L(f, h, r)))
              )
                try {
                  f.mappedProps = e(h, r);
                } catch (e) {
                  (0, s.H)(e);
                }
              return (
                (f.ownProps = r), d.Ay.createElement(n, l({}, f.mappedProps, r))
              );
            }
            return (r.DEBUG_contentComponentName = (0, d.$Z)(n)), r;
          };
        }
        function L(e, t, n) {
          const { activationFn: r, stuckTo: o } = e;
          return (
            !r ||
            r(t, n, (t) => (t && !o && (e.stuckTo = t), t && (!o || o === t)))
          );
        }
        function N() {
          return {
            getGlobal: C,
            setGlobal: A,
            getActions: S,
            addActionHandler: k,
            withGlobal: M,
          };
        }
        r.Oig &&
          ((window.getGlobal = C),
          (window.setGlobal = A),
          document.addEventListener("dblclick", () => {
            console.warn(
              "GLOBAL CONTAINERS",
              (0, a.My)(
                Array.from(b.values()).map((e) => {
                  let { DEBUG_componentName: t, DEBUG_updates: n } = e;
                  return { DEBUG_componentName: t, DEBUG_updates: n };
                }),
                "DEBUG_updates",
                "desc"
              )
            );
          }));
      },
      98221: (e, t, n) => {
        n.d(t, { A: () => a, a: () => s });
        const r = /\uFE0F/g,
          o = String.fromCharCode(8205);
        function s(e) {
          return e.indexOf(o) < 0 ? e.replace(r, "") : e;
        }
        const a =
          /(?:\ud83c[\udd70\udd71\udd7e\udd7f]\ufe0f)|(?:\ud83d\udc68\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83d\udc68\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc68\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc68\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d[\udc68\udc69]|\ud83e\udef1\ud83c\udffb\u200d\ud83e\udef2\ud83c[\udffc-\udfff]|\ud83e\udef1\ud83c\udffc\u200d\ud83e\udef2\ud83c[\udffb\udffd-\udfff]|\ud83e\udef1\ud83c\udffd\u200d\ud83e\udef2\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\udef1\ud83c\udffe\u200d\ud83e\udef2\ud83c[\udffb-\udffd\udfff]|\ud83e\udef1\ud83c\udfff\u200d\ud83e\udef2\ud83c[\udffb-\udffe]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d[\udc68\udc69]|\ud83e\uddd1\u200d\ud83e\udd1d\u200d\ud83e\uddd1|\ud83d\udc6b\ud83c[\udffb-\udfff]|\ud83d\udc6c\ud83c[\udffb-\udfff]|\ud83d\udc6d\ud83c[\udffb-\udfff]|\ud83d\udc8f\ud83c[\udffb-\udfff]|\ud83d\udc91\ud83c[\udffb-\udfff]|\ud83e\udd1d\ud83c[\udffb-\udfff]|\ud83d[\udc6b-\udc6d\udc8f\udc91]|\ud83e\udd1d)|(?:\ud83c\udfc3|\ud83d\udeb6|\ud83e\uddce)(?:\ud83c[\udffb-\udfff])?(?:\u200d[\u2640\u2642]\ufe0f)?(?:\u200d\u27a1\ufe0f)|(?:\ud83d[\udc68\udc69]|\ud83e\uddd1)(?:\ud83c[\udffb-\udfff])?\u200d(?:\ud83e[\uddaf\uddbc\uddbd])(?:\u200d\u27a1\ufe0f)|(?:\ud83d[\udc68\udc69]|\ud83e\uddd1)(?:\ud83c[\udffb-\udfff])?\u200d(?:\u2695\ufe0f|\u2696\ufe0f|\u2708\ufe0f|\ud83c[\udf3e\udf73\udf7c\udf84\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d[\udcbb\udcbc\udd27\udd2c\ude80\ude92]|\ud83e[\uddaf\uddaf-\uddb3\uddbc\uddbc\uddbd\uddbd])|(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75]|\u26f9)((?:\ud83c[\udffb-\udfff]|\ufe0f)\u200d[\u2640\u2642]\ufe0f)|(?:\ud83c[\udfc3\udfc3\udfc4\udfca]|\ud83d[\udc6e\udc70\udc71\udc73\udc77\udc81\udc82\udc86\udc87\ude45-\ude47\ude4b\ude4d\ude4e\udea3\udeb4-\udeb6\udeb6]|\ud83e[\udd26\udd35\udd37-\udd39\udd3d\udd3e\uddb8\uddb9\uddcd\uddce\uddce\uddcf\uddd4\uddd6-\udddd])(?:\ud83c[\udffb-\udfff])?\u200d[\u2640\u2642]\ufe0f|(?:\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83e\uddd1\u200d\ud83e\uddd1\u200d\ud83e\uddd2\u200d\ud83e\uddd2|\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83e\uddd1\u200d\ud83e\uddd1\u200d\ud83e\uddd2|\ud83e\uddd1\u200d\ud83e\uddd2\u200d\ud83e\uddd2|\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f|\ud83c\udff3\ufe0f\u200d\ud83c\udf08|\ud83d\ude36\u200d\ud83c\udf2b\ufe0f|\u26d3\ufe0f\u200d\ud83d\udca5|\u2764\ufe0f\u200d\ud83d\udd25|\u2764\ufe0f\u200d\ud83e\ude79|\ud83c\udf44\u200d\ud83d\udfeb|\ud83c\udf4b\u200d\ud83d\udfe9|\ud83c\udff4\u200d\u2620\ufe0f|\ud83d\udc15\u200d\ud83e\uddba|\ud83d\udc26\u200d\ud83d\udd25|\ud83d\udc3b\u200d\u2744\ufe0f|\ud83d\udc41\u200d\ud83d\udde8|\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc6f\u200d\u2640\ufe0f|\ud83d\udc6f\u200d\u2642\ufe0f|\ud83d\ude2e\u200d\ud83d\udca8|\ud83d\ude35\u200d\ud83d\udcab|\ud83d\ude42\u200d\u2194\ufe0f|\ud83d\ude42\u200d\u2195\ufe0f|\ud83e\udd3c\u200d\u2640\ufe0f|\ud83e\udd3c\u200d\u2642\ufe0f|\ud83e\uddd1\u200d\ud83e\uddd2|\ud83e\uddde\u200d\u2640\ufe0f|\ud83e\uddde\u200d\u2642\ufe0f|\ud83e\udddf\u200d\u2640\ufe0f|\ud83e\udddf\u200d\u2642\ufe0f|\ud83d\udc08\u200d\u2b1b|\ud83d\udc26\u200d\u2b1b)|[#*0-9]\ufe0f?\u20e3|(?:[©®\u2122\u265f]\ufe0f)|(?:\ud83c[\udc04\ude02\ude1a\ude2f\ude37\udf21\udf24-\udf2c\udf36\udf7d\udf96\udf97\udf99-\udf9b\udf9e\udf9f\udfcd\udfce\udfd4-\udfdf\udff3\udff5\udff7]|\ud83d[\udc3f\udc41\udcfd\udd49\udd4a\udd6f\udd70\udd73\udd76-\udd79\udd87\udd8a-\udd8d\udda5\udda8\uddb1\uddb2\uddbc\uddc2-\uddc4\uddd1-\uddd3\udddc-\uddde\udde1\udde3\udde8\uddef\uddf3\uddfa\udecb\udecd-\udecf\udee0-\udee5\udee9\udef0\udef3]|[\u203c\u2049\u2139\u2194-\u2199\u21a9\u21aa\u231a\u231b\u2328\u23cf\u23ed-\u23ef\u23f1\u23f2\u23f8-\u23fa\u24c2\u25aa\u25ab\u25b6\u25c0\u25fb-\u25fe\u2600-\u2604\u260e\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262a\u262e\u262f\u2638-\u263a\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267b\u267f\u2692-\u2697\u2699\u269b\u269c\u26a0\u26a1\u26a7\u26aa\u26ab\u26b0\u26b1\u26bd\u26be\u26c4\u26c5\u26c8\u26cf\u26d1\u26d3\u26d4\u26e9\u26ea\u26f0-\u26f5\u26f8\u26fa\u26fd\u2702\u2708\u2709\u270f\u2712\u2714\u2716\u271d\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u2764\u27a1\u2934\u2935\u2b05-\u2b07\u2b1b\u2b1c\u2b50\u2b55\u3030\u303d\u3297\u3299])(?:\ufe0f|(?!\ufe0e))|(?:(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75\udd90]|\ud83e\udef0|[\u261d\u26f7\u26f9\u270c\u270d])(?:\ufe0f|(?!\ufe0e))|(?:\ud83c[\udf85\udfc2-\udfc4\udfc7\udfca]|\ud83d[\udc42\udc43\udc46-\udc50\udc66-\udc69\udc6e\udc70-\udc78\udc7c\udc81-\udc83\udc85-\udc87\udcaa\udd7a\udd95\udd96\ude45-\ude47\ude4b-\ude4f\udea3\udeb4-\udeb6\udec0\udecc]|\ud83e[\udd0c\udd0f\udd18-\udd1c\udd1e\udd1f\udd26\udd30-\udd39\udd3d\udd3e\udd77\uddb5\uddb6\uddb8\uddb9\uddbb\uddcd-\uddcf\uddd1-\udddd\udec3-\udec5\udef1-\udef8]|[\u270a\u270b]))(?:\ud83c[\udffb-\udfff])?|(?:\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f|\ud83c\udde6\ud83c[\udde8-\uddec\uddee\uddf1\uddf2\uddf4\uddf6-\uddfa\uddfc\uddfd\uddff]|\ud83c\udde7\ud83c[\udde6\udde7\udde9-\uddef\uddf1-\uddf4\uddf6-\uddf9\uddfb\uddfc\uddfe\uddff]|\ud83c\udde8\ud83c[\udde6\udde8\udde9\uddeb-\uddee\uddf0-\uddf5\uddf7\uddfa-\uddff]|\ud83c\udde9\ud83c[\uddea\uddec\uddef\uddf0\uddf2\uddf4\uddff]|\ud83c\uddea\ud83c[\udde6\udde8\uddea\uddec\udded\uddf7-\uddfa]|\ud83c\uddeb\ud83c[\uddee-\uddf0\uddf2\uddf4\uddf7]|\ud83c\uddec\ud83c[\udde6\udde7\udde9-\uddee\uddf1-\uddf3\uddf5-\uddfa\uddfc\uddfe]|\ud83c\udded\ud83c[\uddf0\uddf2\uddf3\uddf7\uddf9\uddfa]|\ud83c\uddee\ud83c[\udde8-\uddea\uddf1-\uddf4\uddf6-\uddf9]|\ud83c\uddef\ud83c[\uddea\uddf2\uddf4\uddf5]|\ud83c\uddf0\ud83c[\uddea\uddec-\uddee\uddf2\uddf3\uddf5\uddf7\uddfc\uddfe\uddff]|\ud83c\uddf1\ud83c[\udde6-\udde8\uddee\uddf0\uddf7-\uddfb\uddfe]|\ud83c\uddf2\ud83c[\udde6\udde8-\udded\uddf0-\uddff]|\ud83c\uddf3\ud83c[\udde6\udde8\uddea-\uddec\uddee\uddf1\uddf4\uddf5\uddf7\uddfa\uddff]|\ud83c\uddf4\ud83c\uddf2|\ud83c\uddf5\ud83c[\udde6\uddea-\udded\uddf0-\uddf3\uddf7-\uddf9\uddfc\uddfe]|\ud83c\uddf6\ud83c\udde6|\ud83c\uddf7\ud83c[\uddea\uddf4\uddf8\uddfa\uddfc]|\ud83c\uddf8\ud83c[\udde6-\uddea\uddec-\uddf4\uddf7-\uddf9\uddfb\uddfd-\uddff]|\ud83c\uddf9\ud83c[\udde6\udde8\udde9\uddeb-\udded\uddef-\uddf4\uddf7\uddf9\uddfb\uddfc\uddff]|\ud83c\uddfa\ud83c[\udde6\uddec\uddf2\uddf3\uddf8\uddfe\uddff]|\ud83c\uddfb\ud83c[\udde6\udde8\uddea\uddec\uddee\uddf3\uddfa]|\ud83c\uddfc\ud83c[\uddeb\uddf8]|\ud83c\uddfd\ud83c\uddf0|\ud83c\uddfe\ud83c[\uddea\uddf9]|\ud83c\uddff\ud83c[\udde6\uddf2\uddfc]|\ud83c[\udccf\udd8e\udd91-\udd9a\udde6-\uddff\ude01\ude32-\ude36\ude38-\ude3a\ude50\ude51\udf00-\udf20\udf2d-\udf35\udf37-\udf7c\udf7e-\udf84\udf86-\udf93\udfa0-\udfc1\udfc5\udfc6\udfc8\udfc9\udfcf-\udfd3\udfe0-\udff0\udff4\udff8-\udfff]|\ud83d[\udc00-\udc3e\udc40\udc44\udc45\udc51-\udc65\udc6a\udc6f\udc79-\udc7b\udc7d-\udc80\udc84\udc88-\udc8e\udc90\udc92-\udca9\udcab-\udcfc\udcff-\udd3d\udd4b-\udd4e\udd50-\udd67\udda4\uddfb-\ude44\ude48-\ude4a\ude80-\udea2\udea4-\udeb3\udeb7-\udebf\udec1-\udec5\uded0-\uded2\uded5-\uded7\udedc-\udedf\udeeb\udeec\udef4-\udefc\udfe0-\udfeb\udff0]|\ud83e[\udd0d\udd0e\udd10-\udd17\udd20-\udd25\udd27-\udd2f\udd3a\udd3c\udd3f-\udd45\udd47-\udd76\udd78-\uddb4\uddb7\uddba\uddbc-\uddcc\uddd0\uddde-\uddff\ude70-\ude7c\ude80-\ude88\ude90-\udebd\udebf-\udec2\udece-\udedb\udee0-\udee8]|[\u23e9-\u23ec\u23f0\u23f3\u267e\u26ce\u2705\u2728\u274c\u274e\u2753-\u2755\u2795-\u2797\u27b0\u27bf\ue50a])|\ufe0f/g;
      },
      89925: (e, t, n) => {
        n.d(t, {
          $C: () => i,
          Bn: () => a,
          CC: () => o,
          D7: () => p,
          DV: () => h,
          G9: () => u,
          TD: () => m,
          TN: () => r,
          TQ: () => c,
          Ul: () => d,
          VS: () => s,
          Vw: () => b,
          d9: () => l,
          je: () => v,
          n7: () => f,
          tn: () => y,
          zW: () => g,
        });
        let r = (function (e) {
            return (
              (e[(e.Backwards = 0)] = "Backwards"),
              (e[(e.Forwards = 1)] = "Forwards"),
              (e[(e.Around = 2)] = "Around"),
              e
            );
          })({}),
          o = (function (e) {
            return (
              (e[(e.Up = 0)] = "Up"),
              (e[(e.Down = 1)] = "Down"),
              (e[(e.Static = 2)] = "Static"),
              e
            );
          })({}),
          s = (function (e) {
            return (
              (e[(e.Main = 0)] = "Main"),
              (e[(e.EditProfile = 1)] = "EditProfile"),
              (e[(e.Notifications = 2)] = "Notifications"),
              (e[(e.DataStorage = 3)] = "DataStorage"),
              (e[(e.Language = 4)] = "Language"),
              (e[(e.ActiveSessions = 5)] = "ActiveSessions"),
              (e[(e.General = 6)] = "General"),
              (e[(e.GeneralChatBackground = 7)] = "GeneralChatBackground"),
              (e[(e.GeneralChatBackgroundColor = 8)] =
                "GeneralChatBackgroundColor"),
              (e[(e.Privacy = 9)] = "Privacy"),
              (e[(e.PrivacyPhoneNumber = 10)] = "PrivacyPhoneNumber"),
              (e[(e.PrivacyAddByPhone = 11)] = "PrivacyAddByPhone"),
              (e[(e.PrivacyLastSeen = 12)] = "PrivacyLastSeen"),
              (e[(e.PrivacyProfilePhoto = 13)] = "PrivacyProfilePhoto"),
              (e[(e.PrivacyBio = 14)] = "PrivacyBio"),
              (e[(e.PrivacyBirthday = 15)] = "PrivacyBirthday"),
              (e[(e.PrivacyPhoneCall = 16)] = "PrivacyPhoneCall"),
              (e[(e.PrivacyPhoneP2P = 17)] = "PrivacyPhoneP2P"),
              (e[(e.PrivacyForwarding = 18)] = "PrivacyForwarding"),
              (e[(e.PrivacyVoiceMessages = 19)] = "PrivacyVoiceMessages"),
              (e[(e.PrivacyMessages = 20)] = "PrivacyMessages"),
              (e[(e.PrivacyGroupChats = 21)] = "PrivacyGroupChats"),
              (e[(e.PrivacyPhoneNumberAllowedContacts = 22)] =
                "PrivacyPhoneNumberAllowedContacts"),
              (e[(e.PrivacyPhoneNumberDeniedContacts = 23)] =
                "PrivacyPhoneNumberDeniedContacts"),
              (e[(e.PrivacyLastSeenAllowedContacts = 24)] =
                "PrivacyLastSeenAllowedContacts"),
              (e[(e.PrivacyLastSeenDeniedContacts = 25)] =
                "PrivacyLastSeenDeniedContacts"),
              (e[(e.PrivacyProfilePhotoAllowedContacts = 26)] =
                "PrivacyProfilePhotoAllowedContacts"),
              (e[(e.PrivacyProfilePhotoDeniedContacts = 27)] =
                "PrivacyProfilePhotoDeniedContacts"),
              (e[(e.PrivacyBioAllowedContacts = 28)] =
                "PrivacyBioAllowedContacts"),
              (e[(e.PrivacyBioDeniedContacts = 29)] =
                "PrivacyBioDeniedContacts"),
              (e[(e.PrivacyBirthdayAllowedContacts = 30)] =
                "PrivacyBirthdayAllowedContacts"),
              (e[(e.PrivacyBirthdayDeniedContacts = 31)] =
                "PrivacyBirthdayDeniedContacts"),
              (e[(e.PrivacyPhoneCallAllowedContacts = 32)] =
                "PrivacyPhoneCallAllowedContacts"),
              (e[(e.PrivacyPhoneCallDeniedContacts = 33)] =
                "PrivacyPhoneCallDeniedContacts"),
              (e[(e.PrivacyPhoneP2PAllowedContacts = 34)] =
                "PrivacyPhoneP2PAllowedContacts"),
              (e[(e.PrivacyPhoneP2PDeniedContacts = 35)] =
                "PrivacyPhoneP2PDeniedContacts"),
              (e[(e.PrivacyForwardingAllowedContacts = 36)] =
                "PrivacyForwardingAllowedContacts"),
              (e[(e.PrivacyForwardingDeniedContacts = 37)] =
                "PrivacyForwardingDeniedContacts"),
              (e[(e.PrivacyVoiceMessagesAllowedContacts = 38)] =
                "PrivacyVoiceMessagesAllowedContacts"),
              (e[(e.PrivacyVoiceMessagesDeniedContacts = 39)] =
                "PrivacyVoiceMessagesDeniedContacts"),
              (e[(e.PrivacyGroupChatsAllowedContacts = 40)] =
                "PrivacyGroupChatsAllowedContacts"),
              (e[(e.PrivacyGroupChatsDeniedContacts = 41)] =
                "PrivacyGroupChatsDeniedContacts"),
              (e[(e.PrivacyBlockedUsers = 42)] = "PrivacyBlockedUsers"),
              (e[(e.Performance = 43)] = "Performance"),
              (e[(e.Folders = 44)] = "Folders"),
              (e[(e.FoldersCreateFolder = 45)] = "FoldersCreateFolder"),
              (e[(e.FoldersEditFolder = 46)] = "FoldersEditFolder"),
              (e[(e.FoldersEditFolderFromChatList = 47)] =
                "FoldersEditFolderFromChatList"),
              (e[(e.FoldersEditFolderInvites = 48)] =
                "FoldersEditFolderInvites"),
              (e[(e.FoldersIncludedChats = 49)] = "FoldersIncludedChats"),
              (e[(e.FoldersIncludedChatsFromChatList = 50)] =
                "FoldersIncludedChatsFromChatList"),
              (e[(e.FoldersExcludedChats = 51)] = "FoldersExcludedChats"),
              (e[(e.FoldersExcludedChatsFromChatList = 52)] =
                "FoldersExcludedChatsFromChatList"),
              (e[(e.TwoFaDisabled = 53)] = "TwoFaDisabled"),
              (e[(e.TwoFaNewPassword = 54)] = "TwoFaNewPassword"),
              (e[(e.TwoFaNewPasswordConfirm = 55)] = "TwoFaNewPasswordConfirm"),
              (e[(e.TwoFaNewPasswordHint = 56)] = "TwoFaNewPasswordHint"),
              (e[(e.TwoFaNewPasswordEmail = 57)] = "TwoFaNewPasswordEmail"),
              (e[(e.TwoFaNewPasswordEmailCode = 58)] =
                "TwoFaNewPasswordEmailCode"),
              (e[(e.TwoFaEnabled = 59)] = "TwoFaEnabled"),
              (e[(e.TwoFaChangePasswordCurrent = 60)] =
                "TwoFaChangePasswordCurrent"),
              (e[(e.TwoFaChangePasswordNew = 61)] = "TwoFaChangePasswordNew"),
              (e[(e.TwoFaChangePasswordConfirm = 62)] =
                "TwoFaChangePasswordConfirm"),
              (e[(e.TwoFaChangePasswordHint = 63)] = "TwoFaChangePasswordHint"),
              (e[(e.TwoFaTurnOff = 64)] = "TwoFaTurnOff"),
              (e[(e.TwoFaRecoveryEmailCurrentPassword = 65)] =
                "TwoFaRecoveryEmailCurrentPassword"),
              (e[(e.TwoFaRecoveryEmail = 66)] = "TwoFaRecoveryEmail"),
              (e[(e.TwoFaRecoveryEmailCode = 67)] = "TwoFaRecoveryEmailCode"),
              (e[(e.TwoFaCongratulations = 68)] = "TwoFaCongratulations"),
              (e[(e.ActiveWebsites = 69)] = "ActiveWebsites"),
              (e[(e.PasscodeDisabled = 70)] = "PasscodeDisabled"),
              (e[(e.PasscodeNewPasscode = 71)] = "PasscodeNewPasscode"),
              (e[(e.PasscodeNewPasscodeConfirm = 72)] =
                "PasscodeNewPasscodeConfirm"),
              (e[(e.PasscodeEnabled = 73)] = "PasscodeEnabled"),
              (e[(e.PasscodeChangePasscodeCurrent = 74)] =
                "PasscodeChangePasscodeCurrent"),
              (e[(e.PasscodeChangePasscodeNew = 75)] =
                "PasscodeChangePasscodeNew"),
              (e[(e.PasscodeChangePasscodeConfirm = 76)] =
                "PasscodeChangePasscodeConfirm"),
              (e[(e.PasscodeTurnOff = 77)] = "PasscodeTurnOff"),
              (e[(e.PasscodeCongratulations = 78)] = "PasscodeCongratulations"),
              (e[(e.Experimental = 79)] = "Experimental"),
              (e[(e.Stickers = 80)] = "Stickers"),
              (e[(e.QuickReaction = 81)] = "QuickReaction"),
              (e[(e.CustomEmoji = 82)] = "CustomEmoji"),
              (e[(e.DoNotTranslate = 83)] = "DoNotTranslate"),
              (e[(e.FoldersShare = 84)] = "FoldersShare"),
              e
            );
          })({}),
          a = (function (e) {
            return (
              (e[(e.ChatList = 0)] = "ChatList"),
              (e[(e.GlobalSearch = 1)] = "GlobalSearch"),
              (e[(e.Settings = 2)] = "Settings"),
              (e[(e.Contacts = 3)] = "Contacts"),
              (e[(e.Archived = 4)] = "Archived"),
              (e[(e.NewChannelStep1 = 5)] = "NewChannelStep1"),
              (e[(e.NewChannelStep2 = 6)] = "NewChannelStep2"),
              (e[(e.NewGroupStep1 = 7)] = "NewGroupStep1"),
              (e[(e.NewGroupStep2 = 8)] = "NewGroupStep2"),
              e
            );
          })({}),
          i = (function (e) {
            return (
              (e[(e.ChatList = 0)] = "ChatList"),
              (e[(e.ChannelList = 1)] = "ChannelList"),
              (e[(e.BotApps = 2)] = "BotApps"),
              (e[(e.Media = 3)] = "Media"),
              (e[(e.Links = 4)] = "Links"),
              (e[(e.Files = 5)] = "Files"),
              (e[(e.Music = 6)] = "Music"),
              (e[(e.Voice = 7)] = "Voice"),
              e
            );
          })({}),
          d = (function (e) {
            return (
              (e[(e.ChatInfo = 0)] = "ChatInfo"),
              (e[(e.Management = 1)] = "Management"),
              (e[(e.Statistics = 2)] = "Statistics"),
              (e[(e.BoostStatistics = 3)] = "BoostStatistics"),
              (e[(e.MessageStatistics = 4)] = "MessageStatistics"),
              (e[(e.StoryStatistics = 5)] = "StoryStatistics"),
              (e[(e.StickerSearch = 6)] = "StickerSearch"),
              (e[(e.GifSearch = 7)] = "GifSearch"),
              (e[(e.PollResults = 8)] = "PollResults"),
              (e[(e.AddingMembers = 9)] = "AddingMembers"),
              (e[(e.CreateTopic = 10)] = "CreateTopic"),
              (e[(e.EditTopic = 11)] = "EditTopic"),
              (e[(e.MonetizationStatistics = 12)] = "MonetizationStatistics"),
              e
            );
          })({}),
          c = (function (e) {
            return (
              (e[(e.Inline = 0)] = "Inline"),
              (e[(e.ScheduledInline = 1)] = "ScheduledInline"),
              (e[(e.SharedMedia = 2)] = "SharedMedia"),
              (e[(e.ProfileAvatar = 3)] = "ProfileAvatar"),
              (e[(e.SettingsAvatar = 4)] = "SettingsAvatar"),
              (e[(e.MiddleHeaderAvatar = 5)] = "MiddleHeaderAvatar"),
              (e[(e.Album = 6)] = "Album"),
              (e[(e.ScheduledAlbum = 7)] = "ScheduledAlbum"),
              (e[(e.SearchResult = 8)] = "SearchResult"),
              (e[(e.SuggestedAvatar = 9)] = "SuggestedAvatar"),
              (e[(e.StarsTransaction = 10)] = "StarsTransaction"),
              (e[(e.PreviewMedia = 11)] = "PreviewMedia"),
              (e[(e.SponsoredMessage = 12)] = "SponsoredMessage"),
              e
            );
          })({}),
          u = (function (e) {
            return (
              (e[(e.StoryRibbon = 0)] = "StoryRibbon"),
              (e[(e.MiddleHeaderAvatar = 1)] = "MiddleHeaderAvatar"),
              (e[(e.ChatList = 2)] = "ChatList"),
              (e[(e.SearchResult = 3)] = "SearchResult"),
              e
            );
          })({}),
          l = (function (e) {
            return (
              (e[(e.Inline = 0)] = "Inline"),
              (e[(e.SharedMedia = 1)] = "SharedMedia"),
              (e[(e.Search = 2)] = "Search"),
              (e[(e.OneTimeModal = 3)] = "OneTimeModal"),
              e
            );
          })({}),
          f = (function (e) {
            return (
              (e[(e.Idle = 0)] = "Idle"),
              (e[(e.InProgress = 1)] = "InProgress"),
              (e[(e.Complete = 2)] = "Complete"),
              (e[(e.Error = 3)] = "Error"),
              e
            );
          })({}),
          h = (function (e) {
            return (
              (e[(e.Idle = 0)] = "Idle"),
              (e[(e.InProgress = 1)] = "InProgress"),
              (e[(e.Complete = 2)] = "Complete"),
              (e[(e.Error = 3)] = "Error"),
              e
            );
          })({}),
          m = (function (e) {
            return (
              (e[(e.Idle = 0)] = "Idle"),
              (e[(e.InProgress = 1)] = "InProgress"),
              (e[(e.Complete = 2)] = "Complete"),
              (e[(e.Error = 3)] = "Error"),
              e
            );
          })({}),
          p = (function (e) {
            return (
              (e[(e.Closed = 0)] = "Closed"),
              (e[(e.InProgress = 1)] = "InProgress"),
              (e[(e.Loading = 2)] = "Loading"),
              e
            );
          })({}),
          g = (function (e) {
            return (
              (e[(e.Profile = 0)] = "Profile"),
              (e[(e.SharedMedia = 1)] = "SharedMedia"),
              (e[(e.MemberList = 2)] = "MemberList"),
              (e[(e.StoryList = 3)] = "StoryList"),
              (e[(e.SavedDialogs = 4)] = "SavedDialogs"),
              e
            );
          })({}),
          y = (function (e) {
            return (
              (e[(e.Checkout = 0)] = "Checkout"),
              (e[(e.SavedPayments = 1)] = "SavedPayments"),
              (e[(e.ConfirmPassword = 2)] = "ConfirmPassword"),
              (e[(e.PaymentInfo = 3)] = "PaymentInfo"),
              (e[(e.ShippingInfo = 4)] = "ShippingInfo"),
              (e[(e.Shipping = 5)] = "Shipping"),
              (e[(e.ConfirmPayment = 6)] = "ConfirmPayment"),
              e
            );
          })({});
        const b = "UPLOADING_WALLPAPER_SLUG";
        let v = (function (e) {
          return (
            (e[(e.Initial = 0)] = "Initial"),
            (e[(e.ChatPrivacyType = 1)] = "ChatPrivacyType"),
            (e[(e.Discussion = 2)] = "Discussion"),
            (e[(e.ChannelSubscribers = 3)] = "ChannelSubscribers"),
            (e[(e.GroupType = 4)] = "GroupType"),
            (e[(e.GroupPermissions = 5)] = "GroupPermissions"),
            (e[(e.GroupRemovedUsers = 6)] = "GroupRemovedUsers"),
            (e[(e.ChannelRemovedUsers = 7)] = "ChannelRemovedUsers"),
            (e[(e.GroupUserPermissionsCreate = 8)] =
              "GroupUserPermissionsCreate"),
            (e[(e.GroupUserPermissions = 9)] = "GroupUserPermissions"),
            (e[(e.ChatAdministrators = 10)] = "ChatAdministrators"),
            (e[(e.GroupRecentActions = 11)] = "GroupRecentActions"),
            (e[(e.ChatAdminRights = 12)] = "ChatAdminRights"),
            (e[(e.ChatNewAdminRights = 13)] = "ChatNewAdminRights"),
            (e[(e.GroupMembers = 14)] = "GroupMembers"),
            (e[(e.GroupAddAdmins = 15)] = "GroupAddAdmins"),
            (e[(e.Invites = 16)] = "Invites"),
            (e[(e.EditInvite = 17)] = "EditInvite"),
            (e[(e.Reactions = 18)] = "Reactions"),
            (e[(e.InviteInfo = 19)] = "InviteInfo"),
            (e[(e.JoinRequests = 20)] = "JoinRequests"),
            e
          );
        })({});
      },
      9705: (e, t, n) => {
        function r(e, t, n) {
          var r;
          return (
            (t =
              "symbol" ==
              typeof (r = (function (e, t) {
                if ("object" != typeof e || !e) return e;
                var n = e[Symbol.toPrimitive];
                if (void 0 !== n) {
                  var r = n.call(e, "string");
                  if ("object" != typeof r) return r;
                  throw new TypeError(
                    "@@toPrimitive must return a primitive value."
                  );
                }
                return String(e);
              })(t))
                ? r
                : r + "") in e
              ? Object.defineProperty(e, t, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = n),
            e
          );
        }
        n.d(t, { A: () => o });
        class o {
          constructor() {
            r(this, "promise", void 0),
              r(this, "reject", void 0),
              r(this, "resolve", void 0),
              (this.promise = new Promise((e, t) => {
                (this.reject = t), (this.resolve = e);
              }));
          }
          static resolved(e) {
            const t = new o();
            return t.resolve(e), t;
          }
        }
      },
      19822: (e, t, n) => {
        n.d(t, {
          Hd: () => u,
          S0: () => s,
          ZM: () => l,
          i0: () => i,
          qM: () => c,
          vk: () => a,
        });
        var r = n(66644);
        let o;
        function s(e, t, n) {
          n ||
            (o && !o.isCancelled && (o.isCancelled = !0),
            (o = n = { isCancelled: !1 })),
            !n.isCancelled &&
              e() &&
              t(() => {
                s(e, t, n);
              });
        }
        function a() {
          s(
            () => {},
            (e) => e
          );
        }
        function i(e, t) {
          t(() => {
            e() && i(e, t);
          });
        }
        function d(e, t) {
          e() &&
            t(() => {
              d(e, t);
            });
        }
        const c = {
          linear: (e) => e,
          easeIn: (e) => e ** 1.675,
          easeOut: (e) => -1 * e ** 1.675,
          easeInOut: (e) => 0.5 * (Math.sin((e - 0.5) * Math.PI) + 1),
          easeInQuad: (e) => e * e,
          easeOutQuad: (e) => e * (2 - e),
          easeInOutQuad: (e) => (e < 0.5 ? 2 * e * e : (4 - 2 * e) * e - 1),
          easeInCubic: (e) => e ** 3,
          easeOutCubic: (e) => --e * e * e + 1,
          easeInOutCubic: (e) =>
            e < 0.5 ? 4 * e ** 3 : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1,
          easeInQuart: (e) => e ** 4,
          easeOutQuart: (e) => 1 - --e * e ** 3,
          easeInOutQuart: (e) => (e < 0.5 ? 8 * e ** 4 : 1 - 8 * --e * e ** 3),
          easeInQuint: (e) => e ** 5,
          easeOutQuint: (e) => 1 + --e * e ** 4,
          easeInOutQuint: (e) =>
            e < 0.5 ? 16 * e ** 5 : 1 + 16 * --e * e ** 4,
        };
        function u(e) {
          let {
            timing: t = c.linear,
            onUpdate: n,
            duration: o,
            onEnd: s,
            from: a,
            to: i,
          } = e;
          const u = Date.now();
          let l = !1;
          return (
            d(() => {
              if (l) return !1;
              const e = Date.now(),
                r = Math.min((e - u) / o, 1),
                d = t(r);
              if ("number" == typeof a && "number" == typeof i)
                n(a + (i - a) * d);
              else if (Array.isArray(a) && Array.isArray(i)) {
                const e = a.map((e, t) => e + (i[t] - e) * d);
                n(e);
              }
              return 1 === r && s?.(), r < 1;
            }, r.YS),
            () => {
              (l = !0), s?.(!0);
            }
          );
        }
        function l(e, t) {
          Object.assign(e.style, t);
        }
      },
      26120: (e, t, n) => {
        n.d(t, { q: () => a });
        var r = n(13439),
          o = n(31481),
          s = n(29807);
        function a(e) {
          (0, s.nTw)((0, r.mS)()).isMasterTab &&
            "function" == typeof window.navigator.setAppBadge &&
            window.navigator.setAppBadge(e).catch((e) => {
              o.Oig && console.error(e);
            });
        }
      },
      22986: (e, t, n) => {
        function r(e, t) {
          const n = typeof e;
          if (n !== typeof t) return !1;
          if ("object" !== n || null === e || null === t) return e === t;
          const o = Array.isArray(e);
          if (o !== Array.isArray(t)) return !1;
          if (o) {
            const n = e,
              o = t;
            return n.length === o.length && n.every((e, t) => r(e, o[t]));
          }
          const s = e,
            a = t,
            i = Object.keys(s);
          return (
            i.length === Object.keys(a).length && i.every((e) => r(s[e], a[e]))
          );
        }
        n.d(t, { T: () => r });
      },
      5930: (e, t, n) => {
        function r(e, t) {
          if (e === t) return !0;
          const n = Object.keys(e),
            r = n.length;
          if (r !== Object.keys(t).length) return !1;
          if (0 === r) return !0;
          for (let o = 0; o < r; o++) {
            const r = n[o];
            if (e[r] !== t[r]) return !1;
          }
          return !0;
        }
        function o(e, t, n) {
          let r =
            arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "";
          const o = Object.keys(e);
          o.length === Object.keys(t).length
            ? (console.log(n),
              o.forEach((n) => {
                e[n] !== t[n] && console.log(r, n, ":", e[n], "=>", t[n]);
              }))
            : console.log(`${n} LENGTH`);
        }
        n.d(t, { A: () => r, q: () => o });
      },
      70758: (e, t, n) => {
        function r(e) {
          return new Promise((t, n) => {
            (e.oncomplete = e.onsuccess = () => t(e.result)),
              (e.onabort = e.onerror = () => n(e.error));
          });
        }
        function o(e, t) {
          const n = indexedDB.open(e);
          n.onupgradeneeded = () => n.result.createObjectStore(t);
          const o = r(n);
          return (e, n) => o.then((r) => n(r.transaction(t, e).objectStore(t)));
        }
        let s;
        function a() {
          return s || (s = o("keyval-store", "keyval")), s;
        }
        function i(e, t) {
          return (
            (e.openCursor().onsuccess = function () {
              this.result && (t(this.result), this.result.continue());
            }),
            r(e.transaction)
          );
        }
        n.d(t, { q: () => c, B: () => u });
        class d {
          constructor(e) {
            var t, n, r, s;
            (t = this),
              (r = void 0),
              (n =
                "symbol" ==
                typeof (s = (function (e, t) {
                  if ("object" != typeof e || !e) return e;
                  var n = e[Symbol.toPrimitive];
                  if (void 0 !== n) {
                    var r = n.call(e, "string");
                    if ("object" != typeof r) return r;
                    throw new TypeError(
                      "@@toPrimitive must return a primitive value."
                    );
                  }
                  return String(e);
                })((n = "store")))
                  ? s
                  : s + "") in t
                ? Object.defineProperty(t, n, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (t[n] = r),
              (this.store = o(e, "store"));
          }
          set(e, t) {
            return (function (e, t, n = a()) {
              return n("readwrite", (n) => (n.put(t, e), r(n.transaction)));
            })(e, t, this.store);
          }
          setMany(e) {
            return (function (e, t = a()) {
              return t(
                "readwrite",
                (t) => (e.forEach((e) => t.put(e[1], e[0])), r(t.transaction))
              );
            })(e, this.store);
          }
          get(e) {
            return (function (e, t = a()) {
              return t("readonly", (t) => r(t.get(e)));
            })(e, this.store);
          }
          getMany(e) {
            return (function (e, t = a()) {
              return t("readonly", (t) =>
                Promise.all(e.map((e) => r(t.get(e))))
              );
            })(e, this.store);
          }
          clear() {
            return (function (e = a()) {
              return e("readwrite", (e) => (e.clear(), r(e.transaction)));
            })(this.store);
          }
          del(e) {
            return (function (e, t = a()) {
              return t("readwrite", (t) => (t.delete(e), r(t.transaction)));
            })(e, this.store);
          }
          delMany(e) {
            return (function (e, t = a()) {
              return t(
                "readwrite",
                (t) => (e.forEach((e) => t.delete(e)), r(t.transaction))
              );
            })(e, this.store);
          }
          entries() {
            return (function (e = a()) {
              return e("readonly", (t) => {
                if (t.getAll && t.getAllKeys)
                  return Promise.all([r(t.getAllKeys()), r(t.getAll())]).then(
                    ([e, t]) => e.map((e, n) => [e, t[n]])
                  );
                const n = [];
                return e("readonly", (e) =>
                  i(e, (e) => n.push([e.key, e.value])).then(() => n)
                );
              });
            })(this.store);
          }
          keys() {
            return (function (e = a()) {
              return e("readonly", (e) => {
                if (e.getAllKeys) return r(e.getAllKeys());
                const t = [];
                return i(e, (e) => t.push(e.key)).then(() => t);
              });
            })(this.store);
          }
          values() {
            return (function (e = a()) {
              return e("readonly", (e) => {
                if (e.getAll) return r(e.getAll());
                const t = [];
                return i(e, (e) => t.push(e.value)).then(() => t);
              });
            })(this.store);
          }
          update(e, t) {
            return (function (e, t, n = a()) {
              return n(
                "readwrite",
                (n) =>
                  new Promise((o, s) => {
                    n.get(e).onsuccess = function () {
                      try {
                        n.put(t(this.result), e), o(r(n.transaction));
                      } catch (e) {
                        s(e);
                      }
                    };
                  })
              );
            })(e, t, this.store);
          }
        }
        const c = new d("tt-data"),
          u = new d("tt-passcode");
      },
      39761: (e, t, n) => {
        function r(e) {
          for (e.pause(), e.removeAttribute("src"); e.firstChild; )
            e.removeChild(e.firstChild);
          e.load();
        }
        n.d(t, { A: () => r });
      },
      87357: (e, t, n) => {
        function r() {
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
          return t.filter(Boolean).join(" ");
        }
        function o(e) {
          return function (t) {
            const n = "&" === t ? e : `${e}__${t}`;
            for (
              var r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), s = 1;
              s < r;
              s++
            )
              o[s - 1] = arguments[s];
            return o
              .reduce(
                (e, t) => (
                  t && (Array.isArray(t) ? e.push(...t) : e.push(`${n}--${t}`)),
                  e
                ),
                [n]
              )
              .join(" ");
          };
        }
        n.d(t, { A: () => r, x: () => o });
      },
      95807: (e, t, n) => {
        function r() {
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
          return t.filter(Boolean).join(";");
        }
        n.d(t, { A: () => r });
      },
      74824: (e, t, n) => {
        n.d(t, {
          Type: () => i,
          clear: () => u,
          fetch: () => d,
          isCacheApiSupported: () => a,
          save: () => c,
        });
        var r = n(31481);
        const o = self.caches;
        let s;
        async function a() {
          return (
            !!o &&
            ((s =
              s ??
              (await o
                .has("test")
                .then(() => !0)
                .catch(() => !1))),
            s)
          );
        }
        let i = (function (e) {
          return (
            (e[(e.Text = 0)] = "Text"),
            (e[(e.Blob = 1)] = "Blob"),
            (e[(e.Json = 2)] = "Json"),
            (e[(e.ArrayBuffer = 3)] = "ArrayBuffer"),
            e
          );
        })({});
        async function d(e, t, n) {
          let s =
            arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
          if (o)
            try {
              const a = r.jht
                  ? `${r.uyj}/${t.replace(/:/g, "_")}`
                  : new Request(t.replace(/:/g, "_")),
                d = await o.open(e),
                c = await d.match(a);
              if (!c) return;
              const u = c.headers.get("Content-Type");
              switch (n) {
                case i.Text:
                  return await c.text();
                case i.Blob: {
                  if (t.startsWith("avatar") && u && u.startsWith("text"))
                    return;
                  const e = await c.blob(),
                    n = !e.type || (!s && e.type.includes("html"));
                  let r = e.type || u;
                  return n && r
                    ? (s || (r = r.replace(/html/gi, "")),
                      new Blob([e], { type: r }))
                    : e;
                }
                case i.Json:
                  return await c.json();
                case i.ArrayBuffer:
                  return await c.arrayBuffer();
                default:
                  return;
              }
            } catch (e) {
              return void console.warn(e);
            }
        }
        async function c(e, t, n) {
          if (!o) return !1;
          try {
            const s =
                "string" == typeof n ||
                n instanceof Blob ||
                n instanceof ArrayBuffer
                  ? n
                  : JSON.stringify(n),
              a = r.jht
                ? `${r.uyj}/${t.replace(/:/g, "_")}`
                : new Request(t.replace(/:/g, "_")),
              i = new Response(s),
              d = await o.open(e);
            return await d.put(a, i), !0;
          } catch (e) {
            return console.warn(e), !1;
          }
        }
        async function u(e) {
          try {
            if (!o) return;
            return await o.delete(e);
          } catch (e) {
            return void console.warn(e);
          }
        }
      },
      46536: (e, t, n) => {
        function r() {
          const e = new Set();
          function t(t) {
            e.delete(t);
          }
          return {
            runCallbacks: function () {
              for (
                var t = arguments.length, n = new Array(t), r = 0;
                r < t;
                r++
              )
                n[r] = arguments[r];
              e.forEach((e) => {
                e(...n);
              });
            },
            addCallback: function (n) {
              return (
                e.add(n),
                () => {
                  t(n);
                }
              );
            },
            removeCallback: t,
            hasCallbacks: function () {
              return Boolean(e.size);
            },
          };
        }
        n.d(t, { h: () => r });
      },
      11778: (e, t, n) => {
        n.d(t, { A: () => o });
        var r = n(52674);
        function o(e) {
          return (0, r.A)({ onEsc: e });
        }
      },
      50442: (e, t, n) => {
        function r(e, t, n) {
          var r;
          return (
            (t =
              "symbol" ==
              typeof (r = (function (e, t) {
                if ("object" != typeof e || !e) return e;
                var n = e[Symbol.toPrimitive];
                if (void 0 !== n) {
                  var r = n.call(e, "string");
                  if ("object" != typeof r) return r;
                  throw new TypeError(
                    "@@toPrimitive must return a primitive value."
                  );
                }
                return String(e);
              })(t))
                ? r
                : r + "") in e
              ? Object.defineProperty(e, t, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = n),
            e
          );
        }
        n.d(t, {
          h6: () => c,
          no: () => u,
          fG: () => l,
          ez: () => d,
          wJ: () => w,
        });
        var o = n(43336),
          s = n(37836),
          a = n(82393),
          i = n(43503);
        let d = (function (e) {
          return (
            (e[(e.Up = 0)] = "Up"),
            (e[(e.Down = 1)] = "Down"),
            (e[(e.Left = 2)] = "Left"),
            (e[(e.Right = 3)] = "Right"),
            e
          );
        })({});
        const c = 20,
          u = 10,
          l = 1.5,
          f = 15,
          h = 20,
          m = 150,
          p = 150;
        function g(e, t) {
          return t ? Math.hypot(t.pageX - e.pageX, t.pageY - e.pageY) : 0;
        }
        function y(e, t) {
          return { x: (e.pageX + t.pageX) / 2, y: (e.pageY + t.pageY) / 2 };
        }
        let b = 0;
        const v = new (class {
          constructor() {
            let {
              stability: e = 8,
              sensitivity: t = 100,
              tolerance: n = 1.1,
              delay: o = 150,
            } = arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : {};
            r(this, "stability", void 0),
              r(this, "sensitivity", void 0),
              r(this, "tolerance", void 0),
              r(this, "delay", void 0),
              r(this, "lastUpDeltas", void 0),
              r(this, "lastDownDeltas", void 0),
              r(this, "deltasTimestamp", void 0),
              (this.stability = e),
              (this.sensitivity = t),
              (this.tolerance = n),
              (this.delay = o),
              (this.lastUpDeltas = new Array(2 * this.stability).fill(0)),
              (this.lastDownDeltas = new Array(2 * this.stability).fill(0)),
              (this.deltasTimestamp = new Array(2 * this.stability).fill(0));
          }
          check(e) {
            let t;
            return (
              void 0 !== (e = e.originalEvent || e).wheelDelta
                ? (t = e.wheelDelta)
                : void 0 !== e.deltaY
                ? (t = -40 * e.deltaY)
                : (void 0 === e.detail && 0 !== e.detail) ||
                  (t = -40 * e.detail),
              this.deltasTimestamp.push(Date.now()),
              this.deltasTimestamp.shift(),
              t > 0
                ? (this.lastUpDeltas.push(t),
                  this.lastUpDeltas.shift(),
                  this.isInertia(1))
                : (this.lastDownDeltas.push(t),
                  this.lastDownDeltas.shift(),
                  this.isInertia(-1))
            );
          }
          isInertia(e) {
            const t = -1 === e ? this.lastDownDeltas : this.lastUpDeltas;
            if (void 0 === t[0]) return e;
            if (
              this.deltasTimestamp[2 * this.stability - 2] + this.delay >
                Date.now() &&
              t[0] === t[2 * this.stability - 1]
            )
              return !1;
            const n = t.slice(0, this.stability),
              r = t.slice(this.stability, 2 * this.stability),
              o = n.reduce((e, t) => e + t),
              s = r.reduce((e, t) => e + t),
              a = o / n.length,
              i = s / r.length;
            return (
              Math.abs(a) <= Math.abs(i * this.tolerance) &&
              this.sensitivity < Math.abs(i)
            );
          }
        })({
          stability: 5,
          sensitivity: 25,
          tolerance: a.H8 ? 1 : 0.6,
          delay: 150,
        });
        function w(e, t) {
          let n,
            r = !1,
            u = !1,
            l = !1,
            w = 0,
            I = t.initialZoom ?? 1,
            A = { x: 0, y: 0 },
            C = { x: !1, y: !1 };
          const S = i.A.get();
          let E,
            k = { x: S.width / 2, y: S.height / 2 };
          const T = t.minZoom ?? 1,
            P = t.maxZoom ?? 4;
          function M(r) {
            const o = r.target,
              {
                excludedClosestSelector: s,
                includedClosestSelector: a,
                withNativeDrag: i,
                withCursor: d,
                onDrag: c,
              } = t;
            (e === o || e.contains(o)) &&
              "INPUT" !== o.tagName &&
              "TEXTAREA" !== o.tagName &&
              ((s && (o.matches(s) || o.closest(s))) ||
                (a && !o.matches(a) && !o.closest(a)) ||
                ((n = r),
                "mousedown" === r.type
                  ? (!i && c && r.preventDefault(),
                    document.addEventListener("mousemove", N),
                    document.addEventListener("mouseup", L))
                  : "touchstart" === r.type &&
                    (o.addEventListener("touchmove", N, { passive: !0 }),
                    o.addEventListener("touchend", L, { passive: !0 }),
                    o.addEventListener("touchcancel", L, { passive: !0 }),
                    "touches" in r &&
                      (void 0 === r.pageX && (r.pageX = r.touches[0].pageX),
                      void 0 === r.pageY && (r.pageY = r.touches[0].pageY),
                      2 === r.touches.length &&
                        ((w = g(r.touches[0], r.touches[1])),
                        (k = y(r.touches[0], r.touches[1]))))),
                d && document.body.classList.add("cursor-grabbing"),
                t.onCapture?.(r)));
          }
          function L(e) {
            n &&
              (t.withCursor &&
                document.body.classList.remove("cursor-grabbing"),
              document.removeEventListener("mouseup", L),
              document.removeEventListener("mousemove", N),
              n.target.removeEventListener("touchcancel", L),
              n.target.removeEventListener("touchend", L),
              n.target.removeEventListener("touchmove", N),
              a.pz &&
                t.selectorToPreventScroll &&
                Array.from(
                  document.querySelectorAll(t.selectorToPreventScroll)
                ).forEach((e) => {
                  e.style.overflow = "";
                }),
              e &&
                (r
                  ? t.onRelease && t.onRelease(e)
                  : "mouseup" === e.type &&
                    (t.onDoubleClick && Date.now() - b < 300
                      ? t.onDoubleClick(e, {
                          centerX: n.pageX,
                          centerY: n.pageY,
                        })
                      : !t.onClick ||
                        ("button" in e && 0 !== e.button) ||
                        t.onClick(e),
                    (b = Date.now())))),
              (r = !1),
              (u = !1),
              (l = !1),
              (w = 0),
              (I = (0, o.qE)(I, T, P)),
              (E = void 0),
              (A = { x: 0, y: 0 }),
              (C = { x: !1, y: !1 });
            const s = i.A.get();
            (k = { x: s.width / 2, y: s.height / 2 }), (n = void 0);
          }
          function N(e) {
            if (n) {
              if (
                "touchmove" === e.type &&
                "touches" in e &&
                (void 0 === e.pageX && (e.pageX = e.touches[0].pageX),
                void 0 === e.pageY && (e.pageY = e.touches[0].pageY),
                t.onZoom && w > 0 && 2 === e.touches.length)
              ) {
                const n = g(e.touches[0], e.touches[1]),
                  o = y(e.touches[0], e.touches[1]),
                  s = o.x - k.x,
                  a = o.y - k.y,
                  i = n / w;
                t.onZoom(e, {
                  zoomFactor: i,
                  initialCenterX: k.x,
                  initialCenterY: k.y,
                  dragOffsetX: s,
                  dragOffsetY: a,
                  currentCenterX: o.x,
                  currentCenterY: o.y,
                }),
                  1 !== i && (r = !0);
              }
              const o = e.pageX - n.pageX,
                s = e.pageY - n.pageY;
              (Math.abs(o) >= f || Math.abs(s) >= f) && (r = !0);
              let l = !1;
              t.onDrag &&
                (t.onDrag(e, n, { dragOffsetX: o, dragOffsetY: s }), (l = !0)),
                t.onSwipe &&
                  !u &&
                  ((u = (function (e, n, r) {
                    if (a.pz) {
                      const t = e.touches[0].pageX;
                      if (t <= c || t >= i.A.get().width - c) return !1;
                    }
                    const o = Math.abs(n),
                      s = Math.abs(r),
                      u = t.swipeThreshold ?? h;
                    let l;
                    if (
                      (o > s && o >= u
                        ? (l = "x")
                        : s > o && s >= u && (l = "y"),
                      !l)
                    )
                      return !1;
                    if (E) {
                      if (E !== l) return !1;
                    } else E = l;
                    return (function (e, t, n, r, o) {
                      const s = { dragOffsetX: n, dragOffsetY: r };
                      return "x" === t
                        ? o(e, n < 0 ? d.Left : d.Right, s)
                        : "y" === t && o(e, r < 0 ? d.Up : d.Down, s);
                    })(e, l, n, r, t.onSwipe);
                  })(e, o, s)),
                  (l = u)),
                a.pz &&
                  l &&
                  t.selectorToPreventScroll &&
                  Array.from(
                    document.querySelectorAll(t.selectorToPreventScroll)
                  ).forEach((e) => {
                    e.style.overflow = "hidden";
                  });
            }
          }
          const F = (0, s.sg)(L, p, !1),
            B = (0, s.sg)(L, m, !1);
          function x(e) {
            r || (M(e), (r = !0), (k = { x: e.x, y: e.y }));
          }
          function O(e) {
            if (!t.onZoom && !t.onDrag) return;
            if (
              t.excludedClosestSelector &&
              (e.target.matches(t.excludedClosestSelector) ||
                e.target.closest(t.excludedClosestSelector))
            )
              return;
            e.preventDefault(), e.stopPropagation();
            const { doubleTapZoom: s = 3 } = t;
            if (
              t.onDoubleClick &&
              Object.is(e.deltaX, -0) &&
              Object.is(e.deltaY, -0) &&
              e.ctrlKey
            )
              return (
                x(e),
                (I = I > 1 ? 1 : s),
                t.onDoubleClick(e, { centerX: e.pageX, centerY: e.pageY }),
                void (r = !1)
              );
            const a = e.metaKey || e.ctrlKey || e.shiftKey;
            if (
              (a &&
                (function (e) {
                  if (!t.onZoom) return;
                  x(e);
                  const n = e.x - k.x,
                    r = e.y - k.y,
                    s = (0, o.qE)(e.deltaY, -25, 25);
                  (I -= 0.01 * s),
                    (I = (0, o.qE)(I, 0.5 * T, 3 * P)),
                    (l = !0),
                    t.onZoom(e, {
                      zoom: (0, o.LI)(I, 2),
                      initialCenterX: k.x,
                      initialCenterY: k.y,
                      dragOffsetX: n,
                      dragOffsetY: r,
                      currentCenterX: e.x,
                      currentCenterY: e.y,
                    }),
                    B(e);
                })(e),
              !a && !l)
            ) {
              const r = v.check(e);
              (1 !== I || r) &&
                (function (e) {
                  if (!t.onDrag) return;
                  x(e),
                    (C.x && Math.sign(A.x) !== Math.sign(e.deltaX)) ||
                      (A.x -= e.deltaX),
                    (C.y && Math.sign(A.y) !== Math.sign(e.deltaY)) ||
                      (A.y -= e.deltaY);
                  const { x: r, y: o } = A;
                  t.onDrag(e, n, { dragOffsetX: r, dragOffsetY: o }, (e, t) => {
                    C = { x: e, y: t };
                  }),
                    F(e);
                })(e);
            }
          }
          return (
            t.withWheelDrag && e.addEventListener("wheel", O),
            e.addEventListener("mousedown", M),
            document.body.addEventListener("touchstart", M, {
              passive: !t.isNotPassive,
            }),
            () => {
              L(),
                document.body.removeEventListener("touchstart", M),
                e.removeEventListener("mousedown", M),
                e.removeEventListener("wheel", O);
            }
          );
        }
      },
      52674: (e, t, n) => {
        n.d(t, { A: () => s });
        const r = {
            Enter: "onEnter",
            Backspace: "onBackspace",
            Delete: "onDelete",
            Esc: "onEsc",
            Escape: "onEsc",
            ArrowUp: "onUp",
            ArrowDown: "onDown",
            ArrowLeft: "onLeft",
            ArrowRight: "onRight",
            Tab: "onTab",
          },
          o = {
            onEnter: [],
            onDelete: [],
            onBackspace: [],
            onEsc: [],
            onUp: [],
            onDown: [],
            onLeft: [],
            onRight: [],
            onTab: [],
          };
        function s(e) {
          return (
            a() || document.addEventListener("keydown", i, !0),
            Object.keys(e).forEach((t) => {
              const n = e[t];
              if (!n) return;
              const r = o[t];
              r && r.push(n);
            }),
            () => {
              !(function (e) {
                Object.keys(e).forEach((t) => {
                  const n = e[t],
                    r = o[t];
                  if (r) {
                    const e = r.findIndex((e) => e === n);
                    -1 !== e && r.splice(e, 1);
                  }
                }),
                  a() || document.removeEventListener("keydown", i, !1);
              })(e);
            }
          );
        }
        function a() {
          return Object.values(o).some((e) => Boolean(e.length));
        }
        function i(e) {
          const t = r[e.key];
          if (!t) return;
          const { length: n } = o[t];
          if (n)
            for (let r = n - 1; r >= 0; r--)
              if (!1 !== (0, o[t][r])(e)) {
                e.stopPropagation();
                break;
              }
        }
      },
      85982: (e, t, n) => {
        n.d(t, {
          A: () => i,
          LD: () => c,
          WO: () => o,
          eM: () => a,
          qp: () => d,
        });
        var r = n(31481);
        const o = window.navigator.clipboard && window.ClipboardItem,
          s = document.createElement("textarea");
        s.setAttribute("readonly", ""),
          (s.tabIndex = -1),
          (s.className = "visually-hidden");
        const a = (e) => {
            (s.value = e), document.body.appendChild(s);
            const t = document.getSelection();
            if (t) {
              const e = t.rangeCount > 0 && t.getRangeAt(0);
              s.select(),
                document.execCommand("copy"),
                e && (t.removeAllRanges(), t.addRange(e));
            }
            document.body.removeChild(s);
          },
          i = (e, t) => {
            window.navigator.clipboard?.write
              ? window.navigator.clipboard.write([
                  new ClipboardItem({
                    "text/plain": new Blob([t], { type: "text/plain" }),
                    "text/html": new Blob([e], { type: "text/html" }),
                  }),
                ])
              : a(t);
          },
          d = (e) => {
            if (!e) return;
            const t = document.createElement("canvas"),
              n = t.getContext("2d"),
              r = new Image();
            (r.onload = (e) => {
              if (n && e.currentTarget) {
                const r = e.currentTarget;
                (t.width = r.width),
                  (t.height = r.height),
                  n.drawImage(r, 0, 0, r.width, r.height),
                  t.toBlob(u, "image/png", 1);
              }
            }),
              (r.src = e);
          },
          c = async (e, t, n) => {
            const r = async () => {
              try {
                const t = await e;
                return t ? a(t) : n(), Boolean(t);
              } catch {
                return n(), !1;
              }
            };
            if (o && navigator.clipboard.write) {
              try {
                let t = !1;
                const r = () => Promise.reject(new Error("GET_DATA_ERROR")),
                  o = new ClipboardItem({
                    "text/plain": e
                      .then((e) => e || r())
                      .catch(() => ((t = !0), "")),
                  });
                if ((await navigator.clipboard.write([o]), t)) return void n();
              } catch {
                if (!(await r())) return;
              }
              t();
            } else (await r()) && t();
          };
        async function u(e) {
          if (e && o)
            try {
              await window.navigator.clipboard.write?.([
                new ClipboardItem({ [e.type]: e }),
              ]);
            } catch (e) {
              r.Oig && console.error(e);
            }
        }
      },
      25903: (e, t, n) => {
        n.d(t, { e: () => s, j: () => o });
        const r = 50;
        function o(e, t, n, r) {
          return a("transitionend", e, t, n, r);
        }
        function s(e, t, n, r) {
          return a("animationend", e, t, n, r);
        }
        function a(e, t, n, o, s) {
          let a = !1;
          function i() {
            t.removeEventListener(e, d);
          }
          function d(e) {
            a ||
              e.target !== e.currentTarget ||
              (o &&
                ((e instanceof TransitionEvent && e.propertyName === o) ||
                  (e instanceof AnimationEvent && e.animationName === o))) ||
              ((a = !0),
              i(),
              setTimeout(() => {
                n();
              }, r));
          }
          return (
            t.addEventListener(e, d),
            s &&
              setTimeout(() => {
                a || (i(), n());
              }, s),
            i
          );
        }
      },
      17663: (e, t, n) => {
        n.d(t, {
          $$: () => h,
          A: () => L,
          CS: () => f,
          F5: () => S,
          JW: () => P,
          L2: () => N,
          Lu: () => y,
          QO: () => T,
          Rm: () => O,
          SF: () => B,
          TI: () => R,
          U: () => F,
          be: () => g,
          cK: () => u,
          dq: () => w,
          fS: () => k,
          fU: () => p,
          fw: () => A,
          hI: () => I,
          i6: () => b,
          il: () => c,
          pU: () => l,
          wv: () => E,
          zA: () => C,
          zt: () => v,
        });
        var r = n(19314);
        const o = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          s = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((e) => e.toLowerCase()),
          a = 2015,
          i = 31,
          d = 12,
          c = 864e5;
        function u(e) {
          return f(new Date()) === f(e);
        }
        function l(e) {
          const t = new Date(e);
          return t.setHours(0, 0, 0, 0), t;
        }
        function f(e) {
          return l(e).getTime();
        }
        function h(e) {
          const t = new Date(1e3 * e);
          return `${t.getFullYear()}-${t.getMonth()}`;
        }
        function m(e) {
          return `${e.getFullYear()}-${e.getMonth() + 1}-${e.getDate()}`;
        }
        function p(e, t) {
          const n = "number" == typeof t ? new Date(t) : t,
            r = e.timeFormat || "24h";
          let o = n.getHours(),
            s = "";
          return (
            "12h" === r &&
              ((s = o >= 12 ? " PM" : " AM"), (o = o > 12 ? o % 12 : o)),
            `${String(o).padStart(2, "0")}:${String(n.getMinutes()).padStart(
              2,
              "0"
            )}${s}`
          );
        }
        function g(e, t) {
          let n =
            arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
          const r = "number" == typeof t ? new Date(t) : t,
            s = p(e, r),
            a = l(new Date());
          if (r >= a) return s;
          const i = new Date(a);
          if ((i.setDate(a.getDate() - 7), r >= i)) {
            const t = e(`Weekday.Short${o[r.getDay()]}`);
            return n ? e("FullDateTimeFormat", [t, s]) : t;
          }
          const d = r.getFullYear() === a.getFullYear(),
            c = L(r, e.code, d);
          return n ? e("FullDateTimeFormat", [c, s]) : c;
        }
        function y(e, t) {
          return L(t, e.code, !1, "numeric");
        }
        function b(e, t) {
          let n =
            arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
          return L(t, e.code, !1, n ? "short" : "long", !0);
        }
        function v(e, t) {
          const n = Math.floor(t / c);
          return t < 0
            ? 0
            : n < 1
            ? T(t / 1e3)
            : n < 7
            ? e("Days", n)
            : n < 30
            ? e("Weeks", Math.floor(n / 7))
            : n < 365
            ? e("Months", Math.floor(n / 30))
            : e("Years", Math.floor(n / 365));
        }
        function w(e, t) {
          return t < 6e4
            ? Math.ceil(t / 1e3).toString()
            : t < 36e5
            ? Math.ceil(t / 6e4).toString()
            : t < c
            ? e("MessageTimer.ShortHours", Math.ceil(t / 36e5))
            : e("MessageTimer.ShortDays", Math.ceil(t / c));
        }
        function I(e, t) {
          let n =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : t;
          const r = t - n;
          return r < 60
            ? e("LiveLocationUpdated.JustNow")
            : r < 3600
            ? e("LiveLocationUpdated.MinutesAgo", Math.floor(r / 60))
            : e("LiveLocationUpdated.TodayAt", p(e, n));
        }
        function A(e, t) {
          let n =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : t;
          const r = t - n;
          if (r < 60) return e("Time.JustNow");
          if (r < 3600) return e("Time.MinutesAgo", Math.floor(r / 60));
          const o = new Date(1e3 * n),
            s = l(new Date());
          if (o >= s) return e("Time.TodayAt", p(e, o));
          const a = new Date(s);
          return (
            a.setDate(s.getDate() - 1),
            o > a ? e("Time.YesterdayAt", p(e, o)) : e("Time.AtDate", y(e, o))
          );
        }
        function C(e, t) {
          let n =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 2;
          if (!t) return;
          const r = [],
            o = [
              { multiplier: 1, type: "Seconds" },
              { multiplier: 60, type: "Minutes" },
              { multiplier: 60, type: "Hours" },
              { multiplier: 24, type: "Days" },
              { multiplier: 7, type: "Weeks" },
            ];
          let s = 1;
          o.forEach((e, n) => {
            if (((s *= e.multiplier), t < s)) return;
            const a = o[n === o.length - 1 ? n : n + 1].multiplier;
            r.push({ duration: Math.floor((t / s) % a), type: e.type });
          });
          const a = r.slice(-n).reverse();
          for (let e = a.length - 1; e >= 0; --e)
            0 === a[e].duration && a.splice(e, 1);
          return a.map((t) => e(t.type, t.duration, "i")).join(", ");
        }
        function S(e, t) {
          let n =
              arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
            o = arguments.length > 4 ? arguments[4] : void 0;
          const s = "number" == typeof t ? new Date(t) : t,
            a = l(new Date());
          if (!r) {
            if (m(s) === m(a)) return (o || !n ? U : D)(e("Weekday.Today"));
            const t = new Date(a);
            if ((t.setDate(a.getDate() - 1), m(s) === m(t)))
              return (o || !n ? U : D)(e("Weekday.Yesterday"));
            const r = new Date(a),
              i = new Date(a);
            if (
              (r.setDate(a.getDate() - 7),
              i.setDate(a.getDate() + 7),
              s >= r && s <= i)
            )
              return (o || !n ? U : D)(E(e, s.getDay(), n));
          }
          const i = s.getFullYear() === a.getFullYear();
          return (o || !n ? U : D)(L(s, e.code, i, n ? "short" : "long"));
        }
        function E(e, t) {
          let n =
            arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
          const r = o[t];
          return e(n ? `Weekday.Short${r}` : `Weekday.${r}`);
        }
        function k(e, t, n) {
          const r = "number" == typeof t ? new Date(t) : t;
          return `${S(e, r, !0, void 0, n)}, ${p(e, r)}`;
        }
        function T(e, t) {
          const n = Math.floor(e / 3600),
            r = Math.floor((e % 3600) / 60),
            o = Math.floor((e % 3600) % 60),
            s = t ? Math.floor(t / 3600) : 0,
            a = t ? Math.floor((t % 3600) / 60) : 0;
          let i = "";
          return (
            n > 0 || s > 0
              ? ((i += `${String(n).padStart(2, "0")}:`),
                (i += `${String(r).padStart(2, "0")}:`))
              : (i +=
                  a >= 10 ? `${String(r).padStart(2, "0")}:` : `${String(r)}:`),
            (i += String(o).padStart(2, "0")),
            i
          );
        }
        function P(e) {
          const t = [];
          let n = e % 1e3;
          (e -= n), (n = Math.floor(n / 10));
          const r = (e = Math.floor(e / 1e3)) % 60;
          e -= r;
          const o = (e = Math.floor(e / 60)) % 60;
          e -= o;
          const s = (e = Math.floor(e / 60)) % 60;
          return (
            s > 0 && t.push(String(s).padStart(2, "0")),
            t.push(String(o).padStart(s > 0 ? 2 : 1, "0")),
            t.push(String(r).padStart(2, "0")),
            `${t.join(":")},${String(n).padStart(2, "0")}`
          );
        }
        const M = (0, r.A)(function (e, t, n) {
          let r =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : "short",
            o = arguments.length > 4 ? arguments[4] : void 0;
          return new Date(e).toLocaleString(t, {
            year: n ? void 0 : "numeric",
            month: r,
            day: o ? void 0 : "numeric",
          });
        });
        function L(e) {
          let t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : "en-US",
            n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            r =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : "short",
            o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
          const s = f("number" == typeof e ? new Date(e) : e);
          return M(s, t, n, r, o);
        }
        function N(e) {
          let t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : "en-US",
            n = arguments.length > 2 ? arguments[2] : void 0,
            r = arguments.length > 3 ? arguments[3] : void 0;
          return ("number" == typeof e ? new Date(e) : e).toLocaleString(t, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: n ? void 0 : "numeric",
            hourCycle: "12h" === r ? "h12" : "h23",
          });
        }
        function F(e, t) {
          const n = "number" == typeof t ? new Date(t) : t,
            r = l(new Date()),
            o = p(e, n);
          if (m(n) === m(r)) return e("Time.TodayAt", o);
          const s = new Date(r);
          if ((s.setDate(r.getDate() - 1), m(n) === m(s)))
            return e("Time.YesterdayAt", o);
          const a = n.getFullYear() === r.getFullYear();
          return e("formatDateAtTime", [L(n, e.code, a), o]);
        }
        function B(e, t, n) {
          const r = Math.ceil(n - t);
          return r < 0
            ? e("RightNow")
            : r < 60
            ? e("Seconds", r)
            : r < 3600
            ? e("Minutes", Math.ceil(r / 60))
            : r < 86400
            ? e("Hours", Math.ceil(r / 3600))
            : e("Days", Math.ceil(r / 86400));
        }
        function x(e, t) {
          if (t > d - 1 || e > i) return !1;
          const n = new Date(
            arguments.length > 2 && void 0 !== arguments[2]
              ? arguments[2]
              : 2021,
            t,
            e
          );
          return !Number.isNaN(n.getTime()) && n.getDate() === e;
        }
        function O() {
          let e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
          const t = e.match(/\d{1,2}\s[a-zA-Z]{3,}/),
            n = e.match(/[a-zA-Z]{3,}\s\d{1,2}/),
            r = e.match(/\d{1,2}[./-]\d{1,2}([./-]\d{2,4})?/);
          if (!t && !r && !n) return;
          if (r) {
            const [t, n, r] = e.split(/[./-]/).map(Number);
            return (r && r < a) || !x(t, n - 1, r || void 0)
              ? void 0
              : `${r ? `${r}-` : ""}${String(n).padStart(2, "0")}-${String(
                  t
                ).padStart(2, "0")}`;
          }
          const o = e.split(" "),
            i = t ? o[0] : o[1],
            d = (t ? o[1] : o[0]).toLowerCase(),
            c = s.findIndex((e) => e.startsWith(d));
          return -1 !== c && x(Number(i), c)
            ? `${String(c + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`
            : void 0;
        }
        function R(e) {
          return e + c / 1e3;
        }
        function D(e) {
          return `${e[0].toLowerCase()}${e.slice(1)}`;
        }
        function U(e) {
          return `${e[0].toUpperCase()}${e.slice(1)}`;
        }
      },
      61182: (e, t, n) => {
        n.d(t, { F8: () => c, bO: () => a, fw: () => i, pF: () => d });
        const r = ["log", "error", "warn", "info", "debug"],
          o = r.reduce((e, t) => ((e[t] = console[t]), e), {});
        let s = [];
        function a(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
            r < t;
            r++
          )
            n[r - 1] = arguments[r];
          s.push({ level: e, args: n, date: new Date() }), o[e](...n);
        }
        function i() {
          (s = []),
            r.forEach((e) => {
              console[e] = function () {
                for (
                  var t = arguments.length, n = new Array(t), r = 0;
                  r < t;
                  r++
                )
                  n[r] = arguments[r];
                a(e, ...n);
              };
            });
        }
        function d() {
          r.forEach((e) => {
            console[e] = o[e];
          }),
            (s = []);
        }
        function c() {
          return JSON.stringify(s, (e, t) =>
            "bigint" == typeof t ? t.toString() : t
          );
        }
      },
      46275: (e, t, n) => {
        n.d(t, { v: () => d, z: () => i });
        var r = n(31481),
          o = n(62076),
          s = n(11422);
        const a = new Set(["t.me", "telegram.me", "telegram.dog"]);
        function i(e) {
          return Boolean(e.match(r.OFc) || e.match(r.bnE));
        }
        function d(e) {
          if (i(e))
            try {
              return (function (e) {
                const t = (0, o.T)(e);
                if (t)
                  return t.startsWith("https:")
                    ? (function (e) {
                        if (!a.has(e.hostname)) return;
                        const t = b(e),
                          n = y(e);
                        switch (
                          (function (e, t) {
                            const n = t.length,
                              r = t[0];
                            if (1 === n) {
                              if ("share" === r) return "shareLink";
                              if ((0, s.BU)(r))
                                return "publicUsernameOrBotLink";
                            } else if (2 === n) {
                              if ("addlist" === r) return "chatFolderLink";
                              if ("login" === r) return "loginCodeLink";
                              if ((0, s.BU)(t[0]) && g(t[1]))
                                return "publicMessageLink";
                              if ("m" === r) return "businessChatLink";
                            } else if (3 === n) {
                              if ("c" === r && t.slice(1).every(g))
                                return "privateMessageLink";
                              if ((0, s.BU)(t[0]) && t.slice(1).every(g))
                                return "publicMessageLink";
                            } else if (
                              4 === n &&
                              "c" === r &&
                              t.slice(1).every(g)
                            )
                              return "privateMessageLink";
                            return "unknown";
                          })(0, n)
                        ) {
                          case "publicMessageLink": {
                            const { single: e, comment: r, t: o, boost: s } = t,
                              {
                                username: a,
                                thread: i,
                                messageId: d,
                              } = 2 === n.length
                                ? {
                                    username: n[0],
                                    thread: t.thread,
                                    messageId: n[1],
                                  }
                                : {
                                    username: n[0],
                                    thread: n[1],
                                    messageId: n[2],
                                  };
                            return u({
                              username: a,
                              messageId: d,
                              single: e,
                              threadId: i,
                              commentId: r,
                              mediaTimestamp: o,
                              boost: s,
                            });
                          }
                          case "privateMessageLink": {
                            const { single: e, comment: r, t: o, boost: s } = t,
                              {
                                channelId: a,
                                thread: i,
                                messageId: d,
                              } = 3 === n.length
                                ? {
                                    channelId: n[1],
                                    thread: t.thread,
                                    messageId: n[2],
                                  }
                                : {
                                    channelId: n[1],
                                    thread: n[2],
                                    messageId: n[3],
                                  };
                            return l({
                              channelId: a,
                              messageId: d,
                              single: e,
                              threadId: i,
                              commentId: r,
                              mediaTimestamp: o,
                              boost: s,
                            });
                          }
                          case "shareLink":
                            return c({ text: t.text, url: t.url });
                          case "chatFolderLink":
                            return f({ slug: n[1] });
                          case "loginCodeLink":
                            return h({ code: n[1] });
                          case "publicUsernameOrBotLink":
                            return m({
                              username: n[0],
                              start: t.start,
                              text: t.text,
                              startApp: t.startapp,
                              appName: void 0,
                              startAttach: t.startattach,
                              attach: t.attach,
                            });
                          case "businessChatLink":
                            return p({ slug: n[1] });
                        }
                      })(new URL(t))
                    : t.startsWith("tg:")
                    ? (function (e) {
                        const { hostname: t } = e,
                          n = b(e);
                        switch (
                          (y(e),
                          (function (e, t, n) {
                            switch (n) {
                              case "resolve": {
                                const {
                                  domain: t,
                                  post: n,
                                  bot_id: r,
                                  scope: o,
                                  public_key: a,
                                  nonce: i,
                                } = e;
                                if (
                                  "telegrampassport" === t &&
                                  r &&
                                  o &&
                                  a &&
                                  i
                                )
                                  return "telegramPassportLink";
                                if (t && n) return "publicMessageLink";
                                if ((0, s.BU)(t))
                                  return "publicUsernameOrBotLink";
                                break;
                              }
                              case "privatepost": {
                                const { channel: t, post: n } = e;
                                if (t && n) return "privateMessageLink";
                                break;
                              }
                              case "msg_url":
                                return "shareLink";
                              case "addlist":
                                return "chatFolderLink";
                              case "login":
                                return "loginCodeLink";
                              case "passport":
                                return "telegramPassportLink";
                              case "message":
                                return "businessChatLink";
                              case "premium_offer":
                                return "premiumReferrerLink";
                              case "premium_multigift":
                                return "premiumMultigiftLink";
                            }
                            return "unknown";
                          })(n, 0, t))
                        ) {
                          case "publicMessageLink": {
                            const {
                              domain: e,
                              post: t,
                              single: r,
                              thread: o,
                              comment: s,
                              t: a,
                              boost: i,
                            } = n;
                            return u({
                              username: e,
                              messageId: t,
                              single: r,
                              threadId: o,
                              commentId: s,
                              mediaTimestamp: a,
                              boost: i,
                            });
                          }
                          case "privateMessageLink": {
                            const {
                              channel: e,
                              post: t,
                              single: r,
                              thread: o,
                              comment: s,
                              t: a,
                              boost: i,
                            } = n;
                            return l({
                              channelId: e,
                              messageId: t,
                              single: r,
                              threadId: o,
                              commentId: s,
                              mediaTimestamp: a,
                              boost: i,
                            });
                          }
                          case "shareLink":
                            return c({ text: n.text, url: n.url });
                          case "chatFolderLink":
                            return f({ slug: n.slug });
                          case "loginCodeLink":
                            return h({ code: n.code });
                          case "telegramPassportLink":
                            return (function (e) {
                              const {
                                botId: t,
                                scope: n,
                                publicKey: r,
                                nonce: o,
                                callbackUrl: s,
                                payload: a,
                              } = e;
                              if (t && g(t) && n && r && o)
                                return {
                                  type: "telegramPassportLink",
                                  botId: Number(t),
                                  scope: n,
                                  publicKey: r,
                                  nonce: o,
                                  callbackUrl: s,
                                  payload: a,
                                };
                            })({
                              botId: n.bot_id,
                              scope: n.scope,
                              publicKey: n.public_key,
                              nonce: n.nonce,
                              callbackUrl: n.callback_url,
                              payload: n.payload,
                            });
                          case "publicUsernameOrBotLink":
                            return m({
                              username: n.domain,
                              start: n.start,
                              text: n.text,
                              appName: n.appname,
                              startApp: n.startapp,
                              startAttach: n.startattach,
                              attach: n.attach,
                            });
                          case "businessChatLink":
                            return p({ slug: n.slug });
                          case "premiumReferrerLink":
                            return (function (e) {
                              const { referrer: t } = e;
                              if (t)
                                return {
                                  type: "premiumReferrerLink",
                                  referrer: t,
                                };
                            })({ referrer: n.ref });
                          case "premiumMultigiftLink":
                            return (function (e) {
                              const { referrer: t } = e;
                              if (t)
                                return {
                                  type: "premiumMultigiftLink",
                                  referrer: t,
                                };
                            })({ referrer: n.ref });
                        }
                      })(new URL(t.replace(/^tg:/, "http:")))
                    : void 0;
              })(e);
            } catch (e) {
              return;
            }
        }
        function c(e) {
          const { url: t, text: n } = e;
          if (t) return { type: "shareLink", url: t, text: n };
        }
        function u(e) {
          const {
            messageId: t,
            threadId: n,
            commentId: r,
            username: o,
            single: a,
            mediaTimestamp: i,
            boost: d,
          } = e;
          if (o && (0, s.BU)(o) && t && g(t) && (!n || g(n)) && (!r || g(r)))
            return {
              type: "publicMessageLink",
              username: o,
              messageId: Number(t),
              isSingle: "" === a,
              threadId: n ? Number(n) : void 0,
              commentId: r ? Number(r) : void 0,
              mediaTimestamp: i,
              isBoost: "" === d,
            };
        }
        function l(e) {
          const {
            messageId: t,
            threadId: n,
            commentId: r,
            channelId: o,
            single: s,
            mediaTimestamp: a,
            boost: i,
          } = e;
          if (o && g(o) && t && g(t) && (!n || g(n)) && (!r || g(r)))
            return {
              type: "privateMessageLink",
              channelId: o,
              messageId: Number(t),
              isSingle: "" === s,
              threadId: n ? Number(n) : void 0,
              commentId: r ? Number(r) : void 0,
              mediaTimestamp: a,
              isBoost: "" === i,
            };
        }
        function f(e) {
          const { slug: t } = e;
          if (t) return { type: "chatFolderLink", slug: t };
        }
        function h(e) {
          const { code: t } = e;
          if (t) return { type: "loginCodeLink", code: t };
        }
        function m(e) {
          const {
            username: t,
            start: n,
            text: r,
            startApp: o,
            startAttach: a,
            attach: i,
            appName: d,
          } = e;
          if (t && (0, s.BU)(t))
            return {
              type: "publicUsernameOrBotLink",
              username: t,
              start: n,
              startApp: o,
              appName: d,
              startAttach: a,
              attach: i,
              text: r,
            };
        }
        function p(e) {
          const { slug: t } = e;
          if (t) return { type: "businessChatLink", slug: t };
        }
        function g(e) {
          return /^-?\d+$/.test(e);
        }
        function y(e) {
          const t = e.pathname.split("/").filter(Boolean);
          return "s" === t[0] && t.shift(), t.map(decodeURI);
        }
        function b(e) {
          return Object.fromEntries(e.searchParams);
        }
      },
      55148: (e, t, n) => {
        n.d(t, { Ey: () => u, __: () => d, _o: () => c });
        var r = n(13439),
          o = n(31481),
          s = n(90709),
          a = n(46275),
          i = n(82393);
        const d = (e) => {
          const t = (0, r.ko)(),
            n = (0, a.v)(e);
          if (n)
            switch (n.type) {
              case "privateMessageLink":
                return (
                  (function (e, t) {
                    const { focusMessage: n, processBoostParameters: r } = t,
                      {
                        isBoost: o,
                        channelId: a,
                        messageId: i,
                        threadId: d,
                      } = e;
                    o
                      ? r({ usernameOrId: a, isPrivate: !0 })
                      : n({ chatId: (0, s.QE)(a), threadId: d, messageId: i });
                  })(n, t),
                  !0
                );
              case "publicUsernameOrBotLink":
                return (
                  t.openChatByUsername({
                    username: n.username,
                    startParam: n.start,
                    text: n.text,
                    startApp: n.startApp,
                    startAttach: n.startAttach,
                    attach: n.attach,
                    originalParts: [n.username, n.appName],
                  }),
                  !0
                );
              case "businessChatLink":
                return t.resolveBusinessChatLink({ slug: n.slug }), !0;
              case "premiumReferrerLink":
                return t.openPremiumModal(), !0;
              case "premiumMultigiftLink":
                return t.openPremiumGiftingModal(), !0;
            }
          if (!e.match(o.bnE)) return !1;
          const {
            protocol: d,
            searchParams: l,
            pathname: f,
            hostname: h,
          } = new URL(e);
          if ("tg:" !== d) return !1;
          const m = (i.Yw ? h : f).replace(/^\/\//, ""),
            p = Object.fromEntries(l),
            {
              openChatByInvite: g,
              openChatByUsername: y,
              openChatByPhoneNumber: b,
              openStickerSet: v,
              joinVoiceChatByLink: w,
              openInvoice: I,
              processAttachBotParameters: A,
              openChatWithDraft: C,
              checkChatlistInvite: S,
              openStoryViewerByUsername: E,
              processBoostParameters: k,
              checkGiftCode: T,
            } = t;
          switch (m) {
            case "resolve": {
              const {
                  domain: e,
                  phone: t,
                  post: n,
                  comment: r,
                  voicechat: o,
                  livestream: s,
                  start: a,
                  startattach: i,
                  attach: d,
                  thread: u,
                  topic: l,
                  appname: f,
                  startapp: h,
                  story: m,
                  text: g,
                } = p,
                v = p.hasOwnProperty("startattach"),
                I = p.hasOwnProperty("startapp"),
                C = p.hasOwnProperty("boost"),
                S = c(p.choose),
                T = Number(u) || Number(l) || void 0;
              "telegrampassport" !== e &&
                (f
                  ? y({
                      username: e,
                      startApp: h,
                      originalParts: [e, f],
                      text: g,
                    })
                  : (v && S) || (!f && I)
                  ? A({ username: e, filter: S, startParam: i || h })
                  : p.hasOwnProperty("voicechat") ||
                    p.hasOwnProperty("livestream")
                  ? w({ username: e, inviteHash: o || s })
                  : C
                  ? k({ usernameOrId: e })
                  : t
                  ? b({ phoneNumber: t, startAttach: i, attach: d, text: g })
                  : m
                  ? E({ username: e, storyId: Number(m) })
                  : y({
                      username: e,
                      messageId: n ? Number(n) : void 0,
                      commentId: r ? Number(r) : void 0,
                      startParam: a,
                      startAttach: i,
                      attach: d,
                      threadId: T,
                    }));
              break;
            }
            case "bg":
            case "login":
              break;
            case "join": {
              const { invite: e } = p;
              g({ hash: e });
              break;
            }
            case "addemoji":
            case "addstickers": {
              const { set: e } = p;
              v({ stickerSetInfo: { shortName: e } });
              break;
            }
            case "share":
            case "msg":
            case "msg_url": {
              const { url: e, text: t } = p;
              C({ text: u(e, t) });
              break;
            }
            case "addlist":
              S({ slug: p.slug });
              break;
            case "invoice": {
              const { slug: e } = p;
              I({ type: "slug", slug: e });
              break;
            }
            case "boost": {
              const { channel: e, domain: t } = p;
              k({ usernameOrId: e || t, isPrivate: Boolean(e) });
              break;
            }
            case "giftcode": {
              const { slug: e } = p;
              T({ slug: e });
              break;
            }
            default:
              return !1;
          }
          return !0;
        };
        function c(e) {
          if (e)
            return e
              .toLowerCase()
              .split(" ")
              .filter((e) => o.K_A.includes(e));
        }
        function u(e, t, n) {
          return { text: [e, n, t].filter(Boolean).join("\n") };
        }
      },
      91800: (e, t, n) => {
        function r(e) {
          const t = parseInt(getComputedStyle(e).lineHeight, 10);
          return { totalLines: e.scrollHeight / t, lineHeight: t };
        }
        n.d(t, { A: () => r });
      },
      60261: (e, t, n) => {
        n.d(t, {
          Il: () => w,
          K3: () => A,
          ZR: () => E,
          Qy: () => T,
          VU: () => S,
          LQ: () => I,
        });
        var r = n(37932),
          o = n(13439),
          s = n(23174),
          a = n(66644),
          i = n(90709),
          d = n(29807),
          c = n(46536),
          u = n(14235),
          l = n(58554),
          f = n(37836),
          h = n(82393),
          m = n(61911);
        const p = n.p + "square.370a4828a4f2afc14ada.svg",
          g = new Set(),
          y = new Map(),
          b = (0, c.h)();
        let v;
        function w(e, t) {
          y.set(e, t);
        }
        function I(e) {
          y.delete(e);
        }
        (0, r.DW)((e) => {
          if (
            e.customEmojis.byId !== v?.customEmojis.byId ||
            (0, d.BWX)(e) !== (0, d.BWX)(v)
          ) {
            for (const t of y) {
              const [n, r] = t;
              e.customEmojis.byId[r] && n(e.customEmojis);
            }
            !(function (e) {
              const t = Array.from(g).filter((t) => Boolean(e.byId[t]));
              t.length && (t.forEach((e) => g.delete(e)), S());
            })(e.customEmojis);
          }
          v = e;
        });
        const A = b.addCallback,
          C = (0, f.nF)(b.runCallbacks, 500),
          S = (0, f.nF)(function () {
            document
              .querySelectorAll(".custom-emoji.placeholder")
              .forEach((e) => {
                const t = (0, o.mS)().customEmojis.byId[e.dataset.documentId];
                if (!t) return void g.add(e.dataset.documentId);
                const [n, r, s] = T(t);
                t.shouldUseTextColor &&
                  !e.classList.contains("colorable") &&
                  (0, a.RK)(() => {
                    e.classList.add("colorable");
                  }),
                  n ||
                    (0, a.RK)(() => {
                      (e.src = r),
                        e.classList.remove("placeholder"),
                        s && (e.dataset.uniqueId = s),
                        C(t.id);
                    });
              });
          }, 500);
        function E(e, t) {
          const n = (0, i.aL)(e, t),
            r = l.Ih(n);
          if (r) return r;
          k(n);
        }
        function k(e) {
          return l.hd(e, s.qZ.BlobUrl).then(() => {
            S();
          });
        }
        function T(e) {
          if (!e) return [!0, p, void 0];
          const t = !h.OF && e.isVideo;
          if (e.isLottie || (e.isVideo && !t))
            return k(`sticker${e.id}`), [!1, m, (0, u.A)()];
          const n = E(e.id, t);
          return [!n, n || p, void 0];
        }
      },
      52491: (e, t, n) => {
        n.d(t, {
          D0: () => m,
          On: () => u,
          P_: () => l,
          cp: () => h,
          mS: () => f,
        });
        var r = n(61433),
          o = n(66644),
          s = n(98221),
          a = n(19314);
        const i = ["female_sign", "male_sign", "medical_symbol"],
          d = 127397;
        function c(e) {
          const t = e.split("-").map((e) => parseInt(e, 16));
          return String.fromCodePoint(...t);
        }
        const u = new Set();
        function l(e) {
          const t = e.currentTarget;
          u.add(e.currentTarget.dataset.path),
            (0, o.RK)(() => {
              (0, r.YM)(t, "open");
            });
        }
        const f = (0, a.A)(function (e) {
          return (function (e) {
            let t;
            if (1 === e.length)
              t = e.charCodeAt(0).toString(16).padStart(4, "0");
            else {
              const n = [];
              for (let t = 0; t < e.length; t++)
                e.charCodeAt(t) >= 55296 && e.charCodeAt(t) <= 56319
                  ? e.charCodeAt(t + 1) >= 56320 &&
                    e.charCodeAt(t + 1) <= 57343 &&
                    n.push(
                      1024 * (e.charCodeAt(t) - 55296) +
                        (e.charCodeAt(t + 1) - 56320) +
                        65536
                    )
                  : (e.charCodeAt(t) < 55296 || e.charCodeAt(t) > 57343) &&
                    n.push(e.charCodeAt(t));
              t = n.map((e) => e.toString(16).padStart(4, "0")).join("-");
            }
            return t;
          })((0, s.a)(e));
        });
        function h(e) {
          const t = { categories: [], emojis: {} };
          for (let n = 0; n < e.length; n += 2) {
            const r = { id: e[n][0], name: e[n][1], emojis: [] };
            for (let o = 0; o < e[n + 1].length; o++) {
              const s = e[n + 1][o];
              i.includes(s[1][0]) ||
                (r.emojis.push(s[1][0]),
                (t.emojis[s[1][0]] = {
                  id: s[1][0],
                  names: s[1],
                  native: c(s[0]),
                  image: s[0].toLowerCase(),
                }));
            }
            t.categories.push(r);
          }
          return t;
        }
        function m(e) {
          if ("FT" === e) return "🏴‍☠️";
          const t = e.toUpperCase();
          if (!/^[A-Z]{2}$/.test(t)) return e;
          const n = [...t].map((e) => e.codePointAt(0) + d);
          return String.fromCodePoint(...n);
        }
      },
      24282: (e, t, n) => {
        n.d(t, { A: () => s });
        var r = n(98221);
        const o = [
          [/\u{1f3f3}\u200d\u{1f308}/gu, "🏳️‍🌈"],
          [/\u{1f3f3}\u200d\u26a7\ufe0f?/gu, "🏳️‍⚧️"],
          [/\u26d3\u200d\u{1f4a5}/gu, "⛓️‍💥"],
          [/\u200d([\u2640\u2642])(?!\ufe0f)/gu, "‍$1️"],
        ];
        function s(e) {
          if (!e.match(r.A)) return e;
          for (const [t, n] of o) e = e.replace(t, n);
          return e;
        }
      },
      62076: (e, t, n) => {
        n.d(t, { T: () => s });
        const r = new Set([
            "http:",
            "https:",
            "tg:",
            "ton:",
            "mailto:",
            "tel:",
          ]),
          o = "https://";
        function s(e) {
          if (e)
            try {
              const t = new URL(e);
              return r.has(t.protocol) ? e : `${o}${e}`;
            } catch (t) {
              return `${o}${e}`;
            }
        }
      },
      14487: (e, t, n) => {
        n.d(t, {
          I: () => T,
          T_: () => L,
          UJ: () => A,
          VS: () => P,
          ZQ: () => S,
          g0: () => E,
          gb: () => k,
          ve: () => N,
          wr: () => M,
        });
        var r = n(31481),
          o = n(46536),
          s = n(70934),
          a = n(82393),
          i = n(9705);
        const d = 100,
          { addCallback: c, runCallbacks: u } = (0, o.h)(),
          { addCallback: l, runCallbacks: f } = (0, o.h)(),
          h = Number(Math.random().toString().substring(2)),
          m = new Set([h]);
        let p = a.bs ? new BroadcastChannel(r.a9l) : void 0,
          g = !1;
        const y = new i.A();
        let b,
          v,
          w = !1;
        const I = (e) => {
          let { data: t } = e;
          if (p && t) {
            if (
              (t.currentPasscodeHash && (0, s.tn)(t.currentPasscodeHash),
              t.hasGaveUpMaster && w)
            )
              return (b = h), (w = !1), y.resolve(), void u(!0);
            if (t.shouldGiveUpMaster)
              return (
                b === h &&
                  (u(!1),
                  p.postMessage({
                    currentPasscodeHash: (0, s.dl)(),
                    hasGaveUpMaster: !0,
                  })),
                void (b = t.masterToken)
              );
            if (
              (t.tokenDied &&
                (f(t.tokenDied),
                m.delete(t.tokenDied),
                t.tokenDied === b &&
                  (m.delete(t.tokenDied),
                  (b = void 0),
                  (g = !1),
                  (v = t.tokenDied),
                  p.postMessage({
                    collectedTokens: m,
                    masterToken: b,
                    reestablishToken: v,
                  }),
                  1 === m.size &&
                    ((g = !0), (b = h), (v = void 0), y.resolve(), u(!0)))),
              t.collectedTokens)
            ) {
              if (!t.reestablishToken && v) return;
              t.reestablishToken &&
                v !== t.reestablishToken &&
                (t.collectedTokens.delete(t.reestablishToken),
                (v = t.reestablishToken));
              const e = m.size;
              t.collectedTokens.forEach((e) => m.add(e)),
                v && t.collectedTokens.delete(v),
                g
                  ? t.masterToken ||
                    p.postMessage({
                      collectedTokens: m,
                      masterToken: b,
                      reestablishToken: v,
                    })
                  : t.masterToken
                  ? ((v = void 0),
                    (b = t.masterToken),
                    u(b === h),
                    g ||
                      p.postMessage({
                        collectedTokens: m,
                        masterToken: b,
                        reestablishToken: v,
                      }),
                    y.resolve(),
                    (g = !0))
                  : e !== m.size
                  ? p.postMessage({
                      collectedTokens: m,
                      masterToken: b,
                      reestablishToken: v,
                    })
                  : ((v = void 0),
                    (b = Math.max(...Array.from(m))),
                    u(b === h),
                    g ||
                      p.postMessage({
                        collectedTokens: m,
                        masterToken: b,
                        reestablishToken: v,
                      }),
                    y.resolve(),
                    (g = !0));
            }
          }
        };
        function A(e) {
          p &&
            (p.addEventListener("message", I),
            p.postMessage({ collectedTokens: m }),
            setTimeout(() => {
              void 0 === b ? ((b = h), y.resolve(), u(!0)) : e && T();
            }, d),
            window.addEventListener("beforeunload", C));
        }
        function C() {
          p &&
            (f(h),
            p.removeEventListener("message", I),
            p.postMessage({ tokenDied: h, currentPasscodeHash: (0, s.dl)() }),
            p.close(),
            (p = void 0));
        }
        function S() {
          p && p.postMessage({ currentPasscodeHash: (0, s.dl)() });
        }
        function E() {
          return h;
        }
        function k() {
          return Array.from(m);
        }
        function T() {
          p &&
            ((w = !0),
            p.postMessage({
              collectedTokens: m,
              masterToken: h,
              shouldGiveUpMaster: !0,
            }));
        }
        const P = l,
          M = c,
          L = y.promise;
        function N() {
          return b === h;
        }
      },
      87679: (e, t, n) => {
        n.d(t, {
          FW: () => d,
          NN: () => i,
          PR: () => l,
          eT: () => c,
          kc: () => f,
          sZ: () => u,
          ti: () => a,
          zE: () => s,
        }),
          n(31481);
        var r = n(37836);
        function o(e, t, n) {
          var r;
          return (
            (t =
              "symbol" ==
              typeof (r = (function (e, t) {
                if ("object" != typeof e || !e) return e;
                var n = e[Symbol.toPrimitive];
                if (void 0 !== n) {
                  var r = n.call(e, "string");
                  if ("object" != typeof r) return r;
                  throw new TypeError(
                    "@@toPrimitive must return a primitive value."
                  );
                }
                return String(e);
              })(t))
                ? r
                : r + "") in e
              ? Object.defineProperty(e, t, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = n),
            e
          );
        }
        function s(e) {
          return new Promise((t, n) => {
            const r = new FileReader();
            (r.onload = (e) => {
              const { result: r } = e.target || {};
              "string" == typeof r && t(r), n(new Error("Failed to read blob"));
            }),
              (r.onerror = n),
              r.readAsDataURL(e);
          });
        }
        function a(e, t) {
          return new File([e], t, { lastModified: Date.now(), type: e.type });
        }
        function i(e) {
          return new Promise((t, n) => {
            const r = new Image();
            (r.onload = () => t(r)), (r.onerror = n), (r.src = e);
          });
        }
        function d(e) {
          return new Promise((t, n) => {
            const r = document.createElement("video");
            (r.volume = 0),
              (r.onloadedmetadata = () => t(r)),
              (r.onerror = n),
              (r.src = e);
          });
        }
        async function c(e) {
          try {
            const t = await d(e);
            return await Promise.race([
              (0, r.v7)(2e3),
              new Promise((e, n) => {
                (t.onseeked = () => {
                  (t.videoWidth && t.videoHeight) || e(void 0);
                  const n = document.createElement("canvas");
                  (n.width = t.videoWidth),
                    (n.height = t.videoHeight),
                    n.getContext("2d").drawImage(t, 0, 0),
                    n.toBlob((t) => {
                      e(t ? URL.createObjectURL(t) : void 0);
                    });
                }),
                  (t.onerror = n),
                  (t.currentTime = Math.min(t.duration, 1));
              }),
            ]);
          } catch (e) {
            return;
          }
        }
        async function u(e) {
          return (await fetch(e)).blob();
        }
        function l(e) {
          const t = document.createElement("canvas");
          return (
            (t.width = e.width),
            (t.height = e.height),
            t.getContext("2d").drawImage(e, 0, 0),
            t
          );
        }
        function f(e) {
          if (e?.length)
            return Array.from(e)
              .map(h)
              .filter((e) => e.size);
        }
        function h(e) {
          const t = e.name.split(".").pop();
          return e.type || "mov" !== t.toLowerCase()
            ? e
            : new File([e], e.name, { type: "video/quicktime" });
        }
        "undefined" == typeof File &&
          (self.File = class extends Blob {
            constructor(e, t, n) {
              if (n) {
                const { type: t, ...r } = n;
                super(e, { type: t }),
                  o(this, "name", void 0),
                  Object.assign(this, r);
              } else super(e), o(this, "name", void 0);
              this.name = t;
            }
          });
      },
      49763: (e, t, n) => {
        n.d(t, {
          BU: () => M,
          P1: () => L,
          PZ: () => E,
          Ts: () => I,
          YA: () => A,
          Yw: () => P,
          jn: () => S,
          uk: () => T,
          vp: () => k,
          zm: () => C,
        });
        var r = n(84051),
          o = n(37932),
          s = n(13439),
          a = n(31481),
          i = n(90709),
          d = n(29807),
          c = n(5930),
          u = n(46536),
          l = n(87894),
          f = n(37836);
        const h = 6,
          m = R();
        let p = m.prevGlobal,
          g = m.prepared,
          y = m.results,
          b = m.callbacks;
        a.Oig &&
          (window.DEBUG_getFolderManager = () => ({ prepared: g, results: y }));
        const v = (0, f.nF)(() => {
          (0, r.qF)(() => {
            N((0, s.mS)());
          });
        }, 500);
        let w = !1;
        function I() {
          (w = !0), (0, o.DW)(v), (0, s.aJ)("reset", D);
          const e = (0, s.mS)();
          (0, d.nTw)(e).isMasterTab || B(e, !0, !0, !0, !0), N(e);
        }
        function A(e) {
          return w || I(), y.orderedIdsByFolderId[e];
        }
        function C(e) {
          return w || I(), y.pinnedCountByFolderId[e] || 0;
        }
        function S() {
          return w || I(), y.chatsCountByFolderId;
        }
        function E() {
          return w || I(), y.unreadCountersByFolderId;
        }
        function k() {
          return E()[a.DSF]?.notificationsCount || 0;
        }
        function T(e, t) {
          const n = g.chatSummariesById.get(e);
          return t ? n.orderInSaved : n.orderInAll;
        }
        function P(e, t) {
          return (
            b.orderedIdsByFolderId[e] ||
              (b.orderedIdsByFolderId[e] = (0, u.h)()),
            b.orderedIdsByFolderId[e].addCallback(t)
          );
        }
        function M(e) {
          return b.chatsCountByFolderId.addCallback(e);
        }
        function L(e) {
          return b.unreadCountersByFolderId.addCallback(e);
        }
        function N(e) {
          let t;
          a.Oig && (t = performance.now());
          const n = Boolean(
              e.chats.listIds.active &&
                F(
                  a.DSF,
                  e.chats.listIds.active,
                  e.chats.orderedPinnedIds.active
                )
            ),
            r = Boolean(
              e.chats.listIds.archived &&
                F(
                  a._E9,
                  e.chats.listIds.archived,
                  e.chats.orderedPinnedIds.archived
                )
            ),
            o = Boolean(
              e.chats.listIds.saved &&
                F(a.pX9, e.chats.listIds.saved, e.chats.orderedPinnedIds.saved)
            ),
            s = e.chats.isFullyLoaded.active !== p.isAllFolderFullyLoaded,
            u =
              e.chats.isFullyLoaded.archived !== p.isArchivedFolderFullyLoaded,
            f = e.chats.isFullyLoaded.saved !== p.isSavedFolderFullyLoaded,
            m = e.chatFolders.byId !== p.foldersById,
            b = e.chats.byId !== p.chatsById,
            v = e.chats.lastMessageIds.saved !== p.lastSavedMessageIds,
            w = e.chats.lastMessageIds.all !== p.lastAllMessageIds,
            I = e.chats.topicsInfoById !== p.topicsInfoById,
            A = e.users.byId !== p.usersById,
            C = (0, d.$5S)(e) !== p.notifySettings,
            S = (0, d.GrP)(e) !== p.notifyExceptions;
          let E = [];
          if (
            ((s || u || f) &&
              (E = E.concat(
                (function (e) {
                  let t =
                      arguments.length > 2 &&
                      void 0 !== arguments[2] &&
                      arguments[2],
                    n = [];
                  arguments.length > 1 &&
                    void 0 !== arguments[1] &&
                    arguments[1] &&
                    n.push(a._E9),
                    t && n.push(a.pX9);
                  const r = e.chats.isFullyLoaded.active,
                    o = e.chats.isFullyLoaded.archived,
                    s = e.chats.isFullyLoaded.saved;
                  if (r && o) {
                    const e = Object.keys(g.folderSummariesById)
                      .filter((e) => !y.orderedIdsByFolderId[e])
                      .map(Number);
                    n = n.concat(e);
                  }
                  return (
                    (p.isAllFolderFullyLoaded = r),
                    (p.isArchivedFolderFullyLoaded = o),
                    (p.isSavedFolderFullyLoaded = s),
                    n
                  );
                })(e, u, f)
              )),
            !(n || r || o || m || b || A || I || C || S || v || w))
          )
            return void (E.length && O(E));
          const k = p.allFolderListIds,
            T = p.archivedFolderListIds,
            P = p.savedFolderListIds;
          if (
            (B(e, n, r, o, m),
            (E = E.concat(
              (function (e, t, n, r, o, s, u) {
                const f = e.chats.byId,
                  h = e.users.byId,
                  m = e.chats.lastMessageIds.all,
                  b = e.chats.lastMessageIds.saved,
                  v = (0, d.$5S)(e),
                  w = (0, d.GrP)(e),
                  I = Object.values(g.folderSummariesById),
                  A = new Set(),
                  C = e.chats.listIds.active,
                  S = e.chats.listIds.archived,
                  E = e.chats.listIds.saved,
                  k = [...(C || []), ...(S || [])];
                let T = [...k, ...(E || [])];
                return (
                  (C === o && S === s && E === u) ||
                    (T = (0, l.Am)(T.concat(o || [], s || [], u || []))),
                  T.forEach((o) => {
                    const s = f[o];
                    if (
                      !t &&
                      !n &&
                      !r &&
                      s === p.chatsById[o] &&
                      h[o] === p.usersById[o] &&
                      m?.[o] === p.lastAllMessageIds?.[o] &&
                      b?.[o] === p.lastSavedMessageIds?.[o]
                    )
                      return;
                    let u;
                    if (s) {
                      const n = g.chatSummariesById.get(o),
                        r = !k.includes(o),
                        l = !E?.includes(o),
                        f = (function (e, t, n, r, o, s, c) {
                          const {
                              id: u,
                              type: l,
                              isRestricted: f,
                              isNotJoined: h,
                              migratedTo: m,
                              folderId: p,
                              unreadCount: g,
                              unreadMentionsCount: y,
                              hasUnreadMark: b,
                              isForum: v,
                            } = t,
                            w = (0, d.pSx)(e, t.id),
                            { unreadCount: I, unreadMentionsCount: A } = v
                              ? Object.values(w || {}).reduce(
                                  (e, t) => (
                                    (e.unreadCount += t.unreadCount),
                                    (e.unreadMentionsCount +=
                                      t.unreadMentionsCount),
                                    e
                                  ),
                                  { unreadCount: 0, unreadMentionsCount: 0 }
                                )
                              : { unreadCount: g, unreadMentionsCount: y },
                            C = "chatTypePrivate" === l && o,
                            S = (0, d.yHC)(e, t.id),
                            E =
                              t.id === a.zv8 &&
                              (!S || "historyClear" === S.content.action?.type),
                            k = Math.max(
                              t.creationDate || 0,
                              t.draftDate || 0,
                              S?.date || 0
                            ),
                            T = (0, d.yHC)(e, t.id, "saved"),
                            P = T?.date || 0;
                          return {
                            id: u,
                            type: l,
                            isListedInAll: Boolean(!(f || h || m || E || s)),
                            isListedInSaved: !c,
                            isArchived: p === a._E9,
                            isMuted: (0, i.W1)(t, n, r),
                            isUnread: Boolean(I || A || b),
                            unreadCount: I,
                            unreadMentionsCount: A,
                            isUserBot: C ? "userTypeBot" === C.type : void 0,
                            isUserContact: C ? C.isContact : void 0,
                            orderInAll: k,
                            orderInSaved: P,
                          };
                        })(e, s, v, w, h[o], r, l);
                      if (!t && n && (0, c.A)(f, n)) return;
                      g.chatSummariesById.set(o, f),
                        (u = (function (e, t) {
                          return t
                            .reduce(
                              (t, n) => (
                                (function (e, t) {
                                  if (
                                    !(t.id === a.pX9
                                      ? e.isListedInSaved
                                      : e.isListedInAll)
                                  )
                                    return !1;
                                  const { id: n, type: r } = e;
                                  if (t.listIds)
                                    return (
                                      !(
                                        (e.isArchived && t.id === a.DSF) ||
                                        (!e.isArchived && t.id === a._E9)
                                      ) && t.listIds.has(n)
                                    );
                                  if (t.excludedChatIds?.has(n)) return !1;
                                  if (t.includedChatIds?.has(n)) return !0;
                                  if (t.pinnedChatIds?.has(n)) return !0;
                                  if (t.excludeArchived && e.isArchived)
                                    return !1;
                                  if (t.excludeRead && !e.isUnread) return !1;
                                  if (
                                    t.excludeMuted &&
                                    e.isMuted &&
                                    !e.unreadMentionsCount
                                  )
                                    return !1;
                                  if ("chatTypePrivate" === r)
                                    if (e.isUserBot) {
                                      if (t.bots) return !0;
                                    } else {
                                      if (t.contacts && e.isUserContact)
                                        return !0;
                                      if (t.nonContacts && !e.isUserContact)
                                        return !0;
                                    }
                                  else {
                                    if ("chatTypeChannel" === r)
                                      return Boolean(t.channels);
                                    if (
                                      "chatTypeBasicGroup" === r ||
                                      "chatTypeSuperGroup" === r
                                    )
                                      return Boolean(t.groups);
                                  }
                                  return !1;
                                })(e, n) && t.push(n.id),
                                t
                              ),
                              []
                            )
                            .sort();
                        })(f, I)),
                        u.forEach((e) => {
                          A.add(e);
                        });
                    } else g.chatSummariesById.delete(o), (u = []);
                    const C = g.folderIdsByChatId[o] || [];
                    if ((0, l.k)(u, C)) return;
                    const S = (function (e, t, n) {
                      const r = new Set(t),
                        o = new Set(n),
                        s = [];
                      return (
                        (0, l.Am)([...t, ...n]).forEach((t) => {
                          let n = y.orderedIdsByFolderId[t];
                          r.has(t) && !o.has(t)
                            ? (g.chatIdsByFolderId[t].delete(e),
                              s.push(t),
                              n &&
                                ((n = n.filter((t) => t !== e)),
                                (g.isOrderedListJustPatched[t] = !0)))
                            : !r.has(t) &&
                              o.has(t) &&
                              (g.chatIdsByFolderId[t] ||
                                (g.chatIdsByFolderId[t] = new Set()),
                              g.chatIdsByFolderId[t].add(e),
                              n &&
                                (n.push(e),
                                (g.isOrderedListJustPatched[t] = !0))),
                            (y.orderedIdsByFolderId[t] = n);
                        }),
                        (g.folderIdsByChatId[e] = n),
                        s
                      );
                    })(o, C, u);
                    S.forEach((e) => {
                      A.add(e);
                    });
                  }),
                  (p.chatsById = f),
                  (p.usersById = h),
                  (p.lastAllMessageIds = m),
                  (p.lastSavedMessageIds = b),
                  (p.notifySettings = v),
                  (p.notifyExceptions = w),
                  Array.from(A)
                );
              })(e, m || n || r || o, C, S, k, T, P)
            )),
            O((0, l.Am)(E)),
            a.Oig)
          ) {
            const e = performance.now() - t;
            e > h &&
              console.warn(`Slow \`updateFolderManager\`: ${Math.round(e)} ms`);
          }
        }
        function F(e, t, n) {
          const r =
              e === a.DSF
                ? p.allFolderListIds
                : e === a.pX9
                ? p.savedFolderListIds
                : p.archivedFolderListIds,
            o =
              e === a.DSF
                ? p.allFolderPinnedIds
                : e === a.pX9
                ? p.savedFolderPinnedIds
                : p.archivedFolderPinnedIds;
          return r !== t || o !== n;
        }
        function B(e, t, n, r, o) {
          const s = [];
          if (t) {
            const t = e.chats.listIds.active,
              n = e.chats.orderedPinnedIds.active;
            (g.folderSummariesById[a.DSF] = x(a.DSF, t, n)),
              (p.allFolderListIds = t),
              (p.allFolderPinnedIds = n),
              s.push(a.DSF);
          }
          if (n) {
            const t = e.chats.listIds.archived,
              n = e.chats.orderedPinnedIds.archived;
            (g.folderSummariesById[a._E9] = x(a._E9, t, n)),
              (p.archivedFolderListIds = t),
              (p.archivedFolderPinnedIds = n),
              s.push(a._E9);
          }
          if (r) {
            const t = e.chats.listIds.saved,
              n = e.chats.orderedPinnedIds.saved;
            (g.folderSummariesById[a.pX9] = x(a.pX9, t, n)),
              (p.savedFolderListIds = t),
              (p.savedFolderPinnedIds = n),
              s.push(a.pX9);
          }
          if (o) {
            const t = e.chatFolders.byId;
            Object.values(t).forEach((e) => {
              e !== p.foldersById[e.id] &&
                ((g.folderSummariesById[e.id] = (function (e) {
                  return {
                    ...e,
                    orderedPinnedIds: e.pinnedChatIds,
                    excludedChatIds: e.excludedChatIds
                      ? new Set(e.excludedChatIds)
                      : void 0,
                    includedChatIds: e.excludedChatIds
                      ? new Set(e.includedChatIds)
                      : void 0,
                    pinnedChatIds: e.excludedChatIds
                      ? new Set(e.pinnedChatIds)
                      : void 0,
                  };
                })(e)),
                s.push(e.id));
            }),
              (p.foldersById = t);
          }
          return s;
        }
        function x(e, t, n) {
          return {
            id: e,
            listIds: new Set(t),
            orderedPinnedIds: n,
            pinnedChatIds: new Set(n),
          };
        }
        function O(e) {
          let t = !1,
            n = !1;
          if (
            (Array.from(e).forEach((e) => {
              const { pinnedCount: r, orderedIds: o } = (function (e) {
                const t = g.folderSummariesById[e];
                if (!t) return {};
                const { orderedPinnedIds: n, pinnedChatIds: r } = t,
                  {
                    chatIdsByFolderId: { [e]: o },
                  } = g,
                  {
                    orderedIdsByFolderId: { [e]: s },
                  } = y,
                  i = e === a.pX9,
                  d = o ? n?.filter((e) => o.has(e)) : n,
                  c = s || (o && Array.from(o)) || [],
                  u = (r ? c.filter((e) => !r.has(e)) : c).sort(
                    (e, t) => T(t, i) - T(e, i)
                  );
                return {
                  pinnedCount: d?.length || 0,
                  orderedIds: [...(d || []), ...u],
                };
              })(e);
              if (!o) return;
              const s = y.orderedIdsByFolderId[e],
                i = y.pinnedCountByFolderId[e];
              (!s ||
                void 0 === i ||
                i !== r ||
                g.isOrderedListJustPatched[e] ||
                !(0, l.k)(o, s)) &&
                ((g.isOrderedListJustPatched[e] = !1),
                (y.orderedIdsByFolderId[e] = o),
                (y.pinnedCountByFolderId[e] = r),
                b.orderedIdsByFolderId[e]?.runCallbacks(o));
              const d = y.chatsCountByFolderId[e],
                u = o.length;
              n || (n = d !== u), (y.chatsCountByFolderId[e] = u);
              const f = y.unreadCountersByFolderId[e],
                h = (function (e) {
                  const { chatSummariesById: t } = g,
                    {
                      orderedIdsByFolderId: { [e]: n },
                    } = y;
                  return n.reduce(
                    (e, n) => {
                      const r = t.get(n);
                      return r
                        ? (r.isUnread &&
                            (e.chatsCount++,
                            r.unreadMentionsCount &&
                              (e.notificationsCount += r.unreadMentionsCount),
                            r.isMuted ||
                              (r.unreadCount
                                ? (e.notificationsCount += r.unreadCount)
                                : r.unreadMentionsCount ||
                                  (e.notificationsCount += 1))),
                          e)
                        : e;
                    },
                    { chatsCount: 0, notificationsCount: 0 }
                  );
                })(e);
              t || (t = !f || !(0, c.A)(h, f)),
                (y.unreadCountersByFolderId[e] = h);
            }),
            n)
          ) {
            const e = { ...y.chatsCountByFolderId };
            (y.chatsCountByFolderId = e),
              b.chatsCountByFolderId.runCallbacks(e);
          }
          if (t) {
            const e = { ...y.unreadCountersByFolderId };
            (y.unreadCountersByFolderId = e),
              b.unreadCountersByFolderId.runCallbacks(e);
          }
        }
        function R() {
          return {
            prevGlobal: {
              foldersById: {},
              chatsById: {},
              usersById: {},
              topicsInfoById: {},
              notifySettings: {},
              notifyExceptions: {},
            },
            prepared: {
              folderSummariesById: {},
              chatSummariesById: new Map(),
              folderIdsByChatId: {},
              chatIdsByFolderId: {},
              isOrderedListJustPatched: {},
            },
            results: {
              orderedIdsByFolderId: {},
              pinnedCountByFolderId: {},
              chatsCountByFolderId: {},
              unreadCountersByFolderId: {},
            },
            callbacks: {
              orderedIdsByFolderId: {},
              chatsCountByFolderId: (0, u.h)(),
              unreadCountersByFolderId: (0, u.h)(),
            },
          };
        }
        function D() {
          const e = R();
          (p = e.prevGlobal),
            (g = e.prepared),
            (y = e.results),
            (b = e.callbacks);
        }
      },
      41402: (e, t, n) => {
        function r(e) {
          e.offsetWidth;
        }
        n.d(t, { A: () => r });
      },
      17142: (e, t, n) => {
        n.d(t, { A: () => i, v: () => a });
        var r = n(84051),
          o = n(31481),
          s = n(9267);
        function a(e, t) {
          let n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : "en",
            a = arguments.length > 3 ? arguments[3] : void 0;
          const c = e / 10 ** d(t);
          return t === o.OUy
            ? [
                r.Ay.createElement(s.A, {
                  className: a?.iconClassName,
                  type: "gold",
                  size: "adaptive",
                }),
                c,
              ]
            : i(e, t, n, a);
        }
        function i(e, t) {
          let n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : "en",
            r = arguments.length > 3 ? arguments[3] : void 0;
          const o = e / 10 ** d(t);
          return r?.shouldOmitFractions && o % 1 == 0
            ? new Intl.NumberFormat(n, {
                style: "currency",
                currency: t,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(o)
            : new Intl.NumberFormat(n, {
                style: "currency",
                currency: t,
              }).format(o);
        }
        function d(e) {
          return "TON" === e
            ? 9
            : "CLF" === e
            ? 4
            : ["BHD", "IQD", "JOD", "KWD", "LYD", "OMR", "TND"].includes(e)
            ? 3
            : [
                "BIF",
                "BYR",
                "CLP",
                "CVE",
                "DJF",
                "GNF",
                "ISK",
                "JPY",
                "KMF",
                "KRW",
                "MGA",
                "PYG",
                "RWF",
                "UGX",
                "UYI",
                "VND",
                "VUV",
                "XAF",
                "XOF",
                "XPF",
                o.OUy,
              ].includes(e)
            ? 0
            : "MRO" === e
            ? 1
            : 2;
        }
      },
      90603: (e, t, n) => {
        n.d(t, { Mt: () => f, e$: () => u, GR: () => l });
        const r = n.p + "blue.7addb55a171bbda244ac.svg",
          o = n.p + "green.19008e11c98b08550285.svg";
        var s = n(38027);
        const a = n.p + "red.1ab26ec752237fc45355.svg",
          i = n.p + "rose.6dd2db47d5e1fb9bdb9d.svg",
          d = n.p + "violet.7c7f825ebb51cf3084e3.svg",
          c = {
            7322096: [r, "blue"],
            16766590: [n.p + "yellow.40f6b4865f20f3e6a1ab.svg", "yellow"],
            13338331: [d, "violet"],
            9367192: [o, "green"],
            16749490: [i, "rose"],
            16478047: [a, "red"],
          };
        function u() {
          return Object.keys(c).map((e) => parseInt(e, 10));
        }
        function l(e) {
          return (e && c[e][0]) || s;
        }
        function f(e) {
          return `--color-topic-${(e && c[e][1]) || "grey"}`;
        }
      },
      14235: (e, t, n) => {
        function r() {
          return Date.now().toString(36) + Math.random().toString(36).slice(2);
        }
        n.d(t, { A: () => r });
      },
      99375: (e, t, n) => {
        n.d(t, { Ay: () => i, Dd: () => c, zr: () => d });
        var r = n(31481);
        const o = {
          CHAT_RESTRICTED:
            "You can't send messages in this chat, you were restricted",
          CHAT_SEND_POLL_FORBIDDEN: "You can't create polls in this chat",
          CHAT_SEND_STICKERS_FORBIDDEN: "You can't send stickers in this chat",
          CHAT_SEND_GIFS_FORBIDDEN: "You can't send gifs in this chat",
          CHAT_SEND_MEDIA_FORBIDDEN: "You can't send media in this chat",
          CHAT_LINK_EXISTS:
            "The chat is public, you can't hide the history to new users",
          SLOWMODE_WAIT_X:
            "Slowmode is enabled in this chat: you must wait for the specified number of seconds before sending another message to the chat.",
          USER_BANNED_IN_CHANNEL:
            "You're banned from sending messages in supergroups / channels",
          USER_IS_BLOCKED: "You were blocked by this user",
          YOU_BLOCKED_USER: "You blocked this user",
          IMAGE_PROCESS_FAILED: "Failure while processing image",
          MEDIA_EMPTY: "The provided media object is invalid",
          MEDIA_GROUPED_INVALID: "Failed to replace album media",
          MEDIA_NEW_INVALID: "Failed to replace new media",
          MESSAGE_NOT_MODIFIED:
            "Message not modified. The new content is identical to the current one.",
          MEDIA_INVALID: "Media invalid",
          PASSWORD_HASH_INVALID: "Incorrect password",
          PHOTO_EXT_INVALID: "The extension of the photo is invalid",
          PHOTO_INVALID_DIMENSIONS: "The photo dimensions are invalid",
          PHOTO_SAVE_FILE_INVALID: "Internal issues, try again later",
          MESSAGE_DELETE_FORBIDDEN:
            "You can't delete one of the messages you tried to delete, most likely because it is a service message.",
          MESSAGE_POLL_CLOSED: "Poll closed",
          MESSAGE_EDIT_TIME_EXPIRED: "You can't edit this message anymore.",
          PINNED_DIALOGS_TOO_MUCH: "Sorry, you can only pin 5 chats to the top",
          CHANNEL_PRIVATE: "This channel is private",
          MEDIA_CAPTION_TOO_LONG: "The provided caption is too long",
          ADDRESS_STREET_LINE1_INVALID: "The address you provided is not valid",
          ADDRESS_STREET_LINE2_INVALID: "The address you provided is not valid",
          ADDRESS_CITY_INVALID: "The city you provided is not valid",
          ADDRESS_COUNTRY_INVALID: "The country you provided is not valid",
          ADDRESS_POSTCODE_INVALID: "The postcode you provided is not valid",
          ADDRESS_STATE_INVALID: "The state you provided is not valid",
          REQ_INFO_NAME_INVALID: "The name you provided is not valid",
          REQ_INFO_PHONE_INVALID: "The phone you provided is not valid",
          REQ_INFO_EMAIL_INVALID: "The email you provided is not valid",
          LINK_NOT_MODIFIED: "This discussion is already linked to the channel",
          MESSAGE_TOO_LONG: "Message is too long",
          SERVICE_WORKER_DISABLED:
            "Service Worker is disabled. Streaming media may not be supported. Try reloading the page without holding <Shift> key",
          MESSAGE_TOO_LONG_PLEASE_REMOVE_CHARACTERS:
            "The provided message is too long. Please remove {EXTRA_CHARS_COUNT} character{PLURAL_S}.",
          FRESH_RESET_AUTHORISATION_FORBIDDEN:
            "You can’t logout other sessions if less than 24 hours have passed since you logged on the current session",
          BOTS_TOO_MUCH: "There are too many bots in this chat/channel",
          BOT_GROUPS_BLOCKED: "This bot can't be added to groups",
          USERS_TOO_MUCH: "The maximum number of users has been exceeded",
          USER_CHANNELS_TOO_MUCH:
            "One of the users you tried to add is already in too many channels/supergroups",
          USER_KICKED: "This user was kicked from this supergroup/channel",
          USER_NOT_MUTUAL_CONTACT: "The provided user is not a mutual contact",
          USER_PRIVACY_RESTRICTED:
            "The user's privacy settings do not allow you to do this",
          INVITE_HASH_EMPTY: "The invite hash is empty",
          INVITE_HASH_EXPIRED: "The invite link has expired",
          INVITE_HASH_INVALID: "The invite hash is invalid",
          CHANNELS_TOO_MUCH: "You have joined too many channels/supergroups",
          USER_ALREADY_PARTICIPANT: "You already in the group",
          SCHEDULE_DATE_INVALID: "Invalid schedule date provided",
          WALLPAPER_DIMENSIONS_INVALID:
            "The wallpaper dimensions are invalid, please select another file",
          ADMINS_TOO_MUCH: "There are too many admins",
          ADMIN_RANK_EMOJI_NOT_ALLOWED: "An admin rank cannot contain emojis",
          ADMIN_RANK_INVALID: "The specified admin rank is invalid",
          FRESH_CHANGE_ADMINS_FORBIDDEN:
            "You were just elected admin, you can't add or modify other admins yet",
          INPUT_USER_DEACTIVATED: "The specified user was deleted",
          BOT_PRECHECKOUT_TIMEOUT: "The request for payment has expired",
          PEERS_LIST_EMPTY: "No chats are added to the list",
          PAID_MEDIA_FORBIDDEN: "You can't send paid media in this chat",
        };
        r.Oig &&
          ((o.CHAT_WRITE_FORBIDDEN = "You can't write in this chat"),
          (o.CHAT_ADMIN_REQUIRED =
            "You must be an admin in this chat to do this"));
        const s = {
            ADDRESS_STREET_LINE1_INVALID: {
              field: "streetLine1",
              message: "Incorrect street address",
            },
            ADDRESS_STREET_LINE2_INVALID: {
              field: "streetLine2",
              message: "Incorrect street address",
            },
            ADDRESS_CITY_INVALID: { field: "city", message: "Incorrect city" },
            ADDRESS_COUNTRY_INVALID: {
              field: "countryIso2",
              message: "Incorrect country",
            },
            ADDRESS_POSTCODE_INVALID: {
              field: "postCode",
              message: "Incorrect post code",
            },
            ADDRESS_STATE_INVALID: {
              field: "state",
              message: "Incorrect state",
            },
            REQ_INFO_NAME_INVALID: {
              field: "fullName",
              message: "Incorrect name",
            },
            REQ_INFO_PHONE_INVALID: {
              field: "phone",
              message: "Incorrect phone",
            },
            REQ_INFO_EMAIL_INVALID: {
              field: "email",
              message: "Incorrect email",
            },
          },
          a = new Set(["BOT_PRECHECKOUT_FAILED", "PAYMENT_FAILED"]);
        function i(e) {
          const { message: t, isSlowMode: n, textParams: r } = e;
          if (n) {
            const e = t.indexOf(" (caused by");
            return e > 0 ? t.substring(0, e) : t;
          }
          let s = o[t];
          return (
            s &&
              r &&
              (s = Object.keys(r).reduce((e, t) => e.replace(t, r[t]), s)),
            s
          );
        }
        function d(e) {
          return s[e.message];
        }
        function c(e) {
          return a.has(e.message);
        }
      },
      2188: (e, t, n) => {
        n.d(t, { H: () => c });
        var r = n(31481),
          o = n(14487),
          s = n(37836);
        let a,
          i = !0;
        window.addEventListener("error", u),
          window.addEventListener("unhandledrejection", u),
          r.Oig &&
            (window.addEventListener("focus", () => {
              (0, o.ve)() &&
                ((i = !0), a && (window.alert(l(a)), (a = void 0)));
            }),
            window.addEventListener("blur", () => {
              (0, o.ve)() && (i = !1);
            }));
        const d = (0, s.nF)((e) => {
          i ? window.alert(l(e)) : (a = e);
        }, 1500);
        function c(e) {
          console.error(e), r.Oig && d(e);
        }
        function u(e) {
          (e instanceof ErrorEvent &&
            "ResizeObserver loop limit exceeded" === e.message) ||
            (e.preventDefault(),
            c(e instanceof ErrorEvent ? e.error || e.message : e.reason));
        }
        function l(e) {
          return `${r.FHx}\n\n${e?.message || e}\n${e?.stack}`;
        }
      },
      4029: (e, t, n) => {
        n.d(t, { S: () => a, a: () => s });
        var r = n(13439);
        let o;
        function s() {
          window.addEventListener("beforeinstallprompt", (e) => {
            (o = async () => {
              e.prompt(),
                "accepted" === (await e.userChoice).outcome &&
                  (0, r.ko)().setInstallPrompt({ canInstall: !1 });
            }),
              (0, r.ko)().setInstallPrompt({ canInstall: !0 });
          });
        }
        function a() {
          return o;
        }
      },
      87894: (e, t, n) => {
        function r(e, t) {
          return e.reduce((e, n) => ((e[n[t]] = n), e), {});
        }
        function o(e, t) {
          return e.reduce((e, n) => {
            const [r, o] = t(n);
            return (e[r] = o), e;
          }, {});
        }
        function s(e, t) {
          return Object.keys(e).reduce(
            (n, r, o) => ((n[r] = t(e[r], r, o, e)), n),
            {}
          );
        }
        function a(e, t) {
          return t.reduce((t, n) => ((t[n] = e[n]), t), {});
        }
        function i(e, t) {
          return t.reduce((t, n) => (e[n] && (t[n] = e[n]), t), {});
        }
        function d(e, t) {
          const n = new Set(t.map(String));
          return a(
            e,
            Object.keys(e).filter((e) => !n.has(e))
          );
        }
        function c(e) {
          return Object.keys(e).reduce((t, n) => {
            const r = n;
            return void 0 !== e[r] && (t[r] = e[r]), t;
          }, {});
        }
        function u(e, t) {
          let n =
            arguments.length > 2 && void 0 !== arguments[2]
              ? arguments[2]
              : "asc";
          function r(e, t, n, r) {
            const o = ("function" == typeof n ? n(e) : e[n]) || 0,
              s = ("function" == typeof n ? n(t) : t[n]) || 0;
            return r ? o - s : s - o;
          }
          if (Array.isArray(t)) {
            const [o, s] = Array.isArray(n) ? n : [n, n],
              [a, i] = t,
              d = "asc" === o,
              c = "asc" === s;
            return e.sort((e, t) => r(e, t, a, d) || r(e, t, i, c));
          }
          const o = "asc" === n;
          return e.sort((e, n) => r(e, n, t, o));
        }
        function l(e) {
          return Array.from(new Set(e));
        }
        function f(e, t) {
          return [...new Map(e.map((e) => [e[t], e])).values()];
        }
        function h(e) {
          return e.filter(Boolean);
        }
        function m(e, t) {
          return e.length === t.length && e.every((e, n) => e === t[n]);
        }
        function p(e, t) {
          return e[0] <= t[t.length - 1] && e[e.length - 1] >= t[0];
        }
        function g(e, t) {
          return t[0] <= e && e <= t[t.length - 1];
        }
        function y(e, t) {
          return e.filter((e) => t.has(e));
        }
        function b(e, t) {
          if (!e?.length) return e;
          const n = [];
          let r = 0;
          for (let o = 0; o < e.length; o++)
            t[r] === e[o] ? (r += 1) : n.push(e[o]);
          return n;
        }
        function v(e, t) {
          const n = [];
          for (let r = 0; r < e.length; r += t) n.push(e.slice(r, r + t));
          return n;
        }
        function w(e, t) {
          const n = [],
            r = [];
          return e.forEach((e, o, s) => (t(e, o, s) ? n : r).push(e)), [n, r];
        }
        function I(e) {
          return C(e)
            ? Array.isArray(e)
              ? e.map(I)
              : Object.keys(e).reduce((t, n) => ((t[n] = I(e[n])), t), {})
            : e;
        }
        function A(e) {
          return C(e) && !Array.isArray(e);
        }
        function C(e) {
          return "object" == typeof e && null !== e;
        }
        function S(e, t) {
          let n = e.length;
          for (; n--; ) if (t(e[n], n, e)) return e[n];
        }
        function E(e, t) {
          return Number(t) - Number(e);
        }
        n.d(t, {
          $h: () => y,
          Am: () => l,
          LG: () => s,
          My: () => u,
          OX: () => g,
          Oy: () => c,
          Uk: () => S,
          Up: () => a,
          Vh: () => A,
          Xd: () => f,
          _E: () => i,
          cJ: () => d,
          dU: () => r,
          h8: () => p,
          jB: () => w,
          k: () => m,
          lD: () => v,
          lK: () => b,
          mg: () => I,
          oE: () => h,
          pA: () => o,
          zV: () => E,
        });
      },
      60343: (e, t, n) => {
        function r(e) {
          const { chatId: t } = e;
          return s(
            t,
            "randomId" in e ? Number(e.randomId) : e.previousLocalId || e.id
          );
        }
        function o(e) {
          if (i(e.id)) return;
          const { chatId: t, id: n } = e;
          return s(t, n);
        }
        function s(e, t) {
          return `msg${e}-${t}`;
        }
        function a(e) {
          const t = e.match(/^msg(-?\d+)-(\d+)/);
          return { chatId: t[1], messageId: Number(t[2]) };
        }
        function i(e) {
          return !Number.isInteger(e);
        }
        n.d(t, { AD: () => o, ES: () => a, bj: () => r, iL: () => i });
      },
      57309: (e, t, n) => {
        function r(e) {
          const { chatId: t, id: n } = e;
          return `${t}_${n}`;
        }
        function o(e) {
          const [t, n] = e.split("_");
          return [t, Number(n)];
        }
        n.d(t, { D: () => r, a: () => o });
      },
      13376: (e, t, n) => {
        function r(e) {
          return "object" == typeof e && "isDeleted" in e;
        }
        function o(e) {
          return "withNodes" in e;
        }
        n.d(t, {
          iV: () => x,
          Yw: () => Z,
          S7: () => q,
          qY: () => X,
          CO: () => re,
          K1: () => G,
        });
        var s = n(31481),
          a = n(4875),
          i = n(4961),
          d = n(70758),
          c = n(46536);
        const u = /^\s*"\s*|\s*";?\s*$/g,
          l = /(?:\\(.))/g;
        function f(e) {
          let t,
            n = !1,
            r = !1;
          for (let o = 0; o < e.length; o++) {
            const s = e[o];
            if ("\\" !== s)
              if ('"' !== s || n) {
                if ("=" === s && !r) {
                  t = o;
                  break;
                }
                n = !1;
              } else r = !r;
            else n = !n;
          }
          if (void 0 !== t && t !== e.length - 1)
            return [
              e.slice(0, t).replace(u, "").replace(l, "$1"),
              e
                .slice(t + 1)
                .replace(u, "")
                .replace(l, "$1"),
            ];
        }
        const h = "en",
          m = 0,
          p = "https://translations.telegram.org/en/weba";
        var g = n(14487),
          y = n(87894),
          b = n(61637),
          v = n(98607),
          w = n(37836),
          I = n(82393),
          A = n(9705),
          C = n(84947);
        const S = {
            WrongNumber: "Wrong number?",
            SentAppCode:
              "We've sent the code to the **Telegram** app on your other device.",
            LoginJustSentSms:
              "We've sent you a code via SMS. Please enter it above.",
            LoginHeaderPassword: "Enter Password",
            LoginEnterPasswordDescription:
              "You have Two-Step Verification enabled, so your account is protected with an additional password.",
            StartText:
              "Please confirm your country codenand enter your phone number.",
            LoginPhonePlaceholder: "Your phone number",
            LoginNext: "Next",
            LoginQRLogin: "Log in by QR Code",
            LoginQRTitle: "Log in to Telegram by QR Code",
            LoginQRHelp1: "Open Telegram on your phone",
            LoginQR2Help2:
              "Go to **Settings** > **Devices** > **Link Desktop Device**",
            LoginQRHelp3: "Point your phone at this screen to confirm login",
            LoginQRCancel: "Log in by phone Number",
            YourName: "Your Name",
            LoginRegisterDesc: "Enter your name and add a profile photo.",
            LoginRegisterFirstNamePlaceholder: "First Name",
            LoginRegisterLastNamePlaceholder: "Last Name",
            LoginSelectCountryTitle: "Country",
            CountryNone: "Country not found",
            PleaseEnterPassword: "Enter your new password",
          },
          E = "weba",
          k = "langpack-",
          T = "en",
          P = new C.A(400);
        let M,
          L,
          N,
          F,
          B = Q();
        const {
          addCallback: x,
          removeCallback: O,
          runCallbacks: R,
        } = (0, c.h)();
        let D = !1;
        function U() {
          D ||
            ((D = !0),
            (0, w.IJ)(() => {
              R(), (D = !1);
            }));
        }
        const _ = new A.A();
        function $(e) {
          return d.q.get(`${k}${e}`);
        }
        function j(e) {
          return (
            (0, b.yK)(e.language.langCode),
            d.q.set(`${k}${e.language.langCode}`, e)
          );
        }
        let H;
        async function V() {
          if (F || H) return;
          H = (async function (e) {
            let t;
            t = e
              ? (await n.e(5269).then(n.t.bind(n, 25269, 23))).readFileSync(
                  "./src/assets/localization/fallback.strings",
                  "utf8"
                )
              : (await n.e(695).then(n.t.bind(n, 50695, 17))).default;
            const r = (function (e) {
                const t = e.split("\n"),
                  n = {};
                for (const e of t) {
                  if (!e.startsWith('"')) continue;
                  const [t, r] = f(e) || [];
                  t && r
                    ? (n[t] = r)
                    : console.warn("Bad formatting in line:", e);
                }
                return n;
              })(t),
              o = {};
            Object.entries(r).forEach((e) => {
              let [t, n] = e;
              const [r, s] = t.split("_");
              if (!s) return void (o[r] = n);
              const a = o[r] || {};
              (a[s] = n), (o[r] = a);
            });
            const s = { langCode: h, version: m, strings: o },
              a = Object.keys(o).length;
            return {
              langPack: s,
              language: {
                langCode: h,
                name: "English",
                nativeName: "English",
                pluralCode: h,
                stringsCount: a,
                translatedCount: a,
                translationsUrl: p,
              },
            };
          })();
          const e = await H;
          (F = e.langPack), P.clear(), M ? ((B = Q()), U()) : W(e.language);
        }
        async function z() {
          if (!N || !M)
            return void (
              s.Oig &&
              console.warn(
                "[Localization] Trying to fetch difference without loaded data"
              )
            );
          if (I.bs && (await g.T_, !(0, g.ve)())) return;
          const e = await (0, a.px)("fetchLangDifference", {
            langPack: E,
            langCode: N.langCode,
            fromVersion: N.version,
          });
          if (!e || e.version === N.version) return;
          const t = {
            ...N,
            version: e.version,
            strings: { ...(0, y.cJ)(N.strings, e.keysToRemove), ...e.strings },
          };
          K(t), j({ langPack: t, language: M }), U();
        }
        function W(e) {
          (M = e), J(), (B = Q()), U();
        }
        function J() {
          if (!M) return;
          const e = M.pluralCode,
            t = { format: (e) => e.join(", ") };
          function n(e, n) {
            return I.Ld ? new Intl.ListFormat(e, { type: n }) : t;
          }
          try {
            L = {
              pluralRules: new Intl.PluralRules(e),
              region: new Intl.DisplayNames(e, { type: "region" }),
              conjunction: n(e, "conjunction"),
              disjunction: n(e, "disjunction"),
              number: new Intl.NumberFormat(e),
            };
          } catch (e) {
            console.warn("Failed to create formatters:", e),
              (L = {
                pluralRules: new Intl.PluralRules(T),
                region: new Intl.DisplayNames(T, { type: "region" }),
                conjunction: n(T, "conjunction"),
                disjunction: n(T, "disjunction"),
                number: new Intl.NumberFormat(T),
              });
          }
        }
        function K(e) {
          (N = e), P.clear(), U();
        }
        async function q(e, t) {
          if (M) return;
          const n = await $(e);
          n
            ? ((N = n.langPack), (M = n.language), J(), z())
            : t
            ? await X(e)
            : V(),
            (B = Q()),
            U(),
            _.resolve();
        }
        async function G(e) {
          if ((0, g.ve)()) return;
          const t = await $(e);
          t && (K(t.langPack), W(t.language));
        }
        async function X(e, t) {
          if (t) {
            const t = await $(e);
            if (t) return Y(t.language);
          }
          if (I.bs && (await g.T_, !(0, g.ve)())) return;
          const n = await (0, a.px)("fetchLanguage", {
            langPack: E,
            langCode: e,
          });
          if (n) return Y(n);
          s.Oig && console.warn("Failed to fetch language", e);
        }
        async function Y(e) {
          if (N && M?.langCode === e.langCode) return;
          const t = await $(e.langCode);
          if (t) K(t.langPack), W(t.language), z();
          else {
            if (I.bs && (await g.T_, !(0, g.ve)())) return;
            const t = await (0, a.px)("fetchLangPack", {
              langPack: E,
              langCode: e.langCode,
            });
            if (!t) return void console.warn("Failed to fetch lang pack");
            K({ langCode: e.langCode, version: t.version, strings: t.strings }),
              W(e),
              j({ langPack: N, language: e });
          }
          (document.documentElement.lang = e.baseLangCode || e.langCode), U();
        }
        function Q() {
          const e = (e, t, n) => (n && o(n) ? ne(e, t, n) : te(e, t, n));
          return (
            (e.code = M?.langCode || T),
            (e.isRtl = M?.isRtl),
            (e.pluralCode = M?.pluralCode || T),
            (e.with = (e) => {
              let { key: t, variables: n, options: r } = e;
              return r && o(r) ? ne(t, n, r) : te(t, n, r);
            }),
            (e.region = (e) => L?.region.of(e)),
            (e.conjunction = (e) => L?.conjunction.format(e) || e.join(", ")),
            (e.disjunction = (e) => L?.disjunction.format(e) || e.join(", ")),
            (e.number = (e) => L?.number.format(e) || String(e)),
            e
          );
        }
        function Z() {
          return B;
        }
        function ee(e, t, n) {
          let o = N?.strings[e];
          if (
            (o || F || V(),
            o || (o = F?.strings[e]),
            o || (o = S[e]),
            !o || r(o))
          )
            return;
          const s = L?.pluralRules.select(n?.pluralValue || t) || "other";
          return (function (e) {
            return "string" == typeof e;
          })((a = o)) || r(a)
            ? o
            : o[s] || o.other;
          var a;
        }
        function te(e, t, n) {
          const r = `${e}-${JSON.stringify(t)}-${JSON.stringify(n)}`;
          if (P.has(r)) return P.get(r);
          const o = ee(e, n?.pluralValue || Number(t?.count) || 0, n);
          if (!o) return e;
          const s = (t ? Object.entries(t) : []).reduce((e, t) => {
            let [n, r] = t;
            return e.replace(`{${n}}`, String(r));
          }, o);
          return P.set(r, s), s;
        }
        function ne(e, t, n) {
          const r = ee(e, n?.pluralValue || Number(t?.count) || 0, n);
          if (!r) return e;
          const o = t ? Object.entries(t) : [];
          let s = [r];
          return (
            n?.specialReplacement &&
              (s = Object.entries(n.specialReplacement).reduce((e, t) => {
                let [n, r] = t;
                return (0, v.t)(e, n, r);
              }, s)),
            n?.withMarkdown || n?.renderTextFilters
              ? s.flatMap((e) => {
                  if ("string" != typeof e) return e;
                  const t = n?.withMarkdown
                    ? ["simple_markdown", "emoji"]
                    : n.renderTextFilters;
                  return (0, i.A)(e, t, {
                    markdownPostProcessor: (e) =>
                      o.reduce(
                        (e, t) => {
                          let [n, r] = t;
                          return (0, v.t)(e, `{${n}}`, r);
                        },
                        [e]
                      ),
                  });
                })
              : o.reduce((e, t) => {
                  let [n, r] = t;
                  return (0, v.t)(e, `{${n}}`, r);
                }, s)
          );
        }
        const re = _.promise;
      },
      43336: (e, t, n) => {
        n.d(t, {
          Bt: () => o,
          Cc: () => a,
          Ki: () => i,
          LI: () => s,
          qE: () => r,
        });
        const r = (e, t, n) => Math.min(n, Math.max(t, e)),
          o = (e, t, n) => e >= t && e <= n,
          s = function (e) {
            let t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 0;
            return Math.round(e * 10 ** t) / 10 ** t;
          },
          a = (e, t, n) => (1 - n) * e + n * t;
        function i(e) {
          return 2 * Math.round(e / 2);
        }
      },
      58554: (e, t, n) => {
        n.d(t, {
          ch: () => C,
          hd: () => I,
          Ih: () => A,
          RB: () => E,
          Cn: () => S,
        });
        var r = n(23174),
          o = n(31481),
          s = n(4875),
          a = n(74824),
          i = n(87679);
        const d = 48e3,
          c = 16;
        async function u(e) {
          const t = await new Response(e).arrayBuffer();
          return new Promise((e) => {
            const r = new Uint8Array(t);
            let o = new Worker(new URL(n.p + n.u(4180), n.b)),
              s = new Worker(new URL(n.p + n.u(3731), n.b));
            (o.onmessage = (e) => {
              null === e.data
                ? s.postMessage({ command: "done" })
                : s.postMessage(
                    { command: "encode", buffers: e.data },
                    e.data.map((e) => {
                      let { buffer: t } = e;
                      return t;
                    })
                  );
            }),
              (s.onmessage = (t) => {
                "page" === t.data.message &&
                  (e(new Blob([t.data.page], { type: "audio/wav" })),
                  o.terminate(),
                  (o = void 0),
                  s.terminate(),
                  (s = void 0));
              }),
              s.postMessage({
                command: "init",
                wavBitDepth: c,
                wavSampleRate: d,
              }),
              o.postMessage({
                command: "init",
                decoderSampleRate: d,
                outputBufferSampleRate: d,
              }),
              o.postMessage({ command: "decode", pages: r }, [r.buffer]);
          });
        }
        var l = n(82393);
        const f = {
            [r.qZ.BlobUrl]: a.Type.Blob,
            [r.qZ.Text]: a.Type.Text,
            [r.qZ.DownloadUrl]: void 0,
            [r.qZ.Progressive]: void 0,
          },
          h = `${o.jht ? o.uyj : "."}/progressive/`,
          m = "./download/",
          p = 2e3,
          g = 3,
          y = new Map(),
          b = new Map(),
          v = new Map(),
          w = new Map();
        function I(e, t) {
          let n =
              arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            s = arguments.length > 3 ? arguments[3] : void 0,
            a = arguments.length > 4 ? arguments[4] : void 0;
          if (t === r.qZ.Progressive)
            return l.Uz
              ? (function (e) {
                  const t = `${h}${e}`;
                  return y.set(e, t), Promise.resolve(t);
                })(e)
              : I(e, r.qZ.BlobUrl, n, s, a);
          if (t === r.qZ.DownloadUrl)
            return l.Uz
              ? (function (e) {
                  return Promise.resolve(`${m}${e}`);
                })(e)
              : I(e, r.qZ.BlobUrl, n, s, a);
          if (!b.has(e)) {
            const r = k(e, t, n)
              .catch((e) => {
                o.Oig && console.warn(e);
              })
              .finally(() => {
                b.delete(e), v.delete(e), w.delete(e);
              });
            b.set(e, r);
          }
          if (s && a) {
            let t = v.get(e);
            t || ((t = new Map()), v.set(e, t)), t.set(a, s);
          }
          return b.get(e);
        }
        function A(e) {
          return y.get(e);
        }
        function C(e) {
          v.forEach((t, n) => {
            t.forEach((t) => {
              if (t === e) {
                const e = w.get(n);
                if (!e) return;
                (0, s.om)(e), w.delete(n), v.delete(n);
              }
            });
          });
        }
        function S(e, t) {
          const n = v.get(e);
          n && n.delete(t);
        }
        function E(e) {
          return `${h}${e}`;
        }
        async function k(e, t, n) {
          let r =
            arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
          if (!o.xJs) {
            const r = e.startsWith("avatar") ? o.zrf : o.Iz7,
              s = await a.fetch(r, e, f[t], n);
            if (s) {
              let t = s;
              "audio/ogg" !== s.type || l.Oo || (t = await u(t));
              const n = T(t);
              return y.set(e, n), n;
            }
          }
          const d = (function (e) {
            const t = (n) => {
              v.get(e)?.forEach((e) => {
                e(n), e.isCanceled && (t.isCanceled = !0);
              });
            };
            return t;
          })(e);
          w.set(e, d);
          const c = await (0, s.px)(
            "downloadMedia",
            { url: e, mediaFormat: t, isHtmlAllowed: n },
            d
          );
          if (!c) {
            if (r >= g) throw new Error(`Failed to fetch media ${e}`);
            return (
              await new Promise((e) => {
                setTimeout(e, p);
              }),
              o.Oig && console.debug(`Retrying to fetch media ${e}`),
              k(e, t, n, r + 1)
            );
          }
          let { mimeType: h } = c,
            m = T(c.dataBlob);
          if ("audio/ogg" === h && !l.Oo) {
            const e = await (0, i.sZ)(m);
            URL.revokeObjectURL(m);
            const t = await u(e);
            (m = T(t)), (h = t.type);
          }
          return y.set(e, m), m;
        }
        function T(e) {
          return e instanceof Blob ? URL.createObjectURL(e) : e;
        }
        l.Uz &&
          navigator.serviceWorker.addEventListener("message", async (e) => {
            const { type: t, messageId: n, params: o } = e.data;
            if ("requestPart" !== t) return;
            const a = await (0, s.px)("downloadMedia", {
              mediaFormat: r.qZ.Progressive,
              ...o,
            });
            if (!a) return;
            const { arrayBuffer: i, mimeType: d, fullSize: c } = a;
            navigator.serviceWorker.controller.postMessage(
              {
                type: "partResponse",
                messageId: n,
                result: { arrayBuffer: i, mimeType: d, fullSize: c },
              },
              [i]
            );
          });
      },
      79824: (e, t, n) => {
        n.d(t, { p: () => r });
        const r = [];
      },
      80089: (e, t, n) => {
        n.d(t, {
          If: () => h,
          Vw: () => l,
          ar: () => s,
          gt: () => f,
          po: () => u,
        });
        var r = n(31481),
          o = n(46536);
        let s = (function (e) {
          return (
            (e[(e.Auth = 0)] = "Auth"),
            (e[(e.Main = 1)] = "Main"),
            (e[(e.Extra = 2)] = "Extra"),
            (e[(e.Calls = 3)] = "Calls"),
            e
          );
        })({});
        const a = {},
          i = {},
          { addCallback: d, runCallbacks: c } = (0, o.h)();
        async function u(e) {
          if (!a[e]) {
            switch (e) {
              case s.Auth:
                a[s.Auth] = Promise.all([n.e(4765), n.e(7405)]).then(
                  n.bind(n, 32794)
                );
                break;
              case s.Main:
                r.Oig && console.log(">>> START LOAD MAIN BUNDLE"),
                  (a[s.Main] = Promise.all([
                    n.e(4765),
                    n.e(5468),
                    n.e(236),
                    n.e(2859),
                    n.e(7768),
                  ]).then(n.bind(n, 26921)));
                break;
              case s.Extra:
                a[s.Extra] = Promise.all([
                  n.e(4765),
                  n.e(5468),
                  n.e(236),
                  n.e(9451),
                ]).then(n.bind(n, 62173));
                break;
              case s.Calls:
                a[s.Calls] = Promise.all([
                  n.e(4765),
                  n.e(5468),
                  n.e(2859),
                  n.e(2394),
                ]).then(n.bind(n, 83320));
            }
            a[e].then(c);
          }
          const t = await a[e];
          return i[e] || (i[e] = t), t;
        }
        async function l(e) {
          await u(e);
        }
        function f(e, t) {
          const n = i[e];
          if (n) return n[t];
        }
        const h = d;
      },
      61637: (e, t, n) => {
        n.d(t, { yK: () => M, Ld: () => P, mY: () => k });
        var r = n(84051),
          o = n(37932),
          s = n(13439),
          a = n(31481),
          i = n(29807),
          d = n(4875),
          c = n(87894);
        const u = Symbol("EQUAL"),
          l = { __delete: !0 },
          f = { __deleteAllChildren: !0 };
        function h(e, t) {
          if (e === t) return u;
          if (typeof e != typeof t) return t;
          if (
            Array.isArray(e) &&
            Array.isArray(t) &&
            ((r = t),
            (n = e).length === r.length && n.every((e, t) => h(e, r[t]) === u))
          )
            return u;
          var n, r;
          if (!(0, c.Vh)(e) || !(0, c.Vh)(t)) return t;
          const o = e,
            s = t,
            a = Object.keys(o),
            i = Object.keys(s);
          if (!i.length) return a.length ? f : u;
          const d = (0, c.Am)(a.concat(i)).reduce((e, t) => {
            const n = o[t],
              r = s[t];
            if (!s.hasOwnProperty(t)) return (e[t] = l), e;
            if (!o.hasOwnProperty(t)) return (e[t] = r), e;
            const a = h(n, r);
            return a !== u && (e[t] = a), e;
          }, {});
          return 0 === Object.keys(d).length ? u : d;
        }
        function m(e, t) {
          return e === t
            ? t
            : (0, c.Vh)(t)
            ? (0, c.Vh)(e)
              ? t.__deleteAllChildren
                ? {}
                : (0, c.Am)(Object.keys(e).concat(Object.keys(t))).reduce(
                    (n, r) => {
                      const o = e[r];
                      if (t.hasOwnProperty(r)) {
                        const e = t[r];
                        e?.__delete || (n[r] = m(o, e));
                      } else n[r] = o;
                      return n;
                    },
                    {}
                  )
              : p(t)
            : t;
        }
        function p(e) {
          return e.__deleteAllChildren
            ? {}
            : Object.entries(e).reduce((e, t) => {
                let [n, r] = t;
                return r?.__delete || (e[n] = (0, c.Vh)(r) ? p(r) : r), e;
              }, {});
        }
        var g = n(14487),
          y = n(82393);
        const b = 800;
        let v,
          w,
          I = !1,
          A = !1;
        const C = y.bs ? new BroadcastChannel(a.rLF) : void 0;
        let S,
          E = !1;
        function k() {
          C &&
            ((0, g.VS)((e) => {
              if (e === (0, g.g0)()) {
                C && (C.removeEventListener("message", T), (A = !0));
                const t = (0, s.mS)(),
                  n = h(t, { ...t, byTabId: (0, c.cJ)(t.byTabId, [e]) });
                return void (
                  "symbol" != typeof n &&
                  C.postMessage({ type: "globalDiffUpdate", diff: n })
                );
              }
              let t = (0, s.mS)();
              (t = { ...t, byTabId: (0, c.cJ)(t.byTabId, [e]) }), (0, s.UF)(t);
            }),
            (0, o.DW)((e) => {
              if (I && !A) {
                if (w !== e) {
                  if (!w)
                    return (
                      (w = e),
                      void C.postMessage({ type: "globalUpdate", global: e })
                    );
                  E ||
                    ((E = !0),
                    (S = w),
                    (0, r.qF)(() => {
                      if (!C) return;
                      const e = h(S, w);
                      "symbol" != typeof e &&
                        C.postMessage({ type: "globalDiffUpdate", diff: e }),
                        (E = !1);
                    })),
                    (w = e);
                }
              } else w = e;
            }),
            C.addEventListener("message", T));
        }
        function T(e) {
          let { data: t } = e;
          if (t && C)
            switch (t.type) {
              case "initApi": {
                const e = (0, s.mS)();
                if (!(0, i.nTw)(e).isMasterTab) return;
                const { initialArgs: n } = t;
                (0, d.Ru)((0, s.ko)().apiUpdate, n);
                break;
              }
              case "globalDiffUpdate": {
                if (!I) return;
                const { diff: e } = t,
                  n = (0, s.mS)(),
                  r = m(n, e);
                (r.DEBUG_capturedId = n.DEBUG_capturedId),
                  (w = r),
                  (0, s.UF)(r);
                break;
              }
              case "globalUpdate": {
                if (I) return;
                const e = (0, s.mS)();
                (t.global.DEBUG_capturedId = e.DEBUG_capturedId),
                  (w = t.global),
                  (0, s.UF)(t.global),
                  v && (v(), (v = void 0), (I = !0));
                break;
              }
              case "requestGlobal": {
                const { appVersion: e } = t;
                if ("10.9.17" !== e) return void window.location.reload();
                if (!I) return;
                const n = (0, s.mS)();
                if (!(0, i.nTw)(n).isMasterTab) return;
                C.postMessage({ type: "globalUpdate", global: n }), (0, g.ZQ)();
                break;
              }
              case "messageCallback": {
                if (!I) return;
                const e = (0, s.mS)();
                if ((0, i.nTw)(e).isMasterTab) return;
                (0, d.PH)(t);
                break;
              }
              case "localDbUpdate": {
                if (!I) return;
                const e = (0, s.mS)();
                if ((0, i.nTw)(e).isMasterTab) return;
                const { batchedUpdates: n } = t;
                n.forEach((e) => {
                  let { name: t, prop: n, value: r } = e;
                  (0, d.fj)(t, n, r);
                });
                break;
              }
              case "localDbUpdateFull": {
                if (!I) return;
                const e = (0, s.mS)();
                if ((0, i.nTw)(e).isMasterTab) return;
                const { localDb: n } = t;
                (0, d.iB)(n);
                break;
              }
              case "messageResponse": {
                if (!I) return;
                const e = (0, s.mS)();
                if ((0, i.nTw)(e).isMasterTab) return;
                (0, d.Hn)(t);
                break;
              }
              case "cancelApiProgress": {
                if (!I) return;
                const e = (0, s.mS)();
                if (!(0, i.nTw)(e).isMasterTab) return;
                const { messageId: n } = t;
                (0, d.Ar)(n);
                break;
              }
              case "callApi": {
                if (!I) return;
                const e = (0, s.mS)();
                if (!(0, i.nTw)(e).isMasterTab) return;
                const {
                    name: n,
                    messageId: r,
                    token: o,
                    args: a,
                    withCallback: c,
                  } = t,
                  u = c
                    ? [
                        ...a,
                        function () {
                          for (
                            var e = arguments.length, t = new Array(e), n = 0;
                            n < e;
                            n++
                          )
                            t[n] = arguments[n];
                          C.postMessage({
                            type: "messageCallback",
                            token: o,
                            messageId: r,
                            callbackArgs: t,
                          });
                        },
                      ]
                    : a;
                (async () => {
                  const e = await (0, d.eZ)(n, ...u);
                  C.postMessage({
                    type: "messageResponse",
                    token: o,
                    messageId: r,
                    response: e,
                  });
                })();
                break;
              }
              case "langpackRefresh":
                (0, s.ko)().refreshLangPackFromCache({ langCode: t.langCode });
            }
        }
        function P(e) {
          C && C.postMessage({ type: "requestGlobal", appVersion: e });
          const t = () => {
            v && (v(), (v = void 0)), (I = !0);
          };
          return localStorage.getItem(a.yhD)
            ? (setTimeout(t, b),
              new Promise((e) => {
                v = e;
              }))
            : (t(), Promise.resolve());
        }
        function M(e) {
          C && C.postMessage({ type: "langpackRefresh", langCode: e });
        }
      },
      97312: (e, t, n) => {
        n.d(t, {
          Ac: () => B,
          B1: () => x,
          BA: () => E,
          DJ: () => R,
          Kz: () => U,
          M2: () => w,
          Mi: () => _,
          Oq: () => D,
          al: () => M,
          wC: () => k,
          xe: () => T,
        });
        var r = n(13439),
          o = n(23174),
          s = n(31481),
          a = n(90709),
          i = n(3544),
          d = n(26129),
          c = n(2909),
          u = n(29807),
          l = n(4875),
          f = n(59776),
          h = n(87894),
          m = n(58554),
          p = n(47985),
          g = n(37836),
          y = n(82393);
        function b(e) {
          const t = e.toJSON();
          return JSON.stringify({ endpoint: t.endpoint, keys: t.keys });
        }
        function v() {
          return !(
            !y.Tz ||
            y.cp ||
            ("showNotification" in ServiceWorkerRegistration.prototype
              ? "denied" === Notification.permission
                ? (s.Oig &&
                    console.warn(
                      "[PUSH] The user has blocked push notifications."
                    ),
                  1)
                : !("PushManager" in window) &&
                  (s.Oig &&
                    console.warn("[PUSH] Push messaging isn't supported."),
                  1)
              : (s.Oig &&
                  console.warn("[PUSH] Push notifications aren't supported."),
                1))
          );
        }
        function w() {
          return "Notification" in window
            ? "denied" !== Notification.permission ||
                (s.Oig &&
                  console.warn(
                    "[PUSH] The user has blocked push notifications."
                  ),
                !1)
            : (s.Oig &&
                console.warn(
                  "[PUSH] This browser does not support desktop notification"
                ),
              !1);
        }
        const I = 432e5,
          A = 3e3,
          C = new Set(),
          S = new Audio("./notification.mp3");
        async function E(e, t) {
          if (void 0 !== e && C.has(e)) return;
          const { notificationSoundVolume: n } = (0, u.$5S)((0, r.mS)()),
            o = t ? t / 10 : n / 10;
          if (0 !== o) {
            (S.volume = o),
              void 0 !== e &&
                (S.addEventListener(
                  "ended",
                  () => {
                    C.add(e);
                  },
                  { once: !0 }
                ),
                setTimeout(() => {
                  C.delete(e);
                }, A));
            try {
              await S.play();
            } catch (e) {
              s.Oig && console.warn("[PUSH] Unable to play notification sound");
            }
          }
        }
        S.setAttribute("mozaudiochannel", "notification");
        const k = (0, g.sg)(E, 1e3, !0, !1);
        async function T() {
          if (!("Notification" in window)) return !1;
          let e = Notification.permission;
          return (
            ["granted", "denied"].includes(e) ||
              (e = await Notification.requestPermission()),
            "granted" === e
          );
        }
        async function P(e) {
          const t = (0, r.mS)(),
            { deleteDeviceToken: n } = (0, r.ko)();
          if (e)
            try {
              const t = b(e);
              return (
                await (0, l.px)("unregisterDevice", t),
                await e.unsubscribe(),
                void n()
              );
            } catch (e) {
              s.Oig &&
                console.log("[PUSH] Unable to unsubscribe from push.", e);
            }
          t.push &&
            (await (0, l.px)("unregisterDevice", t.push.deviceToken), n());
        }
        async function M() {
          if (!v()) return;
          const e = await navigator.serviceWorker.ready,
            t = await e.pushManager.getSubscription();
          await P(t);
        }
        let L = !1;
        async function N() {
          if (L) return (0, u.$5S)((0, r.mS)());
          const [e, t] = await Promise.all([
            (0, l.px)("fetchNotificationSettings"),
            (0, l.px)("fetchNotificationExceptions"),
          ]);
          if (!e) return (0, u.$5S)((0, r.mS)());
          let n = (0, c.qp)((0, r.mS)(), e);
          return (
            t && (n = (0, c.De)(n, t)), (0, r.UF)(n), (L = !0), (0, u.$5S)(n)
          );
        }
        let F = !1;
        function B() {
          return F;
        }
        async function x() {
          const { setDeviceToken: e, updateWebNotificationSettings: t } = (0,
          r.ko)();
          let n = !1,
            o = !1;
          if (!v())
            return (
              (n = await T()),
              void t({ hasWebNotifications: n, hasPushNotifications: o })
            );
          const a = await navigator.serviceWorker.ready;
          let i = await a.pushManager.getSubscription();
          if (
            (function (e) {
              const t = (0, r.mS)();
              return (
                !t.push ||
                !e ||
                b(e) !== t.push.deviceToken ||
                Date.now() - t.push.subscribedAt > I
              );
            })(i)
          ) {
            await P(i);
            try {
              i = await a.pushManager.subscribe({ userVisibleOnly: !0 });
              const t = b(i);
              s.Oig && console.log("[PUSH] Received push subscription: ", t),
                await (0, l.px)("registerDevice", t),
                e(t),
                (o = !0),
                (n = !0);
            } catch (e) {
              "denied" === Notification.permission
                ? s.Oig &&
                  console.warn(
                    "[PUSH] The user has blocked push notifications."
                  )
                : (s.Oig &&
                    console.log("[PUSH] Unable to subscribe to push.", e),
                  [
                    DOMException.ABORT_ERR,
                    DOMException.NOT_SUPPORTED_ERR,
                  ].includes(e.code) && ((F = !0), (n = await T())));
            }
            t({ hasWebNotifications: n, hasPushNotifications: o });
          }
        }
        async function O(e) {
          const t = (0, a.cP)(e);
          if (!t) return;
          let n = m.Ih(t);
          return n || (await m.hd(t, o.qZ.BlobUrl), (n = m.Ih(t))), n;
        }
        async function R(e) {
          let { call: t, user: n } = e;
          const { hasWebNotifications: r } = await N();
          if (document.hasFocus() || !r) return;
          if (!w()) return;
          const o = await O(n),
            s = { body: (0, a.Yg)(n), icon: o, badge: o, tag: `call_${t.id}` };
          "vibrate" in navigator && (s.vibrate = [200, 100, 200]);
          const i = new Notification((0, p.yE)("VoipIncoming"), s);
          i.onclick = () => {
            i.close(), window.focus && window.focus();
          };
        }
        async function D(e) {
          let { chat: t, message: n, isReaction: o = !1 } = e;
          const { hasWebNotifications: c } = await N();
          if (
            !(function (e, t) {
              if (!L) return !1;
              const n = (0, r.mS)();
              if (
                ((0, a.W1)(e, (0, u.$5S)(n), (0, u.GrP)(n)) &&
                  !t.isMentioned) ||
                e.isNotJoined ||
                !e.isListed
              )
                return !1;
              if (y.TF) {
                const { chatId: t, type: r } = (0, u.Xf0)(n) || {};
                return !(t === e.id && "thread" === r);
              }
              return !document.hasFocus();
            })(t, n)
          )
            return;
          const m = w();
          if (!c || !m)
            return void (n.isSilent || o || y.cp || k(String(n.id) || t.id));
          if (!m) return;
          if (!n.id) return;
          const g = (0, a.cU)(n);
          if (o && !g) return;
          o &&
            g &&
            "documentId" in g.reaction &&
            (await (async function (e) {
              let t = (0, r.mS)();
              if (t.customEmojis.byId[e]) return;
              const n = await (0, l.px)("fetchCustomEmoji", {
                documentId: [e],
              });
              n &&
                ((t = (0, r.mS)()),
                (t = {
                  ...t,
                  customEmojis: {
                    ...t.customEmojis,
                    byId: { ...t.customEmojis.byId, ...(0, h.dU)(n, "id") },
                  },
                }),
                (0, r.UF)(t));
            })(g.reaction.documentId));
          const b = await O(t),
            { title: I, body: A } = (function (e, t, n) {
              const o = (0, r.mS)();
              let { senderId: c } = t;
              const l = Boolean(n);
              l && (c = n.peerId);
              const { isScreenLocked: h } = o.passcode,
                m = c ? (0, u.hds)(o, c) : void 0,
                g = c ? (0, u.mBe)(o, c) : void 0,
                y = (0, a.mK)(t),
                b = (0, d.Q)(t),
                v =
                  y && b?.replyToMsgId
                    ? (0, u.O5q)(
                        o,
                        b?.replyFrom?.fromChatId || e.id,
                        b.replyToMsgId
                      )
                    : void 0,
                { targetUserIds: w, targetChatId: I } = y || {},
                A = w ? w.map((e) => (0, u.mBe)(o, e)).filter(Boolean) : void 0,
                C = (0, a.e7)(e) === o.currentUserId,
                S = (0, u.nkm)(o, t);
              let E;
              if (!h && (0, a.St)(e, (0, u.$5S)(o), (0, u.GrP)(o))) {
                const o = e && ((0, a.WX)(e) || t.senderId === t.chatId);
                if ((0, a._P)(t))
                  E = (0, f.V)(
                    p.yE,
                    t,
                    o ? void 0 : g,
                    o ? e : void 0,
                    A,
                    v,
                    I,
                    S,
                    { asPlainText: !0 }
                  );
                else {
                  const s = (0, a.Q5)(p.yE, e.id, o ? m : g);
                  let d = (0, i.dS)(p.yE, t, l, 60);
                  if (l) {
                    const e = (function (e) {
                      let t;
                      return (
                        "emoticon" in e.reaction && (t = e.reaction.emoticon),
                        "documentId" in e.reaction &&
                          (t = (0, r.mS)().customEmojis.byId[
                            e.reaction.documentId
                          ]?.emoji),
                        t || "❤️"
                      );
                    })(n);
                    d = (0, p.yE)("PushReactText", [e, d]);
                  }
                  E = s ? `${s}: ${d}` : d;
                }
              } else E = "New message";
              let k = h ? s.C39 : (0, a.Js)(p.yE, e, C);
              return t.isSilent && (k += " 🔕"), { title: k, body: E };
            })(t, n, g);
          if (v())
            navigator.serviceWorker?.controller &&
              navigator.serviceWorker.controller.postMessage({
                type: "showMessageNotification",
                payload: {
                  title: I,
                  body: A,
                  icon: b,
                  chatId: t.id,
                  messageId: n.id,
                  shouldReplaceHistory: !0,
                  isSilent: n.isSilent,
                  reaction: g?.reaction,
                },
              });
          else {
            const e = (0, r.ko)(),
              s = { body: A, icon: b, badge: b, tag: String(n.id) };
            "vibrate" in navigator && (s.vibrate = [200, 100, 200]);
            const a = new Notification(I, s);
            (a.onclick = () => {
              a.close(),
                e.focusMessage({
                  chatId: t.id,
                  messageId: n.id,
                  shouldReplaceHistory: !0,
                }),
                window.focus && window.focus();
            }),
              (a.onshow = () => {
                o || n.isSilent || y.cp || k(String(n.id) || t.id);
              });
          }
        }
        function U(e) {
          !s.W75 &&
            navigator.serviceWorker?.controller &&
            navigator.serviceWorker.controller.postMessage({
              type: "closeMessageNotifications",
              payload: e,
            });
        }
        function _() {
          navigator.serviceWorker?.controller &&
            navigator.serviceWorker.controller.postMessage({
              type: "clientReady",
            });
        }
      },
      47985: (e, t, n) => {
        n.d(t, {
          DW: () => y,
          Yw: () => E,
          EV: () => k,
          wT: () => T,
          yE: () => S,
          bV: () => P,
        });
        var r = n(13439),
          o = n(31481),
          s = n(4875),
          a = n(74824),
          i = n(46536);
        const d = {
          WrongNumber: "Wrong number?",
          SentAppCode:
            "We've sent the code to the **Telegram** app on your other device.",
          "Login.JustSentSms":
            "We have sent you a code via SMS. Please enter it above.",
          "Login.Header.Password": "Enter Password",
          "Login.EnterPasswordDescription":
            "You have Two-Step Verification enabled, so your account is protected with an additional password.",
          StartText:
            "Please confirm your country code and enter your phone number.",
          "Login.PhonePlaceholder": "Your phone number",
          "Login.Next": "Next",
          "Login.QR.Login": "Log in by QR Code",
          "Login.QR.Title": "Log in to Telegram by QR Code",
          "Login.QR.Help1": "Open Telegram on your phone",
          "Login.QR.Help2":
            "Go to **Settings** > **Devices** > **Link Desktop Device**",
          "Login.QR2.Help2":
            "Go to **Settings** → **Devices** → **Link Desktop Device**",
          "Login.QR.Help3": "Point your phone at this screen to confirm login",
          "Login.QR.Cancel": "Log in by phone Number",
          YourName: "Your Name",
          "Login.Register.Desc": "Enter your name and add a profile picture.",
          "Login.Register.FirstName.Placeholder": "First Name",
          "Login.Register.LastName.Placeholder": "Last Name",
          "Login.SelectCountry.Title": "Country",
          lng_country_none: "Country not found",
          PleaseEnterPassword: "Enter your new password",
          PHONE_NUMBER_INVALID: "Invalid phone number",
          PHONE_CODE_INVALID: "Invalid code",
          PASSWORD_HASH_INVALID: "Incorrect password",
          PHONE_PASSWORD_FLOOD: "Limit exceeded. Please try again later.",
          PHONE_NUMBER_BANNED: "This phone number is banned.",
        };
        var c = n(13376),
          u = n(14242);
        const l = /%\d?\$?[sdf@]/g,
          f = [
            "value",
            "zeroValue",
            "oneValue",
            "twoValue",
            "fewValue",
            "manyValue",
            "otherValue",
          ],
          h = {
            en: (e) => (1 !== e ? 6 : 2),
            ar: (e) =>
              0 === e
                ? 1
                : 1 === e
                ? 2
                : 2 === e
                ? 3
                : e % 100 >= 3 && e % 100 <= 10
                ? 4
                : e % 100 >= 11
                ? 5
                : 6,
            be: (e) => {
              const t = String(e).split("."),
                n = Number(t[0]) === e,
                r = n ? Number(t[0].slice(-1)) : 0,
                o = n ? Number(t[0].slice(-2)) : 0;
              return 1 === r && 11 !== o
                ? 2
                : r >= 2 && r <= 4 && (o < 12 || o > 14)
                ? 4
                : (n && 0 === r) || (r >= 5 && r <= 9) || (o >= 11 && o <= 14)
                ? 5
                : 6;
            },
            ca: (e) => (1 !== e ? 6 : 2),
            cs: (e) => {
              const t = String(e).split("."),
                n = Number(t[0]),
                r = !t[1];
              return 1 === e && r ? 2 : n >= 2 && n <= 4 && r ? 4 : r ? 6 : 5;
            },
            de: (e) => (1 !== e ? 6 : 2),
            es: (e) => (1 !== e ? 6 : 2),
            fa: (e) => (e > 1 ? 6 : 2),
            fi: (e) => (1 !== e ? 6 : 2),
            fr: (e) => (e > 1 ? 6 : 2),
            id: () => 0,
            it: (e) => (1 !== e ? 6 : 2),
            hr: (e) => {
              const t = String(e).split("."),
                n = t[0],
                r = t[1] || "",
                o = !t[1],
                s = Number(n.slice(-1)),
                a = Number(n.slice(-2)),
                i = Number(r.slice(-1)),
                d = Number(r.slice(-2));
              return (o && 1 === s && 11 !== a) || (1 === i && 11 !== d)
                ? 2
                : (o && s >= 2 && s <= 4 && (a < 12 || a > 14)) ||
                  (i >= 2 && i <= 4 && (d < 12 || d > 14))
                ? 4
                : 6;
            },
            hu: (e) => (e > 1 ? 6 : 2),
            ko: () => 0,
            ms: () => 0,
            nb: (e) => (e > 1 ? 6 : 2),
            nl: (e) => (1 !== e ? 6 : 2),
            pl: (e) =>
              1 === e
                ? 2
                : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20)
                ? 4
                : 5,
            "pt-br": (e) => (e > 1 ? 6 : 2),
            ru: (e) =>
              e % 10 == 1 && e % 100 != 11
                ? 2
                : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20)
                ? 4
                : 5,
            sk: (e) => {
              const t = String(e).split("."),
                n = Number(t[0]),
                r = !t[1];
              return 1 === e && r ? 2 : n >= 2 && n <= 4 && r ? 4 : r ? 6 : 5;
            },
            sr: (e) => {
              const t = String(e).split("."),
                n = t[0],
                r = t[1] || "",
                o = !t[1],
                s = Number(n.slice(-1)),
                a = Number(n.slice(-2)),
                i = Number(r.slice(-1)),
                d = Number(r.slice(-2));
              return (o && 1 === s && 11 !== a) || (1 === i && 11 !== d)
                ? 2
                : (o && s >= 2 && s <= 4 && (a < 12 || a > 14)) ||
                  (i >= 2 && i <= 4 && (d < 12 || d > 14))
                ? 4
                : 6;
            },
            tr: (e) => (e > 1 ? 6 : 2),
            uk: (e) =>
              e % 10 == 1 && e % 100 != 11
                ? 2
                : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20)
                ? 4
                : 5,
            uz: (e) => (e > 1 ? 6 : 2),
          },
          m = new Map();
        let p, g;
        const {
          addCallback: y,
          removeCallback: b,
          runCallbacks: v,
        } = (0, i.h)();
        let w, I;
        function A() {
          return (e, t, n, r) => {
            if (void 0 !== t) {
              const o = Array.isArray(t) ? JSON.stringify(t) : t,
                s = m.get(`${e}_${o}_${n}${r ? `_${r}` : ""}`);
              if (s) return s;
            }
            g || M();
            const o = p?.[e] || g?.[e] || d[e];
            return o ? L(o, e, t, n, r) : e;
          };
        }
        let C = A();
        function S() {
          return C(...arguments);
        }
        function E() {
          return C;
        }
        async function k(e, t) {
          let n;
          const r = await a.fetch(o.CV, `${o.$d8}_${e}_${t}`, a.Type.Json);
          return (
            (n = r
              ? r.value
              : await (async function (e, t, n) {
                  const r = await (0, s.px)("oldFetchLangStrings", {
                    langPack: e,
                    langCode: t,
                    keys: [n],
                  });
                  if (r?.length) {
                    const s = JSON.stringify({ value: r[0] });
                    return await a.save(o.CV, `${e}_${t}_${n}`, s), r[0];
                  }
                })(o.$d8, e, t)),
            L(n, t)
          );
        }
        async function T(e, t) {
          let n =
            arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
          if (((0, c.qY)(e, !0), p && e === w)) return void (t && t());
          let i = await a.fetch(o.CV, e, a.Type.Json);
          if (
            !i &&
            (n && (await M()),
            (i = await (async function (e) {
              const t = await (0, s.px)("oldFetchLangPack", {
                sourceLangPacks: o.Ka6,
                langCode: e,
              });
              if (t) return await a.save(o.CV, e, t.langPack), t.langPack;
            })(e)),
            !i)
          )
            return;
          m.clear(), (w = e), (p = i), (document.documentElement.lang = e);
          const { languages: d, timeFormat: u } = (0, r.mS)().settings.byKey,
            l = d?.find((t) => t.langCode === e);
          (C = A()),
            (C.isRtl = Boolean(l?.isRtl)),
            (C.code = e.replace("-raw", "")),
            (C.langName = l?.nativeName),
            (C.timeFormat = u),
            t && t(),
            v();
        }
        function P(e) {
          (e && e === I) || ((I = e), (C.timeFormat = e), v());
        }
        async function M() {
          g || ((g = (await n.e(5193).then(n.bind(n, 65193))).default), v());
        }
        function L(e, t, n, r, s) {
          const a =
              "number" == typeof n || void 0 !== s
                ? (function (e) {
                    const t = w || o.vjm,
                      n = h[t] ? h[t](e) : 0;
                    return f[n];
                  })(s ?? n)
                : "value",
            i =
              "string" == typeof e
                ? e
                : "value" === a
                ? "object" == typeof e
                  ? e.value
                  : e
                : "object" == typeof e
                ? e[a] || e.otherValue
                : void 0;
          if (!i?.trim()) {
            const e = t.split(".");
            return e[e.length - 1];
          }
          if (void 0 !== n) {
            const e = (function (e, t) {
                t = Array.isArray(t) ? t : [t];
                const n = e.split(l),
                  r = n.shift();
                return n.reduce(
                  (e, n, r) => `${e}${String(t[r] ?? "")}${n}`,
                  r || ""
                );
              })(i, "i" === r ? (0, u.Sm)(n) : n),
              o = Array.isArray(n) ? JSON.stringify(n) : n;
            return m.set(`${t}_${o}_${r}${s ? `_${s}` : ""}`, e), e;
          }
          return i;
        }
      },
      70934: (e, t, n) => {
        n.d(t, {
          IG: () => f,
          Mv: () => c,
          UQ: () => p,
          WN: () => y,
          dl: () => u,
          m: () => g,
          tn: () => l,
          ug: () => m,
          yp: () => h,
        });
        var r = n(31481),
          o = n(70758),
          s = n(74824);
        const a = 12,
          i = "harder better faster stronger";
        let d;
        class c extends Error {}
        function u() {
          return d;
        }
        function l(e) {
          d = e;
        }
        async function f(e) {
          d = await b(e);
        }
        async function h(e, t) {
          if (!d)
            throw (
              (console.error("[api/passcode] Missing current passcode"),
              new Error("[api/passcode] Missing current passcode"))
            );
          await Promise.all([
            (async () => {
              if (!e) return;
              const t = await I(e, d);
              await v("sessionEncrypted", t);
            })(),
            (async () => {
              if (!t) return;
              const e = await I(t, d);
              await v("globalEncrypted", e);
            })(),
          ]);
        }
        async function m() {
          if (!d)
            throw (
              (console.error("[api/passcode] Missing current passcode"),
              new Error("[api/passcode] Missing current passcode"))
            );
          const [e, t] = await Promise.all([
            w("sessionEncrypted"),
            w("globalEncrypted"),
          ]);
          if (!e || !t)
            throw (
              (console.error("[api/passcode] Missing required stored fields"),
              new Error("[api/passcode] Missing required stored fields"))
            );
          try {
            const [n, r] = await Promise.all([A(e, d), A(t, d)]);
            return { sessionJson: n, globalJson: r };
          } catch (e) {
            throw (
              (console.error("[api/passcode] Error decrypting session", e), e)
            );
          }
        }
        async function p(e) {
          const t = await b(e),
            [n, r] = await Promise.all([
              w("sessionEncrypted"),
              w("globalEncrypted"),
            ]);
          if (!n || !r)
            throw (
              (console.error("[api/passcode] Missing required stored fields"),
              new c("[api/passcode] Missing required stored fields"))
            );
          try {
            const [e, o] = await Promise.all([A(n, t), A(r, t)]);
            return (d = t), { sessionJson: e, globalJson: o };
          } catch (e) {
            throw (
              (console.error("[api/passcode] Error decrypting session", e), e)
            );
          }
        }
        function g() {
          d = void 0;
        }
        function y() {
          return g(), o.B.clear(), s.clear(r.oBq);
        }
        function b(e) {
          return crypto.subtle.digest(
            "SHA-256",
            new TextEncoder().encode(`${e}${i}`)
          );
        }
        function v(e, t) {
          const n = Array.from(new Uint8Array(t));
          o.B.set(e, n);
        }
        async function w(e) {
          const t = await o.B.get(e);
          return t
            ? new Uint8Array(t).buffer
            : s.fetch(r.oBq, e, s.Type.ArrayBuffer);
        }
        async function I(e, t) {
          const n = crypto.getRandomValues(new Uint8Array(a)),
            r = { name: "AES-GCM", iv: n },
            o = await crypto.subtle.importKey("raw", t, r, !1, ["encrypt"]),
            s = new TextEncoder().encode(e),
            i = await crypto.subtle.encrypt(r, o, s),
            d = new Uint8Array(i),
            c = new Uint8Array(a + d.length);
          return c.set(n, 0), c.set(d, a), c.buffer;
        }
        async function A(e, t) {
          const n = new Uint8Array(e),
            r = { name: "AES-GCM", iv: n.slice(0, a) },
            o = await crypto.subtle.importKey("raw", t, r, !1, ["decrypt"]),
            s = n.slice(a),
            i = await crypto.subtle.decrypt(r, o, s);
          return new TextDecoder().decode(i);
        }
      },
      80853: (e, t, n) => {
        function r(e) {
          e.dataset.patchedForSafari ||
            (e.addEventListener(
              "play",
              () => {
                const t = e.currentTime;
                (e.dataset.patchForSafariInProgress = "true"),
                  e.addEventListener("progress", function n() {
                    e.buffered.length &&
                      ((e.currentTime = e.duration - 1),
                      e.addEventListener(
                        "progress",
                        () => {
                          delete e.dataset.patchForSafariInProgress,
                            (e.currentTime = t),
                            e.paused &&
                              !e.dataset.preventPlayAfterPatch &&
                              e.play();
                        },
                        { once: !0 }
                      ),
                      e.removeEventListener("progress", n));
                  });
              },
              { once: !0 }
            ),
            (e.dataset.patchedForSafari = "true"));
        }
        function o(e) {
          return Boolean(e.dataset.patchForSafariInProgress);
        }
        n.d(t, { C: () => r, f: () => o });
      },
      21687: (e, t, n) => {
        function r(e) {
          const {
              pageTransitions: t,
              messageSendingAnimations: n,
              mediaViewerAnimations: r,
              messageComposerAnimations: o,
              contextMenuAnimations: s,
              contextMenuBlur: a,
              rightColumnAnimations: i,
            } = e,
            d = document.body;
          d.classList.toggle("no-page-transitions", !t),
            d.classList.toggle("no-message-sending-animations", !n),
            d.classList.toggle("no-media-viewer-animations", !r),
            d.classList.toggle("no-message-composer-animations", !o),
            d.classList.toggle("no-context-menu-animations", !s),
            d.classList.toggle("no-menu-blur", !a),
            d.classList.toggle("no-right-column-animations", !i);
        }
        n.d(t, { u: () => r });
      },
      19800: (e, t, n) => {
        n.d(t, { Bt: () => u, Tq: () => l });
        var r = n(13439),
          o = n(31481),
          s = n(84553);
        const a = /(^|\.)(google|bing|duckduckgo|ya|yandex)\./i,
          i = "kz_version",
          d = "Z";
        function c(e) {
          localStorage.setItem(i, JSON.stringify(e));
        }
        function u(e) {
          c(e),
            (0, s.VH)(),
            (0, r.ko)().skipLockOnUnload(),
            window.location.assign(`${o.qJR}${e.toLowerCase()}`);
        }
        function l() {
          if (window.location.hostname !== o.mFn) return;
          const e = document.referrer.toLowerCase();
          if (e)
            try {
              if (!new URL(e).host.match(a)) return;
              const t = (function () {
                const e = localStorage.getItem(i);
                if (e) return JSON.parse(e);
              })();
              if (t) return void (t !== d && u(t));
              const n =
                  void 0 !==
                  (new URLSearchParams(window.location.search).get("test") ??
                    void 0),
                r = Math.random() < 0.5;
              if (n || !r) return void c("Z");
              u("K");
            } catch (e) {}
        }
      },
      64713: (e, t, n) => {
        n.d(t, { Nl: () => s, Ox: () => d, n4: () => i, oL: () => a });
        const r = "X",
          o = "XXX XXX XXX XXX";
        function s(e, t) {
          return e.filter((e) => e.iso2 === t);
        }
        function a(e) {
          let t = (
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ""
          ).replace(/[^\d+]+/g, "");
          t.startsWith("+") && (t = t.substr(1));
          const n = e
            .filter((e) => t.startsWith(e.countryCode))
            .map((e) =>
              (e.prefixes || [""]).map((t) => ({
                code: `${e.countryCode}${t}`,
                country: e,
              }))
            )
            .flat()
            .filter((e) => {
              let { code: n } = e;
              return t.startsWith(n);
            })
            .sort((e, t) => e.code.length - t.code.length);
          return n[n.length - 1]?.country;
        }
        function i(e, t) {
          if (!e) return "";
          let n = e.replace(/[^\d]+/g, "");
          if (t) n = n.substr(t.countryCode.length);
          else if (e.startsWith("+")) return e;
          const s = (function (e, t) {
              if (!t || 0 === t.length) return o;
              if (1 === t.length) return t[0];
              const n = t.find((e) => e.startsWith(r)) || o,
                s = t.filter((t) => {
                  const n = t.replace(/[^\dX]+/g, "");
                  if (n.startsWith(r)) return !1;
                  for (let t = 0; t < e.length; t++)
                    if (t > n.length - 1 || (n[t] !== r && n[t] !== e[t]))
                      return !1;
                  return !0;
                });
              return 1 === s.length ? s[0] : n;
            })(n, t?.patterns),
            a = [];
          let i = 0;
          for (let e = 0; e < n.length; e++) {
            for (
              ;
              s[i] !== r &&
              i < s.length &&
              (a.push(s[i]), s[i] !== n[e] || (e++, e !== n.length));

            )
              i++;
            a.push(n[e]), i++;
          }
          return a.join("");
        }
        function d(e, t) {
          if (!t) return "";
          const n = t.startsWith("+") ? t : `+${t}`,
            r = a(e, n);
          return r ? `+${r.countryCode} ${i(n, r)}` : n;
        }
      },
      84947: (e, t, n) => {
        function r(e, t, n) {
          var r;
          return (
            (t =
              "symbol" ==
              typeof (r = (function (e, t) {
                if ("object" != typeof e || !e) return e;
                var n = e[Symbol.toPrimitive];
                if (void 0 !== n) {
                  var r = n.call(e, "string");
                  if ("object" != typeof r) return r;
                  throw new TypeError(
                    "@@toPrimitive must return a primitive value."
                  );
                }
                return String(e);
              })(t))
                ? r
                : r + "") in e
              ? Object.defineProperty(e, t, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = n),
            e
          );
        }
        n.d(t, { A: () => o });
        class o {
          constructor(e) {
            (this.limit = e),
              r(this, "map", void 0),
              r(this, "insertionQueue", void 0),
              (this.map = new Map()),
              (this.insertionQueue = new Set());
          }
          get(e) {
            return this.map.get(e);
          }
          set(e, t) {
            if (this.map.size === this.limit) {
              const e = Array.from(this.insertionQueue).shift();
              e && (this.map.delete(e), this.insertionQueue.delete(e));
            }
            return this.map.set(e, t), this.insertionQueue.add(e), this;
          }
          has(e) {
            return this.map.has(e);
          }
          delete(e) {
            const t = this.map.delete(e);
            return t && this.insertionQueue.delete(e), t;
          }
          clear() {
            this.map.clear(), this.insertionQueue.clear();
          }
          forEach(e, t) {
            this.map.forEach(e, t);
          }
          get size() {
            return this.map.size;
          }
          get [Symbol.toStringTag]() {
            return this.map[Symbol.toStringTag];
          }
          [Symbol.iterator]() {
            return this.map[Symbol.iterator]();
          }
          entries() {
            return this.map.entries();
          }
          keys() {
            return this.map.keys();
          }
          values() {
            return this.map.values();
          }
        }
      },
      98607: (e, t, n) => {
        function r(e, t, n) {
          const r = e.split(t),
            [o, ...s] = r;
          return s.reduce((e, t) => e.concat(n, t), [o]).filter(Boolean);
        }
        function o(e, t, n) {
          return e.flatMap((e) => ("string" == typeof e ? r(e, t, n) : e), []);
        }
        n.d(t, { i: () => r, t: () => o });
      },
      33204: (e, t, n) => {
        n.d(t, { A: () => s });
        var r = n(13439);
        const o = new Map();
        function s(e, t) {
          const n = e.action;
          clearTimeout(o.get(n));
          const s = window.setTimeout(() => {
            (0, r.ko)()[n](e.payload);
          }, t);
          o.set(n, s);
        }
      },
      66414: (e, t, n) => {
        n.d(t, {
          az: () => l,
          dk: () => h,
          f4: () => m,
          fY: () => p,
          lD: () => c,
          vO: () => u,
          xV: () => f,
        });
        var r = n(23174),
          o = n(31481);
        let s,
          a,
          i = !1,
          d = window.location.hash;
        function c() {
          (i = !1), (a = void 0), (s = void 0), (d = "");
        }
        function u() {
          window.location.hash = "";
        }
        const l = (e, t, n) => {
          const o = "thread" === t ? void 0 : t;
          return (n === r.l3 ? [e, o] : [e, n, o]).filter(Boolean).join("_");
        };
        function f(e) {
          if ((m(), !a)) return;
          const t = a.split("_");
          let n, o, s;
          if (1 === t.length) n = t[0];
          else if (2 === t.length) {
            const e = ["thread", "pinned", "scheduled"].includes(t[1]);
            (n = t[0]), (o = e ? t[1] : "thread"), (s = e ? void 0 : t[1]);
          } else t.length >= 3 && ([n, s, o] = t);
          if (!n?.match(/^-?\d+$/)) return;
          const i = ["thread", "pinned", "scheduled"].includes(o);
          return {
            chatId: n,
            type: o && i ? o : "thread",
            threadId: (n === e ? s : Number(s)) || r.l3,
          };
        }
        const h = (e, t, n) => {
          const r = new URL(window.location.href);
          return (r.hash = l(e, t, n)), r.href;
        };
        function m() {
          if (s) return s;
          if (i) return;
          if (!d) return;
          let e = d.replace(/^#/, "");
          return (
            e.includes("?")
              ? (([a, e] = e.split("?")), o.fng || (window.location.hash = a))
              : e.includes("=") && (o.fng || (window.location.hash = "")),
            (s = e.includes("=")
              ? e.split("&").reduce((e, t) => {
                  const [n, r] = t.split("=");
                  return (e[n] = r), e;
                }, {})
              : void 0),
            (i = !0),
            s || (a = e),
            s
          );
        }
        function p() {
          s && delete s.tgWebAuthToken;
        }
      },
      50110: (e, t, n) => {
        n.d(t, { A: () => a });
        var r = n(31481),
          o = n(2188);
        const s = !r.MVx;
        function a(e, t, n) {
          if (!s) return e();
          try {
            return e();
          } catch (e) {
            return t?.(e), void (0, o.H)(e);
          } finally {
            n?.();
          }
        }
      },
      41733: (e, t, n) => {
        n.d(t, { A: () => s, e: () => o });
        var r = n(31481);
        const o = (e) =>
            e.currentTime > 0 && !e.paused && !e.ended && e.readyState > 2,
          s = (e) => {
            e.play().catch((t) => {
              r.Oig && console.warn(t, e);
            });
          };
      },
      37836: (e, t, n) => {
        function r(e, t) {
          let n,
            r =
              !(arguments.length > 2 && void 0 !== arguments[2]) ||
              arguments[2],
            o =
              !(arguments.length > 3 && void 0 !== arguments[3]) ||
              arguments[3];
          return function () {
            for (var s = arguments.length, a = new Array(s), i = 0; i < s; i++)
              a[i] = arguments[i];
            n ? (clearTimeout(n), (n = void 0)) : r && e(...a),
              (n = self.setTimeout(() => {
                o && e(...a), (n = void 0);
              }, t));
          };
        }
        function o(e, t) {
          let n,
            r,
            o,
            s =
              !(arguments.length > 2 && void 0 !== arguments[2]) ||
              arguments[2];
          return function () {
            r = !0;
            for (var a = arguments.length, i = new Array(a), d = 0; d < a; d++)
              i[d] = arguments[d];
            (o = i),
              n ||
                (s && ((r = !1), e(...o)),
                (n = self.setInterval(() => {
                  if (!r) return self.clearInterval(n), void (n = void 0);
                  (r = !1), e(...o);
                }, t)));
          };
        }
        function s(e) {
          return a(p, e);
        }
        function a(e, t) {
          let n,
            r = !1;
          return function () {
            for (var o = arguments.length, s = new Array(o), a = 0; a < o; a++)
              s[a] = arguments[a];
            (n = s),
              r ||
                ((r = !0),
                e(() => {
                  (r = !1), t(...n);
                }));
          };
        }
        n.d(t, {
          Fe: () => s,
          IJ: () => m,
          P_: () => d,
          aj: () => p,
          kI: () => v,
          nF: () => o,
          nb: () => a,
          sg: () => r,
          v7: () => i,
          yu: () => w,
        });
        const i = (e) =>
          new Promise((t) => {
            setTimeout(() => t(), e);
          });
        function d() {
          return new Promise((e) => {
            m(e);
          });
        }
        const c = 35;
        let u, l, f, h;
        function m(e) {
          let t =
            arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          u
            ? u.add(e)
            : ((u = new Set([e])),
              requestAnimationFrame(() => {
                const e = u;
                (u = void 0),
                  (l = void 0),
                  f && (clearTimeout(f), (f = void 0)),
                  e.forEach((e) => e());
              })),
            t &&
              (l ? l.add(e) : (l = new Set([e])),
              f ||
                (f = window.setTimeout(() => {
                  const e = l;
                  u && e.forEach(u.delete, u),
                    (l = void 0),
                    f && (clearTimeout(f), (f = void 0)),
                    e.forEach((e) => e());
                }, c)));
        }
        function p(e) {
          h
            ? h.push(e)
            : ((h = [e]),
              Promise.resolve().then(() => {
                const e = h;
                (h = void 0), e.forEach((e) => e());
              }));
        }
        const g = 500;
        let y, b;
        function v(e) {
          self.requestIdleCallback
            ? y
              ? y.push(e)
              : ((y = [e]),
                requestIdleCallback(
                  (e) => {
                    const t = y;
                    for (
                      y = void 0;
                      t.length && (t.shift()(), e.timeRemaining());

                    );
                    t.length && (y ? (y = t.concat(y)) : t.forEach(v));
                  },
                  { timeout: g }
                ))
            : p(e);
        }
        function w(e) {
          let t =
            arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          return (
            b ||
              ((b = []),
              self.addEventListener("beforeunload", () => {
                b.forEach((e) => e());
              })),
            t ? b.push(e) : b.unshift(e),
            () => {
              b = b.filter((t) => t !== e);
            }
          );
        }
      },
      529: (e, t, n) => {
        let r;
        n.d(t, { A: () => o, l: () => s });
        try {
          r = /[^\p{L}\p{M}]+/iu;
        } catch (e) {
          r = /[^\wа-яёґєії]+/i;
        }
        function o(e, t) {
          if (!e || !t) return !1;
          const n = "string" == typeof t ? t.toLowerCase().split(r) : t,
            o = e.toLowerCase();
          if (1 === n.length && !o.includes(n[0])) return !1;
          let s;
          return n.every(
            (e) =>
              !!o.includes(e) &&
              (s || (s = o.split(r)), s.some((t) => t.startsWith(e)))
          );
        }
        function s(e) {
          const t = e.toLowerCase().split(r);
          return (e) => o(e, t);
        }
      },
      80140: (e, t, n) => {
        n.d(t, { Fm: () => a, SF: () => s, SH: () => o });
        let r = 0;
        function o(e) {
          r = e;
        }
        function s() {
          return r;
        }
        function a() {
          return Math.floor(Date.now() / 1e3) + r;
        }
      },
      57751: (e, t, n) => {
        n.d(t, { AA: () => a, CX: () => d, rE: () => i, wr: () => s });
        var r = n(31481);
        const o = [1, 2, 3, 4, 5];
        function s() {
          if ("true" === localStorage.getItem(r.ozB)) return !0;
          const e = localStorage.getItem(r.NFE);
          if (!e) return !1;
          try {
            const t = JSON.parse(e);
            return Boolean(t && t.id && t.dcID);
          } catch (e) {
            return !1;
          }
        }
        function a(e, t) {
          const { mainDcId: n, keys: o, hashes: s } = e;
          localStorage.setItem(r.NFE, JSON.stringify({ dcID: n, id: t })),
            localStorage.setItem("dc", String(n)),
            Object.keys(o)
              .map(Number)
              .forEach((e) => {
                localStorage.setItem(`dc${e}_auth_key`, JSON.stringify(o[e]));
              }),
            s &&
              Object.keys(s)
                .map(Number)
                .forEach((e) => {
                  localStorage.setItem(`dc${e}_hash`, JSON.stringify(s[e]));
                });
        }
        function i() {
          [
            r.NFE,
            "dc",
            ...o.map((e) => `dc${e}_auth_key`),
            ...o.map((e) => `dc${e}_hash`),
            ...o.map((e) => `dc${e}_server_salt`),
          ].forEach((e) => {
            localStorage.removeItem(e);
          });
        }
        function d() {
          if (!s()) return;
          const e = JSON.parse(localStorage.getItem(r.NFE));
          if (!e) return;
          const t = Number(e.dcID),
            n = {},
            a = {};
          return (
            o.forEach((e) => {
              try {
                const t = localStorage.getItem(`dc${e}_auth_key`);
                t && (n[e] = JSON.parse(t));
                const r = localStorage.getItem(`dc${e}_hash`);
                r && (a[e] = JSON.parse(r));
              } catch (e) {
                r.Oig && console.warn("Failed to load stored session", e);
              }
            }),
            Object.keys(n).length ? { mainDcId: t, keys: n, hashes: a } : void 0
          );
        }
      },
      22237: (e, t, n) => {
        n.d(t, { Hp: () => s, cO: () => c, n5: () => d });
        var r = n(46536);
        const o = Symbol("SIGNAL_MARK");
        function s(e) {
          return "function" == typeof e && o in e;
        }
        const a = new Map();
        let i;
        function d(e) {
          const t = { value: e, effects: (0, r.h)() };
          function n(e) {
            const n = t.effects.addCallback(e);
            return (
              a.has(e) ? a.get(e).add(n) : a.set(e, new Set([n])),
              () => {
                n();
                const t = a.get(e);
                t.delete(n), t.size || a.delete(e);
              }
            );
          }
          return [
            Object.assign(
              function () {
                return i && n(i), t.value;
              },
              {
                [o]: o,
                subscribe: n,
                once: function (e) {
                  const t = n(() => {
                    t(), e();
                  });
                  return t;
                },
              }
            ),
            function (e) {
              t.value !== e && ((t.value = e), t.effects.runCallbacks());
            },
          ];
        }
        function c(e) {
          a.get(e)?.forEach((e) => {
            e();
          }),
            a.delete(e);
        }
      },
      55994: (e, t, n) => {
        n.d(t, { P: () => g, R: () => y });
        var r = n(66644),
          o = n(19822),
          s = n(50442),
          a = n(25903),
          i = n(43336),
          d = n(82393);
        const c = 300,
          u = o.qM.easeOutCubic;
        let l,
          f,
          h,
          m,
          p = !1;
        function g(e, t) {
          return (0, s.wJ)(e, {
            excludedClosestSelector: t.excludedClosestSelector,
            selectorToPreventScroll: t.selectorToPreventScroll,
            swipeThreshold: 10,
            onSwipe(e, n, r) {
              if (n === s.ez.Left) t.onSwipeLeftStart?.();
              else {
                if (n !== s.ez.Right) return !1;
                t.onSwipeRightStart?.();
              }
              return d.pz && ((p = !0), (l = r)), !0;
            },
            onDrag(e, t, n) {
              p && f?.(n);
            },
            onRelease() {
              p && ((p = !1), h?.(t.onCancel), (f = void 0), (h = void 0));
            },
          });
        }
        function y(e, t, n) {
          if ((m?.(), !p)) return;
          const s = (function (e) {
            for (const t of e.getAnimations())
              if (t.effect instanceof KeyframeEffect)
                for (const e of t.effect.getKeyframes()) {
                  if (1 !== e.offset || !e.transform) continue;
                  const t = v(e.transform);
                  if (t) return t;
                }
          })(e);
          if (!s) return;
          let d;
          e.getAnimations().forEach((e) => e.pause()),
            t.getAnimations().forEach((e) => e.pause()),
            (e.style.animationTimingFunction = "linear"),
            (t.style.animationTimingFunction = "linear"),
            (0, r.YS)(() => {
              const p =
                ((g = getComputedStyle(e).transform),
                (y = s.axis),
                g.slice(7, -1).split(",").map(Number)["X" === y ? 4 : 5]);
              var g, y;
              const v =
                ("px" === s.units
                  ? s.value
                  : (s.value / 100) *
                    ("X" === s.axis ? e.offsetWidth : e.offsetHeight)) - p;
              let w = 0;
              (f = (n) => {
                let { dragOffsetX: r, dragOffsetY: o } = n;
                const a =
                    "X" === s.axis ? r - l.dragOffsetX : o - l.dragOffsetY,
                  c = (0, i.qE)(a / v, 0, 1);
                (d = c > w ? 1 : -1), (w = c), b([e, t], w);
              }),
                (h = (s) => {
                  const i = -1 === d;
                  function l() {
                    e.getAnimations().forEach((e) => e.cancel()),
                      t.getAnimations().forEach((e) => e.cancel()),
                      (0, r.RK)(() => {
                        (e.style.animationTimingFunction = ""),
                          (t.style.animationTimingFunction = "");
                      });
                  }
                  i || (0, a.e)(e, l),
                    (m = (0, o.Hd)({
                      from: w,
                      to: i ? 0 : 1,
                      duration: c,
                      timing: u,
                      onUpdate(n) {
                        b([e, t], n);
                      },
                      onEnd() {
                        (m = void 0),
                          ((arguments.length > 0 &&
                            void 0 !== arguments[0] &&
                            arguments[0]) ||
                            i) &&
                            (l(), n(), s());
                      },
                    }));
                });
            });
        }
        function b(e, t) {
          e.map((e) => e.getAnimations())
            .flat()
            .forEach((e) => {
              e.currentTime = e.effect.getTiming().duration * t;
            });
        }
        function v(e) {
          const t = e.match(/([XY])\((-?\d+)(%|px)\)/);
          if (t) return { axis: t[1], value: Number(t[2]), units: t[3] };
        }
      },
      71322: (e, t, n) => {
        n.d(t, { Ay: () => m, E2: () => l, dD: () => f });
        var r = n(66644);
        const o = JSON.parse(
          '{"--color-primary":["#3390EC","#8774E1"],"--color-primary-opacity":["#50A2E91E","#8378DB1E"],"--color-primary-opacity-hover":["#50A2E940","#8378DB40"],"--color-primary-tint":["#3390ec1a","#8774e11a"],"--color-primary-shade":["#4a95d6","#7b71c6"],"--color-background":["#FFFFFF","#212121"],"--color-background-compact-menu":["#FFFFFFBB","#212121DD"],"--color-web-app-browser":["#FFFFFFBB","#0303038F"],"--color-background-compact-menu-reactions":["#FFFFFFEB","#212121DD"],"--color-background-compact-menu-hover":["#00000011","#00000066"],"--color-background-secondary":["#f4f4f5","#0F0F0F"],"--color-background-secondary-accent":["#E4E4E5","#191919"],"--color-background-own":["#EEFFDE","#766AC8"],"--color-background-own-apple":["#DCF8C5","#766AC8"],"--color-background-selected":["#F4F4F5","#2C2C2C"],"--color-background-own-selected":["#d0ffac","#6549d4"],"--color-chat-hover":["#F4F4F5","#2C2C2C"],"--color-chat-active":["#3390EC","#766AC8"],"--color-chat-active-greyed":["#60a7f0","#9288d3"],"--color-item-hover":["#f4f4f5","#2c2c2c"],"--color-item-active":["#ededed","#292929"],"--color-text":["#000000","#FFFFFF"],"--color-text-secondary":["#707579","#AAAAAA"],"--color-icon-secondary":["#707579","#AAAAAA"],"--color-text-secondary-apple":["#8E8E92","#AAAAAA"],"--color-borders":["#DADCE0","#303030"],"--color-borders-input":["#DADCE0","#5B5B5A"],"--color-dividers":["#C8C6CC","#3B3B3D"],"--color-dividers-android":["#E7E7E7","#0F0F0F"],"--color-links":["#3390EC","#8774E1"],"--color-gray":["#C4C9CC","#717579"],"--color-list-icon":["#ABAFB1","#A2A2A2"],"--color-default-shadow":["#72727240","#1010109c"],"--color-light-shadow":["#7272722B","#00000040"],"--color-green":["#00C73E","#8774E1"],"--color-green-darker":["#00a734","#7b71c6"],"--color-success":["#00C73E","#00C73E"],"--color-text-meta-colored":["#4DCD5E","#8378DB"],"--color-reply-hover":["#F4F4F4","#272727"],"--color-reply-active":["#E8E9E9","#2E2F2F"],"--color-reply-own-hover":["#D9F5CE","#8775DA"],"--color-reply-own-hover-apple":["#cbefb7","#8775DA"],"--color-reply-own-active":["#C5ECBE","#917DEA"],"--color-reply-own-active-apple":["#bae6a8","#917DEA"],"--color-accent-own":["#45AF54","#FFFFFF"],"--color-message-meta-own":["#4FAE4EFF","#FFFFFF88"],"--color-own-links":["#3390EC","#FFFFFF"],"--color-code":["#4a729a","#8774E1"],"--color-code-own":["#3c7940","#FFFFFF"],"--color-code-bg":["#70757914","#00000080"],"--color-code-own-bg":["#70757914","#00000050"],"--color-composer-button":["#707579CC","#AAAAAACC"],"--color-message-reaction":["#ebf3fd","#2b2a35"],"--color-message-reaction-hover":["#c5def9","#343147"],"--color-message-reaction-own":["#c6eab2","#675CAF"],"--color-message-reaction-hover-own":["#b5e0a4","#5B529B"],"--color-message-reaction-chosen-hover":["#1a82ea","#7864dd"],"--color-message-reaction-chosen-hover-own":["#3f9d4b","#f5f5f5"],"--color-voice-transcribe-button":["#e8f3ff","#2a2a3c"],"--color-voice-transcribe-button-own":["#cceebf","#8373d3"],"--color-topic-blue":["#2F7772","#6ff9f0"],"--color-topic-yellow":["#7F693B","#ffd67e"],"--color-topic-violet":["#8B5A96","#cb86db"],"--color-topic-green":["#44774A","#8eee98"],"--color-topic-rose":["#9B576B","#ff93b2"],"--color-topic-red":["#EB6858","#fb6f5f"],"--color-topic-grey":["#6C6C6C","#999999"],"--color-forum-unread-topic-hover":["#e9e9e9","#363636"],"--color-forum-hover-unread-topic-hover":["#e2e2e2","#3f3f3f"],"--color-chat-username":["#3C7EB0","#E9EEF4"],"--color-borders-read-story":["#C4C9CC","#737373"],"--color-background-menu-separator":["#0000001a","#ffffff1a"]}'
        );
        var s = n(19822),
          a = n(43336);
        let i = !1;
        const d = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i,
          c = new Set([
            "--color-text",
            "--color-primary-shade",
            "--color-text-secondary",
            "--color-accent-own",
          ]),
          u = Object.keys(o).map((e) => ({
            property: e,
            colors: [l(o[e][0]), l(o[e][1])],
          }));
        function l(e) {
          const t = d.exec(e);
          return {
            r: parseInt(t[1], 16),
            g: parseInt(t[2], 16),
            b: parseInt(t[3], 16),
            a: void 0 !== t[4] ? parseInt(t[4], 16) : void 0,
          };
        }
        function f(e, t, n) {
          return {
            r: Math.round((0, a.Cc)(e.r, t.r, n)),
            g: Math.round((0, a.Cc)(e.g, t.g, n)),
            b: Math.round((0, a.Cc)(e.b, t.b, n)),
            a: void 0 !== e.a ? Math.round((0, a.Cc)(e.a, t.a, n)) : void 0,
          };
        }
        function h(e, t) {
          let n =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
          u.forEach((r) => {
            let { property: o, colors: s } = r;
            const { r: a, g: i, b: d, a: u } = f(s[e], s[t], n),
              l = void 0 !== u ? Math.round((u / 255) * 1e3) / 1e3 : void 0;
            document.documentElement.style.setProperty(
              o,
              `rgb(${a},${i},${d}${l ? `,${l}` : ""})`
            ),
              c.has(o) &&
                document.documentElement.style.setProperty(
                  `${o}-rgb`,
                  `${a},${i},${d}`
                );
          });
        }
        const m = (e, t) => {
          const n = `theme-${e}`;
          if (document.documentElement.classList.contains(n)) return;
          const o = "dark" === e,
            a = i && t,
            d = o ? 0 : 1,
            c = o ? 1 : 0,
            u = Date.now(),
            l = document.querySelector('meta[name="theme-color"]');
          (0, r.RK)(() => {
            let e;
            document.documentElement.classList.remove(
              "theme-" + (o ? "light" : "dark")
            ),
              i &&
                ((e = ((e) => {
                  const t = document.createElement("style");
                  return (
                    (t.textContent =
                      "\n.no-animations #root *,\n.no-animations #root *::before,\n.no-animations #root *::after {\n  transition: none !important;\n}"),
                    document.head.appendChild(t),
                    () => {
                      document.head.removeChild(t);
                    }
                  );
                })()),
                document.documentElement.classList.add("no-animations")),
              document.documentElement.classList.add(n),
              l && l.setAttribute("content", o ? "#212121" : "#fff"),
              setTimeout(() => {
                (0, r.RK)(() => {
                  e?.(),
                    document.documentElement.classList.remove("no-animations");
                });
              }, 500),
              (i = !0),
              a
                ? (0, s.i0)(() => {
                    const e = Math.min((Date.now() - u) / 200, 1);
                    return (
                      h(
                        d,
                        c,
                        (function (e) {
                          return 1 - (1 - e) ** 3.5;
                        })(e)
                      ),
                      e < 1
                    );
                  }, r.RK)
                : h(d, c);
          });
        };
      },
      84382: (e, t, n) => {
        n.d(t, { S: () => a, V: () => s });
        let r,
          o = window.matchMedia?.("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
        function s() {
          return o;
        }
        function a(e) {
          r = e;
        }
        window
          .matchMedia("(prefers-color-scheme: dark)")
          .addEventListener("change", function (e) {
            (o = e.matches ? "dark" : "light"), r?.(o);
          });
      },
      14242: (e, t, n) => {
        n.d(t, { Qh: () => d, Sm: () => s, Vw: () => i, v7: () => u });
        var r = n(98221),
          o = n(24282);
        function s(e) {
          return String(e).replace(/\d(?=(\d{3})+$)/g, "$& ");
        }
        function a(e) {
          return ".0" === String(e.toFixed(1)).substr(-2)
            ? Math.round(e)
            : e.toFixed(1).replace(".", ",");
        }
        function i(e) {
          return e < 1e3
            ? e.toString()
            : e < 1e6
            ? `${a(e / 1e3)}K`
            : `${a(e / 1e6)}M`;
        }
        const d = (0, n(19314).A)(function (e) {
            let t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 2;
            return e
              .replace(/[.,!@#$%^&*()_+=\-`~[\]/\\{}:"|<>?]+/gi, "")
              .trim()
              .split(/\s+/)
              .slice(0, t)
              .map((e) => {
                if (!e.length) return "";
                const t = (e = (0, o.A)(e)).match(r.A);
                return t && e.startsWith(t[0])
                  ? t[0]
                  : e.match(/./u)[0].toUpperCase();
              })
              .join("");
          }),
          c = ["B", "KB", "MB", "GB"];
        function u(e, t) {
          let n =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
          if (0 === t) return e("FileSize.B", 0);
          const r = Math.floor(Math.log(t) / Math.log(1024)),
            o = (t / 1024 ** r).toFixed(Math.max(n, 0));
          return e(`FileSize.${c[r]}`, o);
        }
      },
      74065: (e, t, n) => {
        n.d(t, { E: () => h });
        var r = n(31481),
          o = n(37836);
        const s = new Map(),
          a = new Map(),
          i = new Map(),
          d = document.createElement("style");
        function c(e, t, n) {
          n
            ? (s.delete(e), a.set(e, t), i.set(e, n))
            : (s.set(e, t), a.delete(e), i.delete(e)),
            u || ((u = !0), (0, o.IJ)(l));
        }
        document.head.appendChild(d);
        let u = !1;
        function l() {
          const e = f(s),
            t = f(a),
            n = f(i);
          d.textContent = `\n    html {\n      ${e}\n    }\n\n    html.theme-light {\n      ${t}\n    }\n\n    html.theme-dark {\n      ${n}\n    }\n  `;
        }
        function f(e) {
          return Array.from(e.entries())
            .map((e) => {
              let [t, n] = e;
              return `--${t}: ${n};`;
            })
            .join(" ");
        }
        function h(e) {
          m("0", ["#e17076"]),
            m("1", ["#faa774"]),
            m("2", ["#a695e7"]),
            m("3", ["#7bc862"]),
            m("4", ["#6ec9cb"]),
            m("5", ["#65aadd"]),
            m("6", ["#ee7aae"]),
            Object.entries(e).forEach((e) => {
              let [t, n] = e;
              n.colors && m(t, n.colors, n.darkColors);
            });
        }
        function m(e, t, n) {
          const o = t[0],
            s = n?.[0];
          if (!o) return;
          const a = `${o}${r.tP8}`,
            i = s ? `${s}${r.tP8}` : void 0,
            d = `${o}${r.g0p}`,
            u = s ? `${s}${r.g0p}` : void 0;
          if (
            (c(`color-peer-${e}`, o, s),
            c(`color-peer-bg-${e}`, a, i),
            c(`color-peer-bg-active-${e}`, d, u),
            t.length > 1)
          ) {
            const o = t.map(
                (e, t) => `${e} ${t * r.D$I}px, ${e} ${(t + 1) * r.D$I}px`
              ),
              s = n?.map(
                (e, t) => `${e} ${t * r.D$I}px, ${e} ${(t + 1) * r.D$I}px`
              );
            c(
              `color-peer-gradient-${e}`,
              `repeating-linear-gradient(-45deg, ${o.join(", ")})`,
              s ? `repeating-linear-gradient(-45deg, ${s.join(", ")})` : void 0
            );
          }
        }
      },
      59852: (e, t, n) => {
        function r() {
          const e = getComputedStyle(document.documentElement),
            t = s(e, "--color-background"),
            n = s(e, "--color-text-secondary"),
            r = t,
            o = s(e, "--color-text"),
            a = s(e, "--color-primary"),
            i = s(e, "--color-white"),
            d = s(e, "--color-links"),
            c = n,
            u = s(e, "--color-background-secondary"),
            l = s(e, "--color-divider");
          return {
            bg_color: r,
            text_color: o,
            hint_color: c,
            link_color: d,
            button_color: a,
            button_text_color: i,
            secondary_bg_color: u,
            header_bg_color: t,
            accent_text_color: s(e, "--color-primary"),
            section_bg_color: t,
            section_header_text_color: n,
            subtitle_text_color: c,
            destructive_text_color: s(e, "--color-error"),
            section_separator_color: l,
          };
        }
        function o(e) {
          return /^#[0-9A-F]{6}$/i.test(e);
        }
        function s(e, t) {
          const n = e.getPropertyValue(t);
          var r;
          if (n)
            return o((r = n.trim()))
              ? r
              : `#${r
                  .match(
                    /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/
                  )
                  .slice(1)
                  .map((e, t) =>
                    (3 === t ? Math.round(255 * parseFloat(e)) : parseFloat(e))
                      .toString(16)
                      .padStart(2, "0")
                      .replace("NaN", "")
                  )
                  .join("")}`;
        }
        n.d(t, { A: () => r, To: () => o, eH: () => s });
      },
      58849: (e, t, n) => {
        function r(e, t) {
          return !e || !t || e.length <= t ? e : `${e.substring(0, t)}...`;
        }
        n.d(t, { A: () => r });
      },
      11422: (e, t, n) => {
        n.d(t, { BU: () => i, Ny: () => a, Tk: () => s, tX: () => o });
        const r = 3,
          o = 5,
          s = 32,
          a = /^[a-zA-Z]\w+$/;
        function i(e, t) {
          const n = t ? o : r;
          return e.length >= n && e.length <= s && a.test(e);
        }
      },
      84553: (e, t, n) => {
        n.d(t, { KX: () => m, VH: () => g, ii: () => p, nv: () => h });
        var r = n(13439),
          o = n(31481),
          s = n(57751),
          a = n(82393);
        const i = ["t.me", "telegram.me"].map((e) => `https://${e}/_websync_?`),
          d = `10.9.17 ${o.cK8}`,
          c = "tgme_sync",
          u = 86400,
          l = () => Math.floor(Number(new Date()) / 1e3);
        let f;
        const h = (e) => {
          if (o.fng || a.cp) return;
          const t = l(),
            { canRedirect: n, ts: r } = JSON.parse(
              localStorage.getItem(c) || "{}"
            );
          return n !== e || r + u <= t
            ? Promise.all(
                i.map(
                  (t) =>
                    new Promise((n, r) => {
                      const o = document.createElement("script"),
                        s = () => Boolean(document.body.removeChild(o));
                      (o.src =
                        t +
                        new URLSearchParams({
                          authed: Number(e).toString(),
                          version: d,
                        })),
                        document.body.appendChild(o),
                        (o.onload = () => {
                          ((e) => {
                            const t = l();
                            localStorage.setItem(
                              c,
                              JSON.stringify({ canRedirect: e, ts: t })
                            );
                          })(e),
                            s(),
                            f && (clearTimeout(f), (f = void 0)),
                            p(),
                            n();
                        }),
                        (o.onerror = () => {
                          s(), r();
                        });
                    })
                )
              )
            : Promise.resolve();
        };
        function m() {
          o.Oig || a.cp || (f && clearTimeout(f));
        }
        function p() {
          if (o.Oig || a.cp) return;
          if (void 0 !== f) return;
          const e = l(),
            { ts: t } = JSON.parse(localStorage.getItem(c) || "{}"),
            n = u - (e - t);
          f = setTimeout(() => {
            const { authState: e } = (0, r.mS)(),
              t = "authorizationStateReady" === e || (0, s.wr)();
            h(t);
          }, Math.max(0, 1e3 * n));
        }
        function g() {
          localStorage.removeItem(c);
        }
      },
      82393: (e, t, n) => {
        n.d(t, {
          $M: () => h,
          Aw: () => o,
          CM: () => U,
          Fy: () => x,
          G9: () => L,
          H8: () => a,
          Ld: () => _,
          MP: () => s,
          Nd: () => f,
          Ni: () => c,
          OF: () => M,
          OL: () => k,
          OS: () => D,
          Oo: () => C,
          QH: () => S,
          SC: () => E,
          So: () => N,
          TF: () => b,
          TL: () => w,
          Tz: () => I,
          Uh: () => T,
          Uz: () => A,
          Yw: () => l,
          _7: () => g,
          bs: () => R,
          cp: () => m,
          et: () => $,
          ig: () => i,
          kn: () => j,
          l5: () => F,
          lE: () => y,
          nB: () => O,
          ol: () => B,
          pW: () => v,
          pz: () => d,
          w3: () => p,
          yS: () => u,
        });
        var r = n(31481);
        window.location.host, r.mFn;
        const o = (function () {
            const { userAgent: e, platform: t } = window.navigator;
            return -1 !== ["iPhone", "iPad", "iPod"].indexOf(t) ||
              ("MacIntel" === t &&
                "maxTouchPoints" in navigator &&
                navigator.maxTouchPoints > 2)
              ? "iOS"
              : -1 !== ["Macintosh", "MacIntel", "MacPPC", "Mac68K"].indexOf(t)
              ? "macOS"
              : -1 !== ["Win32", "Win64", "Windows", "WinCE"].indexOf(t)
              ? "Windows"
              : /Android/.test(e)
              ? "Android"
              : /Linux/.test(t)
              ? "Linux"
              : void 0;
          })(),
          s = "macOS" === o,
          a = "Windows" === o,
          i = "Linux" === o,
          d = "iOS" === o,
          c = "Android" === o,
          u = d || c,
          l = /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
          f = navigator.userAgent.includes("YaBrowser"),
          h =
            navigator.userAgent.toLowerCase().includes("firefox") ||
            navigator.userAgent.toLowerCase().includes("iceweasel") ||
            navigator.userAgent.toLowerCase().includes("icecat"),
          m = Boolean(window.electron);
        let p = (function (e) {
          return (
            (e[(e.Main = 0)] = "Main"),
            (e[(e.Auxiliary = 1)] = "Auxiliary"),
            (e[(e.Secondary = 2)] = "Secondary"),
            (e[(e.Fourth = 3)] = "Fourth"),
            (e[(e.Fifth = 4)] = "Fifth"),
            e
          );
        })({});
        const g =
            window.matchMedia("(display-mode: standalone)").matches ||
            window.navigator.standalone ||
            document.referrer.includes("android-app://"),
          y = g || m,
          b = window.matchMedia("(pointer: coarse)").matches,
          v = Boolean(
            window.navigator.mediaDevices &&
              "getUserMedia" in window.navigator.mediaDevices &&
              (window.AudioContext || window.webkitAudioContext)
          ),
          w =
            o &&
            (s || d) &&
            (function () {
              const e = document.createElement("span");
              e.classList.add("emoji-test-element"),
                document.body.appendChild(e),
                (e.innerText = "🐦‍🔥");
              const t = e.offsetWidth;
              e.innerText = "❤️";
              const n = e.offsetWidth;
              return document.body.removeChild(e), Math.abs(t - n) < 5;
            })(),
          I = "serviceWorker" in navigator,
          A = I,
          C = Boolean(new Audio().canPlayType("audio/ogg; codecs=opus")),
          S =
            !r.W75 &&
            "filter" in
              (document.createElement("canvas").getContext("2d") || {}),
          E = "requestFullscreen" in document.createElement("div"),
          k = !h,
          T = c ? "slideFade" : d ? "slideLayers" : "pushSlide",
          P = document.createElement("video"),
          M = Boolean(
            P.canPlayType('video/webm; codecs="vp9"').replace("no", "")
          ),
          L = "VideoDecoder" in window,
          N = !0,
          F = Boolean(navigator.storage?.getDirectory);
        F &&
          (async () => {
            try {
              const e = await navigator.storage.getDirectory();
              await e.removeEntry("downloads", { recursive: !0 });
            } catch {}
          })();
        const B = CSS.supports("offset-rotate: 0deg"),
          x =
            CSS.supports("backdrop-filter: blur()") ||
            CSS.supports("-webkit-backdrop-filter: blur()"),
          O = "onbeforeinstallprompt" in window,
          R = "BroadcastChannel" in window,
          D = R && !(g && u),
          U = !r.W75,
          _ = "ListFormat" in Intl,
          $ = 750,
          j =
            ((() => {
              const e = document.createElement("div");
              (e.style.cssText =
                "overflow:scroll; visibility:hidden; position:absolute;"),
                e.classList.add("custom-scroll"),
                document.body.appendChild(e);
              const t = e.offsetWidth - e.clientWidth;
              e.remove(),
                document.documentElement.style.setProperty(
                  "--scrollbar-width",
                  `${t}px`
                );
            })(),
            1048576 * (u ? 512 : 2e3));
      },
      43503: (e, t, n) => {
        n.d(t, { A: () => l, u: () => u });
        var r = n(66644),
          o = n(37836),
          s = n(82393);
        let a = window.innerHeight,
          i = u();
        const d = (0, o.nF)(
            () => {
              i = u();
            },
            250,
            !0
          ),
          c = (0, o.nF)(
            () => {
              (a = window.innerHeight), d();
            },
            100,
            !1
          );
        function u() {
          let e;
          return (
            (e = s.pz
              ? window.visualViewport.height + window.visualViewport.pageTop
              : window.innerHeight),
            (0, r.RK)(() => {
              const t = 0.01 * e;
              document.documentElement.style.setProperty("--vh", `${t}px`);
            }),
            { width: window.innerWidth, height: window.innerHeight }
          );
        }
        window.addEventListener("orientationchange", c),
          s.pz
            ? window.visualViewport.addEventListener("resize", d)
            : window.addEventListener("resize", d);
        const l = { get: () => i, getIsKeyboardVisible: () => a > i.height };
      },
      19314: (e, t, n) => {
        n.d(t, { A: () => o });
        const r = new WeakMap();
        function o(e) {
          return function () {
            let t = r.get(e);
            for (var n = arguments.length, o = new Array(n), s = 0; s < n; s++)
              o[s] = arguments[s];
            const a = o.map(String).join("_");
            if (t) {
              const e = t.get(a);
              if (e) return e;
            } else (t = new Map()), r.set(e, t);
            const i = e(...o);
            return t.set(a, i), i;
          };
        }
      },
      61911: (e, t, n) => {
        e.exports = n.p + "blank.8dd283bceccca95a48d8.png";
      },
      38027: (e, t, n) => {
        e.exports = n.p + "grey.45da821d56a68ea86203.svg";
      },
      89704: (e, t, n) => {
        e.exports = n.p + "lock.f11661905df47960fa3e.png";
      },
    },
    s = {};
  function a(e) {
    var t = s[e];
    if (void 0 !== t) return t.exports;
    var n = (s[e] = { exports: {} });
    return o[e].call(n.exports, n, n.exports, a), n.exports;
  }
  (a.m = o),
    (a.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return a.d(t, { a: t }), t;
    }),
    (t = Object.getPrototypeOf
      ? (e) => Object.getPrototypeOf(e)
      : (e) => e.__proto__),
    (a.t = function (n, r) {
      if ((1 & r && (n = this(n)), 8 & r)) return n;
      if ("object" == typeof n && n) {
        if (4 & r && n.__esModule) return n;
        if (16 & r && "function" == typeof n.then) return n;
      }
      var o = Object.create(null);
      a.r(o);
      var s = {};
      e = e || [null, t({}), t([]), t(t)];
      for (var i = 2 & r && n; "object" == typeof i && !~e.indexOf(i); i = t(i))
        Object.getOwnPropertyNames(i).forEach((e) => (s[e] = () => n[e]));
      return (s.default = () => n), a.d(o, s), o;
    }),
    (a.d = (e, t) => {
      for (var n in t)
        a.o(t, n) &&
          !a.o(e, n) &&
          Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }),
    (a.f = {}),
    (a.e = (e) =>
      Promise.all(Object.keys(a.f).reduce((t, n) => (a.f[n](e, t), t), []))),
    (a.u = (e) =>
      e +
      "." +
      {
        26: "c6aa48f26cf2c480ba22",
        59: "cd45091cb5c130745405",
        61: "36c66587faab069a921b",
        69: "a6db53a4f00742fd1462",
        90: "f7637ad4b6d9882054f9",
        103: "06562548b3fda65effcc",
        194: "c1f5ffb04238d98d648b",
        236: "680f670a0d5072c11bf1",
        244: "d7789cf483f349c38ac4",
        304: "48b0b40adff5d3e137ef",
        313: "0f4bc4fa205668ed808c",
        356: "1bc44e46652fa5288bf8",
        373: "75fdc0ccff654eeecb30",
        387: "81529401c679841b397b",
        400: "a47601ed4b358f8abbb5",
        405: "d66329eb14453a8b3d34",
        409: "0fd7b0b4fa794dd68108",
        433: "ad060437ffb6916a9321",
        453: "28c197282b5d28a55117",
        482: "f539aab19c85ff61ce44",
        562: "08644faea2a11dc03715",
        564: "d622f298de832ee1c2f8",
        633: "0c008db6ee63daf3e6e9",
        676: "575fa56db35097bc4a32",
        683: "eaf2b99781f1220c4b86",
        695: "37084dfcb08fa6bd68d9",
        768: "f5aea4b0692ec4ad998e",
        835: "e84d44ebdf9dd2ae222c",
        947: "58aaed90385beda86fce",
        970: "7044f00deb7b3fdc1ab5",
        996: "9460a03c6edee870f315",
        1022: "10e6de63c64b3b9a18af",
        1095: "95cc2d575059e9f6054f",
        1105: "82a58e981ea92040fe89",
        1164: "ce743c2bcc23d3043fe9",
        1168: "456d17d716ba7e4d4ec5",
        1184: "68efc66b5ecdd36e1df7",
        1215: "e157a49d04b225308f77",
        1348: "f655ca346b82779f07c5",
        1387: "394c9143713a7fd68235",
        1401: "5b095c8c14e292f91887",
        1465: "acaade6ed215d80122fa",
        1516: "91af49804dee1af8631e",
        1575: "e5726d1c745dcc9873f2",
        1586: "d55ded8aa155fbd69470",
        1620: "8c85ba900a4207ce4da9",
        1692: "66caee8054d626d59d48",
        1700: "dd59d0dbdf3ef22443b3",
        1775: "8b47df32db7309502f49",
        1780: "f39d3ff745c63d496160",
        1877: "13c44f38e27f297965ef",
        2057: "114033549ec88321349c",
        2118: "4d5cef94fa94e132add7",
        2158: "a6754dbfe1f8d591a114",
        2164: "e492657dac2eb724da50",
        2225: "aadcce9013263158a5df",
        2230: "3a602927b9e118113ffa",
        2394: "cfadcc04d00939275b3b",
        2440: "e89152702b001cdd81aa",
        2448: "da0e561a2055927d551f",
        2498: "94264e7f6126aa416ec1",
        2651: "60007143ecc35556d2be",
        2670: "9e12093c5acef62f3f98",
        2729: "0065c8652592670fe035",
        2800: "fe61871efd4cf024ed73",
        2801: "218e3e05568344bfc382",
        2856: "2ad12ce521ce05aaeb25",
        2857: "e46d806152d3634a3af0",
        2859: "658d7669972a6ee46df0",
        2916: "30141131c0e95e8b9171",
        2990: "544b6eac560aef426853",
        3080: "15f4cdecf7bd92fd8cd7",
        3325: "8a2401ebd7036617f4d6",
        3363: "d0e8f9c9ad9af93e091f",
        3405: "bf0efec17f73eea62691",
        3499: "fb9028f6a91578dbeb7e",
        3524: "e86bdc871cc7d384bb9f",
        3559: "f50e5e11a5a9a43bf653",
        3564: "e1d4da9993f41f931d4a",
        3715: "b369e2fb06fef4e03112",
        3731: "4c3ad0d715104f8c9a90",
        3745: "70fa1408b56b531c8b70",
        3747: "9d65fbf6607c2639f1ac",
        3787: "738b7fcddf703bfdba93",
        3813: "322d1f0835139c813fc2",
        3906: "20c0ac801cb25871d36d",
        3981: "7181a4ce1bc076373789",
        4008: "59b7339e18feff0fcf48",
        4019: "5436e42f5f05697217c5",
        4020: "7fd110ec1a610079e678",
        4102: "6d3f605113d2ca62c370",
        4128: "932954ee591c37fcab93",
        4134: "71cfa5405de2ba0d28f9",
        4180: "9be92536a6ec7980a981",
        4204: "9b422b9bac0e923d0800",
        4230: "fa2f1dbe863bef3e5337",
        4326: "344ecd11d90386e0b584",
        4336: "a6113c3827c4e53ba062",
        4383: "108071f9a50471133448",
        4435: "303678ebd6d3a95a6ad0",
        4448: "6d46b3fccdf6fdc05fbd",
        4484: "697013986f9f8314725b",
        4550: "79ec4a71200382a8bb30",
        4765: "ae27736819aa0a139820",
        4785: "ee250366df8843a67094",
        4903: "7b2461fbeeed521475dc",
        4917: "451a5721d4c10bda0cef",
        4940: "d4766f8c482b18850eb3",
        5032: "c2d32c817b8fcd096923",
        5046: "cae7eb2c1eb178edb5cb",
        5073: "b7b27ed7a495221c6f61",
        5116: "7e3a6f36b5b79abb782a",
        5148: "e9ddaa9b7e6d1b5c2689",
        5193: "277e1fb9e38cc39cf421",
        5246: "f6aacfbe9ae9257098d1",
        5260: "963906e0cff8dcb3a5f2",
        5269: "cb8357f44d3e42279470",
        5284: "2418a7c4c160a620061e",
        5336: "7c49be58112e63514c13",
        5345: "323a678ecb6d1df232ca",
        5361: "b67441dffa58f8924636",
        5429: "7a4bdbe76dc672994511",
        5434: "9f2b0084773cc370a809",
        5438: "60c9f65511b76d590655",
        5468: "43220f467f383db55818",
        5499: "13cb3031a94ce4aaa036",
        5525: "8cefdbd7798ac454e0d4",
        5628: "404c65b7e2448f632b03",
        5719: "fd58667cc73b93bde774",
        5735: "31b6059ae6ea6bfde1ee",
        5819: "59e9c49233dabd77f9df",
        5962: "ede17865912f35b1a90f",
        6047: "56c21fd26028a86e4eeb",
        6058: "30cefd831f035595b5d0",
        6167: "b42a04fdc12fb4b4a4aa",
        6168: "ada3094042ebc5125641",
        6241: "33e68803b77e2df83262",
        6265: "c6c542183797c639fc12",
        6272: "b25825eb9cace64817d5",
        6308: "fc757fb049f7befef6c5",
        6338: "b7431caf1d83069b35a0",
        6441: "596e674263fc662c6563",
        6442: "61a6ce48a2c67daada31",
        6473: "504b8bde338f548d384e",
        6685: "d3f3addf37c9d0774537",
        6686: "78266345eeede412e9b8",
        6708: "457f852af5d5245dd736",
        6726: "738df768f67f2b3ae4e7",
        6802: "c56f82fa0a9d57ab7e5f",
        6827: "f9dabc7d712e3f363fd8",
        6860: "7724ac0b43a96ee6e42c",
        6869: "fd1804ea75e26a748a15",
        6947: "4089f0e6e5cacb406a13",
        7001: "edd8f550449c6534ea87",
        7120: "4351a393dfb081ce0d24",
        7244: "c74333bf67d0d0e5f0b7",
        7276: "30fdb090c835b9699945",
        7283: "fffaae54cb7b28e809f3",
        7357: "cb6f3aabbdaa5f7b258b",
        7405: "048847aa986f035c8841",
        7424: "920b4bb14b7ef164f6ea",
        7487: "f99a7245241b40c68b5a",
        7499: "b71077d766e8046190f9",
        7561: "1665e25dd14333ec9826",
        7586: "77f6f39b7a4e6f37ed3f",
        7594: "5628b088a8023fd67b16",
        7612: "6c8ab8862b830976b5db",
        7617: "34d0c937e4603648722e",
        7643: "4a0415a020164e1d66ce",
        7688: "f95d71b512dcd8a147b1",
        7738: "0dc02b731f56895b7357",
        7768: "8f6716c91eaeae366a5f",
        7854: "7be62b41cdba936c60e4",
        7880: "68b59de98783ddb9efe1",
        7901: "4aadbe5fa9ab2c7611da",
        7939: "2813aac25a1b171b9989",
        7972: "678efa36d93c19ed26e7",
        7978: "212c9932786ab38c4554",
        8043: "21401193a3b398303cb2",
        8062: "ebd3ad90c39cc5e25350",
        8100: "bd041507440eee866dc6",
        8114: "c9802556b70ecf3759ff",
        8142: "81da796ad6faa53a5d68",
        8150: "0ba591eb0c58e1fdb970",
        8169: "532cb82eb3a3a8271112",
        8201: "c49763b6fd5c4015d0f2",
        8213: "e581afc854c202a6b6fb",
        8214: "3f3aaca4fffbb683fc2f",
        8233: "ae517c59765c3b7bce41",
        8308: "da1f7667512be214d174",
        8349: "775185f0387e663c5027",
        8393: "db6445b7c7e7f2fb5e93",
        8590: "29f8579c7984b34767fb",
        8602: "c402ccf8ff9e705db27d",
        8804: "f84ae4c11366a3801534",
        8843: "6d23d4789571778235b2",
        8924: "d08e780338c62690dbf5",
        8980: "fec0192ca5989767fd0c",
        9004: "e7575d29ea537f158935",
        9030: "1f951cbe1fc3eed05dbe",
        9072: "39603f8ff791f6826f87",
        9141: "1085becfec856ba7da56",
        9183: "d41c104abc24b4ac62f9",
        9238: "bff8dd1dc0e66d5d0a90",
        9250: "e581647d2044927ff610",
        9287: "cf23b13bca02aebb5369",
        9295: "a6b850b7b7099199fa9c",
        9359: "5f9ee572512a6fae40ed",
        9375: "d7efd3e904f1ac293240",
        9451: "86ae39de2f6e33c528bb",
        9549: "9a06199a86d29568470b",
        9623: "fdf70ce01a3b6098d93c",
        9677: "a7ac09b5833e5c014541",
        9710: "9b76a0cb719752bfb867",
        9722: "a1f584d63d359c708089",
        9753: "10215189de20ab980550",
        9761: "62397d08b14e4d5fd188",
        9849: "90f9bfd38c2507007b51",
        9869: "543fec634f8285cd1377",
        9998: "987bf83d84b82dcc5e6d",
      }[e] +
      ".js"),
    (a.miniCssF = (e) =>
      (({
        2394: "BundleCalls",
        4765: "shared-components",
        7405: "BundleAuth",
        7768: "BundleMain",
        9451: "BundleExtra",
      }[e] || e) +
      "." +
      {
        236: "680f670a0d5072c11bf1",
        1184: "68efc66b5ecdd36e1df7",
        2394: "cfadcc04d00939275b3b",
        4765: "ae27736819aa0a139820",
        7405: "048847aa986f035c8841",
        7643: "4a0415a020164e1d66ce",
        7768: "8f6716c91eaeae366a5f",
        9451: "86ae39de2f6e33c528bb",
      }[e] +
      ".css")),
    (a.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (a.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (n = {}),
    (r = "telegram-t:"),
    (a.l = (e, t, o, s) => {
      if (n[e]) n[e].push(t);
      else {
        var i, d;
        if (void 0 !== o)
          for (
            var c = document.getElementsByTagName("script"), u = 0;
            u < c.length;
            u++
          ) {
            var l = c[u];
            if (
              l.getAttribute("src") == e ||
              l.getAttribute("data-webpack") == r + o
            ) {
              i = l;
              break;
            }
          }
        i ||
          ((d = !0),
          ((i = document.createElement("script")).charset = "utf-8"),
          (i.timeout = 120),
          a.nc && i.setAttribute("nonce", a.nc),
          i.setAttribute("data-webpack", r + o),
          (i.src = e)),
          (n[e] = [t]);
        var f = (t, r) => {
            (i.onerror = i.onload = null), clearTimeout(h);
            var o = n[e];
            if (
              (delete n[e],
              i.parentNode && i.parentNode.removeChild(i),
              o && o.forEach((e) => e(r)),
              t)
            )
              return t(r);
          },
          h = setTimeout(
            f.bind(null, void 0, { type: "timeout", target: i }),
            12e4
          );
        (i.onerror = f.bind(null, i.onerror)),
          (i.onload = f.bind(null, i.onload)),
          d && document.head.appendChild(i);
      }
    }),
    (a.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (() => {
      var e;
      a.g.importScripts && (e = a.g.location + "");
      var t = a.g.document;
      if (!e && t && (t.currentScript && (e = t.currentScript.src), !e)) {
        var n = t.getElementsByTagName("script");
        if (n.length)
          for (var r = n.length - 1; r > -1 && (!e || !/^http(s?):/.test(e)); )
            e = n[r--].src;
      }
      if (!e)
        throw new Error(
          "Automatic publicPath is not supported in this browser"
        );
      (e = e
        .replace(/#.*$/, "")
        .replace(/\?.*$/, "")
        .replace(/\/[^\/]+$/, "/")),
        (a.p = e);
    })(),
    (() => {
      if ("undefined" != typeof document) {
        var e = { 8792: 0 };
        a.f.miniCss = (t, n) => {
          e[t]
            ? n.push(e[t])
            : 0 !== e[t] &&
              {
                236: 1,
                1184: 1,
                2394: 1,
                4765: 1,
                7405: 1,
                7643: 1,
                7768: 1,
                9451: 1,
              }[t] &&
              n.push(
                (e[t] = ((e) =>
                  new Promise((t, n) => {
                    var r = a.miniCssF(e),
                      o = a.p + r;
                    if (
                      ((e, t) => {
                        for (
                          var n = document.getElementsByTagName("link"), r = 0;
                          r < n.length;
                          r++
                        ) {
                          var o =
                            (a = n[r]).getAttribute("data-href") ||
                            a.getAttribute("href");
                          if ("stylesheet" === a.rel && (o === e || o === t))
                            return a;
                        }
                        var s = document.getElementsByTagName("style");
                        for (r = 0; r < s.length; r++) {
                          var a;
                          if (
                            (o = (a = s[r]).getAttribute("data-href")) === e ||
                            o === t
                          )
                            return a;
                        }
                      })(r, o)
                    )
                      return t();
                    ((e, t, n, r, o) => {
                      var s = document.createElement("link");
                      (s.rel = "stylesheet"),
                        (s.type = "text/css"),
                        a.nc && (s.nonce = a.nc),
                        (s.onerror = s.onload =
                          (n) => {
                            if (
                              ((s.onerror = s.onload = null), "load" === n.type)
                            )
                              r();
                            else {
                              var a = n && n.type,
                                i = (n && n.target && n.target.href) || t,
                                d = new Error(
                                  "Loading CSS chunk " +
                                    e +
                                    " failed.\n(" +
                                    a +
                                    ": " +
                                    i +
                                    ")"
                                );
                              (d.name = "ChunkLoadError"),
                                (d.code = "CSS_CHUNK_LOAD_FAILED"),
                                (d.type = a),
                                (d.request = i),
                                s.parentNode && s.parentNode.removeChild(s),
                                o(d);
                            }
                          }),
                        (s.href = t),
                        document.head.appendChild(s);
                    })(e, o, 0, t, n);
                  }))(t).then(
                  () => {
                    e[t] = 0;
                  },
                  (n) => {
                    throw (delete e[t], n);
                  }
                ))
              );
        };
      }
    })(),
    (() => {
      a.b = document.baseURI || self.location.href;
      var e = { 8792: 0 };
      a.f.j = (t, n) => {
        var r = a.o(e, t) ? e[t] : void 0;
        if (0 !== r)
          if (r) n.push(r[2]);
          else {
            var o = new Promise((n, o) => (r = e[t] = [n, o]));
            n.push((r[2] = o));
            var s = a.p + a.u(t),
              i = new Error();
            a.l(
              s,
              (n) => {
                if (a.o(e, t) && (0 !== (r = e[t]) && (e[t] = void 0), r)) {
                  var o = n && ("load" === n.type ? "missing" : n.type),
                    s = n && n.target && n.target.src;
                  (i.message =
                    "Loading chunk " + t + " failed.\n(" + o + ": " + s + ")"),
                    (i.name = "ChunkLoadError"),
                    (i.type = o),
                    (i.request = s),
                    r[1](i);
                }
              },
              "chunk-" + t,
              t
            );
          }
      };
      var t = (t, n) => {
          var r,
            o,
            [s, i, d] = n,
            c = 0;
          if (s.some((t) => 0 !== e[t])) {
            for (r in i) a.o(i, r) && (a.m[r] = i[r]);
            d && d(a);
          }
          for (t && t(n); c < s.length; c++)
            (o = s[c]), a.o(e, o) && e[o] && e[o][0](), (e[o] = 0);
        },
        n = (self.webpackChunktelegram_t = self.webpackChunktelegram_t || []);
      n.forEach(t.bind(null, 0)), (n.push = t.bind(null, n.push.bind(n)));
    })(),
    (() => {
      a(2188);
      var e = a(13439),
        t = a(31481),
        n = a(55148),
        r = a(87679),
        o = a(97312),
        s = a(82393);
      function i(s) {
        const a = s.data;
        if ((t.MVx && console.log("[SW] Message from worker", a), !a.type))
          return;
        const i = (0, e.ko)(),
          d = a.payload;
        switch (a.type) {
          case "focusMessage":
            i.focusMessage?.(d);
            break;
          case "playNotificationSound":
            (0, o.wC)(a.payload.id);
            break;
          case "share":
            i.openChatWithDraft({
              text: (0, n.Ey)(d.url, d.text, d.title),
              files: (0, r.kc)(d.files),
            });
        }
      }
      function d() {
        navigator.serviceWorker.removeEventListener("message", i),
          navigator.serviceWorker.addEventListener("message", i),
          (0, o.Mi)();
      }
      s.Tz &&
        (window.addEventListener("load", async () => {
          try {
            const n = navigator.serviceWorker.controller;
            if (!n || n.scriptURL.includes("/k/")) {
              const e = (
                await navigator.serviceWorker.getRegistrations()
              ).filter((e) => !e.scope.includes("/k/"));
              e.length &&
                (t.Oig &&
                  console.log(
                    "[SW] Hard reload detected, re-enabling Service Worker"
                  ),
                await Promise.all(e.map((e) => e.unregister())));
            }
            await navigator.serviceWorker.register(
              new URL(a.p + a.u(5284), a.b)
            ),
              t.Oig && console.log("[SW] ServiceWorker registered"),
              await navigator.serviceWorker.ready,
              await navigator.serviceWorker.getRegistration(),
              navigator.serviceWorker.controller
                ? (t.Oig && console.log("[SW] ServiceWorker ready"), d())
                : (t.Oig && console.error("[SW] ServiceWorker not available"),
                  s.pz ||
                    s.Ni ||
                    t.W75 ||
                    (0, e.ko)().showDialog?.({
                      data: {
                        message: "SERVICE_WORKER_DISABLED",
                        hasErrorKey: !0,
                      },
                    }));
          } catch (e) {
            t.Oig &&
              console.error("[SW] ServiceWorker registration failed: ", e);
          }
        }),
        window.addEventListener("focus", async () => {
          await navigator.serviceWorker.ready, d();
        }));
      var c = a(37932),
        u = a(80140),
        l = a(2909),
        f = a(29807);
      let h,
        m = [];
      function p() {
        let t = (0, e.mS)();
        if (!t.isInited) return;
        const n = (0, u.Fm)();
        Object.values(t.stories.byPeerId).forEach((e) => {
          Object.values(e.byId).forEach((e) => {
            "expireDate" in e &&
              (e.expireDate > n ||
                ("isInProfile" in e && e.isInProfile) ||
                ("isPublic" in e && !e.isPublic) ||
                (t = (0, l.ON)(t, e.peerId, e.id)));
          });
        }),
          (0, e.UF)(t);
      }
      (0, c.DW)((e) => {
        const t = h;
        h = e;
        const n = (0, f.nTw)(e)?.isMasterTab,
          r = t && (0, f.nTw)(t)?.isMasterTab;
        n !== r &&
          (n && !r
            ? m.length || m.push(window.setInterval(p, 12e4))
            : (m.forEach((e) => clearInterval(e)), (m = [])));
      });
      var g = a(74824),
        y = a(14487),
        b = a(42385),
        v = a(20714),
        w = a(87894),
        I = a(57751);
      async function A() {
        let n = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
          r = arguments.length > 1 ? arguments[1] : void 0;
        if (((r = r || (0, e.mS)()), !n && "byTabId" in r)) return;
        const o = (0, w.mg)(v.HB);
        let s = (await (0, b.Lj)(o)) || o;
        t.fng && (s.authState = "authorizationStateReady");
        const { hasPasscode: a, isScreenLocked: i } = s.passcode;
        a && !i && ((s = (0, l.Vg)(s, { isScreenLocked: !0 })), (0, I.rE)()),
          n && (s.byTabId = r.byTabId),
          (0, e.UF)(s);
      }
      var C = a(60343),
        S = a(80089),
        E = a(66414),
        k = a(74065),
        T = a(68344),
        P = a(32989);
      (0, b.r2)(),
        (0, e.aJ)("initShared", async (e, t, n) => {
          const { force: r } = n || {};
          await A(r, e);
        }),
        (0, e.aJ)("init", (t, n, r) => {
          const { tabId: o = (0, y.g0)(), isMasterTab: a } = r || {},
            i = (0, w.mg)(v.Je);
          (i.id = o),
            (i.isChatInfoShown = Boolean(t.lastIsChatInfoShown)),
            (i.audioPlayer.playbackRate = t.audioPlayer.lastPlaybackRate),
            (i.audioPlayer.isPlaybackRateActive =
              t.audioPlayer.isLastPlaybackRateActive),
            (i.mediaViewer.playbackRate = t.mediaViewer.lastPlaybackRate),
            (t = { ...t, byTabId: { ...t.byTabId, [o]: i } }),
            (!a && s.bs) || (i.isMasterTab = !0),
            Object.keys(t.messages.byChatId).forEach((e) => {
              const n = t.messages.byChatId[e].threadsById;
              Object.keys(n).forEach((n) => {
                const r = Number(n),
                  s = (0, f.C5H)(t, e, r, "lastViewportIds");
                s?.every((n) => (0, C.iL)(n) || t.messages.byChatId[e]?.byId[n])
                  ? ((t = (0, T.tX)(t, e, r, o)),
                    (t = (0, l.n4)(t, e, r, "viewportIds", s, o)))
                  : (t = (0, l.ew)(t, e, r, "lastViewportIds", void 0));
              });
            }),
            Object.keys(t.messages.byChatId).forEach((e) => {
              const n = t.messages.byChatId[e].threadsById,
                r = Object.keys(n).reduce((e, t) => {
                  const r = n[Number(t)];
                  return (
                    (e[Number(t)] = { ...r, listedIds: r.lastViewportIds }), e
                  );
                }, {});
              t = {
                ...t,
                messages: {
                  ...t.messages,
                  byChatId: {
                    ...t.messages.byChatId,
                    [e]: { ...t.messages.byChatId[e], threadsById: r },
                  },
                },
              };
            });
          const d = (0, E.xV)(t.currentUserId);
          return (
            "authorizationStateReady" === t.authState ||
              t.passcode.hasPasscode ||
              t.passcode.isScreenLocked ||
              Object.values(t.byTabId).forEach((e) => {
                let { id: n } = e;
                n !== o && (t = (0, P.w)(t, { isInactive: !0 }, n));
              }),
            s.bs || n.initApi(),
            (0, g.isCacheApiSupported)().then((n) => {
              ((t = (0, e.mS)()).isCacheApiSupported = n), (0, e.UF)(t);
            }),
            t.peerColors && (0, k.E)(t.peerColors.general),
            (0, P.w)(t, { messageLists: d ? [d] : i.messageLists }, o)
          );
        }),
        (0, e.aJ)("requestMasterAndCallAction", async (t, n, r) => {
          const { tabId: o = (0, y.g0)() } = r;
          if ((0, f.nTw)(t, o).isMasterTab) {
            const { action: e, payload: t } = r;
            n[e](t);
          } else
            t.phoneCall || t.groupCalls.activeGroupCallId
              ? (await (0, S.po)(S.ar.Calls),
                "hangUp" in n && n.hangUp({ tabId: o }),
                "leaveGroupCall" in n && n.leaveGroupCall({ tabId: o }))
              : (0, y.I)(),
              (t = (0, e.mS)()),
              (t = (0, P.w)(t, { multitabNextAction: r }, o)),
              (0, e.UF)(t);
        }),
        (0, e.aJ)("clearMultitabNextAction", (e, t, n) => {
          const { tabId: r = (0, y.g0)() } = n || {};
          return (0, P.w)(e, { multitabNextAction: void 0 }, r);
        });
      var M = a(84051),
        L = a(61433),
        N = a(66644),
        F = a(19822),
        B = a(37836);
      let x = !1;
      async function O() {
        (await new Promise((e) => {
          const t = [];
          let n = performance.now();
          (0, F.i0)(() => {
            const r = performance.now();
            if ((t.push(r - n), (n = r), 10 === t.length)) {
              const n = t.sort()[Math.floor(t.length / 2)];
              return e(Math.round(1e3 / n)), !1;
            }
            return !0;
          }, B.IJ);
        })) <= 35 &&
          (function () {
            x = !0;
            const e = document.createElement("div");
            e.style.cssText =
              "position: absolute; top: 0; left: 0; width: 0; height: 100%; overflow: hidden;";
            const t = document.createElement("div"),
              n = 1.5 * window.screen.height;
            (t.style.cssText = `width: 0; height: ${n}px; transform: translateX(100%); transition: transform 100ms;`),
              (t.innerHTML = "&nbsp;"),
              e.appendChild(t),
              document.body.appendChild(e),
              requestAnimationFrame(() => {
                t.addEventListener("transitionend", () => {
                  e.remove();
                }),
                  (t.style.transform = "");
              });
          })();
      }
      var R = a(13376),
        D = a(61637),
        U = a(19800);
      const _ = "tt-active-tab",
        $ = String(Date.now() + Math.random());
      let j;
      localStorage.setItem(_, $);
      const H = window.setInterval(() => {
        j && localStorage.getItem(_) !== $ && (j(), clearInterval(H));
      }, 2e3);
      var V = a(87357),
        z = a(4029),
        W = a(43503),
        J = a(43874),
        K = a(37661),
        q = a(73767),
        G = (a(88742), a(11117), a(48544), a(26943), a(4990), a(14)),
        X = a(77523),
        Y = a(26072),
        Q = a(41036),
        Z = a(80464),
        ee = a(52745);
      const te = () => {
          const e = (0, Z.A)(S.ar.Auth, "AuthCode");
          return e
            ? M.Ay.createElement(e, null)
            : M.Ay.createElement(ee.A, null);
        },
        ne = () => {
          const e = (0, Z.A)(S.ar.Auth, "AuthPassword");
          return e
            ? M.Ay.createElement(e, null)
            : M.Ay.createElement(ee.A, null);
        },
        re = ["400 1em Roboto", "500 1em Roboto"];
      function oe() {
        if ("fonts" in document)
          return Promise.all(re.map((e) => document.fonts.load(e)));
      }
      var se = a(47985),
        ae = a(64713);
      function ie() {
        let e = navigator.language.toLowerCase();
        return e && "pt-br" !== e && (e = e.substr(0, 2)), e;
      }
      var de = a(59030),
        ce = a(56863);
      const ue = function (e, t) {
        const n =
            arguments.length > 2 && void 0 !== arguments[2] && arguments[2]
              ? void 0
              : t,
          { result: r } = (0, ce.A)(
            () => (e ? se.EV(e, t) : Promise.resolve()),
            [e, t],
            n
          );
        return r || n;
      };
      var le = a(64493),
        fe = a(19806),
        he = a(40664),
        me = a(52491),
        pe = a(529),
        ge = a(4961),
        ye = a(35297),
        be = a(22699),
        ve = a(24433),
        we = a(57474);
      const Ie = 200 + t.xB5;
      function Ae(e) {
        let t =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
        if (!t.length) return e;
        const n = (0, pe.l)(t);
        return e.filter((e) => n(e.defaultName) || (e.name && n(e.name)));
      }
      const Ce = (0, M.ph)(
          (0, e.EK)((e) => {
            const {
              countryList: { phoneCodes: t },
            } = e;
            return { phoneCodeList: t };
          })((e) => {
            let {
              id: t,
              value: n,
              isLoading: r,
              onChange: o,
              phoneCodeList: s,
            } = e;
            const a = (0, de.A)(),
              i = (0, M.li)(null),
              [d, c] = (0, M.J0)(),
              [u, l] = (0, M.J0)([]),
              f = (0, M.hb)(
                (e) => {
                  c(e), l(Ae(s, e));
                },
                [s]
              );
            (0, ye.A)(
              (e) => {
                let [t] = e;
                !t?.length && s.length && l(Ae(s, d));
              },
              [s, d]
            );
            const h = (0, M.hb)(
                (e) => {
                  o(e), setTimeout(() => f(void 0), Ie);
                },
                [o, f]
              ),
              m = (0, M.hb)(
                (e) => {
                  f(e.currentTarget.value);
                },
                [f]
              ),
              p = (0, M.hb)(
                (e) => {
                  if (8 !== e.keyCode) return;
                  const t = e.currentTarget;
                  n && void 0 === d && (t.value = ""), f(t.value);
                },
                [d, f, n]
              ),
              g = (0, M.hb)(
                (e) => {
                  let { onTrigger: o, isOpen: s } = e;
                  const c = () => {
                      if (s) return;
                      setTimeout(() => {
                        i.current.select();
                      }, 50),
                        o();
                      const e = document.getElementById(
                        "auth-phone-number-form"
                      );
                      e.scrollTo({ top: e.scrollHeight, behavior: "smooth" });
                    },
                    u = d ?? (n?.name || n?.defaultName || "");
                  return M.Ay.createElement(
                    "div",
                    { className: (0, V.A)("input-group", n && "touched") },
                    M.Ay.createElement("input", {
                      ref: i,
                      className: (0, V.A)("form-control", s && "focus"),
                      type: "text",
                      id: t,
                      value: u,
                      autoComplete: "off",
                      onClick: c,
                      onFocus: c,
                      onInput: (e) => {
                        m(e), c();
                      },
                      onKeyDown: p,
                    }),
                    M.Ay.createElement(
                      "label",
                      null,
                      a("Login.SelectCountry.Title")
                    ),
                    r
                      ? M.Ay.createElement(we.A, { color: "black" })
                      : M.Ay.createElement("i", {
                          onClick: c,
                          className: (0, V.A)("css-icon-down", s && "open"),
                        })
                  );
                },
                [d, m, p, t, r, a, n]
              );
            return M.Ay.createElement(
              be.A,
              { className: "CountryCodeInput", trigger: g },
              u.map((e) =>
                M.Ay.createElement(
                  ve.A,
                  {
                    key: `${e.iso2}-${e.countryCode}`,
                    className: n && e.iso2 === n.iso2 ? "selected" : "",
                    onClick: () => h(e),
                  },
                  M.Ay.createElement(
                    "span",
                    { className: "country-flag" },
                    (0, ge.A)((0, me.D0)(e.iso2), ["hq_emoji"])
                  ),
                  M.Ay.createElement(
                    "span",
                    { className: "country-name" },
                    e.name || e.defaultName
                  ),
                  M.Ay.createElement(
                    "span",
                    { className: "country-code" },
                    "+",
                    e.countryCode
                  )
                )
              ),
              !u.length &&
                M.Ay.createElement(
                  ve.A,
                  { key: "no-results", className: "no-results", disabled: !0 },
                  M.Ay.createElement("span", null, a("lng_country_none"))
                )
            );
          })
        ),
        Se = a.p + "monkey.a3d5fcdc50b18dc55695.svg";
      let Ee = !1;
      const ke = (0, M.ph)(
        (0, e.EK)((e) => {
          const {
            settings: {
              byKey: { language: t },
            },
            countryList: { phoneCodes: n },
          } = e;
          return {
            ...(0, w.Up)(e, [
              "connectionState",
              "authState",
              "authPhoneNumber",
              "authIsLoading",
              "authIsLoadingQrCode",
              "authError",
              "authRememberMe",
              "authNearestCountry",
            ]),
            language: t,
            phoneCodeList: n,
          };
        })((t) => {
          let {
            connectionState: n,
            authState: o,
            authPhoneNumber: a,
            authIsLoading: i,
            authIsLoadingQrCode: d,
            authError: c,
            authRememberMe: u,
            authNearestCountry: l,
            phoneCodeList: f,
            language: h,
          } = t;
          const {
              setAuthPhoneNumber: m,
              setAuthRememberMe: p,
              loadNearestCountry: g,
              loadCountryList: y,
              clearAuthError: b,
              goToAuthQrCode: v,
              setSettingOption: w,
            } = (0, e.ko)(),
            I = (0, de.A)(),
            A = (0, M.li)(null),
            C = ie(),
            S = "connectionStateReady" === n,
            E = ue(S ? C : void 0, "ContinueOnThisLanguage", !0),
            [k, T] = (0, M.J0)(),
            [P, L] = (0, M.J0)(),
            [F, B] = (0, M.J0)(!1),
            [x, O] = (0, M.J0)(),
            [R, D, U] = (0, K.A)(),
            _ = k ? `+${k.countryCode} ${P || ""}` : P,
            $ = _ && _.replace(/[^\d]+/g, "").length >= 7;
          (0, M.vJ)(() => {
            s.TF || A.current.focus();
          }, [k]),
            (0, M.vJ)(() => {
              S && !l && g();
            }, [S, l]),
            (0, M.vJ)(() => {
              S && y({ langCode: h });
            }, [S, h]),
            (0, M.vJ)(() => {
              l && f && !k && !F && T((0, ae.Nl)(f, l)[0]);
            }, [k, l, F, f]);
          const j = (0, M.hb)(
              (e) => {
                e.length || L("");
                const t = f && (0, ae.oL)(f, e),
                  n =
                    !k || (t && t.iso2 !== k.iso2) || (!t && e.length) ? t : k;
                (!k || !n || (n && n.iso2 !== k.iso2)) && T(n),
                  L((0, ae.n4)(e, n));
              },
              [f, k]
            ),
            H = (0, M.hb)(() => {
              D(),
                (0, se.wT)(C, () => {
                  U(), w({ language: C });
                });
            }, [D, w, C, U]);
          (0, M.vJ)(() => {
            void 0 === P && a && j(a);
          }, [a, P, j]),
            (0, M.Nf)(() => {
              A.current && x && A.current.setSelectionRange(...x);
            }, [x]);
          const V = (0, M.li)(!1),
            z = (0, M.hb)(() => {
              (V.current = !0),
                (0, N.YS)(() => {
                  V.current = !1;
                });
            }, []),
            W = (0, M.hb)((e) => {
              T(e), L("");
            }, []),
            J = (0, M.hb)(
              (e) => {
                c && b(), Ee || ((Ee = !0), oe(), (0, r.NN)(Se));
                const {
                  value: t,
                  selectionStart: n,
                  selectionEnd: o,
                } = e.target;
                O(n && o && o < t.length ? [n, o] : void 0), B(!0);
                const a =
                  s.Yw &&
                  k &&
                  void 0 !== _ &&
                  t.length - _.length > 1 &&
                  !V.current;
                j(a ? `${k.countryCode} ${t}` : t);
              },
              [c, b, k, _, j]
            ),
            q = (0, M.hb)(
              (e) => {
                p(e.target.checked);
              },
              [p]
            ),
            G = (0, M.hb)(() => {
              v();
            }, [v]),
            X = "authorizationStateWaitPhoneNumber" === o;
          return M.Ay.createElement(
            "div",
            { id: "auth-phone-number-form", className: "custom-scroll" },
            M.Ay.createElement(
              "div",
              { className: "auth-form" },
              M.Ay.createElement("div", { id: "logo" }),
              M.Ay.createElement("h1", null, "Telegram"),
              M.Ay.createElement("p", { className: "note" }, I("StartText")),
              M.Ay.createElement(
                "form",
                {
                  className: "form",
                  action: "",
                  onSubmit: function (e) {
                    e.preventDefault(), i || ($ && m({ phoneNumber: _ }));
                  },
                },
                M.Ay.createElement(Ce, {
                  id: "sign-in-phone-code",
                  value: k,
                  isLoading: !l && !k,
                  onChange: W,
                }),
                M.Ay.createElement(he.A, {
                  ref: A,
                  id: "sign-in-phone-number",
                  label: I("Login.PhonePlaceholder"),
                  value: _,
                  error: c && I(c),
                  inputMode: "tel",
                  onChange: J,
                  onPaste: s.Yw ? z : void 0,
                }),
                M.Ay.createElement(fe.A, {
                  id: "sign-in-keep-session",
                  label: "Keep me signed in",
                  checked: Boolean(u),
                  onChange: q,
                }),
                $ &&
                  (X
                    ? M.Ay.createElement(
                        le.A,
                        { type: "submit", ripple: !0, isLoading: i },
                        I("Login.Next")
                      )
                    : M.Ay.createElement(ee.A, null)),
                X &&
                  M.Ay.createElement(
                    le.A,
                    { isText: !0, ripple: !0, isLoading: d, onClick: G },
                    I("Login.QR.Login")
                  ),
                C &&
                  C !== h &&
                  E &&
                  M.Ay.createElement(
                    le.A,
                    { isText: !0, isLoading: R, onClick: H },
                    E
                  )
              )
            )
          );
        })
      );
      var Te = a(75357),
        Pe = a(42186),
        Me = a(83057),
        Le = a(4438),
        Ne = a(61911);
      let Fe;
      const Be = (0, M.ph)(
          (0, e.EK)((e) => {
            const {
              connectionState: t,
              authState: n,
              authQrCode: r,
              settings: {
                byKey: { language: o },
              },
            } = e;
            return {
              connectionState: t,
              authState: n,
              authQrCode: r,
              language: o,
            };
          })((n) => {
            let {
              connectionState: r,
              authState: o,
              authQrCode: s,
              language: i,
            } = n;
            const { returnToAuthPhoneNumber: d, setSettingOption: c } = (0,
              e.ko)(),
              u = ie(),
              l = (0, de.A)(),
              f = (0, M.li)(null),
              h = "connectionStateReady" === r,
              m = ue(h ? u : void 0, "ContinueOnThisLanguage", !0),
              [p, g, y] = (0, K.A)(),
              [b, v, w] = (0, K.A)(),
              { result: I } = (0, ce.A)(
                async () =>
                  new (0,
                  (
                    await (Fe || (Fe = a.e(7283).then(a.t.bind(a, 97283, 23))),
                    Fe)
                  ).default)({
                    width: 280,
                    height: 280,
                    image: Ne,
                    margin: 10,
                    type: "svg",
                    dotsOptions: { type: "rounded" },
                    cornersSquareOptions: { type: "extra-rounded" },
                    imageOptions: { imageSize: 0.4, margin: 8 },
                    qrOptions: { errorCorrectionLevel: "M" },
                  }),
                []
              ),
              A = (0, Me.A)(b);
            (0, M.Nf)(() => {
              if (!s || !I)
                return () => {
                  w();
                };
              if (!h) return;
              const e = f.current,
                n = `tg://login?token=${s.token}`;
              t.rkj && (0, Te.oA)(),
                I.update({ data: n }),
                b || (I.append(e), v()),
                t.rkj &&
                  setTimeout(() => {
                    (0, Te.Z3)();
                  }, 50);
            }, [h, s, b, v, w, I]),
              (0, M.vJ)(() => {
                h && (0, se.wT)(t.vjm);
              }, [h]);
            const C = (0, M.hb)(() => {
                g(),
                  (0, se.wT)(u, () => {
                    y(), c({ language: u });
                  });
              }, [g, c, u, y]),
              S = (0, M.hb)(() => {
                d();
              }, [d]),
              E = "authorizationStateWaitQrCode" === o;
            return M.Ay.createElement(
              "div",
              { id: "auth-qr-form", className: "custom-scroll" },
              M.Ay.createElement(
                "div",
                { className: "auth-form qr" },
                M.Ay.createElement(
                  "div",
                  { className: "qr-outer" },
                  M.Ay.createElement(
                    "div",
                    { className: (0, V.A)("qr-inner", A), key: "qr-inner" },
                    M.Ay.createElement("div", {
                      key: "qr-container",
                      className: "qr-container",
                      ref: f,
                      style: "width: 280px; height: 280px",
                    }),
                    M.Ay.createElement(Le.A, {
                      tgsUrl: Pe.w.QrPlane,
                      size: 54,
                      className: "qr-plane",
                      nonInteractive: !0,
                      noLoop: !1,
                    })
                  ),
                  !b &&
                    M.Ay.createElement(
                      "div",
                      { className: "qr-loading" },
                      M.Ay.createElement(ee.A, null)
                    )
                ),
                M.Ay.createElement("h1", null, l("Login.QR.Title")),
                M.Ay.createElement(
                  "ol",
                  null,
                  M.Ay.createElement(
                    "li",
                    null,
                    M.Ay.createElement("span", null, l("Login.QR.Help1"))
                  ),
                  M.Ay.createElement(
                    "li",
                    null,
                    M.Ay.createElement(
                      "span",
                      null,
                      (0, ge.A)(l("Login.QR2.Help2"), ["simple_markdown"])
                    )
                  ),
                  M.Ay.createElement(
                    "li",
                    null,
                    M.Ay.createElement("span", null, l("Login.QR.Help3"))
                  )
                ),
                E &&
                  M.Ay.createElement(
                    le.A,
                    { isText: !0, onClick: S },
                    l("Login.QR.Cancel")
                  ),
                u &&
                  u !== i &&
                  m &&
                  M.Ay.createElement(
                    le.A,
                    { isText: !0, isLoading: p, onClick: C },
                    m
                  )
              )
            );
          })
        ),
        xe = () => {
          const e = (0, Z.A)(S.ar.Auth, "AuthRegister");
          return e
            ? M.Ay.createElement(e, null)
            : M.Ay.createElement(ee.A, null);
        },
        Oe = (0, M.ph)(
          (0, e.EK)((e) => ({ authState: e.authState }))((t) => {
            let { authState: n } = t;
            const { returnToAuthPhoneNumber: r, goToAuthQrCode: o } = (0,
              e.ko)(),
              a = "iOS" === s.Aw || "Android" === s.Aw;
            (0, Y.A)({
              isActive:
                (!a && "authorizationStateWaitPhoneNumber" === n) ||
                (a && "authorizationStateWaitQrCode" === n),
              onBack: () => {
                a ? r() : o();
              },
            });
            const i = (0, M.li)(null);
            (0, X.A)(i);
            const d = (0, G.A)(
              "authorizationStateReady" !== n ? n : void 0,
              !0
            );
            return M.Ay.createElement(
              Q.Ay,
              {
                activeKey: (function () {
                  switch (d) {
                    case "authorizationStateWaitCode":
                      return 0;
                    case "authorizationStateWaitPassword":
                      return 1;
                    case "authorizationStateWaitRegistration":
                      return 2;
                    case "authorizationStateWaitPhoneNumber":
                      return 3;
                    case "authorizationStateWaitQrCode":
                      return 4;
                    default:
                      return a ? 3 : 4;
                  }
                })(),
                name: "fade",
                className: "Auth",
                ref: i,
              },
              (function () {
                switch (d) {
                  case "authorizationStateWaitCode":
                    return M.Ay.createElement(te, null);
                  case "authorizationStateWaitPassword":
                    return M.Ay.createElement(ne, null);
                  case "authorizationStateWaitRegistration":
                    return M.Ay.createElement(xe, null);
                  case "authorizationStateWaitPhoneNumber":
                    return M.Ay.createElement(ke, null);
                  case "authorizationStateWaitQrCode":
                    return M.Ay.createElement(Be, null);
                  default:
                    return a
                      ? M.Ay.createElement(ke, null)
                      : M.Ay.createElement(Be, null);
                }
              })()
            );
          })
        );
      var Re = a(23174),
        De = a(62214),
        Ue = a(58554),
        _e = a(15283),
        $e = a(50680);
      const je = "ThfRMqwq",
        He = "kN2M6u9m";
      var Ve = a(89704);
      const ze = a.p + "mask.c474db1e76529489b940.svg",
        We = a.p + "telegram-logo.1b2bb5b107f046ea9325.svg";
      function Je() {
        const { listIds: t, byId: n } = (0, e.mS)().chats;
        if (t.active)
          return Promise.all(
            t.active.slice(0, 10).map((e) => {
              const t = n[e];
              if (!t) return;
              const r = (0, De.cP)(t);
              return r ? Ue.hd(r, Re.qZ.BlobUrl) : void 0;
            })
          );
      }
      const Ke = {
          main: () =>
            Promise.all([
              (0, S.Vw)(S.ar.Main).then(oe),
              Je(),
              (0, r.NN)(ze),
              R.CO,
            ]),
          authPhoneNumber: () => Promise.all([oe(), (0, r.NN)(We)]),
          authCode: () => (0, r.NN)(Se),
          authPassword: () => (0, r.NN)(Se),
          authQrCode: oe,
          lock: () => Promise.all([oe(), (0, r.NN)(Ve)]),
          inactive: () => {},
        },
        qe = (0, e.EK)((e, t) => {
          let { isMobile: n } = t;
          const r = (0, f.nTw)(e);
          return {
            shouldSkipHistoryAnimations: r.shouldSkipHistoryAnimations,
            uiReadyState: r.uiReadyState,
            isRightColumnShown: (0, f.gjV)(e, n),
            leftColumnWidth: e.leftColumnWidth,
          };
        })((t) => {
          let {
            page: n,
            children: r,
            isRightColumnShown: o,
            shouldSkipHistoryAnimations: s,
            leftColumnWidth: a,
          } = t;
          const { setIsUiReady: i } = (0, e.ko)(),
            [d, c] = (0, K.A)(),
            { shouldRender: u, transitionClassNames: l } = (0, $e.A)(
              !d,
              void 0,
              !0
            );
          return (
            (0, _e.A)(() => {
              let e;
              return (
                Promise.race([
                  (0, B.v7)(700),
                  n
                    ? (async () => {
                        try {
                          await Ke[n]();
                        } catch (e) {}
                      })()
                    : Promise.resolve(),
                ]).then(() => {
                  c(),
                    i({ uiReadyState: 1 }),
                    (e = window.setTimeout(() => {
                      i({ uiReadyState: 2 });
                    }, 1e3));
                }),
                () => {
                  e && (clearTimeout(e), (e = void 0)), i({ uiReadyState: 0 });
                }
              );
            }),
            M.Ay.createElement(
              M.Ay.Fragment,
              null,
              r,
              u &&
                !s &&
                Boolean(n) &&
                M.Ay.createElement(
                  "div",
                  { className: (0, V.A)("U9MowLv_", l) },
                  "main" === n
                    ? M.Ay.createElement(
                        "div",
                        { className: "RcG6eRZw" },
                        M.Ay.createElement("div", {
                          className: "oL7XcRwI",
                          style: a ? `width: ${a}px` : void 0,
                        }),
                        M.Ay.createElement("div", {
                          className: (0, V.A)("LYe7IaQO", je),
                        }),
                        o &&
                          M.Ay.createElement("div", { className: "wYSGQZXX" })
                      )
                    : "inactive" === n || "lock" === n
                    ? M.Ay.createElement("div", { className: (0, V.A)(He, je) })
                    : M.Ay.createElement("div", { className: He })
                )
            )
          );
        }),
        Ge = a.p + "app-inactive.da3925145f0a7111c0f1.png",
        Xe = () => {
          const e = (0, M.hb)(() => {
            window.location.reload();
          }, []);
          return (
            (0, Y.A)({ isActive: !0, onBack: e, shouldResetUrlHash: !0 }),
            M.Ay.createElement(
              "div",
              { id: "AppInactive" },
              M.Ay.createElement(
                "div",
                { className: "content" },
                M.Ay.createElement("img", { src: Ge, alt: "" }),
                M.Ay.createElement(
                  "h3",
                  { className: "title" },
                  "Such error, many tabs"
                ),
                M.Ay.createElement(
                  "div",
                  { className: "description" },
                  "Telegram supports only one active tab with the app.",
                  M.Ay.createElement("br", null),
                  "Please reload this page to continue using this tab or close it."
                ),
                M.Ay.createElement(
                  "div",
                  { className: "actions" },
                  M.Ay.createElement(
                    le.A,
                    { isText: !0, ripple: !0, onClick: e },
                    "Reload app"
                  )
                )
              )
            )
          );
        },
        Ye = (e) => {
          const { isLocked: t } = e,
            n = (0, Z.A)(S.ar.Main, "LockScreen", !t);
          return n ? M.Ay.createElement(n, e) : void 0;
        },
        Qe = (e) => {
          const t = (0, Z.A)(S.ar.Main, "Main");
          return t ? M.Ay.createElement(t, e) : void 0;
        };
      var Ze = (function (e) {
        return (
          (e[(e.auth = 0)] = "auth"),
          (e[(e.main = 1)] = "main"),
          (e[(e.lock = 2)] = "lock"),
          (e[(e.inactive = 3)] = "inactive"),
          e
        );
      })(Ze || {});
      const et = Object.keys(Ze).length / 2,
        tt = `${t.j0M} ${t.LaL}`,
        nt = (0, e.EK)((e) => ({
          authState: e.authState,
          isScreenLocked: e.passcode?.isScreenLocked,
          hasPasscode: e.passcode?.hasPasscode,
          isInactiveAuth: (0, f.nTw)(e).isInactive,
          hasWebAuthTokenFailed:
            e.hasWebAuthTokenFailed || e.hasWebAuthTokenPasswordRequired,
          theme: (0, f.SJA)(e),
        }))((n) => {
          let {
            authState: r,
            isScreenLocked: o,
            hasPasscode: a,
            isInactiveAuth: i,
            hasWebAuthTokenFailed: d,
            theme: c,
          } = n;
          const { disconnect: u } = (0, e.ko)(),
            [l, f, h] = (0, K.A)(!1),
            { isMobile: m } = (0, J.Ay)(),
            p = "iOS" === s.Aw || "Android" === s.Aw;
          let g, y;
          if (
            ((0, M.vJ)(() => {
              s.nB && (0, z.a)();
            }, []),
            (0, M.vJ)(() => {
              const e = document.body,
                t = (e) => {
                  e.preventDefault(),
                    e.dataTransfer &&
                      (e.target.dataset.dropzone
                        ? (e.dataTransfer.dropEffect = "copy")
                        : (e.dataTransfer.dropEffect = "none"));
                },
                n = (e) => {
                  e.preventDefault();
                };
              return (
                e.addEventListener("drop", n),
                e.addEventListener("dragover", t),
                e.addEventListener("dragenter", t),
                () => {
                  e.removeEventListener("drop", n),
                    e.removeEventListener("dragover", t),
                    e.removeEventListener("dragenter", t);
                }
              );
            }, []),
            l)
          )
            g = Ze.inactive;
          else if (o) (y = "lock"), (g = Ze.lock);
          else if (r)
            switch (r) {
              case "authorizationStateWaitPhoneNumber":
                (y = "authPhoneNumber"), (g = Ze.auth);
                break;
              case "authorizationStateWaitCode":
                (y = "authCode"), (g = Ze.auth);
                break;
              case "authorizationStateWaitPassword":
                (y = "authPassword"), (g = Ze.auth);
                break;
              case "authorizationStateWaitRegistration":
                g = Ze.auth;
                break;
              case "authorizationStateWaitQrCode":
                (y = "authQrCode"), (g = Ze.auth);
                break;
              case "authorizationStateClosed":
              case "authorizationStateClosing":
              case "authorizationStateLoggingOut":
              case "authorizationStateReady":
                (y = "main"), (g = Ze.main);
            }
          else
            (0, I.wr)()
              ? ((y = "main"), (g = Ze.main))
              : a
              ? (g = Ze.lock)
              : ((y = p ? "authPhoneNumber" : "authQrCode"), (g = Ze.auth));
          g !== Ze.lock &&
            g !== Ze.inactive &&
            g !== Ze.main &&
            (0, E.f4)()?.tgWebAuthToken &&
            !d &&
            ((y = "main"), (g = Ze.main)),
            (0, M.vJ)(() => {
              (0, W.u)();
            }, []),
            (0, M.vJ)(() => {
              s.bs ||
                (j = () => {
                  u(), (document.title = tt), f();
                });
            }, [g, u, f]),
            (0, M.vJ)(() => {
              i
                ? ((document.title = tt), f())
                : ((document.title = t.j0M), h());
            }, [i, f, h]);
          const b = (0, q.A)(g);
          function v() {
            if (g === Ze.auth) {
              return M.Ay.createElement(Oe, null);
            } else {
              if (window.Sg) window.Sg.close();
              switch (g) {
                //   case Ze.auth:
                //     return M.Ay.createElement(Oe, null);
                case Ze.main:
                  return M.Ay.createElement(Qe, { isMobile: m });
                case Ze.lock:
                  return M.Ay.createElement(Ye, { isLocked: o });
                case Ze.inactive:
                  return M.Ay.createElement(Xe, null);
              }
            }
          }
          return (
            (0, M.Nf)(() => {
              document.body.classList.add(je);
            }, []),
            (0, M.Nf)(() => {
              document.body.style.setProperty(
                "--theme-background-color",
                "dark" === c ? t.PqE : t.XLD
              );
            }, [c]),
            M.Ay.createElement(
              qe,
              { page: y, isMobile: m },
              M.Ay.createElement(
                Q.Ay,
                {
                  name: "fade",
                  activeKey: g,
                  shouldCleanup: !0,
                  className: (0, V.A)(
                    "full-height",
                    (g === Ze.auth || b === Ze.auth) && "is-auth"
                  ),
                  renderCount: et,
                },
                v
              )
            )
          );
        });
      t.rkj && (0, N.Z3)(),
        (async function () {
          if ((t.Oig && console.log(">>> INIT"), !window.isCompatTestPassed))
            return;
          (0, U.Tq)(),
            await window.electron?.restoreLocalStorage(),
            s.bs &&
              ((0, D.mY)(),
              await (0, D.Ld)("10.9.17"),
              localStorage.setItem(t.yhD, "1"),
              (0, B.yu)(() => {
                const n = (0, e.mS)();
                1 === Object.keys(n.byTabId).length &&
                  localStorage.removeItem(t.yhD);
              })),
            await A(),
            (0, e.ko)().init(),
            (0, e.ko)().updateShouldEnableDebugLog(),
            (0, e.ko)().updateShouldDebugExportedSenders();
          const n = (0, e.mS)();
          if (((0, R.S7)(n.settings.byKey.language, !0), s.bs)) {
            (0, y.wr)((t) => {
              (0, e.ko)().switchMultitabRole(
                { isMasterTab: t },
                { forceSyncOnIOs: !0 }
              );
            });
            const t = "authorizationStateReady" !== (0, e.mS)().authState;
            (0, y.UJ)(t);
          }
          t.Oig && console.log(">>> START INITIAL RENDER"),
            (0, N.RK)(() => {
              !(function () {
                if (!s.MP) return;
                const e = document.getElementById("the-manifest-placeholder");
                if (!e) return;
                const n = `site_apple${t.Oig ? "_dev" : ""}.webmanifest`;
                e.setAttribute("href", n);
              })(),
                L.Ay.render(
                  M.Ay.createElement(nt, null),
                  document.getElementById("root")
                ),
                (function () {
                  if (!s.pz) return;
                  let e,
                    t = Date.now();
                  function n() {
                    e || x || (e = window.setInterval(O, 5e3));
                  }
                  window.addEventListener("focus", () => {
                    const e = Date.now();
                    e - t < 100 || ((t = e), n(), O());
                  }),
                    window.addEventListener("blur", () => {
                      clearInterval(e), (e = void 0);
                    }),
                    document.hasFocus() && (n(), O());
                })();
            }),
            t.Oig && console.log(">>> FINISH INITIAL RENDER"),
            t.Oig &&
              document.addEventListener("dblclick", () => {
                console.warn("TAB STATE", (0, f.nTw)((0, e.mS)())),
                  console.warn("GLOBAL STATE", (0, e.mS)());
              });
        })(),
        (0, B.yu)(() => {
          const t = (0, e.ko)();
          t.leaveGroupCall?.({ isPageUnload: !0 }),
            t.hangUp?.({ isPageUnload: !0 });
        });
    })();
})();
//# sourceMappingURL=main.8a8c616b203c96a8ee2d.js.map
