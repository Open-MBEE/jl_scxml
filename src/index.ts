import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { ICommandPalette } from '@jupyterlab/apputils';
import { ScxmlViewerWidget } from './scxmlWidget';
import { ScxmlEditorWidget } from './scxmlEditorWidget'; 
import { renderScxml } from './scxmlRenderer';

const plugin: JupyterFrontEndPlugin<void> = {
  id: 'SCXML',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette) => {
    const viewerCommand = 'scxml:open';
    const editorCommand = 'scxml:open-editor'; 

    app.commands.addCommand(viewerCommand, {
      label: 'Open SCXML Viewer',
      execute: () => {
        const widget = new ScxmlViewerWidget();
        app.shell.add(widget, 'main');
      }
    });

    app.commands.addCommand(editorCommand, {
      label: 'Open SCXML Editor',
      execute: () => {
        const widget = new ScxmlEditorWidget();
        app.shell.add(widget, 'main');
      }
    });

    palette.addItem({ command: viewerCommand, category: 'SCXML Tools' });
    palette.addItem({ command: editorCommand, category: 'SCXML Tools' }); // 🆕
  }
};

export default plugin;
export { renderScxml };