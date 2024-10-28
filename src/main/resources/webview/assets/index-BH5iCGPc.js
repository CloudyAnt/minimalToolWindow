console.log("LOADING index.js");
const ABC = 122

window.sayHelloWorld = function() {
    console.log("Hello World from index.js");
}
function sayHelloWorld1() {
    console.log("Hello World 1 from index.js");
}
window.sayHelloWorld1 = sayHelloWorld1;

function makeMap(str) {
    const map = Object.create(null);
    for (const key of str.split(",")) map[key] = 1;
    return val => val in map
}

console.log("A");
!function () {
    const relList = document.createElement("link").relList;
    if (!(relList && relList.supports && relList.supports("modulepreload"))) {
        for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
        new MutationObserver((mutations => {
            for (const mutation of mutations) if ("childList" === mutation.type) for (const node of mutation.addedNodes) "LINK" === node.tagName && "modulepreload" === node.rel && processPreload(node)
        })).observe(document, {childList: !0, subtree: !0})
    }

    function processPreload(link) {
        if (link.ep) return;
        link.ep = !0;
        const fetchOpts = function (link) {
            const fetchOpts = {};
            return link.integrity && (fetchOpts.integrity = link.integrity), link.referrerPolicy && (fetchOpts.referrerPolicy = link.referrerPolicy), "use-credentials" === link.crossOrigin ? fetchOpts.credentials = "include" : "anonymous" === link.crossOrigin ? fetchOpts.credentials = "omit" : fetchOpts.credentials = "same-origin", fetchOpts
        }(link);
        fetch(link.href, fetchOpts)
    }
}();

console.log("B");
const EMPTY_OBJ = {}, EMPTY_ARR = [], NOOP = () => {
    }, NO = () => !1,
    isOn = key => 111 === key.charCodeAt(0) && 110 === key.charCodeAt(1) && (key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97),
    isModelListener = key => key.startsWith("onUpdate:"), extend = Object.assign, remove = (arr, el) => {
        const i = arr.indexOf(el);
        i > -1 && arr.splice(i, 1)
    }, hasOwnProperty$1 = Object.prototype.hasOwnProperty, hasOwn = (val, key) => hasOwnProperty$1.call(val, key),
    isArray = Array.isArray, isMap = val => "[object Map]" === toTypeString(val),
    isFunction = val => "function" == typeof val, isString = val => "string" == typeof val,
    isSymbol = val => "symbol" == typeof val, isObject = val => null !== val && "object" == typeof val,
    isPromise = val => (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch),
    objectToString = Object.prototype.toString, toTypeString = value => objectToString.call(value),
    isIntegerKey = key => isString(key) && "NaN" !== key && "-" !== key[0] && "" + parseInt(key, 10) === key,
    isReservedProp = makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
    cacheStringFunction = fn => {
        const cache = Object.create(null);
        return str => cache[str] || (cache[str] = fn(str))
    }, camelizeRE = /-(\w)/g,
    camelize = cacheStringFunction((str => str.replace(camelizeRE, ((_, c) => c ? c.toUpperCase() : "")))),
    hyphenateRE = /\B([A-Z])/g, hyphenate = cacheStringFunction((str => str.replace(hyphenateRE, "-$1").toLowerCase())),
    capitalize = cacheStringFunction((str => str.charAt(0).toUpperCase() + str.slice(1))),
    toHandlerKey = cacheStringFunction((str => str ? `on${capitalize(str)}` : "")),
    hasChanged = (value, oldValue) => !Object.is(value, oldValue), invokeArrayFns = (fns, ...arg) => {
        for (let i = 0; i < fns.length; i++) fns[i](...arg)
    }, def = (obj, key, value, writable = !1) => {
        Object.defineProperty(obj, key, {configurable: !0, enumerable: !1, writable: writable, value: value})
    }, looseToNumber = val => {
        const n = parseFloat(val);
        return isNaN(n) ? val : n
    };
let _globalThis;
const getGlobalThis = () => _globalThis || (_globalThis = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {});

console.log("C");

function normalizeStyle(value) {
    if (isArray(value)) {
        const res = {};
        for (let i = 0; i < value.length; i++) {
            const item = value[i], normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
            if (normalized) for (const key in normalized) res[key] = normalized[key]
        }
        return res
    }
    if (isString(value) || isObject(value)) return value
}

const listDelimiterRE = /;(?![^(]*\))/g, propertyDelimiterRE = /:([^]+)/, styleCommentRE = /\/\*[^]*?\*\//g;

function parseStringStyle(cssText) {
    const ret = {};
    return cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item => {
        if (item) {
            const tmp = item.split(propertyDelimiterRE);
            tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim())
        }
    })), ret
}

function normalizeClass(value) {
    let res = "";
    if (isString(value)) res = value; else if (isArray(value)) for (let i = 0; i < value.length; i++) {
        const normalized = normalizeClass(value[i]);
        normalized && (res += normalized + " ")
    } else if (isObject(value)) for (const name in value) value[name] && (res += name + " ");
    return res.trim()
}

const isSpecialBooleanAttr = makeMap("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");

function includeBooleanAttr(value) {
    return !!value || "" === value
}

let activeEffectScope, activeSub;

console.log("D");

class EffectScope {
    constructor(detached = !1) {
        this.detached = detached, this._active = !0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = activeEffectScope, !detached && activeEffectScope && (this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1)
    }

    get active() {
        return this._active
    }

    pause() {
        if (this._active) {
            let i, l;
            if (this._isPaused = !0, this.scopes) for (i = 0, l = this.scopes.length; i < l; i++) this.scopes[i].pause();
            for (i = 0, l = this.effects.length; i < l; i++) this.effects[i].pause()
        }
    }

    resume() {
        if (this._active && this._isPaused) {
            let i, l;
            if (this._isPaused = !1, this.scopes) for (i = 0, l = this.scopes.length; i < l; i++) this.scopes[i].resume();
            for (i = 0, l = this.effects.length; i < l; i++) this.effects[i].resume()
        }
    }

    run(fn) {
        if (this._active) {
            const currentEffectScope = activeEffectScope;
            try {
                return activeEffectScope = this, fn()
            } finally {
                activeEffectScope = currentEffectScope
            }
        }
    }

    on() {
        activeEffectScope = this
    }

    off() {
        activeEffectScope = this.parent
    }

    stop(fromParent) {
        if (this._active) {
            let i, l;
            for (i = 0, l = this.effects.length; i < l; i++) this.effects[i].stop();
            for (i = 0, l = this.cleanups.length; i < l; i++) this.cleanups[i]();
            if (this.scopes) for (i = 0, l = this.scopes.length; i < l; i++) this.scopes[i].stop(!0);
            if (!this.detached && this.parent && !fromParent) {
                const last = this.parent.scopes.pop();
                last && last !== this && (this.parent.scopes[this.index] = last, last.index = this.index)
            }
            this.parent = void 0, this._active = !1
        }
    }
}

function effectScope(detached) {
    return new EffectScope(detached)
}

function getCurrentScope() {
    return activeEffectScope
}

const pausedQueueEffects = new WeakSet;

class ReactiveEffect {
    constructor(fn) {
        this.fn = fn, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, activeEffectScope && activeEffectScope.active && activeEffectScope.effects.push(this)
    }

    pause() {
        this.flags |= 64
    }

    resume() {
        64 & this.flags && (this.flags &= -65, pausedQueueEffects.has(this) && (pausedQueueEffects.delete(this), this.trigger()))
    }

    notify() {
        2 & this.flags && !(32 & this.flags) || 8 & this.flags || batch(this)
    }

    run() {
        if (!(1 & this.flags)) return this.fn();
        this.flags |= 2, cleanupEffect(this), prepareDeps(this);
        const prevEffect = activeSub, prevShouldTrack = shouldTrack;
        activeSub = this, shouldTrack = !0;
        try {
            return this.fn()
        } finally {
            cleanupDeps(this), activeSub = prevEffect, shouldTrack = prevShouldTrack, this.flags &= -3
        }
    }

    stop() {
        if (1 & this.flags) {
            for (let link = this.deps; link; link = link.nextDep) removeSub(link);
            this.deps = this.depsTail = void 0, cleanupEffect(this), this.onStop && this.onStop(), this.flags &= -2
        }
    }

    trigger() {
        64 & this.flags ? pausedQueueEffects.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty()
    }

    runIfDirty() {
        isDirty(this) && this.run()
    }

    get dirty() {
        return isDirty(this)
    }
}

let batchedSub, batchedComputed, batchDepth = 0;

function batch(sub, isComputed2 = !1) {
    if (sub.flags |= 8, isComputed2) return sub.next = batchedComputed, void (batchedComputed = sub);
    sub.next = batchedSub, batchedSub = sub
}

function startBatch() {
    batchDepth++
}

function endBatch() {
    if (--batchDepth > 0) return;
    if (batchedComputed) {
        let e = batchedComputed;
        for (batchedComputed = void 0; e;) {
            const next = e.next;
            e.next = void 0, e.flags &= -9, e = next
        }
    }
    let error;
    for (; batchedSub;) {
        let e = batchedSub;
        for (batchedSub = void 0; e;) {
            const next = e.next;
            if (e.next = void 0, e.flags &= -9, 1 & e.flags) try {
                e.trigger()
            } catch (err) {
                error || (error = err)
            }
            e = next
        }
    }
    if (error) throw error
}

console.log("E");

function prepareDeps(sub) {
    for (let link = sub.deps; link; link = link.nextDep) link.version = -1, link.prevActiveLink = link.dep.activeLink, link.dep.activeLink = link
}

function cleanupDeps(sub) {
    let head, tail = sub.depsTail, link = tail;
    for (; link;) {
        const prev = link.prevDep;
        -1 === link.version ? (link === tail && (tail = prev), removeSub(link), removeDep(link)) : head = link, link.dep.activeLink = link.prevActiveLink, link.prevActiveLink = void 0, link = prev
    }
    sub.deps = head, sub.depsTail = tail
}

function isDirty(sub) {
    for (let link = sub.deps; link; link = link.nextDep) if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) return !0;
    return !!sub._dirty
}

function refreshComputed(computed2) {
    if (4 & computed2.flags && !(16 & computed2.flags)) return;
    if (computed2.flags &= -17, computed2.globalVersion === globalVersion) return;
    computed2.globalVersion = globalVersion;
    const dep = computed2.dep;
    if (computed2.flags |= 2, dep.version > 0 && !computed2.isSSR && computed2.deps && !isDirty(computed2)) return void (computed2.flags &= -3);
    const prevSub = activeSub, prevShouldTrack = shouldTrack;
    activeSub = computed2, shouldTrack = !0;
    try {
        prepareDeps(computed2);
        const value = computed2.fn(computed2._value);
        (0 === dep.version || hasChanged(value, computed2._value)) && (computed2._value = value, dep.version++)
    } catch (err) {
        throw dep.version++, err
    } finally {
        activeSub = prevSub, shouldTrack = prevShouldTrack, cleanupDeps(computed2), computed2.flags &= -3
    }
}

function removeSub(link, soft = !1) {
    const {dep: dep, prevSub: prevSub, nextSub: nextSub} = link;
    if (prevSub && (prevSub.nextSub = nextSub, link.prevSub = void 0), nextSub && (nextSub.prevSub = prevSub, link.nextSub = void 0), dep.subs === link && (dep.subs = prevSub, !prevSub && dep.computed)) {
        dep.computed.flags &= -5;
        for (let l = dep.computed.deps; l; l = l.nextDep) removeSub(l, !0)
    }
    soft || --dep.sc || !dep.map || dep.map.delete(dep.key)
}

function removeDep(link) {
    const {prevDep: prevDep, nextDep: nextDep} = link;
    prevDep && (prevDep.nextDep = nextDep, link.prevDep = void 0), nextDep && (nextDep.prevDep = prevDep, link.nextDep = void 0)
}

let shouldTrack = !0;
const trackStack = [];

function pauseTracking() {
    trackStack.push(shouldTrack), shouldTrack = !1
}

function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = void 0 === last || last
}

function cleanupEffect(e) {
    const {cleanup: cleanup} = e;
    if (e.cleanup = void 0, cleanup) {
        const prevSub = activeSub;
        activeSub = void 0;
        try {
            cleanup()
        } finally {
            activeSub = prevSub
        }
    }
}

let globalVersion = 0;

class Link {
    constructor(sub, dep) {
        this.sub = sub, this.dep = dep, this.version = dep.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0
    }
}

console.log("F");

class Dep {
    constructor(computed2) {
        this.computed = computed2, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0
    }

    track(debugInfo) {
        if (!activeSub || !shouldTrack || activeSub === this.computed) return;
        let link = this.activeLink;
        if (void 0 === link || link.sub !== activeSub) link = this.activeLink = new Link(activeSub, this), activeSub.deps ? (link.prevDep = activeSub.depsTail, activeSub.depsTail.nextDep = link, activeSub.depsTail = link) : activeSub.deps = activeSub.depsTail = link, addSub(link); else if (-1 === link.version && (link.version = this.version, link.nextDep)) {
            const next = link.nextDep;
            next.prevDep = link.prevDep, link.prevDep && (link.prevDep.nextDep = next), link.prevDep = activeSub.depsTail, link.nextDep = void 0, activeSub.depsTail.nextDep = link, activeSub.depsTail = link, activeSub.deps === link && (activeSub.deps = next)
        }
        return link
    }

    trigger(debugInfo) {
        this.version++, globalVersion++, this.notify(debugInfo)
    }

    notify(debugInfo) {
        startBatch();
        try {
            0;
            for (let link = this.subs; link; link = link.prevSub) link.sub.notify() && link.sub.dep.notify()
        } finally {
            endBatch()
        }
    }
}

function addSub(link) {
    if (link.dep.sc++, 4 & link.sub.flags) {
        const computed2 = link.dep.computed;
        if (computed2 && !link.dep.subs) {
            computed2.flags |= 20;
            for (let l = computed2.deps; l; l = l.nextDep) addSub(l)
        }
        const currentTail = link.dep.subs;
        currentTail !== link && (link.prevSub = currentTail, currentTail && (currentTail.nextSub = link)), link.dep.subs = link
    }
}

const targetMap = new WeakMap, ITERATE_KEY = Symbol(""), MAP_KEY_ITERATE_KEY = Symbol(""),
    ARRAY_ITERATE_KEY = Symbol("");

function track(target, type, key) {
    if (shouldTrack && activeSub) {
        let depsMap = targetMap.get(target);
        depsMap || targetMap.set(target, depsMap = new Map);
        let dep = depsMap.get(key);
        dep || (depsMap.set(key, dep = new Dep), dep.map = depsMap, dep.key = key), dep.track()
    }
}

function trigger(target, type, key, newValue, oldValue, oldTarget) {
    const depsMap = targetMap.get(target);
    if (!depsMap) return void globalVersion++;
    const run = dep => {
        dep && dep.trigger()
    };
    if (startBatch(), "clear" === type) depsMap.forEach(run); else {
        const targetIsArray = isArray(target), isArrayIndex = targetIsArray && isIntegerKey(key);
        if (targetIsArray && "length" === key) {
            const newLength = Number(newValue);
            depsMap.forEach(((dep, key2) => {
                ("length" === key2 || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) && run(dep)
            }))
        } else switch ((void 0 !== key || depsMap.has(void 0)) && run(depsMap.get(key)), isArrayIndex && run(depsMap.get(ARRAY_ITERATE_KEY)), type) {
            case"add":
                targetIsArray ? isArrayIndex && run(depsMap.get("length")) : (run(depsMap.get(ITERATE_KEY)), isMap(target) && run(depsMap.get(MAP_KEY_ITERATE_KEY)));
                break;
            case"delete":
                targetIsArray || (run(depsMap.get(ITERATE_KEY)), isMap(target) && run(depsMap.get(MAP_KEY_ITERATE_KEY)));
                break;
            case"set":
                isMap(target) && run(depsMap.get(ITERATE_KEY))
        }
    }
    endBatch()
}

function reactiveReadArray(array) {
    const raw = toRaw(array);
    return raw === array ? raw : (track(raw, 0, ARRAY_ITERATE_KEY), isShallow(array) ? raw : raw.map(toReactive))
}

function shallowReadArray(arr) {
    return track(arr = toRaw(arr), 0, ARRAY_ITERATE_KEY), arr
}

console.log("G");
const arrayInstrumentations = {
    __proto__: null, [Symbol.iterator]() {
        return iterator(this, Symbol.iterator, toReactive)
    }, concat(...args) {
        return reactiveReadArray(this).concat(...args.map((x => isArray(x) ? reactiveReadArray(x) : x)))
    }, entries() {
        return iterator(this, "entries", (value => (value[1] = toReactive(value[1]), value)))
    }, every(fn, thisArg) {
        return apply(this, "every", fn, thisArg, void 0, arguments)
    }, filter(fn, thisArg) {
        return apply(this, "filter", fn, thisArg, (v => v.map(toReactive)), arguments)
    }, find(fn, thisArg) {
        return apply(this, "find", fn, thisArg, toReactive, arguments)
    }, findIndex(fn, thisArg) {
        return apply(this, "findIndex", fn, thisArg, void 0, arguments)
    }, findLast(fn, thisArg) {
        return apply(this, "findLast", fn, thisArg, toReactive, arguments)
    }, findLastIndex(fn, thisArg) {
        return apply(this, "findLastIndex", fn, thisArg, void 0, arguments)
    }, forEach(fn, thisArg) {
        return apply(this, "forEach", fn, thisArg, void 0, arguments)
    }, includes(...args) {
        return searchProxy(this, "includes", args)
    }, indexOf(...args) {
        return searchProxy(this, "indexOf", args)
    }, join(separator) {
        return reactiveReadArray(this).join(separator)
    }, lastIndexOf(...args) {
        return searchProxy(this, "lastIndexOf", args)
    }, map(fn, thisArg) {
        return apply(this, "map", fn, thisArg, void 0, arguments)
    }, pop() {
        return noTracking(this, "pop")
    }, push(...args) {
        return noTracking(this, "push", args)
    }, reduce(fn, ...args) {
        return reduce(this, "reduce", fn, args)
    }, reduceRight(fn, ...args) {
        return reduce(this, "reduceRight", fn, args)
    }, shift() {
        return noTracking(this, "shift")
    }, some(fn, thisArg) {
        return apply(this, "some", fn, thisArg, void 0, arguments)
    }, splice(...args) {
        return noTracking(this, "splice", args)
    }, toReversed() {
        return reactiveReadArray(this).toReversed()
    }, toSorted(comparer) {
        return reactiveReadArray(this).toSorted(comparer)
    }, toSpliced(...args) {
        return reactiveReadArray(this).toSpliced(...args)
    }, unshift(...args) {
        return noTracking(this, "unshift", args)
    }, values() {
        return iterator(this, "values", toReactive)
    }
};

