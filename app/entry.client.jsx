import * as React from "react";
import { hydrateRoot } from "react-dom/client";
import { RemixBrowser } from "@remix-run/react";

// fixup stuff before hydration
// using Suspense to delay hydration until we're ready

function hydrate() {
  React.startTransition(() => {
    hydrateRoot(
      document,
      <React.Suspense fallback={<div>Loading...</div>}>
        <RemixBrowser />
      </React.Suspense>
    );
  });
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  window.setTimeout(hydrate, 1);
}
