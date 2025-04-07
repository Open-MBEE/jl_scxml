import { Widget } from '@lumino/widgets';
import { renderScxml } from './scxmlRenderer';

export class ScxmlEditorWidget extends Widget {
  private editor!: HTMLTextAreaElement;
  private renderArea!: HTMLDivElement;

  constructor() {
    super();
    this.id = 'scxml-editor-widget';
    this.title.label = 'SCXML Editor';
    this.title.closable = true;

    // Outer wrapper (column layout)
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.height = '100%';
    wrapper.style.overflow = 'hidden';

    // Label
    const label = document.createElement('div');
    label.innerText = 'Input SCXML';
    label.style.padding = '10px';
    label.style.fontWeight = 'bold';
    label.style.fontSize = '14px';

    // Textarea (top input)
    this.editor = document.createElement('textarea');
    this.editor.style.width = '100%';
    this.editor.style.height = '200px';
    this.editor.style.padding = '10px';
    this.editor.style.boxSizing = 'border-box';
    this.editor.style.fontFamily = 'monospace';
    this.editor.style.fontSize = '13px';
    this.editor.style.border = '1px solid #ccc';
    this.editor.style.borderRadius = '4px';
    this.editor.style.resize = 'vertical';

    this.editor.value = `<?xml version="1.0"?> <scxml xmlns="http://www.w3.org/2005/07/scxml" version="1.0" datamodel="ecmascript" initial="off"> <datamodel> <data id="cook_time" expr="5"/> <data id="door_closed" expr="true"/> <data id="timer" expr="0"/> </datamodel> <state id="off"> <transition event="turn.on" target="on"/> </state> <state id="on"> <initial> <transition target="idle"/> </initial> <transition event="turn.off" target="off"/> <transition cond="timer &gt;= cook_time" target="off"/> <state id="idle"> <transition cond="door_closed" target="cooking"/> <transition event="door.close" target="cooking"> <assign location="door_closed" expr="true"/>  </transition> </state> <state id="cooking"> <transition event="door.open" target="idle"> <assign location="door_closed" expr="false"/> </transition> <transition event="time"> <assign location="timer" expr="timer + 1"/> </transition> </state> </state> </scxml>`;

    // Update button
    const updateBtn = document.createElement('button');
    updateBtn.innerText = 'Update Visualization';
    updateBtn.style.margin = '10px';
    updateBtn.style.padding = '6px 12px';
    updateBtn.style.borderRadius = '4px';
    updateBtn.style.border = 'none';
    updateBtn.style.backgroundColor = '#1976d2';
    updateBtn.style.color = '#fff';
    updateBtn.style.cursor = 'pointer';
    updateBtn.onclick = () => this.renderScxml();

    // Visualization area (bottom, scrollable)
    this.renderArea = document.createElement('div');
    this.renderArea.style.flex = '1';
    this.renderArea.style.overflow = 'auto';
    this.renderArea.style.borderTop = '1px solid #ddd';
    this.renderArea.style.padding = '10px';
    this.renderArea.style.boxSizing = 'border-box';

    wrapper.appendChild(label);
    wrapper.appendChild(this.editor);
    wrapper.appendChild(updateBtn);
    wrapper.appendChild(this.renderArea);

    this.node.appendChild(wrapper);

    requestAnimationFrame(() => this.renderScxml());
  }

  private renderScxml() {
    try {
      const scxml = this.editor.value;
      renderScxml(this.renderArea, scxml, "idle");

      // Optional: Resize SVG after rendering (for full width)
      setTimeout(() => {
        const svg = this.renderArea.querySelector('svg');
        if (svg) {
          svg.setAttribute('width', '100%');
          svg.style.display = 'block'; // removes inline spacing
        }
      }, 50); // give DOM time to attach
    } catch (e) {
      console.error('[SCXML Editor] render failed:', e);
    }
  }
}

