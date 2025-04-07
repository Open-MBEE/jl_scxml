import '../style/forceLayout.css';
import '../style/tipsy.css'; // if needed

let scriptsLoaded = false;
declare var require: any;

function evalScript(source: string) {
  const script = document.createElement('script');
  script.text = source;
  document.head.appendChild(script);
}

function loadVendorScripts(): Promise<void> {
  if (scriptsLoaded) return Promise.resolve();

  // Use raw-loader to inline scripts at build time
  const d3Script = require('!!raw-loader!../src/vendor/d3.min.js').default;
  const jqueryScript = require('!!raw-loader!../src/vendor/jquery.min.js').default; 
  const qScript = require('!!raw-loader!../src/vendor/q.js').default;
  const lodashScript = require('!!raw-loader!../src/vendor/lodash.js').default;
  const backboneScript = require('!!raw-loader!../src/vendor/async.js').default;
  const asyncScript = require('!!raw-loader!../src/vendor/backbone.js').default;
  const klayScript = require('!!raw-loader!../src/vendor/klay.js').default;
  const forceLayoutScript = require('!!raw-loader!../src/vendor/forceLayout.js').default;
  const jqueryTipsyScript = require('!!raw-loader!../src/vendor/jquery.tipsy.js').default; 
  
  return new Promise<void>((resolve) => {
    console.log('[SCXML] Injecting vendor scripts via raw-loader...');
    evalScript(d3Script);
    evalScript(jqueryScript);
    evalScript(qScript);
    evalScript(lodashScript);
    evalScript(asyncScript);
    evalScript(backboneScript);
    evalScript(klayScript);
    evalScript(forceLayoutScript);
    evalScript(jqueryTipsyScript);
    console.log('[SCXML] window.forceLayout after injection:', (window as any).forceLayout);
    scriptsLoaded = true;
    resolve();
  });
}

function injectActiveStateStyle() {
  const style = document.createElement('style');
  style.textContent = `
    .cell.currentState rect.border {
      stroke: orange !important;
      stroke-width: 3 !important;
      fill-opacity: 1;
    }
  `;
  document.head.appendChild(style);
}

export async function renderScxml(container: HTMLElement, scxml: string, currentState?: string) {
  await loadVendorScripts();
  injectActiveStateStyle();

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(scxml, 'text/xml');
  container.innerHTML = '';

  const forceLayout = (window as any).forceLayout;
  if (!forceLayout || !forceLayout.Layout) {
    console.error('[SCXML] forceLayout.Layout is not available.');
    return;
  }

  const layout = new forceLayout.Layout({
    parent: container,
    doc: xmlDoc,
    currentState: currentState
  });

  layout.initialized.then(() => {
    console.log(`[SCXML] Highlighted active state: ${currentState}`);
  });
}
