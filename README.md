# SCXMLViz

A Python + JupyterLab extension for visualizing **SCXML state machines**. 
[PyPi Link](https://pypi.org/project/SCXML/0.1.0/)

Supports:

- ✅ Inline rendering in **Jupyter Notebooks**
- ✅ Standalone `.html` exports from Python scripts
- ✅ SCXML Viewer & Editor in **JupyterLab**
- ✅ Fully self-contained — bundled JS/CSS for offline use

---

## 📦 Installation

Install from PyPI:

```bash
pip install scxmlviz
```

---

## 🧰 Requirements

- Python ≥ 3.6
- JupyterLab ≥ 4.0.0
- NodeJS (for development builds)

---

## 📓 Usage in Jupyter Notebook

Render a state machine inline:

```python
from scxmlviz import display_scxml

display_scxml("""
<scxml initial="on">
  <state id="on"><transition event="stop" target="off"/></state>
  <state id="off"><transition event="start" target="on"/></state>
</scxml>
""", current_state="on")
```

✅ The diagram will render interactively inside the notebook output cell.

---

## 🐍 Usage in Python Scripts (Export HTML)

Generate a fully self-contained HTML file:

```python
from scxmlviz import save_scxml

save_scxml("""
<scxml initial="off">
  <state id="off"><transition event="start" target="on"/></state>
  <state id="on"><transition event="stop" target="off"/></state>
</scxml>
""", current_state="off", output_path="diagram.html")
```

✅ Open `diagram.html` in your browser — works offline, no Jupyter required.

---

## 🧩 JupyterLab Integration

SCXMLViz includes two built-in panels:

- **SCXML Viewer**
- **SCXML Editor**

### Launching inside JupyterLab

```bash
jupyter lab
```

Then open the Command Palette (`Ctrl+Shift+C` or `Cmd+Shift+C`) and select:

- `Open SCXML Viewer`
- `Open SCXML Editor`

---

## 🔧 Developer Setup

### 1. Clone + install

```bash
git clone https://github.com/yourname/scxmlviz
cd scxmlviz

# Install Python package
pip install -e .

# Install frontend dependencies
jlpm install
```

---

### 2. Build the extension

```bash
jlpm build
jupyter labextension develop . --overwrite
jupyter lab build
```

Now run:

```bash
jupyter lab
```

✅ Your viewer/editor panels will be available from the command palette.

---

## 🧪 Dev Workflow Commands

| Command                     | Purpose                                 |
|-----------------------------|------------------------------------------|
| `jlpm clean`                | Clear old frontend build files           |
| `jlpm build`                | Compile frontend + notebook bundle       |
| `jupyter lab`               | Launch the JupyterLab UI                 |
| `pip install -e .`          | Dev-install the Python library           |
| `twine upload dist/*`       | Publish to PyPI                          |

---

## 🧪 Testing

### Frontend (JS)

```bash
jlpm test
```

### Python

You can test `display_scxml()` and `save_scxml()` directly in a notebook or script.

---

## 📦 Publishing to PyPI

1. Update metadata in `setup.py`:

```python
setup(
  name='scxmlviz',
  version='0.1.0',
  ...
  include_package_data=True,
  package_data={'scxmlviz': ['static/*.js']},
)
```

2. Build the package:

```bash
python -m build
```

3. Upload to PyPI:

```bash
twine upload dist/*
```

---

## 🔗 Resources

- 📄 SCXML spec: https://www.w3.org/TR/scxml/
- Based on [SCXMLVisualization](https://github.com/redrede/SCXMLVisualization)
- Powered by JupyterLab extensions and Webpack bundling

---

## 🧠 Credits

Created by Dat Nguyen  
Licensed under MIT  
Built with ❤️ for visualizing complex state machines
