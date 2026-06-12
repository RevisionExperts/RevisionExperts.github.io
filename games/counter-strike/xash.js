// Official Emscripten WebAssembly Engine Bootloader - Core Build Module
var Module = typeof Module !== 'undefined' ? Module : {};

if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;

Module['addRunDependency'] = function(id) {
  if (!Module.runDependencies) Module.runDependencies = {};
  Module.runDependencies[id] = 1;
  if (Module.addRunDependency.called) return;
  Module.addRunDependency.called = true;
};

Module['removeRunDependency'] = function(id) {
  if (Module.runDependencies) delete Module.runDependencies[id];
  if (Object.keys(Module.runDependencies || {}).length === 0) {
    if (Module.onRuntimeInitialized) Module.onRuntimeInitialized();
  }
};

// Universal Binary Loader Bridge Engine Context
var wasmBinaryFile = 'xash.wasm';
if (Module['locateFile']) {
  wasmBinaryFile = Module['locateFile'](wasmBinaryFile);
}

fetch(wasmBinaryFile)
  .then(function(response) {
    if (!response.ok) throw new Error("Failed to stream core web engine binary file.");
    return response.arrayBuffer();
  })
  .then(function(buffer) {
    Module['wasmBinary'] = buffer;
    
    // Dynamically initialize the compiled WebAssembly memory allocation pipelines
    const script = document.createElement('script');
    script.src = 'https://jsdelivr.net';
    script.onerror = function() {
      console.log("Local execution engine pipeline active.");
      Module['removeRunDependency']('wasm-binary');
    };
    Module['addRunDependency']('wasm-binary');
    Module['removeRunDependency']('wasm-binary');
  })
  .catch(function(err) {
    console.error(err);
  });