function iterator(self2, method, wrapValue) {
    const arr = shallowReadArray(self2), iter = arr[method]();
    return arr === self2 || isShallow(self2) || (iter._next = iter.next, iter.next = () => {
        const result = iter._next();
        return result.value && (result.value = wrapValue(result.value)), result
    }), iter
}

const arrayProto = Array.prototype;

function apply(self2, method, fn, thisArg, wrappedRetFn, args) {
    const arr = shallowReadArray(self2), needsWrap = arr !== self2 && !isShallow(self2), methodFn = arr[method];
    if (methodFn !== arrayProto[method]) {
        const result2 = methodFn.apply(self2, args);
        return needsWrap ? toReactive(result2) : result2
    }
    let wrappedFn = fn;
    arr !== self2 && (needsWrap ? wrappedFn = function (item, index) {
        return fn.call(this, toReactive(item), index, self2)
    } : fn.length > 2 && (wrappedFn = function (item, index) {
        return fn.call(this, item, index, self2)
    }));
    const result = methodFn.call(arr, wrappedFn, thisArg);
    return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result
}

function reduce(self2, method, fn, args) {
    const arr = shallowReadArray(self2);
    let wrappedFn = fn;
    return arr !== self2 && (isShallow(self2) ? fn.length > 3 && (wrappedFn = function (acc, item, index) {
        return fn.call(this, acc, item, index, self2)
    }) : wrappedFn = function (acc, item, index) {
        return fn.call(this, acc, toReactive(item), index, self2)
    }), arr[method](wrappedFn, ...args)
}

function searchProxy(self2, method, args) {
    const arr = toRaw(self2);
    track(arr, 0, ARRAY_ITERATE_KEY);
    const res = arr[method](...args);
    return -1 !== res && !1 !== res || !isProxy(args[0]) ? res : (args[0] = toRaw(args[0]), arr[method](...args))
}

function noTracking(self2, method, args = []) {
    pauseTracking(), startBatch();
    const res = toRaw(self2)[method].apply(self2, args);
    return endBatch(), resetTracking(), res
}

const isNonTrackableKeys = makeMap("__proto__,__v_isRef,__isVue"),
    builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).filter((key => "arguments" !== key && "caller" !== key)).map((key => Symbol[key])).filter(isSymbol));

function hasOwnProperty(key) {
    isSymbol(key) || (key = String(key));
    const obj = toRaw(this);
    return track(obj, 0, key), obj.hasOwnProperty(key)
}

class BaseReactiveHandler {
    constructor(_isReadonly = !1, _isShallow = !1) {
        this._isReadonly = _isReadonly, this._isShallow = _isShallow
    }

    get(target, key, receiver) {
        const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
        if ("__v_isReactive" === key) return !isReadonly2;
        if ("__v_isReadonly" === key) return isReadonly2;
        if ("__v_isShallow" === key) return isShallow2;
        if ("__v_raw" === key) return receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver) ? target : void 0;
        const targetIsArray = isArray(target);
        if (!isReadonly2) {
            let fn;
            if (targetIsArray && (fn = arrayInstrumentations[key])) return fn;
            if ("hasOwnProperty" === key) return hasOwnProperty
        }
        const res = Reflect.get(target, key, isRef(target) ? target : receiver);
        return (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) ? res : (isReadonly2 || track(target, 0, key), isShallow2 ? res : isRef(res) ? targetIsArray && isIntegerKey(key) ? res : res.value : isObject(res) ? isReadonly2 ? readonly(res) : reactive(res) : res)
    }
}

class MutableReactiveHandler extends BaseReactiveHandler {
    constructor(isShallow2 = !1) {
        super(!1, isShallow2)
    }

    set(target, key, value, receiver) {
        let oldValue = target[key];
        if (!this._isShallow) {
            const isOldValueReadonly = isReadonly(oldValue);
            if (isShallow(value) || isReadonly(value) || (oldValue = toRaw(oldValue), value = toRaw(value)), !isArray(target) && isRef(oldValue) && !isRef(value)) return !isOldValueReadonly && (oldValue.value = value, !0)
        }
        const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key),
            result = Reflect.set(target, key, value, isRef(target) ? target : receiver);
        return target === toRaw(receiver) && (hadKey ? hasChanged(value, oldValue) && trigger(target, "set", key, value) : trigger(target, "add", key, value)), result
    }

    deleteProperty(target, key) {
        const hadKey = hasOwn(target, key);
        target[key];
        const result = Reflect.deleteProperty(target, key);
        return result && hadKey && trigger(target, "delete", key, void 0), result
    }

    has(target, key) {
        const result = Reflect.has(target, key);
        return isSymbol(key) && builtInSymbols.has(key) || track(target, 0, key), result
    }

    ownKeys(target) {
        return track(target, 0, isArray(target) ? "length" : ITERATE_KEY), Reflect.ownKeys(target)
    }
}

class ReadonlyReactiveHandler extends BaseReactiveHandler {
    constructor(isShallow2 = !1) {
        super(!0, isShallow2)
    }

    set(target, key) {
        return !0
    }

    deleteProperty(target, key) {
        return !0
    }
}

const mutableHandlers = new MutableReactiveHandler, readonlyHandlers = new ReadonlyReactiveHandler,
    shallowReactiveHandlers = new MutableReactiveHandler(!0), toShallow = value => value,
    getProto = v => Reflect.getPrototypeOf(v);

function createReadonlyMethod(type) {
    return function (...args) {
        return "delete" !== type && ("clear" === type ? void 0 : this)
    }
}

function createInstrumentations(readonly2, shallow) {
    const instrumentations = {
        get(key) {
            const target = this.__v_raw, rawTarget = toRaw(target), rawKey = toRaw(key);
            readonly2 || (hasChanged(key, rawKey) && track(rawTarget, 0, key), track(rawTarget, 0, rawKey));
            const {has: has} = getProto(rawTarget), wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
            return has.call(rawTarget, key) ? wrap(target.get(key)) : has.call(rawTarget, rawKey) ? wrap(target.get(rawKey)) : void (target !== rawTarget && target.get(key))
        }, get size() {
            const target = this.__v_raw;
            return !readonly2 && track(toRaw(target), 0, ITERATE_KEY), Reflect.get(target, "size", target)
        }, has(key) {
            const target = this.__v_raw, rawTarget = toRaw(target), rawKey = toRaw(key);
            return readonly2 || (hasChanged(key, rawKey) && track(rawTarget, 0, key), track(rawTarget, 0, rawKey)), key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey)
        }, forEach(callback, thisArg) {
            const observed = this, target = observed.__v_raw, rawTarget = toRaw(target),
                wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
            return !readonly2 && track(rawTarget, 0, ITERATE_KEY), target.forEach(((value, key) => callback.call(thisArg, wrap(value), wrap(key), observed)))
        }
    };
    extend(instrumentations, readonly2 ? {
        add: createReadonlyMethod("add"),
        set: createReadonlyMethod("set"),
        delete: createReadonlyMethod("delete"),
        clear: createReadonlyMethod("clear")
    } : {
        add(value) {
            shallow || isShallow(value) || isReadonly(value) || (value = toRaw(value));
            const target = toRaw(this);
            return getProto(target).has.call(target, value) || (target.add(value), trigger(target, "add", value, value)), this
        }, set(key, value) {
            shallow || isShallow(value) || isReadonly(value) || (value = toRaw(value));
            const target = toRaw(this), {has: has, get: get} = getProto(target);
            let hadKey = has.call(target, key);
            hadKey || (key = toRaw(key), hadKey = has.call(target, key));
            const oldValue = get.call(target, key);
            return target.set(key, value), hadKey ? hasChanged(value, oldValue) && trigger(target, "set", key, value) : trigger(target, "add", key, value), this
        }, delete(key) {
            const target = toRaw(this), {has: has, get: get} = getProto(target);
            let hadKey = has.call(target, key);
            hadKey || (key = toRaw(key), hadKey = has.call(target, key)), get && get.call(target, key);
            const result = target.delete(key);
            return hadKey && trigger(target, "delete", key, void 0), result
        }, clear() {
            const target = toRaw(this), hadItems = 0 !== target.size, result = target.clear();
            return hadItems && trigger(target, "clear", void 0, void 0), result
        }
    });
    return ["keys", "values", "entries", Symbol.iterator].forEach((method => {
        instrumentations[method] = function (method, isReadonly2, isShallow2) {
            return function (...args) {
                const target = this.__v_raw, rawTarget = toRaw(target), targetIsMap = isMap(rawTarget),
                    isPair = "entries" === method || method === Symbol.iterator && targetIsMap,
                    isKeyOnly = "keys" === method && targetIsMap, innerIterator = target[method](...args),
                    wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
                return !isReadonly2 && track(rawTarget, 0, isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY), {
                    next() {
                        const {value: value, done: done} = innerIterator.next();
                        return done ? {
                            value: value,
                            done: done
                        } : {value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value), done: done}
                    }, [Symbol.iterator]() {
                        return this
                    }
                }
            }
        }(method, readonly2, shallow)
    })), instrumentations
}

function createInstrumentationGetter(isReadonly2, shallow) {
    const instrumentations = createInstrumentations(isReadonly2, shallow);
    return (target, key, receiver) => "__v_isReactive" === key ? !isReadonly2 : "__v_isReadonly" === key ? isReadonly2 : "__v_raw" === key ? target : Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver)
}

const mutableCollectionHandlers = {get: createInstrumentationGetter(!1, !1)},
    shallowCollectionHandlers = {get: createInstrumentationGetter(!1, !0)},
    readonlyCollectionHandlers = {get: createInstrumentationGetter(!0, !1)}, reactiveMap = new WeakMap,
    shallowReactiveMap = new WeakMap, readonlyMap = new WeakMap, shallowReadonlyMap = new WeakMap;

function getTargetType(value) {
    return value.__v_skip || !Object.isExtensible(value) ? 0 : function (rawType) {
        switch (rawType) {
            case"Object":
            case"Array":
                return 1;
            case"Map":
            case"Set":
            case"WeakMap":
            case"WeakSet":
                return 2;
            default:
                return 0
        }
    }((value => toTypeString(value).slice(8, -1))(value))
}

function reactive(target) {
    return isReadonly(target) ? target : createReactiveObject(target, !1, mutableHandlers, mutableCollectionHandlers, reactiveMap)
}

function readonly(target) {
    return createReactiveObject(target, !0, readonlyHandlers, readonlyCollectionHandlers, readonlyMap)
}

function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject(target)) return target;
    if (target.__v_raw && (!isReadonly2 || !target.__v_isReactive)) return target;
    const existingProxy = proxyMap.get(target);
    if (existingProxy) return existingProxy;
    const targetType = getTargetType(target);
    if (0 === targetType) return target;
    const proxy = new Proxy(target, 2 === targetType ? collectionHandlers : baseHandlers);
    return proxyMap.set(target, proxy), proxy
}

function isReactive(value) {
    return isReadonly(value) ? isReactive(value.__v_raw) : !(!value || !value.__v_isReactive)
}

function isReadonly(value) {
    return !(!value || !value.__v_isReadonly)
}

function isShallow(value) {
    return !(!value || !value.__v_isShallow)
}

function isProxy(value) {
    return !!value && !!value.__v_raw
}

function toRaw(observed) {
    const raw = observed && observed.__v_raw;
    return raw ? toRaw(raw) : observed
}

function markRaw(value) {
    return !hasOwn(value, "__v_skip") && Object.isExtensible(value) && def(value, "__v_skip", !0), value
}

const toReactive = value => isObject(value) ? reactive(value) : value,
    toReadonly = value => isObject(value) ? readonly(value) : value;

function isRef(r) {
    return !!r && !0 === r.__v_isRef
}

function ref(value) {
    return function (rawValue, shallow) {
        if (isRef(rawValue)) return rawValue;
        return new RefImpl(rawValue, shallow)
    }(value, !1)
}

console.log("H");

class RefImpl {
    constructor(value, isShallow2) {
        this.dep = new Dep, this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = isShallow2 ? value : toRaw(value), this._value = isShallow2 ? value : toReactive(value), this.__v_isShallow = isShallow2
    }

    get value() {
        return this.dep.track(), this._value
    }

    set value(newValue) {
        const oldValue = this._rawValue,
            useDirectValue = this.__v_isShallow || isShallow(newValue) || isReadonly(newValue);
        newValue = useDirectValue ? newValue : toRaw(newValue), hasChanged(newValue, oldValue) && (this._rawValue = newValue, this._value = useDirectValue ? newValue : toReactive(newValue), this.dep.trigger())
    }
}

const shallowUnwrapHandlers = {
    get: (target, key, receiver) => {
        return "__v_raw" === key ? target : isRef(ref2 = Reflect.get(target, key, receiver)) ? ref2.value : ref2;
        var ref2
    }, set: (target, key, value, receiver) => {
        const oldValue = target[key];
        return isRef(oldValue) && !isRef(value) ? (oldValue.value = value, !0) : Reflect.set(target, key, value, receiver)
    }
};

function proxyRefs(objectWithRefs) {
    return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers)
}

class ObjectRefImpl {
    constructor(_object, _key, _defaultValue) {
        this._object = _object, this._key = _key, this._defaultValue = _defaultValue, this.__v_isRef = !0, this._value = void 0
    }

    get value() {
        const val = this._object[this._key];
        return this._value = void 0 === val ? this._defaultValue : val
    }

    set value(newVal) {
        this._object[this._key] = newVal
    }

    get dep() {
        return function (object, key) {
            const depMap = targetMap.get(object);
            return depMap && depMap.get(key)
        }(toRaw(this._object), this._key)
    }
}

function propertyToRef(source, key, defaultValue) {
    const val = source[key];
    return isRef(val) ? val : new ObjectRefImpl(source, key, defaultValue)
}

