import { RenderResult, render } from "@testing-library/react";
import { forwardRef } from "react";

type DecoratorSettings<
  TDecorators extends Decorator<string, any>,
  TKey extends string,
> = TDecorators extends Decorator<TKey, infer TSettings> ? TSettings : never;

type UpdatedSettings<T> = Partial<T> | ((initialSettings: T) => Partial<T>);

type TestHelpers<
  TComponent extends React.FC<any>,
  TDecorators extends Decorator<string, any>[],
> = {
  /**
   * Set the initial properties of the component
   *
   * You can also set the props through the settings in `setComponent`
   */
  setProps(props: React.ComponentProps<TComponent>): void;
  /**
   * Update the properties of the component.
   * After a `renderComponent` call these settings get reset.
   */
  updateProps(
    newProps: UpdatedSettings<React.ComponentProps<TComponent>>,
  ): void;
  /**
   * Update the settings of a decorator.
   * After a `renderComponent` call these settings get reset.
   */
  updateDecorator<TKey extends TDecorators[number]["name"]>(
    key: TKey,
    settings: UpdatedSettings<DecoratorSettings<TDecorators[number], TKey>>,
  ): void;
  /**
   * Render the component wrapped with all decorators, applying
   * all property and decorator setting updates.
   */
  renderComponent(): RenderResult;
};

export type Decorator<
  TName extends string,
  TSettings extends Record<string, unknown> = Record<string, unknown>,
> = {
  /**
   * Name of the decorator, can be used in `updateDecorator` to update the settings
   */
  name: TName;
  /**
   * Initial settings of this decorator, van be updated through `updateDecorator`
   */
  settings: TSettings;
  /**
   * Function to decorate incoming `Component`. This can be part of a larger chain.
   *
   * @param Component The component to decorate
   * @param settings settings to apply on the decoration
   * @returns an updated JSX structure
   */
  Decorator: React.FC<{ Component: React.FC; settings: TSettings }>;
};

const hasAlreadyRendered = (
  lastRender: RenderResult | null,
): lastRender is RenderResult =>
  lastRender !== null && // Rendered before
  document.body.firstChild !== null &&
  // And still in the document?
  document.body.firstChild === lastRender.baseElement.firstChild;

/**
 * Set the component subject of this test.
 *
 * This component should be a FunctionalComponent. If you want
 * to test a ClassComponent, you can wrap your component with `makeFC`
 *
 * @example ```
 * const { renderComponent } = setTestSubject(YourComponent)
 * ```
 *
 * You can decorate your component with contexts by setting decorators:
 *
 * @example ```
 * const { renderComponent } = setTestSubject(YourComponent, {
 *   decorators: [dataDecorator, themeDecorator]
 * })
 * ```
 *
 * @param Component The react component under test
 * @param settings
 * @returns
 */
export const setTestSubject = <
  TComponent extends React.FC<any>,
  TDecorators extends Decorator<string, any>[],
>(
  Component: TComponent,
  settings: {
    decorators?: TDecorators;
    props?: React.ComponentProps<TComponent>;
  } = {},
): TestHelpers<TComponent, TDecorators> => {
  let props: React.ComponentProps<TComponent> | null = null;
  let initialProps: React.ComponentProps<TComponent> | null =
    settings.props ?? null;

  const initializeDecoratorSettings = (): Record<
    string,
    Record<string, unknown>
  > =>
    (settings.decorators ?? []).reduce(
      (result, decorator) => ({
        ...result,
        [decorator.name]: decorator.settings,
      }),
      {},
    );

  let decoratorSettings: Record<
    string,
    Record<string, unknown>
  > = initializeDecoratorSettings();
  let lastRender: RenderResult | null = null;

  return {
    renderComponent: () => {
      if (initialProps === null) {
        throw new Error("No props specified with setProps");
      }

      const jsxStructure = (settings.decorators ?? []).reduce(
        (result, dec) => (
          <dec.Decorator
            Component={() => result}
            settings={decoratorSettings[dec.name]}
          />
        ),
        <Component {...initialProps} {...props} />,
      );

      if (hasAlreadyRendered(lastRender)) {
        lastRender.rerender(jsxStructure);
      } else {
        const result = render(jsxStructure);
        lastRender = result;
      }

      props = null;
      decoratorSettings = initializeDecoratorSettings();

      return lastRender;
    },
    setProps: (props) => {
      initialProps = props;
    },
    updateProps: (updatedProps) => {
      if (initialProps === null) {
        throw new Error("No props specified with setProps");
      }
      const update: Partial<React.ComponentProps<TComponent>> =
        typeof updatedProps === "function"
          ? updatedProps(props ? props : initialProps)
          : updatedProps;

      props = { ...initialProps, ...props, ...update };
    },
    updateDecorator: (name, updatedSettings) => {
      const update: Record<string, unknown> =
        typeof updatedSettings === "function"
          ? updatedSettings(
              decoratorSettings[name] as DecoratorSettings<
                TDecorators[number],
                typeof name
              >,
            )
          : updatedSettings;

      decoratorSettings[name] = {
        ...decoratorSettings[name],
        ...update,
      };
    },
  };
};

/**
 * Convert a ClassComponent into a FunctionalComponent.
 * The ref that can be supplied will be a ref to the instance of the
 * ClassComponent.
 */
export const makeFC = <TComponentProps,>(
  Component: React.ComponentClass<TComponentProps>,
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<TComponentProps> &
    React.RefAttributes<InstanceType<React.ComponentClass<TComponentProps>>>
> => {
  const fc = forwardRef<
    InstanceType<React.ComponentClass<TComponentProps>>,
    TComponentProps
  >((props, ref) => <Component {...props} ref={ref} />);
  fc.displayName = `Wrapped${Component.displayName ?? Component.name}`;
  return fc;
};
