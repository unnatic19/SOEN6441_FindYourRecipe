import { render, screen, cleanup } from '@testing-library/react';
import { queryByAttribute } from '@testing-library/react';
import { waitFor } from "@testing-library/react";

import Recipes from '../Recipes'
import Login from '../Login'
import Landing from '../Landing'
import Info from '../Info'
import Notes from '../Notes'
// jest.mock("axios", () => ({
//     __esModule: true,
//     default: {
//         get: () => ({
//             data: { RecipeId: "644387", Title: "Garlicky Kale" }
//         })
//     }
// }))
// test('Recipe details should be Rendered', () => {
//     const getById = queryByAttribute.bind(null, 'id');

//     const dom = render(<Recipes />);

//     const recipeTitle = getById(dom.container, 'recipeTitle');
//     waitFor(() => expect(getByText("Garlicky Kale")).toBeInTheDocument());

// })
// jest.mock("axios", () => ({
//     __esModule: true,
//     default: {
//         get: () => ({
//             data: {}
//         })
//     }
// }))

// test('Login username  shouldbe rendered', () => {
//     render(<Login />);
//     const loginUsername = screen.getAllByPlaceholderText(/username/i);
//     waitFor(() => expect(getByText("username")).toBeInTheDocument());

// })
// jest.mock("axios", () => ({
//     __esModule: true,
//     default: {
//         get: () => ({
//             data: {}
//         })
//     }
// }))

// test('Image is Rendered', () => {
//     const getById = queryByAttribute.bind(null, 'id');

//     const dom = render(<Landing />);

//     const landingImage = getById(dom.container, 'backgroundImage');
//     waitFor(() => expect(getByText("")).toBeInTheDocument());

// })

// jest.mock("axios", () => ({
//     __esModule: true,
//     default: {
//         get: () => ({
//             data: { name: "Onion" }
//         })
//     }
// }))

// test('Image is Rendered', () => {
//     const getById = queryByAttribute.bind(null, 'id');

//     const dom = render(<Info />);

//     const recipeTitle = getById(dom.container, 'IngredientName');
//     waitFor(() => expect(getByText("")).toBeInTheDocument());

// })

// jest.mock("axios", () => ({
//     __esModule: true,
//     default: {
//         get: () => ({
//             data: { notes: "ONIONS" }
//         })
//     }
// }))

// test('Notes is rendered', () => {
//     const getById = queryByAttribute.bind(null, 'id');

//     const dom = render(<Notes />);

//     const recipeTitle = getById(dom.container, 'NotesDetails');
//     waitFor(() => expect(getByText("")).toBeInTheDocument());

// })