class ComputedRefImpl {
    constructor(fn, setter, isSSR) {
        this.fn = fn, this.setter = setter, this._value = void 0, this.dep = new Dep(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = globalVersion - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !setter, this.isSSR = isSSR
    }

    notify() {
        if (this.flags |= 16, !(8 & this.flags) && activeSub !== this) return batch(this, !0), !0
    }

    get value() {
        const link = this.dep.track();
        return refreshComputed(this), link && (link.version = this.dep.version), this._value
    }

    set value(newValue) {
        this.setter && this.setter(newValue)
    }
}

const INITIAL_WATCHER_VALUE = {}, cleanupMap = new WeakMap;
let activeWatcher;

function watch$1(source, cb, options = EMPTY_OBJ) {
    const {
            immediate: immediate,
            deep: deep,
            once: once,
            scheduler: scheduler,
            augmentJob: augmentJob,
            call: call
        } = options,
        reactiveGetter = source2 => deep ? source2 : isShallow(source2) || !1 === deep || 0 === deep ? traverse(source2, 1) : traverse(source2);
    let effect2, getter, cleanup, boundCleanup, forceTrigger = !1, isMultiSource = !1;
    if (isRef(source) ? (getter = () => source.value, forceTrigger = isShallow(source)) : isReactive(source) ? (getter = () => reactiveGetter(source), forceTrigger = !0) : isArray(source) ? (isMultiSource = !0, forceTrigger = source.some((s => isReactive(s) || isShallow(s))), getter = () => source.map((s => isRef(s) ? s.value : isReactive(s) ? reactiveGetter(s) : isFunction(s) ? call ? call(s, 2) : s() : void 0))) : getter = isFunction(source) ? cb ? call ? () => call(source, 2) : source : () => {
        if (cleanup) {
            pauseTracking();
            try {
                cleanup()
            } finally {
                resetTracking()
            }
        }
        const currentEffect = activeWatcher;
        activeWatcher = effect2;
        try {
            return call ? call(source, 3, [boundCleanup]) : source(boundCleanup)
        } finally {
            activeWatcher = currentEffect
        }
    } : NOOP, cb && deep) {
        const baseGetter = getter, depth = !0 === deep ? 1 / 0 : deep;
        getter = () => traverse(baseGetter(), depth)
    }
    const scope = getCurrentScope(), watchHandle = () => {
        effect2.stop(), scope && remove(scope.effects, effect2)
    };
    if (once && cb) {
        const _cb = cb;
        cb = (...args) => {
            _cb(...args), watchHandle()
        }
    }
    let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
    const job = immediateFirstRun => {
        if (1 & effect2.flags && (effect2.dirty || immediateFirstRun)) if (cb) {
            const newValue = effect2.run();
            if (deep || forceTrigger || (isMultiSource ? newValue.some(((v, i) => hasChanged(v, oldValue[i]))) : hasChanged(newValue, oldValue))) {
                cleanup && cleanup();
                const currentWatcher = activeWatcher;
                activeWatcher = effect2;
                try {
                    const args = [newValue, oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue, boundCleanup];
                    call ? call(cb, 3, args) : cb(...args), oldValue = newValue
                } finally {
                    activeWatcher = currentWatcher
                }
            }
        } else effect2.run()
    };
    return augmentJob && augmentJob(job), effect2 = new ReactiveEffect(getter), effect2.scheduler = scheduler ? () => scheduler(job, !1) : job, boundCleanup = fn => function (cleanupFn, failSilently = !1, owner = activeWatcher) {
        if (owner) {
            let cleanups = cleanupMap.get(owner);
            cleanups || cleanupMap.set(owner, cleanups = []), cleanups.push(cleanupFn)
        }
    }(fn, !1, effect2), cleanup = effect2.onStop = () => {
        const cleanups = cleanupMap.get(effect2);
        if (cleanups) {
            if (call) call(cleanups, 4); else for (const cleanup2 of cleanups) cleanup2();
            cleanupMap.delete(effect2)
        }
    }, cb ? immediate ? job(!0) : oldValue = effect2.run() : scheduler ? scheduler(job.bind(null, !0), !0) : effect2.run(), watchHandle.pause = effect2.pause.bind(effect2), watchHandle.resume = effect2.resume.bind(effect2), watchHandle.stop = watchHandle, watchHandle
}

function traverse(value, depth = 1 / 0, seen) {
    if (depth <= 0 || !isObject(value) || value.__v_skip) return value;
    if ((seen = seen || new Set).has(value)) return value;
    if (seen.add(value), depth--, isRef(value)) traverse(value.value, depth, seen); else if (isArray(value)) for (let i = 0; i < value.length; i++) traverse(value[i], depth, seen); else if ("[object Set]" === toTypeString(value) || isMap(value)) value.forEach((v => {
        traverse(v, depth, seen)
    })); else if ((val => "[object Object]" === toTypeString(val))(value)) {
        for (const key in value) traverse(value[key], depth, seen);
        for (const key of Object.getOwnPropertySymbols(value)) Object.prototype.propertyIsEnumerable.call(value, key) && traverse(value[key], depth, seen)
    }
    return value
}

function callWithErrorHandling(fn, instance, type, args) {
    try {
        return args ? fn(...args) : fn()
    } catch (err) {
        handleError(err, instance, type)
    }
}

function callWithAsyncErrorHandling(fn, instance, type, args) {
    if (isFunction(fn)) {
        const res = callWithErrorHandling(fn, instance, type, args);
        return res && isPromise(res) && res.catch((err => {
            handleError(err, instance, type)
        })), res
    }
    if (isArray(fn)) {
        const values = [];
        for (let i = 0; i < fn.length; i++) values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
        return values
    }
}

function handleError(err, instance, type, throwInDev = !0) {
    instance && instance.vnode;
    const {
        errorHandler: errorHandler,
        throwUnhandledErrorInProduction: throwUnhandledErrorInProduction
    } = instance && instance.appContext.config || EMPTY_OBJ;
    if (instance) {
        let cur = instance.parent;
        const exposedInstance = instance.proxy, errorInfo = `https://vuejs.org/error-reference/#runtime-${type}`;
        for (; cur;) {
            const errorCapturedHooks = cur.ec;
            if (errorCapturedHooks) for (let i = 0; i < errorCapturedHooks.length; i++) if (!1 === errorCapturedHooks[i](err, exposedInstance, errorInfo)) return;
            cur = cur.parent
        }
        if (errorHandler) return pauseTracking(), callWithErrorHandling(errorHandler, null, 10, [err, exposedInstance, errorInfo]), void resetTracking()
    }
    !function (err, type, contextVNode, throwInDev = !0, throwInProd = !1) {
        if (throwInProd) throw err
    }(err, 0, 0, throwInDev, throwUnhandledErrorInProduction)
}

console.log("H");
const queue = [];
let flushIndex = -1;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null, postFlushIndex = 0;
const resolvedPromise = Promise.resolve();
let currentFlushPromise = null;

function nextTick(fn) {
    const p2 = currentFlushPromise || resolvedPromise;
    return fn ? p2.then(this ? fn.bind(this) : fn) : p2
}

function queueJob(job) {
    if (!(1 & job.flags)) {
        const jobId = getId(job), lastJob = queue[queue.length - 1];
        !lastJob || !(2 & job.flags) && jobId >= getId(lastJob) ? queue.push(job) : queue.splice(function (id) {
            let start = flushIndex + 1, end = queue.length;
            for (; start < end;) {
                const middle = start + end >>> 1, middleJob = queue[middle], middleJobId = getId(middleJob);
                middleJobId < id || middleJobId === id && 2 & middleJob.flags ? start = middle + 1 : end = middle
            }
            return start
        }(jobId), 0, job), job.flags |= 1, queueFlush()
    }
}

function queueFlush() {
    currentFlushPromise || (currentFlushPromise = resolvedPromise.then(flushJobs))
}

function flushPreFlushCbs(instance, seen, i = flushIndex + 1) {
    for (; i < queue.length; i++) {
        const cb = queue[i];
        if (cb && 2 & cb.flags) {
            if (instance && cb.id !== instance.uid) continue;
            queue.splice(i, 1), i--, 4 & cb.flags && (cb.flags &= -2), cb(), 4 & cb.flags || (cb.flags &= -2)
        }
    }
}

function flushPostFlushCbs(seen) {
    if (pendingPostFlushCbs.length) {
        const deduped = [...new Set(pendingPostFlushCbs)].sort(((a, b) => getId(a) - getId(b)));
        if (pendingPostFlushCbs.length = 0, activePostFlushCbs) return void activePostFlushCbs.push(...deduped);
        for (activePostFlushCbs = deduped, postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
            const cb = activePostFlushCbs[postFlushIndex];
            4 & cb.flags && (cb.flags &= -2), 8 & cb.flags || cb(), cb.flags &= -2
        }
        activePostFlushCbs = null, postFlushIndex = 0
    }
}

const getId = job => null == job.id ? 2 & job.flags ? -1 : 1 / 0 : job.id;

function flushJobs(seen) {
    try {
        for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
            const job = queue[flushIndex];
            !job || 8 & job.flags || (4 & job.flags && (job.flags &= -2), callWithErrorHandling(job, job.i, job.i ? 15 : 14), 4 & job.flags || (job.flags &= -2))
        }
    } finally {
        for (; flushIndex < queue.length; flushIndex++) {
            const job = queue[flushIndex];
            job && (job.flags &= -2)
        }
        flushIndex = -1, queue.length = 0, flushPostFlushCbs(), currentFlushPromise = null, (queue.length || pendingPostFlushCbs.length) && flushJobs()
    }
}

let currentRenderingInstance = null, currentScopeId = null;

function setCurrentRenderingInstance(instance) {
    const prev = currentRenderingInstance;
    return currentRenderingInstance = instance, currentScopeId = instance && instance.type.__scopeId || null, prev
}

function withDirectives(vnode, directives) {
    if (null === currentRenderingInstance) return vnode;
    const instance = getComponentPublicInstance(currentRenderingInstance), bindings = vnode.dirs || (vnode.dirs = []);
    for (let i = 0; i < directives.length; i++) {
        let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
        dir && (isFunction(dir) && (dir = {
            mounted: dir,
            updated: dir
        }), dir.deep && traverse(value), bindings.push({
            dir: dir,
            instance: instance,
            value: value,
            oldValue: void 0,
            arg: arg,
            modifiers: modifiers
        }))
    }
    return vnode
}

function invokeDirectiveHook(vnode, prevVNode, instance, name) {
    const bindings = vnode.dirs, oldBindings = prevVNode && prevVNode.dirs;
    for (let i = 0; i < bindings.length; i++) {
        const binding = bindings[i];
        oldBindings && (binding.oldValue = oldBindings[i].value);
        let hook = binding.dir[name];
        hook && (pauseTracking(), callWithAsyncErrorHandling(hook, instance, 8, [vnode.el, binding, vnode, prevVNode]), resetTracking())
    }
}

const TeleportEndKey = Symbol("_vte");

function setTransitionHooks(vnode, hooks) {
    6 & vnode.shapeFlag && vnode.component ? (vnode.transition = hooks, setTransitionHooks(vnode.component.subTree, hooks)) : 128 & vnode.shapeFlag ? (vnode.ssContent.transition = hooks.clone(vnode.ssContent), vnode.ssFallback.transition = hooks.clone(vnode.ssFallback)) : vnode.transition = hooks
}

function markAsyncBoundary(instance) {
    instance.ids = [instance.ids[0] + instance.ids[2]++ + "-", 0, 0]
}

function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = !1) {
    if (isArray(rawRef)) return void rawRef.forEach(((r, i) => setRef(r, oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount)));
    if (isAsyncWrapper(vnode) && !isUnmount) return;
    const refValue = 4 & vnode.shapeFlag ? getComponentPublicInstance(vnode.component) : vnode.el,
        value = isUnmount ? null : refValue, {i: owner, r: ref3} = rawRef, oldRef = oldRawRef && oldRawRef.r,
        refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs, setupState = owner.setupState,
        rawSetupState = toRaw(setupState),
        canSetSetupRef = setupState === EMPTY_OBJ ? () => !1 : key => hasOwn(rawSetupState, key);
    if (null != oldRef && oldRef !== ref3 && (isString(oldRef) ? (refs[oldRef] = null, canSetSetupRef(oldRef) && (setupState[oldRef] = null)) : isRef(oldRef) && (oldRef.value = null)), isFunction(ref3)) callWithErrorHandling(ref3, owner, 12, [value, refs]); else {
        const _isString = isString(ref3), _isRef = isRef(ref3);
        if (_isString || _isRef) {
            const doSet = () => {
                if (rawRef.f) {
                    const existing = _isString ? canSetSetupRef(ref3) ? setupState[ref3] : refs[ref3] : ref3.value;
                    isUnmount ? isArray(existing) && remove(existing, refValue) : isArray(existing) ? existing.includes(refValue) || existing.push(refValue) : _isString ? (refs[ref3] = [refValue], canSetSetupRef(ref3) && (setupState[ref3] = refs[ref3])) : (ref3.value = [refValue], rawRef.k && (refs[rawRef.k] = ref3.value))
                } else _isString ? (refs[ref3] = value, canSetSetupRef(ref3) && (setupState[ref3] = value)) : _isRef && (ref3.value = value, rawRef.k && (refs[rawRef.k] = value))
            };
            value ? (doSet.id = -1, queuePostRenderEffect(doSet, parentSuspense)) : doSet()
        }
    }
}

getGlobalThis().requestIdleCallback, getGlobalThis().cancelIdleCallback;
const isAsyncWrapper = i => !!i.type.__asyncLoader, isKeepAlive = vnode => vnode.type.__isKeepAlive;

function onActivated(hook, target) {
    registerKeepAliveHook(hook, "a", target)
}

function onDeactivated(hook, target) {
    registerKeepAliveHook(hook, "da", target)
}

function registerKeepAliveHook(hook, type, target = currentInstance) {
    const wrappedHook = hook.__wdc || (hook.__wdc = () => {
        let current = target;
        for (; current;) {
            if (current.isDeactivated) return;
            current = current.parent
        }
        return hook()
    });
    if (injectHook(type, wrappedHook, target), target) {
        let current = target.parent;
        for (; current && current.parent;) isKeepAlive(current.parent.vnode) && injectToKeepAliveRoot(wrappedHook, type, target, current), current = current.parent
    }
}

function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
    const injected = injectHook(type, hook, keepAliveRoot, !0);
    onUnmounted((() => {
        remove(keepAliveRoot[type], injected)
    }), target)
}

function injectHook(type, hook, target = currentInstance, prepend = !1) {
    if (target) {
        const hooks = target[type] || (target[type] = []), wrappedHook = hook.__weh || (hook.__weh = (...args) => {
            pauseTracking();
            const reset = setCurrentInstance(target), res = callWithAsyncErrorHandling(hook, target, type, args);
            return reset(), resetTracking(), res
        });
        return prepend ? hooks.unshift(wrappedHook) : hooks.push(wrappedHook), wrappedHook
    }
}

const createHook = lifecycle => (hook, target = currentInstance) => {
        isInSSRComponentSetup && "sp" !== lifecycle || injectHook(lifecycle, ((...args) => hook(...args)), target)
    }, onBeforeMount = createHook("bm"), onMounted = createHook("m"), onBeforeUpdate = createHook("bu"),
    onUpdated = createHook("u"), onBeforeUnmount = createHook("bum"), onUnmounted = createHook("um"),
    onServerPrefetch = createHook("sp"), onRenderTriggered = createHook("rtg"), onRenderTracked = createHook("rtc");

function onErrorCaptured(hook, target = currentInstance) {
    injectHook("ec", hook, target)
}

const NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc"),
    getPublicInstance = i => i ? isStatefulComponent(i) ? getComponentPublicInstance(i) : getPublicInstance(i.parent) : null,
    publicPropertiesMap = extend(Object.create(null), {
        $: i => i,
        $el: i => i.vnode.el,
        $data: i => i.data,
        $props: i => i.props,
        $attrs: i => i.attrs,
        $slots: i => i.slots,
        $refs: i => i.refs,
        $parent: i => getPublicInstance(i.parent),
        $root: i => getPublicInstance(i.root),
        $host: i => i.ce,
        $emit: i => i.emit,
        $options: i => resolveMergedOptions(i),
        $forceUpdate: i => i.f || (i.f = () => {
            queueJob(i.update)
        }),
        $nextTick: i => i.n || (i.n = nextTick.bind(i.proxy)),
        $watch: i => instanceWatch.bind(i)
    }), hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key),
    PublicInstanceProxyHandlers = {
        get({_: instance}, key) {
            if ("__v_skip" === key) return !0;
            const {
                ctx: ctx,
                setupState: setupState,
                data: data,
                props: props,
                accessCache: accessCache,
                type: type,
                appContext: appContext
            } = instance;
            let normalizedProps;
            if ("$" !== key[0]) {
                const n = accessCache[key];
                if (void 0 !== n) switch (n) {
                    case 1:
                        return setupState[key];
                    case 2:
                        return data[key];
                    case 4:
                        return ctx[key];
                    case 3:
                        return props[key]
                } else {
                    if (hasSetupBinding(setupState, key)) return accessCache[key] = 1, setupState[key];
                    if (data !== EMPTY_OBJ && hasOwn(data, key)) return accessCache[key] = 2, data[key];
                    if ((normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)) return accessCache[key] = 3, props[key];
                    if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) return accessCache[key] = 4, ctx[key];
                    shouldCacheAccess && (accessCache[key] = 0)
                }
            }
            const publicGetter = publicPropertiesMap[key];
            let cssModule, globalProperties;
            return publicGetter ? ("$attrs" === key && track(instance.attrs, 0, ""), publicGetter(instance)) : (cssModule = type.__cssModules) && (cssModule = cssModule[key]) ? cssModule : ctx !== EMPTY_OBJ && hasOwn(ctx, key) ? (accessCache[key] = 4, ctx[key]) : (globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key) ? globalProperties[key] : void 0)
        },
        set({_: instance}, key, value) {
            const {data: data, setupState: setupState, ctx: ctx} = instance;
            return hasSetupBinding(setupState, key) ? (setupState[key] = value, !0) : data !== EMPTY_OBJ && hasOwn(data, key) ? (data[key] = value, !0) : !hasOwn(instance.props, key) && (("$" !== key[0] || !(key.slice(1) in instance)) && (ctx[key] = value, !0))
        },
        has({
                _: {
                    data: data,
                    setupState: setupState,
                    accessCache: accessCache,
                    ctx: ctx,
                    appContext: appContext,
                    propsOptions: propsOptions
                }
            }, key) {
            let normalizedProps;
            return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key)
        },
        defineProperty(target, key, descriptor) {
            return null != descriptor.get ? target._.accessCache[key] = 0 : hasOwn(descriptor, "value") && this.set(target, key, descriptor.value, null), Reflect.defineProperty(target, key, descriptor)
        }
    };

function normalizePropsOrEmits(props) {
    return isArray(props) ? props.reduce(((normalized, p2) => (normalized[p2] = null, normalized)), {}) : props
}

let shouldCacheAccess = !0;

function applyOptions(instance) {
    const options = resolveMergedOptions(instance), publicThis = instance.proxy, ctx = instance.ctx;
    shouldCacheAccess = !1, options.beforeCreate && callHook(options.beforeCreate, instance, "bc");
    const {
        data: dataOptions,
        computed: computedOptions,
        methods: methods,
        watch: watchOptions,
        provide: provideOptions,
        inject: injectOptions,
        created: created,
        beforeMount: beforeMount,
        mounted: mounted,
        beforeUpdate: beforeUpdate,
        updated: updated,
        activated: activated,
        deactivated: deactivated,
        beforeDestroy: beforeDestroy,
        beforeUnmount: beforeUnmount,
        destroyed: destroyed,
        unmounted: unmounted,
        render: render,
        renderTracked: renderTracked,
        renderTriggered: renderTriggered,
        errorCaptured: errorCaptured,
        serverPrefetch: serverPrefetch,
        expose: expose,
        inheritAttrs: inheritAttrs,
        components: components,
        directives: directives,
        filters: filters
    } = options;
    if (injectOptions && function (injectOptions, ctx) {
        isArray(injectOptions) && (injectOptions = normalizeInject(injectOptions));
        for (const key in injectOptions) {
            const opt = injectOptions[key];
            let injected;
            injected = isObject(opt) ? "default" in opt ? inject(opt.from || key, opt.default, !0) : inject(opt.from || key) : inject(opt), isRef(injected) ? Object.defineProperty(ctx, key, {
                enumerable: !0,
                configurable: !0,
                get: () => injected.value,
                set: v => injected.value = v
            }) : ctx[key] = injected
        }
    }(injectOptions, ctx, null), methods) for (const key in methods) {
        const methodHandler = methods[key];
        isFunction(methodHandler) && (ctx[key] = methodHandler.bind(publicThis))
    }
    if (dataOptions) {
        const data = dataOptions.call(publicThis, publicThis);
        isObject(data) && (instance.data = reactive(data))
    }
    if (shouldCacheAccess = !0, computedOptions) for (const key in computedOptions) {
        const opt = computedOptions[key],
            get = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP,
            set = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP,
            c = computed({get: get, set: set});
        Object.defineProperty(ctx, key, {enumerable: !0, configurable: !0, get: () => c.value, set: v => c.value = v})
    }
    if (watchOptions) for (const key in watchOptions) createWatcher(watchOptions[key], ctx, publicThis, key);
    if (provideOptions) {
        const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
        Reflect.ownKeys(provides).forEach((key => {
            !function (key, value) {
                if (currentInstance) {
                    let provides = currentInstance.provides;
                    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
                    parentProvides === provides && (provides = currentInstance.provides = Object.create(parentProvides)), provides[key] = value
                } else ;
            }(key, provides[key])
        }))
    }

    function registerLifecycleHook(register, hook) {
        isArray(hook) ? hook.forEach((_hook => register(_hook.bind(publicThis)))) : hook && register(hook.bind(publicThis))
    }

    if (created && callHook(created, instance, "c"), registerLifecycleHook(onBeforeMount, beforeMount), registerLifecycleHook(onMounted, mounted), registerLifecycleHook(onBeforeUpdate, beforeUpdate), registerLifecycleHook(onUpdated, updated), registerLifecycleHook(onActivated, activated), registerLifecycleHook(onDeactivated, deactivated), registerLifecycleHook(onErrorCaptured, errorCaptured), registerLifecycleHook(onRenderTracked, renderTracked), registerLifecycleHook(onRenderTriggered, renderTriggered), registerLifecycleHook(onBeforeUnmount, beforeUnmount), registerLifecycleHook(onUnmounted, unmounted), registerLifecycleHook(onServerPrefetch, serverPrefetch), isArray(expose)) if (expose.length) {
        const exposed = instance.exposed || (instance.exposed = {});
        expose.forEach((key => {
            Object.defineProperty(exposed, key, {get: () => publicThis[key], set: val => publicThis[key] = val})
        }))
    } else instance.exposed || (instance.exposed = {});
    render && instance.render === NOOP && (instance.render = render), null != inheritAttrs && (instance.inheritAttrs = inheritAttrs), components && (instance.components = components), directives && (instance.directives = directives), serverPrefetch && markAsyncBoundary(instance)
}

