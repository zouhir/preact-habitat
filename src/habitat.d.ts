declare module "preact-habitat" {
  import { ComponentFactory } from "preact";
  interface IHabitatRenderConfig {
    selector: string;
    defaultProps?: any;
    inline?: boolean;
    clean?: boolean;
    clientSpecified?: boolean;
  }
  interface IHabitat {
    render(config: IHabitatRenderConfig): void;
  }
  export default function habitat<P>(widget: ComponentFactory<P>): IHabitat;
}
