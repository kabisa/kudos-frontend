import { render } from "@testing-library/react";

import ThumbnailList from ".";

describe("<ThumbnailList/>", () => {
    const props = {
        thumbnails: [
            {
                src: 'assets/test.jpg',
                alt: 'test'
            },
            {
                src: 'assets/test2.jpg',
                alt: 'test2'
            }
        ]
    };

    test('renders a list containing the correct amount of items', () => {
        const { getByRole } = render(
            <ThumbnailList { ...props } />
        );

        const element = getByRole('list');

        expect(element.children).toHaveLength(2);
    });
});