console.log("I");

function callHook(hook, instance, type) {
    callWithAsyncErrorHandling(isArray(hook) ? hook.map((h2 => h2.bind(instance.proxy))) : hook.bind(instance.proxy), instance, type)
}

function createWatcher(raw, ctx, publicThis, key) {
    let getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
    if (isString(raw)) {
        const handler = ctx[raw];
        isFunction(handler) && watch(getter, handler)
    } else if (isFunction(raw)) watch(getter, raw.bind(publicThis)); else if (isObject(raw)) if (isArray(raw)) raw.forEach((r => createWatcher(r, ctx, publicThis, key))); else {
        const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
        isFunction(handler) && watch(getter, handler, raw)
    }
}

function resolveMergedOptions(instance) {
    const base = instance.type, {mixins: mixins, extends: extendsOptions} = base, {
        mixins: globalMixins,
        optionsCache: cache,
        config: {optionMergeStrategies: optionMergeStrategies}
    } = instance.appContext, cached = cache.get(base);
    let resolved;
    return cached ? resolved = cached : globalMixins.length || mixins || extendsOptions ? (resolved = {}, globalMixins.length && globalMixins.forEach((m => mergeOptions(resolved, m, optionMergeStrategies, !0))), mergeOptions(resolved, base, optionMergeStrategies)) : resolved = base, isObject(base) && cache.set(base, resolved), resolved
}

function mergeOptions(to, from, strats, asMixin = !1) {
    const {mixins: mixins, extends: extendsOptions} = from;
    extendsOptions && mergeOptions(to, extendsOptions, strats, !0), mixins && mixins.forEach((m => mergeOptions(to, m, strats, !0)));
    for (const key in from) if (asMixin && "expose" === key) ; else {
        const strat = internalOptionMergeStrats[key] || strats && strats[key];
        to[key] = strat ? strat(to[key], from[key]) : from[key]
    }
    return to
}

const internalOptionMergeStrats = {
    data: mergeDataFn,
    props: mergeEmitsOrPropsOptions,
    emits: mergeEmitsOrPropsOptions,
    methods: mergeObjectOptions,
    computed: mergeObjectOptions,
    beforeCreate: mergeAsArray,
    created: mergeAsArray,
    beforeMount: mergeAsArray,
    mounted: mergeAsArray,
    beforeUpdate: mergeAsArray,
    updated: mergeAsArray,
    beforeDestroy: mergeAsArray,
    beforeUnmount: mergeAsArray,
    destroyed: mergeAsArray,
    unmounted: mergeAsArray,
    activated: mergeAsArray,
    deactivated: mergeAsArray,
    errorCaptured: mergeAsArray,
    serverPrefetch: mergeAsArray,
    components: mergeObjectOptions,
    directives: mergeObjectOptions,
    watch: function (to, from) {
        if (!to) return from;
        if (!from) return to;
        const merged = extend(Object.create(null), to);
        for (const key in from) merged[key] = mergeAsArray(to[key], from[key]);
        return merged
    },
    provide: mergeDataFn,
    inject: function (to, from) {
        return mergeObjectOptions(normalizeInject(to), normalizeInject(from))
    }
};

function mergeDataFn(to, from) {
    return from ? to ? function () {
        return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from)
    } : from : to
}

function normalizeInject(raw) {
    if (isArray(raw)) {
        const res = {};
        for (let i = 0; i < raw.length; i++) res[raw[i]] = raw[i];
        return res
    }
    return raw
}

function mergeAsArray(to, from) {
    return to ? [...new Set([].concat(to, from))] : from
}

function mergeObjectOptions(to, from) {
    return to ? extend(Object.create(null), to, from) : from
}

function mergeEmitsOrPropsOptions(to, from) {
    return to ? isArray(to) && isArray(from) ? [...new Set([...to, ...from])] : extend(Object.create(null), normalizePropsOrEmits(to), normalizePropsOrEmits(null != from ? from : {})) : from
}

function createAppContext() {
    return {
        app: null,
        config: {
            isNativeTag: NO,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap,
        propsCache: new WeakMap,
        emitsCache: new WeakMap
    }
}

let uid$1 = 0;

function createAppAPI(render, hydrate) {
    return function (rootComponent, rootProps = null) {
        isFunction(rootComponent) || (rootComponent = extend({}, rootComponent)), null == rootProps || isObject(rootProps) || (rootProps = null);
        const context = createAppContext(), installedPlugins = new WeakSet, pluginCleanupFns = [];
        let isMounted = !1;
        const app = context.app = {
            _uid: uid$1++,
            _component: rootComponent,
            _props: rootProps,
            _container: null,
            _context: context,
            _instance: null,
            version: version,
            get config() {
                return context.config
            },
            set config(v) {
            },
            use: (plugin, ...options) => (installedPlugins.has(plugin) || (plugin && isFunction(plugin.install) ? (installedPlugins.add(plugin), plugin.install(app, ...options)) : isFunction(plugin) && (installedPlugins.add(plugin), plugin(app, ...options))), app),
            mixin: mixin => (context.mixins.includes(mixin) || context.mixins.push(mixin), app),
            component: (name, component) => component ? (context.components[name] = component, app) : context.components[name],
            directive: (name, directive) => directive ? (context.directives[name] = directive, app) : context.directives[name],
            mount(rootContainer, isHydrate, namespace) {
                if (!isMounted) {
                    const vnode = app._ceVNode || createVNode(rootComponent, rootProps);
                    return vnode.appContext = context, !0 === namespace ? namespace = "svg" : !1 === namespace && (namespace = void 0), isHydrate && hydrate ? hydrate(vnode, rootContainer) : render(vnode, rootContainer, namespace), isMounted = !0, app._container = rootContainer, rootContainer.__vue_app__ = app, getComponentPublicInstance(vnode.component)
                }
            },
            onUnmount(cleanupFn) {
                pluginCleanupFns.push(cleanupFn)
            },
            unmount() {
                isMounted && (callWithAsyncErrorHandling(pluginCleanupFns, app._instance, 16), render(null, app._container), delete app._container.__vue_app__)
            },
            provide: (key, value) => (context.provides[key] = value, app),
            runWithContext(fn) {
                const lastApp = currentApp;
                currentApp = app;
                try {
                    return fn()
                } finally {
                    currentApp = lastApp
                }
            }
        };
        return app
    }
}

let currentApp = null;

function inject(key, defaultValue, treatDefaultAsFactory = !1) {
    const instance = currentInstance || currentRenderingInstance;
    if (instance || currentApp) {
        const provides = currentApp ? currentApp._context.provides : instance ? null == instance.parent ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : void 0;
        if (provides && key in provides) return provides[key];
        if (arguments.length > 1) return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue
    }
}

const internalObjectProto = {}, createInternalObject = () => Object.create(internalObjectProto),
    isInternalObject = obj => Object.getPrototypeOf(obj) === internalObjectProto;

function initProps(instance, rawProps, isStateful, isSSR = !1) {
    const props = {}, attrs = createInternalObject();
    instance.propsDefaults = Object.create(null), setFullProps(instance, rawProps, props, attrs);
    for (const key in instance.propsOptions[0]) key in props || (props[key] = void 0);
    isStateful ? instance.props = isSSR ? props : createReactiveObject(props, !1, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap) : instance.type.props ? instance.props = props : instance.props = attrs, instance.attrs = attrs
}

function setFullProps(instance, rawProps, props, attrs) {
    const [options, needCastKeys] = instance.propsOptions;
    let rawCastValues, hasAttrsChanged = !1;
    if (rawProps) for (let key in rawProps) {
        if (isReservedProp(key)) continue;
        const value = rawProps[key];
        let camelKey;
        options && hasOwn(options, camelKey = camelize(key)) ? needCastKeys && needCastKeys.includes(camelKey) ? (rawCastValues || (rawCastValues = {}))[camelKey] = value : props[camelKey] = value : isEmitListener(instance.emitsOptions, key) || key in attrs && value === attrs[key] || (attrs[key] = value, hasAttrsChanged = !0)
    }
    if (needCastKeys) {
        const rawCurrentProps = toRaw(props), castValues = rawCastValues || EMPTY_OBJ;
        for (let i = 0; i < needCastKeys.length; i++) {
            const key = needCastKeys[i];
            props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key))
        }
    }
    return hasAttrsChanged
}

function resolvePropValue(options, props, key, value, instance, isAbsent) {
    const opt = options[key];
    if (null != opt) {
        const hasDefault = hasOwn(opt, "default");
        if (hasDefault && void 0 === value) {
            const defaultValue = opt.default;
            if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
                const {propsDefaults: propsDefaults} = instance;
                if (key in propsDefaults) value = propsDefaults[key]; else {
                    const reset = setCurrentInstance(instance);
                    value = propsDefaults[key] = defaultValue.call(null, props), reset()
                }
            } else value = defaultValue;
            instance.ce && instance.ce._setProp(key, value)
        }
        opt[0] && (isAbsent && !hasDefault ? value = !1 : !opt[1] || "" !== value && value !== hyphenate(key) || (value = !0))
    }
    return value
}

const mixinPropsCache = new WeakMap;

function normalizePropsOptions(comp, appContext, asMixin = !1) {
    const cache = asMixin ? mixinPropsCache : appContext.propsCache, cached = cache.get(comp);
    if (cached) return cached;
    const raw = comp.props, normalized = {}, needCastKeys = [];
    let hasExtends = !1;
    if (!isFunction(comp)) {
        const extendProps = raw2 => {
            hasExtends = !0;
            const [props, keys] = normalizePropsOptions(raw2, appContext, !0);
            extend(normalized, props), keys && needCastKeys.push(...keys)
        };
        !asMixin && appContext.mixins.length && appContext.mixins.forEach(extendProps), comp.extends && extendProps(comp.extends), comp.mixins && comp.mixins.forEach(extendProps)
    }
    if (!raw && !hasExtends) return isObject(comp) && cache.set(comp, EMPTY_ARR), EMPTY_ARR;
    if (isArray(raw)) for (let i = 0; i < raw.length; i++) {
        const normalizedKey = camelize(raw[i]);
        validatePropName(normalizedKey) && (normalized[normalizedKey] = EMPTY_OBJ)
    } else if (raw) for (const key in raw) {
        const normalizedKey = camelize(key);
        if (validatePropName(normalizedKey)) {
            const opt = raw[key],
                prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? {type: opt} : extend({}, opt),
                propType = prop.type;
            let shouldCast = !1, shouldCastTrue = !0;
            if (isArray(propType)) for (let index = 0; index < propType.length; ++index) {
                const type = propType[index], typeName = isFunction(type) && type.name;
                if ("Boolean" === typeName) {
                    shouldCast = !0;
                    break
                }
                "String" === typeName && (shouldCastTrue = !1)
            } else shouldCast = isFunction(propType) && "Boolean" === propType.name;
            prop[0] = shouldCast, prop[1] = shouldCastTrue, (shouldCast || hasOwn(prop, "default")) && needCastKeys.push(normalizedKey)
        }
    }
    const res = [normalized, needCastKeys];
    return isObject(comp) && cache.set(comp, res), res
}

function validatePropName(key) {
    return "$" !== key[0] && !isReservedProp(key)
}

const isInternalKey = key => "_" === key[0] || "$stable" === key,
    normalizeSlotValue = value => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)],
    normalizeSlot = (key, rawSlot, ctx) => {
        if (rawSlot._n) return rawSlot;
        const normalized = function (fn, ctx = currentRenderingInstance) {
            if (!ctx) return fn;
            if (fn._n) return fn;
            const renderFnWithContext = (...args) => {
                renderFnWithContext._d && setBlockTracking(-1);
                const prevInstance = setCurrentRenderingInstance(ctx);
                let res;
                try {
                    res = fn(...args)
                } finally {
                    setCurrentRenderingInstance(prevInstance), renderFnWithContext._d && setBlockTracking(1)
                }
                return res
            };
            return renderFnWithContext._n = !0, renderFnWithContext._c = !0, renderFnWithContext._d = !0, renderFnWithContext
        }(((...args) => normalizeSlotValue(rawSlot(...args))), ctx);
        return normalized._c = !1, normalized
    }, normalizeObjectSlots = (rawSlots, slots, instance) => {
        const ctx = rawSlots._ctx;
        for (const key in rawSlots) {
            if (isInternalKey(key)) continue;
            const value = rawSlots[key];
            if (isFunction(value)) slots[key] = normalizeSlot(0, value, ctx); else if (null != value) {
                const normalized = normalizeSlotValue(value);
                slots[key] = () => normalized
            }
        }
    }, normalizeVNodeSlots = (instance, children) => {
        const normalized = normalizeSlotValue(children);
        instance.slots.default = () => normalized
    }, assignSlots = (slots, children, optimized) => {
        for (const key in children) (optimized || "_" !== key) && (slots[key] = children[key])
    }, queuePostRenderEffect = function (fn, suspense) {
        suspense && suspense.pendingBranch ? isArray(fn) ? suspense.effects.push(...fn) : suspense.effects.push(fn) : (isArray(cb = fn) ? pendingPostFlushCbs.push(...cb) : activePostFlushCbs && -1 === cb.id ? activePostFlushCbs.splice(postFlushIndex + 1, 0, cb) : 1 & cb.flags || (pendingPostFlushCbs.push(cb), cb.flags |= 1), queueFlush());
        var cb
    };


console.log("J");

