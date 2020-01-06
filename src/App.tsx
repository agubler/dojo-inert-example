import { tsx, create } from "@dojo/framework/core/vdom";
import inert from "@dojo/framework/core/middleware/inert";
import icache from "@dojo/framework/core/middleware/icache";

import * as css from "./App.m.css";

const dialogFactory = create({ inert, icache }).properties<{
  open: boolean;
  onRequestClose: () => void;
}>();

const Dialog = dialogFactory(function Dialog({
  children,
  properties,
  middleware: { inert }
}) {
  const { open } = properties();

  inert.set("dialog", open, true);

  if (!open) {
    return null;
  }

  return (
    <body>
      <div
        key="dialog"
        styles={{
          background: "red",
          width: "400px",
          height: "400px",
          marginLeft: "-200px",
          marginTop: "-200px",
          position: "absolute",
          left: "50%",
          top: "50%"
        }}
      >
        <button
          onclick={() => {
            properties().onRequestClose();
          }}
        >
          Close
        </button>
        {children()}
      </div>
    </body>
  );
});

const factory = create({ icache });

export default factory(function App({ middleware: { icache } }) {
  return (
    <div classes={[css.root]}>
      <input />
      <button
        onclick={() => {
          icache.set("open", true);
        }}
      >
        Open
      </button>
      <Dialog
        open={icache.getOrSet("open", false)}
        onRequestClose={() => {
          icache.set("open", false);
        }}
      >
        <div>
          <input />
          <input />
          <button>button</button>
          Content
        </div>
      </Dialog>
    </div>
  );
});
