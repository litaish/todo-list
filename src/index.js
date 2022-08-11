import "./scss/main.scss";
import { footer } from "./modules/footer";
import { nav } from "./modules/nav"; 

const initialPageLoad = () => {
  // Main elements - nav, main, footer
  const body = document.getElementsByTagName("body")[0];

  nav.render(body);
  footer.render(body);


}
initialPageLoad();