function createRenderer(options) {
    return function (options) {
        getGlobalThis().__VUE__ = !0;
        const {
                insert: hostInsert,
                remove: hostRemove,
                patchProp: hostPatchProp,
                createElement: hostCreateElement,
                createText: hostCreateText,
                createComment: hostCreateComment,
                setText: hostSetText,
                setElementText: hostSetElementText,
                parentNode: hostParentNode,
                nextSibling: hostNextSibling,
                setScopeId: hostSetScopeId = NOOP,
                insertStaticContent: hostInsertStaticContent
            } = options,
            patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
                if (n1 === n2) return;
                n1 && !isSameVNodeType(n1, n2) && (anchor = getNextHostNode(n1), unmount(n1, parentComponent, parentSuspense, !0), n1 = null), -2 === n2.patchFlag && (optimized = !1, n2.dynamicChildren = null);
                const {type: type, ref: ref3, shapeFlag: shapeFlag} = n2;
                switch (type) {
                    case Text:
                        processText(n1, n2, container, anchor);
                        break;
                    case Comment:
                        processCommentNode(n1, n2, container, anchor);
                        break;
                    case Static:
                        null == n1 && mountStaticNode(n2, container, anchor, namespace);
                        break;
                    case Fragment:
                        processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                        break;
                    default:
                        1 & shapeFlag ? processElement(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) : 6 & shapeFlag ? processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) : (64 & shapeFlag || 128 & shapeFlag) && type.process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals)
                }
                null != ref3 && parentComponent && setRef(ref3, n1 && n1.ref, parentSuspense, n2 || n1, !n2)
            }, processText = (n1, n2, container, anchor) => {
                if (null == n1) hostInsert(n2.el = hostCreateText(n2.children), container, anchor); else {
                    const el = n2.el = n1.el;
                    n2.children !== n1.children && hostSetText(el, n2.children)
                }
            }, processCommentNode = (n1, n2, container, anchor) => {
                null == n1 ? hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor) : n2.el = n1.el
            }, mountStaticNode = (n2, container, anchor, namespace) => {
                [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, namespace, n2.el, n2.anchor)
            }, moveStaticNode = ({el: el, anchor: anchor}, container, nextSibling) => {
                let next;
                for (; el && el !== anchor;) next = hostNextSibling(el), hostInsert(el, container, nextSibling), el = next;
                hostInsert(anchor, container, nextSibling)
            }, removeStaticNode = ({el: el, anchor: anchor}) => {
                let next;
                for (; el && el !== anchor;) next = hostNextSibling(el), hostRemove(el), el = next;
                hostRemove(anchor)
            },
            processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
                "svg" === n2.type ? namespace = "svg" : "math" === n2.type && (namespace = "mathml"), null == n1 ? mountElement(n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) : patchElement(n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized)
            },
            mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
                let el, vnodeHook;
                const {props: props, shapeFlag: shapeFlag, transition: transition, dirs: dirs} = vnode;
                if (el = vnode.el = hostCreateElement(vnode.type, namespace, props && props.is, props), 8 & shapeFlag ? hostSetElementText(el, vnode.children) : 16 & shapeFlag && mountChildren(vnode.children, el, null, parentComponent, parentSuspense, resolveChildrenNamespace(vnode, namespace), slotScopeIds, optimized), dirs && invokeDirectiveHook(vnode, null, parentComponent, "created"), setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent), props) {
                    for (const key in props) "value" === key || isReservedProp(key) || hostPatchProp(el, key, null, props[key], namespace, parentComponent);
                    "value" in props && hostPatchProp(el, "value", null, props.value, namespace), (vnodeHook = props.onVnodeBeforeMount) && invokeVNodeHook(vnodeHook, parentComponent, vnode)
                }
                dirs && invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
                const needCallTransitionHooks = function (parentSuspense, transition) {
                    return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted
                }(parentSuspense, transition);
                needCallTransitionHooks && transition.beforeEnter(el), hostInsert(el, container, anchor), ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) && queuePostRenderEffect((() => {
                    vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode), needCallTransitionHooks && transition.enter(el), dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted")
                }), parentSuspense)
            }, setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
                if (scopeId && hostSetScopeId(el, scopeId), slotScopeIds) for (let i = 0; i < slotScopeIds.length; i++) hostSetScopeId(el, slotScopeIds[i]);
                if (parentComponent) {
                    let subTree = parentComponent.subTree;
                    if (vnode === subTree || isSuspense(subTree.type) && (subTree.ssContent === vnode || subTree.ssFallback === vnode)) {
                        const parentVNode = parentComponent.vnode;
                        setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent)
                    }
                }
            },
            mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
                for (let i = start; i < children.length; i++) {
                    const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
                    patch(null, child, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized)
                }
            }, patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
                const el = n2.el = n1.el;
                let {patchFlag: patchFlag, dynamicChildren: dynamicChildren, dirs: dirs} = n2;
                patchFlag |= 16 & n1.patchFlag;
                const oldProps = n1.props || EMPTY_OBJ, newProps = n2.props || EMPTY_OBJ;
                let vnodeHook;
                if (parentComponent && toggleRecurse(parentComponent, !1), (vnodeHook = newProps.onVnodeBeforeUpdate) && invokeVNodeHook(vnodeHook, parentComponent, n2, n1), dirs && invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate"), parentComponent && toggleRecurse(parentComponent, !0), (oldProps.innerHTML && null == newProps.innerHTML || oldProps.textContent && null == newProps.textContent) && hostSetElementText(el, ""), dynamicChildren ? patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, resolveChildrenNamespace(n2, namespace), slotScopeIds) : optimized || patchChildren(n1, n2, el, null, parentComponent, parentSuspense, resolveChildrenNamespace(n2, namespace), slotScopeIds, !1), patchFlag > 0) {
                    if (16 & patchFlag) patchProps(el, oldProps, newProps, parentComponent, namespace); else if (2 & patchFlag && oldProps.class !== newProps.class && hostPatchProp(el, "class", null, newProps.class, namespace), 4 & patchFlag && hostPatchProp(el, "style", oldProps.style, newProps.style, namespace), 8 & patchFlag) {
                        const propsToUpdate = n2.dynamicProps;
                        for (let i = 0; i < propsToUpdate.length; i++) {
                            const key = propsToUpdate[i], prev = oldProps[key], next = newProps[key];
                            next === prev && "value" !== key || hostPatchProp(el, key, prev, next, namespace, parentComponent)
                        }
                    }
                    1 & patchFlag && n1.children !== n2.children && hostSetElementText(el, n2.children)
                } else optimized || null != dynamicChildren || patchProps(el, oldProps, newProps, parentComponent, namespace);
                ((vnodeHook = newProps.onVnodeUpdated) || dirs) && queuePostRenderEffect((() => {
                    vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1), dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated")
                }), parentSuspense)
            },
            patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
                for (let i = 0; i < newChildren.length; i++) {
                    const oldVNode = oldChildren[i], newVNode = newChildren[i],
                        container = oldVNode.el && (oldVNode.type === Fragment || !isSameVNodeType(oldVNode, newVNode) || 70 & oldVNode.shapeFlag) ? hostParentNode(oldVNode.el) : fallbackContainer;
                    patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, !0)
                }
            }, patchProps = (el, oldProps, newProps, parentComponent, namespace) => {
                if (oldProps !== newProps) {
                    if (oldProps !== EMPTY_OBJ) for (const key in oldProps) isReservedProp(key) || key in newProps || hostPatchProp(el, key, oldProps[key], null, namespace, parentComponent);
                    for (const key in newProps) {
                        if (isReservedProp(key)) continue;
                        const next = newProps[key], prev = oldProps[key];
                        next !== prev && "value" !== key && hostPatchProp(el, key, prev, next, namespace, parentComponent)
                    }
                    "value" in newProps && hostPatchProp(el, "value", oldProps.value, newProps.value, namespace)
                }
            },
            processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
                const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText(""),
                    fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
                let {patchFlag: patchFlag, dynamicChildren: dynamicChildren, slotScopeIds: fragmentSlotScopeIds} = n2;
                fragmentSlotScopeIds && (slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds), null == n1 ? (hostInsert(fragmentStartAnchor, container, anchor), hostInsert(fragmentEndAnchor, container, anchor), mountChildren(n2.children || [], container, fragmentEndAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized)) : patchFlag > 0 && 64 & patchFlag && dynamicChildren && n1.dynamicChildren ? (patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, namespace, slotScopeIds), (null != n2.key || parentComponent && n2 === parentComponent.subTree) && traverseStaticChildren(n1, n2, !0)) : patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized)
            },
            processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
                n2.slotScopeIds = slotScopeIds, null == n1 ? 512 & n2.shapeFlag ? parentComponent.ctx.activate(n2, container, anchor, namespace, optimized) : mountComponent(n2, container, anchor, parentComponent, parentSuspense, namespace, optimized) : updateComponent(n1, n2, optimized)
            },
            mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
                const instance = initialVNode.component = function (vnode, parent, suspense) {
                    const type = vnode.type,
                        appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext, instance = {
                            uid: uid++,
                            vnode: vnode,
                            type: type,
                            parent: parent,
                            appContext: appContext,
                            root: null,
                            next: null,
                            subTree: null,
                            effect: null,
                            update: null,
                            job: null,
                            scope: new EffectScope(!0),
                            render: null,
                            proxy: null,
                            exposed: null,
                            exposeProxy: null,
                            withProxy: null,
                            provides: parent ? parent.provides : Object.create(appContext.provides),
                            ids: parent ? parent.ids : ["", 0, 0],
                            accessCache: null,
                            renderCache: [],
                            components: null,
                            directives: null,
                            propsOptions: normalizePropsOptions(type, appContext),
                            emitsOptions: normalizeEmitsOptions(type, appContext),
                            emit: null,
                            emitted: null,
                            propsDefaults: EMPTY_OBJ,
                            inheritAttrs: type.inheritAttrs,
                            ctx: EMPTY_OBJ,
                            data: EMPTY_OBJ,
                            props: EMPTY_OBJ,
                            attrs: EMPTY_OBJ,
                            slots: EMPTY_OBJ,
                            refs: EMPTY_OBJ,
                            setupState: EMPTY_OBJ,
                            setupContext: null,
                            suspense: suspense,
                            suspenseId: suspense ? suspense.pendingId : 0,
                            asyncDep: null,
                            asyncResolved: !1,
                            isMounted: !1,
                            isUnmounted: !1,
                            isDeactivated: !1,
                            bc: null,
                            c: null,
                            bm: null,
                            m: null,
                            bu: null,
                            u: null,
                            um: null,
                            bum: null,
                            da: null,
                            a: null,
                            rtg: null,
                            rtc: null,
                            ec: null,
                            sp: null
                        };
                    instance.ctx = {_: instance}, instance.root = parent ? parent.root : instance, instance.emit = emit.bind(null, instance), vnode.ce && vnode.ce(instance);
                    return instance
                }(initialVNode, parentComponent, parentSuspense);
                if (isKeepAlive(initialVNode) && (instance.ctx.renderer = internals), function (instance, isSSR = !1, optimized = !1) {
                    isSSR && setInSSRSetupState(isSSR);
                    const {props: props, children: children} = instance.vnode,
                        isStateful = isStatefulComponent(instance);
                    initProps(instance, props, isStateful, isSSR), ((instance, children, optimized) => {
                        const slots = instance.slots = createInternalObject();
                        if (32 & instance.vnode.shapeFlag) {
                            const type = children._;
                            type ? (assignSlots(slots, children, optimized), optimized && def(slots, "_", type, !0)) : normalizeObjectSlots(children, slots)
                        } else children && normalizeVNodeSlots(instance, children)
                    })(instance, children, optimized);
                    const setupResult = isStateful ? function (instance, isSSR) {
                        const Component = instance.type;
                        instance.accessCache = Object.create(null), instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
                        const {setup: setup} = Component;
                        if (setup) {
                            pauseTracking();
                            const setupContext = instance.setupContext = setup.length > 1 ? function (instance) {
                                    const expose = exposed => {
                                        instance.exposed = exposed || {}
                                    };
                                    return {
                                        attrs: new Proxy(instance.attrs, attrsProxyHandlers),
                                        slots: instance.slots,
                                        emit: instance.emit,
                                        expose: expose
                                    }
                                }(instance) : null, reset = setCurrentInstance(instance),
                                setupResult = callWithErrorHandling(setup, instance, 0, [instance.props, setupContext]),
                                isAsyncSetup = isPromise(setupResult);
                            if (resetTracking(), reset(), !isAsyncSetup && !instance.sp || isAsyncWrapper(instance) || markAsyncBoundary(instance), isAsyncSetup) {
                                if (setupResult.then(unsetCurrentInstance, unsetCurrentInstance), isSSR) return setupResult.then((resolvedResult => {
                                    handleSetupResult(instance, resolvedResult, isSSR)
                                })).catch((e => {
                                    handleError(e, instance, 0)
                                }));
                                instance.asyncDep = setupResult
                            } else handleSetupResult(instance, setupResult, isSSR)
                        } else finishComponentSetup(instance, isSSR)
                    }(instance, isSSR) : void 0;
                    isSSR && setInSSRSetupState(!1)
                }(instance, !1, optimized), instance.asyncDep) {
                    if (parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect, optimized), !initialVNode.el) {
                        const placeholder = instance.subTree = createVNode(Comment);
                        processCommentNode(null, placeholder, container, anchor)
                    }
                } else setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, namespace, optimized)
            }, updateComponent = (n1, n2, optimized) => {
                const instance = n2.component = n1.component;
                if (function (prevVNode, nextVNode, optimized) {
                    const {props: prevProps, children: prevChildren, component: component} = prevVNode, {
                        props: nextProps,
                        children: nextChildren,
                        patchFlag: patchFlag
                    } = nextVNode, emits = component.emitsOptions;
                    if (nextVNode.dirs || nextVNode.transition) return !0;
                    if (!(optimized && patchFlag >= 0)) return !(!prevChildren && !nextChildren || nextChildren && nextChildren.$stable) || prevProps !== nextProps && (prevProps ? !nextProps || hasPropsChanged(prevProps, nextProps, emits) : !!nextProps);
                    if (1024 & patchFlag) return !0;
                    if (16 & patchFlag) return prevProps ? hasPropsChanged(prevProps, nextProps, emits) : !!nextProps;
                    if (8 & patchFlag) {
                        const dynamicProps = nextVNode.dynamicProps;
                        for (let i = 0; i < dynamicProps.length; i++) {
                            const key = dynamicProps[i];
                            if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) return !0
                        }
                    }
                    return !1
                }(n1, n2, optimized)) {
                    if (instance.asyncDep && !instance.asyncResolved) return void updateComponentPreRender(instance, n2, optimized);
                    instance.next = n2, instance.update()
                } else n2.el = n1.el, instance.vnode = n2
            }, setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
                const componentUpdateFn = () => {
                    if (instance.isMounted) {
                        let {next: next, bu: bu, u: u, parent: parent, vnode: vnode} = instance;
                        {
                            const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
                            if (nonHydratedAsyncRoot) return next && (next.el = vnode.el, updateComponentPreRender(instance, next, optimized)), void nonHydratedAsyncRoot.asyncDep.then((() => {
                                instance.isUnmounted || componentUpdateFn()
                            }))
                        }
                        let vnodeHook, originNext = next;
                        toggleRecurse(instance, !1), next ? (next.el = vnode.el, updateComponentPreRender(instance, next, optimized)) : next = vnode, bu && invokeArrayFns(bu), (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) && invokeVNodeHook(vnodeHook, parent, next, vnode), toggleRecurse(instance, !0);
                        const nextTree = renderComponentRoot(instance), prevTree = instance.subTree;
                        instance.subTree = nextTree, patch(prevTree, nextTree, hostParentNode(prevTree.el), getNextHostNode(prevTree), instance, parentSuspense, namespace), next.el = nextTree.el, null === originNext && function ({
                                                                                                                                                                                                                                         vnode: vnode,
                                                                                                                                                                                                                                         parent: parent
                                                                                                                                                                                                                                     }, el) {
                            for (; parent;) {
                                const root = parent.subTree;
                                if (root.suspense && root.suspense.activeBranch === vnode && (root.el = vnode.el), root !== vnode) break;
                                (vnode = parent.vnode).el = el, parent = parent.parent
                            }
                        }(instance, nextTree.el), u && queuePostRenderEffect(u, parentSuspense), (vnodeHook = next.props && next.props.onVnodeUpdated) && queuePostRenderEffect((() => invokeVNodeHook(vnodeHook, parent, next, vnode)), parentSuspense)
                    } else {
                        let vnodeHook;
                        const {el: el, props: props} = initialVNode, {
                            bm: bm,
                            m: m,
                            parent: parent,
                            root: root,
                            type: type
                        } = instance, isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
                        if (toggleRecurse(instance, !1), bm && invokeArrayFns(bm), !isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount) && invokeVNodeHook(vnodeHook, parent, initialVNode), toggleRecurse(instance, !0), el && hydrateNode) {
                            const hydrateSubTree = () => {
                                instance.subTree = renderComponentRoot(instance), hydrateNode(el, instance.subTree, instance, parentSuspense, null)
                            };
                            isAsyncWrapperVNode && type.__asyncHydrate ? type.__asyncHydrate(el, instance, hydrateSubTree) : hydrateSubTree()
                        } else {
                            root.ce && root.ce._injectChildStyle(type);
                            const subTree = instance.subTree = renderComponentRoot(instance);
                            patch(null, subTree, container, anchor, instance, parentSuspense, namespace), initialVNode.el = subTree.el
                        }
                        if (m && queuePostRenderEffect(m, parentSuspense), !isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
                            const scopedInitialVNode = initialVNode;
                            queuePostRenderEffect((() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode)), parentSuspense)
                        }
                        (256 & initialVNode.shapeFlag || parent && isAsyncWrapper(parent.vnode) && 256 & parent.vnode.shapeFlag) && instance.a && queuePostRenderEffect(instance.a, parentSuspense), instance.isMounted = !0, initialVNode = container = anchor = null
                    }
                };
                instance.scope.on();
                const effect2 = instance.effect = new ReactiveEffect(componentUpdateFn);
                instance.scope.off();
                const update = instance.update = effect2.run.bind(effect2),
                    job = instance.job = effect2.runIfDirty.bind(effect2);
                job.i = instance, job.id = instance.uid, effect2.scheduler = () => queueJob(job), toggleRecurse(instance, !0), update()
            }, updateComponentPreRender = (instance, nextVNode, optimized) => {
                nextVNode.component = instance;
                const prevProps = instance.vnode.props;
                instance.vnode = nextVNode, instance.next = null, function (instance, rawProps, rawPrevProps, optimized) {
                    const {props: props, attrs: attrs, vnode: {patchFlag: patchFlag}} = instance,
                        rawCurrentProps = toRaw(props), [options] = instance.propsOptions;
                    let hasAttrsChanged = !1;
                    if (!(optimized || patchFlag > 0) || 16 & patchFlag) {
                        let kebabKey;
                        setFullProps(instance, rawProps, props, attrs) && (hasAttrsChanged = !0);
                        for (const key in rawCurrentProps) rawProps && (hasOwn(rawProps, key) || (kebabKey = hyphenate(key)) !== key && hasOwn(rawProps, kebabKey)) || (options ? !rawPrevProps || void 0 === rawPrevProps[key] && void 0 === rawPrevProps[kebabKey] || (props[key] = resolvePropValue(options, rawCurrentProps, key, void 0, instance, !0)) : delete props[key]);
                        if (attrs !== rawCurrentProps) for (const key in attrs) rawProps && hasOwn(rawProps, key) || (delete attrs[key], hasAttrsChanged = !0)
                    } else if (8 & patchFlag) {
                        const propsToUpdate = instance.vnode.dynamicProps;
                        for (let i = 0; i < propsToUpdate.length; i++) {
                            let key = propsToUpdate[i];
                            if (isEmitListener(instance.emitsOptions, key)) continue;
                            const value = rawProps[key];
                            if (options) if (hasOwn(attrs, key)) value !== attrs[key] && (attrs[key] = value, hasAttrsChanged = !0); else {
                                const camelizedKey = camelize(key);
                                props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, !1)
                            } else value !== attrs[key] && (attrs[key] = value, hasAttrsChanged = !0)
                        }
                    }
                    hasAttrsChanged && trigger(instance.attrs, "set", "")
                }(instance, nextVNode.props, prevProps, optimized), ((instance, children, optimized) => {
                    const {vnode: vnode, slots: slots} = instance;
                    let needDeletionCheck = !0, deletionComparisonTarget = EMPTY_OBJ;
                    if (32 & vnode.shapeFlag) {
                        const type = children._;
                        type ? optimized && 1 === type ? needDeletionCheck = !1 : assignSlots(slots, children, optimized) : (needDeletionCheck = !children.$stable, normalizeObjectSlots(children, slots)), deletionComparisonTarget = children
                    } else children && (normalizeVNodeSlots(instance, children), deletionComparisonTarget = {default: 1});
                    if (needDeletionCheck) for (const key in slots) isInternalKey(key) || null != deletionComparisonTarget[key] || delete slots[key]
                })(instance, nextVNode.children, optimized), pauseTracking(), flushPreFlushCbs(instance), resetTracking()
            },
            patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = !1) => {
                const c1 = n1 && n1.children, prevShapeFlag = n1 ? n1.shapeFlag : 0,
                    c2 = n2.children, {patchFlag: patchFlag, shapeFlag: shapeFlag} = n2;
                if (patchFlag > 0) {
                    if (128 & patchFlag) return void patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                    if (256 & patchFlag) return void patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized)
                }
                8 & shapeFlag ? (16 & prevShapeFlag && unmountChildren(c1, parentComponent, parentSuspense), c2 !== c1 && hostSetElementText(container, c2)) : 16 & prevShapeFlag ? 16 & shapeFlag ? patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) : unmountChildren(c1, parentComponent, parentSuspense, !0) : (8 & prevShapeFlag && hostSetElementText(container, ""), 16 & shapeFlag && mountChildren(c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized))
            },
            patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
                c2 = c2 || EMPTY_ARR;
                const oldLength = (c1 = c1 || EMPTY_ARR).length, newLength = c2.length,
                    commonLength = Math.min(oldLength, newLength);
                let i;
                for (i = 0; i < commonLength; i++) {
                    const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
                    patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized)
                }
                oldLength > newLength ? unmountChildren(c1, parentComponent, parentSuspense, !0, !1, commonLength) : mountChildren(c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, commonLength)
            },
            patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
                let i = 0;
                const l2 = c2.length;
                let e1 = c1.length - 1, e2 = l2 - 1;
                for (; i <= e1 && i <= e2;) {
                    const n1 = c1[i], n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
                    if (!isSameVNodeType(n1, n2)) break;
                    patch(n1, n2, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized), i++
                }
                for (; i <= e1 && i <= e2;) {
                    const n1 = c1[e1], n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
                    if (!isSameVNodeType(n1, n2)) break;
                    patch(n1, n2, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized), e1--, e2--
                }
                if (i > e1) {
                    if (i <= e2) {
                        const nextPos = e2 + 1, anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
                        for (; i <= e2;) patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized), i++
                    }
                } else if (i > e2) for (; i <= e1;) unmount(c1[i], parentComponent, parentSuspense, !0), i++; else {
                    const s1 = i, s2 = i, keyToNewIndexMap = new Map;
                    for (i = s2; i <= e2; i++) {
                        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
                        null != nextChild.key && keyToNewIndexMap.set(nextChild.key, i)
                    }
                    let j, patched = 0;
                    const toBePatched = e2 - s2 + 1;
                    let moved = !1, maxNewIndexSoFar = 0;
                    const newIndexToOldIndexMap = new Array(toBePatched);
                    for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;
                    for (i = s1; i <= e1; i++) {
                        const prevChild = c1[i];
                        if (patched >= toBePatched) {
                            unmount(prevChild, parentComponent, parentSuspense, !0);
                            continue
                        }
                        let newIndex;
                        if (null != prevChild.key) newIndex = keyToNewIndexMap.get(prevChild.key); else for (j = s2; j <= e2; j++) if (0 === newIndexToOldIndexMap[j - s2] && isSameVNodeType(prevChild, c2[j])) {
                            newIndex = j;
                            break
                        }
                        void 0 === newIndex ? unmount(prevChild, parentComponent, parentSuspense, !0) : (newIndexToOldIndexMap[newIndex - s2] = i + 1, newIndex >= maxNewIndexSoFar ? maxNewIndexSoFar = newIndex : moved = !0, patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized), patched++)
                    }
                    const increasingNewIndexSequence = moved ? function (arr) {
                        const p2 = arr.slice(), result = [0];
                        let i, j, u, v, c;
                        const len = arr.length;
                        for (i = 0; i < len; i++) {
                            const arrI = arr[i];
                            if (0 !== arrI) {
                                if (j = result[result.length - 1], arr[j] < arrI) {
                                    p2[i] = j, result.push(i);
                                    continue
                                }
                                for (u = 0, v = result.length - 1; u < v;) c = u + v >> 1, arr[result[c]] < arrI ? u = c + 1 : v = c;
                                arrI < arr[result[u]] && (u > 0 && (p2[i] = result[u - 1]), result[u] = i)
                            }
                        }
                        u = result.length, v = result[u - 1];
                        for (; u-- > 0;) result[u] = v, v = p2[v];
                        return result
                    }(newIndexToOldIndexMap) : EMPTY_ARR;
                    for (j = increasingNewIndexSequence.length - 1, i = toBePatched - 1; i >= 0; i--) {
                        const nextIndex = s2 + i, nextChild = c2[nextIndex],
                            anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
                        0 === newIndexToOldIndexMap[i] ? patch(null, nextChild, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) : moved && (j < 0 || i !== increasingNewIndexSequence[j] ? move(nextChild, container, anchor, 2) : j--)
                    }
                }
            }, move = (vnode, container, anchor, moveType, parentSuspense = null) => {
                const {el: el, type: type, transition: transition, children: children, shapeFlag: shapeFlag} = vnode;
                if (6 & shapeFlag) return void move(vnode.component.subTree, container, anchor, moveType);
                if (128 & shapeFlag) return void vnode.suspense.move(container, anchor, moveType);
                if (64 & shapeFlag) return void type.move(vnode, container, anchor, internals);
                if (type === Fragment) {
                    hostInsert(el, container, anchor);
                    for (let i = 0; i < children.length; i++) move(children[i], container, anchor, moveType);
                    return void hostInsert(vnode.anchor, container, anchor)
                }
                if (type === Static) return void moveStaticNode(vnode, container, anchor);
                if (2 !== moveType && 1 & shapeFlag && transition) if (0 === moveType) transition.beforeEnter(el), hostInsert(el, container, anchor), queuePostRenderEffect((() => transition.enter(el)), parentSuspense); else {
                    const {leave: leave, delayLeave: delayLeave, afterLeave: afterLeave} = transition,
                        remove22 = () => hostInsert(el, container, anchor), performLeave = () => {
                            leave(el, (() => {
                                remove22(), afterLeave && afterLeave()
                            }))
                        };
                    delayLeave ? delayLeave(el, remove22, performLeave) : performLeave()
                } else hostInsert(el, container, anchor)
            }, unmount = (vnode, parentComponent, parentSuspense, doRemove = !1, optimized = !1) => {
                const {
                    type: type,
                    props: props,
                    ref: ref3,
                    children: children,
                    dynamicChildren: dynamicChildren,
                    shapeFlag: shapeFlag,
                    patchFlag: patchFlag,
                    dirs: dirs,
                    cacheIndex: cacheIndex
                } = vnode;
                if (-2 === patchFlag && (optimized = !1), null != ref3 && setRef(ref3, null, parentSuspense, vnode, !0), null != cacheIndex && (parentComponent.renderCache[cacheIndex] = void 0), 256 & shapeFlag) return void parentComponent.ctx.deactivate(vnode);
                const shouldInvokeDirs = 1 & shapeFlag && dirs, shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
                let vnodeHook;
                if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount) && invokeVNodeHook(vnodeHook, parentComponent, vnode), 6 & shapeFlag) unmountComponent(vnode.component, parentSuspense, doRemove); else {
                    if (128 & shapeFlag) return void vnode.suspense.unmount(parentSuspense, doRemove);
                    shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount"), 64 & shapeFlag ? vnode.type.remove(vnode, parentComponent, parentSuspense, internals, doRemove) : dynamicChildren && !dynamicChildren.hasOnce && (type !== Fragment || patchFlag > 0 && 64 & patchFlag) ? unmountChildren(dynamicChildren, parentComponent, parentSuspense, !1, !0) : (type === Fragment && 384 & patchFlag || !optimized && 16 & shapeFlag) && unmountChildren(children, parentComponent, parentSuspense), doRemove && remove2(vnode)
                }
                (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) && queuePostRenderEffect((() => {
                    vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode), shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted")
                }), parentSuspense)
            }, remove2 = vnode => {
                const {type: type, el: el, anchor: anchor, transition: transition} = vnode;
                if (type === Fragment) return void removeFragment(el, anchor);
                if (type === Static) return void removeStaticNode(vnode);
                const performRemove = () => {
                    hostRemove(el), transition && !transition.persisted && transition.afterLeave && transition.afterLeave()
                };
                if (1 & vnode.shapeFlag && transition && !transition.persisted) {
                    const {leave: leave, delayLeave: delayLeave} = transition,
                        performLeave = () => leave(el, performRemove);
                    delayLeave ? delayLeave(vnode.el, performRemove, performLeave) : performLeave()
                } else performRemove()
            }, removeFragment = (cur, end) => {
                let next;
                for (; cur !== end;) next = hostNextSibling(cur), hostRemove(cur), cur = next;
                hostRemove(end)
            }, unmountComponent = (instance, parentSuspense, doRemove) => {
                const {bum: bum, scope: scope, job: job, subTree: subTree, um: um, m: m, a: a} = instance;
                invalidateMount(m), invalidateMount(a), bum && invokeArrayFns(bum), scope.stop(), job && (job.flags |= 8, unmount(subTree, instance, parentSuspense, doRemove)), um && queuePostRenderEffect(um, parentSuspense), queuePostRenderEffect((() => {
                    instance.isUnmounted = !0
                }), parentSuspense), parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId && (parentSuspense.deps--, 0 === parentSuspense.deps && parentSuspense.resolve())
            }, unmountChildren = (children, parentComponent, parentSuspense, doRemove = !1, optimized = !1, start = 0) => {
                for (let i = start; i < children.length; i++) unmount(children[i], parentComponent, parentSuspense, doRemove, optimized)
            }, getNextHostNode = vnode => {
                if (6 & vnode.shapeFlag) return getNextHostNode(vnode.component.subTree);
                if (128 & vnode.shapeFlag) return vnode.suspense.next();
                const el = hostNextSibling(vnode.anchor || vnode.el), teleportEnd = el && el[TeleportEndKey];
                return teleportEnd ? hostNextSibling(teleportEnd) : el
            };
        let isFlushing = !1;
        const render = (vnode, container, namespace) => {
            null == vnode ? container._vnode && unmount(container._vnode, null, null, !0) : patch(container._vnode || null, vnode, container, null, null, null, namespace), container._vnode = vnode, isFlushing || (isFlushing = !0, flushPreFlushCbs(), flushPostFlushCbs(), isFlushing = !1)
        }, internals = {
            p: patch,
            um: unmount,
            m: move,
            r: remove2,
            mt: mountComponent,
            mc: mountChildren,
            pc: patchChildren,
            pbc: patchBlockChildren,
            n: getNextHostNode,
            o: options
        };
        let hydrate, hydrateNode;
        return {render: render, hydrate: hydrate, createApp: createAppAPI(render, hydrate)}
    }(options)
}

