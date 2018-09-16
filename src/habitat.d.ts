declare module "preact-habitat" {
  import { ComponentFactory } from "preact";
  interface IHabitatRenderConfig {
    /**
     * DOM Element selector used to retrieve the DOM elements you want to mount
     * the widget in.
     */
    selector: string;
    /**
     * Default props to be rendered throughout widgets, you can replace each
     * value declaring props.
     * @default {}
     */
    defaultProps?: any;
    /**
     * Set to true if you want to use the parent DOM node as a host for your
     * widget without specifing any selectors.
     * @default true
     */
    inline?: boolean;
    /**
     * clean will remove all the innerHTML from the HTMl element the widget will
     * mount in.
     * @default false
     */
    clean?: boolean;
    /**
     * Whether the client will specify the selector. Overwrites selector option.
     * @default false
     */
    clientSpecified?: boolean;
  }
  interface IHabitat {
    /**
     * Renders the preact component into the DOM.
     * @param config Configuration object
     */
    render(config: IHabitatRenderConfig): void;
  }
  /**
   * A 900 Bytes module for that will make plugging in Preact components and
   * widgets in any CMS or website as fun as lego!
   * @param widget {ComponentFactory} Component to plug
   */
  export default function habitat<P>(widget: ComponentFactory<P>): IHabitat;
}
