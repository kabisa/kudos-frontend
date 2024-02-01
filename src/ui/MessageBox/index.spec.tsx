import { render } from "@testing-library/react";

import MessageBox, { MessageBoxProps } from ".";

describe("<MessageBox/>", () => {
    const props: MessageBoxProps = {
        title: 'title',
        message: 'message'
    }

    test('renders title and message from props', () => {
        const { getByText } = render(
            <MessageBox { ...props } />
        );

        getByText(props.title);
        getByText(props.message);
    });

    test('applies a class name based on the variant prop', () => {
        const { container, rerender } = render(
            <MessageBox { ...props } />
        );

        expect(container.firstElementChild?.classList.contains('default')).toBe(true);

        rerender(<MessageBox { ...props } variant={'error'} />)

        expect(container.firstElementChild?.classList.contains('error')).toBe(true);

        rerender(<MessageBox { ...props } variant={'success'} />)

        expect(container.firstElementChild?.classList.contains('success')).toBe(true);
    })
});