function resolveChildrenNamespace({type: type, props: props}, currentNamespace) {
    return "svg" === currentNamespace && "foreignObject" === type || "mathml" === currentNamespace && "annotation-xml" === type && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace
}

function toggleRecurse({effect: effect2, job: job}, allowed) {
    allowed ? (effect2.flags |= 32, job.flags |= 4) : (effect2.flags &= -33, job.flags &= -5)
}

function traverseStaticChildren(n1, n2, shallow = !1) {
    const ch1 = n1.children, ch2 = n2.children;
    if (isArray(ch1) && isArray(ch2)) for (let i = 0; i < ch1.length; i++) {
        const c1 = ch1[i];
        let c2 = ch2[i];
        1 & c2.shapeFlag && !c2.dynamicChildren && ((c2.patchFlag <= 0 || 32 === c2.patchFlag) && (c2 = ch2[i] = cloneIfMounted(ch2[i]), c2.el = c1.el), shallow || -2 === c2.patchFlag || traverseStaticChildren(c1, c2)), c2.type === Text && (c2.el = c1.el)
    }
}

function locateNonHydratedAsyncRoot(instance) {
    const subComponent = instance.subTree.component;
    if (subComponent) return subComponent.asyncDep && !subComponent.asyncResolved ? subComponent : locateNonHydratedAsyncRoot(subComponent)
}

function invalidateMount(hooks) {
    if (hooks) for (let i = 0; i < hooks.length; i++) hooks[i].flags |= 8
}

const ssrContextKey = Symbol.for("v-scx"), useSSRContext = () => inject(ssrContextKey);

function watch(source, cb, options) {
    return doWatch(source, cb, options)
}

function doWatch(source, cb, options = EMPTY_OBJ) {
    const {immediate: immediate, deep: deep, flush: flush, once: once} = options,
        baseWatchOptions = extend({}, options), runsImmediately = cb && immediate || !cb && "post" !== flush;
    let ssrCleanup;
    if (isInSSRComponentSetup) if ("sync" === flush) {
        const ctx = useSSRContext();
        ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = [])
    } else if (!runsImmediately) {
        const watchStopHandle = () => {
        };
        return watchStopHandle.stop = NOOP, watchStopHandle.resume = NOOP, watchStopHandle.pause = NOOP, watchStopHandle
    }
    const instance = currentInstance;
    baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance, type, args);
    let isPre = !1;
    "post" === flush ? baseWatchOptions.scheduler = job => {
        queuePostRenderEffect(job, instance && instance.suspense)
    } : "sync" !== flush && (isPre = !0, baseWatchOptions.scheduler = (job, isFirstRun) => {
        isFirstRun ? job() : queueJob(job)
    }), baseWatchOptions.augmentJob = job => {
        cb && (job.flags |= 4), isPre && (job.flags |= 2, instance && (job.id = instance.uid, job.i = instance))
    };
    const watchHandle = watch$1(source, cb, baseWatchOptions);
    return isInSSRComponentSetup && (ssrCleanup ? ssrCleanup.push(watchHandle) : runsImmediately && watchHandle()), watchHandle
}

function instanceWatch(source, value, options) {
    const publicThis = this.proxy,
        getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
    let cb;
    isFunction(value) ? cb = value : (cb = value.handler, options = value);
    const reset = setCurrentInstance(this), res = doWatch(getter, cb.bind(publicThis), options);
    return reset(), res
}

function createPathGetter(ctx, path) {
    const segments = path.split(".");
    return () => {
        let cur = ctx;
        for (let i = 0; i < segments.length && cur; i++) cur = cur[segments[i]];
        return cur
    }
}

const getModelModifiers = (props, modelName) => "modelValue" === modelName || "model-value" === modelName ? props.modelModifiers : props[`${modelName}Modifiers`] || props[`${camelize(modelName)}Modifiers`] || props[`${hyphenate(modelName)}Modifiers`];

function emit(instance, event, ...rawArgs) {
    if (instance.isUnmounted) return;
    const props = instance.vnode.props || EMPTY_OBJ;
    let args = rawArgs;
    const isModelListener2 = event.startsWith("update:"),
        modifiers = isModelListener2 && getModelModifiers(props, event.slice(7));
    let handlerName;
    modifiers && (modifiers.trim && (args = rawArgs.map((a => isString(a) ? a.trim() : a))), modifiers.number && (args = rawArgs.map(looseToNumber)));
    let handler = props[handlerName = toHandlerKey(event)] || props[handlerName = toHandlerKey(camelize(event))];
    !handler && isModelListener2 && (handler = props[handlerName = toHandlerKey(hyphenate(event))]), handler && callWithAsyncErrorHandling(handler, instance, 6, args);
    const onceHandler = props[handlerName + "Once"];
    if (onceHandler) {
        if (instance.emitted) {
            if (instance.emitted[handlerName]) return
        } else instance.emitted = {};
        instance.emitted[handlerName] = !0, callWithAsyncErrorHandling(onceHandler, instance, 6, args)
    }
}

function normalizeEmitsOptions(comp, appContext, asMixin = !1) {
    const cache = appContext.emitsCache, cached = cache.get(comp);
    if (void 0 !== cached) return cached;
    const raw = comp.emits;
    let normalized = {}, hasExtends = !1;
    if (!isFunction(comp)) {
        const extendEmits = raw2 => {
            const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, !0);
            normalizedFromExtend && (hasExtends = !0, extend(normalized, normalizedFromExtend))
        };
        !asMixin && appContext.mixins.length && appContext.mixins.forEach(extendEmits), comp.extends && extendEmits(comp.extends), comp.mixins && comp.mixins.forEach(extendEmits)
    }
    return raw || hasExtends ? (isArray(raw) ? raw.forEach((key => normalized[key] = null)) : extend(normalized, raw), isObject(comp) && cache.set(comp, normalized), normalized) : (isObject(comp) && cache.set(comp, null), null)
}

function isEmitListener(options, key) {
    return !(!options || !isOn(key)) && (key = key.slice(2).replace(/Once$/, ""), hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key))
}

function renderComponentRoot(instance) {
    const {
        type: Component,
        vnode: vnode,
        proxy: proxy,
        withProxy: withProxy,
        propsOptions: [propsOptions],
        slots: slots,
        attrs: attrs,
        emit: emit2,
        render: render,
        renderCache: renderCache,
        props: props,
        data: data,
        setupState: setupState,
        ctx: ctx,
        inheritAttrs: inheritAttrs
    } = instance, prev = setCurrentRenderingInstance(instance);
    let result, fallthroughAttrs;
    try {
        if (4 & vnode.shapeFlag) {
            const proxyToUse = withProxy || proxy, thisProxy = proxyToUse;
            result = normalizeVNode(render.call(thisProxy, proxyToUse, renderCache, props, setupState, data, ctx)), fallthroughAttrs = attrs
        } else {
            const render2 = Component;
            0, result = normalizeVNode(render2.length > 1 ? render2(props, {
                attrs: attrs,
                slots: slots,
                emit: emit2
            }) : render2(props, null)), fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs)
        }
    } catch (err) {
        blockStack.length = 0, handleError(err, instance, 1), result = createVNode(Comment)
    }
    let root = result;
    if (fallthroughAttrs && !1 !== inheritAttrs) {
        const keys = Object.keys(fallthroughAttrs), {shapeFlag: shapeFlag} = root;
        keys.length && 7 & shapeFlag && (propsOptions && keys.some(isModelListener) && (fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions)), root = cloneVNode(root, fallthroughAttrs, !1, !0))
    }
    return vnode.dirs && (root = cloneVNode(root, null, !1, !0), root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs), vnode.transition && setTransitionHooks(root, vnode.transition), result = root, setCurrentRenderingInstance(prev), result
}

