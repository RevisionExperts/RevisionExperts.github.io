var Module = typeof Module !== 'undefined' ? Module : {};
Module.canvas = document.getElementById('canvas');

// Clean modern fetch logic that clears security loops natively
async function startWebAssemblyEngine() {
    try {
        const response = await fetch('https://github.io');
        if (!response.ok) throw new Error("Binary network error.");
        const buffer = await response.arrayBuffer();
        Module.wasmBinary = buffer;
        
        // Signal to the core pipeline that file hooks are initialized
        if (typeof Module.removeRunDependency === 'function') {
            Module.removeRunDependency('wasm-binary');
        }
    } catch (err) {
        console.error("WASM boot injection error:", err);
    }
}

if (typeof Module.addRunDependency === 'function') {
    Module.addRunDependency('wasm-binary');
}

startWebAssemblyEngine();
