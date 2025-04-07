from scxmlviz import save_scxml

save_scxml("""
<scxml initial="off">
  <state id="off"><transition event="start" target="on"/></state>
  <state id="on"><transition event="stop" target="off"/></state>
</scxml>
""", current_state="off", output_path="example_scxml.html")