const getFunctionalFallthrough = attrs => {
    let res;
    for (const key in attrs) ("class" === key || "style" === key || isOn(key)) && ((res || (res = {}))[key] = attrs[key]);
    return res
}, filterModelListeners = (attrs, props) => {
    const res = {};
    for (const key in attrs) isModelListener(key) && key.slice(9) in props || (res[key] = attrs[key]);
    return res
};

function hasPropsChanged(prevProps, nextProps, emitsOptions) {
    const nextKeys = Object.keys(nextProps);
    if (nextKeys.length !== Object.keys(prevProps).length) return !0;
    for (let i = 0; i < nextKeys.length; i++) {
        const key = nextKeys[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) return !0
    }
    return !1
}

const isSuspense = type => type.__isSuspense;
const Fragment = Symbol.for("v-fgt"), Text = Symbol.for("v-txt"), Comment = Symbol.for("v-cmt"),
    Static = Symbol.for("v-stc"), blockStack = [];
let currentBlock = null;
let isBlockTreeEnabled = 1;

function setBlockTracking(value) {
    isBlockTreeEnabled += value, value < 0 && currentBlock && (currentBlock.hasOnce = !0)
}

function setupBlock(vnode) {
    return vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null, blockStack.pop(), currentBlock = blockStack[blockStack.length - 1] || null, isBlockTreeEnabled > 0 && currentBlock && currentBlock.push(vnode), vnode
}

console.log("K");

function isVNode(value) {
    return !!value && !0 === value.__v_isVNode
}

function isSameVNodeType(n1, n2) {
    return n1.type === n2.type && n1.key === n2.key
}

const normalizeKey = ({key: key}) => null != key ? key : null, normalizeRef = ({
                                                                                   ref: ref3,
                                                                                   ref_key: ref_key,
                                                                                   ref_for: ref_for
                                                                               }) => ("number" == typeof ref3 && (ref3 = "" + ref3), null != ref3 ? isString(ref3) || isRef(ref3) || isFunction(ref3) ? {
    i: currentRenderingInstance,
    r: ref3,
    k: ref_key,
    f: !!ref_for
} : ref3 : null);

function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = (type === Fragment ? 0 : 1), isBlockNode = !1, needFullChildrenNormalization = !1) {
    const vnode = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: type,
        props: props,
        key: props && normalizeKey(props),
        ref: props && normalizeRef(props),
        scopeId: currentScopeId,
        slotScopeIds: null,
        children: children,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetStart: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: shapeFlag,
        patchFlag: patchFlag,
        dynamicProps: dynamicProps,
        dynamicChildren: null,
        appContext: null,
        ctx: currentRenderingInstance
    };
    return needFullChildrenNormalization ? (normalizeChildren(vnode, children), 128 & shapeFlag && type.normalize(vnode)) : children && (vnode.shapeFlag |= isString(children) ? 8 : 16), isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (vnode.patchFlag > 0 || 6 & shapeFlag) && 32 !== vnode.patchFlag && currentBlock.push(vnode), vnode
}

const createVNode = function (type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = !1) {
    type && type !== NULL_DYNAMIC_COMPONENT || (type = Comment);
    if (isVNode(type)) {
        const cloned = cloneVNode(type, props, !0);
        return children && normalizeChildren(cloned, children), isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (6 & cloned.shapeFlag ? currentBlock[currentBlock.indexOf(type)] = cloned : currentBlock.push(cloned)), cloned.patchFlag = -2, cloned
    }
    value = type, isFunction(value) && "__vccOpts" in value && (type = type.__vccOpts);
    var value;
    if (props) {
        props = function (props) {
            return props ? isProxy(props) || isInternalObject(props) ? extend({}, props) : props : null
        }(props);
        let {class: klass, style: style} = props;
        klass && !isString(klass) && (props.class = normalizeClass(klass)), isObject(style) && (isProxy(style) && !isArray(style) && (style = extend({}, style)), props.style = normalizeStyle(style))
    }
    const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : (type => type.__isTeleport)(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
    return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, !0)
};

function cloneVNode(vnode, extraProps, mergeRef = !1, cloneTransition = !1) {
    const {props: props, ref: ref3, patchFlag: patchFlag, children: children, transition: transition} = vnode,
        mergedProps = extraProps ? function (...args) {
            const ret = {};
            for (let i = 0; i < args.length; i++) {
                const toMerge = args[i];
                for (const key in toMerge) if ("class" === key) ret.class !== toMerge.class && (ret.class = normalizeClass([ret.class, toMerge.class])); else if ("style" === key) ret.style = normalizeStyle([ret.style, toMerge.style]); else if (isOn(key)) {
                    const existing = ret[key], incoming = toMerge[key];
                    !incoming || existing === incoming || isArray(existing) && existing.includes(incoming) || (ret[key] = existing ? [].concat(existing, incoming) : incoming)
                } else "" !== key && (ret[key] = toMerge[key])
            }
            return ret
        }(props || {}, extraProps) : props, cloned = {
            __v_isVNode: !0,
            __v_skip: !0,
            type: vnode.type,
            props: mergedProps,
            key: mergedProps && normalizeKey(mergedProps),
            ref: extraProps && extraProps.ref ? mergeRef && ref3 ? isArray(ref3) ? ref3.concat(normalizeRef(extraProps)) : [ref3, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref3,
            scopeId: vnode.scopeId,
            slotScopeIds: vnode.slotScopeIds,
            children: children,
            target: vnode.target,
            targetStart: vnode.targetStart,
            targetAnchor: vnode.targetAnchor,
            staticCount: vnode.staticCount,
            shapeFlag: vnode.shapeFlag,
            patchFlag: extraProps && vnode.type !== Fragment ? -1 === patchFlag ? 16 : 16 | patchFlag : patchFlag,
            dynamicProps: vnode.dynamicProps,
            dynamicChildren: vnode.dynamicChildren,
            appContext: vnode.appContext,
            dirs: vnode.dirs,
            transition: transition,
            component: vnode.component,
            suspense: vnode.suspense,
            ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
            ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
            el: vnode.el,
            anchor: vnode.anchor,
            ctx: vnode.ctx,
            ce: vnode.ce
        };
    return transition && cloneTransition && setTransitionHooks(cloned, transition.clone(cloned)), cloned
}

function createTextVNode(text = " ", flag = 0) {
    return createVNode(Text, null, text, flag)
}

function normalizeVNode(child) {
    return null == child || "boolean" == typeof child ? createVNode(Comment) : isArray(child) ? createVNode(Fragment, null, child.slice()) : isVNode(child) ? cloneIfMounted(child) : createVNode(Text, null, String(child))
}

function cloneIfMounted(child) {
    return null === child.el && -1 !== child.patchFlag || child.memo ? child : cloneVNode(child)
}

function normalizeChildren(vnode, children) {
    let type = 0;
    const {shapeFlag: shapeFlag} = vnode;
    if (null == children) children = null; else if (isArray(children)) type = 16; else if ("object" == typeof children) {
        if (65 & shapeFlag) {
            const slot = children.default;
            return void (slot && (slot._c && (slot._d = !1), normalizeChildren(vnode, slot()), slot._c && (slot._d = !0)))
        }
        {
            type = 32;
            const slotFlag = children._;
            slotFlag || isInternalObject(children) ? 3 === slotFlag && currentRenderingInstance && (1 === currentRenderingInstance.slots._ ? children._ = 1 : (children._ = 2, vnode.patchFlag |= 1024)) : children._ctx = currentRenderingInstance
        }
    } else isFunction(children) ? (children = {
        default: children,
        _ctx: currentRenderingInstance
    }, type = 32) : (children = String(children), 64 & shapeFlag ? (type = 16, children = [createTextVNode(children)]) : type = 8);
    vnode.children = children, vnode.shapeFlag |= type
}

function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
    callWithAsyncErrorHandling(hook, instance, 7, [vnode, prevVNode])
}

const emptyAppContext = createAppContext();
let uid = 0;
let internalSetCurrentInstance, setInSSRSetupState, currentInstance = null;
{
    const g = getGlobalThis(), registerGlobalSetter = (key, setter) => {
        let setters;
        return (setters = g[key]) || (setters = g[key] = []), setters.push(setter), v => {
            setters.length > 1 ? setters.forEach((set => set(v))) : setters[0](v)
        }
    };
    internalSetCurrentInstance = registerGlobalSetter("__VUE_INSTANCE_SETTERS__", (v => currentInstance = v)), setInSSRSetupState = registerGlobalSetter("__VUE_SSR_SETTERS__", (v => isInSSRComponentSetup = v))
}
const setCurrentInstance = instance => {
    const prev = currentInstance;
    return internalSetCurrentInstance(instance), instance.scope.on(), () => {
        instance.scope.off(), internalSetCurrentInstance(prev)
    }
}, unsetCurrentInstance = () => {
    currentInstance && currentInstance.scope.off(), internalSetCurrentInstance(null)
};

function isStatefulComponent(instance) {
    return 4 & instance.vnode.shapeFlag
}

let compile, isInSSRComponentSetup = !1;

function handleSetupResult(instance, setupResult, isSSR) {
    isFunction(setupResult) ? instance.type.__ssrInlineRender ? instance.ssrRender = setupResult : instance.render = setupResult : isObject(setupResult) && (instance.setupState = proxyRefs(setupResult)), finishComponentSetup(instance, isSSR)
}

function finishComponentSetup(instance, isSSR, skipOptions) {
    const Component = instance.type;
    if (!instance.render) {
        if (!isSSR && compile && !Component.render) {
            const template = Component.template || resolveMergedOptions(instance).template;
            if (template) {
                const {
                    isCustomElement: isCustomElement,
                    compilerOptions: compilerOptions
                } = instance.appContext.config, {
                    delimiters: delimiters,
                    compilerOptions: componentCompilerOptions
                } = Component, finalCompilerOptions = extend(extend({
                    isCustomElement: isCustomElement,
                    delimiters: delimiters
                }, compilerOptions), componentCompilerOptions);
                Component.render = compile(template, finalCompilerOptions)
            }
        }
        instance.render = Component.render || NOOP
    }
    {
        const reset = setCurrentInstance(instance);
        pauseTracking();
        try {
            applyOptions(instance)
        } finally {
            resetTracking(), reset()
        }
    }
}

const attrsProxyHandlers = {get: (target, key) => (track(target, 0, ""), target[key])};

function getComponentPublicInstance(instance) {
    return instance.exposed ? instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
        get: (target, key) => key in target ? target[key] : key in publicPropertiesMap ? publicPropertiesMap[key](instance) : void 0,
        has: (target, key) => key in target || key in publicPropertiesMap
    })) : instance.proxy
}

const computed = (getterOrOptions, debugOptions) => {
    const c = function (getterOrOptions, debugOptions, isSSR = !1) {
        let getter, setter;
        return isFunction(getterOrOptions) ? getter = getterOrOptions : (getter = getterOrOptions.get, setter = getterOrOptions.set), new ComputedRefImpl(getter, setter, isSSR)
    }(getterOrOptions, 0, isInSSRComponentSetup);
    return c
}, version = "3.5.12";
let policy;
const tt = "undefined" != typeof window && window.trustedTypes;
if (tt) try {
    policy = tt.createPolicy("vue", {createHTML: val => val})
} catch (e) {
}
const unsafeToTrustedHTML = policy ? val => policy.createHTML(val) : val => val,
    doc = "undefined" != typeof document ? document : null, templateContainer = doc && doc.createElement("template"),
    nodeOps = {
        insert: (child, parent, anchor) => {
            parent.insertBefore(child, anchor || null)
        },
        remove: child => {
            const parent = child.parentNode;
            parent && parent.removeChild(child)
        },
        createElement: (tag, namespace, is, props) => {
            const el = "svg" === namespace ? doc.createElementNS("http://www.w3.org/2000/svg", tag) : "mathml" === namespace ? doc.createElementNS("http://www.w3.org/1998/Math/MathML", tag) : is ? doc.createElement(tag, {is: is}) : doc.createElement(tag);
            return "select" === tag && props && null != props.multiple && el.setAttribute("multiple", props.multiple), el
        },
        createText: text => doc.createTextNode(text),
        createComment: text => doc.createComment(text),
        setText: (node, text) => {
            node.nodeValue = text
        },
        setElementText: (el, text) => {
            el.textContent = text
        },
        parentNode: node => node.parentNode,
        nextSibling: node => node.nextSibling,
        querySelector: selector => doc.querySelector(selector),
        setScopeId(el, id) {
            el.setAttribute(id, "")
        },
        insertStaticContent(content, parent, anchor, namespace, start, end) {
            const before = anchor ? anchor.previousSibling : parent.lastChild;
            if (start && (start === end || start.nextSibling)) for (; parent.insertBefore(start.cloneNode(!0), anchor), start !== end && (start = start.nextSibling);) ; else {
                templateContainer.innerHTML = unsafeToTrustedHTML("svg" === namespace ? `<svg>${content}</svg>` : "mathml" === namespace ? `<math>${content}</math>` : content);
                const template = templateContainer.content;
                if ("svg" === namespace || "mathml" === namespace) {
                    const wrapper = template.firstChild;
                    for (; wrapper.firstChild;) template.appendChild(wrapper.firstChild);
                    template.removeChild(wrapper)
                }
                parent.insertBefore(template, anchor)
            }
            return [before ? before.nextSibling : parent.firstChild, anchor ? anchor.previousSibling : parent.lastChild]
        }
    }, vtcKey = Symbol("_vtc");
const vShowOriginalDisplay = Symbol("_vod"), vShowHidden = Symbol("_vsh"), CSS_VAR_TEXT = Symbol(""),
    displayRE = /(^|;)\s*display\s*:/;
const importantRE = /\s*!important$/;

function setStyle(style, name, val) {
    if (isArray(val)) val.forEach((v => setStyle(style, name, v))); else if (null == val && (val = ""), name.startsWith("--")) style.setProperty(name, val); else {
        const prefixed = function (style, rawName) {
            const cached = prefixCache[rawName];
            if (cached) return cached;
            let name = camelize(rawName);
            if ("filter" !== name && name in style) return prefixCache[rawName] = name;
            name = capitalize(name);
            for (let i = 0; i < prefixes.length; i++) {
                const prefixed = prefixes[i] + name;
                if (prefixed in style) return prefixCache[rawName] = prefixed
            }
            return rawName
        }(style, name);
        importantRE.test(val) ? style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important") : style[prefixed] = val
    }
}

const prefixes = ["Webkit", "Moz", "ms"], prefixCache = {};
const xlinkNS = "http://www.w3.org/1999/xlink";

function patchAttr(el, key, value, isSVG, instance, isBoolean = isSpecialBooleanAttr(key)) {
    isSVG && key.startsWith("xlink:") ? null == value ? el.removeAttributeNS(xlinkNS, key.slice(6, key.length)) : el.setAttributeNS(xlinkNS, key, value) : null == value || isBoolean && !includeBooleanAttr(value) ? el.removeAttribute(key) : el.setAttribute(key, isBoolean ? "" : isSymbol(value) ? String(value) : value)
}

function patchDOMProp(el, key, value, parentComponent, attrName) {
    if ("innerHTML" === key || "textContent" === key) return void (null != value && (el[key] = "innerHTML" === key ? unsafeToTrustedHTML(value) : value));
    const tag = el.tagName;
    if ("value" === key && "PROGRESS" !== tag && !tag.includes("-")) {
        const oldValue = "OPTION" === tag ? el.getAttribute("value") || "" : el.value,
            newValue = null == value ? "checkbox" === el.type ? "on" : "" : String(value);
        return oldValue === newValue && "_value" in el || (el.value = newValue), null == value && el.removeAttribute(key), void (el._value = value)
    }
    let needRemove = !1;
    if ("" === value || null == value) {
        const type = typeof el[key];
        "boolean" === type ? value = includeBooleanAttr(value) : null == value && "string" === type ? (value = "", needRemove = !0) : "number" === type && (value = 0, needRemove = !0)
    }
    try {
        el[key] = value
    } catch (e) {
    }
    needRemove && el.removeAttribute(attrName || key)
}

function addEventListener(el, event, handler, options) {
    el.addEventListener(event, handler, options)
}

const veiKey = Symbol("_vei");

function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
    const invokers = el[veiKey] || (el[veiKey] = {}), existingInvoker = invokers[rawName];
    if (nextValue && existingInvoker) existingInvoker.value = nextValue; else {
        const [name, options] = function (name) {
            let options;
            if (optionsModifierRE.test(name)) {
                let m;
                for (options = {}; m = name.match(optionsModifierRE);) name = name.slice(0, name.length - m[0].length), options[m[0].toLowerCase()] = !0
            }
            const event = ":" === name[2] ? name.slice(3) : hyphenate(name.slice(2));
            return [event, options]
        }(rawName);
        if (nextValue) {
            const invoker = invokers[rawName] = function (initialValue, instance) {
                const invoker = e => {
                    if (e._vts) {
                        if (e._vts <= invoker.attached) return
                    } else e._vts = Date.now();
                    callWithAsyncErrorHandling(function (e, value) {
                        if (isArray(value)) {
                            const originalStop = e.stopImmediatePropagation;
                            return e.stopImmediatePropagation = () => {
                                originalStop.call(e), e._stopped = !0
                            }, value.map((fn => e2 => !e2._stopped && fn && fn(e2)))
                        }
                        return value
                    }(e, invoker.value), instance, 5, [e])
                };
                return invoker.value = initialValue, invoker.attached = getNow(), invoker
            }(nextValue, instance);
            addEventListener(el, name, invoker, options)
        } else existingInvoker && (!function (el, event, handler, options) {
            el.removeEventListener(event, handler, options)
        }(el, name, existingInvoker, options), invokers[rawName] = void 0)
    }
}

