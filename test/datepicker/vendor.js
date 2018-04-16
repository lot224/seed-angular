(function(window, undefined) {'use strict';


if (function(global, factory) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = global.document ? factory(global, !0) : function(w) {
        if (!w.document) throw new Error("jQuery requires a window with a document");
        return factory(w);
    } : factory(global);
}("undefined" != typeof window ? window : this, function(window, noGlobal) {
    function isArraylike(obj) {
        var length = "length" in obj && obj.length, type = jQuery.type(obj);
        return "function" === type || jQuery.isWindow(obj) ? !1 : 1 === obj.nodeType && length ? !0 : "array" === type || 0 === length || "number" == typeof length && length > 0 && length - 1 in obj;
    }
    function winnow(elements, qualifier, not) {
        if (jQuery.isFunction(qualifier)) return jQuery.grep(elements, function(elem, i) {
            return !!qualifier.call(elem, i, elem) !== not;
        });
        if (qualifier.nodeType) return jQuery.grep(elements, function(elem) {
            return elem === qualifier !== not;
        });
        if ("string" == typeof qualifier) {
            if (risSimple.test(qualifier)) return jQuery.filter(qualifier, elements, not);
            qualifier = jQuery.filter(qualifier, elements);
        }
        return jQuery.grep(elements, function(elem) {
            return jQuery.inArray(elem, qualifier) >= 0 !== not;
        });
    }
    function sibling(cur, dir) {
        do cur = cur[dir]; while (cur && 1 !== cur.nodeType);
        return cur;
    }
    function createOptions(options) {
        var object = optionsCache[options] = {};
        return jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
            object[flag] = !0;
        }), object;
    }
    function detach() {
        document.addEventListener ? (document.removeEventListener("DOMContentLoaded", completed, !1), 
        window.removeEventListener("load", completed, !1)) : (document.detachEvent("onreadystatechange", completed), 
        window.detachEvent("onload", completed));
    }
    function completed() {
        (document.addEventListener || "load" === event.type || "complete" === document.readyState) && (detach(), 
        jQuery.ready());
    }
    function dataAttr(elem, key, data) {
        if (void 0 === data && 1 === elem.nodeType) {
            var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
            if (data = elem.getAttribute(name), "string" == typeof data) {
                try {
                    data = "true" === data ? !0 : "false" === data ? !1 : "null" === data ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
                } catch (e) {}
                jQuery.data(elem, key, data);
            } else data = void 0;
        }
        return data;
    }
    function isEmptyDataObject(obj) {
        var name;
        for (name in obj) if (("data" !== name || !jQuery.isEmptyObject(obj[name])) && "toJSON" !== name) return !1;
        return !0;
    }
    function internalData(elem, name, data, pvt) {
        if (jQuery.acceptData(elem)) {
            var ret, thisCache, internalKey = jQuery.expando, isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem, id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
            if (id && cache[id] && (pvt || cache[id].data) || void 0 !== data || "string" != typeof name) return id || (id = isNode ? elem[internalKey] = deletedIds.pop() || jQuery.guid++ : internalKey), 
            cache[id] || (cache[id] = isNode ? {} : {
                toJSON: jQuery.noop
            }), ("object" == typeof name || "function" == typeof name) && (pvt ? cache[id] = jQuery.extend(cache[id], name) : cache[id].data = jQuery.extend(cache[id].data, name)), 
            thisCache = cache[id], pvt || (thisCache.data || (thisCache.data = {}), thisCache = thisCache.data), 
            void 0 !== data && (thisCache[jQuery.camelCase(name)] = data), "string" == typeof name ? (ret = thisCache[name], 
            null == ret && (ret = thisCache[jQuery.camelCase(name)])) : ret = thisCache, ret;
        }
    }
    function internalRemoveData(elem, name, pvt) {
        if (jQuery.acceptData(elem)) {
            var thisCache, i, isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem, id = isNode ? elem[jQuery.expando] : jQuery.expando;
            if (cache[id]) {
                if (name && (thisCache = pvt ? cache[id] : cache[id].data)) {
                    jQuery.isArray(name) ? name = name.concat(jQuery.map(name, jQuery.camelCase)) : name in thisCache ? name = [ name ] : (name = jQuery.camelCase(name), 
                    name = name in thisCache ? [ name ] : name.split(" ")), i = name.length;
                    for (;i--; ) delete thisCache[name[i]];
                    if (pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache)) return;
                }
                (pvt || (delete cache[id].data, isEmptyDataObject(cache[id]))) && (isNode ? jQuery.cleanData([ elem ], !0) : support.deleteExpando || cache != cache.window ? delete cache[id] : cache[id] = null);
            }
        }
    }
    function returnTrue() {
        return !0;
    }
    function returnFalse() {
        return !1;
    }
    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch (err) {}
    }
    function createSafeFragment(document) {
        var list = nodeNames.split("|"), safeFrag = document.createDocumentFragment();
        if (safeFrag.createElement) for (;list.length; ) safeFrag.createElement(list.pop());
        return safeFrag;
    }
    function getAll(context, tag) {
        var elems, elem, i = 0, found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== strundefined ? context.querySelectorAll(tag || "*") : void 0;
        if (!found) for (found = [], elems = context.childNodes || context; null != (elem = elems[i]); i++) !tag || jQuery.nodeName(elem, tag) ? found.push(elem) : jQuery.merge(found, getAll(elem, tag));
        return void 0 === tag || tag && jQuery.nodeName(context, tag) ? jQuery.merge([ context ], found) : found;
    }
    function fixDefaultChecked(elem) {
        rcheckableType.test(elem.type) && (elem.defaultChecked = elem.checked);
    }
    function manipulationTarget(elem, content) {
        return jQuery.nodeName(elem, "table") && jQuery.nodeName(11 !== content.nodeType ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
    }
    function disableScript(elem) {
        return elem.type = (null !== jQuery.find.attr(elem, "type")) + "/" + elem.type, 
        elem;
    }
    function restoreScript(elem) {
        var match = rscriptTypeMasked.exec(elem.type);
        return match ? elem.type = match[1] : elem.removeAttribute("type"), elem;
    }
    function setGlobalEval(elems, refElements) {
        for (var elem, i = 0; null != (elem = elems[i]); i++) jQuery._data(elem, "globalEval", !refElements || jQuery._data(refElements[i], "globalEval"));
    }
    function cloneCopyEvent(src, dest) {
        if (1 === dest.nodeType && jQuery.hasData(src)) {
            var type, i, l, oldData = jQuery._data(src), curData = jQuery._data(dest, oldData), events = oldData.events;
            if (events) {
                delete curData.handle, curData.events = {};
                for (type in events) for (i = 0, l = events[type].length; l > i; i++) jQuery.event.add(dest, type, events[type][i]);
            }
            curData.data && (curData.data = jQuery.extend({}, curData.data));
        }
    }
    function fixCloneNodeIssues(src, dest) {
        var nodeName, e, data;
        if (1 === dest.nodeType) {
            if (nodeName = dest.nodeName.toLowerCase(), !support.noCloneEvent && dest[jQuery.expando]) {
                data = jQuery._data(dest);
                for (e in data.events) jQuery.removeEvent(dest, e, data.handle);
                dest.removeAttribute(jQuery.expando);
            }
            "script" === nodeName && dest.text !== src.text ? (disableScript(dest).text = src.text, 
            restoreScript(dest)) : "object" === nodeName ? (dest.parentNode && (dest.outerHTML = src.outerHTML), 
            support.html5Clone && src.innerHTML && !jQuery.trim(dest.innerHTML) && (dest.innerHTML = src.innerHTML)) : "input" === nodeName && rcheckableType.test(src.type) ? (dest.defaultChecked = dest.checked = src.checked, 
            dest.value !== src.value && (dest.value = src.value)) : "option" === nodeName ? dest.defaultSelected = dest.selected = src.defaultSelected : ("input" === nodeName || "textarea" === nodeName) && (dest.defaultValue = src.defaultValue);
        }
    }
    function actualDisplay(name, doc) {
        var style, elem = jQuery(doc.createElement(name)).appendTo(doc.body), display = window.getDefaultComputedStyle && (style = window.getDefaultComputedStyle(elem[0])) ? style.display : jQuery.css(elem[0], "display");
        return elem.detach(), display;
    }
    function defaultDisplay(nodeName) {
        var doc = document, display = elemdisplay[nodeName];
        return display || (display = actualDisplay(nodeName, doc), "none" !== display && display || (iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement), 
        doc = (iframe[0].contentWindow || iframe[0].contentDocument).document, doc.write(), 
        doc.close(), display = actualDisplay(nodeName, doc), iframe.detach()), elemdisplay[nodeName] = display), 
        display;
    }
    function addGetHookIf(conditionFn, hookFn) {
        return {
            get: function() {
                var condition = conditionFn();
                if (null != condition) return condition ? void delete this.get : (this.get = hookFn).apply(this, arguments);
            }
        };
    }
    function vendorPropName(style, name) {
        if (name in style) return name;
        for (var capName = name.charAt(0).toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length; i--; ) if (name = cssPrefixes[i] + capName, 
        name in style) return name;
        return origName;
    }
    function showHide(elements, show) {
        for (var display, elem, hidden, values = [], index = 0, length = elements.length; length > index; index++) elem = elements[index], 
        elem.style && (values[index] = jQuery._data(elem, "olddisplay"), display = elem.style.display, 
        show ? (values[index] || "none" !== display || (elem.style.display = ""), "" === elem.style.display && isHidden(elem) && (values[index] = jQuery._data(elem, "olddisplay", defaultDisplay(elem.nodeName)))) : (hidden = isHidden(elem), 
        (display && "none" !== display || !hidden) && jQuery._data(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"))));
        for (index = 0; length > index; index++) elem = elements[index], elem.style && (show && "none" !== elem.style.display && "" !== elem.style.display || (elem.style.display = show ? values[index] || "" : "none"));
        return elements;
    }
    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value;
    }
    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
        for (var i = extra === (isBorderBox ? "border" : "content") ? 4 : "width" === name ? 1 : 0, val = 0; 4 > i; i += 2) "margin" === extra && (val += jQuery.css(elem, extra + cssExpand[i], !0, styles)), 
        isBorderBox ? ("content" === extra && (val -= jQuery.css(elem, "padding" + cssExpand[i], !0, styles)), 
        "margin" !== extra && (val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles))) : (val += jQuery.css(elem, "padding" + cssExpand[i], !0, styles), 
        "padding" !== extra && (val += jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles)));
        return val;
    }
    function getWidthOrHeight(elem, name, extra) {
        var valueIsBorderBox = !0, val = "width" === name ? elem.offsetWidth : elem.offsetHeight, styles = getStyles(elem), isBorderBox = support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing", !1, styles);
        if (0 >= val || null == val) {
            if (val = curCSS(elem, name, styles), (0 > val || null == val) && (val = elem.style[name]), 
            rnumnonpx.test(val)) return val;
            valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]), 
            val = parseFloat(val) || 0;
        }
        return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
    }
    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
    }
    function createFxNow() {
        return setTimeout(function() {
            fxNow = void 0;
        }), fxNow = jQuery.now();
    }
    function genFx(type, includeWidth) {
        var which, attrs = {
            height: type
        }, i = 0;
        for (includeWidth = includeWidth ? 1 : 0; 4 > i; i += 2 - includeWidth) which = cssExpand[i], 
        attrs["margin" + which] = attrs["padding" + which] = type;
        return includeWidth && (attrs.opacity = attrs.width = type), attrs;
    }
    function createTween(value, prop, animation) {
        for (var tween, collection = (tweeners[prop] || []).concat(tweeners["*"]), index = 0, length = collection.length; length > index; index++) if (tween = collection[index].call(animation, prop, value)) return tween;
    }
    function defaultPrefilter(elem, props, opts) {
        var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHidden(elem), dataShow = jQuery._data(elem, "fxshow");
        opts.queue || (hooks = jQuery._queueHooks(elem, "fx"), null == hooks.unqueued && (hooks.unqueued = 0, 
        oldfire = hooks.empty.fire, hooks.empty.fire = function() {
            hooks.unqueued || oldfire();
        }), hooks.unqueued++, anim.always(function() {
            anim.always(function() {
                hooks.unqueued--, jQuery.queue(elem, "fx").length || hooks.empty.fire();
            });
        })), 1 === elem.nodeType && ("height" in props || "width" in props) && (opts.overflow = [ style.overflow, style.overflowX, style.overflowY ], 
        display = jQuery.css(elem, "display"), checkDisplay = "none" === display ? jQuery._data(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display, 
        "inline" === checkDisplay && "none" === jQuery.css(elem, "float") && (support.inlineBlockNeedsLayout && "inline" !== defaultDisplay(elem.nodeName) ? style.zoom = 1 : style.display = "inline-block")), 
        opts.overflow && (style.overflow = "hidden", support.shrinkWrapBlocks() || anim.always(function() {
            style.overflow = opts.overflow[0], style.overflowX = opts.overflow[1], style.overflowY = opts.overflow[2];
        }));
        for (prop in props) if (value = props[prop], rfxtypes.exec(value)) {
            if (delete props[prop], toggle = toggle || "toggle" === value, value === (hidden ? "hide" : "show")) {
                if ("show" !== value || !dataShow || void 0 === dataShow[prop]) continue;
                hidden = !0;
            }
            orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
        } else display = void 0;
        if (jQuery.isEmptyObject(orig)) "inline" === ("none" === display ? defaultDisplay(elem.nodeName) : display) && (style.display = display); else {
            dataShow ? "hidden" in dataShow && (hidden = dataShow.hidden) : dataShow = jQuery._data(elem, "fxshow", {}), 
            toggle && (dataShow.hidden = !hidden), hidden ? jQuery(elem).show() : anim.done(function() {
                jQuery(elem).hide();
            }), anim.done(function() {
                var prop;
                jQuery._removeData(elem, "fxshow");
                for (prop in orig) jQuery.style(elem, prop, orig[prop]);
            });
            for (prop in orig) tween = createTween(hidden ? dataShow[prop] : 0, prop, anim), 
            prop in dataShow || (dataShow[prop] = tween.start, hidden && (tween.end = tween.start, 
            tween.start = "width" === prop || "height" === prop ? 1 : 0));
        }
    }
    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props) if (name = jQuery.camelCase(index), easing = specialEasing[name], 
        value = props[index], jQuery.isArray(value) && (easing = value[1], value = props[index] = value[0]), 
        index !== name && (props[name] = value, delete props[index]), hooks = jQuery.cssHooks[name], 
        hooks && "expand" in hooks) {
            value = hooks.expand(value), delete props[name];
            for (index in value) index in props || (props[index] = value[index], specialEasing[index] = easing);
        } else specialEasing[name] = easing;
    }
    function Animation(elem, properties, options) {
        var result, stopped, index = 0, length = animationPrefilters.length, deferred = jQuery.Deferred().always(function() {
            delete tick.elem;
        }), tick = function() {
            if (stopped) return !1;
            for (var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length; length > index; index++) animation.tweens[index].run(percent);
            return deferred.notifyWith(elem, [ animation, percent, remaining ]), 1 > percent && length ? remaining : (deferred.resolveWith(elem, [ animation ]), 
            !1);
        }, animation = deferred.promise({
            elem: elem,
            props: jQuery.extend({}, properties),
            opts: jQuery.extend(!0, {
                specialEasing: {}
            }, options),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function(prop, end) {
                var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                return animation.tweens.push(tween), tween;
            },
            stop: function(gotoEnd) {
                var index = 0, length = gotoEnd ? animation.tweens.length : 0;
                if (stopped) return this;
                for (stopped = !0; length > index; index++) animation.tweens[index].run(1);
                return gotoEnd ? deferred.resolveWith(elem, [ animation, gotoEnd ]) : deferred.rejectWith(elem, [ animation, gotoEnd ]), 
                this;
            }
        }), props = animation.props;
        for (propFilter(props, animation.opts.specialEasing); length > index; index++) if (result = animationPrefilters[index].call(animation, elem, props, animation.opts)) return result;
        return jQuery.map(props, createTween, animation), jQuery.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation), 
        jQuery.fx.timer(jQuery.extend(tick, {
            elem: elem,
            anim: animation,
            queue: animation.opts.queue
        })), animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
    }
    function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
            "string" != typeof dataTypeExpression && (func = dataTypeExpression, dataTypeExpression = "*");
            var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
            if (jQuery.isFunction(func)) for (;dataType = dataTypes[i++]; ) "+" === dataType.charAt(0) ? (dataType = dataType.slice(1) || "*", 
            (structure[dataType] = structure[dataType] || []).unshift(func)) : (structure[dataType] = structure[dataType] || []).push(func);
        };
    }
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        function inspect(dataType) {
            var selected;
            return inspected[dataType] = !0, jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                return "string" != typeof dataTypeOrTransport || seekingTransport || inspected[dataTypeOrTransport] ? seekingTransport ? !(selected = dataTypeOrTransport) : void 0 : (options.dataTypes.unshift(dataTypeOrTransport), 
                inspect(dataTypeOrTransport), !1);
            }), selected;
        }
        var inspected = {}, seekingTransport = structure === transports;
        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
    }
    function ajaxExtend(target, src) {
        var deep, key, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) void 0 !== src[key] && ((flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]);
        return deep && jQuery.extend(!0, target, deep), target;
    }
    function ajaxHandleResponses(s, jqXHR, responses) {
        for (var firstDataType, ct, finalDataType, type, contents = s.contents, dataTypes = s.dataTypes; "*" === dataTypes[0]; ) dataTypes.shift(), 
        void 0 === ct && (ct = s.mimeType || jqXHR.getResponseHeader("Content-Type"));
        if (ct) for (type in contents) if (contents[type] && contents[type].test(ct)) {
            dataTypes.unshift(type);
            break;
        }
        if (dataTypes[0] in responses) finalDataType = dataTypes[0]; else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                firstDataType || (firstDataType = type);
            }
            finalDataType = finalDataType || firstDataType;
        }
        return finalDataType ? (finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), 
        responses[finalDataType]) : void 0;
    }
    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
        if (dataTypes[1]) for (conv in s.converters) converters[conv.toLowerCase()] = s.converters[conv];
        for (current = dataTypes.shift(); current; ) if (s.responseFields[current] && (jqXHR[s.responseFields[current]] = response), 
        !prev && isSuccess && s.dataFilter && (response = s.dataFilter(response, s.dataType)), 
        prev = current, current = dataTypes.shift()) if ("*" === current) current = prev; else if ("*" !== prev && prev !== current) {
            if (conv = converters[prev + " " + current] || converters["* " + current], !conv) for (conv2 in converters) if (tmp = conv2.split(" "), 
            tmp[1] === current && (conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]])) {
                conv === !0 ? conv = converters[conv2] : converters[conv2] !== !0 && (current = tmp[0], 
                dataTypes.unshift(tmp[1]));
                break;
            }
            if (conv !== !0) if (conv && s["throws"]) response = conv(response); else try {
                response = conv(response);
            } catch (e) {
                return {
                    state: "parsererror",
                    error: conv ? e : "No conversion from " + prev + " to " + current
                };
            }
        }
        return {
            state: "success",
            data: response
        };
    }
    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (jQuery.isArray(obj)) jQuery.each(obj, function(i, v) {
            traditional || rbracket.test(prefix) ? add(prefix, v) : buildParams(prefix + "[" + ("object" == typeof v ? i : "") + "]", v, traditional, add);
        }); else if (traditional || "object" !== jQuery.type(obj)) add(prefix, obj); else for (name in obj) buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
    }
    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest();
        } catch (e) {}
    }
    function createActiveXHR() {
        try {
            return new window.ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {}
    }
    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : 9 === elem.nodeType ? elem.defaultView || elem.parentWindow : !1;
    }
    var deletedIds = [], slice = deletedIds.slice, concat = deletedIds.concat, push = deletedIds.push, indexOf = deletedIds.indexOf, class2type = {}, toString = class2type.toString, hasOwn = class2type.hasOwnProperty, support = {}, version = "1.11.3", jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context);
    }, rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, fcamelCase = function(all, letter) {
        return letter.toUpperCase();
    };
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,
        selector: "",
        length: 0,
        toArray: function() {
            return slice.call(this);
        },
        get: function(num) {
            return null != num ? 0 > num ? this[num + this.length] : this[num] : slice.call(this);
        },
        pushStack: function(elems) {
            var ret = jQuery.merge(this.constructor(), elems);
            return ret.prevObject = this, ret.context = this.context, ret;
        },
        each: function(callback, args) {
            return jQuery.each(this, callback, args);
        },
        map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
                return callback.call(elem, i, elem);
            }));
        },
        slice: function() {
            return this.pushStack(slice.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(i) {
            var len = this.length, j = +i + (0 > i ? len : 0);
            return this.pushStack(j >= 0 && len > j ? [ this[j] ] : []);
        },
        end: function() {
            return this.prevObject || this.constructor(null);
        },
        push: push,
        sort: deletedIds.sort,
        splice: deletedIds.splice
    }, jQuery.extend = jQuery.fn.extend = function() {
        var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = !1;
        for ("boolean" == typeof target && (deep = target, target = arguments[i] || {}, 
        i++), "object" == typeof target || jQuery.isFunction(target) || (target = {}), i === length && (target = this, 
        i--); length > i; i++) if (null != (options = arguments[i])) for (name in options) src = target[name], 
        copy = options[name], target !== copy && (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1, 
        clone = src && jQuery.isArray(src) ? src : []) : clone = src && jQuery.isPlainObject(src) ? src : {}, 
        target[name] = jQuery.extend(deep, clone, copy)) : void 0 !== copy && (target[name] = copy));
        return target;
    }, jQuery.extend({
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(msg) {
            throw new Error(msg);
        },
        noop: function() {},
        isFunction: function(obj) {
            return "function" === jQuery.type(obj);
        },
        isArray: Array.isArray || function(obj) {
            return "array" === jQuery.type(obj);
        },
        isWindow: function(obj) {
            return null != obj && obj == obj.window;
        },
        isNumeric: function(obj) {
            return !jQuery.isArray(obj) && obj - parseFloat(obj) + 1 >= 0;
        },
        isEmptyObject: function(obj) {
            var name;
            for (name in obj) return !1;
            return !0;
        },
        isPlainObject: function(obj) {
            var key;
            if (!obj || "object" !== jQuery.type(obj) || obj.nodeType || jQuery.isWindow(obj)) return !1;
            try {
                if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) return !1;
            } catch (e) {
                return !1;
            }
            if (support.ownLast) for (key in obj) return hasOwn.call(obj, key);
            for (key in obj) ;
            return void 0 === key || hasOwn.call(obj, key);
        },
        type: function(obj) {
            return null == obj ? obj + "" : "object" == typeof obj || "function" == typeof obj ? class2type[toString.call(obj)] || "object" : typeof obj;
        },
        globalEval: function(data) {
            data && jQuery.trim(data) && (window.execScript || function(data) {
                window.eval.call(window, data);
            })(data);
        },
        camelCase: function(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },
        nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },
        each: function(obj, callback, args) {
            var value, i = 0, length = obj.length, isArray = isArraylike(obj);
            if (args) {
                if (isArray) for (;length > i && (value = callback.apply(obj[i], args), value !== !1); i++) ; else for (i in obj) if (value = callback.apply(obj[i], args), 
                value === !1) break;
            } else if (isArray) for (;length > i && (value = callback.call(obj[i], i, obj[i]), 
            value !== !1); i++) ; else for (i in obj) if (value = callback.call(obj[i], i, obj[i]), 
            value === !1) break;
            return obj;
        },
        trim: function(text) {
            return null == text ? "" : (text + "").replace(rtrim, "");
        },
        makeArray: function(arr, results) {
            var ret = results || [];
            return null != arr && (isArraylike(Object(arr)) ? jQuery.merge(ret, "string" == typeof arr ? [ arr ] : arr) : push.call(ret, arr)), 
            ret;
        },
        inArray: function(elem, arr, i) {
            var len;
            if (arr) {
                if (indexOf) return indexOf.call(arr, elem, i);
                for (len = arr.length, i = i ? 0 > i ? Math.max(0, len + i) : i : 0; len > i; i++) if (i in arr && arr[i] === elem) return i;
            }
            return -1;
        },
        merge: function(first, second) {
            for (var len = +second.length, j = 0, i = first.length; len > j; ) first[i++] = second[j++];
            if (len !== len) for (;void 0 !== second[j]; ) first[i++] = second[j++];
            return first.length = i, first;
        },
        grep: function(elems, callback, invert) {
            for (var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert; length > i; i++) callbackInverse = !callback(elems[i], i), 
            callbackInverse !== callbackExpect && matches.push(elems[i]);
            return matches;
        },
        map: function(elems, callback, arg) {
            var value, i = 0, length = elems.length, isArray = isArraylike(elems), ret = [];
            if (isArray) for (;length > i; i++) value = callback(elems[i], i, arg), null != value && ret.push(value); else for (i in elems) value = callback(elems[i], i, arg), 
            null != value && ret.push(value);
            return concat.apply([], ret);
        },
        guid: 1,
        proxy: function(fn, context) {
            var args, proxy, tmp;
            return "string" == typeof context && (tmp = fn[context], context = fn, fn = tmp), 
            jQuery.isFunction(fn) ? (args = slice.call(arguments, 2), proxy = function() {
                return fn.apply(context || this, args.concat(slice.call(arguments)));
            }, proxy.guid = fn.guid = fn.guid || jQuery.guid++, proxy) : void 0;
        },
        now: function() {
            return +new Date();
        },
        support: support
    }), jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });
    var Sizzle = function(window) {
        function Sizzle(selector, context, results, seed) {
            var match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;
            if ((context ? context.ownerDocument || context : preferredDoc) !== document && setDocument(context), 
            context = context || document, results = results || [], nodeType = context.nodeType, 
            "string" != typeof selector || !selector || 1 !== nodeType && 9 !== nodeType && 11 !== nodeType) return results;
            if (!seed && documentIsHTML) {
                if (11 !== nodeType && (match = rquickExpr.exec(selector))) if (m = match[1]) {
                    if (9 === nodeType) {
                        if (elem = context.getElementById(m), !elem || !elem.parentNode) return results;
                        if (elem.id === m) return results.push(elem), results;
                    } else if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) return results.push(elem), 
                    results;
                } else {
                    if (match[2]) return push.apply(results, context.getElementsByTagName(selector)), 
                    results;
                    if ((m = match[3]) && support.getElementsByClassName) return push.apply(results, context.getElementsByClassName(m)), 
                    results;
                }
                if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                    if (nid = old = expando, newContext = context, newSelector = 1 !== nodeType && selector, 
                    1 === nodeType && "object" !== context.nodeName.toLowerCase()) {
                        for (groups = tokenize(selector), (old = context.getAttribute("id")) ? nid = old.replace(rescape, "\\$&") : context.setAttribute("id", nid), 
                        nid = "[id='" + nid + "'] ", i = groups.length; i--; ) groups[i] = nid + toSelector(groups[i]);
                        newContext = rsibling.test(selector) && testContext(context.parentNode) || context, 
                        newSelector = groups.join(",");
                    }
                    if (newSelector) try {
                        return push.apply(results, newContext.querySelectorAll(newSelector)), results;
                    } catch (qsaError) {} finally {
                        old || context.removeAttribute("id");
                    }
                }
            }
            return select(selector.replace(rtrim, "$1"), context, results, seed);
        }
        function createCache() {
            function cache(key, value) {
                return keys.push(key + " ") > Expr.cacheLength && delete cache[keys.shift()], cache[key + " "] = value;
            }
            var keys = [];
            return cache;
        }
        function markFunction(fn) {
            return fn[expando] = !0, fn;
        }
        function assert(fn) {
            var div = document.createElement("div");
            try {
                return !!fn(div);
            } catch (e) {
                return !1;
            } finally {
                div.parentNode && div.parentNode.removeChild(div), div = null;
            }
        }
        function addHandle(attrs, handler) {
            for (var arr = attrs.split("|"), i = attrs.length; i--; ) Expr.attrHandle[arr[i]] = handler;
        }
        function siblingCheck(a, b) {
            var cur = b && a, diff = cur && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
            if (diff) return diff;
            if (cur) for (;cur = cur.nextSibling; ) if (cur === b) return -1;
            return a ? 1 : -1;
        }
        function createInputPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return "input" === name && elem.type === type;
            };
        }
        function createButtonPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return ("input" === name || "button" === name) && elem.type === type;
            };
        }
        function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
                return argument = +argument, markFunction(function(seed, matches) {
                    for (var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length; i--; ) seed[j = matchIndexes[i]] && (seed[j] = !(matches[j] = seed[j]));
                });
            });
        }
        function testContext(context) {
            return context && "undefined" != typeof context.getElementsByTagName && context;
        }
        function setFilters() {}
        function toSelector(tokens) {
            for (var i = 0, len = tokens.length, selector = ""; len > i; i++) selector += tokens[i].value;
            return selector;
        }
        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir, checkNonElements = base && "parentNode" === dir, doneName = done++;
            return combinator.first ? function(elem, context, xml) {
                for (;elem = elem[dir]; ) if (1 === elem.nodeType || checkNonElements) return matcher(elem, context, xml);
            } : function(elem, context, xml) {
                var oldCache, outerCache, newCache = [ dirruns, doneName ];
                if (xml) {
                    for (;elem = elem[dir]; ) if ((1 === elem.nodeType || checkNonElements) && matcher(elem, context, xml)) return !0;
                } else for (;elem = elem[dir]; ) if (1 === elem.nodeType || checkNonElements) {
                    if (outerCache = elem[expando] || (elem[expando] = {}), (oldCache = outerCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) return newCache[2] = oldCache[2];
                    if (outerCache[dir] = newCache, newCache[2] = matcher(elem, context, xml)) return !0;
                }
            };
        }
        function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
                for (var i = matchers.length; i--; ) if (!matchers[i](elem, context, xml)) return !1;
                return !0;
            } : matchers[0];
        }
        function multipleContexts(selector, contexts, results) {
            for (var i = 0, len = contexts.length; len > i; i++) Sizzle(selector, contexts[i], results);
            return results;
        }
        function condense(unmatched, map, filter, context, xml) {
            for (var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = null != map; len > i; i++) (elem = unmatched[i]) && (!filter || filter(elem, context, xml)) && (newUnmatched.push(elem), 
            mapped && map.push(i));
            return newUnmatched;
        }
        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            return postFilter && !postFilter[expando] && (postFilter = setMatcher(postFilter)), 
            postFinder && !postFinder[expando] && (postFinder = setMatcher(postFinder, postSelector)), 
            markFunction(function(seed, results, context, xml) {
                var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || "*", context.nodeType ? [ context ] : context, []), matcherIn = !preFilter || !seed && selector ? elems : condense(elems, preMap, preFilter, context, xml), matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                if (matcher && matcher(matcherIn, matcherOut, context, xml), postFilter) for (temp = condense(matcherOut, postMap), 
                postFilter(temp, [], context, xml), i = temp.length; i--; ) (elem = temp[i]) && (matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem));
                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            for (temp = [], i = matcherOut.length; i--; ) (elem = matcherOut[i]) && temp.push(matcherIn[i] = elem);
                            postFinder(null, matcherOut = [], temp, xml);
                        }
                        for (i = matcherOut.length; i--; ) (elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1 && (seed[temp] = !(results[temp] = elem));
                    }
                } else matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut), 
                postFinder ? postFinder(null, results, matcherOut, xml) : push.apply(results, matcherOut);
            });
        }
        function matcherFromTokens(tokens) {
            for (var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
                return elem === checkContext;
            }, implicitRelative, !0), matchAnyContext = addCombinator(function(elem) {
                return indexOf(checkContext, elem) > -1;
            }, implicitRelative, !0), matchers = [ function(elem, context, xml) {
                var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
                return checkContext = null, ret;
            } ]; len > i; i++) if (matcher = Expr.relative[tokens[i].type]) matchers = [ addCombinator(elementMatcher(matchers), matcher) ]; else {
                if (matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches), matcher[expando]) {
                    for (j = ++i; len > j && !Expr.relative[tokens[j].type]; j++) ;
                    return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                        value: " " === tokens[i - 2].type ? "*" : ""
                    })).replace(rtrim, "$1"), matcher, j > i && matcherFromTokens(tokens.slice(i, j)), len > j && matcherFromTokens(tokens = tokens.slice(j)), len > j && toSelector(tokens));
                }
                matchers.push(matcher);
            }
            return elementMatcher(matchers);
        }
        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, outermost) {
                var elem, j, matcher, matchedCount = 0, i = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && Expr.find.TAG("*", outermost), dirrunsUnique = dirruns += null == contextBackup ? 1 : Math.random() || .1, len = elems.length;
                for (outermost && (outermostContext = context !== document && context); i !== len && null != (elem = elems[i]); i++) {
                    if (byElement && elem) {
                        for (j = 0; matcher = elementMatchers[j++]; ) if (matcher(elem, context, xml)) {
                            results.push(elem);
                            break;
                        }
                        outermost && (dirruns = dirrunsUnique);
                    }
                    bySet && ((elem = !matcher && elem) && matchedCount--, seed && unmatched.push(elem));
                }
                if (matchedCount += i, bySet && i !== matchedCount) {
                    for (j = 0; matcher = setMatchers[j++]; ) matcher(unmatched, setMatched, context, xml);
                    if (seed) {
                        if (matchedCount > 0) for (;i--; ) unmatched[i] || setMatched[i] || (setMatched[i] = pop.call(results));
                        setMatched = condense(setMatched);
                    }
                    push.apply(results, setMatched), outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1 && Sizzle.uniqueSort(results);
                }
                return outermost && (dirruns = dirrunsUnique, outermostContext = contextBackup), 
                unmatched;
            };
            return bySet ? markFunction(superMatcher) : superMatcher;
        }
        var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + 1 * new Date(), preferredDoc = window.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), sortOrder = function(a, b) {
            return a === b && (hasDuplicate = !0), 0;
        }, MAX_NEGATIVE = 1 << 31, hasOwn = {}.hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice, indexOf = function(list, elem) {
            for (var i = 0, len = list.length; len > i; i++) if (list[i] === elem) return i;
            return -1;
        }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", whitespace = "[\\x20\\t\\r\\n\\f]", characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", identifier = characterEncoding.replace("w", "w#"), attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]", pseudos = ":(" + characterEncoding + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|.*)\\)|)", rwhitespace = new RegExp(whitespace + "+", "g"), rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
            ID: new RegExp("^#(" + characterEncoding + ")"),
            CLASS: new RegExp("^\\.(" + characterEncoding + ")"),
            TAG: new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + attributes),
            PSEUDO: new RegExp("^" + pseudos),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + booleans + ")$", "i"),
            needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
        }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, rescape = /'|\\/g, runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"), funescape = function(_, escaped, escapedWhitespace) {
            var high = "0x" + escaped - 65536;
            return high !== high || escapedWhitespace ? escaped : 0 > high ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, 1023 & high | 56320);
        }, unloadHandler = function() {
            setDocument();
        };
        try {
            push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes), 
            arr[preferredDoc.childNodes.length].nodeType;
        } catch (e) {
            push = {
                apply: arr.length ? function(target, els) {
                    push_native.apply(target, slice.call(els));
                } : function(target, els) {
                    for (var j = target.length, i = 0; target[j++] = els[i++]; ) ;
                    target.length = j - 1;
                }
            };
        }
        support = Sizzle.support = {}, isXML = Sizzle.isXML = function(elem) {
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return documentElement ? "HTML" !== documentElement.nodeName : !1;
        }, setDocument = Sizzle.setDocument = function(node) {
            var hasCompare, parent, doc = node ? node.ownerDocument || node : preferredDoc;
            return doc !== document && 9 === doc.nodeType && doc.documentElement ? (document = doc, 
            docElem = doc.documentElement, parent = doc.defaultView, parent && parent !== parent.top && (parent.addEventListener ? parent.addEventListener("unload", unloadHandler, !1) : parent.attachEvent && parent.attachEvent("onunload", unloadHandler)), 
            documentIsHTML = !isXML(doc), support.attributes = assert(function(div) {
                return div.className = "i", !div.getAttribute("className");
            }), support.getElementsByTagName = assert(function(div) {
                return div.appendChild(doc.createComment("")), !div.getElementsByTagName("*").length;
            }), support.getElementsByClassName = rnative.test(doc.getElementsByClassName), support.getById = assert(function(div) {
                return docElem.appendChild(div).id = expando, !doc.getElementsByName || !doc.getElementsByName(expando).length;
            }), support.getById ? (Expr.find.ID = function(id, context) {
                if ("undefined" != typeof context.getElementById && documentIsHTML) {
                    var m = context.getElementById(id);
                    return m && m.parentNode ? [ m ] : [];
                }
            }, Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                    return elem.getAttribute("id") === attrId;
                };
            }) : (delete Expr.find.ID, Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                    var node = "undefined" != typeof elem.getAttributeNode && elem.getAttributeNode("id");
                    return node && node.value === attrId;
                };
            }), Expr.find.TAG = support.getElementsByTagName ? function(tag, context) {
                return "undefined" != typeof context.getElementsByTagName ? context.getElementsByTagName(tag) : support.qsa ? context.querySelectorAll(tag) : void 0;
            } : function(tag, context) {
                var elem, tmp = [], i = 0, results = context.getElementsByTagName(tag);
                if ("*" === tag) {
                    for (;elem = results[i++]; ) 1 === elem.nodeType && tmp.push(elem);
                    return tmp;
                }
                return results;
            }, Expr.find.CLASS = support.getElementsByClassName && function(className, context) {
                return documentIsHTML ? context.getElementsByClassName(className) : void 0;
            }, rbuggyMatches = [], rbuggyQSA = [], (support.qsa = rnative.test(doc.querySelectorAll)) && (assert(function(div) {
                docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a><select id='" + expando + "-\f]' msallowcapture=''><option selected=''></option></select>", 
                div.querySelectorAll("[msallowcapture^='']").length && rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")"), 
                div.querySelectorAll("[selected]").length || rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")"), 
                div.querySelectorAll("[id~=" + expando + "-]").length || rbuggyQSA.push("~="), div.querySelectorAll(":checked").length || rbuggyQSA.push(":checked"), 
                div.querySelectorAll("a#" + expando + "+*").length || rbuggyQSA.push(".#.+[+~]");
            }), assert(function(div) {
                var input = doc.createElement("input");
                input.setAttribute("type", "hidden"), div.appendChild(input).setAttribute("name", "D"), 
                div.querySelectorAll("[name=d]").length && rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?="), 
                div.querySelectorAll(":enabled").length || rbuggyQSA.push(":enabled", ":disabled"), 
                div.querySelectorAll("*,:x"), rbuggyQSA.push(",.*:");
            })), (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) && assert(function(div) {
                support.disconnectedMatch = matches.call(div, "div"), matches.call(div, "[s!='']:x"), 
                rbuggyMatches.push("!=", pseudos);
            }), rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|")), rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|")), 
            hasCompare = rnative.test(docElem.compareDocumentPosition), contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
                var adown = 9 === a.nodeType ? a.documentElement : a, bup = b && b.parentNode;
                return a === bup || !(!bup || 1 !== bup.nodeType || !(adown.contains ? adown.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup)));
            } : function(a, b) {
                if (b) for (;b = b.parentNode; ) if (b === a) return !0;
                return !1;
            }, sortOrder = hasCompare ? function(a, b) {
                if (a === b) return hasDuplicate = !0, 0;
                var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return compare ? compare : (compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 
                1 & compare || !support.sortDetached && b.compareDocumentPosition(a) === compare ? a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ? -1 : b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0 : 4 & compare ? -1 : 1);
            } : function(a, b) {
                if (a === b) return hasDuplicate = !0, 0;
                var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [ a ], bp = [ b ];
                if (!aup || !bup) return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
                if (aup === bup) return siblingCheck(a, b);
                for (cur = a; cur = cur.parentNode; ) ap.unshift(cur);
                for (cur = b; cur = cur.parentNode; ) bp.unshift(cur);
                for (;ap[i] === bp[i]; ) i++;
                return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
            }, doc) : document;
        }, Sizzle.matches = function(expr, elements) {
            return Sizzle(expr, null, null, elements);
        }, Sizzle.matchesSelector = function(elem, expr) {
            if ((elem.ownerDocument || elem) !== document && setDocument(elem), expr = expr.replace(rattributeQuotes, "='$1']"), 
            support.matchesSelector && documentIsHTML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) try {
                var ret = matches.call(elem, expr);
                if (ret || support.disconnectedMatch || elem.document && 11 !== elem.document.nodeType) return ret;
            } catch (e) {}
            return Sizzle(expr, document, null, [ elem ]).length > 0;
        }, Sizzle.contains = function(context, elem) {
            return (context.ownerDocument || context) !== document && setDocument(context), 
            contains(context, elem);
        }, Sizzle.attr = function(elem, name) {
            (elem.ownerDocument || elem) !== document && setDocument(elem);
            var fn = Expr.attrHandle[name.toLowerCase()], val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
            return void 0 !== val ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }, Sizzle.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
        }, Sizzle.uniqueSort = function(results) {
            var elem, duplicates = [], j = 0, i = 0;
            if (hasDuplicate = !support.detectDuplicates, sortInput = !support.sortStable && results.slice(0), 
            results.sort(sortOrder), hasDuplicate) {
                for (;elem = results[i++]; ) elem === results[i] && (j = duplicates.push(i));
                for (;j--; ) results.splice(duplicates[j], 1);
            }
            return sortInput = null, results;
        }, getText = Sizzle.getText = function(elem) {
            var node, ret = "", i = 0, nodeType = elem.nodeType;
            if (nodeType) {
                if (1 === nodeType || 9 === nodeType || 11 === nodeType) {
                    if ("string" == typeof elem.textContent) return elem.textContent;
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) ret += getText(elem);
                } else if (3 === nodeType || 4 === nodeType) return elem.nodeValue;
            } else for (;node = elem[i++]; ) ret += getText(node);
            return ret;
        }, Expr = Sizzle.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(match) {
                    return match[1] = match[1].replace(runescape, funescape), match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape), 
                    "~=" === match[2] && (match[3] = " " + match[3] + " "), match.slice(0, 4);
                },
                CHILD: function(match) {
                    return match[1] = match[1].toLowerCase(), "nth" === match[1].slice(0, 3) ? (match[3] || Sizzle.error(match[0]), 
                    match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * ("even" === match[3] || "odd" === match[3])), 
                    match[5] = +(match[7] + match[8] || "odd" === match[3])) : match[3] && Sizzle.error(match[0]), 
                    match;
                },
                PSEUDO: function(match) {
                    var excess, unquoted = !match[6] && match[2];
                    return matchExpr.CHILD.test(match[0]) ? null : (match[3] ? match[2] = match[4] || match[5] || "" : unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, !0)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (match[0] = match[0].slice(0, excess), 
                    match[2] = unquoted.slice(0, excess)), match.slice(0, 3));
                }
            },
            filter: {
                TAG: function(nodeNameSelector) {
                    var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                    return "*" === nodeNameSelector ? function() {
                        return !0;
                    } : function(elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                    };
                },
                CLASS: function(className) {
                    var pattern = classCache[className + " "];
                    return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                        return pattern.test("string" == typeof elem.className && elem.className || "undefined" != typeof elem.getAttribute && elem.getAttribute("class") || "");
                    });
                },
                ATTR: function(name, operator, check) {
                    return function(elem) {
                        var result = Sizzle.attr(elem, name);
                        return null == result ? "!=" === operator : operator ? (result += "", "=" === operator ? result === check : "!=" === operator ? result !== check : "^=" === operator ? check && 0 === result.indexOf(check) : "*=" === operator ? check && result.indexOf(check) > -1 : "$=" === operator ? check && result.slice(-check.length) === check : "~=" === operator ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : "|=" === operator ? result === check || result.slice(0, check.length + 1) === check + "-" : !1) : !0;
                    };
                },
                CHILD: function(type, what, argument, first, last) {
                    var simple = "nth" !== type.slice(0, 3), forward = "last" !== type.slice(-4), ofType = "of-type" === what;
                    return 1 === first && 0 === last ? function(elem) {
                        return !!elem.parentNode;
                    } : function(elem, context, xml) {
                        var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType;
                        if (parent) {
                            if (simple) {
                                for (;dir; ) {
                                    for (node = elem; node = node[dir]; ) if (ofType ? node.nodeName.toLowerCase() === name : 1 === node.nodeType) return !1;
                                    start = dir = "only" === type && !start && "nextSibling";
                                }
                                return !0;
                            }
                            if (start = [ forward ? parent.firstChild : parent.lastChild ], forward && useCache) {
                                for (outerCache = parent[expando] || (parent[expando] = {}), cache = outerCache[type] || [], 
                                nodeIndex = cache[0] === dirruns && cache[1], diff = cache[0] === dirruns && cache[2], 
                                node = nodeIndex && parent.childNodes[nodeIndex]; node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop(); ) if (1 === node.nodeType && ++diff && node === elem) {
                                    outerCache[type] = [ dirruns, nodeIndex, diff ];
                                    break;
                                }
                            } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) diff = cache[1]; else for (;(node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) && ((ofType ? node.nodeName.toLowerCase() !== name : 1 !== node.nodeType) || !++diff || (useCache && ((node[expando] || (node[expando] = {}))[type] = [ dirruns, diff ]), 
                            node !== elem)); ) ;
                            return diff -= last, diff === first || diff % first === 0 && diff / first >= 0;
                        }
                    };
                },
                PSEUDO: function(pseudo, argument) {
                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    return fn[expando] ? fn(argument) : fn.length > 1 ? (args = [ pseudo, pseudo, "", argument ], 
                    Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                        for (var idx, matched = fn(seed, argument), i = matched.length; i--; ) idx = indexOf(seed, matched[i]), 
                        seed[idx] = !(matches[idx] = matched[i]);
                    }) : function(elem) {
                        return fn(elem, 0, args);
                    }) : fn;
                }
            },
            pseudos: {
                not: markFunction(function(selector) {
                    var input = [], results = [], matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                        for (var elem, unmatched = matcher(seed, null, xml, []), i = seed.length; i--; ) (elem = unmatched[i]) && (seed[i] = !(matches[i] = elem));
                    }) : function(elem, context, xml) {
                        return input[0] = elem, matcher(input, null, xml, results), input[0] = null, !results.pop();
                    };
                }),
                has: markFunction(function(selector) {
                    return function(elem) {
                        return Sizzle(selector, elem).length > 0;
                    };
                }),
                contains: markFunction(function(text) {
                    return text = text.replace(runescape, funescape), function(elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                    };
                }),
                lang: markFunction(function(lang) {
                    return ridentifier.test(lang || "") || Sizzle.error("unsupported lang: " + lang), 
                    lang = lang.replace(runescape, funescape).toLowerCase(), function(elem) {
                        var elemLang;
                        do if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) return elemLang = elemLang.toLowerCase(), 
                        elemLang === lang || 0 === elemLang.indexOf(lang + "-"); while ((elem = elem.parentNode) && 1 === elem.nodeType);
                        return !1;
                    };
                }),
                target: function(elem) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice(1) === elem.id;
                },
                root: function(elem) {
                    return elem === docElem;
                },
                focus: function(elem) {
                    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                },
                enabled: function(elem) {
                    return elem.disabled === !1;
                },
                disabled: function(elem) {
                    return elem.disabled === !0;
                },
                checked: function(elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return "input" === nodeName && !!elem.checked || "option" === nodeName && !!elem.selected;
                },
                selected: function(elem) {
                    return elem.parentNode && elem.parentNode.selectedIndex, elem.selected === !0;
                },
                empty: function(elem) {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) if (elem.nodeType < 6) return !1;
                    return !0;
                },
                parent: function(elem) {
                    return !Expr.pseudos.empty(elem);
                },
                header: function(elem) {
                    return rheader.test(elem.nodeName);
                },
                input: function(elem) {
                    return rinputs.test(elem.nodeName);
                },
                button: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return "input" === name && "button" === elem.type || "button" === name;
                },
                text: function(elem) {
                    var attr;
                    return "input" === elem.nodeName.toLowerCase() && "text" === elem.type && (null == (attr = elem.getAttribute("type")) || "text" === attr.toLowerCase());
                },
                first: createPositionalPseudo(function() {
                    return [ 0 ];
                }),
                last: createPositionalPseudo(function(matchIndexes, length) {
                    return [ length - 1 ];
                }),
                eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [ 0 > argument ? argument + length : argument ];
                }),
                even: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 0; length > i; i += 2) matchIndexes.push(i);
                    return matchIndexes;
                }),
                odd: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 1; length > i; i += 2) matchIndexes.push(i);
                    return matchIndexes;
                }),
                lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 0 > argument ? argument + length : argument; --i >= 0; ) matchIndexes.push(i);
                    return matchIndexes;
                }),
                gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 0 > argument ? argument + length : argument; ++i < length; ) matchIndexes.push(i);
                    return matchIndexes;
                })
            }
        }, Expr.pseudos.nth = Expr.pseudos.eq;
        for (i in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) Expr.pseudos[i] = createInputPseudo(i);
        for (i in {
            submit: !0,
            reset: !0
        }) Expr.pseudos[i] = createButtonPseudo(i);
        return setFilters.prototype = Expr.filters = Expr.pseudos, Expr.setFilters = new setFilters(), 
        tokenize = Sizzle.tokenize = function(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
            if (cached) return parseOnly ? 0 : cached.slice(0);
            for (soFar = selector, groups = [], preFilters = Expr.preFilter; soFar; ) {
                (!matched || (match = rcomma.exec(soFar))) && (match && (soFar = soFar.slice(match[0].length) || soFar), 
                groups.push(tokens = [])), matched = !1, (match = rcombinators.exec(soFar)) && (matched = match.shift(), 
                tokens.push({
                    value: matched,
                    type: match[0].replace(rtrim, " ")
                }), soFar = soFar.slice(matched.length));
                for (type in Expr.filter) !(match = matchExpr[type].exec(soFar)) || preFilters[type] && !(match = preFilters[type](match)) || (matched = match.shift(), 
                tokens.push({
                    value: matched,
                    type: type,
                    matches: match
                }), soFar = soFar.slice(matched.length));
                if (!matched) break;
            }
            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
        }, compile = Sizzle.compile = function(selector, match) {
            var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
            if (!cached) {
                for (match || (match = tokenize(selector)), i = match.length; i--; ) cached = matcherFromTokens(match[i]), 
                cached[expando] ? setMatchers.push(cached) : elementMatchers.push(cached);
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers)), 
                cached.selector = selector;
            }
            return cached;
        }, select = Sizzle.select = function(selector, context, results, seed) {
            var i, tokens, token, type, find, compiled = "function" == typeof selector && selector, match = !seed && tokenize(selector = compiled.selector || selector);
            if (results = results || [], 1 === match.length) {
                if (tokens = match[0] = match[0].slice(0), tokens.length > 2 && "ID" === (token = tokens[0]).type && support.getById && 9 === context.nodeType && documentIsHTML && Expr.relative[tokens[1].type]) {
                    if (context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0], 
                    !context) return results;
                    compiled && (context = context.parentNode), selector = selector.slice(tokens.shift().value.length);
                }
                for (i = matchExpr.needsContext.test(selector) ? 0 : tokens.length; i-- && (token = tokens[i], 
                !Expr.relative[type = token.type]); ) if ((find = Expr.find[type]) && (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
                    if (tokens.splice(i, 1), selector = seed.length && toSelector(tokens), !selector) return push.apply(results, seed), 
                    results;
                    break;
                }
            }
            return (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, rsibling.test(selector) && testContext(context.parentNode) || context), 
            results;
        }, support.sortStable = expando.split("").sort(sortOrder).join("") === expando, 
        support.detectDuplicates = !!hasDuplicate, setDocument(), support.sortDetached = assert(function(div1) {
            return 1 & div1.compareDocumentPosition(document.createElement("div"));
        }), assert(function(div) {
            return div.innerHTML = "<a href='#'></a>", "#" === div.firstChild.getAttribute("href");
        }) || addHandle("type|href|height|width", function(elem, name, isXML) {
            return isXML ? void 0 : elem.getAttribute(name, "type" === name.toLowerCase() ? 1 : 2);
        }), support.attributes && assert(function(div) {
            return div.innerHTML = "<input/>", div.firstChild.setAttribute("value", ""), "" === div.firstChild.getAttribute("value");
        }) || addHandle("value", function(elem, name, isXML) {
            return isXML || "input" !== elem.nodeName.toLowerCase() ? void 0 : elem.defaultValue;
        }), assert(function(div) {
            return null == div.getAttribute("disabled");
        }) || addHandle(booleans, function(elem, name, isXML) {
            var val;
            return isXML ? void 0 : elem[name] === !0 ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }), Sizzle;
    }(window);
    jQuery.find = Sizzle, jQuery.expr = Sizzle.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, 
    jQuery.unique = Sizzle.uniqueSort, jQuery.text = Sizzle.getText, jQuery.isXMLDoc = Sizzle.isXML, 
    jQuery.contains = Sizzle.contains;
    var rneedsContext = jQuery.expr.match.needsContext, rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, risSimple = /^.[^:#\[\.,]*$/;
    jQuery.filter = function(expr, elems, not) {
        var elem = elems[0];
        return not && (expr = ":not(" + expr + ")"), 1 === elems.length && 1 === elem.nodeType ? jQuery.find.matchesSelector(elem, expr) ? [ elem ] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
            return 1 === elem.nodeType;
        }));
    }, jQuery.fn.extend({
        find: function(selector) {
            var i, ret = [], self = this, len = self.length;
            if ("string" != typeof selector) return this.pushStack(jQuery(selector).filter(function() {
                for (i = 0; len > i; i++) if (jQuery.contains(self[i], this)) return !0;
            }));
            for (i = 0; len > i; i++) jQuery.find(selector, self[i], ret);
            return ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret), ret.selector = this.selector ? this.selector + " " + selector : selector, 
            ret;
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector || [], !1));
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector || [], !0));
        },
        is: function(selector) {
            return !!winnow(this, "string" == typeof selector && rneedsContext.test(selector) ? jQuery(selector) : selector || [], !1).length;
        }
    });
    var rootjQuery, document = window.document, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, init = jQuery.fn.init = function(selector, context) {
        var match, elem;
        if (!selector) return this;
        if ("string" == typeof selector) {
            if (match = "<" === selector.charAt(0) && ">" === selector.charAt(selector.length - 1) && selector.length >= 3 ? [ null, selector, null ] : rquickExpr.exec(selector), 
            !match || !match[1] && context) return !context || context.jquery ? (context || rootjQuery).find(selector) : this.constructor(context).find(selector);
            if (match[1]) {
                if (context = context instanceof jQuery ? context[0] : context, jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, !0)), 
                rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) for (match in context) jQuery.isFunction(this[match]) ? this[match](context[match]) : this.attr(match, context[match]);
                return this;
            }
            if (elem = document.getElementById(match[2]), elem && elem.parentNode) {
                if (elem.id !== match[2]) return rootjQuery.find(selector);
                this.length = 1, this[0] = elem;
            }
            return this.context = document, this.selector = selector, this;
        }
        return selector.nodeType ? (this.context = this[0] = selector, this.length = 1, 
        this) : jQuery.isFunction(selector) ? "undefined" != typeof rootjQuery.ready ? rootjQuery.ready(selector) : selector(jQuery) : (void 0 !== selector.selector && (this.selector = selector.selector, 
        this.context = selector.context), jQuery.makeArray(selector, this));
    };
    init.prototype = jQuery.fn, rootjQuery = jQuery(document);
    var rparentsprev = /^(?:parents|prev(?:Until|All))/, guaranteedUnique = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    jQuery.extend({
        dir: function(elem, dir, until) {
            for (var matched = [], cur = elem[dir]; cur && 9 !== cur.nodeType && (void 0 === until || 1 !== cur.nodeType || !jQuery(cur).is(until)); ) 1 === cur.nodeType && matched.push(cur), 
            cur = cur[dir];
            return matched;
        },
        sibling: function(n, elem) {
            for (var r = []; n; n = n.nextSibling) 1 === n.nodeType && n !== elem && r.push(n);
            return r;
        }
    }), jQuery.fn.extend({
        has: function(target) {
            var i, targets = jQuery(target, this), len = targets.length;
            return this.filter(function() {
                for (i = 0; len > i; i++) if (jQuery.contains(this, targets[i])) return !0;
            });
        },
        closest: function(selectors, context) {
            for (var cur, i = 0, l = this.length, matched = [], pos = rneedsContext.test(selectors) || "string" != typeof selectors ? jQuery(selectors, context || this.context) : 0; l > i; i++) for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : 1 === cur.nodeType && jQuery.find.matchesSelector(cur, selectors))) {
                matched.push(cur);
                break;
            }
            return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched);
        },
        index: function(elem) {
            return elem ? "string" == typeof elem ? jQuery.inArray(this[0], jQuery(elem)) : jQuery.inArray(elem.jquery ? elem[0] : elem, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function(selector, context) {
            return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(selector, context))));
        },
        addBack: function(selector) {
            return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector));
        }
    }), jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && 11 !== parent.nodeType ? parent : null;
        },
        parents: function(elem) {
            return jQuery.dir(elem, "parentNode");
        },
        parentsUntil: function(elem, i, until) {
            return jQuery.dir(elem, "parentNode", until);
        },
        next: function(elem) {
            return sibling(elem, "nextSibling");
        },
        prev: function(elem) {
            return sibling(elem, "previousSibling");
        },
        nextAll: function(elem) {
            return jQuery.dir(elem, "nextSibling");
        },
        prevAll: function(elem) {
            return jQuery.dir(elem, "previousSibling");
        },
        nextUntil: function(elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until);
        },
        prevUntil: function(elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until);
        },
        siblings: function(elem) {
            return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
        },
        children: function(elem) {
            return jQuery.sibling(elem.firstChild);
        },
        contents: function(elem) {
            return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.merge([], elem.childNodes);
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var ret = jQuery.map(this, fn, until);
            return "Until" !== name.slice(-5) && (selector = until), selector && "string" == typeof selector && (ret = jQuery.filter(selector, ret)), 
            this.length > 1 && (guaranteedUnique[name] || (ret = jQuery.unique(ret)), rparentsprev.test(name) && (ret = ret.reverse())), 
            this.pushStack(ret);
        };
    });
    var rnotwhite = /\S+/g, optionsCache = {};
    jQuery.Callbacks = function(options) {
        options = "string" == typeof options ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
        var firing, memory, fired, firingLength, firingIndex, firingStart, list = [], stack = !options.once && [], fire = function(data) {
            for (memory = options.memory && data, fired = !0, firingIndex = firingStart || 0, 
            firingStart = 0, firingLength = list.length, firing = !0; list && firingLength > firingIndex; firingIndex++) if (list[firingIndex].apply(data[0], data[1]) === !1 && options.stopOnFalse) {
                memory = !1;
                break;
            }
            firing = !1, list && (stack ? stack.length && fire(stack.shift()) : memory ? list = [] : self.disable());
        }, self = {
            add: function() {
                if (list) {
                    var start = list.length;
                    !function add(args) {
                        jQuery.each(args, function(_, arg) {
                            var type = jQuery.type(arg);
                            "function" === type ? options.unique && self.has(arg) || list.push(arg) : arg && arg.length && "string" !== type && add(arg);
                        });
                    }(arguments), firing ? firingLength = list.length : memory && (firingStart = start, 
                    fire(memory));
                }
                return this;
            },
            remove: function() {
                return list && jQuery.each(arguments, function(_, arg) {
                    for (var index; (index = jQuery.inArray(arg, list, index)) > -1; ) list.splice(index, 1), 
                    firing && (firingLength >= index && firingLength--, firingIndex >= index && firingIndex--);
                }), this;
            },
            has: function(fn) {
                return fn ? jQuery.inArray(fn, list) > -1 : !(!list || !list.length);
            },
            empty: function() {
                return list = [], firingLength = 0, this;
            },
            disable: function() {
                return list = stack = memory = void 0, this;
            },
            disabled: function() {
                return !list;
            },
            lock: function() {
                return stack = void 0, memory || self.disable(), this;
            },
            locked: function() {
                return !stack;
            },
            fireWith: function(context, args) {
                return !list || fired && !stack || (args = args || [], args = [ context, args.slice ? args.slice() : args ], 
                firing ? stack.push(args) : fire(args)), this;
            },
            fire: function() {
                return self.fireWith(this, arguments), this;
            },
            fired: function() {
                return !!fired;
            }
        };
        return self;
    }, jQuery.extend({
        Deferred: function(func) {
            var tuples = [ [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ], [ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ], [ "notify", "progress", jQuery.Callbacks("memory") ] ], state = "pending", promise = {
                state: function() {
                    return state;
                },
                always: function() {
                    return deferred.done(arguments).fail(arguments), this;
                },
                then: function() {
                    var fns = arguments;
                    return jQuery.Deferred(function(newDefer) {
                        jQuery.each(tuples, function(i, tuple) {
                            var fn = jQuery.isFunction(fns[i]) && fns[i];
                            deferred[tuple[1]](function() {
                                var returned = fn && fn.apply(this, arguments);
                                returned && jQuery.isFunction(returned.promise) ? returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify) : newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments);
                            });
                        }), fns = null;
                    }).promise();
                },
                promise: function(obj) {
                    return null != obj ? jQuery.extend(obj, promise) : promise;
                }
            }, deferred = {};
            return promise.pipe = promise.then, jQuery.each(tuples, function(i, tuple) {
                var list = tuple[2], stateString = tuple[3];
                promise[tuple[1]] = list.add, stateString && list.add(function() {
                    state = stateString;
                }, tuples[1 ^ i][2].disable, tuples[2][2].lock), deferred[tuple[0]] = function() {
                    return deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments), 
                    this;
                }, deferred[tuple[0] + "With"] = list.fireWith;
            }), promise.promise(deferred), func && func.call(deferred, deferred), deferred;
        },
        when: function(subordinate) {
            var progressValues, progressContexts, resolveContexts, i = 0, resolveValues = slice.call(arguments), length = resolveValues.length, remaining = 1 !== length || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0, deferred = 1 === remaining ? subordinate : jQuery.Deferred(), updateFunc = function(i, contexts, values) {
                return function(value) {
                    contexts[i] = this, values[i] = arguments.length > 1 ? slice.call(arguments) : value, 
                    values === progressValues ? deferred.notifyWith(contexts, values) : --remaining || deferred.resolveWith(contexts, values);
                };
            };
            if (length > 1) for (progressValues = new Array(length), progressContexts = new Array(length), 
            resolveContexts = new Array(length); length > i; i++) resolveValues[i] && jQuery.isFunction(resolveValues[i].promise) ? resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues)) : --remaining;
            return remaining || deferred.resolveWith(resolveContexts, resolveValues), deferred.promise();
        }
    });
    var readyList;
    jQuery.fn.ready = function(fn) {
        return jQuery.ready.promise().done(fn), this;
    }, jQuery.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(hold) {
            hold ? jQuery.readyWait++ : jQuery.ready(!0);
        },
        ready: function(wait) {
            if (wait === !0 ? !--jQuery.readyWait : !jQuery.isReady) {
                if (!document.body) return setTimeout(jQuery.ready);
                jQuery.isReady = !0, wait !== !0 && --jQuery.readyWait > 0 || (readyList.resolveWith(document, [ jQuery ]), 
                jQuery.fn.triggerHandler && (jQuery(document).triggerHandler("ready"), jQuery(document).off("ready")));
            }
        }
    }), jQuery.ready.promise = function(obj) {
        if (!readyList) if (readyList = jQuery.Deferred(), "complete" === document.readyState) setTimeout(jQuery.ready); else if (document.addEventListener) document.addEventListener("DOMContentLoaded", completed, !1), 
        window.addEventListener("load", completed, !1); else {
            document.attachEvent("onreadystatechange", completed), window.attachEvent("onload", completed);
            var top = !1;
            try {
                top = null == window.frameElement && document.documentElement;
            } catch (e) {}
            top && top.doScroll && !function doScrollCheck() {
                if (!jQuery.isReady) {
                    try {
                        top.doScroll("left");
                    } catch (e) {
                        return setTimeout(doScrollCheck, 50);
                    }
                    detach(), jQuery.ready();
                }
            }();
        }
        return readyList.promise(obj);
    };
    var i, strundefined = "undefined";
    for (i in jQuery(support)) break;
    support.ownLast = "0" !== i, support.inlineBlockNeedsLayout = !1, jQuery(function() {
        var val, div, body, container;
        body = document.getElementsByTagName("body")[0], body && body.style && (div = document.createElement("div"), 
        container = document.createElement("div"), container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", 
        body.appendChild(container).appendChild(div), typeof div.style.zoom !== strundefined && (div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", 
        support.inlineBlockNeedsLayout = val = 3 === div.offsetWidth, val && (body.style.zoom = 1)), 
        body.removeChild(container));
    }), function() {
        var div = document.createElement("div");
        if (null == support.deleteExpando) {
            support.deleteExpando = !0;
            try {
                delete div.test;
            } catch (e) {
                support.deleteExpando = !1;
            }
        }
        div = null;
    }(), jQuery.acceptData = function(elem) {
        var noData = jQuery.noData[(elem.nodeName + " ").toLowerCase()], nodeType = +elem.nodeType || 1;
        return 1 !== nodeType && 9 !== nodeType ? !1 : !noData || noData !== !0 && elem.getAttribute("classid") === noData;
    };
    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /([A-Z])/g;
    jQuery.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(elem) {
            return elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando], 
            !!elem && !isEmptyDataObject(elem);
        },
        data: function(elem, name, data) {
            return internalData(elem, name, data);
        },
        removeData: function(elem, name) {
            return internalRemoveData(elem, name);
        },
        _data: function(elem, name, data) {
            return internalData(elem, name, data, !0);
        },
        _removeData: function(elem, name) {
            return internalRemoveData(elem, name, !0);
        }
    }), jQuery.fn.extend({
        data: function(key, value) {
            var i, name, data, elem = this[0], attrs = elem && elem.attributes;
            if (void 0 === key) {
                if (this.length && (data = jQuery.data(elem), 1 === elem.nodeType && !jQuery._data(elem, "parsedAttrs"))) {
                    for (i = attrs.length; i--; ) attrs[i] && (name = attrs[i].name, 0 === name.indexOf("data-") && (name = jQuery.camelCase(name.slice(5)), 
                    dataAttr(elem, name, data[name])));
                    jQuery._data(elem, "parsedAttrs", !0);
                }
                return data;
            }
            return "object" == typeof key ? this.each(function() {
                jQuery.data(this, key);
            }) : arguments.length > 1 ? this.each(function() {
                jQuery.data(this, key, value);
            }) : elem ? dataAttr(elem, key, jQuery.data(elem, key)) : void 0;
        },
        removeData: function(key) {
            return this.each(function() {
                jQuery.removeData(this, key);
            });
        }
    }), jQuery.extend({
        queue: function(elem, type, data) {
            var queue;
            return elem ? (type = (type || "fx") + "queue", queue = jQuery._data(elem, type), 
            data && (!queue || jQuery.isArray(data) ? queue = jQuery._data(elem, type, jQuery.makeArray(data)) : queue.push(data)), 
            queue || []) : void 0;
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function() {
                jQuery.dequeue(elem, type);
            };
            "inprogress" === fn && (fn = queue.shift(), startLength--), fn && ("fx" === type && queue.unshift("inprogress"), 
            delete hooks.stop, fn.call(elem, next, hooks)), !startLength && hooks && hooks.empty.fire();
        },
        _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return jQuery._data(elem, key) || jQuery._data(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    jQuery._removeData(elem, type + "queue"), jQuery._removeData(elem, key);
                })
            });
        }
    }), jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;
            return "string" != typeof type && (data = type, type = "fx", setter--), arguments.length < setter ? jQuery.queue(this[0], type) : void 0 === data ? this : this.each(function() {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type), "fx" === type && "inprogress" !== queue[0] && jQuery.dequeue(this, type);
            });
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type);
            });
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", []);
        },
        promise: function(type, obj) {
            var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
                --count || defer.resolveWith(elements, [ elements ]);
            };
            for ("string" != typeof type && (obj = type, type = void 0), type = type || "fx"; i--; ) tmp = jQuery._data(elements[i], type + "queueHooks"), 
            tmp && tmp.empty && (count++, tmp.empty.add(resolve));
            return resolve(), defer.promise(obj);
        }
    });
    var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, cssExpand = [ "Top", "Right", "Bottom", "Left" ], isHidden = function(elem, el) {
        return elem = el || elem, "none" === jQuery.css(elem, "display") || !jQuery.contains(elem.ownerDocument, elem);
    }, access = jQuery.access = function(elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0, length = elems.length, bulk = null == key;
        if ("object" === jQuery.type(key)) {
            chainable = !0;
            for (i in key) jQuery.access(elems, fn, i, key[i], !0, emptyGet, raw);
        } else if (void 0 !== value && (chainable = !0, jQuery.isFunction(value) || (raw = !0), 
        bulk && (raw ? (fn.call(elems, value), fn = null) : (bulk = fn, fn = function(elem, key, value) {
            return bulk.call(jQuery(elem), value);
        })), fn)) for (;length > i; i++) fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
        return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet;
    }, rcheckableType = /^(?:checkbox|radio)$/i;
    !function() {
        var input = document.createElement("input"), div = document.createElement("div"), fragment = document.createDocumentFragment();
        if (div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", 
        support.leadingWhitespace = 3 === div.firstChild.nodeType, support.tbody = !div.getElementsByTagName("tbody").length, 
        support.htmlSerialize = !!div.getElementsByTagName("link").length, support.html5Clone = "<:nav></:nav>" !== document.createElement("nav").cloneNode(!0).outerHTML, 
        input.type = "checkbox", input.checked = !0, fragment.appendChild(input), support.appendChecked = input.checked, 
        div.innerHTML = "<textarea>x</textarea>", support.noCloneChecked = !!div.cloneNode(!0).lastChild.defaultValue, 
        fragment.appendChild(div), div.innerHTML = "<input type='radio' checked='checked' name='t'/>", 
        support.checkClone = div.cloneNode(!0).cloneNode(!0).lastChild.checked, support.noCloneEvent = !0, 
        div.attachEvent && (div.attachEvent("onclick", function() {
            support.noCloneEvent = !1;
        }), div.cloneNode(!0).click()), null == support.deleteExpando) {
            support.deleteExpando = !0;
            try {
                delete div.test;
            } catch (e) {
                support.deleteExpando = !1;
            }
        }
    }(), function() {
        var i, eventName, div = document.createElement("div");
        for (i in {
            submit: !0,
            change: !0,
            focusin: !0
        }) eventName = "on" + i, (support[i + "Bubbles"] = eventName in window) || (div.setAttribute(eventName, "t"), 
        support[i + "Bubbles"] = div.attributes[eventName].expando === !1);
        div = null;
    }();
    var rformElems = /^(?:input|select|textarea)$/i, rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/, rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
    jQuery.event = {
        global: {},
        add: function(elem, types, handler, data, selector) {
            var tmp, events, t, handleObjIn, special, eventHandle, handleObj, handlers, type, namespaces, origType, elemData = jQuery._data(elem);
            if (elemData) {
                for (handler.handler && (handleObjIn = handler, handler = handleObjIn.handler, selector = handleObjIn.selector), 
                handler.guid || (handler.guid = jQuery.guid++), (events = elemData.events) || (events = elemData.events = {}), 
                (eventHandle = elemData.handle) || (eventHandle = elemData.handle = function(e) {
                    return typeof jQuery === strundefined || e && jQuery.event.triggered === e.type ? void 0 : jQuery.event.dispatch.apply(eventHandle.elem, arguments);
                }, eventHandle.elem = elem), types = (types || "").match(rnotwhite) || [ "" ], t = types.length; t--; ) tmp = rtypenamespace.exec(types[t]) || [], 
                type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type && (special = jQuery.event.special[type] || {}, 
                type = (selector ? special.delegateType : special.bindType) || type, special = jQuery.event.special[type] || {}, 
                handleObj = jQuery.extend({
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn), (handlers = events[type]) || (handlers = events[type] = [], handlers.delegateCount = 0, 
                special.setup && special.setup.call(elem, data, namespaces, eventHandle) !== !1 || (elem.addEventListener ? elem.addEventListener(type, eventHandle, !1) : elem.attachEvent && elem.attachEvent("on" + type, eventHandle))), 
                special.add && (special.add.call(elem, handleObj), handleObj.handler.guid || (handleObj.handler.guid = handler.guid)), 
                selector ? handlers.splice(handlers.delegateCount++, 0, handleObj) : handlers.push(handleObj), 
                jQuery.event.global[type] = !0);
                elem = null;
            }
        },
        remove: function(elem, types, handler, selector, mappedTypes) {
            var j, handleObj, tmp, origCount, t, events, special, handlers, type, namespaces, origType, elemData = jQuery.hasData(elem) && jQuery._data(elem);
            if (elemData && (events = elemData.events)) {
                for (types = (types || "").match(rnotwhite) || [ "" ], t = types.length; t--; ) if (tmp = rtypenamespace.exec(types[t]) || [], 
                type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type) {
                    for (special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, 
                    handlers = events[type] || [], tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"), 
                    origCount = j = handlers.length; j--; ) handleObj = handlers[j], !mappedTypes && origType !== handleObj.origType || handler && handler.guid !== handleObj.guid || tmp && !tmp.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector) || (handlers.splice(j, 1), 
                    handleObj.selector && handlers.delegateCount--, special.remove && special.remove.call(elem, handleObj));
                    origCount && !handlers.length && (special.teardown && special.teardown.call(elem, namespaces, elemData.handle) !== !1 || jQuery.removeEvent(elem, type, elemData.handle), 
                    delete events[type]);
                } else for (type in events) jQuery.event.remove(elem, type + types[t], handler, selector, !0);
                jQuery.isEmptyObject(events) && (delete elemData.handle, jQuery._removeData(elem, "events"));
            }
        },
        trigger: function(event, data, elem, onlyHandlers) {
            var handle, ontype, cur, bubbleType, special, tmp, i, eventPath = [ elem || document ], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            if (cur = tmp = elem = elem || document, 3 !== elem.nodeType && 8 !== elem.nodeType && !rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf(".") >= 0 && (namespaces = type.split("."), 
            type = namespaces.shift(), namespaces.sort()), ontype = type.indexOf(":") < 0 && "on" + type, 
            event = event[jQuery.expando] ? event : new jQuery.Event(type, "object" == typeof event && event), 
            event.isTrigger = onlyHandlers ? 2 : 3, event.namespace = namespaces.join("."), 
            event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
            event.result = void 0, event.target || (event.target = elem), data = null == data ? [ event ] : jQuery.makeArray(data, [ event ]), 
            special = jQuery.event.special[type] || {}, onlyHandlers || !special.trigger || special.trigger.apply(elem, data) !== !1)) {
                if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                    for (bubbleType = special.delegateType || type, rfocusMorph.test(bubbleType + type) || (cur = cur.parentNode); cur; cur = cur.parentNode) eventPath.push(cur), 
                    tmp = cur;
                    tmp === (elem.ownerDocument || document) && eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                }
                for (i = 0; (cur = eventPath[i++]) && !event.isPropagationStopped(); ) event.type = i > 1 ? bubbleType : special.bindType || type, 
                handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle"), 
                handle && handle.apply(cur, data), handle = ontype && cur[ontype], handle && handle.apply && jQuery.acceptData(cur) && (event.result = handle.apply(cur, data), 
                event.result === !1 && event.preventDefault());
                if (event.type = type, !onlyHandlers && !event.isDefaultPrevented() && (!special._default || special._default.apply(eventPath.pop(), data) === !1) && jQuery.acceptData(elem) && ontype && elem[type] && !jQuery.isWindow(elem)) {
                    tmp = elem[ontype], tmp && (elem[ontype] = null), jQuery.event.triggered = type;
                    try {
                        elem[type]();
                    } catch (e) {}
                    jQuery.event.triggered = void 0, tmp && (elem[ontype] = tmp);
                }
                return event.result;
            }
        },
        dispatch: function(event) {
            event = jQuery.event.fix(event);
            var i, ret, handleObj, matched, j, handlerQueue = [], args = slice.call(arguments), handlers = (jQuery._data(this, "events") || {})[event.type] || [], special = jQuery.event.special[event.type] || {};
            if (args[0] = event, event.delegateTarget = this, !special.preDispatch || special.preDispatch.call(this, event) !== !1) {
                for (handlerQueue = jQuery.event.handlers.call(this, event, handlers), i = 0; (matched = handlerQueue[i++]) && !event.isPropagationStopped(); ) for (event.currentTarget = matched.elem, 
                j = 0; (handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped(); ) (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) && (event.handleObj = handleObj, 
                event.data = handleObj.data, ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args), 
                void 0 !== ret && (event.result = ret) === !1 && (event.preventDefault(), event.stopPropagation()));
                return special.postDispatch && special.postDispatch.call(this, event), event.result;
            }
        },
        handlers: function(event, handlers) {
            var sel, handleObj, matches, i, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
            if (delegateCount && cur.nodeType && (!event.button || "click" !== event.type)) for (;cur != this; cur = cur.parentNode || this) if (1 === cur.nodeType && (cur.disabled !== !0 || "click" !== event.type)) {
                for (matches = [], i = 0; delegateCount > i; i++) handleObj = handlers[i], sel = handleObj.selector + " ", 
                void 0 === matches[sel] && (matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [ cur ]).length), 
                matches[sel] && matches.push(handleObj);
                matches.length && handlerQueue.push({
                    elem: cur,
                    handlers: matches
                });
            }
            return delegateCount < handlers.length && handlerQueue.push({
                elem: this,
                handlers: handlers.slice(delegateCount)
            }), handlerQueue;
        },
        fix: function(event) {
            if (event[jQuery.expando]) return event;
            var i, prop, copy, type = event.type, originalEvent = event, fixHook = this.fixHooks[type];
            for (fixHook || (this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {}), 
            copy = fixHook.props ? this.props.concat(fixHook.props) : this.props, event = new jQuery.Event(originalEvent), 
            i = copy.length; i--; ) prop = copy[i], event[prop] = originalEvent[prop];
            return event.target || (event.target = originalEvent.srcElement || document), 3 === event.target.nodeType && (event.target = event.target.parentNode), 
            event.metaKey = !!event.metaKey, fixHook.filter ? fixHook.filter(event, originalEvent) : event;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(event, original) {
                return null == event.which && (event.which = null != original.charCode ? original.charCode : original.keyCode), 
                event;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(event, original) {
                var body, eventDoc, doc, button = original.button, fromElement = original.fromElement;
                return null == event.pageX && null != original.clientX && (eventDoc = event.target.ownerDocument || document, 
                doc = eventDoc.documentElement, body = eventDoc.body, event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0), 
                event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)), 
                !event.relatedTarget && fromElement && (event.relatedTarget = fromElement === event.target ? original.toElement : fromElement), 
                event.which || void 0 === button || (event.which = 1 & button ? 1 : 2 & button ? 3 : 4 & button ? 2 : 0), 
                event;
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== safeActiveElement() && this.focus) try {
                        return this.focus(), !1;
                    } catch (e) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === safeActiveElement() && this.blur ? (this.blur(), !1) : void 0;
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return jQuery.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), 
                    !1) : void 0;
                },
                _default: function(event) {
                    return jQuery.nodeName(event.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(event) {
                    void 0 !== event.result && event.originalEvent && (event.originalEvent.returnValue = event.result);
                }
            }
        },
        simulate: function(type, elem, event, bubble) {
            var e = jQuery.extend(new jQuery.Event(), event, {
                type: type,
                isSimulated: !0,
                originalEvent: {}
            });
            bubble ? jQuery.event.trigger(e, null, elem) : jQuery.event.dispatch.call(elem, e), 
            e.isDefaultPrevented() && event.preventDefault();
        }
    }, jQuery.removeEvent = document.removeEventListener ? function(elem, type, handle) {
        elem.removeEventListener && elem.removeEventListener(type, handle, !1);
    } : function(elem, type, handle) {
        var name = "on" + type;
        elem.detachEvent && (typeof elem[name] === strundefined && (elem[name] = null), 
        elem.detachEvent(name, handle));
    }, jQuery.Event = function(src, props) {
        return this instanceof jQuery.Event ? (src && src.type ? (this.originalEvent = src, 
        this.type = src.type, this.isDefaultPrevented = src.defaultPrevented || void 0 === src.defaultPrevented && src.returnValue === !1 ? returnTrue : returnFalse) : this.type = src, 
        props && jQuery.extend(this, props), this.timeStamp = src && src.timeStamp || jQuery.now(), 
        void (this[jQuery.expando] = !0)) : new jQuery.Event(src, props);
    }, jQuery.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1);
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue, e && (e.stopPropagation && e.stopPropagation(), 
            e.cancelBubble = !0);
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = returnTrue, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), 
            this.stopPropagation();
        }
    }, jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
                var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
                return (!related || related !== target && !jQuery.contains(target, related)) && (event.type = handleObj.origType, 
                ret = handleObj.handler.apply(this, arguments), event.type = fix), ret;
            }
        };
    }), support.submitBubbles || (jQuery.event.special.submit = {
        setup: function() {
            return jQuery.nodeName(this, "form") ? !1 : void jQuery.event.add(this, "click._submit keypress._submit", function(e) {
                var elem = e.target, form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : void 0;
                form && !jQuery._data(form, "submitBubbles") && (jQuery.event.add(form, "submit._submit", function(event) {
                    event._submit_bubble = !0;
                }), jQuery._data(form, "submitBubbles", !0));
            });
        },
        postDispatch: function(event) {
            event._submit_bubble && (delete event._submit_bubble, this.parentNode && !event.isTrigger && jQuery.event.simulate("submit", this.parentNode, event, !0));
        },
        teardown: function() {
            return jQuery.nodeName(this, "form") ? !1 : void jQuery.event.remove(this, "._submit");
        }
    }), support.changeBubbles || (jQuery.event.special.change = {
        setup: function() {
            return rformElems.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (jQuery.event.add(this, "propertychange._change", function(event) {
                "checked" === event.originalEvent.propertyName && (this._just_changed = !0);
            }), jQuery.event.add(this, "click._change", function(event) {
                this._just_changed && !event.isTrigger && (this._just_changed = !1), jQuery.event.simulate("change", this, event, !0);
            })), !1) : void jQuery.event.add(this, "beforeactivate._change", function(e) {
                var elem = e.target;
                rformElems.test(elem.nodeName) && !jQuery._data(elem, "changeBubbles") && (jQuery.event.add(elem, "change._change", function(event) {
                    !this.parentNode || event.isSimulated || event.isTrigger || jQuery.event.simulate("change", this.parentNode, event, !0);
                }), jQuery._data(elem, "changeBubbles", !0));
            });
        },
        handle: function(event) {
            var elem = event.target;
            return this !== elem || event.isSimulated || event.isTrigger || "radio" !== elem.type && "checkbox" !== elem.type ? event.handleObj.handler.apply(this, arguments) : void 0;
        },
        teardown: function() {
            return jQuery.event.remove(this, "._change"), !rformElems.test(this.nodeName);
        }
    }), support.focusinBubbles || jQuery.each({
        focus: "focusin",
        blur: "focusout"
    }, function(orig, fix) {
        var handler = function(event) {
            jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), !0);
        };
        jQuery.event.special[fix] = {
            setup: function() {
                var doc = this.ownerDocument || this, attaches = jQuery._data(doc, fix);
                attaches || doc.addEventListener(orig, handler, !0), jQuery._data(doc, fix, (attaches || 0) + 1);
            },
            teardown: function() {
                var doc = this.ownerDocument || this, attaches = jQuery._data(doc, fix) - 1;
                attaches ? jQuery._data(doc, fix, attaches) : (doc.removeEventListener(orig, handler, !0), 
                jQuery._removeData(doc, fix));
            }
        };
    }), jQuery.fn.extend({
        on: function(types, selector, data, fn, one) {
            var type, origFn;
            if ("object" == typeof types) {
                "string" != typeof selector && (data = data || selector, selector = void 0);
                for (type in types) this.on(type, selector, data, types[type], one);
                return this;
            }
            if (null == data && null == fn ? (fn = selector, data = selector = void 0) : null == fn && ("string" == typeof selector ? (fn = data, 
            data = void 0) : (fn = data, data = selector, selector = void 0)), fn === !1) fn = returnFalse; else if (!fn) return this;
            return 1 === one && (origFn = fn, fn = function(event) {
                return jQuery().off(event), origFn.apply(this, arguments);
            }, fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)), this.each(function() {
                jQuery.event.add(this, types, fn, data, selector);
            });
        },
        one: function(types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1);
        },
        off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) return handleObj = types.handleObj, 
            jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler), 
            this;
            if ("object" == typeof types) {
                for (type in types) this.off(type, selector, types[type]);
                return this;
            }
            return (selector === !1 || "function" == typeof selector) && (fn = selector, selector = void 0), 
            fn === !1 && (fn = returnFalse), this.each(function() {
                jQuery.event.remove(this, types, fn, selector);
            });
        },
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function(type, data) {
            var elem = this[0];
            return elem ? jQuery.event.trigger(type, data, elem, !0) : void 0;
        }
    });
    var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g, rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"), rleadingWhitespace = /^\s+/, rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, rtagName = /<([\w:]+)/, rtbody = /<tbody/i, rhtml = /<|&#?\w+;/, rnoInnerhtml = /<(?:script|style|link)/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptType = /^$|\/(?:java|ecma)script/i, rscriptTypeMasked = /^true\/(.*)/, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, wrapMap = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        legend: [ 1, "<fieldset>", "</fieldset>" ],
        area: [ 1, "<map>", "</map>" ],
        param: [ 1, "<object>", "</object>" ],
        thead: [ 1, "<table>", "</table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
    }, safeFragment = createSafeFragment(document), fragmentDiv = safeFragment.appendChild(document.createElement("div"));
    wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, 
    wrapMap.th = wrapMap.td, jQuery.extend({
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var destElements, node, clone, i, srcElements, inPage = jQuery.contains(elem.ownerDocument, elem);
            if (support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">") ? clone = elem.cloneNode(!0) : (fragmentDiv.innerHTML = elem.outerHTML, 
            fragmentDiv.removeChild(clone = fragmentDiv.firstChild)), !(support.noCloneEvent && support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem))) for (destElements = getAll(clone), 
            srcElements = getAll(elem), i = 0; null != (node = srcElements[i]); ++i) destElements[i] && fixCloneNodeIssues(node, destElements[i]);
            if (dataAndEvents) if (deepDataAndEvents) for (srcElements = srcElements || getAll(elem), 
            destElements = destElements || getAll(clone), i = 0; null != (node = srcElements[i]); i++) cloneCopyEvent(node, destElements[i]); else cloneCopyEvent(elem, clone);
            return destElements = getAll(clone, "script"), destElements.length > 0 && setGlobalEval(destElements, !inPage && getAll(elem, "script")), 
            destElements = srcElements = node = null, clone;
        },
        buildFragment: function(elems, context, scripts, selection) {
            for (var j, elem, contains, tmp, tag, tbody, wrap, l = elems.length, safe = createSafeFragment(context), nodes = [], i = 0; l > i; i++) if (elem = elems[i], 
            elem || 0 === elem) if ("object" === jQuery.type(elem)) jQuery.merge(nodes, elem.nodeType ? [ elem ] : elem); else if (rhtml.test(elem)) {
                for (tmp = tmp || safe.appendChild(context.createElement("div")), tag = (rtagName.exec(elem) || [ "", "" ])[1].toLowerCase(), 
                wrap = wrapMap[tag] || wrapMap._default, tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2], 
                j = wrap[0]; j--; ) tmp = tmp.lastChild;
                if (!support.leadingWhitespace && rleadingWhitespace.test(elem) && nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0])), 
                !support.tbody) for (elem = "table" !== tag || rtbody.test(elem) ? "<table>" !== wrap[1] || rtbody.test(elem) ? 0 : tmp : tmp.firstChild, 
                j = elem && elem.childNodes.length; j--; ) jQuery.nodeName(tbody = elem.childNodes[j], "tbody") && !tbody.childNodes.length && elem.removeChild(tbody);
                for (jQuery.merge(nodes, tmp.childNodes), tmp.textContent = ""; tmp.firstChild; ) tmp.removeChild(tmp.firstChild);
                tmp = safe.lastChild;
            } else nodes.push(context.createTextNode(elem));
            for (tmp && safe.removeChild(tmp), support.appendChecked || jQuery.grep(getAll(nodes, "input"), fixDefaultChecked), 
            i = 0; elem = nodes[i++]; ) if ((!selection || -1 === jQuery.inArray(elem, selection)) && (contains = jQuery.contains(elem.ownerDocument, elem), 
            tmp = getAll(safe.appendChild(elem), "script"), contains && setGlobalEval(tmp), 
            scripts)) for (j = 0; elem = tmp[j++]; ) rscriptType.test(elem.type || "") && scripts.push(elem);
            return tmp = null, safe;
        },
        cleanData: function(elems, acceptData) {
            for (var elem, type, id, data, i = 0, internalKey = jQuery.expando, cache = jQuery.cache, deleteExpando = support.deleteExpando, special = jQuery.event.special; null != (elem = elems[i]); i++) if ((acceptData || jQuery.acceptData(elem)) && (id = elem[internalKey], 
            data = id && cache[id])) {
                if (data.events) for (type in data.events) special[type] ? jQuery.event.remove(elem, type) : jQuery.removeEvent(elem, type, data.handle);
                cache[id] && (delete cache[id], deleteExpando ? delete elem[internalKey] : typeof elem.removeAttribute !== strundefined ? elem.removeAttribute(internalKey) : elem[internalKey] = null, 
                deletedIds.push(id));
            }
        }
    }), jQuery.fn.extend({
        text: function(value) {
            return access(this, function(value) {
                return void 0 === value ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
            }, null, value, arguments.length);
        },
        append: function() {
            return this.domManip(arguments, function(elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem);
                }
            });
        },
        prepend: function() {
            return this.domManip(arguments, function(elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild);
                }
            });
        },
        before: function() {
            return this.domManip(arguments, function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this);
            });
        },
        after: function() {
            return this.domManip(arguments, function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this.nextSibling);
            });
        },
        remove: function(selector, keepData) {
            for (var elem, elems = selector ? jQuery.filter(selector, this) : this, i = 0; null != (elem = elems[i]); i++) keepData || 1 !== elem.nodeType || jQuery.cleanData(getAll(elem)), 
            elem.parentNode && (keepData && jQuery.contains(elem.ownerDocument, elem) && setGlobalEval(getAll(elem, "script")), 
            elem.parentNode.removeChild(elem));
            return this;
        },
        empty: function() {
            for (var elem, i = 0; null != (elem = this[i]); i++) {
                for (1 === elem.nodeType && jQuery.cleanData(getAll(elem, !1)); elem.firstChild; ) elem.removeChild(elem.firstChild);
                elem.options && jQuery.nodeName(elem, "select") && (elem.options.length = 0);
            }
            return this;
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
            return dataAndEvents = null == dataAndEvents ? !1 : dataAndEvents, deepDataAndEvents = null == deepDataAndEvents ? dataAndEvents : deepDataAndEvents, 
            this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },
        html: function(value) {
            return access(this, function(value) {
                var elem = this[0] || {}, i = 0, l = this.length;
                if (void 0 === value) return 1 === elem.nodeType ? elem.innerHTML.replace(rinlinejQuery, "") : void 0;
                if ("string" == typeof value && !rnoInnerhtml.test(value) && (support.htmlSerialize || !rnoshimcache.test(value)) && (support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || [ "", "" ])[1].toLowerCase()]) {
                    value = value.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (;l > i; i++) elem = this[i] || {}, 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), 
                        elem.innerHTML = value);
                        elem = 0;
                    } catch (e) {}
                }
                elem && this.empty().append(value);
            }, null, value, arguments.length);
        },
        replaceWith: function() {
            var arg = arguments[0];
            return this.domManip(arguments, function(elem) {
                arg = this.parentNode, jQuery.cleanData(getAll(this)), arg && arg.replaceChild(elem, this);
            }), arg && (arg.length || arg.nodeType) ? this : this.remove();
        },
        detach: function(selector) {
            return this.remove(selector, !0);
        },
        domManip: function(args, callback) {
            args = concat.apply([], args);
            var first, node, hasScripts, scripts, doc, fragment, i = 0, l = this.length, set = this, iNoClone = l - 1, value = args[0], isFunction = jQuery.isFunction(value);
            if (isFunction || l > 1 && "string" == typeof value && !support.checkClone && rchecked.test(value)) return this.each(function(index) {
                var self = set.eq(index);
                isFunction && (args[0] = value.call(this, index, self.html())), self.domManip(args, callback);
            });
            if (l && (fragment = jQuery.buildFragment(args, this[0].ownerDocument, !1, this), 
            first = fragment.firstChild, 1 === fragment.childNodes.length && (fragment = first), 
            first)) {
                for (scripts = jQuery.map(getAll(fragment, "script"), disableScript), hasScripts = scripts.length; l > i; i++) node = fragment, 
                i !== iNoClone && (node = jQuery.clone(node, !0, !0), hasScripts && jQuery.merge(scripts, getAll(node, "script"))), 
                callback.call(this[i], node, i);
                if (hasScripts) for (doc = scripts[scripts.length - 1].ownerDocument, jQuery.map(scripts, restoreScript), 
                i = 0; hasScripts > i; i++) node = scripts[i], rscriptType.test(node.type || "") && !jQuery._data(node, "globalEval") && jQuery.contains(doc, node) && (node.src ? jQuery._evalUrl && jQuery._evalUrl(node.src) : jQuery.globalEval((node.text || node.textContent || node.innerHTML || "").replace(rcleanScript, "")));
                fragment = first = null;
            }
            return this;
        }
    }), jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            for (var elems, i = 0, ret = [], insert = jQuery(selector), last = insert.length - 1; last >= i; i++) elems = i === last ? this : this.clone(!0), 
            jQuery(insert[i])[original](elems), push.apply(ret, elems.get());
            return this.pushStack(ret);
        };
    });
    var iframe, elemdisplay = {};
    !function() {
        var shrinkWrapBlocksVal;
        support.shrinkWrapBlocks = function() {
            if (null != shrinkWrapBlocksVal) return shrinkWrapBlocksVal;
            shrinkWrapBlocksVal = !1;
            var div, body, container;
            return body = document.getElementsByTagName("body")[0], body && body.style ? (div = document.createElement("div"), 
            container = document.createElement("div"), container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", 
            body.appendChild(container).appendChild(div), typeof div.style.zoom !== strundefined && (div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", 
            div.appendChild(document.createElement("div")).style.width = "5px", shrinkWrapBlocksVal = 3 !== div.offsetWidth), 
            body.removeChild(container), shrinkWrapBlocksVal) : void 0;
        };
    }();
    var getStyles, curCSS, rmargin = /^margin/, rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i"), rposition = /^(top|right|bottom|left)$/;
    window.getComputedStyle ? (getStyles = function(elem) {
        return elem.ownerDocument.defaultView.opener ? elem.ownerDocument.defaultView.getComputedStyle(elem, null) : window.getComputedStyle(elem, null);
    }, curCSS = function(elem, name, computed) {
        var width, minWidth, maxWidth, ret, style = elem.style;
        return computed = computed || getStyles(elem), ret = computed ? computed.getPropertyValue(name) || computed[name] : void 0, 
        computed && ("" !== ret || jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, name)), 
        rnumnonpx.test(ret) && rmargin.test(name) && (width = style.width, minWidth = style.minWidth, 
        maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = ret, 
        ret = computed.width, style.width = width, style.minWidth = minWidth, style.maxWidth = maxWidth)), 
        void 0 === ret ? ret : ret + "";
    }) : document.documentElement.currentStyle && (getStyles = function(elem) {
        return elem.currentStyle;
    }, curCSS = function(elem, name, computed) {
        var left, rs, rsLeft, ret, style = elem.style;
        return computed = computed || getStyles(elem), ret = computed ? computed[name] : void 0, 
        null == ret && style && style[name] && (ret = style[name]), rnumnonpx.test(ret) && !rposition.test(name) && (left = style.left, 
        rs = elem.runtimeStyle, rsLeft = rs && rs.left, rsLeft && (rs.left = elem.currentStyle.left), 
        style.left = "fontSize" === name ? "1em" : ret, ret = style.pixelLeft + "px", style.left = left, 
        rsLeft && (rs.left = rsLeft)), void 0 === ret ? ret : ret + "" || "auto";
    }), function() {
        function computeStyleTests() {
            var div, body, container, contents;
            body = document.getElementsByTagName("body")[0], body && body.style && (div = document.createElement("div"), 
            container = document.createElement("div"), container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", 
            body.appendChild(container).appendChild(div), div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", 
            pixelPositionVal = boxSizingReliableVal = !1, reliableMarginRightVal = !0, window.getComputedStyle && (pixelPositionVal = "1%" !== (window.getComputedStyle(div, null) || {}).top, 
            boxSizingReliableVal = "4px" === (window.getComputedStyle(div, null) || {
                width: "4px"
            }).width, contents = div.appendChild(document.createElement("div")), contents.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", 
            contents.style.marginRight = contents.style.width = "0", div.style.width = "1px", 
            reliableMarginRightVal = !parseFloat((window.getComputedStyle(contents, null) || {}).marginRight), 
            div.removeChild(contents)), div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", 
            contents = div.getElementsByTagName("td"), contents[0].style.cssText = "margin:0;border:0;padding:0;display:none", 
            reliableHiddenOffsetsVal = 0 === contents[0].offsetHeight, reliableHiddenOffsetsVal && (contents[0].style.display = "", 
            contents[1].style.display = "none", reliableHiddenOffsetsVal = 0 === contents[0].offsetHeight), 
            body.removeChild(container));
        }
        var div, style, a, pixelPositionVal, boxSizingReliableVal, reliableHiddenOffsetsVal, reliableMarginRightVal;
        div = document.createElement("div"), div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", 
        a = div.getElementsByTagName("a")[0], style = a && a.style, style && (style.cssText = "float:left;opacity:.5", 
        support.opacity = "0.5" === style.opacity, support.cssFloat = !!style.cssFloat, 
        div.style.backgroundClip = "content-box", div.cloneNode(!0).style.backgroundClip = "", 
        support.clearCloneStyle = "content-box" === div.style.backgroundClip, support.boxSizing = "" === style.boxSizing || "" === style.MozBoxSizing || "" === style.WebkitBoxSizing, 
        jQuery.extend(support, {
            reliableHiddenOffsets: function() {
                return null == reliableHiddenOffsetsVal && computeStyleTests(), reliableHiddenOffsetsVal;
            },
            boxSizingReliable: function() {
                return null == boxSizingReliableVal && computeStyleTests(), boxSizingReliableVal;
            },
            pixelPosition: function() {
                return null == pixelPositionVal && computeStyleTests(), pixelPositionVal;
            },
            reliableMarginRight: function() {
                return null == reliableMarginRightVal && computeStyleTests(), reliableMarginRightVal;
            }
        }));
    }(), jQuery.swap = function(elem, options, callback, args) {
        var ret, name, old = {};
        for (name in options) old[name] = elem.style[name], elem.style[name] = options[name];
        ret = callback.apply(elem, args || []);
        for (name in options) elem.style[name] = old[name];
        return ret;
    };
    var ralpha = /alpha\([^)]*\)/i, ropacity = /opacity\s*=\s*([^)]*)/, rdisplayswap = /^(none|table(?!-c[ea]).+)/, rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"), rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"), cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, cssNormalTransform = {
        letterSpacing: "0",
        fontWeight: "400"
    }, cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return "" === ret ? "1" : ret;
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(elem, name, value, extra) {
            if (elem && 3 !== elem.nodeType && 8 !== elem.nodeType && elem.style) {
                var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
                if (name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName)), 
                hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], void 0 === value) return hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, !1, extra)) ? ret : style[name];
                if (type = typeof value, "string" === type && (ret = rrelNum.exec(value)) && (value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name)), 
                type = "number"), null != value && value === value && ("number" !== type || jQuery.cssNumber[origName] || (value += "px"), 
                support.clearCloneStyle || "" !== value || 0 !== name.indexOf("background") || (style[name] = "inherit"), 
                !(hooks && "set" in hooks && void 0 === (value = hooks.set(elem, value, extra))))) try {
                    style[name] = value;
                } catch (e) {}
            }
        },
        css: function(elem, name, extra, styles) {
            var num, val, hooks, origName = jQuery.camelCase(name);
            return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName)), 
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], hooks && "get" in hooks && (val = hooks.get(elem, !0, extra)), 
            void 0 === val && (val = curCSS(elem, name, styles)), "normal" === val && name in cssNormalTransform && (val = cssNormalTransform[name]), 
            "" === extra || extra ? (num = parseFloat(val), extra === !0 || jQuery.isNumeric(num) ? num || 0 : val) : val;
        }
    }), jQuery.each([ "height", "width" ], function(i, name) {
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra) {
                return computed ? rdisplayswap.test(jQuery.css(elem, "display")) && 0 === elem.offsetWidth ? jQuery.swap(elem, cssShow, function() {
                    return getWidthOrHeight(elem, name, extra);
                }) : getWidthOrHeight(elem, name, extra) : void 0;
            },
            set: function(elem, value, extra) {
                var styles = extra && getStyles(elem);
                return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing", !1, styles), styles) : 0);
            }
        };
    }), support.opacity || (jQuery.cssHooks.opacity = {
        get: function(elem, computed) {
            return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : computed ? "1" : "";
        },
        set: function(elem, value) {
            var style = elem.style, currentStyle = elem.currentStyle, opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + 100 * value + ")" : "", filter = currentStyle && currentStyle.filter || style.filter || "";
            style.zoom = 1, (value >= 1 || "" === value) && "" === jQuery.trim(filter.replace(ralpha, "")) && style.removeAttribute && (style.removeAttribute("filter"), 
            "" === value || currentStyle && !currentStyle.filter) || (style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity);
        }
    }), jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
        return computed ? jQuery.swap(elem, {
            display: "inline-block"
        }, curCSS, [ elem, "marginRight" ]) : void 0;
    }), jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                for (var i = 0, expanded = {}, parts = "string" == typeof value ? value.split(" ") : [ value ]; 4 > i; i++) expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                return expanded;
            }
        }, rmargin.test(prefix) || (jQuery.cssHooks[prefix + suffix].set = setPositiveNumber);
    }), jQuery.fn.extend({
        css: function(name, value) {
            return access(this, function(elem, name, value) {
                var styles, len, map = {}, i = 0;
                if (jQuery.isArray(name)) {
                    for (styles = getStyles(elem), len = name.length; len > i; i++) map[name[i]] = jQuery.css(elem, name[i], !1, styles);
                    return map;
                }
                return void 0 !== value ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
            }, name, value, arguments.length > 1);
        },
        show: function() {
            return showHide(this, !0);
        },
        hide: function() {
            return showHide(this);
        },
        toggle: function(state) {
            return "boolean" == typeof state ? state ? this.show() : this.hide() : this.each(function() {
                isHidden(this) ? jQuery(this).show() : jQuery(this).hide();
            });
        }
    }), jQuery.Tween = Tween, Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem, this.prop = prop, this.easing = easing || "swing", this.options = options, 
            this.start = this.now = this.cur(), this.end = end, this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
        },
        cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
        },
        run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            return this.options.duration ? this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : this.pos = eased = percent, 
            this.now = (this.end - this.start) * eased + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
            hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this), this;
        }
    }, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result;
                return null == tween.elem[tween.prop] || tween.elem.style && null != tween.elem.style[tween.prop] ? (result = jQuery.css(tween.elem, tween.prop, ""), 
                result && "auto" !== result ? result : 0) : tween.elem[tween.prop];
            },
            set: function(tween) {
                jQuery.fx.step[tween.prop] ? jQuery.fx.step[tween.prop](tween) : tween.elem.style && (null != tween.elem.style[jQuery.cssProps[tween.prop]] || jQuery.cssHooks[tween.prop]) ? jQuery.style(tween.elem, tween.prop, tween.now + tween.unit) : tween.elem[tween.prop] = tween.now;
            }
        }
    }, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
            tween.elem.nodeType && tween.elem.parentNode && (tween.elem[tween.prop] = tween.now);
        }
    }, jQuery.easing = {
        linear: function(p) {
            return p;
        },
        swing: function(p) {
            return .5 - Math.cos(p * Math.PI) / 2;
        }
    }, jQuery.fx = Tween.prototype.init, jQuery.fx.step = {};
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"), rrun = /queueHooks$/, animationPrefilters = [ defaultPrefilter ], tweeners = {
        "*": [ function(prop, value) {
            var tween = this.createTween(prop, value), target = tween.cur(), parts = rfxnum.exec(value), unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px"), start = (jQuery.cssNumber[prop] || "px" !== unit && +target) && rfxnum.exec(jQuery.css(tween.elem, prop)), scale = 1, maxIterations = 20;
            if (start && start[3] !== unit) {
                unit = unit || start[3], parts = parts || [], start = +target || 1;
                do scale = scale || ".5", start /= scale, jQuery.style(tween.elem, prop, start + unit); while (scale !== (scale = tween.cur() / target) && 1 !== scale && --maxIterations);
            }
            return parts && (start = tween.start = +start || +target || 0, tween.unit = unit, 
            tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2]), tween;
        } ]
    };
    jQuery.Animation = jQuery.extend(Animation, {
        tweener: function(props, callback) {
            jQuery.isFunction(props) ? (callback = props, props = [ "*" ]) : props = props.split(" ");
            for (var prop, index = 0, length = props.length; length > index; index++) prop = props[index], 
            tweeners[prop] = tweeners[prop] || [], tweeners[prop].unshift(callback);
        },
        prefilter: function(callback, prepend) {
            prepend ? animationPrefilters.unshift(callback) : animationPrefilters.push(callback);
        }
    }), jQuery.speed = function(speed, easing, fn) {
        var opt = speed && "object" == typeof speed ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };
        return opt.duration = jQuery.fx.off ? 0 : "number" == typeof opt.duration ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default, 
        (null == opt.queue || opt.queue === !0) && (opt.queue = "fx"), opt.old = opt.complete, 
        opt.complete = function() {
            jQuery.isFunction(opt.old) && opt.old.call(this), opt.queue && jQuery.dequeue(this, opt.queue);
        }, opt;
    }, jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHidden).css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback);
        },
        animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function() {
                var anim = Animation(this, jQuery.extend({}, prop), optall);
                (empty || jQuery._data(this, "finish")) && anim.stop(!0);
            };
            return doAnimation.finish = doAnimation, empty || optall.queue === !1 ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
        },
        stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop, stop(gotoEnd);
            };
            return "string" != typeof type && (gotoEnd = clearQueue, clearQueue = type, type = void 0), 
            clearQueue && type !== !1 && this.queue(type || "fx", []), this.each(function() {
                var dequeue = !0, index = null != type && type + "queueHooks", timers = jQuery.timers, data = jQuery._data(this);
                if (index) data[index] && data[index].stop && stopQueue(data[index]); else for (index in data) data[index] && data[index].stop && rrun.test(index) && stopQueue(data[index]);
                for (index = timers.length; index--; ) timers[index].elem !== this || null != type && timers[index].queue !== type || (timers[index].anim.stop(gotoEnd), 
                dequeue = !1, timers.splice(index, 1));
                (dequeue || !gotoEnd) && jQuery.dequeue(this, type);
            });
        },
        finish: function(type) {
            return type !== !1 && (type = type || "fx"), this.each(function() {
                var index, data = jQuery._data(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
                for (data.finish = !0, jQuery.queue(this, type, []), hooks && hooks.stop && hooks.stop.call(this, !0), 
                index = timers.length; index--; ) timers[index].elem === this && timers[index].queue === type && (timers[index].anim.stop(!0), 
                timers.splice(index, 1));
                for (index = 0; length > index; index++) queue[index] && queue[index].finish && queue[index].finish.call(this);
                delete data.finish;
            });
        }
    }), jQuery.each([ "toggle", "show", "hide" ], function(i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
            return null == speed || "boolean" == typeof speed ? cssFn.apply(this, arguments) : this.animate(genFx(name, !0), speed, easing, callback);
        };
    }), jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    }), jQuery.timers = [], jQuery.fx.tick = function() {
        var timer, timers = jQuery.timers, i = 0;
        for (fxNow = jQuery.now(); i < timers.length; i++) timer = timers[i], timer() || timers[i] !== timer || timers.splice(i--, 1);
        timers.length || jQuery.fx.stop(), fxNow = void 0;
    }, jQuery.fx.timer = function(timer) {
        jQuery.timers.push(timer), timer() ? jQuery.fx.start() : jQuery.timers.pop();
    }, jQuery.fx.interval = 13, jQuery.fx.start = function() {
        timerId || (timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval));
    }, jQuery.fx.stop = function() {
        clearInterval(timerId), timerId = null;
    }, jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, jQuery.fn.delay = function(time, type) {
        return time = jQuery.fx ? jQuery.fx.speeds[time] || time : time, type = type || "fx", 
        this.queue(type, function(next, hooks) {
            var timeout = setTimeout(next, time);
            hooks.stop = function() {
                clearTimeout(timeout);
            };
        });
    }, function() {
        var input, div, select, a, opt;
        div = document.createElement("div"), div.setAttribute("className", "t"), div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", 
        a = div.getElementsByTagName("a")[0], select = document.createElement("select"), 
        opt = select.appendChild(document.createElement("option")), input = div.getElementsByTagName("input")[0], 
        a.style.cssText = "top:1px", support.getSetAttribute = "t" !== div.className, support.style = /top/.test(a.getAttribute("style")), 
        support.hrefNormalized = "/a" === a.getAttribute("href"), support.checkOn = !!input.value, 
        support.optSelected = opt.selected, support.enctype = !!document.createElement("form").enctype, 
        select.disabled = !0, support.optDisabled = !opt.disabled, input = document.createElement("input"), 
        input.setAttribute("value", ""), support.input = "" === input.getAttribute("value"), 
        input.value = "t", input.setAttribute("type", "radio"), support.radioValue = "t" === input.value;
    }();
    var rreturn = /\r/g;
    jQuery.fn.extend({
        val: function(value) {
            var hooks, ret, isFunction, elem = this[0];
            {
                if (arguments.length) return isFunction = jQuery.isFunction(value), this.each(function(i) {
                    var val;
                    1 === this.nodeType && (val = isFunction ? value.call(this, i, jQuery(this).val()) : value, 
                    null == val ? val = "" : "number" == typeof val ? val += "" : jQuery.isArray(val) && (val = jQuery.map(val, function(value) {
                        return null == value ? "" : value + "";
                    })), hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()], 
                    hooks && "set" in hooks && void 0 !== hooks.set(this, val, "value") || (this.value = val));
                });
                if (elem) return hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()], 
                hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, "value")) ? ret : (ret = elem.value, 
                "string" == typeof ret ? ret.replace(rreturn, "") : null == ret ? "" : ret);
            }
        }
    }), jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    var val = jQuery.find.attr(elem, "value");
                    return null != val ? val : jQuery.trim(jQuery.text(elem));
                }
            },
            select: {
                get: function(elem) {
                    for (var value, option, options = elem.options, index = elem.selectedIndex, one = "select-one" === elem.type || 0 > index, values = one ? null : [], max = one ? index + 1 : options.length, i = 0 > index ? max : one ? index : 0; max > i; i++) if (option = options[i], 
                    (option.selected || i === index) && (support.optDisabled ? !option.disabled : null === option.getAttribute("disabled")) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                        if (value = jQuery(option).val(), one) return value;
                        values.push(value);
                    }
                    return values;
                },
                set: function(elem, value) {
                    for (var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length; i--; ) if (option = options[i], 
                    jQuery.inArray(jQuery.valHooks.option.get(option), values) >= 0) try {
                        option.selected = optionSet = !0;
                    } catch (_) {
                        option.scrollHeight;
                    } else option.selected = !1;
                    return optionSet || (elem.selectedIndex = -1), options;
                }
            }
        }
    }), jQuery.each([ "radio", "checkbox" ], function() {
        jQuery.valHooks[this] = {
            set: function(elem, value) {
                return jQuery.isArray(value) ? elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0 : void 0;
            }
        }, support.checkOn || (jQuery.valHooks[this].get = function(elem) {
            return null === elem.getAttribute("value") ? "on" : elem.value;
        });
    });
    var nodeHook, boolHook, attrHandle = jQuery.expr.attrHandle, ruseDefault = /^(?:checked|selected)$/i, getSetAttribute = support.getSetAttribute, getSetInput = support.input;
    jQuery.fn.extend({
        attr: function(name, value) {
            return access(this, jQuery.attr, name, value, arguments.length > 1);
        },
        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name);
            });
        }
    }), jQuery.extend({
        attr: function(elem, name, value) {
            var hooks, ret, nType = elem.nodeType;
            if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return typeof elem.getAttribute === strundefined ? jQuery.prop(elem, name, value) : (1 === nType && jQuery.isXMLDoc(elem) || (name = name.toLowerCase(), 
            hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook)), 
            void 0 === value ? hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : (ret = jQuery.find.attr(elem, name), 
            null == ret ? void 0 : ret) : null !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : (elem.setAttribute(name, value + ""), 
            value) : void jQuery.removeAttr(elem, name));
        },
        removeAttr: function(elem, value) {
            var name, propName, i = 0, attrNames = value && value.match(rnotwhite);
            if (attrNames && 1 === elem.nodeType) for (;name = attrNames[i++]; ) propName = jQuery.propFix[name] || name, 
            jQuery.expr.match.bool.test(name) ? getSetInput && getSetAttribute || !ruseDefault.test(name) ? elem[propName] = !1 : elem[jQuery.camelCase("default-" + name)] = elem[propName] = !1 : jQuery.attr(elem, name, ""), 
            elem.removeAttribute(getSetAttribute ? name : propName);
        },
        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (!support.radioValue && "radio" === value && jQuery.nodeName(elem, "input")) {
                        var val = elem.value;
                        return elem.setAttribute("type", value), val && (elem.value = val), value;
                    }
                }
            }
        }
    }), boolHook = {
        set: function(elem, value, name) {
            return value === !1 ? jQuery.removeAttr(elem, name) : getSetInput && getSetAttribute || !ruseDefault.test(name) ? elem.setAttribute(!getSetAttribute && jQuery.propFix[name] || name, name) : elem[jQuery.camelCase("default-" + name)] = elem[name] = !0, 
            name;
        }
    }, jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
        var getter = attrHandle[name] || jQuery.find.attr;
        attrHandle[name] = getSetInput && getSetAttribute || !ruseDefault.test(name) ? function(elem, name, isXML) {
            var ret, handle;
            return isXML || (handle = attrHandle[name], attrHandle[name] = ret, ret = null != getter(elem, name, isXML) ? name.toLowerCase() : null, 
            attrHandle[name] = handle), ret;
        } : function(elem, name, isXML) {
            return isXML ? void 0 : elem[jQuery.camelCase("default-" + name)] ? name.toLowerCase() : null;
        };
    }), getSetInput && getSetAttribute || (jQuery.attrHooks.value = {
        set: function(elem, value, name) {
            return jQuery.nodeName(elem, "input") ? void (elem.defaultValue = value) : nodeHook && nodeHook.set(elem, value, name);
        }
    }), getSetAttribute || (nodeHook = {
        set: function(elem, value, name) {
            var ret = elem.getAttributeNode(name);
            return ret || elem.setAttributeNode(ret = elem.ownerDocument.createAttribute(name)), 
            ret.value = value += "", "value" === name || value === elem.getAttribute(name) ? value : void 0;
        }
    }, attrHandle.id = attrHandle.name = attrHandle.coords = function(elem, name, isXML) {
        var ret;
        return isXML ? void 0 : (ret = elem.getAttributeNode(name)) && "" !== ret.value ? ret.value : null;
    }, jQuery.valHooks.button = {
        get: function(elem, name) {
            var ret = elem.getAttributeNode(name);
            return ret && ret.specified ? ret.value : void 0;
        },
        set: nodeHook.set
    }, jQuery.attrHooks.contenteditable = {
        set: function(elem, value, name) {
            nodeHook.set(elem, "" === value ? !1 : value, name);
        }
    }, jQuery.each([ "width", "height" ], function(i, name) {
        jQuery.attrHooks[name] = {
            set: function(elem, value) {
                return "" === value ? (elem.setAttribute(name, "auto"), value) : void 0;
            }
        };
    })), support.style || (jQuery.attrHooks.style = {
        get: function(elem) {
            return elem.style.cssText || void 0;
        },
        set: function(elem, value) {
            return elem.style.cssText = value + "";
        }
    });
    var rfocusable = /^(?:input|select|textarea|button|object)$/i, rclickable = /^(?:a|area)$/i;
    jQuery.fn.extend({
        prop: function(name, value) {
            return access(this, jQuery.prop, name, value, arguments.length > 1);
        },
        removeProp: function(name) {
            return name = jQuery.propFix[name] || name, this.each(function() {
                try {
                    this[name] = void 0, delete this[name];
                } catch (e) {}
            });
        }
    }), jQuery.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(elem, name, value) {
            var ret, hooks, notxml, nType = elem.nodeType;
            if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return notxml = 1 !== nType || !jQuery.isXMLDoc(elem), 
            notxml && (name = jQuery.propFix[name] || name, hooks = jQuery.propHooks[name]), 
            void 0 !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : elem[name] = value : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : elem[name];
        },
        propHooks: {
            tabIndex: {
                get: function(elem) {
                    var tabindex = jQuery.find.attr(elem, "tabindex");
                    return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1;
                }
            }
        }
    }), support.hrefNormalized || jQuery.each([ "href", "src" ], function(i, name) {
        jQuery.propHooks[name] = {
            get: function(elem) {
                return elem.getAttribute(name, 4);
            }
        };
    }), support.optSelected || (jQuery.propHooks.selected = {
        get: function(elem) {
            var parent = elem.parentNode;
            return parent && (parent.selectedIndex, parent.parentNode && parent.parentNode.selectedIndex), 
            null;
        }
    }), jQuery.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
        jQuery.propFix[this.toLowerCase()] = this;
    }), support.enctype || (jQuery.propFix.enctype = "encoding");
    var rclass = /[\t\r\n\f]/g;
    jQuery.fn.extend({
        addClass: function(value) {
            var classes, elem, cur, clazz, j, finalValue, i = 0, len = this.length, proceed = "string" == typeof value && value;
            if (jQuery.isFunction(value)) return this.each(function(j) {
                jQuery(this).addClass(value.call(this, j, this.className));
            });
            if (proceed) for (classes = (value || "").match(rnotwhite) || []; len > i; i++) if (elem = this[i], 
            cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ")) {
                for (j = 0; clazz = classes[j++]; ) cur.indexOf(" " + clazz + " ") < 0 && (cur += clazz + " ");
                finalValue = jQuery.trim(cur), elem.className !== finalValue && (elem.className = finalValue);
            }
            return this;
        },
        removeClass: function(value) {
            var classes, elem, cur, clazz, j, finalValue, i = 0, len = this.length, proceed = 0 === arguments.length || "string" == typeof value && value;
            if (jQuery.isFunction(value)) return this.each(function(j) {
                jQuery(this).removeClass(value.call(this, j, this.className));
            });
            if (proceed) for (classes = (value || "").match(rnotwhite) || []; len > i; i++) if (elem = this[i], 
            cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "")) {
                for (j = 0; clazz = classes[j++]; ) for (;cur.indexOf(" " + clazz + " ") >= 0; ) cur = cur.replace(" " + clazz + " ", " ");
                finalValue = value ? jQuery.trim(cur) : "", elem.className !== finalValue && (elem.className = finalValue);
            }
            return this;
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value;
            return "boolean" == typeof stateVal && "string" === type ? stateVal ? this.addClass(value) : this.removeClass(value) : jQuery.isFunction(value) ? this.each(function(i) {
                jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
            }) : this.each(function() {
                if ("string" === type) for (var className, i = 0, self = jQuery(this), classNames = value.match(rnotwhite) || []; className = classNames[i++]; ) self.hasClass(className) ? self.removeClass(className) : self.addClass(className); else (type === strundefined || "boolean" === type) && (this.className && jQuery._data(this, "__className__", this.className), 
                this.className = this.className || value === !1 ? "" : jQuery._data(this, "__className__") || "");
            });
        },
        hasClass: function(selector) {
            for (var className = " " + selector + " ", i = 0, l = this.length; l > i; i++) if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) return !0;
            return !1;
        }
    }), jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(i, name) {
        jQuery.fn[name] = function(data, fn) {
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
        };
    }), jQuery.fn.extend({
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        },
        bind: function(types, data, fn) {
            return this.on(types, null, data, fn);
        },
        unbind: function(types, fn) {
            return this.off(types, null, fn);
        },
        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn);
        },
        undelegate: function(selector, types, fn) {
            return 1 === arguments.length ? this.off(selector, "**") : this.off(types, selector || "**", fn);
        }
    });
    var nonce = jQuery.now(), rquery = /\?/, rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    jQuery.parseJSON = function(data) {
        if (window.JSON && window.JSON.parse) return window.JSON.parse(data + "");
        var requireNonComma, depth = null, str = jQuery.trim(data + "");
        return str && !jQuery.trim(str.replace(rvalidtokens, function(token, comma, open, close) {
            return requireNonComma && comma && (depth = 0), 0 === depth ? token : (requireNonComma = open || comma, 
            depth += !close - !open, "");
        })) ? Function("return " + str)() : jQuery.error("Invalid JSON: " + data);
    }, jQuery.parseXML = function(data) {
        var xml, tmp;
        if (!data || "string" != typeof data) return null;
        try {
            window.DOMParser ? (tmp = new DOMParser(), xml = tmp.parseFromString(data, "text/xml")) : (xml = new ActiveXObject("Microsoft.XMLDOM"), 
            xml.async = "false", xml.loadXML(data));
        } catch (e) {
            xml = void 0;
        }
        return xml && xml.documentElement && !xml.getElementsByTagName("parsererror").length || jQuery.error("Invalid XML: " + data), 
        xml;
    };
    var ajaxLocParts, ajaxLocation, rhash = /#.*$/, rts = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, prefilters = {}, transports = {}, allTypes = "*/".concat("*");
    try {
        ajaxLocation = location.href;
    } catch (e) {
        ajaxLocation = document.createElement("a"), ajaxLocation.href = "", ajaxLocation = ajaxLocation.href;
    }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [], jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(target, settings) {
            return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(url, options) {
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                2 !== state && (state = 2, timeoutTimer && clearTimeout(timeoutTimer), transport = void 0, 
                responseHeadersString = headers || "", jqXHR.readyState = status > 0 ? 4 : 0, isSuccess = status >= 200 && 300 > status || 304 === status, 
                responses && (response = ajaxHandleResponses(s, jqXHR, responses)), response = ajaxConvert(s, response, jqXHR, isSuccess), 
                isSuccess ? (s.ifModified && (modified = jqXHR.getResponseHeader("Last-Modified"), 
                modified && (jQuery.lastModified[cacheURL] = modified), modified = jqXHR.getResponseHeader("etag"), 
                modified && (jQuery.etag[cacheURL] = modified)), 204 === status || "HEAD" === s.type ? statusText = "nocontent" : 304 === status ? statusText = "notmodified" : (statusText = response.state, 
                success = response.data, error = response.error, isSuccess = !error)) : (error = statusText, 
                (status || !statusText) && (statusText = "error", 0 > status && (status = 0))), 
                jqXHR.status = status, jqXHR.statusText = (nativeStatusText || statusText) + "", 
                isSuccess ? deferred.resolveWith(callbackContext, [ success, statusText, jqXHR ]) : deferred.rejectWith(callbackContext, [ jqXHR, statusText, error ]), 
                jqXHR.statusCode(statusCode), statusCode = void 0, fireGlobals && globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [ jqXHR, s, isSuccess ? success : error ]), 
                completeDeferred.fireWith(callbackContext, [ jqXHR, statusText ]), fireGlobals && (globalEventContext.trigger("ajaxComplete", [ jqXHR, s ]), 
                --jQuery.active || jQuery.event.trigger("ajaxStop")));
            }
            "object" == typeof url && (options = url, url = void 0), options = options || {};
            var parts, i, cacheURL, responseHeadersString, timeoutTimer, fireGlobals, transport, responseHeaders, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, state = 0, strAbort = "canceled", jqXHR = {
                readyState: 0,
                getResponseHeader: function(key) {
                    var match;
                    if (2 === state) {
                        if (!responseHeaders) for (responseHeaders = {}; match = rheaders.exec(responseHeadersString); ) responseHeaders[match[1].toLowerCase()] = match[2];
                        match = responseHeaders[key.toLowerCase()];
                    }
                    return null == match ? null : match;
                },
                getAllResponseHeaders: function() {
                    return 2 === state ? responseHeadersString : null;
                },
                setRequestHeader: function(name, value) {
                    var lname = name.toLowerCase();
                    return state || (name = requestHeadersNames[lname] = requestHeadersNames[lname] || name, 
                    requestHeaders[name] = value), this;
                },
                overrideMimeType: function(type) {
                    return state || (s.mimeType = type), this;
                },
                statusCode: function(map) {
                    var code;
                    if (map) if (2 > state) for (code in map) statusCode[code] = [ statusCode[code], map[code] ]; else jqXHR.always(map[jqXHR.status]);
                    return this;
                },
                abort: function(statusText) {
                    var finalText = statusText || strAbort;
                    return transport && transport.abort(finalText), done(0, finalText), this;
                }
            };
            if (deferred.promise(jqXHR).complete = completeDeferred.add, jqXHR.success = jqXHR.done, 
            jqXHR.error = jqXHR.fail, s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//"), 
            s.type = options.method || options.type || s.method || s.type, s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [ "" ], 
            null == s.crossDomain && (parts = rurl.exec(s.url.toLowerCase()), s.crossDomain = !(!parts || parts[1] === ajaxLocParts[1] && parts[2] === ajaxLocParts[2] && (parts[3] || ("http:" === parts[1] ? "80" : "443")) === (ajaxLocParts[3] || ("http:" === ajaxLocParts[1] ? "80" : "443")))), 
            s.data && s.processData && "string" != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)), 
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR), 2 === state) return jqXHR;
            fireGlobals = jQuery.event && s.global, fireGlobals && 0 === jQuery.active++ && jQuery.event.trigger("ajaxStart"), 
            s.type = s.type.toUpperCase(), s.hasContent = !rnoContent.test(s.type), cacheURL = s.url, 
            s.hasContent || (s.data && (cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data, 
            delete s.data), s.cache === !1 && (s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++)), 
            s.ifModified && (jQuery.lastModified[cacheURL] && jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]), 
            jQuery.etag[cacheURL] && jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])), 
            (s.data && s.hasContent && s.contentType !== !1 || options.contentType) && jqXHR.setRequestHeader("Content-Type", s.contentType), 
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers) jqXHR.setRequestHeader(i, s.headers[i]);
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === !1 || 2 === state)) return jqXHR.abort();
            strAbort = "abort";
            for (i in {
                success: 1,
                error: 1,
                complete: 1
            }) jqXHR[i](s[i]);
            if (transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
                jqXHR.readyState = 1, fireGlobals && globalEventContext.trigger("ajaxSend", [ jqXHR, s ]), 
                s.async && s.timeout > 0 && (timeoutTimer = setTimeout(function() {
                    jqXHR.abort("timeout");
                }, s.timeout));
                try {
                    state = 1, transport.send(requestHeaders, done);
                } catch (e) {
                    if (!(2 > state)) throw e;
                    done(-1, e);
                }
            } else done(-1, "No Transport");
            return jqXHR;
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },
        getScript: function(url, callback) {
            return jQuery.get(url, void 0, callback, "script");
        }
    }), jQuery.each([ "get", "post" ], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            return jQuery.isFunction(data) && (type = type || callback, callback = data, data = void 0), 
            jQuery.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            });
        };
    }), jQuery._evalUrl = function(url) {
        return jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        });
    }, jQuery.fn.extend({
        wrapAll: function(html) {
            if (jQuery.isFunction(html)) return this.each(function(i) {
                jQuery(this).wrapAll(html.call(this, i));
            });
            if (this[0]) {
                var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && wrap.insertBefore(this[0]), wrap.map(function() {
                    for (var elem = this; elem.firstChild && 1 === elem.firstChild.nodeType; ) elem = elem.firstChild;
                    return elem;
                }).append(this);
            }
            return this;
        },
        wrapInner: function(html) {
            return jQuery.isFunction(html) ? this.each(function(i) {
                jQuery(this).wrapInner(html.call(this, i));
            }) : this.each(function() {
                var self = jQuery(this), contents = self.contents();
                contents.length ? contents.wrapAll(html) : self.append(html);
            });
        },
        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes);
            }).end();
        }
    }), jQuery.expr.filters.hidden = function(elem) {
        return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 || !support.reliableHiddenOffsets() && "none" === (elem.style && elem.style.display || jQuery.css(elem, "display"));
    }, jQuery.expr.filters.visible = function(elem) {
        return !jQuery.expr.filters.hidden(elem);
    };
    var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
    jQuery.param = function(a, traditional) {
        var prefix, s = [], add = function(key, value) {
            value = jQuery.isFunction(value) ? value() : null == value ? "" : value, s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        };
        if (void 0 === traditional && (traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional), 
        jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) jQuery.each(a, function() {
            add(this.name, this.value);
        }); else for (prefix in a) buildParams(prefix, a[prefix], traditional, add);
        return s.join("&").replace(r20, "+");
    }, jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : this;
            }).filter(function() {
                var type = this.type;
                return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                return null == val ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    };
                }) : {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                };
            }).get();
        }
    }), jQuery.ajaxSettings.xhr = void 0 !== window.ActiveXObject ? function() {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && createStandardXHR() || createActiveXHR();
    } : createStandardXHR;
    var xhrId = 0, xhrCallbacks = {}, xhrSupported = jQuery.ajaxSettings.xhr();
    window.attachEvent && window.attachEvent("onunload", function() {
        for (var key in xhrCallbacks) xhrCallbacks[key](void 0, !0);
    }), support.cors = !!xhrSupported && "withCredentials" in xhrSupported, xhrSupported = support.ajax = !!xhrSupported, 
    xhrSupported && jQuery.ajaxTransport(function(options) {
        if (!options.crossDomain || support.cors) {
            var callback;
            return {
                send: function(headers, complete) {
                    var i, xhr = options.xhr(), id = ++xhrId;
                    if (xhr.open(options.type, options.url, options.async, options.username, options.password), 
                    options.xhrFields) for (i in options.xhrFields) xhr[i] = options.xhrFields[i];
                    options.mimeType && xhr.overrideMimeType && xhr.overrideMimeType(options.mimeType), 
                    options.crossDomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest");
                    for (i in headers) void 0 !== headers[i] && xhr.setRequestHeader(i, headers[i] + "");
                    xhr.send(options.hasContent && options.data || null), callback = function(_, isAbort) {
                        var status, statusText, responses;
                        if (callback && (isAbort || 4 === xhr.readyState)) if (delete xhrCallbacks[id], 
                        callback = void 0, xhr.onreadystatechange = jQuery.noop, isAbort) 4 !== xhr.readyState && xhr.abort(); else {
                            responses = {}, status = xhr.status, "string" == typeof xhr.responseText && (responses.text = xhr.responseText);
                            try {
                                statusText = xhr.statusText;
                            } catch (e) {
                                statusText = "";
                            }
                            status || !options.isLocal || options.crossDomain ? 1223 === status && (status = 204) : status = responses.text ? 200 : 404;
                        }
                        responses && complete(status, statusText, responses, xhr.getAllResponseHeaders());
                    }, options.async ? 4 === xhr.readyState ? setTimeout(callback) : xhr.onreadystatechange = xhrCallbacks[id] = callback : callback();
                },
                abort: function() {
                    callback && callback(void 0, !0);
                }
            };
        }
    }), jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(text) {
                return jQuery.globalEval(text), text;
            }
        }
    }), jQuery.ajaxPrefilter("script", function(s) {
        void 0 === s.cache && (s.cache = !1), s.crossDomain && (s.type = "GET", s.global = !1);
    }), jQuery.ajaxTransport("script", function(s) {
        if (s.crossDomain) {
            var script, head = document.head || jQuery("head")[0] || document.documentElement;
            return {
                send: function(_, callback) {
                    script = document.createElement("script"), script.async = !0, s.scriptCharset && (script.charset = s.scriptCharset), 
                    script.src = s.url, script.onload = script.onreadystatechange = function(_, isAbort) {
                        (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) && (script.onload = script.onreadystatechange = null, 
                        script.parentNode && script.parentNode.removeChild(script), script = null, isAbort || callback(200, "success"));
                    }, head.insertBefore(script, head.firstChild);
                },
                abort: function() {
                    script && script.onload(void 0, !0);
                }
            };
        }
    });
    var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
            return this[callback] = !0, callback;
        }
    }), jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== !1 && (rjsonp.test(s.url) ? "url" : "string" == typeof s.data && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
        return jsonProp || "jsonp" === s.dataTypes[0] ? (callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback, 
        jsonProp ? s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName) : s.jsonp !== !1 && (s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName), 
        s.converters["script json"] = function() {
            return responseContainer || jQuery.error(callbackName + " was not called"), responseContainer[0];
        }, s.dataTypes[0] = "json", overwritten = window[callbackName], window[callbackName] = function() {
            responseContainer = arguments;
        }, jqXHR.always(function() {
            window[callbackName] = overwritten, s[callbackName] && (s.jsonpCallback = originalSettings.jsonpCallback, 
            oldCallbacks.push(callbackName)), responseContainer && jQuery.isFunction(overwritten) && overwritten(responseContainer[0]), 
            responseContainer = overwritten = void 0;
        }), "script") : void 0;
    }), jQuery.parseHTML = function(data, context, keepScripts) {
        if (!data || "string" != typeof data) return null;
        "boolean" == typeof context && (keepScripts = context, context = !1), context = context || document;
        var parsed = rsingleTag.exec(data), scripts = !keepScripts && [];
        return parsed ? [ context.createElement(parsed[1]) ] : (parsed = jQuery.buildFragment([ data ], context, scripts), 
        scripts && scripts.length && jQuery(scripts).remove(), jQuery.merge([], parsed.childNodes));
    };
    var _load = jQuery.fn.load;
    jQuery.fn.load = function(url, params, callback) {
        if ("string" != typeof url && _load) return _load.apply(this, arguments);
        var selector, response, type, self = this, off = url.indexOf(" ");
        return off >= 0 && (selector = jQuery.trim(url.slice(off, url.length)), url = url.slice(0, off)), 
        jQuery.isFunction(params) ? (callback = params, params = void 0) : params && "object" == typeof params && (type = "POST"), 
        self.length > 0 && jQuery.ajax({
            url: url,
            type: type,
            dataType: "html",
            data: params
        }).done(function(responseText) {
            response = arguments, self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
        }).complete(callback && function(jqXHR, status) {
            self.each(callback, response || [ jqXHR.responseText, status, jqXHR ]);
        }), this;
    }, jQuery.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(i, type) {
        jQuery.fn[type] = function(fn) {
            return this.on(type, fn);
        };
    }), jQuery.expr.filters.animated = function(elem) {
        return jQuery.grep(jQuery.timers, function(fn) {
            return elem === fn.elem;
        }).length;
    };
    var docElem = window.document.documentElement;
    jQuery.offset = {
        setOffset: function(elem, options, i) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"), curElem = jQuery(elem), props = {};
            "static" === position && (elem.style.position = "relative"), curOffset = curElem.offset(), 
            curCSSTop = jQuery.css(elem, "top"), curCSSLeft = jQuery.css(elem, "left"), calculatePosition = ("absolute" === position || "fixed" === position) && jQuery.inArray("auto", [ curCSSTop, curCSSLeft ]) > -1, 
            calculatePosition ? (curPosition = curElem.position(), curTop = curPosition.top, 
            curLeft = curPosition.left) : (curTop = parseFloat(curCSSTop) || 0, curLeft = parseFloat(curCSSLeft) || 0), 
            jQuery.isFunction(options) && (options = options.call(elem, i, curOffset)), null != options.top && (props.top = options.top - curOffset.top + curTop), 
            null != options.left && (props.left = options.left - curOffset.left + curLeft), 
            "using" in options ? options.using.call(elem, props) : curElem.css(props);
        }
    }, jQuery.fn.extend({
        offset: function(options) {
            if (arguments.length) return void 0 === options ? this : this.each(function(i) {
                jQuery.offset.setOffset(this, options, i);
            });
            var docElem, win, box = {
                top: 0,
                left: 0
            }, elem = this[0], doc = elem && elem.ownerDocument;
            if (doc) return docElem = doc.documentElement, jQuery.contains(docElem, elem) ? (typeof elem.getBoundingClientRect !== strundefined && (box = elem.getBoundingClientRect()), 
            win = getWindow(doc), {
                top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
                left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
            }) : box;
        },
        position: function() {
            if (this[0]) {
                var offsetParent, offset, parentOffset = {
                    top: 0,
                    left: 0
                }, elem = this[0];
                return "fixed" === jQuery.css(elem, "position") ? offset = elem.getBoundingClientRect() : (offsetParent = this.offsetParent(), 
                offset = this.offset(), jQuery.nodeName(offsetParent[0], "html") || (parentOffset = offsetParent.offset()), 
                parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", !0), parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", !0)), 
                {
                    top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", !0),
                    left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", !0)
                };
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var offsetParent = this.offsetParent || docElem; offsetParent && !jQuery.nodeName(offsetParent, "html") && "static" === jQuery.css(offsetParent, "position"); ) offsetParent = offsetParent.offsetParent;
                return offsetParent || docElem;
            });
        }
    }), jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(method, prop) {
        var top = /Y/.test(prop);
        jQuery.fn[method] = function(val) {
            return access(this, function(elem, method, val) {
                var win = getWindow(elem);
                return void 0 === val ? win ? prop in win ? win[prop] : win.document.documentElement[method] : elem[method] : void (win ? win.scrollTo(top ? jQuery(win).scrollLeft() : val, top ? val : jQuery(win).scrollTop()) : elem[method] = val);
            }, method, val, arguments.length, null);
        };
    }), jQuery.each([ "top", "left" ], function(i, prop) {
        jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
            return computed ? (computed = curCSS(elem, prop), rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed) : void 0;
        });
    }), jQuery.each({
        Height: "height",
        Width: "width"
    }, function(name, type) {
        jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        }, function(defaultExtra, funcName) {
            jQuery.fn[funcName] = function(margin, value) {
                var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin), extra = defaultExtra || (margin === !0 || value === !0 ? "margin" : "border");
                return access(this, function(elem, type, value) {
                    var doc;
                    return jQuery.isWindow(elem) ? elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement, 
                    Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : void 0 === value ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
                }, type, chainable ? margin : void 0, chainable, null);
            };
        });
    }), jQuery.fn.size = function() {
        return this.length;
    }, jQuery.fn.andSelf = jQuery.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return jQuery;
    });
    var _jQuery = window.jQuery, _$ = window.$;
    return jQuery.noConflict = function(deep) {
        return window.$ === jQuery && (window.$ = _$), deep && window.jQuery === jQuery && (window.jQuery = _jQuery), 
        jQuery;
    }, typeof noGlobal === strundefined && (window.jQuery = window.$ = jQuery), jQuery;
}), function(window, document, undefined) {
    "use strict";
    function minErr(module, ErrorConstructor) {
        return ErrorConstructor = ErrorConstructor || Error, function() {
            var paramPrefix, i, SKIP_INDEXES = 2, templateArgs = arguments, code = templateArgs[0], message = "[" + (module ? module + ":" : "") + code + "] ", template = templateArgs[1];
            for (message += template.replace(/\{\d+\}/g, function(match) {
                var index = +match.slice(1, -1), shiftedIndex = index + SKIP_INDEXES;
                return shiftedIndex < templateArgs.length ? toDebugString(templateArgs[shiftedIndex]) : match;
            }), message += "\nhttp://errors.angularjs.org/1.4.6/" + (module ? module + "/" : "") + code, 
            i = SKIP_INDEXES, paramPrefix = "?"; i < templateArgs.length; i++, paramPrefix = "&") message += paramPrefix + "p" + (i - SKIP_INDEXES) + "=" + encodeURIComponent(toDebugString(templateArgs[i]));
            return new ErrorConstructor(message);
        };
    }
    function isArrayLike(obj) {
        if (null == obj || isWindow(obj)) return !1;
        var length = "length" in Object(obj) && obj.length;
        return obj.nodeType === NODE_TYPE_ELEMENT && length ? !0 : isString(obj) || isArray(obj) || 0 === length || "number" == typeof length && length > 0 && length - 1 in obj;
    }
    function forEach(obj, iterator, context) {
        var key, length;
        if (obj) if (isFunction(obj)) for (key in obj) "prototype" == key || "length" == key || "name" == key || obj.hasOwnProperty && !obj.hasOwnProperty(key) || iterator.call(context, obj[key], key, obj); else if (isArray(obj) || isArrayLike(obj)) {
            var isPrimitive = "object" != typeof obj;
            for (key = 0, length = obj.length; length > key; key++) (isPrimitive || key in obj) && iterator.call(context, obj[key], key, obj);
        } else if (obj.forEach && obj.forEach !== forEach) obj.forEach(iterator, context, obj); else if (isBlankObject(obj)) for (key in obj) iterator.call(context, obj[key], key, obj); else if ("function" == typeof obj.hasOwnProperty) for (key in obj) obj.hasOwnProperty(key) && iterator.call(context, obj[key], key, obj); else for (key in obj) hasOwnProperty.call(obj, key) && iterator.call(context, obj[key], key, obj);
        return obj;
    }
    function forEachSorted(obj, iterator, context) {
        for (var keys = Object.keys(obj).sort(), i = 0; i < keys.length; i++) iterator.call(context, obj[keys[i]], keys[i]);
        return keys;
    }
    function reverseParams(iteratorFn) {
        return function(value, key) {
            iteratorFn(key, value);
        };
    }
    function nextUid() {
        return ++uid;
    }
    function setHashKey(obj, h) {
        h ? obj.$$hashKey = h : delete obj.$$hashKey;
    }
    function baseExtend(dst, objs, deep) {
        for (var h = dst.$$hashKey, i = 0, ii = objs.length; ii > i; ++i) {
            var obj = objs[i];
            if (isObject(obj) || isFunction(obj)) for (var keys = Object.keys(obj), j = 0, jj = keys.length; jj > j; j++) {
                var key = keys[j], src = obj[key];
                deep && isObject(src) ? isDate(src) ? dst[key] = new Date(src.valueOf()) : isRegExp(src) ? dst[key] = new RegExp(src) : (isObject(dst[key]) || (dst[key] = isArray(src) ? [] : {}), 
                baseExtend(dst[key], [ src ], !0)) : dst[key] = src;
            }
        }
        return setHashKey(dst, h), dst;
    }
    function extend(dst) {
        return baseExtend(dst, slice.call(arguments, 1), !1);
    }
    function merge(dst) {
        return baseExtend(dst, slice.call(arguments, 1), !0);
    }
    function toInt(str) {
        return parseInt(str, 10);
    }
    function inherit(parent, extra) {
        return extend(Object.create(parent), extra);
    }
    function noop() {}
    function identity($) {
        return $;
    }
    function valueFn(value) {
        return function() {
            return value;
        };
    }
    function hasCustomToString(obj) {
        return isFunction(obj.toString) && obj.toString !== Object.prototype.toString;
    }
    function isUndefined(value) {
        return "undefined" == typeof value;
    }
    function isDefined(value) {
        return "undefined" != typeof value;
    }
    function isObject(value) {
        return null !== value && "object" == typeof value;
    }
    function isBlankObject(value) {
        return null !== value && "object" == typeof value && !getPrototypeOf(value);
    }
    function isString(value) {
        return "string" == typeof value;
    }
    function isNumber(value) {
        return "number" == typeof value;
    }
    function isDate(value) {
        return "[object Date]" === toString.call(value);
    }
    function isFunction(value) {
        return "function" == typeof value;
    }
    function isRegExp(value) {
        return "[object RegExp]" === toString.call(value);
    }
    function isWindow(obj) {
        return obj && obj.window === obj;
    }
    function isScope(obj) {
        return obj && obj.$evalAsync && obj.$watch;
    }
    function isFile(obj) {
        return "[object File]" === toString.call(obj);
    }
    function isFormData(obj) {
        return "[object FormData]" === toString.call(obj);
    }
    function isBlob(obj) {
        return "[object Blob]" === toString.call(obj);
    }
    function isBoolean(value) {
        return "boolean" == typeof value;
    }
    function isPromiseLike(obj) {
        return obj && isFunction(obj.then);
    }
    function isTypedArray(value) {
        return TYPED_ARRAY_REGEXP.test(toString.call(value));
    }
    function isElement(node) {
        return !(!node || !(node.nodeName || node.prop && node.attr && node.find));
    }
    function makeMap(str) {
        var i, obj = {}, items = str.split(",");
        for (i = 0; i < items.length; i++) obj[items[i]] = !0;
        return obj;
    }
    function nodeName_(element) {
        return lowercase(element.nodeName || element[0] && element[0].nodeName);
    }
    function arrayRemove(array, value) {
        var index = array.indexOf(value);
        return index >= 0 && array.splice(index, 1), index;
    }
    function copy(source, destination, stackSource, stackDest) {
        if (isWindow(source) || isScope(source)) throw ngMinErr("cpws", "Can't copy! Making copies of Window or Scope instances is not supported.");
        if (isTypedArray(destination)) throw ngMinErr("cpta", "Can't copy! TypedArray destination cannot be mutated.");
        if (destination) {
            if (source === destination) throw ngMinErr("cpi", "Can't copy! Source and destination are identical.");
            stackSource = stackSource || [], stackDest = stackDest || [], isObject(source) && (stackSource.push(source), 
            stackDest.push(destination));
            var key;
            if (isArray(source)) {
                destination.length = 0;
                for (var i = 0; i < source.length; i++) destination.push(copy(source[i], null, stackSource, stackDest));
            } else {
                var h = destination.$$hashKey;
                if (isArray(destination) ? destination.length = 0 : forEach(destination, function(value, key) {
                    delete destination[key];
                }), isBlankObject(source)) for (key in source) destination[key] = copy(source[key], null, stackSource, stackDest); else if (source && "function" == typeof source.hasOwnProperty) for (key in source) source.hasOwnProperty(key) && (destination[key] = copy(source[key], null, stackSource, stackDest)); else for (key in source) hasOwnProperty.call(source, key) && (destination[key] = copy(source[key], null, stackSource, stackDest));
                setHashKey(destination, h);
            }
        } else if (destination = source, isObject(source)) {
            var index;
            if (stackSource && -1 !== (index = stackSource.indexOf(source))) return stackDest[index];
            if (isArray(source)) return copy(source, [], stackSource, stackDest);
            if (isTypedArray(source)) destination = new source.constructor(source); else if (isDate(source)) destination = new Date(source.getTime()); else if (isRegExp(source)) destination = new RegExp(source.source, source.toString().match(/[^\/]*$/)[0]), 
            destination.lastIndex = source.lastIndex; else {
                if (!isFunction(source.cloneNode)) {
                    var emptyObject = Object.create(getPrototypeOf(source));
                    return copy(source, emptyObject, stackSource, stackDest);
                }
                destination = source.cloneNode(!0);
            }
            stackDest && (stackSource.push(source), stackDest.push(destination));
        }
        return destination;
    }
    function shallowCopy(src, dst) {
        if (isArray(src)) {
            dst = dst || [];
            for (var i = 0, ii = src.length; ii > i; i++) dst[i] = src[i];
        } else if (isObject(src)) {
            dst = dst || {};
            for (var key in src) ("$" !== key.charAt(0) || "$" !== key.charAt(1)) && (dst[key] = src[key]);
        }
        return dst || src;
    }
    function equals(o1, o2) {
        if (o1 === o2) return !0;
        if (null === o1 || null === o2) return !1;
        if (o1 !== o1 && o2 !== o2) return !0;
        var length, key, keySet, t1 = typeof o1, t2 = typeof o2;
        if (t1 == t2 && "object" == t1) {
            if (!isArray(o1)) {
                if (isDate(o1)) return isDate(o2) ? equals(o1.getTime(), o2.getTime()) : !1;
                if (isRegExp(o1)) return isRegExp(o2) ? o1.toString() == o2.toString() : !1;
                if (isScope(o1) || isScope(o2) || isWindow(o1) || isWindow(o2) || isArray(o2) || isDate(o2) || isRegExp(o2)) return !1;
                keySet = createMap();
                for (key in o1) if ("$" !== key.charAt(0) && !isFunction(o1[key])) {
                    if (!equals(o1[key], o2[key])) return !1;
                    keySet[key] = !0;
                }
                for (key in o2) if (!(key in keySet) && "$" !== key.charAt(0) && isDefined(o2[key]) && !isFunction(o2[key])) return !1;
                return !0;
            }
            if (!isArray(o2)) return !1;
            if ((length = o1.length) == o2.length) {
                for (key = 0; length > key; key++) if (!equals(o1[key], o2[key])) return !1;
                return !0;
            }
        }
        return !1;
    }
    function concat(array1, array2, index) {
        return array1.concat(slice.call(array2, index));
    }
    function sliceArgs(args, startIndex) {
        return slice.call(args, startIndex || 0);
    }
    function bind(self, fn) {
        var curryArgs = arguments.length > 2 ? sliceArgs(arguments, 2) : [];
        return !isFunction(fn) || fn instanceof RegExp ? fn : curryArgs.length ? function() {
            return arguments.length ? fn.apply(self, concat(curryArgs, arguments, 0)) : fn.apply(self, curryArgs);
        } : function() {
            return arguments.length ? fn.apply(self, arguments) : fn.call(self);
        };
    }
    function toJsonReplacer(key, value) {
        var val = value;
        return "string" == typeof key && "$" === key.charAt(0) && "$" === key.charAt(1) ? val = undefined : isWindow(value) ? val = "$WINDOW" : value && document === value ? val = "$DOCUMENT" : isScope(value) && (val = "$SCOPE"), 
        val;
    }
    function toJson(obj, pretty) {
        return "undefined" == typeof obj ? undefined : (isNumber(pretty) || (pretty = pretty ? 2 : null), 
        JSON.stringify(obj, toJsonReplacer, pretty));
    }
    function fromJson(json) {
        return isString(json) ? JSON.parse(json) : json;
    }
    function timezoneToOffset(timezone, fallback) {
        var requestedTimezoneOffset = Date.parse("Jan 01, 1970 00:00:00 " + timezone) / 6e4;
        return isNaN(requestedTimezoneOffset) ? fallback : requestedTimezoneOffset;
    }
    function addDateMinutes(date, minutes) {
        return date = new Date(date.getTime()), date.setMinutes(date.getMinutes() + minutes), 
        date;
    }
    function convertTimezoneToLocal(date, timezone, reverse) {
        reverse = reverse ? -1 : 1;
        var timezoneOffset = timezoneToOffset(timezone, date.getTimezoneOffset());
        return addDateMinutes(date, reverse * (timezoneOffset - date.getTimezoneOffset()));
    }
    function startingTag(element) {
        element = jqLite(element).clone();
        try {
            element.empty();
        } catch (e) {}
        var elemHtml = jqLite("<div>").append(element).html();
        try {
            return element[0].nodeType === NODE_TYPE_TEXT ? lowercase(elemHtml) : elemHtml.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function(match, nodeName) {
                return "<" + lowercase(nodeName);
            });
        } catch (e) {
            return lowercase(elemHtml);
        }
    }
    function tryDecodeURIComponent(value) {
        try {
            return decodeURIComponent(value);
        } catch (e) {}
    }
    function parseKeyValue(keyValue) {
        var obj = {};
        return forEach((keyValue || "").split("&"), function(keyValue) {
            var splitPoint, key, val;
            keyValue && (key = keyValue = keyValue.replace(/\+/g, "%20"), splitPoint = keyValue.indexOf("="), 
            -1 !== splitPoint && (key = keyValue.substring(0, splitPoint), val = keyValue.substring(splitPoint + 1)), 
            key = tryDecodeURIComponent(key), isDefined(key) && (val = isDefined(val) ? tryDecodeURIComponent(val) : !0, 
            hasOwnProperty.call(obj, key) ? isArray(obj[key]) ? obj[key].push(val) : obj[key] = [ obj[key], val ] : obj[key] = val));
        }), obj;
    }
    function toKeyValue(obj) {
        var parts = [];
        return forEach(obj, function(value, key) {
            isArray(value) ? forEach(value, function(arrayValue) {
                parts.push(encodeUriQuery(key, !0) + (arrayValue === !0 ? "" : "=" + encodeUriQuery(arrayValue, !0)));
            }) : parts.push(encodeUriQuery(key, !0) + (value === !0 ? "" : "=" + encodeUriQuery(value, !0)));
        }), parts.length ? parts.join("&") : "";
    }
    function encodeUriSegment(val) {
        return encodeUriQuery(val, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+");
    }
    function encodeUriQuery(val, pctEncodeSpaces) {
        return encodeURIComponent(val).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, pctEncodeSpaces ? "%20" : "+");
    }
    function getNgAttribute(element, ngAttr) {
        var attr, i, ii = ngAttrPrefixes.length;
        for (i = 0; ii > i; ++i) if (attr = ngAttrPrefixes[i] + ngAttr, isString(attr = element.getAttribute(attr))) return attr;
        return null;
    }
    function angularInit(element, bootstrap) {
        var appElement, module, config = {};
        forEach(ngAttrPrefixes, function(prefix) {
            var name = prefix + "app";
            !appElement && element.hasAttribute && element.hasAttribute(name) && (appElement = element, 
            module = element.getAttribute(name));
        }), forEach(ngAttrPrefixes, function(prefix) {
            var candidate, name = prefix + "app";
            !appElement && (candidate = element.querySelector("[" + name.replace(":", "\\:") + "]")) && (appElement = candidate, 
            module = candidate.getAttribute(name));
        }), appElement && (config.strictDi = null !== getNgAttribute(appElement, "strict-di"), 
        bootstrap(appElement, module ? [ module ] : [], config));
    }
    function bootstrap(element, modules, config) {
        isObject(config) || (config = {});
        var defaultConfig = {
            strictDi: !1
        };
        config = extend(defaultConfig, config);
        var doBootstrap = function() {
            if (element = jqLite(element), element.injector()) {
                var tag = element[0] === document ? "document" : startingTag(element);
                throw ngMinErr("btstrpd", "App Already Bootstrapped with this Element '{0}'", tag.replace(/</, "&lt;").replace(/>/, "&gt;"));
            }
            modules = modules || [], modules.unshift([ "$provide", function($provide) {
                $provide.value("$rootElement", element);
            } ]), config.debugInfoEnabled && modules.push([ "$compileProvider", function($compileProvider) {
                $compileProvider.debugInfoEnabled(!0);
            } ]), modules.unshift("ng");
            var injector = createInjector(modules, config.strictDi);
            return injector.invoke([ "$rootScope", "$rootElement", "$compile", "$injector", function(scope, element, compile, injector) {
                scope.$apply(function() {
                    element.data("$injector", injector), compile(element)(scope);
                });
            } ]), injector;
        }, NG_ENABLE_DEBUG_INFO = /^NG_ENABLE_DEBUG_INFO!/, NG_DEFER_BOOTSTRAP = /^NG_DEFER_BOOTSTRAP!/;
        return window && NG_ENABLE_DEBUG_INFO.test(window.name) && (config.debugInfoEnabled = !0, 
        window.name = window.name.replace(NG_ENABLE_DEBUG_INFO, "")), window && !NG_DEFER_BOOTSTRAP.test(window.name) ? doBootstrap() : (window.name = window.name.replace(NG_DEFER_BOOTSTRAP, ""), 
        angular.resumeBootstrap = function(extraModules) {
            return forEach(extraModules, function(module) {
                modules.push(module);
            }), doBootstrap();
        }, void (isFunction(angular.resumeDeferredBootstrap) && angular.resumeDeferredBootstrap()));
    }
    function reloadWithDebugInfo() {
        window.name = "NG_ENABLE_DEBUG_INFO!" + window.name, window.location.reload();
    }
    function getTestability(rootElement) {
        var injector = angular.element(rootElement).injector();
        if (!injector) throw ngMinErr("test", "no injector found for element argument to getTestability");
        return injector.get("$$testability");
    }
    function snake_case(name, separator) {
        return separator = separator || "_", name.replace(SNAKE_CASE_REGEXP, function(letter, pos) {
            return (pos ? separator : "") + letter.toLowerCase();
        });
    }
    function bindJQuery() {
        var originalCleanData;
        if (!bindJQueryFired) {
            var jqName = jq();
            jQuery = isUndefined(jqName) ? window.jQuery : jqName ? window[jqName] : undefined, 
            jQuery && jQuery.fn.on ? (jqLite = jQuery, extend(jQuery.fn, {
                scope: JQLitePrototype.scope,
                isolateScope: JQLitePrototype.isolateScope,
                controller: JQLitePrototype.controller,
                injector: JQLitePrototype.injector,
                inheritedData: JQLitePrototype.inheritedData
            }), originalCleanData = jQuery.cleanData, jQuery.cleanData = function(elems) {
                var events;
                if (skipDestroyOnNextJQueryCleanData) skipDestroyOnNextJQueryCleanData = !1; else for (var elem, i = 0; null != (elem = elems[i]); i++) events = jQuery._data(elem, "events"), 
                events && events.$destroy && jQuery(elem).triggerHandler("$destroy");
                originalCleanData(elems);
            }) : jqLite = JQLite, angular.element = jqLite, bindJQueryFired = !0;
        }
    }
    function assertArg(arg, name, reason) {
        if (!arg) throw ngMinErr("areq", "Argument '{0}' is {1}", name || "?", reason || "required");
        return arg;
    }
    function assertArgFn(arg, name, acceptArrayAnnotation) {
        return acceptArrayAnnotation && isArray(arg) && (arg = arg[arg.length - 1]), assertArg(isFunction(arg), name, "not a function, got " + (arg && "object" == typeof arg ? arg.constructor.name || "Object" : typeof arg)), 
        arg;
    }
    function assertNotHasOwnProperty(name, context) {
        if ("hasOwnProperty" === name) throw ngMinErr("badname", "hasOwnProperty is not a valid {0} name", context);
    }
    function getter(obj, path, bindFnToScope) {
        if (!path) return obj;
        for (var key, keys = path.split("."), lastInstance = obj, len = keys.length, i = 0; len > i; i++) key = keys[i], 
        obj && (obj = (lastInstance = obj)[key]);
        return !bindFnToScope && isFunction(obj) ? bind(lastInstance, obj) : obj;
    }
    function getBlockNodes(nodes) {
        for (var blockNodes, node = nodes[0], endNode = nodes[nodes.length - 1], i = 1; node !== endNode && (node = node.nextSibling); i++) (blockNodes || nodes[i] !== node) && (blockNodes || (blockNodes = jqLite(slice.call(nodes, 0, i))), 
        blockNodes.push(node));
        return blockNodes || nodes;
    }
    function createMap() {
        return Object.create(null);
    }
    function setupModuleLoader(window) {
        function ensure(obj, name, factory) {
            return obj[name] || (obj[name] = factory());
        }
        var $injectorMinErr = minErr("$injector"), ngMinErr = minErr("ng"), angular = ensure(window, "angular", Object);
        return angular.$$minErr = angular.$$minErr || minErr, ensure(angular, "module", function() {
            var modules = {};
            return function(name, requires, configFn) {
                var assertNotHasOwnProperty = function(name, context) {
                    if ("hasOwnProperty" === name) throw ngMinErr("badname", "hasOwnProperty is not a valid {0} name", context);
                };
                return assertNotHasOwnProperty(name, "module"), requires && modules.hasOwnProperty(name) && (modules[name] = null), 
                ensure(modules, name, function() {
                    function invokeLater(provider, method, insertMethod, queue) {
                        return queue || (queue = invokeQueue), function() {
                            return queue[insertMethod || "push"]([ provider, method, arguments ]), moduleInstance;
                        };
                    }
                    function invokeLaterAndSetModuleName(provider, method) {
                        return function(recipeName, factoryFunction) {
                            return factoryFunction && isFunction(factoryFunction) && (factoryFunction.$$moduleName = name), 
                            invokeQueue.push([ provider, method, arguments ]), moduleInstance;
                        };
                    }
                    if (!requires) throw $injectorMinErr("nomod", "Module '{0}' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.", name);
                    var invokeQueue = [], configBlocks = [], runBlocks = [], config = invokeLater("$injector", "invoke", "push", configBlocks), moduleInstance = {
                        _invokeQueue: invokeQueue,
                        _configBlocks: configBlocks,
                        _runBlocks: runBlocks,
                        requires: requires,
                        name: name,
                        provider: invokeLaterAndSetModuleName("$provide", "provider"),
                        factory: invokeLaterAndSetModuleName("$provide", "factory"),
                        service: invokeLaterAndSetModuleName("$provide", "service"),
                        value: invokeLater("$provide", "value"),
                        constant: invokeLater("$provide", "constant", "unshift"),
                        decorator: invokeLaterAndSetModuleName("$provide", "decorator"),
                        animation: invokeLaterAndSetModuleName("$animateProvider", "register"),
                        filter: invokeLaterAndSetModuleName("$filterProvider", "register"),
                        controller: invokeLaterAndSetModuleName("$controllerProvider", "register"),
                        directive: invokeLaterAndSetModuleName("$compileProvider", "directive"),
                        config: config,
                        run: function(block) {
                            return runBlocks.push(block), this;
                        }
                    };
                    return configFn && config(configFn), moduleInstance;
                });
            };
        });
    }
    function serializeObject(obj) {
        var seen = [];
        return JSON.stringify(obj, function(key, val) {
            if (val = toJsonReplacer(key, val), isObject(val)) {
                if (seen.indexOf(val) >= 0) return "...";
                seen.push(val);
            }
            return val;
        });
    }
    function toDebugString(obj) {
        return "function" == typeof obj ? obj.toString().replace(/ \{[\s\S]*$/, "") : isUndefined(obj) ? "undefined" : "string" != typeof obj ? serializeObject(obj) : obj;
    }
    function publishExternalAPI(angular) {
        extend(angular, {
            bootstrap: bootstrap,
            copy: copy,
            extend: extend,
            merge: merge,
            equals: equals,
            element: jqLite,
            forEach: forEach,
            injector: createInjector,
            noop: noop,
            bind: bind,
            toJson: toJson,
            fromJson: fromJson,
            identity: identity,
            isUndefined: isUndefined,
            isDefined: isDefined,
            isString: isString,
            isFunction: isFunction,
            isObject: isObject,
            isNumber: isNumber,
            isElement: isElement,
            isArray: isArray,
            version: version,
            isDate: isDate,
            lowercase: lowercase,
            uppercase: uppercase,
            callbacks: {
                counter: 0
            },
            getTestability: getTestability,
            $$minErr: minErr,
            $$csp: csp,
            reloadWithDebugInfo: reloadWithDebugInfo
        }), (angularModule = setupModuleLoader(window))("ng", [ "ngLocale" ], [ "$provide", function($provide) {
            $provide.provider({
                $$sanitizeUri: $$SanitizeUriProvider
            }), $provide.provider("$compile", $CompileProvider).directive({
                a: htmlAnchorDirective,
                input: inputDirective,
                textarea: inputDirective,
                form: formDirective,
                script: scriptDirective,
                select: selectDirective,
                style: styleDirective,
                option: optionDirective,
                ngBind: ngBindDirective,
                ngBindHtml: ngBindHtmlDirective,
                ngBindTemplate: ngBindTemplateDirective,
                ngClass: ngClassDirective,
                ngClassEven: ngClassEvenDirective,
                ngClassOdd: ngClassOddDirective,
                ngCloak: ngCloakDirective,
                ngController: ngControllerDirective,
                ngForm: ngFormDirective,
                ngHide: ngHideDirective,
                ngIf: ngIfDirective,
                ngInclude: ngIncludeDirective,
                ngInit: ngInitDirective,
                ngNonBindable: ngNonBindableDirective,
                ngPluralize: ngPluralizeDirective,
                ngRepeat: ngRepeatDirective,
                ngShow: ngShowDirective,
                ngStyle: ngStyleDirective,
                ngSwitch: ngSwitchDirective,
                ngSwitchWhen: ngSwitchWhenDirective,
                ngSwitchDefault: ngSwitchDefaultDirective,
                ngOptions: ngOptionsDirective,
                ngTransclude: ngTranscludeDirective,
                ngModel: ngModelDirective,
                ngList: ngListDirective,
                ngChange: ngChangeDirective,
                pattern: patternDirective,
                ngPattern: patternDirective,
                required: requiredDirective,
                ngRequired: requiredDirective,
                minlength: minlengthDirective,
                ngMinlength: minlengthDirective,
                maxlength: maxlengthDirective,
                ngMaxlength: maxlengthDirective,
                ngValue: ngValueDirective,
                ngModelOptions: ngModelOptionsDirective
            }).directive({
                ngInclude: ngIncludeFillContentDirective
            }).directive(ngAttributeAliasDirectives).directive(ngEventDirectives), $provide.provider({
                $anchorScroll: $AnchorScrollProvider,
                $animate: $AnimateProvider,
                $animateCss: $CoreAnimateCssProvider,
                $$animateQueue: $$CoreAnimateQueueProvider,
                $$AnimateRunner: $$CoreAnimateRunnerProvider,
                $browser: $BrowserProvider,
                $cacheFactory: $CacheFactoryProvider,
                $controller: $ControllerProvider,
                $document: $DocumentProvider,
                $exceptionHandler: $ExceptionHandlerProvider,
                $filter: $FilterProvider,
                $$forceReflow: $$ForceReflowProvider,
                $interpolate: $InterpolateProvider,
                $interval: $IntervalProvider,
                $http: $HttpProvider,
                $httpParamSerializer: $HttpParamSerializerProvider,
                $httpParamSerializerJQLike: $HttpParamSerializerJQLikeProvider,
                $httpBackend: $HttpBackendProvider,
                $location: $LocationProvider,
                $log: $LogProvider,
                $parse: $ParseProvider,
                $rootScope: $RootScopeProvider,
                $q: $QProvider,
                $$q: $$QProvider,
                $sce: $SceProvider,
                $sceDelegate: $SceDelegateProvider,
                $sniffer: $SnifferProvider,
                $templateCache: $TemplateCacheProvider,
                $templateRequest: $TemplateRequestProvider,
                $$testability: $$TestabilityProvider,
                $timeout: $TimeoutProvider,
                $window: $WindowProvider,
                $$rAF: $$RAFProvider,
                $$jqLite: $$jqLiteProvider,
                $$HashMap: $$HashMapProvider,
                $$cookieReader: $$CookieReaderProvider
            });
        } ]);
    }
    function jqNextId() {
        return ++jqId;
    }
    function camelCase(name) {
        return name.replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
            return offset ? letter.toUpperCase() : letter;
        }).replace(MOZ_HACK_REGEXP, "Moz$1");
    }
    function jqLiteIsTextNode(html) {
        return !HTML_REGEXP.test(html);
    }
    function jqLiteAcceptsData(node) {
        var nodeType = node.nodeType;
        return nodeType === NODE_TYPE_ELEMENT || !nodeType || nodeType === NODE_TYPE_DOCUMENT;
    }
    function jqLiteHasData(node) {
        for (var key in jqCache[node.ng339]) return !0;
        return !1;
    }
    function jqLiteBuildFragment(html, context) {
        var tmp, tag, wrap, i, fragment = context.createDocumentFragment(), nodes = [];
        if (jqLiteIsTextNode(html)) nodes.push(context.createTextNode(html)); else {
            for (tmp = tmp || fragment.appendChild(context.createElement("div")), tag = (TAG_NAME_REGEXP.exec(html) || [ "", "" ])[1].toLowerCase(), 
            wrap = wrapMap[tag] || wrapMap._default, tmp.innerHTML = wrap[1] + html.replace(XHTML_TAG_REGEXP, "<$1></$2>") + wrap[2], 
            i = wrap[0]; i--; ) tmp = tmp.lastChild;
            nodes = concat(nodes, tmp.childNodes), tmp = fragment.firstChild, tmp.textContent = "";
        }
        return fragment.textContent = "", fragment.innerHTML = "", forEach(nodes, function(node) {
            fragment.appendChild(node);
        }), fragment;
    }
    function jqLiteParseHTML(html, context) {
        context = context || document;
        var parsed;
        return (parsed = SINGLE_TAG_REGEXP.exec(html)) ? [ context.createElement(parsed[1]) ] : (parsed = jqLiteBuildFragment(html, context)) ? parsed.childNodes : [];
    }
    function JQLite(element) {
        if (element instanceof JQLite) return element;
        var argIsString;
        if (isString(element) && (element = trim(element), argIsString = !0), !(this instanceof JQLite)) {
            if (argIsString && "<" != element.charAt(0)) throw jqLiteMinErr("nosel", "Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element");
            return new JQLite(element);
        }
        argIsString ? jqLiteAddNodes(this, jqLiteParseHTML(element)) : jqLiteAddNodes(this, element);
    }
    function jqLiteClone(element) {
        return element.cloneNode(!0);
    }
    function jqLiteDealoc(element, onlyDescendants) {
        if (onlyDescendants || jqLiteRemoveData(element), element.querySelectorAll) for (var descendants = element.querySelectorAll("*"), i = 0, l = descendants.length; l > i; i++) jqLiteRemoveData(descendants[i]);
    }
    function jqLiteOff(element, type, fn, unsupported) {
        if (isDefined(unsupported)) throw jqLiteMinErr("offargs", "jqLite#off() does not support the `selector` argument");
        var expandoStore = jqLiteExpandoStore(element), events = expandoStore && expandoStore.events, handle = expandoStore && expandoStore.handle;
        if (handle) if (type) forEach(type.split(" "), function(type) {
            if (isDefined(fn)) {
                var listenerFns = events[type];
                if (arrayRemove(listenerFns || [], fn), listenerFns && listenerFns.length > 0) return;
            }
            removeEventListenerFn(element, type, handle), delete events[type];
        }); else for (type in events) "$destroy" !== type && removeEventListenerFn(element, type, handle), 
        delete events[type];
    }
    function jqLiteRemoveData(element, name) {
        var expandoId = element.ng339, expandoStore = expandoId && jqCache[expandoId];
        if (expandoStore) {
            if (name) return void delete expandoStore.data[name];
            expandoStore.handle && (expandoStore.events.$destroy && expandoStore.handle({}, "$destroy"), 
            jqLiteOff(element)), delete jqCache[expandoId], element.ng339 = undefined;
        }
    }
    function jqLiteExpandoStore(element, createIfNecessary) {
        var expandoId = element.ng339, expandoStore = expandoId && jqCache[expandoId];
        return createIfNecessary && !expandoStore && (element.ng339 = expandoId = jqNextId(), 
        expandoStore = jqCache[expandoId] = {
            events: {},
            data: {},
            handle: undefined
        }), expandoStore;
    }
    function jqLiteData(element, key, value) {
        if (jqLiteAcceptsData(element)) {
            var isSimpleSetter = isDefined(value), isSimpleGetter = !isSimpleSetter && key && !isObject(key), massGetter = !key, expandoStore = jqLiteExpandoStore(element, !isSimpleGetter), data = expandoStore && expandoStore.data;
            if (isSimpleSetter) data[key] = value; else {
                if (massGetter) return data;
                if (isSimpleGetter) return data && data[key];
                extend(data, key);
            }
        }
    }
    function jqLiteHasClass(element, selector) {
        return element.getAttribute ? (" " + (element.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + selector + " ") > -1 : !1;
    }
    function jqLiteRemoveClass(element, cssClasses) {
        cssClasses && element.setAttribute && forEach(cssClasses.split(" "), function(cssClass) {
            element.setAttribute("class", trim((" " + (element.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + trim(cssClass) + " ", " ")));
        });
    }
    function jqLiteAddClass(element, cssClasses) {
        if (cssClasses && element.setAttribute) {
            var existingClasses = (" " + (element.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
            forEach(cssClasses.split(" "), function(cssClass) {
                cssClass = trim(cssClass), -1 === existingClasses.indexOf(" " + cssClass + " ") && (existingClasses += cssClass + " ");
            }), element.setAttribute("class", trim(existingClasses));
        }
    }
    function jqLiteAddNodes(root, elements) {
        if (elements) if (elements.nodeType) root[root.length++] = elements; else {
            var length = elements.length;
            if ("number" == typeof length && elements.window !== elements) {
                if (length) for (var i = 0; length > i; i++) root[root.length++] = elements[i];
            } else root[root.length++] = elements;
        }
    }
    function jqLiteController(element, name) {
        return jqLiteInheritedData(element, "$" + (name || "ngController") + "Controller");
    }
    function jqLiteInheritedData(element, name, value) {
        element.nodeType == NODE_TYPE_DOCUMENT && (element = element.documentElement);
        for (var names = isArray(name) ? name : [ name ]; element; ) {
            for (var i = 0, ii = names.length; ii > i; i++) if (isDefined(value = jqLite.data(element, names[i]))) return value;
            element = element.parentNode || element.nodeType === NODE_TYPE_DOCUMENT_FRAGMENT && element.host;
        }
    }
    function jqLiteEmpty(element) {
        for (jqLiteDealoc(element, !0); element.firstChild; ) element.removeChild(element.firstChild);
    }
    function jqLiteRemove(element, keepData) {
        keepData || jqLiteDealoc(element);
        var parent = element.parentNode;
        parent && parent.removeChild(element);
    }
    function jqLiteDocumentLoaded(action, win) {
        win = win || window, "complete" === win.document.readyState ? win.setTimeout(action) : jqLite(win).on("load", action);
    }
    function getBooleanAttrName(element, name) {
        var booleanAttr = BOOLEAN_ATTR[name.toLowerCase()];
        return booleanAttr && BOOLEAN_ELEMENTS[nodeName_(element)] && booleanAttr;
    }
    function getAliasedAttrName(name) {
        return ALIASED_ATTR[name];
    }
    function createEventHandler(element, events) {
        var eventHandler = function(event, type) {
            event.isDefaultPrevented = function() {
                return event.defaultPrevented;
            };
            var eventFns = events[type || event.type], eventFnsLength = eventFns ? eventFns.length : 0;
            if (eventFnsLength) {
                if (isUndefined(event.immediatePropagationStopped)) {
                    var originalStopImmediatePropagation = event.stopImmediatePropagation;
                    event.stopImmediatePropagation = function() {
                        event.immediatePropagationStopped = !0, event.stopPropagation && event.stopPropagation(), 
                        originalStopImmediatePropagation && originalStopImmediatePropagation.call(event);
                    };
                }
                event.isImmediatePropagationStopped = function() {
                    return event.immediatePropagationStopped === !0;
                }, eventFnsLength > 1 && (eventFns = shallowCopy(eventFns));
                for (var i = 0; eventFnsLength > i; i++) event.isImmediatePropagationStopped() || eventFns[i].call(element, event);
            }
        };
        return eventHandler.elem = element, eventHandler;
    }
    function $$jqLiteProvider() {
        this.$get = function() {
            return extend(JQLite, {
                hasClass: function(node, classes) {
                    return node.attr && (node = node[0]), jqLiteHasClass(node, classes);
                },
                addClass: function(node, classes) {
                    return node.attr && (node = node[0]), jqLiteAddClass(node, classes);
                },
                removeClass: function(node, classes) {
                    return node.attr && (node = node[0]), jqLiteRemoveClass(node, classes);
                }
            });
        };
    }
    function hashKey(obj, nextUidFn) {
        var key = obj && obj.$$hashKey;
        if (key) return "function" == typeof key && (key = obj.$$hashKey()), key;
        var objType = typeof obj;
        return key = "function" == objType || "object" == objType && null !== obj ? obj.$$hashKey = objType + ":" + (nextUidFn || nextUid)() : objType + ":" + obj;
    }
    function HashMap(array, isolatedUid) {
        if (isolatedUid) {
            var uid = 0;
            this.nextUid = function() {
                return ++uid;
            };
        }
        forEach(array, this.put, this);
    }
    function anonFn(fn) {
        var fnText = fn.toString().replace(STRIP_COMMENTS, ""), args = fnText.match(FN_ARGS);
        return args ? "function(" + (args[1] || "").replace(/[\s\r\n]+/, " ") + ")" : "fn";
    }
    function annotate(fn, strictDi, name) {
        var $inject, fnText, argDecl, last;
        if ("function" == typeof fn) {
            if (!($inject = fn.$inject)) {
                if ($inject = [], fn.length) {
                    if (strictDi) throw isString(name) && name || (name = fn.name || anonFn(fn)), $injectorMinErr("strictdi", "{0} is not using explicit annotation and cannot be invoked in strict mode", name);
                    fnText = fn.toString().replace(STRIP_COMMENTS, ""), argDecl = fnText.match(FN_ARGS), 
                    forEach(argDecl[1].split(FN_ARG_SPLIT), function(arg) {
                        arg.replace(FN_ARG, function(all, underscore, name) {
                            $inject.push(name);
                        });
                    });
                }
                fn.$inject = $inject;
            }
        } else isArray(fn) ? (last = fn.length - 1, assertArgFn(fn[last], "fn"), $inject = fn.slice(0, last)) : assertArgFn(fn, "fn", !0);
        return $inject;
    }
    function createInjector(modulesToLoad, strictDi) {
        function supportObject(delegate) {
            return function(key, value) {
                return isObject(key) ? void forEach(key, reverseParams(delegate)) : delegate(key, value);
            };
        }
        function provider(name, provider_) {
            if (assertNotHasOwnProperty(name, "service"), (isFunction(provider_) || isArray(provider_)) && (provider_ = providerInjector.instantiate(provider_)), 
            !provider_.$get) throw $injectorMinErr("pget", "Provider '{0}' must define $get factory method.", name);
            return providerCache[name + providerSuffix] = provider_;
        }
        function enforceReturnValue(name, factory) {
            return function() {
                var result = instanceInjector.invoke(factory, this);
                if (isUndefined(result)) throw $injectorMinErr("undef", "Provider '{0}' must return a value from $get factory method.", name);
                return result;
            };
        }
        function factory(name, factoryFn, enforce) {
            return provider(name, {
                $get: enforce !== !1 ? enforceReturnValue(name, factoryFn) : factoryFn
            });
        }
        function service(name, constructor) {
            return factory(name, [ "$injector", function($injector) {
                return $injector.instantiate(constructor);
            } ]);
        }
        function value(name, val) {
            return factory(name, valueFn(val), !1);
        }
        function constant(name, value) {
            assertNotHasOwnProperty(name, "constant"), providerCache[name] = value, instanceCache[name] = value;
        }
        function decorator(serviceName, decorFn) {
            var origProvider = providerInjector.get(serviceName + providerSuffix), orig$get = origProvider.$get;
            origProvider.$get = function() {
                var origInstance = instanceInjector.invoke(orig$get, origProvider);
                return instanceInjector.invoke(decorFn, null, {
                    $delegate: origInstance
                });
            };
        }
        function loadModules(modulesToLoad) {
            assertArg(isUndefined(modulesToLoad) || isArray(modulesToLoad), "modulesToLoad", "not an array");
            var moduleFn, runBlocks = [];
            return forEach(modulesToLoad, function(module) {
                function runInvokeQueue(queue) {
                    var i, ii;
                    for (i = 0, ii = queue.length; ii > i; i++) {
                        var invokeArgs = queue[i], provider = providerInjector.get(invokeArgs[0]);
                        provider[invokeArgs[1]].apply(provider, invokeArgs[2]);
                    }
                }
                if (!loadedModules.get(module)) {
                    loadedModules.put(module, !0);
                    try {
                        isString(module) ? (moduleFn = angularModule(module), runBlocks = runBlocks.concat(loadModules(moduleFn.requires)).concat(moduleFn._runBlocks), 
                        runInvokeQueue(moduleFn._invokeQueue), runInvokeQueue(moduleFn._configBlocks)) : isFunction(module) ? runBlocks.push(providerInjector.invoke(module)) : isArray(module) ? runBlocks.push(providerInjector.invoke(module)) : assertArgFn(module, "module");
                    } catch (e) {
                        throw isArray(module) && (module = module[module.length - 1]), e.message && e.stack && -1 == e.stack.indexOf(e.message) && (e = e.message + "\n" + e.stack), 
                        $injectorMinErr("modulerr", "Failed to instantiate module {0} due to:\n{1}", module, e.stack || e.message || e);
                    }
                }
            }), runBlocks;
        }
        function createInternalInjector(cache, factory) {
            function getService(serviceName, caller) {
                if (cache.hasOwnProperty(serviceName)) {
                    if (cache[serviceName] === INSTANTIATING) throw $injectorMinErr("cdep", "Circular dependency found: {0}", serviceName + " <- " + path.join(" <- "));
                    return cache[serviceName];
                }
                try {
                    return path.unshift(serviceName), cache[serviceName] = INSTANTIATING, cache[serviceName] = factory(serviceName, caller);
                } catch (err) {
                    throw cache[serviceName] === INSTANTIATING && delete cache[serviceName], err;
                } finally {
                    path.shift();
                }
            }
            function invoke(fn, self, locals, serviceName) {
                "string" == typeof locals && (serviceName = locals, locals = null);
                var length, i, key, args = [], $inject = createInjector.$$annotate(fn, strictDi, serviceName);
                for (i = 0, length = $inject.length; length > i; i++) {
                    if (key = $inject[i], "string" != typeof key) throw $injectorMinErr("itkn", "Incorrect injection token! Expected service name as string, got {0}", key);
                    args.push(locals && locals.hasOwnProperty(key) ? locals[key] : getService(key, serviceName));
                }
                return isArray(fn) && (fn = fn[length]), fn.apply(self, args);
            }
            function instantiate(Type, locals, serviceName) {
                var instance = Object.create((isArray(Type) ? Type[Type.length - 1] : Type).prototype || null), returnedValue = invoke(Type, instance, locals, serviceName);
                return isObject(returnedValue) || isFunction(returnedValue) ? returnedValue : instance;
            }
            return {
                invoke: invoke,
                instantiate: instantiate,
                get: getService,
                annotate: createInjector.$$annotate,
                has: function(name) {
                    return providerCache.hasOwnProperty(name + providerSuffix) || cache.hasOwnProperty(name);
                }
            };
        }
        strictDi = strictDi === !0;
        var INSTANTIATING = {}, providerSuffix = "Provider", path = [], loadedModules = new HashMap([], !0), providerCache = {
            $provide: {
                provider: supportObject(provider),
                factory: supportObject(factory),
                service: supportObject(service),
                value: supportObject(value),
                constant: supportObject(constant),
                decorator: decorator
            }
        }, providerInjector = providerCache.$injector = createInternalInjector(providerCache, function(serviceName, caller) {
            throw angular.isString(caller) && path.push(caller), $injectorMinErr("unpr", "Unknown provider: {0}", path.join(" <- "));
        }), instanceCache = {}, instanceInjector = instanceCache.$injector = createInternalInjector(instanceCache, function(serviceName, caller) {
            var provider = providerInjector.get(serviceName + providerSuffix, caller);
            return instanceInjector.invoke(provider.$get, provider, undefined, serviceName);
        });
        return forEach(loadModules(modulesToLoad), function(fn) {
            fn && instanceInjector.invoke(fn);
        }), instanceInjector;
    }
    function $AnchorScrollProvider() {
        var autoScrollingEnabled = !0;
        this.disableAutoScrolling = function() {
            autoScrollingEnabled = !1;
        }, this.$get = [ "$window", "$location", "$rootScope", function($window, $location, $rootScope) {
            function getFirstAnchor(list) {
                var result = null;
                return Array.prototype.some.call(list, function(element) {
                    return "a" === nodeName_(element) ? (result = element, !0) : void 0;
                }), result;
            }
            function getYOffset() {
                var offset = scroll.yOffset;
                if (isFunction(offset)) offset = offset(); else if (isElement(offset)) {
                    var elem = offset[0], style = $window.getComputedStyle(elem);
                    offset = "fixed" !== style.position ? 0 : elem.getBoundingClientRect().bottom;
                } else isNumber(offset) || (offset = 0);
                return offset;
            }
            function scrollTo(elem) {
                if (elem) {
                    elem.scrollIntoView();
                    var offset = getYOffset();
                    if (offset) {
                        var elemTop = elem.getBoundingClientRect().top;
                        $window.scrollBy(0, elemTop - offset);
                    }
                } else $window.scrollTo(0, 0);
            }
            function scroll(hash) {
                hash = isString(hash) ? hash : $location.hash();
                var elm;
                hash ? (elm = document.getElementById(hash)) ? scrollTo(elm) : (elm = getFirstAnchor(document.getElementsByName(hash))) ? scrollTo(elm) : "top" === hash && scrollTo(null) : scrollTo(null);
            }
            var document = $window.document;
            return autoScrollingEnabled && $rootScope.$watch(function() {
                return $location.hash();
            }, function(newVal, oldVal) {
                (newVal !== oldVal || "" !== newVal) && jqLiteDocumentLoaded(function() {
                    $rootScope.$evalAsync(scroll);
                });
            }), scroll;
        } ];
    }
    function mergeClasses(a, b) {
        return a || b ? a ? b ? (isArray(a) && (a = a.join(" ")), isArray(b) && (b = b.join(" ")), 
        a + " " + b) : a : b : "";
    }
    function extractElementNode(element) {
        for (var i = 0; i < element.length; i++) {
            var elm = element[i];
            if (elm.nodeType === ELEMENT_NODE) return elm;
        }
    }
    function splitClasses(classes) {
        isString(classes) && (classes = classes.split(" "));
        var obj = createMap();
        return forEach(classes, function(klass) {
            klass.length && (obj[klass] = !0);
        }), obj;
    }
    function prepareAnimateOptions(options) {
        return isObject(options) ? options : {};
    }
    function Browser(window, document, $log, $sniffer) {
        function completeOutstandingRequest(fn) {
            try {
                fn.apply(null, sliceArgs(arguments, 1));
            } finally {
                if (outstandingRequestCount--, 0 === outstandingRequestCount) for (;outstandingRequestCallbacks.length; ) try {
                    outstandingRequestCallbacks.pop()();
                } catch (e) {
                    $log.error(e);
                }
            }
        }
        function getHash(url) {
            var index = url.indexOf("#");
            return -1 === index ? "" : url.substr(index);
        }
        function cacheStateAndFireUrlChange() {
            pendingLocation = null, cacheState(), fireUrlChange();
        }
        function getCurrentState() {
            try {
                return history.state;
            } catch (e) {}
        }
        function cacheState() {
            cachedState = getCurrentState(), cachedState = isUndefined(cachedState) ? null : cachedState, 
            equals(cachedState, lastCachedState) && (cachedState = lastCachedState), lastCachedState = cachedState;
        }
        function fireUrlChange() {
            (lastBrowserUrl !== self.url() || lastHistoryState !== cachedState) && (lastBrowserUrl = self.url(), 
            lastHistoryState = cachedState, forEach(urlChangeListeners, function(listener) {
                listener(self.url(), cachedState);
            }));
        }
        var self = this, location = (document[0], window.location), history = window.history, setTimeout = window.setTimeout, clearTimeout = window.clearTimeout, pendingDeferIds = {};
        self.isMock = !1;
        var outstandingRequestCount = 0, outstandingRequestCallbacks = [];
        self.$$completeOutstandingRequest = completeOutstandingRequest, self.$$incOutstandingRequestCount = function() {
            outstandingRequestCount++;
        }, self.notifyWhenNoOutstandingRequests = function(callback) {
            0 === outstandingRequestCount ? callback() : outstandingRequestCallbacks.push(callback);
        };
        var cachedState, lastHistoryState, lastBrowserUrl = location.href, baseElement = document.find("base"), pendingLocation = null;
        cacheState(), lastHistoryState = cachedState, self.url = function(url, replace, state) {
            if (isUndefined(state) && (state = null), location !== window.location && (location = window.location), 
            history !== window.history && (history = window.history), url) {
                var sameState = lastHistoryState === state;
                if (lastBrowserUrl === url && (!$sniffer.history || sameState)) return self;
                var sameBase = lastBrowserUrl && stripHash(lastBrowserUrl) === stripHash(url);
                return lastBrowserUrl = url, lastHistoryState = state, !$sniffer.history || sameBase && sameState ? ((!sameBase || pendingLocation) && (pendingLocation = url), 
                replace ? location.replace(url) : sameBase ? location.hash = getHash(url) : location.href = url, 
                location.href !== url && (pendingLocation = url)) : (history[replace ? "replaceState" : "pushState"](state, "", url), 
                cacheState(), lastHistoryState = cachedState), self;
            }
            return pendingLocation || location.href.replace(/%27/g, "'");
        }, self.state = function() {
            return cachedState;
        };
        var urlChangeListeners = [], urlChangeInit = !1, lastCachedState = null;
        self.onUrlChange = function(callback) {
            return urlChangeInit || ($sniffer.history && jqLite(window).on("popstate", cacheStateAndFireUrlChange), 
            jqLite(window).on("hashchange", cacheStateAndFireUrlChange), urlChangeInit = !0), 
            urlChangeListeners.push(callback), callback;
        }, self.$$applicationDestroyed = function() {
            jqLite(window).off("hashchange popstate", cacheStateAndFireUrlChange);
        }, self.$$checkUrlChange = fireUrlChange, self.baseHref = function() {
            var href = baseElement.attr("href");
            return href ? href.replace(/^(https?\:)?\/\/[^\/]*/, "") : "";
        }, self.defer = function(fn, delay) {
            var timeoutId;
            return outstandingRequestCount++, timeoutId = setTimeout(function() {
                delete pendingDeferIds[timeoutId], completeOutstandingRequest(fn);
            }, delay || 0), pendingDeferIds[timeoutId] = !0, timeoutId;
        }, self.defer.cancel = function(deferId) {
            return pendingDeferIds[deferId] ? (delete pendingDeferIds[deferId], clearTimeout(deferId), 
            completeOutstandingRequest(noop), !0) : !1;
        };
    }
    function $BrowserProvider() {
        this.$get = [ "$window", "$log", "$sniffer", "$document", function($window, $log, $sniffer, $document) {
            return new Browser($window, $document, $log, $sniffer);
        } ];
    }
    function $CacheFactoryProvider() {
        this.$get = function() {
            function cacheFactory(cacheId, options) {
                function refresh(entry) {
                    entry != freshEnd && (staleEnd ? staleEnd == entry && (staleEnd = entry.n) : staleEnd = entry, 
                    link(entry.n, entry.p), link(entry, freshEnd), freshEnd = entry, freshEnd.n = null);
                }
                function link(nextEntry, prevEntry) {
                    nextEntry != prevEntry && (nextEntry && (nextEntry.p = prevEntry), prevEntry && (prevEntry.n = nextEntry));
                }
                if (cacheId in caches) throw minErr("$cacheFactory")("iid", "CacheId '{0}' is already taken!", cacheId);
                var size = 0, stats = extend({}, options, {
                    id: cacheId
                }), data = {}, capacity = options && options.capacity || Number.MAX_VALUE, lruHash = {}, freshEnd = null, staleEnd = null;
                return caches[cacheId] = {
                    put: function(key, value) {
                        if (!isUndefined(value)) {
                            if (capacity < Number.MAX_VALUE) {
                                var lruEntry = lruHash[key] || (lruHash[key] = {
                                    key: key
                                });
                                refresh(lruEntry);
                            }
                            return key in data || size++, data[key] = value, size > capacity && this.remove(staleEnd.key), 
                            value;
                        }
                    },
                    get: function(key) {
                        if (capacity < Number.MAX_VALUE) {
                            var lruEntry = lruHash[key];
                            if (!lruEntry) return;
                            refresh(lruEntry);
                        }
                        return data[key];
                    },
                    remove: function(key) {
                        if (capacity < Number.MAX_VALUE) {
                            var lruEntry = lruHash[key];
                            if (!lruEntry) return;
                            lruEntry == freshEnd && (freshEnd = lruEntry.p), lruEntry == staleEnd && (staleEnd = lruEntry.n), 
                            link(lruEntry.n, lruEntry.p), delete lruHash[key];
                        }
                        delete data[key], size--;
                    },
                    removeAll: function() {
                        data = {}, size = 0, lruHash = {}, freshEnd = staleEnd = null;
                    },
                    destroy: function() {
                        data = null, stats = null, lruHash = null, delete caches[cacheId];
                    },
                    info: function() {
                        return extend({}, stats, {
                            size: size
                        });
                    }
                };
            }
            var caches = {};
            return cacheFactory.info = function() {
                var info = {};
                return forEach(caches, function(cache, cacheId) {
                    info[cacheId] = cache.info();
                }), info;
            }, cacheFactory.get = function(cacheId) {
                return caches[cacheId];
            }, cacheFactory;
        };
    }
    function $TemplateCacheProvider() {
        this.$get = [ "$cacheFactory", function($cacheFactory) {
            return $cacheFactory("templates");
        } ];
    }
    function $CompileProvider($provide, $$sanitizeUriProvider) {
        function parseIsolateBindings(scope, directiveName, isController) {
            var LOCAL_REGEXP = /^\s*([@&]|=(\*?))(\??)\s*(\w*)\s*$/, bindings = {};
            return forEach(scope, function(definition, scopeName) {
                var match = definition.match(LOCAL_REGEXP);
                if (!match) throw $compileMinErr("iscp", "Invalid {3} for directive '{0}'. Definition: {... {1}: '{2}' ...}", directiveName, scopeName, definition, isController ? "controller bindings definition" : "isolate scope definition");
                bindings[scopeName] = {
                    mode: match[1][0],
                    collection: "*" === match[2],
                    optional: "?" === match[3],
                    attrName: match[4] || scopeName
                };
            }), bindings;
        }
        function parseDirectiveBindings(directive, directiveName) {
            var bindings = {
                isolateScope: null,
                bindToController: null
            };
            if (isObject(directive.scope) && (directive.bindToController === !0 ? (bindings.bindToController = parseIsolateBindings(directive.scope, directiveName, !0), 
            bindings.isolateScope = {}) : bindings.isolateScope = parseIsolateBindings(directive.scope, directiveName, !1)), 
            isObject(directive.bindToController) && (bindings.bindToController = parseIsolateBindings(directive.bindToController, directiveName, !0)), 
            isObject(bindings.bindToController)) {
                var controller = directive.controller, controllerAs = directive.controllerAs;
                if (!controller) throw $compileMinErr("noctrl", "Cannot bind to controller without directive '{0}'s controller.", directiveName);
                if (!identifierForController(controller, controllerAs)) throw $compileMinErr("noident", "Cannot bind to controller without identifier for directive '{0}'.", directiveName);
            }
            return bindings;
        }
        function assertValidDirectiveName(name) {
            var letter = name.charAt(0);
            if (!letter || letter !== lowercase(letter)) throw $compileMinErr("baddir", "Directive name '{0}' is invalid. The first character must be a lowercase letter", name);
            if (name !== name.trim()) throw $compileMinErr("baddir", "Directive name '{0}' is invalid. The name should not contain leading or trailing whitespaces", name);
        }
        var hasDirectives = {}, Suffix = "Directive", COMMENT_DIRECTIVE_REGEXP = /^\s*directive\:\s*([\w\-]+)\s+(.*)$/, CLASS_DIRECTIVE_REGEXP = /(([\w\-]+)(?:\:([^;]+))?;?)/, ALL_OR_NOTHING_ATTRS = makeMap("ngSrc,ngSrcset,src,srcset"), REQUIRE_PREFIX_REGEXP = /^(?:(\^\^?)?(\?)?(\^\^?)?)?/, EVENT_HANDLER_ATTR_REGEXP = /^(on[a-z]+|formaction)$/;
        this.directive = function registerDirective(name, directiveFactory) {
            return assertNotHasOwnProperty(name, "directive"), isString(name) ? (assertValidDirectiveName(name), 
            assertArg(directiveFactory, "directiveFactory"), hasDirectives.hasOwnProperty(name) || (hasDirectives[name] = [], 
            $provide.factory(name + Suffix, [ "$injector", "$exceptionHandler", function($injector, $exceptionHandler) {
                var directives = [];
                return forEach(hasDirectives[name], function(directiveFactory, index) {
                    try {
                        var directive = $injector.invoke(directiveFactory);
                        isFunction(directive) ? directive = {
                            compile: valueFn(directive)
                        } : !directive.compile && directive.link && (directive.compile = valueFn(directive.link)), 
                        directive.priority = directive.priority || 0, directive.index = index, directive.name = directive.name || name, 
                        directive.require = directive.require || directive.controller && directive.name, 
                        directive.restrict = directive.restrict || "EA";
                        var bindings = directive.$$bindings = parseDirectiveBindings(directive, directive.name);
                        isObject(bindings.isolateScope) && (directive.$$isolateBindings = bindings.isolateScope), 
                        directive.$$moduleName = directiveFactory.$$moduleName, directives.push(directive);
                    } catch (e) {
                        $exceptionHandler(e);
                    }
                }), directives;
            } ])), hasDirectives[name].push(directiveFactory)) : forEach(name, reverseParams(registerDirective)), 
            this;
        }, this.aHrefSanitizationWhitelist = function(regexp) {
            return isDefined(regexp) ? ($$sanitizeUriProvider.aHrefSanitizationWhitelist(regexp), 
            this) : $$sanitizeUriProvider.aHrefSanitizationWhitelist();
        }, this.imgSrcSanitizationWhitelist = function(regexp) {
            return isDefined(regexp) ? ($$sanitizeUriProvider.imgSrcSanitizationWhitelist(regexp), 
            this) : $$sanitizeUriProvider.imgSrcSanitizationWhitelist();
        };
        var debugInfoEnabled = !0;
        this.debugInfoEnabled = function(enabled) {
            return isDefined(enabled) ? (debugInfoEnabled = enabled, this) : debugInfoEnabled;
        }, this.$get = [ "$injector", "$interpolate", "$exceptionHandler", "$templateRequest", "$parse", "$controller", "$rootScope", "$document", "$sce", "$animate", "$$sanitizeUri", function($injector, $interpolate, $exceptionHandler, $templateRequest, $parse, $controller, $rootScope, $document, $sce, $animate, $$sanitizeUri) {
            function safeAddClass($element, className) {
                try {
                    $element.addClass(className);
                } catch (e) {}
            }
            function compile($compileNodes, transcludeFn, maxPriority, ignoreDirective, previousCompileContext) {
                $compileNodes instanceof jqLite || ($compileNodes = jqLite($compileNodes)), forEach($compileNodes, function(node, index) {
                    node.nodeType == NODE_TYPE_TEXT && node.nodeValue.match(/\S+/) && ($compileNodes[index] = jqLite(node).wrap("<span></span>").parent()[0]);
                });
                var compositeLinkFn = compileNodes($compileNodes, transcludeFn, $compileNodes, maxPriority, ignoreDirective, previousCompileContext);
                compile.$$addScopeClass($compileNodes);
                var namespace = null;
                return function(scope, cloneConnectFn, options) {
                    assertArg(scope, "scope"), options = options || {};
                    var parentBoundTranscludeFn = options.parentBoundTranscludeFn, transcludeControllers = options.transcludeControllers, futureParentElement = options.futureParentElement;
                    parentBoundTranscludeFn && parentBoundTranscludeFn.$$boundTransclude && (parentBoundTranscludeFn = parentBoundTranscludeFn.$$boundTransclude), 
                    namespace || (namespace = detectNamespaceForChildElements(futureParentElement));
                    var $linkNode;
                    if ($linkNode = "html" !== namespace ? jqLite(wrapTemplate(namespace, jqLite("<div>").append($compileNodes).html())) : cloneConnectFn ? JQLitePrototype.clone.call($compileNodes) : $compileNodes, 
                    transcludeControllers) for (var controllerName in transcludeControllers) $linkNode.data("$" + controllerName + "Controller", transcludeControllers[controllerName].instance);
                    return compile.$$addScopeInfo($linkNode, scope), cloneConnectFn && cloneConnectFn($linkNode, scope), 
                    compositeLinkFn && compositeLinkFn(scope, $linkNode, $linkNode, parentBoundTranscludeFn), 
                    $linkNode;
                };
            }
            function detectNamespaceForChildElements(parentElement) {
                var node = parentElement && parentElement[0];
                return node && "foreignobject" !== nodeName_(node) && node.toString().match(/SVG/) ? "svg" : "html";
            }
            function compileNodes(nodeList, transcludeFn, $rootElement, maxPriority, ignoreDirective, previousCompileContext) {
                function compositeLinkFn(scope, nodeList, $rootElement, parentBoundTranscludeFn) {
                    var nodeLinkFn, childLinkFn, node, childScope, i, ii, idx, childBoundTranscludeFn, stableNodeList;
                    if (nodeLinkFnFound) {
                        var nodeListLength = nodeList.length;
                        for (stableNodeList = new Array(nodeListLength), i = 0; i < linkFns.length; i += 3) idx = linkFns[i], 
                        stableNodeList[idx] = nodeList[idx];
                    } else stableNodeList = nodeList;
                    for (i = 0, ii = linkFns.length; ii > i; ) if (node = stableNodeList[linkFns[i++]], 
                    nodeLinkFn = linkFns[i++], childLinkFn = linkFns[i++], nodeLinkFn) {
                        if (nodeLinkFn.scope) {
                            childScope = scope.$new(), compile.$$addScopeInfo(jqLite(node), childScope);
                            var destroyBindings = nodeLinkFn.$$destroyBindings;
                            destroyBindings && (nodeLinkFn.$$destroyBindings = null, childScope.$on("$destroyed", destroyBindings));
                        } else childScope = scope;
                        childBoundTranscludeFn = nodeLinkFn.transcludeOnThisElement ? createBoundTranscludeFn(scope, nodeLinkFn.transclude, parentBoundTranscludeFn) : !nodeLinkFn.templateOnThisElement && parentBoundTranscludeFn ? parentBoundTranscludeFn : !parentBoundTranscludeFn && transcludeFn ? createBoundTranscludeFn(scope, transcludeFn) : null, 
                        nodeLinkFn(childLinkFn, childScope, node, $rootElement, childBoundTranscludeFn, nodeLinkFn);
                    } else childLinkFn && childLinkFn(scope, node.childNodes, undefined, parentBoundTranscludeFn);
                }
                for (var attrs, directives, nodeLinkFn, childNodes, childLinkFn, linkFnFound, nodeLinkFnFound, linkFns = [], i = 0; i < nodeList.length; i++) attrs = new Attributes(), 
                directives = collectDirectives(nodeList[i], [], attrs, 0 === i ? maxPriority : undefined, ignoreDirective), 
                nodeLinkFn = directives.length ? applyDirectivesToNode(directives, nodeList[i], attrs, transcludeFn, $rootElement, null, [], [], previousCompileContext) : null, 
                nodeLinkFn && nodeLinkFn.scope && compile.$$addScopeClass(attrs.$$element), childLinkFn = nodeLinkFn && nodeLinkFn.terminal || !(childNodes = nodeList[i].childNodes) || !childNodes.length ? null : compileNodes(childNodes, nodeLinkFn ? (nodeLinkFn.transcludeOnThisElement || !nodeLinkFn.templateOnThisElement) && nodeLinkFn.transclude : transcludeFn), 
                (nodeLinkFn || childLinkFn) && (linkFns.push(i, nodeLinkFn, childLinkFn), linkFnFound = !0, 
                nodeLinkFnFound = nodeLinkFnFound || nodeLinkFn), previousCompileContext = null;
                return linkFnFound ? compositeLinkFn : null;
            }
            function createBoundTranscludeFn(scope, transcludeFn, previousBoundTranscludeFn) {
                var boundTranscludeFn = function(transcludedScope, cloneFn, controllers, futureParentElement, containingScope) {
                    return transcludedScope || (transcludedScope = scope.$new(!1, containingScope), 
                    transcludedScope.$$transcluded = !0), transcludeFn(transcludedScope, cloneFn, {
                        parentBoundTranscludeFn: previousBoundTranscludeFn,
                        transcludeControllers: controllers,
                        futureParentElement: futureParentElement
                    });
                };
                return boundTranscludeFn;
            }
            function collectDirectives(node, directives, attrs, maxPriority, ignoreDirective) {
                var match, className, nodeType = node.nodeType, attrsMap = attrs.$attr;
                switch (nodeType) {
                  case NODE_TYPE_ELEMENT:
                    addDirective(directives, directiveNormalize(nodeName_(node)), "E", maxPriority, ignoreDirective);
                    for (var attr, name, nName, ngAttrName, value, isNgAttr, nAttrs = node.attributes, j = 0, jj = nAttrs && nAttrs.length; jj > j; j++) {
                        var attrStartName = !1, attrEndName = !1;
                        attr = nAttrs[j], name = attr.name, value = trim(attr.value), ngAttrName = directiveNormalize(name), 
                        (isNgAttr = NG_ATTR_BINDING.test(ngAttrName)) && (name = name.replace(PREFIX_REGEXP, "").substr(8).replace(/_(.)/g, function(match, letter) {
                            return letter.toUpperCase();
                        }));
                        var directiveNName = ngAttrName.replace(/(Start|End)$/, "");
                        directiveIsMultiElement(directiveNName) && ngAttrName === directiveNName + "Start" && (attrStartName = name, 
                        attrEndName = name.substr(0, name.length - 5) + "end", name = name.substr(0, name.length - 6)), 
                        nName = directiveNormalize(name.toLowerCase()), attrsMap[nName] = name, (isNgAttr || !attrs.hasOwnProperty(nName)) && (attrs[nName] = value, 
                        getBooleanAttrName(node, nName) && (attrs[nName] = !0)), addAttrInterpolateDirective(node, directives, value, nName, isNgAttr), 
                        addDirective(directives, nName, "A", maxPriority, ignoreDirective, attrStartName, attrEndName);
                    }
                    if (className = node.className, isObject(className) && (className = className.animVal), 
                    isString(className) && "" !== className) for (;match = CLASS_DIRECTIVE_REGEXP.exec(className); ) nName = directiveNormalize(match[2]), 
                    addDirective(directives, nName, "C", maxPriority, ignoreDirective) && (attrs[nName] = trim(match[3])), 
                    className = className.substr(match.index + match[0].length);
                    break;

                  case NODE_TYPE_TEXT:
                    if (11 === msie) for (;node.parentNode && node.nextSibling && node.nextSibling.nodeType === NODE_TYPE_TEXT; ) node.nodeValue = node.nodeValue + node.nextSibling.nodeValue, 
                    node.parentNode.removeChild(node.nextSibling);
                    addTextInterpolateDirective(directives, node.nodeValue);
                    break;

                  case NODE_TYPE_COMMENT:
                    try {
                        match = COMMENT_DIRECTIVE_REGEXP.exec(node.nodeValue), match && (nName = directiveNormalize(match[1]), 
                        addDirective(directives, nName, "M", maxPriority, ignoreDirective) && (attrs[nName] = trim(match[2])));
                    } catch (e) {}
                }
                return directives.sort(byPriority), directives;
            }
            function groupScan(node, attrStart, attrEnd) {
                var nodes = [], depth = 0;
                if (attrStart && node.hasAttribute && node.hasAttribute(attrStart)) {
                    do {
                        if (!node) throw $compileMinErr("uterdir", "Unterminated attribute, found '{0}' but no matching '{1}' found.", attrStart, attrEnd);
                        node.nodeType == NODE_TYPE_ELEMENT && (node.hasAttribute(attrStart) && depth++, 
                        node.hasAttribute(attrEnd) && depth--), nodes.push(node), node = node.nextSibling;
                    } while (depth > 0);
                } else nodes.push(node);
                return jqLite(nodes);
            }
            function groupElementsLinkFnWrapper(linkFn, attrStart, attrEnd) {
                return function(scope, element, attrs, controllers, transcludeFn) {
                    return element = groupScan(element[0], attrStart, attrEnd), linkFn(scope, element, attrs, controllers, transcludeFn);
                };
            }
            function applyDirectivesToNode(directives, compileNode, templateAttrs, transcludeFn, jqCollection, originalReplaceDirective, preLinkFns, postLinkFns, previousCompileContext) {
                function addLinkFns(pre, post, attrStart, attrEnd) {
                    pre && (attrStart && (pre = groupElementsLinkFnWrapper(pre, attrStart, attrEnd)), 
                    pre.require = directive.require, pre.directiveName = directiveName, (newIsolateScopeDirective === directive || directive.$$isolateScope) && (pre = cloneAndAnnotateFn(pre, {
                        isolateScope: !0
                    })), preLinkFns.push(pre)), post && (attrStart && (post = groupElementsLinkFnWrapper(post, attrStart, attrEnd)), 
                    post.require = directive.require, post.directiveName = directiveName, (newIsolateScopeDirective === directive || directive.$$isolateScope) && (post = cloneAndAnnotateFn(post, {
                        isolateScope: !0
                    })), postLinkFns.push(post));
                }
                function getControllers(directiveName, require, $element, elementControllers) {
                    var value;
                    if (isString(require)) {
                        var match = require.match(REQUIRE_PREFIX_REGEXP), name = require.substring(match[0].length), inheritType = match[1] || match[3], optional = "?" === match[2];
                        if ("^^" === inheritType ? $element = $element.parent() : (value = elementControllers && elementControllers[name], 
                        value = value && value.instance), !value) {
                            var dataName = "$" + name + "Controller";
                            value = inheritType ? $element.inheritedData(dataName) : $element.data(dataName);
                        }
                        if (!value && !optional) throw $compileMinErr("ctreq", "Controller '{0}', required by directive '{1}', can't be found!", name, directiveName);
                    } else if (isArray(require)) {
                        value = [];
                        for (var i = 0, ii = require.length; ii > i; i++) value[i] = getControllers(directiveName, require[i], $element, elementControllers);
                    }
                    return value || null;
                }
                function setupControllers($element, attrs, transcludeFn, controllerDirectives, isolateScope, scope) {
                    var elementControllers = createMap();
                    for (var controllerKey in controllerDirectives) {
                        var directive = controllerDirectives[controllerKey], locals = {
                            $scope: directive === newIsolateScopeDirective || directive.$$isolateScope ? isolateScope : scope,
                            $element: $element,
                            $attrs: attrs,
                            $transclude: transcludeFn
                        }, controller = directive.controller;
                        "@" == controller && (controller = attrs[directive.name]);
                        var controllerInstance = $controller(controller, locals, !0, directive.controllerAs);
                        elementControllers[directive.name] = controllerInstance, hasElementTranscludeDirective || $element.data("$" + directive.name + "Controller", controllerInstance.instance);
                    }
                    return elementControllers;
                }
                function nodeLinkFn(childLinkFn, scope, linkNode, $rootElement, boundTranscludeFn, thisLinkFn) {
                    function controllersBoundTransclude(scope, cloneAttachFn, futureParentElement) {
                        var transcludeControllers;
                        return isScope(scope) || (futureParentElement = cloneAttachFn, cloneAttachFn = scope, 
                        scope = undefined), hasElementTranscludeDirective && (transcludeControllers = elementControllers), 
                        futureParentElement || (futureParentElement = hasElementTranscludeDirective ? $element.parent() : $element), 
                        boundTranscludeFn(scope, cloneAttachFn, transcludeControllers, futureParentElement, scopeToChild);
                    }
                    var i, ii, linkFn, controller, isolateScope, elementControllers, transcludeFn, $element, attrs;
                    if (compileNode === linkNode ? (attrs = templateAttrs, $element = templateAttrs.$$element) : ($element = jqLite(linkNode), 
                    attrs = new Attributes($element, templateAttrs)), newIsolateScopeDirective && (isolateScope = scope.$new(!0)), 
                    boundTranscludeFn && (transcludeFn = controllersBoundTransclude, transcludeFn.$$boundTransclude = boundTranscludeFn), 
                    controllerDirectives && (elementControllers = setupControllers($element, attrs, transcludeFn, controllerDirectives, isolateScope, scope)), 
                    newIsolateScopeDirective && (compile.$$addScopeInfo($element, isolateScope, !0, !(templateDirective && (templateDirective === newIsolateScopeDirective || templateDirective === newIsolateScopeDirective.$$originalDirective))), 
                    compile.$$addScopeClass($element, !0), isolateScope.$$isolateBindings = newIsolateScopeDirective.$$isolateBindings, 
                    initializeDirectiveBindings(scope, attrs, isolateScope, isolateScope.$$isolateBindings, newIsolateScopeDirective, isolateScope)), 
                    elementControllers) {
                        var bindings, controllerForBindings, scopeDirective = newIsolateScopeDirective || newScopeDirective;
                        scopeDirective && elementControllers[scopeDirective.name] && (bindings = scopeDirective.$$bindings.bindToController, 
                        controller = elementControllers[scopeDirective.name], controller && controller.identifier && bindings && (controllerForBindings = controller, 
                        thisLinkFn.$$destroyBindings = initializeDirectiveBindings(scope, attrs, controller.instance, bindings, scopeDirective)));
                        for (i in elementControllers) {
                            controller = elementControllers[i];
                            var controllerResult = controller();
                            controllerResult !== controller.instance && (controller.instance = controllerResult, 
                            $element.data("$" + i + "Controller", controllerResult), controller === controllerForBindings && (thisLinkFn.$$destroyBindings(), 
                            thisLinkFn.$$destroyBindings = initializeDirectiveBindings(scope, attrs, controllerResult, bindings, scopeDirective)));
                        }
                    }
                    for (i = 0, ii = preLinkFns.length; ii > i; i++) linkFn = preLinkFns[i], invokeLinkFn(linkFn, linkFn.isolateScope ? isolateScope : scope, $element, attrs, linkFn.require && getControllers(linkFn.directiveName, linkFn.require, $element, elementControllers), transcludeFn);
                    var scopeToChild = scope;
                    for (newIsolateScopeDirective && (newIsolateScopeDirective.template || null === newIsolateScopeDirective.templateUrl) && (scopeToChild = isolateScope), 
                    childLinkFn && childLinkFn(scopeToChild, linkNode.childNodes, undefined, boundTranscludeFn), 
                    i = postLinkFns.length - 1; i >= 0; i--) linkFn = postLinkFns[i], invokeLinkFn(linkFn, linkFn.isolateScope ? isolateScope : scope, $element, attrs, linkFn.require && getControllers(linkFn.directiveName, linkFn.require, $element, elementControllers), transcludeFn);
                }
                previousCompileContext = previousCompileContext || {};
                for (var directive, directiveName, $template, linkFn, directiveValue, terminalPriority = -Number.MAX_VALUE, newScopeDirective = previousCompileContext.newScopeDirective, controllerDirectives = previousCompileContext.controllerDirectives, newIsolateScopeDirective = previousCompileContext.newIsolateScopeDirective, templateDirective = previousCompileContext.templateDirective, nonTlbTranscludeDirective = previousCompileContext.nonTlbTranscludeDirective, hasTranscludeDirective = !1, hasTemplate = !1, hasElementTranscludeDirective = previousCompileContext.hasElementTranscludeDirective, $compileNode = templateAttrs.$$element = jqLite(compileNode), replaceDirective = originalReplaceDirective, childTranscludeFn = transcludeFn, i = 0, ii = directives.length; ii > i; i++) {
                    directive = directives[i];
                    var attrStart = directive.$$start, attrEnd = directive.$$end;
                    if (attrStart && ($compileNode = groupScan(compileNode, attrStart, attrEnd)), $template = undefined, 
                    terminalPriority > directive.priority) break;
                    if ((directiveValue = directive.scope) && (directive.templateUrl || (isObject(directiveValue) ? (assertNoDuplicate("new/isolated scope", newIsolateScopeDirective || newScopeDirective, directive, $compileNode), 
                    newIsolateScopeDirective = directive) : assertNoDuplicate("new/isolated scope", newIsolateScopeDirective, directive, $compileNode)), 
                    newScopeDirective = newScopeDirective || directive), directiveName = directive.name, 
                    !directive.templateUrl && directive.controller && (directiveValue = directive.controller, 
                    controllerDirectives = controllerDirectives || createMap(), assertNoDuplicate("'" + directiveName + "' controller", controllerDirectives[directiveName], directive, $compileNode), 
                    controllerDirectives[directiveName] = directive), (directiveValue = directive.transclude) && (hasTranscludeDirective = !0, 
                    directive.$$tlb || (assertNoDuplicate("transclusion", nonTlbTranscludeDirective, directive, $compileNode), 
                    nonTlbTranscludeDirective = directive), "element" == directiveValue ? (hasElementTranscludeDirective = !0, 
                    terminalPriority = directive.priority, $template = $compileNode, $compileNode = templateAttrs.$$element = jqLite(document.createComment(" " + directiveName + ": " + templateAttrs[directiveName] + " ")), 
                    compileNode = $compileNode[0], replaceWith(jqCollection, sliceArgs($template), compileNode), 
                    childTranscludeFn = compile($template, transcludeFn, terminalPriority, replaceDirective && replaceDirective.name, {
                        nonTlbTranscludeDirective: nonTlbTranscludeDirective
                    })) : ($template = jqLite(jqLiteClone(compileNode)).contents(), $compileNode.empty(), 
                    childTranscludeFn = compile($template, transcludeFn))), directive.template) if (hasTemplate = !0, 
                    assertNoDuplicate("template", templateDirective, directive, $compileNode), templateDirective = directive, 
                    directiveValue = isFunction(directive.template) ? directive.template($compileNode, templateAttrs) : directive.template, 
                    directiveValue = denormalizeTemplate(directiveValue), directive.replace) {
                        if (replaceDirective = directive, $template = jqLiteIsTextNode(directiveValue) ? [] : removeComments(wrapTemplate(directive.templateNamespace, trim(directiveValue))), 
                        compileNode = $template[0], 1 != $template.length || compileNode.nodeType !== NODE_TYPE_ELEMENT) throw $compileMinErr("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", directiveName, "");
                        replaceWith(jqCollection, $compileNode, compileNode);
                        var newTemplateAttrs = {
                            $attr: {}
                        }, templateDirectives = collectDirectives(compileNode, [], newTemplateAttrs), unprocessedDirectives = directives.splice(i + 1, directives.length - (i + 1));
                        newIsolateScopeDirective && markDirectivesAsIsolate(templateDirectives), directives = directives.concat(templateDirectives).concat(unprocessedDirectives), 
                        mergeTemplateAttributes(templateAttrs, newTemplateAttrs), ii = directives.length;
                    } else $compileNode.html(directiveValue);
                    if (directive.templateUrl) hasTemplate = !0, assertNoDuplicate("template", templateDirective, directive, $compileNode), 
                    templateDirective = directive, directive.replace && (replaceDirective = directive), 
                    nodeLinkFn = compileTemplateUrl(directives.splice(i, directives.length - i), $compileNode, templateAttrs, jqCollection, hasTranscludeDirective && childTranscludeFn, preLinkFns, postLinkFns, {
                        controllerDirectives: controllerDirectives,
                        newScopeDirective: newScopeDirective !== directive && newScopeDirective,
                        newIsolateScopeDirective: newIsolateScopeDirective,
                        templateDirective: templateDirective,
                        nonTlbTranscludeDirective: nonTlbTranscludeDirective
                    }), ii = directives.length; else if (directive.compile) try {
                        linkFn = directive.compile($compileNode, templateAttrs, childTranscludeFn), isFunction(linkFn) ? addLinkFns(null, linkFn, attrStart, attrEnd) : linkFn && addLinkFns(linkFn.pre, linkFn.post, attrStart, attrEnd);
                    } catch (e) {
                        $exceptionHandler(e, startingTag($compileNode));
                    }
                    directive.terminal && (nodeLinkFn.terminal = !0, terminalPriority = Math.max(terminalPriority, directive.priority));
                }
                return nodeLinkFn.scope = newScopeDirective && newScopeDirective.scope === !0, nodeLinkFn.transcludeOnThisElement = hasTranscludeDirective, 
                nodeLinkFn.templateOnThisElement = hasTemplate, nodeLinkFn.transclude = childTranscludeFn, 
                previousCompileContext.hasElementTranscludeDirective = hasElementTranscludeDirective, 
                nodeLinkFn;
            }
            function markDirectivesAsIsolate(directives) {
                for (var j = 0, jj = directives.length; jj > j; j++) directives[j] = inherit(directives[j], {
                    $$isolateScope: !0
                });
            }
            function addDirective(tDirectives, name, location, maxPriority, ignoreDirective, startAttrName, endAttrName) {
                if (name === ignoreDirective) return null;
                var match = null;
                if (hasDirectives.hasOwnProperty(name)) for (var directive, directives = $injector.get(name + Suffix), i = 0, ii = directives.length; ii > i; i++) try {
                    directive = directives[i], (isUndefined(maxPriority) || maxPriority > directive.priority) && -1 != directive.restrict.indexOf(location) && (startAttrName && (directive = inherit(directive, {
                        $$start: startAttrName,
                        $$end: endAttrName
                    })), tDirectives.push(directive), match = directive);
                } catch (e) {
                    $exceptionHandler(e);
                }
                return match;
            }
            function directiveIsMultiElement(name) {
                if (hasDirectives.hasOwnProperty(name)) for (var directive, directives = $injector.get(name + Suffix), i = 0, ii = directives.length; ii > i; i++) if (directive = directives[i], 
                directive.multiElement) return !0;
                return !1;
            }
            function mergeTemplateAttributes(dst, src) {
                var srcAttr = src.$attr, dstAttr = dst.$attr, $element = dst.$$element;
                forEach(dst, function(value, key) {
                    "$" != key.charAt(0) && (src[key] && src[key] !== value && (value += ("style" === key ? ";" : " ") + src[key]), 
                    dst.$set(key, value, !0, srcAttr[key]));
                }), forEach(src, function(value, key) {
                    "class" == key ? (safeAddClass($element, value), dst["class"] = (dst["class"] ? dst["class"] + " " : "") + value) : "style" == key ? ($element.attr("style", $element.attr("style") + ";" + value), 
                    dst.style = (dst.style ? dst.style + ";" : "") + value) : "$" == key.charAt(0) || dst.hasOwnProperty(key) || (dst[key] = value, 
                    dstAttr[key] = srcAttr[key]);
                });
            }
            function compileTemplateUrl(directives, $compileNode, tAttrs, $rootElement, childTranscludeFn, preLinkFns, postLinkFns, previousCompileContext) {
                var afterTemplateNodeLinkFn, afterTemplateChildLinkFn, linkQueue = [], beforeTemplateCompileNode = $compileNode[0], origAsyncDirective = directives.shift(), derivedSyncDirective = inherit(origAsyncDirective, {
                    templateUrl: null,
                    transclude: null,
                    replace: null,
                    $$originalDirective: origAsyncDirective
                }), templateUrl = isFunction(origAsyncDirective.templateUrl) ? origAsyncDirective.templateUrl($compileNode, tAttrs) : origAsyncDirective.templateUrl, templateNamespace = origAsyncDirective.templateNamespace;
                return $compileNode.empty(), $templateRequest(templateUrl).then(function(content) {
                    var compileNode, tempTemplateAttrs, $template, childBoundTranscludeFn;
                    if (content = denormalizeTemplate(content), origAsyncDirective.replace) {
                        if ($template = jqLiteIsTextNode(content) ? [] : removeComments(wrapTemplate(templateNamespace, trim(content))), 
                        compileNode = $template[0], 1 != $template.length || compileNode.nodeType !== NODE_TYPE_ELEMENT) throw $compileMinErr("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", origAsyncDirective.name, templateUrl);
                        tempTemplateAttrs = {
                            $attr: {}
                        }, replaceWith($rootElement, $compileNode, compileNode);
                        var templateDirectives = collectDirectives(compileNode, [], tempTemplateAttrs);
                        isObject(origAsyncDirective.scope) && markDirectivesAsIsolate(templateDirectives), 
                        directives = templateDirectives.concat(directives), mergeTemplateAttributes(tAttrs, tempTemplateAttrs);
                    } else compileNode = beforeTemplateCompileNode, $compileNode.html(content);
                    for (directives.unshift(derivedSyncDirective), afterTemplateNodeLinkFn = applyDirectivesToNode(directives, compileNode, tAttrs, childTranscludeFn, $compileNode, origAsyncDirective, preLinkFns, postLinkFns, previousCompileContext), 
                    forEach($rootElement, function(node, i) {
                        node == compileNode && ($rootElement[i] = $compileNode[0]);
                    }), afterTemplateChildLinkFn = compileNodes($compileNode[0].childNodes, childTranscludeFn); linkQueue.length; ) {
                        var scope = linkQueue.shift(), beforeTemplateLinkNode = linkQueue.shift(), linkRootElement = linkQueue.shift(), boundTranscludeFn = linkQueue.shift(), linkNode = $compileNode[0];
                        if (!scope.$$destroyed) {
                            if (beforeTemplateLinkNode !== beforeTemplateCompileNode) {
                                var oldClasses = beforeTemplateLinkNode.className;
                                previousCompileContext.hasElementTranscludeDirective && origAsyncDirective.replace || (linkNode = jqLiteClone(compileNode)), 
                                replaceWith(linkRootElement, jqLite(beforeTemplateLinkNode), linkNode), safeAddClass(jqLite(linkNode), oldClasses);
                            }
                            childBoundTranscludeFn = afterTemplateNodeLinkFn.transcludeOnThisElement ? createBoundTranscludeFn(scope, afterTemplateNodeLinkFn.transclude, boundTranscludeFn) : boundTranscludeFn, 
                            afterTemplateNodeLinkFn(afterTemplateChildLinkFn, scope, linkNode, $rootElement, childBoundTranscludeFn, afterTemplateNodeLinkFn);
                        }
                    }
                    linkQueue = null;
                }), function(ignoreChildLinkFn, scope, node, rootElement, boundTranscludeFn) {
                    var childBoundTranscludeFn = boundTranscludeFn;
                    scope.$$destroyed || (linkQueue ? linkQueue.push(scope, node, rootElement, childBoundTranscludeFn) : (afterTemplateNodeLinkFn.transcludeOnThisElement && (childBoundTranscludeFn = createBoundTranscludeFn(scope, afterTemplateNodeLinkFn.transclude, boundTranscludeFn)), 
                    afterTemplateNodeLinkFn(afterTemplateChildLinkFn, scope, node, rootElement, childBoundTranscludeFn, afterTemplateNodeLinkFn)));
                };
            }
            function byPriority(a, b) {
                var diff = b.priority - a.priority;
                return 0 !== diff ? diff : a.name !== b.name ? a.name < b.name ? -1 : 1 : a.index - b.index;
            }
            function assertNoDuplicate(what, previousDirective, directive, element) {
                function wrapModuleNameIfDefined(moduleName) {
                    return moduleName ? " (module: " + moduleName + ")" : "";
                }
                if (previousDirective) throw $compileMinErr("multidir", "Multiple directives [{0}{1}, {2}{3}] asking for {4} on: {5}", previousDirective.name, wrapModuleNameIfDefined(previousDirective.$$moduleName), directive.name, wrapModuleNameIfDefined(directive.$$moduleName), what, startingTag(element));
            }
            function addTextInterpolateDirective(directives, text) {
                var interpolateFn = $interpolate(text, !0);
                interpolateFn && directives.push({
                    priority: 0,
                    compile: function(templateNode) {
                        var templateNodeParent = templateNode.parent(), hasCompileParent = !!templateNodeParent.length;
                        return hasCompileParent && compile.$$addBindingClass(templateNodeParent), function(scope, node) {
                            var parent = node.parent();
                            hasCompileParent || compile.$$addBindingClass(parent), compile.$$addBindingInfo(parent, interpolateFn.expressions), 
                            scope.$watch(interpolateFn, function(value) {
                                node[0].nodeValue = value;
                            });
                        };
                    }
                });
            }
            function wrapTemplate(type, template) {
                switch (type = lowercase(type || "html")) {
                  case "svg":
                  case "math":
                    var wrapper = document.createElement("div");
                    return wrapper.innerHTML = "<" + type + ">" + template + "</" + type + ">", wrapper.childNodes[0].childNodes;

                  default:
                    return template;
                }
            }
            function getTrustedContext(node, attrNormalizedName) {
                if ("srcdoc" == attrNormalizedName) return $sce.HTML;
                var tag = nodeName_(node);
                return "xlinkHref" == attrNormalizedName || "form" == tag && "action" == attrNormalizedName || "img" != tag && ("src" == attrNormalizedName || "ngSrc" == attrNormalizedName) ? $sce.RESOURCE_URL : void 0;
            }
            function addAttrInterpolateDirective(node, directives, value, name, allOrNothing) {
                var trustedContext = getTrustedContext(node, name);
                allOrNothing = ALL_OR_NOTHING_ATTRS[name] || allOrNothing;
                var interpolateFn = $interpolate(value, !0, trustedContext, allOrNothing);
                if (interpolateFn) {
                    if ("multiple" === name && "select" === nodeName_(node)) throw $compileMinErr("selmulti", "Binding to the 'multiple' attribute is not supported. Element: {0}", startingTag(node));
                    directives.push({
                        priority: 100,
                        compile: function() {
                            return {
                                pre: function(scope, element, attr) {
                                    var $$observers = attr.$$observers || (attr.$$observers = {});
                                    if (EVENT_HANDLER_ATTR_REGEXP.test(name)) throw $compileMinErr("nodomevents", "Interpolations for HTML DOM event attributes are disallowed.  Please use the ng- versions (such as ng-click instead of onclick) instead.");
                                    var newValue = attr[name];
                                    newValue !== value && (interpolateFn = newValue && $interpolate(newValue, !0, trustedContext, allOrNothing), 
                                    value = newValue), interpolateFn && (attr[name] = interpolateFn(scope), ($$observers[name] || ($$observers[name] = [])).$$inter = !0, 
                                    (attr.$$observers && attr.$$observers[name].$$scope || scope).$watch(interpolateFn, function(newValue, oldValue) {
                                        "class" === name && newValue != oldValue ? attr.$updateClass(newValue, oldValue) : attr.$set(name, newValue);
                                    }));
                                }
                            };
                        }
                    });
                }
            }
            function replaceWith($rootElement, elementsToRemove, newNode) {
                var i, ii, firstElementToRemove = elementsToRemove[0], removeCount = elementsToRemove.length, parent = firstElementToRemove.parentNode;
                if ($rootElement) for (i = 0, ii = $rootElement.length; ii > i; i++) if ($rootElement[i] == firstElementToRemove) {
                    $rootElement[i++] = newNode;
                    for (var j = i, j2 = j + removeCount - 1, jj = $rootElement.length; jj > j; j++, 
                    j2++) jj > j2 ? $rootElement[j] = $rootElement[j2] : delete $rootElement[j];
                    $rootElement.length -= removeCount - 1, $rootElement.context === firstElementToRemove && ($rootElement.context = newNode);
                    break;
                }
                parent && parent.replaceChild(newNode, firstElementToRemove);
                var fragment = document.createDocumentFragment();
                fragment.appendChild(firstElementToRemove), jqLite.hasData(firstElementToRemove) && (jqLite(newNode).data(jqLite(firstElementToRemove).data()), 
                jQuery ? (skipDestroyOnNextJQueryCleanData = !0, jQuery.cleanData([ firstElementToRemove ])) : delete jqLite.cache[firstElementToRemove[jqLite.expando]]);
                for (var k = 1, kk = elementsToRemove.length; kk > k; k++) {
                    var element = elementsToRemove[k];
                    jqLite(element).remove(), fragment.appendChild(element), delete elementsToRemove[k];
                }
                elementsToRemove[0] = newNode, elementsToRemove.length = 1;
            }
            function cloneAndAnnotateFn(fn, annotation) {
                return extend(function() {
                    return fn.apply(null, arguments);
                }, fn, annotation);
            }
            function invokeLinkFn(linkFn, scope, $element, attrs, controllers, transcludeFn) {
                try {
                    linkFn(scope, $element, attrs, controllers, transcludeFn);
                } catch (e) {
                    $exceptionHandler(e, startingTag($element));
                }
            }
            function initializeDirectiveBindings(scope, attrs, destination, bindings, directive, newScope) {
                var onNewScopeDestroyed;
                forEach(bindings, function(definition, scopeName) {
                    var lastValue, parentGet, parentSet, compare, attrName = definition.attrName, optional = definition.optional, mode = definition.mode;
                    switch (mode) {
                      case "@":
                        optional || hasOwnProperty.call(attrs, attrName) || (destination[scopeName] = attrs[attrName] = void 0), 
                        attrs.$observe(attrName, function(value) {
                            isString(value) && (destination[scopeName] = value);
                        }), attrs.$$observers[attrName].$$scope = scope, isString(attrs[attrName]) && (destination[scopeName] = $interpolate(attrs[attrName])(scope));
                        break;

                      case "=":
                        if (!hasOwnProperty.call(attrs, attrName)) {
                            if (optional) break;
                            attrs[attrName] = void 0;
                        }
                        if (optional && !attrs[attrName]) break;
                        parentGet = $parse(attrs[attrName]), compare = parentGet.literal ? equals : function(a, b) {
                            return a === b || a !== a && b !== b;
                        }, parentSet = parentGet.assign || function() {
                            throw lastValue = destination[scopeName] = parentGet(scope), $compileMinErr("nonassign", "Expression '{0}' used with directive '{1}' is non-assignable!", attrs[attrName], directive.name);
                        }, lastValue = destination[scopeName] = parentGet(scope);
                        var parentValueWatch = function(parentValue) {
                            return compare(parentValue, destination[scopeName]) || (compare(parentValue, lastValue) ? parentSet(scope, parentValue = destination[scopeName]) : destination[scopeName] = parentValue), 
                            lastValue = parentValue;
                        };
                        parentValueWatch.$stateful = !0;
                        var unwatch;
                        unwatch = definition.collection ? scope.$watchCollection(attrs[attrName], parentValueWatch) : scope.$watch($parse(attrs[attrName], parentValueWatch), null, parentGet.literal), 
                        onNewScopeDestroyed = onNewScopeDestroyed || [], onNewScopeDestroyed.push(unwatch);
                        break;

                      case "&":
                        if (parentGet = attrs.hasOwnProperty(attrName) ? $parse(attrs[attrName]) : noop, 
                        parentGet === noop && optional) break;
                        destination[scopeName] = function(locals) {
                            return parentGet(scope, locals);
                        };
                    }
                });
                var destroyBindings = onNewScopeDestroyed ? function() {
                    for (var i = 0, ii = onNewScopeDestroyed.length; ii > i; ++i) onNewScopeDestroyed[i]();
                } : noop;
                return newScope && destroyBindings !== noop ? (newScope.$on("$destroy", destroyBindings), 
                noop) : destroyBindings;
            }
            var Attributes = function(element, attributesToCopy) {
                if (attributesToCopy) {
                    var i, l, key, keys = Object.keys(attributesToCopy);
                    for (i = 0, l = keys.length; l > i; i++) key = keys[i], this[key] = attributesToCopy[key];
                } else this.$attr = {};
                this.$$element = element;
            };
            Attributes.prototype = {
                $normalize: directiveNormalize,
                $addClass: function(classVal) {
                    classVal && classVal.length > 0 && $animate.addClass(this.$$element, classVal);
                },
                $removeClass: function(classVal) {
                    classVal && classVal.length > 0 && $animate.removeClass(this.$$element, classVal);
                },
                $updateClass: function(newClasses, oldClasses) {
                    var toAdd = tokenDifference(newClasses, oldClasses);
                    toAdd && toAdd.length && $animate.addClass(this.$$element, toAdd);
                    var toRemove = tokenDifference(oldClasses, newClasses);
                    toRemove && toRemove.length && $animate.removeClass(this.$$element, toRemove);
                },
                $set: function(key, value, writeAttr, attrName) {
                    var nodeName, node = this.$$element[0], booleanKey = getBooleanAttrName(node, key), aliasedKey = getAliasedAttrName(key), observer = key;
                    if (booleanKey ? (this.$$element.prop(key, value), attrName = booleanKey) : aliasedKey && (this[aliasedKey] = value, 
                    observer = aliasedKey), this[key] = value, attrName ? this.$attr[key] = attrName : (attrName = this.$attr[key], 
                    attrName || (this.$attr[key] = attrName = snake_case(key, "-"))), nodeName = nodeName_(this.$$element), 
                    "a" === nodeName && "href" === key || "img" === nodeName && "src" === key) this[key] = value = $$sanitizeUri(value, "src" === key); else if ("img" === nodeName && "srcset" === key) {
                        for (var result = "", trimmedSrcset = trim(value), srcPattern = /(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/, pattern = /\s/.test(trimmedSrcset) ? srcPattern : /(,)/, rawUris = trimmedSrcset.split(pattern), nbrUrisWith2parts = Math.floor(rawUris.length / 2), i = 0; nbrUrisWith2parts > i; i++) {
                            var innerIdx = 2 * i;
                            result += $$sanitizeUri(trim(rawUris[innerIdx]), !0), result += " " + trim(rawUris[innerIdx + 1]);
                        }
                        var lastTuple = trim(rawUris[2 * i]).split(/\s/);
                        result += $$sanitizeUri(trim(lastTuple[0]), !0), 2 === lastTuple.length && (result += " " + trim(lastTuple[1])), 
                        this[key] = value = result;
                    }
                    writeAttr !== !1 && (null === value || isUndefined(value) ? this.$$element.removeAttr(attrName) : this.$$element.attr(attrName, value));
                    var $$observers = this.$$observers;
                    $$observers && forEach($$observers[observer], function(fn) {
                        try {
                            fn(value);
                        } catch (e) {
                            $exceptionHandler(e);
                        }
                    });
                },
                $observe: function(key, fn) {
                    var attrs = this, $$observers = attrs.$$observers || (attrs.$$observers = createMap()), listeners = $$observers[key] || ($$observers[key] = []);
                    return listeners.push(fn), $rootScope.$evalAsync(function() {
                        listeners.$$inter || !attrs.hasOwnProperty(key) || isUndefined(attrs[key]) || fn(attrs[key]);
                    }), function() {
                        arrayRemove(listeners, fn);
                    };
                }
            };
            var startSymbol = $interpolate.startSymbol(), endSymbol = $interpolate.endSymbol(), denormalizeTemplate = "{{" == startSymbol || "}}" == endSymbol ? identity : function(template) {
                return template.replace(/\{\{/g, startSymbol).replace(/}}/g, endSymbol);
            }, NG_ATTR_BINDING = /^ngAttr[A-Z]/;
            return compile.$$addBindingInfo = debugInfoEnabled ? function($element, binding) {
                var bindings = $element.data("$binding") || [];
                isArray(binding) ? bindings = bindings.concat(binding) : bindings.push(binding), 
                $element.data("$binding", bindings);
            } : noop, compile.$$addBindingClass = debugInfoEnabled ? function($element) {
                safeAddClass($element, "ng-binding");
            } : noop, compile.$$addScopeInfo = debugInfoEnabled ? function($element, scope, isolated, noTemplate) {
                var dataName = isolated ? noTemplate ? "$isolateScopeNoTemplate" : "$isolateScope" : "$scope";
                $element.data(dataName, scope);
            } : noop, compile.$$addScopeClass = debugInfoEnabled ? function($element, isolated) {
                safeAddClass($element, isolated ? "ng-isolate-scope" : "ng-scope");
            } : noop, compile;
        } ];
    }
    function directiveNormalize(name) {
        return camelCase(name.replace(PREFIX_REGEXP, ""));
    }
    function tokenDifference(str1, str2) {
        var values = "", tokens1 = str1.split(/\s+/), tokens2 = str2.split(/\s+/);
        outer: for (var i = 0; i < tokens1.length; i++) {
            for (var token = tokens1[i], j = 0; j < tokens2.length; j++) if (token == tokens2[j]) continue outer;
            values += (values.length > 0 ? " " : "") + token;
        }
        return values;
    }
    function removeComments(jqNodes) {
        jqNodes = jqLite(jqNodes);
        var i = jqNodes.length;
        if (1 >= i) return jqNodes;
        for (;i--; ) {
            var node = jqNodes[i];
            node.nodeType === NODE_TYPE_COMMENT && splice.call(jqNodes, i, 1);
        }
        return jqNodes;
    }
    function identifierForController(controller, ident) {
        if (ident && isString(ident)) return ident;
        if (isString(controller)) {
            var match = CNTRL_REG.exec(controller);
            if (match) return match[3];
        }
    }
    function $ControllerProvider() {
        var controllers = {}, globals = !1;
        this.register = function(name, constructor) {
            assertNotHasOwnProperty(name, "controller"), isObject(name) ? extend(controllers, name) : controllers[name] = constructor;
        }, this.allowGlobals = function() {
            globals = !0;
        }, this.$get = [ "$injector", "$window", function($injector, $window) {
            function addIdentifier(locals, identifier, instance, name) {
                if (!locals || !isObject(locals.$scope)) throw minErr("$controller")("noscp", "Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.", name, identifier);
                locals.$scope[identifier] = instance;
            }
            return function(expression, locals, later, ident) {
                var instance, match, constructor, identifier;
                if (later = later === !0, ident && isString(ident) && (identifier = ident), isString(expression)) {
                    if (match = expression.match(CNTRL_REG), !match) throw $controllerMinErr("ctrlfmt", "Badly formed controller string '{0}'. Must match `__name__ as __id__` or `__name__`.", expression);
                    constructor = match[1], identifier = identifier || match[3], expression = controllers.hasOwnProperty(constructor) ? controllers[constructor] : getter(locals.$scope, constructor, !0) || (globals ? getter($window, constructor, !0) : undefined), 
                    assertArgFn(expression, constructor, !0);
                }
                if (later) {
                    var controllerPrototype = (isArray(expression) ? expression[expression.length - 1] : expression).prototype;
                    instance = Object.create(controllerPrototype || null), identifier && addIdentifier(locals, identifier, instance, constructor || expression.name);
                    var instantiate;
                    return instantiate = extend(function() {
                        var result = $injector.invoke(expression, instance, locals, constructor);
                        return result !== instance && (isObject(result) || isFunction(result)) && (instance = result, 
                        identifier && addIdentifier(locals, identifier, instance, constructor || expression.name)), 
                        instance;
                    }, {
                        instance: instance,
                        identifier: identifier
                    });
                }
                return instance = $injector.instantiate(expression, locals, constructor), identifier && addIdentifier(locals, identifier, instance, constructor || expression.name), 
                instance;
            };
        } ];
    }
    function $DocumentProvider() {
        this.$get = [ "$window", function(window) {
            return jqLite(window.document);
        } ];
    }
    function $ExceptionHandlerProvider() {
        this.$get = [ "$log", function($log) {
            return function(exception, cause) {
                $log.error.apply($log, arguments);
            };
        } ];
    }
    function serializeValue(v) {
        return isObject(v) ? isDate(v) ? v.toISOString() : toJson(v) : v;
    }
    function $HttpParamSerializerProvider() {
        this.$get = function() {
            return function(params) {
                if (!params) return "";
                var parts = [];
                return forEachSorted(params, function(value, key) {
                    null === value || isUndefined(value) || (isArray(value) ? forEach(value, function(v, k) {
                        parts.push(encodeUriQuery(key) + "=" + encodeUriQuery(serializeValue(v)));
                    }) : parts.push(encodeUriQuery(key) + "=" + encodeUriQuery(serializeValue(value))));
                }), parts.join("&");
            };
        };
    }
    function $HttpParamSerializerJQLikeProvider() {
        this.$get = function() {
            return function(params) {
                function serialize(toSerialize, prefix, topLevel) {
                    null === toSerialize || isUndefined(toSerialize) || (isArray(toSerialize) ? forEach(toSerialize, function(value, index) {
                        serialize(value, prefix + "[" + (isObject(value) ? index : "") + "]");
                    }) : isObject(toSerialize) && !isDate(toSerialize) ? forEachSorted(toSerialize, function(value, key) {
                        serialize(value, prefix + (topLevel ? "" : "[") + key + (topLevel ? "" : "]"));
                    }) : parts.push(encodeUriQuery(prefix) + "=" + encodeUriQuery(serializeValue(toSerialize))));
                }
                if (!params) return "";
                var parts = [];
                return serialize(params, "", !0), parts.join("&");
            };
        };
    }
    function defaultHttpResponseTransform(data, headers) {
        if (isString(data)) {
            var tempData = data.replace(JSON_PROTECTION_PREFIX, "").trim();
            if (tempData) {
                var contentType = headers("Content-Type");
                (contentType && 0 === contentType.indexOf(APPLICATION_JSON) || isJsonLike(tempData)) && (data = fromJson(tempData));
            }
        }
        return data;
    }
    function isJsonLike(str) {
        var jsonStart = str.match(JSON_START);
        return jsonStart && JSON_ENDS[jsonStart[0]].test(str);
    }
    function parseHeaders(headers) {
        function fillInParsed(key, val) {
            key && (parsed[key] = parsed[key] ? parsed[key] + ", " + val : val);
        }
        var i, parsed = createMap();
        return isString(headers) ? forEach(headers.split("\n"), function(line) {
            i = line.indexOf(":"), fillInParsed(lowercase(trim(line.substr(0, i))), trim(line.substr(i + 1)));
        }) : isObject(headers) && forEach(headers, function(headerVal, headerKey) {
            fillInParsed(lowercase(headerKey), trim(headerVal));
        }), parsed;
    }
    function headersGetter(headers) {
        var headersObj;
        return function(name) {
            if (headersObj || (headersObj = parseHeaders(headers)), name) {
                var value = headersObj[lowercase(name)];
                return void 0 === value && (value = null), value;
            }
            return headersObj;
        };
    }
    function transformData(data, headers, status, fns) {
        return isFunction(fns) ? fns(data, headers, status) : (forEach(fns, function(fn) {
            data = fn(data, headers, status);
        }), data);
    }
    function isSuccess(status) {
        return status >= 200 && 300 > status;
    }
    function $HttpProvider() {
        var defaults = this.defaults = {
            transformResponse: [ defaultHttpResponseTransform ],
            transformRequest: [ function(d) {
                return !isObject(d) || isFile(d) || isBlob(d) || isFormData(d) ? d : toJson(d);
            } ],
            headers: {
                common: {
                    Accept: "application/json, text/plain, */*"
                },
                post: shallowCopy(CONTENT_TYPE_APPLICATION_JSON),
                put: shallowCopy(CONTENT_TYPE_APPLICATION_JSON),
                patch: shallowCopy(CONTENT_TYPE_APPLICATION_JSON)
            },
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN",
            paramSerializer: "$httpParamSerializer"
        }, useApplyAsync = !1;
        this.useApplyAsync = function(value) {
            return isDefined(value) ? (useApplyAsync = !!value, this) : useApplyAsync;
        };
        var useLegacyPromise = !0;
        this.useLegacyPromiseExtensions = function(value) {
            return isDefined(value) ? (useLegacyPromise = !!value, this) : useLegacyPromise;
        };
        var interceptorFactories = this.interceptors = [];
        this.$get = [ "$httpBackend", "$$cookieReader", "$cacheFactory", "$rootScope", "$q", "$injector", function($httpBackend, $$cookieReader, $cacheFactory, $rootScope, $q, $injector) {
            function $http(requestConfig) {
                function transformResponse(response) {
                    var resp = extend({}, response);
                    return response.data ? resp.data = transformData(response.data, response.headers, response.status, config.transformResponse) : resp.data = response.data, 
                    isSuccess(response.status) ? resp : $q.reject(resp);
                }
                function executeHeaderFns(headers, config) {
                    var headerContent, processedHeaders = {};
                    return forEach(headers, function(headerFn, header) {
                        isFunction(headerFn) ? (headerContent = headerFn(config), null != headerContent && (processedHeaders[header] = headerContent)) : processedHeaders[header] = headerFn;
                    }), processedHeaders;
                }
                function mergeHeaders(config) {
                    var defHeaderName, lowercaseDefHeaderName, reqHeaderName, defHeaders = defaults.headers, reqHeaders = extend({}, config.headers);
                    defHeaders = extend({}, defHeaders.common, defHeaders[lowercase(config.method)]);
                    defaultHeadersIteration: for (defHeaderName in defHeaders) {
                        lowercaseDefHeaderName = lowercase(defHeaderName);
                        for (reqHeaderName in reqHeaders) if (lowercase(reqHeaderName) === lowercaseDefHeaderName) continue defaultHeadersIteration;
                        reqHeaders[defHeaderName] = defHeaders[defHeaderName];
                    }
                    return executeHeaderFns(reqHeaders, shallowCopy(config));
                }
                if (!angular.isObject(requestConfig)) throw minErr("$http")("badreq", "Http request configuration must be an object.  Received: {0}", requestConfig);
                var config = extend({
                    method: "get",
                    transformRequest: defaults.transformRequest,
                    transformResponse: defaults.transformResponse,
                    paramSerializer: defaults.paramSerializer
                }, requestConfig);
                config.headers = mergeHeaders(requestConfig), config.method = uppercase(config.method), 
                config.paramSerializer = isString(config.paramSerializer) ? $injector.get(config.paramSerializer) : config.paramSerializer;
                var serverRequest = function(config) {
                    var headers = config.headers, reqData = transformData(config.data, headersGetter(headers), undefined, config.transformRequest);
                    return isUndefined(reqData) && forEach(headers, function(value, header) {
                        "content-type" === lowercase(header) && delete headers[header];
                    }), isUndefined(config.withCredentials) && !isUndefined(defaults.withCredentials) && (config.withCredentials = defaults.withCredentials), 
                    sendReq(config, reqData).then(transformResponse, transformResponse);
                }, chain = [ serverRequest, undefined ], promise = $q.when(config);
                for (forEach(reversedInterceptors, function(interceptor) {
                    (interceptor.request || interceptor.requestError) && chain.unshift(interceptor.request, interceptor.requestError), 
                    (interceptor.response || interceptor.responseError) && chain.push(interceptor.response, interceptor.responseError);
                }); chain.length; ) {
                    var thenFn = chain.shift(), rejectFn = chain.shift();
                    promise = promise.then(thenFn, rejectFn);
                }
                return useLegacyPromise ? (promise.success = function(fn) {
                    return assertArgFn(fn, "fn"), promise.then(function(response) {
                        fn(response.data, response.status, response.headers, config);
                    }), promise;
                }, promise.error = function(fn) {
                    return assertArgFn(fn, "fn"), promise.then(null, function(response) {
                        fn(response.data, response.status, response.headers, config);
                    }), promise;
                }) : (promise.success = $httpMinErrLegacyFn("success"), promise.error = $httpMinErrLegacyFn("error")), 
                promise;
            }
            function createShortMethods(names) {
                forEach(arguments, function(name) {
                    $http[name] = function(url, config) {
                        return $http(extend({}, config || {}, {
                            method: name,
                            url: url
                        }));
                    };
                });
            }
            function createShortMethodsWithData(name) {
                forEach(arguments, function(name) {
                    $http[name] = function(url, data, config) {
                        return $http(extend({}, config || {}, {
                            method: name,
                            url: url,
                            data: data
                        }));
                    };
                });
            }
            function sendReq(config, reqData) {
                function done(status, response, headersString, statusText) {
                    function resolveHttpPromise() {
                        resolvePromise(response, status, headersString, statusText);
                    }
                    cache && (isSuccess(status) ? cache.put(url, [ status, response, parseHeaders(headersString), statusText ]) : cache.remove(url)), 
                    useApplyAsync ? $rootScope.$applyAsync(resolveHttpPromise) : (resolveHttpPromise(), 
                    $rootScope.$$phase || $rootScope.$apply());
                }
                function resolvePromise(response, status, headers, statusText) {
                    status = status >= -1 ? status : 0, (isSuccess(status) ? deferred.resolve : deferred.reject)({
                        data: response,
                        status: status,
                        headers: headersGetter(headers),
                        config: config,
                        statusText: statusText
                    });
                }
                function resolvePromiseWithResult(result) {
                    resolvePromise(result.data, result.status, shallowCopy(result.headers()), result.statusText);
                }
                function removePendingReq() {
                    var idx = $http.pendingRequests.indexOf(config);
                    -1 !== idx && $http.pendingRequests.splice(idx, 1);
                }
                var cache, cachedResp, deferred = $q.defer(), promise = deferred.promise, reqHeaders = config.headers, url = buildUrl(config.url, config.paramSerializer(config.params));
                if ($http.pendingRequests.push(config), promise.then(removePendingReq, removePendingReq), 
                !config.cache && !defaults.cache || config.cache === !1 || "GET" !== config.method && "JSONP" !== config.method || (cache = isObject(config.cache) ? config.cache : isObject(defaults.cache) ? defaults.cache : defaultCache), 
                cache && (cachedResp = cache.get(url), isDefined(cachedResp) ? isPromiseLike(cachedResp) ? cachedResp.then(resolvePromiseWithResult, resolvePromiseWithResult) : isArray(cachedResp) ? resolvePromise(cachedResp[1], cachedResp[0], shallowCopy(cachedResp[2]), cachedResp[3]) : resolvePromise(cachedResp, 200, {}, "OK") : cache.put(url, promise)), 
                isUndefined(cachedResp)) {
                    var xsrfValue = urlIsSameOrigin(config.url) ? $$cookieReader()[config.xsrfCookieName || defaults.xsrfCookieName] : undefined;
                    xsrfValue && (reqHeaders[config.xsrfHeaderName || defaults.xsrfHeaderName] = xsrfValue), 
                    $httpBackend(config.method, url, reqData, done, reqHeaders, config.timeout, config.withCredentials, config.responseType);
                }
                return promise;
            }
            function buildUrl(url, serializedParams) {
                return serializedParams.length > 0 && (url += (-1 == url.indexOf("?") ? "?" : "&") + serializedParams), 
                url;
            }
            var defaultCache = $cacheFactory("$http");
            defaults.paramSerializer = isString(defaults.paramSerializer) ? $injector.get(defaults.paramSerializer) : defaults.paramSerializer;
            var reversedInterceptors = [];
            return forEach(interceptorFactories, function(interceptorFactory) {
                reversedInterceptors.unshift(isString(interceptorFactory) ? $injector.get(interceptorFactory) : $injector.invoke(interceptorFactory));
            }), $http.pendingRequests = [], createShortMethods("get", "delete", "head", "jsonp"), 
            createShortMethodsWithData("post", "put", "patch"), $http.defaults = defaults, $http;
        } ];
    }
    function createXhr() {
        return new window.XMLHttpRequest();
    }
    function $HttpBackendProvider() {
        this.$get = [ "$browser", "$window", "$document", function($browser, $window, $document) {
            return createHttpBackend($browser, createXhr, $browser.defer, $window.angular.callbacks, $document[0]);
        } ];
    }
    function createHttpBackend($browser, createXhr, $browserDefer, callbacks, rawDocument) {
        function jsonpReq(url, callbackId, done) {
            var script = rawDocument.createElement("script"), callback = null;
            return script.type = "text/javascript", script.src = url, script.async = !0, callback = function(event) {
                removeEventListenerFn(script, "load", callback), removeEventListenerFn(script, "error", callback), 
                rawDocument.body.removeChild(script), script = null;
                var status = -1, text = "unknown";
                event && ("load" !== event.type || callbacks[callbackId].called || (event = {
                    type: "error"
                }), text = event.type, status = "error" === event.type ? 404 : 200), done && done(status, text);
            }, addEventListenerFn(script, "load", callback), addEventListenerFn(script, "error", callback), 
            rawDocument.body.appendChild(script), callback;
        }
        return function(method, url, post, callback, headers, timeout, withCredentials, responseType) {
            function timeoutRequest() {
                jsonpDone && jsonpDone(), xhr && xhr.abort();
            }
            function completeRequest(callback, status, response, headersString, statusText) {
                isDefined(timeoutId) && $browserDefer.cancel(timeoutId), jsonpDone = xhr = null, 
                callback(status, response, headersString, statusText), $browser.$$completeOutstandingRequest(noop);
            }
            if ($browser.$$incOutstandingRequestCount(), url = url || $browser.url(), "jsonp" == lowercase(method)) {
                var callbackId = "_" + (callbacks.counter++).toString(36);
                callbacks[callbackId] = function(data) {
                    callbacks[callbackId].data = data, callbacks[callbackId].called = !0;
                };
                var jsonpDone = jsonpReq(url.replace("JSON_CALLBACK", "angular.callbacks." + callbackId), callbackId, function(status, text) {
                    completeRequest(callback, status, callbacks[callbackId].data, "", text), callbacks[callbackId] = noop;
                });
            } else {
                var xhr = createXhr();
                xhr.open(method, url, !0), forEach(headers, function(value, key) {
                    isDefined(value) && xhr.setRequestHeader(key, value);
                }), xhr.onload = function() {
                    var statusText = xhr.statusText || "", response = "response" in xhr ? xhr.response : xhr.responseText, status = 1223 === xhr.status ? 204 : xhr.status;
                    0 === status && (status = response ? 200 : "file" == urlResolve(url).protocol ? 404 : 0), 
                    completeRequest(callback, status, response, xhr.getAllResponseHeaders(), statusText);
                };
                var requestError = function() {
                    completeRequest(callback, -1, null, null, "");
                };
                if (xhr.onerror = requestError, xhr.onabort = requestError, withCredentials && (xhr.withCredentials = !0), 
                responseType) try {
                    xhr.responseType = responseType;
                } catch (e) {
                    if ("json" !== responseType) throw e;
                }
                xhr.send(isUndefined(post) ? null : post);
            }
            if (timeout > 0) var timeoutId = $browserDefer(timeoutRequest, timeout); else isPromiseLike(timeout) && timeout.then(timeoutRequest);
        };
    }
    function $InterpolateProvider() {
        var startSymbol = "{{", endSymbol = "}}";
        this.startSymbol = function(value) {
            return value ? (startSymbol = value, this) : startSymbol;
        }, this.endSymbol = function(value) {
            return value ? (endSymbol = value, this) : endSymbol;
        }, this.$get = [ "$parse", "$exceptionHandler", "$sce", function($parse, $exceptionHandler, $sce) {
            function escape(ch) {
                return "\\\\\\" + ch;
            }
            function unescapeText(text) {
                return text.replace(escapedStartRegexp, startSymbol).replace(escapedEndRegexp, endSymbol);
            }
            function stringify(value) {
                if (null == value) return "";
                switch (typeof value) {
                  case "string":
                    break;

                  case "number":
                    value = "" + value;
                    break;

                  default:
                    value = toJson(value);
                }
                return value;
            }
            function $interpolate(text, mustHaveExpression, trustedContext, allOrNothing) {
                function parseStringifyInterceptor(value) {
                    try {
                        return value = getValue(value), allOrNothing && !isDefined(value) ? value : stringify(value);
                    } catch (err) {
                        $exceptionHandler($interpolateMinErr.interr(text, err));
                    }
                }
                allOrNothing = !!allOrNothing;
                for (var startIndex, endIndex, exp, index = 0, expressions = [], parseFns = [], textLength = text.length, concat = [], expressionPositions = []; textLength > index; ) {
                    if (-1 == (startIndex = text.indexOf(startSymbol, index)) || -1 == (endIndex = text.indexOf(endSymbol, startIndex + startSymbolLength))) {
                        index !== textLength && concat.push(unescapeText(text.substring(index)));
                        break;
                    }
                    index !== startIndex && concat.push(unescapeText(text.substring(index, startIndex))), 
                    exp = text.substring(startIndex + startSymbolLength, endIndex), expressions.push(exp), 
                    parseFns.push($parse(exp, parseStringifyInterceptor)), index = endIndex + endSymbolLength, 
                    expressionPositions.push(concat.length), concat.push("");
                }
                if (trustedContext && concat.length > 1 && $interpolateMinErr.throwNoconcat(text), 
                !mustHaveExpression || expressions.length) {
                    var compute = function(values) {
                        for (var i = 0, ii = expressions.length; ii > i; i++) {
                            if (allOrNothing && isUndefined(values[i])) return;
                            concat[expressionPositions[i]] = values[i];
                        }
                        return concat.join("");
                    }, getValue = function(value) {
                        return trustedContext ? $sce.getTrusted(trustedContext, value) : $sce.valueOf(value);
                    };
                    return extend(function(context) {
                        var i = 0, ii = expressions.length, values = new Array(ii);
                        try {
                            for (;ii > i; i++) values[i] = parseFns[i](context);
                            return compute(values);
                        } catch (err) {
                            $exceptionHandler($interpolateMinErr.interr(text, err));
                        }
                    }, {
                        exp: text,
                        expressions: expressions,
                        $$watchDelegate: function(scope, listener) {
                            var lastValue;
                            return scope.$watchGroup(parseFns, function(values, oldValues) {
                                var currValue = compute(values);
                                isFunction(listener) && listener.call(this, currValue, values !== oldValues ? lastValue : currValue, scope), 
                                lastValue = currValue;
                            });
                        }
                    });
                }
            }
            var startSymbolLength = startSymbol.length, endSymbolLength = endSymbol.length, escapedStartRegexp = new RegExp(startSymbol.replace(/./g, escape), "g"), escapedEndRegexp = new RegExp(endSymbol.replace(/./g, escape), "g");
            return $interpolate.startSymbol = function() {
                return startSymbol;
            }, $interpolate.endSymbol = function() {
                return endSymbol;
            }, $interpolate;
        } ];
    }
    function $IntervalProvider() {
        this.$get = [ "$rootScope", "$window", "$q", "$$q", function($rootScope, $window, $q, $$q) {
            function interval(fn, delay, count, invokeApply) {
                var hasParams = arguments.length > 4, args = hasParams ? sliceArgs(arguments, 4) : [], setInterval = $window.setInterval, clearInterval = $window.clearInterval, iteration = 0, skipApply = isDefined(invokeApply) && !invokeApply, deferred = (skipApply ? $$q : $q).defer(), promise = deferred.promise;
                return count = isDefined(count) ? count : 0, promise.then(null, null, hasParams ? function() {
                    fn.apply(null, args);
                } : fn), promise.$$intervalId = setInterval(function() {
                    deferred.notify(iteration++), count > 0 && iteration >= count && (deferred.resolve(iteration), 
                    clearInterval(promise.$$intervalId), delete intervals[promise.$$intervalId]), skipApply || $rootScope.$apply();
                }, delay), intervals[promise.$$intervalId] = deferred, promise;
            }
            var intervals = {};
            return interval.cancel = function(promise) {
                return promise && promise.$$intervalId in intervals ? (intervals[promise.$$intervalId].reject("canceled"), 
                $window.clearInterval(promise.$$intervalId), delete intervals[promise.$$intervalId], 
                !0) : !1;
            }, interval;
        } ];
    }
    function encodePath(path) {
        for (var segments = path.split("/"), i = segments.length; i--; ) segments[i] = encodeUriSegment(segments[i]);
        return segments.join("/");
    }
    function parseAbsoluteUrl(absoluteUrl, locationObj) {
        var parsedUrl = urlResolve(absoluteUrl);
        locationObj.$$protocol = parsedUrl.protocol, locationObj.$$host = parsedUrl.hostname, 
        locationObj.$$port = toInt(parsedUrl.port) || DEFAULT_PORTS[parsedUrl.protocol] || null;
    }
    function parseAppUrl(relativeUrl, locationObj) {
        var prefixed = "/" !== relativeUrl.charAt(0);
        prefixed && (relativeUrl = "/" + relativeUrl);
        var match = urlResolve(relativeUrl);
        locationObj.$$path = decodeURIComponent(prefixed && "/" === match.pathname.charAt(0) ? match.pathname.substring(1) : match.pathname), 
        locationObj.$$search = parseKeyValue(match.search), locationObj.$$hash = decodeURIComponent(match.hash), 
        locationObj.$$path && "/" != locationObj.$$path.charAt(0) && (locationObj.$$path = "/" + locationObj.$$path);
    }
    function beginsWith(begin, whole) {
        return 0 === whole.indexOf(begin) ? whole.substr(begin.length) : void 0;
    }
    function stripHash(url) {
        var index = url.indexOf("#");
        return -1 == index ? url : url.substr(0, index);
    }
    function trimEmptyHash(url) {
        return url.replace(/(#.+)|#$/, "$1");
    }
    function stripFile(url) {
        return url.substr(0, stripHash(url).lastIndexOf("/") + 1);
    }
    function serverBase(url) {
        return url.substring(0, url.indexOf("/", url.indexOf("//") + 2));
    }
    function LocationHtml5Url(appBase, appBaseNoFile, basePrefix) {
        this.$$html5 = !0, basePrefix = basePrefix || "", parseAbsoluteUrl(appBase, this), 
        this.$$parse = function(url) {
            var pathUrl = beginsWith(appBaseNoFile, url);
            if (!isString(pathUrl)) throw $locationMinErr("ipthprfx", 'Invalid url "{0}", missing path prefix "{1}".', url, appBaseNoFile);
            parseAppUrl(pathUrl, this), this.$$path || (this.$$path = "/"), this.$$compose();
        }, this.$$compose = function() {
            var search = toKeyValue(this.$$search), hash = this.$$hash ? "#" + encodeUriSegment(this.$$hash) : "";
            this.$$url = encodePath(this.$$path) + (search ? "?" + search : "") + hash, this.$$absUrl = appBaseNoFile + this.$$url.substr(1);
        }, this.$$parseLinkUrl = function(url, relHref) {
            if (relHref && "#" === relHref[0]) return this.hash(relHref.slice(1)), !0;
            var appUrl, prevAppUrl, rewrittenUrl;
            return isDefined(appUrl = beginsWith(appBase, url)) ? (prevAppUrl = appUrl, rewrittenUrl = isDefined(appUrl = beginsWith(basePrefix, appUrl)) ? appBaseNoFile + (beginsWith("/", appUrl) || appUrl) : appBase + prevAppUrl) : isDefined(appUrl = beginsWith(appBaseNoFile, url)) ? rewrittenUrl = appBaseNoFile + appUrl : appBaseNoFile == url + "/" && (rewrittenUrl = appBaseNoFile), 
            rewrittenUrl && this.$$parse(rewrittenUrl), !!rewrittenUrl;
        };
    }
    function LocationHashbangUrl(appBase, appBaseNoFile, hashPrefix) {
        parseAbsoluteUrl(appBase, this), this.$$parse = function(url) {
            function removeWindowsDriveName(path, url, base) {
                var firstPathSegmentMatch, windowsFilePathExp = /^\/[A-Z]:(\/.*)/;
                return 0 === url.indexOf(base) && (url = url.replace(base, "")), windowsFilePathExp.exec(url) ? path : (firstPathSegmentMatch = windowsFilePathExp.exec(path), 
                firstPathSegmentMatch ? firstPathSegmentMatch[1] : path);
            }
            var withoutHashUrl, withoutBaseUrl = beginsWith(appBase, url) || beginsWith(appBaseNoFile, url);
            isUndefined(withoutBaseUrl) || "#" !== withoutBaseUrl.charAt(0) ? this.$$html5 ? withoutHashUrl = withoutBaseUrl : (withoutHashUrl = "", 
            isUndefined(withoutBaseUrl) && (appBase = url, this.replace())) : (withoutHashUrl = beginsWith(hashPrefix, withoutBaseUrl), 
            isUndefined(withoutHashUrl) && (withoutHashUrl = withoutBaseUrl)), parseAppUrl(withoutHashUrl, this), 
            this.$$path = removeWindowsDriveName(this.$$path, withoutHashUrl, appBase), this.$$compose();
        }, this.$$compose = function() {
            var search = toKeyValue(this.$$search), hash = this.$$hash ? "#" + encodeUriSegment(this.$$hash) : "";
            this.$$url = encodePath(this.$$path) + (search ? "?" + search : "") + hash, this.$$absUrl = appBase + (this.$$url ? hashPrefix + this.$$url : "");
        }, this.$$parseLinkUrl = function(url, relHref) {
            return stripHash(appBase) == stripHash(url) ? (this.$$parse(url), !0) : !1;
        };
    }
    function LocationHashbangInHtml5Url(appBase, appBaseNoFile, hashPrefix) {
        this.$$html5 = !0, LocationHashbangUrl.apply(this, arguments), this.$$parseLinkUrl = function(url, relHref) {
            if (relHref && "#" === relHref[0]) return this.hash(relHref.slice(1)), !0;
            var rewrittenUrl, appUrl;
            return appBase == stripHash(url) ? rewrittenUrl = url : (appUrl = beginsWith(appBaseNoFile, url)) ? rewrittenUrl = appBase + hashPrefix + appUrl : appBaseNoFile === url + "/" && (rewrittenUrl = appBaseNoFile), 
            rewrittenUrl && this.$$parse(rewrittenUrl), !!rewrittenUrl;
        }, this.$$compose = function() {
            var search = toKeyValue(this.$$search), hash = this.$$hash ? "#" + encodeUriSegment(this.$$hash) : "";
            this.$$url = encodePath(this.$$path) + (search ? "?" + search : "") + hash, this.$$absUrl = appBase + hashPrefix + this.$$url;
        };
    }
    function locationGetter(property) {
        return function() {
            return this[property];
        };
    }
    function locationGetterSetter(property, preprocess) {
        return function(value) {
            return isUndefined(value) ? this[property] : (this[property] = preprocess(value), 
            this.$$compose(), this);
        };
    }
    function $LocationProvider() {
        var hashPrefix = "", html5Mode = {
            enabled: !1,
            requireBase: !0,
            rewriteLinks: !0
        };
        this.hashPrefix = function(prefix) {
            return isDefined(prefix) ? (hashPrefix = prefix, this) : hashPrefix;
        }, this.html5Mode = function(mode) {
            return isBoolean(mode) ? (html5Mode.enabled = mode, this) : isObject(mode) ? (isBoolean(mode.enabled) && (html5Mode.enabled = mode.enabled), 
            isBoolean(mode.requireBase) && (html5Mode.requireBase = mode.requireBase), isBoolean(mode.rewriteLinks) && (html5Mode.rewriteLinks = mode.rewriteLinks), 
            this) : html5Mode;
        }, this.$get = [ "$rootScope", "$browser", "$sniffer", "$rootElement", "$window", function($rootScope, $browser, $sniffer, $rootElement, $window) {
            function setBrowserUrlWithFallback(url, replace, state) {
                var oldUrl = $location.url(), oldState = $location.$$state;
                try {
                    $browser.url(url, replace, state), $location.$$state = $browser.state();
                } catch (e) {
                    throw $location.url(oldUrl), $location.$$state = oldState, e;
                }
            }
            function afterLocationChange(oldUrl, oldState) {
                $rootScope.$broadcast("$locationChangeSuccess", $location.absUrl(), oldUrl, $location.$$state, oldState);
            }
            var $location, LocationMode, appBase, baseHref = $browser.baseHref(), initialUrl = $browser.url();
            if (html5Mode.enabled) {
                if (!baseHref && html5Mode.requireBase) throw $locationMinErr("nobase", "$location in HTML5 mode requires a <base> tag to be present!");
                appBase = serverBase(initialUrl) + (baseHref || "/"), LocationMode = $sniffer.history ? LocationHtml5Url : LocationHashbangInHtml5Url;
            } else appBase = stripHash(initialUrl), LocationMode = LocationHashbangUrl;
            var appBaseNoFile = stripFile(appBase);
            $location = new LocationMode(appBase, appBaseNoFile, "#" + hashPrefix), $location.$$parseLinkUrl(initialUrl, initialUrl), 
            $location.$$state = $browser.state();
            var IGNORE_URI_REGEXP = /^\s*(javascript|mailto):/i;
            $rootElement.on("click", function(event) {
                if (html5Mode.rewriteLinks && !event.ctrlKey && !event.metaKey && !event.shiftKey && 2 != event.which && 2 != event.button) {
                    for (var elm = jqLite(event.target); "a" !== nodeName_(elm[0]); ) if (elm[0] === $rootElement[0] || !(elm = elm.parent())[0]) return;
                    var absHref = elm.prop("href"), relHref = elm.attr("href") || elm.attr("xlink:href");
                    isObject(absHref) && "[object SVGAnimatedString]" === absHref.toString() && (absHref = urlResolve(absHref.animVal).href), 
                    IGNORE_URI_REGEXP.test(absHref) || !absHref || elm.attr("target") || event.isDefaultPrevented() || $location.$$parseLinkUrl(absHref, relHref) && (event.preventDefault(), 
                    $location.absUrl() != $browser.url() && ($rootScope.$apply(), $window.angular["ff-684208-preventDefault"] = !0));
                }
            }), trimEmptyHash($location.absUrl()) != trimEmptyHash(initialUrl) && $browser.url($location.absUrl(), !0);
            var initializing = !0;
            return $browser.onUrlChange(function(newUrl, newState) {
                return isUndefined(beginsWith(appBaseNoFile, newUrl)) ? void ($window.location.href = newUrl) : ($rootScope.$evalAsync(function() {
                    var defaultPrevented, oldUrl = $location.absUrl(), oldState = $location.$$state;
                    $location.$$parse(newUrl), $location.$$state = newState, defaultPrevented = $rootScope.$broadcast("$locationChangeStart", newUrl, oldUrl, newState, oldState).defaultPrevented, 
                    $location.absUrl() === newUrl && (defaultPrevented ? ($location.$$parse(oldUrl), 
                    $location.$$state = oldState, setBrowserUrlWithFallback(oldUrl, !1, oldState)) : (initializing = !1, 
                    afterLocationChange(oldUrl, oldState)));
                }), void ($rootScope.$$phase || $rootScope.$digest()));
            }), $rootScope.$watch(function() {
                var oldUrl = trimEmptyHash($browser.url()), newUrl = trimEmptyHash($location.absUrl()), oldState = $browser.state(), currentReplace = $location.$$replace, urlOrStateChanged = oldUrl !== newUrl || $location.$$html5 && $sniffer.history && oldState !== $location.$$state;
                (initializing || urlOrStateChanged) && (initializing = !1, $rootScope.$evalAsync(function() {
                    var newUrl = $location.absUrl(), defaultPrevented = $rootScope.$broadcast("$locationChangeStart", newUrl, oldUrl, $location.$$state, oldState).defaultPrevented;
                    $location.absUrl() === newUrl && (defaultPrevented ? ($location.$$parse(oldUrl), 
                    $location.$$state = oldState) : (urlOrStateChanged && setBrowserUrlWithFallback(newUrl, currentReplace, oldState === $location.$$state ? null : $location.$$state), 
                    afterLocationChange(oldUrl, oldState)));
                })), $location.$$replace = !1;
            }), $location;
        } ];
    }
    function $LogProvider() {
        var debug = !0, self = this;
        this.debugEnabled = function(flag) {
            return isDefined(flag) ? (debug = flag, this) : debug;
        }, this.$get = [ "$window", function($window) {
            function formatError(arg) {
                return arg instanceof Error && (arg.stack ? arg = arg.message && -1 === arg.stack.indexOf(arg.message) ? "Error: " + arg.message + "\n" + arg.stack : arg.stack : arg.sourceURL && (arg = arg.message + "\n" + arg.sourceURL + ":" + arg.line)), 
                arg;
            }
            function consoleLog(type) {
                var console = $window.console || {}, logFn = console[type] || console.log || noop, hasApply = !1;
                try {
                    hasApply = !!logFn.apply;
                } catch (e) {}
                return hasApply ? function() {
                    var args = [];
                    return forEach(arguments, function(arg) {
                        args.push(formatError(arg));
                    }), logFn.apply(console, args);
                } : function(arg1, arg2) {
                    logFn(arg1, null == arg2 ? "" : arg2);
                };
            }
            return {
                log: consoleLog("log"),
                info: consoleLog("info"),
                warn: consoleLog("warn"),
                error: consoleLog("error"),
                debug: function() {
                    var fn = consoleLog("debug");
                    return function() {
                        debug && fn.apply(self, arguments);
                    };
                }()
            };
        } ];
    }
    function ensureSafeMemberName(name, fullExpression) {
        if (name = isObject(name) && name.toString ? name.toString() : name, "__defineGetter__" === name || "__defineSetter__" === name || "__lookupGetter__" === name || "__lookupSetter__" === name || "__proto__" === name) throw $parseMinErr("isecfld", "Attempting to access a disallowed field in Angular expressions! Expression: {0}", fullExpression);
        return name;
    }
    function ensureSafeObject(obj, fullExpression) {
        if (obj) {
            if (obj.constructor === obj) throw $parseMinErr("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", fullExpression);
            if (obj.window === obj) throw $parseMinErr("isecwindow", "Referencing the Window in Angular expressions is disallowed! Expression: {0}", fullExpression);
            if (obj.children && (obj.nodeName || obj.prop && obj.attr && obj.find)) throw $parseMinErr("isecdom", "Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}", fullExpression);
            if (obj === Object) throw $parseMinErr("isecobj", "Referencing Object in Angular expressions is disallowed! Expression: {0}", fullExpression);
        }
        return obj;
    }
    function ensureSafeFunction(obj, fullExpression) {
        if (obj) {
            if (obj.constructor === obj) throw $parseMinErr("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", fullExpression);
            if (obj === CALL || obj === APPLY || obj === BIND) throw $parseMinErr("isecff", "Referencing call, apply or bind in Angular expressions is disallowed! Expression: {0}", fullExpression);
        }
    }
    function ifDefined(v, d) {
        return "undefined" != typeof v ? v : d;
    }
    function plusFn(l, r) {
        return "undefined" == typeof l ? r : "undefined" == typeof r ? l : l + r;
    }
    function isStateless($filter, filterName) {
        var fn = $filter(filterName);
        return !fn.$stateful;
    }
    function findConstantAndWatchExpressions(ast, $filter) {
        var allConstants, argsToWatch;
        switch (ast.type) {
          case AST.Program:
            allConstants = !0, forEach(ast.body, function(expr) {
                findConstantAndWatchExpressions(expr.expression, $filter), allConstants = allConstants && expr.expression.constant;
            }), ast.constant = allConstants;
            break;

          case AST.Literal:
            ast.constant = !0, ast.toWatch = [];
            break;

          case AST.UnaryExpression:
            findConstantAndWatchExpressions(ast.argument, $filter), ast.constant = ast.argument.constant, 
            ast.toWatch = ast.argument.toWatch;
            break;

          case AST.BinaryExpression:
            findConstantAndWatchExpressions(ast.left, $filter), findConstantAndWatchExpressions(ast.right, $filter), 
            ast.constant = ast.left.constant && ast.right.constant, ast.toWatch = ast.left.toWatch.concat(ast.right.toWatch);
            break;

          case AST.LogicalExpression:
            findConstantAndWatchExpressions(ast.left, $filter), findConstantAndWatchExpressions(ast.right, $filter), 
            ast.constant = ast.left.constant && ast.right.constant, ast.toWatch = ast.constant ? [] : [ ast ];
            break;

          case AST.ConditionalExpression:
            findConstantAndWatchExpressions(ast.test, $filter), findConstantAndWatchExpressions(ast.alternate, $filter), 
            findConstantAndWatchExpressions(ast.consequent, $filter), ast.constant = ast.test.constant && ast.alternate.constant && ast.consequent.constant, 
            ast.toWatch = ast.constant ? [] : [ ast ];
            break;

          case AST.Identifier:
            ast.constant = !1, ast.toWatch = [ ast ];
            break;

          case AST.MemberExpression:
            findConstantAndWatchExpressions(ast.object, $filter), ast.computed && findConstantAndWatchExpressions(ast.property, $filter), 
            ast.constant = ast.object.constant && (!ast.computed || ast.property.constant), 
            ast.toWatch = [ ast ];
            break;

          case AST.CallExpression:
            allConstants = ast.filter ? isStateless($filter, ast.callee.name) : !1, argsToWatch = [], 
            forEach(ast.arguments, function(expr) {
                findConstantAndWatchExpressions(expr, $filter), allConstants = allConstants && expr.constant, 
                expr.constant || argsToWatch.push.apply(argsToWatch, expr.toWatch);
            }), ast.constant = allConstants, ast.toWatch = ast.filter && isStateless($filter, ast.callee.name) ? argsToWatch : [ ast ];
            break;

          case AST.AssignmentExpression:
            findConstantAndWatchExpressions(ast.left, $filter), findConstantAndWatchExpressions(ast.right, $filter), 
            ast.constant = ast.left.constant && ast.right.constant, ast.toWatch = [ ast ];
            break;

          case AST.ArrayExpression:
            allConstants = !0, argsToWatch = [], forEach(ast.elements, function(expr) {
                findConstantAndWatchExpressions(expr, $filter), allConstants = allConstants && expr.constant, 
                expr.constant || argsToWatch.push.apply(argsToWatch, expr.toWatch);
            }), ast.constant = allConstants, ast.toWatch = argsToWatch;
            break;

          case AST.ObjectExpression:
            allConstants = !0, argsToWatch = [], forEach(ast.properties, function(property) {
                findConstantAndWatchExpressions(property.value, $filter), allConstants = allConstants && property.value.constant, 
                property.value.constant || argsToWatch.push.apply(argsToWatch, property.value.toWatch);
            }), ast.constant = allConstants, ast.toWatch = argsToWatch;
            break;

          case AST.ThisExpression:
            ast.constant = !1, ast.toWatch = [];
        }
    }
    function getInputs(body) {
        if (1 == body.length) {
            var lastExpression = body[0].expression, candidate = lastExpression.toWatch;
            return 1 !== candidate.length ? candidate : candidate[0] !== lastExpression ? candidate : undefined;
        }
    }
    function isAssignable(ast) {
        return ast.type === AST.Identifier || ast.type === AST.MemberExpression;
    }
    function assignableAST(ast) {
        return 1 === ast.body.length && isAssignable(ast.body[0].expression) ? {
            type: AST.AssignmentExpression,
            left: ast.body[0].expression,
            right: {
                type: AST.NGValueParameter
            },
            operator: "="
        } : void 0;
    }
    function isLiteral(ast) {
        return 0 === ast.body.length || 1 === ast.body.length && (ast.body[0].expression.type === AST.Literal || ast.body[0].expression.type === AST.ArrayExpression || ast.body[0].expression.type === AST.ObjectExpression);
    }
    function isConstant(ast) {
        return ast.constant;
    }
    function ASTCompiler(astBuilder, $filter) {
        this.astBuilder = astBuilder, this.$filter = $filter;
    }
    function ASTInterpreter(astBuilder, $filter) {
        this.astBuilder = astBuilder, this.$filter = $filter;
    }
    function isPossiblyDangerousMemberName(name) {
        return "constructor" == name;
    }
    function getValueOf(value) {
        return isFunction(value.valueOf) ? value.valueOf() : objectValueOf.call(value);
    }
    function $ParseProvider() {
        var cacheDefault = createMap(), cacheExpensive = createMap();
        this.$get = [ "$filter", function($filter) {
            function expressionInputDirtyCheck(newValue, oldValueOfValue) {
                return null == newValue || null == oldValueOfValue ? newValue === oldValueOfValue : "object" == typeof newValue && (newValue = getValueOf(newValue), 
                "object" == typeof newValue) ? !1 : newValue === oldValueOfValue || newValue !== newValue && oldValueOfValue !== oldValueOfValue;
            }
            function inputsWatchDelegate(scope, listener, objectEquality, parsedExpression, prettyPrintExpression) {
                var lastResult, inputExpressions = parsedExpression.inputs;
                if (1 === inputExpressions.length) {
                    var oldInputValueOf = expressionInputDirtyCheck;
                    return inputExpressions = inputExpressions[0], scope.$watch(function(scope) {
                        var newInputValue = inputExpressions(scope);
                        return expressionInputDirtyCheck(newInputValue, oldInputValueOf) || (lastResult = parsedExpression(scope, undefined, undefined, [ newInputValue ]), 
                        oldInputValueOf = newInputValue && getValueOf(newInputValue)), lastResult;
                    }, listener, objectEquality, prettyPrintExpression);
                }
                for (var oldInputValueOfValues = [], oldInputValues = [], i = 0, ii = inputExpressions.length; ii > i; i++) oldInputValueOfValues[i] = expressionInputDirtyCheck, 
                oldInputValues[i] = null;
                return scope.$watch(function(scope) {
                    for (var changed = !1, i = 0, ii = inputExpressions.length; ii > i; i++) {
                        var newInputValue = inputExpressions[i](scope);
                        (changed || (changed = !expressionInputDirtyCheck(newInputValue, oldInputValueOfValues[i]))) && (oldInputValues[i] = newInputValue, 
                        oldInputValueOfValues[i] = newInputValue && getValueOf(newInputValue));
                    }
                    return changed && (lastResult = parsedExpression(scope, undefined, undefined, oldInputValues)), 
                    lastResult;
                }, listener, objectEquality, prettyPrintExpression);
            }
            function oneTimeWatchDelegate(scope, listener, objectEquality, parsedExpression) {
                var unwatch, lastValue;
                return unwatch = scope.$watch(function(scope) {
                    return parsedExpression(scope);
                }, function(value, old, scope) {
                    lastValue = value, isFunction(listener) && listener.apply(this, arguments), isDefined(value) && scope.$$postDigest(function() {
                        isDefined(lastValue) && unwatch();
                    });
                }, objectEquality);
            }
            function oneTimeLiteralWatchDelegate(scope, listener, objectEquality, parsedExpression) {
                function isAllDefined(value) {
                    var allDefined = !0;
                    return forEach(value, function(val) {
                        isDefined(val) || (allDefined = !1);
                    }), allDefined;
                }
                var unwatch, lastValue;
                return unwatch = scope.$watch(function(scope) {
                    return parsedExpression(scope);
                }, function(value, old, scope) {
                    lastValue = value, isFunction(listener) && listener.call(this, value, old, scope), 
                    isAllDefined(value) && scope.$$postDigest(function() {
                        isAllDefined(lastValue) && unwatch();
                    });
                }, objectEquality);
            }
            function constantWatchDelegate(scope, listener, objectEquality, parsedExpression) {
                var unwatch;
                return unwatch = scope.$watch(function(scope) {
                    return parsedExpression(scope);
                }, function(value, old, scope) {
                    isFunction(listener) && listener.apply(this, arguments), unwatch();
                }, objectEquality);
            }
            function addInterceptor(parsedExpression, interceptorFn) {
                if (!interceptorFn) return parsedExpression;
                var watchDelegate = parsedExpression.$$watchDelegate, regularWatch = watchDelegate !== oneTimeLiteralWatchDelegate && watchDelegate !== oneTimeWatchDelegate, fn = regularWatch ? function(scope, locals, assign, inputs) {
                    var value = parsedExpression(scope, locals, assign, inputs);
                    return interceptorFn(value, scope, locals);
                } : function(scope, locals, assign, inputs) {
                    var value = parsedExpression(scope, locals, assign, inputs), result = interceptorFn(value, scope, locals);
                    return isDefined(value) ? result : value;
                };
                return parsedExpression.$$watchDelegate && parsedExpression.$$watchDelegate !== inputsWatchDelegate ? fn.$$watchDelegate = parsedExpression.$$watchDelegate : interceptorFn.$stateful || (fn.$$watchDelegate = inputsWatchDelegate, 
                fn.inputs = parsedExpression.inputs ? parsedExpression.inputs : [ parsedExpression ]), 
                fn;
            }
            var noUnsafeEval = csp().noUnsafeEval, $parseOptions = {
                csp: noUnsafeEval,
                expensiveChecks: !1
            }, $parseOptionsExpensive = {
                csp: noUnsafeEval,
                expensiveChecks: !0
            };
            return function(exp, interceptorFn, expensiveChecks) {
                var parsedExpression, oneTime, cacheKey;
                switch (typeof exp) {
                  case "string":
                    exp = exp.trim(), cacheKey = exp;
                    var cache = expensiveChecks ? cacheExpensive : cacheDefault;
                    if (parsedExpression = cache[cacheKey], !parsedExpression) {
                        ":" === exp.charAt(0) && ":" === exp.charAt(1) && (oneTime = !0, exp = exp.substring(2));
                        var parseOptions = expensiveChecks ? $parseOptionsExpensive : $parseOptions, lexer = new Lexer(parseOptions), parser = new Parser(lexer, $filter, parseOptions);
                        parsedExpression = parser.parse(exp), parsedExpression.constant ? parsedExpression.$$watchDelegate = constantWatchDelegate : oneTime ? parsedExpression.$$watchDelegate = parsedExpression.literal ? oneTimeLiteralWatchDelegate : oneTimeWatchDelegate : parsedExpression.inputs && (parsedExpression.$$watchDelegate = inputsWatchDelegate), 
                        cache[cacheKey] = parsedExpression;
                    }
                    return addInterceptor(parsedExpression, interceptorFn);

                  case "function":
                    return addInterceptor(exp, interceptorFn);

                  default:
                    return noop;
                }
            };
        } ];
    }
    function $QProvider() {
        this.$get = [ "$rootScope", "$exceptionHandler", function($rootScope, $exceptionHandler) {
            return qFactory(function(callback) {
                $rootScope.$evalAsync(callback);
            }, $exceptionHandler);
        } ];
    }
    function $$QProvider() {
        this.$get = [ "$browser", "$exceptionHandler", function($browser, $exceptionHandler) {
            return qFactory(function(callback) {
                $browser.defer(callback);
            }, $exceptionHandler);
        } ];
    }
    function qFactory(nextTick, exceptionHandler) {
        function callOnce(self, resolveFn, rejectFn) {
            function wrap(fn) {
                return function(value) {
                    called || (called = !0, fn.call(self, value));
                };
            }
            var called = !1;
            return [ wrap(resolveFn), wrap(rejectFn) ];
        }
        function Promise() {
            this.$$state = {
                status: 0
            };
        }
        function simpleBind(context, fn) {
            return function(value) {
                fn.call(context, value);
            };
        }
        function processQueue(state) {
            var fn, deferred, pending;
            pending = state.pending, state.processScheduled = !1, state.pending = undefined;
            for (var i = 0, ii = pending.length; ii > i; ++i) {
                deferred = pending[i][0], fn = pending[i][state.status];
                try {
                    isFunction(fn) ? deferred.resolve(fn(state.value)) : 1 === state.status ? deferred.resolve(state.value) : deferred.reject(state.value);
                } catch (e) {
                    deferred.reject(e), exceptionHandler(e);
                }
            }
        }
        function scheduleProcessQueue(state) {
            !state.processScheduled && state.pending && (state.processScheduled = !0, nextTick(function() {
                processQueue(state);
            }));
        }
        function Deferred() {
            this.promise = new Promise(), this.resolve = simpleBind(this, this.resolve), this.reject = simpleBind(this, this.reject), 
            this.notify = simpleBind(this, this.notify);
        }
        function all(promises) {
            var deferred = new Deferred(), counter = 0, results = isArray(promises) ? [] : {};
            return forEach(promises, function(promise, key) {
                counter++, when(promise).then(function(value) {
                    results.hasOwnProperty(key) || (results[key] = value, --counter || deferred.resolve(results));
                }, function(reason) {
                    results.hasOwnProperty(key) || deferred.reject(reason);
                });
            }), 0 === counter && deferred.resolve(results), deferred.promise;
        }
        var $qMinErr = minErr("$q", TypeError), defer = function() {
            return new Deferred();
        };
        extend(Promise.prototype, {
            then: function(onFulfilled, onRejected, progressBack) {
                if (isUndefined(onFulfilled) && isUndefined(onRejected) && isUndefined(progressBack)) return this;
                var result = new Deferred();
                return this.$$state.pending = this.$$state.pending || [], this.$$state.pending.push([ result, onFulfilled, onRejected, progressBack ]), 
                this.$$state.status > 0 && scheduleProcessQueue(this.$$state), result.promise;
            },
            "catch": function(callback) {
                return this.then(null, callback);
            },
            "finally": function(callback, progressBack) {
                return this.then(function(value) {
                    return handleCallback(value, !0, callback);
                }, function(error) {
                    return handleCallback(error, !1, callback);
                }, progressBack);
            }
        }), extend(Deferred.prototype, {
            resolve: function(val) {
                this.promise.$$state.status || (val === this.promise ? this.$$reject($qMinErr("qcycle", "Expected promise to be resolved with value other than itself '{0}'", val)) : this.$$resolve(val));
            },
            $$resolve: function(val) {
                var then, fns;
                fns = callOnce(this, this.$$resolve, this.$$reject);
                try {
                    (isObject(val) || isFunction(val)) && (then = val && val.then), isFunction(then) ? (this.promise.$$state.status = -1, 
                    then.call(val, fns[0], fns[1], this.notify)) : (this.promise.$$state.value = val, 
                    this.promise.$$state.status = 1, scheduleProcessQueue(this.promise.$$state));
                } catch (e) {
                    fns[1](e), exceptionHandler(e);
                }
            },
            reject: function(reason) {
                this.promise.$$state.status || this.$$reject(reason);
            },
            $$reject: function(reason) {
                this.promise.$$state.value = reason, this.promise.$$state.status = 2, scheduleProcessQueue(this.promise.$$state);
            },
            notify: function(progress) {
                var callbacks = this.promise.$$state.pending;
                this.promise.$$state.status <= 0 && callbacks && callbacks.length && nextTick(function() {
                    for (var callback, result, i = 0, ii = callbacks.length; ii > i; i++) {
                        result = callbacks[i][0], callback = callbacks[i][3];
                        try {
                            result.notify(isFunction(callback) ? callback(progress) : progress);
                        } catch (e) {
                            exceptionHandler(e);
                        }
                    }
                });
            }
        });
        var reject = function(reason) {
            var result = new Deferred();
            return result.reject(reason), result.promise;
        }, makePromise = function(value, resolved) {
            var result = new Deferred();
            return resolved ? result.resolve(value) : result.reject(value), result.promise;
        }, handleCallback = function(value, isResolved, callback) {
            var callbackOutput = null;
            try {
                isFunction(callback) && (callbackOutput = callback());
            } catch (e) {
                return makePromise(e, !1);
            }
            return isPromiseLike(callbackOutput) ? callbackOutput.then(function() {
                return makePromise(value, isResolved);
            }, function(error) {
                return makePromise(error, !1);
            }) : makePromise(value, isResolved);
        }, when = function(value, callback, errback, progressBack) {
            var result = new Deferred();
            return result.resolve(value), result.promise.then(callback, errback, progressBack);
        }, resolve = when, $Q = function Q(resolver) {
            function resolveFn(value) {
                deferred.resolve(value);
            }
            function rejectFn(reason) {
                deferred.reject(reason);
            }
            if (!isFunction(resolver)) throw $qMinErr("norslvr", "Expected resolverFn, got '{0}'", resolver);
            if (!(this instanceof Q)) return new Q(resolver);
            var deferred = new Deferred();
            return resolver(resolveFn, rejectFn), deferred.promise;
        };
        return $Q.defer = defer, $Q.reject = reject, $Q.when = when, $Q.resolve = resolve, 
        $Q.all = all, $Q;
    }
    function $$RAFProvider() {
        this.$get = [ "$window", "$timeout", function($window, $timeout) {
            var requestAnimationFrame = $window.requestAnimationFrame || $window.webkitRequestAnimationFrame, cancelAnimationFrame = $window.cancelAnimationFrame || $window.webkitCancelAnimationFrame || $window.webkitCancelRequestAnimationFrame, rafSupported = !!requestAnimationFrame, raf = rafSupported ? function(fn) {
                var id = requestAnimationFrame(fn);
                return function() {
                    cancelAnimationFrame(id);
                };
            } : function(fn) {
                var timer = $timeout(fn, 16.66, !1);
                return function() {
                    $timeout.cancel(timer);
                };
            };
            return raf.supported = rafSupported, raf;
        } ];
    }
    function $RootScopeProvider() {
        function createChildScopeClass(parent) {
            function ChildScope() {
                this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null, 
                this.$$listeners = {}, this.$$listenerCount = {}, this.$$watchersCount = 0, this.$id = nextUid(), 
                this.$$ChildScope = null;
            }
            return ChildScope.prototype = parent, ChildScope;
        }
        var TTL = 10, $rootScopeMinErr = minErr("$rootScope"), lastDirtyWatch = null, applyAsyncId = null;
        this.digestTtl = function(value) {
            return arguments.length && (TTL = value), TTL;
        }, this.$get = [ "$injector", "$exceptionHandler", "$parse", "$browser", function($injector, $exceptionHandler, $parse, $browser) {
            function destroyChildScope($event) {
                $event.currentScope.$$destroyed = !0;
            }
            function Scope() {
                this.$id = nextUid(), this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, 
                this.$root = this, this.$$destroyed = !1, this.$$listeners = {}, this.$$listenerCount = {}, 
                this.$$watchersCount = 0, this.$$isolateBindings = null;
            }
            function beginPhase(phase) {
                if ($rootScope.$$phase) throw $rootScopeMinErr("inprog", "{0} already in progress", $rootScope.$$phase);
                $rootScope.$$phase = phase;
            }
            function clearPhase() {
                $rootScope.$$phase = null;
            }
            function incrementWatchersCount(current, count) {
                do current.$$watchersCount += count; while (current = current.$parent);
            }
            function decrementListenerCount(current, count, name) {
                do current.$$listenerCount[name] -= count, 0 === current.$$listenerCount[name] && delete current.$$listenerCount[name]; while (current = current.$parent);
            }
            function initWatchVal() {}
            function flushApplyAsync() {
                for (;applyAsyncQueue.length; ) try {
                    applyAsyncQueue.shift()();
                } catch (e) {
                    $exceptionHandler(e);
                }
                applyAsyncId = null;
            }
            function scheduleApplyAsync() {
                null === applyAsyncId && (applyAsyncId = $browser.defer(function() {
                    $rootScope.$apply(flushApplyAsync);
                }));
            }
            Scope.prototype = {
                constructor: Scope,
                $new: function(isolate, parent) {
                    var child;
                    return parent = parent || this, isolate ? (child = new Scope(), child.$root = this.$root) : (this.$$ChildScope || (this.$$ChildScope = createChildScopeClass(this)), 
                    child = new this.$$ChildScope()), child.$parent = parent, child.$$prevSibling = parent.$$childTail, 
                    parent.$$childHead ? (parent.$$childTail.$$nextSibling = child, parent.$$childTail = child) : parent.$$childHead = parent.$$childTail = child, 
                    (isolate || parent != this) && child.$on("$destroy", destroyChildScope), child;
                },
                $watch: function(watchExp, listener, objectEquality, prettyPrintExpression) {
                    var get = $parse(watchExp);
                    if (get.$$watchDelegate) return get.$$watchDelegate(this, listener, objectEquality, get, watchExp);
                    var scope = this, array = scope.$$watchers, watcher = {
                        fn: listener,
                        last: initWatchVal,
                        get: get,
                        exp: prettyPrintExpression || watchExp,
                        eq: !!objectEquality
                    };
                    return lastDirtyWatch = null, isFunction(listener) || (watcher.fn = noop), array || (array = scope.$$watchers = []), 
                    array.unshift(watcher), incrementWatchersCount(this, 1), function() {
                        arrayRemove(array, watcher) >= 0 && incrementWatchersCount(scope, -1), lastDirtyWatch = null;
                    };
                },
                $watchGroup: function(watchExpressions, listener) {
                    function watchGroupAction() {
                        changeReactionScheduled = !1, firstRun ? (firstRun = !1, listener(newValues, newValues, self)) : listener(newValues, oldValues, self);
                    }
                    var oldValues = new Array(watchExpressions.length), newValues = new Array(watchExpressions.length), deregisterFns = [], self = this, changeReactionScheduled = !1, firstRun = !0;
                    if (!watchExpressions.length) {
                        var shouldCall = !0;
                        return self.$evalAsync(function() {
                            shouldCall && listener(newValues, newValues, self);
                        }), function() {
                            shouldCall = !1;
                        };
                    }
                    return 1 === watchExpressions.length ? this.$watch(watchExpressions[0], function(value, oldValue, scope) {
                        newValues[0] = value, oldValues[0] = oldValue, listener(newValues, value === oldValue ? newValues : oldValues, scope);
                    }) : (forEach(watchExpressions, function(expr, i) {
                        var unwatchFn = self.$watch(expr, function(value, oldValue) {
                            newValues[i] = value, oldValues[i] = oldValue, changeReactionScheduled || (changeReactionScheduled = !0, 
                            self.$evalAsync(watchGroupAction));
                        });
                        deregisterFns.push(unwatchFn);
                    }), function() {
                        for (;deregisterFns.length; ) deregisterFns.shift()();
                    });
                },
                $watchCollection: function(obj, listener) {
                    function $watchCollectionInterceptor(_value) {
                        newValue = _value;
                        var newLength, key, bothNaN, newItem, oldItem;
                        if (!isUndefined(newValue)) {
                            if (isObject(newValue)) if (isArrayLike(newValue)) {
                                oldValue !== internalArray && (oldValue = internalArray, oldLength = oldValue.length = 0, 
                                changeDetected++), newLength = newValue.length, oldLength !== newLength && (changeDetected++, 
                                oldValue.length = oldLength = newLength);
                                for (var i = 0; newLength > i; i++) oldItem = oldValue[i], newItem = newValue[i], 
                                bothNaN = oldItem !== oldItem && newItem !== newItem, bothNaN || oldItem === newItem || (changeDetected++, 
                                oldValue[i] = newItem);
                            } else {
                                oldValue !== internalObject && (oldValue = internalObject = {}, oldLength = 0, changeDetected++), 
                                newLength = 0;
                                for (key in newValue) hasOwnProperty.call(newValue, key) && (newLength++, newItem = newValue[key], 
                                oldItem = oldValue[key], key in oldValue ? (bothNaN = oldItem !== oldItem && newItem !== newItem, 
                                bothNaN || oldItem === newItem || (changeDetected++, oldValue[key] = newItem)) : (oldLength++, 
                                oldValue[key] = newItem, changeDetected++));
                                if (oldLength > newLength) {
                                    changeDetected++;
                                    for (key in oldValue) hasOwnProperty.call(newValue, key) || (oldLength--, delete oldValue[key]);
                                }
                            } else oldValue !== newValue && (oldValue = newValue, changeDetected++);
                            return changeDetected;
                        }
                    }
                    function $watchCollectionAction() {
                        if (initRun ? (initRun = !1, listener(newValue, newValue, self)) : listener(newValue, veryOldValue, self), 
                        trackVeryOldValue) if (isObject(newValue)) if (isArrayLike(newValue)) {
                            veryOldValue = new Array(newValue.length);
                            for (var i = 0; i < newValue.length; i++) veryOldValue[i] = newValue[i];
                        } else {
                            veryOldValue = {};
                            for (var key in newValue) hasOwnProperty.call(newValue, key) && (veryOldValue[key] = newValue[key]);
                        } else veryOldValue = newValue;
                    }
                    $watchCollectionInterceptor.$stateful = !0;
                    var newValue, oldValue, veryOldValue, self = this, trackVeryOldValue = listener.length > 1, changeDetected = 0, changeDetector = $parse(obj, $watchCollectionInterceptor), internalArray = [], internalObject = {}, initRun = !0, oldLength = 0;
                    return this.$watch(changeDetector, $watchCollectionAction);
                },
                $digest: function() {
                    var watch, value, last, watchers, length, dirty, next, current, logIdx, asyncTask, ttl = TTL, target = this, watchLog = [];
                    beginPhase("$digest"), $browser.$$checkUrlChange(), this === $rootScope && null !== applyAsyncId && ($browser.defer.cancel(applyAsyncId), 
                    flushApplyAsync()), lastDirtyWatch = null;
                    do {
                        for (dirty = !1, current = target; asyncQueue.length; ) {
                            try {
                                asyncTask = asyncQueue.shift(), asyncTask.scope.$eval(asyncTask.expression, asyncTask.locals);
                            } catch (e) {
                                $exceptionHandler(e);
                            }
                            lastDirtyWatch = null;
                        }
                        traverseScopesLoop: do {
                            if (watchers = current.$$watchers) for (length = watchers.length; length--; ) try {
                                if (watch = watchers[length]) if ((value = watch.get(current)) === (last = watch.last) || (watch.eq ? equals(value, last) : "number" == typeof value && "number" == typeof last && isNaN(value) && isNaN(last))) {
                                    if (watch === lastDirtyWatch) {
                                        dirty = !1;
                                        break traverseScopesLoop;
                                    }
                                } else dirty = !0, lastDirtyWatch = watch, watch.last = watch.eq ? copy(value, null) : value, 
                                watch.fn(value, last === initWatchVal ? value : last, current), 5 > ttl && (logIdx = 4 - ttl, 
                                watchLog[logIdx] || (watchLog[logIdx] = []), watchLog[logIdx].push({
                                    msg: isFunction(watch.exp) ? "fn: " + (watch.exp.name || watch.exp.toString()) : watch.exp,
                                    newVal: value,
                                    oldVal: last
                                }));
                            } catch (e) {
                                $exceptionHandler(e);
                            }
                            if (!(next = current.$$watchersCount && current.$$childHead || current !== target && current.$$nextSibling)) for (;current !== target && !(next = current.$$nextSibling); ) current = current.$parent;
                        } while (current = next);
                        if ((dirty || asyncQueue.length) && !ttl--) throw clearPhase(), $rootScopeMinErr("infdig", "{0} $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: {1}", TTL, watchLog);
                    } while (dirty || asyncQueue.length);
                    for (clearPhase(); postDigestQueue.length; ) try {
                        postDigestQueue.shift()();
                    } catch (e) {
                        $exceptionHandler(e);
                    }
                },
                $destroy: function() {
                    if (!this.$$destroyed) {
                        var parent = this.$parent;
                        this.$broadcast("$destroy"), this.$$destroyed = !0, this === $rootScope && $browser.$$applicationDestroyed(), 
                        incrementWatchersCount(this, -this.$$watchersCount);
                        for (var eventName in this.$$listenerCount) decrementListenerCount(this, this.$$listenerCount[eventName], eventName);
                        parent && parent.$$childHead == this && (parent.$$childHead = this.$$nextSibling), 
                        parent && parent.$$childTail == this && (parent.$$childTail = this.$$prevSibling), 
                        this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), 
                        this.$destroy = this.$digest = this.$apply = this.$evalAsync = this.$applyAsync = noop, 
                        this.$on = this.$watch = this.$watchGroup = function() {
                            return noop;
                        }, this.$$listeners = {}, this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = this.$root = this.$$watchers = null;
                    }
                },
                $eval: function(expr, locals) {
                    return $parse(expr)(this, locals);
                },
                $evalAsync: function(expr, locals) {
                    $rootScope.$$phase || asyncQueue.length || $browser.defer(function() {
                        asyncQueue.length && $rootScope.$digest();
                    }), asyncQueue.push({
                        scope: this,
                        expression: expr,
                        locals: locals
                    });
                },
                $$postDigest: function(fn) {
                    postDigestQueue.push(fn);
                },
                $apply: function(expr) {
                    try {
                        beginPhase("$apply");
                        try {
                            return this.$eval(expr);
                        } finally {
                            clearPhase();
                        }
                    } catch (e) {
                        $exceptionHandler(e);
                    } finally {
                        try {
                            $rootScope.$digest();
                        } catch (e) {
                            throw $exceptionHandler(e), e;
                        }
                    }
                },
                $applyAsync: function(expr) {
                    function $applyAsyncExpression() {
                        scope.$eval(expr);
                    }
                    var scope = this;
                    expr && applyAsyncQueue.push($applyAsyncExpression), scheduleApplyAsync();
                },
                $on: function(name, listener) {
                    var namedListeners = this.$$listeners[name];
                    namedListeners || (this.$$listeners[name] = namedListeners = []), namedListeners.push(listener);
                    var current = this;
                    do current.$$listenerCount[name] || (current.$$listenerCount[name] = 0), current.$$listenerCount[name]++; while (current = current.$parent);
                    var self = this;
                    return function() {
                        var indexOfListener = namedListeners.indexOf(listener);
                        -1 !== indexOfListener && (namedListeners[indexOfListener] = null, decrementListenerCount(self, 1, name));
                    };
                },
                $emit: function(name, args) {
                    var namedListeners, i, length, empty = [], scope = this, stopPropagation = !1, event = {
                        name: name,
                        targetScope: scope,
                        stopPropagation: function() {
                            stopPropagation = !0;
                        },
                        preventDefault: function() {
                            event.defaultPrevented = !0;
                        },
                        defaultPrevented: !1
                    }, listenerArgs = concat([ event ], arguments, 1);
                    do {
                        for (namedListeners = scope.$$listeners[name] || empty, event.currentScope = scope, 
                        i = 0, length = namedListeners.length; length > i; i++) if (namedListeners[i]) try {
                            namedListeners[i].apply(null, listenerArgs);
                        } catch (e) {
                            $exceptionHandler(e);
                        } else namedListeners.splice(i, 1), i--, length--;
                        if (stopPropagation) return event.currentScope = null, event;
                        scope = scope.$parent;
                    } while (scope);
                    return event.currentScope = null, event;
                },
                $broadcast: function(name, args) {
                    var target = this, current = target, next = target, event = {
                        name: name,
                        targetScope: target,
                        preventDefault: function() {
                            event.defaultPrevented = !0;
                        },
                        defaultPrevented: !1
                    };
                    if (!target.$$listenerCount[name]) return event;
                    for (var listeners, i, length, listenerArgs = concat([ event ], arguments, 1); current = next; ) {
                        for (event.currentScope = current, listeners = current.$$listeners[name] || [], 
                        i = 0, length = listeners.length; length > i; i++) if (listeners[i]) try {
                            listeners[i].apply(null, listenerArgs);
                        } catch (e) {
                            $exceptionHandler(e);
                        } else listeners.splice(i, 1), i--, length--;
                        if (!(next = current.$$listenerCount[name] && current.$$childHead || current !== target && current.$$nextSibling)) for (;current !== target && !(next = current.$$nextSibling); ) current = current.$parent;
                    }
                    return event.currentScope = null, event;
                }
            };
            var $rootScope = new Scope(), asyncQueue = $rootScope.$$asyncQueue = [], postDigestQueue = $rootScope.$$postDigestQueue = [], applyAsyncQueue = $rootScope.$$applyAsyncQueue = [];
            return $rootScope;
        } ];
    }
    function $$SanitizeUriProvider() {
        var aHrefSanitizationWhitelist = /^\s*(https?|ftp|mailto|tel|file):/, imgSrcSanitizationWhitelist = /^\s*((https?|ftp|file|blob):|data:image\/)/;
        this.aHrefSanitizationWhitelist = function(regexp) {
            return isDefined(regexp) ? (aHrefSanitizationWhitelist = regexp, this) : aHrefSanitizationWhitelist;
        }, this.imgSrcSanitizationWhitelist = function(regexp) {
            return isDefined(regexp) ? (imgSrcSanitizationWhitelist = regexp, this) : imgSrcSanitizationWhitelist;
        }, this.$get = function() {
            return function(uri, isImage) {
                var normalizedVal, regex = isImage ? imgSrcSanitizationWhitelist : aHrefSanitizationWhitelist;
                return normalizedVal = urlResolve(uri).href, "" === normalizedVal || normalizedVal.match(regex) ? uri : "unsafe:" + normalizedVal;
            };
        };
    }
    function adjustMatcher(matcher) {
        if ("self" === matcher) return matcher;
        if (isString(matcher)) {
            if (matcher.indexOf("***") > -1) throw $sceMinErr("iwcard", "Illegal sequence *** in string matcher.  String: {0}", matcher);
            return matcher = escapeForRegexp(matcher).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*"), 
            new RegExp("^" + matcher + "$");
        }
        if (isRegExp(matcher)) return new RegExp("^" + matcher.source + "$");
        throw $sceMinErr("imatcher", 'Matchers may only be "self", string patterns or RegExp objects');
    }
    function adjustMatchers(matchers) {
        var adjustedMatchers = [];
        return isDefined(matchers) && forEach(matchers, function(matcher) {
            adjustedMatchers.push(adjustMatcher(matcher));
        }), adjustedMatchers;
    }
    function $SceDelegateProvider() {
        this.SCE_CONTEXTS = SCE_CONTEXTS;
        var resourceUrlWhitelist = [ "self" ], resourceUrlBlacklist = [];
        this.resourceUrlWhitelist = function(value) {
            return arguments.length && (resourceUrlWhitelist = adjustMatchers(value)), resourceUrlWhitelist;
        }, this.resourceUrlBlacklist = function(value) {
            return arguments.length && (resourceUrlBlacklist = adjustMatchers(value)), resourceUrlBlacklist;
        }, this.$get = [ "$injector", function($injector) {
            function matchUrl(matcher, parsedUrl) {
                return "self" === matcher ? urlIsSameOrigin(parsedUrl) : !!matcher.exec(parsedUrl.href);
            }
            function isResourceUrlAllowedByPolicy(url) {
                var i, n, parsedUrl = urlResolve(url.toString()), allowed = !1;
                for (i = 0, n = resourceUrlWhitelist.length; n > i; i++) if (matchUrl(resourceUrlWhitelist[i], parsedUrl)) {
                    allowed = !0;
                    break;
                }
                if (allowed) for (i = 0, n = resourceUrlBlacklist.length; n > i; i++) if (matchUrl(resourceUrlBlacklist[i], parsedUrl)) {
                    allowed = !1;
                    break;
                }
                return allowed;
            }
            function generateHolderType(Base) {
                var holderType = function(trustedValue) {
                    this.$$unwrapTrustedValue = function() {
                        return trustedValue;
                    };
                };
                return Base && (holderType.prototype = new Base()), holderType.prototype.valueOf = function() {
                    return this.$$unwrapTrustedValue();
                }, holderType.prototype.toString = function() {
                    return this.$$unwrapTrustedValue().toString();
                }, holderType;
            }
            function trustAs(type, trustedValue) {
                var Constructor = byType.hasOwnProperty(type) ? byType[type] : null;
                if (!Constructor) throw $sceMinErr("icontext", "Attempted to trust a value in invalid context. Context: {0}; Value: {1}", type, trustedValue);
                if (null === trustedValue || isUndefined(trustedValue) || "" === trustedValue) return trustedValue;
                if ("string" != typeof trustedValue) throw $sceMinErr("itype", "Attempted to trust a non-string value in a content requiring a string: Context: {0}", type);
                return new Constructor(trustedValue);
            }
            function valueOf(maybeTrusted) {
                return maybeTrusted instanceof trustedValueHolderBase ? maybeTrusted.$$unwrapTrustedValue() : maybeTrusted;
            }
            function getTrusted(type, maybeTrusted) {
                if (null === maybeTrusted || isUndefined(maybeTrusted) || "" === maybeTrusted) return maybeTrusted;
                var constructor = byType.hasOwnProperty(type) ? byType[type] : null;
                if (constructor && maybeTrusted instanceof constructor) return maybeTrusted.$$unwrapTrustedValue();
                if (type === SCE_CONTEXTS.RESOURCE_URL) {
                    if (isResourceUrlAllowedByPolicy(maybeTrusted)) return maybeTrusted;
                    throw $sceMinErr("insecurl", "Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}", maybeTrusted.toString());
                }
                if (type === SCE_CONTEXTS.HTML) return htmlSanitizer(maybeTrusted);
                throw $sceMinErr("unsafe", "Attempting to use an unsafe value in a safe context.");
            }
            var htmlSanitizer = function(html) {
                throw $sceMinErr("unsafe", "Attempting to use an unsafe value in a safe context.");
            };
            $injector.has("$sanitize") && (htmlSanitizer = $injector.get("$sanitize"));
            var trustedValueHolderBase = generateHolderType(), byType = {};
            return byType[SCE_CONTEXTS.HTML] = generateHolderType(trustedValueHolderBase), byType[SCE_CONTEXTS.CSS] = generateHolderType(trustedValueHolderBase), 
            byType[SCE_CONTEXTS.URL] = generateHolderType(trustedValueHolderBase), byType[SCE_CONTEXTS.JS] = generateHolderType(trustedValueHolderBase), 
            byType[SCE_CONTEXTS.RESOURCE_URL] = generateHolderType(byType[SCE_CONTEXTS.URL]), 
            {
                trustAs: trustAs,
                getTrusted: getTrusted,
                valueOf: valueOf
            };
        } ];
    }
    function $SceProvider() {
        var enabled = !0;
        this.enabled = function(value) {
            return arguments.length && (enabled = !!value), enabled;
        }, this.$get = [ "$parse", "$sceDelegate", function($parse, $sceDelegate) {
            if (enabled && 8 > msie) throw $sceMinErr("iequirks", "Strict Contextual Escaping does not support Internet Explorer version < 11 in quirks mode.  You can fix this by adding the text <!doctype html> to the top of your HTML document.  See http://docs.angularjs.org/api/ng.$sce for more information.");
            var sce = shallowCopy(SCE_CONTEXTS);
            sce.isEnabled = function() {
                return enabled;
            }, sce.trustAs = $sceDelegate.trustAs, sce.getTrusted = $sceDelegate.getTrusted, 
            sce.valueOf = $sceDelegate.valueOf, enabled || (sce.trustAs = sce.getTrusted = function(type, value) {
                return value;
            }, sce.valueOf = identity), sce.parseAs = function(type, expr) {
                var parsed = $parse(expr);
                return parsed.literal && parsed.constant ? parsed : $parse(expr, function(value) {
                    return sce.getTrusted(type, value);
                });
            };
            var parse = sce.parseAs, getTrusted = sce.getTrusted, trustAs = sce.trustAs;
            return forEach(SCE_CONTEXTS, function(enumValue, name) {
                var lName = lowercase(name);
                sce[camelCase("parse_as_" + lName)] = function(expr) {
                    return parse(enumValue, expr);
                }, sce[camelCase("get_trusted_" + lName)] = function(value) {
                    return getTrusted(enumValue, value);
                }, sce[camelCase("trust_as_" + lName)] = function(value) {
                    return trustAs(enumValue, value);
                };
            }), sce;
        } ];
    }
    function $SnifferProvider() {
        this.$get = [ "$window", "$document", function($window, $document) {
            var vendorPrefix, match, eventSupport = {}, android = toInt((/android (\d+)/.exec(lowercase(($window.navigator || {}).userAgent)) || [])[1]), boxee = /Boxee/i.test(($window.navigator || {}).userAgent), document = $document[0] || {}, vendorRegex = /^(Moz|webkit|ms)(?=[A-Z])/, bodyStyle = document.body && document.body.style, transitions = !1, animations = !1;
            if (bodyStyle) {
                for (var prop in bodyStyle) if (match = vendorRegex.exec(prop)) {
                    vendorPrefix = match[0], vendorPrefix = vendorPrefix.substr(0, 1).toUpperCase() + vendorPrefix.substr(1);
                    break;
                }
                vendorPrefix || (vendorPrefix = "WebkitOpacity" in bodyStyle && "webkit"), transitions = !!("transition" in bodyStyle || vendorPrefix + "Transition" in bodyStyle), 
                animations = !!("animation" in bodyStyle || vendorPrefix + "Animation" in bodyStyle), 
                !android || transitions && animations || (transitions = isString(bodyStyle.webkitTransition), 
                animations = isString(bodyStyle.webkitAnimation));
            }
            return {
                history: !(!$window.history || !$window.history.pushState || 4 > android || boxee),
                hasEvent: function(event) {
                    if ("input" === event && 11 >= msie) return !1;
                    if (isUndefined(eventSupport[event])) {
                        var divElm = document.createElement("div");
                        eventSupport[event] = "on" + event in divElm;
                    }
                    return eventSupport[event];
                },
                csp: csp(),
                vendorPrefix: vendorPrefix,
                transitions: transitions,
                animations: animations,
                android: android
            };
        } ];
    }
    function $TemplateRequestProvider() {
        this.$get = [ "$templateCache", "$http", "$q", "$sce", function($templateCache, $http, $q, $sce) {
            function handleRequestFn(tpl, ignoreRequestError) {
                function handleError(resp) {
                    if (!ignoreRequestError) throw $compileMinErr("tpload", "Failed to load template: {0} (HTTP status: {1} {2})", tpl, resp.status, resp.statusText);
                    return $q.reject(resp);
                }
                handleRequestFn.totalPendingRequests++, isString(tpl) && $templateCache.get(tpl) || (tpl = $sce.getTrustedResourceUrl(tpl));
                var transformResponse = $http.defaults && $http.defaults.transformResponse;
                isArray(transformResponse) ? transformResponse = transformResponse.filter(function(transformer) {
                    return transformer !== defaultHttpResponseTransform;
                }) : transformResponse === defaultHttpResponseTransform && (transformResponse = null);
                var httpOptions = {
                    cache: $templateCache,
                    transformResponse: transformResponse
                };
                return $http.get(tpl, httpOptions)["finally"](function() {
                    handleRequestFn.totalPendingRequests--;
                }).then(function(response) {
                    return $templateCache.put(tpl, response.data), response.data;
                }, handleError);
            }
            return handleRequestFn.totalPendingRequests = 0, handleRequestFn;
        } ];
    }
    function $$TestabilityProvider() {
        this.$get = [ "$rootScope", "$browser", "$location", function($rootScope, $browser, $location) {
            var testability = {};
            return testability.findBindings = function(element, expression, opt_exactMatch) {
                var bindings = element.getElementsByClassName("ng-binding"), matches = [];
                return forEach(bindings, function(binding) {
                    var dataBinding = angular.element(binding).data("$binding");
                    dataBinding && forEach(dataBinding, function(bindingName) {
                        if (opt_exactMatch) {
                            var matcher = new RegExp("(^|\\s)" + escapeForRegexp(expression) + "(\\s|\\||$)");
                            matcher.test(bindingName) && matches.push(binding);
                        } else -1 != bindingName.indexOf(expression) && matches.push(binding);
                    });
                }), matches;
            }, testability.findModels = function(element, expression, opt_exactMatch) {
                for (var prefixes = [ "ng-", "data-ng-", "ng\\:" ], p = 0; p < prefixes.length; ++p) {
                    var attributeEquals = opt_exactMatch ? "=" : "*=", selector = "[" + prefixes[p] + "model" + attributeEquals + '"' + expression + '"]', elements = element.querySelectorAll(selector);
                    if (elements.length) return elements;
                }
            }, testability.getLocation = function() {
                return $location.url();
            }, testability.setLocation = function(url) {
                url !== $location.url() && ($location.url(url), $rootScope.$digest());
            }, testability.whenStable = function(callback) {
                $browser.notifyWhenNoOutstandingRequests(callback);
            }, testability;
        } ];
    }
    function $TimeoutProvider() {
        this.$get = [ "$rootScope", "$browser", "$q", "$$q", "$exceptionHandler", function($rootScope, $browser, $q, $$q, $exceptionHandler) {
            function timeout(fn, delay, invokeApply) {
                isFunction(fn) || (invokeApply = delay, delay = fn, fn = noop);
                var timeoutId, args = sliceArgs(arguments, 3), skipApply = isDefined(invokeApply) && !invokeApply, deferred = (skipApply ? $$q : $q).defer(), promise = deferred.promise;
                return timeoutId = $browser.defer(function() {
                    try {
                        deferred.resolve(fn.apply(null, args));
                    } catch (e) {
                        deferred.reject(e), $exceptionHandler(e);
                    } finally {
                        delete deferreds[promise.$$timeoutId];
                    }
                    skipApply || $rootScope.$apply();
                }, delay), promise.$$timeoutId = timeoutId, deferreds[timeoutId] = deferred, promise;
            }
            var deferreds = {};
            return timeout.cancel = function(promise) {
                return promise && promise.$$timeoutId in deferreds ? (deferreds[promise.$$timeoutId].reject("canceled"), 
                delete deferreds[promise.$$timeoutId], $browser.defer.cancel(promise.$$timeoutId)) : !1;
            }, timeout;
        } ];
    }
    function urlResolve(url) {
        var href = url;
        return msie && (urlParsingNode.setAttribute("href", href), href = urlParsingNode.href), 
        urlParsingNode.setAttribute("href", href), {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: "/" === urlParsingNode.pathname.charAt(0) ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
    }
    function urlIsSameOrigin(requestUrl) {
        var parsed = isString(requestUrl) ? urlResolve(requestUrl) : requestUrl;
        return parsed.protocol === originUrl.protocol && parsed.host === originUrl.host;
    }
    function $WindowProvider() {
        this.$get = valueFn(window);
    }
    function $$CookieReader($document) {
        function safeDecodeURIComponent(str) {
            try {
                return decodeURIComponent(str);
            } catch (e) {
                return str;
            }
        }
        var rawDocument = $document[0] || {}, lastCookies = {}, lastCookieString = "";
        return function() {
            var cookieArray, cookie, i, index, name, currentCookieString = rawDocument.cookie || "";
            if (currentCookieString !== lastCookieString) for (lastCookieString = currentCookieString, 
            cookieArray = lastCookieString.split("; "), lastCookies = {}, i = 0; i < cookieArray.length; i++) cookie = cookieArray[i], 
            index = cookie.indexOf("="), index > 0 && (name = safeDecodeURIComponent(cookie.substring(0, index)), 
            isUndefined(lastCookies[name]) && (lastCookies[name] = safeDecodeURIComponent(cookie.substring(index + 1))));
            return lastCookies;
        };
    }
    function $$CookieReaderProvider() {
        this.$get = $$CookieReader;
    }
    function $FilterProvider($provide) {
        function register(name, factory) {
            if (isObject(name)) {
                var filters = {};
                return forEach(name, function(filter, key) {
                    filters[key] = register(key, filter);
                }), filters;
            }
            return $provide.factory(name + suffix, factory);
        }
        var suffix = "Filter";
        this.register = register, this.$get = [ "$injector", function($injector) {
            return function(name) {
                return $injector.get(name + suffix);
            };
        } ], register("currency", currencyFilter), register("date", dateFilter), register("filter", filterFilter), 
        register("json", jsonFilter), register("limitTo", limitToFilter), register("lowercase", lowercaseFilter), 
        register("number", numberFilter), register("orderBy", orderByFilter), register("uppercase", uppercaseFilter);
    }
    function filterFilter() {
        return function(array, expression, comparator) {
            if (!isArrayLike(array)) {
                if (null == array) return array;
                throw minErr("filter")("notarray", "Expected array but received: {0}", array);
            }
            var predicateFn, matchAgainstAnyProp, expressionType = getTypeForFilter(expression);
            switch (expressionType) {
              case "function":
                predicateFn = expression;
                break;

              case "boolean":
              case "null":
              case "number":
              case "string":
                matchAgainstAnyProp = !0;

              case "object":
                predicateFn = createPredicateFn(expression, comparator, matchAgainstAnyProp);
                break;

              default:
                return array;
            }
            return Array.prototype.filter.call(array, predicateFn);
        };
    }
    function createPredicateFn(expression, comparator, matchAgainstAnyProp) {
        var predicateFn, shouldMatchPrimitives = isObject(expression) && "$" in expression;
        return comparator === !0 ? comparator = equals : isFunction(comparator) || (comparator = function(actual, expected) {
            return isUndefined(actual) ? !1 : null === actual || null === expected ? actual === expected : isObject(expected) || isObject(actual) && !hasCustomToString(actual) ? !1 : (actual = lowercase("" + actual), 
            expected = lowercase("" + expected), -1 !== actual.indexOf(expected));
        }), predicateFn = function(item) {
            return shouldMatchPrimitives && !isObject(item) ? deepCompare(item, expression.$, comparator, !1) : deepCompare(item, expression, comparator, matchAgainstAnyProp);
        };
    }
    function deepCompare(actual, expected, comparator, matchAgainstAnyProp, dontMatchWholeObject) {
        var actualType = getTypeForFilter(actual), expectedType = getTypeForFilter(expected);
        if ("string" === expectedType && "!" === expected.charAt(0)) return !deepCompare(actual, expected.substring(1), comparator, matchAgainstAnyProp);
        if (isArray(actual)) return actual.some(function(item) {
            return deepCompare(item, expected, comparator, matchAgainstAnyProp);
        });
        switch (actualType) {
          case "object":
            var key;
            if (matchAgainstAnyProp) {
                for (key in actual) if ("$" !== key.charAt(0) && deepCompare(actual[key], expected, comparator, !0)) return !0;
                return dontMatchWholeObject ? !1 : deepCompare(actual, expected, comparator, !1);
            }
            if ("object" === expectedType) {
                for (key in expected) {
                    var expectedVal = expected[key];
                    if (!isFunction(expectedVal) && !isUndefined(expectedVal)) {
                        var matchAnyProperty = "$" === key, actualVal = matchAnyProperty ? actual : actual[key];
                        if (!deepCompare(actualVal, expectedVal, comparator, matchAnyProperty, matchAnyProperty)) return !1;
                    }
                }
                return !0;
            }
            return comparator(actual, expected);

          case "function":
            return !1;

          default:
            return comparator(actual, expected);
        }
    }
    function getTypeForFilter(val) {
        return null === val ? "null" : typeof val;
    }
    function currencyFilter($locale) {
        var formats = $locale.NUMBER_FORMATS;
        return function(amount, currencySymbol, fractionSize) {
            return isUndefined(currencySymbol) && (currencySymbol = formats.CURRENCY_SYM), isUndefined(fractionSize) && (fractionSize = formats.PATTERNS[1].maxFrac), 
            null == amount ? amount : formatNumber(amount, formats.PATTERNS[1], formats.GROUP_SEP, formats.DECIMAL_SEP, fractionSize).replace(/\u00A4/g, currencySymbol);
        };
    }
    function numberFilter($locale) {
        var formats = $locale.NUMBER_FORMATS;
        return function(number, fractionSize) {
            return null == number ? number : formatNumber(number, formats.PATTERNS[0], formats.GROUP_SEP, formats.DECIMAL_SEP, fractionSize);
        };
    }
    function formatNumber(number, pattern, groupSep, decimalSep, fractionSize) {
        if (isObject(number)) return "";
        var isNegative = 0 > number;
        number = Math.abs(number);
        var isInfinity = number === 1 / 0;
        if (!isInfinity && !isFinite(number)) return "";
        var numStr = number + "", formatedText = "", hasExponent = !1, parts = [];
        if (isInfinity && (formatedText = "∞"), !isInfinity && -1 !== numStr.indexOf("e")) {
            var match = numStr.match(/([\d\.]+)e(-?)(\d+)/);
            match && "-" == match[2] && match[3] > fractionSize + 1 ? number = 0 : (formatedText = numStr, 
            hasExponent = !0);
        }
        if (isInfinity || hasExponent) fractionSize > 0 && 1 > number && (formatedText = number.toFixed(fractionSize), 
        number = parseFloat(formatedText)); else {
            var fractionLen = (numStr.split(DECIMAL_SEP)[1] || "").length;
            isUndefined(fractionSize) && (fractionSize = Math.min(Math.max(pattern.minFrac, fractionLen), pattern.maxFrac)), 
            number = +(Math.round(+(number.toString() + "e" + fractionSize)).toString() + "e" + -fractionSize);
            var fraction = ("" + number).split(DECIMAL_SEP), whole = fraction[0];
            fraction = fraction[1] || "";
            var i, pos = 0, lgroup = pattern.lgSize, group = pattern.gSize;
            if (whole.length >= lgroup + group) for (pos = whole.length - lgroup, i = 0; pos > i; i++) (pos - i) % group === 0 && 0 !== i && (formatedText += groupSep), 
            formatedText += whole.charAt(i);
            for (i = pos; i < whole.length; i++) (whole.length - i) % lgroup === 0 && 0 !== i && (formatedText += groupSep), 
            formatedText += whole.charAt(i);
            for (;fraction.length < fractionSize; ) fraction += "0";
            fractionSize && "0" !== fractionSize && (formatedText += decimalSep + fraction.substr(0, fractionSize));
        }
        return 0 === number && (isNegative = !1), parts.push(isNegative ? pattern.negPre : pattern.posPre, formatedText, isNegative ? pattern.negSuf : pattern.posSuf), 
        parts.join("");
    }
    function padNumber(num, digits, trim) {
        var neg = "";
        for (0 > num && (neg = "-", num = -num), num = "" + num; num.length < digits; ) num = "0" + num;
        return trim && (num = num.substr(num.length - digits)), neg + num;
    }
    function dateGetter(name, size, offset, trim) {
        return offset = offset || 0, function(date) {
            var value = date["get" + name]();
            return (offset > 0 || value > -offset) && (value += offset), 0 === value && -12 == offset && (value = 12), 
            padNumber(value, size, trim);
        };
    }
    function dateStrGetter(name, shortForm) {
        return function(date, formats) {
            var value = date["get" + name](), get = uppercase(shortForm ? "SHORT" + name : name);
            return formats[get][value];
        };
    }
    function timeZoneGetter(date, formats, offset) {
        var zone = -1 * offset, paddedZone = zone >= 0 ? "+" : "";
        return paddedZone += padNumber(Math[zone > 0 ? "floor" : "ceil"](zone / 60), 2) + padNumber(Math.abs(zone % 60), 2);
    }
    function getFirstThursdayOfYear(year) {
        var dayOfWeekOnFirst = new Date(year, 0, 1).getDay();
        return new Date(year, 0, (4 >= dayOfWeekOnFirst ? 5 : 12) - dayOfWeekOnFirst);
    }
    function getThursdayThisWeek(datetime) {
        return new Date(datetime.getFullYear(), datetime.getMonth(), datetime.getDate() + (4 - datetime.getDay()));
    }
    function weekGetter(size) {
        return function(date) {
            var firstThurs = getFirstThursdayOfYear(date.getFullYear()), thisThurs = getThursdayThisWeek(date), diff = +thisThurs - +firstThurs, result = 1 + Math.round(diff / 6048e5);
            return padNumber(result, size);
        };
    }
    function ampmGetter(date, formats) {
        return date.getHours() < 12 ? formats.AMPMS[0] : formats.AMPMS[1];
    }
    function eraGetter(date, formats) {
        return date.getFullYear() <= 0 ? formats.ERAS[0] : formats.ERAS[1];
    }
    function longEraGetter(date, formats) {
        return date.getFullYear() <= 0 ? formats.ERANAMES[0] : formats.ERANAMES[1];
    }
    function dateFilter($locale) {
        function jsonStringToDate(string) {
            var match;
            if (match = string.match(R_ISO8601_STR)) {
                var date = new Date(0), tzHour = 0, tzMin = 0, dateSetter = match[8] ? date.setUTCFullYear : date.setFullYear, timeSetter = match[8] ? date.setUTCHours : date.setHours;
                match[9] && (tzHour = toInt(match[9] + match[10]), tzMin = toInt(match[9] + match[11])), 
                dateSetter.call(date, toInt(match[1]), toInt(match[2]) - 1, toInt(match[3]));
                var h = toInt(match[4] || 0) - tzHour, m = toInt(match[5] || 0) - tzMin, s = toInt(match[6] || 0), ms = Math.round(1e3 * parseFloat("0." + (match[7] || 0)));
                return timeSetter.call(date, h, m, s, ms), date;
            }
            return string;
        }
        var R_ISO8601_STR = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
        return function(date, format, timezone) {
            var fn, match, text = "", parts = [];
            if (format = format || "mediumDate", format = $locale.DATETIME_FORMATS[format] || format, 
            isString(date) && (date = NUMBER_STRING.test(date) ? toInt(date) : jsonStringToDate(date)), 
            isNumber(date) && (date = new Date(date)), !isDate(date) || !isFinite(date.getTime())) return date;
            for (;format; ) match = DATE_FORMATS_SPLIT.exec(format), match ? (parts = concat(parts, match, 1), 
            format = parts.pop()) : (parts.push(format), format = null);
            var dateTimezoneOffset = date.getTimezoneOffset();
            return timezone && (dateTimezoneOffset = timezoneToOffset(timezone, date.getTimezoneOffset()), 
            date = convertTimezoneToLocal(date, timezone, !0)), forEach(parts, function(value) {
                fn = DATE_FORMATS[value], text += fn ? fn(date, $locale.DATETIME_FORMATS, dateTimezoneOffset) : value.replace(/(^'|'$)/g, "").replace(/''/g, "'");
            }), text;
        };
    }
    function jsonFilter() {
        return function(object, spacing) {
            return isUndefined(spacing) && (spacing = 2), toJson(object, spacing);
        };
    }
    function limitToFilter() {
        return function(input, limit, begin) {
            return limit = Math.abs(Number(limit)) === 1 / 0 ? Number(limit) : toInt(limit), 
            isNaN(limit) ? input : (isNumber(input) && (input = input.toString()), isArray(input) || isString(input) ? (begin = !begin || isNaN(begin) ? 0 : toInt(begin), 
            begin = 0 > begin && begin >= -input.length ? input.length + begin : begin, limit >= 0 ? input.slice(begin, begin + limit) : 0 === begin ? input.slice(limit, input.length) : input.slice(Math.max(0, begin + limit), begin)) : input);
        };
    }
    function orderByFilter($parse) {
        function processPredicates(sortPredicate, reverseOrder) {
            return reverseOrder = reverseOrder ? -1 : 1, sortPredicate.map(function(predicate) {
                var descending = 1, get = identity;
                if (isFunction(predicate)) get = predicate; else if (isString(predicate) && (("+" == predicate.charAt(0) || "-" == predicate.charAt(0)) && (descending = "-" == predicate.charAt(0) ? -1 : 1, 
                predicate = predicate.substring(1)), "" !== predicate && (get = $parse(predicate), 
                get.constant))) {
                    var key = get();
                    get = function(value) {
                        return value[key];
                    };
                }
                return {
                    get: get,
                    descending: descending * reverseOrder
                };
            });
        }
        function isPrimitive(value) {
            switch (typeof value) {
              case "number":
              case "boolean":
              case "string":
                return !0;

              default:
                return !1;
            }
        }
        function objectValue(value, index) {
            return "function" == typeof value.valueOf && (value = value.valueOf(), isPrimitive(value)) ? value : hasCustomToString(value) && (value = value.toString(), 
            isPrimitive(value)) ? value : index;
        }
        function getPredicateValue(value, index) {
            var type = typeof value;
            return null === value ? (type = "string", value = "null") : "string" === type ? value = value.toLowerCase() : "object" === type && (value = objectValue(value, index)), 
            {
                value: value,
                type: type
            };
        }
        function compare(v1, v2) {
            var result = 0;
            return v1.type === v2.type ? v1.value !== v2.value && (result = v1.value < v2.value ? -1 : 1) : result = v1.type < v2.type ? -1 : 1, 
            result;
        }
        return function(array, sortPredicate, reverseOrder) {
            function getComparisonObject(value, index) {
                return {
                    value: value,
                    predicateValues: predicates.map(function(predicate) {
                        return getPredicateValue(predicate.get(value), index);
                    })
                };
            }
            function doComparison(v1, v2) {
                for (var result = 0, index = 0, length = predicates.length; length > index && !(result = compare(v1.predicateValues[index], v2.predicateValues[index]) * predicates[index].descending); ++index) ;
                return result;
            }
            if (!isArrayLike(array)) return array;
            isArray(sortPredicate) || (sortPredicate = [ sortPredicate ]), 0 === sortPredicate.length && (sortPredicate = [ "+" ]);
            var predicates = processPredicates(sortPredicate, reverseOrder);
            predicates.push({
                get: function() {
                    return {};
                },
                descending: reverseOrder ? -1 : 1
            });
            var compareValues = Array.prototype.map.call(array, getComparisonObject);
            return compareValues.sort(doComparison), array = compareValues.map(function(item) {
                return item.value;
            });
        };
    }
    function ngDirective(directive) {
        return isFunction(directive) && (directive = {
            link: directive
        }), directive.restrict = directive.restrict || "AC", valueFn(directive);
    }
    function nullFormRenameControl(control, name) {
        control.$name = name;
    }
    function FormController(element, attrs, $scope, $animate, $interpolate) {
        var form = this, controls = [];
        form.$error = {}, form.$$success = {}, form.$pending = undefined, form.$name = $interpolate(attrs.name || attrs.ngForm || "")($scope), 
        form.$dirty = !1, form.$pristine = !0, form.$valid = !0, form.$invalid = !1, form.$submitted = !1, 
        form.$$parentForm = nullFormCtrl, form.$rollbackViewValue = function() {
            forEach(controls, function(control) {
                control.$rollbackViewValue();
            });
        }, form.$commitViewValue = function() {
            forEach(controls, function(control) {
                control.$commitViewValue();
            });
        }, form.$addControl = function(control) {
            assertNotHasOwnProperty(control.$name, "input"), controls.push(control), control.$name && (form[control.$name] = control), 
            control.$$parentForm = form;
        }, form.$$renameControl = function(control, newName) {
            var oldName = control.$name;
            form[oldName] === control && delete form[oldName], form[newName] = control, control.$name = newName;
        }, form.$removeControl = function(control) {
            control.$name && form[control.$name] === control && delete form[control.$name], 
            forEach(form.$pending, function(value, name) {
                form.$setValidity(name, null, control);
            }), forEach(form.$error, function(value, name) {
                form.$setValidity(name, null, control);
            }), forEach(form.$$success, function(value, name) {
                form.$setValidity(name, null, control);
            }), arrayRemove(controls, control), control.$$parentForm = nullFormCtrl;
        }, addSetValidityMethod({
            ctrl: this,
            $element: element,
            set: function(object, property, controller) {
                var list = object[property];
                if (list) {
                    var index = list.indexOf(controller);
                    -1 === index && list.push(controller);
                } else object[property] = [ controller ];
            },
            unset: function(object, property, controller) {
                var list = object[property];
                list && (arrayRemove(list, controller), 0 === list.length && delete object[property]);
            },
            $animate: $animate
        }), form.$setDirty = function() {
            $animate.removeClass(element, PRISTINE_CLASS), $animate.addClass(element, DIRTY_CLASS), 
            form.$dirty = !0, form.$pristine = !1, form.$$parentForm.$setDirty();
        }, form.$setPristine = function() {
            $animate.setClass(element, PRISTINE_CLASS, DIRTY_CLASS + " " + SUBMITTED_CLASS), 
            form.$dirty = !1, form.$pristine = !0, form.$submitted = !1, forEach(controls, function(control) {
                control.$setPristine();
            });
        }, form.$setUntouched = function() {
            forEach(controls, function(control) {
                control.$setUntouched();
            });
        }, form.$setSubmitted = function() {
            $animate.addClass(element, SUBMITTED_CLASS), form.$submitted = !0, form.$$parentForm.$setSubmitted();
        };
    }
    function stringBasedInputType(ctrl) {
        ctrl.$formatters.push(function(value) {
            return ctrl.$isEmpty(value) ? value : value.toString();
        });
    }
    function textInputType(scope, element, attr, ctrl, $sniffer, $browser) {
        baseInputType(scope, element, attr, ctrl, $sniffer, $browser), stringBasedInputType(ctrl);
    }
    function baseInputType(scope, element, attr, ctrl, $sniffer, $browser) {
        var type = lowercase(element[0].type);
        if (!$sniffer.android) {
            var composing = !1;
            element.on("compositionstart", function(data) {
                composing = !0;
            }), element.on("compositionend", function() {
                composing = !1, listener();
            });
        }
        var listener = function(ev) {
            if (timeout && ($browser.defer.cancel(timeout), timeout = null), !composing) {
                var value = element.val(), event = ev && ev.type;
                "password" === type || attr.ngTrim && "false" === attr.ngTrim || (value = trim(value)), 
                (ctrl.$viewValue !== value || "" === value && ctrl.$$hasNativeValidators) && ctrl.$setViewValue(value, event);
            }
        };
        if ($sniffer.hasEvent("input")) element.on("input", listener); else {
            var timeout, deferListener = function(ev, input, origValue) {
                timeout || (timeout = $browser.defer(function() {
                    timeout = null, input && input.value === origValue || listener(ev);
                }));
            };
            element.on("keydown", function(event) {
                var key = event.keyCode;
                91 === key || key > 15 && 19 > key || key >= 37 && 40 >= key || deferListener(event, this, this.value);
            }), $sniffer.hasEvent("paste") && element.on("paste cut", deferListener);
        }
        element.on("change", listener), ctrl.$render = function() {
            var value = ctrl.$isEmpty(ctrl.$viewValue) ? "" : ctrl.$viewValue;
            element.val() !== value && element.val(value);
        };
    }
    function weekParser(isoWeek, existingDate) {
        if (isDate(isoWeek)) return isoWeek;
        if (isString(isoWeek)) {
            WEEK_REGEXP.lastIndex = 0;
            var parts = WEEK_REGEXP.exec(isoWeek);
            if (parts) {
                var year = +parts[1], week = +parts[2], hours = 0, minutes = 0, seconds = 0, milliseconds = 0, firstThurs = getFirstThursdayOfYear(year), addDays = 7 * (week - 1);
                return existingDate && (hours = existingDate.getHours(), minutes = existingDate.getMinutes(), 
                seconds = existingDate.getSeconds(), milliseconds = existingDate.getMilliseconds()), 
                new Date(year, 0, firstThurs.getDate() + addDays, hours, minutes, seconds, milliseconds);
            }
        }
        return NaN;
    }
    function createDateParser(regexp, mapping) {
        return function(iso, date) {
            var parts, map;
            if (isDate(iso)) return iso;
            if (isString(iso)) {
                if ('"' == iso.charAt(0) && '"' == iso.charAt(iso.length - 1) && (iso = iso.substring(1, iso.length - 1)), 
                ISO_DATE_REGEXP.test(iso)) return new Date(iso);
                if (regexp.lastIndex = 0, parts = regexp.exec(iso)) return parts.shift(), map = date ? {
                    yyyy: date.getFullYear(),
                    MM: date.getMonth() + 1,
                    dd: date.getDate(),
                    HH: date.getHours(),
                    mm: date.getMinutes(),
                    ss: date.getSeconds(),
                    sss: date.getMilliseconds() / 1e3
                } : {
                    yyyy: 1970,
                    MM: 1,
                    dd: 1,
                    HH: 0,
                    mm: 0,
                    ss: 0,
                    sss: 0
                }, forEach(parts, function(part, index) {
                    index < mapping.length && (map[mapping[index]] = +part);
                }), new Date(map.yyyy, map.MM - 1, map.dd, map.HH, map.mm, map.ss || 0, 1e3 * map.sss || 0);
            }
            return NaN;
        };
    }
    function createDateInputType(type, regexp, parseDate, format) {
        return function(scope, element, attr, ctrl, $sniffer, $browser, $filter) {
            function isValidDate(value) {
                return value && !(value.getTime && value.getTime() !== value.getTime());
            }
            function parseObservedDateValue(val) {
                return isDefined(val) && !isDate(val) ? parseDate(val) || undefined : val;
            }
            badInputChecker(scope, element, attr, ctrl), baseInputType(scope, element, attr, ctrl, $sniffer, $browser);
            var previousDate, timezone = ctrl && ctrl.$options && ctrl.$options.timezone;
            if (ctrl.$$parserName = type, ctrl.$parsers.push(function(value) {
                if (ctrl.$isEmpty(value)) return null;
                if (regexp.test(value)) {
                    var parsedDate = parseDate(value, previousDate);
                    return timezone && (parsedDate = convertTimezoneToLocal(parsedDate, timezone)), 
                    parsedDate;
                }
                return undefined;
            }), ctrl.$formatters.push(function(value) {
                if (value && !isDate(value)) throw ngModelMinErr("datefmt", "Expected `{0}` to be a date", value);
                return isValidDate(value) ? (previousDate = value, previousDate && timezone && (previousDate = convertTimezoneToLocal(previousDate, timezone, !0)), 
                $filter("date")(value, format, timezone)) : (previousDate = null, "");
            }), isDefined(attr.min) || attr.ngMin) {
                var minVal;
                ctrl.$validators.min = function(value) {
                    return !isValidDate(value) || isUndefined(minVal) || parseDate(value) >= minVal;
                }, attr.$observe("min", function(val) {
                    minVal = parseObservedDateValue(val), ctrl.$validate();
                });
            }
            if (isDefined(attr.max) || attr.ngMax) {
                var maxVal;
                ctrl.$validators.max = function(value) {
                    return !isValidDate(value) || isUndefined(maxVal) || parseDate(value) <= maxVal;
                }, attr.$observe("max", function(val) {
                    maxVal = parseObservedDateValue(val), ctrl.$validate();
                });
            }
        };
    }
    function badInputChecker(scope, element, attr, ctrl) {
        var node = element[0], nativeValidation = ctrl.$$hasNativeValidators = isObject(node.validity);
        nativeValidation && ctrl.$parsers.push(function(value) {
            var validity = element.prop(VALIDITY_STATE_PROPERTY) || {};
            return validity.badInput && !validity.typeMismatch ? undefined : value;
        });
    }
    function numberInputType(scope, element, attr, ctrl, $sniffer, $browser) {
        if (badInputChecker(scope, element, attr, ctrl), baseInputType(scope, element, attr, ctrl, $sniffer, $browser), 
        ctrl.$$parserName = "number", ctrl.$parsers.push(function(value) {
            return ctrl.$isEmpty(value) ? null : NUMBER_REGEXP.test(value) ? parseFloat(value) : undefined;
        }), ctrl.$formatters.push(function(value) {
            if (!ctrl.$isEmpty(value)) {
                if (!isNumber(value)) throw ngModelMinErr("numfmt", "Expected `{0}` to be a number", value);
                value = value.toString();
            }
            return value;
        }), isDefined(attr.min) || attr.ngMin) {
            var minVal;
            ctrl.$validators.min = function(value) {
                return ctrl.$isEmpty(value) || isUndefined(minVal) || value >= minVal;
            }, attr.$observe("min", function(val) {
                isDefined(val) && !isNumber(val) && (val = parseFloat(val, 10)), minVal = isNumber(val) && !isNaN(val) ? val : undefined, 
                ctrl.$validate();
            });
        }
        if (isDefined(attr.max) || attr.ngMax) {
            var maxVal;
            ctrl.$validators.max = function(value) {
                return ctrl.$isEmpty(value) || isUndefined(maxVal) || maxVal >= value;
            }, attr.$observe("max", function(val) {
                isDefined(val) && !isNumber(val) && (val = parseFloat(val, 10)), maxVal = isNumber(val) && !isNaN(val) ? val : undefined, 
                ctrl.$validate();
            });
        }
    }
    function urlInputType(scope, element, attr, ctrl, $sniffer, $browser) {
        baseInputType(scope, element, attr, ctrl, $sniffer, $browser), stringBasedInputType(ctrl), 
        ctrl.$$parserName = "url", ctrl.$validators.url = function(modelValue, viewValue) {
            var value = modelValue || viewValue;
            return ctrl.$isEmpty(value) || URL_REGEXP.test(value);
        };
    }
    function emailInputType(scope, element, attr, ctrl, $sniffer, $browser) {
        baseInputType(scope, element, attr, ctrl, $sniffer, $browser), stringBasedInputType(ctrl), 
        ctrl.$$parserName = "email", ctrl.$validators.email = function(modelValue, viewValue) {
            var value = modelValue || viewValue;
            return ctrl.$isEmpty(value) || EMAIL_REGEXP.test(value);
        };
    }
    function radioInputType(scope, element, attr, ctrl) {
        isUndefined(attr.name) && element.attr("name", nextUid());
        var listener = function(ev) {
            element[0].checked && ctrl.$setViewValue(attr.value, ev && ev.type);
        };
        element.on("click", listener), ctrl.$render = function() {
            var value = attr.value;
            element[0].checked = value == ctrl.$viewValue;
        }, attr.$observe("value", ctrl.$render);
    }
    function parseConstantExpr($parse, context, name, expression, fallback) {
        var parseFn;
        if (isDefined(expression)) {
            if (parseFn = $parse(expression), !parseFn.constant) throw ngModelMinErr("constexpr", "Expected constant expression for `{0}`, but saw `{1}`.", name, expression);
            return parseFn(context);
        }
        return fallback;
    }
    function checkboxInputType(scope, element, attr, ctrl, $sniffer, $browser, $filter, $parse) {
        var trueValue = parseConstantExpr($parse, scope, "ngTrueValue", attr.ngTrueValue, !0), falseValue = parseConstantExpr($parse, scope, "ngFalseValue", attr.ngFalseValue, !1), listener = function(ev) {
            ctrl.$setViewValue(element[0].checked, ev && ev.type);
        };
        element.on("click", listener), ctrl.$render = function() {
            element[0].checked = ctrl.$viewValue;
        }, ctrl.$isEmpty = function(value) {
            return value === !1;
        }, ctrl.$formatters.push(function(value) {
            return equals(value, trueValue);
        }), ctrl.$parsers.push(function(value) {
            return value ? trueValue : falseValue;
        });
    }
    function classDirective(name, selector) {
        return name = "ngClass" + name, [ "$animate", function($animate) {
            function arrayDifference(tokens1, tokens2) {
                var values = [];
                outer: for (var i = 0; i < tokens1.length; i++) {
                    for (var token = tokens1[i], j = 0; j < tokens2.length; j++) if (token == tokens2[j]) continue outer;
                    values.push(token);
                }
                return values;
            }
            function arrayClasses(classVal) {
                var classes = [];
                return isArray(classVal) ? (forEach(classVal, function(v) {
                    classes = classes.concat(arrayClasses(v));
                }), classes) : isString(classVal) ? classVal.split(" ") : isObject(classVal) ? (forEach(classVal, function(v, k) {
                    v && (classes = classes.concat(k.split(" ")));
                }), classes) : classVal;
            }
            return {
                restrict: "AC",
                link: function(scope, element, attr) {
                    function addClasses(classes) {
                        var newClasses = digestClassCounts(classes, 1);
                        attr.$addClass(newClasses);
                    }
                    function removeClasses(classes) {
                        var newClasses = digestClassCounts(classes, -1);
                        attr.$removeClass(newClasses);
                    }
                    function digestClassCounts(classes, count) {
                        var classCounts = element.data("$classCounts") || createMap(), classesToUpdate = [];
                        return forEach(classes, function(className) {
                            (count > 0 || classCounts[className]) && (classCounts[className] = (classCounts[className] || 0) + count, 
                            classCounts[className] === +(count > 0) && classesToUpdate.push(className));
                        }), element.data("$classCounts", classCounts), classesToUpdate.join(" ");
                    }
                    function updateClasses(oldClasses, newClasses) {
                        var toAdd = arrayDifference(newClasses, oldClasses), toRemove = arrayDifference(oldClasses, newClasses);
                        toAdd = digestClassCounts(toAdd, 1), toRemove = digestClassCounts(toRemove, -1), 
                        toAdd && toAdd.length && $animate.addClass(element, toAdd), toRemove && toRemove.length && $animate.removeClass(element, toRemove);
                    }
                    function ngClassWatchAction(newVal) {
                        if (selector === !0 || scope.$index % 2 === selector) {
                            var newClasses = arrayClasses(newVal || []);
                            if (oldVal) {
                                if (!equals(newVal, oldVal)) {
                                    var oldClasses = arrayClasses(oldVal);
                                    updateClasses(oldClasses, newClasses);
                                }
                            } else addClasses(newClasses);
                        }
                        oldVal = shallowCopy(newVal);
                    }
                    var oldVal;
                    scope.$watch(attr[name], ngClassWatchAction, !0), attr.$observe("class", function(value) {
                        ngClassWatchAction(scope.$eval(attr[name]));
                    }), "ngClass" !== name && scope.$watch("$index", function($index, old$index) {
                        var mod = 1 & $index;
                        if (mod !== (1 & old$index)) {
                            var classes = arrayClasses(scope.$eval(attr[name]));
                            mod === selector ? addClasses(classes) : removeClasses(classes);
                        }
                    });
                }
            };
        } ];
    }
    function addSetValidityMethod(context) {
        function setValidity(validationErrorKey, state, controller) {
            isUndefined(state) ? createAndSet("$pending", validationErrorKey, controller) : unsetAndCleanup("$pending", validationErrorKey, controller), 
            isBoolean(state) ? state ? (unset(ctrl.$error, validationErrorKey, controller), 
            set(ctrl.$$success, validationErrorKey, controller)) : (set(ctrl.$error, validationErrorKey, controller), 
            unset(ctrl.$$success, validationErrorKey, controller)) : (unset(ctrl.$error, validationErrorKey, controller), 
            unset(ctrl.$$success, validationErrorKey, controller)), ctrl.$pending ? (cachedToggleClass(PENDING_CLASS, !0), 
            ctrl.$valid = ctrl.$invalid = undefined, toggleValidationCss("", null)) : (cachedToggleClass(PENDING_CLASS, !1), 
            ctrl.$valid = isObjectEmpty(ctrl.$error), ctrl.$invalid = !ctrl.$valid, toggleValidationCss("", ctrl.$valid));
            var combinedState;
            combinedState = ctrl.$pending && ctrl.$pending[validationErrorKey] ? undefined : ctrl.$error[validationErrorKey] ? !1 : ctrl.$$success[validationErrorKey] ? !0 : null, 
            toggleValidationCss(validationErrorKey, combinedState), ctrl.$$parentForm.$setValidity(validationErrorKey, combinedState, ctrl);
        }
        function createAndSet(name, value, controller) {
            ctrl[name] || (ctrl[name] = {}), set(ctrl[name], value, controller);
        }
        function unsetAndCleanup(name, value, controller) {
            ctrl[name] && unset(ctrl[name], value, controller), isObjectEmpty(ctrl[name]) && (ctrl[name] = undefined);
        }
        function cachedToggleClass(className, switchValue) {
            switchValue && !classCache[className] ? ($animate.addClass($element, className), 
            classCache[className] = !0) : !switchValue && classCache[className] && ($animate.removeClass($element, className), 
            classCache[className] = !1);
        }
        function toggleValidationCss(validationErrorKey, isValid) {
            validationErrorKey = validationErrorKey ? "-" + snake_case(validationErrorKey, "-") : "", 
            cachedToggleClass(VALID_CLASS + validationErrorKey, isValid === !0), cachedToggleClass(INVALID_CLASS + validationErrorKey, isValid === !1);
        }
        var ctrl = context.ctrl, $element = context.$element, classCache = {}, set = context.set, unset = context.unset, $animate = context.$animate;
        classCache[INVALID_CLASS] = !(classCache[VALID_CLASS] = $element.hasClass(VALID_CLASS)), 
        ctrl.$setValidity = setValidity;
    }
    function isObjectEmpty(obj) {
        if (obj) for (var prop in obj) if (obj.hasOwnProperty(prop)) return !1;
        return !0;
    }
    var REGEX_STRING_REGEXP = /^\/(.+)\/([a-z]*)$/, VALIDITY_STATE_PROPERTY = "validity", lowercase = function(string) {
        return isString(string) ? string.toLowerCase() : string;
    }, hasOwnProperty = Object.prototype.hasOwnProperty, uppercase = function(string) {
        return isString(string) ? string.toUpperCase() : string;
    }, manualLowercase = function(s) {
        return isString(s) ? s.replace(/[A-Z]/g, function(ch) {
            return String.fromCharCode(32 | ch.charCodeAt(0));
        }) : s;
    }, manualUppercase = function(s) {
        return isString(s) ? s.replace(/[a-z]/g, function(ch) {
            return String.fromCharCode(-33 & ch.charCodeAt(0));
        }) : s;
    };
    "i" !== "I".toLowerCase() && (lowercase = manualLowercase, uppercase = manualUppercase);
    var msie, jqLite, jQuery, angularModule, slice = [].slice, splice = [].splice, push = [].push, toString = Object.prototype.toString, getPrototypeOf = Object.getPrototypeOf, ngMinErr = minErr("ng"), angular = window.angular || (window.angular = {}), uid = 0;
    msie = document.documentMode, noop.$inject = [], identity.$inject = [];
    var skipDestroyOnNextJQueryCleanData, isArray = Array.isArray, TYPED_ARRAY_REGEXP = /^\[object (Uint8(Clamped)?)|(Uint16)|(Uint32)|(Int8)|(Int16)|(Int32)|(Float(32)|(64))Array\]$/, trim = function(value) {
        return isString(value) ? value.trim() : value;
    }, escapeForRegexp = function(s) {
        return s.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
    }, csp = function() {
        function noUnsafeEval() {
            try {
                return new Function(""), !1;
            } catch (e) {
                return !0;
            }
        }
        if (!isDefined(csp.rules)) {
            var ngCspElement = document.querySelector("[ng-csp]") || document.querySelector("[data-ng-csp]");
            if (ngCspElement) {
                var ngCspAttribute = ngCspElement.getAttribute("ng-csp") || ngCspElement.getAttribute("data-ng-csp");
                csp.rules = {
                    noUnsafeEval: !ngCspAttribute || -1 !== ngCspAttribute.indexOf("no-unsafe-eval"),
                    noInlineStyle: !ngCspAttribute || -1 !== ngCspAttribute.indexOf("no-inline-style")
                };
            } else csp.rules = {
                noUnsafeEval: noUnsafeEval(),
                noInlineStyle: !1
            };
        }
        return csp.rules;
    }, jq = function() {
        if (isDefined(jq.name_)) return jq.name_;
        var el, i, prefix, name, ii = ngAttrPrefixes.length;
        for (i = 0; ii > i; ++i) if (prefix = ngAttrPrefixes[i], el = document.querySelector("[" + prefix.replace(":", "\\:") + "jq]")) {
            name = el.getAttribute(prefix + "jq");
            break;
        }
        return jq.name_ = name;
    }, ngAttrPrefixes = [ "ng-", "data-ng-", "ng:", "x-ng-" ], SNAKE_CASE_REGEXP = /[A-Z]/g, bindJQueryFired = !1, NODE_TYPE_ELEMENT = 1, NODE_TYPE_ATTRIBUTE = 2, NODE_TYPE_TEXT = 3, NODE_TYPE_COMMENT = 8, NODE_TYPE_DOCUMENT = 9, NODE_TYPE_DOCUMENT_FRAGMENT = 11, version = {
        full: "1.4.6",
        major: 1,
        minor: 4,
        dot: 6,
        codeName: "multiplicative-elevation"
    };
    JQLite.expando = "ng339";
    var jqCache = JQLite.cache = {}, jqId = 1, addEventListenerFn = function(element, type, fn) {
        element.addEventListener(type, fn, !1);
    }, removeEventListenerFn = function(element, type, fn) {
        element.removeEventListener(type, fn, !1);
    };
    JQLite._data = function(node) {
        return this.cache[node[this.expando]] || {};
    };
    var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g, MOZ_HACK_REGEXP = /^moz([A-Z])/, MOUSE_EVENT_MAP = {
        mouseleave: "mouseout",
        mouseenter: "mouseover"
    }, jqLiteMinErr = minErr("jqLite"), SINGLE_TAG_REGEXP = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, HTML_REGEXP = /<|&#?\w+;/, TAG_NAME_REGEXP = /<([\w:]+)/, XHTML_TAG_REGEXP = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, wrapMap = {
        option: [ 1, '<select multiple="multiple">', "</select>" ],
        thead: [ 1, "<table>", "</table>" ],
        col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: [ 0, "", "" ]
    };
    wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, 
    wrapMap.th = wrapMap.td;
    var JQLitePrototype = JQLite.prototype = {
        ready: function(fn) {
            function trigger() {
                fired || (fired = !0, fn());
            }
            var fired = !1;
            "complete" === document.readyState ? setTimeout(trigger) : (this.on("DOMContentLoaded", trigger), 
            JQLite(window).on("load", trigger));
        },
        toString: function() {
            var value = [];
            return forEach(this, function(e) {
                value.push("" + e);
            }), "[" + value.join(", ") + "]";
        },
        eq: function(index) {
            return jqLite(index >= 0 ? this[index] : this[this.length + index]);
        },
        length: 0,
        push: push,
        sort: [].sort,
        splice: [].splice
    }, BOOLEAN_ATTR = {};
    forEach("multiple,selected,checked,disabled,readOnly,required,open".split(","), function(value) {
        BOOLEAN_ATTR[lowercase(value)] = value;
    });
    var BOOLEAN_ELEMENTS = {};
    forEach("input,select,option,textarea,button,form,details".split(","), function(value) {
        BOOLEAN_ELEMENTS[value] = !0;
    });
    var ALIASED_ATTR = {
        ngMinlength: "minlength",
        ngMaxlength: "maxlength",
        ngMin: "min",
        ngMax: "max",
        ngPattern: "pattern"
    };
    forEach({
        data: jqLiteData,
        removeData: jqLiteRemoveData,
        hasData: jqLiteHasData
    }, function(fn, name) {
        JQLite[name] = fn;
    }), forEach({
        data: jqLiteData,
        inheritedData: jqLiteInheritedData,
        scope: function(element) {
            return jqLite.data(element, "$scope") || jqLiteInheritedData(element.parentNode || element, [ "$isolateScope", "$scope" ]);
        },
        isolateScope: function(element) {
            return jqLite.data(element, "$isolateScope") || jqLite.data(element, "$isolateScopeNoTemplate");
        },
        controller: jqLiteController,
        injector: function(element) {
            return jqLiteInheritedData(element, "$injector");
        },
        removeAttr: function(element, name) {
            element.removeAttribute(name);
        },
        hasClass: jqLiteHasClass,
        css: function(element, name, value) {
            return name = camelCase(name), isDefined(value) ? void (element.style[name] = value) : element.style[name];
        },
        attr: function(element, name, value) {
            var nodeType = element.nodeType;
            if (nodeType !== NODE_TYPE_TEXT && nodeType !== NODE_TYPE_ATTRIBUTE && nodeType !== NODE_TYPE_COMMENT) {
                var lowercasedName = lowercase(name);
                if (BOOLEAN_ATTR[lowercasedName]) {
                    if (!isDefined(value)) return element[name] || (element.attributes.getNamedItem(name) || noop).specified ? lowercasedName : undefined;
                    value ? (element[name] = !0, element.setAttribute(name, lowercasedName)) : (element[name] = !1, 
                    element.removeAttribute(lowercasedName));
                } else if (isDefined(value)) element.setAttribute(name, value); else if (element.getAttribute) {
                    var ret = element.getAttribute(name, 2);
                    return null === ret ? undefined : ret;
                }
            }
        },
        prop: function(element, name, value) {
            return isDefined(value) ? void (element[name] = value) : element[name];
        },
        text: function() {
            function getText(element, value) {
                if (isUndefined(value)) {
                    var nodeType = element.nodeType;
                    return nodeType === NODE_TYPE_ELEMENT || nodeType === NODE_TYPE_TEXT ? element.textContent : "";
                }
                element.textContent = value;
            }
            return getText.$dv = "", getText;
        }(),
        val: function(element, value) {
            if (isUndefined(value)) {
                if (element.multiple && "select" === nodeName_(element)) {
                    var result = [];
                    return forEach(element.options, function(option) {
                        option.selected && result.push(option.value || option.text);
                    }), 0 === result.length ? null : result;
                }
                return element.value;
            }
            element.value = value;
        },
        html: function(element, value) {
            return isUndefined(value) ? element.innerHTML : (jqLiteDealoc(element, !0), void (element.innerHTML = value));
        },
        empty: jqLiteEmpty
    }, function(fn, name) {
        JQLite.prototype[name] = function(arg1, arg2) {
            var i, key, nodeCount = this.length;
            if (fn !== jqLiteEmpty && isUndefined(2 == fn.length && fn !== jqLiteHasClass && fn !== jqLiteController ? arg1 : arg2)) {
                if (isObject(arg1)) {
                    for (i = 0; nodeCount > i; i++) if (fn === jqLiteData) fn(this[i], arg1); else for (key in arg1) fn(this[i], key, arg1[key]);
                    return this;
                }
                for (var value = fn.$dv, jj = isUndefined(value) ? Math.min(nodeCount, 1) : nodeCount, j = 0; jj > j; j++) {
                    var nodeValue = fn(this[j], arg1, arg2);
                    value = value ? value + nodeValue : nodeValue;
                }
                return value;
            }
            for (i = 0; nodeCount > i; i++) fn(this[i], arg1, arg2);
            return this;
        };
    }), forEach({
        removeData: jqLiteRemoveData,
        on: function jqLiteOn(element, type, fn, unsupported) {
            if (isDefined(unsupported)) throw jqLiteMinErr("onargs", "jqLite#on() does not support the `selector` or `eventData` parameters");
            if (jqLiteAcceptsData(element)) {
                var expandoStore = jqLiteExpandoStore(element, !0), events = expandoStore.events, handle = expandoStore.handle;
                handle || (handle = expandoStore.handle = createEventHandler(element, events));
                for (var types = type.indexOf(" ") >= 0 ? type.split(" ") : [ type ], i = types.length; i--; ) {
                    type = types[i];
                    var eventFns = events[type];
                    eventFns || (events[type] = [], "mouseenter" === type || "mouseleave" === type ? jqLiteOn(element, MOUSE_EVENT_MAP[type], function(event) {
                        var target = this, related = event.relatedTarget;
                        (!related || related !== target && !target.contains(related)) && handle(event, type);
                    }) : "$destroy" !== type && addEventListenerFn(element, type, handle), eventFns = events[type]), 
                    eventFns.push(fn);
                }
            }
        },
        off: jqLiteOff,
        one: function(element, type, fn) {
            element = jqLite(element), element.on(type, function onFn() {
                element.off(type, fn), element.off(type, onFn);
            }), element.on(type, fn);
        },
        replaceWith: function(element, replaceNode) {
            var index, parent = element.parentNode;
            jqLiteDealoc(element), forEach(new JQLite(replaceNode), function(node) {
                index ? parent.insertBefore(node, index.nextSibling) : parent.replaceChild(node, element), 
                index = node;
            });
        },
        children: function(element) {
            var children = [];
            return forEach(element.childNodes, function(element) {
                element.nodeType === NODE_TYPE_ELEMENT && children.push(element);
            }), children;
        },
        contents: function(element) {
            return element.contentDocument || element.childNodes || [];
        },
        append: function(element, node) {
            var nodeType = element.nodeType;
            if (nodeType === NODE_TYPE_ELEMENT || nodeType === NODE_TYPE_DOCUMENT_FRAGMENT) {
                node = new JQLite(node);
                for (var i = 0, ii = node.length; ii > i; i++) {
                    var child = node[i];
                    element.appendChild(child);
                }
            }
        },
        prepend: function(element, node) {
            if (element.nodeType === NODE_TYPE_ELEMENT) {
                var index = element.firstChild;
                forEach(new JQLite(node), function(child) {
                    element.insertBefore(child, index);
                });
            }
        },
        wrap: function(element, wrapNode) {
            wrapNode = jqLite(wrapNode).eq(0).clone()[0];
            var parent = element.parentNode;
            parent && parent.replaceChild(wrapNode, element), wrapNode.appendChild(element);
        },
        remove: jqLiteRemove,
        detach: function(element) {
            jqLiteRemove(element, !0);
        },
        after: function(element, newElement) {
            var index = element, parent = element.parentNode;
            newElement = new JQLite(newElement);
            for (var i = 0, ii = newElement.length; ii > i; i++) {
                var node = newElement[i];
                parent.insertBefore(node, index.nextSibling), index = node;
            }
        },
        addClass: jqLiteAddClass,
        removeClass: jqLiteRemoveClass,
        toggleClass: function(element, selector, condition) {
            selector && forEach(selector.split(" "), function(className) {
                var classCondition = condition;
                isUndefined(classCondition) && (classCondition = !jqLiteHasClass(element, className)), 
                (classCondition ? jqLiteAddClass : jqLiteRemoveClass)(element, className);
            });
        },
        parent: function(element) {
            var parent = element.parentNode;
            return parent && parent.nodeType !== NODE_TYPE_DOCUMENT_FRAGMENT ? parent : null;
        },
        next: function(element) {
            return element.nextElementSibling;
        },
        find: function(element, selector) {
            return element.getElementsByTagName ? element.getElementsByTagName(selector) : [];
        },
        clone: jqLiteClone,
        triggerHandler: function(element, event, extraParameters) {
            var dummyEvent, eventFnsCopy, handlerArgs, eventName = event.type || event, expandoStore = jqLiteExpandoStore(element), events = expandoStore && expandoStore.events, eventFns = events && events[eventName];
            eventFns && (dummyEvent = {
                preventDefault: function() {
                    this.defaultPrevented = !0;
                },
                isDefaultPrevented: function() {
                    return this.defaultPrevented === !0;
                },
                stopImmediatePropagation: function() {
                    this.immediatePropagationStopped = !0;
                },
                isImmediatePropagationStopped: function() {
                    return this.immediatePropagationStopped === !0;
                },
                stopPropagation: noop,
                type: eventName,
                target: element
            }, event.type && (dummyEvent = extend(dummyEvent, event)), eventFnsCopy = shallowCopy(eventFns), 
            handlerArgs = extraParameters ? [ dummyEvent ].concat(extraParameters) : [ dummyEvent ], 
            forEach(eventFnsCopy, function(fn) {
                dummyEvent.isImmediatePropagationStopped() || fn.apply(element, handlerArgs);
            }));
        }
    }, function(fn, name) {
        JQLite.prototype[name] = function(arg1, arg2, arg3) {
            for (var value, i = 0, ii = this.length; ii > i; i++) isUndefined(value) ? (value = fn(this[i], arg1, arg2, arg3), 
            isDefined(value) && (value = jqLite(value))) : jqLiteAddNodes(value, fn(this[i], arg1, arg2, arg3));
            return isDefined(value) ? value : this;
        }, JQLite.prototype.bind = JQLite.prototype.on, JQLite.prototype.unbind = JQLite.prototype.off;
    }), HashMap.prototype = {
        put: function(key, value) {
            this[hashKey(key, this.nextUid)] = value;
        },
        get: function(key) {
            return this[hashKey(key, this.nextUid)];
        },
        remove: function(key) {
            var value = this[key = hashKey(key, this.nextUid)];
            return delete this[key], value;
        }
    };
    var $$HashMapProvider = [ function() {
        this.$get = [ function() {
            return HashMap;
        } ];
    } ], FN_ARGS = /^[^\(]*\(\s*([^\)]*)\)/m, FN_ARG_SPLIT = /,/, FN_ARG = /^\s*(_?)(\S+?)\1\s*$/, STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm, $injectorMinErr = minErr("$injector");
    createInjector.$$annotate = annotate;
    var $animateMinErr = minErr("$animate"), ELEMENT_NODE = 1, NG_ANIMATE_CLASSNAME = "ng-animate", $$CoreAnimateRunnerProvider = function() {
        this.$get = [ "$q", "$$rAF", function($q, $$rAF) {
            function AnimateRunner() {}
            return AnimateRunner.all = noop, AnimateRunner.chain = noop, AnimateRunner.prototype = {
                end: noop,
                cancel: noop,
                resume: noop,
                pause: noop,
                complete: noop,
                then: function(pass, fail) {
                    return $q(function(resolve) {
                        $$rAF(function() {
                            resolve();
                        });
                    }).then(pass, fail);
                }
            }, AnimateRunner;
        } ];
    }, $$CoreAnimateQueueProvider = function() {
        var postDigestQueue = new HashMap(), postDigestElements = [];
        this.$get = [ "$$AnimateRunner", "$rootScope", function($$AnimateRunner, $rootScope) {
            function updateData(data, classes, value) {
                var changed = !1;
                return classes && (classes = isString(classes) ? classes.split(" ") : isArray(classes) ? classes : [], 
                forEach(classes, function(className) {
                    className && (changed = !0, data[className] = value);
                })), changed;
            }
            function handleCSSClassChanges() {
                forEach(postDigestElements, function(element) {
                    var data = postDigestQueue.get(element);
                    if (data) {
                        var existing = splitClasses(element.attr("class")), toAdd = "", toRemove = "";
                        forEach(data, function(status, className) {
                            var hasClass = !!existing[className];
                            status !== hasClass && (status ? toAdd += (toAdd.length ? " " : "") + className : toRemove += (toRemove.length ? " " : "") + className);
                        }), forEach(element, function(elm) {
                            toAdd && jqLiteAddClass(elm, toAdd), toRemove && jqLiteRemoveClass(elm, toRemove);
                        }), postDigestQueue.remove(element);
                    }
                }), postDigestElements.length = 0;
            }
            function addRemoveClassesPostDigest(element, add, remove) {
                var data = postDigestQueue.get(element) || {}, classesAdded = updateData(data, add, !0), classesRemoved = updateData(data, remove, !1);
                (classesAdded || classesRemoved) && (postDigestQueue.put(element, data), postDigestElements.push(element), 
                1 === postDigestElements.length && $rootScope.$$postDigest(handleCSSClassChanges));
            }
            return {
                enabled: noop,
                on: noop,
                off: noop,
                pin: noop,
                push: function(element, event, options, domOperation) {
                    return domOperation && domOperation(), options = options || {}, options.from && element.css(options.from), 
                    options.to && element.css(options.to), (options.addClass || options.removeClass) && addRemoveClassesPostDigest(element, options.addClass, options.removeClass), 
                    new $$AnimateRunner();
                }
            };
        } ];
    }, $AnimateProvider = [ "$provide", function($provide) {
        var provider = this;
        this.$$registeredAnimations = Object.create(null), this.register = function(name, factory) {
            if (name && "." !== name.charAt(0)) throw $animateMinErr("notcsel", "Expecting class selector starting with '.' got '{0}'.", name);
            var key = name + "-animation";
            provider.$$registeredAnimations[name.substr(1)] = key, $provide.factory(key, factory);
        }, this.classNameFilter = function(expression) {
            if (1 === arguments.length && (this.$$classNameFilter = expression instanceof RegExp ? expression : null, 
            this.$$classNameFilter)) {
                var reservedRegex = new RegExp("(\\s+|\\/)" + NG_ANIMATE_CLASSNAME + "(\\s+|\\/)");
                if (reservedRegex.test(this.$$classNameFilter.toString())) throw $animateMinErr("nongcls", '$animateProvider.classNameFilter(regex) prohibits accepting a regex value which matches/contains the "{0}" CSS class.', NG_ANIMATE_CLASSNAME);
            }
            return this.$$classNameFilter;
        }, this.$get = [ "$$animateQueue", function($$animateQueue) {
            function domInsert(element, parentElement, afterElement) {
                if (afterElement) {
                    var afterNode = extractElementNode(afterElement);
                    !afterNode || afterNode.parentNode || afterNode.previousElementSibling || (afterElement = null);
                }
                afterElement ? afterElement.after(element) : parentElement.prepend(element);
            }
            return {
                on: $$animateQueue.on,
                off: $$animateQueue.off,
                pin: $$animateQueue.pin,
                enabled: $$animateQueue.enabled,
                cancel: function(runner) {
                    runner.end && runner.end();
                },
                enter: function(element, parent, after, options) {
                    return parent = parent && jqLite(parent), after = after && jqLite(after), parent = parent || after.parent(), 
                    domInsert(element, parent, after), $$animateQueue.push(element, "enter", prepareAnimateOptions(options));
                },
                move: function(element, parent, after, options) {
                    return parent = parent && jqLite(parent), after = after && jqLite(after), parent = parent || after.parent(), 
                    domInsert(element, parent, after), $$animateQueue.push(element, "move", prepareAnimateOptions(options));
                },
                leave: function(element, options) {
                    return $$animateQueue.push(element, "leave", prepareAnimateOptions(options), function() {
                        element.remove();
                    });
                },
                addClass: function(element, className, options) {
                    return options = prepareAnimateOptions(options), options.addClass = mergeClasses(options.addclass, className), 
                    $$animateQueue.push(element, "addClass", options);
                },
                removeClass: function(element, className, options) {
                    return options = prepareAnimateOptions(options), options.removeClass = mergeClasses(options.removeClass, className), 
                    $$animateQueue.push(element, "removeClass", options);
                },
                setClass: function(element, add, remove, options) {
                    return options = prepareAnimateOptions(options), options.addClass = mergeClasses(options.addClass, add), 
                    options.removeClass = mergeClasses(options.removeClass, remove), $$animateQueue.push(element, "setClass", options);
                },
                animate: function(element, from, to, className, options) {
                    return options = prepareAnimateOptions(options), options.from = options.from ? extend(options.from, from) : from, 
                    options.to = options.to ? extend(options.to, to) : to, className = className || "ng-inline-animate", 
                    options.tempClasses = mergeClasses(options.tempClasses, className), $$animateQueue.push(element, "animate", options);
                }
            };
        } ];
    } ], $CoreAnimateCssProvider = function() {
        this.$get = [ "$$rAF", "$q", function($$rAF, $q) {
            var RAFPromise = function() {};
            return RAFPromise.prototype = {
                done: function(cancel) {
                    this.defer && this.defer[cancel === !0 ? "reject" : "resolve"]();
                },
                end: function() {
                    this.done();
                },
                cancel: function() {
                    this.done(!0);
                },
                getPromise: function() {
                    return this.defer || (this.defer = $q.defer()), this.defer.promise;
                },
                then: function(f1, f2) {
                    return this.getPromise().then(f1, f2);
                },
                "catch": function(f1) {
                    return this.getPromise()["catch"](f1);
                },
                "finally": function(f1) {
                    return this.getPromise()["finally"](f1);
                }
            }, function(element, options) {
                function run() {
                    return $$rAF(function() {
                        close(), closed || runner.done(), closed = !0;
                    }), runner;
                }
                function close() {
                    options.addClass && (element.addClass(options.addClass), options.addClass = null), 
                    options.removeClass && (element.removeClass(options.removeClass), options.removeClass = null), 
                    options.to && (element.css(options.to), options.to = null);
                }
                options.from && (element.css(options.from), options.from = null);
                var closed, runner = new RAFPromise();
                return {
                    start: run,
                    end: run
                };
            };
        } ];
    }, $compileMinErr = minErr("$compile");
    $CompileProvider.$inject = [ "$provide", "$$sanitizeUriProvider" ];
    var PREFIX_REGEXP = /^((?:x|data)[\:\-_])/i, $controllerMinErr = minErr("$controller"), CNTRL_REG = /^(\S+)(\s+as\s+(\w+))?$/, $$ForceReflowProvider = function() {
        this.$get = [ "$document", function($document) {
            return function(domNode) {
                return domNode ? !domNode.nodeType && domNode instanceof jqLite && (domNode = domNode[0]) : domNode = $document[0].body, 
                domNode.offsetWidth + 1;
            };
        } ];
    }, APPLICATION_JSON = "application/json", CONTENT_TYPE_APPLICATION_JSON = {
        "Content-Type": APPLICATION_JSON + ";charset=utf-8"
    }, JSON_START = /^\[|^\{(?!\{)/, JSON_ENDS = {
        "[": /]$/,
        "{": /}$/
    }, JSON_PROTECTION_PREFIX = /^\)\]\}',?\n/, $httpMinErr = minErr("$http"), $httpMinErrLegacyFn = function(method) {
        return function() {
            throw $httpMinErr("legacy", "The method `{0}` on the promise returned from `$http` has been disabled.", method);
        };
    }, $interpolateMinErr = angular.$interpolateMinErr = minErr("$interpolate");
    $interpolateMinErr.throwNoconcat = function(text) {
        throw $interpolateMinErr("noconcat", "Error while interpolating: {0}\nStrict Contextual Escaping disallows interpolations that concatenate multiple expressions when a trusted value is required.  See http://docs.angularjs.org/api/ng.$sce", text);
    }, $interpolateMinErr.interr = function(text, err) {
        return $interpolateMinErr("interr", "Can't interpolate: {0}\n{1}", text, err.toString());
    };
    var PATH_MATCH = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/, DEFAULT_PORTS = {
        http: 80,
        https: 443,
        ftp: 21
    }, $locationMinErr = minErr("$location"), locationPrototype = {
        $$html5: !1,
        $$replace: !1,
        absUrl: locationGetter("$$absUrl"),
        url: function(url) {
            if (isUndefined(url)) return this.$$url;
            var match = PATH_MATCH.exec(url);
            return (match[1] || "" === url) && this.path(decodeURIComponent(match[1])), (match[2] || match[1] || "" === url) && this.search(match[3] || ""), 
            this.hash(match[5] || ""), this;
        },
        protocol: locationGetter("$$protocol"),
        host: locationGetter("$$host"),
        port: locationGetter("$$port"),
        path: locationGetterSetter("$$path", function(path) {
            return path = null !== path ? path.toString() : "", "/" == path.charAt(0) ? path : "/" + path;
        }),
        search: function(search, paramValue) {
            switch (arguments.length) {
              case 0:
                return this.$$search;

              case 1:
                if (isString(search) || isNumber(search)) search = search.toString(), this.$$search = parseKeyValue(search); else {
                    if (!isObject(search)) throw $locationMinErr("isrcharg", "The first argument of the `$location#search()` call must be a string or an object.");
                    search = copy(search, {}), forEach(search, function(value, key) {
                        null == value && delete search[key];
                    }), this.$$search = search;
                }
                break;

              default:
                isUndefined(paramValue) || null === paramValue ? delete this.$$search[search] : this.$$search[search] = paramValue;
            }
            return this.$$compose(), this;
        },
        hash: locationGetterSetter("$$hash", function(hash) {
            return null !== hash ? hash.toString() : "";
        }),
        replace: function() {
            return this.$$replace = !0, this;
        }
    };
    forEach([ LocationHashbangInHtml5Url, LocationHashbangUrl, LocationHtml5Url ], function(Location) {
        Location.prototype = Object.create(locationPrototype), Location.prototype.state = function(state) {
            if (!arguments.length) return this.$$state;
            if (Location !== LocationHtml5Url || !this.$$html5) throw $locationMinErr("nostate", "History API state support is available only in HTML5 mode and only in browsers supporting HTML5 History API");
            return this.$$state = isUndefined(state) ? null : state, this;
        };
    });
    var $parseMinErr = minErr("$parse"), CALL = Function.prototype.call, APPLY = Function.prototype.apply, BIND = Function.prototype.bind, OPERATORS = createMap();
    forEach("+ - * / % === !== == != < > <= >= && || ! = |".split(" "), function(operator) {
        OPERATORS[operator] = !0;
    });
    var ESCAPE = {
        n: "\n",
        f: "\f",
        r: "\r",
        t: "	",
        v: "",
        "'": "'",
        '"': '"'
    }, Lexer = function(options) {
        this.options = options;
    };
    Lexer.prototype = {
        constructor: Lexer,
        lex: function(text) {
            for (this.text = text, this.index = 0, this.tokens = []; this.index < this.text.length; ) {
                var ch = this.text.charAt(this.index);
                if ('"' === ch || "'" === ch) this.readString(ch); else if (this.isNumber(ch) || "." === ch && this.isNumber(this.peek())) this.readNumber(); else if (this.isIdent(ch)) this.readIdent(); else if (this.is(ch, "(){}[].,;:?")) this.tokens.push({
                    index: this.index,
                    text: ch
                }), this.index++; else if (this.isWhitespace(ch)) this.index++; else {
                    var ch2 = ch + this.peek(), ch3 = ch2 + this.peek(2), op1 = OPERATORS[ch], op2 = OPERATORS[ch2], op3 = OPERATORS[ch3];
                    if (op1 || op2 || op3) {
                        var token = op3 ? ch3 : op2 ? ch2 : ch;
                        this.tokens.push({
                            index: this.index,
                            text: token,
                            operator: !0
                        }), this.index += token.length;
                    } else this.throwError("Unexpected next character ", this.index, this.index + 1);
                }
            }
            return this.tokens;
        },
        is: function(ch, chars) {
            return -1 !== chars.indexOf(ch);
        },
        peek: function(i) {
            var num = i || 1;
            return this.index + num < this.text.length ? this.text.charAt(this.index + num) : !1;
        },
        isNumber: function(ch) {
            return ch >= "0" && "9" >= ch && "string" == typeof ch;
        },
        isWhitespace: function(ch) {
            return " " === ch || "\r" === ch || "	" === ch || "\n" === ch || "" === ch || " " === ch;
        },
        isIdent: function(ch) {
            return ch >= "a" && "z" >= ch || ch >= "A" && "Z" >= ch || "_" === ch || "$" === ch;
        },
        isExpOperator: function(ch) {
            return "-" === ch || "+" === ch || this.isNumber(ch);
        },
        throwError: function(error, start, end) {
            end = end || this.index;
            var colStr = isDefined(start) ? "s " + start + "-" + this.index + " [" + this.text.substring(start, end) + "]" : " " + end;
            throw $parseMinErr("lexerr", "Lexer Error: {0} at column{1} in expression [{2}].", error, colStr, this.text);
        },
        readNumber: function() {
            for (var number = "", start = this.index; this.index < this.text.length; ) {
                var ch = lowercase(this.text.charAt(this.index));
                if ("." == ch || this.isNumber(ch)) number += ch; else {
                    var peekCh = this.peek();
                    if ("e" == ch && this.isExpOperator(peekCh)) number += ch; else if (this.isExpOperator(ch) && peekCh && this.isNumber(peekCh) && "e" == number.charAt(number.length - 1)) number += ch; else {
                        if (!this.isExpOperator(ch) || peekCh && this.isNumber(peekCh) || "e" != number.charAt(number.length - 1)) break;
                        this.throwError("Invalid exponent");
                    }
                }
                this.index++;
            }
            this.tokens.push({
                index: start,
                text: number,
                constant: !0,
                value: Number(number)
            });
        },
        readIdent: function() {
            for (var start = this.index; this.index < this.text.length; ) {
                var ch = this.text.charAt(this.index);
                if (!this.isIdent(ch) && !this.isNumber(ch)) break;
                this.index++;
            }
            this.tokens.push({
                index: start,
                text: this.text.slice(start, this.index),
                identifier: !0
            });
        },
        readString: function(quote) {
            var start = this.index;
            this.index++;
            for (var string = "", rawString = quote, escape = !1; this.index < this.text.length; ) {
                var ch = this.text.charAt(this.index);
                if (rawString += ch, escape) {
                    if ("u" === ch) {
                        var hex = this.text.substring(this.index + 1, this.index + 5);
                        hex.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + hex + "]"), 
                        this.index += 4, string += String.fromCharCode(parseInt(hex, 16));
                    } else {
                        var rep = ESCAPE[ch];
                        string += rep || ch;
                    }
                    escape = !1;
                } else if ("\\" === ch) escape = !0; else {
                    if (ch === quote) return this.index++, void this.tokens.push({
                        index: start,
                        text: rawString,
                        constant: !0,
                        value: string
                    });
                    string += ch;
                }
                this.index++;
            }
            this.throwError("Unterminated quote", start);
        }
    };
    var AST = function(lexer, options) {
        this.lexer = lexer, this.options = options;
    };
    AST.Program = "Program", AST.ExpressionStatement = "ExpressionStatement", AST.AssignmentExpression = "AssignmentExpression", 
    AST.ConditionalExpression = "ConditionalExpression", AST.LogicalExpression = "LogicalExpression", 
    AST.BinaryExpression = "BinaryExpression", AST.UnaryExpression = "UnaryExpression", 
    AST.CallExpression = "CallExpression", AST.MemberExpression = "MemberExpression", 
    AST.Identifier = "Identifier", AST.Literal = "Literal", AST.ArrayExpression = "ArrayExpression", 
    AST.Property = "Property", AST.ObjectExpression = "ObjectExpression", AST.ThisExpression = "ThisExpression", 
    AST.NGValueParameter = "NGValueParameter", AST.prototype = {
        ast: function(text) {
            this.text = text, this.tokens = this.lexer.lex(text);
            var value = this.program();
            return 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]), 
            value;
        },
        program: function() {
            for (var body = []; ;) if (this.tokens.length > 0 && !this.peek("}", ")", ";", "]") && body.push(this.expressionStatement()), 
            !this.expect(";")) return {
                type: AST.Program,
                body: body
            };
        },
        expressionStatement: function() {
            return {
                type: AST.ExpressionStatement,
                expression: this.filterChain()
            };
        },
        filterChain: function() {
            for (var token, left = this.expression(); token = this.expect("|"); ) left = this.filter(left);
            return left;
        },
        expression: function() {
            return this.assignment();
        },
        assignment: function() {
            var result = this.ternary();
            return this.expect("=") && (result = {
                type: AST.AssignmentExpression,
                left: result,
                right: this.assignment(),
                operator: "="
            }), result;
        },
        ternary: function() {
            var alternate, consequent, test = this.logicalOR();
            return this.expect("?") && (alternate = this.expression(), this.consume(":")) ? (consequent = this.expression(), 
            {
                type: AST.ConditionalExpression,
                test: test,
                alternate: alternate,
                consequent: consequent
            }) : test;
        },
        logicalOR: function() {
            for (var left = this.logicalAND(); this.expect("||"); ) left = {
                type: AST.LogicalExpression,
                operator: "||",
                left: left,
                right: this.logicalAND()
            };
            return left;
        },
        logicalAND: function() {
            for (var left = this.equality(); this.expect("&&"); ) left = {
                type: AST.LogicalExpression,
                operator: "&&",
                left: left,
                right: this.equality()
            };
            return left;
        },
        equality: function() {
            for (var token, left = this.relational(); token = this.expect("==", "!=", "===", "!=="); ) left = {
                type: AST.BinaryExpression,
                operator: token.text,
                left: left,
                right: this.relational()
            };
            return left;
        },
        relational: function() {
            for (var token, left = this.additive(); token = this.expect("<", ">", "<=", ">="); ) left = {
                type: AST.BinaryExpression,
                operator: token.text,
                left: left,
                right: this.additive()
            };
            return left;
        },
        additive: function() {
            for (var token, left = this.multiplicative(); token = this.expect("+", "-"); ) left = {
                type: AST.BinaryExpression,
                operator: token.text,
                left: left,
                right: this.multiplicative()
            };
            return left;
        },
        multiplicative: function() {
            for (var token, left = this.unary(); token = this.expect("*", "/", "%"); ) left = {
                type: AST.BinaryExpression,
                operator: token.text,
                left: left,
                right: this.unary()
            };
            return left;
        },
        unary: function() {
            var token;
            return (token = this.expect("+", "-", "!")) ? {
                type: AST.UnaryExpression,
                operator: token.text,
                prefix: !0,
                argument: this.unary()
            } : this.primary();
        },
        primary: function() {
            var primary;
            this.expect("(") ? (primary = this.filterChain(), this.consume(")")) : this.expect("[") ? primary = this.arrayDeclaration() : this.expect("{") ? primary = this.object() : this.constants.hasOwnProperty(this.peek().text) ? primary = copy(this.constants[this.consume().text]) : this.peek().identifier ? primary = this.identifier() : this.peek().constant ? primary = this.constant() : this.throwError("not a primary expression", this.peek());
            for (var next; next = this.expect("(", "[", "."); ) "(" === next.text ? (primary = {
                type: AST.CallExpression,
                callee: primary,
                arguments: this.parseArguments()
            }, this.consume(")")) : "[" === next.text ? (primary = {
                type: AST.MemberExpression,
                object: primary,
                property: this.expression(),
                computed: !0
            }, this.consume("]")) : "." === next.text ? primary = {
                type: AST.MemberExpression,
                object: primary,
                property: this.identifier(),
                computed: !1
            } : this.throwError("IMPOSSIBLE");
            return primary;
        },
        filter: function(baseExpression) {
            for (var args = [ baseExpression ], result = {
                type: AST.CallExpression,
                callee: this.identifier(),
                arguments: args,
                filter: !0
            }; this.expect(":"); ) args.push(this.expression());
            return result;
        },
        parseArguments: function() {
            var args = [];
            if (")" !== this.peekToken().text) do args.push(this.expression()); while (this.expect(","));
            return args;
        },
        identifier: function() {
            var token = this.consume();
            return token.identifier || this.throwError("is not a valid identifier", token), 
            {
                type: AST.Identifier,
                name: token.text
            };
        },
        constant: function() {
            return {
                type: AST.Literal,
                value: this.consume().value
            };
        },
        arrayDeclaration: function() {
            var elements = [];
            if ("]" !== this.peekToken().text) do {
                if (this.peek("]")) break;
                elements.push(this.expression());
            } while (this.expect(","));
            return this.consume("]"), {
                type: AST.ArrayExpression,
                elements: elements
            };
        },
        object: function() {
            var property, properties = [];
            if ("}" !== this.peekToken().text) do {
                if (this.peek("}")) break;
                property = {
                    type: AST.Property,
                    kind: "init"
                }, this.peek().constant ? property.key = this.constant() : this.peek().identifier ? property.key = this.identifier() : this.throwError("invalid key", this.peek()), 
                this.consume(":"), property.value = this.expression(), properties.push(property);
            } while (this.expect(","));
            return this.consume("}"), {
                type: AST.ObjectExpression,
                properties: properties
            };
        },
        throwError: function(msg, token) {
            throw $parseMinErr("syntax", "Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].", token.text, msg, token.index + 1, this.text, this.text.substring(token.index));
        },
        consume: function(e1) {
            if (0 === this.tokens.length) throw $parseMinErr("ueoe", "Unexpected end of expression: {0}", this.text);
            var token = this.expect(e1);
            return token || this.throwError("is unexpected, expecting [" + e1 + "]", this.peek()), 
            token;
        },
        peekToken: function() {
            if (0 === this.tokens.length) throw $parseMinErr("ueoe", "Unexpected end of expression: {0}", this.text);
            return this.tokens[0];
        },
        peek: function(e1, e2, e3, e4) {
            return this.peekAhead(0, e1, e2, e3, e4);
        },
        peekAhead: function(i, e1, e2, e3, e4) {
            if (this.tokens.length > i) {
                var token = this.tokens[i], t = token.text;
                if (t === e1 || t === e2 || t === e3 || t === e4 || !e1 && !e2 && !e3 && !e4) return token;
            }
            return !1;
        },
        expect: function(e1, e2, e3, e4) {
            var token = this.peek(e1, e2, e3, e4);
            return token ? (this.tokens.shift(), token) : !1;
        },
        constants: {
            "true": {
                type: AST.Literal,
                value: !0
            },
            "false": {
                type: AST.Literal,
                value: !1
            },
            "null": {
                type: AST.Literal,
                value: null
            },
            undefined: {
                type: AST.Literal,
                value: undefined
            },
            "this": {
                type: AST.ThisExpression
            }
        }
    }, ASTCompiler.prototype = {
        compile: function(expression, expensiveChecks) {
            var self = this, ast = this.astBuilder.ast(expression);
            this.state = {
                nextId: 0,
                filters: {},
                expensiveChecks: expensiveChecks,
                fn: {
                    vars: [],
                    body: [],
                    own: {}
                },
                assign: {
                    vars: [],
                    body: [],
                    own: {}
                },
                inputs: []
            }, findConstantAndWatchExpressions(ast, self.$filter);
            var assignable, extra = "";
            if (this.stage = "assign", assignable = assignableAST(ast)) {
                this.state.computing = "assign";
                var result = this.nextId();
                this.recurse(assignable, result), this.return_(result), extra = "fn.assign=" + this.generateFunction("assign", "s,v,l");
            }
            var toWatch = getInputs(ast.body);
            self.stage = "inputs", forEach(toWatch, function(watch, key) {
                var fnKey = "fn" + key;
                self.state[fnKey] = {
                    vars: [],
                    body: [],
                    own: {}
                }, self.state.computing = fnKey;
                var intoId = self.nextId();
                self.recurse(watch, intoId), self.return_(intoId), self.state.inputs.push(fnKey), 
                watch.watchId = key;
            }), this.state.computing = "fn", this.stage = "main", this.recurse(ast);
            var fnString = '"' + this.USE + " " + this.STRICT + '";\n' + this.filterPrefix() + "var fn=" + this.generateFunction("fn", "s,l,a,i") + extra + this.watchFns() + "return fn;", fn = new Function("$filter", "ensureSafeMemberName", "ensureSafeObject", "ensureSafeFunction", "ifDefined", "plus", "text", fnString)(this.$filter, ensureSafeMemberName, ensureSafeObject, ensureSafeFunction, ifDefined, plusFn, expression);
            return this.state = this.stage = undefined, fn.literal = isLiteral(ast), fn.constant = isConstant(ast), 
            fn;
        },
        USE: "use",
        STRICT: "strict",
        watchFns: function() {
            var result = [], fns = this.state.inputs, self = this;
            return forEach(fns, function(name) {
                result.push("var " + name + "=" + self.generateFunction(name, "s"));
            }), fns.length && result.push("fn.inputs=[" + fns.join(",") + "];"), result.join("");
        },
        generateFunction: function(name, params) {
            return "function(" + params + "){" + this.varsPrefix(name) + this.body(name) + "};";
        },
        filterPrefix: function() {
            var parts = [], self = this;
            return forEach(this.state.filters, function(id, filter) {
                parts.push(id + "=$filter(" + self.escape(filter) + ")");
            }), parts.length ? "var " + parts.join(",") + ";" : "";
        },
        varsPrefix: function(section) {
            return this.state[section].vars.length ? "var " + this.state[section].vars.join(",") + ";" : "";
        },
        body: function(section) {
            return this.state[section].body.join("");
        },
        recurse: function(ast, intoId, nameId, recursionFn, create, skipWatchIdCheck) {
            var left, right, args, expression, self = this;
            if (recursionFn = recursionFn || noop, !skipWatchIdCheck && isDefined(ast.watchId)) return intoId = intoId || this.nextId(), 
            void this.if_("i", this.lazyAssign(intoId, this.computedMember("i", ast.watchId)), this.lazyRecurse(ast, intoId, nameId, recursionFn, create, !0));
            switch (ast.type) {
              case AST.Program:
                forEach(ast.body, function(expression, pos) {
                    self.recurse(expression.expression, undefined, undefined, function(expr) {
                        right = expr;
                    }), pos !== ast.body.length - 1 ? self.current().body.push(right, ";") : self.return_(right);
                });
                break;

              case AST.Literal:
                expression = this.escape(ast.value), this.assign(intoId, expression), recursionFn(expression);
                break;

              case AST.UnaryExpression:
                this.recurse(ast.argument, undefined, undefined, function(expr) {
                    right = expr;
                }), expression = ast.operator + "(" + this.ifDefined(right, 0) + ")", this.assign(intoId, expression), 
                recursionFn(expression);
                break;

              case AST.BinaryExpression:
                this.recurse(ast.left, undefined, undefined, function(expr) {
                    left = expr;
                }), this.recurse(ast.right, undefined, undefined, function(expr) {
                    right = expr;
                }), expression = "+" === ast.operator ? this.plus(left, right) : "-" === ast.operator ? this.ifDefined(left, 0) + ast.operator + this.ifDefined(right, 0) : "(" + left + ")" + ast.operator + "(" + right + ")", 
                this.assign(intoId, expression), recursionFn(expression);
                break;

              case AST.LogicalExpression:
                intoId = intoId || this.nextId(), self.recurse(ast.left, intoId), self.if_("&&" === ast.operator ? intoId : self.not(intoId), self.lazyRecurse(ast.right, intoId)), 
                recursionFn(intoId);
                break;

              case AST.ConditionalExpression:
                intoId = intoId || this.nextId(), self.recurse(ast.test, intoId), self.if_(intoId, self.lazyRecurse(ast.alternate, intoId), self.lazyRecurse(ast.consequent, intoId)), 
                recursionFn(intoId);
                break;

              case AST.Identifier:
                intoId = intoId || this.nextId(), nameId && (nameId.context = "inputs" === self.stage ? "s" : this.assign(this.nextId(), this.getHasOwnProperty("l", ast.name) + "?l:s"), 
                nameId.computed = !1, nameId.name = ast.name), ensureSafeMemberName(ast.name), self.if_("inputs" === self.stage || self.not(self.getHasOwnProperty("l", ast.name)), function() {
                    self.if_("inputs" === self.stage || "s", function() {
                        create && 1 !== create && self.if_(self.not(self.nonComputedMember("s", ast.name)), self.lazyAssign(self.nonComputedMember("s", ast.name), "{}")), 
                        self.assign(intoId, self.nonComputedMember("s", ast.name));
                    });
                }, intoId && self.lazyAssign(intoId, self.nonComputedMember("l", ast.name))), (self.state.expensiveChecks || isPossiblyDangerousMemberName(ast.name)) && self.addEnsureSafeObject(intoId), 
                recursionFn(intoId);
                break;

              case AST.MemberExpression:
                left = nameId && (nameId.context = this.nextId()) || this.nextId(), intoId = intoId || this.nextId(), 
                self.recurse(ast.object, left, undefined, function() {
                    self.if_(self.notNull(left), function() {
                        ast.computed ? (right = self.nextId(), self.recurse(ast.property, right), self.addEnsureSafeMemberName(right), 
                        create && 1 !== create && self.if_(self.not(self.computedMember(left, right)), self.lazyAssign(self.computedMember(left, right), "{}")), 
                        expression = self.ensureSafeObject(self.computedMember(left, right)), self.assign(intoId, expression), 
                        nameId && (nameId.computed = !0, nameId.name = right)) : (ensureSafeMemberName(ast.property.name), 
                        create && 1 !== create && self.if_(self.not(self.nonComputedMember(left, ast.property.name)), self.lazyAssign(self.nonComputedMember(left, ast.property.name), "{}")), 
                        expression = self.nonComputedMember(left, ast.property.name), (self.state.expensiveChecks || isPossiblyDangerousMemberName(ast.property.name)) && (expression = self.ensureSafeObject(expression)), 
                        self.assign(intoId, expression), nameId && (nameId.computed = !1, nameId.name = ast.property.name));
                    }, function() {
                        self.assign(intoId, "undefined");
                    }), recursionFn(intoId);
                }, !!create);
                break;

              case AST.CallExpression:
                intoId = intoId || this.nextId(), ast.filter ? (right = self.filter(ast.callee.name), 
                args = [], forEach(ast.arguments, function(expr) {
                    var argument = self.nextId();
                    self.recurse(expr, argument), args.push(argument);
                }), expression = right + "(" + args.join(",") + ")", self.assign(intoId, expression), 
                recursionFn(intoId)) : (right = self.nextId(), left = {}, args = [], self.recurse(ast.callee, right, left, function() {
                    self.if_(self.notNull(right), function() {
                        self.addEnsureSafeFunction(right), forEach(ast.arguments, function(expr) {
                            self.recurse(expr, self.nextId(), undefined, function(argument) {
                                args.push(self.ensureSafeObject(argument));
                            });
                        }), left.name ? (self.state.expensiveChecks || self.addEnsureSafeObject(left.context), 
                        expression = self.member(left.context, left.name, left.computed) + "(" + args.join(",") + ")") : expression = right + "(" + args.join(",") + ")", 
                        expression = self.ensureSafeObject(expression), self.assign(intoId, expression);
                    }, function() {
                        self.assign(intoId, "undefined");
                    }), recursionFn(intoId);
                }));
                break;

              case AST.AssignmentExpression:
                if (right = this.nextId(), left = {}, !isAssignable(ast.left)) throw $parseMinErr("lval", "Trying to assing a value to a non l-value");
                this.recurse(ast.left, undefined, left, function() {
                    self.if_(self.notNull(left.context), function() {
                        self.recurse(ast.right, right), self.addEnsureSafeObject(self.member(left.context, left.name, left.computed)), 
                        expression = self.member(left.context, left.name, left.computed) + ast.operator + right, 
                        self.assign(intoId, expression), recursionFn(intoId || expression);
                    });
                }, 1);
                break;

              case AST.ArrayExpression:
                args = [], forEach(ast.elements, function(expr) {
                    self.recurse(expr, self.nextId(), undefined, function(argument) {
                        args.push(argument);
                    });
                }), expression = "[" + args.join(",") + "]", this.assign(intoId, expression), recursionFn(expression);
                break;

              case AST.ObjectExpression:
                args = [], forEach(ast.properties, function(property) {
                    self.recurse(property.value, self.nextId(), undefined, function(expr) {
                        args.push(self.escape(property.key.type === AST.Identifier ? property.key.name : "" + property.key.value) + ":" + expr);
                    });
                }), expression = "{" + args.join(",") + "}", this.assign(intoId, expression), recursionFn(expression);
                break;

              case AST.ThisExpression:
                this.assign(intoId, "s"), recursionFn("s");
                break;

              case AST.NGValueParameter:
                this.assign(intoId, "v"), recursionFn("v");
            }
        },
        getHasOwnProperty: function(element, property) {
            var key = element + "." + property, own = this.current().own;
            return own.hasOwnProperty(key) || (own[key] = this.nextId(!1, element + "&&(" + this.escape(property) + " in " + element + ")")), 
            own[key];
        },
        assign: function(id, value) {
            return id ? (this.current().body.push(id, "=", value, ";"), id) : void 0;
        },
        filter: function(filterName) {
            return this.state.filters.hasOwnProperty(filterName) || (this.state.filters[filterName] = this.nextId(!0)), 
            this.state.filters[filterName];
        },
        ifDefined: function(id, defaultValue) {
            return "ifDefined(" + id + "," + this.escape(defaultValue) + ")";
        },
        plus: function(left, right) {
            return "plus(" + left + "," + right + ")";
        },
        return_: function(id) {
            this.current().body.push("return ", id, ";");
        },
        if_: function(test, alternate, consequent) {
            if (test === !0) alternate(); else {
                var body = this.current().body;
                body.push("if(", test, "){"), alternate(), body.push("}"), consequent && (body.push("else{"), 
                consequent(), body.push("}"));
            }
        },
        not: function(expression) {
            return "!(" + expression + ")";
        },
        notNull: function(expression) {
            return expression + "!=null";
        },
        nonComputedMember: function(left, right) {
            return left + "." + right;
        },
        computedMember: function(left, right) {
            return left + "[" + right + "]";
        },
        member: function(left, right, computed) {
            return computed ? this.computedMember(left, right) : this.nonComputedMember(left, right);
        },
        addEnsureSafeObject: function(item) {
            this.current().body.push(this.ensureSafeObject(item), ";");
        },
        addEnsureSafeMemberName: function(item) {
            this.current().body.push(this.ensureSafeMemberName(item), ";");
        },
        addEnsureSafeFunction: function(item) {
            this.current().body.push(this.ensureSafeFunction(item), ";");
        },
        ensureSafeObject: function(item) {
            return "ensureSafeObject(" + item + ",text)";
        },
        ensureSafeMemberName: function(item) {
            return "ensureSafeMemberName(" + item + ",text)";
        },
        ensureSafeFunction: function(item) {
            return "ensureSafeFunction(" + item + ",text)";
        },
        lazyRecurse: function(ast, intoId, nameId, recursionFn, create, skipWatchIdCheck) {
            var self = this;
            return function() {
                self.recurse(ast, intoId, nameId, recursionFn, create, skipWatchIdCheck);
            };
        },
        lazyAssign: function(id, value) {
            var self = this;
            return function() {
                self.assign(id, value);
            };
        },
        stringEscapeRegex: /[^ a-zA-Z0-9]/g,
        stringEscapeFn: function(c) {
            return "\\u" + ("0000" + c.charCodeAt(0).toString(16)).slice(-4);
        },
        escape: function(value) {
            if (isString(value)) return "'" + value.replace(this.stringEscapeRegex, this.stringEscapeFn) + "'";
            if (isNumber(value)) return value.toString();
            if (value === !0) return "true";
            if (value === !1) return "false";
            if (null === value) return "null";
            if ("undefined" == typeof value) return "undefined";
            throw $parseMinErr("esc", "IMPOSSIBLE");
        },
        nextId: function(skip, init) {
            var id = "v" + this.state.nextId++;
            return skip || this.current().vars.push(id + (init ? "=" + init : "")), id;
        },
        current: function() {
            return this.state[this.state.computing];
        }
    }, ASTInterpreter.prototype = {
        compile: function(expression, expensiveChecks) {
            var self = this, ast = this.astBuilder.ast(expression);
            this.expression = expression, this.expensiveChecks = expensiveChecks, findConstantAndWatchExpressions(ast, self.$filter);
            var assignable, assign;
            (assignable = assignableAST(ast)) && (assign = this.recurse(assignable));
            var inputs, toWatch = getInputs(ast.body);
            toWatch && (inputs = [], forEach(toWatch, function(watch, key) {
                var input = self.recurse(watch);
                watch.input = input, inputs.push(input), watch.watchId = key;
            }));
            var expressions = [];
            forEach(ast.body, function(expression) {
                expressions.push(self.recurse(expression.expression));
            });
            var fn = 0 === ast.body.length ? function() {} : 1 === ast.body.length ? expressions[0] : function(scope, locals) {
                var lastValue;
                return forEach(expressions, function(exp) {
                    lastValue = exp(scope, locals);
                }), lastValue;
            };
            return assign && (fn.assign = function(scope, value, locals) {
                return assign(scope, locals, value);
            }), inputs && (fn.inputs = inputs), fn.literal = isLiteral(ast), fn.constant = isConstant(ast), 
            fn;
        },
        recurse: function(ast, context, create) {
            var left, right, args, self = this;
            if (ast.input) return this.inputs(ast.input, ast.watchId);
            switch (ast.type) {
              case AST.Literal:
                return this.value(ast.value, context);

              case AST.UnaryExpression:
                return right = this.recurse(ast.argument), this["unary" + ast.operator](right, context);

              case AST.BinaryExpression:
                return left = this.recurse(ast.left), right = this.recurse(ast.right), this["binary" + ast.operator](left, right, context);

              case AST.LogicalExpression:
                return left = this.recurse(ast.left), right = this.recurse(ast.right), this["binary" + ast.operator](left, right, context);

              case AST.ConditionalExpression:
                return this["ternary?:"](this.recurse(ast.test), this.recurse(ast.alternate), this.recurse(ast.consequent), context);

              case AST.Identifier:
                return ensureSafeMemberName(ast.name, self.expression), self.identifier(ast.name, self.expensiveChecks || isPossiblyDangerousMemberName(ast.name), context, create, self.expression);

              case AST.MemberExpression:
                return left = this.recurse(ast.object, !1, !!create), ast.computed || (ensureSafeMemberName(ast.property.name, self.expression), 
                right = ast.property.name), ast.computed && (right = this.recurse(ast.property)), 
                ast.computed ? this.computedMember(left, right, context, create, self.expression) : this.nonComputedMember(left, right, self.expensiveChecks, context, create, self.expression);

              case AST.CallExpression:
                return args = [], forEach(ast.arguments, function(expr) {
                    args.push(self.recurse(expr));
                }), ast.filter && (right = this.$filter(ast.callee.name)), ast.filter || (right = this.recurse(ast.callee, !0)), 
                ast.filter ? function(scope, locals, assign, inputs) {
                    for (var values = [], i = 0; i < args.length; ++i) values.push(args[i](scope, locals, assign, inputs));
                    var value = right.apply(undefined, values, inputs);
                    return context ? {
                        context: undefined,
                        name: undefined,
                        value: value
                    } : value;
                } : function(scope, locals, assign, inputs) {
                    var value, rhs = right(scope, locals, assign, inputs);
                    if (null != rhs.value) {
                        ensureSafeObject(rhs.context, self.expression), ensureSafeFunction(rhs.value, self.expression);
                        for (var values = [], i = 0; i < args.length; ++i) values.push(ensureSafeObject(args[i](scope, locals, assign, inputs), self.expression));
                        value = ensureSafeObject(rhs.value.apply(rhs.context, values), self.expression);
                    }
                    return context ? {
                        value: value
                    } : value;
                };

              case AST.AssignmentExpression:
                return left = this.recurse(ast.left, !0, 1), right = this.recurse(ast.right), function(scope, locals, assign, inputs) {
                    var lhs = left(scope, locals, assign, inputs), rhs = right(scope, locals, assign, inputs);
                    return ensureSafeObject(lhs.value, self.expression), lhs.context[lhs.name] = rhs, 
                    context ? {
                        value: rhs
                    } : rhs;
                };

              case AST.ArrayExpression:
                return args = [], forEach(ast.elements, function(expr) {
                    args.push(self.recurse(expr));
                }), function(scope, locals, assign, inputs) {
                    for (var value = [], i = 0; i < args.length; ++i) value.push(args[i](scope, locals, assign, inputs));
                    return context ? {
                        value: value
                    } : value;
                };

              case AST.ObjectExpression:
                return args = [], forEach(ast.properties, function(property) {
                    args.push({
                        key: property.key.type === AST.Identifier ? property.key.name : "" + property.key.value,
                        value: self.recurse(property.value)
                    });
                }), function(scope, locals, assign, inputs) {
                    for (var value = {}, i = 0; i < args.length; ++i) value[args[i].key] = args[i].value(scope, locals, assign, inputs);
                    return context ? {
                        value: value
                    } : value;
                };

              case AST.ThisExpression:
                return function(scope) {
                    return context ? {
                        value: scope
                    } : scope;
                };

              case AST.NGValueParameter:
                return function(scope, locals, assign, inputs) {
                    return context ? {
                        value: assign
                    } : assign;
                };
            }
        },
        "unary+": function(argument, context) {
            return function(scope, locals, assign, inputs) {
                var arg = argument(scope, locals, assign, inputs);
                return arg = isDefined(arg) ? +arg : 0, context ? {
                    value: arg
                } : arg;
            };
        },
        "unary-": function(argument, context) {
            return function(scope, locals, assign, inputs) {
                var arg = argument(scope, locals, assign, inputs);
                return arg = isDefined(arg) ? -arg : 0, context ? {
                    value: arg
                } : arg;
            };
        },
        "unary!": function(argument, context) {
            return function(scope, locals, assign, inputs) {
                var arg = !argument(scope, locals, assign, inputs);
                return context ? {
                    value: arg
                } : arg;
            };
        },
        "binary+": function(left, right, context) {
            return function(scope, locals, assign, inputs) {
                var lhs = left(scope, locals, assign, inputs), rhs = right(scope, locals, assign, inputs), arg = plusFn(lhs, rhs);
                return context ? {
                    value: arg
                } : arg;
            };
        },
        "binary-": function(left, right, context) {
            return function(scope, locals, assign, inputs) {
                var lhs = left(scope, locals, assign, inputs), rhs = right(scope, locals, assign, inputs), arg = (isDefined(lhs) ? lhs : 0) - (isDefined(rhs) ? rhs : 0);
                return context ? {
                    value: arg
                } : arg;
            };
        },
        "binary*": function(left, right, context) {
            return function(scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) * right(scope, locals, assign, inputs);
                return context ? {
                    value: arg
                } : arg;
            };
        },
        "binary/": function(left, right, context) {
            return function(scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) / right(scope, locals, assign, inputs);
                return context ? {
                    value: arg
                } : arg;
            };
        },
        "binary%": function(left, right, context) {
            return function(scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) % right(scope, locals, assign, inputs);
                return context ? {
                    value: arg
                } : arg;
            };
        },
        "binary===": function(left, right, context) {
            return function(scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) === right(scope, locals, assign, inputs);
                return context ? {
                    value: arg
                } : arg;
            };
        },
        "binary!==": function(left, right, context) {
            return function(scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) !== right(scope, locals, assign, inputs);
                return context ? {
                    value: arg
                } : arg;
            };
        },
        "binary==": function(left, right, context) {
            return function(scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) == right(scope, locals, assign, inputs);
                return context ? {
                    value: arg
                } : arg;
            };
        },
        "binary!=": function(left, right, context) {
            return function(scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) != right(scope, locals, assign, inputs);
                return context ? {
                    value: arg
                } : arg;
            };
        },
        "binary<": function(left, right, context) {
            return function(scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) < right(scope, locals, assign, inputs);
                return context ? {
                    value: arg
                } : arg;
            };
        },
        "binary>": function(left, right, context) {
            return function(scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) > right(scope, locals, assign, inputs);
                return context ? {
                    value: arg
                } : arg;
            };
        },
        "binary<=": function(left, right, context) {
            return function(scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) <= right(scope, locals, assign, inputs);
                return context ? {
                    value: arg
                } : arg;
            };
        },
        "binary>=": function(left, right, context) {
            return function(scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) >= right(scope, locals, assign, inputs);
                return context ? {
                    value: arg
                } : arg;
            };
        },
        "binary&&": function(left, right, context) {
            return function(scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) && right(scope, locals, assign, inputs);
                return context ? {
                    value: arg
                } : arg;
            };
        },
        "binary||": function(left, right, context) {
            return function(scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) || right(scope, locals, assign, inputs);
                return context ? {
                    value: arg
                } : arg;
            };
        },
        "ternary?:": function(test, alternate, consequent, context) {
            return function(scope, locals, assign, inputs) {
                var arg = test(scope, locals, assign, inputs) ? alternate(scope, locals, assign, inputs) : consequent(scope, locals, assign, inputs);
                return context ? {
                    value: arg
                } : arg;
            };
        },
        value: function(value, context) {
            return function() {
                return context ? {
                    context: undefined,
                    name: undefined,
                    value: value
                } : value;
            };
        },
        identifier: function(name, expensiveChecks, context, create, expression) {
            return function(scope, locals, assign, inputs) {
                var base = locals && name in locals ? locals : scope;
                create && 1 !== create && base && !base[name] && (base[name] = {});
                var value = base ? base[name] : undefined;
                return expensiveChecks && ensureSafeObject(value, expression), context ? {
                    context: base,
                    name: name,
                    value: value
                } : value;
            };
        },
        computedMember: function(left, right, context, create, expression) {
            return function(scope, locals, assign, inputs) {
                var rhs, value, lhs = left(scope, locals, assign, inputs);
                return null != lhs && (rhs = right(scope, locals, assign, inputs), ensureSafeMemberName(rhs, expression), 
                create && 1 !== create && lhs && !lhs[rhs] && (lhs[rhs] = {}), value = lhs[rhs], 
                ensureSafeObject(value, expression)), context ? {
                    context: lhs,
                    name: rhs,
                    value: value
                } : value;
            };
        },
        nonComputedMember: function(left, right, expensiveChecks, context, create, expression) {
            return function(scope, locals, assign, inputs) {
                var lhs = left(scope, locals, assign, inputs);
                create && 1 !== create && lhs && !lhs[right] && (lhs[right] = {});
                var value = null != lhs ? lhs[right] : undefined;
                return (expensiveChecks || isPossiblyDangerousMemberName(right)) && ensureSafeObject(value, expression), 
                context ? {
                    context: lhs,
                    name: right,
                    value: value
                } : value;
            };
        },
        inputs: function(input, watchId) {
            return function(scope, value, locals, inputs) {
                return inputs ? inputs[watchId] : input(scope, value, locals);
            };
        }
    };
    var Parser = function(lexer, $filter, options) {
        this.lexer = lexer, this.$filter = $filter, this.options = options, this.ast = new AST(this.lexer), 
        this.astCompiler = options.csp ? new ASTInterpreter(this.ast, $filter) : new ASTCompiler(this.ast, $filter);
    };
    Parser.prototype = {
        constructor: Parser,
        parse: function(text) {
            return this.astCompiler.compile(text, this.options.expensiveChecks);
        }
    };
    var objectValueOf = (createMap(), createMap(), Object.prototype.valueOf), $sceMinErr = minErr("$sce"), SCE_CONTEXTS = {
        HTML: "html",
        CSS: "css",
        URL: "url",
        RESOURCE_URL: "resourceUrl",
        JS: "js"
    }, $compileMinErr = minErr("$compile"), urlParsingNode = document.createElement("a"), originUrl = urlResolve(window.location.href);
    $$CookieReader.$inject = [ "$document" ], $FilterProvider.$inject = [ "$provide" ], 
    currencyFilter.$inject = [ "$locale" ], numberFilter.$inject = [ "$locale" ];
    var DECIMAL_SEP = ".", DATE_FORMATS = {
        yyyy: dateGetter("FullYear", 4),
        yy: dateGetter("FullYear", 2, 0, !0),
        y: dateGetter("FullYear", 1),
        MMMM: dateStrGetter("Month"),
        MMM: dateStrGetter("Month", !0),
        MM: dateGetter("Month", 2, 1),
        M: dateGetter("Month", 1, 1),
        dd: dateGetter("Date", 2),
        d: dateGetter("Date", 1),
        HH: dateGetter("Hours", 2),
        H: dateGetter("Hours", 1),
        hh: dateGetter("Hours", 2, -12),
        h: dateGetter("Hours", 1, -12),
        mm: dateGetter("Minutes", 2),
        m: dateGetter("Minutes", 1),
        ss: dateGetter("Seconds", 2),
        s: dateGetter("Seconds", 1),
        sss: dateGetter("Milliseconds", 3),
        EEEE: dateStrGetter("Day"),
        EEE: dateStrGetter("Day", !0),
        a: ampmGetter,
        Z: timeZoneGetter,
        ww: weekGetter(2),
        w: weekGetter(1),
        G: eraGetter,
        GG: eraGetter,
        GGG: eraGetter,
        GGGG: longEraGetter
    }, DATE_FORMATS_SPLIT = /((?:[^yMdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/, NUMBER_STRING = /^\-?\d+$/;
    dateFilter.$inject = [ "$locale" ];
    var lowercaseFilter = valueFn(lowercase), uppercaseFilter = valueFn(uppercase);
    orderByFilter.$inject = [ "$parse" ];
    var htmlAnchorDirective = valueFn({
        restrict: "E",
        compile: function(element, attr) {
            return attr.href || attr.xlinkHref ? void 0 : function(scope, element) {
                if ("a" === element[0].nodeName.toLowerCase()) {
                    var href = "[object SVGAnimatedString]" === toString.call(element.prop("href")) ? "xlink:href" : "href";
                    element.on("click", function(event) {
                        element.attr(href) || event.preventDefault();
                    });
                }
            };
        }
    }), ngAttributeAliasDirectives = {};
    forEach(BOOLEAN_ATTR, function(propName, attrName) {
        function defaultLinkFn(scope, element, attr) {
            scope.$watch(attr[normalized], function(value) {
                attr.$set(attrName, !!value);
            });
        }
        if ("multiple" != propName) {
            var normalized = directiveNormalize("ng-" + attrName), linkFn = defaultLinkFn;
            "checked" === propName && (linkFn = function(scope, element, attr) {
                attr.ngModel !== attr[normalized] && defaultLinkFn(scope, element, attr);
            }), ngAttributeAliasDirectives[normalized] = function() {
                return {
                    restrict: "A",
                    priority: 100,
                    link: linkFn
                };
            };
        }
    }), forEach(ALIASED_ATTR, function(htmlAttr, ngAttr) {
        ngAttributeAliasDirectives[ngAttr] = function() {
            return {
                priority: 100,
                link: function(scope, element, attr) {
                    if ("ngPattern" === ngAttr && "/" == attr.ngPattern.charAt(0)) {
                        var match = attr.ngPattern.match(REGEX_STRING_REGEXP);
                        if (match) return void attr.$set("ngPattern", new RegExp(match[1], match[2]));
                    }
                    scope.$watch(attr[ngAttr], function(value) {
                        attr.$set(ngAttr, value);
                    });
                }
            };
        };
    }), forEach([ "src", "srcset", "href" ], function(attrName) {
        var normalized = directiveNormalize("ng-" + attrName);
        ngAttributeAliasDirectives[normalized] = function() {
            return {
                priority: 99,
                link: function(scope, element, attr) {
                    var propName = attrName, name = attrName;
                    "href" === attrName && "[object SVGAnimatedString]" === toString.call(element.prop("href")) && (name = "xlinkHref", 
                    attr.$attr[name] = "xlink:href", propName = null), attr.$observe(normalized, function(value) {
                        return value ? (attr.$set(name, value), void (msie && propName && element.prop(propName, attr[name]))) : void ("href" === attrName && attr.$set(name, null));
                    });
                }
            };
        };
    });
    var nullFormCtrl = {
        $addControl: noop,
        $$renameControl: nullFormRenameControl,
        $removeControl: noop,
        $setValidity: noop,
        $setDirty: noop,
        $setPristine: noop,
        $setSubmitted: noop
    }, SUBMITTED_CLASS = "ng-submitted";
    FormController.$inject = [ "$element", "$attrs", "$scope", "$animate", "$interpolate" ];
    var formDirectiveFactory = function(isNgForm) {
        return [ "$timeout", "$parse", function($timeout, $parse) {
            function getSetter(expression) {
                return "" === expression ? $parse('this[""]').assign : $parse(expression).assign || noop;
            }
            var formDirective = {
                name: "form",
                restrict: isNgForm ? "EAC" : "E",
                require: [ "form", "^^?form" ],
                controller: FormController,
                compile: function(formElement, attr) {
                    formElement.addClass(PRISTINE_CLASS).addClass(VALID_CLASS);
                    var nameAttr = attr.name ? "name" : isNgForm && attr.ngForm ? "ngForm" : !1;
                    return {
                        pre: function(scope, formElement, attr, ctrls) {
                            var controller = ctrls[0];
                            if (!("action" in attr)) {
                                var handleFormSubmission = function(event) {
                                    scope.$apply(function() {
                                        controller.$commitViewValue(), controller.$setSubmitted();
                                    }), event.preventDefault();
                                };
                                addEventListenerFn(formElement[0], "submit", handleFormSubmission), formElement.on("$destroy", function() {
                                    $timeout(function() {
                                        removeEventListenerFn(formElement[0], "submit", handleFormSubmission);
                                    }, 0, !1);
                                });
                            }
                            var parentFormCtrl = ctrls[1] || controller.$$parentForm;
                            parentFormCtrl.$addControl(controller);
                            var setter = nameAttr ? getSetter(controller.$name) : noop;
                            nameAttr && (setter(scope, controller), attr.$observe(nameAttr, function(newValue) {
                                controller.$name !== newValue && (setter(scope, undefined), controller.$$parentForm.$$renameControl(controller, newValue), 
                                (setter = getSetter(controller.$name))(scope, controller));
                            })), formElement.on("$destroy", function() {
                                controller.$$parentForm.$removeControl(controller), setter(scope, undefined), extend(controller, nullFormCtrl);
                            });
                        }
                    };
                }
            };
            return formDirective;
        } ];
    }, formDirective = formDirectiveFactory(), ngFormDirective = formDirectiveFactory(!0), ISO_DATE_REGEXP = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/, URL_REGEXP = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/, EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i, NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/, DATE_REGEXP = /^(\d{4})-(\d{2})-(\d{2})$/, DATETIMELOCAL_REGEXP = /^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/, WEEK_REGEXP = /^(\d{4})-W(\d\d)$/, MONTH_REGEXP = /^(\d{4})-(\d\d)$/, TIME_REGEXP = /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/, inputType = {
        text: textInputType,
        date: createDateInputType("date", DATE_REGEXP, createDateParser(DATE_REGEXP, [ "yyyy", "MM", "dd" ]), "yyyy-MM-dd"),
        "datetime-local": createDateInputType("datetimelocal", DATETIMELOCAL_REGEXP, createDateParser(DATETIMELOCAL_REGEXP, [ "yyyy", "MM", "dd", "HH", "mm", "ss", "sss" ]), "yyyy-MM-ddTHH:mm:ss.sss"),
        time: createDateInputType("time", TIME_REGEXP, createDateParser(TIME_REGEXP, [ "HH", "mm", "ss", "sss" ]), "HH:mm:ss.sss"),
        week: createDateInputType("week", WEEK_REGEXP, weekParser, "yyyy-Www"),
        month: createDateInputType("month", MONTH_REGEXP, createDateParser(MONTH_REGEXP, [ "yyyy", "MM" ]), "yyyy-MM"),
        number: numberInputType,
        url: urlInputType,
        email: emailInputType,
        radio: radioInputType,
        checkbox: checkboxInputType,
        hidden: noop,
        button: noop,
        submit: noop,
        reset: noop,
        file: noop
    }, inputDirective = [ "$browser", "$sniffer", "$filter", "$parse", function($browser, $sniffer, $filter, $parse) {
        return {
            restrict: "E",
            require: [ "?ngModel" ],
            link: {
                pre: function(scope, element, attr, ctrls) {
                    ctrls[0] && (inputType[lowercase(attr.type)] || inputType.text)(scope, element, attr, ctrls[0], $sniffer, $browser, $filter, $parse);
                }
            }
        };
    } ], CONSTANT_VALUE_REGEXP = /^(true|false|\d+)$/, ngValueDirective = function() {
        return {
            restrict: "A",
            priority: 100,
            compile: function(tpl, tplAttr) {
                return CONSTANT_VALUE_REGEXP.test(tplAttr.ngValue) ? function(scope, elm, attr) {
                    attr.$set("value", scope.$eval(attr.ngValue));
                } : function(scope, elm, attr) {
                    scope.$watch(attr.ngValue, function(value) {
                        attr.$set("value", value);
                    });
                };
            }
        };
    }, ngBindDirective = [ "$compile", function($compile) {
        return {
            restrict: "AC",
            compile: function(templateElement) {
                return $compile.$$addBindingClass(templateElement), function(scope, element, attr) {
                    $compile.$$addBindingInfo(element, attr.ngBind), element = element[0], scope.$watch(attr.ngBind, function(value) {
                        element.textContent = isUndefined(value) ? "" : value;
                    });
                };
            }
        };
    } ], ngBindTemplateDirective = [ "$interpolate", "$compile", function($interpolate, $compile) {
        return {
            compile: function(templateElement) {
                return $compile.$$addBindingClass(templateElement), function(scope, element, attr) {
                    var interpolateFn = $interpolate(element.attr(attr.$attr.ngBindTemplate));
                    $compile.$$addBindingInfo(element, interpolateFn.expressions), element = element[0], 
                    attr.$observe("ngBindTemplate", function(value) {
                        element.textContent = isUndefined(value) ? "" : value;
                    });
                };
            }
        };
    } ], ngBindHtmlDirective = [ "$sce", "$parse", "$compile", function($sce, $parse, $compile) {
        return {
            restrict: "A",
            compile: function(tElement, tAttrs) {
                var ngBindHtmlGetter = $parse(tAttrs.ngBindHtml), ngBindHtmlWatch = $parse(tAttrs.ngBindHtml, function(value) {
                    return (value || "").toString();
                });
                return $compile.$$addBindingClass(tElement), function(scope, element, attr) {
                    $compile.$$addBindingInfo(element, attr.ngBindHtml), scope.$watch(ngBindHtmlWatch, function() {
                        element.html($sce.getTrustedHtml(ngBindHtmlGetter(scope)) || "");
                    });
                };
            }
        };
    } ], ngChangeDirective = valueFn({
        restrict: "A",
        require: "ngModel",
        link: function(scope, element, attr, ctrl) {
            ctrl.$viewChangeListeners.push(function() {
                scope.$eval(attr.ngChange);
            });
        }
    }), ngClassDirective = classDirective("", !0), ngClassOddDirective = classDirective("Odd", 0), ngClassEvenDirective = classDirective("Even", 1), ngCloakDirective = ngDirective({
        compile: function(element, attr) {
            attr.$set("ngCloak", undefined), element.removeClass("ng-cloak");
        }
    }), ngControllerDirective = [ function() {
        return {
            restrict: "A",
            scope: !0,
            controller: "@",
            priority: 500
        };
    } ], ngEventDirectives = {}, forceAsyncEvents = {
        blur: !0,
        focus: !0
    };
    forEach("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function(eventName) {
        var directiveName = directiveNormalize("ng-" + eventName);
        ngEventDirectives[directiveName] = [ "$parse", "$rootScope", function($parse, $rootScope) {
            return {
                restrict: "A",
                compile: function($element, attr) {
                    var fn = $parse(attr[directiveName], null, !0);
                    return function(scope, element) {
                        element.on(eventName, function(event) {
                            var callback = function() {
                                fn(scope, {
                                    $event: event
                                });
                            };
                            forceAsyncEvents[eventName] && $rootScope.$$phase ? scope.$evalAsync(callback) : scope.$apply(callback);
                        });
                    };
                }
            };
        } ];
    });
    var ngIfDirective = [ "$animate", function($animate) {
        return {
            multiElement: !0,
            transclude: "element",
            priority: 600,
            terminal: !0,
            restrict: "A",
            $$tlb: !0,
            link: function($scope, $element, $attr, ctrl, $transclude) {
                var block, childScope, previousElements;
                $scope.$watch($attr.ngIf, function(value) {
                    value ? childScope || $transclude(function(clone, newScope) {
                        childScope = newScope, clone[clone.length++] = document.createComment(" end ngIf: " + $attr.ngIf + " "), 
                        block = {
                            clone: clone
                        }, $animate.enter(clone, $element.parent(), $element);
                    }) : (previousElements && (previousElements.remove(), previousElements = null), 
                    childScope && (childScope.$destroy(), childScope = null), block && (previousElements = getBlockNodes(block.clone), 
                    $animate.leave(previousElements).then(function() {
                        previousElements = null;
                    }), block = null));
                });
            }
        };
    } ], ngIncludeDirective = [ "$templateRequest", "$anchorScroll", "$animate", function($templateRequest, $anchorScroll, $animate) {
        return {
            restrict: "ECA",
            priority: 400,
            terminal: !0,
            transclude: "element",
            controller: angular.noop,
            compile: function(element, attr) {
                var srcExp = attr.ngInclude || attr.src, onloadExp = attr.onload || "", autoScrollExp = attr.autoscroll;
                return function(scope, $element, $attr, ctrl, $transclude) {
                    var currentScope, previousElement, currentElement, changeCounter = 0, cleanupLastIncludeContent = function() {
                        previousElement && (previousElement.remove(), previousElement = null), currentScope && (currentScope.$destroy(), 
                        currentScope = null), currentElement && ($animate.leave(currentElement).then(function() {
                            previousElement = null;
                        }), previousElement = currentElement, currentElement = null);
                    };
                    scope.$watch(srcExp, function(src) {
                        var afterAnimation = function() {
                            !isDefined(autoScrollExp) || autoScrollExp && !scope.$eval(autoScrollExp) || $anchorScroll();
                        }, thisChangeId = ++changeCounter;
                        src ? ($templateRequest(src, !0).then(function(response) {
                            if (thisChangeId === changeCounter) {
                                var newScope = scope.$new();
                                ctrl.template = response;
                                var clone = $transclude(newScope, function(clone) {
                                    cleanupLastIncludeContent(), $animate.enter(clone, null, $element).then(afterAnimation);
                                });
                                currentScope = newScope, currentElement = clone, currentScope.$emit("$includeContentLoaded", src), 
                                scope.$eval(onloadExp);
                            }
                        }, function() {
                            thisChangeId === changeCounter && (cleanupLastIncludeContent(), scope.$emit("$includeContentError", src));
                        }), scope.$emit("$includeContentRequested", src)) : (cleanupLastIncludeContent(), 
                        ctrl.template = null);
                    });
                };
            }
        };
    } ], ngIncludeFillContentDirective = [ "$compile", function($compile) {
        return {
            restrict: "ECA",
            priority: -400,
            require: "ngInclude",
            link: function(scope, $element, $attr, ctrl) {
                return /SVG/.test($element[0].toString()) ? ($element.empty(), void $compile(jqLiteBuildFragment(ctrl.template, document).childNodes)(scope, function(clone) {
                    $element.append(clone);
                }, {
                    futureParentElement: $element
                })) : ($element.html(ctrl.template), void $compile($element.contents())(scope));
            }
        };
    } ], ngInitDirective = ngDirective({
        priority: 450,
        compile: function() {
            return {
                pre: function(scope, element, attrs) {
                    scope.$eval(attrs.ngInit);
                }
            };
        }
    }), ngListDirective = function() {
        return {
            restrict: "A",
            priority: 100,
            require: "ngModel",
            link: function(scope, element, attr, ctrl) {
                var ngList = element.attr(attr.$attr.ngList) || ", ", trimValues = "false" !== attr.ngTrim, separator = trimValues ? trim(ngList) : ngList, parse = function(viewValue) {
                    if (!isUndefined(viewValue)) {
                        var list = [];
                        return viewValue && forEach(viewValue.split(separator), function(value) {
                            value && list.push(trimValues ? trim(value) : value);
                        }), list;
                    }
                };
                ctrl.$parsers.push(parse), ctrl.$formatters.push(function(value) {
                    return isArray(value) ? value.join(ngList) : undefined;
                }), ctrl.$isEmpty = function(value) {
                    return !value || !value.length;
                };
            }
        };
    }, VALID_CLASS = "ng-valid", INVALID_CLASS = "ng-invalid", PRISTINE_CLASS = "ng-pristine", DIRTY_CLASS = "ng-dirty", UNTOUCHED_CLASS = "ng-untouched", TOUCHED_CLASS = "ng-touched", PENDING_CLASS = "ng-pending", ngModelMinErr = minErr("ngModel"), NgModelController = [ "$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", "$timeout", "$rootScope", "$q", "$interpolate", function($scope, $exceptionHandler, $attr, $element, $parse, $animate, $timeout, $rootScope, $q, $interpolate) {
        this.$viewValue = Number.NaN, this.$modelValue = Number.NaN, this.$$rawModelValue = undefined, 
        this.$validators = {}, this.$asyncValidators = {}, this.$parsers = [], this.$formatters = [], 
        this.$viewChangeListeners = [], this.$untouched = !0, this.$touched = !1, this.$pristine = !0, 
        this.$dirty = !1, this.$valid = !0, this.$invalid = !1, this.$error = {}, this.$$success = {}, 
        this.$pending = undefined, this.$name = $interpolate($attr.name || "", !1)($scope), 
        this.$$parentForm = nullFormCtrl;
        var parserValid, parsedNgModel = $parse($attr.ngModel), parsedNgModelAssign = parsedNgModel.assign, ngModelGet = parsedNgModel, ngModelSet = parsedNgModelAssign, pendingDebounce = null, ctrl = this;
        this.$$setOptions = function(options) {
            if (ctrl.$options = options, options && options.getterSetter) {
                var invokeModelGetter = $parse($attr.ngModel + "()"), invokeModelSetter = $parse($attr.ngModel + "($$$p)");
                ngModelGet = function($scope) {
                    var modelValue = parsedNgModel($scope);
                    return isFunction(modelValue) && (modelValue = invokeModelGetter($scope)), modelValue;
                }, ngModelSet = function($scope, newValue) {
                    isFunction(parsedNgModel($scope)) ? invokeModelSetter($scope, {
                        $$$p: ctrl.$modelValue
                    }) : parsedNgModelAssign($scope, ctrl.$modelValue);
                };
            } else if (!parsedNgModel.assign) throw ngModelMinErr("nonassign", "Expression '{0}' is non-assignable. Element: {1}", $attr.ngModel, startingTag($element));
        }, this.$render = noop, this.$isEmpty = function(value) {
            return isUndefined(value) || "" === value || null === value || value !== value;
        };
        var currentValidationRunId = 0;
        addSetValidityMethod({
            ctrl: this,
            $element: $element,
            set: function(object, property) {
                object[property] = !0;
            },
            unset: function(object, property) {
                delete object[property];
            },
            $animate: $animate
        }), this.$setPristine = function() {
            ctrl.$dirty = !1, ctrl.$pristine = !0, $animate.removeClass($element, DIRTY_CLASS), 
            $animate.addClass($element, PRISTINE_CLASS);
        }, this.$setDirty = function() {
            ctrl.$dirty = !0, ctrl.$pristine = !1, $animate.removeClass($element, PRISTINE_CLASS), 
            $animate.addClass($element, DIRTY_CLASS), ctrl.$$parentForm.$setDirty();
        }, this.$setUntouched = function() {
            ctrl.$touched = !1, ctrl.$untouched = !0, $animate.setClass($element, UNTOUCHED_CLASS, TOUCHED_CLASS);
        }, this.$setTouched = function() {
            ctrl.$touched = !0, ctrl.$untouched = !1, $animate.setClass($element, TOUCHED_CLASS, UNTOUCHED_CLASS);
        }, this.$rollbackViewValue = function() {
            $timeout.cancel(pendingDebounce), ctrl.$viewValue = ctrl.$$lastCommittedViewValue, 
            ctrl.$render();
        }, this.$validate = function() {
            if (!isNumber(ctrl.$modelValue) || !isNaN(ctrl.$modelValue)) {
                var viewValue = ctrl.$$lastCommittedViewValue, modelValue = ctrl.$$rawModelValue, prevValid = ctrl.$valid, prevModelValue = ctrl.$modelValue, allowInvalid = ctrl.$options && ctrl.$options.allowInvalid;
                ctrl.$$runValidators(modelValue, viewValue, function(allValid) {
                    allowInvalid || prevValid === allValid || (ctrl.$modelValue = allValid ? modelValue : undefined, 
                    ctrl.$modelValue !== prevModelValue && ctrl.$$writeModelToScope());
                });
            }
        }, this.$$runValidators = function(modelValue, viewValue, doneCallback) {
            function processParseErrors() {
                var errorKey = ctrl.$$parserName || "parse";
                return isUndefined(parserValid) ? (setValidity(errorKey, null), !0) : (parserValid || (forEach(ctrl.$validators, function(v, name) {
                    setValidity(name, null);
                }), forEach(ctrl.$asyncValidators, function(v, name) {
                    setValidity(name, null);
                })), setValidity(errorKey, parserValid), parserValid);
            }
            function processSyncValidators() {
                var syncValidatorsValid = !0;
                return forEach(ctrl.$validators, function(validator, name) {
                    var result = validator(modelValue, viewValue);
                    syncValidatorsValid = syncValidatorsValid && result, setValidity(name, result);
                }), syncValidatorsValid ? !0 : (forEach(ctrl.$asyncValidators, function(v, name) {
                    setValidity(name, null);
                }), !1);
            }
            function processAsyncValidators() {
                var validatorPromises = [], allValid = !0;
                forEach(ctrl.$asyncValidators, function(validator, name) {
                    var promise = validator(modelValue, viewValue);
                    if (!isPromiseLike(promise)) throw ngModelMinErr("$asyncValidators", "Expected asynchronous validator to return a promise but got '{0}' instead.", promise);
                    setValidity(name, undefined), validatorPromises.push(promise.then(function() {
                        setValidity(name, !0);
                    }, function(error) {
                        allValid = !1, setValidity(name, !1);
                    }));
                }), validatorPromises.length ? $q.all(validatorPromises).then(function() {
                    validationDone(allValid);
                }, noop) : validationDone(!0);
            }
            function setValidity(name, isValid) {
                localValidationRunId === currentValidationRunId && ctrl.$setValidity(name, isValid);
            }
            function validationDone(allValid) {
                localValidationRunId === currentValidationRunId && doneCallback(allValid);
            }
            currentValidationRunId++;
            var localValidationRunId = currentValidationRunId;
            return processParseErrors() && processSyncValidators() ? void processAsyncValidators() : void validationDone(!1);
        }, this.$commitViewValue = function() {
            var viewValue = ctrl.$viewValue;
            $timeout.cancel(pendingDebounce), (ctrl.$$lastCommittedViewValue !== viewValue || "" === viewValue && ctrl.$$hasNativeValidators) && (ctrl.$$lastCommittedViewValue = viewValue, 
            ctrl.$pristine && this.$setDirty(), this.$$parseAndValidate());
        }, this.$$parseAndValidate = function() {
            function writeToModelIfNeeded() {
                ctrl.$modelValue !== prevModelValue && ctrl.$$writeModelToScope();
            }
            var viewValue = ctrl.$$lastCommittedViewValue, modelValue = viewValue;
            if (parserValid = isUndefined(modelValue) ? undefined : !0) for (var i = 0; i < ctrl.$parsers.length; i++) if (modelValue = ctrl.$parsers[i](modelValue), 
            isUndefined(modelValue)) {
                parserValid = !1;
                break;
            }
            isNumber(ctrl.$modelValue) && isNaN(ctrl.$modelValue) && (ctrl.$modelValue = ngModelGet($scope));
            var prevModelValue = ctrl.$modelValue, allowInvalid = ctrl.$options && ctrl.$options.allowInvalid;
            ctrl.$$rawModelValue = modelValue, allowInvalid && (ctrl.$modelValue = modelValue, 
            writeToModelIfNeeded()), ctrl.$$runValidators(modelValue, ctrl.$$lastCommittedViewValue, function(allValid) {
                allowInvalid || (ctrl.$modelValue = allValid ? modelValue : undefined, writeToModelIfNeeded());
            });
        }, this.$$writeModelToScope = function() {
            ngModelSet($scope, ctrl.$modelValue), forEach(ctrl.$viewChangeListeners, function(listener) {
                try {
                    listener();
                } catch (e) {
                    $exceptionHandler(e);
                }
            });
        }, this.$setViewValue = function(value, trigger) {
            ctrl.$viewValue = value, (!ctrl.$options || ctrl.$options.updateOnDefault) && ctrl.$$debounceViewValueCommit(trigger);
        }, this.$$debounceViewValueCommit = function(trigger) {
            var debounce, debounceDelay = 0, options = ctrl.$options;
            options && isDefined(options.debounce) && (debounce = options.debounce, isNumber(debounce) ? debounceDelay = debounce : isNumber(debounce[trigger]) ? debounceDelay = debounce[trigger] : isNumber(debounce["default"]) && (debounceDelay = debounce["default"])), 
            $timeout.cancel(pendingDebounce), debounceDelay ? pendingDebounce = $timeout(function() {
                ctrl.$commitViewValue();
            }, debounceDelay) : $rootScope.$$phase ? ctrl.$commitViewValue() : $scope.$apply(function() {
                ctrl.$commitViewValue();
            });
        }, $scope.$watch(function() {
            var modelValue = ngModelGet($scope);
            if (modelValue !== ctrl.$modelValue && (ctrl.$modelValue === ctrl.$modelValue || modelValue === modelValue)) {
                ctrl.$modelValue = ctrl.$$rawModelValue = modelValue, parserValid = undefined;
                for (var formatters = ctrl.$formatters, idx = formatters.length, viewValue = modelValue; idx--; ) viewValue = formatters[idx](viewValue);
                ctrl.$viewValue !== viewValue && (ctrl.$viewValue = ctrl.$$lastCommittedViewValue = viewValue, 
                ctrl.$render(), ctrl.$$runValidators(modelValue, viewValue, noop));
            }
            return modelValue;
        });
    } ], ngModelDirective = [ "$rootScope", function($rootScope) {
        return {
            restrict: "A",
            require: [ "ngModel", "^?form", "^?ngModelOptions" ],
            controller: NgModelController,
            priority: 1,
            compile: function(element) {
                return element.addClass(PRISTINE_CLASS).addClass(UNTOUCHED_CLASS).addClass(VALID_CLASS), 
                {
                    pre: function(scope, element, attr, ctrls) {
                        var modelCtrl = ctrls[0], formCtrl = ctrls[1] || modelCtrl.$$parentForm;
                        modelCtrl.$$setOptions(ctrls[2] && ctrls[2].$options), formCtrl.$addControl(modelCtrl), 
                        attr.$observe("name", function(newValue) {
                            modelCtrl.$name !== newValue && modelCtrl.$$parentForm.$$renameControl(modelCtrl, newValue);
                        }), scope.$on("$destroy", function() {
                            modelCtrl.$$parentForm.$removeControl(modelCtrl);
                        });
                    },
                    post: function(scope, element, attr, ctrls) {
                        var modelCtrl = ctrls[0];
                        modelCtrl.$options && modelCtrl.$options.updateOn && element.on(modelCtrl.$options.updateOn, function(ev) {
                            modelCtrl.$$debounceViewValueCommit(ev && ev.type);
                        }), element.on("blur", function(ev) {
                            modelCtrl.$touched || ($rootScope.$$phase ? scope.$evalAsync(modelCtrl.$setTouched) : scope.$apply(modelCtrl.$setTouched));
                        });
                    }
                };
            }
        };
    } ], DEFAULT_REGEXP = /(\s+|^)default(\s+|$)/, ngModelOptionsDirective = function() {
        return {
            restrict: "A",
            controller: [ "$scope", "$attrs", function($scope, $attrs) {
                var that = this;
                this.$options = copy($scope.$eval($attrs.ngModelOptions)), isDefined(this.$options.updateOn) ? (this.$options.updateOnDefault = !1, 
                this.$options.updateOn = trim(this.$options.updateOn.replace(DEFAULT_REGEXP, function() {
                    return that.$options.updateOnDefault = !0, " ";
                }))) : this.$options.updateOnDefault = !0;
            } ]
        };
    }, ngNonBindableDirective = ngDirective({
        terminal: !0,
        priority: 1e3
    }), ngOptionsMinErr = minErr("ngOptions"), NG_OPTIONS_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/, ngOptionsDirective = [ "$compile", "$parse", function($compile, $parse) {
        function parseOptionsExpression(optionsExp, selectElement, scope) {
            function Option(selectValue, viewValue, label, group, disabled) {
                this.selectValue = selectValue, this.viewValue = viewValue, this.label = label, 
                this.group = group, this.disabled = disabled;
            }
            function getOptionValuesKeys(optionValues) {
                var optionValuesKeys;
                if (!keyName && isArrayLike(optionValues)) optionValuesKeys = optionValues; else {
                    optionValuesKeys = [];
                    for (var itemKey in optionValues) optionValues.hasOwnProperty(itemKey) && "$" !== itemKey.charAt(0) && optionValuesKeys.push(itemKey);
                }
                return optionValuesKeys;
            }
            var match = optionsExp.match(NG_OPTIONS_REGEXP);
            if (!match) throw ngOptionsMinErr("iexp", "Expected expression in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '{0}'. Element: {1}", optionsExp, startingTag(selectElement));
            var valueName = match[5] || match[7], keyName = match[6], selectAs = / as /.test(match[0]) && match[1], trackBy = match[9], valueFn = $parse(match[2] ? match[1] : valueName), selectAsFn = selectAs && $parse(selectAs), viewValueFn = selectAsFn || valueFn, trackByFn = trackBy && $parse(trackBy), getTrackByValueFn = trackBy ? function(value, locals) {
                return trackByFn(scope, locals);
            } : function(value) {
                return hashKey(value);
            }, getTrackByValue = function(value, key) {
                return getTrackByValueFn(value, getLocals(value, key));
            }, displayFn = $parse(match[2] || match[1]), groupByFn = $parse(match[3] || ""), disableWhenFn = $parse(match[4] || ""), valuesFn = $parse(match[8]), locals = {}, getLocals = keyName ? function(value, key) {
                return locals[keyName] = key, locals[valueName] = value, locals;
            } : function(value) {
                return locals[valueName] = value, locals;
            };
            return {
                trackBy: trackBy,
                getTrackByValue: getTrackByValue,
                getWatchables: $parse(valuesFn, function(optionValues) {
                    var watchedArray = [];
                    optionValues = optionValues || [];
                    for (var optionValuesKeys = getOptionValuesKeys(optionValues), optionValuesLength = optionValuesKeys.length, index = 0; optionValuesLength > index; index++) {
                        var key = optionValues === optionValuesKeys ? index : optionValuesKeys[index], locals = (optionValues[key], 
                        getLocals(optionValues[key], key)), selectValue = getTrackByValueFn(optionValues[key], locals);
                        if (watchedArray.push(selectValue), match[2] || match[1]) {
                            var label = displayFn(scope, locals);
                            watchedArray.push(label);
                        }
                        if (match[4]) {
                            var disableWhen = disableWhenFn(scope, locals);
                            watchedArray.push(disableWhen);
                        }
                    }
                    return watchedArray;
                }),
                getOptions: function() {
                    for (var optionItems = [], selectValueMap = {}, optionValues = valuesFn(scope) || [], optionValuesKeys = getOptionValuesKeys(optionValues), optionValuesLength = optionValuesKeys.length, index = 0; optionValuesLength > index; index++) {
                        var key = optionValues === optionValuesKeys ? index : optionValuesKeys[index], value = optionValues[key], locals = getLocals(value, key), viewValue = viewValueFn(scope, locals), selectValue = getTrackByValueFn(viewValue, locals), label = displayFn(scope, locals), group = groupByFn(scope, locals), disabled = disableWhenFn(scope, locals), optionItem = new Option(selectValue, viewValue, label, group, disabled);
                        optionItems.push(optionItem), selectValueMap[selectValue] = optionItem;
                    }
                    return {
                        items: optionItems,
                        selectValueMap: selectValueMap,
                        getOptionFromViewValue: function(value) {
                            return selectValueMap[getTrackByValue(value)];
                        },
                        getViewValueFromOption: function(option) {
                            return trackBy ? angular.copy(option.viewValue) : option.viewValue;
                        }
                    };
                }
            };
        }
        var optionTemplate = document.createElement("option"), optGroupTemplate = document.createElement("optgroup");
        return {
            restrict: "A",
            terminal: !0,
            require: [ "select", "?ngModel" ],
            link: function(scope, selectElement, attr, ctrls) {
                function updateOptionElement(option, element) {
                    option.element = element, element.disabled = option.disabled, option.value !== element.value && (element.value = option.selectValue), 
                    option.label !== element.label && (element.label = option.label, element.textContent = option.label);
                }
                function addOrReuseElement(parent, current, type, templateElement) {
                    var element;
                    return current && lowercase(current.nodeName) === type ? element = current : (element = templateElement.cloneNode(!1), 
                    current ? parent.insertBefore(element, current) : parent.appendChild(element)), 
                    element;
                }
                function removeExcessElements(current) {
                    for (var next; current; ) next = current.nextSibling, jqLiteRemove(current), current = next;
                }
                function skipEmptyAndUnknownOptions(current) {
                    var emptyOption_ = emptyOption && emptyOption[0], unknownOption_ = unknownOption && unknownOption[0];
                    if (emptyOption_ || unknownOption_) for (;current && (current === emptyOption_ || current === unknownOption_); ) current = current.nextSibling;
                    return current;
                }
                function updateOptions() {
                    var previousValue = options && selectCtrl.readValue();
                    options = ngOptions.getOptions();
                    var groupMap = {}, currentElement = selectElement[0].firstChild;
                    if (providedEmptyOption && selectElement.prepend(emptyOption), currentElement = skipEmptyAndUnknownOptions(currentElement), 
                    options.items.forEach(function(option) {
                        var group, groupElement, optionElement;
                        option.group ? (group = groupMap[option.group], group || (groupElement = addOrReuseElement(selectElement[0], currentElement, "optgroup", optGroupTemplate), 
                        currentElement = groupElement.nextSibling, groupElement.label = option.group, group = groupMap[option.group] = {
                            groupElement: groupElement,
                            currentOptionElement: groupElement.firstChild
                        }), optionElement = addOrReuseElement(group.groupElement, group.currentOptionElement, "option", optionTemplate), 
                        updateOptionElement(option, optionElement), group.currentOptionElement = optionElement.nextSibling) : (optionElement = addOrReuseElement(selectElement[0], currentElement, "option", optionTemplate), 
                        updateOptionElement(option, optionElement), currentElement = optionElement.nextSibling);
                    }), Object.keys(groupMap).forEach(function(key) {
                        removeExcessElements(groupMap[key].currentOptionElement);
                    }), removeExcessElements(currentElement), ngModelCtrl.$render(), !ngModelCtrl.$isEmpty(previousValue)) {
                        var nextValue = selectCtrl.readValue();
                        (ngOptions.trackBy ? equals(previousValue, nextValue) : previousValue === nextValue) || (ngModelCtrl.$setViewValue(nextValue), 
                        ngModelCtrl.$render());
                    }
                }
                var ngModelCtrl = ctrls[1];
                if (ngModelCtrl) {
                    for (var emptyOption, selectCtrl = ctrls[0], multiple = attr.multiple, i = 0, children = selectElement.children(), ii = children.length; ii > i; i++) if ("" === children[i].value) {
                        emptyOption = children.eq(i);
                        break;
                    }
                    var providedEmptyOption = !!emptyOption, unknownOption = jqLite(optionTemplate.cloneNode(!1));
                    unknownOption.val("?");
                    var options, ngOptions = parseOptionsExpression(attr.ngOptions, selectElement, scope), renderEmptyOption = function() {
                        providedEmptyOption || selectElement.prepend(emptyOption), selectElement.val(""), 
                        emptyOption.prop("selected", !0), emptyOption.attr("selected", !0);
                    }, removeEmptyOption = function() {
                        providedEmptyOption || emptyOption.remove();
                    }, renderUnknownOption = function() {
                        selectElement.prepend(unknownOption), selectElement.val("?"), unknownOption.prop("selected", !0), 
                        unknownOption.attr("selected", !0);
                    }, removeUnknownOption = function() {
                        unknownOption.remove();
                    };
                    multiple ? (ngModelCtrl.$isEmpty = function(value) {
                        return !value || 0 === value.length;
                    }, selectCtrl.writeValue = function(value) {
                        options.items.forEach(function(option) {
                            option.element.selected = !1;
                        }), value && value.forEach(function(item) {
                            var option = options.getOptionFromViewValue(item);
                            option && !option.disabled && (option.element.selected = !0);
                        });
                    }, selectCtrl.readValue = function() {
                        var selectedValues = selectElement.val() || [], selections = [];
                        return forEach(selectedValues, function(value) {
                            var option = options.selectValueMap[value];
                            option && !option.disabled && selections.push(options.getViewValueFromOption(option));
                        }), selections;
                    }, ngOptions.trackBy && scope.$watchCollection(function() {
                        return isArray(ngModelCtrl.$viewValue) ? ngModelCtrl.$viewValue.map(function(value) {
                            return ngOptions.getTrackByValue(value);
                        }) : void 0;
                    }, function() {
                        ngModelCtrl.$render();
                    })) : (selectCtrl.writeValue = function(value) {
                        var option = options.getOptionFromViewValue(value);
                        option && !option.disabled ? selectElement[0].value !== option.selectValue && (removeUnknownOption(), 
                        removeEmptyOption(), selectElement[0].value = option.selectValue, option.element.selected = !0, 
                        option.element.setAttribute("selected", "selected")) : null === value || providedEmptyOption ? (removeUnknownOption(), 
                        renderEmptyOption()) : (removeEmptyOption(), renderUnknownOption());
                    }, selectCtrl.readValue = function() {
                        var selectedOption = options.selectValueMap[selectElement.val()];
                        return selectedOption && !selectedOption.disabled ? (removeEmptyOption(), removeUnknownOption(), 
                        options.getViewValueFromOption(selectedOption)) : null;
                    }, ngOptions.trackBy && scope.$watch(function() {
                        return ngOptions.getTrackByValue(ngModelCtrl.$viewValue);
                    }, function() {
                        ngModelCtrl.$render();
                    })), providedEmptyOption ? (emptyOption.remove(), $compile(emptyOption)(scope), 
                    emptyOption.removeClass("ng-scope")) : emptyOption = jqLite(optionTemplate.cloneNode(!1)), 
                    updateOptions(), scope.$watchCollection(ngOptions.getWatchables, updateOptions);
                }
            }
        };
    } ], ngPluralizeDirective = [ "$locale", "$interpolate", "$log", function($locale, $interpolate, $log) {
        var BRACE = /{}/g, IS_WHEN = /^when(Minus)?(.+)$/;
        return {
            link: function(scope, element, attr) {
                function updateElementText(newText) {
                    element.text(newText || "");
                }
                var lastCount, numberExp = attr.count, whenExp = attr.$attr.when && element.attr(attr.$attr.when), offset = attr.offset || 0, whens = scope.$eval(whenExp) || {}, whensExpFns = {}, startSymbol = $interpolate.startSymbol(), endSymbol = $interpolate.endSymbol(), braceReplacement = startSymbol + numberExp + "-" + offset + endSymbol, watchRemover = angular.noop;
                forEach(attr, function(expression, attributeName) {
                    var tmpMatch = IS_WHEN.exec(attributeName);
                    if (tmpMatch) {
                        var whenKey = (tmpMatch[1] ? "-" : "") + lowercase(tmpMatch[2]);
                        whens[whenKey] = element.attr(attr.$attr[attributeName]);
                    }
                }), forEach(whens, function(expression, key) {
                    whensExpFns[key] = $interpolate(expression.replace(BRACE, braceReplacement));
                }), scope.$watch(numberExp, function(newVal) {
                    var count = parseFloat(newVal), countIsNaN = isNaN(count);
                    if (countIsNaN || count in whens || (count = $locale.pluralCat(count - offset)), 
                    count !== lastCount && !(countIsNaN && isNumber(lastCount) && isNaN(lastCount))) {
                        watchRemover();
                        var whenExpFn = whensExpFns[count];
                        isUndefined(whenExpFn) ? (null != newVal && $log.debug("ngPluralize: no rule defined for '" + count + "' in " + whenExp), 
                        watchRemover = noop, updateElementText()) : watchRemover = scope.$watch(whenExpFn, updateElementText), 
                        lastCount = count;
                    }
                });
            }
        };
    } ], ngRepeatDirective = [ "$parse", "$animate", function($parse, $animate) {
        var NG_REMOVED = "$$NG_REMOVED", ngRepeatMinErr = minErr("ngRepeat"), updateScope = function(scope, index, valueIdentifier, value, keyIdentifier, key, arrayLength) {
            scope[valueIdentifier] = value, keyIdentifier && (scope[keyIdentifier] = key), scope.$index = index, 
            scope.$first = 0 === index, scope.$last = index === arrayLength - 1, scope.$middle = !(scope.$first || scope.$last), 
            scope.$odd = !(scope.$even = 0 === (1 & index));
        }, getBlockStart = function(block) {
            return block.clone[0];
        }, getBlockEnd = function(block) {
            return block.clone[block.clone.length - 1];
        };
        return {
            restrict: "A",
            multiElement: !0,
            transclude: "element",
            priority: 1e3,
            terminal: !0,
            $$tlb: !0,
            compile: function($element, $attr) {
                var expression = $attr.ngRepeat, ngRepeatEndComment = document.createComment(" end ngRepeat: " + expression + " "), match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
                if (!match) throw ngRepeatMinErr("iexp", "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", expression);
                var lhs = match[1], rhs = match[2], aliasAs = match[3], trackByExp = match[4];
                if (match = lhs.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/), 
                !match) throw ngRepeatMinErr("iidexp", "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.", lhs);
                var valueIdentifier = match[3] || match[1], keyIdentifier = match[2];
                if (aliasAs && (!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(aliasAs) || /^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(aliasAs))) throw ngRepeatMinErr("badident", "alias '{0}' is invalid --- must be a valid JS identifier which is not a reserved name.", aliasAs);
                var trackByExpGetter, trackByIdExpFn, trackByIdArrayFn, trackByIdObjFn, hashFnLocals = {
                    $id: hashKey
                };
                return trackByExp ? trackByExpGetter = $parse(trackByExp) : (trackByIdArrayFn = function(key, value) {
                    return hashKey(value);
                }, trackByIdObjFn = function(key) {
                    return key;
                }), function($scope, $element, $attr, ctrl, $transclude) {
                    trackByExpGetter && (trackByIdExpFn = function(key, value, index) {
                        return keyIdentifier && (hashFnLocals[keyIdentifier] = key), hashFnLocals[valueIdentifier] = value, 
                        hashFnLocals.$index = index, trackByExpGetter($scope, hashFnLocals);
                    });
                    var lastBlockMap = createMap();
                    $scope.$watchCollection(rhs, function(collection) {
                        var index, length, nextNode, collectionLength, key, value, trackById, trackByIdFn, collectionKeys, block, nextBlockOrder, elementsToRemove, previousNode = $element[0], nextBlockMap = createMap();
                        if (aliasAs && ($scope[aliasAs] = collection), isArrayLike(collection)) collectionKeys = collection, 
                        trackByIdFn = trackByIdExpFn || trackByIdArrayFn; else {
                            trackByIdFn = trackByIdExpFn || trackByIdObjFn, collectionKeys = [];
                            for (var itemKey in collection) hasOwnProperty.call(collection, itemKey) && "$" !== itemKey.charAt(0) && collectionKeys.push(itemKey);
                        }
                        for (collectionLength = collectionKeys.length, nextBlockOrder = new Array(collectionLength), 
                        index = 0; collectionLength > index; index++) if (key = collection === collectionKeys ? index : collectionKeys[index], 
                        value = collection[key], trackById = trackByIdFn(key, value, index), lastBlockMap[trackById]) block = lastBlockMap[trackById], 
                        delete lastBlockMap[trackById], nextBlockMap[trackById] = block, nextBlockOrder[index] = block; else {
                            if (nextBlockMap[trackById]) throw forEach(nextBlockOrder, function(block) {
                                block && block.scope && (lastBlockMap[block.id] = block);
                            }), ngRepeatMinErr("dupes", "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}, Duplicate value: {2}", expression, trackById, value);
                            nextBlockOrder[index] = {
                                id: trackById,
                                scope: undefined,
                                clone: undefined
                            }, nextBlockMap[trackById] = !0;
                        }
                        for (var blockKey in lastBlockMap) {
                            if (block = lastBlockMap[blockKey], elementsToRemove = getBlockNodes(block.clone), 
                            $animate.leave(elementsToRemove), elementsToRemove[0].parentNode) for (index = 0, 
                            length = elementsToRemove.length; length > index; index++) elementsToRemove[index][NG_REMOVED] = !0;
                            block.scope.$destroy();
                        }
                        for (index = 0; collectionLength > index; index++) if (key = collection === collectionKeys ? index : collectionKeys[index], 
                        value = collection[key], block = nextBlockOrder[index], block.scope) {
                            nextNode = previousNode;
                            do nextNode = nextNode.nextSibling; while (nextNode && nextNode[NG_REMOVED]);
                            getBlockStart(block) != nextNode && $animate.move(getBlockNodes(block.clone), null, jqLite(previousNode)), 
                            previousNode = getBlockEnd(block), updateScope(block.scope, index, valueIdentifier, value, keyIdentifier, key, collectionLength);
                        } else $transclude(function(clone, scope) {
                            block.scope = scope;
                            var endNode = ngRepeatEndComment.cloneNode(!1);
                            clone[clone.length++] = endNode, $animate.enter(clone, null, jqLite(previousNode)), 
                            previousNode = endNode, block.clone = clone, nextBlockMap[block.id] = block, updateScope(block.scope, index, valueIdentifier, value, keyIdentifier, key, collectionLength);
                        });
                        lastBlockMap = nextBlockMap;
                    });
                };
            }
        };
    } ], NG_HIDE_CLASS = "ng-hide", NG_HIDE_IN_PROGRESS_CLASS = "ng-hide-animate", ngShowDirective = [ "$animate", function($animate) {
        return {
            restrict: "A",
            multiElement: !0,
            link: function(scope, element, attr) {
                scope.$watch(attr.ngShow, function(value) {
                    $animate[value ? "removeClass" : "addClass"](element, NG_HIDE_CLASS, {
                        tempClasses: NG_HIDE_IN_PROGRESS_CLASS
                    });
                });
            }
        };
    } ], ngHideDirective = [ "$animate", function($animate) {
        return {
            restrict: "A",
            multiElement: !0,
            link: function(scope, element, attr) {
                scope.$watch(attr.ngHide, function(value) {
                    $animate[value ? "addClass" : "removeClass"](element, NG_HIDE_CLASS, {
                        tempClasses: NG_HIDE_IN_PROGRESS_CLASS
                    });
                });
            }
        };
    } ], ngStyleDirective = ngDirective(function(scope, element, attr) {
        scope.$watch(attr.ngStyle, function(newStyles, oldStyles) {
            oldStyles && newStyles !== oldStyles && forEach(oldStyles, function(val, style) {
                element.css(style, "");
            }), newStyles && element.css(newStyles);
        }, !0);
    }), ngSwitchDirective = [ "$animate", function($animate) {
        return {
            require: "ngSwitch",
            controller: [ "$scope", function() {
                this.cases = {};
            } ],
            link: function(scope, element, attr, ngSwitchController) {
                var watchExpr = attr.ngSwitch || attr.on, selectedTranscludes = [], selectedElements = [], previousLeaveAnimations = [], selectedScopes = [], spliceFactory = function(array, index) {
                    return function() {
                        array.splice(index, 1);
                    };
                };
                scope.$watch(watchExpr, function(value) {
                    var i, ii;
                    for (i = 0, ii = previousLeaveAnimations.length; ii > i; ++i) $animate.cancel(previousLeaveAnimations[i]);
                    for (previousLeaveAnimations.length = 0, i = 0, ii = selectedScopes.length; ii > i; ++i) {
                        var selected = getBlockNodes(selectedElements[i].clone);
                        selectedScopes[i].$destroy();
                        var promise = previousLeaveAnimations[i] = $animate.leave(selected);
                        promise.then(spliceFactory(previousLeaveAnimations, i));
                    }
                    selectedElements.length = 0, selectedScopes.length = 0, (selectedTranscludes = ngSwitchController.cases["!" + value] || ngSwitchController.cases["?"]) && forEach(selectedTranscludes, function(selectedTransclude) {
                        selectedTransclude.transclude(function(caseElement, selectedScope) {
                            selectedScopes.push(selectedScope);
                            var anchor = selectedTransclude.element;
                            caseElement[caseElement.length++] = document.createComment(" end ngSwitchWhen: ");
                            var block = {
                                clone: caseElement
                            };
                            selectedElements.push(block), $animate.enter(caseElement, anchor.parent(), anchor);
                        });
                    });
                });
            }
        };
    } ], ngSwitchWhenDirective = ngDirective({
        transclude: "element",
        priority: 1200,
        require: "^ngSwitch",
        multiElement: !0,
        link: function(scope, element, attrs, ctrl, $transclude) {
            ctrl.cases["!" + attrs.ngSwitchWhen] = ctrl.cases["!" + attrs.ngSwitchWhen] || [], 
            ctrl.cases["!" + attrs.ngSwitchWhen].push({
                transclude: $transclude,
                element: element
            });
        }
    }), ngSwitchDefaultDirective = ngDirective({
        transclude: "element",
        priority: 1200,
        require: "^ngSwitch",
        multiElement: !0,
        link: function(scope, element, attr, ctrl, $transclude) {
            ctrl.cases["?"] = ctrl.cases["?"] || [], ctrl.cases["?"].push({
                transclude: $transclude,
                element: element
            });
        }
    }), ngTranscludeDirective = ngDirective({
        restrict: "EAC",
        link: function($scope, $element, $attrs, controller, $transclude) {
            if (!$transclude) throw minErr("ngTransclude")("orphan", "Illegal use of ngTransclude directive in the template! No parent directive that requires a transclusion found. Element: {0}", startingTag($element));
            $transclude(function(clone) {
                $element.empty(), $element.append(clone);
            });
        }
    }), scriptDirective = [ "$templateCache", function($templateCache) {
        return {
            restrict: "E",
            terminal: !0,
            compile: function(element, attr) {
                if ("text/ng-template" == attr.type) {
                    var templateUrl = attr.id, text = element[0].text;
                    $templateCache.put(templateUrl, text);
                }
            }
        };
    } ], noopNgModelController = {
        $setViewValue: noop,
        $render: noop
    }, SelectController = [ "$element", "$scope", "$attrs", function($element, $scope, $attrs) {
        var self = this, optionsMap = new HashMap();
        self.ngModelCtrl = noopNgModelController, self.unknownOption = jqLite(document.createElement("option")), 
        self.renderUnknownOption = function(val) {
            var unknownVal = "? " + hashKey(val) + " ?";
            self.unknownOption.val(unknownVal), $element.prepend(self.unknownOption), $element.val(unknownVal);
        }, $scope.$on("$destroy", function() {
            self.renderUnknownOption = noop;
        }), self.removeUnknownOption = function() {
            self.unknownOption.parent() && self.unknownOption.remove();
        }, self.readValue = function() {
            return self.removeUnknownOption(), $element.val();
        }, self.writeValue = function(value) {
            self.hasOption(value) ? (self.removeUnknownOption(), $element.val(value), "" === value && self.emptyOption.prop("selected", !0)) : null == value && self.emptyOption ? (self.removeUnknownOption(), 
            $element.val("")) : self.renderUnknownOption(value);
        }, self.addOption = function(value, element) {
            assertNotHasOwnProperty(value, '"option value"'), "" === value && (self.emptyOption = element);
            var count = optionsMap.get(value) || 0;
            optionsMap.put(value, count + 1);
        }, self.removeOption = function(value) {
            var count = optionsMap.get(value);
            count && (1 === count ? (optionsMap.remove(value), "" === value && (self.emptyOption = undefined)) : optionsMap.put(value, count - 1));
        }, self.hasOption = function(value) {
            return !!optionsMap.get(value);
        };
    } ], selectDirective = function() {
        return {
            restrict: "E",
            require: [ "select", "?ngModel" ],
            controller: SelectController,
            link: function(scope, element, attr, ctrls) {
                var ngModelCtrl = ctrls[1];
                if (ngModelCtrl) {
                    var selectCtrl = ctrls[0];
                    if (selectCtrl.ngModelCtrl = ngModelCtrl, ngModelCtrl.$render = function() {
                        selectCtrl.writeValue(ngModelCtrl.$viewValue);
                    }, element.on("change", function() {
                        scope.$apply(function() {
                            ngModelCtrl.$setViewValue(selectCtrl.readValue());
                        });
                    }), attr.multiple) {
                        selectCtrl.readValue = function() {
                            var array = [];
                            return forEach(element.find("option"), function(option) {
                                option.selected && array.push(option.value);
                            }), array;
                        }, selectCtrl.writeValue = function(value) {
                            var items = new HashMap(value);
                            forEach(element.find("option"), function(option) {
                                option.selected = isDefined(items.get(option.value));
                            });
                        };
                        var lastView, lastViewRef = NaN;
                        scope.$watch(function() {
                            lastViewRef !== ngModelCtrl.$viewValue || equals(lastView, ngModelCtrl.$viewValue) || (lastView = shallowCopy(ngModelCtrl.$viewValue), 
                            ngModelCtrl.$render()), lastViewRef = ngModelCtrl.$viewValue;
                        }), ngModelCtrl.$isEmpty = function(value) {
                            return !value || 0 === value.length;
                        };
                    }
                }
            }
        };
    }, optionDirective = [ "$interpolate", function($interpolate) {
        function chromeHack(optionElement) {
            optionElement[0].hasAttribute("selected") && (optionElement[0].selected = !0);
        }
        return {
            restrict: "E",
            priority: 100,
            compile: function(element, attr) {
                if (isDefined(attr.value)) var valueInterpolated = $interpolate(attr.value, !0); else {
                    var interpolateFn = $interpolate(element.text(), !0);
                    interpolateFn || attr.$set("value", element.text());
                }
                return function(scope, element, attr) {
                    function addOption(optionValue) {
                        selectCtrl.addOption(optionValue, element), selectCtrl.ngModelCtrl.$render(), chromeHack(element);
                    }
                    var selectCtrlName = "$selectController", parent = element.parent(), selectCtrl = parent.data(selectCtrlName) || parent.parent().data(selectCtrlName);
                    if (selectCtrl && selectCtrl.ngModelCtrl) {
                        if (valueInterpolated) {
                            var oldVal;
                            attr.$observe("value", function(newVal) {
                                isDefined(oldVal) && selectCtrl.removeOption(oldVal), oldVal = newVal, addOption(newVal);
                            });
                        } else interpolateFn ? scope.$watch(interpolateFn, function(newVal, oldVal) {
                            attr.$set("value", newVal), oldVal !== newVal && selectCtrl.removeOption(oldVal), 
                            addOption(newVal);
                        }) : addOption(attr.value);
                        element.on("$destroy", function() {
                            selectCtrl.removeOption(attr.value), selectCtrl.ngModelCtrl.$render();
                        });
                    }
                };
            }
        };
    } ], styleDirective = valueFn({
        restrict: "E",
        terminal: !1
    }), requiredDirective = function() {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(scope, elm, attr, ctrl) {
                ctrl && (attr.required = !0, ctrl.$validators.required = function(modelValue, viewValue) {
                    return !attr.required || !ctrl.$isEmpty(viewValue);
                }, attr.$observe("required", function() {
                    ctrl.$validate();
                }));
            }
        };
    }, patternDirective = function() {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(scope, elm, attr, ctrl) {
                if (ctrl) {
                    var regexp, patternExp = attr.ngPattern || attr.pattern;
                    attr.$observe("pattern", function(regex) {
                        if (isString(regex) && regex.length > 0 && (regex = new RegExp("^" + regex + "$")), 
                        regex && !regex.test) throw minErr("ngPattern")("noregexp", "Expected {0} to be a RegExp but was {1}. Element: {2}", patternExp, regex, startingTag(elm));
                        regexp = regex || undefined, ctrl.$validate();
                    }), ctrl.$validators.pattern = function(modelValue, viewValue) {
                        return ctrl.$isEmpty(viewValue) || isUndefined(regexp) || regexp.test(viewValue);
                    };
                }
            }
        };
    }, maxlengthDirective = function() {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(scope, elm, attr, ctrl) {
                if (ctrl) {
                    var maxlength = -1;
                    attr.$observe("maxlength", function(value) {
                        var intVal = toInt(value);
                        maxlength = isNaN(intVal) ? -1 : intVal, ctrl.$validate();
                    }), ctrl.$validators.maxlength = function(modelValue, viewValue) {
                        return 0 > maxlength || ctrl.$isEmpty(viewValue) || viewValue.length <= maxlength;
                    };
                }
            }
        };
    }, minlengthDirective = function() {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(scope, elm, attr, ctrl) {
                if (ctrl) {
                    var minlength = 0;
                    attr.$observe("minlength", function(value) {
                        minlength = toInt(value) || 0, ctrl.$validate();
                    }), ctrl.$validators.minlength = function(modelValue, viewValue) {
                        return ctrl.$isEmpty(viewValue) || viewValue.length >= minlength;
                    };
                }
            }
        };
    };
    return window.angular.bootstrap ? void console.log("WARNING: Tried to load angular more than once.") : (bindJQuery(), 
    publishExternalAPI(angular), angular.module("ngLocale", [], [ "$provide", function($provide) {
        function getDecimals(n) {
            n += "";
            var i = n.indexOf(".");
            return -1 == i ? 0 : n.length - i - 1;
        }
        function getVF(n, opt_precision) {
            var v = opt_precision;
            undefined === v && (v = Math.min(getDecimals(n), 3));
            var base = Math.pow(10, v), f = (n * base | 0) % base;
            return {
                v: v,
                f: f
            };
        }
        var PLURAL_CATEGORY = {
            ZERO: "zero",
            ONE: "one",
            TWO: "two",
            FEW: "few",
            MANY: "many",
            OTHER: "other"
        };
        $provide.value("$locale", {
            DATETIME_FORMATS: {
                AMPMS: [ "AM", "PM" ],
                DAY: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
                ERANAMES: [ "Before Christ", "Anno Domini" ],
                ERAS: [ "BC", "AD" ],
                FIRSTDAYOFWEEK: 6,
                MONTH: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
                SHORTDAY: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
                SHORTMONTH: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
                WEEKENDRANGE: [ 5, 6 ],
                fullDate: "EEEE, MMMM d, y",
                longDate: "MMMM d, y",
                medium: "MMM d, y h:mm:ss a",
                mediumDate: "MMM d, y",
                mediumTime: "h:mm:ss a",
                "short": "M/d/yy h:mm a",
                shortDate: "M/d/yy",
                shortTime: "h:mm a"
            },
            NUMBER_FORMATS: {
                CURRENCY_SYM: "$",
                DECIMAL_SEP: ".",
                GROUP_SEP: ",",
                PATTERNS: [ {
                    gSize: 3,
                    lgSize: 3,
                    maxFrac: 3,
                    minFrac: 0,
                    minInt: 1,
                    negPre: "-",
                    negSuf: "",
                    posPre: "",
                    posSuf: ""
                }, {
                    gSize: 3,
                    lgSize: 3,
                    maxFrac: 2,
                    minFrac: 2,
                    minInt: 1,
                    negPre: "-¤",
                    negSuf: "",
                    posPre: "¤",
                    posSuf: ""
                } ]
            },
            id: "en-us",
            pluralCat: function(n, opt_precision) {
                var i = 0 | n, vf = getVF(n, opt_precision);
                return 1 == i && 0 == vf.v ? PLURAL_CATEGORY.ONE : PLURAL_CATEGORY.OTHER;
            }
        });
    } ]), void jqLite(document).ready(function() {
        angularInit(document, bootstrap);
    }));
}(window, document), !window.angular.$$csp().noInlineStyle && window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>'), 
function(window, angular, undefined) {
    "use strict";
    function assertArg(arg, name, reason) {
        if (!arg) throw ngMinErr("areq", "Argument '{0}' is {1}", name || "?", reason || "required");
        return arg;
    }
    function mergeClasses(a, b) {
        return a || b ? a ? b ? (isArray(a) && (a = a.join(" ")), isArray(b) && (b = b.join(" ")), 
        a + " " + b) : a : b : "";
    }
    function packageStyles(options) {
        var styles = {};
        return options && (options.to || options.from) && (styles.to = options.to, styles.from = options.from), 
        styles;
    }
    function pendClasses(classes, fix, isPrefix) {
        var className = "";
        return classes = isArray(classes) ? classes : classes && isString(classes) && classes.length ? classes.split(/\s+/) : [], 
        forEach(classes, function(klass, i) {
            klass && klass.length > 0 && (className += i > 0 ? " " : "", className += isPrefix ? fix + klass : klass + fix);
        }), className;
    }
    function removeFromArray(arr, val) {
        var index = arr.indexOf(val);
        val >= 0 && arr.splice(index, 1);
    }
    function stripCommentsFromElement(element) {
        if (element instanceof jqLite) switch (element.length) {
          case 0:
            return [];

          case 1:
            if (element[0].nodeType === ELEMENT_NODE) return element;
            break;

          default:
            return jqLite(extractElementNode(element));
        }
        return element.nodeType === ELEMENT_NODE ? jqLite(element) : void 0;
    }
    function extractElementNode(element) {
        if (!element[0]) return element;
        for (var i = 0; i < element.length; i++) {
            var elm = element[i];
            if (elm.nodeType == ELEMENT_NODE) return elm;
        }
    }
    function $$addClass($$jqLite, element, className) {
        forEach(element, function(elm) {
            $$jqLite.addClass(elm, className);
        });
    }
    function $$removeClass($$jqLite, element, className) {
        forEach(element, function(elm) {
            $$jqLite.removeClass(elm, className);
        });
    }
    function applyAnimationClassesFactory($$jqLite) {
        return function(element, options) {
            options.addClass && ($$addClass($$jqLite, element, options.addClass), options.addClass = null), 
            options.removeClass && ($$removeClass($$jqLite, element, options.removeClass), options.removeClass = null);
        };
    }
    function prepareAnimationOptions(options) {
        if (options = options || {}, !options.$$prepared) {
            var domOperation = options.domOperation || noop;
            options.domOperation = function() {
                options.$$domOperationFired = !0, domOperation(), domOperation = noop;
            }, options.$$prepared = !0;
        }
        return options;
    }
    function applyAnimationStyles(element, options) {
        applyAnimationFromStyles(element, options), applyAnimationToStyles(element, options);
    }
    function applyAnimationFromStyles(element, options) {
        options.from && (element.css(options.from), options.from = null);
    }
    function applyAnimationToStyles(element, options) {
        options.to && (element.css(options.to), options.to = null);
    }
    function mergeAnimationOptions(element, target, newOptions) {
        var toAdd = (target.addClass || "") + " " + (newOptions.addClass || ""), toRemove = (target.removeClass || "") + " " + (newOptions.removeClass || ""), classes = resolveElementClasses(element.attr("class"), toAdd, toRemove);
        newOptions.preparationClasses && (target.preparationClasses = concatWithSpace(newOptions.preparationClasses, target.preparationClasses), 
        delete newOptions.preparationClasses);
        var realDomOperation = target.domOperation !== noop ? target.domOperation : null;
        return extend(target, newOptions), realDomOperation && (target.domOperation = realDomOperation), 
        classes.addClass ? target.addClass = classes.addClass : target.addClass = null, 
        classes.removeClass ? target.removeClass = classes.removeClass : target.removeClass = null, 
        target;
    }
    function resolveElementClasses(existing, toAdd, toRemove) {
        function splitClassesToLookup(classes) {
            isString(classes) && (classes = classes.split(" "));
            var obj = {};
            return forEach(classes, function(klass) {
                klass.length && (obj[klass] = !0);
            }), obj;
        }
        var ADD_CLASS = 1, REMOVE_CLASS = -1, flags = {};
        existing = splitClassesToLookup(existing), toAdd = splitClassesToLookup(toAdd), 
        forEach(toAdd, function(value, key) {
            flags[key] = ADD_CLASS;
        }), toRemove = splitClassesToLookup(toRemove), forEach(toRemove, function(value, key) {
            flags[key] = flags[key] === ADD_CLASS ? null : REMOVE_CLASS;
        });
        var classes = {
            addClass: "",
            removeClass: ""
        };
        return forEach(flags, function(val, klass) {
            var prop, allow;
            val === ADD_CLASS ? (prop = "addClass", allow = !existing[klass]) : val === REMOVE_CLASS && (prop = "removeClass", 
            allow = existing[klass]), allow && (classes[prop].length && (classes[prop] += " "), 
            classes[prop] += klass);
        }), classes;
    }
    function getDomNode(element) {
        return element instanceof angular.element ? element[0] : element;
    }
    function applyGeneratedPreparationClasses(element, event, options) {
        var classes = "";
        event && (classes = pendClasses(event, EVENT_CLASS_PREFIX, !0)), options.addClass && (classes = concatWithSpace(classes, pendClasses(options.addClass, ADD_CLASS_SUFFIX))), 
        options.removeClass && (classes = concatWithSpace(classes, pendClasses(options.removeClass, REMOVE_CLASS_SUFFIX))), 
        classes.length && (options.preparationClasses = classes, element.addClass(classes));
    }
    function clearGeneratedClasses(element, options) {
        options.preparationClasses && (element.removeClass(options.preparationClasses), 
        options.preparationClasses = null), options.activeClasses && (element.removeClass(options.activeClasses), 
        options.activeClasses = null);
    }
    function blockTransitions(node, duration) {
        var value = duration ? "-" + duration + "s" : "";
        return applyInlineStyle(node, [ TRANSITION_DELAY_PROP, value ]), [ TRANSITION_DELAY_PROP, value ];
    }
    function blockKeyframeAnimations(node, applyBlock) {
        var value = applyBlock ? "paused" : "", key = ANIMATION_PROP + ANIMATION_PLAYSTATE_KEY;
        return applyInlineStyle(node, [ key, value ]), [ key, value ];
    }
    function applyInlineStyle(node, styleTuple) {
        var prop = styleTuple[0], value = styleTuple[1];
        node.style[prop] = value;
    }
    function concatWithSpace(a, b) {
        return a ? b ? a + " " + b : a : b;
    }
    function $$BodyProvider() {
        this.$get = [ "$document", function($document) {
            return jqLite($document[0].body);
        } ];
    }
    function getCssKeyframeDurationStyle(duration) {
        return [ ANIMATION_DURATION_PROP, duration + "s" ];
    }
    function getCssDelayStyle(delay, isKeyframeAnimation) {
        var prop = isKeyframeAnimation ? ANIMATION_DELAY_PROP : TRANSITION_DELAY_PROP;
        return [ prop, delay + "s" ];
    }
    function computeCssStyles($window, element, properties) {
        var styles = Object.create(null), detectedStyles = $window.getComputedStyle(element) || {};
        return forEach(properties, function(formalStyleName, actualStyleName) {
            var val = detectedStyles[formalStyleName];
            if (val) {
                var c = val.charAt(0);
                ("-" === c || "+" === c || c >= 0) && (val = parseMaxTime(val)), 0 === val && (val = null), 
                styles[actualStyleName] = val;
            }
        }), styles;
    }
    function parseMaxTime(str) {
        var maxValue = 0, values = str.split(/\s*,\s*/);
        return forEach(values, function(value) {
            "s" == value.charAt(value.length - 1) && (value = value.substring(0, value.length - 1)), 
            value = parseFloat(value) || 0, maxValue = maxValue ? Math.max(value, maxValue) : value;
        }), maxValue;
    }
    function truthyTimingValue(val) {
        return 0 === val || null != val;
    }
    function getCssTransitionDurationStyle(duration, applyOnlyDuration) {
        var style = TRANSITION_PROP, value = duration + "s";
        return applyOnlyDuration ? style += DURATION_KEY : value += " linear all", [ style, value ];
    }
    function createLocalCacheLookup() {
        var cache = Object.create(null);
        return {
            flush: function() {
                cache = Object.create(null);
            },
            count: function(key) {
                var entry = cache[key];
                return entry ? entry.total : 0;
            },
            get: function(key) {
                var entry = cache[key];
                return entry && entry.value;
            },
            put: function(key, value) {
                cache[key] ? cache[key].total++ : cache[key] = {
                    total: 1,
                    value: value
                };
            }
        };
    }
    var TRANSITION_PROP, TRANSITIONEND_EVENT, ANIMATION_PROP, ANIMATIONEND_EVENT, noop = angular.noop, extend = angular.extend, jqLite = angular.element, forEach = angular.forEach, isArray = angular.isArray, isString = angular.isString, isObject = angular.isObject, isUndefined = angular.isUndefined, isDefined = angular.isDefined, isFunction = angular.isFunction, isElement = angular.isElement, ELEMENT_NODE = 1, ADD_CLASS_SUFFIX = "-add", REMOVE_CLASS_SUFFIX = "-remove", EVENT_CLASS_PREFIX = "ng-", ACTIVE_CLASS_SUFFIX = "-active", NG_ANIMATE_CLASSNAME = "ng-animate", NG_ANIMATE_CHILDREN_DATA = "$$ngAnimateChildren", CSS_PREFIX = "";
    isUndefined(window.ontransitionend) && isDefined(window.onwebkittransitionend) ? (CSS_PREFIX = "-webkit-", 
    TRANSITION_PROP = "WebkitTransition", TRANSITIONEND_EVENT = "webkitTransitionEnd transitionend") : (TRANSITION_PROP = "transition", 
    TRANSITIONEND_EVENT = "transitionend"), isUndefined(window.onanimationend) && isDefined(window.onwebkitanimationend) ? (CSS_PREFIX = "-webkit-", 
    ANIMATION_PROP = "WebkitAnimation", ANIMATIONEND_EVENT = "webkitAnimationEnd animationend") : (ANIMATION_PROP = "animation", 
    ANIMATIONEND_EVENT = "animationend");
    var DURATION_KEY = "Duration", PROPERTY_KEY = "Property", DELAY_KEY = "Delay", TIMING_KEY = "TimingFunction", ANIMATION_ITERATION_COUNT_KEY = "IterationCount", ANIMATION_PLAYSTATE_KEY = "PlayState", SAFE_FAST_FORWARD_DURATION_VALUE = 9999, ANIMATION_DELAY_PROP = ANIMATION_PROP + DELAY_KEY, ANIMATION_DURATION_PROP = ANIMATION_PROP + DURATION_KEY, TRANSITION_DELAY_PROP = TRANSITION_PROP + DELAY_KEY, TRANSITION_DURATION_PROP = TRANSITION_PROP + DURATION_KEY, $$rAFSchedulerFactory = [ "$$rAF", function($$rAF) {
        function scheduler(tasks) {
            queue = queue.concat(tasks), nextTick();
        }
        function nextTick() {
            if (queue.length) {
                for (var items = queue.shift(), i = 0; i < items.length; i++) items[i]();
                cancelFn || $$rAF(function() {
                    cancelFn || nextTick();
                });
            }
        }
        var queue, cancelFn;
        return queue = scheduler.queue = [], scheduler.waitUntilQuiet = function(fn) {
            cancelFn && cancelFn(), cancelFn = $$rAF(function() {
                cancelFn = null, fn(), nextTick();
            });
        }, scheduler;
    } ], $$AnimateChildrenDirective = [ function() {
        return function(scope, element, attrs) {
            var val = attrs.ngAnimateChildren;
            angular.isString(val) && 0 === val.length ? element.data(NG_ANIMATE_CHILDREN_DATA, !0) : attrs.$observe("ngAnimateChildren", function(value) {
                value = "on" === value || "true" === value, element.data(NG_ANIMATE_CHILDREN_DATA, value);
            });
        };
    } ], ANIMATE_TIMER_KEY = "$$animateCss", ONE_SECOND = 1e3, ELAPSED_TIME_MAX_DECIMAL_PLACES = 3, CLOSING_TIME_BUFFER = 1.5, DETECT_CSS_PROPERTIES = {
        transitionDuration: TRANSITION_DURATION_PROP,
        transitionDelay: TRANSITION_DELAY_PROP,
        transitionProperty: TRANSITION_PROP + PROPERTY_KEY,
        animationDuration: ANIMATION_DURATION_PROP,
        animationDelay: ANIMATION_DELAY_PROP,
        animationIterationCount: ANIMATION_PROP + ANIMATION_ITERATION_COUNT_KEY
    }, DETECT_STAGGER_CSS_PROPERTIES = {
        transitionDuration: TRANSITION_DURATION_PROP,
        transitionDelay: TRANSITION_DELAY_PROP,
        animationDuration: ANIMATION_DURATION_PROP,
        animationDelay: ANIMATION_DELAY_PROP
    }, $AnimateCssProvider = [ "$animateProvider", function($animateProvider) {
        var gcsLookup = createLocalCacheLookup(), gcsStaggerLookup = createLocalCacheLookup();
        this.$get = [ "$window", "$$jqLite", "$$AnimateRunner", "$timeout", "$$forceReflow", "$sniffer", "$$rAFScheduler", "$animate", function($window, $$jqLite, $$AnimateRunner, $timeout, $$forceReflow, $sniffer, $$rAFScheduler, $animate) {
            function gcsHashFn(node, extraClasses) {
                var KEY = "$$ngAnimateParentKey", parentNode = node.parentNode, parentID = parentNode[KEY] || (parentNode[KEY] = ++parentCounter);
                return parentID + "-" + node.getAttribute("class") + "-" + extraClasses;
            }
            function computeCachedCssStyles(node, className, cacheKey, properties) {
                var timings = gcsLookup.get(cacheKey);
                return timings || (timings = computeCssStyles($window, node, properties), "infinite" === timings.animationIterationCount && (timings.animationIterationCount = 1)), 
                gcsLookup.put(cacheKey, timings), timings;
            }
            function computeCachedCssStaggerStyles(node, className, cacheKey, properties) {
                var stagger;
                if (gcsLookup.count(cacheKey) > 0 && (stagger = gcsStaggerLookup.get(cacheKey), 
                !stagger)) {
                    var staggerClassName = pendClasses(className, "-stagger");
                    $$jqLite.addClass(node, staggerClassName), stagger = computeCssStyles($window, node, properties), 
                    stagger.animationDuration = Math.max(stagger.animationDuration, 0), stagger.transitionDuration = Math.max(stagger.transitionDuration, 0), 
                    $$jqLite.removeClass(node, staggerClassName), gcsStaggerLookup.put(cacheKey, stagger);
                }
                return stagger || {};
            }
            function waitUntilQuiet(callback) {
                rafWaitQueue.push(callback), $$rAFScheduler.waitUntilQuiet(function() {
                    gcsLookup.flush(), gcsStaggerLookup.flush();
                    for (var pageWidth = $$forceReflow(), i = 0; i < rafWaitQueue.length; i++) rafWaitQueue[i](pageWidth);
                    rafWaitQueue.length = 0;
                });
            }
            function computeTimings(node, className, cacheKey) {
                var timings = computeCachedCssStyles(node, className, cacheKey, DETECT_CSS_PROPERTIES), aD = timings.animationDelay, tD = timings.transitionDelay;
                return timings.maxDelay = aD && tD ? Math.max(aD, tD) : aD || tD, timings.maxDuration = Math.max(timings.animationDuration * timings.animationIterationCount, timings.transitionDuration), 
                timings;
            }
            var applyAnimationClasses = applyAnimationClassesFactory($$jqLite), parentCounter = 0, rafWaitQueue = [];
            return function(element, options) {
                function endFn() {
                    close();
                }
                function cancelFn() {
                    close(!0);
                }
                function close(rejected) {
                    animationClosed || animationCompleted && animationPaused || (animationClosed = !0, 
                    animationPaused = !1, options.$$skipPreparationClasses || $$jqLite.removeClass(element, preparationClasses), 
                    $$jqLite.removeClass(element, activeClasses), blockKeyframeAnimations(node, !1), 
                    blockTransitions(node, !1), forEach(temporaryStyles, function(entry) {
                        node.style[entry[0]] = "";
                    }), applyAnimationClasses(element, options), applyAnimationStyles(element, options), 
                    options.onDone && options.onDone(), runner && runner.complete(!rejected));
                }
                function applyBlocking(duration) {
                    flags.blockTransition && blockTransitions(node, duration), flags.blockKeyframeAnimation && blockKeyframeAnimations(node, !!duration);
                }
                function closeAndReturnNoopAnimator() {
                    return runner = new $$AnimateRunner({
                        end: endFn,
                        cancel: cancelFn
                    }), waitUntilQuiet(noop), close(), {
                        $$willAnimate: !1,
                        start: function() {
                            return runner;
                        },
                        end: endFn
                    };
                }
                function start() {
                    function triggerAnimationStart() {
                        if (!animationClosed) {
                            if (applyBlocking(!1), forEach(temporaryStyles, function(entry) {
                                var key = entry[0], value = entry[1];
                                node.style[key] = value;
                            }), applyAnimationClasses(element, options), $$jqLite.addClass(element, activeClasses), 
                            flags.recalculateTimingStyles) {
                                if (fullClassName = node.className + " " + preparationClasses, cacheKey = gcsHashFn(node, fullClassName), 
                                timings = computeTimings(node, fullClassName, cacheKey), relativeDelay = timings.maxDelay, 
                                maxDelay = Math.max(relativeDelay, 0), maxDuration = timings.maxDuration, 0 === maxDuration) return void close();
                                flags.hasTransitions = timings.transitionDuration > 0, flags.hasAnimations = timings.animationDuration > 0;
                            }
                            if (flags.applyAnimationDelay && (relativeDelay = "boolean" != typeof options.delay && truthyTimingValue(options.delay) ? parseFloat(options.delay) : relativeDelay, 
                            maxDelay = Math.max(relativeDelay, 0), timings.animationDelay = relativeDelay, delayStyle = getCssDelayStyle(relativeDelay, !0), 
                            temporaryStyles.push(delayStyle), node.style[delayStyle[0]] = delayStyle[1]), maxDelayTime = maxDelay * ONE_SECOND, 
                            maxDurationTime = maxDuration * ONE_SECOND, options.easing) {
                                var easeProp, easeVal = options.easing;
                                flags.hasTransitions && (easeProp = TRANSITION_PROP + TIMING_KEY, temporaryStyles.push([ easeProp, easeVal ]), 
                                node.style[easeProp] = easeVal), flags.hasAnimations && (easeProp = ANIMATION_PROP + TIMING_KEY, 
                                temporaryStyles.push([ easeProp, easeVal ]), node.style[easeProp] = easeVal);
                            }
                            timings.transitionDuration && events.push(TRANSITIONEND_EVENT), timings.animationDuration && events.push(ANIMATIONEND_EVENT), 
                            startTime = Date.now();
                            var timerTime = maxDelayTime + CLOSING_TIME_BUFFER * maxDurationTime, endTime = startTime + timerTime, animationsData = element.data(ANIMATE_TIMER_KEY) || [], setupFallbackTimer = !0;
                            if (animationsData.length) {
                                var currentTimerData = animationsData[0];
                                setupFallbackTimer = endTime > currentTimerData.expectedEndTime, setupFallbackTimer ? $timeout.cancel(currentTimerData.timer) : animationsData.push(close);
                            }
                            if (setupFallbackTimer) {
                                var timer = $timeout(onAnimationExpired, timerTime, !1);
                                animationsData[0] = {
                                    timer: timer,
                                    expectedEndTime: endTime
                                }, animationsData.push(close), element.data(ANIMATE_TIMER_KEY, animationsData);
                            }
                            element.on(events.join(" "), onAnimationProgress), applyAnimationToStyles(element, options);
                        }
                    }
                    function onAnimationExpired() {
                        var animationsData = element.data(ANIMATE_TIMER_KEY);
                        if (animationsData) {
                            for (var i = 1; i < animationsData.length; i++) animationsData[i]();
                            element.removeData(ANIMATE_TIMER_KEY);
                        }
                    }
                    function onAnimationProgress(event) {
                        event.stopPropagation();
                        var ev = event.originalEvent || event, timeStamp = ev.$manualTimeStamp || ev.timeStamp || Date.now(), elapsedTime = parseFloat(ev.elapsedTime.toFixed(ELAPSED_TIME_MAX_DECIMAL_PLACES));
                        Math.max(timeStamp - startTime, 0) >= maxDelayTime && elapsedTime >= maxDuration && (animationCompleted = !0, 
                        close());
                    }
                    if (!animationClosed) {
                        if (!node.parentNode) return void close();
                        var startTime, events = [], playPause = function(playAnimation) {
                            if (animationCompleted) animationPaused && playAnimation && (animationPaused = !1, 
                            close()); else if (animationPaused = !playAnimation, timings.animationDuration) {
                                var value = blockKeyframeAnimations(node, animationPaused);
                                animationPaused ? temporaryStyles.push(value) : removeFromArray(temporaryStyles, value);
                            }
                        }, maxStagger = itemIndex > 0 && (timings.transitionDuration && 0 === stagger.transitionDuration || timings.animationDuration && 0 === stagger.animationDuration) && Math.max(stagger.animationDelay, stagger.transitionDelay);
                        maxStagger ? $timeout(triggerAnimationStart, Math.floor(maxStagger * itemIndex * ONE_SECOND), !1) : triggerAnimationStart(), 
                        runnerHost.resume = function() {
                            playPause(!0);
                        }, runnerHost.pause = function() {
                            playPause(!1);
                        };
                    }
                }
                var node = getDomNode(element);
                if (!node || !node.parentNode || !$animate.enabled()) return closeAndReturnNoopAnimator();
                options = prepareAnimationOptions(options);
                var animationClosed, animationPaused, animationCompleted, runner, runnerHost, maxDelay, maxDelayTime, maxDuration, maxDurationTime, temporaryStyles = [], classes = element.attr("class"), styles = packageStyles(options);
                if (0 === options.duration || !$sniffer.animations && !$sniffer.transitions) return closeAndReturnNoopAnimator();
                var method = options.event && isArray(options.event) ? options.event.join(" ") : options.event, isStructural = method && options.structural, structuralClassName = "", addRemoveClassName = "";
                isStructural ? structuralClassName = pendClasses(method, EVENT_CLASS_PREFIX, !0) : method && (structuralClassName = method), 
                options.addClass && (addRemoveClassName += pendClasses(options.addClass, ADD_CLASS_SUFFIX)), 
                options.removeClass && (addRemoveClassName.length && (addRemoveClassName += " "), 
                addRemoveClassName += pendClasses(options.removeClass, REMOVE_CLASS_SUFFIX)), options.applyClassesEarly && addRemoveClassName.length && applyAnimationClasses(element, options);
                var preparationClasses = [ structuralClassName, addRemoveClassName ].join(" ").trim(), fullClassName = classes + " " + preparationClasses, activeClasses = pendClasses(preparationClasses, ACTIVE_CLASS_SUFFIX), hasToStyles = styles.to && Object.keys(styles.to).length > 0, containsKeyframeAnimation = (options.keyframeStyle || "").length > 0;
                if (!containsKeyframeAnimation && !hasToStyles && !preparationClasses) return closeAndReturnNoopAnimator();
                var cacheKey, stagger;
                if (options.stagger > 0) {
                    var staggerVal = parseFloat(options.stagger);
                    stagger = {
                        transitionDelay: staggerVal,
                        animationDelay: staggerVal,
                        transitionDuration: 0,
                        animationDuration: 0
                    };
                } else cacheKey = gcsHashFn(node, fullClassName), stagger = computeCachedCssStaggerStyles(node, preparationClasses, cacheKey, DETECT_STAGGER_CSS_PROPERTIES);
                options.$$skipPreparationClasses || $$jqLite.addClass(element, preparationClasses);
                var applyOnlyDuration;
                if (options.transitionStyle) {
                    var transitionStyle = [ TRANSITION_PROP, options.transitionStyle ];
                    applyInlineStyle(node, transitionStyle), temporaryStyles.push(transitionStyle);
                }
                if (options.duration >= 0) {
                    applyOnlyDuration = node.style[TRANSITION_PROP].length > 0;
                    var durationStyle = getCssTransitionDurationStyle(options.duration, applyOnlyDuration);
                    applyInlineStyle(node, durationStyle), temporaryStyles.push(durationStyle);
                }
                if (options.keyframeStyle) {
                    var keyframeStyle = [ ANIMATION_PROP, options.keyframeStyle ];
                    applyInlineStyle(node, keyframeStyle), temporaryStyles.push(keyframeStyle);
                }
                var itemIndex = stagger ? options.staggerIndex >= 0 ? options.staggerIndex : gcsLookup.count(cacheKey) : 0, isFirst = 0 === itemIndex;
                isFirst && !options.skipBlocking && blockTransitions(node, SAFE_FAST_FORWARD_DURATION_VALUE);
                var timings = computeTimings(node, fullClassName, cacheKey), relativeDelay = timings.maxDelay;
                maxDelay = Math.max(relativeDelay, 0), maxDuration = timings.maxDuration;
                var flags = {};
                if (flags.hasTransitions = timings.transitionDuration > 0, flags.hasAnimations = timings.animationDuration > 0, 
                flags.hasTransitionAll = flags.hasTransitions && "all" == timings.transitionProperty, 
                flags.applyTransitionDuration = hasToStyles && (flags.hasTransitions && !flags.hasTransitionAll || flags.hasAnimations && !flags.hasTransitions), 
                flags.applyAnimationDuration = options.duration && flags.hasAnimations, flags.applyTransitionDelay = truthyTimingValue(options.delay) && (flags.applyTransitionDuration || flags.hasTransitions), 
                flags.applyAnimationDelay = truthyTimingValue(options.delay) && flags.hasAnimations, 
                flags.recalculateTimingStyles = addRemoveClassName.length > 0, (flags.applyTransitionDuration || flags.applyAnimationDuration) && (maxDuration = options.duration ? parseFloat(options.duration) : maxDuration, 
                flags.applyTransitionDuration && (flags.hasTransitions = !0, timings.transitionDuration = maxDuration, 
                applyOnlyDuration = node.style[TRANSITION_PROP + PROPERTY_KEY].length > 0, temporaryStyles.push(getCssTransitionDurationStyle(maxDuration, applyOnlyDuration))), 
                flags.applyAnimationDuration && (flags.hasAnimations = !0, timings.animationDuration = maxDuration, 
                temporaryStyles.push(getCssKeyframeDurationStyle(maxDuration)))), 0 === maxDuration && !flags.recalculateTimingStyles) return closeAndReturnNoopAnimator();
                if (null != options.delay) {
                    var delayStyle = parseFloat(options.delay);
                    flags.applyTransitionDelay && temporaryStyles.push(getCssDelayStyle(delayStyle)), 
                    flags.applyAnimationDelay && temporaryStyles.push(getCssDelayStyle(delayStyle, !0));
                }
                return null == options.duration && timings.transitionDuration > 0 && (flags.recalculateTimingStyles = flags.recalculateTimingStyles || isFirst), 
                maxDelayTime = maxDelay * ONE_SECOND, maxDurationTime = maxDuration * ONE_SECOND, 
                options.skipBlocking || (flags.blockTransition = timings.transitionDuration > 0, 
                flags.blockKeyframeAnimation = timings.animationDuration > 0 && stagger.animationDelay > 0 && 0 === stagger.animationDuration), 
                applyAnimationFromStyles(element, options), flags.blockTransition || flags.blockKeyframeAnimation ? applyBlocking(maxDuration) : options.skipBlocking || blockTransitions(node, !1), 
                {
                    $$willAnimate: !0,
                    end: endFn,
                    start: function() {
                        return animationClosed ? void 0 : (runnerHost = {
                            end: endFn,
                            cancel: cancelFn,
                            resume: null,
                            pause: null
                        }, runner = new $$AnimateRunner(runnerHost), waitUntilQuiet(start), runner);
                    }
                };
            };
        } ];
    } ], $$AnimateCssDriverProvider = [ "$$animationProvider", function($$animationProvider) {
        $$animationProvider.drivers.push("$$animateCssDriver");
        var NG_ANIMATE_SHIM_CLASS_NAME = "ng-animate-shim", NG_ANIMATE_ANCHOR_CLASS_NAME = "ng-anchor", NG_OUT_ANCHOR_CLASS_NAME = "ng-anchor-out", NG_IN_ANCHOR_CLASS_NAME = "ng-anchor-in";
        this.$get = [ "$animateCss", "$rootScope", "$$AnimateRunner", "$rootElement", "$$body", "$sniffer", "$$jqLite", function($animateCss, $rootScope, $$AnimateRunner, $rootElement, $$body, $sniffer, $$jqLite) {
            function filterCssClasses(classes) {
                return classes.replace(/\bng-\S+\b/g, "");
            }
            function getUniqueValues(a, b) {
                return isString(a) && (a = a.split(" ")), isString(b) && (b = b.split(" ")), a.filter(function(val) {
                    return -1 === b.indexOf(val);
                }).join(" ");
            }
            function prepareAnchoredAnimation(classes, outAnchor, inAnchor) {
                function calculateAnchorStyles(anchor) {
                    var styles = {}, coords = getDomNode(anchor).getBoundingClientRect();
                    return forEach([ "width", "height", "top", "left" ], function(key) {
                        var value = coords[key];
                        switch (key) {
                          case "top":
                            value += bodyNode.scrollTop;
                            break;

                          case "left":
                            value += bodyNode.scrollLeft;
                        }
                        styles[key] = Math.floor(value) + "px";
                    }), styles;
                }
                function prepareOutAnimation() {
                    var animator = $animateCss(clone, {
                        addClass: NG_OUT_ANCHOR_CLASS_NAME,
                        delay: !0,
                        from: calculateAnchorStyles(outAnchor)
                    });
                    return animator.$$willAnimate ? animator : null;
                }
                function getClassVal(element) {
                    return element.attr("class") || "";
                }
                function prepareInAnimation() {
                    var endingClasses = filterCssClasses(getClassVal(inAnchor)), toAdd = getUniqueValues(endingClasses, startingClasses), toRemove = getUniqueValues(startingClasses, endingClasses), animator = $animateCss(clone, {
                        to: calculateAnchorStyles(inAnchor),
                        addClass: NG_IN_ANCHOR_CLASS_NAME + " " + toAdd,
                        removeClass: NG_OUT_ANCHOR_CLASS_NAME + " " + toRemove,
                        delay: !0
                    });
                    return animator.$$willAnimate ? animator : null;
                }
                function end() {
                    clone.remove(), outAnchor.removeClass(NG_ANIMATE_SHIM_CLASS_NAME), inAnchor.removeClass(NG_ANIMATE_SHIM_CLASS_NAME);
                }
                var clone = jqLite(getDomNode(outAnchor).cloneNode(!0)), startingClasses = filterCssClasses(getClassVal(clone));
                outAnchor.addClass(NG_ANIMATE_SHIM_CLASS_NAME), inAnchor.addClass(NG_ANIMATE_SHIM_CLASS_NAME), 
                clone.addClass(NG_ANIMATE_ANCHOR_CLASS_NAME), rootBodyElement.append(clone);
                var animatorIn, animatorOut = prepareOutAnimation();
                if (!animatorOut && (animatorIn = prepareInAnimation(), !animatorIn)) return end();
                var startingAnimator = animatorOut || animatorIn;
                return {
                    start: function() {
                        function endFn() {
                            currentAnimation && currentAnimation.end();
                        }
                        var runner, currentAnimation = startingAnimator.start();
                        return currentAnimation.done(function() {
                            return currentAnimation = null, !animatorIn && (animatorIn = prepareInAnimation()) ? (currentAnimation = animatorIn.start(), 
                            currentAnimation.done(function() {
                                currentAnimation = null, end(), runner.complete();
                            }), currentAnimation) : (end(), void runner.complete());
                        }), runner = new $$AnimateRunner({
                            end: endFn,
                            cancel: endFn
                        });
                    }
                };
            }
            function prepareFromToAnchorAnimation(from, to, classes, anchors) {
                var fromAnimation = prepareRegularAnimation(from, noop), toAnimation = prepareRegularAnimation(to, noop), anchorAnimations = [];
                return forEach(anchors, function(anchor) {
                    var outElement = anchor.out, inElement = anchor["in"], animator = prepareAnchoredAnimation(classes, outElement, inElement);
                    animator && anchorAnimations.push(animator);
                }), fromAnimation || toAnimation || 0 !== anchorAnimations.length ? {
                    start: function() {
                        function endFn() {
                            forEach(animationRunners, function(runner) {
                                runner.end();
                            });
                        }
                        var animationRunners = [];
                        fromAnimation && animationRunners.push(fromAnimation.start()), toAnimation && animationRunners.push(toAnimation.start()), 
                        forEach(anchorAnimations, function(animation) {
                            animationRunners.push(animation.start());
                        });
                        var runner = new $$AnimateRunner({
                            end: endFn,
                            cancel: endFn
                        });
                        return $$AnimateRunner.all(animationRunners, function(status) {
                            runner.complete(status);
                        }), runner;
                    }
                } : void 0;
            }
            function prepareRegularAnimation(animationDetails) {
                var element = animationDetails.element, options = animationDetails.options || {};
                animationDetails.structural && (options.event = animationDetails.event, options.structural = !0, 
                options.applyClassesEarly = !0, "leave" === animationDetails.event && (options.onDone = options.domOperation)), 
                options.preparationClasses && (options.event = concatWithSpace(options.event, options.preparationClasses));
                var animator = $animateCss(element, options);
                return animator.$$willAnimate ? animator : null;
            }
            if (!$sniffer.animations && !$sniffer.transitions) return noop;
            var bodyNode = getDomNode($$body), rootNode = getDomNode($rootElement), rootBodyElement = jqLite(bodyNode.parentNode === rootNode ? bodyNode : rootNode);
            applyAnimationClassesFactory($$jqLite);
            return function(animationDetails) {
                return animationDetails.from && animationDetails.to ? prepareFromToAnchorAnimation(animationDetails.from, animationDetails.to, animationDetails.classes, animationDetails.anchors) : prepareRegularAnimation(animationDetails);
            };
        } ];
    } ], $$AnimateJsProvider = [ "$animateProvider", function($animateProvider) {
        this.$get = [ "$injector", "$$AnimateRunner", "$$jqLite", function($injector, $$AnimateRunner, $$jqLite) {
            function lookupAnimations(classes) {
                classes = isArray(classes) ? classes : classes.split(" ");
                for (var matches = [], flagMap = {}, i = 0; i < classes.length; i++) {
                    var klass = classes[i], animationFactory = $animateProvider.$$registeredAnimations[klass];
                    animationFactory && !flagMap[klass] && (matches.push($injector.get(animationFactory)), 
                    flagMap[klass] = !0);
                }
                return matches;
            }
            var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);
            return function(element, event, classes, options) {
                function applyOptions() {
                    options.domOperation(), applyAnimationClasses(element, options);
                }
                function executeAnimationFn(fn, element, event, options, onDone) {
                    var args;
                    switch (event) {
                      case "animate":
                        args = [ element, options.from, options.to, onDone ];
                        break;

                      case "setClass":
                        args = [ element, classesToAdd, classesToRemove, onDone ];
                        break;

                      case "addClass":
                        args = [ element, classesToAdd, onDone ];
                        break;

                      case "removeClass":
                        args = [ element, classesToRemove, onDone ];
                        break;

                      default:
                        args = [ element, onDone ];
                    }
                    args.push(options);
                    var value = fn.apply(fn, args);
                    if (value) if (isFunction(value.start) && (value = value.start()), value instanceof $$AnimateRunner) value.done(onDone); else if (isFunction(value)) return value;
                    return noop;
                }
                function groupEventedAnimations(element, event, options, animations, fnName) {
                    var operations = [];
                    return forEach(animations, function(ani) {
                        var animation = ani[fnName];
                        animation && operations.push(function() {
                            var runner, endProgressCb, resolved = !1, onAnimationComplete = function(rejected) {
                                resolved || (resolved = !0, (endProgressCb || noop)(rejected), runner.complete(!rejected));
                            };
                            return runner = new $$AnimateRunner({
                                end: function() {
                                    onAnimationComplete();
                                },
                                cancel: function() {
                                    onAnimationComplete(!0);
                                }
                            }), endProgressCb = executeAnimationFn(animation, element, event, options, function(result) {
                                var cancelled = result === !1;
                                onAnimationComplete(cancelled);
                            }), runner;
                        });
                    }), operations;
                }
                function packageAnimations(element, event, options, animations, fnName) {
                    var operations = groupEventedAnimations(element, event, options, animations, fnName);
                    if (0 === operations.length) {
                        var a, b;
                        "beforeSetClass" === fnName ? (a = groupEventedAnimations(element, "removeClass", options, animations, "beforeRemoveClass"), 
                        b = groupEventedAnimations(element, "addClass", options, animations, "beforeAddClass")) : "setClass" === fnName && (a = groupEventedAnimations(element, "removeClass", options, animations, "removeClass"), 
                        b = groupEventedAnimations(element, "addClass", options, animations, "addClass")), 
                        a && (operations = operations.concat(a)), b && (operations = operations.concat(b));
                    }
                    if (0 !== operations.length) return function(callback) {
                        var runners = [];
                        return operations.length && forEach(operations, function(animateFn) {
                            runners.push(animateFn());
                        }), runners.length ? $$AnimateRunner.all(runners, callback) : callback(), function(reject) {
                            forEach(runners, function(runner) {
                                reject ? runner.cancel() : runner.end();
                            });
                        };
                    };
                }
                3 === arguments.length && isObject(classes) && (options = classes, classes = null), 
                options = prepareAnimationOptions(options), classes || (classes = element.attr("class") || "", 
                options.addClass && (classes += " " + options.addClass), options.removeClass && (classes += " " + options.removeClass));
                var before, after, classesToAdd = options.addClass, classesToRemove = options.removeClass, animations = lookupAnimations(classes);
                if (animations.length) {
                    var afterFn, beforeFn;
                    "leave" == event ? (beforeFn = "leave", afterFn = "afterLeave") : (beforeFn = "before" + event.charAt(0).toUpperCase() + event.substr(1), 
                    afterFn = event), "enter" !== event && "move" !== event && (before = packageAnimations(element, event, options, animations, beforeFn)), 
                    after = packageAnimations(element, event, options, animations, afterFn);
                }
                return before || after ? {
                    start: function() {
                        function onComplete(success) {
                            animationClosed = !0, applyOptions(), applyAnimationStyles(element, options), runner.complete(success);
                        }
                        function endAnimations(cancelled) {
                            animationClosed || ((closeActiveAnimations || noop)(cancelled), onComplete(cancelled));
                        }
                        var closeActiveAnimations, chain = [];
                        before && chain.push(function(fn) {
                            closeActiveAnimations = before(fn);
                        }), chain.length ? chain.push(function(fn) {
                            applyOptions(), fn(!0);
                        }) : applyOptions(), after && chain.push(function(fn) {
                            closeActiveAnimations = after(fn);
                        });
                        var animationClosed = !1, runner = new $$AnimateRunner({
                            end: function() {
                                endAnimations();
                            },
                            cancel: function() {
                                endAnimations(!0);
                            }
                        });
                        return $$AnimateRunner.chain(chain, onComplete), runner;
                    }
                } : void 0;
            };
        } ];
    } ], $$AnimateJsDriverProvider = [ "$$animationProvider", function($$animationProvider) {
        $$animationProvider.drivers.push("$$animateJsDriver"), this.$get = [ "$$animateJs", "$$AnimateRunner", function($$animateJs, $$AnimateRunner) {
            function prepareAnimation(animationDetails) {
                var element = animationDetails.element, event = animationDetails.event, options = animationDetails.options, classes = animationDetails.classes;
                return $$animateJs(element, event, classes, options);
            }
            return function(animationDetails) {
                if (animationDetails.from && animationDetails.to) {
                    var fromAnimation = prepareAnimation(animationDetails.from), toAnimation = prepareAnimation(animationDetails.to);
                    if (!fromAnimation && !toAnimation) return;
                    return {
                        start: function() {
                            function endFnFactory() {
                                return function() {
                                    forEach(animationRunners, function(runner) {
                                        runner.end();
                                    });
                                };
                            }
                            function done(status) {
                                runner.complete(status);
                            }
                            var animationRunners = [];
                            fromAnimation && animationRunners.push(fromAnimation.start()), toAnimation && animationRunners.push(toAnimation.start()), 
                            $$AnimateRunner.all(animationRunners, done);
                            var runner = new $$AnimateRunner({
                                end: endFnFactory(),
                                cancel: endFnFactory()
                            });
                            return runner;
                        }
                    };
                }
                return prepareAnimation(animationDetails);
            };
        } ];
    } ], NG_ANIMATE_ATTR_NAME = "data-ng-animate", NG_ANIMATE_PIN_DATA = "$ngAnimatePin", $$AnimateQueueProvider = [ "$animateProvider", function($animateProvider) {
        function isAllowed(ruleType, element, currentAnimation, previousAnimation) {
            return rules[ruleType].some(function(fn) {
                return fn(element, currentAnimation, previousAnimation);
            });
        }
        function hasAnimationClasses(options, and) {
            options = options || {};
            var a = (options.addClass || "").length > 0, b = (options.removeClass || "").length > 0;
            return and ? a && b : a || b;
        }
        var PRE_DIGEST_STATE = 1, RUNNING_STATE = 2, rules = this.rules = {
            skip: [],
            cancel: [],
            join: []
        };
        rules.join.push(function(element, newAnimation, currentAnimation) {
            return !newAnimation.structural && hasAnimationClasses(newAnimation.options);
        }), rules.skip.push(function(element, newAnimation, currentAnimation) {
            return !newAnimation.structural && !hasAnimationClasses(newAnimation.options);
        }), rules.skip.push(function(element, newAnimation, currentAnimation) {
            return "leave" == currentAnimation.event && newAnimation.structural;
        }), rules.skip.push(function(element, newAnimation, currentAnimation) {
            return currentAnimation.structural && currentAnimation.state === RUNNING_STATE && !newAnimation.structural;
        }), rules.cancel.push(function(element, newAnimation, currentAnimation) {
            return currentAnimation.structural && newAnimation.structural;
        }), rules.cancel.push(function(element, newAnimation, currentAnimation) {
            return currentAnimation.state === RUNNING_STATE && newAnimation.structural;
        }), rules.cancel.push(function(element, newAnimation, currentAnimation) {
            var nO = newAnimation.options, cO = currentAnimation.options;
            return nO.addClass && nO.addClass === cO.removeClass || nO.removeClass && nO.removeClass === cO.addClass;
        }), this.$get = [ "$$rAF", "$rootScope", "$rootElement", "$document", "$$body", "$$HashMap", "$$animation", "$$AnimateRunner", "$templateRequest", "$$jqLite", "$$forceReflow", function($$rAF, $rootScope, $rootElement, $document, $$body, $$HashMap, $$animation, $$AnimateRunner, $templateRequest, $$jqLite, $$forceReflow) {
            function normalizeAnimationOptions(element, options) {
                return mergeAnimationOptions(element, options, {});
            }
            function findCallbacks(element, event) {
                var targetNode = getDomNode(element), matches = [], entries = callbackRegistry[event];
                return entries && forEach(entries, function(entry) {
                    entry.node.contains(targetNode) && matches.push(entry.callback);
                }), matches;
            }
            function triggerCallback(event, element, phase, data) {
                $$rAF(function() {
                    forEach(findCallbacks(element, event), function(callback) {
                        callback(element, phase, data);
                    });
                });
            }
            function queueAnimation(element, event, options) {
                function notifyProgress(runner, event, phase, data) {
                    triggerCallback(event, element, phase, data), runner.progress(event, phase, data);
                }
                function close(reject) {
                    clearGeneratedClasses(element, options), applyAnimationClasses(element, options), 
                    applyAnimationStyles(element, options), options.domOperation(), runner.complete(!reject);
                }
                var node, parent;
                element = stripCommentsFromElement(element), element && (node = getDomNode(element), 
                parent = element.parent()), options = prepareAnimationOptions(options);
                var runner = new $$AnimateRunner();
                if (isArray(options.addClass) && (options.addClass = options.addClass.join(" ")), 
                options.addClass && !isString(options.addClass) && (options.addClass = null), isArray(options.removeClass) && (options.removeClass = options.removeClass.join(" ")), 
                options.removeClass && !isString(options.removeClass) && (options.removeClass = null), 
                options.from && !isObject(options.from) && (options.from = null), options.to && !isObject(options.to) && (options.to = null), 
                !node) return close(), runner;
                var className = [ node.className, options.addClass, options.removeClass ].join(" ");
                if (!isAnimatableClassName(className)) return close(), runner;
                var isStructural = [ "enter", "move", "leave" ].indexOf(event) >= 0, skipAnimations = !animationsEnabled || disabledElementsLookup.get(node), existingAnimation = !skipAnimations && activeAnimationsLookup.get(node) || {}, hasExistingAnimation = !!existingAnimation.state;
                if (skipAnimations || hasExistingAnimation && existingAnimation.state == PRE_DIGEST_STATE || (skipAnimations = !areAnimationsAllowed(element, parent, event)), 
                skipAnimations) return close(), runner;
                isStructural && closeChildAnimations(element);
                var newAnimation = {
                    structural: isStructural,
                    element: element,
                    event: event,
                    close: close,
                    options: options,
                    runner: runner
                };
                if (hasExistingAnimation) {
                    var skipAnimationFlag = isAllowed("skip", element, newAnimation, existingAnimation);
                    if (skipAnimationFlag) return existingAnimation.state === RUNNING_STATE ? (close(), 
                    runner) : (mergeAnimationOptions(element, existingAnimation.options, options), existingAnimation.runner);
                    var cancelAnimationFlag = isAllowed("cancel", element, newAnimation, existingAnimation);
                    if (cancelAnimationFlag) if (existingAnimation.state === RUNNING_STATE) existingAnimation.runner.end(); else {
                        if (!existingAnimation.structural) return mergeAnimationOptions(element, existingAnimation.options, newAnimation.options), 
                        existingAnimation.runner;
                        existingAnimation.close();
                    } else {
                        var joinAnimationFlag = isAllowed("join", element, newAnimation, existingAnimation);
                        if (joinAnimationFlag) {
                            if (existingAnimation.state !== RUNNING_STATE) return applyGeneratedPreparationClasses(element, isStructural ? event : null, options), 
                            event = newAnimation.event = existingAnimation.event, options = mergeAnimationOptions(element, existingAnimation.options, newAnimation.options), 
                            existingAnimation.runner;
                            normalizeAnimationOptions(element, options);
                        }
                    }
                } else normalizeAnimationOptions(element, options);
                var isValidAnimation = newAnimation.structural;
                if (isValidAnimation || (isValidAnimation = "animate" === newAnimation.event && Object.keys(newAnimation.options.to || {}).length > 0 || hasAnimationClasses(newAnimation.options)), 
                !isValidAnimation) return close(), clearElementAnimationState(element), runner;
                var counter = (existingAnimation.counter || 0) + 1;
                return newAnimation.counter = counter, markElementAnimationState(element, PRE_DIGEST_STATE, newAnimation), 
                $rootScope.$$postDigest(function() {
                    var animationDetails = activeAnimationsLookup.get(node), animationCancelled = !animationDetails;
                    animationDetails = animationDetails || {};
                    var parentElement = element.parent() || [], isValidAnimation = parentElement.length > 0 && ("animate" === animationDetails.event || animationDetails.structural || hasAnimationClasses(animationDetails.options));
                    if (animationCancelled || animationDetails.counter !== counter || !isValidAnimation) return animationCancelled && (applyAnimationClasses(element, options), 
                    applyAnimationStyles(element, options)), (animationCancelled || isStructural && animationDetails.event !== event) && (options.domOperation(), 
                    runner.end()), void (isValidAnimation || clearElementAnimationState(element));
                    event = !animationDetails.structural && hasAnimationClasses(animationDetails.options, !0) ? "setClass" : animationDetails.event, 
                    markElementAnimationState(element, RUNNING_STATE);
                    var realRunner = $$animation(element, event, animationDetails.options);
                    realRunner.done(function(status) {
                        close(!status);
                        var animationDetails = activeAnimationsLookup.get(node);
                        animationDetails && animationDetails.counter === counter && clearElementAnimationState(getDomNode(element)), 
                        notifyProgress(runner, event, "close", {});
                    }), runner.setHost(realRunner), notifyProgress(runner, event, "start", {});
                }), runner;
            }
            function closeChildAnimations(element) {
                var node = getDomNode(element), children = node.querySelectorAll("[" + NG_ANIMATE_ATTR_NAME + "]");
                forEach(children, function(child) {
                    var state = parseInt(child.getAttribute(NG_ANIMATE_ATTR_NAME)), animationDetails = activeAnimationsLookup.get(child);
                    switch (state) {
                      case RUNNING_STATE:
                        animationDetails.runner.end();

                      case PRE_DIGEST_STATE:
                        animationDetails && activeAnimationsLookup.remove(child);
                    }
                });
            }
            function clearElementAnimationState(element) {
                var node = getDomNode(element);
                node.removeAttribute(NG_ANIMATE_ATTR_NAME), activeAnimationsLookup.remove(node);
            }
            function isMatchingElement(nodeOrElmA, nodeOrElmB) {
                return getDomNode(nodeOrElmA) === getDomNode(nodeOrElmB);
            }
            function areAnimationsAllowed(element, parentElement, event) {
                var animateChildren, bodyElementDetected = isMatchingElement(element, $$body) || "HTML" === element[0].nodeName, rootElementDetected = isMatchingElement(element, $rootElement), parentAnimationDetected = !1, parentHost = element.data(NG_ANIMATE_PIN_DATA);
                for (parentHost && (parentElement = parentHost); parentElement && parentElement.length; ) {
                    rootElementDetected || (rootElementDetected = isMatchingElement(parentElement, $rootElement));
                    var parentNode = parentElement[0];
                    if (parentNode.nodeType !== ELEMENT_NODE) break;
                    var details = activeAnimationsLookup.get(parentNode) || {};
                    if (parentAnimationDetected || (parentAnimationDetected = details.structural || disabledElementsLookup.get(parentNode)), 
                    isUndefined(animateChildren) || animateChildren === !0) {
                        var value = parentElement.data(NG_ANIMATE_CHILDREN_DATA);
                        isDefined(value) && (animateChildren = value);
                    }
                    if (parentAnimationDetected && animateChildren === !1) break;
                    rootElementDetected || (rootElementDetected = isMatchingElement(parentElement, $rootElement), 
                    rootElementDetected || (parentHost = parentElement.data(NG_ANIMATE_PIN_DATA), parentHost && (parentElement = parentHost))), 
                    bodyElementDetected || (bodyElementDetected = isMatchingElement(parentElement, $$body)), 
                    parentElement = parentElement.parent();
                }
                var allowAnimation = !parentAnimationDetected || animateChildren;
                return allowAnimation && rootElementDetected && bodyElementDetected;
            }
            function markElementAnimationState(element, state, details) {
                details = details || {}, details.state = state;
                var node = getDomNode(element);
                node.setAttribute(NG_ANIMATE_ATTR_NAME, state);
                var oldValue = activeAnimationsLookup.get(node), newValue = oldValue ? extend(oldValue, details) : details;
                activeAnimationsLookup.put(node, newValue);
            }
            var activeAnimationsLookup = new $$HashMap(), disabledElementsLookup = new $$HashMap(), animationsEnabled = null, deregisterWatch = $rootScope.$watch(function() {
                return 0 === $templateRequest.totalPendingRequests;
            }, function(isEmpty) {
                isEmpty && (deregisterWatch(), $rootScope.$$postDigest(function() {
                    $rootScope.$$postDigest(function() {
                        null === animationsEnabled && (animationsEnabled = !0);
                    });
                }));
            }), callbackRegistry = {}, classNameFilter = $animateProvider.classNameFilter(), isAnimatableClassName = classNameFilter ? function(className) {
                return classNameFilter.test(className);
            } : function() {
                return !0;
            }, applyAnimationClasses = applyAnimationClassesFactory($$jqLite);
            return {
                on: function(event, container, callback) {
                    var node = extractElementNode(container);
                    callbackRegistry[event] = callbackRegistry[event] || [], callbackRegistry[event].push({
                        node: node,
                        callback: callback
                    });
                },
                off: function(event, container, callback) {
                    function filterFromRegistry(list, matchContainer, matchCallback) {
                        var containerNode = extractElementNode(matchContainer);
                        return list.filter(function(entry) {
                            var isMatch = entry.node === containerNode && (!matchCallback || entry.callback === matchCallback);
                            return !isMatch;
                        });
                    }
                    var entries = callbackRegistry[event];
                    entries && (callbackRegistry[event] = 1 === arguments.length ? null : filterFromRegistry(entries, container, callback));
                },
                pin: function(element, parentElement) {
                    assertArg(isElement(element), "element", "not an element"), assertArg(isElement(parentElement), "parentElement", "not an element"), 
                    element.data(NG_ANIMATE_PIN_DATA, parentElement);
                },
                push: function(element, event, options, domOperation) {
                    return options = options || {}, options.domOperation = domOperation, queueAnimation(element, event, options);
                },
                enabled: function(element, bool) {
                    var argCount = arguments.length;
                    if (0 === argCount) bool = !!animationsEnabled; else {
                        var hasElement = isElement(element);
                        if (hasElement) {
                            var node = getDomNode(element), recordExists = disabledElementsLookup.get(node);
                            1 === argCount ? bool = !recordExists : (bool = !!bool, bool ? recordExists && disabledElementsLookup.remove(node) : disabledElementsLookup.put(node, !0));
                        } else bool = animationsEnabled = !!element;
                    }
                    return bool;
                }
            };
        } ];
    } ], $$AnimateAsyncRunFactory = [ "$$rAF", function($$rAF) {
        function waitForTick(fn) {
            waitQueue.push(fn), waitQueue.length > 1 || $$rAF(function() {
                for (var i = 0; i < waitQueue.length; i++) waitQueue[i]();
                waitQueue = [];
            });
        }
        var waitQueue = [];
        return function() {
            var passed = !1;
            return waitForTick(function() {
                passed = !0;
            }), function(callback) {
                passed ? callback() : waitForTick(callback);
            };
        };
    } ], $$AnimateRunnerFactory = [ "$q", "$sniffer", "$$animateAsyncRun", function($q, $sniffer, $$animateAsyncRun) {
        function AnimateRunner(host) {
            this.setHost(host), this._doneCallbacks = [], this._runInAnimationFrame = $$animateAsyncRun(), 
            this._state = 0;
        }
        var INITIAL_STATE = 0, DONE_PENDING_STATE = 1, DONE_COMPLETE_STATE = 2;
        return AnimateRunner.chain = function(chain, callback) {
            function next() {
                return index === chain.length ? void callback(!0) : void chain[index](function(response) {
                    return response === !1 ? void callback(!1) : (index++, void next());
                });
            }
            var index = 0;
            next();
        }, AnimateRunner.all = function(runners, callback) {
            function onProgress(response) {
                status = status && response, ++count === runners.length && callback(status);
            }
            var count = 0, status = !0;
            forEach(runners, function(runner) {
                runner.done(onProgress);
            });
        }, AnimateRunner.prototype = {
            setHost: function(host) {
                this.host = host || {};
            },
            done: function(fn) {
                this._state === DONE_COMPLETE_STATE ? fn() : this._doneCallbacks.push(fn);
            },
            progress: noop,
            getPromise: function() {
                if (!this.promise) {
                    var self = this;
                    this.promise = $q(function(resolve, reject) {
                        self.done(function(status) {
                            status === !1 ? reject() : resolve();
                        });
                    });
                }
                return this.promise;
            },
            then: function(resolveHandler, rejectHandler) {
                return this.getPromise().then(resolveHandler, rejectHandler);
            },
            "catch": function(handler) {
                return this.getPromise()["catch"](handler);
            },
            "finally": function(handler) {
                return this.getPromise()["finally"](handler);
            },
            pause: function() {
                this.host.pause && this.host.pause();
            },
            resume: function() {
                this.host.resume && this.host.resume();
            },
            end: function() {
                this.host.end && this.host.end(), this._resolve(!0);
            },
            cancel: function() {
                this.host.cancel && this.host.cancel(), this._resolve(!1);
            },
            complete: function(response) {
                var self = this;
                self._state === INITIAL_STATE && (self._state = DONE_PENDING_STATE, self._runInAnimationFrame(function() {
                    self._resolve(response);
                }));
            },
            _resolve: function(response) {
                this._state !== DONE_COMPLETE_STATE && (forEach(this._doneCallbacks, function(fn) {
                    fn(response);
                }), this._doneCallbacks.length = 0, this._state = DONE_COMPLETE_STATE);
            }
        }, AnimateRunner;
    } ], $$AnimationProvider = [ "$animateProvider", function($animateProvider) {
        function setRunner(element, runner) {
            element.data(RUNNER_STORAGE_KEY, runner);
        }
        function removeRunner(element) {
            element.removeData(RUNNER_STORAGE_KEY);
        }
        function getRunner(element) {
            return element.data(RUNNER_STORAGE_KEY);
        }
        var NG_ANIMATE_REF_ATTR = "ng-animate-ref", drivers = this.drivers = [], RUNNER_STORAGE_KEY = "$$animationRunner";
        this.$get = [ "$$jqLite", "$rootScope", "$injector", "$$AnimateRunner", "$$HashMap", "$$rAFScheduler", function($$jqLite, $rootScope, $injector, $$AnimateRunner, $$HashMap, $$rAFScheduler) {
            function sortAnimations(animations) {
                function processNode(entry) {
                    if (entry.processed) return entry;
                    entry.processed = !0;
                    var elementNode = entry.domNode, parentNode = elementNode.parentNode;
                    lookup.put(elementNode, entry);
                    for (var parentEntry; parentNode; ) {
                        if (parentEntry = lookup.get(parentNode)) {
                            parentEntry.processed || (parentEntry = processNode(parentEntry));
                            break;
                        }
                        parentNode = parentNode.parentNode;
                    }
                    return (parentEntry || tree).children.push(entry), entry;
                }
                function flatten(tree) {
                    var i, result = [], queue = [];
                    for (i = 0; i < tree.children.length; i++) queue.push(tree.children[i]);
                    var remainingLevelEntries = queue.length, nextLevelEntries = 0, row = [];
                    for (i = 0; i < queue.length; i++) {
                        var entry = queue[i];
                        0 >= remainingLevelEntries && (remainingLevelEntries = nextLevelEntries, nextLevelEntries = 0, 
                        result.push(row), row = []), row.push(entry.fn), entry.children.forEach(function(childEntry) {
                            nextLevelEntries++, queue.push(childEntry);
                        }), remainingLevelEntries--;
                    }
                    return row.length && result.push(row), result;
                }
                var i, tree = {
                    children: []
                }, lookup = new $$HashMap();
                for (i = 0; i < animations.length; i++) {
                    var animation = animations[i];
                    lookup.put(animation.domNode, animations[i] = {
                        domNode: animation.domNode,
                        fn: animation.fn,
                        children: []
                    });
                }
                for (i = 0; i < animations.length; i++) processNode(animations[i]);
                return flatten(tree);
            }
            var animationQueue = [], applyAnimationClasses = applyAnimationClassesFactory($$jqLite);
            return function(element, event, options) {
                function getAnchorNodes(node) {
                    var SELECTOR = "[" + NG_ANIMATE_REF_ATTR + "]", items = node.hasAttribute(NG_ANIMATE_REF_ATTR) ? [ node ] : node.querySelectorAll(SELECTOR), anchors = [];
                    return forEach(items, function(node) {
                        var attr = node.getAttribute(NG_ANIMATE_REF_ATTR);
                        attr && attr.length && anchors.push(node);
                    }), anchors;
                }
                function groupAnimations(animations) {
                    var preparedAnimations = [], refLookup = {};
                    forEach(animations, function(animation, index) {
                        var element = animation.element, node = getDomNode(element), event = animation.event, enterOrMove = [ "enter", "move" ].indexOf(event) >= 0, anchorNodes = animation.structural ? getAnchorNodes(node) : [];
                        if (anchorNodes.length) {
                            var direction = enterOrMove ? "to" : "from";
                            forEach(anchorNodes, function(anchor) {
                                var key = anchor.getAttribute(NG_ANIMATE_REF_ATTR);
                                refLookup[key] = refLookup[key] || {}, refLookup[key][direction] = {
                                    animationID: index,
                                    element: jqLite(anchor)
                                };
                            });
                        } else preparedAnimations.push(animation);
                    });
                    var usedIndicesLookup = {}, anchorGroups = {};
                    return forEach(refLookup, function(operations, key) {
                        var from = operations.from, to = operations.to;
                        if (!from || !to) {
                            var index = from ? from.animationID : to.animationID, indexKey = index.toString();
                            return void (usedIndicesLookup[indexKey] || (usedIndicesLookup[indexKey] = !0, preparedAnimations.push(animations[index])));
                        }
                        var fromAnimation = animations[from.animationID], toAnimation = animations[to.animationID], lookupKey = from.animationID.toString();
                        if (!anchorGroups[lookupKey]) {
                            var group = anchorGroups[lookupKey] = {
                                structural: !0,
                                beforeStart: function() {
                                    fromAnimation.beforeStart(), toAnimation.beforeStart();
                                },
                                close: function() {
                                    fromAnimation.close(), toAnimation.close();
                                },
                                classes: cssClassesIntersection(fromAnimation.classes, toAnimation.classes),
                                from: fromAnimation,
                                to: toAnimation,
                                anchors: []
                            };
                            group.classes.length ? preparedAnimations.push(group) : (preparedAnimations.push(fromAnimation), 
                            preparedAnimations.push(toAnimation));
                        }
                        anchorGroups[lookupKey].anchors.push({
                            out: from.element,
                            "in": to.element
                        });
                    }), preparedAnimations;
                }
                function cssClassesIntersection(a, b) {
                    a = a.split(" "), b = b.split(" ");
                    for (var matches = [], i = 0; i < a.length; i++) {
                        var aa = a[i];
                        if ("ng-" !== aa.substring(0, 3)) for (var j = 0; j < b.length; j++) if (aa === b[j]) {
                            matches.push(aa);
                            break;
                        }
                    }
                    return matches.join(" ");
                }
                function invokeFirstDriver(animationDetails) {
                    for (var i = drivers.length - 1; i >= 0; i--) {
                        var driverName = drivers[i];
                        if ($injector.has(driverName)) {
                            var factory = $injector.get(driverName), driver = factory(animationDetails);
                            if (driver) return driver;
                        }
                    }
                }
                function beforeStart() {
                    element.addClass(NG_ANIMATE_CLASSNAME), tempClasses && $$jqLite.addClass(element, tempClasses);
                }
                function updateAnimationRunners(animation, newRunner) {
                    function update(element) {
                        getRunner(element).setHost(newRunner);
                    }
                    animation.from && animation.to ? (update(animation.from.element), update(animation.to.element)) : update(animation.element);
                }
                function handleDestroyedElement() {
                    var runner = getRunner(element);
                    !runner || "leave" === event && options.$$domOperationFired || runner.end();
                }
                function close(rejected) {
                    element.off("$destroy", handleDestroyedElement), removeRunner(element), applyAnimationClasses(element, options), 
                    applyAnimationStyles(element, options), options.domOperation(), tempClasses && $$jqLite.removeClass(element, tempClasses), 
                    element.removeClass(NG_ANIMATE_CLASSNAME), runner.complete(!rejected);
                }
                options = prepareAnimationOptions(options);
                var isStructural = [ "enter", "move", "leave" ].indexOf(event) >= 0, runner = new $$AnimateRunner({
                    end: function() {
                        close();
                    },
                    cancel: function() {
                        close(!0);
                    }
                });
                if (!drivers.length) return close(), runner;
                setRunner(element, runner);
                var classes = mergeClasses(element.attr("class"), mergeClasses(options.addClass, options.removeClass)), tempClasses = options.tempClasses;
                return tempClasses && (classes += " " + tempClasses, options.tempClasses = null), 
                animationQueue.push({
                    element: element,
                    classes: classes,
                    event: event,
                    structural: isStructural,
                    options: options,
                    beforeStart: beforeStart,
                    close: close
                }), element.on("$destroy", handleDestroyedElement), animationQueue.length > 1 ? runner : ($rootScope.$$postDigest(function() {
                    var animations = [];
                    forEach(animationQueue, function(entry) {
                        getRunner(entry.element) ? animations.push(entry) : entry.close();
                    }), animationQueue.length = 0;
                    var groupedAnimations = groupAnimations(animations), toBeSortedAnimations = [];
                    forEach(groupedAnimations, function(animationEntry) {
                        toBeSortedAnimations.push({
                            domNode: getDomNode(animationEntry.from ? animationEntry.from.element : animationEntry.element),
                            fn: function() {
                                animationEntry.beforeStart();
                                var startAnimationFn, closeFn = animationEntry.close, targetElement = animationEntry.anchors ? animationEntry.from.element || animationEntry.to.element : animationEntry.element;
                                if (getRunner(targetElement)) {
                                    var operation = invokeFirstDriver(animationEntry);
                                    operation && (startAnimationFn = operation.start);
                                }
                                if (startAnimationFn) {
                                    var animationRunner = startAnimationFn();
                                    animationRunner.done(function(status) {
                                        closeFn(!status);
                                    }), updateAnimationRunners(animationEntry, animationRunner);
                                } else closeFn();
                            }
                        });
                    }), $$rAFScheduler(sortAnimations(toBeSortedAnimations));
                }), runner);
            };
        } ];
    } ];
    angular.module("ngAnimate", []).provider("$$body", $$BodyProvider).directive("ngAnimateChildren", $$AnimateChildrenDirective).factory("$$rAFScheduler", $$rAFSchedulerFactory).factory("$$AnimateRunner", $$AnimateRunnerFactory).factory("$$animateAsyncRun", $$AnimateAsyncRunFactory).provider("$$animateQueue", $$AnimateQueueProvider).provider("$$animation", $$AnimationProvider).provider("$animateCss", $AnimateCssProvider).provider("$$animateCssDriver", $$AnimateCssDriverProvider).provider("$$animateJs", $$AnimateJsProvider).provider("$$animateJsDriver", $$AnimateJsDriverProvider);
}(window, window.angular), function(window, angular, undefined) {
    "use strict";
    function $RouteProvider() {
        function inherit(parent, extra) {
            return angular.extend(Object.create(parent), extra);
        }
        function pathRegExp(path, opts) {
            var insensitive = opts.caseInsensitiveMatch, ret = {
                originalPath: path,
                regexp: path
            }, keys = ret.keys = [];
            return path = path.replace(/([().])/g, "\\$1").replace(/(\/)?:(\w+)([\?\*])?/g, function(_, slash, key, option) {
                var optional = "?" === option ? option : null, star = "*" === option ? option : null;
                return keys.push({
                    name: key,
                    optional: !!optional
                }), slash = slash || "", "" + (optional ? "" : slash) + "(?:" + (optional ? slash : "") + (star && "(.+?)" || "([^/]+)") + (optional || "") + ")" + (optional || "");
            }).replace(/([\/$\*])/g, "\\$1"), ret.regexp = new RegExp("^" + path + "$", insensitive ? "i" : ""), 
            ret;
        }
        var routes = {};
        this.when = function(path, route) {
            var routeCopy = angular.copy(route);
            if (angular.isUndefined(routeCopy.reloadOnSearch) && (routeCopy.reloadOnSearch = !0), 
            angular.isUndefined(routeCopy.caseInsensitiveMatch) && (routeCopy.caseInsensitiveMatch = this.caseInsensitiveMatch), 
            routes[path] = angular.extend(routeCopy, path && pathRegExp(path, routeCopy)), path) {
                var redirectPath = "/" == path[path.length - 1] ? path.substr(0, path.length - 1) : path + "/";
                routes[redirectPath] = angular.extend({
                    redirectTo: path
                }, pathRegExp(redirectPath, routeCopy));
            }
            return this;
        }, this.caseInsensitiveMatch = !1, this.otherwise = function(params) {
            return "string" == typeof params && (params = {
                redirectTo: params
            }), this.when(null, params), this;
        }, this.$get = [ "$rootScope", "$location", "$routeParams", "$q", "$injector", "$templateRequest", "$sce", function($rootScope, $location, $routeParams, $q, $injector, $templateRequest, $sce) {
            function switchRouteMatcher(on, route) {
                var keys = route.keys, params = {};
                if (!route.regexp) return null;
                var m = route.regexp.exec(on);
                if (!m) return null;
                for (var i = 1, len = m.length; len > i; ++i) {
                    var key = keys[i - 1], val = m[i];
                    key && val && (params[key.name] = val);
                }
                return params;
            }
            function prepareRoute($locationEvent) {
                var lastRoute = $route.current;
                preparedRoute = parseRoute(), preparedRouteIsUpdateOnly = preparedRoute && lastRoute && preparedRoute.$$route === lastRoute.$$route && angular.equals(preparedRoute.pathParams, lastRoute.pathParams) && !preparedRoute.reloadOnSearch && !forceReload, 
                preparedRouteIsUpdateOnly || !lastRoute && !preparedRoute || $rootScope.$broadcast("$routeChangeStart", preparedRoute, lastRoute).defaultPrevented && $locationEvent && $locationEvent.preventDefault();
            }
            function commitRoute() {
                var lastRoute = $route.current, nextRoute = preparedRoute;
                preparedRouteIsUpdateOnly ? (lastRoute.params = nextRoute.params, angular.copy(lastRoute.params, $routeParams), 
                $rootScope.$broadcast("$routeUpdate", lastRoute)) : (nextRoute || lastRoute) && (forceReload = !1, 
                $route.current = nextRoute, nextRoute && nextRoute.redirectTo && (angular.isString(nextRoute.redirectTo) ? $location.path(interpolate(nextRoute.redirectTo, nextRoute.params)).search(nextRoute.params).replace() : $location.url(nextRoute.redirectTo(nextRoute.pathParams, $location.path(), $location.search())).replace()), 
                $q.when(nextRoute).then(function() {
                    if (nextRoute) {
                        var template, templateUrl, locals = angular.extend({}, nextRoute.resolve);
                        return angular.forEach(locals, function(value, key) {
                            locals[key] = angular.isString(value) ? $injector.get(value) : $injector.invoke(value, null, null, key);
                        }), angular.isDefined(template = nextRoute.template) ? angular.isFunction(template) && (template = template(nextRoute.params)) : angular.isDefined(templateUrl = nextRoute.templateUrl) && (angular.isFunction(templateUrl) && (templateUrl = templateUrl(nextRoute.params)), 
                        angular.isDefined(templateUrl) && (nextRoute.loadedTemplateUrl = $sce.valueOf(templateUrl), 
                        template = $templateRequest(templateUrl))), angular.isDefined(template) && (locals.$template = template), 
                        $q.all(locals);
                    }
                }).then(function(locals) {
                    nextRoute == $route.current && (nextRoute && (nextRoute.locals = locals, angular.copy(nextRoute.params, $routeParams)), 
                    $rootScope.$broadcast("$routeChangeSuccess", nextRoute, lastRoute));
                }, function(error) {
                    nextRoute == $route.current && $rootScope.$broadcast("$routeChangeError", nextRoute, lastRoute, error);
                }));
            }
            function parseRoute() {
                var params, match;
                return angular.forEach(routes, function(route, path) {
                    !match && (params = switchRouteMatcher($location.path(), route)) && (match = inherit(route, {
                        params: angular.extend({}, $location.search(), params),
                        pathParams: params
                    }), match.$$route = route);
                }), match || routes[null] && inherit(routes[null], {
                    params: {},
                    pathParams: {}
                });
            }
            function interpolate(string, params) {
                var result = [];
                return angular.forEach((string || "").split(":"), function(segment, i) {
                    if (0 === i) result.push(segment); else {
                        var segmentMatch = segment.match(/(\w+)(?:[?*])?(.*)/), key = segmentMatch[1];
                        result.push(params[key]), result.push(segmentMatch[2] || ""), delete params[key];
                    }
                }), result.join("");
            }
            var preparedRoute, preparedRouteIsUpdateOnly, forceReload = !1, $route = {
                routes: routes,
                reload: function() {
                    forceReload = !0, $rootScope.$evalAsync(function() {
                        prepareRoute(), commitRoute();
                    });
                },
                updateParams: function(newParams) {
                    if (!this.current || !this.current.$$route) throw $routeMinErr("norout", "Tried updating route when with no current route");
                    newParams = angular.extend({}, this.current.params, newParams), $location.path(interpolate(this.current.$$route.originalPath, newParams)), 
                    $location.search(newParams);
                }
            };
            return $rootScope.$on("$locationChangeStart", prepareRoute), $rootScope.$on("$locationChangeSuccess", commitRoute), 
            $route;
        } ];
    }
    function $RouteParamsProvider() {
        this.$get = function() {
            return {};
        };
    }
    function ngViewFactory($route, $anchorScroll, $animate) {
        return {
            restrict: "ECA",
            terminal: !0,
            priority: 400,
            transclude: "element",
            link: function(scope, $element, attr, ctrl, $transclude) {
                function cleanupLastView() {
                    previousLeaveAnimation && ($animate.cancel(previousLeaveAnimation), previousLeaveAnimation = null), 
                    currentScope && (currentScope.$destroy(), currentScope = null), currentElement && (previousLeaveAnimation = $animate.leave(currentElement), 
                    previousLeaveAnimation.then(function() {
                        previousLeaveAnimation = null;
                    }), currentElement = null);
                }
                function update() {
                    var locals = $route.current && $route.current.locals, template = locals && locals.$template;
                    if (angular.isDefined(template)) {
                        var newScope = scope.$new(), current = $route.current, clone = $transclude(newScope, function(clone) {
                            $animate.enter(clone, null, currentElement || $element).then(function() {
                                !angular.isDefined(autoScrollExp) || autoScrollExp && !scope.$eval(autoScrollExp) || $anchorScroll();
                            }), cleanupLastView();
                        });
                        currentElement = clone, currentScope = current.scope = newScope, currentScope.$emit("$viewContentLoaded"), 
                        currentScope.$eval(onloadExp);
                    } else cleanupLastView();
                }
                var currentScope, currentElement, previousLeaveAnimation, autoScrollExp = attr.autoscroll, onloadExp = attr.onload || "";
                scope.$on("$routeChangeSuccess", update), update();
            }
        };
    }
    function ngViewFillContentFactory($compile, $controller, $route) {
        return {
            restrict: "ECA",
            priority: -400,
            link: function(scope, $element) {
                var current = $route.current, locals = current.locals;
                $element.html(locals.$template);
                var link = $compile($element.contents());
                if (current.controller) {
                    locals.$scope = scope;
                    var controller = $controller(current.controller, locals);
                    current.controllerAs && (scope[current.controllerAs] = controller), $element.data("$ngControllerController", controller), 
                    $element.children().data("$ngControllerController", controller);
                }
                link(scope);
            }
        };
    }
    var ngRouteModule = angular.module("ngRoute", [ "ng" ]).provider("$route", $RouteProvider), $routeMinErr = angular.$$minErr("ngRoute");
    ngRouteModule.provider("$routeParams", $RouteParamsProvider), ngRouteModule.directive("ngView", ngViewFactory), 
    ngRouteModule.directive("ngView", ngViewFillContentFactory), ngViewFactory.$inject = [ "$route", "$anchorScroll", "$animate" ], 
    ngViewFillContentFactory.$inject = [ "$compile", "$controller", "$route" ];
}(window, window.angular), function(window, angular, undefined) {
    "use strict";
    function $SanitizeProvider() {
        this.$get = [ "$$sanitizeUri", function($$sanitizeUri) {
            return function(html) {
                var buf = [];
                return htmlParser(html, htmlSanitizeWriter(buf, function(uri, isImage) {
                    return !/^unsafe/.test($$sanitizeUri(uri, isImage));
                })), buf.join("");
            };
        } ];
    }
    function sanitizeText(chars) {
        var buf = [], writer = htmlSanitizeWriter(buf, angular.noop);
        return writer.chars(chars), buf.join("");
    }
    function makeMap(str, lowercaseKeys) {
        var i, obj = {}, items = str.split(",");
        for (i = 0; i < items.length; i++) obj[lowercaseKeys ? angular.lowercase(items[i]) : items[i]] = !0;
        return obj;
    }
    function htmlParser(html, handler) {
        function parseStartTag(tag, tagName, rest, unary) {
            if (tagName = angular.lowercase(tagName), blockElements[tagName]) for (;stack.last() && inlineElements[stack.last()]; ) parseEndTag("", stack.last());
            optionalEndTagElements[tagName] && stack.last() == tagName && parseEndTag("", tagName), 
            unary = voidElements[tagName] || !!unary, unary || stack.push(tagName);
            var attrs = {};
            rest.replace(ATTR_REGEXP, function(match, name, doubleQuotedValue, singleQuotedValue, unquotedValue) {
                var value = doubleQuotedValue || singleQuotedValue || unquotedValue || "";
                attrs[name] = decodeEntities(value);
            }), handler.start && handler.start(tagName, attrs, unary);
        }
        function parseEndTag(tag, tagName) {
            var i, pos = 0;
            if (tagName = angular.lowercase(tagName)) for (pos = stack.length - 1; pos >= 0 && stack[pos] != tagName; pos--) ;
            if (pos >= 0) {
                for (i = stack.length - 1; i >= pos; i--) handler.end && handler.end(stack[i]);
                stack.length = pos;
            }
        }
        "string" != typeof html && (html = null === html || "undefined" == typeof html ? "" : "" + html);
        var index, chars, match, text, stack = [], last = html;
        for (stack.last = function() {
            return stack[stack.length - 1];
        }; html; ) {
            if (text = "", chars = !0, stack.last() && specialElements[stack.last()] ? (html = html.replace(new RegExp("([\\W\\w]*)<\\s*\\/\\s*" + stack.last() + "[^>]*>", "i"), function(all, text) {
                return text = text.replace(COMMENT_REGEXP, "$1").replace(CDATA_REGEXP, "$1"), handler.chars && handler.chars(decodeEntities(text)), 
                "";
            }), parseEndTag("", stack.last())) : (0 === html.indexOf("<!--") ? (index = html.indexOf("--", 4), 
            index >= 0 && html.lastIndexOf("-->", index) === index && (handler.comment && handler.comment(html.substring(4, index)), 
            html = html.substring(index + 3), chars = !1)) : DOCTYPE_REGEXP.test(html) ? (match = html.match(DOCTYPE_REGEXP), 
            match && (html = html.replace(match[0], ""), chars = !1)) : BEGING_END_TAGE_REGEXP.test(html) ? (match = html.match(END_TAG_REGEXP), 
            match && (html = html.substring(match[0].length), match[0].replace(END_TAG_REGEXP, parseEndTag), 
            chars = !1)) : BEGIN_TAG_REGEXP.test(html) && (match = html.match(START_TAG_REGEXP), 
            match ? (match[4] && (html = html.substring(match[0].length), match[0].replace(START_TAG_REGEXP, parseStartTag)), 
            chars = !1) : (text += "<", html = html.substring(1))), chars && (index = html.indexOf("<"), 
            text += 0 > index ? html : html.substring(0, index), html = 0 > index ? "" : html.substring(index), 
            handler.chars && handler.chars(decodeEntities(text)))), html == last) throw $sanitizeMinErr("badparse", "The sanitizer was unable to parse the following block of html: {0}", html);
            last = html;
        }
        parseEndTag();
    }
    function decodeEntities(value) {
        return value ? (hiddenPre.innerHTML = value.replace(/</g, "&lt;"), hiddenPre.textContent) : "";
    }
    function encodeEntities(value) {
        return value.replace(/&/g, "&amp;").replace(SURROGATE_PAIR_REGEXP, function(value) {
            var hi = value.charCodeAt(0), low = value.charCodeAt(1);
            return "&#" + (1024 * (hi - 55296) + (low - 56320) + 65536) + ";";
        }).replace(NON_ALPHANUMERIC_REGEXP, function(value) {
            return "&#" + value.charCodeAt(0) + ";";
        }).replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    function htmlSanitizeWriter(buf, uriValidator) {
        var ignore = !1, out = angular.bind(buf, buf.push);
        return {
            start: function(tag, attrs, unary) {
                tag = angular.lowercase(tag), !ignore && specialElements[tag] && (ignore = tag), 
                ignore || validElements[tag] !== !0 || (out("<"), out(tag), angular.forEach(attrs, function(value, key) {
                    var lkey = angular.lowercase(key), isImage = "img" === tag && "src" === lkey || "background" === lkey;
                    validAttrs[lkey] !== !0 || uriAttrs[lkey] === !0 && !uriValidator(value, isImage) || (out(" "), 
                    out(key), out('="'), out(encodeEntities(value)), out('"'));
                }), out(unary ? "/>" : ">"));
            },
            end: function(tag) {
                tag = angular.lowercase(tag), ignore || validElements[tag] !== !0 || (out("</"), 
                out(tag), out(">")), tag == ignore && (ignore = !1);
            },
            chars: function(chars) {
                ignore || out(encodeEntities(chars));
            }
        };
    }
    var $sanitizeMinErr = angular.$$minErr("$sanitize"), START_TAG_REGEXP = /^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/, END_TAG_REGEXP = /^<\/\s*([\w:-]+)[^>]*>/, ATTR_REGEXP = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g, BEGIN_TAG_REGEXP = /^</, BEGING_END_TAGE_REGEXP = /^<\//, COMMENT_REGEXP = /<!--(.*?)-->/g, DOCTYPE_REGEXP = /<!DOCTYPE([^>]*?)>/i, CDATA_REGEXP = /<!\[CDATA\[(.*?)]]>/g, SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, NON_ALPHANUMERIC_REGEXP = /([^\#-~| |!])/g, voidElements = makeMap("area,br,col,hr,img,wbr"), optionalEndTagBlockElements = makeMap("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"), optionalEndTagInlineElements = makeMap("rp,rt"), optionalEndTagElements = angular.extend({}, optionalEndTagInlineElements, optionalEndTagBlockElements), blockElements = angular.extend({}, optionalEndTagBlockElements, makeMap("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")), inlineElements = angular.extend({}, optionalEndTagInlineElements, makeMap("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")), svgElements = makeMap("circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,stop,svg,switch,text,title,tspan,use"), specialElements = makeMap("script,style"), validElements = angular.extend({}, voidElements, blockElements, inlineElements, optionalEndTagElements, svgElements), uriAttrs = makeMap("background,cite,href,longdesc,src,usemap,xlink:href"), htmlAttrs = makeMap("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,valign,value,vspace,width"), svgAttrs = makeMap("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan", !0), validAttrs = angular.extend({}, uriAttrs, svgAttrs, htmlAttrs), hiddenPre = document.createElement("pre");
    angular.module("ngSanitize", []).provider("$sanitize", $SanitizeProvider), angular.module("ngSanitize").filter("linky", [ "$sanitize", function($sanitize) {
        var LINKY_URL_REGEXP = /((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/i, MAILTO_REGEXP = /^mailto:/i;
        return function(text, target) {
            function addText(text) {
                text && html.push(sanitizeText(text));
            }
            function addLink(url, text) {
                html.push("<a "), angular.isDefined(target) && html.push('target="', target, '" '), 
                html.push('href="', url.replace(/"/g, "&quot;"), '">'), addText(text), html.push("</a>");
            }
            if (!text) return text;
            for (var match, url, i, raw = text, html = []; match = raw.match(LINKY_URL_REGEXP); ) url = match[0], 
            match[2] || match[4] || (url = (match[3] ? "http://" : "mailto:") + url), i = match.index, 
            addText(raw.substr(0, i)), addLink(url, match[0].replace(MAILTO_REGEXP, "")), raw = raw.substring(i + match[0].length);
            return addText(raw), $sanitize(html.join(""));
        };
    } ]);
}(window, window.angular), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");

+function($) {
    "use strict";
    var version = $.fn.jquery.split(" ")[0].split(".");
    if (version[0] < 2 && version[1] < 9 || 1 == version[0] && 9 == version[1] && version[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher");
}(jQuery), +function($) {
    "use strict";
    function transitionEnd() {
        var el = document.createElement("bootstrap"), transEndEventNames = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var name in transEndEventNames) if (void 0 !== el.style[name]) return {
            end: transEndEventNames[name]
        };
        return !1;
    }
    $.fn.emulateTransitionEnd = function(duration) {
        var called = !1, $el = this;
        $(this).one("bsTransitionEnd", function() {
            called = !0;
        });
        var callback = function() {
            called || $($el).trigger($.support.transition.end);
        };
        return setTimeout(callback, duration), this;
    }, $(function() {
        $.support.transition = transitionEnd(), $.support.transition && ($.event.special.bsTransitionEnd = {
            bindType: $.support.transition.end,
            delegateType: $.support.transition.end,
            handle: function(e) {
                return $(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : void 0;
            }
        });
    });
}(jQuery), +function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.alert");
            data || $this.data("bs.alert", data = new Alert(this)), "string" == typeof option && data[option].call($this);
        });
    }
    var dismiss = '[data-dismiss="alert"]', Alert = function(el) {
        $(el).on("click", dismiss, this.close);
    };
    Alert.VERSION = "3.3.5", Alert.TRANSITION_DURATION = 150, Alert.prototype.close = function(e) {
        function removeElement() {
            $parent.detach().trigger("closed.bs.alert").remove();
        }
        var $this = $(this), selector = $this.attr("data-target");
        selector || (selector = $this.attr("href"), selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ""));
        var $parent = $(selector);
        e && e.preventDefault(), $parent.length || ($parent = $this.closest(".alert")), 
        $parent.trigger(e = $.Event("close.bs.alert")), e.isDefaultPrevented() || ($parent.removeClass("in"), 
        $.support.transition && $parent.hasClass("fade") ? $parent.one("bsTransitionEnd", removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION) : removeElement());
    };
    var old = $.fn.alert;
    $.fn.alert = Plugin, $.fn.alert.Constructor = Alert, $.fn.alert.noConflict = function() {
        return $.fn.alert = old, this;
    }, $(document).on("click.bs.alert.data-api", dismiss, Alert.prototype.close);
}(jQuery), +function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.button"), options = "object" == typeof option && option;
            data || $this.data("bs.button", data = new Button(this, options)), "toggle" == option ? data.toggle() : option && data.setState(option);
        });
    }
    var Button = function(element, options) {
        this.$element = $(element), this.options = $.extend({}, Button.DEFAULTS, options), 
        this.isLoading = !1;
    };
    Button.VERSION = "3.3.5", Button.DEFAULTS = {
        loadingText: "loading..."
    }, Button.prototype.setState = function(state) {
        var d = "disabled", $el = this.$element, val = $el.is("input") ? "val" : "html", data = $el.data();
        state += "Text", null == data.resetText && $el.data("resetText", $el[val]()), setTimeout($.proxy(function() {
            $el[val](null == data[state] ? this.options[state] : data[state]), "loadingText" == state ? (this.isLoading = !0, 
            $el.addClass(d).attr(d, d)) : this.isLoading && (this.isLoading = !1, $el.removeClass(d).removeAttr(d));
        }, this), 0);
    }, Button.prototype.toggle = function() {
        var changed = !0, $parent = this.$element.closest('[data-toggle="buttons"]');
        if ($parent.length) {
            var $input = this.$element.find("input");
            "radio" == $input.prop("type") ? ($input.prop("checked") && (changed = !1), $parent.find(".active").removeClass("active"), 
            this.$element.addClass("active")) : "checkbox" == $input.prop("type") && ($input.prop("checked") !== this.$element.hasClass("active") && (changed = !1), 
            this.$element.toggleClass("active")), $input.prop("checked", this.$element.hasClass("active")), 
            changed && $input.trigger("change");
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active");
    };
    var old = $.fn.button;
    $.fn.button = Plugin, $.fn.button.Constructor = Button, $.fn.button.noConflict = function() {
        return $.fn.button = old, this;
    }, $(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(e) {
        var $btn = $(e.target);
        $btn.hasClass("btn") || ($btn = $btn.closest(".btn")), Plugin.call($btn, "toggle"), 
        $(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]') || e.preventDefault();
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(e) {
        $(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type));
    });
}(jQuery), +function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.carousel"), options = $.extend({}, Carousel.DEFAULTS, $this.data(), "object" == typeof option && option), action = "string" == typeof option ? option : options.slide;
            data || $this.data("bs.carousel", data = new Carousel(this, options)), "number" == typeof option ? data.to(option) : action ? data[action]() : options.interval && data.pause().cycle();
        });
    }
    var Carousel = function(element, options) {
        this.$element = $(element), this.$indicators = this.$element.find(".carousel-indicators"), 
        this.options = options, this.paused = null, this.sliding = null, this.interval = null, 
        this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", $.proxy(this.keydown, this)), 
        "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", $.proxy(this.pause, this)).on("mouseleave.bs.carousel", $.proxy(this.cycle, this));
    };
    Carousel.VERSION = "3.3.5", Carousel.TRANSITION_DURATION = 600, Carousel.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, Carousel.prototype.keydown = function(e) {
        if (!/input|textarea/i.test(e.target.tagName)) {
            switch (e.which) {
              case 37:
                this.prev();
                break;

              case 39:
                this.next();
                break;

              default:
                return;
            }
            e.preventDefault();
        }
    }, Carousel.prototype.cycle = function(e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval)), 
        this;
    }, Carousel.prototype.getItemIndex = function(item) {
        return this.$items = item.parent().children(".item"), this.$items.index(item || this.$active);
    }, Carousel.prototype.getItemForDirection = function(direction, active) {
        var activeIndex = this.getItemIndex(active), willWrap = "prev" == direction && 0 === activeIndex || "next" == direction && activeIndex == this.$items.length - 1;
        if (willWrap && !this.options.wrap) return active;
        var delta = "prev" == direction ? -1 : 1, itemIndex = (activeIndex + delta) % this.$items.length;
        return this.$items.eq(itemIndex);
    }, Carousel.prototype.to = function(pos) {
        var that = this, activeIndex = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return pos > this.$items.length - 1 || 0 > pos ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            that.to(pos);
        }) : activeIndex == pos ? this.pause().cycle() : this.slide(pos > activeIndex ? "next" : "prev", this.$items.eq(pos));
    }, Carousel.prototype.pause = function(e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && $.support.transition && (this.$element.trigger($.support.transition.end), 
        this.cycle(!0)), this.interval = clearInterval(this.interval), this;
    }, Carousel.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next");
    }, Carousel.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev");
    }, Carousel.prototype.slide = function(type, next) {
        var $active = this.$element.find(".item.active"), $next = next || this.getItemForDirection(type, $active), isCycling = this.interval, direction = "next" == type ? "left" : "right", that = this;
        if ($next.hasClass("active")) return this.sliding = !1;
        var relatedTarget = $next[0], slideEvent = $.Event("slide.bs.carousel", {
            relatedTarget: relatedTarget,
            direction: direction
        });
        if (this.$element.trigger(slideEvent), !slideEvent.isDefaultPrevented()) {
            if (this.sliding = !0, isCycling && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)]);
                $nextIndicator && $nextIndicator.addClass("active");
            }
            var slidEvent = $.Event("slid.bs.carousel", {
                relatedTarget: relatedTarget,
                direction: direction
            });
            return $.support.transition && this.$element.hasClass("slide") ? ($next.addClass(type), 
            $next[0].offsetWidth, $active.addClass(direction), $next.addClass(direction), $active.one("bsTransitionEnd", function() {
                $next.removeClass([ type, direction ].join(" ")).addClass("active"), $active.removeClass([ "active", direction ].join(" ")), 
                that.sliding = !1, setTimeout(function() {
                    that.$element.trigger(slidEvent);
                }, 0);
            }).emulateTransitionEnd(Carousel.TRANSITION_DURATION)) : ($active.removeClass("active"), 
            $next.addClass("active"), this.sliding = !1, this.$element.trigger(slidEvent)), 
            isCycling && this.cycle(), this;
        }
    };
    var old = $.fn.carousel;
    $.fn.carousel = Plugin, $.fn.carousel.Constructor = Carousel, $.fn.carousel.noConflict = function() {
        return $.fn.carousel = old, this;
    };
    var clickHandler = function(e) {
        var href, $this = $(this), $target = $($this.attr("data-target") || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, ""));
        if ($target.hasClass("carousel")) {
            var options = $.extend({}, $target.data(), $this.data()), slideIndex = $this.attr("data-slide-to");
            slideIndex && (options.interval = !1), Plugin.call($target, options), slideIndex && $target.data("bs.carousel").to(slideIndex), 
            e.preventDefault();
        }
    };
    $(document).on("click.bs.carousel.data-api", "[data-slide]", clickHandler).on("click.bs.carousel.data-api", "[data-slide-to]", clickHandler), 
    $(window).on("load", function() {
        $('[data-ride="carousel"]').each(function() {
            var $carousel = $(this);
            Plugin.call($carousel, $carousel.data());
        });
    });
}(jQuery), +function($) {
    "use strict";
    function getTargetFromTrigger($trigger) {
        var href, target = $trigger.attr("data-target") || (href = $trigger.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "");
        return $(target);
    }
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.collapse"), options = $.extend({}, Collapse.DEFAULTS, $this.data(), "object" == typeof option && option);
            !data && options.toggle && /show|hide/.test(option) && (options.toggle = !1), data || $this.data("bs.collapse", data = new Collapse(this, options)), 
            "string" == typeof option && data[option]();
        });
    }
    var Collapse = function(element, options) {
        this.$element = $(element), this.options = $.extend({}, Collapse.DEFAULTS, options), 
        this.$trigger = $('[data-toggle="collapse"][href="#' + element.id + '"],[data-toggle="collapse"][data-target="#' + element.id + '"]'), 
        this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), 
        this.options.toggle && this.toggle();
    };
    Collapse.VERSION = "3.3.5", Collapse.TRANSITION_DURATION = 350, Collapse.DEFAULTS = {
        toggle: !0
    }, Collapse.prototype.dimension = function() {
        var hasWidth = this.$element.hasClass("width");
        return hasWidth ? "width" : "height";
    }, Collapse.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var activesData, actives = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(actives && actives.length && (activesData = actives.data("bs.collapse"), activesData && activesData.transitioning))) {
                var startEvent = $.Event("show.bs.collapse");
                if (this.$element.trigger(startEvent), !startEvent.isDefaultPrevented()) {
                    actives && actives.length && (Plugin.call(actives, "hide"), activesData || actives.data("bs.collapse", null));
                    var dimension = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[dimension](0).attr("aria-expanded", !0), 
                    this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var complete = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[dimension](""), 
                        this.transitioning = 0, this.$element.trigger("shown.bs.collapse");
                    };
                    if (!$.support.transition) return complete.call(this);
                    var scrollSize = $.camelCase([ "scroll", dimension ].join("-"));
                    this.$element.one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize]);
                }
            }
        }
    }, Collapse.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var startEvent = $.Event("hide.bs.collapse");
            if (this.$element.trigger(startEvent), !startEvent.isDefaultPrevented()) {
                var dimension = this.dimension();
                this.$element[dimension](this.$element[dimension]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), 
                this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var complete = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
                };
                return $.support.transition ? void this.$element[dimension](0).one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION) : complete.call(this);
            }
        }
    }, Collapse.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
    }, Collapse.prototype.getParent = function() {
        return $(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each($.proxy(function(i, element) {
            var $element = $(element);
            this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element);
        }, this)).end();
    }, Collapse.prototype.addAriaAndCollapsedClass = function($element, $trigger) {
        var isOpen = $element.hasClass("in");
        $element.attr("aria-expanded", isOpen), $trigger.toggleClass("collapsed", !isOpen).attr("aria-expanded", isOpen);
    };
    var old = $.fn.collapse;
    $.fn.collapse = Plugin, $.fn.collapse.Constructor = Collapse, $.fn.collapse.noConflict = function() {
        return $.fn.collapse = old, this;
    }, $(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(e) {
        var $this = $(this);
        $this.attr("data-target") || e.preventDefault();
        var $target = getTargetFromTrigger($this), data = $target.data("bs.collapse"), option = data ? "toggle" : $this.data();
        Plugin.call($target, option);
    });
}(jQuery), +function($) {
    "use strict";
    function getParent($this) {
        var selector = $this.attr("data-target");
        selector || (selector = $this.attr("href"), selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ""));
        var $parent = selector && $(selector);
        return $parent && $parent.length ? $parent : $this.parent();
    }
    function clearMenus(e) {
        e && 3 === e.which || ($(backdrop).remove(), $(toggle).each(function() {
            var $this = $(this), $parent = getParent($this), relatedTarget = {
                relatedTarget: this
            };
            $parent.hasClass("open") && (e && "click" == e.type && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target) || ($parent.trigger(e = $.Event("hide.bs.dropdown", relatedTarget)), 
            e.isDefaultPrevented() || ($this.attr("aria-expanded", "false"), $parent.removeClass("open").trigger("hidden.bs.dropdown", relatedTarget))));
        }));
    }
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.dropdown");
            data || $this.data("bs.dropdown", data = new Dropdown(this)), "string" == typeof option && data[option].call($this);
        });
    }
    var backdrop = ".dropdown-backdrop", toggle = '[data-toggle="dropdown"]', Dropdown = function(element) {
        $(element).on("click.bs.dropdown", this.toggle);
    };
    Dropdown.VERSION = "3.3.5", Dropdown.prototype.toggle = function(e) {
        var $this = $(this);
        if (!$this.is(".disabled, :disabled")) {
            var $parent = getParent($this), isActive = $parent.hasClass("open");
            if (clearMenus(), !isActive) {
                "ontouchstart" in document.documentElement && !$parent.closest(".navbar-nav").length && $(document.createElement("div")).addClass("dropdown-backdrop").insertAfter($(this)).on("click", clearMenus);
                var relatedTarget = {
                    relatedTarget: this
                };
                if ($parent.trigger(e = $.Event("show.bs.dropdown", relatedTarget)), e.isDefaultPrevented()) return;
                $this.trigger("focus").attr("aria-expanded", "true"), $parent.toggleClass("open").trigger("shown.bs.dropdown", relatedTarget);
            }
            return !1;
        }
    }, Dropdown.prototype.keydown = function(e) {
        if (/(38|40|27|32)/.test(e.which) && !/input|textarea/i.test(e.target.tagName)) {
            var $this = $(this);
            if (e.preventDefault(), e.stopPropagation(), !$this.is(".disabled, :disabled")) {
                var $parent = getParent($this), isActive = $parent.hasClass("open");
                if (!isActive && 27 != e.which || isActive && 27 == e.which) return 27 == e.which && $parent.find(toggle).trigger("focus"), 
                $this.trigger("click");
                var desc = " li:not(.disabled):visible a", $items = $parent.find(".dropdown-menu" + desc);
                if ($items.length) {
                    var index = $items.index(e.target);
                    38 == e.which && index > 0 && index--, 40 == e.which && index < $items.length - 1 && index++, 
                    ~index || (index = 0), $items.eq(index).trigger("focus");
                }
            }
        }
    };
    var old = $.fn.dropdown;
    $.fn.dropdown = Plugin, $.fn.dropdown.Constructor = Dropdown, $.fn.dropdown.noConflict = function() {
        return $.fn.dropdown = old, this;
    }, $(document).on("click.bs.dropdown.data-api", clearMenus).on("click.bs.dropdown.data-api", ".dropdown form", function(e) {
        e.stopPropagation();
    }).on("click.bs.dropdown.data-api", toggle, Dropdown.prototype.toggle).on("keydown.bs.dropdown.data-api", toggle, Dropdown.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", Dropdown.prototype.keydown);
}(jQuery), +function($) {
    "use strict";
    function Plugin(option, _relatedTarget) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.modal"), options = $.extend({}, Modal.DEFAULTS, $this.data(), "object" == typeof option && option);
            data || $this.data("bs.modal", data = new Modal(this, options)), "string" == typeof option ? data[option](_relatedTarget) : options.show && data.show(_relatedTarget);
        });
    }
    var Modal = function(element, options) {
        this.options = options, this.$body = $(document.body), this.$element = $(element), 
        this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, 
        this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, 
        this.options.remote && this.$element.find(".modal-content").load(this.options.remote, $.proxy(function() {
            this.$element.trigger("loaded.bs.modal");
        }, this));
    };
    Modal.VERSION = "3.3.5", Modal.TRANSITION_DURATION = 300, Modal.BACKDROP_TRANSITION_DURATION = 150, 
    Modal.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, Modal.prototype.toggle = function(_relatedTarget) {
        return this.isShown ? this.hide() : this.show(_relatedTarget);
    }, Modal.prototype.show = function(_relatedTarget) {
        var that = this, e = $.Event("show.bs.modal", {
            relatedTarget: _relatedTarget
        });
        this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, 
        this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), 
        this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', $.proxy(this.hide, this)), 
        this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            that.$element.one("mouseup.dismiss.bs.modal", function(e) {
                $(e.target).is(that.$element) && (that.ignoreBackdropClick = !0);
            });
        }), this.backdrop(function() {
            var transition = $.support.transition && that.$element.hasClass("fade");
            that.$element.parent().length || that.$element.appendTo(that.$body), that.$element.show().scrollTop(0), 
            that.adjustDialog(), transition && that.$element[0].offsetWidth, that.$element.addClass("in"), 
            that.enforceFocus();
            var e = $.Event("shown.bs.modal", {
                relatedTarget: _relatedTarget
            });
            transition ? that.$dialog.one("bsTransitionEnd", function() {
                that.$element.trigger("focus").trigger(e);
            }).emulateTransitionEnd(Modal.TRANSITION_DURATION) : that.$element.trigger("focus").trigger(e);
        }));
    }, Modal.prototype.hide = function(e) {
        e && e.preventDefault(), e = $.Event("hide.bs.modal"), this.$element.trigger(e), 
        this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), 
        $(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), 
        this.$dialog.off("mousedown.dismiss.bs.modal"), $.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", $.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION) : this.hideModal());
    }, Modal.prototype.enforceFocus = function() {
        $(document).off("focusin.bs.modal").on("focusin.bs.modal", $.proxy(function(e) {
            this.$element[0] === e.target || this.$element.has(e.target).length || this.$element.trigger("focus");
        }, this));
    }, Modal.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", $.proxy(function(e) {
            27 == e.which && this.hide();
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal");
    }, Modal.prototype.resize = function() {
        this.isShown ? $(window).on("resize.bs.modal", $.proxy(this.handleUpdate, this)) : $(window).off("resize.bs.modal");
    }, Modal.prototype.hideModal = function() {
        var that = this;
        this.$element.hide(), this.backdrop(function() {
            that.$body.removeClass("modal-open"), that.resetAdjustments(), that.resetScrollbar(), 
            that.$element.trigger("hidden.bs.modal");
        });
    }, Modal.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null;
    }, Modal.prototype.backdrop = function(callback) {
        var that = this, animate = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var doAnimate = $.support.transition && animate;
            if (this.$backdrop = $(document.createElement("div")).addClass("modal-backdrop " + animate).appendTo(this.$body), 
            this.$element.on("click.dismiss.bs.modal", $.proxy(function(e) {
                return this.ignoreBackdropClick ? void (this.ignoreBackdropClick = !1) : void (e.target === e.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()));
            }, this)), doAnimate && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), 
            !callback) return;
            doAnimate ? this.$backdrop.one("bsTransitionEnd", callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callback();
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var callbackRemove = function() {
                that.removeBackdrop(), callback && callback();
            };
            $.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callbackRemove();
        } else callback && callback();
    }, Modal.prototype.handleUpdate = function() {
        this.adjustDialog();
    }, Modal.prototype.adjustDialog = function() {
        var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ""
        });
    }, Modal.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        });
    }, Modal.prototype.checkScrollbar = function() {
        var fullWindowWidth = window.innerWidth;
        if (!fullWindowWidth) {
            var documentElementRect = document.documentElement.getBoundingClientRect();
            fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
        }
        this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth, this.scrollbarWidth = this.measureScrollbar();
    }, Modal.prototype.setScrollbar = function() {
        var bodyPad = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", bodyPad + this.scrollbarWidth);
    }, Modal.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad);
    }, Modal.prototype.measureScrollbar = function() {
        var scrollDiv = document.createElement("div");
        scrollDiv.className = "modal-scrollbar-measure", this.$body.append(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        return this.$body[0].removeChild(scrollDiv), scrollbarWidth;
    };
    var old = $.fn.modal;
    $.fn.modal = Plugin, $.fn.modal.Constructor = Modal, $.fn.modal.noConflict = function() {
        return $.fn.modal = old, this;
    }, $(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(e) {
        var $this = $(this), href = $this.attr("href"), $target = $($this.attr("data-target") || href && href.replace(/.*(?=#[^\s]+$)/, "")), option = $target.data("bs.modal") ? "toggle" : $.extend({
            remote: !/#/.test(href) && href
        }, $target.data(), $this.data());
        $this.is("a") && e.preventDefault(), $target.one("show.bs.modal", function(showEvent) {
            showEvent.isDefaultPrevented() || $target.one("hidden.bs.modal", function() {
                $this.is(":visible") && $this.trigger("focus");
            });
        }), Plugin.call($target, option, this);
    });
}(jQuery), +function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.tooltip"), options = "object" == typeof option && option;
            (data || !/destroy|hide/.test(option)) && (data || $this.data("bs.tooltip", data = new Tooltip(this, options)), 
            "string" == typeof option && data[option]());
        });
    }
    var Tooltip = function(element, options) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, 
        this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", element, options);
    };
    Tooltip.VERSION = "3.3.5", Tooltip.TRANSITION_DURATION = 150, Tooltip.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, Tooltip.prototype.init = function(type, element, options) {
        if (this.enabled = !0, this.type = type, this.$element = $(element), this.options = this.getOptions(options), 
        this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), 
        this.inState = {
            click: !1,
            hover: !1,
            focus: !1
        }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var triggers = this.options.trigger.split(" "), i = triggers.length; i--; ) {
            var trigger = triggers[i];
            if ("click" == trigger) this.$element.on("click." + this.type, this.options.selector, $.proxy(this.toggle, this)); else if ("manual" != trigger) {
                var eventIn = "hover" == trigger ? "mouseenter" : "focusin", eventOut = "hover" == trigger ? "mouseleave" : "focusout";
                this.$element.on(eventIn + "." + this.type, this.options.selector, $.proxy(this.enter, this)), 
                this.$element.on(eventOut + "." + this.type, this.options.selector, $.proxy(this.leave, this));
            }
        }
        this.options.selector ? this._options = $.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle();
    }, Tooltip.prototype.getDefaults = function() {
        return Tooltip.DEFAULTS;
    }, Tooltip.prototype.getOptions = function(options) {
        return options = $.extend({}, this.getDefaults(), this.$element.data(), options), 
        options.delay && "number" == typeof options.delay && (options.delay = {
            show: options.delay,
            hide: options.delay
        }), options;
    }, Tooltip.prototype.getDelegateOptions = function() {
        var options = {}, defaults = this.getDefaults();
        return this._options && $.each(this._options, function(key, value) {
            defaults[key] != value && (options[key] = value);
        }), options;
    }, Tooltip.prototype.enter = function(obj) {
        var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data("bs." + this.type);
        return self || (self = new this.constructor(obj.currentTarget, this.getDelegateOptions()), 
        $(obj.currentTarget).data("bs." + this.type, self)), obj instanceof $.Event && (self.inState["focusin" == obj.type ? "focus" : "hover"] = !0), 
        self.tip().hasClass("in") || "in" == self.hoverState ? void (self.hoverState = "in") : (clearTimeout(self.timeout), 
        self.hoverState = "in", self.options.delay && self.options.delay.show ? void (self.timeout = setTimeout(function() {
            "in" == self.hoverState && self.show();
        }, self.options.delay.show)) : self.show());
    }, Tooltip.prototype.isInStateTrue = function() {
        for (var key in this.inState) if (this.inState[key]) return !0;
        return !1;
    }, Tooltip.prototype.leave = function(obj) {
        var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data("bs." + this.type);
        return self || (self = new this.constructor(obj.currentTarget, this.getDelegateOptions()), 
        $(obj.currentTarget).data("bs." + this.type, self)), obj instanceof $.Event && (self.inState["focusout" == obj.type ? "focus" : "hover"] = !1), 
        self.isInStateTrue() ? void 0 : (clearTimeout(self.timeout), self.hoverState = "out", 
        self.options.delay && self.options.delay.hide ? void (self.timeout = setTimeout(function() {
            "out" == self.hoverState && self.hide();
        }, self.options.delay.hide)) : self.hide());
    }, Tooltip.prototype.show = function() {
        var e = $.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !inDom) return;
            var that = this, $tip = this.tip(), tipId = this.getUID(this.type);
            this.setContent(), $tip.attr("id", tipId), this.$element.attr("aria-describedby", tipId), 
            this.options.animation && $tip.addClass("fade");
            var placement = "function" == typeof this.options.placement ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement, autoToken = /\s?auto?\s?/i, autoPlace = autoToken.test(placement);
            autoPlace && (placement = placement.replace(autoToken, "") || "top"), $tip.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(placement).data("bs." + this.type, this), this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element), 
            this.$element.trigger("inserted.bs." + this.type);
            var pos = this.getPosition(), actualWidth = $tip[0].offsetWidth, actualHeight = $tip[0].offsetHeight;
            if (autoPlace) {
                var orgPlacement = placement, viewportDim = this.getPosition(this.$viewport);
                placement = "bottom" == placement && pos.bottom + actualHeight > viewportDim.bottom ? "top" : "top" == placement && pos.top - actualHeight < viewportDim.top ? "bottom" : "right" == placement && pos.right + actualWidth > viewportDim.width ? "left" : "left" == placement && pos.left - actualWidth < viewportDim.left ? "right" : placement, 
                $tip.removeClass(orgPlacement).addClass(placement);
            }
            var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);
            this.applyPlacement(calculatedOffset, placement);
            var complete = function() {
                var prevHoverState = that.hoverState;
                that.$element.trigger("shown.bs." + that.type), that.hoverState = null, "out" == prevHoverState && that.leave(that);
            };
            $.support.transition && this.$tip.hasClass("fade") ? $tip.one("bsTransitionEnd", complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();
        }
    }, Tooltip.prototype.applyPlacement = function(offset, placement) {
        var $tip = this.tip(), width = $tip[0].offsetWidth, height = $tip[0].offsetHeight, marginTop = parseInt($tip.css("margin-top"), 10), marginLeft = parseInt($tip.css("margin-left"), 10);
        isNaN(marginTop) && (marginTop = 0), isNaN(marginLeft) && (marginLeft = 0), offset.top += marginTop, 
        offset.left += marginLeft, $.offset.setOffset($tip[0], $.extend({
            using: function(props) {
                $tip.css({
                    top: Math.round(props.top),
                    left: Math.round(props.left)
                });
            }
        }, offset), 0), $tip.addClass("in");
        var actualWidth = $tip[0].offsetWidth, actualHeight = $tip[0].offsetHeight;
        "top" == placement && actualHeight != height && (offset.top = offset.top + height - actualHeight);
        var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);
        delta.left ? offset.left += delta.left : offset.top += delta.top;
        var isVertical = /top|bottom/.test(placement), arrowDelta = isVertical ? 2 * delta.left - width + actualWidth : 2 * delta.top - height + actualHeight, arrowOffsetPosition = isVertical ? "offsetWidth" : "offsetHeight";
        $tip.offset(offset), this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical);
    }, Tooltip.prototype.replaceArrow = function(delta, dimension, isVertical) {
        this.arrow().css(isVertical ? "left" : "top", 50 * (1 - delta / dimension) + "%").css(isVertical ? "top" : "left", "");
    }, Tooltip.prototype.setContent = function() {
        var $tip = this.tip(), title = this.getTitle();
        $tip.find(".tooltip-inner")[this.options.html ? "html" : "text"](title), $tip.removeClass("fade in top bottom left right");
    }, Tooltip.prototype.hide = function(callback) {
        function complete() {
            "in" != that.hoverState && $tip.detach(), that.$element.removeAttr("aria-describedby").trigger("hidden.bs." + that.type), 
            callback && callback();
        }
        var that = this, $tip = $(this.$tip), e = $.Event("hide.bs." + this.type);
        return this.$element.trigger(e), e.isDefaultPrevented() ? void 0 : ($tip.removeClass("in"), 
        $.support.transition && $tip.hasClass("fade") ? $tip.one("bsTransitionEnd", complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete(), 
        this.hoverState = null, this);
    }, Tooltip.prototype.fixTitle = function() {
        var $e = this.$element;
        ($e.attr("title") || "string" != typeof $e.attr("data-original-title")) && $e.attr("data-original-title", $e.attr("title") || "").attr("title", "");
    }, Tooltip.prototype.hasContent = function() {
        return this.getTitle();
    }, Tooltip.prototype.getPosition = function($element) {
        $element = $element || this.$element;
        var el = $element[0], isBody = "BODY" == el.tagName, elRect = el.getBoundingClientRect();
        null == elRect.width && (elRect = $.extend({}, elRect, {
            width: elRect.right - elRect.left,
            height: elRect.bottom - elRect.top
        }));
        var elOffset = isBody ? {
            top: 0,
            left: 0
        } : $element.offset(), scroll = {
            scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop()
        }, outerDims = isBody ? {
            width: $(window).width(),
            height: $(window).height()
        } : null;
        return $.extend({}, elRect, scroll, outerDims, elOffset);
    }, Tooltip.prototype.getCalculatedOffset = function(placement, pos, actualWidth, actualHeight) {
        return "bottom" == placement ? {
            top: pos.top + pos.height,
            left: pos.left + pos.width / 2 - actualWidth / 2
        } : "top" == placement ? {
            top: pos.top - actualHeight,
            left: pos.left + pos.width / 2 - actualWidth / 2
        } : "left" == placement ? {
            top: pos.top + pos.height / 2 - actualHeight / 2,
            left: pos.left - actualWidth
        } : {
            top: pos.top + pos.height / 2 - actualHeight / 2,
            left: pos.left + pos.width
        };
    }, Tooltip.prototype.getViewportAdjustedDelta = function(placement, pos, actualWidth, actualHeight) {
        var delta = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return delta;
        var viewportPadding = this.options.viewport && this.options.viewport.padding || 0, viewportDimensions = this.getPosition(this.$viewport);
        if (/right|left/.test(placement)) {
            var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll, bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight;
            topEdgeOffset < viewportDimensions.top ? delta.top = viewportDimensions.top - topEdgeOffset : bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height && (delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset);
        } else {
            var leftEdgeOffset = pos.left - viewportPadding, rightEdgeOffset = pos.left + viewportPadding + actualWidth;
            leftEdgeOffset < viewportDimensions.left ? delta.left = viewportDimensions.left - leftEdgeOffset : rightEdgeOffset > viewportDimensions.right && (delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset);
        }
        return delta;
    }, Tooltip.prototype.getTitle = function() {
        var title, $e = this.$element, o = this.options;
        return title = $e.attr("data-original-title") || ("function" == typeof o.title ? o.title.call($e[0]) : o.title);
    }, Tooltip.prototype.getUID = function(prefix) {
        do prefix += ~~(1e6 * Math.random()); while (document.getElementById(prefix));
        return prefix;
    }, Tooltip.prototype.tip = function() {
        if (!this.$tip && (this.$tip = $(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip;
    }, Tooltip.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
    }, Tooltip.prototype.enable = function() {
        this.enabled = !0;
    }, Tooltip.prototype.disable = function() {
        this.enabled = !1;
    }, Tooltip.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled;
    }, Tooltip.prototype.toggle = function(e) {
        var self = this;
        e && (self = $(e.currentTarget).data("bs." + this.type), self || (self = new this.constructor(e.currentTarget, this.getDelegateOptions()), 
        $(e.currentTarget).data("bs." + this.type, self))), e ? (self.inState.click = !self.inState.click, 
        self.isInStateTrue() ? self.enter(self) : self.leave(self)) : self.tip().hasClass("in") ? self.leave(self) : self.enter(self);
    }, Tooltip.prototype.destroy = function() {
        var that = this;
        clearTimeout(this.timeout), this.hide(function() {
            that.$element.off("." + that.type).removeData("bs." + that.type), that.$tip && that.$tip.detach(), 
            that.$tip = null, that.$arrow = null, that.$viewport = null;
        });
    };
    var old = $.fn.tooltip;
    $.fn.tooltip = Plugin, $.fn.tooltip.Constructor = Tooltip, $.fn.tooltip.noConflict = function() {
        return $.fn.tooltip = old, this;
    };
}(jQuery), +function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.popover"), options = "object" == typeof option && option;
            (data || !/destroy|hide/.test(option)) && (data || $this.data("bs.popover", data = new Popover(this, options)), 
            "string" == typeof option && data[option]());
        });
    }
    var Popover = function(element, options) {
        this.init("popover", element, options);
    };
    if (!$.fn.tooltip) throw new Error("Popover requires tooltip.js");
    Popover.VERSION = "3.3.5", Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype), Popover.prototype.constructor = Popover, 
    Popover.prototype.getDefaults = function() {
        return Popover.DEFAULTS;
    }, Popover.prototype.setContent = function() {
        var $tip = this.tip(), title = this.getTitle(), content = this.getContent();
        $tip.find(".popover-title")[this.options.html ? "html" : "text"](title), $tip.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof content ? "html" : "append" : "text"](content), 
        $tip.removeClass("fade top bottom left right in"), $tip.find(".popover-title").html() || $tip.find(".popover-title").hide();
    }, Popover.prototype.hasContent = function() {
        return this.getTitle() || this.getContent();
    }, Popover.prototype.getContent = function() {
        var $e = this.$element, o = this.options;
        return $e.attr("data-content") || ("function" == typeof o.content ? o.content.call($e[0]) : o.content);
    }, Popover.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow");
    };
    var old = $.fn.popover;
    $.fn.popover = Plugin, $.fn.popover.Constructor = Popover, $.fn.popover.noConflict = function() {
        return $.fn.popover = old, this;
    };
}(jQuery), +function($) {
    "use strict";
    function ScrollSpy(element, options) {
        this.$body = $(document.body), this.$scrollElement = $($(element).is(document.body) ? window : element), 
        this.options = $.extend({}, ScrollSpy.DEFAULTS, options), this.selector = (this.options.target || "") + " .nav li > a", 
        this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, 
        this.$scrollElement.on("scroll.bs.scrollspy", $.proxy(this.process, this)), this.refresh(), 
        this.process();
    }
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.scrollspy"), options = "object" == typeof option && option;
            data || $this.data("bs.scrollspy", data = new ScrollSpy(this, options)), "string" == typeof option && data[option]();
        });
    }
    ScrollSpy.VERSION = "3.3.5", ScrollSpy.DEFAULTS = {
        offset: 10
    }, ScrollSpy.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
    }, ScrollSpy.prototype.refresh = function() {
        var that = this, offsetMethod = "offset", offsetBase = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), 
        $.isWindow(this.$scrollElement[0]) || (offsetMethod = "position", offsetBase = this.$scrollElement.scrollTop()), 
        this.$body.find(this.selector).map(function() {
            var $el = $(this), href = $el.data("target") || $el.attr("href"), $href = /^#./.test(href) && $(href);
            return $href && $href.length && $href.is(":visible") && [ [ $href[offsetMethod]().top + offsetBase, href ] ] || null;
        }).sort(function(a, b) {
            return a[0] - b[0];
        }).each(function() {
            that.offsets.push(this[0]), that.targets.push(this[1]);
        });
    }, ScrollSpy.prototype.process = function() {
        var i, scrollTop = this.$scrollElement.scrollTop() + this.options.offset, scrollHeight = this.getScrollHeight(), maxScroll = this.options.offset + scrollHeight - this.$scrollElement.height(), offsets = this.offsets, targets = this.targets, activeTarget = this.activeTarget;
        if (this.scrollHeight != scrollHeight && this.refresh(), scrollTop >= maxScroll) return activeTarget != (i = targets[targets.length - 1]) && this.activate(i);
        if (activeTarget && scrollTop < offsets[0]) return this.activeTarget = null, this.clear();
        for (i = offsets.length; i--; ) activeTarget != targets[i] && scrollTop >= offsets[i] && (void 0 === offsets[i + 1] || scrollTop < offsets[i + 1]) && this.activate(targets[i]);
    }, ScrollSpy.prototype.activate = function(target) {
        this.activeTarget = target, this.clear();
        var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]', active = $(selector).parents("li").addClass("active");
        active.parent(".dropdown-menu").length && (active = active.closest("li.dropdown").addClass("active")), 
        active.trigger("activate.bs.scrollspy");
    }, ScrollSpy.prototype.clear = function() {
        $(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
    };
    var old = $.fn.scrollspy;
    $.fn.scrollspy = Plugin, $.fn.scrollspy.Constructor = ScrollSpy, $.fn.scrollspy.noConflict = function() {
        return $.fn.scrollspy = old, this;
    }, $(window).on("load.bs.scrollspy.data-api", function() {
        $('[data-spy="scroll"]').each(function() {
            var $spy = $(this);
            Plugin.call($spy, $spy.data());
        });
    });
}(jQuery), +function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.tab");
            data || $this.data("bs.tab", data = new Tab(this)), "string" == typeof option && data[option]();
        });
    }
    var Tab = function(element) {
        this.element = $(element);
    };
    Tab.VERSION = "3.3.5", Tab.TRANSITION_DURATION = 150, Tab.prototype.show = function() {
        var $this = this.element, $ul = $this.closest("ul:not(.dropdown-menu)"), selector = $this.data("target");
        if (selector || (selector = $this.attr("href"), selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "")), 
        !$this.parent("li").hasClass("active")) {
            var $previous = $ul.find(".active:last a"), hideEvent = $.Event("hide.bs.tab", {
                relatedTarget: $this[0]
            }), showEvent = $.Event("show.bs.tab", {
                relatedTarget: $previous[0]
            });
            if ($previous.trigger(hideEvent), $this.trigger(showEvent), !showEvent.isDefaultPrevented() && !hideEvent.isDefaultPrevented()) {
                var $target = $(selector);
                this.activate($this.closest("li"), $ul), this.activate($target, $target.parent(), function() {
                    $previous.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: $this[0]
                    }), $this.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: $previous[0]
                    });
                });
            }
        }
    }, Tab.prototype.activate = function(element, container, callback) {
        function next() {
            $active.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), 
            element.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), 
            transition ? (element[0].offsetWidth, element.addClass("in")) : element.removeClass("fade"), 
            element.parent(".dropdown-menu").length && element.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), 
            callback && callback();
        }
        var $active = container.find("> .active"), transition = callback && $.support.transition && ($active.length && $active.hasClass("fade") || !!container.find("> .fade").length);
        $active.length && transition ? $active.one("bsTransitionEnd", next).emulateTransitionEnd(Tab.TRANSITION_DURATION) : next(), 
        $active.removeClass("in");
    };
    var old = $.fn.tab;
    $.fn.tab = Plugin, $.fn.tab.Constructor = Tab, $.fn.tab.noConflict = function() {
        return $.fn.tab = old, this;
    };
    var clickHandler = function(e) {
        e.preventDefault(), Plugin.call($(this), "show");
    };
    $(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', clickHandler).on("click.bs.tab.data-api", '[data-toggle="pill"]', clickHandler);
}(jQuery), +function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.affix"), options = "object" == typeof option && option;
            data || $this.data("bs.affix", data = new Affix(this, options)), "string" == typeof option && data[option]();
        });
    }
    var Affix = function(element, options) {
        this.options = $.extend({}, Affix.DEFAULTS, options), this.$target = $(this.options.target).on("scroll.bs.affix.data-api", $.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", $.proxy(this.checkPositionWithEventLoop, this)), 
        this.$element = $(element), this.affixed = null, this.unpin = null, this.pinnedOffset = null, 
        this.checkPosition();
    };
    Affix.VERSION = "3.3.5", Affix.RESET = "affix affix-top affix-bottom", Affix.DEFAULTS = {
        offset: 0,
        target: window
    }, Affix.prototype.getState = function(scrollHeight, height, offsetTop, offsetBottom) {
        var scrollTop = this.$target.scrollTop(), position = this.$element.offset(), targetHeight = this.$target.height();
        if (null != offsetTop && "top" == this.affixed) return offsetTop > scrollTop ? "top" : !1;
        if ("bottom" == this.affixed) return null != offsetTop ? scrollTop + this.unpin <= position.top ? !1 : "bottom" : scrollHeight - offsetBottom >= scrollTop + targetHeight ? !1 : "bottom";
        var initializing = null == this.affixed, colliderTop = initializing ? scrollTop : position.top, colliderHeight = initializing ? targetHeight : height;
        return null != offsetTop && offsetTop >= scrollTop ? "top" : null != offsetBottom && colliderTop + colliderHeight >= scrollHeight - offsetBottom ? "bottom" : !1;
    }, Affix.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(Affix.RESET).addClass("affix");
        var scrollTop = this.$target.scrollTop(), position = this.$element.offset();
        return this.pinnedOffset = position.top - scrollTop;
    }, Affix.prototype.checkPositionWithEventLoop = function() {
        setTimeout($.proxy(this.checkPosition, this), 1);
    }, Affix.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var height = this.$element.height(), offset = this.options.offset, offsetTop = offset.top, offsetBottom = offset.bottom, scrollHeight = Math.max($(document).height(), $(document.body).height());
            "object" != typeof offset && (offsetBottom = offsetTop = offset), "function" == typeof offsetTop && (offsetTop = offset.top(this.$element)), 
            "function" == typeof offsetBottom && (offsetBottom = offset.bottom(this.$element));
            var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom);
            if (this.affixed != affix) {
                null != this.unpin && this.$element.css("top", "");
                var affixType = "affix" + (affix ? "-" + affix : ""), e = $.Event(affixType + ".bs.affix");
                if (this.$element.trigger(e), e.isDefaultPrevented()) return;
                this.affixed = affix, this.unpin = "bottom" == affix ? this.getPinnedOffset() : null, 
                this.$element.removeClass(Affix.RESET).addClass(affixType).trigger(affixType.replace("affix", "affixed") + ".bs.affix");
            }
            "bottom" == affix && this.$element.offset({
                top: scrollHeight - height - offsetBottom
            });
        }
    };
    var old = $.fn.affix;
    $.fn.affix = Plugin, $.fn.affix.Constructor = Affix, $.fn.affix.noConflict = function() {
        return $.fn.affix = old, this;
    }, $(window).on("load", function() {
        $('[data-spy="affix"]').each(function() {
            var $spy = $(this), data = $spy.data();
            data.offset = data.offset || {}, null != data.offsetBottom && (data.offset.bottom = data.offsetBottom), 
            null != data.offsetTop && (data.offset.top = data.offsetTop), Plugin.call($spy, data);
        });
    });
}(jQuery);
//# sourceMappingURL=vendor.js.map

})(window);