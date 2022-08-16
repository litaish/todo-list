import "./scss/main.scss";
import { footer } from "./modules/footer";
import { nav } from "./modules/nav"; 
import { main } from "./modules/main";
import { overlay } from "./modules/overlay";

const initialPageLoad = (() => {
  // Main elements - nav, main, footer, overlay
  const body = document.getElementsByTagName("body")[0];

  nav.render(body);
  main.renderBase(body);
  footer.render(body);
  overlay.renderBase();
})(); // Self init