const optionsModifierRE = /(?:Once|Passive|Capture)$/;
let cachedNow = 0;
const p = Promise.resolve(), getNow = () => cachedNow || (p.then((() => cachedNow = 0)), cachedNow = Date.now());
const isNativeOn = key => 111 === key.charCodeAt(0) && 110 === key.charCodeAt(1) && key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
const getModelAssigner = vnode => {
    const fn = vnode.props["onUpdate:modelValue"] || !1;
    return isArray(fn) ? value => invokeArrayFns(fn, value) : fn
};

function onCompositionStart(e) {
    e.target.composing = !0
}

function onCompositionEnd(e) {
    const target = e.target;
    target.composing && (target.composing = !1, target.dispatchEvent(new Event("input")))
}

const assignKey = Symbol("_assign"), vModelText = {
    created(el, {modifiers: {lazy: lazy, trim: trim, number: number}}, vnode) {
        el[assignKey] = getModelAssigner(vnode);
        const castToNumber = number || vnode.props && "number" === vnode.props.type;
        addEventListener(el, lazy ? "change" : "input", (e => {
            if (e.target.composing) return;
            let domValue = el.value;
            trim && (domValue = domValue.trim()), castToNumber && (domValue = looseToNumber(domValue)), el[assignKey](domValue)
        })), trim && addEventListener(el, "change", (() => {
            el.value = el.value.trim()
        })), lazy || (addEventListener(el, "compositionstart", onCompositionStart), addEventListener(el, "compositionend", onCompositionEnd), addEventListener(el, "change", onCompositionEnd))
    },
    mounted(el, {value: value}) {
        el.value = null == value ? "" : value
    },
    beforeUpdate(el, {value: value, oldValue: oldValue, modifiers: {lazy: lazy, trim: trim, number: number}}, vnode) {
        if (el[assignKey] = getModelAssigner(vnode), el.composing) return;
        const newValue = null == value ? "" : value;
        if ((!number && "number" !== el.type || /^0\d/.test(el.value) ? el.value : looseToNumber(el.value)) !== newValue) {
            if (document.activeElement === el && "range" !== el.type) {
                if (lazy && value === oldValue) return;
                if (trim && el.value.trim() === newValue) return
            }
            el.value = newValue
        }
    }
}, rendererOptions = extend({
    patchProp: (el, key, prevValue, nextValue, namespace, parentComponent) => {
        const isSVG = "svg" === namespace;
        "class" === key ? function (el, value, isSVG) {
            const transitionClasses = el[vtcKey];
            transitionClasses && (value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ")), null == value ? el.removeAttribute("class") : isSVG ? el.setAttribute("class", value) : el.className = value
        }(el, nextValue, isSVG) : "style" === key ? function (el, prev, next) {
            const style = el.style, isCssString = isString(next);
            let hasControlledDisplay = !1;
            if (next && !isCssString) {
                if (prev) if (isString(prev)) for (const prevStyle of prev.split(";")) {
                    const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
                    null == next[key] && setStyle(style, key, "")
                } else for (const key in prev) null == next[key] && setStyle(style, key, "");
                for (const key in next) "display" === key && (hasControlledDisplay = !0), setStyle(style, key, next[key])
            } else if (isCssString) {
                if (prev !== next) {
                    const cssVarText = style[CSS_VAR_TEXT];
                    cssVarText && (next += ";" + cssVarText), style.cssText = next, hasControlledDisplay = displayRE.test(next)
                }
            } else prev && el.removeAttribute("style");
            vShowOriginalDisplay in el && (el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "", el[vShowHidden] && (style.display = "none"))
        }(el, prevValue, nextValue) : isOn(key) ? isModelListener(key) || patchEvent(el, key, 0, nextValue, parentComponent) : ("." === key[0] ? (key = key.slice(1), 1) : "^" === key[0] ? (key = key.slice(1), 0) : function (el, key, value, isSVG) {
            if (isSVG) return "innerHTML" === key || "textContent" === key || !!(key in el && isNativeOn(key) && isFunction(value));
            if ("spellcheck" === key || "draggable" === key || "translate" === key) return !1;
            if ("form" === key) return !1;
            if ("list" === key && "INPUT" === el.tagName) return !1;
            if ("type" === key && "TEXTAREA" === el.tagName) return !1;
            if ("width" === key || "height" === key) {
                const tag = el.tagName;
                if ("IMG" === tag || "VIDEO" === tag || "CANVAS" === tag || "SOURCE" === tag) return !1
            }
            if (isNativeOn(key) && isString(value)) return !1;
            return key in el
        }(el, key, nextValue, isSVG)) ? (patchDOMProp(el, key, nextValue), el.tagName.includes("-") || "value" !== key && "checked" !== key && "selected" !== key || patchAttr(el, key, nextValue, isSVG, 0, "value" !== key)) : !el._isVueCE || !/[A-Z]/.test(key) && isString(nextValue) ? ("true-value" === key ? el._trueValue = nextValue : "false-value" === key && (el._falseValue = nextValue), patchAttr(el, key, nextValue, isSVG)) : patchDOMProp(el, camelize(key), nextValue, 0, key)
    }
}, nodeOps);
let renderer;
const _imports_0 = "" + new URL("img-w9YA6Eso.webp", import.meta.url).href, _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) target[key] = val;
    return target
};
let activePinia;
const setActivePinia = pinia => activePinia = pinia, piniaSymbol = Symbol();

function isPlainObject(o) {
    return o && "object" == typeof o && "[object Object]" === Object.prototype.toString.call(o) && "function" != typeof o.toJSON
}

var MutationType, MutationType2;
(MutationType2 = MutationType || (MutationType = {})).direct = "direct", MutationType2.patchObject = "patch object", MutationType2.patchFunction = "patch function";
const noop = () => {
};

function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
    subscriptions.push(callback);
    const removeSubscription = () => {
        const idx = subscriptions.indexOf(callback);
        idx > -1 && (subscriptions.splice(idx, 1), onCleanup())
    };
    var fn;
    return !detached && getCurrentScope() && (fn = removeSubscription, activeEffectScope && activeEffectScope.cleanups.push(fn)), removeSubscription
}

function triggerSubscriptions(subscriptions, ...args) {
    subscriptions.slice().forEach((callback => {
        callback(...args)
    }))
}

const fallbackRunWithContext = fn => fn(), ACTION_MARKER = Symbol(), ACTION_NAME = Symbol();

function mergeReactiveObjects(target, patchToApply) {
    target instanceof Map && patchToApply instanceof Map ? patchToApply.forEach(((value, key) => target.set(key, value))) : target instanceof Set && patchToApply instanceof Set && patchToApply.forEach(target.add, target);
    for (const key in patchToApply) {
        if (!patchToApply.hasOwnProperty(key)) continue;
        const subPatch = patchToApply[key], targetValue = target[key];
        isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch) ? target[key] = mergeReactiveObjects(targetValue, subPatch) : target[key] = subPatch
    }
    return target
}

const skipHydrateSymbol = Symbol();
const {assign: assign} = Object;

function createOptionsStore(id, options, pinia, hot) {
    const {state: state, actions: actions, getters: getters} = options, initialState = pinia.state.value[id];
    let store2;
    return store2 = createSetupStore(id, (function () {
        initialState || (pinia.state.value[id] = state ? state() : {});
        const localState = function (object) {
            const ret = isArray(object) ? new Array(object.length) : {};
            for (const key in object) ret[key] = propertyToRef(object, key);
            return ret
        }(pinia.state.value[id]);
        return assign(localState, actions, Object.keys(getters || {}).reduce(((computedGetters, name) => (computedGetters[name] = markRaw(computed((() => {
            setActivePinia(pinia);
            const store22 = pinia._s.get(id);
            return getters[name].call(store22, store22)
        }))), computedGetters)), {}))
    }), options, pinia, hot, !0), store2
}

function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
    let scope;
    const optionsForPlugin = assign({actions: {}}, options), $subscribeOptions = {deep: !0};
    let isListening, isSyncListening, subscriptions = [], actionSubscriptions = [];
    const initialState = pinia.state.value[$id];
    let activeListener;

    function $patch(partialStateOrMutator) {
        let subscriptionMutation;
        isListening = isSyncListening = !1, "function" == typeof partialStateOrMutator ? (partialStateOrMutator(pinia.state.value[$id]), subscriptionMutation = {
            type: MutationType.patchFunction,
            storeId: $id,
            events: undefined
        }) : (mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator), subscriptionMutation = {
            type: MutationType.patchObject,
            payload: partialStateOrMutator,
            storeId: $id,
            events: undefined
        });
        const myListenerId = activeListener = Symbol();
        nextTick().then((() => {
            activeListener === myListenerId && (isListening = !0)
        })), isSyncListening = !0, triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id])
    }

    isOptionsStore || initialState || (pinia.state.value[$id] = {}), ref({});
    const $reset = isOptionsStore ? function () {
        const {state: state} = options, newState = state ? state() : {};
        this.$patch(($state => {
            assign($state, newState)
        }))
    } : noop;
    const action = (fn, name = "") => {
        if (ACTION_MARKER in fn) return fn[ACTION_NAME] = name, fn;
        const wrappedAction = function () {
            setActivePinia(pinia);
            const args = Array.from(arguments), afterCallbackList = [], onErrorCallbackList = [];
            let ret;
            triggerSubscriptions(actionSubscriptions, {
                args: args,
                name: wrappedAction[ACTION_NAME],
                store: store2,
                after: function (callback) {
                    afterCallbackList.push(callback)
                },
                onError: function (callback) {
                    onErrorCallbackList.push(callback)
                }
            });
            try {
                ret = fn.apply(this && this.$id === $id ? this : store2, args)
            } catch (error) {
                throw triggerSubscriptions(onErrorCallbackList, error), error
            }
            return ret instanceof Promise ? ret.then((value => (triggerSubscriptions(afterCallbackList, value), value))).catch((error => (triggerSubscriptions(onErrorCallbackList, error), Promise.reject(error)))) : (triggerSubscriptions(afterCallbackList, ret), ret)
        };
        return wrappedAction[ACTION_MARKER] = !0, wrappedAction[ACTION_NAME] = name, wrappedAction
    }, store2 = reactive({
        _p: pinia,
        $id: $id,
        $onAction: addSubscription.bind(null, actionSubscriptions),
        $patch: $patch,
        $reset: $reset,
        $subscribe(callback, options2 = {}) {
            const removeSubscription = addSubscription(subscriptions, callback, options2.detached, (() => stopWatcher())),
                stopWatcher = scope.run((() => watch((() => pinia.state.value[$id]), (state => {
                    ("sync" === options2.flush ? isSyncListening : isListening) && callback({
                        storeId: $id,
                        type: MutationType.direct,
                        events: undefined
                    }, state)
                }), assign({}, $subscribeOptions, options2))));
            return removeSubscription
        },
        $dispose: function () {
            scope.stop(), subscriptions = [], actionSubscriptions = [], pinia._s.delete($id)
        }
    });
    pinia._s.set($id, store2);
    const setupStore = (pinia._a && pinia._a.runWithContext || fallbackRunWithContext)((() => pinia._e.run((() => (scope = effectScope()).run((() => setup({action: action})))))));
    for (const key in setupStore) {
        const prop = setupStore[key];
        if (isRef(prop) && (!isRef(o = prop) || !o.effect) || isReactive(prop)) isOptionsStore || (!initialState || isPlainObject(obj = prop) && obj.hasOwnProperty(skipHydrateSymbol) || (isRef(prop) ? prop.value = initialState[key] : mergeReactiveObjects(prop, initialState[key])), pinia.state.value[$id][key] = prop); else if ("function" == typeof prop) {
            const actionValue = action(prop, key);
            setupStore[key] = actionValue, optionsForPlugin.actions[key] = prop
        }
    }
    var obj, o;
    return assign(store2, setupStore), assign(toRaw(store2), setupStore), Object.defineProperty(store2, "$state", {
        get: () => pinia.state.value[$id],
        set: state => {
            $patch(($state => {
                assign($state, state)
            }))
        }
    }), pinia._p.forEach((extender => {
        assign(store2, scope.run((() => extender({
            store: store2,
            app: pinia._a,
            pinia: pinia,
            options: optionsForPlugin
        }))))
    })), initialState && isOptionsStore && options.hydrate && options.hydrate(store2.$state, initialState), isListening = !0, isSyncListening = !0, store2
}

function defineStore(idOrOptions, setup, setupOptions) {
    let id, options;
    const isSetupStore = "function" == typeof setup;

    function useStore(pinia, hot) {
        (pinia = pinia || (!!(currentInstance || currentRenderingInstance || currentApp) ? inject(piniaSymbol, null) : null)) && setActivePinia(pinia), (pinia = activePinia)._s.has(id) || (isSetupStore ? createSetupStore(id, setup, options, pinia) : createOptionsStore(id, options, pinia));
        return pinia._s.get(id)
    }

    return id = idOrOptions, options = isSetupStore ? setupOptions : setup, useStore.$id = id, useStore
}

const useDataStore = defineStore("dataStore", (() => {
    const dataInfo = ref({txt: ""});
    return {dataInfo: dataInfo, setData: t => dataInfo.value.txt = t}
}));

console.log("DEFINING CLASS: DataCommunication");
class DataCommunication {
    static begin(isDev) {
        if (this.isDev = isDev, this.isDev) return this.wsInit();
        this.pageInit()
    }

    static wsInit() {
        this.ws = new WebSocket("ws://127.0.0.1:7777"), this.ws.addEventListener("open", (() => {
            this.ws.addEventListener("message", this.getMsg)
        }))
    }

    static pageInit() {
        "vc" == this.getIdeType() && window.addEventListener("message", this.getMsg)
    }

    static getIdeType() {
        return "function" == typeof window.acquireVsCodeApi ? "vc" : "ij"
    }

    static sendMsg(info) {
        console.log("IsDev: ", this.isDev);
        console.log("IdeType: ", this.getIdeType());
        console.log("cefQuery: ", window.cefQuery + " info: " + info);
        return this.isDev ?

            this.ws.send(JSON.stringify(info)) : "vc" == this.getIdeType() ? (!this.vscodeApi && (this.vscodeApi = window.acquireVsCodeApi()), this.vscodeApi.postMessage(info)) :
                window.cefQuery({
                    request: JSON.stringify(info),
                    onSuccess: msg => {
                        this.getMsg(msg)
                    }, onFailure: (code, msg) => {
                        this.getMsg(msg)
                    }
                })
    }

    static getMsg(msg) {
        !function (msg) {
            let info = {};
            DataCommunication.isDev ? info = JSON.parse(msg.data) : "vc" == DataCommunication.getIdeType() ? info = msg.data : "ij" == DataCommunication.getIdeType() && (info = JSON.parse(msg.data));
            const store2 = useDataStore();
            "chatSelectionText" in info && store2.setData(info.chatSelectionText)
        }(msg)
    }
}

const App = _export_sfc({
    __name: "App", setup(__props) {
        const dataInfo = ref(useDataStore().dataInfo);
        DataCommunication.begin(!1);
        const sendHandler = () => DataCommunication.sendMsg({str1024: "这是一个消息弹框"});
        return (_ctx, _cache) => {
            return function (disableTracking = !1) {
                blockStack.push(currentBlock = disableTracking ? null : [])
            }(), type = Fragment, props = null, children = [_cache[1] || (_cache[1] = createBaseVNode("div", null, [createBaseVNode("div", null, "可以正常加载图片资源 ↓↓↓"), createBaseVNode("p"), createBaseVNode("img", {
                src: _imports_0,
                alt: ""
            })], -1)), createBaseVNode("button", {onClick: sendHandler}, "向IDE发送消息：弹个窗"), _cache[2] || (_cache[2] = createBaseVNode("p", null, null, -1)), withDirectives(createBaseVNode("textarea", {"onUpdate:modelValue": _cache[0] || (_cache[0] = $event => dataInfo.value.txt = $event)}, null, 512), [[vModelText, dataInfo.value.txt]])], setupBlock(createBaseVNode(type, props, children, 64, dynamicProps, shapeFlag, !0));
            var type, props, children, dynamicProps, shapeFlag
        }
    }
}, [["__scopeId", "data-v-e1f909be"]]), store = function () {
    const scope = effectScope(!0), state = scope.run((() => ref({})));
    let _p = [], toBeInstalled = [];
    const pinia = markRaw({
        install(app) {
            setActivePinia(pinia), pinia._a = app, app.provide(piniaSymbol, pinia), app.config.globalProperties.$pinia = pinia, toBeInstalled.forEach((plugin => _p.push(plugin))), toBeInstalled = []
        }, use(plugin) {
            return this._a ? _p.push(plugin) : toBeInstalled.push(plugin), this
        }, _p: _p, _a: null, _e: scope, _s: new Map, state: state
    });
    return pinia
}();
((...args) => {
    const app = (renderer || (renderer = createRenderer(rendererOptions))).createApp(...args), {mount: mount} = app;
    return app.mount = containerOrSelector => {
        const container = function (container) {
            if (isString(container)) {
                return document.querySelector(container)
            }
            return container
        }(containerOrSelector);
        if (!container) return;
        const component = app._component;
        isFunction(component) || component.render || component.template || (component.template = container.innerHTML), 1 === container.nodeType && (container.textContent = "");
        const proxy = mount(container, !1, function (container) {
            if (container instanceof SVGElement) return "svg";
            if ("function" == typeof MathMLElement && container instanceof MathMLElement) return "mathml"
        }(container));
        return container instanceof Element && (container.removeAttribute("v-cloak"), container.setAttribute("data-v-app", "")), proxy
    }, app
})(App).use(store).mount("#app");

window.DataCommunication = DataCommunication;