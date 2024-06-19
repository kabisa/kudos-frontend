import { RenderResult, render } from "@testing-library/react";

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
    settings: Partial<DecoratorSettings<TDecorators[number], TKey>>,
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

  return {
    renderComponent: () => {
      if (initialProps === null) {
        throw new Error("No props specified with setProps");
      }
      const result = render(
        decorators.reduce(
          (result, dec) =>
            dec.decorator(() => result, decoratorSettings[dec.name]),
          <Component {...initialProps} {...props} />,
        ),
      );

      props = null;
      decoratorSettings = initializeDecoratorSettings();

      return result;
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
      decoratorSettings[name] = {
        ...decoratorSettings[name],
        ...updatedSettings,
      };
    },
  };
};
