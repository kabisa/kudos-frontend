import { RenderResult, render } from "@testing-library/react";
import { forwardRef } from "react";

type DecoratorSettings<
  TDecorators extends Decorator<string, any>,
  TKey extends string,
> = TDecorators extends Decorator<TKey, infer TSettings> ? TSettings : never;

type TestHelpers<
  TComponent extends React.FC<any>,
  TDecorators extends Decorator<string, any>[],
> = {
  setProps(props: React.ComponentProps<TComponent>): void;
  updateProps(newProps: Partial<React.ComponentProps<TComponent>>): void;
  updateDecorator<TKey extends TDecorators[number]["name"]>(
    key: TKey,
    settings:
      | Partial<DecoratorSettings<TDecorators[number], TKey>>
      | ((
          initialSettings: DecoratorSettings<TDecorators[number], TKey>,
        ) => Partial<DecoratorSettings<TDecorators[number], TKey>>),
  ): void;
  renderComponent(): RenderResult;
};

export type Decorator<
  TName extends string,
  TSettings extends Record<string, unknown>,
> = {
  name: TName;
  settings: TSettings;
  decorator: (Component: React.FC, settings: TSettings) => JSX.Element;
};

export const setComponent = <
  TComponent extends React.FC<any>,
  TDecorators extends Decorator<string, any>[],
>(
  Component: TComponent,
  ...decorators: TDecorators
): TestHelpers<TComponent, TDecorators> => {
  let props: React.ComponentProps<TComponent> | null = null;
  let initialProps: React.ComponentProps<TComponent> | null = null;

  const initializeDecoratorSettings = (): Record<
    string,
    Record<string, unknown>
  > =>
    decorators.reduce(
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

      if (
        lastRender && // Rendered before
        document.body.firstChild !== null &&
        // And still in the document?
        document.body.firstChild === lastRender.baseElement.firstChild
      ) {
        lastRender.rerender(
          decorators.reduce(
            (result, dec) =>
              dec.decorator(() => result, decoratorSettings[dec.name]),
            <Component {...initialProps} {...props} />,
          ),
        );
      } else {
        const result = render(
          decorators.reduce(
            (result, dec) =>
              dec.decorator(() => result, decoratorSettings[dec.name]),
            <Component {...initialProps} {...props} />,
          ),
        );
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
      props = { ...initialProps, ...props, ...updatedProps };
    },
    updateDecorator: (name, updatedSettings) => {
      if (typeof updatedSettings === "function") {
        decoratorSettings[name] = {
          ...decoratorSettings[name],
          ...(updatedSettings(
            decoratorSettings[name] as DecoratorSettings<
              TDecorators[number],
              typeof name
            >,
          ) as Record<string, unknown>),
        };
      } else {
        decoratorSettings[name] = {
          ...decoratorSettings[name],
          ...updatedSettings,
        };
      }
    },
  };
};

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
  fc.displayName = "WrappedClassComponent";
  return fc;
};
