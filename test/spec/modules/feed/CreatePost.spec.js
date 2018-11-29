// import { h, render } from "preact";
// import { MockedProvider } from "react-apollo/test-utils";
// import * as d from "dom-testing-library";

// import { CreatePost } from "src/modules/feed/components";
// import { GET_GUIDELINES } from "src/modules/feed/components/GuidelineInput/GuidelineInput";
// import { GET_USERS } from "src/modules/feed/queries";

// const mocks = [
//   {
//     request: {
//       query: GET_GUIDELINES,
//       variables: { team_id: 1 },
//     },
//     result: {
//       data: {
//         teamById: {
//           guidelines: [
//             {
//               id: "1",
//               kudos: 25,
//               name: "Guideline 1",
//             },
//           ],
//         },
//       },
//     },
//   },
//   {
//     request: {
//       query: GET_USERS,
//       variables: { team_id: 1 },
//     },
//     result: {
//       data: {
//         teamById: {
//           users: [
//             {
//               id: "1",
//               name: "User 1",
//             },
//           ],
//         },
//       },
//     },
//   },
// ];

// describe("CreatePost", () => {
//   let scratch, mount;

//   const mountElement = mount => {
//     mount(
//       <MockedProvider mocks={mocks} addTypename={false}>
//         <CreatePost />
//       </MockedProvider>
//     );
//   };

//   beforeEach(() => {
//     scratch = document.createElement("div");
//     mount = jsx => render(jsx, scratch);
//   });

//   afterEach(() => {
//     scratch.innerHtml = "";
//   });

//   it("renders the create post form", () => {
//     mountElement(mount);
//     expect(d.getByTestId(scratch, "create-post-form")).to.be.visible;
//   });
// });
