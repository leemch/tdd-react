const { render, screen, waitFor, waitForElementToBeRemoved } = require("@testing-library/react")
import SignUpPage from "./SignUpPage";
import userEvent from "@testing-library/user-event";
//import axios from "axios";
import { setupServer } from "msw/node";
import { rest } from "msw";


describe("Sign Up Page", () => {
    describe("Layout", () => {
        it("has header", () => {
            render(<SignUpPage />);
            const header = screen.queryByRole("heading", { name: "Sign Up" });
            expect(header).toBeInTheDocument();
        });
        it("has username input", () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("Username");
            expect(input).toBeInTheDocument();
        })
        it("has email input", () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("Email");
            expect(input).toBeInTheDocument();
        })
        it("has password input", () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("Password");
            expect(input).toBeInTheDocument();
        })
        it("has password type for password input", () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("Password");
            expect(input.type).toBe("password");
        })
        it("has password repeat input", () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("Repeat Password");
            expect(input).toBeInTheDocument();
        })
        it("has password type for repeat password input", () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("Repeat Password");
            expect(input.type).toBe("password");
        })
        it("has Sign Up button", () => {
            render(<SignUpPage />);
            const button = screen.queryByRole("button", { name: "Sign Up" });
            expect(button).toBeInTheDocument();
        });
        it("disables the button by default", () => {
            render(<SignUpPage />);
            const button = screen.queryByRole("button", { name: "Sign Up" });
            expect(button).toBeDisabled();
        });
    });
    describe("interactions", () => {

        let reqBody;
        let counter = 0;
        const server = setupServer(
            rest.post("/api/1.0/users", (req, res, ctx) => {
                //console.log("success msg")
                reqBody = req.body;
                counter++;
                return res(ctx.status(200));
            })
        );

        beforeAll(() => {
            server.listen();
        })

        beforeEach(() => {
            counter = 0;
        })

        afterAll(() => {
            server.close();
        })

        

        let button;

        const setUpPage = () => {
            render(<SignUpPage />);
            const usernameInput = screen.getByLabelText("Username");
            const emailInput = screen.getByLabelText("Email");
            const passwordInput = screen.getByLabelText("Password");
            const passwordRepeat = screen.getByLabelText("Repeat Password");

            userEvent.type(usernameInput, "lee123");
            userEvent.type(emailInput, "poopoo@gmail.com");
            userEvent.type(passwordInput, "Poopoo1");
            userEvent.type(passwordRepeat, "Poopoo1");

            button = screen.queryByRole("button", { name: "Sign Up" });
        }

        it("enables button when password and password repeat have the same value", () => {
            setUpPage();
            expect(button).toBeEnabled();
        })
        it("sends username, email, and password after pressing the button", async () => {


            setUpPage();
            userEvent.click(button);
            await screen.findByText("Please check your email to activate your account.");

            expect(reqBody).toEqual({
                username: "lee123",
                email: "poopoo@gmail.com",
                password: "Poopoo1"
            })
        })

        it("disables button when there is an ongoing api call", async () => {
            setUpPage();
            userEvent.click(button);
            userEvent.click(button);
            await screen.findByText("Please check your email to activate your account.");
            expect(counter).toBe(1);
        });

        it("displays spinner after clicking submit", async () => {
            setUpPage();
            expect(screen.queryByRole("status")).not.toBeInTheDocument();
            userEvent.click(button);
            const spinner = screen.getByRole("status");
            expect(spinner).toBeInTheDocument();
            await screen.findByText("Please check your email to activate your account.");
        });

        it("displays account activation notification after successful sign up request", async () => {
            setUpPage();
            const message = "Please check your email to activate your account.";
            expect(screen.queryByText(message)).not.toBeInTheDocument();
            userEvent.click(button);
            const notification = await screen.findByText(message);
            expect(notification).toBeInTheDocument();
        });

        it("hides sign up form after successful sign up request", async () => {
            setUpPage();
            const form = screen.getByTestId("form-sign-up");
            userEvent.click(button);
            await waitFor(() => {
                expect(form).not.toBeInTheDocument();
            })

            //await waitForElementToBeRemoved(form);
        });

        it("displays validation message for username", async () => {
            server.use(
                rest.post("/api/1.0/users", (req, res, ctx) => {
                    //console.log("error msg")
                    return res(ctx.status(400), ctx.json({
                        validationErrors: {username: "Username cannot be null"}
                    }));
                })
            );
            setUpPage();
            userEvent.click(button);
            const validationError = await screen.findByText("Username cannot be null");
            expect(validationError).toBeInTheDocument();
        });
    })
})

