// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax --harmony-tailcalls --stack-size=100

//
// Tail calls work only in strict mode.
//
(function() {
  function f(n) {
    if (n <= 0) {
      return  "foo";
    }
    return f(n - 1);
  }
  assertThrows(()=>{ f(1e6) });
})();


//
// Tail call normal functions.
//
(function() {
  "use strict";
  function f(n) {
    if (n <= 0) {
      return  "foo";
    }
    return f(n - 1);
  }
  assertEquals("foo", f(1e6));
})();


(function() {
  "use strict";
  function f(n){
    if (n <= 0) {
      return "foo";
    }
    return g(n - 1);
  }
  function g(n){
    if (n <= 0) {
      return "bar";
    }
    return f(n - 1);
  }
  assertEquals("foo", f(1e6));
  assertEquals("bar", f(1e6 + 1));
})();


//
// Tail call bound functions.
//
(function() {
  "use strict";
  function f0(n) {
    if (n <= 0) {
      return "foo";
    }
    return f(n - 1);
  }
  var f = f0.bind({});
  assertEquals("foo", f(1e6));
})();


(function() {
  "use strict";
  function f0(n){
    if (n <= 0) {
      return "foo";
    }
    return g(n - 1);
  }
  function g0(n){
    if (n <= 0) {
      return "bar";
    }
    return f(n - 1);
  }
  var f = f0.bind({});
  var g = g0.bind({});

  assertEquals("foo", f(1e6));
  assertEquals("bar", f(1e6 + 1));
})();
